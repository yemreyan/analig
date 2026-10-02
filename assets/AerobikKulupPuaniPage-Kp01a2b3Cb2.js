import"./i18n-Tr01a2b3Cb2.js";import{b as usToast,a as usInit,j as e,d as db}from"./main-C2LpyYUGCb2.js";import{r as R}from"./vendor-react-Cxw6bqwhCb2.js";import{k as ref,o as onValue,m as update}from"./vendor-firebase-940mxgRVCb2.js";import{utils as XU,writeFile as XW}from"./vendor-xlsx-CNerDvZXCb2.js";import{cfg,BILESEN,turOf,varsayilan,etkinKurallar,hesaplaTablo}from"./aerobikKulupPuani-Kp01a2b3Cb2.js";import"./modulepreload-polyfill-B5Qt9EMXCb2.js";

const BASE="aerobik_yarismalar";
const f3=v=>v==null||isNaN(v)||!v?"—":Number(v).toFixed(3);
const ACIK={tekler:"Erkek ve kız tüm ferdi kategoriler — kulübün en yüksek tek puanı",ciftler:"Tüm çift kategorileri — kulübün en yüksek çift puanı",trio:"Tüm trio kategorileri — kulübün en yüksek trio puanı"};

function KulupPuani(){
 const{toast}=usToast();usInit();
 const[comps,setComps]=R.useState({}),[comp,setComp]=R.useState(""),[loading,setLoading]=R.useState(!0),[busy,setBusy]=R.useState(!1),[sec,setSec]=R.useState(null);

 R.useEffect(()=>{const u=onValue(ref(db,BASE),s=>{const v=s.val()||{},o={};Object.entries(v).forEach(([k,c])=>{c&&c.arsivli!==!0&&c.arsivli!=="true"&&(o[k]=c)});setComps(o);setLoading(!1)});return()=>u()},[]);
 const C=comps[comp]||{},cats=C.kategoriler||{},kaIsaret=C.kuluplerarasi===!0;
 const kayitli=R.useMemo(()=>etkinKurallar(C),[comp,JSON.stringify(C.kulupPuani||null),JSON.stringify(Object.keys(cats))]);
 R.useEffect(()=>{setSec(null)},[comp]);
 const kur=sec||kayitli,dirty=!!sec&&JSON.stringify(sec)!==JSON.stringify(kayitli);
 const tablo=R.useMemo(()=>comp?hesaplaTablo({...C,kulupPuani:{surum:2,...kur}}):{satirlar:[],bloklar:[]},[C,kur]);
 const turCats=R.useMemo(()=>{const o={tekler:[],ciftler:[],trio:[]};Object.keys(cats).sort().forEach(c=>{const t=turOf(c);t&&o[t].push(c)});return o},[comp,JSON.stringify(Object.keys(cats))]);
 const catAd=c=>cats[c]?.name||cfg(c).label||c;
 const tik=(b,c)=>setSec(o=>{const k={...(o||kayitli)},a=k[b]||[];k[b]=a.includes(c)?a.filter(x=>x!==c):[...a,c];return k});

 const kaydet=async()=>{if(!comp||busy)return;setBusy(!0);
  try{await update(ref(db,`${BASE}/${comp}`),{kulupPuani:{surum:2,tekler:kur.tekler,ciftler:kur.ciftler,trio:kur.trio}});setSec(null);toast(__T("Kulüp puanı ayarları kaydedildi ✓"),"success")}
  catch{toast(__T("Kaydedilemedi."),"error")}setBusy(!1)};
 const varsayilanaDon=async()=>{if(!comp||busy)return;setBusy(!0);
  try{await update(ref(db,`${BASE}/${comp}`),{kulupPuani:null});setSec(null);toast(__T("Varsayılan ayara dönüldü (tüm kategoriler)."),"success")}
  catch{toast(__T("Kaydedilemedi."),"error")}setBusy(!1)};
 const kaDegis=async v=>{if(!comp||busy)return;setBusy(!0);
  try{await update(ref(db,`${BASE}/${comp}`),{kuluplerarasi:v===!0});toast(v?__T("Yarışma kulüplerarası olarak işaretlendi."):__T("Kulüplerarası işareti kaldırıldı."),"success")}
  catch{toast(__T("Güncellenemedi."),"error")}setBusy(!1)};

 const excel=()=>{if(!tablo.satirlar.length)return;
  const rows=tablo.satirlar.map(r=>{const o={[__T("S.N.")]:r.sira,[__T("Kulüp")]:r.ad,[__T("İl")]:r.ilDen?"":r.il||""};
   tablo.bloklar.forEach(b=>{const g=r.det[b.id].en;o[__T(b.ad)]=g?Number(g.score.toFixed(3)):"";o[__T(b.ad)+" — "+__T("Sporcu")]=g?g.ad+" ("+g.catAd+")":""});
   o[__T("Takım Puanı")]=Number(r.net.toFixed(3));return o});
  const wb=XU.book_new();XU.book_append_sheet(wb,XU.json_to_sheet(rows),"Kulup Takim Puani");
  XW(wb,`${(C.isim||comp)}_kulup_takim_puani.xlsx`.replace(/[^a-z0-9._-]/gi,"_"))};

 const S={wrap:{minHeight:"100vh",background:"radial-gradient(1200px 600px at 50% -10%,#111a30 0%,#0a0e1a 60%)",color:"#e8edf7",fontFamily:"'Plus Jakarta Sans',system-ui,sans-serif",paddingBottom:"3rem"},
  top:{position:"sticky",top:0,zIndex:10,background:"rgba(10,14,26,.9)",backdropFilter:"blur(12px)",borderBottom:"1px solid #2a3550",padding:".8rem 1.1rem",display:"flex",alignItems:"center",gap:".8rem"},
  ico:{width:38,height:38,borderRadius:11,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,background:"linear-gradient(135deg,#0ea5e9,#6366f1)"},
  in:{maxWidth:1000,margin:"0 auto",padding:"1rem"},
  sel:{width:"100%",padding:".65rem .8rem",borderRadius:10,border:"1px solid #2a3550",background:"#131a2b",color:"#e8edf7",fontWeight:700,fontSize:".95rem",marginBottom:"1rem"},
  card:{background:"#131a2b",border:"1px solid #2a3550",borderRadius:14,padding:".9rem 1rem",marginBottom:".7rem"},
  btn:{padding:".6rem .9rem",borderRadius:10,border:"none",color:"#fff",fontWeight:800,cursor:"pointer",fontSize:".88rem"},
  chip:on=>({padding:".35rem .6rem",borderRadius:8,fontSize:".8rem",fontWeight:700,cursor:"pointer",border:"1px solid "+(on?"#0ea5e9":"#2a3550"),background:on?"rgba(14,165,233,.18)":"#0f1626",color:on?"#7dd3fc":"#6b7690",textDecoration:on?"none":"line-through"}),
  th:{padding:".55rem .6rem",fontSize:".72rem",color:"#8b97b3",fontWeight:800,textTransform:"uppercase",letterSpacing:".03em",textAlign:"left",borderBottom:"1px solid #2a3550",whiteSpace:"nowrap"},
  td:{padding:".5rem .6rem",borderBottom:"1px solid rgba(40,52,79,.5)",fontWeight:700,fontSize:".88rem",verticalAlign:"top"}};

 return e.jsxs("div",{style:S.wrap,children:[
  e.jsxs("div",{style:S.top,children:[
   e.jsx("div",{style:S.ico,children:e.jsx("span",{className:"material-icons",style:{color:"#fff"},children:"groups"})}),
   e.jsxs("div",{style:{minWidth:0},children:[e.jsx("div",{style:{fontWeight:900,fontSize:"1.02rem"},children:__T("Kulüp Takım Puanı")}),
    e.jsx("div",{style:{fontSize:".76rem",color:"#8b97b3",fontWeight:600},children:__T("Tekler + Çiftler + Trio — her birinde kulübün en yüksek puanı")})]}),
   e.jsx("div",{style:{flex:1}}),
   e.jsx("a",{href:"/aerobik",style:{...S.btn,background:"#1b2438",border:"1px solid #2a3550",textDecoration:"none",color:"#a9b4cc"},children:__T("← Geri")})]}),
  e.jsxs("div",{style:S.in,children:[
   loading?e.jsx("div",{style:{color:"#8b97b3",fontWeight:700},children:__T("Yükleniyor…")}):e.jsxs(e.Fragment,{children:[
    e.jsxs("select",{style:S.sel,value:comp,onChange:t=>setComp(t.target.value),children:[e.jsx("option",{value:"",children:__T("Yarışma seçin…")}),
     Object.entries(comps).sort((a,b)=>String(b[1].baslangicTarihi||"").localeCompare(String(a[1].baslangicTarihi||""))).map(([k,c])=>e.jsx("option",{value:k,children:(c.isim||k)+(c.kuluplerarasi===!0?" · ⭐":"")},k))]}),
    comp?e.jsxs(e.Fragment,{children:[
     e.jsxs("div",{style:{...S.card,display:"flex",alignItems:"center",gap:".8rem",flexWrap:"wrap",borderColor:kaIsaret?"#0ea5e9":"#2a3550"},children:[
      e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:".5rem",cursor:"pointer",fontWeight:800},children:[e.jsx("input",{type:"checkbox",checked:kaIsaret,onChange:t=>kaDegis(t.target.checked),disabled:busy}),__T("Bu yarışma kulüplerarası")]}),
      e.jsx("span",{style:{fontSize:".78rem",color:"#8b97b3",fontWeight:600,flex:1,minWidth:200},children:kaIsaret?__T("Kulüp takım puanı Finaller ekranında kategori listesinde ayrı bir seçenek olarak görünür."):__T("İşaretli değilse kulüp takım puanı gösterilmez; mevcut takım hesabı aynen korunur.")})]}),

     e.jsxs("div",{style:S.card,children:[
      e.jsx("div",{style:{fontWeight:900,fontSize:".95rem",marginBottom:".2rem"},children:__T("Takım puanı = Tekler + Çiftler + Trio")}),
      e.jsx("div",{style:{fontSize:".8rem",color:"#8b97b3",fontWeight:600,marginBottom:".6rem"},children:[__T("Bir kulüpten kaç sporcu yarışırsa yarışsın, her bölümde sadece en yüksek puan alınır. Varsayılan olarak tüm kategoriler dahildir; hariç tutmak istediğiniz kategoriye dokunun."),e.jsx("br",{}),e.jsx("b",{style:{color:"#fbbf24"},children:__T("Takım puanı için en az 2 bölümde puan gerekir; tek bölümde puanı olan kulüp sıralamaya girmez.")})]}),
      BILESEN.map(([id,ad])=>e.jsxs("div",{style:{borderTop:"1px solid #2a3550",padding:".65rem 0"},children:[
       e.jsxs("div",{style:{display:"flex",alignItems:"baseline",gap:".5rem",flexWrap:"wrap",marginBottom:".4rem"},children:[
        e.jsx("span",{style:{fontWeight:900,color:"#7dd3fc",fontSize:".95rem"},children:__T(ad)}),
        e.jsx("span",{style:{fontSize:".76rem",color:"#8b97b3",fontWeight:600},children:__T(ACIK[id])})]}),
       turCats[id].length?e.jsx("div",{style:{display:"flex",gap:".35rem",flexWrap:"wrap"},children:turCats[id].map(c=>e.jsx("span",{style:S.chip(kur[id].includes(c)),onClick:()=>tik(id,c),children:catAd(c)},c))}):e.jsx("div",{style:{fontSize:".8rem",color:"#55617d",fontWeight:700},children:__T("Bu yarışmada bu türde kategori yok.")})]},id)),
      e.jsxs("div",{style:{display:"flex",gap:".6rem",flexWrap:"wrap",alignItems:"center",paddingTop:".6rem",borderTop:"1px solid #2a3550"},children:[
       C.kulupPuani?e.jsx("button",{style:{...S.btn,background:"#1b2438",border:"1px solid #2a3550",color:"#a9b4cc"},disabled:busy,onClick:varsayilanaDon,children:__T("Varsayılana dön")}):null,
       e.jsx("div",{style:{flex:1}}),
       dirty?e.jsx("span",{style:{color:"#fbbf24",fontWeight:800,fontSize:".8rem"},children:__T("• kaydedilmedi")}):null,
       dirty?e.jsx("button",{style:{...S.btn,background:"linear-gradient(135deg,#22c55e,#0ea5e9)"},disabled:busy,onClick:kaydet,children:busy?__T("Kaydediliyor…"):__T("Kaydet")}):null]})]}),

     e.jsxs("div",{style:S.card,children:[
      e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:".6rem",flexWrap:"wrap",marginBottom:".6rem"},children:[
       e.jsx("div",{style:{fontWeight:900,fontSize:".95rem",flex:1},children:__T("Kulüp Sıralaması")}),
       tablo.satirlar.length?e.jsx("button",{style:{...S.btn,background:"#1b2438",border:"1px solid #2a3550",color:"#a9b4cc"},onClick:excel,children:"Excel"}):null]}),
      tablo.satirlar.length?e.jsx("div",{style:{overflowX:"auto"},children:e.jsxs("table",{style:{width:"100%",borderCollapse:"collapse",minWidth:620},children:[
       e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{style:S.th,children:__T("S.N.")}),e.jsx("th",{style:S.th,children:__T("Kulüp")}),
        ...BILESEN.map(([id,ad])=>e.jsx("th",{style:S.th,children:__T(ad)},id)),e.jsx("th",{style:{...S.th,textAlign:"right"},children:__T("Takım Puanı")})]})}),
       e.jsx("tbody",{children:tablo.satirlar.map(r=>e.jsxs("tr",{children:[
        e.jsx("td",{style:{...S.td,fontWeight:900,color:r.sira<=3?"#fbbf24":"#8b97b3"},children:r.sira}),
        e.jsxs("td",{style:S.td,children:[r.ad,r.il&&!r.ilDen?e.jsx("div",{style:{color:"#8b97b3",fontWeight:600,fontSize:".74rem"},children:r.il}):null]}),
        ...BILESEN.map(([id])=>{const g=r.det[id].en;return e.jsx("td",{style:S.td,children:g?e.jsxs(e.Fragment,{children:[e.jsx("div",{children:g.score.toFixed(3)}),e.jsx("div",{style:{color:"#8b97b3",fontWeight:600,fontSize:".72rem"},children:g.ad}),e.jsx("div",{style:{color:"#55617d",fontWeight:600,fontSize:".68rem"},children:g.catAd})]}):e.jsx("span",{style:{color:"#55617d"},children:"—"})},id)}),
        e.jsx("td",{style:{...S.td,textAlign:"right",fontWeight:900,color:"#7dd3fc",fontSize:".95rem"},children:r.net.toFixed(3)})]},r.key))})]})}):e.jsx("div",{style:{color:"#8b97b3",fontWeight:700,fontSize:".85rem"},children:__T("Takım puanı oluşan kulüp yok (en az 2 bölümde puan gerekir).")}),
      tablo.disarida&&tablo.disarida.length?e.jsxs("div",{style:{marginTop:".8rem",paddingTop:".6rem",borderTop:"1px dashed #2a3550"},children:[
       e.jsx("div",{style:{fontSize:".72rem",color:"#8b97b3",fontWeight:800,textTransform:"uppercase",letterSpacing:".03em",marginBottom:".35rem"},children:__T("Sıralamaya girmeyenler (tek bölümde puan)")+" · "+tablo.disarida.length}),
       e.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:".35rem"},children:tablo.disarida.map(r=>e.jsx("span",{style:{fontSize:".76rem",color:"#6b7690",fontWeight:700,padding:".2rem .45rem",border:"1px solid #2a3550",borderRadius:6},children:r.ad+" — "+BILESEN.filter(([id])=>r.det[id].en).map(([,ad])=>__T(ad)).join(", ")},r.key))})]}):null]})
    ]}):null]})]})]});
}
export{KulupPuani as default};
