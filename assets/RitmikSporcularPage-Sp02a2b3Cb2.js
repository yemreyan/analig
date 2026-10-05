import"./i18n-Tr01a2b3Cb2.js";import{b as usToast,a as usInit,j as e,d as db,u as usAuth,l as logAction}from"./main-C2LpyYUGCb2.js";import{r as R}from"./vendor-react-Cxw6bqwhCb2.js";import{k as ref,o as onValue,m as update,l as fbGet}from"./vendor-firebase-940mxgRVCb2.js";import{utils as XU,writeFile as XW,read as XR}from"./vendor-xlsx-CNerDvZXCb2.js";import{R as RC}from"./ritmikCriteriaDefaults-CgOlnfQcCb2.js";import{isIntl,ulkeKod,UlkeEtiket,UlkeSecenekleri,sporcuUlke,ulkeAd as __ulkeAd}from"./intl-Ul01a2b3Cb2.js";import"./modulepreload-polyfill-B5Qt9EMXCb2.js";

// Ritmik Sporcular — aerobik Sporcular sayfasıyla aynı standart yapı (bireysel / grup).
// Grup kategorilerinde kulüp + grup no = bir grup; puan anahtarı "<kat>::<kulüp>::<grupNo>" (Final Oluştur ile aynı).
// "Eski versiyon" düğmesi, eski ortak Sporcular sayfasını (AthletesPage) aynen açar.
const BASE="ritmik_yarismalar";
const ESKI_KEY="tcfRtSporcuEski";
const EskiSayfa=R.lazy(()=>{try{if(!document.querySelector('link[data-eski-sporcu]')){const l=document.createElement("link");l.rel="stylesheet";l.href="/assets/AthletesPage-BKULMEopCb2.css";l.setAttribute("data-eski-sporcu","1");document.head.appendChild(l)}}catch{}return import("./AthletesPage-DgsUZMZnCb4.js")});

const baseCat=c=>String(c||"").replace(/^final_/,"").split("__")[0];
const isFinal=c=>/^final_/.test(String(c||""));
const cfg=c=>RC[c]||RC[baseCat(c)]||{};
const isMulti=c=>{const d=cfg(c);return d.grupMu===!0||d.tip==="takim"||d.athleteCount>1||/_grup$/.test(baseCat(c))};
const typeOf=c=>isMulti(c)?"grup":"bireysel";
const TIP_SIRA=["bireysel","grup","diger"];
const TIP_AD={bireysel:__T("Bireysel"),grup:__T("Grup"),diger:__T("Diğer")};
const TIP_RENK={bireysel:"#DB2777",grup:"#059669",diger:"#64748B"};
const YAS_SIRA=["minik","minikler","kucuk","kucukler","yildiz","yildizlar","genc","gencler","buyuk","buyukler"];
const yasOf=c=>baseCat(c).split("_")[0];
const kisiSayisi=c=>isMulti(c)?5:1;
const grupKey=(cat,okul,gn)=>String(cat+"::"+String(okul||"").trim()+"::"+gn).trim().replace(/[.#$[\]/]/g,"-").slice(0,60);
const ALET_AD={cember:"Çember",top:"Top",labut:"Labut",kurdele:"Kurdele",ip:"İp",serbest:"Serbest",grup_seri1:"1. Seri",grup_seri2:"2. Seri"};
// ritmik puanı alet bazında: puanlar/<kat>/<id>/<alet>/sonuc ; toplam = alet sonuçlarının toplamı
const puanOzet=p=>{if(!p||typeof p!=="object")return null;let t=0,n=0,dur=!1;Object.entries(p).forEach(([k,v])=>{if(v&&typeof v==="object"){if(v.sonuc!=null&&!isNaN(v.sonuc)){t+=Number(v.sonuc);n++}if(v.durum||v.aPanel||v.ePanel||v.dPanel)dur=!0}});if(p.sonuc!=null&&!isNaN(p.sonuc))return{t:Number(p.sonuc),n:n||1};return n||dur?{t,n}:null};
const san=v=>String(v||"").trim().replace(/[.#$[\]/]/g,"-").slice(0,60);
const UP=s=>String(s||"").toLocaleUpperCase("tr-TR");
const yeniId=()=>"m"+Date.now().toString(36)+Math.random().toString(36).slice(2,8);
const adBol=nm=>{const p=String(nm||"").trim().split(/\s+/).filter(Boolean);const soyad=p.length>1?p.pop():"";return{ad:p.join(" "),soyad}};
const kisiAd=m=>(m.adSoyad||[m.ad,m.soyad].filter(Boolean).join(" ")).trim();
const maskele=t=>{const s=String(t||"").trim();if(!s)return"";return s.length<=4?"***":s.slice(0,3)+"*".repeat(Math.max(3,s.length-5))+s.slice(-2)};

const C={bg:"#F0F2F5",card:"#fff",soft:"#F8FAFC",line:"#E5E7EB",ink:"#1A1D26",ink2:"#334155",muted:"#6B7280",sub:"#94A3B8",p:"#EC4899"};
const S={
 wrap:{minHeight:"100vh",background:C.bg,color:C.ink,fontFamily:"Nunito,system-ui,-apple-system,sans-serif",paddingBottom:"3rem"},
 top:{position:"sticky",top:0,zIndex:20,background:"#fff",borderBottom:"1px solid "+C.line,boxShadow:"0 1px 3px rgba(0,0,0,.06)"},
 topIn:{maxWidth:1180,margin:"0 auto",minHeight:68,padding:".5rem 1.25rem",display:"flex",alignItems:"center",gap:".9rem",flexWrap:"wrap"},
 back:{width:38,height:38,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",color:C.ink,textDecoration:"none",flexShrink:0},
 ico:{width:44,height:44,borderRadius:12,background:"linear-gradient(135deg,#a855f7,#ec4899)",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 6px 18px rgba(236,72,153,.32)",flexShrink:0},
 in:{maxWidth:1180,margin:"0 auto",padding:"1.1rem 1.25rem"},
 card:{background:C.card,border:"1px solid "+C.line,borderRadius:16,padding:"1rem 1.1rem",marginBottom:"1rem"},
 sel:{background:C.soft,border:"1px solid "+C.line,borderRadius:12,padding:".6rem .75rem",fontFamily:"inherit",fontSize:".9rem",fontWeight:700,color:C.ink,minWidth:0},
 inp:{background:C.soft,border:"1px solid "+C.line,borderRadius:12,padding:".6rem .75rem",fontFamily:"inherit",fontSize:".9rem",fontWeight:700,color:C.ink,width:"100%",outline:"none"},
 btn:(bg,fg)=>({display:"inline-flex",alignItems:"center",gap:".35rem",border:"none",borderRadius:11,padding:".58rem .9rem",fontFamily:"inherit",fontWeight:800,fontSize:".85rem",cursor:"pointer",background:bg,color:fg||"#fff",whiteSpace:"nowrap"}),
 ghost:{display:"inline-flex",alignItems:"center",gap:".35rem",border:"1px solid "+C.line,borderRadius:11,padding:".55rem .85rem",fontFamily:"inherit",fontWeight:800,fontSize:".84rem",cursor:"pointer",background:"#fff",color:C.ink2,whiteSpace:"nowrap"},
 stat:{background:C.card,border:"1px solid "+C.line,borderRadius:16,padding:".85rem 1rem",display:"flex",alignItems:"center",gap:".75rem"},
 statI:c=>({width:40,height:40,borderRadius:11,background:c,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}),
 sec:{background:C.card,border:"1px solid "+C.line,borderRadius:16,marginBottom:".9rem",overflow:"hidden"},
 secH:{display:"flex",alignItems:"center",gap:".6rem",padding:".75rem 1rem",borderBottom:"1px solid "+C.line,flexWrap:"wrap"},
 chip:(fg,bg)=>({fontSize:".68rem",fontWeight:900,padding:".18rem .5rem",borderRadius:999,color:fg,background:bg,whiteSpace:"nowrap",letterSpacing:".02em"}),
 row:{display:"flex",alignItems:"center",gap:".75rem",padding:".6rem 1rem",borderBottom:"1px solid #EEF2F7"},
 no:{minWidth:34,height:34,borderRadius:10,background:C.soft,border:"1px solid "+C.line,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,fontSize:".85rem",color:C.ink2,flexShrink:0},
 ib:{width:34,height:34,borderRadius:9,border:"1px solid "+C.line,background:"#fff",color:C.ink2,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",flexShrink:0},
 lbl:{fontSize:".7rem",fontWeight:900,color:C.muted,textTransform:"uppercase",letterSpacing:".04em",margin:".7rem 0 .3rem",display:"block"},
 ov:{position:"fixed",inset:0,zIndex:80,background:"rgba(15,23,42,.5)",backdropFilter:"blur(3px)",display:"flex",alignItems:"center",justifyContent:"center",padding:"1rem"},
 modal:{background:"#fff",borderRadius:16,width:"100%",maxWidth:520,maxHeight:"92vh",overflow:"auto",padding:"1.2rem",boxShadow:"0 24px 60px rgba(15,23,42,.3)",color:C.ink}
};
// Branş paletli görünüm katmanı (yarışmalar / ana sayfa ile aynı dil)
;(()=>{const p1=C.p,p2=({"#4F46E5":"#7C3AED","#EC4899":"#8B5CF6","#10B981":"#0EA5E9"})[C.p]||C.p,G="linear-gradient(135deg,"+p1+","+p2+")",mx=a=>"color-mix(in srgb,"+p1+" "+a+"%,#fff)",SH="0 1px 2px rgba(15,23,42,.05),0 8px 24px -16px rgba(15,23,42,.22)",b0=S.btn,s0=S.statI;
 Object.assign(S,{wrap:{...S.wrap,background:"#F6F7FB"},
  top:{...S.top,borderBottom:"none",background:"linear-gradient(90deg,"+p1+","+p2+") bottom/100% 3px no-repeat,#fff",boxShadow:"0 1px 2px rgba(15,23,42,.05)"},
  ico:{...S.ico,background:G,boxShadow:"0 8px 20px -6px color-mix(in srgb,"+p1+" 60%,transparent)"},
  card:{...S.card,border:"none",borderRadius:18,boxShadow:SH},
  sel:{...S.sel,background:"#fff",border:"1px solid #E2E8F0"},inp:{...S.inp,background:"#fff",border:"1px solid #E2E8F0"},
  btn:(bg,fg)=>({...b0(bg,fg),borderRadius:12,...(bg==="#16A34A"?{background:G,boxShadow:"0 8px 18px -8px color-mix(in srgb,"+p1+" 70%,transparent)"}:{})}),
  ghost:{...S.ghost,border:"1px solid "+mx(28),color:p1,borderRadius:12},
  stat:{...S.stat,border:"none",borderRadius:18,boxShadow:SH},
  statI:c=>({...s0(c),background:G,borderRadius:12,boxShadow:"0 6px 14px -6px color-mix(in srgb,"+p1+" 60%,transparent)"}),
  sec:{...S.sec,border:"none",borderRadius:18,boxShadow:"0 1px 2px rgba(15,23,42,.05),0 10px 28px -18px rgba(15,23,42,.25)"},
  secH:{...S.secH,borderBottom:"1px solid #EEF0F4",padding:".85rem 1rem"},
  row:{...S.row,borderBottom:"1px solid #F1F3F8"},
  no:{...S.no,background:mx(10),border:"1px solid "+mx(24),color:p1},
  ib:{...S.ib,border:"1px solid #E2E8F0",borderRadius:10},
  lbl:{...S.lbl,color:p1}})})();

const MI=(n,st)=>e.jsx("span",{className:"material-icons-round",style:{fontSize:"1.1rem",...(st||{})},children:n});


// Uluslararası kayıtlar (entry.html): yabancı federasyon başvuruları → onaylanınca sporcular eklenir (ulke = IOC kodu)
function __IntlKayit({base,comp,Cp,toast,katAd,lg,brans}){const[ac,setAc]=R.useState(!0),[busy,setBusy]=R.useState(""),K=Cp.uluslararasiKayit||{},L=Object.entries(K).map(([id,v])=>({id,...v})).sort((a,b)=>(b.ts||0)-(a.ts||0)),bek=L.filter(x=>x.durum==="beklemede").length,link=`${location.origin}/${brans}/entry?comp=${encodeURIComponent(comp)}`;
 const onay=async x=>{if(!await window.__gxConfirm(`${x.federasyon||x.ulke} — ${(x.sporcular||[]).length} sporcu yarışmaya eklenecek. Onaylıyor musunuz?`))return;setBusy(x.id);const up={},ts=Date.now();
  (x.sporcular||[]).forEach(s=>{if(!s||!s.kat)return;const id=yeniId(),kl=(s.kulup||"").trim()||x.ulke,m=isMulti(s.kat);up[`${base}/${comp}/sporcular/${s.kat}/${id}`]={ad:s.ad||"",soyad:s.soyad||"",adSoyad:`${s.ad||""} ${s.soyad||""}`.trim(),soyadAd:`${s.soyad||""} ${s.ad||""}`.trim(),...(s.dob?{dob:s.dob}:{}),ulke:x.ulke,okul:kl,kulup:kl,il:"",yarismaTuru:m?"takim":"ferdi",...(m?{grupNo:s.grupNo||1}:{}),appId:"intl_entry",kayitTs:ts,kayitRef:x.id};if(!Cp.kategoriler?.[s.kat])up[`${base}/${comp}/kategoriler/${s.kat}`]={name:katAd(s.kat)}});
  let __hkN=0;const hk=(x.hakemler||[]).filter(h=>h&&h.ad);if(hk.length){try{const ex=(await fbGet(ref(db,"referees"))).val()||{},K2=t=>String(t||"").toLocaleUpperCase("tr-TR").replace(/\s+/g," ").trim(),VAR=new Set(Object.values(ex).map(q=>K2(q?.adSoyad)+"|"+(q?.disiplin||"")));hk.forEach(h=>{const k=K2(h.ad)+"|"+brans;if(VAR.has(k))return;VAR.add(k);__hkN++;up[`referees/intl${yeniId()}`]={adSoyad:String(h.ad||"").replace(/\s+/g," ").trim().toLocaleUpperCase("en"),il:"",ulke:x.ulke,ulkeAd:__ulkeAd(x.ulke,"en"),figKategori:h.kat||"",brove:h.kat?"FIG Kat. "+h.kat:"Uluslararası",disiplin:brans,brans:{ritmik:"Ritmik",artistik:"Artistik",aerobik:"Aerobik"}[brans]||brans,email:x.iletisim?.email||"",telefon:"",gorevSayisi:0,createdAt:new Date(ts).toISOString(),importSource:"Uluslararası kayıt ("+(x.federasyon||x.ulke)+")",kayitRef:x.id}})}catch{}}
  up[`${base}/${comp}/uluslararasiKayit/${x.id}/durum`]="onaylandi";up[`${base}/${comp}/uluslararasiKayit/${x.id}/onayTs`]=ts;
  try{await update(ref(db),up);try{lg&&lg("athlete_import",`[Uluslararası kayıt onaylandı] ${x.federasyon||x.ulke} (${x.ulke}) · ${(x.sporcular||[]).length} sporcu`,{competitionId:comp,discipline:brans,data:{kayitId:x.id,ulke:x.ulke,sporcular:(x.sporcular||[]).map(s=>`${s.ad} ${s.soyad} · ${s.kat}`)}})}catch{}toast("Kayıt onaylandı, sporcular eklendi"+(__hkN?` · ${__hkN} hakem hakem listesine eklendi`:"")+" ✓","success")}catch(er){toast("Onaylanamadı: "+(er?.message||er),"error")}setBusy("")};
 const red=async x=>{if(!await window.__gxConfirm(`${x.federasyon||x.ulke} kaydı reddedilsin mi?`))return;setBusy(x.id);try{await update(ref(db),{[`${base}/${comp}/uluslararasiKayit/${x.id}/durum`]:"reddedildi",[`${base}/${comp}/uluslararasiKayit/${x.id}/redTs`]:Date.now()});toast("Kayıt reddedildi.","success")}catch(er){toast("Kaydedilemedi: "+(er?.message||er),"error")}setBusy("")};
 const kopya=async ()=>{try{navigator.clipboard.writeText(link);toast("Kayıt linki kopyalandı ✓","success")}catch{await window.__gxPrompt("Kayıt linki",link)}};
 const ST={beklemede:["Onay bekliyor","#B45309","#FFFBEB","#FCD34D"],onaylandi:["Onaylandı","#166534","#F0FDF4","#86EFAC"],reddedildi:["Reddedildi","#991B1B","#FEF2F2","#FCA5A5"]};
 return e.jsxs("div",{style:{...S.card,borderColor:bek?"#FCD34D":undefined},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:".6rem",flexWrap:"wrap"},children:[MI("public",{color:"#2563EB"}),e.jsx("b",{style:{fontWeight:900},children:__T("Uluslararası Kayıtlar")}),e.jsx("span",{style:{fontSize:".8rem",fontWeight:800,color:bek?"#B45309":C.muted},children:L.length?`${L.length} kayıt · ${bek} onay bekliyor`:"Henüz kayıt yok"}),e.jsx("span",{style:{flex:1}}),
   e.jsxs("button",{type:"button",style:S.ghost,onClick:kopya,title:link,children:[MI("link"),__T("Kayıt linkini kopyala")]}),e.jsxs("a",{href:link,target:"_blank",rel:"noopener",style:{...S.ghost,textDecoration:"none"},children:[MI("open_in_new"),__T("Kayıt Formu")]}),L.length?e.jsx("button",{type:"button",style:S.ghost,onClick:()=>setAc(!ac),children:MI(ac?"expand_less":"expand_more")}):null]}),
  ac&&L.length?e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:".5rem",marginTop:".7rem"},children:L.map(x=>{const st=ST[x.durum]||ST.beklemede,sp=x.sporcular||[];return e.jsxs("div",{style:{border:"1px solid "+C.line,borderLeft:"4px solid "+st[3],borderRadius:12,padding:".6rem .8rem",background:x.durum==="beklemede"?"#FFFDF5":"#fff"},children:[
   e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:".6rem",flexWrap:"wrap"},children:[UlkeEtiket(e,x.ulke,{boy:16}),e.jsx("b",{children:x.federasyon||""}),e.jsx("span",{style:{fontSize:".8rem",fontWeight:700,color:C.muted},children:[x.iletisim?.ad,x.iletisim?.email,x.iletisim?.tel].filter(Boolean).join(" · ")}),e.jsx("span",{style:{fontSize:".75rem",fontWeight:800,color:C.muted},children:x.ts?new Date(x.ts).toLocaleString("tr-TR"):""}),e.jsx("span",{style:{flex:1}}),e.jsx("span",{style:{fontSize:".75rem",fontWeight:900,color:st[1],background:st[2],border:"1px solid "+st[3],borderRadius:999,padding:"2px 10px"},children:st[0]}),
    x.durum==="beklemede"?e.jsxs(e.Fragment,{children:[e.jsx("button",{type:"button",disabled:!!busy,onClick:()=>onay(x),style:{...S.ghost,background:"#16A34A",borderColor:"#16A34A",color:"#fff"},children:"Onayla ve ekle"}),e.jsx("button",{type:"button",disabled:!!busy,onClick:()=>red(x),style:{...S.ghost,color:"#B91C1C",borderColor:"#FCA5A5"},children:"Reddet"})]}):null]}),
   e.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:".3rem .9rem",marginTop:".4rem",fontSize:".82rem",fontWeight:700,color:"#334155"},children:sp.map((s,i)=>e.jsxs("span",{children:[`${i+1}. ${s.ad||""} ${s.soyad||""}`," ",e.jsx("small",{style:{color:C.muted},children:`· ${katAd(s.kat)}${s.kulup?" · "+s.kulup:""}${s.grupNo?" · G"+s.grupNo:""}`})]},i))}),
   (x.hakemler||[]).length?e.jsxs("div",{style:{marginTop:".3rem",fontSize:".78rem",fontWeight:700,color:C.muted},children:[x.durum==="beklemede"?"Hakemler (onayda hakem listesine eklenir): ":"Hakemler: ",x.hakemler.map(h=>h.ad+(h.kat?` (FIG ${h.kat})`:"")).join(", ")]}):null]},x.id)})}):null]})}

function YeniSayfa({onEski}){
 const{toast}=usToast();const{currentUser:_lu}=usAuth()||{},_un=_lu?.adSoyad||_lu?.kullaniciAdi||"";
 const[comps,setComps]=R.useState({}),[comp,setComp]=R.useState(()=>{try{return new URLSearchParams(location.search).get("comp")||localStorage.getItem("tcfRtSporcuComp")||""}catch{return""}});
 const[q,setQ]=R.useState(""),[katF,setKatF]=R.useState(""),[finGoster,setFinGoster]=R.useState(!1);
 const[modal,setModal]=R.useState(null),[busy,setBusy]=R.useState(!1);
 const fileRef=R.useRef(null);
 R.useEffect(()=>onValue(ref(db,BASE),s=>setComps(s.val()||{})),[]);
 R.useEffect(()=>{try{comp&&localStorage.setItem("tcfRtSporcuComp",comp)}catch{}},[comp]);
 const list=Object.entries(comps).filter(([id,c])=>c&&typeof c==="object"&&(c.isim||c.kategoriler)&&(!(c.arsivli===!0||c.arsivli==="true")||id===comp)).sort((a,b)=>String(b[1].baslangicTarihi||"").localeCompare(String(a[1].baslangicTarihi||"")));
 const Cp=comps[comp]||{},kats=Cp.kategoriler||{},spor=Cp.sporcular||{},pun=Cp.puanlar||{},INTL=isIntl(Cp);
 const katAd=c=>{let t=String(kats[c]?.name||cfg(c).label||c).replace(/^\s*\u{1F3C6}\s*/u,"");if(!kats[c]?.name&&isFinal(c)){const al=String(c).split("__")[1];t=String(cfg(c).label||baseCat(c))+" — "+(al?(ALET_AD[al]||al)+" Finali":"Genel Tasnif Finali")}return t};
 const katSira=c=>{const yi=YAS_SIRA.indexOf(yasOf(c)),al=String(c).split("__")[1]||"";return(isFinal(c)?1e4:0)+(yi<0?90:yi)*100+TIP_SIRA.indexOf(typeOf(c))*10+(al?1+Object.keys(ALET_AD).indexOf(al):0)};
 // yarışmacılar
 const entries=[];
 Object.keys({...kats,...spor}).forEach(cat=>{const aths=spor[cat]||{};
  if(isMulti(cat)){const g=new Map();Object.entries(aths).forEach(([id,a])=>{if(!a||typeof a!=="object")return;const okul=String(a.okul||a.kulup||"").trim(),gn=a.grupNo??1,k=okul+"|"+gn;if(!g.has(k))g.set(k,{cat,okul,grupNo:gn,members:[]});g.get(k).members.push({id,...a})});
   g.forEach(v=>{const pk=grupKey(cat,v.okul,v.grupNo);v.key=pk;v.puan=pun[cat]?.[pk];entries.push(v)})}
  else Object.entries(aths).forEach(([id,a])=>{if(!a||typeof a!=="object")return;entries.push({cat,okul:String(a.okul||a.kulup||"").trim(),grupNo:null,members:[{id,...a}],key:id,puan:pun[cat]?.[id]})})});
 entries.forEach(x=>{x.ad=x.members.map(kisiAd).filter(Boolean).join(" - ");x.il=x.members[0]?.il||"";x.ulke=sporcuUlke(x.members[0],Cp);x.sira=Math.min(...x.members.map(m=>Number(m.cikisSirasi)||1e9));x.saat=x.members.find(m=>m.baslangicSaati)?.baslangicSaati||"";x.pz=puanOzet(x.puan);x.puanli=!!x.pz});
 const q0=q.trim().toLocaleLowerCase("tr-TR");
 const goster=entries.filter(x=>(!katF||x.cat===katF)&&(finGoster||!isFinal(x.cat)||katF===x.cat)&&(!q0||(x.ad+" "+x.okul+" "+x.il+" "+(x.ulke||"")).toLocaleLowerCase("tr-TR").includes(q0)));
 const katlar=[...new Set([...Object.keys(kats),...Object.keys(spor)])].sort((a,b)=>katSira(a)-katSira(b));
 const gruplu=katlar.map(c=>({cat:c,list:goster.filter(x=>x.cat===c).sort((a,b)=>a.sira-b.sira||a.ad.localeCompare(b.ad,"tr"))})).filter(g=>g.list.length||(!q0&&(!katF||katF===g.cat)&&(finGoster||!isFinal(g.cat))));
 const elemeEnt=entries.filter(x=>!isFinal(x.cat));
 const kisiSet=new Set();elemeEnt.forEach(x=>x.members.forEach(m=>kisiSet.add((m.tckn||m.lisans||kisiAd(m)).toString().toLocaleLowerCase("tr-TR"))));
 const kulupSet=new Set(elemeEnt.map(x=>UP(x.okul)).filter(Boolean));
 const sonrakiGrup=(cat,okul)=>{const g=entries.filter(x=>x.cat===cat&&UP(x.okul)===UP(okul)).map(x=>Number(x.grupNo)||0);return(g.length?Math.max(...g):0)+1};

 // ---- kaydet / sil ----
 const kaydet=async f=>{const cat=f.cat;if(!comp||!cat){toast(__T("Kategori seçin."),"error");return}
  const lines=f.isimler.split("\n").map(s=>s.trim()).filter(Boolean);if(!lines.length){toast(__T("En az bir isim girin."),"error");return}
  const multi=isMulti(cat),il=f.il.trim(),_uk=INTL?(ulkeKod(f.ulke)||"TUR"):null,okul=f.kulup.trim()||(INTL?_uk:il),gn=multi?Math.max(1,parseInt(f.grupNo)||1):null,up={},P=`${BASE}/${comp}/sporcular/${cat}`;
  if(!multi&&lines.length>1){toast(__T("Bireysel kategoride tek isim girilir."),"error");return}
  const ent=f.ent;
  if(ent&&ent.puanli&&multi&&(UP(okul)!==UP(ent.okul)||Number(gn)!==Number(ent.grupNo))){toast(__T("Puanı olan grubun kulübü / grup numarası değiştirilemez (puan bağlantısı kopar)."),"error");return}
  if(multi&&(!ent||UP(okul)!==UP(ent.okul)||Number(gn)!==Number(ent.grupNo))&&entries.some(x=>x!==ent&&x.cat===cat&&UP(x.okul)===UP(okul)&&Number(x.grupNo)===gn)){toast(`Bu kulübün ${gn} numaralı grubu zaten var.`,"error");return}
  const ortak={il,okul,kulup:okul,...(INTL?{ulke:_uk}:{}),yarismaTuru:multi?"takim":"ferdi",...(multi?{grupNo:gn}:{})};
  const eski=ent?ent.members:[];
  lines.forEach((nm,i)=>{const{ad,soyad}=adBol(nm),kayit={ad,soyad,adSoyad:(ad+" "+soyad).trim(),soyadAd:(soyad+" "+ad).trim(),...ortak};
   if(!multi){if(f.tckn!=null)kayit.tckn=f.tckn.trim();if(f.lisans!=null)kayit.lisans=f.lisans.trim()}
   const m=eski[i];if(m){Object.entries(kayit).forEach(([k,v])=>{up[`${P}/${m.id}/${k}`]=v})}
   else{const id=yeniId(),ek={};if(eski[0]){["cikisSirasi","baslangicSaati","gun"].forEach(k=>{if(eski[0][k]!=null)ek[k]=eski[0][k]})}up[`${P}/${id}`]={...kayit,...ek,appId:"manuel",kayitTs:Date.now()}}});
  eski.slice(lines.length).forEach(m=>{up[`${P}/${m.id}`]=null});
  if(!kats[cat])up[`${BASE}/${comp}/kategoriler/${cat}`]={name:katAd(cat)};
  setBusy(!0);try{await update(ref(db),up);logAction(ent?"athlete_update":"athlete_create",`[Ritmik] ${ent?"Güncellendi":"Eklendi"}: ${lines.join(", ")} · ${katAd(cat)} · ${okul}`.slice(0,480),{user:_un,competitionId:comp,category:cat,athleteId:ent?ent.key:null,athleteName:lines.join(", "),discipline:"ritmik",oldValue:ent?JSON.stringify({ad:ent.ad,kulup:ent.okul,il:ent.il,grupNo:ent.grupNo}):null,newValue:JSON.stringify({ad:lines.join(", "),kulup:okul,il,grupNo:gn}),data:{kategori:cat,uyeler:lines,kulup:okul,il,grupNo:gn,tckn:f.tckn||"",lisans:f.lisans||""}});toast(ent?__T("Yarışmacı güncellendi ✓"):__T("Yarışmacı eklendi ✓"),"success");setModal(null)}catch(er){toast(__T("Kaydedilemedi: ")+(er?.message||er),"error")}setBusy(!1)};
 const sil=async ent=>{const uy=ent.puanli?"\n\n"+__T("⚠ Bu yarışmacının PUANI VAR. Kayıt silinirse puan tablolarda sahipsiz kalır."):"";
  if(!await window.__gxConfirm(`"${ent.ad}" (${katAd(ent.cat)}) ${__T("silinsin mi?")}${uy}`))return;
  const up={};ent.members.forEach(m=>{up[`${BASE}/${comp}/sporcular/${ent.cat}/${m.id}`]=null});
  setBusy(!0);try{await update(ref(db),up);logAction("athlete_delete",`[Ritmik] Silindi: ${ent.ad} · ${katAd(ent.cat)} · ${ent.okul}${ent.puanli?" (PUANI VARDI)":""}`.slice(0,480),{user:_un,competitionId:comp,category:ent.cat,athleteId:ent.key,athleteName:ent.ad,discipline:"ritmik",oldValue:JSON.stringify({ad:ent.ad,kulup:ent.okul,il:ent.il,grupNo:ent.grupNo}),data:{uyeler:ent.members.map(m=>({id:m.id,ad:kisiAd(m),kulup:m.okul||m.kulup||"",il:m.il||""})),puanli:!!ent.puanli,puan:ent.pz||null}});toast(__T("Silindi."),"success")}catch(er){toast(__T("Silinemedi: ")+(er?.message||er),"error")}setBusy(!1)};

 // ---- Excel ----
 const katEsle=()=>{const norm=s=>String(s||"").toLocaleLowerCase("tr").replace(/[^a-zçğıöşü0-9]+/g,"");const map={};const add=(l,c)=>{const n=norm(l);if(n&&!(n in map))map[n]=c};katlar.filter(c=>!isFinal(c)).forEach(c=>{[c,katAd(c),kats[c]?.name,cfg(c).label].forEach(l=>add(l,c))});return{map,norm}};
 const sablon=()=>{const ks=katlar.filter(c=>!isFinal(c)),ex=ks.find(c=>!isMulti(c))||ks[0]||"genc_kiz",exM=ks.find(isMulti);
  const rows=[{Ad:"Ayşe",Soyad:"Yılmaz",İl:"İZMİR",Kulüp:"Örnek S.K.",Kategori:katAd(ex),TCKN:"",["Lisans No"]:"",["Grup No"]:""}];
  if(exM){rows.push({Ad:"Ali",Soyad:"Demir",...(INTL?{Ülke:"AZE"}:{}),İl:"ANKARA",Kulüp:"Örnek S.K.",Kategori:katAd(exM),TCKN:"",["Lisans No"]:"",["Grup No"]:1});rows.push({Ad:"Veli",Soyad:"Kaya",...(INTL?{Ülke:"TUR"}:{}),İl:"ANKARA",Kulüp:"Örnek S.K.",Kategori:katAd(exM),TCKN:"",["Lisans No"]:"",["Grup No"]:1})}
  const wb=XU.book_new(),ws=XU.json_to_sheet(rows,{header:["Ad","Soyad",...(INTL?["Ülke"]:[]),"İl","Kulüp","Kategori","TCKN","Lisans No","Grup No"]});ws["!cols"]=[{wch:16},{wch:16},{wch:12},{wch:24},{wch:24},{wch:14},{wch:12},{wch:8}];XU.book_append_sheet(wb,ws,"Sporcular");
  const w2=XU.json_to_sheet(ks.map(c=>({["Kategori (bunu yaz)"]:katAd(c),["Kategori ID"]:c,Tür:isMulti(c)?"Grup — aynı grubun üyelerine aynı Grup No":"Bireysel"})));w2["!cols"]=[{wch:26},{wch:16},{wch:44}];XU.book_append_sheet(wb,w2,"Kategoriler");
  XW(wb,"ritmik_sporcu_sablonu.xlsx");toast(__T("Şablon indirildi."),"success")};
 const yukle=async file=>{try{const wb=XR(await file.arrayBuffer(),{type:"array"});let rows=[];wb.SheetNames.forEach(sn=>{const rr=XU.sheet_to_json(wb.Sheets[sn],{defval:""});if(rr.length&&Object.keys(rr[0]).some(h=>/^(ad|soyad|adsoyad|ad soyad)$/i.test(String(h).trim())))rows=rows.concat(rr)});
   if(!rows.length){toast(__T("Excel'de sporcu satırı bulunamadı."),"error");return}
   const{map,norm}=katEsle(),G=r=>{const o={};Object.keys(r).forEach(k=>o[norm(k)]=r[k]);return n=>o[norm(n)]};const up={},bad=new Set();let ok=0,atla=0;
   rows.forEach(r=>{const g=G(r),kt=String(g("Kategori")||"").trim(),cat=map[norm(kt)];if(!cat){if(kt)bad.add(kt);atla++;return}
    let ad=String(g("Ad")||"").trim(),soyad=String(g("Soyad")||"").trim();const cb=String(g("Ad Soyad")||"").trim();if(!ad&&!soyad&&cb){const b=adBol(cb);ad=b.ad;soyad=b.soyad}if(!ad&&!soyad){atla++;return}
    const _uk=INTL?(ulkeKod(g("Ülke")||g("Ulke")||g("Country")||g("NOC")||g("Ülke Kodu"))||"TUR"):null,okul=String(g("Kulüp")||g("Kulup")||g("Okul")||g("Club")||g("Federation")||"").trim()||(INTL?_uk:""),rec={ad,soyad,adSoyad:(ad+" "+soyad).trim(),soyadAd:(soyad+" "+ad).trim(),il:String(g("İl")||g("Il")||"").trim(),okul,kulup:okul,...(INTL?{ulke:_uk}:{}),tckn:String(g("TCKN")||"").trim(),lisans:String(g("Lisans No")||g("Lisans")||"").trim(),yarismaTuru:isMulti(cat)?"takim":"ferdi",appId:"excel_import",kayitTs:Date.now()};
    if(isMulti(cat))rec.grupNo=Math.max(1,parseInt(g("Grup No")||g("GrupNo")||1)||1);
    up[`${BASE}/${comp}/sporcular/${cat}/${yeniId()}`]=rec;if(!kats[cat])up[`${BASE}/${comp}/kategoriler/${cat}`]={name:katAd(cat)};ok++});
   if(!ok){toast(__T("Geçerli satır yok.")+(bad.size?" "+__T("Tanınmayan kategori:")+" "+[...bad].slice(0,3).join(", "):""),"error");return}
   if(!await window.__gxConfirm(`${ok} ${__T("sporcu")} → "${Cp.isim||comp}": ${__T("yarışmasına eklenecek.")}${atla?`\n${atla} ${__T("satır atlanacak")}${bad.size?" ("+__T("tanınmayan kategori:")+" "+[...bad].slice(0,3).join(", ")+")":""}.`:""}\n\n${__T("Devam edilsin mi?")}`))return;
   setBusy(!0);await update(ref(db),up);logAction("athlete_import",`[Ritmik] Excel ile ${ok} sporcu eklendi: ${Cp.isim||comp}${atla?" · "+atla+" satır atlandı":""}`,{user:_un,competitionId:comp,discipline:"ritmik",data:{dosya:file?.name||"",eklenen:ok,atlanan:atla,taninmayanKategori:[...bad].slice(0,10)}});setBusy(!1);toast(ok+" "+__T("sporcu eklendi ✓"),"success")}catch(er){setBusy(!1);toast(__T("İçe aktarma hatası: ")+(er?.message||er),"error")}};
 const disari=()=>{const s1=[],s2=[];katlar.forEach(c=>entries.filter(x=>x.cat===c).sort((a,b)=>a.sira-b.sira||a.ad.localeCompare(b.ad,"tr")).forEach(x=>{s1.push({Kategori:katAd(c),Tür:TIP_AD[typeOf(c)],Yarışmacı:x.ad,...(INTL?{Ülke:x.ulke||""}:{}),Kulüp:x.okul,İl:x.il,["Grup No"]:x.grupNo??"",["Çıkış Sırası"]:x.sira<1e9?x.sira:"",Saat:x.saat,Puan:x.pz?Number(x.pz.t.toFixed(3)):""});x.members.forEach((m,i)=>s2.push({Kategori:katAd(c),Ad:m.ad||"",Soyad:m.soyad||"",["Ad Soyad"]:kisiAd(m),...(INTL?{Ülke:sporcuUlke(m,Cp)||""}:{}),İl:m.il||"",Kulüp:m.okul||m.kulup||"",TCKN:m.tckn||"",["Lisans No"]:m.lisans||"",["Grup No"]:x.grupNo??"",["Üye Sıra"]:x.members.length>1?i+1:""}))}));
  const wb=XU.book_new(),w1=XU.json_to_sheet(s1);w1["!cols"]=[{wch:26},{wch:12},{wch:40},{wch:26},{wch:12},{wch:8},{wch:11},{wch:8},{wch:8}];XU.book_append_sheet(wb,w1,"Yarışmacılar");const w2=XU.json_to_sheet(s2);XU.book_append_sheet(wb,w2,"Sporcular");
  XW(wb,String(Cp.isim||"sporcular").replace(/[^a-zA-Z0-9ğüşöçıİĞÜŞÖÇ ]+/g,"_").replace(/\s+/g,"_").slice(0,40)+"_sporcular.xlsx")};

 // ---- görünüm ----
 const ekleAc=c=>{const cat=c||katF||katlar.find(x=>!isFinal(x))||"";setModal({cat,isimler:"",il:"",kulup:"",grupNo:cat&&isMulti(cat)?1:"",tckn:"",lisans:"",ulke:"TUR",ent:null})};
 const duzAc=x=>setModal({cat:x.cat,isimler:x.members.map(kisiAd).join("\n"),il:x.il,kulup:x.okul,ulke:x.ulke||"TUR",grupNo:x.grupNo??"",tckn:x.members[0]?.tckn||"",lisans:x.members[0]?.lisans||"",ent:x});
 const stat=(ic,c,v,l)=>e.jsxs("div",{style:S.stat,children:[e.jsx("div",{style:S.statI(c),children:MI(ic)}),e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:"1.35rem",fontWeight:900,lineHeight:1},children:v}),e.jsx("div",{style:{fontSize:".76rem",fontWeight:700,color:C.muted},children:l})]})]});
 const modalEl=modal&&(()=>{const f=modal,multi=isMulti(f.cat),set=(k,v)=>setModal(o=>({...o,[k]:v})),kilit=f.ent&&f.ent.puanli&&multi;
  return e.jsx("div",{style:S.ov,onClick:ev=>{if(ev.target===ev.currentTarget&&!busy)setModal(null)},children:e.jsxs("div",{style:S.modal,children:[
   e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:".5rem",fontSize:"1.1rem",fontWeight:900},children:[MI(f.ent?"edit":"person_add",{color:"#16A34A"}),f.ent?__T("Yarışmacıyı Düzenle"):__T("Yarışmacı Ekle")]}),
   e.jsx("label",{style:S.lbl,children:__T("Kategori")}),
   f.ent?e.jsx("div",{style:{...S.inp,background:"#fff"},children:katAd(f.cat)}):e.jsx("select",{style:{...S.sel,width:"100%"},value:f.cat,onChange:ev=>{const c=ev.target.value;setModal(o=>({...o,cat:c,grupNo:isMulti(c)?sonrakiGrup(c,o.kulup||o.il):""}))},children:katlar.filter(c=>!isFinal(c)).map(c=>e.jsx("option",{value:c,children:katAd(c)+(isMulti(c)?" ("+__T("grup")+")":"")},c))}),
   e.jsx("label",{style:S.lbl,children:multi?`${__T("Üyeler — her satıra bir Ad Soyad")} (${kisiSayisi(f.cat)} ${__T("kişi önerilir")})`:__T("Ad Soyad")}),
   e.jsx("textarea",{rows:multi?Math.min(9,Math.max(3,kisiSayisi(f.cat))):1,value:f.isimler,onChange:ev=>set("isimler",ev.target.value),placeholder:multi?"Ad Soyad\nAd Soyad":"Ad Soyad",style:{...S.inp,resize:"vertical",lineHeight:1.5}}),
   INTL?e.jsxs("div",{children:[e.jsx("label",{style:S.lbl,children:__T("Ülke (NOC)")}),e.jsx("select",{style:S.inp,value:f.ulke||"TUR",onChange:ev=>set("ulke",ev.target.value),children:UlkeSecenekleri(e,"tr")})]}):null,e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:".6rem"},children:[e.jsxs("div",{children:[e.jsx("label",{style:S.lbl,children:INTL?__T("Şehir"):__T("İl")}),e.jsx("input",{style:S.inp,value:f.il,onChange:ev=>set("il",ev.target.value),placeholder:__T("Örn. İZMİR")})]}),e.jsxs("div",{children:[e.jsx("label",{style:S.lbl,children:__T("Kulüp")}),e.jsx("input",{style:{...S.inp,...(kilit?{opacity:.6}:{})},disabled:kilit,value:f.kulup,onChange:ev=>set("kulup",ev.target.value),placeholder:__T("Kulüp adı")})]})]}),
   multi?e.jsxs("div",{children:[e.jsx("label",{style:S.lbl,children:__T("Grup No (aynı kulübün gruplarını ayırır)")}),e.jsx("input",{type:"number",min:1,style:{...S.inp,maxWidth:140,...(kilit?{opacity:.6}:{})},disabled:kilit,value:f.grupNo,onChange:ev=>set("grupNo",ev.target.value)})]}):e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:".6rem"},children:[e.jsxs("div",{children:[e.jsx("label",{style:S.lbl,children:__T("TCKN (isteğe bağlı)")}),e.jsx("input",{style:S.inp,value:f.tckn,onChange:ev=>set("tckn",ev.target.value),inputMode:"numeric"})]}),e.jsxs("div",{children:[e.jsx("label",{style:S.lbl,children:__T("Lisans No (isteğe bağlı)")}),e.jsx("input",{style:S.inp,value:f.lisans,onChange:ev=>set("lisans",ev.target.value)})]})]}),
   kilit?e.jsx("div",{style:{marginTop:".6rem",fontSize:".78rem",fontWeight:700,color:"#B45309"},children:__T("⚠ Bu grubun puanı var: kulüp ve grup no kilitli (puan bağlantısı korunur). Üye isimleri düzeltilebilir.")}):null,
   e.jsxs("div",{style:{display:"flex",gap:".6rem",marginTop:"1rem"},children:[e.jsx("button",{type:"button",style:{...S.ghost,flex:1,justifyContent:"center"},disabled:busy,onClick:()=>setModal(null),children:__T("Vazgeç")}),e.jsxs("button",{type:"button",style:{...S.btn("#16A34A"),flex:2,justifyContent:"center",opacity:busy?.6:1},disabled:busy,onClick:()=>kaydet(f),children:[MI("save"),busy?"Kaydediliyor…":"Kaydet"]})]})
  ]})})})();

 return e.jsxs("div",{style:S.wrap,children:[
  e.jsx("div",{style:S.top,children:e.jsxs("div",{style:S.topIn,children:[
   e.jsx("a",{href:"/ritmik",style:S.back,title:__T("Geri"),children:MI("arrow_back",{fontSize:"1.4rem"})}),
   e.jsx("div",{style:S.ico,children:MI("groups",{fontSize:"1.4rem"})}),
   e.jsxs("div",{style:{minWidth:0,flex:1},children:[e.jsx("div",{style:{fontWeight:900,fontSize:"1.15rem",lineHeight:1.15},children:__T("Sporcular")}),e.jsx("div",{style:{fontSize:".8rem",fontWeight:700,color:C.muted,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:Cp.isim?Cp.isim:__T("Ritmik · sporcu (bireysel / grup) yönetimi")})]}),
   e.jsxs("button",{type:"button",style:S.ghost,onClick:onEski,title:__T("Eski Sporcular sayfasını aç"),children:[MI("history"),__T("Eski versiyon")]})]})}),
  e.jsxs("div",{style:S.in,children:[
   e.jsxs("div",{style:{...S.card,display:"flex",gap:".6rem",flexWrap:"wrap",alignItems:"center"},children:[
    e.jsxs("select",{style:{...S.sel,flex:"1 1 260px"},value:comp,onChange:ev=>{setComp(ev.target.value);setKatF("")},children:[e.jsx("option",{value:"",children:__T("— Yarışma seçin —")}),list.map(([id,c])=>e.jsx("option",{value:id,children:(c.isim||id)+(c.arsivli===!0?" ("+__T("arşiv")+")":"")},id))]}),
    comp?e.jsxs(e.Fragment,{children:[
     e.jsxs("div",{style:{flex:"1 1 200px",display:"flex",alignItems:"center",gap:".4rem",...S.sel,padding:"0 .7rem"},children:[MI("search",{color:C.sub}),e.jsx("input",{value:q,onChange:ev=>setQ(ev.target.value),placeholder:__T("Sporcu / kulüp / il ara…"),style:{border:"none",background:"transparent",outline:"none",fontFamily:"inherit",fontWeight:700,fontSize:".9rem",padding:".6rem 0",flex:1,minWidth:0,color:C.ink}})]}),
     e.jsxs("select",{style:{...S.sel,flex:"0 1 220px"},value:katF,onChange:ev=>setKatF(ev.target.value),children:[e.jsx("option",{value:"",children:__T("Tüm kategoriler")}),katlar.map(c=>e.jsx("option",{value:c,children:(isFinal(c)?"🏆 ":"")+katAd(c)},c))]})]}):null]}),
   !comp?e.jsxs("div",{style:{...S.card,textAlign:"center",padding:"3rem 1rem",color:C.muted,fontWeight:700},children:[MI("emoji_events",{fontSize:"2.6rem",display:"block",margin:"0 auto .5rem",color:C.sub}),__T("Sporcuları görmek için yarışma seçin.")]}):e.jsxs(e.Fragment,{children:[
    e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(170px,1fr))",gap:".75rem",marginBottom:"1rem"},children:[stat("how_to_reg","#16A34A",elemeEnt.length,__T("Yarışmacı (eleme)")),stat("person","#2563EB",kisiSet.size,__T("Farklı sporcu")),stat("shield","#7C3AED",kulupSet.size,__T("Kulüp")),stat("category","#D97706",katlar.filter(c=>!isFinal(c)).length,__T("Kategori"))]}),
    e.jsxs("div",{style:{display:"flex",gap:".5rem",flexWrap:"wrap",marginBottom:"1rem",alignItems:"center"},children:[
     e.jsxs("button",{type:"button",style:S.btn("#16A34A"),onClick:()=>ekleAc(),disabled:busy,children:[MI("person_add"),__T("Yarışmacı Ekle")]}),
     e.jsxs("button",{type:"button",style:S.ghost,onClick:sablon,children:[MI("description"),__T("Şablon İndir")]}),
     e.jsxs("button",{type:"button",style:S.ghost,onClick:()=>fileRef.current&&fileRef.current.click(),disabled:busy,children:[MI("upload_file"),__T("Excel'den Yükle")]}),
     e.jsx("input",{ref:fileRef,type:"file",accept:".xlsx,.xls",style:{display:"none"},onChange:ev=>{const fl=ev.target.files[0];ev.target.value="";fl&&yukle(fl)}}),
     e.jsxs("button",{type:"button",style:S.ghost,onClick:disari,children:[MI("table_view"),__T("Excel'e Aktar")]}),
     e.jsx("span",{style:{flex:1}}),
     e.jsxs("label",{style:{display:"inline-flex",alignItems:"center",gap:".4rem",fontSize:".84rem",fontWeight:800,color:C.ink2,cursor:"pointer"},children:[e.jsx("input",{type:"checkbox",checked:finGoster,onChange:ev=>setFinGoster(ev.target.checked)}),__T("Finalleri göster")]})]}),
    INTL?e.jsx(__IntlKayit,{base:BASE,comp,Cp,toast,katAd,brans:"ritmik",lg:typeof logAction==="function"?(t,m,o)=>logAction(t,m,{user:typeof _un!=="undefined"?_un:"",...o}):null}):null,gruplu.length===0?e.jsx("div",{style:{...S.card,textAlign:"center",padding:"2.5rem 1rem",color:C.muted,fontWeight:700},children:q0?__T("Aramaya uyan yarışmacı yok."):__T("Bu yarışmada henüz sporcu yok. “Yarışmacı Ekle” ya da “Excel'den Yükle” ile başlayın.")}):null,
    gruplu.map(g=>{const t=typeOf(g.cat),rk=TIP_RENK[t],kisi=g.list.reduce((a,x)=>a+x.members.length,0);return e.jsxs("div",{style:S.sec,children:[
     e.jsxs("div",{style:{...S.secH,background:"linear-gradient(90deg,"+rk+"26,"+rk+"08 45%,#fff 80%)",borderLeft:"5px solid "+rk},children:[e.jsx("span",{style:{width:10,height:10,borderRadius:3,background:rk}}),e.jsx("span",{style:{fontWeight:900,fontSize:"1rem"},children:(isFinal(g.cat)?"🏆 ":"")+katAd(g.cat)}),e.jsx("span",{style:S.chip(rk,rk+"1a"),children:TIP_AD[t]}),e.jsx("span",{style:S.chip(C.ink2,C.soft),children:g.list.length+(isMulti(g.cat)?" "+__T("grup")+" · "+kisi+" "+__T("sporcu"):" "+__T("sporcu"))}),e.jsx("span",{style:{flex:1}}),isFinal(g.cat)?e.jsx("span",{style:{fontSize:".74rem",fontWeight:700,color:C.muted},children:__T("Final listesi Final Oluştur ekranından gelir")}):e.jsxs("button",{type:"button",style:{...S.ghost,padding:".35rem .65rem",fontSize:".78rem"},onClick:()=>ekleAc(g.cat),children:[MI("add",{fontSize:"1rem"}),__T("Ekle")]})]}),
     g.list.length===0?e.jsx("div",{style:{padding:".9rem 1rem",color:C.muted,fontWeight:700,fontSize:".85rem"},children:__T("Bu kategoride yarışmacı yok.")}):null,
     g.list.map((x,i)=>e.jsxs("div",{style:S.row,children:[
      e.jsx("div",{style:S.no,title:x.sira<1e9?__T("Çıkış sırası"):"",children:x.sira<1e9?x.sira:i+1}),
      e.jsxs("div",{style:{flex:1,minWidth:0},children:[
       isMulti(x.cat)?e.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:".3rem"},children:x.members.map(m=>e.jsx("span",{style:{fontWeight:800,fontSize:".88rem",background:C.soft,border:"1px solid "+C.line,borderRadius:8,padding:".12rem .45rem"},children:UP(kisiAd(m))},m.id))}):e.jsx("div",{style:{fontWeight:900,fontSize:".95rem"},children:UP(x.ad)}),
       e.jsxs("div",{style:{display:"flex",flexWrap:"wrap",gap:".2rem .6rem",marginTop:".2rem",fontSize:".78rem",fontWeight:700,color:C.muted},children:[INTL&&x.ulke?UlkeEtiket(e,x.ulke,{style:{color:"#1A1D26"}}):null,x.okul&&!(INTL&&x.okul===x.ulke)?e.jsx("span",{children:(INTL&&x.ulke?"· ":"")+x.okul}):null,x.il&&UP(x.il)!==UP(x.okul)?e.jsxs("span",{children:[x.okul?"· ":"",UP(x.il)]}):null,!x.okul&&!x.il?e.jsx("span",{children:"—"}):null,isMulti(x.cat)?e.jsxs("span",{children:["· Grup ",x.grupNo]}):null,x.saat?e.jsxs("span",{children:["· ⏱ ",x.saat]}):null,!isMulti(x.cat)&&x.members[0].lisans?e.jsxs("span",{children:["· Lisans ",x.members[0].lisans]}):null,!isMulti(x.cat)&&x.members[0].tckn?e.jsxs("span",{children:["· TC ",maskele(x.members[0].tckn)]}):null]})]}),
      x.puanli?e.jsx("span",{style:S.chip("#15803D","#DCFCE7"),title:__T("Puanı girilmiş"),children:x.pz&&x.pz.n?Number(x.pz.t).toFixed(3)+(x.pz.n>1?" ("+x.pz.n+" "+__T("alet")+")":""):__T("PUANLI")}):null,
      isFinal(x.cat)?null:e.jsx("button",{type:"button",style:S.ib,title:__T("Düzenle"),onClick:()=>duzAc(x),children:MI("edit",{fontSize:"1.05rem"})}),
      isFinal(x.cat)?null:e.jsx("button",{type:"button",style:{...S.ib,color:"#DC2626"},title:__T("Sil"),onClick:()=>sil(x),disabled:busy,children:MI("delete",{fontSize:"1.05rem"})})]},x.key))]},g.cat)})]})]}),
  modalEl]})}

function RitmikSporcular(){usInit();
 const[eski,setEski]=R.useState(()=>{try{return localStorage.getItem(ESKI_KEY)==="1"}catch{return!1}});
 const sec=v=>{try{localStorage.setItem(ESKI_KEY,v?"1":"0")}catch{}setEski(v)};
 if(eski)return e.jsxs(e.Fragment,{children:[e.jsx(R.Suspense,{fallback:e.jsx("div",{style:{padding:"3rem",textAlign:"center",color:"#6B7280",fontWeight:700,fontFamily:"Nunito,system-ui,sans-serif"},children:__T("Eski sayfa yükleniyor…")}),children:e.jsx(EskiSayfa,{})}),
  e.jsxs("button",{type:"button",onClick:()=>sec(!1),title:__T("Yeni ritmik Sporcular sayfasına dön"),style:{position:"fixed",right:16,bottom:64,zIndex:9000,display:"inline-flex",alignItems:"center",gap:".4rem",border:"none",borderRadius:999,padding:".7rem 1.1rem",background:"#16A34A",color:"#fff",fontFamily:"Nunito,system-ui,sans-serif",fontWeight:900,fontSize:".88rem",cursor:"pointer",boxShadow:"0 10px 26px rgba(22,163,74,.4)"},children:[MI("auto_awesome"),__T("Yeni versiyon")]})]});
 return e.jsx(YeniSayfa,{onEski:()=>sec(!0)})}
export{RitmikSporcular as default};
