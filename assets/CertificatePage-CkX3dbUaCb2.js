import"./i18n-Tr01a2b3Cb2.js";import{u as useAuth,b as useToast,a as usDisc,j as e,d as db}from"./main-C2LpyYUGCb2.js";import{u as useNav,r as R}from"./vendor-react-Cxw6bqwhCb2.js";import{o as onValue,k as ref}from"./vendor-firebase-940mxgRVCb2.js";import{f as filterComps}from"./useFilteredCompetitions-B7FB6qIvCb2.js";import{GXP_CSS}from"./ArtistikNotSilmePage-Ns01a2b3Cb2.js";import{isIntl,sporcuUlke,ulkeAd,bayrakUrl,katEN,UlkeEtiket}from"./intl-Ul01a2b3Cb2.js";import"./modulepreload-polyfill-B5Qt9EMXCb2.js";

// SERTİFİKALAR — katılım, derece (ilk N) ve hakem görev belgeleri; tüm branşlar.
// Puan yapıları: ritmik puanlar/<kat>/<sporcu|grupKey>/<alet>/sonuc (+ üstte sonuc) · artistik puanlar/<kat>/<alet>/<sporcu>/finalScore|sonuc · aerobik puanlar/<kat>/<sporcu|grupKey>/sonuc
// Grup/takım kategorilerinde grup anahtarı "<kat>::<kulüp>::<grupNo>" (Final Oluştur / Puanlama ile aynı). IRM (DNS/DNF/DSQ) derece almaz.
// Uluslararası yarışma: belge dili (varsayılan çıktı dili), kulüp yerine ülke + bayrak.
const RENK={artistik:"#4F46E5",ritmik:"#DB2777",aerobik:"#10B981",parkur:"#F59E0B",trampolin:"#F97316"};
const TUR=[{id:"katilim",ic:"card_membership",c:"#2563EB",tr:["Katılım Belgesi","Tüm sporcular için"],en:["Participation","For all gymnasts"]},{id:"derece",ic:"military_tech",c:"#D97706",tr:["Derece Belgesi","İlk sıradakiler için başarı belgesi"],en:["Achievement","For the top-ranked gymnasts"]},{id:"hakem",ic:"gavel",c:"#0D9488",tr:["Hakem Görev Belgesi","Görev alan hakemler için"],en:["Judge certificate","For officiating judges"]}];
const BRANS={artistik:["Artistik Cimnastik","Artistic Gymnastics"],ritmik:["Ritmik Cimnastik","Rhythmic Gymnastics"],aerobik:["Aerobik Cimnastik","Aerobic Gymnastics"],parkur:["Parkur","Parkour"],trampolin:["Trampolin Cimnastik","Trampoline Gymnastics"]};
const num=v=>{const n=parseFloat(v);return isNaN(n)?null:n};
const san=s=>String(s||"").trim().replace(/[.#$[\]/]/g,"-").slice(0,60);
const isGrp=(k,c)=>!!c&&(c.tip==="takim"||c.tip==="karma"||Number(c.athleteCount)>1)||/_(grup|cift|trio|takim|karma)$/.test(String(k).replace(/^final_/,"").split("__")[0]);
// bir sporcu / grup kaydının toplam puanı (+ IRM)
function puanOf(P,id){let irm=null;const r=P?.[id];
 if(r&&typeof r==="object"){if(r.irm)irm=r.irm;Object.values(r).forEach(v=>{v&&typeof v==="object"&&v.irm&&(irm=irm||v.irm)});const s=num(r.sonuc)??num(r.toplam)??num(r.finalScore);if(s!=null)return{p:s,irm};
  let t=0,f=!1;Object.values(r).forEach(v=>{if(v&&typeof v==="object"&&!v.irm){const x=num(v.sonuc)??num(v.finalScore);x!=null&&(t+=x,f=!0)}});if(f)return{p:t,irm}}
 let t=0,f=!1;Object.values(P||{}).forEach(v=>{const x=v&&typeof v==="object"?v[id]:null;if(x&&typeof x==="object"){x.irm&&(irm=irm||x.irm);const y=num(x.finalScore)??num(x.sonuc)??num(x.sonPuan);y!=null&&!x.irm&&(t+=y,f=!0)}});
 return{p:f?t:null,irm}}
const CSS=GXP_CSS+`
.ce-grid{display:grid;grid-template-columns:minmax(300px,380px) minmax(0,1fr);gap:16px;align-items:start}@media(max-width:1000px){.ce-grid{grid-template-columns:1fr}}
.ce-col{display:flex;flex-direction:column;gap:16px;min-width:0}
.ce-h2{display:flex;align-items:center;gap:10px;font-size:1.02rem;font-weight:800;margin:0 0 12px}.ce-h2 small{font-weight:700;color:#94A3B8;font-size:.78rem}
.ce-ic{width:32px;height:32px;border-radius:10px;display:grid;place-items:center;color:#fff;flex-shrink:0}.ce-ic i{font-size:18px}
.ce-types{display:flex;flex-direction:column;gap:8px}
.ce-type{display:flex;align-items:center;gap:12px;padding:11px 12px;border:1.5px solid #EEF0F4;border-radius:14px;background:#FAFBFC;cursor:pointer;text-align:left;font:inherit}
.ce-type i{width:38px;height:38px;border-radius:11px;display:grid;place-items:center;color:#fff;font-size:20px;flex-shrink:0}
.ce-type b{display:block;font-weight:900;font-size:.92rem;color:#1A1D26}.ce-type span{font-size:.78rem;font-weight:600;color:#64748B}
.ce-type.on{border-color:var(--tc);background:color-mix(in srgb,var(--tc) 7%,#fff)}
.ce-f{display:flex;flex-direction:column;gap:6px;font-size:.78rem;font-weight:800;color:#475569;margin-top:12px}.ce-f:first-child{margin-top:0}
.ce-in{width:100%;padding:10px 12px;border:1px solid var(--border,#E5E7EB);border-radius:12px;background:#fff;font:inherit;font-weight:700;font-size:.9rem;color:#1A1D26;box-sizing:border-box}
.ce-in:focus{outline:2px solid var(--gxp-c);outline-offset:1px}
.ce-2{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.ce-seg{display:inline-flex;border:1px solid #E5E7EB;border-radius:12px;overflow:hidden}.ce-seg button{border:none;background:#fff;padding:8px 14px;font:inherit;font-weight:800;font-size:.82rem;color:#475569;cursor:pointer}.ce-seg button.on{background:var(--gxp-c);color:#fff}
.ce-btns{display:flex;gap:10px;flex-wrap:wrap;margin-top:14px}
.ce-btn{display:inline-flex;align-items:center;gap:7px;padding:11px 16px;border-radius:12px;border:1px solid #E5E7EB;background:#fff;font:inherit;font-weight:800;font-size:.88rem;color:#334155;cursor:pointer}.ce-btn i{font-size:18px}
.ce-btn.pri{background:var(--gxp-c);border-color:var(--gxp-c);color:#fff;box-shadow:0 8px 20px -10px var(--gxp-c)}.ce-btn:disabled{opacity:.5;cursor:not-allowed}
.ce-prev{width:100%;border-radius:12px;box-shadow:0 6px 24px rgba(15,23,42,.12);display:block}
.ce-list{display:flex;flex-direction:column;gap:6px;max-height:560px;overflow:auto;padding-right:4px}
.ce-row{display:grid;grid-template-columns:34px minmax(0,1fr) auto auto;gap:10px;align-items:center;padding:9px 12px;border:1px solid #EEF0F4;border-radius:12px;background:#FAFBFC;cursor:pointer}
.ce-row:hover{background:#F5F7FB}.ce-row.sel{border-color:var(--gxp-c);background:color-mix(in srgb,var(--gxp-c) 6%,#fff)}
.ce-rk{font-weight:900;color:#94A3B8;text-align:center}.ce-rk.m1{color:#B45309}.ce-rk.m2{color:#64748B}.ce-rk.m3{color:#9A3412}
.ce-nm{min-width:0}.ce-nm b{display:block;font-weight:800;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.ce-nm span{font-size:.76rem;font-weight:700;color:#64748B;display:flex;gap:6px;align-items:center}
.ce-sc{font-weight:900;font-variant-numeric:tabular-nums}.ce-irm{font-size:.7rem;font-weight:900;color:#fff;background:#DC2626;border-radius:6px;padding:2px 7px}
.ce-note{font-size:.8rem;font-weight:600;color:#64748B;line-height:1.5;margin:10px 0 0}
.ce-cnt{margin-left:auto;font-size:.78rem;font-weight:800;color:var(--gxp-c);background:color-mix(in srgb,var(--gxp-c) 9%,#fff);padding:4px 10px;border-radius:999px}`;
const img=src=>new Promise((ok,no)=>{const i=new Image;i.crossOrigin="anonymous";i.onload=()=>ok(i);i.onerror=no;i.src=src});

export default function CertificatePage(){
 const nav=useNav(),{currentUser:user,hasPermission:can}=useAuth(),{toast}=useToast(),{firebasePath:FB,routePrefix:RP,id:br}=usDisc(),renk=RENK[br]||"#4F46E5",yetki=can?can("certificates","olustur"):!0;
 const cv=R.useRef(null);
 const[comps,setComps]=R.useState(null),[comp,setComp]=R.useState(""),[tur,setTur]=R.useState("katilim"),[kat,setKat]=R.useState(""),[ilkN,setIlkN]=R.useState(3),[dil,setDil]=R.useState(""),[s1,setS1]=R.useState({ad:"",un:""}),[s2,setS2]=R.useState({ad:"",un:""}),[ekH,setEkH]=R.useState(""),[sec,setSec]=R.useState(null),[prev,setPrev]=R.useState(null),[busy,setBusy]=R.useState(!1);
 R.useEffect(()=>onValue(ref(db,FB),s=>setComps(filterComps(s.val()||{},user)||{})),[FB,user]);
 const list=R.useMemo(()=>Object.entries(comps||{}).filter(([,c])=>c&&typeof c==="object"&&(c.isim||c.kategoriler)).map(([k,c])=>({k,ad:c.isim||k,t:c.baslangicTarihi||"",arsiv:c.arsivli===!0||c.arsivli==="true"})).sort((a,b)=>String(b.t).localeCompare(String(a.t))),[comps]);
 const C=comp?comps?.[comp]:null,INTL=isIntl(C),L=dil||(INTL&&C?.ciktiDili!=="tr"?"en":"tr"),EN=L==="en";
 R.useEffect(()=>{setKat("");setSec(null);setPrev(null);setDil("");const ki=k=>({ad:"",un:k});setS1(ki(""));setS2(ki(""))},[comp]);
 const un1=s1.un||(EN?"Competition Director":"İl Gençlik ve Spor Müdürü"),un2=s2.un||(EN?(INTL?"Technical Delegate":"Federation Representative"):"Federasyon Temsilcisi");
 const kats=C?.kategoriler||{},katL=Object.keys(kats).sort((a,b)=>(/^final_/.test(a)-/^final_/.test(b))||String(kats[a]?.name||a).localeCompare(String(kats[b]?.name||b),"tr"));
 const katAd=k=>{const n=String(kats[k]?.name||k).replace(/^\s*\u{1F3C6}\s*/u,"");return EN?katEN(n):n};
 // yarışmacılar (bireysel: sporcu; grup: grup) + puan + sıra
 const kisiler=R.useMemo(()=>{if(!C||!kat)return[];const out=[],P=C.puanlar?.[kat]||{},sp=C.sporcular?.[kat]||{},grp=isGrp(kat,kats[kat]);
  if(grp){const G=new Map;Object.entries(sp).forEach(([id,a])=>{if(!a||typeof a!=="object")return;const ok=String(a.okul||a.kulup||"").trim(),gn=a.grupNo??1,k=ok+"|"+gn;G.has(k)||G.set(k,{key:san(kat+"::"+ok+"::"+gn),okul:ok,gn,uyeler:[]});G.get(k).uyeler.push({id,...a})});
   G.forEach(g=>{const{p,irm}=puanOf(P,g.key);g.uyeler.forEach(m=>out.push({id:m.id,ad:[m.ad,m.soyad].filter(Boolean).join(" ")||m.adSoyad||"",okul:g.okul,ulke:sporcuUlke(m,C),grup:g.key,grupAd:g.okul+(g.gn>1?" ("+g.gn+")":""),p,irm}))})}
  else Object.entries(sp).forEach(([id,a])=>{if(!a||typeof a!=="object")return;const{p,irm}=puanOf(P,id);out.push({id,ad:[a.ad,a.soyad].filter(Boolean).join(" ")||a.adSoyad||"",okul:String(a.okul||a.kulup||"").trim(),ulke:sporcuUlke(a,C),p,irm})});
  // sıra: grup → grubun sırası; eşit puan → eşit sıra
  const birim=[...new Map(out.map(x=>[x.grup||x.id,x])).values()].filter(x=>x.p!=null&&x.p>0&&!x.irm).sort((a,b)=>b.p-a.p);const rk={};let son=null,r0=0;birim.forEach((x,i)=>{if(son===null||x.p!==son)r0=i+1;son=x.p;rk[x.grup||x.id]=r0});
  out.forEach(x=>{x.rank=rk[x.grup||x.id]||null});return out.sort((a,b)=>(a.rank||1e9)-(b.rank||1e9)||a.ad.localeCompare(b.ad,"tr"))},[C,kat]);
 const hakemler=R.useMemo(()=>{if(!C)return[];const S=new Map,ek=(ad,un)=>{const n=String(ad||"").trim();if(!n||n.length<3)return;const k=n.toLocaleUpperCase("tr-TR");S.has(k)||S.set(k,{id:"h"+S.size,ad:n,un:un||""})};
  const tara=(o,d)=>{if(!o||typeof o!=="object"||d>4)return;if(typeof o.adSoyad==="string"||typeof o.name==="string"&&(o.id||o.adSoyad||o.figKategori)){ek(o.adSoyad||o.name,o.brove||o.figKategori||"");return}Object.values(o).forEach(v=>tara(v,d+1))};
  ["hakemler","hakemKarnesi","panelGruplari","hakemAtama"].forEach(k=>tara(C[k],0));ekH.split("\n").forEach(x=>ek(x));return[...S.values()].sort((a,b)=>a.ad.localeCompare(b.ad,"tr"))},[C,ekH]);
 const hedef=tur==="hakem"?hakemler:tur==="derece"?kisiler.filter(x=>x.rank&&x.rank<=ilkN):kisiler;
 const T=EN?{fed:"TURKISH GYMNASTICS FEDERATION",katilim:"CERTIFICATE OF PARTICIPATION",derece:"CERTIFICATE OF ACHIEVEMENT",hakem:"JUDGE CERTIFICATE",katil:"has participated in the competition.",hk:"has officiated as a judge at the competition.",kat:"",puan:"Total score",yer:r=>r===1?"1ST PLACE":r===2?"2ND PLACE":r===3?"3RD PLACE":r+"TH PLACE"}:{fed:"TÜRKİYE CİMNASTİK FEDERASYONU",katilim:"KATILIM BELGESİ",derece:"BAŞARI BELGESİ",hakem:"GÖREV BELGESİ",katil:"müsabakasına katılmıştır.",hk:"müsabakasında hakem olarak görev yapmıştır.",kat:" Kategorisi",puan:"Toplam Puan",yer:r=>r===1?"BİRİNCİ":r===2?"İKİNCİ":r===3?"ÜÇÜNCÜ":r+". SIRADA"};
 const ciz=async(t,tp,fmt)=>{const d=cv.current;if(!d)return null;const x=d.getContext("2d"),W=1600,H=1130;d.width=W;d.height=H;
  const m=tp==="derece"?"#D97706":tp==="hakem"?"#0D9488":"#2563EB",bg=tp==="derece"?"#FEF3C7":tp==="hakem"?"#CCFBF1":"#DBEAFE",m2=tp==="derece"?"#F59E0B":tp==="hakem"?"#14B8A6":"#3B82F6";
  x.fillStyle="#fff";x.fillRect(0,0,W,H);const g=x.createLinearGradient(0,0,0,220);g.addColorStop(0,bg);g.addColorStop(1,"rgba(255,255,255,0)");x.fillStyle=g;x.fillRect(0,0,W,220);
  x.strokeStyle=m;x.lineWidth=6;x.strokeRect(24,24,W-48,H-48);x.lineWidth=1.5;x.strokeRect(36,36,W-72,H-72);
  const K=[[24,24,1,1],[W-24,24,-1,1],[24,H-24,1,-1],[W-24,H-24,-1,-1]];x.fillStyle=m;K.forEach(([a,b,u,v])=>{x.fillRect(a,b,70*u,5*v);x.fillRect(a,b,5*u,70*v)});
  try{const l=await img("/logo.png"),h=100,w=l.width/l.height*h;x.drawImage(l,(W-w)/2,60,w,h)}catch{}
  x.textAlign="center";x.fillStyle="#374151";x.font="700 20px Nunito, sans-serif";x.fillText(T.fed,W/2,195);
  x.beginPath();x.moveTo(W/2-200,240);x.lineTo(W/2+200,240);x.strokeStyle=m;x.lineWidth=1.5;x.stroke();
  const bas=T[tp];x.fillStyle=m;x.font="900 44px Nunito, sans-serif";x.fillText(bas,W/2,300);const bw=x.measureText(bas).width;x.beginPath();x.moveTo(W/2-bw/2-10,314);x.lineTo(W/2+bw/2+10,314);x.strokeStyle=m2;x.lineWidth=2.5;x.stroke();
  const ad=String(t.ad||"").toLocaleUpperCase(EN?"en":"tr-TR");x.fillStyle="#111827";x.font=(ad.length>28?"900 44px":"900 54px")+" Nunito, sans-serif";x.fillText(ad,W/2,400);
  x.beginPath();x.moveTo(W/2-160,418);x.lineTo(W/2+160,418);x.strokeStyle="#D1D5DB";x.lineWidth=1;x.stroke();
  x.fillStyle="#374151";x.font="600 26px Nunito, sans-serif";x.fillText(C?.isim||"",W/2,475);
  if(tp!=="hakem"){x.fillStyle="#4B5563";x.font="600 22px Nunito, sans-serif";x.fillText(katAd(kat)+T.kat,W/2,512);
   const alt=INTL&&t.ulke?(ulkeAd(t.ulke,EN?"en":"tr")+" ("+t.ulke+")"+(t.okul&&t.okul!==t.ulke?" · "+t.okul:"")):t.grupAd||t.okul||"";
   if(alt){x.font="600 20px Nunito, sans-serif";const tw=x.measureText(alt).width;let fx=W/2;if(INTL&&t.ulke&&bayrakUrl(t.ulke)){try{const f=await img(bayrakUrl(t.ulke)),fw=36,fh=27,sx=W/2-(tw+fw+10)/2;x.drawImage(f,sx,526,fw,fh);x.strokeStyle="rgba(0,0,0,.15)";x.strokeRect(sx,526,fw,fh);fx=sx+fw+10+tw/2}catch{}}x.fillStyle="#6B7280";x.fillText(alt,fx,548)}
   if(tp==="derece"&&t.rank){const yr=T.yer(t.rank),y=615,w=300,h=52;x.fillStyle=bg;x.beginPath();x.roundRect(W/2-w/2,y-h/2,w,h,10);x.fill();x.strokeStyle=m;x.lineWidth=2;x.beginPath();x.roundRect(W/2-w/2,y-h/2,w,h,10);x.stroke();x.fillStyle=m;x.font="900 30px Nunito, sans-serif";x.fillText(yr,W/2,y+10);
    t.p>0&&(x.fillStyle="#6B7280",x.font="700 20px Nunito, sans-serif",x.fillText(`${T.puan}: ${t.p.toFixed(3)}`,W/2,y+60))}
   else{x.fillStyle="#6B7280";x.font="500 22px Nunito, sans-serif";x.fillText(T.katil,W/2,600)}}
  else{x.fillStyle="#4B5563";x.font="600 22px Nunito, sans-serif";x.fillText(T.hk,W/2,515);x.fillStyle="#6B7280";x.font="500 20px Nunito, sans-serif";x.fillText((BRANS[br]||BRANS.ritmik)[EN?1:0]+(t.un?" · "+t.un:""),W/2,560)}
  const tarih=[C?.baslangicTarihi,C?.bitisTarihi&&C.bitisTarihi!==C.baslangicTarihi?C.bitisTarihi:""].filter(Boolean).join(" – ");x.fillStyle="#9CA3AF";x.font="500 17px Nunito, sans-serif";x.fillText([C?.il,tarih].filter(Boolean).join(" — "),W/2,H-190);
  const v=H-120,B=130,F1=350,F2=W-350;[[F1,s1.ad,un1],[F2,s2.ad,un2]].forEach(([cx,n,u])=>{x.strokeStyle="#C7C7CC";x.lineWidth=1;x.beginPath();x.moveTo(cx-B,v);x.lineTo(cx+B,v);x.stroke();n&&(x.fillStyle="#374151",x.font="700 16px Nunito, sans-serif",x.fillText(n,cx,v-10));x.fillStyle="#9CA3AF";x.font="600 13px Nunito, sans-serif";x.fillText(u,cx,v+20)});
  return fmt==="j"?d.toDataURL("image/jpeg",.9):d.toDataURL("image/png")};
 const onizle=async t=>{setSec(t?.id||null);setPrev(await ciz(t||hedef[0]||{ad:EN?"Sample Gymnast":"Örnek Sporcu",okul:"",p:0},tur))};
 R.useEffect(()=>{setPrev(null);setSec(null)},[tur,kat,L]);
 const pdf=async()=>{if(!hedef.length)return toast(EN?"Nobody to generate":__T("Oluşturulacak kişi yok"),"error");setBusy(!0);try{const J=await import("./jspdf.es.min-gArCfqm1Cb2.js").then(z=>z.j?.jsPDF||z.E),d=new J({orientation:"landscape",unit:"mm",format:"a4"});
   for(let i=0;i<hedef.length;i++){i&&d.addPage();d.addImage(await ciz(hedef[i],tur,"j"),"JPEG",0,0,297,210)}
   const ad=String(C?.isim||"yarisma").replace(/[^a-zA-Z0-9ğüşıöçĞÜŞİÖÇ ]/g,"").replace(/\s+/g,"_").slice(0,40);d.save(`${ad}_${tur==="derece"?(EN?"achievement":"basari"):tur==="hakem"?(EN?"judges":"hakem_gorev"):(EN?"participation":"katilim")}${kat&&tur!=="hakem"?"_"+kat:""}.pdf`);toast(`${hedef.length} ${EN?"certificates created":__T("belge oluşturuldu")}`,"success")}catch(x){toast("Hata: "+(x?.message||x),"error")}setBusy(!1)};
 const turBilgi=TUR.find(x=>x.id===tur);
 return e.jsxs("div",{className:"gxp",style:{"--gxp-c":renk},children:[e.jsx("style",{children:CSS}),e.jsx("canvas",{ref:cv,style:{display:"none"}}),
  e.jsxs("div",{className:"gxp-hdr",children:[e.jsx("button",{type:"button",className:"gxp-back",onClick:()=>nav(RP||"/"),title:__T("Geri"),children:e.jsx("i",{className:"material-icons-round",children:"arrow_back"})}),e.jsx("div",{className:"gxp-ic",children:e.jsx("i",{className:"material-icons-round",children:"workspace_premium"})}),e.jsxs("div",{className:"gxp-tt",children:[e.jsx("h1",{children:__T("Sertifikalar")}),e.jsx("p",{children:__T("Katılım, derece ve hakem görev belgeleri")})]}),
   e.jsx("div",{className:"gxp-sel",children:e.jsxs("select",{value:comp,onChange:ev=>setComp(ev.target.value),children:[e.jsx("option",{value:"",children:comps===null?__T("Yükleniyor…"):__T("— Yarışma seçin —")}),list.map(x=>e.jsx("option",{value:x.k,children:x.ad+(x.arsiv?__T(" (arşiv)"):"")},x.k))]})})]}),
  !C?e.jsxs("div",{className:"gxp-card gxp-empty",children:[e.jsx("i",{className:"material-icons-round",children:"workspace_premium"}),__T("Belge oluşturmak için yarışma seçin.")]}):
  e.jsxs("div",{className:"ce-grid",children:[e.jsxs("div",{className:"ce-col",children:[
   e.jsxs("div",{className:"gxp-card",children:[e.jsxs("h2",{className:"ce-h2",children:[e.jsx("span",{className:"ce-ic",style:{background:renk},children:e.jsx("i",{className:"material-icons-round",children:"category"})}),__T("Belge türü")]}),
    e.jsx("div",{className:"ce-types",children:TUR.map(x=>e.jsxs("button",{type:"button",className:"ce-type"+(tur===x.id?" on":""),style:{"--tc":x.c},onClick:()=>setTur(x.id),children:[e.jsx("i",{className:"material-icons-round",style:{background:x.c},children:x.ic}),e.jsxs("div",{children:[e.jsx("b",{children:__T(x.tr[0])}),e.jsx("span",{children:__T(x.tr[1])})]})]},x.id))})]}),
   e.jsxs("div",{className:"gxp-card",children:[e.jsxs("h2",{className:"ce-h2",children:[e.jsx("span",{className:"ce-ic",style:{background:"#2563EB"},children:e.jsx("i",{className:"material-icons-round",children:"tune"})}),__T("Ayarlar")]}),
    tur!=="hakem"?e.jsxs("label",{className:"ce-f",children:[__T("Kategori"),e.jsxs("select",{className:"ce-in",value:kat,onChange:ev=>setKat(ev.target.value),children:[e.jsx("option",{value:"",children:__T("— Kategori seçin —")}),katL.map(k=>e.jsx("option",{value:k,children:katAd(k)},k))]})]}):e.jsxs("label",{className:"ce-f",children:[__T("Ek hakemler (her satıra bir ad soyad)"),e.jsx("textarea",{className:"ce-in",rows:3,value:ekH,onChange:ev=>setEkH(ev.target.value),style:{resize:"vertical"}})]}),
    tur==="derece"?e.jsxs("label",{className:"ce-f",children:[__T("Kaçıncıya kadar"),e.jsx("div",{className:"ce-seg",children:[3,6,8,10].map(n=>e.jsx("button",{type:"button",className:ilkN===n?"on":"",onClick:()=>setIlkN(n),children:__T("İlk")+" "+n},n))})]}):null,
    e.jsxs("label",{className:"ce-f",children:[__T("Belge dili"),e.jsxs("div",{className:"ce-seg",children:[e.jsx("button",{type:"button",className:!EN?"on":"",onClick:()=>setDil("tr"),children:__T("Türkçe")}),e.jsx("button",{type:"button",className:EN?"on":"",onClick:()=>setDil("en"),children:"English"})]})]}),
    e.jsxs("div",{className:"ce-f",children:[__T("İmzalar"),e.jsxs("div",{className:"ce-2",children:[e.jsx("input",{className:"ce-in",placeholder:__T("1. imza — ad soyad"),value:s1.ad,onChange:ev=>setS1({...s1,ad:ev.target.value})}),e.jsx("input",{className:"ce-in",placeholder:un1,value:s1.un,onChange:ev=>setS1({...s1,un:ev.target.value})}),e.jsx("input",{className:"ce-in",placeholder:__T("2. imza — ad soyad"),value:s2.ad,onChange:ev=>setS2({...s2,ad:ev.target.value})}),e.jsx("input",{className:"ce-in",placeholder:un2,value:s2.un,onChange:ev=>setS2({...s2,un:ev.target.value})})]})]}),
    e.jsxs("div",{className:"ce-btns",children:[e.jsxs("button",{type:"button",className:"ce-btn",disabled:tur!=="hakem"&&!kat,onClick:()=>onizle(),children:[e.jsx("i",{className:"material-icons-round",children:"visibility"}),__T("Önizle")]}),yetki?e.jsxs("button",{type:"button",className:"ce-btn pri",disabled:busy||!hedef.length,onClick:pdf,children:[e.jsx("i",{className:"material-icons-round",children:"picture_as_pdf"}),busy?__T("Oluşturuluyor…"):`${__T("PDF oluştur")} (${hedef.length})`]}):null]}),
    INTL?e.jsx("p",{className:"ce-note",children:__T("Uluslararası yarışma: belgelerde kulüp yerine ülke ve bayrak yer alır.")}):null]})]}),
  e.jsxs("div",{className:"ce-col",children:[prev?e.jsxs("div",{className:"gxp-card",children:[e.jsxs("h2",{className:"ce-h2",children:[e.jsx("span",{className:"ce-ic",style:{background:turBilgi.c},children:e.jsx("i",{className:"material-icons-round",children:"visibility"})}),__T("Önizleme")]}),e.jsx("img",{className:"ce-prev",src:prev,alt:""})]}):null,
   e.jsxs("div",{className:"gxp-card",children:[e.jsxs("h2",{className:"ce-h2",children:[e.jsx("span",{className:"ce-ic",style:{background:turBilgi.c},children:e.jsx("i",{className:"material-icons-round",children:tur==="hakem"?"gavel":"groups"})}),tur==="hakem"?__T("Hakemler"):tur==="derece"?__T("Derece alanlar"):__T("Sporcular"),e.jsx("span",{className:"ce-cnt",children:hedef.length})]}),
    tur!=="hakem"&&!kat?e.jsx("p",{className:"ce-note",children:__T("Önce kategori seçin.")}):!hedef.length?e.jsx("p",{className:"ce-note",children:tur==="hakem"?__T("Bu yarışmada atanmış hakem bulunamadı — ek hakemleri elle yazabilirsiniz."):__T("Bu kategoride kişi yok.")}):
    e.jsx("div",{className:"ce-list",children:hedef.map((t,i)=>e.jsxs("div",{className:"ce-row"+(sec===t.id?" sel":""),onClick:()=>onizle(t),title:__T("Önizlemek için tıklayın"),children:[e.jsx("span",{className:"ce-rk"+(t.rank&&t.rank<=3?" m"+t.rank:""),children:tur==="hakem"?i+1:t.rank||"—"}),e.jsxs("div",{className:"ce-nm",children:[e.jsx("b",{children:t.ad}),e.jsxs("span",{children:[INTL&&t.ulke?UlkeEtiket(e,t.ulke,{boy:11}):null,tur==="hakem"?t.un:(INTL&&(t.grupAd||t.okul)===t.ulke?"":(t.grupAd||t.okul||""))]})]}),t.irm?e.jsx("span",{className:"ce-irm",children:t.irm}):e.jsx("span",{}),tur!=="hakem"&&t.p!=null?e.jsx("span",{className:"ce-sc",children:t.p.toFixed(3)}):e.jsx("span",{})]},t.id+"|"+i))})]})]})]})]})}
