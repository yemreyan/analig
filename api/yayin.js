// Gymexa Score — TV VERİ LİNKİ (yalnız okur)
// GET /api/yayin?comp=<id>&brans=ritmik|aerobik|artistik&profil=<id>&veri=hepsi|canli|son|siralama|sirada|podyum&format=json|xml|csv
//   kat=<kategori> (isteğe bağlı, elle sabitler) · dil=tr|en · n=<sıralama satırı>
//   logo=etkinlik|ek → logoyu PNG/JPG olarak döndürür (TV grafik sistemine görsel kaynağı)
// Profil (Yayın Overlay ekranında kaydedilen) kategori filtresi, dil, satır sayısı ve sıralama türünü belirler.
const V = require("../assets/yayinVeri-Yv01a2b3Cb2.js");
const FB = "https://analig-default-rtdb.firebaseio.com";
const ID = /^[A-Za-z0-9_\-]{1,120}$/;

const gonder = (res, kod, tip, govde, cache) => {
  res.statusCode = kod;
  res.setHeader("Content-Type", tip);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", cache || "public, max-age=0, s-maxage=1, stale-while-revalidate=2");
  res.end(govde);
};

module.exports = async (req, res) => {
  const q = new URL(req.url, "http://x").searchParams;
  const comp = q.get("comp") || "", brans = V.BRANS[q.get("brans")] ? q.get("brans") : "aerobik", pid = q.get("profil") || "";
  const format = ["json", "xml", "csv"].includes(q.get("format")) ? q.get("format") : "json";
  if (!ID.test(comp) || (pid && !ID.test(pid))) return gonder(res, 400, "application/json; charset=utf-8", JSON.stringify({ error: "comp/profil gecersiz" }));
  const B = `${FB}/${V.BRANS[brans]}/${encodeURIComponent(comp)}`;
  const al = p => fetch(`${B}/${p}.json`).then(r => (r.ok ? r.json() : null)).catch(() => null);
  try {
    // logo görseli
    const lg = q.get("logo");
    if (lg === "etkinlik" || lg === "ek") {
      const u = lg === "etkinlik" ? await al("etkinlikLogo") : pid ? await al(`yayinProfilleri/${pid}/logo/ek`) : null;
      const m = typeof u === "string" && u.match(/^data:(image\/(?:png|jpeg|webp|svg\+xml));base64,(.+)$/);
      if (!m) return gonder(res, 404, "text/plain; charset=utf-8", "logo yok", "public, max-age=0, s-maxage=30");
      return gonder(res, 200, m[1], Buffer.from(m[2], "base64"), "public, max-age=60, s-maxage=60");
    }
    const [isim, kats, aktif, flash, aktifAlet, prof] = await Promise.all([al("isim"), al("kategoriler"), al("aktifSporcu"), al("flashTrigger"), al("aktifAlet"), pid ? al(`yayinProfilleri/${pid}`) : null]);
    if (kats == null && isim == null) return gonder(res, 404, "application/json; charset=utf-8", JSON.stringify({ error: "yarisma bulunamadi" }));
    // arşive çekilmiş yarışma yayına veri vermez
    const ars = await al("arsivli");
    if (ars === true || ars === "true") return gonder(res, 404, "application/json; charset=utf-8", JSON.stringify({ error: "yarisma arsivde" }));
    const P = prof || {}, tb = P.tablo || {};
    const k0 = P.kontrol, kAktif = !!(k0 && k0.g && k0.g !== "gizle" && !(+k0.sure > 0 && Date.now() > (+k0.ts || 0) + k0.sure * 1000));
    const filtre = Array.isArray(P.kat) ? P.kat : [];
    const dil = q.get("dil") === "en" || q.get("dil") === "tr" ? q.get("dil") : P.dil || "tr";
    const kat = V.guncelKat({ kats: kats || {}, aktif, flash, filtre, kat: q.get("kat") || (kAktif && P.kontrol.kat) || null });
    // henüz çağrı/puan yoksa boş dönmesin: profilin (yoksa yarışmanın) ilk kategorisi
    const katY = kat || Object.keys(kats || {}).filter(k => V.katUygun(filtre, k) && !V.isFinal(kats, k)).concat(Object.keys(kats || {}).filter(k => V.katUygun(filtre, k)))[0] || null;
    const [spor, puan] = katY ? await Promise.all([al(`sporcular/${encodeURIComponent(katY)}`), al(`puanlar/${encodeURIComponent(katY)}`)]) : [null, null];
    const n = Math.min(50, Math.max(1, parseInt(q.get("n")) || tb.n || 10));
    const pk = V.paket({ comp, isim, brans, kats: kats || {}, kat: katY, spor, puan, aktif, flash, aktifAlet, filtre, dil, n, tur: tb.tur, nSirada: (P.sirada && P.sirada.n) || 3 });
    const o = new URL(`https://${req.headers.host || "tcfsystem.vercel.app"}/api/yayin`);
    o.searchParams.set("comp", comp); o.searchParams.set("brans", brans); if (pid) o.searchParams.set("profil", pid);
    const lgU = t => { const x = new URL(o); x.searchParams.set("logo", t); return x.toString(); };
    const L = P.logo || {};
    pk.logos = { tcf: L.tcf === false ? null : `https://${req.headers.host || "tcfsystem.vercel.app"}/logo.png`, gymexa: L.gymexa === false ? null : `https://${req.headers.host || "tcfsystem.vercel.app"}/brand/gymnaxis-logo.svg`, event: L.etkinlik === false ? null : lgU("etkinlik"), extra: L.ek ? lgU("ek") : null };
    pk.profile = pid ? { id: pid, name: P.ad || "" } : null;
    if (P.kapali) pk.offAir = true;
    const veri = q.get("veri") || "hepsi";
    const SEC = { canli: pk.current ? [pk.current] : [], son: pk.lastScore ? [pk.lastScore] : [], siralama: pk.standings, sirada: pk.upNext, podyum: pk.podium };
    const govde = veri in SEC ? SEC[veri] : pk;
    if (format === "xml") return gonder(res, 200, "application/xml; charset=utf-8", '<?xml version="1.0" encoding="UTF-8"?>' + V.xml(govde, "gymexa"));
    if (format === "csv") return gonder(res, 200, "text/csv; charset=utf-8", "﻿" + V.csv(Array.isArray(govde) ? govde : [].concat(pk.current ? [Object.assign({ type: "current" }, pk.current)] : [], pk.lastScore ? [Object.assign({ type: "lastScore" }, pk.lastScore)] : [])));
    return gonder(res, 200, "application/json; charset=utf-8", JSON.stringify(govde));
  } catch (e) {
    return gonder(res, 500, "application/json; charset=utf-8", JSON.stringify({ error: "sunucu hatasi" }), "no-store");
  }
};
