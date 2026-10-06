import"./i18n-Tr01a2b3Cb2.js";import{b as usToast,a as usDisc,j as e,d as db}from"./main-C2LpyYUGCb2.js";import{u as useNav,r as R}from"./vendor-react-Cxw6bqwhCb2.js";import{k as ref,o as onValue,m as update,v as set}from"./vendor-firebase-940mxgRVCb2.js";import{GXP_CSS}from"./ArtistikNotSilmePage-Ns01a2b3Cb2.js";import"./modulepreload-polyfill-B5Qt9EMXCb2.js";

// ARŞİV (eski /arsiv.html'in uygulama içi sürümü; yalnızca süper admin)
// <branş yolu>/<yarışma>/arsivli = true → yarışma tüm seçim ekranlarından gizlenir; veri silinmez.
const BRANS={artistik:{renk2:"#7C3AED",img:"/brans/alet/artistik_kadin.png",ad:"Artistik",fb:"competitions",renk:"#4F46E5",ikon:"sports_gymnastics"},aerobik:{renk2:"#0EA5E9",img:"/brans/aerobik.png",ad:"Aerobik",fb:"aerobik_yarismalar",renk:"#10B981",ikon:"directions_run"},trampolin:{renk2:"#DB2777",img:"/brans/trampolin.png",ad:"Trampolin",fb:"trampolin_yarismalar",renk:"#F97316",ikon:"rocket_launch"},parkur:{renk2:"#EF4444",img:"/brans/parkur.png",ad:"Parkur",fb:"parkur_yarismalar",renk:"#F59E0B",ikon:"accessibility_new"},ritmik:{renk2:"#8B5CF6",img:"/brans/alet/ritmik.png",ad:"Ritmik",fb:"ritmik_yarismalar",renk:"#EC4899",ikon:"auto_awesome"}};
const arsivli=c=>c&&(c.arsivli===!0||c.arsivli==="true");
const bugun=()=>{const d=new Date;return`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`};
const gun=s=>{const m=/^(\d{4})-(\d{2})-(\d{2})/.exec(String(s||""));return m?`${m[3]}.${m[2]}.${m[1]}`:""};
const bitis=c=>String(c.bitisTarihi||c.baslangicTarihi||"").slice(0,10);
const durum=c=>{const t=bugun(),b=String(c.baslangicTarihi||"").slice(0,10),x=bitis(c);if(x&&x<t)return["past",__T("Bitti")];if(b&&b>t)return["soon",__T("Yaklaşan")];if(b)return["live",__T("Devam ediyor")];return null};
const AY=["Oca","Şub","Mar","Nis","May","Haz","Tem","Ağu","Eyl","Eki","Kas","Ara"],AY_EN=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const enMi=()=>{try{return /^en/i.test(document.documentElement.lang||"")}catch{return!1}};
const tarihP=s=>{const m=/^(\d{4})-(\d{2})-(\d{2})/.exec(String(s||""));return m?{y:m[1],g:+m[3],a:(enMi()?AY_EN:AY)[+m[2]-1]}:null};
const CSS=GXP_CSS+`
.arx{background:#F6F7FB;min-height:100vh}.arx .gxp{max-width:1180px}
.arx .gxp-hdr{position:relative;overflow:hidden;box-shadow:0 1px 2px rgba(15,23,42,.05),0 8px 24px -16px rgba(15,23,42,.22);border-radius:18px;padding:16px 20px}
.arx .gxp-hdr::after{content:"";position:absolute;left:0;right:0;bottom:0;height:3px;background:linear-gradient(90deg,var(--c1),var(--c2))}
.arx .gxp-ic{background:linear-gradient(135deg,var(--c1),var(--c2));box-shadow:0 8px 18px -8px var(--c1)}
.arx .gxp-tt h1{margin:0;font-size:1.3rem;font-weight:900;letter-spacing:-.01em;color:#0F172A}.arx .gxp-tt p{margin:2px 0 0;font-size:.85rem;font-weight:600;color:#64748B}
.ar-hact{margin-left:auto;display:flex;gap:8px;align-items:center}
.ar-chips{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:16px}
.ar-chip{display:inline-flex;align-items:center;gap:9px;border:1px solid #E2E8F0;background:#fff;border-radius:999px;padding:5px 16px 5px 5px;font:inherit;font-weight:800;font-size:.88rem;color:#334155;cursor:pointer;transition:all .2s}
.ar-chip:hover{border-color:var(--a);color:var(--a)}
.ar-chip span{width:30px;height:30px;border-radius:50%;background:#fff;display:grid;place-items:center;box-shadow:0 0 0 1px #E2E8F0}.ar-chip span img{width:78%;height:78%;object-fit:contain}
.ar-chip.on{background:linear-gradient(135deg,var(--a),var(--b));border-color:transparent;color:#fff;box-shadow:0 8px 18px -10px var(--a)}.ar-chip.on span{box-shadow:0 0 0 2px rgba(255,255,255,.5)}
.ar-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:16px}
.ar-stat{display:flex;align-items:center;gap:14px;border-radius:18px!important;box-shadow:0 1px 2px rgba(15,23,42,.05),0 8px 24px -16px rgba(15,23,42,.22)!important;position:relative;overflow:hidden}
.ar-stat::before{content:"";position:absolute;left:0;top:0;bottom:0;width:4px;background:var(--s)}
.ar-si{width:46px;height:46px;border-radius:14px;display:grid;place-items:center;flex-shrink:0;background:color-mix(in srgb,var(--s) 12%,#fff);color:var(--s)}
.ar-stat b{display:block;font-size:1.6rem;font-weight:900;line-height:1;color:#0F172A}.ar-stat span{font-size:.8rem;font-weight:700;color:#64748B}
.ar-bar{display:flex;gap:10px;align-items:center;flex-wrap:wrap;margin-bottom:14px}
.ar-seg{display:inline-flex;background:#fff;border:1px solid #E2E8F0;border-radius:14px;padding:4px;gap:2px}
.ar-seg button{border:none;background:transparent;padding:8px 16px;border-radius:10px;font:inherit;font-weight:800;font-size:.86rem;color:#475569;cursor:pointer;display:inline-flex;align-items:center;gap:6px}
.ar-seg button small{font-weight:800;font-size:.72rem;padding:1px 7px;border-radius:999px;background:#F1F5F9;color:#64748B}
.ar-seg button.on{background:linear-gradient(135deg,var(--c1),var(--c2));color:#fff;box-shadow:0 6px 14px -8px var(--c1)}.ar-seg button.on small{background:rgba(255,255,255,.25);color:#fff}
.ar-qw{flex:1;min-width:200px;max-width:360px;margin-left:auto;position:relative}.ar-qw i{position:absolute;left:12px;top:50%;transform:translateY(-50%);font-size:19px;color:#94A3B8}
.ar-q{width:100%;padding:10px 14px 10px 38px;border:1px solid #E2E8F0;border-radius:12px;font:inherit;font-weight:600;background:#fff}.ar-q:focus{outline:none;border-color:var(--c1);box-shadow:0 0 0 3px color-mix(in srgb,var(--c1) 15%,transparent)}
.ar-btn{display:inline-flex;align-items:center;gap:6px;border:none;border-radius:12px;padding:9px 14px;font:inherit;font-weight:800;font-size:.84rem;cursor:pointer;white-space:nowrap;transition:all .2s}.ar-btn i{font-size:18px}.ar-btn:disabled{opacity:.5;cursor:default}
.ar-btn.arch{background:#fff;color:#C2410C;border:1px solid #FDBA74}.ar-btn.arch:hover:not(:disabled){background:#FFF7ED}
.ar-btn.rest{background:linear-gradient(135deg,var(--c1),var(--c2));color:#fff;box-shadow:0 6px 14px -8px var(--c1)}
.ar-btn.toplu{background:linear-gradient(135deg,#F59E0B,#EA580C);color:#fff;box-shadow:0 6px 14px -8px #EA580C}
.ar-yil{display:flex;align-items:center;gap:10px;margin:18px 2px 8px;font-size:.78rem;font-weight:900;letter-spacing:.12em;color:#94A3B8;text-transform:uppercase}.ar-yil::after{content:"";flex:1;height:1px;background:#E2E8F0}.ar-yil:first-child{margin-top:0}
.ar-list{display:flex;flex-direction:column;gap:10px}
.ar-row{display:flex;align-items:center;gap:16px;border-radius:16px!important;padding:12px 16px 12px 12px!important;box-shadow:0 1px 2px rgba(15,23,42,.05),0 8px 24px -18px rgba(15,23,42,.25)!important;transition:transform .2s,box-shadow .2s}
.ar-row:hover{transform:translateY(-1px);box-shadow:0 2px 4px rgba(15,23,42,.06),0 14px 30px -18px color-mix(in srgb,var(--c1) 50%,transparent)!important}
.ar-dt{width:58px;flex-shrink:0;border-radius:14px;overflow:hidden;text-align:center;background:#fff;box-shadow:0 0 0 1px color-mix(in srgb,var(--c1) 22%,#fff)}
.ar-dt b{display:block;background:linear-gradient(135deg,var(--c1),var(--c2));color:#fff;font-size:.66rem;font-weight:900;letter-spacing:.1em;text-transform:uppercase;padding:3px 0}
.ar-dt span{display:block;font-size:1.35rem;font-weight:900;color:#0F172A;line-height:1.5}
.ar-dt.yok span{font-size:1rem;color:#94A3B8}
.ar-row.ars{background:#FAFAFB!important}.ar-row.ars .ar-dt b{background:#94A3B8}.ar-row.ars .ar-nm{color:#475569}
.ar-nm{font-weight:900;font-size:1rem;display:flex;align-items:center;gap:8px;flex-wrap:wrap;color:#0F172A}
.ar-sub{display:flex;gap:6px;flex-wrap:wrap;margin-top:6px;font-size:.78rem;font-weight:700;color:#475569}.ar-sub span{display:inline-flex;align-items:center;gap:4px;padding:3px 9px;border-radius:999px;background:#F1F5F9}.ar-sub i{font-size:14px;color:var(--c1)}
.ar-row.ars .ar-sub i{color:#94A3B8}
.ar-tag{font-size:.66rem;font-weight:900;padding:3px 9px;border-radius:999px;letter-spacing:.05em;text-transform:uppercase;display:inline-flex;align-items:center;gap:5px}
.ar-tag.past{background:#FEF3C7;color:#92400E}.ar-tag.soon{background:#DBEAFE;color:#1D4ED8}.ar-tag.live{background:#DCFCE7;color:#166534}.ar-tag.live::before{content:"";width:6px;height:6px;border-radius:50%;background:#16A34A;box-shadow:0 0 0 3px rgba(22,163,74,.25)}.ar-tag.arc{background:#EDE9FE;color:#6D28D9}
.ar-note{display:flex;gap:10px;align-items:flex-start;font-size:.8rem;font-weight:600;color:#475569;margin:16px 0 0;line-height:1.5;background:#fff;border:1px dashed color-mix(in srgb,var(--c1) 35%,#E2E8F0);border-radius:14px;padding:12px 14px}.ar-note i{color:var(--c1);font-size:20px}
@media(max-width:720px){.ar-stats{grid-template-columns:1fr}.ar-row{flex-wrap:wrap}.ar-row .ar-btn{width:100%;justify-content:center}.ar-qw{max-width:none;margin-left:0}.ar-hact{margin-left:0;width:100%}}`;

export default function ArsivPage(){
 const nav=useNav(),{toast,confirm}=usToast(),{id:disc0}=usDisc(),disc=(()=>{const p=String(location.pathname||"").split("/")[1];return BRANS[p]?p:disc0})();
 const[brans,setBrans]=R.useState(()=>{const q=new URLSearchParams(location.search).get("brans");return BRANS[q]?q:BRANS[disc]?disc:"artistik"});
 const[comps,setComps]=R.useState(null),[tab,setTab]=R.useState("active"),[q,setQ]=R.useState(""),[busy,setBusy]=R.useState("");
 const B=BRANS[brans];
 R.useEffect(()=>{setComps(null);return onValue(ref(db,B.fb),s=>setComps(s.val()||{}),err=>{toast(__T("Okunamadı")+": "+(err?.message||err),"error");setComps({})})},[brans]);
 const all=R.useMemo(()=>Object.entries(comps||{}).filter(([,c])=>c&&typeof c=="object"&&(c.kategoriler||c.isim||c.ad)).sort((a,b)=>String(b[1].baslangicTarihi||"").localeCompare(String(a[1].baslangicTarihi||""))),[comps]);
 const active=all.filter(([,c])=>!arsivli(c)),ars=all.filter(([,c])=>arsivli(c)),gecmis=active.filter(([,c])=>{const x=bitis(c);return x&&x<bugun()});
 const ql=q.toLocaleLowerCase("tr-TR").trim(),rows=(tab==="active"?active:ars).filter(([,c])=>!ql||`${c.isim||c.ad||""} ${c.il||""}`.toLocaleLowerCase("tr-TR").includes(ql));
 const tek=async(id,c,arch)=>{const ad=c.isim||c.ad||id;if(!await window.__gxConfirm(`"${ad}" (${B.ad}) ${arch?__T("yarışması arşive alınacak. Yarışma listelerinde ve seçim ekranlarında görünmez olur; hiçbir veri silinmez."):__T("yarışması arşivden çıkarılacak ve tekrar listelerde görünecek.")}`,{title:arch?__T("Arşive Al"):__T("Arşivden Çıkar"),type:arch?"warning":"info"}))return;setBusy(id);try{await set(ref(db,`${B.fb}/${id}/arsivli`),arch?!0:null);toast(arch?__T("Arşive alındı"):__T("Arşivden çıkarıldı"),"success")}catch(err){toast(__T("Hata")+": "+(err?.message||err),"error")}setBusy("")};
 const toplu=async()=>{if(!gecmis.length)return;if(!await window.__gxConfirm(`${B.ad}: ${__T("bitiş tarihi geçmiş")} ${gecmis.length} ${__T("yarışma arşive alınacak")}:\n\n${gecmis.map(([,c])=>"• "+(c.isim||c.ad)).join("\n")}`,{title:__T("Bitmişleri Arşive Al"),type:"warning"}))return;setBusy("__toplu");try{const u={};gecmis.forEach(([id])=>{u[`${B.fb}/${id}/arsivli`]=!0});await update(ref(db),u);toast(gecmis.length+" "+__T("yarışma arşive alındı"),"success")}catch(err){toast(__T("Hata")+": "+(err?.message||err),"error")}setBusy("")};
 const secB=k=>{setBrans(k);setQ("");try{const u=new URL(location.href);u.searchParams.set("brans",k);history.replaceState(history.state,"",u)}catch{}};
 // yıllara göre grupla (sıra zaten tarihe göre azalan)
 const gruplar=[];rows.forEach(r=>{const y=String(r[1].baslangicTarihi||"").slice(0,4)||"—",g=gruplar[gruplar.length-1];g&&g.y===y?g.r.push(r):gruplar.push({y,r:[r]})});
 const satir=([id,c])=>{const b=gun(c.baslangicTarihi),x=gun(c.bitisTarihi),tr=b?x&&x!==b?b+" – "+x:b:"",kat=c.kategoriler?Object.keys(c.kategoriler).length:0,act=tab==="active",dr=act?durum(c):null,tp=tarihP(c.baslangicTarihi);
   return e.jsxs("div",{className:"gxp-card ar-row"+(act?"":" ars"),children:[e.jsx("div",{className:"ar-dt"+(tp?"":" yok"),children:tp?[e.jsx("b",{children:tp.a},"a"),e.jsx("span",{children:tp.g},"g")]:[e.jsx("b",{children:"—"},"a"),e.jsx("span",{children:"?"},"g")]}),
    e.jsxs("div",{style:{flex:1,minWidth:0},children:[e.jsxs("div",{className:"ar-nm",children:[c.isim||c.ad||id,dr?e.jsx("span",{className:"ar-tag "+dr[0],children:dr[1]}):null,act?null:e.jsx("span",{className:"ar-tag arc",children:__T("Arşivde")})]}),e.jsxs("div",{className:"ar-sub",children:[tr?e.jsxs("span",{children:[e.jsx("i",{className:"material-icons-round",children:"event"}),tr]}):null,c.il?e.jsxs("span",{children:[e.jsx("i",{className:"material-icons-round",children:"place"}),c.il]}):null,kat?e.jsxs("span",{children:[e.jsx("i",{className:"material-icons-round",children:"category"}),kat+" "+__T("kategori")]}):null]})]}),
    e.jsxs("button",{type:"button",className:"ar-btn "+(act?"arch":"rest"),disabled:busy===id||busy==="__toplu",onClick:()=>tek(id,c,act),children:[e.jsx("i",{className:"material-icons-round",children:act?"archive":"unarchive"}),act?__T("Arşive Al"):__T("Arşivden Çıkar")]})]},id)};
 return e.jsx("div",{className:"arx",style:{"--c1":B.renk,"--c2":B.renk2},children:e.jsxs("div",{className:"gxp",style:{"--gxp-c":B.renk},children:[e.jsx("style",{children:CSS}),
  e.jsxs("div",{className:"gxp-hdr",children:[e.jsx("button",{type:"button",className:"gxp-back",onClick:()=>nav("/"+(BRANS[disc]?disc:brans)),title:__T("Geri"),children:e.jsx("i",{className:"material-icons-round",children:"arrow_back"})}),e.jsx("div",{className:"gxp-ic",children:e.jsx("i",{className:"material-icons-round",children:"inventory_2"})}),e.jsxs("div",{className:"gxp-tt",children:[e.jsx("h1",{children:__T("Arşiv")}),e.jsx("p",{children:__T("Biten yarışmaları arşivle / arşivden çıkar")})]}),
   tab==="active"&&gecmis.length>1?e.jsx("div",{className:"ar-hact",children:e.jsxs("button",{type:"button",className:"ar-btn toplu",disabled:!!busy,onClick:toplu,children:[e.jsx("i",{className:"material-icons-round",children:"archive"}),__T("Bitmişleri arşive al")+" ("+gecmis.length+")"]})}):null]}),
  e.jsx("div",{className:"ar-chips",children:Object.entries(BRANS).map(([k,v])=>e.jsxs("button",{type:"button",className:"ar-chip"+(k===brans?" on":""),style:{"--a":v.renk,"--b":v.renk2},onClick:()=>secB(k),children:[e.jsx("span",{children:e.jsx("img",{src:v.img,alt:""})}),__T(v.ad)]},k))}),
  e.jsx("div",{className:"ar-stats",children:[["play_circle",B.renk,active.length,__T("Aktif listede")],["event_busy","#D97706",gecmis.length,__T("Bitmiş, arşivlenmemiş")],["inventory_2","#7C3AED",ars.length,__T("Arşivde")]].map(([ic,c,n,l])=>e.jsxs("div",{className:"gxp-card ar-stat",style:{"--s":c},children:[e.jsx("div",{className:"ar-si",children:e.jsx("i",{className:"material-icons-round",children:ic})}),e.jsxs("div",{children:[e.jsx("b",{children:comps===null?"…":n}),e.jsx("span",{children:l})]})]},l))}),
  e.jsxs("div",{className:"ar-bar",children:[e.jsxs("div",{className:"ar-seg",children:[e.jsxs("button",{type:"button",className:tab==="active"?"on":"",onClick:()=>setTab("active"),children:[e.jsx("i",{className:"material-icons-round",style:{fontSize:18},children:"event_available"}),__T("Aktif"),e.jsx("small",{children:active.length})]}),e.jsxs("button",{type:"button",className:tab==="arsiv"?"on":"",onClick:()=>setTab("arsiv"),children:[e.jsx("i",{className:"material-icons-round",style:{fontSize:18},children:"inventory_2"}),__T("Arşiv"),e.jsx("small",{children:ars.length})]})]}),
   e.jsxs("div",{className:"ar-qw",children:[e.jsx("i",{className:"material-icons-round",children:"search"}),e.jsx("input",{className:"ar-q",type:"search",placeholder:__T("Yarışma ara…"),value:q,onChange:ev=>setQ(ev.target.value)})]})]}),
  comps===null?e.jsx("div",{className:"gxp-card",children:e.jsxs("div",{className:"gxp-empty",children:[e.jsx("i",{className:"material-icons-round",children:"hourglass_empty"}),__T("Yükleniyor…")]})}):
  !rows.length?e.jsx("div",{className:"gxp-card",children:e.jsxs("div",{className:"gxp-empty",children:[e.jsx("i",{className:"material-icons-round",children:tab==="active"?"event_available":"inventory_2"}),q?__T("Aramaya uyan yarışma yok"):tab==="active"?__T("Aktif yarışma yok"):__T("Arşivde yarışma yok")]})}):
  e.jsx("div",{children:gruplar.map(g=>e.jsxs(R.Fragment,{children:[e.jsx("div",{className:"ar-yil",children:g.y+" · "+g.r.length+" "+__T("yarışma")}),e.jsx("div",{className:"ar-list",children:g.r.map(satir)})]},g.y))}),
  e.jsxs("p",{className:"ar-note",children:[e.jsx("i",{className:"material-icons-round",children:"info"}),e.jsx("span",{children:__T("Arşive alınan yarışma; yarışma listelerinde, puanlama, skor tablosu ve diğer seçim ekranlarında görünmez. Hiçbir veri silinmez; “Arşivden Çıkar” ile aynen geri gelir.")})]})]})})}
