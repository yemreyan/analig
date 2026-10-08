import{j as e,d as db,a as usDisc,u as usAuth,l as logAction}from"./main-C2LpyYUGCb2.js";import{r as R}from"./vendor-react-Cxw6bqwhCb2.js";import{k as ref,o as onValue,m as update,l as fbGet}from"./vendor-firebase-940mxgRVCb2.js";import{raAd,raImg,artAd,artImg}from"./ritmikAlet-Ra01a2b3Cb2.js";import"./yayinVeri-Yv01a2b3Cb2.js";

// NOT SİLME / TEMİZLEME (2026-10-09) — /rhythmic/score-deletion (artistikteki "Not Silme"nin ritmik karşılığı) · YALNIZ SÜPER ADMİN (rota pageKey "puan_temizle" kimseye verilmez; sayfa ayrıca rolü denetler).
//  Bir sporcunun (grup kategorisinde takımın) BİR aletteki notu temizlenir → o alette hiç yarışmamış gibi olur:
//   puanlar/<kat>/<giriş>/<alet> (hakem notları, kesinti şeritleri, süre/çizgi, video linkleri, yayinBekliyor, itirazDurum),
//   duzeltmeIzni/<kat>/<giriş>/<alet>, itirazlar (kategori+sporcuId+alet), yayinKuyruk/<kat>__<giriş>__<alet>,
//   kameraYukleme (kat+athId+alet), flashTrigger (aynı rutin ise), sporcu o alette çağrılıysa aktifSporcu / aktifSporcuBilgi / aktifAlet / aktifSporcuAlet.
//  Yedek: <yarışma>/silinenPuanlar/<id> {kat, giris, alet, ad, kim, ts, veri:{yol: değer}} → "Geri yükle" puan, itiraz, düzeltme izni ve kamera kayıtlarını geri yazar
//  (çağrı / flaş / yayın kuyruğu ve yayinBekliyor geri yazılmaz; puan doğrudan yayınlanmış sayılır).
//  ARTİSTİK (2026-10-09, /artistic/score-deletion — eski ArtistikNotSilmePage yerine): competitions/<y>/puanlar/<kat>/<ALET>/<sporcu> (sıra ters),
//   canlı durum board/<kat>/<alet> (athId aynıysa), aktifSporcu/<kat>/<alet> (= sporcu id), flashTrigger (aletId + adSoyad aynıysa) temizlenir. Log: score_clear / score_restore. Drive'daki video dosyaları silinmez (yalnız bağlantı).
const MI=(n,st)=>e.jsx("span",{className:"material-icons-round",style:{fontSize:18,...st},children:n});
const FB="https://analig-default-rtdb.firebaseio.com/";
const GV=()=>typeof self!=="undefined"?self.GXYV:null;
const num=v=>{const n=parseFloat(v);return isNaN(n)?0:n};
const yeniId=()=>"sp"+Date.now().toString(36)+Math.random().toString(36).slice(2,6);
const zaman=t=>t?new Date(+t).toLocaleString("tr-TR",{day:"2-digit",month:"2-digit",hour:"2-digit",minute:"2-digit"}):"—";
// hücre durumu: puan kaydı tamamlanmış / IRM / kısmi (hakem notları girilmiş, tamamlanmamış) / boş
const durumOf=x=>!x||typeof x!=="object"?null:x.irm?{t:"irm",v:x.irm}:x.durum==="tamamlandi"||x.kilitli===!0?{t:"tam",v:num(x.finalScore!=null?x.finalScore:x.sonuc).toFixed(3),yb:!!x.yayinBekliyor}:{t:"kismi"};
const SIRA_K=["atlama","asimetrik","denge","yer"],SIRA_E=["yer","kulplu","mantar","halka","atlama","paralel","barfiks"];
const artSira=a=>{const s=a.some(x=>x==="asimetrik"||x==="denge")?SIRA_K:SIRA_E;return[...a].sort((x,y)=>{const i=s.indexOf(x),j=s.indexOf(y);return(i<0?99:i)-(j<0?99:j)})};
const UPN=t=>String(t||"").trim().toLocaleUpperCase("tr-TR");

export default function PuanTemizle(){
 const{firebasePath:fp,id:BRN}=usDisc()||{},ART=BRN==="artistik",{currentUser:cu}=usAuth()||{},kim=cu?.adSoyad||cu?.kullaniciAdi||"",SA=!!cu&&(cu.rolAdi==="Super Admin"||cu.kullaniciAdi==="admin");
 const[comps,setComps]=R.useState(null),[comp,setComp]=R.useState(""),[kat,setKat]=R.useState(""),[ara,setAra]=R.useState(""),[busy,setBusy]=R.useState(""),[mesaj,setMesaj]=R.useState(null);
 const[kats,setKats]=R.useState({}),[spor,setSpor]=R.useState(null),[puan,setPuan]=R.useState(null),[sil,setSil]=R.useState({});
 // yarışma listesi: yalnız başlık alanları (shallow + alan okuma), arşivdekiler hariç
 R.useEffect(()=>{if(!fp||!SA)return;(async()=>{try{const ks=Object.keys(await(await fetch(FB+fp+".json?shallow=true")).json()||{});
  const L=await Promise.all(ks.map(async k=>{const o={id:k};await Promise.all(["isim","arsivli","baslangicTarihi"].map(async a=>{try{o[a]=(await fbGet(ref(db,fp+"/"+k+"/"+a))).val()}catch{}}));return o}));
  setComps(L.filter(c=>c.isim&&c.arsivli!==!0&&c.arsivli!=="true").sort((a,b)=>String(b.baslangicTarihi||"").localeCompare(String(a.baslangicTarihi||""))))}catch{setComps([])}})()},[fp,SA]);
 R.useEffect(()=>{setKat("");setKats({});setSil({});if(!fp||!comp)return;const u=[onValue(ref(db,`${fp}/${comp}/kategoriler`),s=>setKats(s.val()||{})),onValue(ref(db,`${fp}/${comp}/silinenPuanlar`),s=>setSil(s.val()||{}))];return()=>u.forEach(f=>f())},[fp,comp]);
 R.useEffect(()=>{setSpor(null);setPuan(null);if(!fp||!comp||!kat)return;const u=[onValue(ref(db,`${fp}/${comp}/sporcular/${kat}`),s=>setSpor(s.val()||{})),onValue(ref(db,`${fp}/${comp}/puanlar/${kat}`),s=>setPuan(s.val()||{}))];return()=>u.forEach(f=>f())},[fp,comp,kat]);
 const V=GV(),katL=Object.entries(kats).map(([k,z])=>({k,ad:V?V.katAd(kats,k):String(z&&(z.name||z.ad)||k),f:/^final_/.test(k)||!!(z&&z.final===!0)})).sort((a,b)=>(a.f-b.f)||a.ad.localeCompare(b.ad,"tr"));
 const kd=kats[kat]||{},aletler0=Array.isArray(kd.aletler)?kd.aletler:ART?Object.keys(puan||{}):[...new Set(Object.values(puan||{}).flatMap(p=>p&&typeof p==="object"?Object.keys(p).filter(a=>p[a]&&typeof p[a]==="object"):[]))],aletler=ART?artSira(aletler0):aletler0;
 // giriş listesi: ritmik ortak hesap (grupta kat::kulüp::grupNo); artistik sporcular (+ kaydı olmayan puan anahtarları), çıkış sırasına göre
 const girisler=R.useMemo(()=>{if(!spor||!puan)return[];if(!ART)return V?V.girisler(kat,spor,puan):[];
  const E={};Object.entries(spor).forEach(([id,a])=>{if(!a||typeof a!=="object")return;E[id]={key:id,ad:[a.ad,a.soyad].filter(Boolean).join(" ")||a.adSoyad||id,adSoyad:a.adSoyad||[a.ad,a.soyad].filter(Boolean).join(" "),kulup:a.kulup||a.okul||"",ulke:a.ulke||"",uyeler:[],start:+a.cikisSirasi||+a.sirasi||null}});
  Object.values(puan).forEach(p=>p&&typeof p==="object"&&Object.keys(p).forEach(id=>{if(!E[id])E[id]={key:id,ad:id,adSoyad:"",kulup:"",ulke:"",uyeler:[],start:null}}));
  return Object.values(E).sort((a,b)=>(a.start||1e6)-(b.start||1e6)||a.ad.localeCompare(b.ad,"tr"))},[spor,puan,kat,V,ART]);
 const recOf=(g,al)=>ART?(puan||{})[al]?.[g.key]:(puan||{})[g.key]?.[al],recYol=(B,g,al)=>ART?`${B}/puanlar/${kat}/${al}/${g.key}`:`${B}/puanlar/${kat}/${g.key}/${al}`;
 const q=ara.trim().toLocaleLowerCase("tr-TR"),satirlar=girisler.filter(g=>!q||[g.ad,g.kulup,g.ulke,g.uyeler.join(" ")].join(" ").toLocaleLowerCase("tr-TR").includes(q));
 const finVar=!/^final_/.test(kat)&&Object.keys(kats).some(k=>k.startsWith("final_"+kat));
 const katAdS=k=>(katL.find(x=>x.k===k)||{}).ad||k,aletAdS=a=>ART?artAd(a,!1,kat)||a:raAd(a,!1)||a,aletImg=a=>ART?artImg(a,kat):raImg(a);

 const temizle=async(g,al)=>{if(busy)return;const B=`${fp}/${comp}`,rec=recOf(g,al),d=durumOf(rec),ad=g.ad+(g.uyeler.length?" ("+g.uyeler.join(", ")+")":"");
  if(!await window.__gxConfirm(`${ad}\n${katAdS(kat)} — ${aletAdS(al)}\n${d?d.t==="tam"?"Puan: "+d.v:d.t==="irm"?"IRM: "+d.v:"Hakem notları girilmiş (tamamlanmamış)":""}\n\nBu aletteki TÜM notlar silinecek; sporcu bu alette hiç yarışmamış gibi olacak (hakem notları, kesintiler, süre/çizgi, itirazlar, video bağlantısı, yayın kuyruğu). Yedek alınır, "Geri yükle" ile geri getirilebilir.\n\nDevam edilsin mi?`))return;
  const yaz=await window.__gxPrompt("Onaylamak için TEMİZLE yazın:","");if(String(yaz||"").trim().toLocaleUpperCase("tr-TR")!=="TEMİZLE")return;
  setBusy(g.key+"|"+al);setMesaj(null);
  try{// güncel değerler sunucudan (yedek eksiksiz olsun)
   const oku=async p=>{try{return(await fbGet(ref(db,p))).val()}catch{return null}};
   if(ART){const[pRec,brd,akt,ft]=await Promise.all([oku(recYol(B,g,al)),oku(`${B}/board/${kat}/${al}`),oku(`${B}/aktifSporcu/${kat}/${al}`),oku(`${B}/flashTrigger`)]);
    const U={},yedek={};if(pRec!=null){yedek[recYol(B,g,al).slice(B.length+1).replace(/\//g,"|")]=pRec;U[recYol(B,g,al)]=null}
    if(brd&&String(brd.athId)===String(g.key))U[`${B}/board/${kat}/${al}`]=null;
    if(akt!=null&&String(akt)===String(g.key))U[`${B}/aktifSporcu/${kat}/${al}`]=null;
    if(ft&&ft.aletId===al&&g.adSoyad&&UPN(ft.adSoyad)===UPN(g.adSoyad))U[`${B}/flashTrigger`]=null;
    if(!Object.keys(U).length){setMesaj({t:"bilgi",m:"Bu alette silinecek kayıt yok."});return}
    const sid=yeniId();U[`${B}/silinenPuanlar/${sid}`]={kat,giris:g.key,alet:al,ad,katAd:katAdS(kat),aletAd:aletAdS(al),eskiPuan:d&&d.t==="tam"?d.v:null,kim,ts:Date.now(),brans:"artistik",veri:yedek};
    await update(ref(db),U);
    try{logAction("score_clear",`Not silindi (Süper Admin): ${ad} · ${katAdS(kat)} · ${aletAdS(al)}${d&&d.t==="tam"?" · eski puan "+d.v:""}`,{user:kim,competitionId:comp,category:kat,athleteId:g.key,athleteName:ad,alet:al,discipline:"artistik",data:{yedek:sid}})}catch{}
    setMesaj({t:"ok",m:`${ad} — ${aletAdS(al)} notu silindi. Yedek alındı.`});return}
   const[pRec,duz,itr,kuy,kam,ft,aS,aSB,aA,aSA]=await Promise.all([oku(`${B}/puanlar/${kat}/${g.key}/${al}`),oku(`${B}/duzeltmeIzni/${kat}/${g.key}/${al}`),oku(`${B}/itirazlar`),oku(`${B}/yayinKuyruk/${kat}__${g.key}__${al}`),oku(`${B}/kameraYukleme`),oku(`${B}/flashTrigger`),oku(`${B}/aktifSporcu/${kat}`),oku(`${B}/aktifSporcuBilgi/${kat}`),oku(`${B}/aktifAlet/${kat}`),oku(`${B}/aktifSporcuAlet/${kat}/${al}`)]);
   const U={},yedek={},ekle=(p,v)=>{if(v==null)return;yedek[p.slice(B.length+1).replace(/\//g,"|")]=v;U[p]=null};
   ekle(`${B}/puanlar/${kat}/${g.key}/${al}`,pRec);ekle(`${B}/duzeltmeIzni/${kat}/${g.key}/${al}`,duz);ekle(`${B}/yayinKuyruk/${kat}__${g.key}__${al}`,kuy);
   Object.entries(itr||{}).forEach(([id,x])=>{if(x&&x.kategori===kat&&String(x.sporcuId)===String(g.key)&&x.alet===al)ekle(`${B}/itirazlar/${id}`,x)});
   Object.entries(kam||{}).forEach(([id,x])=>{if(x&&x.kat===kat&&String(x.athId)===String(g.key)&&(x.alet||"")===al)ekle(`${B}/kameraYukleme/${id}`,x)});
   // canlı durum (geri yüklenmez): aynı rutinin flaşı ve çağrısı
   const ayni=x=>x&&typeof x==="object"&&String(x.id)===String(g.key);
   if(ft&&ft.kategori===kat&&String(ft.id)===String(g.key)&&(ft.alet||al)===al)U[`${B}/flashTrigger`]=null;
   if(ayni(aSA))U[`${B}/aktifSporcuAlet/${kat}/${al}`]=null;
   if(ayni(aS)&&(!aA||aA===al)){U[`${B}/aktifSporcu/${kat}`]=null;ayni(aSB)&&(U[`${B}/aktifSporcuBilgi/${kat}`]=null);aA&&(U[`${B}/aktifAlet/${kat}`]=null)}
   if(!Object.keys(yedek).length&&!Object.keys(U).length){setMesaj({t:"bilgi",m:"Bu alette silinecek kayıt yok."});return}
   const sid=yeniId();U[`${B}/silinenPuanlar/${sid}`]={kat,giris:g.key,alet:al,ad,katAd:katAdS(kat),aletAd:aletAdS(al),eskiPuan:d&&d.t==="tam"?d.v:d&&d.t==="irm"?"IRM "+d.v:null,kim,ts:Date.now(),veri:yedek};
   await update(ref(db),U);
   try{logAction("score_clear",`Not temizlendi (Süper Admin): ${ad} · ${katAdS(kat)} · ${aletAdS(al)}${d&&d.t==="tam"?" · eski puan "+d.v:""}`,{user:kim,competitionId:comp,category:kat,athleteId:g.key,athleteName:ad,alet:al,data:{yedek:sid}})}catch{}
   setMesaj({t:"ok",m:`${ad} — ${aletAdS(al)} notları temizlendi. Yedek alındı.`})}
  catch(er){console.error(er);setMesaj({t:"hata",m:"Temizlenemedi: "+(er?.message||er)})}finally{setBusy("")}};

 const geriYukle=async(id,x)=>{if(busy||!x)return;const B=`${fp}/${comp}`,yol=ART?`${B}/puanlar/${x.kat}/${x.alet}/${x.giris}`:`${B}/puanlar/${x.kat}/${x.giris}/${x.alet}`;
  let simdi=null;try{simdi=(await fbGet(ref(db,yol))).val()}catch{}
  if(!await window.__gxConfirm(`${x.ad}\n${x.katAd||x.kat} — ${x.aletAd||x.alet}${x.eskiPuan?"\nPuan: "+x.eskiPuan:""}\n\n${simdi?"DİKKAT: Bu alette şu an yeni bir kayıt var; geri yükleme onun ÜZERİNE yazar.\n\n":""}Temizlenen notlar geri yüklensin mi?`))return;
  setBusy("geri|"+id);setMesaj(null);
  try{const U={};// yayın kuyruğu ve yayinBekliyor geri yüklenmez: eski puan bir sonraki STOP'ta yeniden ekrana gelmesin
   Object.entries(x.veri||{}).forEach(([k,v])=>{if(/^yayinKuyruk\|/.test(k))return;if(/^puanlar\|/.test(k)&&v&&typeof v==="object"){v={...v};delete v.yayinBekliyor}U[`${B}/${k.replace(/\|/g,"/")}`]=v});
   U[`${B}/silinenPuanlar/${id}/geriYuklendi`]={kim,ts:Date.now()};
   await update(ref(db),U);
   try{logAction("score_restore",`Temizlenen not geri yüklendi (Süper Admin): ${x.ad} · ${x.katAd||x.kat} · ${x.aletAd||x.alet}`,{user:kim,competitionId:comp,category:x.kat,athleteId:x.giris,athleteName:x.ad,alet:x.alet})}catch{}
   setMesaj({t:"ok",m:`${x.ad} — ${x.aletAd||x.alet} notları geri yüklendi.`})}
  catch(er){console.error(er);setMesaj({t:"hata",m:"Geri yüklenemedi: "+(er?.message||er)})}finally{setBusy("")}};

 const S={sayfa:{minHeight:"100vh",background:"#F4F5FA",padding:"18px clamp(12px,3vw,32px)",fontFamily:"inherit"},kart:{background:"#fff",border:"1px solid #E5E7EB",borderRadius:18,padding:16,marginBottom:14},
  btn:{display:"inline-flex",alignItems:"center",gap:6,borderRadius:12,padding:"9px 13px",fontWeight:800,fontSize:13.5,cursor:"pointer",border:"1px solid #E2E8F0",background:"#fff",color:"#0F172A",fontFamily:"inherit"},
  sel:{padding:"10px 12px",borderRadius:12,border:"1px solid #E2E8F0",fontWeight:700,fontFamily:"inherit",fontSize:14,minWidth:0},th:{padding:"8px 10px",fontSize:11,fontWeight:900,letterSpacing:".06em",textTransform:"uppercase",color:"#64748B",textAlign:"left",borderBottom:"1px solid #E5E7EB",whiteSpace:"nowrap"},td:{padding:"7px 10px",borderBottom:"1px solid #F1F5F9",fontSize:13.5,verticalAlign:"middle"}};
 const ust=e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:12,marginBottom:16,flexWrap:"wrap"},children:[e.jsx("button",{type:"button",onClick:()=>history.back(),style:{...S.btn,padding:8},children:MI("arrow_back")}),
  e.jsx("div",{style:{width:42,height:42,borderRadius:12,display:"grid",placeItems:"center",background:"linear-gradient(135deg,#DC2626,#7F1D1D)",color:"#fff"},children:MI("delete_sweep",{fontSize:22})}),
  e.jsxs("div",{style:{flex:1,minWidth:200},children:[e.jsx("div",{style:{fontWeight:900,fontSize:"1.15rem"},children:__T("Not Silme")}),e.jsx("div",{style:{fontSize:".8rem",color:"#64748B",fontWeight:700},children:__T("Süper Admin · bir sporcunun bir aletteki notlarını siler; sporcu o alette hiç yarışmamış gibi olur")})]})]});
 if(!SA)return e.jsxs("div",{style:S.sayfa,children:[ust,e.jsxs("div",{style:{...S.kart,display:"flex",gap:10,alignItems:"center",color:"#B91C1C",fontWeight:800},children:[MI("lock"),__T("Bu ekran yalnız Süper Admin hesabında açılır.")]})]});

 const silL=Object.entries(sil).filter(([,x])=>x&&typeof x==="object").sort((a,b)=>(+b[1].ts||0)-(+a[1].ts||0));
 const hucre=(g,al)=>{const rec=recOf(g,al),d=durumOf(rec),me=busy===g.key+"|"+al;
  return e.jsx("td",{style:{...S.td,textAlign:"center",whiteSpace:"nowrap"},children:d?e.jsxs("div",{style:{display:"inline-flex",alignItems:"center",gap:6},children:[
   e.jsx("span",{style:{fontWeight:900,fontVariantNumeric:"tabular-nums",color:d.t==="tam"?"#0F172A":d.t==="irm"?"#B91C1C":"#B45309"},title:d.t==="kismi"?__T("Hakem notları girilmiş, puan tamamlanmamış"):d.yb?__T("Yayın bekliyor"):"",children:d.t==="tam"?d.v+(d.yb?" ⏳":""):d.t==="irm"?d.v:__T("kısmi")}),
   e.jsx("button",{type:"button",disabled:!!busy,onClick:()=>temizle(g,al),title:__T("Bu aletteki notları temizle"),style:{border:"1px solid #FECACA",background:me?"#FEE2E2":"#fff",color:"#B91C1C",borderRadius:8,padding:"3px 6px",cursor:busy?"wait":"pointer",display:"inline-flex",alignItems:"center"},children:MI(me?"hourglass_top":"delete_sweep",{fontSize:16})})]}):e.jsx("span",{style:{color:"#CBD5E1",fontWeight:800},children:"—"})},al)};
 return e.jsxs("div",{style:S.sayfa,children:[ust,
  e.jsxs("div",{style:{...S.kart,display:"flex",gap:10,flexWrap:"wrap",alignItems:"center"},children:[
   e.jsxs("select",{value:comp,onChange:ev=>{setComp(ev.target.value);setMesaj(null)},style:{...S.sel,flex:"2 1 280px"},children:[e.jsx("option",{value:"",children:comps?__T("Yarışma seçin…"):__T("Yükleniyor…")}),...(comps||[]).map(c=>e.jsx("option",{value:c.id,children:c.isim},c.id))]}),
   comp?e.jsxs("select",{value:kat,onChange:ev=>{setKat(ev.target.value);setMesaj(null)},style:{...S.sel,flex:"1 1 220px"},children:[e.jsx("option",{value:"",children:__T("Kategori seçin…")}),e.jsx("optgroup",{label:__T("Kategoriler"),children:katL.filter(x=>!x.f).map(x=>e.jsx("option",{value:x.k,children:x.ad},x.k))}),katL.some(x=>x.f)?e.jsx("optgroup",{label:__T("Finaller"),children:katL.filter(x=>x.f).map(x=>e.jsx("option",{value:x.k,children:x.ad},x.k))}):null]}):null,
   kat?e.jsx("input",{value:ara,onChange:ev=>setAra(ev.target.value),placeholder:__T("Sporcu / kulüp / ülke ara…"),style:{...S.sel,flex:"1 1 200px"}}):null]}),
  e.jsxs("div",{style:{...S.kart,background:"#FEF2F2",borderColor:"#FECACA",color:"#7F1D1D",fontSize:13,fontWeight:700,lineHeight:1.5,display:"flex",gap:10},children:[MI("warning",{color:"#DC2626"}),e.jsx("div",{children:ART?__T("Silinen alette puan kaydı ve hakem notları (D, E, bonus, tarafsız kesinti) silinir; sporcu o alette çağrılıysa ya da hakem tablosunda duruyorsa onlar da kalkar. Sıralamalar ve canlı skor hemen güncellenir. Her silmenin yedeği alınır ve aşağıdan geri yüklenebilir."):__T("Temizlenen alette puan kaydı, hakem notları, kesinti ve süre/çizgi kayıtları, itirazlar, not düzeltme izinleri, yayın kuyruğu ve video bağlantısı silinir; sporcu o alette çağrılıysa çağrı da kalkar. Sıralamalar, canlı skor ve seyirci sitesi hemen güncellenir. Her temizlemenin yedeği alınır ve aşağıdan geri yüklenebilir. Drive'daki video dosyası silinmez.")})]}),
  mesaj?e.jsxs("div",{style:{...S.kart,display:"flex",gap:8,alignItems:"center",fontWeight:800,color:mesaj.t==="ok"?"#15803D":mesaj.t==="hata"?"#B91C1C":"#475569",borderColor:mesaj.t==="ok"?"#BBF7D0":mesaj.t==="hata"?"#FECACA":"#E5E7EB"},children:[MI(mesaj.t==="ok"?"check_circle":mesaj.t==="hata"?"error":"info"),mesaj.m]}):null,
  kat?e.jsxs("div",{style:S.kart,children:[
   finVar?e.jsx("div",{style:{fontSize:12.5,fontWeight:800,color:"#B45309",background:"#FFFBEB",border:"1px solid #FDE68A",borderRadius:10,padding:"6px 10px",marginBottom:10},children:"⚠ "+__T("Bu kategorinin finalleri oluşturulmuş. Eleme notu temizlenirse final listesi kendiliğinden değişmez; gerekirse finali yeniden oluşturun.")}):null,
   !spor||!puan?e.jsx("div",{style:{color:"#64748B",fontWeight:700},children:__T("Yükleniyor…")}):!satirlar.length?e.jsx("div",{style:{color:"#94A3B8",fontWeight:700},children:__T("Sporcu bulunamadı.")}):
   e.jsx("div",{style:{overflowX:"auto"},children:e.jsxs("table",{style:{width:"100%",borderCollapse:"collapse"},children:[
    e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{style:S.th,children:"#"}),e.jsx("th",{style:S.th,children:__T("Sporcu")}),e.jsx("th",{style:S.th,children:__T("Kulüp / Ülke")}),...aletler.map(a=>e.jsx("th",{style:{...S.th,textAlign:"center"},children:e.jsxs("div",{style:{display:"inline-flex",flexDirection:"column",alignItems:"center",gap:3},children:[aletImg(a)?e.jsx("img",{src:aletImg(a),alt:"",style:{width:34,height:34,objectFit:"contain"}}):null,aletAdS(a)]})},a))]})}),
    e.jsx("tbody",{children:satirlar.map((g,i)=>e.jsxs("tr",{style:{background:i%2?"#FAFAFD":"#fff"},children:[e.jsx("td",{style:{...S.td,color:"#94A3B8",fontWeight:800},children:g.start||i+1}),
     e.jsxs("td",{style:{...S.td,fontWeight:800},children:[g.ad,g.uyeler.length?e.jsx("div",{style:{fontSize:11.5,color:"#64748B",fontWeight:600},children:g.uyeler.join(", ")}):null]}),
     e.jsx("td",{style:{...S.td,color:"#475569",fontWeight:700},children:[g.ulke,g.kulup&&g.kulup!==g.ad?g.kulup:""].filter(Boolean).join(" · ")||"—"}),...aletler.map(a=>hucre(g,a))]},g.key))})]})})]}):null,
  comp?e.jsxs("div",{style:S.kart,children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:6,fontSize:12,fontWeight:900,letterSpacing:".08em",color:"#64748B",textTransform:"uppercase",marginBottom:10},children:[MI("history",{fontSize:17}),__T("Temizlenen notlar")+" · "+silL.length]}),
   silL.length?e.jsx("div",{style:{display:"grid",gap:6},children:silL.slice(0,60).map(([id,x])=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10,flexWrap:"wrap",padding:"8px 10px",borderRadius:12,border:"1px solid #EEF0F4",background:x.geriYuklendi?"#F0FDF4":"#fff"},children:[
    e.jsxs("div",{style:{flex:"1 1 260px",minWidth:0},children:[e.jsx("div",{style:{fontWeight:800},children:x.ad}),e.jsx("div",{style:{fontSize:12,color:"#64748B",fontWeight:700},children:[x.katAd||x.kat,x.aletAd||x.alet,x.eskiPuan?__T("puan")+" "+x.eskiPuan:null,zaman(x.ts),x.kim].filter(Boolean).join(" · ")})]}),
    x.geriYuklendi?e.jsx("span",{style:{fontSize:12,fontWeight:800,color:"#15803D"},children:"✓ "+__T("geri yüklendi")+" · "+zaman(x.geriYuklendi.ts)}):
    e.jsxs("button",{type:"button",disabled:!!busy,onClick:()=>geriYukle(id,x),style:{...S.btn,padding:"6px 10px",fontSize:12.5,color:"#1D4ED8",borderColor:"#BFDBFE"},children:[MI(busy==="geri|"+id?"hourglass_top":"restore",{fontSize:16}),__T("Geri yükle")]})]},id))}):e.jsx("div",{style:{color:"#94A3B8",fontWeight:700,fontSize:13.5},children:__T("Bu yarışmada henüz temizlenen not yok.")})]}):null]});
}
