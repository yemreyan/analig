import"./i18n-Tr01a2b3Cb2.js";import{j as e,d as db,l as logAction}from"./main-C2LpyYUGCb2.js";import{r as R}from"./vendor-react-Cxw6bqwhCb2.js";import{k as ref,o as onValue,m as update,l as get}from"./vendor-firebase-940mxgRVCb2.js";import{v as tokOk}from"./epanelToken-BoF3UjP2Cb2.js";import{useAktifKategori,katAdi}from"./judgeLinkGroup-Jl01a2b3Cb2.js";import{raImg,raAd}from"./ritmikAlet-Ra01a2b3Cb2.js";import{bayrakUrl}from"./intl-Ul01a2b3Cb2.js";import"./modulepreload-polyfill-B5Qt9EMXCb2.js";

// RİTMİK HAKEM EKRANLARI v2 (DA/DB ve A/E) — yalnız Paneller sayfasında "Hakem ekranı yapısı" kaydedilmiş
// panel grubunun linkleriyle açılır. Hakem gönderilmiş notunu değiştirirse duzeltmeler/<id> {tip:"hakem",eski,yeni} yazılır; başhakem geri gönderdiyse (geriGonder/<SLOT>) istek kapanır. QR & Linkler sayfasının eski linkleri (catId) eski ekranlarda kalır.
//  <yarışma>/panelGruplari/<gid>/yapi = {DA:{yapi,n,mod{SLOT},sorumlu}, DB:{…}, esik, esikDavranis, gor{partner,sjRef,elemListe}, duz{DA,DB,A,E,sure}, tema}
//    yapi: tek (tek hakem = kesin not) | sorumlu (iki aşamalı) | ortalama (otomatik) | bashakem (başhakem yazar)
//  Yazılan alanlar eski yapıyla aynı: puanlar/<kat>/<sporcu>/<alet>/{da,daScore,da1..da4,db…,aPanel/jN,ePanel/jN}
//  + <alan>Elem (element listesi), hakemZaman/<SLOT> (gönderim anı). Canlı düzeltme izni: duzeltmeIzni/<kat>/<sporcu>/<alet>/<SLOT>
const B="ritmik_yarismalar";
export const YAPI_VARS={DA:{yapi:"sorumlu",n:2,mod:{},sorumlu:"DA1"},DB:{yapi:"sorumlu",n:2,mod:{},sorumlu:"DB1"},esik:.3,esikDavranis:"uyar",gor:{partner:!1,sjRef:!1,elemListe:!0},duz:{DA:"acik",DB:"acik",A:"acik",E:"acik",sure:30},tema:"koyu"};
export const yapiNorm=y=>{const v=YAPI_VARS,o=y||{};const sub=P=>{const s={...v[P],...(o[P]||{})};s.mod={...(o[P]?.mod||{})};s.n=Math.max(2,Math.min(4,parseInt(s.n)||2));if(!["tek","sorumlu","ortalama","bashakem"].includes(s.yapi))s.yapi="sorumlu";if(s.yapi==="sorumlu"&&!(+String(s.sorumlu||"").slice(2)>=1&&+String(s.sorumlu).slice(2)<=s.n))s.sorumlu=P+"1";return s};
 return{DA:sub("DA"),DB:sub("DB"),esik:+o.esik>0?+o.esik:v.esik,esikDavranis:o.esikDavranis==="onay"?"onay":"uyar",gor:{...v.gor,...(o.gor||{})},duz:{...v.duz,...(o.duz||{})},tema:o.tema==="acik"?"acik":"koyu"}};
export const dSlotlari=(y,P)=>{const s=yapiNorm(y)[P];return s.yapi==="tek"?[P]:[...Array(s.n)].map((_,i)=>P+(i+1))};
const f2=v=>v==null||v===""||isNaN(v)?"—":(Math.round(+v*100)/100).toFixed(2),r3=v=>Math.round(+v*1000)/1000,has=v=>v!=null&&v!==""&&!(typeof v=="number"&&isNaN(v));
const MI=(n,st)=>e.jsx("i",{className:"material-icons-round hv-mi",style:st,children:n});

// ---- Kapı: Paneller linki + kayıtlı yapı varsa v2, yoksa eski ekran ----
export function V2Kapi(Old,kind){return function V2Gate(p){
 if(!/^\/ritmik\//.test(location.pathname))return e.jsx(Old,{...p});
 const q=new URLSearchParams(location.search),lk=q.get("linkId"),comp=q.get("competitionId"),pt=(q.get("panelType")||"").toLowerCase();
 const uygun=!!(lk&&comp)&&(kind==="ae"||/^d[ab]\d?$/.test(pt));
 const[st,setSt]=R.useState(uygun?{y:void 0}:{y:null});
 R.useEffect(()=>{if(!uygun)return;let u2=null;const u1=onValue(ref(db,`${B}/${comp}/hakemLinkleri/${lk}/panelGrubu`),s=>{const g=s.val();u2&&u2();u2=null;if(!g){setSt({y:null});return}
   u2=onValue(ref(db,`${B}/${comp}/panelGruplari/${g}`),t=>{const v=t.val();setSt(v&&v.yapi?{y:yapiNorm(v.yapi),g:{ad:v.ad||"",adet:v.adet||{}}}:{y:null})})},()=>setSt({y:null}));return()=>{u1();u2&&u2()}},[]);
 if(st.y===void 0)return e.jsx("div",{style:{minHeight:"100vh",background:"#0B0F19",color:"#8E9AB8",display:"grid",placeItems:"center",fontFamily:"system-ui,sans-serif",fontWeight:700},children:__T("Yükleniyor…")});
 return st.y?e.jsx(HakemV2,{kind,yapi:st.y,grup:st.g}):e.jsx(Old,{...p})}}

const CSS=`.hv2{--c1:#EC4899;--c2:#8B5CF6;--ok:#16A34A;--warn:#D97706;--bad:#DC2626;min-height:100vh;display:flex;flex-direction:column;font-family:"Plus Jakarta Sans",Inter,system-ui,sans-serif;background:var(--bg);color:var(--tx);-webkit-tap-highlight-color:transparent}
.hv2.koyu{--bg:#0B0F19;--bg2:#0F1524;--card:#141B2D;--card2:#1A2238;--line:#26304A;--tx:#E8ECF7;--mut:#8E9AB8;--key:#1C2540;--keyh:#25304F;--shadow:0 10px 30px -18px rgba(0,0,0,.8)}
.hv2.acik{--bg:#F4F5FA;--bg2:#FFFFFF;--card:#FFFFFF;--card2:#F7F8FC;--line:#E3E7F0;--tx:#0F172A;--mut:#64748B;--key:#F1F3F9;--keyh:#E6E9F2;--shadow:0 1px 2px rgba(15,23,42,.05),0 10px 26px -18px rgba(15,23,42,.25)}
.hv2 *{box-sizing:border-box}.hv2 .mono{font-family:"JetBrains Mono",ui-monospace,SFMono-Regular,Menlo,monospace}
.hv2 .hv-mi{font-family:"Material Icons Round";font-size:20px;line-height:1;font-style:normal;text-transform:none;letter-spacing:normal;font-weight:normal;vertical-align:middle}
.hv-h{display:flex;align-items:center;gap:12px;padding:12px 16px;background:var(--bg2);border-bottom:1px solid var(--line);position:relative;flex-wrap:wrap}
.hv-h::after{content:"";position:absolute;left:0;right:0;bottom:-1px;height:3px;background:linear-gradient(90deg,var(--c1),var(--c2))}
.hv-badge{min-width:58px;height:46px;padding:0 12px;border-radius:14px;display:grid;place-items:center;color:#fff;font-weight:800;font-size:19px;background:var(--rc);box-shadow:0 8px 18px -10px var(--rc)}
.hv-role small{display:block;font-size:11px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;color:var(--rc)}.hv-role strong{display:block;font-size:15px}
.hv-sp{flex:1}
.hv-pill{display:inline-flex;align-items:center;gap:6px;padding:6px 11px;border-radius:999px;background:var(--card2);border:1px solid var(--line);font-size:12px;font-weight:700;color:var(--mut);max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.hv-pill .dot{width:8px;height:8px;border-radius:50%;background:var(--ok);box-shadow:0 0 0 3px color-mix(in srgb,var(--ok) 25%,transparent)}.hv-pill .dot.off{background:var(--bad)}
.hv-b{flex:1;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.08fr);gap:16px;padding:16px;align-items:start}
@media(max-width:820px){.hv-b{grid-template-columns:1fr}}
.hv-col{display:flex;flex-direction:column;gap:14px}
.hv-card{background:var(--card);border:1px solid var(--line);border-radius:20px;box-shadow:var(--shadow)}
.hv-ath{padding:16px;display:flex;gap:14px;align-items:center}
.hv-med{width:74px;height:74px;border-radius:50%;background:#fff;display:grid;place-items:center;flex-shrink:0;box-shadow:0 0 0 4px color-mix(in srgb,var(--c1) 30%,transparent)}.hv-med img{width:76%;height:76%;object-fit:contain}
.hv-nm{font-size:22px;font-weight:800;line-height:1.15;word-break:break-word}.hv-nm span{display:block;font-size:13px;font-weight:700;color:var(--mut);margin-bottom:2px}
.hv-chips{display:flex;flex-wrap:wrap;gap:6px;margin-top:8px}
.hv-chip{display:inline-flex;align-items:center;gap:5px;padding:4px 10px;border-radius:999px;font-size:12px;font-weight:800;background:var(--card2);border:1px solid var(--line);color:var(--tx)}
.hv-chip.bib{background:var(--tx);color:var(--bg);border-color:var(--tx)}.hv-chip img{width:18px;height:12px;border-radius:2px;object-fit:cover}
.hv-sec{padding:16px;display:flex;flex-direction:column;gap:12px}
.hv-sec h4{margin:0;font-size:11px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:var(--mut);display:flex;align-items:center;gap:8px}
.hv-disp{display:flex;align-items:baseline;justify-content:center;gap:6px;padding:14px 10px;border-radius:18px;background:var(--card2);border:2px solid color-mix(in srgb,var(--rc) 35%,var(--line))}
.hv-disp .v{font-size:60px;font-weight:700;letter-spacing:-.02em}.hv-disp .v.neg{color:var(--rc)}.hv-disp .u{font-size:13px;font-weight:800;color:var(--mut)}
.hv-subl{display:flex;justify-content:space-between;gap:8px;font-size:12.5px;font-weight:700;color:var(--mut)}.hv-subl b{color:var(--tx)}
.hv-pad{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}
.hv-k{height:60px;border:1px solid var(--line);border-radius:14px;background:var(--key);color:var(--tx);font:inherit;font-size:24px;font-weight:700;cursor:pointer;touch-action:manipulation}
.hv-k:active{background:var(--keyh);transform:scale(.97)}.hv-k.fn{font-size:15px;color:var(--mut)}
.hv-qs{display:grid;grid-template-columns:repeat(5,1fr);gap:8px}
.hv-q{min-height:52px;border-radius:14px;border:1.5px solid color-mix(in srgb,var(--rc) 45%,var(--line));background:color-mix(in srgb,var(--rc) 9%,var(--card));color:var(--rc);font:inherit;font-size:16px;font-weight:800;cursor:pointer;touch-action:manipulation}
.hv-q:active{background:color-mix(in srgb,var(--rc) 20%,var(--card))}.hv-q.big{min-height:58px;font-size:18px}
.hv-grp{display:flex;gap:6px}.hv-grp button{flex:1;height:42px;border-radius:12px;border:1px solid var(--line);background:var(--card2);color:var(--mut);font:inherit;font-weight:800;font-size:13px;cursor:pointer}.hv-grp button.on{background:var(--rc);border-color:var(--rc);color:#fff}
.hv-tape{display:flex;flex-wrap:wrap;gap:6px;min-height:44px;padding:8px;border-radius:14px;background:var(--card2);border:1px dashed var(--line)}
.hv-t{display:inline-flex;align-items:center;gap:6px;padding:6px 6px 6px 10px;border-radius:10px;background:var(--card);border:1px solid var(--line);font-weight:800;font-size:13px}
.hv-t small{font-size:10px;font-weight:800;color:var(--mut)}.hv-t button{border:0;background:transparent;color:var(--mut);cursor:pointer;padding:0;display:grid}
.hv-empty{color:var(--mut);font-size:12.5px;font-weight:600;align-self:center;padding:0 4px}
.hv-row{display:flex;gap:8px;flex-wrap:wrap}
.hv-btn{min-height:46px;border-radius:14px;border:1px solid var(--line);background:var(--card2);color:var(--tx);font:inherit;font-weight:800;font-size:14px;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;gap:6px;padding:0 14px}
.hv-btn.send{flex:1;min-height:64px;border:0;color:#fff;font-size:18px;letter-spacing:.04em;background:linear-gradient(135deg,var(--rc),color-mix(in srgb,var(--rc) 55%,#0F172A));box-shadow:0 14px 26px -14px var(--rc)}
.hv-btn:disabled{opacity:.45;cursor:default;box-shadow:none}
.hv-info{display:flex;gap:10px;align-items:center;padding:12px 14px;border-radius:14px;background:color-mix(in srgb,var(--ic,var(--rc)) 8%,var(--card));border:1px solid color-mix(in srgb,var(--ic,var(--rc)) 25%,var(--line));font-size:13px;font-weight:700}
.hv-info .hv-mi{color:var(--ic,var(--rc))}
.hv-peer{display:grid;grid-template-columns:repeat(auto-fit,minmax(86px,1fr));gap:8px}
.hv-peer div{padding:10px;border-radius:14px;background:var(--card2);border:1px solid var(--line);text-align:center}.hv-peer small{display:block;font-size:10.5px;font-weight:800;letter-spacing:.1em;color:var(--mut)}.hv-peer b{font-size:21px}
.hv-gap{font-size:12px;font-weight:800;padding:3px 9px;border-radius:999px}.hv-gap.ok{background:color-mix(in srgb,var(--ok) 15%,transparent);color:var(--ok)}.hv-gap.w{background:color-mix(in srgb,var(--warn) 15%,transparent);color:var(--warn)}.hv-gap.b{background:color-mix(in srgb,var(--bad) 15%,transparent);color:var(--bad)}
.hv-step{display:flex;align-items:center;gap:8px;padding:6px 12px;border-radius:999px;background:var(--card2);border:1px solid var(--line);font-size:12px;font-weight:800;color:var(--mut);align-self:flex-start}.hv-step i{width:22px;height:6px;border-radius:999px;background:var(--line)}.hv-step i.on{background:var(--rc)}
.hv-full{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;padding:40px 20px;text-align:center}
.hv-full .big{width:96px;height:96px;border-radius:50%;display:grid;place-items:center;background:color-mix(in srgb,var(--rc) 14%,var(--card));color:var(--rc)}.hv-full .big .hv-mi{font-size:48px}
.hv-full h2{margin:0;font-size:26px}.hv-full p{margin:0;color:var(--mut);font-weight:600;max-width:440px}.hv-full .sent{font-size:68px;font-weight:700}
.hv-pulse{animation:hvpl 1.6s ease-in-out infinite}@keyframes hvpl{50%{transform:scale(1.06);opacity:.8}}
.hv-sj{position:fixed;inset:0;background:rgba(15,23,42,.9);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;color:#fff;z-index:50;text-align:center;padding:20px}.hv-sj h2{font-size:34px;margin:0}.hv-sj .hv-mi{font-size:64px;color:#FBBF24}
.hv-err{color:var(--bad);font-weight:800;font-size:13px}`;

const AE_Q=[.1,.2,.3,.5,1],DB_V=[.1,.2,.3,.4,.5,.6,.7,.8,.9,1],DA_V=[.2,.3,.4,.5,.6,.7,.8,.9,1,1.1],DGRP=[["S","Sıçrama"],["D","Denge"],["R","Dönüş"]];
const RC={DA:"#7C3AED",DB:"#4F46E5",A:"#EC4899",E:"#10B981"};

function Numpad({val,set,max}){const press=k=>{let v=val||"";if(k==="⌫")v=v.slice(0,-1);else if(k===".")v.includes(".")||(v=(v||"0")+".");else{const nx=v+k;if(/^\d{0,2}(\.\d{0,3})?$/.test(nx)&&!(max&&parseFloat(nx)>max))v=nx}set(v)};
 return e.jsx("div",{className:"hv-pad",children:["1","2","3","4","5","6","7","8","9",".","0","⌫"].map(k=>e.jsx("button",{type:"button",className:"hv-k"+(k==="."||k==="⌫"?" fn":""),onClick:()=>press(k),children:k==="⌫"?MI("backspace"):k},k))})}

function HakemV2({kind,yapi,grup}){
 const q=new URLSearchParams(location.search),comp=q.get("competitionId")||"",lk=q.get("linkId")||"",tok=q.get("token")||"";
 const slot=kind==="d"?(q.get("panelType")||"").toUpperCase():(q.get("panelId")||"").toUpperCase();
 const P=kind==="d"?slot.slice(0,2):slot[0],no=parseInt(slot.replace(/^\D+/,""))||0;
 const C=kind==="d"?yapi[P]:null,tek=kind==="d"&&C.yapi==="tek",resp=kind==="d"&&C.yapi==="sorumlu"&&C.sorumlu===slot;
 const mode=kind==="d"?(C.mod?.[slot]||"toplam"):"toplam",own=kind==="d"?(tek?P.toLowerCase():slot.toLowerCase()):null,fin=P.toLowerCase(),pan=P==="A"?"aPanel":"ePanel",jk="j"+no;
 const rc=RC[P]||"#8B5CF6",title=kind==="d"?(P==="DA"?__T("Alet Zorluğu (DA)"):__T("Vücut Zorluğu (DB)"))+(tek?" · "+__T("kesin not"):""):(P==="A"?__T("Artistlik (A)"):__T("İcra (E)"));
 const[tokS,setTokS]=R.useState("?"),[isim,setIsim]=R.useState(""),[kats,setKats]=R.useState({}),[ath,setAth]=R.useState(null),[alet0,setAlet0]=R.useState(""),[rec,setRec]=R.useState(null),[spr,setSpr]=R.useState(null),[izin,setIzin]=R.useState(void 0),[sjc,setSjc]=R.useState(null),[hAd,setHAd]=R.useState(""),[bagli,setBagli]=R.useState(!0),[now,setNow]=R.useState(Date.now());
 const[val,setVal]=R.useState(""),[el,setEl]=R.useState([]),[grp,setGrp]=R.useState("S"),[tape,setTape]=R.useState([]),[edit,setEdit]=R.useState(!1),[stage2,setStage2]=R.useState(!1),[busy,setBusy]=R.useState(!1),[err,setErr]=R.useState("");
 const{aktif:cat}=useAktifKategori(B,comp,"",lk,"");
 R.useEffect(()=>{get(ref(db,`${B}/${comp}/epanelToken`)).then(s=>{const v=s.val();setTokS(!v||tokOk(tok,String(v))?"ok":"bad")}).catch(()=>setTokS("ok"))},[comp,tok]);
 R.useEffect(()=>{const u=[onValue(ref(db,`${B}/${comp}/isim`),s=>setIsim(s.val()||"")),onValue(ref(db,`${B}/${comp}/kategoriler`),s=>setKats(s.val()||{})),onValue(ref(db,".info/connected"),s=>setBagli(s.val()!==!1))];return()=>u.forEach(f=>f())},[comp]);
 R.useEffect(()=>{if(!cat){setAth(null);return}const u=[onValue(ref(db,`${B}/${comp}/aktifSporcu/${cat}`),s=>{const v=s.val();setAth(v?typeof v=="object"?v:{id:String(v)}:null)}),onValue(ref(db,`${B}/${comp}/aktifAlet/${cat}`),s=>setAlet0(s.val()||""))];return()=>u.forEach(f=>f())},[comp,cat]);
 const alet=ath?.alet||alet0||"",aid=ath?.id||"",key=cat+"|"+aid+"|"+alet;
 R.useEffect(()=>{setRec(null);setSpr(null);setIzin(void 0);if(!cat||!aid||!alet)return;const u=[onValue(ref(db,`${B}/${comp}/puanlar/${cat}/${aid}/${alet}`),s=>setRec(s.val()||{})),onValue(ref(db,`${B}/${comp}/duzeltmeIzni/${cat}/${aid}/${alet}/${slot}`),s=>{const v=s.val();setIzin(v===!0||v===!1?v:void 0)})];
  if(!aid.includes("::"))u.push(onValue(ref(db,`${B}/${comp}/sporcular/${cat}/${aid}`),s=>setSpr(s.val()||null)));return()=>u.forEach(f=>f())},[comp,key,slot]);
 R.useEffect(()=>{setVal("");setEl([]);setTape([]);setEdit(!1);setStage2(!1);setErr("")},[key]);
 R.useEffect(()=>{setHAd("");if(!cat||!alet)return;return onValue(ref(db,`${B}/${comp}/hakemler/${cat}/${alet}`),s=>{const v=s.val()||{},x=v[slot.toLowerCase()]||v[slot]||(tek?v[slot.toLowerCase()+"1"]||v[slot+"1"]:null);setHAd(x?typeof x=="object"?x.name||"":String(x):"")})},[comp,cat,alet,slot]);
 R.useEffect(()=>{if(!cat||!alet)return;return onValue(ref(db,`${B}/${comp}/refereeCalls/${cat}/${alet}/sj${P.toLowerCase()}`),s=>{const v=s.val();setSjc(v&&v.ts?+v.ts:null)})},[comp,cat,alet,P]);
 R.useEffect(()=>{const t=setInterval(()=>setNow(Date.now()),1e3);return()=>clearInterval(t)},[]);

 const r=rec||{},mine=kind==="d"?r[own]:r[pan]?.[jk],finV=kind==="d"?r[fin]:null,kilit=r.kilitli===!0,bhk=kind==="ae"&&r.lockedFields?.[`${pan}__${jk}`]===!0;
 const peers=kind==="d"&&!tek?[...Array(C.n)].map((_,i)=>[P+(i+1),r[(P+(i+1)).toLowerCase()]]):[];
 const onayP=kind==="d"?((r.onay||{})[P]||null):null;
 const gonderildi=kind==="d"?(resp?has(mine)&&has(finV):has(mine)):has(mine);
 const duzKural=izin===!0?"bashakem":izin===!1?"kapali":yapi.duz[P]||"acik",gTs=+(r.hakemZaman?.[slot]||0),kalan=duzKural==="sureli"&&gTs?Math.max(0,Math.ceil((yapi.duz.sure||30)-(now-gTs)/1e3)):null;
 const duzAcik=duzKural==="acik"||duzKural==="bashakem"||duzKural==="sureli"&&kalan>0;
 const durum=!ath?"bekliyor":kilit?"kilitli":bhk?"bashakem":edit?"puanlama":resp&&onayP?.durum==="bekliyor"?"onaybek":resp&&has(mine)&&(stage2||!has(finV))?"asama2":gonderildi?"gonderildi":"puanlama";
 const yol=`${B}/${comp}/puanlar/${cat}/${aid}/${alet}`,athAd=[ath?.ad,ath?.soyad].filter(Boolean).join(" ")||spr?.adSoyad||"";
 const elSum=r3(el.reduce((a,x)=>a+x.v,0)),apeSum=r3(tape.reduce((a,b)=>a+b,0));
 const deger=kind==="ae"?(tape.length&&val===""?apeSum:parseFloat(val)||0):mode==="toplam"||stage2||durum==="asama2"?parseFloat(val)||0:val!==""&&mode==="ikisi"?parseFloat(val)||0:elSum;
 const log=(v,ek)=>{try{logAction("judge_score_submit",`[Ritmik] ${slot}${ek||""}: ${v} · ${athAd} · ${raAd(alet)||alet}`,{competitionId:comp,category:cat,athleteId:aid,discipline:"ritmik",data:{slot,alet,deger:v,v2:!0}})}catch{}};
 const gonder=async()=>{setErr("");if(!aid||!alet||!cat)return;const v=r3(deger);if(!(v>=0)||kind==="ae"&&v>10){setErr(__T("Geçersiz değer."));return}setBusy(!0);
  try{const z=Date.now(),_es=kind==="d"&&tek?finV:mine,_gg=r.geriGonder&&r.geriGonder[slot],_dz=v=>{const o={};if(has(_es)&&Math.abs(+_es-v)>1e-9)o[`duzeltmeler/dz${z.toString(36)}${slot}`]={alan:slot,eski:+_es,yeni:v,tip:"hakem",kim:hAd||slot,ts:z,istek:!!_gg};if(_gg)o[`geriGonder/${slot}`]=null;return o};if(_gg)update(ref(db),{[`${B}/${comp}/duzeltmeIzni/${cat}/${aid}/${alet}/${slot}`]:null}).catch(()=>{});if(kind==="ae"){const lk2=(await get(ref(db,`${B}/${comp}/board/${cat}/${aid}/ustJuriKilit`))).val();if(lk2){setErr(__T("Üst Jüri kontrolünde — not gönderilemez."));setBusy(!1);return}
    await update(ref(db,yol),{[`${pan}/${jk}`]:v,[`hakemZaman/${slot}`]:z,..._dz(v)});log(v)}
   else{const u={[`hakemZaman/${slot}`]:z};if(tek){u[fin]=v;u[fin+"Score"]=v}else u[own]=v;if(mode!=="toplam")u[own+"Elem"]=el.length?el.map(x=>P==="DB"?{v:x.v,g:x.g}:x.v):null;Object.assign(u,_dz(v));
    await update(ref(db,yol),u);log(v);
    if(C.yapi==="ortalama"){const s=(await get(ref(db,yol))).val()||{},vs=[...Array(C.n)].map((_,i)=>s[(P+(i+1)).toLowerCase()]);if(vs.every(has)){const a=r3(vs.reduce((x,y)=>x+ +y,0)/vs.length),nv=vs.map(Number),fk=Math.max(...nv)-Math.min(...nv);if(yapi.esikDavranis==="onay"&&fk>yapi.esik+1e-9)await update(ref(db,yol),{[`onay/${P}`]:{durum:"bekliyor",deger:a,kaynak:"ORT",fark:r3(fk),esik:yapi.esik,ts:Date.now(),degerler:Object.fromEntries(vs.map((x,i)=>[P+(i+1),+x]))}});else await update(ref(db,yol),{[fin]:a,[fin+"Score"]:a,[`onay/${P}`]:null})}}
    if(resp){setStage2(!0);setVal("")}}
   setEdit(!1)}catch(x){setErr(__T("Gönderilemedi: ")+(x?.message||x))}setBusy(!1)};
 const kesinGonder=async()=>{setErr("");const v=r3(parseFloat(val));if(!(v>=0)){setErr(__T("Kesin notu girin."));return}
  const vs=peers.map(x=>x[1]).filter(has).map(Number),sp=vs.length>1?Math.max(...vs)-Math.min(...vs):0;
  const onayGerek=yapi.esikDavranis==="onay"&&sp>yapi.esik+1e-9,z=Date.now();
  setBusy(!0);try{if(onayGerek){await update(ref(db,yol),{[`onay/${P}`]:{durum:"bekliyor",deger:v,kaynak:slot,fark:r3(sp),esik:yapi.esik,ts:z,degerler:Object.fromEntries(peers.filter(x=>has(x[1])).map(([k,x])=>[k,+x]))},[`hakemZaman/${slot}`]:z});log(v," kesin → başhakem onayına")}
   else{await update(ref(db,yol),{[fin]:v,[fin+"Score"]:v,[`onay/${P}`]:null,[`hakemZaman/${slot}`]:z});log(v," kesin")}setStage2(!1);setEdit(!1);setVal("")}catch(x){setErr(__T("Gönderilemedi: ")+(x?.message||x))}setBusy(!1)};
 const onayGeriCek=async()=>{setBusy(!0);try{await update(ref(db,yol),{[`onay/${P}`]:null});setStage2(!0);setVal(String(onayP?.deger??""))}catch{}setBusy(!1)};

 // ---- parçalar ----
 const kat=kats[cat]||{},katAd=kat.name||katAdi(cat),ulke=ath?.ulke||spr?.ulke||"",bib=ath?.bib||spr?.bib||"",bf=ulke?bayrakUrl(ulke):null,img=raImg(alet);
 const header=e.jsxs("div",{className:"hv-h",children:[e.jsxs("div",{className:"hv-role",style:{display:"flex",alignItems:"center",gap:10},children:[e.jsx("div",{className:"hv-badge",children:slot||"?"}),e.jsxs("div",{children:[e.jsx("small",{children:title}),e.jsx("strong",{children:hAd||grup?.ad||__T("Hakem paneli")})]})]}),e.jsx("div",{className:"hv-sp"}),hAd&&grup?.ad?e.jsx("span",{className:"hv-pill",children:grup.ad}):null,
  e.jsxs("span",{className:"hv-pill",children:[e.jsx("span",{className:"dot"+(bagli?"":" off")}),bagli?__T("Bağlı"):__T("Bağlantı yok")]}),isim?e.jsxs("span",{className:"hv-pill",children:[MI("emoji_events",{fontSize:16}),isim]}):null]});
 const athKart=ath?e.jsxs("div",{className:"hv-card hv-ath",children:[img?e.jsx("div",{className:"hv-med",children:e.jsx("img",{src:img,alt:""})}):null,e.jsxs("div",{style:{minWidth:0},children:[e.jsxs("div",{className:"hv-nm",children:[ath.soyad?e.jsx("span",{children:ath.ad}):null,ath.soyad?String(ath.soyad).toLocaleUpperCase("tr-TR"):athAd||ath.okul||aid]}),
  e.jsxs("div",{className:"hv-chips",children:[bib?e.jsx("span",{className:"hv-chip bib",children:"BIB "+bib}):null,ulke?e.jsxs("span",{className:"hv-chip",children:[bf?e.jsx("img",{src:bf,alt:""}):null,ulke]}):ath.okul?e.jsx("span",{className:"hv-chip",children:ath.okul}):null,katAd?e.jsx("span",{className:"hv-chip",children:katAd}):null,alet?e.jsx("span",{className:"hv-chip",children:raAd(alet)||alet}):null]})]})]}):null;
 const tam=(ic,baslik,metin,ek)=>e.jsxs("div",{className:"hv-full",children:[e.jsx("div",{className:"big"+(ic==="hourglass_top"?" hv-pulse":""),children:MI(ic)}),ek&&ek.ust,e.jsx("h2",{children:baslik}),metin?e.jsx("p",{children:metin}):null,ek&&ek.alt]});
 const sjOv=sjc&&now-sjc<1e4?e.jsxs("div",{className:"hv-sj",children:[MI("campaign"),e.jsx("h2",{children:__T("SJ PANELİNE GİDİNİZ")}),e.jsx("p",{style:{margin:0,color:"#CBD5E1"},children:__T("Üst Jüri hakemleri çağırıyor")})]}):null;
 const kap=ch=>e.jsxs("div",{className:"hv2 "+yapi.tema,style:{"--rc":rc},children:[e.jsx("style",{children:CSS}),header,ch,sjOv]});

 if(!comp||!slot)return kap(tam("link_off",__T("Geçersiz link"),__T("Bu link eksik; Paneller sayfasından yeniden alın.")));
 if(tokS==="bad")return kap(tam("lock",__T("Geçersiz anahtar"),__T("Linkin hakem anahtarı geçerli değil. Paneller sayfasından güncel linki alın.")));
 if(durum==="bekliyor")return kap(tam("hourglass_top",__T("Sporcu bekleniyor"),__T("Başhakem sporcuyu çağırdığında ekran otomatik açılır.")));
 // Aletsiz seri (WA): FIG — alet zorluğu (DA) yok, D = DB
 if(kind==="d"&&P==="DA"&&alet==="serbest")return kap(e.jsxs(e.Fragment,{children:[e.jsx("div",{style:{padding:"16px 16px 0"},children:athKart}),tam("block",__T("Aletsiz seri (WA)"),__T("Bu seride alet zorluğu (DA) puanı verilmez. Sıradaki sporcu çağrılınca ekran açılır."))]}));
 const benimF=f2(kind==="ae"?mine:tek?finV??mine:mine);
 if(durum==="kilitli")return kap(e.jsxs(e.Fragment,{children:[e.jsx("div",{style:{padding:"16px 16px 0"},children:athKart}),tam("lock",__T("Puan kilitlendi"),__T("Başhakem puanı kaydetti. Sıradaki sporcu çağrılınca ekran açılır."),{ust:has(mine)||has(finV)?e.jsx("div",{className:"sent mono",children:(kind==="ae"?"−":"")+benimF}):null})]}));
 if(durum==="bashakem")return kap(e.jsxs(e.Fragment,{children:[e.jsx("div",{style:{padding:"16px 16px 0"},children:athKart}),tam("gavel",__T("Başhakem kararı"),__T("Notun başhakem tarafından düzeltildi; yeniden gönderilemez."),{ust:e.jsx("div",{className:"sent mono",children:"−"+f2(mine)})})]}));
 if(durum==="onaybek")return kap(e.jsxs(e.Fragment,{children:[e.jsx("div",{style:{padding:"16px 16px 0"},children:athKart}),tam("hourglass_top",__T("Başhakem onayı bekleniyor"),__T("Hakemler arası fark eşiği aşıldı")+` (${f2(onayP.fark)} > ${f2(onayP.esik)}). `+__T("Kesin not başhakem onaylayınca kaydedilir."),{ust:e.jsx("div",{className:"sent mono",children:f2(onayP.deger)}),alt:e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:10},children:[e.jsx("div",{className:"hv-peer",style:{minWidth:280},children:Object.entries(onayP.degerler||{}).map(([k,x])=>e.jsxs("div",{children:[e.jsx("small",{children:k}),e.jsx("b",{className:"mono",children:f2(x)})]},k))}),e.jsxs("button",{type:"button",className:"hv-btn",disabled:busy,onClick:onayGeriCek,children:[MI("undo")," ",__T("Geri çek / kesin notu değiştir")]})]})})]}));
 if(durum==="gonderildi"){const duzBtn=e.jsxs("button",{type:"button",className:"hv-btn",onClick:()=>{setEdit(!0);setStage2(!1);setVal(kind==="ae"?String(mine??""):tek?String(finV??""):String(mine??""));setTape([]);const ee=r[own+"Elem"];setEl(Array.isArray(ee)?ee.map(x=>typeof x=="object"?x:{v:+x,g:""}):[])},children:[MI("edit")," ",__T("Düzelt")]});
  const alt=duzKural==="kapali"||duzKural==="sureli"&&!duzAcik?e.jsxs("div",{className:"hv-info",style:{"--ic":"var(--mut)"},children:[MI("lock"),__T("Düzeltme kapalı — gerekirse başhakem açar.")]}):e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:10},children:[r.geriGonder&&r.geriGonder[slot]?e.jsxs("div",{className:"hv-info",style:{"--ic":"var(--warn,#F59E0B)"},children:[MI("reply"),e.jsxs("span",{children:[__T("Başhakem notunu geri gönderdi — yeniden girin."),r.geriGonder[slot].not?e.jsxs("b",{style:{display:"block",marginTop:4},children:["“",r.geriGonder[slot].not,"”"]}):null]})]}):duzKural==="bashakem"?e.jsxs("div",{className:"hv-info",style:{"--ic":"var(--ok)"},children:[MI("lock_open"),__T("Başhakem düzeltme izni verdi")]}):duzKural==="sureli"?e.jsxs("div",{className:"mono",style:{fontSize:26,fontWeight:700,color:rc},children:["0:",String(kalan).padStart(2,"0")]}):e.jsx("p",{children:__T("Başhakem kilitleyene kadar düzeltebilirsin.")}),duzBtn]});
  return kap(e.jsxs(e.Fragment,{children:[e.jsx("div",{style:{padding:"16px 16px 0"},children:athKart}),tam("check_circle",__T("Gönderildi"),onayP?.durum==="bekliyor"?__T("Kesin")+" "+P+" "+f2(onayP.deger)+" — "+__T("başhakem onayında"):resp&&has(finV)?__T("Kendi notun")+" "+f2(mine)+" · "+__T("Kesin")+" "+P+" "+f2(finV):null,{ust:e.jsx("div",{className:"sent mono",children:(kind==="ae"?"−":"")+(resp&&has(finV)?f2(finV):benimF)}),alt})]}))}

 // ---- AŞAMA 2 (sorumlu hakem kesin not) ----
 if(kind==="d"&&durum==="asama2"){const vs=peers.filter(x=>has(x[1])).map(x=>+x[1]),avg=vs.length?vs.reduce((a,b)=>a+b,0)/vs.length:0,sp=vs.length>1?Math.max(...vs)-Math.min(...vs):0,cls=sp<=yapi.esik+1e-9?"ok":sp<=yapi.esik*1.7?"w":"b";
  const sol=e.jsxs("div",{className:"hv-col",children:[athKart,e.jsxs("div",{className:"hv-step",children:[__T("Aşama"),e.jsx("i",{className:"on"}),e.jsx("i",{className:"on"}),e.jsx("span",{style:{color:"var(--tx)"},children:"2/2 · "+__T("kesin not")})]}),
   e.jsxs("div",{className:"hv-card hv-sec",children:[e.jsxs("h4",{children:[MI("groups")," ",__T("Panel notları"),e.jsx("span",{className:"hv-sp"}),vs.length>1?e.jsx("span",{className:"hv-gap "+cls,children:__T("fark")+" "+f2(sp)}):null]}),
    e.jsx("div",{className:"hv-peer",children:[...peers.map(([s,v])=>e.jsxs("div",{children:[e.jsx("small",{children:s+(s===slot?" ("+__T("sen")+")":"")}),e.jsx("b",{className:"mono",children:f2(v)})]},s)),e.jsxs("div",{children:[e.jsx("small",{children:__T("ORTALAMA")}),e.jsx("b",{className:"mono",children:vs.length?f2(avg):"—"})]},"ort")]})]}),
   onayP?.durum==="reddedildi"?e.jsxs("div",{className:"hv-info",style:{"--ic":"var(--bad)"},children:[MI("reply"),__T("Başhakem kesin notu geri gönderdi")+` (${f2(onayP.deger)})`+(onayP.not?": “"+onayP.not+"”":"")]}):null,
   cls!=="ok"?e.jsxs("div",{className:"hv-info",style:{"--ic":"var(--warn)"},children:[MI("warning"),__T("Hakemler arası fark eşiği aşıldı")+` (${f2(yapi.esik)}) — `+(yapi.esikDavranis==="onay"?__T("kesin not başhakem onayına gidecek."):__T("kesin notu dikkatle kontrol et."))]}):null,
   vs.length<C.n?e.jsxs("div",{className:"hv-info",style:{"--ic":"var(--mut)"},children:[MI("hourglass_empty"),__T("Diğer hakemlerin notu bekleniyor")+` (${vs.length}/${C.n})`]}):null,
   e.jsxs("button",{type:"button",className:"hv-btn",onClick:()=>{setStage2(!1);setEdit(!0);setVal(mode==="toplam"?String(mine??""):"");const ee=r[own+"Elem"];setEl(Array.isArray(ee)?ee.map(x=>typeof x=="object"?x:{v:+x,g:""}):[])},children:[MI("arrow_back")," ",__T("Kendi notumu düzelt")]})]});
  const sag=e.jsxs("div",{className:"hv-card hv-sec",children:[e.jsxs("h4",{children:[MI("verified")," ",__T("Kesin")+" "+P+" "+__T("notu")]}),e.jsxs("div",{className:"hv-disp",children:[e.jsx("span",{className:"v mono",children:val||"0.00"}),e.jsx("span",{className:"u",children:__T("kesin")})]}),
   e.jsx("div",{className:"hv-qs",children:[[__T("Ortalama"),avg],[__T("En düşük"),vs.length?Math.min(...vs):0],[__T("En yüksek"),vs.length?Math.max(...vs):0],[__T("Benim"),+mine||0]].map(([t,v])=>e.jsx("button",{type:"button",className:"hv-q",style:{fontSize:12.5},onClick:()=>setVal(String(r3(v))),children:t},t)).concat(e.jsx("button",{type:"button",className:"hv-q",onClick:()=>setVal(""),children:MI("backspace")},"c"))}),
   e.jsx(Numpad,{val,set:setVal,max:30}),err?e.jsx("div",{className:"hv-err",children:err}):null,
   e.jsx("div",{className:"hv-row",children:e.jsxs("button",{type:"button",className:"hv-btn send",disabled:busy||val==="",onClick:kesinGonder,children:yapi.esikDavranis==="onay"&&sp>yapi.esik+1e-9?[MI("how_to_reg")," ",__T("BAŞHAKEM ONAYINA GÖNDER")]:[MI("verified")," ",__T("KESİN NOTU GÖNDER")]})})]});
  return kap(e.jsxs("div",{className:"hv-b",children:[sol,sag]}))}

 // ---- PUANLAMA ----
 if(kind==="ae"){const ded=deger;
  const sol=e.jsxs("div",{className:"hv-col",children:[athKart,e.jsxs("div",{className:"hv-card hv-sec",children:[e.jsxs("h4",{children:[MI("insights")," ",__T("Puan önizlemesi")]}),e.jsxs("div",{className:"hv-peer",children:[e.jsxs("div",{children:[e.jsx("small",{children:__T("KESİNTİ")}),e.jsx("b",{className:"mono",style:{color:rc},children:"−"+f2(ded)})]}),e.jsxs("div",{children:[e.jsx("small",{children:P==="A"?__T("A PUANI"):__T("E PUANI")}),e.jsx("b",{className:"mono",children:f2(Math.max(0,10-ded))})]}),e.jsxs("div",{children:[e.jsx("small",{children:__T("BASIŞ")}),e.jsx("b",{className:"mono",children:tape.length})]})]})]}),
   e.jsxs("div",{className:"hv-card hv-sec",children:[e.jsxs("h4",{children:[MI("receipt_long")," ",__T("Kesinti şeridi"),e.jsx("span",{className:"hv-sp"}),e.jsxs("button",{type:"button",className:"hv-btn",style:{minHeight:32,fontSize:12},onClick:()=>setTape(t=>t.slice(0,-1)),children:[MI("undo")," ",__T("Geri al")]})]}),
    e.jsx("div",{className:"hv-tape",children:tape.length?tape.map((v,i)=>e.jsxs("span",{className:"hv-t",children:[e.jsx("small",{children:"#"+(i+1)}),"−"+f2(v),e.jsx("button",{type:"button",onClick:()=>setTape(t=>t.filter((_,j)=>j!==i)),children:MI("close",{fontSize:16})})]},i)):e.jsx("span",{className:"hv-empty",children:__T("Kesinti butonlarına her basış buraya eklenir")})})]})]});
  const sag=e.jsxs("div",{className:"hv-card hv-sec",children:[e.jsxs("h4",{children:[MI("remove_circle")," ",__T("Toplam kesinti"),e.jsx("span",{className:"hv-sp"}),e.jsx("span",{className:"hv-chip",children:"10 − "+__T("kesinti")})]}),e.jsxs("div",{className:"hv-disp",children:[e.jsx("span",{className:"v neg mono",children:"−"+f2(ded)}),e.jsx("span",{className:"u",children:__T("kesinti")})]}),
   e.jsx("div",{className:"hv-qs",children:AE_Q.map(v=>e.jsx("button",{type:"button",className:"hv-q",onClick:()=>{setVal("");setTape(t=>[...t,v])},children:"−"+v.toFixed(1)},v))}),
   e.jsxs("div",{className:"hv-subl",children:[e.jsx("span",{children:__T("veya doğrudan yaz:")}),e.jsxs("span",{children:[__T("en fazla")," ",e.jsx("b",{children:"10.00"})]})]}),
   e.jsx(Numpad,{val,set:v=>{setVal(v);setTape([])},max:10}),err?e.jsx("div",{className:"hv-err",children:err}):null,
   e.jsx("div",{className:"hv-row",children:e.jsxs("button",{type:"button",className:"hv-btn send",disabled:busy||!(tape.length||val!==""),onClick:gonder,children:[MI("send")," ",__T("GÖNDER")," ",e.jsx("span",{className:"mono",children:"−"+f2(ded)})]})})]});
  return kap(e.jsxs("div",{className:"hv-b",children:[sol,sag]}))}

 // DA / DB
 const toplamGos=mode==="toplam"?val||"0.00":val!==""&&mode==="ikisi"?val:f2(elSum);
 const sol=e.jsxs("div",{className:"hv-col",children:[athKart,
  resp?e.jsxs("div",{className:"hv-step",children:[__T("Aşama"),e.jsx("i",{className:"on"}),e.jsx("i",{}),e.jsx("span",{style:{color:"var(--tx)"},children:"1/2 · "+__T("kendi notun")})]}):null,
  !tek&&(yapi.gor.partner||yapi.gor.sjRef)?e.jsxs("div",{className:"hv-card hv-sec",children:[e.jsxs("h4",{children:[MI("visibility")," ",__T("Diğer notlar")]}),e.jsx("div",{className:"hv-peer",children:[...(yapi.gor.partner?peers.filter(([s])=>s!==slot):[]),...(yapi.gor.sjRef?[["SJ"+P,r["sj"+fin]]]:[])].map(([s,v])=>e.jsxs("div",{children:[e.jsx("small",{children:s}),e.jsx("b",{className:"mono",children:f2(v)})]},s))})]}):null,
  tek?e.jsxs("div",{className:"hv-info",children:[MI("looks_one"),__T("Girdiğin not doğrudan kesin")+" "+P+" "+__T("notudur.")]}):null,
  C.yapi==="ortalama"?e.jsxs("div",{className:"hv-info",children:[MI("functions"),__T("Kesin")+` ${P} = ${C.n} `+__T("hakemin ortalaması (otomatik).")]}):null,
  C.yapi==="bashakem"?e.jsxs("div",{className:"hv-info",children:[MI("gavel"),__T("Kesin")+` ${P} `+__T("notunu başhakem belirler.")]}):null,
  resp?e.jsxs("div",{className:"hv-info",children:[MI("star"),__T("Sorumlu hakemsin: göndermeden sonra panelin kesin notunu gireceksin.")]}):null,
  edit?e.jsxs("div",{className:"hv-info",style:{"--ic":"var(--warn)"},children:[MI("edit"),__T("Düzeltme modundasın — yeni değeri gönder.")]}):null]});
 const vals=P==="DB"?DB_V:DA_V,cnt={S:0,D:0,R:0};el.forEach(x=>cnt[x.g]!=null&&cnt[x.g]++);
 const sag=e.jsxs("div",{className:"hv-card hv-sec",children:[e.jsxs("h4",{children:[MI(mode==="toplam"?"dialpad":"format_list_numbered")," ",mode==="toplam"?(tek?__T("Kesin")+" "+P:__T("Toplam")+" "+P):mode==="element"?__T("Element sayma"):__T("Element + toplam düzelt"),e.jsx("span",{className:"hv-sp"}),mode!=="toplam"?e.jsx("span",{className:"hv-chip",children:el.length+" "+__T("element")}):null]}),
  e.jsxs("div",{className:"hv-disp",children:[e.jsx("span",{className:"v mono",children:toplamGos}),e.jsx("span",{className:"u",children:__T("puan")})]}),
  ...(mode==="toplam"?[e.jsx("div",{className:"hv-qs",children:[.1,.2,.3,.4,.5].map(v=>e.jsx("button",{type:"button",className:"hv-q",onClick:()=>setVal(x=>String(r3((parseFloat(x)||0)+v))),children:"+"+v.toFixed(1)},v))},"q"),e.jsx(Numpad,{val,set:setVal,max:30},"np")]
   :[P==="DB"?e.jsx("div",{className:"hv-grp",children:DGRP.map(([k,t])=>e.jsx("button",{type:"button",className:grp===k?"on":"",onClick:()=>setGrp(k),children:__T(t)},k))},"g"):null,
    e.jsx("div",{className:"hv-qs",children:vals.map(v=>e.jsx("button",{type:"button",className:"hv-q big",onClick:()=>{setEl(x=>[...x,{v,g:P==="DB"?grp:""}]);mode==="ikisi"&&setVal("")},children:v.toFixed(1)},v))},"v"),
    e.jsx("div",{className:"hv-tape",children:el.length?el.map((x,i)=>e.jsxs("span",{className:"hv-t",children:[e.jsx("small",{children:(x.g||"#")+(i+1)}),f2(x.v),e.jsx("button",{type:"button",onClick:()=>setEl(a=>a.filter((_,j)=>j!==i)),children:MI("close",{fontSize:16})})]},i)):e.jsx("span",{className:"hv-empty",children:__T("Değere dokundukça element eklenir")})},"t"),
    P==="DB"?e.jsxs("div",{className:"hv-subl",children:[e.jsxs("span",{children:[__T("Sıçrama")," ",e.jsx("b",{children:cnt.S})," · ",__T("Denge")," ",e.jsx("b",{children:cnt.D})," · ",__T("Dönüş")," ",e.jsx("b",{children:cnt.R})]}),cnt.S&&cnt.D&&cnt.R?e.jsx("span",{className:"hv-gap ok",children:"3 "+__T("grup")+" ✓"}):e.jsx("span",{className:"hv-gap w",children:__T("her gruptan en az 1")})]},"c"):null,
    e.jsxs("div",{className:"hv-row",children:[e.jsxs("button",{type:"button",className:"hv-btn",onClick:()=>setEl(a=>a.slice(0,-1)),children:[MI("undo")," ",__T("Geri al")]}),e.jsxs("button",{type:"button",className:"hv-btn",onClick:()=>{setEl([]);setVal("")},children:[MI("delete_sweep")," ",__T("Temizle")]}),
     mode==="ikisi"?e.jsxs("button",{type:"button",className:"hv-btn",onClick:async()=>{const v=await window.__gxPrompt(__T("Toplamı düzelt"),toplamGos);if(v!=null&&v!==""&&!isNaN(parseFloat(v)))setVal(String(r3(parseFloat(v))))},children:[MI("edit")," ",__T("Toplamı düzelt")]}):null]},"b")]),
  err?e.jsx("div",{className:"hv-err",children:err}):null,
  e.jsx("div",{className:"hv-row",children:e.jsxs("button",{type:"button",className:"hv-btn send",disabled:busy||(mode==="toplam"?val==="":!el.length&&val===""),onClick:gonder,children:[MI(tek?"verified":"send")," ",tek?__T("KESİN NOTU GÖNDER"):__T("GÖNDER")," ",e.jsx("span",{className:"mono",children:toplamGos})]})})]});
 return kap(e.jsxs("div",{className:"hv-b",children:[sol,sag]}))}
export{HakemV2};
