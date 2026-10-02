// Aerobik "kulüplerarası" kulüp puanı: kural şeması + hesaplama.
// Yalnızca yarışmada kuluplerarasi===true ve kulupPuani.aktif===true ise kullanılır;
// aksi halde mevcut takım hesabı hiç etkilenmez.
import{A as V}from"./aerobikCriteriaDefaults-ld4mBtrICb2.js";

const isFinal=c=>/^final_/.test(c);
const cfg=c=>V[c]||V[String(c||"").replace(/^final_/,"")]||{};
const isTeam=c=>{const d=cfg(c);return d.tip==="takim"||d.tip==="karma"||d.athleteCount>1||d.group==="Step Aerobik"};
const scoreOf=sc=>{const v=sc&&(sc.finalScore!=null?sc.finalScore:(sc.sonuc!=null?sc.sonuc:null));return v==null||isNaN(v)?null:Number(v)};
const We=s=>(s||"").trim().replace(/[.#$[\]/]/g,"-").slice(0,60);
const UP=s=>String(s||"").trim().toLocaleUpperCase("tr-TR");

// Blok başına toplama yöntemleri
const YON=[["enIyi","En iyi N puanın toplamı"],["kategoriEnIyi","Her kategoriden en iyi N'in toplamı"],["toplam","Tüm puanların toplamı"],["ortalama","Tüm puanların ortalaması"],["enIyiOrt","En iyi N puanın ortalaması"]];
const yonAd=y=>(YON.find(x=>x[0]===y)||YON[0])[1];
const needsN=y=>y==="enIyi"||y==="enIyiOrt"||y==="kategoriEnIyi";

// gs: puana göre azalan sıralanmış girişler -> {deger, sayilan}
const hesapla=(gs,y,n)=>{
 if(!gs.length)return{deger:0,sayilan:[]};
 const k=Math.max(1,parseInt(n)||1),sum=a=>a.reduce((x,g)=>x+g.score,0);
 if(y==="toplam")return{deger:sum(gs),sayilan:gs};
 if(y==="ortalama")return{deger:sum(gs)/gs.length,sayilan:gs};
 if(y==="kategoriEnIyi"){const per={};gs.forEach(g=>{(per[g.cat]||(per[g.cat]=[])).push(g)});
  const t=[];Object.keys(per).forEach(c=>t.push(...per[c].slice(0,k)));
  t.sort((a,b)=>b.score-a.score);return{deger:sum(t),sayilan:t}}
 const t=gs.slice(0,k);
 return y==="enIyiOrt"?{deger:t.length?sum(t)/t.length:0,sayilan:t}:{deger:sum(t),sayilan:t};
};

const yeniId=()=>"b"+Math.random().toString(36).slice(2,8);
const BOS=()=>({id:yeniId(),ad:"",kategoriler:[],yontem:"enIyi",adet:1,katsayi:1,zorunlu:!1});
const normBlok=b=>({id:b.id||yeniId(),ad:b.ad||"",kategoriler:Array.isArray(b.kategoriler)?b.kategoriler:Object.values(b.kategoriler||{}),yontem:b.yontem||"enIyi",adet:b.adet==null?1:Number(b.adet),katsayi:b.katsayi==null?1:Number(b.katsayi),zorunlu:b.zorunlu===!0});
const normCfg=k=>({aktif:k?.aktif===!0,cezaDus:k?.cezaDus===!0,bloklar:(Array.isArray(k?.bloklar)?k.bloklar:Object.values(k?.bloklar||{})).filter(Boolean).map(normBlok)});

// Hazır kurulum taslağı: yarışmadaki kategorilere göre blok önerisi
const hazirBloklar=cats=>{
 const real=Object.keys(cats||{}).filter(c=>!isFinal(c)),pick=fn=>real.filter(fn),tek=pick(c=>cfg(c).tip==="ferdi");
 return[
  {ad:"Tek Erkek",k:tek.filter(c=>cfg(c).cinsiyet==="Erkek")},
  {ad:"Tek Kadın",k:tek.filter(c=>cfg(c).cinsiyet==="Kız"||cfg(c).cinsiyet==="Kadın")},
  {ad:"Tekler (diğer)",k:tek.filter(c=>!["Erkek","Kız","Kadın"].includes(cfg(c).cinsiyet))},
  {ad:"Çiftler",k:pick(c=>cfg(c).tip==="karma"||/_cift$/.test(c))},
  {ad:"Trio",k:pick(c=>/_trio$/.test(c))},
  {ad:"Grup",k:pick(c=>/_grup$/.test(c))},
  {ad:"Dans",k:pick(c=>/_dans$/.test(c))},
  {ad:"Step",k:pick(c=>cfg(c).group==="Step Aerobik")}
 ].filter(t=>t.k.length).map(t=>({...BOS(),ad:t.ad,kategoriler:t.k,yontem:"enIyi",adet:1}));
};

// Bir kategorideki puanlı girişler (ferdi sporcu / çift-trio-grup takımı)
const girisler=(comp,cat)=>{
 const spor=comp?.sporcular||{},pun=comp?.puanlar||{};
 const sc=pun[cat]||{},sp=spor[cat]||{},team=isTeam(cat),out=[];
 const uyeler=key=>{const parts=String(key).split("::"),gn=parts[parts.length-1],ok=parts.length>=3?parts.slice(1,-1).join("::"):"";
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
  // kulup/okul bos ise (il bazli yarisma) il adi kullanilir
  const ilDen=!ok&&!!il;if(ilDen)ok=il;
  if(!ok)return;
  out.push({cat,id,score:v,okul:ok,il,ilDen,ad:ad||id})});
 return out;
};

// Kulüp sıralaması. comp: yarışma düğümü, kurallar: normCfg çıktısı
const hesaplaTablo=(comp,kurallar,hariç)=>{
 const k=normCfg(kurallar),bl=k.bloklar.filter(b=>b.kategoriler.length);
 if(!bl.length)return{satirlar:[],bloklar:[],cezaDus:k.cezaDus};
 const cezalar=comp?.teamDeductions||{},dis=hariç instanceof Set?hariç:new Set(hariç||[]);
 const kulup={},secilen=new Set();
 bl.forEach(b=>b.kategoriler.forEach(c=>secilen.add(c)));
 const cache={};[...secilen].forEach(c=>cache[c]=girisler(comp,c));
 bl.forEach(b=>b.kategoriler.forEach(c=>(cache[c]||[]).forEach(g=>{
  if(dis.has(g.okul))return;
  const kk=UP(g.okul);kulup[kk]||(kulup[kk]={ad:g.okul,il:g.il,bloklar:{}});
  if(!kulup[kk].il&&g.il)kulup[kk].il=g.il;
  (kulup[kk].bloklar[b.id]||(kulup[kk].bloklar[b.id]=[])).push(g)})));
 let satirlar=Object.entries(kulup).map(([kk,o])=>{
  const det={};let toplam=0,eksik=!1;
  bl.forEach(b=>{
   const gs=(o.bloklar[b.id]||[]).slice().sort((x,z)=>z.score-x.score);
   const r=hesapla(gs,b.yontem,b.adet),deger=r.deger*(b.katsayi==null?1:Number(b.katsayi)||0);
   det[b.id]={deger,kac:r.sayilan.length,girisler:gs,sayilan:r.sayilan};
   toplam+=deger;if(b.zorunlu&&!gs.length)eksik=!0});
  const ceza=k.cezaDus?Object.values(cezalar).filter(d=>UP(d.teamName)===kk&&(!d.categoryId||secilen.has(d.categoryId))).reduce((s,d)=>s+(parseFloat(d.amount)||0),0):0;
  return{key:kk,ad:o.ad,il:o.il,det,toplam,ceza,net:toplam-ceza,eksik}});
 satirlar=satirlar.filter(r=>r.toplam>0||!r.eksik);
 satirlar.sort((a,b)=>a.eksik!==b.eksik?(a.eksik?1:-1):Math.round(b.net*1e3)-Math.round(a.net*1e3));
 let pr=null,rk=0;satirlar.forEach((r,i)=>{if(r.eksik){r.sira=null;return}const v=Math.round(r.net*1e3);if(pr===null||v!==pr)rk=i+1;pr=v;r.sira=rk});
 return{satirlar,bloklar:bl,cezaDus:k.cezaDus};
};

// Yarışmada kulüp puanı kullanılacak mı?
const kullanilirMi=comp=>comp?.kuluplerarasi===!0&&comp?.kulupPuani?.aktif===!0&&(Array.isArray(comp.kulupPuani.bloklar)?comp.kulupPuani.bloklar:Object.values(comp.kulupPuani.bloklar||{})).some(b=>b&&(Array.isArray(b.kategoriler)?b.kategoriler.length:Object.keys(b.kategoriler||{}).length));

export{isFinal,cfg,isTeam,scoreOf,We,UP,YON,yonAd,needsN,hesapla,BOS,normBlok,normCfg,hazirBloklar,girisler,hesaplaTablo,kullanilirMi};
