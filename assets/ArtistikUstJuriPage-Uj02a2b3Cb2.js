import"./i18n-Tr01a2b3Cb2.js";import{u as useAuth,b as usToast,j as e,d as db}from"./main-C2LpyYUGCb2.js";import{u as useNav,r as R}from"./vendor-react-Cxw6bqwhCb2.js";import{k as ref,o as onValue,v as set}from"./vendor-firebase-940mxgRVCb2.js";import{f as filterComps}from"./useFilteredCompetitions-B7FB6qIvCb2.js";import{GXP_CSS,aletSirala}from"./ArtistikNotSilmePage-Ns01a2b3Cb2.js";import"./modulepreload-polyfill-B5Qt9EMXCb2.js";

// ARTİSTİK — ÜST JÜRİ PANELİ (eski /ustjuri.html'in uygulama içi sürümü)
//  competitions/<yarışma>/board/<kat>/<alet>            : {state, athId, athName, athClub, ustJuriKilit}
//  competitions/<yarışma>/puanlar/<kat>/<alet>/<sporcu> : {dScore, e1..e4, finalScore|sonuc}
//  MÜDAHALE ET → board/.../ustJuriKilit = true (alet paneli kilitlenir), DEVAM ET → null
const FB="competitions";
const ALET={yer:{tr:"Yer",en:"FX",c:"#d97706"},atlama:{tr:"Atlama",en:"VT",c:"#dc2626"},asimetrik:{tr:"Asimetrik",en:"UB",c:"#db2777"},denge:{tr:"Denge",en:"BB",c:"#9333ea"},barfiks:{tr:"Barfiks",en:"HB",c:"#0284c7"},paralel:{tr:"Paralel",en:"PB",c:"#4f46e5"},halka:{tr:"Halka",en:"SR",c:"#ea580c"},kulplu:{tr:"Kulplu",en:"PH",c:"#16a34a"},mantar:{tr:"Mantar",en:"MB",c:"#16a34a"}};
const DURUM={go:["SERİ","go"],fall:["DÜŞME","fall"],finishing:["NOT GİRİŞİ","fin"],scored:["PUANLANDI","ok"],wait:["BEKLEMEDE","wait"],idle:["—","idle"]};
const UYARI=.3,KOTU=.5;
const CSS=GXP_CSS+`
.uj-grid{display:grid;gap:14px;grid-template-columns:repeat(var(--uj-n,4),minmax(0,1fr))}
@media(max-width:1180px){.uj-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:640px){.uj-grid{grid-template-columns:1fr}}
.uj-p{background:#fff;border-radius:16px;box-shadow:var(--shadow-sm,0 1px 3px rgba(0,0,0,.06));border:2px solid transparent;display:flex;flex-direction:column;overflow:hidden;transition:border-color .2s,box-shadow .2s}
.uj-p.lock{border-color:#DC2626;box-shadow:0 8px 28px -10px rgba(220,38,38,.45)}
.uj-h{display:flex;align-items:center;gap:8px;padding:12px 14px;border-bottom:1px solid #F1F5F9;background:linear-gradient(90deg,color-mix(in srgb,var(--ac) 12%,#fff),#fff)}
.uj-ab{font-size:.72rem;font-weight:800;color:#fff;background:var(--ac);padding:3px 8px;border-radius:6px;letter-spacing:.06em}.uj-an{font-weight:800;font-size:1.05rem;text-transform:uppercase;letter-spacing:.02em}
.uj-st{margin-left:auto;font-size:.68rem;font-weight:800;letter-spacing:.05em;padding:4px 9px;border-radius:999px;background:#F1F5F9;color:#64748B}
.uj-st.go{background:#DBEAFE;color:#1D4ED8}.uj-st.fall{background:#FEE2E2;color:#B91C1C}.uj-st.fin{background:#FEF3C7;color:#92400E}.uj-st.ok{background:#DCFCE7;color:#166534}.uj-st.wait{background:#EEF2FF;color:#4338CA}
.uj-b{padding:12px 14px;display:flex;flex-direction:column;gap:10px;flex:1}
.uj-lk{display:none;align-items:center;justify-content:center;gap:6px;background:#DC2626;color:#fff;font-weight:800;font-size:.75rem;letter-spacing:.06em;padding:6px;border-radius:10px;animation:gxpPulse 1.6s infinite}.uj-p.lock .uj-lk{display:flex}.uj-lk i{font-size:16px}
.uj-at{min-height:46px}.uj-at b{display:block;font-weight:800;font-size:1.08rem;text-transform:uppercase;line-height:1.15}.uj-at span{display:block;font-size:.78rem;font-weight:700;color:#64748B;margin-top:2px;text-transform:uppercase}.uj-at em{font-style:normal;color:#94A3B8;font-weight:700;font-size:.9rem}
.uj-d{display:flex;align-items:center;justify-content:space-between;background:#F8FAFC;border-radius:10px;padding:8px 12px}.uj-d small{font-size:.7rem;font-weight:800;color:#64748B;letter-spacing:.06em}.uj-d b{font-size:1.25rem;font-weight:800;font-variant-numeric:tabular-nums}
.uj-et{font-size:.7rem;font-weight:800;color:#64748B;letter-spacing:.06em;margin-bottom:6px}
.uj-es{display:grid;grid-template-columns:repeat(4,1fr);gap:6px}
.uj-e{display:flex;flex-direction:column;align-items:center;padding:6px 2px;border-radius:10px;background:#F8FAFC;border:1.5px solid #EEF0F4}.uj-e small{font-size:.62rem;font-weight:800;color:#94A3B8}.uj-e b{font-size:1rem;font-weight:800;font-variant-numeric:tabular-nums}
.uj-e.hi{background:#FEF2F2;border-color:#FCA5A5}.uj-e.hi b{color:#B91C1C}.uj-e.lo{background:#EFF6FF;border-color:#93C5FD}.uj-e.lo b{color:#1D4ED8}.uj-e.bos b{color:#CBD5E1}
.uj-sp{display:flex;align-items:center;justify-content:space-between;border-radius:10px;padding:7px 12px;font-weight:800;font-size:.8rem;letter-spacing:.04em;background:#F0FDF4;color:#166534}.uj-sp b{font-size:1rem;font-variant-numeric:tabular-nums}
.uj-sp.warn{background:#FFFBEB;color:#92400E}.uj-sp.bad{background:#FEF2F2;color:#B91C1C;animation:gxpPulse 1.6s infinite}
.uj-t{display:flex;align-items:baseline;justify-content:space-between;border-top:1px dashed #E2E8F0;padding-top:10px}.uj-t small{font-size:.72rem;font-weight:800;color:#64748B;letter-spacing:.06em}.uj-t b{font-size:1.6rem;font-weight:800;color:#4F46E5;font-variant-numeric:tabular-nums}
.uj-f{padding:0 14px 14px}.uj-btn{width:100%;display:flex;align-items:center;justify-content:center;gap:8px;border:none;border-radius:12px;padding:12px;font:inherit;font-weight:800;font-size:.9rem;letter-spacing:.04em;cursor:pointer;background:#FFF7ED;color:#C2410C;border:1.5px solid #FDBA74}.uj-btn:hover{background:#FFEDD5}
.uj-btn.on{background:#16A34A;color:#fff;border-color:#16A34A}.uj-btn.on:hover{background:#15803D}.uj-btn i{font-size:20px}.uj-btn:disabled{opacity:.6;cursor:default}`;

function Panel({comp,cat,alet}){
 const{toast}=usToast(),[b,setB]=R.useState({}),[sc,setSc]=R.useState({}),[busy,setBusy]=R.useState(!1),A=ALET[alet]||{tr:alet,en:String(alet).slice(0,2).toUpperCase(),c:"#64748B"};
 R.useEffect(()=>onValue(ref(db,`${FB}/${comp}/board/${cat}/${alet}`),s=>setB(s.val()||{})),[comp,cat,alet]);
 const ath=b.athId||"";
 R.useEffect(()=>{setSc({});if(!ath)return;return onValue(ref(db,`${FB}/${comp}/puanlar/${cat}/${alet}/${ath}`),s=>setSc(s.val()||{}))},[comp,cat,alet,ath]);
 const lk=!!b.ustJuriKilit,st=DURUM[b.state||"idle"]||[String(b.state||"").toUpperCase(),"idle"];
 const es=[1,2,3,4].map(i=>sc["e"+i]),vals=es.filter(v=>v!=null).map(Number),mx=vals.length?Math.max(...vals):null,mn=vals.length?Math.min(...vals):null,sp=vals.length>=2?+(mx-mn).toFixed(2):null;
 const fin=sc.finalScore??sc.sonuc;
 const tog=async()=>{setBusy(!0);try{await set(ref(db,`${FB}/${comp}/board/${cat}/${alet}/ustJuriKilit`),lk?null:!0)}catch(err){toast(__T("İşlem başarısız")+": "+(err?.message||err),"error")}setBusy(!1)};
 return e.jsxs("div",{className:"uj-p"+(lk?" lock":""),style:{"--ac":A.c},children:[e.jsxs("div",{className:"uj-h",children:[e.jsx("span",{className:"uj-ab",children:A.en}),e.jsx("span",{className:"uj-an",children:A.tr}),e.jsx("span",{className:"uj-st "+st[1],children:__T(st[0])})]}),
  e.jsxs("div",{className:"uj-b",children:[e.jsxs("div",{className:"uj-lk",children:[e.jsx("i",{className:"material-icons-round",children:"lock"}),__T("ÜST JÜRİ KONTROLÜNDE")]}),
   e.jsx("div",{className:"uj-at",children:ath?e.jsxs(e.Fragment,{children:[e.jsx("b",{children:b.athName||__T("Sporcu")}),b.athClub||b.kulup?e.jsx("span",{children:b.athClub||b.kulup}):null]}):e.jsx("em",{children:__T("Sporcu bekleniyor…")})}),
   e.jsxs("div",{className:"uj-d",children:[e.jsx("small",{children:__T("D NOTU")}),e.jsx("b",{children:sc.dScore!=null?Number(sc.dScore).toFixed(2):"—"})]}),
   e.jsxs("div",{children:[e.jsx("div",{className:"uj-et",children:__T("E NOTLARI (kesinti)")}),e.jsx("div",{className:"uj-es",children:es.map((v,i)=>{const n=v==null?null:Number(v),c=n==null?"bos":mx>mn&&n===mx?"hi":mx>mn&&n===mn?"lo":"";return e.jsxs("div",{className:"uj-e "+c,children:[e.jsx("small",{children:"E"+(i+1)}),e.jsx("b",{children:n==null?"—":n.toFixed(1)})]},i)})})]}),
   e.jsxs("div",{className:"uj-sp"+(sp==null?"":sp>=KOTU?" bad":sp>=UYARI?" warn":""),children:[e.jsx("span",{children:__T("E FARKI")}),e.jsx("b",{children:sp!=null?sp.toFixed(2):vals.length?__T("tek E"):"—"})]}),
   e.jsxs("div",{className:"uj-t",children:[e.jsx("small",{children:__T("TOPLAM")}),e.jsx("b",{children:fin!=null?Number(fin).toFixed(3):"—"})]})]}),
  e.jsx("div",{className:"uj-f",children:e.jsxs("button",{type:"button",className:"uj-btn"+(lk?" on":""),disabled:busy,onClick:tog,children:[e.jsx("i",{className:"material-icons-round",children:lk?"play_arrow":"pan_tool"}),lk?__T("DEVAM ET"):__T("MÜDAHALE ET")]})})]})}

export default function ArtistikUstJuriPage(){
 const nav=useNav(),{currentUser:user}=useAuth();
 const[comps,setComps]=R.useState({}),[comp,setComp]=R.useState(""),[cat,setCat]=R.useState("");
 R.useEffect(()=>onValue(ref(db,FB),s=>setComps(filterComps(s.val()||{},user)||{})),[user]);
 const compList=R.useMemo(()=>Object.entries(comps).filter(([,c])=>c&&c.kategoriler).sort((a,b)=>String(b[1].baslangicTarihi||b[1].tarih||"").localeCompare(String(a[1].baslangicTarihi||a[1].tarih||""))),[comps]);
 const cats=comp&&comps[comp]?.kategoriler||{},aletler=cat?aletSirala(cats[cat]?.aletler):[];
 return e.jsxs("div",{className:"gxp",style:{"--gxp-c":"#DC2626",maxWidth:1500},children:[e.jsx("style",{children:CSS}),
  e.jsxs("div",{className:"gxp-hdr",children:[e.jsx("button",{type:"button",className:"gxp-back",onClick:()=>nav("/artistic"),title:__T("Geri"),children:e.jsx("i",{className:"material-icons-round",children:"arrow_back"})}),e.jsx("div",{className:"gxp-ic",children:e.jsx("i",{className:"material-icons-round",children:"gavel"})}),e.jsxs("div",{className:"gxp-tt",children:[e.jsx("h1",{children:__T("Üst Jüri Paneli")}),e.jsx("p",{children:__T("Canlı D/E notları, farklar ve müdahale")})]}),
   e.jsxs("div",{className:"gxp-sel",children:[comp&&cat?e.jsx("span",{className:"gxp-live",children:__T("CANLI")}):null,e.jsxs("select",{value:comp,onChange:ev=>{setComp(ev.target.value);setCat("")},children:[e.jsx("option",{value:"",children:__T("— Yarışma seçin —")}),compList.map(([id,c])=>e.jsx("option",{value:id,children:c.isim||c.ad||id},id))]}),
    e.jsxs("select",{value:cat,disabled:!comp,onChange:ev=>setCat(ev.target.value),children:[e.jsx("option",{value:"",children:comp?__T("— Kategori seçin —"):__T("Önce yarışma")}),Object.entries(cats).map(([k,v])=>e.jsx("option",{value:k,children:v?.name||v?.ad||k},k))]})]})]}),
  !comp||!cat?e.jsx("div",{className:"gxp-card",children:e.jsxs("div",{className:"gxp-empty",children:[e.jsx("i",{className:"material-icons-round",children:"sports_gymnastics"}),__T("Yarışma ve kategori seçin")]})}):
  e.jsx("div",{className:"uj-grid",style:{"--uj-n":aletler.length===6?3:Math.min(4,Math.max(1,aletler.length))},children:aletler.map(a=>e.jsx(Panel,{comp,cat,alet:a},comp+cat+a))})]})}
