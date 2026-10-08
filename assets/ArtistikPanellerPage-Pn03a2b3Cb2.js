import"./i18n-Tr01a2b3Cb2.js";import{u as useAuth,b as usToast,j as e,d as db,l as logAction}from"./main-C2LpyYUGCb2.js";import{u as useNav,r as R}from"./vendor-react-Cxw6bqwhCb2.js";import{k as ref,o as onValue,m as update}from"./vendor-firebase-940mxgRVCb2.js";import{f as filterComps}from"./useFilteredCompetitions-B7FB6qIvCb2.js";import{GXP_CSS,aletSirala}from"./ArtistikNotSilmePage-Ns01a2b3Cb2.js";import{artImg,artAd}from"./ritmikAlet-Ra01a2b3Cb2.js";import{g as yeniToken}from"./epanelToken-BoF3UjP2Cb2.js";import"./modulepreload-polyfill-B5Qt9EMXCb2.js";

// ARTİSTİK — PANELLER (2026-10-09, /artistic/panels · pageKey "paneller")
//  1. bölüm: ÜST JÜRİ — competitions/<y>/ustJuriAyar {acik, mod:"tek"|"alet", token, ts, kim}
//   acik: başhakem notu Üst Jüri onayına gider (ScoringPage) · mod: tüm aletler için tek ekran ya da her alete ayrı ekran (link)
//   Link: /artistic/superior-jury?competitionId=&token=[&catId=&aletId=] — "Linkleri yenile" eski linkleri geçersiz kılar.
//  Ritmik Paneller'in diğer bölümleri (hakem atama, koltuklar…) artistiğe sonraki adımda taşınacak.
const FB="competitions";
let _qr=null;const qrAl=async t=>{try{_qr=_qr||(await import("https://cdn.jsdelivr.net/npm/qrcode@1.5.4/+esm")).default;return await _qr.toDataURL(t,{margin:1,width:300})}catch{return null}};
const MI=(n,st)=>e.jsx("i",{className:"material-icons-round",style:{fontSize:18,verticalAlign:"-4px",...st},children:n});
const CSS=GXP_CSS+`
.pn-uj{border:2px solid #FECACA}.pn-h{display:flex;align-items:center;gap:10px;margin-bottom:12px}.pn-h h2{margin:0;font-size:1.05rem;font-weight:900}.pn-h .ic{width:38px;height:38px;border-radius:12px;display:grid;place-items:center;background:#DC2626;color:#fff}
.pn-sw{display:flex;align-items:center;gap:14px;padding:14px;border-radius:14px;border:1.5px solid #E2E8F0;background:#F8FAFC;cursor:pointer;user-select:none}.pn-sw.on{border-color:#F59E0B;background:#FFFBEB}
.pn-tg{width:54px;height:30px;border-radius:999px;background:#CBD5E1;position:relative;flex-shrink:0;transition:background .2s}.pn-tg::after{content:"";position:absolute;top:3px;left:3px;width:24px;height:24px;border-radius:50%;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,.25);transition:left .2s}.pn-sw.on .pn-tg{background:#F59E0B}.pn-sw.on .pn-tg::after{left:27px}
.pn-sw b{display:block;font-size:.98rem}.pn-sw span{display:block;font-size:.8rem;color:#64748B;font-weight:600;margin-top:2px;line-height:1.4}
.pn-mods{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:12px 0}@media(max-width:640px){.pn-mods{grid-template-columns:1fr}}
.pn-mod{border:1.5px solid #E2E8F0;border-radius:14px;padding:12px;cursor:pointer;background:#fff;text-align:left;font:inherit}.pn-mod.on{border-color:#DC2626;background:#FEF2F2;box-shadow:0 0 0 3px #FEE2E2}.pn-mod b{display:flex;align-items:center;gap:6px;font-size:.92rem}.pn-mod span{display:block;font-size:.78rem;color:#64748B;font-weight:600;margin-top:4px}
.pn-links{display:grid;gap:8px}.pn-l{display:flex;align-items:center;gap:10px;flex-wrap:wrap;padding:10px 12px;border:1px solid #EEF0F4;border-radius:12px;background:#fff}
.pn-l img.s{width:34px;height:34px;object-fit:contain}.pn-l .t{flex:1 1 200px;min-width:0}.pn-l .t b{display:block;font-size:.9rem}.pn-l .t code{display:block;font-size:.72rem;color:#6D28D9;word-break:break-all}
.pn-b{display:inline-flex;align-items:center;gap:5px;border:1px solid #E2E8F0;background:#fff;border-radius:10px;padding:7px 10px;font:inherit;font-weight:800;font-size:.8rem;cursor:pointer;color:#0F172A;text-decoration:none}.pn-b:hover{background:#F8FAFC}
.pn-kat{font-size:.78rem;font-weight:900;letter-spacing:.06em;color:#64748B;text-transform:uppercase;margin:12px 2px 4px}
.pn-qr{position:fixed;inset:0;background:rgba(15,23,42,.6);display:grid;place-items:center;z-index:100}.pn-qr div{background:#fff;border-radius:18px;padding:18px;text-align:center;max-width:340px}.pn-qr img{width:280px;height:280px}
.pn-not{font-size:.8rem;color:#475569;font-weight:600;line-height:1.5;background:#F8FAFC;border-radius:12px;padding:10px 12px;margin-top:12px}`;

function UstJuriKart({comp,C,kim}){
 const{toast}=usToast(),A=C&&C.ustJuriAyar||{},acik=!!A.acik,mod=A.mod==="alet"?"alet":"tek",[qr,setQr]=R.useState(null),[ok,setOk]=R.useState("");
 const yaz=async(U,log)=>{try{await update(ref(db,`${FB}/${comp}/ustJuriAyar`),{...U,ts:Date.now(),kim});log&&logAction("ust_juri_ayar",log,{user:kim,competitionId:comp})}catch(er){toast(__T("Kaydedilemedi")+": "+(er?.message||er),"error")}};
 // token yoksa oluştur
 // yalnız ustJuriAyar okunduktan sonra (yüklenmeden üretirse her açılışta dağıtılmış linkler bozulur)
 R.useEffect(()=>{if(comp&&C&&"ustJuriAyar"in C&&!A.token)update(ref(db,`${FB}/${comp}/ustJuriAyar`),{token:yeniToken()}).catch(()=>{})},[comp,C&&"ustJuriAyar"in C,A.token]);
 const kats=Object.entries(C&&C.kategoriler||{}).filter(([k,v])=>v&&!/^final_/.test(k)).sort((a,b)=>String(a[1].name||a[0]).localeCompare(String(b[1].name||b[0]),"tr")),fins=Object.entries(C&&C.kategoriler||{}).filter(([k])=>/^final_/.test(k));
 const url=(k,a)=>`${location.origin}/artistic/superior-jury?competitionId=${encodeURIComponent(comp)}&token=${A.token||""}${k?"&catId="+encodeURIComponent(k):""}${a?"&aletId="+encodeURIComponent(a):""}`;
 const kopya=async u=>{try{await navigator.clipboard.writeText(u);setOk(u);setTimeout(()=>setOk(""),1600)}catch{await window.__gxPrompt(__T("Linki kopyalayın:"),u)}};
 const qrGoster=async(u,t)=>{const d=await qrAl(u);d?setQr({d,t}):kopya(u)};
 const satir=(t,u,img)=>e.jsxs("div",{className:"pn-l",children:[img?e.jsx("img",{className:"s",src:img,alt:""}):MI("gavel",{fontSize:26,color:"#DC2626"}),e.jsxs("div",{className:"t",children:[e.jsx("b",{children:t}),e.jsx("code",{children:u})]}),
  e.jsxs("button",{type:"button",className:"pn-b",onClick:()=>kopya(u),children:[MI(ok===u?"check":"content_copy",{fontSize:16}),ok===u?__T("Kopyalandı"):__T("Kopyala")]}),e.jsxs("button",{type:"button",className:"pn-b",onClick:()=>qrGoster(u,t),children:[MI("qr_code_2",{fontSize:16}),"QR"]}),e.jsxs("a",{className:"pn-b",href:u,target:"_blank",rel:"noopener noreferrer",children:[MI("open_in_new",{fontSize:16}),__T("Aç")]})]},u);
 const yenile=async()=>{if(!await window.__gxConfirm(__T("Üst Jüri linkleri yenilensin mi? Dağıtılmış eski linkler çalışmaz.")))return;yaz({token:yeniToken()},"Üst Jüri linkleri yenilendi")};
 return e.jsxs("div",{className:"gxp-card pn-uj",style:{marginBottom:14},children:[
  e.jsxs("div",{className:"pn-h",children:[e.jsx("span",{className:"ic",children:MI("gavel",{fontSize:22,verticalAlign:0})}),e.jsx("h2",{children:__T("Üst Jüri")}),e.jsx("span",{style:{marginLeft:"auto"}}),e.jsxs("a",{className:"pn-b",href:"/artistic/superior-jury",target:"_blank",rel:"noopener noreferrer",children:[MI("visibility",{fontSize:16}),__T("Üst Jüri ekranı (Süper Admin)")]})]}),
  e.jsxs("div",{className:"pn-sw"+(acik?" on":""),role:"switch","aria-checked":acik,onClick:async()=>{if(acik&&!await window.__gxConfirm(__T("Üst Jüri onayı kapatılsın mı? Onay bekleyen notlar varsa Üst Jüri ekranından sonuçlandırılmalı.")))return;yaz({acik:!acik},acik?"Üst Jüri onayı kapatıldı":"Üst Jüri onayı açıldı")},children:[e.jsx("span",{className:"pn-tg"}),e.jsxs("div",{children:[e.jsx("b",{children:acik?__T("Üst Jüri onayı AÇIK"):__T("Üst Jüri onayı KAPALI")}),
   e.jsx("span",{children:acik?__T("Başhakemin kaydettiği not alet bazında Üst Jüri'ye gider. Onaylanınca yayınlanır; geri gönderilirse başhakem düzeltir. Onay bekleyen ya da geri gönderilen not varken o alette sıradaki sporcu çağrılamaz."):__T("Başhakem notu kendisi onaylar ve yayınlar. Üst Jüri ekranından canlı izlenir; Üst Jüri MÜDAHALE ET derse o alette kayıt ve çağrı durur.")})]})]}),
  e.jsxs("div",{className:"pn-mods",children:[["tek","dashboard",__T("Tek Üst Jüri ekranı"),__T("Tüm aletler tek ekranda yan yana; kategori ekrandan seçilir.")],["alet","view_week",__T("Alet bazında ayrı ekranlar"),__T("Her alet için ayrı link; her alete ayrı Üst Jüri üyesi bakar.")]].map(([k,ic,t,d])=>e.jsxs("button",{type:"button",className:"pn-mod"+(mod===k?" on":""),onClick:()=>mod!==k&&yaz({mod:k},"Üst Jüri ekran düzeni: "+(k==="alet"?"alet bazında":"tek ekran")),children:[e.jsxs("b",{children:[MI(ic,{fontSize:18,color:mod===k?"#DC2626":"#64748B"}),t]}),e.jsx("span",{children:d})]},k))}),
  !A.token?e.jsx("div",{className:"pn-not",children:__T("Link hazırlanıyor…")}):mod==="tek"?e.jsx("div",{className:"pn-links",children:satir(__T("Üst Jüri — tüm aletler"),url())}):
  e.jsx("div",{children:[...kats,...fins].map(([k,v])=>{const al=aletSirala(v.aletler||[]);return al.length?e.jsxs("div",{children:[e.jsx("div",{className:"pn-kat",children:String(v.name||v.ad||k).replace(/^\s*🏆\s*/u,"")}),e.jsx("div",{className:"pn-links",children:al.map(a=>satir(`${__T("Üst Jüri")} — ${artAd(a,!1,k)||a}`,url(k,a),artImg(a,k)))})]},k):null})}),
  e.jsxs("div",{style:{display:"flex",gap:8,marginTop:12,flexWrap:"wrap"},children:[e.jsxs("button",{type:"button",className:"pn-b",onClick:yenile,children:[MI("autorenew",{fontSize:16}),__T("Linkleri yenile")]})]}),
  e.jsx("div",{className:"pn-not",children:__T("Linki açan kişi giriş yapmadan Üst Jüri ekranını görür; linki yalnız Üst Jüri üyeleriyle paylaşın. Onay modu açıkken başhakem ekranında onay bekleyen / geri gönderilen notlar şerit olarak görünür.")}),
  qr?e.jsx("div",{className:"pn-qr",onClick:()=>setQr(null),children:e.jsxs("div",{children:[e.jsx("img",{src:qr.d,alt:"QR"}),e.jsx("b",{style:{display:"block",marginTop:8},children:qr.t}),e.jsx("span",{style:{fontSize:".8rem",color:"#64748B"},children:__T("Kapatmak için dokunun")})]})}):null]})}

export default function ArtistikPaneller(){
 const nav=useNav(),{currentUser:user}=useAuth()||{},kim=user?.adSoyad||user?.kullaniciAdi||"";
 const[comps,setComps]=R.useState({}),[comp,setComp]=R.useState(()=>{try{return localStorage.getItem("gxArPanComp")||""}catch{return""}}),[C,setC]=R.useState(null);
 R.useEffect(()=>onValue(ref(db,FB),s=>setComps(filterComps(s.val()||{},user)||{}),{onlyOnce:!0}),[user]);
 R.useEffect(()=>{try{localStorage.setItem("gxArPanComp",comp)}catch{}setC(null);if(!comp)return;const st={},u=["isim","kategoriler","ustJuriAyar"].map(k=>onValue(ref(db,`${FB}/${comp}/${k}`),s=>{st[k]=s.val();setC({...st})}));return()=>u.forEach(f=>f())},[comp]);
 const compList=R.useMemo(()=>Object.entries(comps).filter(([,c])=>c&&c.isim&&c.arsivli!==!0).sort((a,b)=>String(b[1].baslangicTarihi||"").localeCompare(String(a[1].baslangicTarihi||""))),[comps]);
 return e.jsxs("div",{className:"gxp",style:{"--gxp-c":"#DB2777"},children:[e.jsx("style",{children:CSS}),
  e.jsxs("div",{className:"gxp-hdr",children:[e.jsx("button",{type:"button",className:"gxp-back",onClick:()=>nav("/artistic"),title:__T("Geri"),children:MI("arrow_back",{fontSize:22,verticalAlign:0})}),e.jsx("div",{className:"gxp-ic",children:MI("view_module",{fontSize:26,verticalAlign:0})}),e.jsxs("div",{className:"gxp-tt",children:[e.jsx("h1",{children:__T("Paneller")}),e.jsx("p",{children:__T("Üst Jüri onayı, ekran düzeni ve linkler")})]}),
   e.jsx("div",{className:"gxp-sel",children:e.jsxs("select",{value:comp,onChange:ev=>setComp(ev.target.value),children:[e.jsx("option",{value:"",children:__T("— Yarışma seçin —")}),compList.map(([id,c])=>e.jsx("option",{value:id,children:c.isim},id))]})})]}),
  !comp?e.jsx("div",{className:"gxp-card",children:e.jsxs("div",{className:"gxp-empty",children:[MI("sports_gymnastics",{fontSize:46,display:"block",color:"#CBD5E1",margin:"0 auto 8px"}),__T("Yarışma seçin")]})}):!C||!("ustJuriAyar"in C&&"kategoriler"in C)?e.jsx("div",{className:"gxp-card",children:e.jsx("div",{className:"gxp-empty",children:__T("Yükleniyor…")})}):
  e.jsx(UstJuriKart,{comp,C,kim})]})}
