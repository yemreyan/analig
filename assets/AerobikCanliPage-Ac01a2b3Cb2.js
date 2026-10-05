import"./i18n-Tr01a2b3Cb2.js";import{j as e,d as db}from"./main-C2LpyYUGCb2.js";import{r as R}from"./vendor-react-Cxw6bqwhCb2.js";import{k as ref,o as onValue}from"./vendor-firebase-940mxgRVCb2.js";import{isIntl,sporcuUlke,bayrakUrl,katEN}from"./intl-Ul01a2b3Cb2.js";import"./modulepreload-polyfill-B5Qt9EMXCb2.js";
// AEROBİK CANLI SKOR — eski /aerobik-canli-skor.html sayfasının uygulama içi sürümü (büyük ekran; canlı kart → onaylanan puan flashcard → sıralama).
// Uluslararası yarışmada bayrak + ülke kodu, çıktı dili İngilizce ise metinler İngilizce.
const CSS=".lvA *,.lvA *::before,.lvA *::after{box-sizing:border-box;margin:0;padding:0}.lvA{--bg:#070b16;--panel:#111a2e;--panel2:#18233c;--line:#28344f;--txt:#eef3fb;--muted:#93a1c0;--accent:#6366f1;--go:#22c55e;--wait:#f59e0b;--flash:#0ea5e9;--gold:#fbbf24;--warn:#ef4444}.lvA,.lvA{height:100%}.lvA{font-family:'Plus Jakarta Sans',system-ui,sans-serif;background:radial-gradient(1200px 700px at 50% -10%,#132043,#070b16 60%);color:var(--txt);min-height:100vh;overflow:hidden}.lvA .topbar{position:fixed;top:0;left:0;right:0;z-index:30;background:rgba(7,11,22,.85);backdrop-filter:blur(12px);border-bottom:1px solid var(--line);padding:.55rem 1.1rem;display:flex;align-items:center;gap:.8rem;flex-wrap:wrap}.lvA .brand{display:flex;align-items:center;gap:.55rem;font-weight:800;font-size:1.05rem;letter-spacing:.5px}.lvA .brand .material-icons-round{color:var(--flash)}.lvA .selects{display:flex;gap:.55rem;flex-wrap:wrap;margin-left:auto;align-items:center}.lvA select{background:var(--panel2);color:var(--txt);border:1px solid var(--line);border-radius:10px;padding:.45rem .75rem;font:inherit;font-size:.82rem;font-weight:700;cursor:pointer;max-width:240px}.lvA .mode-pill{display:flex;align-items:center;gap:.35rem;font-size:.72rem;font-weight:800;padding:.35rem .7rem;border-radius:999px}.lvA .mode-live{background:rgba(34,197,94,.14);color:#86efac;border:1px solid rgba(34,197,94,.35)}.lvA .mode-flash{background:rgba(14,165,233,.14);color:#7dd3fc;border:1px solid rgba(14,165,233,.4)}.lvA .mode-standings{background:rgba(251,191,36,.14);color:#fcd34d;border:1px solid rgba(251,191,36,.35)}.lvA .mode-pill .dot{width:8px;height:8px;border-radius:50%;background:currentColor}.lvA .yc-toggle{display:flex;align-items:center;gap:.35rem;background:var(--accent);color:#fff;border:none;border-radius:10px;padding:.45rem .8rem;font:inherit;font-size:.82rem;font-weight:800;cursor:pointer}.lvA .yc-toggle .material-icons-round{font-size:1.1rem}.lvA .stage{position:fixed;top:52px;left:0;right:0;bottom:0;padding:1rem;display:flex;flex-direction:column}.lvA .hidden{display:none!important}.lvA .live-card{flex:1;background:linear-gradient(160deg,var(--panel),#0d1526);border:1px solid var(--line);border-radius:22px;display:flex;flex-direction:column;overflow:hidden;min-height:0}.lvA .lc-head{display:flex;align-items:center;gap:1rem;padding:1.1rem 1.6rem;border-bottom:1px solid var(--line);flex-wrap:wrap}.lvA .lc-badge{display:inline-flex;align-items:center;gap:.4rem;font-weight:800;font-size:.82rem;letter-spacing:1px;padding:.35rem .9rem;border-radius:999px}.lvA .sb-go{background:rgba(34,197,94,.16);color:#86efac;border:1px solid rgba(34,197,94,.4)}.lvA .sb-wait{background:rgba(245,158,11,.16);color:#fcd34d;border:1px solid rgba(245,158,11,.4)}.lvA .lc-name{font-weight:800;font-size:clamp(1.5rem,3vw,2.6rem);line-height:1.05}.lvA .lc-club{color:var(--muted);font-weight:700;font-size:clamp(.85rem,1.4vw,1.15rem);margin-top:.15rem}.lvA .lc-kat{margin-left:auto;background:var(--panel2);border:1px solid var(--line);border-radius:999px;padding:.45rem 1.1rem;font-weight:800;font-size:.9rem}.lvA .lc-total{margin-left:.6rem;background:linear-gradient(135deg,#6366f1,#0891b2);border-radius:14px;padding:.5rem 1.3rem;text-align:center}.lvA .lc-total .l{font-size:.62rem;font-weight:800;opacity:.85;letter-spacing:1px}.lvA .lc-total .v{font-size:clamp(1.7rem,3vw,2.4rem);font-weight:800;font-variant-numeric:tabular-nums}.lvA .lc-body{flex:1;display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;padding:1.4rem 1.6rem;align-content:center;min-height:0}.lvA .sc-box{background:var(--panel2);border:1px solid var(--line);border-radius:18px;padding:1.2rem;display:flex;flex-direction:column;align-items:center;justify-content:center}.lvA .sc-box .k{display:flex;align-items:center;gap:.5rem;font-size:.9rem;font-weight:800;color:var(--muted);letter-spacing:1px;text-transform:uppercase}.lvA .sc-box .k .b{width:30px;height:30px;border-radius:9px;display:flex;align-items:center;justify-content:center;font-weight:800;color:#fff}.lvA .sc-box .v{font-size:clamp(2rem,4.5vw,3.6rem);font-weight:800;font-variant-numeric:tabular-nums;margin-top:.4rem;line-height:1}.lvA .sc-box .sub{font-size:.78rem;color:var(--muted);font-weight:700;margin-top:.35rem;text-align:center}.lvA .bD .b{background:#8b5cf6}.lvA .bA .b{background:#f59e0b}.lvA .bE .b{background:#0891b2}.lvA .bP .b{background:#ef4444}.lvA .bL .b{background:#10b981}.lvA .bT .b{background:#3b82f6}.lvA .sc-box.neg .v{color:#fca5a5}.lvA .empty{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;color:var(--muted);gap:.8rem}.lvA .empty .material-icons-round{font-size:3rem;opacity:.4}.lvA .flash-ov{position:fixed;inset:0;z-index:40;background:radial-gradient(900px 600px at 50% 30%,rgba(14,165,233,.18),rgba(7,11,22,.97) 65%);display:flex;align-items:center;justify-content:center;padding:2rem;animation:fadein .35s ease}@keyframes fadein{from{opacity:0}to{opacity:1}}@keyframes pop{0%{transform:scale(.9);opacity:0}60%{transform:scale(1.02)}100%{transform:scale(1);opacity:1}}.lvA .flash-card{width:100%;max-width:780px;background:linear-gradient(160deg,var(--panel),#0d1526);border:1px solid rgba(14,165,233,.55);border-radius:26px;box-shadow:0 0 0 1px rgba(14,165,233,.3),0 0 60px rgba(14,165,233,.2) inset,0 30px 80px rgba(0,0,0,.6);padding:2rem 2.2rem;text-align:center;animation:pop .45s ease}.lvA .flash-tag{display:inline-block;font-weight:800;font-size:.85rem;letter-spacing:1.5px;padding:.35rem 1rem;border-radius:999px;background:rgba(14,165,233,.16);color:#7dd3fc;border:1px solid rgba(14,165,233,.45);margin-bottom:1rem}.lvA .flash-name{font-weight:800;font-size:clamp(1.8rem,4vw,3rem);line-height:1.05}.lvA .flash-club{color:var(--muted);font-weight:700;font-size:clamp(.9rem,1.6vw,1.2rem);margin-top:.25rem}.lvA .flash-kat{color:var(--flash);font-weight:800;font-size:.95rem;margin-top:.15rem}.lvA .flash-total{font-weight:800;font-variant-numeric:tabular-nums;font-size:clamp(3.4rem,9vw,6.5rem);line-height:1;color:#fff;text-shadow:0 0 34px rgba(14,165,233,.55);margin:.7rem 0 .3rem}.lvA .flash-grid{display:flex;flex-wrap:wrap;gap:1rem 1.6rem;justify-content:center;margin-top:1rem}.lvA .flash-grid .cell{display:flex;flex-direction:column;align-items:center;min-width:64px}.lvA .flash-grid .k{font-size:.9rem;font-weight:800;color:var(--muted);letter-spacing:1px}.lvA .flash-grid .v{font-size:clamp(1.5rem,3vw,2.3rem);font-weight:800;font-variant-numeric:tabular-nums;margin-top:.1rem}.lvA .flash-grid .cell.neg .v{color:#fca5a5}.lvA .flash-rank{margin-top:1.1rem;font-weight:800;font-size:1.05rem;color:var(--gold)}.lvA .standings{flex:1;background:linear-gradient(160deg,var(--panel),#0d1526);border:1px solid var(--line);border-radius:22px;overflow:hidden;display:flex;flex-direction:column}.lvA .st-head{display:flex;align-items:center;gap:.8rem;padding:.9rem 1.4rem;border-bottom:1px solid var(--line)}.lvA .st-head .material-icons-round{color:var(--gold)}.lvA .st-head h2{font-size:1.35rem;font-weight:800}.lvA .st-head .cat{margin-left:auto;color:var(--muted);font-weight:700}.lvA .st-scroll{flex:1;overflow:auto}.lvA table{width:100%;border-collapse:collapse;font-variant-numeric:tabular-nums}.lvA th,.lvA td{padding:.6rem .9rem;text-align:center}.lvA th{font-size:.72rem;font-weight:800;color:var(--muted);letter-spacing:.5px;text-transform:uppercase;border-bottom:1px solid var(--line);position:sticky;top:0;background:#0d1526}.lvA td{border-bottom:1px solid rgba(40,52,79,.5);font-weight:700}.lvA .st-rank{font-weight:800;width:52px}.lvA .st-rank.r1{color:var(--gold)}.lvA .st-rank.r2{color:#cbd5e1}.lvA .st-rank.r3{color:#d19a66}.lvA .st-name{text-align:left;font-weight:800;font-size:1rem}.lvA .st-club{text-align:left;color:var(--muted);font-weight:700;font-size:.8rem}.lvA .st-total{font-weight:800;font-size:1.2rem;color:#7dd3fc}.lvA .st-ded{color:#fca5a5}.lvA tbody tr:nth-child(odd){background:rgba(255,255,255,.015)}.lvA .notice{flex:1;display:flex;align-items:center;justify-content:center;color:var(--muted);font-weight:700;font-size:1.1rem;text-align:center;padding:2rem}.lvA{position:fixed;inset:0;z-index:60;overflow:hidden}.lvA .gx-fl{width:1.25em;height:.94em;object-fit:cover;border-radius:2px;vertical-align:-.1em;margin-right:.4em;box-shadow:0 0 0 1px rgba(255,255,255,.25)}.lvA .brand img{height:26px;margin-right:.3rem;border-radius:4px;background:#fff;padding:2px 4px}";
const HTML="<div class=\"topbar\">\n  <div class=\"brand\"><img src=\"/brand/gymnaxis-logo-beyaz.svg\" alt=\"Gymexa Score\" style=\"background:none;padding:0;height:24px\"><span class=\"material-icons-round\">stadium</span> <span>AEROBİK — CANLI SKOR</span></div>\n  <div class=\"selects\">\n    <button id=\"viewToggle\" class=\"yc-toggle\"><span class=\"material-icons-round\">swap_horiz</span> Görünüm</button>\n    <span id=\"modePill\" class=\"mode-pill mode-live\"><span class=\"dot\"></span> <span id=\"modeText\">CANLI</span></span>\n    <select id=\"compSel\"><option value=\"\">Yarışma…</option></select>\n    <select id=\"catSel\"><option value=\"\">Tüm kategoriler</option></select>\n  </div>\n</div>\n<div class=\"stage\">\n  <div id=\"body\"><div class=\"notice\">Yarışma seçin.</div></div>\n</div>";
function start(){const __iv=[];

const BASE="aerobik_yarismalar";
const $=id=>document.getElementById(id);
const esc=s=>String(s==null?"":s).replace(/[<&>]/g,c=>({"<":"&lt;",">":"&gt;","&":"&amp;"}[c]));
const f2=v=>v==null||isNaN(v)?"—":Number(v).toFixed(2);
const f3=v=>v==null||isNaN(v)?"—":Number(v).toFixed(3);
const params=new URLSearchParams(location.search);
const FLASH_MS=(parseFloat(params.get("flash"))||9)*1000;
const IDLE_MS=(parseFloat(params.get("idle"))||45)*1000;
let comps={}, comp="", catF="", punanlar={}, spor={}, active={}, subs=[];
let seenDone=new Set(), firstBuild=true, flashQ=[], flashCur=null, flashUntil=0, lastActive=Date.now(), viewOv=null;

function trimA(o){if(!o)return null;const v=["j1","j2","j3","j4"].map(k=>o[k]).filter(x=>x!=null&&!isNaN(x));if(!v.length)return null;if(v.length<2)return v[0];if(v.length===4){v.sort((x,y)=>x-y);return (v[1]+v[2])/2;}return v.reduce((a,b)=>a+b,0)/v.length;}
function calcE(o){if(!o)return null;const v=["j1","j2","j3","j4"].map(k=>o[k]).filter(x=>x!=null&&!isNaN(x));if(!v.length)return null;let m;if(v.length===4){const s=[...v].sort((x,y)=>x-y);m=(s[1]+s[2])/2;}else m=v.reduce((a,b)=>a+b,0)/v.length;return 10-m;}
function comps6(sc){
  const d=sc.dScore!=null?sc.dScore:null;
  const a=sc.aScore!=null?sc.aScore:trimA(sc.aPanel);
  const e=sc.eScore!=null?sc.eScore:calcE(sc.ePanel);
  const p=sc.penalty!=null?sc.penalty:(sc.totalPenalties!=null?sc.totalPenalties:(sc.neutralDeductions!=null?sc.neutralDeductions:0));
  const l=sc.lPanel!=null?(typeof sc.lPanel==="object"?(sc.lPanel.totalDeduction??sc.lPanel.deduction):sc.lPanel):null;
  const t=sc.tPanel!=null?(typeof sc.tPanel==="object"?sc.tPanel.deduction:sc.tPanel):null;
  const fin=sc.finalScore!=null?sc.finalScore:(sc.sonuc!=null?sc.sonuc:((d||0)+(a||0)+(e||0)-(p||0)));
  return {d,a,e,p,l,t,fin};
}
function isDone(sc){return sc&&typeof sc==="object"&&(sc.kilitli===true||sc.durum==="tamamlandi");}
const INTL=()=>isIntl(comps[comp]);const EN=()=>INTL()&&comps[comp]?.ciktiDili!=="tr";const T=(tr,en)=>EN()?en:tr;
const flag=k=>{const u=k&&bayrakUrl(k);return u?`<img class="gx-fl" src="${u}" alt="">`:""};
const clubH=m=>INTL()&&m.ulke?`${flag(m.ulke)}${esc(m.ulke)}${m.club&&m.club!==m.ulke?" · "+esc(m.club):""}`:esc(m.club);
function catName(c){const n=comps[comp]?.kategoriler?.[c]?.name||c;return EN()?katEN(n):n;}
function nmeta(cat,ath){const i=(spor[cat]&&spor[cat][ath])||{};return{name:[i.ad,i.soyad].filter(Boolean).join(" ")||ath,club:i.il||i.okul||i.kulup||"",ad:i.ad||"",soyad:i.soyad||"",ulke:sporcuUlke(i,comps[comp])};}

const __u0=onValue(ref(db,BASE),s=>{
  comps=s.val()||{};
  const opts=Object.entries(comps).filter(([id,c])=>c&&typeof c==="object").sort((a,b)=>(b[1].baslangicTarihi||"").localeCompare(a[1].baslangicTarihi||""));
  $("compSel").innerHTML='<option value="">Yarışma…</option>'+opts.map(([id,c])=>`<option value="${id}">${esc(c.isim||c.ad||id)}</option>`).join("");
  if(comp&&comps[comp])$("compSel").value=comp;
  else if(!comp&&opts.length===1){comp=opts[0][0];$("compSel").value=comp;watch();}
  if(comp)render();
});
$("compSel").addEventListener("change",e=>{comp=e.target.value;watch();});
$("catSel").addEventListener("change",e=>{catF=e.target.value;render();});
$("viewToggle").addEventListener("click",()=>{const o=["auto","live","standings"];viewOv=o[(o.indexOf(viewOv||"auto")+1)%o.length];if(viewOv==="auto")viewOv=null;render();});

function watch(){
  subs.forEach(u=>{try{u()}catch(e){}});subs=[];
  seenDone=new Set();firstBuild=true;flashQ=[];flashCur=null;
  if(!comp){$("body").innerHTML='<div class="notice">Yarışma seçin.</div>';return;}
  subs.push(onValue(ref(db,`${BASE}/${comp}/sporcular`),s=>{spor=s.val()||{};render();}));
  subs.push(onValue(ref(db,`${BASE}/${comp}/aktifSporcu`),s=>{active=s.val()||{};lastActive=Date.now();render();}));
  subs.push(onValue(ref(db,`${BASE}/${comp}/puanlar`),s=>{punanlar=s.val()||{};detectDone();render();}));
}

// Yeni onaylanan (durum=tamamlandi) sporcu -> flashcard kuyruğu
function detectDone(){
  const nowDone=[];
  Object.entries(punanlar).forEach(([cat,aths])=>{
    if(!aths||typeof aths!=="object")return;
    Object.entries(aths).forEach(([ath,sc])=>{ if(isDone(sc)) nowDone.push(cat+"/"+ath); });
  });
  if(firstBuild){ nowDone.forEach(k=>seenDone.add(k)); firstBuild=false; return; }
  nowDone.forEach(k=>{ if(!seenDone.has(k)){ seenDone.add(k); const [cat,ath]=k.split("/"); flashQ.push({cat,ath}); lastActive=Date.now(); } });
}

// aktif (en yeni ts) sporcu
function activeAth(){
  let cat="",ath=null,bt=-1;
  Object.entries(active).forEach(([k,v])=>{ if(v&&(v.ts||0)>=bt){bt=v.ts||0;cat=k;ath=v;} });
  return ath&&typeof ath==="object"&&ath.id?{cat,id:ath.id,obj:ath}:null;
}

function rankOf(cat,ath){
  const rows=[];
  const aths=punanlar[cat]||{};
  Object.entries(aths).forEach(([id,sc])=>{ if(isDone(sc))rows.push({id,fin:comps6(sc).fin}); });
  rows.sort((a,b)=>(b.fin||0)-(a.fin||0));
  const i=rows.findIndex(r=>r.id===ath);
  return i<0?null:{rank:i+1,total:rows.length};
}

// ---- FLASHCARD ----
function flashHTML(fc){
  const sc=(punanlar[fc.cat]||{})[fc.ath]||{}; const C=comps6(sc); const m=nmeta(fc.cat,fc.ath);
  const rk=rankOf(fc.cat,fc.ath);
  const cells=[["D",f2(C.d),false],["A",f2(C.a),false],["E",f3(C.e),false],["P",C.p?("−"+f2(C.p)):"0.00",C.p>0],["L",C.l!=null?("−"+f2(C.l)):"—",C.l>0],["T",C.t!=null?("−"+f2(C.t)):"—",C.t>0]];
  return `<div class="flash-ov"><div class="flash-card">
    <span class="flash-tag">${T("★ ÜST JÜRİ ONAYLADI — PUAN İLAN EDİLDİ ★","★ SCORE CONFIRMED ★")}</span>
    <div class="flash-name">${esc(m.name)}</div>
    <div class="flash-club">${clubH(m)}</div>
    <div class="flash-kat">${esc(catName(fc.cat))}</div>
    <div class="flash-total">${f3(C.fin)}</div>
    <div class="flash-grid">${cells.map(([k,v,neg])=>`<div class="cell ${neg?"neg":""}"><span class="k">${k}</span><span class="v">${v}</span></div>`).join("")}</div>
    ${rk?`<div class="flash-rank">${esc(catName(fc.cat))} · ${EN()?"Rank "+rk.rank+" / "+rk.total:rk.rank+". sıra / "+rk.total}</div>`:""}
  </div></div>`;
}

// ---- LIVE CARD ----
function liveHTML(a){
  const sc=(punanlar[a.cat]||{})[a.id]||{}; const C=comps6(sc); const m=nmeta(a.cat,a.id);
  const nm=a.obj.ad?((a.obj.ad+" "+(a.obj.soyad||"")).trim()):m.name;
  const cl=a.obj.il||a.obj.okul||m.club;
  const done=isDone(sc);
  const boxes=[
    {k:"D",cls:"bD",v:f3(C.d),sub:T("Zorluk","Difficulty")},{k:"A",cls:"bA",v:f3(C.a),sub:T("Artistik","Artistry")},{k:"E",cls:"bE",v:f3(C.e),sub:T("Uygulama","Execution")},
    {k:"P",cls:"bP",v:C.p?("−"+f2(C.p)):"0.00",sub:T("Ceza/Nötr","Penalty"),neg:C.p>0},{k:"L",cls:"bL",v:C.l!=null?("−"+f2(C.l)):"—",sub:T("Çizgi","Line"),neg:C.l>0},{k:"T",cls:"bT",v:C.t!=null?("−"+f2(C.t)):"—",sub:T("Süre","Time"),neg:C.t>0},
  ];
  return `<div class="live-card">
    <div class="lc-head">
      <span class="lc-badge ${done?"sb-go":"sb-wait"}">${done?T("PUANLANDI","SCORED"):T("PUAN BEKLENİYOR","AWAITING SCORE")}</span>
      <div><div class="lc-name">${esc(nm)}</div><div class="lc-club">${INTL()?clubH(m):esc(cl||"")}</div></div>
      <div class="lc-kat">${esc(catName(a.cat))}</div>
      <div class="lc-total"><div class="l">${T("TOPLAM","TOTAL")}</div><div class="v">${f3(C.fin)}</div></div>
    </div>
    <div class="lc-body">${boxes.map(b=>`<div class="sc-box ${b.cls} ${b.neg?"neg":""}"><div class="k"><span class="b">${b.k}</span>${b.sub}</div><div class="v">${b.v}</div></div>`).join("")}</div>
  </div>`;
}

// ---- STANDINGS ----
function standingsHTML(){
  const cats=Object.keys(punanlar).filter(c=>punanlar[c]&&typeof punanlar[c]==="object");
  let showCats=catF?[catF]:cats;
  // tek tabloya sığdır: seçili kategori yoksa en çok tamamlanan kategoriyi göster
  if(!catF){
    let best="",bc=-1;
    cats.forEach(c=>{const n=Object.values(punanlar[c]).filter(isDone).length;if(n>bc){bc=n;best=c;}});
    showCats=best?[best]:[];
  }
  const c=showCats[0];
  const rows=[];
  if(c){Object.entries(punanlar[c]||{}).forEach(([id,sc])=>{ if(isDone(sc)){const C=comps6(sc);const m=nmeta(c,id);rows.push({id,name:m.name,club:m.club,m,C,fin:C.fin});} });}
  rows.sort((a,b)=>(b.fin||0)-(a.fin||0));
  const head=`<div class="st-head"><span class="material-icons-round">emoji_events</span><h2>${T("SIRALAMA","RANKING")}</h2><span class="cat">${esc(c?catName(c):"—")}</span></div>`;
  if(!rows.length)return `<div class="standings">${head}<div class="notice">${T("Henüz onaylanmış puan yok.","No confirmed scores yet.")}</div></div>`;
  const body=rows.map((r,i)=>{const rk=i+1;return `<tr>
    <td class="st-rank ${rk<=3?"r"+rk:""}">${rk}</td>
    <td class="st-name">${esc(r.name)}</td><td class="st-club">${INTL()?clubH(r.m):esc(r.club)}</td>
    <td>${f2(r.C.d)}</td><td>${f2(r.C.a)}</td><td>${f3(r.C.e)}</td>
    <td class="st-ded">${r.C.p?"−"+f2(r.C.p):"—"}</td><td class="st-ded">${r.C.l!=null?"−"+f2(r.C.l):"—"}</td><td class="st-ded">${r.C.t!=null?"−"+f2(r.C.t):"—"}</td>
    <td class="st-total">${f3(r.fin)}</td></tr>`;}).join("");
  return `<div class="standings">${head}<div class="st-scroll"><table><thead><tr><th>#</th><th style="text-align:left">${T("Sporcu","Gymnast")}</th><th style="text-align:left">${INTL()?"NOC":T("Kulüp/İl","Club")}</th><th>D</th><th>A</th><th>E</th><th>P</th><th>L</th><th>T</th><th>${T("Toplam","Total")}</th></tr></thead><tbody>${body}</tbody></table></div></div>`;
}

function effectiveView(){
  if(flashCur)return "flash";
  if(viewOv==="live")return "live";
  if(viewOv==="standings")return "standings";
  const a=activeAth();
  if(a && Date.now()-lastActive<IDLE_MS) return "live";
  return "standings";
}

function render(){
  try{const b=document.querySelector(".lvA .brand span:last-child");b&&(b.textContent=EN()?"AEROBIC — LIVE SCORE":"AEROBİK — CANLI SKOR");document.documentElement.lang=EN()?"en":(globalThis.__LANG?.()||"tr")}catch(e){}
  if(!comp){$("body").innerHTML='<div class="notice">Yarışma seçin.</div>';return;}
  // kategori filtre secenekleri
  const cats=Object.keys(punanlar).filter(c=>punanlar[c]&&typeof punanlar[c]==="object");
  const curOpts=Array.from($("catSel").options).map(o=>o.value).join(",");
  const newOpts=[""].concat(cats).join(",");
  if(curOpts!==newOpts){$("catSel").innerHTML='<option value="">'+T("Tüm kategoriler","All categories")+'</option>'+cats.map(c=>`<option value="${c}">${esc(catName(c))}</option>`).join("");if(catF)$("catSel").value=catF;}
  const v=effectiveView();
  if(v==="flash"){ $("body").innerHTML=flashHTML(flashCur); $("modePill").className="mode-pill mode-flash";$("modeText").textContent=T("PUAN İLANI","SCORE"); return; }
  if(v==="live"){ const a=activeAth(); $("body").innerHTML=a?liveHTML(a):`<div class="empty"><span class="material-icons-round">hourglass_empty</span>${T("Sporcu bekleniyor…","Waiting for gymnast…")}</div>`; $("modePill").className="mode-pill mode-live";$("modeText").textContent=T("CANLI","LIVE"); return; }
  $("body").innerHTML=standingsHTML(); $("modePill").className="mode-pill mode-standings";$("modeText").textContent=T("SIRALAMA","RANKING");
}

// flashcard kuyruğu döngüsü
__iv.push(setInterval(()=>{
  const now=Date.now();
  if(flashCur){ if(now>=flashUntil){ flashCur=null; render(); } return; }
  if(flashQ.length){ flashCur=flashQ.shift(); flashUntil=now+FLASH_MS; render(); }
},400));
__iv.push(setInterval(()=>{ if(comp&&!flashCur) render(); },1500));

const qc=params.get("comp")||params.get("compId");
if(qc){comp=qc;watch();}

return()=>{try{__u0()}catch(e){}subs.forEach(u=>{try{u()}catch(e){}});__iv.forEach(clearInterval);try{document.documentElement.lang=globalThis.__LANG?.()||"tr"}catch(e){}}}
export default function AerobikCanliPage(){const r=R.useRef(null);R.useEffect(()=>{r.current.innerHTML=HTML;return start()},[]);return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:CSS}),e.jsx("div",{ref:r,className:"lvA","data-gx-hide":"1"})]})}
