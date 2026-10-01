import"./i18n-Tr01a2b3Cb2.js";import{a as usDisc,j as e,d as db}from"./main-C2LpyYUGCb2.js";
import{f as usSP,r as R}from"./vendor-react-Cxw6bqwhCb2.js";
import{k as ref,o as onValue}from"./vendor-firebase-940mxgRVCb2.js";
import{a as RA}from"./ritmikCriteriaDefaults-CgOlnfQcCb2.js";
import{katAdi}from"./judgeLinkGroup-Jl01a2b3Cb2.js";
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
  return onValue(ref(db,`${fp}/${comp}/aktifSporcuAlet`),s=>{
   const v=s.val()||{},aktif=[];
   Object.keys(v).forEach(k=>{const m=v[k]||{};Object.keys(m).forEach(al=>{
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
  });
 },[elle,comp,fp,adet]);

 const bolmeler=elle?sabit:Array.from({length:adet},(z,i)=>{
  const a=oto[i];if(!a)return null;
  const p=a.split("|");return{kat:p[0],alet:p[1]||""}});

 const url=b=>{const p=new URLSearchParams();
  p.set("competitionId",comp);
  if(String(b.kat).charAt(0)==="@")p.set("linkId",String(b.kat).slice(1));else if(b.kat)p.set("catId",b.kat);
  if(b.alet)p.set("aletId",b.alet);
  if(pid)p.set("panelId",pid);
  if(pt)p.set("panelType",pt);
  if(tok)p.set("token",tok);
  return `${rp}/${hedef}?${p.toString()}`};
 const et=al=>(RA[al]&&RA[al].label)||al;
 const kt=k=>String(k).charAt(0)==="@"?"Grup":katAdi(k);
 const bslk=b=>b?[kt(b.kat),b.alet?et(b.alet):"Aktif alet"].filter(Boolean).join(" · "):"Boş";
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
   e.jsx("span",{style:{marginLeft:"auto",opacity:.7,fontSize:".76rem",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",maxWidth:"55%"},children:bolmeler.map(bslk).join("  |  ")})]}),
  e.jsx("div",{style:{flex:1,minHeight:0,display:"grid",gridTemplateColumns:`repeat(auto-fit,minmax(min(100%,300px),1fr))`,gap:"2px",background:"#30363d"},
   children:bolmeler.map((b,ix)=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",minWidth:0,minHeight:0,background:"#0d1117"},children:[
    e.jsxs("div",{style:{padding:".22rem .6rem",background:b?"#1f2937":"#161b22",color:b?"#a5b4fc":"#6e7681",fontWeight:800,fontSize:".72rem",letterSpacing:".06em",textTransform:"uppercase",flexShrink:0,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"},children:[ix+1,". BÖLME — ",bslk(b)]}),
    b?e.jsx("iframe",{src:url(b),title:bslk(b),style:{flex:1,width:"100%",border:0,display:"block",minHeight:0}})
     :e.jsxs("div",{style:{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:8,color:"#6e7681",padding:16,textAlign:"center"},children:[
      e.jsx("i",{className:"material-icons-round",style:{fontSize:34},children:"hourglass_empty"}),
      e.jsx("div",{style:{fontWeight:700,fontSize:".85rem"},children:__T("Bölme boş")}),
      e.jsx("div",{style:{fontSize:".76rem",opacity:.8},children:__T("Sıradaki çağrı bu bölmeye gelecek")})]})]},"bolme"+ix))})]});
}
export{SplitPanel as default};
