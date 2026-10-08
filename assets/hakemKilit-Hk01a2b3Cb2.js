import{j as e,d as db}from"./main-C2LpyYUGCb2.js";import{r as R}from"./vendor-react-Cxw6bqwhCb2.js";import{k as ref,o as onValue,v as set,m as update}from"./vendor-firebase-940mxgRVCb2.js";

// HAKEM EKRAN KİLİDİ (2026-10-08) — ritmik hakem ekranları v2 ve bölünmüş (split) ekran.
//  <base>/<yarışma>/hakemKilit/<linkId> = {h: SHA-256("gx|"+yarışma+"|"+linkId+"|"+pin), ts}  ya da  {yok:true, ts}
//  <base>/<yarışma>/hakemKilitPin/<linkId> = {pin, ts} — yalnız Paneller okur (unutulan şifreyi organizasyon görür); hakem ekranı bu yolu dinlemez
//  Kayıt yoksa ilk açılışta "Ekran şifresi oluştur / Şifre istemiyorum" sorulur (yarışma boyunca geçerli; Paneller'den sıfırlanır).
//  Şifreli: başlıktaki 🔒 ile kilitlenir, 2 dk işlem yapılmazsa kendiliğinden kilitlenir; şifre girilince açılır. Sayfa yenilense de kilit kalır.
//  Şifresiz: 2 dk işlem yapılmazsa ekran koruyucu; dokununca kapanır. Yeni sporcu çağrısı (tetik) sayacı sıfırlar.
//  Kilit / koruyucu ekranında yalnız Gymexa Score logosu, panel kodu ve saat görünür.
export const KILIT_SURE=12e4;
const ozet=async t=>{try{const b=await crypto.subtle.digest("SHA-256",new TextEncoder().encode(t));return Array.from(new Uint8Array(b),x=>x.toString(16).padStart(2,"0")).join("")}catch{let h=0;for(const c of t)h=Math.imul(31,h)+c.charCodeAt(0)|0;return"x"+(h>>>0).toString(16)}};
const LS=(c,l)=>"gxKilit:"+c+":"+l,lsAl=k=>{try{return localStorage.getItem(k)}catch{return null}},lsYaz=(k,v)=>{try{v==null?localStorage.removeItem(k):localStorage.setItem(k,v)}catch{}};
const MI=(n,st)=>e.jsx("span",{className:"material-icons-round",style:{fontSize:20,...st},children:n});
const LOGO="/brand/gymnaxis-tam-logo-beyaz.svg";

const CSS=`.gxk-kim{display:flex;align-items:center;gap:16px;padding:14px 22px;border-radius:20px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);text-align:left;max-width:100%;margin:4px 0 6px}
.gxk-kart .gxk-kim{margin:0 0 14px;background:#141B2D;border-color:#26304A}
.gxk-kim>div{min-width:0}
.gxk-kim b{overflow-wrap:break-word}
.gxk-kart .gxk-kim b{font-size:clamp(22px,4.2vw,34px)}
.gxk-kart .gxk-kim img{width:60px;height:45px}
.gxk-kim img{width:76px;height:57px;object-fit:cover;border-radius:8px;box-shadow:0 0 0 1px rgba(255,255,255,.25);flex-shrink:0}
.gxk-kim b{display:block;font-size:clamp(26px,5.5vw,46px);font-weight:900;line-height:1.08;color:#fff}
.gxk-kim span{display:block;margin-top:4px;font-size:15px;font-weight:800;letter-spacing:.1em;color:#C4B5FD}
.gxk-ov{position:fixed;inset:0;z-index:2147483000;display:flex;align-items:center;justify-content:center;padding:24px;background:radial-gradient(900px 520px at 10% -10%,rgba(236,72,153,.22),transparent 60%),radial-gradient(900px 560px at 110% 0%,rgba(139,92,246,.22),transparent 60%),#070A14;color:#E8ECF7;font-family:"Plus Jakarta Sans",Inter,system-ui,sans-serif;-webkit-user-select:none;user-select:none;-webkit-tap-highlight-color:transparent}
.gxk-in{width:min(640px,100%);display:flex;flex-direction:column;align-items:center;gap:14px;text-align:center}
.gxk-logo{width:min(300px,72vw);height:auto;margin-bottom:6px;filter:drop-shadow(0 10px 30px rgba(139,92,246,.35))}
.gxk-saat{font:800 clamp(40px,9vw,64px)/1 "JetBrains Mono",ui-monospace,Menlo,monospace;letter-spacing:.02em}
.gxk-alt{font-size:13px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:#8E9AB8;display:flex;gap:8px;align-items:center;justify-content:center}
.gxk-alt b{color:#fff;background:linear-gradient(135deg,#EC4899,#8B5CF6);padding:3px 9px;border-radius:8px;letter-spacing:.04em}
.gxk-dots{display:flex;gap:12px;height:20px;align-items:center;margin:6px 0}
.gxk-dots i{width:14px;height:14px;border-radius:50%;border:2px solid #475069;display:block;transition:.15s}
.gxk-dots i.on{background:linear-gradient(135deg,#EC4899,#8B5CF6);border-color:transparent}
.gxk-dots.sal{animation:gxkSal .4s}
@keyframes gxkSal{0%,100%{transform:none}20%,60%{transform:translateX(-9px)}40%,80%{transform:translateX(9px)}}
.gxk-pad{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;width:100%;max-width:380px}
.gxk-pad button{height:62px;border-radius:16px;border:1px solid #26304A;background:#141B2D;color:#E8ECF7;font:800 24px "JetBrains Mono",ui-monospace,Menlo,monospace;cursor:pointer;display:grid;place-items:center}
.gxk-pad button:active{background:#25304F}
.gxk-pad button.fn{font-size:14px;color:#8E9AB8}
.gxk-err{min-height:18px;font-size:13px;font-weight:800;color:#F87171}
.gxk-ipucu{font-size:12px;color:#64748B;font-weight:600;line-height:1.45;max-width:320px}
.gxk-yeni{display:inline-flex;align-items:center;gap:6px;font-size:12px;font-weight:900;color:#FBBF24;background:rgba(251,191,36,.12);border:1px solid rgba(251,191,36,.35);padding:5px 11px;border-radius:999px}
.gxk-yeni::before{content:"";width:8px;height:8px;border-radius:50%;background:#FBBF24;animation:gxkNb 1.2s infinite}
@keyframes gxkNb{50%{opacity:.25}}
.gxk-dok{font-size:13px;font-weight:700;color:#8E9AB8;margin-top:10px;animation:gxkNb 2.4s infinite}
.gxk-kart{width:min(420px,100%);background:#0F1524;border:1px solid #26304A;border-radius:22px;padding:22px;box-shadow:0 30px 80px -30px rgba(0,0,0,.9)}
.gxk-kart h2{margin:4px 0 6px;font-size:20px;font-weight:900}
.gxk-kart p{margin:0 0 6px;color:#A5B0CC;font-size:13.5px;line-height:1.5;font-weight:600}
.gxk-bt{width:100%;border:0;border-radius:14px;padding:13px 14px;font:800 14.5px inherit;font-family:inherit;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;gap:8px}
.gxk-bt.p{background:linear-gradient(135deg,#EC4899,#8B5CF6);color:#fff}
.gxk-bt.p:disabled{opacity:.45;cursor:default}
.gxk-bt.s{background:transparent;color:#A5B0CC;border:1px solid #26304A}
.gxk-btn{display:inline-flex;align-items:center;gap:6px;border:1px solid var(--line,#26304A);background:var(--card,#141B2D);color:var(--tx,#E8ECF7);border-radius:999px;padding:6px 12px;font:800 12.5px inherit;font-family:inherit;cursor:pointer}
`;

function Pad({uz,onBitti,hata,setHata,ust}){
 const[v,setV]=R.useState(""),[sal,setSal]=R.useState(0);
 R.useEffect(()=>{if(hata){setSal(x=>x+1);setV("")}},[hata]);
 const bas=k=>{setHata&&setHata("");if(k==="⌫"){setV(x=>x.slice(0,-1));return}if(k==="OK"){if(v.length>=4)onBitti(v,()=>setV(""));return}const n=(v+k).slice(0,6);setV(n);if(uz&&n.length===uz)setTimeout(()=>onBitti(n,()=>setV("")),60)};
 R.useEffect(()=>{const h=ev=>{if(/^[0-9]$/.test(ev.key))bas(ev.key);else if(ev.key==="Backspace")bas("⌫");else if(ev.key==="Enter")bas("OK")};window.addEventListener("keydown",h);return()=>window.removeEventListener("keydown",h)});
 const n=uz||Math.max(4,v.length);
 return e.jsxs(e.Fragment,{children:[ust||null,e.jsx("div",{className:"gxk-dots"+(sal%2?" sal":""),key:"d"+sal,children:[...Array(n)].map((_,i)=>e.jsx("i",{className:i<v.length?"on":""},i))}),
  e.jsx("div",{className:"gxk-pad",children:["1","2","3","4","5","6","7","8","9",uz?"":"OK","0","⌫"].map((k,i)=>k===""?e.jsx("span",{},i):e.jsx("button",{type:"button",className:k==="⌫"||k==="OK"?"fn":"",onClick:()=>bas(k),children:k==="⌫"?MI("backspace"):k==="OK"?__T("Tamam"):k},i))})]})}

function Saat(){const[t,setT]=R.useState(Date.now());R.useEffect(()=>{const i=setInterval(()=>setT(Date.now()),1e3);return()=>clearInterval(i)},[]);const d=new Date(t);return e.jsx("div",{className:"gxk-saat",children:String(d.getHours()).padStart(2,"0")+":"+String(d.getMinutes()).padStart(2,"0")})}

// useHakemKilit({base, comp, lk, slot, tetik}) → {dugme, ortu}; iframe içinde (bölünmüş ekranın bölmesi) devre dışı — kilidi üst sayfa yönetir.
export function useHakemKilit({base,comp,lk,slot,tetik,kimlik}){
 const ifr=(()=>{try{return window.self!==window.top}catch{return!0}})(),on=!ifr&&!!(base&&comp&&lk);
 const[rec,setRec]=R.useState(void 0),[kilit,setKilit]=R.useState(()=>on&&lsAl(LS(comp,lk))==="1"),[saver,setSaver]=R.useState(!1),[kur,setKur]=R.useState(0),[ilk,setIlk]=R.useState(""),[hata,setHata]=R.useState(""),[yeni,setYeni]=R.useState(!1);
 const son=R.useRef(Date.now()),yol=`${base}/${comp}/hakemKilit/${lk}`;
 R.useEffect(()=>{if(!on)return;return onValue(ref(db,yol),s=>setRec(s.val()||null),()=>setRec(null))},[on,yol]);
 // şifre Paneller'den sıfırlandıysa kilit kalkar
 R.useEffect(()=>{if(rec===null||rec&&rec.yok){if(kilit){setKilit(!1);lsYaz(LS(comp,lk),null)}}},[rec]);
 const kilitle=R.useCallback(()=>{setKilit(!0);setYeni(!1);lsYaz(LS(comp,lk),"1")},[comp,lk]);
 // işlemsizlik sayacı
 R.useEffect(()=>{if(!on)return;const dok=()=>{son.current=Date.now()};const ev=["pointerdown","keydown","touchstart","wheel"];ev.forEach(x=>window.addEventListener(x,dok,{capture:!0,passive:!0}));return()=>ev.forEach(x=>window.removeEventListener(x,dok,{capture:!0}))},[on]);
 const t0=R.useRef(Date.now());
 R.useEffect(()=>{son.current=Date.now();if((kilit||saver)&&Date.now()-t0.current>4e3)setYeni(!0)},[tetik]);
 R.useEffect(()=>{if(!on||!rec)return;const i=setInterval(()=>{if(kilit||saver||kur)return;if(Date.now()-son.current>=KILIT_SURE){if(rec.h)kilitle();else if(rec.yok){setSaver(!0);setYeni(!1)}}},2e3);return()=>clearInterval(i)},[on,rec,kilit,saver,kur,kilitle]);
 // bölünmüş ekran: bölmedeki dokunuş / yeni çağrı üst sayfanın sayacına iletilir (aynı köken)
 R.useEffect(()=>{if(!ifr)return;const f=()=>{try{window.parent.__gxKilitAkt&&window.parent.__gxKilitAkt()}catch{}};const ev=["pointerdown","keydown","touchstart","wheel"];ev.forEach(x=>window.addEventListener(x,f,{capture:!0,passive:!0}));return()=>ev.forEach(x=>window.removeEventListener(x,f,{capture:!0}))},[ifr]);
 R.useEffect(()=>{if(!ifr)return;try{window.parent.__gxKilitTetik&&window.parent.__gxKilitTetik()}catch{}},[ifr,tetik]);
 const durR=R.useRef({});durR.current={kilit,saver};
 R.useEffect(()=>{if(!on)return;window.__gxKilitAkt=()=>{son.current=Date.now()};window.__gxKilitTetik=()=>{son.current=Date.now();const d=durR.current;if((d.kilit||d.saver)&&Date.now()-t0.current>4e3)setYeni(!0)};return()=>{delete window.__gxKilitAkt;delete window.__gxKilitTetik}},[on]);
 if(!on)return{dugme:null,ortu:null};
 const css=e.jsx("style",{children:CSS},"css");
 const kaydet=async pin=>{const h=await ozet("gx|"+comp+"|"+lk+"|"+pin),z=Date.now();await update(ref(db),{[yol]:{h,ts:z},[`${base}/${comp}/hakemKilitPin/${lk}`]:{pin,ts:z}});setKur(0);setIlk("");son.current=Date.now()};
 const istemiyorum=async()=>{await update(ref(db),{[yol]:{yok:!0,ts:Date.now()},[`${base}/${comp}/hakemKilitPin/${lk}`]:null});setKur(0);son.current=Date.now()};
 let ortu=null;
 // hakem adı + bayrak (büyük) — koltuk bulma: ilk giriş, kilit ve ekran koruyucuda
 const kim=kimlik&&kimlik.ad?e.jsxs("div",{className:"gxk-kim",children:[kimlik.bayrak?e.jsx("img",{src:kimlik.bayrak,alt:kimlik.ulke||""}):null,e.jsxs("div",{children:[e.jsx("b",{children:kimlik.ad}),e.jsx("span",{children:[slot,kimlik.ulke].filter(Boolean).join(" · ")})]})]}):null;
 const alt=e.jsxs("div",{className:"gxk-alt",children:[slot?e.jsx("b",{children:slot}):null,kilit?[MI("lock",{fontSize:16}),__T("Ekran kilitli")]:__T("Ekran koruyucu")]});
 if(kilit&&rec===void 0){
  ortu=e.jsxs("div",{className:"gxk-ov",children:[css,e.jsxs("div",{className:"gxk-in",children:[e.jsx("img",{className:"gxk-logo",src:LOGO,alt:"Gymexa Score"}),e.jsx(Saat,{})]})]});
 }else if(rec===null||kur){
  // kurulum: 1) şifre 2) tekrar
  ortu=e.jsxs("div",{className:"gxk-ov",children:[css,e.jsxs("div",{className:"gxk-kart",children:[kim,
   e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10},children:[e.jsx("div",{style:{width:42,height:42,borderRadius:12,display:"grid",placeItems:"center",background:"linear-gradient(135deg,#EC4899,#8B5CF6)"},children:MI("lock",{color:"#fff"})}),e.jsx("h2",{children:kur===2?__T("Şifreyi tekrar girin"):__T("Ekran şifresi")})]}),
   e.jsx("p",{children:kur===2?__T("Aynı şifreyi bir kez daha girin."):__T("Yarışma boyunca kullanacağınız 4 haneli bir şifre belirleyin. Ekranınızdan kalktığınızda kilitleyin; 2 dakika işlem yapılmazsa ekran kendiliğinden kilitlenir. Açmak için bu şifre gerekir.")}),
   e.jsx("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:10,marginTop:8},children:e.jsx(Pad,{uz:4,hata,setHata,onBitti:(v,temizle)=>{if(kur!==2){setIlk(v);setKur(2);temizle();return}if(v!==ilk){setHata(__T("Şifreler aynı değil, yeniden deneyin."));setKur(1);setIlk("");return}kaydet(v)}},kur)}),
   e.jsx("div",{className:"gxk-err",style:{textAlign:"center",marginTop:6},children:hata}),
   e.jsx("button",{type:"button",className:"gxk-bt s",style:{marginTop:6},onClick:()=>{if(kur===2){setKur(1);setIlk("");setHata("");return}istemiyorum()},children:kur===2?__T("Geri"):__T("Şifre oluşturmak istemiyorum")}),
   kur!==2?e.jsx("p",{style:{fontSize:12,color:"#64748B",marginTop:10,textAlign:"center"},children:__T("Şifre oluşturmazsanız 2 dakika işlem yapılmadığında ekran koruyucu açılır.")}):null]})]});
 }else if(kilit&&rec&&rec.h){
  ortu=e.jsxs("div",{className:"gxk-ov",children:[css,e.jsxs("div",{className:"gxk-in",children:[e.jsx("img",{className:"gxk-logo",src:LOGO,alt:"Gymexa Score"}),kim,e.jsx(Saat,{}),alt,yeni?e.jsx("span",{className:"gxk-yeni",children:__T("Yeni sporcu çağrıldı")}):null,
   e.jsx(Pad,{uz:4,hata,setHata,onBitti:async(v)=>{const h=await ozet("gx|"+comp+"|"+lk+"|"+v);if(h===rec.h){setKilit(!1);setHata("");setYeni(!1);lsYaz(LS(comp,lk),null);son.current=Date.now()}else setHata(__T("Şifre yanlış"))}}),
   e.jsx("div",{className:"gxk-err",children:hata}),e.jsx("div",{className:"gxk-ipucu",children:__T("Şifrenizi unuttuysanız organizasyon Paneller sayfasından sıfırlayabilir.")})]})]});
 }else if(saver){
  ortu=e.jsxs("div",{className:"gxk-ov",style:{cursor:"pointer"},onPointerDown:ev=>{ev.preventDefault();setSaver(!1);setYeni(!1);son.current=Date.now()},children:[css,e.jsxs("div",{className:"gxk-in",children:[e.jsx("img",{className:"gxk-logo",src:LOGO,alt:"Gymexa Score"}),kim,e.jsx(Saat,{}),alt,yeni?e.jsx("span",{className:"gxk-yeni",children:__T("Yeni sporcu çağrıldı")}):null,e.jsx("div",{className:"gxk-dok",children:__T("Devam etmek için ekrana dokunun")})]})]});
 }
 const dugme=rec&&rec.h?e.jsxs("button",{type:"button",className:"gxk-btn",title:__T("Ekranı kilitle"),onClick:kilitle,children:[css,MI("lock",{fontSize:16}),__T("Kilitle")]}):rec&&rec.yok?e.jsxs("button",{type:"button",className:"gxk-btn",title:__T("Ekran şifresi oluştur"),onClick:()=>{setKur(1);setIlk("");setHata("")},children:[css,MI("lock_open",{fontSize:16}),__T("Şifre")]}):null;
 return{dugme,ortu};
}
