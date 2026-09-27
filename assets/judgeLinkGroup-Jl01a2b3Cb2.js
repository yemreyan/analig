import{r as R}from"./vendor-react-Cxw6bqwhCb2.js";
import{k as ref,o as onValue}from"./vendor-firebase-940mxgRVCb2.js";
import{d as db}from"./main-C2LpyYUGCb2.js";
import{R as RC,a as RA}from"./ritmikCriteriaDefaults-CgOlnfQcCb2.js";
import"./modulepreload-polyfill-B5Qt9EMXCb2.js";

const NODE="hakemLinkleri";
const norm=k=>String(k||"").replace(/^final_/,"");

// Hakem linkinin kapsadigi kategorileri cozer ve o an cagri yapilmis olani dondurur.
// Tek kategorili klasik link (catId=xyz) hicbir ek aboneligi tetiklemez; davranis aynen korunur.
function useAktifKategori(base,comp,catParam,linkId,alet){
 const raw=String(catParam||"").trim();
 const tek=!linkId&&!!raw&&raw!=="__ALL__"&&raw.indexOf(",")===-1;
 const [kume,setKume]=R.useState(tek?[raw]:[]);
 const [tumu,setTumu]=R.useState(!linkId&&raw==="__ALL__");
 const [grupAd,setGrupAd]=R.useState("");
 const [yok,setYok]=R.useState(!1);

 R.useEffect(()=>{
  if(tek){setKume([raw]);setTumu(!1);setGrupAd("");setYok(!1);return}
  if(linkId){
   if(!comp)return;
   return onValue(ref(db,`${base}/${comp}/${NODE}/${linkId}`),s=>{
    const v=s.val();
    if(!v){setYok(!0);setKume([]);setTumu(!1);setGrupAd("");return}
    setYok(!1);setGrupAd(v.ad||"");
    if(v.tumKategoriler===!0){setTumu(!0);setKume([])}
    else{setTumu(!1);setKume(Object.keys(v.kategoriler||{}).filter(k=>v.kategoriler[k]))}
   });
  }
  if(raw==="__ALL__"){setTumu(!0);setKume([]);return}
  setTumu(!1);setKume(raw?raw.split(",").map(z=>z.trim()).filter(Boolean):[]);
 },[base,comp,raw,linkId,tek]);

 const anahtar=kume.join("|");
 const [aktif,setAktif]=R.useState(tek?raw:"");
 const _al=String(alet||"").trim();
 R.useEffect(()=>{
  if(tek){setAktif(raw);return}
  if(!comp)return;
  // Alet sabitse (alet bazli link/QR) aktif kategori O ALETE gore secilir;
  // aksi halde baska bir alette yapilan daha yeni cagri paneli yanlis
  // kategoriye kaydiriyordu.
  if(_al){
   return onValue(ref(db,`${base}/${comp}/aktifSporcuAlet`),s=>{
    const v=s.val()||{},izin=k=>tumu||kume.indexOf(k)>=0||kume.indexOf(norm(k))>=0;
    let en=null,zaman=-1;
    Object.keys(v).forEach(k=>{
     if(!izin(k))return;
     const c=v[k]&&v[k][_al];
     if(!c)return;
     const t=Number(c.ts)||1;
     if(t>=zaman){zaman=t;en=k}
    });
    if(en)setAktif(en);
    else setAktif(o=>o||kume[0]||"");
   });
  }
  return onValue(ref(db,`${base}/${comp}/aktifSporcu`),s=>{
   const v=s.val()||{},izin=k=>tumu||kume.indexOf(k)>=0||kume.indexOf(norm(k))>=0;
   let en=null,zaman=-1;
   Object.keys(v).forEach(k=>{
    if(!izin(k)||!v[k])return;
    const t=Number(v[k].ts)||1;
    if(t>=zaman){zaman=t;en=k}
   });
   setAktif(en||kume[0]||"");
  });
 },[base,comp,tek,raw,tumu,anahtar,_al]);

 return{aktif,kume,tumu,grupAd,yok,coklu:!tek};
}
// "final_genc_kiz__cember" -> "Genc Kiz — Cember Finali"
function katAdi(c){
 if(!c)return"";
 const f=/^final_/.test(c),g=norm(c).split("__"),b=g[0],al=g[1];
 const l=(RC[b]&&RC[b].label)||b;
 if(!f)return l;
 return al?`${l} — ${(RA[al]&&RA[al].label)||al} Finali`:`${l} — Final`;
}
export{useAktifKategori,katAdi,NODE as GRUP_YOLU};
