import"./i18n-Tr01a2b3Cb2.js";import{b as usToast,a as usInit,j as e,d as db,u as usAuth,l as logAction}from"./main-C2LpyYUGCb2.js";import{r as R}from"./vendor-react-Cxw6bqwhCb2.js";import{k as ref,l as get,m as update,o as onValue}from"./vendor-firebase-940mxgRVCb2.js";import{fotoKaydet,fotoSil,dosyaSec,eslestir,fotoYol}from"./fotoYukle-Fy01a2b3Cb2.js";import{R as RC,a as RA}from"./ritmikCriteriaDefaults-CgOlnfQcCb2.js";import{raImg,raKey,raAd}from"./ritmikAlet-Ra01a2b3Cb2.js";import{isIntl,katEN,bayraklarPng}from"./intl-Ul01a2b3Cb2.js";import"./modulepreload-polyfill-B5Qt9EMXCb2.js";

// RİTMİK FİNAL OLUŞTUR (2026-10-07 v2)
//  Her final (kategori × alet / genel tasnif) kendi ayarıyla oluşturulur: finalist sayısı (n), yedek sayısı (y) ve çıkış sırası
//    ters  : elemenin n. sırası 1. çıkar … 1. sırası son çıkar (FIG / Balkan start list düzeni)
//    duz   : eleme sırası = çıkış sırası
//    sablon: yarışmanın "Final Çıkış Sırası Şablonu" (finalCikisSablonu, eski davranış; boşsa düz)
//  Seçimler ve ayarlar yarışmaya kaydedilir: <yarışma>/finalAyar {limit,useAA,fill,sec{"kat|alet":bool},birim{"kat|alet":{n,y,sira}}}
//  Final kategorisi kaydı eskisiyle aynı (kategoriler/final_*, sporcular/final_* {cikisSirasi,_finalRank,_yedek}, siralama/final_*).
//  PDF: final çıkış listesi (kategori → alet tabloları), yarışma uluslararası + EN çıktıysa İngilizce.
const BASE="ritmik_yarismalar",AA="_cm",DEF={n:8,y:2,sira:"sablon"},TOP=8;
const f3=v=>v==null||isNaN(v)?"—":Number(v).toFixed(3);
const isFinal=c=>/^final_/.test(c);
const baseCat=c=>String(c||"").replace(/^final_/,"").split("__")[0];
const cfg=c=>RC[c]||RC[baseCat(c)]||{};
const aletTr=a=>RA[a]?.labelTr||RA[a]?.label||a;
const aletLabel=a=>__T(aletTr(a));
const num=v=>v==null||v===""||isNaN(v)?null:Number(v);
const clamp=(v,a,b,d)=>{const n=parseInt(v);return isNaN(n)?d:Math.max(a,Math.min(b,n))};
const SIRA=[["ters","south","Ters","Elemenin sonuncusu ilk çıkar (WG)"],["duz","north","Düz","Eleme sırası = çıkış sırası"],["sablon","tune","Şablon","Final Çıkış Sırası Şablonu"],["elle","edit_note","Elle","Bu final için sıra eşlemesini elle seç (ör. 1. → 3. çıkar)"]];

function RitmikFinals(){
 const{toast}=usToast();usInit();const{currentUser:_lu}=usAuth()||{},_un=_lu?.adSoyad||_lu?.kullaniciAdi||"";
 const[comps,setComps]=R.useState({}),[comp,setComp]=R.useState(""),[busy,setBusy]=R.useState(!1),
       [log,setLog]=R.useState(null),[loading,setLoading]=R.useState(!0),
       [tmpl,setTmpl]=R.useState({}),[texp,setTexp]=R.useState(!1),[acik,setAcik]=R.useState({}),
       [sel,setSel]=R.useState({}),[limit,setLimit]=R.useState(2),[useAA,setUseAA]=R.useState(!0),[fill,setFill]=R.useState(!1),
       [birim,setBirim]=R.useState({}),[kayit,setKayit]=R.useState(""),[pdfBusy,setPdfBusy]=R.useState(!1),[toplu,setToplu]=R.useState({n:8,y:2,sira:"ters"}),[fotolar,setFotolar]=R.useState({}),[fotoBusy,setFotoBusy]=R.useState("");
 // sporcu fotoğrafları (yalnız link) — finalist satırında küçük resim; sporcu kartı / canlı skor bunları gösterir
 R.useEffect(()=>{if(!comp){setFotolar({});return}return onValue(ref(db,fotoYol(BASE,comp)),s=>setFotolar(s.val()||{}))},[comp]);

 const reload=()=>get(ref(db,BASE)).then(s=>{const v=s.val()||{},o={};Object.entries(v).forEach(([k,c])=>{c&&c.arsivli!==!0&&c.arsivli!=="true"&&(o[k]=c)});setComps(o)}).finally(()=>setLoading(!1));
 R.useEffect(()=>{reload()},[]);
 R.useEffect(()=>{if(comp)return;try{const s2=localStorage.getItem("tcfRtFinalComp");s2&&comps[s2]&&setComp(s2)}catch{}},[comps]);
 R.useEffect(()=>{try{comp&&localStorage.setItem("tcfRtFinalComp",comp)}catch{}},[comp]);

 // ---- şablon + ayarlar: yarışmadan yükle, değişince (gecikmeli) yarışmaya kaydet ----
 const sbFb=t=>{const fb={};Object.entries(t||{}).forEach(([k2,v])=>{v!==""&&v!=null&&!isNaN(v)&&Number(v)!==Number(k2)&&(fb["r"+k2]=Number(v))});return Object.keys(fb).length?fb:null};
 const _yuk=R.useRef(!1),_zT=R.useRef(null),_yuklenen=R.useRef("");
 R.useEffect(()=>{if(!comp){setTmpl({});setSel({});setBirim({});return}if(!comps[comp]||_yuklenen.current===comp)return;_yuklenen.current=comp;_yuk.current=!0;
  let o={};const fb=comps[comp]?.finalCikisSablonu;
  if(fb&&typeof fb==="object")Object.entries(fb).forEach(([k2,v])=>{const n2=parseInt(String(k2).replace(/^r/,""));n2>0&&v!=null&&v!==""&&!isNaN(v)&&(o[n2]=Number(v))});
  else{try{o=JSON.parse(localStorage.getItem("tcfRtSablon_"+comp)||"{}")||{}}catch{o={}}}setTmpl(o);
  const A=comps[comp]?.finalAyar||{};setSel(A.sec&&typeof A.sec==="object"?A.sec:{});setBirim(A.birim&&typeof A.birim==="object"?A.birim:{});
  setLimit(A.limit!=null?A.limit:2);setUseAA(A.useAA!=null?!!A.useAA:!0);setFill(!!A.fill);setKayit(comps[comp]?.finalAyar?"kayitli":"")},[comp,!!comps[comp]]);
 R.useEffect(()=>{if(!comp||_yuklenen.current!==comp)return;if(_yuk.current){_yuk.current=!1;return}
  try{localStorage.setItem("tcfRtSablon_"+comp,JSON.stringify(tmpl))}catch{}setKayit("bekliyor");clearTimeout(_zT.current);const c2=comp;
  const A={limit:clamp(limit,0,8,0),useAA:!!useAA,fill:!!fill,sec:Object.keys(sel).length?sel:null,birim:Object.keys(birim).length?birim:null,ts:Date.now()};
  _zT.current=setTimeout(()=>{update(ref(db,BASE+"/"+c2),{finalCikisSablonu:sbFb(tmpl),finalAyar:A}).then(()=>setKayit("kaydedildi")).catch(()=>setKayit("hata"))},700)},[tmpl,sel,birim,limit,useAA,fill]);

 const C=comps[comp]||{},cats=C.kategoriler||{},spor=C.sporcular||{},pun=C.puanlar||{},INTLc=isIntl(C);
 const realCats=Object.keys(cats).filter(c=>!isFinal(c)).sort((a,b)=>String(cfg(a).group||"").localeCompare(String(cfg(b).group||""),"tr")||String(cats[a]?.name||a).localeCompare(String(cats[b]?.name||b),"tr"));
 const finalCats=Object.keys(cats).filter(isFinal);
 const catLabel=c=>cats[c]?.name||cfg(c).label||c;
 const aletsOf=c=>{const a=cats[c]?.aletler;if(Array.isArray(a)&&a.length)return a.map(x=>typeof x=="object"?x.id||x.value:x);if(a&&typeof a=="object")return Object.keys(a);return cfg(c).aletler||[]};
 const clubOf=m=>String(m?.okul||m?.kulup||m?.il||"").trim();
 const isGrp=c=>{const d=cfg(c);return d.grupMu===!0||d.tip==="takim"||d.athleteCount>1};
 const keyOf=z=>String(z||"").trim().replace(/[.#$[\]/]/g,"-").slice(0,60);
 // Grup kategorilerinde katılımcı = kulüp grubu; bireysel kategorilerde = sporcu
 const partOf=cat=>{const sp=spor[cat]||{};if(!isGrp(cat))return sp;
   const Tm=new Map;Object.entries(sp).forEach(([id,m])=>{if(!m)return;
     const ok=String(m.okul||m.kulup||"").trim(),gn=m.grupNo||1,ky=ok+"|"+gn;
     Tm.has(ky)||Tm.set(ky,{id:keyOf(cat+"::"+ok+"::"+gn),okul:ok,kulup:m.kulup||ok,il:m.il||"",ulke:m.ulke||"",gn,members:[]});
     const G=Tm.get(ky);G.members.push({...m,id}),G.il||(G.il=m.il||"")});
   const out={};return Tm.forEach(G=>{out[G.id]={ad:G.members.map(z=>[z.ad,z.soyad].filter(Boolean).join(" ")).filter(Boolean).join(", ")+(G.gn>1?` (${G.gn}. Grup)`:""),
     soyad:"",okul:G.okul,kulup:G.kulup,il:G.il,ulke:G.ulke,isTeam:!0,uyeSayisi:G.members.length,uyeler:G.members}}),out};
 const nameOf=(cat,id)=>{const m=partOf(cat)[id]||{};return[m.ad,m.soyad].filter(Boolean).join(" ")||m.adSoyad||id};

 const key=(cat,alet)=>cat+"|"+alet;
 const bOf=(cat,alet)=>{const b={...DEF,...(birim[key(cat,alet)]||{})};return{n:clamp(b.n,1,12,8),y:clamp(b.y,0,4,2),sira:["ters","duz","sablon","elle"].includes(b.sira)?b.sira:"sablon",m:b.m&&typeof b.m==="object"?b.m:{}}};
 const bSet=(cat,alet,f,v)=>setBirim(o=>({...o,[key(cat,alet)]:{...bOf(cat,alet),...(o[key(cat,alet)]||{}),[f]:v}}));

 // Bir final için sıralama + kulüp kotası (ilk n + y yedek)
 const rank=(cat,alet)=>{
  const P=partOf(cat),b=bOf(cat,alet),TAKE=b.n+b.y;
  const rows=Object.entries(pun[cat]||{}).map(([id,sc])=>{
    const s=alet===AA?(Object.values(sc||{}).some(v=>v&&typeof v==="object"&&v.irm)?null:num(sc?.sonuc)):(sc?.[alet]?.irm?null:num(sc?.[alet]?.sonuc));
    return{id,score:s,club:clubOf(P[id]),qk:INTLc?String(P[id]?.ulke||"").trim()||clubOf(P[id]):clubOf(P[id])}}).filter(r=>r.score!=null)
   .sort((a,b)=>b.score-a.score);
  const cap=Math.max(0,parseInt(limit)||0),used={},pick=[],over=[];
  rows.forEach(r=>{const k=r.qk||"—";
    if(cap>0&&(used[k]||0)>=cap&&pick.length<TAKE){over.push(r);return}
    if(pick.length<TAKE){used[k]=(used[k]||0)+1;pick.push(r)}});
  if(fill)over.forEach(r=>{if(pick.length<TAKE)pick.push({...r,quotaFill:!0})});
  return{list:pick,excluded:over.filter(r=>!pick.includes(r)),b};
 };
 const tmplCs=r=>{const v=tmpl[r];return v!=null&&v!==""?Number(v):r};
 const csOf=(b,rk)=>{if(rk>b.n)return rk;if(b.sira==="elle"){const v=Number(b.m?.["q"+rk]);return v>=1&&v<=b.n?v:b.n-rk+1}if(b.sira==="ters")return b.n-rk+1;if(b.sira==="duz")return rk;const v=tmplCs(rk);return v>=1&&v<=b.n?v:rk};
 const usedVals=Array.from({length:TOP},(_,i)=>tmplCs(i+1));
 const dupWarn=new Set(usedVals).size!==usedVals.length;
 // plan: çıkış sırasına dizili satırlar
 const plan=(cat,alet)=>{const{list,excluded,b}=rank(cat,alet);const rows=list.map((row,ix)=>({row,rank:ix+1,cs:csOf(b,ix+1),reserve:ix+1>b.n,yed:ix+1>b.n?"R"+(ix+1-b.n):null}))
   .sort((x,y)=>(x.reserve?1e3+x.rank:x.cs)-(y.reserve?1e3+y.rank:y.cs));const csl=rows.filter(x=>!x.reserve).map(x=>x.cs);return{rows,excluded,b,dup:new Set(csl).size!==csl.length}};

 const isSel=(cat,alet)=>sel[key(cat,alet)]!==!1;
 const toggle=(cat,alet)=>setSel(o=>({...o,[key(cat,alet)]:!isSel(cat,alet)}));
 const units=[];realCats.forEach(c=>{if(useAA)units.push([c,AA]);aletsOf(c).forEach(a=>units.push([c,a]))});
 const selectedUnits=units.filter(([c,a])=>isSel(c,a)&&rank(c,a).list.length>0);
 const katTumu=(cat,on)=>setSel(o=>{const n={...o};[...(useAA?[AA]:[]),...aletsOf(cat)].forEach(a=>{n[key(cat,a)]=on});return n});
 const topluUygula=async kapsam=>{const hedef=kapsam?units.filter(([c])=>c===kapsam):units;
  if(!await window.__gxConfirm((kapsam?catLabel(kapsam):__T("Tüm finaller"))+": "+__T("finalist")+" "+toplu.n+" · "+__T("yedek")+" "+toplu.y+" · "+__T(SIRA.find(s=>s[0]===toplu.sira)[2])+"\n\n"+__T("Bu ayar seçili finallere uygulansın mı?")))return;
  setBirim(o=>{const n={...o};hedef.forEach(([c,a])=>{n[key(c,a)]={...(o[key(c,a)]||{}),n:toplu.n,y:toplu.y,sira:toplu.sira}});return n})};

 const generate=async()=>{
  if(busy||!comp)return;
  const dups=selectedUnits.filter(([c,a])=>plan(c,a).dup);
  if(dups.length&&!await window.__gxConfirm(__T("Şablonda aynı çıkış numarası tekrar ediyor:")+" "+dups.map(([c,a])=>catLabel(c)+" · "+(a===AA?__T("Genel Tasnif"):aletLabel(a))).join(", ")+"\n\n"+__T("Yine de oluşturulsun mu?")))return;
  const var_=selectedUnits.filter(([c,a])=>cats[a===AA?"final_"+c:"final_"+c+"__"+a]);
  if(var_.length&&!await window.__gxConfirm(var_.length+" "+__T("final zaten oluşturulmuş; yeniden oluşturulursa o finallerin puanları silinir. Devam edilsin mi?")))return;
  setBusy(!0);setLog(null);
  const upd={finalCikisSablonu:sbFb(tmpl)},summary=[];
  selectedUnits.forEach(([cat,alet])=>{
   const{rows,b}=plan(cat,alet);if(!rows.length)return;
   const fcat=alet===AA?"final_"+cat:"final_"+cat+"__"+alet,newSpor={},names=[];
   const P=partOf(cat);
   rows.forEach(it=>{const row=it.row,md=P[row.id]||{},ek={cikisSirasi:it.cs,_finalRank:it.rank,...(it.reserve?{_yedek:it.yed}:{})};
     if(md.isTeam)(md.uyeler||[]).forEach((mm,mi)=>{const{id:_mid,...rest}=mm;newSpor[_mid||row.id+"_"+(mi+1)]={...rest,...ek}});
     else newSpor[row.id]={...md,...ek};
     names.push({rank:it.rank,cs:it.cs,reserve:it.reserve,yed:it.yed,name:nameOf(cat,row.id),club:row.club,score:row.score,quotaFill:!!row.quotaFill})});
   upd["kategoriler/"+fcat]={name:"🏆 "+catLabel(cat)+" — "+(alet===AA?"Genel Tasnif Finali":aletTr(alet)+" Finali"),
     final:!0,baseCat:cat,alet:alet===AA?null:alet,aletler:alet===AA?aletsOf(cat):[alet],
     tip:cfg(cat).tip||"ferdi",grupMu:isGrp(cat)||null,athleteCount:cfg(cat).athleteCount||null,kulupKotasi:Math.max(0,parseInt(limit)||0)||null,
     finalistSayisi:b.n,yedekSayisi:b.y,finalSira:b.sira,olusturma:Date.now()};
   upd["sporcular/"+fcat]=newSpor;upd["puanlar/"+fcat]=null;
   // çıkış sırası siralama'ya da: puanlama ve çıkış listesi bu sırayı gösterir
   {const _ord=Object.entries(newSpor).sort((p,q)=>(p[1].cikisSirasi-q[1].cikisSirasi)||((p[1]._yedek?1:0)-(q[1]._yedek?1:0))||String(p[1].ad||"").localeCompare(String(q[1].ad||""),"tr")),_rot={};_ord.forEach(([mid,md],ix)=>{md.sirasi=ix+1;md.rotasyonGrubu=0;_rot[mid]={sirasi:ix+1,ad:md.ad||"",soyad:md.soyad||"",tckn:md.tckn||"",okul:md.okul||"",yarismaTuru:md.yarismaTuru||"ferdi",...(md.grupNo!=null?{grupNo:md.grupNo}:{}),...(md.ulke?{ulke:md.ulke}:{}),...(md.bib!=null&&md.bib!==""?{bib:md.bib}:{}),...(md.kulup?{kulup:md.kulup}:{}),...(alet!==AA?{_alet:alet}:{})}});upd["siralama/"+fcat]=_ord.length?{rotation_0:_rot}:null}
   summary.push({fcat,cat,alet,label:catLabel(cat),aletAd:alet===AA?__T("Genel Tasnif"):aletLabel(alet),names,b})});
  if(!summary.length){toast(__T("Seçili finallerde puanı girilmiş sporcu bulunamadı."),"warning");setBusy(!1);return}
  try{await update(ref(db,BASE+"/"+comp),upd);logAction("final_create",`[Ritmik] ${summary.length} final oluşturuldu: ${summary.map(x=>x.label+" — "+x.aletAd+" ("+x.b.n+"+"+x.b.y+", "+x.b.sira+")").join(", ")}`.slice(0,480),{user:_un,competitionId:comp,discipline:"ritmik",data:{kulupKotasi:Math.max(0,parseInt(limit)||0),kotaTamamla:fill,finaller:summary.map(x=>({kategori:x.fcat,ad:x.label+" — "+x.aletAd,finalist:x.b.n,yedek:x.b.y,sira:x.b.sira,sporcular:x.names.map(n=>({cikis:n.reserve?n.yed:n.cs,ad:n.name,kulup:n.club,eleme:n.rank,puan:n.score}))}))}});await reload();setLog(summary);
    toast(summary.length+" "+__T("final oluşturuldu ✓"),"success")}
  catch{toast(__T("Hata oluştu."),"error")}
  setBusy(!1)};

 const clearFinals=async()=>{
  if(busy||!comp)return;const upd={},keys=new Set();
  [Object.keys(cats),Object.keys(spor),Object.keys(pun)].forEach(a=>a.forEach(c=>{isFinal(c)&&keys.add(c)}));
  if(!keys.size){toast(__T("Silinecek final kategorisi yok."),"warning");return}
  if(!await window.__gxConfirm(keys.size+" "+__T("final kategorisi ve puanları silinsin mi?")))return;
  setBusy(!0);setLog(null);
  keys.forEach(fc=>{upd["kategoriler/"+fc]=null;upd["sporcular/"+fc]=null;upd["puanlar/"+fc]=null;upd["siralama/"+fc]=null});
  try{await update(ref(db,BASE+"/"+comp),upd);logAction("final_delete",`[Ritmik] ${keys.size} final kategorisi silindi`,{user:_un,competitionId:comp,discipline:"ritmik",data:{silinen:[...keys]}});await reload();toast(keys.size+" "+__T("final kategorisi silindi."),"success")}
  catch{toast(__T("Hata oluştu."),"error")}
  setBusy(!1)};

 // ---- PDF: final çıkış listesi ----
 // Oluşturulmuş finalde kayıtlı sıra, oluşturulmamışsa ekrandaki plan kullanılır.
 const pdfVeri=(cat,alet)=>{const fc=alet===AA?"final_"+cat:"final_"+cat+"__"+alet,fs=spor[fc];
  if(cats[fc]&&fs&&!isGrp(cat)){const rows=Object.entries(fs).filter(([,m])=>m&&typeof m==="object").map(([id,m])=>({no:m._yedek||String(m.cikisSirasi||""),yedek:!!m._yedek,rank:m._finalRank,ad:m.ad||"",soyad:m.soyad||"",kulup:m.kulup||m.okul||"",ulke:m.ulke||"",bib:m.bib,score:alet===AA?num(pun[cat]?.[id]?.sonuc):num(pun[cat]?.[id]?.[alet]?.sonuc),s:m.cikisSirasi||0}))
    .sort((a,b)=>(a.yedek?1e3+a.rank:a.s)-(b.yedek?1e3+b.rank:b.s));return{rows,olustu:!0}}
  const{rows}=plan(cat,alet),P=partOf(cat);
  return{rows:rows.map(it=>{const m=P[it.row.id]||{};return{no:it.reserve?it.yed:String(it.cs),yedek:it.reserve,rank:it.rank,ad:m.isTeam?m.ad:m.ad||"",soyad:m.isTeam?"":m.soyad||"",kulup:m.kulup||m.okul||it.row.club||"",ulke:m.ulke||"",bib:m.bib,score:it.row.score}}),olustu:!1}};
 const pdfAl=async()=>{if(pdfBusy||!comp)return;const U=units.filter(([c,a])=>isSel(c,a)&&pdfVeri(c,a).rows.length);if(!U.length){toast(__T("PDF için seçili ve sporcusu olan final yok."),"warning");return}
  setPdfBusy(!0);toast(__T("PDF hazırlanıyor…"),"info");
  try{const jsPDF=await import("./jspdf.es.min-gArCfqm1Cb2.js").then(z=>z.j?.jsPDF||z.E),atM=await import("./jspdf.plugin.autotable-KFqWVtFsCb2.js"),at=atM.default||atM,d=new jsPDF("portrait","mm","a4");
   let FT="helvetica";try{const{R:r0,B:b0}=await import("./fontTR-Fn01a2b3Cb2.js");d.addFileToVFS("Roboto.ttf",r0);d.addFont("Roboto.ttf","Roboto","normal");d.addFileToVFS("Roboto-Bold.ttf",b0);d.addFont("Roboto-Bold.ttf","Roboto","bold");FT="Roboto"}catch{}
   const INTL=isIntl(C),EN=INTL&&C.ciktiDili!=="tr",L=(tr,en)=>EN?en:tr,UP=t=>String(t||"").toLocaleUpperCase(EN?"en":"tr-TR"),kA=t=>EN?katEN(String(t||"")):String(t||""),aA=a=>a===AA?L("Genel Tasnif","All-Around"):EN?raAd(a,!0)||aletTr(a):aletTr(a);
   const img=async u=>{try{const b=await(await fetch(u)).blob();const du=await new Promise(K=>{const O=new FileReader;O.onloadend=()=>K(O.result);O.readAsDataURL(b)});const im=new Image;await new Promise(r=>{im.onload=r;im.onerror=r;im.src=du});return im.naturalWidth?{d:du,r:im.naturalWidth/im.naturalHeight}:null}catch{return null}};
   const tcf=await img("/logo.png"),ev=C.etkinlikLogo?await img(C.etkinlikLogo):null,AP={};await Promise.all(["serbest","ip","cember","top","labut","kurdele"].map(async k=>{const x=await img("/brans/alet/"+k+".png");x&&(AP[k]=x)}));
   const FL=INTL?await bayraklarPng(U.flatMap(([c,a])=>pdfVeri(c,a).rows.map(r=>r.ulke))):{};
   const W=210,H=297,M=12,P1=[236,72,153],P2=[139,92,246],INK=[15,23,42],MUT=[100,116,139];
   const tarih=[C.baslangicTarihi,C.bitisTarihi].filter(Boolean).map(t=>{const m=/^(\d{4})-(\d{2})-(\d{2})/.exec(t);return m?m[3]+"."+m[2]+"."+m[1]:t}).join(" – ");
   let y=0,sayfa=0;
   const serit=(yy,h)=>{const n=60;for(let i=0;i<n;i++){const t=i/(n-1);d.setFillColor(P1[0]+(P2[0]-P1[0])*t,P1[1]+(P2[1]-P1[1])*t,P1[2]+(P2[2]-P1[2])*t);d.rect(i*W/n,yy,W/n+.3,h,"F")}};
   const ust=()=>{if(sayfa++)d.addPage();serit(0,3);let lx=M;const lh=16;
    if(tcf){const w=lh*tcf.r;d.addImage(tcf.d,"PNG",lx,8,w,lh,"tcf","FAST");lx+=w+4}
    if(ev){const w=Math.min(34,lh*ev.r);d.addImage(ev.d,"PNG",W-M-w,8,w,lh,"ev","FAST")}
    d.setTextColor(...INK);d.setFont(FT,"bold");d.setFontSize(12.5);d.text(UP(C.isim||""),lx,13.5,{maxWidth:W-lx-M-(ev?38:0)});
    d.setFont(FT,"normal");d.setFontSize(8.5);d.setTextColor(...MUT);d.text([tarih,C.il||C.sehir||""].filter(Boolean).join("  ·  "),lx,19);
    d.setFont(FT,"bold");d.setFontSize(10);d.setTextColor(...P1);d.text(L("FİNAL ÇIKIŞ LİSTESİ","FINALS START LIST"),lx,25);
    d.setDrawColor(226,232,240);d.setLineWidth(.3);d.line(M,30,W-M,30);y=36};
   const alt=()=>{const n=d.getNumberOfPages();for(let i=1;i<=n;i++){d.setPage(i);serit(H-1.6,1.6);d.setFont(FT,"normal");d.setFontSize(7);d.setTextColor(...MUT);
     d.text(L("Gymexa Score · Türkiye Cimnastik Federasyonu","Gymexa Score · Turkish Gymnastics Federation"),M,H-5);d.text(new Date().toLocaleString(EN?"en-GB":"tr-TR",{dateStyle:"short",timeStyle:"short"})+"   "+i+" / "+n,W-M,H-5,{align:"right"})}};
   ust();
   // 2026-10-08 yeni düzen: her final renk geçişli başlık bantlı bir kart; çıkış no rozeti, eleme sırasında ilk üç madalya rengi, yedekler ayrı bölüm
   const bant=(x,yy,w,h)=>{const n=40;for(let i=0;i<n;i++){const t=i/(n-1);d.setFillColor(P1[0]+(P2[0]-P1[0])*t,P1[1]+(P2[1]-P1[1])*t,P1[2]+(P2[2]-P1[2])*t);d.rect(x+i*w/n,yy,w/n+.25,h,"F")}};
   const kural=b=>({ters:L("çıkış sırası elemenin tersi — eleme sonuncusu ilk çıkar","start order reversed — last qualifier starts first"),duz:L("çıkış sırası eleme sırasıyla aynı","start order equals qualification order"),sablon:L("çıkış sırası yarışma şablonuna göre","start order from competition template"),elle:L("çıkış sırası elle belirlendi","start order set manually")})[b.sira]||"";
   const MED=[[202,138,4],[100,116,139],[194,65,12]];
   const katlar=[...new Set(U.map(([c])=>c))];
   katlar.forEach((cat,ki)=>{const us=U.filter(([c])=>c===cat);
    if(y>H-70)ust();
    // kategori başlığı
    d.setFillColor(...INK);d.roundedRect(M,y,W-2*M,10,2.5,2.5,"F");d.setFont(FT,"bold");d.setFontSize(11);d.setTextColor(255,255,255);d.text(UP(kA(catLabel(cat))),M+5,y+6.8);
    d.setFont(FT,"normal");d.setFontSize(7.6);d.setTextColor(203,213,225);d.text(us.length+" "+L("final","finals"),W-M-4,y+6.6,{align:"right"});y+=14;
    us.forEach(([c,a])=>{const{rows,olustu}=pdfVeri(c,a),b=bOf(c,a),fin=rows.filter(r=>!r.yedek),yed=rows.filter(r=>r.yedek),need=24+fin.length*7.2+(yed.length?10+yed.length*6.6:0);
     if(y+need>H-14&&need<H-60)ust();else if(y+40>H-14)ust();
     // başlık bandı
     bant(M,y,W-2*M,11);const ik=a!==AA&&AP[raKey(a)||a];let x=M+4;
     if(ik){d.setFillColor(255,255,255);d.circle(x+3.6,y+5.5,4,"F");d.addImage(ik.d,"PNG",x+.6,y+2.5,6,6,"ap_"+a,"FAST");x+=10}
     else{d.setFillColor(255,255,255);d.circle(x+3.6,y+5.5,4,"F");d.setFont(FT,"bold");d.setFontSize(7.5);d.setTextColor(...P2);d.text("AA",x+3.6,y+6.8,{align:"center"});x+=10}
     d.setFont(FT,"bold");d.setFontSize(10.5);d.setTextColor(255,255,255);d.text(UP(aA(a))+" "+L("FİNALİ","FINAL"),x,y+7.2);
     d.setFont(FT,"normal");d.setFontSize(7.8);d.text(fin.length+" "+L("finalist","finalists")+(yed.length?"  ·  "+yed.length+" "+L("yedek","reserves"):""),W-M-4,y+7,{align:"right"});y+=11;
     // bilgi satırı
     d.setFillColor(248,250,252);d.rect(M,y,W-2*M,6.5,"F");d.setFont(FT,"normal");d.setFontSize(7.2);d.setTextColor(...MUT);d.text(kural(b),M+4,y+4.4);
     if(!olustu){const t=L("ÖNİZLEME — final henüz oluşturulmadı","PREVIEW — final not created yet");d.setFont(FT,"bold");d.setFontSize(6.8);const w=d.getTextWidth(t)+5;d.setFillColor(254,243,199);d.roundedRect(W-M-w-2,y+1,w,4.6,1.2,1.2,"F");d.setTextColor(180,83,9);d.text(t,W-M-2-w/2,y+4.3,{align:"center"})}
     y+=8.5;
     const HB=rows.some(r=>r.bib!=null&&r.bib!=="");
     const kolon=[L("ÇIKIŞ","START"),L("SPORCU","GYMNAST"),INTL?L("ÜLKE","NOC"):L("KULÜP","CLUB"),...(INTL?[L("TAKIM","TEAM")]:[]),...(HB?["BIB"]:[]),L("ELEME SIRASI","QUAL. RANK"),L("ELEME PUANI","QUAL. SCORE")];
     const ulkeCol=2,qr=kolon.length-2,qs=kolon.length-1;
     const ciz=(L0,yedekMi)=>{at(d,{startY:y,margin:{left:M,right:M,top:18,bottom:12},head:[kolon],body:L0.map(r=>[yedekMi?r.no:String(r.no),[UP(r.soyad),r.ad].filter(Boolean).join(" "),INTL?(r.ulke||""):UP(r.kulup),...(INTL?[r.kulup||""]:[]),...(HB?[r.bib!=null?String(r.bib):""]:[]),r.rank?String(r.rank)+".":"",f3(r.score)]),theme:"plain",
       styles:{font:FT,fontSize:8.6,cellPadding:{top:2,bottom:2,left:2,right:2},textColor:INK,lineColor:[238,240,244],lineWidth:{bottom:.25},valign:"middle",minCellHeight:7},
       headStyles:{fontStyle:"bold",fontSize:6.8,textColor:MUT,fillColor:[255,255,255],lineWidth:{bottom:.4},lineColor:[226,232,240],minCellHeight:5},
       columnStyles:{0:{cellWidth:15,halign:"center",fontStyle:"bold"},1:{fontStyle:"bold"},[ulkeCol]:INTL?{cellWidth:22,cellPadding:{top:2,bottom:2,left:8.5,right:1}}:{cellWidth:56},[qr]:{cellWidth:22,halign:"center"},[qs]:{cellWidth:24,halign:"right",fontStyle:"bold"}},
       didParseCell:z=>{if(z.section!=="body")return;const r=L0[z.row.index];if(yedekMi){z.cell.styles.textColor=[107,33,168];z.cell.styles.fillColor=[250,245,255]}else if(z.row.index%2)z.cell.styles.fillColor=[250,250,253];
        if(z.column.index===0)z.cell.text=[""];if(z.column.index===qr&&r&&r.rank>=1&&r.rank<=3&&!yedekMi){z.cell.styles.textColor=MED[r.rank-1];z.cell.styles.fontStyle="bold"}},
       didDrawCell:z=>{if(z.section!=="body")return;const r=L0[z.row.index];if(!r)return;
        if(z.column.index===0){const cx=z.cell.x+z.cell.width/2,cy=z.cell.y+z.cell.height/2;if(yedekMi){d.setDrawColor(168,85,247);d.setLineWidth(.35);d.roundedRect(cx-4.2,cy-2.6,8.4,5.2,1.4,1.4,"S");d.setTextColor(126,34,206)}else{d.setFillColor(...P1);d.circle(cx,cy,2.9,"F");d.setTextColor(255,255,255)}d.setFont(FT,"bold");d.setFontSize(7.6);d.text(String(r.no),cx,cy+1.05,{align:"center"})}
        if(INTL&&z.column.index===ulkeCol){const f0=FL[r.ulke];if(f0)try{d.addImage(f0,"PNG",z.cell.x+2,z.cell.y+(z.cell.height-3.4)/2,4.5,3.4,"fl_"+r.ulke,"FAST")}catch{}}}});y=d.lastAutoTable.finalY};
     ciz(fin,!1);
     if(yed.length){y+=2.5;d.setFont(FT,"bold");d.setFontSize(7.4);d.setTextColor(126,34,206);d.text(L("YEDEKLER","RESERVES"),M+2,y+3);y+=4.5;ciz(yed,!0)}
     y+=9});
    y+=2});
   alt();
   const ad=(C.isim||"final").replace(/[^\wçğıöşüÇĞİÖŞÜ -]+/g,"").trim().replace(/\s+/g,"_");d.save(ad+"_"+L("Final_Cikis_Listesi","Finals_Start_List")+".pdf");toast(__T("PDF indirildi ✓"),"success")}
  catch(er){console.error(er);toast(__T("PDF oluşturulamadı: ")+(er?.message||er),"error")}setPdfBusy(!1)};

 // ---- görünüm ----
 const P1="#EC4899",P2="#8B5CF6",G="linear-gradient(135deg,"+P1+","+P2+")",SH="0 1px 2px rgba(15,23,42,.05),0 8px 24px -16px rgba(15,23,42,.22)";
 const S={wrap:{minHeight:"100vh",background:"#F6F7FB",color:"#0F172A",fontFamily:"Nunito,system-ui,-apple-system,sans-serif",paddingBottom:"7rem"},
  top:{position:"sticky",top:0,zIndex:10,background:"linear-gradient(90deg,"+P1+","+P2+") bottom/100% 3px no-repeat,#fff",boxShadow:"0 1px 2px rgba(15,23,42,.05)",padding:"0 1.25rem",minHeight:68,display:"flex",alignItems:"center",gap:".9rem",flexWrap:"wrap"},
  back:{width:38,height:38,borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",color:"#0F172A",textDecoration:"none",flexShrink:0,border:"1px solid #E2E8F0",background:"#fff"},
  ico:{width:44,height:44,borderRadius:14,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,background:G,boxShadow:"0 8px 20px -6px rgba(236,72,153,.55)"},
  in:{maxWidth:1180,margin:"0 auto",padding:"1.1rem 1.25rem"},
  card:{background:"#fff",border:"none",borderRadius:18,padding:"1rem 1.1rem",marginBottom:".9rem",boxShadow:SH},
  sel:{width:"100%",padding:".7rem .85rem",borderRadius:12,border:"1px solid #E2E8F0",background:"#fff",color:"#0F172A",fontWeight:800,fontSize:".95rem",fontFamily:"inherit"},
  h:{display:"flex",alignItems:"center",gap:".55rem",fontWeight:900,fontSize:".95rem",marginBottom:".7rem"},
  hi:{width:30,height:30,borderRadius:10,display:"grid",placeItems:"center",color:"#fff",background:G,flexShrink:0},
  badge:{fontSize:".66rem",fontWeight:900,padding:".18rem .5rem",borderRadius:999,letterSpacing:".02em",whiteSpace:"nowrap"},
  yed:{fontSize:".72rem",fontWeight:900,padding:".2rem .45rem",borderRadius:8,color:"#7E22CE",border:"1px dashed #D8B4FE",background:"#FAF5FF",minWidth:34,textAlign:"center"},
  csb:{fontSize:".82rem",fontWeight:900,padding:".2rem .45rem",borderRadius:8,background:G,color:"#fff",minWidth:30,textAlign:"center"},
  numin:{width:54,textAlign:"center",background:"#fff",border:"1.5px solid #F9A8D4",borderRadius:10,color:"#0F172A",padding:".35rem",fontWeight:900,font:"inherit",fontSize:".95rem"},
  ghost:{padding:".5rem .8rem",border:"1px solid #E2E8F0",borderRadius:11,fontWeight:800,fontSize:".8rem",cursor:"pointer",color:"#334155",background:"#fff",fontFamily:"inherit",display:"inline-flex",alignItems:"center",gap:".3rem"},
  btn:{padding:".8rem 1.15rem",border:"none",borderRadius:14,fontWeight:900,fontSize:".95rem",cursor:"pointer",color:"#fff",fontFamily:"inherit",display:"inline-flex",alignItems:"center",gap:".4rem"},
  tog:on=>({display:"flex",alignItems:"center",gap:".6rem",padding:".6rem .75rem",borderRadius:12,border:"1px solid "+(on?"#F9A8D4":"#E2E8F0"),background:on?"#FDF2F8":"#fff",cursor:"pointer",fontWeight:800,fontSize:".85rem"}),
  center:{maxWidth:560,margin:"2rem auto 0",textAlign:"center",color:"#64748B",fontWeight:700,padding:"2rem 1rem"},
  seg:{display:"inline-flex",background:"#F1F5F9",borderRadius:10,padding:2,gap:2},
  segb:on=>({border:0,borderRadius:8,padding:".28rem .55rem",fontFamily:"inherit",fontWeight:900,fontSize:".74rem",cursor:"pointer",background:on?"#fff":"transparent",color:on?"#BE185D":"#64748B",boxShadow:on?"0 1px 3px rgba(15,23,42,.12)":"none",display:"inline-flex",alignItems:"center",gap:".2rem"}),
  step:{display:"inline-flex",alignItems:"center",border:"1px solid #E2E8F0",borderRadius:10,overflow:"hidden",background:"#fff"},
  stb:{width:26,height:28,border:0,background:"#F8FAFC",cursor:"pointer",fontWeight:900,color:"#475569",fontFamily:"inherit"}};
 const MI=(n,st)=>e.jsx("span",{className:"material-icons-round",style:{fontSize:18,...st},children:n});
 const AIc=(al,sz)=>{const im=al===AA?null:raImg(al);return im?e.jsx("img",{src:im,alt:"",style:{width:sz||34,height:sz||34,borderRadius:"50%",background:"#fff",boxShadow:"0 0 0 1.5px #FBCFE8",flexShrink:0,objectFit:"contain"}}):e.jsx("span",{style:{width:sz||34,height:sz||34,borderRadius:"50%",display:"grid",placeItems:"center",background:"#EEF2FF",color:"#4F46E5",flexShrink:0},children:MI(al===AA?"functions":"sports_gymnastics",{fontSize:18})})};
 const tmplOzet=Array.from({length:TOP},(_,i)=>i+1).filter(rk=>tmplCs(rk)!==rk).map(rk=>rk+"→"+tmplCs(rk)).join(" · ");
 const stepper=(v,set,a,b)=>e.jsxs("span",{style:S.step,children:[e.jsx("button",{type:"button",style:S.stb,onClick:()=>set(Math.max(a,v-1)),children:"−"}),e.jsx("b",{style:{minWidth:26,textAlign:"center",fontSize:".88rem"},children:v}),e.jsx("button",{type:"button",style:S.stb,onClick:()=>set(Math.min(b,v+1)),children:"+"})]});

 // Elle eşleme: eleme sırası (Q) → çıkış sırası; finalAyar.birim["kat|alet"].m {q1:3,q3:5,…} (sayısal anahtar dizi olmasın diye "q")
 const elleSet=(cat,alet,rk,v)=>setBirim(o=>{const k=key(cat,alet),b=bOf(cat,alet),m={...(o[k]?.m||{})};
   // eski numara başka sıradaysa yer değiştir
   const eski=csOf(b,rk),cak=Array.from({length:b.n},(_,i)=>i+1).find(q=>q!==rk&&csOf({...b,m},q)===v);
   m["q"+rk]=v;if(cak)m["q"+cak]=eski;return{...o,[k]:{...b,...(o[k]||{}),m}}});
 const elleDoldur=(cat,alet,tip)=>setBirim(o=>{const k=key(cat,alet),b=bOf(cat,alet),m={};for(let q=1;q<=b.n;q++)m["q"+q]=tip==="duz"?q:b.n-q+1;return{...o,[k]:{...b,...(o[k]||{}),m}}});
 const elleGrid=(cat,alet,b)=>e.jsxs("div",{style:{background:"#FDF2F8",border:"1px dashed #F9A8D4",borderRadius:12,padding:".5rem .6rem",display:"grid",gap:".4rem"},children:[
   e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:".4rem",flexWrap:"wrap",fontSize:".72rem",fontWeight:800,color:"#9D174D"},children:[MI("edit_note",{fontSize:15}),__T("Eleme sırası → çıkış sırası"),
     e.jsx("span",{style:{flex:1}}),
     e.jsx("button",{type:"button",style:{...S.ghost,padding:".15rem .45rem",fontSize:".7rem"},onClick:()=>elleDoldur(cat,alet,"ters"),children:__T("Ters ile doldur")}),
     e.jsx("button",{type:"button",style:{...S.ghost,padding:".15rem .45rem",fontSize:".7rem"},onClick:()=>elleDoldur(cat,alet,"duz"),children:__T("Düz ile doldur")})]}),
   e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(92px,1fr))",gap:".3rem"},children:Array.from({length:b.n},(_,i)=>i+1).map(q=>
     e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:".25rem",background:"#fff",border:"1px solid #FBCFE8",borderRadius:9,padding:".2rem .35rem",fontSize:".76rem",fontWeight:800},children:[
       e.jsx("span",{style:{color:"#64748B",minWidth:26},children:q+"."}),"→",
       e.jsx("select",{value:csOf(b,q),onChange:ev=>elleSet(cat,alet,q,Number(ev.target.value)),style:{flex:1,minWidth:0,border:"none",background:"transparent",fontWeight:900,color:"#BE185D",fontSize:".82rem",cursor:"pointer"},
         children:Array.from({length:b.n},(_,j)=>j+1).map(v=>e.jsx("option",{value:v,children:v+"."},v))})]},q))}),
   e.jsx("div",{style:{fontSize:".68rem",color:"#9D174D",fontWeight:600},children:__T("Ör. 1. → 3.: elemede birinci olan sporcu finalde 3. sırada çıkar. Seçim yarışmaya kaydedilir.")})]});
 const fotoTek=async(cat,id)=>{const[f]=await dosyaSec(!1);if(!f)return;setFotoBusy(id);
   try{await fotoKaydet(BASE,comp,id,f,nameOf(cat,id));toast(__T("Fotoğraf kaydedildi ✓"),"success")}catch(er){toast(__T("Fotoğraf yüklenemedi")+": "+(er?.message||""),"error")}finally{setFotoBusy("")}};
 const fotoKaldir=async(cat,id)=>{if(!await window.__gxConfirm(nameOf(cat,id)+"\n\n"+__T("Sporcunun fotoğrafı kaldırılsın mı?")))return;try{await fotoSil(BASE,comp,id)}catch{toast(__T("Hata oluştu."),"error")}};
 const fotoToplu=async()=>{const fs=await dosyaSec(!0);if(!fs.length)return;const hepsi=[];realCats.forEach(c=>{Object.entries(partOf(c)).forEach(([id,m])=>{m&&!m.isTeam&&!hepsi.some(h=>h.id===id)&&hepsi.push({id,ad:m.ad,soyad:m.soyad,bib:m.bib,cat:c})})});
   const es=eslestir(fs,hepsi),ok=es.filter(x=>x.sp),yok=es.filter(x=>!x.sp);
   if(!ok.length){await window.__gxConfirm(__T("Dosya adları hiçbir sporcuyla eşleşmedi. Dosya adı sporcunun adı soyadı (ör. Ana_KUK.jpg) ya da BIB numarası olmalı.")+"\n\n"+yok.map(x=>x.file.name).slice(0,12).join("\n"));return}
   if(!await window.__gxConfirm(ok.length+" "+__T("fotoğraf eşleşti")+(yok.length?" · "+yok.length+" "+__T("eşleşmedi"):"")+"\n\n"+ok.slice(0,14).map(x=>x.file.name+" → "+[x.sp.ad,x.sp.soyad].filter(Boolean).join(" ")).join("\n")+(ok.length>14?"\n…":"")+(yok.length?"\n\n"+__T("Eşleşmeyen")+": "+yok.map(x=>x.file.name).slice(0,8).join(", "):"")+"\n\n"+__T("Yüklensin mi?")))return;
   let n=0,h=0;for(const x of ok){setFotoBusy(__T("Fotoğraflar yükleniyor")+" "+(n+h+1)+"/"+ok.length);try{await fotoKaydet(BASE,comp,x.sp.id,x.file,[x.sp.ad,x.sp.soyad].filter(Boolean).join(" "));n++}catch{h++}}
   setFotoBusy("");toast(n+" "+__T("fotoğraf kaydedildi")+(h?" · "+h+" "+__T("hata"):""),h?"warning":"success")};
 const fotoAv=(cat,id)=>{const md=partOf(cat)[id]||{};if(md.isTeam)return null;const u=fotolar[id]?.url,bz=fotoBusy===id;
   return e.jsxs("span",{style:{position:"relative",flexShrink:0,display:"inline-flex"},children:[
     e.jsx("button",{type:"button",title:u?__T("Fotoğrafı değiştir"):__T("Fotoğraf ekle"),onClick:()=>fotoTek(cat,id),disabled:bz,style:{width:30,height:30,borderRadius:"50%",border:u?"2px solid #F9A8D4":"1.5px dashed #CBD5E1",padding:0,background:u?"#fff":"#F8FAFC",cursor:"pointer",overflow:"hidden",display:"grid",placeItems:"center",color:"#94A3B8"},
       children:bz?MI("hourglass_top",{fontSize:15}):u?e.jsx("img",{src:u,alt:"",style:{width:"100%",height:"100%",objectFit:"cover",objectPosition:"50% 20%"}}):MI("add_a_photo",{fontSize:15})}),
     u&&!bz?e.jsx("button",{type:"button",title:__T("Fotoğrafı kaldır"),onClick:()=>fotoKaldir(cat,id),style:{position:"absolute",top:-5,right:-6,width:15,height:15,borderRadius:"50%",border:"none",background:"#EF4444",color:"#fff",fontSize:10,lineHeight:"15px",padding:0,cursor:"pointer",fontWeight:900},children:"×"}):null]})};
 const unitCard=(cat,alet)=>{const{rows,excluded,b,dup}=plan(cat,alet),fc=alet===AA?"final_"+cat:"final_"+cat+"__"+alet,
   has=!!cats[fc],k=key(cat,alet),on=isSel(cat,alet),bos=!rows.length,op=acik[k]!==!1&&!bos,nc=rows.filter(x=>!x.reserve).length,nr=rows.length-nc;
  return e.jsxs("div",{style:{border:"1.5px solid "+(on&&!bos?"#F9A8D4":"#EEF0F4"),borderRadius:16,padding:".7rem .8rem",background:on&&!bos?"#FFFBFE":"#fff",opacity:bos?.6:1,display:"flex",flexDirection:"column",gap:".55rem",transition:"all .15s"},children:[
    e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:".6rem"},children:[
      e.jsx("input",{type:"checkbox",checked:on&&!bos,disabled:bos,onChange:()=>toggle(cat,alet),style:{width:18,height:18,accentColor:P1,cursor:"pointer"}}),
      AIc(alet,32),
      e.jsxs("div",{style:{flex:1,minWidth:0},children:[
        e.jsxs("div",{style:{fontWeight:900,display:"flex",alignItems:"center",gap:".35rem",flexWrap:"wrap"},children:[alet===AA?__T("Genel Tasnif Finali"):aletLabel(alet)+" "+__T("Finali"),
          has?e.jsx("span",{style:{...S.badge,background:"#DCFCE7",color:"#15803D"},children:"✓ "+__T("OLUŞTURULDU")}):null]}),
        e.jsx("div",{style:{color:"#64748B",fontSize:".76rem",fontWeight:700},children:bos?__T("puanı girilmiş sporcu yok"):nc+" "+(isGrp(cat)?__T("grup"):__T("sporcu"))+(nr?" + "+nr+" "+__T("yedek"):"")+(excluded.length?" · "+excluded.length+" "+(INTLc?__T("ülke kotasıyla elendi"):__T("kulüp kotasıyla elendi")):"")})]}),
      bos?null:e.jsx("button",{type:"button",onClick:()=>setAcik(x=>({...x,[k]:!op})),style:{...S.ghost,padding:".3rem .45rem"},children:MI(op?"expand_less":"expand_more")})]}),
    e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:".5rem",flexWrap:"wrap"},children:[
      e.jsxs("span",{style:{display:"inline-flex",alignItems:"center",gap:".3rem",fontSize:".72rem",fontWeight:800,color:"#64748B"},children:[__T("Finalist"),stepper(b.n,v=>bSet(cat,alet,"n",v),1,12)]}),
      e.jsxs("span",{style:{display:"inline-flex",alignItems:"center",gap:".3rem",fontSize:".72rem",fontWeight:800,color:"#64748B"},children:[__T("Yedek"),stepper(b.y,v=>bSet(cat,alet,"y",v),0,4)]}),
      e.jsx("span",{style:S.seg,children:SIRA.map(([v,ic,t,ds])=>e.jsxs("button",{type:"button",title:__T(ds),style:S.segb(b.sira===v),onClick:()=>bSet(cat,alet,"sira",v),children:[MI(ic,{fontSize:14}),__T(t)]},v))})]}),
    b.sira==="elle"?elleGrid(cat,alet,b):null,
    dup?e.jsx("div",{style:{fontSize:".74rem",color:"#DC2626",fontWeight:800},children:"⚠ "+__T(b.sira==="elle"?"Aynı çıkış numarası birden fazla sıraya verilmiş.":"Şablonda aynı çıkış numarası tekrar ediyor.")}):null,
    op?e.jsxs("div",{style:{borderTop:"1px solid #F1F5F9",paddingTop:".45rem",display:"grid",gap:".1rem"},children:[
      rows.map(it=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:".5rem",padding:".22rem 0",fontSize:".84rem"},children:[
        it.reserve?e.jsx("span",{style:S.yed,children:it.yed}):e.jsx("span",{style:S.csb,children:it.cs}),
        fotoAv(cat,it.row.id),
        e.jsxs("span",{style:{flex:1,minWidth:0,fontWeight:800,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:[nameOf(cat,it.row.id),
          it.row.club?e.jsxs("span",{style:{color:"#64748B",fontWeight:600,fontSize:".78rem"},children:[" · ",it.row.club]}):null,
          it.row.quotaFill?e.jsx("span",{style:{...S.badge,marginLeft:".35rem",background:"#FEF3C7",color:"#B45309"},children:__T("kota dışı")}):null]}),
        e.jsxs("span",{style:{color:"#64748B",fontSize:".74rem",fontWeight:700,whiteSpace:"nowrap"},children:["Q",it.rank," · ",f3(it.row.score)]})]},it.row.id)),
      excluded.length?e.jsxs("div",{style:{marginTop:".35rem",fontSize:".74rem",color:"#B45309",fontWeight:700},children:[INTLc?__T("Ülke kotası"):__T("Kulüp kotası")," (",limit,") ",__T("nedeniyle elenen"),": ",excluded.map(r=>nameOf(cat,r.id)).join(", ")]}):null]}):null]},k)};

 const kayitPill=kayit?e.jsxs("span",{style:{...S.badge,background:kayit==="hata"?"#FEE2E2":kayit==="bekliyor"?"#FEF3C7":"#DCFCE7",color:kayit==="hata"?"#B91C1C":kayit==="bekliyor"?"#B45309":"#15803D",display:"inline-flex",alignItems:"center",gap:".25rem",fontSize:".72rem"},children:[MI(kayit==="hata"?"error":kayit==="bekliyor"?"sync":"cloud_done",{fontSize:14}),kayit==="hata"?__T("Kaydedilemedi"):kayit==="bekliyor"?__T("Kaydediliyor…"):__T("Seçimler yarışmaya kaydedildi")]}):null;

 return e.jsxs("div",{style:S.wrap,children:[
  e.jsxs("div",{style:S.top,children:[e.jsx("a",{href:"/rhythmic",title:__T("Geri"),style:S.back,children:MI("arrow_back",{fontSize:20})}),
    e.jsx("div",{style:S.ico,children:MI("emoji_events",{color:"#fff",fontSize:22})}),
    e.jsxs("div",{style:{flex:1,minWidth:0},children:[e.jsx("div",{style:{fontWeight:900,fontSize:"1.1rem",lineHeight:1.15},children:__T("Final Oluştur")}),
      e.jsx("div",{style:{fontSize:".78rem",color:"#64748B",fontWeight:700},children:__T("Ritmik · elemeden alet ve genel tasnif finallerine")})]}),kayitPill]}),
  e.jsxs("div",{style:S.in,children:[
   loading?e.jsx("div",{style:S.center,children:__T("Yükleniyor…")}):e.jsxs(e.Fragment,{children:[
    e.jsxs("div",{style:S.card,children:[e.jsxs("div",{style:S.h,children:[e.jsx("span",{style:S.hi,children:MI("event",{fontSize:17})}),__T("Yarışma")]}),
     e.jsxs("select",{style:S.sel,value:comp,onChange:x=>{setComp(x.target.value);setLog(null);setAcik({})},children:[
      e.jsx("option",{value:"",children:__T("— Yarışma seçin —")}),
      Object.entries(comps).map(([id,c])=>e.jsx("option",{value:id,children:c.isim||c.ad||id},id))]}),
     e.jsx("div",{style:{fontSize:".78rem",color:"#64748B",fontWeight:700,marginTop:".6rem",lineHeight:1.5},children:__T("Her final kendi finalist ve yedek sayısıyla, kendi çıkış sırası kuralıyla oluşturulur. Seçimler ve ayarlar bu yarışmaya kaydedilir; sayfayı yeniden açtığınızda aynen gelir.")}),
     comp?e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:".6rem",flexWrap:"wrap",marginTop:".7rem",padding:".55rem .7rem",borderRadius:12,background:"#FDF2F8",border:"1px solid #FBCFE8"},children:[
       e.jsx("span",{style:{width:30,height:30,borderRadius:9,display:"grid",placeItems:"center",background:"linear-gradient(135deg,#EC4899,#7C3AED)",color:"#fff",flexShrink:0},children:MI("photo_camera",{fontSize:17})}),
       e.jsxs("div",{style:{flex:1,minWidth:200},children:[e.jsx("div",{style:{fontWeight:900,fontSize:".86rem"},children:__T("Sporcu fotoğrafları")+" · "+Object.keys(fotolar).length}),
         e.jsx("div",{style:{fontSize:".72rem",color:"#9D174D",fontWeight:600},children:__T("Sporcu kartında ve canlı skor flaş kartında gösterilir; fotoğrafı olmayan sporcuda kart eski düzende kalır. Tek tek eklemek için finalist satırındaki yuvarlak düğmeyi kullanın; toplu yüklemede dosya adı sporcunun adı soyadı ya da BIB numarası olmalı.")})]}),
       fotoBusy&&fotoBusy.length>20?e.jsx("span",{style:{fontSize:".74rem",fontWeight:800,color:"#BE185D"},children:fotoBusy}):null,
       e.jsxs("button",{type:"button",onClick:fotoToplu,disabled:!!fotoBusy,style:{...S.ghost,display:"inline-flex",alignItems:"center",gap:".3rem",fontWeight:800},children:[MI("upload",{fontSize:16}),__T("Toplu fotoğraf yükle")]})]}):null]}),
    comp?e.jsxs(e.Fragment,{children:[
      realCats.length===0?e.jsx("div",{style:S.center,children:__T("Bu yarışmada kategori yok.")}):e.jsxs(e.Fragment,{children:[
        e.jsxs("div",{style:S.card,children:[e.jsxs("div",{style:S.h,children:[e.jsx("span",{style:S.hi,children:MI("tune",{fontSize:17})}),__T("Genel ayarlar")]}),
         e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:".6rem"},children:[
          e.jsxs("label",{style:{...S.tog(!0),cursor:"default"},children:[MI(INTLc?"flag":"groups",{color:P1}),e.jsxs("span",{style:{flex:1},children:[INTLc?__T("Ülke kotası"):__T("Kulüp kotası"),e.jsx("small",{style:{display:"block",color:"#94A3B8",fontWeight:700,fontSize:".72rem"},children:INTLc?__T("WG: ülke başına en çok 2 · 0 = kota yok"):__T("0 = kota yok")})]}),e.jsx("input",{type:"number",min:"0",max:"8",value:limit,onChange:x=>setLimit(x.target.value),style:S.numin})]}),
          e.jsxs("label",{style:S.tog(useAA),children:[e.jsx("input",{type:"checkbox",checked:useAA,onChange:()=>setUseAA(v=>!v),style:{width:18,height:18,accentColor:P1}}),e.jsxs("span",{children:[__T("Genel tasnif finali"),e.jsx("small",{style:{display:"block",color:"#94A3B8",fontWeight:700,fontSize:".72rem"},children:__T("tüm aletler toplamı")})]})]}),
          e.jsxs("label",{style:S.tog(fill),children:[e.jsx("input",{type:"checkbox",checked:fill,onChange:()=>setFill(v=>!v),style:{width:18,height:18,accentColor:"#F59E0B"}}),e.jsxs("span",{children:[__T("Kota yetmezse tamamla"),e.jsx("small",{style:{display:"block",color:"#94A3B8",fontWeight:700,fontSize:".72rem"},children:__T("kotayı deler")})]})]})]}),
         e.jsxs("div",{style:{marginTop:".8rem",padding:".7rem .8rem",borderRadius:14,background:"#FAF5FF",border:"1px dashed #D8B4FE",display:"flex",alignItems:"center",gap:".6rem",flexWrap:"wrap"},children:[
          e.jsx("b",{style:{fontSize:".82rem",color:"#6D28D9"},children:__T("Toplu ayar")}),
          e.jsxs("span",{style:{display:"inline-flex",alignItems:"center",gap:".3rem",fontSize:".74rem",fontWeight:800,color:"#64748B"},children:[__T("Finalist"),stepper(toplu.n,v=>setToplu(o=>({...o,n:v})),1,12)]}),
          e.jsxs("span",{style:{display:"inline-flex",alignItems:"center",gap:".3rem",fontSize:".74rem",fontWeight:800,color:"#64748B"},children:[__T("Yedek"),stepper(toplu.y,v=>setToplu(o=>({...o,y:v})),0,4)]}),
          e.jsx("span",{style:S.seg,children:SIRA.map(([v,ic,t])=>e.jsxs("button",{type:"button",style:S.segb(toplu.sira===v),onClick:()=>setToplu(o=>({...o,sira:v})),children:[MI(ic,{fontSize:14}),__T(t)]},v))}),
          e.jsx("span",{style:{flex:1}}),
          e.jsxs("button",{type:"button",style:S.ghost,onClick:()=>topluUygula(null),children:[MI("done_all",{fontSize:16}),__T("Tüm finallere uygula")]})]})]}),
        e.jsxs("div",{style:{...S.card,boxShadow:SH+",inset 0 0 0 1.5px #FBCFE8"},children:[
         e.jsxs("div",{style:{...S.h,marginBottom:texp?".7rem":0,cursor:"pointer"},onClick:()=>setTexp(x=>!x),children:[e.jsx("span",{style:S.hi,children:MI("format_list_numbered",{fontSize:17})}),
          e.jsxs("span",{style:{flex:1,minWidth:0},children:[__T("Final Çıkış Sırası Şablonu"),e.jsx("small",{style:{display:"block",color:"#64748B",fontWeight:700,fontSize:".76rem"},children:(tmplOzet?__T("Eleme → çıkış")+": "+tmplOzet:__T("1→1 … 8→8"))+" · "+__T("yalnız “Şablon” seçili finallerde kullanılır")})]}),
          MI(texp?"expand_less":"expand_more",{color:P1})]}),
         texp?e.jsxs(e.Fragment,{children:[
          e.jsxs("div",{style:{display:"flex",gap:".5rem",flexWrap:"wrap",marginBottom:".7rem"},children:[
            e.jsx("button",{type:"button",style:S.ghost,onClick:()=>setTmpl({}),children:__T("↧ Sıfırla (1→1 … 8→8)")}),
            e.jsx("button",{type:"button",style:S.ghost,onClick:()=>{const o={};for(let i=1;i<=TOP;i++)o[i]=TOP-i+1;setTmpl(o)},children:__T("↥ Ters (1→8 … 8→1)")})]}),
          e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(165px,1fr))",gap:".5rem"},children:
            Array.from({length:TOP},(_,i)=>i+1).map(rk=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:".5rem",background:"#FDF2F8",border:"1px solid #FBCFE8",borderRadius:12,padding:".45rem .6rem"},children:[
              e.jsxs("span",{style:{color:"#9D174D",fontSize:".82rem",fontWeight:900,whiteSpace:"nowrap"},children:[__T("Eleme")," ",rk,". →"]}),
              e.jsx("input",{type:"number",min:"1",max:String(TOP),value:tmpl[rk]??rk,onChange:ev=>setTmpl(o=>({...o,[rk]:ev.target.value===""?"":Math.max(1,Math.min(TOP,parseInt(ev.target.value)||1))})),style:S.numin}),
              e.jsx("span",{style:{color:"#64748B",fontSize:".72rem",fontWeight:800},children:__T("çıkış")})]},rk))}),
          dupWarn?e.jsx("div",{style:{fontSize:".78rem",color:"#DC2626",fontWeight:800,marginTop:".6rem"},children:__T("⚠ Aynı çıkış numarası birden fazla eleme sırasına verilmiş — kontrol edin.")}):null]}):null]}),
        realCats.map(cat=>{const al=[...(useAA?[AA]:[]),...aletsOf(cat)],secN=al.filter(a=>isSel(cat,a)).length;return e.jsxs("div",{style:S.card,children:[
          e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:".6rem",flexWrap:"wrap",marginBottom:".75rem"},children:[
            e.jsx("span",{style:{width:6,alignSelf:"stretch",borderRadius:4,background:G}}),
            e.jsxs("div",{style:{flex:1,minWidth:0},children:[e.jsx("div",{style:{fontWeight:900,fontSize:"1.05rem"},children:catLabel(cat)}),
              e.jsx("div",{style:{color:"#64748B",fontSize:".76rem",fontWeight:700},children:(isGrp(cat)?__T("Grup")+" · ":"")+secN+" / "+al.length+" "+__T("final seçili")})]}),
            e.jsx("button",{type:"button",style:{...S.ghost,padding:".35rem .6rem"},onClick:()=>katTumu(cat,secN<al.length),children:secN<al.length?__T("Tümünü seç"):__T("Hiçbiri")}),
            e.jsxs("button",{type:"button",style:{...S.ghost,padding:".35rem .6rem"},title:__T("Toplu ayarı bu kategoriye uygula"),onClick:()=>topluUygula(cat),children:[MI("done_all",{fontSize:15}),__T("Toplu ayar")]})]}),
          e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(330px,1fr))",gap:".6rem"},children:al.map(a=>unitCard(cat,a))})]},cat)})]}),
      log?e.jsxs("div",{style:{...S.card,boxShadow:SH+",inset 0 0 0 1.5px #86EFAC"},children:[
        e.jsxs("div",{style:{...S.h,color:"#15803D"},children:[e.jsx("span",{style:{...S.hi,background:"#16A34A"},children:MI("check",{fontSize:17})}),__T("Oluşturulan finaller"),e.jsx("span",{style:{flex:1}}),e.jsxs("button",{type:"button",style:S.ghost,onClick:pdfAl,children:[MI("picture_as_pdf",{fontSize:16,color:"#DC2626"}),__T("Final çıkış listesi PDF")]})]}),
        log.map(g=>e.jsxs("div",{style:{borderTop:"1px solid #F1F5F9",padding:".55rem 0"},children:[
          e.jsxs("div",{style:{fontWeight:900,marginBottom:".35rem",display:"flex",alignItems:"center",gap:".45rem"},children:[AIc(g.alet,22),g.label," — ",g.aletAd,e.jsx("span",{style:{...S.badge,background:"#F1F5F9",color:"#475569"},children:g.b.n+"+"+g.b.y+" · "+__T(SIRA.find(s=>s[0]===g.b.sira)[2])})]}),
          e.jsx("div",{style:{display:"grid",gap:".2rem"},children:[...g.names].sort((a,b)=>(a.reserve?1e3+a.rank:a.cs)-(b.reserve?1e3+b.rank:b.cs)).map(n=>
            e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:".5rem",fontSize:".84rem",fontWeight:700},children:[
              n.reserve?e.jsx("span",{style:S.yed,children:n.yed}):e.jsx("span",{style:S.csb,children:n.cs}),
              e.jsxs("span",{style:{flex:1,minWidth:0,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:[n.name,e.jsxs("span",{style:{color:"#64748B",fontWeight:600},children:[" (",__T("eleme")," ",n.rank,".)"]})]}),
              e.jsx("span",{style:{color:"#64748B",whiteSpace:"nowrap"},children:f3(n.score)})]},n.rank))})]},g.fcat))]}):null
    ]}):null]})]}),
  comp&&realCats.length?e.jsx("div",{style:{position:"fixed",left:0,right:0,bottom:0,zIndex:20,background:"rgba(255,255,255,.94)",backdropFilter:"blur(8px)",borderTop:"1px solid #EEF0F4",padding:".7rem clamp(1rem,8vw,140px)"},children:e.jsxs("div",{style:{maxWidth:1180,margin:"0 auto",display:"flex",gap:".6rem",alignItems:"center",flexWrap:"wrap"},children:[
    e.jsxs("span",{style:{fontSize:".82rem",fontWeight:800,color:"#64748B",flex:"1 1 160px"},children:[selectedUnits.length," ",__T("final seçili")]}),
    finalCats.length>0?e.jsxs("button",{type:"button",style:{...S.btn,fontSize:".85rem",padding:".65rem .95rem",background:"#fff",border:"1.5px solid #FCA5A5",color:"#DC2626"},disabled:busy,onClick:clearFinals,children:[MI("delete_outline",{fontSize:17}),__T("Finalleri Sil")," (",finalCats.length,")"]}):null,
    e.jsxs("button",{type:"button",style:{...S.btn,fontSize:".85rem",padding:".65rem .95rem",background:"#fff",border:"1.5px solid #E2E8F0",color:"#0F172A",opacity:pdfBusy||!selectedUnits.length?.55:1},disabled:pdfBusy||!selectedUnits.length,onClick:pdfAl,children:[MI("picture_as_pdf",{fontSize:18,color:"#DC2626"}),pdfBusy?__T("Hazırlanıyor…"):__T("Çıkış listesi PDF")]}),
    e.jsx("button",{type:"button",style:{...S.btn,background:G,boxShadow:"0 10px 22px -10px rgba(236,72,153,.7)",opacity:busy||!selectedUnits.length?.55:1},disabled:busy||selectedUnits.length===0,onClick:generate,children:busy?__T("İşleniyor…"):"🏆 "+__T("Seçili")+" "+selectedUnits.length+" "+__T("finali oluştur")})]})}):null]});
}
export{RitmikFinals as default};
