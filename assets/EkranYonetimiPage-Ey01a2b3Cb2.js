import{j as e,d as db,a as usDisc,u as usAuth,l as logAction}from"./main-C2LpyYUGCb2.js";import{r as R}from"./vendor-react-Cxw6bqwhCb2.js";import{k as ref,o as onValue,l as get,m as update,v as set}from"./vendor-firebase-940mxgRVCb2.js";

// EKRAN YÖNETİMİ (2026-10-10) — salondaki PC'lere uzaktan içerik yayınlama (tüm branşlar ortak).
//  Ekran (her PC): /screen  (giriş istemez) — ilk açılışta 4 haneli eşleştirme kodu; kimlik tarayıcıda kalıcı (gxEkranId; ?kanal=ad ile sabit kimlik:
//   aynı PC'de birden çok pencere/ekran için). Onaylanınca yayınlanan içerik tam ekran (sistem sayfası iframe'de, görsel/video, logo); yumuşak geçiş.
//   15 sn'de bir nabız; internet koparsa son içerik kalır (localStorage). Wake Lock ile uyku engellenir.
//  Yönetim (/rhythmic|aerobic|artistic/screens): kodla ekran ekle + ad ver, çevrimiçi durumu, gösterdiği içerik; içerik seç → "Yayınla" (tek ekrana ya da seçililere);
//   komutlar: Tanıt (adı ekranda büyük), Yenile, Karart/Devam, Logo, Sil.
//  Veri (yarışmadan bağımsız): criteria/ekranlar/<id> = {kod, onay, ad, ilk, hedef:{tip, url, ad, base, comp, ts, kim}, karart, komut:{tip, ts}, nabiz:{ts, w, h, ua, gos}}
const h=(t,p,...c)=>{const{key:k,...q}=p||{};return c.length>1?e.jsxs(t,{...q,children:c},k):c.length?e.jsx(t,{...q,children:c[0]},k):e.jsx(t,q,k)};
const MI=(n,st)=>e.jsx("span",{className:"material-icons-round",style:{fontSize:20,...st},children:n});
const KOK="criteria/ekranlar",yolE=id=>KOK+"/"+id;
const lsAl=k=>{try{return localStorage.getItem(k)||""}catch{return""}},lsYaz=(k,v)=>{try{localStorage.setItem(k,v)}catch{}};
const rastgele=n=>{const a="abcdefghijkmnpqrstuvwxyz23456789";let s="";const r=crypto&&crypto.getRandomValues?crypto.getRandomValues(new Uint8Array(n)):Array.from({length:n},()=>Math.random()*256|0);for(let i=0;i<n;i++)s+=a[r[i]%a.length];return s};
const CANLI_MS=45e3;
const medyaMi=u=>/^data:(image|video)\//.test(u||"")||/\.(png|jpe?g|gif|webp|svg|mp4|webm|mov)(\?|#|$)/i.test(u||"");
const videoMu=u=>/^data:video\//.test(u||"")||/\.(mp4|webm|mov)(\?|#|$)/i.test(u||"");

// ======================================================= EKRAN (PC) =======================================================
const CSS_E=`.gek{position:fixed;inset:0;background:#000;color:#fff;font-family:"Plus Jakarta Sans",Inter,system-ui,sans-serif;overflow:hidden;cursor:none;user-select:none}
.gek.imlec{cursor:default}
.gek-kat{position:absolute;inset:0;opacity:0;transition:opacity .7s ease}
.gek-kat.on{opacity:1}
.gek-kat iframe{position:absolute;inset:0;width:100%;height:100%;border:0;background:#000}
.gek-kat img,.gek-kat video{position:absolute;inset:0;width:100%;height:100%;object-fit:contain;background:#000}
.gek-logo{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:5vh;background:radial-gradient(1200px 700px at 50% 120%,#1E1B4B 0%,#0B0F1E 55%,#05070F 100%)}
.gek-logo .ls{display:flex;align-items:center;gap:6vw}
.gek-logo .lk{width:min(26vw,40vh);height:min(26vw,40vh);border-radius:50%;background:#fff;display:grid;place-items:center;box-shadow:0 30px 80px -30px rgba(139,92,246,.6),0 0 0 6px rgba(255,255,255,.08)}
.gek-logo .lk img{position:static;width:78%;height:78%;object-fit:contain;background:none}
.gek-logo .ay{width:2px;height:26vh;background:linear-gradient(180deg,transparent,rgba(255,255,255,.35),transparent)}
.gek-logo .ad{font-size:clamp(20px,3.2vw,48px);font-weight:900;letter-spacing:.04em;text-align:center;max-width:86vw;line-height:1.2}
.gek-logo .saat{font-size:clamp(16px,2vw,30px);font-weight:800;letter-spacing:.2em;color:#A5B4FC;font-variant-numeric:tabular-nums}
.gek-esle{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3vh;background:radial-gradient(1000px 600px at 50% 0%,#312E81,#0B0F1E 60%,#05070F);text-align:center;padding:4vw}
.gek-esle .k1{font-size:clamp(14px,1.6vw,24px);font-weight:800;letter-spacing:.3em;text-transform:uppercase;color:#C4B5FD}
.gek-esle .kod{font-size:clamp(80px,16vw,260px);font-weight:900;letter-spacing:.12em;line-height:1;background:linear-gradient(180deg,#fff,#C4B5FD);-webkit-background-clip:text;background-clip:text;color:transparent;font-variant-numeric:tabular-nums}
.gek-esle .ac{font-size:clamp(14px,1.5vw,22px);font-weight:600;color:#CBD5E1;max-width:900px;line-height:1.5}
.gek-esle .id{font-size:12px;color:#64748B;font-family:ui-monospace,Menlo,monospace}
.gek-esle img{height:clamp(40px,6vh,70px)}
.gek-tanit{position:absolute;inset:0;z-index:30;display:grid;place-items:center;background:rgba(5,7,15,.82);animation:gekTn .4s ease both}
.gek-tanit div{text-align:center}.gek-tanit b{display:block;font-size:clamp(48px,10vw,180px);font-weight:900;line-height:1.05;padding:0 4vw}.gek-tanit small{display:block;margin-top:2vh;font-size:clamp(14px,1.6vw,26px);font-weight:800;letter-spacing:.3em;color:#A5B4FC}
@keyframes gekTn{from{opacity:0;transform:scale(1.04)}to{opacity:1;transform:none}}
.gek-karart{position:absolute;inset:0;z-index:25;background:#000;opacity:0;pointer-events:none;transition:opacity .8s ease}.gek-karart.on{opacity:1}
.gek-tam{z-index:40;position:absolute;right:20px;bottom:20px;opacity:0;transition:opacity .3s;display:flex;gap:8px}
.gek.imlec .gek-tam{opacity:1}
.gek-tam button{border:1px solid rgba(255,255,255,.25);background:rgba(15,23,42,.7);color:#fff;border-radius:12px;padding:10px 14px;font:800 14px inherit;font-family:inherit;cursor:pointer;display:inline-flex;align-items:center;gap:6px}
.gek-bag{position:absolute;left:16px;bottom:16px;z-index:35;font-size:12px;font-weight:800;padding:6px 10px;border-radius:999px;background:rgba(220,38,38,.85);color:#fff;display:flex;align-items:center;gap:6px}
`;
function LogoEkran({base,comp}){const[C,setC]=R.useState(null),[sa,setSa]=R.useState(()=>new Date());
 R.useEffect(()=>{setC(null);if(!base||!comp)return;const st={},u=["isim","etkinlikLogo"].map(k=>onValue(ref(db,`${base}/${comp}/${k}`),s=>{st[k]=s.val();setC({...st})}));return()=>u.forEach(f=>f())},[base,comp]);
 R.useEffect(()=>{const t=setInterval(()=>setSa(new Date()),1e3);return()=>clearInterval(t)},[]);
 const ev=C&&C.etkinlikLogo||null;
 return h("div",{className:"gek-logo"},h("div",{className:"ls"},h("div",{className:"lk"},h("img",{src:"/logo.png",alt:"TCF"})),ev?h("div",{className:"ay"}):null,ev?h("div",{className:"lk"},h("img",{src:ev,alt:""})):null),C&&C.isim?h("div",{className:"ad"},C.isim):null,h("div",{className:"saat"},sa.toLocaleTimeString("tr-TR",{hour:"2-digit",minute:"2-digit"})))}
const hedefAnahtar=x=>x?[x.tip,x.url||"",x.base||"",x.comp||"",x.ts||0].join("|"):"";
function Icerik({x,hazir}){R.useEffect(()=>{if(!x||x.tip!=="sayfa")hazir&&hazir()},[]);
 if(!x)return null;
 if(x.tip==="logo")return e.jsx(LogoEkran,{base:x.base,comp:x.comp});
 if(x.tip==="medya")return videoMu(x.url)?h("video",{src:x.url,autoPlay:!0,loop:!0,muted:!0,playsInline:!0,ref:v=>{if(v){v.muted=!0;v.play&&v.play().catch(()=>{})}}}):h("img",{src:x.url,alt:""});
 return h("iframe",{src:x.url,title:x.ad||"ekran",allow:"autoplay; fullscreen",onLoad:()=>hazir&&hazir()})}

export function EkranCihaz(){
 const q=new URLSearchParams(location.search),kanal=(q.get("kanal")||"").replace(/[^a-zA-Z0-9_-]/g,"").slice(0,30);
 const[id]=R.useState(()=>{if(kanal)return"k_"+kanal;let v=lsAl("gxEkranId");if(!/^[a-z0-9]{10,}$/.test(v)){v=rastgele(12);lsYaz("gxEkranId",v)}return v});
 const onbK="gxEkranSon_"+id,[rec,setRec]=R.useState(()=>{try{return JSON.parse(localStorage.getItem(onbK)||"null")}catch{return null}}),[bag,setBag]=R.useState(!0);
 const yuklenme=R.useRef(Date.now()),sonKomut=R.useRef(null),[tanit,setTanit]=R.useState(!1),[imlec,setImlec]=R.useState(!0),zm=R.useRef(null);
 // kayıt: yoksa eşleştirme kodu ile oluştur; silinirse yeniden
 R.useEffect(()=>{let ilk=!0;return onValue(ref(db,yolE(id)),s=>{const v=s.val(),k=v&&v.komut;
  // komutlar: açılıştaki son komut başlangıç sayılır (yeniden çalışmaz); sonra gelen her yeni komut uygulanır
  if(ilk){ilk=!1;sonKomut.current=k&&k.ts||0}else if(k&&k.ts&&k.ts!==sonKomut.current){sonKomut.current=k.ts;if(k.tip==="yenile")setTimeout(()=>location.reload(),300);else if(k.tip==="tanit"){setTanit(!0);setTimeout(()=>setTanit(!1),8e3)}}
  if(!v||(!v.onay&&!v.kod)){update(ref(db,yolE(id)),{kod:String(1000+Math.floor(Math.random()*9000)),onay:!1,ilk:Date.now()}).catch(()=>{});setRec(v||null);try{localStorage.removeItem(onbK)}catch{}return}
  setRec(v);try{localStorage.setItem(onbK,JSON.stringify({...v,nabiz:null,komut:null}))}catch{}
  })},[id]);
 R.useEffect(()=>onValue(ref(db,".info/connected"),s=>setBag(s.val()!==!1)),[]);
 // nabız
 const recR=R.useRef(rec);recR.current=rec;
 R.useEffect(()=>{const at=()=>{const r=recR.current;update(ref(db,yolE(id)+"/nabiz"),{ts:Date.now(),w:window.screen?.width||innerWidth,h:window.screen?.height||innerHeight,vw:innerWidth,vh:innerHeight,ua:(navigator.userAgent.match(/(Edg|Chrome|Firefox|Safari)\/[\d.]+/)||[""])[0],gos:r&&r.hedef?r.hedef.ad||r.hedef.tip:null}).catch(()=>{})};at();const t=setInterval(at,15e3);return()=>clearInterval(t)},[id,rec&&hedefAnahtar(rec.hedef)]);
 // uyku engeli
 R.useEffect(()=>{let wl=null;const al=async()=>{try{wl=await navigator.wakeLock?.request("screen")}catch{}};al();const vc=()=>{document.visibilityState==="visible"&&al()};document.addEventListener("visibilitychange",vc);return()=>{document.removeEventListener("visibilitychange",vc);try{wl&&wl.release()}catch{}}},[]);
 R.useEffect(()=>{const f=()=>{setImlec(!0);clearTimeout(zm.current);zm.current=setTimeout(()=>setImlec(!1),2500)};f();window.addEventListener("mousemove",f);window.addEventListener("pointerdown",f);return()=>{window.removeEventListener("mousemove",f);window.removeEventListener("pointerdown",f);clearTimeout(zm.current)}},[]);
 R.useEffect(()=>{document.title=(rec&&rec.ad?rec.ad+" · ":"")+"Gymexa Ekran"},[rec&&rec.ad]);
 // katmanlar: yeni içerik görünmezken yüklenir, hazır olunca (en çok 4 sn) önceki söner
 const hedef=rec&&rec.onay?rec.hedef||{tip:"logo"}:null,hk=hedefAnahtar(hedef),[kat,setKat]=R.useState([]);
 R.useEffect(()=>{if(!hedef)return;setKat(L=>{if(L.length&&L[L.length-1].k===hk)return L;return[...L.filter(z=>z.on).slice(-1),{k:hk,x:hedef,on:!1}]})},[hk]);
 const hazir=k=>setKat(L=>L.map(z=>z.k===k?{...z,on:!0}:z));
 R.useEffect(()=>{const son=kat[kat.length-1];if(!son||son.on)return;const t=setTimeout(()=>hazir(son.k),4e3);return()=>clearTimeout(t)},[kat]);
 R.useEffect(()=>{const son=kat[kat.length-1];if(!son||!son.on||kat.length<2)return;const t=setTimeout(()=>setKat(L=>L.slice(-1)),800);return()=>clearTimeout(t)},[kat]);
 const tam=()=>{try{document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen()}catch{}};
 return h("div",{className:"gek"+(imlec?" imlec":""),"data-gx-hide":"1",onDoubleClick:tam},h("style",null,CSS_E),
  !rec||!rec.onay?h("div",{className:"gek-esle"},h("img",{src:"/brand/gymnaxis-logo.svg",alt:"Gymexa"}),h("div",{className:"k1"},"Gymexa Ekran · "+__T("Eşleştirme kodu")),h("div",{className:"kod"},rec&&rec.kod||"····"),
   h("div",{className:"ac"},__T("Ana bilgisayarda Ekran Yönetimi › Ekran ekle bölümüne bu kodu yazın ve ekrana bir ad verin. Onaylanınca yayınlanan içerik burada açılır.")),h("div",{className:"id"},"ID: "+id)):
  kat.map(z=>h("div",{key:z.k,className:"gek-kat"+(z.on?" on":"")},e.jsx(Icerik,{x:z.x,hazir:()=>hazir(z.k)}))),
  h("div",{className:"gek-karart"+(rec&&rec.onay&&rec.karart?" on":"")}),
  tanit&&rec?h("div",{className:"gek-tanit"},h("div",null,h("b",null,rec.ad||__T("Adsız ekran")),h("small",null,"GYMEXA · "+id))):null,
  bag?null:h("div",{className:"gek-bag"},MI("wifi_off",{fontSize:16}),__T("Bağlantı yok — son içerik gösteriliyor")),
  h("div",{className:"gek-tam"},h("button",{type:"button",onClick:tam},MI("fullscreen",{fontSize:18}),__T("Tam ekran"))))}

// ======================================================= YÖNETİM =======================================================
const CSS_Y=`.gey{min-height:100vh;background:#F4F5FA;padding:18px clamp(12px,3vw,32px) 40px;color:#0F172A;font-family:inherit;box-sizing:border-box}
.gey *{box-sizing:border-box}
.gey-btn{display:inline-flex;align-items:center;justify-content:center;gap:6px;border-radius:12px;padding:10px 14px;font-weight:800;font-size:14px;cursor:pointer;border:1px solid #E2E8F0;background:#fff;color:#0F172A;font-family:inherit;text-decoration:none;line-height:1.1}
.gey-btn:disabled{opacity:.45;cursor:not-allowed}
.gey-btn.ana{background:linear-gradient(135deg,#2563EB,#7C3AED);border:0;color:#fff;box-shadow:0 10px 24px -12px #4F46E5}
.gey-btn.kucuk{padding:7px 10px;font-size:12.5px;border-radius:10px}
.gey-btn.koyu{background:#0F172A;border-color:#0F172A;color:#fff}
.gey-btn.kirmizi{color:#B91C1C}
.gey-btn.on{border:2px solid #7C3AED;background:#F5F3FF;color:#5B21B6}
.gey-sel,.gey-in{padding:10px 12px;border-radius:12px;border:1px solid #E2E8F0;font-weight:700;font-family:inherit;font-size:14px;background:#fff;max-width:100%}
.gey-kart{background:#fff;border:1px solid #E5E7EB;border-radius:18px;padding:16px;margin-bottom:14px}
.gey-k{font-size:12px;font-weight:900;letter-spacing:.08em;color:#64748B;text-transform:uppercase;margin-bottom:10px;display:flex;align-items:center;gap:6px}
.gey-tip{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:8px}
.gey-tip button{border:1px solid #E2E8F0;background:#fff;border-radius:14px;padding:12px 10px;text-align:left;cursor:pointer;font-family:inherit;display:flex;flex-direction:column;gap:4px}
.gey-tip button b{font-size:13.5px;display:flex;align-items:center;gap:6px}
.gey-tip button span{font-size:11px;color:#64748B;font-weight:600;line-height:1.35}
.gey-tip button.on{border:2px solid #7C3AED;background:linear-gradient(135deg,#F5F3FF,#EFF6FF)}
.gey-izgara{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:12px}
.gey-ek{border:1px solid #E5E7EB;border-radius:16px;padding:12px;background:#fff;display:flex;flex-direction:column;gap:8px;transition:box-shadow .2s}
.gey-ek.sec{border:2px solid #7C3AED;box-shadow:0 8px 24px -16px #7C3AED}
.gey-ek .ust{display:flex;align-items:center;gap:8px}
.gey-ek .nokta{width:10px;height:10px;border-radius:50%;flex:none}
.gey-ek .ad{flex:1;min-width:0;font-weight:900;font-size:15px;border:1px solid transparent;border-radius:8px;padding:4px 6px;font-family:inherit;background:transparent}
.gey-ek .ad:hover,.gey-ek .ad:focus{border-color:#E2E8F0;background:#F8FAFC;outline:none}
.gey-ek .bil{font-size:12px;color:#64748B;font-weight:700;display:flex;gap:10px;flex-wrap:wrap}
.gey-ek .gos{font-size:13px;font-weight:800;color:#0F172A;background:#F8FAFC;border:1px solid #EEF0F4;border-radius:10px;padding:7px 9px;display:flex;align-items:center;gap:6px;min-height:34px}
.gey-ek .bt{display:flex;gap:6px;flex-wrap:wrap}
.gey-oniz{position:relative;width:100%;aspect-ratio:16/9;border-radius:12px;overflow:hidden;background:#000}
.gey-oniz iframe{position:absolute;left:0;top:0;width:1600px;height:900px;border:0;transform-origin:0 0;pointer-events:none}
.gey-oniz img,.gey-oniz video{position:absolute;inset:0;width:100%;height:100%;object-fit:contain}
.gey-bilgi{font-size:12.5px;font-weight:700;color:#475569;background:#F8FAFC;border:1px solid #E2E8F0;border-radius:10px;padding:9px 11px;line-height:1.5}
.gey-kod{font-family:ui-monospace,Menlo,monospace;font-size:12px;font-weight:700;word-break:break-all;color:#334155;background:#F1F5F9;border-radius:8px;padding:6px 8px;display:block;margin-top:6px}
.gey-ust{display:grid;grid-template-columns:minmax(0,1.5fr) minmax(300px,1fr);gap:14px;align-items:start}
@media(max-width:980px){.gey-ust{grid-template-columns:1fr}}
`;
const BRANS_AD={ritmik_yarismalar:"ritmik",aerobik_yarismalar:"aerobik",competitions:"artistik"};

export default function EkranYonetimi(){
 const{firebasePath:fp,routePrefix:rp}=usDisc()||{},{currentUser:cu}=usAuth()||{},kim=cu?.adSoyad||cu?.kullaniciAdi||"admin",br=BRANS_AD[fp]||"ritmik",RP=rp||"/rhythmic";
 const[cih,setCih]=R.useState({}),[simdi,setSimdi]=R.useState(Date.now()),[comps,setComps]=R.useState({}),[msj,setMsj]=R.useState("");
 R.useEffect(()=>onValue(ref(db,KOK),s=>setCih(s.val()||{})),[]);
 R.useEffect(()=>{const t=setInterval(()=>setSimdi(Date.now()),5e3);return()=>clearInterval(t)},[]);
 R.useEffect(()=>{if(!fp)return;return onValue(ref(db,fp),s=>{const v=s.val()||{},o={};Object.entries(v).forEach(([k,c])=>{c&&c.isim&&c.arsivli!==!0&&c.arsivli!=="true"&&(o[k]={isim:c.isim,t:c.baslangicTarihi||"",intl:!!(c.uluslararasi||c.tur==="uluslararasi")})});setComps(o)},{onlyOnce:!0})},[fp]);
 const compL=Object.entries(comps).sort((a,b)=>(b[1].intl-a[1].intl)||String(b[1].t).localeCompare(String(a[1].t)));
 const bildir=t=>{setMsj(t);setTimeout(()=>setMsj(""),2600)};
 // ---- içerik seçimi ----
 const[tip,setTip]=R.useState(()=>lsAl("gxEkTip")||"skor"),[comp,setComp]=R.useState(()=>lsAl("gxEkComp")),[skMod,setSkMod]=R.useState("klasik"),[url,setUrl]=R.useState(""),[profiller,setProfiller]=R.useState({}),[pid,setPid]=R.useState("");
 R.useEffect(()=>{lsYaz("gxEkTip",tip)},[tip]);R.useEffect(()=>{lsYaz("gxEkComp",comp)},[comp]);
 R.useEffect(()=>{if(compL.length&&!comps[comp])setComp(compL[0][0])},[comps]);
 R.useEffect(()=>{setProfiller({});setPid("");if(!fp||!comp)return;return onValue(ref(db,`${fp}/${comp}/yayinProfilleri`),s=>{const v=s.val()||{};setProfiller(v);const k=Object.keys(v);k.length&&setPid(p=>v[p]?p:k[0])})},[fp,comp]);
 const TIPLER=[["skor","leaderboard",__T("Canlı skor"),__T("Sıralama, puan kartı, çağrılan sporcu")],["bayrak","flag",__T("Bayrak ekranı"),__T("Marş / ödül töreni bayrakları")],...(br==="ritmik"?[["tanitim","waving_hand",__T("Sporcu tanıtımı"),__T("Finalist tanıtım ekranı")]]:[]),
  ["overlay","live_tv",__T("Yayın grafiği"),__T("Yayın overlay profili (arka planlı)")],["logo","image",__T("Logo / bekleme"),__T("TCF + etkinlik logosu, saat")],["medya","movie",__T("Görsel / video"),__T("Bağlantıdan resim ya da video")],["adres","link",__T("Sayfa / adres"),__T("Sistemdeki herhangi bir sayfa ya da web adresi")]];
 const cAd=comps[comp]?.isim||"",MODLAR=[["klasik",__T("Klasik")],["yayin",__T("Yayın")],["pano",__T("Çoklu pano")],["sade",__T("Büyük liste")]];
 const hedefYap=()=>{const c=encodeURIComponent(comp||"");
  if(tip==="logo")return comp?{tip:"logo",base:fp,comp,ad:__T("Logo")+" · "+cAd}:{tip:"logo",ad:__T("Logo")};
  if(!comp&&["skor","bayrak","tanitim","overlay"].includes(tip))return null;
  if(tip==="skor")return{tip:"sayfa",url:`${RP}/scoreboard?compId=${c}&autoLive=1&mod=${skMod}`,ad:__T("Canlı skor")+" ("+(MODLAR.find(m=>m[0]===skMod)||[0,""])[1]+") · "+cAd,comp};
  if(tip==="bayrak")return{tip:"sayfa",url:`${RP}/flag-screen?compId=${c}`,ad:__T("Bayrak ekranı")+" · "+cAd,comp};
  if(tip==="tanitim")return{tip:"sayfa",url:`/rhythmic/athlete-intro-screen?compId=${c}`,ad:__T("Sporcu tanıtımı")+" · "+cAd,comp};
  if(tip==="overlay"){if(!pid)return null;return{tip:"sayfa",url:`/yayin-overlay.html?comp=${c}&brans=${br}&profil=${encodeURIComponent(pid)}`,ad:__T("Yayın grafiği")+" · "+((profiller[pid]||{}).ad||pid)+" · "+cAd,comp}}
  const u=String(url||"").trim();if(!u)return null;
  if(tip==="medya")return/^(https?:|data:)/.test(u)?{tip:"medya",url:u,ad:__T("Görsel / video")}:null;
  if(tip==="adres"){let v=u;try{const U=new URL(u,location.origin);v=U.origin===location.origin?U.pathname+U.search+U.hash:U.href}catch{}if(!/^(\/|https?:)/.test(v))v="/"+v;return medyaMi(v)?{tip:"medya",url:v,ad:__T("Görsel / video")}:{tip:"sayfa",url:v,ad:__T("Sayfa")+" · "+v.slice(0,60)}}
  return null};
 const H0=hedefYap();
 // ---- önizleme ölçeği ----
 const ozR=R.useRef(null),[oz,setOz]=R.useState(.3);R.useEffect(()=>{const el=ozR.current;if(!el)return;const ro=new ResizeObserver(()=>setOz(el.clientWidth/1600));ro.observe(el);return()=>ro.disconnect()},[]);
 // ---- ekranlar ----
 const L=Object.entries(cih).filter(([,v])=>v&&v.onay).map(([k,v])=>({id:k,...v,canli:!!(v.nabiz&&simdi-(+v.nabiz.ts||0)<CANLI_MS)})).sort((a,b)=>(b.canli-a.canli)||String(a.ad||"").localeCompare(String(b.ad||""),"tr"));
 const bekleyen=Object.entries(cih).filter(([,v])=>v&&!v.onay&&v.nabiz&&simdi-(+v.nabiz.ts||0)<10*6e4).map(([k,v])=>({id:k,...v}));
 const[secili,setSecili]=R.useState({}),secL=L.filter(x=>secili[x.id]);
 const yaz=(id,o)=>update(ref(db,yolE(id)),o);
 const yayinla=async ids=>{const x=hedefYap();if(!x){bildir(__T("Önce içeriği seçin (yarışma / bağlantı)."));return}const hd={...x,ts:Date.now(),kim};
  try{await Promise.all(ids.map(id=>yaz(id,{hedef:hd,karart:null})));bildir("✓ "+__T("Yayınlandı")+": "+ids.length+" "+__T("ekran"));try{logAction("screen_publish",`Ekran yayını: ${hd.ad} → ${ids.map(i=>cih[i]?.ad||i).join(", ")}`,{user:kim,competitionId:hd.comp||null})}catch{}}catch(er){bildir("⚠ "+(er&&er.message||er))}};
 const komut=(id,tp)=>yaz(id,{komut:{tip:tp,ts:Date.now(),kim}});
 const karart=x=>yaz(x.id,{karart:x.karart?null:!0});
 const logoya=x=>yaz(x.id,{hedef:{tip:"logo",base:x.hedef?.base||null,comp:x.hedef?.comp||null,ad:__T("Logo"),ts:Date.now(),kim},karart:null});
 const sil=async x=>{if(!await window.__gxConfirm(`"${x.ad||x.id}" ${__T("ekranı listeden silinsin mi? O PC yeniden eşleştirme koduna döner.")}`))return;await set(ref(db,yolE(x.id)),null);setSecili(o=>{const n={...o};delete n[x.id];return n})};
 const adDegis=(x,v)=>{v=String(v||"").trim().slice(0,60);v&&v!==x.ad&&yaz(x.id,{ad:v})};
 // ---- ekran ekle ----
 const[kod,setKod]=R.useState(""),[yeniAd,setYeniAd]=R.useState("");
 const ekle=async()=>{const k=String(kod).trim();if(!/^\d{4}$/.test(k)){bildir(__T("4 haneli kodu yazın."));return}const ad=yeniAd.trim()||__T("Ekran")+" "+(L.length+1);
  const aday=Object.entries(cih).filter(([,v])=>v&&!v.onay&&String(v.kod)===k).sort((a,b)=>(+(b[1].nabiz?.ts||b[1].ilk||0))-(+(a[1].nabiz?.ts||a[1].ilk||0)))[0];
  if(!aday){bildir(__T("Bu kodla bekleyen ekran bulunamadı. Kodu ekrandan kontrol edin."));return}
  await yaz(aday[0],{onay:!0,ad,eklenme:Date.now(),ekleyen:kim,hedef:{tip:"logo",ad:__T("Logo"),ts:Date.now(),kim}});setKod("");setYeniAd("");bildir("✓ "+ad+" "+__T("eklendi"));try{logAction("screen_pair",`Ekran eklendi: ${ad}`,{user:kim})}catch{}};
 const ekranUrl=location.origin+"/screen",kiosk=`"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe" --kiosk --autoplay-policy=no-user-gesture-required ${ekranUrl}`;
 const kopya=async t=>{try{await navigator.clipboard.writeText(t);bildir("✓ "+__T("Kopyalandı"))}catch{await window.__gxPrompt(__T("Kopyalayın:"),t)}};
 const sure=ms=>{const s=Math.round(ms/1e3);return s<60?s+" "+__T("sn"):s<3600?Math.round(s/60)+" "+__T("dk"):Math.round(s/3600)+" "+__T("sa")};
 const oniz=H0?H0.tip==="sayfa"?h("iframe",{src:/yayin-overlay/.test(H0.url)?H0.url:H0.url+(H0.url.includes("?")?"&":"?")+"onizle=1",title:"onizleme",style:{transform:`scale(${oz})`}}):H0.tip==="medya"?(videoMu(H0.url)?h("video",{src:H0.url,autoPlay:!0,muted:!0,loop:!0,playsInline:!0}):h("img",{src:H0.url,alt:""})):h("div",{style:{position:"absolute",inset:0,display:"grid",placeItems:"center",color:"#C4B5FD",fontWeight:900,letterSpacing:".1em"}},"LOGO · "+(cAd||"Gymexa")):h("div",{style:{position:"absolute",inset:0,display:"grid",placeItems:"center",color:"#64748B",fontWeight:800}},__T("İçerik seçin"));
 const kart=x=>{const on=!!secili[x.id],gec=x.nabiz?simdi-(+x.nabiz.ts||0):null;
  return h("div",{key:x.id,className:"gey-ek"+(on?" sec":"")},
   h("div",{className:"ust"},h("input",{type:"checkbox",checked:on,onChange:ev=>setSecili(o=>({...o,[x.id]:ev.target.checked})),style:{width:18,height:18,accentColor:"#7C3AED"}}),h("span",{className:"nokta",style:{background:x.canli?"#16A34A":"#DC2626",boxShadow:x.canli?"0 0 0 4px #DCFCE7":"0 0 0 4px #FEE2E2"}}),
    h("input",{key:x.id+"|"+(x.ad||""),className:"ad",defaultValue:x.ad||"",onBlur:ev=>adDegis(x,ev.target.value),onKeyDown:ev=>{ev.key==="Enter"&&ev.target.blur()},title:__T("Adı değiştirmek için tıklayın")})),
   h("div",{className:"bil"},h("span",null,x.canli?"● "+__T("Çevrimiçi"):"○ "+__T("Çevrimdışı")+(gec!=null?" · "+sure(gec)+" "+__T("önce"):"")),x.nabiz&&x.nabiz.w?h("span",null,x.nabiz.w+"×"+x.nabiz.h):null,x.karart?h("span",{style:{color:"#B91C1C"}},"■ "+__T("Karartıldı")):null),
   h("div",{className:"gos"},MI(x.hedef?.tip==="logo"?"image":x.hedef?.tip==="medya"?"movie":"cast",{fontSize:17,color:"#7C3AED"}),h("span",{style:{minWidth:0,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}},x.hedef?x.hedef.ad||x.hedef.url||x.hedef.tip:__T("Logo"))),
   h("div",{className:"bt"},h("button",{type:"button",className:"gey-btn kucuk ana",disabled:!H0,onClick:()=>yayinla([x.id]),title:H0?H0.ad:""},MI("cast",{fontSize:16}),__T("Yayınla")),
    h("button",{type:"button",className:"gey-btn kucuk",onClick:()=>komut(x.id,"tanit"),title:__T("Ekranda adını 8 sn büyük gösterir")},MI("badge",{fontSize:16}),__T("Tanıt")),
    h("button",{type:"button",className:"gey-btn kucuk",onClick:()=>komut(x.id,"yenile")},MI("refresh",{fontSize:16}),__T("Yenile")),
    h("button",{type:"button",className:"gey-btn kucuk"+(x.karart?" on":""),onClick:()=>karart(x)},MI(x.karart?"play_arrow":"dark_mode",{fontSize:16}),x.karart?__T("Devam"):__T("Karart")),
    h("button",{type:"button",className:"gey-btn kucuk",onClick:()=>logoya(x)},MI("image",{fontSize:16}),__T("Logo")),
    h("button",{type:"button",className:"gey-btn kucuk kirmizi",onClick:()=>sil(x),title:__T("Listeden sil")},MI("delete",{fontSize:16}))))};
 return h("div",{className:"gey"},h("style",null,CSS_Y),
  h("div",{style:{display:"flex",alignItems:"center",gap:12,marginBottom:16,flexWrap:"wrap"}},h("button",{type:"button",className:"gey-btn",style:{padding:8},onClick:()=>history.back(),title:__T("Geri")},MI("arrow_back")),
   h("div",{style:{width:42,height:42,borderRadius:12,display:"grid",placeItems:"center",background:"linear-gradient(135deg,#2563EB,#7C3AED)",color:"#fff"}},MI("connected_tv")),
   h("div",{style:{flex:1,minWidth:200}},h("div",{style:{fontWeight:900,fontSize:"1.15rem"}},__T("Ekran Yönetimi")),h("div",{style:{fontSize:".8rem",color:"#64748B",fontWeight:700}},__T("Salondaki ekranlara uzaktan içerik yayınla — tüm branşlar ortak"))),
   msj?h("div",{style:{fontWeight:800,fontSize:13,padding:"8px 12px",borderRadius:10,background:/^⚠/.test(msj)?"#FEF2F2":"#F0FDF4",color:/^⚠/.test(msj)?"#B91C1C":"#166534"}},msj):null),
  h("div",{className:"gey-ust"},
   h("div",{className:"gey-kart"},h("div",{className:"gey-k"},MI("cast",{fontSize:17}),__T("Yayınlanacak içerik")),
    h("div",{className:"gey-tip"},TIPLER.map(([k,ic,t,d])=>h("button",{key:k,type:"button",className:tip===k?"on":"",onClick:()=>setTip(k)},h("b",null,MI(ic,{fontSize:18,color:tip===k?"#7C3AED":"#64748B"}),t),h("span",null,d)))),
    h("div",{style:{display:"flex",gap:8,flexWrap:"wrap",marginTop:12}},
     ["skor","bayrak","tanitim","overlay","logo"].includes(tip)?h("select",{className:"gey-sel",value:comp,onChange:ev=>setComp(ev.target.value),style:{flex:"2 1 260px"}},tip==="logo"?h("option",{value:""},__T("Yarışma yok (yalnız Gymexa / TCF)")):null,compL.map(([k,c])=>h("option",{key:k,value:k},c.isim))):null,
     tip==="skor"?h("select",{className:"gey-sel",value:skMod,onChange:ev=>setSkMod(ev.target.value),style:{flex:"1 1 160px"}},MODLAR.map(([k,t])=>h("option",{key:k,value:k},__T("Görünüm")+": "+t))):null,
     tip==="overlay"?h("select",{className:"gey-sel",value:pid,onChange:ev=>setPid(ev.target.value),style:{flex:"1 1 200px"}},Object.keys(profiller).length?Object.entries(profiller).map(([k,p])=>h("option",{key:k,value:k},(p&&p.ad)||k)):h("option",{value:""},__T("Bu yarışmada yayın profili yok"))):null,
     tip==="medya"||tip==="adres"?h("input",{className:"gey-in",value:url,onChange:ev=>setUrl(ev.target.value),placeholder:tip==="medya"?"https://…/afis.jpg  ·  https://…/tanitim.mp4":"/rhythmic/scoreboard?compId=…  ·  https://…",style:{flex:"1 1 100%"}}):null),
    tip==="adres"?h("div",{className:"gey-bilgi",style:{marginTop:8}},__T("Sistemdeki bir sayfanın adresini (tarayıcının adres çubuğundan) yapıştırabilirsiniz. Giriş isteyen sayfalar için o PC'de bir kez giriş yapılmış olmalı. Bazı dış siteler başka sayfa içinde açılmayı engeller.")):null,
    tip==="overlay"?h("div",{className:"gey-bilgi",style:{marginTop:8}},__T("Overlay şeffaftır; ekranda siyah zemin üzerinde görünür. Yeşil/mavi zemin için profilin arka plan ayarını kullanın.")):null,
    h("div",{style:{display:"flex",gap:8,flexWrap:"wrap",marginTop:12,alignItems:"center"}},
     h("button",{type:"button",className:"gey-btn ana",disabled:!H0||!secL.length,onClick:()=>yayinla(secL.map(x=>x.id))},MI("cast",{fontSize:18}),__T("Seçili ekranlara yayınla")+(secL.length?" ("+secL.length+")":"")),
     h("button",{type:"button",className:"gey-btn",disabled:!L.length,onClick:()=>setSecili(secL.length===L.length?{}:Object.fromEntries(L.map(x=>[x.id,!0])))},MI(secL.length===L.length&&L.length?"deselect":"select_all",{fontSize:18}),secL.length===L.length&&L.length?__T("Seçimi kaldır"):__T("Tümünü seç")),
     H0?h("span",{style:{fontSize:12.5,fontWeight:700,color:"#475569"}},"→ "+H0.ad):null)),
   h("div",{className:"gey-kart"},h("div",{className:"gey-k"},MI("visibility",{fontSize:17}),__T("Önizleme")),h("div",{className:"gey-oniz",ref:ozR},oniz),
    H0&&H0.tip==="sayfa"?h("a",{href:H0.url,target:"_blank",rel:"noopener noreferrer",className:"gey-btn kucuk",style:{marginTop:8}},MI("open_in_new",{fontSize:16}),__T("Yeni sekmede aç")):null)),
  h("div",{className:"gey-kart"},h("div",{className:"gey-k"},MI("connected_tv",{fontSize:17}),__T("Ekranlar")+" · "+L.length+" ("+L.filter(x=>x.canli).length+" "+__T("çevrimiçi")+")"),
   L.length?h("div",{className:"gey-izgara"},L.map(kart)):h("div",{style:{color:"#64748B",fontWeight:700}},__T("Henüz ekran yok. Aşağıdan ekleyin."))),
  h("div",{className:"gey-ust"},
   h("div",{className:"gey-kart"},h("div",{className:"gey-k"},MI("add_to_queue",{fontSize:17}),__T("Ekran ekle")),
    h("div",{style:{display:"flex",gap:8,flexWrap:"wrap"}},h("input",{className:"gey-in",value:kod,onChange:ev=>setKod(ev.target.value.replace(/\D/g,"").slice(0,4)),placeholder:__T("Kod (ekranda yazan 4 hane)"),inputMode:"numeric",style:{flex:"1 1 160px",fontSize:18,letterSpacing:".2em"}}),
     h("input",{className:"gey-in",value:yeniAd,onChange:ev=>setYeniAd(ev.target.value),placeholder:__T("Ad (ör. Salon Sol LED)"),style:{flex:"2 1 220px"},onKeyDown:ev=>{ev.key==="Enter"&&ekle()}}),
     h("button",{type:"button",className:"gey-btn ana",onClick:ekle},MI("add",{fontSize:18}),__T("Ekle"))),
    bekleyen.length?h("div",{className:"gey-bilgi",style:{marginTop:10}},__T("Eşleştirme bekleyen ekranlar")+": ",bekleyen.map(x=>h("b",{key:x.id,style:{marginRight:10,letterSpacing:".12em"}},x.kod+(x.nabiz&&x.nabiz.w?" ("+x.nabiz.w+"×"+x.nabiz.h+")":"")))):null),
   h("div",{className:"gey-kart"},h("div",{className:"gey-k"},MI("settings",{fontSize:17}),__T("Kurulum (her PC'de bir kez)")),
    h("div",{className:"gey-bilgi"},h("b",null,"1. "),__T("PC'de şu adresi açın:"),h("span",{className:"gey-kod"},ekranUrl),h("button",{type:"button",className:"gey-btn kucuk",style:{marginTop:6},onClick:()=>kopya(ekranUrl)},MI("content_copy",{fontSize:15}),__T("Kopyala")),
     h("div",{style:{marginTop:10}},h("b",null,"2. "),__T("Ekranda çıkan 4 haneli kodu soldaki \"Ekran ekle\"ye yazın.")),
     h("div",{style:{marginTop:10}},h("b",null,"3. "),__T("Kenarsız tam ekran ve açılışta otomatik başlama için Chrome'u kiosk modunda açın (Windows kısayol hedefi):"),h("span",{className:"gey-kod"},kiosk),h("button",{type:"button",className:"gey-btn kucuk",style:{marginTop:6},onClick:()=>kopya(kiosk)},MI("content_copy",{fontSize:15}),__T("Kopyala"))),
     h("div",{style:{marginTop:10}},__T("Aynı PC'de iki ekran (iki pencere) için adresin sonuna farklı kanal ekleyin: "),h("span",{className:"gey-kod"},ekranUrl+"?kanal=salon2"))))));
}
