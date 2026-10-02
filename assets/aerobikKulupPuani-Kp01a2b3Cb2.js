// Aerobik "kulüplerarası" kulüp takım puanı.
// Kural: Takım puanı = Tekler + Çiftler + Trio.
//  - Tekler : kulübün tüm ferdi (erkek + kız, her yaş) kategorilerindeki EN YÜKSEK tek puanı
//  - Çiftler: kulübün tüm çift kategorilerindeki EN YÜKSEK puan
//  - Trio   : kulübün tüm trio kategorilerindeki EN YÜKSEK puan
// Takım puanı için en az 2 bileşende puan gerekir (Tekler+Çiftler, Tekler+Trio veya Çiftler+Trio);
// aksi halde kulüp takım sıralamasına alınmaz.
// Yalnızca yarışmada kuluplerarasi===true ise kullanılır; mevcut takım hesabına dokunmaz.
import{A as V}from"./aerobikCriteriaDefaults-ld4mBtrICb2.js";

const isFinal=c=>/^final_/.test(c);
const cfg=c=>V[c]||V[String(c||"").replace(/^final_/,"")]||{};
const isTeam=c=>{const d=cfg(c);return d.tip==="takim"||d.tip==="karma"||d.athleteCount>1||d.group==="Step Aerobik"};
const scoreOf=sc=>{const v=sc&&(sc.finalScore!=null?sc.finalScore:(sc.sonuc!=null?sc.sonuc:null));return v==null||isNaN(v)?null:Number(v)};
const We=s=>(s||"").trim().replace(/[.#$[\]/]/g,"-").slice(0,60);
const UP=s=>String(s||"").trim().toLocaleUpperCase("tr-TR");
// kulüp kimliği: "G.S.K" ile "G.S.K." aynı kulüp sayılır
const KK=s=>UP(s).replace(/[^A-Z0-9ÇĞİÖŞÜ]/g,"");

const BILESEN=[["tekler","Tekler"],["ciftler","Çiftler"],["trio","Trio"]];
const MIN_BILESEN=2;
// kategori hangi bileşene girer (final kategorileri hariç)
const turOf=c=>{if(isFinal(c))return null;const d=cfg(c);
 if(d.tip==="ferdi")return"tekler";
 if(/_cift$/.test(c)||(d.tip==="karma"&&d.athleteCount===2))return"ciftler";
 if(/_trio$/.test(c)||d.athleteCount===3)return"trio";
 return null};
const varsayilan=cats=>{const o={tekler:[],ciftler:[],trio:[]};Object.keys(cats||{}).sort().forEach(c=>{const t=turOf(c);t&&o[t].push(c)});return o};
// kayıtlı seçim (surum 2) varsa onu, yoksa varsayılanı kullan
const etkinKurallar=comp=>{const cats=comp?.kategoriler||{},v=varsayilan(cats),k=comp?.kulupPuani;
 if(k&&k.surum===2)BILESEN.forEach(([id])=>{const a=Array.isArray(k[id])?k[id]:Object.values(k[id]||{});if(k[id]!=null)v[id]=a.filter(c=>cats[c]&&turOf(c)===id)});
 return v};

// Bir kategorideki puanlı girişler (ferdi sporcu / çift-trio takımı)
const girisler=(comp,cat)=>{
 const sp=comp?.sporcular?.[cat]||{},sc=comp?.puanlar?.[cat]||{},team=isTeam(cat),out=[];
 const uyeler=key=>{const p=String(key).split("::"),gn=p[p.length-1],ok=p.length>=3?p.slice(1,-1).join("::"):"";
  return Object.entries(sp).filter(([,m])=>m&&String(m.grupNo??m.cikisSirasi??"")===String(gn)&&(ok===""||String(m.okul||m.kulup||"")===ok||We(m.okul||m.kulup)===ok))};
 Object.entries(sc).forEach(([id,s])=>{
  const v=scoreOf(s);if(v==null)return;
  let ok="",il="",ad="";
  if(team){const mem=uyeler(id);
   if(mem.length){const m0=mem[0][1];ok=m0.okul||m0.kulup||"";il=m0.il||"";
    ad=[...new Set(mem.map(([,m])=>[m.ad,m.soyad].filter(Boolean).join(" ")).filter(Boolean))].join(", ")}
   else{const p=String(id).split("::");ok=p.length>=3?p.slice(1,-1).join("::"):""}}
  else{const m=sp[id]||{};ok=m.okul||m.kulup||"";il=m.il||"";ad=[m.ad,m.soyad].filter(Boolean).join(" ")}
  ok=String(ok).trim();il=String(il).trim();
  const ilDen=!ok&&!!il;if(ilDen)ok=il; // kulüp boşsa il adı
  if(!ok)return;
  out.push({cat,id,score:v,okul:ok,il,ilDen,ad:ad||id})});
 return out;
};

// Kulüp sıralaması
const hesaplaTablo=comp=>{
 const kur=etkinKurallar(comp),cats=comp?.kategoriler||{};
 const bloklar=BILESEN.map(([id,ad])=>({id,ad,kategoriler:kur[id]}));
 const kulup={};
 bloklar.forEach(b=>b.kategoriler.forEach(c=>girisler(comp,c).forEach(g=>{
  const k=KK(g.okul);if(!k)return;
  kulup[k]||(kulup[k]={ad:g.okul,il:g.il,ilDen:g.ilDen,en:{}});
  if(!kulup[k].il&&g.il)kulup[k].il=g.il;
  const cur=kulup[k].en[b.id];if(!cur||g.score>cur.score)kulup[k].en[b.id]={...g,catAd:cats[c]?.name||cfg(c).label||c}})));
 let satirlar=Object.entries(kulup).map(([k,o])=>{
  const det={};let toplam=0,kac=0;
  bloklar.forEach(b=>{const g=o.en[b.id];det[b.id]=g?{deger:g.score,kac:1,sayilan:[g],en:g}:{deger:0,kac:0,sayilan:[],en:null};if(g){toplam+=g.score;kac++}});
  return{key:k,ad:o.ad,il:o.il,ilDen:o.ilDen,det,toplam,ceza:0,net:toplam,bilesenSayisi:kac}});
 // en az 2 bileşende puanı olmayan kulüp sıralamaya girmez
 const disarida=satirlar.filter(r=>r.bilesenSayisi<MIN_BILESEN).sort((a,b)=>b.net-a.net);
 satirlar=satirlar.filter(r=>r.bilesenSayisi>=MIN_BILESEN);
 // toplam puan; eşitlikte daha çok bileşende puanı olan, sonra Tekler, Çiftler, Trio
 const r3=v=>Math.round((v||0)*1e3);
 satirlar.sort((a,b)=>r3(b.net)-r3(a.net)||b.bilesenSayisi-a.bilesenSayisi||r3(b.det.tekler.deger)-r3(a.det.tekler.deger)||r3(b.det.ciftler.deger)-r3(a.det.ciftler.deger)||r3(b.det.trio.deger)-r3(a.det.trio.deger)||a.ad.localeCompare(b.ad,"tr"));
 let pr=null,rk=0;satirlar.forEach((r,i)=>{const k=[r3(r.net),r.bilesenSayisi,r3(r.det.tekler.deger),r3(r.det.ciftler.deger),r3(r.det.trio.deger)].join("|");if(k!==pr)rk=i+1;pr=k;r.sira=rk});
 return{satirlar,bloklar,disarida,cezaDus:!1};
};

const kullanilirMi=comp=>comp?.kuluplerarasi===!0;

export{isFinal,cfg,isTeam,scoreOf,We,UP,KK,BILESEN,MIN_BILESEN,turOf,varsayilan,etkinKurallar,girisler,hesaplaTablo,kullanilirMi};
