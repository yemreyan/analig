import{j as e,d as db,a as usDisc,u as usAuth,l as logAction}from"./main-C2LpyYUGCb2.js";import{r as R}from"./vendor-react-Cxw6bqwhCb2.js";import{k as ref,o as onValue,l as get,m as update}from"./vendor-firebase-940mxgRVCb2.js";import{ULKELER,bayrakUrl}from"./intl-Ul01a2b3Cb2.js";import{raImg}from"./ritmikAlet-Ra01a2b3Cb2.js";import{fotoYol,fotoKaydet,dosyaSec}from"./fotoYukle-Fy01a2b3Cb2.js";import"./yayinVeri-Yv01a2b3Cb2.js";

// SPORCU TANITIMI (2026-10-10) — finalistleri tek tek projeksiyona (ve istenirse yayın overlay'ine) verir.
//  <yarışma>/sporcuTanitim = {sahne:"logo"|"baslik"|"sporcu"|"liste"|"kapali", oncekiSahne, i, liste:[{id,ad,soy,ulke,kulup,bib,no,es,ep,tk,mv,ma}],
//    baslik, alt, al (alet), kaynak, mod:"sinematik"|"video"|"ai", el (el sallama + selam balonu), eleme (eleme sırası/puanı), overlay, ts, kim}
//  Kontrol  (/rhythmic/athlete-intro): kaynak = oluşturulmuş final | final adayları (Final Oluştur kuralı, Raporlar ile aynı) | kategorinin tüm sporcuları.
//  Ekran    (/rhythmic/athlete-intro-screen?compId=…, giriş istemez): sinematik canlandırma tarayıcıda (Ken Burns, selamlama salınımı, ışık süzmesi,
//    dalgalanan bayrak, 👋); video / yapay zekâ modunda sporcunun klibi oynar, klip yoksa sinematik.
//  Klipler yarışma ağacının DIŞINDA: criteria/sporcuTanitimMedya/<base>/<yarışma>/<id>/{video|ai} = {url (data URL ya da link), tip, mime, ad, boyut, ts, kim, onay?}
//    özet (liste için, ağır veri okunmasın): criteria/sporcuTanitimIx/<base>/<yarışma>/<id>/{video|ai} = {ts, tip, boyut}
//  Yapay zekâ: sistem fotoğrafı hiçbir servise GÖNDERMEZ; klip dışarıda üretilip buraya yüklenir, yüklemeden önce onay işaretlenir (reşit olmayan sporcu).
const h=(t,p,...c)=>{const{key:k,...q}=p||{};return c.length>1?e.jsxs(t,{...q,children:c},k):c.length?e.jsx(t,{...q,children:c[0]},k):e.jsx(t,q,k)};
const MI=(n,st)=>e.jsx("span",{className:"material-icons-round",style:{fontSize:20,...st},children:n});
const UL=Object.fromEntries(ULKELER.map(u=>[u.kod,u]));
const ulAd=(k,en)=>{const u=UL[k];return u?(en?u.en:u.tr):k||""};
const UPc=(s,u)=>String(s??"").toLocaleUpperCase(u&&u!=="TUR"?"en":"tr-TR");
const enOf=C=>!!C&&(C.ciktiDili==="en"||((C.uluslararasi||C.tur==="uluslararasi")&&C.ciktiDili!=="tr"));
const MEDYA=(fp,comp,id)=>`criteria/sporcuTanitimMedya/${fp}/${comp}`+(id?"/"+id:"");
const MIX=(fp,comp,id)=>`criteria/sporcuTanitimIx/${fp}/${comp}`+(id?"/"+id:"");
const f3=v=>v==null||v===""||isNaN(v)?"":Number(v).toFixed(3);
const ordEN=n=>{const s=["th","st","nd","rd"],v=n%100;return n+(s[(v-20)%10]||s[v]||s[0])};
const lsAl=k=>{try{return localStorage.getItem(k)||""}catch{return""}},lsYaz=(k,v)=>{try{localStorage.setItem(k,v)}catch{}};
const SELAM={TUR:"Merhaba!",BUL:"Здравейте!",GRE:"Γεια σας!",CYP:"Γεια σας!",ROU:"Salut!",MDA:"Salut!",SRB:"Здраво!",MKD:"Здраво!",MNE:"Zdravo!",BIH:"Zdravo!",CRO:"Bok!",SLO:"Živjo!",ALB:"Përshëndetje!",KOS:"Përshëndetje!",AZE:"Salam!",UKR:"Привіт!",GEO:"Gamarjoba!",ITA:"Ciao!",ESP:"¡Hola!",FRA:"Bonjour !",GER:"Hallo!",AUT:"Servus!",HUN:"Szia!",POL:"Cześć!",CZE:"Ahoj!",SVK:"Ahoj!",UZB:"Salom!",KAZ:"Sälem!",ISR:"Shalom!",POR:"Olá!",BRA:"Olá!",NED:"Hallo!",FIN:"Hei!",SWE:"Hej!",NOR:"Hei!",DEN:"Hej!",EST:"Tere!",LAT:"Sveiki!",LTU:"Labas!",JPN:"Konnichiwa!"};
const selam=(u,en)=>SELAM[u]||(en?"Hello!":"Merhaba!");
const AI_ISTEM="Animate this photo into a 4-second clip: the athlete smiles and waves at the camera with one hand. Keep the face, hair, outfit and background exactly the same. Static camera, natural motion, no text, no extra people.";
// link → oynatıcı: data/mp4/webm → <video>, gif/webp → <img>, Google Drive / YouTube → iframe
const medyaTur=u=>{const s=String(u||"");let m;if(!s)return null;if(/^data:video\//.test(s)||/\.(mp4|webm|mov|m4v)(\?|#|$)/i.test(s))return{t:"video",src:s};if(/^data:image\//.test(s)||/\.(gif|webp|png|jpe?g)(\?|#|$)/i.test(s))return{t:"img",src:s};
 if(/^gdrive:/.test(s))return{t:"if",src:`https://drive.google.com/file/d/${s.slice(7)}/preview`};
 if(m=/drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?(?:export=\w+&)?id=)([\w-]{10,})/.exec(s))return{t:"if",src:`https://drive.google.com/file/d/${m[1]}/preview`};
 if(m=/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|shorts\/|embed\/))([\w-]{6,})/.exec(s))return{t:"if",src:`https://www.youtube.com/embed/${m[1]}?autoplay=1&mute=1&loop=1&playlist=${m[1]}&controls=0&modestbranding=1&rel=0&playsinline=1`};
 return{t:"video",src:s}};
const Oynat=({u,cls})=>{const m=medyaTur(u);if(!m)return null;
 if(m.t==="img")return h("img",{className:cls,src:m.src,alt:""});
 if(m.t==="if")return h("iframe",{className:cls,src:m.src,allow:"autoplay; encrypted-media",title:"klip"});
 return h("video",{className:cls,src:m.src,autoPlay:!0,loop:!0,playsInline:!0,muted:!0,ref:v=>{if(v){v.muted=!0;v.play&&v.play().catch(()=>{})}}})};

// ---- önbellek (ekran + kontrol): fotoğraf ve klip bir kez okunur ----
const FC={},MC={};
const fotoAl=(fp,comp,id)=>{if(!id||String(id).includes("::"))return Promise.resolve(null);const k=fp+"/"+comp+"/"+id;if(k in FC)return Promise.resolve(FC[k]);
 return get(ref(db,fotoYol(fp,comp,id))).then(s=>{const v=s.val(),u=v&&(v.url||(typeof v==="string"?v:null))||null;FC[k]=u;return u}).catch(()=>null)};
const medyaAl=(fp,comp,id,slot)=>{const k=fp+"/"+comp+"/"+id+"/"+slot;if(k in MC)return Promise.resolve(MC[k]);
 return get(ref(db,MEDYA(fp,comp,id)+"/"+slot)).then(s=>{const v=s.val();MC[k]=v&&v.url?v:null;return MC[k]}).catch(()=>null)};
const zaman=(p,ms)=>Promise.race([p,new Promise(r=>setTimeout(()=>r(null),ms))]);

// ---- video küçültme (tarayıcıda; ses atılır): en çok 720p, 10 sn ----
const dataURL=b=>new Promise((ok,no)=>{const r=new FileReader;r.onload=()=>ok(r.result);r.onerror=no;r.readAsDataURL(b)});
const videoMeta=f=>new Promise(ok=>{const v=document.createElement("video");v.preload="metadata";v.muted=!0;v.onloadedmetadata=()=>{ok({d:v.duration||0,w:v.videoWidth,h:v.videoHeight});URL.revokeObjectURL(v.src)};v.onerror=()=>ok({d:0,w:0,h:0});v.src=URL.createObjectURL(f)});
const kucultVideo=(f,maxH=720,maxS=10,bps=22e5)=>new Promise((ok,no)=>{if(typeof MediaRecorder==="undefined")return no(new Error(__T("Bu tarayıcı videoyu küçültemiyor")));
 const v=document.createElement("video");v.muted=!0;v.playsInline=!0;v.src=URL.createObjectURL(f);
 v.onloadedmetadata=()=>{const k=Math.min(1,maxH/(v.videoHeight||maxH)),c=document.createElement("canvas");c.width=Math.max(2,Math.round(v.videoWidth*k/2)*2);c.height=Math.max(2,Math.round(v.videoHeight*k/2)*2);
  const x=c.getContext("2d"),st=c.captureStream(30),mt=["video/webm;codecs=vp9","video/webm;codecs=vp8","video/webm","video/mp4"].find(t=>MediaRecorder.isTypeSupported(t))||"";
  const rec=new MediaRecorder(st,mt?{mimeType:mt,videoBitsPerSecond:bps}:{videoBitsPerSecond:bps}),ch=[];let raf,bitti=!1;
  rec.ondataavailable=ev=>ev.data&&ev.data.size&&ch.push(ev.data);rec.onstop=()=>{URL.revokeObjectURL(v.src);ok(new Blob(ch,{type:(mt||"video/webm").split(";")[0]}))};
  const dur=()=>{if(bitti)return;bitti=!0;cancelAnimationFrame(raf);try{v.pause()}catch{}rec.stop()};
  const ciz=()=>{x.drawImage(v,0,0,c.width,c.height);if(v.currentTime>=maxS)return dur();raf=requestAnimationFrame(ciz)};
  v.onended=dur;rec.start(250);v.play().then(ciz).catch(er=>{bitti=!0;no(er)})};v.onerror=()=>no(new Error(__T("Video okunamadı")))});

// ======================================================= EKRAN =======================================================
const CSS_E=`.gst{position:fixed;inset:0;overflow:hidden;background:#04060D;color:#fff;font-family:"Plus Jakarta Sans",Inter,system-ui,sans-serif;cursor:none;user-select:none}
.gst.imlec{cursor:default}
.gst-zemin{position:absolute;inset:0;background:radial-gradient(1200px 800px at 78% 28%,rgba(124,58,237,.34),transparent 60%),radial-gradient(900px 700px at 8% 105%,rgba(236,72,153,.24),transparent 60%),linear-gradient(180deg,#070A16,#04060D)}
.gst-blur{position:absolute;inset:-10%;background-size:cover;background-position:center 25%;filter:blur(60px) saturate(1.4) brightness(.42);transform:scale(1.15);animation:gstDrift 26s ease-in-out infinite alternate;transition:opacity 1.2s ease}
@keyframes gstDrift{from{transform:scale(1.15) translate(-2%,-1%)}to{transform:scale(1.28) translate(2%,1%)}}
.gst-huzme{position:absolute;inset:-60%;background:conic-gradient(from 0deg,transparent 0 20deg,rgba(255,255,255,.05) 25deg,transparent 32deg 110deg,rgba(255,255,255,.04) 118deg,transparent 126deg 200deg,rgba(255,255,255,.05) 207deg,transparent 214deg 290deg,rgba(255,255,255,.04) 298deg,transparent 305deg);animation:gstDon 70s linear infinite;pointer-events:none}
@keyframes gstDon{to{transform:rotate(360deg)}}
.gst-toz i{position:absolute;bottom:-2vh;width:.55vh;height:.55vh;border-radius:50%;background:rgba(255,255,255,.7);box-shadow:0 0 10px rgba(255,255,255,.9);animation:gstToz linear infinite;opacity:0}
@keyframes gstToz{0%{transform:translateY(0);opacity:0}12%{opacity:.75}100%{transform:translateY(-108vh);opacity:0}}
.gst-sahne{position:absolute;inset:0;transition:opacity .6s ease,transform .6s ease,filter .6s ease}
.gst-sahne.cik{opacity:0;transform:scale(1.035);filter:blur(8px)}
.gst-kose{position:absolute;top:3.4vh;display:flex;align-items:center;gap:1.4vw;z-index:3}
.gst-kose.sol{left:3vw}.gst-kose.sag{right:3vw}
.gst-kose img{height:min(8vh,84px);width:min(8vh,84px);object-fit:contain;border-radius:50%;background:#fff;padding:6px;box-shadow:0 8px 24px -10px rgba(0,0,0,.6)}
.gst-buyuk{position:absolute;right:1.5vw;bottom:-9vh;font-size:56vh;font-weight:900;line-height:1;color:transparent;-webkit-text-stroke:2px rgba(255,255,255,.07);letter-spacing:-.04em;pointer-events:none;animation:gstBuyuk 1.6s cubic-bezier(.2,.8,.2,1) both}
@keyframes gstBuyuk{from{opacity:0;transform:translateX(8vw)}to{opacity:1;transform:none}}
.gst-sp{position:relative;display:grid;grid-template-columns:auto minmax(0,1fr);align-items:center;gap:5vw;padding:10vh 6vw 9vh 7vw;height:100%;box-sizing:border-box}
.gst-cw{position:relative;perspective:1400px}
.gst-cw::before{content:"";position:absolute;inset:-1.4vh;border-radius:4vh;background:conic-gradient(#F5D27A,#EC4899,#8B5CF6,#22D3EE,#F5D27A);filter:blur(2.6vh);opacity:.5;animation:gstHue 9s linear infinite,gstYok 1.2s ease both}
@keyframes gstHue{to{filter:blur(2.6vh) hue-rotate(360deg)}}
@keyframes gstYok{from{opacity:0}}
.gst-cer{position:relative;height:74vh;aspect-ratio:4/5;border-radius:3vh;overflow:hidden;background:#111827;box-shadow:0 5vh 10vh -3vh rgba(0,0,0,.75),0 0 0 .35vh rgba(255,255,255,.16);animation:gstGir 1.15s cubic-bezier(.2,.8,.2,1) both}
@keyframes gstGir{from{clip-path:inset(100% 0 0 0 round 3vh);transform:translateY(6vh) rotateX(10deg)}to{clip-path:inset(0 0 0 0 round 3vh);transform:none}}
.gst-salla{position:absolute;inset:0;transform-origin:50% 92%}
.gst-cer.sin .gst-salla{animation:gstSalla 3.6s ease-in-out 1.2s infinite}
@keyframes gstSalla{0%,100%{transform:rotate(0) translateX(0)}25%{transform:rotate(-1.5deg) translateX(-.5%)}75%{transform:rotate(1.5deg) translateX(.5%)}}
.gst-cer .f{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center 22%;border:0}
.gst-cer.sin .f{animation:gstKen 15s ease-in-out infinite alternate}
@keyframes gstKen{from{transform:scale(1.09) translate(0,0)}to{transform:scale(1.22) translate(-2%,-3%)}}
.gst-cer::before{content:"";position:absolute;inset:0;z-index:2;background:linear-gradient(180deg,transparent 62%,rgba(4,6,13,.5));pointer-events:none}
.gst-cer.sin::after{content:"";position:absolute;inset:0;z-index:3;background:linear-gradient(105deg,transparent 36%,rgba(255,255,255,.30) 50%,transparent 64%);transform:translateX(-135%);animation:gstParla 5.8s ease-in-out 1.4s infinite;pointer-events:none}
@keyframes gstParla{0%{transform:translateX(-135%)}38%,100%{transform:translateX(135%)}}
.gst-cer .bay{position:absolute;inset:0;display:flex}
.gst-cer .bay i{flex:1;height:100%;background-repeat:no-repeat;animation:gstDalga 2.8s ease-in-out infinite}
.gst-cer .harf{position:absolute;inset:auto 0 7vh 0;z-index:4;text-align:center;font-size:15vh;font-weight:900;letter-spacing:.04em;text-shadow:0 1vh 4vh rgba(0,0,0,.7)}
.gst-ai{position:absolute;top:1.6vh;left:1.6vh;z-index:5;font-size:1.5vh;font-weight:900;letter-spacing:.14em;padding:.5vh 1vh;border-radius:1vh;background:rgba(0,0,0,.5);color:#E9D5FF}
.gst-el{position:absolute;right:-5vh;bottom:8vh;font-size:11vh;line-height:1;z-index:6;transform-origin:70% 85%;animation:gstElGir .6s 1.3s cubic-bezier(.3,1.6,.5,1) both,gstEl 1.9s 1.95s ease-in-out infinite;filter:drop-shadow(0 1vh 2vh rgba(0,0,0,.5))}
@keyframes gstElGir{from{transform:scale(0) rotate(-35deg);opacity:0}to{transform:scale(1);opacity:1}}
@keyframes gstEl{0%,62%,100%{transform:rotate(0)}10%{transform:rotate(18deg)}20%{transform:rotate(-10deg)}30%{transform:rotate(18deg)}40%{transform:rotate(-6deg)}50%{transform:rotate(10deg)}}
.gst-balon{position:absolute;right:-7vh;bottom:21vh;z-index:6;background:#fff;color:#0F172A;font-weight:900;font-size:3.1vh;padding:1.2vh 2.3vh;border-radius:2.6vh 2.6vh 2.6vh .5vh;box-shadow:0 1.5vh 3vh -1vh rgba(0,0,0,.5);transform-origin:0 100%;white-space:nowrap;animation:gstBalon .55s 1.75s cubic-bezier(.3,1.6,.5,1) both}
@keyframes gstBalon{from{opacity:0;transform:scale(.3)}to{opacity:1;transform:none}}
.gst-bil{min-width:0;display:flex;flex-direction:column;gap:2.4vh}
.gst-ust{display:flex;align-items:center;gap:1.6vw;animation:gstYuk .8s .35s both}
.gst-cip{font-size:2vh;font-weight:900;letter-spacing:.34em;text-transform:uppercase;padding:1vh 1.8vh 1vh 2.14vh;border-radius:99px;background:linear-gradient(135deg,#FDE68A,#D97706);color:#1F1300;box-shadow:0 1vh 3vh -1vh rgba(245,158,11,.6)}
.gst-say{font-size:2.8vh;font-weight:800;color:#C4B5FD;letter-spacing:.12em;font-variant-numeric:tabular-nums}
.gst-say b{color:#fff;font-size:3.6vh}
.gst-kat{display:flex;align-items:center;gap:1.4vh;font-size:2.7vh;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:#E0E7FF;animation:gstYuk .8s .5s both}
.gst-kat img{height:5.4vh;width:5.4vh;object-fit:contain;filter:drop-shadow(0 0 1.2vh rgba(255,255,255,.35))}
.gst-ad1{font-size:6.4vh;font-weight:600;line-height:1.05;animation:gstYuk .9s .65s both;overflow-wrap:anywhere}
.gst-ad2{font-size:11.5vh;font-weight:900;line-height:1;letter-spacing:-.01em;background:linear-gradient(180deg,#fff 35%,#F5D27A);-webkit-background-clip:text;background-clip:text;color:transparent;animation:gstYuk .9s .8s both;overflow-wrap:anywhere;padding-bottom:.6vh}
.gst-ad2.u{font-size:9vh}.gst-ad2.cu{font-size:7vh}
@keyframes gstYuk{from{opacity:0;transform:translateY(3.2vh);filter:blur(8px)}to{opacity:1;transform:none;filter:none}}
.gst-ul{display:flex;align-items:center;gap:2.4vh;animation:gstYuk .9s 1s both;min-width:0}
.gst-bay{position:relative;height:9.5vh;aspect-ratio:4/3;display:flex;flex:none;filter:drop-shadow(0 1.6vh 2.4vh rgba(0,0,0,.5))}
.gst-bay i{flex:1;height:100%;background-repeat:no-repeat;animation:gstDalga 2.6s ease-in-out infinite;margin-right:-1px}
@keyframes gstDalga{0%,100%{transform:translateY(-3%)}50%{transform:translateY(3%)}}
.gst-ul b{font-size:5vh;font-weight:900;letter-spacing:.05em;text-transform:uppercase;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.gst-ul .k{font-size:2.2vh;font-weight:900;letter-spacing:.2em;padding:.6vh 1.2vh;border-radius:1vh;border:1px solid rgba(255,255,255,.3);color:#CBD5E1;flex:none}
.gst-kl{font-size:3vh;font-weight:700;color:#CBD5E1;animation:gstYuk .9s 1.15s both;overflow-wrap:anywhere}
.gst-elm{display:inline-flex;gap:1.4vh;align-items:center;align-self:flex-start;font-size:2.6vh;font-weight:800;color:#FDE68A;background:rgba(245,210,122,.1);border:1px solid rgba(245,210,122,.35);padding:1vh 1.8vh;border-radius:1.4vh;animation:gstYuk .9s 1.3s both}
.gst-nok{position:absolute;left:50%;bottom:3.6vh;transform:translateX(-50%);display:flex;gap:1vh;z-index:3}
.gst-nok i{width:1.1vh;height:1.1vh;border-radius:99px;background:rgba(255,255,255,.25);transition:all .5s}
.gst-nok i.on{width:4.4vh;background:linear-gradient(90deg,#FDE68A,#F59E0B)}
.gst-nok i.ok{background:rgba(253,230,138,.6)}
.gst-bas{height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3.6vh;text-align:center;padding:0 6vw;box-sizing:border-box}
.gst-bas .k1{font-size:2.6vh;letter-spacing:.6em;padding-left:.6em;color:#C4B5FD;font-weight:900;text-transform:uppercase;animation:gstYuk .9s .2s both}
.gst-bas .t{font-size:9vh;font-weight:900;line-height:1.06;text-transform:uppercase;background:linear-gradient(180deg,#FFF7E0,#F5D27A 60%,#C8962E);-webkit-background-clip:text;background-clip:text;color:transparent;animation:gstYuk 1s .4s both;max-width:88vw}
.gst-bas .ap{height:15vh;animation:gstPop .8s .1s cubic-bezier(.3,1.5,.5,1) both;filter:drop-shadow(0 0 3vh rgba(245,210,122,.35))}
.gst-bas .cz{display:flex;align-items:center;gap:2vw;width:min(70vw,1000px);animation:gstYuk 1s .6s both}
.gst-bas .cz i{flex:1;height:2px;background:linear-gradient(90deg,transparent,#F5D27A)}.gst-bas .cz i:last-child{background:linear-gradient(90deg,#F5D27A,transparent)}
.gst-bas .cz span{font-size:3vh;font-weight:900;letter-spacing:.4em;padding-left:.4em;color:#fff;text-transform:uppercase}
.gst-bas .bl{display:flex;gap:2vw;flex-wrap:wrap;justify-content:center;max-width:84vw}
.gst-bas .bl span{display:flex;flex-direction:column;align-items:center;gap:1vh;font-size:1.9vh;font-weight:900;letter-spacing:.16em;color:#CBD5E1;animation:gstPop .6s cubic-bezier(.3,1.5,.5,1) both}
.gst-bas .bl img{height:6.4vh;aspect-ratio:4/3;object-fit:cover;border-radius:.7vh;box-shadow:0 1vh 2vh -.5vh rgba(0,0,0,.6),0 0 0 1px rgba(255,255,255,.15)}
@keyframes gstPop{from{opacity:0;transform:scale(.4) translateY(3vh)}to{opacity:1;transform:none}}
.gst-lst{height:100%;display:flex;flex-direction:column;padding:13vh 5vw 7vh;gap:3vh;box-sizing:border-box}
.gst-lst .lb{display:flex;align-items:baseline;justify-content:center;gap:2vw;text-align:center;animation:gstYuk .8s .1s both}
.gst-lst .lb b{font-size:5vh;font-weight:900;text-transform:uppercase;background:linear-gradient(180deg,#FFF7E0,#F5D27A);-webkit-background-clip:text;background-clip:text;color:transparent}
.gst-lst .lb span{font-size:2.4vh;font-weight:900;letter-spacing:.4em;color:#C4B5FD;text-transform:uppercase}
.gst-grid{flex:1;display:grid;gap:2.4vh 1.6vw;align-content:center;justify-content:center}
.gst-gk{position:relative;border-radius:2vh;overflow:hidden;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.14);display:flex;flex-direction:column;animation:gstPop .7s cubic-bezier(.3,1.4,.5,1) both;box-shadow:0 2vh 4vh -2vh rgba(0,0,0,.6)}
.gst-gk .fo{position:relative;height:var(--fh);background:#111827;overflow:hidden}
.gst-gk .fo img.p{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center 22%}
.gst-gk .fo img.b{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:.9}
.gst-gk .no{position:absolute;top:1vh;left:1vh;min-width:4vh;height:4vh;border-radius:1.2vh;display:grid;place-items:center;font-weight:900;font-size:2.2vh;background:rgba(4,6,13,.7);color:#FDE68A;border:1px solid rgba(253,230,138,.4)}
.gst-gk .ad{padding:1.2vh 1.4vh .4vh;font-weight:900;font-size:2.3vh;line-height:1.15;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.gst-gk .ul{display:flex;align-items:center;gap:.9vh;padding:0 1.4vh 1.3vh;font-size:1.7vh;font-weight:800;color:#CBD5E1;letter-spacing:.06em;white-space:nowrap;overflow:hidden}
.gst-gk .ul img{height:2.2vh;aspect-ratio:4/3;object-fit:cover;border-radius:.3vh;flex:none}
.gst-logo{height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4vh}
.gst-logo .ls{display:flex;align-items:center;gap:6vw}
.gst-logo .lk{width:min(28vw,42vh);height:min(28vw,42vh);border-radius:50%;background:#fff;display:grid;place-items:center;box-shadow:0 30px 80px -30px rgba(139,92,246,.6),0 0 0 6px rgba(255,255,255,.08);animation:gstPop 1s both}
.gst-logo .lk img{width:78%;height:78%;object-fit:contain}
.gst-logo .ay{width:2px;height:28vh;background:linear-gradient(180deg,transparent,rgba(255,255,255,.35),transparent)}
.gst-logo .ad{font-size:clamp(20px,3.2vw,46px);font-weight:900;letter-spacing:.04em;text-align:center;max-width:86vw;line-height:1.2;animation:gstYuk 1s .3s both}
.gst-kapali{position:absolute;inset:0;background:#000;opacity:0;pointer-events:none;transition:opacity .8s ease;z-index:20}
.gst-kapali.on{opacity:1}
.gst-tam{z-index:21;position:absolute;right:20px;bottom:20px;opacity:0;transition:opacity .3s}
.gst.imlec .gst-tam{opacity:1}
.gst-tam button{border:1px solid rgba(255,255,255,.25);background:rgba(255,255,255,.08);color:#fff;border-radius:12px;padding:10px 14px;font:800 14px inherit;font-family:inherit;cursor:pointer;display:inline-flex;align-items:center;gap:6px}
@media (max-aspect-ratio:1/1){.gst-sp{grid-template-columns:1fr;grid-template-rows:auto auto;gap:3vh;padding:8vh 6vw;align-content:center;justify-items:center;text-align:center}.gst-cer{height:44vh}.gst-bil{align-items:center}.gst-ust,.gst-ul{justify-content:center}.gst-elm{align-self:center}.gst-ad2{font-size:7vh}.gst-ad2.u{font-size:6vh}.gst-ad2.cu{font-size:5vh}.gst-ad1{font-size:4.4vh}}
`;
const SERIT=36;
const Bayrak=({u,cls,ser})=>{const b=u&&bayrakUrl(u),n=ser||SERIT;if(!b)return null;return h("div",{className:cls||"gst-bay"},[...Array(n)].map((_,i)=>e.jsx("i",{style:{backgroundImage:`url(${b})`,backgroundSize:`${n*100}% 100%`,backgroundPosition:`${i/(n-1)*100}% 0`,animationDelay:`${-(i/n)*2.6}s`}},i)))};
const adSinif=s=>{const n=String(s||"").length;return n>22?" cu":n>13?" u":""};
const katBaslikIcon=al=>al?raImg(al):null;
const elmMetin=(it,en)=>it&&it.es?(en?`Qualified ${ordEN(+it.es)}`:`Elemede ${it.es}.`)+(it.ep!=null&&it.ep!==""?"  ·  "+f3(it.ep):""):"";

function useCompE(fp,comp){const[C,setC]=R.useState(null);R.useEffect(()=>{setC(null);if(!fp||!comp)return;const st={},u=["isim","etkinlikLogo","ciktiDili","uluslararasi","tur","sporcuTanitim"].map(k=>onValue(ref(db,`${fp}/${comp}/${k}`),s=>{st[k]=s.val();setC({...st})}));return()=>u.forEach(f=>f())},[fp,comp]);return C}

const Toz=R.memo(()=>h("div",{className:"gst-toz"},[...Array(26)].map((_,i)=>e.jsx("i",{style:{left:(i*37%100)+"%",animationDuration:(9+(i*7%11))+"s",animationDelay:(-(i*1.3))+"s",transform:`scale(${.6+(i%5)*.2})`}},i))));

export function TanitimEkran(){
 const{firebasePath:fp}=usDisc()||{},q=new URLSearchParams(location.search),comp=q.get("compId")||q.get("competitionId")||"",onizle=q.get("onizle")==="1";
 const C=useCompE(fp,comp),ST=C&&C.sporcuTanitim||null,en=enOf(C);
 const[imlec,setImlec]=R.useState(!0),zm=R.useRef(null),[,yenile]=R.useState(0);
 R.useEffect(()=>{if(C)document.documentElement.lang=en?"en":"tr"},[C,en]);
 R.useEffect(()=>{if(onizle)return;const f=()=>{setImlec(!0);clearTimeout(zm.current);zm.current=setTimeout(()=>setImlec(!1),2500)};f();window.addEventListener("mousemove",f);window.addEventListener("pointerdown",f);return()=>{window.removeEventListener("mousemove",f);window.removeEventListener("pointerdown",f);clearTimeout(zm.current)}},[]);
 const sahne=ST&&ST.sahne||"logo",L=ST&&Array.isArray(ST.liste)?ST.liste.filter(Boolean):[],it=sahne==="sporcu"?L[ST.i]||null:null,mod=ST&&ST.mod||"sinematik";
 const slot=mod==="ai"?"ai":mod==="video"?"video":null,klipVar=!!(it&&slot&&(slot==="ai"?it.ma:it.mv));
 const sk=sahne==="sporcu"?"sp|"+(it?it.id:"")+"|"+(klipVar?slot:"sin"):sahne==="baslik"||sahne==="liste"?sahne+"|"+(ST.baslik||"")+"|"+L.length:sahne;
 // sahne değişimi: eski sahne söner, yeni sahnenin fotoğrafı/klibi hazır olunca (en çok 2.5 sn) gelir
 const[gos,setGos]=R.useState(null),[cik,setCik]=R.useState(!1),gR=R.useRef(null);gR.current=gos;
 R.useEffect(()=>{if(!C)return;let iptal=!1;const yeni={k:sk,S:ST||{}};if(gR.current&&gR.current.k===sk){setGos(yeni);return}
  const is=[];if(sahne==="sporcu"&&it){is.push(fotoAl(fp,comp,it.id));klipVar&&is.push(medyaAl(fp,comp,it.id,slot));const nx=L[(ST.i||0)+1];nx&&fotoAl(fp,comp,nx.id)}
  if(sahne==="liste"||sahne==="baslik")L.forEach(x=>fotoAl(fp,comp,x.id).then(()=>!iptal&&yenile(n=>n+1)));
  const ilk=!gR.current;ilk||setCik(!0);
  Promise.all([zaman(Promise.all(is),2500),new Promise(r=>setTimeout(r,ilk?0:650))]).then(()=>{if(iptal)return;setCik(!1);setGos(yeni)});
  return()=>{iptal=!0}},[sk,ST,!!C]);
 const tam=()=>{try{document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen()}catch{}};
 if(!comp)return h("div",{style:{minHeight:"100vh",display:"grid",placeItems:"center",background:"#0B0F1E",color:"#94A3B8",fontFamily:"system-ui",fontWeight:700}},__T("Yarışma seçilmedi"));
 const evL=C&&C.etkinlikLogo||null,G=gos&&gos.S||{},gs=gos?gos.S.sahne||"logo":"logo",GL=Array.isArray(G.liste)?G.liste.filter(Boolean):[],gIt=gs==="sporcu"?GL[G.i]||null:null;
 const foto=gIt?FC[fp+"/"+comp+"/"+gIt.id]||null:null,gMod=G.mod||"sinematik",gSlot=gMod==="ai"?"ai":gMod==="video"?"video":null,gKlip=gIt&&gSlot&&(gSlot==="ai"?gIt.ma:gIt.mv)?MC[fp+"/"+comp+"/"+gIt.id+"/"+gSlot]:null;
 const kose=[h("div",{key:"ks",className:"gst-kose sol"},h("img",{src:"/logo.png",alt:"TCF"})),evL?h("div",{key:"kg",className:"gst-kose sag"},h("img",{src:evL,alt:""})):null];
 let icerik=null;
 if(gs==="sporcu"&&gIt){const u=gIt.ulke,sin=!gKlip,adT=[gIt.ad].filter(Boolean).join(" "),soyT=gIt.tk?gIt.soy:UPc(gIt.soy||"",u),ap=katBaslikIcon(G.al);
  icerik=h("div",{className:"gst-sp"},
   h("div",{className:"gst-buyuk"},String(gIt.no||(+G.i+1)).padStart(2,"0")),
   h("div",{className:"gst-cw"},
    h("div",{className:"gst-cer"+(sin?" sin":"")},
     h("div",{className:"gst-salla"},gKlip?e.jsx(Oynat,{u:gKlip.url,cls:"f"}):foto?h("img",{className:"f",src:foto,alt:""}):h("div",{className:"bay"},...[...Array(SERIT)].map((_,i)=>{const b=u&&bayrakUrl(u);return b?e.jsx("i",{style:{backgroundImage:`url(${b})`,backgroundSize:`${SERIT*100}% 100%`,backgroundPosition:`${i/(SERIT-1)*100}% 0`,animationDelay:`${-(i/SERIT)*2.8}s`}},i):null}))),
     !gKlip&&!foto?h("div",{className:"harf"},UPc(((gIt.ad||"")[0]||"")+((gIt.soy||"")[0]||""),u)):null,
     gKlip&&gSlot==="ai"?h("div",{className:"gst-ai"},"✨ AI"):null),
    sin&&G.el!==!1?h("div",{className:"gst-el"},"👋"):null,
    sin&&G.el!==!1?h("div",{className:"gst-balon"},selam(u,en)):null),
   h("div",{className:"gst-bil"},
    h("div",{className:"gst-ust"},h("span",{className:"gst-cip"},G.alt?String(G.alt).replace(/s$|ler$|lar$/i,"")||G.alt:"Finalist"),GL.length>1?h("span",{className:"gst-say"},h("b",null,String(+G.i+1)),"  /  "+GL.length):null),
    G.baslik?h("div",{className:"gst-kat"},ap?h("img",{src:ap,alt:""}):null,h("span",null,G.baslik)):null,
    adT?h("div",{className:"gst-ad1"},adT):null,
    h("div",{className:"gst-ad2"+adSinif(soyT)},soyT||adT),
    u?h("div",{className:"gst-ul"},e.jsx(Bayrak,{u}),h("b",null,ulAd(u,en)),h("span",{className:"k"},u)):null,
    gIt.kulup&&gIt.kulup!==u&&gIt.kulup!==ulAd(u,en)?h("div",{className:"gst-kl"},gIt.kulup):null,
    G.eleme!==!1&&gIt.es?h("div",{className:"gst-elm"},MI("military_tech",{fontSize:"3vh"}),elmMetin(gIt,en)):null),
   GL.length>1&&GL.length<=24?h("div",{className:"gst-nok"},GL.map((_,i)=>e.jsx("i",{className:i===+G.i?"on":i<+G.i?"ok":""},i))):null)}
 else if(gs==="baslik"){const ap=katBaslikIcon(G.al),ul=[...new Set(GL.map(x=>x.ulke).filter(Boolean))];
  icerik=h("div",{className:"gst-bas"},ap?h("img",{className:"ap",src:ap,alt:""}):null,h("div",{className:"k1"},en?"Introducing":"Tanıtım"),h("div",{className:"t"},G.baslik||""),
   h("div",{className:"cz"},h("i"),h("span",null,(G.alt||(en?"Finalists":"Finalistler"))+(GL.length?" · "+GL.length:"")),h("i")),
   ul.length?h("div",{className:"bl"},ul.map((u,i)=>bayrakUrl(u)?h("span",{key:u,style:{animationDelay:(1+i*.12)+"s"}},h("img",{src:bayrakUrl(u),alt:""}),u):null)):null)}
 else if(gs==="liste"){const n=GL.length,c=n<=4?n:n<=8?4:n<=12?6:n<=18?6:8,rows=Math.max(1,Math.ceil(n/c)),fh=`calc(${(64/rows).toFixed(1)}vh - 8vh)`,cw=`min(${(88/c).toFixed(1)}vw, calc((${(64/rows).toFixed(1)}vh - 8vh) * .82))`;
  icerik=h("div",{className:"gst-lst"},h("div",{className:"lb"},h("b",null,G.baslik||""),h("span",null,G.alt||(en?"Finalists":"Finalistler"))),
   h("div",{className:"gst-grid",style:{gridTemplateColumns:`repeat(${c},${cw})`}},GL.map((x,i)=>{const p=FC[fp+"/"+comp+"/"+x.id],b=x.ulke&&bayrakUrl(x.ulke);
    return h("div",{key:x.id||i,className:"gst-gk",style:{"--fh":fh,animationDelay:(.15+i*.09)+"s"}},h("div",{className:"fo"},p?h("img",{className:"p",src:p,alt:""}):b?h("img",{className:"b",src:b,alt:""}):null,h("span",{className:"no"},x.no||i+1)),
     h("div",{className:"ad"},[x.ad,x.tk?x.soy:UPc(x.soy||"",x.ulke)].filter(Boolean).join(" ")),h("div",{className:"ul"},b?h("img",{src:b,alt:""}):null,x.ulke?ulAd(x.ulke,en):x.kulup||""))})))}
 else icerik=h("div",{className:"gst-logo"},h("div",{className:"ls"},h("div",{className:"lk"},h("img",{src:"/logo.png",alt:"TCF"})),evL?h("div",{className:"ay"}):null,evL?h("div",{className:"lk"},h("img",{src:evL,alt:""})):null),C&&C.isim?h("div",{className:"ad"},C.isim):null);
 return h("div",{className:"gst"+(imlec?" imlec":""),"data-gx-hide":"1",onDoubleClick:onizle?void 0:tam},
  h("style",null,CSS_E),h("div",{className:"gst-zemin"}),
  h("div",{className:"gst-blur",style:{backgroundImage:foto?`url(${foto})`:"none",opacity:foto?1:0}}),
  h("div",{className:"gst-huzme"}),e.jsx(Toz,{}),
  h("div",{key:gos?gos.k:"bos",className:"gst-sahne"+(cik?" cik":"")},gs!=="logo"?kose:null,icerik),
  h("div",{className:"gst-kapali"+(ST&&ST.sahne==="kapali"?" on":"")}),
  onizle?null:h("div",{className:"gst-tam"},h("button",{type:"button",onClick:tam},MI("fullscreen",{fontSize:18}),__T("Tam ekran"))))}

// ======================================================= KONTROL =======================================================
const CSS_K=`.stc{min-height:100vh;background:#F4F5FA;padding:18px clamp(12px,3vw,32px) 40px;font-family:inherit;color:#0F172A;box-sizing:border-box}
.stc *{box-sizing:border-box}
.stc-bas{display:flex;align-items:center;gap:12px;margin-bottom:16px;flex-wrap:wrap}
.stc-btn{display:inline-flex;align-items:center;justify-content:center;gap:6px;border-radius:12px;padding:10px 14px;font-weight:800;font-size:14px;cursor:pointer;border:1px solid #E2E8F0;background:#fff;color:#0F172A;font-family:inherit;text-decoration:none;line-height:1.1}
.stc-btn:disabled{opacity:.45;cursor:not-allowed}
.stc-btn.koyu{background:#0F172A;border-color:#0F172A;color:#fff}
.stc-btn.ana{background:linear-gradient(135deg,#7C3AED,#DB2777);border:0;color:#fff;box-shadow:0 10px 24px -12px #7C3AED}
.stc-btn.kirmizi{background:#DC2626;border-color:#DC2626;color:#fff}
.stc-btn.yesil{background:#16A34A;border-color:#16A34A;color:#fff}
.stc-btn.kucuk{padding:7px 10px;font-size:12.5px;border-radius:10px}
.stc-sel{padding:10px 12px;border-radius:12px;border:1px solid #E2E8F0;font-weight:700;font-family:inherit;font-size:14px;background:#fff;max-width:100%}
.stc-kart{background:#fff;border:1px solid #E5E7EB;border-radius:18px;padding:16px;margin-bottom:14px}
.stc-k{font-size:12px;font-weight:900;letter-spacing:.08em;color:#64748B;text-transform:uppercase;margin-bottom:10px;display:flex;align-items:center;gap:6px}
.stc-izgara{display:grid;grid-template-columns:minmax(0,1fr) minmax(320px,440px);gap:16px;align-items:start}
@media(max-width:1000px){.stc-izgara{grid-template-columns:1fr}.stc-yan{position:static!important}}
.stc-yan{position:sticky;top:12px}
.stc-oniz{position:relative;width:100%;aspect-ratio:16/9;border-radius:14px;overflow:hidden;background:#04060D;box-shadow:0 10px 30px -14px rgba(15,23,42,.5)}
.stc-oniz iframe{position:absolute;left:0;top:0;width:1600px;height:900px;border:0;transform-origin:0 0;pointer-events:none}
.stc-oniz .et{position:absolute;left:10px;top:10px;z-index:2;font-size:11px;font-weight:900;letter-spacing:.1em;color:#fff;background:#DC2626;padding:3px 8px;border-radius:6px}
.stc-durum{font-size:14px;font-weight:800;margin:10px 0 2px;display:flex;align-items:center;gap:8px;flex-wrap:wrap}
.stc-ak{display:grid;grid-template-columns:1fr 1.5fr 1fr;gap:8px;margin-top:12px}
.stc-ak .stc-btn{padding:14px 8px;font-size:15px;flex-direction:column;gap:3px}
.stc-ak .stc-btn small{font-size:11px;font-weight:700;opacity:.8;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.stc-ak2{display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin-top:8px}
.stc-ak2 .stc-btn{flex-direction:column;gap:2px;padding:9px 4px;font-size:12px}
.stc-ak2 .stc-btn.on{border:2px solid #7C3AED;background:#F5F3FF;color:#5B21B6}
.stc-mod{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}
.stc-mod button{border:1px solid #E2E8F0;background:#fff;border-radius:14px;padding:12px 10px;text-align:left;cursor:pointer;font-family:inherit;display:flex;flex-direction:column;gap:4px}
.stc-mod button b{font-size:14px;display:flex;align-items:center;gap:6px}
.stc-mod button span{font-size:11.5px;color:#64748B;font-weight:600;line-height:1.35}
.stc-mod button.on{border:2px solid #7C3AED;background:linear-gradient(135deg,#F5F3FF,#FDF2F8);box-shadow:0 8px 20px -14px #7C3AED}
@media(max-width:640px){.stc-mod{grid-template-columns:1fr}}
.stc-anah{display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:12px;border:1px solid #E2E8F0;cursor:pointer;font-weight:800;font-size:13.5px;user-select:none;background:#fff}
.stc-anah input{width:18px;height:18px;accent-color:#7C3AED}
.stc-anah.on{border-color:#C4B5FD;background:#F5F3FF}
.stc-sat{display:grid;grid-template-columns:34px 54px minmax(0,1fr) auto;gap:10px;align-items:center;padding:8px 10px;border-radius:14px;border:1px solid #EEF0F4;background:#fff;margin-bottom:6px;transition:background .2s}
.stc-sat.ekranda{border:2px solid #16A34A;background:#F0FDF4}
.stc-sat.siradaki{border-style:dashed;border-color:#A78BFA}
.stc-sat .no{font-weight:900;font-size:16px;text-align:center;color:#475569}
.stc-sat .fo{width:54px;height:64px;border-radius:10px;background:#F1F5F9;overflow:hidden;display:grid;place-items:center;position:relative}
.stc-sat .fo img{width:100%;height:100%;object-fit:cover}
.stc-sat .fo .bf{position:absolute;right:2px;bottom:2px;width:20px;border-radius:2px;height:auto;box-shadow:0 0 0 1px #fff}
.stc-sat .ad{font-weight:900;font-size:15px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.stc-sat .al{font-size:12px;color:#64748B;font-weight:700;display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-top:2px}
.stc-rozet{display:inline-flex;align-items:center;gap:3px;font-size:11px;font-weight:900;padding:2px 7px;border-radius:99px;background:#F1F5F9;color:#64748B}
.stc-rozet.var{background:#DCFCE7;color:#166534}.stc-rozet.ai{background:#F3E8FF;color:#6B21A8}.stc-rozet.yok{background:#FEF2F2;color:#B91C1C}
.stc-sat .ac{display:flex;gap:6px;align-items:center}
.stc-medya{grid-column:1/-1;border-top:1px dashed #E2E8F0;margin-top:6px;padding-top:10px;display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:10px}
.stc-mk{border:1px solid #E5E7EB;border-radius:14px;padding:10px;display:flex;flex-direction:column;gap:8px;background:#FAFAFC}
.stc-mk h4{margin:0;font-size:13px;font-weight:900;display:flex;align-items:center;gap:6px}
.stc-mk p{margin:0;font-size:11.5px;color:#64748B;font-weight:600;line-height:1.4}
.stc-mk .pv{width:100%;aspect-ratio:4/5;max-height:220px;border-radius:10px;overflow:hidden;background:#0F172A;position:relative}
.stc-mk .pv>*{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;border:0}
.stc-mk .bt{display:flex;gap:6px;flex-wrap:wrap}
.stc-uyari{font-size:12.5px;font-weight:800;color:#B45309;background:#FFFBEB;border:1px solid #FDE68A;border-radius:10px;padding:8px 10px}
.stc-bilgi{font-size:12.5px;font-weight:700;color:#475569;background:#F8FAFC;border:1px solid #E2E8F0;border-radius:10px;padding:8px 10px;line-height:1.45}
.stc-kisa{font-size:11.5px;color:#94A3B8;font-weight:700;margin-top:8px}
.stc-kisa kbd{font-family:inherit;font-weight:900;border:1px solid #CBD5E1;border-bottom-width:2px;border-radius:5px;padding:0 5px;color:#475569;background:#fff}
`;
function useCompK(fp,comp){const[C,setC]=R.useState(null);R.useEffect(()=>{setC(null);if(!fp||!comp)return;const st={},u=["isim","ciktiDili","uluslararasi","tur","kategoriler","finalAyar","sporcuTanitim"].map(k=>onValue(ref(db,`${fp}/${comp}/${k}`),s=>{st[k]=s.val();setC({...st})}));return()=>u.forEach(f=>f())},[fp,comp]);return C}
const isFinK=(kats,k)=>/^final_/.test(k)||!!(kats&&kats[k]&&kats[k].final===!0);
const aletlerOf=z=>{const a=z&&z.aletler;if(Array.isArray(a))return a.map(x=>typeof x=="object"?x.id||x.value:x).filter(Boolean);if(a&&typeof a=="object")return Object.keys(a);return[]};
const ALS=["serbest","ip","cember","top","labut","kurdele","grup_seri1","grup_seri2"];

export default function SporcuTanitim(){
 const{firebasePath:fp,routePrefix:rp}=usDisc()||{},{currentUser:cu}=usAuth()||{},kim=cu?.adSoyad||cu?.kullaniciAdi||"admin",GV=typeof self!=="undefined"?self.GXYV:null;
 const[comps,setComps]=R.useState({}),[comp,setComp]=R.useState(()=>lsAl("gxTanitimComp"));
 R.useEffect(()=>{if(!fp)return;return onValue(ref(db,fp),s=>{const v=s.val()||{},o={};Object.entries(v).forEach(([k,c])=>{c&&c.isim&&c.arsivli!==!0&&c.arsivli!=="true"&&(o[k]={isim:c.isim,intl:!!(c.uluslararasi||c.tur==="uluslararasi"),t:c.baslangicTarihi||""})});setComps(o)},{onlyOnce:!0})},[fp]);
 R.useEffect(()=>{const L=Object.entries(comps);if(!L.length||comp&&comps[comp])return;const t=L.sort((a,b)=>(b[1].intl-a[1].intl)||String(b[1].t).localeCompare(String(a[1].t)))[0];t&&setComp(t[0])},[comps]);
 R.useEffect(()=>{lsYaz("gxTanitimComp",comp)},[comp]);
 const C=useCompK(fp,comp),kats=C&&C.kategoriler||{},en=enOf(C),ST=C&&C.sporcuTanitim||{};
 // ---- kaynak ----
 const srcOps=R.useMemo(()=>{const o=[],fin=[],ad=[],tum=[],A=C&&C.finalAyar||{},sec=A.sec||{},useAA=A.useAA!=null?!!A.useAA:!0;
  Object.keys(kats).forEach(k=>{if(isFinK(kats,k)){fin.push({v:"fin|"+k,t:GV?GV.katAd(kats,k,!1):k});return}
   const z=kats[k]||{},ka=GV?GV.katAd(kats,k,!1):k,als=aletlerOf(z).sort((a,b)=>ALS.indexOf(a)-ALS.indexOf(b));tum.push({v:"tum|"+k,t:ka});
   [...(useAA?["_cm"]:[]),...als].forEach(a=>{if(sec[k+"|"+a]===!1)return;const fk=a==="_cm"?"final_"+k:"final_"+k+"__"+a;if(kats[fk])return;ad.push({v:"ad|"+k+"|"+a,t:ka+" — "+(a==="_cm"?"Genel Tasnif":GV?GV.aletAd(a,!1):a)})})});
  const s=(x,y)=>x.t.localeCompare(y.t,"tr");fin.length&&o.push({g:__T("Oluşturulmuş finaller"),l:fin.sort(s)});ad.length&&o.push({g:__T("Final adayları (final henüz oluşturulmadı)"),l:ad.sort(s)});tum.length&&o.push({g:__T("Kategori — tüm sporcular"),l:tum.sort(s)});return o},[C&&C.kategoriler,C&&C.finalAyar,GV]);
 const[src,setSrc]=R.useState("");
 R.useEffect(()=>{if(!C)return;const hep=srcOps.flatMap(g=>g.l.map(x=>x.v));if(src&&hep.includes(src))return;const k=lsAl("gxTanitimSrc|"+comp);setSrc(hep.includes(k)?k:ST.kaynak&&hep.includes(ST.kaynak)?ST.kaynak:hep[0]||"")},[srcOps,comp,!!C]);
 R.useEffect(()=>{src&&comp&&lsYaz("gxTanitimSrc|"+comp,src)},[src]);
 const[tip,k1,k2]=src.split("|"),fz=tip==="fin"?kats[k1]||{}:{},baseK=tip==="fin"?fz.baseCat||String(k1).replace(/^final_/,"").split("__")[0]:k1,alK=tip==="fin"?fz.alet||(String(k1).split("__")[1]||null):tip==="ad"&&k2!=="_cm"?k2:null;
 const[veri,setVeri]=R.useState(null);
 R.useEffect(()=>{setVeri(null);if(!fp||!comp||!src)return;const st={src},yol=[["fs",tip==="fin"?`sporcular/${k1}`:null],["bs",`sporcular/${baseK}`],["bp",`puanlar/${baseK}`]].filter(x=>x[1]);
  const u=yol.map(([n,p])=>onValue(ref(db,`${fp}/${comp}/${p}`),s=>{st[n]=s.val()||{};if(yol.every(([m])=>m in st))setVeri({...st})}));return()=>u.forEach(f=>f())},[fp,comp,src]);
 const[adayF,setAdayF]=R.useState(null);R.useEffect(()=>{if(tip!=="ad"||adayF)return;import("./RaporlarPage-Rp01a2b3Cb2.js").then(m=>setAdayF(()=>m.finalAdayHesapla)).catch(()=>{})},[tip]);
 const[sira,setSira]=R.useState("cs"),[yedek,setYedek]=R.useState(!1);
 R.useEffect(()=>{setSira(tip==="fin"?"cs":"el")},[src]);
 const ham=R.useMemo(()=>{if(!veri||veri.src!==src||!GV)return null;const bs=veri.bs||{},bp=veri.bp||{},ad2=(m,full)=>{const so=String(m&&m.soyad||"").trim(),a=String(m&&m.ad||"").trim();return so?{ad:a,soy:so}:(()=>{const p=String(full||a).trim().split(/\s+/);return{ad:p.slice(0,-1).join(" "),soy:p.slice(-1)[0]||""}})()};
  let elm={};try{const S=GV.siralama({brans:"ritmik",kats,kat:baseK,spor:bs,puan:bp,alet:alK||null});S.satirlar.forEach(r=>{r.sira&&r.giris&&(elm[r.giris.id]={es:r.sira,ep:r.s&&r.s.total})})}catch(er){console.error(er)}
  const nesne=(g,m,ex)=>{const n=g.takim?{ad:"",soy:g.ad}:ad2(m,g.ad);return{id:g.id,ad:n.ad,soy:n.soy,ulke:String(g.ulke||m&&m.ulke||"").trim().toUpperCase()||null,kulup:g.takim?(g.uyeler||[]).map(x=>typeof x==="string"?x:[x&&x.ad,x&&x.soyad].filter(Boolean).join(" ")).filter(Boolean).join(", "):g.kulup||"",bib:g.bib||null,tk:!!g.takim,cs:g.start||null,...ex}};
  if(tip==="fin"){const fs=veri.fs||{},G=GV.girisler(k1,fs,{});return G.map(g=>{const m=fs[g.id]||(g.takim?Object.values(fs).find(x=>x&&(x.okul||x.kulup)===g.kulup):null)||{},ilk=g.takim?Object.values(fs).find(x=>x&&(x.okul||x.kulup||"")===g.kulup)||{}:m,e0=elm[g.id]||{};return nesne(g,m,{yedek:!!ilk._yedek,es:+ilk._finalRank||e0.es||null,ep:e0.ep??null})})}
  if(tip==="tum"){const G=GV.girisler(baseK,bs,bp);return G.map(g=>nesne(g,bs[g.id]||{},{es:(elm[g.id]||{}).es||null,ep:(elm[g.id]||{}).ep??null}))}
  if(tip==="ad"){if(!adayF)return null;let U=null;try{U=adayF({kategoriler:kats,sporcular:{[baseK]:bs},puanlar:{[baseK]:bp},finalAyar:C.finalAyar||{},uluslararasi:C.uluslararasi,tur:C.tur}).find(x=>x.cat===baseK&&x.alet===k2)}catch(er){console.error(er)}
   if(!U)return[];const G=Object.fromEntries(GV.girisler(baseK,bs,bp).map(g=>[g.id,g]));return U.list.map(r=>{const g=G[r.id]||{id:r.id,ad:r.ad,ulke:r.ulke,kulup:r.kulup,bib:r.bib};return nesne(g,bs[r.id]||{},{yedek:r.durum!=="Q",es:r.eleme,ep:r.score})})}
  return[]},[veri,src,GV,adayF,kats]);
 const liste=R.useMemo(()=>{if(!ham)return null;let L=ham.filter(x=>yedek||!x.yedek);const by={cs:(a,b)=>(a.yedek-b.yedek)||((a.cs||999)-(b.cs||999))||((a.es||999)-(b.es||999)),el:(a,b)=>(a.yedek-b.yedek)||((a.es||999)-(b.es||999)),ter:(a,b)=>(a.yedek-b.yedek)||((b.es||0)-(a.es||0)),ad:(a,b)=>String(a.soy).localeCompare(String(b.soy),"tr")};
  return[...L].sort(by[sira]||by.cs)},[ham,sira,yedek]);
 const baslik0=R.useMemo(()=>{if(!GV||!src)return"";if(tip==="fin")return GV.katAd(kats,k1,en);const ka=GV.katAd(kats,baseK,en);if(tip==="ad")return ka+" — "+(k2==="_cm"?(en?"All-Around Final":"Genel Tasnif Finali"):GV.aletAd(k2,en)+(en?" Final":" Finali"));return ka},[src,kats,en,GV]);
 const[baslikE,setBaslikE]=R.useState("");R.useEffect(()=>{setBaslikE("")},[src]);
 const baslik=baslikE.trim()||baslik0,alt=tip==="tum"?(en?"Athletes":"Sporcular"):(en?"Finalists":"Finalistler");
 // ---- foto + medya özeti ----
 const[fotoS,setFotoS]=R.useState({}),[ix,setIx]=R.useState({});
 R.useEffect(()=>{if(!fp||!comp)return;return onValue(ref(db,MIX(fp,comp)),s=>setIx(s.val()||{}))},[fp,comp]);
 R.useEffect(()=>{if(!liste)return;let ip=!1;liste.forEach(x=>fotoAl(fp,comp,x.id).then(u=>!ip&&setFotoS(o=>o[x.id]===u?o:{...o,[x.id]:u})));return()=>{ip=!0}},[liste&&liste.map(x=>x.id).join()]);
 // ---- yayın ----
 const mod=ST.mod||"sinematik",el=ST.el!==!1,eleme=ST.eleme!==!1,overlay=!!ST.overlay,sahne=ST.sahne||"logo",ayni=ST.kaynak===src;
 const ptr=ayni&&ST.i!=null?+ST.i:-1,onI=sahne==="sporcu"&&ayni?ptr:null,n=liste?liste.length:0;
 const yol=`${fp}/${comp}/sporcuTanitim`;
 const yaz=async(o,msj)=>{if(!comp)return;try{await update(ref(db,yol),{...o,ts:Date.now(),kim});if(msj)try{logAction("athlete_intro",msj,{user:kim,competitionId:comp})}catch{}}catch(er){console.error(er);window.alert&&alert(__T("Yazılamadı")+": "+(er&&er.message||er))}};
 const paket=()=>({kaynak:src,baslik,alt,al:alK||null,liste:(liste||[]).map((x,i)=>JSON.parse(JSON.stringify({id:x.id,ad:x.ad||"",soy:x.soy||"",ulke:x.ulke||null,un:x.ulke?ulAd(x.ulke,!1):null,ue:x.ulke?ulAd(x.ulke,!0):null,kulup:x.kulup||"",bib:x.bib||null,no:i+1,es:x.es||null,ep:x.ep!=null&&x.ep!==""?+x.ep:null,tk:x.tk||null,mv:!!(ix[x.id]&&ix[x.id].video)||null,ma:!!(ix[x.id]&&ix[x.id].ai)||null})))});
 const goster=i=>{if(!liste||!liste[i])return;yaz({...paket(),sahne:"sporcu",i,oncekiSahne:null},`Sporcu tanıtımı: ${baslik} — ${i+1}. ${[liste[i].ad,liste[i].soy].join(" ")}`)};
 const sonraki=()=>{if(!n)return;ptr+1>=n?yaz({...paket(),sahne:"liste",oncekiSahne:null},`Sporcu tanıtımı: ${baslik} — liste`):goster(ptr+1)};
 const onceki=()=>{if(!n)return;goster(Math.max(0,ptr-1))};
 const baslikVer=()=>yaz({...paket(),sahne:"baslik",i:ayni?ST.i??null:null,oncekiSahne:null},`Sporcu tanıtımı: ${baslik} — başlık`);
 const listeVer=()=>yaz({...paket(),sahne:"liste",oncekiSahne:null},`Sporcu tanıtımı: ${baslik} — liste`);
 const logolar=()=>yaz({sahne:"logo",oncekiSahne:null},"Sporcu tanıtımı: logolar");
 const karart=()=>sahne==="kapali"?yaz({sahne:ST.oncekiSahne||"logo",oncekiSahne:null},"Sporcu tanıtımı: devam"):yaz({sahne:"kapali",oncekiSahne:sahne},"Sporcu tanıtımı: karartıldı");
 const ayar=o=>{const p={...o};if(ayni&&liste)Object.assign(p,{liste:paket().liste});yaz(p)};
 // klavye: → / boşluk sonraki · ← önceki · B başlık · L liste · Esc logolar
 const kR=R.useRef({});kR.current={sonraki,onceki,baslikVer,listeVer,logolar};
 R.useEffect(()=>{const f=ev=>{const t=ev.target,tg=t&&t.tagName;if(tg==="INPUT"||tg==="SELECT"||tg==="TEXTAREA"||t&&t.isContentEditable||ev.metaKey||ev.ctrlKey||ev.altKey)return;if(document.querySelector('[role="dialog"],.gx-modal'))return;
  const K=kR.current;if(ev.key==="ArrowRight"||ev.key===" "){ev.preventDefault();K.sonraki()}else if(ev.key==="ArrowLeft"){ev.preventDefault();K.onceki()}else if(ev.key==="b"||ev.key==="B")K.baslikVer();else if(ev.key==="l"||ev.key==="L")K.listeVer();else if(ev.key==="Escape")K.logolar()};
  window.addEventListener("keydown",f);return()=>window.removeEventListener("keydown",f)},[]);
 // ---- önizleme ölçeği ----
 const ozR=R.useRef(null),[oz,setOz]=R.useState(.25);
 R.useEffect(()=>{const el=ozR.current;if(!el)return;const ro=new ResizeObserver(()=>setOz(el.clientWidth/1600));ro.observe(el);return()=>ro.disconnect()},[comp]);
 const url=comp?`${location.origin}${rp||"/rhythmic"}/athlete-intro-screen?compId=${encodeURIComponent(comp)}`:"";
 const[ok,setOk]=R.useState("");const kopya=async()=>{try{await navigator.clipboard.writeText(url);setOk("✓")}catch{await window.__gxPrompt(__T("Linki kopyalayın:"),url)}setTimeout(()=>setOk(""),1800)};
 // ---- medya ----
 const[acik,setAcik]=R.useState(null),[mDur,setMDur]=R.useState({}),[onay,setOnay]=R.useState({}),[pv,setPv]=R.useState({});
 R.useEffect(()=>{if(!acik)return;["video","ai"].forEach(sl=>{if(ix[acik]&&ix[acik][sl]){const k=fp+"/"+comp+"/"+acik+"/"+sl;delete MC[k];medyaAl(fp,comp,acik,sl).then(v=>setPv(o=>({...o,[acik+"|"+sl]:v})))}else setPv(o=>({...o,[acik+"|"+sl]:null}))})},[acik,ix[acik]&&JSON.stringify(ix[acik])]);
 const durum=(id,sl,t)=>setMDur(o=>({...o,[id+"|"+sl]:t}));
 const medyaKaydet=async(x,sl,v)=>{const ts=Date.now();await update(ref(db,MEDYA(fp,comp,x.id)),{[sl]:{...v,ts,kim,...(sl==="ai"?{onay:{kim,ts}}:{})}});await update(ref(db,MIX(fp,comp,x.id)),{[sl]:{ts,tip:v.tip,boyut:v.boyut||null}});delete MC[fp+"/"+comp+"/"+x.id+"/"+sl];
  try{logAction("athlete_intro",`Sporcu tanıtımı ${sl==="ai"?"yapay zekâ klibi":"videosu"} eklendi: ${[x.ad,x.soy].join(" ")}`,{user:kim,competitionId:comp})}catch{}
  if(ayni&&liste)yaz({liste:paket().liste.map(y=>y.id===x.id?{...y,[sl==="ai"?"ma":"mv"]:!0}:y)})};
 const dosyaYukle=x=>async sl=>{if(sl==="ai"&&!onay[x.id]){await window.__gxConfirm(__T("Önce onay kutusunu işaretleyin."));return}
  const f=await new Promise(ok=>{const i=document.createElement("input");i.type="file";i.accept="video/*,image/gif,image/webp";i.style.display="none";i.onchange=()=>{ok(i.files&&i.files[0]||null);i.remove()};document.body.appendChild(i);i.click()});if(!f)return;
  try{durum(x.id,sl,__T("Hazırlanıyor…"));let url,mime=f.type||"";
   if(/^image\/(gif|webp)$/.test(mime)){if(f.size>6e6)throw new Error(__T("Görsel çok büyük (en çok 6 MB)"));url=await dataURL(f)}
   else if(/^video\//.test(mime)||/\.(mp4|mov|webm|m4v)$/i.test(f.name)){let b=f;const m=await videoMeta(f);if(f.size>45e5||m.h>720||m.d>10.5){durum(x.id,sl,__T("Video küçültülüyor… (klip süresi kadar sürer)"));b=await kucultVideo(f)}
    if(b.size>7e6)throw new Error(__T("Video hâlâ çok büyük; 10 saniyeden kısa bir klip seçin"));url=await dataURL(b);mime=b.type||mime}
   else throw new Error(__T("Video ya da GIF dosyası seçin"));
   durum(x.id,sl,__T("Kaydediliyor…"));await medyaKaydet(x,sl,{url,tip:"dosya",mime,ad:f.name,boyut:url.length});durum(x.id,sl,"✓ "+__T("Kaydedildi"))}catch(er){durum(x.id,sl,"⚠ "+(er&&er.message||er))}};
 const linkEkle=x=>async sl=>{if(sl==="ai"&&!onay[x.id]){await window.__gxConfirm(__T("Önce onay kutusunu işaretleyin."));return}const u=await window.__gxPrompt(__T("Klip linki (mp4/webm, Google Drive ya da YouTube):"),"");if(!u||!/^https?:\/\//.test(String(u).trim()))return;
  try{await medyaKaydet(x,sl,{url:String(u).trim(),tip:"link"});durum(x.id,sl,"✓ "+__T("Kaydedildi"))}catch(er){durum(x.id,sl,"⚠ "+(er&&er.message||er))}};
 const medyaSil=x=>async sl=>{if(!await window.__gxConfirm(__T("Bu klip silinsin mi?")))return;await update(ref(db,MEDYA(fp,comp,x.id)),{[sl]:null});await update(ref(db,MIX(fp,comp,x.id)),{[sl]:null});delete MC[fp+"/"+comp+"/"+x.id+"/"+sl];durum(x.id,sl,"");if(ayni&&liste)yaz({liste:paket().liste.map(y=>y.id===x.id?{...y,[sl==="ai"?"ma":"mv"]:null}:y)})};
 const fotoYukle=async x=>{const[f]=await dosyaSec(!1);if(!f)return;try{durum(x.id,"foto",__T("Kaydediliyor…"));const u=await fotoKaydet(fp,comp,x.id,f,[x.ad,x.soy].filter(Boolean).join(" "));FC[fp+"/"+comp+"/"+x.id]=u;setFotoS(o=>({...o,[x.id]:u}));durum(x.id,"foto","✓")}catch(er){durum(x.id,"foto","⚠ "+(er&&er.message||er))}};
 const fotoIndir=x=>{const u=fotoS[x.id];if(!u)return;const a=document.createElement("a");a.href=u;a.download=([x.ad,x.soy].filter(Boolean).join("_")||x.id)+".jpg";document.body.appendChild(a);a.click();a.remove()};
 const istemKopya=async()=>{try{await navigator.clipboard.writeText(AI_ISTEM);setOk("istem")}catch{await window.__gxPrompt(__T("İstemi kopyalayın:"),AI_ISTEM)}setTimeout(()=>setOk(""),1800)};
 // ---- görünüm ----
 const ekr=sahne==="sporcu"&&ST.liste&&ST.liste[ST.i]?ST.liste[ST.i]:null,adYaz=x=>x?[x.ad,x.tk?x.soy:UPc(x.soy||"",x.ulke)].filter(Boolean).join(" "):"";
 const sahneAd={logo:__T("TCF ve yarışma logosu"),baslik:__T("Başlık kartı")+(ST.baslik?" · "+ST.baslik:""),liste:__T("Finalist listesi")+(ST.baslik?" · "+ST.baslik:""),kapali:"⏸ "+__T("Ekran karartıldı")}[sahne]||"";
 const sir=ptr+1<n?liste[ptr+1]:null,modUyari=mod!=="sinematik"&&liste?liste.filter(x=>!(ix[x.id]&&ix[x.id][mod==="ai"?"ai":"video"])).length:0;
 const MODS=[["sinematik","auto_awesome",__T("Sinematik"),__T("Fotoğraf canlanır: yavaş yakınlaşma, selamlama salınımı, ışık süzmesi, dalgalanan bayrak, 👋 ve selam balonu.")],
  ["video","videocam",__T("Video"),__T("Sporcunun kendi el sallama klibi (3–5 sn) oynar. Klip yüklenmemiş sporcuda sinematik gösterilir.")],
  ["ai","smart_toy",__T("Yapay zekâ"),__T("Fotoğraftan dışarıda üretilmiş el sallama klibi oynar (köşede “AI” etiketi). Klip yoksa sinematik.")]];
 const satir=(x,i)=>{const on=onI===i,sr=!on&&i===ptr+1&&sahne!=="logo",fo=fotoS[x.id],m=ix[x.id]||{},b=x.ulke&&bayrakUrl(x.ulke),aD=acik===x.id;
  const mk=(sl,bas,ic,acik_)=>{const v=pv[x.id+"|"+sl],dr=mDur[x.id+"|"+sl];return h("div",{className:"stc-mk"},h("h4",null,MI(ic,{fontSize:18}),bas),acik_,
   v?h("div",{className:"pv"},e.jsx(Oynat,{u:v.url})):m[sl]?h("p",null,__T("Yükleniyor…")):h("p",null,__T("Klip yok.")),
   sl==="ai"?h("label",{className:"stc-anah"+(onay[x.id]?" on":"")},h("input",{type:"checkbox",checked:!!onay[x.id],onChange:ev=>setOnay(o=>({...o,[x.id]:ev.target.checked}))}),h("span",{style:{fontSize:12,fontWeight:700}},__T("Sporcunun (18 yaş altıysa velisinin) ve federasyonun onayı alındı"))):null,
   h("div",{className:"bt"},h("button",{type:"button",className:"stc-btn kucuk",onClick:()=>dosyaYukle(x)(sl),disabled:sl==="ai"&&!onay[x.id]},MI("upload",{fontSize:16}),__T("Dosya yükle")),h("button",{type:"button",className:"stc-btn kucuk",onClick:()=>linkEkle(x)(sl),disabled:sl==="ai"&&!onay[x.id]},MI("link",{fontSize:16}),__T("Link")),m[sl]?h("button",{type:"button",className:"stc-btn kucuk",onClick:()=>medyaSil(x)(sl),style:{color:"#B91C1C"}},MI("delete",{fontSize:16}),__T("Sil")):null),
   dr?h("p",{style:{fontWeight:800,color:/^⚠/.test(dr)?"#B91C1C":"#166534"}},dr):null)};
  return h("div",{key:x.id,className:"stc-sat"+(on?" ekranda":"")+(sr?" siradaki":"")},
   h("div",{className:"no"},String(i+1)),
   h("div",{className:"fo"},fo?h("img",{src:fo,alt:""}):b?h("img",{src:b,alt:"",style:{objectFit:"cover"}}):MI("person",{color:"#94A3B8"}),fo&&b?h("img",{className:"bf",src:b,alt:""}):null),
   h("div",{style:{minWidth:0}},h("div",{className:"ad"},adYaz(x)),h("div",{className:"al"},x.ulke?h("span",null,x.ulke+" · "+ulAd(x.ulke,!1)):null,x.kulup&&x.kulup!==x.ulke?h("span",null,x.kulup):null,x.es?h("span",null,__T("Eleme")+" "+x.es+"."+(x.ep!=null?" · "+f3(x.ep):"")):null,x.yedek?h("span",{className:"stc-rozet yok"},__T("Yedek")):null,
    h("span",{className:"stc-rozet"+(fo?" var":" yok")},"📷"),h("span",{className:"stc-rozet"+(m.video?" var":"")},"🎬 "+(m.video?__T("video"):"—")),h("span",{className:"stc-rozet"+(m.ai?" ai":"")},"✨ "+(m.ai?"AI":"—")))),
   h("div",{className:"ac"},on?h("span",{className:"stc-rozet var",style:{fontSize:11.5}},"● "+__T("EKRANDA")):null,h("button",{type:"button",className:"stc-btn kucuk",onClick:()=>setAcik(aD?null:x.id),title:__T("Fotoğraf ve klipler")},MI(aD?"expand_less":"perm_media",{fontSize:17})),h("button",{type:"button",className:"stc-btn kucuk "+(on?"yesil":"koyu"),onClick:()=>goster(i)},MI("cast",{fontSize:16}),on?__T("Yeniden"):__T("Ekrana ver"))),
   aD?h("div",{className:"stc-medya"},
    h("div",{className:"stc-mk"},h("h4",null,MI("photo_camera",{fontSize:18}),__T("Fotoğraf")),fo?h("div",{className:"pv"},h("img",{src:fo,alt:""})):h("p",null,__T("Fotoğraf yok — sinematik modda bayrak ve baş harfler gösterilir.")),
     h("div",{className:"bt"},h("button",{type:"button",className:"stc-btn kucuk",onClick:()=>fotoYukle(x)},MI("upload",{fontSize:16}),fo?__T("Değiştir"):__T("Yükle")),fo?h("button",{type:"button",className:"stc-btn kucuk",onClick:()=>fotoIndir(x)},MI("download",{fontSize:16}),__T("İndir")):null),mDur[x.id+"|foto"]?h("p",null,mDur[x.id+"|foto"]):null),
    mk("video",__T("Video — el sallama klibi"),"videocam",h("p",null,__T("3–5 sn, dik çekim önerilir. Büyük video tarayıcıda 720p'ye küçültülür (ses atılır)."))),
    mk("ai",__T("Yapay zekâ klibi"),"smart_toy",h("p",null,__T("Fotoğrafı indirip bir yapay zekâ video aracında istemle el sallatın, çıkan klibi buraya yükleyin. Sistem fotoğrafı hiçbir servise göndermez."),h("br"),h("button",{type:"button",className:"stc-btn kucuk",style:{marginTop:6},onClick:istemKopya},MI(ok==="istem"?"check":"content_copy",{fontSize:15}),ok==="istem"?__T("Kopyalandı!"):__T("İstemi kopyala"))))):null)};
 return h("div",{className:"stc"},h("style",null,CSS_K),
  h("div",{className:"stc-bas"},h("button",{type:"button",className:"stc-btn",style:{padding:8},onClick:()=>history.back(),title:__T("Geri")},MI("arrow_back")),
   h("div",{style:{width:42,height:42,borderRadius:12,display:"grid",placeItems:"center",background:"linear-gradient(135deg,#7C3AED,#DB2777)",color:"#fff"}},MI("waving_hand")),
   h("div",{style:{flex:1,minWidth:200}},h("div",{style:{fontWeight:900,fontSize:"1.15rem"}},__T("Sporcu Tanıtımı")),h("div",{style:{fontSize:".8rem",color:"#64748B",fontWeight:700}},__T("Finalistleri tek tek projeksiyona ve yayına ver — fotoğraf, ülke, takım, canlandırma"))),
   h("select",{className:"stc-sel",value:comp,onChange:ev=>setComp(ev.target.value),style:{minWidth:260}},h("option",{value:""},__T("Yarışma seçin…")),Object.entries(comps).sort((a,b)=>(b[1].intl-a[1].intl)||String(b[1].t).localeCompare(String(a[1].t))).map(([k,c])=>h("option",{key:k,value:k},c.isim)))),
  !comp?h("div",{className:"stc-kart",style:{color:"#64748B",fontWeight:700}},__T("Yarışma seçin.")):
  h("div",{className:"stc-izgara"},
   h("div",{style:{minWidth:0}},
    h("div",{className:"stc-kart"},h("div",{className:"stc-k"},MI("format_list_numbered",{fontSize:17}),__T("Kimler tanıtılacak?")),
     h("div",{style:{display:"flex",gap:8,flexWrap:"wrap"}},
      h("select",{className:"stc-sel",value:src,onChange:ev=>setSrc(ev.target.value),style:{flex:"2 1 300px"}},srcOps.length?null:h("option",{value:""},__T("Kategori yok")),srcOps.map(g=>h("optgroup",{key:g.g,label:g.g},g.l.map(x=>h("option",{key:x.v,value:x.v},x.t))))),
      h("select",{className:"stc-sel",value:sira,onChange:ev=>setSira(ev.target.value),style:{flex:"1 1 180px"}},tip==="fin"?h("option",{value:"cs"},__T("Çıkış sırasına göre")):null,h("option",{value:"el"},__T("Eleme sırası (1 → son)")),h("option",{value:"ter"},__T("Ters eleme sırası (son → 1)")),h("option",{value:"ad"},__T("Soyadına göre (A → Z)")))),
     h("div",{style:{display:"flex",gap:8,flexWrap:"wrap",marginTop:8}},h("input",{className:"stc-sel",value:baslikE,onChange:ev=>setBaslikE(ev.target.value),placeholder:baslik0||__T("Başlık"),style:{flex:"2 1 300px"},title:__T("Ekrandaki başlık (boş bırakılırsa otomatik)")}),
      tip!=="tum"?h("label",{className:"stc-anah"+(yedek?" on":""),style:{flex:"1 1 180px"}},h("input",{type:"checkbox",checked:yedek,onChange:ev=>setYedek(ev.target.checked)}),__T("Yedekleri de göster")):null),
     tip==="ad"?h("div",{className:"stc-bilgi",style:{marginTop:8}},MI("info",{fontSize:16,verticalAlign:"-3px",color:"#6366F1"})," ",__T("Final henüz oluşturulmadı; liste Final Oluştur kuralıyla (kota, finalist sayısı) eleme puanlarından hesaplanıyor. Final oluşturulunca “Oluşturulmuş finaller”den seçin.")):null),
    h("div",{className:"stc-kart"},h("div",{className:"stc-k"},MI("auto_awesome",{fontSize:17}),__T("Canlandırma")),
     h("div",{className:"stc-mod"},MODS.map(([k,ic,t,d])=>h("button",{key:k,type:"button",className:mod===k?"on":"",onClick:()=>ayar({mod:k})},h("b",null,MI(ic,{fontSize:18,color:mod===k?"#7C3AED":"#64748B"}),t),h("span",null,d)))),
     modUyari?h("div",{className:"stc-uyari",style:{marginTop:8}},`⚠ ${modUyari} / ${n} `+__T("sporcunun bu modda klibi yok; onlar sinematik gösterilir. Klip eklemek için satırdaki")+" ",MI("perm_media",{fontSize:15,verticalAlign:"-3px"})," "+__T("düğmesi.")):null,
     h("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:8,marginTop:10}},
      h("label",{className:"stc-anah"+(el?" on":"")},h("input",{type:"checkbox",checked:el,onChange:ev=>ayar({el:ev.target.checked})}),"👋 "+__T("El sallama + selam balonu")),
      h("label",{className:"stc-anah"+(eleme?" on":"")},h("input",{type:"checkbox",checked:eleme,onChange:ev=>ayar({eleme:ev.target.checked})}),__T("Eleme sırası ve puanı")),
      h("label",{className:"stc-anah"+(overlay?" on":"")},h("input",{type:"checkbox",checked:overlay,onChange:ev=>ayar({overlay:ev.target.checked})}),MI("live_tv",{fontSize:18,color:overlay?"#7C3AED":"#64748B"}),__T("Yayın overlay'ine de yansıt")))),
    h("div",{className:"stc-kart"},h("div",{className:"stc-k"},MI("groups",{fontSize:17}),(tip==="tum"?__T("Sporcular"):__T("Finalistler"))+(liste?" · "+n:"")),
     !liste?h("div",{style:{color:"#64748B",fontWeight:700}},__T("Yükleniyor…")):!n?h("div",{style:{color:"#64748B",fontWeight:700}},tip==="ad"?__T("Bu seçimde henüz puan yok."):__T("Bu seçimde sporcu yok.")):liste.map(satir))),
   h("div",{className:"stc-yan"},
    h("div",{className:"stc-kart"},
     h("div",{className:"stc-oniz",ref:ozR},h("span",{className:"et"},"● "+__T("CANLI ÖNİZLEME")),h("iframe",{src:url+"&onizle=1",title:"onizleme",style:{transform:`scale(${oz})`}})),
     h("div",{className:"stc-durum"},h("span",{style:{color:"#64748B",fontSize:12,fontWeight:900,letterSpacing:".08em",textTransform:"uppercase"}},__T("Ekranda")),ekr?h("span",null,"👤 "+(+ST.i+1)+". "+adYaz(ekr)):h("span",null,sahneAd),overlay?h("span",{className:"stc-rozet ai"},MI("live_tv",{fontSize:13}),"overlay"):null),
     h("div",{className:"stc-ak"},
      h("button",{type:"button",className:"stc-btn",onClick:onceki,disabled:!n||ptr<=0},MI("skip_previous",{fontSize:22}),__T("Önceki"),h("small",null,ptr>0&&liste?adYaz(liste[ptr-1]):"—")),
      h("button",{type:"button",className:"stc-btn ana",onClick:sonraki,disabled:!n},MI(ptr+1>=n&&n?"grid_view":"skip_next",{fontSize:24}),ptr<0?__T("Başlat"):ptr+1>=n?__T("Listeyi göster"):__T("Sonraki"),h("small",null,sir?(ptr+2)+". "+adYaz(sir):n?__T("tüm finalistler"):"—")),
      h("button",{type:"button",className:"stc-btn",onClick:()=>ptr>=0&&goster(ptr),disabled:ptr<0},MI("replay",{fontSize:22}),__T("Tekrar"),h("small",null,ptr>=0&&liste&&liste[ptr]?adYaz(liste[ptr]):"—"))),
     h("div",{className:"stc-ak2"},
      h("button",{type:"button",className:"stc-btn"+(sahne==="baslik"?" on":""),onClick:baslikVer,disabled:!n},MI("title",{fontSize:19}),__T("Başlık")),
      h("button",{type:"button",className:"stc-btn"+(sahne==="liste"?" on":""),onClick:listeVer,disabled:!n},MI("grid_view",{fontSize:19}),__T("Liste")),
      h("button",{type:"button",className:"stc-btn"+(sahne==="logo"?" on":""),onClick:logolar},MI("image",{fontSize:19}),__T("Logolar")),
      h("button",{type:"button",className:"stc-btn "+(sahne==="kapali"?"yesil":"kirmizi"),onClick:karart},MI(sahne==="kapali"?"play_arrow":"stop",{fontSize:19}),sahne==="kapali"?__T("Devam"):__T("Karart"))),
     h("div",{className:"stc-kisa"},h("kbd",null,"→")," / ",h("kbd",null,__T("Boşluk"))," "+__T("sonraki")+" · ",h("kbd",null,"←")," "+__T("önceki")+" · ",h("kbd",null,"B")," "+__T("başlık")+" · ",h("kbd",null,"L")," "+__T("liste")+" · ",h("kbd",null,"Esc")," "+__T("logolar"))),
    h("div",{className:"stc-kart"},h("div",{className:"stc-k"},MI("cast",{fontSize:17}),__T("Projeksiyon linki")),
     h("div",{style:{fontFamily:"ui-monospace,Menlo,monospace",fontSize:12,fontWeight:700,wordBreak:"break-all",color:"#334155"}},url),
     h("div",{style:{display:"flex",gap:8,marginTop:10,flexWrap:"wrap"}},h("button",{type:"button",className:"stc-btn kucuk",onClick:kopya},MI(ok==="✓"?"check":"content_copy",{fontSize:16}),ok==="✓"?__T("Kopyalandı!"):__T("Kopyala")),h("a",{className:"stc-btn kucuk",href:url,target:"_blank",rel:"noopener noreferrer"},MI("open_in_new",{fontSize:16}),__T("Aç"))),
     h("div",{className:"stc-kisa"},__T("Projeksiyon bilgisayarında açıp Tam ekran'a basın (ya da çift tıklayın). Overlay'e yansıtma açıksa, açık olan yayın overlay linkinde de tanıtım kartı çıkar."))))));
}
