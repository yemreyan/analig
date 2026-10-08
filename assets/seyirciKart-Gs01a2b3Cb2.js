import{j as e,d as db}from"./main-C2LpyYUGCb2.js";import{r as R}from"./vendor-react-Cxw6bqwhCb2.js";import{k as ref,o as onValue,m as update}from"./vendor-firebase-940mxgRVCb2.js";
// BAĞIMSIZ SEYİRCİ SİTESİ KARTI (2026-10-08, Paneller sayfası) — GS_HOST/<kod>, ayrı Vercel projesi (~/Desktop/gymexa-izle).
// criteria/kisaLink/<kod> = {t:"izle", b, c, ts, kapali? (durduruldu), iptal? (yenilendi)} · <yarışma>/kisaLinkler/izle = <kod>
// (Önceden QR ve Linkler sayfasındaydı — LinksPage GsKart; o kart kodda duruyor.)
export const GS_HOST="gymexascore.vercel.app";
const kodUret=()=>{const a="abcdefghijkmnpqrstuvwxyz23456789",b=new Uint8Array(9);crypto.getRandomValues(b);return Array.from(b,x=>a[x%a.length]).join("")};
let _qr=null;const qrAl=async t=>{try{_qr=_qr||(await import("https://cdn.jsdelivr.net/npm/qrcode@1.5.4/+esm")).default;return await _qr.toDataURL(t,{margin:1,width:360})}catch{return null}};
const MI=(n,st)=>e.jsx("span",{className:"material-icons-round",style:{fontSize:16,...st},children:n});
export function SeyirciKart({comp,br,kim}){
 const FBb=br==="ritmik"?"ritmik_yarismalar":br==="aerobik"?"aerobik_yarismalar":null;
 const[kod,setKod]=R.useState(null),[kap,setKap]=R.useState(!1),[ok,setOk]=R.useState(""),[qr,setQr]=R.useState(null);
 R.useEffect(()=>{setKod(null);if(!FBb||!comp)return;return onValue(ref(db,`${FBb}/${comp}/kisaLinkler/izle`),s=>setKod(s.val()||null))},[FBb,comp]);
 R.useEffect(()=>{setKap(!1);if(!kod)return;return onValue(ref(db,`criteria/kisaLink/${kod}/kapali`),s=>setKap(!!s.val()))},[kod]);
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
   e.jsxs("div",{style:{display:"flex",gap:8,flexWrap:"wrap",marginTop:8},children:[
    kod?e.jsxs("button",{type:"button",style:bt,onClick:kopya,children:[MI(ok?"check":"content_copy"),ok?__T("Kopyalandı!"):__T("Kopyala")]}):null,
    kod?e.jsxs("a",{href:url,target:"_blank",rel:"noopener noreferrer",style:bt,children:[MI("open_in_new"),__T("Aç")]}):null,
    kod?e.jsxs("button",{type:"button",style:bt,onClick:()=>yaz({[`criteria/kisaLink/${kod}/kapali`]:kap?null:!0}),children:[MI(kap?"play_arrow":"pause"),kap?__T("Yayını başlat"):__T("Yayını durdur")]}):null,
    e.jsxs("button",{type:"button",style:{...bt,background:kod?"#fff":"#EC4899",color:kod?"#9D174D":"#fff",borderColor:kod?"#F9A8D4":"#EC4899"},onClick:olustur,children:[MI(kod?"autorenew":"add_link"),kod?__T("Yeni link"):__T("Seyirci linki oluştur")]})]})]})]})}
