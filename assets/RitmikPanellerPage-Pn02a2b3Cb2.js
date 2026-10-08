import"./i18n-Tr01a2b3Cb2.js";import{b as usToast,a as usDisc,j as e,d as db,u as usAuth,l as logAction}from"./main-C2LpyYUGCb2.js";import{r as R}from"./vendor-react-Cxw6bqwhCb2.js";import{k as ref,o as onValue,m as update,l as get}from"./vendor-firebase-940mxgRVCb2.js";import{R as RC}from"./ritmikCriteriaDefaults-CgOlnfQcCb2.js";import{YAPI_VARS,yapiNorm,dSlotlari}from"./RitmikHakemV2-Hv01a2b3Cb2.js";import{raAd,raImg}from"./ritmikAlet-Ra01a2b3Cb2.js";import{SeyirciKart}from"./seyirciKart-Gs01a2b3Cb2.js";import{SIFRE as __SIFRE}from"./hakemKilit-Hk01a2b3Cb2.js";import"./modulepreload-polyfill-B5Qt9EMXCb2.js";

// RİTMİK PANELLER (aerobik Paneller sayfasıyla aynı yapı; ritmik DA/DB/A/E/T/L/SJ panelleri)
//  <yarışma>/panelGruplari/<gid> : {ad, tipler{A,E,D,T,L,SJ}, adet{A,E}, kategoriler{kat:true}, paneller{SLOT:{ozel}}}
//  <yarışma>/hakemLinkleri/<gid>_<slot> : her bireysel panelin kaydı {ad, kategoriler, panelGrubu, slot}
//     Panel sayfaları (?linkId=) kategorilerini CANLI olarak bu kayıttan okur; ekrandaki her
//     kategori ekle/çıkar anında yazılır ve açık paneller hemen güncellenir.
//  Alet yetkisi (2026-10-07): aletler{kat:{alet:true}} — grupta ve (özel listeli) panel kaydında; kategori anahtarı yoksa tüm aletler.
//     Panel ekranları (judgeLinkGroup) yalnız izinli (kategori, alet) çağrılarını açar.
//  SJ ekranı: paneller/<SLOT>/bolme = 0 (tek ekran) | 2-4 (bölünmüş) — link buna göre üretilir.
const BASE="ritmik_yarismalar";
const V=new Proxy({},{get:(_,k)=>RC[k]||RC[String(k).replace(/^final_/,"").split("__")[0]]});
const TIP={
 DA:{ad:"Zorluk · Alet (DA)",renk:"#6366f1",tek:[["DA1","dpanel","&panelType=da1"],["DA2","dpanel","&panelType=da2"]]},
 DB:{ad:"Zorluk · Beden (DB)",renk:"#7c3aed",tek:[["DB1","dpanel","&panelType=db1"],["DB2","dpanel","&panelType=db2"]]},
 A:{ad:"Artistik (A)",renk:"#db2777",coklu:{yol:"epanel",on:"A",ek:i=>`&panelId=a${i}&panelType=a`,max:4}},
 E:{ad:"Uygulama (E)",renk:"#0891b2",coklu:{yol:"epanel",on:"E",ek:i=>`&panelId=e${i}&panelType=e`,max:4}},
 T:{ad:"Süre (T)",renk:"#06b6d4",tek:[["T","tpanel",""]]},
 L:{ad:"Çizgi (L)",renk:"#10b981",tek:[["L1","lpanel","&panelType=cizgi1"],["L2","lpanel","&panelType=cizgi2"]]},
 SJ:{ad:"Üst Hakemler (SJ)",renk:"#f59e0b",tek:[["SJDA","dpanel","&panelType=sjda"],["SJDB","dpanel","&panelType=sjdb"],["SJA","dpanel","&panelType=sja"],["SJE","dpanel","&panelType=sje"]]}};
const TIP_SIRA=["DA","DB","A","E","T","L","SJ"];
const slotlar=g=>{const out=[];TIP_SIRA.forEach(t=>{if(!g?.tipler?.[t])return;const d=TIP[t];
 if(d.coklu){const n=Math.max(1,Math.min(d.coklu.max,parseInt(g.adet?.[t])||d.coklu.max));for(let i=1;i<=n;i++)out.push({slot:d.coklu.on+i,tip:t,yol:d.coklu.yol,ek:d.coklu.ek(i)})}
 else if((t==="DA"||t==="DB")&&g.yapi)dSlotlari(g.yapi,t).forEach(s=>out.push({slot:s,tip:t,yol:"dpanel",ek:"&panelType="+s.toLowerCase()}));
 else d.tek.forEach(([s,y,ek])=>out.push({slot:s,tip:t,yol:y,ek}))});return out};
const pidOf=(gid,slot)=>gid+"_"+String(slot).toLowerCase();
const yeniGid=()=>"pg"+Date.now().toString(36)+Math.random().toString(36).slice(2,5);
const kListe=o=>Object.keys(o||{}).filter(k=>o[k]);
let _qrMod=null;const qrAl=async t=>{try{_qrMod=_qrMod||(await import("https://cdn.jsdelivr.net/npm/qrcode@1.5.4/+esm")).default;return await _qrMod.toDataURL(t,{margin:1,width:360})}catch{return null}};

// ---- Hakem ekranı yapısı (v2) düzenleyici ----
const YX_CSS=`.pyx{margin-top:.8rem;border:1.5px solid #C4B5FD;border-radius:16px;background:linear-gradient(135deg,#FAF5FF,#fff 55%);padding:1rem}
.pyx h4{margin:0 0 .2rem;font-size:.98rem;font-weight:900;display:flex;align-items:center;gap:.45rem}.pyx>p{margin:0 0 .8rem;font-size:.8rem;color:#6B7280;font-weight:600}
.pyx-blk{background:#fff;border:1px solid #E5E7EB;border-radius:14px;padding:.8rem .9rem;margin-bottom:.7rem}
.pyx-blk b.t{display:flex;align-items:center;gap:.45rem;font-size:.9rem;font-weight:900;margin-bottom:.55rem}.pyx-tag{color:#fff;font-size:.7rem;font-weight:900;padding:.15rem .45rem;border-radius:7px}
.pyx-rules{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:.45rem}@media(max-width:760px){.pyx-rules{grid-template-columns:repeat(2,minmax(0,1fr))}}
.pyx-rule{border:1.5px solid #E5E7EB;border-radius:12px;padding:.55rem .6rem;cursor:pointer;background:#F8FAFC}.pyx-rule.on{border-color:var(--rc);background:color-mix(in srgb,var(--rc) 8%,#fff);box-shadow:0 0 0 3px color-mix(in srgb,var(--rc) 14%,transparent)}
.pyx-rule b{display:flex;align-items:center;gap:.3rem;font-size:.82rem;font-weight:900}.pyx-rule b .material-icons-round{font-size:1rem;color:var(--rc)}.pyx-rule small{display:block;margin-top:.25rem;font-size:.72rem;color:#6B7280;font-weight:600;line-height:1.35}
.pyx-jr{display:grid;grid-template-columns:96px 1fr;gap:.6rem;align-items:center;padding:.45rem 0;border-top:1px solid #EEF2F7}
.pyx-jn{display:flex;align-items:center;gap:.35rem;font-weight:900}.pyx-jn span{min-width:44px;text-align:center;padding:.25rem .4rem;border-radius:8px;color:#fff;font-size:.8rem}
.pyx-star{border:0;background:none;cursor:pointer;padding:0;color:#D97706;display:grid}.pyx-star.off{color:#CBD5E1}
.pyx-seg{display:inline-flex;flex-wrap:wrap;gap:.3rem}.pyx-seg button{border:1px solid #E5E7EB;background:#F8FAFC;color:#64748B;border-radius:9px;padding:.32rem .6rem;font:inherit;font-size:.76rem;font-weight:800;cursor:pointer;display:inline-flex;align-items:center;gap:.25rem}
.pyx-seg button .material-icons-round{font-size:.95rem}.pyx-seg button.on{border-color:var(--rc);color:var(--rc);background:color-mix(in srgb,var(--rc) 10%,#fff)}
.pyx-tg{display:flex;align-items:center;gap:.7rem;padding:.5rem 0;border-top:1px solid #EEF2F7;cursor:pointer}.pyx-tg:first-of-type{border-top:0}.pyx-tg div{flex:1}.pyx-tg b{display:block;font-size:.84rem}.pyx-tg small{display:block;font-size:.74rem;color:#6B7280;font-weight:600}
.pyx-sw{width:42px;height:24px;border-radius:999px;background:#E2E8F0;position:relative;flex-shrink:0}.pyx-sw::after{content:"";position:absolute;top:3px;left:3px;width:18px;height:18px;border-radius:50%;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,.3);transition:left .2s}.pyx-tg.on .pyx-sw{background:linear-gradient(135deg,#EC4899,#8B5CF6)}.pyx-tg.on .pyx-sw::after{left:21px}
.pyx-sl{display:flex;align-items:center;gap:.6rem;margin-top:.5rem;font-size:.8rem;font-weight:800}.pyx-sl input{flex:1;accent-color:#8B5CF6}
.pyx-foot{display:flex;gap:.5rem;justify-content:flex-end;flex-wrap:wrap}`;
const YX_YAPI={tek:["looks_one","Tek not","Tek hakem tek not girer; doğrudan kesin not. Aşama 2 yok."],sorumlu:["star","İki aşamalı","Hakemler kendi notunu girer; ⭐ sorumlu hakem kesin notu girer."],ortalama:["functions","Otomatik ortalama","Kesin not = hakem notlarının ortalaması."],bashakem:["gavel","Başhakem belirler","Hakem notları başhakeme gider; kesin notu başhakem yazar."]};
const YX_MOD=[["toplam","dialpad","Toplam"],["element","format_list_numbered","Element sayma"],["ikisi","playlist_add_check","Element + toplam"]],YX_DUZ=[["acik","lock_open","Açık"],["sureli","timer","Süreli"],["kapali","lock","Kapalı"]],YX_RENK={DA:"#7C3AED",DB:"#4F46E5",A:"#EC4899",E:"#10B981"};
function YapiEditor({y0,onSave,onCancel,busy,tipler}){const[y,setY]=R.useState(()=>yapiNorm(y0||YAPI_VARS));const up=f=>setY(o=>{const n=JSON.parse(JSON.stringify(o));f(n);return yapiNorm(n)});const I=n=>e.jsx("span",{className:"material-icons-round",children:n});
 const dBlk=P=>{const C=y[P],sl=dSlotlari(y,P);return e.jsxs("div",{className:"pyx-blk",style:{"--rc":YX_RENK[P]},children:[e.jsxs("b",{className:"t",children:[e.jsx("span",{className:"pyx-tag",style:{background:YX_RENK[P]},children:P}),P==="DA"?__T("Alet Zorluğu"):__T("Vücut Zorluğu"),e.jsx("span",{style:{flex:1}}),C.yapi!=="tek"?e.jsxs("span",{className:"pyx-seg",children:[e.jsx("span",{style:{fontSize:".74rem",color:"#6B7280",alignSelf:"center",marginRight:".2rem"},children:__T("Hakem sayısı")}),[2,3,4].map(n=>e.jsx("button",{type:"button",className:C.n===n?"on":"",onClick:()=>up(o=>{o[P].n=n}),children:n},n))]}):null]}),
  e.jsx("div",{className:"pyx-rules",children:Object.entries(YX_YAPI).map(([k,[ic,t,d]])=>e.jsxs("div",{className:"pyx-rule"+(C.yapi===k?" on":""),onClick:()=>up(o=>{o[P].yapi=k}),children:[e.jsxs("b",{children:[I(ic),__T(t)]}),e.jsx("small",{children:__T(d)})]},k))}),
  e.jsx("div",{style:{marginTop:".55rem"},children:sl.map(s=>e.jsxs("div",{className:"pyx-jr",children:[e.jsxs("div",{className:"pyx-jn",children:[e.jsx("span",{style:{background:YX_RENK[P]},children:s}),C.yapi==="sorumlu"?e.jsx("button",{type:"button",className:"pyx-star"+(C.sorumlu===s?"":" off"),title:__T("Sorumlu hakem (kesin notu girer)"),onClick:()=>up(o=>{o[P].sorumlu=s}),children:I(C.sorumlu===s?"star":"star_border")}):null]}),
   e.jsx("div",{className:"pyx-seg",children:YX_MOD.map(([k,ic,t])=>e.jsxs("button",{type:"button",className:(C.mod[s]||"toplam")===k?"on":"",onClick:()=>up(o=>{o[P].mod[s]=k}),children:[I(ic),__T(t)]},k))})]},s))})]})};
 return e.jsxs("div",{className:"pyx",children:[e.jsx("style",{children:YX_CSS}),e.jsxs("h4",{children:[I("tune"),__T("Hakem ekranı yapısı")]}),e.jsx("p",{children:__T("Bu grubun linkleriyle açılan DA/DB ve A/E hakem ekranları bu ayarlarla çalışır. Kaydedince DA/DB linkleri yapıya göre yeniden oluşturulur (ör. Tek not → tek DA linki).")}),
  tipler?.DA?dBlk("DA"):null,tipler?.DB?dBlk("DB"):null,
  e.jsxs("div",{className:"pyx-blk",style:{"--rc":"#8B5CF6"},children:[e.jsxs("b",{className:"t",children:[I("compare_arrows"),__T("Hakemler arası fark")]}),e.jsx("small",{style:{fontSize:".76rem",color:"#6B7280",fontWeight:600},children:__T("Çok hakemli yapılarda (iki aşamalı / ortalama / başhakem) uygulanır.")}),
   e.jsxs("div",{className:"pyx-sl",children:[__T("Fark eşiği"),e.jsx("input",{type:"range",min:"0.1",max:"1",step:"0.05",value:y.esik,onChange:ev=>up(o=>{o.esik=+ev.target.value})}),e.jsx("span",{style:{fontFamily:"monospace",minWidth:42,textAlign:"right"},children:y.esik.toFixed(2)})]}),
   e.jsx("div",{className:"pyx-seg",style:{marginTop:".5rem"},children:[["uyar","warning","Eşik aşılınca uyar"],["onay","how_to_reg","Başhakem onayı iste"]].map(([k,ic,t])=>e.jsxs("button",{type:"button",className:y.esikDavranis===k?"on":"",onClick:()=>up(o=>{o.esikDavranis=k}),children:[I(ic),__T(t)]},k))}),e.jsx("small",{style:{display:"block",marginTop:".45rem",fontSize:".74rem",color:"#6B7280",fontWeight:600},children:y.esikDavranis==="onay"?__T("Fark eşiği aşılınca kesin not (iki aşamalı / ortalama) başhakeme onaya gider; başhakem onaylayana, değiştirip onaylayana ya da geri gönderene kadar hakem bekler."):__T("Fark eşiği aşılınca hakem ekranında uyarı gösterilir; kesin not doğrudan kaydedilir.")})]}),
  e.jsxs("div",{className:"pyx-blk",style:{"--rc":"#8B5CF6"},children:[e.jsxs("b",{className:"t",children:[I("edit_note"),__T("Not düzeltme")]}),e.jsx("small",{style:{fontSize:".76rem",color:"#6B7280",fontWeight:600},children:__T("Hakem notunu gönderdikten sonra düzeltebilsin mi? Başhakem puanlama ekranından hakem bazında ayrıca açıp kapatabilir.")}),
   ["DA","DB","A","E"].filter(k=>tipler?.[k]).map(k=>e.jsxs("div",{className:"pyx-jr",style:{gridTemplateColumns:"60px 1fr","--rc":YX_RENK[k]},children:[e.jsx("div",{className:"pyx-jn",children:e.jsx("span",{style:{background:YX_RENK[k]},children:k})}),e.jsx("div",{className:"pyx-seg",children:YX_DUZ.map(([v,ic,t])=>e.jsxs("button",{type:"button",className:y.duz[k]===v?"on":"",onClick:()=>up(o=>{o.duz[k]=v}),children:[I(ic),__T(t)]},v))})]},k)),
   Object.entries(y.duz).some(([k,v])=>k!=="sure"&&v==="sureli")?e.jsxs("div",{className:"pyx-sl",children:[__T("Süre"),e.jsx("input",{type:"range",min:"10",max:"120",step:"5",value:y.duz.sure,onChange:ev=>up(o=>{o.duz.sure=+ev.target.value})}),e.jsx("span",{style:{fontFamily:"monospace",minWidth:42,textAlign:"right"},children:y.duz.sure+" sn"})]}):null]}),
  e.jsxs("div",{className:"pyx-blk",style:{"--rc":"#8B5CF6"},children:[e.jsxs("b",{className:"t",children:[I("visibility"),__T("Görünürlük ve tema")]}),
   [["partner","Hakemler birbirinin notunu görsün","Aynı alt paneldeki diğer hakemlerin notları ekranda görünür (tek not yapısında geçersiz)."],["sjRef","SJ referans notu hakeme gösterilsin","Üst Jüri referans notu (SJDA/SJDB) hakem ekranında görünür."],["elemListe","Element listesi başhakeme gitsin","Element sayma modunda girilen liste başhakem ekranında görünür."]].map(([k,t,d])=>e.jsxs("div",{className:"pyx-tg"+(y.gor[k]?" on":""),onClick:()=>up(o=>{o.gor[k]=!o.gor[k]}),children:[e.jsxs("div",{children:[e.jsx("b",{children:__T(t)}),e.jsx("small",{children:__T(d)})]}),e.jsx("span",{className:"pyx-sw"})]},k)),
   e.jsxs("div",{className:"pyx-jr",style:{gridTemplateColumns:"96px 1fr","--rc":"#8B5CF6"},children:[e.jsx("b",{style:{fontSize:".84rem"},children:__T("Ekran teması")}),e.jsx("div",{className:"pyx-seg",children:[["koyu","dark_mode","Koyu (tablet)"],["acik","light_mode","Açık"]].map(([k,ic,t])=>e.jsxs("button",{type:"button",className:y.tema===k?"on":"",onClick:()=>up(o=>{o.tema=k}),children:[I(ic),__T(t)]},k))})]})]}),
  e.jsxs("div",{className:"pyx-foot",children:[e.jsx("button",{type:"button",style:{padding:".5rem .8rem",borderRadius:10,border:"1px solid #E5E7EB",background:"#fff",fontWeight:800,cursor:"pointer"},onClick:()=>setY(yapiNorm(YAPI_VARS)),children:__T("Varsayılanlar")}),e.jsx("button",{type:"button",style:{padding:".5rem .8rem",borderRadius:10,border:"1px solid #E5E7EB",background:"#fff",fontWeight:800,cursor:"pointer"},onClick:onCancel,children:__T("Vazgeç")}),
   e.jsx("button",{type:"button",disabled:busy,style:{padding:".55rem 1.1rem",borderRadius:10,border:0,color:"#fff",fontWeight:900,cursor:"pointer",background:"linear-gradient(135deg,#EC4899,#8B5CF6)"},onClick:()=>onSave(y),children:__T("Yapıyı kaydet")})]})]})}

// ---- Hakem atama (2026-10-08): havuz = kök referees (disiplin ritmik); atama panelGruplari/<gid>/hakemler/<SLOT>, yarışma düzeyi hakemAtama/<ROL> ----
function HakemSec({val,onSec,havuz,yukle,dis,ph}){const[q,setQ]=R.useState(""),[ac,setAc]=R.useState(!1);const I=(n,st)=>e.jsx("span",{className:"material-icons-round",style:{fontSize:"1rem",...st},children:n});
 if(val&&val.ad)return e.jsxs("span",{style:{display:"inline-flex",alignItems:"center",gap:".35rem",padding:".22rem .35rem .22rem .55rem",borderRadius:999,background:"#EEF2FF",border:"1px solid #C7D2FE",fontSize:".78rem",fontWeight:800,color:"#3730A3",maxWidth:"100%"},children:[I("person"),e.jsx("span",{style:{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:val.ad}),val.ulke||val.il?e.jsx("span",{style:{color:"#6366F1",fontWeight:700},children:"· "+(val.ulke||val.il)}):null,e.jsx("button",{type:"button",disabled:dis,title:__T("Atamayı kaldır"),onClick:()=>onSec(null),style:{border:0,background:"transparent",cursor:"pointer",color:"#6366F1",display:"grid",padding:0},children:I("close")})]});
 const n=t=>String(t||"").toLocaleLowerCase("tr-TR").normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/ı/g,"i"),qq=n(q.trim()),L=qq.length>=2&&havuz?havuz.filter(h=>n(h.adSoyad).includes(qq)||n(h.ulke)===qq||n(h.il).includes(qq)).slice(0,8):[];
 return e.jsxs("span",{style:{position:"relative",display:"inline-block"},children:[e.jsx("input",{value:q,disabled:dis,placeholder:ph||__T("Hakem ata…"),onFocus:()=>{setAc(!0);yukle()},onBlur:()=>setTimeout(()=>setAc(!1),180),onChange:ev=>{setQ(ev.target.value);setAc(!0)},style:{width:200,padding:".3rem .6rem",borderRadius:999,border:"1px dashed #A5B4FC",background:"#F8FAFF",fontWeight:700,fontSize:".78rem",fontFamily:"inherit"}}),
  ac&&qq.length>=2?e.jsxs("div",{style:{position:"absolute",zIndex:30,top:"110%",left:0,minWidth:300,background:"#fff",border:"1px solid #E2E8F0",borderRadius:12,boxShadow:"0 12px 32px rgba(15,23,42,.18)",padding:4},children:[havuz===null?e.jsx("div",{style:{padding:".5rem",fontSize:".78rem",color:"#64748B"},children:__T("Hakem listesi yükleniyor…")}):havuz&&!L.length?e.jsx("div",{style:{padding:".5rem",fontSize:".78rem",color:"#64748B"},children:__T("Havuzda eşleşen hakem yok.")}):null,
   ...L.map(h=>e.jsxs("button",{type:"button",onMouseDown:ev=>ev.preventDefault(),onClick:()=>{onSec({refId:h.id,ad:h.adSoyad,ulke:h.ulke||"",il:h.il||"",brove:h.brove||""});setQ("");setAc(!1)},style:{display:"flex",width:"100%",gap:".5rem",alignItems:"center",border:0,background:"transparent",padding:".4rem .5rem",borderRadius:8,cursor:"pointer",textAlign:"left",fontFamily:"inherit"},children:[e.jsx("b",{style:{fontSize:".82rem",flex:1},children:h.adSoyad}),e.jsx("span",{style:{fontSize:".72rem",color:"#64748B",fontWeight:700},children:[h.ulke,h.il,h.brove].filter(Boolean).join(" · ")})]},h.id)),
   e.jsxs("button",{type:"button",onMouseDown:ev=>ev.preventDefault(),onClick:()=>{onSec({yeni:!0,ad:q.trim()});setQ("");setAc(!1)},style:{display:"flex",width:"100%",gap:".4rem",alignItems:"center",border:0,borderTop:"1px solid #F1F5F9",background:"transparent",padding:".45rem .5rem",cursor:"pointer",fontFamily:"inherit",color:"#16A34A",fontWeight:800,fontSize:".78rem"},children:[I("person_add"),__T("Havuza yeni hakem ekle:")+" "+q.trim()]})]}):null]})}

function Paneller(){
 const{toast}=usToast();usDisc();const[bolSay,setBolSay]=R.useState(2);const{currentUser:_lu}=usAuth()||{},_un=_lu?.adSoyad||_lu?.kullaniciAdi||"";
 const[comps,setComps]=R.useState({}),[comp,setComp]=R.useState(""),[C,setC]=R.useState(null),[busy,setBusy]=R.useState(!1),[form,setForm]=R.useState(null),[acik,setAcik]=R.useState({}),[qr,setQr]=R.useState(null),[yac,setYac]=R.useState(null);

 R.useEffect(()=>{const u=onValue(ref(db,BASE),s=>{const v=s.val()||{},o={};Object.entries(v).forEach(([k,c])=>{c&&c.isim&&c.arsivli!==!0&&c.arsivli!=="true"&&(o[k]={isim:c.isim,t:c.baslangicTarihi||""})});setComps(o)});return()=>u()},[]);
 // seçili yarışmanın yalnızca gereken düğümleri dinlenir
 const[pinGor,setPinGor]=R.useState({});const[acikHA,setAcikHA]=R.useState({});R.useEffect(()=>{if(!comp){setC(null);return}const st={};const set=(k,v)=>{st[k]=v;setC({...st})};
  const ul=[["isim","isim"],["kategoriler","kategoriler"],["panelGruplari","panelGruplari"],["hakemLinkleri","hakemLinkleri"],["epanelToken","epanelToken"],["aktifSporcu","aktifSporcu"],["itirazYetki","itirazYetki"],["hakemAtama","hakemAtama"],["hakemKilit","hakemKilit"],["hakemKilitPin","hakemKilitPin"],["cikisListesi","cikisListesi"]].map(([k,p])=>onValue(ref(db,`${BASE}/${comp}/${p}`),s=>set(k,s.val())));
  return()=>ul.forEach(u=>u())},[comp]);
 R.useEffect(()=>{if(comp&&C&&"isim"in C&&!C.isim){toast(__T("Seçili yarışma silinmiş; seçim kaldırıldı."),"warning");setComp("");setForm(null)}},[comp,C?.isim]);
 const cats=C?.kategoriler||{},gruplar=C?.panelGruplari||{},linkler=C?.hakemLinkleri||{},token=C?.epanelToken||"";
 const katAd=k=>String(cats[k]?.name||V[k]?.label||V[String(k).replace(/^final_/,"")]?.label||k).replace(/^🏆\s*/,"🏆 ");
 const katSira=Object.keys(cats).sort((a,b)=>(/^final_/.test(a)?1:0)-(/^final_/.test(b)?1:0)||String(V[a.replace(/^final_/,"")]?.group||"").localeCompare(String(V[b.replace(/^final_/,"")]?.group||""),"tr")||katAd(a).localeCompare(katAd(b),"tr"));
 const link=(gid,s)=>`${location.origin}/rhythmic/${s.yol}?competitionId=${encodeURIComponent(comp)}&linkId=${pidOf(gid,s.slot)}${s.ek}${token?`&token=${token}`:""}`;
 const aktifKat=ks=>{const a=C?.aktifSporcu||{};let en=null,t=-1;ks.forEach(k=>{const x=a[k];if(x&&(+x.ts||0)>t){t=+x.ts||0;en=k}});return en};

 // ---- yaz ----
 const yaz=async(upd,msg)=>{if(!C||!C.isim){toast(__T("Bu yarışma artık mevcut değil; değişiklik yazılmadı."),"error");return}setBusy(!0);try{await update(ref(db,`${BASE}/${comp}`),upd);try{logAction("panel_group_update",`[Ritmik] Paneller: ${msg||"panel kategorileri güncellendi"}`,{user:_un,competitionId:comp,discipline:"ritmik",data:{degisiklik:Object.fromEntries(Object.entries(upd).slice(0,40).map(([k,v])=>[k,v&&typeof v=="object"?{ad:v.ad||null,kategoriler:v.kategoriler?Object.keys(v.kategoriler):null}:v]))}})}catch{}msg&&toast(msg,"success")}catch(er){console.error(er);toast(__T("Kaydedilemedi."),"error")}setBusy(!1)};
 const panelKaydi=(g,gid,s,katObj,alObj)=>({ad:`${g.ad} · ${s.slot}`,kategoriler:Object.keys(katObj||{}).length?katObj:null,aletler:alObj&&Object.keys(alObj).length?alObj:null,tumKategoriler:!1,panelGrubu:gid,slot:s.slot,guncelleme:Date.now()});
 // kategorinin aletleri (final kategorileri tek aletlidir → alet seçimi yok)
 const katAletleri=k=>{const a=cats[k]?.aletler;return/^final_/.test(k)?[]:(Array.isArray(a)?a:a&&typeof a==="object"?Object.keys(a).filter(x=>a[x]):[]).map(z=>typeof z==="object"?z.id||z.value:z).filter(Boolean)};
 const alIzinli=(m,k,al)=>!m||!m[k]||!!m[k][al];
 const alTikla=(m,k,al)=>{const T=katAletleri(k),cur=new Set(m&&m[k]?Object.keys(m[k]).filter(a=>m[k][a]):T);cur.has(al)?cur.delete(al):cur.add(al);
  if(!cur.size){toast(__T("En az bir alet seçili kalmalı."),"warning");return void 0}return T.every(a=>cur.has(a))?null:Object.fromEntries(T.filter(a=>cur.has(a)).map(a=>[a,!0]))};
 const sjBolme=(g,s)=>s.tip==="SJ"?parseInt(g?.paneller?.[s.slot]?.bolme)||0:0;
 const linkS=(gid,s)=>{const g=gruplar[gid],n=sjBolme(g,s);if(!n)return link(gid,s);const pt=(/panelType=([a-z]+)/.exec(s.ek)||[])[1]||"";return`${location.origin}/rhythmic/split?competitionId=${encodeURIComponent(comp)}&hedef=dpanel&panelType=${pt}&linkId=${pidOf(gid,s.slot)}&bolme=${n}${token?`&token=${token}`:""}`};

 // grup oluştur / düzenle
 const formAc=gid=>{const g=gid?gruplar[gid]:null;setForm(g?{gid,ad:g.ad||"",tipler:{...(g.tipler||{})},adet:{A:g.adet?.A||4,E:g.adet?.E||4},kategoriler:{...(g.kategoriler||{})}}:{gid:null,ad:"",tipler:{DA:!0,DB:!0,A:!0,E:!0,T:!0,L:!0,SJ:!0},adet:{A:4,E:4},kategoriler:{}})};
 const formKaydet=async()=>{const f=form;if(!f)return;if(!C||!C.isim){toast(__T("Bu yarışma artık mevcut değil; değişiklik yazılmadı."),"error");return}const ad=f.ad.trim();
  if(!ad){toast(__T("Grup adını yazın."),"warning");return}
  if(!TIP_SIRA.some(t=>f.tipler[t])){toast(__T("En az bir panel tipi seçin."),"warning");return}
  const gid=f.gid||yeniGid(),eski=f.gid?gruplar[f.gid]:null,_eAl=eski?.aletler||{},_yAl=Object.fromEntries(Object.entries(_eAl).filter(([k])=>f.kategoriler[k])),yeniG={aletler:Object.keys(_yAl).length?_yAl:null,ad,tipler:Object.fromEntries(TIP_SIRA.filter(t=>f.tipler[t]).map(t=>[t,!0])),adet:{A:f.adet.A,E:f.adet.E},kategoriler:Object.keys(f.kategoriler).filter(k=>f.kategoriler[k]).length?Object.fromEntries(kListe(f.kategoriler).map(k=>[k,!0])):null};
  const yeniS=slotlar({...yeniG,yapi:eski?eski.yapi:YAPI_VARS}),eskiS=eski?slotlar(eski):[],upd={};
  const ozel={...(eski?.paneller||{})};
  // kaldırılan paneller
  const kaldir=eskiS.filter(s=>!yeniS.some(y=>y.slot===s.slot));
  if(kaldir.length&&!await window.__gxConfirm(kaldir.map(s=>s.slot).join(", ")+" — "+__T("bu panellerin linkleri silinecek; açık olan bu paneller çalışmaz hâle gelir. Devam edilsin mi?")))return;
  kaldir.forEach(s=>{upd[`hakemLinkleri/${pidOf(gid,s.slot)}`]=null;delete ozel[s.slot]});
  yeniS.forEach(s=>{const pid=pidOf(gid,s.slot),cur=linkler[pid];
   if(!cur)upd[`hakemLinkleri/${pid}`]=panelKaydi(yeniG,gid,s,yeniG.kategoriler,yeniG.aletler);
   else{upd[`hakemLinkleri/${pid}/ad`]=`${ad} · ${s.slot}`;if(!ozel[s.slot]?.ozel){upd[`hakemLinkleri/${pid}/kategoriler`]=yeniG.kategoriler;upd[`hakemLinkleri/${pid}/aletler`]=yeniG.aletler||null}}});
  upd[`panelGruplari/${gid}`]={...yeniG,yapi:eski?eski.yapi||null:YAPI_VARS,paneller:Object.keys(ozel).length?ozel:null,olusturma:eski?.olusturma||Date.now(),guncelleme:Date.now()};
  await yaz(upd,eski?__T("Panel grubu güncellendi ✓"):__T("Panel grubu oluşturuldu ✓"));setForm(null);setAcik(o=>({...o,[gid]:!0}))};
 // yapı kaydet: DA/DB slotları yapıya göre değişir → linkleri eşitle
 const linkEsitle=(gid,eskiG,yeniG,upd)=>{const yS=slotlar(yeniG),eS=slotlar(eskiG),oz={...(eskiG.paneller||{})};
  eS.filter(s=>!yS.some(x=>x.slot===s.slot)).forEach(s=>{upd[`hakemLinkleri/${pidOf(gid,s.slot)}`]=null;delete oz[s.slot]});
  yS.forEach(s=>{const pid=pidOf(gid,s.slot);if(!linkler[pid])upd[`hakemLinkleri/${pid}`]=panelKaydi(yeniG,gid,s,yeniG.kategoriler,yeniG.aletler)});
  upd[`panelGruplari/${gid}/paneller`]=Object.keys(oz).length?oz:null};
 const yapiKaydet=async(gid,y)=>{const g=gruplar[gid];if(!g)return;const yeniG={...g,yapi:y},kalk=slotlar(g).filter(s=>!slotlar(yeniG).some(x=>x.slot===s.slot));
  if(kalk.length&&!await window.__gxConfirm(kalk.map(s=>s.slot).join(", ")+" — "+__T("bu panellerin linkleri yapı değişikliği nedeniyle silinecek; yeni linkler oluşturulacak. Devam edilsin mi?")))return;
  const upd={[`panelGruplari/${gid}/yapi`]:y,[`panelGruplari/${gid}/guncelleme`]:Date.now()};linkEsitle(gid,g,yeniG,upd);await yaz(upd,__T("Hakem ekranı yapısı kaydedildi ✓"));setYac(null)};
 const yapiKaldir=async gid=>{const g=gruplar[gid];if(!g)return;if(!await window.__gxConfirm(g.ad+" — "+__T("bu grup eski hakem ekranlarına dönsün mü? DA/DB linkleri DA1-DA2 / DB1-DB2 olur.")))return;
  const yeniG={...g,yapi:null},upd={[`panelGruplari/${gid}/yapi`]:null};linkEsitle(gid,g,yeniG,upd);await yaz(upd,__T("Grup eski hakem ekranlarına döndü."));setYac(null)};
 const grupSil=async gid=>{const g=gruplar[gid];if(!g)return;
  if(!await window.__gxConfirm(g.ad+" — "+__T("grup ve tüm panel linkleri silinsin mi? Açık olan bu paneller çalışmaz hâle gelir.")))return;
  const upd={[`panelGruplari/${gid}`]:null};slotlar(g).forEach(s=>{upd[`hakemLinkleri/${pidOf(gid,s.slot)}`]=null});
  Object.keys(linkler).forEach(k=>{if(linkler[k]?.panelGrubu===gid)upd[`hakemLinkleri/${k}`]=null});
  await yaz(upd,__T("Panel grubu silindi."))};

 // kategori ekle / çıkar (anında, canlı)
 const grupKatTik=(gid,k)=>{const g=gruplar[gid],on=!g?.kategoriler?.[k],upd={[`panelGruplari/${gid}/kategoriler/${k}`]:on?!0:null};on&&adlariYaz(g,[k],upd,"");if(!on)upd[`panelGruplari/${gid}/aletler/${k}`]=null;
  slotlar(g).forEach(s=>{if(!g.paneller?.[s.slot]?.ozel){upd[`hakemLinkleri/${pidOf(gid,s.slot)}/kategoriler/${k}`]=on?!0:null;if(!on)upd[`hakemLinkleri/${pidOf(gid,s.slot)}/aletler/${k}`]=null}});
  yaz(upd,(on?"＋ ":"－ ")+katAd(k)+" · "+g.ad)};
 const panelKatTik=(gid,s,k)=>{const pid=pidOf(gid,s.slot),on=!linkler[pid]?.kategoriler?.[k];
  yaz({[`hakemLinkleri/${pid}/kategoriler/${k}`]:on?!0:null,...(on?{}:{[`hakemLinkleri/${pid}/aletler/${k}`]:null})},(on?"＋ ":"－ ")+katAd(k)+" · "+s.slot)};
 // alet yetkisi: grup (özel listesi olmayan tüm panellere) ve panel (özel)
 const grupAlTik=(gid,k,al)=>{const g=gruplar[gid],m=alTikla(g.aletler,k,al);if(m===void 0)return;const upd={[`panelGruplari/${gid}/aletler/${k}`]:m};adlariYaz({...g,aletler:{...(g.aletler||{}),[k]:m}},[k],upd,"");
  slotlar(g).forEach(s=>{if(!g.paneller?.[s.slot]?.ozel)upd[`hakemLinkleri/${pidOf(gid,s.slot)}/aletler/${k}`]=m});yaz(upd,katAd(k)+" · "+__T("alet yetkisi güncellendi")+" · "+g.ad)};
 const panelAlTik=(gid,s,k,al)=>{const pid=pidOf(gid,s.slot),m=alTikla(linkler[pid]?.aletler,k,al);if(m===void 0)return;yaz({[`hakemLinkleri/${pid}/aletler/${k}`]:m},katAd(k)+" · "+__T("alet yetkisi güncellendi")+" · "+s.slot)};
 const bolmeDegis=(gid,s,n)=>yaz({[`panelGruplari/${gid}/paneller/${s.slot}/bolme`]:n||null},s.slot+" — "+(n?__T("bölünmüş ekran")+" ×"+n:__T("tek ekran")));
 const ozelDegis=(gid,s,v)=>{const g=gruplar[gid],pid=pidOf(gid,s.slot),upd={[`panelGruplari/${gid}/paneller/${s.slot}/ozel`]:v?!0:null};
  if(!v){upd[`hakemLinkleri/${pid}/kategoriler`]=g.kategoriler||null;upd[`hakemLinkleri/${pid}/aletler`]=g.aletler||null}
  yaz(upd,v?s.slot+" — "+__T("özel kategori listesi açıldı"):s.slot+" — "+__T("grubun kategorilerine döndü"))};
 const eksikOnar=gid=>{const g=gruplar[gid],upd={};slotlar(g).forEach(s=>{const pid=pidOf(gid,s.slot);if(!linkler[pid])upd[`hakemLinkleri/${pid}`]=panelKaydi(g,gid,s,g.paneller?.[s.slot]?.ozel?{}:g.kategoriler,g.paneller?.[s.slot]?.ozel?null:g.aletler)});
  Object.keys(upd).length&&yaz(upd,__T("Eksik panel kayıtları oluşturuldu."))};

 const kopyala=async t=>{try{await navigator.clipboard.writeText(t);toast(__T("Kopyalandı ✓"),"success")}catch{await window.__gxPrompt(__T("Linki kopyalayın:"),t)}};
 const qrGoster=async(baslik,url)=>{setQr({baslik,url,img:null});const img=await qrAl(url);setQr(o=>o&&o.url===url?{...o,img:img||"yok"}:o)};
 const qrSayfasi=async gid=>{const g=gruplar[gid],ss=slotlar(g),w=window.open("","_blank");if(!w){toast(__T("Açılır pencere engellendi."),"warning");return}
  w.document.write(`<title>${g.ad} — QR</title><p style="font:16px sans-serif">${__T("Hazırlanıyor…")}</p>`);
  const kart=[];for(const s of ss){const u=linkS(gid,s),im=await qrAl(u);kart.push(`<div class="k"><div class="t" style="color:${TIP[s.tip].renk}">${s.slot}</div><div class="g">${g.ad} · ${TIP[s.tip].ad}</div>${im?`<img src="${im}">`:""}<div class="u">${u.replace(/&/g,"&amp;")}</div></div>`)}
  w.document.open();w.document.write(`<!doctype html><html><head><meta charset="utf-8"><title>${g.ad} — ${__T("Panel QR")}</title><style>body{font-family:system-ui,sans-serif;margin:16px}h1{font-size:18px}.w{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}.k{border:1px solid #334155;border-radius:10px;padding:10px;text-align:center;break-inside:avoid}.t{font-size:26px;font-weight:900}.g{font-size:12px;color:#475569}.k img{width:100%;max-width:220px}.u{font-size:8px;color:#94a3b8;word-break:break-all}@media print{button{display:none}}</style></head><body><h1>${(comps[comp]?.isim)||""} — ${g.ad}</h1><button onclick="print()">${__T("Yazdır")}</button><div class="w">${kart.join("")}</div></body></html>`);w.document.close()};

 // ---- görünüm ----
 const S={wrap:{minHeight:"100vh",background:"#F0F2F5",color:"#1A1D26",fontFamily:"Nunito,system-ui,-apple-system,sans-serif",paddingBottom:"3rem"},
  top:{position:"sticky",top:0,zIndex:10,background:"#fff",backdropFilter:"blur(12px)",borderBottom:"1px solid #E5E7EB",boxShadow:"0 1px 3px rgba(0,0,0,.06)",padding:"0 1.25rem",minHeight:68,display:"flex",alignItems:"center",gap:".9rem",flexWrap:"wrap"},
  back:{width:38,height:38,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",color:"#1A1D26",textDecoration:"none",flexShrink:0},
  ico:{width:44,height:44,borderRadius:12,boxShadow:"0 6px 18px rgba(99,102,241,.28)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,background:"linear-gradient(135deg,#db2777,#6366f1)"},
  in:{maxWidth:1150,margin:"0 auto",padding:"1.25rem"},
  card:{background:"#fff",border:"1px solid #E5E7EB",borderRadius:16,padding:"1.1rem 1.15rem",marginBottom:"1rem"},
  sel:{width:"100%",padding:".6rem .8rem",borderRadius:10,border:"1px solid #E5E7EB",background:"#fff",color:"#1A1D26",fontWeight:700,fontSize:".92rem",marginBottom:"1rem"},
  inp:{width:"100%",padding:".5rem .65rem",borderRadius:9,border:"1px solid #E5E7EB",background:"#F8FAFC",color:"#1A1D26",fontWeight:700,fontSize:".9rem"},
  chip:(on,c)=>({padding:".28rem .55rem",borderRadius:8,fontSize:".76rem",fontWeight:700,cursor:"pointer",border:"1px solid "+(on?(c||"#0ea5e9"):"#E5E7EB"),background:on?(c||"#0ea5e9")+"2e":"#F8FAFC",color:on?"#0F172A":"#64748B",whiteSpace:"nowrap",userSelect:"none"}),
  btn:{padding:".55rem .9rem",borderRadius:10,border:"none",color:"#fff",fontWeight:800,cursor:"pointer",fontSize:".85rem"},
  ghost:{padding:".45rem .75rem",borderRadius:9,border:"1px solid #E5E7EB",background:"#fff",color:"#334155",fontWeight:800,cursor:"pointer",fontSize:".78rem",whiteSpace:"nowrap"},
  lbl:{fontSize:".7rem",color:"#6B7280",fontWeight:800,textTransform:"uppercase",letterSpacing:".04em"},
  slot:c=>({minWidth:54,textAlign:"center",fontWeight:900,fontSize:"1rem",color:c,border:"1px solid "+c+"66",background:c+"1f",borderRadius:9,padding:".35rem .5rem"})};
 const katChips=(secili,onTik,renk,devre)=>e.jsx("div",{style:{display:"flex",gap:".3rem",flexWrap:"wrap"},children:katSira.map(k=>e.jsx("span",{style:{...S.chip(!!secili?.[k],renk),opacity:devre?.45:1,pointerEvents:devre?"none":"auto"},onClick:()=>!busy&&onTik(k),children:katAd(k)},k))});

 const _en=()=>typeof __LANG=="function"&&__LANG()==="en";
 const alSatir=(ks,m,onTik,renk,devre)=>e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:".35rem"},children:ks.filter(k=>katAletleri(k).length).map(k=>{const kis=!!(m&&m[k]);return e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:".35rem",flexWrap:"wrap"},children:[
   e.jsx("span",{style:{minWidth:120,fontSize:".78rem",fontWeight:800,color:"#334155"},children:katAd(k)}),
   ...katAletleri(k).map(al=>{const on=alIzinli(m,k,al);return e.jsxs("span",{style:{...S.chip(on,renk),display:"inline-flex",alignItems:"center",gap:".25rem",opacity:devre?.45:1,pointerEvents:devre?"none":"auto",textDecoration:on?"none":"line-through"},onClick:()=>!busy&&onTik(k,al),children:[raImg(al)?e.jsx("img",{src:raImg(al),alt:"",style:{width:16,height:16,objectFit:"contain",opacity:on?1:.4}}):null,raAd(al,_en())]},al)}),
   e.jsx("span",{style:{fontSize:".7rem",fontWeight:800,color:kis?"#7C3AED":"#94A3B8"},children:kis?__T("yalnız seçili aletler"):__T("tüm aletler")})]},k)})});
 // ---- hakem atama ----
 const[havuz,setHavuz]=R.useState(null),_hy=R.useRef(!1);
 const havuzYukle=()=>{if(_hy.current)return;_hy.current=!0;get(ref(db,"referees")).then(sn=>{const v=sn.val()||{};setHavuz(Object.entries(v).filter(([,h])=>h&&h.disiplin==="ritmik"&&h.adSoyad).map(([id,h])=>({id,adSoyad:h.adSoyad,ulke:h.ulke||"",il:h.il||"",brove:h.brove||""})).sort((a,b)=>a.adSoyad.localeCompare(b.adSoyad,"tr")))}).catch(()=>{_hy.current=!1;setHavuz([])})};
 R.useEffect(()=>{comp&&havuzYukle()},[comp]);// eslint-disable-line
 const HKEY={T:"zaman",L1:"cizgi1",L2:"cizgi2",BH:"bashakem"},hkey=sl=>HKEY[sl]||String(sl).toLowerCase(),FIGPOZ=new Set(["DA","DA1","DA2","DA3","DA4","DB","DB1","DB2","DB3","DB4","A1","A2","A3","A4","E1","E2","E3","E4"]);
 const tumAl=k=>{const a=cats[k]?.aletler;return(Array.isArray(a)?a:a&&typeof a==="object"?Object.keys(a).filter(x=>a[x]):[]).map(z=>typeof z==="object"?z.id||z.value:z).filter(Boolean)};
 const hObj=h=>h?{name:h.ad,refId:h.refId||null,ulke:h.ulke||null}:null;
 // grubun hakem adları hakem ekranlarının okuduğu yere: hakemler/<kat>/<alet>/<koltuk> (grubun kategori + alet yetkisine göre)
 // 2026-10-08: koltuk başına kategori/alet istisnası panelGruplari/<gid>/hakemAlet/<SLOT>/<kat>/<alet> = {ad,refId,ulke…} (yoksa koltuğun varsayılan hakemi)
 const adlariYaz=(g,ks,upd,pre,yalniz)=>{const sls=new Set([...Object.keys(g?.hakemler||{}),...Object.keys(g?.hakemAlet||{})]);sls.forEach(sl=>{if(yalniz&&sl!==yalniz)return;const h=g?.hakemler?.[sl]||null;ks.forEach(k=>tumAl(k).forEach(al=>{if(!alIzinli(g.aletler,k,al))return;const o=g?.hakemAlet?.[sl]?.[k]?.[al];upd[`${pre}hakemler/${k}/${al}/${hkey(sl)}`]=hObj(o&&o.ad?o:h)}))})};
 const rolAdi=(gid,sl)=>gid?(gruplar[gid]?.ad||"")+" · "+(sl==="BH"?__T("Başhakem"):sl):sl==="ITIRAZ"?__T("İtiraz hakemi"):sl;
 const hakemAta=async(gid,sl,val,ak,aal)=>{if(!C||!C.isim){toast(__T("Bu yarışma artık mevcut değil; değişiklik yazılmadı."),"error");return}
  const P=`${BASE}/${comp}/`,U={},g=gid?gruplar[gid]:null,onc=(ak?g?.hakemAlet?.[sl]?.[ak]?.[Array.isArray(aal)?aal[0]:aal]:gid?g?.hakemler?.[sl]:C?.hakemAtama?.[sl])||null;let v=val,yeniId=null;
  if(v&&v.yeni){const ad=String(v.ad||"").trim().toLocaleUpperCase("tr-TR");if(!ad)return;if(!await window.__gxConfirm(__T("Hakem havuzuna eklensin mi?")+"\n\n"+ad))return;yeniId="rf"+Date.now().toString(36)+Math.random().toString(36).slice(2,6);U[`referees/${yeniId}`]={adSoyad:ad,disiplin:"ritmik",brans:"Ritmik",createdAt:new Date().toISOString(),importSource:"Paneller",gorevSayisi:0};v={refId:yeniId,ad,ulke:"",il:""};setHavuz(h=>h?[...h,{id:yeniId,adSoyad:ad,ulke:"",il:"",brove:""}]:h)}
  const kayit=v?{refId:v.refId||null,ad:v.ad,ulke:v.ulke||null,il:v.il||null,brove:v.brove||null}:null;
  if(gid&&ak){(Array.isArray(aal)?aal:[aal]).forEach(a1=>{U[`${P}panelGruplari/${gid}/hakemAlet/${sl}/${ak}/${a1}`]=kayit;U[`${P}hakemler/${ak}/${a1}/${hkey(sl)}`]=hObj(kayit||g?.hakemler?.[sl]||null)})}
  else if(gid){U[`${P}panelGruplari/${gid}/hakemler/${sl}`]=kayit;adlariYaz({...g,hakemler:{[sl]:kayit}},kListe(g.kategoriler),U,P,sl);if(!kayit)kListe(g.kategoriler).forEach(k=>tumAl(k).forEach(al=>{alIzinli(g.aletler,k,al)&&!(g?.hakemAlet?.[sl]?.[k]?.[al]?.ad)&&(U[`${P}hakemler/${k}/${al}/${hkey(sl)}`]=null)}));
   if(!ak&&FIGPOZ.has(sl))U[`${P}hakemKarnesi/atama/${sl}`]=kayit?{ad:kayit.ad,kulup:kayit.ulke||kayit.il||""}:null}
  else U[`${P}hakemAtama/${sl}`]=kayit;
  // görev geçmişi: yarışma başına tek kayıt (oto_<yarışma>), rol = atandığı koltuklar
  const gk="oto_"+String(comp).replace(/[.#$[\]/]/g,"_");
  const roller=rid=>{const o=[];Object.entries(gruplar).forEach(([g2,gg])=>{Object.entries(gg?.hakemler||{}).forEach(([s2,h])=>{h&&h.refId===rid&&!(!ak&&g2===gid&&s2===sl)&&o.push(rolAdi(g2,s2))});Object.entries(gg?.hakemAlet||{}).forEach(([s2,km])=>Object.entries(km||{}).forEach(([k2,am])=>Object.entries(am||{}).forEach(([a2,h])=>{h&&h.refId===rid&&!(ak&&g2===gid&&s2===sl&&k2===ak&&(Array.isArray(aal)?aal.includes(a2):a2===aal))&&o.push(rolAdi(g2,s2)+" ("+katAd(k2)+" · "+raAd(a2,_en())+")")})))});Object.entries(C?.hakemAtama||{}).forEach(([s2,h])=>{h&&h.refId===rid&&!(!gid&&s2===sl)&&o.push(rolAdi(null,s2))});return o};
  const gorev=async(rid,ekRol)=>{const r=(await get(ref(db,`referees/${rid}`))).val()||(rid===yeniId?{}:null);if(!r)return;const rl=[...roller(rid),...(ekRol?[ekRol]:[])],var_=r.gecmisYarismalar&&r.gecmisYarismalar[gk];
   if(rl.length){U[`referees/${rid}/gecmisYarismalar/${gk}`]={compName:C.isim,compId:comp,date:comps[comp]?.t||"",role:rl.join(", "),addedAt:var_?.addedAt||new Date().toISOString(),oto:!0};var_||(U[`referees/${rid}/gorevSayisi`]=(+r.gorevSayisi||0)+1)}
   else if(var_){U[`referees/${rid}/gecmisYarismalar/${gk}`]=null;U[`referees/${rid}/gorevSayisi`]=Math.max(0,(+r.gorevSayisi||0)-1)}};
  const ra=rolAdi(gid,sl)+(ak?" ("+katAd(ak)+" · "+(Array.isArray(aal)?__T("tüm aletler"):raAd(aal,_en()))+")":"");
  setBusy(!0);try{if(onc&&onc.refId&&(!kayit||onc.refId!==kayit.refId))await gorev(onc.refId,null);if(kayit&&kayit.refId&&(!onc||onc.refId!==kayit.refId))await gorev(kayit.refId,ra);
   await update(ref(db),U);try{logAction("panel_group_update",`[Ritmik] Hakem ataması: ${ra} → ${kayit?kayit.ad:"(kaldırıldı)"}`,{user:_un,competitionId:comp,discipline:"ritmik",data:{koltuk:sl,grup:gid||null,hakem:kayit,onceki:onc}})}catch{}toast(ra+" · "+(kayit?kayit.ad:__T("atama kaldırıldı")),"success")}catch(er){console.error(er);toast(__T("Kaydedilemedi."),"error")}setBusy(!1)};
 // hakem ekran kilidi durumu (hakemKilit/<linkId>: {h}|{yok}) — unutulan şifre buradan sıfırlanır (hakem ekranı yeniden şifre sorar)
// hakem ekran kilidi (hakemKilit/<linkId>: {h}|{yok}; şifre hakemKilitPin/<linkId>.pin) — şifre burada görünür (göz ile açılır), silinince hakem ekranının kilidi kalkar ve yeni şifre sorulur
  const kilitCip=pid=>{if(!__SIFRE)return null;const k=C?.hakemKilit?.[pid],pn=C?.hakemKilitPin?.[pid]?.pin;if(!k)return e.jsxs("span",{style:{display:"inline-flex",alignItems:"center",gap:4,fontSize:".7rem",fontWeight:700,color:"#94A3B8",marginLeft:".4rem"},children:[e.jsx("span",{className:"material-icons-round",style:{fontSize:".95rem"},children:"lock_open"}),__T("Ekran şifresi belirlenmedi")]});
   const gor=!!pinGor[pid];
   return e.jsxs("span",{style:{display:"inline-flex",alignItems:"center",gap:5,fontSize:".7rem",fontWeight:800,color:k.h?"#6D28D9":"#64748B",background:k.h?"#F5F3FF":"#F1F5F9",border:"1px solid "+(k.h?"#DDD6FE":"#E2E8F0"),borderRadius:999,padding:"2px 4px 2px 8px",marginLeft:".4rem"},children:[e.jsx("span",{className:"material-icons-round",style:{fontSize:".95rem"},children:k.h?"lock":"bedtime"}),
    k.h?(pn?[__T("Şifre")+":",e.jsx("b",{style:{fontFamily:"ui-monospace,Menlo,monospace",fontSize:".82rem",letterSpacing:".12em",color:"#4C1D95",minWidth:"3.2em",display:"inline-block"},children:gor?pn:"••••"},"p"),e.jsx("button",{type:"button",title:gor?__T("Gizle"):__T("Göster"),onClick:()=>setPinGor(o=>({...o,[pid]:!o[pid]})),style:{border:0,background:"transparent",cursor:"pointer",padding:0,display:"inline-flex",color:"#6D28D9"},children:e.jsx("span",{className:"material-icons-round",style:{fontSize:"1rem"},children:gor?"visibility_off":"visibility"})},"g")]:__T("Ekran şifreli")):__T("Şifresiz · ekran koruyucu"),
    e.jsx("button",{type:"button",disabled:busy,title:__T("Hakem ekranı yeniden şifre oluşturmayı sorar"),onClick:async()=>{if(!await window.__gxConfirm(__T("Bu hakem ekranının şifresi silinsin mi? Ekran açılmışsa kilidi kalkar ve yeni şifre oluşturması istenir.")))return;yaz({[`hakemKilit/${pid}`]:null,[`hakemKilitPin/${pid}`]:null},"hakem ekran şifresi silindi: "+pid)},style:{border:0,background:"#fff",color:"#B91C1C",fontWeight:800,fontSize:".68rem",borderRadius:999,padding:"2px 8px",cursor:"pointer",display:"inline-flex",alignItems:"center",gap:3},children:[e.jsx("span",{className:"material-icons-round",style:{fontSize:".85rem"},children:"delete"}),__T("Sil")]})]})};
  // kategori / alet bazında koltuk hakemi (istisna) — düğme + tablo
  const haSay=(gid,sl)=>{let n=0;Object.values(gruplar[gid]?.hakemAlet?.[sl]||{}).forEach(am=>Object.values(am||{}).forEach(h=>{h&&h.ad&&n++}));return n};
  const haDugme=(gid,sl)=>{const n=haSay(gid,sl),ac=!!acikHA[gid+"|"+sl];return e.jsxs("button",{type:"button",onClick:()=>setAcikHA(o=>({...o,[gid+"|"+sl]:!ac})),title:__T("Bu koltukta kategori ve alete göre farklı hakem"),style:{display:"inline-flex",alignItems:"center",gap:4,border:"1px solid "+(n?"#A78BFA":"#E2E8F0"),background:n?"#F5F3FF":ac?"#F8FAFC":"#fff",color:n?"#6D28D9":"#475569",borderRadius:999,padding:"3px 10px",fontSize:".72rem",fontWeight:800,cursor:"pointer",fontFamily:"inherit"},children:[e.jsx("span",{className:"material-icons-round",style:{fontSize:".95rem"},children:"table_view"}),__T("Kategori / alet bazında"),n?e.jsx("b",{style:{background:"#7C3AED",color:"#fff",borderRadius:999,padding:"0 6px",marginLeft:2},children:n}):null,e.jsx("span",{className:"material-icons-round",style:{fontSize:".95rem"},children:ac?"expand_less":"expand_more"})]})};
  // tablo sırası çıkış listesine göre (2026-10-08): kategoriler ve aletler programda ilk göründükleri sırayla; programda yoksa yaş sırası (küçük → büyük)
  const clSira=(()=>{const kS={},aS={};let i=0;const gl=C?.cikisListesi?.gunler;(Array.isArray(gl)?gl:Object.values(gl||{})).forEach(g=>Object.values(g&&g.bloklar||{}).forEach(b=>{if(!b||!b.kat)return;Object.values(b.rows||{}).forEach(rw=>Object.values(rw&&rw.r||{}).forEach(x=>{i++;kS[b.kat]==null&&(kS[b.kat]=i);const al=x&&x.al||(Array.isArray(b.aletler)?b.aletler[0]:"");if(al){aS[b.kat]=aS[b.kat]||{};aS[b.kat][al]==null&&(aS[b.kat][al]=i)}}))}));return{kS,aS}})();
  const yasS=k=>{const i=["minik","kucuk","yildiz","genc","buyuk"].findIndex(x=>String(k).startsWith(x));return i<0?9:i};
  const katSirala=ks=>ks.slice().sort((a,b)=>((clSira.kS[a]??1e9)-(clSira.kS[b]??1e9))||(yasS(a)-yasS(b))||String(a).localeCompare(String(b)));
  const aletSirala=(k,als)=>{const m=clSira.aS[k]||{};return als.map((a,i)=>[a,i]).sort((x,y)=>((m[x[0]]??1e9+x[1])-(m[y[0]]??1e9+y[1]))).map(x=>x[0])};
  const haTablo=(gid,sl,rec)=>{if(!acikHA[gid+"|"+sl])return null;const g=gruplar[gid],ks=katSirala(kListe(rec?.kategoriler&&g.paneller?.[sl]?.ozel?rec.kategoriler:g.kategoriler).filter(k=>!/^final_/.test(k))),vars=g?.hakemler?.[sl];
   if(!ks.length)return e.jsx("div",{style:{fontSize:".76rem",color:"#94A3B8",fontWeight:700,margin:".3rem 0 .5rem"},children:__T("Önce gruba kategori seçin.")});
   return e.jsxs("div",{style:{margin:".35rem 0 .6rem",padding:".6rem .7rem",borderRadius:12,background:"#FAF5FF",border:"1px solid #E9D5FF"},children:[e.jsx("div",{style:{fontSize:".72rem",color:"#6B21A8",fontWeight:700,marginBottom:".45rem"},children:__T("Boş bırakılan hücrede koltuğun hakemi")+" ("+(vars?.ad||__T("atanmadı"))+") "+__T("görev yapar. Hakem ekranı çağrılan kategori ve alete göre hakem adını gösterir.")}),
    e.jsx("div",{style:{display:"grid",gap:".45rem"},children:ks.map(k=>{const als=aletSirala(k,tumAl(k).filter(al=>alIzinli(g.aletler,k,al)&&alIzinli(g.paneller?.[sl]?.ozel?rec?.aletler:null,k,al)));const ortak=(()=>{const L=als.map(al=>g?.hakemAlet?.[sl]?.[k]?.[al]);return L.length&&L.every(x=>x&&x.ad&&x.refId===L[0].refId&&x.ad===L[0].ad)?L[0]:null})();
     return e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"minmax(210px,auto) 1fr",gap:".7rem",alignItems:"start",paddingBottom:".45rem",borderBottom:"1px dashed #E9D5FF"},children:[e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:".3rem"},children:[e.jsx("b",{style:{fontSize:".8rem",paddingTop:".3rem"},children:katAd(k)}),e.jsxs("div",{title:__T("Seçilen hakem bu kategorinin tüm aletlerine atanır"),style:{display:"flex",flexDirection:"column",gap:".2rem"},children:[e.jsx("span",{style:{fontSize:".66rem",fontWeight:800,color:"#7C3AED",letterSpacing:".04em",textTransform:"uppercase"},children:__T("Tüm aletler")}),e.jsx(HakemSec,{val:ortak,onSec:v=>hakemAta(gid,sl,v,k,als),havuz,yukle:havuzYukle,dis:busy,ph:__T("Kategoriye hakem…")})]})]}),
     e.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:".45rem"},children:als.map(al=>{const o=g?.hakemAlet?.[sl]?.[k]?.[al];return e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:".35rem",padding:".25rem .4rem",borderRadius:10,background:o&&o.ad?"#EDE9FE":"#fff",border:"1px solid "+(o&&o.ad?"#C4B5FD":"#E5E7EB")},children:[raImg(al)?e.jsx("img",{src:raImg(al),alt:"",style:{width:22,height:22,borderRadius:"50%",background:"#fff"}}):null,e.jsx("span",{style:{fontSize:".74rem",fontWeight:800,minWidth:52},children:raAd(al,_en())}),e.jsx(HakemSec,{val:o,onSec:v=>hakemAta(gid,sl,v,k,al),havuz,yukle:havuzYukle,dis:busy,ph:vars?.ad?"= "+vars.ad:__T("Hakem ata…")})]},al)})})]},k)})})]})};
  const hSec=(gid,sl)=>e.jsx(HakemSec,{val:gid?gruplar[gid]?.hakemler?.[sl]:C?.hakemAtama?.[sl],onSec:v=>hakemAta(gid,sl,v),havuz,yukle:havuzYukle,dis:busy});
 const grupKarti=gid=>{const g=gruplar[gid],ss=slotlar(g),op=acik[gid]!==!1,gk=kListe(g.kategoriler),ak=aktifKat(gk),eksik=ss.filter(s=>!linkler[pidOf(gid,s.slot)]);
  return e.jsxs("div",{style:{...S.card,borderColor:"#C7D2FE"},children:[
   e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:".6rem",flexWrap:"wrap"},children:[
    e.jsx("button",{style:{...S.ghost,padding:".3rem .55rem"},onClick:()=>setAcik(o=>({...o,[gid]:!op})),children:op?"▲":"▼"}),
    e.jsxs("div",{style:{flex:1,minWidth:200},children:[e.jsx("div",{style:{fontWeight:900,fontSize:"1.05rem"},children:g.ad}),
     e.jsxs("div",{style:{fontSize:".76rem",color:"#6B7280",fontWeight:700},children:[TIP_SIRA.filter(t=>g.tipler?.[t]).map(t=>(t==="DA"||t==="DB")&&g.yapi?t+"·"+({tek:__T("tek not"),sorumlu:__T("2 aşama"),ortalama:__T("ortalama"),bashakem:__T("başhakem")})[yapiNorm(g.yapi)[t].yapi]:t+(TIP[t].coklu?"×"+(g.adet?.[t]||4):"")).join(" · "),g.yapi?e.jsx("span",{style:{marginLeft:".4rem",padding:".05rem .45rem",borderRadius:999,background:"#EDE9FE",color:"#6D28D9",fontWeight:900},children:__T("yeni ekran")}):null," · ",ss.length," ",__T("panel")," · ",gk.length," ",__T("kategori"),
      ak?e.jsxs("span",{style:{color:"#15803D"},children:["  ● ",__T("şu an")," ",katAd(ak)]}):null]})]}),
    e.jsx("button",{style:S.ghost,onClick:()=>kopyala(ss.map(s=>`${s.slot}: ${linkS(gid,s)}`).join("\n")),children:__T("Tüm linkleri kopyala")}),
    e.jsx("button",{style:S.ghost,onClick:()=>qrSayfasi(gid),children:__T("QR sayfası")}),
    e.jsx("button",{style:{...S.ghost,borderColor:g.yapi?"#C4B5FD":"#E5E7EB",color:g.yapi?"#7C3AED":"#334155"},onClick:()=>setYac(yac===gid?null:gid),children:g.yapi?"⚙ "+__T("Hakem ekranı yapısı"):"✨ "+__T("Yeni hakem ekranları")}),
    e.jsx("button",{style:S.ghost,onClick:()=>formAc(gid),children:__T("Düzenle")}),
    e.jsx("button",{style:{...S.ghost,borderColor:"#FECACA",color:"#DC2626"},onClick:()=>grupSil(gid),children:__T("Sil")})]}),
   yac===gid?e.jsxs("div",{children:[g.yapi?null:e.jsx("div",{style:{marginTop:".8rem",fontSize:".8rem",fontWeight:700,color:"#7C3AED"},children:__T("Bu grup şu an eski hakem ekranlarını kullanıyor. Yapıyı kaydedince bu grubun DA/DB/A/E linkleri yeni ekranlarla açılır; QR & Linkler sayfasındaki eski linkler değişmez.")}),
    e.jsx(YapiEditor,{y0:g.yapi,tipler:g.tipler,busy,onCancel:()=>setYac(null),onSave:y=>yapiKaydet(gid,y)}),
    g.yapi?e.jsx("div",{style:{textAlign:"right",marginTop:".4rem"},children:e.jsx("button",{style:{...S.ghost,color:"#B45309",borderColor:"#FCD34D"},onClick:()=>yapiKaldir(gid),children:__T("Eski hakem ekranlarına dön")})}):null]}):null,
   op?e.jsxs(e.Fragment,{children:[
    eksik.length?e.jsxs("div",{style:{marginTop:".7rem",fontSize:".8rem",color:"#B45309",fontWeight:700},children:[eksik.map(s=>s.slot).join(", ")," — ",__T("panel kaydı eksik. "),e.jsx("button",{style:{...S.ghost,padding:".2rem .5rem"},onClick:()=>eksikOnar(gid),children:__T("Oluştur")})]}):null,
    e.jsxs("div",{style:{marginTop:".8rem",padding:".7rem .8rem",background:"#F8FAFC",border:"1px solid #E5E7EB",borderRadius:12},children:[
     e.jsxs("div",{style:{...S.lbl,marginBottom:".45rem"},children:[__T("Grubun kategorileri")," ",e.jsx("span",{style:{textTransform:"none",letterSpacing:0,fontWeight:600},children:__T("(dokununca anında eklenir/çıkarılır; özel listesi olmayan tüm panellere uygulanır)")})]}),
     katChips(g.kategoriler,k=>grupKatTik(gid,k),"#22c55e"),gk.length?null:e.jsxs("div",{style:{marginTop:".5rem",display:"flex",alignItems:"center",gap:".45rem",padding:".5rem .65rem",borderRadius:10,background:"#FEF2F2",border:"1px solid #FECACA",color:"#B91C1C",fontSize:".8rem",fontWeight:800},children:[e.jsx("span",{className:"material-icons-round",style:{fontSize:"1.1rem"},children:"warning"}),__T("Bu gruba kategori seçilmedi — sporcu çağrıldığında bu gruptaki hakem ekranlarına veri gelmez.")]}),
     gk.some(k=>katAletleri(k).length)?e.jsxs("div",{style:{marginTop:".7rem",paddingTop:".6rem",borderTop:"1px dashed #E2E8F0"},children:[e.jsxs("div",{style:{...S.lbl,marginBottom:".45rem"},children:[__T("Alet yetkisi")," ",e.jsx("span",{style:{textTransform:"none",letterSpacing:0,fontWeight:600},children:__T("(hakemler yalnız işaretli aletlerin çağrılarını görür; hepsi seçiliyse tüm aletler)")})]}),
      alSatir(gk,g.aletler,(k,al)=>grupAlTik(gid,k,al),"#7c3aed")]}):null]}),
    e.jsxs("div",{style:{marginTop:".8rem",display:"grid",gridTemplateColumns:"64px 1fr",gap:".6rem",alignItems:"center",padding:".5rem 0",borderBottom:"1px solid #EEF2F7"},children:[e.jsx("div",{style:S.slot("#DB2777"),children:"BH"}),e.jsxs("div",{style:{minWidth:0},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:".6rem",flexWrap:"wrap"},children:[e.jsx("b",{style:{fontSize:".86rem"},children:__T("Başhakem")}),hSec(gid,"BH"),haDugme(gid,"BH"),e.jsx("span",{style:{fontSize:".72rem",color:"#6B7280",fontWeight:600},children:__T("Puanlama ekranını kullanan başhakem (raporlarda ve hakem karnesinde görünür)")})]}),haTablo(gid,"BH",null)]})]}),
    TIP_SIRA.filter(t=>g.tipler?.[t]).map(t=>e.jsxs("div",{style:{marginTop:".8rem"},children:[
     e.jsx("div",{style:{...S.lbl,color:TIP[t].renk,marginBottom:".35rem"},children:__T(TIP[t].ad)}),
     ss.filter(s=>s.tip===t).map(s=>{const pid=pidOf(gid,s.slot),rec=linkler[pid],oz=!!g.paneller?.[s.slot]?.ozel,pk=kListe(rec?.kategoriler),u=linkS(gid,s),bn=sjBolme(g,s),alOz=rec?.aletler?Object.entries(rec.aletler).filter(([,m])=>m).map(([k,m])=>katAd(k)+": "+Object.keys(m).filter(a=>m[a]).map(a=>raAd(a,_en())).join("/")).join(" · "):"";
      return e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"64px 1fr auto",gap:".6rem",alignItems:"start",padding:".5rem 0",borderBottom:"1px solid #EEF2F7"},children:[
       e.jsx("div",{style:S.slot(TIP[t].renk),children:s.slot}),
       e.jsxs("div",{style:{minWidth:0},children:[e.jsxs("div",{style:{marginBottom:".35rem",display:"flex",alignItems:"center",flexWrap:"wrap",gap:".3rem"},children:[hSec(gid,s.slot),haDugme(gid,s.slot),kilitCip(pid)]}),haTablo(gid,s.slot,rec),
        e.jsxs("div",{style:{display:"flex",gap:".5rem",alignItems:"center",flexWrap:"wrap",marginBottom:oz?".4rem":0},children:[
         e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:".35rem",fontSize:".76rem",fontWeight:700,color:oz?"#B45309":"#6B7280",cursor:"pointer"},children:[e.jsx("input",{type:"checkbox",checked:oz,disabled:busy,onChange:ev=>ozelDegis(gid,s,ev.target.checked)}),__T("Özel kategori listesi")]}),
         !oz?e.jsx("span",{style:{fontSize:".76rem",color:"#6B7280",fontWeight:600},children:pk.length?pk.map(katAd).join(", "):__T("— kategori yok —")}):null,
         !oz&&alOz?e.jsx("span",{style:{fontSize:".72rem",color:"#7C3AED",fontWeight:800},children:"⚑ "+alOz}):null]}),
        oz?katChips(rec?.kategoriler,k=>panelKatTik(gid,s,k),TIP[t].renk,!rec):null,
        oz&&pk.some(k=>katAletleri(k).length)?e.jsx("div",{style:{marginTop:".45rem"},children:alSatir(pk,rec?.aletler,(k,al)=>panelAlTik(gid,s,k,al),"#7c3aed",!rec)}):null,
        t==="SJ"?e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:".3rem",flexWrap:"wrap",marginTop:".45rem"},children:[e.jsx("span",{style:{fontSize:".74rem",fontWeight:800,color:"#92400E",marginRight:".2rem"},children:__T("Ekran")}),
         [[0,__T("Tek ekran")],[2,"⧉ ×2"],[3,"⧉ ×3"],[4,"⧉ ×4"]].map(([n,tx])=>e.jsx("button",{type:"button",disabled:busy,onClick:()=>bn!==n&&bolmeDegis(gid,s,n),style:{padding:".25rem .55rem",borderRadius:8,border:"1px solid "+(bn===n?"#D97706":"#FCD34D"),background:bn===n?"#D97706":"#fff",color:bn===n?"#fff":"#92400E",fontWeight:900,fontSize:".74rem",cursor:"pointer",fontFamily:"inherit"},children:tx},n)),
         e.jsx("span",{style:{fontSize:".7rem",color:"#6B7280",fontWeight:600},children:bn?__T("Aynı anda açık aletler yan yana bölmelerde gösterilir."):__T("Tek ekranda en son çağrı gösterilir.")})]}):null]}),
       e.jsxs("div",{style:{display:"flex",gap:".35rem",flexWrap:"wrap",justifyContent:"flex-end"},children:[
        e.jsx("button",{style:S.ghost,onClick:()=>kopyala(u),children:__T("Kopyala")}),
        e.jsx("button",{style:S.ghost,onClick:()=>window.open(u,"_blank"),children:__T("Aç")}),
        e.jsx("button",{style:S.ghost,onClick:()=>qrGoster(`${g.ad} · ${s.slot}`,u),children:"QR"}),
        null]})]},s.slot)})]},t))]}):null]},gid)};

 const formKarti=()=>{const f=form;return e.jsxs("div",{style:{...S.card,borderColor:"#db2777"},children:[
  e.jsx("div",{style:{fontWeight:900,marginBottom:".7rem"},children:f.gid?__T("Panel grubunu düzenle"):__T("Yeni panel grubu")}),
  e.jsx("div",{style:S.lbl,children:__T("Grup adı")}),
  e.jsx("input",{style:{...S.inp,margin:".3rem 0 .8rem"},placeholder:__T("ör. Salon 1 / Panel 1"),value:f.ad,onChange:t=>setForm({...f,ad:t.target.value})}),
  e.jsx("div",{style:S.lbl,children:__T("Bu grupta hangi paneller olacak?")}),
  e.jsx("div",{style:{display:"flex",gap:".5rem",flexWrap:"wrap",margin:".4rem 0 .8rem"},children:TIP_SIRA.map(t=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:".35rem",border:"1px solid "+(f.tipler[t]?TIP[t].renk:"#E5E7EB"),background:f.tipler[t]?TIP[t].renk+"22":"#F8FAFC",borderRadius:10,padding:".35rem .6rem"},children:[
   e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:".35rem",fontWeight:800,fontSize:".82rem",cursor:"pointer"},children:[e.jsx("input",{type:"checkbox",checked:!!f.tipler[t],onChange:ev=>setForm({...f,tipler:{...f.tipler,[t]:ev.target.checked}})}),__T(TIP[t].ad)]}),
   TIP[t].coklu&&f.tipler[t]?e.jsx("select",{style:{background:"#F8FAFC",color:"#1A1D26",border:"1px solid #E5E7EB",borderRadius:7,fontWeight:800,padding:".15rem .3rem"},value:f.adet[t],onChange:ev=>setForm({...f,adet:{...f.adet,[t]:parseInt(ev.target.value)}}),children:Array.from({length:TIP[t].coklu.max},(_,i)=>i+1).map(n=>e.jsx("option",{value:n,children:n+" "+(n===1?__T("hakem (tek)"):__T("hakem"))+" ("+TIP[t].coklu.on+"1–"+TIP[t].coklu.on+n+")"},n))}):null,
   TIP[t].tek?e.jsx("span",{style:{fontSize:".7rem",color:"#6B7280",fontWeight:700},children:TIP[t].tek.map(x=>x[0]).join(", ")}):null]},t))}),
  e.jsx("div",{style:S.lbl,children:__T("Grubun kategorileri (sonradan da eklenip çıkarılabilir)")}),
  e.jsx("div",{style:{margin:".4rem 0 .9rem"},children:katSira.length?e.jsx("div",{style:{display:"flex",gap:".3rem",flexWrap:"wrap"},children:katSira.map(k=>e.jsx("span",{style:S.chip(!!f.kategoriler[k],"#22c55e"),onClick:()=>setForm(o=>({...o,kategoriler:{...o.kategoriler,[k]:!o.kategoriler[k]}})),children:katAd(k)},k))}):e.jsx("span",{style:{color:"#6B7280",fontSize:".8rem"},children:__T("Bu yarışmada kategori yok.")})}),
  e.jsxs("div",{style:{display:"flex",gap:".6rem",justifyContent:"flex-end"},children:[e.jsx("button",{style:S.ghost,onClick:()=>setForm(null),children:__T("Vazgeç")}),
   e.jsx("button",{style:{...S.btn,background:"linear-gradient(135deg,#db2777,#6366f1)"},disabled:busy,onClick:formKaydet,children:f.gid?__T("Kaydet"):__T("Grubu oluştur")})]})]})};

 const gl=Object.keys(gruplar).sort((a,b)=>String(gruplar[a]?.ad||"").localeCompare(String(gruplar[b]?.ad||""),"tr",{numeric:!0}));
 return e.jsxs("div",{style:S.wrap,children:[
  e.jsxs("div",{style:S.top,children:[e.jsx("a",{href:"/rhythmic",title:__T("Geri"),style:S.back,children:e.jsx("span",{className:"material-icons-round",children:"arrow_back"})}),e.jsx("div",{style:S.ico,children:e.jsx("span",{className:"material-icons-round",style:{color:"#fff"},children:"view_module"})}),
   e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:".72rem",color:"#6B7280",fontWeight:800,textTransform:"uppercase",letterSpacing:".05em"},children:__T("Ritmik")}),e.jsx("div",{style:{fontWeight:900,fontSize:"1.05rem"},children:__T("Paneller")})]})
   ]}),
  e.jsxs("div",{style:S.in,children:[
   e.jsxs("select",{style:S.sel,value:comp,onChange:t=>{setComp(t.target.value);setForm(null)},children:[e.jsx("option",{value:"",children:__T("Yarışma seçin…")}),
    Object.entries(comps).sort((a,b)=>String(b[1].t).localeCompare(String(a[1].t))).map(([k,c])=>e.jsx("option",{value:k,children:c.isim},k))]}),
   comp&&C?e.jsxs(e.Fragment,{children:[
    e.jsxs("div",{style:{...S.card,display:"flex",gap:".8rem",alignItems:"center",flexWrap:"wrap"},children:[
     e.jsx("div",{style:{flex:1,minWidth:240,fontSize:".82rem",color:"#6B7280",fontWeight:600,lineHeight:1.5},children:__T("Panel grubu oluşturun (ör. Salon 1), içinde hangi panellerin (DA, DB, A, E, T, L, SJ) olacağını ve hakem sayısını seçin. Her panelin linki/QR'ı ayrıdır. Kategori eklediğinizde/çıkardığınızda açık paneller anında güncellenir.")}),
     e.jsx("button",{style:{...S.btn,background:"linear-gradient(135deg,#db2777,#6366f1)"},onClick:()=>formAc(null),children:"+ "+__T("Yeni panel grubu")})]}),
    e.jsx(SeyirciKart,{comp,br:"ritmik",kim:_un}),
    (()=>{const o=location.origin,tk=token?"&token="+token:"",cid=encodeURIComponent(comp),L=[
      ["sports_score","#DB2777",__T("Başhakem"),o+"/rhythmic/scoring?competitionId="+cid],
      ["gavel","#DC2626",__T("İtiraz Paneli"),o+"/rhythmic/inquiry?competitionId="+cid+tk],
      ["videocam","#0EA5E9",__T("Kamera A · video kaydı (itiraz)"),o+"/rhythmic/camera?compId="+cid+"&cam=a"],
      ["videocam","#64748B",__T("Kamera B · ikinci açı (Drive)"),o+"/rhythmic/camera?compId="+cid+"&cam=b"],
      ["live_tv","#D97706",__T("Canlı Skor"),o+"/rhythmic/scoreboard?compId="+cid],
      ["cast","#E30613",__T("Yayın Overlay"),o+"/broadcast-overlay.html?comp="+cid+"&brans=ritmik"],
      ["event_note","#9333EA",__T("Çıkış Listesi"),o+"/rhythmic/schedule?comp="+cid],
      ["military_tech","#B45309",__T("Final Sonuçları"),o+"/rhythmic/finals"],];
     const ib={width:32,height:32,borderRadius:9,border:"1px solid #E5E7EB",background:"#fff",color:"#334155",display:"inline-flex",alignItems:"center",justifyContent:"center",cursor:"pointer",flexShrink:0};
     return e.jsxs("div",{style:{...S.card,borderColor:"#FCD34D",background:"linear-gradient(135deg,#FFFBEB,#fff 60%)"},children:[
      e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:".6rem",marginBottom:".8rem"},children:[e.jsx("div",{style:{width:38,height:38,borderRadius:11,background:"linear-gradient(135deg,#F59E0B,#D97706)",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0},children:e.jsx("span",{className:"material-icons-round",children:"dashboard"})}),
       e.jsxs("div",{children:[e.jsx("div",{style:{fontWeight:900,fontSize:"1rem"},children:__T("Hakem & Yönetim Ekranları")}),e.jsx("div",{style:{fontSize:".78rem",color:"#6B7280",fontWeight:600},children:__T("Seçili yarışma için tüm operasyon ekranları — yeni sekmede açılır.")})]})]}),
      e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(250px,1fr))",gap:".5rem"},children:L.map(([ic,c,t,u])=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:".45rem",border:"1px solid #E5E7EB",borderRadius:12,padding:".45rem .5rem .45rem .6rem",background:"#fff"},children:[
        e.jsx("span",{className:"material-icons-round",style:{color:c,fontSize:"1.15rem"},children:ic}),
        e.jsx("a",{href:u,target:"_blank",rel:"noreferrer",style:{flex:1,minWidth:0,fontWeight:800,fontSize:".86rem",color:"#1A1D26",textDecoration:"none",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},title:u,children:t}),
        e.jsx("button",{type:"button",style:ib,title:__T("Linki kopyala"),onClick:()=>{kopyala(u)},children:e.jsx("span",{className:"material-icons-round",style:{fontSize:"1rem"},children:"content_copy"})}),
        e.jsx("button",{type:"button",style:ib,title:__T("QR göster"),onClick:()=>qrGoster(t,u),children:e.jsx("span",{className:"material-icons-round",style:{fontSize:"1rem"},children:"qr_code_2"})}),
        e.jsx("a",{href:u,target:"_blank",rel:"noreferrer",style:{...ib,textDecoration:"none"},title:__T("Aç"),children:e.jsx("span",{className:"material-icons-round",style:{fontSize:"1rem"},children:"open_in_new"})})]},t))}),
      (()=>{const YT={kayit:!0,karar:!1,video:!1,detay:!1,...(C?.itirazYetki||{})},YL=[["kayit","post_add",__T("İtiraz kaydedebilir"),__T("Yayındaki puana DA/DB itirazı ve diğer itirazları kaydeder")],["karar","balance",__T("Karar verebilir"),__T("Kabul / red / geri çekildi ve yeni not girişi")],["video","smart_display",__T("Videoyu görebilir"),__T("Rutin kamera kaydını izler")],["detay","analytics",__T("Puan ayrıntılarını görebilir"),__T("Hakem notları, SJ, panel verisi ve kabulde puan değişimi")]];
       return e.jsxs("div",{style:{marginTop:".8rem",padding:".7rem .8rem",borderRadius:12,background:"#fff",border:"1px solid #FECACA"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:".45rem",marginBottom:".5rem"},children:[e.jsx("span",{className:"material-icons-round",style:{color:"#DC2626",fontSize:"1.1rem"},children:"gavel"}),e.jsx("b",{style:{fontSize:".88rem"},children:__T("İtiraz Paneli yetkileri")}),e.jsx("span",{style:{fontSize:".74rem",color:"#6B7280",fontWeight:600},children:__T("İtiraz hakeminin ekranında neler yapılabilsin? Kapalı olanlar yalnız başhakem ekranında yapılır.")})]}),
        e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:".6rem",flexWrap:"wrap",marginBottom:".55rem"},children:[e.jsx("b",{style:{fontSize:".82rem"},children:__T("İtiraz hakemi")}),hSec(null,"ITIRAZ")]}),
        e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(230px,1fr))",gap:".45rem"},children:YL.map(([k,ic,t,ds])=>e.jsxs("label",{style:{display:"flex",alignItems:"flex-start",gap:".5rem",padding:".5rem .6rem",borderRadius:10,cursor:"pointer",border:"1px solid "+(YT[k]?"#86EFAC":"#E5E7EB"),background:YT[k]?"#F0FDF4":"#F8FAFC"},children:[e.jsx("input",{type:"checkbox",checked:!!YT[k],disabled:busy,onChange:ev=>yaz({[`itirazYetki/${k}`]:ev.target.checked},__T("İtiraz Paneli yetkileri güncellendi")),style:{marginTop:2,width:16,height:16,accentColor:"#16A34A"}}),
         e.jsxs("span",{children:[e.jsxs("b",{style:{display:"flex",alignItems:"center",gap:".3rem",fontSize:".82rem"},children:[e.jsx("span",{className:"material-icons-round",style:{fontSize:"1rem",color:YT[k]?"#16A34A":"#94A3B8"},children:ic}),t,e.jsx("span",{style:{fontSize:".66rem",fontWeight:900,color:YT[k]?"#15803D":"#94A3B8"},children:YT[k]?__T("AÇIK"):__T("KAPALI")})]}),e.jsx("small",{style:{display:"block",fontSize:".72rem",color:"#6B7280",fontWeight:600,marginTop:2},children:ds})]})]},k))})]})})()]})})(),
    !token?e.jsx("div",{style:{...S.card,borderColor:"#f59e0b",color:"#B45309",fontWeight:700,fontSize:".84rem"},children:__T("Bu yarışmanın hakem anahtarı (epanelToken) yok; linkler anahtarsız üretilir.")}):null,
    form?formKarti():null,
    gl.length?gl.map(grupKarti):!form?e.jsx("div",{style:{...S.card,textAlign:"center",color:"#6B7280",fontWeight:700},children:__T("Henüz panel grubu yok.")}):null
   ]}):comp?e.jsx("div",{style:{color:"#6B7280",fontWeight:700},children:__T("Yükleniyor…")}):null]}),
  qr?e.jsx("div",{onClick:()=>setQr(null),style:{position:"fixed",inset:0,zIndex:50,background:"rgba(0,0,0,.7)",display:"flex",alignItems:"center",justifyContent:"center",padding:"1rem"},children:e.jsxs("div",{onClick:ev=>ev.stopPropagation(),style:{background:"#fff",color:"#0f172a",borderRadius:16,padding:"1.2rem",maxWidth:420,width:"100%",textAlign:"center"},children:[
   e.jsx("div",{style:{fontWeight:900,fontSize:"1.1rem",marginBottom:".6rem"},children:qr.baslik}),
   qr.img&&qr.img!=="yok"?e.jsx("img",{src:qr.img,alt:"QR",style:{width:"100%",maxWidth:320}}):e.jsx("div",{style:{padding:"2rem",color:"#64748b"},children:qr.img==="yok"?__T("QR oluşturulamadı; linki kopyalayın."):__T("Hazırlanıyor…")}),
   e.jsx("div",{style:{fontSize:".66rem",color:"#64748b",wordBreak:"break-all",margin:".5rem 0"},children:qr.url}),
   e.jsx("button",{style:{...S.btn,background:"#0f172a"},onClick:()=>setQr(null),children:__T("Kapat")})]})}):null]});
}
export{Paneller as default};
