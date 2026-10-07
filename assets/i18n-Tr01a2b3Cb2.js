// TCF cok dilli arayuz katmani.
// Minified paketlerde kullanici metinleri __T("...") ile sarmalanir.
// Sozluk anahtari Turkce metnin kendisidir; karsiligi yoksa metin aynen doner,
// boylece eksik ceviri hicbir zaman bos ekran uretmez.
const KEY="tcf_lang";

import{DICT}from"./i18n-dict-Tr01a2b3Cb2.js";

let _lang=null;
// Uluslararası yarışma + İngilizce çıktı: hakem panelleri (dil seçilmemişse) İngilizce açılır.
try{(function(){const m=location.pathname.match(/^\/(artistik|ritmik|aerobik|parkur|trampolin)\/(epanel|dpanel|lpanel|tpanel|apanel|sjpanel|split)\b/);if(!m)return;
 if(localStorage.getItem(KEY))return;const q=new URLSearchParams(location.search),c=q.get("competitionId")||q.get("comp");if(!c)return;
 const B={artistik:"competitions",ritmik:"ritmik_yarismalar",aerobik:"aerobik_yarismalar",parkur:"parkur_yarismalar",trampolin:"trampolin_yarismalar"}[m[1]],sk="tcf_intl_"+m[1]+"_"+c,v=sessionStorage.getItem(sk);
 if(v==="en"){_lang="en";return}if(v==="tr")return;const U="https://analig-default-rtdb.firebaseio.com/"+B+"/"+encodeURIComponent(c);
 fetch(U+"/tur.json").then(r=>r.json()).then(async t=>{let en=!1;if(t==="uluslararasi"){const d=await(await fetch(U+"/ciktiDili.json")).json();en=d!=="tr"}sessionStorage.setItem(sk,en?"en":"tr");if(en)location.reload()}).catch(()=>{})})()}catch{}
function cur(){
 if(_lang)return _lang;
 try{
  const q=new URLSearchParams(location.search).get("lang");
  if(q==="en"||q==="tr"){localStorage.setItem(KEY,q);return _lang=q}
 }catch{}
 try{const v=localStorage.getItem(KEY);if(v==="en"||v==="tr")return _lang=v}catch{}
 return _lang="tr";
}
function set(l){
 if(l!=="tr"&&l!=="en")return;
 try{localStorage.setItem(KEY,l)}catch{}
 _lang=l;
 location.reload();
}
function T(s){
 const l=globalThis.__TF||cur();
 if(l==="tr")return s;
 if(typeof s!=="string")return s;
 const v=DICT[s];
 if(v===undefined){try{if(globalThis.__TF)(globalThis.__TMISS||(globalThis.__TMISS=new Set)).add(s)}catch{}return s}
 return v;
}

// Kullanici tanimli ceviriler (Kategori Yonetimi'nde kaydedilen adlarin EN karsiliklari vb.):
// Firebase i18nEk/<id> = {tr,en}. localStorage onbellegiyle senkron yuklenir, EN modunda arka planda tazelenir.
try{const EK="tcf_i18n_ek",uyg=o=>{if(o&&typeof o==="object")Object.values(o).forEach(x=>{if(x&&typeof x.tr==="string"&&typeof x.en==="string"&&x.tr&&x.en)DICT[x.tr]=x.en})};
 uyg(JSON.parse(localStorage.getItem(EK)||"null"));
 if(cur()==="en"&&typeof fetch==="function")fetch("https://analig-default-rtdb.firebaseio.com/criteria/i18nEk.json").then(r=>r.json()).then(o=>{const j=JSON.stringify(o||{});if(j!==localStorage.getItem(EK)){localStorage.setItem(EK,j);uyg(o)}}).catch(()=>{});
 globalThis.__I18N_EK=(tr,en)=>{if(tr&&en)DICT[tr]=en};}catch{}

// Sayfalar import etmeden kullanabilsin diye global.
globalThis.__T=T;
globalThis.__LANG=cur;
globalThis.__SETLANG=set;

// Sayfa dili: CSS text-transform:uppercase yerele gore calisir.
// lang="tr" kalirsa "Active" -> "ACTİVE" (noktali I) olur.
try{if(typeof document!=="undefined"&&document.documentElement)document.documentElement.lang=cur()}catch{}

// --- yuzen TR | EN dugmesi ------------------------------------------------
function gizliMi(){
 const p=location.pathname;
 // bölünmüş ekranın bölmeleri (iframe): dil düğmesi üst sayfadadır
 try{if(window.self!==window.top)return!0}catch{return!0}
 return /\/scoreboard|\/split|\/overlay/.test(p);
}
function ciz(){
 if(gizliMi()||document.getElementById("tcf-lang-sw"))return;
 const d=document.createElement("div");
 d.id="tcf-lang-sw";
 d.setAttribute("style","position:fixed;right:10px;bottom:10px;z-index:2147483000;display:flex;"+
  "border:1px solid rgba(148,163,184,.55);border-radius:999px;overflow:hidden;"+
  "font:700 11px/1 system-ui,-apple-system,Segoe UI,Roboto,sans-serif;letter-spacing:.06em;"+
  "background:rgba(255,255,255,.92);box-shadow:0 2px 10px rgba(15,23,42,.18);backdrop-filter:blur(4px)");
 [["tr","TR"],["en","EN"]].forEach(([k,ad])=>{
  const b=document.createElement("button");
  b.type="button";b.textContent=ad;
  const aktif=cur()===k;
  b.setAttribute("style","all:unset;cursor:pointer;padding:6px 11px;"+
   (aktif?"background:#1e293b;color:#fff;":"color:#475569;"));
  b.addEventListener("click",()=>{if(!aktif)set(k)});
  d.appendChild(b);
 });
 document.body.appendChild(d);
}
if(typeof document!=="undefined"){
 if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",ciz);
 else ciz();
 // SPA yonlendirmelerinde yeniden degerlendir
 setInterval(()=>{const v=document.getElementById("tcf-lang-sw");
  if(gizliMi()){v&&v.remove()}else if(!v)ciz()},1500);
}


// --- EN modunda DOM yedek çevirisi --------------------------------------
// __T ile sarmalanmamış ama sözlükte birebir karşılığı olan görünür metinleri
// (dizi/nesne içindeki sekme adları, eski HTML üretilen sayfalar vb.) ekranda çevirir.
// Girdi alanlarına, value'su olmayan <option>'lara ve translate="no" bölgelerine dokunmaz.
if(typeof document!=="undefined"&&cur()==="en"){try{
 const AY=["Ocak","Şubat","Mart","Nisan","Mayıs","Haziran","Temmuz","Ağustos","Eylül","Ekim","Kasım","Aralık"],AYE=["January","February","March","April","May","June","July","August","September","October","November","December"];
 const GN=["Pazartesi","Salı","Çarşamba","Perşembe","Cuma","Cumartesi","Pazar"],GNE=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
 const UP=x=>x.toLocaleUpperCase("tr-TR"),esc=x=>x.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");
 const AYR=new RegExp("(\\d{1,2})\\s+("+AY.map(x=>esc(x)+"|"+esc(UP(x))).join("|")+")(\\s+\\d{4})?","g"),GNR=new RegExp("(\\d{4}|,)\\s*("+GN.map(x=>esc(x)+"|"+esc(UP(x))).join("|")+")(?![\\p{L}])","gu");
 const ayE=m=>{let i=AY.indexOf(m);if(i<0)i=AY.map(UP).indexOf(m);const v=AYE[i]||m;return m===UP(m)?v.toUpperCase():v},gnE=m=>{let i=GN.indexOf(m);if(i<0)i=GN.map(UP).indexOf(m);const v=GNE[i]||m;return m===UP(m)?v.toUpperCase():v};
 const APF={"Çember":"Hoop","Top":"Ball","Labut":"Clubs","Kurdele":"Ribbon","İp":"Rope","Çok Mücadele":"All-Around","Grup 1. Seri":"Group Routine 1","Grup 2. Seri":"Group Routine 2","Serbest":"Without Apparatus"};
 const PAT=[[/^(.*?)(Çember|Top|Labut|Kurdele|İp|Çok Mücadele|Grup 1\. Seri|Grup 2\. Seri|Serbest) Finali$/,(m,a,b)=>a+APF[b]+" Final"],[/^Bugün · (.*)$/,(m,a)=>"Today · "+(cev(a)||a)],[/^Dün · (.*)$/,(m,a)=>"Yesterday · "+(cev(a)||a)],[/^(\d+) gün sonra$/,"in $1 days"],[/^(\d+) gün önce$/,"$1 days ago"],[/^(\d+) (dk|dakika) önce$/,"$1 min ago"],[/^(\d+) (sa|saat) önce$/,"$1 h ago"],[/^(\d+) sn önce$/,"$1 s ago"],[/^az önce$/i,"just now"],[/^yarın$/i,"tomorrow"],[/^(\d+) işlem$/,"$1 actions"],[/^(\d+) sporcu$/,"$1 gymnasts"],[/^(\d+) hakem$/,"$1 judges"],[/^(\d+) yarışma$/,"$1 competitions"],[/^(\d+) kategori$/,"$1 categories"]];
 // Kategori / alet adları: metnin TAMAMI kategori sözcüklerinden oluşuyorsa çevrilir (isim/kulüp/yarışma adı bozulmaz)
 const KP=[["Asimetrik Paralel","Uneven Bars"],["Kulplu Beygir","Pommel Horse"],["Atlama Masası","Vault"],["Genel Tasnif","All-Around"],["Çok Mücadele","All-Around"],["Tek Kadın","Individual Women"],["Tek Erkek","Individual Men"],["Karma Çift","Mixed Pair"],["Aerobik Dans","Aerobic Dance"],["Aerobik Step","Aerobic Step"],["Yaş Grubu","Age Group"],
  ["Büyükler","Senior"],["Büyük","Senior"],["Gençler","Junior"],["Genç","Junior"],["Yıldızlar","Pre-Junior"],["Yıldız","Pre-Junior"],["Küçükler","Children"],["Küçük","Children"],["Minikler","Mini"],["Minik","Mini"],["Kızlar","Women"],["Kız","Women"],["Kadınlar","Women"],["Kadın","Women"],["Erkekler","Men"],["Erkek","Men"],
  ["Bireysel","Individual"],["Ferdi","Individual"],["Grubu","Group"],["Grup","Group"],["Takım","Team"],["Karma","Mixed"],["Finali","Final"],["Çember","Hoop"],["Kurdele","Ribbon"],["Labut","Clubs"],["Top","Ball"],["İp","Rope"],["Serbest","Without Apparatus"],["Seri","Routine"],["Yer","Floor"],["Atlama","Vault"],["Barfiks","High Bar"],["Denge","Beam"],["Paralel","Parallel Bars"],["Halka","Rings"],["Mantar","Mushroom"],["Çift","Mixed Pair"],["Tek","Individual"],["Aerobik","Aerobic"],["Dans","Dance"],["Kategori","Category"],["Yaş","Age"],["ve","and"]];
 const LW=x=>x.toLocaleLowerCase("tr-TR"),KV=new Set(KP.flatMap(([t])=>t.split(" ").map(LW))),KN=/^(fig|senior|junior|final|a|b|c|d|aa|u\d+|[ivx]+)$/i,KPL=new Set(["büyükler","gençler","yıldızlar","küçükler","minikler"]);
 const KR=KP.map(([t,e])=>[new RegExp("(?<![\\p{L}])(?:"+esc(t)+"|"+esc(UP(t))+")(?![\\p{L}])","gu"),e]);
 const katCev=k=>{const tk=k.match(/[\p{L}]+|\d+/gu);if(!tk)return null;let n=0,dg=!1;for(const w of tk){if(/^\d+$/.test(w)){dg=!0;continue}const l=LW(w);if(KV.has(l)){n++;continue}if(KN.test(w))continue;return null}
  if(!(n>=2||n>=1&&dg||n===1&&tk.length===1&&KPL.has(LW(tk[0]))))return null;
  const buyuk=k===UP(k)&&/[A-ZÇĞİÖŞÜ]/.test(k);let t=k.replace(/(\d)\. ?Seri/g,"Routine $1").replace(/(\d)\. ?SERİ/g,"ROUTINE $1");KR.forEach(([r,e])=>{t=t.replace(r,buyuk?e.toUpperCase():e)});t=t.replace(/(Children|Mini) Women/g,"$1 Girls").replace(/(Children|Mini) Men/g,"$1 Boys").replace(/(CHILDREN|MINI) WOMEN/g,"$1 GIRLS").replace(/(CHILDREN|MINI) MEN/g,"$1 BOYS");return t===k?null:t};
 let UPM=null;const upm=()=>{if(UPM)return UPM;UPM=new Map;for(const k in DICT){const u=UP(k);if(u!==k&&!UPM.has(u))UPM.set(u,String(DICT[k]).toUpperCase())}return UPM};
 const TRC=/[çğıöşüÇĞİÖŞÜ]/;
 const NOC=/^(TUR|AZE|BUL|ITA|ISR|UKR|GEO|KAZ|UZB|ESP|GER|FRA|GBR|USA|RUS|BLR|JPN|CHN|KOR|BRA|CAN|AUS|EGY|GRE|ROU|HUN|POL|CZE|SVK|SLO|CRO|SRB|MKD|ALB|KOS|BIH|MNE|CYP|MDA|ARM|EST|LAT|LTU|FIN|SWE|NOR|DEN|NED|BEL|SUI|AUT|POR|IRL|MEX|ARG|CHI|COL|IND|IRI|INA|THA|PHI|VIE|MAS|SGP|RSA|ALG|TUN|MAR|LBA|KSA|UAE|QAT|KUW|JOR|LIB|SYR|IRQ|TKM|KGZ|TJK|MGL|PRK|TPE|HKG|NZL)$/;
 const cev=t=>{const k=t.trim();if(!k||k.length>400||NOC.test(k))return null;let v=k.length<=120?katCev(k)??undefined:undefined;if(v===undefined)v=DICT[k];
  if(v===undefined&&/[A-ZÇĞİÖŞÜ]/.test(k)&&k===UP(k))v=upm().get(k);
  if(v===undefined){for(const[r,x]of PAT)if(r.test(k)){v=k.replace(r,x);break}}
  if(v===undefined&&TRC.test(k)){const d=k.replace(AYR,(m,g,a,y)=>g+" "+ayE(a)+(y||"")).replace(GNR,(m,p,g)=>p+" "+gnE(g));if(d!==k)v=d}
  if(v===undefined||v===k)return null;const i=t.indexOf(k);return t.slice(0,i)+v+t.slice(i+k.length)};
 const atla=el=>{for(let e=el;e&&e!==document.body;e=e.parentElement){const n=e.tagName;if(n==="SCRIPT"||n==="STYLE"||n==="TEXTAREA"||n==="INPUT"||e.isContentEditable||e.getAttribute&&e.getAttribute("translate")==="no")return!0;if(n==="OPTION"&&!e.hasAttribute("value"))return!0}return!1};
 const metin=n=>{if(!n.nodeValue||!/\S/.test(n.nodeValue))return;const p=n.parentElement;if(!p||atla(p))return;const v=cev(n.nodeValue);if(v!=null&&v!==n.nodeValue)n.nodeValue=v};
 const ATR=["placeholder","title","aria-label"];
 const oge=el=>{if(el.nodeType!==1||el.isContentEditable||atla(el.parentElement))return;ATR.forEach(a=>{const x=el.getAttribute(a);if(x){const v=cev(x);v!=null&&el.setAttribute(a,v)}});if(el.tagName==="INPUT"&&(el.type==="button"||el.type==="submit")&&el.value){const v=cev(el.value);v!=null&&(el.value=v)}};
 const tara=r=>{if(!r)return;if(r.nodeType===3){metin(r);return}if(r.nodeType!==1)return;oge(r);const w=document.createTreeWalker(r,NodeFilter.SHOW_TEXT|NodeFilter.SHOW_ELEMENT);let n;while(n=w.nextNode())n.nodeType===3?metin(n):oge(n)};
 const bas=()=>{tara(document.body);new MutationObserver(ms=>{for(const m of ms){if(m.type==="characterData")metin(m.target);else if(m.type==="attributes")oge(m.target);else m.addedNodes.forEach(tara)}}).observe(document.body,{subtree:!0,childList:!0,characterData:!0,attributes:!0,attributeFilter:ATR})};
 document.readyState==="loading"?document.addEventListener("DOMContentLoaded",bas):bas();
}catch{}}
export{T,cur as getLang,set as setLang,DICT};

// Sayısal alanlarda fare tekerleği puanı DEĞİŞTİRMESİN (başhakem/hakem ekranları, 2026-10-08):
// odaklı number input üzerinde tekerlek çevrilince alan odaktan çıkar → değer değişmez, sayfa kaymaya devam eder.
try{if(typeof document!=="undefined"&&!globalThis.__gxWheel){globalThis.__gxWheel=1;document.addEventListener("wheel",ev=>{const t=ev.target;if(t&&t.tagName==="INPUT"&&t.type==="number"&&document.activeElement===t)t.blur()},{passive:!0,capture:!0})}}catch{}
