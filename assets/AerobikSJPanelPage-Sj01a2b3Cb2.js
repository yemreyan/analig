import{b as usToast,a as usInit,j as e,d as db}from"./main-C2LpyYUGCb2.js";import{f as usParams,r as R}from"./vendor-react-Cxw6bqwhCb2.js";import{k as ref,l as get,o as onValue,m as update,v as fset}from"./vendor-firebase-940mxgRVCb2.js";import{v as verifyToken}from"./epanelToken-BoF3UjP2Cb2.js";import"./modulepreload-polyfill-B5Qt9EMXCb2.js";

const BASE="aerobik_yarismalar",GAP_LIMIT=.5;
function trimA(o){if(!o)return null;const v=["j1","j2","j3","j4"].map(k=>o[k]).filter(x=>x!=null&&!isNaN(x));if(!v.length)return null;if(v.length<2)return v[0];if(v.length===4){v.sort((x,y)=>x-y);return(v[1]+v[2])/2}return v.reduce((a,b)=>a+b,0)/v.length}
function calcE(o){if(!o)return null;const v=["j1","j2","j3","j4"].map(k=>o[k]).filter(x=>x!=null&&!isNaN(x));if(!v.length)return null;let m;if(v.length===4){const s=[...v].sort((x,y)=>x-y);m=(s[1]+s[2])/2}else m=v.reduce((a,b)=>a+b,0)/v.length;return 10-m}
function trimDed(o){const e=calcE(o);return e==null?null:Math.round((10-e)*100)/100}
const f2=v=>v==null||isNaN(v)?"—":Number(v).toFixed(2);
const CFG={
 sja:{badge:"SJA",title:"Artistik",color:"#ec4899",letter:"a",label:"SJA Referans Notu (Artistik)",avg:sc=>trimA(sc.aPanel),avgLabel:"A Panel Ort. (trimmed)",judges:sc=>{const o=sc.aPanel||{};return[["A1","a1",o.j1],["A2","a2",o.j2],["A3","a3",o.j3],["A4","a4",o.j4]]}},
 sje:{badge:"SJE",title:"İcra",color:"#10b981",letter:"e",label:"SJE Referans Kesintisi (İcra)",avg:sc=>trimDed(sc.ePanel),avgLabel:"E Panel Kesinti Ort.",judges:sc=>{const o=sc.ePanel||{};return[["E1","e1",o.j1],["E2","e2",o.j2],["E3","e3",o.j3],["E4","e4",o.j4]]}},
 sjd:{badge:"SJD",title:"Zorluk",color:"#8b5cf6",letter:"d",label:"SJD Referans (D Değeri)",avg:sc=>sc.dPanel&&sc.dPanel.rawTotal!=null?sc.dPanel.rawTotal:(sc.dScore!=null?sc.dScore:null),avgLabel:"D Panel Ham Toplam",judges:sc=>[["D Hakemi","d",sc.dPanel&&sc.dPanel.rawTotal!=null?sc.dPanel.rawTotal:(sc.dScore!=null?sc.dScore:null)]]}
};

function SJPanel(){
 const{toast}=usToast();usInit();
 const[sp]=usParams();
 const comp=sp.get("competitionId"),catId=sp.get("catId"),token=sp.get("token");
 const pt=sp.get("panelType")||"sja",cfg=CFG[pt]||CFG.sja;
 const allCat=catId==="__ALL__",catList=(catId||"").split(",");
 const[ea,setEa]=R.useState("");
 const[authed,setAuthed]=R.useState(!1),[loading,setLoading]=R.useState(!0);
 const[athId,setAthId]=R.useState(null),[ath,setAth]=R.useState(null);
 const[compName,setCompName]=R.useState("Yarışma"),[hasAth,setHasAth]=R.useState(!1);
 const[note,setNote]=R.useState(""),[score,setScore]=R.useState({}),[sent,setSent]=R.useState(null),[warned,setWarned]=R.useState({});

 R.useEffect(()=>{if(!comp||!token){setLoading(!1),setAuthed(!1);return}get(ref(db,`${BASE}/${comp}/epanelToken`)).then(s=>{const v=s.val();setAuthed(v?verifyToken(token,v):!1)}).catch(()=>setAuthed(!1)).finally(()=>setLoading(!1))},[comp,token]);

 R.useEffect(()=>{if(!comp||!catId||!authed)return;const un=onValue(ref(db,`${BASE}/${comp}/isim`),s=>setCompName(s.val()||"Yarışma"));const ua=onValue(ref(db,`${BASE}/${comp}/aktifSporcu`),s=>{const all=s.val()||{};let ac="",a=null,bt=-1;for(const k of Object.keys(all)){if((allCat||catList.includes(k))&&all[k]&&(all[k].ts||0)>=bt){bt=all[k].ts||0;ac=k;a=all[k]}}if(!a)return;setEa(ac);if(typeof a=="object"&&a.id){setAthId(a.id),setAth({ad:a.ad||"",soyad:a.soyad||"",okul:a.okul||"",il:a.il||""}),setHasAth(!0)}else{setAthId(null),setAth(null),setHasAth(!1)}});return()=>{un(),ua()}},[comp,catId,authed]);

 R.useEffect(()=>{if(!comp||!ea||!athId||!authed){return}setNote(""),setWarned({});const u=onValue(ref(db,`${BASE}/${comp}/puanlar/${ea}/${athId}`),s=>{const sc=s.val()||{};setScore(sc);setSent(sc.sjPanel&&sc.sjPanel[cfg.letter]||null)});return()=>u()},[comp,ea,athId,authed,pt]);

 const avg=cfg.avg(score),judges=cfg.judges(score);
 const myNote=note===""?null:parseFloat(note);
 const gap=avg==null||myNote==null?null:Math.abs(myNote-avg);

 const save=async()=>{if(!athId||note===""){toast("Önce referans notunuzu girin.","error");return}const val=parseFloat(note);if(isNaN(val)){toast("Geçersiz not.","error");return}try{await update(ref(db,`${BASE}/${comp}/puanlar/${ea}/${athId}/sjPanel`),{[cfg.letter]:{value:val,panelValue:avg,gap:gap,ts:Date.now()}});toast("SJ notu kaydedildi ✓","success")}catch{toast("Hata oluştu.","error")}};
 const warn=async(target,lbl)=>{if(!athId){return}try{await fset(ref(db,`${BASE}/${comp}/refereeCalls/${ea}/${athId}/${target}`),{ts:Date.now(),fromRole:pt});setWarned(w=>({...w,[target]:Date.now()}));setTimeout(()=>setWarned(w=>{const n={...w};delete n[target];return n}),3e3);toast(lbl+" uyarıldı ⚠️","success")}catch{toast("Uyarı gönderilemedi.","error")}};
 const warnAll=()=>warn(pt,"Tüm panel");

 const bump=d=>{const n=Math.max(0,Math.round(((parseFloat(note)||0)+d)*100)/100);setNote(String(n))};
 const S={wrap:{minHeight:"100vh",background:"#0a0e1a",color:"#e8edf7",fontFamily:"'Plus Jakarta Sans',system-ui,sans-serif",padding:"1rem"},
  card:{maxWidth:560,margin:"0 auto",background:"#131a2b",border:"1px solid #2a3550",borderRadius:16,padding:"1.2rem"},
  head:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"1rem"},
  badge:{background:cfg.color,color:"#fff",fontWeight:800,fontSize:"1rem",padding:".4rem .8rem",borderRadius:10},
  ath:{background:"#1b2438",border:"1px solid #2a3550",borderRadius:12,padding:".9rem 1.1rem",marginBottom:"1rem"},
  nm:{fontSize:"1.35rem",fontWeight:800},meta:{color:"#8b97b3",fontWeight:700,fontSize:".85rem",marginTop:".2rem"},
  inlbl:{fontSize:".8rem",fontWeight:800,color:"#8b97b3",textTransform:"uppercase",letterSpacing:".04em",margin:".2rem 0 .4rem"},
  numw:{display:"flex",gap:".6rem",alignItems:"center"},
  nbtn:{width:56,height:56,border:"1px solid #2a3550",background:"#1b2438",color:"#e8edf7",borderRadius:12,fontSize:"1.6rem",fontWeight:800,cursor:"pointer"},
  ninp:{flex:1,textAlign:"center",fontSize:"2rem",fontWeight:800,background:"#1b2438",border:"1px solid #2a3550",borderRadius:12,color:"#e8edf7",padding:".5rem"},
  save:{width:"100%",padding:".9rem",border:"none",borderRadius:12,fontWeight:800,fontSize:"1.05rem",cursor:"pointer",color:"#fff",background:"linear-gradient(135deg,#6366f1,#818cf8)",marginTop:".7rem"},
  jgrid:{display:"grid",gridTemplateColumns:pt==="sjd"?"1fr":"repeat(2,1fr)",gap:".6rem",marginTop:".3rem"},
  center:{maxWidth:560,margin:"3rem auto 0",textAlign:"center",color:"#8b97b3",fontWeight:700,padding:"2rem 1rem"}};

 if(!comp||!catId)return e.jsx("div",{style:S.wrap,children:e.jsxs("div",{style:S.center,children:[e.jsx("h2",{children:"Hatalı Link"}),e.jsx("p",{children:"Lütfen Başhakeminizden tam linke tıklayın."})]})});
 if(loading)return e.jsx("div",{style:S.wrap,children:e.jsx("div",{style:S.center,children:"Doğrulanıyor…"})});
 if(!authed)return e.jsx("div",{style:S.wrap,children:e.jsxs("div",{style:S.center,children:[e.jsx("h2",{children:"Yetkisiz Erişim"}),e.jsx("p",{children:"Bu bağlantı geçersiz veya süresi dolmuş."})]})});

 return e.jsx("div",{style:S.wrap,children:e.jsxs("div",{style:S.card,children:[
  e.jsxs("div",{style:S.head,children:[e.jsxs("div",{children:[e.jsx("div",{style:{color:"#8b97b3",fontSize:".8rem",fontWeight:700},children:compName}),e.jsxs("div",{style:{fontSize:"1.1rem",fontWeight:800},children:["SÜPER JÜRİ — ",cfg.title]})]}),e.jsx("div",{style:S.badge,children:cfg.badge})]}),
  !hasAth||!ath?e.jsxs("div",{style:S.center,children:[e.jsx("div",{style:{fontSize:"2rem",marginBottom:".5rem"},children:"⏳"}),e.jsx("div",{children:"Sporcu bekleniyor…"}),e.jsx("p",{style:{marginTop:".4rem",fontSize:".85rem"},children:"Başhakem sporcu çağırınca ekranınız açılır."})]}):e.jsxs("div",{children:[
   e.jsxs("div",{style:S.ath,children:[e.jsxs("div",{style:S.nm,children:[ath.ad," ",ath.soyad]}),e.jsx("div",{style:S.meta,children:(ath.il||"")+(ath.il&&ath.okul?" · ":"")+(ath.okul||(ath.il?"":"—"))})]}),
   e.jsx("div",{style:S.inlbl,children:cfg.label+"  (panelleri beklemeden girebilirsiniz)"}),
   e.jsxs("div",{style:S.numw,children:[e.jsx("button",{style:S.nbtn,onClick:()=>bump(-.1),children:"−"}),e.jsx("input",{style:S.ninp,type:"number",step:"0.1",min:"0",value:note,placeholder:"0.0",onChange:ev=>setNote(ev.target.value)}),e.jsx("button",{style:S.nbtn,onClick:()=>bump(.1),children:"+"})]}),
   e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",margin:".7rem 0 .2rem",fontSize:".85rem",color:"#8b97b3",fontWeight:700},children:[e.jsxs("span",{children:[cfg.avgLabel,": ",e.jsx("strong",{style:{color:"#e8edf7"},children:f2(avg)})]}),gap!=null&&e.jsxs("span",{style:{color:gap>GAP_LIMIT?"#fca5a5":"#86efac",fontWeight:800},children:["fark ",f2(gap)]})]}),
   e.jsx("button",{style:S.save,onClick:save,children:"💾 SJ Notunu Kaydet"}),
   e.jsxs("div",{style:{...S.inlbl,marginTop:"1rem"},children:["Hakem Notları — uyarı için nota dokunun"]}),
   e.jsx("div",{style:S.jgrid,children:judges.map(([lbl,target,jn])=>{const diff=myNote==null||jn==null?null:Math.abs(myNote-jn),hi=diff!=null&&diff>GAP_LIMIT,wd=warned[target];return e.jsxs("button",{onClick:()=>warn(target,lbl),style:{textAlign:"left",padding:".7rem .8rem",borderRadius:12,cursor:"pointer",border:"1px solid "+(wd?"#f59e0b":hi?"#ef4444":"#2a3550"),background:wd?"rgba(245,158,11,.18)":hi?"rgba(239,68,68,.12)":"#1b2438",color:"#e8edf7"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsx("span",{style:{fontWeight:800},children:lbl}),e.jsx("span",{style:{fontSize:"1.3rem",fontWeight:800},children:f2(jn)})]}),e.jsx("div",{style:{fontSize:".72rem",fontWeight:700,marginTop:".25rem",color:wd?"#fbbf24":hi?"#fca5a5":"#8b97b3"},children:wd?"⚠️ uyarıldı":diff==null?"dokun → uyar":(hi?"fark "+f2(diff)+" — dokun/uyar":"fark "+f2(diff))})]},target)})}),
   e.jsx("button",{style:{...S.save,background:"linear-gradient(135deg,#f59e0b,#ef4444)",marginTop:".7rem"},onClick:warnAll,children:"📢 Tüm Panel Hakemlerini Uyar"}),
   sent&&e.jsxs("div",{style:{marginTop:".8rem",fontSize:".8rem",color:"#8b97b3",textAlign:"center"},children:["Kayıtlı SJ notu: ",f2(sent.value)," (fark ",f2(sent.gap),")"]}),
   e.jsx("div",{style:{marginTop:".7rem",fontSize:".76rem",color:"#8b97b3",textAlign:"center"},children:"SJ notunuz final puanı etkilemez. Uyarı gönderince ilgili hakemin ekranı kırmızı yanıp söner. Kaydetme fark büyük olsa da çalışır."})
  ]})
 ]})});
}
export{SJPanel as default};
