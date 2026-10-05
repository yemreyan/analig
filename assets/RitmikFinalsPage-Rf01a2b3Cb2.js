import"./i18n-Tr01a2b3Cb2.js";import{b as usToast,a as usInit,j as e,d as db,u as usAuth,l as logAction}from"./main-C2LpyYUGCb2.js";import{r as R}from"./vendor-react-Cxw6bqwhCb2.js";import{k as ref,l as get,m as update}from"./vendor-firebase-940mxgRVCb2.js";import{R as RC,a as RA}from"./ritmikCriteriaDefaults-CgOlnfQcCb2.js";import{raImg,raKey}from"./ritmikAlet-Ra01a2b3Cb2.js";import"./modulepreload-polyfill-B5Qt9EMXCb2.js";

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
 // Çıkış sırası şablonu kalıcı: yarışmaya (finalCikisSablonu) + tarayıcıya; son seçilen yarışma hatırlanır (aerobikle aynı)
 const _sbYuk=R.useRef(!1),_sbT=R.useRef(null);
 const sbFb=t=>{const fb={};Object.entries(t||{}).forEach(([k2,v])=>{v!==""&&v!=null&&!isNaN(v)&&Number(v)!==Number(k2)&&(fb["r"+k2]=Number(v))});return Object.keys(fb).length?fb:null};
 R.useEffect(()=>{if(comp)return;try{const s2=localStorage.getItem("tcfRtFinalComp");s2&&comps[s2]&&setComp(s2)}catch{}},[comps]);
 R.useEffect(()=>{try{comp&&localStorage.setItem("tcfRtFinalComp",comp)}catch{}},[comp]);
 R.useEffect(()=>{if(!comp){setTmpl({});return}if(!comps[comp])return;_sbYuk.current=!0;let o={};const fb=comps[comp]?.finalCikisSablonu;
  if(fb&&typeof fb==="object")Object.entries(fb).forEach(([k2,v])=>{const n2=parseInt(String(k2).replace(/^r/,""));n2>0&&v!=null&&v!==""&&!isNaN(v)&&(o[n2]=Number(v))});
  else{try{o=JSON.parse(localStorage.getItem("tcfRtSablon_"+comp)||"{}")||{}}catch{o={}}}setTmpl(o)},[comp,!!comps[comp]]);
 R.useEffect(()=>{if(!comp)return;if(_sbYuk.current){_sbYuk.current=!1;return}try{localStorage.setItem("tcfRtSablon_"+comp,JSON.stringify(tmpl))}catch{}clearTimeout(_sbT.current);const c2=comp,v2=sbFb(tmpl);_sbT.current=setTimeout(()=>{update(ref(db,BASE+"/"+c2),{finalCikisSablonu:v2}).catch(()=>{})},700)},[tmpl]);

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
    const s=alet===AA?(Object.values(sc||{}).some(v=>v&&typeof v==="object"&&v.irm)?null:num(sc?.sonuc)):(sc?.[alet]?.irm?null:num(sc?.[alet]?.sonuc));
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
  const upd={finalCikisSablonu:sbFb(tmpl)},summary=[];
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
   // çıkış sırası (şablon) siralama'ya da: puanlama ve çıkış listesi bu sırayı gösterir
   {const _ord=Object.entries(newSpor).sort((p,q)=>(p[1].cikisSirasi-q[1].cikisSirasi)||((p[1]._yedek?1:0)-(q[1]._yedek?1:0))||String(p[1].ad||"").localeCompare(String(q[1].ad||""),"tr")),_rot={};_ord.forEach(([mid,md],ix)=>{md.sirasi=ix+1;md.rotasyonGrubu=0;_rot[mid]={sirasi:ix+1,ad:md.ad||"",soyad:md.soyad||"",tckn:md.tckn||"",okul:md.okul||"",yarismaTuru:md.yarismaTuru||"ferdi",...(md.grupNo!=null?{grupNo:md.grupNo}:{})}});upd["siralama/"+fcat]=_ord.length?{rotation_0:_rot}:null}
   summary.push({fcat,cat,alet,label:catLabel(cat),aletAd:alet===AA?"Genel Tasnif":aletLabel(alet),names})});
  if(!summary.length){toast("Seçili finallerde puanı girilmiş sporcu bulunamadı.","warning");setBusy(!1);return}
  try{await update(ref(db,BASE+"/"+comp),upd);logAction("final_create",`[Ritmik] ${summary.length} final oluşturuldu: ${summary.map(x=>x.label+" — "+x.aletAd).join(", ")}`.slice(0,480),{user:_un,competitionId:comp,discipline:"ritmik",data:{kulupKotasi:Math.max(0,parseInt(limit)||0),kotaTamamla:fill,finaller:summary.map(x=>({kategori:x.fcat,ad:x.label+" — "+x.aletAd,sporcular:x.names.map(n=>({cikis:n.reserve?n.yed:n.cs,ad:n.name,kulup:n.club,eleme:n.rank,puan:n.score}))}))}});await reload();setLog(summary);
    toast(summary.length+" final oluşturuldu ✓ — ilk "+TOP+" + "+RES+" yedek","success")}
  catch{toast("Hata oluştu.","error")}
  setBusy(!1)};

 const clearFinals=async()=>{
  if(busy||!comp)return;setBusy(!0);setLog(null);const upd={},keys=new Set();
  [Object.keys(cats),Object.keys(spor),Object.keys(pun)].forEach(a=>a.forEach(c=>{isFinal(c)&&keys.add(c)}));
  if(!keys.size){toast("Silinecek final kategorisi yok.","warning");setBusy(!1);return}
  keys.forEach(fc=>{upd["kategoriler/"+fc]=null;upd["sporcular/"+fc]=null;upd["puanlar/"+fc]=null;upd["siralama/"+fc]=null});
  try{await update(ref(db,BASE+"/"+comp),upd);logAction("final_delete",`[Ritmik] ${keys.size} final kategorisi silindi`,{user:_un,competitionId:comp,discipline:"ritmik",data:{silinen:[...keys]}});await reload();toast(keys.size+" final kategorisi silindi.","success")}
  catch{toast("Hata oluştu.","error")}
  setBusy(!1)};

 const P1="#EC4899",P2="#8B5CF6",G="linear-gradient(135deg,"+P1+","+P2+")",SH="0 1px 2px rgba(15,23,42,.05),0 8px 24px -16px rgba(15,23,42,.22)";
 const S={wrap:{minHeight:"100vh",background:"#F6F7FB",color:"#0F172A",fontFamily:"Nunito,system-ui,-apple-system,sans-serif",paddingBottom:"6rem"},
  top:{position:"sticky",top:0,zIndex:10,background:"linear-gradient(90deg,"+P1+","+P2+") bottom/100% 3px no-repeat,#fff",boxShadow:"0 1px 2px rgba(15,23,42,.05)",padding:"0 1.25rem",minHeight:68,display:"flex",alignItems:"center",gap:".9rem",flexWrap:"wrap"},
  back:{width:38,height:38,borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",color:"#0F172A",textDecoration:"none",flexShrink:0,border:"1px solid #E2E8F0",background:"#fff"},
  ico:{width:44,height:44,borderRadius:14,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,background:G,boxShadow:"0 8px 20px -6px rgba(236,72,153,.55)"},
  in:{maxWidth:940,margin:"0 auto",padding:"1.1rem 1.25rem"},
  card:{background:"#fff",border:"none",borderRadius:18,padding:"1rem 1.1rem",marginBottom:".8rem",boxShadow:SH},
  sel:{width:"100%",padding:".7rem .85rem",borderRadius:12,border:"1px solid #E2E8F0",background:"#fff",color:"#0F172A",fontWeight:800,fontSize:".95rem",fontFamily:"inherit"},
  h:{display:"flex",alignItems:"center",gap:".55rem",fontWeight:900,fontSize:".95rem",marginBottom:".7rem"},
  hi:{width:30,height:30,borderRadius:10,display:"grid",placeItems:"center",color:"#fff",background:G,flexShrink:0},
  badge:{fontSize:".68rem",fontWeight:900,padding:".2rem .55rem",borderRadius:999,letterSpacing:".02em"},
  yed:{fontSize:".72rem",fontWeight:900,padding:".25rem .5rem",borderRadius:8,color:"#7E22CE",border:"1px dashed #D8B4FE",background:"#FAF5FF",minWidth:38,textAlign:"center"},
  csb:{fontSize:".85rem",fontWeight:900,padding:".25rem .5rem",borderRadius:9,background:G,color:"#fff",minWidth:34,textAlign:"center"},
  numin:{width:58,textAlign:"center",background:"#fff",border:"1.5px solid #F9A8D4",borderRadius:10,color:"#0F172A",padding:".4rem",fontWeight:900,font:"inherit",fontSize:"1rem"},
  ghost:{padding:".5rem .8rem",border:"1px solid #E2E8F0",borderRadius:11,fontWeight:800,fontSize:".8rem",cursor:"pointer",color:"#334155",background:"#fff",fontFamily:"inherit"},
  btn:{padding:".85rem 1.2rem",border:"none",borderRadius:14,fontWeight:900,fontSize:"1rem",cursor:"pointer",color:"#fff",fontFamily:"inherit"},
  tog:on=>({display:"flex",alignItems:"center",gap:".6rem",padding:".6rem .75rem",borderRadius:12,border:"1px solid "+(on?"#F9A8D4":"#E2E8F0"),background:on?"#FDF2F8":"#fff",cursor:"pointer",fontWeight:800,fontSize:".85rem"}),
  center:{maxWidth:560,margin:"2rem auto 0",textAlign:"center",color:"#64748B",fontWeight:700,padding:"2rem 1rem"}};
 const MI=(n,st)=>e.jsx("span",{className:"material-icons-round",style:{fontSize:18,...st},children:n});
 const AIc=(al,sz)=>{const im=al===AA?null:raImg(al);return im?e.jsx("img",{src:im,alt:"",style:{width:sz||34,height:sz||34,borderRadius:"50%",background:"#fff",boxShadow:"0 0 0 1.5px #FBCFE8",flexShrink:0,objectFit:"contain"}}):e.jsx("span",{style:{width:sz||34,height:sz||34,borderRadius:"50%",display:"grid",placeItems:"center",background:"#EEF2FF",color:"#4F46E5",flexShrink:0},children:MI(al===AA?"functions":"sports_gymnastics",{fontSize:18})})};
 const tmplOzet=Array.from({length:TOP},(_,i)=>i+1).filter(rk=>tmplCs(rk)!==rk).map(rk=>rk+"→"+tmplCs(rk)).join(" · ");

 const unitCard=(cat,alet)=>{const{list,excluded}=rank(cat,alet),fc=alet===AA?"final_"+cat:"final_"+cat+"__"+alet,
   has=!!cats[fc],k=key(cat,alet),op=!!expanded[k]&&list.length>0,
   nc=Math.min(list.length,TOP),nr=Math.max(0,list.length-TOP),on=isSel(cat,alet);
  return e.jsxs("div",{style:{border:"1.5px solid "+(on&&list.length?"#F9A8D4":"#EEF0F4"),borderRadius:14,padding:".65rem .8rem",background:on&&list.length?"#FFFBFE":"#fff",opacity:list.length?1:.55,transition:"all .15s"},children:[
    e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:".7rem"},children:[
      e.jsx("input",{type:"checkbox",checked:on,disabled:!list.length,onChange:()=>toggle(cat,alet),style:{width:18,height:18,accentColor:P1,cursor:"pointer"}}),
      AIc(alet),
      e.jsxs("div",{style:{flex:1,minWidth:0,cursor:list.length?"pointer":"default"},onClick:()=>list.length&&setExpanded(x=>({...x,[k]:!x[k]})),children:[
        e.jsxs("div",{style:{fontWeight:900,display:"flex",alignItems:"center",gap:".4rem",flexWrap:"wrap"},children:[alet===AA?__T("Genel Tasnif Finali"):aletLabel(alet)+" "+__T("Finali"),
          has?e.jsx("span",{style:{...S.badge,background:"#DCFCE7",color:"#15803D"},children:__T("✓ OLUŞTURULDU")}):null]}),
        e.jsx("div",{style:{color:"#64748B",fontSize:".78rem",fontWeight:700},children:list.length?nc+" "+(isGrp(cat)?"grup":"sporcu")+(nr?" + "+nr+" yedek":"")+(excluded.length?" · "+excluded.length+" kulüp kotasıyla elendi":""):__T("puanı girilmiş sporcu yok")})]}),
      list.length?e.jsx("button",{type:"button",onClick:()=>setExpanded(x=>({...x,[k]:!x[k]})),style:{...S.ghost,padding:".35rem .6rem"},children:MI(op?"expand_less":"expand_more")}):null]}),
    op?e.jsxs("div",{style:{marginTop:".6rem",borderTop:"1px solid #F1F5F9",paddingTop:".5rem"},children:[
      e.jsx("div",{style:{fontSize:".7rem",fontWeight:900,color:"#94A3B8",letterSpacing:".08em",textTransform:"uppercase",marginBottom:".3rem"},children:__T("Final çıkış sırası")}),
      list.map((row,ix)=>({row,rank:ix+1,cs:csOf(ix+1),reserve:ix+1>TOP})).sort((a,b)=>(a.reserve?1e3+a.rank:a.cs)-(b.reserve?1e3+b.rank:b.cs)).map(it=>
        e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:".6rem",padding:".32rem 0",borderBottom:"1px solid #F8FAFC"},children:[
          it.reserve?e.jsx("span",{style:S.yed,children:"R"+(it.rank-TOP)}):e.jsx("span",{style:S.csb,children:it.cs}),
          e.jsxs("span",{style:{flex:1,minWidth:0,fontWeight:800,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:[nameOf(cat,it.row.id),
            it.row.club?e.jsxs("span",{style:{color:"#64748B",fontWeight:600,fontSize:".8rem"},children:[" · ",it.row.club]}):null,
            it.row.quotaFill?e.jsx("span",{style:{...S.badge,marginLeft:".35rem",background:"#FEF3C7",color:"#B45309"},children:__T("kota dışı")}):null]}),
          e.jsxs("span",{style:{color:"#64748B",fontSize:".76rem",fontWeight:700,whiteSpace:"nowrap"},children:[__T("eleme")," ",it.rank,". · ",f3(it.row.score)]})]},it.row.id)),
      excluded.length?e.jsxs("div",{style:{marginTop:".5rem",fontSize:".76rem",color:"#B45309",fontWeight:700},children:[__T("Kulüp kotası")," (",limit,") ",__T("nedeniyle elenen"),": ",excluded.map(r=>nameOf(cat,r.id)).join(", ")]}):null]}):null]},k)};

 return e.jsxs("div",{style:S.wrap,children:[
  e.jsxs("div",{style:S.top,children:[e.jsx("a",{href:"/ritmik",title:__T("Geri"),style:S.back,children:MI("arrow_back",{fontSize:20})}),
    e.jsx("div",{style:S.ico,children:MI("emoji_events",{color:"#fff",fontSize:22})}),
    e.jsxs("div",{style:{flex:1,minWidth:0},children:[e.jsx("div",{style:{fontWeight:900,fontSize:"1.1rem",lineHeight:1.15},children:__T("Final Oluştur")}),
      e.jsx("div",{style:{fontSize:".78rem",color:"#64748B",fontWeight:700},children:__T("Ritmik · elemeden alet ve genel tasnif finallerine")})]})]}),
  e.jsxs("div",{style:S.in,children:[
   loading?e.jsx("div",{style:S.center,children:__T("Yükleniyor…")}):e.jsxs(e.Fragment,{children:[
    e.jsxs("div",{style:S.card,children:[e.jsxs("div",{style:S.h,children:[e.jsx("span",{style:S.hi,children:MI("event",{fontSize:17})}),__T("Yarışma")]}),
     e.jsxs("select",{style:S.sel,value:comp,onChange:x=>{setComp(x.target.value);setLog(null);setExpanded({});setSel({})},children:[
      e.jsx("option",{value:"",children:__T("— Yarışma seçin —")}),
      Object.entries(comps).map(([id,c])=>e.jsx("option",{value:id,children:c.isim||c.ad||id},id))]}),
     e.jsx("div",{style:{fontSize:".78rem",color:"#64748B",fontWeight:700,marginTop:".6rem",lineHeight:1.5},children:__T("Her alette elemenin ilk 8'i finale, 9–10. sıradakiler R1/R2 yedek olarak alınır. Kulüp kotası uygulanır (FIG'de ülke başına en çok 2).")})]}),
    comp?e.jsxs(e.Fragment,{children:[
      realCats.length===0?e.jsx("div",{style:S.center,children:__T("Bu yarışmada kategori yok.")}):e.jsxs(e.Fragment,{children:[
        e.jsxs("div",{style:S.card,children:[e.jsxs("div",{style:S.h,children:[e.jsx("span",{style:S.hi,children:MI("tune",{fontSize:17})}),__T("Ayarlar")]}),
         e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:".6rem"},children:[
          e.jsxs("label",{style:{...S.tog(!0),cursor:"default"},children:[MI("groups",{color:P1}),e.jsxs("span",{style:{flex:1},children:[__T("Kulüp kotası"),e.jsx("small",{style:{display:"block",color:"#94A3B8",fontWeight:700,fontSize:".72rem"},children:__T("0 = kota yok")})]}),e.jsx("input",{type:"number",min:"0",max:"8",value:limit,onChange:x=>setLimit(x.target.value),style:S.numin})]}),
          e.jsxs("label",{style:S.tog(useAA),children:[e.jsx("input",{type:"checkbox",checked:useAA,onChange:()=>setUseAA(v=>!v),style:{width:18,height:18,accentColor:P1}}),e.jsxs("span",{children:[__T("Genel tasnif finali"),e.jsx("small",{style:{display:"block",color:"#94A3B8",fontWeight:700,fontSize:".72rem"},children:__T("tüm aletler toplamı")})]})]}),
          e.jsxs("label",{style:S.tog(fill),children:[e.jsx("input",{type:"checkbox",checked:fill,onChange:()=>setFill(v=>!v),style:{width:18,height:18,accentColor:"#F59E0B"}}),e.jsxs("span",{children:[__T("Kota yetmezse 8'e tamamla"),e.jsx("small",{style:{display:"block",color:"#94A3B8",fontWeight:700,fontSize:".72rem"},children:__T("kotayı deler")})]})]})]})]}),
        e.jsxs("div",{style:{...S.card,boxShadow:SH+",inset 0 0 0 1.5px #FBCFE8"},children:[
         e.jsxs("div",{style:{...S.h,marginBottom:texp?".7rem":0,cursor:"pointer"},onClick:()=>setTexp(x=>!x),children:[e.jsx("span",{style:S.hi,children:MI("format_list_numbered",{fontSize:17})}),
          e.jsxs("span",{style:{flex:1,minWidth:0},children:[__T("Final Çıkış Sırası Şablonu"),e.jsx("small",{style:{display:"block",color:"#64748B",fontWeight:700,fontSize:".76rem"},children:tmplOzet?__T("Eleme → çıkış")+": "+tmplOzet:__T("Elemede kaçıncı olan finalde kaçıncı çıkar — tüm finallere uygulanır (şu an 1→1 … 8→8)")})]}),
          MI(texp?"expand_less":"expand_more",{color:P1})]}),
         texp?e.jsxs(e.Fragment,{children:[
          e.jsxs("div",{style:{display:"flex",gap:".5rem",flexWrap:"wrap",marginBottom:".7rem"},children:[
            e.jsx("button",{type:"button",style:S.ghost,onClick:()=>setTmpl({}),children:__T("↧ Sıfırla (1→1 … 8→8)")}),
            e.jsx("button",{type:"button",style:S.ghost,onClick:()=>{const o={};for(let i=1;i<=TOP;i++)o[i]=TOP-i+1;setTmpl(o)},children:__T("↥ Ters (1→8 … 8→1)")})]}),
          e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(165px,1fr))",gap:".5rem"},children:[
            Array.from({length:TOP},(_,i)=>i+1).map(rk=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:".5rem",background:"#FDF2F8",border:"1px solid #FBCFE8",borderRadius:12,padding:".45rem .6rem"},children:[
              e.jsxs("span",{style:{color:"#9D174D",fontSize:".82rem",fontWeight:900,whiteSpace:"nowrap"},children:[__T("Eleme")," ",rk,". →"]}),
              e.jsx("input",{type:"number",min:"1",max:String(TOP),value:tmpl[rk]??rk,onChange:ev=>setTmpl(o=>({...o,[rk]:ev.target.value===""?"":Math.max(1,Math.min(TOP,parseInt(ev.target.value)||1))})),style:S.numin}),
              e.jsx("span",{style:{color:"#64748B",fontSize:".72rem",fontWeight:800},children:__T("çıkış")})]},rk)),
            ["R1","R2"].map((y,i)=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:".5rem",border:"1px dashed #D8B4FE",borderRadius:12,padding:".45rem .6rem"},children:[e.jsx("span",{style:S.yed,children:y}),e.jsxs("span",{style:{color:"#64748B",fontSize:".8rem",fontWeight:800},children:["→ ",__T("çıkış")," ",TOP+i+1," (",__T("sabit"),")"]})]},y))]}),
          dupWarn?e.jsx("div",{style:{fontSize:".78rem",color:"#DC2626",fontWeight:800,marginTop:".6rem"},children:__T("⚠ Aynı çıkış numarası birden fazla eleme sırasına verilmiş — kontrol edin.")}):e.jsx("div",{style:{fontSize:".74rem",color:"#64748B",fontWeight:700,marginTop:".6rem"},children:__T("Örn. Eleme 1. → 8 yazarsanız elemeyi birinci bitiren finalde 8. (son) çıkar. Şablon yarışmaya kaydedilir.")})]}):null]}),
        realCats.map(cat=>e.jsxs("div",{style:S.card,children:[
          e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:".6rem",flexWrap:"wrap",marginBottom:".65rem"},children:[
            e.jsx("span",{style:{width:6,alignSelf:"stretch",borderRadius:4,background:G}}),
            e.jsxs("div",{style:{flex:1,minWidth:0},children:[e.jsx("div",{style:{fontWeight:900,fontSize:"1.02rem"},children:catLabel(cat)}),
              e.jsx("div",{style:{color:"#64748B",fontSize:".76rem",fontWeight:700},children:(isGrp(cat)?__T("Grup")+" · ":"")+(aletsOf(cat).map(aletLabel).join(", ")||__T("alet tanımsız"))})]}),
            e.jsx("div",{style:{display:"flex",gap:4},children:aletsOf(cat).map(a=>e.jsx("span",{title:aletLabel(a),children:AIc(a,26)},a))})]}),
          e.jsxs("div",{style:{display:"grid",gap:".5rem"},children:[useAA?unitCard(cat,AA):null,aletsOf(cat).map(a=>unitCard(cat,a))]})]},cat))]}),
      log?e.jsxs("div",{style:{...S.card,boxShadow:SH+",inset 0 0 0 1.5px #86EFAC"},children:[
        e.jsxs("div",{style:{...S.h,color:"#15803D"},children:[e.jsx("span",{style:{...S.hi,background:"#16A34A"},children:MI("check",{fontSize:17})}),__T("Oluşturulan finaller")]}),
        log.map(g=>e.jsxs("div",{style:{borderTop:"1px solid #F1F5F9",padding:".55rem 0"},children:[
          e.jsxs("div",{style:{fontWeight:900,marginBottom:".35rem",display:"flex",alignItems:"center",gap:".45rem"},children:[AIc(g.alet,22),g.label," — ",g.aletAd]}),
          e.jsx("div",{style:{display:"grid",gap:".2rem"},children:[...g.names].sort((a,b)=>(a.reserve?1e3+a.rank:a.cs)-(b.reserve?1e3+b.rank:b.cs)).map(n=>
            e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:".5rem",fontSize:".84rem",fontWeight:700},children:[
              n.reserve?e.jsx("span",{style:S.yed,children:n.yed}):e.jsx("span",{style:S.csb,children:n.cs}),
              e.jsxs("span",{style:{flex:1,minWidth:0,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:[n.name,e.jsxs("span",{style:{color:"#64748B",fontWeight:600},children:[" (",__T("eleme")," ",n.rank,".)"]})]}),
              e.jsx("span",{style:{color:"#64748B",whiteSpace:"nowrap"},children:f3(n.score)})]},n.rank))})]},g.fcat))]}):null
    ]}):null]})]}),
  comp&&realCats.length?e.jsx("div",{style:{position:"fixed",left:0,right:0,bottom:0,zIndex:20,background:"rgba(255,255,255,.92)",backdropFilter:"blur(8px)",borderTop:"1px solid #EEF0F4",padding:".7rem clamp(1rem,10vw,140px)"},children:e.jsxs("div",{style:{maxWidth:940,margin:"0 auto",display:"flex",gap:".6rem",alignItems:"center",flexWrap:"wrap"},children:[
    e.jsxs("span",{style:{fontSize:".8rem",fontWeight:800,color:"#64748B",flex:"1 1 160px"},children:[selectedUnits.length," ",__T("final seçili")]}),
    finalCats.length>0?e.jsxs("button",{type:"button",style:{...S.btn,fontSize:".88rem",padding:".7rem 1rem",background:"#fff",border:"1.5px solid #FCA5A5",color:"#DC2626"},disabled:busy,onClick:clearFinals,children:[__T("Finalleri Sil")," (",finalCats.length,")"]}):null,
    e.jsx("button",{type:"button",style:{...S.btn,background:G,boxShadow:"0 10px 22px -10px rgba(236,72,153,.7)",opacity:busy||!selectedUnits.length?.55:1},disabled:busy||selectedUnits.length===0,onClick:generate,children:busy?__T("İşleniyor…"):"🏆 "+__T("Seçili")+" "+selectedUnits.length+" "+__T("finali oluştur")})]})}):null]});
}
export{RitmikFinals as default};
