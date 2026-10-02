import"./i18n-Tr01a2b3Cb2.js";import{b as usToast,a as usInit,j as e,d as db}from"./main-C2LpyYUGCb2.js";import{r as R}from"./vendor-react-Cxw6bqwhCb2.js";import{k as ref,o as onValue,m as update}from"./vendor-firebase-940mxgRVCb2.js";import{utils as XU,writeFile as XW}from"./vendor-xlsx-CNerDvZXCb2.js";import{isFinal,cfg,YON,yonAd,needsN,BOS,normCfg,hazirBloklar,hesaplaTablo}from"./aerobikKulupPuani-Kp01a2b3Cb2.js";import"./modulepreload-polyfill-B5Qt9EMXCb2.js";

const BASE="aerobik_yarismalar";
const f3=v=>v==null||isNaN(v)?"\u2014":Number(v).toFixed(3);

function KulupPuani(){
 const{toast}=usToast();usInit();
 const[comps,setComps]=R.useState({}),[comp,setComp]=R.useState(""),[loading,setLoading]=R.useState(!0),[busy,setBusy]=R.useState(!1);
 const[kurallar,setKurallar]=R.useState({aktif:!1,cezaDus:!1,bloklar:[]}),[kayitli,setKayitli]=R.useState("{}"),[acik,setAcik]=R.useState({});

 R.useEffect(()=>{const u=onValue(ref(db,BASE),s=>{const v=s.val()||{},o={};Object.entries(v).forEach(([k,c])=>{c&&c.arsivli!==!0&&c.arsivli!=="true"&&(o[k]=c)});setComps(o);setLoading(!1)});return()=>u()},[]);

 const C=comps[comp]||{},cats=C.kategoriler||{},spor=C.sporcular||{},pun=C.puanlar||{},cezalar=C.teamDeductions||{};
 const kaIsaret=C.kuluplerarasi===!0;

 // yarismanin kayitli kurallari -> local state
 R.useEffect(()=>{if(!comp)return;const n=normCfg(C.kulupPuani);setKurallar(n);setKayitli(JSON.stringify(n))},[comp,JSON.stringify(C.kulupPuani||null)]);

 const tumCats=Object.keys(cats).sort((a,b)=>{const fa=isFinal(a)?1:0,fb=isFinal(b)?1:0;return fa-fb||a.localeCompare(b,"tr")});
 const catAd=c=>cats[c]?.name||cfg(c).label||c;

 // ---- hesaplama (paylasimli modul) ----
 const tablo=R.useMemo(()=>hesaplaTablo(C,kurallar),[C,kurallar]);

 // ---- kural duzenleme ----
 const setBl=(id,patch)=>setKurallar(o=>({...o,bloklar:o.bloklar.map(b=>b.id===id?{...b,...patch}:b)}));
 const ekle=()=>setKurallar(o=>({...o,bloklar:[...o.bloklar,BOS()]}));
 const sil=id=>setKurallar(o=>({...o,bloklar:o.bloklar.filter(b=>b.id!==id)}));
 const tasi=(id,d)=>setKurallar(o=>{const a=[...o.bloklar],i=a.findIndex(b=>b.id===id),j=i+d;if(i<0||j<0||j>=a.length)return o;[a[i],a[j]]=[a[j],a[i]];return{...o,bloklar:a}});
 const catTik=(id,c)=>setBl(id,{kategoriler:(()=>{const b=kurallar.bloklar.find(x=>x.id===id);if(!b)return[c];return b.kategoriler.includes(c)?b.kategoriler.filter(x=>x!==c):[...b.kategoriler,c]})()});

 const hazirKur=()=>{
  const bl=hazirBloklar(cats);
  if(!bl.length){toast(__T("Bu yarışmada kategori bulunamadı."),"warning");return}
  setKurallar(o=>({...o,aktif:!0,bloklar:bl}));
  toast(__T("Hazır kurulum yüklendi — kaydetmeyi unutmayın."),"info")};

 const kaydet=async()=>{
  if(!comp||busy)return;setBusy(!0);
  const pay={aktif:kurallar.aktif===!0,cezaDus:kurallar.cezaDus===!0,bloklar:kurallar.bloklar.map((b,i)=>({id:b.id,ad:b.ad||("Blok "+(i+1)),kategoriler:b.kategoriler,yontem:b.yontem,adet:needsN(b.yontem)?Math.max(1,parseInt(b.adet)||1):1,katsayi:Number(b.katsayi)||1,zorunlu:b.zorunlu===!0}))};
  try{await update(ref(db,`${BASE}/${comp}`),{kulupPuani:pay});setKayitli(JSON.stringify(normCfg(pay)));toast(__T("Kulüp puanı ayarları kaydedildi ✓"),"success")}
  catch{toast(__T("Kaydedilemedi."),"error")}
  setBusy(!1)};

 const kaDegis=async v=>{
  if(!comp||busy)return;setBusy(!0);
  try{await update(ref(db,`${BASE}/${comp}`),{kuluplerarasi:v===!0});toast(v?__T("Yarışma kulüplerarası olarak işaretlendi."):__T("Kulüplerarası işareti kaldırıldı."),"success")}
  catch{toast(__T("Güncellenemedi."),"error")}
  setBusy(!1)};

 const excel=()=>{
  if(!tablo.satirlar.length)return;
  const bl=tablo.bloklar;
  const rows=tablo.satirlar.map(r=>{const o={[__T("S.N.")]:r.sira??"—",[__T("Kulüp")]:r.ad,[__T("İl")]:r.il||""};
   bl.forEach(b=>o[b.ad||b.id]=Number(r.det[b.id]?.deger||0).toFixed(3));
   o[__T("Toplam")]=r.toplam.toFixed(3);if(kurallar.cezaDus)o[__T("Ceza")]=r.ceza.toFixed(3);
   o[__T("Net")]=r.net.toFixed(3);return o});
  const wb=XU.book_new();XU.book_append_sheet(wb,XU.json_to_sheet(rows),"Kulup Puani");
  XW(wb,`${(C.isim||comp)}_kulup_puani.xlsx`.replace(/[^a-z0-9._-]/gi,"_"))};

 const dirty=JSON.stringify(normCfg(kurallar))!==kayitli;
 const grupluCats=R.useMemo(()=>{const g={};tumCats.forEach(c=>{const k=(isFinal(c)?"🏆 "+__T("Final")+" — ":"")+(cfg(c).group||__T("Diğer"));(g[k]||(g[k]=[])).push(c)});return g},[comp,JSON.stringify(Object.keys(cats))]);

 const S={wrap:{minHeight:"100vh",background:"radial-gradient(1200px 600px at 50% -10%,#111a30 0%,#0a0e1a 60%)",color:"#e8edf7",fontFamily:"'Plus Jakarta Sans',system-ui,sans-serif",paddingBottom:"3rem"},
  top:{position:"sticky",top:0,zIndex:10,background:"rgba(10,14,26,.9)",backdropFilter:"blur(12px)",borderBottom:"1px solid #2a3550",padding:".8rem 1.1rem",display:"flex",alignItems:"center",gap:".8rem"},
  ico:{width:38,height:38,borderRadius:11,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,background:"linear-gradient(135deg,#0ea5e9,#6366f1)",boxShadow:"0 6px 18px rgba(14,165,233,.35)"},
  in:{maxWidth:1080,margin:"0 auto",padding:"1rem"},
  sel:{width:"100%",padding:".65rem .8rem",borderRadius:10,border:"1px solid #2a3550",background:"#131a2b",color:"#e8edf7",fontWeight:700,fontSize:".95rem"},
  card:{background:"#131a2b",border:"1px solid #2a3550",borderRadius:14,padding:".9rem 1rem",marginBottom:".7rem"},
  btn:{padding:".6rem .9rem",borderRadius:10,border:"none",color:"#fff",fontWeight:800,cursor:"pointer",fontSize:".88rem"},
  gh:{fontSize:".7rem",color:"#8b97b3",fontWeight:800,textTransform:"uppercase",letterSpacing:".04em",margin:".55rem 0 .3rem"},
  chip:on=>({padding:".3rem .55rem",borderRadius:8,fontSize:".76rem",fontWeight:700,cursor:"pointer",border:"1px solid "+(on?"#0ea5e9":"#2a3550"),background:on?"rgba(14,165,233,.18)":"#0f1626",color:on?"#7dd3fc":"#a9b4cc",whiteSpace:"nowrap"}),
  mini:{padding:".4rem .55rem",borderRadius:8,border:"1px solid #2a3550",background:"#0f1626",color:"#e8edf7",fontWeight:700,fontSize:".82rem"},
  th:{padding:".5rem .6rem",fontSize:".72rem",color:"#8b97b3",fontWeight:800,textTransform:"uppercase",letterSpacing:".03em",textAlign:"left",borderBottom:"1px solid #2a3550",whiteSpace:"nowrap"},
  td:{padding:".5rem .6rem",borderBottom:"1px solid rgba(40,52,79,.5)",fontWeight:700,fontSize:".86rem"}};

 return e.jsxs("div",{style:S.wrap,children:[
  e.jsxs("div",{style:S.top,children:[
   e.jsx("div",{style:S.ico,children:e.jsx("span",{className:"material-icons",style:{color:"#fff"},children:"groups"})}),
   e.jsxs("div",{style:{minWidth:0},children:[
    e.jsx("div",{style:{fontWeight:900,fontSize:"1.02rem"},children:__T("Kulüp Puanı Ayarları")}),
    e.jsx("div",{style:{fontSize:".76rem",color:"#8b97b3",fontWeight:600},children:__T("Kulüplerarası yarışmalarda takım puanı kuralları")})]}),
   e.jsx("div",{style:{flex:1}}),
   e.jsx("a",{href:"/aerobik",style:{...S.btn,background:"#1b2438",border:"1px solid #2a3550",textDecoration:"none",color:"#a9b4cc"},children:__T("← Geri")})]}),

  e.jsxs("div",{style:S.in,children:[
   loading?e.jsx("div",{style:{color:"#8b97b3",fontWeight:700},children:__T("Yükleniyor…")}):e.jsxs(e.Fragment,{children:[
    e.jsxs("select",{style:{...S.sel,marginBottom:"1rem"},value:comp,onChange:t=>setComp(t.target.value),children:[
     e.jsx("option",{value:"",children:__T("Yarışma seçin…")}),
     Object.entries(comps).sort((a,b)=>String(b[1].baslangicTarihi||"").localeCompare(String(a[1].baslangicTarihi||""))).map(([k,c])=>e.jsx("option",{value:k,children:(c.isim||k)+(c.kuluplerarasi===!0?" · ⭐":"")},k))]}),

    comp?e.jsxs(e.Fragment,{children:[
     e.jsxs("div",{style:{...S.card,display:"flex",alignItems:"center",gap:".8rem",flexWrap:"wrap",borderColor:kaIsaret?"#0ea5e9":"#2a3550"},children:[
      e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:".5rem",cursor:"pointer",fontWeight:800},children:[
       e.jsx("input",{type:"checkbox",checked:kaIsaret,onChange:t=>kaDegis(t.target.checked),disabled:busy}),
       __T("Bu yarışma kulüplerarası")]}),
      e.jsx("span",{style:{fontSize:".78rem",color:"#8b97b3",fontWeight:600,flex:1,minWidth:200},children:__T("İşaretli değilse mevcut takım hesabı aynen korunur; bu sayfadaki kurallar sonuç ekranlarında kullanılmaz.")})]}),

     e.jsxs("div",{style:{...S.card},children:[
      e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:".6rem",flexWrap:"wrap",marginBottom:".6rem"},children:[
       e.jsx("div",{style:{fontWeight:900,fontSize:".95rem",flex:1,minWidth:160},children:__T("Puan blokları")}),
       e.jsx("button",{style:{...S.btn,background:"#1b2438",border:"1px solid #2a3550",color:"#a9b4cc"},onClick:hazirKur,children:__T("Hazır kurulum (Tekler/Çiftler/Trio…)")}),
       e.jsx("button",{style:{...S.btn,background:"linear-gradient(135deg,#0ea5e9,#6366f1)"},onClick:ekle,children:__T("+ Blok ekle")})]}),
      e.jsx("div",{style:{fontSize:".78rem",color:"#8b97b3",fontWeight:600,marginBottom:".8rem"},children:__T("Her blokta kategorileri seçin ve o bloktan kulüp puanına nasıl katkı verileceğini belirleyin. Blok puanları toplanarak kulüp puanı bulunur.")}),

      kurallar.bloklar.length?kurallar.bloklar.map((b,bi)=>e.jsxs("div",{style:{border:"1px solid #2a3550",borderRadius:12,padding:".7rem .8rem",marginBottom:".6rem",background:"#0f1626"},children:[
       e.jsxs("div",{style:{display:"flex",gap:".5rem",flexWrap:"wrap",alignItems:"center"},children:[
        e.jsx("input",{style:{...S.mini,flex:1,minWidth:140},placeholder:__T("Blok adı (ör. Tekler)"),value:b.ad,onChange:t=>setBl(b.id,{ad:t.target.value})}),
        e.jsx("select",{style:{...S.mini,minWidth:200},value:b.yontem,onChange:t=>setBl(b.id,{yontem:t.target.value}),children:YON.map(([v,l])=>e.jsx("option",{value:v,children:__T(l)},v))}),
        needsN(b.yontem)?e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:".35rem",fontSize:".8rem",color:"#8b97b3",fontWeight:700},children:["N",e.jsx("input",{type:"number",min:1,max:50,style:{...S.mini,width:62},value:b.adet,onChange:t=>setBl(b.id,{adet:t.target.value})})]}):null,
        e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:".35rem",fontSize:".8rem",color:"#8b97b3",fontWeight:700},children:[__T("Katsayı"),e.jsx("input",{type:"number",min:0,step:"0.1",style:{...S.mini,width:72},value:b.katsayi,onChange:t=>setBl(b.id,{katsayi:t.target.value})})]}),
        e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:".35rem",fontSize:".8rem",color:"#8b97b3",fontWeight:700,cursor:"pointer"},children:[e.jsx("input",{type:"checkbox",checked:b.zorunlu,onChange:t=>setBl(b.id,{zorunlu:t.target.checked})}),__T("Zorunlu")]}),
        e.jsx("button",{style:{...S.mini,cursor:"pointer",opacity:bi===0?.4:1},disabled:bi===0,onClick:()=>tasi(b.id,-1),children:"▲"}),
        e.jsx("button",{style:{...S.mini,cursor:"pointer",opacity:bi===kurallar.bloklar.length-1?.4:1},disabled:bi===kurallar.bloklar.length-1,onClick:()=>tasi(b.id,1),children:"▼"}),
        e.jsx("button",{style:{...S.mini,cursor:"pointer",borderColor:"#ef4444",color:"#fca5a5"},onClick:()=>sil(b.id),children:__T("Sil")})]}),
       e.jsx("div",{style:{marginTop:".5rem"},children:Object.entries(grupluCats).map(([g,cs])=>e.jsxs("div",{children:[
        e.jsx("div",{style:S.gh,children:g}),
        e.jsx("div",{style:{display:"flex",gap:".35rem",flexWrap:"wrap"},children:cs.map(c=>e.jsx("span",{style:S.chip(b.kategoriler.includes(c)),onClick:()=>catTik(b.id,c),children:catAd(c)},c))})]},g))}),
       e.jsxs("div",{style:{marginTop:".5rem",fontSize:".76rem",color:"#8b97b3",fontWeight:700},children:[b.kategoriler.length," ",__T("kategori seçildi")," · ",__T(yonAd(b.yontem)).replace("N",String(Math.max(1,parseInt(b.adet)||1))),Number(b.katsayi)!==1?" · ×"+b.katsayi:""]})
      ]},b.id)):e.jsx("div",{style:{color:"#8b97b3",fontWeight:700,fontSize:".85rem"},children:__T("Henüz blok yok. “Hazır kurulum” ile başlayabilirsiniz.")}),

      e.jsxs("div",{style:{display:"flex",gap:".8rem",flexWrap:"wrap",alignItems:"center",marginTop:".8rem",paddingTop:".7rem",borderTop:"1px solid #2a3550"},children:[
       e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:".45rem",fontWeight:700,fontSize:".85rem",cursor:"pointer"},children:[
        e.jsx("input",{type:"checkbox",checked:kurallar.cezaDus,onChange:t=>setKurallar(o=>({...o,cezaDus:t.target.checked}))}),__T("Takım cezalarını düş")]}),
       e.jsx("div",{style:{flex:1}}),
       dirty?e.jsx("span",{style:{color:"#fbbf24",fontWeight:800,fontSize:".8rem"},children:__T("• kaydedilmedi")}):null,
       e.jsx("button",{style:{...S.btn,background:dirty?"linear-gradient(135deg,#22c55e,#0ea5e9)":"#1b2438",border:dirty?"none":"1px solid #2a3550",color:dirty?"#fff":"#8b97b3"},disabled:busy||!dirty,onClick:kaydet,children:busy?__T("Kaydediliyor…"):__T("Ayarları Kaydet")})]})]}),

     e.jsxs("div",{style:S.card,children:[
      e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:".6rem",flexWrap:"wrap",marginBottom:".7rem"},children:[
       e.jsx("div",{style:{fontWeight:900,fontSize:".95rem",flex:1,minWidth:160},children:__T("Önizleme — Kulüp Sıralaması")}),
       tablo.satirlar.length?e.jsx("button",{style:{...S.btn,background:"#1b2438",border:"1px solid #2a3550",color:"#a9b4cc"},onClick:excel,children:__T("Excel")}):null]}),
      tablo.bloklar.length?e.jsx("div",{style:{overflowX:"auto"},children:e.jsxs("table",{style:{width:"100%",borderCollapse:"collapse",minWidth:560},children:[
       e.jsx("thead",{children:e.jsxs("tr",{children:[
        e.jsx("th",{style:S.th,children:__T("S.N.")}),
        e.jsx("th",{style:S.th,children:__T("Kulüp")}),
        ...tablo.bloklar.map(b=>e.jsx("th",{style:{...S.th,textAlign:"right"},children:b.ad||b.id},b.id)),
        kurallar.cezaDus?e.jsx("th",{style:{...S.th,textAlign:"right"},children:__T("Ceza")}):null,
        e.jsx("th",{style:{...S.th,textAlign:"right"},children:__T("Toplam")})]})}),
       e.jsx("tbody",{children:tablo.satirlar.length?tablo.satirlar.map(r=>e.jsxs("tr",{style:{opacity:r.eksik?.5:1},children:[
        e.jsx("td",{style:{...S.td,fontWeight:900,color:r.sira<=3?"#fbbf24":"#8b97b3"},children:r.sira??"—"}),
        e.jsxs("td",{style:S.td,children:[r.ad,r.il?e.jsxs("span",{style:{color:"#8b97b3",fontWeight:600,fontSize:".78rem"},children:[" · ",r.il]}):null,r.eksik?e.jsx("span",{style:{color:"#fca5a5",fontWeight:800,fontSize:".72rem"},children:" · "+__T("zorunlu blok eksik")}):null]}),
        ...tablo.bloklar.map(b=>{const d=r.det[b.id];return e.jsxs("td",{style:{...S.td,textAlign:"right",color:d&&d.kac?"#e8edf7":"#55617d"},title:(d?.sayilan||[]).map(g=>`${g.ad} (${catAd(g.cat)}) ${f3(g.score)}`).join("\n"),children:[f3(d?.deger??0),d&&d.kac?e.jsxs("span",{style:{color:"#8b97b3",fontWeight:600,fontSize:".72rem"},children:[" (",d.kac,")"]}):null]},b.id)}),
        kurallar.cezaDus?e.jsx("td",{style:{...S.td,textAlign:"right",color:r.ceza>0?"#fca5a5":"#55617d"},children:r.ceza>0?"-"+f3(r.ceza):"—"}):null,
        e.jsx("td",{style:{...S.td,textAlign:"right",fontWeight:900,color:"#7dd3fc"},children:f3(r.net)})]},r.key)):e.jsx("tr",{children:e.jsx("td",{colSpan:9,style:{...S.td,color:"#8b97b3",textAlign:"center"},children:__T("Seçilen kategorilerde puanlanmış sporcu bulunamadı.")})})})]})}):e.jsx("div",{style:{color:"#8b97b3",fontWeight:700,fontSize:".85rem"},children:__T("Önizleme için en az bir blokta kategori seçin.")})]})
    ]}):null
   ]})]})]});
}
export{KulupPuani as default};
