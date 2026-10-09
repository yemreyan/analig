import"./i18n-Tr01a2b3Cb2.js";import{u as useAuth,b as usToast,j as e,d as db,l as logAction}from"./main-C2LpyYUGCb2.js";import{u as useNav,r as R}from"./vendor-react-Cxw6bqwhCb2.js";import{k as ref,o as onValue,m as update,l as fbGet}from"./vendor-firebase-940mxgRVCb2.js";import{f as filterComps}from"./useFilteredCompetitions-B7FB6qIvCb2.js";import{GXP_CSS,aletSirala}from"./ArtistikNotSilmePage-Ns01a2b3Cb2.js";import{artImg,artAd}from"./ritmikAlet-Ra01a2b3Cb2.js";import"./modulepreload-polyfill-B5Qt9EMXCb2.js";

// ARTİSTİK İTİRAZ PANELİ (2026-10-09, /artistic/inquiry · ritmik İtiraz Paneli akışıyla) — yalnız D puanına itiraz.
//  Süre: puan gösteriminden sonra 2 dk (sonrası "süre sonrası" olarak kaydedilir). Ücret kulüp başına 1. CHF 300 · 2. CHF 500 · 3.+ CHF 1000 (kabulde iade).
//  competitions/<y>/itirazlar/<id> = {brans:"artistik", kategori, sporcuId, sporcuAd, kulup, il, alet, aletAd, tur:"D", eskiDeger, eskiSonuc, puanZamani, talepZamani, gecenSn,
//     sureIcinde, ucretKademe, ucret, paraBirimi, not, durum: beklemede|kabul|red|iptal, olusturan, yeniDeger, yeniSonuc, kararNot, kararVeren, kararZamani}
//  puanlar/<kat>/<alet>/<sporcu>/itirazDurum. KABUL → dScore / calc_D / finalScore / sonuc güncellenir, puan yeniden yayınlanır (flashTrigger, board aynı sporcuysa).
const FB="competitions",SURE=120,UCRET=[0,300,500,1000];
const n=v=>{const x=parseFloat(v);return isNaN(x)?0:x},f3=v=>n(v).toFixed(3);
const saat=t=>t?new Date(t).toLocaleTimeString("tr-TR",{hour:"2-digit",minute:"2-digit",second:"2-digit"}):"—";
const tsOf=x=>{if(!x)return null;const t=typeof x==="number"?x:Date.parse(x);return isNaN(t)?null:t};
const DURUM={beklemede:["İncelemede","#B45309","#FFFBEB"],kabul:["Kabul — puan değişti","#15803D","#F0FDF4"],red:["Reddedildi — puan aynı","#B91C1C","#FEF2F2"],iptal:["Geri çekildi","#64748B","#F8FAFC"]};
const MI=(n0,st)=>e.jsx("i",{className:"material-icons-round",style:{fontSize:18,verticalAlign:"-4px",...st},children:n0});
const CSS=GXP_CSS+`
.it-grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.2fr);gap:14px}@media(max-width:980px){.it-grid{grid-template-columns:1fr}}
.it-h{display:flex;align-items:center;gap:8px;margin:0 0 10px;font-size:1rem;font-weight:900}.it-h .c{margin-left:auto;font-size:.75rem;font-weight:800;padding:3px 9px;border-radius:999px;background:#EEF2FF;color:#4338CA}
.it-row{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:8px}.it-row select,.it-row input,.it-row textarea{flex:1 1 160px;min-width:0;padding:9px 11px;border:1px solid #E2E8F0;border-radius:10px;font:inherit;font-weight:700;font-size:.88rem;background:#fff}
.it-ath{display:flex;flex-direction:column;gap:6px;max-height:300px;overflow:auto;margin-bottom:8px}
.it-a{display:flex;align-items:center;gap:10px;padding:8px 10px;border:1.5px solid #EEF0F4;border-radius:12px;cursor:pointer;background:#fff;text-align:left;font:inherit}.it-a.on{border-color:#4F46E5;background:#EEF2FF}.it-a b{flex:1;min-width:0;font-size:.9rem}.it-a span{font-size:.75rem;color:#64748B;font-weight:700;white-space:nowrap}
.it-ozet{display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin:6px 0 10px}.it-ozet div{background:#F8FAFC;border-radius:10px;padding:7px 8px;text-align:center}.it-ozet small{display:block;font-size:.64rem;font-weight:900;color:#64748B;letter-spacing:.05em}.it-ozet b{font-size:1.05rem;font-variant-numeric:tabular-nums}
.it-btn{display:inline-flex;align-items:center;justify-content:center;gap:6px;border:none;border-radius:12px;padding:11px 14px;font:inherit;font-weight:900;font-size:.88rem;cursor:pointer;color:#fff;background:#4F46E5}.it-btn:disabled{opacity:.5;cursor:default}
.it-card{border:1.5px solid #EEF0F4;border-radius:14px;padding:12px;margin-bottom:10px;background:#fff}.it-card.bek{border-color:#F59E0B;box-shadow:0 8px 22px -14px rgba(217,119,6,.6)}
.it-top{display:flex;align-items:center;gap:8px;flex-wrap:wrap}.it-top b{font-size:.98rem}.it-st{margin-left:auto;font-size:.7rem;font-weight:900;padding:3px 9px;border-radius:999px}
.it-meta{font-size:.78rem;color:#64748B;font-weight:700;margin-top:3px;line-height:1.5}
.it-act{display:flex;gap:6px;flex-wrap:wrap;margin-top:10px;align-items:center}.it-act input{width:110px;padding:9px 10px;border:1.5px solid #C7D2FE;border-radius:10px;font:inherit;font-weight:900;font-size:1rem;text-align:center}
.it-ok{background:#16A34A}.it-no{background:#DC2626}.it-ip{background:#64748B}`;

export default function ArtistikItirazPage(){
 const nav=useNav(),{currentUser:user}=useAuth()||{},{toast}=usToast(),kim=user?.adSoyad||user?.kullaniciAdi||"";
 const[comps,setComps]=R.useState({}),[comp,setComp]=R.useState(()=>{try{return localStorage.getItem("gxArItComp")||""}catch{return""}}),[C,setC]=R.useState(null);
 const[kat,setKat]=R.useState(""),[alet,setAlet]=R.useState(""),[ath,setAth]=R.useState(""),[not,setNot]=R.useState(""),[busy,setBusy]=R.useState(""),[yeni,setYeni]=R.useState({}),[kn,setKn]=R.useState({}),[now,setNow]=R.useState(Date.now());
 R.useEffect(()=>{const t=setInterval(()=>setNow(Date.now()),5e3);return()=>clearInterval(t)},[]);
 R.useEffect(()=>onValue(ref(db,FB),s=>setComps(filterComps(s.val()||{},user)||{}),{onlyOnce:!0}),[user]);
 R.useEffect(()=>{try{localStorage.setItem("gxArItComp",comp)}catch{}setC(null);if(!comp)return;const st={},u=["isim","kategoriler","sporcular","puanlar","itirazlar"].map(k=>onValue(ref(db,`${FB}/${comp}/${k}`),s=>{st[k]=s.val()||{};setC({...st})}));return()=>u.forEach(f=>f())},[comp]);
 const compList=R.useMemo(()=>Object.entries(comps).filter(([,c])=>c&&c.isim&&c.arsivli!==!0).sort((a,b)=>String(b[1].baslangicTarihi||"").localeCompare(String(a[1].baslangicTarihi||""))),[comps]);
 const kats=C?.kategoriler||{},spor=C?.sporcular||{},pun=C?.puanlar||{},its=Object.entries(C?.itirazlar||{}).map(([id,x])=>({id,...x})).filter(x=>x&&x.kategori).sort((a,b)=>(b.talepZamani||0)-(a.talepZamani||0));
 const aletler=kat?aletSirala(kats[kat]?.aletler||[]):[];
 const spAd=(k,id)=>{const a=spor?.[k]?.[id];return a?[a.ad,a.soyad].filter(Boolean).join(" ")||a.adSoyad||id:id};
 const adaylar=kat&&alet?Object.entries(pun?.[kat]?.[alet]||{}).filter(([,x])=>x&&(x.durum==="tamamlandi"||x.kilitli===!0)).map(([id,x])=>({id,x,ts:tsOf(x.timestamp)})).sort((a,b)=>(b.ts||0)-(a.ts||0)):[];
 const sec=adaylar.find(a=>a.id===ath),secSp=ath?spor?.[kat]?.[ath]||{}:{},kul=String(secSp.okul||secSp.kulup||"").trim();
 const ucretOf=k=>{const say=its.filter(x=>x.tur==="D"&&String(x.kulup||"").trim()===k&&x.durum!=="iptal").length,kad=Math.min(3,say+1);return{kad,ucr:UCRET[kad]}};
 const gec=sec&&sec.ts?Math.max(0,Math.round((now-sec.ts)/1e3)):null,icinde=gec!=null&&gec<=SURE,{kad,ucr}=ucretOf(kul),zaten=sec&&its.some(x=>x.kategori===kat&&x.alet===alet&&x.sporcuId===ath&&x.durum==="beklemede");
 const ayniFlash=(ft,it)=>ft&&ft.aletId===it.alet&&(String(ft.id||"")===String(it.sporcuId)||String(ft.adSoyad||"").trim().toLocaleUpperCase("tr-TR")===String(it.sporcuAd||"").trim().toLocaleUpperCase("tr-TR"));

 const olustur=async()=>{if(!sec||busy||zaten)return;const ad=spAd(kat,ath),aAd=artAd(alet,!1,kat)||alet;
  if(!icinde&&!await window.__gxConfirm(__T("İtiraz süresi (2 dk) geçmiş görünüyor. Yine de kaydedilsin mi? Kayıtta “süre sonrası” olarak işaretlenir.")))return;
  if(!await window.__gxConfirm(`${ad} — ${aAd}\nD: ${f3(sec.x.dScore??sec.x.calc_D)} · ${__T("Toplam")}: ${f3(sec.x.finalScore??sec.x.sonuc)}\n${kul||"—"} · ${kad}. ${__T("itiraz")} · CHF ${ucr}\n\n${__T("D puanı itirazı kaydedilsin mi?")}`))return;
  setBusy("yeni");try{const id="it"+Date.now().toString(36)+Math.random().toString(36).slice(2,6),B=`${FB}/${comp}`;
   const o={brans:"artistik",kategori:kat,sporcuId:ath,sporcuAd:ad,kulup:kul,il:secSp.il||"",alet,aletAd:aAd,tur:"D",eskiDeger:+n(sec.x.dScore??sec.x.calc_D).toFixed(3),eskiSonuc:+n(sec.x.finalScore??sec.x.sonuc).toFixed(3),puanZamani:sec.ts||null,talepZamani:Date.now(),gecenSn:gec,sureIcinde:!!icinde,ucretKademe:kad,ucret:ucr,paraBirimi:"CHF",not:not.trim()||null,durum:"beklemede",olusturan:kim};
   const U={[`${B}/itirazlar/${id}`]:o,[`${B}/puanlar/${kat}/${alet}/${ath}/itirazDurum`]:"beklemede"};
   try{const ft=(await fbGet(ref(db,`${B}/flashTrigger`))).val();if(ayniFlash(ft,o)){U[`${B}/flashTrigger/itiraz`]="beklemede";U[`${B}/flashTrigger/itirazTur`]="D"}}catch{}
   await update(ref(db),U);try{logAction("score_inquiry",`İtiraz: D · ${ad} · ${aAd} · ${kad}. itiraz, CHF ${ucr}`+(icinde?"":" · süre sonrası"),{user:kim,competitionId:comp,category:kat,athleteId:ath,athleteName:ad,alet,oldValue:o.eskiDeger,discipline:"artistik",data:{itirazId:id,...o}})}catch{}
   setNot("");setAth("");toast(__T("İtiraz kaydedildi."),"success")}catch(er){toast(__T("Kaydedilemedi")+": "+(er?.message||er),"error")}setBusy("")};

 const karar=async(it,k)=>{if(busy)return;const B=`${FB}/${comp}`,yol=`${B}/puanlar/${it.kategori}/${it.alet}/${it.sporcuId}`,P=`${B}/itirazlar/${it.id}`;
  let yD=null;if(k==="kabul"){yD=parseFloat(String(yeni[it.id]??"").replace(",","."));if(isNaN(yD)||yD<0||yD>30){toast(__T("Geçerli yeni D puanı girin."),"warning");return}}
  const ys=k==="kabul"?`${it.sporcuAd} — ${it.aletAd}\nD: ${f3(it.eskiDeger)} → ${f3(yD)}\n\n${__T("İtiraz KABUL edilsin mi? Puan güncellenip yeniden yayınlanır; ücret iade edilir.")}`:k==="red"?`${it.sporcuAd} — ${it.aletAd}\n\n${__T("İtiraz REDDEDİLSİN mi? Puan aynı kalır.")}`:`${it.sporcuAd} — ${it.aletAd}\n\n${__T("İtiraz geri çekildi olarak işaretlensin mi?")}`;
  if(!await window.__gxConfirm(ys))return;setBusy(it.id);
  try{const rec=(await fbGet(ref(db,yol))).val()||{},G={},eskiTop=n(rec.finalScore??rec.sonuc);let yS=eskiTop;
   if(k==="kabul"){const es=n(rec.dScore??rec.calc_D),fk=+(yD-es).toFixed(3);yS=+(eskiTop+fk).toFixed(3);Object.assign(G,{[yol+"/dScore"]:+yD.toFixed(3),[yol+"/calc_D"]:+yD.toFixed(3),[yol+"/finalScore"]:yS,[yol+"/sonuc"]:yS,[yol+"/itirazDegisiklik"]:{eskiD:es,yeniD:+yD.toFixed(3),eskiToplam:eskiTop,yeniToplam:yS,ts:Date.now(),kim}})}
   G[yol+"/itirazDurum"]=k==="iptal"?null:k;
   Object.assign(G,{[P+"/durum"]:k,[P+"/yeniDeger"]:k==="kabul"?+yD.toFixed(3):null,[P+"/yeniSonuc"]:yS,[P+"/kararNot"]:(kn[it.id]||"").trim()||null,[P+"/kararVeren"]:kim,[P+"/kararZamani"]:Date.now()});
   let ft=null,brd=null;try{[ft,brd]=await Promise.all([fbGet(ref(db,`${B}/flashTrigger`)).then(s=>s.val()),fbGet(ref(db,`${B}/board/${it.kategori}/${it.alet}`)).then(s=>s.val())])}catch{}
   if(k==="kabul"){const sp=spor?.[it.kategori]?.[it.sporcuId]||{};G[`${B}/flashTrigger`]={adSoyad:it.sporcuAd,kulup:it.kulup||"",ulke:sp.ulke||null,bib:sp.bib||null,kategori:it.kategori,id:it.sporcuId,aletAd:it.aletAd,aletId:it.alet,d:+yD.toFixed(3),e:n(rec.calc_E),pen:+(n(rec.calc_MissingPen)+n(rec.neutralDeductions??rec.tarafsiz)).toFixed(3),total:yS.toFixed(3),itiraz:"kabul",itirazTur:"D",oncekiTotal:eskiTop,timestamp:Date.now()};
    if(brd&&String(brd.athId)===String(it.sporcuId)&&brd.state==="scored"){G[`${B}/board/${it.kategori}/${it.alet}/score`]=yS;G[`${B}/board/${it.kategori}/${it.alet}/dScore`]=+yD.toFixed(3)}}
   else if(ayniFlash(ft,it)){G[`${B}/flashTrigger/itiraz`]=k==="red"?"red":null;G[`${B}/flashTrigger/itirazTur`]=k==="red"?"D":null}
   await update(ref(db),G);
   try{logAction("score_inquiry_decision",`İtiraz ${k==="kabul"?"KABUL":k==="red"?"RED":"GERİ ÇEKİLDİ"}: D · ${it.sporcuAd} · ${it.aletAd}`+(k==="kabul"?` · ${f3(it.eskiDeger)} → ${f3(yD)} · sonuç ${f3(eskiTop)} → ${f3(yS)}`:""),{user:kim,competitionId:comp,category:it.kategori,athleteId:it.sporcuId,athleteName:it.sporcuAd,alet:it.alet,oldValue:it.eskiDeger,newValue:yD,discipline:"artistik",data:{itirazId:it.id,karar:k,eskiSonuc:eskiTop,yeniSonuc:yS,ucret:it.ucret||0,ucretIade:k==="kabul"&&(it.ucret||0)>0}})}catch{}
   toast(k==="kabul"?__T("Kabul edildi, puan güncellendi."):k==="red"?__T("Reddedildi."):__T("Geri çekildi."),"success")}catch(er){toast(__T("İşlem başarısız")+": "+(er?.message||er),"error")}setBusy("")};

 const bek=its.filter(x=>x.durum==="beklemede"),gecmis=its.filter(x=>x.durum!=="beklemede");
 const kart=it=>{const d=DURUM[it.durum]||[it.durum,"#64748B","#F8FAFC"],b=it.durum==="beklemede",kAd=String(kats[it.kategori]?.name||it.kategori).replace(/^\s*🏆\s*/u,"");
  return e.jsxs("div",{className:"it-card"+(b?" bek":""),children:[e.jsxs("div",{className:"it-top",children:[artImg(it.alet,it.kategori)?e.jsx("img",{src:artImg(it.alet,it.kategori),alt:"",style:{width:34,height:34,objectFit:"contain"}}):null,e.jsxs("div",{children:[e.jsx("b",{children:it.sporcuAd}),e.jsx("div",{className:"it-meta",children:[kAd,it.aletAd,it.kulup].filter(Boolean).join(" · ")})]}),e.jsx("span",{className:"it-st",style:{color:d[1],background:d[2],border:"1px solid "+d[1]+"40"},children:__T(d[0])})]}),
   e.jsxs("div",{className:"it-meta",children:["D ",e.jsx("b",{style:{color:"#0F172A"},children:f3(it.eskiDeger)}),it.durum==="kabul"?[" → ",e.jsx("b",{style:{color:"#15803D"},children:f3(it.yeniDeger)},"y")]:null," · ",__T("Toplam")," ",f3(it.eskiSonuc),it.durum==="kabul"?" → "+f3(it.yeniSonuc):""," · ",__T("talep")," ",saat(it.talepZamani),it.gecenSn!=null?" ("+it.gecenSn+" "+__T("sn")+")":"",!it.sureIcinde?" · ⚠ "+__T("süre sonrası"):""," · ",it.ucretKademe?it.ucretKademe+". "+__T("itiraz")+" · CHF "+it.ucret+(it.durum==="kabul"?" ("+__T("iade")+")":""):""]}),
   it.not?e.jsx("div",{className:"it-meta",children:"“"+it.not+"”"}):null,
   !b?e.jsx("div",{className:"it-meta",children:[__T("Karar"),": ",it.kararVeren||"—"," · ",saat(it.kararZamani),it.kararNot?" · “"+it.kararNot+"”":""].join("")}):
   e.jsxs("div",{className:"it-act",children:[e.jsx("input",{inputMode:"decimal",placeholder:__T("yeni D"),value:yeni[it.id]??"",onChange:ev=>setYeni(o=>({...o,[it.id]:ev.target.value}))}),
    e.jsxs("button",{type:"button",className:"it-btn it-ok",disabled:busy===it.id,onClick:()=>karar(it,"kabul"),children:[MI("check_circle",{verticalAlign:0}),__T("Kabul")]}),
    e.jsxs("button",{type:"button",className:"it-btn it-no",disabled:busy===it.id,onClick:()=>karar(it,"red"),children:[MI("block",{verticalAlign:0}),__T("Red")]}),
    e.jsxs("button",{type:"button",className:"it-btn it-ip",disabled:busy===it.id,onClick:()=>karar(it,"iptal"),children:[MI("undo",{verticalAlign:0}),__T("Geri çekildi")]}),
    e.jsx("input",{style:{flex:"1 1 160px",width:"auto",textAlign:"left",fontWeight:700,fontSize:".85rem"},placeholder:__T("Karar notu (isteğe bağlı)"),value:kn[it.id]??"",onChange:ev=>setKn(o=>({...o,[it.id]:ev.target.value}))})]})]},it.id)};

 return e.jsxs("div",{className:"gxp",style:{"--gxp-c":"#DC2626",maxWidth:1400},children:[e.jsx("style",{children:CSS}),
  e.jsxs("div",{className:"gxp-hdr",children:[e.jsx("button",{type:"button",className:"gxp-back",onClick:()=>nav("/artistic"),title:__T("Geri"),children:MI("arrow_back",{fontSize:22,verticalAlign:0})}),e.jsx("div",{className:"gxp-ic",children:MI("gavel",{fontSize:26,verticalAlign:0})}),e.jsxs("div",{className:"gxp-tt",children:[e.jsx("h1",{children:__T("İtiraz Paneli")}),e.jsx("p",{children:__T("D puanı itirazı: kaydet, incele, karar ver (2 dk süre · CHF 300 / 500 / 1000)")})]}),
   e.jsx("div",{className:"gxp-sel",children:e.jsxs("select",{value:comp,onChange:ev=>{setComp(ev.target.value);setKat("");setAlet("");setAth("")},children:[e.jsx("option",{value:"",children:__T("— Yarışma seçin —")}),compList.map(([id,c])=>e.jsx("option",{value:id,children:c.isim},id))]})})]}),
  !comp?e.jsx("div",{className:"gxp-card",children:e.jsxs("div",{className:"gxp-empty",children:[MI("gavel",{fontSize:46,display:"block",color:"#CBD5E1",margin:"0 auto 8px"}),__T("Yarışma seçin")]})}):!C?e.jsx("div",{className:"gxp-card",children:e.jsx("div",{className:"gxp-empty",children:__T("Yükleniyor…")})}):
  e.jsxs("div",{className:"it-grid",children:[
   e.jsxs("div",{className:"gxp-card",children:[e.jsxs("div",{className:"it-h",children:[MI("add_circle",{color:"#4F46E5"}),__T("Yeni itiraz")]}),
    e.jsxs("div",{className:"it-row",children:[e.jsxs("select",{value:kat,onChange:ev=>{setKat(ev.target.value);setAlet("");setAth("")},children:[e.jsx("option",{value:"",children:__T("Kategori…")}),Object.entries(kats).filter(([,v])=>v&&Array.isArray(v.aletler)&&v.aletler.length).map(([k,v])=>e.jsx("option",{value:k,children:String(v.name||k).replace(/^\s*🏆\s*/u,"")},k))]}),
     e.jsxs("select",{value:alet,disabled:!kat,onChange:ev=>{setAlet(ev.target.value);setAth("")},children:[e.jsx("option",{value:"",children:__T("Alet…")}),aletler.map(a=>e.jsx("option",{value:a,children:artAd(a,!1,kat)||a},a))]})]}),
    kat&&alet?adaylar.length?e.jsx("div",{className:"it-ath",children:adaylar.slice(0,60).map(a=>e.jsxs("button",{type:"button",className:"it-a"+(ath===a.id?" on":""),onClick:()=>setAth(a.id),children:[e.jsx("b",{children:spAd(kat,a.id)}),e.jsx("span",{children:"D "+f3(a.x.dScore??a.x.calc_D)+" · "+f3(a.x.finalScore??a.x.sonuc)}),e.jsx("span",{children:saat(a.ts)}),a.x.itirazDurum?e.jsx("span",{style:{color:(DURUM[a.x.itirazDurum]||[])[1]},children:"● "+__T((DURUM[a.x.itirazDurum]||[a.x.itirazDurum])[0])}):null]},a.id))}):e.jsx("div",{className:"it-meta",children:__T("Bu alette puanı kesinleşmiş sporcu yok.")}):e.jsx("div",{className:"it-meta",children:__T("Kategori ve alet seçin; en son puanlanan sporcu en üstte.")}),
    sec?e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"it-ozet",children:[e.jsxs("div",{children:[e.jsx("small",{children:"D"}),e.jsx("b",{children:f3(sec.x.dScore??sec.x.calc_D)})]}),e.jsxs("div",{children:[e.jsx("small",{children:"E"}),e.jsx("b",{children:f3(sec.x.calc_E)})]}),e.jsxs("div",{children:[e.jsx("small",{children:__T("TOPLAM")}),e.jsx("b",{children:f3(sec.x.finalScore??sec.x.sonuc)})]}),e.jsxs("div",{style:{background:icinde?"#F0FDF4":"#FEF2F2"},children:[e.jsx("small",{children:__T("SÜRE")}),e.jsx("b",{style:{color:icinde?"#15803D":"#B91C1C"},children:gec==null?"—":gec<=SURE?Math.max(0,SURE-gec)+" "+__T("sn"):__T("geçti")})]})]}),
     e.jsx("div",{className:"it-meta",style:{marginBottom:8},children:(kul||"—")+" · "+kad+". "+__T("D itirazı")+" · CHF "+ucr+" ("+__T("kabulde iade")+")"}),
     e.jsx("div",{className:"it-row",children:e.jsx("textarea",{rows:2,placeholder:__T("Not (isteğe bağlı): hangi eleman / değer")+"…",value:not,onChange:ev=>setNot(ev.target.value)})}),
     zaten?e.jsx("div",{className:"it-meta",style:{color:"#B45309"},children:"⚠ "+__T("Bu rutin için incelemede bir itiraz zaten var.")}):null,
     e.jsxs("button",{type:"button",className:"it-btn",disabled:!!busy||zaten,onClick:olustur,children:[MI("gavel",{verticalAlign:0}),__T("D itirazını kaydet")]})]}):null]}),
   e.jsxs("div",{children:[e.jsxs("div",{className:"gxp-card",style:{marginBottom:14},children:[e.jsxs("div",{className:"it-h",children:[MI("hourglass_top",{color:"#D97706"}),__T("İncelemede"),e.jsx("span",{className:"c",children:bek.length})]}),bek.length?bek.map(kart):e.jsx("div",{className:"it-meta",children:__T("İncelemede itiraz yok.")})]}),
    e.jsxs("div",{className:"gxp-card",children:[e.jsxs("div",{className:"it-h",children:[MI("history",{color:"#64748B"}),__T("Karar verilenler"),e.jsx("span",{className:"c",children:gecmis.length})]}),gecmis.length?gecmis.slice(0,80).map(kart):e.jsx("div",{className:"it-meta",children:__T("Henüz karar verilen itiraz yok.")})]})]})]})]})}
