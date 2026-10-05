import"./i18n-Tr01a2b3Cb2.js";import{b as usToast,a as usInit,j as e,d as db,u as usAuth,l as logAction}from"./main-C2LpyYUGCb2.js";import{r as R}from"./vendor-react-Cxw6bqwhCb2.js";import{k as ref,l as get,m as update}from"./vendor-firebase-940mxgRVCb2.js";import{R as RC,a as RA}from"./ritmikCriteriaDefaults-CgOlnfQcCb2.js";import"./modulepreload-polyfill-B5Qt9EMXCb2.js";

const BASE="ritmik_yarismalar",TOP=8,RES=2,TAKE=TOP+RES,AA="_cm";
const f3=v=>v==null||isNaN(v)?"—":Number(v).toFixed(3);
const isFinal=c=>/^final_/.test(c);
const baseCat=c=>String(c||"").replace(/^final_/,"").split("__")[0];
const cfg=c=>RC[c]||RC[baseCat(c)]||{};
const aletLabel=a=>RA[a]?.label||a;
const num=v=>v==null||v===""||isNaN(v)?null:Number(v);

function RitmikFinals(){
 const{toast}=usToast();usInit();const{currentUser:_lu}=usAuth()||{},_un=_lu?.adSoyad||_lu?.kullaniciAdi||"";
 const[comps,setComps]=R.useState({}),[comp,setComp]=R.useState(""),[busy,setBusy]=R.useState(!1),
       [log,setLog]=R.useState(null),[loading,setLoading]=R.useState(!0),
       [tmpl,setTmpl]=R.useState({}),[texp,setTexp]=R.useState(!1),[expanded,setExpanded]=R.useState({}),
       [sel,setSel]=R.useState({}),[limit,setLimit]=R.useState(2),[useAA,setUseAA]=R.useState(!0),[fill,setFill]=R.useState(!1);

 const reload=()=>get(ref(db,BASE)).then(s=>{const v=s.val()||{},o={};Object.entries(v).forEach(([k,c])=>{c&&c.arsivli!==!0&&c.arsivli!=="true"&&(o[k]=c)});setComps(o)}).finally(()=>setLoading(!1));
 R.useEffect(()=>{reload()},[]);

 const C=comps[comp]||{},cats=C.kategoriler||{},spor=C.sporcular||{},pun=C.puanlar||{};
 const realCats=Object.keys(cats).filter(c=>!isFinal(c)).sort();
 const finalCats=Object.keys(cats).filter(isFinal);
 const catLabel=c=>cats[c]?.name||cfg(c).label||c;
 const aletsOf=c=>{const a=cats[c]?.aletler;if(Array.isArray(a)&&a.length)return a.map(x=>typeof x=="object"?x.id||x.value:x);if(a&&typeof a=="object")return Object.keys(a);return cfg(c).aletler||[]};
 const clubOf=m=>String(m?.okul||m?.kulup||m?.il||"").trim();
 const isGrp=c=>{const d=cfg(c);return d.grupMu===!0||d.tip==="takim"||d.athleteCount>1};
 const keyOf=z=>String(z||"").trim().replace(/[.#$[\]/]/g,"-").slice(0,60);
 // Grup kategorilerinde katilimci = kulup grubu; bireysel kategorilerde = sporcu
 const partOf=cat=>{const sp=spor[cat]||{};if(!isGrp(cat))return sp;
   const Tm=new Map;Object.entries(sp).forEach(([id,m])=>{if(!m)return;
     const ok=String(m.okul||m.kulup||"").trim(),gn=m.grupNo||1,ky=ok+"|"+gn;
     Tm.has(ky)||Tm.set(ky,{id:keyOf(cat+"::"+ok+"::"+gn),okul:ok,kulup:m.kulup||ok,il:m.il||"",gn,members:[]});
     const G=Tm.get(ky);G.members.push({...m,id}),G.il||(G.il=m.il||"")});
   const out={};return Tm.forEach(G=>{out[G.id]={ad:G.members.map(z=>[z.ad,z.soyad].filter(Boolean).join(" ")).filter(Boolean).join(", ")+(G.gn>1?` (${G.gn}. Grup)`:""),
     soyad:"",okul:G.okul,kulup:G.kulup,il:G.il,isTeam:!0,uyeSayisi:G.members.length,uyeler:G.members}}),out};
 const nameOf=(cat,id)=>{const m=partOf(cat)[id]||{};return[m.ad,m.soyad].filter(Boolean).join(" ")||m.adSoyad||id};

 // Bir alet (ya da cok-mucadele) icin siralama + kulup kotasi
 const rank=(cat,alet)=>{
  const P=partOf(cat);
  const rows=Object.entries(pun[cat]||{}).map(([id,sc])=>{
    const s=alet===AA?num(sc?.sonuc):num(sc?.[alet]?.sonuc);
    return{id,score:s,club:clubOf(P[id])}}).filter(r=>r.score!=null)
   .sort((a,b)=>b.score-a.score);
  const cap=Math.max(0,parseInt(limit)||0),used={},pick=[],over=[];
  rows.forEach(r=>{const k=r.club||"—";
    if(cap>0&&(used[k]||0)>=cap&&pick.length<TAKE){over.push(r);return}
    if(pick.length<TAKE){used[k]=(used[k]||0)+1;pick.push(r)}});
  // kota yuzunden bos kalan yer varsa: yalnizca acikca istenirse elenenlerden tamamla
  if(fill)over.forEach(r=>{if(pick.length<TAKE)pick.push({...r,quotaFill:!0})});
  return{list:pick,excluded:over.filter(r=>!pick.includes(r))};
 };

 const tmplCs=r=>{const v=tmpl[r];return v!=null&&v!==""?Number(v):r};
 const csOf=r=>r>TOP?r:tmplCs(r);
 const usedVals=Array.from({length:TOP},(_,i)=>tmplCs(i+1));
 const dupWarn=new Set(usedVals).size!==usedVals.length;

 const key=(cat,alet)=>cat+"|"+alet;
 const isSel=(cat,alet)=>sel[key(cat,alet)]!==!1;
 const toggle=(cat,alet)=>setSel(o=>({...o,[key(cat,alet)]:!isSel(cat,alet)}));
 const units=[];realCats.forEach(c=>{if(useAA)units.push([c,AA]);aletsOf(c).forEach(a=>units.push([c,a]))});
 const selectedUnits=units.filter(([c,a])=>isSel(c,a)&&rank(c,a).list.length>0);

 const generate=async()=>{
  if(busy||!comp)return;setBusy(!0);setLog(null);
  const upd={},summary=[];
  selectedUnits.forEach(([cat,alet])=>{
   const{list}=rank(cat,alet);if(!list.length)return;
   const fcat=alet===AA?"final_"+cat:"final_"+cat+"__"+alet,newSpor={},names=[];
   const P=partOf(cat);
   list.forEach((row,ix)=>{const rk=ix+1,reserve=rk>TOP,cs=csOf(rk),md=P[row.id]||{},ek={cikisSirasi:cs,_finalRank:rk,...(reserve?{_yedek:"R"+(rk-TOP)}:{})};
     if(md.isTeam)(md.uyeler||[]).forEach((mm,mi)=>{const{id:_mid,...rest}=mm;newSpor[_mid||row.id+"_"+(mi+1)]={...rest,...ek}});
     else newSpor[row.id]={...md,...ek};
     names.push({rank:rk,cs,reserve,yed:reserve?"R"+(rk-TOP):null,name:nameOf(cat,row.id),club:row.club,score:row.score,quotaFill:!!row.quotaFill})});
   upd["kategoriler/"+fcat]={name:"🏆 "+catLabel(cat)+" — "+(alet===AA?"Genel Tasnif Finali":aletLabel(alet)+" Finali"),
     final:!0,baseCat:cat,alet:alet===AA?null:alet,aletler:alet===AA?aletsOf(cat):[alet],
     tip:cfg(cat).tip||"ferdi",grupMu:isGrp(cat)||null,athleteCount:cfg(cat).athleteCount||null,kulupKotasi:Math.max(0,parseInt(limit)||0)||null,olusturma:Date.now()};
   upd["sporcular/"+fcat]=newSpor;upd["puanlar/"+fcat]=null;
   summary.push({fcat,cat,alet,label:catLabel(cat),aletAd:alet===AA?"Genel Tasnif":aletLabel(alet),names})});
  if(!Object.keys(upd).length){toast("Seçili finallerde puanı girilmiş sporcu bulunamadı.","warning");setBusy(!1);return}
  try{await update(ref(db,BASE+"/"+comp),upd);logAction("final_create",`[Ritmik] ${summary.length} final oluşturuldu: ${summary.map(x=>x.label+" — "+x.aletAd).join(", ")}`.slice(0,480),{user:_un,competitionId:comp,discipline:"ritmik",data:{kulupKotasi:Math.max(0,parseInt(limit)||0),kotaTamamla:fill,finaller:summary.map(x=>({kategori:x.fcat,ad:x.label+" — "+x.aletAd,sporcular:x.names.map(n=>({cikis:n.reserve?n.yed:n.cs,ad:n.name,kulup:n.club,eleme:n.rank,puan:n.score}))}))}});await reload();setLog(summary);
    toast(summary.length+" final oluşturuldu ✓ — ilk "+TOP+" + "+RES+" yedek","success")}
  catch{toast("Hata oluştu.","error")}
  setBusy(!1)};

 const clearFinals=async()=>{
  if(busy||!comp)return;setBusy(!0);setLog(null);const upd={},keys=new Set();
  [Object.keys(cats),Object.keys(spor),Object.keys(pun)].forEach(a=>a.forEach(c=>{isFinal(c)&&keys.add(c)}));
  if(!keys.size){toast("Silinecek final kategorisi yok.","warning");setBusy(!1);return}
  keys.forEach(fc=>{upd["kategoriler/"+fc]=null;upd["sporcular/"+fc]=null;upd["puanlar/"+fc]=null});
  try{await update(ref(db,BASE+"/"+comp),upd);logAction("final_delete",`[Ritmik] ${keys.size} final kategorisi silindi`,{user:_un,competitionId:comp,discipline:"ritmik",data:{silinen:[...keys]}});await reload();toast(keys.size+" final kategorisi silindi.","success")}
  catch{toast("Hata oluştu.","error")}
  setBusy(!1)};

 const S={wrap:{minHeight:"100vh",background:"#F0F2F5",color:"#1A1D26",fontFamily:"Nunito,system-ui,-apple-system,sans-serif",paddingBottom:"3rem"},
  top:{position:"sticky",top:0,zIndex:10,background:"#fff",borderBottom:"1px solid #E5E7EB",boxShadow:"0 1px 3px rgba(0,0,0,.06)",padding:"0 1.25rem",minHeight:68,display:"flex",alignItems:"center",gap:".9rem",flexWrap:"wrap"},
  back:{width:38,height:38,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",color:"#1A1D26",textDecoration:"none",flexShrink:0},
  ico:{width:44,height:44,borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,background:"linear-gradient(135deg,#a855f7,#ec4899)",boxShadow:"0 6px 18px rgba(236,72,153,.32)"},
  in:{maxWidth:880,margin:"0 auto",padding:"1rem"},
  sel:{width:"100%",padding:".65rem .8rem",borderRadius:10,border:"1px solid #E5E7EB",background:"#fff",color:"#1A1D26",fontWeight:700,fontSize:".95rem",marginBottom:"1rem"},
  card:{background:"#fff",border:"1px solid #E5E7EB",borderRadius:14,padding:".8rem 1rem",marginBottom:".6rem",boxShadow:"0 1px 2px rgba(0,0,0,.03)"},
  badge:{fontSize:".7rem",fontWeight:800,padding:".2rem .5rem",borderRadius:6},
  yed:{fontSize:".72rem",fontWeight:900,padding:".25rem .5rem",borderRadius:6,background:"rgba(168,85,247,.12)",color:"#7E22CE",border:"1px solid #F5D0FE",background:"#FDF4FF",minWidth:38,textAlign:"center"},
  csb:{fontSize:".85rem",fontWeight:900,padding:".25rem .5rem",borderRadius:8,background:"rgba(236,72,153,.12)",color:"#BE185D",minWidth:34,textAlign:"center"},
  numin:{width:60,textAlign:"center",background:"#fff",border:"1px solid #ec489966",borderRadius:8,color:"#1A1D26",padding:".4rem",fontWeight:800,font:"inherit",fontSize:"1rem"},
  btn:{padding:".85rem 1.1rem",border:"none",borderRadius:12,fontWeight:800,fontSize:"1rem",cursor:"pointer",color:"#fff"},
  center:{maxWidth:560,margin:"3rem auto 0",textAlign:"center",color:"#6B7280",fontWeight:700,padding:"2rem 1rem"}};

 const unitCard=(cat,alet)=>{const{list,excluded}=rank(cat,alet),fc=alet===AA?"final_"+cat:"final_"+cat+"__"+alet,
   has=!!cats[fc],k=key(cat,alet),op=!!expanded[k]&&list.length>0,
   nc=Math.min(list.length,TOP),nr=Math.max(0,list.length-TOP),on=isSel(cat,alet);
  return e.jsxs("div",{style:{...S.card,marginLeft:"1rem",opacity:list.length?1:.55,borderColor:on&&list.length?"#F9A8D4":"#E5E7EB"},children:[
    e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:".7rem"},children:[
      e.jsx("input",{type:"checkbox",checked:on,disabled:!list.length,onChange:()=>toggle(cat,alet),style:{width:18,height:18,accentColor:"#a855f7",cursor:"pointer"}}),
      e.jsxs("div",{style:{flex:1,minWidth:0,cursor:list.length?"pointer":"default"},onClick:()=>list.length&&setExpanded(x=>({...x,[k]:!x[k]})),children:[
        e.jsxs("div",{style:{fontWeight:800},children:[alet===AA?__T("Genel Tasnif"):aletLabel(alet),
          alet===AA?e.jsx("span",{style:{...S.badge,marginLeft:".4rem",background:"rgba(59,130,246,.12)",color:"#1D4ED8"},children:__T("TÜM ALETLER")}):null]}),
        e.jsx("div",{style:{color:"#6B7280",fontSize:".8rem",fontWeight:700},children:list.length?nc+" sporcu"+(nr?" + "+nr+" yedek":"")+(excluded.length?" · "+excluded.length+" sporcu kulüp kotasıyla elendi":"")+" · ayrıntı için dokunun":"puanı girilmiş sporcu yok"})]}),
      has?e.jsx("span",{style:{...S.badge,background:"rgba(34,197,94,.18)",color:"#15803D"},children:__T("✓ VAR")}):null,
      list.length?e.jsx("span",{style:{color:"#6B7280",fontWeight:800},children:op?"▲":"▼"}):null]}),
    op?e.jsxs("div",{style:{marginTop:".7rem",borderTop:"1px solid #F1F5F9",paddingTop:".6rem"},children:[
      list.map((row,ix)=>({row,rank:ix+1,cs:csOf(ix+1),reserve:ix+1>TOP})).sort((a,b)=>(a.reserve?1e3+a.rank:a.cs)-(b.reserve?1e3+b.rank:b.cs)).map(it=>
        e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:".6rem",padding:".3rem 0",borderBottom:"1px solid #F1F5F9"},children:[
          it.reserve?e.jsx("span",{style:S.yed,children:__T("R")+(it.rank-TOP)}):e.jsx("span",{style:S.csb,children:it.cs}),
          e.jsxs("span",{style:{flex:1,minWidth:0,fontWeight:700,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:[nameOf(cat,it.row.id),
            it.row.club?e.jsxs("span",{style:{color:"#6B7280",fontWeight:600,fontSize:".8rem"},children:[" · ",it.row.club]}):null,
            it.row.quotaFill?e.jsx("span",{style:{...S.badge,marginLeft:".35rem",background:"rgba(245,158,11,.18)",color:"#B45309"},children:__T("kota dışı tamamlama")}):null]}),
          e.jsxs("span",{style:{color:"#6B7280",fontSize:".78rem",whiteSpace:"nowrap"},children:["eleme ",it.rank,". · ",f3(it.row.score)]})]},it.row.id)),
      excluded.length?e.jsxs("div",{style:{marginTop:".5rem",fontSize:".76rem",color:"#B45309",fontWeight:700},children:["Kulüp kotası (",limit,") nedeniyle elenen: ",excluded.map(r=>nameOf(cat,r.id)).join(", ")]}):null]}):null]},k)};

 return e.jsxs("div",{style:S.wrap,children:[
  e.jsxs("div",{style:S.top,children:[e.jsx("a",{href:"/ritmik",title:__T("Geri"),style:S.back,children:e.jsx("span",{className:"material-icons-round",children:"arrow_back"})}),
    e.jsx("div",{style:S.ico,children:e.jsx("span",{className:"material-icons-round",style:{color:"#fff",fontSize:"22px"},children:"emoji_events"})}),
    e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:".72rem",color:"#6B7280",fontWeight:800,textTransform:"uppercase",letterSpacing:".05em"},children:__T("Ritmik")}),
      e.jsx("div",{style:{fontWeight:800,fontSize:"1.05rem",lineHeight:1.1},children:__T("Final Oluştur")})]})]}),
  e.jsxs("div",{style:S.in,children:[
   e.jsx("div",{style:{fontSize:".85rem",color:"#6B7280",fontWeight:700,margin:"0 0 .8rem"},children:"Her alet için elemede ilk 8 sporcu alet finaline, 9-10. sporcular R1/R2 yedek olarak alınır. Kulüp kotası uygulanır (FIG'de ülke başına en çok 2); kota nedeniyle 8 sporcu çıkmazsa final eksik kadroyla kurulur — 8'e tamamlamak isterseniz ilgili kutuyu işaretleyin. Genel tasnif (tüm aletler toplamı) finali ayrıca oluşturulabilir."}),
   loading?e.jsx("div",{style:S.center,children:__T("Yükleniyor…")}):e.jsxs(e.Fragment,{children:[
    e.jsxs("select",{style:S.sel,value:comp,onChange:x=>{setComp(x.target.value);setLog(null);setTmpl({});setExpanded({});setSel({})},children:[
      e.jsx("option",{value:"",children:__T("— Yarışma seçin —")}),
      Object.entries(comps).map(([id,c])=>e.jsx("option",{value:id,children:c.isim||c.ad||id},id))]}),
    comp?e.jsxs(e.Fragment,{children:[
      realCats.length===0?e.jsx("div",{style:S.center,children:__T("Bu yarışmada kategori yok.")}):e.jsxs(e.Fragment,{children:[
        e.jsxs("div",{style:{...S.card,display:"flex",alignItems:"center",gap:"1rem",flexWrap:"wrap",border:"1px solid #F5D0FE",background:"#FDF4FF"},children:[
          e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:".5rem",fontWeight:700,fontSize:".85rem"},children:[
            "Kulüp kotası",e.jsx("input",{type:"number",min:"0",max:"8",value:limit,onChange:x=>setLimit(x.target.value),style:S.numin}),
            e.jsx("span",{style:{color:"#6B7280",fontSize:".76rem",fontWeight:600},children:__T("0 = kota yok")})]}),
          e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:".5rem",fontWeight:700,fontSize:".85rem"},children:[
            e.jsx("input",{type:"checkbox",checked:useAA,onChange:()=>setUseAA(v=>!v),style:{width:18,height:18,accentColor:"#a855f7",cursor:"pointer"}}),
            "Genel tasnif finalini de üret"]}),
          e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:".5rem",fontWeight:700,fontSize:".85rem"},children:[e.jsx("input",{type:"checkbox",checked:fill,onChange:()=>setFill(v=>!v),style:{width:18,height:18,accentColor:"#f59e0b",cursor:"pointer"}}),"Kota yetmezse 8'e tamamla",e.jsx("span",{style:{color:"#6B7280",fontSize:".76rem",fontWeight:600},children:__T("(kotayı deler)")})]}),
          e.jsx("button",{style:{...S.btn,padding:".45rem .7rem",fontSize:".78rem",background:"#fff",border:"1px solid #E5E7EB",color:"#374151"},onClick:()=>setTexp(v=>!v),children:texp?"Çıkış sırası şablonu ▲":"Çıkış sırası şablonu ▼"})]}),
        texp?e.jsxs("div",{style:{...S.card,border:"1px solid #F5D0FE",background:"#FDF4FF"},children:[
          e.jsxs("div",{style:{display:"flex",gap:".5rem",flexWrap:"wrap",marginBottom:".7rem"},children:[
            e.jsx("button",{style:{...S.btn,padding:".45rem .7rem",fontSize:".78rem",background:"#fff",border:"1px solid #E5E7EB",color:"#374151"},onClick:()=>setTmpl({}),children:__T("↧ Sıfırla (1→1 … 8→8)")}),
            e.jsx("button",{style:{...S.btn,padding:".45rem .7rem",fontSize:".78rem",background:"#fff",border:"1px solid #E5E7EB",color:"#374151"},onClick:()=>{const o={};for(let i=1;i<=TOP;i++)o[i]=TOP-i+1;setTmpl(o)},children:__T("↥ Ters (1→8 … 8→1)")})]}),
          e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(150px,1fr))",gap:".5rem"},children:
            Array.from({length:TOP},(_,i)=>i+1).map(rk=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:".5rem",background:"#F8FAFC",border:"1px solid #E5E7EB",borderRadius:10,padding:".4rem .6rem"},children:[
              e.jsxs("span",{style:{color:"#6B7280",fontSize:".82rem",fontWeight:800,whiteSpace:"nowrap"},children:["Eleme ",rk,". →"]}),
              e.jsx("input",{type:"number",min:"1",max:String(TOP),value:tmpl[rk]??rk,onChange:ev=>setTmpl(o=>({...o,[rk]:ev.target.value===""?"":Math.max(1,parseInt(ev.target.value)||1)})),style:S.numin})]},rk))}),
          dupWarn?e.jsx("div",{style:{fontSize:".76rem",color:"#DC2626",fontWeight:800,marginTop:".6rem"},children:__T("⚠ Aynı çıkış numarası birden fazla eleme sırasına verilmiş.")}):null]}):null,
        realCats.map(cat=>e.jsxs("div",{style:{marginBottom:".9rem"},children:[
          e.jsxs("div",{style:{fontWeight:800,fontSize:"1rem",margin:"0 0 .4rem .2rem"},children:[catLabel(cat),
            e.jsxs("span",{style:{color:"#6B7280",fontWeight:700,fontSize:".8rem"},children:["  ·  ",aletsOf(cat).map(aletLabel).join(", ")||"alet tanımsız"]})]}),
          useAA?unitCard(cat,AA):null,
          aletsOf(cat).map(a=>unitCard(cat,a))]},cat))]}),
      e.jsxs("div",{style:{display:"flex",gap:".6rem",flexWrap:"wrap",marginTop:"1rem"},children:[
        e.jsx("button",{style:{...S.btn,background:"linear-gradient(135deg,#a855f7,#ec4899)",flex:1,minWidth:220},disabled:busy||selectedUnits.length===0,onClick:generate,
          children:busy?"İşleniyor…":"🏆 Seçili "+selectedUnits.length+" finali oluştur"}),
        finalCats.length>0?e.jsx("button",{style:{...S.btn,background:"#fff",border:"1px solid #ef4444",color:"#DC2626"},disabled:busy,onClick:clearFinals,children:__T("Finalleri Sil (")+finalCats.length+")"}):null]}),
      log?e.jsxs("div",{style:{marginTop:"1.2rem"},children:[
        e.jsx("div",{style:{fontWeight:800,color:"#15803D",marginBottom:".5rem"},children:__T("✓ Oluşturulan finaller")}),
        log.map(g=>e.jsxs("div",{style:{...S.card},children:[
          e.jsxs("div",{style:{fontWeight:800,marginBottom:".4rem"},children:["🏆 ",g.label," — ",g.aletAd]}),
          e.jsx("div",{style:{display:"grid",gap:".2rem"},children:[...g.names].sort((a,b)=>(a.reserve?1e3+a.rank:a.cs)-(b.reserve?1e3+b.rank:b.cs)).map(n=>
            e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontSize:".85rem",fontWeight:700,gap:".5rem"},children:[
              e.jsxs("span",{style:{minWidth:0,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:[
                e.jsx("b",{style:{color:n.reserve?"#7E22CE":"#BE185D"},children:n.reserve?n.yed+" · yedek ":n.cs+". çıkış "}),n.name,
                e.jsxs("span",{style:{color:"#6B7280",fontWeight:600},children:[" (eleme ",n.rank,".)"]})]}),
              e.jsx("span",{style:{color:"#6B7280",whiteSpace:"nowrap"},children:f3(n.score)})]},n.rank))})]},g.fcat))]}):null
    ]}):null]})]})]});
}
export{RitmikFinals as default};
