import"./i18n-Tr01a2b3Cb2.js";
import{d as db}from"./main-C2LpyYUGCb2.js";
import{k as ref,l as get}from"./vendor-firebase-940mxgRVCb2.js";
import{katEN,bayraklarPng,isIntl}from"./intl-Ul01a2b3Cb2.js";
import"./yayinVeri-Yv01a2b3Cb2.js";

// SONUÇ KİTAPÇIĞI (2026-10-09, ritmik) — yarışması yapılmış kategoriler yaş sırasıyla (Küçük → Yıldız → Genç → Büyük, finaller kendi yaş grubunun sonunda).
//  Her kategori yeni sayfada: 1) TAKIM SIRALAMASI (takım olarak kayıtlı, en az bir sporcusu puan almış takımlar; alet toplamları, kesinti, toplam)
//  2) ALL-AROUND (her aletin puanı ayrı sütun, toplam)  3) ALET SIRALAMALARI (DB · DA · A · E · Ceza · Toplam).
//  Hesaplar yayinVeri ile (seyirci sitesi / yayın ekranları / Finaller ile aynı kurallar). Dil: yarışmanın çıktı dili (uluslararası → İngilizce).
const V=()=>globalThis.GXYV||self.GXYV;
const SIRA=["kucuk","minik","yildiz","genc","buyuk"];
const AL_EN={serbest:"Without Apparatus",ip:"Rope",cember:"Hoop",top:"Ball",labut:"Clubs",kurdele:"Ribbon"},AL_TR={serbest:"Serbest",ip:"İp",cember:"Çember",top:"Top",labut:"Labut",kurdele:"Kurdele"};
const KISA_EN={serbest:"WA",ip:"Rope",cember:"Hoop",top:"Ball",labut:"Clubs",kurdele:"Ribbon"};

export async function sonucKitapcigiPdf({base,compId,toast}){
 const Y=V();if(!Y)throw new Error("yayinVeri yüklenmedi");
 const al=async p=>(await get(ref(db,`${base}/${compId}/${p}`))).val();
 const [C,kats,sporAll,puanAll,tded]=await Promise.all([get(ref(db,`${base}/${compId}`)).then(s=>{const v=s.val()||{};return{isim:v.isim,il:v.il,baslangicTarihi:v.baslangicTarihi,bitisTarihi:v.bitisTarihi,etkinlikLogo:v.etkinlikLogo,ciktiDili:v.ciktiDili,tur:v.tur,uluslararasi:v.uluslararasi}}),al("kategoriler"),al("sporcular"),al("puanlar"),al("teamDeductions")]);
 const K=kats||{},INTL=isIntl(C)||C.uluslararasi===!0,EN=C.ciktiDili==="en"||(INTL&&C.ciktiDili!=="tr");
 const L=(tr,en)=>EN?en:tr,UPx=t=>String(t||"").toLocaleUpperCase(EN?"en":"tr-TR");
 const yas=k=>{const i=SIRA.findIndex(x=>String(k).replace(/^final_/,"").startsWith(x));return i<0?9:i};
 const katAd=k=>{const n=Y.katAd?Y.katAd(K,k,EN):((K[k]||{}).name||k);return n};
 const alAd=(a,kisa)=>EN?(kisa?KISA_EN:AL_EN)[a]||a:AL_TR[a]||a;
 // yarışması yapılmış (en az bir puan) kategoriler
 const puanVar=k=>{const P=(puanAll||{})[k]||{};return Object.values(P).some(p=>p&&typeof p==="object"&&Object.values(p).some(x=>x&&typeof x==="object"&&(x.durum==="tamamlandi"||x.kilitli===!0||x.irm)))};
 const ids=Object.keys(K).filter(k=>K[k]&&typeof K[k]==="object"&&puanVar(k))
  .sort((a,b)=>(yas(a)-yas(b))||(Y.isFinal(K,a)-Y.isFinal(K,b))||String(a).localeCompare(String(b)));
 if(!ids.length)throw new Error(L("Puanı girilmiş kategori yok.","No category has scores yet."));
 toast&&toast(L("Sonuç kitapçığı hazırlanıyor…","Preparing results book…"),"info");
 // jsPDF + autotable + Türkçe yazı tipi
 const jsPDF=await import("./jspdf.es.min-gArCfqm1Cb2.js").then(z=>z.j?.jsPDF||z.E),atM=await import("./jspdf.plugin.autotable-KFqWVtFsCb2.js"),at=atM.default||atM,d=new jsPDF("portrait","mm","a4");
 let FT="helvetica";try{const{R:r0,B:b0}=await import("./fontTR-Fn01a2b3Cb2.js");d.addFileToVFS("Roboto.ttf",r0);d.addFont("Roboto.ttf","Roboto","normal");d.addFileToVFS("Roboto-Bold.ttf",b0);d.addFont("Roboto-Bold.ttf","Roboto","bold");FT="Roboto"}catch{}
 const img=async u=>{try{const b=await(await fetch(u)).blob();const du=await new Promise(K2=>{const O=new FileReader;O.onloadend=()=>K2(O.result);O.readAsDataURL(b)});const im=new Image;await new Promise(r=>{im.onload=r;im.onerror=r;im.src=du});return im.naturalWidth?{d:du,r:im.naturalWidth/im.naturalHeight}:null}catch{return null}};
 const tcf=await img("/logo.png"),ev=C.etkinlikLogo?await img(C.etkinlikLogo):null,AP={};await Promise.all(Object.keys(AL_TR).map(async k=>{const x=await img("/brans/alet/"+k+".png");x&&(AP[k]=x)}));
 const ulkeler=new Set;ids.forEach(k=>Object.values((sporAll||{})[k]||{}).forEach(a=>{a&&a.ulke&&ulkeler.add(String(a.ulke).trim().toUpperCase())}));
 const FL=INTL&&ulkeler.size?await bayraklarPng([...ulkeler]).catch(()=>({})):{};
 const W=210,H=297,M=12,P1=[236,72,153],P2=[139,92,246],INK=[15,23,42],MUT=[100,116,139],GOLD=[254,243,199],SILV=[241,245,249],BRNZ=[255,237,213];
 const ad1=C.isim||"",tarih=[C.baslangicTarihi,C.bitisTarihi].filter(Boolean).filter((x,i,a)=>a.indexOf(x)===i).map(t=>{const m=/^(\d{4})-(\d{2})-(\d{2})/.exec(t);return m?m[3]+"."+m[2]+"."+m[1]:t}).join(" – "),alt2=[tarih,C.il||""].filter(Boolean).join("  ·  ");
 const serit=(yy,h)=>{const n=60;for(let i=0;i<n;i++){const t=i/(n-1);d.setFillColor(P1[0]+(P2[0]-P1[0])*t,P1[1]+(P2[1]-P1[1])*t,P1[2]+(P2[2]-P1[2])*t);d.rect(i*W/n,yy,W/n+.3,h,"F")}};
 let y=0,sayfa=0,katBas="";
 const ust=()=>{if(sayfa++)d.addPage();serit(0,3);let lx=M;const lh=16;
  if(tcf){const w=lh*tcf.r;d.addImage(tcf.d,"PNG",lx,8,w,lh,"tcf","FAST");lx+=w+4}
  if(ev){const w=Math.min(34,lh*ev.r);d.addImage(ev.d,"PNG",W-M-w,8,w,lh,"ev","FAST")}
  d.setTextColor(...INK);d.setFont(FT,"bold");d.setFontSize(12.5);d.text(UPx(ad1),lx,13.5,{maxWidth:W-lx-M-(ev?38:0)});
  d.setFont(FT,"normal");d.setFontSize(8.5);d.setTextColor(...MUT);d.text(alt2,lx,19);
  d.setFont(FT,"bold");d.setFontSize(10);d.setTextColor(...P1);d.text(L("SONUÇLAR","RESULTS"),lx,25);
  d.setDrawColor(226,232,240);d.setLineWidth(.3);d.line(M,30,W-M,30);y=35};
 const devam=()=>{serit(0,3);d.setFont(FT,"bold");d.setFontSize(7.5);d.setTextColor(...MUT);d.text(UPx(ad1)+"  ·  "+L("SONUÇLAR","RESULTS")+(katBas?"  ·  "+katBas:""),M,10,{maxWidth:W-2*M});d.setDrawColor(226,232,240);d.setLineWidth(.3);d.line(M,13,W-M,13)};
 const yeniSayfa=()=>{d.addPage();sayfa++;devam();y=18};
 // kategori bandı (büyük) ve bölüm başlığı
 const katBand=t=>{d.setFillColor(...P2);d.roundedRect(M,y,W-2*M,12,2.5,2.5,"F");d.setFillColor(...P1);d.roundedRect(M,y,3,12,1.2,1.2,"F");d.setFont(FT,"bold");d.setFontSize(13);d.setTextColor(255,255,255);d.text(t,M+7,y+8.2);y+=16};
 const bolum=(t,ik,sag)=>{if(y>H-40)yeniSayfa();d.setFillColor(253,242,248);d.roundedRect(M,y,W-2*M,9,2,2,"F");d.setFillColor(...P1);d.roundedRect(M,y,2.2,9,1,1,"F");let x=M+5;
  if(ik&&AP[ik]){d.addImage(AP[ik].d,"PNG",x,y+1.6,5.8,5.8,"ap_"+ik,"FAST");x+=7.4}
  d.setFont(FT,"bold");d.setFontSize(9.8);d.setTextColor(...INK);d.text(t,x,y+6.1);
  if(sag){d.setFont(FT,"normal");d.setFontSize(7.5);d.setTextColor(...MUT);d.text(sag,W-M-3,y+5.9,{align:"right"})}y+=11};
 const madalya=r=>r===1?GOLD:r===2?SILV:r===3?BRNZ:null;
 const tablo=(head,body,o)=>{at(d,{startY:y,margin:{left:M,right:M,top:18,bottom:12},head:[head],body,theme:"plain",
   styles:{font:FT,fontSize:o.fs||8.2,cellPadding:{top:1.6,bottom:1.6,left:1.6,right:1.6},textColor:INK,lineColor:[238,240,244],lineWidth:{bottom:.25},valign:"middle"},
   headStyles:{fontStyle:"bold",fontSize:6.8,textColor:[255,255,255],fillColor:P2,halign:"center"},columnStyles:o.cols||{},
   didParseCell:z=>{if(z.section!=="body")return;const m=madalya(o.rk&&o.rk(z.row.index));if(m)z.cell.styles.fillColor=m;else if(z.row.index%2)z.cell.styles.fillColor=[250,250,253];o.parse&&o.parse(z)},
   didDrawCell:z=>{if(z.section==="body"&&o.flagCol!=null&&z.column.index===o.flagCol){const k=o.flag&&o.flag(z.row.index);const f0=k&&FL[k];if(f0)try{d.addImage(f0,"PNG",z.cell.x+1.6,z.cell.y+(z.cell.height-3.4)/2,4.5,3.4,"fl_"+k,"FAST")}catch{}}},
   didDrawPage:()=>{if(d.getNumberOfPages()>sayfa){sayfa=d.getNumberOfPages();devam()}}});y=d.lastAutoTable.finalY+7};
 const f3=v=>v==null||v===""||isNaN(+v)?"":(+v).toFixed(3);
 const nocCell=u=>u||"";
 const NOCW=INTL?{cellWidth:17,cellPadding:{top:1.6,bottom:1.6,left:7.2,right:1}}:{cellWidth:34};
 ust();
 for(let ci=0;ci<ids.length;ci++){const k=ids[ci],kd=K[k]||{},spor=(sporAll||{})[k]||{},puan=(puanAll||{})[k]||{};
  const fin=Y.isFinal(K,k),aletler=(Array.isArray(kd.aletler)?kd.aletler:kd.aletler&&typeof kd.aletler==="object"?Object.keys(kd.aletler):[]).filter(Boolean);
  const kAd=EN&&katEN?katEN(katAd(k)):katAd(k);katBas=UPx(kAd);
  if(ci)yeniSayfa();katBand(UPx(kAd)+(fin?"  ·  "+L("FİNAL","FINAL"):""));
  const aPuan=aletler.filter(a=>Object.values(puan).some(p=>p&&p[a]&&(p[a].durum==="tamamlandi"||p[a].kilitli===!0||p[a].irm)));
  // 1) TAKIM
  const grupKat=/grup/.test(k)||kd.tip==="grup"||kd.tip==="takim"||kd.grupMu===!0;
  if(!fin&&!grupKat&&aletler.length){
   const T=Y.takimlar({kats:K,kat:k,spor,puan,intl:INTL,kesintiler:tded,hepsi:!0}).filter(t=>t.yarisan>=1);
   if(T.length){const ac=aPuan.length?aPuan:aletler,dedVar=T.some(t=>t.kesinti>0);
    bolum(L("TAKIM SIRALAMASI","TEAM RANKING"),null,T.length+" "+L("takım","teams"));
    const head=[L("SIRA","RK"),L("TAKIM","TEAM"),...ac.map(a=>UPx(alAd(a,!0))),...(dedVar?[L("KESİNTİ","DED.")]:[]),L("TOPLAM","TOTAL")];
    tablo(head,T.map(t=>[String(t.sira),t.ad+"\n"+t.uyeler.join(", "),...ac.map(a=>f3(t.apps[a])),...(dedVar?[t.kesinti?"-"+f3(t.kesinti):""]:[]),f3(t.total)]),
     {rk:i=>T[i]?.sira,fs:8,flagCol:INTL?1:null,flag:i=>T[i]?.ulke,cols:{0:{cellWidth:10,halign:"center",fontStyle:"bold"},1:{cellPadding:{top:1.6,bottom:1.6,left:INTL?7.2:1.6,right:1.6},fontStyle:"bold"},...Object.fromEntries(ac.map((a,i)=>[2+i,{halign:"right",cellWidth:ac.length>4?15:18}])),...(dedVar?{[2+ac.length]:{halign:"right",cellWidth:15,textColor:[220,38,38]}}:{}),[head.length-1]:{halign:"right",fontStyle:"bold",cellWidth:19}},
      parse:z=>{if(z.column.index===1&&z.cell.raw&&String(z.cell.raw).includes("\n")){z.cell.styles.fontSize=7.6}}})}}
  // 2) ALL-AROUND (birden fazla alet)
  if(!fin&&aletler.length>1){const S=Y.siralama({brans:"ritmik",kats:K,kat:k,spor,puan});const R=S.satirlar.filter(r=>r.s||r.giris);const ac=aPuan.length?aPuan:aletler;
   if(R.some(r=>r.s)){bolum(L("ALL-AROUND (GENEL TASNİF)","ALL-AROUND"),null,S.satirlar.filter(r=>r.s).length+" "+L("sporcu","gymnasts"));
    const head=[L("SIRA","RK"),L("SPORCU","GYMNAST"),INTL?L("ÜLKE","NOC"):L("KULÜP","CLUB"),...ac.map(a=>UPx(alAd(a,!0))),L("TOPLAM","TOTAL")];
    const rows=R.filter(r=>r.s);
    tablo(head,rows.map(r=>{const g=r.giris,p=puan[g.key];return[String(r.sira||"–"),g.ad,INTL?nocCell(g.ulke):UPx(g.kulup),...ac.map(a=>{const x=Y.sonuc("ritmik",kd,p,a);return x?(x.irm||f3(x.total)):"—"}),r.s.yalnizIrm?(r.s.irm||""):f3(r.s.total)]}),
     {rk:i=>rows[i]?.sira,flagCol:INTL?2:null,flag:i=>rows[i]?.giris?.ulke,cols:{0:{cellWidth:10,halign:"center",fontStyle:"bold"},1:{fontStyle:"bold"},2:NOCW,...Object.fromEntries(ac.map((a,i)=>[3+i,{halign:"right",cellWidth:ac.length>4?14:17}])),[head.length-1]:{halign:"right",fontStyle:"bold",cellWidth:18}}})}}
  // 3) ALETLER
  const aL=fin?(aletler.length?aletler:[]):(aPuan.length?aPuan:[]);
  for(const a of aL){const S=Y.siralama({brans:"ritmik",kats:K,kat:k,spor,puan,alet:a}),rows=S.satirlar.filter(r=>r.s);if(!rows.length)continue;
   bolum(UPx(alAd(a))+(fin?"  ·  "+L("FİNAL","FINAL"):""),a,rows.length+" "+L("sporcu","gymnasts"));
   const head=[L("SIRA","RK"),L("SPORCU","GYMNAST"),INTL?L("ÜLKE","NOC"):L("KULÜP","CLUB"),"DB","DA","A","E",L("CEZA","PEN."),L("TOPLAM","TOTAL")];
   tablo(head,rows.map(r=>{const g=r.giris,s=r.s,irm=s.yalnizIrm;return[String(r.sira||"–"),g.ad,INTL?nocCell(g.ulke):UPx(g.kulup),irm?"":f3(s.db),irm?"":(a==="serbest"?"—":f3(s.da)),irm?"":f3(s.a),irm?"":f3(s.e),s.pen?"-"+f3(s.pen):"",irm?(s.irm||""):f3(s.total)]}),
    {rk:i=>rows[i]?.sira,flagCol:INTL?2:null,flag:i=>rows[i]?.giris?.ulke,cols:{0:{cellWidth:10,halign:"center",fontStyle:"bold"},1:{fontStyle:"bold"},2:NOCW,3:{halign:"right",cellWidth:14},4:{halign:"right",cellWidth:14},5:{halign:"right",cellWidth:14},6:{halign:"right",cellWidth:14},7:{halign:"right",cellWidth:13,textColor:[220,38,38]},8:{halign:"right",fontStyle:"bold",cellWidth:18}}})}
 }
 const n=d.getNumberOfPages();for(let i=1;i<=n;i++){d.setPage(i);serit(H-1.6,1.6);d.setFont(FT,"normal");d.setFontSize(7);d.setTextColor(...MUT);
  d.text(L("Gymexa Score · Türkiye Cimnastik Federasyonu","Gymexa Score · Turkish Gymnastics Federation"),M,H-5);d.text(new Date().toLocaleString(EN?"en-GB":"tr-TR",{dateStyle:"short",timeStyle:"short"})+"   "+i+" / "+n,W-M,H-5,{align:"right"})}
 const dosya=(L("Sonuc_Kitapcigi_","Results_Book_")+String(ad1).replace(/[^\p{L}\p{N}]+/gu,"_")).replace(/_+$/,"").slice(0,90)+".pdf";
 d.save(dosya);return{kategori:ids.length,sayfa:n};
}
