// Gymnaxis — kamera kayıtlarını Google Drive'a yükler (video-depo/Kod.gs Apps Script servisi üzerinden).
// Servis adresi /video-depo/ayar.json içindeki "drive" alanından okunur; boşsa Drive kapalıdır.
// Önce tarayıcıdan doğrudan Google'a yüklemeyi dener; olmazsa parça parça servis üzerinden aktarır.
(function () {
  if (window.gxDrive) return;
  var ayarP = null;
  function ayar() {
    if (!ayarP) ayarP = fetch('/video-depo/ayar.json', { cache: 'no-store' })
      .then(function (r) { return r.ok ? r.json() : {}; })
      .catch(function () { ayarP = null; return {}; });
    return ayarP;
  }
  function servis(url, govde) {
    // text/plain gövde → CORS ön kontrolü yok; Apps Script yanıtı yönlendirmeyle gelir.
    return fetch(url, { method: 'POST', body: JSON.stringify(govde), redirect: 'follow' })
      .then(function (r) { return r.json(); })
      .then(function (j) { if (!j || !j.ok) throw new Error((j && j.hata) || 'Drive servisi yanıt vermedi'); return j; });
  }
  function b64(buf) {
    var u = new Uint8Array(buf), s = '';
    for (var i = 0; i < u.length; i += 0x8000) s += String.fromCharCode.apply(null, u.subarray(i, i + 0x8000));
    return btoa(s);
  }
  async function dogrudan(url, blob, mime) {
    var r = await fetch(url, { method: 'PUT', headers: { 'Content-Type': mime }, body: blob });
    if (!r.ok) throw new Error('Drive yükleme ' + r.status);
    var j = await r.json();
    if (!j || !j.id) throw new Error('Drive dosya kimliği yok');
    return j.id;
  }
  async function parcali(svc, url, blob, mime, ilerle) {
    var PARCA = 16 * 256 * 1024; // 4 MB (256 KB katı olmalı)
    for (var bas = 0; bas < blob.size; bas += PARCA) {
      var dilim = blob.slice(bas, Math.min(blob.size, bas + PARCA));
      var j = await servis(svc, { act: 'chunk', url: url, start: bas, total: blob.size, mime: mime, data: b64(await dilim.arrayBuffer()) });
      ilerle && ilerle(Math.min(1, (bas + dilim.size) / blob.size));
      if (!j.devam) return j.id;
    }
    throw new Error('Drive yüklemesi tamamlanmadı');
  }
  // o: {name, base, comp, kat}  →  {id, url}
  async function yukle(blob, o, ilerle) {
    var a = await ayar();
    if (!a.drive) throw new Error('Drive ayarlı değil');
    var mime = String(blob.type || 'video/webm').split(';')[0] || 'video/webm';
    var temel = { act: 'init', name: o.name, mime: mime, size: blob.size, base: o.base, comp: o.comp, kat: o.kat || '' };
    var id = null;
    try {
      var s = await servis(a.drive, Object.assign({ origin: location.origin }, temel));
      id = await dogrudan(s.url, blob, mime);
    } catch (e) {
      if (e && /geçersiz|bulunamadı|izin/.test(e.message || '')) throw e;
      var s2 = await servis(a.drive, temel);
      id = await parcali(a.drive, s2.url, blob, mime, ilerle);
    }
    var f = await servis(a.drive, { act: 'finish', id: id });
    return { id: f.id, url: f.url };
  }
  function hazir() { return ayar().then(function (a) { return !!a.drive; }); }
  window.gxDrive = { yukle: yukle, hazir: hazir };
})();
