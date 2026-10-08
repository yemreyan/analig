import"./i18n-Tr01a2b3Cb2.js";import{b as usToast,a as usInit,j as e,d as db}from"./main-C2LpyYUGCb2.js";import{r as R}from"./vendor-react-Cxw6bqwhCb2.js";import{k as ref,o as onValue,m as update}from"./vendor-firebase-940mxgRVCb2.js";import{utils as XU,writeFile as XW}from"./vendor-xlsx-CNerDvZXCb2.js";import{isFinal,cfg,grupOf,MIN_PUAN,siralamalar,normSiralama,hesaplaTablo}from"./aerobikKulupPuani-Kp01a2b3Cb2.js";import"./modulepreload-polyfill-B5Qt9EMXCb2.js";

const BASE="aerobik_yarismalar";
const f3=v=>v==null||isNaN(v)||!v?"—":Number(v).toFixed(3);
const yid=p=>p+Math.random().toString(36).slice(2,8);
const temiz=list=>list.map(s=>({id:s.id,ad:s.ad,grup:s.grup||"",minPuan:Math.max(1,parseInt(s.minPuan)||MIN_PUAN),puanlar:s.puanlar.map(p=>({id:p.id,ad:p.ad,kategoriler:[...p.kategoriler]}))}));

function KulupPuani(){
 const{toast}=usToast();usInit();
 const[comps,setComps]=R.useState({}),[comp,setComp]=R.useState(""),[loading,setLoading]=R.useState(!0),[busy,setBusy]=R.useState(!1);
 const[ed,setEd]=R.useState(null),[hepsi,setHepsi]=R.useState({});

 R.useEffect(()=>{const u=onValue(ref(db,BASE),s=>{const v=s.val()||{},o={};Object.entries(v).forEach(([k,c])=>{c&&c.arsivli!==!0&&c.arsivli!=="true"&&(o[k]=c)});setComps(o);setLoading(!1)});return()=>u()},[]);
 const C=comps[comp]||{},cats=C.kategoriler||{},kaIsaret=C.kuluplerarasi===!0,kayitliVar=C.kulupPuani?.surum===3;
 R.useEffect(()=>{setEd(null);setHepsi({})},[comp]);
 const kayitli=R.useMemo(()=>temiz(siralamalar(C)),[comp,JSON.stringify(C.kulupPuani||null),JSON.stringify(Object.keys(cats))]);
 const liste=ed||kayitli,dirty=!!ed&&JSON.stringify(ed)!==JSON.stringify(kayitli);
 const tablolar=R.useMemo(()=>comp?liste.map(s=>hesaplaTablo(C,s)):[],[C,liste]);
 const realCats=R.useMemo(()=>Object.keys(cats).filter(c=>!isFinal(c)).sort(),[comp,JSON.stringify(Object.keys(cats))]);
 const yasGruplari=R.useMemo(()=>[...new Set(realCats.map(grupOf).filter(Boolean))],[realCats]);
 const catAd=c=>cats[c]?.name||cfg(c).label||c;

 // duzenleme yardimcilari
 const degis=fn=>setEd(o=>{const k=temiz(o||kayitli);fn(k);return k});
 const sirDegis=(si,patch)=>degis(k=>{Object.assign(k[si],patch)});
 const sirEkle=()=>degis(k=>{k.push({id:yid("s"),ad:"",grup:"",minPuan:MIN_PUAN,puanlar:[{id:yid("p"),ad:"",kategoriler:[]}]})});
 const sirSil=async si=>{if(!await window.__gxConfirm(__T("Bu takım kategorisi silinsin mi?")))return;degis(k=>{k.splice(si,1)})};
 const puanEkle=si=>degis(k=>{k[si].puanlar.push({id:yid("p"),ad:"",kategoriler:[]})});
 const puanSil=(si,pi)=>degis(k=>{k[si].puanlar.splice(pi,1)});
 const puanTasi=(si,pi,d)=>degis(k=>{const a=k[si].puanlar,j=pi+d;if(j<0||j>=a.length)return;[a[pi],a[j]]=[a[j],a[pi]]});
 const puanDegis=(si,pi,patch)=>degis(k=>{Object.assign(k[si].puanlar[pi],patch)});
 const catTik=(si,pi,c)=>degis(k=>{const p=k[si].puanlar[pi];p.kategoriler=p.kategoriler.includes(c)?p.kategoriler.filter(x=>x!==c):[...p.kategoriler,c]});
 const grupSec=(si,g)=>degis(k=>{const s=k[si],eskiAd=s.ad,eskiG=s.grup;s.grup=g;if(!eskiAd||eskiAd===eskiG)s.ad=g});

 const kaydet=async()=>{if(!comp||busy)return;
  const bos=liste.findIndex(s=>!s.ad.trim());if(bos>=0){toast(__T("Takım kategorisinin adını yazın.")+" ("+(bos+1)+")","warning");return}
  for(const s of liste)for(let i=0;i<s.puanlar.length;i++){const p=s.puanlar[i];if(!p.ad.trim()){toast(s.ad+": "+(i+1)+". "+__T("puan türünün adını yazın."),"warning");return}if(!p.kategoriler.length){toast(s.ad+" / "+p.ad+": "+__T("en az bir kategori seçin."),"warning");return}}
  setBusy(!0);
  try{await update(ref(db,`${BASE}/${comp}`),{kulupPuani:{surum:3,siralamalar:temiz(liste)}});setEd(null);toast(__T("Kulüp puanı ayarları kaydedildi ✓"),"success")}
  catch{toast(__T("Kaydedilemedi."),"error")}setBusy(!1)};
 const hazirKurulum=async()=>{if(!comp||busy)return;
  if(!await window.__gxConfirm(__T("Kayıtlı ayar silinip hazır kuruluma (her yaş grubu: Tekler / Çiftler-Trio / Grup) dönülsün mü?")))return;
  setBusy(!0);try{await update(ref(db,`${BASE}/${comp}`),{kulupPuani:null});setEd(null);toast(__T("Hazır kuruluma dönüldü."),"success")}catch{toast(__T("Kaydedilemedi."),"error")}setBusy(!1)};
 const kaDegis=async v=>{if(!comp||busy)return;setBusy(!0);
  try{await update(ref(db,`${BASE}/${comp}`),{kuluplerarasi:v===!0});toast(v?__T("Yarışma kulüplerarası olarak işaretlendi."):__T("Kulüplerarası işareti kaldırıldı."),"success")}
  catch{toast(__T("Güncellenemedi."),"error")}setBusy(!1)};

 const excel=()=>{const wb=XU.book_new();let n=0;
  tablolar.forEach((t,ti)=>{if(!t.satirlar.length)return;n++;
   const rows=t.satirlar.map(r=>{const o={[__T("S.N.")]:r.sira,[__T("Kulüp")]:r.ad,[__T("İl")]:r.ilDen?"":r.il||""};
    t.bloklar.forEach(b=>{const g=r.det[b.id].en;o[b.ad]=g?Number(g.score.toFixed(3)):"";o[b.ad+" — "+__T("Sporcu")]=g?g.ad+" ("+g.catAd+")":""});
    o[__T("Takım Puanı")]=Number(r.net.toFixed(3));return o});
   XU.book_append_sheet(wb,XU.json_to_sheet(rows),String(liste[ti].ad||("Takim "+(ti+1))).replace(/[\\/?*[\]:]/g," ").slice(0,31))});
  if(!n){toast(__T("Takım puanı oluşan kulüp yok."),"warning");return}
  XW(wb,`${(C.isim||comp)}_takim_sonuclari.xlsx`.replace(/[^a-z0-9._-]/gi,"_"))};

 const S={wrap:{minHeight:"100vh",background:"#F0F2F5",color:"#1A1D26",fontFamily:"Nunito,system-ui,-apple-system,sans-serif",paddingBottom:"3rem"},
  top:{position:"sticky",top:0,zIndex:10,background:"#fff",backdropFilter:"blur(12px)",borderBottom:"1px solid #E5E7EB",boxShadow:"0 1px 3px rgba(0,0,0,.06)",padding:"0 1.25rem",minHeight:68,display:"flex",alignItems:"center",gap:".9rem",flexWrap:"wrap"},
  back:{width:38,height:38,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",color:"#1A1D26",textDecoration:"none",flexShrink:0},
  ico:{width:44,height:44,borderRadius:12,boxShadow:"0 6px 18px rgba(99,102,241,.28)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,background:"linear-gradient(135deg,#0ea5e9,#6366f1)"},
  in:{maxWidth:1050,margin:"0 auto",padding:"1rem"},
  sel:{width:"100%",padding:".65rem .8rem",borderRadius:10,border:"1px solid #E5E7EB",background:"#fff",color:"#1A1D26",fontWeight:700,fontSize:".95rem",marginBottom:"1rem"},
  card:{background:"#fff",border:"1px solid #E5E7EB",borderRadius:14,padding:".9rem 1rem",marginBottom:".8rem"},
  pcard:{background:"#F8FAFC",border:"1px solid #E5E7EB",borderRadius:12,padding:".7rem .8rem",marginTop:".6rem"},
  btn:{padding:".55rem .85rem",borderRadius:10,border:"none",color:"#fff",fontWeight:800,cursor:"pointer",fontSize:".85rem"},
  ghost:{padding:".45rem .7rem",borderRadius:9,border:"1px solid #E5E7EB",background:"#fff",color:"#475569",fontWeight:800,cursor:"pointer",fontSize:".8rem"},
  inp:{padding:".5rem .65rem",borderRadius:9,border:"1px solid #E5E7EB",background:"#F8FAFC",color:"#1A1D26",fontWeight:700,fontSize:".9rem"},
  chip:on=>({padding:".32rem .58rem",borderRadius:8,fontSize:".78rem",fontWeight:700,cursor:"pointer",border:"1px solid "+(on?"#0ea5e9":"#E5E7EB"),background:on?"rgba(14,165,233,.2)":"#F8FAFC",color:on?"#0369A1":"#64748B"}),
  lbl:{fontSize:".7rem",color:"#6B7280",fontWeight:800,textTransform:"uppercase",letterSpacing:".04em"},
  th:{padding:".5rem .6rem",fontSize:".7rem",color:"#6B7280",fontWeight:800,textTransform:"uppercase",letterSpacing:".03em",textAlign:"left",borderBottom:"1px solid #E5E7EB",whiteSpace:"nowrap"},
  td:{padding:".45rem .6rem",borderBottom:"1px solid #EEF2F7",fontWeight:700,fontSize:".86rem",verticalAlign:"top"}};

 const sirKarti=(s,si)=>{const goster=hepsi[s.id]||!s.grup,catListe=goster?realCats:realCats.filter(c=>grupOf(c)===s.grup);
  return e.jsxs("div",{style:{...S.card,borderColor:"#C7D2FE"},children:[
   e.jsxs("div",{style:{display:"flex",gap:".6rem",flexWrap:"wrap",alignItems:"flex-end"},children:[
    e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:".25rem",minWidth:170},children:[e.jsx("span",{style:S.lbl,children:__T("Yaş grubu")}),
     e.jsxs("select",{style:S.inp,value:s.grup,onChange:t=>grupSec(si,t.target.value),children:[e.jsx("option",{value:"",children:__T("— Tümü —")}),yasGruplari.map(g=>e.jsx("option",{value:g,children:g},g))]})]}),
    e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:".25rem",flex:1,minWidth:200},children:[e.jsx("span",{style:S.lbl,children:__T("Takım kategorisi adı")}),
     e.jsx("input",{style:{...S.inp,fontSize:"1rem"},placeholder:__T("ör. Yıldızlar"),value:s.ad,onChange:t=>sirDegis(si,{ad:t.target.value})})]}),
    e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:".25rem"},children:[e.jsx("span",{style:S.lbl,children:__T("En az kaç puan türü")}),
     e.jsx("input",{type:"number",min:1,max:Math.max(1,s.puanlar.length),style:{...S.inp,width:80,textAlign:"center"},value:s.minPuan,onChange:t=>sirDegis(si,{minPuan:Math.max(1,parseInt(t.target.value)||1)})})]}),
    e.jsx("button",{style:{...S.ghost,borderColor:"#FECACA",color:"#DC2626"},onClick:()=>sirSil(si),children:__T("Sil")})]}),
   s.puanlar.map((p,pi)=>e.jsxs("div",{style:S.pcard,children:[
    e.jsxs("div",{style:{display:"flex",gap:".5rem",alignItems:"center",flexWrap:"wrap"},children:[
     e.jsx("span",{style:{fontWeight:900,color:"#0369A1",minWidth:64},children:(pi+1)+". "+__T("Puan")}),
     e.jsx("input",{style:{...S.inp,flex:1,minWidth:180},placeholder:__T("Puan türü adı (ör. Tekler)"),value:p.ad,onChange:t=>puanDegis(si,pi,{ad:t.target.value})}),
     e.jsx("button",{style:{...S.ghost,opacity:pi===0?.4:1},disabled:pi===0,onClick:()=>puanTasi(si,pi,-1),children:"▲"}),
     e.jsx("button",{style:{...S.ghost,opacity:pi===s.puanlar.length-1?.4:1},disabled:pi===s.puanlar.length-1,onClick:()=>puanTasi(si,pi,1),children:"▼"}),
     e.jsx("button",{style:{...S.ghost,borderColor:"#FECACA",color:"#DC2626"},onClick:()=>puanSil(si,pi),children:"✕"})]}),
    e.jsx("div",{style:{fontSize:".74rem",color:"#6B7280",fontWeight:600,margin:".45rem 0 .35rem"},children:__T("Seçilen kategorilerdeki en yüksek tek puan alınır:")}),
    e.jsx("div",{style:{display:"flex",gap:".35rem",flexWrap:"wrap"},children:catListe.map(c=>e.jsx("span",{style:S.chip(p.kategoriler.includes(c)),onClick:()=>catTik(si,pi,c),children:catAd(c)},c))})]},p.id)),
   e.jsxs("div",{style:{display:"flex",gap:".5rem",flexWrap:"wrap",marginTop:".6rem",alignItems:"center"},children:[
    e.jsx("button",{style:{...S.btn,background:"linear-gradient(135deg,#0ea5e9,#6366f1)"},onClick:()=>puanEkle(si),children:"+ "+(s.puanlar.length+1)+". "+__T("puan ekle")}),
    s.grup?e.jsxs("label",{style:{fontSize:".78rem",color:"#6B7280",fontWeight:700,cursor:"pointer",display:"flex",gap:".35rem",alignItems:"center"},children:[e.jsx("input",{type:"checkbox",checked:!!hepsi[s.id],onChange:t=>setHepsi(o=>({...o,[s.id]:t.target.checked}))}),__T("Diğer yaş gruplarının kategorilerini de göster")]}):null]})]},s.id)};

 const tabloKarti=(t,ti)=>e.jsxs("div",{style:S.card,children:[
  e.jsxs("div",{style:{fontWeight:900,fontSize:".95rem",marginBottom:".5rem"},children:["🏆 ",liste[ti].ad||"—",e.jsx("span",{style:{color:"#6B7280",fontWeight:600,fontSize:".76rem",marginLeft:".5rem"},children:t.bloklar.map(b=>b.ad).join(" + ")+" · "+__T("en az")+" "+t.minPuan})]}),
  t.satirlar.length?e.jsx("div",{style:{overflowX:"auto"},children:e.jsxs("table",{style:{width:"100%",borderCollapse:"collapse",minWidth:560},children:[
   e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{style:S.th,children:__T("S.N.")}),e.jsx("th",{style:S.th,children:__T("Kulüp")}),...t.bloklar.map(b=>e.jsx("th",{style:S.th,children:b.ad},b.id)),e.jsx("th",{style:{...S.th,textAlign:"right"},children:__T("Takım Puanı")})]})}),
   e.jsx("tbody",{children:t.satirlar.map(r=>e.jsxs("tr",{children:[
    e.jsx("td",{style:{...S.td,fontWeight:900,color:r.sira<=3?"#B45309":"#6B7280"},children:r.sira}),
    e.jsxs("td",{style:S.td,children:[r.ad,r.il&&!r.ilDen?e.jsx("div",{style:{color:"#6B7280",fontWeight:600,fontSize:".72rem"},children:r.il}):null]}),
    ...t.bloklar.map(b=>{const g=r.det[b.id].en;return e.jsx("td",{style:S.td,children:g?e.jsxs(e.Fragment,{children:[e.jsx("div",{children:g.score.toFixed(3)}),e.jsx("div",{style:{color:"#6B7280",fontWeight:600,fontSize:".7rem"},children:g.ad}),e.jsx("div",{style:{color:"#64748B",fontWeight:600,fontSize:".66rem"},children:g.catAd})]}):e.jsx("span",{style:{color:"#64748B"},children:"—"})},b.id)}),
    e.jsx("td",{style:{...S.td,textAlign:"right",fontWeight:900,color:"#0369A1"},children:r.net.toFixed(3)})]},r.key))})]})}):e.jsx("div",{style:{color:"#6B7280",fontWeight:700,fontSize:".84rem"},children:__T("Takım puanı oluşan kulüp yok.")}),
  t.disarida.length?e.jsx("div",{style:{marginTop:".5rem",fontSize:".72rem",color:"#64748B",fontWeight:700},children:__T("Sıralamaya girmeyenler")+" ("+__T("en az")+" "+t.minPuan+"): "+t.disarida.map(r=>r.ad).join(", ")}):null]},liste[ti].id);

 return e.jsxs("div",{style:S.wrap,children:[
  e.jsxs("div",{style:S.top,children:[
   e.jsx("a",{href:"/aerobic",title:__T("Geri"),style:S.back,children:e.jsx("span",{className:"material-icons-round",children:"arrow_back"})}),e.jsx("div",{style:S.ico,children:e.jsx("span",{className:"material-icons-round",style:{color:"#fff"},children:"groups"})}),
   e.jsxs("div",{style:{minWidth:0},children:[e.jsx("div",{style:{fontWeight:900,fontSize:"1.02rem"},children:__T("Kulüp Takım Puanı")}),
    e.jsx("div",{style:{fontSize:".76rem",color:"#6B7280",fontWeight:600},children:__T("Takım kategorisi → puan türleri → kategorilerin en iyi puanı")})]})
   ]}),
  e.jsxs("div",{style:S.in,children:[
   loading?e.jsx("div",{style:{color:"#6B7280",fontWeight:700},children:__T("Yükleniyor…")}):e.jsxs(e.Fragment,{children:[
    e.jsxs("select",{style:S.sel,value:comp,onChange:async t=>{const _v=t.target.value;if(dirty&&!await window.__gxConfirm(__T("Kaydedilmemiş değişiklikler kaybolacak. Devam edilsin mi?")))return;setComp(_v)},children:[e.jsx("option",{value:"",children:__T("Yarışma seçin…")}),
     Object.entries(comps).sort((a,b)=>String(b[1].baslangicTarihi||"").localeCompare(String(a[1].baslangicTarihi||""))).map(([k,c])=>e.jsx("option",{value:k,children:(c.isim||k)+(c.kuluplerarasi===!0?" · ⭐":"")},k))]}),
    comp?e.jsxs(e.Fragment,{children:[
     e.jsxs("div",{style:{...S.card,display:"flex",alignItems:"center",gap:".8rem",flexWrap:"wrap",borderColor:kaIsaret?"#0ea5e9":"#E5E7EB"},children:[
      e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:".5rem",cursor:"pointer",fontWeight:800},children:[e.jsx("input",{type:"checkbox",checked:kaIsaret,onChange:t=>kaDegis(t.target.checked),disabled:busy}),__T("Bu yarışma kulüplerarası")]}),
      e.jsx("span",{style:{fontSize:".78rem",color:"#6B7280",fontWeight:600,flex:1,minWidth:200},children:kaIsaret?__T("Takım sonuçları Finaller ekranında kategori listesinde ayrı seçenekler olarak görünür."):__T("İşaretli değilse kulüp takım puanı gösterilmez; mevcut takım hesabı aynen korunur.")})]}),
     !kayitliVar&&!ed?e.jsx("div",{style:{...S.card,borderStyle:"dashed",color:"#475569",fontSize:".82rem",fontWeight:600},children:__T("Kayıtlı ayar yok — hazır kurulum gösteriliyor (her yaş grubu: Tekler / Çiftler-Trio / Grup). Değiştirip kaydedebilirsiniz.")}):null,
     liste.map(sirKarti),
     e.jsxs("div",{style:{display:"flex",gap:".6rem",flexWrap:"wrap",alignItems:"center",margin:".2rem 0 1.2rem"},children:[
      e.jsx("button",{style:{...S.btn,background:"#fff",color:"#4338CA",border:"1px solid #C7D2FE"},onClick:sirEkle,children:"+ "+__T("Takım kategorisi ekle")}),
      kayitliVar?e.jsx("button",{style:S.ghost,disabled:busy,onClick:hazirKurulum,children:__T("Hazır kuruluma dön")}):null,
      e.jsx("div",{style:{flex:1}}),
      dirty?e.jsx("button",{style:S.ghost,onClick:()=>setEd(null),children:__T("Vazgeç")}):null,
      dirty?e.jsx("span",{style:{color:"#B45309",fontWeight:800,fontSize:".8rem"},children:__T("• kaydedilmedi")}):null,
      e.jsx("button",{style:{...S.btn,background:dirty||!kayitliVar?"linear-gradient(135deg,#22c55e,#0ea5e9)":"#F1F5F9",color:dirty||!kayitliVar?"#fff":"#6B7280"},disabled:busy||(!dirty&&kayitliVar),onClick:kaydet,children:busy?__T("Kaydediliyor…"):__T("Kaydet")})]}),
     e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:".6rem",margin:"0 0 .5rem"},children:[e.jsx("div",{style:{fontWeight:900,flex:1},children:__T("Önizleme")}),e.jsx("button",{style:S.ghost,onClick:excel,children:"Excel"})]}),
     tablolar.map(tabloKarti)
    ]}):null]})]})]});
}
export{KulupPuani as default};
