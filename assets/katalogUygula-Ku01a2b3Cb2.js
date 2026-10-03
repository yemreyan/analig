// Kategori katalogu: criteria/kategoriKatalog/<brans>/<kod> kayitlarini sabit kategori
// tanimlarinin (ritmik/aerobik/trampolin/parkur/artistik defaults) ustune uygular.
// - Var olan kategori: verilen alanlar (ad, grup, tip, kisi sayisi, aletler...) uzerine yazilir.
// - Yeni kategori: tanima eklenir (yarisma formunda ve puanlama mantiginda gorunur).
// - aktif:false  -> gizli:true (yeni yarismalarda secilemez; mevcut yarismalar etkilenmez).
// Hicbir modul import etmez (dongusel import olmamasi icin). Once localStorage onbellegi
// (senkron), ardindan REST ile guncel katalog uygulanir. Katalog bossa hicbir sey degismez.
const URL="https://analig-default-rtdb.firebaseio.com/criteria/kategoriKatalog/";
const G=globalThis.__TCF_KATALOG||(globalThis.__TCF_KATALOG={});
const ALANLAR=["label","group","tip","cinsiyet","athleteCount","aletler","grupMu","kademe"];
const liste=x=>Array.isArray(x)?x.filter(v=>v!=null&&v!==""):x&&typeof x==="object"?Object.values(x).filter(v=>v!=null&&v!==""):[];

function birlestir(brans,hedef,veri,opt){
 if(!hedef||!veri||typeof veri!=="object")return;
 G[brans]=veri;
 Object.entries(veri).forEach(([k,v])=>{
  if(!v||typeof v!=="object")return;
  if(opt&&opt.artistik){
   // artistik: hedef[k] = {alet:{kurallar}}; yeni kategori icin sablondan kural kopyalanir
   const al=liste(v.aletler);if(!al.length&&hedef[k])return;
   const tpl=hedef[v.sablon]||{},cur=hedef[k]||(hedef[k]={});
   al.forEach(a=>{if(!cur[a])cur[a]=JSON.parse(JSON.stringify(tpl[a]||{bonus:{maxE:10,requiredD:0,value:0},hakemSayisi:4}))});
   return;
  }
  const alan={};
  ALANLAR.forEach(f=>{const x=v[f];if(x===undefined||x===null||x==="")return;alan[f]=f==="aletler"?liste(x):f==="athleteCount"?(parseInt(x)||1):x});
  const cur=hedef[k];
  if(cur){Object.assign(cur,alan);if(v.aktif===!1)cur.gizli=!0;else delete cur.gizli}
  else hedef[k]={...alan,_katalog:!0,...(v.aktif===!1?{gizli:!0}:{})};
 });
}

export function uygula(brans,hedef,opt){
 const K="tcf_katalog_"+brans;
 try{const s=localStorage.getItem(K);s&&birlestir(brans,hedef,JSON.parse(s),opt)}catch{}
 try{fetch(URL+encodeURIComponent(brans)+".json",{cache:"no-store"}).then(r=>r.ok?r.json():null).then(d=>{
  try{localStorage.setItem(K,JSON.stringify(d||{}))}catch{}
  birlestir(brans,hedef,d||{},opt)}).catch(()=>{})}catch{}
}
export function katalog(brans){return G[brans]||{}}
