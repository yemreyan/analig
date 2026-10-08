import{j as e,d as db,a as usDisc,u as usAuth,l as logAction}from"./main-C2LpyYUGCb2.js";import{r as R}from"./vendor-react-Cxw6bqwhCb2.js";import{k as ref,o as onValue,m as update}from"./vendor-firebase-940mxgRVCb2.js";import{ULKELER,bayrakUrl}from"./intl-Ul01a2b3Cb2.js";

// BAYRAK EKRANI (2026-10-08) — uluslararası yarışmada ulusal marş çalınırken projeksiyona tam ekran ülke bayrağı.
//  <yarışma>/bayrakEkrani = {ulke: IOC kodu | null, ts, kim}
//  Ekran  (/rhythmic/flag-screen?compId=…, giriş istemez): ulke yoksa TCF + yarışma logosu; ulke seçilince o ülkenin bayrağı dalgalanır.
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
.gxb-tam{position:absolute;right:20px;bottom:20px;display:flex;gap:8px;opacity:0;transition:opacity .3s}
.gxb.imlec .gxb-tam{opacity:1}
.gxb-tam button{border:1px solid rgba(255,255,255,.25);background:rgba(255,255,255,.08);color:#fff;border-radius:12px;padding:10px 14px;font:800 14px inherit;font-family:inherit;cursor:pointer;display:inline-flex;align-items:center;gap:6px}
`;

function useComp(base,comp){const[C,setC]=R.useState(null);R.useEffect(()=>{setC(null);if(!base||!comp)return;const st={},u=["isim","etkinlikLogo","ciktiDili","uluslararasi","tur","bayrakEkrani"].map(k=>onValue(ref(db,`${base}/${comp}/${k}`),s=>{st[k]=s.val();setC({...st})}));return()=>u.forEach(f=>f())},[base,comp]);return C}

// ---- PROJEKSİYON EKRANI ----
export function BayrakEkran(){
 const{firebasePath:fp}=usDisc()||{},q=new URLSearchParams(location.search),comp=q.get("compId")||q.get("competitionId")||"";
 const C=useComp(fp,comp),be=C&&C.bayrakEkrani,ul=be&&be.ulke||null,en=!!C&&(C.ciktiDili==="en"||((C.uluslararasi||C.tur==="uluslararasi")&&C.ciktiDili!=="tr"));
 const[imlec,setImlec]=R.useState(!0),zm=R.useRef(null);
 R.useEffect(()=>{const f=()=>{setImlec(!0);clearTimeout(zm.current);zm.current=setTimeout(()=>setImlec(!1),2500)};f();window.addEventListener("mousemove",f);window.addEventListener("pointerdown",f);return()=>{window.removeEventListener("mousemove",f);window.removeEventListener("pointerdown",f);clearTimeout(zm.current)}},[]);
 // bayrak değişince kısa geçiş: önce eski kaybolur, yenisi gelir
 const[gos,setGos]=R.useState(null);R.useEffect(()=>{if(ul===gos)return;setGos(null);if(!ul)return;const t=setTimeout(()=>setGos(ul),ul&&gos?450:60);return()=>clearTimeout(t)},[ul]);
 const tam=()=>{try{document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen()}catch{}};
 const evL=C&&C.etkinlikLogo||null,bf=gos?bayrakUrl(gos):null;
 if(!comp)return e.jsx("div",{style:{minHeight:"100vh",display:"grid",placeItems:"center",background:"#0B0F1E",color:"#94A3B8",fontFamily:"system-ui",fontWeight:700},children:__T("Yarışma seçilmedi")});
 return e.jsxs("div",{className:"gxb"+(imlec?" imlec":""),"data-gx-hide":"1",onDoubleClick:tam,children:[e.jsx("style",{children:CSS}),
  // logo sahnesi
  e.jsxs("div",{className:"gxb-sahne"+(gos?" gizli":""),children:[e.jsxs("div",{className:"gxb-logolar",children:[e.jsx("div",{className:"lk",children:e.jsx("img",{src:"/logo.png",alt:"TCF"})}),evL?e.jsx("div",{className:"ay"}):null,evL?e.jsx("div",{className:"lk",children:e.jsx("img",{src:evL,alt:""})}):null]}),
   C&&C.isim?e.jsx("div",{className:"gxb-ad",children:C.isim}):null]}),
  // bayrak sahnesi
  e.jsxs("div",{className:"gxb-sahne"+(gos?"":" gizli"),children:[
   e.jsxs("div",{className:"gxb-kose sol",children:[e.jsx("img",{src:"/logo.png",alt:"TCF"})]}),evL?e.jsx("div",{className:"gxb-kose sag",children:e.jsx("img",{src:evL,alt:""})}):null,
   bf?e.jsxs("div",{className:"gxb-bayrak",children:[...[...Array(SERIT)].map((_,i)=>e.jsx("i",{style:{backgroundImage:`url(${bf})`,backgroundSize:`${SERIT*100}% 100%`,backgroundPosition:`${i/(SERIT-1)*100}% 0`,animationDelay:`${-(i/SERIT)*2.6}s`}},i)),e.jsx("div",{className:"gxb-golge"},"g"),e.jsx("div",{className:"gxb-isik"},"s")]}):null,
   gos?e.jsx("div",{className:"gxb-ulke",children:ulAd(gos,en)}):null]}),
  e.jsx("div",{className:"gxb-tam",children:e.jsxs("button",{type:"button",onClick:tam,children:[MI("fullscreen",{fontSize:18}),__T("Tam ekran")]})})]});
}

// ---- KONTROL ----
export default function BayrakKontrol(){
 const{firebasePath:fp,routePrefix:rp}=usDisc()||{},{currentUser:cu}=usAuth()||{},kim=cu?.adSoyad||cu?.kullaniciAdi||"admin";
 const[comps,setComps]=R.useState({}),[comp,setComp]=R.useState(()=>{try{return localStorage.getItem("gxBayrakComp")||""}catch{return""}}),[ulkeler,setUlkeler]=R.useState([]),[ara,setAra]=R.useState(""),[ok,setOk]=R.useState("");
 R.useEffect(()=>{if(!fp)return;return onValue(ref(db,fp),s=>{const v=s.val()||{},o={};Object.entries(v).forEach(([k,c])=>{c&&c.isim&&c.arsivli!==!0&&c.arsivli!=="true"&&(o[k]={isim:c.isim,intl:!!(c.uluslararasi||c.tur==="uluslararasi"),t:c.baslangicTarihi||""})});setComps(o)},{onlyOnce:!0})},[fp]);
 R.useEffect(()=>{try{localStorage.setItem("gxBayrakComp",comp)}catch{}setUlkeler([]);if(!fp||!comp)return;return onValue(ref(db,`${fp}/${comp}/sporcular`),s=>{const v=s.val()||{},say={};Object.entries(v).forEach(([k,a])=>{if(/^final_/.test(k))return;Object.values(a||{}).forEach(x=>{const u=String(x&&(x.ulke||x.country||x.noc)||"").trim().toUpperCase();u&&(say[u]=(say[u]||0)+1)})});setUlkeler(Object.keys(say).sort((a,b)=>ulAd(a,!1).localeCompare(ulAd(b,!1),"tr")))})},[fp,comp]);
 const C=useComp(fp,comp),aktif=C&&C.bayrakEkrani&&C.bayrakEkrani.ulke||null;
 const sec=async u=>{if(!comp)return;try{await update(ref(db,`${fp}/${comp}`),{bayrakEkrani:{ulke:u||null,ts:Date.now(),kim}});try{logAction("flag_screen",`Bayrak ekranı: ${u?ulAd(u,!1)+" ("+u+")":"logolar"}`,{user:kim,competitionId:comp})}catch{}}catch{}};
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
   e.jsxs("div",{style:{...S.kart,display:"flex",alignItems:"center",gap:12,flexWrap:"wrap"},children:[e.jsxs("div",{style:{flex:1,minWidth:200},children:[e.jsx("div",{style:{fontSize:12,fontWeight:900,letterSpacing:".08em",color:"#64748B",textTransform:"uppercase"},children:__T("Ekranda şu an")}),e.jsx("div",{style:{fontSize:20,fontWeight:900,marginTop:2,display:"flex",alignItems:"center",gap:10},children:aktif?[bayrakUrl(aktif)?e.jsx("img",{src:bayrakUrl(aktif),alt:"",style:{width:42,borderRadius:5}},"i"):null,ulAd(aktif,!1)]:__T("TCF ve yarışma logosu")})]}),
    e.jsxs("button",{type:"button",onClick:()=>sec(null),disabled:!aktif,style:{...S.btn,background:aktif?"#0F172A":"#F1F5F9",color:aktif?"#fff":"#94A3B8",borderColor:aktif?"#0F172A":"#E2E8F0"},children:[MI("image",{fontSize:18}),__T("Logolara dön")]})]}),
   e.jsxs("div",{style:S.kart,children:[e.jsx("div",{style:{fontSize:12,fontWeight:900,letterSpacing:".08em",color:"#64748B",textTransform:"uppercase",marginBottom:10},children:__T("Yarışmadaki ülkeler")+" · "+ulkeler.length}),
    ulkeler.length?e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(140px,1fr))",gap:10},children:ulkeler.map(kart)}):e.jsx("div",{style:{color:"#94A3B8",fontWeight:700,fontSize:14},children:__T("Bu yarışmada ülke bilgisi olan sporcu yok.")})]}),
   e.jsxs("div",{style:S.kart,children:[e.jsx("input",{value:ara,onChange:ev=>setAra(ev.target.value),placeholder:__T("Başka ülke ara (ad ya da kod)…"),style:{width:"100%",padding:"11px 13px",borderRadius:12,border:"1px solid #E2E8F0",fontFamily:"inherit",fontWeight:700,fontSize:14,boxSizing:"border-box"}}),
    diger.length?e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(140px,1fr))",gap:10,marginTop:12},children:diger.map(kart)}):null]})]})
  :e.jsx("div",{style:{...S.kart,color:"#64748B",fontWeight:700},children:__T("Bayrak gösterilecek yarışmayı seçin.")})]});
}
