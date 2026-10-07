/**
 * Gymnaxis — yarışma videolarını Google Drive'a kaydeden servis (Google Apps Script web uygulaması).
 *
 * Kurulum: script.google.com → Yeni proje → bu kodu yapıştır → Dağıt → Yeni dağıtım → Web uygulaması
 *   Yürüten: Ben   ·   Erişimi olan: Herkes   → Dağıt → izinleri onayla → web uygulaması URL'sini kopyala.
 *
 * Videolar Drive'da şu klasöre düşer:  Gymnaxis Videolar / <Branş> / <Yarışma> / <Kategori> / dosya
 * Kamera sayfası dosyayı doğrudan Google'a yükler; bu servis yalnızca yükleme adresini açar,
 * dosyayı "bağlantıya sahip olan görüntüleyebilir" yapar. Hesap şifresi / anahtar kimseyle paylaşılmaz.
 */
const ANA_KLASOR = 'Gymnaxis Videolar';
const FB = 'https://analig-default-rtdb.firebaseio.com';
const BRANS = {
  aerobik_yarismalar: 'Aerobik',
  competitions: 'Artistik',
  ritmik_yarismalar: 'Ritmik',
  trampolin_yarismalar: 'Trampolin',
  parkur_yarismalar: 'Parkur'
};
const MAX_BOYUT = 2 * 1024 * 1024 * 1024; // 2 GB

function doGet() {
  return cikti({ ok: true, servis: 'gymnaxis-video', surum: 1, klasor: anaKlasor().getUrl() });
}

function doPost(e) {
  try {
    const q = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    if (q.act === 'init') return cikti(baslat(q));
    if (q.act === 'chunk') return cikti(parca(q));
    if (q.act === 'finish') return cikti(bitir(q));
    if (q.act === 'kopyala') return cikti(kopyala(q));
    return cikti({ ok: false, hata: 'bilinmeyen işlem' });
  } catch (err) {
    return cikti({ ok: false, hata: String((err && err.message) || err) });
  }
}

function cikti(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}

function temiz(s) {
  var t = '', y = '\\/:*?"<>|#%';
  String(s || '').split('').forEach(function (c) { t += (c.charCodeAt(0) < 32 || y.indexOf(c) >= 0) ? '-' : c; });
  return t.replace(/\s+/g, ' ').trim().slice(0, 140);
}

function klasor(ust, ad) {
  const it = ust.getFoldersByName(ad);
  return it.hasNext() ? it.next() : ust.createFolder(ad);
}

function anaKlasor() {
  return klasor(DriveApp.getRootFolder(), ANA_KLASOR);
}

function fbOku(yol) {
  const r = UrlFetchApp.fetch(FB + '/' + yol + '.json', { muteHttpExceptions: true });
  return r.getResponseCode() === 200 ? JSON.parse(r.getContentText()) : null;
}

// Branş / Yarışma / Kategori klasörü (yarışma Firebase'de gerçekten var mı kontrol edilir)
function hedefKlasor(q) {
  const yarisma = fbOku(q.base + '/' + q.comp + '/isim');
  if (!yarisma) throw new Error('yarışma bulunamadı');
  let katAd = '';
  if (q.kat && /^[-A-Za-z0-9_]{1,80}$/.test(String(q.kat))) {
    const k = fbOku(q.base + '/' + q.comp + '/kategoriler/' + q.kat);
    katAd = (k && (k.name || k.ad)) || q.kat;
  }
  let f = klasor(anaKlasor(), BRANS[q.base]);
  f = klasor(f, temiz(yarisma) || q.comp);
  if (katAd) f = klasor(f, temiz(String(katAd).replace(/^[^0-9A-Za-zÇĞİÖŞÜçğıöşü]+/, '')) || q.kat);
  return f;
}

// ESKİ CLOUDINARY VİDEOLARINI TAŞIMA (2026-10-08): video Google tarafında indirilir, aynı klasör düzeniyle Drive'a yazılır.
// Yalnız bu sistemin Cloudinary hesabındaki dosyalar kabul edilir. Aynı adlı dosya klasörde varsa yeniden kopyalanmaz.
// (UrlFetchApp sınırı: dosya başına 50 MB.)
function kopyala(q) {
  if (!BRANS[q.base]) throw new Error('geçersiz branş');
  if (!/^[-A-Za-z0-9_]{3,64}$/.test(String(q.comp || ''))) throw new Error('geçersiz yarışma');
  const kaynak = String(q.kaynak || '');
  if (kaynak.indexOf('https://res.cloudinary.com/spythzo3/') !== 0) throw new Error('geçersiz kaynak');
  const f = hedefKlasor(q);
  const ad = temiz(q.name) || 'video.mp4';
  const var0 = f.getFilesByName(ad);
  let dosya = var0.hasNext() ? var0.next() : null;
  if (!dosya) {
    const r = UrlFetchApp.fetch(kaynak, { muteHttpExceptions: true, followRedirects: true });
    if (r.getResponseCode() !== 200) throw new Error('kaynak indirilemedi (' + r.getResponseCode() + ')');
    const blob = r.getBlob().setName(ad);
    dosya = f.createFile(blob);
  }
  dosya.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  return { ok: true, id: dosya.getId(), url: 'https://drive.google.com/file/d/' + dosya.getId() + '/view', boyut: dosya.getSize() };
}

// Yükleme oturumu aç: yarışma Firebase'de gerçekten var mı kontrol edilir, klasörler hazırlanır.
function baslat(q) {
  if (!BRANS[q.base]) throw new Error('geçersiz branş');
  if (!/^[-A-Za-z0-9_]{3,64}$/.test(String(q.comp || ''))) throw new Error('geçersiz yarışma');
  const boyut = Number(q.size) || 0;
  if (boyut <= 0 || boyut > MAX_BOYUT) throw new Error('geçersiz dosya boyutu');
  const mime = /^video\/[a-z0-9.+-]+/i.test(String(q.mime || '')) ? String(q.mime).split(';')[0] : 'video/webm';

  const f = hedefKlasor(q);

  const basliklar = {
    Authorization: 'Bearer ' + ScriptApp.getOAuthToken(),
    'X-Upload-Content-Type': mime,
    'X-Upload-Content-Length': String(boyut)
  };
  // Tarayıcının yükleme adresine doğrudan yükleyebilmesi için (CORS) isteği başlatan site adresi.
  if (q.origin && /^https?:\/\/[A-Za-z0-9.-]+(:\d+)?$/.test(String(q.origin))) basliklar.Origin = String(q.origin);

  const r = UrlFetchApp.fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable&fields=id', {
    method: 'post',
    contentType: 'application/json; charset=UTF-8',
    payload: JSON.stringify({ name: temiz(q.name) || 'video', parents: [f.getId()], mimeType: mime }),
    headers: basliklar,
    muteHttpExceptions: true
  });
  if (r.getResponseCode() !== 200) throw new Error('Drive oturumu açılamadı (' + r.getResponseCode() + ')');
  const h = r.getAllHeaders();
  const url = h.Location || h.location;
  if (!url) throw new Error('yükleme adresi alınamadı');
  return { ok: true, url: url };
}

// Tarayıcı doğrudan yükleyemezse (CORS) parça parça bu servis üzerinden aktarılır.
function parca(q) {
  const url = String(q.url || '');
  if (url.indexOf('https://www.googleapis.com/upload/drive/v3/files?') !== 0) throw new Error('geçersiz adres');
  const veri = Utilities.base64Decode(String(q.data || ''));
  const bas = Number(q.start) || 0, top = Number(q.total) || 0;
  if (!veri.length || !top) throw new Error('boş parça');
  const r = UrlFetchApp.fetch(url, {
    method: 'put',
    contentType: String(q.mime || 'application/octet-stream'),
    payload: veri,
    headers: { 'Content-Range': 'bytes ' + bas + '-' + (bas + veri.length - 1) + '/' + top },
    muteHttpExceptions: true
  });
  const c = r.getResponseCode();
  if (c === 308) return { ok: true, devam: true };
  if (c === 200 || c === 201) return { ok: true, devam: false, id: JSON.parse(r.getContentText()).id };
  throw new Error('parça yüklenemedi (' + c + ')');
}

// Yükleme bitti: dosya bağlantıyla görüntülenebilir yapılır (yalnızca Gymnaxis Videolar içindekiler).
function bitir(q) {
  const id = String(q.id || '');
  if (!/^[-\w]{10,}$/.test(id)) throw new Error('geçersiz dosya');
  const dosya = DriveApp.getFileById(id);
  if (!uygulamaDosyasi(dosya)) throw new Error('bu dosyaya izin yok');
  dosya.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  return { ok: true, id: id, url: 'https://drive.google.com/file/d/' + id + '/view' };
}

function uygulamaDosyasi(dosya) {
  const anaId = anaKlasor().getId();
  let kuyruk = [dosya.getParents()], d = 0;
  while (kuyruk.length && d < 8) {
    const it = kuyruk.shift();
    while (it.hasNext()) {
      const p = it.next();
      if (p.getId() === anaId) return true;
      kuyruk.push(p.getParents());
    }
    d++;
  }
  return false;
}
