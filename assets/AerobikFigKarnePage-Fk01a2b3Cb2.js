import"./i18n-Tr01a2b3Cb2.js";import{b as usToast,a as usInit,u as usAuth,j as e,d as db}from"./main-C2LpyYUGCb2.js";import{f as usParams,r as R}from"./vendor-react-Cxw6bqwhCb2.js";import{k as ref,l as get,o as onValue}from"./vendor-firebase-940mxgRVCb2.js";import{v as verifyToken}from"./epanelToken-BoF3UjP2Cb2.js";import{utils as XU,writeFile as XW}from"./vendor-xlsx-CNerDvZXCb2.js";import"./modulepreload-polyfill-B5Qt9EMXCb2.js";

// ============================================================================
// AEROBİK — FIG HAKEM DEĞERLENDİRME KARNESİ
// Dayanak: FIG Aerobic Gymnastics Code of Points 2025–2028
//  §8.1.1  A/E: 4 hakemde en yüksek ve en düşük atılır, ortadaki 2 notun ortalaması (6 hakemde 2+2 atılır)
//  §8.1.2  Ortadaki iki not arasındaki azami fark (tolerans), son puana göre:
//            8.00–10.00: 0.3 · 7.00–7.99: 0.4 · 6.00–6.99: 0.5 · 0.00–5.99: 0.6
//          aşılırsa bütün notların ortalaması son puandır
//  §8.1.6  Uç notlar arasında ≥1.0 fark → yarışma sonrası hakem analizi
//  §2.1    Superior Jury hakem sapmalarını kayda geçirir; tekrarlayan sapma, taraflılık,
//          sürekli çok yüksek/düşük not → uyarı / hakem değişikliği
//  §3.2    CJP yarışma sonunda tüm hakemlerin sapma raporunu Superior Jury'ye gönderir
// Referans (kontrol) not: Superior Jury kontrol notu (SJA / SJE); yoksa §8.1.1 panel sonucu.
// Hakemin notu referanstan §8.1.2 toleransından fazla saparsa "tolerans dışı" sayılır.
// Değerlendirme dereceleri (Çok İyi…) FIG'de tanımlı değildir: TCF iç ölçütüdür, eşikler ayarlanabilir.
// ============================================================================
const BASE="aerobik_yarismalar";
const TOL=[[8,.3],[7,.4],[6,.5],[0,.6]];
const tolFor=v=>{for(const[m,t]of TOL)if(v>=m-1e-9)return t;return .6};
const r3=v=>Math.round(v*1000)/1000,f2=v=>v==null||isNaN(v)?"—":Number(v).toFixed(2),f3=v=>v==null||isNaN(v)?"—":Number(v).toFixed(3);
const sg=v=>v==null||isNaN(v)?"—":(v>0?"+":"")+Number(v).toFixed(3);
const num=v=>{const n=parseFloat(v);return isNaN(n)?null:n};
const PANEL={a:{kod:"A",tr:"Artistik (A)",en:"Artistry (A)",sj:"SJA"},e:{kod:"E",tr:"Uygulama (E)",en:"Execution (E)",sj:"SJE"}};
const ESIK0={iyiCok:90,iyi:80,yeterli:70,uyariAdet:3,uyariYuzde:20,yonEsik:.2,yonMinN:5,ilFark:.2,ilMinN:2};
const esikYukle=()=>{try{return{...ESIK0,...JSON.parse(localStorage.getItem("aeKarneEsik")||"{}")}}catch{return{...ESIK0}}};
const derece=(pct,E)=>pct>=E.iyiCok?["Çok İyi","Very Good","#16a34a"]:pct>=E.iyi?["İyi","Good","#65a30d"]:pct>=E.yeterli?["Yeterli","Satisfactory","#ca8a04"]:["İncelenmeli","Review required","#dc2626"];
const trA=s=>String(s??"").replace(/İ/g,"I").replace(/ı/g,"i").replace(/Ş/g,"S").replace(/ş/g,"s").replace(/Ğ/g,"G").replace(/ğ/g,"g").replace(/Ü/g,"U").replace(/ü/g,"u").replace(/Ö/g,"O").replace(/ö/g,"o").replace(/Ç/g,"C").replace(/ç/g,"c");
const KK=s=>String(s||"").toLocaleUpperCase("tr-TR").replace(/[^A-Z0-9ÇĞİÖŞÜ]/g,"");

// §8.1.1 + §8.1.2 panel sonucu
function panelSonuc(sc){const s=[...sc].sort((a,b)=>a-b),n=s.length,ort=s.reduce((a,b)=>a+b,0)/n;
 if(n<4)return{final:ort,orta:s,fark:s[n-1]-s[0],tol:tolFor(ort),asildi:!1};
 const k=n>=6?2:1,orta=s.slice(k,n-k),m=orta.reduce((a,b)=>a+b,0)/orta.length,fark=orta[orta.length-1]-orta[0],tol=tolFor(m);
 return fark>tol+1e-9?{final:ort,orta,fark,tol,asildi:!0}:{final:m,orta,fark,tol,asildi:!1}}
// Spearman sıra korelasyonu (eşitlerde ortalama sıra)
function siraVer(a){const ix=a.map((v,i)=>[v,i]).sort((x,y)=>y[0]-x[0]),r=new Array(a.length);let i=0;while(i<ix.length){let j=i;while(j+1<ix.length&&Math.abs(ix[j+1][0]-ix[i][0])<1e-9)j++;const m=(i+j)/2+1;for(let k=i;k<=j;k++)r[ix[k][1]]=m;i=j+1}return r}
function spearman(x,y){const n=x.length;if(n<3)return null;const a=siraVer(x),b=siraVer(y),ma=a.reduce((s,v)=>s+v,0)/n,mb=b.reduce((s,v)=>s+v,0)/n;let p=0,qa=0,qb=0;for(let i=0;i<n;i++){p+=(a[i]-ma)*(b[i]-mb);qa+=(a[i]-ma)**2;qb+=(b[i]-mb)**2}return qa&&qb?p/Math.sqrt(qa*qb):null}

// ---- tüm analiz ----
function analiz({pun,spor,cats,hakemler,refs,secCat,secPanel,E}){
 const katAd=c=>cats[c]?.name||c;
 const kim=(cat,aid)=>{const cm=spor[cat]||{},i=cm[aid];if(i)return{ad:[i.ad,i.soyad].filter(Boolean).join(" ")||aid,kulup:i.okul||i.kulup||"",il:i.il||""};
  const p=String(aid).split("::"),gn=p[p.length-1],ok=p.length>=3?p.slice(1,-1).join("::"):"",san=x=>String(x||"").trim().replace(/[.#$[\]/]/g,"-").slice(0,60);
  const mem=Object.values(cm).filter(m=>m&&String(m.grupNo??m.cikisSirasi??"")===String(gn)&&(ok===""||String(m.okul||m.kulup||"")===ok||san(m.okul||m.kulup)===ok));
  return{ad:[...new Set(mem.map(m=>[m.ad,m.soyad].filter(Boolean).join(" ")))].join(", ")||aid,kulup:mem[0]?.okul||mem[0]?.kulup||ok,il:mem[0]?.il||""}};
 const hakem=(cat,pos)=>{const h=(hakemler[cat]||hakemler[String(cat).replace(/^final_/,"")]||{})[pos];if(!h)return null;const o=typeof h==="object"?h:{name:String(h)};const rf=o.id?refs[o.id]:null;return{ad:o.name||rf?.adSoyad||"",id:o.id||"",il:rf?.il||"",brove:rf?.brove||""}};
 const rutinler=[],hk={};
 Object.keys(pun).sort().forEach(cat=>{if(secCat.length&&!secCat.includes(cat))return;
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
     const sat={pos:pos.toUpperCase(),not:sc[i],dev,dis,atil,ucta:rt.f816&&(Math.abs(sc[i]-mx)<1e-9||Math.abs(sc[i]-mn)<1e-9)};rt.hakemler.push(sat);
     const H=hk[key]||(hk[key]={key,panel:pn,ad:h?.ad||"",il:h?.il||"",brove:h?.brove||"",poslar:new Set,katlar:new Set,satir:[]});
     H.poslar.add(pos.toUpperCase());H.katlar.add(cat);H.satir.push({...sat,cat,katAd:rt.katAd,sporcu:sp.ad,kulup:sp.kulup,spIl:sp.il,ref:refN,refSrc,tol,aid})});
    rutinler.push(rt)})})});
 // hakem özetleri
 const ozet=Object.values(hk).map(H=>{const s=H.satir,n=s.length,dis=s.filter(x=>x.dis).length,ort=s.reduce((a,x)=>a+x.dev,0)/n,abs=s.reduce((a,x)=>a+Math.abs(x.dev),0)/n,mx=Math.max(...s.map(x=>Math.abs(x.dev)));
  // kategori bazında sıra uyumu (ağırlıklı ortalama)
  let rw=0,rn=0;[...H.katlar].forEach(c=>{const ss=s.filter(x=>x.cat===c);const rho=spearman(ss.map(x=>x.not),ss.map(x=>x.ref));if(rho!=null){rw+=rho*ss.length;rn+=ss.length}});
  const rho=rn?rw/rn:null,ici=n?(n-dis)/n*100:0,der=derece(ici,E);
  // §2.1 taraflılık: hakemin kendi ilinden sporculara sapma farkı
  let ilAnaliz=null;if(H.il){const kendi=s.filter(x=>x.spIl&&KK(x.spIl)===KK(H.il)),diger=s.filter(x=>!(x.spIl&&KK(x.spIl)===KK(H.il)));
   if(kendi.length){const mk=kendi.reduce((a,x)=>a+x.dev,0)/kendi.length,md=diger.length?diger.reduce((a,x)=>a+x.dev,0)/diger.length:0;ilAnaliz={n:kendi.length,kendi:mk,diger:md,fark:mk-md}}}
  const uyari=[];
  if(dis>=E.uyariAdet&&dis/n*100>=E.uyariYuzde)uyari.push(["Tekrarlayan tolerans dışı not ("+dis+"/"+n+")","Repeated out-of-tolerance marks","§2.1"]);
  if(n>=E.yonMinN&&Math.abs(ort)>=E.yonEsik)uyari.push([ort>0?"Sistematik olarak YÜKSEK not (ort. "+sg(ort)+")":"Sistematik olarak DÜŞÜK not (ort. "+sg(ort)+")",ort>0?"Systematically high marks":"Systematically low marks","§2.1-d"]);
  if(ilAnaliz&&ilAnaliz.n>=E.ilMinN&&ilAnaliz.fark>=E.ilFark)uyari.push(["Kendi ilinden sporculara daha yüksek not ("+sg(ilAnaliz.fark)+")","Higher marks to own-province gymnasts (possible partiality)","§2.1-3"]);
  const uc816=s.filter(x=>x.ucta).length;
  return{...H,poslar:[...H.poslar].sort(),katlar:[...H.katlar],n,dis,disPct:n?dis/n*100:0,ici,ort,abs,mx,rho,der,uyari,ilAnaliz,uc816,atilanY:s.filter(x=>x.atil==="Y").length,atilanD:s.filter(x=>x.atil==="D").length,etiket:(H.ad||"—")}})
  .sort((a,b)=>a.panel.localeCompare(b.panel)||a.poslar[0].localeCompare(b.poslar[0],"tr",{numeric:!0})||a.etiket.localeCompare(b.etiket,"tr"));
 return{rutinler,ozet};
}

// ---- PDF yardımcıları ----
let _font=null,_logo=null;
async function pdfHazirla(yatay){
 const{jsPDF}=(await import("./jspdf.es.min-gArCfqm1Cb2.js")).j,am=await import("./jspdf.plugin.autotable-KFqWVtFsCb2.js"),at=am.default||am,doc=new jsPDF(yatay?"landscape":"portrait","mm","a4");
 if(_font===null){try{const{R:r,B:b}=await import("./fontTR-Fn01a2b3Cb2.js");_font={r,b}}catch{_font=0}}
 let FT="helvetica";if(_font){doc.addFileToVFS("Roboto.ttf",_font.r);doc.addFont("Roboto.ttf","Roboto","normal");doc.addFileToVFS("Roboto-Bold.ttf",_font.b);doc.addFont("Roboto-Bold.ttf","Roboto","bold");FT="Roboto"}
 if(_logo===null){try{const bl=await(await fetch("/logo.png")).blob(),du=await new Promise(k=>{const o=new FileReader;o.onloadend=()=>k(o.result);o.readAsDataURL(bl)});
  _logo=await new Promise(rs=>{const im=new Image;im.onload=()=>{try{const c=document.createElement("canvas");c.width=c.height=256;c.getContext("2d").drawImage(im,0,0,256,256);rs(c.toDataURL("image/png"))}catch{rs(du)}};im.onerror=()=>rs(du);im.src=du})}catch{_logo=0}}
 // PDF yazı tipinde olmayabilecek işaretler güvenli karşılıklara çevrilir
 const guv=s=>String(s??"").replace(/≥/g,">=").replace(/≤/g,"<=").replace(/→/g,"->").replace(/−/g,"-").replace(/ρ/g,"rho").replace(/✓/g,"OK").replace(/↑/g,"Y").replace(/↓/g,"D").replace(/⚠/g,"!"),o=FT==="helvetica"?(s=>trA(guv(s))):guv;
 return{doc,at,FT,o};
}
function baslik(doc,FT,o,W,t1,t2,comp){const c=W/2;doc.setDrawColor(0,56,117);doc.setLineWidth(.6);doc.rect(10,6,W-20,30,"S");
 if(_logo)try{doc.addImage(_logo,"PNG",13,9,22,22,"tcflogo","FAST");doc.addImage(_logo,"PNG",W-35,9,22,22,"tcflogo","FAST")}catch{}
 doc.setFont(FT,"bold");doc.setFontSize(12);doc.setTextColor(0,56,117);doc.text(o("TÜRKİYE CİMNASTİK FEDERASYONU"),c,13,{align:"center"});
 doc.setFont(FT,"normal");doc.setFontSize(8.5);doc.setTextColor(30,41,59);doc.text(o(comp.isim||""),c,18.5,{align:"center"});doc.text(o([comp.tarih,comp.il].filter(Boolean).join(" / ")),c,22.5,{align:"center"});
 doc.setFont(FT,"bold");doc.setFontSize(11.5);doc.setTextColor(0,56,117);doc.text(o(t1),c,28.5,{align:"center"});doc.setFontSize(8.5);doc.setTextColor(100,116,139);doc.text(o(t2),c,33,{align:"center"});doc.setTextColor(0,0,0)}
function sayfaNo(doc,FT,o,W,H){const g=doc.internal.getNumberOfPages();for(let i=1;i<=g;i++){doc.setPage(i);doc.setFont(FT,"normal");doc.setFontSize(7);doc.setTextColor(140);
 doc.text(o("FIG Aerobic Gymnastics CoP 2025–2028 · §8.1.1 · §8.1.2 · §8.1.6 · §2.1 · §3.2 — TCF Puanlama Sistemi"),10,H-6);doc.text(`${i} / ${g}`,W-10,H-6,{align:"right"})}}
const HS={fillColor:[0,56,117],textColor:255,fontStyle:"bold",halign:"center",valign:"middle",fontSize:7.5,cellPadding:1.8},BS={fontSize:7.5,cellPadding:1.6,valign:"middle",lineColor:[210,218,230],lineWidth:.1};

function Karne(){
 const{toast}=usToast();usInit();
 const[sp]=usParams(),urlComp=sp.get("competitionId")||sp.get("compId")||sp.get("comp"),token=sp.get("token");
 const{currentUser}=usAuth?usAuth():{currentUser:null};
 const[comp,setComp]=R.useState(urlComp||""),[comps,setComps]=R.useState({}),[authed,setAuthed]=R.useState(!1),[loading,setLoading]=R.useState(!0);
 const[V,setV]=R.useState({pun:{},spor:{},cats:{},hak:{},isim:"",il:"",tarih:""}),[refs,setRefs]=R.useState({});
 const[secCat,setSecCat]=R.useState([]),[secPanel,setSecPanel]=R.useState(""),[sekme,setSekme]=R.useState("hakem"),[acik,setAcik]=R.useState(null),[E,setE]=R.useState(esikYukle),[busy,setBusy]=R.useState(!1);

 R.useEffect(()=>{if(token&&urlComp){get(ref(db,`${BASE}/${urlComp}/epanelToken`)).then(s=>{const v=s.val();setAuthed(v?verifyToken(token,v):!!currentUser)}).catch(()=>setAuthed(!!currentUser)).finally(()=>setLoading(!1))}else{setAuthed(!!currentUser);setLoading(!1)}},[urlComp,token,currentUser]);
 R.useEffect(()=>{if(!currentUser||urlComp)return;get(ref(db,BASE)).then(s=>{const v=s.val()||{},o={};Object.entries(v).forEach(([k,c])=>{c&&c.isim&&c.arsivli!==!0&&c.arsivli!=="true"&&(o[k]={isim:c.isim,t:c.baslangicTarihi||""})});setComps(o)}).catch(()=>{})},[currentUser,urlComp]);
 R.useEffect(()=>{if(!comp||!authed)return;const st={};const set=(k,v)=>{st[k]=v;setV(o=>({...o,[k]:v}))};
  const ul=[["pun","puanlar"],["spor","sporcular"],["cats","kategoriler"],["hak","hakemler"],["isim","isim"],["il","il"],["bas","baslangicTarihi"],["bit","bitisTarihi"]].map(([k,p])=>onValue(ref(db,`${BASE}/${comp}/${p}`),s=>set(k,s.val()||(k==="isim"||k==="il"||k==="bas"||k==="bit"?"":{}))));
  return()=>ul.forEach(u=>u())},[comp,authed]);
 // atanmış hakemlerin il/brövé bilgisi
 R.useEffect(()=>{const ids=new Set;Object.values(V.hak||{}).forEach(ps=>ps&&typeof ps==="object"&&Object.values(ps).forEach(h=>h&&h.id&&ids.add(h.id)));
  const eksik=[...ids].filter(i=>!(i in refs));if(!eksik.length)return;Promise.all(eksik.map(i=>get(ref(db,`referees/${i}`)).then(s=>[i,s.val()||{}]).catch(()=>[i,{}]))).then(l=>setRefs(o=>({...o,...Object.fromEntries(l)})))},[V.hak]);
 R.useEffect(()=>{try{localStorage.setItem("aeKarneEsik",JSON.stringify(E))}catch{}},[E]);

 const tarih=(()=>{const f=d=>{try{const x=new Date(d);return isNaN(x)?"":`${String(x.getDate()).padStart(2,"0")}.${String(x.getMonth()+1).padStart(2,"0")}.${x.getFullYear()}`}catch{return""}};const a=f(V.bas),b=f(V.bit);return a&&b&&a!==b?a+" - "+b:a})();
 const compBilgi={isim:V.isim,il:V.il,tarih};
 const A=R.useMemo(()=>analiz({pun:V.pun,spor:V.spor,cats:V.cats,hakemler:V.hak,refs,secCat,secPanel,E}),[V,refs,secCat,secPanel,E]);
 const katListe=Object.keys(V.pun||{}).sort((a,b)=>(/^final_/.test(a)?1:0)-(/^final_/.test(b)?1:0)||a.localeCompare(b));
 const katAd=c=>V.cats?.[c]?.name||c;
 const sjOran=A.rutinler.length?A.rutinler.filter(r=>r.refSrc!=="Panel").length/A.rutinler.length*100:0;
 const f812=A.rutinler.filter(r=>r.f812),f816=A.rutinler.filter(r=>r.f816),sapmali=A.rutinler.filter(r=>r.f812||r.f816||r.hakemler.some(h=>h.dis));
 const atamaYok=!Object.keys(V.hak||{}).length;

 // ---- PDF: hakem karnesi ----
 const karnePdf=async liste=>{if(!liste.length)return;setBusy(!0);toast(__T("PDF hazırlanıyor, lütfen bekleyin..."),"info");
  try{const{doc,at,FT,o}=await pdfHazirla(!1),W=210,H=297;
   liste.forEach((h,ix)=>{ix&&doc.addPage();
    baslik(doc,FT,o,W,"HAKEM DEĞERLENDİRME KARNESİ","JUDGE EVALUATION REPORT — Aerobic Gymnastics",compBilgi);
    const[dTr,dEn,dRenk]=h.der,rgb=[parseInt(dRenk.slice(1,3),16),parseInt(dRenk.slice(3,5),16),parseInt(dRenk.slice(5,7),16)];
    at(doc,{startY:40,theme:"grid",styles:{font:FT,...BS},margin:{left:10,right:10},
     body:[[{content:o("Hakem / Judge"),styles:{fontStyle:"bold",fillColor:[241,245,249]}},{content:o(h.ad||"(atanmamış — "+h.poslar.join(", ")+")"),styles:{fontStyle:"bold",fontSize:9}},{content:o("Panel"),styles:{fontStyle:"bold",fillColor:[241,245,249]}},o(PANEL[h.panel].tr+" / "+PANEL[h.panel].en)],
      [{content:o("Pozisyon / Position"),styles:{fontStyle:"bold",fillColor:[241,245,249]}},o(h.poslar.join(", ")),{content:o("Brövé · İl"),styles:{fontStyle:"bold",fillColor:[241,245,249]}},o([h.brove,h.il].filter(Boolean).join(" · ")||"—")],
      [{content:o("Kategoriler / Categories"),styles:{fontStyle:"bold",fillColor:[241,245,249]}},{content:o(h.katlar.map(katAd).join(", ")),colSpan:3}]],
     columnStyles:{0:{cellWidth:36},1:{cellWidth:62},2:{cellWidth:30}}});
    let y=doc.lastAutoTable.finalY+4;
    at(doc,{startY:y,theme:"grid",styles:{font:FT,...BS,halign:"center"},headStyles:HS,margin:{left:10,right:10},
     head:[[o("Rutin\nRoutines"),o("Ort. sapma\nMean dev."),o("Ort. |sapma|\nMean abs."),o("En büyük\nMax"),o("Tolerans dışı\nOut of tol."),o("Atılan Y/D\nDropped H/L"),o("Sıra uyumu ρ\nRank corr."),o("Değerlendirme*\nAssessment")]],
     body:[[String(h.n),o(sg(h.ort)),f3(h.abs),f3(h.mx),`${h.dis} (${h.disPct.toFixed(0)}%)`,`${h.atilanY} / ${h.atilanD}`,h.rho==null?"—":h.rho.toFixed(2),{content:o(dTr+" / "+dEn),styles:{fontStyle:"bold",textColor:rgb}}]]});
    y=doc.lastAutoTable.finalY+3;
    if(h.ilAnaliz){doc.setFont(FT,"normal");doc.setFontSize(7.5);doc.setTextColor(51,65,85);doc.text(o(`Kendi ili (${h.il}) sporcularına ort. sapma ${sg(h.ilAnaliz.kendi)} (${h.ilAnaliz.n} rutin) · diğerlerine ${sg(h.ilAnaliz.diger)} · fark ${sg(h.ilAnaliz.fark)}`),10,y+2);y+=5}
    if(h.uyari.length){doc.setFont(FT,"bold");doc.setFontSize(8);doc.setTextColor(185,28,28);h.uyari.forEach(u=>{doc.text(o(`UYARI: ${u[0]} — ${u[1]} (FIG AER CoP ${u[2]})`),10,y+2);y+=4.5});y+=1}
    doc.setTextColor(0,0,0);
    at(doc,{startY:y+1,theme:"grid",styles:{font:FT,...BS},headStyles:HS,margin:{left:10,right:10},
     head:[[o("#"),o("Kategori"),o("Sporcu / Takım"),o("Kulüp"),o("Not\nMark"),o("Referans\nReference"),o("Sapma\nDev."),o("Tol."),o("Durum\nStatus"),o("Atılan\nDrop")]],
     body:h.satir.slice().sort((a,b)=>a.katAd.localeCompare(b.katAd,"tr")||b.ref-a.ref).map((s,i)=>[String(i+1),o(s.katAd),o(s.sporcu),o(s.kulup),f3(s.not),o(f3(s.ref)+" "+s.refSrc),{content:sg(s.dev),styles:{textColor:s.dis?[185,28,28]:[15,23,42],fontStyle:s.dis?"bold":"normal"}},f2(s.tol),{content:o(s.dis?"TOL. DIŞI":"İçinde"),styles:{textColor:s.dis?[185,28,28]:[22,163,74],fontStyle:"bold",fontSize:6.8}},o(s.atil)]),
     columnStyles:{0:{cellWidth:9,halign:"center",cellPadding:.8},1:{cellWidth:29},2:{cellWidth:37},3:{cellWidth:31},4:{halign:"center",cellWidth:12},5:{halign:"center",cellWidth:21},6:{halign:"center",cellWidth:14},7:{halign:"center",cellWidth:9},8:{halign:"center",cellWidth:15},9:{halign:"center",cellWidth:12}}});
    y=doc.lastAutoTable.finalY+5;if(y>H-38){doc.addPage();y=20}
    doc.setFont(FT,"normal");doc.setFontSize(6.8);doc.setTextColor(100,116,139);
    doc.text(doc.splitTextToSize(o("Referans: Superior Jury kontrol notu (SJA/SJE); yoksa panel sonucu (FIG AER CoP §8.1.1). Tolerans: §8.1.2 (8.00–10.00: 0.3 · 7.00–7.99: 0.4 · 6.00–6.99: 0.5 · 0–5.99: 0.6); hakemin notu referanstan toleranstan fazla saparsa 'tolerans dışı'. E notları 10 − kesinti olarak değerlendirilmiştir. Atılan: Y = en yüksek, D = en düşük not (§8.1.1). Sıra uyumu: hakemin sıralaması ile referans sıralaması arasındaki Spearman katsayısı (1 = tam uyum). *Değerlendirme dereceleri FIG'de tanımlı değildir; TCF iç ölçütüdür (tolerans içi oran: ≥"+E.iyiCok+"% Çok İyi, ≥"+E.iyi+"% İyi, ≥"+E.yeterli+"% Yeterli)."),W-20),10,y);
    y+=12;doc.setTextColor(0,0,0);doc.setFontSize(8);doc.line(20,y+10,80,y+10);doc.line(W-80,y+10,W-20,y+10);doc.text(o("CJP / Başhakem"),50,y+14,{align:"center"});doc.text(o("Superior Jury Başkanı"),W-50,y+14,{align:"center"})});
   sayfaNo(doc,FT,o,W,H);
   doc.save(trA((V.isim||"yarisma")+(liste.length===1?"_"+(liste[0].ad||liste[0].poslar.join("-")):"_tum_hakemler")+"_FIG_karne.pdf").replace(/[^a-z0-9._-]/gi,"_"));
   toast(__T("PDF başarıyla indirildi."),"success")}catch(er){console.error(er);toast(__T("PDF oluşturulurken bir hata oluştu."),"error")}setBusy(!1)};

 // ---- PDF: CJP sapma raporu (§3.2) ----
 const cjpPdf=async()=>{setBusy(!0);toast(__T("PDF hazırlanıyor, lütfen bekleyin..."),"info");
  try{const{doc,at,FT,o}=await pdfHazirla(!0),W=297,H=210;
   baslik(doc,FT,o,W,"CJP SAPMA RAPORU — SUPERIOR JURY'YE","CJP DISCREPANCY REPORT (FIG AER CoP §3.2) — Aerobic Gymnastics",compBilgi);
   doc.setFont(FT,"normal");doc.setFontSize(8);doc.setTextColor(51,65,85);
   doc.text(o(`Değerlendirilen rutin-panel: ${A.rutinler.length} · Superior Jury referanslı: ${sjOran.toFixed(0)}% · §8.1.2 ihlali (ortadaki iki not tolerans dışı): ${f812.length} · §8.1.6 (uç fark ≥ 1.0): ${f816.length} · Tolerans dışı hakem notu: ${A.ozet.reduce((a,h)=>a+h.dis,0)}`),10,41);
   const mxJ=Math.max(4,...sapmali.map(r=>r.hakemler.length));
   at(doc,{startY:44,theme:"grid",styles:{font:FT,...BS,halign:"center"},headStyles:HS,margin:{left:10,right:10},
    head:[[o("Kategori"),o("Sporcu / Takım"),o("Panel"),...Array.from({length:mxJ},(_,i)=>o("J"+(i+1))),o("Orta fark / tol.\n§8.1.2"),o("Uç fark\n§8.1.6"),o("Panel sonucu"),o("Referans"),o("Bulgular")]],
    body:sapmali.map(r=>[{content:o(r.katAd),styles:{halign:"left"}},{content:o(r.ad),styles:{halign:"left"}},PANEL[r.panel].kod,
     ...Array.from({length:mxJ},(_,i)=>{const h=r.hakemler[i];if(!h)return"";return{content:f2(h.not)+(h.atil?" ("+h.atil+")":""),styles:{textColor:h.dis?[185,28,28]:[15,23,42],fontStyle:h.dis?"bold":"normal"}}}),
     {content:f2(r.ortaFark)+" / "+f2(r.ortaTol),styles:{textColor:r.f812?[185,28,28]:[15,23,42],fontStyle:r.f812?"bold":"normal"}},{content:f2(r.uc),styles:{textColor:r.f816?[185,28,28]:[15,23,42],fontStyle:r.f816?"bold":"normal"}},f3(r.panelFinal),o(f3(r.ref)+" "+r.refSrc),
     {content:o([r.f812?"§8.1.2 tolerans aşıldı → tüm notların ort.":"",r.f816?"§8.1.6 analiz gerekli":"",r.hakemler.filter(h=>h.dis).map(h=>h.pos).join(", ")?"Tol. dışı: "+r.hakemler.filter(h=>h.dis).map(h=>h.pos).join(", "):""].filter(Boolean).join(" · ")),styles:{halign:"left",fontSize:6.8}}]),
    columnStyles:{0:{cellWidth:30,halign:"left"},1:{cellWidth:46,halign:"left"},2:{cellWidth:10}}});
   let y=doc.lastAutoTable.finalY+5;if(y>H-30){doc.addPage();y=20}
   doc.setFont(FT,"bold");doc.setFontSize(9);doc.setTextColor(0,56,117);doc.text(o("Hakem özeti / Judges summary"),10,y);
   at(doc,{startY:y+2,theme:"grid",styles:{font:FT,...BS,halign:"center"},headStyles:HS,margin:{left:10,right:10},
    head:[[o("Panel"),o("Pozisyon"),o("Hakem"),o("Rutin"),o("Ort. sapma"),o("Ort. |sapma|"),o("Tol. dışı"),o("ρ"),o("Değerlendirme*"),o("Uyarı (FIG §2.1)")]],
    body:A.ozet.map(h=>[PANEL[h.panel].kod,o(h.poslar.join(", ")),{content:o(h.ad||"—"),styles:{halign:"left"}},String(h.n),sg(h.ort),f3(h.abs),`${h.dis} (${h.disPct.toFixed(0)}%)`,h.rho==null?"—":h.rho.toFixed(2),o(h.der[0]),{content:o(h.uyari.map(u=>u[0]).join(" · ")||"—"),styles:{halign:"left",fontSize:6.8,textColor:h.uyari.length?[185,28,28]:[100,116,139]}}])});
   y=doc.lastAutoTable.finalY+12;if(y>H-20){doc.addPage();y=30}
   doc.setFont(FT,"normal");doc.setFontSize(8);doc.setTextColor(0,0,0);doc.line(20,y,90,y);doc.line(W-90,y,W-20,y);doc.text(o("CJP / Başhakem"),55,y+4,{align:"center"});doc.text(o("Superior Jury Başkanı"),W-55,y+4,{align:"center"});
   sayfaNo(doc,FT,o,W,H);doc.save(trA((V.isim||"yarisma")+"_CJP_sapma_raporu.pdf").replace(/[^a-z0-9._-]/gi,"_"));toast(__T("PDF başarıyla indirildi."),"success")}
  catch(er){console.error(er);toast(__T("PDF oluşturulurken bir hata oluştu."),"error")}setBusy(!1)};

 const excel=()=>{const wb=XU.book_new();
  XU.book_append_sheet(wb,XU.json_to_sheet(A.ozet.map(h=>({Panel:PANEL[h.panel].kod,Pozisyon:h.poslar.join(", "),Hakem:h.ad,"Brövé":h.brove,"İl":h.il,Rutin:h.n,"Ort. sapma":r3(h.ort),"Ort. |sapma|":r3(h.abs),"En büyük":r3(h.mx),"Tolerans dışı":h.dis,"Tol. dışı %":Math.round(h.disPct),"Sıra uyumu ρ":h.rho==null?"":r3(h.rho),"Değerlendirme (TCF)":h.der[0],"Uyarılar":h.uyari.map(u=>u[0]+" ("+u[2]+")").join(" · ")}))),"Hakem Ozeti");
  XU.book_append_sheet(wb,XU.json_to_sheet(A.ozet.flatMap(h=>h.satir.map(s=>({Panel:PANEL[h.panel].kod,Pozisyon:s.pos,Hakem:h.ad,Kategori:s.katAd,"Sporcu/Takım":s.sporcu,"Kulüp":s.kulup,Not:r3(s.not),Referans:r3(s.ref),"Ref. kaynağı":s.refSrc,Sapma:r3(s.dev),Tolerans:s.tol,"Tolerans dışı":s.dis?"EVET":"","Atılan":s.atil})))),"Hakem Notlari");
  XU.book_append_sheet(wb,XU.json_to_sheet(sapmali.map(r=>({Kategori:r.katAd,"Sporcu/Takım":r.ad,Panel:PANEL[r.panel].kod,...Object.fromEntries(r.hakemler.map(h=>[h.pos,r3(h.not)])),"Orta fark":r3(r.ortaFark),"Tolerans §8.1.2":r.ortaTol,"§8.1.2 ihlali":r.f812?"EVET":"","Uç fark":r3(r.uc),"§8.1.6":r.f816?"EVET":"","Panel sonucu":r3(r.panelFinal),Referans:r3(r.ref),"Ref. kaynağı":r.refSrc}))),"CJP Sapma Raporu");
  XW(wb,trA((V.isim||"yarisma")+"_FIG_hakem_karnesi.xlsx").replace(/[^a-z0-9._-]/gi,"_"))};

 // ---- görünüm ----
 const S={wrap:{minHeight:"100vh",background:"radial-gradient(1200px 600px at 50% -10%,#111a30 0%,#0a0e1a 60%)",color:"#e8edf7",fontFamily:"'Plus Jakarta Sans',system-ui,sans-serif",paddingBottom:"3rem"},
  top:{position:"sticky",top:0,zIndex:10,background:"rgba(10,14,26,.92)",backdropFilter:"blur(12px)",borderBottom:"1px solid #2a3550",padding:".8rem 1.1rem",display:"flex",alignItems:"center",gap:".8rem",flexWrap:"wrap"},
  ico:{width:38,height:38,borderRadius:11,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,background:"linear-gradient(135deg,#9333ea,#6366f1)"},
  in:{maxWidth:1250,margin:"0 auto",padding:"1rem"},card:{background:"#131a2b",border:"1px solid #2a3550",borderRadius:14,padding:"1rem",marginBottom:"1rem"},
  sel:{padding:".55rem .75rem",borderRadius:10,border:"1px solid #2a3550",background:"#0f1626",color:"#e8edf7",fontWeight:700,fontSize:".88rem"},
  btn:{padding:".55rem .9rem",borderRadius:10,border:"none",color:"#fff",fontWeight:800,cursor:"pointer",fontSize:".85rem"},
  ghost:{padding:".45rem .75rem",borderRadius:9,border:"1px solid #2a3550",background:"#1b2438",color:"#cbd5e1",fontWeight:800,cursor:"pointer",fontSize:".78rem"},
  tab:on=>({padding:".5rem .9rem",borderRadius:10,border:"1px solid "+(on?"#9333ea":"#2a3550"),background:on?"rgba(147,51,234,.18)":"#131a2b",color:on?"#d8b4fe":"#a9b4cc",fontWeight:800,cursor:"pointer",fontSize:".85rem"}),
  chip:on=>({padding:".25rem .55rem",borderRadius:8,fontSize:".74rem",fontWeight:700,cursor:"pointer",border:"1px solid "+(on?"#9333ea":"#2a3550"),background:on?"rgba(147,51,234,.2)":"#0b1120",color:on?"#e9d5ff":"#6b7690"}),
  th:{padding:".5rem .45rem",fontSize:".68rem",color:"#8b97b3",fontWeight:800,textTransform:"uppercase",letterSpacing:".03em",textAlign:"center",borderBottom:"1px solid #2a3550",whiteSpace:"nowrap"},
  td:{padding:".45rem .45rem",borderBottom:"1px solid rgba(40,52,79,.5)",fontWeight:700,fontSize:".82rem",textAlign:"center"},
  kpi:{background:"#0f1626",border:"1px solid #24304a",borderRadius:12,padding:".7rem .9rem",minWidth:150,flex:1}};
 const kpi=(b,d,c)=>e.jsxs("div",{style:S.kpi,children:[e.jsx("div",{style:{fontSize:".7rem",color:"#8b97b3",fontWeight:800,textTransform:"uppercase"},children:b}),e.jsx("div",{style:{fontSize:"1.35rem",fontWeight:900,color:c||"#e8edf7"},children:d})]});
 const devRenk=(d,dis)=>dis?"#f87171":Math.abs(d)<=.1?"#86efac":"#e8edf7";

 if(loading)return e.jsx("div",{style:{...S.wrap,padding:"2rem"},children:__T("Yükleniyor…")});
 if(!authed)return e.jsx("div",{style:{...S.wrap,padding:"2rem"},children:__T("Bu sayfayı görmek için giriş yapın veya geçerli bir link kullanın.")});

 const hakemSatiri=h=>{const op=acik===h.key;return e.jsxs(e.Fragment,{children:[
  e.jsxs("tr",{style:{cursor:"pointer",background:op?"rgba(147,51,234,.08)":"transparent"},onClick:()=>setAcik(op?null:h.key),children:[
   e.jsx("td",{style:S.td,children:e.jsx("span",{style:{color:h.panel==="a"?"#f472b6":"#22d3ee",fontWeight:900},children:PANEL[h.panel].kod})}),
   e.jsx("td",{style:S.td,children:h.poslar.join(", ")}),
   e.jsxs("td",{style:{...S.td,textAlign:"left"},children:[h.ad||e.jsx("span",{style:{color:"#6b7690"},children:__T("(atanmamış)")}),h.il||h.brove?e.jsx("div",{style:{fontSize:".7rem",color:"#8b97b3",fontWeight:600},children:[h.brove,h.il].filter(Boolean).join(" · ")}):null]}),
   e.jsx("td",{style:S.td,children:h.n}),
   e.jsx("td",{style:{...S.td,color:Math.abs(h.ort)>=E.yonEsik?"#fbbf24":"#e8edf7"},children:sg(h.ort)}),
   e.jsx("td",{style:S.td,children:f3(h.abs)}),e.jsx("td",{style:S.td,children:f3(h.mx)}),
   e.jsxs("td",{style:{...S.td,color:h.dis?"#f87171":"#86efac"},children:[h.dis," ",e.jsxs("span",{style:{fontSize:".7rem",color:"#8b97b3"},children:["(",h.disPct.toFixed(0),"%)"]})]}),
   e.jsx("td",{style:S.td,children:h.rho==null?"—":h.rho.toFixed(2)}),
   e.jsx("td",{style:S.td,children:e.jsx("span",{style:{padding:".15rem .45rem",borderRadius:6,fontSize:".72rem",fontWeight:900,color:"#fff",background:h.der[2]},children:__T(h.der[0])})}),
   e.jsx("td",{style:{...S.td,textAlign:"left",fontSize:".72rem",color:h.uyari.length?"#fca5a5":"#6b7690"},children:h.uyari.length?h.uyari.map(u=>u[0]+" ("+u[2]+")").join(" · "):"—"}),
   e.jsx("td",{style:S.td,children:e.jsx("button",{style:S.ghost,disabled:busy,onClick:ev=>{ev.stopPropagation();karnePdf([h])},children:__T("Karne PDF")})})]},h.key),
  op?e.jsx("tr",{children:e.jsx("td",{colSpan:12,style:{padding:".3rem .5rem 1rem",background:"rgba(147,51,234,.05)"},children:e.jsxs("table",{style:{width:"100%",borderCollapse:"collapse"},children:[
   e.jsx("thead",{children:e.jsx("tr",{children:["Kategori","Sporcu / Takım","Kulüp","Not","Referans","Sapma","Tol.","Durum","Atılan"].map(t=>e.jsx("th",{style:S.th,children:__T(t)},t))})}),
   e.jsx("tbody",{children:h.satir.slice().sort((a,b)=>a.katAd.localeCompare(b.katAd,"tr")||b.ref-a.ref).map((s,i)=>e.jsxs("tr",{children:[
    e.jsx("td",{style:{...S.td,textAlign:"left",fontWeight:600},children:s.katAd}),e.jsx("td",{style:{...S.td,textAlign:"left"},children:s.sporcu}),e.jsx("td",{style:{...S.td,textAlign:"left",fontWeight:600,color:"#a9b4cc"},children:s.kulup}),
    e.jsx("td",{style:S.td,children:f3(s.not)}),e.jsxs("td",{style:S.td,children:[f3(s.ref)," ",e.jsx("span",{style:{fontSize:".66rem",color:"#8b97b3"},children:s.refSrc})]}),
    e.jsx("td",{style:{...S.td,color:devRenk(s.dev,s.dis)},children:sg(s.dev)}),e.jsx("td",{style:S.td,children:f2(s.tol)}),
    e.jsx("td",{style:{...S.td,color:s.dis?"#f87171":"#86efac",fontWeight:900},children:s.dis?__T("TOL. DIŞI"):"✓"}),e.jsx("td",{style:{...S.td,color:"#8b97b3"},children:s.atil==="Y"?"↑":s.atil==="D"?"↓":""})]},i))})]})})}):null]})};

 const esikAlan=(k,lb,adim)=>e.jsxs("label",{style:{display:"flex",flexDirection:"column",gap:".25rem",fontSize:".72rem",color:"#8b97b3",fontWeight:800},children:[__T(lb),e.jsx("input",{type:"number",step:adim||1,value:E[k],onChange:ev=>{const v=parseFloat(ev.target.value);isNaN(v)||setE(o=>({...o,[k]:v}))},style:{...S.sel,width:110}})]},k);

 return e.jsxs("div",{style:S.wrap,children:[
  e.jsxs("div",{style:S.top,children:[e.jsx("div",{style:S.ico,children:e.jsx("span",{className:"material-icons-round",style:{color:"#fff"},children:"fact_check"})}),
   e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:".72rem",color:"#8b97b3",fontWeight:800,textTransform:"uppercase",letterSpacing:".05em"},children:__T("Aerobik · FIG AER CoP 2025–2028")}),e.jsx("div",{style:{fontWeight:900,fontSize:"1.05rem"},children:__T("FIG Hakem Değerlendirme Karnesi")})]}),
   e.jsx("div",{style:{flex:1}}),
   !urlComp?e.jsxs("select",{style:S.sel,value:comp,onChange:ev=>{setComp(ev.target.value);setSecCat([]);setAcik(null)},children:[e.jsx("option",{value:"",children:__T("Yarışma seçin…")}),Object.entries(comps).sort((a,b)=>String(b[1].t).localeCompare(String(a[1].t))).map(([k,c])=>e.jsx("option",{value:k,children:c.isim},k))]}):null,
   currentUser?e.jsx("a",{href:"/aerobik",style:{...S.ghost,textDecoration:"none"},children:__T("← Geri")}):null]}),
  e.jsxs("div",{style:S.in,children:[
   !comp?e.jsx("div",{style:{...S.card,color:"#8b97b3",fontWeight:700},children:__T("Yarışma seçin.")}):e.jsxs(e.Fragment,{children:[
    atamaYok?e.jsx("div",{style:{...S.card,borderColor:"#f59e0b",color:"#fbbf24",fontWeight:700,fontSize:".84rem"},children:__T("Bu yarışmada hakem ataması yok; karneler pozisyon adıyla (A1, E2…) çıkar. Hakem adları için: Yarışmalar → Hakem Ataması.")}):null,
    e.jsxs("div",{style:S.card,children:[
     e.jsxs("div",{style:{display:"flex",gap:".5rem",flexWrap:"wrap",alignItems:"center",marginBottom:".6rem"},children:[
      e.jsx("span",{style:{fontSize:".72rem",color:"#8b97b3",fontWeight:800,textTransform:"uppercase"},children:__T("Panel")}),
      ...[["","A + E"],["a","A — Artistik"],["e","E — Uygulama"]].map(([v,l])=>e.jsx("span",{style:S.chip(secPanel===v),onClick:()=>setSecPanel(v),children:__T(l)},v||"t")),
      e.jsx("div",{style:{flex:1}}),
      e.jsx("button",{style:{...S.btn,background:"linear-gradient(135deg,#9333ea,#6366f1)"},disabled:busy||!A.ozet.length,onClick:()=>karnePdf(A.ozet),children:__T("Tüm karneler (PDF)")}),
      e.jsx("button",{style:{...S.btn,background:"#b91c1c"},disabled:busy||!A.rutinler.length,onClick:cjpPdf,children:__T("CJP Sapma Raporu (PDF)")}),
      e.jsx("button",{style:{...S.btn,background:"#15803d"},disabled:!A.rutinler.length,onClick:excel,children:"Excel"})]}),
     e.jsxs("div",{style:{display:"flex",gap:".3rem",flexWrap:"wrap"},children:[e.jsx("span",{style:{...S.chip(!secCat.length)},onClick:()=>setSecCat([]),children:__T("Tüm kategoriler")}),
      katListe.map(c=>e.jsx("span",{style:S.chip(secCat.includes(c)),onClick:()=>setSecCat(o=>o.includes(c)?o.filter(x=>x!==c):[...o,c]),children:katAd(c)},c))]})]}),
    e.jsxs("div",{style:{display:"flex",gap:".6rem",flexWrap:"wrap",marginBottom:"1rem"},children:[
     kpi(__T("Değerlendirilen rutin-panel"),A.rutinler.length),kpi(__T("Superior Jury referanslı"),sjOran.toFixed(0)+"%",sjOran>=80?"#86efac":"#fbbf24"),
     kpi("§8.1.2 "+__T("ihlali"),f812.length,f812.length?"#f87171":"#86efac"),kpi("§8.1.6 "+__T("uç fark ≥ 1.0"),f816.length,f816.length?"#f87171":"#86efac"),
     kpi(__T("Tolerans dışı hakem notu"),A.ozet.reduce((a,h)=>a+h.dis,0)),kpi(__T("Uyarı alan hakem"),A.ozet.filter(h=>h.uyari.length).length,A.ozet.some(h=>h.uyari.length)?"#fbbf24":"#86efac")]}),
    e.jsxs("div",{style:{display:"flex",gap:".5rem",marginBottom:".8rem"},children:[e.jsx("button",{style:S.tab(sekme==="hakem"),onClick:()=>setSekme("hakem"),children:__T("Hakemler")}),e.jsx("button",{style:S.tab(sekme==="sapma"),onClick:()=>setSekme("sapma"),children:__T("Sapma Raporu (CJP)")+" · "+sapmali.length}),e.jsx("button",{style:S.tab(sekme==="kural"),onClick:()=>setSekme("kural"),children:__T("Kurallar ve eşikler")})]}),
    sekme==="hakem"?e.jsx("div",{style:{...S.card,overflowX:"auto"},children:A.ozet.length?e.jsxs("table",{style:{width:"100%",borderCollapse:"collapse",minWidth:1050},children:[
     e.jsx("thead",{children:e.jsx("tr",{children:["Panel","Pozisyon","Hakem","Rutin","Ort. sapma","Ort. |sapma|","En büyük","Tolerans dışı","Sıra uyumu ρ","Değerlendirme*","Uyarılar (FIG §2.1)",""].map(t=>e.jsx("th",{style:S.th,children:__T(t)},t))})}),
     e.jsx("tbody",{children:A.ozet.map(hakemSatiri)})]}):e.jsx("div",{style:{color:"#8b97b3",fontWeight:700},children:__T("Tamamlanmış puan yok.")})}):null,
    sekme==="sapma"?e.jsx("div",{style:{...S.card,overflowX:"auto"},children:sapmali.length?e.jsxs("table",{style:{width:"100%",borderCollapse:"collapse",minWidth:1000},children:[
     e.jsx("thead",{children:e.jsx("tr",{children:["Kategori","Sporcu / Takım","Panel","Hakem notları","Orta fark / tol. §8.1.2","Uç fark §8.1.6","Panel sonucu","Referans","Bulgular"].map(t=>e.jsx("th",{style:S.th,children:__T(t)},t))})}),
     e.jsx("tbody",{children:sapmali.map((r,i)=>e.jsxs("tr",{children:[
      e.jsx("td",{style:{...S.td,textAlign:"left",fontWeight:600},children:r.katAd}),e.jsx("td",{style:{...S.td,textAlign:"left"},children:r.ad}),
      e.jsx("td",{style:{...S.td,color:r.panel==="a"?"#f472b6":"#22d3ee",fontWeight:900},children:PANEL[r.panel].kod}),
      e.jsx("td",{style:S.td,children:r.hakemler.map(h=>e.jsxs("span",{style:{marginRight:".55rem",color:h.dis?"#f87171":"#e8edf7",fontWeight:h.dis?900:700},title:h.pos,children:[h.pos,"=",f2(h.not),h.atil==="Y"?"↑":h.atil==="D"?"↓":""]},h.pos))}),
      e.jsx("td",{style:{...S.td,color:r.f812?"#f87171":"#e8edf7"},children:f2(r.ortaFark)+" / "+f2(r.ortaTol)}),e.jsx("td",{style:{...S.td,color:r.f816?"#f87171":"#e8edf7"},children:f2(r.uc)}),
      e.jsx("td",{style:S.td,children:f3(r.panelFinal)}),e.jsxs("td",{style:S.td,children:[f3(r.ref)," ",e.jsx("span",{style:{fontSize:".66rem",color:"#8b97b3"},children:r.refSrc})]}),
      e.jsx("td",{style:{...S.td,textAlign:"left",fontSize:".72rem",color:"#fca5a5"},children:[r.f812?"§8.1.2 "+__T("tolerans aşıldı"):"",r.f816?"§8.1.6 "+__T("analiz gerekli"):"",r.hakemler.some(h=>h.dis)?__T("Tol. dışı")+": "+r.hakemler.filter(h=>h.dis).map(h=>h.pos).join(", "):""].filter(Boolean).join(" · ")})]},i))})]}):e.jsx("div",{style:{color:"#86efac",fontWeight:700},children:__T("Sapma yok.")})}):null,
    sekme==="kural"?e.jsxs("div",{style:S.card,children:[
     e.jsx("div",{style:{fontWeight:900,marginBottom:".5rem"},children:"FIG Aerobic Gymnastics Code of Points 2025–2028"}),
     e.jsx("div",{style:{fontSize:".82rem",color:"#cbd5e1",lineHeight:1.65,fontWeight:500},children:[
      "§8.1.1 — "+__T("4 hakemde en yüksek ve en düşük not atılır, ortadaki 2 notun ortalaması alınır (6 hakemde 2+2)."),
      "§8.1.2 — "+__T("Ortadaki iki not arasındaki azami fark: 8.00–10.00: 0.3 · 7.00–7.99: 0.4 · 6.00–6.99: 0.5 · 0–5.99: 0.6. Aşılırsa tüm notların ortalaması son puandır."),
      "§8.1.6 — "+__T("Uç notlar arasında 1.0 veya daha fazla fark varsa yarışma sonrası hakem analizi yapılır."),
      "§2.1 — "+__T("Superior Jury hakem sapmalarını kayda geçirir; tekrarlayan sapma, taraflılık veya sürekli çok yüksek/düşük not → uyarı ya da hakem değişikliği."),
      "§3.2 — "+__T("CJP yarışma sonunda tüm hakemlerin sapma raporunu Superior Jury'ye gönderir."),
      __T("Karnede referans not: Superior Jury kontrol notu (SJA/SJE); yoksa panel sonucu. Hakemin notu referanstan §8.1.2 toleransından fazla saparsa tolerans dışı sayılır.")].map((t,i)=>e.jsx("div",{children:"• "+t},i))}),
     e.jsx("div",{style:{fontWeight:900,margin:"1rem 0 .3rem"},children:__T("TCF iç değerlendirme eşikleri (FIG'de sayısal karşılığı yok)")}),
     e.jsxs("div",{style:{display:"flex",gap:".8rem",flexWrap:"wrap"},children:[esikAlan("iyiCok","Çok İyi: tolerans içi ≥ %"),esikAlan("iyi","İyi: tolerans içi ≥ %"),esikAlan("yeterli","Yeterli: tolerans içi ≥ %"),
      esikAlan("uyariAdet","Uyarı: tol. dışı en az (adet)"),esikAlan("uyariYuzde","Uyarı: tol. dışı en az (%)"),esikAlan("yonEsik","Yönlü sapma eşiği (±)",.05),esikAlan("yonMinN","Yönlü sapma: en az rutin"),esikAlan("ilFark","İl taraflılığı farkı (+)",.05),esikAlan("ilMinN","İl taraflılığı: en az rutin")]}),
     e.jsx("button",{style:{...S.ghost,marginTop:".8rem"},onClick:()=>setE({...ESIK0}),children:__T("Varsayılana dön")})]}):null
   ]})]})]});
}
export{Karne as default};
