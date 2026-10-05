import"./i18n-Tr01a2b3Cb2.js";import{b as usToast,a as usDisc,j as e,d as db}from"./main-C2LpyYUGCb2.js";import{r as R}from"./vendor-react-Cxw6bqwhCb2.js";import{k as ref,o as onValue,l as get,m as update}from"./vendor-firebase-940mxgRVCb2.js";import{D as ART}from"./criteriaDefaults-BK9hckk0Cb2.js";import{R as RIT,a as RIT_ALET}from"./ritmikCriteriaDefaults-CgOlnfQcCb2.js";import{A as AER}from"./aerobikCriteriaDefaults-ld4mBtrICb2.js";import{T as TRA}from"./trampolinCriteriaDefaults-DzmWcMUCCb2.js";import{P as PAR}from"./parkurCriteriaDefaults-_sOTAeO5Cb2.js";import"./modulepreload-polyfill-B5Qt9EMXCb2.js";

// KATEGORİ YÖNETİMİ — tüm branşlar
//  Katalog  : criteria/kategoriKatalog/<branş>/<kod>  {label, group, tip, cinsiyet, athleteCount, aletler[], aktif}
//             (sabit tanımların üstüne uygulanır; yeni kategoriler buradan eklenir — bkz. katalogUygula)
//  Artistik : aletler mevcut kaynakta yönetilir: criteria/<yıl>/<kategori>/<alet>.isActive
//  Yarışma  : <yarışmalar>/<id>/kategoriler/<kod> {name, aletler, athleteCount, tip}
const SABIT={ritmik:RIT,aerobik:AER,trampolin:TRA,parkur:PAR};
const ART_AD={minikler_erkek:"Minikler Erkek",minikler_kiz:"Minikler Kız",kucukler_erkek:"Küçükler Erkek",kucukler_kiz:"Küçükler Kız",yildizlar_erkek:"Yıldızlar Erkek",yildizlar_kiz:"Yıldızlar Kız",gencler_erkek:"Gençler Erkek",gencler_kiz:"Gençler Kız",buyukler_erkek:"Büyükler Erkek",buyukler_kiz:"Büyükler Kız"};
const ART_ALET=[["yer","Yer"],["atlama","Atlama"],["asimetrik","Asimetrik Paralel"],["denge","Denge"],["kulplu","Kulplu Beygir"],["halka","Halka"],["paralel","Paralel Bar"],["barfiks","Barfiks"],["mantar","Mantar"]];
const ART_KIZ=["yer","atlama","asimetrik","denge"],ART_ERKEK=["yer","kulplu","halka","atlama","paralel","barfiks","mantar"];
const TIPLER=[["ferdi","Ferdi"],["karma","Karma / Çift"],["takim","Takım / Grup"]];
const liste=x=>Array.isArray(x)?x.filter(v=>v!=null&&v!==""):x&&typeof x==="object"?Object.values(x).filter(v=>v!=null&&v!==""):[];
const aletIds=x=>Array.isArray(x)?x.map(z=>typeof z==="object"?z.id||z.value:z).filter(Boolean):x&&typeof x==="object"?Object.keys(x):[];
const slug=s=>String(s||"").toLocaleLowerCase("tr-TR").replace(/ç/g,"c").replace(/ğ/g,"g").replace(/ı/g,"i").replace(/ö/g,"o").replace(/ş/g,"s").replace(/ü/g,"u").replace(/[^a-z0-9]+/g,"_").replace(/^_+|_+$/g,"").slice(0,40);
const esit=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
const cinsOf=v=>{const c=String(v.cinsiyet||"");return/^k|kız|kiz|kad/i.test(c)?"Kız":/^e|erkek/i.test(c)?"Erkek":c||"Karma"};

function KategoriYonetimi(){
 const{toast}=usToast(),{firebasePath:FP,id:BR,shortLabel:BAD}=usDisc();
 const art=BR==="artistik",alet=art||BR==="ritmik";
 const[sekme,setSekme]=R.useState("kat"),[kat,setKat]=R.useState({}),[yil,setYil]=R.useState(null),[artC,setArtC]=R.useState({}),[ed,setEd]=R.useState({}),[busy,setBusy]=R.useState(!1),[yeni,setYeni]=R.useState(null),[ara,setAra]=R.useState("");
 const[comps,setComps]=R.useState({}),[comp,setComp]=R.useState(""),[yEd,setYEd]=R.useState({});

 R.useEffect(()=>{if(!BR)return;const u=onValue(ref(db,`criteria/kategoriKatalog/${BR}`),s=>setKat(s.val()||{}));return()=>u()},[BR]);
 R.useEffect(()=>{if(!art)return;let u=()=>{};get(ref(db,"criteria/activeYear")).then(s=>{const y=s.val()||new Date().getFullYear();setYil(y);u=onValue(ref(db,`criteria/${y}`),x=>setArtC(x.val()||{}))});return()=>u()},[art]);
 R.useEffect(()=>{if(!FP)return;const u=onValue(ref(db,FP),s=>{const v=s.val()||{},o={};Object.entries(v).forEach(([k,c])=>{if(!c||c.arsivli===!0||c.arsivli==="true")return;const kc={};Object.entries(c.kategoriler||{}).forEach(([kk,vv])=>{kc[kk]={...vv,_sp:Object.keys(c.sporcular?.[kk]||{}).length,_pu:Object.keys(c.puanlar?.[kk]||{}).length}});o[k]={isim:c.isim||c.name||k,tarih:c.baslangicTarihi||c.tarih||"",kategoriler:kc}});setComps(o)});return()=>u()},[FP]);

 // ---- etkin kategori tanımları (sabit + katalog) ----
 const etkin=R.useMemo(()=>{const o={};
  if(art){Object.keys({...artC,...kat}).forEach(k=>{if(k==="activeYear")return;const c=artC[k]||{},kk=kat[k]||{};
    const al=Object.keys(c).filter(a=>a!=="metadata"&&c[a]&&c[a].isActive!==!1);
    o[k]={label:kk.label||ART_AD[k]||k,group:kk.group||"",cinsiyet:kk.cinsiyet||(/kiz/.test(k)?"Kız":/erkek/.test(k)?"Erkek":""),aletler:al,tumAletler:Object.keys(c).filter(a=>a!=="metadata"),aktif:kk.aktif!==!1,var:!!artC[k],katalog:!!kat[k]}})}
  else{const S=SABIT[BR]||{};Object.keys({...S,...kat}).forEach(k=>{const b=S[k]||{},kk=kat[k]||{};
    o[k]={label:kk.label||b.label||k,group:kk.group||b.group||"",tip:kk.tip||b.tip||"ferdi",athleteCount:parseInt(kk.athleteCount||b.athleteCount)||1,cinsiyet:kk.cinsiyet||b.cinsiyet||"",aletler:liste(kk.aletler??b.aletler),aktif:kk.aktif!==!1,var:!!S[k]&&!S[k]._katalog,katalog:!!kat[k]}})}
  return o},[BR,kat,artC]);
 const deger=(k,f)=>ed[k]&&f in ed[k]?ed[k][f]:etkin[k]?.[f];
 const degisti=k=>ed[k]&&Object.keys(ed[k]).some(f=>!esit(ed[k][f],etkin[k]?.[f]));
 const set=(k,f,v)=>setEd(o=>({...o,[k]:{...(o[k]||{}),[f]:v}}));
 const aletTik=(k,a)=>setEd(o=>{const cur=(o[k]&&"aletler"in o[k]?o[k].aletler:etkin[k]?.aletler)||[];return{...o,[k]:{...(o[k]||{}),aletler:cur.includes(a)?cur.filter(x=>x!==a):[...cur,a]}}});
 const sirali=Object.keys(etkin).sort((a,b)=>String(etkin[a].group).localeCompare(String(etkin[b].group),"tr")||String(etkin[a].label).localeCompare(String(etkin[b].label),"tr"));
 const aletSec=k=>art?ART_ALET.filter(([a])=>{const cs=cinsOf({cinsiyet:deger(k,"cinsiyet")});return cs==="Kız"?ART_KIZ.includes(a)||(deger(k,"aletler")||[]).includes(a):cs==="Erkek"?ART_ERKEK.includes(a)||(deger(k,"aletler")||[]).includes(a):!0}):Object.entries(RIT_ALET).map(([a,v])=>[a,v.label||a]);
 const degisenler=Object.keys(ed).filter(degisti);

 // ---- kaydet (katalog / artistik kriter) ----
 const artSablon=(a,haric)=>{for(const k of Object.keys(artC))if(k!==haric&&artC[k]?.[a])return JSON.parse(JSON.stringify(artC[k][a]));return{bonus:{maxE:10,requiredD:0,value:0},hakemSayisi:4}};
 const katKaydet=async()=>{if(busy||!degisenler.length)return;
  if(!await window.__gxConfirm(degisenler.map(k=>"• "+(deger(k,"label")||k)).join("\n")+"\n\n"+__T("Değişiklikler kaydedilsin mi? Yeni oluşturulacak yarışmalar bu tanımları kullanır; mevcut yarışmalara uygulamak için “Yarışmaya Uygula” sekmesini kullanın.")))return;
  setBusy(!0);const upd={};
  degisenler.forEach(k=>{const x={...etkin[k],...ed[k]};
   if(art){
    upd[`criteria/kategoriKatalog/${BR}/${k}`]={...(kat[k]||{}),label:x.label,cinsiyet:x.cinsiyet||"",group:x.group||"",aktif:x.aktif!==!1};
    const eski=etkin[k].aletler||[],ys=x.aletler||[];
    if(!esit([...eski].sort(),[...ys].sort())){
     ys.forEach(a=>{if(artC[k]?.[a])upd[`criteria/${yil}/${k}/${a}/isActive`]=!0;else upd[`criteria/${yil}/${k}/${a}`]={...artSablon(a,k),isActive:!0}});
     eski.filter(a=>!ys.includes(a)).forEach(a=>{upd[`criteria/${yil}/${k}/${a}/isActive`]=!1});
     artC[k]||(upd[`criteria/${yil}/${k}/metadata`]={isActive:!0});
    }
   }else{
    const v={...(kat[k]||{}),label:x.label,group:x.group||"",tip:x.tip||"ferdi",athleteCount:parseInt(x.athleteCount)||1,cinsiyet:x.cinsiyet||"",aktif:x.aktif!==!1};
    if(alet)v.aletler=x.aletler||[];
    upd[`criteria/kategoriKatalog/${BR}/${k}`]=v;
   }});
  try{await update(ref(db),upd);setEd({});toast(degisenler.length+" "+__T("kategori kaydedildi ✓"),"success")}catch(er){console.error(er);toast(__T("Kaydedilemedi."),"error")}setBusy(!1)};
 const varsayilana=async k=>{if(!kat[k])return;if(!await window.__gxConfirm((etkin[k]?.label||k)+": "+__T("katalogdaki düzeltmeler silinip sabit tanıma dönülsün mü? (Değişiklik sayfa yenilenince tüm ekranlarda görünür.)")))return;
  setBusy(!0);try{await update(ref(db),{[`criteria/kategoriKatalog/${BR}/${k}`]:null});setEd(o=>{const n={...o};delete n[k];return n});toast(__T("Sabit tanıma dönüldü."),"success")}catch{toast(__T("Kaydedilemedi."),"error")}setBusy(!1)};

 // ---- yeni kategori ----
 const yeniAc=()=>setYeni({label:"",kod:"",kodElle:!1,group:"",tip:"ferdi",athleteCount:1,cinsiyet:art?"Kız":"",aletler:[],sablon:""});
 const yeniKaydet=async()=>{const y=yeni;if(!y||busy)return;const kod=slug(y.kod||y.label);
  if(!y.label.trim()||!kod){toast(__T("Kategori adı ve kodu gerekli."),"warning");return}
  if(etkin[kod]){toast(__T("Bu kodla bir kategori zaten var:")+" "+kod,"warning");return}
  if(alet&&!y.aletler.length){toast(__T("En az bir alet seçin."),"warning");return}
  setBusy(!0);const upd={};
  if(art){upd[`criteria/kategoriKatalog/${BR}/${kod}`]={label:y.label.trim(),cinsiyet:y.cinsiyet,group:y.group.trim(),aktif:!0,sablon:y.sablon||""};
   upd[`criteria/${yil}/${kod}/metadata`]={isActive:!0};
   y.aletler.forEach(a=>{const t=y.sablon&&artC[y.sablon]?.[a]?JSON.parse(JSON.stringify(artC[y.sablon][a])):artSablon(a,kod);upd[`criteria/${yil}/${kod}/${a}`]={...t,isActive:!0}})}
  else{const v={label:y.label.trim(),group:y.group.trim(),tip:y.tip,athleteCount:parseInt(y.athleteCount)||1,cinsiyet:y.cinsiyet,aktif:!0};
   if(alet)v.aletler=y.aletler;if(BR==="ritmik"&&y.tip==="takim")v.grupMu=!0;upd[`criteria/kategoriKatalog/${BR}/${kod}`]=v}
  try{await update(ref(db),upd);setYeni(null);toast(__T("Yeni kategori eklendi:")+" "+y.label.trim()+" ("+kod+")","success")}catch(er){console.error(er);toast(__T("Kaydedilemedi."),"error")}setBusy(!1)};

 // ---- yarışmaya uygula ----
 const C=comps[comp]||{},CK=C.kategoriler||{};
 const yKat=[...new Set([...Object.keys(CK).filter(k=>!/^final_/.test(k)),...sirali.filter(k=>etkin[k].aktif)])].sort((a,b)=>String(etkin[a]?.group||"").localeCompare(String(etkin[b]?.group||""),"tr")||String(etkin[a]?.label||a).localeCompare(String(etkin[b]?.label||b),"tr"));
 const yDeger=(k,f)=>{if(yEd[k]&&f in yEd[k])return yEd[k][f];const c=CK[k];if(f==="var")return!!c;if(f==="name")return c?.name||etkin[k]?.label||k;if(f==="aletler")return c?aletIds(c.aletler):(etkin[k]?.aletler||[]);return null};
 const ySet=(k,f,v)=>setYEd(o=>({...o,[k]:{...(o[k]||{}),[f]:v}}));
 const yAletTik=(k,a)=>setYEd(o=>{const c=CK[k],cur=(o[k]&&"aletler"in o[k]?o[k].aletler:c?aletIds(c.aletler):(etkin[k]?.aletler||[]))||[];return{...o,[k]:{...(o[k]||{}),aletler:cur.includes(a)?cur.filter(x=>x!==a):[...cur,a]}}});
 const yAletSec=k=>art?ART_ALET.filter(([a])=>(etkin[k]?.tumAletler||[]).includes(a)||(yDeger(k,"aletler")||[]).includes(a)):Object.entries(RIT_ALET).map(([a,v])=>[a,v.label||a]);
 const yDegisim=yKat.map(k=>{const c=CK[k],v=yDeger(k,"var");if(!c&&v)return{k,tur:"ekle"};if(c&&!v)return{k,tur:"cikar"};if(c&&v){const n=String(yDeger(k,"name")||"").trim(),ch=[];if(n&&n!==c.name)ch.push("ad");if(alet&&!esit([...yDeger(k,"aletler")].sort(),[...aletIds(c.aletler)].sort()))ch.push("aletler");if(ch.length)return{k,tur:"duzelt",ch}}return null}).filter(Boolean);
 const yUygula=async()=>{if(busy||!comp||!yDegisim.length)return;
  const engel=yDegisim.filter(d=>d.tur==="cikar"&&(CK[d.k]._sp||CK[d.k]._pu));
  if(engel.length){toast(engel.map(d=>yDeger(d.k,"name")).join(", ")+" — "+__T("sporcusu veya puanı olan kategori yarışmadan çıkarılamaz."),"warning");return}
  const puanliAlet=yDegisim.filter(d=>d.tur==="duzelt"&&d.ch.includes("aletler")&&CK[d.k]._pu);
  const ozet=yDegisim.map(d=>(d.tur==="ekle"?"＋ ":d.tur==="cikar"?"－ ":"✎ ")+String(yDeger(d.k,"name")).trim()+(d.tur==="duzelt"?" ("+d.ch.map(c=>__T(c==="ad"?"ad":"aletler")).join(", ")+")":"")).join("\n");
  if(!await window.__gxConfirm(C.isim+"\n\n"+ozet+(puanliAlet.length?"\n\n⚠ "+__T("Puan girilmiş kategoride alet listesi değişiyor; çıkarılan aletin puanları silinmez ama ekranlarda görünmez."):"")+"\n\n"+__T("Yarışmaya uygulansın mı?")))return;
  setBusy(!0);const upd={};
  yDegisim.forEach(({k,tur,ch})=>{const n=String(yDeger(k,"name")||"").trim()||etkin[k]?.label||k,al=yDeger(k,"aletler")||[];
   if(tur==="ekle")upd[`kategoriler/${k}`]={name:n,aletler:alet?al:[],athleteCount:etkin[k]?.athleteCount||1,tip:etkin[k]?.tip||"ferdi"};
   else if(tur==="cikar")upd[`kategoriler/${k}`]=null;
   else{ch.includes("ad")&&(upd[`kategoriler/${k}/name`]=n);ch.includes("aletler")&&(upd[`kategoriler/${k}/aletler`]=al)}});
  try{await update(ref(db,`${FP}/${comp}`),upd);setYEd({});toast(yDegisim.length+" "+__T("değişiklik yarışmaya uygulandı ✓"),"success")}catch(er){console.error(er);toast(__T("Kaydedilemedi."),"error")}setBusy(!1)};

 // ---- görünüm ----
 const S={wrap:{minHeight:"100vh",background:"#F0F2F5",color:"#1A1D26",fontFamily:"Nunito,system-ui,-apple-system,sans-serif",paddingBottom:"3rem"},
  top:{position:"sticky",top:0,zIndex:10,background:"#fff",backdropFilter:"blur(12px)",borderBottom:"1px solid #E5E7EB",boxShadow:"0 1px 3px rgba(0,0,0,.06)",padding:"0 1.25rem",minHeight:68,display:"flex",alignItems:"center",gap:".9rem",flexWrap:"wrap"},
  back:{width:38,height:38,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",color:"#1A1D26",textDecoration:"none",flexShrink:0},
  ico:{width:44,height:44,borderRadius:12,boxShadow:"0 6px 18px rgba(99,102,241,.28)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,background:"linear-gradient(135deg,#0891b2,#6366f1)"},
  in:{maxWidth:1150,margin:"0 auto",padding:"1.25rem"},
  card:{background:"#fff",border:"1px solid #E5E7EB",borderRadius:16,padding:"1.1rem 1.15rem",marginBottom:"1rem"},
  tab:on=>({padding:".55rem 1rem",borderRadius:10,border:"1px solid "+(on?"#0891b2":"#E5E7EB"),background:on?"rgba(8,145,178,.18)":"#fff",color:on?"#0E7490":"#475569",fontWeight:800,cursor:"pointer",fontSize:".88rem"}),
  inp:ch=>({width:"100%",padding:".42rem .55rem",borderRadius:8,border:"1px solid "+(ch?"#f59e0b":"#E5E7EB"),background:ch?"rgba(245,158,11,.08)":"#F8FAFC",color:"#1A1D26",fontWeight:700,fontSize:".85rem"}),
  sel:{padding:".42rem .55rem",borderRadius:8,border:"1px solid #E5E7EB",background:"#F8FAFC",color:"#1A1D26",fontWeight:700,fontSize:".85rem"},
  chip:on=>({padding:".25rem .5rem",borderRadius:7,fontSize:".74rem",fontWeight:700,cursor:"pointer",border:"1px solid "+(on?"#0ea5e9":"#E5E7EB"),background:on?"rgba(14,165,233,.2)":"#F8FAFC",color:on?"#0369A1":"#64748B",whiteSpace:"nowrap"}),
  gh:{fontSize:".7rem",color:"#0369A1",fontWeight:900,textTransform:"uppercase",letterSpacing:".05em",padding:".8rem 0 .3rem"},
  row:{display:"grid",gridTemplateColumns:art?"130px 1.4fr 1fr 2.4fr 80px":(alet?"110px 1.8fr .9fr 150px 1.9fr 70px":"120px 1.8fr 1.1fr 210px 80px"),gap:".55rem",alignItems:"center",padding:".45rem 0",borderBottom:"1px solid #EEF2F7"},
  kod:{fontFamily:"ui-monospace,monospace",fontSize:".7rem",color:"#64748B",wordBreak:"break-all"},
  th:{fontSize:".68rem",color:"#6B7280",fontWeight:800,textTransform:"uppercase",letterSpacing:".04em"},
  btn:{padding:".6rem 1rem",borderRadius:10,border:"none",color:"#fff",fontWeight:800,cursor:"pointer",fontSize:".88rem"},
  ghost:{padding:".5rem .85rem",borderRadius:10,border:"1px solid #E5E7EB",background:"#fff",color:"#334155",fontWeight:800,cursor:"pointer",fontSize:".82rem"},
  badge:(c,b)=>({fontSize:".64rem",fontWeight:800,padding:".12rem .4rem",borderRadius:5,background:b,color:c,marginLeft:".35rem",verticalAlign:"middle"}),
  sub:{fontSize:".8rem",color:"#6B7280",fontWeight:600,lineHeight:1.5,marginBottom:".7rem"}};
 const tog=(on,fn)=>e.jsx("button",{onClick:fn,style:{...S.chip(on),borderColor:on?"#22c55e":"#FECACA",color:on?"#15803D":"#DC2626",background:on?"rgba(34,197,94,.12)":"rgba(127,29,29,.15)"},children:on?__T("Aktif"):__T("Pasif")});
 const grupla=(keys,fn)=>{let son=null;const out=[];keys.forEach(k=>{const g=(etkin[k]?.group)||__T("Grupsuz");if(g!==son){out.push(e.jsx("div",{style:S.gh,children:g},"g_"+g+"_"+k));son=g}out.push(fn(k))});return out};
 const aranan=k=>{const q=ara.trim().toLocaleLowerCase("tr-TR");return!q||[k,etkin[k]?.label,etkin[k]?.group].some(x=>String(x||"").toLocaleLowerCase("tr-TR").includes(q))};

 const katSatir=k=>{const x=etkin[k],ch=degisti(k);
  return e.jsxs("div",{style:{...S.row,opacity:deger(k,"aktif")?1:.55},children:[
   e.jsxs("div",{children:[e.jsx("div",{style:S.kod,children:k}),!x.var&&!art?e.jsx("span",{style:S.badge("#047857","rgba(16,185,129,.18)"),children:__T("YENİ")}):null,x.katalog?e.jsx("span",{style:S.badge("#B45309","rgba(245,158,11,.15)"),title:__T("Katalogda düzeltilmiş"),children:"✎"}):null]}),
   e.jsx("input",{style:S.inp(ed[k]&&"label"in ed[k]&&ed[k].label!==x.label),value:deger(k,"label")||"",onChange:t=>set(k,"label",t.target.value)}),
   e.jsx("input",{style:S.inp(ed[k]&&"group"in ed[k]&&ed[k].group!==x.group),value:deger(k,"group")||"",placeholder:__T("Grup"),onChange:t=>set(k,"group",t.target.value)}),
   !art?e.jsxs("div",{style:{display:"flex",gap:".35rem"},children:[e.jsx("select",{style:{...S.sel,flex:1},value:deger(k,"tip"),onChange:t=>set(k,"tip",t.target.value),children:TIPLER.map(([v,l])=>e.jsx("option",{value:v,children:__T(l)},v))}),
    e.jsx("input",{type:"number",min:1,max:12,title:__T("Sporcu sayısı"),style:{...S.inp(!1),width:56},value:deger(k,"athleteCount"),onChange:t=>set(k,"athleteCount",parseInt(t.target.value)||1)})]}):null,
   alet?e.jsx("div",{style:{display:"flex",gap:".3rem",flexWrap:"wrap"},children:aletSec(k).map(([a,l])=>e.jsx("span",{style:S.chip((deger(k,"aletler")||[]).includes(a)),onClick:()=>aletTik(k,a),children:__T(l)},a))}):null,
   e.jsxs("div",{style:{display:"flex",gap:".3rem",alignItems:"center",justifyContent:"flex-end"},children:[tog(deger(k,"aktif")!==!1,()=>set(k,"aktif",!(deger(k,"aktif")!==!1))),
    x.katalog&&!ch?e.jsx("button",{style:{...S.chip(!1),padding:".2rem .4rem"},title:__T("Sabit tanıma dön"),onClick:()=>varsayilana(k),children:"↺"}):null]})]},k)};

 const yeniForm=()=>{const y=yeni,kod=slug(y.kod||y.label);return e.jsxs("div",{style:{...S.card,borderColor:"#0891b2"},children:[
  e.jsx("div",{style:{fontWeight:900,marginBottom:".6rem"},children:__T("Yeni kategori")}),
  e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(170px,1fr))",gap:".6rem"},children:[
   e.jsxs("label",{style:S.th,children:[__T("Kategori adı"),e.jsx("input",{style:{...S.inp(!1),marginTop:".25rem"},value:y.label,placeholder:__T("ör. U12 Kız"),onChange:t=>setYeni({...y,label:t.target.value})})]}),
   e.jsxs("label",{style:S.th,children:[__T("Kod"),e.jsx("input",{style:{...S.inp(!1),marginTop:".25rem",fontFamily:"ui-monospace,monospace"},value:y.kodElle?y.kod:kod,onChange:t=>setYeni({...y,kod:slug(t.target.value),kodElle:!0})})]}),
   e.jsxs("label",{style:S.th,children:[__T("Grup"),e.jsx("input",{style:{...S.inp(!1),marginTop:".25rem"},value:y.group,placeholder:__T("ör. Yıldızlar"),onChange:t=>setYeni({...y,group:t.target.value})})]}),
   e.jsxs("label",{style:S.th,children:[__T("Cinsiyet"),e.jsx("select",{style:{...S.sel,width:"100%",marginTop:".25rem"},value:y.cinsiyet,onChange:t=>setYeni({...y,cinsiyet:t.target.value,aletler:[]}),children:(art?["Kız","Erkek"]:["","Kız","Erkek","Karma"]).map(v=>e.jsx("option",{value:v,children:v?__T(v):"—"},v))})]}),
   !art?e.jsxs("label",{style:S.th,children:[__T("Tip"),e.jsx("select",{style:{...S.sel,width:"100%",marginTop:".25rem"},value:y.tip,onChange:t=>setYeni({...y,tip:t.target.value}),children:TIPLER.map(([v,l])=>e.jsx("option",{value:v,children:__T(l)},v))})]}):null,
   !art?e.jsxs("label",{style:S.th,children:[__T("Sporcu sayısı"),e.jsx("input",{type:"number",min:1,max:12,style:{...S.inp(!1),marginTop:".25rem"},value:y.athleteCount,onChange:t=>setYeni({...y,athleteCount:parseInt(t.target.value)||1})})]}):null,
   art?e.jsxs("label",{style:S.th,children:[__T("Kural şablonu (D/E ayarları kopyalanır)"),e.jsxs("select",{style:{...S.sel,width:"100%",marginTop:".25rem"},value:y.sablon,onChange:t=>setYeni({...y,sablon:t.target.value}),children:[e.jsx("option",{value:"",children:__T("— Otomatik —")}),Object.keys(artC).filter(k=>k!=="activeYear").sort().map(k=>e.jsx("option",{value:k,children:etkin[k]?.label||k},k))]})]}):null]}),
  alet?e.jsxs("div",{style:{marginTop:".7rem"},children:[e.jsx("div",{style:S.th,children:__T("Aletler")}),e.jsx("div",{style:{display:"flex",gap:".35rem",flexWrap:"wrap",marginTop:".35rem"},children:(art?ART_ALET.filter(([a])=>y.cinsiyet==="Erkek"?ART_ERKEK.includes(a):ART_KIZ.includes(a)):Object.entries(RIT_ALET).map(([a,v])=>[a,v.label||a])).map(([a,l])=>e.jsx("span",{style:S.chip(y.aletler.includes(a)),onClick:()=>setYeni(o=>({...o,aletler:o.aletler.includes(a)?o.aletler.filter(x=>x!==a):[...o.aletler,a]})),children:__T(l)},a))})]}):null,
  e.jsxs("div",{style:{display:"flex",gap:".6rem",justifyContent:"flex-end",marginTop:".9rem"},children:[e.jsx("button",{style:S.ghost,onClick:()=>setYeni(null),children:__T("Vazgeç")}),e.jsx("button",{style:{...S.btn,background:"linear-gradient(135deg,#0891b2,#6366f1)"},disabled:busy,onClick:yeniKaydet,children:__T("Kategoriyi ekle")})]})]})};

 const yarismaSatir=k=>{const c=CK[k],v=yDeger(k,"var"),bilinmiyor=!etkin[k];
  return e.jsxs("div",{style:{display:"grid",gridTemplateColumns:alet?"34px 1.6fr 2.4fr 120px":"34px 2fr 160px",gap:".55rem",alignItems:"center",padding:".42rem 0",borderBottom:"1px solid #EEF2F7",opacity:v?1:.55},children:[
   e.jsx("input",{type:"checkbox",checked:v,onChange:t=>ySet(k,"var",t.target.checked),style:{width:18,height:18}}),
   e.jsxs("div",{children:[e.jsx("input",{style:S.inp(c&&String(yDeger(k,"name")).trim()!==c.name),value:yDeger(k,"name"),disabled:!v,onChange:t=>ySet(k,"name",t.target.value)}),
    e.jsxs("div",{style:{...S.kod,marginTop:".15rem"},children:[k,bilinmiyor?" · "+__T("tanımsız kategori"):"",!c&&v?e.jsx("span",{style:S.badge("#047857","rgba(16,185,129,.18)"),children:__T("EKLENECEK")}):null,c&&!v?e.jsx("span",{style:S.badge("#B91C1C","rgba(239,68,68,.18)"),children:__T("ÇIKARILACAK")}):null]})]}),
   alet?e.jsx("div",{style:{display:"flex",gap:".3rem",flexWrap:"wrap"},children:yAletSec(k).map(([a,l])=>e.jsx("span",{style:{...S.chip((yDeger(k,"aletler")||[]).includes(a)),opacity:v?1:.5},onClick:()=>v&&yAletTik(k,a),children:__T(l)},a))}):null,
   e.jsx("div",{style:{fontSize:".72rem",color:"#6B7280",fontWeight:700,textAlign:"right"},children:c?`${c._sp} ${__T("sporcu")} · ${c._pu} ${__T("puan")}`:"—"})]},k)};

 return e.jsxs("div",{style:S.wrap,children:[
  e.jsxs("div",{style:S.top,children:[e.jsx("a",{href:"/"+BR,title:__T("Geri"),style:S.back,children:e.jsx("span",{className:"material-icons-round",children:"arrow_back"})}),e.jsx("div",{style:S.ico,children:e.jsx("span",{className:"material-icons-round",style:{color:"#fff"},children:"category"})}),
   e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:".72rem",color:"#6B7280",fontWeight:800,textTransform:"uppercase",letterSpacing:".05em"},children:BAD||BR}),e.jsx("div",{style:{fontWeight:900,fontSize:"1.05rem"},children:__T("Kategori Yönetimi")})]}),
   e.jsx("div",{style:{flex:1}}),
   e.jsx("button",{style:S.tab(sekme==="kat"),onClick:()=>setSekme("kat"),children:__T("Kategoriler")}),
   e.jsx("button",{style:S.tab(sekme==="yar"),onClick:()=>setSekme("yar"),children:__T("Yarışmaya Uygula")})
   ]}),
  e.jsx("div",{style:S.in,children:sekme==="kat"?e.jsxs(e.Fragment,{children:[
   e.jsxs("div",{style:{...S.card,display:"flex",gap:".6rem",flexWrap:"wrap",alignItems:"center"},children:[
    e.jsx("div",{style:{...S.sub,margin:0,flex:1,minWidth:260},children:art?__T("Artistik kategorileri ve aletleri (")+(yil||"…")+__T(" sezonu kriterleri). Alet değişiklikleri Kriterler sayfasındaki alet ayarlarıyla aynı kaynağa yazılır."):__T("Sabit tanımlar ve sonradan eklenen kategoriler. Düzeltmeler yeni yarışmalarda kullanılır; mevcut yarışmaya “Yarışmaya Uygula” sekmesinden aktarılır. Pasif kategori yeni yarışmalarda seçilemez.")}),
    e.jsx("input",{style:{...S.inp(!1),width:220},placeholder:__T("Kategori ara…"),value:ara,onChange:t=>setAra(t.target.value)}),
    e.jsx("button",{style:{...S.btn,background:"linear-gradient(135deg,#0891b2,#6366f1)"},onClick:yeniAc,children:"+ "+__T("Yeni kategori")})]}),
   yeni?yeniForm():null,
   e.jsxs("div",{style:S.card,children:[
    e.jsxs("div",{style:{...S.row,borderBottom:"1px solid #E5E7EB"},children:[e.jsx("span",{style:S.th,children:__T("Kod")}),e.jsx("span",{style:S.th,children:__T("Ad")}),e.jsx("span",{style:S.th,children:__T("Grup")}),!art?e.jsx("span",{style:S.th,children:__T("Tip · kişi")}):null,alet?e.jsx("span",{style:S.th,children:__T("Aletler")}):null,e.jsx("span",{style:{...S.th,textAlign:"right"},children:__T("Durum")})]}),
    sirali.length?grupla(sirali.filter(aranan),katSatir):e.jsx("div",{style:{color:"#6B7280",fontWeight:700,padding:".8rem 0"},children:__T("Yükleniyor…")}),
    e.jsxs("div",{style:{display:"flex",gap:".6rem",alignItems:"center",marginTop:"1rem"},children:[
     degisenler.length?e.jsx("button",{style:S.ghost,onClick:()=>setEd({}),children:__T("Vazgeç")}):null,e.jsx("div",{style:{flex:1}}),
     degisenler.length?e.jsx("span",{style:{color:"#B45309",fontWeight:800,fontSize:".82rem"},children:degisenler.length+" "+__T("kategori değişti")}):null,
     e.jsx("button",{style:{...S.btn,background:degisenler.length?"linear-gradient(135deg,#22c55e,#0ea5e9)":"#F1F5F9",color:degisenler.length?"#fff":"#64748B"},disabled:busy||!degisenler.length,onClick:katKaydet,children:busy?__T("Kaydediliyor…"):__T("Değişiklikleri kaydet")})]})]})
  ]}):e.jsxs("div",{style:S.card,children:[
   e.jsx("div",{style:S.sub,children:__T("Yarışma seçin; kategori ekleyin, çıkarın, adını ve aletlerini düzeltin. Sporcusu veya puanı olan kategori çıkarılamaz. Final kategorilerine dokunulmaz.")}),
   e.jsxs("select",{style:{...S.sel,width:"100%",marginBottom:".8rem",padding:".6rem .8rem",fontSize:".92rem"},value:comp,onChange:async t=>{const _v=t.target.value;if(Object.keys(yEd).length&&!await window.__gxConfirm(__T("Kaydedilmemiş değişiklikler kaybolacak. Devam edilsin mi?")))return;setComp(_v);setYEd({})},children:[e.jsx("option",{value:"",children:__T("Yarışma seçin…")}),
    Object.entries(comps).sort((a,b)=>String(b[1].tarih).localeCompare(String(a[1].tarih))).map(([k,c])=>e.jsx("option",{value:k,children:c.isim},k))]}),
   comp?e.jsxs(e.Fragment,{children:[...grupla(yKat,yarismaSatir),
    e.jsxs("div",{style:{display:"flex",gap:".6rem",alignItems:"center",marginTop:"1rem"},children:[
     Object.keys(yEd).length?e.jsx("button",{style:S.ghost,onClick:()=>setYEd({}),children:__T("Vazgeç")}):null,e.jsx("div",{style:{flex:1}}),
     yDegisim.length?e.jsx("span",{style:{color:"#B45309",fontWeight:800,fontSize:".82rem"},children:yDegisim.length+" "+__T("değişiklik")}):null,
     e.jsx("button",{style:{...S.btn,background:yDegisim.length?"linear-gradient(135deg,#22c55e,#0ea5e9)":"#F1F5F9",color:yDegisim.length?"#fff":"#64748B"},disabled:busy||!yDegisim.length,onClick:yUygula,children:busy?__T("Kaydediliyor…"):__T("Yarışmaya uygula")})]})]}):null]})})]});
}
export{KategoriYonetimi as default};
