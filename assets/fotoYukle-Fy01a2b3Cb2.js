import{d as db}from"./main-C2LpyYUGCb2.js";import{k as ref,m as update}from"./vendor-firebase-940mxgRVCb2.js";
// SPORCU FOTOĞRAFI (2026-10-08) — finallerde sporcu kartı / canlı skor flaş kartında gösterilir (yoksa kartlar eski düzende).
// Görsel tarayıcıda küçültülür (en çok 480px, JPEG ~40 KB) ve data URL olarak yazılır. Yarışma ağacının DIŞINDA tutulur ki
// yarışmaları toptan okuyan sayfalar şişmesin: criteria/sporcuFoto/<base>/<yarışma>/<sporcuId> = {url, ts, ad}
// (Cloudinary hesabı kapalı — "cloud_name is disabled"; Drive görselleri doğrudan <img> ile güvenilir açılmıyor.)
export const fotoYol=(base,comp,id)=>`criteria/sporcuFoto/${base}/${comp}`+(id?"/"+id:"");
const kucult=async(file,max,q)=>{let bm;try{bm=await createImageBitmap(file,{imageOrientation:"from-image"})}catch{bm=await new Promise((ok,no)=>{const im=new Image();im.onload=()=>ok(im);im.onerror=no;im.src=URL.createObjectURL(file)})}
 const w0=bm.width,h0=bm.height,k=Math.min(1,max/Math.max(w0,h0)),w=Math.round(w0*k),h=Math.round(h0*k),c=document.createElement("canvas");c.width=w;c.height=h;
 const x=c.getContext("2d");x.fillStyle="#fff";x.fillRect(0,0,w,h);x.drawImage(bm,0,0,w,h);return c.toDataURL("image/jpeg",q)};
export const fotoKaydet=async(base,comp,id,file,ad)=>{if(!file||!/^image\//.test(file.type||"image/"))throw new Error(__T("Görsel dosyası seçin"));
 let url=await kucult(file,480,.82);if(url.length>9e4)url=await kucult(file,360,.75);
 await update(ref(db,fotoYol(base,comp)),{[id]:{url,ts:Date.now(),ad:ad||null}});return url};
export const fotoSil=(base,comp,id)=>update(ref(db,fotoYol(base,comp)),{[id]:null});
export const dosyaSec=(coklu)=>new Promise(ok=>{const i=document.createElement("input");i.type="file";i.accept="image/*";i.multiple=!!coklu;i.style.display="none";
 i.onchange=()=>{ok(Array.from(i.files||[]));i.remove()};document.body.appendChild(i);i.click()});
const nz=s=>String(s||"").toLocaleLowerCase("tr-TR").normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/ı/g,"i").replace(/đ/g,"d").replace(/ø/g,"o").replace(/ß/g,"ss").replace(/[^a-z0-9]+/g," ").trim();
// Dosya adını sporcuya eşle: BIB numarası ya da ad+soyad (sıra önemsiz, aksan/büyük harf önemsiz). Tek aday çıkmazsa eşleşmez.
export const eslestir=(files,sporcular)=>files.map(f=>{const fn=nz(f.name.replace(/\.[^.]+$/,"")),tk=new Set(fn.split(" ")),num=(fn.match(/\d+/g)||[]).map(x=>x.replace(/^0+/,""));
 let ad=sporcular.filter(s=>{const parca=nz([s.ad,s.soyad].join(" ")).split(" ").filter(x=>x.length>1);return parca.length&&parca.every(p=>tk.has(p))});
 if(ad.length!==1){const sy=sporcular.filter(s=>{const so=nz(s.soyad||String(s.ad||"").split(/\s+/).pop());return so&&tk.has(so.split(" ").pop())});if(sy.length===1)ad=sy}
 if(ad.length!==1&&num.length){const bb=sporcular.filter(s=>s.bib&&num.includes(String(s.bib).replace(/^0+/,"")));if(bb.length===1)ad=bb}
 return{file:f,sp:ad.length===1?ad[0]:null}});
