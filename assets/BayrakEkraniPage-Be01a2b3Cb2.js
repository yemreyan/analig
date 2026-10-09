import{j as e,d as db,a as usDisc,u as usAuth,l as logAction}from"./main-C2LpyYUGCb2.js";import{r as R}from"./vendor-react-Cxw6bqwhCb2.js";import{k as ref,o as onValue,m as update}from"./vendor-firebase-940mxgRVCb2.js";import{ULKELER,bayrakUrl,katEN}from"./intl-Ul01a2b3Cb2.js";import{raAd,artAd}from"./ritmikAlet-Ra01a2b3Cb2.js";import"./yayinVeri-Yv01a2b3Cb2.js";

// BAYRAK EKRANI (2026-10-08) — uluslararası yarışmada ulusal marş çalınırken projeksiyona tam ekran ülke bayrağı.
//  <yarışma>/bayrakEkrani = {mod: "tek"|"tore"|null, ulke: IOC kodu | null, tore: {baslik, u:[1., 2., 3.]}, ts, kim}
//  Tören (2026-10-08): madalya podyumu — ortada en yüksekte 1., solda 2., sağda 3.; bayraklar dalgalanır, podyum blokları altın/gümüş/bronz.
//  Ekran  (/rhythmic/flag-screen?compId=…, giriş istemez): ulke yoksa TCF + yarışma logosu; ulke seçilince o ülkenin bayrağı dalgalanır.
//  Sonuçtan tören (2026-10-09): kategori + tür (genel tasnif / alet / takım) ya da final seçilir → ilk üç ülke ortak yayın hesabından
//   (yayinVeri siralama / takimlar — canlı skor ve overlay ile aynı; yayinBekliyor puanlar sayılmaz). Eşitlikte tore.m = madalya sıraları (ör. [1,1,3]).
//  Artistik (2026-10-09): /artistic/flag-control + /artistic/flag-screen; sonuç yayinVeri.siralama({brans:"artistik"}) (puanlar/<kat>/<alet>/<sporcu>); takım seçeneği yok.
//  Kontrol (/rhythmic/flag-control): yarışmadaki ülkeler (sporcu ülkeleri) + arama; dokununca ekran anında değişir; "Logolara dön".
const MI=(n,st)=>e.jsx("span",{className:"material-icons-round",style:{fontSize:20,...st},children:n});
const UL=Object.fromEntries(ULKELER.map(u=>[u.kod,u]));
const ulAd=(k,en)=>{const u=UL[k];return u?(en?u.en:u.tr):k};
const SERIT=48;

const CSS=`.gxb{position:fixed;inset:0;overflow:hidden;background:radial-gradient(1200px 700px at 50% 120%,#1E1B4B 0%,#0B0F1E 55%,#05070F 100%);color:#fff;font-family:"Plus Jakarta Sans",Inter,system-ui,sans-serif;cursor:none;user-select:none}
.gxb.imlec{cursor:default}
.gxb-sahne{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4vh;transition:opacity .9s ease,transform .9s ease}
.gxb-sahne.gizli{opacity:0;transform:scale(.97);pointer-events:none}
.gxb-logolar{display:flex;align-items:center;justify-content:center;gap:6vw}
.gxb-logolar .lk{width:min(30vw,46vh);height:min(30vw,46vh);border-radius:50%;background:#fff;display:grid;place-items:center;box-shadow:0 30px 80px -30px rgba(139,92,246,.6),0 0 0 6px rgba(255,255,255,.08)}
.gxb-logolar .lk img{width:78%;height:78%;object-fit:contain}
.gxb-logolar .ay{width:2px;height:30vh;background:linear-gradient(180deg,transparent,rgba(255,255,255,.35),transparent)}
.gxb-ad{font-size:clamp(20px,3.2vw,46px);font-weight:900;letter-spacing:.04em;text-align:center;max-width:86vw;line-height:1.2}
.gxb-alt{font-size:clamp(13px,1.5vw,22px);font-weight:700;letter-spacing:.28em;text-transform:uppercase;color:#A5B4FC;opacity:.85}
.gxb-bayrak{position:relative;width:min(78vw,calc(66vh*4/3));aspect-ratio:4/3;display:flex;filter:drop-shadow(0 40px 60px rgba(0,0,0,.55))}
.gxb-bayrak i{flex:1;height:100%;background-repeat:no-repeat;animation:gxbDalga 2.6s ease-in-out infinite;will-change:transform}
@keyframes gxbDalga{0%,100%{transform:translateY(-1.6%) }50%{transform:translateY(1.6%)}}
.gxb-bayrak i::after{content:"";position:absolute;inset:0}
.gxb-golge{position:absolute;inset:0;pointer-events:none;mix-blend-mode:multiply;background:repeating-linear-gradient(90deg,rgba(0,0,0,0) 0%,rgba(0,0,0,.20) 12.5%,rgba(0,0,0,0) 25%);background-size:200% 100%;animation:gxbGolge 2.6s linear infinite}
.gxb-isik{position:absolute;inset:0;pointer-events:none;mix-blend-mode:screen;background:repeating-linear-gradient(90deg,rgba(255,255,255,0) 0%,rgba(255,255,255,.16) 6%,rgba(255,255,255,0) 12.5%,rgba(255,255,255,0) 25%);background-size:200% 100%;animation:gxbGolge 2.6s linear infinite}
@keyframes gxbGolge{from{background-position:0 0}to{background-position:-100% 0}}
.gxb-ulke{font-size:clamp(28px,5vw,78px);font-weight:900;letter-spacing:.06em;text-transform:uppercase;text-shadow:0 6px 30px rgba(0,0,0,.6)}
.gxb-kose{position:absolute;top:3vh;display:flex;align-items:center;gap:1.4vw}
.gxb-kose.sol{left:3vw}.gxb-kose.sag{right:3vw}
.gxb-kose img{height:min(9vh,90px);width:min(9vh,90px);object-fit:contain;border-radius:50%;background:#fff;padding:6px;box-shadow:0 8px 24px -10px rgba(0,0,0,.6)}
.gxb-tore-bas{position:absolute;top:4vh;left:50%;transform:translateX(-50%);font-size:clamp(18px,2.6vw,40px);font-weight:900;letter-spacing:.08em;text-transform:uppercase;text-align:center;max-width:70vw;color:#E0E7FF;text-shadow:0 4px 20px rgba(0,0,0,.5)}
.gxb-sahne.tore{justify-content:flex-end;gap:0}
.gxb-tore-ust{position:absolute;top:5vh;left:50%;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:1.2vh;width:min(70vw,1100px);text-align:center}
.gxb-tore-ust .k{font-size:clamp(11px,1.25vw,18px);font-weight:800;letter-spacing:.45em;color:#C4B5FD;text-transform:uppercase;padding-left:.45em}
.gxb-tore-ust .b{display:flex;align-items:center;gap:1.6vw;width:100%;font-size:clamp(20px,2.8vw,46px);font-weight:900;letter-spacing:.08em;text-transform:uppercase;background:linear-gradient(180deg,#FFF7E0,#F5D27A 55%,#C8962E);-webkit-background-clip:text;background-clip:text;color:transparent;filter:drop-shadow(0 4px 18px rgba(245,210,122,.25))}
.gxb-tore-ust .b i{flex:1;height:2px;background:linear-gradient(90deg,transparent,#F5D27A)}
.gxb-tore-ust .b i:last-child{background:linear-gradient(90deg,#F5D27A,transparent)}
.gxb-tore-ust .b span{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.gxb-sahne.tore::before{content:"";position:absolute;inset:auto 0 0 0;height:22vh;background:linear-gradient(180deg,transparent,rgba(139,92,246,.10) 55%,rgba(236,72,153,.16));pointer-events:none}
.gxb-tore{position:relative;display:flex;align-items:flex-end;justify-content:center;gap:5vw;height:66vh;margin-bottom:13vh}
.gxb-tore::after{content:"";position:absolute;left:-6vw;right:-6vw;bottom:0;height:2px;background:linear-gradient(90deg,transparent,rgba(255,255,255,.55) 20%,rgba(245,210,122,.85) 50%,rgba(255,255,255,.55) 80%,transparent);box-shadow:0 0 26px 4px rgba(245,210,122,.18)}
.gxb-dir{--fw:min(21vw,calc(34vh*4/3));--fh:calc(var(--fw)*.75);--ph:60vh;--m1:#FDE68A;--m2:#D97706;--m3:#92400E;--gl:rgba(252,211,77,.35);position:relative;width:calc(var(--fw) + .8vw);height:var(--ph)}
.gxb-dir.s1{--fw:min(24vw,calc(40vh*4/3));--ph:64vh}
.gxb-dir.s2{--ph:55vh;--m1:#F8FAFC;--m2:#94A3B8;--m3:#475569;--gl:rgba(226,232,240,.28)}
.gxb-dir.s3{--ph:48vh;--m1:#FED7AA;--m2:#C2410C;--m3:#7C2D12;--gl:rgba(251,146,60,.28)}
.gxb-direk{position:absolute;left:0;bottom:0;width:.8vw;min-width:6px;height:100%;border-radius:4px 4px 0 0;background:linear-gradient(90deg,#6B7280,#F3F4F6 35%,#D1D5DB 55%,#4B5563);box-shadow:0 0 18px rgba(0,0,0,.6)}
.gxb-direk::before{content:"";position:absolute;left:50%;top:0;width:2vw;min-width:14px;aspect-ratio:1;border-radius:50%;transform:translate(-50%,-70%);background:radial-gradient(circle at 35% 30%,#FFF7E0,#F5D27A 40%,#B7791F 85%);box-shadow:0 0 16px rgba(245,210,122,.5)}
.gxb-dir .gxb-bayrak{position:absolute;left:calc(.8vw - 1px);top:2.2vh;width:var(--fw);filter:drop-shadow(0 22px 30px rgba(0,0,0,.55));animation:gxbCek 4.2s cubic-bezier(.25,.7,.25,1) both;transform-origin:left center}
@keyframes gxbCek{from{top:calc(100% - var(--fh) - 1vh);opacity:.0}12%{opacity:1}to{top:2.2vh;opacity:1}}
.gxb-dir .gxb-bayrak i{margin-right:-1px;animation-name:gxbDalga2}
@keyframes gxbDalga2{0%,100%{transform:translateY(calc(var(--a)*-1))}50%{transform:translateY(var(--a))}}
.gxb-dir.bos .gxb-bayrak{visibility:hidden}
.gxb-isik2{position:absolute;left:calc(.8vw + var(--fw)/2);top:-30vh;width:calc(var(--fw)*1.9);height:calc(var(--ph) + 30vh);transform:translateX(-50%);background:radial-gradient(ellipse 50% 70% at 50% 0%,var(--gl),transparent 70%);opacity:.55;pointer-events:none;z-index:-1}
.gxb-madalya{position:absolute;left:calc(.8vw + var(--fw)/2);bottom:-10.5vh;transform:translateX(-50%);width:clamp(46px,7.6vh,96px);aspect-ratio:1;border-radius:50%;display:grid;place-items:center;font-weight:900;font-size:clamp(22px,3.8vh,46px);color:rgba(15,23,42,.85);background:radial-gradient(circle at 32% 28%,#fff 0%,var(--m1) 22%,var(--m2) 62%,var(--m3) 100%);box-shadow:0 0 0 3px rgba(255,255,255,.16),0 8px 26px -6px var(--gl),inset 0 -5px 10px rgba(0,0,0,.25),inset 0 3px 6px rgba(255,255,255,.5);text-shadow:0 1px 0 rgba(255,255,255,.5);animation:gxbBelir 1s 3.6s both}
.gxb-dir.s1 .gxb-madalya{width:clamp(54px,9vh,116px);font-size:clamp(26px,4.6vh,56px)}
.gxb-madalya.m1{--m1:#FDE68A;--m2:#D97706;--m3:#92400E;--gl:rgba(252,211,77,.35)}
.gxb-madalya.m2{--m1:#F8FAFC;--m2:#94A3B8;--m3:#475569;--gl:rgba(226,232,240,.28)}
.gxb-madalya.m3{--m1:#FED7AA;--m2:#C2410C;--m3:#7C2D12;--gl:rgba(251,146,60,.28)}
@keyframes gxbBelir{from{opacity:0;transform:translateX(-50%) scale(.6)}to{opacity:1;transform:translateX(-50%) scale(1)}}
.gxb-kapali{position:absolute;inset:0;background:#000;opacity:0;pointer-events:none;transition:opacity .8s ease;z-index:5}
.gxb-kapali.on{opacity:1}
.gxb-tam{z-index:6;position:absolute;right:20px;bottom:20px;display:flex;gap:8px;opacity:0;transition:opacity .3s}
.gxb.imlec .gxb-tam{opacity:1}
.gxb-tam button{border:1px solid rgba(255,255,255,.25);background:rgba(255,255,255,.08);color:#fff;border-radius:12px;padding:10px 14px;font:800 14px inherit;font-family:inherit;cursor:pointer;display:inline-flex;align-items:center;gap:6px}
`;

function useComp(base,comp){const[C,setC]=R.useState(null);R.useEffect(()=>{setC(null);if(!base||!comp)return;const st={},u=["isim","etkinlikLogo","ciktiDili","uluslararasi","tur","bayrakEkrani","kategoriler"].map(k=>onValue(ref(db,`${base}/${comp}/${k}`),s=>{st[k]=s.val();setC({...st})}));return()=>u.forEach(f=>f())},[base,comp]);return C}

// ---- PROJEKSİYON EKRANI ----
export function BayrakEkran(){
 const{firebasePath:fp}=usDisc()||{},q=new URLSearchParams(location.search),comp=q.get("compId")||q.get("competitionId")||"";
 const C=useComp(fp,comp),be=C&&C.bayrakEkrani,ul=be&&be.ulke||null,en=!!C&&(C.ciktiDili==="en"||((C.uluslararasi||C.tur==="uluslararasi")&&C.ciktiDili!=="tr"));
 const[imlec,setImlec]=R.useState(!0),zm=R.useRef(null);
 R.useEffect(()=>{if(C)document.documentElement.lang=en?"en":"tr"},[C,en]); // büyük harf: "FINAL", "BULGARIA"
 R.useEffect(()=>{const f=()=>{setImlec(!0);clearTimeout(zm.current);zm.current=setTimeout(()=>setImlec(!1),2500)};f();window.addEventListener("mousemove",f);window.addEventListener("pointerdown",f);return()=>{window.removeEventListener("mousemove",f);window.removeEventListener("pointerdown",f);clearTimeout(zm.current)}},[]);
 // bayrak değişince kısa geçiş: önce eski kaybolur, yenisi gelir
 const tr=be&&be.tore,toreVar=be&&be.mod==="tore"&&tr&&Array.isArray(tr.u)&&tr.u.some(Boolean),hedef=toreVar?{t:"tore",u:[0,1,2].map(i=>tr.u[i]||""),b:tr.baslik||"",m:[0,1,2].map(i=>+(tr.m||[])[i]||i+1)}:ul?{t:"tek",u:ul}:null,hk=hedef?JSON.stringify(hedef):"";
 const[gos,setGos]=R.useState(null);R.useEffect(()=>{if((gos?JSON.stringify(gos):"")===hk)return;setGos(null);if(!hedef)return;const t=setTimeout(()=>setGos(hedef),gos?500:60);return()=>clearTimeout(t)},[hk]);
 const tam=()=>{try{document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen()}catch{}};
 const evL=C&&C.etkinlikLogo||null,tek=gos&&gos.t==="tek"?gos.u:null,bf=tek?bayrakUrl(tek):null;
 const Bayrak=(u,k)=>{const b=u?bayrakUrl(u):null;return b?e.jsxs("div",{className:"gxb-bayrak",children:[...[...Array(SERIT)].map((_,i)=>e.jsx("i",{style:{backgroundImage:`url(${b})`,backgroundSize:`${SERIT*100}% 100%`,backgroundPosition:`${i/(SERIT-1)*100}% 0`,animationDelay:`${-(i/SERIT)*2.6-(k||0)*.7}s`,"--a":`${(.15+i/SERIT*3.4).toFixed(2)}%`}},i)),e.jsx("div",{className:"gxb-golge"},"g"),e.jsx("div",{className:"gxb-isik"},"s")]}):e.jsx("div",{className:"gxb-bayrak"})};
 const kose=[e.jsx("div",{className:"gxb-kose sol",children:e.jsx("img",{src:"/logo.png",alt:"TCF"})},"ks"),evL?e.jsx("div",{className:"gxb-kose sag",children:e.jsx("img",{src:evL,alt:""})},"kg"):null];
 if(!comp)return e.jsx("div",{style:{minHeight:"100vh",display:"grid",placeItems:"center",background:"#0B0F1E",color:"#94A3B8",fontFamily:"system-ui",fontWeight:700},children:__T("Yarışma seçilmedi")});
 return e.jsxs("div",{className:"gxb"+(imlec?" imlec":""),"data-gx-hide":"1",onDoubleClick:tam,children:[e.jsx("style",{children:CSS}),
  // logo sahnesi
  e.jsxs("div",{className:"gxb-sahne"+(gos?" gizli":""),children:[e.jsxs("div",{className:"gxb-logolar",children:[e.jsx("div",{className:"lk",children:e.jsx("img",{src:"/logo.png",alt:"TCF"})}),evL?e.jsx("div",{className:"ay"}):null,evL?e.jsx("div",{className:"lk",children:e.jsx("img",{src:evL,alt:""})}):null]}),
   C&&C.isim?e.jsx("div",{className:"gxb-ad",children:C.isim}):null]}),
  // bayrak sahnesi
  e.jsxs("div",{className:"gxb-sahne"+(tek?"":" gizli"),children:[...kose,
   bf?e.jsxs("div",{className:"gxb-bayrak",children:[...[...Array(SERIT)].map((_,i)=>e.jsx("i",{style:{backgroundImage:`url(${bf})`,backgroundSize:`${SERIT*100}% 100%`,backgroundPosition:`${i/(SERIT-1)*100}% 0`,animationDelay:`${-(i/SERIT)*2.6}s`}},i)),e.jsx("div",{className:"gxb-golge"},"g"),e.jsx("div",{className:"gxb-isik"},"s")]}):null,
   tek?e.jsx("div",{className:"gxb-ulke",children:ulAd(tek,en)}):null]}),
  // tören sahnesi: direkler 2 — 1 — 3 (1. en yüksekte), bayraklar direğe çekilir
  e.jsxs("div",{className:"gxb-sahne tore"+(gos&&gos.t==="tore"?"":" gizli"),children:[...kose,
   gos&&gos.t==="tore"?e.jsxs("div",{className:"gxb-tore-ust",children:[e.jsx("div",{className:"k",children:en?"Victory Ceremony":"Ödül Töreni"}),gos.b?e.jsxs("div",{className:"b",children:[e.jsx("i",{}),e.jsx("span",{children:gos.b}),e.jsx("i",{})]}):null]}):null,
   gos&&gos.t==="tore"?e.jsx("div",{className:"gxb-tore",children:[1,0,2].map(i=>{const u=gos.u[i];return e.jsxs("div",{className:"gxb-dir s"+(i+1)+(u?"":" bos"),children:[u?e.jsx("div",{className:"gxb-isik2"}):null,e.jsx("div",{className:"gxb-direk"}),Bayrak(u,i),u?e.jsx("div",{className:"gxb-madalya"+(gos.m&&gos.m[i]!==i+1?" m"+gos.m[i]:""),children:gos.m?gos.m[i]:i+1}):null]},i+"|"+u)})},JSON.stringify(gos.u)):null]}),
  // durdur: ekran karartılır
  e.jsx("div",{className:"gxb-kapali"+(be&&be.mod==="kapali"?" on":"")}),
  e.jsx("div",{className:"gxb-tam",children:e.jsxs("button",{type:"button",onClick:tam,children:[MI("fullscreen",{fontSize:18}),__T("Tam ekran")]})})]});
}

// ---- KONTROL ----
export default function BayrakKontrol(){
 const{firebasePath:fp,routePrefix:rp}=usDisc()||{},{currentUser:cu}=usAuth()||{},kim=cu?.adSoyad||cu?.kullaniciAdi||"admin";
 const[comps,setComps]=R.useState({}),[comp,setComp]=R.useState(()=>{try{return localStorage.getItem("gxBayrakComp")||""}catch{return""}}),[ulkeler,setUlkeler]=R.useState([]),[ara,setAra]=R.useState(""),[ok,setOk]=R.useState("");
 R.useEffect(()=>{if(!fp)return;return onValue(ref(db,fp),s=>{const v=s.val()||{},o={};Object.entries(v).forEach(([k,c])=>{c&&c.isim&&c.arsivli!==!0&&c.arsivli!=="true"&&(o[k]={isim:c.isim,intl:!!(c.uluslararasi||c.tur==="uluslararasi"),t:c.baslangicTarihi||""})});setComps(o)},{onlyOnce:!0})},[fp]);
 R.useEffect(()=>{try{localStorage.setItem("gxBayrakComp",comp)}catch{}setUlkeler([]);if(!fp||!comp)return;return onValue(ref(db,`${fp}/${comp}/sporcular`),s=>{const v=s.val()||{},say={};Object.entries(v).forEach(([k,a])=>{if(/^final_/.test(k))return;Object.values(a||{}).forEach(x=>{const u=String(x&&(x.ulke||x.country||x.noc)||"").trim().toUpperCase();u&&(say[u]=(say[u]||0)+1)})});setUlkeler(Object.keys(say).sort((a,b)=>ulAd(a,!1).localeCompare(ulAd(b,!1),"tr")))})},[fp,comp]);
 const C=useComp(fp,comp),BE=C&&C.bayrakEkrani||{},toreAktif=BE.mod==="tore"&&BE.tore&&(BE.tore.u||[]).some(Boolean),aktif=!toreAktif&&BE.ulke||null;
 const[tB,setTB]=R.useState(""),[tU,setTU]=R.useState(["","",""]),[tM,setTM]=R.useState([1,2,3]),tYuk=R.useRef("");
 R.useEffect(()=>{if(!C||tYuk.current===comp)return;tYuk.current=comp;const t=C.bayrakEkrani&&C.bayrakEkrani.tore;if(t){setTB(t.baslik||"");setTU([0,1,2].map(i=>(t.u||[])[i]||""));setTM([0,1,2].map(i=>+(t.m||[])[i]||i+1))}else{setTB("");setTU(["","",""]);setTM([1,2,3])}},[C,comp]);
 const kapali=BE.mod==="kapali",durdur=async()=>{if(!comp)return;try{await update(ref(db,`${fp}/${comp}/bayrakEkrani`),kapali?{mod:BE.oncekiMod||null,oncekiMod:null,ts:Date.now(),kim}:{mod:"kapali",oncekiMod:BE.mod||null,ts:Date.now(),kim});try{logAction("flag_screen",kapali?"Bayrak ekranı: devam":"Bayrak ekranı: durduruldu (karartıldı)",{user:kim,competitionId:comp})}catch{}}catch{}};
 // tören başlığı için yarışmanın kategorileri (finaller dahil); uluslararasıda İngilizce
 const enC=!!C&&(C.ciktiDili==="en"||((C.uluslararasi||C.tur==="uluslararasi")&&C.ciktiDili!=="tr")),katS=Object.entries(C&&C.kategoriler||{}).map(([k,z])=>{const ad=String(z&&(z.name||z.ad)||k).replace(/^\s*🏆\s*/u,"").trim(),m=/^final_(.+?)(?:__(.+))?$/.exec(k);let t=ad;if(m){const bz=C.kategoriler[m[1]],ba=String(bz&&(bz.name||bz.ad)||m[1]);t=enC?katEN(ba)+" — "+(m[2]?((fp==="competitions"?artAd(m[2],!0,m[1]):raAd(m[2],!0))||m[2])+" Final":"All-Around Final"):ba+" — "+(m[2]?((fp==="competitions"?artAd(m[2],!1,m[1]):raAd(m[2],!1))||m[2])+" Finali":"Genel Tasnif Finali")}else if(enC)t=katEN(ad);return{k,t,f:!!m}}).sort((a,b)=>(a.f-b.f)||a.t.localeCompare(b.t,"tr"));
 // ---- sonuçtan tören ----
 const BRN=fp==="aerobik_yarismalar"?"aerobik":fp==="competitions"?"artistik":"ritmik",intlC=!!C&&!!(C.uluslararasi||C.tur==="uluslararasi"),GV=typeof self!=="undefined"?self.GXYV:null;
 const srcOps=R.useMemo(()=>{const K=C&&C.kategoriler||{},o=[],baz=katS.filter(x=>!x.f),fin=katS.filter(x=>x.f);
  baz.forEach(x=>{const z=K[x.k]||{},al=Array.isArray(z.aletler)?z.aletler:[],grp=[];
   grp.push({v:x.k+"|aa",t:x.t+" — "+(enC?(z.tip==="takim"?"Final Ranking":"All-Around"):(z.tip==="takim"?"Genel Sıralama":"Genel Tasnif"))});
   (BRN==="ritmik"||BRN==="artistik")&&al.length>1&&al.forEach(a=>grp.push({v:x.k+"|al|"+a,t:x.t+" — "+((BRN==="artistik"?artAd(a,enC,x.k):raAd(a,enC))||a)}));
   BRN==="ritmik"&&z.tip!=="takim"&&al.length>1&&grp.push({v:x.k+"|takim",t:x.t+" — "+(enC?"Team":"Takım")});
   o.push({g:x.t,l:grp})});
  fin.length&&o.push({g:enC?"Finals":__T("Finaller"),l:fin.map(x=>({v:x.k+"|fin",t:x.t}))});return o},[C&&C.kategoriler,enC,BRN]);
 const[src,setSrc]=R.useState(""),[rd,setRd]=R.useState(null),srcKat=src?src.split("|")[0]:"",dolan=R.useRef("");
 R.useEffect(()=>{setSrc("");dolan.current=""},[comp]);
 R.useEffect(()=>{setRd(null);if(!fp||!comp||!srcKat)return;const st={kat:srcKat};const u=[["spor",`sporcular/${srcKat}`],["puan",`puanlar/${srcKat}`],["ded","teamDeductions"]].map(([n,p0])=>onValue(ref(db,`${fp}/${comp}/${p0}`),sn=>{st[n]=sn.val()||{};setRd({...st})}));return()=>u.forEach(f=>f())},[fp,comp,srcKat]);
 const sonucL=R.useMemo(()=>{if(!GV||!C||!rd||rd.kat!==srcKat||!rd.spor||!rd.puan)return null;const[k,tip,al]=src.split("|"),kats=C.kategoriler||{},UP=u=>u?String(u).trim().toUpperCase():null;
  try{if(tip==="takim"){const T=GV.takimlar({kats,kat:k,spor:rd.spor,puan:rd.puan,intl:intlC,kesintiler:rd.ded||{}});return{rows:T.map(t=>({sira:t.sira,ad:t.ad,ulke:UP(t.ulke),total:t.total})),tamam:null,n:T.length}}
   const S=GV.siralama({brans:BRN,kats,kat:k,spor:rd.spor,puan:rd.puan,alet:tip==="al"?al:null});
   return{rows:S.satirlar.filter(r=>r.sira).map(r=>({sira:r.sira,ad:r.giris.ad,ulke:UP(r.giris.ulke),total:r.s.total})),tamam:S.tamamlandi,n:S.girisSayisi}}catch(er){console.error(er);return null}},[GV,C,rd,src,srcKat,intlC,BRN]);
 const srcAd=R.useMemo(()=>{for(const g of srcOps)for(const x of g.l)if(x.v===src)return x.t;return""},[srcOps,src]);
 const podyum=sonucL?sonucL.rows.filter(r=>r.sira<=3):[],fazla=podyum.slice(3),ulkesiz=podyum.slice(0,3).filter(r=>!r.ulke);
 const doldur=()=>{if(!sonucL)return;const p3=podyum.slice(0,3);setTU([0,1,2].map(i=>p3[i]&&p3[i].ulke||""));setTM([0,1,2].map(i=>p3[i]?p3[i].sira:i+1));setTB(srcAd)};
 // kaynak seçilip sonuç ilk kez gelince alanlar otomatik dolar (sonra elle değiştirilebilir)
 R.useEffect(()=>{if(src&&sonucL&&dolan.current!==src){dolan.current=src;doldur()}},[src,sonucL]);
 const tMx=tM.some((x,i)=>x!==i+1)?tM:null;
 const toreGonder=async()=>{if(!comp||!tU.some(Boolean))return;try{await update(ref(db,`${fp}/${comp}`),{bayrakEkrani:{mod:"tore",ulke:null,tore:{baslik:tB.trim()||null,u:tU,m:tMx,kaynak:src||null},ts:Date.now(),kim}});try{logAction("flag_screen",`Bayrak ekranı tören: ${tB} — ${tU.map((u,i)=>tM[i]+". "+(u||"—")).join(" · ")}${src?" (sonuçtan)":""}`,{user:kim,competitionId:comp})}catch{}}catch{}};
 const sec=async u=>{if(!comp)return;try{await update(ref(db,`${fp}/${comp}`),{bayrakEkrani:{mod:u?"tek":null,ulke:u||null,tore:BE.tore||null,ts:Date.now(),kim}});try{logAction("flag_screen",`Bayrak ekranı: ${u?ulAd(u,!1)+" ("+u+")":"logolar"}`,{user:kim,competitionId:comp})}catch{}}catch{}};
 const url=comp?`${location.origin}${rp||"/rhythmic"}/flag-screen?compId=${encodeURIComponent(comp)}`:"";
 const kopya=async()=>{try{await navigator.clipboard.writeText(url);setOk("✓")}catch{await window.__gxPrompt(__T("Linki kopyalayın:"),url)}setTimeout(()=>setOk(""),1800)};
 const q=ara.trim().toLocaleLowerCase("tr-TR"),diger=q?ULKELER.filter(u=>!ulkeler.includes(u.kod)&&(u.kod.toLowerCase().includes(q)||String(u.tr).toLocaleLowerCase("tr-TR").includes(q)||String(u.en).toLowerCase().includes(q))).slice(0,24).map(u=>u.kod):[];
 const kart=u=>{const on=aktif===u,b=bayrakUrl(u);return e.jsxs("button",{type:"button",onClick:()=>sec(on?null:u),style:{display:"flex",flexDirection:"column",alignItems:"center",gap:8,padding:"12px 10px",borderRadius:16,cursor:"pointer",border:on?"3px solid #16A34A":"1px solid #E2E8F0",background:on?"#F0FDF4":"#fff",boxShadow:on?"0 10px 24px -12px #16A34A":"0 1px 3px rgba(15,23,42,.06)",fontFamily:"inherit"},children:[b?e.jsx("img",{src:b,alt:u,style:{width:"100%",maxWidth:120,aspectRatio:"4/3",objectFit:"cover",borderRadius:8,boxShadow:"0 0 0 1px rgba(15,23,42,.12)"}}):e.jsx("div",{style:{width:120,aspectRatio:"4/3",borderRadius:8,background:"#F1F5F9",display:"grid",placeItems:"center",fontWeight:900,color:"#64748B"},children:u}),e.jsx("b",{style:{fontSize:14,color:"#0F172A"},children:ulAd(u,!1)}),e.jsx("span",{style:{fontSize:11,fontWeight:800,letterSpacing:".08em",color:on?"#16A34A":"#94A3B8"},children:on?"● "+__T("EKRANDA"):u})]},u)};
 const S={kart:{background:"#fff",border:"1px solid #E5E7EB",borderRadius:18,padding:16,marginBottom:14},btn:{display:"inline-flex",alignItems:"center",gap:6,borderRadius:12,padding:"10px 14px",fontWeight:800,fontSize:14,cursor:"pointer",border:"1px solid #E2E8F0",background:"#fff",color:"#0F172A",fontFamily:"inherit",textDecoration:"none"}};
 return e.jsxs("div",{style:{minHeight:"100vh",background:"#F4F5FA",padding:"18px clamp(12px,3vw,32px)",fontFamily:"inherit"},children:[
  e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:12,marginBottom:16,flexWrap:"wrap"},children:[e.jsx("button",{type:"button",onClick:()=>history.back(),style:{...S.btn,padding:8},children:MI("arrow_back")}),e.jsx("div",{style:{width:42,height:42,borderRadius:12,display:"grid",placeItems:"center",background:"linear-gradient(135deg,#EC4899,#8B5CF6)",color:"#fff"},children:MI("flag")}),
   e.jsxs("div",{style:{flex:1,minWidth:200},children:[e.jsx("div",{style:{fontWeight:900,fontSize:"1.15rem"},children:__T("Bayrak Ekranı")}),e.jsx("div",{style:{fontSize:".8rem",color:"#64748B",fontWeight:700},children:__T("Ulusal marş sırasında projeksiyonda tam ekran ülke bayrağı")})]}),
   e.jsxs("select",{value:comp,onChange:ev=>setComp(ev.target.value),style:{padding:"10px 12px",borderRadius:12,border:"1px solid #E2E8F0",fontWeight:700,fontFamily:"inherit",minWidth:260,maxWidth:"100%"},children:[e.jsx("option",{value:"",children:__T("Yarışma seçin…")}),...Object.entries(comps).sort((a,b)=>(b[1].intl-a[1].intl)||String(b[1].t).localeCompare(String(a[1].t))).map(([k,c])=>e.jsx("option",{value:k,children:c.isim},k))]})]}),
  comp?e.jsxs(e.Fragment,{children:[
   e.jsxs("div",{style:{...S.kart,display:"flex",alignItems:"center",gap:14,flexWrap:"wrap",background:"linear-gradient(135deg,#1E1B4B,#4C1D95 60%,#9D174D)",color:"#fff",border:0},children:[
    e.jsxs("div",{style:{flex:"1 1 260px",minWidth:0},children:[e.jsx("div",{style:{fontSize:12,fontWeight:900,letterSpacing:".1em",textTransform:"uppercase",opacity:.8},children:__T("Projeksiyon linki")}),e.jsx("div",{style:{fontFamily:"ui-monospace,Menlo,monospace",fontSize:13,fontWeight:700,wordBreak:"break-all",marginTop:4},children:url}),e.jsx("div",{style:{fontSize:12,opacity:.8,marginTop:4,fontWeight:600},children:__T("Projeksiyon bilgisayarında açın, Tam ekran'a basın (ya da çift tıklayın).")})]}),
    e.jsxs("button",{type:"button",style:S.btn,onClick:kopya,children:[MI(ok?"check":"content_copy",{fontSize:18}),ok?__T("Kopyalandı!"):__T("Kopyala")]}),e.jsxs("a",{href:url,target:"_blank",rel:"noopener noreferrer",style:S.btn,children:[MI("open_in_new",{fontSize:18}),__T("Aç")]})]}),
   e.jsxs("div",{style:{...S.kart,display:"flex",alignItems:"center",gap:12,flexWrap:"wrap"},children:[e.jsxs("div",{style:{flex:1,minWidth:200},children:[e.jsx("div",{style:{fontSize:12,fontWeight:900,letterSpacing:".08em",color:"#64748B",textTransform:"uppercase"},children:__T("Ekranda şu an")}),e.jsx("div",{style:{fontSize:20,fontWeight:900,marginTop:2,display:"flex",alignItems:"center",gap:10},children:kapali?["⏸ ",__T("Ekran karartıldı")]:toreAktif?["🏅 ",__T("Tören")+(BE.tore.baslik?" · "+BE.tore.baslik:"")+": ",(BE.tore.u||[]).map((u,i)=>u?((BE.tore.m||[])[i]||i+1)+". "+ulAd(u,!1):"").filter(Boolean).join(" · ")]:aktif?[bayrakUrl(aktif)?e.jsx("img",{src:bayrakUrl(aktif),alt:"",style:{width:42,borderRadius:5}},"i"):null,ulAd(aktif,!1)]:__T("TCF ve yarışma logosu")})]}),
    e.jsxs("button",{type:"button",onClick:()=>sec(null),disabled:!aktif&&!toreAktif,style:{...S.btn,background:aktif||toreAktif?"#0F172A":"#F1F5F9",color:aktif||toreAktif?"#fff":"#94A3B8",borderColor:aktif||toreAktif?"#0F172A":"#E2E8F0"},children:[MI("image",{fontSize:18}),__T("Logolara dön")]}),e.jsxs("button",{type:"button",onClick:durdur,style:{...S.btn,background:kapali?"#16A34A":"#DC2626",color:"#fff",borderColor:kapali?"#16A34A":"#DC2626"},children:[MI(kapali?"play_arrow":"stop",{fontSize:18}),kapali?__T("Devam et"):__T("Durdur (ekranı karart)")]})]}),
   e.jsxs("div",{style:{...S.kart,border:toreAktif?"2px solid #D97706":S.kart.border},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,marginBottom:10},children:[e.jsx("span",{style:{fontSize:20},children:"🏅"}),e.jsx("b",{style:{fontSize:15},children:__T("Ödül töreni (madalya podyumu)")}),toreAktif?e.jsx("span",{style:{marginLeft:"auto",fontSize:11,fontWeight:900,color:"#D97706",letterSpacing:".08em"},children:"● "+__T("EKRANDA")}):null]}),
    e.jsxs("div",{style:{padding:12,borderRadius:14,background:"linear-gradient(135deg,#EEF2FF,#FDF2F8)",border:"1px solid #C7D2FE",marginBottom:12},children:[
     e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:6,fontSize:12,fontWeight:900,letterSpacing:".06em",textTransform:"uppercase",color:"#4338CA",marginBottom:8},children:[MI("leaderboard",{fontSize:17}),__T("Sonuçtan doldur"),e.jsx("span",{style:{marginLeft:"auto",fontSize:11,fontWeight:700,letterSpacing:0,textTransform:"none",color:"#6366F1"},children:__T("ilk üç, canlı skordaki sıralamadan gelir")})]}),
     e.jsxs("div",{style:{display:"flex",gap:8,flexWrap:"wrap"},children:[e.jsxs("select",{value:src,onChange:ev=>{dolan.current="";setSrc(ev.target.value)},style:{flex:"1 1 280px",padding:"10px 12px",borderRadius:12,border:"1px solid #C7D2FE",fontFamily:"inherit",fontWeight:800,fontSize:14,background:"#fff"},children:[e.jsx("option",{value:"",children:__T("Sonuç seç (kategori / alet / takım / final)…")}),...srcOps.map(g=>e.jsx("optgroup",{label:g.g,children:g.l.map(x=>e.jsx("option",{value:x.v,children:x.t},x.v))},g.g))]}),
      src?e.jsxs("button",{type:"button",onClick:doldur,disabled:!sonucL||!podyum.length,style:{...S.btn,padding:"9px 12px"},children:[MI("refresh",{fontSize:18}),__T("Yeniden doldur")]}):null]}),
     src&&!sonucL?e.jsx("div",{style:{fontSize:12.5,fontWeight:700,color:"#64748B",marginTop:8},children:__T("Sonuçlar yükleniyor…")}):null,
     sonucL?e.jsxs("div",{style:{marginTop:10},children:[
      sonucL.tamam===!1?e.jsx("div",{style:{fontSize:12.5,fontWeight:800,color:"#B45309",background:"#FFFBEB",border:"1px solid #FDE68A",borderRadius:10,padding:"6px 10px",marginBottom:6},children:"⚠ "+__T("Bu sıralamada puanı henüz yayınlanmamış sporcu var")+" ("+sonucL.rows.length+" / "+sonucL.n+")"}):null,
      fazla.length?e.jsx("div",{style:{fontSize:12.5,fontWeight:800,color:"#B45309",background:"#FFFBEB",border:"1px solid #FDE68A",borderRadius:10,padding:"6px 10px",marginBottom:6},children:"⚠ "+__T("Eşitlik: podyumda 3'ten fazla sporcu var, ekranda ilk üçü gösterilir. Gerekirse aşağıdan değiştirin:")+" "+fazla.map(r=>r.sira+". "+r.ad+(r.ulke?" ("+r.ulke+")":"")).join(", ")}):null,
      ulkesiz.length?e.jsx("div",{style:{fontSize:12.5,fontWeight:800,color:"#B91C1C",marginBottom:6},children:"⚠ "+__T("Ülke bilgisi olmayan:")+" "+ulkesiz.map(r=>r.ad).join(", ")}):null,
      !sonucL.rows.length?e.jsx("div",{style:{fontSize:12.5,fontWeight:700,color:"#64748B"},children:__T("Bu seçimde henüz yayınlanmış puan yok.")}):
      e.jsx("div",{style:{display:"grid",gap:4},children:sonucL.rows.slice(0,8).map((r,i)=>{const md=r.sira<=3,bg=["#FEF3C7","#F1F5F9","#FFEDD5"][r.sira-1];return e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,padding:"5px 8px",borderRadius:10,background:md?bg:"#fff",border:"1px solid "+(md?"transparent":"#EEF0F4"),fontSize:13.5},children:[
       e.jsx("b",{style:{width:26,textAlign:"center",fontSize:md?16:13},children:md?["🥇","🥈","🥉"][r.sira-1]:r.sira+"."}),r.ulke&&bayrakUrl(r.ulke)?e.jsx("img",{src:bayrakUrl(r.ulke),alt:"",style:{width:26,borderRadius:3,boxShadow:"0 0 0 1px rgba(15,23,42,.12)"}}):e.jsx("span",{style:{width:26}}),
       e.jsx("span",{style:{flex:1,minWidth:0,fontWeight:800,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:r.ad}),e.jsx("span",{style:{fontWeight:800,color:"#64748B",fontSize:12},children:r.ulke||"—"}),e.jsx("b",{style:{fontVariantNumeric:"tabular-nums",minWidth:54,textAlign:"right"},children:Number(r.total||0).toFixed(3)})]},i)})})]}):null]}),
    e.jsxs("div",{style:{display:"flex",gap:8,flexWrap:"wrap",marginBottom:10},children:[e.jsxs("select",{value:"",onChange:ev=>{const v=ev.target.value;v&&setTB(v)},style:{flex:"1 1 240px",padding:"10px 12px",borderRadius:12,border:"1px solid #E2E8F0",fontFamily:"inherit",fontWeight:700,fontSize:14},children:[e.jsx("option",{value:"",children:__T("Kategori seç…")}),katS.some(x=>x.f)?e.jsx("optgroup",{label:__T("Finaller"),children:katS.filter(x=>x.f).map(x=>e.jsx("option",{value:x.t,children:x.t},x.k))}):null,e.jsx("optgroup",{label:__T("Kategoriler"),children:katS.filter(x=>!x.f).map(x=>e.jsx("option",{value:x.t,children:x.t},x.k))})]}),
     e.jsx("input",{value:tB,onChange:ev=>setTB(ev.target.value),placeholder:__T("Başlık (ör. Senior — Hoop Final)"),style:{flex:"2 1 280px",padding:"10px 12px",borderRadius:12,border:"1px solid #E2E8F0",fontFamily:"inherit",fontWeight:700,fontSize:14,boxSizing:"border-box"}})]}),
    e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:10},children:[0,1,2].map(i=>e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:8,padding:"8px 10px",borderRadius:12,background:["#FEF3C7","#F1F5F9","#FFEDD5"][i],border:"1px solid "+["#FCD34D","#CBD5E1","#FDBA74"][i]},children:[e.jsx("b",{style:{fontSize:18},title:tM[i]!==i+1?__T("Eşitlik: madalya sırası")+" "+tM[i]:"",children:["🥇","🥈","🥉"][(tM[i]||i+1)-1]||"🏅"}),tU[i]&&bayrakUrl(tU[i])?e.jsx("img",{src:bayrakUrl(tU[i]),alt:"",style:{width:30,borderRadius:4}}):null,
     e.jsxs("select",{value:tU[i],onChange:ev=>{const v=ev.target.value;setTU(o=>o.map((x,j)=>j===i?v:x));setTM([1,2,3])},style:{flex:1,minWidth:0,padding:"8px",borderRadius:10,border:"1px solid #E2E8F0",fontFamily:"inherit",fontWeight:700},children:[e.jsx("option",{value:"",children:(i+1)+". — "+__T("seçin")}),e.jsx("optgroup",{label:__T("Yarışmadaki ülkeler"),children:ulkeler.map(u=>e.jsx("option",{value:u,children:ulAd(u,!1)+" ("+u+")"},u))}),e.jsx("optgroup",{label:__T("Tüm ülkeler"),children:ULKELER.filter(u=>!ulkeler.includes(u.kod)).map(u=>e.jsx("option",{value:u.kod,children:u.tr+" ("+u.kod+")"},u.kod))})]})]},i))}),
    e.jsxs("div",{style:{display:"flex",gap:8,marginTop:12,flexWrap:"wrap"},children:[e.jsxs("button",{type:"button",onClick:toreGonder,disabled:!tU.some(Boolean),style:{...S.btn,background:tU.some(Boolean)?"linear-gradient(135deg,#F59E0B,#D97706)":"#F1F5F9",color:tU.some(Boolean)?"#fff":"#94A3B8",border:0},children:[MI("emoji_events",{fontSize:18}),__T("Töreni ekrana gönder")]}),e.jsxs("button",{type:"button",onClick:()=>{setTB("");setTU(["","",""]);setTM([1,2,3]);setSrc("");dolan.current=""},style:S.btn,children:[MI("restart_alt",{fontSize:18}),__T("Temizle")]})]})]}),
   e.jsxs("div",{style:S.kart,children:[e.jsx("div",{style:{fontSize:12,fontWeight:900,letterSpacing:".08em",color:"#64748B",textTransform:"uppercase",marginBottom:10},children:__T("Yarışmadaki ülkeler")+" · "+ulkeler.length}),
    ulkeler.length?e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(140px,1fr))",gap:10},children:ulkeler.map(kart)}):e.jsx("div",{style:{color:"#94A3B8",fontWeight:700,fontSize:14},children:__T("Bu yarışmada ülke bilgisi olan sporcu yok.")})]}),
   e.jsxs("div",{style:S.kart,children:[e.jsx("input",{value:ara,onChange:ev=>setAra(ev.target.value),placeholder:__T("Başka ülke ara (ad ya da kod)…"),style:{width:"100%",padding:"11px 13px",borderRadius:12,border:"1px solid #E2E8F0",fontFamily:"inherit",fontWeight:700,fontSize:14,boxSizing:"border-box"}}),
    diger.length?e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(140px,1fr))",gap:10,marginTop:12},children:diger.map(kart)}):null]})]})
  :e.jsx("div",{style:{...S.kart,color:"#64748B",fontWeight:700},children:__T("Bayrak gösterilecek yarışmayı seçin.")})]});
}
