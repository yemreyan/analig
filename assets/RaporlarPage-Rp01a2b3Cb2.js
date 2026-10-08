import"./i18n-Tr01a2b3Cb2.js";import{b as usToast,a as usInit,j as e,d as db,u as usAuth,l as logAction}from"./main-C2LpyYUGCb2.js";import{r as R}from"./vendor-react-Cxw6bqwhCb2.js";import{k as ref,l as get}from"./vendor-firebase-940mxgRVCb2.js";import{R as RC,a as RA}from"./ritmikCriteriaDefaults-CgOlnfQcCb2.js";import{raKey,raAd}from"./ritmikAlet-Ra01a2b3Cb2.js";import{isIntl,katEN,bayraklarPng,ulkeAd,sporcuUlke,takimAdi}from"./intl-Ul01a2b3Cb2.js";import"./yayinVeri-Yv01a2b3Cb2.js";import"./modulepreload-polyfill-B5Qt9EMXCb2.js";

// RAPORLAR (2026-10-08) — /ritmik/raporlar · yetki anahtarı "raporlar" (yoksa official_report'a bakılır)
//  Yarışma seçimi (birden çok, arşivdekiler dahil) → rapor → seçenekler → ekranda önizleme → PDF / Excel.
//  1) Resmi Sonuçlar: kategori başına genel tasnif (alet puanlarıyla), alet sıralamaları, takım sıralaması, finaller.
//  2) Madalya Tablosu: seçili yarışmaların toplamı; ülke / kulüp / il bazında; altın önce (olimpik) ya da toplam önce.
//  Kurallar Sonuçlar sayfasıyla (FinalsPage) aynı: alet puanı = sonuc; genel = kategori aletlerinin toplamı; eşitlik toplam → E → A → D(DA+DB),
//  yalnız tam eşitlikte aynı sıra; herhangi bir alette IRM olan sporcu genelde sırasız ve en altta; alet sıralamasında IRM sırasız.
//  Takım: ülke (uluslararası) ya da okul/kulüp + il; genç kategoride ilk 3, diğerlerinde ilk 4 sporcu (genel toplamına göre), her alette en iyi 2 puan;
//  teamDeductions düşülür; en az 2 puanlı sporcu; takimSonuclari:false ise yok. Madalya: genel (genel final varsa final), alet finalleri, takım.
const BASE="ritmik_yarismalar";
const V=()=>globalThis.GXYV||self.GXYV;
const f3=v=>v==null||v===""||isNaN(v)?"":Number(v).toFixed(3);
const num=v=>{const x=parseFloat(v);return isFinite(x)?x:0};
const YAS=["kucuk","minik","yildiz","genc","buyuk"];
const yasI=k=>{const i=YAS.findIndex(x=>String(k).replace(/^final_/,"").startsWith(x));return i<0?9:i};
const isFin=(kats,k)=>/^final_/.test(k)||kats?.[k]?.final===!0;
const katAdi=(kats,k)=>String(kats?.[k]?.name||kats?.[k]?.ad||k).replace(/^\s*\u{1F3C6}\s*/u,"").trim();
const aletTr=a=>RA[a]?.labelTr||RA[a]?.label||a;
const MI=(n,st)=>e.jsx("span",{className:"material-icons-round",style:{fontSize:18,...st},children:n});
const tarihStr=c=>[c.baslangicTarihi,c.bitisTarihi].filter(Boolean).filter((x,i,a)=>a.indexOf(x)===i).map(t=>{const m=/^(\d{4})-(\d{2})-(\d{2})/.exec(t);return m?m[3]+"."+m[2]+"."+m[1]:t}).join(" – ");
const katAletleri=(kats,k)=>{const d=kats?.[k]||{};const a=Array.isArray(d.aletler)&&d.aletler.length?d.aletler:d.alet?[d.alet]:Array.isArray(RC[k]?.aletler)?RC[k].aletler:[];return a.filter(Boolean)};
const isGrp=(kats,k)=>{const b=String(k).replace(/^final_/,"").split("__")[0],d=kats?.[k]||kats?.[b]||{};return d.grupMu===!0||d.tip==="takim"||d.tip==="karma"||/grup|trio|pair|cift|ikili|uclu|dans|step/.test(b)};
const BRN=C=>C&&C._br==="aerobik"?"aerobik":"ritmik";
// çift / trio / grup girişi (anahtar <kat>::<kulüp>::<grupNo>) → sporcu adları (aerobik WG Karne kim() ile aynı eşleme)
const uyeAd=(C,k,key)=>{const cm=C.sporcular?.[k]||C.sporcular?.[String(k).replace(/^final_/,"")]||{},san=x=>String(x||"").trim().replace(/[.#$[\]/]/g,"-"),p=String(key).split("::"),gn=p[p.length-1],ok=p.length>=3?p.slice(1,-1).join("::"):"";
 let m=Object.values(cm).filter(a=>a&&san(k+"::"+String(a.okul||a.kulup||"").trim()+"::"+(a.grupNo||1)).slice(0,60)===String(key));
 if(!m.length)m=Object.values(cm).filter(a=>a&&String(a.grupNo??"")===String(gn)&&(ok===""||String(a.okul||a.kulup||"")===ok||san(a.okul||a.kulup)===ok));
 return{uyeler:[...new Set(m.map(a=>[a.ad,a.soyad].filter(Boolean).join(" ")))],il:m[0]?.il||"",ulke:m[0]?.ulke||"",kulup:String(m[0]?.okul||m[0]?.kulup||"").trim()}};

// ---------------- HESAP ----------------
// Bir yarışmanın resmi sonuç bölümleri
function sonucHesapla(C,opt){const Y=V(),kats=C.kategoriler||{},spor=C.sporcular||{},pun=C.puanlar||{},intl=isIntl(C),br=BRN(C),rit=br==="ritmik";
 const out=[];const ids=Object.keys(kats).filter(k=>kats[k]&&typeof kats[k]==="object"&&(!opt.kats||!opt.kats.length||opt.kats.includes(String(k).replace(/^final_/,"").split("__")[0])))
  .sort((a,b)=>(isFin(kats,a)-isFin(kats,b))||(yasI(a)-yasI(b))||String(a).localeCompare(String(b)));
 const satirlar=(k,alet)=>{const S=Y.siralama({brans:br,kats,kat:k,spor:spor[k],puan:pun[k],alet});
  return{tamam:S.tamamlandi,giris:S.girisSayisi,rows:S.satirlar.map(s=>{const g=s.giris,x=s.s||{},r={rank:s.sira,ad:g.ad,soyad:g.soyad||"",kulup:g.kulup||"",ulke:g.ulke||"",il:g.il||"",bib:g.bib||"",takim:g.takim,uyeler:g.uyeler||[],key:g.key,
   total:x.irm&&x.yalnizIrm?null:x.total,e:x.e,a:x.a,d:x.d,da:x.da,db:x.db,pen:x.pen,irm:x.irm||"",tamam:!!x.tamam,done:x.say+"/"+x.adet};
   if(r.takim&&(!r.uyeler||!r.uyeler.length)){const u=uyeAd(C,k,g.key);r.uyeler=u.uyeler;r.il=r.il||u.il;r.ulke=r.ulke||u.ulke;if(u.kulup){r.ad=r.ad===r.kulup?u.kulup:r.ad;r.kulup=u.kulup}}
   if(intl)r.ulke=sporcuUlke({ulke:r.ulke||g.ulke},C)||"";
   if(!alet&&rit){const p=(pun[k]||{})[g.key];r.apps={};katAletleri(kats,k).forEach(a=>{const z=Y.sonuc("ritmik",kats[k],p,a);r.apps[a]=z?(z.irm&&z.yalnizIrm?z.irm:z.total):null})}
   return r})}};
 // genel tasnifte IRM'li sporcu sırasız → en alta; kalanlar toplam → E → A → D ile yeniden sıralanır
 const genelSira=S=>{const ok=S.rows.filter(r=>!r.irm),irm=S.rows.filter(r=>r.irm),K=r=>[r.total,r.e,r.a,r.d].map(v=>Math.round(num(v)*1e3));
  ok.sort((a,b)=>{const p=K(a),q=K(b);for(let i=0;i<4;i++)if(p[i]!==q[i])return q[i]-p[i];return 0});ok.forEach((r,i)=>{r.rank=i&&K(ok[i-1]).join()===K(r).join()?ok[i-1].rank:i+1});irm.forEach(r=>{r.rank=null});
  return{...S,rows:ok.concat(irm)}};
 ids.forEach(k=>{const fin=isFin(kats,k),al=rit?katAletleri(kats,k):[],bk=String(k).replace(/^final_/,"").split("__")[0],ad=fin&&kats[bk]?katAdi(kats,bk):katAdi(kats,k).replace(/\s*[—–-]\s*(Genel Tasnif Finali|[^—–-]*Finali)\s*$/i,""),grp=isGrp(kats,k);
  if(fin){const fa=kats[k].alet||String(k).split("__")[1]||null;if(!opt.final)return;
   let S=satirlar(k,fa||null);if(!fa)S=genelSira(S);if(S.rows.length)out.push({tip:fa?"final_alet":"final_aa",kat:k,katAd:ad,alet:fa,grp,aletler:fa?[fa]:al,...S});return}
  if(opt.genel){const S=genelSira(satirlar(k,null));if(S.rows.length)out.push({tip:"aa",kat:k,katAd:ad,grp,aletler:al,...S})}
  if(opt.alet&&al.length>1)al.forEach(a=>{const S=satirlar(k,a);if(S.rows.length)out.push({tip:"alet",kat:k,katAd:ad,alet:a,grp,aletler:[a],...S})});
  if(rit&&opt.takim&&!grp&&C.takimSonuclari!==!1){const T=takimHesapla(C,k,intl);if(T.rows.length)out.push({tip:"takim",kat:k,katAd:ad,grp,aletler:al,...T})}});
 return out}

// Takım sıralaması (Sonuçlar sayfasındaki hesapla aynı)
function takimHesapla(C,k,intl){const Y=V(),kats=C.kategoriler||{},spor=C.sporcular?.[k]||{},pun=C.puanlar?.[k]||{},al=katAletleri(kats,k),T={},N=String(k).toLowerCase().includes("genc")?3:4;
 Object.entries(spor).forEach(([id,a])=>{if(!a||typeof a!=="object")return;const ok=intl?(takimAdi(a,C)||String(a.okul||a.kulup||"")):String(a.okul||a.kulup||a.il||""),il=intl?"":String(a.il||"");if(!ok.trim())return;
  const key=ok.trim().toLocaleUpperCase("tr-TR")+"|"+il.toLocaleUpperCase("tr-TR"),t=T[key]||(T[key]={ad:ok.trim(),il,ulke:intl?(sporcuUlke(a,C)||ok.trim()):(a.ulke||""),kulup:ok.trim(),uyeler:[]});
  const m={ad:[a.ad,a.soyad].filter(Boolean).join(" "),total:0,ap:{}};al.forEach(x=>{const z=Y.sonuc("ritmik",kats[k],pun[id],x);const v=z&&!z.yalnizIrm?num(z.total):0;m.ap[x]=v;m.total+=v});t.uyeler.push(m)});
 const ded={};Object.values(C.teamDeductions||{}).forEach(x=>{if(x&&x.categoryId===k)ded[String(x.teamName||"").trim().toLocaleUpperCase("tr-TR")]=(ded[String(x.teamName||"").trim().toLocaleUpperCase("tr-TR")]||0)+num(x.amount)});
 const rows=Object.values(T).filter(t=>t.uyeler.filter(m=>m.total>0).length>=2).map(t=>{const sec=[...t.uyeler].sort((p,q)=>q.total-p.total).slice(0,N),apps={};let top=0;
   al.forEach(x=>{const v=sec.map(m=>m.ap[x]||0).sort((p,q)=>q-p).slice(0,2).reduce((p,q)=>p+q,0);apps[x]=Math.round(v*1e3)/1e3;top+=v});
   const d=ded[t.ad.toLocaleUpperCase("tr-TR")]||0;top=Math.round(top*1e3)/1e3;
   return{ad:t.ad,il:t.il,kulup:t.kulup,ulke:t.ulke,uyeler:sec.map(m=>m.ad),apps,toplam:top,kesinti:d,total:Math.round((top-d)*1e3)/1e3,takim:!0}}).sort((a,b)=>b.total-a.total);
 rows.forEach((r,i)=>{r.rank=i&&Math.round(rows[i-1].total*1e3)===Math.round(r.total*1e3)?rows[i-1].rank:i+1});
 return{rows,tamam:!1,giris:rows.length}}

// Madalya tablosu: bölümlerdeki 1-2-3. sıralar (eşitlerde paylaşılan madalya), gruplama ülke / kulüp / il
function madalyaHesapla(liste,opt){const T={},olay=[],say=(anahtar,ad,ulke,rank,yid)=>{if(!anahtar)return;const t=T[anahtar]||(T[anahtar]={ad,ulke,altin:0,gumus:0,bronz:0,toplam:0,yar:new Set()});
  rank===1?t.altin++:rank===2?t.gumus++:t.bronz++;t.toplam++;t.yar.add(yid)};
 liste.forEach(({C,bol})=>{const intl=isIntl(C);
  const finVar=new Set(bol.filter(b=>b.tip==="final_alet").map(b=>String(b.kat).replace(/^final_/,"").split("__")[0]+"|"+b.alet)),finAA=new Set(bol.filter(b=>b.tip==="final_aa").map(b=>String(b.kat).replace(/^final_/,"")));
  bol.forEach(b=>{let ok=!1;
   if(b.tip==="aa")ok=opt.mGenel&&!finAA.has(b.kat);
   else if(b.tip==="final_aa")ok=opt.mGenel;
   else if(b.tip==="final_alet")ok=opt.mAlet;
   else if(b.tip==="alet")ok=opt.mAlet&&opt.mAletElem&&!finVar.has(b.kat+"|"+b.alet);
   else if(b.tip==="takim")ok=opt.mTakim;
   if(!ok)return;olay.push({C,b,m:b.rows.filter(r=>r.rank>=1&&r.rank<=3&&!r.irm)});
   b.rows.forEach(r=>{if(!(r.rank>=1&&r.rank<=3)||r.irm)return;const g=opt.grup==="ulke"?(r.ulke||""):opt.grup==="il"?(r.il||""):(r.kulup||r.il||"");say(g,g,r.ulke||"",r.rank,C._id)})})});
 const rows=Object.values(T).map(t=>({...t,yar:t.yar.size}));
 rows.sort(opt.mSira==="toplam"?(a,b)=>b.toplam-a.toplam||b.altin-a.altin||b.gumus-a.gumus||b.bronz-a.bronz||a.ad.localeCompare(b.ad,"tr"):(a,b)=>b.altin-a.altin||b.gumus-a.gumus||b.bronz-a.bronz||a.ad.localeCompare(b.ad,"tr"));
 const k=r=>opt.mSira==="toplam"?[r.toplam,r.altin,r.gumus,r.bronz].join():[r.altin,r.gumus,r.bronz].join();
 rows.forEach((r,i)=>{r.rank=i&&k(rows[i-1])===k(r)?rows[i-1].rank:i+1});
 rows.olay=olay;return rows}


// ---------------- HAKEM SAPMA ANALİZİ ----------------
// Hesap FIG Hakem Karnesi (RitmikFigKarnePage analiz) ile aynı: A/E = kesinti notu, referans Üst Jüri (SJA/SJE) ya da panel sonucu
// (4 hakemde en yüksek/en düşük atılır), tolerans ref ≤ 1.20 → 0.399, üstü 0.699; DA/DB referans SJDA/SJDB ya da ortak not, tolerans 0.50.
// FIG RG Specific Judges' Rules değerlendirme tabloları (% puan, derece). Hakem kimliği: hakemler/<kat>/<alet>/<koltuk> → panel grubu
// hakemler/<koltuk> → hakemKarnesi/atama/<poz>; isim yoksa "yarışma · pozisyon".
const hr1=v=>Math.round(v*10+1e-9)/10,hnum=v=>{if(v==null||v==="")return null;const n=parseFloat(v);return isNaN(n)?null:n};
const AE_RGI=[[2.0,[100,95,90,80,70,60,50,40,20,0]],[3.5,[100,100,95,90,85,80,70,60,50,40,30,20,10,0]],[99,[100,100,100,100,95,90,80,70,60,50,40,30,20,10,0]]];
const AE_RGG=[[2.0,[100,100,95,90,80,70,60,50,40,20,0]],[3.5,[100,100,100,95,90,85,80,70,65,60,55,45,35,25,15,5,0]],[99,[100,100,100,100,95,90,80,75,70,65,60,50,40,30,20,10,0]]];
const D_STD=[[.2,100],[.4,95],[.6,90],[.8,85],[1,80],[1.2,75],[1.4,70],[1.6,65],[1.7,60],[1.9,55],[2,50],[2.2,45],[2.3,40],[2.5,35],[2.6,30],[2.8,25],[2.9,20],[3.1,15],[3.2,10],[3.4,5]];
const D_RGI_DA=[[.2,100],[.4,95],[.6,90],[.8,85],[.9,80],[1.1,75],[1.2,70],[1.4,65],[1.5,60],[1.7,55],[1.8,50],[2,45],[2.1,40],[2.3,35],[2.4,30],[2.6,25],[2.7,20],[2.9,15],[3,10],[3.2,5]];
const aePct=(ref,dev,grp)=>{const T=grp?AE_RGG:AE_RGI,row=(T.find(([m])=>hr1(ref)<=m+1e-9)||T[T.length-1])[1],i=Math.round(Math.abs(dev)*10+1e-9);return i>=row.length?0:row[i]};
const dPct=(err,tab)=>{const x=hr1(Math.abs(err));for(const[m,p]of tab)if(x<=m+1e-9)return p;return 0};
const GRADE=(p,comp)=>{const t=comp==="D"?[80,70,60,50]:[90,80,65,50],n=["Excellent","Very Good","Good","Pass","Fail"],i=t.findIndex(x=>p>=x-1e-9);return n[i<0?4:i]};
const GRENK={Excellent:["#15803D","#DCFCE7"],"Very Good":["#1D4ED8","#DBEAFE"],Good:["#0E7490","#CFFAFE"],Pass:["#B45309","#FEF3C7"],Fail:["#B91C1C","#FEE2E2"]};
const aeTol=ref=>ref<=1.2+1e-9?.399:.699;
const trimmed=a=>{const s=[...a].sort((x,y)=>x-y);if(s.length>=4){const o=s.slice(1,s.length-1);return o.reduce((p,q)=>p+q,0)/o.length}return s.reduce((p,q)=>p+q,0)/s.length};
const HKEY={T:"zaman",L1:"cizgi1",L2:"cizgi2",BH:"bashakem"},hkey=sl=>HKEY[sl]||String(sl).toLowerCase();
const nrmAd=s=>String(s||"").toLocaleUpperCase("tr-TR").replace(/\s+/g," ").trim();
function hakemKimi(C,k,al,poz){const bk=x=>String(x).replace(/^final_/,"").split("__")[0],gr=C.panelGruplari||{};
 const h=C.hakemler?.[k]?.[al]?.[hkey(poz)]||C.hakemler?.[bk(k)]?.[al]?.[hkey(poz)];if(h&&(h.name||h.ad))return{ad:nrmAd(h.name||h.ad),ulke:h.ulke||"",refId:h.refId||null};
 const g=Object.values(gr).find(g=>g&&Array.isArray(g.kategoriler)&&g.kategoriler.includes(bk(k))),gh=g&&g.hakemler&&g.hakemler[poz];if(gh&&gh.ad)return{ad:nrmAd(gh.ad),ulke:gh.ulke||gh.il||"",refId:gh.refId||null};
 const a=C.hakemKarnesi?.atama?.[poz];if(a&&a.ad)return{ad:nrmAd(a.ad),ulke:a.kulup||"",refId:null};return null}
function hakemAnaliz(C,opt){const kats=C.kategoriler||{},pun=C.puanlar||{},spor=C.sporcular||{},gr=C.panelGruplari||{},rows=[],ozel={},dfark=[];
 const bk=k=>String(k).replace(/^final_/,"").split("__")[0];
 const grupOf=k=>Object.values(gr).find(g=>g&&Array.isArray(g.kategoriler)&&g.kategoriler.includes(bk(k)))||null;
 const esikOf=k=>{const g=grupOf(k);return+(g&&g.yapi&&g.yapi.esik)||.3};
 const kimOf=(k,al,poz)=>hakemKimi(C,k,al,poz);
 Object.entries(pun).forEach(([cat,aths])=>{if(!kats[cat])return;const fin=isFin(kats,cat);if(fin&&!opt.hFin)return;if(opt.kats&&opt.kats.length&&!opt.kats.includes(bk(cat)))return;const grp=isGrp(kats,cat),katAd=katAdi(kats,cat);
  Object.entries(aths||{}).forEach(([aid,als])=>{Object.entries(als||{}).forEach(([al,sc])=>{if(!sc||typeof sc!=="object")return;if(!(sc.durum==="tamamlandi"||sc.sonuc!=null))return;
   const a=spor[cat]?.[aid],p=String(aid).split("::"),sp={ad:a?[a.ad,a.soyad].filter(Boolean).join(" "):(p.length>=3?p.slice(1,-1).join(" "):aid),ulke:a?(a.ulke||""):"",kulup:a?String(a.okul||a.kulup||"").trim():(p.length>=3?p.slice(1,-1).join("::"):""),il:a?(a.il||""):""};
   const base={C,cat,katAd,al,grp,sp};
   ["A","E"].forEach(P=>{if(!opt.hPanel.includes(P))return;const pn=sc[P==="A"?"aPanel":"ePanel"]||{},vals=[1,2,3,4].map(i=>hnum(pn["j"+i])),var_=vals.filter(v=>v!=null);if(!var_.length)return;
    const fn=trimmed(var_),sj=hnum(sc[P==="A"?"sja":"sje"]),useSj=opt.hRef==="sj"&&sj!=null,refv=useSj?sj:fn,mx=Math.max(...var_),mn=Math.min(...var_),blok=mx-mn>2+1e-9;
    const mnI=vals.findIndex(v=>v!=null&&v===mn);let mxI=-1;vals.forEach((v,k)=>{v!=null&&v===mx&&k!==mnI&&mxI<0&&(mxI=k)});
    const oz=ozel[P]||(ozel[P]={n:0,mud:0,blok:0,sjYok:0});oz.n++;if(blok)oz.blok++;if(sj==null)oz.sjYok++;else if(Math.abs(sj-fn)>aeTol(sj)+1e-9)oz.mud++;
    vals.forEach((v,i)=>{if(v==null)return;const poz=P+(i+1),dev=v-refv,tol=aeTol(refv);rows.push({...base,panel:P,poz,val:v,ref:refv,refKaynak:useSj?"SJ":"Panel",dev,tol,dis:Math.abs(dev)>tol+1e-9,pct:aePct(refv,dev,grp),atildi:var_.length>=4&&(i===mnI||i===mxI),blok,kim:kimOf(cat,al,poz)})})});
   [["DA","da","sjda"],["DB","db","sjdb"]].forEach(([P,kc,ks])=>{if(!opt.hPanel.includes(P))return;const pl=P.toLowerCase(),vs=[1,2,3,4].map(i=>[P+i,hnum(sc[pl+i])]).filter(x=>x[1]!=null),tek=!vs.length&&sc.hakemZaman&&sc.hakemZaman[P]!=null&&hnum(sc[kc])!=null;if(!vs.length&&!tek)return;
    // D alt hakem farkı (1–2, 3–4)
    [[1,2],[3,4]].forEach(([x,y])=>{const u=hnum(sc[pl+x]),w=hnum(sc[pl+y]);if(u!=null&&w!=null){const es=esikOf(cat);dfark.push({...base,panel:P,c:P+x+"–"+P+y,u,w,g:Math.abs(u-w),esik:es,asti:Math.abs(u-w)>es+1e-9})}});
    const L=tek?[[P,hnum(sc[kc])]]:vs,ort=hnum(sc[kc])??hnum(sc[P==="DA"?"daScore":"dbScore"]),sj=(v=>v===0?null:v)(hnum(sc[ks])),useSj=opt.hRef==="sj"&&sj!=null,refv=useSj?sj:(ort??L.reduce((a,x)=>a+x[1]/L.length,0));
    const oz=ozel[P]||(ozel[P]={n:0,mud:0,blok:0,sjYok:0});oz.n++;if(sj==null)oz.sjYok++;else if(ort!=null&&Math.abs(sj-ort)>.5+1e-9)oz.mud++;
    if(tek&&sj==null)return;const rf=tek?sj:refv,rk=tek||useSj?"SJ":"Ortak";
    L.forEach(([poz,v])=>{const dev=v-rf;rows.push({...base,panel:P,poz,val:v,ref:rf,refKaynak:rk,dev,tol:.5,dis:Math.abs(dev)>.5+1e-9,pct:dPct(dev,P==="DA"&&!grp?D_RGI_DA:D_STD),atildi:!1,blok:!1,kim:kimOf(cat,al,poz)})})})})})});
 return{rows,ozel,dfark}}
// AEROBİK hakem sapması — AerobikFigKarnePage (WG AER CoP 2025–2028) ile aynı: A = puan, E = 10 − kesinti; panel sonucu §8.1.1
// (4 hakemde uçlar atılır, 6'da 2+2; ortadaki fark §8.1.2 toleransı aşarsa tüm notların ortalaması), referans SJ (sjPanel.a/e.value) ya da panel;
// tolerans son puana göre 8+ 0.3 · 7+ 0.4 · 6+ 0.5 · altı 0.6; §8.1.6 uç fark ≥ 1.0. Derece / yüzde yok. Hakem: hakemler/<kat>/<a1|e2…>.
const AER_TOL=v=>v>=8-1e-9?.3:v>=7-1e-9?.4:v>=6-1e-9?.5:.6;
const aerPanel=sc=>{const s=[...sc].sort((a,b)=>a-b),n=s.length,ort=s.reduce((a,b)=>a+b,0)/n;if(n<4)return ort;const k=n>=6?2:1,o=s.slice(k,n-k),m=o.reduce((a,b)=>a+b,0)/o.length;return o[o.length-1]-o[0]>AER_TOL(m)+1e-9?ort:m};
function hakemAnalizAer(C,opt){const kats=C.kategoriler||{},pun=C.puanlar||{},HK=C.hakemler||{},rows=[],ozel={},bk=k=>String(k).replace(/^final_/,"");
 const kim=(cat,pos)=>{const h=(HK[cat]||HK[bk(cat)]||{})[pos];if(!h)return null;const o=typeof h==="object"?h:{name:String(h)};const ad=String(o.name||o.ad||"").replace(/\s*\([A-Z]{3}\)\s*$/,"");return ad?{ad:nrmAd(ad),ulke:o.ulke||"",refId:o.id||null}:null};
 Object.entries(pun).forEach(([cat,ents])=>{if(!kats[cat])return;if(isFin(kats,cat)&&!opt.hFin)return;if(opt.kats&&opt.kats.length&&!opt.kats.includes(bk(cat)))return;const katAd=katAdi(kats,cat),grp=isGrp(kats,cat);
  Object.entries(ents||{}).forEach(([aid,x])=>{if(!x||typeof x!=="object"||x.durum!=="tamamlandi")return;
   const a=C.sporcular?.[cat]?.[aid];let sp;if(a)sp={ad:[a.ad,a.soyad].filter(Boolean).join(" "),ulke:a.ulke||"",kulup:String(a.okul||a.kulup||"").trim(),il:a.il||""};else{const u=uyeAd(C,cat,aid),p=String(aid).split("::");sp={ad:u.uyeler.join(", ")||aid,ulke:u.ulke,kulup:p.length>=3?p.slice(1,-1).join("::"):"",il:u.il}}
   [["A","a","aPanel"],["E","e","ePanel"]].forEach(([P,pn,alan])=>{if(!opt.hPanel.includes(P))return;const PP=x[alan];if(!PP||typeof PP!=="object")return;
    const js=Object.keys(PP).filter(k=>/^j\d+$/.test(k)&&hnum(PP[k])!=null).sort((u,w)=>parseInt(u.slice(1))-parseInt(w.slice(1)));if(js.length<2)return;
    const sc=js.map(k=>P==="A"?hnum(PP[k]):10-hnum(PP[k])),pf=aerPanel(sc),sjv=hnum(x.sjPanel?.[pn]?.value),sjN=sjv!=null?(P==="A"?sjv:10-sjv):null,useSj=opt.hRef==="sj"&&sjN!=null,refv=useSj?sjN:pf,tol=AER_TOL(refv);
    const mx=Math.max(...sc),mn=Math.min(...sc),k=sc.length>=6?2:sc.length>=4?1:0,sir=sc.map((v,i)=>[v,i]).sort((u,w)=>u[0]-w[0]),at=new Set([...sir.slice(0,k),...sir.slice(sc.length-k)].map(z=>z[1]));
    const oz=ozel[P]||(ozel[P]={n:0,mud:0,blok:0,sjYok:0});oz.n++;if(mx-mn>=1-1e-9)oz.blok++;if(sjN==null)oz.sjYok++;else if(Math.abs(sjN-pf)>AER_TOL(sjN)+1e-9)oz.mud++;
    js.forEach((j,i)=>{const poz=P+j.slice(1),dev=sc[i]-refv;rows.push({C,cat,katAd,al:"",grp,sp,panel:P,poz,val:sc[i],ref:refv,refKaynak:useSj?"SJ":"Panel",dev,tol,dis:Math.abs(dev)>tol+1e-9,pct:null,atildi:at.has(i),blok:mx-mn>=1-1e-9,kim:kim(cat,pn+j.slice(1))})})})})});
 return{rows,ozel,dfark:[]}}
// hakem bazında özet (isimli hakem yarışmalar arası birleşir; isimsiz → yarışma · pozisyon)
function hakemOzet(rows){const M=new Map();
 rows.forEach(r=>{const isimli=!!(r.kim&&r.kim.ad),k=isimli?(r.kim.refId||r.kim.ad):r.C._id+"|"+r.poz;
  const o=M.get(k)||{k,isimli,ad:isimli?r.kim.ad:r.poz,ulke:isimli?(r.kim.ulke||""):"",yar:new Set(),poz:new Set(),pan:new Set(),rs:[],C:r.C};M.set(k,o);o.yar.add(r.C._id);o.poz.add(r.poz);o.pan.add(r.panel);o.rs.push(r)});
 return[...M.values()].map(o=>{const rs=o.rs,n=rs.length,tip=[...o.pan].every(p=>p==="DA"||p==="DB")?"D":"AE",yp=rs.every(x=>x.pct!=null),pct=yp?rs.reduce((a,x)=>a+x.pct,0)/n:null,ort=rs.reduce((a,x)=>a+x.dev,0)/n,abs=rs.reduce((a,x)=>a+Math.abs(x.dev),0)/n,mx=rs.reduce((a,x)=>Math.abs(x.dev)>Math.abs(a)?x.dev:a,0),dis=rs.filter(x=>x.dis).length;
  // kendi ülkesi / kulübü / ili sporcusu lehine fark (A/E kesinti: az kesinti lehte; D: yüksek not lehte)
  let leh=null;if(o.ulke){const u=nrmAd(o.ulke),bu=x=>[x.sp.ulke,x.sp.kulup,x.sp.il].some(v=>v&&nrmAd(v)===u),ken=rs.filter(bu),dig=rs.filter(x=>!bu(x));
   if(ken.length&&dig.length){const sg=x=>x.panel==="A"||x.panel==="E"?-x.dev:x.dev;leh={n:ken.length,fark:ken.reduce((a,x)=>a+sg(x),0)/ken.length-dig.reduce((a,x)=>a+sg(x),0)/dig.length}}}
  return{...o,yar:o.yar.size,poz:[...o.poz].sort().join(", "),pan:[...o.pan].sort().join(", "),n,pct,grade:pct==null?"—":GRADE(pct,tip),ort,abs,mx,dis,leh}}).sort((a,b)=>{const O=x=>["DA","DB","A","E"].indexOf(x.pan.split(", ")[0]);return O(a)-O(b)||a.pan.localeCompare(b.pan)||b.pct-a.pct||a.ad.localeCompare(b.ad,"tr")})}


// ---------------- NOT DEĞİŞİKLİKLERİ VE İTİRAZLAR ----------------
// Kaynaklar: <yarışma>/itirazlar (ritmikItiraz), puanlar/<kat>/<sp>/<alet>/duzeltmeler (başhakem / geri gönderme / hakem yeniden girdi),
// kök logs (competitionId): sj_field_override (başhakem hakem alanını değiştirdi / boş alanı girdi), score_field_cleared, score_unlock,
// score_irm(_clear), judge_score_submit (hakem kendi notunu düzeltti), score_submitted (aynı rutin birden çok kayıt → sonuç değişimi).
// score_correction / score_send_back logları yalnız duzeltmeler kaydı yoksa (eski kayıtlar) sayılır.
const DG_TUR={bh_degistir:["Başhakem notu değiştirdi","#DB2777","Chief judge changed score"],geri_gonder:["Hakeme geri gönderildi","#7C3AED","Sent back to judge"],hakem_yeniden:["Hakem yeniden girdi","#0891B2","Judge re-entered"],bh_alan:["Başhakem hakem alanını değiştirdi","#E11D48","Chief judge edited judge field"],
 bh_bos:["Başhakem boş hakem notunu girdi","#F59E0B","Chief judge entered missing score"],alan_sil:["Alan silindi","#64748B","Field cleared"],kilit:["Kilit kaldırıldı","#B45309","Unlocked"],irm:["IRM (DNS/DNF/DSQ)","#475569","IRM (DNS/DNF/DSQ)"],uj_red:["Üst jüri reddetti","#9333EA","Superior jury rejected"],hakem_duzelt:["Hakem kendi notunu düzeltti","#0E7490","Judge corrected own score"]};
const IT_TUR={DB:"DB",DA:"DA",ZAMAN:"Zaman",CIZGI:"Çizgi"},IT_DUR={beklemede:"İncelemede",kabul:"Kabul",red:"Red",iptal:"Geri çekildi"};
const alanPoz=a=>{const s=String(a||"");let m=/^(a|e)Panel\.j(\d)$/i.exec(s);if(m)return m[1].toUpperCase()+m[2];m=/^(da|db)(\d)$/i.exec(s);if(m)return m[1].toUpperCase()+m[2];
 m=/^sj(a|e|da|db)$/i.exec(s);if(m)return"SJ"+m[1].toUpperCase();if(/zaman/i.test(s))return"T";m=/cizgi(\d)/i.exec(s);if(m)return"L"+m[1];return s};
function degisiklikHesapla(C,logs,opt){const kats=C.kategoriler||{},spor=C.sporcular||{},pun=C.puanlar||{},ev=[],bk=k=>String(k).replace(/^final_/,"").split("__")[0],aer=BRN(C)==="aerobik";
 const katOk=k=>(!k&&aer)||k&&(!opt.kats||!opt.kats.length||opt.kats.includes(bk(k)))&&(opt.dFin||!isFin(kats,k));
 const spAd=(k,id,yed)=>{const a=spor[k]?.[id];if(a)return[a.ad,a.soyad].filter(Boolean).join(" ");if(aer&&String(id||"").includes("::")){const u=uyeAd(C,k,id);if(u.uyeler.length)return u.uyeler.join(", ")}const p=String(id||"").split("::");return yed&&!String(yed).includes("::")?yed:(p.length>=3?p.slice(1,-1).join(" "):yed||id||"")};
 const spUlke=(k,id)=>{const a=spor[k]?.[id];return a?(a.ulke||a.okul||a.kulup||a.il||""):""};
 const push=(o)=>{if(!katOk(o.kat))return;const poz=alanPoz(o.alan);ev.push({...o,C,katAd:katAdi(kats,o.kat),sp:spAd(o.kat,o.aid,o.sp),temsil:spUlke(o.kat,o.aid),poz,hakem:/^(A|E|DA|DB)\d$/.test(poz)?(aer?(h=>h?{ad:nrmAd(typeof h==="object"?h.name||h.ad||"":String(h))}:null)((C.hakemler?.[o.kat]||C.hakemler?.[bk(o.kat)]||{})[poz.toLowerCase()]):hakemKimi(C,o.kat,o.al,poz)):null})};
 // puan kayıtlarındaki düzeltmeler
 Object.entries(pun).forEach(([k,aths])=>Object.entries(aths||{}).forEach(([id,als])=>Object.entries(als||{}).forEach(([al,rec])=>{const dz=rec&&typeof rec==="object"&&rec.duzeltmeler;if(!dz||typeof dz!=="object")return;
  Object.values(dz).forEach(x=>{if(!x||typeof x!=="object")return;push({ts:+x.ts||0,kat:k,aid:id,al,tur:x.tip==="bashakem"?"bh_degistir":x.tip==="geri_gonder"?"geri_gonder":"hakem_yeniden",alan:x.alan||"",eski:x.eski,yeni:x.yeni,kim:x.kim||"",not:x.not||(x.istek?"istek üzerine":"")})})})));
 // üst jüri reddi (aerobik puan kaydında ustJuriRed / ustJuriRedNote)
 if(aer)Object.entries(pun).forEach(([k,ents])=>Object.entries(ents||{}).forEach(([id,x])=>{if(x&&typeof x==="object"&&x.ustJuriRed)push({ts:+x.ustJuriRed||0,kat:k,aid:id,al:"",tur:"uj_red",alan:"",eski:null,yeni:null,kim:"",not:x.ustJuriRedNote||""})}));
 // işlem kaydı
 const sub={};
 Object.values(logs||{}).forEach(v=>{if(!v||typeof v!=="object")return;const t=v.type,base={ts:+v.timestamp||0,kat:v.category,aid:v.athleteId,al:v.alet,sp:v.athleteName,kim:v.user||""};
  const msj=String(v.message||v.mesaj||"");
  if(aer&&t==="score_modify"){const m=/^\[Aerobik\]\s*(.+?)\s+—\s+([^:]+):\s*başhakem hakem notlarını değiştirdi\s*\((.+)\)\s*$/.exec(msj);if(m){m[3].split(/,\s*/).forEach(p=>{const q=/^([A-Z]+\d*)\s*:\s*([^→]*)→\s*(.*)$/.exec(p.trim());if(q)push({...base,kat:m[2].trim(),sp:m[1].trim(),tur:"bh_alan",alan:q[1],eski:q[2].trim()===""||q[2].trim()==="—"?null:q[2].trim(),yeni:q[3].trim()})})}return}
  if(aer&&t==="score_create"){const m=/^\[Aerobik\]\s*(.+?)\s+—\s+([^:]+):\s*([\d.]+)/.exec(msj);if(m){const key=m[2].trim()+"|N:"+m[1].trim()+"|";(sub[key]||(sub[key]=[])).push({ts:base.ts,so:parseFloat(m[3]),kim:v.user||""})}return}
  if(aer&&t==="score_unlock"&&!v.athleteId){const m=/^\[Aerobik\]\s*(.+?)\s+—\s+puan kilidi kaldırıldı/.exec(msj);push({...base,kat:base.kat||"",sp:m?m[1].trim():"",tur:"kilit",alan:"",eski:null,yeni:null,not:""});return}
  if(t==="sj_field_override")push({...base,tur:v.oldValue!=null&&v.oldValue!==""?"bh_alan":"bh_bos",alan:v.field,eski:v.oldValue,yeni:v.newValue});
  else if(t==="score_correction"||t==="score_send_back"){let d={};try{d=JSON.parse(v.data||"{}")}catch{}const tur=t==="score_correction"?"bh_degistir":"geri_gonder",al2=d.alan||"";
   // duzeltmeler kaydı varsa (aynı rutin, alan, ±10 sn) sayılmaz
   if(!ev.some(e=>e.tur===tur&&e.kat===base.kat&&e.aid===base.aid&&e.al===base.al&&e.alan===al2&&Math.abs(e.ts-base.ts)<1e4))push({...base,tur,alan:al2,eski:v.oldValue,yeni:t==="score_correction"?v.newValue:null,not:d.not||""})}
  else if(t==="score_field_cleared")push({...base,tur:"alan_sil",alan:v.field,eski:v.oldValue,yeni:null});
  else if(t==="score_unlock"){let b2=base;if(!b2.aid){const m=/\]\s*(\S+)\s+(\S+)\s*$/.exec(String(v.message||v.mesaj||""));if(m){b2={...b2,aid:m[1],al:m[2]};if(!b2.kat){const k=Object.keys(pun).find(k=>pun[k]&&pun[k][m[1]]&&pun[k][m[1]][m[2]]);b2.kat=k}}}
   let not="";try{const d=JSON.parse(v.data||"{}");not=d.yetki?"yetki: "+d.yetki:""}catch{}push({...b2,tur:"kilit",alan:"",eski:null,yeni:null,not})}
  else if(t==="score_irm"||t==="score_irm_clear"){let d={};try{d=JSON.parse(v.data||"{}")}catch{}push({...base,tur:"irm",alan:"",eski:t==="score_irm_clear"?(d.irm||v.oldValue||"IRM"):null,yeni:t==="score_irm"?(d.irm||v.newValue||"IRM"):null,not:d.neden||d.irmNeden||""})}
  else if(t==="judge_score_submit"&&opt.dHakem&&v.oldValue!=null&&v.oldValue!==""&&String(v.oldValue)!==String(v.newValue))push({...base,tur:"hakem_duzelt",alan:v.field,eski:v.oldValue,yeni:v.newValue});
  else if(t==="score_submitted"){let so=null;try{so=JSON.parse(v.data||"{}").sonuc}catch{}const key=v.category+"|"+v.athleteId+"|"+v.alet;(sub[key]||(sub[key]=[])).push({ts:base.ts,so,kim:v.user||""})}});
 const tekrar=Object.entries(sub).filter(([,l])=>l.length>1).map(([key,l])=>{l.sort((a,b)=>a.ts-b.ts);let[k,id,al]=key.split("|");const adN=String(id).startsWith("N:")?id.slice(2):null;if(adN)id="";const u=l.filter(x=>x.so!=null);
  return{C,kat:k,katAd:katAdi(kats,k),aid:id,al,sp:adN||spAd(k,id),temsil:adN?"":spUlke(k,id),n:l.length,ilk:u.length?u[0].so:null,son:u.length?u[u.length-1].so:null,ts1:l[0].ts,ts2:l[l.length-1].ts,kilit:ev.filter(e=>e.tur==="kilit"&&e.kat===k&&e.aid===id&&e.al===al).length}})
  .filter(x=>katOk(x.kat)).sort((a,b)=>Math.abs((b.son??0)-(b.ilk??0))-Math.abs((a.son??0)-(a.ilk??0))||b.n-a.n);
 // itirazlar
 const nrmIt=x=>x&&x.catId?{kategori:x.catId,sporcuId:x.athId,sporcuAd:[x.ad,x.soyad].filter(Boolean).join(" ")||spAd(x.catId,x.athId,x.athName),tur:x.scoreType||"",eskiDeger:x.eski??null,yeniDeger:x.status==="accepted"?x.value:null,eskiSonuc:x.eskiToplam??null,yeniSonuc:x.status==="accepted"?x.total:null,
   durum:({accepted:"kabul",rejected:"red",pending:"beklemede",withdrawn:"iptal"})[x.status]||x.status||"beklemede",talepZamani:x.ts,kararZamani:x.resolvedAt||null,ucret:0,paraBirimi:"",kararVeren:x.resolvedBy||"",not:x.not||""}:x;
 const it=Object.entries(C.itirazlar||{}).map(([id,x0])=>{const x=nrmIt(x0);return{id,...x,C,katAd:katAdi(kats,x.kategori),temsil:spUlke(x.kategori,x.sporcuId)||x.kulup||x.il||(aer&&String(x.sporcuId||"").includes("::")?String(x.sporcuId).split("::").slice(1,-1).join("::"):"")}}).filter(x=>katOk(x.kategori)).sort((a,b)=>(+a.talepZamani||0)-(+b.talepZamani||0));
 return{ev:ev.filter(e=>opt.dTur.includes(e.tur)).sort((a,b)=>a.ts-b.ts),tumEv:ev,tekrar,it}}


// ---------------- KATILIM İSTATİSTİKLERİ ----------------
// Sporcular yalnız eleme (final_ olmayan) kategorilerden sayılır; final kategorileri finalist sayısı için kullanılır.
// Kimlik (yarışmalar arası tekrar): lisans, yoksa ad + soyad + doğum tarihi. TC kimlik no hiçbir şekilde kullanılmaz / gösterilmez.
// Alet çıkışı: sporcunun aletler[] listesi, yoksa kategori aletleri (grup: grup başına seri sayısı). Puanlanan: en az bir alette puan / IRM; puanı olmayan: hiç puanı yok (yarışmadı ya da henüz yarışmadı).
const dYil=v=>{const m=/(\d{4})/.exec(String(v||""));return m?+m[1]:null};
function katilimHesapla(C,opt){const kats=C.kategoriler||{},spor=C.sporcular||{},pun=C.puanlar||{},intl=isIntl(C),y0=dYil(C.baslangicTarihi)||new Date().getFullYear();
 const kOk=k=>kats[k]&&!isFin(kats,k)&&(!opt.kats||!opt.kats.length||opt.kats.includes(k));
 const sp=[],grp={},kat={};
 Object.keys(spor).filter(kOk).sort((a,b)=>yasI(a)-yasI(b)||a.localeCompare(b)).forEach(k=>{const G=isGrp(kats,k),al=BRN(C)==="ritmik"?katAletleri(kats,k):[];
  const K=kat[k]={k,ad:katAdi(kats,k),grp:G,sporcu:0,giris:0,cikis:0,yarisan:0,yarismayan:0,kulup:new Set(),bolge:new Set(),yas:[],finalist:new Set()};
  Object.entries(spor[k]||{}).forEach(([id,a])=>{if(!a||typeof a!=="object")return;
   const kul0=String(a.okul||a.kulup||"").trim(),il=String(a.il||"").trim(),kul=kul0||il,ul=intl?(sporcuUlke(a,C)||""):"",ad=[a.ad,a.soyad].filter(Boolean).join(" ")||a.adSoyad||"";
   const kimlik=String(a.lisans||"").trim()?"L:"+String(a.lisans).trim():"N:"+nrmAd(ad)+"|"+String(a.dob||"");
   const yil=dYil(a.dob),yas=yil?y0-yil:null,bolge=intl?ul:il;K.sporcu++;K.kulup.add(kul||"—");bolge&&K.bolge.add(bolge);yas!=null&&yas>3&&yas<60&&K.yas.push(yas);
   let gkey=null;if(G){gkey=k+"::"+String(kul0).replace(/[.#$\[\]\/]/g,"-")+"::"+(a.grupNo!=null?a.grupNo:1);grp[gkey]=grp[gkey]||{k,kul,bolge};}
   const pk=G?gkey:id,p=pun[k]?.[pk]||pun[k]?.[id]||{},alL=G?al:(Array.isArray(a.aletler)&&a.aletler.length?a.aletler:al);
   const pu=alL.length?alL.filter(x=>{const q=p[x];return q&&typeof q==="object"&&(q.durum==="tamamlandi"||q.sonuc!=null||q.irm)}).length:(p&&(p.durum==="tamamlandi"||p.sonuc!=null||p.irm)?1:0);
   if(!G){K.giris++;K.cikis+=alL.length||1;pu?K.yarisan++:K.yarismayan++}
   sp.push({k,id,kimlik,ad,kul,il,ilce:String(a.ilce||"").trim(),ul,bolge,yil,yas,G,gkey,cikis:G?0:(alL.length||1),puan:pu,fin:!1})});
  if(G){const gs=Object.entries(grp).filter(([g,v])=>v.k===k);K.giris=gs.length;gs.forEach(([g])=>{const p=pun[k]?.[g]||{},pu=al.length?al.filter(x=>{const q=p[x];return q&&typeof q==="object"&&(q.durum==="tamamlandi"||q.sonuc!=null||q.irm)}).length:(p.durum==="tamamlandi"||p.sonuc!=null||p.irm?1:0);K.cikis+=al.length||1;pu?K.yarisan++:K.yarismayan++})}});
 // finalistler
 Object.keys(kats).filter(k=>isFin(kats,k)).forEach(fk=>{const b=String(fk).replace(/^final_/,"").split("__")[0];if(!kat[b])return;Object.entries(spor[fk]||{}).forEach(([id,a])=>{if(!a||typeof a!=="object"||a._yedek)return;kat[b].finalist.add(id);const x=sp.find(s0=>s0.k===b&&s0.id===id);x&&(x.fin=!0)})});
 return{C,intl,sp,kat:Object.values(kat).map(K=>({...K,kulup:K.kulup.size,bolge:K.bolge.size,finalist:K.finalist.size,yasOrt:K.yas.length?K.yas.reduce((a,b)=>a+b,0)/K.yas.length:null,yasMin:K.yas.length?Math.min(...K.yas):null,yasMax:K.yas.length?Math.max(...K.yas):null})),gruplar:Object.keys(grp).length}}


// ---------------- ZAMAN ÇİZELGESİ ----------------
// Plan: cikisListesi.gunler[].bloklar[] (tarih + saat, satırlar = rutinler). Gerçekleşen: ilk çağrı (logs athlete_call) ya da ilk puan,
// son puan (puanlar/../timestamp = kayıt anı). Çıkış listesi yoksa puan zamanlarından gün × kategori × alet blokları kurulur.
const gunStr=t=>{const d=new Date(t);return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0")};
const TRAY={ocak:1,şubat:2,subat:2,mart:3,nisan:4,mayıs:5,mayis:5,haziran:6,temmuz:7,ağustos:8,agustos:8,eylül:9,eylul:9,ekim:10,kasım:11,kasim:11,aralık:12,aralik:12};
const gunCoz=t=>{const s0=String(t||"").trim();let m=/^(\d{4})-(\d{2})-(\d{2})/.exec(s0);if(m)return m[1]+"-"+m[2]+"-"+m[3];m=/(\d{1,2})\s+([A-Za-zÇĞİÖŞÜçğıöşü]+)\s+(\d{4})/.exec(s0);if(m){const a=TRAY[m[2].toLocaleLowerCase("tr-TR")];if(a)return m[3]+"-"+String(a).padStart(2,"0")+"-"+m[1].padStart(2,"0")}m=/^(\d{2})\.(\d{2})\.(\d{4})/.exec(s0);return m?m[3]+"-"+m[2]+"-"+m[1]:""};
const tsCoz=v=>{const n=+v;if(n>0)return n;const p=Date.parse(v);return isNaN(p)?null:p};
function zamanHesapla(C,logs,opt){const kats=C.kategoriler||{},pun=C.puanlar||{},cl=C.cikisListesi,bk=k=>String(k).replace(/^final_/,"").split("__")[0],aer=BRN(C)==="aerobik";
 const katOk=k=>k&&(!opt.kats||!opt.kats.length||opt.kats.includes(bk(k)));
 const pts=(k,id,al)=>{const x=aer?pun[k]?.[id]:pun[k]?.[id]?.[al];return x&&typeof x==="object"&&(x.durum==="tamamlandi"||x.sonuc!=null)?tsCoz(x.timestamp):null};
 const cagri={};Object.values(logs||{}).forEach(v=>{if(v&&v.type==="athlete_call"&&v.timestamp){const key=v.category+"|"+v.athleteId+"|"+(aer?"":v.alet),t=+v.timestamp;if(!cagri[key]||t<cagri[key])cagri[key]=t}});
 const olc=(r)=>{const sc=r.map(x=>pts(x.k,x.id,x.al)).filter(Boolean),ca=r.map(x=>cagri[x.k+"|"+x.id+"|"+(aer?"":x.al)]).filter(Boolean),bas=[...sc,...ca].length?Math.min(...sc,...ca):null,son=sc.length?Math.max(...sc):null;
  const cp=r.map(x=>{const a=cagri[x.k+"|"+x.id+"|"+(aer?"":x.al)],b=pts(x.k,x.id,x.al);return a&&b&&b>a?b-a:null}).filter(v=>v!=null&&v<36e5);
  return{n:r.length,puanli:sc.length,bas,son,sure:bas&&son?son-bas:null,rutin:bas&&son&&sc.length>1?(son-bas)/(sc.length-1):null,cagriPuan:cp.length?cp.reduce((a,b)=>a+b,0)/cp.length:null}};
 const bl=[];
 if(cl&&Array.isArray(cl.gunler)&&cl.gunler.length){cl.gunler.forEach(g=>{const L0=(g.bloklar||[]).filter(Boolean);L0.forEach((b,i)=>{const r=[];(b.rows||[]).forEach(row=>(row&&row.r||[]).forEach(x=>{if(!x||!x.a)return;r.push({k:x.kat||x.k||row.kat||b.kat,id:x.a,al:x.al||(b.aletler||[])[0]})}));
   const ks=[...new Set(r.map(x=>x.k).filter(Boolean))];if(!ks.some(katOk))return;
   const plan=g.tarih&&b.saat?new Date(g.tarih+"T"+b.saat+":00").getTime():null,nx=L0[i+1],planSon=nx&&nx.saat&&g.tarih?new Date(g.tarih+"T"+nx.saat+":00").getTime():null;
   bl.push({C,idx:bl.length,gun:g.tarih||"",saat:b.saat||"",plan,planSure:plan&&planSon&&planSon>plan?planSon-plan:null,kat:ks.map(k=>katAdi(kats,k)).join(" + "),al:[...new Set(r.map(x=>x.al).filter(Boolean))],...olc(r),gecikme:null})})})}
 else if(aer){const G={};Object.entries(pun).forEach(([k,a])=>{if(!katOk(k)||!kats[k])return;Object.entries(a||{}).forEach(([id,x])=>{const t=pts(k,id,"");if(!t)return;const sp0=C.sporcular?.[k]?.[id]||Object.values(C.sporcular?.[k]||{}).find(z=>z&&String(id).includes("::")&&String(z.grupNo??"")===String(id).split("::").pop())||{};
   const gP=gunCoz(sp0.gun),gun=gP||gunStr(t),key=gun+"|"+k,o=G[key]||(G[key]={gun,k,r:[],saat:[]});o.r.push({k,id,al:""});/^\d{1,2}:\d{2}$/.test(String(sp0.baslangicSaati||""))&&gP&&o.saat.push(String(sp0.baslangicSaati).padStart(5,"0"))})});
  Object.values(G).forEach(x=>{const ss=x.saat.sort(),st=ss[0]||"",plan=st?new Date(x.gun+"T"+st+":00").getTime():null,son=ss[ss.length-1];bl.push({C,idx:0,gun:x.gun,saat:st,plan,planSure:plan&&son&&son!==st?new Date(x.gun+"T"+son+":00").getTime()-plan:null,kat:katAdi(kats,x.k),al:[],...olc(x.r),gecikme:null})})}
 else{const G={};Object.entries(pun).forEach(([k,a])=>{if(!katOk(k)||!kats[k])return;Object.entries(a||{}).forEach(([id,als])=>Object.entries(als||{}).forEach(([al])=>{const t=pts(k,id,al);if(!t)return;const key=gunStr(t)+"|"+k+"|"+al;(G[key]||(G[key]={gun:gunStr(t),k,al,r:[]})).r.push({k,id,al})}))});
  Object.values(G).forEach(x=>bl.push({C,idx:0,gun:x.gun,saat:"",plan:null,planSure:null,kat:katAdi(kats,x.k),al:[x.al],...olc(x.r),gecikme:null}))}
 // puan plan gününden başka bir günde girildiyse (deneme / erteleme) gecikme hesaplanmaz
 bl.forEach(b=>{b.farkliGun=!!(b.plan&&b.bas&&gunStr(b.bas)!==b.gun);b.gecikme=b.plan&&b.bas&&!b.farkliGun?b.bas-b.plan:null});
 const planli=bl.some(b=>b.plan)&&!!(cl&&Array.isArray(cl.gunler)&&cl.gunler.length);bl.sort((a,b)=>(a.gun.localeCompare(b.gun))||(planli?a.idx-b.idx:((a.plan||a.bas||0)-(b.plan||b.bas||0))));
 const gunler=[...new Set(bl.map(b=>b.gun))].map(g=>{const B=bl.filter(b=>b.gun===g),P=B.filter(b=>b.plan),A=B.filter(b=>b.bas);
  return{C,gun:g,blok:B.length,rutin:B.reduce((a,b)=>a+b.n,0),puanli:B.reduce((a,b)=>a+b.puanli,0),planBas:P.length?Math.min(...P.map(b=>b.plan)):null,bas:A.length?Math.min(...A.map(b=>b.bas)):null,son:B.some(b=>b.son)?Math.max(...B.filter(b=>b.son).map(b=>b.son)):null,
   ortGec:B.filter(b=>b.gecikme!=null).length?B.filter(b=>b.gecikme!=null).reduce((a,b)=>a+b.gecikme,0)/B.filter(b=>b.gecikme!=null).length:null,maxGec:B.filter(b=>b.gecikme!=null).length?Math.max(...B.filter(b=>b.gecikme!=null).map(b=>b.gecikme)):null}});
 gunler.forEach(g=>{g.gecikme=g.planBas&&g.bas&&gunStr(g.bas)===g.gun?g.bas-g.planBas:null;g.farkliGun=!!(g.planBas&&g.bas&&gunStr(g.bas)!==g.gun);g.sure=g.bas&&g.son?g.son-g.bas:null});
 return{bl,gunler,planVar:!!(cl&&Array.isArray(cl.gunler)&&cl.gunler.length)||bl.some(b=>b.plan),cagriVar:Object.keys(cagri).length>0}}

// ---------------- SPORCU KARŞILAŞTIRMA ----------------
// Her yarışmada genel tasnif (Sonuçlar kurallarıyla) + final sonuçları; sporcu kimliği lisans | ad + soyad + doğum tarihi.
function sporcuKarsilastir(liste,opt){const M=new Map();
 liste.forEach(({C,bol})=>{const spor=C.sporcular||{},kats=C.kategoriler||{},intl=isIntl(C);
  bol.forEach(b=>{if(b.tip!=="aa"&&b.tip!=="final_alet"&&b.tip!=="final_aa")return;const base=String(b.kat).replace(/^final_/,"").split("__")[0];
   b.rows.forEach(r=>{if(r.takim)return;const a=spor[b.kat]?.[r.key]||spor[base]?.[r.key]||{},ad=[a.ad,a.soyad].filter(Boolean).join(" ")||r.ad;
    const kim=String(a.lisans||"").trim()?"L:"+String(a.lisans).trim():"N:"+nrmAd(ad)+"|"+String(a.dob||"");
    const o=M.get(kim)||{kim,ad:satirAd0(r),temsil:intl?(r.ulke||""):(r.kulup||r.il||""),yar:new Map()};M.set(kim,o);
    const y=o.yar.get(C._id)||{C,kat:"",aa:null,rank:null,apps:{},fin:[],irm:""};o.yar.set(C._id,y);
    if(b.tip==="aa"){y.kat=b.katAd;y.aa=r.total;y.rank=r.rank;y.apps=r.apps||{};y.irm=r.irm||"";y.n=b.rows.filter(x=>x.rank).length}
    else y.fin.push({alet:b.alet||"AA",total:r.total,rank:r.rank})})})});
 let rows=[...M.values()].map(o=>{const L0=[...o.yar.values()].filter(y=>y.aa!=null||y.fin.length).sort((a,b)=>String(a.C.baslangicTarihi||"").localeCompare(String(b.C.baslangicTarihi||"")));
  const aaL=L0.filter(y=>y.aa!=null&&!y.irm),fark=aaL.length>=2?aaL[aaL.length-1].aa-aaL[0].aa:null,ayniKat=aaL.length>=2&&new Set(aaL.map(y=>y.kat)).size===1;
  return{...o,yar:L0,n:L0.length,fark,ayniKat,enIyi:aaL.length?Math.max(...aaL.map(y=>y.aa)):null}});
 const q=nrmAd(opt.sAra||"");rows=rows.filter(x=>x.n>=(opt.sMin||1)&&(!q||nrmAd(x.ad).includes(q)||nrmAd(x.temsil).includes(q)));
 rows.sort(opt.sSira==="fark"?(a,b)=>(b.fark??-1e9)-(a.fark??-1e9)||a.ad.localeCompare(b.ad,"tr"):opt.sSira==="enIyi"?(a,b)=>(b.enIyi??-1)-(a.enIyi??-1):(a,b)=>a.ad.localeCompare(b.ad,"tr"));
 return rows}
const satirAd0=r=>r.soyad?String(r.soyad).toLocaleUpperCase("tr-TR")+" "+String(r.ad||"").replace(r.soyad,"").trim():String(r.ad||"");

// ---------------- VİDEO ARŞİVİ DURUMU ----------------
// Puanlanmış her rutin (durum tamamlandi) için videoUrlA / videoUrlB; kaynak drive.google → Drive, cloudinary → Cloudinary (hesap kapalı, erişilemez).
// Boyut / süre / yükleme süresi videoBilgi'den; yükleme hataları <yarışma>/kameraYukleme (durum hata).
const vKaynak=u=>!u?"":/drive\.google|googleusercontent/.test(u)?"drive":/cloudinary/.test(u)?"cloudinary":"diger";
function videoHesapla(C,opt){const kats=C.kategoriler||{},pun=C.puanlar||{},spor=C.sporcular||{},bk=k=>String(k).replace(/^final_/,"").split("__")[0],G={},eksik=[];let mb=0,sure=0,yuk=[],src={drive:0,cloudinary:0,diger:0};
 Object.entries(pun).forEach(([k,a])=>{if(!kats[k]||opt.kats&&opt.kats.length&&!opt.kats.includes(bk(k)))return;
  Object.entries(a||{}).forEach(([id,als])=>(BRN(C)==="aerobik"?[["",als]]:Object.entries(als||{})).forEach(([al,x])=>{if(!x||typeof x!=="object"||!(x.durum==="tamamlandi"||x.sonuc!=null))return;
   const key=k+"|"+al,g=G[key]||(G[key]={C,kat:katAdi(kats,k),al,rutin:0,a:0,b:0,biri:0,cl:0});g.rutin++;const ua=x.videoUrlA,ub=x.videoUrlB;ua&&g.a++;ub&&g.b++;(ua||ub)&&g.biri++;
   [ua,ub].forEach(u=>{const s0=vKaynak(u);if(s0){src[s0]++;s0==="cloudinary"&&g.cl++}});
   const vb=x.videoBilgi;if((ua||ub)&&vb&&typeof vb==="object"){mb+=+vb.boyutMB||0;sure+=+vb.sureSn||0;vb.yuklemeSn&&yuk.push(+vb.yuklemeSn)}
   if(!ua&&!ub){const sp=spor[k]?.[id],p=String(id).split("::");eksik.push({C,kat:katAdi(kats,k),al,ad:sp?[sp.ad,sp.soyad].filter(Boolean).join(" "):(uyeAd(C,k,id).uyeler.join(", ")||(p.length>=3?p.slice(1,-1).join(" "):id)),temsil:sp?(sp.ulke||sp.okul||sp.kulup||sp.il||""):(p.length>=3?p.slice(1,-1).join("::"):""),ts:tsCoz(x.timestamp)||0})}}))});
 const hata=Object.values(C.kameraYukleme||{}).filter(x=>x&&typeof x==="object"&&(x.durum==="hata"||(x.durum==="yukleniyor"||x.durum==="kayitta")&&Date.now()-(+x.guncel||0)>6e5)).map(x=>({C,ad:x.ad||"",kat:katAdi(kats,x.kat),al:x.alet||"",cam:x.cam||"",durum:x.durum,mesaj:x.mesaj||"",ts:+x.guncel||+x.basla||0}));
 return{G:Object.values(G).sort((a,b)=>a.kat.localeCompare(b.kat,"tr")||a.al.localeCompare(b.al)),eksik:eksik.sort((a,b)=>a.kat.localeCompare(b.kat,"tr")||a.ts-b.ts),mb,sure,yukOrt:yuk.length?yuk.reduce((a,b)=>a+b,0)/yuk.length:null,src,hata}}

// ---------------- SEYİRCİ İSTATİSTİKLERİ (2026-10-09) ----------------
// criteria/seyirciIstat/<brans>_<yarışma> (gymexa-izle api/v.js yazar): o/<oturum>={b ilk sinyal, s son sinyal, u tarayıcı, m d|m|t, c ülke (ISO-2), d dil, k link kodu}
// g/<gün>/{giris,tekil,saat/<HH>,tepe} sayaçları (Paneller kartı). Eşzamanlı izleyici dakikalık hesaplanır: oturum [b, s+30 sn] arası açık sayılır. Gün / saat Türkiye saati.
const TRo=108e5,trG=t=>new Date(t+TRo).toISOString().slice(0,10),trS=t=>new Date(t+TRo).toISOString().slice(11,13);
function seyirciHesapla(C,I){I=I||{};
 const O=Object.entries(I.o||{}).map(([id,x])=>x&&+x.b?{id,b:+x.b,s:Math.max(+x.s||0,+x.b),u:x.u||id,m:x.m||"d",c:x.c||"",d:x.d||"",k:x.k||""}:null).filter(Boolean).sort((a,b)=>a.b-b.b);
 const dk=t=>Math.floor(t/6e4),F=new Map();O.forEach(o=>{const a=dk(o.b),z=dk(o.s+3e4)+1;F.set(a,(F.get(a)||0)+1);F.set(z,(F.get(z)||0)-1)});
 const H={},hs=(t)=>{const g=trG(t),sa=trS(t),k=g+" "+sa;return H[k]||(H[k]={g,sa,giris:0,tepe:0,tepeTs:0,dkT:0})};
 const ks=[...F.keys()].sort((a,b)=>a-b);let cur=0,tepe=0,tepeTs=0;
 for(let i=0;i<ks.length;i++){cur+=F.get(ks[i]);if(cur<=0)continue;const son=i+1<ks.length?ks[i+1]:ks[i]+1;
  for(let m=ks[i];m<son;m++){const t=m*6e4,h=hs(t);h.dkT+=cur;if(cur>h.tepe){h.tepe=cur;h.tepeTs=t}if(cur>tepe){tepe=cur;tepeTs=t}}}
 O.forEach(o=>hs(o.b).giris++);
 const G={};O.forEach(o=>{const g=trG(o.b),x=G[g]||(G[g]={g,giris:0,U:new Set,top:0,mob:0,tepe:0,tepeTs:0});x.giris++;x.U.add(o.u);x.top+=o.s-o.b;o.m!=="d"&&x.mob++});
 Object.values(H).forEach(h=>{const x=G[h.g]||(G[h.g]={g:h.g,giris:0,U:new Set,top:0,mob:0,tepe:0,tepeTs:0});if(h.tepe>x.tepe){x.tepe=h.tepe;x.tepeTs=h.tepeTs}});
 // ayrıntı kaydı olmayan günler: sayaçlardan
 Object.entries(I.g||{}).forEach(([g,v])=>{if(!G[g]&&v&&+v.giris)G[g]={g,giris:+v.giris||0,U:null,tekilS:+v.tekil||0,top:0,mob:0,tepe:+v.tepe||0,tepeTs:+v.tepeTs||0,sayac:!0}});
 const gunler=Object.values(G).sort((a,b)=>a.g.localeCompare(b.g)).map(x=>({...x,tekil:x.U?x.U.size:x.tekilS,ort:x.giris&&!x.sayac?x.top/x.giris:null}));
 const sureler=O.map(o=>o.s-o.b).sort((a,b)=>a-b),top=sureler.reduce((a,b)=>a+b,0);
 const cihaz={d:0,m:0,t:0},dil={},link={},ulke={};O.forEach(o=>{cihaz[o.m]=(cihaz[o.m]||0)+1;dil[o.d||"?"]=(dil[o.d||"?"]||0)+1;link[o.k||"?"]=(link[o.k||"?"]||0)+1;const u=ulke[o.c||"?"]||(ulke[o.c||"?"]={n:0,U:new Set});u.n++;u.U.add(o.u)});
 const sayacG=gunler.filter(x=>x.sayac);
 return{O,gunler,saatler:Object.values(H).filter(h=>h.giris||h.tepe).sort((a,b)=>(a.g+a.sa).localeCompare(b.g+b.sa)),giris:O.length+sayacG.reduce((a,x)=>a+x.giris,0),tekil:new Set(O.map(o=>o.u)).size+sayacG.reduce((a,x)=>a+x.tekil,0),
  tepe:Math.max(tepe,...gunler.map(x=>x.tepe)),tepeTs:tepe>=Math.max(0,...gunler.map(x=>x.tepe))?tepeTs:(gunler.find(x=>x.tepe===Math.max(...gunler.map(y=>y.tepe)))||{}).tepeTs||0,
  top,ort:O.length?top/O.length:null,med:sureler.length?sureler[sureler.length>>1]:null,cihaz,dil,link,ulke,aktif:Object.values(I.a||{}).filter(t=>Date.now()-(+t||0)<75e3).length}}

// ---------------- İŞLEM KAYDI ----------------
const LOG_TUR={athlete_call:"Sporcu çağrıldı",call_cancelled:"Çağrı iptal",score_submitted:"Puan kaydedildi",judge_score_submit:"Hakem notu girdi",sj_field_override:"Başhakem hakem alanını değiştirdi",
 score_field_cleared:"Alan silindi",score_unlock:"Kilit kaldırıldı",score_correction:"Başhakem notu değiştirdi",score_send_back:"Hakeme geri gönderildi",score_approval:"Puan onayı",score_irm:"IRM verildi",score_irm_clear:"IRM kaldırıldı",
 score_inquiry:"İtiraz açıldı",score_inquiry_decision:"İtiraz kararı",score_stop:"Yayın STOP",score_stop_release:"STOP kaldırıldı",final_create:"Final oluşturuldu",final_delete:"Final silindi",start_order_save:"Çıkış sırası kaydı",
 athlete_apparatus:"Sporcu aleti değişti",alet_transfer:"Alet aktarımı",panel_group_update:"Panel güncellendi",broadcast_profile:"Yayın profili",report_export:"Rapor indirildi",competition_update:"Yarışma güncellendi",competition_create:"Yarışma oluşturuldu",score_create:"Puan kaydedildi (Üst Jüri onayına)",score_modify:"Başhakem hakem notlarını değiştirdi",athlete_update:"Sporcu güncellendi"};
function logHesapla(C,logs,opt){const L0=[];Object.values(logs||{}).forEach(v=>{if(!v||typeof v!=="object")return;const t=v.type||"";if(t==="judge_score_submit"&&!opt.lHakem)return;if(opt.lTur&&opt.lTur.length&&!opt.lTur.includes(t))return;
  if(opt.lKul&&String(v.user||"")!==opt.lKul)return;L0.push({C,ts:+v.timestamp||0,t,kim:v.user||"",msj:String(v.message||v.mesaj||"").replace(/^\[(Ritmik|Aerobik)\]\s*/,""),sp:v.athleteName||"",al:v.alet||"",kat:v.category?katAdi(C.kategoriler||{},v.category):""})});
 return L0.sort((a,b)=>a.ts-b.ts)}

// ---------------- SAYFA ----------------
const RAPORLAR=[
 {id:"sonuc",ic:"format_list_numbered",t:"Resmi Sonuçlar",d:"Genel tasnif, alet, takım ve final sonuçları — PDF / Excel"},
 {id:"madalya",ic:"military_tech",t:"Madalya Tablosu",d:"Ülke, kulüp ya da il bazında; birden çok yarışmanın toplamı"},
 {id:"hakem",ic:"balance",t:"Hakem Sapma Analizi",d:"Üst jüri / panel notundan sapma, WG puanı, D hakem farkları"},
 {id:"itiraz",ic:"gavel",t:"Not Değişikliği ve İtirazlar",d:"İtirazlar ve ücretler, başhakem düzeltmeleri, kilit açma, yeniden kaydedilen puanlar"},
 {id:"zaman",ic:"schedule",t:"Zaman Çizelgesi",d:"Planlanan / gerçekleşen, gecikme, rutin süreleri"},
 {id:"sporcu",ic:"trending_up",t:"Sporcu Karşılaştırma",d:"Yarışmalar arası genel tasnif, alet ve final sonuçları"},
 {id:"katilim",ic:"groups",t:"Katılım İstatistikleri",d:"Kategori, kulüp, il / ülke ve yaş dağılımı; yarışmalar arası karşılaştırma"},
 {id:"video",ic:"video_library",t:"Video Arşivi Durumu",d:"Videosu olan / eksik rutinler, depolama, yükleme hataları"},
 {id:"seyirci",ic:"monitoring",t:"Seyirci İstatistikleri",d:"Seyirci sitesi: giriş, tekil ziyaretçi, en yüksek eşzamanlı izleyici, saatlik yoğunluk, ülke / cihaz"},
 {id:"log",ic:"history",t:"İşlem Kaydı",d:"Kim, ne zaman, neyi değiştirdi"}];

function Raporlar(){
 const{toast}=usToast();const _D=usInit()||{},BR=_D.id==="aerobik"?"aerobik":"ritmik",BASE=BR==="aerobik"?"aerobik_yarismalar":"ritmik_yarismalar",RP=_D.routePrefix||(BR==="aerobik"?"/aerobic":"/rhythmic"),BRAD=BR==="aerobik"?"Aerobik":"Ritmik";const{currentUser:U}=usAuth()||{};const kim=U?.adSoyad||U?.kullaniciAdi||"";
 const[liste,setListe]=R.useState(null),[secili,setSecili]=R.useState([]),[ara,setAra]=R.useState(""),[arsiv,setArsiv]=R.useState(!0),
       [rapor,setRapor]=R.useState("sonuc"),[veri,setVeri]=R.useState({}),[yuk,setYuk]=R.useState(!1),[busy,setBusy]=R.useState(""),
       [opt,setOpt]=R.useState({genel:!0,alet:!0,takim:!1,final:!0,kats:[],dil:"oto",grup:"oto",mGenel:!0,mAlet:!0,mAletElem:!1,mTakim:!0,mSira:"altin",hRef:"sj",hFin:!0,hPanel:["DA","DB","A","E"],hMin:1,dFin:!0,dHakem:!1,dTur:["bh_degistir","geri_gonder","hakem_yeniden","bh_alan","bh_bos","alan_sil","kilit","irm","hakem_duzelt"],sMin:1,sAra:"",sSira:"ad",lTur:[],lKul:"",lHakem:!1});
 const so=(k,v)=>setOpt(o=>({...o,[k]:v}));
 // yarışma listesi: yalnız başlık alanları (shallow + alan okuma) — kullanıcının yarışma / il kısıtına uyar
 R.useEffect(()=>{(async()=>{try{const B="https://analig-default-rtdb.firebaseio.com/"+BASE,ks=Object.keys(await(await fetch(B+".json?shallow=true")).json()||{});
   const yerel=/^(localhost|127\.0\.0\.1)$/.test(location.hostname),AL=["isim","il","baslangicTarihi","bitisTarihi","arsivli","tur","uluslararasi"];
   const L=await Promise.all(ks.filter(k=>!/^zz/.test(k)||yerel).map(async k=>{const o={_id:k};await Promise.all(AL.map(async a=>{try{o[a]=(await get(ref(db,BASE+"/"+k+"/"+a))).val()}catch{}}));return o}));
   const Y=U&&U.rolAdi!=="Super Admin"&&U.kullaniciAdi!=="admin"&&U.yarismalar&&typeof U.yarismalar==="object"&&Object.keys(U.yarismalar).length?U.yarismalar:null,il=U&&U.rolAdi!=="Super Admin"&&U.kullaniciAdi!=="admin"&&!Y?U.il:null;
   setListe(L.filter(c=>c.isim&&(!Y||Y[c._id])&&(!il||String(c.il||"").toLocaleUpperCase("tr-TR")===String(il).toLocaleUpperCase("tr-TR"))).sort((a,b)=>String(b.baslangicTarihi||"").localeCompare(String(a.baslangicTarihi||""))))}catch(er){console.error(er);setListe([])}})()},[]);
 // seçilen yarışmaların tam verisi
 R.useEffect(()=>{const eksik=secili.filter(k=>!veri[k]);if(!eksik.length)return;setYuk(!0);
  Promise.all(eksik.map(async k=>[k,{...((await get(ref(db,BASE+"/"+k))).val()||{}),_id:k,_br:BR}])).then(L=>setVeri(v=>{const n={...v};L.forEach(([k,c])=>n[k]=c);return n})).catch(()=>toast(__T("Hata oluştu."),"error")).finally(()=>setYuk(!1))},[secili]);
 // işlem kaydı (yalnız bu rapor için, yarışma başına bir kez; sunucu tarafı süzme)
 const[logV,setLogV]=R.useState({}),[logYuk,setLogYuk]=R.useState(!1);
 R.useEffect(()=>{if(!["itiraz","zaman","log"].includes(rapor))return;const eksik=secili.filter(k=>logV[k]===void 0);if(!eksik.length)return;setLogYuk(!0);
  Promise.all(eksik.map(async k=>{try{const r0=await fetch("https://analig-default-rtdb.firebaseio.com/logs.json?orderBy=%22competitionId%22&equalTo="+encodeURIComponent(JSON.stringify(k)));return[k,r0.ok?(await r0.json())||{}:{}]}catch{return[k,{}]}}))
   .then(L=>setLogV(v=>{const n={...v};L.forEach(([k,x])=>n[k]=x);return n})).finally(()=>setLogYuk(!1))},[secili,rapor]);
 // seyirci istatistiği (yalnız bu rapor için; Yenile ile yeniden okunur)
 const[istV,setIstV]=R.useState({}),[istYuk,setIstYuk]=R.useState(!1);
 R.useEffect(()=>{if(rapor!=="seyirci")return;const eksik=secili.filter(k=>istV[k]===void 0);if(!eksik.length)return;setIstYuk(!0);
  Promise.all(eksik.map(async k=>{try{return[k,(await get(ref(db,"criteria/seyirciIstat/"+BR+"_"+k))).val()||{}]}catch{return[k,{}]}}))
   .then(L=>setIstV(v=>{const n={...v};L.forEach(([k,x])=>n[k]=x);return n})).finally(()=>setIstYuk(!1))},[secili,rapor,istV]);
 const comps=secili.map(k=>veri[k]).filter(Boolean);
 const intlHepsi=comps.length&&comps.every(isIntl);
 const EN=opt.dil==="en"||(opt.dil==="oto"&&comps.length>0&&comps.every(c=>isIntl(c)&&c.ciktiDili!=="tr"));
 const grup=opt.grup==="oto"?(intlHepsi?"ulke":"kulup"):opt.grup;
 // kategori seçenekleri (seçili yarışmaların temel kategorileri)
 const katSec=R.useMemo(()=>{const m=new Map();comps.forEach(C=>Object.keys(C.kategoriler||{}).forEach(k=>{if(isFin(C.kategoriler,k))return;m.has(k)||m.set(k,katAdi(C.kategoriler,k))}));return[...m.entries()].sort((a,b)=>yasI(a[0])-yasI(b[0])||a[1].localeCompare(b[1],"tr"))},[comps.map(c=>c._id).join()]);
 const sonuc=R.useMemo(()=>{if(!V())return[];return comps.map(C=>({C,bol:sonucHesapla(C,rapor==="madalya"?{genel:!0,alet:!0,takim:opt.mTakim,final:!0,kats:opt.kats}:opt)}))},[comps.map(c=>c._id).join(),rapor,JSON.stringify(opt)]);
 const hakem=R.useMemo(()=>{if(rapor!=="hakem")return null;const all=comps.map(C=>({C,...(BRN(C)==="aerobik"?hakemAnalizAer(C,opt):hakemAnaliz(C,opt))}));const rows=all.flatMap(x=>x.rows),dfark=all.flatMap(x=>x.dfark);
  const oz={};all.forEach(x=>Object.entries(x.ozel).forEach(([P,v])=>{const o=oz[P]||(oz[P]={n:0,mud:0,blok:0,sjYok:0});o.n+=v.n;o.mud+=v.mud;o.blok+=v.blok;o.sjYok+=v.sjYok}));
  const pan=(BR==="ritmik"?["DA","DB","A","E"]:["A","E"]).filter(P=>opt.hPanel.includes(P)).map(P=>{const rs=rows.filter(r=>r.panel===P),n=rs.length;return{P,rut:oz[P]?.n||0,n,abs:n?rs.reduce((a,x)=>a+Math.abs(x.dev),0)/n:0,dis:rs.filter(x=>x.dis).length,pct:n&&rs.every(x=>x.pct!=null)?rs.reduce((a,x)=>a+x.pct,0)/n:null,mud:oz[P]?.mud||0,sjYok:oz[P]?.sjYok||0,blok:oz[P]?.blok||0}});
  const hk=hakemOzet(rows).filter(h=>h.n>=(opt.hMin||1)),buyuk=[...rows].sort((a,b)=>Math.abs(b.dev)-Math.abs(a.dev)).slice(0,40);
  const dOz=(BR==="ritmik"?["DA","DB"]:[]).filter(P=>opt.hPanel.includes(P)).map(P=>{const L=dfark.filter(x=>x.panel===P),n=L.length;return{P,n,ort:n?L.reduce((a,x)=>a+x.g,0)/n:0,asti:L.filter(x=>x.asti).length,mx:n?Math.max(...L.map(x=>x.g)):0}});
  return{rows,hk,pan,buyuk,dfark:[...dfark].sort((a,b)=>b.g-a.g),dOz,isimsiz:hk.filter(h=>!h.isimli).length}},[comps.map(c=>c._id).join(),rapor,JSON.stringify(opt)]);
 const degis=R.useMemo(()=>{if(rapor!=="itiraz")return null;const all=comps.map(C=>({C,...degisiklikHesapla(C,logV[C._id]||{},opt)}));
  const it=all.flatMap(x=>x.it),ev=all.flatMap(x=>x.ev),tekrar=all.flatMap(x=>x.tekrar);
  const ozet=all.map(x=>{const say=t=>x.tumEv.filter(e=>e.tur===t).length,its=x.it,D=its.filter(i=>i.tur==="DA"||i.tur==="DB");
   return{C:x.C,it:its.length,kabul:its.filter(i=>i.durum==="kabul").length,red:its.filter(i=>i.durum==="red").length,iptal:its.filter(i=>i.durum==="iptal").length,bek:its.filter(i=>i.durum==="beklemede").length,
    tahsil:D.filter(i=>i.durum==="red").reduce((a,i)=>a+(+i.ucret||0),0),iade:D.filter(i=>i.durum==="kabul").reduce((a,i)=>a+(+i.ucret||0),0),pb:(its.find(i=>i.paraBirimi)||{}).paraBirimi||"CHF",
    sure:its.filter(i=>i.sureIcinde===!1).length,tur:Object.fromEntries(Object.keys(DG_TUR).map(t=>[t,say(t)])),tekrar:x.tekrar.length,sonucDeg:x.tekrar.filter(t=>t.ilk!=null&&t.son!=null&&Math.abs(t.son-t.ilk)>1e-6).length,logVar:logV[x.C._id]!==void 0}});
  const kul={};it.forEach(i=>{const k=(i.C._id)+"|"+(i.temsil||"—"),o=kul[k]||(kul[k]={C:i.C,ad:i.temsil||"—",n:0,kabul:0,red:0,bek:0,tahsil:0,iade:0,pb:i.paraBirimi||"CHF"});o.n++;i.durum==="kabul"?(o.kabul++,o.iade+=+i.ucret||0):i.durum==="red"?(o.red++,o.tahsil+=+i.ucret||0):i.durum==="beklemede"&&o.bek++});
  return{it,ev,tekrar,ozet,kul:Object.values(kul).sort((a,b)=>b.n-a.n||a.ad.localeCompare(b.ad,"tr"))}},[comps.map(c=>c._id).join(),rapor,JSON.stringify(opt),logV]);
 const katilim=R.useMemo(()=>{if(rapor!=="katilim")return null;const all=comps.map(C=>katilimHesapla(C,opt)),cok=all.length>1;
  const ozet=all.map(x=>{const ind=x.sp.filter(s0=>!s0.G),u=new Set(x.sp.map(s0=>s0.kimlik)),ys=x.sp.map(s0=>s0.yas).filter(v=>v!=null&&v>3&&v<60);
   return{C:x.C,intl:x.intl,kat:x.kat.length,sporcu:u.size,grup:x.gruplar,kulup:new Set(x.sp.map(s0=>nrmAd(s0.kul)||"—")).size,bolge:new Set(x.sp.map(s0=>s0.bolge).filter(Boolean)).size,
    cikis:x.kat.reduce((a,k)=>a+k.cikis,0),yarisan:x.kat.reduce((a,k)=>a+k.yarisan,0),yarismayan:x.kat.reduce((a,k)=>a+k.yarismayan,0),finalist:new Set(x.sp.filter(s0=>s0.fin).map(s0=>s0.kimlik)).size,yas:ys.length?ys.reduce((a,b)=>a+b,0)/ys.length:null}});
  const kats=all.flatMap(x=>x.kat.map(k=>({...k,C:x.C})));
  const ku={};all.forEach(x=>x.sp.forEach(s0=>{const key=nrmAd(s0.kul)||"—",o=ku[key]||(ku[key]={ad:s0.kul||"—",bolge:new Set(),sp:new Set(),fin:new Set(),kat:{},yar:{}});s0.bolge&&o.bolge.add(s0.bolge);o.sp.add(s0.kimlik);s0.fin&&o.fin.add(s0.kimlik);
   const ka=katAdi(x.C.kategoriler,s0.k);o.kat[ka]=(o.kat[ka]||0)+1;(o.yar[x.C._id]||(o.yar[x.C._id]=new Set)).add(s0.kimlik)}));
  const kulup=Object.values(ku).map(o=>({ad:o.ad,bolge:[...o.bolge].join(", "),sp:o.sp.size,fin:o.fin.size,kat:Object.entries(o.kat).map(([a,n])=>a+" "+n).join(" · "),yar:Object.fromEntries(Object.entries(o.yar).map(([k,v])=>[k,v.size]))})).sort((a,b)=>b.sp-a.sp||a.ad.localeCompare(b.ad,"tr"));
  const bo={};all.forEach(x=>x.sp.forEach(s0=>{const key=s0.bolge||"—",o=bo[key]||(bo[key]={ad:key,sp:new Set(),kul:new Set(),fin:new Set()});o.sp.add(s0.kimlik);o.kul.add(nrmAd(s0.kul));s0.fin&&o.fin.add(s0.kimlik)}));
  const tumU=new Set(all.flatMap(x=>x.sp.map(s0=>s0.kimlik)));
  const bolge=Object.values(bo).map(o=>({ad:o.ad,sp:o.sp.size,kul:o.kul.size,fin:o.fin.size,pay:tumU.size?o.sp.size/tumU.size*100:0})).sort((a,b)=>b.sp-a.sp||a.ad.localeCompare(b.ad,"tr"));
  const yl={};const tek=new Map();all.forEach(x=>x.sp.forEach(s0=>{tek.has(s0.kimlik)||tek.set(s0.kimlik,s0)}));tek.forEach(s0=>{if(s0.yil)yl[s0.yil]=(yl[s0.yil]||0)+1});
  const yillar=Object.entries(yl).map(([y,n])=>({y:+y,n,pay:tek.size?n/tek.size*100:0})).sort((a,b)=>a.y-b.y);
  const tekrar=cok?(()=>{const m={};all.forEach(x=>new Set(x.sp.map(s0=>s0.kimlik)).forEach(k=>{m[k]=(m[k]||0)+1}));const v=Object.values(m);return{toplam:v.length,iki:v.filter(n=>n>=2).length}})():null;
  const intlVar=all.some(x=>x.intl),ilVar=all.some(x=>!x.intl);
  return{ozet,kats,kulup,bolge,yillar,tekrar,cok,bolgeTip:intlVar&&ilVar?"karma":intlVar?"ulke":"il",toplam:tumU.size}},[comps.map(c=>c._id).join(),rapor,JSON.stringify(opt),EN]);
 const zaman=R.useMemo(()=>{if(rapor!=="zaman")return null;const all=comps.map(C=>zamanHesapla(C,logV[C._id]||{},opt));return{bl:all.flatMap(x=>x.bl),gunler:all.flatMap(x=>x.gunler),planYok:comps.filter((c,i)=>!all[i].planVar).map(c=>c.isim),cagriYok:comps.filter((c,i)=>!all[i].cagriVar).map(c=>c.isim)}},[comps.map(c=>c._id).join(),rapor,JSON.stringify(opt),logV]);
 const sporcuK=R.useMemo(()=>{if(rapor!=="sporcu")return null;return sporcuKarsilastir(comps.map(C=>({C,bol:sonucHesapla(C,{genel:!0,alet:!1,takim:!1,final:!0,kats:opt.kats})})),opt)},[comps.map(c=>c._id).join(),rapor,JSON.stringify(opt)]);
 const video=R.useMemo(()=>{if(rapor!=="video")return null;const all=comps.map(C=>({C,...videoHesapla(C,opt)}));return{all,G:all.flatMap(x=>x.G),eksik:all.flatMap(x=>x.eksik),hata:all.flatMap(x=>x.hata)}},[comps.map(c=>c._id).join(),rapor,JSON.stringify(opt)]);
 const sey=R.useMemo(()=>{if(rapor!=="seyirci")return null;const all=comps.map(C=>({C,...seyirciHesapla(C,istV[C._id])})),ulke={},cihaz={d:0,m:0,t:0},dil={};
  all.forEach(x=>{Object.entries(x.ulke).forEach(([c,v])=>{const u=ulke[c]||(ulke[c]={c,n:0,t:0});u.n+=v.n;u.t+=v.U.size});Object.entries(x.cihaz).forEach(([k,v])=>cihaz[k]=(cihaz[k]||0)+v);Object.entries(x.dil).forEach(([k,v])=>dil[k]=(dil[k]||0)+v)});
  const n=all.reduce((a,x)=>a+x.O.length,0);
  return{all,n,gun:all.flatMap(x=>x.gunler.map(g=>({C:x.C,...g}))),saat:all.flatMap(x=>x.saatler.map(h=>({C:x.C,...h}))),ulke:Object.values(ulke).sort((a,b)=>b.n-a.n),cihaz,dil,ham:all.flatMap(x=>x.O.map(o=>({C:x.C,...o})))}},[comps.map(c=>c._id).join(),rapor,istV]);
 const islem=R.useMemo(()=>{if(rapor!=="log")return null;const rows=comps.flatMap(C=>logHesapla(C,logV[C._id]||{},opt)).sort((a,b)=>a.ts-b.ts),tur={},kul={};
  const tumKul=new Set();comps.forEach(C=>Object.values(logV[C._id]||{}).forEach(v=>v&&v.user&&tumKul.add(String(v.user))));
  const tumTur=new Set();comps.forEach(C=>Object.values(logV[C._id]||{}).forEach(v=>v&&v.type&&tumTur.add(String(v.type))));
  rows.forEach(x=>{tur[x.t]=(tur[x.t]||0)+1;kul[x.kim]=(kul[x.kim]||0)+1});
  return{rows,tur:Object.entries(tur).sort((a,b)=>b[1]-a[1]),kul:Object.entries(kul).sort((a,b)=>b[1]-a[1]),tumKul:[...tumKul].sort(),tumTur:[...tumTur].sort()}},[comps.map(c=>c._id).join(),rapor,JSON.stringify(opt),logV]);
 const madalya=R.useMemo(()=>rapor==="madalya"?madalyaHesapla(sonuc,{...opt,grup}):[],[sonuc,rapor,grup]);

 // ---- dil yardımcıları (çıktı) ----
 const L=(tr,en)=>EN?en:tr,kA=t=>EN?katEN(t):t,aA=a=>EN?(raAd(a,!0)||aletTr(a)):aletTr(a),UP=t=>String(t||"").toLocaleUpperCase(EN?"en":"tr-TR");
 const bolBaslik=b=>{const k=kA(b.katAd);if(BR!=="ritmik"&&(b.tip==="aa"||b.tip==="final_aa"))return k+" — "+(b.tip==="aa"?L("Sonuçlar","Results"):L("Final","Final"));return b.tip==="aa"?k+" — "+L(b.grp?"Grup Genel Tasnif":"Bireysel Genel Tasnif",b.grp?"Group All-Around":"Individual All-Around")
   :b.tip==="alet"?k+" — "+aA(b.alet)+L(" (Eleme)"," (Qualification)"):b.tip==="takim"?k+" — "+L("Takım Sıralaması","Team Ranking")
   :b.tip==="final_aa"?k+" — "+L("Genel Tasnif Finali","All-Around Final"):k+" — "+aA(b.alet)+" "+L("Finali","Final")};
 const temsil=r=>intlHepsi?(r.ulke||""):r.kulup||"";
 const adYaz=r=>r.takim?r.ad:[UP(r.soyad),r.soyad?String(r.ad||"").replace(new RegExp("\\s*"+String(r.soyad).replace(/[.*+?^${}()|[\]\\]/g,"\\$&")+"$"),""):r.ad].filter(Boolean).join(" ");
 const satirAd=r=>r.takim?r.ad:(r.soyad?UP(r.soyad)+" "+String(r.ad||"").replace(r.soyad,"").trim():r.ad);
 const sutunlar=b=>BR!=="ritmik"&&(b.tip==="aa"||b.tip==="final_aa")?[{b:"D",f:r=>f3(r.d)},{b:"A",f:r=>f3(r.a)},{b:"E",f:r=>f3(r.e)},{b:L("CEZA","PEN."),f:r=>r.pen?"−"+f3(r.pen):""},{b:L("TOPLAM","TOTAL"),f:r=>r.irm&&r.total==null?r.irm:f3(r.total),t:1}]:b.tip==="aa"||b.tip==="final_aa"?[...b.aletler.map(a=>({b:aA(a),f:r=>r.apps&&r.apps[a]!=null?(typeof r.apps[a]==="string"?r.apps[a]:f3(r.apps[a])):"—"})),{b:L("TOPLAM","TOTAL"),f:r=>r.irm&&r.total==null?r.irm:f3(r.total),t:1}]
   :b.tip==="takim"?[...b.aletler.map(a=>({b:aA(a),f:r=>r.apps[a]!=null?f3(r.apps[a]):"—"})),...(b.rows.some(r=>r.kesinti)?[{b:L("KESİNTİ","DED."),f:r=>r.kesinti?"−"+f3(r.kesinti):""}]:[]),{b:L("TOPLAM","TOTAL"),f:r=>f3(r.total),t:1}]
   :[{b:"DA",f:r=>f3(r.da)},{b:"DB",f:r=>f3(r.db)},{b:"A",f:r=>f3(r.a)},{b:"E",f:r=>f3(r.e)},{b:L("CEZA","PEN."),f:r=>r.pen?"−"+f3(r.pen):""},{b:L("TOPLAM","TOTAL"),f:r=>r.irm&&r.total==null?r.irm:f3(r.total),t:1}];

 // ---- hakem raporu yardımcıları ----
 const PAD=P=>({DA:L("Zorluk · Alet (DA)","Apparatus Difficulty (DA)"),DB:L("Zorluk · Beden (DB)","Body Difficulty (DB)"),A:L("Artistik (A)","Artistry (A)"),E:L("Uygulama (E)","Execution (E)")})[P]||P;
 const f2=v=>v==null||isNaN(v)?"—":Number(v).toFixed(2),sg=v=>v==null||isNaN(v)?"—":(v>0.0049?"+":v<-0.0049?"−":"±")+Math.abs(Number(v)).toFixed(2);
 const hkAd=h=>h.isimli?h.ad:h.ad+" · "+(comps.length>1?String(h.C.isim).slice(0,28):L("isim atanmamış","no name assigned"));
 const hkCols=()=>[L("HAKEM","JUDGE"),L("ÜLKE / İL","NOC / PROV."),L("PANEL","PANEL"),L("POZİSYON","POSITION"),...(comps.length>1?[L("YARIŞMA","COMP.")]:[]),L("NOT","SCORES"),L("ORT. SAPMA","MEAN DEV."),L("ORT. |SAPMA|","MEAN |DEV.|"),L("EN BÜYÜK","MAX"),L("TOL. DIŞI","OUT OF TOL."),L("WG %","WG %"),L("DERECE","GRADE"),L("KENDİ SPORCUSU LEHİNE","OWN ATHLETES")];
 const hkRow=h=>[hkAd(h),h.ulke||"",h.pan,h.poz,...(comps.length>1?[String(h.yar)]:[]),String(h.n),sg(h.ort),f2(h.abs),sg(h.mx),h.dis+" ("+Math.round(h.dis/h.n*100)+"%)",(h.pct==null?"—":h.pct.toFixed(1)),h.grade,h.leh?sg(h.leh.fark)+" ("+h.leh.n+")":""];
 const panCols=()=>[L("PANEL","PANEL"),L("RUTİN","ROUTINES"),L("HAKEM NOTU","JUDGE SCORES"),L("ORT. |SAPMA|","MEAN |DEV.|"),L("TOL. DIŞI","OUT OF TOL."),L("WG %","WG %"),L("ÜST JÜRİ MÜDAHALESİ","SJ INTERVENTION"),L("SJ NOTU YOK","NO SJ SCORE"),BR==="ritmik"?L("BLOK (>2.00)","BLOCK (>2.00)"):L("UÇ FARK ≥ 1.0","SPREAD ≥ 1.0")];
 const panRow=p=>[PAD(p.P),String(p.rut),String(p.n),f2(p.abs),p.n?p.dis+" ("+Math.round(p.dis/p.n*100)+"%)":"0",(p.pct==null?"—":p.pct.toFixed(1)),String(p.mud),String(p.sjYok),p.P==="A"||p.P==="E"?String(p.blok):"—"];
 const spAd=r=>(r.grp?r.sp.kulup||r.sp.ad:r.sp.ad)+(r.sp.ulke?" ("+r.sp.ulke+")":"");
 const bCols=()=>[L("HAKEM","JUDGE"),L("POZ.","POS."),...(comps.length>1?[L("YARIŞMA","COMP.")]:[]),L("KATEGORİ","CATEGORY"),L("SPORCU","GYMNAST"),L("ALET","APP."),L("NOT","SCORE"),L("REFERANS","REFERENCE"),L("SAPMA","DEV."),L("TOL.","TOL.")];
 const bRow=r=>[r.kim?r.kim.ad:"—",r.poz,...(comps.length>1?[String(r.C.isim).slice(0,26)]:[]),kA(r.katAd),spAd(r),aA(r.al),f2(r.val),f2(r.ref)+" "+(r.refKaynak==="SJ"?"SJ":r.refKaynak==="Ortak"?L("ortak","common"):L("panel","panel")),sg(r.dev),f2(r.tol)];
 const dCols=()=>[...(comps.length>1?[L("YARIŞMA","COMP.")]:[]),L("KATEGORİ","CATEGORY"),L("SPORCU","GYMNAST"),L("ALET","APP."),L("HAKEMLER","JUDGES"),L("NOTLAR","SCORES"),L("FARK","DIFF."),L("EŞİK","THRESHOLD")];
 const dRow=x=>[...(comps.length>1?[String(x.C.isim).slice(0,26)]:[]),kA(x.katAd),spAd(x),aA(x.al),x.c,f2(x.u)+" / "+f2(x.w),f2(x.g),f2(x.esik)];
 // ---- değişiklik / itiraz yardımcıları ----
 const zm=t=>t?new Date(+t).toLocaleString(EN?"en-GB":"tr-TR",{day:"2-digit",month:"2-digit",hour:"2-digit",minute:"2-digit"}):"—";
 const dv=v=>v==null||v===""?"—":isNaN(v)?String(v):Number(v).toFixed(String(v).includes(".")&&String(v).split(".")[1].length>2?3:2);
 const TA=t=>DG_TUR[t]?L(DG_TUR[t][0],DG_TUR[t][2]):t,TAui=t=>__T(DG_TUR[t]?.[0]||t);
 const itCols=()=>[L("TALEP","REQUEST"),...(comps.length>1?[L("YARIŞMA","COMP.")]:[]),L("KATEGORİ","CATEGORY"),L("SPORCU","GYMNAST"),L("TEMSİL","NOC / CLUB"),L("ALET","APP."),L("TÜR","TYPE"),L("SÜRE","TIME"),L("DEĞER","VALUE"),L("SONUÇ","RESULT"),L("ÜCRET","FEE"),L("KARAR","DECISION"),L("KARAR VEREN","DECIDED BY")];
 const itRow=i=>[zm(i.talepZamani),...(comps.length>1?[String(i.C.isim).slice(0,24)]:[]),kA(i.katAd),i.sporcuAd||"",i.temsil||"",i.alet?aA(i.alet):(i.aletAd||""),IT_TUR[i.tur]||i.tur||"",(i.gecenSn!=null?i.gecenSn+" "+L("sn","s"):"—")+(i.sureIcinde===!1?" ⚠":""),
  dv(i.eskiDeger)+(i.durum==="kabul"&&i.yeniDeger!=null?" → "+dv(i.yeniDeger):""),f3(i.eskiSonuc)+(i.durum==="kabul"&&i.yeniSonuc!=null?" → "+f3(i.yeniSonuc):""),(+i.ucret?i.ucret+" "+(i.paraBirimi||"CHF")+" ("+i.ucretKademe+".)":L("ücretsiz","free")),
  L(IT_DUR[i.durum]||i.durum||"",({beklemede:"Pending",kabul:"Accepted",red:"Rejected",iptal:"Withdrawn"})[i.durum]||i.durum||""),(i.kararVeren||"")+(i.kararZamani&&i.talepZamani?" · "+Math.round((i.kararZamani-i.talepZamani)/1e3)+L(" sn"," s"):"")];
 const evCols=()=>[L("ZAMAN","TIME"),...(comps.length>1?[L("YARIŞMA","COMP.")]:[]),L("İŞLEM","ACTION"),L("KATEGORİ","CATEGORY"),L("SPORCU","GYMNAST"),L("ALET","APP."),L("ALAN","FIELD"),L("HAKEM","JUDGE"),L("ESKİ","OLD"),L("YENİ","NEW"),L("FARK","DIFF."),L("YAPAN","BY"),L("NOT","NOTE")];
 const evRow=x=>{const a=parseFloat(x.eski),b=parseFloat(x.yeni);return[zm(x.ts),...(comps.length>1?[String(x.C.isim).slice(0,24)]:[]),TA(x.tur),kA(x.katAd),x.sp||"",x.al?aA(x.al):"",x.poz||"",x.hakem?x.hakem.ad:"",dv(x.eski),dv(x.yeni),!isNaN(a)&&!isNaN(b)?sg(b-a):"",x.kim||"",x.not||""]};
 const tkCols=()=>[...(comps.length>1?[L("YARIŞMA","COMP.")]:[]),L("KATEGORİ","CATEGORY"),L("SPORCU","GYMNAST"),L("TEMSİL","NOC / CLUB"),L("ALET","APP."),L("KAYIT","SAVES"),L("KİLİT AÇMA","UNLOCKS"),L("İLK SONUÇ","FIRST"),L("SON SONUÇ","LAST"),L("FARK","DIFF."),L("İLK / SON KAYIT","FIRST / LAST SAVE")];
 const tkRow=t=>[...(comps.length>1?[String(t.C.isim).slice(0,24)]:[]),kA(t.katAd),t.sp,t.temsil,aA(t.al),String(t.n),String(t.kilit),f3(t.ilk),f3(t.son),t.ilk!=null&&t.son!=null?(Math.abs(t.son-t.ilk)<1e-6?"±0.000":(t.son>t.ilk?"+":"−")+Math.abs(t.son-t.ilk).toFixed(3)):"",zm(t.ts1)+" / "+zm(t.ts2)];
 const ozCols=()=>[L("YARIŞMA","COMPETITION"),L("İTİRAZ","INQUIRIES"),L("KABUL","ACCEPTED"),L("RED","REJECTED"),L("GERİ ÇEKİLEN","WITHDRAWN"),L("BEKLEYEN","PENDING"),L("SÜRE SONRASI","LATE"),L("ÜCRET TAHSİL","FEES KEPT"),L("ÜCRET İADE","FEES REFUNDED"),L("YENİDEN KAYIT","RE-SAVED"),L("SONUCU DEĞİŞEN","RESULT CHANGED")];
 const ozRow=o=>[o.C.isim,String(o.it),String(o.kabul),String(o.red),String(o.iptal),String(o.bek),String(o.sure),o.tahsil+" "+o.pb,o.iade+" "+o.pb,String(o.tekrar),String(o.sonucDeg)];
 const turCols=()=>[L("YARIŞMA","COMPETITION"),...Object.keys(DG_TUR).filter(t=>t!=="hakem_duzelt"||opt.dHakem).map(t=>TA(t))];
 const turRow=o=>[o.C.isim,...Object.keys(DG_TUR).filter(t=>t!=="hakem_duzelt"||opt.dHakem).map(t=>String(o.tur[t]||0))];
 // ---- katılım yardımcıları ----
 const bAd=t=>t==="karma"?L("İl / Ülke","Province / NOC"):t==="ulke"?L("Ülke","NOC"):L("İl","Province");
 const f1=v=>v==null||isNaN(v)?"—":Number(v).toFixed(1),yz=v=>(v||0).toFixed(1)+"%";
 const kOzCols=()=>[L("YARIŞMA","COMPETITION"),L("KATEGORİ","CATEGORIES"),L("SPORCU","GYMNASTS"),L("GRUP","GROUPS"),L("KULÜP","CLUBS"),L("İL / ÜLKE","PROV. / NOC"),(BR==="ritmik"?L("ALET ÇIKIŞI","STARTS"):L("ÇIKIŞ","STARTS")),L("PUANLANAN","SCORED"),L("PUANI OLMAYAN","NO SCORE"),L("FİNALİST","FINALISTS"),L("YAŞ ORT.","MEAN AGE")];
 const kOzRow=o=>[o.C.isim,String(o.kat),String(o.sporcu),String(o.grup),String(o.kulup),String(o.bolge),String(o.cikis),String(o.yarisan),String(o.yarismayan),String(o.finalist),f1(o.yas)];
 const kKatCols=()=>[...(comps.length>1?[L("YARIŞMA","COMP.")]:[]),L("KATEGORİ","CATEGORY"),L("SPORCU","GYMNASTS"),L("GİRİŞ","ENTRIES"),L("KULÜP","CLUBS"),L("İL / ÜLKE","PROV. / NOC"),(BR==="ritmik"?L("ALET ÇIKIŞI","STARTS"):L("ÇIKIŞ","STARTS")),L("PUANLANAN","SCORED"),L("PUANI OLMAYAN","NO SCORE"),L("FİNALİST","FINALISTS"),L("YAŞ (ORT. · ARALIK)","AGE (MEAN · RANGE)")];
 const kKatRow=k=>[...(comps.length>1?[String(k.C.isim).slice(0,26)]:[]),kA(k.ad)+(k.grp?" ("+L("grup","group")+")":""),String(k.sporcu),String(k.giris),String(k.kulup),String(k.bolge),String(k.cikis),String(k.yarisan),String(k.yarismayan),String(k.finalist),k.yasOrt!=null?f1(k.yasOrt)+" · "+k.yasMin+"–"+k.yasMax:"—"];
 const kKulCols=()=>[L("KULÜP / TAKIM","CLUB / TEAM"),katilim?bAd(katilim.bolgeTip).toLocaleUpperCase(EN?"en":"tr-TR"):"",L("SPORCU","GYMNASTS"),L("FİNALİST","FINALISTS"),...(comps.length>1?comps.map(c=>String(c.isim).slice(0,18)):[]),L("KATEGORİLER","CATEGORIES")];
 const kKulRow=o=>[o.ad,o.bolge,String(o.sp),String(o.fin),...(comps.length>1?comps.map(c=>String(o.yar[c._id]||"")):[]),o.kat];
 // ---- zaman / sporcu / video / işlem yardımcıları ----
 const saatS=t=>t?new Date(+t).toLocaleTimeString(EN?"en-GB":"tr-TR",{hour:"2-digit",minute:"2-digit"}):"—";
 const dkS=ms=>ms==null?"—":(ms<0?"−":ms>0?"+":"")+Math.round(Math.abs(ms)/6e4)+L(" dk"," min");
 const sureS=ms=>ms==null?"—":ms<6e4?Math.round(ms/1e3)+L(" sn"," s"):ms<36e5?Math.floor(ms/6e4)+L(" dk "," min ")+String(Math.round(ms%6e4/1e3)).padStart(2,"0")+L(" sn"," s"):Math.floor(ms/36e5)+L(" sa "," h ")+Math.round(ms%36e5/6e4)+L(" dk"," min");
 const gunS=g=>{const m=/^(\d{4})-(\d{2})-(\d{2})/.exec(g||"");return m?m[3]+"."+m[2]+"."+m[1]:g||"—"};
 const zgCols=()=>[...(comps.length>1?[L("YARIŞMA","COMP.")]:[]),L("GÜN","DAY"),L("BLOK","BLOCKS"),L("RUTİN","ROUTINES"),L("PUANLANAN","SCORED"),L("PLAN BAŞLANGIÇ","PLANNED START"),L("GERÇEK BAŞLANGIÇ","ACTUAL START"),L("BAŞLANGIÇ FARKI","START DELAY"),L("SON PUAN","LAST SCORE"),L("TOPLAM SÜRE","DURATION"),L("ORT. BLOK GECİKMESİ","MEAN BLOCK DELAY"),L("EN BÜYÜK GECİKME","MAX DELAY")];
 const zgRow=g=>[...(comps.length>1?[String(g.C.isim).slice(0,26)]:[]),gunS(g.gun),String(g.blok),String(g.rutin),String(g.puanli),saatS(g.planBas),saatS(g.bas)+(g.farkliGun?" ("+gunS(gunStr(g.bas))+")":""),g.farkliGun?L("farklı gün","other day"):dkS(g.gecikme),saatS(g.son),sureS(g.sure),dkS(g.ortGec),dkS(g.maxGec)];
 const zbCols=()=>[...(comps.length>1?[L("YARIŞMA","COMP.")]:[]),L("GÜN","DAY"),L("PLAN","PLAN"),L("KATEGORİ","CATEGORY"),L("ALET","APP."),L("RUTİN","ROUT."),L("PUANLANAN","SCORED"),L("BAŞLADI","STARTED"),L("GECİKME","DELAY"),L("BİTTİ","ENDED"),L("SÜRE","DURATION"),L("PLAN SÜRESİ","PLANNED"),L("RUTİN BAŞINA","PER ROUTINE"),L("ÇAĞRI → PUAN","CALL → SCORE")];
 const zbRow=b=>[...(comps.length>1?[String(b.C.isim).slice(0,22)]:[]),gunS(b.gun),b.saat||"—",kA(b.kat),b.al.map(aA).join(", "),String(b.n),String(b.puanli),saatS(b.bas)+(b.farkliGun?" ("+gunS(gunStr(b.bas))+")":""),b.farkliGun?L("farklı gün","other day"):dkS(b.gecikme),saatS(b.son),sureS(b.sure),sureS(b.planSure),sureS(b.rutin),sureS(b.cagriPuan)];
 const skCols=()=>[L("SPORCU","GYMNAST"),L("TEMSİL","NOC / CLUB"),L("YARIŞMA","COMP."),...comps.map(c=>String(c.isim).slice(0,22)),L("İLK → SON FARK","FIRST → LAST"),L("EN İYİ","BEST")];
 const skHucre=y=>!y?"—":(y.aa!=null?(y.irm?y.irm:f3(y.aa))+(y.rank?" ("+y.rank+".)":""):"")+(y.kat?"\n"+kA(y.kat):"")+(y.fin.length?"\n"+L("Final: ","Finals: ")+y.fin.map(f0=>(f0.alet==="AA"?L("Genel","AA"):aA(f0.alet))+" "+f3(f0.total)+(f0.rank?" ("+f0.rank+".)":"")).join(", "):"");
 const skRow=x=>[x.ad,x.temsil,String(x.n),...comps.map(c=>skHucre(x.yar.find(y=>y.C._id===c._id))),x.fark==null?"—":(x.fark>0?"+":x.fark<0?"−":"±")+Math.abs(x.fark).toFixed(3)+(x.ayniKat?"":" *"),x.enIyi!=null?f3(x.enIyi):"—"];
 const vdCols=()=>[...(comps.length>1?[L("YARIŞMA","COMP.")]:[]),L("KATEGORİ","CATEGORY"),L("ALET","APP."),L("PUANLANAN RUTİN","SCORED ROUTINES"),L("VİDEOLU","WITH VIDEO"),L("KAMERA A","CAMERA A"),L("KAMERA B","CAMERA B"),L("EKSİK","MISSING"),L("KAPSAMA","COVERAGE"),L("CLOUDINARY (ERİŞİLEMEZ)","CLOUDINARY (UNAVAILABLE)")];
 const vdRow=g=>[...(comps.length>1?[String(g.C.isim).slice(0,26)]:[]),kA(g.kat),aA(g.al),String(g.rutin),String(g.biri),String(g.a),String(g.b),String(g.rutin-g.biri),g.rutin?Math.round(g.biri/g.rutin*100)+"%":"—",String(g.cl)];
 const vOzCols=()=>[L("YARIŞMA","COMPETITION"),L("PUANLANAN RUTİN","SCORED ROUTINES"),L("VİDEOLU","WITH VIDEO"),L("EKSİK","MISSING"),L("KAPSAMA","COVERAGE"),L("DRIVE","DRIVE"),L("CLOUDINARY","CLOUDINARY"),L("TOPLAM BOYUT","TOTAL SIZE"),L("TOPLAM SÜRE","TOTAL LENGTH"),L("ORT. YÜKLEME","MEAN UPLOAD"),L("YÜKLEME HATASI","UPLOAD ERRORS")];
 const vOzRow=x=>{const R0=x.G.reduce((a,g)=>a+g.rutin,0),V0=x.G.reduce((a,g)=>a+g.biri,0);return[x.C.isim,String(R0),String(V0),String(R0-V0),R0?Math.round(V0/R0*100)+"%":"—",String(x.src.drive),String(x.src.cloudinary),x.mb?(x.mb>=1024?(x.mb/1024).toFixed(2)+" GB":x.mb.toFixed(1)+" MB"):"—",x.sure?sureS(x.sure*1e3):"—",x.yukOrt!=null?sureS(x.yukOrt*1e3):"—",String(x.hata.length)]};
 const syP=(a,b)=>b?Math.round(a/b*100)+"%":"—",syGun=g=>new Date(g+"T12:00:00").toLocaleDateString(EN?"en-GB":"tr-TR",{day:"2-digit",month:"short",year:"numeric",weekday:"short"}),syZ=t=>t?new Date(t+TRo).toISOString().slice(11,16):"—";
 const syUlke=c=>{if(!c||c==="?")return L("Bilinmiyor","Unknown");try{return new Intl.DisplayNames([EN?"en":"tr"],{type:"region"}).of(c)||c}catch{return c}};
 const syCih={d:["Bilgisayar","Desktop"],m:["Telefon","Phone"],t:["Tablet","Tablet"]};
 const syOzCols=()=>[L("YARIŞMA","COMPETITION"),L("GİRİŞ (OTURUM)","SESSIONS"),L("TEKİL ZİYARETÇİ","UNIQUE VISITORS"),L("EN YÜKSEK EŞZAMANLI","PEAK CONCURRENT"),L("TEPE ZAMANI","PEAK AT"),L("ORT. İZLEME","AVG. VIEW"),L("MEDYAN","MEDIAN"),L("TOPLAM İZLEME","TOTAL VIEW TIME"),L("MOBİL","MOBILE"),L("ÜLKE","COUNTRIES")];
 const syOzRow=x=>[x.C.isim,String(x.giris),String(x.tekil),String(x.tepe),x.tepeTs?syGun(trG(x.tepeTs))+" "+syZ(x.tepeTs):"—",x.ort!=null?sureS(x.ort):"—",x.med!=null?sureS(x.med):"—",x.top?sureS(x.top):"—",syP(x.cihaz.m+x.cihaz.t,x.O.length),String(Object.keys(x.ulke).filter(c=>c!=="?").length)];
 const syGCols=()=>[...(comps.length>1?[L("YARIŞMA","COMP.")]:[]),L("GÜN","DAY"),L("GİRİŞ","SESSIONS"),L("TEKİL","UNIQUE"),L("EN YÜKSEK EŞZAMANLI","PEAK CONCURRENT"),L("TEPE SAATİ","PEAK AT"),L("ORT. İZLEME","AVG. VIEW"),L("MOBİL","MOBILE")];
 const syGRow=x=>[...(comps.length>1?[String(x.C.isim).slice(0,26)]:[]),syGun(x.g),String(x.giris),String(x.tekil),String(x.tepe),syZ(x.tepeTs),x.ort!=null?sureS(x.ort):x.sayac?L("sayaç","counter"):"—",x.sayac?"—":syP(x.mob,x.giris)];
 const sySCols=()=>[...(comps.length>1?[L("YARIŞMA","COMP.")]:[]),L("GÜN","DAY"),L("SAAT","HOUR"),L("YENİ GİRİŞ","NEW SESSIONS"),L("EN YÜKSEK EŞZAMANLI","PEAK CONCURRENT"),L("ORT. EŞZAMANLI","AVG. CONCURRENT")];
 const sySRow=x=>[...(comps.length>1?[String(x.C.isim).slice(0,26)]:[]),syGun(x.g),x.sa+":00–"+String(+x.sa+1).padStart(2,"0")+":00",String(x.giris),String(x.tepe),(x.dkT/60).toFixed(1)];
 const syUCols=()=>[L("ÜLKE","COUNTRY"),L("KOD","CODE"),L("OTURUM","SESSIONS"),L("TEKİL","UNIQUE"),L("PAY","SHARE")];
 const syURow=u=>[syUlke(u.c),u.c==="?"?"—":u.c,String(u.n),String(u.t),syP(u.n,sey?sey.n:0)];
 const syCRows=()=>sey?[...Object.entries(sey.cihaz).filter(([,v])=>v).map(([k,v])=>[L(...(syCih[k]||[k,k])),String(v),syP(v,sey.n)]),...Object.entries(sey.dil).map(([k,v])=>[L("Dil: ","Language: ")+(k==="?"?L("varsayılan","default"):k.toUpperCase()),String(v),syP(v,sey.n)])]:[];
 const LT=t=>{const v=LOG_TUR[t];return v?(EN?({athlete_call:"Athlete called",call_cancelled:"Call cancelled",score_submitted:"Score saved",judge_score_submit:"Judge entered score",sj_field_override:"Chief judge edited judge field",score_field_cleared:"Field cleared",score_unlock:"Unlocked",score_correction:"Chief judge changed score",score_send_back:"Sent back to judge",score_approval:"Score approval",score_irm:"IRM given",score_irm_clear:"IRM removed",score_inquiry:"Inquiry opened",score_inquiry_decision:"Inquiry decision",score_stop:"Broadcast STOP",score_stop_release:"STOP released",final_create:"Final created",final_delete:"Final deleted",start_order_save:"Start order saved",athlete_apparatus:"Athlete apparatus changed",alet_transfer:"Apparatus transfer",panel_group_update:"Panel updated",broadcast_profile:"Broadcast profile",report_export:"Report downloaded",competition_update:"Competition updated",competition_create:"Competition created",score_create:"Score saved (to Superior Jury)",score_modify:"Chief judge changed judge scores",athlete_update:"Athlete updated"})[t]||v:v):t};
 const lgCols=()=>[L("ZAMAN","TIME"),...(comps.length>1?[L("YARIŞMA","COMP.")]:[]),L("İŞLEM","ACTION"),L("KULLANICI","USER"),L("KATEGORİ","CATEGORY"),L("SPORCU","GYMNAST"),L("ALET","APP."),L("AYRINTI","DETAILS")];
 const lgRow=x=>[new Date(x.ts).toLocaleString(EN?"en-GB":"tr-TR",{day:"2-digit",month:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit"}),...(comps.length>1?[String(x.C.isim).slice(0,22)]:[]),LT(x.t),x.kim,kA(x.kat),x.sp,x.al?aA(x.al):"",x.msj];
 // ---- PDF ----
 const pdfAl=async()=>{if(busy||!comps.length)return;setBusy("pdf");toast(__T("PDF hazırlanıyor…"),"info");
  try{const jsPDF=await import("./jspdf.es.min-gArCfqm1Cb2.js").then(z=>z.j?.jsPDF||z.E),atM=await import("./jspdf.plugin.autotable-KFqWVtFsCb2.js"),at=atM.default||atM;
   const yatay=["hakem","itiraz","katilim","zaman","sporcu","video","log","seyirci"].includes(rapor)||rapor==="sonuc"&&sonuc.some(x=>x.bol.some(b=>(b.tip==="aa"||b.tip==="final_aa")&&b.aletler.length>4)),d=new jsPDF(yatay?"landscape":"portrait","mm","a4");
   let FT="helvetica";try{const{R:r0,B:b0}=await import("./fontTR-Fn01a2b3Cb2.js");d.addFileToVFS("Roboto.ttf",r0);d.addFont("Roboto.ttf","Roboto","normal");d.addFileToVFS("Roboto-Bold.ttf",b0);d.addFont("Roboto-Bold.ttf","Roboto","bold");FT="Roboto"}catch{}
   const img=async u=>{try{const b=await(await fetch(u)).blob();const du=await new Promise(K=>{const O=new FileReader;O.onloadend=()=>K(O.result);O.readAsDataURL(b)});const im=new Image;await new Promise(r=>{im.onload=r;im.onerror=r;im.src=du});return im.naturalWidth?{d:du,r:im.naturalWidth/im.naturalHeight}:null}catch{return null}};
   const tcf=await img("/logo.png"),W=yatay?297:210,H=yatay?210:297,M=12,P1=[236,72,153],P2=[139,92,246],INK=[15,23,42],MUT=[100,116,139];
   const FL=intlHepsi?await bayraklarPng(rapor==="madalya"?madalya.map(r=>r.ulke):sonuc.flatMap(x=>x.bol.flatMap(b=>b.rows.map(r=>r.ulke)))):{};
   const serit=(yy,h)=>{const n=60;for(let i=0;i<n;i++){const t=i/(n-1);d.setFillColor(P1[0]+(P2[0]-P1[0])*t,P1[1]+(P2[1]-P1[1])*t,P1[2]+(P2[2]-P1[2])*t);d.rect(i*W/n,yy,W/n+.3,h,"F")}};
   let y=0,sayfa=0,kafa="";
   const ust=async(C,baslik)=>{if(sayfa++)d.addPage();serit(0,3);let lx=M;const lh=16;
    if(tcf){const w=lh*tcf.r;d.addImage(tcf.d,"PNG",lx,8,w,lh,"tcf","FAST");lx+=w+4}
    const ev=C&&C.etkinlikLogo?(C._ev||(C._ev=await img(C.etkinlikLogo))):null;if(ev){const w=Math.min(34,lh*ev.r);d.addImage(ev.d,"PNG",W-M-w,8,w,lh,"ev_"+C._id,"FAST")}
    d.setTextColor(...INK);d.setFont(FT,"bold");d.setFontSize(12.5);d.text(UP(C?C.isim:L("Seçili yarışmalar","Selected competitions")),lx,13.5,{maxWidth:W-lx-M-(ev?38:0)});
    d.setFont(FT,"normal");d.setFontSize(8.5);d.setTextColor(...MUT);d.text(C?[tarihStr(C),C.il||""].filter(Boolean).join("  ·  "):comps.map(c=>c.isim).join(" · ").slice(0,160),lx,19,{maxWidth:W-lx-M});
    kafa=UP(C?C.isim:L("Seçili yarışmalar","Selected competitions"))+"  ·  "+baslik;d.setFont(FT,"bold");d.setFontSize(10);d.setTextColor(...P1);d.text(baslik,lx,25);
    d.setDrawColor(226,232,240);d.setLineWidth(.3);d.line(M,30,W-M,30);y=36};
   const alt=()=>{const n=d.getNumberOfPages();for(let i=1;i<=n;i++){d.setPage(i);serit(H-1.6,1.6);d.setFont(FT,"normal");d.setFontSize(7);d.setTextColor(...MUT);
     d.text(L("Gymexa Score · Türkiye Cimnastik Federasyonu","Gymexa Score · Turkish Gymnastics Federation"),M,H-5);d.text(new Date().toLocaleString(EN?"en-GB":"tr-TR",{dateStyle:"short",timeStyle:"short"})+"   "+i+" / "+n,W-M,H-5,{align:"right"})}};
   const bayrakCiz=(z,kod)=>{const f=kod&&FL[kod];if(f)try{d.addImage(f,"PNG",z.cell.x+2,z.cell.y+(z.cell.height-3.4)/2,4.5,3.4,"fl_"+kod,"FAST")}catch{}};
   const devam=()=>{serit(0,3);d.setFont(FT,"bold");d.setFontSize(7.5);d.setTextColor(...MUT);d.text(kafa,M,10,{maxWidth:W-2*M});d.setDrawColor(226,232,240);d.setLineWidth(.3);d.line(M,13,W-M,13)};
   const tablo=(head,body,o)=>{const p0=d.getNumberOfPages();at(d,{startY:y,margin:{left:M,right:M,top:18,bottom:12},head:[head],body,theme:"plain",
     styles:{font:FT,fontSize:8,cellPadding:{top:1.5,bottom:1.5,left:2,right:2},textColor:INK,lineColor:[238,240,244],lineWidth:{bottom:.25}},
     headStyles:{fontStyle:"bold",fontSize:6.8,textColor:[255,255,255],fillColor:P2},...o,
     didParseCell:z=>{if(z.section==="body"){if(z.row.index%2)z.cell.styles.fillColor=[250,250,253];o.parse&&o.parse(z)}},
     didDrawPage:z=>{if(d.getNumberOfPages()>p0)devam()}});y=d.lastAutoTable.finalY+8};
   const bolumBas=t=>{if(y>H-40){d.addPage();devam();y=18}d.setFillColor(253,242,248);d.roundedRect(M,y,W-2*M,8,2,2,"F");d.setFillColor(...P1);d.roundedRect(M,y,2.2,8,1,1,"F");
    d.setFont(FT,"bold");d.setFontSize(9.5);d.setTextColor(...INK);d.text(UP(t),M+5,y+5.5);y+=11};
   if(rapor==="sonuc"){
    for(const{C,bol}of sonuc){await ust(C,L("RESMİ SONUÇLAR","OFFICIAL RESULTS"));const ic=isIntl(C);
     if(!bol.length){d.setFont(FT,"normal");d.setFontSize(9);d.setTextColor(...MUT);d.text(L("Seçili kapsamda puanı olan sonuç yok.","No scored results in the selected scope."),M,y);y+=8}
     for(const b of bol){bolumBas(bolBaslik(b));const cols=sutunlar(b),HB=b.rows.some(r=>r.bib),uc=1+(HB?1:0)+1;
      const head=[L("SIRA","RANK"),...(HB?["BIB"]:[]),b.tip==="takim"?L("TAKIM","TEAM"):L("SPORCU","GYMNAST"),ic?L("ÜLKE","NOC"):L("KULÜP / İL","CLUB / PROV."),...cols.map(c=>c.b)];
      const body=b.rows.map(r=>[r.rank!=null?String(r.rank):"",...(HB?[String(r.bib||"")]:[]),(b.tip==="takim"?r.ad:satirAd(r))+(r.takim&&r.uyeler&&r.uyeler.length?"\n"+r.uyeler.join(", "):""),ic?(r.ulke||""):(r.takim?(r.il&&UP(r.il)!==UP(r.ad)?UP(r.il):""):UP(r.kulup||r.il)),...cols.map(c=>c.f(r))]);
      const cs={0:{cellWidth:11,halign:"center",fontStyle:"bold"},[uc]:ic?{cellWidth:19,cellPadding:{top:1.5,bottom:1.5,left:8,right:1}}:{cellWidth:32,fontSize:7.2}};cols.forEach((c,i)=>{cs[uc+1+i]={halign:"right",cellWidth:c.t?18:14,fontStyle:c.t?"bold":"normal"}});
      tablo(head,body,{columnStyles:cs,parse:z=>{const r=b.rows[z.row.index];if(r&&r.rank>=1&&r.rank<=3&&z.column.index===0)z.cell.styles.textColor=r.rank===1?[180,130,0]:r.rank===2?[100,116,139]:[180,90,30];if(z.column.index>uc)z.cell.styles.fontSize=7.6},
       didDrawCell:z=>{if(ic&&z.section==="body"&&z.column.index===uc)bayrakCiz(z,b.rows[z.row.index]?.ulke)}})}}
   }else if(rapor==="zaman"){const Z0=zaman;
    await ust(comps.length===1?comps[0]:null,L("ZAMAN ÇİZELGESİ","TIMETABLE ANALYSIS"));
    if(Z0.planYok.length||Z0.cagriYok.length){d.setFont(FT,"normal");d.setFontSize(7.2);d.setTextColor(...MUT);d.text([Z0.planYok.length?L("Çıkış listesi (plan) yok: ","No start list (plan): ")+Z0.planYok.join(", ")+L(" — yalnız gerçekleşen zamanlar."," — actual times only."):"",Z0.cagriYok.length?L("Çağrı kaydı yok: ","No call records: ")+Z0.cagriYok.join(", ")+L(" — başlangıç ilk puandan."," — start taken from first score."):""].filter(Boolean).join("   "),M,y,{maxWidth:W-2*M});y+=7}
    bolumBas(L("Gün özeti","Daily summary"));tablo(zgCols(),Z0.gunler.map(zgRow),{});
    bolumBas(L("Bloklar","Blocks")+" ("+Z0.bl.length+")");tablo(zbCols(),Z0.bl.map(zbRow),{styles:{font:FT,fontSize:7,cellPadding:{top:1.2,bottom:1.2,left:1.5,right:1.5},textColor:INK,lineColor:[238,240,244],lineWidth:{bottom:.25}},parse:z=>{const b=Z0.bl[z.row.index];if(b&&z.column.index===zbCols().length-6&&b.gecikme!=null&&b.gecikme>9e5){z.cell.styles.textColor=[185,28,28];z.cell.styles.fontStyle="bold"}}});
   }else if(rapor==="sporcu"){const S0=sporcuK||[];
    await ust(comps.length===1?comps[0]:null,L("SPORCU KARŞILAŞTIRMA","GYMNAST COMPARISON"));
    d.setFont(FT,"normal");d.setFontSize(7.2);d.setTextColor(...MUT);d.text(L("Hücre: genel tasnif puanı (sıra) · kategori · final sonuçları. * farklı kategorilerdeki puanlar (karşılaştırma dikkatle yorumlanmalı).","Cell: all-around score (rank) · category · final results. * scores from different categories (interpret with care)."),M,y,{maxWidth:W-2*M});y+=7;
    bolumBas(L("Sporcular","Gymnasts")+" ("+S0.length+")");tablo(skCols(),S0.map(skRow),{styles:{font:FT,fontSize:7,cellPadding:{top:1.2,bottom:1.2,left:1.5,right:1.5},textColor:INK,lineColor:[238,240,244],lineWidth:{bottom:.25}},columnStyles:{0:{fontStyle:"bold",cellWidth:40},2:{cellWidth:12,halign:"center"}},parse:z=>{const x=S0[z.row.index];if(x&&z.column.index===skCols().length-2&&x.fark!=null){z.cell.styles.fontStyle="bold";z.cell.styles.textColor=x.fark>0?[21,128,61]:x.fark<0?[185,28,28]:INK}}});
   }else if(rapor==="seyirci"){const S0=sey;
    await ust(comps.length===1?comps[0]:null,L("SEYİRCİ İSTATİSTİKLERİ","SPECTATOR STATISTICS"));
    d.setFont(FT,"normal");d.setFontSize(7.4);d.setTextColor(...MUT);d.text(L("Seyirci sitesi (kısa link) ziyaretleri. Oturum: sayfanın açık kaldığı süre (30 sn'de bir sinyal; 10 dk'dan uzun aradan sonra yeni oturum). Tekil ziyaretçi: cihaz/tarayıcı bazında. Saatler Türkiye saatidir.","Spectator site (short link) visits. Session: time the page stayed open (signal every 30 s; a gap over 10 min starts a new session). Unique visitor: per device/browser. Times are Turkey time (UTC+3)."),M,y-2,{maxWidth:W-2*M});y+=6;
    bolumBas(L("Özet","Summary"));tablo(syOzCols(),S0.all.map(syOzRow),{columnStyles:{0:{fontStyle:"bold",cellWidth:58}}});
    bolumBas(L("Gün bazında","By day"));tablo(syGCols(),S0.gun.map(syGRow),{});
    if(S0.saat.length){bolumBas(L("Saatlik yoğunluk","Hourly activity"));tablo(sySCols(),S0.saat.map(sySRow),{})}
    if(S0.ulke.length){bolumBas(L("Ülkeler","Countries"));tablo(syUCols(),S0.ulke.map(syURow),{tableWidth:170})}
    if(S0.n){bolumBas(L("Cihaz ve dil","Device and language"));tablo([L("TÜR","TYPE"),L("OTURUM","SESSIONS"),L("PAY","SHARE")],syCRows(),{tableWidth:120})}
   }else if(rapor==="video"){const V0=video;
    await ust(comps.length===1?comps[0]:null,L("VİDEO ARŞİVİ DURUMU","VIDEO ARCHIVE STATUS"));
    bolumBas(L("Özet","Summary"));tablo(vOzCols(),V0.all.map(vOzRow),{columnStyles:{0:{fontStyle:"bold",cellWidth:58}}});
    if(V0.all.some(x=>x.src.cloudinary)){d.setFont(FT,"normal");d.setFontSize(7.2);d.setTextColor(185,28,28);d.text(L("Cloudinary bağlantıları şu an erişilemez (hesap kapalı). Hesap açılınca Drive'a taşınabilir.","Cloudinary links are currently unavailable (account disabled). They can be moved to Drive once the account is re-enabled."),M,y-4,{maxWidth:W-2*M});y+=3}
    bolumBas(L("Kategori ve alet bazında","By category and apparatus"));tablo(vdCols(),V0.G.map(vdRow),{});
    if(V0.hata.length){bolumBas(L("Yükleme sorunları","Upload problems")+" ("+V0.hata.length+")");tablo([L("ZAMAN","TIME"),L("SPORCU","GYMNAST"),L("KATEGORİ","CATEGORY"),L("ALET","APP."),L("KAMERA","CAMERA"),L("DURUM","STATUS"),L("MESAJ","MESSAGE")],V0.hata.map(h=>[zm(h.ts),h.ad,kA(h.kat),h.al?aA(h.al):"",h.cam,h.durum==="hata"?L("hata","error"):L("yanıt yok (10 dk+)","no response (10 min+)"),h.mesaj]),{})}
    if(V0.eksik.length){bolumBas(L("Videosu olmayan rutinler","Routines without video")+" ("+V0.eksik.length+")");tablo([...(comps.length>1?[L("YARIŞMA","COMP.")]:[]),L("KATEGORİ","CATEGORY"),L("ALET","APP."),L("SPORCU","GYMNAST"),L("TEMSİL","NOC / CLUB"),L("PUAN ZAMANI","SCORED AT")],V0.eksik.map(x=>[...(comps.length>1?[String(x.C.isim).slice(0,26)]:[]),kA(x.kat),aA(x.al),x.ad,x.temsil,zm(x.ts)]),{})}
   }else if(rapor==="log"){const I0=islem;
    await ust(comps.length===1?comps[0]:null,L("İŞLEM KAYDI","AUDIT LOG"));
    bolumBas(L("Özet","Summary")+" · "+I0.rows.length+" "+L("kayıt","entries"));
    tablo([L("İŞLEM","ACTION"),L("ADET","COUNT")],I0.tur.map(([t,n])=>[LT(t),String(n)]),{tableWidth:120,columnStyles:{1:{halign:"right",cellWidth:20}}});
    tablo([L("KULLANICI","USER"),L("ADET","COUNT")],I0.kul.map(([t,n])=>[t||"—",String(n)]),{tableWidth:120,columnStyles:{1:{halign:"right",cellWidth:20}}});
    const LIM=3000;bolumBas(L("Kayıtlar","Entries")+(I0.rows.length>LIM?" · "+L("ilk ","first ")+LIM+L(" kayıt (tamamı Excel'de)"," entries (all in Excel)"):""));
    tablo(lgCols(),I0.rows.slice(0,LIM).map(lgRow),{styles:{font:FT,fontSize:6.6,cellPadding:{top:1,bottom:1,left:1.4,right:1.4},textColor:INK,lineColor:[238,240,244],lineWidth:{bottom:.25}},columnStyles:{0:{cellWidth:24}}});
   }else if(rapor==="katilim"){const K0=katilim;
    await ust(comps.length===1?comps[0]:null,L("KATILIM İSTATİSTİKLERİ","PARTICIPATION STATISTICS"));
    bolumBas(L("Özet","Summary")+(K0.cok?" · "+K0.toplam+" "+L("farklı sporcu","distinct gymnasts")+(K0.tekrar?" · "+K0.tekrar.iki+" "+L("sporcu birden çok yarışmada","gymnasts in more than one competition"):""):""));
    tablo(kOzCols(),K0.ozet.map(kOzRow),{columnStyles:{0:{fontStyle:"bold",cellWidth:62}}});
    bolumBas(L("Kategori bazında","By category"));tablo(kKatCols(),K0.kats.map(kKatRow),{columnStyles:{[comps.length>1?1:0]:{fontStyle:"bold"}}});
    const bar=(z,pay,col)=>{if(z.section!=="body"||z.column.index!==col)return;const w=(z.cell.width-4)*Math.min(1,pay/100*(100/Math.max(1,mxP)));d.setFillColor(...P1);d.roundedRect(z.cell.x+2,z.cell.y+z.cell.height/2-1.3,Math.max(.6,w),2.6,1,1,"F")};let mxP=1;
    bolumBas(bAd(K0.bolgeTip)+" "+L("bazında","distribution"));mxP=Math.max(1,...K0.bolge.map(b=>b.pay));
    tablo([bAd(K0.bolgeTip).toLocaleUpperCase(EN?"en":"tr-TR"),L("SPORCU","GYMNASTS"),L("KULÜP","CLUBS"),L("FİNALİST","FINALISTS"),L("PAY","SHARE"),""],K0.bolge.map(b=>[b.ad,String(b.sp),String(b.kul),String(b.fin),yz(b.pay),""]),{columnStyles:{0:{fontStyle:"bold",cellWidth:50},5:{cellWidth:70}},didDrawCell:z=>bar(z,K0.bolge[z.row.index]?.pay||0,5)});
    bolumBas(L("Kulüp / takım bazında","By club / team")+" ("+K0.kulup.length+")");tablo(kKulCols(),K0.kulup.map(kKulRow),{columnStyles:{0:{fontStyle:"bold",cellWidth:52},[kKulCols().length-1]:{fontSize:6.6}}});
    if(K0.yillar.length){bolumBas(L("Doğum yılı dağılımı","Birth year distribution"));mxP=Math.max(1,...K0.yillar.map(b=>b.pay));
     tablo([L("DOĞUM YILI","BIRTH YEAR"),L("SPORCU","GYMNASTS"),L("PAY","SHARE"),""],K0.yillar.map(b=>[String(b.y),String(b.n),yz(b.pay),""]),{columnStyles:{0:{fontStyle:"bold",cellWidth:30},3:{cellWidth:110}},didDrawCell:z=>bar(z,K0.yillar[z.row.index]?.pay||0,3)})}
   }else if(rapor==="itiraz"){const G0=degis;
    await ust(comps.length===1?comps[0]:null,L("NOT DEĞİŞİKLİKLERİ VE İTİRAZLAR","SCORE CHANGES AND INQUIRIES"));
    bolumBas(L("Özet","Summary"));tablo(ozCols(),G0.ozet.map(ozRow),{columnStyles:{0:{fontStyle:"bold",cellWidth:62}}});
    tablo(turCols(),G0.ozet.map(turRow),{columnStyles:{0:{fontStyle:"bold",cellWidth:62}},headStyles:{fontStyle:"bold",fontSize:6.2,textColor:[255,255,255],fillColor:P2}});
    bolumBas(L("İtirazlar","Inquiries")+" ("+G0.it.length+")");
    if(G0.it.length){tablo(itCols(),G0.it.map(itRow),{styles:{font:FT,fontSize:7.2,cellPadding:{top:1.3,bottom:1.3,left:1.6,right:1.6},textColor:INK,lineColor:[238,240,244],lineWidth:{bottom:.25}},parse:z=>{const i=G0.it[z.row.index];if(i&&z.column.index===itCols().length-2){z.cell.styles.fontStyle="bold";z.cell.styles.textColor=i.durum==="kabul"?[21,128,61]:i.durum==="red"?[185,28,28]:[100,116,139]}}});
     bolumBas(L("İtiraz ücretleri — temsilci bazında","Inquiry fees — by NOC / club"));
     tablo([...(comps.length>1?[L("YARIŞMA","COMP.")]:[]),L("TEMSİL","NOC / CLUB"),L("İTİRAZ","INQUIRIES"),L("KABUL","ACCEPTED"),L("RED","REJECTED"),L("BEKLEYEN","PENDING"),L("TAHSİL","KEPT"),L("İADE","REFUNDED")],G0.kul.map(k=>[...(comps.length>1?[String(k.C.isim).slice(0,30)]:[]),k.ad,String(k.n),String(k.kabul),String(k.red),String(k.bek),k.tahsil+" "+k.pb,k.iade+" "+k.pb]),{})}
    else{d.setFont(FT,"normal");d.setFontSize(8.5);d.setTextColor(...MUT);d.text(L("İtiraz kaydı yok.","No inquiries."),M,y);y+=8}
    if(G0.tekrar.length){bolumBas(L("Birden çok kaydedilen puanlar","Scores saved more than once")+" ("+G0.tekrar.length+")");tablo(tkCols(),G0.tekrar.map(tkRow),{parse:z=>{const t=G0.tekrar[z.row.index];if(t&&z.column.index===tkCols().length-2&&t.ilk!=null&&t.son!=null&&Math.abs(t.son-t.ilk)>1e-6){z.cell.styles.textColor=[185,28,28];z.cell.styles.fontStyle="bold"}}})}
    bolumBas(L("Not değişiklikleri","Score changes")+" ("+G0.ev.length+")");
    if(G0.ev.length)tablo(evCols(),G0.ev.map(evRow),{styles:{font:FT,fontSize:6.8,cellPadding:{top:1.1,bottom:1.1,left:1.5,right:1.5},textColor:INK,lineColor:[238,240,244],lineWidth:{bottom:.25}},parse:z=>{const x=G0.ev[z.row.index];if(x&&z.column.index===(comps.length>1?2:1)){const c=DG_TUR[x.tur]?.[1];if(c){z.cell.styles.textColor=c.match(/\w\w/g).map(h=>parseInt(h,16));z.cell.styles.fontStyle="bold"}}}});
    else{d.setFont(FT,"normal");d.setFontSize(8.5);d.setTextColor(...MUT);d.text(L("Seçili türlerde değişiklik yok.","No changes of the selected types."),M,y);y+=8}
   }else if(rapor==="hakem"){const H0=hakem;
    await ust(comps.length===1?comps[0]:null,L("HAKEM SAPMA ANALİZİ","JUDGE DEVIATION ANALYSIS"));
    d.setFont(FT,"normal");d.setFontSize(7.5);d.setTextColor(...MUT);
    d.text(L("Referans: ","Reference: ")+(opt.hRef==="sj"?L("Üst Jüri kontrol notu (yoksa panel sonucu)","Superior jury control score (panel result if missing)"):L("panel sonucu (A/E: en yüksek ve en düşük atılmış ortalama; D: ortak not)","panel result (A/E: trimmed mean; D: common score)"))+"  ·  "+(BR==="ritmik"?L("Tolerans: A/E ≤1.20 → 0.40, üstü 0.70; D 0.50  ·  WG RG Judges' Rules değerlendirme tabloları","Tolerance: A/E ≤1.20 → 0.40, above 0.70; D 0.50  ·  WG RG Judges' Rules evaluation tables"):L("Aerobik WG CoP §8.1: A puan, E = 10 − kesinti; tolerans son puana göre 8+ 0.3 · 7+ 0.4 · 6+ 0.5 · altı 0.6; uç fark ≥ 1.0 (§8.1.6). Yüzde / derece verilmez.","Aerobic WG CoP §8.1: A score, E = 10 − deduction; tolerance by final score 8+ 0.3 · 7+ 0.4 · 6+ 0.5 · below 0.6; spread ≥ 1.0 (§8.1.6). No percentage / grade."))+(comps.length>1?"  ·  "+comps.map(c=>c.isim).join(" · "):""),M,y,{maxWidth:W-2*M});y+=8;
    bolumBas(L("Panel özeti","Panel summary"));tablo(panCols(),H0.pan.map(panRow),{columnStyles:{0:{fontStyle:"bold",cellWidth:58}}});
    bolumBas(L("Hakem bazında","By judge")+(H0.isimsiz?" · "+H0.isimsiz+" "+L("pozisyonda hakem adı atanmamış","positions without judge names"):""));
    const hc=hkCols();tablo(hc,H0.hk.map(hkRow),{columnStyles:{0:{fontStyle:"bold",cellWidth:46}},parse:z=>{const h=H0.hk[z.row.index];if(!h)return;if(z.column.index===hc.length-2){const g=GRENK[h.grade];if(g){z.cell.styles.textColor=g[0].match(/\w\w/g).map(x=>parseInt(x,16));z.cell.styles.fontStyle="bold"}}if(z.column.index===hc.length-5&&h.dis/h.n>.25)z.cell.styles.textColor=[185,28,28];if(z.column.index===hc.length-1&&h.leh&&h.leh.fark>.1)z.cell.styles.textColor=[185,28,28]}});
    d.setFont(FT,"normal");d.setFontSize(6.8);d.setTextColor(...MUT);d.text(L("Ort. sapma: işaretli ortalama (A/E kesinti: + sert, − yumuşak; D: + yüksek). Kendi sporcusu lehine: hakemin ülke/kulüp/ilindeki sporculara verdiği notun diğerlerine göre lehte farkı (parantez: not sayısı).","Mean dev.: signed (A/E deductions: + strict, − lenient; D: + high). Own athletes: favourable difference for athletes of the judge's NOC/club/province vs others (count in brackets)."),M,y-4,{maxWidth:W-2*M});y+=2;
    if(H0.dOz.length){bolumBas(L("D paneli hakem farkları","D panel judge differences")+" (DA1–DA2 · DB1–DB2)");
     tablo([L("PANEL","PANEL"),L("KARŞILAŞTIRMA","PAIRS"),L("ORT. FARK","MEAN DIFF."),L("EŞİĞİ AŞAN","OVER THRESHOLD"),L("EN BÜYÜK","MAX")],H0.dOz.map(o=>[PAD(o.P),String(o.n),f2(o.ort),o.n?o.asti+" ("+Math.round(o.asti/o.n*100)+"%)":"0",f2(o.mx)]),{columnStyles:{0:{fontStyle:"bold",cellWidth:58}}});
     const dl=H0.dfark.filter(x=>x.asti).slice(0,30);if(dl.length)tablo(dCols(),dl.map(dRow),{})}
    if(H0.buyuk.length){bolumBas(L("En büyük sapmalar","Largest deviations"));tablo(bCols(),H0.buyuk.slice(0,30).map(bRow),{parse:z=>{const r=H0.buyuk[z.row.index];if(r&&r.dis&&z.column.index===bCols().length-2)z.cell.styles.textColor=[185,28,28]}})}
    if(!H0.rows.length){d.setFont(FT,"normal");d.setFontSize(9);d.setTextColor(...MUT);d.text(L("Seçili yarışmalarda hakem notu bulunamadı.","No judge scores found in the selected competitions."),M,y)}
   }else{
    await ust(comps.length===1?comps[0]:null,L("MADALYA TABLOSU","MEDAL TABLE"));
    const gAd=grup==="ulke"?L("ÜLKE","NOC"):grup==="il"?L("İL","PROVINCE"):L("KULÜP","CLUB");
    const head=[L("SIRA","RANK"),gAd,L("ALTIN","GOLD"),L("GÜMÜŞ","SILVER"),L("BRONZ","BRONZE"),L("TOPLAM","TOTAL"),...(comps.length>1?[L("YARIŞMA","COMP.")]:[])];
    const body=madalya.map(r=>[String(r.rank),grup==="ulke"?(r.ad+"  "+(ulkeAd(r.ad,EN?"en":"tr")||"")):UP(r.ad),String(r.altin),String(r.gumus),String(r.bronz),String(r.toplam),...(comps.length>1?[String(r.yar)]:[])]);
    tablo(head,body,{columnStyles:{0:{cellWidth:14,halign:"center",fontStyle:"bold"},1:grup==="ulke"?{cellPadding:{top:1.5,bottom:1.5,left:8,right:1}}:{},2:{halign:"center",cellWidth:20},3:{halign:"center",cellWidth:20},4:{halign:"center",cellWidth:20},5:{halign:"center",cellWidth:20,fontStyle:"bold"},6:{halign:"center",cellWidth:20}},
     parse:z=>{if(z.column.index===2)z.cell.styles.textColor=[180,130,0];if(z.column.index===3)z.cell.styles.textColor=[100,116,139];if(z.column.index===4)z.cell.styles.textColor=[180,90,30]},
     didDrawCell:z=>{if(grup==="ulke"&&z.section==="body"&&z.column.index===1)bayrakCiz(z,madalya[z.row.index]?.ulke||madalya[z.row.index]?.ad)}});
    d.setFont(FT,"normal");d.setFontSize(7.5);d.setTextColor(...MUT);
    d.text(L("Kapsam: ","Scope: ")+[opt.mGenel?L("genel tasnif","all-around"):"",opt.mAlet?L("alet","apparatus")+(opt.mAletElem?L(" (finali olmayan alette eleme sıralaması)"," (qualification where no final)"):""):"",opt.mTakim?L("takım","team"):""].filter(Boolean).join(", ")+"  ·  "+(opt.mSira==="toplam"?L("toplam madalyaya göre","by total medals"):L("altın önceliğine göre (olimpik)","gold first (olympic)")),M,y,{maxWidth:W-2*M});y+=6;
    if(comps.length>1){d.text(L("Yarışmalar: ","Competitions: ")+comps.map(c=>c.isim+(tarihStr(c)?" ("+tarihStr(c)+")":"")).join(" · "),M,y,{maxWidth:W-2*M});y+=8}
    // madalya kazananlar
    const OL=madalya.olay||[];if(OL.length){y+=4;bolumBas(L("Madalya kazananlar","Medallists"));
     const kim=(r,C)=>{const ic=isIntl(C);return (r.takim?r.ad:satirAd(r))+(ic?(r.takim&&r.ad===r.ulke?"":"  ("+(r.ulke||"")+")"):(r.kulup||r.il?"  ("+(r.kulup||r.il)+")":""))};
     const body=OL.map(o=>[(comps.length>1?o.C.isim+" · ":"")+bolBaslik(o.b),...[1,2,3].map(n=>o.m.filter(r=>r.rank===n).map(r=>kim(r,o.C)).join("\n"))]);
     tablo([L("YARIŞMA / ETKİNLİK","EVENT"),L("ALTIN","GOLD"),L("GÜMÜŞ","SILVER"),L("BRONZ","BRONZE")],body,{columnStyles:{0:{cellWidth:62,fontStyle:"bold",fontSize:7.4},1:{fontSize:7.4},2:{fontSize:7.4},3:{fontSize:7.4}}})}}
   alt();
   const ad=(comps.length===1?comps[0].isim:L("Raporlar","Reports")).replace(/[^\wçğıöşüÇĞİÖŞÜ -]+/g,"").trim().replace(/\s+/g,"_").slice(0,60);
   d.save(ad+"_"+(({sonuc:L("Resmi_Sonuclar","Official_Results"),hakem:L("Hakem_Sapma_Analizi","Judge_Deviation"),itiraz:L("Not_Degisiklikleri_ve_Itirazlar","Score_Changes_and_Inquiries"),katilim:L("Katilim_Istatistikleri","Participation_Statistics"),zaman:L("Zaman_Cizelgesi","Timetable"),sporcu:L("Sporcu_Karsilastirma","Gymnast_Comparison"),video:L("Video_Arsivi_Durumu","Video_Archive_Status"),log:L("Islem_Kaydi","Audit_Log")})[rapor]||L("Madalya_Tablosu","Medal_Table"))+".pdf");toast(__T("PDF indirildi ✓"),"success");
   try{logAction("report_export",`[${BRAD}] Rapor PDF: ${rapor} · ${comps.map(c=>c.isim).join(", ")}`.slice(0,480),{user:kim,competitionId:comps[0]?._id,discipline:BR})}catch{}}
  catch(er){console.error(er);toast(__T("PDF oluşturulamadı: ")+(er?.message||er),"error")}setBusy("")};

 // ---- Excel ----
 const excelAl=async()=>{if(busy||!comps.length)return;setBusy("xlsx");
  try{const X=await import("./vendor-xlsx-CNerDvZXCb2.js"),wb=X.utils.book_new(),adlar=new Set();
   const sayfaAd=t=>{let a=String(t).replace(/[\\/?*[\]:]/g,"-").slice(0,31),i=2;while(adlar.has(a)){a=String(t).replace(/[\\/?*[\]:]/g,"-").slice(0,27)+" ("+i+++")"}adlar.add(a);return a};
   if(rapor==="sonuc"){sonuc.forEach(({C,bol})=>{const ic=isIntl(C),tek=sonuc.length===1;
     bol.forEach(b=>{const cols=sutunlar(b),HB=b.rows.some(r=>r.bib);
      const aoa=[[C.isim],[bolBaslik(b)],[],[L("Sıra","Rank"),...(HB?["BIB"]:[]),b.tip==="takim"?L("Takım","Team"):L("Sporcu","Gymnast"),...(b.tip==="takim"?[L("Sporcular","Members")]:[]),ic?L("Ülke","NOC"):L("Kulüp / İl","Club / Prov."),...(ic?[L("Kulüp / Takım","Club / Team")]:[]),...cols.map(c=>c.b)]];
      b.rows.forEach(r=>aoa.push([r.rank??"",...(HB?[r.bib||""]:[]),b.tip==="takim"?r.ad:satirAd(r),...(b.tip==="takim"?[(r.uyeler||[]).join(", ")]:[]),ic?(r.ulke||""):(r.takim?(r.il&&UP(r.il)!==UP(r.ad)?r.il:""):r.kulup||r.il||""),...(ic?[r.kulup||""]:[]),...cols.map(c=>{const v=c.f(r);return/^−?\d+\.\d{3}$/.test(v)?Number(v.replace("−","-")):v})]));
      const ws=X.utils.aoa_to_sheet(aoa),bas=aoa[3].length-cols.length;Object.keys(ws).forEach(a=>{if(a[0]==="!")return;const c=X.utils.decode_cell(a);if(c.r>3&&c.c>=bas&&ws[a].t==="n")ws[a].z="0.000"});ws["!cols"]=aoa[3].map((h,i)=>({wch:i===0?6:String(h).length>8?Math.max(12,String(h).length+2):i<=2+(HB?1:0)?28:10}));
      X.utils.book_append_sheet(wb,ws,sayfaAd((tek?"":String(C.isim).slice(0,8)+" ")+bolBaslik(b).replace(" — "," ")))})})}
   else if(["zaman","sporcu","video","log","seyirci"].includes(rapor)){const ek=(ad,aoa,w)=>{const ws=X.utils.aoa_to_sheet(aoa);ws["!cols"]=(w||aoa[0].map(()=>14)).map(x=>({wch:x}));X.utils.book_append_sheet(wb,ws,sayfaAd(ad))};
    if(rapor==="zaman"){ek(L("Gün özeti","Daily summary"),[zgCols(),...zaman.gunler.map(zgRow)]);ek(L("Bloklar","Blocks"),[zbCols(),...zaman.bl.map(zbRow)],zbCols().map((h,i)=>i===(comps.length>1?3:2)?28:12))}
    else if(rapor==="sporcu"){ek(L("Sporcular","Gymnasts"),[skCols(),...(sporcuK||[]).map(x=>skRow(x).map(v=>String(v).replace(/\n/g," · ")))],[30,18,8,...comps.map(()=>36),14,10]);
     const det=[[L("Sporcu","Gymnast"),L("Temsil","NOC / Club"),L("Yarışma","Comp."),L("Tarih","Date"),L("Kategori","Category"),L("Genel puan","AA score"),L("Sıra","Rank"),L("Katılımcı","Field"),L("Alet","App."),L("Alet puanı","App. score"),L("Final","Final"),L("Final puanı","Final score"),L("Final sırası","Final rank")]];
     (sporcuK||[]).forEach(x=>x.yar.forEach(y=>{const al=Object.keys(y.apps||{});if(!al.length&&!y.fin.length)det.push([x.ad,x.temsil,y.C.isim,tarihStr(y.C),kA(y.kat),y.aa!=null?Number(f3(y.aa)):"",y.rank||"",y.n||"","","","","",""]);
      al.forEach(a=>det.push([x.ad,x.temsil,y.C.isim,tarihStr(y.C),kA(y.kat),y.aa!=null?Number(f3(y.aa)):"",y.rank||"",y.n||"",aA(a),typeof y.apps[a]==="number"?Number(f3(y.apps[a])):(y.apps[a]||""),"","",""]));
      y.fin.forEach(f0=>det.push([x.ad,x.temsil,y.C.isim,tarihStr(y.C),kA(y.kat),"","","","","",f0.alet==="AA"?L("Genel","AA"):aA(f0.alet),f0.total!=null?Number(f3(f0.total)):"",f0.rank||""]))}));
     ek(L("Ayrıntı","Details"),det,[30,18,30,22,24,10,6,9,10,10,10,10,9])}
    else if(rapor==="seyirci"){ek(L("Özet","Summary"),[syOzCols(),...sey.all.map(syOzRow)],[34,12,12,12,22,12,12,14,8,8]);ek(L("Günler","Days"),[syGCols(),...sey.gun.map(syGRow)]);
     ek(L("Saatler","Hours"),[sySCols(),...sey.saat.map(x=>sySRow(x).map((v,i,a)=>i>=a.length-3?Number(v):v))]);ek(L("Ülkeler","Countries"),[syUCols(),...sey.ulke.map(u=>syURow(u).map((v,i)=>i===2||i===3?Number(v):v))],[24,8,10,10,8]);
     ek(L("Cihaz-dil","Device-language"),[[L("Tür","Type"),L("Oturum","Sessions"),L("Pay","Share")],...syCRows()],[24,10,8]);
     ek(L("Oturumlar","Sessions"),[[...(comps.length>1?[L("Yarışma","Comp.")]:[]),L("Başlangıç","Start"),L("Son sinyal","Last signal"),L("Süre (sn)","Length (s)"),L("Cihaz","Device"),L("Ülke","Country"),L("Dil","Language"),L("Ziyaretçi","Visitor"),L("Link","Link")],...sey.ham.map(o=>[...(comps.length>1?[o.C.isim]:[]),trG(o.b)+" "+syZ(o.b)+new Date(o.b+TRo).toISOString().slice(16,19),trG(o.s)+" "+syZ(o.s)+new Date(o.s+TRo).toISOString().slice(16,19),Math.round((o.s-o.b)/1e3),L(...(syCih[o.m]||[o.m,o.m])),o.c||"",o.d||"",o.u.slice(0,8),o.k])],[...(comps.length>1?[28]:[]),20,20,10,12,8,6,10,12])}
    else if(rapor==="video"){ek(L("Özet","Summary"),[vOzCols(),...video.all.map(vOzRow)]);ek(L("Kategori-alet","Category-apparatus"),[vdCols(),...video.G.map(vdRow)]);
     ek(L("Eksik videolar","Missing videos"),[[L("Yarışma","Comp."),L("Kategori","Category"),L("Alet","App."),L("Sporcu","Gymnast"),L("Temsil","NOC / Club"),L("Puan zamanı","Scored at")],...video.eksik.map(x=>[x.C.isim,kA(x.kat),aA(x.al),x.ad,x.temsil,zm(x.ts)])],[28,24,10,28,16,14]);
     ek(L("Yükleme sorunları","Upload problems"),[[L("Zaman","Time"),L("Sporcu","Gymnast"),L("Kategori","Category"),L("Alet","App."),L("Kamera","Camera"),L("Durum","Status"),L("Mesaj","Message")],...video.hata.map(h=>[zm(h.ts),h.ad,kA(h.kat),h.al?aA(h.al):"",h.cam,h.durum,h.mesaj])])}
    else{ek(L("Özet","Summary"),[[L("İşlem","Action"),L("Adet","Count")],...islem.tur.map(([t,n])=>[LT(t),n]),[],[L("Kullanıcı","User"),L("Adet","Count")],...islem.kul.map(([t,n])=>[t||"—",n])],[36,10]);
     ek(L("Kayıtlar","Entries"),[[L("Zaman","Time"),L("Yarışma","Comp."),L("İşlem","Action"),L("Tür kodu","Type code"),L("Kullanıcı","User"),L("Kategori","Category"),L("Sporcu","Gymnast"),L("Alet","App."),L("Ayrıntı","Details")],...islem.rows.map(x=>[new Date(x.ts).toLocaleString(EN?"en-GB":"tr-TR"),x.C.isim,LT(x.t),x.t,x.kim,kA(x.kat),x.sp,x.al?aA(x.al):"",x.msj])],[20,26,28,18,12,20,24,10,80])}}
   else if(rapor==="katilim"){const K0=katilim,ek=(ad,aoa,w)=>{const ws=X.utils.aoa_to_sheet(aoa);ws["!cols"]=w.map(x=>({wch:x}));X.utils.book_append_sheet(wb,ws,sayfaAd(ad))},nm=v=>/^\d+(\.\d+)?$/.test(String(v))?Number(v):v;
    ek(L("Özet","Summary"),[[L("Katılım İstatistikleri","Participation Statistics")],[],kOzCols(),...K0.ozet.map(o=>kOzRow(o).map(nm)),...(K0.cok?[[],[L("Farklı sporcu","Distinct gymnasts"),K0.toplam],[L("Birden çok yarışmada","In more than one competition"),K0.tekrar?K0.tekrar.iki:0]]:[])],[40,10,10,8,8,10,10,10,12,10,9]);
    ek(L("Kategoriler","Categories"),[kKatCols(),...K0.kats.map(k=>kKatRow(k).map(nm))],[30,10,8,8,10,10,10,10,10,16].concat(comps.length>1?[26]:[]));
    ek(bAd(K0.bolgeTip),[[bAd(K0.bolgeTip),L("Sporcu","Gymnasts"),L("Kulüp","Clubs"),L("Finalist","Finalists"),L("Pay %","Share %")],...K0.bolge.map(b=>[b.ad,b.sp,b.kul,b.fin,Number(b.pay.toFixed(1))])],[24,10,10,10,10]);
    ek(L("Kulüpler","Clubs"),[kKulCols(),...K0.kulup.map(o=>kKulRow(o).map(nm))],[34,18,10,10,...(comps.length>1?comps.map(()=>14):[]),60]);
    ek(L("Doğum yılı","Birth year"),[[L("Doğum yılı","Birth year"),L("Sporcu","Gymnasts"),L("Pay %","Share %")],...K0.yillar.map(b=>[b.y,b.n,Number(b.pay.toFixed(1))])],[12,10,10])}
   else if(rapor==="itiraz"){const G0=degis,ek=(ad,aoa,w)=>{const ws=X.utils.aoa_to_sheet(aoa);ws["!cols"]=w.map(x=>({wch:x}));X.utils.book_append_sheet(wb,ws,sayfaAd(ad))};
    ek(L("Özet","Summary"),[[L("Not Değişiklikleri ve İtirazlar","Score Changes and Inquiries")],[],ozCols(),...G0.ozet.map(ozRow),[],turCols(),...G0.ozet.map(turRow)],[36,10,10,10,12,10,12,14,14,12,14]);
    ek(L("İtirazlar","Inquiries"),[[L("Talep","Request"),L("Yarışma","Comp."),L("Kategori","Category"),L("Sporcu","Gymnast"),L("Temsil","NOC / Club"),L("Alet","App."),L("Tür","Type"),L("Geçen sn","Elapsed s"),L("Süre içinde","In time"),L("Eski değer","Old value"),L("Yeni değer","New value"),L("Eski sonuç","Old result"),L("Yeni sonuç","New result"),L("Ücret","Fee"),L("Para birimi","Currency"),L("Kademe","Tier"),L("Durum","Status"),L("Karar veren","Decided by"),L("Karar","Decided at"),L("Not","Note"),L("Karar notu","Decision note")],
     ...G0.it.map(i=>[zm(i.talepZamani),i.C.isim,kA(i.katAd),i.sporcuAd||"",i.temsil||"",i.alet?aA(i.alet):"",IT_TUR[i.tur]||i.tur||"",i.gecenSn??"",i.sureIcinde===!1?L("hayır","no"):L("evet","yes"),i.eskiDeger??"",i.yeniDeger??"",i.eskiSonuc??"",i.yeniSonuc??"",+i.ucret||0,i.paraBirimi||"",i.ucretKademe||"",L(IT_DUR[i.durum]||i.durum||"",i.durum||""),i.kararVeren||"",zm(i.kararZamani),i.not||"",i.kararNot||""])],[13,26,22,24,14,10,8,8,8,9,9,9,9,7,7,6,12,14,13,20,20]);
    ek(L("İtiraz ücretleri","Inquiry fees"),[[L("Yarışma","Comp."),L("Temsil","NOC / Club"),L("İtiraz","Inquiries"),L("Kabul","Accepted"),L("Red","Rejected"),L("Bekleyen","Pending"),L("Tahsil","Kept"),L("İade","Refunded"),L("Para birimi","Currency")],...G0.kul.map(k=>[k.C.isim,k.ad,k.n,k.kabul,k.red,k.bek,k.tahsil,k.iade,k.pb])],[30,20,9,9,9,9,9,9,8]);
    ek(L("Yeniden kaydedilen","Re-saved scores"),[[L("Yarışma","Comp."),...tkCols().slice(comps.length>1?1:0)],...G0.tekrar.map(t=>[t.C.isim,...tkRow(t).slice(comps.length>1?1:0)].map(v=>/^[−+±]?\d+\.\d{3}$/.test(v)?Number(String(v).replace("−","-").replace("±","")):v))],[28,24,24,14,10,7,9,10,10,9,24]);
    ek(L("Not değişiklikleri","Score changes"),[[L("Zaman","Time"),L("Yarışma","Comp."),L("İşlem","Action"),L("Kategori","Category"),L("Sporcu","Gymnast"),L("Alet","App."),L("Alan","Field"),L("Hakem","Judge"),L("Eski","Old"),L("Yeni","New"),L("Yapan","By"),L("Not","Note")],...G0.ev.map(x=>[zm(x.ts),x.C.isim,TA(x.tur),kA(x.katAd),x.sp||"",x.al?aA(x.al):"",x.poz||"",x.hakem?x.hakem.ad:"",x.eski==null?"":isNaN(x.eski)?x.eski:Number(x.eski),x.yeni==null?"":isNaN(x.yeni)?x.yeni:Number(x.yeni),x.kim||"",x.not||""])],[13,26,30,22,24,10,7,22,7,7,12,24])}
   else if(rapor==="hakem"){const H0=hakem,ek=(ad,aoa,w)=>{const ws=X.utils.aoa_to_sheet(aoa);ws["!cols"]=w.map(x=>({wch:x}));X.utils.book_append_sheet(wb,ws,sayfaAd(ad))},nm=v=>{const t=String(v).replace("−","-").replace("±","").replace("+","");return/^-?\d+(\.\d+)?$/.test(t)?Number(t):v};
    ek(L("Panel özeti","Panel summary"),[[L("Hakem Sapma Analizi","Judge Deviation Analysis")],[comps.map(c=>c.isim).join(" · ")],[],panCols(),...H0.pan.map(p=>panRow(p).map(nm))],[28,10,12,12,14,8,18,12,12]);
    ek(L("Hakemler","Judges"),[hkCols(),...H0.hk.map(h=>hkRow(h).map(nm))],[36,12,12,16,8,10,10,10,14,8,12,18].concat(comps.length>1?[8]:[]));
    ek(L("D farkları","D differences"),[dCols(),...H0.dfark.map(x=>dRow(x).map(nm))],[30,30,12,12,16,8,8].concat(comps.length>1?[26]:[]));
    ek(L("En büyük sapmalar","Largest deviations"),[bCols(),...H0.buyuk.map(r=>bRow(r).map(nm))],[30,6,30,30,12,8,16,8,6].concat(comps.length>1?[26]:[]));
    ek(L("Tüm hakem notları","All judge scores"),[[L("Yarışma","Comp."),L("Kategori","Category"),L("Sporcu","Gymnast"),L("Alet","App."),L("Panel","Panel"),L("Poz.","Pos."),L("Hakem","Judge"),L("Not","Score"),L("Referans","Reference"),L("Ref. kaynağı","Ref. source"),L("Sapma","Dev."),L("Tolerans","Tol."),L("Tol. dışı","Out"),"WG %",L("Atılan not","Dropped")],
     ...H0.rows.map(r=>[r.C.isim,kA(r.katAd),spAd(r),aA(r.al),r.panel,r.poz,r.kim?r.kim.ad:"",Number(f2(r.val)),Number(f2(r.ref)),r.refKaynak,Number(r.dev.toFixed(2)),r.tol,r.dis?L("evet","yes"):"",r.pct,r.atildi?L("evet","yes"):""])],[26,24,28,10,6,6,24,7,9,9,7,7,7,6,8])}
   else{const gAd=grup==="ulke"?L("Ülke","NOC"):grup==="il"?L("İl","Province"):L("Kulüp","Club");
    const aoa=[[L("Madalya Tablosu","Medal Table")],[comps.map(c=>c.isim).join(" · ")],[],[L("Sıra","Rank"),gAd,...(grup==="ulke"?[L("Ülke adı","Country")]:[]),L("Altın","Gold"),L("Gümüş","Silver"),L("Bronz","Bronze"),L("Toplam","Total"),...(comps.length>1?[L("Yarışma sayısı","Competitions")]:[])]];
    madalya.forEach(r=>aoa.push([r.rank,r.ad,...(grup==="ulke"?[ulkeAd(r.ad,EN?"en":"tr")||""]:[]),r.altin,r.gumus,r.bronz,r.toplam,...(comps.length>1?[r.yar]:[])]));
    const ws=X.utils.aoa_to_sheet(aoa);ws["!cols"]=[{wch:6},{wch:32},{wch:18},{wch:8},{wch:8},{wch:8},{wch:8},{wch:10}];X.utils.book_append_sheet(wb,ws,sayfaAd(L("Madalya Tablosu","Medal Table")));
    const ma=[[L("Madalya kazananlar","Medallists")],[],[L("Yarışma","Competition"),L("Etkinlik","Event"),L("Madalya","Medal"),L("Sıra","Rank"),L("Sporcu / Takım","Gymnast / Team"),L("Ülke","NOC"),L("Kulüp / İl","Club / Prov."),L("Puan","Score")]];
    (madalya.olay||[]).forEach(o=>o.m.forEach(r=>ma.push([o.C.isim,bolBaslik(o.b),r.rank===1?L("Altın","Gold"):r.rank===2?L("Gümüş","Silver"):L("Bronz","Bronze"),r.rank,r.takim?r.ad:satirAd(r),r.ulke||"",r.kulup||r.il||"",r.total!=null?Number(f3(r.total)):""])));
    const w2=X.utils.aoa_to_sheet(ma);w2["!cols"]=[{wch:30},{wch:40},{wch:9},{wch:6},{wch:30},{wch:8},{wch:22},{wch:9}];X.utils.book_append_sheet(wb,w2,sayfaAd(L("Madalya kazananlar","Medallists")))}
   if(!wb.SheetNames.length){toast(__T("Seçili kapsamda puanı olan sonuç yok."),"warning");setBusy("");return}
   const buf=X.write(wb,{type:"array",bookType:"xlsx"}),u=URL.createObjectURL(new Blob([buf],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"})),a=document.createElement("a");
   a.href=u;a.download=(comps.length===1?comps[0].isim:"Raporlar").replace(/[^\wçğıöşüÇĞİÖŞÜ -]+/g,"").trim().replace(/\s+/g,"_").slice(0,60)+"_"+(({sonuc:L("Resmi_Sonuclar","Official_Results"),hakem:L("Hakem_Sapma_Analizi","Judge_Deviation"),itiraz:L("Not_Degisiklikleri_ve_Itirazlar","Score_Changes_and_Inquiries"),katilim:L("Katilim_Istatistikleri","Participation_Statistics"),zaman:L("Zaman_Cizelgesi","Timetable"),sporcu:L("Sporcu_Karsilastirma","Gymnast_Comparison"),video:L("Video_Arsivi_Durumu","Video_Archive_Status"),log:L("Islem_Kaydi","Audit_Log")})[rapor]||L("Madalya_Tablosu","Medal_Table"))+".xlsx";document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),4e3);
   toast(__T("Excel indirildi ✓"),"success");try{logAction("report_export",`[${BRAD}] Rapor Excel: ${rapor} · ${comps.map(c=>c.isim).join(", ")}`.slice(0,480),{user:kim,competitionId:comps[0]?._id,discipline:BR})}catch{}}
  catch(er){console.error(er);toast(__T("Excel oluşturulamadı: ")+(er?.message||er),"error")}setBusy("")};

 // ---- görünüm ----
 const P1="#EC4899",P2="#8B5CF6",G="linear-gradient(135deg,"+P1+","+P2+")",SH="0 1px 2px rgba(15,23,42,.05),0 8px 24px -16px rgba(15,23,42,.22)";
 const S={wrap:{minHeight:"100vh",background:"#F6F7FB",color:"#0F172A",fontFamily:"Nunito,system-ui,-apple-system,sans-serif",paddingBottom:"7rem"},
  top:{position:"sticky",top:0,zIndex:10,background:"linear-gradient(90deg,"+P1+","+P2+") bottom/100% 3px no-repeat,#fff",boxShadow:"0 1px 2px rgba(15,23,42,.05)",padding:"0 1.25rem",minHeight:68,display:"flex",alignItems:"center",gap:".9rem"},
  back:{width:38,height:38,borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",color:"#0F172A",textDecoration:"none",flexShrink:0,border:"1px solid #E2E8F0",background:"#fff",cursor:"pointer"},
  ico:{width:44,height:44,borderRadius:14,display:"grid",placeItems:"center",flexShrink:0,background:G,boxShadow:"0 8px 20px -6px rgba(236,72,153,.55)"},
  in:{maxWidth:1280,margin:"0 auto",padding:"1.1rem 1.25rem",display:"grid",gridTemplateColumns:"minmax(0,340px) minmax(0,1fr)",gap:"1rem",alignItems:"start"},
  card:{background:"#fff",borderRadius:18,padding:"1rem 1.1rem",marginBottom:".9rem",boxShadow:SH},
  h:{display:"flex",alignItems:"center",gap:".55rem",fontWeight:900,fontSize:".95rem",marginBottom:".7rem"},
  hi:{width:30,height:30,borderRadius:10,display:"grid",placeItems:"center",color:"#fff",background:G,flexShrink:0},
  inp:{width:"100%",padding:".6rem .75rem",borderRadius:11,border:"1px solid #E2E8F0",fontFamily:"inherit",fontWeight:700,fontSize:".88rem",boxSizing:"border-box"},
  ghost:{padding:".5rem .8rem",border:"1px solid #E2E8F0",borderRadius:11,fontWeight:800,fontSize:".8rem",cursor:"pointer",color:"#334155",background:"#fff",fontFamily:"inherit",display:"inline-flex",alignItems:"center",gap:".3rem"},
  btn:{padding:".75rem 1.1rem",border:"none",borderRadius:13,fontWeight:900,fontSize:".92rem",cursor:"pointer",color:"#fff",fontFamily:"inherit",display:"inline-flex",alignItems:"center",gap:".4rem"},
  chip:on=>({border:"1px solid "+(on?"#F9A8D4":"#E2E8F0"),background:on?"#FDF2F8":"#fff",color:on?"#9D174D":"#475569",borderRadius:999,padding:".35rem .7rem",fontWeight:800,fontSize:".78rem",cursor:"pointer",fontFamily:"inherit",display:"inline-flex",alignItems:"center",gap:".3rem"}),
  seg:{display:"inline-flex",background:"#F1F5F9",borderRadius:10,padding:2,gap:2,flexWrap:"wrap"},
  segb:on=>({border:0,borderRadius:8,padding:".32rem .6rem",fontFamily:"inherit",fontWeight:900,fontSize:".76rem",cursor:"pointer",background:on?"#fff":"transparent",color:on?"#BE185D":"#64748B",boxShadow:on?"0 1px 3px rgba(15,23,42,.12)":"none"}),
  lbl:{fontSize:".7rem",fontWeight:900,letterSpacing:".08em",color:"#64748B",textTransform:"uppercase",margin:".7rem 0 .4rem"},
  th:{fontSize:".66rem",fontWeight:900,letterSpacing:".06em",color:"#fff",background:P2,padding:".45rem .5rem",textAlign:"right",whiteSpace:"nowrap"},
  td:{fontSize:".82rem",padding:".38rem .5rem",borderBottom:"1px solid #F1F5F9",textAlign:"right",whiteSpace:"nowrap"}};
 const Tog=({on,t,d,onClick})=>e.jsxs("label",{style:{display:"flex",alignItems:"flex-start",gap:".55rem",padding:".5rem .6rem",borderRadius:11,border:"1px solid "+(on?"#F9A8D4":"#EEF0F4"),background:on?"#FDF2F8":"#fff",cursor:"pointer",marginBottom:".35rem"},children:[
   e.jsx("input",{type:"checkbox",checked:on,onChange:onClick,style:{width:17,height:17,accentColor:P1,marginTop:1}}),e.jsxs("span",{children:[e.jsx("b",{style:{fontSize:".84rem"},children:t}),d?e.jsx("span",{style:{display:"block",fontSize:".72rem",color:"#64748B",fontWeight:600},children:d}):null]})]});
 const Seg=({v,on,ops})=>e.jsx("span",{style:S.seg,children:ops.map(([k,t])=>e.jsx("button",{type:"button",style:S.segb(v===k),onClick:()=>on(k),children:t},k))});

 const filt=(liste||[]).filter(c=>(arsiv||!(c.arsivli===!0||c.arsivli==="true"))&&(!ara||String(c.isim).toLocaleLowerCase("tr-TR").includes(ara.toLocaleLowerCase("tr-TR"))));
 const sec=k=>setSecili(s=>s.includes(k)?s.filter(x=>x!==k):[...s,k]);
 const R0=RAPORLAR.find(r=>r.id===rapor);

 // sol: yarışmalar
 const sol=e.jsxs("div",{children:[
  e.jsxs("div",{style:S.card,children:[e.jsxs("div",{style:S.h,children:[e.jsx("span",{style:S.hi,children:MI("event",{fontSize:17})}),__T("Yarışmalar"),e.jsx("span",{style:{marginLeft:"auto",fontSize:".72rem",color:"#BE185D",fontWeight:900},children:secili.length?secili.length+" "+__T("seçili"):""})]}),
   e.jsx("input",{style:S.inp,placeholder:__T("Yarışma ara…"),value:ara,onChange:ev=>setAra(ev.target.value)}),
   e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:".4rem",fontSize:".76rem",fontWeight:800,color:"#64748B",margin:".5rem 0"},children:[e.jsx("input",{type:"checkbox",checked:arsiv,onChange:()=>setArsiv(!arsiv),style:{accentColor:P1}}),__T("Arşivdeki yarışmaları da göster")]}),
   e.jsx("div",{style:{maxHeight:"56vh",overflowY:"auto",display:"grid",gap:".3rem",paddingRight:2},children:liste===null?e.jsx("div",{style:{color:"#64748B",fontWeight:700,padding:"1rem 0"},children:__T("Yükleniyor…")}):!filt.length?e.jsx("div",{style:{color:"#64748B",fontWeight:700,padding:"1rem 0"},children:__T("Yarışma bulunamadı")}):
    filt.map(c=>{const on=secili.includes(c._id),ar=c.arsivli===!0||c.arsivli==="true";return e.jsxs("button",{type:"button",onClick:()=>sec(c._id),style:{textAlign:"left",border:"1.5px solid "+(on?P1:"#EEF0F4"),background:on?"#FDF2F8":"#fff",borderRadius:12,padding:".5rem .6rem",cursor:"pointer",fontFamily:"inherit",display:"flex",gap:".5rem",alignItems:"flex-start"},children:[
      e.jsx("span",{style:{width:18,height:18,borderRadius:6,border:"2px solid "+(on?P1:"#CBD5E1"),background:on?P1:"#fff",color:"#fff",display:"grid",placeItems:"center",flexShrink:0,marginTop:1,fontSize:12,fontWeight:900},children:on?"✓":""}),
      e.jsxs("span",{style:{minWidth:0},children:[e.jsx("b",{style:{display:"block",fontSize:".83rem",lineHeight:1.25},children:c.isim}),e.jsxs("span",{style:{fontSize:".7rem",color:"#64748B",fontWeight:700},children:[[tarihStr(c),c.il].filter(Boolean).join(" · "),ar?e.jsx("span",{style:{marginLeft:6,color:"#B45309"},children:"· "+__T("arşiv")}):null,isIntl(c)?e.jsx("span",{style:{marginLeft:6,color:"#0369A1"},children:"· "+__T("uluslararası")}):null]})]})]},c._id)})}),
   secili.length?e.jsx("button",{type:"button",style:{...S.ghost,marginTop:".6rem"},onClick:()=>setSecili([]),children:__T("Seçimi temizle")}):null]})]});

 // sağ: rapor kataloğu + seçenekler + önizleme
 const katalog=e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:".55rem",marginBottom:".9rem"},children:RAPORLAR.map(r=>{const on=rapor===r.id;
  return e.jsxs("button",{type:"button",disabled:r.yakinda,onClick:()=>!r.yakinda&&setRapor(r.id),style:{textAlign:"left",border:"1.5px solid "+(on?P1:"#EEF0F4"),background:on?"linear-gradient(135deg,#FDF2F8,#F5F3FF)":"#fff",borderRadius:14,padding:".65rem .7rem",cursor:r.yakinda?"default":"pointer",opacity:r.yakinda?.55:1,fontFamily:"inherit",display:"flex",gap:".55rem",boxShadow:on?"0 6px 18px -10px rgba(236,72,153,.6)":"none"},children:[
   e.jsx("span",{style:{width:34,height:34,borderRadius:11,display:"grid",placeItems:"center",background:on?G:"#F1F5F9",color:on?"#fff":"#64748B",flexShrink:0},children:MI(r.ic,{fontSize:19})}),
   e.jsxs("span",{style:{minWidth:0},children:[e.jsxs("b",{style:{fontSize:".84rem",display:"flex",gap:".3rem",alignItems:"center"},children:[__T(r.t),r.yakinda?e.jsx("span",{style:{fontSize:".6rem",fontWeight:900,background:"#F1F5F9",color:"#64748B",borderRadius:99,padding:".1rem .4rem"},children:__T("YAKINDA")}):null]}),e.jsx("span",{style:{display:"block",fontSize:".7rem",color:"#64748B",fontWeight:600,lineHeight:1.3},children:__T(r.d)})]})]},r.id)})});

 const secenek=e.jsxs("div",{style:S.card,children:[e.jsxs("div",{style:S.h,children:[e.jsx("span",{style:S.hi,children:MI("tune",{fontSize:17})}),__T(R0.t)+" · "+__T("Seçenekler")]}),
  e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:".2rem 1rem"},children:[
   rapor==="sonuc"?e.jsxs("div",{children:[e.jsx("div",{style:S.lbl,children:__T("Bölümler")}),
     e.jsx(Tog,{on:opt.genel,onClick:()=>so("genel",!opt.genel),t:__T("Genel tasnif"),d:__T("Kategori başına; alet puanları ve toplam")}),
     BR==="ritmik"?e.jsx(Tog,{on:opt.alet,onClick:()=>so("alet",!opt.alet),t:__T("Alet sıralamaları"),d:"DA · DB · A · E · "+__T("Ceza")}):null,
     BR!=="ritmik"?e.jsx("div",{style:{fontSize:".72rem",color:"#64748B",fontWeight:700,margin:".2rem 0 .5rem"},children:__T("Aerobik takım puanı Kulüp Takım Puanı sayfasındadır.")}):e.jsx(Tog,{on:opt.takim,onClick:()=>so("takim",!opt.takim),t:__T("Takım sıralaması"),d:__T("Ülke / kulüp; ilk 3-4 sporcunun her aletteki en iyi 2 puanı")}),
     e.jsx(Tog,{on:opt.final,onClick:()=>so("final",!opt.final),t:__T("Finaller"),d:BR==="ritmik"?__T("Genel tasnif ve alet finalleri"):__T("Final kategorileri")})]})
   :rapor==="zaman"?e.jsxs("div",{children:[e.jsx("div",{style:S.lbl,children:__T("Kapsam")}),e.jsx("div",{style:{fontSize:".78rem",color:"#475569",fontWeight:600,lineHeight:1.45},children:__T("Plan: Program / Çıkış Listesi'ndeki gün ve blok saatleri. Gerçekleşen: ilk çağrı (yoksa ilk puan) ve son puan kayıt zamanı. Çıkış listesi olmayan yarışmada yalnız gerçekleşen zamanlar gün × kategori × alet olarak gösterilir.")}),
     logYuk?e.jsx("div",{style:{fontSize:".74rem",color:"#B45309",fontWeight:800,marginTop:".3rem"},children:__T("İşlem kaydı yükleniyor…")}):null]})
   :rapor==="sporcu"?e.jsxs("div",{children:[e.jsx("div",{style:S.lbl,children:__T("Sporcu ara")}),e.jsx("input",{style:S.inp,placeholder:__T("Ad, soyad, kulüp ya da ülke…"),value:opt.sAra,onChange:ev=>so("sAra",ev.target.value)}),
     e.jsx("div",{style:S.lbl,children:__T("En az yarışma sayısı")}),e.jsx(Seg,{v:String(opt.sMin),on:v=>so("sMin",+v),ops:[["1","1"],["2","2"],["3","3"]]}),
     e.jsx("div",{style:S.lbl,children:__T("Sıralama")}),e.jsx(Seg,{v:opt.sSira,on:v=>so("sSira",v),ops:[["ad",__T("Ada göre")],["fark",__T("Gelişime göre")],["enIyi",__T("En iyi puana göre")]]})]})
   :rapor==="seyirci"?e.jsxs("div",{children:[e.jsx("div",{style:S.lbl,children:__T("Kapsam")}),e.jsx("div",{style:{fontSize:".78rem",color:"#475569",fontWeight:600,lineHeight:1.45},children:__T("Bağımsız seyirci sitesi (gymexascore.net kısa linki) ziyaretleri. Sayfa açıkken 30 sn'de bir sinyal gelir; en yüksek eşzamanlı izleyici dakikalık hesaplanır. Kişisel veri tutulmaz: rastgele tarayıcı kimliği, cihaz tipi ve ülke. Kayıt 9 Ekim 2026'dan itibaren tutulur.")}),
     e.jsxs("button",{type:"button",style:{...S.chip(!1),marginTop:".6rem"},disabled:istYuk,onClick:()=>setIstV({}),children:[MI("refresh",{fontSize:15,verticalAlign:"-3px",marginRight:4}),istYuk?__T("Yükleniyor…"):__T("Yenile")]})]})
   :rapor==="video"?e.jsxs("div",{children:[e.jsx("div",{style:S.lbl,children:__T("Kapsam")}),e.jsx("div",{style:{fontSize:".78rem",color:"#475569",fontWeight:600,lineHeight:1.45},children:__T("Puanlanmış her rutin için kamera A / B videosu aranır. Drive ve Cloudinary bağlantıları ayrı sayılır (Cloudinary hesabı kapalı olduğu için o videolar şu an açılmaz). Yükleme hataları ve 10 dakikadan uzun yanıt vermeyen yüklemeler listelenir.")})]})
   :rapor==="log"?e.jsxs("div",{children:[e.jsx("div",{style:S.lbl,children:__T("İşlem türleri")+(opt.lTur.length?"":" · "+__T("tümü"))}),
     e.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:".3rem",maxHeight:150,overflowY:"auto"},children:(islem?islem.tumTur:[]).filter(t=>t!=="judge_score_submit"||opt.lHakem).map(t=>e.jsx("button",{type:"button",style:S.chip(opt.lTur.includes(t)),onClick:()=>so("lTur",opt.lTur.includes(t)?opt.lTur.filter(x=>x!==t):[...opt.lTur,t]),children:__T(LOG_TUR[t]||t)},t))}),
     e.jsx("div",{style:S.lbl,children:__T("Kullanıcı")}),e.jsxs("select",{style:S.inp,value:opt.lKul,onChange:ev=>so("lKul",ev.target.value),children:[e.jsx("option",{value:"",children:__T("Tüm kullanıcılar")}),...(islem?islem.tumKul:[]).map(u=>e.jsx("option",{value:u,children:u},u))]}),
     e.jsx("div",{style:{marginTop:".5rem"},children:e.jsx(Tog,{on:opt.lHakem,onClick:()=>so("lHakem",!opt.lHakem),t:__T("Hakem not girişleri"),d:__T("Her hakem notu ayrı kayıttır (binlerce olabilir)")})}),
     logYuk?e.jsx("div",{style:{fontSize:".74rem",color:"#B45309",fontWeight:800,marginTop:".3rem"},children:__T("İşlem kaydı yükleniyor…")}):null]})
   :rapor==="katilim"?e.jsxs("div",{children:[e.jsx("div",{style:S.lbl,children:__T("Kapsam")}),e.jsx("div",{style:{fontSize:".78rem",color:"#475569",fontWeight:600,lineHeight:1.45},children:__T("Sporcular eleme kategorilerinden sayılır; finalistler ayrıca gösterilir. Birden çok yarışma seçilirse aynı sporcu lisans no (yoksa ad soyad + doğum tarihi) ile eşleşir ve kulüpler yarışmalara göre karşılaştırılır. Kimlik numarası kullanılmaz.")})]})
   :rapor==="itiraz"?e.jsxs("div",{children:[e.jsx("div",{style:S.lbl,children:__T("Gösterilecek değişiklikler")}),
     e.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:".3rem"},children:Object.keys(DG_TUR).filter(t=>t!=="hakem_duzelt"||opt.dHakem).map(t=>e.jsxs("button",{type:"button",style:S.chip(opt.dTur.includes(t)),onClick:()=>so("dTur",opt.dTur.includes(t)?opt.dTur.filter(x=>x!==t):[...opt.dTur,t]),children:[e.jsx("span",{style:{width:8,height:8,borderRadius:"50%",background:DG_TUR[t][1]}}),TAui(t)]},t))}),
     e.jsx("div",{style:{marginTop:".5rem"},children:e.jsx(Tog,{on:opt.dHakem,onClick:()=>so("dHakem",!opt.dHakem),t:__T("Hakemin kendi düzeltmeleri"),d:__T("Hakem notunu kaydetmeden önce değiştirdiyse (çok sayıda olabilir)")})}),
     e.jsx(Tog,{on:opt.dFin,onClick:()=>so("dFin",!opt.dFin),t:__T("Finaller dahil"),d:__T("Final kategorilerindeki değişiklik ve itirazlar")}),
     logYuk?e.jsx("div",{style:{fontSize:".74rem",color:"#B45309",fontWeight:800,marginTop:".3rem"},children:__T("İşlem kaydı yükleniyor…")}):null]})
   :rapor==="hakem"?e.jsxs("div",{children:[e.jsx("div",{style:S.lbl,children:__T("Referans not")}),
     e.jsx(Seg,{v:opt.hRef,on:v=>so("hRef",v),ops:[["sj",__T("Üst Jüri (SJ), yoksa panel")],["panel",__T("Panel sonucu")]]}),
     e.jsx("div",{style:S.lbl,children:__T("Paneller")}),
     e.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:".3rem"},children:(BR==="ritmik"?["DA","DB","A","E"]:["A","E"]).map(P=>e.jsx("button",{type:"button",style:S.chip(opt.hPanel.includes(P)),onClick:()=>so("hPanel",opt.hPanel.includes(P)?opt.hPanel.filter(x=>x!==P):[...opt.hPanel,P]),children:P},P))}),
     e.jsx("div",{style:{marginTop:".5rem"},children:e.jsx(Tog,{on:opt.hFin,onClick:()=>so("hFin",!opt.hFin),t:__T("Finaller dahil"),d:__T("Final kategorilerindeki notlar da değerlendirilir")})}),
     e.jsx("div",{style:S.lbl,children:__T("En az not sayısı")}),e.jsx(Seg,{v:String(opt.hMin),on:v=>so("hMin",+v),ops:[["1","1"],["5","5"],["10","10"],["20","20"]]})]})
   :e.jsxs("div",{children:[e.jsx("div",{style:S.lbl,children:__T("Madalya sayılan sonuçlar")}),
     e.jsx(Tog,{on:opt.mGenel,onClick:()=>so("mGenel",!opt.mGenel),t:BR==="ritmik"?__T("Genel tasnif"):__T("Kategori sonuçları"),d:BR==="ritmik"?__T("Genel tasnif finali varsa final sonucu"):__T("Kategorinin finali yapıldıysa final sonucu")}),
     BR==="ritmik"?e.jsx(Tog,{on:opt.mAlet,onClick:()=>so("mAlet",!opt.mAlet),t:__T("Alet"),d:__T("Alet finalleri")}):null,
     BR==="ritmik"&&opt.mAlet?e.jsx(Tog,{on:opt.mAletElem,onClick:()=>so("mAletElem",!opt.mAletElem),t:__T("Finali olmayan alet"),d:__T("Alet finali yapılmadıysa eleme alet sıralaması madalya sayılır")}):null,
     BR==="ritmik"?e.jsx(Tog,{on:opt.mTakim,onClick:()=>so("mTakim",!opt.mTakim),t:__T("Takım"),d:__T("Takım sıralamasının ilk üçü")}):null]}),
   e.jsxs("div",{children:[
     katSec.length?e.jsxs(e.Fragment,{children:[e.jsx("div",{style:S.lbl,children:__T("Kategoriler")+(opt.kats.length?"":" · "+__T("tümü"))}),
      e.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:".3rem"},children:katSec.map(([k,ad])=>e.jsx("button",{type:"button",style:S.chip(opt.kats.includes(k)),onClick:()=>so("kats",opt.kats.includes(k)?opt.kats.filter(x=>x!==k):[...opt.kats,k]),children:ad},k))})]}):null,
     rapor==="madalya"?e.jsxs(e.Fragment,{children:[e.jsx("div",{style:S.lbl,children:__T("Gruplama")}),e.jsx(Seg,{v:opt.grup,on:v=>so("grup",v),ops:[["oto",__T("Otomatik")],["ulke",__T("Ülke")],["kulup",__T("Kulüp")],["il",__T("İl")]]}),
      e.jsx("div",{style:S.lbl,children:__T("Sıralama")}),e.jsx(Seg,{v:opt.mSira,on:v=>so("mSira",v),ops:[["altin",__T("Altın önce (olimpik)")],["toplam",__T("Toplam madalya")]]})]}):null,
     e.jsx("div",{style:S.lbl,children:__T("Çıktı dili")}),e.jsx(Seg,{v:opt.dil,on:v=>so("dil",v),ops:[["oto",__T("Otomatik")],["tr","Türkçe"],["en","English"]]})]})]}),
  e.jsxs("div",{style:{display:"flex",gap:".5rem",flexWrap:"wrap",marginTop:".9rem",alignItems:"center"},children:[
   e.jsxs("button",{type:"button",style:{...S.btn,background:G,opacity:!comps.length||busy?.5:1},disabled:!comps.length||!!busy,onClick:pdfAl,children:[MI(busy==="pdf"?"hourglass_top":"picture_as_pdf"),__T("PDF indir")]}),
   e.jsxs("button",{type:"button",style:{...S.btn,background:"#15803D",opacity:!comps.length||busy?.5:1},disabled:!comps.length||!!busy,onClick:excelAl,children:[MI(busy==="xlsx"?"hourglass_top":"table_view"),__T("Excel indir")]}),
   !comps.length?e.jsx("span",{style:{fontSize:".8rem",color:"#64748B",fontWeight:700},children:yuk?__T("Yükleniyor…"):__T("Soldan en az bir yarışma seçin.")}):null]})]});

 const thR=(t,sol)=>e.jsx("th",{style:{...S.th,textAlign:sol?"left":"right"},children:t});
 const madalyaRenk=r=>r===1?"#B45309":r===2?"#64748B":r===3?"#C2410C":"#0F172A";
 const onizleme=!comps.length?null:rapor==="sonuc"?sonuc.map(({C,bol})=>e.jsxs("div",{style:S.card,children:[
   e.jsxs("div",{style:{...S.h,marginBottom:".3rem"},children:[e.jsx("span",{style:S.hi,children:MI("emoji_events",{fontSize:17})}),C.isim]}),
   e.jsx("div",{style:{fontSize:".74rem",color:"#64748B",fontWeight:700,marginBottom:".7rem"},children:[tarihStr(C),C.il,bol.length+" "+__T("bölüm")].filter(Boolean).join(" · ")}),
   !bol.length?e.jsx("div",{style:{color:"#64748B",fontWeight:700},children:__T("Seçili kapsamda puanı olan sonuç yok.")}):
   bol.map((b,bi)=>{const cols=sutunlar(b),ic=isIntl(C);return e.jsxs("div",{style:{marginBottom:"1rem"},children:[
     e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:".5rem",background:"#FDF2F8",borderLeft:"4px solid "+P1,borderRadius:10,padding:".45rem .7rem",fontWeight:900,fontSize:".85rem",marginBottom:".35rem"},children:[bolBaslik(b),
      e.jsx("span",{style:{marginLeft:"auto",fontSize:".66rem",fontWeight:900,color:b.tamam?"#15803D":"#B45309",background:b.tamam?"#DCFCE7":"#FEF3C7",padding:".15rem .45rem",borderRadius:99},children:b.tip==="takim"?b.rows.length+" "+__T("takım"):b.tamam?__T("TAMAMLANDI"):__T("DEVAM EDİYOR")})]}),
     e.jsx("div",{style:{overflowX:"auto"},children:e.jsxs("table",{style:{width:"100%",borderCollapse:"collapse"},children:[e.jsx("thead",{children:e.jsxs("tr",{children:[thR(L("Sıra","Rank"),1),thR(b.tip==="takim"?L("Takım","Team"):L("Sporcu","Gymnast"),1),thR(ic?L("Ülke","NOC"):L("Kulüp / İl","Club / Prov."),1),...cols.map(c=>thR(c.b))]})}),
      e.jsx("tbody",{children:b.rows.map((r,i)=>e.jsxs("tr",{style:{background:i%2?"#FAFAFD":"#fff"},children:[
       e.jsx("td",{style:{...S.td,textAlign:"left",fontWeight:900,color:madalyaRenk(r.rank),width:44},children:r.rank??"—"}),
       e.jsxs("td",{style:{...S.td,textAlign:"left",whiteSpace:"normal",fontWeight:800,width:"40%"},children:[b.tip==="takim"?r.ad:satirAd(r),r.takim&&r.uyeler?.length?e.jsx("span",{style:{display:"block",fontSize:".7rem",color:"#64748B",fontWeight:600},children:r.uyeler.join(", ")}):null]}),
       e.jsx("td",{style:{...S.td,textAlign:"left",color:"#475569",fontWeight:700},children:ic?r.ulke:(r.takim?(r.il&&UP(r.il)!==UP(r.ad)?r.il:""):r.kulup||r.il)}),
       ...cols.map((c,ci)=>e.jsx("td",{style:{...S.td,fontWeight:c.t?900:600,color:c.t?"#0F172A":"#334155"},children:c.f(r)},ci))]},i))})]})})]},bi)})]},C._id))
  :["zaman","sporcu","video","log","seyirci"].includes(rapor)?(()=>{const tab=(cols,rows,o2)=>e.jsx("div",{style:{overflowX:"auto"},children:e.jsxs("table",{style:{width:"100%",borderCollapse:"collapse"},children:[e.jsx("thead",{children:e.jsx("tr",{children:cols.map((c,i)=>thR(c,!(o2&&o2.sag&&o2.sag.includes(i))))})}),
   e.jsx("tbody",{children:rows.map((rw,i)=>e.jsx("tr",{style:{background:i%2?"#FAFAFD":"#fff"},children:rw.map((v,j)=>{const st=o2&&o2.st?o2.st(i,j):null;return e.jsx("td",{style:{...S.td,textAlign:o2&&o2.sag&&o2.sag.includes(j)?"right":"left",fontWeight:j===0?800:600,whiteSpace:o2&&o2.nw?"nowrap":"pre-line",...st},children:v},j)})},i))})]})});
  const bas=t=>e.jsx("div",{style:{fontWeight:900,fontSize:".85rem",background:"#FDF2F8",borderLeft:"4px solid "+P1,borderRadius:10,padding:".45rem .7rem",margin:"1rem 0 .35rem"},children:t});
  const not=t=>e.jsx("div",{style:{fontSize:".74rem",fontWeight:700,color:"#B45309",background:"#FFFBEB",border:"1px solid #FDE68A",borderRadius:10,padding:".45rem .6rem",margin:".4rem 0"},children:t});
  const ic=comps.length>1?1:0,R0=RAPORLAR.find(x=>x.id===rapor),kap=t=>e.jsxs("div",{style:S.card,children:[e.jsxs("div",{style:{...S.h,marginBottom:".3rem"},children:[e.jsx("span",{style:S.hi,children:MI(R0.ic,{fontSize:17})}),L(R0.t,({zaman:"Timetable Analysis",sporcu:"Gymnast Comparison",video:"Video Archive Status",log:"Audit Log",seyirci:"Spectator Statistics"})[rapor])]}),logYuk&&(rapor==="zaman"||rapor==="log")?not(__T("İşlem kaydı yükleniyor…")):null,istYuk&&rapor==="seyirci"?not(__T("Seyirci verisi yükleniyor…")):null,...t]});
  if(rapor==="zaman"&&zaman)return kap([zaman.planYok.length?not(L("Çıkış listesi (plan) yok: ","No start list (plan): ")+zaman.planYok.join(", ")+L(" — yalnız gerçekleşen zamanlar."," — actual times only.")):null,
   bas(L("Gün özeti","Daily summary")),tab(zgCols(),zaman.gunler.map(zgRow),{sag:[1,2,3].map(x=>x+ic)}),
   bas(L("Bloklar","Blocks")+" ("+zaman.bl.length+")"),tab(zbCols(),zaman.bl.map(zbRow),{nw:!0,sag:[4,5].map(x=>x+ic),st:(i,j)=>{const b=zaman.bl[i];return j===zbCols().length-6&&b.gecikme!=null?{color:b.gecikme>9e5?"#B91C1C":b.gecikme>3e5?"#B45309":"#15803D",fontWeight:900}:null}})]);
  if(rapor==="sporcu"&&sporcuK)return kap([e.jsx("div",{style:{fontSize:".74rem",color:"#64748B",fontWeight:700},children:L("Hücre: genel tasnif puanı (sıra) · kategori · final sonuçları. * farklı kategorilerdeki puanlar.","Cell: all-around score (rank) · category · finals. * different categories.")}),
   bas(L("Sporcular","Gymnasts")+" ("+sporcuK.length+")"+(sporcuK.length>200?" · "+L("ilk 200 gösteriliyor","first 200 shown"):"")),tab(skCols(),sporcuK.slice(0,200).map(skRow),{sag:[2],st:(i,j)=>{const x=sporcuK[i];return j===skCols().length-2&&x.fark!=null?{color:x.fark>0?"#15803D":x.fark<0?"#B91C1C":"#0F172A",fontWeight:900}:null}})]);
  if(rapor==="seyirci"&&sey){const kt=(ik,et,v,alt,renk)=>e.jsxs("div",{style:{flex:"1 1 150px",border:"1.5px solid #EEF0F4",borderRadius:14,padding:".6rem .75rem",background:"#fff"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:5,fontSize:".68rem",fontWeight:900,letterSpacing:".05em",textTransform:"uppercase",color:"#64748B"},children:[MI(ik,{fontSize:15,color:renk||P1}),et]}),e.jsx("div",{style:{fontSize:"1.55rem",fontWeight:900,color:"#0F172A",lineHeight:1.2},children:v}),alt?e.jsx("div",{style:{fontSize:".7rem",fontWeight:700,color:"#64748B"},children:alt}):null]});
   const T0=sey.all.reduce((a,x)=>({g:a.g+x.giris,t:a.t+x.tekil,p:Math.max(a.p,x.tepe),a:a.a+x.aktif}),{g:0,t:0,p:0,a:0}),pX=sey.all.reduce((a,x)=>x.tepe>=(a?a.tepe:-1)?x:a,null);
   const grafik=sey.all.flatMap(x=>x.gunler.filter(g=>!g.sayac).map(g=>{const hs=x.saatler.filter(h=>h.g===g.g),mx=Math.max(1,...hs.map(h=>h.tepe));
    return e.jsxs("div",{style:{marginBottom:".6rem"},children:[e.jsx("div",{style:{fontSize:".72rem",fontWeight:800,color:"#475569",marginBottom:2},children:(ic?x.C.isim+" · ":"")+syGun(g.g)+" — "+L("saatlik en yüksek eşzamanlı","hourly peak concurrent")}),
     e.jsx("div",{style:{display:"flex",alignItems:"flex-end",gap:3,height:70,borderBottom:"1px solid #E2E8F0"},children:Array.from({length:24},(_,h)=>{const r=hs.find(z=>+z.sa===h),v=r?r.tepe:0;return e.jsxs("div",{title:String(h).padStart(2,"0")+":00 — "+L("en yüksek ","peak ")+v+" · "+L("giriş ","sessions ")+(r?r.giris:0),style:{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"flex-end",height:"100%"},children:[v?e.jsx("div",{style:{fontSize:".58rem",fontWeight:800,color:"#6D28D9"},children:v}):null,e.jsx("div",{style:{width:"100%",height:Math.max(v?3:1,Math.round(v/mx*52)),borderRadius:"3px 3px 0 0",background:v?"linear-gradient(180deg,#8B5CF6,#EC4899)":"#EEF0F4"}})]},h)})}),
     e.jsx("div",{style:{display:"flex",gap:3},children:Array.from({length:24},(_,h)=>e.jsx("div",{style:{flex:1,textAlign:"center",fontSize:".55rem",color:"#94A3B8",fontWeight:700},children:h%3?"":String(h).padStart(2,"0")},h))})]},x.C._id+g.g)}));
   return kap([!sey.n&&!sey.gun.length?not(L("Henüz kayıt yok. Sayaç 9 Ekim 2026'da devreye girdi; seyirci linki açıldıkça veri birikir.","No data yet. Counting started on 9 Oct 2026; data accumulates as the spectator link is opened.")):null,
    e.jsxs("div",{style:{display:"flex",gap:".5rem",flexWrap:"wrap",margin:".4rem 0 .2rem"},children:[kt("sensors",L("Şu an izleyen","Watching now"),T0.a,L("son 75 sn","last 75 s"),"#16A34A"),kt("login",L("Toplam giriş","Total sessions"),T0.g),kt("person",L("Tekil ziyaretçi","Unique visitors"),T0.t),kt("trending_up",L("En yüksek eşzamanlı","Peak concurrent"),T0.p,pX&&pX.tepeTs?syGun(trG(pX.tepeTs))+" "+syZ(pX.tepeTs):"")]}),
    bas(L("Özet","Summary")),tab(syOzCols(),sey.all.map(syOzRow),{sag:[1,2,3,5,6,7,8,9]}),
    bas(L("Gün bazında","By day")),tab(syGCols(),sey.gun.map(syGRow),{sag:[1,2,3,5,6].map(x=>x+ic)}),
    grafik.length?e.jsxs(e.Fragment,{children:[bas(L("Saatlik yoğunluk grafiği","Hourly activity chart")),...grafik]}):null,
    sey.saat.length?e.jsxs(e.Fragment,{children:[bas(L("Saatlik yoğunluk","Hourly activity")),tab(sySCols(),sey.saat.map(sySRow),{sag:[2,3,4].map(x=>x+ic)})]}):null,
    sey.ulke.length?e.jsxs(e.Fragment,{children:[bas(L("Ülkeler","Countries")),tab(syUCols(),sey.ulke.map(syURow),{sag:[2,3,4]})]}):null,
    sey.n?e.jsxs(e.Fragment,{children:[bas(L("Cihaz ve dil","Device and language")),tab([L("Tür","Type"),L("Oturum","Sessions"),L("Pay","Share")],syCRows(),{sag:[1,2]})]}):null])}
  if(rapor==="video"&&video)return kap([video.all.some(x=>x.src.cloudinary)?not(L("Cloudinary bağlantıları şu an erişilemez (hesap kapalı).","Cloudinary links are currently unavailable (account disabled).")):null,
   bas(L("Özet","Summary")),tab(vOzCols(),video.all.map(vOzRow),{sag:[1,2,3,4,5,6,7,8,9,10]}),
   bas(L("Kategori ve alet bazında","By category and apparatus")),tab(vdCols(),video.G.map(vdRow),{sag:[2,3,4,5,6,7,8].map(x=>x+ic),st:(i,j)=>{const g=video.G[i];return j===vdCols().length-2?{fontWeight:900,color:g.biri===g.rutin?"#15803D":g.biri?"#B45309":"#B91C1C"}:null}}),
   video.hata.length?e.jsxs(e.Fragment,{children:[bas(L("Yükleme sorunları","Upload problems")+" ("+video.hata.length+")"),tab([L("Zaman","Time"),L("Sporcu","Gymnast"),L("Kategori","Category"),L("Alet","App."),L("Kamera","Camera"),L("Durum","Status"),L("Mesaj","Message")],video.hata.map(h=>[zm(h.ts),h.ad,kA(h.kat),h.al?aA(h.al):"",h.cam,h.durum==="hata"?L("hata","error"):L("yanıt yok (10 dk+)","no response (10 min+)"),h.mesaj]))]}):null,
   bas(L("Videosu olmayan rutinler","Routines without video")+" ("+video.eksik.length+")"+(video.eksik.length>100?" · "+L("ilk 100","first 100"):"")),video.eksik.length?tab([...(ic?[L("Yarışma","Comp.")]:[]),L("Kategori","Category"),L("Alet","App."),L("Sporcu","Gymnast"),L("Temsil","NOC / Club"),L("Puan zamanı","Scored at")],video.eksik.slice(0,100).map(x=>[...(ic?[x.C.isim]:[]),kA(x.kat),aA(x.al),x.ad,x.temsil,zm(x.ts)])):null]);
  if(rapor==="log"&&islem)return kap([e.jsxs("div",{style:{display:"flex",gap:"1rem",flexWrap:"wrap"},children:[e.jsx("div",{style:{flex:"1 1 260px"},children:tab([L("İşlem","Action"),L("Adet","Count")],islem.tur.map(([t,n])=>[LT(t),n]),{sag:[1]})}),e.jsx("div",{style:{flex:"1 1 200px"},children:tab([L("Kullanıcı","User"),L("Adet","Count")],islem.kul.map(([t,n])=>[t||"—",n]),{sag:[1]})})]}),
   bas(L("Kayıtlar","Entries")+" ("+islem.rows.length+")"+(islem.rows.length>300?" · "+L("son 300 gösteriliyor; tamamı PDF / Excel'de","last 300 shown; all in PDF / Excel"):"")),tab(lgCols(),islem.rows.slice(-300).reverse().map(lgRow))]);
  return null})()
  :rapor==="katilim"&&katilim?(()=>{const K0=katilim,tab=(cols,rows,o2)=>e.jsx("div",{style:{overflowX:"auto"},children:e.jsxs("table",{style:{width:"100%",borderCollapse:"collapse"},children:[e.jsx("thead",{children:e.jsx("tr",{children:cols.map((c,i)=>thR(c,!(o2&&o2.sag&&o2.sag.includes(i))))})}),
   e.jsx("tbody",{children:rows.map((rw,i)=>e.jsx("tr",{style:{background:i%2?"#FAFAFD":"#fff"},children:rw.map((v,j)=>e.jsx("td",{style:{...S.td,textAlign:o2&&o2.sag&&o2.sag.includes(j)?"right":"left",fontWeight:j===0?800:600,whiteSpace:"normal"},children:v},j))},i))})]})});
  const bas=t=>e.jsx("div",{style:{fontWeight:900,fontSize:".85rem",background:"#FDF2F8",borderLeft:"4px solid "+P1,borderRadius:10,padding:".45rem .7rem",margin:"1rem 0 .35rem"},children:t});
  const cubuk=(pay,mx)=>e.jsx("div",{style:{height:9,borderRadius:9,background:"#F1F5F9",minWidth:120},children:e.jsx("div",{style:{height:9,borderRadius:9,width:Math.max(2,pay/Math.max(1,mx)*100)+"%",background:G}})});
  const mxB=Math.max(1,...K0.bolge.map(b=>b.pay)),mxY=Math.max(1,...K0.yillar.map(b=>b.pay)),kart=(v,t,ic)=>e.jsxs("div",{style:{flex:"1 1 130px",background:"#F8FAFC",border:"1px solid #EEF0F4",borderRadius:14,padding:".6rem .75rem"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:".35rem",color:"#64748B",fontSize:".7rem",fontWeight:800},children:[MI(ic,{fontSize:15,color:P1}),t]}),e.jsx("div",{style:{fontSize:"1.45rem",fontWeight:900,marginTop:".1rem"},children:v})]});
  const T0=K0.ozet.reduce((a,o)=>({cikis:a.cikis+o.cikis,yarisan:a.yarisan+o.yarisan,yarismayan:a.yarismayan+o.yarismayan,grup:a.grup+o.grup}),{cikis:0,yarisan:0,yarismayan:0,grup:0});
  return e.jsxs("div",{style:S.card,children:[e.jsxs("div",{style:{...S.h,marginBottom:".5rem"},children:[e.jsx("span",{style:S.hi,children:MI("groups",{fontSize:17})}),L("Katılım İstatistikleri","Participation Statistics")]}),
   e.jsxs("div",{style:{display:"flex",flexWrap:"wrap",gap:".5rem"},children:[kart(K0.toplam,L("Sporcu","Gymnasts"),"person"),kart(T0.grup,L("Grup","Groups"),"groups_3"),kart(K0.kulup.length,L("Kulüp / takım","Clubs / teams"),"shield"),kart(K0.bolge.filter(b=>b.ad!=="—").length,bAd(K0.bolgeTip),"public"),kart(T0.cikis,BR==="ritmik"?L("Alet çıkışı","Starts"):L("Çıkış","Starts"),"sports_gymnastics"),kart(T0.yarismayan,L("Puanı olmayan","No score"),"person_off"),
    K0.tekrar?kart(K0.tekrar.iki,L("Birden çok yarışmada","In 2+ competitions"),"repeat"):null]}),
   bas(L("Özet","Summary")),tab(kOzCols(),K0.ozet.map(kOzRow),{sag:[1,2,3,4,5,6,7,8,9,10]}),
   bas(L("Kategori bazında","By category")),tab(kKatCols(),K0.kats.map(kKatRow),{sag:[1,2,3,4,5,6,7,8].map(x=>x+(comps.length>1?1:0))}),
   bas(bAd(K0.bolgeTip)+" "+L("bazında","distribution")),tab([bAd(K0.bolgeTip),L("Sporcu","Gymnasts"),L("Kulüp","Clubs"),L("Finalist","Finalists"),L("Pay","Share"),""],K0.bolge.map(b=>[b.ad,b.sp,b.kul,b.fin,yz(b.pay),cubuk(b.pay,mxB)]),{sag:[1,2,3,4]}),
   bas(L("Kulüp / takım bazında","By club / team")+" ("+K0.kulup.length+")"),tab(kKulCols(),K0.kulup.map(kKulRow),{sag:[2,3,...(comps.length>1?comps.map((_,i)=>4+i):[])]}),
   K0.yillar.length?e.jsxs(e.Fragment,{children:[bas(L("Doğum yılı dağılımı","Birth year distribution")),tab([L("Doğum yılı","Birth year"),L("Sporcu","Gymnasts"),L("Pay","Share"),""],K0.yillar.map(b=>[b.y,b.n,yz(b.pay),cubuk(b.pay,mxY)]),{sag:[1,2]})]}):null]})})()
  :rapor==="itiraz"&&degis?(()=>{const G0=degis,tab=(cols,rows,o2)=>e.jsx("div",{style:{overflowX:"auto"},children:e.jsxs("table",{style:{width:"100%",borderCollapse:"collapse"},children:[e.jsx("thead",{children:e.jsx("tr",{children:cols.map((c,i)=>thR(c,!(o2&&o2.sag&&o2.sag.includes(i))))})}),
   e.jsx("tbody",{children:rows.map((rw,i)=>e.jsx("tr",{style:{background:i%2?"#FAFAFD":"#fff"},children:rw.map((v,j)=>{const st=o2&&o2.st?o2.st(i,j):null;return e.jsx("td",{style:{...S.td,textAlign:o2&&o2.sag&&o2.sag.includes(j)?"right":"left",fontWeight:600,whiteSpace:"normal",...st},children:v},j)})},i))})]})});
  const bas=t=>e.jsx("div",{style:{fontWeight:900,fontSize:".85rem",background:"#FDF2F8",borderLeft:"4px solid "+P1,borderRadius:10,padding:".45rem .7rem",margin:"1rem 0 .35rem"},children:t});
  const ic=comps.length>1?1:0;
  return e.jsxs("div",{style:S.card,children:[e.jsxs("div",{style:{...S.h,marginBottom:".3rem"},children:[e.jsx("span",{style:S.hi,children:MI("gavel",{fontSize:17})}),L("Not Değişiklikleri ve İtirazlar","Score Changes and Inquiries")]}),
   logYuk?e.jsx("div",{style:{fontSize:".74rem",color:"#B45309",fontWeight:800},children:__T("İşlem kaydı yükleniyor…")}):null,
   bas(L("Özet","Summary")),tab(ozCols(),G0.ozet.map(ozRow),{sag:[1,2,3,4,5,6,7,8,9,10]}),e.jsx("div",{style:{height:8}}),tab(turCols(),G0.ozet.map(turRow),{sag:turCols().map((_,i)=>i).slice(1)}),
   bas(L("İtirazlar","Inquiries")+" ("+G0.it.length+")"),G0.it.length?tab(itCols(),G0.it.map(itRow),{st:(i,j)=>j===itCols().length-2?{fontWeight:900,color:G0.it[i].durum==="kabul"?"#15803D":G0.it[i].durum==="red"?"#B91C1C":"#64748B"}:null}):e.jsx("div",{style:{color:"#64748B",fontWeight:700},children:L("İtiraz kaydı yok.","No inquiries.")}),
   G0.kul.length?e.jsxs(e.Fragment,{children:[bas(L("İtiraz ücretleri — temsilci bazında","Inquiry fees — by NOC / club")),tab([...(ic?[L("Yarışma","Comp.")]:[]),L("Temsil","NOC / Club"),L("İtiraz","Inquiries"),L("Kabul","Accepted"),L("Red","Rejected"),L("Bekleyen","Pending"),L("Tahsil","Kept"),L("İade","Refunded")],G0.kul.map(k=>[...(ic?[k.C.isim]:[]),k.ad,k.n,k.kabul,k.red,k.bek,k.tahsil+" "+k.pb,k.iade+" "+k.pb]),{sag:[1,2,3,4,5,6].map(x=>x+ic)})]}):null,
   G0.tekrar.length?e.jsxs(e.Fragment,{children:[bas(L("Birden çok kaydedilen puanlar","Scores saved more than once")+" ("+G0.tekrar.length+")"),tab(tkCols(),G0.tekrar.slice(0,40).map(tkRow),{sag:[4,5,6,7,8].map(x=>x+ic),st:(i,j)=>{const t=G0.tekrar[i];return j===tkCols().length-2&&t.ilk!=null&&t.son!=null&&Math.abs(t.son-t.ilk)>1e-6?{color:"#B91C1C",fontWeight:900}:null}})]}):null,
   bas(L("Not değişiklikleri","Score changes")+" ("+G0.ev.length+")"+(G0.ev.length>150?" · "+L("ilk 150 gösteriliyor; tamamı PDF / Excel'de","first 150 shown; all in PDF / Excel"):"")),
   G0.ev.length?tab(evCols(),G0.ev.slice(0,150).map(evRow),{sag:[7,8,9].map(x=>x+ic),st:(i,j)=>j===ic+1?{color:DG_TUR[G0.ev[i].tur]?.[1],fontWeight:800}:null}):e.jsx("div",{style:{color:"#64748B",fontWeight:700},children:L("Seçili türlerde değişiklik yok.","No changes of the selected types.")})]})})()
  :rapor==="hakem"&&hakem?(()=>{const H0=hakem,tab=(cols,rows,opt2)=>e.jsx("div",{style:{overflowX:"auto"},children:e.jsxs("table",{style:{width:"100%",borderCollapse:"collapse"},children:[e.jsx("thead",{children:e.jsx("tr",{children:cols.map((c,i)=>thR(c,i===0||(opt2&&opt2.sol&&opt2.sol.includes(i))))})}),
   e.jsx("tbody",{children:rows.map((rw,i)=>e.jsx("tr",{style:{background:i%2?"#FAFAFD":"#fff"},children:rw.map((v,j)=>{const st=opt2&&opt2.st?opt2.st(i,j,v):null;return e.jsx("td",{style:{...S.td,textAlign:j===0||(opt2&&opt2.sol&&opt2.sol.includes(j))?"left":"right",fontWeight:j===0?800:600,...st},children:v},j)})},i))})]})});
  const bas=t=>e.jsx("div",{style:{fontWeight:900,fontSize:".85rem",background:"#FDF2F8",borderLeft:"4px solid "+P1,borderRadius:10,padding:".45rem .7rem",margin:"1rem 0 .35rem"},children:t});
  const hc=hkCols();
  return e.jsxs("div",{style:S.card,children:[e.jsxs("div",{style:{...S.h,marginBottom:".3rem"},children:[e.jsx("span",{style:S.hi,children:MI("balance",{fontSize:17})}),L("Hakem Sapma Analizi","Judge Deviation Analysis")]}),
   e.jsx("div",{style:{fontSize:".74rem",color:"#64748B",fontWeight:700},children:comps.map(c=>c.isim).join(" · ")+" · "+H0.rows.length+" "+__T("hakem notu")}),
   !H0.rows.length?e.jsx("div",{style:{color:"#64748B",fontWeight:700,marginTop:".8rem"},children:__T("Seçili yarışmalarda hakem notu bulunamadı.")}):e.jsxs(e.Fragment,{children:[
    bas(L("Panel özeti","Panel summary")),tab(panCols(),H0.pan.map(panRow)),
    bas(L("Hakem bazında","By judge")),
    H0.isimsiz?e.jsxs("div",{style:{fontSize:".74rem",fontWeight:700,color:"#B45309",background:"#FFFBEB",border:"1px solid #FDE68A",borderRadius:10,padding:".45rem .6rem",marginBottom:".4rem"},children:["⚠ ",H0.isimsiz+" "+__T("pozisyonda hakem adı atanmamış; bu satırlar yarışma · pozisyon olarak gösterilir. Hakemleri Paneller sayfasından ya da WG Hakem Karnesi › Hakem İsimleri'nden atayabilirsiniz.")]}):null,
    tab(hc,H0.hk.map(hkRow),{sol:[1,2,3],st:(i,j)=>{const h=H0.hk[i];if(j===hc.length-2){const g=GRENK[h.grade];return g?{color:g[0],background:g[1],fontWeight:900}:null}if(j===hc.length-5&&h.dis/h.n>.25)return{color:"#B91C1C",fontWeight:900};if(j===hc.length-1&&h.leh&&h.leh.fark>.1)return{color:"#B91C1C",fontWeight:900};return null}}),
    H0.dOz.length?e.jsxs(e.Fragment,{children:[bas(L("D paneli hakem farkları","D panel judge differences")+" (DA1–DA2 · DB1–DB2)"),
     tab([L("Panel","Panel"),L("Karşılaştırma","Pairs"),L("Ort. fark","Mean diff."),L("Eşiği aşan","Over threshold"),L("En büyük","Max")],H0.dOz.map(o=>[PAD(o.P),o.n,f2(o.ort),o.n?o.asti+" ("+Math.round(o.asti/o.n*100)+"%)":"0",f2(o.mx)])),
     H0.dfark.some(x=>x.asti)?tab(dCols(),H0.dfark.filter(x=>x.asti).slice(0,15).map(dRow),{sol:[0,1,2,3,4]}):null]}):null,
    bas(L("En büyük sapmalar","Largest deviations")),tab(bCols(),H0.buyuk.slice(0,15).map(bRow),{sol:[0,1,2,3,4,5],st:(i,j)=>H0.buyuk[i].dis&&j===bCols().length-2?{color:"#B91C1C",fontWeight:900}:null})]})]})})()
  :e.jsxs("div",{style:S.card,children:[e.jsxs("div",{style:{...S.h,marginBottom:".3rem"},children:[e.jsx("span",{style:S.hi,children:MI("military_tech",{fontSize:17})}),L("Madalya Tablosu","Medal Table")]}),
   e.jsx("div",{style:{fontSize:".74rem",color:"#64748B",fontWeight:700,marginBottom:".7rem"},children:comps.map(c=>c.isim).join(" · ")}),
   !madalya.length?e.jsx("div",{style:{color:"#64748B",fontWeight:700},children:__T("Seçili kapsamda madalya yok.")}):
   e.jsxs("table",{style:{width:"100%",borderCollapse:"collapse"},children:[e.jsx("thead",{children:e.jsxs("tr",{children:[thR(L("Sıra","Rank"),1),thR(grup==="ulke"?L("Ülke","NOC"):grup==="il"?L("İl","Province"):L("Kulüp","Club"),1),thR("🥇"),thR("🥈"),thR("🥉"),thR(L("Toplam","Total")),...(comps.length>1?[thR(L("Yarışma","Comp."))]:[])]})}),
    e.jsx("tbody",{children:madalya.map((r,i)=>e.jsxs("tr",{style:{background:i%2?"#FAFAFD":"#fff"},children:[e.jsx("td",{style:{...S.td,textAlign:"left",fontWeight:900,width:44},children:r.rank}),
     e.jsx("td",{style:{...S.td,textAlign:"left",fontWeight:800},children:grup==="ulke"?r.ad+"  "+(ulkeAd(r.ad,EN?"en":"tr")||""):r.ad}),
     e.jsx("td",{style:{...S.td,color:"#B45309",fontWeight:900},children:r.altin}),e.jsx("td",{style:{...S.td,color:"#64748B",fontWeight:900},children:r.gumus}),e.jsx("td",{style:{...S.td,color:"#C2410C",fontWeight:900},children:r.bronz}),
     e.jsx("td",{style:{...S.td,fontWeight:900},children:r.toplam}),...(comps.length>1?[e.jsx("td",{style:S.td,children:r.yar},"y")]:[])]},i))})]}),
   (madalya.olay||[]).length?e.jsxs("div",{style:{marginTop:"1rem"},children:[e.jsx("div",{style:{fontWeight:900,fontSize:".85rem",background:"#FDF2F8",borderLeft:"4px solid "+P1,borderRadius:10,padding:".45rem .7rem",marginBottom:".35rem"},children:L("Madalya kazananlar","Medallists")}),
    madalya.olay.map((o,oi)=>e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"minmax(0,1.3fr) repeat(3,minmax(0,1fr))",gap:".5rem",padding:".4rem .2rem",borderBottom:"1px solid #F1F5F9",fontSize:".78rem"},children:[
     e.jsx("b",{children:(comps.length>1?o.C.isim+" · ":"")+bolBaslik(o.b)}),...[1,2,3].map(n=>e.jsx("span",{style:{color:madalyaRenk(n),fontWeight:700},children:o.m.filter(r=>r.rank===n).map(r=>(n===1?"🥇 ":n===2?"🥈 ":"🥉 ")+(r.takim?r.ad:satirAd(r))+(isIntl(o.C)&&r.ulke&&r.ulke!==r.ad?" ("+r.ulke+")":"")).join(", ")||"—"},n))]},oi))]}):null]});

 return e.jsxs("div",{style:S.wrap,children:[e.jsx("style",{children:"@media(max-width:900px){.rp-in{grid-template-columns:1fr!important}}"}),
  e.jsxs("div",{style:S.top,children:[e.jsx("button",{type:"button",title:__T("Geri"),style:S.back,onClick:()=>{window.history.length>1?history.back():location.assign(RP)},children:MI("arrow_back",{fontSize:20})}),
   e.jsx("div",{style:S.ico,children:MI("summarize",{color:"#fff",fontSize:22})}),
   e.jsxs("div",{style:{flex:1,minWidth:0},children:[e.jsx("div",{style:{fontWeight:900,fontSize:"1.1rem",lineHeight:1.15},children:__T("Raporlar")}),
    e.jsx("div",{style:{fontSize:".78rem",color:"#64748B",fontWeight:700},children:__T(BRAD)+" · "+__T("yarışma seçin, raporu oluşturun, PDF / Excel indirin")})]})]}),
  e.jsxs("div",{className:"rp-in",style:S.in,children:[sol,e.jsxs("div",{style:{minWidth:0},children:[katalog,secenek,yuk?e.jsx("div",{style:{...S.card,color:"#64748B",fontWeight:700},children:__T("Yükleniyor…")}):onizleme]})]})]})}
export{Raporlar as default};
