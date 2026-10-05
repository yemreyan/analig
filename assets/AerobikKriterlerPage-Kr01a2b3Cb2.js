import"./i18n-Tr01a2b3Cb2.js";import{b as usToast,a as usInit,j as e,d as db}from"./main-C2LpyYUGCb2.js";import{r as R}from"./vendor-react-Cxw6bqwhCb2.js";import{k as ref,o as onValue,m as update,v as fset}from"./vendor-firebase-940mxgRVCb2.js";import{A as V}from"./aerobikCriteriaDefaults-ld4mBtrICb2.js";import"./modulepreload-polyfill-B5Qt9EMXCb2.js";

// Aerobik Kriterler — kategori görünen adları.
// 1) criteria/aerobikKategoriAdlari : varsayılan görünen adlar (yeni yarışmalar bu adlarla oluşur)
// 2) aerobik_yarismalar/<yarışma>/kategoriler/<kod>/name : yarışmada görünen ad.
//    Puanlama, canlı skor, finaller, final oluşturma, PDF ve overlay bu alanı okur.
const BASE="aerobik_yarismalar",MAP="criteria/aerobikKategoriAdlari";
const isFinal=c=>/^final_/.test(c);
const SIRA=["Minikler","Küçükler","Yıldızlar","Gençler","Büyükler","Step Aerobik"];
const gSira=g=>{const i=SIRA.indexOf(g);return i<0?99:i};
const sysAd=c=>V[c]?.label||V[String(c).replace(/^final_/,"")]?.label||c;
const temizAd=s=>String(s||"").replace(/\s+/g," ").trim();

function Kriterler(){
 const{toast}=usToast();usInit();
 const[harita,setHarita]=R.useState({}),[hEd,setHEd]=R.useState(null),[comps,setComps]=R.useState({}),[comp,setComp]=R.useState(""),[yEd,setYEd]=R.useState({}),[busy,setBusy]=R.useState(!1),[ara,setAra]=R.useState("");

 R.useEffect(()=>{const u=onValue(ref(db,MAP),s=>setHarita(s.val()||{}));return()=>u()},[]);
 R.useEffect(()=>{const u=onValue(ref(db,BASE),s=>{const v=s.val()||{},o={};Object.entries(v).forEach(([k,c])=>{c&&c.arsivli!==!0&&c.arsivli!=="true"&&(o[k]={isim:c.isim||k,baslangicTarihi:c.baslangicTarihi||"",kategoriler:c.kategoriler||{}})});setComps(o)});return()=>u()},[]);
 R.useEffect(()=>{setYEd({})},[comp]);

 // ---- 1) varsayılan adlar ----
 const tumKat=R.useMemo(()=>Object.keys(V).sort((a,b)=>gSira(V[a].group)-gSira(V[b].group)||a.localeCompare(b,"tr")),[]);
 const hDeger=c=>hEd&&c in hEd?hEd[c]:(harita[c]||"");
 const hDirty=!!hEd&&Object.keys(hEd).some(c=>temizAd(hEd[c])!==(harita[c]||""));
 const hKaydet=async()=>{if(busy)return;setBusy(!0);
  const yeni={...harita};Object.entries(hEd||{}).forEach(([c,v])=>{const t=temizAd(v);if(!t||t===sysAd(c))delete yeni[c];else yeni[c]=t});
  try{await fset(ref(db,MAP),Object.keys(yeni).length?yeni:null);setHEd(null);toast(__T("Varsayılan kategori adları kaydedildi ✓"),"success")}catch{toast(__T("Kaydedilemedi."),"error")}setBusy(!1)};

 // ---- 2) yarışmaya uygula ----
 const C=comps[comp]||{},cats=C.kategoriler||{};
 const yKat=Object.keys(cats).filter(c=>!isFinal(c)).sort((a,b)=>gSira(V[a]?.group)-gSira(V[b]?.group)||a.localeCompare(b,"tr"));
 const mevcut=c=>cats[c]?.name||sysAd(c);
 const yDeger=c=>c in yEd?yEd[c]:mevcut(c);
 const degisen=yKat.filter(c=>temizAd(yDeger(c))&&temizAd(yDeger(c))!==mevcut(c));
 const varsayilanDoldur=()=>{const o={};yKat.forEach(c=>{const h=harita[c]||sysAd(c);if(h!==mevcut(c))o[c]=h});setYEd(o);
  toast(Object.keys(o).length?Object.keys(o).length+" "+__T("kategoriye varsayılan ad dolduruldu — kaydetmeyi unutmayın."):__T("Bu yarışmadaki adlar zaten varsayılanlarla aynı."),"info")};
 const yKaydet=async()=>{if(busy||!comp||!degisen.length)return;
  const liste=degisen.map(c=>`• ${mevcut(c)}  →  ${temizAd(yDeger(c))}`).join("\n");
  if(!await window.__gxConfirm(C.isim+"\n\n"+liste+"\n\n"+__T("Bu adlar yarışmada (puanlama, canlı sonuçlar, finaller, final oluşturma, PDF) görünecek. Kaydedilsin mi?")))return;
  setBusy(!0);const upd={};
  degisen.forEach(c=>{const t=temizAd(yDeger(c));upd[`kategoriler/${c}/name`]=t;if(cats["final_"+c])upd[`kategoriler/final_${c}/name`]="🏆 Final — "+t});
  try{await update(ref(db,`${BASE}/${comp}`),upd);setYEd({});toast(degisen.length+" "+__T("kategori adı güncellendi ✓"),"success")}catch{toast(__T("Kaydedilemedi."),"error")}setBusy(!1)};

 const S={wrap:{minHeight:"100vh",background:"radial-gradient(1200px 600px at 50% -10%,#111a30 0%,#0a0e1a 60%)",color:"#e8edf7",fontFamily:"'Plus Jakarta Sans',system-ui,sans-serif",paddingBottom:"3rem"},
  top:{position:"sticky",top:0,zIndex:10,background:"rgba(10,14,26,.9)",backdropFilter:"blur(12px)",borderBottom:"1px solid #2a3550",padding:".8rem 1.1rem",display:"flex",alignItems:"center",gap:".8rem"},
  ico:{width:38,height:38,borderRadius:11,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,background:"linear-gradient(135deg,#7c3aed,#6366f1)"},
  in:{maxWidth:1000,margin:"0 auto",padding:"1rem"},
  card:{background:"#131a2b",border:"1px solid #2a3550",borderRadius:14,padding:"1rem",marginBottom:"1rem"},
  h:{fontWeight:900,fontSize:"1rem",marginBottom:".25rem"},
  sub:{fontSize:".8rem",color:"#8b97b3",fontWeight:600,marginBottom:".8rem",lineHeight:1.5},
  sel:{width:"100%",padding:".6rem .8rem",borderRadius:10,border:"1px solid #2a3550",background:"#0f1626",color:"#e8edf7",fontWeight:700,fontSize:".92rem",marginBottom:".8rem"},
  inp:ch=>({width:"100%",padding:".45rem .6rem",borderRadius:8,border:"1px solid "+(ch?"#f59e0b":"#2a3550"),background:ch?"rgba(245,158,11,.08)":"#0b1120",color:"#e8edf7",fontWeight:700,fontSize:".88rem"}),
  gh:{fontSize:".7rem",color:"#7dd3fc",fontWeight:900,textTransform:"uppercase",letterSpacing:".05em",padding:".7rem 0 .3rem"},
  row:{display:"grid",gridTemplateColumns:"minmax(110px,150px) 1fr 1.3fr",gap:".6rem",alignItems:"center",padding:".3rem 0",borderBottom:"1px solid rgba(40,52,79,.45)"},
  kod:{fontFamily:"ui-monospace,monospace",fontSize:".72rem",color:"#6b7690"},
  sys:{fontSize:".82rem",color:"#a9b4cc",fontWeight:600},
  btn:{padding:".6rem 1rem",borderRadius:10,border:"none",color:"#fff",fontWeight:800,cursor:"pointer",fontSize:".88rem"},
  ghost:{padding:".55rem .9rem",borderRadius:10,border:"1px solid #2a3550",background:"#1b2438",color:"#cbd5e1",fontWeight:800,cursor:"pointer",fontSize:".85rem"}};

 const gruplu=(list,render)=>{let son=null;const out=[];list.forEach(c=>{const g=V[c]?.group||__T("Diğer");if(g!==son){out.push(e.jsx("div",{style:S.gh,children:g},"g_"+g+c));son=g}out.push(render(c))});return out};
 const aranan=c=>{const q=ara.trim().toLocaleLowerCase("tr-TR");if(!q)return!0;return[c,sysAd(c),harita[c]||""].some(x=>String(x).toLocaleLowerCase("tr-TR").includes(q))};

 return e.jsxs("div",{style:S.wrap,children:[
  e.jsxs("div",{style:S.top,children:[e.jsx("div",{style:S.ico,children:e.jsx("span",{className:"material-icons-round",style:{color:"#fff"},children:"tune"})}),
   e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:".72rem",color:"#8b97b3",fontWeight:800,textTransform:"uppercase",letterSpacing:".05em"},children:__T("Aerobik")}),e.jsx("div",{style:{fontWeight:900,fontSize:"1.05rem"},children:__T("Kriterler — Kategori Adları")})]}),
   e.jsx("div",{style:{flex:1}}),e.jsx("a",{href:"/aerobik",style:{...S.ghost,textDecoration:"none"},children:__T("← Geri")})]}),
  e.jsxs("div",{style:S.in,children:[

   // ---------- yarışmaya uygula ----------
   e.jsxs("div",{style:{...S.card,borderColor:"#3b4a72"},children:[
    e.jsx("div",{style:S.h,children:__T("Yarışmada görünen kategori adları")}),
    e.jsx("div",{style:S.sub,children:__T("Bir yarışma seçin, adları düzenleyin ve kaydedin. Puanlama ekranı, canlı sonuçlar, final sonuçları, final oluşturma, PDF/Excel ve yayın overlay'i bu adları gösterir. Final kategorisi varsa onun adı da güncellenir.")}),
    e.jsxs("select",{style:S.sel,value:comp,onChange:async t=>{const _v=t.target.value;if(Object.keys(yEd).length&&!await window.__gxConfirm(__T("Kaydedilmemiş değişiklikler kaybolacak. Devam edilsin mi?")))return;setComp(_v)},children:[e.jsx("option",{value:"",children:__T("Yarışma seçin…")}),
     Object.entries(comps).sort((a,b)=>String(b[1].baslangicTarihi).localeCompare(String(a[1].baslangicTarihi))).map(([k,c])=>e.jsx("option",{value:k,children:c.isim},k))]}),
    comp?yKat.length?e.jsxs(e.Fragment,{children:[
     e.jsxs("div",{style:{...S.row,borderBottom:"1px solid #2a3550"},children:[e.jsx("span",{style:{...S.kod,fontWeight:800},children:__T("Kod")}),e.jsx("span",{style:{...S.sys,fontWeight:800},children:__T("Şu anki ad")}),e.jsx("span",{style:{...S.sys,fontWeight:800},children:__T("Görünecek ad")})]}),
     ...gruplu(yKat,c=>{const ch=temizAd(yDeger(c))!==mevcut(c);return e.jsxs("div",{style:S.row,children:[
      e.jsx("span",{style:S.kod,children:c}),e.jsx("span",{style:S.sys,children:mevcut(c)}),
      e.jsx("input",{style:S.inp(ch),value:yDeger(c),placeholder:sysAd(c),onChange:t=>setYEd(o=>({...o,[c]:t.target.value}))})]},c)}),
     e.jsxs("div",{style:{display:"flex",gap:".6rem",flexWrap:"wrap",alignItems:"center",marginTop:".9rem"},children:[
      e.jsx("button",{style:S.ghost,disabled:busy,onClick:varsayilanDoldur,children:__T("Varsayılan adları doldur")}),
      Object.keys(yEd).length?e.jsx("button",{style:S.ghost,onClick:()=>setYEd({}),children:__T("Vazgeç")}):null,
      e.jsx("div",{style:{flex:1}}),
      degisen.length?e.jsx("span",{style:{color:"#fbbf24",fontWeight:800,fontSize:".82rem"},children:degisen.length+" "+__T("değişiklik")}):null,
      e.jsx("button",{style:{...S.btn,background:degisen.length?"linear-gradient(135deg,#22c55e,#0ea5e9)":"#1b2438",color:degisen.length?"#fff":"#6b7690"},disabled:busy||!degisen.length,onClick:yKaydet,children:busy?__T("Kaydediliyor…"):__T("Bu yarışmaya kaydet")})]})
    ]}):e.jsx("div",{style:{color:"#8b97b3",fontWeight:700},children:__T("Bu yarışmada kategori yok.")}):null]}),

   // ---------- varsayılan adlar ----------
   e.jsxs("div",{style:S.card,children:[
    e.jsx("div",{style:S.h,children:__T("Varsayılan görünen adlar")}),
    e.jsx("div",{style:S.sub,children:__T("Yeni oluşturulan yarışmalarda kategoriler bu adlarla gelir. Mevcut bir yarışmaya uygulamak için yukarıda yarışmayı seçip “Varsayılan adları doldur”a basın. Boş bırakılan kategori sistem adını kullanır.")}),
    e.jsx("input",{style:{...S.inp(!1),marginBottom:".5rem"},placeholder:__T("Kategori ara…"),value:ara,onChange:t=>setAra(t.target.value)}),
    e.jsxs("div",{style:{...S.row,borderBottom:"1px solid #2a3550"},children:[e.jsx("span",{style:{...S.kod,fontWeight:800},children:__T("Kod")}),e.jsx("span",{style:{...S.sys,fontWeight:800},children:__T("Sistem adı")}),e.jsx("span",{style:{...S.sys,fontWeight:800},children:__T("Görünecek ad")})]}),
    ...gruplu(tumKat.filter(aranan),c=>{const v=hDeger(c),ch=temizAd(v)!==(harita[c]||"");return e.jsxs("div",{style:S.row,children:[
     e.jsx("span",{style:S.kod,children:c}),e.jsx("span",{style:S.sys,children:sysAd(c)}),
     e.jsx("input",{style:S.inp(ch),value:v,placeholder:sysAd(c),onChange:t=>setHEd(o=>({...(o||{}),[c]:t.target.value}))})]},c)}),
    e.jsxs("div",{style:{display:"flex",gap:".6rem",alignItems:"center",marginTop:".9rem"},children:[
     hDirty?e.jsx("button",{style:S.ghost,onClick:()=>setHEd(null),children:__T("Vazgeç")}):null,e.jsx("div",{style:{flex:1}}),
     e.jsx("button",{style:{...S.btn,background:hDirty?"linear-gradient(135deg,#7c3aed,#6366f1)":"#1b2438",color:hDirty?"#fff":"#6b7690"},disabled:busy||!hDirty,onClick:hKaydet,children:busy?__T("Kaydediliyor…"):__T("Varsayılanları kaydet")})]})]})
  ]})]});
}
export{Kriterler as default};
