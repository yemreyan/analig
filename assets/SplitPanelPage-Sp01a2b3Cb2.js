import{a as usDisc,j as e}from"./main-C2LpyYUGCb2.js";
import{f as usSP,r as R}from"./vendor-react-Cxw6bqwhCb2.js";
import{a as RA}from"./ritmikCriteriaDefaults-CgOlnfQcCb2.js";
import{katAdi}from"./judgeLinkGroup-Jl01a2b3Cb2.js";
import"./modulepreload-polyfill-B5Qt9EMXCb2.js";

// Mevcut hakem panellerini alet basina iframe ile yan yana gosterir.
// Panel mantigina dokunmaz; her bolme bagimsiz calisir.
function SplitPanel(){
 const[q]=usSP(),{routePrefix:rp}=usDisc();
 const comp=q.get("competitionId")||"",cat=q.get("catId")||"",link=q.get("linkId")||"",
  pt=q.get("panelType")||"",pid=q.get("panelId")||"",tok=q.get("token")||"",
  hedef=(q.get("hedef")||"epanel").replace(/[^a-z]/g,""),
  aletler=(q.get("aletler")||"").split(",").map(z=>z.trim()).filter(Boolean);
 // Her bolme kendi kategorisini ve aletini tasiyabilir: bolmeler=buyukler_kiz:top,genc_kiz:top
 // Kategori yerine "@grupId" yazilirsa o bolme hakem link grubunu takip eder.
 const ham=(q.get("bolmeler")||"").split(",").map(z=>z.trim()).filter(Boolean),
  bolmeler=ham.length>0
   ?ham.map(z=>{const i=z.indexOf(":");return i<0?{kat:z,alet:""}:{kat:z.slice(0,i),alet:z.slice(i+1)}})
   :(aletler.length>0?aletler.map(al=>({kat:link?"@"+link:cat,alet:al})):[]);
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
 const bslk=b=>[kt(b.kat),b.alet?et(b.alet):"Aktif alet"].filter(Boolean).join(" · ");
 const rozet=(pid||pt||"").toUpperCase();

 if(!comp||bolmeler.length===0)
  return e.jsxs("div",{style:{minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:12,background:"#0d1117",color:"#e6edf3",padding:24,textAlign:"center"},children:[
   e.jsx("i",{className:"material-icons-round",style:{fontSize:48,color:"#f85149"},children:"error_outline"}),
   e.jsx("h2",{style:{margin:0},children:"Bölünmüş ekran açılamadı"}),
   e.jsx("p",{style:{opacity:.75,maxWidth:420},children:"Bağlantıda yarışma ve en az bir bölme bulunmalı. Lütfen QR & Linkler sayfasından yeniden oluşturun."})]});

 return e.jsxs("div",{style:{height:"100vh",display:"flex",flexDirection:"column",background:"#0d1117",overflow:"hidden"},children:[
  e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10,padding:".4rem .7rem",background:"#161b22",borderBottom:"1px solid #30363d",color:"#e6edf3",flexShrink:0},children:[
   e.jsx("i",{className:"material-icons-round",style:{fontSize:18,color:"#7c3aed"},children:"vertical_split"}),
   e.jsx("span",{style:{fontWeight:800,fontSize:".82rem",letterSpacing:".04em"},children:"BÖLÜNMÜŞ EKRAN"}),
   rozet?e.jsx("span",{style:{background:"#7c3aed",color:"#fff",borderRadius:"999px",padding:"2px 10px",fontWeight:800,fontSize:".74rem"},children:rozet}):null,
   e.jsx("span",{style:{marginLeft:"auto",opacity:.7,fontSize:".76rem"},children:bolmeler.map(bslk).join("  |  ")})]}),
  e.jsx("div",{style:{flex:1,minHeight:0,display:"grid",gridTemplateColumns:`repeat(auto-fit,minmax(min(100%,300px),1fr))`,gap:"2px",background:"#30363d"},
   children:bolmeler.map((b,ix)=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",minWidth:0,minHeight:0,background:"#0d1117"},children:[
    e.jsx("div",{style:{padding:".22rem .6rem",background:"#1f2937",color:"#a5b4fc",fontWeight:800,fontSize:".72rem",letterSpacing:".06em",textTransform:"uppercase",flexShrink:0,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"},children:bslk(b)}),
    e.jsx("iframe",{src:url(b),title:bslk(b),style:{flex:1,width:"100%",border:0,display:"block",minHeight:0}})]},`${b.kat}|${b.alet}|${ix}`))})]});
}
export{SplitPanel as default};
