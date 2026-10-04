import"./i18n-Tr01a2b3Cb2.js";import{b as usToast,a as usDisc,j as e,d as db}from"./main-C2LpyYUGCb2.js";import{r as R}from"./vendor-react-Cxw6bqwhCb2.js";import{k as ref,o as onValue,m as update}from"./vendor-firebase-940mxgRVCb2.js";import{A as V}from"./aerobikCriteriaDefaults-ld4mBtrICb2.js";import"./modulepreload-polyfill-B5Qt9EMXCb2.js";

// AEROBİK PANELLER
//  <yarışma>/panelGruplari/<gid> : {ad, tipler{A,E,D,T,L,SJ}, adet{A,E}, kategoriler{kat:true}, paneller{SLOT:{ozel}}}
//  <yarışma>/hakemLinkleri/<gid>_<slot> : her bireysel panelin kaydı {ad, kategoriler, panelGrubu, slot}
//     Panel sayfaları (?linkId=) kategorilerini CANLI olarak bu kayıttan okur; ekrandaki her
//     kategori ekle/çıkar anında yazılır ve açık paneller hemen güncellenir.
const BASE="aerobik_yarismalar";
const TIP={
 A:{ad:"Artistik (A)",renk:"#db2777",coklu:{yol:"apanel",on:"A",ek:i=>`&panelId=a${i}`,max:4}},
 E:{ad:"Uygulama (E)",renk:"#0891b2",coklu:{yol:"epanel",on:"E",ek:i=>`&panelId=e${i}`,max:4}},
 D:{ad:"Zorluk (D)",renk:"#6366f1",tek:[["D","dpanel",""]]},
 T:{ad:"Süre (T)",renk:"#06b6d4",tek:[["T","tpanel",""]]},
 L:{ad:"Çizgi (L)",renk:"#10b981",tek:[["L","lpanel",""]]},
 SJ:{ad:"Üst Hakemler (SJ)",renk:"#f59e0b",tek:[["SJA","sjpanel","&panelType=sja"],["SJE","sjpanel","&panelType=sje"],["SJD","sjpanel","&panelType=sjd"]]}};
const TIP_SIRA=["A","E","D","T","L","SJ"];
const slotlar=g=>{const out=[];TIP_SIRA.forEach(t=>{if(!g?.tipler?.[t])return;const d=TIP[t];
 if(d.coklu){const n=Math.max(1,Math.min(d.coklu.max,parseInt(g.adet?.[t])||d.coklu.max));for(let i=1;i<=n;i++)out.push({slot:d.coklu.on+i,tip:t,yol:d.coklu.yol,ek:d.coklu.ek(i)})}
 else d.tek.forEach(([s,y,ek])=>out.push({slot:s,tip:t,yol:y,ek}))});return out};
const pidOf=(gid,slot)=>gid+"_"+String(slot).toLowerCase();
const yeniGid=()=>"pg"+Date.now().toString(36)+Math.random().toString(36).slice(2,5);
const kListe=o=>Object.keys(o||{}).filter(k=>o[k]);
let _qrMod=null;const qrAl=async t=>{try{_qrMod=_qrMod||(await import("https://cdn.jsdelivr.net/npm/qrcode@1.5.4/+esm")).default;return await _qrMod.toDataURL(t,{margin:1,width:360})}catch{return null}};

function Paneller(){
 const{toast}=usToast();usDisc();
 const[comps,setComps]=R.useState({}),[comp,setComp]=R.useState(""),[C,setC]=R.useState(null),[busy,setBusy]=R.useState(!1),[form,setForm]=R.useState(null),[acik,setAcik]=R.useState({}),[qr,setQr]=R.useState(null);

 R.useEffect(()=>{const u=onValue(ref(db,BASE),s=>{const v=s.val()||{},o={};Object.entries(v).forEach(([k,c])=>{c&&c.isim&&c.arsivli!==!0&&c.arsivli!=="true"&&(o[k]={isim:c.isim,t:c.baslangicTarihi||""})});setComps(o)});return()=>u()},[]);
 // seçili yarışmanın yalnızca gereken düğümleri dinlenir
 R.useEffect(()=>{if(!comp){setC(null);return}const st={};const set=(k,v)=>{st[k]=v;setC({...st})};
  const ul=[["isim","isim"],["kategoriler","kategoriler"],["panelGruplari","panelGruplari"],["hakemLinkleri","hakemLinkleri"],["epanelToken","epanelToken"],["aktifSporcu","aktifSporcu"]].map(([k,p])=>onValue(ref(db,`${BASE}/${comp}/${p}`),s=>set(k,s.val())));
  return()=>ul.forEach(u=>u())},[comp]);
 R.useEffect(()=>{if(comp&&C&&"isim"in C&&!C.isim){toast(__T("Seçili yarışma silinmiş; seçim kaldırıldı."),"warning");setComp("");setForm(null)}},[comp,C?.isim]);
 const cats=C?.kategoriler||{},gruplar=C?.panelGruplari||{},linkler=C?.hakemLinkleri||{},token=C?.epanelToken||"";
 const katAd=k=>String(cats[k]?.name||V[k]?.label||V[String(k).replace(/^final_/,"")]?.label||k).replace(/^🏆\s*/,"🏆 ");
 const katSira=Object.keys(cats).sort((a,b)=>(/^final_/.test(a)?1:0)-(/^final_/.test(b)?1:0)||String(V[a.replace(/^final_/,"")]?.group||"").localeCompare(String(V[b.replace(/^final_/,"")]?.group||""),"tr")||katAd(a).localeCompare(katAd(b),"tr"));
 const link=(gid,s)=>`${location.origin}/aerobik/${s.yol}?competitionId=${encodeURIComponent(comp)}&linkId=${pidOf(gid,s.slot)}${s.ek}${token?`&token=${token}`:""}`;
 const aktifKat=ks=>{const a=C?.aktifSporcu||{};let en=null,t=-1;ks.forEach(k=>{const x=a[k];if(x&&(+x.ts||0)>t){t=+x.ts||0;en=k}});return en};

 // ---- yaz ----
 const yaz=async(upd,msg)=>{if(!C||!C.isim){toast(__T("Bu yarışma artık mevcut değil; değişiklik yazılmadı."),"error");return}setBusy(!0);try{await update(ref(db,`${BASE}/${comp}`),upd);msg&&toast(msg,"success")}catch(er){console.error(er);toast(__T("Kaydedilemedi."),"error")}setBusy(!1)};
 const panelKaydi=(g,gid,s,katObj)=>({ad:`${g.ad} · ${s.slot}`,kategoriler:Object.keys(katObj||{}).length?katObj:null,tumKategoriler:!1,panelGrubu:gid,slot:s.slot,guncelleme:Date.now()});

 // grup oluştur / düzenle
 const formAc=gid=>{const g=gid?gruplar[gid]:null;setForm(g?{gid,ad:g.ad||"",tipler:{...(g.tipler||{})},adet:{A:g.adet?.A||4,E:g.adet?.E||4},kategoriler:{...(g.kategoriler||{})}}:{gid:null,ad:"",tipler:{A:!0,E:!0,D:!0,T:!0,L:!0,SJ:!0},adet:{A:4,E:4},kategoriler:{}})};
 const formKaydet=async()=>{const f=form;if(!f)return;if(!C||!C.isim){toast(__T("Bu yarışma artık mevcut değil; değişiklik yazılmadı."),"error");return}const ad=f.ad.trim();
  if(!ad){toast(__T("Grup adını yazın."),"warning");return}
  if(!TIP_SIRA.some(t=>f.tipler[t])){toast(__T("En az bir panel tipi seçin."),"warning");return}
  const gid=f.gid||yeniGid(),eski=f.gid?gruplar[f.gid]:null,yeniG={ad,tipler:Object.fromEntries(TIP_SIRA.filter(t=>f.tipler[t]).map(t=>[t,!0])),adet:{A:f.adet.A,E:f.adet.E},kategoriler:Object.keys(f.kategoriler).filter(k=>f.kategoriler[k]).length?Object.fromEntries(kListe(f.kategoriler).map(k=>[k,!0])):null};
  const yeniS=slotlar(yeniG),eskiS=eski?slotlar(eski):[],upd={};
  const ozel={...(eski?.paneller||{})};
  // kaldırılan paneller
  const kaldir=eskiS.filter(s=>!yeniS.some(y=>y.slot===s.slot));
  if(kaldir.length&&!window.confirm(kaldir.map(s=>s.slot).join(", ")+" — "+__T("bu panellerin linkleri silinecek; açık olan bu paneller çalışmaz hâle gelir. Devam edilsin mi?")))return;
  kaldir.forEach(s=>{upd[`hakemLinkleri/${pidOf(gid,s.slot)}`]=null;delete ozel[s.slot]});
  yeniS.forEach(s=>{const pid=pidOf(gid,s.slot),cur=linkler[pid];
   if(!cur)upd[`hakemLinkleri/${pid}`]=panelKaydi(yeniG,gid,s,yeniG.kategoriler);
   else{upd[`hakemLinkleri/${pid}/ad`]=`${ad} · ${s.slot}`;if(!ozel[s.slot]?.ozel)upd[`hakemLinkleri/${pid}/kategoriler`]=yeniG.kategoriler}});
  upd[`panelGruplari/${gid}`]={...yeniG,paneller:Object.keys(ozel).length?ozel:null,olusturma:eski?.olusturma||Date.now(),guncelleme:Date.now()};
  await yaz(upd,eski?__T("Panel grubu güncellendi ✓"):__T("Panel grubu oluşturuldu ✓"));setForm(null);setAcik(o=>({...o,[gid]:!0}))};
 const grupSil=async gid=>{const g=gruplar[gid];if(!g)return;
  if(!window.confirm(g.ad+" — "+__T("grup ve tüm panel linkleri silinsin mi? Açık olan bu paneller çalışmaz hâle gelir.")))return;
  const upd={[`panelGruplari/${gid}`]:null};slotlar(g).forEach(s=>{upd[`hakemLinkleri/${pidOf(gid,s.slot)}`]=null});
  Object.keys(linkler).forEach(k=>{if(linkler[k]?.panelGrubu===gid)upd[`hakemLinkleri/${k}`]=null});
  await yaz(upd,__T("Panel grubu silindi."))};

 // kategori ekle / çıkar (anında, canlı)
 const grupKatTik=(gid,k)=>{const g=gruplar[gid],on=!g?.kategoriler?.[k],upd={[`panelGruplari/${gid}/kategoriler/${k}`]:on?!0:null};
  slotlar(g).forEach(s=>{if(!g.paneller?.[s.slot]?.ozel)upd[`hakemLinkleri/${pidOf(gid,s.slot)}/kategoriler/${k}`]=on?!0:null});
  yaz(upd,(on?"＋ ":"－ ")+katAd(k)+" · "+g.ad)};
 const panelKatTik=(gid,s,k)=>{const pid=pidOf(gid,s.slot),on=!linkler[pid]?.kategoriler?.[k];
  yaz({[`hakemLinkleri/${pid}/kategoriler/${k}`]:on?!0:null},(on?"＋ ":"－ ")+katAd(k)+" · "+s.slot)};
 const ozelDegis=(gid,s,v)=>{const g=gruplar[gid],pid=pidOf(gid,s.slot),upd={[`panelGruplari/${gid}/paneller/${s.slot}`]:v?{ozel:!0}:null};
  if(!v)upd[`hakemLinkleri/${pid}/kategoriler`]=g.kategoriler||null;
  yaz(upd,v?s.slot+" — "+__T("özel kategori listesi açıldı"):s.slot+" — "+__T("grubun kategorilerine döndü"))};
 const eksikOnar=gid=>{const g=gruplar[gid],upd={};slotlar(g).forEach(s=>{const pid=pidOf(gid,s.slot);if(!linkler[pid])upd[`hakemLinkleri/${pid}`]=panelKaydi(g,gid,s,g.paneller?.[s.slot]?.ozel?{}:g.kategoriler)});
  Object.keys(upd).length&&yaz(upd,__T("Eksik panel kayıtları oluşturuldu."))};

 const kopyala=async t=>{try{await navigator.clipboard.writeText(t);toast(__T("Kopyalandı ✓"),"success")}catch{window.prompt(__T("Linki kopyalayın:"),t)}};
 const qrGoster=async(baslik,url)=>{setQr({baslik,url,img:null});const img=await qrAl(url);setQr(o=>o&&o.url===url?{...o,img:img||"yok"}:o)};
 const qrSayfasi=async gid=>{const g=gruplar[gid],ss=slotlar(g),w=window.open("","_blank");if(!w){toast(__T("Açılır pencere engellendi."),"warning");return}
  w.document.write(`<title>${g.ad} — QR</title><p style="font:16px sans-serif">${__T("Hazırlanıyor…")}</p>`);
  const kart=[];for(const s of ss){const u=link(gid,s),im=await qrAl(u);kart.push(`<div class="k"><div class="t" style="color:${TIP[s.tip].renk}">${s.slot}</div><div class="g">${g.ad} · ${TIP[s.tip].ad}</div>${im?`<img src="${im}">`:""}<div class="u">${u.replace(/&/g,"&amp;")}</div></div>`)}
  w.document.open();w.document.write(`<!doctype html><html><head><meta charset="utf-8"><title>${g.ad} — ${__T("Panel QR")}</title><style>body{font-family:system-ui,sans-serif;margin:16px}h1{font-size:18px}.w{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}.k{border:1px solid #334155;border-radius:10px;padding:10px;text-align:center;break-inside:avoid}.t{font-size:26px;font-weight:900}.g{font-size:12px;color:#475569}.k img{width:100%;max-width:220px}.u{font-size:8px;color:#94a3b8;word-break:break-all}@media print{button{display:none}}</style></head><body><h1>${(comps[comp]?.isim)||""} — ${g.ad}</h1><button onclick="print()">${__T("Yazdır")}</button><div class="w">${kart.join("")}</div></body></html>`);w.document.close()};

 // ---- görünüm ----
 const S={wrap:{minHeight:"100vh",background:"#F0F2F5",color:"#1A1D26",fontFamily:"Nunito,system-ui,-apple-system,sans-serif",paddingBottom:"3rem"},
  top:{position:"sticky",top:0,zIndex:10,background:"#fff",backdropFilter:"blur(12px)",borderBottom:"1px solid #E5E7EB",boxShadow:"0 1px 3px rgba(0,0,0,.06)",padding:"0 1.25rem",minHeight:68,display:"flex",alignItems:"center",gap:".9rem",flexWrap:"wrap"},
  back:{width:38,height:38,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",color:"#1A1D26",textDecoration:"none",flexShrink:0},
  ico:{width:44,height:44,borderRadius:12,boxShadow:"0 6px 18px rgba(99,102,241,.28)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,background:"linear-gradient(135deg,#db2777,#6366f1)"},
  in:{maxWidth:1150,margin:"0 auto",padding:"1.25rem"},
  card:{background:"#fff",border:"1px solid #E5E7EB",borderRadius:16,padding:"1.1rem 1.15rem",marginBottom:"1rem"},
  sel:{width:"100%",padding:".6rem .8rem",borderRadius:10,border:"1px solid #E5E7EB",background:"#fff",color:"#1A1D26",fontWeight:700,fontSize:".92rem",marginBottom:"1rem"},
  inp:{width:"100%",padding:".5rem .65rem",borderRadius:9,border:"1px solid #E5E7EB",background:"#F8FAFC",color:"#1A1D26",fontWeight:700,fontSize:".9rem"},
  chip:(on,c)=>({padding:".28rem .55rem",borderRadius:8,fontSize:".76rem",fontWeight:700,cursor:"pointer",border:"1px solid "+(on?(c||"#0ea5e9"):"#E5E7EB"),background:on?(c||"#0ea5e9")+"2e":"#F8FAFC",color:on?"#0F172A":"#64748B",whiteSpace:"nowrap",userSelect:"none"}),
  btn:{padding:".55rem .9rem",borderRadius:10,border:"none",color:"#fff",fontWeight:800,cursor:"pointer",fontSize:".85rem"},
  ghost:{padding:".45rem .75rem",borderRadius:9,border:"1px solid #E5E7EB",background:"#fff",color:"#334155",fontWeight:800,cursor:"pointer",fontSize:".78rem",whiteSpace:"nowrap"},
  lbl:{fontSize:".7rem",color:"#6B7280",fontWeight:800,textTransform:"uppercase",letterSpacing:".04em"},
  slot:c=>({minWidth:54,textAlign:"center",fontWeight:900,fontSize:"1rem",color:c,border:"1px solid "+c+"66",background:c+"1f",borderRadius:9,padding:".35rem .5rem"})};
 const katChips=(secili,onTik,renk,devre)=>e.jsx("div",{style:{display:"flex",gap:".3rem",flexWrap:"wrap"},children:katSira.map(k=>e.jsx("span",{style:{...S.chip(!!secili?.[k],renk),opacity:devre?.45:1,pointerEvents:devre?"none":"auto"},onClick:()=>!busy&&onTik(k),children:katAd(k)},k))});

 const grupKarti=gid=>{const g=gruplar[gid],ss=slotlar(g),op=acik[gid]!==!1,gk=kListe(g.kategoriler),ak=aktifKat(gk),eksik=ss.filter(s=>!linkler[pidOf(gid,s.slot)]);
  return e.jsxs("div",{style:{...S.card,borderColor:"#C7D2FE"},children:[
   e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:".6rem",flexWrap:"wrap"},children:[
    e.jsx("button",{style:{...S.ghost,padding:".3rem .55rem"},onClick:()=>setAcik(o=>({...o,[gid]:!op})),children:op?"▲":"▼"}),
    e.jsxs("div",{style:{flex:1,minWidth:200},children:[e.jsx("div",{style:{fontWeight:900,fontSize:"1.05rem"},children:g.ad}),
     e.jsxs("div",{style:{fontSize:".76rem",color:"#6B7280",fontWeight:700},children:[TIP_SIRA.filter(t=>g.tipler?.[t]).map(t=>t+(TIP[t].coklu?"×"+(g.adet?.[t]||4):"")).join(" · ")," · ",ss.length," ",__T("panel")," · ",gk.length," ",__T("kategori"),
      ak?e.jsxs("span",{style:{color:"#15803D"},children:["  ● ",__T("şu an")," ",katAd(ak)]}):null]})]}),
    e.jsx("button",{style:S.ghost,onClick:()=>kopyala(ss.map(s=>`${s.slot}: ${link(gid,s)}`).join("\n")),children:__T("Tüm linkleri kopyala")}),
    e.jsx("button",{style:S.ghost,onClick:()=>qrSayfasi(gid),children:__T("QR sayfası")}),
    e.jsx("button",{style:S.ghost,onClick:()=>formAc(gid),children:__T("Düzenle")}),
    e.jsx("button",{style:{...S.ghost,borderColor:"#FECACA",color:"#DC2626"},onClick:()=>grupSil(gid),children:__T("Sil")})]}),
   op?e.jsxs(e.Fragment,{children:[
    eksik.length?e.jsxs("div",{style:{marginTop:".7rem",fontSize:".8rem",color:"#B45309",fontWeight:700},children:[eksik.map(s=>s.slot).join(", ")," — ",__T("panel kaydı eksik. "),e.jsx("button",{style:{...S.ghost,padding:".2rem .5rem"},onClick:()=>eksikOnar(gid),children:__T("Oluştur")})]}):null,
    e.jsxs("div",{style:{marginTop:".8rem",padding:".7rem .8rem",background:"#F8FAFC",border:"1px solid #E5E7EB",borderRadius:12},children:[
     e.jsxs("div",{style:{...S.lbl,marginBottom:".45rem"},children:[__T("Grubun kategorileri")," ",e.jsx("span",{style:{textTransform:"none",letterSpacing:0,fontWeight:600},children:__T("(dokununca anında eklenir/çıkarılır; özel listesi olmayan tüm panellere uygulanır)")})]}),
     katChips(g.kategoriler,k=>grupKatTik(gid,k),"#22c55e")]}),
    TIP_SIRA.filter(t=>g.tipler?.[t]).map(t=>e.jsxs("div",{style:{marginTop:".8rem"},children:[
     e.jsx("div",{style:{...S.lbl,color:TIP[t].renk,marginBottom:".35rem"},children:__T(TIP[t].ad)}),
     ss.filter(s=>s.tip===t).map(s=>{const pid=pidOf(gid,s.slot),rec=linkler[pid],oz=!!g.paneller?.[s.slot]?.ozel,pk=kListe(rec?.kategoriler),u=link(gid,s);
      return e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"64px 1fr auto",gap:".6rem",alignItems:"start",padding:".5rem 0",borderBottom:"1px solid #EEF2F7"},children:[
       e.jsx("div",{style:S.slot(TIP[t].renk),children:s.slot}),
       e.jsxs("div",{style:{minWidth:0},children:[
        e.jsxs("div",{style:{display:"flex",gap:".5rem",alignItems:"center",flexWrap:"wrap",marginBottom:oz?".4rem":0},children:[
         e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:".35rem",fontSize:".76rem",fontWeight:700,color:oz?"#B45309":"#6B7280",cursor:"pointer"},children:[e.jsx("input",{type:"checkbox",checked:oz,disabled:busy,onChange:ev=>ozelDegis(gid,s,ev.target.checked)}),__T("Özel kategori listesi")]}),
         !oz?e.jsx("span",{style:{fontSize:".76rem",color:"#6B7280",fontWeight:600},children:pk.length?pk.map(katAd).join(", "):__T("— kategori yok —")}):null]}),
        oz?katChips(rec?.kategoriler,k=>panelKatTik(gid,s,k),TIP[t].renk,!rec):null]}),
       e.jsxs("div",{style:{display:"flex",gap:".35rem",flexWrap:"wrap",justifyContent:"flex-end"},children:[
        e.jsx("button",{style:S.ghost,onClick:()=>kopyala(u),children:__T("Kopyala")}),
        e.jsx("button",{style:S.ghost,onClick:()=>window.open(u,"_blank"),children:__T("Aç")}),
        e.jsx("button",{style:S.ghost,onClick:()=>qrGoster(`${g.ad} · ${s.slot}`,u),children:"QR"})]})]},s.slot)})]},t))]}):null]},gid)};

 const formKarti=()=>{const f=form;return e.jsxs("div",{style:{...S.card,borderColor:"#db2777"},children:[
  e.jsx("div",{style:{fontWeight:900,marginBottom:".7rem"},children:f.gid?__T("Panel grubunu düzenle"):__T("Yeni panel grubu")}),
  e.jsx("div",{style:S.lbl,children:__T("Grup adı")}),
  e.jsx("input",{style:{...S.inp,margin:".3rem 0 .8rem"},placeholder:__T("ör. Salon 1 / Panel 1"),value:f.ad,onChange:t=>setForm({...f,ad:t.target.value})}),
  e.jsx("div",{style:S.lbl,children:__T("Bu grupta hangi paneller olacak?")}),
  e.jsx("div",{style:{display:"flex",gap:".5rem",flexWrap:"wrap",margin:".4rem 0 .8rem"},children:TIP_SIRA.map(t=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:".35rem",border:"1px solid "+(f.tipler[t]?TIP[t].renk:"#E5E7EB"),background:f.tipler[t]?TIP[t].renk+"22":"#F8FAFC",borderRadius:10,padding:".35rem .6rem"},children:[
   e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:".35rem",fontWeight:800,fontSize:".82rem",cursor:"pointer"},children:[e.jsx("input",{type:"checkbox",checked:!!f.tipler[t],onChange:ev=>setForm({...f,tipler:{...f.tipler,[t]:ev.target.checked}})}),__T(TIP[t].ad)]}),
   TIP[t].coklu&&f.tipler[t]?e.jsx("select",{style:{background:"#F8FAFC",color:"#1A1D26",border:"1px solid #E5E7EB",borderRadius:7,fontWeight:800,padding:".15rem .3rem"},value:f.adet[t],onChange:ev=>setForm({...f,adet:{...f.adet,[t]:parseInt(ev.target.value)}}),children:Array.from({length:TIP[t].coklu.max},(_,i)=>i+1).map(n=>e.jsx("option",{value:n,children:n+" "+__T("hakem")+" ("+TIP[t].coklu.on+"1–"+TIP[t].coklu.on+n+")"},n))}):null,
   TIP[t].tek?e.jsx("span",{style:{fontSize:".7rem",color:"#6B7280",fontWeight:700},children:TIP[t].tek.map(x=>x[0]).join(", ")}):null]},t))}),
  e.jsx("div",{style:S.lbl,children:__T("Grubun kategorileri (sonradan da eklenip çıkarılabilir)")}),
  e.jsx("div",{style:{margin:".4rem 0 .9rem"},children:katSira.length?e.jsx("div",{style:{display:"flex",gap:".3rem",flexWrap:"wrap"},children:katSira.map(k=>e.jsx("span",{style:S.chip(!!f.kategoriler[k],"#22c55e"),onClick:()=>setForm(o=>({...o,kategoriler:{...o.kategoriler,[k]:!o.kategoriler[k]}})),children:katAd(k)},k))}):e.jsx("span",{style:{color:"#6B7280",fontSize:".8rem"},children:__T("Bu yarışmada kategori yok.")})}),
  e.jsxs("div",{style:{display:"flex",gap:".6rem",justifyContent:"flex-end"},children:[e.jsx("button",{style:S.ghost,onClick:()=>setForm(null),children:__T("Vazgeç")}),
   e.jsx("button",{style:{...S.btn,background:"linear-gradient(135deg,#db2777,#6366f1)"},disabled:busy,onClick:formKaydet,children:f.gid?__T("Kaydet"):__T("Grubu oluştur")})]})]})};

 const gl=Object.keys(gruplar).sort((a,b)=>String(gruplar[a]?.ad||"").localeCompare(String(gruplar[b]?.ad||""),"tr",{numeric:!0}));
 return e.jsxs("div",{style:S.wrap,children:[
  e.jsxs("div",{style:S.top,children:[e.jsx("a",{href:"/aerobik",title:__T("Geri"),style:S.back,children:e.jsx("span",{className:"material-icons-round",children:"arrow_back"})}),e.jsx("div",{style:S.ico,children:e.jsx("span",{className:"material-icons-round",style:{color:"#fff"},children:"view_module"})}),
   e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:".72rem",color:"#6B7280",fontWeight:800,textTransform:"uppercase",letterSpacing:".05em"},children:__T("Aerobik")}),e.jsx("div",{style:{fontWeight:900,fontSize:"1.05rem"},children:__T("Paneller")})]})
   ]}),
  e.jsxs("div",{style:S.in,children:[
   e.jsxs("select",{style:S.sel,value:comp,onChange:t=>{setComp(t.target.value);setForm(null)},children:[e.jsx("option",{value:"",children:__T("Yarışma seçin…")}),
    Object.entries(comps).sort((a,b)=>String(b[1].t).localeCompare(String(a[1].t))).map(([k,c])=>e.jsx("option",{value:k,children:c.isim},k))]}),
   comp&&C?e.jsxs(e.Fragment,{children:[
    e.jsxs("div",{style:{...S.card,display:"flex",gap:".8rem",alignItems:"center",flexWrap:"wrap"},children:[
     e.jsx("div",{style:{flex:1,minWidth:240,fontSize:".82rem",color:"#6B7280",fontWeight:600,lineHeight:1.5},children:__T("Panel grubu oluşturun (ör. Salon 1), içinde hangi panellerin (A, E, D, T, L, SJ) olacağını ve hakem sayısını seçin. Her panelin linki/QR'ı ayrıdır. Kategori eklediğinizde/çıkardığınızda açık paneller anında güncellenir.")}),
     e.jsx("button",{style:{...S.btn,background:"linear-gradient(135deg,#db2777,#6366f1)"},onClick:()=>formAc(null),children:"+ "+__T("Yeni panel grubu")})]}),
    (()=>{const o=location.origin,tk=token?"&token="+token:"",cid=encodeURIComponent(comp),L=[
      ["gavel","#7C3AED",__T("Üst Jüri"),o+"/aerobik/ustjuri?competitionId="+cid+tk],
      ["groups","#0EA5E9",__T("Teknik Kurul"),o+"/aerobik/teknikkurul?competitionId="+cid+tk],
      ["flag","#DC2626",__T("İtiraz Ekranı"),o+"/aerobik/itiraz?competitionId="+cid+tk],
      ["live_tv","#D97706",__T("Canlı Skor (Flashcard)"),o+"/aerobik-canli-skor.html?compId="+cid],
      ["balance","#DB2777",__T("SJA · Artistik"),o+"/aerobik/sjpanel?competitionId="+cid+"&catId=__ALL__&panelType=sja"+tk],
      ["balance","#16A34A",__T("SJE · Uygulama"),o+"/aerobik/sjpanel?competitionId="+cid+"&catId=__ALL__&panelType=sje"+tk],
      ["balance","#2563EB",__T("SJD · Zorluk"),o+"/aerobik/sjpanel?competitionId="+cid+"&catId=__ALL__&panelType=sjd"+tk],
      ["videocam","#475569",__T("Kamera A"),o+"/aerobik-kamera.html?cam=a&compId="+cid],
      ["videocam","#475569",__T("Kamera B"),o+"/aerobik-kamera.html?cam=b&compId="+cid],
      ["qr_code_2","#0F766E",__T("Birleşik Panel QR"),o+"/aerobik-panel-birlestir.html"],
      ["format_list_numbered","#9333EA",__T("Çıkış Sırası"),o+"/aerobik-cikis-sirasi.html?comp="+cid]];
     const ib={width:32,height:32,borderRadius:9,border:"1px solid #E5E7EB",background:"#fff",color:"#334155",display:"inline-flex",alignItems:"center",justifyContent:"center",cursor:"pointer",flexShrink:0};
     return e.jsxs("div",{style:{...S.card,borderColor:"#FCD34D",background:"linear-gradient(135deg,#FFFBEB,#fff 60%)"},children:[
      e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:".6rem",marginBottom:".8rem"},children:[e.jsx("div",{style:{width:38,height:38,borderRadius:11,background:"linear-gradient(135deg,#F59E0B,#D97706)",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0},children:e.jsx("span",{className:"material-icons-round",children:"dashboard"})}),
       e.jsxs("div",{children:[e.jsx("div",{style:{fontWeight:900,fontSize:"1rem"},children:__T("Hakem & Yönetim Ekranları")}),e.jsx("div",{style:{fontSize:".78rem",color:"#6B7280",fontWeight:600},children:__T("Seçili yarışma için tüm operasyon ekranları — yeni sekmede açılır.")})]})]}),
      e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(250px,1fr))",gap:".5rem"},children:L.map(([ic,c,t,u])=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:".45rem",border:"1px solid #E5E7EB",borderRadius:12,padding:".45rem .5rem .45rem .6rem",background:"#fff"},children:[
        e.jsx("span",{className:"material-icons-round",style:{color:c,fontSize:"1.15rem"},children:ic}),
        e.jsx("a",{href:u,target:"_blank",rel:"noreferrer",style:{flex:1,minWidth:0,fontWeight:800,fontSize:".86rem",color:"#1A1D26",textDecoration:"none",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},title:u,children:t}),
        e.jsx("button",{type:"button",style:ib,title:__T("Linki kopyala"),onClick:()=>{kopyala(u)},children:e.jsx("span",{className:"material-icons-round",style:{fontSize:"1rem"},children:"content_copy"})}),
        e.jsx("button",{type:"button",style:ib,title:__T("QR göster"),onClick:()=>qrGoster(t,u),children:e.jsx("span",{className:"material-icons-round",style:{fontSize:"1rem"},children:"qr_code_2"})}),
        e.jsx("a",{href:u,target:"_blank",rel:"noreferrer",style:{...ib,textDecoration:"none"},title:__T("Aç"),children:e.jsx("span",{className:"material-icons-round",style:{fontSize:"1rem"},children:"open_in_new"})})]},t))})]})})(),
    !token?e.jsx("div",{style:{...S.card,borderColor:"#f59e0b",color:"#B45309",fontWeight:700,fontSize:".84rem"},children:__T("Bu yarışmanın hakem anahtarı (epanelToken) yok; linkler anahtarsız üretilir.")}):null,
    form?formKarti():null,
    gl.length?gl.map(grupKarti):!form?e.jsx("div",{style:{...S.card,textAlign:"center",color:"#6B7280",fontWeight:700},children:__T("Henüz panel grubu yok.")}):null
   ]}):comp?e.jsx("div",{style:{color:"#6B7280",fontWeight:700},children:__T("Yükleniyor…")}):null]}),
  qr?e.jsx("div",{onClick:()=>setQr(null),style:{position:"fixed",inset:0,zIndex:50,background:"rgba(0,0,0,.7)",display:"flex",alignItems:"center",justifyContent:"center",padding:"1rem"},children:e.jsxs("div",{onClick:ev=>ev.stopPropagation(),style:{background:"#fff",color:"#0f172a",borderRadius:16,padding:"1.2rem",maxWidth:420,width:"100%",textAlign:"center"},children:[
   e.jsx("div",{style:{fontWeight:900,fontSize:"1.1rem",marginBottom:".6rem"},children:qr.baslik}),
   qr.img&&qr.img!=="yok"?e.jsx("img",{src:qr.img,alt:"QR",style:{width:"100%",maxWidth:320}}):e.jsx("div",{style:{padding:"2rem",color:"#64748b"},children:qr.img==="yok"?__T("QR oluşturulamadı; linki kopyalayın."):__T("Hazırlanıyor…")}),
   e.jsx("div",{style:{fontSize:".66rem",color:"#64748b",wordBreak:"break-all",margin:".5rem 0"},children:qr.url}),
   e.jsx("button",{style:{...S.btn,background:"#0f172a"},onClick:()=>setQr(null),children:__T("Kapat")})]})}):null]});
}
export{Paneller as default};
