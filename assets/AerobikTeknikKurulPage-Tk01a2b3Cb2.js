import"./i18n-Tr01a2b3Cb2.js";import{b as usToast,a as usInit,j as e,d as db}from"./main-C2LpyYUGCb2.js";import{f as usParams,r as R}from"./vendor-react-Cxw6bqwhCb2.js";import{k as ref,l as get,o as onValue}from"./vendor-firebase-940mxgRVCb2.js";import{v as verifyToken}from"./epanelToken-BoF3UjP2Cb2.js";import"./modulepreload-polyfill-B5Qt9EMXCb2.js";

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
 const[authed,setAuthed]=R.useState(!1),[loading,setLoading]=R.useState(!0),[dk,setDk]=R.useState(()=>{try{return localStorage.getItem("tcfTkTema")==="koyu"}catch{return!1}});
 const[pun,setPun]=R.useState({}),[spor,setSpor]=R.useState({}),[cats,setCats]=R.useState({}),[compName,setCompName]=R.useState("Yarışma");
 const[catF,setCatF]=R.useState(""),[q,setQ]=R.useState(""),[detail,setDetail]=R.useState(null),[sub,setSub]=R.useState(null);

 R.useEffect(()=>{if(!comp||!token){setLoading(!1),setAuthed(!1);return}get(ref(db,`${BASE}/${comp}/epanelToken`)).then(s=>{const v=s.val();setAuthed(v?verifyToken(token,v):!1)}).catch(()=>setAuthed(!1)).finally(()=>setLoading(!1))},[comp,token]);
 R.useEffect(()=>{if(!comp||!authed)return;const u1=onValue(ref(db,`${BASE}/${comp}/puanlar`),s=>setPun(s.val()||{}));const u2=onValue(ref(db,`${BASE}/${comp}/sporcular`),s=>setSpor(s.val()||{}));const u3=onValue(ref(db,`${BASE}/${comp}/kategoriler`),s=>setCats(s.val()||{}));const u4=onValue(ref(db,`${BASE}/${comp}/isim`),s=>setCompName(s.val()||"Yarışma"));return()=>{u1(),u2(),u3(),u4()}},[comp,authed]);

 const catName=c=>cats[c]?.name||c;
 const nmeta=(cat,ath)=>{const cm=spor[cat]||{},i=cm[ath];if(i)return{name:[i.ad,i.soyad].filter(Boolean).join(" ")||i.adSoyad||ath,club:i.il||i.okul||i.kulup||""};const parts=String(ath).split("::"),gn=parts[parts.length-1],ok=parts.length>=3?parts.slice(1,-1).join("::"):"";const _kW=m=>String(cat+"::"+String(m.okul||m.kulup||"").trim()+"::"+(m.grupNo||1)).trim().replace(/[.#$[\]/]/g,"-").slice(0,60),_sO=v=>String(v||"").trim().replace(/[.#$[\]/]/g,"-");let mem=Object.values(cm).filter(m=>m&&_kW(m)===String(ath));if(!mem.length)mem=Object.values(cm).filter(m=>m&&String(m.grupNo??m.cikisSirasi??"")===String(gn)&&(ok===""||String(m.okul||m.kulup||"")===ok||_sO(m.okul||m.kulup)===ok));const nm=[...new Set(mem.map(m=>[m.ad,m.soyad].filter(Boolean).join(" ")||m.adSoyad).filter(Boolean))].join(", ");return{name:nm||ath,club:mem[0]?.il||mem[0]?.okul||mem[0]?.kulup||""}};
 const items=[];
 Object.entries(pun).forEach(([cat,aths])=>{if(!aths||typeof aths!="object")return;Object.entries(aths).forEach(([ath,sc])=>{if(!isFinished(sc))return;const m=nmeta(cat,ath),C=comps6(sc);items.push({cat,ath,sc,C,name:m.name,club:m.club,fin:C.fin,done:sc.kilitli===!0||sc.durum==="tamamlandi"})})});
 const catOpts=[...new Map(items.map(i=>[i.cat,catName(i.cat)])).entries()].sort((a,b)=>String(a[1]).localeCompare(String(b[1]),"tr-TR"));
 let list=items.slice();
 if(catF)list=list.filter(i=>i.cat===catF);
 if(q.trim()){const s=q.toLocaleLowerCase("tr-TR");list=list.filter(i=>i.name.toLocaleLowerCase("tr-TR").includes(s)||(i.club||"").toLocaleLowerCase("tr-TR").includes(s))}
 const groups=[];list.forEach(it=>{let g=groups.find(x=>x.cat===it.cat);if(!g){g={cat:it.cat,rows:[]};groups.push(g)}g.rows.push(it)});
 groups.sort((a,b)=>String(catName(a.cat)).localeCompare(String(catName(b.cat)),"tr-TR"));
 groups.forEach(g=>g.rows.sort((a,b)=>(b.fin||0)-(a.fin||0)));

 const P=dk?{bg:"#0b1220",card:"#111a2e",soft:"#16213a",soft2:"#0f1729",line:"#24324d",line2:"rgba(42,53,80,.55)",ink:"#e5ebf5",ink2:"#cbd5e1",muted:"#94a3b8",hdr:"#0f172a",amber:"#fbbf24",red:"#fca5a5",green:"#86efac",green2:"#6ee7b7",pink:"#f9a8d4",violet:"#c4b5fd",sky:"#38bdf8"}:{bg:"#F0F2F5",card:"#fff",soft:"#F8FAFC",soft2:"#F1F5F9",line:"#E5E7EB",line2:"#EEF2F7",ink:"#1A1D26",ink2:"#334155",muted:"#6B7280",hdr:"#fff",amber:"#B45309",red:"#DC2626",green:"#15803D",green2:"#047857",pink:"#DB2777",violet:"#6D28D9",sky:"#0369A1"};
 const S={wrap:{minHeight:"100vh",background:P.bg,color:P.ink,fontFamily:"Nunito,system-ui,-apple-system,sans-serif",paddingBottom:"2rem"},
  top:{position:"sticky",top:0,zIndex:10,background:P.hdr,backdropFilter:"blur(10px)",borderBottom:("1px solid "+P.line),boxShadow:"0 1px 3px rgba(0,0,0,.06)",padding:".5rem 1.25rem",minHeight:68,display:"flex",alignItems:"center",gap:".8rem",flexWrap:"wrap"},
  sel:{background:P.soft,color:P.ink,border:("1px solid "+P.line),borderRadius:9,padding:".5rem .7rem",font:"inherit",fontWeight:700,fontSize:".85rem"},
  inp:{background:P.soft,color:P.ink,border:("1px solid "+P.line),borderRadius:9,padding:".5rem .7rem",font:"inherit",fontWeight:700,fontSize:".85rem",minWidth:160},
  wrapIn:{maxWidth:1000,margin:"0 auto",padding:"1rem"},
  count:{color:P.muted,fontWeight:700,fontSize:".85rem",margin:".2rem 0 1rem"},
  secHead:{display:"flex",alignItems:"center",gap:".5rem",fontWeight:800,fontSize:"1.15rem",margin:"1.2rem 0 .7rem",paddingBottom:".45rem",borderBottom:"2px solid rgba(99,102,241,.35)"},
  row:{display:"flex",alignItems:"center",gap:".9rem",background:P.card,border:("1px solid "+P.line),borderRadius:12,padding:".7rem 1rem",marginBottom:".5rem",cursor:"pointer",transition:".12s"},
  no:{width:40,height:40,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,fontSize:"1.15rem",background:P.soft,flexShrink:0},
  ath:{flex:1,minWidth:0},nm:{fontWeight:800,fontSize:"1.05rem",display:"flex",alignItems:"center",gap:".5rem",flexWrap:"wrap"},
  club:{color:P.muted,fontSize:".8rem",fontWeight:700,marginTop:".1rem"},
  mini:{display:"flex",gap:".7rem",fontSize:".72rem",color:P.muted,fontWeight:700,flexWrap:"wrap",marginTop:".25rem"},
  fin:{fontSize:"1.55rem",fontWeight:800,textAlign:"right",flexShrink:0},
  badge:d=>({fontSize:".6rem",fontWeight:800,padding:".15rem .45rem",borderRadius:5,textTransform:"uppercase",background:d?"rgba(34,197,94,.15)":"rgba(251,191,36,.15)",color:d?P.green:P.amber}),
  ov:{position:"fixed",inset:0,background:"rgba(0,0,0,.65)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:60,padding:"1rem"},
  mcard:{background:P.card,border:("1px solid "+P.line),borderRadius:16,padding:"1.3rem",width:"100%",maxWidth:600,maxHeight:"90vh",overflow:"auto"},
  grid:{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(120px,1fr))",gap:".8rem",marginTop:".6rem"},
  card:{background:P.soft,border:("1px solid "+P.line),borderRadius:14,padding:"1rem",cursor:"pointer"},
  jrow:{background:P.soft,border:("1px solid "+P.line),borderRadius:10,padding:".7rem .9rem",marginBottom:".6rem"},
  kv:{display:"flex",flexWrap:"wrap",gap:".4rem",marginTop:".3rem"},
  chip:{background:P.card,border:("1px solid "+P.line),borderRadius:6,padding:".15rem .5rem",fontSize:".75rem",fontWeight:700},
  mbtn:{flex:1,background:P.soft,border:("1px solid "+P.line),color:P.ink,borderRadius:10,padding:".7rem",font:"inherit",fontWeight:800,cursor:"pointer"},
  center:{maxWidth:560,margin:"3rem auto 0",textAlign:"center",color:P.muted,fontWeight:700,padding:"2rem 1rem"}};
 const BC={D:"#8b5cf6",A:"#f59e0b",E:"#0891b2",P:"#ef4444",L:"#10b981",T:"#3b82f6"};

 if(!comp)return e.jsx("div",{style:S.wrap,children:e.jsx("div",{style:S.center,children:__T("Hatalı link.")})});
 if(loading)return e.jsx("div",{style:S.wrap,children:e.jsx("div",{style:S.center,children:__T("Doğrulanıyor…")})});
 if(!authed)return e.jsx("div",{style:S.wrap,children:e.jsxs("div",{style:S.center,children:[e.jsx("h2",{children:__T("Yetkisiz Erişim")}),e.jsx("p",{children:__T("Geçersiz/süresi dolmuş bağlantı.")})]})});

 const cards=it=>{const C=it.C;return[{k:"D",v:f3(C.d),dt:"d"},{k:"A",v:f3(C.a),dt:"a"},{k:"E",v:f3(C.e),dt:"e"},{k:"P",v:C.p?"−"+f2(C.p):"0.00",dt:"p"},{k:"L",v:C.l!=null?"−"+f2(C.l):"—",dt:"l"},{k:"T",v:C.t!=null?"−"+f2(C.t):"—",dt:"t"}]};
 const subContent=()=>{if(!sub)return null;const{dt,it}=sub,sc=it.sc,C=it.C;let title="",lines=[];
  if(dt==="a"){title="A — Artistik";const bd=sc.aPanelBreakdown||{},ap=sc.aPanel||{};lines=["j1","j2","j3","j4"].map(j=>{const b=bd[j]||{},note=ap[j]??b.finalAScore,crit=b.criteriaValues?Object.entries(b.criteriaValues):[],ded=b.deductionValues?Object.entries(b.deductionValues):[];return e.jsxs("div",{style:S.jrow,children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontWeight:800},children:[e.jsxs("span",{children:["A",j.replace("j","")," Hakemi"]}),e.jsx("span",{style:{color:P.amber},children:note!=null?f2(note):"—"})]}),crit.length?e.jsx("div",{style:S.kv,children:crit.map(([k,v])=>e.jsxs("span",{style:S.chip,children:[nice(k),": ",f2(v)]},k))}):null,ded.length?e.jsx("div",{style:{...S.kv,marginTop:".35rem"},children:ded.map(([k,v])=>e.jsxs("span",{style:{...S.chip,color:P.red},children:[nice(k),": −",v]},k))}):null]},j)})}
  else if(dt==="e"){title="E — Uygulama";const ep=sc.ePanel||{};lines=["j1","j2","j3","j4"].map(j=>e.jsx("div",{style:S.jrow,children:e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontWeight:800},children:[e.jsxs("span",{children:["E",j.replace("j","")," Hakemi"]}),e.jsxs("span",{style:{color:P.amber},children:["kesinti −",ep[j]!=null?f2(ep[j]):"—"]})]})},j))}
  else if(dt==="d"){title="D — Zorluk";const dp=sc.dPanel||{},sl=dp.slots||{};lines=[e.jsxs("div",{style:S.jrow,children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontWeight:800},children:[e.jsx("span",{children:__T("Element Slotları")}),e.jsxs("span",{style:{color:P.amber},children:["ham ",f2(dp.rawTotal)]})]}),e.jsx("div",{style:S.kv,children:Object.entries(sl).length?Object.entries(sl).map(([k,v])=>e.jsxs("span",{style:S.chip,children:[k.toUpperCase(),": ",f2(v)]},k)):e.jsx("span",{style:S.chip,children:"—"})}),dp.deduction?e.jsx("div",{style:{...S.kv,marginTop:".35rem"},children:e.jsxs("span",{style:{...S.chip,color:P.red},children:["D kesinti: −",dp.deduction]})}):null]},"d"),e.jsx("div",{style:S.jrow,children:e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontWeight:800},children:[e.jsx("span",{children:__T("Bölen (dDivisor)")}),e.jsx("span",{style:{color:P.amber},children:sc.dDivisor??"—"})]})},"dd")]}
  else if(dt==="p"){title="P — Ceza / Nötr";lines=[e.jsx("div",{style:S.jrow,children:e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontWeight:800},children:[e.jsx("span",{children:__T("Toplam ceza/kesinti")}),e.jsxs("span",{style:{color:P.amber},children:["−",f2(C.p)]})]})},"p")]}
  else if(dt==="l"){title="L — Çizgi";const lp=sc.lPanel,v=typeof lp=="object"?(lp.totalDeduction??lp.deduction):lp,calls=typeof lp=="object"?lp.calls:null;lines=[e.jsxs("div",{style:S.jrow,children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontWeight:800},children:[e.jsx("span",{children:__T("Çizgi Hakemi")}),e.jsxs("span",{style:{color:P.amber},children:["−",v!=null?f2(v):"—"]})]}),calls!=null?e.jsx("div",{style:S.kv,children:e.jsxs("span",{style:S.chip,children:[calls," çizgi ihlali"]})}):null]},"l")]}
  else if(dt==="t"){title="T — Süre";const tp=sc.tPanel,v=typeof tp=="object"?tp.deduction:tp,dur=typeof tp=="object"?tp.routineDuration:null;lines=[e.jsxs("div",{style:S.jrow,children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontWeight:800},children:[e.jsx("span",{children:__T("Zaman Hakemi")}),e.jsx("span",{style:{color:P.amber},children:tp&&tp.dq?"DQ":"−"+(v!=null?f2(v):"—")})]}),dur!=null?e.jsx("div",{style:S.kv,children:e.jsxs("span",{style:S.chip,children:["Rutin süresi: ",dur,"s"]})}):null]},"t")]}
  return{title,lines}};

 return e.jsxs("div",{style:S.wrap,children:[
  e.jsxs("div",{style:S.top,children:[e.jsx("div",{style:{width:44,height:44,borderRadius:12,background:"#d97706",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,boxShadow:"0 6px 18px rgba(217,119,6,.35)"},children:e.jsx("span",{className:"material-icons-round",style:{color:"#fff"},children:"emoji_events"})}),e.jsxs("div",{style:{minWidth:0},children:[e.jsx("div",{style:{fontWeight:900,fontSize:"1.12rem",lineHeight:1.15},children:__T("Teknik Kurul · Sıralama")}),e.jsx("div",{style:{fontSize:".8rem",color:P.muted,fontWeight:700},children:compName})]}),e.jsxs("select",{style:{...S.sel,marginLeft:"auto"},value:catF,onChange:ev=>setCatF(ev.target.value),children:[e.jsx("option",{value:"",children:__T("Tüm kategoriler")}),catOpts.map(([cv,cn])=>e.jsx("option",{value:cv,children:cn},cv))]}),e.jsx("input",{style:S.inp,placeholder:__T("Sporcu / kulüp ara…"),value:q,onChange:ev=>setQ(ev.target.value)}),e.jsx("button",{type:"button",title:dk?__T("Açık tema"):__T("Karanlık tema"),onClick:()=>setDk(v=>{const y=!v;try{localStorage.setItem("tcfTkTema",y?"koyu":"acik")}catch{}return y}),style:{width:38,height:38,borderRadius:10,border:"1px solid "+P.line,background:P.card,color:P.ink,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",flexShrink:0},children:e.jsx("span",{className:"material-icons-round",style:{fontSize:"1.2rem"},children:dk?"light_mode":"dark_mode"})})]}),
  e.jsxs("div",{style:S.wrapIn,children:[
   list.length===0?e.jsx("div",{style:S.center,children:items.length?"Sonuç bulunamadı.":"Henüz yarışması biten sporcu yok. Puanlar kaydedildikçe sıralama burada oluşacak."}):e.jsxs(R.Fragment,{children:[
    e.jsxs("div",{style:S.count,children:[list.length," sporcu · ",groups.length," kategori (yarışması bitenler, sıralı)"]}),
    groups.map(g=>e.jsxs("div",{children:[
      e.jsxs("div",{style:S.secHead,children:[e.jsx("span",{className:"material-icons-round",style:{color:"#6366f1"},children:"folder"}),catName(g.cat),e.jsxs("span",{style:{color:P.muted,fontWeight:700,fontSize:".85rem"},children:["(",g.rows.length,")"]})]}),
      g.rows.map((it,i)=>{const rk=i+1,rc=rk===1?"linear-gradient(135deg,#fbbf24,#f59e0b)":rk===2?"linear-gradient(135deg,#e2e8f0,#94a3b8)":rk===3?"linear-gradient(135deg,#f59e0b,#b45309)":P.soft,tc=rk<=2?"#111":P.ink;return e.jsxs("div",{style:S.row,onClick:()=>{setSub(null);setDetail(it)},children:[
        e.jsx("div",{style:{...S.no,background:rc,color:tc},children:rk}),
        e.jsxs("div",{style:S.ath,children:[e.jsxs("div",{style:S.nm,children:[it.name,e.jsx("span",{style:S.badge(it.done),children:it.done?"onaylı":"bekliyor"}),it.sc&&it.sc.itirazDegisiklik?e.jsx("span",{title:"D "+f2(it.sc.itirazDegisiklik.eski)+" → "+f2(it.sc.itirazDegisiklik.yeni)+(it.sc.itirazDegisiklik.hakemler&&it.sc.itirazDegisiklik.hakemler.length?" · D hakem: "+it.sc.itirazDegisiklik.hakemler.join(", "):""),style:{fontSize:".6rem",fontWeight:800,padding:".15rem .45rem",borderRadius:5,textTransform:"uppercase",background:"#7c3aed",color:"#fff"},children:"⚖ itirazla değişti · D "+f2(it.sc.itirazDegisiklik.eski)+"→"+f2(it.sc.itirazDegisiklik.yeni)}):null]}),it.club?e.jsx("div",{style:S.club,children:it.club}):null,e.jsxs("div",{style:S.mini,children:[e.jsxs("span",{children:["D ",e.jsx("b",{style:{color:P.ink},children:f2(it.C.d)})]}),e.jsxs("span",{children:["A ",e.jsx("b",{style:{color:P.ink},children:f2(it.C.a)})]}),e.jsxs("span",{children:["E ",e.jsx("b",{style:{color:P.ink},children:f2(it.C.e)})]}),it.C.p?e.jsxs("span",{children:["P ",e.jsxs("b",{style:{color:P.red},children:["−",f2(it.C.p)]})]}):null,it.C.l!=null?e.jsxs("span",{children:["L ",e.jsxs("b",{style:{color:P.red},children:["−",f2(it.C.l)]})]}):null,it.C.t!=null?e.jsxs("span",{children:["T ",e.jsxs("b",{style:{color:P.red},children:["−",f2(it.C.t)]})]}):null]})]}),
        e.jsx("div",{style:S.fin,children:f3(it.fin)}),
        e.jsx("span",{className:"material-icons-round",style:{color:P.muted},children:"chevron_right"})
      ]},it.cat+"/"+it.ath)})
    ]},g.cat))
   ]})
  ]}),
  detail&&e.jsx("div",{style:S.ov,onClick:ev=>{if(ev.target===ev.currentTarget){setDetail(null);setSub(null)}},children:e.jsxs("div",{style:S.mcard,children:[
    sub?(()=>{const c=subContent();return e.jsxs(R.Fragment,{children:[e.jsx("h3",{style:{fontWeight:800,fontSize:"1.15rem",marginBottom:".8rem"},children:c.title}),...c.lines,e.jsxs("div",{style:{display:"flex",gap:".5rem",marginTop:".4rem"},children:[e.jsx("button",{style:S.mbtn,onClick:()=>setSub(null),children:__T("◀ Geri")}),e.jsx("button",{style:S.mbtn,onClick:()=>{setDetail(null);setSub(null)},children:__T("Kapat")})]})]})})():e.jsxs(R.Fragment,{children:[
      e.jsx("h3",{style:{fontWeight:800,fontSize:"1.2rem"},children:detail.name}),
      e.jsxs("div",{style:{color:P.muted,fontWeight:700,marginBottom:".3rem"},children:[catName(detail.cat)," · Toplam ",e.jsx("strong",{style:{color:P.amber},children:f3(detail.C.fin)})]}),
      e.jsx("div",{style:S.grid,children:cards(detail).map(c=>e.jsxs("div",{style:S.card,onClick:()=>setSub({dt:c.dt,it:detail}),children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:".4rem",fontSize:".75rem",fontWeight:800,color:P.muted},children:[e.jsx("span",{style:{width:24,height:24,borderRadius:7,background:BC[c.k],color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800},children:c.k})]}),e.jsx("div",{style:{fontSize:"1.7rem",fontWeight:800,marginTop:".35rem"},children:c.v})]},c.dt))}),
      e.jsx("button",{style:{...S.mbtn,width:"100%",marginTop:".7rem"},onClick:()=>setDetail(null),children:__T("Kapat")})
    ]})
  ]})})
 ]});
}
export{TeknikKurul as default};
