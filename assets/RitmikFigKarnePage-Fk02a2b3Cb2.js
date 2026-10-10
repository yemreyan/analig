import"./i18n-Tr01a2b3Cb2.js";import{b as usToast,a as usInit,j as e,d as db}from"./main-C2LpyYUGCb2.js";import{r as R}from"./vendor-react-Cxw6bqwhCb2.js";import{k as ref,o as onValue,v as set}from"./vendor-firebase-940mxgRVCb2.js";import{utils as XU,writeFile as XW}from"./vendor-xlsx-CNerDvZXCb2.js";import{R as RC,a as RA}from"./ritmikCriteriaDefaults-CgOlnfQcCb2.js";import"./modulepreload-polyfill-B5Qt9EMXCb2.js";

// ============================================================================
// RİTMİK — FIG HAKEM DEĞERLENDİRME KARNESİ
// Dayanak (FIG 2025–2028):
//  • RG Code of Points §3/§4: D = ortak DB + ortak DA (DB1/DB2, DA1/DA2 ayrı not verir — "hakem değerlendirmesi için");
//    A ve E: 4 hakemde en yüksek ve en düşük kesinti atılır, ortadaki 2'nin ortalaması (2–3 hakemde hepsinin ortalaması).
//  • Appendix to the CoP §3 (RG): Üst Jüri (Supervisor) kontrol notu ile karşılaştırma toleransları
//    DB/DA: 0.50 · A/E: referans kesinti 0.00–1.20 → 0.399, 1.20 üzeri → 0.699 · aynı paneldeki iki hakem arası > 2.00 → blok.
//  • RG Specific Judges' Rules 2025–28 (değerlendirme tabloları): A/E sapma → % (RGI/RGG, referans kesinti aralığına göre),
//    DB/DA toplam hata → % ; notlar: D ≥80 Excellent, 70 Very Good, 60 Good, 50 Pass · A/E ≥90, 80, 65, 50.
//  • JEP yarışma eşikleri FIG tarafından yayımlanmadığından burada uygulanmaz; tablolar ulusal karne için uyarlanmıştır.
// Referans: Üst Jüri kontrol notu (SJA / SJE / SJDA / SJDB); yoksa panel sonucu (ayrıca işaretlenir).
//  ritmik_yarismalar/<yarışma>/hakemKarnesi/atama/<POZ> = {ad, kulup}  (pozisyon → hakem adı)
//  Not değişiklikleri: puanlar/<kat>/<sp>/<alet>/duzeltmeler (başhakem / geri gönderme / hakem) → ekranda tablo, Excel sayfası, PDF son sayfa
// ============================================================================
const BASE="ritmik_yarismalar";
const r1=v=>Math.round(v*10+1e-9)/10,f2=v=>v==null||isNaN(v)?"—":Number(v).toFixed(2),f3=v=>v==null||isNaN(v)?"—":Number(v).toFixed(3),sg=v=>v==null||isNaN(v)?"—":(v>0?"+":v<0?"−":"±")+Math.abs(Number(v)).toFixed(2);
const num=v=>{if(v==null||v==="")return null;const n=parseFloat(v);return isNaN(n)?null:n};
const isFinal=c=>/^final_/.test(String(c||""));
const baseCat=c=>String(c||"").replace(/^final_/,"").split("__")[0];
const cfg=c=>RC[c]||RC[baseCat(c)]||{};
const isGrp=c=>{const d=cfg(c);return d.grupMu===!0||d.tip==="takim"||d.athleteCount>1||/_grup$/.test(baseCat(c))};
const alAd=a=>RA[a]?.label||{cember:"Çember",top:"Top",labut:"Labut",kurdele:"Kurdele",ip:"İp",serbest:"Serbest",grup_seri1:"1. Seri",grup_seri2:"2. Seri"}[a]||a;
const UP=s=>String(s??"").toLocaleUpperCase("tr-TR");
// --- FIG RG Specific Judges' Rules: değerlendirme tabloları ---
const AE_RGI=[[2.0,[100,95,90,80,70,60,50,40,20,0]],[3.5,[100,100,95,90,85,80,70,60,50,40,30,20,10,0]],[99,[100,100,100,100,95,90,80,70,60,50,40,30,20,10,0]]];
const AE_RGG=[[2.0,[100,100,95,90,80,70,60,50,40,20,0]],[3.5,[100,100,100,95,90,85,80,70,65,60,55,45,35,25,15,5,0]],[99,[100,100,100,100,95,90,80,75,70,65,60,50,40,30,20,10,0]]];
const D_STD=[[.2,100],[.4,95],[.6,90],[.8,85],[1,80],[1.2,75],[1.4,70],[1.6,65],[1.7,60],[1.9,55],[2,50],[2.2,45],[2.3,40],[2.5,35],[2.6,30],[2.8,25],[2.9,20],[3.1,15],[3.2,10],[3.4,5]];
const D_RGI_DA=[[.2,100],[.4,95],[.6,90],[.8,85],[.9,80],[1.1,75],[1.2,70],[1.4,65],[1.5,60],[1.7,55],[1.8,50],[2,45],[2.1,40],[2.3,35],[2.4,30],[2.6,25],[2.7,20],[2.9,15],[3,10],[3.2,5]];
const aePct=(ref,dev,grp)=>{const T=grp?AE_RGG:AE_RGI,row=(T.find(([m])=>r1(ref)<=m+1e-9)||T[T.length-1])[1],i=Math.round(Math.abs(dev)*10+1e-9);return i>=row.length?0:row[i]};
const dPct=(err,tab)=>{const x=r1(Math.abs(err));for(const[m,p]of tab)if(x<=m+1e-9)return p;return 0};
const GRADE=(p,comp)=>{const t=comp==="D"?[80,70,60,50]:[90,80,65,50],n=["Excellent","Very Good","Good","Pass","Fail"],i=t.findIndex(x=>p>=x-1e-9);return n[i<0?4:i]};
const GRENK={Excellent:["#15803D","#DCFCE7"],"Very Good":["#1D4ED8","#DBEAFE"],Good:["#0E7490","#CFFAFE"],Pass:["#B45309","#FEF3C7"],Fail:["#B91C1C","#FEE2E2"]};
const aeTol=ref=>ref<=1.2+1e-9?.399:.699;
// D pozisyonları: DA1/DA2/DB1/DB2 her zaman; DA/DB (tek not), DA3/DA4/DB3/DB4 yalnız verisi olan yarışmada görünür (Paneller › hakem ekranı yapısı)
const POZ_D_TEMEL=["DA1","DA2","DB1","DB2"];
const POZ=[["DA","DA","da","sjda","da"],["DA","DA1","da1","sjda","da"],["DA","DA2","da2","sjda","da"],["DA","DA3","da3","sjda","da"],["DA","DA4","da4","sjda","da"],["DB","DB","db","sjdb","db"],["DB","DB1","db1","sjdb","db"],["DB","DB2","db2","sjdb","db"],["DB","DB3","db3","sjdb","db"],["DB","DB4","db4","sjdb","db"],...[1,2,3,4].map(i=>["A","A"+i,"j"+i,"sja","aPanel"]),...[1,2,3,4].map(i=>["E","E"+i,"j"+i,"sje","ePanel"])];
const PANEL={DA:{ad:"Zorluk · Alet (DA)",renk:"#6366F1",tip:"D"},DB:{ad:"Zorluk · Beden (DB)",renk:"#7C3AED",tip:"D"},A:{ad:"Artistik (A)",renk:"#DB2777",tip:"AE"},E:{ad:"Uygulama (E)",renk:"#0891B2",tip:"AE"}};
const trimmed=a=>{const s=[...a].sort((x,y)=>x-y);if(s.length>=4){const o=s.slice(1,s.length-1);return o.reduce((p,q)=>p+q,0)/o.length}return s.reduce((p,q)=>p+q,0)/s.length};

function analiz({pun,spor,cats,secKat,refTip}){
 const rows=[],ozel={};
 Object.entries(pun||{}).forEach(([cat,aths])=>{if(secKat.size&&!secKat.has(cat))return;const grp=isGrp(cat);
  Object.entries(aths||{}).forEach(([aid,als])=>{Object.entries(als||{}).forEach(([al,sc])=>{if(!sc||typeof sc!=="object")return;if(!(sc.durum==="tamamlandi"||sc.sonuc!=null))return;
   const kim=(()=>{const a=spor[cat]?.[aid];if(a)return{ad:UP([a.ad,a.soyad].filter(Boolean).join(" ")||aid),kulup:String(a.okul||a.kulup||a.il||"").trim()};const p=String(aid).split("::");return{ad:UP(p.length>=3?p.slice(1,-1).join(" "):aid),kulup:p.length>=3?p.slice(1,-1).join("::"):""}})();
   const base={cat,katAd:String(cats[cat]?.name||cfg(cat).label||cat).replace(/^\s*\u{1F3C6}\s*/u,""),aid,ad:kim.ad,kulup:kim.kulup,al,alAd:alAd(al),grp};
   // A / E
   ["A","E"].forEach(P=>{const pn=sc[P==="A"?"aPanel":"ePanel"]||{},vals=[1,2,3,4].map(i=>num(pn["j"+i]));const var_=vals.filter(v=>v!=null);if(!var_.length)return;
    const fin=trimmed(var_),sj=num(sc[P==="A"?"sja":"sje"]),useSj=refTip==="sj"&&sj!=null,refv=useSj?sj:fin,mx=Math.max(...var_),mn=Math.min(...var_),blok=mx-mn>2+1e-9;
    const mnI=vals.findIndex(v=>v!=null&&v===mn);let mxI=-1;vals.forEach((v,k)=>{v!=null&&v===mx&&k!==mnI&&mxI<0&&(mxI=k)});
    (ozel[P]||(ozel[P]={n:0,mud:0,blok:0,sjYok:0})).n++;if(blok)ozel[P].blok++;if(sj==null)ozel[P].sjYok++;else if(Math.abs(sj-fin)>aeTol(sj)+1e-9)ozel[P].mud++;
    vals.forEach((v,i)=>{if(v==null)return;const dev=v-refv,tol=aeTol(refv);rows.push({...base,panel:P,poz:P+(i+1),val:v,ref:refv,refKaynak:useSj?"SJ":"Panel",fin,dev,tol,dis:Math.abs(dev)>tol+1e-9,pct:aePct(refv,dev,grp),atildi:var_.length>=4&&(i===mnI||i===mxI),blok})})});
   // DA / DB
   [["DA","da","sjda"],["DB","db","sjdb"]].forEach(([P,kc,ks])=>{const p=P.toLowerCase(),vs=[1,2,3,4].map(i=>[P+i,num(sc[p+i])]).filter(x=>x[1]!=null),tek=!vs.length&&sc.hakemZaman&&sc.hakemZaman[P]!=null&&num(sc[kc])!=null;if(!vs.length&&!tek)return;
    const L=tek?[[P,num(sc[kc])]]:vs,ort=num(sc[kc])??num(sc[P==="DA"?"daScore":"dbScore"]),sj=(v=>v===0?null:v)(num(sc[ks])),useSj=refTip==="sj"&&sj!=null,refv=useSj?sj:(ort??L.reduce((a,x)=>a+x[1]/L.length,0));
    (ozel[P]||(ozel[P]={n:0,mud:0,blok:0,sjYok:0})).n++;if(sj==null)ozel[P].sjYok++;else if(ort!=null&&Math.abs(sj-ort)>.5+1e-9)ozel[P].mud++;
    // tek not: hakemin notu kesin nottur; yalnız SJ referansı varsa değerlendirilir
    if(tek&&sj==null)return;const rf=tek?sj:refv,rk=tek||useSj?"SJ":"Ortak";
    L.forEach(([poz,v])=>{const dev=v-rf;rows.push({...base,panel:P,poz,val:v,ref:rf,refKaynak:rk,fin:ort,dev,tol:.5,dis:Math.abs(dev)>.5+1e-9,pct:dPct(dev,P==="DA"&&!grp?D_RGI_DA:D_STD),atildi:!1,blok:!1})})})})})});
 return{rows,ozel}}
const ozetle=(rs,comp)=>{const n=rs.length;if(!n)return null;const pct=rs.reduce((a,x)=>a+x.pct,0)/n,ort=rs.reduce((a,x)=>a+x.dev,0)/n,abs=rs.reduce((a,x)=>a+Math.abs(x.dev),0)/n,rms=Math.sqrt(rs.reduce((a,x)=>a+x.dev*x.dev,0)/n),mx=Math.max(...rs.map(x=>Math.abs(x.dev))),dis=rs.filter(x=>x.dis).length,at=rs.filter(x=>x.atildi).length;return{n,pct,grade:GRADE(pct,comp),ort,abs,rms,mx,dis,at}};

const C={bg:"#F0F2F5",card:"#fff",soft:"#F8FAFC",line:"#E5E7EB",ink:"#1A1D26",ink2:"#334155",muted:"#6B7280",sub:"#94A3B8",p:"#9333EA"};
const S={wrap:{minHeight:"100vh",background:C.bg,color:C.ink,fontFamily:"Nunito,system-ui,-apple-system,sans-serif",paddingBottom:"4rem"},
 top:{position:"sticky",top:0,zIndex:20,background:"#fff",borderBottom:"1px solid "+C.line,boxShadow:"0 1px 3px rgba(0,0,0,.06)"},
 topIn:{maxWidth:1320,margin:"0 auto",minHeight:68,padding:".5rem 1.25rem",display:"flex",alignItems:"center",gap:".9rem",flexWrap:"wrap"},
 back:{width:38,height:38,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",color:C.ink,textDecoration:"none",flexShrink:0},
 ico:{width:44,height:44,borderRadius:12,background:"linear-gradient(135deg,#9333EA,#DB2777)",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 6px 18px rgba(147,51,234,.32)",flexShrink:0},
 in:{maxWidth:1320,margin:"0 auto",padding:"1.1rem 1.25rem"},
 card:{background:C.card,border:"1px solid "+C.line,borderRadius:16,padding:"1rem 1.1rem",marginBottom:"1rem"},
 sel:{background:C.soft,border:"1px solid "+C.line,borderRadius:12,padding:".55rem .7rem",fontFamily:"inherit",fontSize:".88rem",fontWeight:700,color:C.ink,minWidth:0},
 inp:{background:C.soft,border:"1px solid "+C.line,borderRadius:10,padding:".5rem .65rem",fontFamily:"inherit",fontSize:".88rem",fontWeight:700,color:C.ink,outline:"none",minWidth:0,width:"100%"},
 ghost:{display:"inline-flex",alignItems:"center",gap:".35rem",border:"1px solid "+C.line,borderRadius:11,padding:".5rem .8rem",fontFamily:"inherit",fontWeight:800,fontSize:".82rem",cursor:"pointer",background:"#fff",color:C.ink2,whiteSpace:"nowrap"},
 btn:bg=>({display:"inline-flex",alignItems:"center",gap:".35rem",border:"none",borderRadius:11,padding:".58rem .9rem",fontFamily:"inherit",fontWeight:800,fontSize:".85rem",cursor:"pointer",background:bg,color:"#fff",whiteSpace:"nowrap"}),
 chip:(fg,bg)=>({fontSize:".68rem",fontWeight:900,padding:".18rem .5rem",borderRadius:999,color:fg,background:bg,whiteSpace:"nowrap",letterSpacing:".02em"}),
 th:{padding:".45rem .55rem",fontSize:".66rem",fontWeight:900,color:C.muted,textTransform:"uppercase",letterSpacing:".04em",textAlign:"right",whiteSpace:"nowrap"},
 td:{padding:".45rem .55rem",textAlign:"right",fontVariantNumeric:"tabular-nums",fontWeight:700,whiteSpace:"nowrap"},
 ov:{position:"fixed",inset:0,zIndex:80,background:"rgba(15,23,42,.5)",backdropFilter:"blur(3px)",display:"flex",alignItems:"center",justifyContent:"center",padding:"1rem"},
 modal:{background:"#fff",borderRadius:16,width:"100%",maxWidth:980,maxHeight:"92vh",overflow:"auto",padding:"1.2rem",boxShadow:"0 24px 60px rgba(15,23,42,.3)",color:C.ink}};
const MI=(n,st)=>e.jsx("span",{className:"material-icons-round",style:{fontSize:"1.1rem",...(st||{})},children:n});

function RitmikFigKarne(){usInit();const{toast}=usToast();
 const[comps,setComps]=R.useState({}),[comp,setComp]=R.useState(()=>{try{return new URLSearchParams(location.search).get("comp")||localStorage.getItem("tcfRtKarneComp")||""}catch{return""}});
 const[secKat,setSecKat]=R.useState(new Set),[refTip,setRefTip]=R.useState("sj"),[detay,setDetay]=R.useState(null),[atamaAc,setAtamaAc]=R.useState(!1),[atamaForm,setAtamaForm]=R.useState({}),[bilgi,setBilgi]=R.useState(!1),[finDahil,setFinDahil]=R.useState(!0),[gor,setGor]=R.useState(()=>{try{return localStorage.getItem("tcfRtKarneGor")||"panel"}catch{return"panel"}}),[hSec,setHSec]=R.useState("");
 R.useEffect(()=>onValue(ref(db,BASE),s=>setComps(s.val()||{})),[]);
 R.useEffect(()=>{try{comp&&localStorage.setItem("tcfRtKarneComp",comp)}catch{}setSecKat(new Set);setHSec("")},[comp]);
 const list=Object.entries(comps).filter(([id,c])=>c&&typeof c==="object"&&(c.isim||c.kategoriler)&&(!(c.arsivli===!0||c.arsivli==="true")||id===comp)).sort((a,b)=>String(b[1].baslangicTarihi||"").localeCompare(String(a[1].baslangicTarihi||"")));
 const Cp=comps[comp]||{},cats=Cp.kategoriler||{},pun=Cp.puanlar||{},spor=Cp.sporcular||{},atama=Cp.hakemKarnesi?.atama||{};
 const katAd=c=>String(cats[c]?.name||cfg(c).label||c).replace(/^\s*\u{1F3C6}\s*/u,"");
 // Hakem kimliği: Paneller › panelGruplari/<gid>/hakemAlet/<KOLTUK>/<kat>/<alet> (kategori/alet istisnası) → panelGruplari/<gid>/hakemler/<KOLTUK> (koltuğun varsayılan hakemi)
 //  → hakemler/<kat>/<alet>/<koltuk> (hakem ekranlarının okuduğu ad) → hakemKarnesi/atama/<KOLTUK> (karnede elle girilen, yalnız eksikler için)
 const HKEY={T:"zaman",L1:"cizgi1",L2:"cizgi2",BH:"bashakem"},kObj=v=>Array.isArray(v)?Object.fromEntries(v.map(x=>[x,!0])):v&&typeof v==="object"&&Object.keys(v).length?v:null;
 const PG=Object.values(Cp.panelGruplari||{}).filter(g=>g&&typeof g==="object");
 const hkBul=(cat,al,poz)=>{const cs=[cat,baseCat(cat)];
  for(const g of PG){const ks=kObj(g.kategoriler),c=cs.find(x=>!ks||ks[x]);if(!c)continue;const am=g.aletler&&g.aletler[c];if(am&&typeof am==="object"&&!am[al])continue;const o=g.hakemAlet?.[poz]?.[c]?.[al],h=o&&o.ad?o:g.hakemler?.[poz];if(h&&h.ad)return{ad:String(h.ad).trim(),ulke:h.ulke||h.il||"",brove:h.brove||"",refId:h.refId||"",grup:g.ad||""}}
  for(const c of cs){const x=Cp.hakemler?.[c]?.[al]?.[HKEY[poz]||String(poz).toLowerCase()];if(x&&(x.name||x.ad))return{ad:String(x.name||x.ad).trim(),ulke:x.ulke||"",brove:"",refId:x.refId||"",grup:""}}
  const m=atama[poz];return m&&m.ad?{ad:String(m.ad).trim(),ulke:m.kulup||"",brove:"",refId:"",grup:"",elle:!0}:null};
 const hKey=(h,poz)=>h?(h.refId||UP(h.ad).replace(/\s+/g," ")):"?"+poz;
 const puanliKat=Object.keys(pun).filter(c=>finDahil||!isFinal(c)).sort((a,b)=>(isFinal(a)-isFinal(b))||katAd(a).localeCompare(katAd(b),"tr"));
 const etkin=new Set(secKat.size?[...secKat]:puanliKat);
  // Not değişiklikleri (başhakem değiştirdi / hakeme geri gönderdi / hakem yeniden girdi): puanlar/<kat>/<sp>/<alet>/duzeltmeler
  const DZ_AL={serbest:"Serbest",ip:"İp",cember:"Çember",top:"Top",labut:"Labut",kurdele:"Kurdele",grup_seri1:"1. Seri",grup_seri2:"2. Seri"},DZ_TIP={bashakem:__T("Başhakem değiştirdi"),geri_gonder:__T("Hakeme geri gönderildi"),hakem:__T("Hakem değiştirdi")};
  const dzL=(()=>{const o=[];[...etkin].forEach(k=>{Object.entries(pun[k]||{}).forEach(([aid,ar])=>{if(!ar||typeof ar!=="object")return;const sp=(spor[k]||{})[aid],sAd=sp?[sp.ad,sp.soyad].filter(Boolean).join(" "):String(aid).includes("::")?String(aid).split("::").slice(1,-1).join(" "):aid;
   Object.entries(ar).forEach(([al,rec])=>{const dz=rec&&typeof rec==="object"&&rec.duzeltmeler;if(!dz||typeof dz!=="object")return;Object.values(dz).forEach(x=>{if(!x||typeof x!=="object")return;const H0=hkBul(k,al,x.alan),hk=H0?.ad||"";o.push({hk2:hKey(H0,x.alan),ts:+x.ts||0,kat:katAd(k),sporcu:sAd,ulke:sp?.ulke||"",alet:DZ_AL[al]||al,poz:x.alan||"",hakem:hk,eski:x.eski,yeni:x.yeni,tip:x.tip==="hakem"&&x.istek?__T("Hakem yeniden girdi (istek üzerine)"):DZ_TIP[x.tip]||x.tip,kim:x.kim||"",not:x.not||""})})})})});return o.sort((a,b)=>a.ts-b.ts)})();
  const dzF=v=>v==null||v===""?"—":(+v).toFixed(String(v).includes(".")&&String(v).split(".")[1].length>1?2:1),dzZ=t=>t?new Date(t).toLocaleString("tr-TR",{day:"2-digit",month:"2-digit",hour:"2-digit",minute:"2-digit"}):"";
 const{rows,ozel}=R.useMemo(()=>{const o=analiz({pun,spor,cats,secKat:etkin,refTip});o.rows.forEach(r=>{const h=hkBul(r.cat,r.al,r.poz);r.h=h;r.hk=hKey(h,r.poz);r.hAd=h?h.ad:"";r.sUlke=String(spor[r.cat]?.[r.aid]?.ulke||"")});return o},[comp,comps,secKat,refTip,finDahil]);
 const POZ2=POZ.filter(([P,poz])=>PANEL[P].tip!=="D"||rows.some(x=>x.poz===poz)||POZ_D_TEMEL.includes(poz)&&!rows.some(x=>x.poz===P));
 const POZS=POZ.map(x=>x[1]),pozP=p=>(POZ.find(x=>x[1]===p)||[])[0],PS=["DA","DB","A","E"];
 const rowsF=hSec?rows.filter(r=>r.hk===hSec):rows;
 const hakemL=(()=>{const m=new Map;rows.forEach(r=>{m.has(r.hk)||m.set(r.hk,{k:r.hk,ad:r.hAd,ulke:r.h?.ulke||"",poz:r.poz})});return[...m.values()].sort((a,b)=>(!a.ad-!b.ad)||String(a.ad||a.poz).localeCompare(String(b.ad||b.poz),"tr"))})();
 const hEt=x=>x?(x.ad?x.ad+(x.ulke?" ("+x.ulke+")":""):x.poz+" — "+__T("hakem atanmamış")):"";
 const tipOf=rs=>{const t=new Set(rs.map(r=>PANEL[r.panel].tip));return t.size===1?[...t][0]:null};
 const ozH=rs=>{const t=tipOf(rs),o=ozetle(rs,t==="D"?"D":"AE");if(o&&!t)o.grade="—";return o};
 const kOrd=c=>{const i=puanliKat.indexOf(c);return i<0?999:i},alOrd=a=>["serbest","ip","cember","top","labut","kurdele","grup_seri1","grup_seri2"].indexOf(a);
 // hakem bazında topla (bir hakem birden çok koltukta/kategoride oturabilir); ülke yanlılığı: kendi ülkesinin (ulusal yarışmada kulübünün) sporcularına sapma − diğerlerine sapma
 const hGrupla=(rs,isim)=>{const m=new Map;rs.forEach(r=>{m.has(r.hk)||m.set(r.hk,[]);m.get(r.hk).push(r)});
  return[...m.entries()].map(([k,l])=>{const h=l[0].h||{},o=ozH(l),poz=[...new Set(l.map(r=>r.poz))].sort((a,b)=>POZS.indexOf(a)-POZS.indexOf(b)),kats=[...new Set(l.map(r=>r.cat))].sort((a,b)=>kOrd(a)-kOrd(b));let bias=null;const hu=UP(h.ulke||"").trim();
   if(hu&&tipOf(l)){const au=r=>UP(r.sUlke||r.kulup).trim(),k1=l.filter(r=>au(r)===hu),d1=l.filter(r=>au(r)!==hu);if(k1.length&&d1.length)bias={n:k1.length,fark:k1.reduce((s,r)=>s+r.dev,0)/k1.length-d1.reduce((s,r)=>s+r.dev,0)/d1.length}}
   return{k,h:l[0].h,ad:h.ad||"",ulke:h.ulke||"",brove:h.brove||"",poz,kats,o,bias,rs:l}}).sort(isim?(a,b)=>(!a.ad-!b.ad)||String(a.ad).localeCompare(String(b.ad),"tr"):(a,b)=>POZS.indexOf(a.poz[0])-POZS.indexOf(b.poz[0])||String(a.ad).localeCompare(String(b.ad),"tr"))};
 // kırılım: kategori × alet × panel
 const kirilim=rs=>{const m=new Map;rs.forEach(r=>{const k=r.cat+"|"+r.al+"|"+r.panel;m.has(k)||m.set(k,[]);m.get(k).push(r)});return[...m.values()].map(l=>({cat:l[0].cat,katAd:l[0].katAd,al:l[0].al,alAd:l[0].alAd,P:l[0].panel,poz:[...new Set(l.map(r=>r.poz))].sort((a,b)=>POZS.indexOf(a)-POZS.indexOf(b)),o:ozH(l),rs:l})).sort((a,b)=>kOrd(a.cat)-kOrd(b.cat)||alOrd(a.al)-alOrd(b.al)||PS.indexOf(a.P)-PS.indexOf(b.P))};
 const GOR={hakem:__T("Hakem bazında"),panel:__T("Panel bazında"),kategori:__T("Kategori bazında"),pk:__T("Panel + kategori")};
 const katS=puanliKat.filter(c=>etkin.has(c)&&rowsF.some(r=>r.cat===c));
 const bolumler=(g0=>{const out=[];
  if(g0==="hakem")out.push({id:"h",t:__T("Tüm hakemler"),rs:rowsF,isim:!0});
  else if(g0==="panel")PS.forEach(P=>{const rs=rowsF.filter(r=>r.panel===P);rs.length&&out.push({id:P,t:PANEL[P].ad,P,rs})});
  else if(g0==="kategori")katS.forEach(c=>{const rs=rowsF.filter(r=>r.cat===c);rs.length&&out.push({id:c,t:katAd(c),rs,kat:c})});
  else katS.forEach(c=>PS.forEach(P=>{const rs=rowsF.filter(r=>r.cat===c&&r.panel===P);rs.length&&out.push({id:c+"|"+P,t:katAd(c)+" · "+PANEL[P].ad,P,rs,kat:c})}));
  return out.map(b=>({...b,hl:hGrupla(b.rs,b.isim)}))})(gor);
 const dzF2=hSec?dzL.filter(x=>x.hk2===hSec):dzL;
 const atanmamis=new Set(rows.filter(r=>!r.h).map(r=>r.poz)),elle=rows.some(r=>r.h&&r.h.elle);
 const rutinSay=new Set(rowsF.map(r=>r.cat+"|"+r.aid+"|"+r.al)).size,sjOran=rowsF.length?rowsF.filter(r=>r.refKaynak==="SJ").length/rowsF.length:0;
 const yonu=(P,v)=>PANEL[P].tip==="D"?(v>0?__T("yüksek veriyor"):__T("düşük veriyor")):(v>0?__T("sert (fazla kesinti)"):__T("yumuşak (az kesinti)"));

 // ---- dışa aktarım ----
 const hAdx=g=>g.ad||(g.poz.join(", ")+" — "+__T("hakem atanmamış"));
 const satirX=(g,ek)=>({...ek,Hakem:hAdx(g),"Ülke":g.ulke,"Brövet":g.brove,Koltuk:g.poz.join(", "),Rutin:g.o.n,"Başarı %":+g.o.pct.toFixed(1),Not:g.o.grade,"Ort. sapma":+g.o.ort.toFixed(3),"Ort. mutlak sapma":+g.o.abs.toFixed(3),RMS:+g.o.rms.toFixed(3),"En büyük sapma":+g.o.mx.toFixed(3),"Tolerans dışı":g.o.dis,"Atılan not":g.o.at,"Ülke yanlılığı":g.bias?+g.bias.fark.toFixed(3):""});
 const dosyaAd=ek=>String(Cp.isim||"ritmik").replace(/[^a-zA-Z0-9ğüşöçıİĞÜŞÖÇ ]+/g," ").trim().replace(/\s+/g,"_").slice(0,40).replace(/_+$/,"")+"_WG_Hakem_Karnesi"+(ek?"_"+ek:"");
 const filtreAd=()=>hSec?String(hakemL.find(x=>x.k===hSec)?.ad||hSec).replace(/[^\p{L}\p{N}]+/gu,"_"):"";
 const excel=()=>{const wb=XU.book_new(),ek=(ad,a)=>{a.length&&XU.book_append_sheet(wb,XU.json_to_sheet(a),ad)};
  ek("Hakem",hGrupla(rowsF,!0).map(g=>satirX(g,{Paneller:[...new Set(g.rs.map(r=>r.panel))].sort((a,b)=>PS.indexOf(a)-PS.indexOf(b)).join(", "),Kategoriler:g.kats.map(katAd).join(", ")})));
  ek("Hakem detay",hGrupla(rowsF,!0).flatMap(g=>kirilim(g.rs).map(x=>({Hakem:hAdx(g),"Ülke":g.ulke,Kategori:x.katAd,Alet:x.alAd,Panel:PANEL[x.P].ad,Koltuk:x.poz.join(", "),Rutin:x.o.n,"Başarı %":+x.o.pct.toFixed(1),Not:x.o.grade,"Ort. sapma":+x.o.ort.toFixed(3),"Ort. mutlak sapma":+x.o.abs.toFixed(3),"Tolerans dışı":x.o.dis}))));
  ek("Panel",PS.flatMap(P=>hGrupla(rowsF.filter(r=>r.panel===P)).map(g=>satirX(g,{Panel:PANEL[P].ad}))));
  ek("Kategori",katS.flatMap(c=>hGrupla(rowsF.filter(r=>r.cat===c)).map(g=>satirX(g,{Kategori:katAd(c)}))));
  ek("Panel-Kategori",katS.flatMap(c=>PS.flatMap(P=>hGrupla(rowsF.filter(r=>r.cat===c&&r.panel===P)).map(g=>satirX(g,{Kategori:katAd(c),Panel:PANEL[P].ad})))));
  ek("Rutinler",rowsF.map(r=>({Kategori:r.katAd,Sporcu:r.ad,"Ülke/Kulüp":r.sUlke||r.kulup,Alet:r.alAd,Panel:r.panel,Pozisyon:r.poz,Hakem:r.hAd||"—","Hakem ülkesi":r.h?.ulke||"",Not:+r.val.toFixed(2),Referans:+r.ref.toFixed(3),"Referans kaynağı":r.refKaynak,Sapma:+r.dev.toFixed(3),Tolerans:r.tol,"Tolerans dışı":r.dis?"EVET":"","Başarı %":r.pct,"Atılan not":r.atildi?"EVET":"","2.00 üzeri fark":r.blok?"EVET":""})));
  ek("Not değişiklikleri",dzF2.map(x=>({Zaman:dzZ(x.ts),Kategori:x.kat,Sporcu:x.sporcu,"Ülke":x.ulke,Alet:x.alet,"Poz.":x.poz,Hakem:x.hakem,Eski:x.eski??"",Yeni:x.yeni??"","İşlem":x.tip,Yapan:x.kim,Not:x.not})));
  XW(wb,dosyaAd(filtreAd())+".xlsx")};
 const pdf=async()=>{try{toast(__T("PDF hazırlanıyor…"),"info");const jsPDF=await import("./jspdf.es.min-gArCfqm1Cb2.js").then(z=>z.j?.jsPDF||z.E),atM=await import("./jspdf.plugin.autotable-KFqWVtFsCb2.js"),at=atM.default||atM,d=new jsPDF("landscape","mm","a4");
  let FT="helvetica";try{const{R:r0,B:b0}=await import("./fontTR-Fn01a2b3Cb2.js");d.addFileToVFS("Roboto.ttf",r0);d.addFont("Roboto.ttf","Roboto","normal");d.addFileToVFS("Roboto-Bold.ttf",b0);d.addFont("Roboto-Bold.ttf","Roboto","bold");FT="Roboto"}catch{}
  const W=297,H=210,M=12,INK=[30,27,75],MUT=[100,116,139],hx=h=>[1,3,5].map(i=>parseInt(h.slice(i,i+2),16)),hf=hSec?hakemL.find(x=>x.k===hSec):null;
  const ust=()=>{d.setFillColor(147,51,234);d.rect(0,0,W,3,"F")};
  ust();d.setFont(FT,"bold");d.setFontSize(15);d.setTextColor(...INK);d.text("WG HAKEM DEĞERLENDİRME KARNESİ — RİTMİK",M,14);
  d.setFont(FT,"normal");d.setFontSize(9);d.setTextColor(71,85,105);d.text(`${Cp.isim||""} · ${UP(GOR[gor])}${hf?" · "+hEt(hf):""} · ${secKat.size?[...secKat].map(katAd).join(", "):__T("tüm kategoriler")} · ${new Set(rowsF.map(r=>r.cat+"|"+r.aid+"|"+r.al)).size} rutin · referans: ${refTip==="sj"?"Üst Jüri kontrol notu (yoksa panel)":"panel sonucu"} · ${new Date().toLocaleDateString("tr-TR")}`,M,20,{maxWidth:W-2*M});
  let y=26;const yeni=()=>{d.addPage();ust();y=12};
  const baslik=(t,renk)=>{if(y>H-40)yeni();d.setFillColor(...hx(renk||"#9333EA"));d.roundedRect(M,y,W-2*M,7.5,1.6,1.6,"F");d.setFont(FT,"bold");d.setFontSize(10);d.setTextColor(255,255,255);d.text(t,M+3,y+5.2);y+=9.5};
  const gStil=z=>{if(z.section!=="body")return;const g=GRENK[z.cell.raw];if(g){z.cell.styles.textColor=hx(g[0]);z.cell.styles.fontStyle="bold"}};
  const tbl=(head,body,o)=>{at(d,{startY:y,margin:{left:M,right:M,top:12,bottom:12},head:[head],body,theme:"grid",styles:{font:FT,fontSize:7.8,cellPadding:1.5,lineColor:[226,232,240],lineWidth:.15,textColor:INK},headStyles:{fillColor:[71,85,105],textColor:255,fontStyle:"bold",fontSize:7.2},didParseCell:gStil,didDrawPage:()=>ust(),...(o||{})});y=d.lastAutoTable.finalY+6};
  const HD=["Hakem","Ülke","Koltuk","Kategoriler","Rutin","Başarı %","Not","Eğilim","Mutlak","RMS","En büyük","Tol. dışı","Atılan","Ülke yanlılığı"];
  const hS=g=>[hAdx(g),g.ulke||"",g.poz.join(", "),g.kats.map(katAd).join(", "),g.o.n,g.o.pct.toFixed(1),g.o.grade,sg(g.o.ort),f2(g.o.abs),f2(g.o.rms),f2(g.o.mx),g.o.dis+" (%"+Math.round(g.o.dis/g.o.n*100)+")",g.o.at||"—",g.bias?sg(g.bias.fark):"—"];
  bolumler.forEach(b=>{baslik(b.t+"  ·  "+new Set(b.rs.map(r=>r.cat+"|"+r.aid+"|"+r.al)).size+" rutin",b.P?PANEL[b.P].renk:"#9333EA");tbl(HD,b.hl.map(hS),{columnStyles:{0:{fontStyle:"bold",cellWidth:46},3:{cellWidth:44}}})});
  // hakem karneleri: her hakem için kategori × alet × panel kırılımı
  if(gor==="hakem"||hSec){hGrupla(rowsF,!0).forEach(g=>{yeni();d.setFont(FT,"bold");d.setFontSize(13);d.setTextColor(...INK);d.text(hAdx(g),M,y+4);d.setFont(FT,"normal");d.setFontSize(8.5);d.setTextColor(...MUT);
    d.text([g.ulke,g.brove,g.poz.join(", "),g.o.n+" rutin","%"+g.o.pct.toFixed(1)+" "+g.o.grade,"eğilim "+sg(g.o.ort),"tolerans dışı "+g.o.dis].filter(Boolean).join("  ·  "),M,y+10);y+=15;
    tbl(["Kategori","Alet","Panel","Koltuk","Rutin","Başarı %","Not","Eğilim","Mutlak","RMS","En büyük","Tol. dışı","Atılan"],kirilim(g.rs).map(x=>[x.katAd,x.alAd,PANEL[x.P].ad,x.poz.join(", "),x.o.n,x.o.pct.toFixed(1),x.o.grade,sg(x.o.ort),f2(x.o.abs),f2(x.o.rms),f2(x.o.mx),x.o.dis,x.o.at||"—"]));
    const dz=dzL.filter(x=>x.hk2===g.k);if(dz.length){d.setFont(FT,"bold");d.setFontSize(9);d.setTextColor(...INK);if(y>H-30)yeni();d.text("Not değişiklikleri ("+dz.length+")",M,y+2);y+=4;tbl(["Zaman","Kategori","Sporcu","Alet","Poz.","Eski","Yeni","İşlem","Yapan","Not"],dz.map(x=>[dzZ(x.ts),x.kat,x.sporcu+(x.ulke?" ("+x.ulke+")":""),x.alet,x.poz,dzF(x.eski),x.yeni==null?"—":dzF(x.yeni),x.tip,x.kim,x.not]))}})}
  if(y>H-24)yeni();d.setFont(FT,"normal");d.setFontSize(7.2);d.setTextColor(...MUT);d.text(d.splitTextToSize("Hakemler Paneller sayfasındaki kategori/alet atamalarından alınır. Kaynak: WG RG Code of Points 2025–2028 §3–4; Appendix to the CoP §3 (Üst Jüri toleransları: DA/DB 0.50, A/E 0.399 / 0.699, panel içi fark > 2.00); RG Specific Judges' Rules 2025–2028 değerlendirme tabloları ve not eşikleri (D: 80/70/60/50 · A/E: 90/80/65/50). Eğilim: D'de + yüksek not; A/E'de + fazla kesinti (sert). Ülke yanlılığı: hakemin kendi ülkesinin sporcularına sapması − diğerlerine sapması. JEP yarışma eşikleri WG tarafından yayımlanmamıştır.",W-2*M),M,y+2);
  if(dzF2.length&&gor!=="hakem"&&!hSec){yeni();d.setFont(FT,"bold");d.setFontSize(13);d.setTextColor(...INK);d.text("Not değişiklikleri",M,y+4);y+=8;
   tbl(["Zaman","Kategori","Sporcu","Alet","Poz.","Hakem","Eski","Yeni","İşlem","Yapan","Not"],dzF2.map(x=>[dzZ(x.ts),x.kat,x.sporcu+(x.ulke?" ("+x.ulke+")":""),x.alet,x.poz,x.hakem||"—",dzF(x.eski),x.yeni==null?"—":dzF(x.yeni),x.tip,x.kim,x.not]),{headStyles:{fillColor:[219,39,119],textColor:255,fontStyle:"bold",fontSize:7.2}})}
  const n=d.getNumberOfPages();for(let i=1;i<=n;i++){d.setPage(i);d.setFont(FT,"normal");d.setFontSize(7);d.setTextColor(...MUT);d.text("Gymexa Score · Türkiye Cimnastik Federasyonu",M,H-5);d.text(i+" / "+n,W-M,H-5,{align:"right"})}
  d.save(dosyaAd([{hakem:"Hakem",panel:"Panel",kategori:"Kategori",pk:"Panel_Kategori"}[gor],filtreAd()].filter(Boolean).join("_"))+".pdf");toast(__T("PDF indirildi."),"success")}catch(er){console.error(er);toast(__T("PDF oluşturulamadı: ")+(er?.message||er),"error")}};
 const atamaKaydet=async()=>{try{const out={};Object.entries(atamaForm).forEach(([k,v])=>{if(v&&(String(v.ad||"").trim()||String(v.kulup||"").trim()))out[k]={ad:String(v.ad||"").trim(),kulup:String(v.kulup||"").trim()}});await set(ref(db,`${BASE}/${comp}/hakemKarnesi/atama`),Object.keys(out).length?out:null);toast(__T("Hakem isimleri kaydedildi ✓"),"success");setAtamaAc(!1)}catch(er){toast(__T("Kaydedilemedi: ")+(er?.message||er),"error")}};

 const gChip=g=>{const c=GRENK[g]||[C.ink2,C.soft];return e.jsx("span",{style:S.chip(c[0],c[1]),children:g})};
 const pctBar=p=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:".45rem",justifyContent:"flex-end"},children:[e.jsx("div",{style:{width:70,height:7,borderRadius:99,background:"#EEF2F7",overflow:"hidden"},children:e.jsx("div",{style:{width:Math.max(0,Math.min(100,p))+"%",height:"100%",background:p>=80?"#16A34A":p>=65?"#0891B2":p>=50?"#D97706":"#DC2626"}})}),e.jsx("span",{style:{fontWeight:900,minWidth:38},children:p.toFixed(1)})]});
 const pozChip=p=>e.jsx("span",{style:{...S.chip("#fff",PANEL[pozP(p)]?.renk||C.sub),fontSize:".68rem",minWidth:30,textAlign:"center"},children:p},p);
 const bolumKart=b=>{const pn=b.P?PANEL[b.P]:null,renk=pn?pn.renk:C.p,oz=gor==="panel"&&b.P?ozel[b.P]:null,AE=!b.P||PANEL[b.P].tip==="AE",nR=new Set(b.rs.map(r=>r.cat+"|"+r.aid+"|"+r.al)).size;
  return e.jsxs("div",{style:{...S.card,padding:0,overflow:"hidden"},children:[
   e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:".6rem",padding:".75rem 1rem",borderBottom:"1px solid "+C.line,background:`linear-gradient(90deg,${renk}14,#fff 60%)`,flexWrap:"wrap"},children:[e.jsx("span",{style:{width:10,height:10,borderRadius:3,background:renk}}),e.jsx("span",{style:{fontWeight:900,fontSize:"1rem"},children:b.t}),
    e.jsx("span",{style:S.chip(C.ink2,C.soft),children:nR+" "+__T("rutin")}),e.jsx("span",{style:S.chip(C.ink2,C.soft),children:b.hl.length+" "+__T("hakem")}),
    oz&&oz.mud?e.jsx("span",{style:S.chip("#B91C1C","#FEE2E2"),title:__T("Üst Jüri kontrol notu ile panel sonucu arasındaki fark WG toleransını aşıyor (müdahale/video inceleme gerektirir)"),children:oz.mud+" "+__T("Üst Jüri müdahale sınırı")}):null,
    oz&&oz.blok?e.jsx("span",{style:S.chip("#B45309","#FEF3C7"),children:oz.blok+" "+__T("rutinde hakemler arası > 2.00")}):null,
    oz&&oz.sjYok?e.jsx("span",{style:S.chip(C.muted,C.soft),children:oz.sjYok+" "+__T("rutinde SJ notu yok")}):null]}),
   e.jsx("div",{style:{overflowX:"auto"},children:e.jsxs("table",{style:{width:"100%",borderCollapse:"collapse",fontSize:".84rem",minWidth:960},children:[
    e.jsx("thead",{children:e.jsxs("tr",{style:{background:C.soft},children:[e.jsx("th",{style:{...S.th,textAlign:"left"},children:__T("Hakem")}),e.jsx("th",{style:{...S.th,textAlign:"left"},children:__T("Koltuk")}),e.jsx("th",{style:S.th,children:__T("Rutin")}),e.jsx("th",{style:S.th,children:__T("Başarı %")}),e.jsx("th",{style:S.th,children:__T("Not")}),e.jsx("th",{style:S.th,title:__T("İşaretli ortalama sapma"),children:__T("Eğilim")}),e.jsx("th",{style:S.th,children:__T("Ort. mutlak")}),e.jsx("th",{style:S.th,children:"RMS"}),e.jsx("th",{style:S.th,children:__T("En büyük")}),e.jsx("th",{style:S.th,children:__T("Tol. dışı")}),AE?e.jsx("th",{style:S.th,children:__T("Atılan")}):null,e.jsx("th",{style:S.th,title:__T("Hakemin kendi ülkesinin (ulusal yarışmada kulübünün) sporcularına verdiği sapma ile diğerleri arasındaki fark"),children:__T("Ülke yanlılığı")}),e.jsx("th",{style:S.th})]})}),
    e.jsx("tbody",{children:b.hl.map(x=>{const P0=tipOf(x.rs)?x.rs[0].panel:null;return e.jsxs("tr",{style:{borderTop:"1px solid #EEF2F7",cursor:"pointer"},onClick:()=>setDetay({t:hAdx(x)+(b.isim?"":" · "+b.t),rs:x.rs,o:x.o,h:x}),children:[
     e.jsx("td",{style:{...S.td,textAlign:"left",whiteSpace:"normal"},children:e.jsxs("div",{children:[e.jsx("div",{style:{fontWeight:900},children:x.ad||e.jsx("span",{style:{color:C.sub,fontWeight:700},children:__T("hakem atanmamış")})}),e.jsx("div",{style:{fontSize:".72rem",color:C.muted,fontWeight:700},children:[x.ulke,x.brove,b.kat?"":x.kats.map(katAd).join(", ")].filter(Boolean).join(" · ")})]})}),
     e.jsx("td",{style:{...S.td,textAlign:"left"},children:e.jsx("div",{style:{display:"flex",gap:".25rem",flexWrap:"wrap",minWidth:118},children:x.poz.map(pozChip)})}),
     e.jsx("td",{style:S.td,children:x.o.n}),e.jsx("td",{style:S.td,children:pctBar(x.o.pct)}),e.jsx("td",{style:S.td,title:x.o.grade==="—"?__T("D ve A/E panellerinde farklı not ölçeği var — panel kırılımı için satıra tıklayın"):"",children:gChip(x.o.grade)}),
     e.jsx("td",{style:{...S.td,color:Math.abs(x.o.ort)<.05?C.ink2:x.o.ort>0?"#B45309":"#1D4ED8"},title:Math.abs(x.o.ort)<.05?__T("dengeli"):P0?yonu(P0,x.o.ort):"",children:sg(x.o.ort)}),
     e.jsx("td",{style:S.td,children:f2(x.o.abs)}),e.jsx("td",{style:S.td,children:f2(x.o.rms)}),e.jsx("td",{style:S.td,children:f2(x.o.mx)}),
     e.jsx("td",{style:{...S.td,color:x.o.dis?"#B91C1C":"#15803D"},children:x.o.dis+" · %"+Math.round(x.o.dis/x.o.n*100)}),
     AE?e.jsx("td",{style:S.td,children:x.o.at||"—"}):null,
     e.jsx("td",{style:{...S.td,color:x.bias&&Math.abs(x.bias.fark)>=.2?"#B91C1C":C.ink2},title:x.bias?x.bias.n+" "+__T("rutin")+" ("+x.ulke+")":__T("Hakemin ülkesinden sporcu yoksa hesaplanmaz"),children:x.bias?sg(x.bias.fark):"—"}),
     e.jsx("td",{style:{...S.td,width:30},children:MI("chevron_right",{color:C.sub})})]},x.k)})})]})})]},b.id)};

 const detayModal=detay&&(()=>{const rs=[...detay.rs].sort((a,b)=>Math.abs(b.dev)-Math.abs(a.dev)),o=detay.o,kr=kirilim(detay.rs),P0=tipOf(detay.rs)?detay.rs[0].panel:null;
  return e.jsx("div",{style:S.ov,onClick:ev=>{ev.target===ev.currentTarget&&setDetay(null)},children:e.jsxs("div",{style:S.modal,children:[
   e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:".6rem",flexWrap:"wrap"},children:[e.jsx("div",{style:{fontWeight:900,fontSize:"1.15rem"},children:detay.t}),o?gChip(o.grade):null,o?e.jsx("span",{style:S.chip(C.ink2,C.soft),children:"%"+o.pct.toFixed(1)}):null,e.jsx("span",{style:{flex:1}}),
    detay.h&&detay.h.k&&!hSec?e.jsxs("button",{type:"button",style:S.ghost,onClick:()=>{setHSec(detay.h.k);setDetay(null)},title:__T("Sayfayı ve raporları bu hakeme göre süz"),children:[MI("filter_alt"),__T("Bu hakemin raporu")]}):null,
    e.jsx("button",{type:"button",style:S.ghost,onClick:()=>setDetay(null),children:MI("close")})]}),
   o?e.jsx("div",{style:{fontSize:".82rem",fontWeight:700,color:C.muted,margin:".5rem 0 .8rem"},children:`${o.n} ${__T("rutin")} · ${__T("eğilim")} ${sg(o.ort)}${P0?" ("+(Math.abs(o.ort)<.05?__T("dengeli"):yonu(P0,o.ort))+")":""} · ${__T("ort. mutlak sapma")} ${f2(o.abs)} · ${__T("tolerans dışı")} ${o.dis}`}):null,
   kr.length>1?e.jsx("div",{style:{overflowX:"auto",marginBottom:".9rem"},children:e.jsxs("table",{style:{width:"100%",borderCollapse:"collapse",fontSize:".8rem"},children:[e.jsx("thead",{children:e.jsxs("tr",{style:{background:C.soft},children:[e.jsx("th",{style:{...S.th,textAlign:"left"},children:__T("Kategori · Alet")}),e.jsx("th",{style:{...S.th,textAlign:"left"},children:__T("Panel")}),e.jsx("th",{style:{...S.th,textAlign:"left"},children:__T("Koltuk")}),e.jsx("th",{style:S.th,children:__T("Rutin")}),e.jsx("th",{style:S.th,children:__T("Başarı %")}),e.jsx("th",{style:S.th,children:__T("Not")}),e.jsx("th",{style:S.th,children:__T("Eğilim")}),e.jsx("th",{style:S.th,children:__T("Tol. dışı")})]})}),
    e.jsx("tbody",{children:kr.map((x,i)=>e.jsxs("tr",{style:{borderTop:"1px solid #EEF2F7"},children:[e.jsx("td",{style:{...S.td,textAlign:"left",fontWeight:800},children:x.katAd+" · "+x.alAd}),e.jsx("td",{style:{...S.td,textAlign:"left",color:PANEL[x.P].renk,fontWeight:900},children:x.P}),e.jsx("td",{style:{...S.td,textAlign:"left"},children:e.jsx("div",{style:{display:"flex",gap:".25rem"},children:x.poz.map(pozChip)})}),e.jsx("td",{style:S.td,children:x.o.n}),e.jsx("td",{style:S.td,children:x.o.pct.toFixed(1)}),e.jsx("td",{style:S.td,children:gChip(x.o.grade)}),e.jsx("td",{style:S.td,children:sg(x.o.ort)}),e.jsx("td",{style:{...S.td,color:x.o.dis?"#B91C1C":"#15803D"},children:x.o.dis})]},i))})]})}):null,
   e.jsx("div",{style:{overflowX:"auto"},children:e.jsxs("table",{style:{width:"100%",borderCollapse:"collapse",fontSize:".82rem"},children:[e.jsx("thead",{children:e.jsxs("tr",{style:{background:C.soft},children:[e.jsx("th",{style:{...S.th,textAlign:"left"},children:__T("Sporcu")}),e.jsx("th",{style:{...S.th,textAlign:"left"},children:__T("Kategori · Alet")}),e.jsx("th",{style:{...S.th,textAlign:"left"},children:__T("Koltuk")}),e.jsx("th",{style:{...S.th,textAlign:"left"},children:__T("Hakem")}),e.jsx("th",{style:S.th,children:__T("Not / Kesinti")}),e.jsx("th",{style:S.th,children:__T("Referans")}),e.jsx("th",{style:S.th,children:__T("Sapma")}),e.jsx("th",{style:S.th,children:__T("Tolerans")}),e.jsx("th",{style:S.th,children:"%"})]})}),
    e.jsx("tbody",{children:rs.map((r,i)=>e.jsxs("tr",{style:{borderTop:"1px solid #EEF2F7",background:r.dis?"#FEF2F2":"transparent"},children:[e.jsx("td",{style:{...S.td,textAlign:"left"},children:e.jsxs("div",{children:[e.jsx("div",{style:{fontWeight:900},children:r.ad}),e.jsx("div",{style:{fontSize:".7rem",color:C.muted},children:r.sUlke||r.kulup})]})}),e.jsx("td",{style:{...S.td,textAlign:"left",color:C.ink2},children:r.katAd+" · "+r.alAd}),e.jsx("td",{style:{...S.td,textAlign:"left"},children:pozChip(r.poz)}),e.jsx("td",{style:{...S.td,textAlign:"left",color:C.ink2,fontSize:".76rem"},children:r.hAd||"—"}),
     e.jsxs("td",{style:S.td,children:[f2(r.val),r.atildi?e.jsx("span",{style:{...S.chip(C.muted,C.soft),marginLeft:".3rem"},title:__T("En yüksek/en düşük kesinti olarak atıldı"),children:__T("atıldı")}):null]}),
     e.jsxs("td",{style:S.td,children:[f3(r.ref),e.jsx("span",{style:{fontSize:".66rem",color:C.sub,marginLeft:".25rem"},children:r.refKaynak})]}),e.jsx("td",{style:{...S.td,color:r.dis?"#B91C1C":Math.abs(r.dev)<.05?"#15803D":C.ink2,fontWeight:900},children:sg(r.dev)}),e.jsx("td",{style:{...S.td,color:C.muted},children:"±"+r.tol}),e.jsx("td",{style:{...S.td,fontWeight:900},children:r.pct})]},i))})]})})]})})})();

 const atamaModal=atamaAc&&e.jsx("div",{style:S.ov,onClick:ev=>{ev.target===ev.currentTarget&&setAtamaAc(!1)},children:e.jsxs("div",{style:{...S.modal,maxWidth:720},children:[
  e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:".5rem",fontSize:"1.1rem",fontWeight:900},children:[MI("badge",{color:C.p}),__T("Hakem İsimleri")]}),
  e.jsx("div",{style:{fontSize:".8rem",fontWeight:700,color:C.muted,margin:".3rem 0 .8rem"},children:__T("Hakemler Paneller sayfasındaki kategori/alet atamalarından otomatik alınır. Burası yalnız Paneller’de hakemi atanmamış koltuklar içindir (ad ve ülke/kulüp).")}),
  e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(310px,1fr))",gap:".5rem"},children:POZ2.map(([P,poz])=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:".4rem"},children:[e.jsx("span",{style:{...S.chip("#fff",PANEL[P].renk),minWidth:40,textAlign:"center"},children:poz}),e.jsx("input",{style:S.inp,placeholder:__T("Ad Soyad"),value:atamaForm[poz]?.ad||"",onChange:ev=>setAtamaForm(o=>({...o,[poz]:{...(o[poz]||{}),ad:ev.target.value}}))}),e.jsx("input",{style:{...S.inp,maxWidth:120},placeholder:__T("Kulüp / İl"),value:atamaForm[poz]?.kulup||"",onChange:ev=>setAtamaForm(o=>({...o,[poz]:{...(o[poz]||{}),kulup:ev.target.value}}))})]},poz))}),
  e.jsxs("div",{style:{display:"flex",gap:".6rem",marginTop:"1rem",justifyContent:"flex-end"},children:[e.jsx("button",{type:"button",style:S.ghost,onClick:()=>setAtamaAc(!1),children:__T("Vazgeç")}),e.jsxs("button",{type:"button",style:S.btn(C.p),onClick:atamaKaydet,children:[MI("save"),__T("Kaydet")]})]})]})});

 const genel=["DA","DB","A","E"].map(P=>{const rs=rowsF.filter(r=>r.panel===P);return{P,o:ozetle(rs,PANEL[P].tip==="D"?"D":"AE")}}).filter(x=>x.o);
 return e.jsxs("div",{style:S.wrap,children:[
  e.jsx("div",{style:S.top,children:e.jsxs("div",{style:S.topIn,children:[e.jsx("a",{href:"/rhythmic",style:S.back,title:__T("Geri"),children:MI("arrow_back",{fontSize:"1.4rem"})}),e.jsx("div",{style:S.ico,children:MI("fact_check",{fontSize:"1.4rem"})}),
   e.jsxs("div",{style:{minWidth:0,flex:1},children:[e.jsx("div",{style:{fontWeight:900,fontSize:"1.15rem",lineHeight:1.15},children:__T("WG Hakem Karnesi")}),e.jsx("div",{style:{fontSize:".8rem",fontWeight:700,color:C.muted},children:Cp.isim||__T("Ritmik · DA / DB / A / E hakem değerlendirmesi (WG 2025–2028)")})]}),
   e.jsxs("button",{type:"button",style:S.ghost,onClick:()=>setBilgi(v=>!v),children:[MI("menu_book"),__T("Kurallar")]})]})}),
  e.jsxs("div",{style:S.in,children:[
   bilgi?e.jsxs("div",{style:{...S.card,fontSize:".82rem",fontWeight:600,color:C.ink2,lineHeight:1.6},children:[e.jsx("div",{style:{fontWeight:900,marginBottom:".3rem",color:C.ink},children:__T("Değerlendirme nasıl yapılır? (WG RG 2025–2028)")}),
    e.jsx("div",{children:"• "+__T("Referans not: Üst Jüri (Supervisor) kontrol notu — SJDA, SJDB, SJA, SJE. SJ notu yoksa panel sonucu kullanılır (DA/DB ortak not, A/E ortadaki iki kesintinin ortalaması).")}),
    e.jsx("div",{children:"• "+__T("Tolerans (Appendix to the CoP §3): DA/DB ±0.50 · A/E referans kesinti 0.00–1.20 → ±0.399, 1.20 üzeri → ±0.699 · aynı paneldeki iki hakem arasında 2.00'den fazla fark blok sebebidir.")}),
    e.jsx("div",{children:"• "+__T("Başarı %: RG Specific Judges' Rules değerlendirme tabloları — A/E'de sapma ve referans kesinti aralığına (≤2.0 · 2.1–3.5 · ≥3.6) göre; DA/DB'de hata miktarına göre (bireysel DA tablosu daha sıkıdır). Bireysel ve grup için ayrı tablolar.")}),
    e.jsx("div",{children:"• "+__T("Not: D için ≥80 Excellent, ≥70 Very Good, ≥60 Good, ≥50 Pass · A/E için ≥90, ≥80, ≥65, ≥50. Eğilim: D'de + yüksek not verme, A/E'de + sert (fazla kesinti).")}),
    e.jsx("div",{style:{color:C.muted},children:"• "+__T("WG'nin yarışma içi JEP not eşikleri yayımlanmadığından bu karne, WG'nin yayımlanmış tolerans ve değerlendirme tablolarıyla ulusal kullanım için hazırlanmıştır.")})]}):null,
   e.jsxs("div",{style:{...S.card,display:"flex",gap:".6rem",flexWrap:"wrap",alignItems:"center"},children:[
    e.jsxs("select",{style:{...S.sel,flex:"1 1 280px"},value:comp,onChange:ev=>setComp(ev.target.value),children:[e.jsx("option",{value:"",children:__T("— Yarışma seçin —")}),list.map(([id,c])=>e.jsx("option",{value:id,children:c.isim||id},id))]}),
    comp?e.jsxs(e.Fragment,{children:[
     e.jsxs("select",{style:S.sel,value:refTip,onChange:ev=>setRefTip(ev.target.value),children:[e.jsx("option",{value:"sj",children:__T("Referans: Üst Jüri (SJ) kontrol notu")}),e.jsx("option",{value:"panel",children:__T("Referans: Panel sonucu")})]}),
     e.jsxs("button",{type:"button",style:S.ghost,onClick:()=>{setAtamaForm(JSON.parse(JSON.stringify(atama)));setAtamaAc(!0)},children:[MI("badge",{color:C.p}),__T("Hakem İsimleri")]}),
     e.jsxs("button",{type:"button",style:S.ghost,onClick:pdf,disabled:!rows.length,children:[MI("picture_as_pdf",{color:"#DC2626"}),"PDF"]}),
     e.jsxs("button",{type:"button",style:S.ghost,onClick:excel,disabled:!rows.length,children:[MI("table_view",{color:"#16A34A"}),"Excel"]})]}):null]}),
   comp?e.jsxs("div",{style:{...S.card,paddingTop:".7rem",paddingBottom:".7rem"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:".5rem",flexWrap:"wrap"},children:[e.jsx("span",{style:{fontSize:".72rem",fontWeight:900,color:C.muted,textTransform:"uppercase",letterSpacing:".04em"},children:__T("Kategoriler")}),
     e.jsx("button",{type:"button",style:{...S.ghost,padding:".25rem .6rem",fontSize:".74rem",...(secKat.size?{}:{background:C.p,color:"#fff",borderColor:C.p})},onClick:()=>setSecKat(new Set),children:__T("Tümü")}),
     puanliKat.map(c=>{const on=secKat.has(c);return e.jsx("button",{type:"button",style:{...S.ghost,padding:".25rem .6rem",fontSize:".74rem",...(on?{background:C.p,color:"#fff",borderColor:C.p}:{})},onClick:()=>setSecKat(s=>{const n=new Set(s);n.has(c)?n.delete(c):n.add(c);return n}),children:(isFinal(c)?"🏆 ":"")+katAd(c)},c)}),
     e.jsx("span",{style:{flex:1}}),e.jsxs("label",{style:{display:"inline-flex",alignItems:"center",gap:".35rem",fontSize:".78rem",fontWeight:800,color:C.ink2,cursor:"pointer"},children:[e.jsx("input",{type:"checkbox",checked:finDahil,onChange:ev=>setFinDahil(ev.target.checked)}),__T("Finaller dahil")]})]})]}):null,
   !comp?e.jsxs("div",{style:{...S.card,textAlign:"center",padding:"3rem 1rem",color:C.muted,fontWeight:700},children:[MI("fact_check",{fontSize:"2.6rem",display:"block",margin:"0 auto .5rem",color:C.sub}),__T("Hakem karnesini görmek için yarışma seçin.")]}):
   !rows.length?e.jsx("div",{style:{...S.card,textAlign:"center",padding:"2.5rem 1rem",color:C.muted,fontWeight:700},children:__T("Seçili kategorilerde tamamlanmış puan yok.")}):e.jsxs(e.Fragment,{children:[
    e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:".75rem",marginBottom:"1rem"},children:[
     e.jsxs("div",{style:{...S.card,marginBottom:0},children:[e.jsx("div",{style:{fontSize:"1.5rem",fontWeight:900},children:rutinSay}),e.jsx("div",{style:{fontSize:".76rem",fontWeight:700,color:C.muted},children:__T("değerlendirilen rutin")}),e.jsx("div",{style:{fontSize:".72rem",fontWeight:800,color:sjOran>.9?"#15803D":"#B45309",marginTop:".25rem"},children:"%"+Math.round(sjOran*100)+" "+__T("SJ referanslı")})]}),
     genel.map(g=>e.jsxs("div",{style:{...S.card,marginBottom:0,borderTop:"3px solid "+PANEL[g.P].renk},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",gap:".4rem"},children:[e.jsx("span",{style:{fontWeight:900,fontSize:".86rem"},children:PANEL[g.P].ad}),gChip(g.o.grade)]}),e.jsxs("div",{style:{fontSize:"1.45rem",fontWeight:900,marginTop:".2rem"},children:["%",g.o.pct.toFixed(1)]}),e.jsx("div",{style:{fontSize:".74rem",fontWeight:700,color:C.muted},children:__T("panel ortalaması")+" · "+g.o.dis+" "+__T("tolerans dışı")})]},g.P))]}),
    e.jsxs("div",{style:{...S.card,display:"flex",gap:".5rem",flexWrap:"wrap",alignItems:"center",paddingTop:".7rem",paddingBottom:".7rem"},children:[
     e.jsx("span",{style:{fontSize:".72rem",fontWeight:900,color:C.muted,textTransform:"uppercase",letterSpacing:".04em"},children:__T("Rapor")}),
     Object.entries(GOR).map(([k,t])=>e.jsx("button",{type:"button",style:{...S.ghost,padding:".35rem .7rem",fontSize:".78rem",...(gor===k?{background:C.p,color:"#fff",borderColor:C.p}:{})},onClick:()=>{setGor(k);try{localStorage.setItem("tcfRtKarneGor",k)}catch{}},children:t},k)),
     e.jsx("span",{style:{flex:1}}),
     e.jsxs("select",{style:{...S.sel,maxWidth:320},value:hSec,onChange:ev=>setHSec(ev.target.value),children:[e.jsx("option",{value:"",children:__T("Tüm hakemler")+" ("+hakemL.filter(x=>x.ad).length+")"}),hakemL.map(x=>e.jsx("option",{value:x.k,children:hEt(x)},x.k))]}),
     hSec?e.jsx("button",{type:"button",style:{...S.ghost,padding:".4rem .55rem"},onClick:()=>setHSec(""),title:__T("Süzgeci kaldır"),children:MI("close")}):null]}),
    atanmamis.size||elle?e.jsx("div",{style:{...S.card,background:"#FFFBEB",borderColor:"#FDE68A",color:"#92400E",fontSize:".82rem",fontWeight:700,padding:".6rem .9rem"},children:[atanmamis.size?__T("Paneller sayfasında hakemi atanmamış koltuk var:")+" "+[...atanmamis].sort((a,b)=>POZS.indexOf(a)-POZS.indexOf(b)).join(", ")+". ":"",elle?__T("Bazı koltuklarda ad, karnedeki “Hakem İsimleri” listesinden alındı."):""].join("")}):null,
    bolumler.map(bolumKart),

    dzL.length?e.jsxs("div",{style:{...S.card},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:".5rem",marginBottom:".6rem"},children:[MI("history_edu",{color:"#DB2777"}),e.jsx("b",{style:{fontSize:"1rem",fontWeight:900},children:__T("Not değişiklikleri")}),e.jsx("span",{style:{fontSize:".76rem",fontWeight:800,color:C.muted},children:dzL.length})]}),
     e.jsx("div",{style:{overflowX:"auto"},children:e.jsxs("table",{style:{width:"100%",borderCollapse:"collapse",fontSize:".8rem"},children:[e.jsx("thead",{children:e.jsx("tr",{children:[__T("Zaman"),__T("Kategori"),__T("Sporcu"),__T("Alet"),__T("Poz."),__T("Hakem"),__T("Eski"),__T("Yeni"),__T("İşlem"),__T("Yapan"),__T("Not")].map((h,i)=>e.jsx("th",{style:{textAlign:"left",padding:".4rem .5rem",fontSize:".7rem",fontWeight:900,color:C.muted,borderBottom:"1px solid #E5E7EB",whiteSpace:"nowrap"},children:h},i))})}),
      e.jsx("tbody",{children:dzL.map((x,i)=>e.jsx("tr",{children:[dzZ(x.ts),x.kat,x.sporcu+(x.ulke?" · "+x.ulke:""),x.alet,x.poz,x.hakem||"—",dzF(x.eski),x.yeni==null?"—":dzF(x.yeni),x.tip,x.kim,x.not].map((v,j)=>e.jsx("td",{style:{padding:".4rem .5rem",borderBottom:"1px solid #F1F5F9",whiteSpace:j<8?"nowrap":"normal",fontWeight:j===4||j===7?900:600,color:j===7?"#BE185D":j===6?"#64748B":void 0,textDecoration:j===6&&x.yeni!=null?"line-through":void 0},children:v},j))},i))})]})})]}):null]}),
   detayModal,atamaModal]})]})}
export{RitmikFigKarne as default};
