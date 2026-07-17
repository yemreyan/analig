import{b as usToast,a as usInit,j as e,d as db}from"./main-C2LpyYUGCb2.js";import{r as R}from"./vendor-react-Cxw6bqwhCb2.js";import{k as ref,l as get,m as update}from"./vendor-firebase-940mxgRVCb2.js";import{A as V}from"./aerobikCriteriaDefaults-ld4mBtrICb2.js";import"./modulepreload-polyfill-B5Qt9EMXCb2.js";

const BASE="aerobik_yarismalar",TOP=8;
const f3=v=>v==null||isNaN(v)?"—":Number(v).toFixed(3);
const isFinal=c=>/^final_/.test(c);
const cfg=c=>V[c]||V[String(c||"").replace(/^final_/,"")]||{};
const isTeam=c=>{const d=cfg(c);return d.tip==="takim"||d.tip==="karma"||d.athleteCount>1||d.group==="Step Aerobik"};
const scoreOf=sc=>{const v=sc&&(sc.finalScore!=null?sc.finalScore:(sc.sonuc!=null?sc.sonuc:null));return v==null||isNaN(v)?null:Number(v)};

function Finals(){
 const{toast}=usToast();usInit();
 const[comps,setComps]=R.useState({}),[comp,setComp]=R.useState(""),[busy,setBusy]=R.useState(!1),[log,setLog]=R.useState(null),[loading,setLoading]=R.useState(!0);

 const reload=()=>get(ref(db,BASE)).then(s=>setComps(s.val()||{})).finally(()=>setLoading(!1));
 R.useEffect(()=>{reload()},[]);

 const C=comps[comp]||{},cats=C.kategoriler||{},spor=C.sporcular||{},pun=C.puanlar||{};
 const realCats=Object.keys(cats).filter(c=>!isFinal(c)).sort();
 const finalCats=Object.keys(cats).filter(isFinal);
 const catLabel=c=>cats[c]?.name||cfg(c).label||c;

 const rankCat=cat=>{const aths=pun[cat]||{};return Object.entries(aths).map(([id,sc])=>({id,sc,score:scoreOf(sc)})).filter(r=>r.score!=null).sort((a,b)=>b.score-a.score).slice(0,TOP)};
 const teamMembers=(cat,key)=>{const parts=String(key).split("::"),gn=parts[parts.length-1],ok=parts.length>=3?parts.slice(1,-1).join("::"):"";const cm=spor[cat]||{};return Object.entries(cm).filter(([,m])=>m&&String(m.grupNo??m.cikisSirasi??"")===String(gn)&&(ok===""||String(m.okul||m.kulup||"")===ok))};
 const nameOfEntry=(cat,id)=>{const team=isTeam(cat);if(team){const mem=teamMembers(cat,id);return mem.map(([,m])=>[m.ad,m.soyad].filter(Boolean).join(" ")).filter(Boolean).join(", ")||id}const m=spor[cat]?.[id]||{};return[m.ad,m.soyad].filter(Boolean).join(" ")||id};

 const generate=async()=>{
  if(busy||!comp)return;setBusy(!0);setLog(null);
  const upd={},summary=[];
  realCats.forEach(cat=>{const top=rankCat(cat);if(!top.length)return;const fcat="final_"+cat,team=isTeam(cat),newSpor={},names=[];
    top.forEach((row,ix)=>{const rank=ix+1;
      if(team){teamMembers(cat,row.id).forEach(([mid,md])=>{newSpor[mid]={...md,cikisSirasi:rank,grupNo:md.grupNo??md.cikisSirasi??rank,_finalRank:rank}})}
      else{const md=spor[cat]?.[row.id]||{};newSpor[row.id]={...md,cikisSirasi:rank,_finalRank:rank}}
      names.push({rank,name:nameOfEntry(cat,row.id),score:row.score});});
    upd[`kategoriler/${fcat}`]={name:"🏆 Final — "+catLabel(cat),final:!0,baseCat:cat,tip:cfg(cat).tip||"ferdi",olusturma:Date.now()};
    upd[`sporcular/${fcat}`]=newSpor;upd[`puanlar/${fcat}`]=null;
    summary.push({cat,fcat,label:catLabel(cat),team,names});});
  if(!Object.keys(upd).length){toast("Sıralanacak (puanı girilmiş) sporcu bulunamadı.","warning");setBusy(!1);return}
  try{await update(ref(db,`${BASE}/${comp}`),upd);await reload();setLog(summary);toast("Finaller oluşturuldu ✓ — Puanlama ekranında görünür.","success")}catch{toast("Hata oluştu.","error")}
  setBusy(!1);
 };
 const clearFinals=async()=>{
  if(busy||!comp)return;setBusy(!0);setLog(null);const upd={},keys=new Set();
  [Object.keys(cats),Object.keys(spor),Object.keys(pun)].forEach(a=>a.forEach(c=>{if(isFinal(c))keys.add(c)}));
  if(!keys.size){toast("Silinecek final kategorisi yok.","warning");setBusy(!1);return}
  keys.forEach(fc=>{upd[`kategoriler/${fc}`]=null;upd[`sporcular/${fc}`]=null;upd[`puanlar/${fc}`]=null});
  try{await update(ref(db,`${BASE}/${comp}`),upd);await reload();toast(keys.size+" final kategorisi silindi.","success")}catch{toast("Hata oluştu.","error")}
  setBusy(!1);
 };

 const S={wrap:{minHeight:"100vh",background:"#0a0e1a",color:"#e8edf7",fontFamily:"'Plus Jakarta Sans',system-ui,sans-serif",paddingBottom:"3rem"},
  top:{position:"sticky",top:0,zIndex:10,background:"rgba(10,14,26,.92)",backdropFilter:"blur(10px)",borderBottom:"1px solid #2a3550",padding:".9rem 1.1rem",display:"flex",alignItems:"center",gap:".8rem"},
  in:{maxWidth:820,margin:"0 auto",padding:"1rem"},
  sel:{width:"100%",padding:".65rem .8rem",borderRadius:10,border:"1px solid #2a3550",background:"#131a2b",color:"#e8edf7",fontWeight:700,fontSize:".95rem",marginBottom:"1rem"},
  card:{background:"#131a2b",border:"1px solid #2a3550",borderRadius:14,padding:".8rem 1rem",marginBottom:".6rem",display:"flex",alignItems:"center",gap:".7rem",flexWrap:"wrap"},
  badge:{fontSize:".7rem",fontWeight:800,padding:".2rem .5rem",borderRadius:6},
  btn:{padding:".85rem 1.1rem",border:"none",borderRadius:12,fontWeight:800,fontSize:"1rem",cursor:"pointer",color:"#fff"},
  center:{maxWidth:560,margin:"3rem auto 0",textAlign:"center",color:"#8b97b3",fontWeight:700,padding:"2rem 1rem"}};

 return e.jsxs("div",{style:S.wrap,children:[
  e.jsxs("div",{style:S.top,children:[e.jsx("span",{className:"material-icons-round",style:{color:"#fbbf24"},children:"emoji_events"}),e.jsx("div",{style:{fontWeight:800,fontSize:"1.05rem"},children:"Aerobik — Finaller"})]}),
  e.jsxs("div",{style:S.in,children:[
   e.jsx("div",{style:{fontSize:".85rem",color:"#8b97b3",fontWeight:700,margin:"0 0 .8rem"},children:"Her kategoride (bireysel + grup/çift) puana göre ilk 8 sporcuyu alıp, aynı yarışma altında \"🏆 Final — …\" kategorileri oluşturur. Bu kategoriler puanlama ekranında normal kategoriler gibi çağrılıp puanlanır."}),
   loading?e.jsx("div",{style:S.center,children:"Yükleniyor…"}):e.jsxs(e.Fragment,{children:[
    e.jsxs("select",{style:S.sel,value:comp,onChange:x=>{setComp(x.target.value);setLog(null)},children:[e.jsx("option",{value:"",children:"— Yarışma seçin —"}),Object.entries(comps).map(([id,c])=>e.jsx("option",{value:id,children:c.isim||c.ad||id},id))]}),
    comp?e.jsxs(e.Fragment,{children:[
     realCats.length===0?e.jsx("div",{style:S.center,children:"Bu yarışmada kategori yok."}):
     realCats.map(cat=>{const top=rankCat(cat),fc="final_"+cat,has=!!cats[fc];return e.jsxs("div",{style:S.card,children:[
       e.jsxs("div",{style:{flex:1,minWidth:0},children:[e.jsxs("div",{style:{fontWeight:800},children:[catLabel(cat),isTeam(cat)?e.jsx("span",{style:{...S.badge,marginLeft:".4rem",background:"rgba(8,145,178,.2)",color:"#67e8f9"},children:"GRUP/ÇİFT"}):null]}),e.jsxs("div",{style:{color:"#8b97b3",fontSize:".8rem",fontWeight:700},children:[top.length>0?top.length+" sporcu sıralanacak (ilk "+TOP+")":"puanı girilmiş sporcu yok"]})]}),
       has?e.jsx("span",{style:{...S.badge,background:"rgba(34,197,94,.18)",color:"#86efac"},children:"✓ FİNAL VAR"}):null
     ]},cat)}),
     e.jsxs("div",{style:{display:"flex",gap:".6rem",flexWrap:"wrap",marginTop:"1rem"},children:[
       e.jsx("button",{style:{...S.btn,background:"linear-gradient(135deg,#f59e0b,#ef4444)",flex:1,minWidth:200},disabled:busy,onClick:generate,children:busy?"İşleniyor…":"🏆 Finalleri Oluştur (her kategoride ilk "+TOP+")"}),
       finalCats.length>0?e.jsx("button",{style:{...S.btn,background:"#1b2438",border:"1px solid #ef4444",color:"#fca5a5"},disabled:busy,onClick:clearFinals,children:"Finalleri Sil"}):null
     ]}),
     log?e.jsxs("div",{style:{marginTop:"1.2rem"},children:[e.jsx("div",{style:{fontWeight:800,color:"#86efac",marginBottom:".5rem"},children:"✓ Oluşturulan finaller"}),log.map(g=>e.jsxs("div",{style:{...S.card,display:"block"},children:[e.jsxs("div",{style:{fontWeight:800,marginBottom:".4rem"},children:["🏆 Final — ",g.label,g.team?" (grup/çift)":""]}),e.jsx("div",{style:{display:"grid",gap:".2rem"},children:g.names.map(n=>e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontSize:".85rem",fontWeight:700},children:[e.jsxs("span",{children:[e.jsxs("b",{style:{color:"#fbbf24"},children:[n.rank,". "]}),n.name]}),e.jsx("span",{style:{color:"#8b97b3"},children:f3(n.score)})]},n.rank))})]},g.fcat))]}):null
    ]}):null
   ]})
  ]})
 ]});
}
export{Finals as default};
