// RİTMİK ALET SEMBOLLERİ — tek set (pembe→mor degrade), canlı skor / finaller / sporcu kartı ortak kullanır.
// raKey(x): alet id'si veya adı (TR/EN) → cember|top|labut|kurdele|ip|serbest|grup_seri1|grup_seri2
// raSvg(k,{boyut,acik}): SVG metni · raAd(k,en): okunur ad · RaIkon: React (jsx fonksiyonu e ile)
let _n=0;
const AD={cember:["Çember","Hoop"],top:["Top","Ball"],labut:["Labut","Clubs"],kurdele:["Kurdele","Ribbon"],ip:["İp","Rope"],serbest:["Serbest","WA"],grup_seri1:["1. Seri","Routine 1"],grup_seri2:["2. Seri","Routine 2"]};
export const raKey=t=>{if(!t)return"";const s=String(t).toLocaleLowerCase("tr-TR").trim();if(AD[s])return s;
 if(/grup_seri1|1\.?\s*seri|routine\s*1|seri\s*1/.test(s))return"grup_seri1";if(/grup_seri2|2\.?\s*seri|routine\s*2|seri\s*2/.test(s))return"grup_seri2";
 if(/çember|cember|hoop/.test(s))return"cember";if(/kurdele|ribbon/.test(s))return"kurdele";if(/labut|lobut|club/.test(s))return"labut";if(/^top\b|\btop$|ball/.test(s))return"top";if(/^ip\b|\bip$|rope|^i̇p/.test(s))return"ip";if(/serbest|free/.test(s))return"serbest";return""};
export const raAd=(k,en)=>{const x=AD[raKey(k)||k];return x?x[en?1:0]:String(k||"")};
export const raSvg=(k,o={})=>{const id="raG"+ ++_n,b=o.boyut||"100%",a=o.acik?"#F9A8D4":"#EC4899",z=o.acik?"#C4B5FD":"#7C3AED",d=o.acik?"#E9D5FF":"#581C87";
 const g=`<defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${z}"/></linearGradient><radialGradient id="${id}r" cx=".35" cy=".3" r=".75"><stop offset="0" stop-color="#FCE7F3"/><stop offset=".35" stop-color="${a}"/><stop offset="1" stop-color="${z}"/></radialGradient></defs>`,G=`url(#${id})`,S=(w)=>`fill="none" stroke="${G}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"`;
 const kl=(r)=>`<g transform="rotate(${r} 32 32)"><path d="M32 7c4.6 0 6.3 6.4 4.8 15.5L34.2 45h-4.4l-2.6-22.5C25.7 13.4 27.4 7 32 7z" fill="${G}"/><path d="M29.8 45h4.4l-.4 7.6h-3.6z" fill="${d}"/><circle cx="32" cy="55" r="2.9" fill="${d}"/><path d="M28.6 17.5h6.8" stroke="#fff" stroke-opacity=".75" stroke-width="1.6" stroke-linecap="round"/></g>`;
 const P={
  cember:`<circle cx="32" cy="32" r="23" ${S(4.6)}/><circle cx="32.8" cy="31.4" r="19.6" fill="none" stroke="${G}" stroke-opacity=".45" stroke-width="1.4"/>`,
  top:`<path d="M9 44c6 10 30 15 45 1" ${S(2.6)} stroke-opacity=".7"/><circle cx="32" cy="29" r="17" fill="url(#${id}r)"/><ellipse cx="25.5" cy="22.5" rx="5" ry="3.6" fill="#fff" fill-opacity=".5" transform="rotate(-30 25.5 22.5)"/>`,
  labut:kl(-24)+kl(24),
  kurdele:`<path d="M6 58 20 44" stroke="${d}" stroke-width="2.6" stroke-linecap="round"/><path d="M20 44c13-9 1-16-7-11-7 5 3 15 15 9 11-6 13-21 3-24-9-3-14 9-2 12 12 3 22-6 26-18" ${S(4.2)}/>`,
  ip:`<path d="M19 50C8 38 9 17 24 12c14-5 30 2 31 15 1 12-11 18-21 14-9-4-8-15 1-16 8-1 12 6 9 13-2 6-5 9-7 12" ${S(3)}/><path d="M19 50l-2.5 7.5" ${S(5.5)}/><path d="M33 47.5l2 7.5" ${S(5.5)}/>`,
  serbest:`<path d="M32 9l5.6 15.4L53 30l-15.4 5.6L32 51l-5.6-15.4L11 30l15.4-5.6z" fill="${G}"/><circle cx="50" cy="12" r="3" fill="${G}"/><circle cx="14" cy="50" r="2.2" fill="${G}"/>`,
  grup_seri1:`<circle cx="32" cy="32" r="25" fill="none" stroke="${G}" stroke-opacity=".35" stroke-width="1.6"/>${[[32,15],[48,27],[42,46],[22,46],[16,27]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="5.4" fill="${G}"/>`).join("")}<text x="32" y="37" text-anchor="middle" font-family="Inter,Arial,sans-serif" font-weight="800" font-size="14" fill="${d}">1</text>`,
  grup_seri2:`<circle cx="32" cy="32" r="25" fill="none" stroke="${G}" stroke-opacity=".35" stroke-width="1.6"/>${[[32,15],[48,27],[42,46],[22,46],[16,27]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="5.4" fill="${G}"/>`).join("")}<text x="32" y="37" text-anchor="middle" font-family="Inter,Arial,sans-serif" font-weight="800" font-size="14" fill="${d}">2</text>`};
 const key=raKey(k)||k;return`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="${b}" height="${b}" role="img" aria-label="${raAd(key)}">${g}${P[key]||P.serbest}</svg>`};
// React: e = jsx runtime (main'den j)
export const RaIkon=(e,{k,boyut=28,acik=!1,ad=!1,en=!1,style})=>{const key=raKey(k);if(!key)return null;const ic=e.jsx("span",{title:raAd(key,en),style:{display:"inline-block",width:boyut,height:boyut,lineHeight:0,flexShrink:0,verticalAlign:"middle"},dangerouslySetInnerHTML:{__html:raSvg(key,{acik})}});
 return ad?e.jsxs("span",{style:{display:"inline-flex",flexDirection:"column",alignItems:"center",gap:2,...style},children:[ic,e.jsx("span",{style:{fontSize:Math.max(9,boyut*.32),fontWeight:800,letterSpacing:".04em",opacity:.75,textTransform:"uppercase"},children:raAd(key,en)})]}):ic};
// Kullanıcının verdiği resmi sembol seti (/brans/alet/*.png, "Artistik ve Ritmik Cimnastik İkonları") — tasarım değiştirilmeden kesildi.
// Ritmikte görseli olan aletler PNG; serbest / grup serileri için SVG yedek. Koyu zeminde beyaz yuvarlak zemin üzerinde gösterilmeli (lacivert siluetler).
// serbest (2026-10-09): kullanıcının verdiği "Zarif Ritmik Jimnastik Amblemi" (pembe, tasarım korunarak 256px); İngilizce ad resmi listedeki gibi "WA"
const RA_IMG={serbest:"/brans/alet/serbest.png",cember:"/brans/alet/cember.png",top:"/brans/alet/top.png",labut:"/brans/alet/labut.png",kurdele:"/brans/alet/kurdele.png",ip:"/brans/alet/ip.png"};
export const raImg=k=>RA_IMG[raKey(k)||k]||null;
// ARTİSTİK: alet id'si (yer, kulplu, mantar, halka, atlama, paralel, barfiks, denge, asimetrik) veya adı → görsel; kadın/erkek kategoriye göre
const ART_AD={yer:["Yer","Floor Exercise"],kulplu:["Kulplu Beygir","Pommel Horse"],mantar:["Mantar","Mushroom"],halka:["Halka","Still Rings"],atlama:["Atlama Masası","Vault"],asimetrik:["Asimetrik Paralel","Uneven Bars"],paralel:["Paralel Bar","Parallel Bars"],barfiks:["Barfiks","Horizontal Bar"],denge:["Denge Aleti","Balance Beam"]};
const _kiz=kat=>{const c=String(kat||"").toLocaleLowerCase("tr-TR");return/kiz|kız|kadin|kadın|women|female|_k$/.test(c)&&!/erkek|\bmen\b|male/.test(c.replace(/women|female/g,""))};
export const artKey=t=>{const x=String(t||"").toLocaleLowerCase("tr-TR");for(const k of Object.keys(ART_AD))if(x.includes(k))return k;return/beygir|pommel/.test(x)?"kulplu":/mushroom/.test(x)?"mantar":/floor/.test(x)?"yer":/ring/.test(x)?"halka":/vault/.test(x)?"atlama":/uneven/.test(x)?"asimetrik":/parallel/.test(x)?"paralel":/horizontal|high bar/.test(x)?"barfiks":/beam/.test(x)?"denge":""};
export const artAd=(t,en,kat)=>{const k0=artKey(t),k=k0&&globalThis.__artGor?__artGor(k0,kat):k0;return k?ART_AD[k][en?1:0]:String(t||"")};
const _erk=(k,kat)=>{const c=String(kat||"").toLocaleLowerCase("tr-TR");if(/erkek|men\b|male|_e$/.test(c))return!0;if(/kiz|kız|kadin|kadın|women|female|_k$/.test(c))return!1;return["kulplu","mantar","halka","paralel","barfiks"].includes(k)};
// 2026-10-09 yeni set ("Artistik Cimnastik Aletleri İnfografiği"): mantar kendi sembolü; barfiks kız kategorisinde kız figürlü (barfiks_k)
export const artImg=(t,kat)=>{const k0=artKey(t);if(!k0)return null;const k=globalThis.__artGor?__artGor(k0,kat):k0;if(k==="mantar")return"/brans/alet/mantar.png";if(k==="kulplu")return"/brans/alet/kulplu.png";if(k==="barfiks")return`/brans/alet/barfiks${_kiz(kat)?"_k":""}.png`;if(k==="atlama"||k==="yer")return`/brans/alet/${k}_${_erk(k,kat)?"e":"k"}.png`;return`/brans/alet/${k}.png`};
// Branş sembolü (genel): ritmik / artistik (kadın-erkek) / diğerleri /brans/<br>.png
export const bransImg=(br,kat)=>br==="ritmik"?"/brans/alet/ritmik.png":br==="artistik"?(_erk("",kat)&&/erkek|men\b|male/.test(String(kat||"").toLocaleLowerCase("tr-TR"))?"/brans/alet/artistik_erkek.png":"/brans/alet/artistik_kadin.png"):`/brans/${br}.png`;
