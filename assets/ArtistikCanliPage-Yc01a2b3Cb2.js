import"./i18n-Tr01a2b3Cb2.js";import{j as e,d as db}from"./main-C2LpyYUGCb2.js";import{r as R}from"./vendor-react-Cxw6bqwhCb2.js";import{k as ref,o as onValue,v as set,j as push,x as onChildAdded}from"./vendor-firebase-940mxgRVCb2.js";import{isIntl,sporcuUlke,bayrakUrl,katEN}from"./intl-Ul01a2b3Cb2.js";import{artImg as __artImg}from"./ritmikAlet-Ra01a2b3Cb2.js";import"./modulepreload-polyfill-B5Qt9EMXCb2.js";
// ARTİSTİK CANLI SONUÇLAR — eski /yenicanli.html sayfasının uygulama içi sürümü (Olimpik 4 panel + flashcard, bireysel/takım klasman, Kamera A WebRTC alıcı).
// Uluslararası yarışmada bayrak + ülke kodu, takım = ülke; çıktı dili İngilizce ise metinler İngilizce.
const CSS=".lvY *,.lvY *::before,.lvY *::after{box-sizing:border-box;margin:0;padding:0}.lvY{--bg:#070b16;--panel:#111a2e;--panel2:#18233c;--line:#28344f;--txt:#eef3fb;--muted:#93a1c0;--accent:#6366f1;--go:#22c55e;--wait:#f59e0b;--flash:#0ea5e9;--gold:#fbbf24}.lvY,.lvY{height:100%}.lvY{font-family:'Plus Jakarta Sans',system-ui,sans-serif;background:radial-gradient(1200px 700px at 50% -10%,#132043,#070b16 60%);color:var(--txt);min-height:100vh;overflow:hidden}.lvY .topbar{position:fixed;top:0;left:0;right:0;z-index:30;background:rgba(7,11,22,.85);backdrop-filter:blur(12px);border-bottom:1px solid var(--line);padding:.55rem 1.1rem;display:flex;align-items:center;gap:1rem;flex-wrap:wrap}.lvY .brand{display:flex;align-items:center;gap:.55rem;font-weight:800;font-size:1.05rem;letter-spacing:.5px}.lvY .brand .material-icons-round{color:var(--flash)}.lvY .brand small{color:var(--muted);font-weight:700;font-size:.7rem;letter-spacing:1px}.lvY .selects{display:flex;gap:.55rem;flex-wrap:wrap;margin-left:auto;align-items:center}.lvY select{background:var(--panel2);color:var(--txt);border:1px solid var(--line);border-radius:10px;padding:.45rem .75rem;font:inherit;font-size:.82rem;font-weight:700;cursor:pointer;max-width:260px}.lvY select:focus{outline:2px solid var(--accent)}.lvY .mode-pill{display:flex;align-items:center;gap:.35rem;font-size:.72rem;font-weight:800;padding:.35rem .7rem;border-radius:999px;letter-spacing:.5px}.lvY .mode-live{background:rgba(34,197,94,.14);color:#86efac;border:1px solid rgba(34,197,94,.35)}.lvY .mode-standings{background:rgba(251,191,36,.14);color:#fcd34d;border:1px solid rgba(251,191,36,.35)}.lvY .mode-pill .dot{width:8px;height:8px;border-radius:50%;background:currentColor}.lvY .yc-toggle{display:flex;align-items:center;gap:.35rem;background:var(--accent);color:#fff;border:none;border-radius:10px;padding:.45rem .8rem;font:inherit;font-size:.82rem;font-weight:800;cursor:pointer}.lvY .yc-toggle:hover{filter:brightness(1.1)}.lvY .yc-toggle .material-icons-round{font-size:1.1rem}.lvY .cam-btn{background:var(--panel2);border:1px solid var(--line);color:var(--muted)}.lvY .cam-btn.on{background:var(--go);color:#fff;border-color:var(--go)}.lvY .cam-wrap{position:absolute;inset:0;background:#000;overflow:hidden;z-index:0}.lvY .cam-video{width:100%;height:100%;object-fit:cover;display:block}.lvY .panel.has-cam .panel-head{position:relative;z-index:2;background:rgba(7,11,22,.72);border-bottom-color:rgba(255,255,255,.15)}.lvY .panel.has-cam .panel-body{position:relative;z-index:2;justify-content:flex-end;background:linear-gradient(to top,rgba(7,11,22,.75),rgba(7,11,22,.05) 55%);text-shadow:0 2px 10px rgba(0,0,0,.95)}.lvY .panel.has-cam.is-flash .panel-body{background:rgba(7,11,22,.72)}.lvY .panel.has-cam .empty-panel{opacity:.85}.lvY .stage{position:fixed;top:52px;left:0;right:0;bottom:0;padding:.9rem}.lvY .grid{display:grid;gap:.9rem;height:100%}.lvY .grid.g4{grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr}.lvY .grid.g2{grid-template-columns:1fr 1fr;grid-template-rows:1fr}.lvY .grid.g6{grid-template-columns:1fr 1fr 1fr;grid-template-rows:1fr 1fr}.lvY .grid.g1{grid-template-columns:1fr}.lvY .grid.g3{grid-template-columns:1fr 1fr 1fr}.lvY .panel{position:relative;background:linear-gradient(160deg,var(--panel),#0d1526);border:1px solid var(--line);border-radius:20px;overflow:hidden;display:flex;flex-direction:column;min-height:0}.lvY .panel-head{position:relative;display:flex;align-items:center;justify-content:center;gap:.6rem;padding:.75rem 1rem;min-height:66px;border-bottom:1px solid var(--line);background:rgba(255,255,255,.02)}.lvY .panel-head img{position:absolute;left:.9rem;top:50%;transform:translateY(-50%);width:54px;height:54px;object-fit:contain;filter:drop-shadow(0 2px 4px rgba(0,0,0,.4))}.lvY .panel-head .ap-name{font-weight:800;font-size:clamp(1.6rem,2.7vw,2.6rem);letter-spacing:1.5px;text-transform:uppercase;text-align:center}.lvY .panel-head .ap-abbr{position:absolute;right:1rem;top:50%;transform:translateY(-50%);font-weight:800;font-size:.82rem;color:var(--muted);background:var(--panel2);padding:.22rem .6rem;border-radius:8px;border:1px solid var(--line)}.lvY .panel-body{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:1rem;min-height:0}.lvY .state-badge{display:inline-flex;align-items:center;gap:.4rem;font-weight:800;font-size:.78rem;letter-spacing:1px;padding:.3rem .8rem;border-radius:999px;margin-bottom:.9rem}.lvY .sb-go{background:rgba(34,197,94,.16);color:#86efac;border:1px solid rgba(34,197,94,.4)}.lvY .sb-wait{background:rgba(245,158,11,.16);color:#fcd34d;border:1px solid rgba(245,158,11,.4)}.lvY .sb-fall{background:rgba(239,68,68,.16);color:#fca5a5;border:1px solid rgba(239,68,68,.4)}.lvY .ath-name{font-weight:800;font-size:clamp(1.4rem,2.6vw,2.4rem);line-height:1.1;margin-bottom:.4rem}.lvY .ath-club{color:var(--muted);font-weight:700;font-size:clamp(.85rem,1.4vw,1.1rem)}.lvY .empty-panel{color:var(--muted);opacity:.5;font-weight:700;display:flex;flex-direction:column;align-items:center;gap:.6rem}.lvY .empty-panel .material-icons-round{font-size:2.4rem}.lvY .panel.is-flash{border-color:rgba(14,165,233,.6);box-shadow:0 0 0 1px rgba(14,165,233,.35),0 0 40px rgba(14,165,233,.15) inset}.lvY .flash-wrap{width:100%}.lvY .flash-name{font-weight:800;font-size:clamp(1.3rem,2.4vw,2.1rem);line-height:1.1}.lvY .flash-club{color:var(--muted);font-weight:700;font-size:clamp(.8rem,1.3vw,1rem);margin-top:.2rem;margin-bottom:.9rem}.lvY .flash-total{font-weight:800;font-variant-numeric:tabular-nums;font-size:clamp(2.6rem,6vw,5rem);line-height:1;color:#fff;text-shadow:0 0 30px rgba(14,165,233,.5)}.lvY .flash-de{display:flex;gap:1.9rem;justify-content:center;margin-top:1rem}.lvY .flash-de .cell{display:flex;flex-direction:column;align-items:center;min-width:56px}.lvY .flash-de .k{font-size:.92rem;font-weight:800;color:var(--muted);letter-spacing:1.5px}.lvY .flash-de .v{font-size:clamp(1.5rem,2.7vw,2.3rem);font-weight:800;font-variant-numeric:tabular-nums;margin-top:.15rem}.lvY .flash-de .cell.pen .v{color:#fca5a5}.lvY .flash-tag{display:inline-block;margin-top:.7rem;font-weight:800;font-size:.75rem;letter-spacing:1px;padding:.25rem .7rem;border-radius:8px;background:rgba(14,165,233,.16);color:#7dd3fc;border:1px solid rgba(14,165,233,.4)}.lvY .badge-dns{background:rgba(148,163,184,.16);color:#cbd5e1;border-color:rgba(148,163,184,.4)}.lvY .badge-inv{background:rgba(239,68,68,.16);color:#fca5a5;border-color:rgba(239,68,68,.4)}.lvY .standings{height:100%;display:flex;flex-direction:column;background:linear-gradient(160deg,var(--panel),#0d1526);border:1px solid var(--line);border-radius:20px;overflow:hidden}.lvY .st-head{display:flex;align-items:center;gap:.8rem;padding:.8rem 1.3rem;border-bottom:1px solid var(--line)}.lvY .st-head .material-icons-round{color:var(--gold)}.lvY .st-head h2{font-size:1.3rem;font-weight:800;letter-spacing:.5px}.lvY .st-head .cat{margin-left:auto;color:var(--muted);font-weight:700}.lvY .st-tabs{display:flex;gap:.4rem;margin-left:1rem}.lvY .st-tab{background:var(--panel2);color:var(--muted);border:1px solid var(--line);border-radius:999px;padding:.35rem .9rem;font:inherit;font-weight:800;font-size:.8rem;cursor:pointer}.lvY .st-tab.active{background:var(--accent);color:#fff;border-color:var(--accent)}.lvY .st-tab:hover{filter:brightness(1.1)}.lvY .st-scroll{flex:1;overflow:hidden}.lvY table{width:100%;border-collapse:collapse;font-variant-numeric:tabular-nums}.lvY th,.lvY td{padding:.6rem .9rem;text-align:center}.lvY th{font-size:.72rem;font-weight:800;color:var(--muted);letter-spacing:.5px;text-transform:uppercase;border-bottom:1px solid var(--line);position:sticky;top:0;background:#0d1526}.lvY td{border-bottom:1px solid rgba(40,52,79,.5);font-weight:700}.lvY .st-rank{font-weight:800;width:52px}.lvY .st-rank.r1{color:var(--gold)}.lvY .st-rank.r2{color:#cbd5e1}.lvY .st-rank.r3{color:#d19a66}.lvY .st-name{text-align:left;font-weight:800;font-size:1rem}.lvY .st-club{text-align:left;color:var(--muted);font-weight:700;font-size:.8rem}.lvY .st-total{font-weight:800;font-size:1.15rem;color:#7dd3fc}.lvY tbody tr:nth-child(odd){background:rgba(255,255,255,.015)}.lvY .notice{position:fixed;inset:0;display:flex;align-items:center;justify-content:center;color:var(--muted);font-weight:700;font-size:1.1rem;text-align:center;padding:2rem}.lvY .hidden{display:none!important}.lvY{position:fixed;inset:0;z-index:60;overflow:hidden}.lvY .gx-fl{width:1.25em;height:.94em;object-fit:cover;border-radius:2px;vertical-align:-.1em;margin-right:.4em;box-shadow:0 0 0 1px rgba(255,255,255,.25)}";
const HTML="<div class=\"topbar\">\n  <div class=\"brand\"><img src=\"/brand/gymnaxis-logo-beyaz.svg\" alt=\"Gymexa Score\" style=\"height:24px;margin-right:.3rem\"><span class=\"material-icons-round\">stadium</span> <span>CANLI SONUÇLAR</span></div>\n  <div class=\"selects\">\n    <button id=\"camToggle\" class=\"yc-toggle cam-btn\" title=\"Kamera A aç/kapat\"><span class=\"material-icons-round\">videocam</span> Kamera A</button>\n    <button id=\"ycToggle\" class=\"yc-toggle\" title=\"Görünümü değiştir (Panel ↔ Sonuçlar)\"><span class=\"material-icons-round\">swap_horiz</span> Görünüm</button>\n    <span id=\"modePill\" class=\"mode-pill mode-live\"><span class=\"dot\"></span> <span id=\"modeText\">CANLI</span></span>\n    <select id=\"compSelect\"><option value=\"\">Yarışma yükleniyor…</option></select>\n    <select id=\"catSelect\"><option value=\"\">Önce yarışma</option></select>\n  </div>\n</div>\n<div class=\"stage\">\n  <div id=\"panelsView\" class=\"grid g4\"></div>\n  <div id=\"standingsView\" class=\"standings hidden\"></div>\n  <div id=\"notice\" class=\"notice\">Yarışma ve kategori seçin</div>\n</div>";
function start(){const __iv=[];

const FB = "competitions";
const IDLE_MS = (parseFloat(new URLSearchParams(location.search).get("idle")) || 300) * 1000; // varsayılan 5 dk; ?idle=saniye ile ayarlanır

const ALET_TR = { yer:"Yer", atlama:"Atlama", asimetrik:"Asimetrik P.", denge:"Denge", halka:"Halka", kulplu:"Kulplu", paralel:"Paralel", barfiks:"Barfiks", mantar:"Mantar", sirik:"Sırık", serbest:"Serbest" };
const ALET_ABBR = { yer:"FX", atlama:"VT", asimetrik:"UB", denge:"BB", halka:"SR", kulplu:"PH", paralel:"PB", barfiks:"HB", mantar:"MH", sirik:"PV", serbest:"FX" };
const OLYMP_W = ["atlama","asimetrik","denge","yer","serbest"];
const OLYMP_M = ["yer","kulplu","mantar","halka","atlama","paralel","barfiks","sirik"];
const isKiz = c => /k[iı]z|kad/i.test(String(c||""));
const olympOrder = cat => {
  const O = isKiz(cat) ? OLYMP_W : OLYMP_M;
  return (a,b) => { const i=O.indexOf(a), j=O.indexOf(b); return (i<0?99:i)-(j<0?99:j); };
};
const $ = id => document.getElementById(id);
const esc = s => String(s==null?"":s).replace(/</g,"&lt;");
const num = (v,d=3) => { const n=Number(v); return isNaN(n)?"—":n.toFixed(d); }; // sabit ondalık — Scoreboard ile aynı format (D:2, E:3, Toplam:3)

let comps = {}, comp = "", cat = "";
let boardData = {}, puanData = {}, sporcuData = {}, aletler = [];
let subs = [];
let lastActivity = Date.now();
let lastSnap = "";
let lastMode = null;
let lastPanelsHTML = "", lastStandingsHTML = "";
let ycOverride = null; // null=oto (5dk), "panels", "standings"
let ycViewRef = null;
const params = new URLSearchParams(location.search);

function clearSubs(){ subs.forEach(u=>{try{u()}catch(e){}}); subs=[]; }

// ---- yarışma listesi ----
const __u0=onValue(ref(db, FB), s => {
  comps = s.val() || {};
  const es = Object.entries(comps).filter(([id,c])=>c&&c.kategoriler&&!c.arsivli)
    .sort((a,b)=>(b[1].baslangicTarihi||"").localeCompare(a[1].baslangicTarihi||""));
  const sel=$("compSelect");
  sel.innerHTML='<option value="">— Yarışma seçin —</option>'+es.map(([id,c])=>`<option value="${id}">${esc(c.isim||c.ad||id)}</option>`).join("");
  const urlC = params.get("comp");
  let want = comp || urlC || localStorage.getItem("ycs_comp") || "";
  // arşivli/geçersiz hatırlanan yarışmayı seçme (URL ile açıkça istenmediyse); en yeni AKTİF yarışmaya düş
  if(!(want && comps[want] && (want===urlC || !comps[want].arsivli))) want = es.length ? es[0][0] : "";
  if(want && comps[want]){ sel.value=want; if(want!==comp){ comp=want; try{localStorage.setItem("ycs_comp",comp)}catch(e){} fillCats(); } }
});

$("compSelect").addEventListener("change", e=>{ comp=e.target.value; localStorage.setItem("ycs_comp",comp); cat=""; fillCats(); });
$("catSelect").addEventListener("change", e=>{ cat=e.target.value; localStorage.setItem("ycs_cat",cat); subscribe(); });

function fillCats(){
  const cats = comp&&comps[comp]?.kategoriler ? comps[comp].kategoriler : {};
  $("catSelect").innerHTML='<option value="">— Kategori seçin —</option>'+Object.entries(cats).map(([k,v])=>`<option value="${k}">${esc(v.name||v.ad||k)}</option>`).join("");
  let want = cat || params.get("cat") || localStorage.getItem("ycs_cat") || "";
  // hatırlanan kategori bu yarışmada yoksa ilk kategoriye düş
  if(!(want && cats[want])) want = Object.keys(cats)[0] || "";
  if(want && cats[want]){ $("catSelect").value=want; cat=want; try{localStorage.setItem("ycs_cat",cat)}catch(e){} subscribe(); }
  else { cat=""; clearSubs(); render(); }
}

function subscribe(){
  clearSubs();
  stopAllCams();
  boardData={}; puanData={}; sporcuData={};
  if(!comp||!cat){ render(); return; }
  let al = comps[comp]?.kategoriler?.[cat]?.aletler || [];
  if(!Array.isArray(al)) al = Object.keys(al||{});
  aletler = al.filter(a=>a&&a!=="metadata").sort(olympOrder(cat));
  lastActivity = Date.now(); lastSnap="";
  const bRef = ref(db, `${FB}/${comp}/board/${cat}`);
  const pRef = ref(db, `${FB}/${comp}/puanlar/${cat}`);
  const sRef = ref(db, `${FB}/${comp}/sporcular/${cat}`);
  ycViewRef = ref(db, `${FB}/${comp}/broadcast/ycView`);
  const ub = onValue(bRef, s=>{ boardData=s.val()||{}; detectActivity(); render(); });
  const up = onValue(pRef, s=>{ puanData=s.val()||{}; render(); });
  const us = onValue(sRef, s=>{ sporcuData=s.val()||{}; render(); });
  const uy = onValue(ycViewRef, s=>{ const v=s.val(); ycOverride=(v==="panels"||v==="standings"||v==="team")?v:null; render(); });
  subs=[ub,up,us,uy];
  render();
}

// etkin görünüm: uzaktan override varsa o, yoksa 5dk boşta bireysel klasman
function effectiveView(){
  if(ycOverride==="panels") return "panels";
  if(ycOverride==="standings") return "standings";
  if(ycOverride==="team") return "team";
  return (Date.now()-lastActivity > IDLE_MS) ? "standings" : "panels";
}
function teamK(){ const c=(cat||"").toLowerCase(); return (c.includes("yild")||c.includes("yıld")||c.includes("genc")||c.includes("genç"))?2:3; }
function tabsHTML(active){
  return `<div class="st-tabs"><button class="st-tab ${active==='standings'?'active':''}" data-view="standings">Bireysel</button><button class="st-tab ${active==='team'?'active':''}" data-view="team">Takım</button></div>`;
}

// board state/athId değişince aktivite say (çağır veya not girişi)
function detectActivity(){
  const snap = aletler.map(a=>{ const b=boardData[a]||{}; return `${a}:${b.state||"-"}:${b.athId||"-"}`; }).join("|");
  if(snap!==lastSnap){ lastSnap=snap; lastActivity=Date.now(); }
}

const INTL=()=>isIntl(comps[comp]);const EN=()=>INTL()&&comps[comp]?.ciktiDili!=="tr";const T=(tr,en)=>EN()?en:tr;
const flag=k=>{const u=k&&bayrakUrl(k);return u?`<img class="gx-fl" src="${u}" alt="">`:""};
function athClubH(alet,id){const sp=sporcuData[id],c=athClub(alet,id);if(INTL()&&sp){const u=sporcuUlke(sp,comps[comp]);return `${flag(u)}${esc(u)}${c&&c!==u?" · "+esc(c):""}`}return esc(c)}
const catNm=()=>{const n=comps[comp]?.kategoriler?.[cat]?.name||cat;return EN()?katEN(n):n};
function athName(alet, id){
  const sp = sporcuData[id];
  if(sp) return (sp.adSoyad || ((sp.ad||"")+" "+(sp.soyad||"")).trim() || id);
  return (boardData[alet]?.athName) || id;
}
function athClub(alet, id){
  const sp = sporcuData[id];
  return (sp?.kulup || sp?.okul || boardData[alet]?.athClub || "");
}

// ---- KAMERA A (WebRTC alıcı — BroadcastGrid ile aynı sinyalleşme) ----
const ICE=[{urls:"stun:stun.l.google.com:19302"},{urls:"stun:stun1.l.google.com:19302"},{urls:"turn:openrelay.metered.ca:80",username:"openrelayproject",credential:"openrelayproject"},{urls:"turn:openrelay.metered.ca:443",username:"openrelayproject",credential:"openrelayproject"},{urls:"turn:openrelay.metered.ca:443?transport=tcp",username:"openrelayproject",credential:"openrelayproject"}];
let camOn=false;
const cams={}; // alet -> {video, pc, offUnsub, candUnsub}
function camVideo(alet){
  if(!cams[alet]) cams[alet]={};
  if(!cams[alet].video){
    const v=document.createElement("video");
    v.autoplay=!0; v.playsInline=!0; v.muted=!0; v.className="cam-video";
    cams[alet].video=v;
  }
  return cams[alet].video;
}
function startCam(alet){
  const c=cams[alet]||{}; cams[alet]=c;
  if(c.offUnsub||!comp||!cat) return; // zaten bağlı
  const base=`${FB}/${comp}/broadcast/webrtc/${cat}/${alet}/a`;
  const video=camVideo(alet);
  set(ref(db,`${base}/viewerEpoch`),Date.now()).catch(()=>{});
  let pc=null;
  c.offUnsub = onValue(ref(db,`${base}/offer`), async snap=>{
    if(c.candUnsub){ c.candUnsub(); c.candUnsub=null; }
    if(pc){ try{pc.close()}catch(e){} pc=null; c.pc=null; }
    if(video) video.srcObject=null;
    if(!snap.exists()) return;
    pc=new RTCPeerConnection({iceServers:ICE}); c.pc=pc;
    pc.ontrack=e=>{ if(e.streams&&e.streams[0]) video.srcObject=e.streams[0]; };
    pc.onicecandidate=e=>{ if(e.candidate) push(ref(db,`${base}/answerCandidates`), e.candidate.toJSON()).catch(()=>{}); };
    try{
      await pc.setRemoteDescription(new RTCSessionDescription(snap.val()));
      const ans=await pc.createAnswer();
      await pc.setLocalDescription(ans);
      await set(ref(db,`${base}/answer`),{sdp:ans.sdp,type:ans.type});
    }catch(e){ return; }
    c.candUnsub = onChildAdded(ref(db,`${base}/offerCandidates`), async s=>{ try{ await pc.addIceCandidate(new RTCIceCandidate(s.val())); }catch(e){} });
  });
}
function stopCam(alet){
  const c=cams[alet]; if(!c) return;
  try{ c.offUnsub&&c.offUnsub(); }catch(e){}
  try{ c.candUnsub&&c.candUnsub(); }catch(e){}
  try{ c.pc&&c.pc.close(); }catch(e){}
  if(c.video){ c.video.srcObject=null; if(c.video.parentNode) c.video.parentNode.removeChild(c.video); }
  delete cams[alet];
}
function stopAllCams(){ Object.keys(cams).forEach(stopCam); }
function attachCams(){
  if(!camOn) return;
  aletler.forEach(alet=>{
    startCam(alet);
    const slot=document.querySelector(`.cam-wrap[data-cam-alet="${alet}"]`);
    const v=camVideo(alet);
    if(slot && v.parentNode!==slot) slot.appendChild(v);
  });
}

function panelHTML(alet){
  const b = boardData[alet] || {};
  const st = b.state;
  const name = EN()?katEN(ALET_TR[alet]||alet):(ALET_TR[alet]||alet), abbr = ALET_ABBR[alet]||"";
  const logo = `<img src="${__artImg(alet,cat)||"/apparatus/"+alet+".png"}" alt="" style="background:#fff;border-radius:50%;padding:3px;box-sizing:border-box" onerror="this.style.display='none'">`;
  const head = `<div class="panel-head">${logo}<span class="ap-name">${esc(name)}</span><span class="ap-abbr">${abbr}</span></div>`;

  let body="", isFlash=false;

  // NOT İLAN EDİLDİ → flashcard
  if(st==="scored" && b.athId){
    const p = (puanData[alet]||{})[b.athId] || {};
    const dns = p.yarismadi || p.durum==="yarishmadi" || p.durum==="yarismadi";
    const inv = p.gecersiz || p.durum==="gecersiz";
    const nm = esc(athName(alet,b.athId)), cl = athClubH(alet,b.athId);
    isFlash=true;
    if(dns){
      body = `<div class="flash-wrap"><div class="flash-name">${nm}</div><div class="flash-club">${cl}</div><span class="flash-tag badge-dns">${T("YARIŞMADI","DNS")}</span></div>`;
    } else if(inv){
      body = `<div class="flash-wrap"><div class="flash-name">${nm}</div><div class="flash-club">${cl}</div><span class="flash-tag badge-inv">${T("GEÇERSİZ","DSQ")}</span></div>`;
    } else {
      const d = p.calc_D ?? p.dScore ?? b.dScore;
      // E = kesintiden sonra KALAN skor (uygulama: se = 10 - ort(kesinti)); calc_E bunu saklar
      let e = p.calc_E ?? p.eScore;
      if(e==null){ const ded=[p.e1,p.e2,p.e3,p.e4].map(Number).filter(v=>!isNaN(v)); if(ded.length) e=Math.max(0,10-ded.reduce((x,y)=>x+y,0)/ded.length); }
      if(e==null) e = b.eScore;
      const total = p.finalScore ?? p.sonuc ?? b.score;
      const pen = Math.max(0, (Number(d)||0) + (Number(e)||0) - (Number(total)||0));
      body = `<div class="flash-wrap">
        <div class="flash-name">${nm}</div><div class="flash-club">${cl}</div>
        <div class="flash-total">${num(total,3)}</div>
        <div class="flash-de">
          <div class="cell"><span class="k">D</span><span class="v">${num(d,2)}</span></div>
          <div class="cell"><span class="k">E</span><span class="v">${num(e,3)}</span></div>
          <div class="cell pen"><span class="k">P</span><span class="v">${pen>0.005?"−"+num(pen,2):"0.00"}</span></div>
        </div>
        <span class="flash-tag">${T("PUAN İLAN EDİLDİ","SCORE")}</span>
      </div>`;
    }
  } else if((st==="wait"||st==="go"||st==="fall"||st==="finishing") && (b.athId||b.athName)){
    // SPORCU ÇAĞRILDI / YARIŞIYOR → bilgi kartı
    const nm = esc(athName(alet,b.athId)||b.athName), cl = athClubH(alet,b.athId)||esc(b.athClub||"");
    let badge = `<span class="state-badge sb-wait">${T("SIRADA","NEXT")}</span>`;
    if(st==="go") badge=`<span class="state-badge sb-go">${T("YARIŞIYOR","PERFORMING")}</span>`;
    else if(st==="fall") badge=`<span class="state-badge sb-fall">${T("DÜŞME","FALL")}</span>`;
    else if(st==="finishing") badge=`<span class="state-badge sb-wait">${T("PUAN BEKLENİYOR","AWAITING SCORE")}</span>`;
    body = `${badge}<div class="ath-name">${nm}</div><div class="ath-club">${cl}</div>`;
  } else {
    // BOŞ
    body = `<div class="empty-panel"><span class="material-icons-round">hourglass_empty</span>${T("Bekleniyor","Waiting")}</div>`;
  }
  const camWrap = camOn ? `<div class="cam-wrap" data-cam-alet="${esc(alet)}"></div>` : "";
  return `<div class="panel${isFlash?' is-flash':''}${camOn?' has-cam':''}">${camWrap}${head}<div class="panel-body">${body}</div></div>`;
}

// ---- GENEL KLASMAN ----
function computeStandings(){
  const rows = {};
  const add = (id) => { if(!rows[id]) rows[id]={id,total:0,scores:{}}; return rows[id]; };
  aletler.forEach(alet=>{
    const ap = puanData[alet]||{};
    Object.entries(ap).forEach(([id,p])=>{
      if(!p||typeof p!=="object"||id==="ePanel") return;
      const done = p.durum==="tamamlandi" || p.finalScore!=null || p.sonuc!=null;
      if(!done) return;
      const fs = Number(p.finalScore ?? p.sonuc ?? 0)||0;
      const r = add(id); r.scores[alet]=fs; r.total+=fs;
    });
  });
  return Object.values(rows).sort((a,b)=>b.total-a.total);
}

function standingsHTML(){
  const rows = computeStandings();
  const catName = comps[comp]?.kategoriler?.[cat]?.name || cat;
  const head = `<div class="st-head"><span class="material-icons-round">emoji_events</span><h2>${T("BİREYSEL KLASMAN","ALL-AROUND")}</h2>${tabsHTML("standings")}<span class="cat">${esc(catNm())}</span></div>`;
  if(!rows.length) return head+`<div class="notice" style="position:static;height:auto;padding:3rem">${T("Henüz tamamlanmış puan yok","No completed scores yet")}</div>`;
  const cols = aletler.map(a=>`<th>${ALET_ABBR[a]||ALET_TR[a]||a}</th>`).join("");
  const body = rows.map((r,i)=>{
    const rk = i+1;
    const sc = aletler.map(a=>`<td>${r.scores[a]!=null?num(r.scores[a],3):"—"}</td>`).join("");
    return `<tr>
      <td class="st-rank ${rk<=3?'r'+rk:''}">${rk}</td>
      <td class="st-name">${esc(athName(aletler[0],r.id))}</td>
      <td class="st-club">${athClubH(aletler[0],r.id)}</td>
      ${sc}
      <td class="st-total">${num(r.total,3)}</td>
    </tr>`;
  }).join("");
  return head+`<div class="st-scroll"><table><thead><tr><th>#</th><th style="text-align:left">${T("Sporcu","Gymnast")}</th><th style="text-align:left">${INTL()?"NOC":T("Kulüp","Club")}</th>${cols}<th>${T("Toplam","Total")}</th></tr></thead><tbody>${body}</tbody></table></div>`;
}

// ---- TAKIM KLASMANI ----
function computeTeamStandings(){
  const teams = {};
  const anyTeam = Object.values(sporcuData).some(a=>a&&/tak[iı]m/i.test(String(a.yarismaTuru||a.katilimTuru||"")));
  Object.entries(sporcuData).forEach(([id,a])=>{
    if(!a||typeof a!=="object") return;
    if(anyTeam){ const t=String(a.yarismaTuru||a.katilimTuru||"").toLowerCase(); if(t!=="takim"&&t!=="takım") return; }
    const club = INTL()?sporcuUlke(a,comps[comp]):(a.okul||a.kulup); if(!club) return;
    (teams[club]||(teams[club]=[])).push(id);
  });
  const u = teamK();
  const rows = [];
  Object.entries(teams).forEach(([club,ids])=>{
    let total=0; const appScores={};
    aletler.forEach(alet=>{
      const sc=[];
      ids.forEach(id=>{ const p=(puanData[alet]||{})[id]; const v=p?(p.finalScore??p.sonuc):null; if(v!=null&&Number(v)>0) sc.push(Number(v)); });
      sc.sort((a,b)=>b-a);
      const top=sc.slice(0,u).reduce((a,b)=>a+b,0);
      appScores[alet]=top; total+=top;
    });
    rows.push({club, total, appScores, memberCount:ids.length});
  });
  return rows.filter(r=>r.total>0).sort((a,b)=>b.total-a.total);
}

function teamStandingsHTML(){
  const rows = computeTeamStandings();
  const catName = comps[comp]?.kategoriler?.[cat]?.name || cat;
  const u = teamK();
  const head = `<div class="st-head"><span class="material-icons-round">groups</span><h2>${T("TAKIM KLASMANI",INTL()?"NATION RANKING":"TEAM RANKING")}</h2>${tabsHTML("team")}<span class="cat">${esc(catNm())} · ${EN()?"best "+u+" per apparatus":"alet başı en iyi "+u}</span></div>`;
  if(!rows.length) return head+`<div class="notice" style="position:static;height:auto;padding:3rem">${T("Henüz takım sonucu yok","No team results yet")}</div>`;
  const cols = aletler.map(a=>`<th>${ALET_ABBR[a]||ALET_TR[a]||a}</th>`).join("");
  const body = rows.map((r,i)=>{
    const rk = i+1;
    const sc = aletler.map(a=>`<td>${r.appScores[a]>0?num(r.appScores[a],3):"—"}</td>`).join("");
    return `<tr>
      <td class="st-rank ${rk<=3?'r'+rk:''}">${rk}</td>
      <td class="st-name">${INTL()?flag(r.club)+esc(r.club):esc(r.club)}</td>
      <td class="st-club">${r.memberCount} ${T("sporcu","gymnasts")}</td>
      ${sc}
      <td class="st-total">${num(r.total,3)}</td>
    </tr>`;
  }).join("");
  return head+`<div class="st-scroll"><table><thead><tr><th>#</th><th style="text-align:left">${INTL()?"NOC":T("Takım","Team")}</th><th style="text-align:left">${T("Sporcu","Gymnasts")}</th>${cols}<th>Toplam</th></tr></thead><tbody>${body}</tbody></table></div>`;
}

// ---- RENDER ----
function render(){
  const pv=$("panelsView"), sv=$("standingsView"), nt=$("notice");
  if(!comp||!cat){ pv.classList.add("hidden"); sv.classList.add("hidden"); nt.classList.remove("hidden"); nt.textContent=T("Yarışma ve kategori seçin","Select competition and category"); return; }
  try{const bb=document.querySelector(".lvY .brand span:last-child");bb&&(bb.textContent=EN()?"LIVE RESULTS":"CANLI SONUÇLAR");document.documentElement.lang=EN()?"en":(globalThis.__LANG?.()||"tr")}catch(e){}
  nt.classList.add("hidden");
  const view = effectiveView();
  if(view==="panels"){
    sv.classList.add("hidden"); pv.classList.remove("hidden");
    const n = aletler.length;
    pv.className = "grid " + (n<=1?"g1":n===2?"g2":n===3?"g3":n===4?"g4":"g6");
    const _h = aletler.map(panelHTML).join(""); if(_h!==lastPanelsHTML){ pv.innerHTML=_h; lastPanelsHTML=_h; }
    if(camOn) attachCams();
    $("modePill").className="mode-pill mode-live"; $("modeText").textContent = ycOverride==="panels"?T("CANLI (elle)","LIVE (manual)"):T("CANLI","LIVE");
  } else {
    pv.classList.add("hidden"); sv.classList.remove("hidden");
    const _s = view==="team" ? teamStandingsHTML() : standingsHTML();
    if(_s!==lastStandingsHTML){ sv.innerHTML=_s; lastStandingsHTML=_s; }
    $("modePill").className="mode-pill mode-standings"; $("modeText").textContent = view==="team" ? T("TAKIM","TEAM") : T("BİREYSEL","ALL-AROUND");
  }
  lastMode = view;
}

// Sekmeler (Bireysel/Takım) — tıklayınca ycView flag'ini yazar (tüm ekranlar senkron)
$("standingsView").addEventListener("click", e=>{
  const t = e.target.closest(".st-tab"); if(!t||!ycViewRef) return;
  set(ycViewRef, t.dataset.view).catch(()=>{});
});

// Kamera A aç/kapat — yerel (her ekran kendi kamerasını yönetir)
$("camToggle").addEventListener("click", ()=>{
  camOn=!camOn;
  $("camToggle").classList.toggle("on",camOn);
  if(!camOn) stopAllCams();
  lastPanelsHTML=""; // panelleri yeniden kur (cam-wrap ekle/çıkar)
  render();
});

// Uzaktan görünüm butonu — Panel → Bireysel → Takım → Panel (nerede açıksa tüm ekranlar geçer)
$("ycToggle").addEventListener("click", async ()=>{
  if(!ycViewRef) return;
  const order=["panels","standings","team"];
  const next=order[(order.indexOf(effectiveView())+1)%order.length];
  try{ await set(ycViewRef, next); }catch(e){}
});

// boşta kalma sayacı: SADECE etkin mod değişince yeniden çiz (her saniye DOM'u yenileyip yanıp söndürme)
__iv.push(setInterval(()=>{ if(!comp||!cat) return; const m=effectiveView(); if(m!==lastMode) render(); }, 1000));

return()=>{try{__u0()}catch(e){}clearSubs();stopAllCams();__iv.forEach(clearInterval);try{document.documentElement.lang=globalThis.__LANG?.()||"tr"}catch(e){}}}
export default function ArtistikCanliPage(){const r=R.useRef(null);R.useEffect(()=>{r.current.innerHTML=HTML;return start()},[]);return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:CSS}),e.jsx("div",{ref:r,className:"lvY","data-gx-hide":"1"})]})}
