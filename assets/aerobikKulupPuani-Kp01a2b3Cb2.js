// Aerobik "kulüplerarası" kulüp takım puanı.
// Yapı: birden fazla TAKIM KATEGORİSİ (ör. Yıldızlar, Gençler). Her takım kategorisinde
// sırayla PUAN TÜRLERİ (1. puan, 2. puan, ...): adı kullanıcı verir, hangi kategorilerden
// alınacağını seçer. Her puan türünde kulübün o kategorilerdeki EN YÜKSEK tek puanı alınır.
// Takım puanı = puan türlerinin toplamı. En az `minPuan` (varsayılan 2) puan türünde puanı
// olmayan kulüp o takım sıralamasına girmez.
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
const MIN_PUAN=2;
const grupOf=c=>cfg(c).group||"";
const arr=x=>Array.isArray(x)?x.filter(v=>v!=null):Object.values(x||{}).filter(v=>v!=null);
const yeniId=p=>p+Math.random().toString(36).slice(2,8);

// Hazır kurulum: yarışmadaki her yaş grubu için Tekler / Çiftler-Trio / Grup
const varsayilanSiralamalar=cats=>{
 const real=Object.keys(cats||{}).filter(c=>!isFinal(c)).sort(),gruplar=[];
 real.forEach(c=>{const g=grupOf(c);g&&g!=="Step Aerobik"&&!gruplar.includes(g)&&gruplar.push(g)});
 const SIRA=["Minikler","Küçükler","Yıldızlar","Gençler","Büyükler"];
 gruplar.sort((a,b)=>(SIRA.indexOf(a)+99)%99-(SIRA.indexOf(b)+99)%99||a.localeCompare(b,"tr"));
 return gruplar.map(g=>{const gc=real.filter(c=>grupOf(c)===g);
  const puanlar=[
   {ad:"Tekler",kategoriler:gc.filter(c=>cfg(c).tip==="ferdi")},
   {ad:"Çiftler / Trio",kategoriler:gc.filter(c=>/_(cift|trio)$/.test(c))},
   {ad:"Grup",kategoriler:gc.filter(c=>/_grup$/.test(c))}
  ].filter(p=>p.kategoriler.length).map((p,i)=>({id:"p"+(i+1),...p}));
  return{id:"s_"+KK(g).toLowerCase(),ad:g,grup:g,minPuan:MIN_PUAN,puanlar}}).filter(s=>s.puanlar.length);
};
const normSiralama=s=>({id:s.id||yeniId("s"),ad:String(s.ad||""),grup:s.grup||"",minPuan:Math.max(1,parseInt(s.minPuan)||MIN_PUAN),
 puanlar:arr(s.puanlar).map(p=>({id:p.id||yeniId("p"),ad:String(p.ad||""),kategoriler:arr(p.kategoriler)}))});
// Etkin takım sıralamaları: kayıtlı (surum 3) yoksa hazır kurulum
const siralamalar=comp=>{const k=comp?.kulupPuani,cats=comp?.kategoriler||{};
 if(k&&k.surum===3)return arr(k.siralamalar).map(normSiralama).map(s=>({...s,puanlar:s.puanlar.map(p=>({...p,kategoriler:p.kategoriler.filter(c=>cats[c])}))}));
 return varsayilanSiralamalar(cats)};

// Bir kategorideki puanlı girişler (ferdi sporcu / çift-trio-grup takımı)
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

// Bir takım sıralamasının tablosu. sir verilmezse ilk sıralama kullanılır.
const hesaplaTablo=(comp,sir)=>{
 sir=sir?normSiralama(sir):siralamalar(comp)[0];
 if(!sir)return{siralama:null,satirlar:[],bloklar:[],disarida:[],minPuan:MIN_PUAN};
 const cats=comp?.kategoriler||{},bloklar=sir.puanlar.map((p,i)=>({id:p.id,ad:p.ad||(i+1)+". Puan",kategoriler:p.kategoriler}));
 const minPuan=Math.min(sir.minPuan||MIN_PUAN,Math.max(1,bloklar.length));
 const kulup={},cache={};
 bloklar.forEach(b=>b.kategoriler.forEach(c=>{(cache[c]||(cache[c]=girisler(comp,c))).forEach(g=>{
  const k=KK(g.okul);if(!k)return;
  kulup[k]||(kulup[k]={ad:g.okul,il:g.il,ilDen:g.ilDen,en:{}});
  if(!kulup[k].il&&g.il)kulup[k].il=g.il;
  const cur=kulup[k].en[b.id];if(!cur||g.score>cur.score)kulup[k].en[b.id]={...g,catAd:cats[c]?.name||cfg(c).label||c}})}));
 let satirlar=Object.entries(kulup).map(([k,o])=>{
  const det={};let toplam=0,kac=0;
  bloklar.forEach(b=>{const g=o.en[b.id];det[b.id]=g?{deger:g.score,kac:1,sayilan:[g],en:g}:{deger:0,kac:0,sayilan:[],en:null};if(g){toplam+=g.score;kac++}});
  return{key:k,ad:o.ad,il:o.il,ilDen:o.ilDen,det,toplam,ceza:0,net:toplam,bilesenSayisi:kac}});
 const disarida=satirlar.filter(r=>r.bilesenSayisi<minPuan).sort((a,b)=>b.net-a.net);
 satirlar=satirlar.filter(r=>r.bilesenSayisi>=minPuan);
 // toplam; eşitlikte daha çok puan türü, sonra puan türleri sırasıyla
 const r3=v=>Math.round((v||0)*1e3),anah=r=>[r3(r.net),r.bilesenSayisi,...bloklar.map(b=>r3(r.det[b.id].deger))];
 satirlar.sort((a,b)=>{const x=anah(a),y=anah(b);for(let i=0;i<x.length;i++)if(x[i]!==y[i])return y[i]-x[i];return a.ad.localeCompare(b.ad,"tr")});
 let pr=null,rk=0;satirlar.forEach((r,i)=>{const k=anah(r).join("|");if(k!==pr)rk=i+1;pr=k;r.sira=rk});
 return{siralama:sir,satirlar,bloklar,disarida,minPuan,cezaDus:!1};
};

const kullanilirMi=comp=>comp?.kuluplerarasi===!0;

export{isFinal,cfg,isTeam,scoreOf,We,UP,KK,MIN_PUAN,grupOf,varsayilanSiralamalar,normSiralama,siralamalar,girisler,hesaplaTablo,kullanilirMi};
