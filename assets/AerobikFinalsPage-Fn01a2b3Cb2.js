import{b as usToast,a as usInit,j as e,d as db}from"./main-C2LpyYUGCb2.js";import{r as R}from"./vendor-react-Cxw6bqwhCb2.js";import{k as ref,l as get,m as update}from"./vendor-firebase-940mxgRVCb2.js";import{A as V}from"./aerobikCriteriaDefaults-ld4mBtrICb2.js";import"./modulepreload-polyfill-B5Qt9EMXCb2.js";

const BASE="aerobik_yarismalar",TOP=8,RES=2,TAKE=TOP+RES;
const f3=v=>v==null||isNaN(v)?"—":Number(v).toFixed(3);
const isFinal=c=>/^final_/.test(c);
const cfg=c=>V[c]||V[String(c||"").replace(/^final_/,"")]||{};
const isTeam=c=>{const d=cfg(c);return d.tip==="takim"||d.tip==="karma"||d.athleteCount>1||d.group==="Step Aerobik"};
const scoreOf=sc=>{const v=sc&&(sc.finalScore!=null?sc.finalScore:(sc.sonuc!=null?sc.sonuc:null));return v==null||isNaN(v)?null:Number(v)};
const We=s=>(s||"").trim().replace(/[.#$[\]/]/g,"-").slice(0,60);

function Finals(){
 const{toast}=usToast();usInit();
 const[comps,setComps]=R.useState({}),[comp,setComp]=R.useState(""),[busy,setBusy]=R.useState(!1),[log,setLog]=R.useState(null),[loading,setLoading]=R.useState(!0),[tmpl,setTmpl]=R.useState({}),[texp,setTexp]=R.useState(!0),[expanded,setExpanded]=R.useState({});

 const reload=()=>get(ref(db,BASE)).then(s=>setComps(s.val()||{})).finally(()=>setLoading(!1));
 R.useEffect(()=>{reload()},[]);

 const C=comps[comp]||{},cats=C.kategoriler||{},spor=C.sporcular||{},pun=C.puanlar||{};
 const realCats=Object.keys(cats).filter(c=>!isFinal(c)).sort();
 const finalCats=Object.keys(cats).filter(isFinal);
 const catLabel=c=>cats[c]?.name||cfg(c).label||c;

 const rankCat=cat=>{const aths=pun[cat]||{};return Object.entries(aths).map(([id,sc])=>({id,sc,score:scoreOf(sc)})).filter(r=>r.score!=null).sort((a,b)=>b.score-a.score).slice(0,TAKE)};
 const teamMembers=(cat,key)=>{const parts=String(key).split("::"),gn=parts[parts.length-1],ok=parts.length>=3?parts.slice(1,-1).join("::"):"";const cm=spor[cat]||{};return Object.entries(cm).filter(([,m])=>m&&String(m.grupNo??m.cikisSirasi??"")===String(gn)&&(ok===""||String(m.okul||m.kulup||"")===ok))};
 const nameOfEntry=(cat,id)=>{const team=isTeam(cat);if(team){const mem=teamMembers(cat,id);return mem.map(([,m])=>[m.ad,m.soyad].filter(Boolean).join(" ")).filter(Boolean).join(", ")||id}const m=spor[cat]?.[id]||{};return[m.ad,m.soyad].filter(Boolean).join(" ")||id};

 // Cikis sirasi sablonu: eleme sirasi(rank) -> cikis numarasi. Tum kategorilere ayni uygulanir.
 const tmplCs=rank=>{const v=tmpl[rank];return v!=null&&v!==""?Number(v):rank};
 const csOf=rank=>rank>TOP?rank:tmplCs(rank); // yedekler sabit 9/10
 const usedVals=Array.from({length:TOP},(_,i)=>tmplCs(i+1));
 const dupWarn=new Set(usedVals).size!==usedVals.length;
 const anyCat=realCats.some(c=>rankCat(c).length>0);

 const generate=async()=>{
  if(busy||!comp)return;setBusy(!0);setLog(null);
  const upd={},summary=[];
  realCats.forEach(cat=>{const top=rankCat(cat);if(!top.length)return;const fcat="final_"+cat,team=isTeam(cat),newSpor={},names=[];
    top.forEach((row,ix)=>{const rank=ix+1,reserve=rank>TOP,yed=reserve?"R"+(rank-TOP):null,cs=csOf(rank),ex=reserve?{_yedek:yed}:{};
      if(team){teamMembers(cat,row.id).forEach(([mid,md])=>{newSpor[mid]={...md,cikisSirasi:cs,grupNo:md.grupNo??md.cikisSirasi??cs,_finalRank:rank,...ex}})}
      else{const md=spor[cat]?.[row.id]||{};newSpor[row.id]={...md,cikisSirasi:cs,_finalRank:rank,...ex}}
      names.push({rank,cs,reserve,yed,name:nameOfEntry(cat,row.id),score:row.score});});
    upd[`kategoriler/${fcat}`]={name:"🏆 Final — "+catLabel(cat),final:!0,baseCat:cat,tip:cfg(cat).tip||"ferdi",olusturma:Date.now()};
    upd[`sporcular/${fcat}`]=newSpor;upd[`puanlar/${fcat}`]=null;
    summary.push({cat,fcat,label:catLabel(cat),team,names});});
  if(!Object.keys(upd).length){toast("Sıralanacak (puanı girilmiş) sporcu bulunamadı.","warning");setBusy(!1);return}
  try{await update(ref(db,`${BASE}/${comp}`),upd);await reload();setLog(summary);toast("Finaller oluşturuldu ✓ — ilk "+TOP+" + "+RES+" yedek (R1/R2).","success")}catch{toast("Hata oluştu.","error")}
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
 const clearReserves=async()=>{
  if(busy||!comp)return;setBusy(!0);setLog(null);const upd={};let n=0;
  finalCats.forEach(fc=>{const members=spor[fc]||{},scores=pun[fc]||{},team=isTeam(fc);
    Object.entries(members).forEach(([mid,m])=>{if(!m||!m._yedek)return;let scored=!1;
      if(team){const ok=(m.okul||m.kulup||"").trim(),gn=m.grupNo??m.cikisSirasi,sid=We(fc+"::"+ok+"::"+gn);scored=scores[sid]&&scoreOf(scores[sid])!=null}
      else scored=scores[mid]&&scoreOf(scores[mid])!=null;
      if(!scored){upd[`sporcular/${fc}/${mid}`]=null;n++}});});
  if(!n){toast("Kaldırılacak (yarışmamış/puansız) yedek bulunamadı.","warning");setBusy(!1);return}
  try{await update(ref(db,`${BASE}/${comp}`),upd);await reload();toast(n+" yedek sporcu (R1/R2) kaldırıldı.","success")}catch{toast("Hata oluştu.","error")}
  setBusy(!1);
 };
 const hasReserves=finalCats.some(fc=>Object.values(spor[fc]||{}).some(m=>m&&m._yedek));
 const setTnum=(rank,v)=>setTmpl(o=>({...o,[rank]:v===""?"":Math.max(1,parseInt(v)||1)}));

 const S={wrap:{minHeight:"100vh",background:"radial-gradient(1200px 600px at 50% -10%,#111a30 0%,#0a0e1a 60%)",color:"#e8edf7",fontFamily:"'Plus Jakarta Sans',system-ui,sans-serif",paddingBottom:"3rem"},
  top:{position:"sticky",top:0,zIndex:10,background:"rgba(10,14,26,.9)",backdropFilter:"blur(12px)",borderBottom:"1px solid #2a3550",padding:".8rem 1.1rem",display:"flex",alignItems:"center",gap:".8rem"},
  ico:{width:38,height:38,borderRadius:11,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,background:"linear-gradient(135deg,#f59e0b,#ef4444)",boxShadow:"0 6px 18px rgba(245,158,11,.35)"},
  in:{maxWidth:820,margin:"0 auto",padding:"1rem"},
  sel:{width:"100%",padding:".65rem .8rem",borderRadius:10,border:"1px solid #2a3550",background:"#131a2b",color:"#e8edf7",fontWeight:700,fontSize:".95rem",marginBottom:"1rem"},
  card:{background:"#131a2b",border:"1px solid #2a3550",borderRadius:14,padding:".8rem 1rem",marginBottom:".6rem",display:"flex",alignItems:"center",gap:".7rem",flexWrap:"wrap"},
  badge:{fontSize:".7rem",fontWeight:800,padding:".2rem .5rem",borderRadius:6},
  yed:{fontSize:".72rem",fontWeight:900,padding:".25rem .5rem",borderRadius:6,background:"rgba(245,158,11,.2)",color:"#fbbf24",border:"1px solid rgba(245,158,11,.5)",minWidth:38,textAlign:"center"},
  csb:{fontSize:".85rem",fontWeight:900,padding:".25rem .5rem",borderRadius:8,background:"rgba(103,232,249,.15)",color:"#67e8f9",minWidth:34,textAlign:"center"},
  numin:{width:60,textAlign:"center",background:"#1b2438",border:"1px solid #f59e0b66",borderRadius:8,color:"#e8edf7",padding:".4rem",fontWeight:800,font:"inherit",fontSize:"1rem"},
  btn:{padding:".85rem 1.1rem",border:"none",borderRadius:12,fontWeight:800,fontSize:"1rem",cursor:"pointer",color:"#fff"},
  center:{maxWidth:560,margin:"3rem auto 0",textAlign:"center",color:"#8b97b3",fontWeight:700,padding:"2rem 1rem"}};

 return e.jsxs("div",{style:S.wrap,children:[
  e.jsxs("div",{style:S.top,children:[e.jsx("div",{style:S.ico,children:e.jsx("span",{className:"material-icons-round",style:{color:"#fff",fontSize:"22px"},children:"emoji_events"})}),e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:".72rem",color:"#8b97b3",fontWeight:800,textTransform:"uppercase",letterSpacing:".05em"},children:"Aerobik"}),e.jsx("div",{style:{fontWeight:800,fontSize:"1.05rem",lineHeight:1.1},children:"Final Oluştur"})]})]}),
  e.jsxs("div",{style:S.in,children:[
   e.jsx("div",{style:{fontSize:".85rem",color:"#8b97b3",fontWeight:700,margin:"0 0 .8rem"},children:"Her kategoride ilk 8 sporcu finale, 9-10. sporcular R1/R2 yedek olarak alınır. Aşağıdaki tek çıkış-sırası şablonu (eleme sırası → çıkış no) TÜM kategorilere aynı uygulanır."}),
   loading?e.jsx("div",{style:S.center,children:"Yükleniyor…"}):e.jsxs(e.Fragment,{children:[
    e.jsxs("select",{style:S.sel,value:comp,onChange:x=>{setComp(x.target.value);setLog(null);setTmpl({});setExpanded({})},children:[e.jsx("option",{value:"",children:"— Yarışma seçin —"}),Object.entries(comps).map(([id,c])=>e.jsx("option",{value:id,children:c.isim||c.ad||id},id))]}),
    comp?e.jsxs(e.Fragment,{children:[
     realCats.length===0?e.jsx("div",{style:S.center,children:"Bu yarışmada kategori yok."}):e.jsxs(e.Fragment,{children:[
     anyCat?e.jsxs("div",{style:{...S.card,display:"block",border:"1px solid rgba(245,158,11,.4)",background:"#161a1f"},children:[
       e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:".7rem",cursor:"pointer"},onClick:()=>setTexp(x=>!x),children:[
        e.jsxs("div",{style:{flex:1,minWidth:0},children:[e.jsx("div",{style:{fontWeight:800},children:"🎬 Çıkış Sırası Şablonu"}),e.jsx("div",{style:{color:"#8b97b3",fontSize:".8rem",fontWeight:700},children:"Eleme sırası → çıkış no · tek seferde belirle, tüm kategorilere uygulanır"})]}),
        e.jsx("span",{style:{color:"#fbbf24",fontWeight:800},children:texp?"▲":"▼"})]}),
       texp?e.jsxs("div",{style:{marginTop:".7rem",borderTop:"1px solid #2a3550",paddingTop:".6rem"},children:[
        e.jsxs("div",{style:{display:"flex",gap:".5rem",flexWrap:"wrap",marginBottom:".7rem"},children:[
          e.jsx("button",{style:{...S.btn,padding:".45rem .7rem",fontSize:".78rem",background:"#1b2438",border:"1px solid #2a3550",color:"#cbd5e1"},onClick:()=>setTmpl({}),children:"↧ Sıfırla (1→1 … 8→8)"}),
          e.jsx("button",{style:{...S.btn,padding:".45rem .7rem",fontSize:".78rem",background:"#1b2438",border:"1px solid #2a3550",color:"#cbd5e1"},onClick:()=>{const o={};for(let i=1;i<=TOP;i++)o[i]=TOP-i+1;setTmpl(o)},children:"↥ Ters (1→8 … 8→1)"})]}),
        e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(150px,1fr))",gap:".5rem"},children:[
          Array.from({length:TOP},(_,i)=>i+1).map(rank=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:".5rem",background:"#131a2b",border:"1px solid #2a3550",borderRadius:10,padding:".4rem .6rem"},children:[
            e.jsxs("span",{style:{color:"#8b97b3",fontSize:".82rem",fontWeight:800,whiteSpace:"nowrap"},children:["Eleme ",rank,". →"]}),
            e.jsx("input",{type:"number",min:"1",max:String(TOP),value:tmpl[rank]??rank,onChange:ev=>setTnum(rank,ev.target.value),style:S.numin}),
            e.jsx("span",{style:{color:"#8b97b3",fontSize:".72rem",fontWeight:700},children:"çıkış"})]},rank)),
          e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:".5rem",background:"#131a2b",border:"1px dashed rgba(245,158,11,.5)",borderRadius:10,padding:".4rem .6rem"},children:[e.jsx("span",{style:S.yed,children:"R1"}),e.jsx("span",{style:{color:"#8b97b3",fontSize:".82rem",fontWeight:800},children:"→ çıkış 9 (sabit)"})]}),
          e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:".5rem",background:"#131a2b",border:"1px dashed rgba(245,158,11,.5)",borderRadius:10,padding:".4rem .6rem"},children:[e.jsx("span",{style:S.yed,children:"R2"}),e.jsx("span",{style:{color:"#8b97b3",fontSize:".82rem",fontWeight:800},children:"→ çıkış 10 (sabit)"})]})]}),
        dupWarn?e.jsx("div",{style:{fontSize:".76rem",color:"#fca5a5",fontWeight:800,marginTop:".6rem"},children:"⚠ Aynı çıkış numarası birden fazla eleme sırasına verilmiş — kontrol edin."}):e.jsx("div",{style:{fontSize:".72rem",color:"#8b97b3",fontWeight:600,marginTop:".6rem"},children:"Örn. Eleme 1. → 2, Eleme 2. → 6 yazarsanız her kategoride 1. sıradaki 2. çıkar, 2. sıradaki 6. çıkar."})
       ]}):null
     ]}):null,
     realCats.map(cat=>{const top=rankCat(cat),fc="final_"+cat,has=!!cats[fc],op=!!expanded[cat]&&top.length>0,nc=Math.min(top.length,TOP),nr=Math.max(0,top.length-TOP);return e.jsxs("div",{style:{...S.card,display:"block"},children:[
       e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:".7rem",cursor:top.length?"pointer":"default"},onClick:()=>top.length&&setExpanded(x=>({...x,[cat]:!x[cat]})),children:[
        e.jsxs("div",{style:{flex:1,minWidth:0},children:[e.jsxs("div",{style:{fontWeight:800},children:[catLabel(cat),isTeam(cat)?e.jsx("span",{style:{...S.badge,marginLeft:".4rem",background:"rgba(8,145,178,.2)",color:"#67e8f9"},children:"GRUP/ÇİFT"}):null]}),e.jsxs("div",{style:{color:"#8b97b3",fontSize:".8rem",fontWeight:700},children:[top.length>0?nc+(isTeam(cat)?" takım":" sporcu")+(nr?" + "+nr+" yedek":"")+" · çıkış sırasını görmek için dokunun":"puanı girilmiş sporcu yok"]})]}),
        has?e.jsx("span",{style:{...S.badge,background:"rgba(34,197,94,.18)",color:"#86efac"},children:"✓ FİNAL VAR"}):null,
        top.length?e.jsx("span",{style:{color:"#8b97b3",fontWeight:800},children:op?"▲":"▼"}):null
       ]}),
       op?e.jsxs("div",{style:{marginTop:".7rem",borderTop:"1px solid #2a3550",paddingTop:".6rem"},children:[
        e.jsx("div",{style:{fontSize:".72rem",color:"#8b97b3",fontWeight:800,textTransform:"uppercase",letterSpacing:".03em",marginBottom:".5rem"},children:"Çıkış sırasına göre (şablondan)"}),
        top.map((row,ix)=>({row,rank:ix+1,cs:csOf(ix+1),reserve:ix+1>TOP})).sort((a,b)=>a.cs-b.cs).map(it=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:".6rem",padding:".3rem 0",borderBottom:"1px solid rgba(40,52,79,.4)"},children:[
          it.reserve?e.jsx("span",{style:S.yed,children:"R"+(it.rank-TOP)}):e.jsx("span",{style:S.csb,children:it.cs}),
          e.jsx("span",{style:{flex:1,minWidth:0,fontWeight:700,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:nameOfEntry(cat,it.row.id)}),
          e.jsxs("span",{style:{color:"#8b97b3",fontSize:".78rem",whiteSpace:"nowrap"},children:["eleme ",it.rank,". · ",f3(it.row.score)]})
        ]},it.row.id))
       ]}):null
     ]},cat)})]}),
     e.jsxs("div",{style:{display:"flex",gap:".6rem",flexWrap:"wrap",marginTop:"1rem"},children:[
       e.jsx("button",{style:{...S.btn,background:"linear-gradient(135deg,#f59e0b,#ef4444)",flex:1,minWidth:200},disabled:busy,onClick:generate,children:busy?"İşleniyor…":"🏆 Finalleri Oluştur (ilk "+TOP+" + "+RES+" yedek)"}),
       hasReserves?e.jsx("button",{style:{...S.btn,background:"#1b2438",border:"1px solid #f59e0b",color:"#fbbf24"},disabled:busy,onClick:clearReserves,children:"Yedekleri Kaldır (R1/R2)"}):null,
       finalCats.length>0?e.jsx("button",{style:{...S.btn,background:"#1b2438",border:"1px solid #ef4444",color:"#fca5a5"},disabled:busy,onClick:clearFinals,children:"Finalleri Sil"}):null
     ]}),
     log?e.jsxs("div",{style:{marginTop:"1.2rem"},children:[e.jsx("div",{style:{fontWeight:800,color:"#86efac",marginBottom:".5rem"},children:"✓ Oluşturulan finaller"}),log.map(g=>e.jsxs("div",{style:{...S.card,display:"block"},children:[e.jsxs("div",{style:{fontWeight:800,marginBottom:".4rem"},children:["🏆 Final — ",g.label,g.team?" (grup/çift)":""]}),e.jsx("div",{style:{display:"grid",gap:".2rem"},children:[...g.names].sort((a,b)=>(a.reserve?1e3+a.rank:a.cs)-(b.reserve?1e3+b.rank:b.cs)).map(n=>e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontSize:".85rem",fontWeight:700,gap:".5rem"},children:[e.jsxs("span",{style:{minWidth:0,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:[e.jsx("b",{style:{color:n.reserve?"#fbbf24":"#67e8f9"},children:n.reserve?n.yed+" · yedek ":n.cs+". çıkış "}),n.name,e.jsxs("span",{style:{color:"#8b97b3",fontWeight:600},children:[" (eleme ",n.rank,".)"]})]}),e.jsx("span",{style:{color:"#8b97b3",whiteSpace:"nowrap"},children:f3(n.score)})]},n.rank))})]},g.fcat))]}):null
    ]}):null
   ]})
  ]})
 ]});
}
export{Finals as default};
