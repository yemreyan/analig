import"./i18n-Tr01a2b3Cb2.js";import{b as usToast,a as usInit,u as usAuth,j as e,d as db}from"./main-C2LpyYUGCb2.js";import{f as usParams,r as R}from"./vendor-react-Cxw6bqwhCb2.js";import{k as ref,l as get,o as onValue}from"./vendor-firebase-940mxgRVCb2.js";import{v as verifyToken}from"./epanelToken-BoF3UjP2Cb2.js";import{utils as XU,writeFile as XW}from"./vendor-xlsx-CNerDvZXCb2.js";import"./modulepreload-polyfill-B5Qt9EMXCb2.js";

// ============================================================================
// AEROBİK — FIG HAKEM DEĞERLENDİRME KARNESİ (yalnızca FIG kuralları)
// Dayanak: FIG Aerobic Gymnastics Code of Points 2025–2028
//  §8.1.1  A/E: 4 hakemde en yüksek ve en düşük atılır, ortadaki 2 notun ortalaması (6 hakemde 2+2 atılır)
//  §8.1.2  Ortadaki iki not arasındaki azami fark (tolerans), son puana göre:
//            8.00–10.00: 0.3 · 7.00–7.99: 0.4 · 6.00–6.99: 0.5 · 0.00–5.99: 0.6
//          aşılırsa bütün notların ortalaması son puandır
//  §8.1.6  Uç notlar arasında ≥1.0 fark → yarışma sonrası hakem analizi
//  §2.1    Superior Jury hakem sapmalarını kayda geçirir (tekrarlayan sapma, taraflılık, sürekli yüksek/düşük not)
//  §3.2    CJP yarışma sonunda tüm hakemlerin sapma raporunu Superior Jury'ye gönderir
// Referans (kontrol) not: Superior Jury kontrol notu (SJA / SJE); yoksa §8.1.1 panel sonucu.
// Hakemin notu referanstan §8.1.2 toleransından fazla saparsa "tolerans dışı" sayılır.
// Karnede derece/puanlama yoktur; yalnızca FIG maddelerine dayanan ölçümler ve bulgular verilir.
// ============================================================================
const BASE="aerobik_yarismalar";
const TOL=[[8,.3],[7,.4],[6,.5],[0,.6]];
const tolFor=v=>{for(const[m,t]of TOL)if(v>=m-1e-9)return t;return .6};
const r3=v=>Math.round(v*1000)/1000,f2=v=>v==null||isNaN(v)?"—":Number(v).toFixed(2),f3=v=>v==null||isNaN(v)?"—":Number(v).toFixed(3);
const sg=v=>v==null||isNaN(v)?"—":(v>0?"+":"")+Number(v).toFixed(3);
const num=v=>{const n=parseFloat(v);return isNaN(n)?null:n};
const PANEL={a:{kod:"A",tr:"Artistik (A)",en:"Artistry (A)",sj:"SJA",renk:"#DB2777",rgb:[219,39,119]},e:{kod:"E",tr:"Uygulama (E)",en:"Execution (E)",sj:"SJE",renk:"#0891B2",rgb:[8,145,178]}};
const trA=s=>String(s??"").replace(/İ/g,"I").replace(/ı/g,"i").replace(/Ş/g,"S").replace(/ş/g,"s").replace(/Ğ/g,"G").replace(/ğ/g,"g").replace(/Ü/g,"U").replace(/ü/g,"u").replace(/Ö/g,"O").replace(/ö/g,"o").replace(/Ç/g,"C").replace(/ç/g,"c");
const KK=s=>String(s||"").toLocaleUpperCase("tr-TR").replace(/[^A-Z0-9ÇĞİÖŞÜ]/g,"");
const dosyaAdi=s=>trA(s).replace(/[^A-Za-z0-9\s+-]/g," ").trim().replace(/\s*-\s*/g,"-").replace(/\s+/g,"_").replace(/_+/g,"_");
// Kategori sırası: Tek Kadın, Tek Erkek, Çift, Trio, Grup, Aerodans, Step; yaş küçükten büyüğe; finaller sonda
const katSira=(c,ad)=>{const b=String(c).replace(/^final_/,""),n=String(ad||"").toLocaleLowerCase("tr-TR");let t=7;
 if(/^step_/.test(b)||/step/.test(n))t=6;else if(/_kiz$/.test(b)||/tek\s*(kad[ıi]n|k[ıi]z)/.test(n))t=0;else if(/_erkek$/.test(b)||/tek\s*erkek/.test(n))t=1;else if(/_cift$/.test(b)||/çift|ikili/.test(n))t=2;else if(/_trio$/.test(b)||/trio/.test(n))t=3;else if(/_grup$/.test(b)||/grup/.test(n))t=4;else if(/_dans$/.test(b)||/dans/.test(n))t=5;
 const m=/^(?:step_)?([a-z]+)/.exec(b);let g=m?["minik","kucuk","yildiz","genc","buyuk"].indexOf(m[1]):-1;if(g<0)g=9;
 return(/^final_/.test(String(c))?1e4:0)+g*100+t};

// §8.1.1 + §8.1.2 panel sonucu
function panelSonuc(sc){const s=[...sc].sort((a,b)=>a-b),n=s.length,ort=s.reduce((a,b)=>a+b,0)/n;
 if(n<4)return{final:ort,orta:s,fark:s[n-1]-s[0],tol:tolFor(ort),asildi:!1};
 const k=n>=6?2:1,orta=s.slice(k,n-k),m=orta.reduce((a,b)=>a+b,0)/orta.length,fark=orta[orta.length-1]-orta[0],tol=tolFor(m);
 return fark>tol+1e-9?{final:ort,orta,fark,tol,asildi:!0}:{final:m,orta,fark,tol,asildi:!1}}
// Spearman sıra korelasyonu (eşitlerde ortalama sıra)
function siraVer(a){const ix=a.map((v,i)=>[v,i]).sort((x,y)=>y[0]-x[0]),r=new Array(a.length);let i=0;while(i<ix.length){let j=i;while(j+1<ix.length&&Math.abs(ix[j+1][0]-ix[i][0])<1e-9)j++;const m=(i+j)/2+1;for(let k=i;k<=j;k++)r[ix[k][1]]=m;i=j+1}return r}
function spearman(x,y){const n=x.length;if(n<3)return null;const a=siraVer(x),b=siraVer(y),ma=a.reduce((s,v)=>s+v,0)/n,mb=b.reduce((s,v)=>s+v,0)/n;let p=0,qa=0,qb=0;for(let i=0;i<n;i++){p+=(a[i]-ma)*(b[i]-mb);qa+=(a[i]-ma)**2;qb+=(b[i]-mb)**2}return qa&&qb?p/Math.sqrt(qa*qb):null}
const ozetle=s=>{const n=s.length;if(!n)return{n:0,ort:0,abs:0,rms:0,mx:0,dis:0};return{n,ort:s.reduce((a,x)=>a+x.dev,0)/n,abs:s.reduce((a,x)=>a+Math.abs(x.dev),0)/n,rms:Math.sqrt(s.reduce((a,x)=>a+x.dev*x.dev,0)/n),mx:Math.max(...s.map(x=>Math.abs(x.dev))),dis:s.filter(x=>x.dis).length}};

// ---- tüm analiz ----
function analiz({pun,spor,cats,hakemler,refs,secCat,secPanel}){
 const katAd=c=>cats[c]?.name||c;
 const san=x=>String(x||"").trim().replace(/[.#$[\]/]/g,"-");
 const kim=(cat,aid)=>{const cm=spor[cat]||{},i=cm[aid];if(i)return{ad:[i.ad,i.soyad].filter(Boolean).join(" ")||aid,kulup:i.okul||i.kulup||"",il:i.il||"",ulke:i.ulke||""};
  const p=String(aid).split("::"),gn=p[p.length-1],ok=p.length>=3?p.slice(1,-1).join("::"):"";
  let mem=Object.values(cm).filter(m=>m&&san(cat+"::"+String(m.okul||m.kulup||"").trim()+"::"+(m.grupNo||1)).slice(0,60)===String(aid));
  if(!mem.length)mem=Object.values(cm).filter(m=>m&&String(m.grupNo??m.cikisSirasi??"")===String(gn)&&(ok===""||String(m.okul||m.kulup||"")===ok||san(m.okul||m.kulup)===ok));
  return{ad:[...new Set(mem.map(m=>[m.ad,m.soyad].filter(Boolean).join(" ")))].join(", ")||aid,kulup:mem[0]?.okul||mem[0]?.kulup||ok,il:mem[0]?.il||"",ulke:mem[0]?.ulke||""}};
 const hakem=(cat,pos)=>{const h=(hakemler[cat]||hakemler[String(cat).replace(/^final_/,"")]||{})[pos];if(!h)return null;const o=typeof h==="object"?h:{name:String(h)};const rf=o.id?refs[o.id]:null;
  return{ad:String(o.name||rf?.adSoyad||"").replace(/\s*\([A-Z]{3}\)\s*$/,""),id:o.id||"",il:rf?.il||"",ulke:o.ulke||rf?.ulke||"",brove:rf?.brove||rf?.kategori||""}};
 const rutinler=[],hk={};
 Object.keys(pun).sort((a,b)=>katSira(a,katAd(a))-katSira(b,katAd(b))).forEach(cat=>{if(secCat.length&&!secCat.includes(cat))return;
  Object.entries(pun[cat]||{}).forEach(([aid,r])=>{if(!r||typeof r!=="object"||r.durum!=="tamamlandi")return;const sp=kim(cat,aid);
   ["a","e"].forEach(pn=>{if(secPanel&&secPanel!==pn)return;const P=pn==="a"?r.aPanel:r.ePanel;if(!P||typeof P!=="object")return;
    const js=Object.keys(P).filter(k=>/^j\d+$/.test(k)&&num(P[k])!=null).sort((x,y)=>parseInt(x.slice(1))-parseInt(y.slice(1)));if(js.length<2)return;
    const sc=js.map(k=>pn==="a"?num(P[k]):10-num(P[k])),ps=panelSonuc(sc);
    const sjv=num(r.sjPanel?.[pn]?.value),refN=sjv!=null?(pn==="a"?sjv:10-sjv):ps.final,refSrc=sjv!=null?PANEL[pn].sj:"Panel",tol=tolFor(refN);
    const mx=Math.max(...sc),mn=Math.min(...sc),uc=mx-mn,k=sc.length>=6?2:sc.length>=4?1:0;
    const sirali=sc.map((v,i)=>[v,i]).sort((a,b)=>a[0]-b[0]),atilanLo=new Set(sirali.slice(0,k).map(x=>x[1])),atilanHi=new Set(sirali.slice(sc.length-k).map(x=>x[1]));
    const rt={cat,katAd:katAd(cat),aid,...sp,panel:pn,ref:refN,refSrc,tol,panelFinal:ps.final,ortaFark:ps.fark,ortaTol:ps.tol,f812:ps.asildi,uc,f816:uc>=1-1e-9,hakemler:[]};
    js.forEach((j,i)=>{const pos=pn+j.slice(1),h=hakem(cat,pos),dev=sc[i]-refN,dis=Math.abs(dev)>tol+1e-9,atil=atilanHi.has(i)?"Y":atilanLo.has(i)?"D":"";
     const key=h&&h.ad?"N:"+KK(h.ad)+"|"+pn:"P:"+pos;
     const sat={pos:pos.toUpperCase(),not:sc[i],dev,dis,atil,ucta:rt.f816&&(Math.abs(sc[i]-mx)<1e-9||Math.abs(sc[i]-mn)<1e-9),hakemAd:h?.ad||""};rt.hakemler.push(sat);
     const H=hk[key]||(hk[key]={key,panel:pn,ad:h?.ad||"",il:h?.il||"",ulke:h?.ulke||"",brove:h?.brove||"",poslar:new Set,katlar:new Set,satir:[]});
     H.poslar.add(pos.toUpperCase());H.katlar.add(cat);H.satir.push({...sat,cat,katAd:rt.katAd,sporcu:sp.ad,kulup:sp.kulup,spIl:sp.il,spUlke:sp.ulke,ref:refN,refSrc,tol,aid})});
    rutinler.push(rt)})})});
 const ozet=Object.values(hk).map(H=>{const s=H.satir,O=ozetle(s);
  const katlar=[...H.katlar].sort((a,b)=>katSira(a,katAd(a))-katSira(b,katAd(b)));
  let rw=0,rn=0;const katOzet=katlar.map(c=>{const ss=s.filter(x=>x.cat===c),rho=spearman(ss.map(x=>x.not),ss.map(x=>x.ref));if(rho!=null){rw+=rho*ss.length;rn+=ss.length}return{cat:c,katAd:katAd(c),rho,...ozetle(ss)}});
  const rho=rn?rw/rn:null;
  // §2.1 taraflılık incelemesi: uluslararasında ülke, yerelde il
  let yerel=null;const ulkeMod=!!H.ulke&&s.some(x=>x.spUlke),anah=ulkeMod?H.ulke:H.il;
  if(anah){const ayni=x=>ulkeMod?KK(x.spUlke)===KK(H.ulke):(x.spIl&&KK(x.spIl)===KK(H.il)),kendi=s.filter(ayni),diger=s.filter(x=>!ayni(x));
   if(kendi.length){const mk=kendi.reduce((a,x)=>a+x.dev,0)/kendi.length,md=diger.length?diger.reduce((a,x)=>a+x.dev,0)/diger.length:null;yerel={tur:ulkeMod?"ülke":"il",ad:anah,n:kendi.length,kendi:mk,diger:md,nDiger:diger.length,fark:md==null?null:mk-md}}}
  const uc816=s.filter(x=>x.ucta).length,atilanY=s.filter(x=>x.atil==="Y").length,atilanD=s.filter(x=>x.atil==="D").length;
  const bulgu=[];
  if(O.dis)bulgu.push(["§8.1.2",`${O.dis} not referanstan tolerans dışında sapıyor (${(O.dis/O.n*100).toFixed(0)}%).`,`${O.dis} marks outside tolerance vs. reference.`]);
  if(uc816)bulgu.push(["§8.1.6",`${uc816} rutinde uç fark ≥ 1.0 olan panelde uç not bu hakeme ait.`,`Extreme mark in ${uc816} routine(s) with spread ≥ 1.0.`]);
  if(atilanY||atilanD)bulgu.push(["§8.1.1",`Notu ${atilanY} kez en yüksek, ${atilanD} kez en düşük olarak atıldı.`,`Mark dropped as highest ${atilanY}×, lowest ${atilanD}×.`]);
  bulgu.push(["§2.1",`Referansa göre ortalama sapma ${sg(O.ort)} (${O.ort>0?"ortalamanın üstünde":O.ort<0?"ortalamanın altında":"dengeli"}).`,`Mean deviation ${sg(O.ort)}.`]);
  if(yerel)bulgu.push(["§2.1",`Kendi ${yerel.tur}i (${yerel.ad}) sporcularına ort. sapma ${sg(yerel.kendi)} (${yerel.n} rutin)`+(yerel.diger!=null?`, diğerlerine ${sg(yerel.diger)} → fark ${sg(yerel.fark)}.`:"."),`Own ${yerel.tur==="ülke"?"country":"province"}: ${sg(yerel.kendi)}`+(yerel.diger!=null?` vs others ${sg(yerel.diger)}.`:".")]);
  return{...H,poslar:[...H.poslar].sort(),katlar,katOzet,...O,disPct:O.n?O.dis/O.n*100:0,rho,yerel,uc816,atilanY,atilanD,bulgu,etiket:(H.ad||"—")}})
  .sort((a,b)=>a.panel.localeCompare(b.panel)||a.poslar[0].localeCompare(b.poslar[0],"tr",{numeric:!0})||a.etiket.localeCompare(b.etiket,"tr"));
 return{rutinler,ozet};
}

// ---- PDF yardımcıları ----
let _font=null,_logo=null,_brans=null;
const resimYukle=async(url,kare)=>{try{const bl=await(await fetch(url)).blob(),du=await new Promise(k=>{const o=new FileReader;o.onloadend=()=>k(o.result);o.readAsDataURL(bl)});
 return await new Promise(rs=>{const im=new Image;im.onload=()=>{try{const w=kare?640:im.naturalWidth,h=kare?640:im.naturalHeight,c=document.createElement("canvas");c.width=w;c.height=h;c.getContext("2d").drawImage(im,0,0,w,h);rs({d:c.toDataURL("image/png"),r:im.naturalWidth/im.naturalHeight})}catch{rs({d:du,r:im.naturalWidth/im.naturalHeight||1})}};im.onerror=()=>rs(0);im.src=du})}catch{return 0}};
async function pdfHazirla(yatay){
 const{jsPDF}=(await import("./jspdf.es.min-gArCfqm1Cb2.js")).j,am=await import("./jspdf.plugin.autotable-KFqWVtFsCb2.js"),at=am.default||am,doc=new jsPDF(yatay?"landscape":"portrait","mm","a4");
 if(_font===null){try{const{R:r,B:b}=await import("./fontTR-Fn01a2b3Cb2.js");_font={r,b}}catch{_font=0}}
 let FT="helvetica";if(_font){doc.addFileToVFS("Roboto.ttf",_font.r);doc.addFont("Roboto.ttf","Roboto","normal");doc.addFileToVFS("Roboto-Bold.ttf",_font.b);doc.addFont("Roboto-Bold.ttf","Roboto","bold");FT="Roboto"}
 if(_logo===null)_logo=await resimYukle("/logo.png",!0);if(_brans===null)_brans=await resimYukle("/brans/aerobik.png",!1);
 const guv=s=>String(s??"").replace(/≥/g,">=").replace(/≤/g,"<=").replace(/→/g,"->").replace(/−/g,"-").replace(/ρ/g,"rho").replace(/✓/g,"OK").replace(/↑/g,"Y").replace(/↓/g,"D").replace(/×/g,"x").replace(/·/g,"·"),o=FT==="helvetica"?(s=>trA(guv(s))):guv;
 return{doc,at,FT,o};
}
const IN=[67,56,202],INK=[30,27,75],CC=[147,51,234];
const mx3=(P,Q,t)=>P.map((v,i)=>Math.round(v+(Q[i]-v)*t));
function pdfBaslik(doc,FT,o,W,t1,t2,comp,etiket){
 for(let g=0;g<80;g++){const t=Math.max(0,(g/79-.35)/.65);doc.setFillColor(...mx3([248,247,255],mx3(CC,[255,255,255],.86),t));doc.rect(W*g/80,0,W/80+.4,40,"F")}
 for(let g=0;g<80;g++){const t=g/79,c=t<.45?mx3([49,46,129],IN,t/.45):mx3(IN,CC,(t-.45)/.55);doc.setFillColor(...c);doc.rect(W*g/80,40,W/80+.4,1.6,"F")}
 if(_logo)try{doc.addImage(_logo.d,"PNG",10,5,29,29,"tcflogo","FAST")}catch{}
 const tx=44;doc.setFont(FT,"bold");doc.setFontSize(W>250?17:15);doc.setTextColor(...INK);doc.text(o(t1),tx,15);
 if(etiket){const bw=doc.getTextWidth(o(t1));doc.setFontSize(8.5);const bl=doc.getTextWidth(o(etiket))+5;doc.setFillColor(...CC);doc.roundedRect(tx+bw+3,9.6,bl,6.6,1.2,1.2,"F");doc.setTextColor(255,255,255);doc.text(o(etiket),tx+bw+5.5,14.2)}
 doc.setFont(FT,"bold");doc.setFontSize(8.5);doc.setTextColor(100,116,139);doc.text(o(t2),tx,20.5);
 doc.setFont(FT,"bold");doc.setFontSize(9.5);doc.setTextColor(51,65,85);doc.text(o(comp.isim||""),tx,27.5);
 doc.setFont(FT,"normal");doc.setFontSize(8.5);doc.setTextColor(100,116,139);doc.text(o([comp.tarih,comp.il].filter(Boolean).join(" · ")),tx,32.5);
 if(_brans){const bw=Math.min(36,20*_brans.r),bh=bw/_brans.r,cx=W-10-Math.max(bw,30)/2;try{doc.addImage(_brans.d,"PNG",cx-bw/2,5+(20-bh)/2,bw,bh,"aebrans","FAST")}catch{}
  doc.setFont(FT,"bold");doc.setFontSize(7.5);doc.setTextColor(48,56,104);const t=o("AEROBİK CİMNASTİK");doc.text(t,cx,30.5,{align:"center"});const tw=doc.getTextWidth(t);doc.setDrawColor(...CC);doc.setLineWidth(.5);doc.line(cx-tw/2,32.6,cx+tw/2,32.6)}
 doc.setTextColor(0,0,0)}
function sayfaNo(doc,FT,o,W,H){const g=doc.internal.getNumberOfPages();for(let i=1;i<=g;i++){doc.setPage(i);doc.setFont(FT,"normal");doc.setFontSize(6.8);doc.setTextColor(140);
 doc.text(o("FIG AER CoP 2025–2028 · §8.1.1–8.1.6 · §2.1 · §3.2"),10,H-6);doc.text(`${i} / ${g}`,W-10,H-6,{align:"right"})}}
const HS={fillColor:[30,27,75],textColor:255,fontStyle:"bold",halign:"center",valign:"middle",fontSize:7.2,cellPadding:1.8},BS={fontSize:7.3,cellPadding:1.5,valign:"middle",lineColor:[226,232,240],lineWidth:.1,textColor:[30,27,75]};
// PDF: sapma grafiği (her rutin bir nokta, tolerans bandı)
function pdfSapmaGrafik(doc,FT,o,x,y,w,h,satir,panelRgb){
 const n=satir.length;if(!n)return;const lim=Math.max(.8,Math.min(1.6,Math.ceil((Math.max(...satir.map(s=>Math.abs(s.dev)))+.1)*5)/5)),Y=v=>y+h/2-Math.max(-lim,Math.min(lim,v))/lim*(h/2-2.2),X=i=>x+8+(w-10)*(n===1?.5:i/(n-1));
 doc.setFillColor(248,250,252);doc.rect(x,y,w,h,"F");doc.setDrawColor(226,232,240);doc.setLineWidth(.15);
 [-1,-.5,.5,1].filter(v=>Math.abs(v)<=lim+1e-9).forEach(v=>{doc.line(x+7,Y(v),x+w,Y(v));doc.setFont(FT,"normal");doc.setFontSize(5.8);doc.setTextColor(148,163,184);doc.text((v>0?"+":"")+v.toFixed(1),x+6,Y(v)+1,{align:"right"})});
 doc.setDrawColor(100,116,139);doc.setLineWidth(.3);doc.line(x+7,Y(0),x+w,Y(0));doc.setFontSize(5.8);doc.text("0",x+6,Y(0)+1,{align:"right"});
 let pc=null;satir.forEach((s,i)=>{if(s.cat!==pc&&i>0){doc.setDrawColor(203,213,225);doc.setLineWidth(.2);doc.setLineDashPattern([.8,.8],0);doc.line((X(i)+X(i-1))/2,y+1,(X(i)+X(i-1))/2,y+h-1);doc.setLineDashPattern([],0)}pc=s.cat;
  doc.setFillColor(220,252,231);doc.rect(X(i)-.7,Y(s.tol),1.4,Y(-s.tol)-Y(s.tol),"F")});
 satir.forEach((s,i)=>{doc.setFillColor(...(s.dis?[220,38,38]:panelRgb));doc.circle(X(i),Y(s.dev),s.dis?1.1:.85,"F")});
 doc.setTextColor(0,0,0)}
function pdfHistogram(doc,FT,o,x,y,w,h,satir){
 const B=[];for(let v=-1;v<=1.0001;v+=.1)B.push({c:Math.round(v*10)/10,n:0});satir.forEach(s=>{const i=Math.max(0,Math.min(B.length-1,Math.round((s.dev+1)*10)));B[i].n++});
 const mxN=Math.max(1,...B.map(b=>b.n)),bw=(w-4)/B.length;doc.setFillColor(248,250,252);doc.rect(x,y,w,h,"F");
 B.forEach((b,i)=>{const bh=(h-8)*b.n/mxN,bx=x+2+i*bw;doc.setFillColor(...(Math.abs(b.c)<=.3?[99,102,241]:Math.abs(b.c)<=.6?[245,158,11]:[220,38,38]));b.n&&doc.rect(bx+.3,y+h-5-bh,bw-.6,bh,"F")});
 doc.setFont(FT,"normal");doc.setFontSize(5.6);doc.setTextColor(100,116,139);[-1,-.5,0,.5,1].forEach(v=>{const i=Math.round((v+1)*10);doc.text((v>0?"+":"")+v.toFixed(1),x+2+i*bw+bw/2,y+h-1.5,{align:"center"})});doc.setTextColor(0,0,0)}

// ---- Web grafik bileşenleri (SVG) ----
const SapmaGrafik=({satir,renk,yuk=200})=>{const n=satir.length;if(!n)return null;const W=Math.max(640,n*16),H=yuk,P=34,lim=Math.max(.8,Math.min(1.6,Math.ceil((Math.max(...satir.map(s=>Math.abs(s.dev)))+.1)*5)/5));
 const Y=v=>H/2-Math.max(-lim,Math.min(lim,v))/lim*(H/2-14),X=i=>P+10+(W-P-20)*(n===1?.5:i/(n-1));
 const el=[];[-1,-.5,.5,1].filter(v=>Math.abs(v)<=lim+1e-9).forEach(v=>{el.push(e.jsx("line",{x1:P,x2:W-4,y1:Y(v),y2:Y(v),stroke:"#E2E8F0"},"g"+v));el.push(e.jsx("text",{x:P-4,y:Y(v)+3,fontSize:10,textAnchor:"end",fill:"#94A3B8",children:(v>0?"+":"")+v.toFixed(1)},"t"+v))});
 el.push(e.jsx("line",{x1:P,x2:W-4,y1:Y(0),y2:Y(0),stroke:"#64748B",strokeWidth:1.2},"z"));el.push(e.jsx("text",{x:P-4,y:Y(0)+3,fontSize:10,textAnchor:"end",fill:"#64748B",children:"0"},"tz"));
 let pc=null,bas=0;const segs=[];satir.forEach((s,i)=>{if(s.cat!==pc){if(pc!==null)segs.push([bas,i-1,satir[bas].katAd]);pc=s.cat;bas=i}});segs.push([bas,n-1,satir[bas].katAd]);
 segs.forEach(([a,b,ad],k)=>{if(k>0)el.push(e.jsx("line",{x1:(X(a)+X(a-1))/2,x2:(X(a)+X(a-1))/2,y1:6,y2:H-6,stroke:"#CBD5E1",strokeDasharray:"3 3"},"s"+k));
  b-a>=1||segs.length<12?el.push(e.jsx("text",{x:(X(a)+X(b))/2,y:12,fontSize:9.5,textAnchor:"middle",fill:"#64748B",fontWeight:700,children:String(ad).replace(/^\s*\u{1F3C6}\s*/u,"").slice(0,26)},"sl"+k)):null});
 satir.forEach((s,i)=>el.push(e.jsx("rect",{x:X(i)-3,y:Y(s.tol),width:6,height:Y(-s.tol)-Y(s.tol),rx:2,fill:"#DCFCE7"},"b"+i)));
 satir.forEach((s,i)=>el.push(e.jsx("circle",{cx:X(i),cy:Y(s.dev),r:s.dis?5:4,fill:s.dis?"#DC2626":renk,stroke:"#fff",strokeWidth:1.2,children:e.jsx("title",{children:`${s.katAd} · ${s.sporcu}\nNot ${f3(s.not)} · Ref ${f3(s.ref)} (${s.refSrc})\nSapma ${sg(s.dev)} · Tol ±${f2(s.tol)}`})},"c"+i)));
 return e.jsx("div",{style:{overflowX:"auto"},children:e.jsx("svg",{viewBox:`0 0 ${W} ${H}`,width:W,height:H,style:{display:"block",minWidth:"100%"},children:el})})};
const Histogram=({satir})=>{const B=[];for(let v=-1;v<=1.0001;v+=.1)B.push({c:Math.round(v*10)/10,n:0});satir.forEach(s=>{const i=Math.max(0,Math.min(B.length-1,Math.round((s.dev+1)*10)));B[i].n++});
 const W=420,H=150,mxN=Math.max(1,...B.map(b=>b.n)),bw=(W-20)/B.length;
 return e.jsx("svg",{viewBox:`0 0 ${W} ${H}`,style:{width:"100%",height:"auto",display:"block"},children:[
  ...B.map((b,i)=>{const bh=(H-34)*b.n/mxN;return e.jsxs("g",{children:[b.n?e.jsx("rect",{x:10+i*bw+1.5,y:H-20-bh,width:bw-3,height:bh,rx:2.5,fill:Math.abs(b.c)<=.3?"#6366F1":Math.abs(b.c)<=.6?"#F59E0B":"#DC2626"}):null,b.n?e.jsx("text",{x:10+i*bw+bw/2,y:H-24-bh,fontSize:9,textAnchor:"middle",fill:"#334155",fontWeight:700,children:b.n}):null]},i)}),
  ...[-1,-.5,0,.5,1].map(v=>{const i=Math.round((v+1)*10);return e.jsx("text",{x:10+i*bw+bw/2,y:H-6,fontSize:9.5,textAnchor:"middle",fill:"#64748B",children:(v>0?"+":"")+v.toFixed(1)},"x"+v)})]})};

function Karne(){
 const{toast}=usToast();usInit();
 const[sp]=usParams(),urlComp=sp.get("competitionId")||sp.get("compId")||sp.get("comp"),token=sp.get("token");
 const{currentUser}=usAuth?usAuth():{currentUser:null};
 const[comp,setComp]=R.useState(urlComp||""),[comps,setComps]=R.useState({}),[authed,setAuthed]=R.useState(!1),[loading,setLoading]=R.useState(!0);
 const[V,setV]=R.useState({pun:{},spor:{},cats:{},hak:{},isim:"",il:"",bas:"",bit:""}),[refs,setRefs]=R.useState({});
 const[secCat,setSecCat]=R.useState([]),[secPanel,setSecPanel]=R.useState(""),[sekme,setSekme]=R.useState("genel"),[secH,setSecH]=R.useState(null),[sadeceBulgu,setSadeceBulgu]=R.useState(!0),[busy,setBusy]=R.useState(!1);

 R.useEffect(()=>{if(token&&urlComp){get(ref(db,`${BASE}/${urlComp}/epanelToken`)).then(s=>{const v=s.val();setAuthed(v?verifyToken(token,v):!!currentUser)}).catch(()=>setAuthed(!!currentUser)).finally(()=>setLoading(!1))}else{setAuthed(!!currentUser);setLoading(!1)}},[urlComp,token,currentUser]);
 R.useEffect(()=>{if(!currentUser||urlComp)return;get(ref(db,BASE)).then(s=>{const v=s.val()||{},o={};Object.entries(v).forEach(([k,c])=>{c&&c.isim&&c.arsivli!==!0&&c.arsivli!=="true"&&(o[k]={isim:c.isim,t:c.baslangicTarihi||""})});setComps(o)}).catch(()=>{})},[currentUser,urlComp]);
 R.useEffect(()=>{if(!comp||!authed)return;const set=(k,v)=>setV(o=>({...o,[k]:v}));
  const ul=[["pun","puanlar"],["spor","sporcular"],["cats","kategoriler"],["hak","hakemler"],["isim","isim"],["il","il"],["bas","baslangicTarihi"],["bit","bitisTarihi"]].map(([k,p])=>onValue(ref(db,`${BASE}/${comp}/${p}`),s=>set(k,s.val()||(k==="isim"||k==="il"||k==="bas"||k==="bit"?"":{}))));
  return()=>ul.forEach(u=>u())},[comp,authed]);
 R.useEffect(()=>{const ids=new Set;Object.values(V.hak||{}).forEach(ps=>ps&&typeof ps==="object"&&Object.values(ps).forEach(h=>h&&h.id&&ids.add(h.id)));
  const eksik=[...ids].filter(i=>!(i in refs));if(!eksik.length)return;Promise.all(eksik.map(i=>get(ref(db,`referees/${i}`)).then(s=>[i,s.val()||{}]).catch(()=>[i,{}]))).then(l=>setRefs(o=>({...o,...Object.fromEntries(l)})))},[V.hak]);

 const tarih=(()=>{const f=d=>{try{const x=new Date(d);return isNaN(x)?"":`${String(x.getDate()).padStart(2,"0")}.${String(x.getMonth()+1).padStart(2,"0")}.${x.getFullYear()}`}catch{return""}};const a=f(V.bas),b=f(V.bit);return a&&b&&a!==b?a+" - "+b:a})();
 const compBilgi={isim:V.isim,il:V.il,tarih};
 const A=R.useMemo(()=>analiz({pun:V.pun,spor:V.spor,cats:V.cats,hakemler:V.hak,refs,secCat,secPanel}),[V,refs,secCat,secPanel]);
 const katAd=c=>V.cats?.[c]?.name||c;
 const katListe=Object.keys(V.pun||{}).sort((a,b)=>katSira(a,katAd(a))-katSira(b,katAd(b)));
 const sjOran=A.rutinler.length?A.rutinler.filter(r=>r.refSrc!=="Panel").length/A.rutinler.length*100:0;
 const f812=A.rutinler.filter(r=>r.f812),f816=A.rutinler.filter(r=>r.f816),sapmali=A.rutinler.filter(r=>r.f812||r.f816||r.hakemler.some(h=>h.dis));
 const atamaYok=!Object.keys(V.hak||{}).length,toplamDis=A.ozet.reduce((a,h)=>a+h.dis,0);
 const H0=A.ozet.find(h=>h.key===secH)||A.ozet[0]||null;
 const satirSirali=h=>h.satir.slice().sort((a,b)=>katSira(a.cat,a.katAd)-katSira(b.cat,b.katAd)||b.ref-a.ref);

 // ---- PDF: hakem karnesi ----
 const karnePdf=async liste=>{if(!liste.length)return;setBusy(!0);toast(__T("PDF hazırlanıyor, lütfen bekleyin..."),"info");
  try{const{doc,at,FT,o}=await pdfHazirla(!1),W=210,H=297;
   liste.forEach((h,ix)=>{ix&&doc.addPage();const P=PANEL[h.panel];
    pdfBaslik(doc,FT,o,W,"HAKEM DEĞERLENDİRME KARNESİ","JUDGE EVALUATION REPORT · FIG AER CoP 2025–2028",compBilgi,P.kod+" PANEL");try{doc.outline&&doc.outline.add(null,o(P.kod+" · "+(h.ad||h.poslar.join(", "))),{pageNumber:doc.internal.getNumberOfPages()})}catch{}
    // hakem kimlik kutusu
    let y=46;doc.setFillColor(255,255,255);doc.setDrawColor(226,232,240);doc.setLineWidth(.3);doc.roundedRect(10,y,W-20,19,2,2,"FD");doc.setFillColor(...P.rgb);doc.rect(10,y,1.6,19,"F");
    doc.setFont(FT,"bold");doc.setFontSize(13);doc.setTextColor(...INK);doc.text(o(h.ad||"(atanmamış hakem)"),15,y+7.2);
    doc.setFont(FT,"normal");doc.setFontSize(8);doc.setTextColor(71,85,105);
    doc.text(o(`${P.tr} / ${P.en}  ·  Pozisyon: ${h.poslar.join(", ")}`+(h.brove?`  ·  Brövé: ${h.brove}`:"")+(h.ulke?`  ·  Ülke: ${h.ulke}`:"")+(h.il?`  ·  İl: ${h.il}`:"")),15,y+12.5);
    doc.text(doc.splitTextToSize(o("Kategoriler: "+h.katlar.map(katAd).join(", ")),W-30)[0],15,y+16.8);
    // KPI kutuları
    y+=23;const K=[["Rutin","Routines",String(h.n)],["Ort. sapma","Mean dev.",sg(h.ort)],["Ort. |sapma|","Mean abs.",f3(h.abs)],["RMS sapma","RMS dev.",f3(h.rms)],["Tol. dışı","Out of tol.",`${h.dis} (${h.disPct.toFixed(0)}%)`],["Sıra uyumu ρ","Rank corr.",h.rho==null?"—":h.rho.toFixed(2)]],kw=(W-20-5*2.5)/6;
    K.forEach(([a,b,v],i)=>{const kx=10+i*(kw+2.5);doc.setFillColor(248,247,255);doc.setDrawColor(226,232,240);doc.roundedRect(kx,y,kw,15,1.8,1.8,"FD");doc.setFont(FT,"bold");doc.setFontSize(6.4);doc.setTextColor(100,116,139);doc.text(o(a.toLocaleUpperCase("tr-TR")),kx+2.5,y+4.3);doc.setFont(FT,"normal");doc.setFontSize(5.6);doc.text(o(b),kx+2.5,y+7.2);
     doc.setFont(FT,"bold");doc.setFontSize(11);doc.setTextColor(...(i===4&&h.dis?[185,28,28]:INK));doc.text(o(v),kx+2.5,y+13)});
    // sapma grafiği
    y+=19;doc.setFont(FT,"bold");doc.setFontSize(8.5);doc.setTextColor(...INK);doc.text(o("Sapma grafiği / Deviation chart"),10,y);doc.setFont(FT,"normal");doc.setFontSize(6.5);doc.setTextColor(100,116,139);doc.text(o("Nokta: hakem notu − referans · yeşil bant: §8.1.2 toleransı · kırmızı: tolerans dışı"),W-10,y,{align:"right"});
    const ss=satirSirali(h);pdfSapmaGrafik(doc,FT,o,10,y+2,W-20,46,ss,P.rgb);
    // histogram + bulgular
    y+=52;doc.setFont(FT,"bold");doc.setFontSize(8.5);doc.setTextColor(...INK);doc.text(o("Sapma dağılımı / Distribution"),10,y);doc.text(o("Bulgular / Findings (FIG)"),W/2+3,y);
    pdfHistogram(doc,FT,o,10,y+2,W/2-12,34,ss);
    let by=y+5;doc.setFont(FT,"normal");doc.setFontSize(7.2);h.bulgu.forEach(([kod,tr])=>{doc.setFont(FT,"bold");doc.setTextColor(...CC);doc.text(o(kod),W/2+3,by);doc.setFont(FT,"normal");doc.setTextColor(30,41,59);const ln=doc.splitTextToSize(o(tr),W/2-26);doc.text(ln,W/2+17,by);by+=ln.length*3.2+1.6});
    // kategori özeti
    y=Math.max(y+40,by+2);
    at(doc,{startY:y,theme:"grid",styles:{font:FT,...BS,halign:"center"},headStyles:HS,margin:{left:10,right:10},
     head:[[o("Kategori"),o("Rutin"),o("Ort. sapma"),o("Ort. |sapma|"),o("RMS"),o("En büyük"),o("Tol. dışı"),o("Sıra uyumu ρ")]],
     body:h.katOzet.map(k=>[{content:o(String(k.katAd).replace(/^\s*\u{1F3C6}\s*/u,"")),styles:{halign:"left",fontStyle:"bold"}},String(k.n),{content:sg(k.ort),styles:{textColor:k.ort>0?[185,28,28]:k.ort<0?[29,78,216]:INK}},f3(k.abs),f3(k.rms),f3(k.mx),{content:String(k.dis),styles:{textColor:k.dis?[185,28,28]:[22,163,74],fontStyle:"bold"}},k.rho==null?"—":k.rho.toFixed(2)]),
     columnStyles:{0:{cellWidth:52}},alternateRowStyles:{fillColor:[248,247,255]}});
    // rutin tablosu
    at(doc,{startY:doc.lastAutoTable.finalY+4,theme:"grid",styles:{font:FT,...BS},headStyles:HS,margin:{left:10,right:10,top:20},
     head:[[o("#"),o("Kategori"),o("Sporcu / Takım"),o("Kulüp"),o("Not"),o("Referans"),o("Sapma"),o("Tol."),o("Durum"),o("Atılan")]],
     body:ss.map((s,i)=>[String(i+1),o(String(s.katAd).replace(/^\s*\u{1F3C6}\s*/u,"")),o(s.sporcu),o(s.kulup),f3(s.not),o(f3(s.ref)+" "+s.refSrc),{content:sg(s.dev),styles:{textColor:s.dis?[185,28,28]:INK,fontStyle:s.dis?"bold":"normal"}},f2(s.tol),{content:o(s.dis?"TOL. DIŞI":"İçinde"),styles:{textColor:s.dis?[185,28,28]:[22,163,74],fontStyle:"bold",fontSize:6.6}},o(s.atil==="Y"?"En yüksek":s.atil==="D"?"En düşük":"")]),
     columnStyles:{0:{cellWidth:8,halign:"center"},1:{cellWidth:28},2:{cellWidth:38},3:{cellWidth:30},4:{halign:"center",cellWidth:12},5:{halign:"center",cellWidth:20},6:{halign:"center",cellWidth:14},7:{halign:"center",cellWidth:9},8:{halign:"center",cellWidth:13},9:{halign:"center",cellWidth:16,fontSize:6.4}},alternateRowStyles:{fillColor:[248,247,255]}});
    let yy=doc.lastAutoTable.finalY+5;if(yy>H-40){doc.addPage();yy=20}
    doc.setFont(FT,"normal");doc.setFontSize(6.6);doc.setTextColor(100,116,139);
    doc.text(doc.splitTextToSize(o("Referans: Superior Jury kontrol notu (SJA/SJE); yoksa panel sonucu (§8.1.1: 4 hakemde en yüksek ve en düşük not atılır, ortadaki notların ortalaması). Tolerans §8.1.2: 8.00–10.00: 0.3 · 7.00–7.99: 0.4 · 6.00–6.99: 0.5 · 0–5.99: 0.6. E notları 10 − kesinti olarak değerlendirilmiştir. Sıra uyumu: hakemin sıralaması ile referans sıralaması arasındaki Spearman katsayısı (1 = tam uyum). Bu karne derece içermez; Superior Jury değerlendirmesi için FIG maddelerine dayalı ölçümleri sunar (§2.1, §3.2)."),W-20),10,yy);
    yy+=16;doc.setTextColor(0,0,0);doc.setDrawColor(148,163,184);doc.setLineWidth(.3);doc.line(20,yy+8,80,yy+8);doc.line(W-80,yy+8,W-20,yy+8);doc.setFontSize(8);doc.text(o("CJP"),50,yy+12,{align:"center"});doc.text(o("Superior Jury Başkanı / President"),W-50,yy+12,{align:"center"})});
   sayfaNo(doc,FT,o,W,H);
   doc.save(dosyaAdi((liste.length===1?(liste[0].ad||liste[0].poslar.join("-"))+" FIG Karne":"FIG Hakem Karneleri "+(V.isim||"")))+".pdf");
   toast(__T("PDF başarıyla indirildi."),"success")}catch(er){console.error(er);toast(__T("PDF oluşturulurken bir hata oluştu."),"error")}setBusy(!1)};

 // ---- PDF: CJP sapma raporu (§3.2) ----
 const cjpPdf=async()=>{setBusy(!0);toast(__T("PDF hazırlanıyor, lütfen bekleyin..."),"info");
  try{const{doc,at,FT,o}=await pdfHazirla(!0),W=297,H=210;
   const bas=()=>pdfBaslik(doc,FT,o,W,"CJP SAPMA RAPORU","CJP DISCREPANCY REPORT TO SUPERIOR JURY · FIG AER CoP §3.2",compBilgi,"§3.2");bas();
   const K=[["Rutin-panel",String(A.rutinler.length)],["SJ referanslı",sjOran.toFixed(0)+"%"],["§8.1.2 ihlali",String(f812.length)],["§8.1.6 uç fark ≥ 1.0",String(f816.length)],["Tol. dışı not",String(toplamDis)],["Hakem",String(A.ozet.length)]],kw=(W-20-5*3)/6;
   K.forEach(([a,v],i)=>{const kx=10+i*(kw+3);doc.setFillColor(248,247,255);doc.setDrawColor(226,232,240);doc.roundedRect(kx,45,kw,12,1.8,1.8,"FD");doc.setFont(FT,"bold");doc.setFontSize(6.6);doc.setTextColor(100,116,139);doc.text(o(a.toLocaleUpperCase("tr-TR")),kx+3,49.5);doc.setFontSize(11);doc.setTextColor(...((i===2||i===3||i===4)&&v!=="0"?[185,28,28]:INK));doc.text(o(v),kx+3,55.2)});
   const mxJ=Math.max(4,...sapmali.map(r=>r.hakemler.length));
   at(doc,{startY:61,theme:"grid",styles:{font:FT,...BS,halign:"center"},headStyles:HS,margin:{left:10,right:10,top:46},
    head:[[o("Kategori"),o("Sporcu / Takım"),o("Panel"),...Array.from({length:mxJ},(_,i)=>o("J"+(i+1))),o("Orta fark / tol.\n§8.1.2"),o("Uç fark\n§8.1.6"),o("Panel sonucu"),o("Referans"),o("Bulgular")]],
    body:sapmali.map(r=>[{content:o(String(r.katAd).replace(/^\s*\u{1F3C6}\s*/u,"")),styles:{halign:"left"}},{content:o(r.ad),styles:{halign:"left"}},{content:PANEL[r.panel].kod,styles:{textColor:PANEL[r.panel].rgb,fontStyle:"bold"}},
     ...Array.from({length:mxJ},(_,i)=>{const h=r.hakemler[i];if(!h)return"";return{content:f2(h.not)+(h.atil?" ("+(h.atil==="Y"?"Y":"D")+")":""),styles:{textColor:h.dis?[185,28,28]:INK,fontStyle:h.dis?"bold":"normal",fillColor:h.dis?[254,242,242]:void 0}}}),
     {content:f2(r.ortaFark)+" / "+f2(r.ortaTol),styles:{textColor:r.f812?[185,28,28]:INK,fontStyle:r.f812?"bold":"normal"}},{content:f2(r.uc),styles:{textColor:r.f816?[185,28,28]:INK,fontStyle:r.f816?"bold":"normal"}},f3(r.panelFinal),o(f3(r.ref)+" "+r.refSrc),
     {content:o([r.f812?"§8.1.2 tolerans aşıldı → tüm notların ort.":"",r.f816?"§8.1.6 analiz gerekli":"",r.hakemler.some(h=>h.dis)?"Tol. dışı: "+r.hakemler.filter(h=>h.dis).map(h=>h.pos).join(", "):""].filter(Boolean).join(" · ")),styles:{halign:"left",fontSize:6.6}}]),
    columnStyles:{0:{cellWidth:30,halign:"left"},1:{cellWidth:46,halign:"left"},2:{cellWidth:10}},alternateRowStyles:{fillColor:[248,247,255]},didDrawPage:z=>{z.pageNumber>1&&bas()}});
   let y=doc.lastAutoTable.finalY+6;if(y>H-40){doc.addPage();bas();y=48}
   doc.setFont(FT,"bold");doc.setFontSize(9.5);doc.setTextColor(...INK);doc.text(o("Hakem özeti / Judges summary"),10,y);
   at(doc,{startY:y+2,theme:"grid",styles:{font:FT,...BS,halign:"center"},headStyles:HS,margin:{left:10,right:10,top:46},
    head:[[o("Panel"),o("Pozisyon"),o("Hakem"),o("Rutin"),o("Ort. sapma"),o("Ort. |sapma|"),o("RMS"),o("Tol. dışı"),o("§8.1.6 uç not"),o("Atılan Y/D"),o("ρ")]],
    body:A.ozet.map(h=>[{content:PANEL[h.panel].kod,styles:{textColor:PANEL[h.panel].rgb,fontStyle:"bold"}},o(h.poslar.join(", ")),{content:o(h.ad||"—"),styles:{halign:"left",fontStyle:"bold"}},String(h.n),sg(h.ort),f3(h.abs),f3(h.rms),{content:`${h.dis} (${h.disPct.toFixed(0)}%)`,styles:{textColor:h.dis?[185,28,28]:[22,163,74]}},String(h.uc816),`${h.atilanY} / ${h.atilanD}`,h.rho==null?"—":h.rho.toFixed(2)]),
    alternateRowStyles:{fillColor:[248,247,255]},didDrawPage:z=>{z.pageNumber>1&&bas()}});
   y=doc.lastAutoTable.finalY+14;if(y>H-20){doc.addPage();bas();y=60}
   doc.setFont(FT,"normal");doc.setFontSize(8);doc.setTextColor(0,0,0);doc.setDrawColor(148,163,184);doc.line(20,y,90,y);doc.line(W-90,y,W-20,y);doc.text(o("CJP"),55,y+4,{align:"center"});doc.text(o("Superior Jury Başkanı / President"),W-55,y+4,{align:"center"});
   sayfaNo(doc,FT,o,W,H);doc.save(dosyaAdi((V.isim||"")+" CJP Sapma Raporu")+".pdf");toast(__T("PDF başarıyla indirildi."),"success")}
  catch(er){console.error(er);toast(__T("PDF oluşturulurken bir hata oluştu."),"error")}setBusy(!1)};

 const excel=()=>{const wb=XU.book_new();
  XU.book_append_sheet(wb,XU.json_to_sheet(A.ozet.map(h=>({Panel:PANEL[h.panel].kod,Pozisyon:h.poslar.join(", "),Hakem:h.ad,"Brövé":h.brove,"Ülke":h.ulke,"İl":h.il,Rutin:h.n,"Ort. sapma":r3(h.ort),"Ort. |sapma|":r3(h.abs),"RMS sapma":r3(h.rms),"En büyük":r3(h.mx),"Tolerans dışı":h.dis,"Tol. dışı %":Math.round(h.disPct),"§8.1.6 uç not":h.uc816,"Atılan en yüksek":h.atilanY,"Atılan en düşük":h.atilanD,"Sıra uyumu ρ":h.rho==null?"":r3(h.rho),"Bulgular (FIG)":h.bulgu.map(b=>b[0]+" "+b[1]).join(" | ")}))),"Hakem Ozeti");
  XU.book_append_sheet(wb,XU.json_to_sheet(A.ozet.flatMap(h=>h.katOzet.map(k=>({Panel:PANEL[h.panel].kod,Hakem:h.ad||h.poslar.join(", "),Kategori:k.katAd,Rutin:k.n,"Ort. sapma":r3(k.ort),"Ort. |sapma|":r3(k.abs),RMS:r3(k.rms),"Tol. dışı":k.dis,"Sıra uyumu ρ":k.rho==null?"":r3(k.rho)})))),"Kategori Bazinda");
  XU.book_append_sheet(wb,XU.json_to_sheet(A.ozet.flatMap(h=>satirSirali(h).map(s=>({Panel:PANEL[h.panel].kod,Pozisyon:s.pos,Hakem:h.ad,Kategori:s.katAd,"Sporcu/Takım":s.sporcu,"Kulüp":s.kulup,Not:r3(s.not),Referans:r3(s.ref),"Ref. kaynağı":s.refSrc,Sapma:r3(s.dev),Tolerans:s.tol,"Tolerans dışı":s.dis?"EVET":"","Atılan":s.atil==="Y"?"En yüksek":s.atil==="D"?"En düşük":""})))),"Hakem Notlari");
  XU.book_append_sheet(wb,XU.json_to_sheet(sapmali.map(r=>({Kategori:r.katAd,"Sporcu/Takım":r.ad,Panel:PANEL[r.panel].kod,...Object.fromEntries(r.hakemler.map(h=>[h.pos,r3(h.not)])),"Orta fark":r3(r.ortaFark),"Tolerans §8.1.2":r.ortaTol,"§8.1.2 ihlali":r.f812?"EVET":"","Uç fark":r3(r.uc),"§8.1.6":r.f816?"EVET":"","Panel sonucu":r3(r.panelFinal),Referans:r3(r.ref),"Ref. kaynağı":r.refSrc}))),"CJP Sapma Raporu");
  XW(wb,dosyaAdi((V.isim||"")+" FIG Hakem Karnesi")+".xlsx")};

 // ---- görünüm ----
 const C={bg:"#F0F2F5",card:"#fff",line:"#E5E7EB",soft:"#F8FAFC",ink:"#1A1D26",ink2:"#334155",muted:"#6B7280",sub:"#94A3B8"};
 const S={wrap:{minHeight:"100vh",background:C.bg,color:C.ink,fontFamily:"Nunito,system-ui,-apple-system,sans-serif",paddingBottom:"3rem"},
  top:{position:"sticky",top:0,zIndex:20,background:"#fff",borderBottom:"1px solid "+C.line,boxShadow:"0 1px 3px rgba(0,0,0,.06)"},
  topIn:{maxWidth:1280,margin:"0 auto",minHeight:68,padding:".5rem 1.25rem",display:"flex",alignItems:"center",gap:".8rem",flexWrap:"wrap"},
  ico:{width:44,height:44,borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,background:"linear-gradient(135deg,#7C3AED,#4338CA)",boxShadow:"0 6px 18px rgba(99,102,241,.3)"},
  in:{maxWidth:1280,margin:"0 auto",padding:"1.1rem 1.25rem"},card:{background:C.card,border:"1px solid "+C.line,borderRadius:16,padding:"1rem 1.1rem",marginBottom:"1rem"},
  sel:{padding:".55rem .75rem",borderRadius:11,border:"1px solid "+C.line,background:C.soft,color:C.ink,fontWeight:700,fontSize:".88rem",fontFamily:"inherit",maxWidth:"100%"},
  btn:(bg,fg,bd)=>({display:"inline-flex",alignItems:"center",gap:".35rem",padding:".55rem .9rem",borderRadius:11,border:bd||"none",background:bg,color:fg||"#fff",fontWeight:800,cursor:"pointer",fontSize:".84rem",fontFamily:"inherit",whiteSpace:"nowrap"}),
  tab:on=>({padding:".55rem 1rem",borderRadius:11,border:"1.5px solid "+(on?"#4338CA":C.line),background:on?"#4338CA":"#fff",color:on?"#fff":C.ink2,fontWeight:800,cursor:"pointer",fontSize:".86rem",fontFamily:"inherit"}),
  chip:(on,renk)=>({padding:".3rem .7rem",borderRadius:999,fontSize:".78rem",fontWeight:800,cursor:"pointer",border:"1.5px solid "+(on?(renk||"#4338CA"):C.line),background:on?(renk||"#4338CA"):"#fff",color:on?"#fff":C.ink2,userSelect:"none"}),
  th:{padding:".55rem .5rem",fontSize:".7rem",color:C.muted,fontWeight:800,textTransform:"uppercase",letterSpacing:".03em",textAlign:"center",borderBottom:"1px solid "+C.line,whiteSpace:"nowrap",background:C.soft},
  td:{padding:".5rem .5rem",borderBottom:"1px solid #EEF2F7",fontWeight:700,fontSize:".84rem",textAlign:"center"},
  h3:{fontWeight:900,fontSize:"1rem",margin:"0 0 .2rem"},hs:{fontSize:".78rem",color:C.muted,fontWeight:700,margin:"0 0 .8rem"}};
 const MI=(n,st)=>e.jsx("span",{className:"material-icons-round",style:{fontSize:"1.1rem",...(st||{})},children:n});
 const kpi=(ic,renk,b,d,alt,vurgu)=>e.jsxs("div",{style:{background:"#fff",border:"1px solid "+C.line,borderRadius:16,padding:".85rem 1rem",display:"flex",gap:".75rem",alignItems:"center"},children:[e.jsx("div",{style:{width:40,height:40,borderRadius:11,background:renk,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0},children:MI(ic)}),e.jsxs("div",{style:{minWidth:0},children:[e.jsx("div",{style:{fontSize:"1.35rem",fontWeight:900,lineHeight:1.05,color:vurgu||C.ink},children:d}),e.jsx("div",{style:{fontSize:".75rem",fontWeight:800,color:C.muted},children:b}),alt?e.jsx("div",{style:{fontSize:".68rem",fontWeight:700,color:C.sub},children:alt}):null]})]});
 const panelEt=pn=>e.jsx("span",{style:{display:"inline-block",minWidth:22,padding:".1rem .35rem",borderRadius:6,fontSize:".72rem",fontWeight:900,color:"#fff",background:PANEL[pn].renk,textAlign:"center"},children:PANEL[pn].kod});
 const devRenk=(d,dis)=>dis?"#DC2626":Math.abs(d)<=.1?"#15803D":C.ink;

 if(loading)return e.jsx("div",{style:{...S.wrap,padding:"2rem"},children:__T("Yükleniyor…")});
 if(!authed)return e.jsx("div",{style:{...S.wrap,padding:"2rem",fontWeight:700,color:C.muted},children:__T("Bu sayfayı görmek için giriş yapın veya geçerli bir link kullanın.")});

 // Genel bakış grafikleri
 const dogrulukGrafik=()=>{const L=A.ozet;if(!L.length)return null;const mxA=Math.max(.3,...L.map(h=>h.abs)),mxO=Math.max(.2,...L.map(h=>Math.abs(h.ort)));
  return e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(380px,1fr))",gap:"1rem"},children:[
   e.jsxs("div",{style:{...S.card,marginBottom:0},children:[e.jsx("div",{style:S.h3,children:__T("Hakem doğruluğu")}),e.jsx("div",{style:S.hs,children:__T("Ortalama mutlak sapma (küçük = referansa yakın) · sağda tolerans dışı not sayısı")}),
    ...L.slice().sort((a,b)=>a.abs-b.abs).map(h=>e.jsxs("div",{onClick:()=>{setSecH(h.key);setSekme("hakem")},style:{display:"grid",gridTemplateColumns:"minmax(110px,180px) 1fr 70px",gap:".6rem",alignItems:"center",padding:".28rem 0",cursor:"pointer"},children:[
     e.jsxs("div",{style:{display:"flex",gap:".4rem",alignItems:"center",minWidth:0},children:[panelEt(h.panel),e.jsx("span",{style:{fontWeight:800,fontSize:".82rem",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},title:h.ad,children:h.ad||h.poslar.join(", ")})]}),
     e.jsxs("div",{style:{position:"relative",height:18,background:"#F1F5F9",borderRadius:6,overflow:"hidden"},children:[e.jsx("div",{style:{position:"absolute",left:0,top:0,bottom:0,width:(h.abs/mxA*100)+"%",background:"linear-gradient(90deg,"+PANEL[h.panel].renk+"cc,"+PANEL[h.panel].renk+")",borderRadius:6}}),e.jsx("span",{style:{position:"absolute",right:6,top:1,fontSize:".72rem",fontWeight:900,color:C.ink2},children:f3(h.abs)})]}),
     e.jsx("span",{style:{fontSize:".75rem",fontWeight:900,color:h.dis?"#DC2626":"#15803D",textAlign:"right"},children:h.dis?h.dis+" "+__T("tol. dışı"):"✓"})]},h.key))]}),
   e.jsxs("div",{style:{...S.card,marginBottom:0},children:[e.jsx("div",{style:S.h3,children:__T("Sistematik eğilim")}),e.jsx("div",{style:S.hs,children:__T("Ortalama işaretli sapma: sağ = referanstan yüksek, sol = düşük not (§2.1)")}),
    ...L.slice().sort((a,b)=>b.ort-a.ort).map(h=>e.jsxs("div",{onClick:()=>{setSecH(h.key);setSekme("hakem")},style:{display:"grid",gridTemplateColumns:"minmax(110px,180px) 1fr 64px",gap:".6rem",alignItems:"center",padding:".28rem 0",cursor:"pointer"},children:[
     e.jsxs("div",{style:{display:"flex",gap:".4rem",alignItems:"center",minWidth:0},children:[panelEt(h.panel),e.jsx("span",{style:{fontWeight:800,fontSize:".82rem",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:h.ad||h.poslar.join(", ")})]}),
     e.jsxs("div",{style:{position:"relative",height:18,background:"#F8FAFC",borderRadius:6},children:[e.jsx("div",{style:{position:"absolute",left:"50%",top:-2,bottom:-2,width:1.5,background:"#94A3B8"}}),e.jsx("div",{style:{position:"absolute",top:2,bottom:2,borderRadius:5,background:h.ort>=0?"#F87171":"#60A5FA",...(h.ort>=0?{left:"50%",width:(h.ort/mxO*50)+"%"}:{right:"50%",width:(-h.ort/mxO*50)+"%"})}})]}),
     e.jsx("span",{style:{fontSize:".78rem",fontWeight:900,color:h.ort>0?"#B91C1C":h.ort<0?"#1D4ED8":C.ink2,textAlign:"right"},children:sg(h.ort)})]},h.key))]})]})};
 const isiHaritasi=()=>{const L=A.ozet,K=[...new Set(A.rutinler.map(r=>r.cat))].sort((a,b)=>katSira(a,katAd(a))-katSira(b,katAd(b)));if(!L.length||!K.length)return null;
  const hucre=k=>{if(!k)return{background:"#fff",color:C.sub};const t=Math.max(-1,Math.min(1,k.ort/.5)),a=Math.abs(t);return{background:t>=0?`rgba(239,68,68,${.08+a*.55})`:`rgba(59,130,246,${.08+a*.55})`,color:a>.6?"#fff":C.ink}};
  return e.jsxs("div",{style:{...S.card,marginTop:"1rem"},children:[e.jsx("div",{style:S.h3,children:__T("Hakem × kategori ısı haritası")}),e.jsx("div",{style:S.hs,children:__T("Hücre: o kategorideki ortalama işaretli sapma (kırmızı = yüksek, mavi = düşük not) · alt satır: tolerans dışı / rutin")}),
   e.jsx("div",{style:{overflowX:"auto"},children:e.jsxs("table",{style:{borderCollapse:"separate",borderSpacing:3,minWidth:"100%"},children:[
    e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{style:{...S.th,background:"transparent",textAlign:"left",borderBottom:"none"},children:__T("Hakem")}),...K.map(c=>e.jsx("th",{style:{...S.th,background:"transparent",borderBottom:"none",whiteSpace:"normal",minWidth:70,maxWidth:110,fontSize:".64rem"},children:String(katAd(c)).replace(/^\s*\u{1F3C6}\s*/u,"")},c))]})}),
    e.jsx("tbody",{children:L.map(h=>e.jsxs("tr",{children:[e.jsx("td",{style:{padding:".3rem .4rem",fontWeight:800,fontSize:".8rem",whiteSpace:"nowrap"},children:e.jsxs("span",{style:{display:"inline-flex",gap:".35rem",alignItems:"center"},children:[panelEt(h.panel),h.ad||h.poslar.join(", ")]})}),
     ...K.map(c=>{const k=h.katOzet.find(x=>x.cat===c),st=hucre(k);return e.jsx("td",{title:k?`${katAd(c)}\n${k.n} rutin · ort ${sg(k.ort)} · |ort| ${f3(k.abs)} · tol. dışı ${k.dis}`:"",style:{...st,borderRadius:8,textAlign:"center",padding:".35rem .3rem",fontWeight:900,fontSize:".76rem",minWidth:62},children:k?e.jsxs("div",{children:[sg(k.ort),e.jsx("div",{style:{fontSize:".62rem",fontWeight:800,opacity:.85},children:k.dis+"/"+k.n})]}):"—"},c)})]},h.key))})]})})]})};

 // Hakem karnesi (tek hakem)
 const hakemDetay=h=>{if(!h)return e.jsx("div",{style:{...S.card,color:C.muted,fontWeight:700},children:__T("Tamamlanmış puan yok.")});const P=PANEL[h.panel],ss=satirSirali(h);
  return e.jsxs("div",{children:[
   e.jsxs("div",{style:{...S.card,display:"flex",gap:"1rem",alignItems:"center",flexWrap:"wrap",borderLeft:"5px solid "+P.renk},children:[
    e.jsxs("div",{style:{flex:1,minWidth:240},children:[e.jsxs("div",{style:{display:"flex",gap:".5rem",alignItems:"center"},children:[panelEt(h.panel),e.jsx("span",{style:{fontWeight:900,fontSize:"1.2rem"},children:h.ad||__T("(atanmamış hakem)")})]}),
     e.jsx("div",{style:{fontSize:".8rem",color:C.muted,fontWeight:700,marginTop:".25rem"},children:[P.tr,__T("Pozisyon")+": "+h.poslar.join(", "),h.brove?__T("Brövé")+": "+h.brove:"",h.ulke?__T("Ülke")+": "+h.ulke:"",h.il?__T("İl")+": "+h.il:""].filter(Boolean).join(" · ")}),
     e.jsx("div",{style:{fontSize:".76rem",color:C.sub,fontWeight:700,marginTop:".2rem"},children:h.katlar.map(katAd).map(x=>String(x).replace(/^\s*\u{1F3C6}\s*/u,"")).join(" · ")})]}),
    e.jsxs("button",{style:S.btn("linear-gradient(135deg,#7C3AED,#4338CA)"),disabled:busy,onClick:()=>karnePdf([h]),children:[MI("picture_as_pdf"),__T("Karne PDF")]})]}),
   e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",gap:".7rem",marginBottom:"1rem"},children:[
    kpi("format_list_numbered","#475569",__T("Rutin"),h.n),kpi("swap_vert",h.ort>0?"#DC2626":h.ort<0?"#2563EB":"#475569",__T("Ort. sapma"),sg(h.ort),"§2.1"),kpi("straighten","#4338CA",__T("Ort. |sapma|"),f3(h.abs)),kpi("functions","#7C3AED",__T("RMS sapma"),f3(h.rms)),
    kpi("rule",h.dis?"#DC2626":"#16A34A",__T("Tolerans dışı"),`${h.dis} (${h.disPct.toFixed(0)}%)`,"§8.1.2",h.dis?"#B91C1C":null),kpi("sort",h.rho==null?"#94A3B8":"#0891B2",__T("Sıra uyumu ρ"),h.rho==null?"—":h.rho.toFixed(2),__T("Spearman"))]}),
   e.jsxs("div",{style:S.card,children:[e.jsx("div",{style:S.h3,children:__T("Sapma grafiği")}),e.jsx("div",{style:S.hs,children:__T("Her nokta bir rutin: hakem notu − referans. Yeşil bant §8.1.2 toleransı, kırmızı nokta tolerans dışı. Noktanın üzerine gelince ayrıntı görünür.")}),e.jsx(SapmaGrafik,{satir:ss,renk:P.renk})]}),
   e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(340px,1fr))",gap:"1rem",marginBottom:"1rem"},children:[
    e.jsxs("div",{style:{...S.card,marginBottom:0},children:[e.jsx("div",{style:S.h3,children:__T("Sapma dağılımı")}),e.jsx("div",{style:S.hs,children:__T("0.1'lik aralıklarla sapma sayısı")}),e.jsx(Histogram,{satir:ss})]}),
    e.jsxs("div",{style:{...S.card,marginBottom:0},children:[e.jsx("div",{style:S.h3,children:__T("Bulgular (FIG)")}),e.jsx("div",{style:S.hs,children:__T("Yalnızca FIG AER CoP maddelerine dayalı ölçümler; derece verilmez.")}),
     ...h.bulgu.map((b,i)=>e.jsxs("div",{style:{display:"flex",gap:".6rem",padding:".45rem 0",borderTop:i?"1px solid #EEF2F7":"none"},children:[e.jsx("span",{style:{flexShrink:0,fontSize:".72rem",fontWeight:900,color:"#7C3AED",background:"#F5F3FF",borderRadius:6,padding:".1rem .4rem",height:"fit-content"},children:b[0]}),e.jsx("span",{style:{fontSize:".84rem",fontWeight:700,color:C.ink2},children:b[1]})]},i))]})]}),
   e.jsxs("div",{style:{...S.card,overflowX:"auto"},children:[e.jsx("div",{style:S.h3,children:__T("Kategori bazında")}),e.jsxs("table",{style:{width:"100%",borderCollapse:"collapse",minWidth:640},children:[
    e.jsx("thead",{children:e.jsx("tr",{children:["Kategori","Rutin","Ort. sapma","Ort. |sapma|","RMS","En büyük","Tol. dışı","Sıra uyumu ρ"].map(t=>e.jsx("th",{style:S.th,children:__T(t)},t))})}),
    e.jsx("tbody",{children:h.katOzet.map(k=>e.jsxs("tr",{children:[e.jsx("td",{style:{...S.td,textAlign:"left"},children:String(k.katAd).replace(/^\s*\u{1F3C6}\s*/u,"")}),e.jsx("td",{style:S.td,children:k.n}),e.jsx("td",{style:{...S.td,color:k.ort>0?"#B91C1C":k.ort<0?"#1D4ED8":C.ink},children:sg(k.ort)}),e.jsx("td",{style:S.td,children:f3(k.abs)}),e.jsx("td",{style:S.td,children:f3(k.rms)}),e.jsx("td",{style:S.td,children:f3(k.mx)}),e.jsx("td",{style:{...S.td,color:k.dis?"#DC2626":"#15803D"},children:k.dis}),e.jsx("td",{style:S.td,children:k.rho==null?"—":k.rho.toFixed(2)})]},k.cat))})]})]}),
   e.jsxs("div",{style:{...S.card,overflowX:"auto"},children:[e.jsx("div",{style:S.h3,children:__T("Rutinler")}),e.jsxs("table",{style:{width:"100%",borderCollapse:"collapse",minWidth:860},children:[
    e.jsx("thead",{children:e.jsx("tr",{children:["Kategori","Sporcu / Takım","Kulüp","Not","Referans","Sapma","Tol.","Durum","Atılan"].map(t=>e.jsx("th",{style:S.th,children:__T(t)},t))})}),
    e.jsx("tbody",{children:ss.map((s,i)=>e.jsxs("tr",{style:{background:s.dis?"#FEF2F2":"transparent"},children:[
     e.jsx("td",{style:{...S.td,textAlign:"left",fontWeight:700,color:C.ink2},children:String(s.katAd).replace(/^\s*\u{1F3C6}\s*/u,"")}),e.jsx("td",{style:{...S.td,textAlign:"left"},children:s.sporcu}),e.jsx("td",{style:{...S.td,textAlign:"left",color:C.muted},children:s.kulup}),
     e.jsx("td",{style:S.td,children:f3(s.not)}),e.jsxs("td",{style:S.td,children:[f3(s.ref)," ",e.jsx("span",{style:{fontSize:".66rem",color:C.sub},children:s.refSrc})]}),
     e.jsx("td",{style:{...S.td,color:devRenk(s.dev,s.dis),fontWeight:900},children:sg(s.dev)}),e.jsx("td",{style:{...S.td,color:C.muted},children:"±"+f2(s.tol)}),
     e.jsx("td",{style:S.td,children:e.jsx("span",{style:{padding:".12rem .45rem",borderRadius:6,fontSize:".7rem",fontWeight:900,color:s.dis?"#B91C1C":"#15803D",background:s.dis?"#FEE2E2":"#DCFCE7"},children:s.dis?__T("TOL. DIŞI"):__T("İçinde")})}),
     e.jsx("td",{style:{...S.td,color:C.muted,fontSize:".74rem"},children:s.atil==="Y"?__T("↑ en yüksek"):s.atil==="D"?__T("↓ en düşük"):""})]},i))})]})]})]})};

 const rutinTablo=()=>{const L=sadeceBulgu?sapmali:A.rutinler,mxJ=Math.max(4,...L.map(r=>r.hakemler.length));
  return e.jsxs("div",{style:{...S.card,overflowX:"auto"},children:[
   e.jsxs("div",{style:{display:"flex",gap:".5rem",alignItems:"center",flexWrap:"wrap",marginBottom:".7rem"},children:[e.jsx("div",{style:{...S.h3,margin:0,flex:1},children:__T("Rutin analizi")+" · "+L.length}),
    e.jsx("span",{style:S.chip(sadeceBulgu),onClick:()=>setSadeceBulgu(!0),children:__T("Bulgulu rutinler")+" · "+sapmali.length}),e.jsx("span",{style:S.chip(!sadeceBulgu),onClick:()=>setSadeceBulgu(!1),children:__T("Tüm rutinler")+" · "+A.rutinler.length})]}),
   L.length?e.jsxs("table",{style:{width:"100%",borderCollapse:"collapse",minWidth:1100},children:[
    e.jsx("thead",{children:e.jsx("tr",{children:[__T("Kategori"),__T("Sporcu / Takım"),__T("Panel"),...Array.from({length:mxJ},(_,i)=>"J"+(i+1)),__T("Orta fark / tol."),__T("Uç fark"),__T("Panel sonucu"),__T("Referans"),__T("Bulgular")].map((t,i)=>e.jsx("th",{style:S.th,children:t},i))})}),
    e.jsx("tbody",{children:L.map((r,i)=>e.jsxs("tr",{children:[
     e.jsx("td",{style:{...S.td,textAlign:"left",color:C.ink2},children:String(r.katAd).replace(/^\s*\u{1F3C6}\s*/u,"")}),e.jsx("td",{style:{...S.td,textAlign:"left"},children:r.ad}),e.jsx("td",{style:S.td,children:panelEt(r.panel)}),
     ...Array.from({length:mxJ},(_,j)=>{const h=r.hakemler[j];return e.jsx("td",{style:{...S.td,padding:".35rem .25rem"},children:h?e.jsxs("span",{title:(h.hakemAd?h.hakemAd+" · ":"")+h.pos+" · sapma "+sg(h.dev),style:{display:"inline-block",minWidth:44,padding:".15rem .3rem",borderRadius:7,fontWeight:900,fontSize:".8rem",background:h.dis?"#FEE2E2":h.atil?"#F1F5F9":"transparent",color:h.dis?"#B91C1C":h.atil?C.sub:C.ink,textDecoration:h.atil?"line-through":"none",border:h.ucta?"1.5px dashed #F59E0B":"1.5px solid transparent"},children:[f2(h.not),h.atil==="Y"?" ↑":h.atil==="D"?" ↓":""]}):""},j)}),
     e.jsx("td",{style:{...S.td,color:r.f812?"#DC2626":C.ink},children:f2(r.ortaFark)+" / "+f2(r.ortaTol)}),e.jsx("td",{style:{...S.td,color:r.f816?"#DC2626":C.ink},children:f2(r.uc)}),
     e.jsx("td",{style:S.td,children:f3(r.panelFinal)}),e.jsxs("td",{style:S.td,children:[f3(r.ref)," ",e.jsx("span",{style:{fontSize:".66rem",color:C.sub},children:r.refSrc})]}),
     e.jsx("td",{style:{...S.td,textAlign:"left",fontSize:".74rem",color:"#B91C1C",minWidth:180},children:[r.f812?"§8.1.2 "+__T("tolerans aşıldı → tüm notların ort."):"",r.f816?"§8.1.6 "+__T("analiz gerekli"):"",r.hakemler.some(h=>h.dis)?__T("Tol. dışı")+": "+r.hakemler.filter(h=>h.dis).map(h=>h.pos).join(", "):""].filter(Boolean).join(" · ")||e.jsx("span",{style:{color:"#15803D"},children:"✓"})})]},i))})]}):e.jsx("div",{style:{color:"#15803D",fontWeight:800},children:__T("Sapma yok.")}),
   e.jsx("div",{style:{fontSize:".72rem",color:C.muted,fontWeight:700,marginTop:".6rem"},children:__T("Üstü çizili: §8.1.1 gereği atılan not (↑ en yüksek, ↓ en düşük) · kırmızı: tolerans dışı · kesik turuncu çerçeve: §8.1.6 uç not")})]})};

 const kurallar=()=>e.jsxs("div",{style:S.card,children:[e.jsx("div",{style:S.h3,children:"FIG Aerobic Gymnastics Code of Points 2025–2028"}),e.jsx("div",{style:S.hs,children:__T("Bu karne yalnızca aşağıdaki FIG maddelerine dayanır; TCF'ye özgü derece veya eşik kullanılmaz.")}),
  ...[["§8.1.1",__T("4 hakemde en yüksek ve en düşük not atılır, ortadaki 2 notun ortalaması alınır (6 hakemde 2+2).")],["§8.1.2",__T("Ortadaki iki not arasındaki azami fark: 8.00–10.00: 0.3 · 7.00–7.99: 0.4 · 6.00–6.99: 0.5 · 0–5.99: 0.6. Aşılırsa tüm notların ortalaması son puandır.")],["§8.1.6",__T("Uç notlar arasında 1.0 veya daha fazla fark varsa yarışma sonrası hakem analizi yapılır.")],["§2.1",__T("Superior Jury hakem sapmalarını kayda geçirir; tekrarlayan sapma, taraflılık veya sürekli çok yüksek/düşük not → uyarı ya da hakem değişikliği.")],["§3.2",__T("CJP yarışma sonunda tüm hakemlerin sapma raporunu Superior Jury'ye gönderir.")],[__T("Referans"),__T("Superior Jury kontrol notu (SJA/SJE); yoksa §8.1.1 panel sonucu. Hakemin notu referanstan §8.1.2 toleransından fazla saparsa tolerans dışı sayılır. E notları 10 − kesinti olarak değerlendirilir.")],[__T("Ölçümler"),__T("Ort. sapma (işaretli), ort. mutlak sapma, RMS sapma, en büyük sapma, tolerans dışı sayısı, atılan notlar ve Spearman sıra uyumu (hakem sıralaması ↔ referans sıralaması).")]].map(([k,t],i)=>e.jsxs("div",{style:{display:"flex",gap:".7rem",padding:".55rem 0",borderTop:i?"1px solid #EEF2F7":"none"},children:[e.jsx("span",{style:{flexShrink:0,minWidth:70,fontSize:".76rem",fontWeight:900,color:"#7C3AED"},children:k}),e.jsx("span",{style:{fontSize:".86rem",fontWeight:600,color:C.ink2,lineHeight:1.5},children:t})]},i))]});

 return e.jsxs("div",{style:S.wrap,children:[
  e.jsx("div",{style:S.top,children:e.jsxs("div",{style:S.topIn,children:[
   currentUser?e.jsx("a",{href:"/aerobik",title:__T("Geri"),style:{width:38,height:38,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",color:C.ink,textDecoration:"none"},children:MI("arrow_back",{fontSize:"1.4rem"})}):null,
   e.jsx("div",{style:S.ico,children:MI("fact_check",{color:"#fff",fontSize:"1.4rem"})}),
   e.jsxs("div",{style:{flex:1,minWidth:200},children:[e.jsx("div",{style:{fontWeight:900,fontSize:"1.12rem"},children:__T("FIG Hakem Değerlendirme Karnesi")}),e.jsx("div",{style:{fontSize:".78rem",color:C.muted,fontWeight:700},children:(V.isim?V.isim+" · ":"")+"FIG AER CoP 2025–2028"})]}),
   !urlComp?e.jsxs("select",{style:S.sel,value:comp,onChange:ev=>{setComp(ev.target.value);setSecCat([]);setSecH(null)},children:[e.jsx("option",{value:"",children:__T("Yarışma seçin…")}),Object.entries(comps).sort((a,b)=>String(b[1].t).localeCompare(String(a[1].t))).map(([k,c])=>e.jsx("option",{value:k,children:c.isim},k))]}):null,
   comp?e.jsxs("button",{style:S.btn("linear-gradient(135deg,#7C3AED,#4338CA)"),disabled:busy||!A.ozet.length,onClick:()=>karnePdf(A.ozet),children:[MI("picture_as_pdf"),__T("Tüm karneler")]}):null,
   comp?e.jsxs("button",{style:S.btn("#fff","#B91C1C","1.5px solid #FCA5A5"),disabled:busy||!A.rutinler.length,onClick:cjpPdf,children:[MI("summarize"),__T("CJP Sapma Raporu")]}):null,
   comp?e.jsxs("button",{style:S.btn("#fff","#15803D","1.5px solid #86EFAC"),disabled:!A.rutinler.length,onClick:excel,children:[MI("table_view"),"Excel"]}):null]})}),
  e.jsxs("div",{style:S.in,children:[
   !comp?e.jsx("div",{style:{...S.card,color:C.muted,fontWeight:700},children:__T("Yarışma seçin.")}):e.jsxs(e.Fragment,{children:[
    atamaYok?e.jsxs("div",{style:{...S.card,background:"#FFFBEB",borderColor:"#FCD34D",color:"#92400E",fontWeight:700,fontSize:".84rem",display:"flex",gap:".5rem",alignItems:"center"},children:[MI("info"),__T("Bu yarışmada hakem ataması yok; karneler pozisyon adıyla (A1, E2…) çıkar. Hakem adları için: Yarışmalar → Hakem Ataması.")]}):null,
    e.jsxs("div",{style:S.card,children:[
     e.jsxs("div",{style:{display:"flex",gap:".4rem",flexWrap:"wrap",alignItems:"center",marginBottom:".6rem"},children:[e.jsx("span",{style:{fontSize:".72rem",color:C.muted,fontWeight:900,textTransform:"uppercase",marginRight:".3rem"},children:__T("Panel")}),
      ...[["","A + E"],["a",__T("A — Artistik")],["e",__T("E — Uygulama")]].map(([v,l])=>e.jsx("span",{style:S.chip(secPanel===v,v?PANEL[v].renk:null),onClick:()=>{setSecPanel(v);setSecH(null)},children:l},v||"t"))]}),
     e.jsxs("div",{style:{display:"flex",gap:".35rem",flexWrap:"wrap",alignItems:"center"},children:[e.jsx("span",{style:{fontSize:".72rem",color:C.muted,fontWeight:900,textTransform:"uppercase",marginRight:".3rem"},children:__T("Kategori")}),e.jsx("span",{style:S.chip(!secCat.length),onClick:()=>setSecCat([]),children:__T("Tümü")}),
      ...katListe.map(c=>e.jsx("span",{style:S.chip(secCat.includes(c)),onClick:()=>setSecCat(o=>o.includes(c)?o.filter(x=>x!==c):[...o,c]),children:String(katAd(c)).replace(/^\s*\u{1F3C6}\s*/u,"🏆 ")},c))]})]}),
    e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(175px,1fr))",gap:".75rem",marginBottom:"1rem"},children:[
     kpi("assignment","#475569",__T("Değerlendirilen rutin-panel"),A.rutinler.length),
     kpi("verified",sjOran>=80?"#16A34A":"#F59E0B",__T("Superior Jury referanslı"),sjOran.toFixed(0)+"%",__T("SJA/SJE kontrol notu")),
     kpi("difference",f812.length?"#DC2626":"#16A34A","§8.1.2 "+__T("ihlali"),f812.length,__T("orta notlar tolerans dışı"),f812.length?"#B91C1C":null),
     kpi("warning",f816.length?"#DC2626":"#16A34A","§8.1.6 "+__T("uç fark ≥ 1.0"),f816.length,__T("hakem analizi gerekli"),f816.length?"#B91C1C":null),
     kpi("rule",toplamDis?"#F59E0B":"#16A34A",__T("Tolerans dışı hakem notu"),toplamDis),
     kpi("groups","#4338CA",__T("Hakem"),A.ozet.length,A.ozet.filter(h=>h.panel==="a").length+" A · "+A.ozet.filter(h=>h.panel==="e").length+" E")]}),
    e.jsx("div",{style:{display:"flex",gap:".5rem",marginBottom:"1rem",flexWrap:"wrap"},children:[["genel","Genel Bakış"],["hakem","Hakem Karneleri"],["rutin","Rutin Analizi"],["kural","FIG Kuralları"]].map(([k,l])=>e.jsx("button",{style:S.tab(sekme===k),onClick:()=>setSekme(k),children:__T(l)+(k==="rutin"?" · "+sapmali.length:k==="hakem"?" · "+A.ozet.length:"")},k))}),
    !A.rutinler.length&&sekme!=="kural"?e.jsx("div",{style:{...S.card,color:C.muted,fontWeight:700},children:__T("Tamamlanmış puan yok.")}):
    sekme==="genel"?e.jsxs(e.Fragment,{children:[dogrulukGrafik(),isiHaritasi()]}):
    sekme==="hakem"?e.jsxs(e.Fragment,{children:[
     e.jsx("div",{style:{display:"flex",gap:".4rem",flexWrap:"wrap",marginBottom:"1rem"},children:A.ozet.map(h=>{const on=H0&&H0.key===h.key;return e.jsxs("span",{onClick:()=>setSecH(h.key),style:{...S.chip(on,PANEL[h.panel].renk),display:"inline-flex",gap:".35rem",alignItems:"center"},children:[e.jsx("b",{children:PANEL[h.panel].kod}),h.ad||h.poslar.join(", "),h.dis?e.jsx("span",{style:{fontSize:".66rem",padding:".02rem .35rem",borderRadius:999,background:on?"rgba(255,255,255,.25)":"#FEE2E2",color:on?"#fff":"#B91C1C"},children:h.dis}):null]},h.key)})}),
     hakemDetay(H0)]}):
    sekme==="rutin"?rutinTablo():kurallar()
   ]})]})]});
}
export{Karne as default};
