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

export{T,cur as getLang,set as setLang,DICT};
