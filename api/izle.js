// Gymexa Score — SEYİRCİ VERİSİ (yalnız okur). Bağımsız seyirci sitesi (gymscore) bunu SUNUCU tarafında çağırır;
// tarayıcı Firebase'i ya da yarışma kimliğini görmez.
// ARTİSTİK (2026-10-09): puanlar/<kat>/<alet>/<sporcu> (yayinVeri artistik siralama/sonuc), çağrı aktifSporcuBilgi, aletler olimpik sırada, takım yok.
// GET /api/izle?comp=<id>&brans=ritmik|aerobik|artistik&kat=<kategori>&alet=<alet>&dil=tr|en
//   kat yoksa: son puanın / çağrılan sporcunun kategorisi, o da yoksa ilk kategori.
const V = require("../assets/yayinVeri-Yv01a2b3Cb2.js");
const FB = "https://analig-default-rtdb.firebaseio.com";
const ID = /^[A-Za-z0-9_\-]{1,120}$/;

const gonder = (res, kod, govde) => {
  res.statusCode = kod;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=0, s-maxage=2, stale-while-revalidate=3");
  res.end(JSON.stringify(govde));
};
const ISIM_SIRA = ["kucuk", "minik", "yildiz", "genc", "buyuk"];
// Seyirci canlı yayın (Paneller › Seyirci sitesi): yalnız YouTube; video kimliği / kanal kimliği çıkarılır, başka adres yayılmaz
function ytCoz(u) {
  const t = String(u || "").trim(); if (!/^https?:\/\/([a-z0-9-]+\.)?(youtube\.com|youtu\.be|youtube-nocookie\.com)\//i.test(t)) return null;
  let m = t.match(/youtu\.be\/([A-Za-z0-9_-]{11})/) || t.match(/[?&]v=([A-Za-z0-9_-]{11})/) || t.match(/\/(?:live|embed|shorts)\/([A-Za-z0-9_-]{11})/);
  if (m) return { yt: m[1] };
  m = t.match(/\/channel\/(UC[A-Za-z0-9_-]{20,24})/); if (m) return { ytc: m[1] };
  return { url: t.split("#")[0] };
}

module.exports = async (req, res) => {
  const q = new URL(req.url, "http://x").searchParams;
  const comp = q.get("comp") || "", brans = V.BRANS[q.get("brans")] ? q.get("brans") : "ritmik";
  if (!ID.test(comp)) return gonder(res, 400, { error: "gecersiz" });
  const B = `${FB}/${V.BRANS[brans]}/${encodeURIComponent(comp)}`;
  const al = p => fetch(`${B}/${p}.json`).then(r => (r.ok ? r.json() : null)).catch(() => null);
  try {
    const [isim, kats0, aktif, flash, aktifAlet, ars, il, bas, bit, intl, dil0, logo, takimSon, tded, tur0, syY, sa0, cl] = await Promise.all([
      al("isim"), al("kategoriler"), al(brans === "artistik" ? "aktifSporcuBilgi" : "aktifSporcu"), al("flashTrigger"), al("aktifAlet"), al("arsivli"), al("il"),
      al("baslangicTarihi"), al("bitisTarihi"), al("uluslararasi"), al("ciktiDili"), fetch(`${B}/etkinlikLogo.json?shallow=true`).then(r => r.ok ? r.json() : null).catch(() => null), al("takimSonuclari"), al("teamDeductions"), al("tur"), al("seyirciYayin"), al("seyirciAyar"), brans === "ritmik" ? al("cikisListesi") : null]);
    // Paneller › Seyirci sitesi görünüm ayarları (2026-10-09): aa:false → genel tasnif (all-around) yok, takim:false → takım sonuçları yok
    const sa = sa0 && typeof sa0 === "object" ? sa0 : {}, aaAcik = sa.aa !== false, takimAcik = sa.takim !== false;
    if (isim == null && kats0 == null) return gonder(res, 404, { error: "yok" });
    if (ars === true || ars === "true") return gonder(res, 404, { error: "yok" });
    const kats = kats0 || {};
    const en = q.get("dil") === "en" || (q.get("dil") !== "tr" && (dil0 === "en" || (intl && dil0 !== "tr")));
    const rit = brans === "ritmik", art = brans === "artistik", ap = rit || art;
    const artIc = (a, k) => { const g = V.artGor(a, k), erk = /erkek/i.test(String(k)); return g === "atlama" || g === "yer" ? g + (erk ? "_e" : "_k") : g === "barfiks" && !erk ? "barfiks_k" : g; };
    const OLY = a => (a.some(x => x === "asimetrik" || x === "denge") ? ["atlama", "asimetrik", "denge", "yer"] : ["yer", "kulplu", "mantar", "halka", "atlama", "paralel", "barfiks"]);
    // kategoriler: önce eleme (yaş sırası), finaller sonda
    const yas = k => { const i = ISIM_SIRA.findIndex(x => String(k).replace(/^final_/, "").startsWith(x)); return i < 0 ? 9 : i; };
    const ids = Object.keys(kats).filter(k => kats[k] && typeof kats[k] === "object")
      .sort((a, b) => (V.isFinal(kats, a) - V.isFinal(kats, b)) || (yas(a) - yas(b)) || String(a).localeCompare(String(b)));
    const aletler = k => { const d = kats[k] || {}; const a = Array.isArray(d.aletler) && d.aletler.length ? d.aletler : d.alet ? [d.alet] : []; return !ap ? [] : art ? [...a].sort((x, y) => { const O = OLY(a), i = O.indexOf(x), j = O.indexOf(y); return (i < 0 ? 99 : i) - (j < 0 ? 99 : j); }) : a; };
    const cats = ids.map(k => ({ id: k, name: V.katAd(kats, k, en), final: V.isFinal(kats, k), app: aletler(k).map(a => ({ id: a, name: V.aletAd(a, en, k), ic: art ? artIc(a, k) : undefined })) }));

    let kat = q.get("kat");
    if (!kat || !kats[kat]) kat = V.guncelKat({ kats, aktif, flash, filtre: [] }) || ids[0] || null;
    let alet = ap && q.get("alet") && aletler(kat).includes(q.get("alet")) ? q.get("alet") : null;
    // genel tasnif kapalı: alet istenmediyse o kategoride şu an yapılan alet (yoksa ilk alet) gösterilir
    if (ap && !alet && !aaAcik && kat) { const al0 = aletler(kat); const ak = rit && aktifAlet ? aktifAlet[kat] : null; alet = al0.includes(ak) ? ak : al0[0] || null; }
    const [spor, puan] = kat ? await Promise.all([al(`sporcular/${encodeURIComponent(kat)}`), al(`puanlar/${encodeURIComponent(kat)}`)]) : [null, null];
    const kd = kats[kat] || {};
    const S = kat ? V.siralama({ brans, kats, kat, spor, puan, alet }) : { satirlar: [], girisSayisi: 0, tamamlandi: false };
    let piv = null;
    const rows = S.satirlar.map(s => {
      const r = V.satir(s.giris, s, en, { ritmik: rit });
      delete r.id;
      if (ap && !alet) { const p = art ? (piv || (piv = V.artPivot(puan || {})))[s.giris.key] : (puan || {})[s.giris.key]; r.apps = {}; aletler(kat).forEach(a => { const x = V.sonuc(brans, kd, p, a); r.apps[a] = x ? (x.irm || V.f3(x.total)) : ""; }); }
      return r;
    });
    // takım sıralaması (ritmik ferdi kategori, final değil, takım sonuçları kapalı değilse) — uluslararasıda ülke içindeki takım
    const grupKat = /grup/.test(String(kat || "")) || kd.tip === "grup" || kd.tip === "takim" || kd.grupMu === true;
    // takım sonuçları: takım olarak kayıtlı TÜM takımlar (hepsi) — tek sporcusu yarışmış ya da henüz yarışmamış olsa da; takımı olmayan sporcu girmez
    const teams = rit && kat && !V.isFinal(kats, kat) && !grupKat && takimSon !== false && takimAcik
      ? V.takimlar({ kats, kat, spor, puan, intl: !!(intl || tur0 === "uluslararasi"), kesintiler: tded, hepsi: true }).map(t => {
          const o = { rank: t.sira, name: t.ad, noc: t.ulke || "", flag: t.ulke ? V.bayrakUrl(t.ulke) : null, members: t.uyeler.join(", "), done: t.yarisan, size: t.uyeSay, apps: {}, ded: t.kesinti ? V.f3(t.kesinti) : "", total: V.f3(t.total) };
          aletler(kat).forEach(a => { o.apps[a] = V.f3(t.apps[a] || 0); }); return o; })
      : null;
    const akt = V.aktifListe(aktif)[0] || null;
    const N = kat ? V.siradakiler({ brans, kats, kat, spor, puan, alet: rit && aktifAlet ? aktifAlet[kat] || null : art && akt && akt._kat === kat ? akt.alet || null : null, cagrilan: akt, n: 5 }) : { sonraki: [] };
    // UP NEXT (2026-10-09): başhakemin sporcu çağırdığı kategori (çağrı yoksa görüntülenen) + günlük çıkış akışı (cikisListesi: sporcu+alet adımları);
    //  çağrılan adımdan sonraki, aynı gündeki, puanı bitmemiş 5 adım. Akış yoksa eski sıralama (siradakiler).
    let nextRows = null, nextKat = kat;
    if (rit && cl && typeof cl === "object") {
      const A = v => Array.isArray(v) ? v : Object.values(v || {});
      const nk = akt && akt._kat && kats[akt._kat] ? akt._kat : kat;
      const adim = []; A(cl.gunler).forEach((g, gi) => A(g && g.bloklar).forEach(b => { if (!b || b.tip !== "grup" || b.kat !== nk) return; const k = A(b.aletler).length || 1; for (let ri = 0; ri < k; ri++) A(b.rows).forEach(r => { const x = A(r && r.r)[ri]; x && x.a && adim.push({ id: String(x.a), al: x.al || A(b.aletler)[ri], n: gi }); }); }));
      if (adim.length) {
        const [sp2, pu2] = nk === kat ? [spor, puan] : await Promise.all([al(`sporcular/${encodeURIComponent(nk)}`), al(`puanlar/${encodeURIComponent(nk)}`)]);
        const bitti = s0 => { const x = ((pu2 || {})[s0.id] || {})[s0.al]; return !!(x && typeof x === "object" && (x.durum === "tamamlandi" || x.kilitli === true || x.durum === "yarishmadi" || x.irm || x.yayinBekliyor)); };
        const cid = akt && akt._kat === nk ? String(akt.id || "") : "", cal = cid ? (akt.alet || (aktifAlet || {})[nk] || "") : "";
        let ix = -1; if (cid) { adim.forEach((s0, i) => { if (s0.id === cid && s0.al === cal) ix = i; }); if (ix < 0) ix = adim.findIndex(s0 => s0.id === cid); }
        const gun = ix >= 0 ? adim[ix].n : (adim.find(s0 => !bitti(s0)) || adim[0]).n;
        const G0 = V.girisler(nk, sp2, pu2), G = {}, out = []; (Array.isArray(G0) ? G0 : Object.values(G0 || {})).forEach(x => { if (x && x.key != null) G[String(x.key)] = x; });
        for (let i = ix + 1; i < adim.length && out.length < 5; i++) { const s0 = adim[i]; if (s0.n !== gun || bitti(s0)) continue; const g = G[s0.id]; if (!g) continue; const r = V.satir(g, null, en); delete r.id; r.order = out.length + 1; r.app = V.aletAd(s0.al, en, nk); r.appId = s0.al; out.push(r); }
        nextRows = out; nextKat = nk;
      }
    }
    const pk = V.paket({ comp, isim, brans, kats, kat, spor, puan, aktif, flash, aktifAlet, filtre: [], dil: en ? "en" : "tr", n: 1 });
    const temizle = o => { if (o) { delete o.categoryId; delete o.id; } return o; };
    // yayınlanmış puan: yalnız son 10 dk
    const last = pk.lastScore && flash && Date.now() - (+flash.timestamp || 0) < 6e5 ? temizle(pk.lastScore) : null;
    const cur = pk.current && akt && Date.now() - (+akt.ts || 0) < 18e5 ? Object.assign(temizle(pk.current), { cat: akt._kat }) : null;
    if (last && flash) last.cat = flash.kategori || "";
    return gonder(res, 200, {
      comp: { name: isim || "", city: il || "", start: bas || "", end: bit || "", intl: !!intl, aa: aaAcik, teams: takimAcik, logo: !!logo, discipline: brans, en, stream: syY && syY.url && !syY.kapali ? ytCoz(syY.url) : null },
      cats,
      live: { current: cur, last },
      view: { cat: kat, app: alet, name: kat ? V.katAd(kats, kat, en) : "", appName: alet ? V.aletAd(alet, en, kat) : "", final: kat ? V.isFinal(kats, kat) : false,
        entries: S.girisSayisi, complete: S.tamamlandi, rows, teams,
        next: nextRows || (N.sonraki || []).map((g, i) => { const r = V.satir(g, null, en); delete r.id; r.order = i + 1; return r; }), nextName: nextKat ? V.katAd(kats, nextKat, en) : "", nextFlow: !!nextRows },
      t: Date.now()
    });
  } catch (e) {
    return gonder(res, 500, { error: "hata" });
  }
};
