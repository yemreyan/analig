import"./i18n-Tr01a2b3Cb2.js";import{u as useAuth,b as usToast,j as e,d as db,l as logAction}from"./main-C2LpyYUGCb2.js";import{u as useNav,r as R}from"./vendor-react-Cxw6bqwhCb2.js";import{k as ref,o as onValue,v as set,m as update,l as fbGet}from"./vendor-firebase-940mxgRVCb2.js";import{f as filterComps}from"./useFilteredCompetitions-B7FB6qIvCb2.js";import{GXP_CSS,aletSirala}from"./ArtistikNotSilmePage-Ns01a2b3Cb2.js";import{artImg,artAd}from"./ritmikAlet-Ra01a2b3Cb2.js";import{v as tokenEsit}from"./epanelToken-BoF3UjP2Cb2.js";import"./modulepreload-polyfill-B5Qt9EMXCb2.js";

// ARTİSTİK — ÜST JÜRİ PANELİ (2026-10-09 yeniden: onay akışı + link ile erişim)
//  competitions/<y>/ustJuriAyar = {acik, mod:"tek"|"alet", token} — Paneller (/artistic/panels) yönetir.
//  acik: başhakem (ScoringPage Fa) puanı kesinleştirmez → puanlar/<kat>/<alet>/<sporcu> {durum:"ustJuriBekliyor", ujPaket:{sonuc,board,lastScored,flash,ad,kulup,gonderen,ts}}
//   ONAYLA  → sonuc/finalScore/durum tamamlandi/kilitli + board (scored) + broadcast/lastScored + flashTrigger + çağrı temizlenir (ujPaket'ten)
//   GERİ GÖNDER → durum "ustJuriRed", ustJuriRed {not,ts,kim,ad}; başhakem ekranında kırmızı şerit, düzeltip yeniden kaydeder → yeniden onaya gelir.
//   Onay bekleyen / geri gönderilen not varken başhakem o alette sıradaki sporcuyu çağıramaz.
//  acik değilse başhakem onaylar; Üst Jüri MÜDAHALE ET (board/<kat>/<alet>/ustJuriKilit) ile o alette kaydı ve çağrıyı durdurur.
//  Erişim: Süper Admin ya da ?competitionId=&token=<ustJuriAyar.token>[&catId=][&aletId=] (alet varsa tek alet büyük görünüm).
const FB="competitions";
const ALET={yer:{tr:"Yer",en:"FX",c:"#d97706"},atlama:{tr:"Atlama",en:"VT",c:"#dc2626"},asimetrik:{tr:"Asimetrik",en:"UB",c:"#db2777"},denge:{tr:"Denge",en:"BB",c:"#9333ea"},barfiks:{tr:"Barfiks",en:"HB",c:"#0284c7"},paralel:{tr:"Paralel",en:"PB",c:"#4f46e5"},halka:{tr:"Halka",en:"SR",c:"#ea580c"},kulplu:{tr:"Kulplu",en:"PH",c:"#16a34a"},mantar:{tr:"Mantar",en:"MB",c:"#16a34a"}};
const DURUM={go:["SERİ","go"],fall:["DÜŞME","fall"],finishing:["NOT GİRİŞİ","fin"],scored:["PUANLANDI","ok"],wait:["BEKLEMEDE","wait"],idle:["—","idle"]};
const UYARI=.3,KOTU=.5;
const n3=v=>v==null||v===""||isNaN(Number(v))?"—":Number(v).toFixed(3),n2=v=>v==null||v===""||isNaN(Number(v))?"—":Number(v).toFixed(2);
const CSS=GXP_CSS+`
.uj-grid{display:grid;gap:14px;grid-template-columns:repeat(var(--uj-n,4),minmax(0,1fr))}
@media(max-width:1180px){.uj-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:640px){.uj-grid{grid-template-columns:1fr}}
.uj-grid.tek{grid-template-columns:minmax(0,760px);justify-content:center}
.uj-p{background:#fff;border-radius:18px;box-shadow:var(--shadow-sm,0 1px 3px rgba(0,0,0,.06));border:2px solid transparent;display:flex;flex-direction:column;overflow:hidden;transition:border-color .2s,box-shadow .2s}
.uj-p.lock{border-color:#DC2626;box-shadow:0 8px 28px -10px rgba(220,38,38,.45)}
.uj-p.bek{border-color:#D97706;box-shadow:0 10px 30px -12px rgba(217,119,6,.55)}
.uj-p.red{border-color:#DC2626}
.uj-h{display:flex;align-items:center;gap:10px;padding:10px 14px;border-bottom:1px solid #F1F5F9;background:linear-gradient(90deg,color-mix(in srgb,var(--ac) 12%,#fff),#fff)}
.uj-sym{width:44px;height:44px;border-radius:50%;background:#fff;box-shadow:0 0 0 1px #E2E8F0;display:grid;place-items:center;flex-shrink:0;overflow:hidden}.uj-sym img{width:40px;height:40px;object-fit:contain}
.uj-ab{font-size:.7rem;font-weight:800;color:#fff;background:var(--ac);padding:3px 8px;border-radius:6px;letter-spacing:.06em}.uj-an{font-weight:800;font-size:1.05rem;text-transform:uppercase;letter-spacing:.02em}
.uj-st{margin-left:auto;font-size:.68rem;font-weight:800;letter-spacing:.05em;padding:4px 9px;border-radius:999px;background:#F1F5F9;color:#64748B}
.uj-st.go{background:#EFF6FF;color:#1D4ED8}.uj-st.fall{background:#FEE2E2;color:#B91C1C}.uj-st.fin{background:#FEF3C7;color:#92400E}.uj-st.ok{background:#DCFCE7;color:#166534}.uj-st.wait{background:#EEF2FF;color:#4338CA}.uj-st.bek{background:#D97706;color:#fff;animation:gxpPulse 1.6s infinite}.uj-st.red{background:#DC2626;color:#fff}
.uj-b{padding:12px 14px;display:flex;flex-direction:column;gap:10px;flex:1}
.uj-lk{display:none;align-items:center;justify-content:center;gap:6px;background:#DC2626;color:#fff;font-weight:800;font-size:.75rem;letter-spacing:.06em;padding:6px;border-radius:10px;animation:gxpPulse 1.6s infinite}.uj-p.lock .uj-lk{display:flex}.uj-lk i{font-size:16px}
.uj-at{min-height:46px}.uj-at b{display:block;font-weight:800;font-size:1.08rem;text-transform:uppercase;line-height:1.15}.uj-at span{display:block;font-size:.78rem;font-weight:700;color:#64748B;margin-top:2px;text-transform:uppercase}.uj-at em{font-style:normal;color:#94A3B8;font-weight:700;font-size:.9rem}
.uj-row{display:grid;grid-template-columns:repeat(3,1fr);gap:6px}
.uj-d{display:flex;flex-direction:column;align-items:center;background:#F8FAFC;border-radius:10px;padding:7px 6px}.uj-d small{font-size:.64rem;font-weight:800;color:#64748B;letter-spacing:.06em}.uj-d b{font-size:1.15rem;font-weight:800;font-variant-numeric:tabular-nums}
.uj-et{font-size:.7rem;font-weight:800;color:#64748B;letter-spacing:.06em;margin-bottom:6px}
.uj-es{display:grid;grid-template-columns:repeat(var(--ne,4),1fr);gap:6px}
.uj-e{display:flex;flex-direction:column;align-items:center;padding:6px 2px;border-radius:10px;background:#F8FAFC;border:1.5px solid #EEF0F4}.uj-e small{font-size:.62rem;font-weight:800;color:#94A3B8}.uj-e b{font-size:1rem;font-weight:800;font-variant-numeric:tabular-nums}
.uj-e.hi{background:#FEF2F2;border-color:#FCA5A5}.uj-e.hi b{color:#B91C1C}.uj-e.lo{background:#EFF6FF;border-color:#93C5FD}.uj-e.lo b{color:#1D4ED8}.uj-e.bos b{color:#CBD5E1}
.uj-sp{display:flex;align-items:center;justify-content:space-between;border-radius:10px;padding:7px 12px;font-weight:800;font-size:.8rem;letter-spacing:.04em;background:#F0FDF4;color:#166534}.uj-sp b{font-size:1rem;font-variant-numeric:tabular-nums}
.uj-sp.warn{background:#FFFBEB;color:#92400E}.uj-sp.bad{background:#FEF2F2;color:#B91C1C;animation:gxpPulse 1.6s infinite}
.uj-t{display:flex;align-items:baseline;justify-content:space-between;border-top:1px dashed #E2E8F0;padding-top:10px}.uj-t small{font-size:.72rem;font-weight:800;color:#64748B;letter-spacing:.06em}.uj-t b{font-size:1.6rem;font-weight:800;color:#4F46E5;font-variant-numeric:tabular-nums}
.uj-onay{border-radius:14px;border:2px solid #F59E0B;background:linear-gradient(180deg,#FFFBEB,#fff);padding:10px 12px;display:flex;flex-direction:column;gap:8px}
.uj-onay h4{margin:0;display:flex;align-items:center;gap:6px;font-size:.78rem;letter-spacing:.08em;color:#92400E;font-weight:900}.uj-onay h4 i{font-size:18px}
.uj-onay .top{display:flex;align-items:baseline;justify-content:space-between}.uj-onay .top b{font-size:2rem;font-weight:900;color:#0F172A;font-variant-numeric:tabular-nums}.uj-onay .top span{font-size:.75rem;font-weight:700;color:#64748B}
.uj-ab2{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.uj-ok,.uj-no{display:flex;align-items:center;justify-content:center;gap:8px;border:none;border-radius:12px;padding:13px;font:inherit;font-weight:900;font-size:.95rem;letter-spacing:.04em;cursor:pointer;color:#fff}
.uj-ok{background:#16A34A;box-shadow:0 6px 16px -6px rgba(22,163,74,.6)}.uj-ok:hover{background:#15803D}.uj-no{background:#DC2626;box-shadow:0 6px 16px -6px rgba(220,38,38,.6)}.uj-no:hover{background:#B91C1C}.uj-ok:disabled,.uj-no:disabled{opacity:.6;cursor:wait}
.uj-rednot{border-radius:12px;background:#FEF2F2;border:1.5px solid #FCA5A5;color:#991B1B;font-weight:800;font-size:.82rem;padding:8px 10px}
.uj-f{padding:0 14px 14px}.uj-btn{width:100%;display:flex;align-items:center;justify-content:center;gap:8px;border:none;border-radius:12px;padding:11px;font:inherit;font-weight:800;font-size:.86rem;letter-spacing:.04em;cursor:pointer;background:#FFF7ED;color:#C2410C;border:1.5px solid #FDBA74}.uj-btn:hover{background:#FFEDD5}
.uj-btn.on{background:#16A34A;color:#fff;border-color:#16A34A}.uj-btn.on:hover{background:#15803D}.uj-btn i{font-size:20px}.uj-btn:disabled{opacity:.6;cursor:default}
.uj-mod{display:inline-flex;align-items:center;gap:6px;font-size:.72rem;font-weight:900;letter-spacing:.06em;padding:6px 11px;border-radius:999px}.uj-mod.on{background:#FEF3C7;color:#92400E;border:1.5px solid #F59E0B}.uj-mod.off{background:#F1F5F9;color:#475569;border:1.5px solid #E2E8F0}.uj-mod i{font-size:16px}
.uj-bekS{display:inline-flex;align-items:center;gap:6px;font-size:.72rem;font-weight:900;padding:6px 11px;border-radius:999px;background:#D97706;color:#fff;animation:gxpPulse 1.6s infinite}
.uj-grid.tek .uj-t b{font-size:2.2rem}.uj-grid.tek .uj-onay .top b{font-size:2.8rem}.uj-grid.tek .uj-e b{font-size:1.3rem}.uj-grid.tek .uj-d b{font-size:1.5rem}`;

function Panel({comp,cat,alet,acik,kim,tek}){
 const{toast}=usToast(),[b,setB]=R.useState({}),[al,setAl]=R.useState({}),[busy,setBusy]=R.useState(""),A=ALET[globalThis.__artGor?__artGor(alet,cat):alet]||{tr:alet,en:String(alet).slice(0,2).toUpperCase(),c:"#64748B"};
 const B=`${FB}/${comp}`;
 R.useEffect(()=>onValue(ref(db,`${B}/board/${cat}/${alet}`),s=>setB(s.val()||{})),[comp,cat,alet]);
 R.useEffect(()=>onValue(ref(db,`${B}/puanlar/${cat}/${alet}`),s=>setAl(s.val()||{})),[comp,cat,alet]);
 const bekL=Object.entries(al).filter(([,x])=>x&&x.durum==="ustJuriBekliyor"),redL=Object.entries(al).filter(([,x])=>x&&x.durum==="ustJuriRed");
 // gösterilen sporcu: onay bekleyen varsa o, yoksa tahtadaki
 const ath=bekL.length?bekL[0][0]:b.athId||"",sc=al[ath]||{},pk=sc.ujPaket||null,bek=sc.durum==="ustJuriBekliyor",red=sc.durum==="ustJuriRed";
 const lk=!!b.ustJuriKilit,st=bek?["ONAY BEKLİYOR","bek"]:red?["GERİ GÖNDERİLDİ","red"]:DURUM[b.state||"idle"]||[String(b.state||"").toUpperCase(),"idle"];
 const eK=Object.keys(sc).filter(k=>/^e\d+$/.test(k)).sort((x,y)=>+x.slice(1)-+y.slice(1)),eKeys=eK.length?eK:["e1","e2","e3","e4"];
 const vals=eKeys.map(k=>sc[k]).filter(v=>v!=null&&v!=="").map(Number),mx=vals.length?Math.max(...vals):null,mn=vals.length?Math.min(...vals):null,sp=vals.length>=2?+(mx-mn).toFixed(2):null;
 const fin=bek&&pk?pk.sonuc:sc.finalScore??sc.sonuc,pen=(+sc.calc_MissingPen||0)+(+sc.neutralDeductions||+sc.tarafsiz||0)+(+sc.boardPenalty||0);
 const adS=pk&&pk.ad||b.athName||"",kulS=pk&&pk.kulup||b.athClub||"";
 const tog=async()=>{setBusy("lk");try{await set(ref(db,`${B}/board/${cat}/${alet}/ustJuriKilit`),lk?null:!0);try{logAction("ust_juri_kilit",`Üst Jüri ${lk?"devam":"müdahale"}: ${artAd(alet,!1,cat)}`,{user:kim,competitionId:comp,category:cat,alet})}catch{}}catch(err){toast(__T("İşlem başarısız")+": "+(err?.message||err),"error")}setBusy("")};
 const onayla=async()=>{if(!pk||busy)return;if(!await window.__gxConfirm(`${adS} — ${A.tr}\n${__T("Puan")}: ${n3(pk.sonuc)}\n\n${__T("Onaylanınca puan yayınlanır (canlı skor, sıralama, ekran kartı). Onaylansın mı?")}`))return;
  setBusy("ok");try{const r=`${B}/puanlar/${cat}/${alet}/${ath}`,[akt]=await Promise.all([fbGet(ref(db,`${B}/aktifSporcu/${cat}/${alet}`)).then(s=>s.val()).catch(()=>null)]),now=Date.now();
   const U={[r+"/sonuc"]:pk.sonuc,[r+"/finalScore"]:pk.sonuc,[r+"/durum"]:"tamamlandi",[r+"/kilitli"]:!0,[r+"/ujPaket"]:null,[r+"/ustJuriRed"]:null,[r+"/ustJuriOnay"]:{ts:now,kim}};
   if(pk.board)U[`${B}/board/${cat}/${alet}`]=pk.board;if(pk.lastScored)U[`${B}/broadcast/lastScored/${cat}/${alet}`]={...pk.lastScored,scoredAt:now};if(pk.flash)U[`${B}/flashTrigger`]={...pk.flash,timestamp:now};
   if(akt==null||String(akt)===String(ath)){U[`${B}/aktifSporcu/${cat}/${alet}`]=null;U[`${B}/aktifSporcuBilgi/${cat}/${alet}`]=null}
   await update(ref(db),U);try{logAction("score_approval",`Üst Jüri onayladı: ${adS} · ${A.tr} · ${n3(pk.sonuc)}`,{user:kim,competitionId:comp,category:cat,athleteId:ath,athleteName:adS,alet})}catch{}toast(__T("Onaylandı, puan yayınlandı."),"success")}
  catch(err){toast(__T("Onaylanamadı")+": "+(err?.message||err),"error")}setBusy("")};
 const geriGonder=async()=>{if(!bek||busy)return;const not=await window.__gxPrompt(`${adS} — ${A.tr}\n${__T("Başhakeme gidecek not (neden geri gönderiliyor?)")}`,"");if(not==null)return;
  setBusy("no");try{const r=`${B}/puanlar/${cat}/${alet}/${ath}`;await update(ref(db),{[r+"/durum"]:"ustJuriRed",[r+"/ujPaket"]:null,[r+"/ustJuriRed"]:{not:String(not).trim()||null,ts:Date.now(),kim,ad:adS,oneri:pk?pk.sonuc:null},[`${B}/board/${cat}/${alet}/ujBekliyor`]:null});
   try{logAction("score_send_back",`Üst Jüri geri gönderdi: ${adS} · ${A.tr}${not?" — "+not:""}`,{user:kim,competitionId:comp,category:cat,athleteId:ath,athleteName:adS,alet})}catch{}toast(__T("Başhakeme geri gönderildi."),"success")}
  catch(err){toast(__T("Gönderilemedi")+": "+(err?.message||err),"error")}setBusy("")};
 const im=artImg(alet,cat);
 return e.jsxs("div",{className:"uj-p"+(lk?" lock":"")+(bek?" bek":"")+(red?" red":""),style:{"--ac":A.c},children:[e.jsxs("div",{className:"uj-h",children:[im?e.jsx("span",{className:"uj-sym",children:e.jsx("img",{src:im,alt:""})}):null,e.jsx("span",{className:"uj-ab",children:A.en}),e.jsx("span",{className:"uj-an",children:artAd(alet,!1,cat)||A.tr}),e.jsx("span",{className:"uj-st "+st[1],children:__T(st[0])})]}),
  e.jsxs("div",{className:"uj-b",children:[e.jsxs("div",{className:"uj-lk",children:[e.jsx("i",{className:"material-icons-round",children:"lock"}),__T("ÜST JÜRİ KONTROLÜNDE")]}),
   e.jsx("div",{className:"uj-at",children:ath?e.jsxs(e.Fragment,{children:[e.jsx("b",{children:adS||__T("Sporcu")}),kulS?e.jsx("span",{children:kulS}):null]}):e.jsx("em",{children:__T("Sporcu bekleniyor…")})}),
   e.jsxs("div",{className:"uj-row",children:[e.jsxs("div",{className:"uj-d",children:[e.jsx("small",{children:__T("D NOTU")}),e.jsx("b",{children:n2(sc.dScore??sc.calc_D)})]}),e.jsxs("div",{className:"uj-d",children:[e.jsx("small",{children:__T("E NOTU")}),e.jsx("b",{children:n3(sc.calc_E)})]}),e.jsxs("div",{className:"uj-d",children:[e.jsx("small",{children:__T("KESİNTİ")}),e.jsx("b",{style:{color:pen?"#B91C1C":void 0},children:pen?"−"+pen.toFixed(2):"0.00"})]})]}),
   e.jsxs("div",{children:[e.jsx("div",{className:"uj-et",children:__T("E HAKEMLERİ (kesinti)")}),e.jsx("div",{className:"uj-es",style:{"--ne":Math.min(6,eKeys.length)},children:eKeys.map(k=>{const v=sc[k],n=v==null||v===""?null:Number(v),c=n==null?"bos":mx>mn&&n===mx?"hi":mx>mn&&n===mn?"lo":"";return e.jsxs("div",{className:"uj-e "+c,children:[e.jsx("small",{children:k.toUpperCase()}),e.jsx("b",{children:n==null?"—":n.toFixed(1)})]},k)})})]}),
   e.jsxs("div",{className:"uj-sp"+(sp==null?"":sp>=KOTU?" bad":sp>=UYARI?" warn":""),children:[e.jsx("span",{children:__T("E FARKI")}),e.jsx("b",{children:sp!=null?sp.toFixed(2):vals.length?__T("tek E"):"—"})]}),
   bek&&pk?e.jsxs("div",{className:"uj-onay",children:[e.jsxs("h4",{children:[e.jsx("i",{className:"material-icons-round",children:"hourglass_top"}),__T("ONAYINIZ BEKLENİYOR")]}),
     e.jsxs("div",{className:"top",children:[e.jsx("b",{children:n3(pk.sonuc)}),e.jsx("span",{children:[__T("gönderen"),pk.gonderen?": "+pk.gonderen:"",pk.ts?" · "+new Date(pk.ts).toLocaleTimeString("tr-TR",{hour:"2-digit",minute:"2-digit",second:"2-digit"}):""].join("")})]}),
     e.jsxs("div",{className:"uj-ab2",children:[e.jsxs("button",{type:"button",className:"uj-ok",disabled:!!busy,onClick:onayla,children:[e.jsx("i",{className:"material-icons-round",children:busy==="ok"?"hourglass_top":"check_circle"}),__T("ONAYLA")]}),e.jsxs("button",{type:"button",className:"uj-no",disabled:!!busy,onClick:geriGonder,children:[e.jsx("i",{className:"material-icons-round",children:busy==="no"?"hourglass_top":"undo"}),__T("GERİ GÖNDER")]})]}),
     bekL.length>1?e.jsx("div",{style:{fontSize:".75rem",fontWeight:800,color:"#92400E"},children:"+"+(bekL.length-1)+" "+__T("not daha onay bekliyor")}):null]}):
   red?e.jsxs("div",{className:"uj-rednot",children:[__T("Başhakeme geri gönderildi"),sc.ustJuriRed&&sc.ustJuriRed.not?": “"+sc.ustJuriRed.not+"”":"",e.jsx("div",{style:{fontWeight:700,fontSize:".74rem",marginTop:3,color:"#B91C1C"},children:__T("Başhakem düzeltip yeniden kaydedince onaya tekrar gelir.")})]}):
   e.jsxs("div",{className:"uj-t",children:[e.jsx("small",{children:__T("TOPLAM")}),e.jsx("b",{children:fin!=null?n3(fin):"—"})]}),
   !bek&&redL.length&&!red?e.jsx("div",{className:"uj-rednot",children:redL.length+" "+__T("geri gönderilmiş not düzeltme bekliyor")}):null]}),
  e.jsx("div",{className:"uj-f",children:e.jsxs("button",{type:"button",className:"uj-btn"+(lk?" on":""),disabled:busy==="lk",onClick:tog,title:acik?__T("Onay modunda da bu alette kaydı ve çağrıyı durdurur"):__T("Başhakemin bu alette puan kaydetmesini ve sporcu çağırmasını durdurur"),children:[e.jsx("i",{className:"material-icons-round",children:lk?"play_arrow":"pan_tool"}),lk?__T("DEVAM ET"):__T("MÜDAHALE ET")]})})]})}

export default function ArtistikUstJuriPage(){
 const nav=useNav(),{currentUser:user,isSuperAdmin}=useAuth()||{};
 const q=new URLSearchParams(location.search),qComp=q.get("competitionId")||q.get("compId")||"",qTok=q.get("token")||"",qCat=q.get("catId")||"",qAlet=q.get("aletId")||"";
 const SA=!!user&&(typeof isSuperAdmin==="function"?isSuperAdmin():user.rolAdi==="Super Admin"||user.kullaniciAdi==="admin");
 const[izin,setIzin]=R.useState(qTok?null:SA),[comps,setComps]=R.useState({}),[comp,setComp]=R.useState(qComp),[cat,setCat]=R.useState(qCat),[ayar,setAyar]=R.useState({}),[kats,setKats]=R.useState({});
 // link ile giriş: token = ustJuriAyar.token
 R.useEffect(()=>{if(!qTok){setIzin(SA);return}if(!qComp){setIzin(!1);return}fbGet(ref(db,`${FB}/${qComp}/ustJuriAyar/token`)).then(s=>setIzin(tokenEsit(String(s.val()||""),qTok)||SA)).catch(()=>setIzin(SA))},[qTok,qComp,SA]);
 R.useEffect(()=>{if(qTok||!SA)return;return onValue(ref(db,FB),s=>setComps(filterComps(s.val()||{},user)||{}))},[user,SA,qTok]);
 R.useEffect(()=>{setAyar({});setKats({});if(!comp||!izin)return;const u=[onValue(ref(db,`${FB}/${comp}/ustJuriAyar`),s=>setAyar(s.val()||{})),onValue(ref(db,`${FB}/${comp}/kategoriler`),s=>setKats(s.val()||{}))];return()=>u.forEach(f=>f())},[comp,izin]);
 const compList=R.useMemo(()=>Object.entries(comps).filter(([,c])=>c&&c.kategoriler&&c.arsivli!==!0).sort((a,b)=>String(b[1].baslangicTarihi||b[1].tarih||"").localeCompare(String(a[1].baslangicTarihi||a[1].tarih||""))),[comps]);
 const aletler=cat?(qAlet?[qAlet]:aletSirala(kats[cat]?.aletler)):[],kim=user?.adSoyad||user?.kullaniciAdi||(qTok?"Üst Jüri (link)":"");
 if(izin===null)return e.jsx("div",{className:"gxp",children:e.jsx("div",{className:"gxp-card",children:e.jsx("div",{className:"gxp-empty",children:__T("Yükleniyor…")})})});
 if(!izin)return e.jsxs("div",{className:"gxp",children:[e.jsx("style",{children:CSS}),e.jsx("div",{className:"gxp-card",children:e.jsxs("div",{className:"gxp-empty",children:[e.jsx("i",{className:"material-icons-round",children:"lock"}),qTok?__T("Bu Üst Jüri linki geçersiz ya da yenilenmiş. Paneller ekranından yeni linki alın."):__T("Bu ekran Üst Jüri linkiyle ya da Süper Admin hesabıyla açılır.")]})})]});
 const acik=!!ayar.acik,katAd=k=>{const v=kats[k];return v?.name||v?.ad||k};
 return e.jsxs("div",{className:"gxp",style:{"--gxp-c":"#DC2626",maxWidth:1500},children:[e.jsx("style",{children:CSS}),
  e.jsxs("div",{className:"gxp-hdr",children:[qTok?null:e.jsx("button",{type:"button",className:"gxp-back",onClick:()=>nav("/artistic"),title:__T("Geri"),children:e.jsx("i",{className:"material-icons-round",children:"arrow_back"})}),e.jsx("div",{className:"gxp-ic",children:e.jsx("i",{className:"material-icons-round",children:"gavel"})}),e.jsxs("div",{className:"gxp-tt",children:[e.jsx("h1",{children:__T("Üst Jüri Paneli")+(qAlet?" — "+(artAd(qAlet,!1,cat)||qAlet):"")}),e.jsx("p",{children:acik?__T("Onay modu açık: notlar onayınızdan sonra yayınlanır"):__T("Başhakem onaylar; gerektiğinde MÜDAHALE ET ile durdurun")})]}),
   e.jsxs("div",{className:"gxp-sel",children:[comp?e.jsxs("span",{className:"uj-mod "+(acik?"on":"off"),children:[e.jsx("i",{className:"material-icons-round",children:acik?"verified":"how_to_reg"}),acik?__T("ONAY MODU AÇIK"):__T("BAŞHAKEM ONAYI")]}):null,comp&&cat?e.jsx("span",{className:"gxp-live",children:__T("CANLI")}):null,
    qTok?null:e.jsxs("select",{value:comp,onChange:ev=>{setComp(ev.target.value);setCat("")},children:[e.jsx("option",{value:"",children:__T("— Yarışma seçin —")}),compList.map(([id,c])=>e.jsx("option",{value:id,children:c.isim||c.ad||id},id))]}),
    qCat&&qTok?e.jsx("b",{style:{fontSize:".95rem"},children:katAd(cat)}):e.jsxs("select",{value:cat,disabled:!comp,onChange:ev=>setCat(ev.target.value),children:[e.jsx("option",{value:"",children:comp?__T("— Kategori seçin —"):__T("Önce yarışma")}),Object.entries(kats).map(([k,v])=>e.jsx("option",{value:k,children:v?.name||v?.ad||k},k))]})]})]}),
  !comp||!cat?e.jsx("div",{className:"gxp-card",children:e.jsxs("div",{className:"gxp-empty",children:[e.jsx("i",{className:"material-icons-round",children:"sports_gymnastics"}),comp?__T("Kategori seçin"):__T("Yarışma ve kategori seçin")]})}):
  e.jsx("div",{className:"uj-grid"+(aletler.length===1?" tek":""),style:{"--uj-n":aletler.length===6||aletler.length===7?3:Math.min(4,Math.max(1,aletler.length))},children:aletler.map(a=>e.jsx(Panel,{comp,cat,alet:a,acik,kim,tek:aletler.length===1},comp+cat+a))})]})}
