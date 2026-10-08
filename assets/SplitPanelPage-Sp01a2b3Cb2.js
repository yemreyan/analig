import"./i18n-Tr01a2b3Cb2.js";import{a as usDisc,j as e,d as db}from"./main-C2LpyYUGCb2.js";
import{f as usSP,r as R}from"./vendor-react-Cxw6bqwhCb2.js";
import{k as ref,o as onValue}from"./vendor-firebase-940mxgRVCb2.js";
import{a as RA}from"./ritmikCriteriaDefaults-CgOlnfQcCb2.js";
import{katAdi}from"./judgeLinkGroup-Jl01a2b3Cb2.js";
import{useHakemKilit}from"./hakemKilit-Hk01a2b3Cb2.js";
import{bayrakUrl}from"./intl-Ul01a2b3Cb2.js";
import"./modulepreload-polyfill-B5Qt9EMXCb2.js";

// Mevcut hakem panellerini bolmelere ayirip yan yana gosterir.
// Otomatik mod: bolmeler onceden kategoriye baglanmaz; cagri yapildikca
// bos olan bolmeye sirayla yerlesir, cagri kalkinca bolme yeniden bosalir.
// Elle mod: bolmeler=kategori[:alet],... ya da eski catId+aletler bicimi.
function SplitPanel(){
 const[q]=usSP(),{routePrefix:rp,firebasePath:fp}=usDisc();
 const comp=q.get("competitionId")||"",cat=q.get("catId")||"",link=q.get("linkId")||"",
  pt=q.get("panelType")||"",pid=q.get("panelId")||"",tok=q.get("token")||"",
  hedef=(q.get("hedef")||"epanel").replace(/[^a-z]/g,""),
  aletler=(q.get("aletler")||"").split(",").map(z=>z.trim()).filter(Boolean),
  ham=(q.get("bolmeler")||"").split(",").map(z=>z.trim()).filter(Boolean),
  elle=ham.length>0||aletler.length>0,
  adet=Math.max(1,Math.min(6,parseInt(q.get("bolme")||"2",10)||2));

 const sabit=ham.length>0
  ?ham.map(z=>{const i=z.indexOf(":");return i<0?{kat:z,alet:""}:{kat:z.slice(0,i),alet:z.slice(i+1)}})
  :aletler.map(al=>({kat:link?"@"+link:cat,alet:al}));

 // --- otomatik atama -------------------------------------------------------
 const atRef=R.useRef([]);
 const[oto,setOto]=R.useState([]);
 R.useEffect(()=>{
  if(elle||!comp)return;
  atRef.current=Array.from({length:adet},(z,i)=>atRef.current[i]||null);
  // linkId verilirse (ör. Paneller sayfasındaki SJ paneli) yalnızca o kaydın kategorileri gösterilir
  let izin=null,aIzin=null,sonV=null;const ciz=()=>{if(sonV)isle(sonV)};
  const isle=v=>{sonV=v;const aktif=[];
   Object.keys(v).forEach(k=>{if(izin&&!izin.has(k))return;const m=v[k]||{};Object.keys(m).forEach(al=>{
    if(aIzin&&aIzin[k]&&!aIzin[k][al])return;
    if(m[al])aktif.push({anahtar:k+"|"+al,ts:Number(m[al].ts)||0})})});
   // En yeni cagrilar oncelikli: bolme sayisi kadar en guncel cagri gosterilir,
   // fazlasi (bitmis/eski cagrilar) bolmeden dusurulur.
   aktif.sort((a,b)=>b.ts-a.ts);
   const gost=aktif.slice(0,adet),canli=new Set(gost.map(z=>z.anahtar)),cur=atRef.current.slice(0,adet);
   for(let i=0;i<adet;i++)if(cur[i]&&!canli.has(cur[i]))cur[i]=null;
   const var_=new Set(cur.filter(Boolean));
   gost.slice().reverse().forEach(z=>{if(var_.has(z.anahtar))return;
    const bos=cur.findIndex(x=>!x);if(bos>=0){cur[bos]=z.anahtar;var_.add(z.anahtar)}});
   atRef.current=cur;setOto(cur.slice(0,adet));
  };
  const u2=link?onValue(ref(db,`${fp}/${comp}/hakemLinkleri/${link}`),s=>{const r=s.val()||{};izin=r.tumKategoriler||!r.kategoriler?null:new Set(Object.keys(r.kategoriler));aIzin=r.aletler&&typeof r.aletler==="object"?r.aletler:null;ciz()}):null;
  const u1=onValue(ref(db,`${fp}/${comp}/aktifSporcuAlet`),s=>isle(s.val()||{}));
  return()=>{u1();u2&&u2()};
 },[elle,comp,fp,adet,link]);

 // ekran kilidi (ritmik v2 bölünmüş ekran): bölmelerin kilidi burada; şifre linkId'ye bağlı (tek ekranla aynı)
 // hakem kimliği (Paneller ataması): kilit / ekran koruyucuda büyük ad + bayrak
 const[hk,setHk]=R.useState(null),SL=(pid||pt||"").toUpperCase();
 R.useEffect(()=>{if(!(fp==="ritmik_yarismalar"&&link&&comp))return;let u2=null;const u1=onValue(ref(db,`${fp}/${comp}/hakemLinkleri/${link}/panelGrubu`),s=>{u2&&u2();u2=null;const g=s.val();if(!g){setHk(null);return}u2=onValue(ref(db,`${fp}/${comp}/panelGruplari/${g}/hakemler/${SL}`),t=>setHk(t.val()||null))});return()=>{u1();u2&&u2()}},[fp,comp,link,SL]);
 const kl=useHakemKilit({base:fp==="ritmik_yarismalar"&&link?fp:"",comp,lk:link,slot:SL,tetik:oto.join(","),kimlik:hk&&hk.ad?{ad:hk.ad,ulke:hk.ulke||"",bayrak:hk.ulke?bayrakUrl(hk.ulke):null}:null});
 const bolmeler=elle?sabit:Array.from({length:adet},(z,i)=>{
  const a=oto[i];if(!a)return null;
  const p=a.split("|");return{kat:p[0],alet:p[1]||""}});

 const url=b=>{const p=new URLSearchParams();
  p.set("competitionId",comp);
  if(String(b.kat).charAt(0)==="@")p.set("linkId",String(b.kat).slice(1));else if(b.kat){p.set("catId",b.kat);link&&p.set("v2link",link)}
  if(b.alet)p.set("aletId",b.alet);
  if(pid)p.set("panelId",pid);
  if(pt)p.set("panelType",pt);
  if(tok)p.set("token",tok);
  return `${rp}/${hedef}?${p.toString()}`};
 const et=al=>(RA[al]&&RA[al].label)||al;
 const kt=k=>String(k).charAt(0)==="@"?"Grup":katAdi(k);
 const bslk=b=>b?[kt(b.kat),b.alet?__T(et(b.alet)):__T("Aktif alet")].filter(Boolean).join(" · "):__T("Boş");
 const rozet=(pid||pt||"").toUpperCase();

 if(!comp||bolmeler.length===0)
  return e.jsxs("div",{style:{minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:12,background:"#0d1117",color:"#e6edf3",padding:24,textAlign:"center"},children:[
   e.jsx("i",{className:"material-icons-round",style:{fontSize:48,color:"#f85149"},children:"error_outline"}),
   e.jsx("h2",{style:{margin:0},children:__T("Bölünmüş ekran açılamadı")}),
   e.jsx("p",{style:{opacity:.75,maxWidth:420},children:__T("Bağlantıda yarışma bilgisi ve en az bir bölme bulunmalı. QR & Linkler sayfasından yeniden oluşturun.")})]});

 return e.jsxs("div",{style:{height:"100vh",display:"flex",flexDirection:"column",background:"#0d1117",overflow:"hidden"},children:[
  e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10,padding:".4rem .7rem",background:"#161b22",borderBottom:"1px solid #30363d",color:"#e6edf3",flexShrink:0},children:[
   e.jsx("i",{className:"material-icons-round",style:{fontSize:18,color:"#7c3aed"},children:"vertical_split"}),
   e.jsx("span",{style:{fontWeight:800,fontSize:".82rem",letterSpacing:".04em"},children:__T("BÖLÜNMÜŞ EKRAN")}),
   rozet?e.jsx("span",{style:{background:"#7c3aed",color:"#fff",borderRadius:"999px",padding:"2px 10px",fontWeight:800,fontSize:".74rem"},children:rozet}):null,
   elle?null:e.jsx("span",{style:{background:"#1f6feb33",color:"#79c0ff",border:"1px solid #1f6feb66",borderRadius:"999px",padding:"1px 9px",fontWeight:700,fontSize:".7rem"},children:__T("OTOMATİK")}),
   e.jsx("span",{style:{marginLeft:"auto",opacity:.7,fontSize:".76rem",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",maxWidth:"50%"},children:bolmeler.map(bslk).join("  |  ")}),
   e.jsx("button",{type:"button",title:__T("Tam ekran"),onClick:()=>{try{const d=document.documentElement;if(document.fullscreenElement||document.webkitFullscreenElement)(document.exitFullscreen||document.webkitExitFullscreen).call(document);else(d.requestFullscreen||d.webkitRequestFullscreen).call(d)}catch{}},style:{border:"1px solid #30363d",background:"transparent",color:"#e6edf3",borderRadius:999,padding:"3px 10px",fontWeight:800,fontSize:".72rem",cursor:"pointer",display:"inline-flex",alignItems:"center",gap:4,flexShrink:0,fontFamily:"inherit"},children:[e.jsx("i",{className:"material-icons-round",style:{fontSize:16},children:"fullscreen"}),__T("Tam ekran")]}),kl.dugme,e.jsx("span",{style:{display:"inline-flex",border:"1px solid #30363d",borderRadius:999,overflow:"hidden",flexShrink:0},children:["tr","en"].map(l=>e.jsx("button",{type:"button",onClick:()=>typeof __SETLANG=="function"&&__SETLANG(l),style:{border:0,padding:"3px 9px",fontWeight:800,fontSize:".7rem",cursor:"pointer",fontFamily:"inherit",background:(typeof __LANG=="function"&&__LANG()===l)?"#e6edf3":"transparent",color:(typeof __LANG=="function"&&__LANG()===l)?"#0d1117":"#8b949e"},children:l.toUpperCase()},l))})]}),
  kl.ortu,
  e.jsx("div",{style:{flex:1,minHeight:0,display:"grid",gridTemplateColumns:`repeat(auto-fit,minmax(min(100%,300px),1fr))`,gap:"2px",background:"#30363d"},
   children:bolmeler.map((b,ix)=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",minWidth:0,minHeight:0,background:"#0d1117"},children:[
    e.jsxs("div",{style:{padding:".22rem .6rem",background:b?"#1f2937":"#161b22",color:b?"#a5b4fc":"#6e7681",fontWeight:800,fontSize:".72rem",letterSpacing:".06em",textTransform:"uppercase",flexShrink:0,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"},children:[ix+1,". ",__T("BÖLME")," — ",bslk(b)]}),
    b?e.jsx("iframe",{src:url(b),title:bslk(b),style:{flex:1,width:"100%",border:0,display:"block",minHeight:0}})
     :e.jsxs("div",{style:{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:8,color:"#6e7681",padding:16,textAlign:"center"},children:[
      e.jsx("i",{className:"material-icons-round",style:{fontSize:34},children:"hourglass_empty"}),
      e.jsx("div",{style:{fontWeight:700,fontSize:".85rem"},children:__T("Bölme boş")}),
      e.jsx("div",{style:{fontSize:".76rem",opacity:.8},children:__T("Sıradaki çağrı bu bölmeye gelecek")})]})]},"bolme"+ix))})]});
}
export{SplitPanel as default};
