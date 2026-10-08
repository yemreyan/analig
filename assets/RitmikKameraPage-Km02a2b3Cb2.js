import"./i18n-Tr01a2b3Cb2.js";import{j as e,d as db}from"./main-C2LpyYUGCb2.js";import{r as R}from"./vendor-react-Cxw6bqwhCb2.js";import{x as _fb_onChildAdded,o as _fb_onValue,j as _fb_push,k as _fb_ref,t as _fb_remove,v as _fb_set,m as _fb_update}from"./vendor-firebase-940mxgRVCb2.js";import"./modulepreload-polyfill-B5Qt9EMXCb2.js";
// RİTMİK KAMERA (/ritmik/kamera?compId=…&cam=a|b[&catId=…]) — aerobik kamerasından uyarlandı.
// Çağrı (aktifSporcu) ile kayıt başlar; ilk A/E notu gelince / zaman hakemi süreyi gönderince / puan kaydedilince / yeni çağrıda / ■ ile / 5 dk sonra durur.
// KAM A videosu puanlar/<kat>/<sporcu>/<alet>/videoUrlA olarak yazılır (İtiraz Paneli ve Video Arşivi buradan oynatır).
const CSS=".lvKM *{margin:0;padding:0;box-sizing:border-box}.lvKM,.lvKM{height:100%;background:#000;overflow:hidden;font-family:system-ui,-apple-system,'Segoe UI',sans-serif}.lvKM .kam-root{position:fixed;inset:0;background:#000}.lvKM .kam-video{position:absolute;inset:0;width:100%;height:100%;object-fit:contain;background:#000}.lvKM .btn-ctl{position:fixed;right:12px;z-index:9999;color:#fff;background:rgba(0,0,0,.6);border:1px solid rgba(255,255,255,.5);border-radius:10px;cursor:pointer}.lvKM .btn-cam{top:12px;padding:10px 14px;font-size:14px;font-weight:700}.lvKM .btn-zin{top:66px;width:48px;height:48px;font-size:22px;font-weight:700;line-height:1}.lvKM .btn-stop{top:178px;width:48px;height:48px;font-size:20px;font-weight:900;line-height:1;background:rgba(220,38,38,.75)}.lvKM .btn-zout{top:122px;width:48px;height:48px;font-size:22px;font-weight:700;line-height:1}.lvKM .kam-ui{position:absolute;inset:0;pointer-events:none;padding:12px;display:flex;flex-direction:column}.lvKM .kam-header{display:flex;justify-content:space-between;align-items:flex-start;gap:8px}.lvKM .kam-tag{background:rgba(0,0,0,.6);border:1px solid rgba(255,255,255,.3);border-radius:10px;padding:8px 12px;color:#fff}.lvKM .kam-tag .t{font-size:12px;font-weight:800;opacity:.85}.lvKM .kam-tag .s{font-size:15px;font-weight:800}.lvKM .kam-conn{border-radius:10px;padding:8px 12px;font-size:13px;font-weight:800;color:#fff}.lvKM .kam-conn--live{background:rgba(22,163,74,.85)}.lvKM .kam-conn--waiting{background:rgba(234,179,8,.85);color:#111}.lvKM .kam-conn--error{background:rgba(220,38,38,.85)}.lvKM .kam-conn--requesting,.lvKM .kam-conn--init{background:rgba(0,0,0,.6)}.lvKM .kam-rec{align-self:center;margin-top:10px;background:rgba(220,38,38,.9);color:#fff;border-radius:999px;padding:8px 16px;font-size:14px;font-weight:800;display:flex;align-items:center;gap:8px}.lvKM .kam-rec--saving{background:rgba(37,99,235,.9)}.lvKM .kam-rec--ok{background:rgba(22,163,74,.9)}.lvKM .kam-rec--error{background:rgba(180,83,9,.95)}.lvKM .kam-fail{margin:8px auto 0;align-self:center;background:rgba(180,83,9,.96);color:#fff;border-radius:10px;padding:8px 14px;font-size:13px;font-weight:800;pointer-events:auto;cursor:pointer;text-align:center;max-width:92%}.lvKM .kam-dl{position:fixed;left:12px;bottom:12px;z-index:9998;max-width:52%;max-height:42vh;overflow:auto;display:flex;flex-direction:column;gap:5px;pointer-events:auto}.lvKM .kam-dl .h{font-size:11px;font-weight:800;color:#fff;background:rgba(0,0,0,.55);border-radius:6px;padding:3px 8px;opacity:.85}.lvKM .kam-dl a{display:block;background:rgba(20,83,45,.85);border:1px solid rgba(255,255,255,.35);border-radius:8px;padding:6px 10px;color:#fff;font-size:12px;font-weight:700;text-decoration:none;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.lvKM .kam-rec-dot{width:11px;height:11px;border-radius:50%;background:#fff;animation:blink 1s infinite}@keyframes blink{50%{opacity:.25}}.lvKM .kam-ath{margin-top:auto;align-self:flex-start;background:rgba(0,0,0,.65);border:1px solid rgba(255,255,255,.25);border-radius:12px;padding:10px 14px;color:#fff;max-width:80%}.lvKM .kam-ath .badge{display:inline-block;font-size:11px;font-weight:800;background:#16a34a;border-radius:6px;padding:2px 8px;margin-bottom:5px}.lvKM .kam-ath .name{font-size:18px;font-weight:800;line-height:1.15}.lvKM .kam-ath .club{font-size:12px;font-weight:600;opacity:.8;margin-top:2px}.lvKM .err-full{position:fixed;inset:0;display:flex;align-items:center;justify-content:center;color:#fff;text-align:center;padding:2rem;font-weight:700}.lvKM{position:fixed;inset:0;z-index:60;overflow:auto}";
const HTML="<div class=\"kam-root\">\n  <video id=\"vid\" class=\"kam-video\" autoplay muted playsinline></video>\n  <button class=\"btn-ctl btn-cam\" id=\"btnCam\">🔄 Kamera</button>\n  <button class=\"btn-ctl btn-zin\" id=\"btnZin\">➕</button>\n  <button class=\"btn-ctl btn-zout\" id=\"btnZout\">➖</button>\n  <button class=\"btn-ctl btn-stop\" id=\"btnStop\" title=\"Kaydı durdur\">■</button>\n  <div class=\"kam-ui\">\n    <div class=\"kam-header\">\n      <div class=\"kam-tag\"><div class=\"t\">RİTMİK</div><div class=\"s\" id=\"camTag\">KAM A · Performans</div></div>\n      <div class=\"kam-conn kam-conn--init\" id=\"conn\">—</div>\n    </div>\n    <div id=\"recBox\"></div>\n    <div id=\"upBox\"></div>\n    <div id=\"failBox\"></div>\n    <div id=\"athBox\"></div>\n  </div>\n  <div id=\"dlBox\" class=\"kam-dl\"></div>\n</div>";
const EXT=["/video-depo/drive.js"];
const __ld=s=>new Promise(r=>{if(document.querySelector(`script[data-gx-src="${s}"]`))return r();const t=document.createElement("script");t.src=s;t.setAttribute("data-gx-src",s);t.onload=()=>r();t.onerror=()=>r();document.head.appendChild(t)});
async function start(__alive){for(const s of EXT)await __ld(s);if(!__alive())return()=>{};const __subs=[],__iv=[],__to=[],__ms=[];const __md=navigator.mediaDevices,__gum=__md&&__md.getUserMedia&&__md.getUserMedia.bind(__md);if(__gum)__md.getUserMedia=async(...a)=>{const st=await __gum(...a);__ms.push(st);return st};const setInterval=(...a)=>{const i=window.setInterval(...a);__iv.push(i);return i};const setTimeout=(...a)=>{const i=window.setTimeout(...a);__to.push(i);return i};const onChildAdded=(...a)=>{const u=_fb_onChildAdded(...a);typeof u==="function"&&__subs.push(u);return u};const onValue=(...a)=>{const u=_fb_onValue(...a);typeof u==="function"&&__subs.push(u);return u};const push=_fb_push;const ref=_fb_ref;const remove=_fb_remove;const set=_fb_set;



const P=new URLSearchParams(location.search);
const comp=P.get("compId")||P.get("comp"), cam=(P.get("cam")||"a").toLowerCase(), BASE=P.get("path")||"ritmik_yarismalar";
const catRaw=(P.get("catId")||P.get("cat")||"").trim(), catAll=catRaw===""||catRaw==="__ALL__", catList=catRaw.split(",").map(s=>s.trim()).filter(Boolean);
// &alet=cember[,top] → kamera yalnız bu aletin (halının) çağrısını izler (iki halı aynı anda çalışıyorsa her kameraya kendi aleti)
const aletF=(P.get("alet")||"").split(",").map(s=>s.trim()).filter(Boolean);
const $=id=>document.getElementById(id);
const ALAD={serbest:"Serbest",ip:"İp",cember:"Çember",top:"Top",labut:"Labut",kurdele:"Kurdele",grup_seri1:"Grup 1. Seri",grup_seri2:"Grup 2. Seri"};
const CLOUD="spythzo3", PRESET="analig_unsigned";
const ICE=[{urls:"stun:stun.l.google.com:19302"},{urls:"stun:stun1.l.google.com:19302"},{urls:"turn:openrelay.metered.ca:80",username:"openrelayproject",credential:"openrelayproject"},{urls:"turn:openrelay.metered.ca:443",username:"openrelayproject",credential:"openrelayproject"},{urls:"turn:openrelay.metered.ca:443?transport=tcp",username:"openrelayproject",credential:"openrelayproject"}];
$("camTag").textContent=`KAM ${cam.toUpperCase()} · ${cam==="a"?"Performans (Yükler)":"Yedek (İndirir)"}${catAll?"":" · "+catRaw}${aletF.length?" · "+aletF.map(a=>ALAD[a]||a).join("/"):""}`;
if(!comp){document.body.innerHTML='<div class="err-full">Hatalı link — compId eksik.</div>';throw new Error("no comp");}

// ---- canvas-zoom feed (KameraPage __ZW) ----
const ZW={c:null,v:null,f:1,s:null,r:null,run:0,init(){if(this.c)return;this.v=$("vid");this.c=document.createElement("canvas");this.c.width=1280;this.c.height=720;this.s=this.c.captureStream(30);const self=this,ctx=this.c.getContext("2d");let last=0;(function draw(){const now=Date.now();if(now-last>=33){last=now;const vv=self.v,c=self.c;if(vv&&vv.videoWidth){if(c.width!==vv.videoWidth||c.height!==vv.videoHeight){c.width=vv.videoWidth;c.height=vv.videoHeight}const f=self.f,sw=c.width/f,sh=c.height/f,sx=(c.width-sw)/2,sy=(c.height-sh)/2;try{ctx.drawImage(vv,sx,sy,sw,sh,0,0,c.width,c.height)}catch(e){}}}self.run=requestAnimationFrame(draw)})()},feed(st){this.init();this.r=st;this.v.srcObject=st;const p=this.v.play();if(p&&p.catch)p.catch(()=>{})},outS(){this.init();return this.s},zoom(d){this.f=Math.min(5,Math.max(1,this.f+d));if(this.v){this.v.style.transformOrigin="center center";this.v.style.transform="scale("+this.f+")"}},stopRaw(){if(this.r)try{this.r.getTracks().forEach(t=>t.stop())}catch(e){}}};

function setConn(cls,txt){const c=$("conn");c.className="kam-conn kam-conn--"+cls;c.textContent=txt;}
let recState="idle";
function setRec(s,extra){recState=s;const b=$("recBox");if(s==="idle"){b.innerHTML="";return;}
  const m={recording:['','<span class="kam-rec-dot"></span>KAYIT'],saving:['kam-rec--saving','💾 Kaydediliyor...'],uploading:['kam-rec--saving','☁️ Buluta yükleniyor...'],uploaded:['kam-rec--ok','✅ Buluta yüklendi'],error:['kam-rec--error','⚠️ Yüklenemedi'+(extra?" · "+extra:"")],download:['kam-rec--ok','✅ İndirildi']}[s]||['',s];
  b.innerHTML=`<div class="kam-rec ${m[0]}">${m[1]}</div>`;}
function showAth(a){const b=$("athBox");if(!a){b.innerHTML="";return;}
  b.innerHTML=`<div class="kam-ath"><span class="badge">● SERİDE</span><div class="name">${(a.ad||"")} ${(a.soyad||"")}</div>${a.okul?`<div class="club">${a.okul}</div>`:""}${(a.alet||"")?`<div class="club">${ALAD[a.alet]||a.alet}</div>`:""}</div>`;}

const tr=s=>(s||"").replace(/ı/g,"i").replace(/İ/g,"I").replace(/ş/g,"s").replace(/Ş/g,"S").replace(/ğ/g,"g").replace(/Ğ/g,"G").replace(/ü/g,"u").replace(/Ü/g,"U").replace(/ö/g,"o").replace(/Ö/g,"O").replace(/ç/g,"c").replace(/Ç/g,"C").replace(/[^a-zA-Z0-9]+/g,"-").replace(/^-+|-+$/g,"");

// ---- kayıt durum makinesi (aktifSporcu tetikli) ----
let stream=null, recorder=null, chunks=[], curCat="", curAth="", curName="", curAd="", curSoyad="", curOkul="", curIl="", mimeExt="webm";
// Kayıt/yükleme durumu Video Arşivi için: <yarışma>/kameraYukleme/<rid> {cam,ad,alet,kat,durum: kayitta|yukleniyor|bitti|hata|indirildi, ilerleme, boyutMB, sureSn, ...}
let curRid="";const KY=rid=>ref(db,`${BASE}/${comp}/kameraYukleme/${rid}`),kyYaz=(rid,v)=>{if(!rid)return;try{_fb_update(KY(rid),{...v,guncel:Date.now()}).catch(()=>{})}catch(e){}};
const ACILIS=Date.now(); // kamera açılmadan 2 dk'dan eski çağrı (ör. sayfa yenilendi) kayda başlatılmaz
let wantCat="", wantData=null, curKey="", doneKey="", curAlet="", aktifAlet={}, recT0=0, stopWatch=null;
const keyOf=(c,a)=>a?(c+"/"+(a.id||"")+"/"+(a.alet||aktifAlet[c]||"")+"@"+(a.ts||0)):"";

function startRec(cat,athId,name,ad,soyad,okul,il){
  if(recState==="recording"||recState==="saving"||recState==="uploading")return;
  // Kayıt HAM kamera akışından yapılır (canvas akışı iOS Safari'de MediaRecorder ile boş kayıt üretir).
  const src=ZW.r||stream;
  if(!src||!src.getVideoTracks||!src.getVideoTracks().length){setRec("error","kamera akışı yok");setTimeout(()=>{recState==="error"&&setRec("idle")},3000);return;}
  curCat=cat; curAth=athId||""; curName=(name||((ad||"")+" "+(soyad||""))).trim()||"Sporcu"; curAlet=(wantData&&wantData.alet)||aktifAlet[cat]||"";
  curAd=ad||""; curSoyad=soyad||""; curOkul=okul||""; curIl=il||"";
  const mime=MediaRecorder.isTypeSupported("video/mp4")?"video/mp4":MediaRecorder.isTypeSupported("video/webm;codecs=vp9")?"video/webm;codecs=vp9":MediaRecorder.isTypeSupported("video/webm;codecs=vp8")?"video/webm;codecs=vp8":"video/webm";
  mimeExt=mime.startsWith("video/mp4")?"mp4":"webm";
  let rec;
  try{rec=new MediaRecorder(src,{mimeType:mime,videoBitsPerSecond:2e6});}
  catch(e){try{rec=new MediaRecorder(src);}catch(e2){setRec("error","kayıt açılamadı");setTimeout(()=>{recState==="error"&&setRec("idle")},3000);return;}}
  chunks=[]; rec.ondataavailable=e=>{e.data&&e.data.size>0&&chunks.push(e.data)};
  rec.onstop=()=>onStop(mime);
  rec.onerror=()=>{try{rec.state!=="inactive"&&rec.stop()}catch(e){}};
  rec.start(1000); recorder=rec; setRec("recording"); recT0=Date.now(); watchRoutine();
  curRid="k"+recT0.toString(36)+cam; kyYaz(curRid,{cam:cam.toUpperCase(),ad:curName,alet:curAlet||"",kat:cat,athId:curAth||"",durum:"kayitta",basla:recT0});
}
// rutin bitişi: zaman hakemi süreyi gönderince / puan kilitlenince-kaydedilince kayıt durur; güvenlik: 5 dk
function watchRoutine(){
  try{stopWatch&&stopWatch()}catch(e){} stopWatch=null;
  if(!curAth||!curAlet||!curCat)return;
  // A ya da E hakeminden ilk not gelince de durur (rutin bitti, hakemler notu gönderiyor)
  let ilk=true, z0=null, ae0=0;
  const aeSay=v=>["aPanel","ePanel"].reduce((n,k)=>n+Object.values(v[k]||{}).filter(x=>x!=null&&x!=="").length,0);
  stopWatch=onValue(ref(db,`${BASE}/${comp}/puanlar/${curCat}/${curAth}/${curAlet}`),snap=>{
    const v=snap.val()||{}, z=v.tPanel&&v.tPanel.zaman!=null?JSON.stringify(v.tPanel):null;
    if(ilk){ilk=false;z0=z;ae0=aeSay(v);return;}
    if(recState!=="recording")return;
    if(v.kilitli===true||v.durum==="tamamlandi"||(z&&z!==z0)||aeSay(v)>ae0)stopRec();
  });
}
function stopRec(){ try{stopWatch&&stopWatch()}catch(e){} stopWatch=null; if(recState==="recording"&&recorder){try{recorder.requestData()}catch(e){} try{recorder.stop()}catch(e){} setRec("saving"); } }
// yüklenemeyen videoları kuyrukta tut, dokununca yeniden dene (salon wifi'si kesik olsa da video kaybolmasın)
let failedUploads=[];
function renderFailed(){ const b=$("failBox"); if(!b)return; if(!failedUploads.length){b.innerHTML="";return;} b.innerHTML=`<div class="kam-fail">⚠️ ${failedUploads.length} video yüklenemedi — yeniden denemek için DOKUN</div>`; b.firstChild.onclick=retryFailed; }
function retryFailed(){ const items=failedUploads.slice(); failedUploads=[]; renderFailed(); items.forEach(it=>uploadRec(it.blob,it.pid,it.J,it.CW,it.meta,1)); }
// Yükleme ARKA PLANDA (2026-10-08): önceki video yüklenirken yeni çağrının kaydı bekletilmez; durum ayrı rozette
let upN=0,upT=null;
function upDurum(t){const b=$("upBox");if(!b)return;clearTimeout(upT);if(upN>0){b.innerHTML=`<div class="kam-rec kam-rec--saving">☁️ ${upN} video buluta yükleniyor…</div>`;return}if(!t){b.innerHTML="";return}b.innerHTML=`<div class="kam-rec ${t[0]}">${t[1]}</div>`;upT=setTimeout(()=>{if(!upN)b.innerHTML=""},4000)}
function uploadRec(blob,pid,J,CW,meta,attempt){
  attempt=attempt||1; if(attempt===1){upN++;meta.yuk0=Date.now()} upDurum();
  const rid=meta.rid;kyYaz(rid,{durum:"yukleniyor",ilerleme:0,deneme:attempt,boyutMB:Math.round(blob.size/1048576*10)/10,sureSn:meta.sureSn||null,yukBasla:meta.yuk0,mesaj:null});
  let sonP=0,sonT=0;const ilerle=p=>{const n=Date.now();if(p-sonP>=.05||n-sonT>2500||p>=1){sonP=p;sonT=n;kyYaz(rid,{ilerleme:Math.round(p*1000)/1000})}};
  // Google Drive (video-depo) ayarlıysa oraya, değilse eski Cloudinary hesabına yüklenir
  const cldYukle=()=>{ const c=new FormData(); c.append("file",blob); c.append("upload_preset",PRESET); c.append("public_id",pid);
    return fetch(`https://api.cloudinary.com/v1_1/${CLOUD}/video/upload`,{method:"POST",body:c})
      .then(r=>r.json().then(u=>r.ok?u:Promise.reject(new Error(u.error?.message||"Yükleme başarısız")))); };
  const gdAd=`${meta.name||"Sporcu"} - ${ALAD[meta.alet]||meta.alet||""} - KAM ${CW} - ${new Date(meta.ts||Date.now()).toISOString().slice(0,16).replace("T","_")}.${mimeExt}`.replace(/[/\\:*?"<>|]/g,"-");
  (window.gxDrive?window.gxDrive.hazir():Promise.resolve(false))
    .then(dr=>dr?window.gxDrive.yukle(blob,{name:gdAd,base:BASE,comp,kat:J.split("/").slice(-3)[0]},ilerle).then(u=>({secure_url:u.url,public_id:"gdrive:"+u.id})):cldYukle())
    .then(u=>{ const sn=Math.round((Date.now()-(meta.yuk0||Date.now()))/1e3),mb=Math.round(blob.size/1048576*10)/10,{yuk0,...m2}=meta; set(ref(db,`${J}/videoUrl${CW}`),u.secure_url); set(ref(db,`${J}/videoPath${CW}`),u.public_id||""); set(ref(db,`${J}/videoBilgi`),{...m2,rid:null,yuklemeSn:sn,boyutMB:mb,sureSn:meta.sureSn||null}); kyYaz(rid,{durum:"bitti",ilerleme:1,yuklemeSn:sn,url:u.secure_url,bitti:Date.now(),yol:J}); upN=Math.max(0,upN-1); upDurum(["kam-rec--ok",`✅ Buluta yüklendi · ${meta.name||""} · ${mb} MB · ${sn} sn`]); })
    .catch(e=>{ if(attempt<3){ kyYaz(rid,{durum:"yukleniyor",mesaj:"yeniden deneniyor ("+(attempt+1)+"/3) · "+(e?.message||"ağ hatası")}); setTimeout(()=>uploadRec(blob,pid,J,CW,meta,attempt+1),1500*attempt); }
      else { kyYaz(rid,{durum:"hata",mesaj:(e?.message||"ağ hatası")+" · kamerada kuyrukta — dokununca yeniden yüklenir"}); upN=Math.max(0,upN-1); failedUploads.push({blob,pid,J,CW,meta}); renderFailed(); upDurum(["kam-rec--error","⚠️ Yüklenemedi · "+(e?.message||"ağ hatası")+" · kuyrukta"]); } });
}
// yerel indirme garantisi: her kayıt son 6 kayıt listesinde kalıcı indirme linki olur
// (tarayıcı ardışık otomatik indirmeleri engellese bile operatör elle indirebilir)
let recBlobs=[];
function addRec(label,fn,url){ recBlobs.unshift({label,fn,url}); while(recBlobs.length>6){const o=recBlobs.pop();try{URL.revokeObjectURL(o.url)}catch(e){}} renderDl(); }
function renderDl(){ const b=$("dlBox"); if(!b)return; if(!recBlobs.length){b.innerHTML="";return;} const esc=s=>String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"); b.innerHTML='<div class="h">⬇ Son kayıtlar — indirmek için dokun</div>'+recBlobs.map(r=>`<a href="${r.url}" download="${esc(r.fn)}">⬇ ${esc(r.label)}</a>`).join(""); }
function onStop(mime){
  doneKey=curKey; // bu kaydın sporcusu tamamlandı (aynı çağrı tekrar başlatılmasın)
  const blob=new Blob(chunks,{type:mime}); chunks=[];
  const nm=curName||"Sporcu", CW=cam.toUpperCase(), dt=new Date().toISOString().slice(0,16).replace("T","_");
  const fn=`${nm} - ${ALAD[curAlet]||curAlet||"Alet"} - KAM ${CW} - ${dt}.${mimeExt}`.replace(/[/\\:*?"<>|]/g,"-");
  if(blob.size>0){const url=URL.createObjectURL(blob);addRec(`${nm} · KAM ${CW}`,fn,url);try{const a=document.createElement("a");a.href=url;a.download=fn;document.body.appendChild(a);a.click();document.body.removeChild(a);}catch(e){}}
  const z=curAth,rid=curRid,sureSn=recT0?Math.round((Date.now()-recT0)/1e3):null,mb=Math.round(blob.size/1048576*10)/10;curRid="";
  if(blob.size===0)kyYaz(rid,{durum:"hata",mesaj:"boş kayıt — akış alınamadı",sureSn});else if(cam==="b"||!(z&&comp&&curCat&&curAlet))kyYaz(rid,{durum:"indirildi",boyutMB:mb,sureSn,bitti:Date.now()});
  if(z&&comp&&curCat&&curAlet&&blob.size>0&&cam!=="b"){
    const pid=`${BASE}/${comp}/${curCat}/${tr(nm)}-${curAlet}-kam${cam}-${z}`, J=`${BASE}/${comp}/puanlar/${curCat}/${z}/${curAlet}`, meta={ad:curAd,soyad:curSoyad,okul:curOkul,il:curIl,name:nm,alet:curAlet,cam:CW,ts:Date.now(),sureSn,rid};
    uploadRec(blob,pid,J,CW,meta,1); setRec("idle"); reconcile();
  } else if(blob.size===0){ setRec("error","boş kayıt — akış alınamadı"); setTimeout(()=>{if(recState==="error")setRec("idle");reconcile();},4000); }
  else { setRec(cam==="b"?"download":"idle"); if(cam==="b")setTimeout(()=>{if(recState==="download")setRec("idle");reconcile();},2000); else reconcile(); }
}
// istenen (en yeni çağrılan) sporcuyu mevcut kayıt durumuyla uzlaştır:
// zaman hakemi durdurmasa da yeni sporcu çağrılınca eskisi durur+kaydedilir, yenisi başlar.
function reconcile(){
  if(recState==="saving")return;
  const wk=keyOf(wantCat,wantData);
  if(recState==="recording"){ if(!wantData||wk!==curKey)stopRec(); return; }
  if(recState==="idle"&&wantData&&wk!==doneKey){
    if((+wantData.ts||0)<ACILIS-12e4){doneKey=wk;return}
    curKey=wk;
    startRec(wantCat,wantData.id,wantData.ad&&wantData.soyad?(wantData.ad+" "+wantData.soyad):wantData.ad,wantData.ad,wantData.soyad,wantData.okul,wantData.il);
  }
}

// aktifSporcu izle: en yeni çağrılan sporcu -> reconcile ile kayıt başlat/durdur/geçiş
function watchActive(){
  onValue(ref(db,`${BASE}/${comp}/aktifAlet`),snap=>{aktifAlet=snap.val()||{};});
  setInterval(()=>{ if(recState==="recording"&&recT0&&Date.now()-recT0>3e5)stopRec(); },5000);
  if(aletF.length){onValue(ref(db,`${BASE}/${comp}/aktifSporcuAlet`),snap=>{const all=snap.val()||{};let cat="",a=null,bt=-1;
    Object.keys(all).forEach(k=>{if(!(catAll||catList.includes(k)||catList.includes(k.replace(/^final_/,""))))return;aletF.forEach(al=>{const x=all[k]&&all[k][al];if(x&&typeof x==="object"&&(x.ts||0)>=bt){bt=x.ts||0;cat=k;a={...x,alet:al}}})});
    wantCat=cat;wantData=a;showAth(a);reconcile()});return}
  onValue(ref(db,`${BASE}/${comp}/aktifSporcu`),snap=>{
    const all=snap.val()||{}; let cat="",a=null;
    let _bt=-1;for(const k of Object.keys(all)){ if((catAll||catList.includes(k)||catList.includes(k.replace(/^final_/,"")))&&all[k]&&(all[k].ts||0)>=_bt){_bt=all[k].ts||0;cat=k;a=all[k];} }
    wantCat=cat; wantData=(a&&typeof a==="object")?a:null;
    showAth(wantData);
    reconcile();
  });
}

// zaman hakemi "DURDUR" -> kamerayı durdur (video biter)
let lastStopTs=0;
function watchStop(){
  onValue(ref(db,`${BASE}/${comp}/kameraStop`),snap=>{
    const all=snap.val(); if(!all) return;
    // kategori-bazlı: kameraStop/{cat}={athId,ts} ; eski global format: kameraStop={athId,ts}
    const v=(curCat&&all[curCat]&&typeof all[curCat]==="object")?all[curCat]:(all.ts?all:null);
    if(!v||!v.ts) return;
    if(v.ts>lastStopTs){
      lastStopTs=v.ts;
      if(recState==="recording" && (!v.athId || v.athId===curAth)) stopRec();
    }
  });
}

// ---- WebRTC broadcaster (sabit yol: broadcast/webrtc/aerobik/{cam}) ----
const H=`${BASE}/${comp}/broadcast/webrtc/ritmik/${cam}`;
let pc=null, unsubAns=null, unsubAnsCand=null, unsubEpoch=null, negTimer=null, alive=true, lastEpoch=null;
async function negotiate(){
  if(!alive||!ZW.outS())return;
  try{ if(pc){pc.close();pc=null;} unsubAnsCand&&unsubAnsCand();unsubAnsCand=null;
    await remove(ref(db,`${H}/answer`)); await remove(ref(db,`${H}/answerCandidates`)); await remove(ref(db,`${H}/offerCandidates`));
    const p=new RTCPeerConnection({iceServers:ICE}); pc=p;
    ZW.outS().getTracks().forEach(t=>p.addTrack(t,ZW.outS()));
    p.onicecandidate=e=>{ if(e.candidate) push(ref(db,`${H}/offerCandidates`),e.candidate.toJSON()); };
    p.onconnectionstatechange=()=>{ if(!alive||pc!==p)return; const st=p.connectionState;
      if(st==="connected")setConn("live","🟢 CANLI"); else if(st==="disconnected")setConn("waiting","⏳ Yeniden..."),scheduleNeg(5000); else if(st==="failed")setConn("error","🔴 Bağlanamadı"),scheduleNeg(1500); };
    unsubAnsCand=onChildAdded(ref(db,`${H}/answerCandidates`),async s=>{try{await p.addIceCandidate(new RTCIceCandidate(s.val()))}catch(e){}});
    const off=await p.createOffer(); await p.setLocalDescription(off);
    await set(ref(db,`${H}/offer`),{sdp:off.sdp,type:off.type}); if(alive)setConn("waiting","⏳ İzleyici bekleniyor");
  }catch(e){}
}
function scheduleNeg(ms=1500){ if(!alive)return; clearTimeout(negTimer); negTimer=setTimeout(()=>negotiate().catch(()=>{}),ms); }

async function boot(){
  setConn("requesting","Kamera izni...");
  let s;
  // 2026-10-08: kamera başka uygulamada (ör. OBS) açıksa: önce bu cihazda son seçilen kamera, olmazsa varsayılan, o da olmazsa
  // diğer kameralar sırayla ("OBS Virtual Camera" önce). Seçilen kamera localStorage gxKameraDev ile hatırlanır.
  const _q=v=>({video:Object.assign({width:{ideal:1920},height:{ideal:1080},frameRate:{ideal:30}},v),audio:false});
  let _dev=null;try{_dev=localStorage.getItem("gxKameraDev")}catch(e){}
  if(_dev){try{s=await navigator.mediaDevices.getUserMedia(_q({deviceId:{exact:_dev}}))}catch(e){s=null}}
  if(!s){ try{ s=await navigator.mediaDevices.getUserMedia({video:{facingMode:{ideal:"environment"},width:{ideal:1920,min:1280},height:{ideal:1080,min:720},frameRate:{ideal:30,min:24}},audio:false}); }
  catch{ try{ s=await navigator.mediaDevices.getUserMedia({video:{facingMode:{ideal:"environment"},width:{ideal:1280},height:{ideal:720}},audio:false}); }catch{ s=null } } }
  if(!s){ try{ const _d=(await navigator.mediaDevices.enumerateDevices()).filter(x=>x.kind==="videoinput").sort((a,b)=>(/obs/i.test(b.label)?1:0)-(/obs/i.test(a.label)?1:0));
    for(const d of _d){ try{ s=await navigator.mediaDevices.getUserMedia(_q({deviceId:{exact:d.deviceId}})); break; }catch(e){} } }catch(e){} }
  if(!s){ setConn("error","🔴 Kamera açılamadı — kamera başka uygulamada açıksa OBS'de 'Sanal Kamerayı Başlat'a basın"); return; }
  try{ const _id=s.getVideoTracks()[0]?.getSettings?.().deviceId; _id&&localStorage.setItem("gxKameraDev",_id); }catch(e){}
  stream=s; ZW.feed(s);
  watchActive();
  watchStop();
  // WebRTC
  unsubAns=onValue(ref(db,`${H}/answer`),async snap=>{ if(!alive)return; if(snap.exists()){ const t=pc; if(t&&t.signalingState==="have-local-offer"){try{await t.setRemoteDescription(new RTCSessionDescription(snap.val()))}catch(e){}} } });
  unsubEpoch=onValue(ref(db,`${H}/viewerEpoch`),snap=>{ if(!alive)return; const v=snap.val(); if(v!=null){ if(lastEpoch===null){lastEpoch=v;return;} if(v!==lastEpoch){lastEpoch=v;negotiate().catch(()=>{});} } });
  await negotiate();
  // wake lock
  try{ if("wakeLock"in navigator){ const wl=await navigator.wakeLock.request("screen"); document.addEventListener("visibilitychange",async()=>{ if(document.visibilityState==="visible"){try{await navigator.wakeLock.request("screen")}catch(e){}} }); } }catch(e){}
}

// UI kontrolleri
$("btnZin").onclick=()=>ZW.zoom(.5);
$("btnZout").onclick=()=>ZW.zoom(-.5);
$("btnStop").onclick=()=>stopRec();
$("btnCam").onclick=async()=>{ try{
  const devs=(await navigator.mediaDevices.enumerateDevices()).filter(x=>x.kind==="videoinput"); const raw=ZW.r; let ns;
  if(devs.length>1){ const ct=raw?.getVideoTracks?.()[0], cid=ct?.getSettings?.().deviceId, ci=devs.findIndex(x=>x.deviceId===cid), nx=devs[(ci+1)%devs.length]; ns=await navigator.mediaDevices.getUserMedia({video:{deviceId:{exact:nx.deviceId}},audio:false}); }
  else{ const vt=raw?.getVideoTracks?.()[0], cf=vt?.getSettings?.().facingMode, nf=cf==="environment"?"user":"environment"; try{ns=await navigator.mediaDevices.getUserMedia({video:{facingMode:{exact:nf}},audio:false});}catch{ns=await navigator.mediaDevices.getUserMedia({video:{facingMode:{ideal:nf}},audio:false});} }
  const old=ZW.r; ZW.feed(ns); if(old)try{old.getTracks().forEach(t=>t.stop())}catch(e){}
  try{ const _id=ns.getVideoTracks()[0]?.getSettings?.().deviceId; _id&&localStorage.setItem("gxKameraDev",_id); }catch(e){}
}catch(e){} };
window.addEventListener("beforeunload",()=>{alive=false;try{pc&&pc.close()}catch(e){};remove(ref(db,H)).catch(()=>{});});

boot();

return()=>{__subs.forEach(u=>{try{u()}catch(e){}});__iv.forEach(i=>clearInterval(i));__to.forEach(i=>clearTimeout(i));__ms.forEach(st=>{try{st.getTracks().forEach(t=>t.stop())}catch(e){}});document.querySelectorAll("video").forEach(v=>{try{const o=v.srcObject;o&&o.getTracks&&o.getTracks().forEach(t=>t.stop())}catch(e){}});if(__gum)__md.getUserMedia=__gum}}
export default function RitmikKameraPage(){const r=R.useRef(null);R.useEffect(()=>{let live=!0,stop=null;r.current.innerHTML=HTML;start(()=>live).then(f=>{live?stop=f:f&&f()});return()=>{live=!1;stop&&stop()}},[]);return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:CSS}),e.jsx("div",{ref:r,className:"lvKM"})]})}
