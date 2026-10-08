import"./i18n-Tr01a2b3Cb2.js";import{b as usToast,a as usInit,j as e,d as db,_ as Oe,u as usAuth,l as logAction}from"./main-C2LpyYUGCb2.js";import{isIntl as _gxI,sporcuUlke as _gxU,katEN as _gxKE}from"./intl-Ul01a2b3Cb2.js";import{r as R}from"./vendor-react-Cxw6bqwhCb2.js";import{k as ref,o as onValue,v as set,m as update}from"./vendor-firebase-940mxgRVCb2.js";import{R as RC,a as RA}from"./ritmikCriteriaDefaults-CgOlnfQcCb2.js";import"./modulepreload-polyfill-B5Qt9EMXCb2.js";

// RİTMİK — PROGRAM & ÇIKIŞ LİSTESİ (kura listesi)
//  ritmik_yarismalar/<yarışma>/cikisListesi : {ayar:{ust1,ust2,ust3}, gunler:[{id,tarih,bloklar:[blok]}], ts}
//   blok tipleri:
//    grup  : {id,tip:"grup",kat,saat,aletler:[a,b..],rows:[{k:kulüp,r:[{a:sporcuId,al:alet},..(rotasyon sayısı = aletler.length)]}]}
//    ara   : {id,tip:"ara",metin,bas,bit}
//    takim : {id,tip:"takim",kat,baslik,egz:["5xİP","5xİP"],rows:[{g:"<kat>::<kulüp>::<grupNo>"}]}
//  "Puanlamaya aktar": her kategorinin çıkış grupları sırasıyla siralama/<kat>/rotation_N olur
//   (Çıkış Sırası sayfasıyla aynı yapı; ritmik puanlama sporcuları bu sırayla çağırır).
//   Tek aletli grupta rotasyon kaydına _alet, sporcu kaydında aletler[] varsa o da yazılır (puanlama listesi rotasyon aletini ve sporcunun aletlerini gösterir).
const BASE="ritmik_yarismalar",ESKI_KEY="tcfRtProgramEski";
const EskiSayfa=R.lazy(()=>{try{if(!document.querySelector("link[data-eski-program]")){const l=document.createElement("link");l.rel="stylesheet";l.href="/assets/CompetitionSchedulePage-AXi_GZj_Cb2.css";l.setAttribute("data-eski-program","1");document.head.appendChild(l)}}catch{}return import("./CompetitionSchedulePage-CzPEnPMWCb2.js")});
const ALET={cember:"Çember",top:"Top",labut:"Labut",kurdele:"Kurdele",ip:"İp",serbest:"Serbest",grup_seri1:"1. Seri",grup_seri2:"2. Seri"};
const ARENK={cember:"#DB2777",top:"#2563EB",labut:"#7C3AED",kurdele:"#D97706",ip:"#059669",serbest:"#0891B2"};
const alAd=a=>RA[a]?.label||ALET[a]||a;
const isFinal=c=>/^final_/.test(String(c||""));
const baseCat=c=>String(c||"").replace(/^final_/,"").split("__")[0];
const cfg=c=>RC[c]||RC[baseCat(c)]||{};
const isGrp=c=>{const d=cfg(c);return d.grupMu===!0||d.tip==="takim"||d.athleteCount>1||/_grup$/.test(baseCat(c))};
const grupKey=(cat,okul,gn)=>String(cat+"::"+String(okul||"").trim()+"::"+gn).trim().replace(/[.#$[\]/]/g,"-").slice(0,60);
const UP=s=>String(s??"").toLocaleUpperCase("tr-TR");
const uid=()=>Math.random().toString(36).slice(2,9);
const GUN=["PAZAR","PAZARTESİ","SALI","ÇARŞAMBA","PERŞEMBE","CUMA","CUMARTESİ"],AY=["OCAK","ŞUBAT","MART","NİSAN","MAYIS","HAZİRAN","TEMMUZ","AĞUSTOS","EYLÜL","EKİM","KASIM","ARALIK"];
const gunBaslik=t=>{const m=/^(\d{4})-(\d{2})-(\d{2})/.exec(String(t||""));if(!m)return"";const d=new Date(+m[1],+m[2]-1,+m[3]);return`${+m[3]} ${AY[+m[2]-1]} ${m[1]} ${GUN[d.getDay()]}`};
const tarihEkle=(t,n)=>{const m=/^(\d{4})-(\d{2})-(\d{2})/.exec(String(t||""));const d=m?new Date(+m[1],+m[2]-1,+m[3]):new Date;d.setDate(d.getDate()+n);return`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`};
const karistir=a=>{const b=[...a];for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]]}return b};
const kopya=o=>JSON.parse(JSON.stringify(o));

const C={bg:"#F0F2F5",card:"#fff",soft:"#F8FAFC",line:"#E5E7EB",ink:"#1A1D26",ink2:"#334155",muted:"#6B7280",sub:"#94A3B8",p:"#DB2777"};
const S={
 wrap:{minHeight:"100vh",background:C.bg,color:C.ink,fontFamily:"Nunito,system-ui,-apple-system,sans-serif",paddingBottom:"4rem"},
 top:{position:"sticky",top:0,zIndex:20,background:"#fff",borderBottom:"1px solid "+C.line,boxShadow:"0 1px 3px rgba(0,0,0,.06)"},
 topIn:{maxWidth:1320,margin:"0 auto",minHeight:68,padding:".5rem 1.25rem",display:"flex",alignItems:"center",gap:".9rem",flexWrap:"wrap"},
 back:{width:38,height:38,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",color:C.ink,textDecoration:"none",flexShrink:0},
 ico:{width:44,height:44,borderRadius:12,background:"linear-gradient(135deg,#a855f7,#ec4899)",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 6px 18px rgba(236,72,153,.32)",flexShrink:0},
 in:{maxWidth:1320,margin:"0 auto",padding:"1.1rem 1.25rem"},
 card:{background:C.card,border:"1px solid "+C.line,borderRadius:16,padding:"1rem 1.1rem",marginBottom:"1rem"},
 sel:{background:C.soft,border:"1px solid "+C.line,borderRadius:12,padding:".55rem .7rem",fontFamily:"inherit",fontSize:".88rem",fontWeight:700,color:C.ink,minWidth:0},
 inp:{background:C.soft,border:"1px solid "+C.line,borderRadius:10,padding:".5rem .65rem",fontFamily:"inherit",fontSize:".88rem",fontWeight:700,color:C.ink,outline:"none",minWidth:0},
 btn:(bg,fg)=>({display:"inline-flex",alignItems:"center",gap:".35rem",border:"none",borderRadius:11,padding:".58rem .9rem",fontFamily:"inherit",fontWeight:800,fontSize:".85rem",cursor:"pointer",background:bg,color:fg||"#fff",whiteSpace:"nowrap"}),
 ghost:{display:"inline-flex",alignItems:"center",gap:".35rem",border:"1px solid "+C.line,borderRadius:11,padding:".5rem .8rem",fontFamily:"inherit",fontWeight:800,fontSize:".82rem",cursor:"pointer",background:"#fff",color:C.ink2,whiteSpace:"nowrap"},
 ib:{width:30,height:30,borderRadius:8,border:"1px solid "+C.line,background:"#fff",color:C.ink2,display:"inline-flex",alignItems:"center",justifyContent:"center",cursor:"pointer",flexShrink:0,padding:0},
 chip:(fg,bg)=>({fontSize:".68rem",fontWeight:900,padding:".18rem .5rem",borderRadius:999,color:fg,background:bg,whiteSpace:"nowrap",letterSpacing:".02em"}),
 lbl:{fontSize:".7rem",fontWeight:900,color:C.muted,textTransform:"uppercase",letterSpacing:".04em",margin:".7rem 0 .3rem",display:"block"},
 ov:{position:"fixed",inset:0,zIndex:80,background:"rgba(15,23,42,.5)",backdropFilter:"blur(3px)",display:"flex",alignItems:"center",justifyContent:"center",padding:"1rem"},
 modal:{background:"#fff",borderRadius:16,width:"100%",maxWidth:560,maxHeight:"92vh",overflow:"auto",padding:"1.2rem",boxShadow:"0 24px 60px rgba(15,23,42,.3)",color:C.ink}
};
const MI=(n,st)=>e.jsx("span",{className:"material-icons-round",style:{fontSize:"1.1rem",...(st||{})},children:n});

function Program({onEski}){
 const{toast,confirm}=usToast();const{currentUser:_lu}=usAuth()||{},_un=_lu?.adSoyad||_lu?.kullaniciAdi||"";
 const[comps,setComps]=R.useState({}),[comp,setComp]=R.useState(()=>{try{return new URLSearchParams(location.search).get("comp")||localStorage.getItem("tcfRtProgramComp")||""}catch{return""}});
 const[plan,setPlan]=R.useState(null),[kirli,setKirli]=R.useState(!1),[busy,setBusy]=R.useState(!1),[kura,setKura]=R.useState(null),[hedef,setHedef]=R.useState(""),[ac,setAc]=R.useState({}),[ayarAc,setAyarAc]=R.useState(!1);
 R.useEffect(()=>onValue(ref(db,BASE),s=>setComps(s.val()||{})),[]);
 R.useEffect(()=>{try{comp&&localStorage.setItem("tcfRtProgramComp",comp)}catch{}},[comp]);
 const Cp=comps[comp]||{},kats=Cp.kategoriler||{},spor=Cp.sporcular||{},INTL=_gxI(Cp),ENP=INTL&&Cp.ciktiDili!=="tr",HB=Object.values(spor).some(c=>c&&typeof c=="object"&&Object.values(c).some(a=>a&&a.bib));
 // kayıtlı listeyi yükle (yalnızca yarışma değişince / kaydedilmemiş değişiklik yokken)
 const yuklendi=R.useRef("");
 R.useEffect(()=>{if(!comp||!comps[comp]){setPlan(null);return}if(yuklendi.current===comp&&kirli)return;const v=comps[comp].cikisListesi;
  if(yuklendi.current!==comp||!kirli){const p=v&&typeof v==="object"?{ayar:v.ayar||{},gunler:(Array.isArray(v.gunler)?v.gunler:Object.values(v.gunler||{})).filter(Boolean).map(g=>({...g,bloklar:(Array.isArray(g.bloklar)?g.bloklar:Object.values(g.bloklar||{})).filter(Boolean).map(b=>({...b,aletler:b.aletler||[],egz:b.egz||[],rows:(Array.isArray(b.rows)?b.rows:Object.values(b.rows||{})).filter(Boolean).map(r=>({...r,r:Array.isArray(r.r)?r.r:Object.values(r.r||{})}))}))}))}:null;
   setPlan(p||{ayar:{},gunler:[{id:uid(),tarih:String(Cp.baslangicTarihi||"").slice(0,10)||tarihEkle("",0),bloklar:[]}]});setKirli(!1);yuklendi.current=comp}},[comp,comps]);
 const list=Object.entries(comps).filter(([id,c])=>c&&typeof c==="object"&&(c.isim||c.kategoriler)&&(!(c.arsivli===!0||c.arsivli==="true")||id===comp)).sort((a,b)=>String(b[1].baslangicTarihi||"").localeCompare(String(a[1].baslangicTarihi||"")));
 const katAd=c=>String(kats[c]?.name||cfg(c).label||c).replace(/^\s*\u{1F3C6}\s*/u,"");
 const katAlet=c=>{const a=kats[c]?.aletler;if(Array.isArray(a)&&a.length)return a.map(x=>typeof x=="object"?x.id||x.value:x);if(a&&typeof a=="object")return Object.keys(a);return cfg(c).aletler||[]};
 const katlar=[...new Set([...Object.keys(kats),...Object.keys(spor)])].filter(c=>!isFinal(c));
 const bireyKat=katlar.filter(c=>!isGrp(c)),grupKat=katlar.filter(isGrp);
 const kulupOf=a=>INTL?String(_gxU(a,Cp)||""):String(a?.okul||a?.kulup||a?.il||"").trim();
 const sp=(cat,id)=>spor[cat]?.[id]||null;
 const spAd=(cat,id)=>{const a=sp(cat,id);return a?(ENP?_x=>String(_x||"").toLocaleUpperCase("en"):UP)([a.ad,a.soyad].filter(Boolean).join(" ")||a.adSoyad||id):"?"};
 const takimlar=cat=>{const m=new Map;Object.entries(spor[cat]||{}).forEach(([id,a])=>{if(!a)return;const ok=String(a.okul||a.kulup||"").trim(),gn=a.grupNo??1,k=grupKey(cat,ok,gn);m.has(k)||m.set(k,{k,okul:ok,il:a.il||"",gn,uyeler:[],bib:""});a.bib&&!m.get(k).bib&&(m.get(k).bib=String(a.bib));m.get(k).uyeler.push(UP([a.ad,a.soyad].filter(Boolean).join(" ")))});return[...m.values()]};

 const degis=fn=>{setPlan(p=>{const n=kopya(p);fn(n);return n});setKirli(!0)};
 const tumBloklar=plan?plan.gunler.flatMap(g=>g.bloklar):[];
 const grupNo={};let gsay=0;tumBloklar.forEach(b=>{if(b.tip==="grup")grupNo[b.id]=++gsay});
 // yerleşim kontrolü: kategori → sporcu → alet → kaç kez (sporcu kaydında aletler[] varsa — ör. Balkan takım formatı — yalnız o aletler beklenir)
 const yer={};tumBloklar.forEach(b=>{if(b.tip!=="grup")return;b.rows.forEach(r=>r.r.forEach(x=>{if(!x||!x.a)return;const k=b.kat+"|"+x.a;(yer[k]||(yer[k]={}))[x.al]=((yer[k]||{})[x.al]||0)+1}))});
 const eksikler=bireyKat.map(c=>{const al=katAlet(c),ids=Object.keys(spor[c]||{}).filter(id=>spor[c][id]);const yok=ids.filter(id=>!yer[c+"|"+id]),kismi=ids.filter(id=>{const y=yer[c+"|"+id],sa=spor[c][id]&&Array.isArray(spor[c][id].aletler)&&spor[c][id].aletler.length?spor[c][id].aletler:al;return y&&sa.some(a=>!y[a])});const cift=ids.filter(id=>{const y=yer[c+"|"+id];return y&&Object.values(y).some(n=>n>1)});return{c,al,ids,yok,kismi,cift}});
 const takimYer=new Set;tumBloklar.forEach(b=>b.tip==="takim"&&b.rows.forEach(r=>takimYer.add(r.g)));

 // ---- blok işlemleri ----
 const gunBul=(n,gid)=>n.gunler.find(g=>g.id===gid);
 const blokBul=(n,bid)=>{for(const g of n.gunler){const b=g.bloklar.find(x=>x.id===bid);if(b)return b}return null};
 const yeniGrup=(gid,cat)=>degis(n=>{const c=cat||bireyKat[0]||"";gunBul(n,gid).bloklar.push({id:uid(),tip:"grup",kat:c,saat:"",aletler:katAlet(c).slice(0,2),rows:[]})});
 const yeniAra=(gid,metin)=>degis(n=>{gunBul(n,gid).bloklar.push({id:uid(),tip:"ara",metin:metin||"ÖĞLE ARASI",bas:"",bit:""})});
 const yeniTakim=(gid)=>degis(n=>{const c=grupKat[0]||"";gunBul(n,gid).bloklar.push({id:uid(),tip:"takim",kat:c,baslik:UP(katAd(c)),egz:katAlet(c).length?katAlet(c).map(alAd).map(UP):["5xİP","5xİP"],rows:c?takimlar(c).map(t=>({g:t.k})):[]})});
 const blokTasi=(gid,i,d)=>degis(n=>{const b=gunBul(n,gid).bloklar,j=i+d;if(j<0||j>=b.length)return;[b[i],b[j]]=[b[j],b[i]]});
 const blokSil=async(gid,i)=>{if(!await await window.__gxConfirm(__T("Bu blok programdan çıkarılsın mı?"),{title:__T("Bloğu Sil"),type:"danger"}))return;degis(n=>{gunBul(n,gid).bloklar.splice(i,1)})};
 const blokGuncelle=(bid,fn)=>degis(n=>{const b=blokBul(n,bid);b&&fn(b)});
 const satirTasi=(bid,i,d)=>blokGuncelle(bid,b=>{const j=i+d;if(j<0||j>=b.rows.length)return;[b.rows[i],b.rows[j]]=[b.rows[j],b.rows[i]]});
 const satirSil=(bid,i)=>blokGuncelle(bid,b=>{b.rows.splice(i,1)});
 const satirGrubaTasi=(bid,i,hedefId)=>degis(n=>{const b=blokBul(n,bid),h=blokBul(n,hedefId);if(!b||!h)return;const[r]=b.rows.splice(i,1);h.rows.push(r)});
 const aletleriYenidenDagit=bid=>blokGuncelle(bid,b=>{const k=b.aletler.length||1;b.rows.forEach((r,i)=>{r.r=b.aletler.map((_,ri)=>({a:(r.r[ri]||r.r[0]||{}).a||"",al:b.aletler[(i+ri)%k]}))})});
 const sporcuEkle=(bid,cat,id)=>blokGuncelle(bid,b=>{const k=b.aletler.length||1,i=b.rows.length;b.rows.push({k:kulupOf(sp(cat,id)),r:b.aletler.map((_,ri)=>({a:id,al:b.aletler[(i+ri)%k]}))})});
 const gunEkle=()=>degis(n=>{const son=n.gunler[n.gunler.length-1];n.gunler.push({id:uid(),tarih:tarihEkle(son?.tarih,son?1:0),bloklar:[]})});
 const gunSil=async gid=>{if(!await await window.__gxConfirm(__T("Bu gün ve içindeki tüm bloklar silinsin mi?"),{title:__T("Günü Sil"),type:"danger"}))return;degis(n=>{n.gunler=n.gunler.filter(g=>g.id!==gid)})};

 // ---- kura ----
 const kuraCek=f=>{const cat=f.cat,al=f.aletler.filter(Boolean);if(!cat||!al.length){toast(__T("Kategori ve en az bir alet seçin."),"error");return}
  const yerlesik=new Set;if(f.sadeceEksik)tumBloklar.forEach(b=>b.tip==="grup"&&b.kat===cat&&b.rows.forEach(r=>r.r.forEach(x=>x&&x.a&&yerlesik.add(x.a))));
  const ids=Object.keys(spor[cat]||{}).filter(id=>spor[cat][id]&&!yerlesik.has(id));if(!ids.length){toast(__T("Yerleştirilecek sporcu yok."),"warning");return}
  const kulup=new Map;ids.forEach(id=>{const k=kulupOf(sp(cat,id))||"—";kulup.has(k)||kulup.set(k,[]);kulup.get(k).push(id)});
  const kList=karistir([...kulup.entries()].map(([k,a])=>({k,a:karistir(a)})));
  const boy=Math.max(2,parseInt(f.boy)||16),gruplar=[];
  if(f.kulupBirlikte){kList.sort((x,y)=>y.a.length-x.a.length);const n=Math.max(1,Math.ceil(ids.length/boy));for(let i=0;i<n;i++)gruplar.push([]);kList.forEach(K=>{let t=gruplar.reduce((m,g,i)=>g.length<gruplar[m].length?i:m,0);gruplar[t].push(K)})}
  else{const hepsi=[];kList.forEach(K=>K.a.forEach(id=>hepsi.push({k:K.k,id})));for(let i=0;i<hepsi.length;i+=boy){const m=new Map;hepsi.slice(i,i+boy).forEach(x=>{m.has(x.k)||m.set(x.k,{k:x.k,a:[]});m.get(x.k).a.push(x.id)});gruplar.push([...m.values()])}}
  // grup içinde kulüpleri karıştırarak sırala (aynı kulüp art arda gelmesin)
  const sirala=G=>{const kuyruk=karistir(G.map(K=>({k:K.k,a:[...K.a]}))),out=[];let son=null;while(kuyruk.some(K=>K.a.length)){const aday=kuyruk.filter(K=>K.a.length).sort((x,y)=>y.a.length-x.a.length);const sec=aday.find(K=>K.k!==son)||aday[0];out.push({k:sec.k,id:sec.a.shift()});son=sec.k;kuyruk.push(kuyruk.splice(kuyruk.indexOf(sec),1)[0])}return out};
  const k=al.length;
  degis(n=>{const g=gunBul(n,f.gun)||n.gunler[0];gruplar.filter(G=>G.length).forEach(G=>{const rows=sirala(G).map((x,i)=>({k:x.k,r:al.map((_,ri)=>({a:x.id,al:al[(i+ri)%k]}))}));g.bloklar.push({id:uid(),tip:"grup",kat:cat,saat:"",aletler:al,rows})})});
  setKura(null);toast(`${gruplar.filter(G=>G.length).length} ${__T("çıkış grubu oluşturuldu")} — ${ids.length} ${__T("sporcu")}`,"success")};

 // ---- kaydet / puanlamaya aktar ----
 const kaydet=async()=>{if(!comp||!plan)return;setBusy(!0);try{await set(ref(db,`${BASE}/${comp}/cikisListesi`),{...kopya(plan),ts:Date.now()});logAction("program_save",`[Ritmik] Çıkış listesi kaydedildi: ${plan.gunler.length} gün · ${tumBloklar.filter(b=>b.tip==="grup").length} çıkış grubu`,{user:_un,competitionId:comp,discipline:"ritmik",data:{gunler:plan.gunler.map(g=>({tarih:g.tarih,bloklar:g.bloklar.map(b=>b.tip==="grup"?{grup:grupNo[b.id],kategori:b.kat,aletler:b.aletler,sporcu:b.rows.length}:b.tip==="ara"?{ara:b.metin,bas:b.bas,bit:b.bit}:{grupYarismasi:b.kat,sayi:b.rows.length})}))}});setKirli(!1);toast(__T("Çıkış listesi kaydedildi ✓"),"success")}catch(er){toast(__T("Kaydedilemedi: ")+(er?.message||er),"error")}setBusy(!1)};
 const aktar=async()=>{if(!plan)return;const byCat={};tumBloklar.forEach(b=>{if(b.tip!=="grup"||!b.kat)return;(byCat[b.kat]||(byCat[b.kat]=[])).push(b)});const cats=Object.keys(byCat);if(!cats.length){toast(__T("Aktarılacak çıkış grubu yok."),"warning");return}
  if(!await await window.__gxConfirm(`${cats.map(c=>katAd(c)+": "+byCat[c].length+" "+__T("grup")).join("\n")}\n\n${__T("Bu kategorilerin çıkış sırası puanlama ekranına aktarılacak (Çıkış Sırası sayfasındaki sıralama bu listeyle değiştirilir). Listede olmayan sporcuların sırası değişmez.")}`,{title:__T("Puanlamaya Aktar"),type:"warning"}))return;
  const up={};cats.forEach(cat=>{let say=0;up[`${BASE}/${comp}/siralama/${cat}`]=null;const sira={};byCat[cat].forEach((b,gi)=>{const goren=new Set,ids=[];b.rows.forEach(r=>{const a=r.r[0]?.a;a&&!goren.has(a)&&(goren.add(a),ids.push(a))});b.rows.forEach(r=>r.r.slice(1).forEach(x=>{x&&x.a&&!goren.has(x.a)&&(goren.add(x.a),ids.push(x.a))}));const rot={};ids.forEach((id,i)=>{const a=sp(cat,id);if(!a)return;say++;rot[id]={sirasi:i+1,ad:a.ad||"",soyad:a.soyad||"",tckn:a.tckn||"",okul:a.okul||a.kulup||"",yarismaTuru:a.yarismaTuru||"ferdi",...(a.grupNo!=null?{grupNo:a.grupNo}:{}),...(Array.isArray(b.aletler)&&b.aletler.length===1&&b.rows.every(r=>!r.r[0]||!r.r[0].al||r.r[0].al===b.aletler[0])?{_alet:b.aletler[0]}:{}),...(Array.isArray(a.aletler)&&a.aletler.length?{aletler:a.aletler}:{}),...(a.ulke?{ulke:a.ulke}:{}),...(a.bib!=null&&a.bib!==""?{bib:a.bib}:{}),...(a.kulup?{kulup:a.kulup}:{}),...(a.il?{il:a.il}:{})};up[`${BASE}/${comp}/sporcular/${cat}/${id}/sirasi`]=i+1;up[`${BASE}/${comp}/sporcular/${cat}/${id}/cikisSirasi`]=say;up[`${BASE}/${comp}/sporcular/${cat}/${id}/rotasyonGrubu`]=gi+1});sira["rotation_"+gi]=rot});up[`${BASE}/${comp}/siralama/${cat}`]=sira});
  setBusy(!0);try{await update(ref(db),up);logAction("program_transfer",`[Ritmik] Çıkış listesi puanlamaya aktarıldı: ${cats.map(c=>katAd(c)+" ("+byCat[c].length+" grup)").join(", ")}`.slice(0,480),{user:_un,competitionId:comp,discipline:"ritmik",data:{kategoriler:cats.map(c=>({kategori:c,gruplar:byCat[c].map(b=>({grup:grupNo[b.id],sporcu:b.rows.length}))}))}});toast(__T("Çıkış sırası puanlamaya aktarıldı ✓"),"success")}catch(er){toast(__T("Aktarılamadı: ")+(er?.message||er),"error")}setBusy(!1)};

 // ---- PDF (2026-10-08 yeni tasarım: Final Oluştur / Raporlar PDF'leriyle aynı standart) ----
 //  Başlık: TCF + etkinlik logosu, yarışma adı, tarih · şehir, "ÇIKIŞ LİSTESİ"; gün bandı; her blok: saat · kategori · alet simgesi · grup;
 //  tam genişlik tablo (No, BIB, sporcu, ülke bayrağı / kulüp, takım), ara blokları, devam sayfası başlığı, alt bilgi + sayfa no.
 const pdf=async()=>{if(!plan)return;toast(__T("PDF hazırlanıyor…"),"info");try{
  const jsPDF=await import("./jspdf.es.min-gArCfqm1Cb2.js").then(z=>z.j?.jsPDF||z.E),atM=await import("./jspdf.plugin.autotable-KFqWVtFsCb2.js"),at=atM.default||atM,d=new jsPDF("portrait","mm","a4");
  let FT="helvetica";try{const{R:r0,B:b0}=await import("./fontTR-Fn01a2b3Cb2.js");d.addFileToVFS("Roboto.ttf",r0);d.addFont("Roboto.ttf","Roboto","normal");d.addFileToVFS("Roboto-Bold.ttf",b0);d.addFont("Roboto-Bold.ttf","Roboto","bold");FT="Roboto"}catch{}
  const L=(tr,en)=>ENP?en:tr,UPx=t=>ENP?String(t||"").toLocaleUpperCase("en"):UP(t),kA=t=>ENP?_gxKE(t):t,aA=a=>{const v=alAd(a);return ENP?({serbest:"Without Apparatus",ip:"Rope",cember:"Hoop",top:"Ball",labut:"Clubs",kurdele:"Ribbon",grup_seri1:"Routine 1",grup_seri2:"Routine 2"}[a]||v):v};
  const gB=t=>{const m=/^(\d{4})-(\d{2})-(\d{2})/.exec(String(t||""));if(!m)return"";return new Date(+m[1],+m[2]-1,+m[3]).toLocaleDateString(ENP?"en-GB":"tr-TR",{weekday:"long",day:"numeric",month:"long",year:"numeric"}).toLocaleUpperCase(ENP?"en":"tr-TR")};
  const img=async u=>{try{const b=await(await fetch(u)).blob();const du=await new Promise(K=>{const O=new FileReader;O.onloadend=()=>K(O.result);O.readAsDataURL(b)});const im=new Image;await new Promise(r=>{im.onload=r;im.onerror=r;im.src=du});return im.naturalWidth?{d:du,r:im.naturalWidth/im.naturalHeight}:null}catch{return null}};
  const tcf=await img("/logo.png"),ev=Cp.etkinlikLogo?await img(Cp.etkinlikLogo):null,AP={};await Promise.all(["serbest","ip","cember","top","labut","kurdele"].map(async k=>{const x=await img("/brans/alet/"+k+".png");x&&(AP[k]=x)}));
  let FL={};if(INTL){try{const{bayraklarPng}=await import("./intl-Ul01a2b3Cb2.js");const ks=new Set;plan.gunler.forEach(g=>g.bloklar.forEach(b=>(b.rows||[]).forEach(r=>(r.r||[]).forEach(x=>{const a=x&&sp(x.kat||b.kat,x.a);a&&ks.add(kulupOf(a))}))));FL=await bayraklarPng([...ks])}catch{}}
  const W=210,H=297,M=12,P1=[236,72,153],P2=[139,92,246],INK=[15,23,42],MUT=[100,116,139],ay=plan.ayar||{};
  const ad1=ay.ust1||Cp.isim||"",tarih=[Cp.baslangicTarihi,Cp.bitisTarihi].filter(Boolean).filter((x,i,a)=>a.indexOf(x)===i).map(t=>{const m=/^(\d{4})-(\d{2})-(\d{2})/.exec(t);return m?m[3]+"."+m[2]+"."+m[1]:t}).join(" – "),alt2=[ay.ust2||tarih,ay.ust3||Cp.il||""].filter(Boolean).join("  ·  ");
  const serit=(yy,h)=>{const n=60;for(let i=0;i<n;i++){const t=i/(n-1);d.setFillColor(P1[0]+(P2[0]-P1[0])*t,P1[1]+(P2[1]-P1[1])*t,P1[2]+(P2[2]-P1[2])*t);d.rect(i*W/n,yy,W/n+.3,h,"F")}};
  let y=0,sayfa=0,gunAd="";
  const ust=()=>{if(sayfa++)d.addPage();serit(0,3);let lx=M;const lh=16;
   if(tcf){const w=lh*tcf.r;d.addImage(tcf.d,"PNG",lx,8,w,lh,"tcf","FAST");lx+=w+4}
   if(ev){const w=Math.min(34,lh*ev.r);d.addImage(ev.d,"PNG",W-M-w,8,w,lh,"ev","FAST")}
   d.setTextColor(...INK);d.setFont(FT,"bold");d.setFontSize(12.5);d.text(UPx(ad1),lx,13.5,{maxWidth:W-lx-M-(ev?38:0)});
   d.setFont(FT,"normal");d.setFontSize(8.5);d.setTextColor(...MUT);d.text(alt2,lx,19);
   d.setFont(FT,"bold");d.setFontSize(10);d.setTextColor(...P1);d.text(L("ÇIKIŞ LİSTESİ","START LIST"),lx,25);
   d.setDrawColor(226,232,240);d.setLineWidth(.3);d.line(M,30,W-M,30);y=35};
  const devam=()=>{serit(0,3);d.setFont(FT,"bold");d.setFontSize(7.5);d.setTextColor(...MUT);d.text(UPx(ad1)+"  ·  "+L("ÇIKIŞ LİSTESİ","START LIST")+(gunAd?"  ·  "+gunAd:""),M,10,{maxWidth:W-2*M});d.setDrawColor(226,232,240);d.setLineWidth(.3);d.line(M,13,W-M,13)};
  const yeniSayfa=()=>{d.addPage();sayfa++;devam();y=18};
  const alt=()=>{const n=d.getNumberOfPages();for(let i=1;i<=n;i++){d.setPage(i);serit(H-1.6,1.6);d.setFont(FT,"normal");d.setFontSize(7);d.setTextColor(...MUT);
    d.text(L("Gymexa Score · Türkiye Cimnastik Federasyonu","Gymexa Score · Turkish Gymnastics Federation"),M,H-5);d.text(new Date().toLocaleString(ENP?"en-GB":"tr-TR",{dateStyle:"short",timeStyle:"short"})+"   "+i+" / "+n,W-M,H-5,{align:"right"})}};
  const gunBand=t=>{if(y>H-50)yeniSayfa();d.setFillColor(...P2);d.roundedRect(M,y,W-2*M,9,2,2,"F");d.setFont(FT,"bold");d.setFontSize(10);d.setTextColor(255,255,255);d.text(t,M+4,y+6.2);y+=13};
  // blok başlığı: [saat] KATEGORİ — (simge) ALET ............ GRUP N · x sporcu
  const blokBas=(saat,katT,al,sag)=>{d.setFillColor(253,242,248);d.roundedRect(M,y,W-2*M,9,2,2,"F");d.setFillColor(...P1);d.roundedRect(M,y,2.2,9,1,1,"F");let x=M+5;
   if(saat){d.setFillColor(...P1);d.roundedRect(x,y+1.8,13,5.4,1.6,1.6,"F");d.setFont(FT,"bold");d.setFontSize(8.2);d.setTextColor(255,255,255);d.text(saat,x+6.5,y+5.7,{align:"center"});x+=15.5}
   d.setFont(FT,"bold");d.setFontSize(9.5);d.setTextColor(...INK);const kt=UPx(katT);d.text(kt,x,y+6);x+=d.getTextWidth(kt)+2.5;
   if(al&&al.length){d.setTextColor(...MUT);d.text("—",x,y+6);x+=4;al.forEach(a=>{const ik=AP[a];if(ik){d.addImage(ik.d,"PNG",x,y+1.6,5.8,5.8,"ap_"+a,"FAST");x+=6.8}d.setTextColor(...P1);const t=UPx(aA(a));d.text(t,x,y+6);x+=d.getTextWidth(t)+3})}
   if(sag){d.setFont(FT,"normal");d.setFontSize(7.5);d.setTextColor(...MUT);d.text(sag,W-M-3,y+5.8,{align:"right"})}y+=11};
  const tablo=(head,body,o)=>{at(d,{startY:y,margin:{left:M,right:M,top:18,bottom:12},head:[head],body,theme:"plain",
    styles:{font:FT,fontSize:8.4,cellPadding:{top:1.7,bottom:1.7,left:2,right:2},textColor:INK,lineColor:[238,240,244],lineWidth:{bottom:.25},valign:"middle"},
    headStyles:{fontStyle:"bold",fontSize:7,textColor:[255,255,255],fillColor:P2},...o,
    didParseCell:z=>{if(z.section==="body"&&z.row.index%2)z.cell.styles.fillColor=[250,250,253];o.parse&&o.parse(z)},
    didDrawPage:()=>{if(d.getNumberOfPages()>sayfa){sayfa=d.getNumberOfPages();devam()}}});y=d.lastAutoTable.finalY+7};
  const bayrak=(z,kod)=>{const f0=kod&&FL[kod];if(f0)try{d.addImage(f0,"PNG",z.cell.x+2,z.cell.y+(z.cell.height-3.4)/2,4.5,3.4,"fl_"+kod,"FAST")}catch{}};
  ust();
  plan.gunler.forEach((g,gi)=>{gunAd=gB(g.tarih);if(gi&&y>60)yeniSayfa();gunBand(gunAd||L("GÜN","DAY")+" "+(gi+1));
   g.bloklar.forEach(b=>{
    if(b.tip==="ara"){if(y>H-26)yeniSayfa();d.setFillColor(241,245,249);d.roundedRect(M,y,W-2*M,8,2,2,"F");d.setFont(FT,"bold");d.setFontSize(8.5);d.setTextColor(...MUT);
     d.text(UPx(b.metin||L("ARA","BREAK"))+(b.bas?"   "+b.bas+(b.bit?" – "+b.bit:""):""),W/2,y+5.4,{align:"center"});y+=12;return}
    if(b.tip==="takim"){const T0=takimlar(b.kat),rows=(b.rows||[]).map((r,i)=>{const t=T0.find(x=>x.k===r.g);return{no:i+1,bib:t?.bib||"",ad:t?t.uyeler.join(" · "):r.g,ok:t?.okul||""}});
     if(y+28>H-14)yeniSayfa();blokBas(b.saat||"",kA(b.baslik||katAd(b.kat)),[],(b.egz&&b.egz.length?b.egz.join(" · ")+"  ·  ":"")+rows.length+" "+L("grup","groups"));
     tablo([L("NO","NO"),...(HB?["BIB"]:[]),INTL?L("ÜLKE","NOC"):L("KULÜP","CLUB"),L("SPORCULAR","GYMNASTS")],rows.map(r=>[String(r.no),...(HB?[String(r.bib||"")]:[]),UPx(r.ok),r.ad]),{columnStyles:{0:{cellWidth:11,halign:"center",fontStyle:"bold"},[HB?2:1]:INTL?{cellWidth:22,cellPadding:{top:1.7,bottom:1.7,left:8.5,right:1}}:{cellWidth:46,fontStyle:"bold"}},didDrawCell:z=>{if(INTL&&z.section==="body"&&z.column.index===(HB?2:1))bayrak(z,rows[z.row.index]?.ok)}});return}
    const k=Math.max(1,(b.aletler||[]).length),no=grupNo[b.id];
    for(let rj=0;rj<k;rj++){
     const satir=(b.rows||[]).map((r,i)=>{const c=(r.r||[])[rj]||{},kat=c.kat||b.kat,a=c.a,at0=a?sp(kat,a):null;return{no:i+1,bib:at0?.bib?String(at0.bib):"",ad:a?spAd(kat,a):"",ok:at0?kulupOf(at0):(r.k||""),tk:at0?String(at0.kulup||at0.okul||""):"",al:c.al||"",kat}}).filter(x=>x.ad||x.ok);
     if(!satir.length)continue;
     const alSet=[...new Set(satir.map(x=>x.al).filter(Boolean))],katSet=[...new Set(satir.map(x=>x.kat).filter(Boolean))],karisikAl=alSet.length>1,karisikKat=katSet.length>1;
     const TK=INTL&&satir.some(x=>x.tk&&x.tk!==x.ok);
     if(y+11+8+Math.min(satir.length,3)*7>H-14)yeniSayfa();
     blokBas(rj===0?(b.saat||""):"",karisikKat?katSet.map(c=>kA(katAd(c))).join(" + "):kA(katAd(b.kat||katSet[0])),karisikAl?[]:(alSet.length?alSet:[(b.aletler||[])[rj]].filter(Boolean)),
      (no?L("Grup ","Group ")+no+"  ·  ":"")+(k>1?L("Rotasyon ","Rotation ")+(rj+1)+"  ·  ":"")+satir.length+" "+L("sporcu","gymnasts"));
     const head=[L("NO","NO"),...(HB?["BIB"]:[]),L("SPORCU","GYMNAST"),INTL?L("ÜLKE","NOC"):L("KULÜP","CLUB"),...(TK?[L("TAKIM","TEAM")]:[]),...(karisikKat?[L("KATEGORİ","CATEGORY")]:[]),...(karisikAl?[L("ALET","APPARATUS")]:[])];
     const uc=1+(HB?1:0)+1;
     tablo(head,satir.map(x=>[String(x.no),...(HB?[x.bib]:[]),x.ad,INTL?x.ok:UPx(x.ok),...(TK?[x.tk]:[]),...(karisikKat?[kA(katAd(x.kat))]:[]),...(karisikAl?[UPx(aA(x.al))]:[])]),
      {columnStyles:{0:{cellWidth:11,halign:"center",fontStyle:"bold"},...(HB?{1:{cellWidth:13,halign:"center"}}:{}),[uc-1]:{fontStyle:"bold"},[uc]:INTL?{cellWidth:22,cellPadding:{top:1.7,bottom:1.7,left:8.5,right:1}}:{cellWidth:62}},
       didDrawCell:z=>{if(INTL&&z.section==="body"&&z.column.index===uc)bayrak(z,satir[z.row.index]?.ok)}})}
   })});
  alt();
  const ad=String(Cp.isim||"program").replace(/[^a-zA-Z0-9ğüşöçıİĞÜŞÖÇ ]+/g," ").trim().replace(/\s+/g,"_").slice(0,50)+(ENP?"_Start_List.pdf":"_Cikis_Listesi.pdf");d.save(ad);toast(__T("PDF indirildi."),"success")}catch(er){console.error(er);toast(__T("PDF oluşturulamadı: ")+(er?.message||er),"error")}};

 // ---- görünüm parçaları ----
 const aletChip=(al,on,onClick,kucuk)=>e.jsx("button",{type:"button",onClick,style:{border:"1.5px solid "+(on?ARENK[al]||C.p:C.line),background:on?(ARENK[al]||C.p):"#fff",color:on?"#fff":C.muted,borderRadius:8,padding:kucuk?".12rem .4rem":".25rem .55rem",fontFamily:"inherit",fontWeight:900,fontSize:kucuk?".68rem":".74rem",cursor:"pointer",letterSpacing:".02em"},children:UP(alAd(al))},al);
 const grupBlok=(g,b,bi)=>{const no=grupNo[b.id],acik=ac[b.id]!==!1,al=b.aletler,k=al.length||1,ids=Object.keys(spor[b.kat]||{}).filter(id=>spor[b.kat][id]).sort((x,y)=>spAd(b.kat,x).localeCompare(spAd(b.kat,y),"tr")),kul=new Set(b.rows.map(r=>r.k).filter(Boolean)),digerGruplar=tumBloklar.filter(x=>x.tip==="grup"&&x.id!==b.id&&x.kat===b.kat);
  return e.jsxs("div",{style:{border:"1px solid "+C.line,borderRadius:14,background:"#fff",marginBottom:".7rem",overflow:"hidden"},children:[
   e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:".55rem",padding:".6rem .8rem",background:"linear-gradient(90deg,#FDF2F8,#fff 60%)",borderBottom:acik?"1px solid "+C.line:"none",flexWrap:"wrap"},children:[
    e.jsx("button",{type:"button",style:{...S.ib,border:"none",background:"transparent"},onClick:()=>setAc(o=>({...o,[b.id]:!acik})),children:MI(acik?"expand_less":"expand_more")}),
    e.jsx("span",{style:{fontWeight:900,fontSize:"1.02rem",color:C.p},children:no+". GRUP"}),
    e.jsx("select",{style:{...S.sel,padding:".3rem .5rem",fontSize:".8rem"},value:b.kat,onChange:ev=>blokGuncelle(b.id,x=>{x.kat=ev.target.value;x.aletler=katAlet(x.kat).slice(0,2);x.rows=[]}),children:bireyKat.map(c=>e.jsx("option",{value:c,children:katAd(c)},c))}),
    e.jsx("span",{style:S.chip(C.ink2,C.soft),children:b.rows.length+" "+__T("sporcu")+" · "+kul.size+" "+__T("kulüp")}),
    e.jsx("span",{style:{display:"inline-flex",gap:".25rem",alignItems:"center"},children:katAlet(b.kat).map(a=>aletChip(a,al.includes(a),()=>blokGuncelle(b.id,x=>{x.aletler=x.aletler.includes(a)?x.aletler.filter(z=>z!==a):[...x.aletler,a];const kk=x.aletler.length||1;x.rows.forEach((r,i)=>{r.r=x.aletler.map((_,ri)=>({a:(r.r[ri]||r.r[0]||{}).a||"",al:x.aletler[(i+ri)%kk]}))})}),!0))}),
    e.jsx("input",{type:"time",value:b.saat||"",onChange:ev=>blokGuncelle(b.id,x=>{x.saat=ev.target.value}),title:__T("Başlangıç saati (isteğe bağlı)"),style:{...S.inp,padding:".3rem .45rem",fontSize:".8rem",width:96}}),
    e.jsx("span",{style:{flex:1}}),
    e.jsx("button",{type:"button",style:S.ib,title:__T("Aletleri yeniden dağıt (sırayla)"),onClick:()=>aletleriYenidenDagit(b.id),children:MI("swap_vert",{fontSize:"1rem"})}),
    e.jsx("button",{type:"button",style:S.ib,title:__T("Yukarı"),onClick:()=>blokTasi(g.id,bi,-1),children:MI("arrow_upward",{fontSize:"1rem"})}),
    e.jsx("button",{type:"button",style:S.ib,title:__T("Aşağı"),onClick:()=>blokTasi(g.id,bi,1),children:MI("arrow_downward",{fontSize:"1rem"})}),
    e.jsx("button",{type:"button",style:{...S.ib,color:"#DC2626"},title:__T("Grubu sil"),onClick:()=>blokSil(g.id,bi),children:MI("delete",{fontSize:"1rem"})})]}),
   acik?e.jsxs("div",{style:{overflowX:"auto"},children:[
    e.jsxs("table",{style:{width:"100%",borderCollapse:"collapse",fontSize:".82rem",minWidth:560},children:[
     e.jsx("thead",{children:e.jsxs("tr",{style:{background:C.soft,color:C.muted,fontSize:".68rem",textTransform:"uppercase",letterSpacing:".04em"},children:[e.jsx("th",{style:{padding:".4rem .5rem",width:34,textAlign:"right"},children:"SN"}),e.jsx("th",{style:{padding:".4rem .5rem",textAlign:"left"},children:INTL?"NOC":__T("Kulüp")}),...al.map((_,ri)=>e.jsx("th",{style:{padding:".4rem .5rem",textAlign:"left"},children:(ri+1)+". "+__T("Rotasyon")},ri)),e.jsx("th",{style:{width:128}})]})}),
     e.jsx("tbody",{children:b.rows.map((r,i)=>e.jsxs("tr",{style:{borderTop:"1px solid #EEF2F7"},children:[
      e.jsx("td",{style:{padding:".35rem .5rem",textAlign:"right",fontWeight:900,color:C.ink2},children:i+1}),
      e.jsx("td",{style:{padding:".35rem .5rem",fontWeight:800,fontSize:".76rem",color:C.ink2,maxWidth:180,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},title:r.k,children:UP(r.k)||"—"}),
      ...al.map((_,ri)=>{const c=r.r[ri]||{a:"",al:al[ri]};return e.jsx("td",{style:{padding:".3rem .5rem"},children:e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:".35rem"},children:[
       e.jsxs("select",{value:c.a||"",onChange:ev=>blokGuncelle(b.id,x=>{const rr=x.rows[i];rr.r[ri]={...(rr.r[ri]||{al:al[ri]}),a:ev.target.value};if(ri===0&&ev.target.value)rr.k=kulupOf(sp(x.kat,ev.target.value))}),style:{...S.sel,padding:".28rem .4rem",fontSize:".78rem",maxWidth:200,fontWeight:800},children:[e.jsx("option",{value:"",children:"—"}),ids.map(id=>e.jsx("option",{value:id,children:spAd(b.kat,id)+(ri>0||!r.k?"":kulupOf(sp(b.kat,id))!==r.k?" ("+kulupOf(sp(b.kat,id))+")":"")},id))]}),
       e.jsx("span",{style:{display:"inline-flex",gap:".2rem"},children:al.map(a=>aletChip(a,c.al===a,()=>blokGuncelle(b.id,x=>{const rr=x.rows[i];rr.r[ri]={...(rr.r[ri]||{a:""}),al:a}}),!0))})]})},ri)}),
      e.jsx("td",{style:{padding:".3rem .5rem",whiteSpace:"nowrap",textAlign:"right"},children:e.jsxs("span",{style:{display:"inline-flex",gap:".25rem"},children:[
       e.jsx("button",{type:"button",style:S.ib,title:__T("Yukarı"),onClick:()=>satirTasi(b.id,i,-1),children:MI("keyboard_arrow_up",{fontSize:"1rem"})}),
       e.jsx("button",{type:"button",style:S.ib,title:__T("Aşağı"),onClick:()=>satirTasi(b.id,i,1),children:MI("keyboard_arrow_down",{fontSize:"1rem"})}),
       digerGruplar.length?e.jsxs("select",{value:"",title:__T("Başka gruba taşı"),onChange:ev=>ev.target.value&&satirGrubaTasi(b.id,i,ev.target.value),style:{...S.ib,width:30,appearance:"none",WebkitAppearance:"none",textAlign:"center",fontSize:".7rem",fontWeight:900,color:C.ink2,background:"#fff url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24'%3E%3Cpath fill='%23334155' d='M10 9V5l-7 7 7 7v-4.1c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11z' transform='scale(-1,1) translate(-24,0)'/%3E%3C/svg%3E\") no-repeat center",color:"transparent"},children:[e.jsx("option",{value:"",children:"→"}),digerGruplar.map(x=>e.jsx("option",{value:x.id,children:grupNo[x.id]+". "+__T("gruba taşı")},x.id))]}):null,
       e.jsx("button",{type:"button",style:{...S.ib,color:"#DC2626"},title:__T("Satırı sil"),onClick:()=>satirSil(b.id,i),children:MI("close",{fontSize:"1rem"})})]})})]},i))})]}),
    e.jsxs("div",{style:{display:"flex",gap:".5rem",alignItems:"center",padding:".55rem .8rem",borderTop:"1px solid #EEF2F7",flexWrap:"wrap"},children:[
     e.jsxs("select",{value:"",onChange:ev=>ev.target.value&&sporcuEkle(b.id,b.kat,ev.target.value),style:{...S.sel,padding:".35rem .55rem",fontSize:".8rem",maxWidth:320},children:[e.jsx("option",{value:"",children:"+ "+__T("Sporcu ekle…")}),ids.filter(id=>!yer[b.kat+"|"+id]).map(id=>e.jsx("option",{value:id,children:spAd(b.kat,id)+" · "+kulupOf(sp(b.kat,id))},id)),ids.some(id=>yer[b.kat+"|"+id])?e.jsx("optgroup",{label:__T("Zaten listede olanlar"),children:ids.filter(id=>yer[b.kat+"|"+id]).map(id=>e.jsx("option",{value:id,children:spAd(b.kat,id)+" · "+kulupOf(sp(b.kat,id))},id))}):null]}),
     e.jsx("span",{style:{fontSize:".74rem",fontWeight:700,color:C.muted},children:__T("Satır sırası = çıkış sırası. Her rotasyonda sporcu ve aleti ayrı seçilebilir (ör. 2. rotasyonda aynı kulübün başka sporcusu).")})]})]}):null]},b.id)};
 const araBlok=(g,b,bi)=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:".5rem",padding:".55rem .8rem",border:"1px dashed #F9A8D4",borderRadius:14,background:"#FFF7FB",marginBottom:".7rem",flexWrap:"wrap"},children:[
   MI("coffee",{color:C.p}),e.jsx("input",{value:b.metin||"",onChange:ev=>blokGuncelle(b.id,x=>{x.metin=ev.target.value}),placeholder:__T("Örn. ÖĞLE ARASI / AÇILIŞ SEREMONİSİ / ÖDÜL TÖRENİ"),style:{...S.inp,flex:"1 1 260px",fontWeight:900,background:"#fff"}}),
   e.jsx("input",{type:"time",value:b.bas||"",onChange:ev=>blokGuncelle(b.id,x=>{x.bas=ev.target.value}),style:{...S.inp,width:100,background:"#fff"}}),e.jsx("span",{style:{fontWeight:800,color:C.muted},children:"–"}),e.jsx("input",{type:"time",value:b.bit||"",onChange:ev=>blokGuncelle(b.id,x=>{x.bit=ev.target.value}),style:{...S.inp,width:100,background:"#fff"}}),
   ["ÖĞLE ARASI","AÇILIŞ SEREMONİSİ","ÖDÜL TÖRENİ"].map(t=>e.jsx("button",{type:"button",style:{...S.ghost,padding:".3rem .55rem",fontSize:".72rem"},onClick:()=>blokGuncelle(b.id,x=>{x.metin=t}),children:t},t)),
   e.jsx("span",{style:{flex:1}}),e.jsx("button",{type:"button",style:S.ib,onClick:()=>blokTasi(g.id,bi,-1),children:MI("arrow_upward",{fontSize:"1rem"})}),e.jsx("button",{type:"button",style:S.ib,onClick:()=>blokTasi(g.id,bi,1),children:MI("arrow_downward",{fontSize:"1rem"})}),e.jsx("button",{type:"button",style:{...S.ib,color:"#DC2626"},onClick:()=>blokSil(g.id,bi),children:MI("delete",{fontSize:"1rem"})})]},b.id);
 const takimBlok=(g,b,bi)=>{const tl=takimlar(b.kat);return e.jsxs("div",{style:{border:"1px solid "+C.line,borderRadius:14,background:"#fff",marginBottom:".7rem",overflow:"hidden"},children:[
   e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:".55rem",padding:".6rem .8rem",background:"linear-gradient(90deg,#ECFDF5,#fff 60%)",borderBottom:"1px solid "+C.line,flexWrap:"wrap"},children:[MI("groups",{color:"#059669"}),
    e.jsx("input",{value:b.baslik||"",onChange:ev=>blokGuncelle(b.id,x=>{x.baslik=ev.target.value}),style:{...S.inp,fontWeight:900,width:200,background:"#fff"}}),
    e.jsx("select",{style:{...S.sel,padding:".3rem .5rem",fontSize:".8rem"},value:b.kat,onChange:ev=>blokGuncelle(b.id,x=>{x.kat=ev.target.value;x.baslik=UP(katAd(x.kat));x.rows=takimlar(x.kat).map(t=>({g:t.k}))}),children:grupKat.map(c=>e.jsx("option",{value:c,children:katAd(c)},c))}),
    e.jsx("span",{style:{fontSize:".72rem",fontWeight:800,color:C.muted},children:__T("Egzersizler")}),
    e.jsx("input",{value:(b.egz||[]).join(", "),onChange:ev=>blokGuncelle(b.id,x=>{x.egz=ev.target.value.split(",").map(s=>s.trim()).filter(Boolean)}),placeholder:__T("5xİP, 5xİP"),style:{...S.inp,width:140,background:"#fff"}}),
    e.jsx("span",{style:{flex:1}}),e.jsx("button",{type:"button",style:S.ib,title:__T("Kurayla karıştır"),onClick:()=>blokGuncelle(b.id,x=>{x.rows=karistir(x.rows)}),children:MI("shuffle",{fontSize:"1rem"})}),e.jsx("button",{type:"button",style:S.ib,onClick:()=>blokTasi(g.id,bi,-1),children:MI("arrow_upward",{fontSize:"1rem"})}),e.jsx("button",{type:"button",style:S.ib,onClick:()=>blokTasi(g.id,bi,1),children:MI("arrow_downward",{fontSize:"1rem"})}),e.jsx("button",{type:"button",style:{...S.ib,color:"#DC2626"},onClick:()=>blokSil(g.id,bi),children:MI("delete",{fontSize:"1rem"})})]}),
   b.rows.map((r,i)=>{const t=tl.find(x=>x.k===r.g);return e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:".6rem",padding:".45rem .8rem",borderTop:i?"1px solid #EEF2F7":"none"},children:[e.jsx("span",{style:{fontWeight:900,width:22,textAlign:"right",color:C.ink2},children:i+1}),e.jsxs("div",{style:{flex:1,minWidth:0},children:[e.jsx("div",{style:{fontWeight:800,fontSize:".82rem"},children:t?t.uyeler.join(" - "):r.g}),e.jsx("div",{style:{fontSize:".72rem",fontWeight:800,color:C.muted},children:UP(t?.okul||"")})]}),(b.egz||[]).map((x,j)=>e.jsx("span",{style:S.chip("#047857","#D1FAE5"),children:x},j)),e.jsx("button",{type:"button",style:S.ib,onClick:()=>blokGuncelle(b.id,x=>{if(i>0)[x.rows[i-1],x.rows[i]]=[x.rows[i],x.rows[i-1]]}),children:MI("keyboard_arrow_up",{fontSize:"1rem"})}),e.jsx("button",{type:"button",style:S.ib,onClick:()=>blokGuncelle(b.id,x=>{if(i<x.rows.length-1)[x.rows[i+1],x.rows[i]]=[x.rows[i],x.rows[i+1]]}),children:MI("keyboard_arrow_down",{fontSize:"1rem"})}),e.jsx("button",{type:"button",style:{...S.ib,color:"#DC2626"},onClick:()=>blokGuncelle(b.id,x=>{x.rows.splice(i,1)}),children:MI("close",{fontSize:"1rem"})})]},r.g)}),
   tl.some(t=>!b.rows.find(r=>r.g===t.k))?e.jsx("div",{style:{padding:".5rem .8rem",borderTop:"1px solid #EEF2F7"},children:e.jsxs("select",{value:"",onChange:ev=>ev.target.value&&blokGuncelle(b.id,x=>{x.rows.push({g:ev.target.value})}),style:{...S.sel,padding:".35rem .55rem",fontSize:".8rem"},children:[e.jsx("option",{value:"",children:"+ "+__T("Grup ekle…")}),tl.filter(t=>!b.rows.find(r=>r.g===t.k)).map(t=>e.jsx("option",{value:t.k,children:UP(t.okul)+" · "+t.uyeler.length+" "+__T("sporcu")},t.k))]})}):null]},b.id)};

 const kuraModal=kura&&(()=>{const f=kura,s2=(k,v)=>setKura(o=>({...o,[k]:v})),al=katAlet(f.cat),n=Object.keys(spor[f.cat]||{}).length;
  return e.jsx("div",{style:S.ov,onClick:ev=>{ev.target===ev.currentTarget&&setKura(null)},children:e.jsxs("div",{style:S.modal,children:[
   e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:".5rem",fontSize:"1.1rem",fontWeight:900},children:[MI("casino",{color:C.p}),__T("Kura Sihirbazı")]}),
   e.jsx("div",{style:{fontSize:".8rem",fontWeight:700,color:C.muted,marginTop:".3rem"},children:__T("Kategorinin sporcuları çıkış gruplarına dağıtılır; aynı kulübün sporcuları aynı grupta tutulur ve sıralamada kulüpler karıştırılır. Satırlar sırayla aletleri değiştirir (1. satır Top → 2. rotasyonda Labut).")}),
   e.jsx("label",{style:S.lbl,children:__T("Kategori")}),e.jsx("select",{style:{...S.sel,width:"100%"},value:f.cat,onChange:ev=>setKura(o=>({...o,cat:ev.target.value,aletler:katAlet(ev.target.value).slice(0,2)})),children:bireyKat.map(c=>e.jsx("option",{value:c,children:katAd(c)+" ("+Object.keys(spor[c]||{}).length+")"},c))}),
   e.jsx("label",{style:S.lbl,children:__T("Aletler (rotasyon sırasıyla)")}),e.jsx("div",{style:{display:"flex",gap:".35rem",flexWrap:"wrap"},children:al.map(a=>aletChip(a,f.aletler.includes(a),()=>s2("aletler",f.aletler.includes(a)?f.aletler.filter(x=>x!==a):[...f.aletler,a])))}),
   e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:".6rem"},children:[e.jsxs("div",{children:[e.jsx("label",{style:S.lbl,children:__T("Grup büyüklüğü (en fazla)")}),e.jsx("input",{type:"number",min:2,max:60,style:{...S.inp,width:"100%"},value:f.boy,onChange:ev=>s2("boy",ev.target.value)})]}),e.jsxs("div",{children:[e.jsx("label",{style:S.lbl,children:__T("Gün")}),e.jsx("select",{style:{...S.sel,width:"100%"},value:f.gun,onChange:ev=>s2("gun",ev.target.value),children:plan.gunler.map(g=>e.jsx("option",{value:g.id,children:gunBaslik(g.tarih)||g.tarih},g.id))})]})]}),
   e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:".45rem",marginTop:".8rem",fontWeight:800,fontSize:".85rem",cursor:"pointer"},children:[e.jsx("input",{type:"checkbox",checked:f.kulupBirlikte,onChange:ev=>s2("kulupBirlikte",ev.target.checked)}),__T("Aynı kulübün sporcuları aynı grupta olsun")]}),
   e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:".45rem",marginTop:".45rem",fontWeight:800,fontSize:".85rem",cursor:"pointer"},children:[e.jsx("input",{type:"checkbox",checked:f.sadeceEksik,onChange:ev=>s2("sadeceEksik",ev.target.checked)}),__T("Yalnızca henüz listede olmayan sporcular")]}),
   e.jsxs("div",{style:{marginTop:".7rem",fontSize:".8rem",fontWeight:800,color:C.ink2,background:C.soft,borderRadius:10,padding:".55rem .7rem"},children:[n+" "+__T("sporcu")+" → ~"+Math.max(1,Math.ceil(n/Math.max(2,parseInt(f.boy)||16)))+" "+__T("grup")+" · "+(f.aletler.length||0)+" "+__T("rotasyon")]}),
   e.jsxs("div",{style:{display:"flex",gap:".6rem",marginTop:"1rem"},children:[e.jsx("button",{type:"button",style:{...S.ghost,flex:1,justifyContent:"center"},onClick:()=>setKura(null),children:__T("Vazgeç")}),e.jsxs("button",{type:"button",style:{...S.btn(C.p),flex:2,justifyContent:"center"},onClick:()=>kuraCek(f),children:[MI("casino"),__T("Kura Çek")]})]})]})})})();

 const sorun=eksikler.reduce((a,x)=>a+x.yok.length+x.kismi.length+x.cift.length,0);
 return e.jsxs("div",{style:S.wrap,children:[
  e.jsx("div",{style:S.top,children:e.jsxs("div",{style:S.topIn,children:[
   e.jsx("a",{href:"/rhythmic",style:S.back,title:__T("Geri"),children:MI("arrow_back",{fontSize:"1.4rem"})}),e.jsx("div",{style:S.ico,children:MI("event_note",{fontSize:"1.4rem"})}),
   e.jsxs("div",{style:{minWidth:0,flex:1},children:[e.jsx("div",{style:{fontWeight:900,fontSize:"1.15rem",lineHeight:1.15},children:__T("Program & Çıkış Listesi")}),e.jsx("div",{style:{fontSize:".8rem",fontWeight:700,color:C.muted,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:Cp.isim||__T("Ritmik · gün, çıkış grubu, rotasyon ve kura listesi")})]}),
   e.jsxs("button",{type:"button",style:S.ghost,onClick:onEski,title:__T("Eski Program sayfasını aç"),children:[MI("history"),__T("Eski versiyon")]})]})}),
  e.jsxs("div",{style:S.in,children:[
   e.jsxs("div",{style:{...S.card,display:"flex",gap:".6rem",flexWrap:"wrap",alignItems:"center"},children:[
    e.jsxs("select",{style:{...S.sel,flex:"1 1 280px"},value:comp,onChange:async ev=>{const v=ev.target.value;if(kirli&&!await await window.__gxConfirm(__T("Kaydedilmemiş değişiklikler var. Yarışma değiştirilsin mi?"),{title:__T("Kaydedilmedi"),type:"warning"}))return;setKirli(!1);yuklendi.current="";setComp(v)},children:[e.jsx("option",{value:"",children:__T("— Yarışma seçin —")}),list.map(([id,c])=>e.jsx("option",{value:id,children:c.isim||id},id))]}),
    comp&&plan?e.jsxs(e.Fragment,{children:[
     e.jsxs("button",{type:"button",style:{...S.btn(kirli?C.p:"#16A34A"),opacity:busy?.6:1},disabled:busy,onClick:kaydet,children:[MI(kirli?"save":"cloud_done"),kirli?__T("Kaydet"):__T("Kaydedildi")]}),
     e.jsxs("button",{type:"button",style:S.ghost,onClick:()=>setKura({cat:bireyKat[0]||"",aletler:katAlet(bireyKat[0]||"").slice(0,2),boy:16,gun:plan.gunler[0]?.id,kulupBirlikte:!0,sadeceEksik:!0}),children:[MI("casino",{color:C.p}),__T("Kura Sihirbazı")]}),
     e.jsxs("button",{type:"button",style:S.ghost,onClick:pdf,children:[MI("picture_as_pdf",{color:"#DC2626"}),__T("PDF")]}),
     e.jsxs("button",{type:"button",style:S.ghost,onClick:aktar,disabled:busy||kirli,title:kirli?__T("Önce kaydedin"):"",children:[MI("sports_score",{color:"#2563EB"}),__T("Puanlamaya aktar")]}),
     e.jsxs("button",{type:"button",style:S.ghost,onClick:()=>setAyarAc(v=>!v),children:[MI("tune"),__T("Başlık")]})]}):null]}),
   comp&&plan&&ayarAc?e.jsxs("div",{style:S.card,children:[e.jsx("div",{style:{fontWeight:900,marginBottom:".3rem"},children:__T("PDF üst bilgisi")}),["ust1","ust2","ust3"].map((k,i)=>e.jsx("input",{value:plan.ayar?.[k]??"",placeholder:[__T("TÜRKİYE CİMNASTİK FEDERASYONU"),UP(Cp.isim||__T("Yarışma adı")),__T("15 - 18 Ekim 2026 / İstanbul")][i],onChange:ev=>degis(n=>{n.ayar=n.ayar||{};n.ayar[k]=ev.target.value}),style:{...S.inp,width:"100%",marginTop:".4rem"}},k))]}):null,
   !comp?e.jsxs("div",{style:{...S.card,textAlign:"center",padding:"3rem 1rem",color:C.muted,fontWeight:700},children:[MI("emoji_events",{fontSize:"2.6rem",display:"block",margin:"0 auto .5rem",color:C.sub}),__T("Çıkış listesini hazırlamak için yarışma seçin.")]}):!plan?null:
   e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"minmax(0,1fr) 300px",gap:"1rem",alignItems:"start"},className:"rtp-grid",children:[
    e.jsx("style",{children:"@media(max-width:1000px){.rtp-grid{grid-template-columns:1fr!important}.rtp-side{position:static!important}}"}),
    e.jsxs("div",{children:[
     plan.gunler.map((g,gi)=>e.jsxs("div",{style:S.card,children:[
      e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:".6rem",marginBottom:".8rem",flexWrap:"wrap"},children:[e.jsx("span",{style:{...S.chip("#fff",C.p),fontSize:".72rem"},children:(gi+1)+". "+__T("GÜN")}),e.jsx("span",{style:{fontWeight:900,fontSize:"1.05rem"},children:gunBaslik(g.tarih)}),e.jsx("input",{type:"date",value:g.tarih||"",onChange:ev=>degis(n=>{gunBul(n,g.id).tarih=ev.target.value}),style:{...S.inp,padding:".35rem .5rem",fontSize:".8rem"}}),e.jsx("span",{style:{flex:1}}),plan.gunler.length>1?e.jsxs("button",{type:"button",style:{...S.ghost,color:"#DC2626",padding:".35rem .6rem"},onClick:()=>gunSil(g.id),children:[MI("delete",{fontSize:"1rem"}),__T("Günü sil")]}):null]}),
      g.bloklar.length===0?e.jsx("div",{style:{padding:"1.2rem",textAlign:"center",color:C.muted,fontWeight:700,border:"1px dashed "+C.line,borderRadius:12,marginBottom:".7rem"},children:__T("Bu günde henüz blok yok — Kura Sihirbazı ile grupları oluşturun ya da aşağıdan ekleyin.")}):null,
      g.bloklar.map((b,bi)=>b.tip==="ara"?araBlok(g,b,bi):b.tip==="takim"?takimBlok(g,b,bi):grupBlok(g,b,bi)),
      e.jsxs("div",{style:{display:"flex",gap:".5rem",flexWrap:"wrap"},children:[e.jsxs("button",{type:"button",style:S.ghost,onClick:()=>yeniGrup(g.id),children:[MI("playlist_add",{color:C.p}),__T("Çıkış Grubu")]}),e.jsxs("button",{type:"button",style:S.ghost,onClick:()=>yeniAra(g.id),children:[MI("coffee",{color:"#D97706"}),__T("Ara / Tören")]}),grupKat.length?e.jsxs("button",{type:"button",style:S.ghost,onClick:()=>yeniTakim(g.id),children:[MI("groups",{color:"#059669"}),__T("Grup Yarışması")]}):null]})]},g.id)),
     e.jsxs("button",{type:"button",style:{...S.ghost,width:"100%",justifyContent:"center",padding:".75rem",borderStyle:"dashed"},onClick:gunEkle,children:[MI("add"),__T("Gün ekle")]})]}),
    e.jsxs("div",{className:"rtp-side",style:{position:"sticky",top:84},children:[
     e.jsxs("div",{style:S.card,children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:".4rem",fontWeight:900,marginBottom:".5rem"},children:[MI("fact_check",{color:sorun?"#D97706":"#16A34A"}),__T("Kontrol")]}),
      eksikler.length===0?e.jsx("div",{style:{fontSize:".8rem",color:C.muted,fontWeight:700},children:__T("Bireysel kategori yok.")}):eksikler.map(x=>{const tam=x.ids.length-x.yok.length-x.kismi.length;return e.jsxs("div",{style:{padding:".5rem 0",borderTop:"1px solid #EEF2F7"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",gap:".4rem",fontWeight:900,fontSize:".84rem"},children:[e.jsx("span",{children:katAd(x.c)}),e.jsx("span",{style:S.chip(tam===x.ids.length&&!x.cift.length?"#15803D":"#B45309",tam===x.ids.length&&!x.cift.length?"#DCFCE7":"#FEF3C7"),children:tam+"/"+x.ids.length})]}),
       x.yok.length?e.jsxs("details",{style:{marginTop:".3rem"},children:[e.jsx("summary",{style:{fontSize:".76rem",fontWeight:800,color:"#B45309",cursor:"pointer"},children:x.yok.length+" "+__T("sporcu listede yok")}),e.jsx("div",{style:{fontSize:".74rem",fontWeight:700,color:C.ink2,marginTop:".25rem",lineHeight:1.5},children:x.yok.map(id=>spAd(x.c,id)+" · "+kulupOf(sp(x.c,id))).join("\n").split("\n").map((t,i)=>e.jsx("div",{children:t},i))})]}):null,
       x.kismi.length?e.jsx("div",{style:{fontSize:".74rem",fontWeight:800,color:"#B45309",marginTop:".2rem"},children:x.kismi.length+" "+__T("sporcunun bazı aletleri eksik")}):null,
       x.cift.length?e.jsx("div",{style:{fontSize:".74rem",fontWeight:800,color:"#DC2626",marginTop:".2rem"},children:x.cift.length+" "+__T("sporcu aynı alette iki kez")}):null]},x.c)}),
      grupKat.map(c=>{const tl=takimlar(c),n=tl.filter(t=>takimYer.has(t.k)).length;return e.jsxs("div",{style:{padding:".5rem 0",borderTop:"1px solid #EEF2F7",display:"flex",justifyContent:"space-between",fontWeight:900,fontSize:".84rem"},children:[e.jsx("span",{children:katAd(c)}),e.jsx("span",{style:S.chip(n===tl.length?"#15803D":"#B45309",n===tl.length?"#DCFCE7":"#FEF3C7"),children:n+"/"+tl.length+" "+__T("grup")})]},c)})]}),
     e.jsxs("div",{style:{...S.card,fontSize:".78rem",fontWeight:700,color:C.muted,lineHeight:1.55},children:[e.jsx("div",{style:{fontWeight:900,color:C.ink,marginBottom:".3rem"},children:__T("Nasıl çalışır?")}),
      e.jsx("div",{children:__T("1. Günleri ekleyin, Kura Sihirbazı ile her kategori için çıkış gruplarını oluşturun.")}),e.jsx("div",{children:__T("2. Gerekirse sıraları, sporcuları ve aletleri elle düzeltin; aralara Öğle Arası / Tören ekleyin.")}),e.jsx("div",{children:__T("3. Kaydedin ve PDF alın. “Puanlamaya aktar” çıkış gruplarını puanlama ekranının rotasyon sırası yapar.")})]})]})]}),
   kuraModal]})]})}

function RitmikProgram(){usInit();
 const[eski,setEski]=R.useState(()=>{try{return localStorage.getItem(ESKI_KEY)==="1"}catch{return!1}});
 const sec=v=>{try{localStorage.setItem(ESKI_KEY,v?"1":"0")}catch{}setEski(v)};
 if(eski)return e.jsxs(e.Fragment,{children:[e.jsx(R.Suspense,{fallback:e.jsx("div",{style:{padding:"3rem",textAlign:"center",color:"#6B7280",fontWeight:700,fontFamily:"Nunito,system-ui,sans-serif"},children:__T("Eski sayfa yükleniyor…")}),children:e.jsx(EskiSayfa,{})}),
  e.jsxs("button",{type:"button",onClick:()=>sec(!1),title:__T("Yeni Program & Çıkış Listesi sayfasına dön"),style:{position:"fixed",right:16,bottom:64,zIndex:9000,display:"inline-flex",alignItems:"center",gap:".4rem",border:"none",borderRadius:999,padding:".7rem 1.1rem",background:"#DB2777",color:"#fff",fontFamily:"Nunito,system-ui,sans-serif",fontWeight:900,fontSize:".88rem",cursor:"pointer",boxShadow:"0 10px 26px rgba(219,39,119,.4)"},children:[MI("auto_awesome"),__T("Yeni versiyon")]})]});
 return e.jsx(Program,{onEski:()=>sec(!0)})}
export{RitmikProgram as default};
