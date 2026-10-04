import{useAktifKategori as _uAK}from"./judgeLinkGroup-Jl01a2b3Cb2.js";import"./i18n-Tr01a2b3Cb2.js";import{b as usToast,a as usInit,j as e,d as db}from"./main-C2LpyYUGCb2.js";import{f as usParams,r as R}from"./vendor-react-Cxw6bqwhCb2.js";import{k as ref,l as get,o as onValue,m as update,v as fset}from"./vendor-firebase-940mxgRVCb2.js";import{v as verifyToken}from"./epanelToken-BoF3UjP2Cb2.js";import"./modulepreload-polyfill-B5Qt9EMXCb2.js";

const BASE="aerobik_yarismalar",GAP_LIMIT=.5;
function trimA(o){if(!o)return null;const v=["j1","j2","j3","j4"].map(k=>o[k]).filter(x=>x!=null&&!isNaN(x));if(!v.length)return null;if(v.length<2)return v[0];if(v.length===4){v.sort((x,y)=>x-y);return(v[1]+v[2])/2}return v.reduce((a,b)=>a+b,0)/v.length}
function calcE(o){if(!o)return null;const v=["j1","j2","j3","j4"].map(k=>o[k]).filter(x=>x!=null&&!isNaN(x));if(!v.length)return null;let m;if(v.length===4){const s=[...v].sort((x,y)=>x-y);m=(s[1]+s[2])/2}else m=v.reduce((a,b)=>a+b,0)/v.length;return 10-m}
function trimDed(o){const e=calcE(o);return e==null?null:Math.round((10-e)*100)/100}
const f2=v=>v==null||isNaN(v)?"—":Number(v).toFixed(2);

// A paneli kirilim etiketleri (AerobikAPanelPage ile ayni anahtarlar)
const A_KRIT={aerobik:[["music","Müzik"],["content2","Aerobik İçerik"],["generalContent","Genel İçerik"],["artisticRoutine","Artistik Seri"],["performance","Performans"]],
 aero_step:[["music","Müzik"],["content2","Step İçeriği"],["generalContent","Genel İçerik"],["artisticRoutine","Artistik Seri"],["performance","Performans"]]};
const A_KES={aerobik:[["ampSetMissing","Eksik AMP Seti"],["ampBlockMissing","Eksik AMP Blok"],["lessThan3Collab","3'ten az işbirliği"],["missingZone","Alan/Bölge eksik"],["missingIntro","Giriş eksik"],["endingWithElements","Elementle biten seri"],["multipleTouchFall","Çoklu temas / Düşme"]],
 aero_step:[["missingSteppingSet","Eksik 9 Step Seti"],["missingStepBlock","Eksik Step Blok"],["missingZone","Alan/Bölge eksik"],["missingTheme","Tema eksik"],["missingIntro","Açılış/Giriş eksik"],["fall","Düşme"]]};
const A_GRP=c=>String(c||"").startsWith("step_")?"aero_step":"aerobik";
const CFG={
 sja:{badge:"SJA",title:__T("Artistik"),color:"#ec4899",letter:"a",label:__T("SJA Referans Notu (Artistik)"),avg:sc=>trimA(sc.aPanel),avgLabel:"A Panel Ort.",has:sc=>sc.aPanel&&Object.keys(sc.aPanel).length>0,judges:sc=>{const o=sc.aPanel||{};return[["A1","a1",o.j1],["A2","a2",o.j2],["A3","a3",o.j3],["A4","a4",o.j4]]}},
 sje:{badge:"SJE",title:__T("Uygulama"),color:"#10b981",letter:"e",label:__T("SJE Referans Kesintisi (Uygulama)"),avg:sc=>trimDed(sc.ePanel),avgLabel:"E Panel Kesinti",has:sc=>sc.ePanel&&Object.keys(sc.ePanel).length>0,judges:sc=>{const o=sc.ePanel||{};return[["E1","e1",o.j1],["E2","e2",o.j2],["E3","e3",o.j3],["E4","e4",o.j4]]}},
 sjd:{badge:"SJD",title:__T("Zorluk"),color:"#8b5cf6",letter:"d",label:__T("SJD Referans (D Değeri)"),avg:sc=>sc.dPanel&&sc.dPanel.rawTotal!=null?sc.dPanel.rawTotal:(sc.dScore!=null?sc.dScore:null),avgLabel:"D Panel Ham",has:sc=>(sc.dPanel&&sc.dPanel.rawTotal!=null)||sc.dScore!=null,judges:sc=>[["D Hakemi","d",sc.dPanel&&sc.dPanel.rawTotal!=null?sc.dPanel.rawTotal:(sc.dScore!=null?sc.dScore:null)]]}
};

function SJPanel(){
 const{toast}=usToast();usInit();
 const[sp]=usParams();
 const comp=sp.get("competitionId"),catId=sp.get("catId"),token=sp.get("token");
 const pt=sp.get("panelType")||"sja",cfg=CFG[pt]||CFG.sja;
 const _lid=sp.get("linkId"),_g=_uAK(BASE,comp,catId,_lid),allCat=_g.tumu,catList=_g.kume;
 const[authed,setAuthed]=R.useState(!1),[jd,setJd]=R.useState(null),[loading,setLoading]=R.useState(!0),[dk,setDk]=R.useState(()=>{try{return localStorage.getItem("tcfSjTema")==="koyu"}catch{return!1}});R.useEffect(()=>{if(!comp||!authed)return;let k=null,ok=!0;import("./aerobikMesaj-Ms01a2b3Cb2.js").then(m=>{if(ok)k=m.mesajKur({db,ref,onValue,update,base:BASE+"/"+comp,rol:["sja","sje","sjd"].includes(pt)?pt:"sja"})}).catch(()=>{});return()=>{ok=!1;k&&k()}},[comp,authed]);
 const[pun,setPun]=R.useState({}),[spor,setSpor]=R.useState({}),[cats,setCats]=R.useState({}),[compName,setCompName]=R.useState("Yarışma"),[active,setActive]=R.useState({});
 const[notes,setNotes]=R.useState({}),[warned,setWarned]=R.useState({}),[order,setOrder]=R.useState({});

 R.useEffect(()=>{if(!comp||!token){setLoading(!1),setAuthed(!1);return}get(ref(db,`${BASE}/${comp}/epanelToken`)).then(s=>{const v=s.val();setAuthed(v?verifyToken(token,v):!1)}).catch(()=>setAuthed(!1)).finally(()=>setLoading(!1))},[comp,token]);
 R.useEffect(()=>{if(!comp||!authed)return;const u1=onValue(ref(db,`${BASE}/${comp}/puanlar`),s=>setPun(s.val()||{}));const u2=onValue(ref(db,`${BASE}/${comp}/sporcular`),s=>setSpor(s.val()||{}));const u3=onValue(ref(db,`${BASE}/${comp}/kategoriler`),s=>setCats(s.val()||{}));const u4=onValue(ref(db,`${BASE}/${comp}/isim`),s=>setCompName(s.val()||"Yarışma"));const u5=onValue(ref(db,`${BASE}/${comp}/aktifSporcu`),s=>setActive(s.val()||{}));return()=>{u1(),u2(),u3(),u4(),u5()}},[comp,authed]);

 const catName=c=>cats[c]?.name||c;
 const _sanOk=v=>String(v||"").trim().replace(/[.#$[\]/]/g,"-").slice(0,60);
 const nmeta=(cat,ath)=>{const cm=spor[cat]||{},i=cm[ath];if(i)return{name:[i.ad,i.soyad].filter(Boolean).join(" ")||i.adSoyad||ath,club:i.il||i.okul||i.kulup||""};const parts=String(ath).split("::"),gn=parts[parts.length-1],ok=parts.length>=3?parts.slice(1,-1).join("::"):"";const mem=Object.values(cm).filter(m=>m&&String(m.grupNo??m.cikisSirasi??"")===String(gn)&&(ok===""||String(m.okul||m.kulup||"")===ok||_sanOk(m.okul||m.kulup)===ok));const nm=[...new Set(mem.map(m=>[m.ad,m.soyad].filter(Boolean).join(" ")||m.adSoyad).filter(Boolean))].join(", ");return{name:nm||ath,club:mem[0]?.il||mem[0]?.okul||mem[0]?.kulup||""}};
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

 const P=dk?{bg:"#0b1220",card:"#111a2e",soft:"#0f1729",line:"#24324d",ink:"#e5ebf5",muted:"#94a3b8",sub:"#64748b",hdr:"#0f172a",tile:"#16213a"}:{bg:"#F0F2F5",card:"#fff",soft:"#F8FAFC",line:"#E5E7EB",ink:"#1A1D26",muted:"#6B7280",sub:"#94A3B8",hdr:"#fff",tile:"#F8FAFC"};
 const C=cfg.color,tint=a=>C+(a||"1a");
 const S={wrap:{minHeight:"100vh",background:P.bg,color:P.ink,fontFamily:"Nunito,system-ui,-apple-system,sans-serif",paddingBottom:"2.5rem"},
  top:{position:"sticky",top:0,zIndex:10,background:P.hdr,borderBottom:"1px solid "+P.line,boxShadow:"0 1px 3px rgba(0,0,0,.06)",padding:"0 1.25rem",minHeight:68,display:"flex",alignItems:"center",justifyContent:"space-between",gap:".8rem"},
  ico:{width:44,height:44,borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,background:C,boxShadow:"0 6px 18px "+C+"55"},
  badge:{background:C,color:"#fff",fontWeight:900,fontSize:".95rem",padding:".42rem .9rem",borderRadius:999,boxShadow:"0 4px 14px "+C+"55",letterSpacing:".04em"},
  tbtn:{width:38,height:38,borderRadius:10,border:"1px solid "+P.line,background:P.card,color:P.ink,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"},
  in:{maxWidth:1180,margin:"0 auto",padding:"1.1rem 1.25rem"},
  qbar:{display:"flex",alignItems:"center",gap:".6rem",flexWrap:"wrap",margin:".1rem 0 .9rem"},
  qlbl:{fontSize:".95rem",fontWeight:900,color:P.ink},
  qcnt:{background:C,color:"#fff",borderRadius:999,fontSize:".78rem",fontWeight:900,padding:".12rem .55rem"},
  qnote:{fontSize:".78rem",fontWeight:700,color:P.muted,marginLeft:"auto"},
  grid:{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(min(100%,500px),1fr))",gap:"1rem",alignItems:"start"},
  card:{background:P.card,border:"1px solid "+P.line,borderRadius:16,overflow:"hidden",boxShadow:dk?"none":"0 1px 2px rgba(15,23,42,.04)"},
  chd:{display:"flex",alignItems:"center",gap:".75rem",padding:".85rem 1rem",borderBottom:"1px solid "+P.line,background:"linear-gradient(90deg,"+tint("14")+","+P.card+" 70%)"},
  no:{width:34,height:34,borderRadius:10,background:tint("22"),color:C,fontWeight:900,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:".9rem"},
  nm:{fontSize:"1.12rem",fontWeight:900,lineHeight:1.15,overflowWrap:"anywhere"},
  meta:{color:P.muted,fontWeight:700,fontSize:".8rem",marginTop:".15rem"},
  chip:(fg,bg)=>({fontSize:".64rem",fontWeight:900,padding:".2rem .5rem",borderRadius:999,background:bg,color:fg,letterSpacing:".04em",whiteSpace:"nowrap"}),
  body:{padding:"1rem"},
  inlbl:{fontSize:".72rem",fontWeight:900,color:P.muted,textTransform:"uppercase",letterSpacing:".05em",margin:"0 0 .45rem"},
  numw:{display:"flex",gap:".5rem",alignItems:"stretch"},
  nbtn:{width:54,border:"1px solid "+P.line,background:P.soft,color:P.ink,borderRadius:12,fontSize:"1.6rem",fontWeight:800,cursor:"pointer",fontFamily:"inherit"},
  ninp:{flex:1,minWidth:0,textAlign:"center",fontSize:"2rem",fontWeight:900,background:P.soft,border:"2px solid "+tint("55"),borderRadius:12,color:P.ink,padding:".45rem",fontFamily:"inherit",outline:"none"},
  stats:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:".5rem",margin:".65rem 0 0"},
  stat:{background:P.soft,border:"1px solid "+P.line,borderRadius:12,padding:".5rem .7rem"},
  statl:{fontSize:".66rem",fontWeight:900,color:P.muted,textTransform:"uppercase",letterSpacing:".05em"},
  statv:{fontSize:"1.35rem",fontWeight:900,fontVariantNumeric:"tabular-nums"},
  save:{width:"100%",padding:".85rem",border:"none",borderRadius:12,fontWeight:900,fontSize:"1rem",cursor:"pointer",color:"#fff",background:C,boxShadow:"0 6px 16px "+C+"44",marginTop:".75rem",fontFamily:"inherit"},
  warnAll:{width:"100%",padding:".7rem",borderRadius:12,fontWeight:900,fontSize:".9rem",cursor:"pointer",color:"#DC2626",background:dk?"rgba(220,38,38,.10)":"#FEF2F2",border:"1.5px solid "+(dk?"rgba(248,113,113,.45)":"#FECACA"),marginTop:".8rem",fontFamily:"inherit"},
  jgrid:{display:"grid",gridTemplateColumns:pt==="sjd"?"1fr":"repeat(2,1fr)",gap:".5rem"},
  center:{maxWidth:560,margin:"3rem auto 0",textAlign:"center",color:P.muted,fontWeight:700,padding:"2.2rem 1rem",background:P.card,border:"1px solid "+P.line,borderRadius:16}};

 if(!comp||(!catId&&!_lid))return e.jsx("div",{style:S.wrap,children:e.jsx("div",{style:S.center,children:__T("Hatalı link.")})});
 if(loading)return e.jsx("div",{style:S.wrap,children:e.jsx("div",{style:S.center,children:__T("Doğrulanıyor…")})});
 if(!authed)return e.jsx("div",{style:S.wrap,children:e.jsxs("div",{style:S.center,children:[e.jsx("h2",{children:__T("Yetkisiz Erişim")}),e.jsx("p",{children:__T("Geçersiz/süresi dolmuş bağlantı.")})]})});

 const jdModal=jd&&e.jsx("div",{style:{position:"fixed",inset:0,background:"rgba(15,23,42,.55)",backdropFilter:"blur(4px)",display:"flex",alignItems:"center",justifyContent:"center",padding:"1rem",zIndex:70},onClick:ev=>{if(ev.target===ev.currentTarget)setJd(null)},children:e.jsxs("div",{style:{background:P.card,border:"1px solid "+P.line,borderRadius:16,padding:"1.1rem",width:"100%",maxWidth:460,color:P.ink,fontFamily:"Nunito,system-ui,sans-serif",boxShadow:"0 24px 60px rgba(15,23,42,.3)"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsx("div",{style:{fontSize:"1.1rem",fontWeight:800},children:`${jd.ad} ${__T("Hakemi")}`}),e.jsx("div",{style:{fontSize:"1.3rem",fontWeight:800,color:"#DB2777"},children:f2(jd.skor)})]}),e.jsx("div",{style:{fontSize:".8rem",color:P.muted,fontWeight:700,margin:".15rem 0 .8rem"},children:jd.sporcu}),e.jsx("div",{style:{fontSize:".7rem",fontWeight:800,color:P.muted,textTransform:"uppercase",letterSpacing:".05em",marginBottom:".4rem"},children:__T("Kriterler")}),e.jsx("div",{style:{background:P.soft,border:"1px solid "+P.line,borderRadius:12,padding:".55rem .7rem"},children:A_KRIT[jd.grp].map(([k,lb])=>{const v=jd.br.criteriaValues?.[k];return e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",padding:".2rem 0",fontSize:".88rem"},children:[e.jsx("span",{style:{color:P.muted},children:__T(lb)}),e.jsx("span",{style:{fontWeight:800,color:v==null?P.sub:P.ink},children:v==null?"\u2014":Number(v).toFixed(1)})]},k)})}),(()=>{const ks=A_KES[jd.grp].map(([k,lb])=>[k,lb,Number(jd.br.deductionValues?.[k]||0)]).filter(x=>x[2]>0);return ks.length?e.jsxs("div",{style:{background:P.soft,border:"1px solid "+P.line,borderRadius:12,padding:".55rem .7rem",marginTop:".5rem"},children:[e.jsx("div",{style:{fontSize:".7rem",fontWeight:800,color:"#DC2626",textTransform:"uppercase",marginBottom:".3rem"},children:__T("Kesintiler")}),...ks.map(([k,lb,v])=>e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",padding:".2rem 0",fontSize:".88rem"},children:[e.jsx("span",{style:{color:P.muted},children:__T(lb)}),e.jsxs("span",{style:{fontWeight:800,color:"#DC2626"},children:["\u2212",f2(v)]})]},k))]}):e.jsx("div",{style:{background:P.soft,border:"1px solid "+P.line,borderRadius:12,padding:".5rem .7rem",marginTop:".5rem",color:P.muted,fontSize:".85rem",fontWeight:700},children:__T("Kesinti yok")})})(),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginTop:".7rem",paddingTop:".6rem",borderTop:"1px solid "+P.line,fontWeight:800},children:[e.jsx("span",{children:__T("Artistik Puan")}),e.jsx("span",{style:{color:"#DB2777"},children:f2(jd.br.finalAScore!=null?jd.br.finalAScore:jd.skor)})]}),e.jsx("button",{style:{width:"100%",marginTop:".9rem",padding:".65rem",borderRadius:10,border:"1px solid "+P.line,background:P.soft,color:P.ink,fontWeight:800,cursor:"pointer",fontFamily:"inherit"},onClick:()=>setJd(null),children:__T("Kapat")})]})});
 return e.jsxs("div",{style:S.wrap,children:[
  e.jsxs("div",{style:S.top,children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:".8rem",minWidth:0},children:[e.jsx("div",{style:S.ico,children:e.jsx("span",{className:"material-icons-round",style:{color:"#fff",fontSize:"24px"},children:"verified_user"})}),e.jsxs("div",{style:{minWidth:0},children:[e.jsxs("div",{style:{fontWeight:900,fontSize:"1.12rem",lineHeight:1.15},children:[__T("Süper Jüri")," · ",cfg.title]}),e.jsx("div",{style:{fontSize:".8rem",color:P.muted,fontWeight:700,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:compName})]})]}),
   e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:".55rem",flexShrink:0},children:[e.jsx("span",{id:"__msgSlot","data-tema":dk?"koyu":"acik",style:{display:"inline-flex"}}),e.jsx("button",{type:"button",style:S.tbtn,title:dk?__T("Açık tema"):__T("Karanlık tema"),onClick:()=>setDk(v=>{const y=!v;try{localStorage.setItem("tcfSjTema",y?"koyu":"acik")}catch{}return y}),children:e.jsx("span",{className:"material-icons-round",style:{fontSize:"1.2rem"},children:dk?"light_mode":"dark_mode"})}),e.jsx("div",{style:S.badge,children:cfg.badge})]})]}),
  e.jsxs("div",{style:S.in,children:[
   e.jsxs("div",{style:S.qbar,children:[e.jsx("span",{className:"material-icons-round",style:{color:C},children:"fact_check"}),e.jsx("span",{style:S.qlbl,children:__T("İnceleme Kuyruğu")}),e.jsx("span",{style:S.qcnt,children:queue.length}),e.jsxs("span",{style:S.qnote,children:[__T("Fark eşiği")," ",f2(GAP_LIMIT)," · ",__T("SJ notu final puanı etkilemez")]})]}),
   queue.length===0?e.jsxs("div",{style:S.center,children:[e.jsx("span",{className:"material-icons-round",style:{fontSize:"2.6rem",color:P.sub,display:"block",marginBottom:".5rem"},children:"hourglass_empty"}),e.jsx("div",{style:{color:P.ink,fontWeight:800},children:__T("İncelenecek sporcu yok.")}),e.jsx("p",{style:{marginTop:".4rem",fontSize:".85rem"},children:__T("Panel puan girdikçe sporcular burada listelenir.")})]}):
   e.jsx("div",{style:S.grid,children:queue.map((q,qi)=>{
    const av=cfg.avg(q.sc),judges=cfg.judges(q.sc),nv=noteOf(q.key),myNote=nv===""?null:parseFloat(nv),gap=av==null||myNote==null||isNaN(myNote)?null:Math.abs(myNote-av),saved=q.sc.sjPanel&&q.sc.sjPanel[cfg.letter],gHi=gap!=null&&gap>GAP_LIMIT;
    return e.jsxs("div",{style:{...S.card,...(q.isActive?{borderColor:C,boxShadow:"0 0 0 2px "+tint("33")}:{})},children:[
     e.jsxs("div",{style:S.chd,children:[e.jsx("div",{style:S.no,children:qi+1}),e.jsxs("div",{style:{flex:1,minWidth:0},children:[e.jsx("div",{style:S.nm,children:q.name}),e.jsx("div",{style:S.meta,children:catName(q.cat)+(q.club?" · "+q.club:"")})]}),
      e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:".25rem",alignItems:"flex-end"},children:[q.isActive?e.jsx("span",{style:S.chip("#15803D",dk?"rgba(34,197,94,.18)":"#DCFCE7"),children:__T("AKTİF")}):null,saved?e.jsx("span",{style:S.chip(dk?"#a5b4fc":"#4338CA",dk?"rgba(99,102,241,.2)":"#EEF2FF"),children:"✓ "+__T("NOTLANDI")}):null]})]}),
     e.jsxs("div",{style:S.body,children:[
      e.jsx("div",{style:S.inlbl,children:cfg.label}),
      e.jsxs("div",{style:S.numw,children:[e.jsx("button",{style:S.nbtn,onClick:()=>bump(q.key,-.1),children:"−"}),e.jsx("input",{style:S.ninp,type:"number",inputMode:"decimal",step:"0.1",min:"0",value:nv,placeholder:"0.0",onChange:ev=>setNoteFor(q.key,ev.target.value)}),e.jsx("button",{style:S.nbtn,onClick:()=>bump(q.key,.1),children:"+"})]}),
      e.jsxs("div",{style:S.stats,children:[e.jsxs("div",{style:S.stat,children:[e.jsx("div",{style:S.statl,children:cfg.avgLabel}),e.jsx("div",{style:S.statv,children:f2(av)})]}),
       e.jsxs("div",{style:{...S.stat,...(gap==null?{}:gHi?{background:dk?"rgba(220,38,38,.12)":"#FEF2F2",borderColor:dk?"rgba(248,113,113,.45)":"#FECACA"}:{background:dk?"rgba(34,197,94,.10)":"#F0FDF4",borderColor:dk?"rgba(74,222,128,.35)":"#BBF7D0"})},children:[e.jsx("div",{style:S.statl,children:__T("Fark")}),e.jsx("div",{style:{...S.statv,color:gap==null?P.sub:gHi?"#DC2626":"#16A34A"},children:gap==null?"—":f2(gap)})]})]}),
      e.jsx("button",{style:S.save,onClick:()=>save(q),children:__T("💾 SJ Notunu Kaydet")}),
      e.jsx("div",{style:{...S.inlbl,marginTop:"1.1rem"},children:__T("Hakem Notları — uyarı için nota dokunun")}),
      e.jsx("div",{style:S.jgrid,children:judges.map(([lbl,target,jn])=>{const diff=myNote==null||isNaN(myNote)||jn==null?null:Math.abs(myNote-jn),hi=diff!=null&&diff>GAP_LIMIT,wd=warned[q.key+"|"+target];return e.jsxs("button",{onClick:()=>warn(q,target,lbl),style:{textAlign:"left",padding:".6rem .75rem",borderRadius:12,cursor:"pointer",fontFamily:"inherit",border:"1.5px solid "+(wd?"#F59E0B":hi?"#EF4444":P.line),background:wd?(dk?"rgba(245,158,11,.16)":"#FFFBEB"):hi?(dk?"rgba(239,68,68,.12)":"#FEF2F2"):P.tile,color:P.ink},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsx("span",{style:{fontWeight:900,color:C},children:lbl}),e.jsx("span",{style:{fontSize:"1.3rem",fontWeight:900,fontVariantNumeric:"tabular-nums"},children:f2(jn)})]}),e.jsx("div",{style:{fontSize:".7rem",fontWeight:800,marginTop:".15rem",color:wd?"#D97706":hi?"#DC2626":P.muted},children:wd?"⚠️ "+__T("uyarıldı"):diff==null?__T("dokun → uyar"):hi?__T("fark")+" "+f2(diff)+" — "+__T("dokun/uyar"):__T("fark")+" "+f2(diff)})]},target)})}),
      q.sc.aPanelBreakdown?e.jsxs("div",{style:{marginTop:".8rem"},children:[e.jsx("div",{style:S.inlbl,children:__T("A Jürisi Detayı")}),e.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:".4rem"},children:["j1","j2","j3","j4"].map(j=>q.sc.aPanelBreakdown[j]?e.jsxs("button",{type:"button",onClick:()=>setJd({ad:"A"+j.replace("j",""),skor:q.sc.aPanel?.[j],br:q.sc.aPanelBreakdown[j],grp:A_GRP(q.cat),sporcu:q.name}),style:{display:"inline-flex",alignItems:"center",gap:".3rem",background:P.soft,border:"1px solid "+P.line,borderRadius:10,padding:".38rem .65rem",fontSize:".82rem",fontWeight:800,color:P.ink,cursor:"pointer",fontFamily:"inherit"},children:[e.jsx("span",{className:"material-icons-round",style:{fontSize:"1rem",color:C},children:"info"}),"A",j.replace("j","")," ",f2(q.sc.aPanel?.[j])]},j):null)})]}):null,
      e.jsx("button",{style:S.warnAll,onClick:()=>warn(q,pt,"Tüm panel"),children:__T("📢 Tüm Panel Hakemlerini Uyar")})
     ]})
    ]},q.key)})}),
   queue.length>0?e.jsx("div",{style:{maxWidth:760,margin:"1rem auto 0",fontSize:".76rem",color:P.muted,textAlign:"center",fontWeight:600},children:__T("SJ notunuz final puanı etkilemez. Çağrılan her sporcu geldiği sırada alt alta eklenir — hepsini aynı anda notlayabilirsiniz.")}):null
  ]}),
  jdModal
 ]});
}
export{SJPanel as default};
