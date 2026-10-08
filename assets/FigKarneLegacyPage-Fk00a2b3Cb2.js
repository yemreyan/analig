import"./i18n-Tr01a2b3Cb2.js";import{j as e,d as db}from"./main-C2LpyYUGCb2.js";import{r as R}from"./vendor-react-Cxw6bqwhCb2.js";import{l as _fb_get,o as _fb_onValue,k as _fb_ref}from"./vendor-firebase-940mxgRVCb2.js";import"./modulepreload-polyfill-B5Qt9EMXCb2.js";
// FIG HAKEM KARNESİ — eski /fig-karne.html sayfasının uygulama içi sürümü.
const CSS=".lvFK *,.lvFK *::before,.lvFK *::after{box-sizing:border-box;margin:0;padding:0}.lvFK{--bg:#0a0e1a;--panel:#131a2b;--panel2:#1b2438;--line:#2a3550;--txt:#e8edf7;--muted:#8b97b3;--accent:#6366f1;--ok:#22c55e;--warn:#ef4444;--gold:#fbbf24}.lvFK{font-family:'Plus Jakarta Sans',system-ui,sans-serif;background:var(--bg);color:var(--txt);min-height:100vh}.lvFK .topbar{position:sticky;top:0;z-index:20;background:rgba(10,14,26,.92);backdrop-filter:blur(10px);border-bottom:1px solid var(--line);padding:.7rem 1rem;display:flex;align-items:center;gap:1rem;flex-wrap:wrap}.lvFK .brand{display:flex;align-items:center;gap:.55rem;font-weight:800}.lvFK .brand .material-icons-round{color:var(--gold)}.lvFK select{background:var(--panel2);color:var(--txt);border:1px solid var(--line);border-radius:10px;padding:.5rem .8rem;font:inherit;font-size:.85rem;font-weight:700;cursor:pointer;max-width:340px}.lvFK .wrap{max-width:1100px;margin:0 auto;padding:1rem}.lvFK .bar{display:flex;gap:.6rem;flex-wrap:wrap;align-items:center;margin-bottom:1rem}.lvFK .btn{display:inline-flex;align-items:center;gap:.4rem;border:none;border-radius:10px;padding:.6rem 1rem;font:inherit;font-weight:800;font-size:.85rem;cursor:pointer;color:#fff;background:var(--accent)}.lvFK .btn:hover{filter:brightness(1.1)}.lvFK .btn:disabled{opacity:.5;cursor:default}.lvFK .btn--all{background:var(--gold);color:#3a2c00}.lvFK .count{color:var(--muted);font-weight:700;font-size:.85rem}.lvFK table{width:100%;border-collapse:collapse}.lvFK th,.lvFK td{padding:.55rem .7rem;text-align:left;font-size:.84rem;border-bottom:1px solid rgba(40,52,79,.6)}.lvFK th{color:var(--muted);font-weight:800;font-size:.72rem;text-transform:uppercase;letter-spacing:.5px;background:#0d1526;position:sticky;top:52px}.lvFK tbody tr:hover{background:rgba(255,255,255,.02)}.lvFK .num{text-align:center;font-variant-numeric:tabular-nums;font-weight:700}.lvFK .pill{display:inline-block;padding:.2rem .55rem;border-radius:999px;font-weight:800;font-size:.72rem}.lvFK .g-cok-iyi{background:rgba(34,197,94,.16);color:#86efac}.lvFK .g-iyi{background:rgba(132,204,22,.16);color:#bef264}.lvFK .g-kabul{background:rgba(234,179,8,.16);color:#fde047}.lvFK .g-sinirda{background:rgba(249,115,22,.16);color:#fdba74}.lvFK .g-incelenmeli{background:rgba(239,68,68,.16);color:#fca5a5}.lvFK .rowbtn{background:var(--panel2);border:1px solid var(--line);color:var(--txt);border-radius:8px;padding:.35rem .7rem;font:inherit;font-weight:800;font-size:.78rem;cursor:pointer}.lvFK .rowbtn:hover{border-color:var(--accent)}.lvFK .notice{text-align:center;color:var(--muted);padding:3rem 1rem;font-weight:600}.lvFK .warn-il{color:#fca5a5;font-weight:800}.lvFK .toast{position:fixed;bottom:1.2rem;left:50%;transform:translateX(-50%);background:var(--panel2);border:1px solid var(--line);color:var(--txt);padding:.7rem 1.1rem;border-radius:12px;font-weight:700;box-shadow:0 10px 30px rgba(0,0,0,.4);opacity:0;transition:.25s;pointer-events:none;z-index:50}.lvFK .toast.show{opacity:1}.lvFK .hint{color:var(--muted);font-size:.8rem;font-weight:600;margin-bottom:.6rem}.lvFK{position:fixed;inset:0;z-index:60;overflow:auto}";
const HTML="<div class=\"topbar\">\n  <div class=\"brand\"><span class=\"material-icons-round\">fact_check</span> WG HAKEM KARNESİ</div>\n  <select id=\"compSel\" style=\"margin-left:auto\"><option value=\"\">Yarışma yükleniyor…</option></select>\n  <select id=\"catSel\"><option value=\"\">Tüm kategoriler</option></select>\n  <select id=\"aletSel\"><option value=\"\">Tüm aletler</option></select>\n</div>\n<div class=\"wrap\">\n  <div class=\"bar\">\n    <button id=\"allBtn\" class=\"btn btn--all\" disabled><span class=\"material-icons-round\" style=\"font-size:1.1rem\">picture_as_pdf</span> Tüm Karneler (tek PDF)</button>\n    <span id=\"count\" class=\"count\"></span>\n  </div>\n  <div class=\"hint\">Her satır = bir isimli hakem × alet. Kontrol = panel (trimmed-mean E). Hakem notu = 10 − kendi kesintisi. PDF, WG \"Individual Panel Judging Report\" düzeninde (nokta grafiği + aynı-il adaleti).</div>\n  <div id=\"list\"></div>\n</div>\n<div id=\"toast\" class=\"toast\"></div>";
const EXT=["https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js", "https://cdn.jsdelivr.net/npm/jspdf-autotable@3.8.2/dist/jspdf.plugin.autotable.min.js"];
const __ld=s=>new Promise(r=>{if(document.querySelector(`script[data-gx-src="${s}"]`))return r();const t=document.createElement("script");t.src=s;t.setAttribute("data-gx-src",s);t.onload=()=>r();t.onerror=()=>r();document.head.appendChild(t)});
async function start(alive){for(const s of EXT)await __ld(s);if(!alive())return()=>{};const __subs=[],__iv=[],__to=[];const setInterval=(...a)=>{const i=window.setInterval(...a);__iv.push(i);return i};const setTimeout=(...a)=>{const i=window.setTimeout(...a);__to.push(i);return i};const get=_fb_get;const onValue=(...a)=>{const u=_fb_onValue(...a);typeof u==="function"&&__subs.push(u);return u};const ref=_fb_ref;



const $ = id => document.getElementById(id);
const params = new URLSearchParams(location.search);
const ALET_TR = { yer:"Yer", atlama:"Atlama", asimetrik:"Asimetrik Paralel", denge:"Denge", halka:"Halka", kulplu:"Kulplu Beygir", paralel:"Paralel Bar", barfiks:"Barfiks", mantar:"Mantar", sirik:"Sırık" };
const ALET_EN = { yer:"Floor Exercise", atlama:"Vault", asimetrik:"Uneven Bars", denge:"Balance Beam", halka:"Rings", kulplu:"Pommel Horse", paralel:"Parallel Bars", barfiks:"Horizontal Bar", mantar:"Mushroom", sirik:"Pole Vault" };
const POS_LABEL = { e1:"E1", e2:"E2", e3:"E3", e4:"E4" };
const tr = s => String(s==null?"":s).replace(/ı/g,"i").replace(/İ/g,"I").replace(/ş/g,"s").replace(/Ş/g,"S").replace(/ğ/g,"g").replace(/Ğ/g,"G").replace(/ü/g,"u").replace(/Ü/g,"U").replace(/ö/g,"o").replace(/Ö/g,"O").replace(/ç/g,"c").replace(/Ç/g,"C");
const esc = s => String(s==null?"":s).replace(/</g,"&lt;");
function toast(m){ const t=$("toast"); t.textContent=m; t.className="toast show"; setTimeout(()=>t.className="toast",2200); }
let comps={}, comp="", refsData={}, compData=null;
let logoData=null;
const reportDate=new Date().toLocaleString("tr-TR",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"});
(async()=>{ try{ const r=await fetch("/logo.png"); if(r.ok){ const bl=await r.blob(); logoData=await new Promise(res=>{const fr=new FileReader();fr.onload=()=>res(fr.result);fr.readAsDataURL(bl);}); } }catch(e){} })();
const NAVY=[28,37,64], TCFRED=[200,16,42], ORANGE=[210,120,20];
let changeMap={};

// --- metrikler ---
function trimmedMean(ds){ ds=ds.filter(d=>d!=null&&!isNaN(d)); if(ds.length>=4){ const s=[...ds].sort((a,b)=>a-b); return s.slice(1,-1).reduce((a,b)=>a+b,0)/(s.length-2); } return ds.length?ds.reduce((a,b)=>a+b,0)/ds.length:0; }
function isCounted(ds,myd){ ds=ds.filter(d=>d!=null); if(ds.length<4) return true; const s=[...ds].sort((a,b)=>a-b); return myd!==s[0]&&myd!==s[s.length-1]; }
function discPts(d){ d=Math.abs(d); return d<=.1?1:d<=.2?.85:d<=.3?.7:d<=.5?.45:d<=.7?.2:0; }
function discColor(d){ d=Math.abs(d); return d<=.1?[34,197,94]:d<=.2?[139,195,74]:d<=.3?[158,157,36]:d<=.5?[141,110,99]:d<=.7?[211,47,47]:[183,28,28]; }
function grade(acc){ return acc>=.85?["Cok Iyi (Very Good)","g-cok-iyi"]:acc>=.70?["Iyi (Good)","g-iyi"]:acc>=.55?["Kabul Edilebilir (Acceptable)","g-kabul"]:acc>=.40?["Sinirda (Marginal)","g-sinirda"]:["Incelenmeli (Review)","g-incelenmeli"]; }
function gradeShort(acc){ return acc>=.85?["Çok İyi","g-cok-iyi"]:acc>=.70?["İyi","g-iyi"]:acc>=.55?["Kabul","g-kabul"]:acc>=.40?["Sınırda","g-sinirda"]:["İncelenmeli","g-incelenmeli"]; }
function fairnessLabel(d){ if(Math.abs(d)<0.08) return "Neutral"; const m=Math.abs(d)<0.2?"Slight":Math.abs(d)<0.4?"Moderate":"Strong"; return m+(d>0?" positive":" negative"); }
function fairnessVerdictTR(avgSigned,n){ if(n===0) return ["—","#8b97b3"]; if(Math.abs(avgSigned)<0.08) return ["Dengeli","#86efac"]; const dir=avgSigned>0?"yumuşak (lehte)":"sert (aleyhte)"; const mag=Math.abs(avgSigned)<0.2?"Hafif":Math.abs(avgSigned)<0.4?"Orta":"Belirgin"; return [`${mag} ${dir}`, avgSigned>0?"#fbbf24":"#fca5a5"]; }

function evalJudgeApparatus(cat, alet, pos, judge){
  const jil=((refsData[judge.id]?.il)||"").trim();
  const aths=compData.puanlar?.[cat]?.[alet]||{};
  const spCat=compData.sporcular?.[cat]||{};
  const rows=[];
  Object.entries(aths).forEach(([aid,r])=>{
    if(!r||typeof r!=="object"||r.durum!=="tamamlandi") return;
    const myd=r[pos]; if(myd==null||isNaN(myd)) return;
    const ds=[r.e1,r.e2,r.e3,r.e4];
    let ctrl=r.calc_E; if(ctrl==null) ctrl=10-trimmedMean(ds);
    const mark=10-Number(myd), disc=mark-ctrl;
    const a=spCat[aid]||{};
    const name=((a.ad||"")+" "+(a.soyad||"")).trim()||a.adSoyad||aid;
    const okul=a.okul||a.kulup||"";
    const ail=(a.il||okul||"").trim();
    const chg=(changeMap?.[cat]?.[alet]?.[pos]?.[aid])||0;
    rows.push({aid,name,okul,il:ail,ctrl:+ctrl.toFixed(3),mark:+mark.toFixed(3),disc:+disc.toFixed(3),chg,counted:isCounted(ds,Number(myd)),sameIl:jil&&ail&&ail.toLocaleLowerCase("tr")===jil.toLocaleLowerCase("tr")});
  });
  rows.sort((a,b)=>b.ctrl-a.ctrl);
  const n=rows.length;
  const totalChanges=rows.reduce((s,r)=>s+r.chg,0), athChanged=rows.filter(r=>r.chg>0).length;
  const acc=n?rows.reduce((s,r)=>s+discPts(r.disc),0)/n:0;
  const avgAbs=n?rows.reduce((s,r)=>s+Math.abs(r.disc),0)/n:0;
  const avgSigned=n?rows.reduce((s,r)=>s+r.disc,0)/n:0;
  const same=rows.filter(r=>r.sameIl);
  const sameAvgSigned=same.length?same.reduce((s,r)=>s+r.disc,0)/same.length:0;
  return {cat,alet,pos,judge,jil,rows,n,acc,avgAbs,avgSigned,same,sameAvgSigned,totalChanges,athChanged};
}
function buildUnits(){
  const units=[]; const hak=compData.hakemler||{};
  const cf=$("catSel").value, af=$("aletSel").value;
  Object.entries(hak).forEach(([cat,alets])=>{ if(cf&&cat!==cf) return;
    Object.entries(alets||{}).forEach(([alet,panel])=>{ if(af&&alet!==af) return;
      ["e1","e2","e3","e4"].forEach(pos=>{ const j=panel?.[pos]; if(!j||!j.id) return; const u=evalJudgeApparatus(cat,alet,pos,j); if(u.n>0) units.push(u); });
    });
  });
  return units;
}

// ================= PDF (FIG düzeni) =================
function drawUnit(doc, u, first){
  const PW=210, PH=297, MB=7, IN=MB+6;
  const catName=compData.kategoriler?.[u.cat]?.name||u.cat;
  const aletEn=ALET_EN[u.alet]||u.alet;
  const gender=/k[iı]z|kad/i.test(u.cat)?"Women Artistic Gymnastics":"Men Artistic Gymnastics";
  const locYear=((compData.il||"")+" "+(compData.baslangicTarihi||"").slice(0,4)).trim();
  const frame=()=>{ doc.setDrawColor(90); doc.setLineWidth(0.5); doc.roundedRect(MB,MB,PW-2*MB,PH-2*MB,2,2,"S"); doc.setLineWidth(0.2); };
  const foot=()=>{ const fy=PH-MB-9.5; doc.setDrawColor(215); doc.setLineWidth(0.3); doc.line(IN,fy,PW-IN,fy); doc.setLineWidth(0.2);
    doc.setFont("helvetica","bold"); doc.setFontSize(7); doc.setTextColor(...NAVY); doc.text("TURKIYE CIMNASTIK FEDERASYONU", IN, fy+4);
    doc.setFont("helvetica","normal"); doc.setFontSize(6.1); doc.setTextColor(140); doc.text("Hakem Dogruluk Karnesi (WG uyarlamasi)  |  Kontrol = panel trimmed-mean E, Not = 10 - kesinti, Sapma = Not - Kontrol.", IN, fy+7.3);
    doc.setFontSize(6.4); doc.setTextColor(140); doc.text("Rapor: "+reportDate, PW-IN, fy+4, {align:"right"}); };
  const hline=(yy)=>{ doc.setDrawColor(210); doc.setLineWidth(0.3); doc.line(IN,yy,PW-IN,yy); doc.setLineWidth(0.2); };
  const secH=(txt,yy)=>{ doc.setFillColor(...TCFRED); doc.rect(IN, yy-3.3, 1.5, 3.9, "F"); doc.setFont("helvetica","bold"); doc.setFontSize(10.5); doc.setTextColor(...NAVY); doc.text(txt, IN+4, yy); };
  const newpage=()=>{ doc.addPage(); frame(); };

  if(!first) doc.addPage();
  frame();
  if(logoData){ try{ doc.addImage(logoData,"PNG", MB+4, MB+3, 13, 13); }catch(e){} }
  let y=MB+9;
  doc.setFont("helvetica","bold"); doc.setFontSize(13.5); doc.setTextColor(...NAVY);
  doc.text("INDIVIDUAL PANEL JUDGING REPORT", PW/2, y, {align:"center"}); y+=5;
  doc.setFont("helvetica","normal"); doc.setFontSize(8.5); doc.setTextColor(110);
  doc.text(tr("Turkiye Cimnastik Federasyonu - Hakem Dogruluk Karnesi"), PW/2, y, {align:"center"}); y+=4.5;
  doc.setDrawColor(...TCFRED); doc.setLineWidth(0.9); doc.line(MB+4, y, PW-MB-4, y); doc.setLineWidth(0.2); y+=7;
  doc.setFont("helvetica","bold"); doc.setFontSize(10.5); doc.setTextColor(...NAVY);
  doc.text(tr(gender), IN, y); y+=5.5;
  doc.text(tr(compData.isim||comp), IN, y); y+=5.5;
  if(locYear){ doc.setFont("helvetica","normal"); doc.setFontSize(9.5); doc.setTextColor(60); doc.text(tr(locYear), IN, y); y+=5; }
  y+=1; hline(y); y+=6;
  doc.setFont("helvetica","bold"); doc.setFontSize(11); doc.setTextColor(...NAVY);
  doc.text(tr(`${aletEn} - ${catName}`), IN, y); y+=6;
  doc.setFontSize(9.5); doc.text("Execution panel", IN, y); y+=5;
  doc.setFont("helvetica","normal"); doc.setFontSize(8.5); doc.setTextColor(90);
  doc.text(tr("Evaluation based on 4 panel judges (trimmed-mean E)"), IN, y); y+=6;
  hline(y); y+=6;
  doc.setFont("helvetica","bold"); doc.setFontSize(11); doc.setTextColor(...NAVY);
  doc.text(tr(u.judge.name)+(u.jil?` (${tr(u.jil)})`:" (il yok)"), IN, y); y+=5;
  doc.setFont("helvetica","normal"); doc.setFontSize(9); doc.setTextColor(110);
  doc.text(`Position ${POS_LABEL[u.pos]}`, IN, y); y+=6.5;
  // ---- KPI kart şeridi ----
  const [gLabel]=grade(u.acc);
  const ac=u.acc>=.7?[34,150,60]:u.acc>=.55?[180,140,0]:[200,60,40];
  const ky=y, usable=PW-2*IN, kgap=3.5, cw=(usable-3*kgap)/4;
  const kpi=(ci,label,val,vcol,sub)=>{ const x=IN+ci*(cw+kgap);
    doc.setDrawColor(223,227,234); doc.setFillColor(248,249,251); doc.setLineWidth(0.3); doc.roundedRect(x,ky,cw,16,1.8,1.8,"FD"); doc.setLineWidth(0.2);
    doc.setFillColor(...vcol); doc.roundedRect(x,ky,1.6,16,0.8,0.8,"F");
    doc.setFont("helvetica","bold"); doc.setFontSize(6); doc.setTextColor(140); doc.text(label,x+4,ky+4.6);
    const vs=String(val); const fs=vs.length>7?8.5:vs.length>4?10.5:14; doc.setFont("helvetica","bold"); doc.setFontSize(fs); doc.setTextColor(...vcol); doc.text(vs,x+4,ky+11);
    if(sub){ doc.setFont("helvetica","normal"); doc.setFontSize(5.9); doc.setTextColor(150); doc.text(tr(sub),x+4,ky+14.2); } };
  kpi(0,"EXERCISES",u.n,NAVY,"scored");
  kpi(1,"ACCURACY SCORE",u.acc.toFixed(2),ac,gLabel);
  kpi(2,"AVG DISCREPANCY",(u.avgSigned>=0?"+":"")+u.avgSigned.toFixed(2),u.avgAbs<0.15?[34,150,60]:u.avgAbs<0.3?[180,140,0]:[200,60,40],"signed mean");
  kpi(3,"SCORE CHANGES",u.totalChanges,u.totalChanges>0?ORANGE:[34,150,60],u.totalChanges>0?`${u.athChanged} sporcu duzeltildi`:"duzeltme yok");
  y=ky+16+7;
  secH("Accuracy per exercise", y); y+=7;

  // ---- nokta grafiği ----
  const plotL=IN+40, plotR=PW-IN-30, legendX=plotR+5;
  let vals=[]; u.rows.forEach(r=>vals.push(r.ctrl,r.mark));
  let sMax=Math.ceil((Math.max(...vals)+0.15)*5)/5, sMin=Math.floor((Math.min(...vals)-0.15)*5)/5;
  if(sMax-sMin<0.6){ sMax+=0.3; sMin-=0.3; }
  const sx=s=>plotL+(sMax-s)/(sMax-sMin)*(plotR-plotL);
  const rowH=Math.max(3.1, Math.min(5.0, 4.5));
  const bottomLimit=PH-MB-14;
  const legend=(ly)=>{
    doc.setFont("helvetica","normal"); doc.setFontSize(7); doc.setTextColor(60);
    doc.setFillColor(37,99,235); doc.circle(legendX+1.5, ly, 1.3, "F"); doc.text("Control score", legendX+4, ly+1);
    let yy=ly+7; doc.setFont("helvetica","bold"); doc.setFontSize(6.5); doc.text("Judging mark", legendX, yy); doc.text("discrepancy", legendX, yy+3.2); doc.setFont("helvetica","normal"); yy+=7;
    [["Very high",[183,28,28]],["High",[211,47,47]],["Moderate",[141,110,99]],["Average",[158,157,36]],["Low",[139,195,74]],["None",[34,197,94]]].forEach(([lab,col])=>{ doc.setFillColor(...col); doc.circle(legendX+1.5, yy, 1.3, "F"); doc.setTextColor(60); doc.setFont("helvetica","normal"); doc.setFontSize(6.5); doc.text(lab, legendX+4, yy+1); yy+=4.2; });
    yy+=3; doc.setFillColor(...ORANGE); doc.circle(legendX+1.5, yy, 1.4, "F"); doc.setFont("helvetica","bold"); doc.setFontSize(5); doc.setTextColor(255); doc.text("n",legendX+1.5,yy+0.75,{align:"center"}); doc.setFont("helvetica","normal"); doc.setFontSize(6.3); doc.setTextColor(60); doc.text("Score changed (n x)", legendX+4, yy+1);
  };
  const _range=sMax-sMin, _lblStep=_range>4?1:_range>2?0.5:0.2;
  const ticks=(topY,botY)=>{
    doc.setDrawColor(235); doc.setLineWidth(0.15);
    for(let s=Math.ceil(sMin/0.2)*0.2; s<=sMax+1e-9; s+=0.2){ const x=sx(s); doc.line(x,topY,x,botY); }
    doc.setFont("helvetica","normal"); doc.setFontSize(6.5); doc.setTextColor(110);
    doc.text("Judging mark / control score", (plotL+plotR)/2, topY-3.5, {align:"center"});
    for(let s=Math.ceil(sMin/_lblStep)*_lblStep; s<=sMax+1e-9; s+=_lblStep){ const x=sx(s); doc.text(s.toFixed(1), x, topY-0.8, {align:"center"}); }
    doc.setDrawColor(150); doc.setLineWidth(0.25); doc.rect(plotL,topY,plotR-plotL,botY-topY,"S");
  };
  let idx=0, segTop=y+3, legDrawn=false;
  while(idx<u.rows.length){
    if(idx>0){ newpage(); segTop=MB+16; }
    const perPage=Math.max(1, Math.floor((bottomLimit-segTop)/rowH));
    const end=Math.min(u.rows.length, idx+perPage);
    const botY=segTop+(end-idx)*rowH;
    ticks(segTop, botY);
    if(!legDrawn){ legend(segTop+3); legDrawn=true; }
    for(let k=idx;k<end;k++){
      const r=u.rows[k], ry=segTop+(k-idx)*rowH+rowH/2;
      if(r.chg>0){ doc.setFillColor(...ORANGE); doc.circle(IN+1.6, ry, 1.35, "F"); doc.setFont("helvetica","bold"); doc.setFontSize(5.4); doc.setTextColor(255); doc.text(String(r.chg), IN+1.6, ry+0.85, {align:"center"}); }
      doc.setFont("helvetica","normal"); doc.setFontSize(6); doc.setTextColor(r.chg>0?ORANGE[0]:50, r.chg>0?ORANGE[1]:50, r.chg>0?ORANGE[2]:50);
      doc.text(tr(r.name).slice(0,24), plotL-2, ry+0.6, {align:"right"});
      doc.setFillColor(37,99,235); doc.circle(sx(r.ctrl), ry, 1.15, "F");
      doc.setFillColor(...discColor(r.disc)); doc.circle(sx(r.mark), ry, 1.15, "F");
    }
    doc.setFont("helvetica","normal"); doc.setFontSize(6.5); doc.setTextColor(110);
    doc.text("Judging mark / control score", (plotL+plotR)/2, botY+3.5, {align:"center"});
    idx=end; segTop=botY+9;
  }
  // ---- Score corrections (not değiştirme) ----
  let y2=segTop+3;
  if(y2>PH-MB-50){ newpage(); y2=MB+16; }
  secH(tr("Score corrections (not degistirme)"), y2); y2+=6;
  const chgRows=u.rows.filter(r=>r.chg>0).sort((a,b)=>b.chg-a.chg);
  if(chgRows.length===0){ doc.setFont("helvetica","normal"); doc.setFontSize(9); doc.setTextColor(90); doc.text(tr("Bu hakem notlarini hic degistirmemis (0 duzeltme)."), IN, y2); y2+=8; }
  else {
    doc.setFont("helvetica","normal"); doc.setFontSize(8.5); doc.setTextColor(90);
    doc.text(tr(`Toplam ${u.totalChanges} not degistirme - ${u.athChanged} sporcuda.`), IN, y2); y2+=5;
    doc.autoTable({ startY:y2, head:[["Athlete","Club / City","Changes","Final mark","Control","Discrepancy"]],
      body:chgRows.map(r=>[tr(r.name),tr((r.okul||"")+(r.il?" / "+r.il:"")),r.chg+"x",r.mark.toFixed(2),r.ctrl.toFixed(2),(r.disc>=0?"+":"")+r.disc.toFixed(2)]),
      styles:{font:"helvetica",fontSize:7.5,cellPadding:1.3,textColor:30}, headStyles:{fillColor:ORANGE,textColor:255,fontSize:7,fontStyle:"bold"},
      columnStyles:{2:{halign:"center"},3:{halign:"center"},4:{halign:"center"},5:{halign:"center"}}, margin:{left:IN,right:IN},
      didParseCell:(d)=>{ if(d.section==="body"&&d.column.index===2){ d.cell.styles.textColor=ORANGE; d.cell.styles.fontStyle="bold"; } } });
    y2=doc.lastAutoTable.finalY+7;
  }
  // ---- Out of consensus ----
  if(y2>PH-MB-55){ newpage(); y2=MB+16; }
  secH("Out of consensus evaluations", y2); y2+=6;
  const ooc=u.rows.filter(r=>Math.abs(r.disc)>0.7);
  if(ooc.length===0){ doc.setFont("helvetica","normal"); doc.setFontSize(9); doc.setTextColor(90); doc.text("None", IN, y2); y2+=8; }
  else {
    doc.autoTable({ startY:y2, head:[["Athlete","Club / City","Control score","Judging mark","Discrepancy"]],
      body:ooc.map(r=>[tr(r.name),tr((r.okul||"")+(r.il?" / "+r.il:"")),r.ctrl.toFixed(2),r.mark.toFixed(2),(r.disc>=0?"+":"")+r.disc.toFixed(2)]),
      styles:{font:"helvetica",fontSize:7.5,cellPadding:1.3,textColor:30}, headStyles:{fillColor:[130,45,45],textColor:255,fontSize:7,fontStyle:"bold"},
      columnStyles:{2:{halign:"center"},3:{halign:"center"},4:{halign:"center"}}, margin:{left:IN,right:IN} });
    y2=doc.lastAutoTable.finalY+7;
  }
  // ---- Same-nationality (aynı il) ----
  if(y2>PH-MB-50){ newpage(); y2=MB+16; }
  secH(tr("Same-nationality evaluations (ayni il)"), y2); y2+=6;
  if(u.same.length===0){ doc.setFont("helvetica","normal"); doc.setFontSize(9); doc.setTextColor(90); doc.text(u.jil?"None":"Hakem ili bilinmiyor", IN, y2); y2+=6; }
  else {
    doc.autoTable({ startY:y2, head:[["Athlete","City","Control score","Judging mark","Discrepancy","Fairness"]],
      body:u.same.map(r=>[tr(r.name),tr(r.il),r.ctrl.toFixed(2),r.mark.toFixed(2),(r.disc>=0?"+":"")+r.disc.toFixed(2),fairnessLabel(r.disc)]),
      styles:{font:"helvetica",fontSize:7.5,cellPadding:1.4,textColor:30}, headStyles:{fillColor:NAVY,textColor:255,fontSize:7,fontStyle:"bold"},
      columnStyles:{2:{halign:"center"},3:{halign:"center"},4:{halign:"center"}}, margin:{left:IN,right:IN},
      didParseCell:(d)=>{ if(d.section==="body"&&d.column.index===4){ const dv=u.same[d.row.index].disc; d.cell.styles.textColor=Math.abs(dv)<0.08?[100,100,100]:dv>0?[180,130,0]:[190,50,40]; d.cell.styles.fontStyle="bold"; } } });
    y2=doc.lastAutoTable.finalY+4;
    const [fv]=fairnessVerdictTR(u.sameAvgSigned,u.same.length);
    doc.setFont("helvetica","bold"); doc.setFontSize(8.5); doc.setTextColor(60);
    doc.text(tr(`Genel (kendi ili): ort. isaretli sapma ${u.sameAvgSigned>=0?"+":""}${u.sameAvgSigned.toFixed(3)}  ->  ${fv}`), IN, y2+1);
  }
  foot();
}

function makePDF(units, filename){
  if(!units.length){ toast("Karne verisi yok"); return; }
  const { jsPDF }=window.jspdf;
  const doc=new jsPDF({unit:"mm",format:"a4"});
  units.forEach((u,i)=>drawUnit(doc,u,i===0));
  doc.save(filename);
}

// ---- UI ----
onValue(ref(db,"competitions"), s=>{
  comps=s.val()||{};
  const es=Object.entries(comps).filter(([id,c])=>c&&c.hakemler).sort((a,b)=>(b[1].baslangicTarihi||"").localeCompare(a[1].baslangicTarihi||""));
  const sel=$("compSel");
  sel.innerHTML='<option value="">— Yarışma seçin —</option>'+es.map(([id,c])=>`<option value="${id}">${esc(c.isim||c.ad||id)}</option>`).join("");
  const want=comp||params.get("comp")||"";
  if(want&&comps[want]){ sel.value=want; if(want!==comp){ comp=want; loadComp(); } }
});
$("compSel").addEventListener("change",e=>{ comp=e.target.value; loadComp(); });
$("catSel").addEventListener("change",render);
$("aletSel").addEventListener("change",render);

async function loadComp(){
  $("list").innerHTML='<div class="notice">Yükleniyor…</div>'; $("allBtn").disabled=true;
  if(!comp){ $("list").innerHTML='<div class="notice">Yarışma seçin</div>'; return; }
  const [cSnap,rSnap,lSnap]=await Promise.all([ get(ref(db,`competitions/${comp}`)), get(ref(db,"referees")), get(ref(db,"logs")).catch(()=>({val:()=>({})})) ]);
  compData=cSnap.val()||{}; const rv=rSnap.val()||{};
  refsData={}; Object.entries(rv).forEach(([k,v])=>{ if(v&&typeof v==="object") refsData[k]=v; });
  // not değiştirme (score corrections): aynı (cat,alet,pozisyon,sporcu) için birden fazla judge_score_submit = değişiklik
  changeMap={}; const lv=lSnap.val()||{}; const _grp={};
  Object.values(lv).forEach(v=>{ if(!v||typeof v!=="object"||v.competitionId!==comp||v.type!=="judge_score_submit") return; if(!v.category||!v.alet||!v.field||!v.athleteId) return; const key=v.category+"|"+v.alet+"|"+v.field+"|"+v.athleteId; _grp[key]=(_grp[key]||0)+1; });
  Object.entries(_grp).forEach(([key,cnt])=>{ const chg=Math.max(0,cnt-1); if(chg<=0) return; const [cat,alet,field,aid]=key.split("|"); (changeMap[cat]=changeMap[cat]||{}); (changeMap[cat][alet]=changeMap[cat][alet]||{}); (changeMap[cat][alet][field]=changeMap[cat][alet][field]||{}); changeMap[cat][alet][field][aid]=chg; });
  const hak=compData.hakemler||{}; const cats=Object.keys(hak);
  $("catSel").innerHTML='<option value="">Tüm kategoriler</option>'+cats.map(c=>`<option value="${c}">${esc(compData.kategoriler?.[c]?.name||c)}</option>`).join("");
  const alets=[...new Set(cats.flatMap(c=>Object.keys(hak[c]||{})))];
  $("aletSel").innerHTML='<option value="">Tüm aletler</option>'+alets.map(a=>`<option value="${a}">${esc(ALET_TR[a]||a)}</option>`).join("");
  render();
}
let currentUnits=[];
function render(){
  if(!compData) return;
  currentUnits=buildUnits();
  $("allBtn").disabled=currentUnits.length===0;
  $("count").textContent=`${currentUnits.length} hakem × alet karnesi`;
  if(!currentUnits.length){ $("list").innerHTML='<div class="notice">Bu yarışmada hakem ataması / panel notu bulunamadı.</div>'; return; }
  $("list").innerHTML=`<table><thead><tr><th>Hakem</th><th>İl</th><th>Poz.</th><th>Alet</th><th>Kategori</th><th class="num">Egz.</th><th class="num">Değ.</th><th class="num">Ort. Sapma</th><th class="num">Accuracy</th><th>Aynı İl</th><th></th></tr></thead><tbody>${
    currentUnits.map((u,i)=>{ const [gl,gc]=gradeShort(u.acc); const [fv,fcol]=fairnessVerdictTR(u.sameAvgSigned,u.same.length); const ilWarn=u.same.length>0&&Math.abs(u.sameAvgSigned)>=0.2;
      return `<tr><td style="font-weight:800">${esc(u.judge.name)}</td><td class="${u.jil?'':'warn-il'}">${esc(u.jil||"?")}</td><td class="num">${POS_LABEL[u.pos]}</td><td>${esc(ALET_TR[u.alet]||u.alet)}</td><td style="color:var(--muted)">${esc(compData.kategoriler?.[u.cat]?.name||u.cat)}</td><td class="num">${u.n}</td><td class="num">${u.totalChanges>0?`<span style="color:#d87814;font-weight:800">${u.totalChanges}</span>`:'<span style="color:var(--muted)">0</span>'}</td><td class="num">${u.avgAbs.toFixed(3)}</td><td class="num"><span class="pill ${gc}">${u.acc.toFixed(2)} · ${gl}</span></td><td>${u.same.length?`<span style="color:${fcol};font-weight:700">${esc(fv)}</span> <span style="color:var(--muted)">(${u.same.length})</span>${ilWarn?' <span class="warn-il">⚠</span>':''}`:'<span style="color:var(--muted)">—</span>'}</td><td><button class="rowbtn" data-i="${i}">PDF</button></td></tr>`;
    }).join("")
  }</tbody></table>`;
  $("list").querySelectorAll(".rowbtn").forEach(b=>b.addEventListener("click",()=>{ const u=currentUnits[+b.dataset.i]; makePDF([u], `HakemKarnesi_${tr(u.judge.name).replace(/\s+/g,"_")}_${u.alet}_${POS_LABEL[u.pos]}.pdf`); }));
}
$("allBtn").addEventListener("click",()=>{ if(currentUnits.length) makePDF(currentUnits, `FIG_Hakem_Karneleri_${tr(compData.isim||comp).replace(/[^a-zA-Z0-9]+/g,"_").slice(0,40)}.pdf`); });

return()=>{__subs.forEach(u=>{try{u()}catch(e){}});__iv.forEach(i=>clearInterval(i));__to.forEach(i=>clearTimeout(i))}}
export default function FigKarneLegacyPage(){const r=R.useRef(null);R.useEffect(()=>{let live=!0,stop=null;r.current.innerHTML=HTML;start(()=>live).then(f=>{live?stop=f:f&&f()});return()=>{live=!1;stop&&stop()}},[]);return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:CSS}),e.jsx("div",{ref:r,className:"lvFK"})]})}
