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
    const [isim, kats0, aktif, flash, aktifAlet, ars, il, bas, bit, intl, dil0, logo, takimSon, tded, tur0, syY] = await Promise.all([
      al("isim"), al("kategoriler"), al(brans === "artistik" ? "aktifSporcuBilgi" : "aktifSporcu"), al("flashTrigger"), al("aktifAlet"), al("arsivli"), al("il"),
      al("baslangicTarihi"), al("bitisTarihi"), al("uluslararasi"), al("ciktiDili"), fetch(`${B}/etkinlikLogo.json?shallow=true`).then(r => r.ok ? r.json() : null).catch(() => null), al("takimSonuclari"), al("teamDeductions"), al("tur"), al("seyirciYayin")]);
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
    const alet = ap && q.get("alet") && aletler(kat).includes(q.get("alet")) ? q.get("alet") : null;
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
    const teams = rit && kat && !V.isFinal(kats, kat) && !grupKat && takimSon !== false
      ? V.takimlar({ kats, kat, spor, puan, intl: !!(intl || tur0 === "uluslararasi"), kesintiler: tded }).map(t => {
          const o = { rank: t.sira, name: t.ad, noc: t.ulke || "", flag: t.ulke ? V.bayrakUrl(t.ulke) : null, members: t.uyeler.join(", "), apps: {}, ded: t.kesinti ? V.f3(t.kesinti) : "", total: V.f3(t.total) };
          aletler(kat).forEach(a => { o.apps[a] = V.f3(t.apps[a] || 0); }); return o; })
      : null;
    const akt = V.aktifListe(aktif)[0] || null;
    const N = kat ? V.siradakiler({ brans, kats, kat, spor, puan, alet: rit && aktifAlet ? aktifAlet[kat] || null : art && akt && akt._kat === kat ? akt.alet || null : null, cagrilan: akt, n: 5 }) : { sonraki: [] };
    const pk = V.paket({ comp, isim, brans, kats, kat, spor, puan, aktif, flash, aktifAlet, filtre: [], dil: en ? "en" : "tr", n: 1 });
    const temizle = o => { if (o) { delete o.categoryId; delete o.id; } return o; };
    // yayınlanmış puan: yalnız son 10 dk
    const last = pk.lastScore && flash && Date.now() - (+flash.timestamp || 0) < 6e5 ? temizle(pk.lastScore) : null;
    const cur = pk.current && akt && Date.now() - (+akt.ts || 0) < 18e5 ? Object.assign(temizle(pk.current), { cat: akt._kat }) : null;
    if (last && flash) last.cat = flash.kategori || "";
    return gonder(res, 200, {
      comp: { name: isim || "", city: il || "", start: bas || "", end: bit || "", intl: !!intl, logo: !!logo, discipline: brans, en, stream: syY && syY.url && !syY.kapali ? ytCoz(syY.url) : null },
      cats,
      live: { current: cur, last },
      view: { cat: kat, app: alet, name: kat ? V.katAd(kats, kat, en) : "", appName: alet ? V.aletAd(alet, en, kat) : "", final: kat ? V.isFinal(kats, kat) : false,
        entries: S.girisSayisi, complete: S.tamamlandi, rows, teams,
        next: (N.sonraki || []).map((g, i) => { const r = V.satir(g, null, en); delete r.id; r.order = i + 1; return r; }) },
      t: Date.now()
    });
  } catch (e) {
    return gonder(res, 500, { error: "hata" });
  }
};
