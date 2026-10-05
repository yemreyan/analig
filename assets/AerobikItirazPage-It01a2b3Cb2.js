import"./i18n-Tr01a2b3Cb2.js";import{b as usToast,a as usInit,j as e,d as db}from"./main-C2LpyYUGCb2.js";import{f as usParams,r as R}from"./vendor-react-Cxw6bqwhCb2.js";import{k as ref,l as get,o as onValue,m as update,v as fset}from"./vendor-firebase-940mxgRVCb2.js";import{v as verifyToken}from"./epanelToken-BoF3UjP2Cb2.js";import"./modulepreload-polyfill-B5Qt9EMXCb2.js";

const BASE="aerobik_yarismalar",WINDOW=6e5;// 10 dakika
const f2=v=>v==null||isNaN(v)?"—":Number(v).toFixed(2);
const f3=v=>v==null||isNaN(v)?"—":Number(v).toFixed(3);
function trimA(o){if(!o)return null;const v=["j1","j2","j3","j4"].map(k=>o[k]).filter(x=>x!=null&&!isNaN(x));if(!v.length)return null;if(v.length<2)return v[0];if(v.length===4){v.sort((x,y)=>x-y);return(v[1]+v[2])/2}return v.reduce((a,b)=>a+b,0)/v.length}
function calcE(o){if(!o)return null;const v=["j1","j2","j3","j4"].map(k=>o[k]).filter(x=>x!=null&&!isNaN(x));if(!v.length)return null;let m;if(v.length===4){const s=[...v].sort((x,y)=>x-y);m=(s[1]+s[2])/2}else m=v.reduce((a,b)=>a+b,0)/v.length;return 10-m}
const comps=sc=>{const d=sc.dScore!=null?sc.dScore:null,a=sc.aScore!=null?sc.aScore:trimA(sc.aPanel),ee=sc.eScore!=null?sc.eScore:calcE(sc.ePanel),fin=sc.finalScore!=null?sc.finalScore:(sc.sonuc!=null?sc.sonuc:null);return{d,a,e:ee,fin}};
const finishTs=sc=>{let t=sc.ustJuriOnay||0;if(sc.timestamp){const p=Date.parse(sc.timestamp);if(!isNaN(p))t=Math.max(t,p)}return t};
const TYPES=[["D","D — Zorluk","#8b5cf6"],["A","A — Artistik","#ec4899"],["E","E — Uygulama","#10b981"]];

function Itiraz(){
 const{toast}=usToast();usInit();
 const[sp]=usParams();
 const comp=sp.get("competitionId"),token=sp.get("token");
 const[authed,setAuthed]=R.useState(!1),[loading,setLoading]=R.useState(!0),[dk,setDk]=R.useState(()=>{try{return localStorage.getItem("tcfItTema")==="koyu"}catch{return!1}});
 const[pun,setPun]=R.useState({}),[spor,setSpor]=R.useState({}),[cats,setCats]=R.useState({}),[compName,setCompName]=R.useState("Yarışma"),[itr,setItr]=R.useState({});
 const[pick,setPick]=R.useState(""),[now,setNow]=R.useState(Date.now()),[busy,setBusy]=R.useState(!1);

 R.useEffect(()=>{const t=setInterval(()=>setNow(Date.now()),1e3);return()=>clearInterval(t)},[]);
 R.useEffect(()=>{if(!comp||!token){setLoading(!1),setAuthed(!1);return}get(ref(db,`${BASE}/${comp}/epanelToken`)).then(s=>{const v=s.val();setAuthed(v?verifyToken(token,v):!1)}).catch(()=>setAuthed(!1)).finally(()=>setLoading(!1))},[comp,token]);
 R.useEffect(()=>{if(!comp||!authed)return;const u1=onValue(ref(db,`${BASE}/${comp}/puanlar`),s=>setPun(s.val()||{}));const u2=onValue(ref(db,`${BASE}/${comp}/sporcular`),s=>setSpor(s.val()||{}));const u3=onValue(ref(db,`${BASE}/${comp}/kategoriler`),s=>setCats(s.val()||{}));const u4=onValue(ref(db,`${BASE}/${comp}/isim`),s=>setCompName(s.val()||"Yarışma"));const u5=onValue(ref(db,`${BASE}/${comp}/itirazlar`),s=>setItr(s.val()||{}));return()=>{u1(),u2(),u3(),u4(),u5()}},[comp,authed]);

 const catName=c=>cats[c]?.name||c;
 const nmeta=(cat,ath)=>{const cm=spor[cat]||{},i=cm[ath];
  if(i)return{name:[i.ad,i.soyad].filter(Boolean).join(" ")||ath,club:i.il||i.okul||i.kulup||"",ad:i.ad||"",soyad:i.soyad||""};
  const parts=String(ath).split("::"),gn=parts[parts.length-1],ok=parts.length>=3?parts.slice(1,-1).join("::"):"";
  const _kW=m=>String(cat+"::"+String(m.okul||m.kulup||"").trim()+"::"+(m.grupNo||1)).trim().replace(/[.#$[\]/]/g,"-").slice(0,60),_sO=v=>String(v||"").trim().replace(/[.#$[\]/]/g,"-");let mem=Object.values(cm).filter(m=>m&&_kW(m)===String(ath));if(!mem.length)mem=Object.values(cm).filter(m=>m&&String(m.grupNo??m.cikisSirasi??"")===String(gn)&&(ok===""||String(m.okul||m.kulup||"")===ok||_sO(m.okul||m.kulup)===ok));
  const nm=[...new Set(mem.map(m=>[m.ad,m.soyad].filter(Boolean).join(" ")||m.adSoyad).filter(Boolean))].join(", ");
  return{name:nm||ath,club:mem[0]?.il||mem[0]?.okul||mem[0]?.kulup||"",ad:mem[0]?.ad||"",soyad:mem[0]?.soyad||""}};

 const list=[];
 Object.entries(pun).forEach(([cat,aths])=>{if(!aths||typeof aths!="object")return;Object.entries(aths).forEach(([ath,sc])=>{if(!sc||typeof sc!="object")return;const done=sc.durum==="tamamlandi"||sc.kilitli===!0||sc.ustJuriOnay||sc.sonuc!=null;if(!done)return;const ft=finishTs(sc);if(!ft||now-ft>WINDOW)return;const m=nmeta(cat,ath);list.push({cat,ath,sc,C:comps(sc),name:m.name,club:m.club,ad:m.ad,soyad:m.soyad,ft,left:Math.max(0,WINDOW-(now-ft))})})});
 list.sort((a,b)=>b.ft-a.ft);

 const objOf=(cat,ath)=>itr[`${cat}__${ath}__D`];
 const send=async it=>{if(busy)return;setBusy(!0);try{await fset(ref(db,`${BASE}/${comp}/itirazlar/${it.cat}__${it.ath}__D`),{catId:it.cat,catName:catName(it.cat),athId:it.ath,athName:it.name,ad:it.ad,soyad:it.soyad,scoreType:"D",value:it.C.d,total:it.C.fin!=null?it.C.fin:null,ts:Date.now(),status:"pending"});await fset(ref(db,`${BASE}/${comp}/flashTrigger`),{isAerobik:!0,itiraz:"pending",adSoyad:it.name,kulup:it.club,aletAd:catName(it.cat),scoreType:"D",timestamp:Date.now()});toast(it.name+" — D puanına itiraz gönderildi ✓","success")}catch{toast("İtiraz gönderilemedi.","error")}setBusy(!1)};

 const withdraw=async it=>{const o=objOf(it.cat,it.ath);if(!o||o.status!=="pending"||busy)return;if(!await window.__gxConfirm(it.name+" — D puanı itirazı geri çekilsin mi?"))return;setBusy(!0);try{const ts=Date.now();await update(ref(db,`${BASE}/${comp}/itirazlar/${it.cat}__${it.ath}__D`),{status:"withdrawn",withdrawnAt:ts,geriCekme:(o.geriCekme||0)+1});await fset(ref(db,`${BASE}/${comp}/flashTrigger`),{isAerobik:!0,itiraz:"withdrawn",adSoyad:it.name,kulup:it.club,aletAd:catName(it.cat),scoreType:"D",timestamp:ts});toast(it.name+" — itiraz geri çekildi","success")}catch{toast("İtiraz geri çekilemedi.","error")}setBusy(!1)};
 const fmt=ms=>{const s=Math.ceil(ms/1e3),m=Math.floor(s/60),ss=s%60;return m+":"+String(ss).padStart(2,"0")};
 const P=dk?{bg:"#0b1220",card:"#111a2e",soft:"#16213a",soft2:"#0f1729",line:"#24324d",line2:"rgba(42,53,80,.55)",ink:"#e5ebf5",ink2:"#cbd5e1",muted:"#94a3b8",hdr:"#0f172a",amber:"#fbbf24",red:"#fca5a5",green:"#86efac",green2:"#6ee7b7",pink:"#f9a8d4",violet:"#c4b5fd",sky:"#38bdf8"}:{bg:"#F0F2F5",card:"#fff",soft:"#F8FAFC",soft2:"#F1F5F9",line:"#E5E7EB",line2:"#EEF2F7",ink:"#1A1D26",ink2:"#334155",muted:"#6B7280",hdr:"#fff",amber:"#B45309",red:"#DC2626",green:"#15803D",green2:"#047857",pink:"#DB2777",violet:"#6D28D9",sky:"#0369A1"};
 const S={wrap:{minHeight:"100vh",background:P.bg,color:P.ink,fontFamily:"Nunito,system-ui,-apple-system,sans-serif",paddingBottom:"2rem"},
  top:{position:"sticky",top:0,zIndex:10,background:P.hdr,backdropFilter:"blur(10px)",borderBottom:("1px solid "+P.line),boxShadow:"0 1px 3px rgba(0,0,0,.06)",padding:".5rem 1.25rem",minHeight:68,display:"flex",alignItems:"center",gap:".9rem",flexWrap:"wrap"},
  wrapIn:{maxWidth:820,margin:"0 auto",padding:"1rem"},
  card:{background:P.card,border:("1px solid "+P.line),borderRadius:16,padding:"1rem 1.2rem",marginBottom:".9rem"},
  chead:{display:"flex",alignItems:"center",gap:".8rem",flexWrap:"wrap"},
  nm:{fontSize:"1.2rem",fontWeight:800},meta:{color:P.muted,fontWeight:700,fontSize:".82rem"},
  kat:{background:P.soft,border:("1px solid "+P.line),borderRadius:999,padding:".3rem .8rem",fontWeight:800,fontSize:".8rem"},
  clk:{marginLeft:"auto",background:"rgba(234,179,8,.15)",color:P.amber,borderRadius:10,padding:".35rem .8rem",fontWeight:800,fontSize:".85rem",whiteSpace:"nowrap"},
  mini:{display:"flex",gap:"1rem",flexWrap:"wrap",margin:".7rem 0",fontSize:".92rem",color:P.muted,fontWeight:700},
  itbtn:{width:"100%",marginTop:".3rem",padding:".8rem",border:"none",borderRadius:12,fontWeight:800,fontSize:"1rem",cursor:"pointer",color:"#fff",background:"linear-gradient(135deg,#e11d48,#f43f5e)"},
  tyrow:{display:"flex",gap:".6rem",flexWrap:"wrap",marginTop:".6rem"},
  center:{maxWidth:560,margin:"3rem auto 0",textAlign:"center",color:P.muted,fontWeight:700,padding:"2rem 1rem"}};

 if(!comp)return e.jsx("div",{style:S.wrap,children:e.jsx("div",{style:S.center,children:__T("Hatalı link.")})});
 if(loading)return e.jsx("div",{style:S.wrap,children:e.jsx("div",{style:S.center,children:__T("Doğrulanıyor…")})});
 if(!authed)return e.jsx("div",{style:S.wrap,children:e.jsxs("div",{style:S.center,children:[e.jsx("h2",{children:__T("Yetkisiz Erişim")}),e.jsx("p",{children:__T("Geçersiz/süresi dolmuş bağlantı.")})]})});

 return e.jsxs("div",{style:S.wrap,children:[
  e.jsxs("div",{style:S.top,children:[e.jsx("div",{style:{width:44,height:44,borderRadius:12,background:"#e11d48",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,boxShadow:"0 6px 18px rgba(225,29,72,.35)"},children:e.jsx("span",{className:"material-icons-round",style:{color:"#fff"},children:"gavel"})}),e.jsxs("div",{style:{minWidth:0},children:[e.jsx("div",{style:{fontWeight:900,fontSize:"1.12rem",lineHeight:1.15},children:__T("İtiraz Ekranı")}),e.jsx("div",{style:{fontSize:".8rem",color:P.muted,fontWeight:700},children:compName})]}),e.jsxs("div",{style:{marginLeft:"auto",background:"rgba(244,63,94,.12)",color:P.red,fontWeight:800,padding:".4rem .9rem",borderRadius:999},children:[list.length," aktif sporcu"]}),e.jsx("button",{type:"button",title:dk?__T("Açık tema"):__T("Karanlık tema"),onClick:()=>setDk(v=>{const y=!v;try{localStorage.setItem("tcfItTema",y?"koyu":"acik")}catch{}return y}),style:{width:38,height:38,borderRadius:10,border:"1px solid "+P.line,background:P.card,color:P.ink,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",flexShrink:0},children:e.jsx("span",{className:"material-icons-round",style:{fontSize:"1.2rem"},children:dk?"light_mode":"dark_mode"})})]}),
  e.jsxs("div",{style:S.wrapIn,children:[
   e.jsx("div",{style:{fontSize:".8rem",color:P.muted,fontWeight:700,margin:"0 0 .8rem"},children:__T("Yarışması biten sporcular 10 dakika boyunca burada görünür. İtiraz D puanına yapılır — sporcunun yanındaki İtiraz Et butonuna basın.")}),
   list.length===0?e.jsxs("div",{style:S.center,children:[e.jsx("div",{style:{fontSize:"2.4rem",marginBottom:".5rem"},children:"⏳"}),e.jsx("div",{children:__T("İtiraz penceresinde sporcu yok.")}),e.jsx("p",{style:{marginTop:".4rem",fontSize:".85rem"},children:__T("Sporcu yarışıp puanı onaylandıktan sonra 10 dk boyunca burada listelenir.")})]}):
   list.map(it=>{const o=objOf(it.cat,it.ath);const st=o&&(o.status==="accepted"?["İTİRAZ KABUL EDİLDİ",P.green,"rgba(34,197,94,.15)"]:o.status==="rejected"?["İTİRAZ REDDEDİLDİ",P.red,"rgba(244,63,94,.15)"]:o.status==="resolved"?["İTİRAZ DEĞERLENDİRİLDİ",P.green,"rgba(34,197,94,.15)"]:["İTİRAZ VAR · değerlendiriliyor",P.amber,"rgba(234,179,8,.15)"]);return e.jsxs("div",{style:S.card,children:[
     e.jsxs("div",{style:S.chead,children:[e.jsxs("div",{children:[e.jsx("div",{style:S.nm,children:it.name}),e.jsx("div",{style:S.meta,children:it.club||"—"})]}),e.jsx("div",{style:S.kat,children:catName(it.cat)}),e.jsxs("div",{style:S.clk,children:["⏱ ",fmt(it.left)]})]}),
     o&&o.status!=="withdrawn"?e.jsxs(e.Fragment,{children:[e.jsxs("div",{style:{width:"100%",marginTop:".7rem",padding:".7rem",borderRadius:12,fontWeight:800,textAlign:"center",color:st[1],background:st[2],border:"1px solid "+st[1]},children:["⚖️ ",st[0],o.status==="accepted"&&o.yeni!=null?e.jsxs("div",{style:{marginTop:".35rem",fontSize:".88rem",fontWeight:800},children:["D ",Number(o.eski||0).toFixed(3)," → ",Number(o.yeni).toFixed(3),o.yeniToplam!=null?" · "+__T("Toplam")+" "+Number(o.eskiToplam||0).toFixed(3)+" → "+Number(o.yeniToplam).toFixed(3):""]}):null]}),o.status==="pending"?e.jsx("button",{style:{...S.itbtn,background:"transparent",color:P.ink2,border:"1.5px solid "+P.line,marginTop:".5rem"},disabled:busy,onClick:()=>withdraw(it),children:__T("↩ İtirazı Geri Çek")}):null]}):e.jsxs(e.Fragment,{children:[o&&o.status==="withdrawn"?e.jsx("div",{style:{marginTop:".6rem",fontSize:".8rem",fontWeight:700,color:P.muted,textAlign:"center"},children:__T("↩ İtiraz geri çekildi — süre içinde yeniden itiraz edilebilir")}):null,e.jsx("button",{style:S.itbtn,disabled:busy,onClick:()=>send(it),children:__T("⚖️ İtiraz Et")})]})
   ]},it.cat+"/"+it.ath)})
  ]})
 ]});
}
export{Itiraz as default};
