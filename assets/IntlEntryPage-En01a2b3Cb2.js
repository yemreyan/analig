import"./i18n-Tr01a2b3Cb2.js";import{a as usDisc,j as e}from"./main-C2LpyYUGCb2.js";import{u as useNav,r as R}from"./vendor-react-Cxw6bqwhCb2.js";import{GXP_CSS}from"./ArtistikNotSilmePage-Ns01a2b3Cb2.js";import{ULKELER,bayrakUrl,katEN,ulkeAd,UlkeEtiket}from"./intl-Ul01a2b3Cb2.js";import"./modulepreload-polyfill-B5Qt9EMXCb2.js";

// ULUSLARARASI KAYIT (Entry Form) — yabancı federasyonların nominatif kaydı. Herkese açık (giriş gerekmez).
// Kayıt: <firebasePath>/<comp>/uluslararasiKayit/<id> {ulke, federasyon, iletisim, sporcular[], hakemler[], durum:"beklemede"}
// Onay: Sporcular sayfasındaki "Uluslararası Kayıtlar" paneli. Dil: varsayılan İngilizce; kullanıcı TR seçtiyse Türkçe.
const DB="https://analig-default-rtdb.firebaseio.com";
const RENK={artistik:"#4F46E5",ritmik:"#DB2777",aerobik:"#10B981",parkur:"#F59E0B",trampolin:"#F97316"};
const BAD={artistik:["Artistic Gymnastics","Artistik Cimnastik"],ritmik:["Rhythmic Gymnastics","Ritmik Cimnastik"],aerobik:["Aerobic Gymnastics","Aerobik Cimnastik"],parkur:["Parkour","Parkur"],trampolin:["Trampoline Gymnastics","Trampolin Cimnastik"]};
const TX={
 ttl:["International Entry Form","Uluslararası Kayıt Formu"],sub:["Nominative registration of federations","Federasyonların nominatif kaydı"],
 comp:["Competition","Yarışma"],sec:["— Select competition —","— Yarışma seçin —"],yuk:["Loading…","Yükleniyor…"],
 yok:["No international competition is open for entries.","Kayda açık uluslararası yarışma yok."],
 kapali:["Entries for this competition are closed.","Bu yarışmanın kayıtları kapalı."],
 bilgi:["Complete the nominative entry for your federation. Entries are reviewed by the organising committee before they appear in the start lists.","Federasyonunuzun nominatif kaydını doldurun. Kayıtlar başlangıç listelerine eklenmeden önce organizasyon komitesince incelenir."],
 fed:["Federation","Federasyon"],ulke:["Country / NOC","Ülke / NOC"],fsec:["— Select federation —","— Federasyon seçin —"],fad:["Federation name","Federasyon adı"],ops:["optional","isteğe bağlı"],
 kisi:["Contact person","İletişim kişisi"],mail:["E-mail","E-posta"],tel:["Phone","Telefon"],
 sp:["Gymnasts","Sporcular"],ad:["First name","Ad"],soyad:["Last name","Soyad"],dob:["Date of birth","Doğum tarihi"],fig:["WG ID","WG ID"],kat:["Category","Kategori"],ksec:["— Category —","— Kategori —"],kulup:["Club","Kulüp"],grup:["Group","Grup"],
 spEkle:["Add gymnast","Sporcu ekle"],grpNot:["Group / pair categories: give all members of the same group the same group number.","Grup / çift kategorileri: aynı grubun üyelerine aynı grup numarasını verin."],
 hk:["Judges","Hakemler"],hkAd:["Full name","Ad soyad"],hkKat:["WG brevet category","WG bröve kategorisi"],hkEkle:["Add judge","Hakem ekle"],
 gonder:["Submit entry","Kaydı gönder"],gonderiliyor:["Submitting…","Gönderiliyor…"],
 e_fed:["Please select your federation (country).","Lütfen federasyonu (ülke) seçin."],e_kisi:["Please enter a contact person and a valid e-mail.","Lütfen iletişim kişisi ve geçerli bir e-posta girin."],
 e_sp:["Add at least one gymnast.","En az bir sporcu ekleyin."],e_row:["Gymnast #{n}: first name, last name and category are required.","{n}. sporcu: ad, soyad ve kategori zorunludur."],e_gon:["Submission failed: ","Gönderilemedi: "],
 ok:["Entry submitted","Kayıt gönderildi"],okNot:["The organising committee will review your entry. Please keep the reference number for any correspondence.","Organizasyon komitesi kaydınızı inceleyecek. Yazışmalar için referans numarasını saklayın."],
 ref:["Reference","Referans"],yeni:["Submit another entry","Yeni kayıt gönder"],ozet:["Summary","Özet"],sporcuS:["gymnasts","sporcu"],hakemS:["judges","hakem"]};
const isGrp=(k,c)=>!!c&&(c.tip==="takim"||c.tip==="karma"||Number(c.athleteCount)>1)||/_(grup|cift|trio|takim|group|pair)$/.test(String(k).replace(/^final_/,"").split("__")[0]);
const CSS=GXP_CSS+`
.en-grid{display:grid;grid-template-columns:minmax(0,1.6fr) minmax(280px,1fr);gap:16px;align-items:start}.en-col{display:flex;flex-direction:column;gap:16px;min-width:0}
@media(max-width:1000px){.en-grid{grid-template-columns:1fr}}
.en-h2{display:flex;align-items:center;gap:10px;font-size:1.02rem;font-weight:800;margin:0 0 12px}.en-h2 small{font-weight:700;color:#94A3B8;font-size:.78rem}
.en-ic{width:32px;height:32px;border-radius:10px;display:grid;place-items:center;color:#fff;flex-shrink:0}.en-ic i{font-size:18px}
.en-f{display:flex;flex-direction:column;gap:6px;font-size:.78rem;font-weight:800;color:#475569;letter-spacing:.02em}.en-f span{font-weight:700;color:#94A3B8}
.en-in{width:100%;padding:10px 12px;border:1px solid var(--border,#E5E7EB);border-radius:12px;background:#fff;font:inherit;font-weight:700;font-size:.9rem;color:#1A1D26;box-sizing:border-box}
.en-in:focus{outline:2px solid var(--gxp-c);outline-offset:1px}
.en-2{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px}
.en-fed{display:flex;align-items:center;gap:10px}.en-fed .gx-ulke{flex-shrink:0}
.en-tbl{width:100%;border-collapse:separate;border-spacing:0 6px}.en-tbl th{font-size:.68rem;font-weight:900;color:#94A3B8;text-transform:uppercase;letter-spacing:.06em;text-align:left;padding:0 6px}
.en-tbl td{padding:0 3px}.en-tbl .en-in{padding:8px 9px;font-size:.86rem}.en-no{width:26px;text-align:center;font-weight:900;color:#94A3B8}
.en-rm{width:34px;height:34px;border-radius:10px;border:none;background:transparent;color:#94A3B8;cursor:pointer;display:grid;place-items:center}.en-rm:hover{background:#FEF2F2;color:#DC2626}
.en-add{display:inline-flex;align-items:center;gap:6px;margin-top:6px;padding:9px 14px;border-radius:12px;border:1.5px dashed color-mix(in srgb,var(--gxp-c) 45%,#fff);background:color-mix(in srgb,var(--gxp-c) 6%,#fff);color:var(--gxp-c);font:inherit;font-weight:800;font-size:.86rem;cursor:pointer}.en-add i{font-size:18px}
.en-note{font-size:.82rem;font-weight:600;color:#64748B;line-height:1.5;margin:8px 0 0}
.en-sum{display:flex;flex-direction:column;gap:8px}.en-sum div{display:flex;justify-content:space-between;gap:10px;font-size:.88rem;font-weight:700;color:#475569}.en-sum b{color:#1A1D26;font-weight:900}
.en-btn{width:100%;display:flex;align-items:center;justify-content:center;gap:8px;padding:13px 18px;border:none;border-radius:14px;font:inherit;font-weight:900;font-size:1rem;color:#fff;background:var(--gxp-c);cursor:pointer;box-shadow:0 10px 24px -10px var(--gxp-c);margin-top:14px}.en-btn:disabled{opacity:.5;cursor:not-allowed}
.en-msg{margin-top:10px;padding:10px 12px;border-radius:12px;font-size:.86rem;font-weight:800}.en-msg.err{background:#FEF2F2;border:1px solid #FECACA;color:#991B1B}
.en-brand{display:flex;align-items:center;gap:12px;margin-left:auto}.en-brand img{height:38px}.en-brand i{width:1px;height:30px;background:#E5E7EB}
.en-done{text-align:center;padding:40px 18px}.en-done>i{font-size:56px;color:#16A34A}.en-done h2{margin:8px 0 4px;font-weight:900}
.en-ref{display:inline-flex;align-items:center;gap:6px;margin:14px 0;font-size:.85rem;font-weight:900;color:var(--gxp-c);background:color-mix(in srgb,var(--gxp-c) 8%,#fff);border:1px solid color-mix(in srgb,var(--gxp-c) 30%,#fff);border-radius:999px;padding:5px 14px}
.en-foot{text-align:center;font-size:.75rem;font-weight:700;color:#94A3B8;margin-top:18px}
@media(max-width:720px){.en-hide{display:none}.en-brand{display:none}}`;
const j=async u=>{const r=await fetch(DB+u);if(!r.ok)throw new Error("HTTP "+r.status);return r.json()};

export default function IntlEntryPage(){
 const nav=useNav(),{firebasePath:FB,routePrefix:RP,id:br}=usDisc(),renk=RENK[br]||"#4F46E5";
 const L=(()=>{try{return localStorage.getItem("tcf_lang")==="tr"?1:0}catch{return 0}})(),t=k=>(TX[k]||[k,k])[L];
 R.useEffect(()=>{try{if(!L)document.documentElement.lang="en"}catch{}},[]);
 const qp=new URLSearchParams(location.search);
 const[list,setList]=R.useState(null),[comp,setComp]=R.useState(qp.get("comp")||""),[C,setC]=R.useState(null),[err,setErr]=R.useState("");
 const[fed,setFed]=R.useState(""),[fedAd,setFedAd]=R.useState(""),[kisi,setKisi]=R.useState(""),[mail,setMail]=R.useState(""),[tel,setTel]=R.useState("");
 const[rows,setRows]=R.useState([{}]),[jud,setJud]=R.useState([]),[busy,setBusy]=R.useState(!1),[hata,setHata]=R.useState(""),[done,setDone]=R.useState(null);
 R.useEffect(()=>{let ok=!0;(async()=>{try{const keys=Object.keys(await j(`/${FB}.json?shallow=true`)||{}),out=[];
  await Promise.all(keys.map(async k=>{try{const[tu,i,d,a]=await Promise.all(["tur","isim","baslangicTarihi","arsivli"].map(f=>j(`/${FB}/${k}/${f}.json`)));if(tu==="uluslararasi"&&!(a===!0||a==="true"))out.push({k,ad:i||k,d:d||""})}catch{}}));
  out.sort((a,b)=>String(b.d).localeCompare(String(a.d)));ok&&(setList(out),!comp&&out.length===1&&setComp(out[0].k))}catch(x){ok&&setErr(String(x.message||x))}})();return()=>{ok=!1}},[FB]);
 R.useEffect(()=>{if(!comp){setC(null);return}let ok=!0;(async()=>{try{const f=["isim","tur","kategoriler","baslangicTarihi","bitisTarihi","il","basvuruKapaliMi"],v=await Promise.all(f.map(x=>j(`/${FB}/${comp}/${x}.json`))),o={};f.forEach((x,i)=>o[x]=v[i]);o.kategoriler=o.kategoriler||{};ok&&setC(o)}catch(x){ok&&setErr(String(x.message||x))}})();return()=>{ok=!1}},[FB,comp]);
 const kats=C?.kategoriler||{},ks=Object.keys(kats).filter(k=>!/^final_/.test(k)),katAdi=k=>{const n=String(kats[k]?.name||k).replace(/^\s*\u{1F3C6}\s*/u,"");return L?n:katEN(n)};
 const setRow=(i,f,v)=>setRows(r=>r.map((x,ix)=>ix===i?{...x,[f]:v}:x)),setJ=(i,f,v)=>setJud(r=>r.map((x,ix)=>ix===i?{...x,[f]:v}:x));
 const dolu=rows.filter(r=>r.ad||r.soyad),ulkeSec=R.useMemo(()=>ULKELER.slice().sort((a,b)=>(L?a.tr:a.en).localeCompare(L?b.tr:b.en,L?"tr":"en")),[L]);
 const gonder=async()=>{setHata("");if(!fed)return setHata(t("e_fed"));if(!kisi.trim()||!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(mail.trim()))return setHata(t("e_kisi"));
  const sp=rows.map(r=>({ad:(r.ad||"").trim(),soyad:(r.soyad||"").trim(),dob:r.dob||"",...((r.figId||"").trim()?{figId:(r.figId||"").trim()}:{}),kat:r.kat||"",kulup:(r.kulup||"").trim(),grupNo:r.grupNo?+r.grupNo:(r.kat&&isGrp(r.kat,kats[r.kat])?1:null)})).filter(r=>r.ad||r.soyad);
  if(!sp.length)return setHata(t("e_sp"));const ix=sp.findIndex(r=>!r.ad||!r.soyad||!r.kat);if(ix>=0)return setHata(t("e_row").replace("{n}",ix+1));
  setBusy(!0);const kayit={ulke:fed,federasyon:fedAd.trim()||ulkeAd(fed,"en"),iletisim:{ad:kisi.trim(),email:mail.trim(),tel:tel.trim()},sporcular:sp,hakemler:jud.map(x=>({ad:(x.ad||"").trim(),kat:x.kat||""})).filter(x=>x.ad),durum:"beklemede",ts:Date.now(),kaynak:"entry",dil:L?"tr":"en"};
  try{const r=await fetch(`${DB}/${FB}/${comp}/uluslararasiKayit.json`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(kayit)});if(!r.ok)throw new Error("HTTP "+r.status);const k=(await r.json()).name;setDone({ref:String(k).slice(-8).toUpperCase(),n:sp.length,h:kayit.hakemler.length})}catch(x){setHata(t("e_gon")+(x.message||x))}setBusy(!1)};
 const yeni=()=>{setDone(null);setRows([{}]);setJud([]);setHata("")};
 const hdr=e.jsxs("div",{className:"gxp-hdr",children:[e.jsx("button",{type:"button",className:"gxp-back",onClick:()=>{history.length>1?nav(-1):nav(RP||"/")},title:L?__T("Geri"):"Back",children:e.jsx("i",{className:"material-icons-round",children:"arrow_back"})}),e.jsx("div",{className:"gxp-ic",children:e.jsx("i",{className:"material-icons-round",children:"how_to_reg"})}),e.jsxs("div",{className:"gxp-tt",children:[e.jsx("h1",{children:t("ttl")}),e.jsx("p",{children:t("sub")+" · "+(BAD[br]||BAD.ritmik)[L]})]}),
  e.jsxs("div",{className:"en-brand",children:[e.jsx("img",{src:"/logo.png",alt:"TCF"}),e.jsx("i",{}),e.jsx("img",{src:"/brand/gymnaxis-logo.svg",alt:"Gymexa Score"})]})]});
 const foot=e.jsxs("div",{className:"en-foot",children:["© ",new Date().getFullYear()," Gymexa Score · ",L?__T("Türkiye Cimnastik Federasyonu"):"Turkish Gymnastics Federation"]});
 const sel=e.jsxs("select",{className:"en-in",value:comp,onChange:ev=>{setComp(ev.target.value)},children:[e.jsx("option",{value:"",children:list===null?t("yuk"):t("sec")}),(list||[]).map(x=>e.jsx("option",{value:x.k,children:x.ad},x.k))]});
 if(err)return e.jsxs("div",{className:"gxp",style:{"--gxp-c":renk},children:[e.jsx("style",{children:CSS}),hdr,e.jsx("div",{className:"gxp-card gxp-empty",children:err}),foot]});
 if(list&&!list.length)return e.jsxs("div",{className:"gxp",style:{"--gxp-c":renk},children:[e.jsx("style",{children:CSS}),hdr,e.jsxs("div",{className:"gxp-card gxp-empty",children:[e.jsx("i",{className:"material-icons-round",children:"public_off"}),t("yok")]}),foot]});
 if(done)return e.jsxs("div",{className:"gxp",style:{"--gxp-c":renk},children:[e.jsx("style",{children:CSS}),hdr,e.jsxs("div",{className:"gxp-card en-done",children:[e.jsx("i",{className:"material-icons-round",children:"task_alt"}),e.jsx("h2",{children:t("ok")}),e.jsxs("p",{className:"en-note",children:[C?.isim||""," · ",ulkeAd(fed,L?"tr":"en")," · ",done.n," ",t("sporcuS"),done.h?` · ${done.h} ${t("hakemS")}`:""]}),e.jsxs("div",{className:"en-ref",children:[e.jsx("i",{className:"material-icons-round",style:{fontSize:16},children:"confirmation_number"}),t("ref"),": ",done.ref]}),e.jsx("p",{className:"en-note",children:t("okNot")}),e.jsxs("button",{type:"button",className:"en-add",onClick:yeni,children:[e.jsx("i",{className:"material-icons-round",children:"add"}),t("yeni")]})]}),foot]});
 const kapali=!!C?.basvuruKapaliMi;
 return e.jsxs("div",{className:"gxp",style:{"--gxp-c":renk},children:[e.jsx("style",{children:CSS}),hdr,
  e.jsxs("div",{className:"en-grid",children:[e.jsxs("div",{className:"en-col",children:[
   e.jsxs("div",{className:"gxp-card",children:[e.jsxs("h2",{className:"en-h2",children:[e.jsx("span",{className:"en-ic",style:{background:"#2563EB"},children:e.jsx("i",{className:"material-icons-round",children:"emoji_events"})}),t("comp")]}),sel,
    C?e.jsx("p",{className:"en-note",children:[(BAD[br]||BAD.ritmik)[L],[C.baslangicTarihi,C.bitisTarihi].filter(Boolean).join(" – "),C.il].filter(Boolean).join(" · ")}):null,
    kapali?e.jsx("div",{className:"en-msg err",children:t("kapali")}):e.jsx("p",{className:"en-note",children:t("bilgi")})]}),
   e.jsxs("div",{className:"gxp-card",children:[e.jsxs("h2",{className:"en-h2",children:[e.jsx("span",{className:"en-ic",style:{background:renk},children:e.jsx("i",{className:"material-icons-round",children:"groups"})}),t("sp"),e.jsx("small",{children:`(${dolu.length})`})]}),
    e.jsx("div",{style:{overflowX:"auto"},children:e.jsxs("table",{className:"en-tbl",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{}),e.jsx("th",{children:t("ad")}),e.jsx("th",{children:t("soyad")}),e.jsx("th",{className:"en-hide",children:t("dob")}),e.jsx("th",{className:"en-hide",children:t("fig")}),e.jsx("th",{children:t("kat")}),e.jsx("th",{className:"en-hide",children:t("kulup")}),e.jsx("th",{children:t("grup")}),e.jsx("th",{})]})}),
     e.jsx("tbody",{children:rows.map((r,i)=>{const g=r.kat&&isGrp(r.kat,kats[r.kat]);return e.jsxs("tr",{children:[e.jsx("td",{className:"en-no",children:i+1}),e.jsx("td",{children:e.jsx("input",{className:"en-in",value:r.ad||"",placeholder:t("ad"),onChange:ev=>setRow(i,"ad",ev.target.value)})}),e.jsx("td",{children:e.jsx("input",{className:"en-in",value:r.soyad||"",placeholder:t("soyad"),onChange:ev=>setRow(i,"soyad",ev.target.value)})}),
      e.jsx("td",{className:"en-hide",style:{width:150},children:e.jsx("input",{className:"en-in",type:"date",value:r.dob||"",onChange:ev=>setRow(i,"dob",ev.target.value)})}),
      e.jsx("td",{className:"en-hide",style:{width:120},children:e.jsx("input",{className:"en-in",value:r.figId||"",placeholder:t("ops"),onChange:ev=>setRow(i,"figId",ev.target.value)})}),
      e.jsx("td",{style:{minWidth:170},children:e.jsxs("select",{className:"en-in",value:r.kat||"",onChange:ev=>setRow(i,"kat",ev.target.value),children:[e.jsx("option",{value:"",children:t("ksec")}),ks.map(k=>e.jsx("option",{value:k,children:katAdi(k)},k))]})}),
      e.jsx("td",{className:"en-hide",children:e.jsx("input",{className:"en-in",value:r.kulup||"",placeholder:t("kulup")+" ("+t("ops")+")",onChange:ev=>setRow(i,"kulup",ev.target.value)})}),
      e.jsx("td",{style:{width:74},children:g?e.jsx("input",{className:"en-in",type:"number",min:"1",value:r.grupNo||1,onChange:ev=>setRow(i,"grupNo",ev.target.value)}):e.jsx("span",{className:"en-note",children:"—"})}),
      e.jsx("td",{style:{width:36},children:e.jsx("button",{type:"button",className:"en-rm",onClick:()=>setRows(x=>x.length>1?x.filter((_,ix)=>ix!==i):[{}]),children:e.jsx("i",{className:"material-icons-round",children:"close"})})})]},i)})})]})}),
    e.jsxs("button",{type:"button",className:"en-add",onClick:()=>setRows(x=>{const l=x[x.length-1]||{};return[...x,{kat:l.kat||"",kulup:l.kulup||"",grupNo:l.grupNo||""}]}),children:[e.jsx("i",{className:"material-icons-round",children:"person_add"}),t("spEkle")]}),e.jsx("p",{className:"en-note",children:t("grpNot")})]}),
   e.jsxs("div",{className:"gxp-card",children:[e.jsxs("h2",{className:"en-h2",children:[e.jsx("span",{className:"en-ic",style:{background:"#7C3AED"},children:e.jsx("i",{className:"material-icons-round",children:"gavel"})}),t("hk"),e.jsx("small",{children:"("+t("ops")+")"})]}),
    jud.length?e.jsx("table",{className:"en-tbl",children:e.jsx("tbody",{children:jud.map((r,i)=>e.jsxs("tr",{children:[e.jsx("td",{className:"en-no",children:i+1}),e.jsx("td",{children:e.jsx("input",{className:"en-in",value:r.ad||"",placeholder:t("hkAd"),onChange:ev=>setJ(i,"ad",ev.target.value)})}),e.jsx("td",{style:{width:190},children:e.jsxs("select",{className:"en-in",value:r.kat||"",onChange:ev=>setJ(i,"kat",ev.target.value),children:[e.jsx("option",{value:"",children:t("hkKat")}),["1","2","3","4"].map(k=>e.jsx("option",{value:k,children:"WG "+k},k))]})}),e.jsx("td",{style:{width:36},children:e.jsx("button",{type:"button",className:"en-rm",onClick:()=>setJud(x=>x.filter((_,ix)=>ix!==i)),children:e.jsx("i",{className:"material-icons-round",children:"close"})})})]},i))})}):null,
    e.jsxs("button",{type:"button",className:"en-add",onClick:()=>setJud(x=>[...x,{}]),children:[e.jsx("i",{className:"material-icons-round",children:"add"}),t("hkEkle")]})]})]}),
  e.jsxs("div",{className:"en-col",children:[
   e.jsxs("div",{className:"gxp-card",children:[e.jsxs("h2",{className:"en-h2",children:[e.jsx("span",{className:"en-ic",style:{background:"#0891B2"},children:e.jsx("i",{className:"material-icons-round",children:"flag"})}),t("fed")]}),
    e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:12},children:[e.jsxs("label",{className:"en-f",children:[t("ulke")+" *",e.jsxs("div",{className:"en-fed",children:[fed?UlkeEtiket(e,fed,{boy:18}):null,e.jsxs("select",{className:"en-in",value:fed,onChange:ev=>setFed(ev.target.value),children:[e.jsx("option",{value:"",children:t("fsec")}),ulkeSec.map(u=>e.jsx("option",{value:u.kod,children:(L?u.tr:u.en)+" ("+u.kod+")"},u.kod))]})]})]}),
     e.jsxs("label",{className:"en-f",children:[e.jsxs("div",{children:[t("fad")," ",e.jsx("span",{children:"("+t("ops")+")"})]}),e.jsx("input",{className:"en-in",value:fedAd,onChange:ev=>setFedAd(ev.target.value),placeholder:fed?ulkeAd(fed,"en")+" Gymnastics Federation":""})]}),
     e.jsxs("label",{className:"en-f",children:[t("kisi")+" *",e.jsx("input",{className:"en-in",value:kisi,onChange:ev=>setKisi(ev.target.value)})]}),
     e.jsxs("div",{className:"en-2",children:[e.jsxs("label",{className:"en-f",children:[t("mail")+" *",e.jsx("input",{className:"en-in",type:"email",value:mail,onChange:ev=>setMail(ev.target.value),placeholder:"name@federation.org"})]}),e.jsxs("label",{className:"en-f",children:[t("tel"),e.jsx("input",{className:"en-in",value:tel,onChange:ev=>setTel(ev.target.value),placeholder:"+…"})]})]})]})]}),
   e.jsxs("div",{className:"gxp-card",style:{position:"sticky",top:16},children:[e.jsxs("h2",{className:"en-h2",children:[e.jsx("span",{className:"en-ic",style:{background:"#16A34A"},children:e.jsx("i",{className:"material-icons-round",children:"fact_check"})}),t("ozet")]}),
    e.jsxs("div",{className:"en-sum",children:[e.jsxs("div",{children:[t("comp"),e.jsx("b",{children:C?.isim||"—"})]}),e.jsxs("div",{children:[t("fed"),e.jsx("b",{children:fed?ulkeAd(fed,L?"tr":"en")+" ("+fed+")":"—"})]}),e.jsxs("div",{children:[t("sp"),e.jsx("b",{children:dolu.length})]}),e.jsxs("div",{children:[t("hk"),e.jsx("b",{children:jud.filter(x=>x.ad).length})]})]}),
    e.jsxs("button",{type:"button",className:"en-btn",disabled:busy||kapali||!C,onClick:gonder,children:[e.jsx("i",{className:"material-icons-round",children:"send"}),busy?t("gonderiliyor"):t("gonder")]}),hata?e.jsx("div",{className:"en-msg err",children:hata}):null]})]})]}),foot]})}
