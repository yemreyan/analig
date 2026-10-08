import{j as e,d as db}from"./main-C2LpyYUGCb2.js";import{r as R}from"./vendor-react-Cxw6bqwhCb2.js";import{k as ref,o as onValue,m as update,l as fbGet}from"./vendor-firebase-940mxgRVCb2.js";
// BAĞIMSIZ SEYİRCİ SİTESİ KARTI (2026-10-08, Paneller sayfası) — GS_HOST/<kod>, ayrı Vercel projesi (~/Desktop/gymexa-izle).
// criteria/kisaLink/<kod> = {t:"izle", b, c, ts, kapali? (durduruldu), iptal? (yenilendi)} · <yarışma>/kisaLinkler/izle = <kod>
// (Önceden QR ve Linkler sayfasındaydı — LinksPage GsKart; o kart kodda duruyor.)
export const GS_HOST="gymexascore.net";
const kodUret=()=>{const a="abcdefghijkmnpqrstuvwxyz23456789",b=new Uint8Array(9);crypto.getRandomValues(b);return Array.from(b,x=>a[x%a.length]).join("")};
let _qr=null;const qrAl=async t=>{try{_qr=_qr||(await import("https://cdn.jsdelivr.net/npm/qrcode@1.5.4/+esm")).default;return await _qr.toDataURL(t,{margin:1,width:360})}catch{return null}};
const MI=(n,st)=>e.jsx("span",{className:"material-icons-round",style:{fontSize:16,...st},children:n});
// İZLEYİCİ SAYACI (2026-10-09): criteria/seyirciIstat/<br>_<comp> — gymexa-izle api/v.js yazar (a/<oturum>=son sinyal, o/<oturum>, g/<gün>/{giris,tekil,saat,tepe})
// Kart 15 sn'de bir okur: son 75 sn'de sinyal veren = şu an izleyen; 3 dk'dan eski a/ kayıtları siler; günün tepe değerini günceller. Ayrıntı: Raporlar › Seyirci İstatistikleri.
export const IST_YOL=(br,comp)=>`criteria/seyirciIstat/${br}_${comp}`;
export const trGun=(t=Date.now())=>new Date(t+108e5).toISOString().slice(0,10);
function IzleyiciSayac({br,comp}){
 const[st,setSt]=R.useState(null);
 R.useEffect(()=>{let bit=!1,zam=null;const yol=IST_YOL(br,comp);
  const oku=async()=>{try{const now=Date.now(),gun=trGun(now);const[aS,gS]=await Promise.all([fbGet(ref(db,yol+"/a")),fbGet(ref(db,yol+"/g/"+gun))]);if(bit)return;
   const A=aS.val()||{},G=gS.val()||{};let n=0;const sil={};Object.entries(A).forEach(([k,t])=>{if(now-(+t||0)<75e3)n++;else if(now-(+t||0)>18e4)sil[yol+"/a/"+k]=null});
   if(n>(+G.tepe||0)){sil[yol+"/g/"+gun+"/tepe"]=n;sil[yol+"/g/"+gun+"/tepeTs"]=now;G.tepe=n;G.tepeTs=now}
   if(Object.keys(sil).length)update(ref(db),sil).catch(()=>{});
   setSt({n,G,ts:now})}catch{}finally{bit||(zam=setTimeout(oku,15e3))}};
  oku();return()=>{bit=!0;clearTimeout(zam)}},[br,comp]);
 const sat=st&&st.G.saat||{},mx=Math.max(1,...Object.values(sat).map(x=>+x||0)),simdi=+new Date(Date.now()+108e5).toISOString().slice(11,13);
 const kut=(ik,et,v,alt,vurgu)=>e.jsxs("div",{style:{flex:"1 1 110px",minWidth:0,padding:"8px 10px",borderRadius:12,background:vurgu?"rgba(34,197,94,.18)":"rgba(255,255,255,.08)",border:"1px solid "+(vurgu?"rgba(134,239,172,.5)":"rgba(255,255,255,.15)")},children:[
  e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:5,fontSize:10.5,fontWeight:900,letterSpacing:".06em",textTransform:"uppercase",color:vurgu?"#BBF7D0":"#E9D5FF"},children:[MI(ik,{fontSize:14}),et]}),
  e.jsx("div",{style:{fontSize:24,fontWeight:900,lineHeight:1.15,marginTop:2,fontVariantNumeric:"tabular-nums"},children:v}),
  alt?e.jsx("div",{style:{fontSize:10.5,color:"#E9D5FF",fontWeight:700},children:alt}):null]});
 const saatYaz=t=>t?new Date(t+108e5).toISOString().slice(11,16):"";
 return e.jsxs("div",{style:{marginTop:10,padding:"10px 12px",borderRadius:12,background:"rgba(0,0,0,.18)",border:"1px solid rgba(255,255,255,.15)"},children:[
  e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:6,fontSize:12,fontWeight:900,letterSpacing:".06em",textTransform:"uppercase",color:"#C4B5FD",marginBottom:8},children:[MI("monitoring",{fontSize:16}),__T("İzleyici sayacı"),e.jsx("span",{style:{marginLeft:"auto",fontSize:10.5,color:"#E9D5FF",letterSpacing:0,textTransform:"none",fontWeight:700},children:st?__T("Bugün")+" · "+__T("15 sn'de bir yenilenir"):__T("Yükleniyor…")})]}),
  e.jsxs("div",{style:{display:"flex",gap:8,flexWrap:"wrap"},children:[
   kut("sensors",__T("Şu an izleyen"),st?st.n:"–",__T("son 75 sn içinde açık sayfa"),!0),
   kut("login",__T("Giriş"),st?(+st.G.giris||0):"–",__T("bugünkü oturum")),
   kut("person",__T("Tekil ziyaretçi"),st?(+st.G.tekil||0):"–",__T("bugün, cihaz bazında")),
   kut("trending_up",__T("En yüksek"),st?(+st.G.tepe||0):"–",st&&st.G.tepeTs?__T("aynı anda")+" · "+saatYaz(st.G.tepeTs):__T("aynı anda"))]}),
  e.jsx("div",{title:__T("Saatlik giriş (bugün)"),style:{display:"flex",alignItems:"flex-end",gap:2,height:34,marginTop:8},children:Array.from({length:24},(_,h)=>{const v=+sat[String(h).padStart(2,"0")]||0;return e.jsx("div",{title:String(h).padStart(2,"0")+":00 — "+v,style:{flex:1,height:Math.max(2,Math.round(v/mx*34)),borderRadius:2,background:h===simdi?"#86EFAC":v?"#C4B5FD":"rgba(255,255,255,.15)"}})})}),
  e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontSize:9.5,color:"#C4B5FD",fontWeight:700,marginTop:2},children:[e.jsx("span",{children:"00"}),e.jsx("span",{children:"06"}),e.jsx("span",{children:"12"}),e.jsx("span",{children:"18"}),e.jsx("span",{children:"23"})]}),
  e.jsx("div",{style:{fontSize:10.5,color:"#E9D5FF",fontWeight:600,marginTop:6},children:__T("Tüm günler, ülke ve cihaz dağılımı, izleme süreleri: Raporlar › Seyirci İstatistikleri. Saatler Türkiye saatidir.")})]})}
export function SeyirciKart({comp,br,kim}){
 const FBb=br==="ritmik"?"ritmik_yarismalar":br==="aerobik"?"aerobik_yarismalar":null;
 const[kod,setKod]=R.useState(null),[kap,setKap]=R.useState(!1),[ok,setOk]=R.useState(""),[qr,setQr]=R.useState(null);
 R.useEffect(()=>{setKod(null);if(!FBb||!comp)return;return onValue(ref(db,`${FBb}/${comp}/kisaLinkler/izle`),s=>setKod(s.val()||null))},[FBb,comp]);
 R.useEffect(()=>{setKap(!1);if(!kod)return;return onValue(ref(db,`criteria/kisaLink/${kod}/kapali`),s=>setKap(!!s.val()))},[kod]);
 // canlı yayın linki (YouTube) — seyirci sayfasında "Canlı yayını izle" düğmesi: <yarışma>/seyirciYayin {url, ts}
 const[yy,setYy]=R.useState(null),[yyG,setYyG]=R.useState("");
 R.useEffect(()=>{setYy(null);if(!FBb||!comp)return;return onValue(ref(db,`${FBb}/${comp}/seyirciYayin`),s=>{const v=s.val();setYy(v);setYyG(v&&v.url||"")})},[FBb,comp]);
 const ytOk=u=>/^https?:\/\/([a-z0-9-]+\.)?(youtube\.com|youtu\.be)\//i.test(String(u||"").trim());
 const yyKaydet=async()=>{const u=yyG.trim();if(u&&!ytOk(u)){await window.__gxConfirm(__T("Yalnız YouTube linki eklenebilir (youtube.com ya da youtu.be)."));return}await yaz({[`${FBb}/${comp}/seyirciYayin`]:u?{url:u,ts:Date.now(),kim:kim||null}:null})};
 const url=kod?"https://"+GS_HOST+"/"+kod:"";
 R.useEffect(()=>{let ip=!1;setQr(null);url&&qrAl(url).then(d=>{ip||setQr(d)});return()=>{ip=!0}},[url]);
 if(!FBb||!comp)return null;
 const yaz=async U=>{try{await update(ref(db),U)}catch{await window.__gxConfirm(__T("Kaydedilemedi."))}};
 const olustur=async()=>{if(kod&&!await window.__gxConfirm(__T("Yeni seyirci linki oluşturulursa paylaşılmış eski link ve QR kodu çalışmaz. Devam edilsin mi?")))return;
  const k=kodUret(),U={[`criteria/kisaLink/${k}`]:{t:"izle",b:br,c:comp,ts:Date.now(),kim:kim||null},[`${FBb}/${comp}/kisaLinkler/izle`]:k};if(kod)U[`criteria/kisaLink/${kod}/iptal`]=!0;await yaz(U)};
 const kopya=async()=>{try{await navigator.clipboard.writeText(url);setOk("✓")}catch{await window.__gxPrompt(__T("Linki kopyalayın:"),url)}setTimeout(()=>setOk(""),2e3)};
 const bt={display:"inline-flex",alignItems:"center",gap:6,borderRadius:10,padding:"8px 12px",fontWeight:800,fontSize:13,cursor:"pointer",border:"1.5px solid #F9A8D4",background:"#fff",color:"#9D174D",textDecoration:"none",fontFamily:"inherit"};
 return e.jsxs("div",{style:{display:"flex",gap:16,alignItems:"center",flexWrap:"wrap",borderRadius:18,padding:16,margin:"0 0 16px",color:"#fff",background:"linear-gradient(135deg,#1E1B4B,#4C1D95 55%,#9D174D)",boxShadow:"0 10px 30px -18px rgba(76,29,149,.8)"},children:[
  kod&&!kap&&qr?e.jsx("img",{src:qr,alt:"QR",style:{width:118,height:118,borderRadius:12,background:"#fff",padding:5,flexShrink:0}}):null,
  e.jsxs("div",{style:{flex:"1 1 280px",minWidth:0},children:[
   e.jsxs("div",{style:{display:"inline-flex",alignItems:"center",gap:6,fontSize:11,fontWeight:900,letterSpacing:".08em",textTransform:"uppercase",background:"linear-gradient(135deg,#EC4899,#8B5CF6)",borderRadius:999,padding:"4px 10px"},children:[MI("stadium",{fontSize:14}),__T("Seyirci Sitesi")]}),
   e.jsx("div",{style:{fontSize:18,fontWeight:900,margin:"8px 0 4px"},children:__T("Bağımsız seyirci sitesi")+" — "+GS_HOST}),
   e.jsx("div",{style:{fontSize:12.5,color:"#E9D5FF",fontWeight:600,lineHeight:1.45},children:__T("Yeni tasarım canlı sonuç sitesi: şimdi sahnedeki sporcu, son puan, kategori ve alet sıralamaları, sıradakiler. Yalnız bu kısa link çalışır; yönetim sistemi, veritabanı ve yarışma kimliği görünmez. Arşive alınan yarışmada veri gösterilmez.")}),
   kod?e.jsx("div",{style:{margin:"10px 0 4px",background:"#fff",borderRadius:10,padding:"8px 10px",fontFamily:"ui-monospace,Menlo,monospace",fontSize:13,fontWeight:800,color:"#6D28D9",wordBreak:"break-all",textDecoration:kap?"line-through":"none"},children:url}):null,
   kap?e.jsx("div",{style:{fontSize:12,fontWeight:800,color:"#FDE68A",margin:"4px 0"},children:"⏸ "+__T("Yayın durduruldu — link şu an veri göstermiyor")}):null,
   kod?e.jsx(IzleyiciSayac,{br,comp}):null,
   e.jsxs("div",{style:{marginTop:10,padding:"10px 12px",borderRadius:12,background:"rgba(255,255,255,.08)",border:"1px solid rgba(255,255,255,.15)"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:6,fontSize:12,fontWeight:900,letterSpacing:".06em",textTransform:"uppercase",color:"#FECACA"},children:[MI("smart_display",{fontSize:16,color:"#F87171"}),__T("Canlı yayın (YouTube)"),yy&&yy.url?e.jsx("span",{style:{marginLeft:"auto",color:"#86EFAC",letterSpacing:0,textTransform:"none"},children:"● "+__T("seyirci sayfasında görünüyor")}):null]}),
    e.jsx("div",{style:{fontSize:11.5,color:"#E9D5FF",fontWeight:600,margin:"4px 0 8px"},children:__T("Link eklenince seyirci sayfasında \"Canlı yayını izle\" düğmesi çıkar; isteyen açar, sayfada küçük oynatıcıda izler. Boş bırakılırsa düğme görünmez.")}),
    e.jsxs("div",{style:{display:"flex",gap:6,flexWrap:"wrap"},children:[e.jsx("input",{value:yyG,onChange:ev=>setYyG(ev.target.value),placeholder:"https://www.youtube.com/watch?v=…  /  https://youtube.com/live/…",style:{flex:"1 1 260px",minWidth:0,padding:"8px 10px",borderRadius:10,border:"1px solid rgba(255,255,255,.3)",background:"#fff",color:"#1E1B4B",fontWeight:700,fontSize:12.5,fontFamily:"inherit"}}),
     e.jsxs("button",{type:"button",style:bt,onClick:yyKaydet,disabled:(yy&&yy.url||"")===yyG.trim(),children:[MI("save"),__T("Kaydet")]}),yy&&yy.url?e.jsxs("button",{type:"button",style:bt,onClick:()=>{setYyG("");yaz({[`${FBb}/${comp}/seyirciYayin`]:null})},children:[MI("link_off"),__T("Kaldır")]}):null]})]}),
   e.jsxs("div",{style:{display:"flex",gap:8,flexWrap:"wrap",marginTop:8},children:[
    kod?e.jsxs("button",{type:"button",style:bt,onClick:kopya,children:[MI(ok?"check":"content_copy"),ok?__T("Kopyalandı!"):__T("Kopyala")]}):null,
    kod?e.jsxs("a",{href:url,target:"_blank",rel:"noopener noreferrer",style:bt,children:[MI("open_in_new"),__T("Aç")]}):null,
    kod?e.jsxs("button",{type:"button",style:bt,onClick:()=>yaz({[`criteria/kisaLink/${kod}/kapali`]:kap?null:!0}),children:[MI(kap?"play_arrow":"pause"),kap?__T("Yayını başlat"):__T("Yayını durdur")]}):null,
    e.jsxs("button",{type:"button",style:{...bt,background:kod?"#fff":"#EC4899",color:kod?"#9D174D":"#fff",borderColor:kod?"#F9A8D4":"#EC4899"},onClick:olustur,children:[MI(kod?"autorenew":"add_link"),kod?__T("Yeni link"):__T("Seyirci linki oluştur")]})]})]})]})}
