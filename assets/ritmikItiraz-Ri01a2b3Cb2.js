import{d as db,l as logAction}from"./main-C2LpyYUGCb2.js";import{k as ref,l as get,m as update}from"./vendor-firebase-940mxgRVCb2.js";
// RİTMİK İTİRAZ — ortak kayıt/karar mantığı (Başhakem puanlama ekranı ve İtiraz Paneli birlikte kullanır).
// FIG itiraz akışı (TR Art. 8.5–8.6, CoP §3.9.4): yalnız D puanı (DB ve DA ayrı itiraz), puan gösteriminden sonra 2 dk;
// ücret kulüp başına 1. CHF 300 · 2. CHF 500 · 3.+ CHF 1000 (kabulde iade). Zaman/çizgi cezası incelemesi ücretsiz. Finallerde sonraki puandan önce çözülür.
//  <yarışma>/itirazlar/<id> = {kategori, sporcuId, sporcuAd, kulup, il, alet, aletAd, tur, eskiDeger, eskiSonuc, puanZamani, talepZamani, gecenSn,
//                              sureIcinde, ucretKademe, ucret, paraBirimi, not, durum:beklemede|kabul|red|iptal, olusturan, yeniDeger, yeniSonuc, kararNot, kararVeren, kararZamani}
//  <yarışma>/puanlar/<kat>/<sporcu>/<alet>/itirazDurum = beklemede|kabul|red
export const itAd={DB:"DB",DA:"DA",ZAMAN:"Zaman",CIZGI:"Çizgi"},itTur={DB:"DB — Vücut Zorluğu",DA:"DA — Alet Zorluğu",ZAMAN:"Zaman cezası incelemesi",CIZGI:"Çizgi cezası incelemesi"};
export const itSaat=t=>t?new Date(t).toLocaleTimeString("tr-TR",{hour:"2-digit",minute:"2-digit",second:"2-digit"}):"—";
export const itDurum={beklemede:["İncelemede","bek"],kabul:["Kabul — puan değişti","ok"],red:["Reddedildi — puan aynı","red"],iptal:["Geri çekildi","ops"]};
const n=v=>parseFloat(v)||0;
// itiraz anındaki mevcut değer
export const itEski=(rec,t)=>t==="DB"?n(rec?.dbScore??rec?.db):t==="DA"?n(rec?.daScore??rec?.da):t==="ZAMAN"?n(rec?.penaltyZaman??rec?.tPanel?.zaman):n(rec?.penaltyCizgi1)+n(rec?.penaltyCizgi2);
// kulübün kaçıncı D itirazı → ücret kademesi
export const itUcret=(all,kulup)=>{const k=String(kulup||"").trim(),say=(all||[]).filter(x=>(x.tur==="DA"||x.tur==="DB")&&String(x.kulup||"").trim()===k&&x.durum!=="iptal").length,kad=Math.min(3,say+1);return{kad,ucr:[0,300,500,1000][kad]}};
// yeni itiraz kaydı (Başhakem ekranındaki kayıtla aynı alanlar)
export async function itirazOlustur(ze,la,{kat,ath,alet,aletAd,rec,tur,not,sureIcinde,gecenSn,all,usr}){
 const D=tur==="DA"||tur==="DB",kul=String(ath.okul||ath.kulup||"").trim(),ad=ath.ad||ath.soyad?`${ath.ad||""} ${ath.soyad||""}`.trim():ath.name||"",{kad,ucr}=itUcret(all,kul);
 const id="it"+Date.now().toString(36)+Math.random().toString(36).slice(2,6),o={kategori:kat,sporcuId:ath.id,sporcuAd:ad,kulup:kul,il:ath.il||"",alet,aletAd,tur,eskiDeger:+itEski(rec,tur).toFixed(3),eskiSonuc:+n(rec?.sonuc).toFixed(3),puanZamani:rec?.timestamp||null,talepZamani:Date.now(),gecenSn:gecenSn??null,sureIcinde:!!sureIcinde,ucretKademe:D?kad:0,ucret:D?ucr:0,paraBirimi:"CHF",not:(not||"").trim()||null,durum:"beklemede",olusturan:usr};
 const U={[`${ze}/${la}/itirazlar/${id}`]:o,[`${ze}/${la}/puanlar/${kat}/${ath.id}/${alet}/itirazDurum`]:"beklemede"};
 try{const ft=(await get(ref(db,`${ze}/${la}/flashTrigger`))).val();if(ft&&ft.id===ath.id&&ft.alet===alet&&ft.kategori===kat){U[`${ze}/${la}/flashTrigger/itiraz`]="beklemede";U[`${ze}/${la}/flashTrigger/itirazTur`]=tur}}catch{}
 await update(ref(db),U);
 try{logAction("score_inquiry",`İtiraz: ${tur} · ${ad} · ${aletAd} · ${D?kad+". itiraz, CHF "+ucr:"ücretsiz"}`+(sureIcinde?"":" · süre sonrası"),{user:usr,competitionId:la,category:kat,athleteId:ath.id,athleteName:ad,alet,oldValue:o.eskiDeger,discipline:"ritmik",data:{itirazId:id,...o}})}catch{}
 return id}
// karar: kabul (yeni değer + puan/sonuç güncellenir) · red · iptal (geri çekildi)
export async function itirazKarar(ze,la,it,karar,yeni,kn,usr,opt={}){const yayinla=opt.yayinla!==!1;const base=`${ze}/${la}/puanlar/${it.kategori}/${it.sporcuId}`,rec=(await get(ref(db,base))).val()||{},ar=rec[it.alet]||{},G={},P=`${ze}/${la}/itirazlar/${it.id}`;let yS=n(ar.sonuc),yD=null;
 if(karar==="kabul"){const y=+(+yeni).toFixed(3);yD=y;
  if(it.tur==="DB"||it.tur==="DA"){const f=it.tur==="DB"?"dbScore":"daScore",k=it.tur==="DB"?"db":"da",es=n(ar[f]??ar[k]),fk=y-es;G[`${base}/${it.alet}/${f}`]=y,G[`${base}/${it.alet}/${k}`]=y,G[`${base}/${it.alet}/dScore`]=+(n(ar.dScore)+fk).toFixed(3),yS=+(n(ar.sonuc)+fk).toFixed(3)}
  else{const es=it.tur==="ZAMAN"?n(ar.penaltyZaman):n(ar.penaltyCizgi1)+n(ar.penaltyCizgi2),fk=y-es;it.tur==="ZAMAN"?G[`${base}/${it.alet}/penaltyZaman`]=y:(G[`${base}/${it.alet}/penaltyCizgi1`]=y,G[`${base}/${it.alet}/penaltyCizgi2`]=0);G[`${base}/${it.alet}/penaltyTotal`]=+(n(ar.penaltyTotal)+fk).toFixed(3),yS=+(n(ar.sonuc)-fk).toFixed(3)}
  G[`${base}/${it.alet}/sonuc`]=yS;let tot=0;Object.entries(rec).forEach(([k,v])=>{v&&typeof v==="object"&&!Array.isArray(v)&&v.durum==="tamamlandi"&&!v.irm&&(tot+=k===it.alet?yS:n(v.sonuc))});G[`${base}/sonuc`]=+tot.toFixed(3)}
 G[`${base}/${it.alet}/itirazDurum`]=karar==="iptal"?null:karar;
 Object.assign(G,{[P+"/durum"]:karar,[P+"/yeniDeger"]:yD,[P+"/yeniSonuc"]:karar==="kabul"?yS:n(ar.sonuc),[P+"/kararNot"]:kn||null,[P+"/kararVeren"]:usr,[P+"/kararZamani"]:Date.now()});
 let ft=null;try{ft=(await get(ref(db,`${ze}/${la}/flashTrigger`))).val()}catch{}const ayni=ft&&ft.id===it.sporcuId&&ft.alet===it.alet&&ft.kategori===it.kategori;
 if(karar!=="kabul"&&ayni){G[`${ze}/${la}/flashTrigger/itiraz`]=karar==="red"?"red":null;G[`${ze}/${la}/flashTrigger/itirazTur`]=karar==="red"?it.tur:null}
 await update(ref(db),G);
 // KABUL → güncel puan yeniden yayınlanır (Sporcu Kartı / canlı skor). Başhakem yayınıyla aynı yük + sıra.
 if(karar==="kabul"&&yayinla){try{const kp=(await get(ref(db,`${ze}/${la}/puanlar/${it.kategori}`))).val()||{},me=kp[it.sporcuId]?.[it.alet]||{},sk=x=>[Math.round(n(x?.sonuc)*1e3),Math.round(n(x?.eScore)*1e3),Math.round(n(x?.aScore)*1e3),Math.round((n(x?.daScore)+n(x?.dbScore))*1e3)],mk=sk(me);let sira=1;Object.keys(kp).forEach(k=>{if(k===it.sporcuId)return;const x=kp[k]?.[it.alet];if(!x||x.durum!=="tamamlandi"||!(n(x.sonuc)>0))return;const o=sk(x);for(let q=0;q<4;q++)if(o[q]!==mk[q]){o[q]>mk[q]&&sira++;break}});
  let sp={};try{if(!String(it.sporcuId).includes("::"))sp=(await get(ref(db,`${ze}/${la}/sporcular/${it.kategori}/${it.sporcuId}`))).val()||{};else{const pr=String(it.sporcuId).split("::"),ok=pr.slice(1,-1).join("::"),gn=pr[pr.length-1],al=(await get(ref(db,`${ze}/${la}/sporcular/${it.kategori}`))).val()||{};sp=Object.values(al).find(x=>x&&String(x.okul||x.kulup||"")===ok&&String(x.grupNo??1)===gn)||{}}}catch{}
  await update(ref(db),{[`${ze}/${la}/flashTrigger`]:{sira:mk[0]>0?sira:null,kategori:it.kategori,adSoyad:it.sporcuAd||"",kulup:it.kulup||"",ulke:sp.ulke||null,bib:sp.bib||null,id:it.sporcuId,alet:it.alet,aletAd:it.aletAd||it.alet,da:n(me.daScore),db:n(me.dbScore),a:n(me.aScore),e:n(me.eScore),pen:n(me.penaltyTotal),total:n(me.sonuc),isRitmik:!0,itiraz:"kabul",itirazTur:it.tur,oncekiTotal:n(ar.sonuc),timestamp:Date.now()}})}catch{}}
 try{logAction("score_inquiry_decision",`İtiraz ${karar==="kabul"?"KABUL":karar==="red"?"RED":"GERİ ÇEKİLDİ"}: ${it.tur} · ${it.sporcuAd} · ${it.aletAd}`+(karar==="kabul"?` · ${it.eskiDeger} → ${yD} · sonuç ${n(ar.sonuc).toFixed(3)} → ${yS.toFixed(3)}`:""),{user:usr,competitionId:la,category:it.kategori,athleteId:it.sporcuId,athleteName:it.sporcuAd,alet:it.alet,oldValue:it.eskiDeger,newValue:yD,discipline:"ritmik",data:{itirazId:it.id,karar,eskiSonuc:n(ar.sonuc),yeniSonuc:yS,ucret:it.ucret||0,ucretIade:karar==="kabul"&&(it.ucret||0)>0,not:kn||null}})}catch{}}
