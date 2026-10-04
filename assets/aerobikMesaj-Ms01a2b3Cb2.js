// Aerobik CJP <-> SJA / SJE / SJD / Üst Jüri mesajlaşma (yarışma bazında saklanır)
// Veri: <base>/mesajlar/<kanal>/<id> = {kimden, metin, ts}
//       <base>/mesajOkuma/<kanal>/<rol> = son okunan ts
// Kanal = CJP'nin konuştuğu taraf: sja | sje | sjd | ustjuri
// CJP tüm kanallarda yazar; diğer roller yalnızca kendi kanalında. CJP ve Üst Jüri "Tümü" geçmişini görür.
// React'ten bağımsız: verilen slot elemanına düğme, body'ye panel/bildirim ekler.
const KANAL={sja:{ad:"SJA",uzun:"SJA · Artistik",renk:"#db2777"},sje:{ad:"SJE",uzun:"SJE · Uygulama",renk:"#0891b2"},sjd:{ad:"SJD",uzun:"SJD · Zorluk",renk:"#6366f1"},ustjuri:{ad:"Üst Jüri",uzun:"Üst Jüri",renk:"#d97706"}};
const ROLAD={cjp:"CJP",sja:"SJA",sje:"SJE",sjd:"SJD",ustjuri:"Üst Jüri"};
const T=s=>typeof __T==="function"?__T(s):s;
const CSS=`
.tcfm-btn{position:relative;display:inline-flex;align-items:center;gap:.4rem;height:38px;padding:0 .85rem;border-radius:10px;border:1px solid rgba(255,255,255,.28);background:rgba(255,255,255,.12);color:#fff;font:700 .84rem/1 Nunito,Inter,system-ui,sans-serif;cursor:pointer;white-space:nowrap}
.tcfm-btn:hover{background:rgba(255,255,255,.2)}
[data-tema="acik"] .tcfm-btn{background:#fff;color:#1a1d26;border-color:#e5e7eb}
[data-tema="acik"] .tcfm-btn:hover{background:#f8fafc}
[data-tema="acik"] .tcfm-badge{box-shadow:0 0 0 2px #fff}
.tcfm-btn .material-icons-round{font-size:1.15rem}
.tcfm-btn.yeni{animation:tcfmPulse 1.2s ease-in-out infinite;border-color:#f87171}
.tcfm-badge{position:absolute;top:-7px;right:-7px;min-width:20px;height:20px;padding:0 5px;border-radius:999px;background:#dc2626;color:#fff;font:900 .7rem/20px Nunito,system-ui,sans-serif;text-align:center;box-shadow:0 0 0 2px #fff}
@keyframes tcfmPulse{0%,100%{box-shadow:0 0 0 0 rgba(239,68,68,.7)}50%{box-shadow:0 0 0 7px rgba(239,68,68,0)}}
.tcfm-panel{position:fixed;z-index:10050;right:12px;width:min(410px,calc(100vw - 24px));height:min(620px,calc(100vh - 90px));background:#fff;color:#1a1d26;border-radius:16px;box-shadow:0 24px 60px rgba(15,23,42,.35),0 0 0 1px rgba(15,23,42,.08);display:flex;flex-direction:column;overflow:hidden;font-family:Nunito,Inter,system-ui,sans-serif;animation:tcfmIn .22s ease}
@keyframes tcfmIn{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:none}}
.tcfm-hd{display:flex;align-items:center;gap:.6rem;padding:.75rem .9rem;background:linear-gradient(120deg,#312e81,#4338ca);color:#fff}
.tcfm-hd b{font-size:1rem;font-weight:800;flex:1}
.tcfm-hd button{border:none;background:rgba(255,255,255,.15);color:#fff;width:32px;height:32px;border-radius:8px;cursor:pointer;display:flex;align-items:center;justify-content:center}
.tcfm-hd button:hover{background:rgba(255,255,255,.28)}
.tcfm-tabs{display:flex;gap:.3rem;padding:.55rem .6rem;border-bottom:1px solid #e5e7eb;background:#f8fafc;overflow-x:auto}
.tcfm-tab{position:relative;flex:1 0 auto;border:1.5px solid #e5e7eb;background:#fff;color:#475569;border-radius:10px;padding:.4rem .6rem;font:800 .8rem Nunito,system-ui,sans-serif;cursor:pointer;white-space:nowrap}
.tcfm-tab.on{color:#fff;border-color:transparent}
.tcfm-tab .n{display:inline-block;margin-left:.3rem;min-width:17px;height:17px;padding:0 4px;border-radius:999px;background:#dc2626;color:#fff;font-size:.68rem;line-height:17px}
.tcfm-kime{padding:.45rem .9rem;font-size:.76rem;font-weight:700;color:#64748b;background:#fff;border-bottom:1px solid #f1f5f9}
.tcfm-list{flex:1;overflow-y:auto;padding:.8rem;display:flex;flex-direction:column;gap:.5rem;background:#f1f5f9;overscroll-behavior:contain}
.tcfm-bos{margin:auto;text-align:center;color:#94a3b8;font-weight:700;font-size:.86rem}
.tcfm-gun{align-self:center;font-size:.7rem;font-weight:800;color:#64748b;background:#e2e8f0;border-radius:999px;padding:.15rem .6rem}
.tcfm-m{max-width:82%;padding:.5rem .7rem .4rem;border-radius:14px;background:#fff;box-shadow:0 1px 2px rgba(15,23,42,.08);align-self:flex-start;word-wrap:break-word;white-space:pre-wrap;font-size:.9rem;line-height:1.35}
.tcfm-m.ben{align-self:flex-end;background:#4338ca;color:#fff}
.tcfm-m .ust{display:flex;gap:.4rem;align-items:center;font-size:.68rem;font-weight:900;letter-spacing:.03em;margin-bottom:.15rem;opacity:.85}
.tcfm-m .ust i{font-style:normal;padding:0 .35rem;border-radius:5px;color:#fff}
.tcfm-m .sa{display:block;text-align:right;font-size:.66rem;opacity:.6;margin-top:.15rem}
.tcfm-kime2{display:flex;align-items:center;gap:.5rem;padding:.45rem .6rem 0;background:#fff;border-top:1px solid #e5e7eb;font-size:.78rem;font-weight:800;color:#475569}
.tcfm-kime2 select{flex:1;min-width:0;border:1.5px solid #e5e7eb;border-radius:9px;padding:.35rem .5rem;font:700 .82rem Nunito,system-ui,sans-serif;color:#1a1d26;background:#f8fafc}
.tcfm-ft{display:flex;gap:.45rem;padding:.6rem;border-top:1px solid #e5e7eb;background:#fff;align-items:flex-end}
.tcfm-ft textarea{flex:1;resize:none;min-height:42px;max-height:120px;border:1.5px solid #e5e7eb;border-radius:12px;padding:.55rem .7rem;font:600 .9rem Nunito,system-ui,sans-serif;color:#1a1d26;background:#f8fafc;outline:none}
.tcfm-ft textarea:focus{border-color:#6366f1;background:#fff}
.tcfm-ft button{height:42px;min-width:42px;border:none;border-radius:12px;background:#4338ca;color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:.3rem;padding:0 .8rem;font:800 .84rem Nunito,system-ui,sans-serif}
.tcfm-ft button:disabled{opacity:.45;cursor:default}
.tcfm-ro{padding:.6rem .9rem;border-top:1px solid #e5e7eb;background:#fff;display:flex;justify-content:space-between;align-items:center;font-size:.78rem;color:#64748b;font-weight:700}
.tcfm-ro button{border:1px solid #e5e7eb;background:#fff;border-radius:9px;padding:.35rem .7rem;font:800 .78rem Nunito,system-ui,sans-serif;color:#334155;cursor:pointer}
.tcfm-toast{position:fixed;z-index:10060;right:12px;width:min(360px,calc(100vw - 24px));background:#fff;color:#1a1d26;border-radius:14px;box-shadow:0 18px 44px rgba(15,23,42,.35);border-left:6px solid #dc2626;padding:.7rem .85rem;cursor:pointer;font-family:Nunito,Inter,system-ui,sans-serif;animation:tcfmIn .25s ease}
.tcfm-toast b{display:flex;align-items:center;gap:.35rem;font-size:.82rem;font-weight:900;color:#dc2626;margin-bottom:.2rem}
.tcfm-toast p{margin:0;font-size:.9rem;font-weight:600;max-height:3.9em;overflow:hidden;white-space:pre-wrap}
@media (max-width:520px){.tcfm-btn .tx{display:none}.tcfm-panel{right:8px;width:calc(100vw - 16px);height:calc(100vh - 80px)}}
`;
function cssEkle(){if(document.getElementById("tcfMsgCss"))return;const s=document.createElement("style");s.id="tcfMsgCss";s.textContent=CSS;document.head.appendChild(s)}
const h=(tag,cls,txt)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(txt!=null)e.textContent=txt;return e};
const saat=ts=>{const d=new Date(ts);return String(d.getHours()).padStart(2,"0")+":"+String(d.getMinutes()).padStart(2,"0")};
const gun=ts=>new Date(ts).toLocaleDateString("tr-TR",{day:"2-digit",month:"long",year:"numeric"});
function bip(){try{const C=window.AudioContext||window.webkitAudioContext;if(!C)return;const c=new C(),o=c.createOscillator(),g=c.createGain();o.type="sine";o.frequency.value=880;g.gain.setValueAtTime(.0001,c.currentTime);g.gain.exponentialRampToValueAtTime(.18,c.currentTime+.02);g.gain.exponentialRampToValueAtTime(.0001,c.currentTime+.35);o.connect(g);g.connect(c.destination);o.start();o.stop(c.currentTime+.4);o.onended=()=>c.close()}catch{}}

export function mesajKur({db,ref,onValue,update,base,rol,slotId="__msgSlot",katAl}){
 if(!db||!base||!ROLAD[rol])return()=>{};
 cssEkle();
 const kanallar=rol==="cjp"?["sja","sje","sjd","ustjuri"]:[rol];
 const tumuVar=rol==="cjp"||rol==="ustjuri";
 let msgs={},okuma={},acik=!1,kapandi=!1,ilkYuk=!0;
 let aktif=kanallar[0];try{const v=localStorage.getItem("tcfMsgKanal_"+rol);if(v&&(kanallar.includes(v)||v==="__tumu"&&tumuVar))aktif=v}catch{}
 const gorulen=new Set(),baslangic=Date.now(),eskiBaslik=document.title;
 // Birden fazla CJP ekranı olabilir: CJP'nin kimliği = açık olan kategori
 const benKat=()=>{if(rol!=="cjp")return null;try{const k=katAl&&katAl();return k&&k.id?k:null}catch{return null}};
 const temiz=x=>String(x).replace(/[.#$[\]/]/g,"-");
 const okKey=()=>rol==="cjp"?"cjp__"+temiz((benKat()||{}).id||"genel"):rol;
 const benimMi=m=>rol!=="cjp"||!m.kat||m.kat===(benKat()||{}).id;
 const cjpAd=m=>"CJP"+(m&&m.katAd?" · "+m.katAd:"");
 const kisi=m=>m.kimden==="cjp"?cjpAd(m):(ROLAD[m.kimden]||m.kimden);
 let hedef=null;
 // ---- düğme ----
 const btn=h("button","tcfm-btn");btn.type="button";btn.title=rol==="cjp"?T("Üst Jüriye mesaj gönder"):T("Mesajlar");
 btn.innerHTML=`<span class="material-icons-round">forum</span><span class="tx"></span>`;btn.querySelector(".tx").textContent=rol==="cjp"?T("Mesaj Gönder"):T("Mesajlar");
 const badge=h("span","tcfm-badge");badge.style.display="none";btn.appendChild(badge);
 btn.onclick=()=>acik?kapat():ac();
 let slotTry=0,slotTimer=null;
 const yerlestir=()=>{const sl=document.getElementById(slotId);if(sl){sl.appendChild(btn);return}
  if(++slotTry<25){slotTimer=setTimeout(yerlestir,300);return}
  Object.assign(btn.style,{position:"fixed",top:"12px",right:"12px",zIndex:10040,background:"#4338ca"});document.body.appendChild(btn)};
 yerlestir();
 // ---- panel ----
 let panel=null,listEl=null,taEl=null,tabsEl=null,kimeEl=null;
 const okunmamis=k=>(msgs[k]||[]).filter(m=>m.kimden!==rol&&benimMi(m)&&m.ts>(okuma[k]?.[okKey()]||0)).length;
 const toplamOkunmamis=()=>kanallar.reduce((a,k)=>a+okunmamis(k),0);
 const panelTop=()=>{const r=btn.getBoundingClientRect();return Math.max(8,Math.min(r.bottom+8,window.innerHeight-200))};
 function ac(k){acik=!0;ilkCizim=!0;if(k)aktif=k;panel=h("div","tcfm-panel");panel.style.top=panelTop()+"px";
  const hd=h("div","tcfm-hd");hd.innerHTML=`<span class="material-icons-round">forum</span>`;const bas=h("b",null,"");bas.className="tcfm-bas";hd.appendChild(bas);
  const x=h("button");x.type="button";x.title=T("Kapat");x.innerHTML=`<span class="material-icons-round">close</span>`;x.onclick=kapat;hd.appendChild(x);panel.appendChild(hd);
  if(kanallar.length>1||tumuVar){tabsEl=h("div","tcfm-tabs");panel.appendChild(tabsEl)}else tabsEl=null;
  kimeEl=h("div","tcfm-kime");panel.appendChild(kimeEl);
  listEl=h("div","tcfm-list");panel.appendChild(listEl);
  const alt=h("div");panel.appendChild(alt);panel._alt=alt;
  document.body.appendChild(panel);ciz();
  setTimeout(()=>taEl&&taEl.focus(),50);
  document.addEventListener("keydown",esc);document.addEventListener("mousedown",disTik,!0)}
 function kapat(){acik=!1;panel&&panel.remove();panel=null;document.removeEventListener("keydown",esc);document.removeEventListener("mousedown",disTik,!0);rozet()}
 const esc=e=>{if(e.key==="Escape")kapat()};
 const disTik=e=>{if(panel&&!panel.contains(e.target)&&!btn.contains(e.target))kapat()};
 function sec(k){aktif=k;ilkCizim=!0;try{localStorage.setItem("tcfMsgKanal_"+rol,k)}catch{}ciz();setTimeout(()=>taEl&&taEl.focus(),30)}
 function okunduYap(k){if(!kanallar.includes(k)||!okunmamis(k))return;const son=Math.max(...(msgs[k]||[]).map(m=>m.ts),Date.now()),ok=okKey();okuma[k]={...(okuma[k]||{}),[ok]:son};update(ref(db,`${base}/mesajOkuma/${k}`),{[ok]:son}).catch(()=>{})}
 function ciz(){rozet();if(!panel)return;
  const tumu=aktif==="__tumu",bk=benKat();
  panel.querySelector(".tcfm-bas").textContent=rol==="cjp"?T("Mesajlar — ")+(bk?cjpAd({katAd:bk.ad}):"CJP"):T("Mesajlar — ")+ROLAD[rol]+" ↔ CJP";
  if(tabsEl){tabsEl.innerHTML="";[...kanallar,...(tumuVar?["__tumu"]:[])].forEach(k=>{const b=h("button","tcfm-tab"+(k===aktif?" on":""));b.type="button";
    b.textContent=k==="__tumu"?T("Tümü"):(rol==="cjp"?KANAL[k].ad:T("CJP"));if(k===aktif)b.style.background=k==="__tumu"?"#334155":KANAL[k].renk;
    const n=k==="__tumu"?0:okunmamis(k);if(n){const s=h("span","n",String(n));b.appendChild(s)}b.onclick=()=>sec(k);tabsEl.appendChild(b)})}
  kimeEl.textContent=tumu?T("Yarışmadaki tüm yazışmalar (yalnızca görüntüleme)"):(rol==="cjp"?T("Alıcı: ")+KANAL[aktif].uzun+(bk?T(" · Gönderen: ")+cjpAd({katAd:bk.ad}):""):T("Yazışma: ")+ROLAD[rol]+" ↔ CJP");
  const liste=tumu?Object.entries(msgs).flatMap(([k,a])=>a.map(m=>({...m,_k:k}))).sort((a,b)=>a.ts-b.ts):(msgs[aktif]||[]).filter(benimMi).map(m=>({...m,_k:aktif}));
  const altKalan=listEl.scrollHeight-listEl.scrollTop-listEl.clientHeight;
  listEl.innerHTML="";
  if(!liste.length)listEl.appendChild(h("div","tcfm-bos",tumu?T("Bu yarışmada henüz mesaj yok."):T("Henüz mesaj yok. İlk mesajı yazın.")));
  let sonGun="";
  liste.forEach(m=>{const g=gun(m.ts);if(g!==sonGun){listEl.appendChild(h("div","tcfm-gun",g));sonGun=g}
   const ben=m.kimden===rol&&!tumu,b=h("div","tcfm-m"+(ben?" ben":""));
   const ust=h("div","ust");
   if(tumu){const t=h("i",null,KANAL[m._k].ad);t.style.background=KANAL[m._k].renk;ust.appendChild(t)}
   ust.appendChild(h("span",null,tumu?kisi(m)+" → "+(m.kimden==="cjp"?KANAL[m._k].ad:(m.kat?cjpAd(m):T("Tüm CJP'ler"))):m.kimden===rol?T("Siz")+(rol!=="cjp"?" → "+(m.kat?cjpAd(m):T("Tüm CJP'ler")):""):kisi(m)));
   b.appendChild(ust);b.appendChild(h("span",null,m.metin));b.appendChild(h("span","sa",saat(m.ts)));listEl.appendChild(b)});
  if(altKalan<60||ilkCizim)listEl.scrollTop=listEl.scrollHeight;ilkCizim=!1;
  const alt=panel._alt;alt.innerHTML="";taEl=null;
  if(tumu){const ro=h("div","tcfm-ro");ro.appendChild(h("span",null,liste.length+T(" mesaj")));const d=h("button",null,T("Dışa aktar (.txt)"));d.type="button";d.onclick=()=>disaAktar(liste);ro.appendChild(d);alt.appendChild(ro)}
  else{if(rol!=="cjp"){const kats=[];(msgs[aktif]||[]).slice().reverse().forEach(m=>{if(m.kimden==="cjp"&&m.kat&&!kats.some(x=>x.kat===m.kat))kats.push({kat:m.kat,katAd:m.katAd||m.kat})});
    if(hedef&&hedef!=="__hepsi"&&!kats.some(x=>x.kat===hedef))hedef=null;const sec0=hedef||(kats[0]?kats[0].kat:"__hepsi");
    const kr=h("div","tcfm-kime2");kr.appendChild(h("span",null,T("Kime:")));const sl=h("select");
    [...kats.map(x=>[x.kat,cjpAd(x),x.katAd]),["__hepsi",T("Tüm CJP'ler"),""]].forEach(([v,t,ka])=>{const o=h("option",null,t);o.value=v;o.dataset.ad=ka;if(v===sec0)o.selected=!0;sl.appendChild(o)});
    sl.onchange=()=>{hedef=sl.value};kr.appendChild(sl);alt.appendChild(kr);alt._sl=sl}
   const ft=h("div","tcfm-ft");taEl=h("textarea");taEl.rows=1;taEl.maxLength=1000;taEl.placeholder=rol==="cjp"?(bk?KANAL[aktif].ad+T(" için mesaj yazın…"):T("Mesaj için önce kategori seçin")):T("CJP'ye mesaj yazın…");if(rol==="cjp"&&!bk)taEl.disabled=!0;
   const gb=h("button");gb.type="button";gb.innerHTML=`<span class="material-icons-round">send</span>`;gb.title=T("Gönder (Enter)");
   const gonderBtn=()=>{gb.disabled=!taEl.value.trim()||taEl.disabled};taEl.oninput=()=>{taEl.style.height="auto";taEl.style.height=Math.min(120,taEl.scrollHeight)+"px";gonderBtn()};
   taEl.onkeydown=e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();gonder()}};gb.onclick=gonder;gonderBtn();
   ft.appendChild(taEl);ft.appendChild(gb);alt.appendChild(ft);
   if(acik)okunduYap(aktif)}}
 let ilkCizim=!0;
 async function gonder(){if(!taEl)return;const metin=taEl.value.trim().slice(0,1000);if(!metin||aktif==="__tumu")return;
  const k=aktif,ts=Date.now(),id=ts.toString(36)+Math.random().toString(36).slice(2,7),veri={kimden:rol,metin,ts};
  if(rol==="cjp"){const bk=benKat();if(!bk)return;veri.kat=bk.id;veri.katAd=bk.ad||bk.id}
  else{const sl=panel&&panel._alt&&panel._alt._sl,o=sl&&sl.selectedOptions[0];if(o&&o.value!=="__hepsi"){veri.kat=o.value;veri.katAd=o.dataset.ad||o.value}}
  taEl.value="";taEl.style.height="auto";
  try{await update(ref(db),{[`${base}/mesajlar/${k}/${id}`]:veri,[`${base}/mesajOkuma/${k}/${okKey()}`]:ts})}
  catch(e){taEl&&(taEl.value=metin);alert(T("Mesaj gönderilemedi: ")+(e&&e.message||e))}}
 function disaAktar(liste){const sat=liste.map(m=>`[${gun(m.ts)} ${saat(m.ts)}] ${KANAL[m._k].ad} | ${kisi(m)} → ${m.kimden==="cjp"?KANAL[m._k].ad:(m.kat?cjpAd(m):"Tüm CJP")}: ${m.metin}`).join("\n");
  const b=new Blob([sat],{type:"text/plain;charset=utf-8"}),a=document.createElement("a");a.href=URL.createObjectURL(b);a.download="mesajlar_"+base.split("/").pop()+".txt";a.click();setTimeout(()=>URL.revokeObjectURL(a.href),2000)}
 function rozet(){const n=toplamOkunmamis();badge.style.display=n?"":"none";badge.textContent=n>99?"99+":String(n);btn.classList.toggle("yeni",n>0&&!acik);
  document.title=n?`(${n}) `+eskiBaslik.replace(/^\(\d+\+?\)\s*/,""):eskiBaslik.replace(/^\(\d+\+?\)\s*/,"")}
 // ---- bildirim ----
 let toastEl=null,toastT=null;
 function bildir(k,m){if(acik&&aktif===k)return;if(!benimMi(m))return;toastEl&&toastEl.remove();clearTimeout(toastT);
  toastEl=h("div","tcfm-toast");toastEl.style.top=panelTop()+"px";const b=h("b");b.innerHTML=`<span class="material-icons-round" style="font-size:1rem">mark_chat_unread</span>`;b.appendChild(document.createTextNode(T("Yeni mesaj · ")+kisi(m)+(rol==="cjp"?" → "+cjpAd({katAd:(benKat()||{}).ad}):" → "+ROLAD[rol])));
  toastEl.appendChild(b);toastEl.appendChild(h("p",null,m.metin));toastEl.onclick=()=>{toastEl.remove();toastEl=null;acik?sec(k):ac(k)};document.body.appendChild(toastEl);
  toastT=setTimeout(()=>{toastEl&&toastEl.remove();toastEl=null},9000);bip()}
 // ---- dinleyiciler ----
 const u1=onValue(ref(db,`${base}/mesajlar`),s=>{const v=s.val()||{},yeni={};
  Object.keys(KANAL).forEach(k=>{yeni[k]=Object.entries(v[k]||{}).map(([id,m])=>({id,...m})).filter(m=>m&&m.metin!=null&&m.ts).sort((a,b)=>a.ts-b.ts)});
  msgs=yeni;
  kanallar.forEach(k=>(msgs[k]||[]).forEach(m=>{if(gorulen.has(m.id))return;gorulen.add(m.id);
   if(!ilkYuk&&m.kimden!==rol&&benimMi(m)&&m.ts>=baslangic-5000)bildir(k,m)}));
  if(tumuVar)Object.keys(msgs).forEach(k=>msgs[k].forEach(m=>gorulen.add(m.id)));
  ilkYuk=!1;ciz()});
 const u2=onValue(ref(db,`${base}/mesajOkuma`),s=>{okuma=s.val()||{};ciz()});
 let sonKat=(benKat()||{}).id;const katIzle=rol==="cjp"?setInterval(()=>{const k=(benKat()||{}).id;if(k!==sonKat){sonKat=k;ilkCizim=!0;ciz()}},1000):null;
 return()=>{if(kapandi)return;kapandi=!0;try{u1&&u1()}catch{}try{u2&&u2()}catch{}clearTimeout(slotTimer);clearTimeout(toastT);katIzle&&clearInterval(katIzle);kapat();btn.remove();toastEl&&toastEl.remove();document.title=eskiBaslik.replace(/^\(\d+\+?\)\s*/,"")}
}
