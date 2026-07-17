import{b as usToast,a as usInit,j as e,d as db}from"./main-C2LpyYUGCb2.js";import{f as usParams,r as R}from"./vendor-react-Cxw6bqwhCb2.js";import{k as ref,l as get,o as onValue,m as update,v as fset}from"./vendor-firebase-940mxgRVCb2.js";import{v as verifyToken}from"./epanelToken-BoF3UjP2Cb2.js";import"./modulepreload-polyfill-B5Qt9EMXCb2.js";

const BASE="aerobik_yarismalar";
const f2=v=>v==null||isNaN(v)?"—":Number(v).toFixed(2);
const f3=v=>v==null||isNaN(v)?"—":Number(v).toFixed(3);
const CRIT={artisticRoutine:"Artistik Rutin",content2:"İçerik 2",generalContent:"Genel İçerik",music:"Müzik",performance:"Performans"};
const nice=k=>CRIT[k]||k.replace(/([A-Z])/g," $1").replace(/^./,c=>c.toUpperCase());
function trimA(o){if(!o)return null;const v=["j1","j2","j3","j4"].map(k=>o[k]).filter(x=>x!=null&&!isNaN(x));if(!v.length)return null;if(v.length<2)return v[0];if(v.length===4){v.sort((x,y)=>x-y);return(v[1]+v[2])/2}return v.reduce((a,b)=>a+b,0)/v.length}
function calcE(o){if(!o)return null;const v=["j1","j2","j3","j4"].map(k=>o[k]).filter(x=>x!=null&&!isNaN(x));if(!v.length)return null;let m;if(v.length===4){const s=[...v].sort((x,y)=>x-y);m=(s[1]+s[2])/2}else m=v.reduce((a,b)=>a+b,0)/v.length;return 10-m}
function comps6(sc){const d=sc.dScore!=null?sc.dScore:null,a=sc.aScore!=null?sc.aScore:trimA(sc.aPanel),ee=sc.eScore!=null?sc.eScore:calcE(sc.ePanel),p=sc.penalty!=null?sc.penalty:(sc.totalPenalties!=null?sc.totalPenalties:0),l=sc.lPanel!=null?(typeof sc.lPanel=="object"?(sc.lPanel.totalDeduction??sc.lPanel.deduction):sc.lPanel):null,t=sc.tPanel!=null?(typeof sc.tPanel=="object"?sc.tPanel.deduction:sc.tPanel):null,fin=sc.finalScore!=null?sc.finalScore:(sc.sonuc!=null?sc.sonuc:((d||0)+(a||0)+(ee||0)-(p||0)));return{d,a,e:ee,p,l,t,fin}}

function UstJuri(){
 const{toast}=usToast();usInit();
 const[sp]=usParams();
 const comp=sp.get("competitionId"),token=sp.get("token");
 const[authed,setAuthed]=R.useState(!1),[loading,setLoading]=R.useState(!0);
 const[pun,setPun]=R.useState({}),[spor,setSpor]=R.useState({}),[cats,setCats]=R.useState({}),[compName,setCompName]=R.useState("Yarışma");
 const[detail,setDetail]=R.useState(null),[reject,setReject]=R.useState(null),[note,setNote]=R.useState(""),[busy,setBusy]=R.useState(!1);
 const[itr,setItr]=R.useState({}),[showItr,setShowItr]=R.useState(!1);

 R.useEffect(()=>{if(!comp||!token){setLoading(!1),setAuthed(!1);return}get(ref(db,`${BASE}/${comp}/epanelToken`)).then(s=>{const v=s.val();setAuthed(v?verifyToken(token,v):!1)}).catch(()=>setAuthed(!1)).finally(()=>setLoading(!1))},[comp,token]);
 R.useEffect(()=>{if(!comp||!authed)return;const u1=onValue(ref(db,`${BASE}/${comp}/puanlar`),s=>setPun(s.val()||{}));const u2=onValue(ref(db,`${BASE}/${comp}/sporcular`),s=>setSpor(s.val()||{}));const u3=onValue(ref(db,`${BASE}/${comp}/kategoriler`),s=>setCats(s.val()||{}));const u4=onValue(ref(db,`${BASE}/${comp}/isim`),s=>setCompName(s.val()||"Yarışma"));const u5=onValue(ref(db,`${BASE}/${comp}/itirazlar`),s=>setItr(s.val()||{}));return()=>{u1(),u2(),u3(),u4(),u5()}},[comp,authed]);

 const catName=c=>cats[c]?.name||c;
 const nmeta=(cat,ath)=>{const cm=spor[cat]||{},i=cm[ath];
  if(i)return{name:[i.ad,i.soyad].filter(Boolean).join(" ")||ath,club:i.il||i.okul||i.kulup||"",ad:i.ad||"",soyad:i.soyad||"",okul:i.okul||i.kulup||"",il:i.il||""};
  const parts=String(ath).split("::"),gn=parts[parts.length-1],ok=parts.length>=3?parts.slice(1,-1).join("::"):"";
  const mem=Object.values(cm).filter(m=>m&&String(m.grupNo??m.cikisSirasi??"")===String(gn)&&(ok===""||String(m.okul||m.kulup||"")===ok));
  const nm=mem.map(m=>[m.ad,m.soyad].filter(Boolean).join(" ")).filter(Boolean).join(", ");const g0=mem[0]||{};
  return{name:nm||ath,club:g0.il||g0.okul||g0.kulup||"",ad:g0.ad||"",soyad:g0.soyad||"",okul:g0.okul||g0.kulup||"",il:g0.il||""}};
 const pending=[];
 Object.entries(pun).forEach(([cat,aths])=>{if(!aths||typeof aths!="object")return;Object.entries(aths).forEach(([ath,sc])=>{if(sc&&typeof sc=="object"&&sc.durum==="ustJuriBekliyor"){const m=nmeta(cat,ath);pending.push({cat,ath,sc,C:comps6(sc),name:m.name,club:m.club,ad:m.ad,soyad:m.soyad,okul:m.okul,il:m.il,ts:sc.timestamp||0})}})});
 pending.sort((a,b)=>String(a.ts).localeCompare(String(b.ts)));
 const itlist=Object.entries(itr).filter(([,v])=>v&&typeof v=="object"&&["accepted","rejected","resolved"].indexOf(v.status)<0).map(([k,v])=>({k,...v})).sort((a,b)=>(b.ts||0)-(a.ts||0));
 const itColor=t=>t==="D"?"#8b5cf6":t==="A"?"#ec4899":"#10b981";
 const resolveItr=async(it,verdict)=>{try{await update(ref(db,`${BASE}/${comp}/itirazlar/${it.k}`),{status:verdict,resolvedAt:Date.now()});await fset(ref(db,`${BASE}/${comp}/flashTrigger`),{isAerobik:!0,itiraz:verdict,adSoyad:it.athName,kulup:"",aletAd:it.catName||catName(it.catId||""),scoreType:it.scoreType||"D",timestamp:Date.now()});toast(it.athName+(verdict==="accepted"?" — itiraz KABUL edildi":" — itiraz reddedildi"),"success")}catch{toast("Hata oluştu.","error")}};

 const approve=async it=>{if(busy)return;setBusy(!0);try{await update(ref(db,`${BASE}/${comp}/puanlar/${it.cat}/${it.ath}`),{durum:"tamamlandi",kilitli:!0,ustJuriOnay:Date.now()});await fset(ref(db,`${BASE}/${comp}/aktifSporcu/${it.cat}`),null);await fset(ref(db,`${BASE}/${comp}/aktifSporcuBilgi/${it.cat}`),null);try{await fset(ref(db,`${BASE}/${comp}/flashTrigger`),{adSoyad:it.name,kulup:it.club,aletAd:catName(it.cat),isAerobik:!0,d:it.C.d||0,a:it.C.a||0,e:it.C.e||0,p:it.C.p||0,l:it.C.l||0,t:it.C.t||0,total:it.C.fin||0,timestamp:Date.now()})}catch{}toast(it.name+" onaylandı ve yayınlandı ✓","success")}catch{toast("Hata oluştu.","error")}setBusy(!1)};
 const doReject=async()=>{if(busy||!reject)return;setBusy(!0);const it=reject;try{const caller=it.sc.callerId||"";await update(ref(db,`${BASE}/${comp}/puanlar/${it.cat}/${it.ath}`),{durum:"scoring",kilitli:!1,ustJuriRedNote:note||"",ustJuriRed:Date.now()});if(caller)await fset(ref(db,`${BASE}/${comp}/redNotlari/${caller}/${it.cat}__${it.ath}`),{catId:it.cat,catName:catName(it.cat),athId:it.ath,athName:it.name,ad:it.ad||"",soyad:it.soyad||"",okul:it.okul||"",il:it.il||"",note:note||"",ts:Date.now(),seen:!1});toast(it.name+" başhakeme geri gönderildi ↩"+(caller?"":" (çağıran cihaz bilinmiyor — not yalnız kayıtta)"),caller?"success":"warning");setReject(null);setNote("")}catch{toast("Hata oluştu.","error")}setBusy(!1)};

 const S={wrap:{minHeight:"100vh",background:"#0a0e1a",color:"#e8edf7",fontFamily:"'Plus Jakarta Sans',system-ui,sans-serif",paddingBottom:"2rem"},
  top:{position:"sticky",top:0,zIndex:10,background:"rgba(10,14,26,.92)",backdropFilter:"blur(10px)",borderBottom:"1px solid #2a3550",padding:".8rem 1.1rem",display:"flex",alignItems:"center",gap:"1rem",flexWrap:"wrap"},
  wrapIn:{maxWidth:900,margin:"0 auto",padding:"1rem"},
  card:{background:"#131a2b",border:"1px solid #2a3550",borderRadius:16,padding:"1rem 1.2rem",marginBottom:".9rem"},
  chead:{display:"flex",alignItems:"center",gap:".8rem",flexWrap:"wrap"},
  nm:{fontSize:"1.2rem",fontWeight:800},meta:{color:"#8b97b3",fontWeight:700,fontSize:".82rem"},
  kat:{background:"#1b2438",border:"1px solid #2a3550",borderRadius:999,padding:".3rem .8rem",fontWeight:800,fontSize:".8rem"},
  fin:{marginLeft:"auto",background:"linear-gradient(135deg,#6366f1,#0891b2)",borderRadius:12,padding:".4rem 1rem",textAlign:"center"},
  mini:{display:"flex",gap:".8rem",flexWrap:"wrap",margin:".7rem 0",fontSize:".8rem",color:"#8b97b3",fontWeight:700},
  acts:{display:"flex",gap:".6rem",flexWrap:"wrap"},
  btn:{flex:1,minWidth:130,padding:".8rem",border:"none",borderRadius:12,fontWeight:800,fontSize:"1rem",cursor:"pointer",color:"#fff"},
  approve:{background:"linear-gradient(135deg,#16a34a,#22c55e)"},reject:{background:"#1b2438",border:"1px solid #ef4444",color:"#fca5a5"},detailB:{background:"#1b2438",border:"1px solid #2a3550",color:"#e8edf7",flex:"0 0 auto",minWidth:90},
  ov:{position:"fixed",inset:0,background:"rgba(0,0,0,.65)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:60,padding:"1rem"},
  mcard:{background:"#131a2b",border:"1px solid #2a3550",borderRadius:16,padding:"1.3rem",width:"100%",maxWidth:560,maxHeight:"88vh",overflow:"auto"},
  center:{maxWidth:560,margin:"3rem auto 0",textAlign:"center",color:"#8b97b3",fontWeight:700,padding:"2rem 1rem"},
  jrow:{background:"#1b2438",border:"1px solid #2a3550",borderRadius:10,padding:".6rem .8rem",marginBottom:".5rem"},
  ta:{width:"100%",minHeight:90,background:"#1b2438",border:"1px solid #2a3550",borderRadius:10,color:"#e8edf7",padding:".7rem",font:"inherit",fontSize:".95rem",marginTop:".5rem"}};

 if(!comp)return e.jsx("div",{style:S.wrap,children:e.jsx("div",{style:S.center,children:"Hatalı link."})});
 if(loading)return e.jsx("div",{style:S.wrap,children:e.jsx("div",{style:S.center,children:"Doğrulanıyor…"})});
 if(!authed)return e.jsx("div",{style:S.wrap,children:e.jsxs("div",{style:S.center,children:[e.jsx("h2",{children:"Yetkisiz Erişim"}),e.jsx("p",{children:"Geçersiz/süresi dolmuş bağlantı."})]})});

 const dcards=it=>{const C=it.C;return[["D",f2(C.d)],["A",f2(C.a)],["E",f3(C.e)],["P",C.p?"−"+f2(C.p):"0.00"],["L",C.l!=null?"−"+f2(C.l):"—"],["T",C.t!=null?"−"+f2(C.t):"—"]]};
 const brk=it=>e.jsxs("div",{style:{marginTop:".3rem"},children:[
   e.jsx("div",{style:S.jrow,children:e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontWeight:800},children:[e.jsx("span",{children:"A Hakemleri (artistik)"}),e.jsxs("span",{style:{color:"#fbbf24"},children:["ort ",f2(it.C.a)]})]})}),
   e.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:".4rem",marginBottom:".6rem"},children:["j1","j2","j3","j4"].map(j=>e.jsxs("span",{style:{background:"#1b2438",border:"1px solid #2a3550",borderRadius:6,padding:".2rem .5rem",fontSize:".8rem",fontWeight:700},children:["A",j.replace("j","")," ",f2(it.sc.aPanel?.[j])]},j))}),
   e.jsx("div",{style:S.jrow,children:e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontWeight:800},children:[e.jsx("span",{children:"E Hakemleri (kesinti)"}),e.jsxs("span",{style:{color:"#fbbf24"},children:["icra ",f3(it.C.e)]})]})}),
   e.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:".4rem",marginBottom:".6rem"},children:["j1","j2","j3","j4"].map(j=>e.jsxs("span",{style:{background:"#1b2438",border:"1px solid #2a3550",borderRadius:6,padding:".2rem .5rem",fontSize:".8rem",fontWeight:700},children:["E",j.replace("j","")," −",f2(it.sc.ePanel?.[j])]},j))}),
   e.jsx("div",{style:S.jrow,children:e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontWeight:800},children:[e.jsx("span",{children:"D — Zorluk"}),e.jsxs("span",{style:{color:"#fbbf24"},children:["ham ",f2(it.sc.dPanel?.rawTotal)," · D ",f3(it.C.d)]})]})}),
   e.jsxs("div",{style:{...S.jrow,display:"flex",gap:"1.2rem",flexWrap:"wrap",fontWeight:700},children:[e.jsxs("span",{children:["Ceza/Nötr: ",e.jsx("b",{children:it.C.p?"−"+f2(it.C.p):"0.00"})]}),e.jsxs("span",{children:["Çizgi: ",e.jsx("b",{children:it.C.l!=null?"−"+f2(it.C.l):"—"})]}),e.jsxs("span",{children:["Süre: ",e.jsx("b",{children:it.C.t!=null?"−"+f2(it.C.t):"—"})]})]})
 ]});

 return e.jsxs("div",{style:S.wrap,children:[
  e.jsxs("div",{style:S.top,children:[e.jsx("span",{className:"material-icons-round",style:{color:"#fbbf24"},children:"gavel"}),e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:".8rem",color:"#8b97b3",fontWeight:700},children:compName}),e.jsx("div",{style:{fontWeight:800,fontSize:"1.05rem"},children:"ÜST JÜRİ — Onay"})]}),e.jsxs("div",{style:{marginLeft:"auto",background:pending.length?"rgba(251,191,36,.15)":"rgba(34,197,94,.12)",color:pending.length?"#fbbf24":"#86efac",fontWeight:800,padding:".4rem .9rem",borderRadius:999},children:[pending.length," onay bekliyor"]})]}),
  e.jsxs("div",{style:S.wrapIn,children:[
   itlist.length>0?e.jsxs("div",{style:{background:"rgba(244,63,94,.1)",border:"1px solid #f43f5e",borderRadius:14,padding:".9rem 1.1rem",marginBottom:"1rem"},children:[
     e.jsxs("div",{onClick:()=>setShowItr(v=>!v),style:{display:"flex",alignItems:"center",gap:".6rem",cursor:"pointer",fontWeight:800},children:[e.jsx("span",{style:{fontSize:"1.2rem"},children:"⚖️"}),e.jsxs("span",{style:{color:"#fca5a5"},children:[itlist.length," adet itiraz var"]}),e.jsx("span",{style:{color:"#8b97b3",fontWeight:700,fontSize:".85rem"},children:"— detaylar için tıklayın"}),e.jsx("span",{style:{marginLeft:"auto",color:"#8b97b3"},children:showItr?"▲":"▼"})]}),
     showItr?e.jsx("div",{style:{marginTop:".7rem",display:"flex",flexDirection:"column",gap:".5rem"},children:itlist.map(it=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:".7rem",flexWrap:"wrap",background:"#1b2438",border:"1px solid #2a3550",borderRadius:10,padding:".6rem .8rem"},children:[e.jsx("span",{style:{fontWeight:800,fontSize:"1.2rem",minWidth:34,height:34,display:"flex",alignItems:"center",justifyContent:"center",borderRadius:8,color:"#fff",background:itColor(it.scoreType)},children:it.scoreType}),e.jsxs("div",{style:{minWidth:0},children:[e.jsx("div",{style:{fontWeight:800},children:it.athName}),e.jsxs("div",{style:{color:"#8b97b3",fontWeight:700,fontSize:".78rem"},children:[it.catName," · ",it.scoreType," puanına itiraz"]})]}),e.jsxs("div",{style:{marginLeft:"auto",display:"flex",gap:".4rem"},children:[e.jsx("button",{onClick:()=>resolveItr(it,"accepted"),style:{padding:".5rem .8rem",border:"1px solid #16a34a",borderRadius:9,fontWeight:800,cursor:"pointer",color:"#86efac",background:"rgba(22,163,74,.12)"},children:"✓ Kabul"}),e.jsx("button",{onClick:()=>resolveItr(it,"rejected"),style:{padding:".5rem .8rem",border:"1px solid #ef4444",borderRadius:9,fontWeight:800,cursor:"pointer",color:"#fca5a5",background:"rgba(239,68,68,.12)"},children:"✗ Reddet"})]})]},it.k))}):null
   ]}):null,
   pending.length===0?e.jsxs("div",{style:S.center,children:[e.jsx("div",{style:{fontSize:"2.4rem",marginBottom:".5rem"},children:"✓"}),e.jsx("div",{children:"Onay bekleyen sporcu yok."}),e.jsx("p",{style:{marginTop:".4rem",fontSize:".85rem"},children:"Başhakem puan gönderdikçe burada listelenecek."})]}):
   pending.map(it=>e.jsxs("div",{style:S.card,children:[
     e.jsxs("div",{style:S.chead,children:[e.jsxs("div",{children:[e.jsx("div",{style:S.nm,children:it.name}),e.jsx("div",{style:S.meta,children:it.club||"—"})]}),e.jsx("div",{style:S.kat,children:catName(it.cat)}),e.jsxs("div",{style:S.fin,children:[e.jsx("div",{style:{fontSize:".6rem",fontWeight:800,opacity:.85},children:"TOPLAM"}),e.jsx("div",{style:{fontSize:"1.5rem",fontWeight:800},children:f3(it.C.fin)})]})]}),
     e.jsx("div",{style:S.mini,children:dcards(it).map(([k,v])=>e.jsxs("span",{children:[k," ",e.jsx("b",{style:{color:"#e8edf7"},children:v})]},k))}),
     brk(it),
     e.jsxs("div",{style:S.acts,children:[
       e.jsx("button",{style:{...S.btn,...S.reject},onClick:()=>{setReject(it);setNote("")},children:"↩ Geri Gönder"}),
       e.jsx("button",{style:{...S.btn,...S.approve},disabled:busy,onClick:()=>approve(it),children:"✓ Onayla ve Yayınla"})
     ]})
   ]},it.cat+"/"+it.ath))
  ]}),
  detail&&e.jsx("div",{style:S.ov,onClick:ev=>{if(ev.target===ev.currentTarget)setDetail(null)},children:e.jsxs("div",{style:S.mcard,children:[
    e.jsx("h3",{style:{fontWeight:800,fontSize:"1.15rem"},children:detail.name}),
    e.jsxs("div",{style:{color:"#8b97b3",fontWeight:700,marginBottom:".8rem"},children:[catName(detail.cat)," · Toplam ",e.jsx("strong",{style:{color:"#fbbf24"},children:f3(detail.C.fin)})]}),
    e.jsx("div",{style:{...S.jrow},children:e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontWeight:800},children:[e.jsx("span",{children:"A Hakemleri (artistik)"}),e.jsxs("span",{style:{color:"#fbbf24"},children:["ort ",f2(detail.C.a)]})]})}),
    e.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:".4rem",marginBottom:".6rem"},children:["j1","j2","j3","j4"].map(j=>e.jsxs("span",{style:{background:"#1b2438",border:"1px solid #2a3550",borderRadius:6,padding:".2rem .5rem",fontSize:".8rem",fontWeight:700},children:["A",j.replace("j","")," ",f2(detail.sc.aPanel?.[j])]},j))}),
    e.jsx("div",{style:{...S.jrow},children:e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontWeight:800},children:[e.jsx("span",{children:"E Hakemleri (kesinti)"}),e.jsxs("span",{style:{color:"#fbbf24"},children:["icra ",f3(detail.C.e)]})]})}),
    e.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:".4rem",marginBottom:".6rem"},children:["j1","j2","j3","j4"].map(j=>e.jsxs("span",{style:{background:"#1b2438",border:"1px solid #2a3550",borderRadius:6,padding:".2rem .5rem",fontSize:".8rem",fontWeight:700},children:["E",j.replace("j","")," −",f2(detail.sc.ePanel?.[j])]},j))}),
    e.jsx("div",{style:{...S.jrow},children:e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontWeight:800},children:[e.jsx("span",{children:"D — Zorluk"}),e.jsxs("span",{style:{color:"#fbbf24"},children:["ham ",f2(detail.sc.dPanel?.rawTotal)," · D ",f3(detail.C.d)]})]})}),
    e.jsxs("div",{style:{...S.jrow,display:"flex",gap:"1.2rem",fontWeight:700},children:[e.jsxs("span",{children:["Ceza/Nötr: ",e.jsx("b",{children:detail.C.p?"−"+f2(detail.C.p):"0.00"})]}),e.jsxs("span",{children:["Çizgi: ",e.jsx("b",{children:detail.C.l!=null?"−"+f2(detail.C.l):"—"})]}),e.jsxs("span",{children:["Süre: ",e.jsx("b",{children:detail.C.t!=null?"−"+f2(detail.C.t):"—"})]})]}),
    e.jsx("button",{style:{...S.btn,...S.detailB,width:"100%",marginTop:".4rem"},onClick:()=>setDetail(null),children:"Kapat"})
  ]})}),
  reject&&e.jsx("div",{style:S.ov,onClick:ev=>{if(ev.target===ev.currentTarget)setReject(null)},children:e.jsxs("div",{style:S.mcard,children:[
    e.jsxs("h3",{style:{fontWeight:800,fontSize:"1.1rem"},children:["↩ Geri Gönder — ",reject.name]}),
    e.jsx("div",{style:{color:"#8b97b3",fontWeight:700,marginBottom:".3rem"},children:catName(reject.cat)+" · sporcuyu çağıran bilgisayara not gönderilecek"}),
    e.jsx("textarea",{style:S.ta,placeholder:"Düzeltme notu (ör. E puanlarını kontrol edin)…",value:note,onChange:ev=>setNote(ev.target.value)}),
    e.jsxs("div",{style:{display:"flex",gap:".6rem",marginTop:".7rem"},children:[
      e.jsx("button",{style:{...S.btn,...S.detailB,flex:1},onClick:()=>setReject(null),children:"Vazgeç"}),
      e.jsx("button",{style:{...S.btn,...S.reject,flex:1},disabled:busy,onClick:doReject,children:"Geri Gönder"})
    ]})
  ]})})
 ]});
}
export{UstJuri as default};
