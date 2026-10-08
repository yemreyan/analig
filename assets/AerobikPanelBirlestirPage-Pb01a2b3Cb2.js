import"./i18n-Tr01a2b3Cb2.js";import{j as e,d as db}from"./main-C2LpyYUGCb2.js";import{r as R}from"./vendor-react-Cxw6bqwhCb2.js";import{l as _fb_get,o as _fb_onValue,k as _fb_ref,v as _fb_set}from"./vendor-firebase-940mxgRVCb2.js";import"./modulepreload-polyfill-B5Qt9EMXCb2.js";
// AEROBİK PANEL BİRLEŞTİRİCİ — eski /aerobik-panel-birlestir.html sayfasının uygulama içi sürümü.
const CSS=".lvPB *,.lvPB *::before,.lvPB *::after{box-sizing:border-box;margin:0;padding:0}.lvPB{--bg:#0a0e1a;--panel:#131a2b;--panel2:#1b2438;--line:#2a3550;--txt:#e8edf7;--muted:#8b97b3;--accent:#6366f1;--ok:#22c55e;--gold:#fbbf24;--team:#0891b2}.lvPB{font-family:'Plus Jakarta Sans',system-ui,sans-serif;background:var(--bg);color:var(--txt);min-height:100vh}.lvPB .topbar{position:sticky;top:0;z-index:20;background:rgba(10,14,26,.92);backdrop-filter:blur(10px);border-bottom:1px solid var(--line);padding:.7rem 1rem;display:flex;align-items:center;gap:1rem;flex-wrap:wrap}.lvPB .brand{display:flex;align-items:center;gap:.55rem;font-weight:800;font-size:1.05rem}.lvPB .brand .material-icons-round{color:var(--team)}.lvPB .wrap{max-width:1000px;margin:0 auto;padding:1rem}.lvPB .panel{background:var(--panel);border:1px solid var(--line);border-radius:14px;padding:1rem;margin-bottom:1rem}.lvPB .row1{display:flex;gap:.6rem;flex-wrap:wrap;align-items:flex-end}.lvPB .fld{display:flex;flex-direction:column;gap:.25rem}.lvPB .fld label{font-size:.7rem;font-weight:800;color:var(--muted);text-transform:uppercase}.lvPB select,.lvPB input{font:inherit;font-weight:700;border-radius:9px;border:1px solid var(--line);background:var(--panel2);color:var(--txt);padding:.55rem .7rem;font-size:.9rem}.lvPB select{min-width:240px}.lvPB h3{font-size:.9rem;font-weight:800;margin:.2rem 0 .6rem;color:var(--muted);text-transform:uppercase;letter-spacing:.03em}.lvPB .cats{display:flex;flex-wrap:wrap;gap:.5rem}.lvPB .catchip{display:flex;align-items:center;gap:.45rem;background:var(--panel2);border:1px solid var(--line);border-radius:10px;padding:.5rem .8rem;cursor:pointer;font-weight:700;font-size:.88rem;user-select:none}.lvPB .catchip input{width:16px;height:16px;accent-color:var(--team)}.lvPB .catchip.on{border-color:var(--team);background:rgba(8,145,178,.15)}.lvPB .panels-sel{display:flex;gap:.5rem;flex-wrap:wrap;margin-top:.2rem}.lvPB .pchip{background:var(--panel2);border:1px solid var(--line);border-radius:999px;padding:.4rem .9rem;font-weight:800;font-size:.82rem;cursor:pointer;user-select:none}.lvPB .pchip.on{background:var(--team);border-color:var(--team);color:#fff}.lvPB .btn{display:inline-flex;align-items:center;gap:.4rem;padding:.6rem 1rem;border:none;cursor:pointer;color:#fff;background:var(--team);font-weight:800;font-size:.9rem;border-radius:10px;margin-top:.8rem}.lvPB .btn:disabled{opacity:.5;cursor:default}.lvPB .btn:hover:not(:disabled){filter:brightness(1.08)}.lvPB .hint{color:var(--muted);font-size:.8rem;font-weight:600;line-height:1.5;margin-top:.6rem}.lvPB .qrgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:1rem}.lvPB .qrcard{background:#fff;border-radius:12px;padding:1rem;text-align:center;color:#111}.lvPB .qrcard h4{font-size:1rem;font-weight:800;margin-bottom:.2rem}.lvPB .qrcard .sub{font-size:.72rem;color:#555;font-weight:700;margin-bottom:.6rem;word-break:break-word}.lvPB .qrcard canvas{margin:0 auto;display:block}.lvPB .qrcard .lnk{font-size:.62rem;color:#777;word-break:break-all;margin-top:.5rem;font-weight:600}.lvPB .qrcard .copy{margin-top:.5rem;font-size:.75rem;font-weight:800;color:var(--team);cursor:pointer;background:none;border:1px solid #ddd;border-radius:8px;padding:.3rem .6rem}.lvPB .notice{text-align:center;color:var(--muted);padding:2.5rem 1rem;font-weight:600}.lvPB .toast{position:fixed;bottom:1.2rem;left:50%;transform:translateX(-50%);background:var(--panel2);border:1px solid var(--line);color:var(--txt);padding:.7rem 1.1rem;border-radius:12px;font-weight:700;font-size:.9rem;box-shadow:0 10px 30px rgba(0,0,0,.4);opacity:0;transition:.25s;pointer-events:none;z-index:50}.lvPB .toast.show{opacity:1}.lvPB .toast.ok{border-color:var(--ok);color:#86efac}.lvPB .toast.err{border-color:#ef4444;color:#fca5a5}@media print{.lvPB .topbar,.lvPB .panel{display:none}.lvPB .qrcard{border:1px solid #ccc;break-inside:avoid}}.lvPB{position:fixed;inset:0;z-index:60;overflow:auto}";
const HTML="<div class=\"topbar\">\n  <div class=\"brand\"><span class=\"material-icons-round\">merge</span> Aerobik Panel Birleştirici</div>\n  <span style=\"margin-left:auto;color:var(--muted);font-weight:700;font-size:.82rem\">Seçili kategorileri tek panelde birleştir</span>\n</div>\n<div class=\"wrap\">\n  <div class=\"panel\">\n    <div class=\"row1\">\n      <div class=\"fld\"><label>Yarışma</label><select id=\"compSel\"><option value=\"\">Yarışma seçin…</option></select></div>\n    </div>\n    <div id=\"body\" style=\"display:none\">\n      <h3 style=\"margin-top:1rem\">Birleştirilecek Kategoriler</h3>\n      <div class=\"cats\" id=\"cats\"></div>\n      <div style=\"display:flex;gap:.5rem;margin-top:.5rem\">\n        <button class=\"pchip\" id=\"selAll\">Tümünü seç</button>\n        <button class=\"pchip\" id=\"selNone\">Temizle</button>\n      </div>\n      <h3 style=\"margin-top:1rem\">Panel Türleri</h3>\n      <div class=\"panels-sel\" id=\"panels\"></div>\n      <button class=\"btn\" id=\"genBtn\"><span class=\"material-icons-round\" style=\"font-size:18px\">qr_code_2</span> Birleşik QR Üret</button>\n      <button class=\"btn\" id=\"printBtn\" style=\"background:var(--panel2);border:1px solid var(--line)\"><span class=\"material-icons-round\" style=\"font-size:18px\">print</span> Yazdır</button>\n      <div class=\"hint\">Seçili kategoriler tek QR'da birleşir; hakem hangi kategoride sporcu çağrılırsa onu görür ve doğru kategoriye puanlar. A paneli için A1–A4 ayrı QR üretilir.</div>\n      <h3 style=\"margin-top:1.2rem\">📹 Kameralar (tüm yarışma için)</h3>\n      <div class=\"hint\" style=\"margin-top:0\">Kamera telefonuna okut. Sporcu çağrılınca otomatik kayda başlar, kaydedilince yükler. Kamera A → buluta yükler (skorlara eklenir); Kamera B → yedek (indirir).</div>\n      <div id=\"camGrid\" class=\"qrgrid\" style=\"margin-top:.7rem\"></div>\n      <h3 style=\"margin-top:1.2rem\">🏛️ Yönetim Ekranları</h3>\n      <div class=\"hint\" style=\"margin-top:0\">Üst Jüri → başhakem onaya gönderince A/E/D notlarını görür, Onayla/Geri Gönder. Teknik Kurul → tüm puanları canlı izler.</div>\n      <div id=\"mgmtGrid\" class=\"qrgrid\" style=\"margin-top:.7rem\"></div>\n    </div>\n  </div>\n  <div id=\"out\" class=\"qrgrid\"></div>\n</div>\n<div id=\"toast\" class=\"toast\"></div>";
const EXT=["https://cdn.jsdelivr.net/npm/qrcodejs@1.0.0/qrcode.min.js"];
const __ld=s=>new Promise(r=>{if(document.querySelector(`script[data-gx-src="${s}"]`))return r();const t=document.createElement("script");t.src=s;t.setAttribute("data-gx-src",s);t.onload=()=>r();t.onerror=()=>r();document.head.appendChild(t)});
async function start(__alive){for(const s of EXT)await __ld(s);if(!__alive())return()=>{};const __subs=[],__iv=[],__to=[];const setInterval=(...a)=>{const i=window.setInterval(...a);__iv.push(i);return i};const setTimeout=(...a)=>{const i=window.setTimeout(...a);__to.push(i);return i};const get=_fb_get;const onValue=(...a)=>{const u=_fb_onValue(...a);typeof u==="function"&&__subs.push(u);return u};const ref=_fb_ref;const set=_fb_set;



const BASE="aerobik_yarismalar";
const $=id=>document.getElementById(id);
const esc=s=>String(s==null?"":s).replace(/[<&>]/g,c=>({"<":"&lt;",">":"&gt;","&":"&amp;"}[c]));
function toast(m,t){const e=$("toast");e.textContent=m;e.className="toast show "+(t||"");setTimeout(()=>e.className="toast",2600);}
const KATLBL={kiz:"Kız",erkek:"Erkek",cift:"Karışık İkili",trio:"Trio",grup:"Grup",dans:"Aerobik Dans"};
const AGE={minik:"Minik",kucuk:"Küçük",yildiz:"Yıldız",genc:"Genç",buyuk:"Büyük"};
function catLabel(cat,def){if(def&&def.name)return def.name;if(/^step_/.test(cat))return "Step "+(AGE[cat.split("_")[1]]||"");const p=cat.split("_");return (AGE[p[0]]||p[0])+" "+(KATLBL[p.slice(1).join("_")]||p.slice(1).join("_"));}
// panel türleri
const PANELS=[
  {key:"a",label:"A (Artistik A1–A4)",route:"apanel",multi:["a1","a2","a3","a4"]},
  {key:"e",label:"E (Uygulama E1–E4)",route:"epanel",multi:["e1","e2","e3","e4"]},
  {key:"d",label:"D (Zorluk)",route:"dpanel"},
  {key:"l",label:"L (Çizgi)",route:"lpanel"},
  {key:"t",label:"T (Süre)",route:"tpanel"},
];
let comps={}, comp="", token="", selPanels=new Set(PANELS.map(p=>p.key));

onValue(ref(db,BASE),s=>{
  comps=s.val()||{};
  const opts=Object.entries(comps).filter(([id,c])=>c&&typeof c==="object").sort((a,b)=>(b[1].baslangicTarihi||"").localeCompare(a[1].baslangicTarihi||""));
  $("compSel").innerHTML='<option value="">Yarışma seçin…</option>'+opts.map(([id,c])=>`<option value="${id}">${esc(c.isim||c.ad||id)}</option>`).join("");
  if(comp&&comps[comp])$("compSel").value=comp;
});

// panel chip'leri
$("panels").innerHTML=PANELS.map(p=>`<span class="pchip on" data-p="${p.key}">${esc(p.label)}</span>`).join("");
$("panels").querySelectorAll("[data-p]").forEach(el=>el.onclick=()=>{const k=el.dataset.p;if(selPanels.has(k)){selPanels.delete(k);el.classList.remove("on");}else{selPanels.add(k);el.classList.add("on");}});

$("compSel").addEventListener("change",async e=>{
  comp=e.target.value; $("out").innerHTML="";
  if(!comp){$("body").style.display="none";return;}
  // token al / yoksa üret
  const tSnap=await get(ref(db,`${BASE}/${comp}/epanelToken`));
  token=tSnap.val();
  if(!token){token=Array.from(crypto.getRandomValues(new Uint8Array(16))).map(b=>b.toString(16).padStart(2,"0")).join("");await set(ref(db,`${BASE}/${comp}/epanelToken`),token);}
  // kategoriler
  const kats=comps[comp].kategoriler||{};
  const keys=Object.keys(kats);
  $("cats").innerHTML=keys.map(k=>`<label class="catchip"><input type="checkbox" value="${k}"><span>${esc(catLabel(k,kats[k]))}</span></label>`).join("")||'<span class="hint">Bu yarışmada kategori yok.</span>';
  $("cats").querySelectorAll(".catchip").forEach(l=>{l.querySelector("input").onchange=()=>{l.classList.toggle("on",l.querySelector("input").checked);renderCameras();};});
  $("body").style.display="";
  renderCameras();
  renderMgmt();
});
function renderMgmt(){
  const sjUrl=pt=>`${location.origin}/aerobic/sjpanel?competitionId=${encodeURIComponent(comp)}&catId=__ALL__&panelType=${pt}&token=${token}`;
  const mgs=[{full:location.origin+"/aerobic/superior-jury?competitionId="+encodeURIComponent(comp)+"&token="+token,t:"🏛️ Üst Jüri",d:"Çoklu onay + hedefli red notu"},{full:location.origin+"/aerobic/technical-committee?competitionId="+encodeURIComponent(comp)+"&token="+token,t:"👥 Teknik Kurul",d:"Sıralama & detay"},{full:location.origin+"/aerobic/inquiry?competitionId="+encodeURIComponent(comp)+"&token="+token,t:"🚩 İtiraz Ekranı",d:"Biten sporcu 10 dk · D/A/E itiraz → Üst Jüri"},{f:"aerobik/canli",t:"📺 Canlı Skor",d:"Flashcard + sıralama (seyirci)"},{full:sjUrl("sja"),t:"⚖️ SJA (Süper Jüri)",d:"Artistik — fark>0.5 panele uyarı"},{full:sjUrl("sje"),t:"⚖️ SJE (Süper Jüri)",d:"Uygulama — fark>0.5 panele uyarı"},{full:sjUrl("sjd"),t:"⚖️ SJD (Süper Jüri)",d:"Zorluk — fark>0.5 panele uyarı"}];
  const mgUrl=c=>c.full?c.full:`${location.origin}/${c.f}${c.f.includes("?")?"&":"?"}compId=${encodeURIComponent(comp)}`;
  $("mgmtGrid").innerHTML=mgs.map((c,i)=>{
    return `<div class="qrcard"><h4>${c.t}</h4><div class="sub">${c.d}</div><div id="mg${i}" style="display:flex;justify-content:center"></div><div class="copy" data-u="${esc(mgUrl(c))}">Linki Kopyala</div></div>`;
  }).join("");
  mgs.forEach((c,i)=>{try{new QRCode($("mg"+i),{text:mgUrl(c),width:170,height:170,correctLevel:QRCode.CorrectLevel.M});}catch(e){console.error(e);}});
  $("mgmtGrid").querySelectorAll(".copy").forEach(el=>el.onclick=()=>{navigator.clipboard.writeText(el.dataset.u);toast(__T("Link kopyalandı ✓"),"ok");});
}
function renderCameras(){
  const cams=[{cam:"a",t:"📹 Kamera A",d:"Buluta yükler (skorlara eklenir)"},{cam:"b",t:"📹 Kamera B",d:"Yedek (indirir)"}];
  const _cc=selectedCats(),_cq=_cc.length?("&catId="+encodeURIComponent(_cc.join(","))):"",_cl=_cc.length?(" · "+_cc.length+" kategori (seçili)"):" · tüm kategoriler";
  $("camGrid").innerHTML=cams.map((c,i)=>{
    const url=`${location.origin}/aerobic/camera?compId=${encodeURIComponent(comp)}&cam=${c.cam}${_cq}`;
    return `<div class="qrcard"><h4>${c.t}</h4><div class="sub">${c.d}${_cl}</div><div id="cam${i}" style="display:flex;justify-content:center"></div><div class="copy" data-u="${esc(url)}">Linki Kopyala</div></div>`;
  }).join("");
  cams.forEach((c,i)=>{const url=`${location.origin}/aerobic/camera?compId=${encodeURIComponent(comp)}&cam=${c.cam}${_cq}`;try{new QRCode($("cam"+i),{text:url,width:170,height:170,correctLevel:QRCode.CorrectLevel.M});}catch(e){console.error(e);}});
  $("camGrid").querySelectorAll(".copy").forEach(el=>el.onclick=()=>{navigator.clipboard.writeText(el.dataset.u);toast(__T("Kamera linki kopyalandı ✓"),"ok");});
}
$("selAll").onclick=()=>$("cats").querySelectorAll("input").forEach(i=>{i.checked=true;i.dispatchEvent(new Event("change"));});
$("selNone").onclick=()=>$("cats").querySelectorAll("input").forEach(i=>{i.checked=false;i.dispatchEvent(new Event("change"));});

function selectedCats(){return [...$("cats").querySelectorAll("input:checked")].map(i=>i.value);}
function buildUrl(route,catId,panelId){
  let u=`${location.origin}/aerobic/${route}?competitionId=${encodeURIComponent(comp)}&catId=${encodeURIComponent(catId)}`;
  if(panelId)u+=`&panelId=${panelId}`;
  u+=`&token=${token}`; return u;
}
$("genBtn").addEventListener("click",()=>{
  const cats=selectedCats();
  if(cats.length<1){toast(__T("En az bir kategori seç."),"err");return;}
  if(selPanels.size<1){toast(__T("En az bir panel türü seç."),"err");return;}
  const catId=cats.join(",");
  const catNames=cats.map(c=>catLabel(c,comps[comp].kategoriler?.[c])).join(" + ");
  const cards=[];
  PANELS.filter(p=>selPanels.has(p.key)).forEach(p=>{
    const ids=p.multi||[null];
    ids.forEach(pid=>{
      const url=buildUrl(p.route,catId,pid);
      const title=pid?`${p.key.toUpperCase()} — ${pid.toUpperCase()}`:p.label;
      cards.push({title,sub:catNames,url});
    });
  });
  $("out").innerHTML=cards.map((c,i)=>`<div class="qrcard"><h4>${esc(c.title)}</h4><div class="sub">Birleşik: ${esc(c.sub)}</div><div id="qc${i}" style="display:flex;justify-content:center"></div><div class="copy" data-u="${esc(c.url)}">Linki Kopyala</div></div>`).join("");
  cards.forEach((c,i)=>{try{new QRCode($("qc"+i),{text:c.url,width:180,height:180,correctLevel:QRCode.CorrectLevel.M});}catch(e){console.error(e);}});
  $("out").querySelectorAll(".copy").forEach(el=>el.onclick=()=>{navigator.clipboard.writeText(el.dataset.u);toast(__T("Link kopyalandı ✓"),"ok");});
  toast(`${cards.length}${__T(" birleşik QR üretildi ✓")}`,"ok");
});
$("printBtn").addEventListener("click",()=>window.print());

const qc=new URLSearchParams(location.search).get("comp");
if(qc){comp=qc;setTimeout(()=>{if(comps[comp]){$("compSel").value=comp;$("compSel").dispatchEvent(new Event("change"));}},700);}

return()=>{__subs.forEach(u=>{try{u()}catch(e){}});__iv.forEach(i=>clearInterval(i));__to.forEach(i=>clearTimeout(i))}}
export default function AerobikPanelBirlestirPage(){const r=R.useRef(null);R.useEffect(()=>{let live=!0,stop=null;r.current.innerHTML=HTML;start(()=>live).then(f=>{live?stop=f:f&&f()});return()=>{live=!1;stop&&stop()}},[]);return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:CSS}),e.jsx("div",{ref:r,className:"lvPB"})]})}
