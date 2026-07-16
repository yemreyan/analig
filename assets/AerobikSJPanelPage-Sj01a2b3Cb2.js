import{b as usToast,a as usInit,j as e,d as db}from"./main-C2LpyYUGCb2.js";import{f as usParams,r as R}from"./vendor-react-Cxw6bqwhCb2.js";import{k as ref,l as get,o as onValue,m as update}from"./vendor-firebase-940mxgRVCb2.js";import{v as verifyToken}from"./epanelToken-BoF3UjP2Cb2.js";import"./modulepreload-polyfill-B5Qt9EMXCb2.js";

const BASE="aerobik_yarismalar",GAP_LIMIT=.5;
function trimA(o){if(!o)return null;const v=["j1","j2","j3","j4"].map(k=>o[k]).filter(x=>x!=null&&!isNaN(x));if(!v.length)return null;if(v.length<2)return v[0];if(v.length===4){v.sort((x,y)=>x-y);return(v[1]+v[2])/2}return v.reduce((a,b)=>a+b,0)/v.length}
function calcE(o){if(!o)return null;const v=["j1","j2","j3","j4"].map(k=>o[k]).filter(x=>x!=null&&!isNaN(x));if(!v.length)return null;let m;if(v.length===4){const s=[...v].sort((x,y)=>x-y);m=(s[1]+s[2])/2}else m=v.reduce((a,b)=>a+b,0)/v.length;return 10-m}
const CFG={
 sja:{badge:"SJA",title:"Artistik",color:"#ec4899",letter:"a",label:"SJA Referans Notu (Artistik)",cmp:sc=>trimA(sc.aPanel),panelLabel:"A Panel Ort. (trimmed)"},
 sje:{badge:"SJE",title:"İcra",color:"#10b981",letter:"e",label:"SJE Referans Notu (İcra Puanı)",cmp:sc=>calcE(sc.ePanel),panelLabel:"E Panel Puanı (10 − kesinti)"},
 sjd:{badge:"SJD",title:"Zorluk",color:"#8b5cf6",letter:"d",label:"SJD Referans Notu (D Değeri)",cmp:sc=>sc.dPanel&&sc.dPanel.rawTotal!=null?sc.dPanel.rawTotal:(sc.dScore!=null?sc.dScore:null),panelLabel:"D Panel Ham Toplam"}
};
const f2=v=>v==null||isNaN(v)?"—":Number(v).toFixed(2);

function SJPanel(){
 const{toast}=usToast();usInit();
 const[sp]=usParams();
 const comp=sp.get("competitionId"),catId=sp.get("catId"),token=sp.get("token");
 const pt=sp.get("panelType")||"sja",cfg=CFG[pt]||CFG.sja;
 const allCat=catId==="__ALL__",catList=(catId||"").split(",");
 const[ea,setEa]=R.useState("");
 const[authed,setAuthed]=R.useState(!1),[loading,setLoading]=R.useState(!0);
 const[athId,setAthId]=R.useState(null),[ath,setAth]=R.useState(null);
 const[compName,setCompName]=R.useState("Yarışma"),[status,setStatus]=R.useState("waiting");
 const[note,setNote]=R.useState(""),[panelVal,setPanelVal]=R.useState(null),[sent,setSent]=R.useState(null),[called,setCalled]=R.useState(!1);

 R.useEffect(()=>{if(!comp||!token){setLoading(!1),setAuthed(!1);return}get(ref(db,`${BASE}/${comp}/epanelToken`)).then(s=>{const v=s.val();setAuthed(v?verifyToken(token,v):!1)}).catch(()=>setAuthed(!1)).finally(()=>setLoading(!1))},[comp,token]);

 R.useEffect(()=>{if(!comp||!catId||!authed)return;const un=onValue(ref(db,`${BASE}/${comp}/isim`),s=>setCompName(s.val()||"Yarışma"));const ua=onValue(ref(db,`${BASE}/${comp}/aktifSporcu`),s=>{const all=s.val()||{};let ac="",a=null;for(const k of Object.keys(all)){if((allCat||catList.includes(k))&&all[k]){ac=k;a=all[k];break}}setEa(ac);if(a&&typeof a=="object"&&a.id){setAthId(a.id),setAth({ad:a.ad||"",soyad:a.soyad||"",okul:a.okul||"",il:a.il||""})}else{setAthId(null),setAth(null),setStatus("waiting"),setNote(""),setPanelVal(null),setSent(null)}});return()=>{un(),ua()}},[comp,catId,authed]);

 R.useEffect(()=>{if(!comp||!ea||!athId||!authed)return;const u=onValue(ref(db,`${BASE}/${comp}/puanlar/${ea}/${athId}`),s=>{const sc=s.val()||{};setPanelVal(cfg.cmp(sc));setSent(sc.sjPanel&&sc.sjPanel[cfg.letter]||null);setStatus(st=>st==="waiting"?"scoring":st)});return()=>u()},[comp,ea,athId,authed,pt]);

 const gap=panelVal==null||note===""?null:Math.abs(parseFloat(note)-panelVal);
 const over=gap!=null&&gap>GAP_LIMIT;

 const submit=async()=>{
  if(!athId||note===""||panelVal==null)return;
  const val=parseFloat(note);if(isNaN(val)){toast("Geçersiz not. 0 veya üzeri girin.","error");return}
  try{
   await update(ref(db,`${BASE}/${comp}/puanlar/${ea}/${athId}/sjPanel`),{[cfg.letter]:{value:val,panelValue:panelVal,gap:gap,ts:Date.now()}});
   if(over){await update(ref(db,`${BASE}/${comp}/refereeCalls/${ea}/${athId}/${pt}`),{ts:Date.now(),fromRole:pt,gap:gap});setCalled(!0);setTimeout(()=>setCalled(!1),5e3);toast("Panel hakemleri uyarıldı ⚠️","success")}
   else toast("SJ notu kaydedildi ✓","success");
  }catch{toast("Hata oluştu. Tekrar deneyin.","error")}
 };

 const bump=d=>{const n=Math.max(0,Math.round(((parseFloat(note)||0)+d)*100)/100);setNote(String(n))};
 const S={wrap:{minHeight:"100vh",background:"#0a0e1a",color:"#e8edf7",fontFamily:"'Plus Jakarta Sans',system-ui,sans-serif",padding:"1rem"},
  card:{maxWidth:520,margin:"0 auto",background:"#131a2b",border:"1px solid #2a3550",borderRadius:16,padding:"1.2rem"},
  head:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"1rem"},
  badge:{background:cfg.color,color:"#fff",fontWeight:800,fontSize:"1rem",padding:".4rem .8rem",borderRadius:10},
  ath:{background:"#1b2438",border:"1px solid #2a3550",borderRadius:12,padding:".9rem 1.1rem",marginBottom:"1rem"},
  nm:{fontSize:"1.35rem",fontWeight:800},meta:{color:"#8b97b3",fontWeight:700,fontSize:".85rem",marginTop:".2rem"},
  row:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:".6rem 0",borderBottom:"1px solid #2a3550"},
  lbl:{color:"#8b97b3",fontWeight:700},val:{fontSize:"1.4rem",fontWeight:800},
  inlbl:{fontSize:".8rem",fontWeight:800,color:"#8b97b3",textTransform:"uppercase",letterSpacing:".04em",margin:".8rem 0 .4rem"},
  numw:{display:"flex",gap:".6rem",alignItems:"center"},
  nbtn:{width:56,height:56,border:"1px solid #2a3550",background:"#1b2438",color:"#e8edf7",borderRadius:12,fontSize:"1.6rem",fontWeight:800,cursor:"pointer"},
  ninp:{flex:1,textAlign:"center",fontSize:"2rem",fontWeight:800,background:"#1b2438",border:"1px solid #2a3550",borderRadius:12,color:"#e8edf7",padding:".5rem"},
  gap:pass=>({margin:"1rem 0",padding:"1rem",borderRadius:14,textAlign:"center",fontWeight:800,fontSize:"1.05rem",background:pass?"rgba(239,68,68,.14)":"rgba(34,197,94,.12)",border:"1px solid "+(pass?"rgba(239,68,68,.5)":"rgba(34,197,94,.4)"),color:pass?"#fca5a5":"#86efac"}),
  send:pass=>({width:"100%",display:"flex",alignItems:"center",justifyContent:"center",gap:".5rem",padding:"1rem",border:"none",borderRadius:14,fontWeight:800,fontSize:"1.05rem",cursor:"pointer",color:"#fff",background:pass?"linear-gradient(135deg,#f59e0b,#ef4444)":"linear-gradient(135deg,#6366f1,#818cf8)"}),
  center:{maxWidth:520,margin:"3rem auto 0",textAlign:"center",color:"#8b97b3",fontWeight:700,padding:"2rem 1rem"},
  banner:{position:"fixed",top:0,left:0,right:0,zIndex:9999,background:"linear-gradient(90deg,#f59e0b,#ef4444)",color:"#fff",padding:"1rem",textAlign:"center",fontWeight:800,fontSize:"1.2rem"}};

 if(!comp||!catId)return e.jsx("div",{style:S.wrap,children:e.jsxs("div",{style:S.center,children:[e.jsx("h2",{children:"Hatalı Link"}),e.jsx("p",{children:"Lütfen Başhakeminizden tam linke tıklayın."})]})});
 if(loading)return e.jsx("div",{style:S.wrap,children:e.jsx("div",{style:S.center,children:"Doğrulanıyor…"})});
 if(!authed)return e.jsx("div",{style:S.wrap,children:e.jsxs("div",{style:S.center,children:[e.jsx("h2",{children:"Yetkisiz Erişim"}),e.jsx("p",{children:"Bu bağlantı geçersiz veya süresi dolmuş."})]})});

 return e.jsxs("div",{style:S.wrap,children:[
  called&&e.jsx("div",{style:S.banner,children:"⚠️ Panel hakemleri uyarıldı — SJ Paneline"}),
  e.jsxs("div",{style:S.card,children:[
   e.jsxs("div",{style:S.head,children:[e.jsxs("div",{children:[e.jsx("div",{style:{color:"#8b97b3",fontSize:".8rem",fontWeight:700},children:compName}),e.jsxs("div",{style:{fontSize:"1.1rem",fontWeight:800},children:["SÜPER JÜRİ — ",cfg.title]})]}),e.jsx("div",{style:S.badge,children:cfg.badge})]}),
   status==="waiting"||!ath?e.jsxs("div",{style:S.center,children:[e.jsx("div",{style:{fontSize:"2rem",marginBottom:".5rem"},children:"⏳"}),e.jsx("div",{children:"Sporcu bekleniyor…"}),e.jsx("p",{style:{marginTop:".4rem",fontSize:".85rem"},children:"Başhakem sporcu çağırınca ekranınız açılır."})]}):e.jsxs("div",{children:[
    e.jsxs("div",{style:S.ath,children:[e.jsxs("div",{style:S.nm,children:[ath.ad," ",ath.soyad]}),e.jsx("div",{style:S.meta,children:(ath.il||"")+(ath.il&&(ath.okul)?" · ":"")+(ath.okul||(ath.il?"":"—"))})]}),
    e.jsxs("div",{style:S.row,children:[e.jsx("span",{style:S.lbl,children:cfg.panelLabel}),e.jsx("span",{style:S.val,children:f2(panelVal)})]}),
    e.jsx("div",{style:S.inlbl,children:cfg.label}),
    e.jsxs("div",{style:S.numw,children:[e.jsx("button",{style:S.nbtn,onClick:()=>bump(-.1),children:"−"}),e.jsx("input",{style:S.ninp,type:"number",step:"0.1",min:"0",value:note,placeholder:"0.0",onChange:ev=>setNote(ev.target.value)}),e.jsx("button",{style:S.nbtn,onClick:()=>bump(.1),children:"+"})]}),
    e.jsx("div",{style:S.gap(over),children:panelVal==null?"Panel puanı bekleniyor… (A/E/D hakemi henüz puan girmedi)":note===""?"Referans notunuzu girin — fark otomatik hesaplanır":over?`⚠️ FARK ${f2(gap)} > ${GAP_LIMIT.toFixed(1)} — Panel uyarılmalı`:`Fark ${f2(gap)} ≤ ${GAP_LIMIT.toFixed(1)} — uyumlu`}),
    e.jsxs("button",{style:S.send(over),onClick:submit,disabled:panelVal==null,children:[e.jsx("span",{children:over?"📢":"💾"}),over?"Panel Hakemlerini Uyar & Kaydet":"SJ Notunu Kaydet"]}),
    sent&&e.jsxs("div",{style:{marginTop:".8rem",fontSize:".8rem",color:"#8b97b3",textAlign:"center"},children:["Son gönderilen: ",f2(sent.value)," (fark ",f2(sent.gap),")"]}),
    e.jsx("div",{style:{marginTop:".8rem",fontSize:".78rem",color:"#8b97b3",textAlign:"center"},children:"SJ notunuz final puanı etkilemez. Fark 0.5'i aşarsa panel ekranında \"SJ PANELİNE GİDİNİZ\" uyarısı belirir."})
   ]})
  ]})
 ]});
}
export{SJPanel as default};
