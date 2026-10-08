import"./i18n-Tr01a2b3Cb2.js";import{b as usToast,a as usDisc,j as e,d as db,u as usAuth,l as logAction}from"./main-C2LpyYUGCb2.js";import{r as R}from"./vendor-react-Cxw6bqwhCb2.js";import{k as ref,o as onValue,l as get,m as update}from"./vendor-firebase-940mxgRVCb2.js";import{isIntl,bayrakUrl,ulkeAd}from"./intl-Ul01a2b3Cb2.js";import"./modulepreload-polyfill-B5Qt9EMXCb2.js";

// GÖRSEL ONAYLARI (2026-10-08) — /rhythmic/photo-approvals · /aerobic/photo-approvals · yetki "gorsel_onay" (yoksa athletes)
//  Ülke (uluslararası) / kulüp (yurtiçi) sorumlusu QR ile gymexascore.net/u/<kod> sayfasını açar, sporcularının fotoğrafını çeker / yükler.
//  Yüklenenler criteria/sporcuFotoBekleyen/<base>/<yarışma>/<id> {url,ts,ad,kat,grup,gt,kod} — burada onaylanınca
//  criteria/sporcuFoto/<base>/<yarışma>/<id> olur (Final Oluştur'dan yüklenenlerle aynı yer) ve sporcu kartı / canlı skorda hemen görünür.
//  Linkler: criteria/kisaLink/<kod> {t:"foto",b,c,g,gt,ts,kapali?,iptal?} · <yarışma>/fotoLinkleri/<grup anahtarı> = <kod>
const GS="gymexascore.net";
const kodUret=()=>{const a="abcdefghijkmnpqrstuvwxyz23456789",b=new Uint8Array(9);crypto.getRandomValues(b);return Array.from(b,x=>a[x%a.length]).join("")};
let _qr=null;const qrAl=async t=>{try{_qr=_qr||(await import("https://cdn.jsdelivr.net/npm/qrcode@1.5.4/+esm")).default;return await _qr.toDataURL(t,{margin:1,width:360})}catch{return null}};
const MI=(n,st)=>e.jsx("span",{className:"material-icons-round",style:{fontSize:18,...st},children:n});
const UP=s=>String(s||"").trim().toLocaleUpperCase("tr-TR");
const anahtar=s=>String(s||"").trim().replace(/[.#$\[\]\/]/g,"-")||"—";
const zm=t=>t?new Date(+t).toLocaleString("tr-TR",{day:"2-digit",month:"2-digit",hour:"2-digit",minute:"2-digit"}):"";

function QrResim({url,boy=92}){const[d,setD]=R.useState(null);R.useEffect(()=>{let ip=!1;setD(null);url&&qrAl(url).then(x=>{ip||setD(x)});return()=>{ip=!0}},[url]);
 return d?e.jsx("img",{src:d,alt:"QR",style:{width:boy,height:boy,borderRadius:10,background:"#fff",padding:3,border:"1px solid #E2E8F0"}}):e.jsx("div",{style:{width:boy,height:boy,borderRadius:10,background:"#F1F5F9"}})}

function FotoOnay(){
 const{toast}=usToast();const D0=usDisc()||{},BR=D0.id==="aerobik"?"aerobik":"ritmik",BASE=BR==="aerobik"?"aerobik_yarismalar":"ritmik_yarismalar",RP=D0.routePrefix||"/rhythmic";
 const{currentUser:U}=usAuth()||{},kim=U?.adSoyad||U?.kullaniciAdi||"";
 const[liste,setListe]=R.useState(null),[comp,setComp]=R.useState(()=>{try{return localStorage.getItem("gxFotoOnayComp_"+BR)||""}catch{return""}}),[C,setC]=R.useState(null),[sekme,setSekme]=R.useState("bekle");
 const[bek,setBek]=R.useState({}),[onay,setOnay]=R.useState({}),[linkler,setLinkler]=R.useState({}),[kayit,setKayit]=R.useState({}),[busy,setBusy]=R.useState("");
 const P1=BR==="aerobik"?"#10B981":"#EC4899",P2=BR==="aerobik"?"#0EA5E9":"#8B5CF6",G="linear-gradient(135deg,"+P1+","+P2+")";
 // yarışmalar (arşivdekiler hariç, kullanıcı kısıtı)
 R.useEffect(()=>{(async()=>{try{const B="https://analig-default-rtdb.firebaseio.com/"+BASE,ks=Object.keys(await(await fetch(B+".json?shallow=true")).json()||{}),yerel=/^(localhost|127\.0\.0\.1)$/.test(location.hostname);
   const L=await Promise.all(ks.filter(k=>!/^zz/.test(k)||yerel).map(async k=>{const o={_id:k};await Promise.all(["isim","baslangicTarihi","arsivli","il"].map(async a=>{try{o[a]=(await get(ref(db,BASE+"/"+k+"/"+a))).val()}catch{}}));return o}));
   const Y=U&&U.rolAdi!=="Super Admin"&&U.kullaniciAdi!=="admin"&&U.yarismalar&&typeof U.yarismalar==="object"&&Object.keys(U.yarismalar).length?U.yarismalar:null;
   setListe(L.filter(c=>c.isim&&!(c.arsivli===!0||c.arsivli==="true")&&(!Y||Y[c._id])).sort((a,b)=>String(b.baslangicTarihi||"").localeCompare(String(a.baslangicTarihi||""))))}catch{setListe([])}})()},[BASE]);
 R.useEffect(()=>{try{comp&&localStorage.setItem("gxFotoOnayComp_"+BR,comp)}catch{}setC(null);setBek({});setOnay({});setLinkler({});if(!comp)return;
  let ip=!1;Promise.all(["isim","kategoriler","sporcular","uluslararasi","tur"].map(a=>get(ref(db,`${BASE}/${comp}/${a}`)).then(s=>[a,s.val()]).catch(()=>[a,null]))).then(L=>{if(ip)return;const v=Object.fromEntries(L);setC({...v,kategoriler:v.kategoriler||{},sporcular:v.sporcular||{},_id:comp})});
  const u=[()=>{ip=!0},
   onValue(ref(db,`criteria/sporcuFotoBekleyen/${BASE}/${comp}`),s=>setBek(s.val()||{})),onValue(ref(db,`criteria/sporcuFoto/${BASE}/${comp}`),s=>setOnay(s.val()||{})),onValue(ref(db,`${BASE}/${comp}/fotoLinkleri`),s=>setLinkler(s.val()||{}))];
  return()=>u.forEach(x=>x&&x())},[comp,BASE]);
 // link kayıtlarının durumu (kapalı)
 R.useEffect(()=>{const ks=Object.values(linkler||{}).filter(Boolean);if(!ks.length){setKayit({});return}const u=ks.map(k=>onValue(ref(db,`criteria/kisaLink/${k}/kapali`),s=>setKayit(o=>({...o,[k]:!!s.val()}))));return()=>u.forEach(x=>x())},[JSON.stringify(linkler)]);
 const intl=!!C&&isIntl(C),gt=intl?"ulke":"kulup";
 // gruplar (ülke / kulüp) ve sporcuları
 const gruplar=R.useMemo(()=>{if(!C)return[];const M=new Map,gor=new Set;Object.entries(C.sporcular||{}).forEach(([k,a])=>{if(/^final_/.test(k)||!a||typeof a!=="object")return;Object.entries(a).forEach(([id,s])=>{if(!s||typeof s!=="object"||gor.has(id))return;gor.add(id);
   const g=intl?UP(s.ulke):UP(s.okul||s.kulup||s.il);if(!g)return;const o=M.get(g)||{g,ids:[]};o.ids.push(id);M.set(g,o)})});return[...M.values()].sort((a,b)=>a.g.localeCompare(b.g,"tr"))},[C,intl]);
 const spAd=id=>{for(const a of Object.values(C?.sporcular||{})){const s=a&&a[id];if(s)return[s.ad,s.soyad].filter(Boolean).join(" ")}return id};
 // ---- işlemler ----
 const onayla=async ids=>{if(!ids.length)return;setBusy("onay");try{const Up={};ids.forEach(id=>{const b=bek[id];if(!b)return;Up[`criteria/sporcuFoto/${BASE}/${comp}/${id}`]={url:b.url,ts:Date.now(),ad:b.ad||spAd(id),kaynak:b.kaynak||"link",kaynakUrl:b.kaynakUrl||null,grup:b.grup||null,onaylayan:kim||null,yuklenme:b.ts||null};Up[`criteria/sporcuFotoBekleyen/${BASE}/${comp}/${id}`]=null});
   await update(ref(db),Up);toast(ids.length+" "+__T("fotoğraf onaylandı ✓"),"success");try{logAction("photo_approve",`[${BR==="aerobik"?"Aerobik":"Ritmik"}] ${ids.length} sporcu fotoğrafı onaylandı`,{user:kim,competitionId:comp,discipline:BR,data:{ids}})}catch{}}catch(er){toast(__T("Hata oluştu."),"error")}setBusy("")};
 const reddet=async id=>{if(!await window.__gxConfirm((bek[id]?.ad||spAd(id))+"\n\n"+__T("Bu fotoğraf reddedilsin mi? Sorumlu yeniden yükleyebilir.")))return;try{await update(ref(db),{[`criteria/sporcuFotoBekleyen/${BASE}/${comp}/${id}`]:null});toast(__T("Reddedildi"),"info")}catch{toast(__T("Hata oluştu."),"error")}};
 const kaldir=async id=>{if(!await window.__gxConfirm((onay[id]?.ad||spAd(id))+"\n\n"+__T("Onaylı fotoğraf kaldırılsın mı? Kartlarda yarışma logosu görünür.")))return;try{await update(ref(db),{[`criteria/sporcuFoto/${BASE}/${comp}/${id}`]:null})}catch{toast(__T("Hata oluştu."),"error")}};
 const linkOlustur=async(gs,yenile)=>{if(yenile&&!await window.__gxConfirm(__T("Yeni link oluşturulursa eski link ve QR çalışmaz. Devam edilsin mi?")))return;setBusy("link");try{const Up={};gs.forEach(g=>{const ak=anahtar(g.g),eski=linkler[ak];if(eski&&!yenile)return;const k=kodUret();
   Up[`criteria/kisaLink/${k}`]={t:"foto",b:BR,c:comp,g:g.g,gt,ts:Date.now(),kim:kim||null};Up[`${BASE}/${comp}/fotoLinkleri/${ak}`]=k;if(eski)Up[`criteria/kisaLink/${eski}/iptal`]=!0});
   if(Object.keys(Up).length)await update(ref(db),Up);toast(__T("Linkler hazır"),"success")}catch{toast(__T("Hata oluştu."),"error")}setBusy("")};
 const linkKapat=async(k,kap)=>{try{await update(ref(db),{[`criteria/kisaLink/${k}/kapali`]:kap?!0:null})}catch{toast(__T("Hata oluştu."),"error")}};
 const urlOf=k=>"https://"+GS+"/u/"+k;
 const kopya=async u=>{try{await navigator.clipboard.writeText(u);toast(__T("Kopyalandı ✓"),"success")}catch{await window.__gxPrompt(__T("Linki kopyalayın:"),u)}};
 // tüm QR'lar tek PDF (A4, 2 × 3)
 const qrPdf=async()=>{const L0=gruplar.filter(g=>linkler[anahtar(g.g)]);if(!L0.length){toast(__T("Önce link oluşturun."),"warning");return}setBusy("pdf");
  try{const jsPDF=await import("./jspdf.es.min-gArCfqm1Cb2.js").then(z=>z.j?.jsPDF||z.E),d=new jsPDF("portrait","mm","a4");let FT="helvetica";
   try{const{R:r0,B:b0}=await import("./fontTR-Fn01a2b3Cb2.js");d.addFileToVFS("Roboto.ttf",r0);d.addFont("Roboto.ttf","Roboto","normal");d.addFileToVFS("Roboto-Bold.ttf",b0);d.addFont("Roboto-Bold.ttf","Roboto","bold");FT="Roboto"}catch{}
   const W=210,H=297,M=12,cw=(W-2*M-8)/2,ch=(H-2*M-40)/3,p1=[236,72,153],p2=[139,92,246];
   for(let i=0;i<L0.length;i++){const g=L0[i],k=linkler[anahtar(g.g)],u=urlOf(k),j=i%6;if(j===0){if(i)d.addPage();d.setFillColor(...p1);d.rect(0,0,W,3,"F");d.setFont(FT,"bold");d.setFontSize(13);d.setTextColor(15,23,42);d.text(UP(C.isim||""),M,14,{maxWidth:W-2*M});
     d.setFont(FT,"normal");d.setFontSize(9);d.setTextColor(100,116,139);d.text(intl?"ATHLETE PHOTO UPLOAD · SPORCU FOTOĞRAFI YÜKLEME":"SPORCU FOTOĞRAFI YÜKLEME",M,20)}
    const x=M+(j%2)*(cw+8),y=28+Math.floor(j/2)*(ch+4);d.setDrawColor(226,232,240);d.setLineWidth(.4);d.roundedRect(x,y,cw,ch,4,4,"S");d.setFillColor(...p2);d.roundedRect(x,y,cw,11,4,4,"F");d.rect(x,y+6,cw,5,"F");
    d.setFont(FT,"bold");d.setFontSize(12);d.setTextColor(255,255,255);d.text(g.g+(intl&&ulkeAd(g.g,"en")?" · "+ulkeAd(g.g,"en"):""),x+5,y+7.6,{maxWidth:cw-10});
    const q=await qrAl(u);if(q)d.addImage(q,"PNG",x+(cw-48)/2,y+15,48,48);d.setFont(FT,"normal");d.setFontSize(8);d.setTextColor(71,85,105);d.text(u,x+cw/2,y+68,{align:"center"});
    d.setFontSize(8.5);d.setTextColor(15,23,42);d.text(g.ids.length+(intl?" athletes · sporcu":" sporcu"),x+cw/2,y+74,{align:"center"})}
   d.save(String(C.isim||"yarisma").replace(/[^\wçğıöşüÇĞİÖŞÜ -]+/g,"").trim().replace(/\s+/g,"_").slice(0,50)+"_Foto_QR.pdf");toast(__T("PDF indirildi ✓"),"success")}catch(er){toast(__T("PDF oluşturulamadı: ")+(er?.message||er),"error")}setBusy("")};

 // ---- görünüm ----
 const S={wrap:{minHeight:"100vh",background:"#F6F7FB",color:"#0F172A",fontFamily:"Nunito,system-ui,-apple-system,sans-serif",paddingBottom:"6rem"},
  top:{position:"sticky",top:0,zIndex:10,background:"linear-gradient(90deg,"+P1+","+P2+") bottom/100% 3px no-repeat,#fff",boxShadow:"0 1px 2px rgba(15,23,42,.05)",padding:"0 1.25rem",minHeight:68,display:"flex",alignItems:"center",gap:".9rem",flexWrap:"wrap"},
  in:{maxWidth:1200,margin:"0 auto",padding:"1.1rem 1.25rem"},card:{background:"#fff",borderRadius:18,padding:"1rem 1.1rem",marginBottom:".9rem",boxShadow:"0 1px 2px rgba(15,23,42,.05),0 8px 24px -16px rgba(15,23,42,.22)"},
  btn:{padding:".55rem .9rem",border:"none",borderRadius:11,fontWeight:900,fontSize:".84rem",cursor:"pointer",color:"#fff",fontFamily:"inherit",display:"inline-flex",alignItems:"center",gap:".35rem"},
  ghost:{padding:".5rem .8rem",border:"1px solid #E2E8F0",borderRadius:11,fontWeight:800,fontSize:".8rem",cursor:"pointer",color:"#334155",background:"#fff",fontFamily:"inherit",display:"inline-flex",alignItems:"center",gap:".3rem",textDecoration:"none"},
  tab:on=>({border:0,borderRadius:10,padding:".5rem .9rem",fontFamily:"inherit",fontWeight:900,fontSize:".85rem",cursor:"pointer",background:on?"#fff":"transparent",color:on?"#0F172A":"#64748B",boxShadow:on?"0 1px 3px rgba(15,23,42,.12)":"none",display:"inline-flex",alignItems:"center",gap:".35rem"}),
  rozet:(bg,c)=>({fontSize:".68rem",fontWeight:900,padding:".12rem .45rem",borderRadius:99,background:bg,color:c})};
 const bekL=Object.entries(bek||{}).filter(([,v])=>v&&v.url).sort((a,b)=>(+b[1].ts||0)-(+a[1].ts||0)),onayL=Object.entries(onay||{}).filter(([,v])=>v&&v.url);
 const foto=(u,w,h)=>e.jsx("img",{src:u,alt:"",style:{width:w,height:h,objectFit:"cover",objectPosition:"50% 20%",borderRadius:12,display:"block",background:"#F1F5F9"}});
 const bayrak=g=>intl&&bayrakUrl(g)?e.jsx("img",{src:bayrakUrl(g),alt:"",style:{width:22,borderRadius:3,boxShadow:"0 0 0 1px #E2E8F0"}}):null;

 const icerik=!comp?e.jsx("div",{style:{...S.card,color:"#64748B",fontWeight:700},children:__T("Yarışma seçin.")}):!C?e.jsx("div",{style:{...S.card,color:"#64748B",fontWeight:700},children:__T("Yükleniyor…")}):
  sekme==="bekle"?e.jsxs("div",{children:[
   e.jsxs("div",{style:{...S.card,display:"flex",alignItems:"center",gap:".7rem",flexWrap:"wrap"},children:[e.jsx("div",{style:{flex:1,minWidth:240,fontSize:".84rem",color:"#475569",fontWeight:600},children:__T("Sorumluların yüklediği fotoğraflar burada onay bekler. Onaylanan fotoğraf sporcu kartında ve canlı skorda hemen kullanılır; mevcut fotoğrafın yerine geçer.")}),
    bekL.length?e.jsxs("button",{type:"button",style:{...S.btn,background:"#15803D",opacity:busy?.6:1},disabled:!!busy,onClick:()=>onayla(bekL.map(([id])=>id)),children:[MI("done_all"),__T("Tümünü onayla")+" ("+bekL.length+")"]}):null]}),
   !bekL.length?e.jsx("div",{style:{...S.card,color:"#64748B",fontWeight:700,textAlign:"center",padding:"2rem"},children:"✓ "+__T("Onay bekleyen fotoğraf yok")}):
   e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(250px,1fr))",gap:".8rem"},children:bekL.map(([id,v])=>e.jsxs("div",{style:{...S.card,marginBottom:0,display:"flex",flexDirection:"column",gap:".6rem"},children:[
    e.jsxs("div",{style:{display:"flex",gap:".6rem",alignItems:"flex-end"},children:[foto(v.url,140,175),onay[id]?.url?e.jsxs("div",{style:{textAlign:"center"},children:[foto(onay[id].url,70,88),e.jsx("div",{style:{fontSize:".64rem",color:"#64748B",fontWeight:800,marginTop:3},children:__T("mevcut")})]}):null]}),
    e.jsxs("div",{children:[e.jsx("b",{style:{fontSize:".95rem"},children:v.ad||spAd(id)}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:".35rem",fontSize:".76rem",color:"#64748B",fontWeight:700,marginTop:2,flexWrap:"wrap"},children:[bayrak(v.grup),v.grup||"",v.kat?"· "+v.kat:"",e.jsx("span",{style:{marginLeft:"auto"},children:zm(v.ts)})]})]}),
    e.jsxs("div",{style:{display:"flex",gap:".4rem"},children:[e.jsxs("button",{type:"button",style:{...S.btn,background:"#15803D",flex:1,justifyContent:"center"},disabled:!!busy,onClick:()=>onayla([id]),children:[MI("check"),__T("Onayla")]}),
     e.jsxs("button",{type:"button",style:{...S.ghost,color:"#B91C1C",borderColor:"#FECACA"},onClick:()=>reddet(id),children:[MI("close"),__T("Reddet")]})]})]},id))})]})
  :sekme==="link"?e.jsxs("div",{children:[
   e.jsxs("div",{style:{...S.card,display:"flex",alignItems:"center",gap:".6rem",flexWrap:"wrap"},children:[e.jsx("div",{style:{flex:1,minWidth:260,fontSize:".84rem",color:"#475569",fontWeight:600},children:(intl?__T("Her ülke sorumlusuna kendi QR'ını verin."):__T("Her kulüp sorumlusuna kendi QR'ını verin."))+" "+__T("QR okutulunca o grubun sporcuları listelenir; fotoğraf çekip ya da yükleyip gönderirler. Fotoğraflar sizin onayınızdan sonra kullanılır.")+" ("+GS+")"}),
    e.jsxs("button",{type:"button",style:{...S.btn,background:G,opacity:busy?.6:1},disabled:!!busy,onClick:()=>linkOlustur(gruplar,!1),children:[MI("qr_code_2"),__T("Eksik linkleri oluştur")]}),
    e.jsxs("button",{type:"button",style:S.ghost,disabled:!!busy,onClick:qrPdf,children:[MI("picture_as_pdf",{color:"#DC2626"}),__T("Tüm QR'lar (PDF)")]})]}),
   e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(340px,1fr))",gap:".8rem"},children:gruplar.map(g=>{const ak=anahtar(g.g),k=linkler[ak],kap=k&&kayit[k],nOk=g.ids.filter(id=>onay[id]).length,nBk=g.ids.filter(id=>bek[id]).length;
    return e.jsxs("div",{style:{...S.card,marginBottom:0,display:"flex",gap:".8rem",alignItems:"center",opacity:kap?.65:1},children:[k&&!kap?e.jsx(QrResim,{url:urlOf(k)}):e.jsx("div",{style:{width:92,height:92,borderRadius:10,background:"#F8FAFC",border:"1px dashed #CBD5E1",display:"grid",placeItems:"center",color:"#94A3B8"},children:MI(kap?"pause_circle":"qr_code_2",{fontSize:30})}),
     e.jsxs("div",{style:{flex:1,minWidth:0},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:".4rem",fontWeight:900},children:[bayrak(g.g),g.g,intl&&ulkeAd(g.g,"tr")?e.jsx("span",{style:{fontWeight:700,color:"#64748B",fontSize:".8rem"},children:ulkeAd(g.g,"tr")}):null]}),
      e.jsxs("div",{style:{fontSize:".75rem",color:"#64748B",fontWeight:700,margin:".2rem 0 .35rem"},children:[g.ids.length+" "+__T("sporcu")+" · ",e.jsx("span",{style:{color:"#15803D"},children:nOk+" "+__T("onaylı")}),nBk?e.jsx("span",{style:{color:"#B45309"},children:" · "+nBk+" "+__T("bekliyor")}):null]}),
      e.jsx("div",{style:{height:6,borderRadius:6,background:"#F1F5F9",overflow:"hidden",marginBottom:".45rem"},children:e.jsx("div",{style:{height:6,width:(g.ids.length?Math.round(nOk/g.ids.length*100):0)+"%",background:G}})}),
      k?e.jsxs("div",{style:{display:"flex",gap:".3rem",flexWrap:"wrap"},children:[e.jsx("button",{type:"button",style:{...S.ghost,padding:".3rem .5rem"},title:__T("Kopyala"),onClick:()=>kopya(urlOf(k)),children:MI("content_copy",{fontSize:16})}),e.jsx("a",{href:urlOf(k),target:"_blank",rel:"noopener noreferrer",style:{...S.ghost,padding:".3rem .5rem"},title:__T("Aç"),children:MI("open_in_new",{fontSize:16})}),
        e.jsx("button",{type:"button",style:{...S.ghost,padding:".3rem .5rem"},title:kap?__T("Yüklemeyi aç"):__T("Yüklemeyi kapat"),onClick:()=>linkKapat(k,!kap),children:MI(kap?"play_arrow":"pause",{fontSize:16})}),e.jsx("button",{type:"button",style:{...S.ghost,padding:".3rem .5rem"},title:__T("Yeni link"),onClick:()=>linkOlustur([g],!0),children:MI("autorenew",{fontSize:16})})]})
       :e.jsxs("button",{type:"button",style:{...S.btn,background:G,padding:".35rem .7rem",fontSize:".78rem"},onClick:()=>linkOlustur([g],!1),children:[MI("add_link",{fontSize:16}),__T("Link oluştur")]})]})]},ak)})})]})
  :e.jsx("div",{children:!onayL.length?e.jsx("div",{style:{...S.card,color:"#64748B",fontWeight:700,textAlign:"center",padding:"2rem"},children:__T("Onaylı fotoğraf yok")}):
   e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(150px,1fr))",gap:".7rem"},children:onayL.map(([id,v])=>e.jsxs("div",{style:{...S.card,marginBottom:0,padding:".6rem",textAlign:"center"},children:[foto(v.url,"100%",160),e.jsx("div",{style:{fontWeight:800,fontSize:".8rem",marginTop:".4rem",lineHeight:1.2},children:v.ad||spAd(id)}),
    e.jsx("div",{style:{fontSize:".66rem",color:"#94A3B8",fontWeight:700},children:(v.kaynak==="link"?__T("sorumlu"):__T("yönetici"))+" · "+zm(v.ts)}),e.jsxs("button",{type:"button",style:{...S.ghost,padding:".25rem .5rem",fontSize:".72rem",marginTop:".35rem",color:"#B91C1C"},onClick:()=>kaldir(id),children:[MI("delete",{fontSize:15}),__T("Kaldır")]})]},id))})});

 return e.jsxs("div",{style:S.wrap,children:[
  e.jsxs("div",{style:S.top,children:[e.jsx("button",{type:"button",title:__T("Geri"),style:{width:38,height:38,borderRadius:12,border:"1px solid #E2E8F0",background:"#fff",cursor:"pointer",display:"grid",placeItems:"center"},onClick:()=>{window.history.length>1?history.back():location.assign(RP)},children:MI("arrow_back",{fontSize:20})}),
   e.jsx("div",{style:{width:44,height:44,borderRadius:14,display:"grid",placeItems:"center",background:G},children:MI("add_a_photo",{color:"#fff",fontSize:22})}),
   e.jsxs("div",{style:{flex:1,minWidth:200},children:[e.jsx("div",{style:{fontWeight:900,fontSize:"1.1rem"},children:__T("Görsel Onayları")}),e.jsx("div",{style:{fontSize:".78rem",color:"#64748B",fontWeight:700},children:__T("Sporcu fotoğrafları · ülke / kulüp sorumlusu yükler, siz onaylarsınız")})]}),
   e.jsxs("select",{value:comp,onChange:ev=>setComp(ev.target.value),style:{padding:".55rem .7rem",borderRadius:11,border:"1px solid #E2E8F0",fontFamily:"inherit",fontWeight:800,maxWidth:360},children:[e.jsx("option",{value:"",children:__T("— Yarışma seçin —")}),...(liste||[]).map(c=>e.jsx("option",{value:c._id,children:c.isim},c._id))]})]}),
  e.jsxs("div",{style:S.in,children:[comp&&C?e.jsxs("div",{style:{display:"inline-flex",background:"#E9EDF3",borderRadius:12,padding:3,gap:3,marginBottom:".9rem"},children:[
    e.jsxs("button",{type:"button",style:S.tab(sekme==="bekle"),onClick:()=>setSekme("bekle"),children:[MI("pending_actions",{fontSize:17}),__T("Onay bekleyenler"),bekL.length?e.jsx("span",{style:S.rozet("#FEF3C7","#B45309"),children:bekL.length}):null]}),
    e.jsxs("button",{type:"button",style:S.tab(sekme==="link"),onClick:()=>setSekme("link"),children:[MI("qr_code_2",{fontSize:17}),__T("Yükleme linkleri")]}),
    e.jsxs("button",{type:"button",style:S.tab(sekme==="onay"),onClick:()=>setSekme("onay"),children:[MI("verified",{fontSize:17}),__T("Onaylı fotoğraflar"),e.jsx("span",{style:S.rozet("#DCFCE7","#15803D"),children:onayL.length})]})]}):null,icerik]})]})}
export{FotoOnay as default};
