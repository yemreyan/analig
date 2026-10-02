import{useAktifKategori as _uAK}from"./judgeLinkGroup-Jl01a2b3Cb2.js";import"./i18n-Tr01a2b3Cb2.js";import{b as usToast,a as usInit,j as e,d as db}from"./main-C2LpyYUGCb2.js";import{f as usParams,r as R}from"./vendor-react-Cxw6bqwhCb2.js";import{k as ref,l as get,o as onValue,m as update,v as fset}from"./vendor-firebase-940mxgRVCb2.js";import{v as verifyToken}from"./epanelToken-BoF3UjP2Cb2.js";import"./modulepreload-polyfill-B5Qt9EMXCb2.js";

const BASE="aerobik_yarismalar",GAP_LIMIT=.5;
function trimA(o){if(!o)return null;const v=["j1","j2","j3","j4"].map(k=>o[k]).filter(x=>x!=null&&!isNaN(x));if(!v.length)return null;if(v.length<2)return v[0];if(v.length===4){v.sort((x,y)=>x-y);return(v[1]+v[2])/2}return v.reduce((a,b)=>a+b,0)/v.length}
function calcE(o){if(!o)return null;const v=["j1","j2","j3","j4"].map(k=>o[k]).filter(x=>x!=null&&!isNaN(x));if(!v.length)return null;let m;if(v.length===4){const s=[...v].sort((x,y)=>x-y);m=(s[1]+s[2])/2}else m=v.reduce((a,b)=>a+b,0)/v.length;return 10-m}
function trimDed(o){const e=calcE(o);return e==null?null:Math.round((10-e)*100)/100}
const f2=v=>v==null||isNaN(v)?"—":Number(v).toFixed(2);
const CFG={
 sja:{badge:"SJA",title:__T("Artistik"),color:"#ec4899",letter:"a",label:__T("SJA Referans Notu (Artistik)"),avg:sc=>trimA(sc.aPanel),avgLabel:"A Panel Ort.",has:sc=>sc.aPanel&&Object.keys(sc.aPanel).length>0,judges:sc=>{const o=sc.aPanel||{};return[["A1","a1",o.j1],["A2","a2",o.j2],["A3","a3",o.j3],["A4","a4",o.j4]]}},
 sje:{badge:"SJE",title:__T("İcra"),color:"#10b981",letter:"e",label:__T("SJE Referans Kesintisi (İcra)"),avg:sc=>trimDed(sc.ePanel),avgLabel:"E Panel Kesinti",has:sc=>sc.ePanel&&Object.keys(sc.ePanel).length>0,judges:sc=>{const o=sc.ePanel||{};return[["E1","e1",o.j1],["E2","e2",o.j2],["E3","e3",o.j3],["E4","e4",o.j4]]}},
 sjd:{badge:"SJD",title:__T("Zorluk"),color:"#8b5cf6",letter:"d",label:__T("SJD Referans (D Değeri)"),avg:sc=>sc.dPanel&&sc.dPanel.rawTotal!=null?sc.dPanel.rawTotal:(sc.dScore!=null?sc.dScore:null),avgLabel:"D Panel Ham",has:sc=>(sc.dPanel&&sc.dPanel.rawTotal!=null)||sc.dScore!=null,judges:sc=>[["D Hakemi","d",sc.dPanel&&sc.dPanel.rawTotal!=null?sc.dPanel.rawTotal:(sc.dScore!=null?sc.dScore:null)]]}
};

function SJPanel(){
 const{toast}=usToast();usInit();
 const[sp]=usParams();
 const comp=sp.get("competitionId"),catId=sp.get("catId"),token=sp.get("token");
 const pt=sp.get("panelType")||"sja",cfg=CFG[pt]||CFG.sja;
 const _lid=sp.get("linkId"),_g=_uAK(BASE,comp,catId,_lid),allCat=_g.tumu,catList=_g.kume;
 const[authed,setAuthed]=R.useState(!1),[loading,setLoading]=R.useState(!0);
 const[pun,setPun]=R.useState({}),[spor,setSpor]=R.useState({}),[cats,setCats]=R.useState({}),[compName,setCompName]=R.useState("Yarışma"),[active,setActive]=R.useState({});
 const[notes,setNotes]=R.useState({}),[warned,setWarned]=R.useState({}),[order,setOrder]=R.useState({});

 R.useEffect(()=>{if(!comp||!token){setLoading(!1),setAuthed(!1);return}get(ref(db,`${BASE}/${comp}/epanelToken`)).then(s=>{const v=s.val();setAuthed(v?verifyToken(token,v):!1)}).catch(()=>setAuthed(!1)).finally(()=>setLoading(!1))},[comp,token]);
 R.useEffect(()=>{if(!comp||!authed)return;const u1=onValue(ref(db,`${BASE}/${comp}/puanlar`),s=>setPun(s.val()||{}));const u2=onValue(ref(db,`${BASE}/${comp}/sporcular`),s=>setSpor(s.val()||{}));const u3=onValue(ref(db,`${BASE}/${comp}/kategoriler`),s=>setCats(s.val()||{}));const u4=onValue(ref(db,`${BASE}/${comp}/isim`),s=>setCompName(s.val()||"Yarışma"));const u5=onValue(ref(db,`${BASE}/${comp}/aktifSporcu`),s=>setActive(s.val()||{}));return()=>{u1(),u2(),u3(),u4(),u5()}},[comp,authed]);

 const catName=c=>cats[c]?.name||c;
 const nmeta=(cat,ath)=>{const cm=spor[cat]||{},i=cm[ath];if(i)return{name:[i.ad,i.soyad].filter(Boolean).join(" ")||i.adSoyad||ath,club:i.il||i.okul||i.kulup||""};const parts=String(ath).split("::"),gn=parts[parts.length-1],ok=parts.length>=3?parts.slice(1,-1).join("::"):"";const mem=Object.values(cm).filter(m=>m&&String(m.grupNo??m.cikisSirasi??"")===String(gn)&&(ok===""||String(m.okul||m.kulup||"")===ok));const nm=mem.map(m=>[m.ad,m.soyad].filter(Boolean).join(" ")||m.adSoyad).filter(Boolean).join(", ");return{name:nm||ath,club:mem[0]?.il||mem[0]?.okul||mem[0]?.kulup||""}};
 const allowed=c=>allCat||catList.includes(c)||catList.includes(c.replace(/^final_/,""));
 const finalized=sc=>sc.kilitli===!0||sc.durum==="tamamlandi";
 // aktif sporcu (max-ts, izinli)
 let activeKey="";{let bt=-1;Object.entries(active).forEach(([c,v])=>{if(allowed(c)&&v&&(v.ts||0)>=bt&&v.id){bt=v.ts||0;activeKey=c+"/"+v.id}})}
 // kuyruk: izinli, finalize olmamış, panel verisi olan (veya aktif) sporcular
 const queue=[];const seen={};
 Object.entries(pun).forEach(([cat,aths])=>{if(!allowed(cat)||!aths||typeof aths!="object")return;Object.entries(aths).forEach(([ath,sc])=>{if(!sc||typeof sc!="object"||finalized(sc))return;const key=cat+"/"+ath;if(cfg.has(sc)||key===activeKey){seen[key]=1;const m=nmeta(cat,ath);queue.push({key,cat,ath,sc,name:m.name,club:m.club,isActive:key===activeKey})}})});
 if(activeKey&&!seen[activeKey]){const[c,a]=activeKey.split("/");if(allowed(c)){const m=nmeta(c,a);queue.push({key:activeKey,cat:c,ath:a,sc:(pun[c]&&pun[c][a])||{},name:m.name,club:m.club,isActive:!0})}}
 // geliş sırasına göre (yeni gelen en alta), henüz sıralanmamışlar en sonda
 queue.sort((x,y)=>{const ox=order[x.key]??1e9,oy=order[y.key]??1e9;return ox!==oy?ox-oy:String(x.name).localeCompare(String(y.name),"tr-TR")});

 // yeni sporcu kuyruğa girince: geliş sırasını sabitle + kaydedilmiş SJ notunu bir kez yükle (yazılanı ezmeden)
 const qKeys=queue.map(q=>q.key).join(",");
 R.useEffect(()=>{
  setOrder(prev=>{const n={...prev};let mx=Object.values(prev).reduce((a,b)=>Math.max(a,b),0);queue.forEach(q=>{if(!(q.key in n)){mx+=1;n[q.key]=mx}});return n});
  setNotes(prev=>{const n={...prev};queue.forEach(q=>{if(!(q.key in n)){const sj=q.sc.sjPanel&&q.sc.sjPanel[cfg.letter];n[q.key]=sj&&sj.value!=null?String(sj.value):""}});return n});
 },[qKeys]);

 const noteOf=k=>notes[k]??"";
 const setNoteFor=(k,v)=>setNotes(p=>({...p,[k]:v}));
 const bump=(k,d)=>setNotes(p=>{const c=parseFloat(p[k])||0;return{...p,[k]:String(Math.max(0,Math.round((c+d)*100)/100))}});
 const save=async q=>{const raw=noteOf(q.key);if(raw===""){toast("Önce referans notunuzu girin.","error");return}const val=parseFloat(raw);if(isNaN(val)){toast("Geçersiz not.","error");return}const av=cfg.avg(q.sc),gp=av==null?null:Math.abs(val-av);try{await update(ref(db,`${BASE}/${comp}/puanlar/${q.cat}/${q.ath}/sjPanel`),{[cfg.letter]:{value:val,panelValue:av,gap:gp,ts:Date.now()}});toast(q.name+" — SJ notu kaydedildi ✓","success")}catch{toast("Hata oluştu.","error")}};
 const warn=async(q,target,lbl)=>{const wk=q.key+"|"+target;try{await fset(ref(db,`${BASE}/${comp}/refereeCalls/${q.cat}/${q.ath}/${target}`),{ts:Date.now(),fromRole:pt});setWarned(w=>({...w,[wk]:Date.now()}));setTimeout(()=>setWarned(w=>{const n={...w};delete n[wk];return n}),3e3);toast(lbl+" uyarıldı ⚠️","success")}catch{toast("Uyarı gönderilemedi.","error")}};

 const S={wrap:{minHeight:"100vh",background:"radial-gradient(1200px 600px at 50% -10%,#111a30 0%,#0a0e1a 60%)",color:"#e8edf7",fontFamily:"'Plus Jakarta Sans',system-ui,sans-serif",paddingBottom:"2rem"},
  top:{position:"sticky",top:0,zIndex:10,background:"rgba(10,14,26,.9)",backdropFilter:"blur(12px)",borderBottom:"1px solid #2a3550",padding:".8rem 1.1rem",display:"flex",alignItems:"center",justifyContent:"space-between",gap:".6rem"},
  ico:{width:38,height:38,borderRadius:11,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,background:"linear-gradient(135deg,"+cfg.color+",#0891b2)",boxShadow:"0 6px 18px rgba(99,102,241,.3)"},
  badge:{background:cfg.color,color:"#fff",fontWeight:800,fontSize:"1rem",padding:".4rem .85rem",borderRadius:999,boxShadow:"0 4px 14px "+cfg.color+"55"},
  in:{maxWidth:560,margin:"0 auto",padding:"1rem"},
  qlbl:{fontSize:".75rem",fontWeight:800,color:"#8b97b3",textTransform:"uppercase",letterSpacing:".04em",margin:".2rem 0 .5rem"},
  qrow:on=>({display:"flex",alignItems:"center",gap:".7rem",padding:".6rem .8rem",borderRadius:11,marginBottom:".4rem",cursor:"pointer",border:"1px solid "+(on?cfg.color:"#2a3550"),background:on?"rgba(99,102,241,.10)":"#131a2b"}),
  qn:{flex:1,minWidth:0},
  card:{maxWidth:560,margin:".6rem auto 0",background:"#131a2b",border:"1px solid #2a3550",borderRadius:16,padding:"1.1rem"},
  ath:{background:"#1b2438",border:"1px solid #2a3550",borderRadius:12,padding:".8rem 1rem",marginBottom:".9rem"},
  nm:{fontSize:"1.3rem",fontWeight:800},meta:{color:"#8b97b3",fontWeight:700,fontSize:".82rem",marginTop:".15rem"},
  inlbl:{fontSize:".8rem",fontWeight:800,color:"#8b97b3",textTransform:"uppercase",letterSpacing:".04em",margin:".2rem 0 .4rem"},
  numw:{display:"flex",gap:".6rem",alignItems:"center"},
  nbtn:{width:52,height:52,border:"1px solid #2a3550",background:"#1b2438",color:"#e8edf7",borderRadius:12,fontSize:"1.5rem",fontWeight:800,cursor:"pointer"},
  ninp:{flex:1,textAlign:"center",fontSize:"1.9rem",fontWeight:800,background:"#1b2438",border:"1px solid #2a3550",borderRadius:12,color:"#e8edf7",padding:".5rem"},
  save:{width:"100%",padding:".85rem",border:"none",borderRadius:12,fontWeight:800,fontSize:"1.02rem",cursor:"pointer",color:"#fff",background:"linear-gradient(135deg,#6366f1,#818cf8)",marginTop:".7rem"},
  jgrid:{display:"grid",gridTemplateColumns:pt==="sjd"?"1fr":"repeat(2,1fr)",gap:".55rem",marginTop:".3rem"},
  center:{maxWidth:560,margin:"3rem auto 0",textAlign:"center",color:"#8b97b3",fontWeight:700,padding:"2rem 1rem"}};

 if(!comp||!catId)return e.jsx("div",{style:S.wrap,children:e.jsx("div",{style:S.center,children:__T("Hatalı link.")})});
 if(loading)return e.jsx("div",{style:S.wrap,children:e.jsx("div",{style:S.center,children:__T("Doğrulanıyor…")})});
 if(!authed)return e.jsx("div",{style:S.wrap,children:e.jsxs("div",{style:S.center,children:[e.jsx("h2",{children:__T("Yetkisiz Erişim")}),e.jsx("p",{children:__T("Geçersiz/süresi dolmuş bağlantı.")})]})});

 return e.jsxs("div",{style:S.wrap,children:[
  e.jsxs("div",{style:S.top,children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:".7rem",minWidth:0},children:[e.jsx("div",{style:S.ico,children:e.jsx("span",{className:"material-icons-round",style:{color:"#fff",fontSize:"22px"},children:"verified_user"})}),e.jsxs("div",{style:{minWidth:0},children:[e.jsx("div",{style:{fontSize:".78rem",color:"#8b97b3",fontWeight:700,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:compName}),e.jsxs("div",{style:{fontWeight:800,fontSize:"1.02rem"},children:["SÜPER JÜRİ — ",cfg.title]})]})]}),e.jsx("div",{style:S.badge,children:cfg.badge})]}),
  e.jsxs("div",{style:S.in,children:[
   e.jsxs("div",{style:S.qlbl,children:["İnceleme Kuyruğu (",queue.length,") — hepsi aynı anda"]}),
   queue.length===0?e.jsxs("div",{style:S.center,children:[e.jsx("div",{style:{fontSize:"2rem",marginBottom:".5rem"},children:"⏳"}),e.jsx("div",{children:__T("İncelenecek sporcu yok.")}),e.jsx("p",{style:{marginTop:".4rem",fontSize:".85rem"},children:__T("Panel puan girdikçe sporcular burada listelenir.")})]}):
   queue.map((q,qi)=>{
    const av=cfg.avg(q.sc),judges=cfg.judges(q.sc),nv=noteOf(q.key),myNote=nv===""?null:parseFloat(nv),gap=av==null||myNote==null?null:Math.abs(myNote-av),saved=q.sc.sjPanel&&q.sc.sjPanel[cfg.letter];
    return e.jsxs("div",{style:S.card,children:[
     e.jsxs("div",{style:S.ath,children:[e.jsxs("div",{style:S.nm,children:[e.jsxs("span",{style:{color:"#6b7896",marginRight:".4rem"},children:["#",qi+1]}),q.name,q.isActive?e.jsx("span",{style:{marginLeft:".5rem",fontSize:".6rem",fontWeight:800,padding:".15rem .45rem",borderRadius:5,background:"rgba(34,197,94,.18)",color:"#86efac"},children:__T("AKTİF")}):null,saved?e.jsx("span",{style:{marginLeft:".4rem",fontSize:".6rem",fontWeight:800,padding:".15rem .45rem",borderRadius:5,background:"rgba(99,102,241,.18)",color:"#a5b4fc"},children:__T("NOTLANDI")}):null]}),e.jsx("div",{style:S.meta,children:catName(q.cat)+(q.club?" · "+q.club:"")})]}),
     e.jsx("div",{style:S.inlbl,children:cfg.label}),
     e.jsxs("div",{style:S.numw,children:[e.jsx("button",{style:S.nbtn,onClick:()=>bump(q.key,-.1),children:"−"}),e.jsx("input",{style:S.ninp,type:"number",step:"0.1",min:"0",value:nv,placeholder:"0.0",onChange:ev=>setNoteFor(q.key,ev.target.value)}),e.jsx("button",{style:S.nbtn,onClick:()=>bump(q.key,.1),children:"+"})]}),
     e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",margin:".7rem 0 .2rem",fontSize:".85rem",color:"#8b97b3",fontWeight:700},children:[e.jsxs("span",{children:[cfg.avgLabel,": ",e.jsx("strong",{style:{color:"#e8edf7"},children:f2(av)})]}),gap!=null&&e.jsxs("span",{style:{color:gap>GAP_LIMIT?"#fca5a5":"#86efac",fontWeight:800},children:["fark ",f2(gap)]})]}),
     e.jsx("button",{style:S.save,onClick:()=>save(q),children:__T("💾 SJ Notunu Kaydet")}),
     e.jsx("div",{style:{...S.inlbl,marginTop:"1rem"},children:__T("Hakem Notları — uyarı için nota dokunun")}),
     e.jsx("div",{style:S.jgrid,children:judges.map(([lbl,target,jn])=>{const diff=myNote==null||jn==null?null:Math.abs(myNote-jn),hi=diff!=null&&diff>GAP_LIMIT,wd=warned[q.key+"|"+target];return e.jsxs("button",{onClick:()=>warn(q,target,lbl),style:{textAlign:"left",padding:".65rem .8rem",borderRadius:12,cursor:"pointer",border:"1px solid "+(wd?"#f59e0b":hi?"#ef4444":"#2a3550"),background:wd?"rgba(245,158,11,.18)":hi?"rgba(239,68,68,.12)":"#1b2438",color:"#e8edf7"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsx("span",{style:{fontWeight:800},children:lbl}),e.jsx("span",{style:{fontSize:"1.25rem",fontWeight:800},children:f2(jn)})]}),e.jsx("div",{style:{fontSize:".7rem",fontWeight:700,marginTop:".2rem",color:wd?"#fbbf24":hi?"#fca5a5":"#8b97b3"},children:wd?"⚠️ uyarıldı":diff==null?"dokun → uyar":hi?"fark "+f2(diff)+" — dokun/uyar":"fark "+f2(diff)})]},target)})}),
     e.jsx("button",{style:{...S.save,background:"linear-gradient(135deg,#f59e0b,#ef4444)",marginTop:".7rem"},onClick:()=>warn(q,pt,"Tüm panel"),children:__T("📢 Tüm Panel Hakemlerini Uyar")})
    ]},q.key)}),
   queue.length>0?e.jsx("div",{style:{maxWidth:560,margin:".8rem auto 0",fontSize:".75rem",color:"#8b97b3",textAlign:"center"},children:__T("SJ notunuz final puanı etkilemez. Çağrılan her sporcu geldiği sırada alt alta eklenir — hepsini aynı anda notlayabilirsiniz.")}):null
  ]})
 ]});
}
export{SJPanel as default};
