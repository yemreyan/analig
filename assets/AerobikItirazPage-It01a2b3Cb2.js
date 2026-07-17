import{b as usToast,a as usInit,j as e,d as db}from"./main-C2LpyYUGCb2.js";import{f as usParams,r as R}from"./vendor-react-Cxw6bqwhCb2.js";import{k as ref,l as get,o as onValue,v as fset}from"./vendor-firebase-940mxgRVCb2.js";import{v as verifyToken}from"./epanelToken-BoF3UjP2Cb2.js";import"./modulepreload-polyfill-B5Qt9EMXCb2.js";

const BASE="aerobik_yarismalar",WINDOW=6e5;// 10 dakika
const f2=v=>v==null||isNaN(v)?"—":Number(v).toFixed(2);
const f3=v=>v==null||isNaN(v)?"—":Number(v).toFixed(3);
function trimA(o){if(!o)return null;const v=["j1","j2","j3","j4"].map(k=>o[k]).filter(x=>x!=null&&!isNaN(x));if(!v.length)return null;if(v.length<2)return v[0];if(v.length===4){v.sort((x,y)=>x-y);return(v[1]+v[2])/2}return v.reduce((a,b)=>a+b,0)/v.length}
function calcE(o){if(!o)return null;const v=["j1","j2","j3","j4"].map(k=>o[k]).filter(x=>x!=null&&!isNaN(x));if(!v.length)return null;let m;if(v.length===4){const s=[...v].sort((x,y)=>x-y);m=(s[1]+s[2])/2}else m=v.reduce((a,b)=>a+b,0)/v.length;return 10-m}
const comps=sc=>{const d=sc.dScore!=null?sc.dScore:null,a=sc.aScore!=null?sc.aScore:trimA(sc.aPanel),ee=sc.eScore!=null?sc.eScore:calcE(sc.ePanel),fin=sc.finalScore!=null?sc.finalScore:(sc.sonuc!=null?sc.sonuc:null);return{d,a,e:ee,fin}};
const finishTs=sc=>{let t=sc.ustJuriOnay||0;if(sc.timestamp){const p=Date.parse(sc.timestamp);if(!isNaN(p))t=Math.max(t,p)}return t};
const TYPES=[["D","D — Zorluk","#8b5cf6"],["A","A — Artistik","#ec4899"],["E","E — İcra","#10b981"]];

function Itiraz(){
 const{toast}=usToast();usInit();
 const[sp]=usParams();
 const comp=sp.get("competitionId"),token=sp.get("token");
 const[authed,setAuthed]=R.useState(!1),[loading,setLoading]=R.useState(!0);
 const[pun,setPun]=R.useState({}),[spor,setSpor]=R.useState({}),[cats,setCats]=R.useState({}),[compName,setCompName]=R.useState("Yarışma"),[itr,setItr]=R.useState({});
 const[pick,setPick]=R.useState(""),[now,setNow]=R.useState(Date.now()),[busy,setBusy]=R.useState(!1);

 R.useEffect(()=>{const t=setInterval(()=>setNow(Date.now()),1e3);return()=>clearInterval(t)},[]);
 R.useEffect(()=>{if(!comp||!token){setLoading(!1),setAuthed(!1);return}get(ref(db,`${BASE}/${comp}/epanelToken`)).then(s=>{const v=s.val();setAuthed(v?verifyToken(token,v):!1)}).catch(()=>setAuthed(!1)).finally(()=>setLoading(!1))},[comp,token]);
 R.useEffect(()=>{if(!comp||!authed)return;const u1=onValue(ref(db,`${BASE}/${comp}/puanlar`),s=>setPun(s.val()||{}));const u2=onValue(ref(db,`${BASE}/${comp}/sporcular`),s=>setSpor(s.val()||{}));const u3=onValue(ref(db,`${BASE}/${comp}/kategoriler`),s=>setCats(s.val()||{}));const u4=onValue(ref(db,`${BASE}/${comp}/isim`),s=>setCompName(s.val()||"Yarışma"));const u5=onValue(ref(db,`${BASE}/${comp}/itirazlar`),s=>setItr(s.val()||{}));return()=>{u1(),u2(),u3(),u4(),u5()}},[comp,authed]);

 const catName=c=>cats[c]?.name||c;
 const nmeta=(cat,ath)=>{const i=(spor[cat]&&spor[cat][ath])||{};return{name:[i.ad,i.soyad].filter(Boolean).join(" ")||ath,club:i.il||i.okul||i.kulup||"",ad:i.ad||"",soyad:i.soyad||""}};

 const list=[];
 Object.entries(pun).forEach(([cat,aths])=>{if(!aths||typeof aths!="object")return;Object.entries(aths).forEach(([ath,sc])=>{if(!sc||typeof sc!="object")return;const done=sc.durum==="tamamlandi"||sc.kilitli===!0||sc.ustJuriOnay||sc.sonuc!=null;if(!done)return;const ft=finishTs(sc);if(!ft||now-ft>WINDOW)return;const m=nmeta(cat,ath);list.push({cat,ath,sc,C:comps(sc),name:m.name,club:m.club,ad:m.ad,soyad:m.soyad,ft,left:Math.max(0,WINDOW-(now-ft))})})});
 list.sort((a,b)=>b.ft-a.ft);

 const objOf=(cat,ath,ty)=>itr[`${cat}__${ath}__${ty}`];
 const send=async(it,ty)=>{if(busy)return;setBusy(!0);try{await fset(ref(db,`${BASE}/${comp}/itirazlar/${it.cat}__${it.ath}__${ty}`),{catId:it.cat,catName:catName(it.cat),athId:it.ath,athName:it.name,ad:it.ad,soyad:it.soyad,scoreType:ty,value:ty==="D"?it.C.d:ty==="A"?it.C.a:it.C.e,total:it.C.fin!=null?it.C.fin:null,ts:Date.now(),status:"pending"});toast(it.name+" — "+ty+" puanına itiraz gönderildi ✓","success");setPick("")}catch{toast("İtiraz gönderilemedi.","error")}setBusy(!1)};

 const fmt=ms=>{const s=Math.ceil(ms/1e3),m=Math.floor(s/60),ss=s%60;return m+":"+String(ss).padStart(2,"0")};
 const S={wrap:{minHeight:"100vh",background:"#0a0e1a",color:"#e8edf7",fontFamily:"'Plus Jakarta Sans',system-ui,sans-serif",paddingBottom:"2rem"},
  top:{position:"sticky",top:0,zIndex:10,background:"rgba(10,14,26,.92)",backdropFilter:"blur(10px)",borderBottom:"1px solid #2a3550",padding:".8rem 1.1rem",display:"flex",alignItems:"center",gap:"1rem",flexWrap:"wrap"},
  wrapIn:{maxWidth:820,margin:"0 auto",padding:"1rem"},
  card:{background:"#131a2b",border:"1px solid #2a3550",borderRadius:16,padding:"1rem 1.2rem",marginBottom:".9rem"},
  chead:{display:"flex",alignItems:"center",gap:".8rem",flexWrap:"wrap"},
  nm:{fontSize:"1.2rem",fontWeight:800},meta:{color:"#8b97b3",fontWeight:700,fontSize:".82rem"},
  kat:{background:"#1b2438",border:"1px solid #2a3550",borderRadius:999,padding:".3rem .8rem",fontWeight:800,fontSize:".8rem"},
  clk:{marginLeft:"auto",background:"rgba(234,179,8,.15)",color:"#fbbf24",borderRadius:10,padding:".35rem .8rem",fontWeight:800,fontSize:".85rem",whiteSpace:"nowrap"},
  mini:{display:"flex",gap:"1rem",flexWrap:"wrap",margin:".7rem 0",fontSize:".92rem",color:"#8b97b3",fontWeight:700},
  itbtn:{width:"100%",marginTop:".3rem",padding:".8rem",border:"none",borderRadius:12,fontWeight:800,fontSize:"1rem",cursor:"pointer",color:"#fff",background:"linear-gradient(135deg,#e11d48,#f43f5e)"},
  tyrow:{display:"flex",gap:".6rem",flexWrap:"wrap",marginTop:".6rem"},
  center:{maxWidth:560,margin:"3rem auto 0",textAlign:"center",color:"#8b97b3",fontWeight:700,padding:"2rem 1rem"}};

 if(!comp)return e.jsx("div",{style:S.wrap,children:e.jsx("div",{style:S.center,children:"Hatalı link."})});
 if(loading)return e.jsx("div",{style:S.wrap,children:e.jsx("div",{style:S.center,children:"Doğrulanıyor…"})});
 if(!authed)return e.jsx("div",{style:S.wrap,children:e.jsxs("div",{style:S.center,children:[e.jsx("h2",{children:"Yetkisiz Erişim"}),e.jsx("p",{children:"Geçersiz/süresi dolmuş bağlantı."})]})});

 return e.jsxs("div",{style:S.wrap,children:[
  e.jsxs("div",{style:S.top,children:[e.jsx("span",{className:"material-icons-round",style:{color:"#f43f5e"},children:"gavel"}),e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:".8rem",color:"#8b97b3",fontWeight:700},children:compName}),e.jsx("div",{style:{fontWeight:800,fontSize:"1.05rem"},children:"İTİRAZ EKRANI"})]}),e.jsxs("div",{style:{marginLeft:"auto",background:"rgba(244,63,94,.12)",color:"#fca5a5",fontWeight:800,padding:".4rem .9rem",borderRadius:999},children:[list.length," aktif sporcu"]})]}),
  e.jsxs("div",{style:S.wrapIn,children:[
   e.jsx("div",{style:{fontSize:".8rem",color:"#8b97b3",fontWeight:700,margin:"0 0 .8rem"},children:"Yarışması biten sporcular 10 dakika boyunca burada görünür. İtiraz için sporcunun yanındaki butona basıp itiraz edilen puanı (D/A/E) seçin."}),
   list.length===0?e.jsxs("div",{style:S.center,children:[e.jsx("div",{style:{fontSize:"2.4rem",marginBottom:".5rem"},children:"⏳"}),e.jsx("div",{children:"İtiraz penceresinde sporcu yok."}),e.jsx("p",{style:{marginTop:".4rem",fontSize:".85rem"},children:"Sporcu yarışıp puanı onaylandıktan sonra 10 dk boyunca burada listelenir."})]}):
   list.map(it=>{const open=pick===it.cat+"/"+it.ath;return e.jsxs("div",{style:S.card,children:[
     e.jsxs("div",{style:S.chead,children:[e.jsxs("div",{children:[e.jsx("div",{style:S.nm,children:it.name}),e.jsx("div",{style:S.meta,children:it.club||"—"})]}),e.jsx("div",{style:S.kat,children:catName(it.cat)}),e.jsxs("div",{style:S.clk,children:["⏱ ",fmt(it.left)]})]}),
     e.jsxs("div",{style:S.mini,children:[e.jsxs("span",{children:["D ",e.jsx("b",{style:{color:"#e8edf7"},children:f2(it.C.d)})]}),e.jsxs("span",{children:["A ",e.jsx("b",{style:{color:"#e8edf7"},children:f2(it.C.a)})]}),e.jsxs("span",{children:["E ",e.jsx("b",{style:{color:"#e8edf7"},children:f3(it.C.e)})]}),e.jsxs("span",{children:["Toplam ",e.jsx("b",{style:{color:"#fbbf24"},children:f3(it.C.fin)})]})]}),
     e.jsx("div",{style:{display:"flex",gap:".4rem",flexWrap:"wrap",marginBottom:open?".2rem":".4rem"},children:TYPES.map(([ty])=>{const o=objOf(it.cat,it.ath,ty);return o?e.jsxs("span",{style:{fontSize:".72rem",fontWeight:800,padding:".2rem .5rem",borderRadius:6,background:o.status==="resolved"?"rgba(34,197,94,.15)":"rgba(244,63,94,.15)",color:o.status==="resolved"?"#86efac":"#fca5a5"},children:[ty," itirazı ",o.status==="resolved"?"· değerlendirildi":"· gönderildi"]},ty):null})}),
     open?e.jsxs(e.Fragment,{children:[e.jsx("div",{style:{fontSize:".8rem",fontWeight:800,color:"#8b97b3",margin:".4rem 0 .1rem"},children:"Hangi puana itiraz?"}),e.jsx("div",{style:S.tyrow,children:TYPES.map(([ty,lbl,col])=>e.jsx("button",{disabled:busy,onClick:()=>send(it,ty),style:{flex:1,minWidth:100,padding:".75rem",border:"1px solid "+col,borderRadius:12,fontWeight:800,fontSize:".95rem",cursor:"pointer",color:"#fff",background:col},children:lbl},ty))}),e.jsx("button",{onClick:()=>setPick(""),style:{width:"100%",marginTop:".5rem",padding:".6rem",border:"1px solid #2a3550",borderRadius:10,fontWeight:800,cursor:"pointer",color:"#e8edf7",background:"#1b2438"},children:"Vazgeç"})]}):e.jsx("button",{style:S.itbtn,onClick:()=>setPick(it.cat+"/"+it.ath),children:"⚖️ İtiraz Et"})
   ]},it.cat+"/"+it.ath)})
  ]})
 ]});
}
export{Itiraz as default};
