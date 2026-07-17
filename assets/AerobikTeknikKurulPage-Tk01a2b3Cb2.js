import{b as usToast,a as usInit,j as e,d as db}from"./main-C2LpyYUGCb2.js";import{f as usParams,r as R}from"./vendor-react-Cxw6bqwhCb2.js";import{k as ref,l as get,o as onValue}from"./vendor-firebase-940mxgRVCb2.js";import{v as verifyToken}from"./epanelToken-BoF3UjP2Cb2.js";import"./modulepreload-polyfill-B5Qt9EMXCb2.js";

const BASE="aerobik_yarismalar";
const f2=v=>v==null||isNaN(v)?"—":Number(v).toFixed(2);
const f3=v=>v==null||isNaN(v)?"—":Number(v).toFixed(3);
const CRIT={artisticRoutine:"Artistik Rutin",content2:"İçerik 2",generalContent:"Genel İçerik",music:"Müzik",performance:"Performans"};
const nice=k=>CRIT[k]||k.replace(/([A-Z])/g," $1").replace(/^./,c=>c.toUpperCase());
function trimA(o){if(!o)return null;const v=["j1","j2","j3","j4"].map(k=>o[k]).filter(x=>x!=null&&!isNaN(x));if(!v.length)return null;if(v.length<2)return v[0];if(v.length===4){v.sort((x,y)=>x-y);return(v[1]+v[2])/2}return v.reduce((a,b)=>a+b,0)/v.length}
function calcE(o){if(!o)return null;const v=["j1","j2","j3","j4"].map(k=>o[k]).filter(x=>x!=null&&!isNaN(x));if(!v.length)return null;let m;if(v.length===4){const s=[...v].sort((x,y)=>x-y);m=(s[1]+s[2])/2}else m=v.reduce((a,b)=>a+b,0)/v.length;return 10-m}
function comps6(sc){const d=sc.dScore!=null?sc.dScore:null,a=sc.aScore!=null?sc.aScore:trimA(sc.aPanel),ee=sc.eScore!=null?sc.eScore:calcE(sc.ePanel),l=sc.lPanel!=null?(typeof sc.lPanel=="object"?(sc.lPanel.totalDeduction??sc.lPanel.deduction):sc.lPanel):null,t=sc.tPanel!=null?(typeof sc.tPanel=="object"?sc.tPanel.deduction:sc.tPanel):null,p=(sc.penalty!=null?sc.penalty:(sc.totalPenalties!=null?sc.totalPenalties:0))-(Number(l)||0)-(Number(t)||0)+(sc.dPanel&&typeof sc.dPanel=="object"?(Number(sc.dPanel.deduction)||0):0),fin=sc.finalScore!=null?sc.finalScore:(sc.sonuc!=null?sc.sonuc:((d||0)+(a||0)+(ee||0)-(p||0)-(Number(l)||0)-(Number(t)||0)));return{d,a,e:ee,p,l,t,fin}}
function isFinished(sc){return sc&&typeof sc==="object"&&(sc.kilitli===!0||sc.durum==="tamamlandi"||sc.durum==="ustJuriBekliyor"||sc.sonuc!=null||sc.finalScore!=null)}

function TeknikKurul(){
 usInit();
 const[sp]=usParams();
 const comp=sp.get("competitionId"),token=sp.get("token");
 const[authed,setAuthed]=R.useState(!1),[loading,setLoading]=R.useState(!0);
 const[pun,setPun]=R.useState({}),[spor,setSpor]=R.useState({}),[cats,setCats]=R.useState({}),[compName,setCompName]=R.useState("Yarışma");
 const[catF,setCatF]=R.useState(""),[q,setQ]=R.useState(""),[detail,setDetail]=R.useState(null),[sub,setSub]=R.useState(null);

 R.useEffect(()=>{if(!comp||!token){setLoading(!1),setAuthed(!1);return}get(ref(db,`${BASE}/${comp}/epanelToken`)).then(s=>{const v=s.val();setAuthed(v?verifyToken(token,v):!1)}).catch(()=>setAuthed(!1)).finally(()=>setLoading(!1))},[comp,token]);
 R.useEffect(()=>{if(!comp||!authed)return;const u1=onValue(ref(db,`${BASE}/${comp}/puanlar`),s=>setPun(s.val()||{}));const u2=onValue(ref(db,`${BASE}/${comp}/sporcular`),s=>setSpor(s.val()||{}));const u3=onValue(ref(db,`${BASE}/${comp}/kategoriler`),s=>setCats(s.val()||{}));const u4=onValue(ref(db,`${BASE}/${comp}/isim`),s=>setCompName(s.val()||"Yarışma"));return()=>{u1(),u2(),u3(),u4()}},[comp,authed]);

 const catName=c=>cats[c]?.name||c;
 const nmeta=(cat,ath)=>{const cm=spor[cat]||{},i=cm[ath];if(i)return{name:[i.ad,i.soyad].filter(Boolean).join(" ")||i.adSoyad||ath,club:i.il||i.okul||i.kulup||""};const parts=String(ath).split("::"),gn=parts[parts.length-1],ok=parts.length>=3?parts.slice(1,-1).join("::"):"";const mem=Object.values(cm).filter(m=>m&&String(m.grupNo??m.cikisSirasi??"")===String(gn)&&(ok===""||String(m.okul||m.kulup||"")===ok));const nm=mem.map(m=>[m.ad,m.soyad].filter(Boolean).join(" ")||m.adSoyad).filter(Boolean).join(", ");return{name:nm||ath,club:mem[0]?.il||mem[0]?.okul||mem[0]?.kulup||""}};
 const items=[];
 Object.entries(pun).forEach(([cat,aths])=>{if(!aths||typeof aths!="object")return;Object.entries(aths).forEach(([ath,sc])=>{if(!isFinished(sc))return;const m=nmeta(cat,ath),C=comps6(sc);items.push({cat,ath,sc,C,name:m.name,club:m.club,fin:C.fin,done:sc.kilitli===!0||sc.durum==="tamamlandi"})})});
 const catOpts=[...new Map(items.map(i=>[i.cat,catName(i.cat)])).entries()].sort((a,b)=>String(a[1]).localeCompare(String(b[1]),"tr-TR"));
 let list=items.slice();
 if(catF)list=list.filter(i=>i.cat===catF);
 if(q.trim()){const s=q.toLocaleLowerCase("tr-TR");list=list.filter(i=>i.name.toLocaleLowerCase("tr-TR").includes(s)||(i.club||"").toLocaleLowerCase("tr-TR").includes(s))}
 const groups=[];list.forEach(it=>{let g=groups.find(x=>x.cat===it.cat);if(!g){g={cat:it.cat,rows:[]};groups.push(g)}g.rows.push(it)});
 groups.sort((a,b)=>String(catName(a.cat)).localeCompare(String(catName(b.cat)),"tr-TR"));
 groups.forEach(g=>g.rows.sort((a,b)=>(b.fin||0)-(a.fin||0)));

 const S={wrap:{minHeight:"100vh",background:"#0a0e1a",color:"#e8edf7",fontFamily:"'Plus Jakarta Sans',system-ui,sans-serif",paddingBottom:"2rem"},
  top:{position:"sticky",top:0,zIndex:10,background:"rgba(10,14,26,.92)",backdropFilter:"blur(10px)",borderBottom:"1px solid #2a3550",padding:".8rem 1.1rem",display:"flex",alignItems:"center",gap:".7rem",flexWrap:"wrap"},
  sel:{background:"#1b2438",color:"#e8edf7",border:"1px solid #2a3550",borderRadius:9,padding:".5rem .7rem",font:"inherit",fontWeight:700,fontSize:".85rem"},
  inp:{background:"#1b2438",color:"#e8edf7",border:"1px solid #2a3550",borderRadius:9,padding:".5rem .7rem",font:"inherit",fontWeight:700,fontSize:".85rem",minWidth:160},
  wrapIn:{maxWidth:1000,margin:"0 auto",padding:"1rem"},
  count:{color:"#8b97b3",fontWeight:700,fontSize:".85rem",margin:".2rem 0 1rem"},
  secHead:{display:"flex",alignItems:"center",gap:".5rem",fontWeight:800,fontSize:"1.15rem",margin:"1.2rem 0 .7rem",paddingBottom:".45rem",borderBottom:"2px solid rgba(99,102,241,.35)"},
  row:{display:"flex",alignItems:"center",gap:".9rem",background:"#131a2b",border:"1px solid #2a3550",borderRadius:12,padding:".7rem 1rem",marginBottom:".5rem",cursor:"pointer",transition:".12s"},
  no:{width:40,height:40,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,fontSize:"1.15rem",background:"#1b2438",flexShrink:0},
  ath:{flex:1,minWidth:0},nm:{fontWeight:800,fontSize:"1.05rem",display:"flex",alignItems:"center",gap:".5rem",flexWrap:"wrap"},
  club:{color:"#8b97b3",fontSize:".8rem",fontWeight:700,marginTop:".1rem"},
  mini:{display:"flex",gap:".7rem",fontSize:".72rem",color:"#8b97b3",fontWeight:700,flexWrap:"wrap",marginTop:".25rem"},
  fin:{fontSize:"1.55rem",fontWeight:800,textAlign:"right",flexShrink:0},
  badge:d=>({fontSize:".6rem",fontWeight:800,padding:".15rem .45rem",borderRadius:5,textTransform:"uppercase",background:d?"rgba(34,197,94,.15)":"rgba(251,191,36,.15)",color:d?"#86efac":"#fbbf24"}),
  ov:{position:"fixed",inset:0,background:"rgba(0,0,0,.65)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:60,padding:"1rem"},
  mcard:{background:"#131a2b",border:"1px solid #2a3550",borderRadius:16,padding:"1.3rem",width:"100%",maxWidth:600,maxHeight:"90vh",overflow:"auto"},
  grid:{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(120px,1fr))",gap:".8rem",marginTop:".6rem"},
  card:{background:"#1b2438",border:"1px solid #2a3550",borderRadius:14,padding:"1rem",cursor:"pointer"},
  jrow:{background:"#1b2438",border:"1px solid #2a3550",borderRadius:10,padding:".7rem .9rem",marginBottom:".6rem"},
  kv:{display:"flex",flexWrap:"wrap",gap:".4rem",marginTop:".3rem"},
  chip:{background:"#131a2b",border:"1px solid #2a3550",borderRadius:6,padding:".15rem .5rem",fontSize:".75rem",fontWeight:700},
  mbtn:{flex:1,background:"#1b2438",border:"1px solid #2a3550",color:"#e8edf7",borderRadius:10,padding:".7rem",font:"inherit",fontWeight:800,cursor:"pointer"},
  center:{maxWidth:560,margin:"3rem auto 0",textAlign:"center",color:"#8b97b3",fontWeight:700,padding:"2rem 1rem"}};
 const BC={D:"#8b5cf6",A:"#f59e0b",E:"#0891b2",P:"#ef4444",L:"#10b981",T:"#3b82f6"};

 if(!comp)return e.jsx("div",{style:S.wrap,children:e.jsx("div",{style:S.center,children:"Hatalı link."})});
 if(loading)return e.jsx("div",{style:S.wrap,children:e.jsx("div",{style:S.center,children:"Doğrulanıyor…"})});
 if(!authed)return e.jsx("div",{style:S.wrap,children:e.jsxs("div",{style:S.center,children:[e.jsx("h2",{children:"Yetkisiz Erişim"}),e.jsx("p",{children:"Geçersiz/süresi dolmuş bağlantı."})]})});

 const cards=it=>{const C=it.C;return[{k:"D",v:f3(C.d),dt:"d"},{k:"A",v:f3(C.a),dt:"a"},{k:"E",v:f3(C.e),dt:"e"},{k:"P",v:C.p?"−"+f2(C.p):"0.00",dt:"p"},{k:"L",v:C.l!=null?"−"+f2(C.l):"—",dt:"l"},{k:"T",v:C.t!=null?"−"+f2(C.t):"—",dt:"t"}]};
 const subContent=()=>{if(!sub)return null;const{dt,it}=sub,sc=it.sc,C=it.C;let title="",lines=[];
  if(dt==="a"){title="A — Artistik";const bd=sc.aPanelBreakdown||{},ap=sc.aPanel||{};lines=["j1","j2","j3","j4"].map(j=>{const b=bd[j]||{},note=ap[j]??b.finalAScore,crit=b.criteriaValues?Object.entries(b.criteriaValues):[],ded=b.deductionValues?Object.entries(b.deductionValues):[];return e.jsxs("div",{style:S.jrow,children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontWeight:800},children:[e.jsxs("span",{children:["A",j.replace("j","")," Hakemi"]}),e.jsx("span",{style:{color:"#fbbf24"},children:note!=null?f2(note):"—"})]}),crit.length?e.jsx("div",{style:S.kv,children:crit.map(([k,v])=>e.jsxs("span",{style:S.chip,children:[nice(k),": ",f2(v)]},k))}):null,ded.length?e.jsx("div",{style:{...S.kv,marginTop:".35rem"},children:ded.map(([k,v])=>e.jsxs("span",{style:{...S.chip,color:"#fca5a5"},children:[nice(k),": −",v]},k))}):null]},j)})}
  else if(dt==="e"){title="E — İcra";const ep=sc.ePanel||{};lines=["j1","j2","j3","j4"].map(j=>e.jsx("div",{style:S.jrow,children:e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontWeight:800},children:[e.jsxs("span",{children:["E",j.replace("j","")," Hakemi"]}),e.jsxs("span",{style:{color:"#fbbf24"},children:["kesinti −",ep[j]!=null?f2(ep[j]):"—"]})]})},j))}
  else if(dt==="d"){title="D — Zorluk";const dp=sc.dPanel||{},sl=dp.slots||{};lines=[e.jsxs("div",{style:S.jrow,children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontWeight:800},children:[e.jsx("span",{children:"Element Slotları"}),e.jsxs("span",{style:{color:"#fbbf24"},children:["ham ",f2(dp.rawTotal)]})]}),e.jsx("div",{style:S.kv,children:Object.entries(sl).length?Object.entries(sl).map(([k,v])=>e.jsxs("span",{style:S.chip,children:[k.toUpperCase(),": ",f2(v)]},k)):e.jsx("span",{style:S.chip,children:"—"})}),dp.deduction?e.jsx("div",{style:{...S.kv,marginTop:".35rem"},children:e.jsxs("span",{style:{...S.chip,color:"#fca5a5"},children:["D kesinti: −",dp.deduction]})}):null]},"d"),e.jsx("div",{style:S.jrow,children:e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontWeight:800},children:[e.jsx("span",{children:"Bölen (dDivisor)"}),e.jsx("span",{style:{color:"#fbbf24"},children:sc.dDivisor??"—"})]})},"dd")]}
  else if(dt==="p"){title="P — Ceza / Nötr";lines=[e.jsx("div",{style:S.jrow,children:e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontWeight:800},children:[e.jsx("span",{children:"Toplam ceza/kesinti"}),e.jsxs("span",{style:{color:"#fbbf24"},children:["−",f2(C.p)]})]})},"p")]}
  else if(dt==="l"){title="L — Çizgi";const lp=sc.lPanel,v=typeof lp=="object"?(lp.totalDeduction??lp.deduction):lp,calls=typeof lp=="object"?lp.calls:null;lines=[e.jsxs("div",{style:S.jrow,children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontWeight:800},children:[e.jsx("span",{children:"Çizgi Hakemi"}),e.jsxs("span",{style:{color:"#fbbf24"},children:["−",v!=null?f2(v):"—"]})]}),calls!=null?e.jsx("div",{style:S.kv,children:e.jsxs("span",{style:S.chip,children:[calls," çizgi ihlali"]})}):null]},"l")]}
  else if(dt==="t"){title="T — Süre";const tp=sc.tPanel,v=typeof tp=="object"?tp.deduction:tp,dur=typeof tp=="object"?tp.routineDuration:null;lines=[e.jsxs("div",{style:S.jrow,children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontWeight:800},children:[e.jsx("span",{children:"Zaman Hakemi"}),e.jsx("span",{style:{color:"#fbbf24"},children:tp&&tp.dq?"DQ":"−"+(v!=null?f2(v):"—")})]}),dur!=null?e.jsx("div",{style:S.kv,children:e.jsxs("span",{style:S.chip,children:["Rutin süresi: ",dur,"s"]})}):null]},"t")]}
  return{title,lines}};

 return e.jsxs("div",{style:S.wrap,children:[
  e.jsxs("div",{style:S.top,children:[e.jsx("span",{className:"material-icons-round",style:{color:"#fbbf24"},children:"emoji_events"}),e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:".8rem",color:"#8b97b3",fontWeight:700},children:compName}),e.jsx("div",{style:{fontWeight:800,fontSize:"1.05rem"},children:"TEKNİK KURUL — Sıralama"})]}),e.jsxs("select",{style:{...S.sel,marginLeft:"auto"},value:catF,onChange:ev=>setCatF(ev.target.value),children:[e.jsx("option",{value:"",children:"Tüm kategoriler"}),catOpts.map(([cv,cn])=>e.jsx("option",{value:cv,children:cn},cv))]}),e.jsx("input",{style:S.inp,placeholder:"Sporcu / kulüp ara…",value:q,onChange:ev=>setQ(ev.target.value)})]}),
  e.jsxs("div",{style:S.wrapIn,children:[
   list.length===0?e.jsx("div",{style:S.center,children:items.length?"Sonuç bulunamadı.":"Henüz yarışması biten sporcu yok. Puanlar kaydedildikçe sıralama burada oluşacak."}):e.jsxs(R.Fragment,{children:[
    e.jsxs("div",{style:S.count,children:[list.length," sporcu · ",groups.length," kategori (yarışması bitenler, sıralı)"]}),
    groups.map(g=>e.jsxs("div",{children:[
      e.jsxs("div",{style:S.secHead,children:[e.jsx("span",{className:"material-icons-round",style:{color:"#6366f1"},children:"folder"}),catName(g.cat),e.jsxs("span",{style:{color:"#8b97b3",fontWeight:700,fontSize:".85rem"},children:["(",g.rows.length,")"]})]}),
      g.rows.map((it,i)=>{const rk=i+1,rc=rk===1?"linear-gradient(135deg,#fbbf24,#f59e0b)":rk===2?"linear-gradient(135deg,#e2e8f0,#94a3b8)":rk===3?"linear-gradient(135deg,#f59e0b,#b45309)":"#1b2438",tc=rk<=2?"#111":"#e8edf7";return e.jsxs("div",{style:S.row,onClick:()=>{setSub(null);setDetail(it)},children:[
        e.jsx("div",{style:{...S.no,background:rc,color:tc},children:rk}),
        e.jsxs("div",{style:S.ath,children:[e.jsxs("div",{style:S.nm,children:[it.name,e.jsx("span",{style:S.badge(it.done),children:it.done?"onaylı":"bekliyor"})]}),it.club?e.jsx("div",{style:S.club,children:it.club}):null,e.jsxs("div",{style:S.mini,children:[e.jsxs("span",{children:["D ",e.jsx("b",{style:{color:"#e8edf7"},children:f2(it.C.d)})]}),e.jsxs("span",{children:["A ",e.jsx("b",{style:{color:"#e8edf7"},children:f2(it.C.a)})]}),e.jsxs("span",{children:["E ",e.jsx("b",{style:{color:"#e8edf7"},children:f2(it.C.e)})]}),it.C.p?e.jsxs("span",{children:["P ",e.jsxs("b",{style:{color:"#fca5a5"},children:["−",f2(it.C.p)]})]}):null,it.C.l!=null?e.jsxs("span",{children:["L ",e.jsxs("b",{style:{color:"#fca5a5"},children:["−",f2(it.C.l)]})]}):null,it.C.t!=null?e.jsxs("span",{children:["T ",e.jsxs("b",{style:{color:"#fca5a5"},children:["−",f2(it.C.t)]})]}):null]})]}),
        e.jsx("div",{style:S.fin,children:f3(it.fin)}),
        e.jsx("span",{className:"material-icons-round",style:{color:"#8b97b3"},children:"chevron_right"})
      ]},it.cat+"/"+it.ath)})
    ]},g.cat))
   ]})
  ]}),
  detail&&e.jsx("div",{style:S.ov,onClick:ev=>{if(ev.target===ev.currentTarget){setDetail(null);setSub(null)}},children:e.jsxs("div",{style:S.mcard,children:[
    sub?(()=>{const c=subContent();return e.jsxs(R.Fragment,{children:[e.jsx("h3",{style:{fontWeight:800,fontSize:"1.15rem",marginBottom:".8rem"},children:c.title}),...c.lines,e.jsxs("div",{style:{display:"flex",gap:".5rem",marginTop:".4rem"},children:[e.jsx("button",{style:S.mbtn,onClick:()=>setSub(null),children:"◀ Geri"}),e.jsx("button",{style:S.mbtn,onClick:()=>{setDetail(null);setSub(null)},children:"Kapat"})]})]})})():e.jsxs(R.Fragment,{children:[
      e.jsx("h3",{style:{fontWeight:800,fontSize:"1.2rem"},children:detail.name}),
      e.jsxs("div",{style:{color:"#8b97b3",fontWeight:700,marginBottom:".3rem"},children:[catName(detail.cat)," · Toplam ",e.jsx("strong",{style:{color:"#fbbf24"},children:f3(detail.C.fin)})]}),
      e.jsx("div",{style:S.grid,children:cards(detail).map(c=>e.jsxs("div",{style:S.card,onClick:()=>setSub({dt:c.dt,it:detail}),children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:".4rem",fontSize:".75rem",fontWeight:800,color:"#8b97b3"},children:[e.jsx("span",{style:{width:24,height:24,borderRadius:7,background:BC[c.k],color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800},children:c.k})]}),e.jsx("div",{style:{fontSize:"1.7rem",fontWeight:800,marginTop:".35rem"},children:c.v})]},c.dt))}),
      e.jsx("button",{style:{...S.mbtn,width:"100%",marginTop:".7rem"},onClick:()=>setDetail(null),children:"Kapat"})
    ]})
  ]})})
 ]});
}
export{TeknikKurul as default};
