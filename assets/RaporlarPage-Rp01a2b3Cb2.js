import"./i18n-Tr01a2b3Cb2.js";import{b as usToast,a as usInit,j as e,d as db,u as usAuth,l as logAction}from"./main-C2LpyYUGCb2.js";import{r as R}from"./vendor-react-Cxw6bqwhCb2.js";import{k as ref,l as get}from"./vendor-firebase-940mxgRVCb2.js";import{R as RC,a as RA}from"./ritmikCriteriaDefaults-CgOlnfQcCb2.js";import{raKey,raAd}from"./ritmikAlet-Ra01a2b3Cb2.js";import{isIntl,katEN,bayraklarPng,ulkeAd,sporcuUlke}from"./intl-Ul01a2b3Cb2.js";import"./yayinVeri-Yv01a2b3Cb2.js";import"./modulepreload-polyfill-B5Qt9EMXCb2.js";

// RAPORLAR (2026-10-08) — /ritmik/raporlar · yetki anahtarı "raporlar" (yoksa official_report'a bakılır)
//  Yarışma seçimi (birden çok, arşivdekiler dahil) → rapor → seçenekler → ekranda önizleme → PDF / Excel.
//  1) Resmi Sonuçlar: kategori başına genel tasnif (alet puanlarıyla), alet sıralamaları, takım sıralaması, finaller.
//  2) Madalya Tablosu: seçili yarışmaların toplamı; ülke / kulüp / il bazında; altın önce (olimpik) ya da toplam önce.
//  Kurallar Sonuçlar sayfasıyla (FinalsPage) aynı: alet puanı = sonuc; genel = kategori aletlerinin toplamı; eşitlik toplam → E → A → D(DA+DB),
//  yalnız tam eşitlikte aynı sıra; herhangi bir alette IRM olan sporcu genelde sırasız ve en altta; alet sıralamasında IRM sırasız.
//  Takım: ülke (uluslararası) ya da okul/kulüp + il; genç kategoride ilk 3, diğerlerinde ilk 4 sporcu (genel toplamına göre), her alette en iyi 2 puan;
//  teamDeductions düşülür; en az 2 puanlı sporcu; takimSonuclari:false ise yok. Madalya: genel (genel final varsa final), alet finalleri, takım.
const BASE="ritmik_yarismalar";
const V=()=>globalThis.GXYV||self.GXYV;
const f3=v=>v==null||v===""||isNaN(v)?"":Number(v).toFixed(3);
const num=v=>{const x=parseFloat(v);return isFinite(x)?x:0};
const YAS=["kucuk","minik","yildiz","genc","buyuk"];
const yasI=k=>{const i=YAS.findIndex(x=>String(k).replace(/^final_/,"").startsWith(x));return i<0?9:i};
const isFin=(kats,k)=>/^final_/.test(k)||kats?.[k]?.final===!0;
const katAdi=(kats,k)=>String(kats?.[k]?.name||kats?.[k]?.ad||k).replace(/^\s*\u{1F3C6}\s*/u,"").trim();
const aletTr=a=>RA[a]?.labelTr||RA[a]?.label||a;
const MI=(n,st)=>e.jsx("span",{className:"material-icons-round",style:{fontSize:18,...st},children:n});
const tarihStr=c=>[c.baslangicTarihi,c.bitisTarihi].filter(Boolean).filter((x,i,a)=>a.indexOf(x)===i).map(t=>{const m=/^(\d{4})-(\d{2})-(\d{2})/.exec(t);return m?m[3]+"."+m[2]+"."+m[1]:t}).join(" – ");
const katAletleri=(kats,k)=>{const d=kats?.[k]||{};const a=Array.isArray(d.aletler)&&d.aletler.length?d.aletler:d.alet?[d.alet]:Array.isArray(RC[k]?.aletler)?RC[k].aletler:[];return a.filter(Boolean)};
const isGrp=(kats,k)=>{const b=String(k).replace(/^final_/,"").split("__")[0],d=kats?.[k]||kats?.[b]||{};return d.grupMu===!0||d.tip==="takim"||/grup|trio|pair|cift|ikili|uclu/.test(b)};

// ---------------- HESAP ----------------
// Bir yarışmanın resmi sonuç bölümleri
function sonucHesapla(C,opt){const Y=V(),kats=C.kategoriler||{},spor=C.sporcular||{},pun=C.puanlar||{},intl=isIntl(C);
 const out=[];const ids=Object.keys(kats).filter(k=>kats[k]&&typeof kats[k]==="object"&&(!opt.kats||!opt.kats.length||opt.kats.includes(String(k).replace(/^final_/,"").split("__")[0])))
  .sort((a,b)=>(isFin(kats,a)-isFin(kats,b))||(yasI(a)-yasI(b))||String(a).localeCompare(String(b)));
 const satirlar=(k,alet)=>{const S=Y.siralama({brans:"ritmik",kats,kat:k,spor:spor[k],puan:pun[k],alet});
  return{tamam:S.tamamlandi,giris:S.girisSayisi,rows:S.satirlar.map(s=>{const g=s.giris,x=s.s||{},r={rank:s.sira,ad:g.ad,soyad:g.soyad||"",kulup:g.kulup||"",ulke:g.ulke||"",il:g.il||"",bib:g.bib||"",takim:g.takim,uyeler:g.uyeler||[],key:g.key,
   total:x.irm&&x.yalnizIrm?null:x.total,e:x.e,a:x.a,d:x.d,da:x.da,db:x.db,pen:x.pen,irm:x.irm||"",tamam:!!x.tamam,done:x.say+"/"+x.adet};
   if(intl)r.ulke=sporcuUlke({ulke:g.ulke},C)||"";
   if(!alet){const p=(pun[k]||{})[g.key];r.apps={};katAletleri(kats,k).forEach(a=>{const z=Y.sonuc("ritmik",kats[k],p,a);r.apps[a]=z?(z.irm&&z.yalnizIrm?z.irm:z.total):null})}
   return r})}};
 // genel tasnifte IRM'li sporcu sırasız → en alta; kalanlar toplam → E → A → D ile yeniden sıralanır
 const genelSira=S=>{const ok=S.rows.filter(r=>!r.irm),irm=S.rows.filter(r=>r.irm),K=r=>[r.total,r.e,r.a,r.d].map(v=>Math.round(num(v)*1e3));
  ok.sort((a,b)=>{const p=K(a),q=K(b);for(let i=0;i<4;i++)if(p[i]!==q[i])return q[i]-p[i];return 0});ok.forEach((r,i)=>{r.rank=i&&K(ok[i-1]).join()===K(r).join()?ok[i-1].rank:i+1});irm.forEach(r=>{r.rank=null});
  return{...S,rows:ok.concat(irm)}};
 ids.forEach(k=>{const fin=isFin(kats,k),al=katAletleri(kats,k),bk=String(k).replace(/^final_/,"").split("__")[0],ad=fin&&kats[bk]?katAdi(kats,bk):katAdi(kats,k).replace(/\s*[—–-]\s*(Genel Tasnif Finali|[^—–-]*Finali)\s*$/i,""),grp=isGrp(kats,k);
  if(fin){const fa=kats[k].alet||String(k).split("__")[1]||null;if(!opt.final)return;
   let S=satirlar(k,fa||null);if(!fa)S=genelSira(S);if(S.rows.length)out.push({tip:fa?"final_alet":"final_aa",kat:k,katAd:ad,alet:fa,grp,aletler:fa?[fa]:al,...S});return}
  if(opt.genel){const S=genelSira(satirlar(k,null));if(S.rows.length)out.push({tip:"aa",kat:k,katAd:ad,grp,aletler:al,...S})}
  if(opt.alet&&al.length>1)al.forEach(a=>{const S=satirlar(k,a);if(S.rows.length)out.push({tip:"alet",kat:k,katAd:ad,alet:a,grp,aletler:[a],...S})});
  if(opt.takim&&!grp&&C.takimSonuclari!==!1){const T=takimHesapla(C,k,intl);if(T.rows.length)out.push({tip:"takim",kat:k,katAd:ad,grp,aletler:al,...T})}});
 return out}

// Takım sıralaması (Sonuçlar sayfasındaki hesapla aynı)
function takimHesapla(C,k,intl){const Y=V(),kats=C.kategoriler||{},spor=C.sporcular?.[k]||{},pun=C.puanlar?.[k]||{},al=katAletleri(kats,k),T={},N=String(k).toLowerCase().includes("genc")?3:4;
 Object.entries(spor).forEach(([id,a])=>{if(!a||typeof a!=="object")return;const ok=intl?(sporcuUlke(a,C)||String(a.okul||a.kulup||"")):String(a.okul||a.kulup||a.il||""),il=intl?"":String(a.il||"");if(!ok.trim())return;
  const key=ok.trim().toLocaleUpperCase("tr-TR")+"|"+il.toLocaleUpperCase("tr-TR"),t=T[key]||(T[key]={ad:ok.trim(),il,ulke:intl?ok.trim():(a.ulke||""),kulup:ok.trim(),uyeler:[]});
  const m={ad:[a.ad,a.soyad].filter(Boolean).join(" "),total:0,ap:{}};al.forEach(x=>{const z=Y.sonuc("ritmik",kats[k],pun[id],x);const v=z&&!z.yalnizIrm?num(z.total):0;m.ap[x]=v;m.total+=v});t.uyeler.push(m)});
 const ded={};Object.values(C.teamDeductions||{}).forEach(x=>{if(x&&x.categoryId===k)ded[String(x.teamName||"").trim().toLocaleUpperCase("tr-TR")]=(ded[String(x.teamName||"").trim().toLocaleUpperCase("tr-TR")]||0)+num(x.amount)});
 const rows=Object.values(T).filter(t=>t.uyeler.filter(m=>m.total>0).length>=2).map(t=>{const sec=[...t.uyeler].sort((p,q)=>q.total-p.total).slice(0,N),apps={};let top=0;
   al.forEach(x=>{const v=sec.map(m=>m.ap[x]||0).sort((p,q)=>q-p).slice(0,2).reduce((p,q)=>p+q,0);apps[x]=Math.round(v*1e3)/1e3;top+=v});
   const d=ded[t.ad.toLocaleUpperCase("tr-TR")]||0;top=Math.round(top*1e3)/1e3;
   return{ad:t.ad,il:t.il,kulup:t.kulup,ulke:t.ulke,uyeler:sec.map(m=>m.ad),apps,toplam:top,kesinti:d,total:Math.round((top-d)*1e3)/1e3,takim:!0}}).sort((a,b)=>b.total-a.total);
 rows.forEach((r,i)=>{r.rank=i&&Math.round(rows[i-1].total*1e3)===Math.round(r.total*1e3)?rows[i-1].rank:i+1});
 return{rows,tamam:!1,giris:rows.length}}

// Madalya tablosu: bölümlerdeki 1-2-3. sıralar (eşitlerde paylaşılan madalya), gruplama ülke / kulüp / il
function madalyaHesapla(liste,opt){const T={},olay=[],say=(anahtar,ad,ulke,rank,yid)=>{if(!anahtar)return;const t=T[anahtar]||(T[anahtar]={ad,ulke,altin:0,gumus:0,bronz:0,toplam:0,yar:new Set()});
  rank===1?t.altin++:rank===2?t.gumus++:t.bronz++;t.toplam++;t.yar.add(yid)};
 liste.forEach(({C,bol})=>{const intl=isIntl(C);
  const finVar=new Set(bol.filter(b=>b.tip==="final_alet").map(b=>String(b.kat).replace(/^final_/,"").split("__")[0]+"|"+b.alet)),finAA=new Set(bol.filter(b=>b.tip==="final_aa").map(b=>String(b.kat).replace(/^final_/,"")));
  bol.forEach(b=>{let ok=!1;
   if(b.tip==="aa")ok=opt.mGenel&&!finAA.has(b.kat);
   else if(b.tip==="final_aa")ok=opt.mGenel;
   else if(b.tip==="final_alet")ok=opt.mAlet;
   else if(b.tip==="alet")ok=opt.mAlet&&opt.mAletElem&&!finVar.has(b.kat+"|"+b.alet);
   else if(b.tip==="takim")ok=opt.mTakim;
   if(!ok)return;olay.push({C,b,m:b.rows.filter(r=>r.rank>=1&&r.rank<=3&&!r.irm)});
   b.rows.forEach(r=>{if(!(r.rank>=1&&r.rank<=3)||r.irm)return;const g=opt.grup==="ulke"?(r.ulke||""):opt.grup==="il"?(r.il||""):(r.kulup||r.il||"");say(g,g,r.ulke||"",r.rank,C._id)})})});
 const rows=Object.values(T).map(t=>({...t,yar:t.yar.size}));
 rows.sort(opt.mSira==="toplam"?(a,b)=>b.toplam-a.toplam||b.altin-a.altin||b.gumus-a.gumus||b.bronz-a.bronz||a.ad.localeCompare(b.ad,"tr"):(a,b)=>b.altin-a.altin||b.gumus-a.gumus||b.bronz-a.bronz||a.ad.localeCompare(b.ad,"tr"));
 const k=r=>opt.mSira==="toplam"?[r.toplam,r.altin,r.gumus,r.bronz].join():[r.altin,r.gumus,r.bronz].join();
 rows.forEach((r,i)=>{r.rank=i&&k(rows[i-1])===k(r)?rows[i-1].rank:i+1});
 rows.olay=olay;return rows}

// ---------------- SAYFA ----------------
const RAPORLAR=[
 {id:"sonuc",ic:"format_list_numbered",t:"Resmi Sonuçlar",d:"Genel tasnif, alet, takım ve final sonuçları — PDF / Excel"},
 {id:"madalya",ic:"military_tech",t:"Madalya Tablosu",d:"Ülke, kulüp ya da il bazında; birden çok yarışmanın toplamı"},
 {id:"hakem",ic:"balance",t:"Hakem Sapma Analizi",d:"Panel ortalamasından fark, D farkları",yakinda:!0},
 {id:"itiraz",ic:"gavel",t:"Not Değişikliği ve İtirazlar",d:"Başhakem düzeltmeleri, itiraz kararları",yakinda:!0},
 {id:"zaman",ic:"schedule",t:"Zaman Çizelgesi",d:"Planlanan / gerçekleşen, rotasyon süreleri",yakinda:!0},
 {id:"sporcu",ic:"trending_up",t:"Sporcu Karşılaştırma",d:"Yarışmalar arası performans",yakinda:!0},
 {id:"katilim",ic:"groups",t:"Katılım İstatistikleri",d:"Kulüp, il ve ülke katılımı",yakinda:!0},
 {id:"video",ic:"video_library",t:"Video Arşivi Durumu",d:"Eksik / yüklenmiş videolar",yakinda:!0},
 {id:"log",ic:"history",t:"İşlem Kaydı",d:"Kim, ne zaman, neyi değiştirdi",yakinda:!0}];

function Raporlar(){
 const{toast}=usToast();usInit();const{currentUser:U}=usAuth()||{};const kim=U?.adSoyad||U?.kullaniciAdi||"";
 const[liste,setListe]=R.useState(null),[secili,setSecili]=R.useState([]),[ara,setAra]=R.useState(""),[arsiv,setArsiv]=R.useState(!0),
       [rapor,setRapor]=R.useState("sonuc"),[veri,setVeri]=R.useState({}),[yuk,setYuk]=R.useState(!1),[busy,setBusy]=R.useState(""),
       [opt,setOpt]=R.useState({genel:!0,alet:!0,takim:!1,final:!0,kats:[],dil:"oto",grup:"oto",mGenel:!0,mAlet:!0,mAletElem:!1,mTakim:!0,mSira:"altin"});
 const so=(k,v)=>setOpt(o=>({...o,[k]:v}));
 // yarışma listesi: yalnız başlık alanları (shallow + alan okuma) — kullanıcının yarışma / il kısıtına uyar
 R.useEffect(()=>{(async()=>{try{const B="https://analig-default-rtdb.firebaseio.com/"+BASE,ks=Object.keys(await(await fetch(B+".json?shallow=true")).json()||{});
   const yerel=/^(localhost|127\.0\.0\.1)$/.test(location.hostname),AL=["isim","il","baslangicTarihi","bitisTarihi","arsivli","tur","uluslararasi"];
   const L=await Promise.all(ks.filter(k=>!/^zz/.test(k)||yerel).map(async k=>{const o={_id:k};await Promise.all(AL.map(async a=>{try{o[a]=(await get(ref(db,BASE+"/"+k+"/"+a))).val()}catch{}}));return o}));
   const Y=U&&U.rolAdi!=="Super Admin"&&U.kullaniciAdi!=="admin"&&U.yarismalar&&typeof U.yarismalar==="object"&&Object.keys(U.yarismalar).length?U.yarismalar:null,il=U&&U.rolAdi!=="Super Admin"&&U.kullaniciAdi!=="admin"&&!Y?U.il:null;
   setListe(L.filter(c=>c.isim&&(!Y||Y[c._id])&&(!il||String(c.il||"").toLocaleUpperCase("tr-TR")===String(il).toLocaleUpperCase("tr-TR"))).sort((a,b)=>String(b.baslangicTarihi||"").localeCompare(String(a.baslangicTarihi||""))))}catch(er){console.error(er);setListe([])}})()},[]);
 // seçilen yarışmaların tam verisi
 R.useEffect(()=>{const eksik=secili.filter(k=>!veri[k]);if(!eksik.length)return;setYuk(!0);
  Promise.all(eksik.map(async k=>[k,{...((await get(ref(db,BASE+"/"+k))).val()||{}),_id:k}])).then(L=>setVeri(v=>{const n={...v};L.forEach(([k,c])=>n[k]=c);return n})).catch(()=>toast(__T("Hata oluştu."),"error")).finally(()=>setYuk(!1))},[secili]);
 const comps=secili.map(k=>veri[k]).filter(Boolean);
 const intlHepsi=comps.length&&comps.every(isIntl);
 const EN=opt.dil==="en"||(opt.dil==="oto"&&comps.length>0&&comps.every(c=>isIntl(c)&&c.ciktiDili!=="tr"));
 const grup=opt.grup==="oto"?(intlHepsi?"ulke":"kulup"):opt.grup;
 // kategori seçenekleri (seçili yarışmaların temel kategorileri)
 const katSec=R.useMemo(()=>{const m=new Map();comps.forEach(C=>Object.keys(C.kategoriler||{}).forEach(k=>{if(isFin(C.kategoriler,k))return;m.has(k)||m.set(k,katAdi(C.kategoriler,k))}));return[...m.entries()].sort((a,b)=>yasI(a[0])-yasI(b[0])||a[1].localeCompare(b[1],"tr"))},[comps.map(c=>c._id).join()]);
 const sonuc=R.useMemo(()=>{if(!V())return[];return comps.map(C=>({C,bol:sonucHesapla(C,rapor==="madalya"?{genel:!0,alet:!0,takim:opt.mTakim,final:!0,kats:opt.kats}:opt)}))},[comps.map(c=>c._id).join(),rapor,JSON.stringify(opt)]);
 const madalya=R.useMemo(()=>rapor==="madalya"?madalyaHesapla(sonuc,{...opt,grup}):[],[sonuc,rapor,grup]);

 // ---- dil yardımcıları (çıktı) ----
 const L=(tr,en)=>EN?en:tr,kA=t=>EN?katEN(t):t,aA=a=>EN?(raAd(a,!0)||aletTr(a)):aletTr(a),UP=t=>String(t||"").toLocaleUpperCase(EN?"en":"tr-TR");
 const bolBaslik=b=>{const k=kA(b.katAd);return b.tip==="aa"?k+" — "+L(b.grp?"Grup Genel Tasnif":"Bireysel Genel Tasnif",b.grp?"Group All-Around":"Individual All-Around")
   :b.tip==="alet"?k+" — "+aA(b.alet)+L(" (Eleme)"," (Qualification)"):b.tip==="takim"?k+" — "+L("Takım Sıralaması","Team Ranking")
   :b.tip==="final_aa"?k+" — "+L("Genel Tasnif Finali","All-Around Final"):k+" — "+aA(b.alet)+" "+L("Finali","Final")};
 const temsil=r=>intlHepsi?(r.ulke||""):r.kulup||"";
 const adYaz=r=>r.takim?r.ad:[UP(r.soyad),r.soyad?String(r.ad||"").replace(new RegExp("\\s*"+String(r.soyad).replace(/[.*+?^${}()|[\]\\]/g,"\\$&")+"$"),""):r.ad].filter(Boolean).join(" ");
 const satirAd=r=>r.takim?r.ad:(r.soyad?UP(r.soyad)+" "+String(r.ad||"").replace(r.soyad,"").trim():r.ad);
 const sutunlar=b=>b.tip==="aa"||b.tip==="final_aa"?[...b.aletler.map(a=>({b:aA(a),f:r=>r.apps&&r.apps[a]!=null?(typeof r.apps[a]==="string"?r.apps[a]:f3(r.apps[a])):"—"})),{b:L("TOPLAM","TOTAL"),f:r=>r.irm&&r.total==null?r.irm:f3(r.total),t:1}]
   :b.tip==="takim"?[...b.aletler.map(a=>({b:aA(a),f:r=>r.apps[a]!=null?f3(r.apps[a]):"—"})),...(b.rows.some(r=>r.kesinti)?[{b:L("KESİNTİ","DED."),f:r=>r.kesinti?"−"+f3(r.kesinti):""}]:[]),{b:L("TOPLAM","TOTAL"),f:r=>f3(r.total),t:1}]
   :[{b:"DA",f:r=>f3(r.da)},{b:"DB",f:r=>f3(r.db)},{b:"A",f:r=>f3(r.a)},{b:"E",f:r=>f3(r.e)},{b:L("CEZA","PEN."),f:r=>r.pen?"−"+f3(r.pen):""},{b:L("TOPLAM","TOTAL"),f:r=>r.irm&&r.total==null?r.irm:f3(r.total),t:1}];

 // ---- PDF ----
 const pdfAl=async()=>{if(busy||!comps.length)return;setBusy("pdf");toast(__T("PDF hazırlanıyor…"),"info");
  try{const jsPDF=await import("./jspdf.es.min-gArCfqm1Cb2.js").then(z=>z.j?.jsPDF||z.E),atM=await import("./jspdf.plugin.autotable-KFqWVtFsCb2.js"),at=atM.default||atM;
   const yatay=rapor==="sonuc"&&sonuc.some(x=>x.bol.some(b=>(b.tip==="aa"||b.tip==="final_aa")&&b.aletler.length>4)),d=new jsPDF(yatay?"landscape":"portrait","mm","a4");
   let FT="helvetica";try{const{R:r0,B:b0}=await import("./fontTR-Fn01a2b3Cb2.js");d.addFileToVFS("Roboto.ttf",r0);d.addFont("Roboto.ttf","Roboto","normal");d.addFileToVFS("Roboto-Bold.ttf",b0);d.addFont("Roboto-Bold.ttf","Roboto","bold");FT="Roboto"}catch{}
   const img=async u=>{try{const b=await(await fetch(u)).blob();const du=await new Promise(K=>{const O=new FileReader;O.onloadend=()=>K(O.result);O.readAsDataURL(b)});const im=new Image;await new Promise(r=>{im.onload=r;im.onerror=r;im.src=du});return im.naturalWidth?{d:du,r:im.naturalWidth/im.naturalHeight}:null}catch{return null}};
   const tcf=await img("/logo.png"),W=yatay?297:210,H=yatay?210:297,M=12,P1=[236,72,153],P2=[139,92,246],INK=[15,23,42],MUT=[100,116,139];
   const FL=intlHepsi?await bayraklarPng(rapor==="madalya"?madalya.map(r=>r.ulke):sonuc.flatMap(x=>x.bol.flatMap(b=>b.rows.map(r=>r.ulke)))):{};
   const serit=(yy,h)=>{const n=60;for(let i=0;i<n;i++){const t=i/(n-1);d.setFillColor(P1[0]+(P2[0]-P1[0])*t,P1[1]+(P2[1]-P1[1])*t,P1[2]+(P2[2]-P1[2])*t);d.rect(i*W/n,yy,W/n+.3,h,"F")}};
   let y=0,sayfa=0,kafa="";
   const ust=async(C,baslik)=>{if(sayfa++)d.addPage();serit(0,3);let lx=M;const lh=16;
    if(tcf){const w=lh*tcf.r;d.addImage(tcf.d,"PNG",lx,8,w,lh,"tcf","FAST");lx+=w+4}
    const ev=C&&C.etkinlikLogo?(C._ev||(C._ev=await img(C.etkinlikLogo))):null;if(ev){const w=Math.min(34,lh*ev.r);d.addImage(ev.d,"PNG",W-M-w,8,w,lh,"ev_"+C._id,"FAST")}
    d.setTextColor(...INK);d.setFont(FT,"bold");d.setFontSize(12.5);d.text(UP(C?C.isim:L("Seçili yarışmalar","Selected competitions")),lx,13.5,{maxWidth:W-lx-M-(ev?38:0)});
    d.setFont(FT,"normal");d.setFontSize(8.5);d.setTextColor(...MUT);d.text(C?[tarihStr(C),C.il||""].filter(Boolean).join("  ·  "):comps.map(c=>c.isim).join(" · ").slice(0,160),lx,19,{maxWidth:W-lx-M});
    kafa=UP(C?C.isim:L("Seçili yarışmalar","Selected competitions"))+"  ·  "+baslik;d.setFont(FT,"bold");d.setFontSize(10);d.setTextColor(...P1);d.text(baslik,lx,25);
    d.setDrawColor(226,232,240);d.setLineWidth(.3);d.line(M,30,W-M,30);y=36};
   const alt=()=>{const n=d.getNumberOfPages();for(let i=1;i<=n;i++){d.setPage(i);serit(H-1.6,1.6);d.setFont(FT,"normal");d.setFontSize(7);d.setTextColor(...MUT);
     d.text(L("Gymexa Score · Türkiye Cimnastik Federasyonu","Gymexa Score · Turkish Gymnastics Federation"),M,H-5);d.text(new Date().toLocaleString(EN?"en-GB":"tr-TR",{dateStyle:"short",timeStyle:"short"})+"   "+i+" / "+n,W-M,H-5,{align:"right"})}};
   const bayrakCiz=(z,kod)=>{const f=kod&&FL[kod];if(f)try{d.addImage(f,"PNG",z.cell.x+2,z.cell.y+(z.cell.height-3.4)/2,4.5,3.4,"fl_"+kod,"FAST")}catch{}};
   const devam=()=>{serit(0,3);d.setFont(FT,"bold");d.setFontSize(7.5);d.setTextColor(...MUT);d.text(kafa,M,10,{maxWidth:W-2*M});d.setDrawColor(226,232,240);d.setLineWidth(.3);d.line(M,13,W-M,13)};
   const tablo=(head,body,o)=>{const p0=d.getNumberOfPages();at(d,{startY:y,margin:{left:M,right:M,top:18,bottom:12},head:[head],body,theme:"plain",
     styles:{font:FT,fontSize:8,cellPadding:{top:1.5,bottom:1.5,left:2,right:2},textColor:INK,lineColor:[238,240,244],lineWidth:{bottom:.25}},
     headStyles:{fontStyle:"bold",fontSize:6.8,textColor:[255,255,255],fillColor:P2},...o,
     didParseCell:z=>{if(z.section==="body"){if(z.row.index%2)z.cell.styles.fillColor=[250,250,253];o.parse&&o.parse(z)}},
     didDrawPage:z=>{if(d.getNumberOfPages()>p0)devam()}});y=d.lastAutoTable.finalY+8};
   const bolumBas=t=>{if(y>H-40){d.addPage();devam();y=18}d.setFillColor(253,242,248);d.roundedRect(M,y,W-2*M,8,2,2,"F");d.setFillColor(...P1);d.roundedRect(M,y,2.2,8,1,1,"F");
    d.setFont(FT,"bold");d.setFontSize(9.5);d.setTextColor(...INK);d.text(UP(t),M+5,y+5.5);y+=11};
   if(rapor==="sonuc"){
    for(const{C,bol}of sonuc){await ust(C,L("RESMİ SONUÇLAR","OFFICIAL RESULTS"));const ic=isIntl(C);
     if(!bol.length){d.setFont(FT,"normal");d.setFontSize(9);d.setTextColor(...MUT);d.text(L("Seçili kapsamda puanı olan sonuç yok.","No scored results in the selected scope."),M,y);y+=8}
     for(const b of bol){bolumBas(bolBaslik(b));const cols=sutunlar(b),HB=b.rows.some(r=>r.bib),uc=1+(HB?1:0)+1;
      const head=[L("SIRA","RANK"),...(HB?["BIB"]:[]),b.tip==="takim"?L("TAKIM","TEAM"):L("SPORCU","GYMNAST"),ic?L("ÜLKE","NOC"):L("KULÜP / İL","CLUB / PROV."),...cols.map(c=>c.b)];
      const body=b.rows.map(r=>[r.rank!=null?String(r.rank):"",...(HB?[String(r.bib||"")]:[]),(b.tip==="takim"?r.ad:satirAd(r))+(r.takim&&r.uyeler&&r.uyeler.length?"\n"+r.uyeler.join(", "):""),ic?(r.ulke||""):(r.takim?(r.il&&UP(r.il)!==UP(r.ad)?UP(r.il):""):UP(r.kulup||r.il)),...cols.map(c=>c.f(r))]);
      const cs={0:{cellWidth:11,halign:"center",fontStyle:"bold"},[uc]:ic?{cellWidth:19,cellPadding:{top:1.5,bottom:1.5,left:8,right:1}}:{cellWidth:32,fontSize:7.2}};cols.forEach((c,i)=>{cs[uc+1+i]={halign:"right",cellWidth:c.t?18:14,fontStyle:c.t?"bold":"normal"}});
      tablo(head,body,{columnStyles:cs,parse:z=>{const r=b.rows[z.row.index];if(r&&r.rank>=1&&r.rank<=3&&z.column.index===0)z.cell.styles.textColor=r.rank===1?[180,130,0]:r.rank===2?[100,116,139]:[180,90,30];if(z.column.index>uc)z.cell.styles.fontSize=7.6},
       didDrawCell:z=>{if(ic&&z.section==="body"&&z.column.index===uc)bayrakCiz(z,b.rows[z.row.index]?.ulke)}})}}
   }else{
    await ust(comps.length===1?comps[0]:null,L("MADALYA TABLOSU","MEDAL TABLE"));
    const gAd=grup==="ulke"?L("ÜLKE","NOC"):grup==="il"?L("İL","PROVINCE"):L("KULÜP","CLUB");
    const head=[L("SIRA","RANK"),gAd,L("ALTIN","GOLD"),L("GÜMÜŞ","SILVER"),L("BRONZ","BRONZE"),L("TOPLAM","TOTAL"),...(comps.length>1?[L("YARIŞMA","COMP.")]:[])];
    const body=madalya.map(r=>[String(r.rank),grup==="ulke"?(r.ad+"  "+(ulkeAd(r.ad,EN?"en":"tr")||"")):UP(r.ad),String(r.altin),String(r.gumus),String(r.bronz),String(r.toplam),...(comps.length>1?[String(r.yar)]:[])]);
    tablo(head,body,{columnStyles:{0:{cellWidth:14,halign:"center",fontStyle:"bold"},1:grup==="ulke"?{cellPadding:{top:1.5,bottom:1.5,left:8,right:1}}:{},2:{halign:"center",cellWidth:20},3:{halign:"center",cellWidth:20},4:{halign:"center",cellWidth:20},5:{halign:"center",cellWidth:20,fontStyle:"bold"},6:{halign:"center",cellWidth:20}},
     parse:z=>{if(z.column.index===2)z.cell.styles.textColor=[180,130,0];if(z.column.index===3)z.cell.styles.textColor=[100,116,139];if(z.column.index===4)z.cell.styles.textColor=[180,90,30]},
     didDrawCell:z=>{if(grup==="ulke"&&z.section==="body"&&z.column.index===1)bayrakCiz(z,madalya[z.row.index]?.ulke||madalya[z.row.index]?.ad)}});
    d.setFont(FT,"normal");d.setFontSize(7.5);d.setTextColor(...MUT);
    d.text(L("Kapsam: ","Scope: ")+[opt.mGenel?L("genel tasnif","all-around"):"",opt.mAlet?L("alet","apparatus")+(opt.mAletElem?L(" (finali olmayan alette eleme sıralaması)"," (qualification where no final)"):""):"",opt.mTakim?L("takım","team"):""].filter(Boolean).join(", ")+"  ·  "+(opt.mSira==="toplam"?L("toplam madalyaya göre","by total medals"):L("altın önceliğine göre (olimpik)","gold first (olympic)")),M,y,{maxWidth:W-2*M});y+=6;
    if(comps.length>1){d.text(L("Yarışmalar: ","Competitions: ")+comps.map(c=>c.isim+(tarihStr(c)?" ("+tarihStr(c)+")":"")).join(" · "),M,y,{maxWidth:W-2*M});y+=8}
    // madalya kazananlar
    const OL=madalya.olay||[];if(OL.length){y+=4;bolumBas(L("Madalya kazananlar","Medallists"));
     const kim=(r,C)=>{const ic=isIntl(C);return (r.takim?r.ad:satirAd(r))+(ic?(r.takim&&r.ad===r.ulke?"":"  ("+(r.ulke||"")+")"):(r.kulup||r.il?"  ("+(r.kulup||r.il)+")":""))};
     const body=OL.map(o=>[(comps.length>1?o.C.isim+" · ":"")+bolBaslik(o.b),...[1,2,3].map(n=>o.m.filter(r=>r.rank===n).map(r=>kim(r,o.C)).join("\n"))]);
     tablo([L("YARIŞMA / ETKİNLİK","EVENT"),L("ALTIN","GOLD"),L("GÜMÜŞ","SILVER"),L("BRONZ","BRONZE")],body,{columnStyles:{0:{cellWidth:62,fontStyle:"bold",fontSize:7.4},1:{fontSize:7.4},2:{fontSize:7.4},3:{fontSize:7.4}}})}}
   alt();
   const ad=(comps.length===1?comps[0].isim:L("Raporlar","Reports")).replace(/[^\wçğıöşüÇĞİÖŞÜ -]+/g,"").trim().replace(/\s+/g,"_").slice(0,60);
   d.save(ad+"_"+(rapor==="sonuc"?L("Resmi_Sonuclar","Official_Results"):L("Madalya_Tablosu","Medal_Table"))+".pdf");toast(__T("PDF indirildi ✓"),"success");
   try{logAction("report_export",`[Ritmik] Rapor PDF: ${rapor} · ${comps.map(c=>c.isim).join(", ")}`.slice(0,480),{user:kim,competitionId:comps[0]?._id,discipline:"ritmik"})}catch{}}
  catch(er){console.error(er);toast(__T("PDF oluşturulamadı: ")+(er?.message||er),"error")}setBusy("")};

 // ---- Excel ----
 const excelAl=async()=>{if(busy||!comps.length)return;setBusy("xlsx");
  try{const X=await import("./vendor-xlsx-CNerDvZXCb2.js"),wb=X.utils.book_new(),adlar=new Set();
   const sayfaAd=t=>{let a=String(t).replace(/[\\/?*[\]:]/g,"-").slice(0,31),i=2;while(adlar.has(a)){a=String(t).replace(/[\\/?*[\]:]/g,"-").slice(0,27)+" ("+i+++")"}adlar.add(a);return a};
   if(rapor==="sonuc"){sonuc.forEach(({C,bol})=>{const ic=isIntl(C),tek=sonuc.length===1;
     bol.forEach(b=>{const cols=sutunlar(b),HB=b.rows.some(r=>r.bib);
      const aoa=[[C.isim],[bolBaslik(b)],[],[L("Sıra","Rank"),...(HB?["BIB"]:[]),b.tip==="takim"?L("Takım","Team"):L("Sporcu","Gymnast"),...(b.tip==="takim"?[L("Sporcular","Members")]:[]),ic?L("Ülke","NOC"):L("Kulüp / İl","Club / Prov."),...(ic?[L("Kulüp / Takım","Club / Team")]:[]),...cols.map(c=>c.b)]];
      b.rows.forEach(r=>aoa.push([r.rank??"",...(HB?[r.bib||""]:[]),b.tip==="takim"?r.ad:satirAd(r),...(b.tip==="takim"?[(r.uyeler||[]).join(", ")]:[]),ic?(r.ulke||""):(r.takim?(r.il&&UP(r.il)!==UP(r.ad)?r.il:""):r.kulup||r.il||""),...(ic?[r.kulup||""]:[]),...cols.map(c=>{const v=c.f(r);return/^−?\d+\.\d{3}$/.test(v)?Number(v.replace("−","-")):v})]));
      const ws=X.utils.aoa_to_sheet(aoa),bas=aoa[3].length-cols.length;Object.keys(ws).forEach(a=>{if(a[0]==="!")return;const c=X.utils.decode_cell(a);if(c.r>3&&c.c>=bas&&ws[a].t==="n")ws[a].z="0.000"});ws["!cols"]=aoa[3].map((h,i)=>({wch:i===0?6:String(h).length>8?Math.max(12,String(h).length+2):i<=2+(HB?1:0)?28:10}));
      X.utils.book_append_sheet(wb,ws,sayfaAd((tek?"":String(C.isim).slice(0,8)+" ")+bolBaslik(b).replace(" — "," ")))})})}
   else{const gAd=grup==="ulke"?L("Ülke","NOC"):grup==="il"?L("İl","Province"):L("Kulüp","Club");
    const aoa=[[L("Madalya Tablosu","Medal Table")],[comps.map(c=>c.isim).join(" · ")],[],[L("Sıra","Rank"),gAd,...(grup==="ulke"?[L("Ülke adı","Country")]:[]),L("Altın","Gold"),L("Gümüş","Silver"),L("Bronz","Bronze"),L("Toplam","Total"),...(comps.length>1?[L("Yarışma sayısı","Competitions")]:[])]];
    madalya.forEach(r=>aoa.push([r.rank,r.ad,...(grup==="ulke"?[ulkeAd(r.ad,EN?"en":"tr")||""]:[]),r.altin,r.gumus,r.bronz,r.toplam,...(comps.length>1?[r.yar]:[])]));
    const ws=X.utils.aoa_to_sheet(aoa);ws["!cols"]=[{wch:6},{wch:32},{wch:18},{wch:8},{wch:8},{wch:8},{wch:8},{wch:10}];X.utils.book_append_sheet(wb,ws,sayfaAd(L("Madalya Tablosu","Medal Table")));
    const ma=[[L("Madalya kazananlar","Medallists")],[],[L("Yarışma","Competition"),L("Etkinlik","Event"),L("Madalya","Medal"),L("Sıra","Rank"),L("Sporcu / Takım","Gymnast / Team"),L("Ülke","NOC"),L("Kulüp / İl","Club / Prov."),L("Puan","Score")]];
    (madalya.olay||[]).forEach(o=>o.m.forEach(r=>ma.push([o.C.isim,bolBaslik(o.b),r.rank===1?L("Altın","Gold"):r.rank===2?L("Gümüş","Silver"):L("Bronz","Bronze"),r.rank,r.takim?r.ad:satirAd(r),r.ulke||"",r.kulup||r.il||"",r.total!=null?Number(f3(r.total)):""])));
    const w2=X.utils.aoa_to_sheet(ma);w2["!cols"]=[{wch:30},{wch:40},{wch:9},{wch:6},{wch:30},{wch:8},{wch:22},{wch:9}];X.utils.book_append_sheet(wb,w2,sayfaAd(L("Madalya kazananlar","Medallists")))}
   if(!wb.SheetNames.length){toast(__T("Seçili kapsamda puanı olan sonuç yok."),"warning");setBusy("");return}
   const buf=X.write(wb,{type:"array",bookType:"xlsx"}),u=URL.createObjectURL(new Blob([buf],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"})),a=document.createElement("a");
   a.href=u;a.download=(comps.length===1?comps[0].isim:"Raporlar").replace(/[^\wçğıöşüÇĞİÖŞÜ -]+/g,"").trim().replace(/\s+/g,"_").slice(0,60)+"_"+(rapor==="sonuc"?L("Resmi_Sonuclar","Official_Results"):L("Madalya_Tablosu","Medal_Table"))+".xlsx";document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),4e3);
   toast(__T("Excel indirildi ✓"),"success");try{logAction("report_export",`[Ritmik] Rapor Excel: ${rapor} · ${comps.map(c=>c.isim).join(", ")}`.slice(0,480),{user:kim,competitionId:comps[0]?._id,discipline:"ritmik"})}catch{}}
  catch(er){console.error(er);toast(__T("Excel oluşturulamadı: ")+(er?.message||er),"error")}setBusy("")};

 // ---- görünüm ----
 const P1="#EC4899",P2="#8B5CF6",G="linear-gradient(135deg,"+P1+","+P2+")",SH="0 1px 2px rgba(15,23,42,.05),0 8px 24px -16px rgba(15,23,42,.22)";
 const S={wrap:{minHeight:"100vh",background:"#F6F7FB",color:"#0F172A",fontFamily:"Nunito,system-ui,-apple-system,sans-serif",paddingBottom:"7rem"},
  top:{position:"sticky",top:0,zIndex:10,background:"linear-gradient(90deg,"+P1+","+P2+") bottom/100% 3px no-repeat,#fff",boxShadow:"0 1px 2px rgba(15,23,42,.05)",padding:"0 1.25rem",minHeight:68,display:"flex",alignItems:"center",gap:".9rem"},
  back:{width:38,height:38,borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",color:"#0F172A",textDecoration:"none",flexShrink:0,border:"1px solid #E2E8F0",background:"#fff",cursor:"pointer"},
  ico:{width:44,height:44,borderRadius:14,display:"grid",placeItems:"center",flexShrink:0,background:G,boxShadow:"0 8px 20px -6px rgba(236,72,153,.55)"},
  in:{maxWidth:1280,margin:"0 auto",padding:"1.1rem 1.25rem",display:"grid",gridTemplateColumns:"minmax(0,340px) minmax(0,1fr)",gap:"1rem",alignItems:"start"},
  card:{background:"#fff",borderRadius:18,padding:"1rem 1.1rem",marginBottom:".9rem",boxShadow:SH},
  h:{display:"flex",alignItems:"center",gap:".55rem",fontWeight:900,fontSize:".95rem",marginBottom:".7rem"},
  hi:{width:30,height:30,borderRadius:10,display:"grid",placeItems:"center",color:"#fff",background:G,flexShrink:0},
  inp:{width:"100%",padding:".6rem .75rem",borderRadius:11,border:"1px solid #E2E8F0",fontFamily:"inherit",fontWeight:700,fontSize:".88rem",boxSizing:"border-box"},
  ghost:{padding:".5rem .8rem",border:"1px solid #E2E8F0",borderRadius:11,fontWeight:800,fontSize:".8rem",cursor:"pointer",color:"#334155",background:"#fff",fontFamily:"inherit",display:"inline-flex",alignItems:"center",gap:".3rem"},
  btn:{padding:".75rem 1.1rem",border:"none",borderRadius:13,fontWeight:900,fontSize:".92rem",cursor:"pointer",color:"#fff",fontFamily:"inherit",display:"inline-flex",alignItems:"center",gap:".4rem"},
  chip:on=>({border:"1px solid "+(on?"#F9A8D4":"#E2E8F0"),background:on?"#FDF2F8":"#fff",color:on?"#9D174D":"#475569",borderRadius:999,padding:".35rem .7rem",fontWeight:800,fontSize:".78rem",cursor:"pointer",fontFamily:"inherit",display:"inline-flex",alignItems:"center",gap:".3rem"}),
  seg:{display:"inline-flex",background:"#F1F5F9",borderRadius:10,padding:2,gap:2,flexWrap:"wrap"},
  segb:on=>({border:0,borderRadius:8,padding:".32rem .6rem",fontFamily:"inherit",fontWeight:900,fontSize:".76rem",cursor:"pointer",background:on?"#fff":"transparent",color:on?"#BE185D":"#64748B",boxShadow:on?"0 1px 3px rgba(15,23,42,.12)":"none"}),
  lbl:{fontSize:".7rem",fontWeight:900,letterSpacing:".08em",color:"#64748B",textTransform:"uppercase",margin:".7rem 0 .4rem"},
  th:{fontSize:".66rem",fontWeight:900,letterSpacing:".06em",color:"#fff",background:P2,padding:".45rem .5rem",textAlign:"right",whiteSpace:"nowrap"},
  td:{fontSize:".82rem",padding:".38rem .5rem",borderBottom:"1px solid #F1F5F9",textAlign:"right",whiteSpace:"nowrap"}};
 const Tog=({on,t,d,onClick})=>e.jsxs("label",{style:{display:"flex",alignItems:"flex-start",gap:".55rem",padding:".5rem .6rem",borderRadius:11,border:"1px solid "+(on?"#F9A8D4":"#EEF0F4"),background:on?"#FDF2F8":"#fff",cursor:"pointer",marginBottom:".35rem"},children:[
   e.jsx("input",{type:"checkbox",checked:on,onChange:onClick,style:{width:17,height:17,accentColor:P1,marginTop:1}}),e.jsxs("span",{children:[e.jsx("b",{style:{fontSize:".84rem"},children:t}),d?e.jsx("span",{style:{display:"block",fontSize:".72rem",color:"#64748B",fontWeight:600},children:d}):null]})]});
 const Seg=({v,on,ops})=>e.jsx("span",{style:S.seg,children:ops.map(([k,t])=>e.jsx("button",{type:"button",style:S.segb(v===k),onClick:()=>on(k),children:t},k))});

 const filt=(liste||[]).filter(c=>(arsiv||!(c.arsivli===!0||c.arsivli==="true"))&&(!ara||String(c.isim).toLocaleLowerCase("tr-TR").includes(ara.toLocaleLowerCase("tr-TR"))));
 const sec=k=>setSecili(s=>s.includes(k)?s.filter(x=>x!==k):[...s,k]);
 const R0=RAPORLAR.find(r=>r.id===rapor);

 // sol: yarışmalar
 const sol=e.jsxs("div",{children:[
  e.jsxs("div",{style:S.card,children:[e.jsxs("div",{style:S.h,children:[e.jsx("span",{style:S.hi,children:MI("event",{fontSize:17})}),__T("Yarışmalar"),e.jsx("span",{style:{marginLeft:"auto",fontSize:".72rem",color:"#BE185D",fontWeight:900},children:secili.length?secili.length+" "+__T("seçili"):""})]}),
   e.jsx("input",{style:S.inp,placeholder:__T("Yarışma ara…"),value:ara,onChange:ev=>setAra(ev.target.value)}),
   e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:".4rem",fontSize:".76rem",fontWeight:800,color:"#64748B",margin:".5rem 0"},children:[e.jsx("input",{type:"checkbox",checked:arsiv,onChange:()=>setArsiv(!arsiv),style:{accentColor:P1}}),__T("Arşivdeki yarışmaları da göster")]}),
   e.jsx("div",{style:{maxHeight:"56vh",overflowY:"auto",display:"grid",gap:".3rem",paddingRight:2},children:liste===null?e.jsx("div",{style:{color:"#64748B",fontWeight:700,padding:"1rem 0"},children:__T("Yükleniyor…")}):!filt.length?e.jsx("div",{style:{color:"#64748B",fontWeight:700,padding:"1rem 0"},children:__T("Yarışma bulunamadı")}):
    filt.map(c=>{const on=secili.includes(c._id),ar=c.arsivli===!0||c.arsivli==="true";return e.jsxs("button",{type:"button",onClick:()=>sec(c._id),style:{textAlign:"left",border:"1.5px solid "+(on?P1:"#EEF0F4"),background:on?"#FDF2F8":"#fff",borderRadius:12,padding:".5rem .6rem",cursor:"pointer",fontFamily:"inherit",display:"flex",gap:".5rem",alignItems:"flex-start"},children:[
      e.jsx("span",{style:{width:18,height:18,borderRadius:6,border:"2px solid "+(on?P1:"#CBD5E1"),background:on?P1:"#fff",color:"#fff",display:"grid",placeItems:"center",flexShrink:0,marginTop:1,fontSize:12,fontWeight:900},children:on?"✓":""}),
      e.jsxs("span",{style:{minWidth:0},children:[e.jsx("b",{style:{display:"block",fontSize:".83rem",lineHeight:1.25},children:c.isim}),e.jsxs("span",{style:{fontSize:".7rem",color:"#64748B",fontWeight:700},children:[[tarihStr(c),c.il].filter(Boolean).join(" · "),ar?e.jsx("span",{style:{marginLeft:6,color:"#B45309"},children:"· "+__T("arşiv")}):null,isIntl(c)?e.jsx("span",{style:{marginLeft:6,color:"#0369A1"},children:"· "+__T("uluslararası")}):null]})]})]},c._id)})}),
   secili.length?e.jsx("button",{type:"button",style:{...S.ghost,marginTop:".6rem"},onClick:()=>setSecili([]),children:__T("Seçimi temizle")}):null]})]});

 // sağ: rapor kataloğu + seçenekler + önizleme
 const katalog=e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:".55rem",marginBottom:".9rem"},children:RAPORLAR.map(r=>{const on=rapor===r.id;
  return e.jsxs("button",{type:"button",disabled:r.yakinda,onClick:()=>!r.yakinda&&setRapor(r.id),style:{textAlign:"left",border:"1.5px solid "+(on?P1:"#EEF0F4"),background:on?"linear-gradient(135deg,#FDF2F8,#F5F3FF)":"#fff",borderRadius:14,padding:".65rem .7rem",cursor:r.yakinda?"default":"pointer",opacity:r.yakinda?.55:1,fontFamily:"inherit",display:"flex",gap:".55rem",boxShadow:on?"0 6px 18px -10px rgba(236,72,153,.6)":"none"},children:[
   e.jsx("span",{style:{width:34,height:34,borderRadius:11,display:"grid",placeItems:"center",background:on?G:"#F1F5F9",color:on?"#fff":"#64748B",flexShrink:0},children:MI(r.ic,{fontSize:19})}),
   e.jsxs("span",{style:{minWidth:0},children:[e.jsxs("b",{style:{fontSize:".84rem",display:"flex",gap:".3rem",alignItems:"center"},children:[__T(r.t),r.yakinda?e.jsx("span",{style:{fontSize:".6rem",fontWeight:900,background:"#F1F5F9",color:"#64748B",borderRadius:99,padding:".1rem .4rem"},children:__T("YAKINDA")}):null]}),e.jsx("span",{style:{display:"block",fontSize:".7rem",color:"#64748B",fontWeight:600,lineHeight:1.3},children:__T(r.d)})]})]},r.id)})});

 const secenek=e.jsxs("div",{style:S.card,children:[e.jsxs("div",{style:S.h,children:[e.jsx("span",{style:S.hi,children:MI("tune",{fontSize:17})}),__T(R0.t)+" · "+__T("Seçenekler")]}),
  e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:".2rem 1rem"},children:[
   rapor==="sonuc"?e.jsxs("div",{children:[e.jsx("div",{style:S.lbl,children:__T("Bölümler")}),
     e.jsx(Tog,{on:opt.genel,onClick:()=>so("genel",!opt.genel),t:__T("Genel tasnif"),d:__T("Kategori başına; alet puanları ve toplam")}),
     e.jsx(Tog,{on:opt.alet,onClick:()=>so("alet",!opt.alet),t:__T("Alet sıralamaları"),d:"DA · DB · A · E · "+__T("Ceza")}),
     e.jsx(Tog,{on:opt.takim,onClick:()=>so("takim",!opt.takim),t:__T("Takım sıralaması"),d:__T("Ülke / kulüp; ilk 3-4 sporcunun her aletteki en iyi 2 puanı")}),
     e.jsx(Tog,{on:opt.final,onClick:()=>so("final",!opt.final),t:__T("Finaller"),d:__T("Genel tasnif ve alet finalleri")})]})
   :e.jsxs("div",{children:[e.jsx("div",{style:S.lbl,children:__T("Madalya sayılan sonuçlar")}),
     e.jsx(Tog,{on:opt.mGenel,onClick:()=>so("mGenel",!opt.mGenel),t:__T("Genel tasnif"),d:__T("Genel tasnif finali varsa final sonucu")}),
     e.jsx(Tog,{on:opt.mAlet,onClick:()=>so("mAlet",!opt.mAlet),t:__T("Alet"),d:__T("Alet finalleri")}),
     opt.mAlet?e.jsx(Tog,{on:opt.mAletElem,onClick:()=>so("mAletElem",!opt.mAletElem),t:__T("Finali olmayan alet"),d:__T("Alet finali yapılmadıysa eleme alet sıralaması madalya sayılır")}):null,
     e.jsx(Tog,{on:opt.mTakim,onClick:()=>so("mTakim",!opt.mTakim),t:__T("Takım"),d:__T("Takım sıralamasının ilk üçü")})]}),
   e.jsxs("div",{children:[
     katSec.length?e.jsxs(e.Fragment,{children:[e.jsx("div",{style:S.lbl,children:__T("Kategoriler")+(opt.kats.length?"":" · "+__T("tümü"))}),
      e.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:".3rem"},children:katSec.map(([k,ad])=>e.jsx("button",{type:"button",style:S.chip(opt.kats.includes(k)),onClick:()=>so("kats",opt.kats.includes(k)?opt.kats.filter(x=>x!==k):[...opt.kats,k]),children:ad},k))})]}):null,
     rapor==="madalya"?e.jsxs(e.Fragment,{children:[e.jsx("div",{style:S.lbl,children:__T("Gruplama")}),e.jsx(Seg,{v:opt.grup,on:v=>so("grup",v),ops:[["oto",__T("Otomatik")],["ulke",__T("Ülke")],["kulup",__T("Kulüp")],["il",__T("İl")]]}),
      e.jsx("div",{style:S.lbl,children:__T("Sıralama")}),e.jsx(Seg,{v:opt.mSira,on:v=>so("mSira",v),ops:[["altin",__T("Altın önce (olimpik)")],["toplam",__T("Toplam madalya")]]})]}):null,
     e.jsx("div",{style:S.lbl,children:__T("Çıktı dili")}),e.jsx(Seg,{v:opt.dil,on:v=>so("dil",v),ops:[["oto",__T("Otomatik")],["tr","Türkçe"],["en","English"]]})]})]}),
  e.jsxs("div",{style:{display:"flex",gap:".5rem",flexWrap:"wrap",marginTop:".9rem",alignItems:"center"},children:[
   e.jsxs("button",{type:"button",style:{...S.btn,background:G,opacity:!comps.length||busy?.5:1},disabled:!comps.length||!!busy,onClick:pdfAl,children:[MI(busy==="pdf"?"hourglass_top":"picture_as_pdf"),__T("PDF indir")]}),
   e.jsxs("button",{type:"button",style:{...S.btn,background:"#15803D",opacity:!comps.length||busy?.5:1},disabled:!comps.length||!!busy,onClick:excelAl,children:[MI(busy==="xlsx"?"hourglass_top":"table_view"),__T("Excel indir")]}),
   !comps.length?e.jsx("span",{style:{fontSize:".8rem",color:"#64748B",fontWeight:700},children:yuk?__T("Yükleniyor…"):__T("Soldan en az bir yarışma seçin.")}):null]})]});

 const thR=(t,sol)=>e.jsx("th",{style:{...S.th,textAlign:sol?"left":"right"},children:t});
 const madalyaRenk=r=>r===1?"#B45309":r===2?"#64748B":r===3?"#C2410C":"#0F172A";
 const onizleme=!comps.length?null:rapor==="sonuc"?sonuc.map(({C,bol})=>e.jsxs("div",{style:S.card,children:[
   e.jsxs("div",{style:{...S.h,marginBottom:".3rem"},children:[e.jsx("span",{style:S.hi,children:MI("emoji_events",{fontSize:17})}),C.isim]}),
   e.jsx("div",{style:{fontSize:".74rem",color:"#64748B",fontWeight:700,marginBottom:".7rem"},children:[tarihStr(C),C.il,bol.length+" "+__T("bölüm")].filter(Boolean).join(" · ")}),
   !bol.length?e.jsx("div",{style:{color:"#64748B",fontWeight:700},children:__T("Seçili kapsamda puanı olan sonuç yok.")}):
   bol.map((b,bi)=>{const cols=sutunlar(b),ic=isIntl(C);return e.jsxs("div",{style:{marginBottom:"1rem"},children:[
     e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:".5rem",background:"#FDF2F8",borderLeft:"4px solid "+P1,borderRadius:10,padding:".45rem .7rem",fontWeight:900,fontSize:".85rem",marginBottom:".35rem"},children:[bolBaslik(b),
      e.jsx("span",{style:{marginLeft:"auto",fontSize:".66rem",fontWeight:900,color:b.tamam?"#15803D":"#B45309",background:b.tamam?"#DCFCE7":"#FEF3C7",padding:".15rem .45rem",borderRadius:99},children:b.tip==="takim"?b.rows.length+" "+__T("takım"):b.tamam?__T("TAMAMLANDI"):__T("DEVAM EDİYOR")})]}),
     e.jsx("div",{style:{overflowX:"auto"},children:e.jsxs("table",{style:{width:"100%",borderCollapse:"collapse"},children:[e.jsx("thead",{children:e.jsxs("tr",{children:[thR(L("Sıra","Rank"),1),thR(b.tip==="takim"?L("Takım","Team"):L("Sporcu","Gymnast"),1),thR(ic?L("Ülke","NOC"):L("Kulüp / İl","Club / Prov."),1),...cols.map(c=>thR(c.b))]})}),
      e.jsx("tbody",{children:b.rows.map((r,i)=>e.jsxs("tr",{style:{background:i%2?"#FAFAFD":"#fff"},children:[
       e.jsx("td",{style:{...S.td,textAlign:"left",fontWeight:900,color:madalyaRenk(r.rank),width:44},children:r.rank??"—"}),
       e.jsxs("td",{style:{...S.td,textAlign:"left",whiteSpace:"normal",fontWeight:800,width:"40%"},children:[b.tip==="takim"?r.ad:satirAd(r),r.takim&&r.uyeler?.length?e.jsx("span",{style:{display:"block",fontSize:".7rem",color:"#64748B",fontWeight:600},children:r.uyeler.join(", ")}):null]}),
       e.jsx("td",{style:{...S.td,textAlign:"left",color:"#475569",fontWeight:700},children:ic?r.ulke:(r.takim?(r.il&&UP(r.il)!==UP(r.ad)?r.il:""):r.kulup||r.il)}),
       ...cols.map((c,ci)=>e.jsx("td",{style:{...S.td,fontWeight:c.t?900:600,color:c.t?"#0F172A":"#334155"},children:c.f(r)},ci))]},i))})]})})]},bi)})]},C._id))
  :e.jsxs("div",{style:S.card,children:[e.jsxs("div",{style:{...S.h,marginBottom:".3rem"},children:[e.jsx("span",{style:S.hi,children:MI("military_tech",{fontSize:17})}),L("Madalya Tablosu","Medal Table")]}),
   e.jsx("div",{style:{fontSize:".74rem",color:"#64748B",fontWeight:700,marginBottom:".7rem"},children:comps.map(c=>c.isim).join(" · ")}),
   !madalya.length?e.jsx("div",{style:{color:"#64748B",fontWeight:700},children:__T("Seçili kapsamda madalya yok.")}):
   e.jsxs("table",{style:{width:"100%",borderCollapse:"collapse"},children:[e.jsx("thead",{children:e.jsxs("tr",{children:[thR(L("Sıra","Rank"),1),thR(grup==="ulke"?L("Ülke","NOC"):grup==="il"?L("İl","Province"):L("Kulüp","Club"),1),thR("🥇"),thR("🥈"),thR("🥉"),thR(L("Toplam","Total")),...(comps.length>1?[thR(L("Yarışma","Comp."))]:[])]})}),
    e.jsx("tbody",{children:madalya.map((r,i)=>e.jsxs("tr",{style:{background:i%2?"#FAFAFD":"#fff"},children:[e.jsx("td",{style:{...S.td,textAlign:"left",fontWeight:900,width:44},children:r.rank}),
     e.jsx("td",{style:{...S.td,textAlign:"left",fontWeight:800},children:grup==="ulke"?r.ad+"  "+(ulkeAd(r.ad,EN?"en":"tr")||""):r.ad}),
     e.jsx("td",{style:{...S.td,color:"#B45309",fontWeight:900},children:r.altin}),e.jsx("td",{style:{...S.td,color:"#64748B",fontWeight:900},children:r.gumus}),e.jsx("td",{style:{...S.td,color:"#C2410C",fontWeight:900},children:r.bronz}),
     e.jsx("td",{style:{...S.td,fontWeight:900},children:r.toplam}),...(comps.length>1?[e.jsx("td",{style:S.td,children:r.yar},"y")]:[])]},i))})]}),
   (madalya.olay||[]).length?e.jsxs("div",{style:{marginTop:"1rem"},children:[e.jsx("div",{style:{fontWeight:900,fontSize:".85rem",background:"#FDF2F8",borderLeft:"4px solid "+P1,borderRadius:10,padding:".45rem .7rem",marginBottom:".35rem"},children:L("Madalya kazananlar","Medallists")}),
    madalya.olay.map((o,oi)=>e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"minmax(0,1.3fr) repeat(3,minmax(0,1fr))",gap:".5rem",padding:".4rem .2rem",borderBottom:"1px solid #F1F5F9",fontSize:".78rem"},children:[
     e.jsx("b",{children:(comps.length>1?o.C.isim+" · ":"")+bolBaslik(o.b)}),...[1,2,3].map(n=>e.jsx("span",{style:{color:madalyaRenk(n),fontWeight:700},children:o.m.filter(r=>r.rank===n).map(r=>(n===1?"🥇 ":n===2?"🥈 ":"🥉 ")+(r.takim?r.ad:satirAd(r))+(isIntl(o.C)&&r.ulke&&r.ulke!==r.ad?" ("+r.ulke+")":"")).join(", ")||"—"},n))]},oi))]}):null]});

 return e.jsxs("div",{style:S.wrap,children:[e.jsx("style",{children:"@media(max-width:900px){.rp-in{grid-template-columns:1fr!important}}"}),
  e.jsxs("div",{style:S.top,children:[e.jsx("button",{type:"button",title:__T("Geri"),style:S.back,onClick:()=>{window.history.length>1?history.back():location.assign("/ritmik")},children:MI("arrow_back",{fontSize:20})}),
   e.jsx("div",{style:S.ico,children:MI("summarize",{color:"#fff",fontSize:22})}),
   e.jsxs("div",{style:{flex:1,minWidth:0},children:[e.jsx("div",{style:{fontWeight:900,fontSize:"1.1rem",lineHeight:1.15},children:__T("Raporlar")}),
    e.jsx("div",{style:{fontSize:".78rem",color:"#64748B",fontWeight:700},children:__T("Ritmik · yarışma seçin, raporu oluşturun, PDF / Excel indirin")})]})]}),
  e.jsxs("div",{className:"rp-in",style:S.in,children:[sol,e.jsxs("div",{style:{minWidth:0},children:[katalog,secenek,yuk?e.jsx("div",{style:{...S.card,color:"#64748B",fontWeight:700},children:__T("Yükleniyor…")}):onizleme]})]})]})}
export{Raporlar as default};
