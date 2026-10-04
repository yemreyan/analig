import"./i18n-Tr01a2b3Cb2.js";import{u as useAuth,j as e,d as db}from"./main-C2LpyYUGCb2.js";import{u as useNav,r as R}from"./vendor-react-Cxw6bqwhCb2.js";import{q as query,w as limitToLast,n as orderByChild,k as ref,o as onValue,l as get}from"./vendor-firebase-940mxgRVCb2.js";import{utils as XU,writeFile as XW}from"./vendor-xlsx-CNerDvZXCb2.js";import"./modulepreload-polyfill-B5Qt9EMXCb2.js";

// İşlem Geçmişi — sistem aktivite günlüğü (logs). Modern, okunaklı ve ayrıntılı görünüm.
const TIP={
 judge_score_submit:{ad:"Hakem Notu",ic:"how_to_vote",renk:"#0891B2"},
 score_create:{ad:"Puan Girişi",ic:"add_circle",renk:"#16A34A"},
 score_update:{ad:"Puan Güncelleme",ic:"edit",renk:"#2563EB"},
 score_modify:{ad:"Puan Değişikliği",ic:"published_with_changes",renk:"#D97706"},
 score_delete:{ad:"Puan Silme",ic:"remove_circle",renk:"#DC2626"},
 athlete_create:{ad:"Sporcu Ekleme",ic:"person_add",renk:"#16A34A"},
 athlete_update:{ad:"Sporcu Güncelleme",ic:"person",renk:"#2563EB"},
 athlete_delete:{ad:"Sporcu Silme",ic:"person_remove",renk:"#DC2626"},
 competition_create:{ad:"Yarışma Oluşturma",ic:"emoji_events",renk:"#7C3AED"},
 competition_update:{ad:"Yarışma Güncelleme",ic:"settings",renk:"#7C3AED"},
 referee_create:{ad:"Hakem Ekleme",ic:"gavel",renk:"#0D9488"},
 application_approve:{ad:"Başvuru Onaylama",ic:"check_circle",renk:"#16A34A"},
 application_reject:{ad:"Başvuru Reddetme",ic:"cancel",renk:"#DC2626"},
 login:{ad:"Giriş",ic:"login",renk:"#4F46E5"},logout:{ad:"Çıkış",ic:"logout",renk:"#6B7280"},
 broadcast:{ad:"Duyuru",ic:"campaign",renk:"#4F46E5"},schedule:{ad:"Program",ic:"calendar_month",renk:"#8B5CF6"}
};
const tip=t=>TIP[t]||{ad:t||"İşlem",ic:"history",renk:"#64748B"};
const BRANS={aerobik:"Aerobik",artistik:"Artistik",ritmik:"Ritmik",trampolin:"Trampolin",parkur:"Parkur"};
const BASES=["competitions","aerobik_yarismalar","ritmik_yarismalar","trampolin_yarismalar","parkur_yarismalar"];
const bransOf=x=>x.discipline||(/^\[([^\]]+)\]/.exec(x.message||"")?.[1]||"").toLocaleLowerCase("tr-TR").replace("ı","i")||"";
const katAd=c=>String(c||"").replace(/^final_/,"Final · ").replace(/_/g," ").replace(/\b\w/g,m=>m.toUpperCase());
const alanAd=f=>{if(!f)return"";let m=/^([aeAE])Panel\.j(\d)$/.exec(f);if(m)return m[1].toUpperCase()+m[2]+" hakemi";m=/^dPanel(\.|$)/.exec(f);if(m)return"D hakemi";if(/^sjPanel/.test(f))return"SJ paneli";if(/^lPanel/.test(f))return"Çizgi hakemi";if(/^tPanel/.test(f))return"Süre hakemi";return f};
const sayi=v=>v==null||v===""?"—":isNaN(Number(v))?String(v):Number(v).toFixed(Number(v)%1===0?1:String(v).split(".")[1]?.length>3?3:Math.min(3,Math.max(1,String(v).split(".")[1]?.length||1)));
const saat=t=>t?new Date(t).toLocaleTimeString("tr-TR",{hour:"2-digit",minute:"2-digit",second:"2-digit"}):"";
const gunEt=t=>{if(!t)return"Tarih bilinmiyor";const d=new Date(t),b=new Date();b.setHours(0,0,0,0);const x=new Date(d);x.setHours(0,0,0,0);const f=Math.round((b-x)/864e5);return(f===0?"Bugün · ":f===1?"Dün · ":"")+d.toLocaleDateString("tr-TR",{weekday:"long",day:"numeric",month:"long",year:"numeric"})};
const temizMesaj=x=>{let m=String(x.message||x.mesaj||"").replace(/^\[[^\]]+\]\s*/,"").replace(/\b(final_)?[a-z]+(?:_[a-z0-9]+)+\b/g,w=>/^[ae]Panel/.test(w)?w:katAd(w)).replace(/\b([aeAE])Panel\.j(\d)\b/g,(_,a,b)=>a.toUpperCase()+b).replace(/:\s*—\s*→\s*/,": ");return m};
const parseData=x=>{try{return typeof x.data==="string"?JSON.parse(x.data):x.data||null}catch{return null}};
const C={bg:"#F0F2F5",card:"#fff",soft:"#F8FAFC",line:"#E5E7EB",ink:"#1A1D26",ink2:"#334155",muted:"#6B7280",sub:"#94A3B8"};
const MI=(n,st)=>e.jsx("span",{className:"material-icons-round",style:{fontSize:"1.1rem",...(st||{})},children:n});
const chip=(t,fg,bg,on,title)=>e.jsx("span",{title,onClick:on,style:{display:"inline-flex",alignItems:"center",gap:".25rem",fontSize:".74rem",fontWeight:800,padding:".18rem .55rem",borderRadius:999,color:fg,background:bg,cursor:on?"pointer":"default",whiteSpace:"nowrap",maxWidth:"100%",overflow:"hidden",textOverflow:"ellipsis"},children:t});

function AuditLog(){
 const nav=useNav();useAuth();
 const[logs,setLogs]=R.useState([]),[yuk,setYuk]=R.useState(!0),[lim,setLim]=R.useState(300);
 const[q,setQ]=R.useState(""),[tf,setTf]=R.useState("all"),[uf,setUf]=R.useState("all"),[cf,setCf]=R.useState("all"),[bf,setBf]=R.useState("all"),[df,setDf]=R.useState("all"),[sf,setSf]=R.useState(""),[acik,setAcik]=R.useState({});
 const[adlar,setAdlar]=R.useState({});
 R.useEffect(()=>{setYuk(!0);const u=onValue(query(ref(db,"logs"),orderByChild("timestamp"),limitToLast(lim)),s=>{const v=s.val()||{};setLogs(Object.entries(v).map(([id,x])=>({id,...x})).sort((a,b)=>(b.timestamp||0)-(a.timestamp||0)));setYuk(!1)});return()=>u()},[lim]);
 // yarışma adları
 R.useEffect(()=>{const ids=[...new Set(logs.map(x=>x.competitionId).filter(Boolean))].filter(id=>!(id in adlar));if(!ids.length)return;let iptal=!1;(async()=>{const yeni={};for(const id of ids){yeni[id]=null;for(const b of BASES){try{const s=await get(ref(db,`${b}/${id}/isim`));if(s.exists()){let kt={};try{const k2=(await get(ref(db,`${b}/${id}/kategoriler`))).val()||{};Object.entries(k2).forEach(([kk,vv])=>{const nm=vv&&(vv.name||vv.ad);nm&&(kt[kk]=String(nm).replace(/^\s*\u{1F3C6}\s*/u,""))})}catch{}yeni[id]={ad:s.val(),brans:b==="competitions"?"artistik":b.replace("_yarismalar",""),kat:kt};break}}catch{}}}if(!iptal)setAdlar(o=>({...o,...yeni}))})();return()=>{iptal=!0}},[logs]);
 const compAd=id=>id?(adlar[id]?.ad||id):"";
 const bugun=(()=>{const d=new Date();d.setHours(0,0,0,0);return d.getTime()})();
 const sinir=df==="today"?bugun:df==="7"?bugun-6*864e5:df==="1h"?Date.now()-36e5:0;
 const q0=q.trim().toLocaleLowerCase("tr-TR");
 const filt=logs.filter(x=>(tf==="all"||x.type===tf)&&(uf==="all"||x.user===uf)&&(cf==="all"||x.competitionId===cf)&&(bf==="all"||bransOf(x)===bf)&&(!sinir||(x.timestamp||0)>=sinir)&&(!sf||x.athleteName===sf)&&(!q0||[x.message,x.user,x.athleteName,x.category,compAd(x.competitionId)].join(" ").toLocaleLowerCase("tr-TR").includes(q0)));
 const say=k=>logs.filter(x=>(x.timestamp||0)>=bugun&&(!k||k(x))).length;
 const tipSay={};logs.forEach(x=>{tipSay[x.type]=(tipSay[x.type]||0)+1});
 const kullanicilar=[...new Set(logs.map(x=>x.user).filter(Boolean))].sort();
 const yarismalar=[...new Set(logs.map(x=>x.competitionId).filter(Boolean))];
 const branslar=[...new Set(logs.map(bransOf).filter(Boolean))];
 const gruplar=[];let son=null;filt.forEach(x=>{const k=x.timestamp?new Date(x.timestamp).toDateString():"_";if(!son||son.k!==k){son={k,ad:gunEt(x.timestamp),list:[]};gruplar.push(son)}son.list.push(x)});
 const disari=()=>{const rows=filt.map(x=>{const d=parseData(x)||{};return{Tarih:x.timestamp?new Date(x.timestamp).toLocaleString("tr-TR"):"",İşlem:tip(x.type).ad,Kullanıcı:x.user||"",Branş:BRANS[bransOf(x)]||"",Yarışma:compAd(x.competitionId),Sporcu:x.athleteName||"",Kategori:x.category?(adlar[x.competitionId]?.kat?.[x.category]||katAd(x.category)):"",Alan:alanAd(x.field),Eski:x.oldValue??"",Yeni:x.newValue??"",Kaynak:d.source||"",Panel:d.panelId||"",Mesaj:x.message||x.mesaj||""}});
  const wb=XU.book_new(),ws=XU.json_to_sheet(rows);ws["!cols"]=[{wch:19},{wch:16},{wch:14},{wch:10},{wch:34},{wch:26},{wch:18},{wch:12},{wch:8},{wch:8},{wch:10},{wch:8},{wch:70}];XU.book_append_sheet(wb,ws,"İşlem Geçmişi");XW(wb,"islem_gecmisi_"+new Date().toISOString().slice(0,10)+".xlsx")};
 const kart=(ic,renk,v,l)=>e.jsxs("div",{style:{background:C.card,border:"1px solid "+C.line,borderRadius:16,padding:".85rem 1rem",display:"flex",alignItems:"center",gap:".75rem"},children:[e.jsx("div",{style:{width:40,height:40,borderRadius:11,background:renk,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0},children:MI(ic)}),e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:"1.35rem",fontWeight:900,lineHeight:1},children:v}),e.jsx("div",{style:{fontSize:".76rem",fontWeight:700,color:C.muted},children:l})]})]});
 const sel=(v,set,ops,w)=>e.jsx("select",{value:v,onChange:ev=>set(ev.target.value),style:{background:C.soft,border:"1px solid "+C.line,borderRadius:12,padding:".55rem .7rem",fontFamily:"inherit",fontSize:".86rem",fontWeight:700,color:C.ink,flex:w||"0 1 200px",minWidth:0},children:ops.map(([k,t])=>e.jsx("option",{value:k,children:t},k))});
 return e.jsxs("div",{className:"al-root",style:{minHeight:"100vh",background:C.bg,color:C.ink,fontFamily:"Nunito,system-ui,-apple-system,sans-serif",paddingBottom:"3rem"},children:[
  e.jsx("style",{children:".al-root select{flex:0 1 200px}@media(max-width:600px){.al-root .al-sub,.al-root .al-xlt{display:none}.al-root .al-f select{flex:1 1 100%!important}.al-root .al-head{min-height:58px!important;padding:.4rem .75rem!important;gap:.6rem!important}.al-root .al-body{padding:.9rem .75rem!important}.al-root .al-day{top:58px!important}.al-root .al-row{padding:.7rem .75rem!important;gap:.6rem!important}}"}),
  e.jsx("div",{style:{position:"sticky",top:0,zIndex:20,background:"#fff",borderBottom:"1px solid "+C.line,boxShadow:"0 1px 3px rgba(0,0,0,.06)"},children:e.jsxs("div",{className:"al-head",style:{maxWidth:1180,margin:"0 auto",minHeight:68,padding:".5rem 1.25rem",display:"flex",alignItems:"center",gap:".9rem",flexWrap:"wrap"},children:[
   e.jsx("button",{type:"button",onClick:()=>nav(-1),title:"Geri",style:{width:38,height:38,borderRadius:10,border:"none",background:"transparent",color:C.ink,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"},children:MI("arrow_back",{fontSize:"1.4rem"})}),
   e.jsx("div",{style:{width:44,height:44,borderRadius:12,background:"#475569",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 6px 18px rgba(71,85,105,.35)"},children:MI("history",{fontSize:"1.4rem"})}),
   e.jsxs("div",{style:{flex:1,minWidth:0},children:[e.jsx("div",{style:{fontWeight:900,fontSize:"1.15rem"},children:"İşlem Geçmişi"}),e.jsx("div",{className:"al-sub",style:{fontSize:".8rem",fontWeight:700,color:C.muted},children:"Sistem aktivite günlüğü · son "+lim+" kayıt yüklendi"})]}),
   e.jsxs("button",{type:"button",onClick:disari,disabled:!filt.length,style:{display:"inline-flex",alignItems:"center",gap:".35rem",border:"1px solid "+C.line,borderRadius:11,padding:".55rem .85rem",fontFamily:"inherit",fontWeight:800,fontSize:".84rem",cursor:"pointer",background:"#fff",color:C.ink2},title:"Excel'e aktar",children:[MI("table_view"),e.jsx("span",{className:"al-xlt",children:"Excel'e Aktar"})]})]})}),
  e.jsxs("div",{className:"al-body",style:{maxWidth:1180,margin:"0 auto",padding:"1.1rem 1.25rem"},children:[
   e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))",gap:".75rem",marginBottom:"1rem"},children:[kart("today","#475569",say(),"Bugünkü işlem"),kart("add_circle","#16A34A",say(x=>x.type==="score_create"),"Bugün puan girişi"),kart("how_to_vote","#0891B2",say(x=>x.type==="judge_score_submit"),"Bugün hakem notu"),kart("published_with_changes","#D97706",say(x=>x.type==="score_modify"||x.type==="score_update"),"Bugün değişiklik"),kart("login","#4F46E5",say(x=>x.type==="login"),"Bugün giriş")]}),
   e.jsxs("div",{style:{background:C.card,border:"1px solid "+C.line,borderRadius:16,padding:".85rem 1rem",marginBottom:"1rem"},children:[
    e.jsxs("div",{className:"al-f",style:{display:"flex",gap:".5rem",flexWrap:"wrap",alignItems:"center"},children:[
     e.jsxs("div",{style:{flex:"1 1 260px",display:"flex",alignItems:"center",gap:".4rem",background:C.soft,border:"1px solid "+C.line,borderRadius:12,padding:"0 .7rem"},children:[MI("search",{color:C.sub}),e.jsx("input",{value:q,onChange:ev=>setQ(ev.target.value),placeholder:"Mesaj, kullanıcı, sporcu, yarışma ara…",style:{border:"none",background:"transparent",outline:"none",fontFamily:"inherit",fontWeight:700,fontSize:".88rem",padding:".55rem 0",flex:1,minWidth:0,color:C.ink}})]}),
     sel(df,setDf,[["all","Tüm zamanlar (yüklenen)"],["1h","Son 1 saat"],["today","Bugün"],["7","Son 7 gün"]]),
     sel(uf,setUf,[["all","Tüm kullanıcılar"],...kullanicilar.map(u=>[u,u])]),
     sel(cf,setCf,[["all","Tüm yarışmalar"],...yarismalar.map(id=>[id,compAd(id)])],"1 1 240px"),
     branslar.length>1?sel(bf,setBf,[["all","Tüm branşlar"],...branslar.map(b=>[b,BRANS[b]||b])],"0 1 150px"):null]}),
    e.jsxs("div",{style:{display:"flex",gap:".35rem",flexWrap:"wrap",marginTop:".7rem"},children:[
     e.jsxs("button",{type:"button",onClick:()=>setTf("all"),style:{border:"1.5px solid "+(tf==="all"?"#1A1D26":C.line),background:tf==="all"?"#1A1D26":"#fff",color:tf==="all"?"#fff":C.ink2,borderRadius:999,padding:".3rem .75rem",fontFamily:"inherit",fontWeight:800,fontSize:".78rem",cursor:"pointer"},children:["Tümü · ",logs.length]}),
     ...Object.entries(tipSay).sort((a,b)=>b[1]-a[1]).map(([k,n])=>{const t=tip(k),on=tf===k;return e.jsxs("button",{type:"button",onClick:()=>setTf(on?"all":k),style:{display:"inline-flex",alignItems:"center",gap:".3rem",border:"1.5px solid "+(on?t.renk:C.line),background:on?t.renk:"#fff",color:on?"#fff":C.ink2,borderRadius:999,padding:".3rem .75rem",fontFamily:"inherit",fontWeight:800,fontSize:".78rem",cursor:"pointer"},children:[MI(t.ic,{fontSize:".95rem",color:on?"#fff":t.renk}),t.ad," · ",n]},k)})]}),
    sf?e.jsxs("div",{style:{marginTop:".6rem",display:"flex",alignItems:"center",gap:".4rem",fontSize:".82rem",fontWeight:800,color:C.ink2},children:["Sporcu filtresi:",chip(sf+"  ✕","#fff","#0891B2",()=>setSf(""),"Filtreyi kaldır")]}):null]}),
   e.jsxs("div",{style:{fontSize:".82rem",fontWeight:800,color:C.muted,margin:"0 0 .5rem .2rem"},children:[filt.length," kayıt gösteriliyor"]}),
   yuk&&!logs.length?e.jsx("div",{style:{textAlign:"center",padding:"3rem",color:C.muted,fontWeight:700},children:"Yükleniyor…"}):
   filt.length===0?e.jsxs("div",{style:{background:C.card,border:"1px solid "+C.line,borderRadius:16,textAlign:"center",padding:"3rem 1rem",color:C.muted,fontWeight:700},children:[MI("history",{fontSize:"2.6rem",display:"block",margin:"0 auto .5rem",color:C.sub}),"Seçilen filtrelere uygun işlem yok."]}):
   gruplar.map(g=>e.jsxs("div",{style:{marginBottom:"1rem"},children:[
    e.jsxs("div",{className:"al-day",style:{position:"sticky",top:76,zIndex:5,display:"flex",alignItems:"center",gap:".5rem",margin:"0 0 .5rem",padding:".35rem .2rem",background:C.bg},children:[e.jsx("span",{style:{fontWeight:900,fontSize:".92rem"},children:g.ad}),chip(g.list.length+" işlem",C.ink2,"#E2E8F0")]}),
    e.jsx("div",{style:{background:C.card,border:"1px solid "+C.line,borderRadius:16,overflow:"hidden"},children:g.list.map(x=>{const t=tip(x.type),d=parseData(x),ac=acik[x.id],deg=x.newValue!=null||x.oldValue!=null,fark=deg&&!isNaN(Number(x.newValue))&&!isNaN(Number(x.oldValue))&&x.oldValue!=null?Number(x.newValue)-Number(x.oldValue):null,br=bransOf(x);
     return e.jsxs("div",{className:"al-row",style:{display:"flex",gap:".8rem",padding:".75rem 1rem",borderBottom:"1px solid #EEF2F7",alignItems:"flex-start"},children:[
      e.jsx("div",{style:{width:36,height:36,borderRadius:10,background:t.renk+"1a",color:t.renk,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0},children:MI(t.ic)}),
      e.jsxs("div",{style:{flex:1,minWidth:0},children:[
       e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:".5rem",flexWrap:"wrap"},children:[e.jsx("span",{style:{fontWeight:900,fontSize:".86rem",color:t.renk},children:t.ad}),br?chip(BRANS[br]||br,C.ink2,C.soft):null,e.jsx("span",{style:{marginLeft:"auto",fontSize:".78rem",fontWeight:800,color:C.muted,fontVariantNumeric:"tabular-nums"},children:saat(x.timestamp)})]}),
       e.jsx("div",{style:{fontSize:".92rem",fontWeight:700,margin:".2rem 0 .35rem",color:C.ink,overflowWrap:"anywhere"},children:temizMesaj(x)}),
       e.jsxs("div",{style:{display:"flex",flexWrap:"wrap",gap:".35rem",alignItems:"center"},children:[
        x.athleteName?chip([MI("person",{fontSize:".9rem"}),x.athleteName],"#0E7490","#ECFEFF",()=>setSf(x.athleteName),"Bu sporcunun tüm işlemleri"):null,
        x.category?chip(adlar[x.competitionId]?.kat?.[x.category]||katAd(x.category),"#6D28D9","#F5F3FF"):null,
        x.field?chip(alanAd(x.field),"#334155","#F1F5F9",null,x.field):null,
        deg?e.jsxs("span",{style:{display:"inline-flex",alignItems:"center",gap:".3rem",fontSize:".8rem",fontWeight:900,fontVariantNumeric:"tabular-nums"},children:[x.oldValue!=null&&x.oldValue!==""?e.jsx("span",{style:{color:C.sub,textDecoration:"line-through"},children:sayi(x.oldValue)}):null,x.oldValue!=null&&x.oldValue!==""?MI("arrow_forward",{fontSize:".9rem",color:C.sub}):e.jsx("span",{style:{color:C.sub,fontWeight:800,fontSize:".74rem"},children:"Not:"}),e.jsx("span",{style:{color:C.ink},children:sayi(x.newValue)}),fark!=null&&Math.abs(fark)>1e-9?chip((fark>0?"+":"")+fark.toFixed(Math.abs(fark)<.1?3:2),fark>0?"#15803D":"#DC2626",fark>0?"#DCFCE7":"#FEE2E2"):null]}):null,
        d&&d.source?chip(d.source==="hakem"?"Hakem paneli"+(d.panelId?" · "+String(d.panelId).toUpperCase():""):d.source,"#1D4ED8","#EFF6FF"):null,
        x.user?chip([MI("account_circle",{fontSize:".9rem"}),x.user],C.ink2,"#F1F5F9",()=>setUf(x.user),"Bu kullanıcının işlemleri"):null,
        x.competitionId?chip([MI("emoji_events",{fontSize:".9rem"}),compAd(x.competitionId)],"#92400E","#FFFBEB",()=>setCf(x.competitionId),"Bu yarışmanın işlemleri"):null,
        e.jsx("button",{type:"button",onClick:()=>setAcik(o=>({...o,[x.id]:!o[x.id]})),style:{marginLeft:"auto",border:"none",background:"transparent",color:C.sub,fontFamily:"inherit",fontWeight:800,fontSize:".74rem",cursor:"pointer"},children:ac?"Ayrıntıyı gizle ▲":"Ayrıntı ▼"})]}),
       d&&Array.isArray(d.kriterler)&&d.kriterler.length?e.jsxs("div",{style:{display:"flex",flexWrap:"wrap",gap:".3rem",marginTop:".45rem",alignItems:"center"},children:[e.jsx("span",{style:{fontSize:".72rem",fontWeight:800,color:C.sub,marginRight:".15rem"},children:({a:"Kriterler:",d:"Hareketler:",t:"Süre:",l:"Çizgi:"})[d.panelType]||"Ayrıntı:"}),...d.kriterler.map((z,i)=>e.jsx("span",{children:chip(z.ad+" "+z.deger,"#9D174D","#FDF2F8")},"k"+i)),...(d.kesintiler||[]).map((z,i)=>e.jsx("span",{children:chip(z.ad+(z.adet>1?" ×"+z.adet:"")+" "+z.deger,"#B91C1C","#FEF2F2")},"x"+i)),d.ham!=null?e.jsx("span",{children:chip("Ham "+d.ham+(d.kesintiToplam?" · Kesinti "+d.kesintiToplam:""),"#334155","#F1F5F9")},"h"):null]}):null,
       ac?e.jsx("pre",{style:{margin:".5rem 0 0",background:C.soft,border:"1px solid "+C.line,borderRadius:10,padding:".6rem .75rem",fontSize:".74rem",whiteSpace:"pre-wrap",overflowWrap:"anywhere",color:C.ink2,fontFamily:"ui-monospace,Menlo,monospace"},children:JSON.stringify({...x,data:d||x.data,tarih:x.timestamp?new Date(x.timestamp).toLocaleString("tr-TR"):void 0},null,2)}):null]})]},x.id)})})]},g.k)),
   logs.length>=lim?e.jsx("div",{style:{textAlign:"center",marginTop:"1rem"},children:e.jsxs("button",{type:"button",onClick:()=>setLim(v=>v+300),style:{display:"inline-flex",alignItems:"center",gap:".35rem",border:"1px solid "+C.line,borderRadius:11,padding:".6rem 1rem",fontFamily:"inherit",fontWeight:800,fontSize:".86rem",cursor:"pointer",background:"#fff",color:C.ink2},children:[MI("expand_more"),"Daha eski kayıtları yükle (+300)"]})}):null]})]})}
export{AuditLog as default};
