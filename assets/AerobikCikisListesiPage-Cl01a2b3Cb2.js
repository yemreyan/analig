import"./i18n-Tr01a2b3Cb2.js";import{j as e,d as db}from"./main-C2LpyYUGCb2.js";import{r as R}from"./vendor-react-Cxw6bqwhCb2.js";import{o as _fb_onValue,j as _fb_push,k as _fb_ref,m as _fb_update}from"./vendor-firebase-940mxgRVCb2.js";import"./modulepreload-polyfill-B5Qt9EMXCb2.js";
// AEROBİK ÇIKIŞ LİSTESİ ÜRETİCİ — eski /aerobik-cikis-sirasi.html sayfasının uygulama içi sürümü.
const CSS=".lvCS *,.lvCS *::before,.lvCS *::after{box-sizing:border-box;margin:0;padding:0}.lvCS{--bg:#0a0e1a;--panel:#131a2b;--panel2:#1b2438;--line:#2a3550;--txt:#e8edf7;--muted:#8b97b3;--accent:#6366f1;--warn:#ef4444;--ok:#22c55e;--gold:#fbbf24;--team:#0891b2}.lvCS{font-family:'Plus Jakarta Sans',system-ui,sans-serif;background:var(--bg);color:var(--txt);min-height:100vh}.lvCS .topbar{position:sticky;top:0;z-index:20;background:rgba(10,14,26,.92);backdrop-filter:blur(10px);border-bottom:1px solid var(--line);padding:.7rem 1rem;display:flex;align-items:center;gap:1rem;flex-wrap:wrap}.lvCS .brand{display:flex;align-items:center;gap:.55rem;font-weight:800;font-size:1.05rem}.lvCS .brand .material-icons-round{color:var(--gold)}.lvCS .wrap{max-width:940px;margin:0 auto;padding:1rem}.lvCS .panel{background:var(--panel);border:1px solid var(--line);border-radius:14px;padding:.9rem;margin-bottom:1rem}.lvCS .row1{display:flex;gap:.6rem;flex-wrap:wrap;align-items:flex-end}.lvCS .fld{display:flex;flex-direction:column;gap:.25rem}.lvCS .fld label{font-size:.7rem;font-weight:800;color:var(--muted);text-transform:uppercase;letter-spacing:.03em}.lvCS select,.lvCS input{font:inherit;font-weight:700;border-radius:9px;border:1px solid var(--line);background:var(--panel2);color:var(--txt);padding:.5rem .7rem;font-size:.88rem}.lvCS select{min-width:200px}.lvCS input[type=number]{width:90px}.lvCS input[type=time]{width:110px}.lvCS .chkwrap{display:flex;align-items:center;gap:.4rem;font-size:.82rem;font-weight:700;color:var(--txt);cursor:pointer;user-select:none}.lvCS .chkwrap input{width:auto}.lvCS .btn{display:inline-flex;align-items:center;gap:.4rem;padding:.55rem .9rem;border:none;cursor:pointer;color:#fff;background:var(--accent);font-weight:800;font-size:.85rem;border-radius:9px}.lvCS .btn.gen{background:var(--gold);color:#3a2c00}.lvCS .btn.save{background:var(--ok);color:#04220f}.lvCS .btn.ghost{background:var(--panel2);border:1px solid var(--line);color:var(--txt)}.lvCS .btn:disabled{opacity:.5;cursor:default}.lvCS .btn:hover:not(:disabled){filter:brightness(1.08)}.lvCS .actions{display:flex;gap:.5rem;flex-wrap:wrap;margin-top:.8rem}.lvCS .hint{color:var(--muted);font-size:.8rem;font-weight:600;line-height:1.5;margin-top:.6rem}.lvCS .warnbox{background:rgba(239,68,68,.12);border:1px solid var(--warn);color:#fca5a5;border-radius:9px;padding:.5rem .7rem;font-size:.8rem;font-weight:700;margin-top:.6rem;display:none}.lvCS .list{display:flex;flex-direction:column;gap:.35rem}.lvCS .grp{color:var(--muted);font-size:.72rem;font-weight:800;text-transform:uppercase;letter-spacing:.04em;margin:.5rem 0 .1rem;padding-left:.2rem}.lvCS .rowc{display:flex;align-items:center;gap:.6rem;background:var(--panel);border:1px solid var(--line);border-radius:11px;padding:.5rem .7rem;cursor:grab}.lvCS .rowc.dragging{opacity:.4}.lvCS .rowc.over{border-color:var(--accent);box-shadow:0 0 0 2px var(--accent) inset}.lvCS .rowc.team{border-left:3px solid var(--team)}.lvCS .ord{font-weight:800;font-size:1rem;color:var(--accent);min-width:32px;text-align:center}.lvCS .tm{font-weight:800;font-size:.85rem;color:var(--gold);min-width:48px}.lvCS .grip{color:var(--muted)}.lvCS .info{flex:1;min-width:0}.lvCS .nm{font-weight:800;font-size:.92rem;line-height:1.2}.lvCS .sub{color:var(--muted);font-size:.74rem;font-weight:600;margin-top:.1rem;display:flex;gap:.5rem;flex-wrap:wrap;align-items:center}.lvCS .chip{background:var(--panel2);border:1px solid var(--line);border-radius:6px;padding:.03rem .4rem;font-weight:700}.lvCS .chip.teamchip{background:rgba(8,145,178,.18);border-color:var(--team);color:#67e8f9}.lvCS .grpwrap{display:flex;align-items:center;gap:.3rem;font-size:.74rem;font-weight:700;color:var(--muted)}.lvCS .grpwrap input{width:44px;padding:.15rem .3rem;text-align:center}.lvCS .mv{display:flex;flex-direction:column;gap:2px}.lvCS .mv button{background:var(--panel2);border:1px solid var(--line);color:var(--muted);border-radius:5px;width:24px;height:18px;cursor:pointer;display:flex;align-items:center;justify-content:center;padding:0}.lvCS .mv button:hover{color:#fff;border-color:var(--accent)}.lvCS .mv .material-icons-round{font-size:14px}.lvCS .breakrow{display:flex;align-items:center;justify-content:center;gap:.6rem;background:rgba(251,191,36,.1);border:1px dashed var(--gold);border-radius:11px;padding:.4rem .7rem;color:var(--gold);font-weight:800;font-size:.82rem}.lvCS .breakrow .x{cursor:pointer;color:#fca5a5;display:flex}.lvCS .empty,.lvCS .notice{text-align:center;color:var(--muted);padding:2.5rem 1rem;font-weight:600}.lvCS .toast{position:fixed;bottom:1.2rem;left:50%;transform:translateX(-50%);background:var(--panel2);border:1px solid var(--line);color:var(--txt);padding:.7rem 1.1rem;border-radius:12px;font-weight:700;font-size:.9rem;box-shadow:0 10px 30px rgba(0,0,0,.4);opacity:0;transition:.25s;pointer-events:none;z-index:50}.lvCS .toast.show{opacity:1}.lvCS .toast.ok{border-color:var(--ok);color:#86efac}.lvCS .toast.err{border-color:var(--warn);color:#fca5a5}.lvCS .rowc .del{background:var(--panel2);border:1px solid var(--line);color:#fca5a5;border-radius:6px;width:28px;height:28px;cursor:pointer;display:flex;align-items:center;justify-content:center;flex:0 0 auto}.lvCS .rowc .del:hover{border-color:var(--warn);color:#fff;background:var(--warn)}.lvCS .rowc .brk-add{background:var(--panel2);border:1px solid var(--line);color:var(--gold);border-radius:6px;width:28px;height:28px;cursor:pointer;display:flex;align-items:center;justify-content:center;flex:0 0 auto}.lvCS .rowc .brk-add:hover{border-color:var(--gold);color:#3a2c00;background:var(--gold)}.lvCS .modal{position:fixed;inset:0;background:rgba(0,0,0,.62);display:flex;align-items:center;justify-content:center;z-index:60;padding:1rem}.lvCS .modal.hidden{display:none}.lvCS .modal-card{background:var(--panel);border:1px solid var(--line);border-radius:16px;padding:1.3rem;width:100%;max-width:440px;box-shadow:0 20px 60px rgba(0,0,0,.5)}.lvCS .modal-card h3{font-size:1.08rem;font-weight:800;margin-bottom:.9rem;display:flex;align-items:center;gap:.5rem}.lvCS .modal-card h3 .material-icons-round{color:var(--team)}.lvCS .mfld{display:flex;flex-direction:column;gap:.25rem;margin-bottom:.7rem}.lvCS .mfld label{font-size:.72rem;font-weight:800;color:var(--muted);text-transform:uppercase;letter-spacing:.03em}.lvCS .mfld input,.lvCS .mfld select,.lvCS .mfld textarea{font:inherit;font-weight:600;background:var(--panel2);color:var(--txt);border:1px solid var(--line);border-radius:9px;padding:.55rem .7rem;font-size:.9rem;width:100%}.lvCS .mfld textarea{resize:vertical;line-height:1.5}.lvCS .mhint{font-size:.74rem;color:var(--muted);font-weight:600;margin:-.3rem 0 .5rem}.lvCS .mrow{display:flex;gap:.6rem;justify-content:flex-end;margin-top:.5rem}.lvCS *{font-family:Arial,Helvetica,sans-serif;box-sizing:border-box}.lvCS{margin:0;padding:16px;color:#111}.lvCS .hd{position:relative;text-align:center;min-height:74px;margin-bottom:2px}.lvCS .hd img{position:absolute;top:2px;left:6px;height:62px}.lvCS .hd .l1{font-weight:800;font-style:italic;font-size:16px}.lvCS .hd .l2{font-weight:800;font-style:italic;font-size:13px}.lvCS .hd .l3{font-weight:800;font-style:italic;font-size:12px}.lvCS .hd .l4{font-weight:800;font-style:italic;font-size:11px}.lvCS .hd .l5{font-style:italic;font-size:10px}.lvCS .sub{text-align:center;font-weight:800;font-size:10.5px;margin:10px 0 8px;line-height:1.55}.lvCS table{width:100%;border-collapse:collapse;font-size:10px}.lvCS th{background:#fff;border:1px solid #222;padding:6px;text-align:left;font-weight:800;font-size:9px}.lvCS td{border:1px solid #b7b7b7;padding:4px 7px}.lvCS td.c{text-align:center}.lvCS td.s{color:#111;font-weight:600}.lvCS td.n{padding-left:12px;color:#7d1220;font-weight:700}.lvCS td.rd{color:#7d1220;font-weight:600}.lvCS tr.k td{background:#fefdec}.lvCS tr.e td{background:#e9f1fb}.lvCS tr.t td{background:#eaf7ee}.lvCS tr.brk td{background:#fbe7d6;text-align:center;font-weight:800;font-size:10px;border:1px solid #222;color:#333}.lvCS th:first-child,.lvCS td:first-child{width:70px}.lvCS th:nth-child(3),.lvCS td:nth-child(3){width:100px}.lvCS th:nth-child(4),.lvCS td:nth-child(4){width:120px}.lvCS th:last-child,.lvCS td:last-child{width:95px}@media print{.lvCS{padding:6px}@page{margin:10mm}}.lvCS{position:fixed;inset:0;z-index:60;overflow:auto}";
const HTML="<div class=\"topbar\">\n  <div class=\"brand\"><span class=\"material-icons-round\">event_note</span> Aerobik Çıkış Listesi Üretici</div>\n  <span id=\"who\" style=\"margin-left:auto;color:var(--muted);font-weight:700;font-size:.82rem\"></span>\n</div>\n<div class=\"wrap\">\n  <div class=\"panel\">\n    <div class=\"row1\">\n      <div class=\"fld\"><label>Yarışma</label><select id=\"compSel\"><option value=\"\">Yarışma seçin…</option></select></div>\n      <div class=\"fld\"><label>Liste tarihi (gün)</label><input type=\"date\" id=\"listDate\"></div>\n      <div class=\"fld\" id=\"dayWrap\" style=\"display:none\"><label>İçe aktarılan gün</label><select id=\"importDaySel\"></select></div>\n      <div class=\"fld\"><label>Başlangıç saati</label><input type=\"time\" id=\"baseTime\" value=\"09:00\"></div>\n      <div class=\"fld\"><label>Çıkış aralığı (dk)</label><input type=\"number\" id=\"interval\" value=\"3\" min=\"1\" max=\"15\"></div>\n      <div class=\"fld\"><label>Kura tohumu</label><input type=\"number\" id=\"seed\" value=\"1\"></div>\n      <div class=\"fld\"><label>&nbsp;</label><button class=\"btn ghost\" id=\"reseed\" title=\"Yeni tohum\"><span class=\"material-icons-round\" style=\"font-size:17px\">casino</span></button></div>\n      <div class=\"fld\"><label>Mola sıklığı (çıkış)</label><input type=\"number\" id=\"breakEvery\" value=\"35\" min=\"0\"></div>\n    </div>\n    <div class=\"actions\">\n      <button class=\"btn ghost\" id=\"tplBtn\"><span class=\"material-icons-round\" style=\"font-size:17px\">description</span> Şablon İndir</button>\n      <input type=\"file\" id=\"fileInput\" accept=\".xlsx,.xls\" style=\"display:none\">\n      <button class=\"btn ghost\" id=\"importBtn\"><span class=\"material-icons-round\" style=\"font-size:17px\">upload_file</span> Excel Yükle (Sporcu)</button>\n      <label class=\"chkwrap\"><input type=\"checkbox\" id=\"distribute\" checked> Çoklu kategorileri (çift/trio/grup) sona doğru dağıt</label>\n      <label class=\"chkwrap\"><input type=\"checkbox\" id=\"keepTimes\" checked> İçe aktarılan saatleri koru (gün/saat)</label>\n      <button class=\"btn gen\" id=\"genBtn\"><span class=\"material-icons-round\" style=\"font-size:18px\">casino</span> Kura ile Oluştur</button>\n      <button class=\"btn\" id=\"addBtn\" style=\"background:var(--team)\" disabled><span class=\"material-icons-round\" style=\"font-size:18px\">person_add</span> Yarışmacı Ekle</button>\n      <button class=\"btn ghost\" id=\"addBreakBtn\" disabled><span class=\"material-icons-round\" style=\"font-size:17px\">free_breakfast</span> Mola Ekle</button>\n      <button class=\"btn ghost\" id=\"printBtn\" disabled><span class=\"material-icons-round\" style=\"font-size:17px\">print</span> PDF / Yazdır</button>\n      <button class=\"btn ghost\" id=\"excelBtn\" disabled><span class=\"material-icons-round\" style=\"font-size:17px\">table_view</span> Excel İndir</button>\n      <button class=\"btn save\" id=\"saveBtn\" disabled><span class=\"material-icons-round\" style=\"font-size:17px\">save</span> Kaydet</button>\n      <span id=\"count\" style=\"color:var(--muted);font-weight:700;font-size:.85rem;align-self:center\"></span>\n    </div>\n    <div class=\"hint\">Faz sırası: <b>Bireysel (Tek Kadın+Tek Erkek) → Çift → Trio → Grup → Aerobik Dans → Step</b>. Her fazda tohumlu kura. Çoklu kategoriler sona doğru dağıtılınca paylaşımlı sporcular (bireysel+çift) otomatik dinlenir. Kura sonrası satırları sürükleyerek/oklarla düzeltebilirsin.</div>\n    <div class=\"warnbox\" id=\"warnbox\"></div>\n  </div>\n  <div id=\"list\" class=\"list\"><div class=\"notice\">Yarışma seçip “Kura ile Oluştur”a bas.</div></div>\n</div>\n<div id=\"modal\" class=\"modal hidden\">\n  <div class=\"modal-card\">\n    <h3><span class=\"material-icons-round\">person_add</span> Listeye Yarışmacı Ekle</h3>\n    <div class=\"mfld\"><label>Kategori</label><select id=\"mCat\"></select></div>\n    <div class=\"mfld\"><label id=\"mNamesLbl\">İsim (Ad Soyad)</label><textarea id=\"mNames\" rows=\"1\" placeholder=\"Ad Soyad\"></textarea></div>\n    <div class=\"mhint\" id=\"mHint\">Bireysel: tek isim. Çift/Trio/Grup: her satıra bir üye (Ad Soyad).</div>\n    <div class=\"mfld\"><label>İl</label><input id=\"mIl\" placeholder=\"Örn. İZMİR\"></div>\n    <div class=\"mfld\"><label>Kulüp (isteğe bağlı)</label><input id=\"mKulup\" placeholder=\"Kulüp/okul adı\"></div>\n    <div class=\"mfld\" id=\"mGrupWrap\" style=\"display:none\"><label>Grup No (aynı takımın üyelerine aynı no)</label><input type=\"number\" id=\"mGrup\" value=\"1\" min=\"1\"></div>\n    <div class=\"mrow\"><button class=\"btn ghost\" id=\"mCancel\">İptal</button><button class=\"btn save\" id=\"mAdd\"><span class=\"material-icons-round\" style=\"font-size:17px\">add</span> Listeye Ekle</button></div>\n  </div>\n</div>\n<div id=\"toast\" class=\"toast\"></div>";
const EXT=["https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js"];
const __ld=s=>new Promise(r=>{if(document.querySelector(`script[data-gx-src="${s}"]`))return r();const t=document.createElement("script");t.src=s;t.setAttribute("data-gx-src",s);t.onload=()=>r();t.onerror=()=>r();document.head.appendChild(t)});
async function start(alive){for(const s of EXT)await __ld(s);if(!alive())return()=>{};const __subs=[],__iv=[],__to=[];const setInterval=(...a)=>{const i=window.setInterval(...a);__iv.push(i);return i};const setTimeout=(...a)=>{const i=window.setTimeout(...a);__to.push(i);return i};const onValue=(...a)=>{const u=_fb_onValue(...a);typeof u==="function"&&__subs.push(u);return u};const push=_fb_push;const ref=_fb_ref;const update=_fb_update;



const BASE="aerobik_yarismalar";
const $=id=>document.getElementById(id);
const esc=s=>String(s==null?"":s).replace(/[<&>]/g,c=>({"<":"&lt;",">":"&gt;","&":"&amp;"}[c]));
function toast(m,t){const e=$("toast");e.textContent=m;e.className="toast show "+(t||"");setTimeout(()=>e.className="toast",2600);}

// ---- kategori yardımcıları ----
const isMulti=cat=>/(_cift|_trio|_grup|_dans)$/.test(cat)||/^step_/.test(cat);
const typeOf=cat=>{if(/_cift$/.test(cat))return"cift";if(/_trio$/.test(cat))return"trio";if(/_grup$/.test(cat))return"grup";if(/_dans$/.test(cat))return"dans";if(/^step_/.test(cat))return"step";return"bireysel";};
const PHASES=["bireysel","cift","trio","grup","dans","step"];
const phaseIdx=cat=>PHASES.indexOf(typeOf(cat));
const KATLBL={kiz:"Tek Kadın",erkek:"Tek Erkek",cift:"Çift",trio:"Trio",grup:"Grup",dans:"Aerobik Dans"};
function catKategori(cat){const parts=cat.split("_");if(/^step_/.test(cat))return"Step Takım";const suf=parts.slice(1).join("_");return KATLBL[suf]||suf;}
const AGEPFX={minik:"MİNİKLER",kucuk:"KÜÇÜKLER",yildiz:"YILDIZLAR",genc:"GENÇLER",buyuk:"BÜYÜKLER"};
function ageGroupLabel(){const cats=Object.keys(comps[comp]?.kategoriler||comps[comp]?.sporcular||{});return[...new Set(cats.map(c=>AGEPFX[c.replace(/^step_/,"").split("_")[0]]).filter(Boolean))].join(" - ");}
function fmtD(iso,wd){if(!iso)return"";try{return new Date(iso).toLocaleDateString("tr-TR",Object.assign({day:"numeric",month:"long",year:"numeric"},wd?{weekday:"long"}:{}));}catch{return"";}}
function dateRange(){const s=compMeta.baslangicTarihi,e=compMeta.bitisTarihi;if(s&&e&&s!==e){const ds=new Date(s),de=new Date(e);if(ds.getFullYear()===de.getFullYear()&&ds.getMonth()===de.getMonth())return `${ds.getDate()} - ${de.getDate()} ${ds.toLocaleDateString("tr-TR",{month:"long",year:"numeric"})}`;return `${fmtD(s)} - ${fmtD(e)}`;}return fmtD(s);}

// ---- tohumlu PRNG ----
function mulberry32(a){return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
function shuffle(arr,rng){const a=arr.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(rng()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
// aynı kişi kategoriler arası ayrı kayıtlarda -> tckn/lisans yoksa isimle eşle
const pkey=m=>String(m.tckn||m.lisans||((m.ad||"")+(m.soyad||"")).toLocaleLowerCase("tr").replace(/\s+/g,"")).trim();
const sharesPerson=(a,c)=>a.members.some(m=>c.members.some(n=>pkey(m)===pkey(n)));

let comps={}, comp="", items=[], breaks=[], compName="", compMeta={}, importedByDay={}, importMode=false;

onValue(ref(db,BASE),s=>{
  comps=s.val()||{};
  const opts=Object.entries(comps).filter(([id,c])=>c&&typeof c==="object").sort((a,b)=>(b[1].baslangicTarihi||"").localeCompare(a[1].baslangicTarihi||""));
  $("compSel").innerHTML='<option value="">Yarışma seçin…</option>'+opts.map(([id,c])=>`<option value="${id}">${esc(c.isim||c.ad||id)}</option>`).join("");
  if(comp&&comps[comp])$("compSel").value=comp;
});
$("compSel").addEventListener("change",e=>{comp=e.target.value;items=[];breaks=[];importedByDay={};importMode=false;$("dayWrap").style.display="none";if(comps[comp]?.baslangicTarihi&&!$("listDate").value)$("listDate").value=comps[comp].baslangicTarihi;render();});
$("reseed").addEventListener("click",()=>{$("seed").value=Math.floor(Math.random()*99999)+1;});
$("genBtn").addEventListener("click",generate);
$("saveBtn").addEventListener("click",save);
$("printBtn").addEventListener("click",printList);
$("excelBtn").addEventListener("click",excelExport);
$("tplBtn").addEventListener("click",downloadTemplate);
$("importBtn").addEventListener("click",()=>{if(!comp){toast("Önce yarışma seçin.","err");return;}$("fileInput").click();});
$("fileInput").addEventListener("change",e=>{const f=e.target.files[0];if(f)importExcel(f);e.target.value="";});
$("importDaySel").addEventListener("change",()=>{const days=Object.keys(importedByDay);loadImportedDay(days[+$("importDaySel").value]);});
$("keepTimes").addEventListener("change",()=>{const days=Object.keys(importedByDay);if(days.length)loadImportedDay(days[+($("importDaySel").value||0)]);});
$("addBreakBtn").addEventListener("click",addBreak);

function nameOf(it){return it.members.map(m=>m.adSoyad||((m.ad||"")+" "+(m.soyad||"")).trim()).join(" - ");}
function ilOf(it){return it.members[0]?.il||it.members[0]?.okul||"";}

function buildCompetitors(){
  const c=comps[comp]; if(!c)return[];
  compName=c.isim||c.ad||comp; compMeta=c;
  const sp=c.sporcular||{}; const list=[];
  Object.entries(sp).forEach(([cat,aths])=>{
    if(!aths||typeof aths!=="object")return;
    if(isMulti(cat)){
      const g=new Map();
      Object.entries(aths).forEach(([id,a])=>{if(!a||typeof a!=="object")return;const okul=(a.okul||a.kulup||"").trim(),gn=a.grupNo||1,key=cat+"|"+okul+"|"+gn;if(!g.has(key))g.set(key,{cat,type:typeOf(cat),okul,grupNo:gn,members:[]});g.get(key).members.push({id,...a});});
      g.forEach(v=>list.push(v));
    }else{
      Object.entries(aths).forEach(([id,a])=>{if(!a||typeof a!=="object")return;list.push({cat,type:"bireysel",okul:(a.okul||a.kulup||"").trim(),grupNo:null,members:[{id,...a}]});});
    }
  });
  return list;
}

function generate(){
  const all=buildCompetitors();
  if(!all.length){toast("Bu yarışmada sporcu yok.","err");return;}
  const rng=mulberry32(parseInt($("seed").value)||1);
  // faza göre grupla + her fazda kura
  const byPhase={}; all.forEach(c=>{const p=typeOf(c.cat);(byPhase[p]=byPhase[p]||[]).push(c);});
  const individuals=shuffle(byPhase.bireysel||[],rng);
  const multi=[]; PHASES.slice(1).forEach(p=>{if(byPhase[p])multi.push(...shuffle(byPhase[p],rng));});
  let ordered;
  if($("distribute").checked && multi.length){
    const total=individuals.length+multi.length, minGap=5;
    ordered=individuals.slice();
    let at=Math.max(Math.floor(total*.55),0);
    const gap=Math.max(1,Math.round((total-at)/multi.length));
    multi.forEach(c=>{
      let latest=-1;for(let i=0;i<ordered.length;i++)if(sharesPerson(ordered[i],c))latest=i;
      const earliest=latest+minGap+1;
      const pos=Math.min(ordered.length,Math.max(at,earliest));
      ordered.splice(pos,0,c);at=pos+gap;
    });
  }else ordered=[...individuals,...multi];
  items=ordered;
  importMode=false; // kura -> saatler yeniden hesaplanır
  // otomatik mola önerisi
  breaks=[];
  const be=parseInt($("breakEvery").value)||0;
  if(be>0){for(let p=be;p<items.length;p+=be)breaks.push({after:p,dur:10,label:"ARA"});}
  render();
  checkRest();
  toast("Çıkış listesi oluşturuldu ✓","ok");
}

function toMin(hhmm){const [h,m]=(hhmm||"09:00").split(":").map(Number);return h*60+m;}
function fmt(min){min=((min%1440)+1440)%1440;const h=Math.floor(min/60),m=min%60;return String(h).padStart(2,"0")+":"+String(m).padStart(2,"0");}

// zaman + mola satırlarını hesapla -> render dizisi
function computeRows(){
  const interval=parseInt($("interval").value)||3, base=toMin($("baseTime").value);
  // SAAT KORUMA MODU: içe aktarılan başlangıç saatlerini aynen kullan (yeniden hesaplama)
  if(importMode && items.length && items.every(it=>/^\d{1,2}:\d{2}$/.test(it._impTime||""))){
    const bk=[...breaks].sort((a,b)=>a.after-b.after); let bi=0; const rows=[];
    items.forEach((it,i)=>{
      while(bi<bk.length&&bk[bi].after===i){const st=i>0?toMin(items[i-1]._impTime)+interval:base,en=toMin(items[i]._impTime);rows.push({type:"break",label:bk[bi].label,start:st,end:en,idx:bi});bi++;}
      it._order=i+1; it._time=it._impTime; rows.push({type:"item",it,order:i+1,time:it._impTime});
    });
    return rows;
  }
  const bk=[...breaks].sort((a,b)=>a.after-b.after); let bi=0, t=base; const rows=[];
  items.forEach((it,i)=>{
    while(bi<bk.length&&bk[bi].after===i){const s=t;t+=bk[bi].dur;rows.push({type:"break",label:bk[bi].label,start:s,end:t,idx:bi});bi++;}
    it._order=i+1; it._time=fmt(t); rows.push({type:"item",it,order:i+1,time:fmt(t)});
    t+=interval;
  });
  return rows;
}

function render(){
  const has=items.length>0;
  ["saveBtn","printBtn","excelBtn","addBreakBtn"].forEach(id=>$(id).disabled=!has);
  $("addBtn").disabled=!comp;
  $("count").textContent=has?`${items.length} yarışmacı`:"";
  if(!comp){$("list").innerHTML='<div class="notice">Yarışma seçin.</div>';return;}
  if(!has){$("list").innerHTML='<div class="notice">Bu yarışmada henüz liste yok.<br><b>🎲 Kura ile Oluştur</b> (sporcular yüklüyse) ya da <b>➕ Yarışmacı Ekle</b> ile tek tek başla.<br>Sporcu yoksa: <b>📄 Şablon İndir → 📥 Excel Yükle</b>.</div>';return;}
  const rows=computeRows();
  $("list").innerHTML=rows.map(r=>{
    if(r.type==="break")return `<div class="breakrow"><span class="material-icons-round" style="font-size:16px">free_breakfast</span> ${fmt(r.start)} - ${fmt(r.end)} · ${esc(r.label)} (${r.end-r.start} dk) <span class="x" data-delbreak="${r.idx}"><span class="material-icons-round" style="font-size:16px">close</span></span></div>`;
    const it=r.it, i=r.order-1, team=it.members.length>1;
    const grpEd=isMulti(it.cat)?`<span class="grpwrap">Grup <input type="number" min="1" value="${it.grupNo||1}" data-gi="${i}"></span>`:"";
    const cnt=team?`<span class="chip teamchip">×${it.members.length}</span>`:"";
    return `<div class="rowc${team?" team":""}" draggable="true" data-i="${i}">
      <span class="ord">${r.order}</span><span class="tm">${r.time}</span>
      <span class="material-icons-round grip">drag_indicator</span>
      <div class="info"><div class="nm">${esc(nameOf(it))||"—"}</div>
        <div class="sub"><span class="chip">${esc(catKategori(it.cat))}</span>${cnt}<span>${esc(ilOf(it))}</span>${grpEd}</div></div>
      <div class="mv"><button data-up="${i}"><span class="material-icons-round">keyboard_arrow_up</span></button><button data-dn="${i}"><span class="material-icons-round">keyboard_arrow_down</span></button></div>
      <button class="brk-add" data-brk="${i}" title="Buradan sonra mola ekle"><span class="material-icons-round" style="font-size:15px">free_breakfast</span></button>
      <button class="del" data-del="${i}" title="Listeden çıkar"><span class="material-icons-round" style="font-size:16px">delete</span></button>
    </div>`;
  }).join("");
  wire();
}

function move(f,t){if(t<0||t>=items.length)return;const[x]=items.splice(f,1);items.splice(t,0,x);render();}
function wire(){
  const L=$("list");
  L.querySelectorAll("[data-up]").forEach(b=>b.onclick=()=>move(+b.dataset.up,+b.dataset.up-1));
  L.querySelectorAll("[data-dn]").forEach(b=>b.onclick=()=>move(+b.dataset.dn,+b.dataset.dn+1));
  L.querySelectorAll("[data-delbreak]").forEach(b=>b.onclick=()=>{breaks.splice(+b.dataset.delbreak,1);render();});
  L.querySelectorAll("[data-del]").forEach(b=>b.onclick=async ()=>{const it=items[+b.dataset.del];if(await window.__gxConfirm(`"${nameOf(it)||"Bu yarışmacı"}" listeden çıkarılsın mı?`)){items.splice(+b.dataset.del,1);render();}});
  L.querySelectorAll("[data-brk]").forEach(b=>b.onclick=()=>insertBreakAfter(+b.dataset.brk+1));
  L.querySelectorAll("input[data-gi]").forEach(inp=>inp.onchange=()=>{items[+inp.dataset.gi].grupNo=Math.max(1,parseInt(inp.value)||1);});
  let dragI=null;
  L.querySelectorAll(".rowc").forEach(row=>{
    row.addEventListener("dragstart",()=>{dragI=+row.dataset.i;row.classList.add("dragging");});
    row.addEventListener("dragend",()=>{row.classList.remove("dragging");L.querySelectorAll(".rowc").forEach(r=>r.classList.remove("over"));});
    row.addEventListener("dragover",e=>{e.preventDefault();row.classList.add("over");});
    row.addEventListener("dragleave",()=>row.classList.remove("over"));
    row.addEventListener("drop",e=>{e.preventDefault();const to=+row.dataset.i;if(dragI!=null&&dragI!==to)move(dragI,to);dragI=null;});
  });
}
["baseTime","interval"].forEach(id=>$(id).addEventListener("change",()=>{if(items.length)render();}));

// --- Manuel yarışmacı ekleme ---
function nextGrupNo(cat){const g=items.filter(x=>x.cat===cat).map(x=>x.grupNo||0);return (g.length?Math.max(...g):0)+1;}
function onCatChange(){const cat=$("mCat").value,multi=isMulti(cat),tp=typeOf(cat);
  $("mGrupWrap").style.display=multi?"":"none";
  $("mNamesLbl").textContent=multi?"Üyeler — her satıra bir Ad Soyad":"İsim (Ad Soyad)";
  $("mNames").rows=multi?(tp==="cift"?2:tp==="trio"?3:tp==="dans"?8:5):1;
  $("mNames").placeholder=multi?"Ad Soyad\nAd Soyad":"Ad Soyad";
  $("mHint").style.display=multi?"":"none";
  if(multi)$("mGrup").value=nextGrupNo(cat);
}
function openAddModal(){
  if(!comp){toast("Önce yarışma seçin.","err");return;}
  const {cats}=catLookup();
  if(!cats.length){toast("Bu yarışmada kategori yok.","err");return;}
  $("mCat").innerHTML=cats.map(c=>`<option value="${c}">${esc(catKategori(c))}${isMulti(c)?" (takım)":""}</option>`).join("");
  $("mIl").value="";$("mKulup").value="";$("mNames").value="";
  onCatChange();
  $("modal").classList.remove("hidden");$("mNames").focus();
}
function closeModal(){$("modal").classList.add("hidden");}
function doAddCompetitor(){
  const cat=$("mCat").value;if(!cat){toast("Kategori seçin.","err");return;}
  const il=$("mIl").value.trim(),okul=$("mKulup").value.trim()||il;
  const lines=$("mNames").value.split("\n").map(s=>s.trim()).filter(Boolean);
  if(!lines.length){toast("En az bir isim girin.","err");return;}
  const multi=isMulti(cat),grupNo=multi?Math.max(1,parseInt($("mGrup").value)||1):null;
  const members=lines.map(nm=>{const p=nm.split(/\s+/);const soyad=p.length>1?p.pop():"";const ad=p.join(" ");
    const m={ad,soyad,adSoyad:(ad+" "+soyad).trim(),il,okul,kulup:okul,yarismaTuru:multi?"takim":"ferdi"};if(multi)m.grupNo=grupNo;return m;});
  items.push({cat,type:typeOf(cat),okul,grupNo,members});
  importMode=false; // manuel ekleme -> saatler yeniden hesaplanır
  closeModal();render();
  toast(`"${lines.join(" - ")}" listeye eklendi ✓`,"ok");
}
$("addBtn").addEventListener("click",openAddModal);
$("mCat").addEventListener("change",onCatChange);
$("mCancel").addEventListener("click",closeModal);
$("mAdd").addEventListener("click",doAddCompetitor);
$("modal").addEventListener("click",e=>{if(e.target.id==="modal")closeModal();});

async function insertBreakAfter(after){
  const dur=parseInt(await window.__gxPrompt(`${after}. çıkıştan sonra mola — süre (dakika):`,"10")); if(!dur||dur<1)return;
  const label=await window.__gxPrompt("Mola etiketi:","ARA")||"ARA";
  breaks.push({after,dur,label}); render();
  toast(`${after}. çıkıştan sonra ${dur} dk mola eklendi ✓`,"ok");
}
async function addBreak(){
  const pos=await window.__gxPrompt("Molayı kaçıncı çıkıştan SONRA eklemek istersin? (1-"+items.length+")");
  if(pos==null)return; const after=parseInt(pos); if(isNaN(after)||after<1||after>=items.length){toast("Geçersiz konum.","err");return;}
  const dur=parseInt(await window.__gxPrompt("Mola süresi (dk):","10"))||10;
  const label=await window.__gxPrompt("Etiket:","ARA")||"ARA";
  breaks.push({after,dur,label}); render();
}

// paylaşımlı sporcu dinlenme kontrolü (uyarı)
function checkRest(){
  const seen={}; let minGap=1e9, worst=null;
  items.forEach((it,i)=>{it.members.forEach(m=>{const id=pkey(m);if(seen[id]!=null){const g=i-seen[id];if(g<minGap){minGap=g;worst=(m.adSoyad||m.ad)+" ("+g+" çıkış ara)";}}seen[id]=i;});});
  const wb=$("warnbox");
  if(worst&&minGap<5){wb.style.display="block";wb.textContent="⚠ Dikkat: "+worst+" — aynı sporcunun iki çıkışı çok yakın. Sürükleyerek arayı açabilirsin.";}
  else wb.style.display="none";
}

async function save(){
  if(!comp||!items.length)return; $("saveBtn").disabled=true;
  try{
    computeRows(); const up={}; const multi0=it=>isMulti(it.cat);
    items.forEach(it=>{it.members.forEach(m=>{
      if(!m.id){ // manuel eklenen yeni sporcu -> tam kaydı TEK objede yaz (alt-yol yazma, çakışır)
        m.id=push(ref(db,`${BASE}/${comp}/sporcular/${it.cat}`)).key;
        up[`${BASE}/${comp}/sporcular/${it.cat}/${m.id}`]={ad:m.ad||"",soyad:m.soyad||"",adSoyad:m.adSoyad||"",soyadAd:((m.soyad||"")+" "+(m.ad||"")).trim(),il:m.il||"",okul:m.okul||"",kulup:m.okul||"",yarismaTuru:multi0(it)?"takim":"ferdi",appId:"manuel",gun:it._gun||"",cikisSirasi:it._order,baslangicSaati:it._time,...(multi0(it)?{grupNo:it.grupNo||1}:{})};
        up[`${BASE}/${comp}/kategoriler/${it.cat}`]=comps[comp]?.kategoriler?.[it.cat]||{name:catKategori(it.cat)};
      }else{ // mevcut sporcu -> sadece alanları güncelle
        const p=`${BASE}/${comp}/sporcular/${it.cat}/${m.id}`;up[`${p}/cikisSirasi`]=it._order;up[`${p}/baslangicSaati`]=it._time;up[`${p}/gun`]=it._gun||"";if(multi0(it))up[`${p}/grupNo`]=it.grupNo||1;
      }
    });});
    await update(ref(db),up);
    toast("Çıkış sırası + saatler kaydedildi ✓","ok");
  }catch(err){toast("Hata: "+(err?.message||err),"err");}
  $("saveBtn").disabled=false;
}

// Kategori metnini -> kategori ID eşleme (ID, etiket, yaş+tür, tür tek başına)
function catLookup(){
  const c=comps[comp]||{};
  const cats=Object.keys(c.kategoriler||{}).length?Object.keys(c.kategoriler):Object.keys(c.sporcular||{});
  const norm=s=>String(s||"").toLocaleLowerCase("tr").replace(/[^a-zçğıöşü0-9]+/g,"");
  const AGW={minik:"minik",kucuk:"küçük",yildiz:"yıldız",genc:"genç",buyuk:"büyük"};
  const map={}; const add=(l,cat)=>{const n=norm(l);if(n&&!(n in map))map[n]=cat;};
  cats.forEach(cat=>{const base=cat.replace(/^step_/,""),age=base.split("_")[0],suf=base.split("_").slice(1).join("_");
    [cat,catKategori(cat),(AGW[age]||age)+" "+(KATLBL[suf]||suf),(AGW[age]||age)+"ler "+(KATLBL[suf]||suf),KATLBL[suf]||suf,suf].forEach(l=>add(l,cat));});
  // yarışmanın yaş grup(lar)ı için tüm türleri üret (comp'ta olmasa da) — TRİO/GRUP/DANS eşlensin
  const ages=[...new Set(cats.map(x=>x.replace(/^step_/,"").split("_")[0]).filter(a=>AGW[a]))];
  const TYPES={kiz:["tek kadın","tek kadin","kız","kadın"],erkek:["tek erkek","erkek","bay"],cift:["çift","cift","karışık ikili","ikili"],trio:["trio","üçlü","uclu"],grup:["grup","group"],dans:["aerobik dans","aerodans","dans"]};
  ages.forEach(age=>Object.entries(TYPES).forEach(([suf,labs])=>{const cat=age+"_"+suf;labs.concat([cat,KATLBL[suf]||""]).forEach(l=>add(l,cat));}));
  return {map,norm,cats};
}
function downloadTemplate(){
  if(!comp){toast("Önce yarışma seçin.","err");return;}
  if(!window.XLSX){toast("Excel bileşeni yüklenemedi.","err");return;}
  const {cats}=catLookup(); const ex=cats[0]||"kucuk_kiz", exMulti=cats.find(isMulti)||"";
  const tpl=[
    {Ad:"Ayşe",Soyad:"Yılmaz",İl:"İZMİR",Kulüp:"Örnek S.K.",Kategori:catKategori(ex),TCKN:"",["Lisans No"]:"",["Grup No"]:""},
    exMulti?{Ad:"Ali",Soyad:"Demir",İl:"ANKARA",Kulüp:"Örnek S.K.",Kategori:catKategori(exMulti),TCKN:"",["Lisans No"]:"",["Grup No"]:1}:null,
    exMulti?{Ad:"Veli",Soyad:"Kaya",İl:"ANKARA",Kulüp:"Örnek S.K.",Kategori:catKategori(exMulti),TCKN:"",["Lisans No"]:"",["Grup No"]:1}:null
  ].filter(Boolean);
  const wb=XLSX.utils.book_new();
  const ws=XLSX.utils.json_to_sheet(tpl,{header:["Ad","Soyad","İl","Kulüp","Kategori","TCKN","Lisans No","Grup No"]});
  ws["!cols"]=[{wch:16},{wch:16},{wch:12},{wch:22},{wch:22},{wch:14},{wch:12},{wch:8}];
  XLSX.utils.book_append_sheet(wb,ws,"Sporcular");
  const cl=cats.map(c=>({["Kategori (bunu yaz)"]:catKategori(c),["Kategori ID"]:c,Tür:isMulti(c)?"Takım — aynı takımın üyelerine aynı Grup No":"Bireysel"}));
  const w2=XLSX.utils.json_to_sheet(cl,{header:["Kategori (bunu yaz)","Kategori ID","Tür"]});
  w2["!cols"]=[{wch:24},{wch:16},{wch:44}];
  XLSX.utils.book_append_sheet(wb,w2,"Kategoriler");
  XLSX.writeFile(wb,"aerobik_sporcu_sablonu.xlsx");
  toast("Şablon indirildi ✓ (Kategoriler sayfasındaki etiketleri kullan)","ok");
}
const TRM={ocak:1,şubat:2,subat:2,mart:3,nisan:4,mayıs:5,mayis:5,haziran:6,temmuz:7,ağustos:8,agustos:8,eylül:9,eylul:9,ekim:10,kasım:11,kasim:11,aralık:12,aralik:12};
function dayToISO(day){const m=String(day||"").match(/(\d{1,2})\s+(\S+)\s+(\d{4})/);if(!m)return"";const mo=TRM[m[2].toLocaleLowerCase("tr")];if(!mo)return"";return `${m[3]}-${String(mo).padStart(2,"0")}-${String(+m[1]).padStart(2,"0")}`;}
async function importExcel(file){
  if(!comp){toast("Önce yarışma seçin.","err");return;}
  if(!window.XLSX){toast("Excel bileşeni yüklenemedi.","err");return;}
  try{
    const wb=XLSX.read(await file.arrayBuffer(),{type:"array"});
    // TÜM sayfaları oku: kişi-bazlı (Ad/Soyad/Ad Soyad içeren) sayfaları birleştir; özet/mola sayfalarını atla
    let rows=[]; const usedSheets=[];
    wb.SheetNames.forEach(sn=>{const rr=XLSX.utils.sheet_to_json(wb.Sheets[sn],{defval:""});if(!rr.length)return;
      const h=Object.keys(rr[0]).map(x=>String(x).toLocaleLowerCase("tr").replace(/\s+/g,""));
      if(h.some(x=>x==="ad"||x==="soyad"||x==="adsoyad")){rows=rows.concat(rr);usedSheets.push(sn);}});
    if(!rows.length){rows=XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]],{defval:""});usedSheets.push(wb.SheetNames[0]);}
    if(!rows.length){toast("Excel boş.","err");return;}
    if(usedSheets.length>1)toast(`${usedSheets.length} sayfa okundu: ${usedSheets.join(", ")}`,"ok");
    const {map,norm}=catLookup();
    const G=k=>{const r={};Object.keys(k).forEach(x=>r[norm(x)]=k[x]);return n=>r[norm(n)];};
    // "Çıkış Sırası" dolu ise -> LİSTE modu (birleştir + sıraya göre yükle); değilse sporcu modu
    const hasOrder=rows.some(r=>{const g=G(r);const v=g("Çıkış Sırası")||g("Cikis Sirasi")||g("Sıra");return v!==""&&v!=null&&!isNaN(parseInt(v));});
    if(hasOrder){ importList(rows,G,map,norm); return; }
    const up={}; let ok=0,bad=0; const badCats=new Set();
    rows.forEach(row=>{
      const g=G(row);
      const catText=g("Kategori")||g("KATEGORİ")||"";
      const cat=map[norm(catText)];
      if(!cat){bad++;if(String(catText).trim())badCats.add(catText);return;}
      let ad=String(g("Ad")||"").trim(), soyad=String(g("Soyad")||"").trim();
      const comb=String(g("Ad Soyad")||g("AdSoyad")||"").trim();
      if(!ad&&!soyad&&comb){const p=comb.split(/\s+/);soyad=p.length>1?p.pop():"";ad=p.join(" ");}
      if(!ad&&!soyad)return;
      const okul=String(g("Kulüp")||g("Kulup")||g("Okul")||"").trim();
      const rec={ad,soyad,adSoyad:(ad+" "+soyad).trim(),soyadAd:(soyad+" "+ad).trim(),
        il:String(g("İl")||g("Il")||"").trim(),okul,kulup:okul,
        tckn:String(g("TCKN")||"").trim(),lisans:String(g("Lisans No")||g("Lisans")||"").trim(),
        yarismaTuru:isMulti(cat)?"takim":"ferdi",appId:"excel_import"};
      if(isMulti(cat))rec.grupNo=Math.max(1,parseInt(g("Grup No")||g("GrupNo")||1)||1);
      const key=push(ref(db,`${BASE}/${comp}/sporcular/${cat}`)).key;
      up[`${BASE}/${comp}/sporcular/${cat}/${key}`]=rec;
      up[`${BASE}/${comp}/kategoriler/${cat}`]=comps[comp]?.kategoriler?.[cat]||{name:catKategori(cat)};
      ok++;
    });
    if(!ok){toast("Geçerli satır yok. 'Kategori' sütununu kontrol et"+(badCats.size?": "+[...badCats].slice(0,3).join(", "):""),"err");return;}
    await update(ref(db),up);
    let msg=ok+" sporcu içeri aktarıldı ✓";
    if(bad)msg+=` — ${bad} satır kategori tanınmadı (${[...badCats].slice(0,3).join(", ")})`;
    toast(msg,bad?"":"ok");
  }catch(err){toast("İçe aktarma hatası: "+(err?.message||err),"err");}
}
// Liste modu: (Gün, Çıkış Sırası) ile birleştir, sıraya göre yükle (kaydetmeden items'a)
function importList(rows,G,map,norm){
  const badCats=new Set(); let bad=0; const parsed=[];
  rows.forEach(row=>{
    const g=G(row);
    const cat=map[norm(g("Kategori")||"")];
    const sira=parseInt(g("Çıkış Sırası")||g("Cikis Sirasi")||g("Sıra"));
    if(!cat||isNaN(sira)){ if(String(g("Kategori")||"").trim())badCats.add(g("Kategori")); bad++; return; }
    let ad=String(g("Ad")||"").trim(), soyad=String(g("Soyad")||"").trim();
    const comb=String(g("Ad Soyad")||"").trim();
    if(!ad&&!soyad&&comb){const p=comb.split(/\s+/);soyad=p.length>1?p.pop():"";ad=p.join(" ");}
    const okul=String(g("Kulüp")||g("Kulup")||g("Okul")||"").trim();
    const time=String(g("Başlangıç Saati")||g("Baslangic Saati")||g("Saat")||"").trim();
    parsed.push({gun:String(g("Gün")||g("Gun")||"").trim()||"Tek Gün",sira,cat,time,
      member:{ad,soyad,adSoyad:(ad+" "+soyad).trim(),soyadAd:(soyad+" "+ad).trim(),il:String(g("İl")||g("Il")||"").trim(),okul,kulup:okul,tckn:String(g("TCKN")||"").trim(),lisans:String(g("Lisans No")||g("Lisans")||"").trim()},
      grupNo:parseInt(g("Grup No")||g("GrupNo"))||sira});
  });
  if(!parsed.length){toast("Geçerli satır yok. Kategori/Çıkış Sırası sütununu kontrol et"+(badCats.size?": "+[...badCats].slice(0,2).join(", "):""),"err");return;}
  importedByDay={};
  parsed.forEach(p=>{
    const day=(importedByDay[p.gun]=importedByDay[p.gun]||{});
    if(!day[p.sira]) day[p.sira]={cat:p.cat,type:typeOf(p.cat),okul:p.member.okul,grupNo:isMulti(p.cat)?p.grupNo:null,_sira:p.sira,_impTime:p.time,_gun:p.gun,members:[]};
    const comp2=day[p.sira];
    const nkey=(p.member.adSoyad||"").toLocaleLowerCase("tr").replace(/\s+/g,"");
    if(nkey&&comp2.members.some(x=>(x.adSoyad||"").toLocaleLowerCase("tr").replace(/\s+/g,"")===nkey))return; // aynı üye tekrar (örtüşen sayfa)
    const m={...p.member,yarismaTuru:isMulti(p.cat)?"takim":"ferdi"}; if(isMulti(p.cat))m.grupNo=comp2.grupNo;
    comp2.members.push(m);
  });
  const days=Object.keys(importedByDay);
  $("importDaySel").innerHTML=days.map((d,i)=>`<option value="${i}">${esc(d)} (${Object.keys(importedByDay[d]).length})</option>`).join("");
  $("dayWrap").style.display=days.length>1?"":"none";
  loadImportedDay(days[0]);
  const tot=days.reduce((s,d)=>s+Object.keys(importedByDay[d]).length,0);
  toast(`Liste yüklendi: ${tot} yarışmacı (${parsed.length} satır birleşti)${days.length>1?` — ${days.length} gün, "${days[0].split(",")[0]}" gösteriliyor`:""}${bad?` · ${bad} satır atlandı`:""}`,bad?"":"ok");
}
function loadImportedDay(day){
  const d=importedByDay[day]; if(!d)return;
  items=Object.values(d).sort((a,b)=>a._sira-b._sira);
  breaks=[]; importMode=false;
  const haveTimes=items.length>0 && items.every(it=>/^\d{1,2}:\d{2}$/.test(it._impTime||""));
  if($("keepTimes")?.checked!==false && haveTimes){
    // Taban saat + aralık + molaları içe aktarılan saatlerden TÜRET -> hesaplanan mod birebir aynı saatleri üretir
    // (böylece manuel mola ekleyince saatler doğru kayar)
    $("baseTime").value=items[0]._impTime;
    const gaps={}; for(let i=1;i<items.length;i++){const g=toMin(items[i]._impTime)-toMin(items[i-1]._impTime);if(g>0&&g<=20)gaps[g]=(gaps[g]||0)+1;}
    const iv=Object.keys(gaps).sort((a,b)=>gaps[b]-gaps[a])[0]; if(iv)$("interval").value=iv;
    const ivN=parseInt($("interval").value)||3;
    for(let i=1;i<items.length;i++){const g=toMin(items[i]._impTime)-toMin(items[i-1]._impTime);if(g>ivN+1)breaks.push({after:i,dur:g-ivN,label:"ARA"});}
  }
  const iso=dayToISO(day); if(iso)$("listDate").value=iso;
  render(); checkRest();
}
function excelExport(){
  if(!items.length)return;
  if(!window.XLSX){toast("Excel bileşeni yüklenemedi (internet?).","err");return;}
  const rows=computeRows().filter(r=>r.type==="item");
  // Sayfa 1: "Çıkış Listesi" — bir satır = bir yarışmacı (PDF'teki gibi), yüklenebilir düz veri
  const s1=rows.map(r=>({
    "Çıkış Sırası":r.order,
    "Başlangıç Saati":r.time,
    "Sporcu":nameOf(r.it),
    "İl":(ilOf(r.it)||"").toLocaleUpperCase("tr"),
    "Kategori":catKategori(r.it.cat).toLocaleUpperCase("tr"),
    "Kulüp":r.it.members[0]?.okul||r.it.members[0]?.kulup||"",
    "Grup No":isMulti(r.it.cat)?(r.it.grupNo||1):""
  }));
  // Sayfa 2: "Sporcular" — bir satır = bir kişi (takım üyeleri ayrı), sistem/federasyon yüklemesi için
  const s2=[];
  rows.forEach(r=>{r.it.members.forEach((m,mi)=>s2.push({
    "Çıkış Sırası":r.order,
    "Başlangıç Saati":r.time,
    "Ad":m.ad||"",
    "Soyad":m.soyad||"",
    "Ad Soyad":m.adSoyad||((m.ad||"")+" "+(m.soyad||"")).trim(),
    "TCKN":m.tckn||"",
    "Lisans No":m.lisans||m.lisansNo||"",
    "İl":(m.il||"").toLocaleUpperCase("tr"),
    "Kulüp":m.okul||m.kulup||"",
    "Kategori":catKategori(r.it.cat).toLocaleUpperCase("tr"),
    "Tür":r.it.members.length>1?"Takım üyesi":"Bireysel",
    "Grup No":isMulti(r.it.cat)?(r.it.grupNo||1):"",
    "Üye Sıra":r.it.members.length>1?mi+1:""
  }));});
  const wb=XLSX.utils.book_new();
  const w1=XLSX.utils.json_to_sheet(s1,{header:["Çıkış Sırası","Başlangıç Saati","Sporcu","İl","Kategori","Kulüp","Grup No"]});
  w1["!cols"]=[{wch:11},{wch:14},{wch:36},{wch:14},{wch:20},{wch:24},{wch:8}];
  XLSX.utils.book_append_sheet(wb,w1,"Çıkış Listesi");
  const w2=XLSX.utils.json_to_sheet(s2,{header:["Çıkış Sırası","Başlangıç Saati","Ad","Soyad","Ad Soyad","TCKN","Lisans No","İl","Kulüp","Kategori","Tür","Grup No","Üye Sıra"]});
  w2["!cols"]=[{wch:11},{wch:13},{wch:14},{wch:14},{wch:26},{wch:14},{wch:12},{wch:12},{wch:24},{wch:18},{wch:12},{wch:8},{wch:8}];
  XLSX.utils.book_append_sheet(wb,w2,"Sporcular");
  const fn=(compName||"cikis-listesi").replace(/[^a-zA-Z0-9ğüşöçıİĞÜŞÖÇ ]+/g,"_").replace(/\s+/g,"_").slice(0,50)+"_cikis_listesi.xlsx";
  XLSX.writeFile(wb,fn);
  toast("Excel indirildi ✓","ok");
}
function printList(){
  const rows=computeRows();
  const perDay=fmtD($("listDate").value||compMeta.baslangicTarihi,true);
  const logo=location.origin+"/logo.png";
  const body=rows.map(r=>{
    if(r.type==="break")return `<tr class="brk"><td colspan="5">${fmt(r.start)} - ${fmt(r.end)} / ${esc(r.label)}</td></tr>`;
    const it=r.it, cat=it.cat, cls=isMulti(cat)?"t":(/_erkek$/.test(cat)?"e":"k");
    return `<tr class="${cls}"><td class="c s">${r.order}</td><td class="n">${esc(nameOf(it)).toLocaleUpperCase("tr")}</td><td class="rd">${esc(ilOf(it)).toLocaleUpperCase("tr")}</td><td class="rd">${esc(catKategori(cat)).toLocaleUpperCase("tr")}</td><td class="c s">${r.time}</td></tr>`;
  }).join("");
  const html=`<!DOCTYPE html><html lang="tr"><head><meta charset="UTF-8"><title>Çıkış Listesi</title><style>
  *{font-family:Arial,Helvetica,sans-serif;box-sizing:border-box}body{margin:0;padding:16px;color:#111}
  .hd{position:relative;text-align:center;min-height:74px;margin-bottom:2px}
  .hd img{position:absolute;top:2px;left:6px;height:62px}
  .hd .l1{font-weight:800;font-style:italic;font-size:16px}
  .hd .l2{font-weight:800;font-style:italic;font-size:13px}
  .hd .l3{font-weight:800;font-style:italic;font-size:12px}
  .hd .l4{font-weight:800;font-style:italic;font-size:11px}
  .hd .l5{font-style:italic;font-size:10px}
  .sub{text-align:center;font-weight:800;font-size:10.5px;margin:10px 0 8px;line-height:1.55}
  table{width:100%;border-collapse:collapse;font-size:10px}
  th{background:#fff;border:1px solid #222;padding:6px;text-align:left;font-weight:800;font-size:9px}
  td{border:1px solid #b7b7b7;padding:4px 7px}
  td.c{text-align:center}td.s{color:#111;font-weight:600}td.n{padding-left:12px;color:#7d1220;font-weight:700}td.rd{color:#7d1220;font-weight:600}
  tr.k td{background:#fefdec}tr.e td{background:#e9f1fb}tr.t td{background:#eaf7ee}
  tr.brk td{background:#fbe7d6;text-align:center;font-weight:800;font-size:10px;border:1px solid #222;color:#333}
  th:first-child,td:first-child{width:70px}th:nth-child(3),td:nth-child(3){width:100px}th:nth-child(4),td:nth-child(4){width:120px}th:last-child,td:last-child{width:95px}
  @media print{body{padding:6px}@page{margin:10mm}}
  </style></head><body>
  <div class="hd"><img src="${logo}" alt="TCF">
    <div class="l1">TÜRKİYE CİMNASTİK FEDERASYONU</div>
    <div class="l2">AEROBİK CİMNASTİK</div>
    <div class="l3">${esc(ageGroupLabel())}</div>
    <div class="l4">${esc((compName||"").toLocaleUpperCase("tr"))}</div>
    <div class="l5">${esc(dateRange())}${compMeta.il?" / "+esc((compMeta.il||"").toLocaleUpperCase("tr")):""}</div>
  </div>
  <div class="sub">${esc(perDay)},<br>SPORCU ÇIKIŞ LİSTESİ</div>
  <table><thead><tr><th>ÇIKIŞ SIRASI</th><th>SPORCU</th><th>İL</th><th>KATEGORİ</th><th>BAŞLANGIÇ SAATİ</th></tr></thead><tbody>${body}</tbody></table>
  </body></html>`;
  const w=window.open("","_blank");
  w.document.write(html); w.document.close();
  setTimeout(()=>{w.focus();w.print();},500);
}

const qc=new URLSearchParams(location.search).get("comp");
if(qc){comp=qc;setTimeout(()=>{if(comps[comp])$("compSel").value=comp;},600);}

return()=>{__subs.forEach(u=>{try{u()}catch(e){}});__iv.forEach(i=>clearInterval(i));__to.forEach(i=>clearTimeout(i))}}
export default function AerobikCikisListesiPage(){const r=R.useRef(null);R.useEffect(()=>{let live=!0,stop=null;r.current.innerHTML=HTML;start(()=>live).then(f=>{live?stop=f:f&&f()});return()=>{live=!1;stop&&stop()}},[]);return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:CSS}),e.jsx("div",{ref:r,className:"lvCS"})]})}
