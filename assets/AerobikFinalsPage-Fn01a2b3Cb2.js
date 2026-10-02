import"./i18n-Tr01a2b3Cb2.js";import{b as usToast,a as usInit,j as e,d as db}from"./main-C2LpyYUGCb2.js";import{r as R}from"./vendor-react-Cxw6bqwhCb2.js";import{k as ref,l as get,m as update}from"./vendor-firebase-940mxgRVCb2.js";import{A as V}from"./aerobikCriteriaDefaults-ld4mBtrICb2.js";import"./modulepreload-polyfill-B5Qt9EMXCb2.js";

const BASE="aerobik_yarismalar",TOP=8,RES=2,TAKE=TOP+RES;
const f3=v=>v==null||isNaN(v)?"—":Number(v).toFixed(3);
const isFinal=c=>/^final_/.test(c);
const cfg=c=>V[c]||V[String(c||"").replace(/^final_/,"")]||{};
const isTeam=c=>{const d=cfg(c);return d.tip==="takim"||d.tip==="karma"||d.athleteCount>1||d.group==="Step Aerobik"};
const scoreOf=sc=>{const v=sc&&(sc.finalScore!=null?sc.finalScore:(sc.sonuc!=null?sc.sonuc:null));return v==null||isNaN(v)?null:Number(v)};
const We=s=>(s||"").trim().replace(/[.#$[\]/]/g,"-").slice(0,60);
// kulup kotasi icin kulup kimligi: buyuk harf, harf/rakam disi karakterler atilir ("G.S.K" = "G.S.K.")
const KK=s=>String(s||"").toLocaleUpperCase("tr-TR").replace(/[^A-Z0-9ÇĞİÖŞÜ]/g,"");

// Final cikis sirasi PDF'i — Final Sonuclari PDF'iyle ayni tasarim (TCF logolu baslik bandi).
// Sira: varsa siralama/final_<kat> (puanlama ekraninin kullandigi), yoksa cikisSirasi.
const finalCikisPdf=async({C,liste,catLabel,toast})=>{
 const cats=C.kategoriler||{},spor=C.sporcular||{};
 const hedef=liste.filter(c=>cats["final_"+c]&&Object.keys(spor["final_"+c]||{}).length);
 if(!hedef.length){toast(__T("Çıkış sırası indirilecek final bulunamadı. Önce finali oluşturun."),"warning");return}
 toast(__T("PDF hazırlanıyor, lütfen bekleyin..."),"info");
 try{
  const{jsPDF}=(await import("./jspdf.es.min-gArCfqm1Cb2.js")).j,_m=await import("./jspdf.plugin.autotable-KFqWVtFsCb2.js"),at=_m.default||_m;
  const a=new jsPDF("landscape","mm","a4");
  let FT="helvetica",UNI=!1;
  try{const{R:r,B:b}=await import("./fontTR-Fn01a2b3Cb2.js");if(r&&b){a.addFileToVFS("Roboto.ttf",r);a.addFont("Roboto.ttf","Roboto","normal");a.addFileToVFS("Roboto-Bold.ttf",b);a.addFont("Roboto-Bold.ttf","Roboto","bold");FT="Roboto";UNI=!0}}catch{}
  const kucult=du=>new Promise(rs=>{try{const im=new Image;im.onload=()=>{try{const Z=256,cv=document.createElement("canvas");cv.width=Z;cv.height=Z;const cx=cv.getContext("2d");cx.clearRect(0,0,Z,Z);cx.drawImage(im,0,0,Z,Z);rs(cv.toDataURL("image/png"))}catch{rs(du)}};im.onerror=()=>rs(du);im.src=du}catch{rs(du)}});
  let logo=null;try{const bl=await(await fetch("/logo.png")).blob();const ham=await new Promise(k=>{const o=new FileReader;o.onloadend=()=>k(o.result),o.readAsDataURL(bl)});logo=await kucult(ham)}catch{}
  const o=v=>{const t=typeof v!="string"?String(v??""):v;return UNI?t:t.replace(/İ/g,"I").replace(/ı/g,"i").replace(/Ş/g,"S").replace(/ş/g,"s").replace(/Ğ/g,"G").replace(/ğ/g,"g").replace(/Ü/g,"U").replace(/ü/g,"u").replace(/Ö/g,"O").replace(/ö/g,"o").replace(/Ç/g,"C").replace(/ç/g,"c")};
  const UPL=v=>String(v||"").toLocaleUpperCase(__LANG()==="en"?"en":"tr-TR");
  const N=297,L=210,c=10;let k=0;
  const p=o(C.isim||""),h=o(C.il||""),S0=C.tarih||C.baslangicTarihi||"",S1=C.bitisTarihi||"";
  let n="";try{if(S0){const v=new Date(S0),z=S1?new Date(S1):null,K=x=>`${String(x.getDate()).padStart(2,"0")}.${String(x.getMonth()+1).padStart(2,"0")}.${x.getFullYear()}`;n=z&&z.getTime()!==v.getTime()?`${K(v)} - ${K(z)}`:K(v)}}catch{n=S0}
  const baslik=(v,z)=>{k>0&&a.addPage(),k++;const K=40,O=N/2;a.setDrawColor(0,56,117),a.setLineWidth(.6),a.rect(c,5,N-2*c,K,"S"),a.setDrawColor(200,210,220),a.setLineWidth(.2),a.line(c+30,5,c+30,5+K),a.line(N-c-30,5,N-c-30,5+K);
   if(logo)try{a.addImage(logo,"PNG",c+4,9,22,22,"tcflogo","FAST")}catch{}
   a.setFont(FT,"bold"),a.setFontSize(13),a.setTextColor(0,56,117),a.text(o(__T("TÜRKİYE CİMNASTİK FEDERASYONU")),O,14,{align:"center"});
   a.setFont(FT,"normal"),a.setFontSize(9),a.setTextColor(30,41,59),a.text(p,O,20,{align:"center"});(n||h)&&a.text(o(`${n}${h?" / "+h:""}`),O,25,{align:"center"});
   a.setFont(FT,"bold"),a.setFontSize(12),a.setTextColor(0,56,117),a.text(o(v),O,32,{align:"center"}),a.setFontSize(10),a.text(o(z),O,38,{align:"center"});
   if(logo)try{a.addImage(logo,"PNG",N-c-26,9,22,22,"tcflogo","FAST")}catch{}};
  const u={fillColor:[0,56,117],textColor:[255,255,255],fontStyle:"bold",halign:"center",valign:"middle",fontSize:8.5,cellPadding:3,lineWidth:.2,lineColor:[0,56,117]},
   R2={textColor:[15,23,42],fontSize:9,valign:"middle",lineWidth:.1,lineColor:[200,210,220],cellPadding:3},T2={fillColor:[240,244,248]};
  hedef.forEach(cat=>{
   const fc="final_"+cat,sp=spor[fc]||{},sr=C.siralama?.[fc],team=isTeam(cat);
   // puanlama ekraniyla ayni sira
   let ids=[];
   if(sr&&typeof sr==="object"){Object.keys(sr).map(x=>[parseInt(String(x).replace("rotation_","")),sr[x]]).filter(([i,r])=>!isNaN(i)&&r&&typeof r==="object").sort((x,y)=>x[0]-y[0]).forEach(([,r])=>Object.keys(r).filter(id=>sp[id]).sort((x,y)=>(r[x]?.sirasi??999)-(r[y]?.sirasi??999)).forEach(id=>ids.push(id)))}
   const kalan=Object.keys(sp).filter(id=>sp[id]&&!ids.includes(id)).sort((x,y)=>{const A=sp[x],B=sp[y];return((A.cikisSirasi??999)-(B.cikisSirasi??999))||((A._yedek?1:0)-(B._yedek?1:0))||String(A.ad||"").localeCompare(String(B.ad||""),"tr")});
   ids=ids.concat(kalan);
   // girisler (takimlarda okul+grupNo ile gruplanir)
   const giris=[],tm=new Map;
   ids.forEach(id=>{const m=sp[id];if(!team){giris.push({uyeler:[m],okul:m.okul||m.kulup||"",il:m.il||"",yed:m._yedek||""});return}
    const ky=String(m.okul||m.kulup||"").trim()+"|"+(m.grupNo||1);
    if(!tm.has(ky)){const g={uyeler:[],okul:m.okul||m.kulup||"",il:m.il||"",yed:m._yedek||""};tm.set(ky,g);giris.push(g)}
    const g=tm.get(ky);if(!g.uyeler.some(x=>KK(x.ad)===KK(m.ad)&&KK(x.soyad)===KK(m.soyad)))g.uyeler.push(m);g.il||(g.il=m.il||"")});
   baslik(UPL(catLabel(cat)),UPL(__T("Final Çıkış Sırası")));
   const ad=m=>[m.ad,m.soyad].filter(Boolean).join(" ");
   at(a,{startY:50,
    head:[[__T("Sıra"),__T(team?"Sporcular":"Adı Soyadı"),__T("Kulüp"),__T("İl"),__T("Not")].map(o)],
    body:giris.map((g,i)=>[{content:`${i+1}`,styles:{fontStyle:"bold",halign:"center",fontSize:11}},{content:o(g.uyeler.map(m=>UPL(ad(m))).join("\n")),styles:{fontStyle:"bold"}},{content:o(g.okul||"-")},{content:o(g.il||"-"),styles:{halign:"center"}},{content:g.yed?o(__T("Yedek")+" ("+g.yed+")"):"",styles:{halign:"center",textColor:[180,83,9],fontStyle:"bold"}}]),
    theme:"grid",styles:{font:FT},headStyles:u,bodyStyles:R2,alternateRowStyles:T2,margin:{left:c,right:c},
    columnStyles:{0:{cellWidth:18},1:{cellWidth:115},2:{cellWidth:90},3:{cellWidth:30},4:{cellWidth:24}},
    didParseCell:function(x){if(x.section==="body"&&giris[x.row.index]?.yed){x.cell.styles.fillColor=[255,251,235]}}});
   if(giris.some(g=>g.yed)){const fy=(a.lastAutoTable?.finalY||50)+5;a.setFont(FT,"normal"),a.setFontSize(7.5),a.setTextColor(100,116,139);
   a.text(o(__T("İlk 8 finalist; R1/R2 yedekler yalnızca finalistlerden biri çekilirse yarışır.")),c,fy),a.setTextColor(0,0,0)}});
  const g=a.internal.getNumberOfPages();for(let v=1;v<=g;v++)a.setPage(v),a.setFont(FT,"normal"),a.setFontSize(8),a.setTextColor(150,150,150),a.text(`${__T("Sayfa")} ${v} / ${g}`,N-c,L-6,{align:"right"});
  const dos=o(C.isim||"yarisma").replace(/[^a-z0-9]/gi,"_").toLowerCase()+(hedef.length===1?"_"+o(catLabel(hedef[0])).replace(/[^a-z0-9]/gi,"_").toLowerCase():"_tum")+"_final_cikis_sirasi.pdf";
  a.save(dos);toast(__T("PDF başarıyla indirildi."),"success");
 }catch(err){console.error(err);toast(__T("PDF oluşturulurken bir hata oluştu."),"error")}
};

function Finals(){
 const{toast}=usToast();usInit();
 const[comps,setComps]=R.useState({}),[comp,setComp]=R.useState(""),[busy,setBusy]=R.useState(!1),[log,setLog]=R.useState(null),[loading,setLoading]=R.useState(!0),[tmpl,setTmpl]=R.useState({}),[texp,setTexp]=R.useState(!0),[expanded,setExpanded]=R.useState({}),[kota,setKota]=R.useState("");

 const reload=()=>get(ref(db,BASE)).then(s=>{const v=s.val()||{},o={};Object.entries(v).forEach(([k,c])=>{c&&c.arsivli!==!0&&c.arsivli!=="true"&&(o[k]=c)});setComps(o)}).finally(()=>setLoading(!1));
 R.useEffect(()=>{reload()},[]);

 const C=comps[comp]||{},cats=C.kategoriler||{},spor=C.sporcular||{},pun=C.puanlar||{};
 const realCats=Object.keys(cats).filter(c=>!isFinal(c)).sort();
 const finalCats=Object.keys(cats).filter(isFinal);
 const catLabel=c=>cats[c]?.name||cfg(c).label||c;

 const isKA=C.kuluplerarasi===!0;
 R.useEffect(()=>{const v=comps[comp]?.finalKulupKota;setKota(v!=null&&v!==""?String(v):"")},[comp]);
 const kotaN=isKA?Math.max(0,parseInt(kota)||0):0;
 // girisin kulubu (kota icin)
 const clubOf=(cat,id)=>{if(isTeam(cat)){const mem=teamMembers(cat,id);if(mem.length){const m=mem[0][1];return KK(m.okul||m.kulup||m.il)}const p=String(id).split("::");return KK(p.length>=3?p.slice(1,-1).join("::"):"")}const m=spor[cat]?.[id]||{};return KK(m.okul||m.kulup||m.il)};
 // eleme siralamasi; kulupler arasi ise kulup basina en fazla kotaN giris
 const rankFull=cat=>{const aths=pun[cat]||{},all=Object.entries(aths).map(([id,sc])=>({id,sc,score:scoreOf(sc)})).filter(r=>r.score!=null).sort((a,b)=>b.score-a.score);
  if(!kotaN)return{top:all.slice(0,TAKE),atlanan:[]};
  const say={},top=[],atlanan=[];
  for(const r of all){if(top.length>=TAKE)break;const k=clubOf(cat,r.id)||("#"+r.id);say[k]=say[k]||0;if(say[k]>=kotaN){atlanan.push(r);continue}say[k]++;top.push(r)}
  return{top,atlanan}};
 const rankCat=cat=>rankFull(cat).top;
 // kategori tamamlandi mi: puanlanacak her girisin puani (veya durum kaydi) var mi.
 // Puanlama ekrani gibi cikis sirasindaki (siralama) sporculari esas alir; mukerrer
 // kayitlar (ayni ad+kulup) tek giris sayilir, kopyalardan biri puanliysa giris tamamdir.
 const durumCat=cat=>{const cm=spor[cat]||{},pz=pun[cat]||{},sr=C.siralama?.[cat];
  let ids=Object.keys(cm).filter(id=>cm[id]);
  if(sr&&typeof sr==="object"){const s2=new Set;Object.values(sr).forEach(r=>r&&typeof r==="object"&&Object.keys(r).forEach(id=>s2.add(id)));const f2=ids.filter(id=>s2.has(id));if(f2.length)ids=f2}
  const grp=new Map;
  ids.forEach(id=>{const m=cm[id];let k;
   if(isTeam(cat)){const ok=(m.okul||m.kulup||"").trim();k=We(cat+"::"+ok+"::"+(m.grupNo||1));grp.has(k)||grp.set(k,[]);grp.get(k).push(k)}
   else{k=KK(m.ad)+"|"+KK(m.soyad)+"|"+KK(m.okul||m.kulup||m.il);grp.has(k)||grp.set(k,[]);grp.get(k).push(id)}});
  // siralama'ya alinmamis mukerrer kopyalarin puani da sayilsin (ferdi)
  if(!isTeam(cat))Object.keys(cm).forEach(id=>{const m=cm[id];if(!m)return;const k=KK(m.ad)+"|"+KK(m.soyad)+"|"+KK(m.okul||m.kulup||m.il);grp.has(k)&&!grp.get(k).includes(id)&&grp.get(k).push(id)});
  let bitti=0;grp.forEach(list=>{if(list.some(x=>{const p=pz[x];return p&&(scoreOf(p)!=null||p.durum)}))bitti++});
  return{toplam:grp.size,bitti,tamam:grp.size>0&&bitti>=grp.size}};
 const teamMembers=(cat,key)=>{const parts=String(key).split("::"),gn=parts[parts.length-1],ok=parts.length>=3?parts.slice(1,-1).join("::"):"";const cm=spor[cat]||{};return Object.entries(cm).filter(([,m])=>m&&String(m.grupNo??m.cikisSirasi??"")===String(gn)&&(ok===""||String(m.okul||m.kulup||"")===ok||We(m.okul||m.kulup)===ok))};
 const nameOfEntry=(cat,id)=>{const team=isTeam(cat);if(team){const mem=teamMembers(cat,id);return[...new Set(mem.map(([,m])=>[m.ad,m.soyad].filter(Boolean).join(" ")).filter(Boolean))].join(", ")||id}const m=spor[cat]?.[id]||{};return[m.ad,m.soyad].filter(Boolean).join(" ")||id};

 // Cikis sirasi sablonu: eleme sirasi(rank) -> cikis numarasi. Tum kategorilere ayni uygulanir.
 const tmplCs=rank=>{const v=tmpl[rank];return v!=null&&v!==""?Number(v):rank};
 const csOf=rank=>rank>TOP?rank:tmplCs(rank); // yedekler sabit 9/10
 const usedVals=Array.from({length:TOP},(_,i)=>tmplCs(i+1));
 const dupWarn=new Set(usedVals).size!==usedVals.length;
 const anyCat=realCats.some(c=>rankCat(c).length>0);

 const generate=async(liste)=>{
  if(busy||!comp)return;
  const hedef=Array.isArray(liste)?liste:realCats;
  // final kategorisinde puan girilmisse uzerine yazmadan once onay al
  const puanli=hedef.filter(c=>Object.keys(pun["final_"+c]||{}).length>0);
  if(puanli.length&&!window.confirm(puanli.map(catLabel).join(", ")+"\n\n"+__T("Bu finalde girilmiş puanlar var. Yeniden oluşturulursa final puanları SİLİNİR. Devam edilsin mi?")))return;
  const eksik=hedef.map(c=>({c,d:durumCat(c)})).filter(x=>!x.d.tamam&&x.d.toplam>0);
  if(eksik.length&&!window.confirm(eksik.map(x=>catLabel(x.c)+" ("+x.d.bitti+"/"+x.d.toplam+")").join(", ")+"\n\n"+__T("Bu kategoride puanı girilmemiş sporcu/takım var. Yine de final oluşturulsun mu?")))return;
  setBusy(!0);setLog(null);
  const upd={},summary=[];
  if(isKA)upd.finalKulupKota=kotaN||null;
  hedef.forEach(cat=>{const top=rankCat(cat);if(!top.length)return;const fcat="final_"+cat,team=isTeam(cat),newSpor={},names=[];
    top.forEach((row,ix)=>{const rank=ix+1,reserve=rank>TOP,yed=reserve?"R"+(rank-TOP):null,cs=csOf(rank),ex=reserve?{_yedek:yed}:{};
      if(team){const _gor=new Set;teamMembers(cat,row.id).slice().sort((a,b)=>(a[1].cikisSirasi==null||a[1].cikisSirasi===999?1:0)-(b[1].cikisSirasi==null||b[1].cikisSirasi===999?1:0)).forEach(([mid,md])=>{const _nk=KK(md.ad)+"|"+KK(md.soyad);if(_gor.has(_nk))return;_gor.add(_nk);newSpor[mid]={...md,cikisSirasi:cs,grupNo:md.grupNo??md.cikisSirasi??cs,_finalRank:rank,...ex}})}
      else{const md=spor[cat]?.[row.id]||{};newSpor[row.id]={...md,cikisSirasi:cs,_finalRank:rank,...ex}}
      names.push({rank,cs,reserve,yed,name:nameOfEntry(cat,row.id),score:row.score});});
    upd[`kategoriler/${fcat}`]={name:"🏆 Final — "+catLabel(cat),final:!0,baseCat:cat,tip:cfg(cat).tip||"ferdi",olusturma:Date.now()};
    // Final cikis sirasi (sablon) hem sporcu kaydina hem siralama'ya yazilir; boylece
    // cikis sirasi sayfasi ve puanlama ekrani sablondaki sirayi gosterir
    // (elemeden kopyalanan eski sirasi/rotasyonGrubu degerleri ezilir).
    const _ord=Object.entries(newSpor).sort((p,q)=>(p[1].cikisSirasi-q[1].cikisSirasi)||((p[1]._yedek?1:0)-(q[1]._yedek?1:0))||String(p[1].ad||"").localeCompare(String(q[1].ad||""),"tr"));
    const _rot={};_ord.forEach(([mid,md],ix)=>{md.sirasi=ix+1;md.rotasyonGrubu=0;_rot[mid]={sirasi:ix+1,ad:md.ad||"",soyad:md.soyad||"",tckn:md.tckn||"",okul:md.okul||"",yarismaTuru:md.yarismaTuru||"ferdi",...(md.grupNo!=null?{grupNo:md.grupNo}:{})}});
    upd[`sporcular/${fcat}`]=newSpor;upd[`puanlar/${fcat}`]=null;upd[`siralama/${fcat}`]=_ord.length?{rotation_0:_rot}:null;
    summary.push({cat,fcat,label:catLabel(cat),team,names});});
  if(!summary.length){toast("Sıralanacak (puanı girilmiş) sporcu bulunamadı.","warning");setBusy(!1);return}
  try{await update(ref(db,`${BASE}/${comp}`),upd);await reload();setLog(summary);toast((summary.length===1?"🏆 "+summary[0].label+" — ":summary.length+" kategori — ")+__T("final oluşturuldu ✓")+" (ilk "+TOP+" + "+RES+" yedek"+(kotaN?", "+__T("kulüp başına en fazla")+" "+kotaN:"")+")","success")}catch{toast("Hata oluştu.","error")}
  setBusy(!1);
 };
 const clearOne=async cat=>{
  const fc="final_"+cat;if(busy||!comp)return;
  const np=Object.keys(pun[fc]||{}).length;
  if(!window.confirm(catLabel(cat)+" — "+__T("finali silinsin mi?")+(np?"\n\n"+np+" "+__T("final puanı da silinecek."):"")))return;
  setBusy(!0);setLog(null);
  try{await update(ref(db,`${BASE}/${comp}`),{[`kategoriler/${fc}`]:null,[`sporcular/${fc}`]:null,[`puanlar/${fc}`]:null,[`siralama/${fc}`]:null});await reload();toast(catLabel(cat)+" — "+__T("finali silindi."),"success")}catch{toast("Hata oluştu.","error")}
  setBusy(!1);
 };
 const clearFinals=async()=>{
  if(busy||!comp)return;const upd={},keys=new Set();
  [Object.keys(cats),Object.keys(spor),Object.keys(pun)].forEach(a=>a.forEach(c=>{if(isFinal(c))keys.add(c)}));
  if(!keys.size){toast("Silinecek final kategorisi yok.","warning");return}
  if(!window.confirm(keys.size+" "+__T("final kategorisi ve bu finallerde girilmiş TÜM puanlar silinecek. Emin misiniz?")))return;
  setBusy(!0);setLog(null);
  keys.forEach(fc=>{upd[`kategoriler/${fc}`]=null;upd[`sporcular/${fc}`]=null;upd[`puanlar/${fc}`]=null;upd[`siralama/${fc}`]=null});
  try{await update(ref(db,`${BASE}/${comp}`),upd);await reload();toast(keys.size+" final kategorisi silindi.","success")}catch{toast("Hata oluştu.","error")}
  setBusy(!1);
 };
 const clearReserves=async()=>{
  if(busy||!comp)return;setBusy(!0);setLog(null);const upd={};let n=0;
  finalCats.forEach(fc=>{const members=spor[fc]||{},scores=pun[fc]||{},team=isTeam(fc);
    Object.entries(members).forEach(([mid,m])=>{if(!m||!m._yedek)return;let scored=!1;
      if(team){const ok=(m.okul||m.kulup||"").trim(),gn=m.grupNo??m.cikisSirasi,sid=We(fc+"::"+ok+"::"+gn);scored=scores[sid]&&scoreOf(scores[sid])!=null}
      else scored=scores[mid]&&scoreOf(scores[mid])!=null;
      if(!scored){upd[`sporcular/${fc}/${mid}`]=null;n++}});});
  if(!n){toast("Kaldırılacak (yarışmamış/puansız) yedek bulunamadı.","warning");setBusy(!1);return}
  try{await update(ref(db,`${BASE}/${comp}`),upd);await reload();toast(n+" yedek sporcu (R1/R2) kaldırıldı.","success")}catch{toast("Hata oluştu.","error")}
  setBusy(!1);
 };
 const hasReserves=finalCats.some(fc=>Object.values(spor[fc]||{}).some(m=>m&&m._yedek));
 const setTnum=(rank,v)=>setTmpl(o=>({...o,[rank]:v===""?"":Math.max(1,parseInt(v)||1)}));

 const S={wrap:{minHeight:"100vh",background:"radial-gradient(1200px 600px at 50% -10%,#111a30 0%,#0a0e1a 60%)",color:"#e8edf7",fontFamily:"'Plus Jakarta Sans',system-ui,sans-serif",paddingBottom:"3rem"},
  top:{position:"sticky",top:0,zIndex:10,background:"rgba(10,14,26,.9)",backdropFilter:"blur(12px)",borderBottom:"1px solid #2a3550",padding:".8rem 1.1rem",display:"flex",alignItems:"center",gap:".8rem"},
  ico:{width:38,height:38,borderRadius:11,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,background:"linear-gradient(135deg,#f59e0b,#ef4444)",boxShadow:"0 6px 18px rgba(245,158,11,.35)"},
  in:{maxWidth:820,margin:"0 auto",padding:"1rem"},
  sel:{width:"100%",padding:".65rem .8rem",borderRadius:10,border:"1px solid #2a3550",background:"#131a2b",color:"#e8edf7",fontWeight:700,fontSize:".95rem",marginBottom:"1rem"},
  card:{background:"#131a2b",border:"1px solid #2a3550",borderRadius:14,padding:".8rem 1rem",marginBottom:".6rem",display:"flex",alignItems:"center",gap:".7rem",flexWrap:"wrap"},
  badge:{fontSize:".7rem",fontWeight:800,padding:".2rem .5rem",borderRadius:6},
  yed:{fontSize:".72rem",fontWeight:900,padding:".25rem .5rem",borderRadius:6,background:"rgba(245,158,11,.2)",color:"#fbbf24",border:"1px solid rgba(245,158,11,.5)",minWidth:38,textAlign:"center"},
  csb:{fontSize:".85rem",fontWeight:900,padding:".25rem .5rem",borderRadius:8,background:"rgba(103,232,249,.15)",color:"#67e8f9",minWidth:34,textAlign:"center"},
  numin:{width:60,textAlign:"center",background:"#1b2438",border:"1px solid #f59e0b66",borderRadius:8,color:"#e8edf7",padding:".4rem",fontWeight:800,font:"inherit",fontSize:"1rem"},
  btn:{padding:".85rem 1.1rem",border:"none",borderRadius:12,fontWeight:800,fontSize:"1rem",cursor:"pointer",color:"#fff"},
  center:{maxWidth:560,margin:"3rem auto 0",textAlign:"center",color:"#8b97b3",fontWeight:700,padding:"2rem 1rem"}};

 return e.jsxs("div",{style:S.wrap,children:[
  e.jsxs("div",{style:S.top,children:[e.jsx("div",{style:S.ico,children:e.jsx("span",{className:"material-icons-round",style:{color:"#fff",fontSize:"22px"},children:"emoji_events"})}),e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:".72rem",color:"#8b97b3",fontWeight:800,textTransform:"uppercase",letterSpacing:".05em"},children:__T("Aerobik")}),e.jsx("div",{style:{fontWeight:800,fontSize:"1.05rem",lineHeight:1.1},children:__T("Final Oluştur")})]})]}),
  e.jsxs("div",{style:S.in,children:[
   e.jsx("div",{style:{fontSize:".85rem",color:"#8b97b3",fontWeight:700,margin:"0 0 .8rem"},children:[__T("Her kategoride ilk 8 sporcu finale, 9-10. sporcular R1/R2 yedek olarak alınır. Aşağıdaki tek çıkış-sırası şablonu (eleme sırası → çıkış no) TÜM kategorilere aynı uygulanır."),e.jsx("br",{}),__T("Finaller kategori bazında oluşturulur: biten kategorinin kartındaki düğmeyi kullanın.")]}),
   loading?e.jsx("div",{style:S.center,children:__T("Yükleniyor…")}):e.jsxs(e.Fragment,{children:[
    e.jsxs("select",{style:S.sel,value:comp,onChange:x=>{setComp(x.target.value);setLog(null);setTmpl({});setExpanded({})},children:[e.jsx("option",{value:"",children:__T("— Yarışma seçin —")}),Object.entries(comps).map(([id,c])=>e.jsx("option",{value:id,children:c.isim||c.ad||id},id))]}),
    comp?e.jsxs(e.Fragment,{children:[
     realCats.length===0?e.jsx("div",{style:S.center,children:__T("Bu yarışmada kategori yok.")}):e.jsxs(e.Fragment,{children:[
     anyCat?e.jsxs("div",{style:{...S.card,display:"block",border:"1px solid rgba(245,158,11,.4)",background:"#161a1f"},children:[
       e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:".7rem",cursor:"pointer"},onClick:()=>setTexp(x=>!x),children:[
        e.jsxs("div",{style:{flex:1,minWidth:0},children:[e.jsx("div",{style:{fontWeight:800},children:__T("🎬 Çıkış Sırası Şablonu")}),e.jsx("div",{style:{color:"#8b97b3",fontSize:".8rem",fontWeight:700},children:__T("Eleme sırası → çıkış no · tek seferde belirle, tüm kategorilere uygulanır")})]}),
        e.jsx("span",{style:{color:"#fbbf24",fontWeight:800},children:texp?"▲":"▼"})]}),
       texp?e.jsxs("div",{style:{marginTop:".7rem",borderTop:"1px solid #2a3550",paddingTop:".6rem"},children:[
        e.jsxs("div",{style:{display:"flex",gap:".5rem",flexWrap:"wrap",marginBottom:".7rem"},children:[
          e.jsx("button",{style:{...S.btn,padding:".45rem .7rem",fontSize:".78rem",background:"#1b2438",border:"1px solid #2a3550",color:"#cbd5e1"},onClick:()=>setTmpl({}),children:__T("↧ Sıfırla (1→1 … 8→8)")}),
          e.jsx("button",{style:{...S.btn,padding:".45rem .7rem",fontSize:".78rem",background:"#1b2438",border:"1px solid #2a3550",color:"#cbd5e1"},onClick:()=>{const o={};for(let i=1;i<=TOP;i++)o[i]=TOP-i+1;setTmpl(o)},children:__T("↥ Ters (1→8 … 8→1)")})]}),
        e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(150px,1fr))",gap:".5rem"},children:[
          Array.from({length:TOP},(_,i)=>i+1).map(rank=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:".5rem",background:"#131a2b",border:"1px solid #2a3550",borderRadius:10,padding:".4rem .6rem"},children:[
            e.jsxs("span",{style:{color:"#8b97b3",fontSize:".82rem",fontWeight:800,whiteSpace:"nowrap"},children:["Eleme ",rank,". →"]}),
            e.jsx("input",{type:"number",min:"1",max:String(TOP),value:tmpl[rank]??rank,onChange:ev=>setTnum(rank,ev.target.value),style:S.numin}),
            e.jsx("span",{style:{color:"#8b97b3",fontSize:".72rem",fontWeight:700},children:__T("çıkış")})]},rank)),
          e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:".5rem",background:"#131a2b",border:"1px dashed rgba(245,158,11,.5)",borderRadius:10,padding:".4rem .6rem"},children:[e.jsx("span",{style:S.yed,children:__T("R1")}),e.jsx("span",{style:{color:"#8b97b3",fontSize:".82rem",fontWeight:800},children:__T("→ çıkış 9 (sabit)")})]}),
          e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:".5rem",background:"#131a2b",border:"1px dashed rgba(245,158,11,.5)",borderRadius:10,padding:".4rem .6rem"},children:[e.jsx("span",{style:S.yed,children:__T("R2")}),e.jsx("span",{style:{color:"#8b97b3",fontSize:".82rem",fontWeight:800},children:__T("→ çıkış 10 (sabit)")})]})]}),
        dupWarn?e.jsx("div",{style:{fontSize:".76rem",color:"#fca5a5",fontWeight:800,marginTop:".6rem"},children:__T("⚠ Aynı çıkış numarası birden fazla eleme sırasına verilmiş — kontrol edin.")}):e.jsx("div",{style:{fontSize:".72rem",color:"#8b97b3",fontWeight:600,marginTop:".6rem"},children:__T("Örn. Eleme 1. → 2, Eleme 2. → 6 yazarsanız her kategoride 1. sıradaki 2. çıkar, 2. sıradaki 6. çıkar.")})
       ]}):null
     ]}):null,
     isKA?e.jsxs("div",{style:{...S.card,border:"1px solid rgba(14,165,233,.45)",background:"#111b2b"},children:[
       e.jsxs("div",{style:{flex:1,minWidth:220},children:[
        e.jsx("div",{style:{fontWeight:800},children:__T("🏟 Kulüp kotası (kulüplerarası yarışma)")}),
        e.jsx("div",{style:{color:"#8b97b3",fontSize:".8rem",fontWeight:700},children:__T("Bir kulüpten finale (yedekler dahil) en fazla kaç sporcu/takım kalabilir? Boş = sınırsız.")})]}),
       e.jsx("input",{type:"number",min:"1",max:String(TAKE),placeholder:"∞",value:kota,onChange:ev=>setKota(ev.target.value===""?"":String(Math.max(1,Math.min(TAKE,parseInt(ev.target.value)||1)))),style:{...S.numin,width:72}}),
       kotaN?e.jsx("button",{style:{...S.btn,padding:".45rem .7rem",fontSize:".78rem",background:"#1b2438",border:"1px solid #2a3550",color:"#cbd5e1"},onClick:()=>setKota(""),children:__T("Sınırsız")}):null]}):null,
     realCats.map(cat=>{const _rf=rankFull(cat),_dr=durumCat(cat),top=_rf.top,fc="final_"+cat,has=!!cats[fc],op=!!expanded[cat]&&top.length>0,nc=Math.min(top.length,TOP),nr=Math.max(0,top.length-TOP);return e.jsxs("div",{style:{...S.card,display:"block"},children:[
       e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:".7rem",cursor:top.length?"pointer":"default"},onClick:()=>top.length&&setExpanded(x=>({...x,[cat]:!x[cat]})),children:[
        e.jsxs("div",{style:{flex:1,minWidth:0},children:[e.jsxs("div",{style:{fontWeight:800},children:[catLabel(cat),isTeam(cat)?e.jsx("span",{style:{...S.badge,marginLeft:".4rem",background:"rgba(8,145,178,.2)",color:"#67e8f9"},children:__T("GRUP/ÇİFT")}):null]}),e.jsxs("div",{style:{color:"#8b97b3",fontSize:".8rem",fontWeight:700},children:[top.length>0?nc+(isTeam(cat)?" takım":" sporcu")+(nr?" + "+nr+" yedek":"")+" · çıkış sırasını görmek için dokunun":"puanı girilmiş sporcu yok",_rf.atlanan.length?e.jsxs("span",{style:{color:"#7dd3fc"},children:[" · ",_rf.atlanan.length," ",__T("giriş kulüp kotası nedeniyle atlandı")]}):null]})]}),
        _dr.toplam?(_dr.tamam?e.jsx("span",{style:{...S.badge,background:"rgba(34,197,94,.12)",color:"#4ade80",border:"1px solid rgba(34,197,94,.35)"},children:__T("✓ TAMAMLANDI")}):e.jsxs("span",{style:{...S.badge,background:"rgba(245,158,11,.12)",color:"#fbbf24",border:"1px solid rgba(245,158,11,.35)"},children:[_dr.bitti,"/",_dr.toplam," ",__T("puanlandı")]})):null,
        has?e.jsx("span",{style:{...S.badge,background:"rgba(34,197,94,.18)",color:"#86efac"},children:__T("✓ FİNAL VAR")}):null,
        top.length?e.jsx("span",{style:{color:"#8b97b3",fontWeight:800},children:op?"▲":"▼"}):null
       ]}),
       top.length?e.jsxs("div",{style:{display:"flex",gap:".5rem",flexWrap:"wrap",marginTop:".6rem"},children:[
        e.jsx("button",{style:{...S.btn,padding:".5rem .8rem",fontSize:".82rem",background:_dr.tamam?"linear-gradient(135deg,#f59e0b,#ef4444)":"#1b2438",border:_dr.tamam?"none":"1px solid #f59e0b",color:_dr.tamam?"#fff":"#fbbf24"},disabled:busy,onClick:ev=>{ev.stopPropagation();generate([cat])},children:busy?__T("İşleniyor…"):(has?__T("🔄 Finali Yeniden Oluştur"):__T("🏆 Finali Oluştur"))}),
        has?e.jsx("button",{style:{...S.btn,padding:".5rem .8rem",fontSize:".82rem",background:"#1b2438",border:"1px solid #38bdf8",color:"#7dd3fc"},disabled:busy,onClick:ev=>{ev.stopPropagation();finalCikisPdf({C,liste:[cat],catLabel,toast})},children:__T("📄 Çıkış Sırası PDF")}):null,
        has?e.jsx("button",{style:{...S.btn,padding:".5rem .8rem",fontSize:".82rem",background:"#1b2438",border:"1px solid #ef4444",color:"#fca5a5"},disabled:busy,onClick:ev=>{ev.stopPropagation();clearOne(cat)},children:__T("Finali Sil")}):null]}):null,
       op?e.jsxs("div",{style:{marginTop:".7rem",borderTop:"1px solid #2a3550",paddingTop:".6rem"},children:[
        e.jsx("div",{style:{fontSize:".72rem",color:"#8b97b3",fontWeight:800,textTransform:"uppercase",letterSpacing:".03em",marginBottom:".5rem"},children:__T("Çıkış sırasına göre (şablondan)")}),
        top.map((row,ix)=>({row,rank:ix+1,cs:csOf(ix+1),reserve:ix+1>TOP})).sort((a,b)=>a.cs-b.cs).map(it=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:".6rem",padding:".3rem 0",borderBottom:"1px solid rgba(40,52,79,.4)"},children:[
          it.reserve?e.jsx("span",{style:S.yed,children:__T("R")+(it.rank-TOP)}):e.jsx("span",{style:S.csb,children:it.cs}),
          e.jsx("span",{style:{flex:1,minWidth:0,fontWeight:700,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:nameOfEntry(cat,it.row.id)}),
          e.jsxs("span",{style:{color:"#8b97b3",fontSize:".78rem",whiteSpace:"nowrap"},children:["eleme ",it.rank,". · ",f3(it.row.score)]})
        ]},it.row.id)),
        _rf.atlanan.length?e.jsxs("div",{style:{marginTop:".5rem"},children:[
         e.jsx("div",{style:{fontSize:".72rem",color:"#7dd3fc",fontWeight:800,textTransform:"uppercase",letterSpacing:".03em",margin:".3rem 0"},children:__T("Kulüp kotası nedeniyle atlananlar")}),
         _rf.atlanan.map(r=>e.jsxs("div",{style:{display:"flex",gap:".6rem",padding:".25rem 0",opacity:.6,fontSize:".85rem"},children:[e.jsx("span",{style:{flex:1,minWidth:0,fontWeight:700,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",textDecoration:"line-through"},children:nameOfEntry(cat,r.id)}),e.jsx("span",{style:{color:"#8b97b3",whiteSpace:"nowrap"},children:f3(r.score)})]},r.id))]}):null
       ]}):null
     ]},cat)})]}),
     e.jsxs("div",{style:{display:"flex",gap:".6rem",flexWrap:"wrap",marginTop:"1rem"},children:[
       finalCats.length>0?e.jsx("button",{style:{...S.btn,background:"linear-gradient(135deg,#0ea5e9,#1e3a8a)",flex:1,minWidth:220},disabled:busy,onClick:()=>finalCikisPdf({C,liste:realCats,catLabel,toast}),children:__T("📄 Tüm Final Çıkış Sıraları (PDF)")}):null,
       hasReserves?e.jsx("button",{style:{...S.btn,background:"#1b2438",border:"1px solid #f59e0b",color:"#fbbf24"},disabled:busy,onClick:clearReserves,children:__T("Yedekleri Kaldır (R1/R2)")}):null,
       finalCats.length>0?e.jsx("button",{style:{...S.btn,background:"#1b2438",border:"1px solid #ef4444",color:"#fca5a5"},disabled:busy,onClick:clearFinals,children:__T("Tüm Finalleri Sil")}):null
     ]}),
     log?e.jsxs("div",{style:{marginTop:"1.2rem"},children:[e.jsx("div",{style:{fontWeight:800,color:"#86efac",marginBottom:".5rem"},children:__T("✓ Oluşturulan finaller")}),log.map(g=>e.jsxs("div",{style:{...S.card,display:"block"},children:[e.jsxs("div",{style:{fontWeight:800,marginBottom:".4rem"},children:["🏆 Final — ",g.label,g.team?" (grup/çift)":""]}),e.jsx("div",{style:{display:"grid",gap:".2rem"},children:[...g.names].sort((a,b)=>(a.reserve?1e3+a.rank:a.cs)-(b.reserve?1e3+b.rank:b.cs)).map(n=>e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontSize:".85rem",fontWeight:700,gap:".5rem"},children:[e.jsxs("span",{style:{minWidth:0,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:[e.jsx("b",{style:{color:n.reserve?"#fbbf24":"#67e8f9"},children:n.reserve?n.yed+" · yedek ":n.cs+". çıkış "}),n.name,e.jsxs("span",{style:{color:"#8b97b3",fontWeight:600},children:[" (eleme ",n.rank,".)"]})]}),e.jsx("span",{style:{color:"#8b97b3",whiteSpace:"nowrap"},children:f3(n.score)})]},n.rank))})]},g.fcat))]}):null
    ]}):null
   ]})
  ]})
 ]});
}
export{Finals as default};
