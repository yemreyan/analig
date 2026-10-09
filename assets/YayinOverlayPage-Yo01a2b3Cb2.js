import"./i18n-Tr01a2b3Cb2.js";import{u as useAuth,a as usDisc,j as e,d as db,b as usToast,l as logAction}from"./main-C2LpyYUGCb2.js";import{u as useNav,r as R}from"./vendor-react-Cxw6bqwhCb2.js";import{k as ref,o as onValue,m as update}from"./vendor-firebase-940mxgRVCb2.js";import{f as filterComps}from"./useFilteredCompetitions-B7FB6qIvCb2.js";import{GXP_CSS}from"./ArtistikNotSilmePage-Ns01a2b3Cb2.js";import"./modulepreload-polyfill-B5Qt9EMXCb2.js";
// Kısa link kodu (tv.gymexascore.net/<kod> · gymexascore.net/<kod>) — criteria/kisaLink/<kod> {t,b,c,p,kapali}
const __gsKod=()=>{const a="abcdefghijkmnpqrstuvwxyz23456789",b=new Uint8Array(9);crypto.getRandomValues(b);return Array.from(b,x=>a[x%a.length]).join("")};

// YAYIN OVERLAY — KURULUM (eski /yayin-overlay.html kurulum ekranının uygulama içi sürümü)
// Üretilen OBS/vMix linki şeffaf /broadcast-overlay.html?comp=… (vercel.json → yayin-overlay.html; eski /yayin-overlay.html linkleri de çalışır).
// v2: kanal başına YAYIN PROFİLLERİ (logolar, tema, alt bant, sıralama, sıradaki, podyum), canlı kontrol ve TV veri linki (/api/yayin).
const RENK={aerobik:["#10B981","directions_run"],ritmik:["#EC4899","auto_awesome"],artistik:["#4F46E5","sports_gymnastics"]};
const CSS=GXP_CSS+`
.yo-grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:16px;align-items:start}.yo-col{display:flex;flex-direction:column;gap:16px}
@media(max-width:980px){.yo-grid{grid-template-columns:1fr}}
.yo-h2{display:flex;align-items:center;gap:10px;font-size:1.02rem;font-weight:800;margin:0 0 12px}.yo-h2 small{font-weight:700;color:#94A3B8;font-size:.78rem}
.yo-ic{width:32px;height:32px;border-radius:10px;display:grid;place-items:center;color:#fff;flex-shrink:0}.yo-ic i{font-size:18px}
.yo-f{display:block;font-size:.78rem;font-weight:800;color:#475569;margin:14px 0 6px;letter-spacing:.02em}.yo-f span{font-weight:700;color:#94A3B8}
.yo-sel{width:100%;padding:10px 36px 10px 14px;border:1px solid var(--border,#E5E7EB);border-radius:12px;background:#fff url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%2364748B' stroke-width='2' fill='none'/%3E%3C/svg%3E") no-repeat right 12px center;-webkit-appearance:none;appearance:none;font:inherit;font-weight:700;font-size:.92rem}
.yo-sel:focus{outline:2px solid var(--gxp-c);outline-offset:1px}
.yo-seg{display:inline-flex;background:#F1F5F9;border-radius:12px;padding:3px;gap:2px;flex-wrap:wrap}.yo-seg button{border:none;background:transparent;padding:8px 14px;border-radius:9px;font:inherit;font-weight:800;font-size:.84rem;color:#475569;cursor:pointer}.yo-seg button.on{background:#fff;color:var(--gxp-c);box-shadow:0 1px 3px rgba(0,0,0,.1)}
.yo-pos{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}.yo-pos button{border:1.5px solid #E5E7EB;background:#fff;border-radius:12px;padding:8px;font:inherit;font-weight:800;font-size:.8rem;color:#475569;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:6px}
.yo-pos button i{display:block;width:100%;aspect-ratio:16/9;border-radius:6px;background:#F1F5F9;position:relative}.yo-pos button i::after{content:"";position:absolute;height:22%;width:55%;border-radius:3px;background:#CBD5E1}
.yo-pos button[data-v="alt-sol"] i::after{left:6%;bottom:9%}.yo-pos button[data-v="alt-orta"] i::after{left:22.5%;bottom:9%}.yo-pos button[data-v="ust-sol"] i::after{left:6%;top:9%}
.yo-pos button.on{border-color:var(--gxp-c);color:var(--gxp-c)}.yo-pos button.on i::after{background:var(--gxp-c)}
.yo-row{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.yo-num{display:inline-flex;align-items:center;border:1px solid #E5E7EB;border-radius:12px;overflow:hidden;background:#fff}.yo-num button{border:none;background:#F8FAFC;width:36px;height:38px;font:inherit;font-weight:800;font-size:1.1rem;color:#475569;cursor:pointer}.yo-num button:hover{background:#F1F5F9}
.yo-num input{width:64px;border:none;text-align:center;font:inherit;font-weight:800;font-size:.95rem;-moz-appearance:textfield}.yo-num input::-webkit-inner-spin-button{-webkit-appearance:none}
.yo-tools{display:flex;gap:6px;flex-wrap:wrap;align-items:center;margin-bottom:8px}.yo-tools button{display:inline-flex;align-items:center;gap:4px;border:1px solid #E5E7EB;background:#fff;border-radius:999px;padding:5px 11px;font:inherit;font-weight:800;font-size:.76rem;color:#475569;cursor:pointer}.yo-tools button i{font-size:15px}.yo-tools .cnt{margin-left:auto;font-size:.76rem;font-weight:800;color:var(--gxp-c)}
.yo-cgh{font-size:.72rem;font-weight:800;color:#64748B;letter-spacing:.05em;text-transform:uppercase;margin:10px 0 6px}
.yo-cats{display:flex;flex-wrap:wrap;gap:6px}.yo-cat{display:inline-flex;align-items:center;gap:6px;border:1.5px solid #E5E7EB;background:#fff;border-radius:999px;padding:6px 12px;font-weight:700;font-size:.82rem;color:#334155;cursor:pointer;user-select:none}.yo-cat input{display:none}.yo-cat.on{background:var(--gxp-c);border-color:var(--gxp-c);color:#fff}
.yo-note{font-size:.8rem;color:#64748B;font-weight:600;margin:8px 0 0;line-height:1.45}
.yo-url{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:.78rem;word-break:break-all;background:#F8FAFC;border:1px dashed #CBD5E1;border-radius:12px;padding:12px;color:#1E293B}.yo-url.bos{color:#94A3B8;font-family:inherit;font-weight:700}
.yo-btns{display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-top:12px}.yo-btn{display:inline-flex;align-items:center;gap:6px;border:none;border-radius:12px;padding:10px 14px;font:inherit;font-weight:800;font-size:.86rem;cursor:pointer;background:var(--gxp-c);color:#fff}.yo-btn.g{background:#fff;color:var(--gxp-c);border:1.5px solid var(--gxp-c)}.yo-btn:disabled{opacity:.45;cursor:default}.yo-btn i{font-size:18px}.yo-ok{font-size:.82rem;font-weight:800;color:#16A34A}
.yo-steps{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:14px}.yo-steps div{background:#F8FAFC;border-radius:12px;padding:10px;font-size:.78rem;font-weight:600;color:#475569;line-height:1.4}.yo-steps b{display:block;color:#1E293B;font-weight:800;margin-bottom:3px}.yo-steps code{background:#E2E8F0;border-radius:4px;padding:0 4px}
@media(max-width:640px){.yo-steps{grid-template-columns:1fr}.yo-row{grid-template-columns:1fr}}
.yo-prev{position:relative;aspect-ratio:16/9;border-radius:12px;overflow:hidden;background:repeating-conic-gradient(#E2E8F0 0 25%,#F8FAFC 0 50%) 0 0/24px 24px}.yo-prev iframe{position:absolute;inset:0;width:100%;height:100%;border:0}
.yo-pos button[data-v="alt-sag"] i::after{right:6%;bottom:9%}.yo-pos button[data-v="sag"] i::after{right:6%;top:20%;height:60%;width:32%}.yo-pos button[data-v="sol"] i::after{left:6%;top:20%;height:60%;width:32%}.yo-pos button[data-v="orta"] i::after{left:20%;top:15%;height:70%;width:60%}
.yo-pos button[data-v="sag-ust"] i::after{right:6%;top:9%;width:34%;height:34%}.yo-pos button[data-v="sol-ust"] i::after{left:6%;top:9%;width:34%;height:34%}.yo-pos button[data-v="sag-alt"] i::after{right:6%;bottom:9%;width:34%;height:34%}
.yo-tools button.on{background:var(--gxp-c);border-color:var(--gxp-c);color:#fff}
.yo-tabs{display:flex;gap:4px;flex-wrap:wrap;background:#F1F5F9;border-radius:12px;padding:4px;margin-bottom:14px}.yo-tabs button{flex:1 1 auto;display:inline-flex;align-items:center;justify-content:center;gap:5px;border:none;background:transparent;border-radius:9px;padding:8px 10px;font:inherit;font-weight:800;font-size:.8rem;color:#475569;cursor:pointer;position:relative;white-space:nowrap}.yo-tabs button i{font-size:17px}.yo-tabs button.on{background:#fff;color:var(--gxp-c);box-shadow:0 1px 3px rgba(0,0,0,.1)}.yo-tabs em{width:7px;height:7px;border-radius:50%;background:#16A34A;display:inline-block}
.yo-list{display:flex;flex-direction:column;gap:10px}
.yo-tog{display:flex;align-items:flex-start;gap:10px;cursor:pointer;padding:10px 12px;border:1px solid #E5E7EB;border-radius:12px;background:#fff;user-select:none}.yo-tog input{display:none}.yo-tog .sw{width:38px;height:22px;border-radius:999px;background:#CBD5E1;position:relative;flex-shrink:0;transition:background .2s;margin-top:1px}.yo-tog .sw::after{content:"";position:absolute;left:3px;top:3px;width:16px;height:16px;border-radius:50%;background:#fff;transition:left .2s;box-shadow:0 1px 2px rgba(0,0,0,.2)}.yo-tog.on .sw{background:var(--gxp-c)}.yo-tog.on .sw::after{left:19px}.yo-tog .tx{display:flex;flex-direction:column;min-width:0}.yo-tog b{font-size:.88rem;font-weight:800;color:#1E293B}.yo-tog small{font-size:.76rem;color:#64748B;font-weight:600;line-height:1.35}
.yo-kirli{background:#FEF3C7;color:#92400E;border-radius:999px;padding:3px 9px;font-weight:800;font-size:.72rem}.yo-live{background:#DCFCE7;color:#166534;border-radius:999px;padding:3px 9px;font-weight:800;font-size:.72rem}
.yo-color{width:46px;height:38px;border:1px solid #E5E7EB;border-radius:10px;padding:2px;background:#fff;cursor:pointer}
.yo-mini{display:inline-flex;align-items:center;gap:4px;border:1px solid #E5E7EB;background:#fff;border-radius:10px;padding:6px 10px;font:inherit;font-weight:800;font-size:.78rem;color:#475569;cursor:pointer}.yo-mini i{font-size:16px}
.yo-thumb{height:56px;max-width:150px;object-fit:contain;background:#fff;border:1px solid #E5E7EB;border-radius:10px;padding:4px;align-self:flex-start}
.yo-ek{display:flex;align-items:center;gap:10px;flex-wrap:wrap;padding:10px 12px;border:1px dashed #CBD5E1;border-radius:12px;background:#F8FAFC}.yo-ek>div{flex:1 1 200px;display:flex;flex-direction:column}.yo-ek b{font-size:.88rem;font-weight:800}.yo-ek small{font-size:.76rem;color:#64748B;font-weight:600}
.yo-save{display:flex;align-items:center;gap:8px;justify-content:flex-end;flex-wrap:wrap;margin-top:16px;padding-top:12px;border-top:1px solid #F1F5F9}.yo-save .yo-note{margin-right:auto!important}
.yo-profs{display:flex;flex-wrap:wrap;gap:8px}.yo-prof{display:inline-flex;align-items:center;gap:6px;border:1.5px solid #E5E7EB;background:#fff;border-radius:12px;padding:9px 14px;font:inherit;font-weight:800;font-size:.88rem;color:#334155;cursor:pointer}.yo-prof i{font-size:18px;color:#94A3B8}.yo-prof small{font-size:.7rem;color:#B91C1C;font-weight:800}.yo-prof.on{border-color:var(--gxp-c);background:color-mix(in srgb,var(--gxp-c) 8%,#fff);color:#0F172A}.yo-prof.on i{color:var(--gxp-c)}
.yo-ctl{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:12px}.yo-ctl button{display:flex;align-items:center;gap:8px;border:1.5px solid #E5E7EB;background:#fff;border-radius:12px;padding:11px 12px;font:inherit;font-weight:800;font-size:.84rem;color:#1E293B;cursor:pointer;text-align:left}.yo-ctl button i{font-size:20px;color:var(--gxp-c)}.yo-ctl button.on{border-color:#16A34A;background:#F0FDF4}.yo-ctl button.gz{grid-column:1/-1;justify-content:center;color:#475569}.yo-ctl button:disabled{opacity:.45;cursor:default}
.yo-kp{display:flex;flex-direction:column;gap:10px;margin-top:12px;padding:12px;border:1.5px dashed #CBD5E1;border-radius:12px;background:#F8FAFC}.yo-kp>b{font-size:.88rem;font-weight:800}.yo-btn.g.on{background:color-mix(in srgb,var(--gxp-c) 10%,#fff)}
.yo-btn.kr{background:#DC2626}.yo-btn.g.kr{background:#fff;color:#DC2626;border-color:#FCA5A5}
@media(max-width:640px){.yo-ctl{grid-template-columns:1fr}}`;

const Seg=({v,ops,on})=>e.jsx("div",{className:"yo-seg",children:ops.map(([k,t])=>e.jsx("button",{type:"button",className:v===k?"on":"",onClick:()=>on(k),children:t},k))});
const Num=({v,mn,mx,st=1,on})=>{const c=x=>on(Math.min(mx,Math.max(mn,Number(x)||0)));return e.jsxs("div",{className:"yo-num",children:[e.jsx("button",{type:"button",onClick:()=>c(v-st),children:"−"}),e.jsx("input",{type:"number",value:v,min:mn,max:mx,step:st,onChange:ev=>on(ev.target.value===""?mn:Number(ev.target.value)),onBlur:ev=>c(ev.target.value)}),e.jsx("button",{type:"button",onClick:()=>c(v+st),children:"+"})]})};

// ---- YAYIN PROFİLLERİ ----
// <yarışma>/yayinProfilleri/<id> = {ad, dil, kat[], olcek, kenar, tema, vurgu, arka, logo{tcf,gymexa,etkinlik,ek,kose}, alt{…}, tablo{…}, sirada{…}, podyum{…},
//   kontrol{g:siralama|sirada|podyum|alt-gizle|gizle, kat, sure, ts, kim}, kapali, guncelleme, guncelleyen}
// Overlay (?profil=) ve TV veri linki (/api/yayin?profil=) bu kaydı CANLI okur: kaydedince kanaldaki yayın anında değişir.
const PV=()=>({ad:"",dil:"tr",kat:[],olcek:100,kenar:90,tema:"tcf",vurgu:"",arka:"seffaf",
 logo:{tcf:!0,gymexa:!0,etkinlik:!0,ek:null,kose:"yok"},
 alt:{acik:!0,isim:!0,puan:!0,konum:"alt-sol",sure:12,isimSure:0,kulup:!0,ulke:!0,bib:!1,detay:!0,sira:!0,foto:!0},
 tablo:{acik:!1,mod:"puan",konum:"sag",n:8,sure:15,tur:"genel",detay:!0,donguSure:10},
 sirada:{acik:!1,mod:"cagri",konum:"sag-ust",n:3},
 podyum:{acik:!1,mod:"otomatik",n:3,sure:20}});
const ALANLAR=["ad","dil","kat","olcek","kenar","tema","vurgu","arka","logo","alt","tablo","sirada","podyum"];
const norm=p=>{const d=PV(),o={};ALANLAR.forEach(k=>{const v=p?.[k];o[k]=v===undefined||v===null?d[k]:d[k]&&typeof d[k]==="object"&&!Array.isArray(d[k])?{...d[k],...v}:v});o.kat=Array.isArray(o.kat)?o.kat:[];if(o.logo.ek===undefined)o.logo.ek=null;return o};
const resimOku=fl=>new Promise((res,rej)=>{const fr=new FileReader;fr.onload=()=>{const im=new Image;im.onload=()=>{const k=Math.min(1,360/Math.max(im.naturalWidth||360,im.naturalHeight||360)),cv=document.createElement("canvas");cv.width=Math.max(1,Math.round((im.naturalWidth||360)*k));cv.height=Math.max(1,Math.round((im.naturalHeight||360)*k));cv.getContext("2d").drawImage(im,0,0,cv.width,cv.height);res(cv.toDataURL("image/png"))};im.onerror=rej;im.src=fr.result};fr.onerror=rej;fr.readAsDataURL(fl)});
const I=n=>e.jsx("i",{className:"material-icons-round",children:n});
const Tog=({v,on,t,d})=>e.jsxs("label",{className:"yo-tog"+(v?" on":""),children:[e.jsx("input",{type:"checkbox",checked:!!v,onChange:ev=>on(ev.target.checked)}),e.jsx("span",{className:"sw"}),e.jsxs("span",{className:"tx",children:[e.jsx("b",{children:t}),d?e.jsx("small",{children:d}):null]})]});
const Bas=({ic,renk,t,sag})=>e.jsxs("h2",{className:"yo-h2",children:[e.jsx("span",{className:"yo-ic",style:{background:renk},children:I(ic)}),t,sag?e.jsx("small",{style:{marginLeft:"auto"},children:sag}):null]});
const Alan=({t,a,children})=>e.jsxs("div",{children:[e.jsxs("label",{className:"yo-f",children:[t,a?e.jsxs("span",{children:[" ",a]}):null]}),children]});

export default function YayinOverlayPage(){
 const nav=useNav(),{currentUser:user}=useAuth(),{firebasePath:FB,routePrefix:RP,id:br}=usDisc(),{toast}=usToast();
 const[renk,ikon]=RENK[br]||RENK.aerobik;
 const[comps,setComps]=R.useState(null),[comp,setComp]=R.useState("");
 const[profs,setProfs]=R.useState({}),[pid,setPid]=R.useState(""),[tas,setTas]=R.useState(null),[sekme,setSekme]=R.useState("genel");
 const[veri,setVeri]=R.useState("hepsi"),[fmt,setFmt]=R.useState("json"),[ok,setOk]=R.useState(""),[kKat,setKKat]=R.useState(""),[kSure,setKSure]=R.useState(0),[pvG,setPvG]=R.useState("oto"),[kpAc,setKpAc]=R.useState(!1),[kpKay,setKpKay]=R.useState(""),[kpSec,setKpSec]=R.useState([]);
 const frame=R.useRef(null);
 R.useEffect(()=>onValue(ref(db,FB),s=>setComps(filterComps(s.val()||{},user)||{})),[FB,user]);
 const list=R.useMemo(()=>Object.entries(comps||{}).filter(([,c])=>c&&c.arsivli!==!0&&c.arsivli!=="true").map(([k,c])=>({k,ad:c.isim||c.name||k,t:c.baslangicTarihi||c.tarih||""})).sort((a,b)=>String(b.t).localeCompare(String(a.t))),[comps]);
 R.useEffect(()=>{if(!comp&&list.length===1)setComp(list[0].k)},[list,comp]);
 R.useEffect(()=>{setProfs({});setPid("");setTas(null);if(!comp)return;return onValue(ref(db,`${FB}/${comp}/yayinProfilleri`),s=>setProfs(s.val()||{}))},[FB,comp]);
 // linkte şu an ne görünür (2026-10-08): çağrı ve puan durumu canlı okunur
 const[cagri,setCagri]=R.useState({}),[puanVar,setPuanVar]=R.useState({});
 R.useEffect(()=>{setCagri({});setPuanVar({});if(!comp)return;const u1=onValue(ref(db,`${FB}/${comp}/aktifSporcu`),s=>setCagri(s.val()||{})),u2=onValue(ref(db,`${FB}/${comp}/puanlar`),s=>{const v=s.val()||{},o={};Object.entries(v).forEach(([k,x])=>{o[k]=!!x&&Object.values(x).some(a=>a&&typeof a==="object"&&(a.sonuc>0||Object.values(a).some(b=>b&&typeof b==="object"&&b.sonuc>0)))});setPuanVar(o)});return()=>{u1();u2()}},[FB,comp]);
 const C0=comps?.[comp]||{},kats=C0.kategoriler||{},evLogo=C0.etkinlikLogo||null,intl=C0.tur==="uluslararasi"||C0.uluslararasi===!0;
 const kayitli=pid&&profs[pid]?norm(profs[pid]):null,P=pid?profs[pid]||{}:{};
 const kirli=!!(tas&&kayitli&&JSON.stringify(tas)!==JSON.stringify(kayitli));
 R.useEffect(()=>{if(pid&&profs[pid]&&!tas)setTas(norm(profs[pid]))},[pid,profs,tas]);
 const plist=Object.entries(profs).filter(([,p])=>p&&typeof p==="object").map(([k,p])=>({k,ad:p.ad||k,g:p.guncelleme||0})).sort((a,b)=>String(a.ad).localeCompare(String(b.ad),"tr"));
 const usr=user?.kullaniciAdi||user?.username||user?.ad||"admin";
 const yaz=async(yol,deger,msg)=>{try{await update(ref(db),{[`${FB}/${comp}/yayinProfilleri/${yol}`]:deger});msg&&toast(msg,"success");return!0}catch{toast(__T("Kaydedilemedi."),"error");return!1}};
 const degis=(grp,k,v)=>setTas(t=>grp?{...t,[grp]:{...t[grp],[k]:v}}:{...t,[k]:v});
 const sec=async k=>{if(k===pid)return;if(kirli&&!await window.__gxConfirm(__T("Kaydedilmemiş değişiklikler kaybolacak. Devam edilsin mi?")))return;setPid(k);setTas(profs[k]?norm(profs[k]):null);setSekme("genel")};
 const yeni=async kopya=>{if(kirli&&!await window.__gxConfirm(__T("Kaydedilmemiş değişiklikler kaybolacak. Devam edilsin mi?")))return;
  const ad=await window.__gxPrompt(__T("Profil adı (ör. TRT Spor, YouTube, Salon ekranı):"),kopya&&tas?tas.ad+" "+__T("(kopya)"):"");if(!ad||!String(ad).trim())return;
  const k="p"+Date.now().toString(36),o={...(kopya&&tas?tas:norm({})),ad:String(ad).trim(),olusturma:Date.now(),guncelleme:Date.now(),guncelleyen:usr};
  if(await yaz(k,o,__T("Profil oluşturuldu."))){try{logAction("broadcast_profile",`Yayın profili oluşturuldu: ${o.ad}`,{user:usr,competitionId:comp,discipline:br})}catch{}setPid(k);setTas(norm(o));setSekme("genel")}};
 const kaydet=async()=>{if(!tas)return;const o={};ALANLAR.forEach(k=>o[k]=tas[k]);o.guncelleme=Date.now();o.guncelleyen=usr;
  const U={};Object.entries(o).forEach(([k,v])=>U[`${FB}/${comp}/yayinProfilleri/${pid}/${k}`]=v);
  try{await update(ref(db),U);toast(__T("Kaydedildi — kanaldaki overlay güncellendi."),"success");try{logAction("broadcast_profile",`Yayın profili kaydedildi: ${tas.ad}`,{user:usr,competitionId:comp,discipline:br})}catch{}}catch{toast(__T("Kaydedilemedi."),"error")}};
 const sil=async()=>{if(!pid)return;if(!await window.__gxConfirm(__T("Bu profil silinsin mi? Bu profille verilen overlay ve veri linkleri çalışmayı bırakır (varsayılan görünüme döner).")))return;
  const ad=P.ad||pid;if(await yaz(pid,null,__T("Profil silindi."))){try{logAction("broadcast_profile",`Yayın profili silindi: ${ad}`,{user:usr,competitionId:comp,discipline:br})}catch{}setPid("");setTas(null)}};
 const adDegis=async()=>{const ad=await window.__gxPrompt(__T("Yeni profil adı:"),tas?.ad||"");if(ad&&String(ad).trim()){degis(null,"ad",String(ad).trim());await yaz(pid+"/ad",String(ad).trim())}};
 // başka yarışmadan profil kopyalama — kategori filtresi yalnız bu yarışmada olan kategorilerle kalır; canlı kontrol / yayın dışı kopyalanmaz
 const kaynaklar=list.filter(x=>x.k!==comp&&comps?.[x.k]?.yayinProfilleri&&Object.keys(comps[x.k].yayinProfilleri).length);
 const kpProfs=kpKay?Object.entries(comps?.[kpKay]?.yayinProfilleri||{}).filter(([,p])=>p&&typeof p==="object").map(([k,p])=>({k,p,ad:p.ad||k})).sort((a,b)=>String(a.ad).localeCompare(String(b.ad),"tr")):[];
 R.useEffect(()=>{setKpSec(kpProfs.map(x=>x.k))},[kpKay]);
 R.useEffect(()=>{setKpAc(!1);setKpKay("")},[comp]);
 const kopyalaDis=async()=>{const sec=kpProfs.filter(x=>kpSec.includes(x.k));if(!sec.length)return;if(kirli&&!await window.__gxConfirm(__T("Kaydedilmemiş değişiklikler kaybolacak. Devam edilsin mi?")))return;
  const adlar=new Set(Object.values(profs).map(p=>String(p?.ad||"").trim()));const U={};let son=null,katDus=0;
  sec.forEach((x,i)=>{const n=norm(x.p),k="p"+(Date.now()+i).toString(36);let ad=String(n.ad||__T("Profil")).trim(),j=2;while(adlar.has(ad))ad=String(n.ad).trim()+" ("+(j++)+")";adlar.add(ad);
   const kk=n.kat.filter(c=>kats[c]);if(n.kat.length&&kk.length<n.kat.length)katDus++;const o={};ALANLAR.forEach(a=>o[a]=n[a]);o.ad=ad;o.kat=kk;o.olusturma=Date.now();o.guncelleme=Date.now();o.guncelleyen=usr;o.kaynak={yarisma:kpKay,profil:x.k};delete o.tvKod;
   U[`${FB}/${comp}/yayinProfilleri/${k}`]=o;son=[k,o]});
  try{await update(ref(db),U);toast(sec.length+" "+__T("profil kopyalandı.")+(katDus?" "+__T("Bu yarışmada olmayan kategoriler filtreden çıkarıldı."):""),"success");
   try{logAction("broadcast_profile",`Yayın profili kopyalandı (${sec.length}): ${sec.map(x=>x.ad).join(", ")} ← ${comps?.[kpKay]?.isim||kpKay}`,{user:usr,competitionId:comp,discipline:br})}catch{}
   setKpAc(!1);setKpKay("");if(son){setPid(son[0]);setTas(norm(son[1]));setSekme("genel")}}catch{toast(__T("Kaydedilemedi."),"error")}};
 // canlı kontrol (anında yazılır)
 const kontrol=async g=>{const o=g==="gizle"?{g:"gizle",ts:Date.now(),kim:usr}:{g,kat:kKat||null,sure:+kSure||0,ts:Date.now(),kim:usr};
  if(await yaz(pid+"/kontrol",o)){setOk(g==="gizle"?__T("Elle gösterim kapatıldı"):__T("Kanala gönderildi ✓"));setTimeout(()=>setOk(""),2500)}};
 const kapat=async v=>{if(v&&!await window.__gxConfirm(__T("Yayın dışı: bu profildeki tüm grafikler kanaldan kaldırılır. Devam edilsin mi?")))return;await yaz(pid+"/kapali",v?!0:null,v?__T("Yayın dışı — grafikler gizlendi."):__T("Grafikler yeniden yayında."))};
 // önizleme
 const gonder=R.useCallback(()=>{try{frame.current?.contentWindow?.postMessage({gxProfil:tas||norm({}),evLogo},location.origin)}catch{}},[tas,evLogo]);
 R.useEffect(()=>{const t=setTimeout(gonder,150);return()=>clearTimeout(t)},[gonder]);
 R.useEffect(()=>{const f=ev=>{if(ev.origin===location.origin&&ev.data?.gxOverlayHazir)gonder()};window.addEventListener("message",f);return()=>window.removeEventListener("message",f)},[gonder]);
 const pvGoster=g=>{setPvG(g);try{frame.current?.contentWindow?.postMessage({gxGoster:g},location.origin)}catch{}};
 // linkler
 const O=location.origin,ovUrl=comp&&pid?`${O}/broadcast-overlay.html?comp=${encodeURIComponent(comp)}&brans=${br}&profil=${pid}`:"";
 const apiUrl=comp&&pid?`${O}/api/yayin?comp=${encodeURIComponent(comp)}&brans=${br}&profil=${pid}${veri!=="hepsi"?"&veri="+veri:""}${fmt!=="json"?"&format="+fmt:""}`:"";
 const kopyala=async u=>{if(!u)return;try{await navigator.clipboard.writeText(u);setOk(__T("Kopyalandı ✓"))}catch{await window.__gxPrompt(__T("Linki kopyalayın:"),u)}setTimeout(()=>setOk(""),2500)};
 const prev=`${O}/yayin-overlay.html?demo=1&brans=${br}${intl?"":"&intl=0"}`;
 // kategori filtresi
 const isFin=k=>/^final_/.test(k)||kats[k]?.final===!0,katAdi=k=>String(kats[k]?.name||kats[k]?.ad||k).replace(/^\s*\u{1F3C6}\s*/u,"").replace(/^final\s*[—–-]\s*/i,"");
 const ks=Object.keys(kats).sort((a,b)=>katAdi(a).localeCompare(katAdi(b),"tr")),fin=ks.filter(isFin),dig=ks.filter(k=>!isFin(k));
 const tk=tas?.kat||[],tog=k=>degis(null,"kat",tk.includes(k)?tk.filter(x=>x!==k):[...tk,k]);
 const chip=k=>e.jsxs("label",{className:"yo-cat"+(tk.includes(k)?" on":""),title:kats[k]?.name||k,children:[e.jsx("input",{type:"checkbox",checked:tk.includes(k),onChange:()=>tog(k)}),katAdi(k)]},k);
 const T=tas;
 const Pos=({v,on,ops})=>e.jsx("div",{className:"yo-pos",style:{gridTemplateColumns:`repeat(${Math.min(ops.length,4)},1fr)`},children:ops.map(([k,t])=>e.jsxs("button",{type:"button","data-v":k,className:v===k?"on":"",onClick:()=>on(k),children:[e.jsx("i",{}),t]},k))});
 const SEK=[["genel",__T("Genel"),"tune"],["logo",__T("Logolar"),"image"],["alt",__T("Alt bant"),"subtitles"],["tablo",__T("Sıralama"),"leaderboard"],["sirada",__T("Sıradaki"),"queue"],["podyum",__T("Podyum"),"emoji_events"]];
 const durumG={siralama:__T("Sıralama tablosu"),sirada:__T("Sıradaki sporcular"),podyum:__T("Podyum"),liste:__T("Başlangıç listesi"),"alt-gizle":__T("Alt bant gizli")};
 const kc=P.kontrol,kAktif=kc&&kc.g&&kc.g!=="gizle"&&!(+kc.sure>0&&Date.now()>(+kc.ts||0)+kc.sure*1000);

 const editor=T?e.jsxs("div",{className:"gxp-card",children:[
  e.jsx(Bas,{ic:"edit",renk:"#7C3AED",t:T.ad||__T("Profil"),sag:kirli?e.jsx("span",{className:"yo-kirli",children:__T("Kaydedilmedi")}):__T("Kayıtlı")}),
  e.jsx("div",{className:"yo-tabs",children:SEK.map(([k,t,ic])=>e.jsxs("button",{type:"button",className:sekme===k?"on":"",onClick:()=>setSekme(k),children:[I(ic),t,(k==="alt"&&T.alt.acik)||(k==="tablo"&&T.tablo.acik)||(k==="sirada"&&T.sirada.acik)||(k==="podyum"&&T.podyum.acik)?e.jsx("em",{}):null]},k))}),
  sekme==="genel"?e.jsxs("div",{children:[
   e.jsxs("div",{className:"yo-row",children:[e.jsx(Alan,{t:__T("Dil"),children:e.jsx(Seg,{v:T.dil,on:v=>degis(null,"dil",v),ops:[["tr","TR"],["en","EN"]]})}),e.jsx(Alan,{t:__T("Tema"),children:e.jsx(Seg,{v:T.tema,on:v=>degis(null,"tema",v),ops:[["tcf",__T("TCF lacivert")],["koyu",__T("Koyu")],["acik",__T("Açık")]]})})]}),
   e.jsxs("div",{className:"yo-row",children:[e.jsx(Alan,{t:__T("Vurgu rengi"),children:e.jsxs("div",{style:{display:"flex",gap:8,alignItems:"center"},children:[e.jsx("input",{type:"color",className:"yo-color",value:/^#[0-9a-f]{6}$/i.test(T.vurgu)?T.vurgu:"#e30613",onChange:ev=>degis(null,"vurgu",ev.target.value)}),T.vurgu?e.jsx("button",{type:"button",className:"yo-mini",onClick:()=>degis(null,"vurgu",""),children:__T("Varsayılan")}):e.jsx("span",{className:"yo-note",style:{margin:0},children:__T("Varsayılan (TCF kırmızısı)")})]})}),
    e.jsx(Alan,{t:__T("Arka plan"),a:__T("· şeffaf yoksa keying için"),children:e.jsx(Seg,{v:T.arka,on:v=>degis(null,"arka",v),ops:[["seffaf",__T("Şeffaf")],["yesil",__T("Yeşil")],["mavi",__T("Mavi")],["siyah",__T("Siyah")]]})})]}),
   e.jsxs("div",{className:"yo-row",children:[e.jsx(Alan,{t:__T("Boyut (%)"),children:e.jsx(Num,{v:T.olcek,mn:40,mx:200,st:5,on:v=>degis(null,"olcek",v)})}),e.jsx(Alan,{t:__T("Kenar boşluğu (px)"),a:__T("· TV güvenli alan"),children:e.jsx(Num,{v:T.kenar,mn:20,mx:240,st:10,on:v=>degis(null,"kenar",v)})})]}),
   e.jsxs("label",{className:"yo-f",children:[__T("Kategori filtresi")," ",e.jsx("span",{children:__T("· boş = tümü")})]}),
   !ks.length?e.jsx("p",{className:"yo-note",children:__T("Kategori yok")}):e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"yo-tools",children:[e.jsxs("button",{type:"button",onClick:()=>degis(null,"kat",[...ks]),children:[I("done_all"),__T("Tümü")]}),fin.length?e.jsx("button",{type:"button",onClick:()=>degis(null,"kat",[...fin]),children:"🏆 "+__T("Sadece finaller")}):null,e.jsxs("button",{type:"button",onClick:()=>degis(null,"kat",[]),children:[I("backspace"),__T("Temizle")]}),e.jsx("span",{className:"cnt",children:tk.length?tk.length+"/"+ks.length+" "+__T("seçili"):__T("Tümü yayında")})]}),
    fin.length?e.jsxs("div",{children:[e.jsx("div",{className:"yo-cgh",children:"🏆 "+__T("Finaller")}),e.jsx("div",{className:"yo-cats",children:fin.map(chip)})]}):null,
    dig.length?e.jsxs("div",{children:[e.jsx("div",{className:"yo-cgh",children:fin.length?__T("Elemeler"):__T("Kategoriler")}),e.jsx("div",{className:"yo-cats",children:dig.map(chip)})]}):null]}),
   e.jsx("p",{className:"yo-note",children:__T("Birden fazla alan aynı anda yarışıyorsa her alan/kanal için ayrı profil açıp yalnızca o alanın kategorilerini seçin.")})]}):null,
  sekme==="logo"?e.jsxs("div",{className:"yo-list",children:[
   e.jsx(Tog,{v:T.logo.etkinlik,on:v=>degis("logo","etkinlik",v),t:__T("Etkinlik logosu"),d:evLogo?__T("Yarışma kaydındaki logo (ör. Balkan Cimnastik Birliği)"):__T("Bu yarışmada etkinlik logosu yok — Yarışmalar → Düzenle'den ekleyin")}),
   evLogo&&T.logo.etkinlik?e.jsx("img",{src:evLogo,alt:"",className:"yo-thumb"}):null,
   e.jsx(Tog,{v:T.logo.tcf,on:v=>degis("logo","tcf",v),t:__T("TCF logosu")}),
   e.jsx(Tog,{v:T.logo.gymexa,on:v=>degis("logo","gymexa",v),t:"Gymexa Score"}),
   e.jsxs("div",{className:"yo-ek",children:[e.jsxs("div",{children:[e.jsx("b",{children:__T("Ek logo (TV kanalı / sponsor)")}),e.jsx("small",{children:__T("Yalnız bu profilde görünür. PNG/JPG/SVG — otomatik küçültülür.")})]}),
    T.logo.ek?e.jsx("img",{src:T.logo.ek,alt:"",className:"yo-thumb"}):null,
    e.jsxs("label",{className:"yo-btn g",style:{cursor:"pointer"},children:[I("upload"),T.logo.ek?__T("Değiştir"):__T("Logo yükle"),e.jsx("input",{type:"file",accept:"image/png,image/jpeg,image/svg+xml,image/webp",style:{display:"none"},onChange:async ev=>{const fl=ev.target.files&&ev.target.files[0];ev.target.value="";if(!fl)return;try{degis("logo","ek",await resimOku(fl))}catch{toast(__T("Logo okunamadı."),"error")}}})]}),
    T.logo.ek?e.jsxs("button",{type:"button",className:"yo-mini",onClick:()=>degis("logo","ek",null),children:[I("delete"),__T("Kaldır")]}):null]}),
   e.jsx(Alan,{t:__T("Köşe logosu"),a:__T("· seçili logolar ekranda sürekli durur"),children:e.jsx(Seg,{v:T.logo.kose||"yok",on:v=>degis("logo","kose",v),ops:[["yok",__T("Yok")],["sag-ust",__T("Sağ üst")],["sol-ust",__T("Sol üst")],["sag-alt",__T("Sağ alt")],["sol-alt",__T("Sol alt")]]})}),
   e.jsx("p",{className:"yo-note",children:__T("Seçili logolar alt bantta, sıralama ve podyum başlığında görünür. Hepsini kapatırsanız grafikler logosuz çıkar.")})]}):null,
  sekme==="alt"?e.jsxs("div",{className:"yo-list",children:[
   e.jsx(Tog,{v:T.alt.acik,on:v=>degis("alt","acik",v),t:__T("Alt bant açık"),d:__T("Çağrılan sporcunun adı ve yayınlanan puan kartı")}),
   T.alt.acik?e.jsxs(e.Fragment,{children:[
    e.jsxs("div",{className:"yo-row",children:[e.jsx(Tog,{v:T.alt.isim,on:v=>degis("alt","isim",v),t:__T("İsim bandı")}),e.jsx(Tog,{v:T.alt.puan,on:v=>degis("alt","puan",v),t:__T("Puan kartı")})]}),
    e.jsx(Alan,{t:__T("Konum"),children:e.jsx(Pos,{v:T.alt.konum,on:v=>degis("alt","konum",v),ops:[["alt-sol",__T("Alt sol")],["alt-orta",__T("Alt orta")],["alt-sag",__T("Alt sağ")],["ust-sol",__T("Üst sol")]]})}),
    e.jsxs("div",{className:"yo-row",children:[e.jsx(Alan,{t:__T("Puan süresi (sn)"),children:e.jsx(Num,{v:T.alt.sure,mn:3,mx:120,on:v=>degis("alt","sure",v)})}),e.jsx(Alan,{t:__T("İsim süresi"),a:__T("· 0 = sürekli"),children:e.jsx(Num,{v:T.alt.isimSure,mn:0,mx:600,on:v=>degis("alt","isimSure",v)})})]}),
    e.jsx("label",{className:"yo-f",children:__T("Gösterilecek bilgiler")}),
    e.jsxs("div",{className:"yo-row",children:[e.jsx(Tog,{v:T.alt.kulup,on:v=>degis("alt","kulup",v),t:__T("Kulüp / il")}),e.jsx(Tog,{v:T.alt.ulke,on:v=>degis("alt","ulke",v),t:__T("Ülke + bayrak")})]}),
    e.jsxs("div",{className:"yo-row",children:[e.jsx(Tog,{v:T.alt.bib,on:v=>degis("alt","bib",v),t:__T("Göğüs no (BIB)")}),e.jsx(Tog,{v:T.alt.detay,on:v=>degis("alt","detay",v),t:__T("Not detayları"),d:br==="ritmik"?"DB · DA · A · E":br==="artistik"?"D · E":"E · A · D"})]}),
    e.jsx(Tog,{v:T.alt.foto!==!1,on:v=>degis("alt","foto",v),t:__T("Sporcu fotoğrafı"),d:__T("Yüklenmiş fotoğraf varsa isim ve puan kartının solunda")}),
    e.jsx(Tog,{v:T.alt.sira,on:v=>degis("alt","sira",v),t:__T("Anlık sıra")})]}):null]}):null,
  sekme==="tablo"?e.jsxs("div",{className:"yo-list",children:[
   e.jsx(Tog,{v:T.tablo.acik,on:v=>degis("tablo","acik",v),t:__T("Anlık sıralama tablosu"),d:__T("Güncel kategorinin sıralaması; yeni puanla güncellenir, son puan alan vurgulanır")}),
   T.tablo.acik?e.jsxs(e.Fragment,{children:[
    e.jsx(Alan,{t:__T("Ne zaman"),children:e.jsx(Seg,{v:T.tablo.mod,on:v=>degis("tablo","mod",v),ops:[["puan",__T("Puan kartından sonra")],["surekli",__T("Sürekli")],["elle",__T("Yalnız elle")]]})}),
    e.jsx(Alan,{t:__T("Konum"),children:e.jsx(Pos,{v:T.tablo.konum,on:v=>degis("tablo","konum",v),ops:[["sag",__T("Sağ panel")],["sol",__T("Sol panel")],["orta",__T("Ortada büyük")]]})}),
    e.jsxs("div",{className:"yo-row",children:[e.jsx(Alan,{t:__T("Satır sayısı"),children:e.jsx(Num,{v:T.tablo.n,mn:3,mx:20,on:v=>degis("tablo","n",v)})}),T.tablo.mod==="puan"?e.jsx(Alan,{t:__T("Gösterim süresi (sn)"),children:e.jsx(Num,{v:T.tablo.sure,mn:3,mx:120,on:v=>degis("tablo","sure",v)})}):e.jsx("div",{})]}),
    br==="ritmik"||br==="artistik"?e.jsx(Alan,{t:__T("Sıralama türü"),children:e.jsx(Seg,{v:T.tablo.tur,on:v=>degis("tablo","tur",v),ops:[["genel",__T("Aletler sırayla + genel tasnif")],["alet",__T("Son aletin sıralaması")]]})}):null,
    (br==="ritmik"||br==="artistik")&&T.tablo.tur!=="alet"?e.jsx(Alan,{t:__T("Alet dönüş süresi (sn)"),a:__T("· çok aletli kategoride her alet bu süre görünür, sonra genel tasnif"),children:e.jsx(Num,{v:T.tablo.donguSure??10,mn:4,mx:60,on:v=>degis("tablo","donguSure",v)})}):null,
    T.tablo.konum==="orta"?e.jsx(Tog,{v:T.tablo.detay!==!1,on:v=>degis("tablo","detay",v),t:__T("Not sütunları"),d:br==="ritmik"?"DB · DA · A · E · "+__T("Ceza"):br==="artistik"?"D · E · "+__T("Kesinti"):"D · A · E · "+__T("Ceza")}):null,
    e.jsx("p",{className:"yo-note",children:__T("Eşitlikte WG kuralı: E, sonra A, sonra D notu yüksek olan önde. Kategori tamamlanınca başlık \"Sonuçlar\" olur ve ilk üç madalya rengiyle gösterilir.")})]}):null]}):null,
  sekme==="sirada"?e.jsxs("div",{className:"yo-list",children:[
   e.jsx(Tog,{v:T.sirada.acik,on:v=>degis("sirada","acik",v),t:__T("Sıradaki sporcular"),d:__T("Çıkış sırasına göre çağrılan sporcu ve sonraki sporcular")}),
   T.sirada.acik?e.jsxs(e.Fragment,{children:[
    e.jsx(Alan,{t:__T("Ne zaman"),children:e.jsx(Seg,{v:T.sirada.mod,on:v=>degis("sirada","mod",v),ops:[["cagri",__T("Sporcu çağrılınca")],["surekli",__T("Sürekli")],["elle",__T("Yalnız elle")]]})}),
    e.jsx(Alan,{t:__T("Konum"),children:e.jsx(Pos,{v:T.sirada.konum,on:v=>degis("sirada","konum",v),ops:[["sag-ust",__T("Sağ üst")],["sol-ust",__T("Sol üst")],["sag-alt",__T("Sağ alt")]]})}),
    e.jsx(Alan,{t:__T("Kaç sporcu"),children:e.jsx(Num,{v:T.sirada.n,mn:1,mx:8,on:v=>degis("sirada","n",v)})})]}):null]}):null,
  sekme==="podyum"?e.jsxs("div",{className:"yo-list",children:[
   e.jsx(Tog,{v:T.podyum.acik,on:v=>degis("podyum","acik",v),t:__T("Podyum / final sonuçları"),d:__T("İlk üç madalya renkleriyle; isterseniz ilk 8")}),
   T.podyum.acik?e.jsxs(e.Fragment,{children:[
    e.jsx(Alan,{t:__T("Ne zaman"),children:e.jsx(Seg,{v:T.podyum.mod,on:v=>degis("podyum","mod",v),ops:[["otomatik",__T("Kategori bitince otomatik")],["elle",__T("Yalnız elle")]]})}),
    e.jsxs("div",{className:"yo-row",children:[e.jsx(Alan,{t:__T("Gösterilecek"),children:e.jsx(Seg,{v:String(T.podyum.n),on:v=>degis("podyum","n",+v),ops:[["3",__T("İlk 3")],["5",__T("İlk 5")],["8",__T("İlk 8")]]})}),T.podyum.mod==="otomatik"?e.jsx(Alan,{t:__T("Gösterim süresi (sn)"),children:e.jsx(Num,{v:T.podyum.sure,mn:5,mx:180,on:v=>degis("podyum","sure",v)})}):e.jsx("div",{})]})]}):null]}):null,
  e.jsxs("div",{className:"yo-save",children:[e.jsx("span",{className:"yo-note",style:{margin:0},children:kirli?__T("Kaydedince bu profili kullanan kanallarda anında uygulanır."):__T("Değişiklik yok.")}),
   e.jsx("button",{type:"button",className:"yo-btn g",disabled:!kirli,onClick:()=>setTas(kayitli),children:__T("Geri al")}),
   e.jsxs("button",{type:"button",className:"yo-btn",disabled:!kirli,onClick:kaydet,children:[I("save"),__T("Kaydet")]})]})]}):null;

 // TV veri linki: kısa kodlu tv.gymexascore.net adresi — kanal kaynağı (sistem/veritabanı/yarışma kimliği) görmez
 const tvK=P.tvKod||"",tvQ=[veri!=="hepsi"?"veri="+veri:"",fmt!=="json"?"format="+fmt:""].filter(Boolean).join("&"),tvUrl=tvK?`https://tv.gymexascore.net/${tvK}${tvQ?"?"+tvQ:""}`:"";
 const tvOlustur=async()=>{if(tvK&&!await window.__gxConfirm(__T("Yeni TV linki oluşturulursa kanaldaki eski link çalışmaz. Devam edilsin mi?")))return;
  const k=__gsKod(),U={[`criteria/kisaLink/${k}`]:{t:"tv",b:br,c:comp,p:pid,ts:Date.now(),kim:usr}};if(tvK)U[`criteria/kisaLink/${tvK}/iptal`]=!0;U[`${FB}/${comp}/yayinProfilleri/${pid}/tvKod`]=k;
  try{await update(ref(db),U);toast(__T("TV linki hazır"),"success")}catch{toast(__T("Hata oluştu."),"error")}};
 const durumKart=(()=>{if(!pid)return null;const p=tas||kayitli||{},kf=Array.isArray(p.kat)&&p.kat.length?p.kat:null,ic=k=>!kf||kf.includes(k)||kf.includes(String(k).replace(/^final_/,"").split("__")[0]);
  const cg=Object.entries(cagri||{}).filter(([k,v])=>ic(k)&&v&&typeof v==="object"&&(v.ad||v.soyad||v.id)),pv=Object.entries(puanVar||{}).some(([k,v])=>v&&ic(k)),ad=v=>[v.ad,v.soyad].filter(Boolean).join(" ");
  const md=(m,el)=>m==="elle"?__T("yalnız Canlı kontrol'den açılınca"):m==="surekli"?__T("sürekli"):el;
  const L=[];
  if(P.kapali)L.push(["block",__T("Profil YAYIN DIŞI — linkte hiçbir şey görünmez."),!1]);
  L.push(["subtitles",p.alt?.acik===!1?__T("Alt bant kapalı."):cg.length?__T("Alt bant: çağrılı sporcu var")+" ("+cg.slice(0,2).map(([,v])=>ad(v)).join(", ")+") — "+__T("görünür."):__T("Alt bant: şu an çağrılmış sporcu yok — başhakem sporcuyu çağırınca çıkar."),p.alt?.acik!==!1&&cg.length>0]);
  L.push(["leaderboard",!p.tablo?.acik?__T("Sıralama tablosu kapalı."):__T("Sıralama tablosu")+": "+md(p.tablo?.mod,pv?__T("puan yayınlanınca görünür."):__T("henüz puan yok — ilk puan yayınlanınca görünür.")),!!p.tablo?.acik&&(p.tablo?.mod==="surekli"||pv)]);
  L.push(["queue_play_next",!p.sirada?.acik?__T("Sıradaki kapalı."):__T("Sıradaki")+": "+md(p.sirada?.mod,cg.length?__T("çağrı varken görünür."):__T("çağrı olunca görünür.")),!!p.sirada?.acik&&(p.sirada?.mod==="surekli"||p.sirada?.mod!=="elle"&&cg.length>0)]);
  L.push(["emoji_events",!p.podyum?.acik?__T("Podyum kapalı."):__T("Podyum")+": "+md(p.podyum?.mod,__T("kategori tamamlanınca görünür.")),!1]);
  const bos=!L.some(x=>x[2]);
  return e.jsxs("div",{className:"gxp-card",children:[e.jsx(Bas,{ic:"visibility",renk:bos?"#DC2626":"#16A34A",t:__T("Linkte şu an ne görünür?")}),
   bos?e.jsx("p",{className:"yo-note",style:{marginTop:0,color:"#B91C1C",fontWeight:700},children:__T("Şu an gösterilecek bir şey yok; link boş (şeffaf) görünür. Bu normaldir — sporcu çağrılınca ya da puan yayınlanınca grafikler kendiliğinden gelir. Hemen görmek için aşağıdaki Canlı kontrol'den Sıralama / Sıradaki / Podyum açabilirsiniz.")}):null,
   e.jsx("div",{style:{display:"grid",gap:6},children:L.map(([i,t,on],x)=>e.jsxs("div",{style:{display:"flex",alignItems:"flex-start",gap:8,fontSize:13,fontWeight:600,color:on?"#166534":"#475569"},children:[e.jsx("i",{className:"material-icons-round",style:{fontSize:18,color:on?"#16A34A":"#94A3B8"},children:i}),e.jsx("span",{children:t})]},x))})]})})();
 const linkler=pid?e.jsxs("div",{className:"gxp-card",children:[e.jsx(Bas,{ic:"link",renk:"#DB2777",t:__T("Kanala verilecek linkler")}),
  e.jsxs("label",{className:"yo-f",style:{marginTop:0},children:[__T("Overlay linki")," ",e.jsx("span",{children:__T("· OBS / vMix / Tricaster tarayıcı kaynağı, 1920×1080, şeffaf")})]}),
  e.jsx("div",{className:"yo-url",children:ovUrl}),
  e.jsxs("div",{className:"yo-btns",children:[e.jsxs("button",{type:"button",className:"yo-btn",onClick:()=>kopyala(ovUrl),children:[I("content_copy"),__T("Kopyala")]}),e.jsxs("button",{type:"button",className:"yo-btn g",onClick:()=>window.open(ovUrl,"_blank"),children:[I("open_in_new"),__T("Aç")]})]}),
  e.jsxs("label",{className:"yo-f",children:[__T("TV veri linki")," ",e.jsx("span",{children:__T("· kanalın kendi grafik sistemi için (vMix Data Source, CasparCG, Vizrt, Ross)")})]}),
  e.jsxs("div",{className:"yo-row",style:{marginBottom:8},children:[e.jsx("select",{className:"yo-sel",value:veri,onChange:ev=>setVeri(ev.target.value),children:[["hepsi",__T("Hepsi (tek paket)")],["canli",__T("Çağrılan sporcu")],["son",__T("Son yayınlanan puan")],["siralama",__T("Anlık sıralama")],["sirada",__T("Sıradaki sporcular")],["podyum",__T("Podyum")]].map(([k,t])=>e.jsx("option",{value:k,children:t},k))}),
   e.jsx(Seg,{v:fmt,on:setFmt,ops:[["json","JSON"],["xml","XML"],["csv","CSV"]]})]}),
  tvK?e.jsx("div",{className:"yo-url",children:tvUrl}):e.jsx("div",{className:"yo-url",style:{fontFamily:"inherit",color:"#64748B"},children:__T("Bu profil için henüz TV linki yok. Kanal yalnız tv.gymexascore.net/<kod> adresini görür; sistem ve veri kaynağı görünmez.")}),
  e.jsxs("div",{className:"yo-btns",children:[tvK?e.jsxs("button",{type:"button",className:"yo-btn",onClick:()=>kopyala(tvUrl),children:[I("content_copy"),__T("Kopyala")]}):null,
   tvK?e.jsxs("a",{href:tvUrl,target:"_blank",rel:"noopener noreferrer",className:"yo-btn g",style:{textDecoration:"none"},children:[I("open_in_new"),__T("Veriyi gör")]}):null,
   e.jsxs("button",{type:"button",className:"yo-btn"+(tvK?" g":""),onClick:tvOlustur,children:[I(tvK?"autorenew":"add_link"),tvK?__T("Yeni link"):__T("TV linki oluştur")]}),ok?e.jsx("span",{className:"yo-ok",children:ok}):null]}),
  e.jsx("p",{className:"yo-note",children:__T("Veri linki profilin kategori filtresine, diline ve satır sayısına uyar; 1–2 saniyede bir okunabilir. Alanlar: name, club, noc, flag, bib, total, d/da/db, a, e, pen, rank. Logolar logos alanında görsel linki olarak gelir.")})]}):null;

 const canli=pid?e.jsxs("div",{className:"gxp-card",children:[e.jsx(Bas,{ic:"settings_remote",renk:"#EA580C",t:__T("Canlı kontrol"),sag:P.kapali?e.jsx("span",{className:"yo-kirli",children:__T("YAYIN DIŞI")}):kAktif?e.jsx("span",{className:"yo-live",children:durumG[kc.g]||kc.g}):__T("Otomatik")}),
  e.jsx("p",{className:"yo-note",style:{marginTop:0},children:__T("Bu düğmeler kaydetmeden, bu profili kullanan kanallarda anında uygulanır.")}),
  e.jsxs("div",{className:"yo-row",children:[e.jsx(Alan,{t:__T("Kategori"),children:e.jsxs("select",{className:"yo-sel",value:kKat,onChange:ev=>setKKat(ev.target.value),children:[e.jsx("option",{value:"",children:__T("Güncel (otomatik)")}),ks.map(k=>e.jsx("option",{value:k,children:katAdi(k)},k))]})}),
   e.jsx(Alan,{t:__T("Süre (sn)"),a:__T("· 0 = kapatana kadar"),children:e.jsx(Num,{v:kSure,mn:0,mx:600,st:5,on:setKSure})})]}),
  e.jsxs("div",{className:"yo-ctl",children:[e.jsxs("button",{type:"button",onClick:()=>kontrol("siralama"),className:kAktif&&kc.g==="siralama"?"on":"",children:[I("leaderboard"),__T("Sıralamayı göster")]}),
   e.jsxs("button",{type:"button",onClick:()=>kontrol("sirada"),className:kAktif&&kc.g==="sirada"?"on":"",children:[I("queue"),__T("Sıradakileri göster")]}),
   e.jsxs("button",{type:"button",onClick:()=>kontrol("podyum"),className:kAktif&&kc.g==="podyum"?"on":"",children:[I("emoji_events"),__T("Podyumu göster")]}),
   e.jsxs("button",{type:"button",onClick:()=>kontrol("liste"),className:kAktif&&kc.g==="liste"?"on":"",title:__T("Kategorinin sporcuları çıkış sırasıyla 12'şerli sayfalar hâlinde döner; Elle gösterimi bitir diyene kadar sürer."),children:[I("format_list_numbered"),__T("Başlangıç listesi (döngü)")]}),
   e.jsxs("button",{type:"button",onClick:()=>kontrol("alt-gizle"),className:kAktif&&kc.g==="alt-gizle"?"on":"",children:[I("subtitles_off"),__T("Alt bandı gizle")]}),
   e.jsxs("button",{type:"button",className:"gz",onClick:()=>kontrol("gizle"),disabled:!kAktif,children:[I("close"),__T("Elle gösterimi bitir")]})]}),
  e.jsxs("div",{className:"yo-btns",children:[P.kapali?e.jsxs("button",{type:"button",className:"yo-btn",onClick:()=>kapat(!1),children:[I("play_arrow"),__T("Yayına geri al")]}):e.jsxs("button",{type:"button",className:"yo-btn kr",onClick:()=>kapat(!0),children:[I("block"),__T("Yayın dışı (tümünü gizle)")]}),ok?e.jsx("span",{className:"yo-ok",children:ok}):null]})]}):null;

 return e.jsxs("div",{className:"gxp",style:{"--gxp-c":renk},children:[e.jsx("style",{children:CSS}),
  e.jsxs("div",{className:"gxp-hdr",children:[e.jsx("button",{type:"button",className:"gxp-back",onClick:()=>nav(RP||"/"),title:__T("Geri"),children:I("arrow_back")}),e.jsx("div",{className:"gxp-ic",children:I("live_tv")}),e.jsxs("div",{className:"gxp-tt",children:[e.jsx("h1",{children:__T("Yayın Overlay")}),e.jsx("p",{children:__T("TV ve internet yayını için grafikler, kanal profilleri ve canlı veri linki")})]}),
   e.jsx("div",{className:"gxp-sel",children:e.jsxs("select",{value:comp,onChange:async ev=>{const v=ev.target.value;if(kirli&&!await window.__gxConfirm(__T("Kaydedilmemiş değişiklikler kaybolacak. Devam edilsin mi?")))return;setComp(v)},children:[e.jsx("option",{value:"",children:comps===null?__T("Yükleniyor…"):__T("— Yarışma seçin —")}),list.map(x=>e.jsx("option",{value:x.k,children:x.ad},x.k))]})})]}),
  !comp?e.jsx("div",{className:"gxp-card",children:e.jsxs("div",{className:"gxp-empty",children:[I("live_tv"),__T("Önce yarışma seçin.")]})}):
  e.jsxs("div",{className:"yo-grid",children:[e.jsxs("div",{className:"yo-col",children:[
   e.jsxs("div",{className:"gxp-card",children:[e.jsx(Bas,{ic:"tv",renk:"#2563EB",t:__T("Yayın profilleri"),sag:plist.length?String(plist.length):null}),
    plist.length?e.jsx("div",{className:"yo-profs",children:plist.map(p=>e.jsxs("button",{type:"button",className:"yo-prof"+(p.k===pid?" on":""),onClick:()=>sec(p.k),children:[I(profs[p.k]?.kapali?"tv_off":"tv"),e.jsx("span",{children:p.ad}),profs[p.k]?.kapali?e.jsx("small",{children:__T("yayın dışı")}):null]},p.k))}):
     e.jsx("p",{className:"yo-note",style:{marginTop:0},children:__T("Her kanal ya da ekran için ayrı profil oluşturun (ör. TRT Spor, YouTube, Salon ekranı). Her profilin kendi logoları, grafikleri ve linki olur.")}),
    e.jsxs("div",{className:"yo-btns",children:[e.jsxs("button",{type:"button",className:"yo-btn",onClick:()=>yeni(!1),children:[I("add"),__T("Yeni profil")]}),e.jsxs("button",{type:"button",className:"yo-btn g"+(kpAc?" on":""),onClick:()=>setKpAc(v=>!v),children:[I("move_down"),__T("Başka yarışmadan")]}),pid?e.jsxs(e.Fragment,{children:[e.jsxs("button",{type:"button",className:"yo-btn g",onClick:()=>yeni(!0),children:[I("content_copy"),__T("Kopyala")]}),e.jsxs("button",{type:"button",className:"yo-btn g",onClick:adDegis,children:[I("edit"),__T("Adını değiştir")]}),e.jsxs("button",{type:"button",className:"yo-btn g kr",onClick:sil,children:[I("delete"),__T("Sil")]})]}):null]}),
    kpAc?e.jsxs("div",{className:"yo-kp",children:[e.jsx("b",{children:__T("Başka yarışmadan profil kopyala")}),
     !kaynaklar.length?e.jsx("p",{className:"yo-note",style:{margin:0},children:__T("Profili olan başka yarışma yok.")}):e.jsxs(e.Fragment,{children:[
      e.jsxs("select",{className:"yo-sel",value:kpKay,onChange:ev=>setKpKay(ev.target.value),children:[e.jsx("option",{value:"",children:__T("— Kaynak yarışma seçin —")}),kaynaklar.map(x=>e.jsx("option",{value:x.k,children:x.ad+" ("+Object.keys(comps[x.k].yayinProfilleri).length+")"},x.k))]}),
      kpProfs.length?e.jsx("div",{className:"yo-cats",children:kpProfs.map(x=>e.jsxs("label",{className:"yo-cat"+(kpSec.includes(x.k)?" on":""),children:[e.jsx("input",{type:"checkbox",checked:kpSec.includes(x.k),onChange:()=>setKpSec(s=>s.includes(x.k)?s.filter(y=>y!==x.k):[...s,x.k])}),x.ad]},x.k))}):null,
      kpKay?e.jsxs("div",{className:"yo-btns",style:{marginTop:0},children:[e.jsxs("button",{type:"button",className:"yo-btn",disabled:!kpSec.length,onClick:kopyalaDis,children:[I("content_copy"),__T("Kopyala")+" ("+kpSec.length+")"]}),e.jsx("button",{type:"button",className:"yo-btn g",onClick:()=>setKpAc(!1),children:__T("İptal")})]}):null,
      e.jsx("p",{className:"yo-note",style:{margin:0},children:__T("Logolar, grafikler ve tüm ayarlar kopyalanır; yeni yarışma için yeni link oluşur. Kategori filtresinde yalnız bu yarışmada da olan kategoriler kalır. Etkinlik logosu yarışmanın kendi logosudur.")})]})]}):null,
    e.jsx("p",{className:"yo-note",children:__T("Daha önce verilmiş profilsiz overlay linkleri aynen çalışmaya devam eder.")})]}),
   editor]}),
  e.jsxs("div",{className:"yo-col",children:[
   e.jsxs("div",{className:"gxp-card",children:[e.jsx(Bas,{ic:"visibility",renk:"#0EA5E9",t:__T("Önizleme"),sag:__T("örnek veriyle")}),
    e.jsx("div",{className:"yo-prev",children:e.jsx("iframe",{ref:frame,src:prev,title:__T("önizleme"),onLoad:gonder})}),
    e.jsx("div",{className:"yo-tools",style:{marginTop:10},children:[["oto",__T("Döngü")],["isim",__T("İsim")],["puan",__T("Puan")],["tablo",__T("Sıralama")],["sirada",__T("Sıradaki")],["podyum",__T("Podyum")]].map(([k,t])=>e.jsx("button",{type:"button",className:pvG===k?"on":"",onClick:()=>pvGoster(k),children:t},k))}),
    e.jsx("p",{className:"yo-note",children:pid?__T("Önizleme kaydedilmemiş değişiklikleri de gösterir."):__T("Varsayılan görünüm. Profil seçince profilin ayarlarıyla gösterilir.")})]}),
   durumKart,linkler,canli]})]})]})}
