import"./i18n-Tr01a2b3Cb2.js";import{u as useAuth,a as usDisc,j as e,d as db,b as usToast,l as logAction}from"./main-C2LpyYUGCb2.js";import{u as useNav,r as R}from"./vendor-react-Cxw6bqwhCb2.js";import{k as ref,o as onValue,m as update}from"./vendor-firebase-940mxgRVCb2.js";import{f as filterComps}from"./useFilteredCompetitions-B7FB6qIvCb2.js";import{GXP_CSS}from"./ArtistikNotSilmePage-Ns01a2b3Cb2.js";import{raImg,raAd}from"./ritmikAlet-Ra01a2b3Cb2.js";import{bayrakUrl}from"./intl-Ul01a2b3Cb2.js";import"./modulepreload-polyfill-B5Qt9EMXCb2.js";

// RİTMİK — SPORCU ALETLERİ: her sporcunun hangi aletlerle, hangi sırayla (1. alet, 2. alet…) yarışacağı.
//  GÜN MODU (çıkış listesinde kategori tek aletli bloklarla varsa): her gün için alet seçimi; ekle → o günün o alet rotasyonunun sonu (yoksa yeni rotasyon), çıkar/taşı → satır silinir.
//  ritmik_yarismalar/<yarışma>/sporcular/<kat>/<sporcu>/aletler = ["cember","top",…]  (sıra = seçilen sıra)
//  Puanlama: başhakem sporcuyu seçince/çağırınca yalnız bu aletler bu sırayla görünür, ilk puanlanmamış alet açılır.
//  "Çıkış listesine uygula": cikisListesi tek aletli bloklarda çıkarılan aletin satırı silinir, eklenen alet o aletin son bloğunun sonuna eklenir;
//  ardından siralama/<kat> Program sayfasındaki "Puanlamaya aktar" ile aynı biçimde yeniden üretilir (rotasyon = blok).
//  Puanı girilmiş alet kaldırılamaz / yeri değiştirilemez (kilitli). Grup kategorileri (seriler) bu ekranda yok.
const __EN=()=>typeof document!=="undefined"&&document.documentElement.lang==="en";
const ALL={serbest:"Serbest",ip:"İp",cember:"Çember",top:"Top",labut:"Labut",kurdele:"Kurdele"};
const arr=v=>Array.isArray(v)?v:Object.values(v||{});
const CSS=GXP_CSS+`
.sa-bar{display:flex;gap:10px;flex-wrap:wrap;align-items:center;margin-bottom:12px}
.sa-in{padding:9px 12px;border:1px solid #E5E7EB;border-radius:12px;font:inherit;font-weight:700;font-size:.88rem;background:#fff;min-width:0}
.sa-in:focus{outline:2px solid var(--gxp-c);outline-offset:1px}
.sa-kats{display:flex;gap:6px;flex-wrap:wrap}.sa-kats button{border:1.5px solid #E5E7EB;background:#fff;border-radius:999px;padding:7px 14px;font:inherit;font-weight:800;font-size:.84rem;color:#334155;cursor:pointer}.sa-kats button.on{background:var(--gxp-c);border-color:var(--gxp-c);color:#fff}
.sa-sum{display:flex;gap:8px;flex-wrap:wrap;margin:4px 0 14px}.sa-sum span{display:inline-flex;align-items:center;gap:6px;background:#F8FAFC;border:1px solid #EEF0F4;border-radius:10px;padding:5px 10px;font-weight:800;font-size:.8rem;color:#334155}.sa-sum img{width:20px;height:20px;object-fit:contain}
.sa-tw{overflow:auto;border:1px solid #EEF0F4;border-radius:14px}
.sa-t{width:100%;border-collapse:collapse;font-size:.88rem}
.sa-t th{position:sticky;top:0;background:#F8FAFC;z-index:1;text-align:left;font-size:.72rem;font-weight:900;color:#64748B;letter-spacing:.05em;text-transform:uppercase;padding:9px 10px;border-bottom:1px solid #EEF0F4;white-space:nowrap}
.sa-t td{padding:7px 10px;border-bottom:1px solid #F1F5F9;vertical-align:middle}
.sa-t tr.ch td{background:color-mix(in srgb,var(--gxp-c) 6%,#fff)}
.sa-nm b{display:block;font-weight:800;white-space:nowrap}.sa-nm span{display:inline-flex;align-items:center;gap:5px;font-size:.76rem;font-weight:700;color:#64748B}.sa-nm img{width:18px;height:13px;object-fit:cover;border-radius:2px;box-shadow:0 0 0 1px rgba(0,0,0,.12)}
.sa-sl{display:flex;align-items:center;gap:6px;border:1.5px solid #E5E7EB;border-radius:10px;padding:3px 6px 3px 4px;background:#fff;min-width:128px}
.sa-sl.dolu{border-color:color-mix(in srgb,var(--gxp-c) 45%,#E5E7EB)}.sa-sl.kilit{background:#F1F5F9}
.sa-sl img{width:24px;height:24px;object-fit:contain;flex-shrink:0}.sa-sl i{font-size:16px;color:#94A3B8}
.sa-sl select{border:none;background:transparent;font:inherit;font-weight:800;font-size:.84rem;color:#1E293B;cursor:pointer;flex:1;min-width:0;padding:4px 0}
.sa-sl select:disabled{cursor:not-allowed;color:#64748B}
.sa-mini{border:1px solid #E5E7EB;background:#fff;border-radius:9px;padding:5px 8px;font:inherit;font-weight:800;font-size:.74rem;color:#475569;cursor:pointer;display:inline-flex;align-items:center;gap:3px}.sa-mini i{font-size:15px}
.sa-foot{position:sticky;bottom:0;margin-top:14px;background:#fff;border:1px solid #EEF0F4;border-radius:14px;padding:12px 14px;display:flex;align-items:center;gap:12px;flex-wrap:wrap;box-shadow:0 -6px 20px -12px rgba(15,23,42,.25)}
.sa-foot label{display:inline-flex;align-items:center;gap:7px;font-weight:800;font-size:.84rem;color:#334155;cursor:pointer}
.sa-btn{display:inline-flex;align-items:center;gap:6px;border:none;border-radius:12px;padding:10px 16px;font:inherit;font-weight:800;font-size:.88rem;cursor:pointer;background:var(--gxp-c);color:#fff}.sa-btn.g{background:#fff;color:#475569;border:1px solid #E5E7EB}.sa-btn:disabled{opacity:.45;cursor:default}.sa-btn i{font-size:18px}
.sa-note{font-size:.8rem;font-weight:600;color:#64748B;line-height:1.5;margin:6px 0 0}
.sa-gc{display:flex;gap:4px;flex-wrap:wrap;min-width:220px}.sa-ch{display:inline-flex;align-items:center;gap:4px;border:1.5px solid #E5E7EB;background:#fff;border-radius:10px;padding:3px 8px 3px 4px;font:inherit;font-size:.74rem;font-weight:800;color:#94A3B8;cursor:pointer}.sa-ch img{width:20px;height:20px;object-fit:contain;opacity:.45}.sa-ch i{font-size:16px}.sa-ch.on{border-color:var(--gxp-c);background:color-mix(in srgb,var(--gxp-c) 10%,#fff);color:#1E293B}.sa-ch.on img{opacity:1}.sa-ch b{background:var(--gxp-c);color:#fff;border-radius:999px;font-size:.66rem;padding:0 5px}.sa-ch.bs{opacity:.45;text-decoration:line-through}.sa-ch.yk:not(.on){border-style:dashed}.sa-ch.kl{cursor:not-allowed}
.sa-sum b{margin-right:4px}
.sa-vw{display:inline-flex;gap:4px;background:#F1F5F9;border-radius:12px;padding:3px;margin:0 0 12px}.sa-vw button{display:inline-flex;align-items:center;gap:6px;border:none;background:transparent;border-radius:9px;padding:8px 14px;font:inherit;font-weight:800;font-size:.84rem;color:#475569;cursor:pointer}.sa-vw button i{font-size:18px}.sa-vw button.on{background:#fff;color:var(--gxp-c);box-shadow:0 1px 3px rgba(0,0,0,.1)}
.sa-dnd{display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:14px;align-items:start}.sa-gun-h{font-weight:900;font-size:.82rem;letter-spacing:.06em;text-transform:uppercase;color:var(--gxp-c);margin:0 0 8px}
.sa-rot{border:1.5px solid #E5E7EB;border-radius:14px;background:#fff;margin-bottom:10px;overflow:hidden;transition:border-color .15s,box-shadow .15s}.sa-rot.uz{border-color:var(--gxp-c);box-shadow:0 0 0 3px color-mix(in srgb,var(--gxp-c) 18%,transparent)}.sa-rot.drg{opacity:.5}
.sa-rot-h{display:flex;align-items:center;gap:8px;padding:8px 10px;background:#F8FAFC;border-bottom:1px solid #EEF0F4;cursor:grab}.sa-rot-h img{width:24px;height:24px;object-fit:contain}.sa-rot-h b{font-size:.86rem;font-weight:900}.sa-rot-h small{color:#64748B;font-weight:800}.sa-rot-h .n{margin-left:auto;background:var(--gxp-c);color:#fff;border-radius:999px;font-size:.7rem;font-weight:900;padding:1px 8px}.sa-rot-h .dh{color:#94A3B8}
.sa-rot ol{list-style:none;margin:0;padding:4px}.sa-rot li{display:flex;align-items:center;gap:8px;padding:6px 8px;border-radius:10px;cursor:grab;font-size:.84rem}.sa-rot li:hover{background:#F8FAFC}.sa-rot li.drg{opacity:.4}.sa-rot li .no{width:22px;text-align:right;color:#94A3B8;font-weight:900}.sa-rot li img{width:18px;height:13px;object-fit:cover;border-radius:2px}.sa-rot li b{font-weight:800;white-space:nowrap}.sa-rot li small{color:#64748B;font-weight:700;flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.sa-ok{border:none;background:transparent;color:#94A3B8;cursor:pointer;padding:0;display:grid;place-items:center;width:24px;height:24px;border-radius:6px}.sa-ok:hover:not(:disabled){background:#EEF2F7;color:#334155}.sa-ok:disabled{opacity:.25;cursor:default}.sa-ok i{font-size:18px}
.sa-sl[draggable=true]{cursor:grab}.sa-sl.drg{opacity:.4}
.sa-gun-h{display:flex;align-items:baseline;gap:8px}.sa-gun-h span{margin-left:auto;font-size:.72rem;color:#64748B;letter-spacing:0}.sa-gun{border-radius:14px;padding:2px}.sa-gun.uz{outline:2px dashed var(--gxp-c);outline-offset:2px}
.sa-akis{list-style:none;margin:0 0 8px;padding:4px;border:1.5px solid #E5E7EB;border-radius:14px;background:#fff}.sa-akis li{display:flex;align-items:center;gap:7px;padding:5px 6px;border-radius:10px;cursor:grab;font-size:.84rem;border-top:2px solid transparent}.sa-akis li:hover{background:#F8FAFC}.sa-akis li.uz{border-top-color:var(--gxp-c)}.sa-akis li.drg{opacity:.4}.sa-akis li .dh{color:#CBD5E1;font-size:18px}.sa-akis li .no{width:22px;text-align:right;color:#94A3B8;font-weight:900}.sa-akis li .tm{font-size:.72rem;color:#94A3B8;font-weight:800;font-variant-numeric:tabular-nums}.sa-akis li>img{width:18px;height:13px;object-fit:cover;border-radius:2px}.sa-akis .nm{flex:1;min-width:0;display:flex;flex-direction:column}.sa-akis .nm b{font-weight:800;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.sa-akis .nm small{color:#64748B;font-weight:700;font-size:.72rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.sa-akis .lk{font-size:16px;color:#94A3B8}
.sa-al{display:inline-flex;align-items:center;gap:4px;border:1.5px solid color-mix(in srgb,var(--gxp-c) 40%,#E5E7EB);border-radius:10px;padding:2px 4px 2px 3px;background:color-mix(in srgb,var(--gxp-c) 6%,#fff)}.sa-al img{width:22px;height:22px;object-fit:contain}.sa-al select{border:none;background:transparent;font:inherit;font-weight:800;font-size:.8rem;cursor:pointer;max-width:120px}.sa-al.kl{opacity:.7}
.sa-ekle{display:flex;gap:6px;flex-wrap:wrap}.sa-ekle .sa-in{flex:1 1 140px;padding:7px 10px;font-size:.8rem}
.sa-warn{background:#FFFBEB;border:1px solid #FDE68A;color:#92400E;border-radius:12px;padding:9px 12px;font-size:.82rem;font-weight:700;margin-bottom:12px}`;

// ÇIKIŞ SIRASI — AKIŞ: her gün TEK sıralı liste; her adım = sporcu + alet (ör. 1 Iva·Top, 2 Petra·Çember…). Başhakem sırayla çağırdıkça adımın aleti açılır.
// Kayıt: o günün bu kategoriye ait blokları tek blokta birleşir {tip:"grup",kat,saat,aletler:[ilk adım aleti],rows:[{k,r:[{a,al}]}]} — satır başına alet serbest.
// siralama/<kat>: gün başına bir rotasyon (sporcu ilk göründüğü sırayla); _alet yalnız o gündeki tüm adımlar aynı aletse. Sporcu aletler[] = adım sırası.
function CikisSira({C,comp,kat,FB,usr,toast,renk}){
 const cl=C?.cikisListesi,spor=C?.sporcular?.[kat]||{},puan=C?.puanlar?.[kat]||{},en=__EN(),kd=C?.kategoriler?.[kat]||{};
 const AL=(Array.isArray(kd.aletler)?kd.aletler:kd.aletler&&typeof kd.aletler==="object"?Object.keys(kd.aletler):[]).map(z=>typeof z==="object"?z.id||z.value:z).filter(Boolean);
 const ilk=()=>arr(cl?.gunler).map((g,gi)=>{const bl=arr(g?.bloklar).filter(b=>b&&b.tip==="grup"&&b.kat===kat);if(!bl.length)return null;const ad=[];bl.forEach(b=>{const k=arr(b.aletler).length||1;for(let ri=0;ri<k;ri++)arr(b.rows).forEach(r=>{const x=arr(r?.r)[ri];x&&x.a&&ad.push({a:x.a,al:x.al||arr(b.aletler)[ri],k:r.k||""})})});return{gi,t:g?.tarih||"",saat:bl[0].saat||"",ad}}).filter(Boolean);
 const[gd,setGd]=R.useState(null),[drag,setDrag]=R.useState(null),[ust,setUst]=R.useState(null),[busy,setBusy]=R.useState(!1),[ekle,setEkle]=R.useState({});
 R.useEffect(()=>{setGd(null);setDrag(null)},[comp,kat]);
 const G=gd||ilk(),kirli=!!gd;
 const deg=f=>{const n=JSON.parse(JSON.stringify(G));f(n);setGd(n)};
 const nm=al=>raAd?raAd(al,en):ALL[al]||al;
 const ad=a=>[a?.ad,a?.soyad].filter(Boolean).join(" ")||a?.adSoyad||"";
 const puanli=(id,al)=>{const x=puan?.[id]?.[al];return!!(x&&typeof x==="object"&&(x.durum==="tamamlandi"||x.kilitli===!0||x.sonuc!=null||x.irm))};
 const varMi=(n,a,al,haric)=>n.some(d=>d.ad.some((x,i)=>x.a===a&&x.al===al&&!(haric&&haric.gi===d.gi&&haric.i===i)));
 const tasi=(src,dst)=>deg(n=>{const sd=n.find(x=>x.gi===src.gi),dd=n.find(x=>x.gi===dst.gi);if(!sd||!dd)return;const[m]=sd.ad.splice(src.i,1);if(!m)return;let to=dst.i==null?dd.ad.length:dst.i;if(sd===dd&&src.i<to)to--;dd.ad.splice(Math.max(0,Math.min(to,dd.ad.length)),0,m)});
 const aletDeg=(gi,i,al)=>{const x=G.find(d=>d.gi===gi)?.ad[i];if(!x||x.al===al)return;if(puanli(x.a,x.al)){toast(__T("Puanı girilmiş adımın aleti değiştirilemez."),"error");return}if(varMi(G,x.a,al,{gi,i})){toast(__T("Bu sporcu bu aletle zaten listede."),"warning");return}deg(n=>{n.find(d=>d.gi===gi).ad[i].al=al})};
 const sil=(gi,i)=>{const x=G.find(d=>d.gi===gi)?.ad[i];if(!x)return;if(puanli(x.a,x.al)){toast(__T("Puanı girilmiş adım silinemez."),"error");return}deg(n=>{n.find(d=>d.gi===gi).ad.splice(i,1)})};
 const ekleAdim=gi=>{const f=ekle[gi]||{};if(!f.a||!f.al){toast(__T("Sporcu ve alet seçin."),"warning");return}if(varMi(G,f.a,f.al)){toast(__T("Bu sporcu bu aletle zaten listede."),"warning");return}const a=spor[f.a]||{};deg(n=>{n.find(d=>d.gi===gi).ad.push({a:f.a,al:f.al,k:a.okul||a.kulup||a.ulke||""})});setEkle(o=>({...o,[gi]:{a:f.a}}))};
 const saatT=(s0,i)=>{const m=/^(\d{1,2}):(\d{2})/.exec(s0||"");if(!m)return"";const t=+m[1]*60+ +m[2]+i*3;return String(Math.floor(t/60)%24).padStart(2,"0")+":"+String(t%60).padStart(2,"0")};
 const kaydet=async()=>{if(!gd||busy)return;if(!await window.__gxConfirm(__T("Çıkış sırası kaydedilsin mi? Çıkış listesi, puanlama sırası ve hakem ekranları anında güncellenir.")))return;
  const plan={...JSON.parse(JSON.stringify(cl||{})),gunler:arr(cl?.gunler).map(g=>({...g,bloklar:arr(g?.bloklar).map(b=>b?{...b,aletler:arr(b.aletler),rows:arr(b.rows).map(r=>({...r,r:arr(r?.r)}))}:b)}))};
  G.forEach(d=>{const P=plan.gunler[d.gi];if(!P)return;const idx=P.bloklar.map((b,i)=>b&&b.tip==="grup"&&b.kat===kat?i:-1).filter(i=>i>=0);if(!idx.length)return;const ilkB=P.bloklar[idx[0]];
   const yeni=d.ad.length?{...ilkB,aletler:[d.ad[0].al],rows:d.ad.map(x=>({k:x.k||"",r:[{a:x.a,al:x.al}]}))}:null;
   P.bloklar=P.bloklar.map((b,i)=>i===idx[0]?yeni:idx.includes(i)?null:b).filter(Boolean)});
  const U={},B=`${FB}/${comp}`;U[`${B}/cikisListesi`]={...plan,ts:Date.now()};
  const kb=[];plan.gunler.forEach(g=>arr(g.bloklar).forEach(b=>{b&&b.tip==="grup"&&b.kat===kat&&kb.push(b)}));
  const alOf={};kb.forEach(b=>b.rows.forEach(r=>{const x=r.r[0];if(!x||!x.a)return;const L=alOf[x.a]||(alOf[x.a]=[]);L.includes(x.al)||L.push(x.al)}));
  const sira={};let say=0;kb.forEach((b,gi)=>{const goren=new Set,lst=[];b.rows.forEach(r=>{const x=r.r[0]&&r.r[0].a;x&&!goren.has(x)&&(goren.add(x),lst.push(x))});const tek=new Set(b.rows.map(r=>r.r[0]&&r.r[0].al)).size===1;const rot={};
   lst.forEach((id,i)=>{const a=spor[id];if(!a)return;say++;const al=alOf[id]||[];rot[id]={sirasi:i+1,ad:a.ad||"",soyad:a.soyad||"",tckn:a.tckn||"",okul:a.okul||a.kulup||"",yarismaTuru:a.yarismaTuru||"ferdi",...(a.grupNo!=null?{grupNo:a.grupNo}:{}),
    ...(tek?{_alet:b.rows[0].r[0].al}:{}),...(al.length?{aletler:al}:{}),...(a.ulke?{ulke:a.ulke}:{}),...(a.bib!=null&&a.bib!==""?{bib:a.bib}:{}),...(a.kulup?{kulup:a.kulup}:{}),...(a.il?{il:a.il}:{})};
    U[`${B}/sporcular/${kat}/${id}/sirasi`]=i+1;U[`${B}/sporcular/${kat}/${id}/cikisSirasi`]=say;U[`${B}/sporcular/${kat}/${id}/rotasyonGrubu`]=gi+1});sira["rotation_"+gi]=rot});
  U[`${B}/siralama/${kat}`]=sira;Object.entries(alOf).forEach(([id,al])=>{spor[id]&&(U[`${B}/sporcular/${kat}/${id}/aletler`]=al)});
  setBusy(!0);try{await update(ref(db),U);try{logAction("start_order_save",`[Ritmik] Çıkış akışı güncellendi (${kd.name||kat}): `+G.map(d=>"G"+(d.gi+1)+" "+d.ad.length+" adım").join(", "),{user:usr,competitionId:comp,discipline:"ritmik",category:kat,data:{gunler:G.map(d=>({tarih:d.t,adim:d.ad.map(x=>x.a+":"+x.al)}))}})}catch{}
   toast(__T("Çıkış sırası kaydedildi ✓"),"success");setGd(null)}catch(er){toast(__T("Kaydedilemedi: ")+(er?.message||er),"error")}setBusy(!1)};
 const ok=(dis,ic,f,t)=>e.jsx("button",{type:"button",className:"sa-ok",disabled:dis,title:t,onClick:ev=>{ev.stopPropagation();f()},children:e.jsx("i",{className:"material-icons-round",children:ic})});
 const sporL=Object.keys(spor).filter(id=>spor[id]&&typeof spor[id]==="object").sort((x,y)=>ad(spor[x]).localeCompare(ad(spor[y]),"tr"));
 return e.jsxs("div",{children:[
  e.jsx("p",{className:"sa-note",style:{marginTop:0},children:__T("Her gün tek sıralı çağrı listesi: her satır bir sporcu + alet. Satırları sürükleyip bırakın (tablette oklar), aleti satırdan değiştirin. Başhakem sırayla çağırdıkça o satırın aleti açılır ve hakem ekranlarına gider.")}),
  e.jsx("div",{className:"sa-dnd",children:G.map(d=>e.jsxs("div",{className:"sa-gun"+(ust&&ust.gi===d.gi&&ust.son?" uz":""),onDragOver:ev=>{if(drag){ev.preventDefault();setUst({gi:d.gi,son:!0})}},onDrop:ev=>{ev.preventDefault();drag&&tasi(drag,{gi:d.gi,i:null});setDrag(null);setUst(null)},children:[
   e.jsxs("div",{className:"sa-gun-h",children:[__T("Gün")+" "+(d.gi+1)+(/^\d{4}-/.test(d.t)?" · "+d.t.split("-").reverse().join("."):""),e.jsx("span",{children:d.ad.length+" "+__T("çıkış")+(d.saat?" · "+d.saat:"")})]}),
   e.jsx("ol",{className:"sa-akis",children:d.ad.map((x,i)=>{const a=spor[x.a]||{},fu=a.ulke&&bayrakUrl(a.ulke),kl=puanli(x.a,x.al),dr=drag&&drag.gi===d.gi&&drag.i===i,uz=ust&&ust.gi===d.gi&&ust.i===i;
    return e.jsxs("li",{draggable:!0,className:(dr?"drg":"")+(uz?" uz":"")+(kl?" kl":""),onDragStart:ev=>{ev.stopPropagation();setDrag({gi:d.gi,i});ev.dataTransfer.effectAllowed="move";try{ev.dataTransfer.setData("text/plain","a")}catch{}},
     onDragOver:ev=>{if(drag){ev.preventDefault();ev.stopPropagation();setUst({gi:d.gi,i})}},onDrop:ev=>{ev.preventDefault();ev.stopPropagation();drag&&tasi(drag,{gi:d.gi,i});setDrag(null);setUst(null)},onDragEnd:()=>{setDrag(null);setUst(null)},children:[
     e.jsx("i",{className:"material-icons-round dh",children:"drag_indicator"}),e.jsx("span",{className:"no",children:i+1}),d.saat?e.jsx("span",{className:"tm",children:saatT(d.saat,i)}):null,
     fu?e.jsx("img",{src:fu,alt:""}):null,e.jsxs("span",{className:"nm",children:[e.jsx("b",{children:ad(a)||x.a}),e.jsx("small",{children:a.okul||a.kulup||x.k||""})]}),
     e.jsxs("label",{className:"sa-al"+(kl?" kl":""),title:kl?__T("puanlı, değiştirilemez"):"",children:[raImg(x.al)?e.jsx("img",{src:raImg(x.al),alt:""}):e.jsx("i",{className:"material-icons-round",children:"accessibility_new"}),
      e.jsx("select",{value:x.al,disabled:kl,onChange:ev=>aletDeg(d.gi,i,ev.target.value),children:AL.map(k=>e.jsx("option",{value:k,children:nm(k)},k))})]}),
     kl?e.jsx("i",{className:"material-icons-round lk",title:__T("puanlı"),children:"lock"}):null,
     ok(i===0,"keyboard_arrow_up",()=>tasi({gi:d.gi,i},{gi:d.gi,i:i-1}),__T("Yukarı")),ok(i===d.ad.length-1,"keyboard_arrow_down",()=>tasi({gi:d.gi,i},{gi:d.gi,i:i+2}),__T("Aşağı")),ok(kl,"close",()=>sil(d.gi,i),__T("Sil"))]},x.a+"|"+x.al+"|"+i)})}),
   e.jsxs("div",{className:"sa-ekle",children:[e.jsxs("select",{className:"sa-in",value:(ekle[d.gi]||{}).a||"",onChange:ev=>setEkle(o=>({...o,[d.gi]:{...(o[d.gi]||{}),a:ev.target.value}})),children:[e.jsx("option",{value:"",children:__T("+ Sporcu")}),sporL.map(id=>e.jsx("option",{value:id,children:ad(spor[id])+(spor[id].ulke?" ("+spor[id].ulke+")":"")},id))]}),
    e.jsxs("select",{className:"sa-in",value:(ekle[d.gi]||{}).al||"",onChange:ev=>setEkle(o=>({...o,[d.gi]:{...(o[d.gi]||{}),al:ev.target.value}})),children:[e.jsx("option",{value:"",children:__T("Alet")}),AL.map(k=>e.jsx("option",{value:k,children:nm(k)},k))]}),
    e.jsxs("button",{type:"button",className:"sa-btn",style:{padding:"8px 12px"},onClick:()=>ekleAdim(d.gi),children:[e.jsx("i",{className:"material-icons-round",children:"add"}),__T("Ekle")]})]})]},d.gi))}),
  e.jsxs("div",{className:"sa-foot",children:[e.jsx("span",{className:"sa-note",style:{margin:0,fontWeight:800},children:__T("Kaydedince çıkış listesine, puanlama sırasına ve hakem ekranlarına anında yansır.")}),
   e.jsx("span",{style:{marginLeft:"auto",fontWeight:800,color:kirli?"#B45309":"#94A3B8",fontSize:".85rem"},children:kirli?__T("Kaydedilmemiş değişiklik var"):__T("Değişiklik yok.")}),
   e.jsx("button",{type:"button",className:"sa-btn g",disabled:!kirli||busy,onClick:()=>setGd(null),children:__T("Geri al")}),
   e.jsxs("button",{type:"button",className:"sa-btn",disabled:!kirli||busy,onClick:kaydet,children:[e.jsx("i",{className:"material-icons-round",children:"save"}),busy?__T("Kaydediliyor…"):__T("Kaydet")]})]})]})}

export default function RitmikSporcuAletPage(){
 const nav=useNav(),{currentUser:user}=useAuth(),{firebasePath:FB,routePrefix:RP}=usDisc(),{toast}=usToast(),renk="#DB2777";
 const[comps,setComps]=R.useState(null),[comp,setComp]=R.useState(""),[kat,setKat]=R.useState(""),[tas,setTas]=R.useState({}),[ara,setAra]=R.useState(""),[ulkeF,setUlkeF]=R.useState(""),[uygula,setUygula]=R.useState(!0),[busy,setBusy]=R.useState(!1),[tg,setTg]=R.useState({}),[gor2,setGor2]=R.useState("alet"),[slDrag,setSlDrag]=R.useState(null);
 R.useEffect(()=>onValue(ref(db,FB),s=>setComps(filterComps(s.val()||{},user)||{})),[FB,user]);
 const list=R.useMemo(()=>Object.entries(comps||{}).filter(([,c])=>c&&typeof c==="object"&&c.arsivli!==!0&&c.arsivli!=="true").map(([k,c])=>({k,ad:c.isim||k,t:c.baslangicTarihi||""})).sort((a,b)=>String(b.t).localeCompare(String(a.t))),[comps]);
 R.useEffect(()=>{if(!comp&&list.length===1)setComp(list[0].k)},[list,comp]);
 const C=comp?comps?.[comp]:null,kats=C?.kategoriler||{};
 const grp=k=>{const c=kats[k]||{};return c.grupMu===!0||c.tip==="takim"||Number(c.athleteCount)>1};
 const katL=Object.keys(kats).filter(k=>!grp(k)).sort((a,b)=>(/^final_/.test(a)-/^final_/.test(b))||String(kats[a]?.name||a).localeCompare(String(kats[b]?.name||b),"tr"));
 R.useEffect(()=>{setTas({});setTg({});if(!kat||!kats[kat])setKat(katL[0]||"")},[comp]);// eslint-disable-line
 R.useEffect(()=>{setTas({});setTg({})},[kat]);
 const katAlet=k=>{const a=kats[k]?.aletler;return(Array.isArray(a)?a:a&&typeof a==="object"?Object.keys(a):[]).map(z=>typeof z==="object"?z.id||z.value:z).filter(Boolean)};
 const AL=kat?katAlet(kat):[],spor=C?.sporcular?.[kat]||{},puan=C?.puanlar?.[kat]||{};
 const cl=C?.cikisListesi,bloklar=R.useMemo(()=>{const o=[];arr(cl?.gunler).forEach(g=>arr(g?.bloklar).forEach(b=>{b&&b.tip==="grup"&&b.kat===kat&&o.push(b)}));return o},[cl,kat]);
 const tekAletli=bloklar.length>0&&bloklar.every(b=>arr(b.aletler).length===1);
 // GÜN MODU: çıkış listesinde bu kategorinin tek aletli blokları varsa sporcunun aletleri gün gün yönetilir (gün içi sıra = o günün rotasyon sırası)
 const gunList=R.useMemo(()=>arr(cl?.gunler).map((g,gi)=>({t:g?.tarih||"g"+gi,gi,n:gi+1,bl:arr(g?.bloklar).filter(b=>b&&b.tip==="grup"&&b.kat===kat)})).filter(g=>g.bl.length),[cl,kat]);
 const gunMod=tekAletli&&gunList.length>0;
 const gunSira=(t,al)=>{const g=gunList.find(x=>x.t===t);if(!g)return 999;const L=[];g.bl.forEach(b=>arr(b.rows).forEach(r=>{const x=arr(r?.r)[0];x&&x.al&&L.push(x.al)}));const i=L.indexOf(al);return i<0?999:i};
 const kayitliG=id=>{const o={};gunList.forEach(g=>{const s=[];g.bl.forEach(b=>arr(b.rows).forEach(r=>{const x=arr(r?.r)[0];x&&x.a===id&&x.al&&!s.includes(x.al)&&s.push(x.al)}));o[g.t]=s});return o};
 const simdiG=id=>tg[id]||kayitliG(id);
 const duz=m=>gunList.flatMap(g=>(m&&m[g.t])||[]);
 const gunEt=g=>__T("Gün")+" "+g.n+(/^\d{4}-/.test(g.t)?" · "+g.t.split("-").reverse().slice(0,2).join("."):"");
 // sporcunun kayıtlı aletleri: kayıttaki aletler[] → çıkış listesindeki sırası → kategorinin tüm aletleri
 const kayitli=id=>{const a=spor[id]||{};if(Array.isArray(a.aletler)&&a.aletler.length)return a.aletler.filter(x=>AL.includes(x));
  if(bloklar.length){const s=[];bloklar.forEach(b=>arr(b.rows).forEach(r=>arr(r?.r).forEach(x=>{x&&x.a===id&&x.al&&!s.includes(x.al)&&s.push(x.al)})));if(s.length)return s.filter(x=>AL.includes(x))}
  return AL.slice()};
 const simdi=id=>tas[id]||kayitli(id);
 const puanli=(id,al)=>{const x=puan?.[id]?.[al];return!!(x&&typeof x==="object"&&(x.durum==="tamamlandi"||x.kilitli===!0||x.sonuc!=null||x.irm))};
 const ad=a=>[a.ad,a.soyad].filter(Boolean).join(" ")||a.adSoyad||"";
 const ids=Object.keys(spor).filter(id=>spor[id]&&typeof spor[id]==="object").sort((x,y)=>(Number(spor[x].cikisSirasi)||1e6)-(Number(spor[y].cikisSirasi)||1e6)||String(spor[x].okul||"").localeCompare(String(spor[y].okul||""),"tr")||ad(spor[x]).localeCompare(ad(spor[y]),"tr"));
 const ulkeler=[...new Set(ids.map(id=>spor[id].ulke).filter(Boolean))].sort();
 const q=ara.trim().toLocaleLowerCase("tr-TR"),gor=ids.filter(id=>{const a=spor[id];if(ulkeF&&a.ulke!==ulkeF)return!1;return!q||(ad(a)+" "+(a.okul||"")+" "+(a.ulke||"")+" "+(a.bib||"")).toLocaleLowerCase("tr-TR").includes(q)});
 const esit=(x,y)=>x.length===y.length&&x.every((v,i)=>v===y[i]);
 const degisen=gunMod?Object.keys(tg).filter(id=>JSON.stringify(tg[id])!==JSON.stringify(kayitliG(id))):Object.keys(tas).filter(id=>!esit(tas[id],kayitli(id)));
 const gunTik=(id,t,al)=>{const m=JSON.parse(JSON.stringify(simdiG(id))),varB=(m[t]||[]).includes(al);
  if(puanli(id,al)){toast(__T("Puanı girilmiş alet kaldırılamaz / taşınamaz."),"error");return}
  if(varB)m[t]=m[t].filter(x=>x!==al);else{Object.keys(m).forEach(k=>{m[k]=(m[k]||[]).filter(x=>x!==al)});m[t]=[...(m[t]||[]),al]}
  setTg(o=>({...o,[id]:m}))};
 const ayarla=(id,i,v)=>{const cur=simdi(id).slice();if(v)cur[i]=v;else cur.splice(i,1);const yeni=cur.filter((x,j)=>x&&cur.indexOf(x)===j);
  // puanlı alet listeden düşemez
  if(kayitli(id).some(al=>puanli(id,al)&&!yeni.includes(al))){toast(__T("Puanı girilmiş alet kaldırılamaz."),"error");return}
  setTas(t=>({...t,[id]:yeni}))};
 const tasiSl=(id,i,j)=>{const cur=simdi(id).slice();if(!cur[i]||!cur[j])return;if(puanli(id,cur[i])||puanli(id,cur[j])){toast(__T("Puanı girilmiş alet varken sıra değiştirilemez."),"error");return}[cur[i],cur[j]]=[cur[j],cur[i]];setTas(t=>({...t,[id]:cur}))};
 const tasi=(id,i,d)=>{const cur=simdi(id).slice(),j=i+d;if(j<0||j>=cur.length)return;[cur[i],cur[j]]=[cur[j],cur[i]];setTas(t=>({...t,[id]:cur}))};
 const sayim=R.useMemo(()=>{const o={};AL.forEach(a=>o[a]=0);ids.forEach(id=>(gunMod?duz(simdiG(id)):simdi(id)).forEach(a=>{o[a]!=null&&o[a]++}));return o},[tas,tg,spor,AL.join(),bloklar,gunMod]);// eslint-disable-line
 const usr=user?.kullaniciAdi||user?.username||"admin";

 const kaydetGun=async()=>{if(!degisen.length||!C)return;
  const satirlar=degisen.map(id=>{const o=kayitliG(id),n=tg[id];return{id,o,n}});
  const plan=JSON.parse(JSON.stringify({...cl,gunler:arr(cl.gunler).map(g=>({...g,bloklar:arr(g.bloklar).map(b=>({...b,aletler:arr(b.aletler),rows:arr(b.rows).map(r=>({...r,r:arr(r.r)}))}))}))}));
  const yeniBlok=[];
  satirlar.forEach(s=>{const a=spor[s.id]||{};gunList.forEach(g=>{const P=plan.gunler[g.gi],o=s.o[g.t]||[],n=s.n[g.t]||[];
   o.filter(x=>!n.includes(x)).forEach(al=>P.bloklar.forEach(b=>{if(b&&b.tip==="grup"&&b.kat===kat)b.rows=b.rows.filter(r=>!(r.r[0]&&r.r[0].a===s.id&&(r.r[0].al||b.aletler[0])===al))}));
  })});
  // EKLENEN ADIMLAR (2026-10-07): o günün akışının SONUNA; sıra = (sporcunun o günkü kaçıncı aleti, o gün çıkış listesindeki ilk sırası).
  // Örn. Hoop ile başlayan önce Hoop sonra Ball, Ball ile başlayan önce Ball sonra Hoop yapar; ikinci tur aynı isim sırasıyla gelir. Mevcut adımların yeri değişmez.
  const gsira={};let gs=0;plan.gunler.forEach(G=>arr(G.bloklar).forEach(b=>{b&&b.tip==="grup"&&b.kat===kat&&b.rows.forEach(r=>{const x=r.r[0]&&r.r[0].a;x&&gsira[x]==null&&(gsira[x]=gs++)})}));
  gunList.forEach(g=>{const P=plan.gunler[g.gi],kbs=()=>P.bloklar.filter(b=>b&&b.tip==="grup"&&b.kat===kat),ilk={},say={};let ix=0;
   kbs().forEach(b=>b.rows.forEach(r=>{const x=r.r[0]&&r.r[0].a;if(!x)return;ilk[x]==null&&(ilk[x]=ix);ix++;say[x]=(say[x]||0)+1}));
   const yeni=[];satirlar.forEach(s=>{const o=s.o[g.t]||[],n=s.n[g.t]||[];n.filter(x=>!o.includes(x)).forEach((al,j)=>yeni.push({id:s.id,al,p:(say[s.id]||0)+j,r:ilk[s.id]!=null?ilk[s.id]:1e5+(gsira[s.id]!=null?gsira[s.id]:1e4+ids.indexOf(s.id))}))});
   yeni.sort((x,y)=>x.p-y.p||x.r-y.r).forEach(x=>{const a=spor[x.id]||{},L=kbs();let hb=L[L.length-1];
    const blAl=b=>b.rows.map(r=>r.r[0]&&r.r[0].al||b.aletler[0]);
    if(hb&&!hb.rows.length)hb.aletler=[x.al];
    else if(hb){const z=blAl(hb),karisik=z.some(v=>v!==z[0]);if(!karisik&&z[0]!==x.al)hb=null}
    if(!hb){hb={id:"b"+Date.now().toString(36)+Math.random().toString(36).slice(2,6),tip:"grup",kat,saat:"",aletler:[x.al],rows:[]};let son=-1;P.bloklar.forEach((b,i)=>{b&&b.tip==="grup"&&b.kat===kat&&(son=i)});P.bloklar.splice(son+1,0,hb);yeniBlok.push(gunEt(g)+" · "+(raAd?raAd(x.al,__EN()):ALL[x.al]||x.al))}
    hb.rows.some(r=>r.r[0]&&r.r[0].a===x.id&&r.r[0].al===x.al)||hb.rows.push({k:a.okul||a.kulup||a.ulke||"",r:[{a:x.id,al:x.al}]})})});
  const yaz=m=>gunList.map(g=>gunEt(g)+": "+((m&&m[g.t])||[]).map(x=>raAd?raAd(x,__EN()):ALL[x]||x).join(" → ")||"—").join("  |  ");
  const mesaj=satirlar.slice(0,10).map(s=>ad(spor[s.id]||{})+"\n   "+yaz(s.o)+"\n ⇒ "+yaz(s.n)).join("\n")+(satirlar.length>10?"\n… +"+(satirlar.length-10):"")+"\n\n"+__T("Çıkış listesi ve puanlama sırası anında güncellenir. Eklenen alet o günün akışının sonuna eklenir: sporcu önce mevcut aletini, sonra yenisini yapar; ikinci tur aynı isim sırasıyla gelir.")+(yeniBlok.length?"\n"+__T("Yeni rotasyon açılacak:")+" "+[...new Set(yeniBlok)].join(", "):"");
  if(!await window.__gxConfirm(mesaj))return;
  const U={},B=`${FB}/${comp}`;satirlar.forEach(s=>{const f=duz(s.n);U[`${B}/sporcular/${kat}/${s.id}/aletler`]=f.length?f:null});
  U[`${B}/cikisListesi`]={...plan,ts:Date.now()};
  const kb=[];plan.gunler.forEach(g=>arr(g.bloklar).forEach(b=>{b&&b.tip==="grup"&&b.kat===kat&&kb.push(b)}));
  const sira={};let say=0;kb.forEach((b,gi)=>{const goren=new Set,lst=[];b.rows.forEach(r=>{const x=r.r[0]&&r.r[0].a;x&&!goren.has(x)&&(goren.add(x),lst.push(x))});const rot={};
   lst.forEach((id,i)=>{const a=spor[id];if(!a)return;say++;const al=duz(tg[id]||kayitliG(id));rot[id]={sirasi:i+1,ad:a.ad||"",soyad:a.soyad||"",tckn:a.tckn||"",okul:a.okul||a.kulup||"",yarismaTuru:a.yarismaTuru||"ferdi",...(a.grupNo!=null?{grupNo:a.grupNo}:{}),
    ...(b.aletler.length===1&&b.rows.every(r=>!r.r[0]||!r.r[0].al||r.r[0].al===b.aletler[0])?{_alet:b.aletler[0]}:{}),...(al.length?{aletler:al}:{}),...(a.ulke?{ulke:a.ulke}:{}),...(a.bib!=null&&a.bib!==""?{bib:a.bib}:{}),...(a.kulup?{kulup:a.kulup}:{}),...(a.il?{il:a.il}:{})};
    U[`${B}/sporcular/${kat}/${id}/sirasi`]=i+1;U[`${B}/sporcular/${kat}/${id}/cikisSirasi`]=say;U[`${B}/sporcular/${kat}/${id}/rotasyonGrubu`]=gi+1});sira["rotation_"+gi]=rot});
  U[`${B}/siralama/${kat}`]=sira;
  setBusy(!0);try{await update(ref(db),U);
   try{logAction("athlete_apparatus",`[Ritmik] Sporcu aletleri (gün bazlı) güncellendi (${kats[kat]?.name||kat}): `+satirlar.map(s=>ad(spor[s.id]||{})+" "+yaz(s.n)).join("; ").slice(0,400),{user:usr,competitionId:comp,discipline:"ritmik",category:kat,data:{degisiklik:satirlar.map(s=>({sporcu:s.id,eski:s.o,yeni:s.n})),yeniRotasyon:yeniBlok}})}catch{}
   toast(degisen.length+" "+__T("sporcunun aletleri kaydedildi ✓"),"success");setTg({})}catch(er){toast(__T("Kaydedilemedi: ")+(er?.message||er),"error")}setBusy(!1)};
 const kaydet=async()=>{if(gunMod)return kaydetGun();if(!degisen.length||!C)return;const senk=uygula&&tekAletli;
  const satirlar=degisen.map(id=>{const o=kayitli(id),n=tas[id];return{id,o,n,cik:o.filter(x=>!n.includes(x)),ek:n.filter(x=>!o.includes(x))}});
  const uyari=[];let plan=null;
  if(senk){plan=JSON.parse(JSON.stringify({...cl,gunler:arr(cl.gunler).map(g=>({...g,bloklar:arr(g.bloklar).map(b=>({...b,aletler:arr(b.aletler),rows:arr(b.rows).map(r=>({...r,r:arr(r.r)}))}))}))}));
   const kb=[];plan.gunler.forEach(g=>g.bloklar.forEach(b=>{b&&b.tip==="grup"&&b.kat===kat&&kb.push(b)}));
   satirlar.forEach(s=>{const a=spor[s.id]||{};
    s.cik.forEach(al=>kb.forEach(b=>{if(b.aletler[0]===al)b.rows=b.rows.filter(r=>!(r.r[0]&&r.r[0].a===s.id))}));
    s.ek.forEach(al=>{const hb=kb.filter(b=>b.aletler[0]===al).pop();if(!hb){uyari.push(ad(a)+" — "+(raAd?raAd(al,__EN()):ALL[al]||al));return}
     if(!hb.rows.some(r=>r.r[0]&&r.r[0].a===s.id))hb.rows.push({k:a.okul||a.kulup||a.ulke||"",r:[{a:s.id,al}]})})})}
  const mesaj=satirlar.slice(0,12).map(s=>`${ad(spor[s.id]||{})}: ${s.o.map(x=>ALL[x]||x).join(" → ")||"—"}  ⇒  ${s.n.map(x=>ALL[x]||x).join(" → ")||"—"}`).join("\n")+(satirlar.length>12?`\n… +${satirlar.length-12}`:"")+
   (senk?"\n\n"+__T("Çıkış listesi ve puanlama sırası da güncellenecek (eklenen alet o aletin rotasyonunun sonuna eklenir).")+(uyari.length?"\n"+__T("Çıkış listesinde bu alet için rotasyon yok, yalnız sporcu kaydı güncellenecek:")+" "+uyari.join(", "):""):"");
  if(!await window.__gxConfirm(mesaj))return;
  const U={},B=`${FB}/${comp}`;satirlar.forEach(s=>{U[`${B}/sporcular/${kat}/${s.id}/aletler`]=s.n.length?s.n:null});
  if(senk&&plan){U[`${B}/cikisListesi`]={...plan,ts:Date.now()};
   // Puanlamaya aktar (RitmikProgramPage ile aynı): kategori blokları sırasıyla rotation_N
   const yeniAl=id=>tas[id]||kayitli(id),kb=[];plan.gunler.forEach(g=>g.bloklar.forEach(b=>{b&&b.tip==="grup"&&b.kat===kat&&kb.push(b)}));
   const sira={};let say=0;kb.forEach((b,gi)=>{const goren=new Set,lst=[];b.rows.forEach(r=>{const x=r.r[0]&&r.r[0].a;x&&!goren.has(x)&&(goren.add(x),lst.push(x))});const rot={};
    lst.forEach((id,i)=>{const a=spor[id];if(!a)return;say++;const al=yeniAl(id);rot[id]={sirasi:i+1,ad:a.ad||"",soyad:a.soyad||"",tckn:a.tckn||"",okul:a.okul||a.kulup||"",yarismaTuru:a.yarismaTuru||"ferdi",...(a.grupNo!=null?{grupNo:a.grupNo}:{}),
     ...(b.aletler.length===1&&b.rows.every(r=>!r.r[0]||!r.r[0].al||r.r[0].al===b.aletler[0])?{_alet:b.aletler[0]}:{}),...(al.length?{aletler:al}:{}),...(a.ulke?{ulke:a.ulke}:{}),...(a.bib!=null&&a.bib!==""?{bib:a.bib}:{}),...(a.kulup?{kulup:a.kulup}:{}),...(a.il?{il:a.il}:{})};
     U[`${B}/sporcular/${kat}/${id}/sirasi`]=i+1;U[`${B}/sporcular/${kat}/${id}/cikisSirasi`]=say;U[`${B}/sporcular/${kat}/${id}/rotasyonGrubu`]=gi+1});sira["rotation_"+gi]=rot});
   U[`${B}/siralama/${kat}`]=sira}
  else{// çıkış listesi yoksa: mevcut rotasyon kayıtlarındaki aletler[] güncellenir (puanlama listesi)
   const sr=C?.siralama?.[kat]||{};Object.entries(sr).forEach(([rk,rot])=>{rot&&typeof rot==="object"&&satirlar.forEach(s=>{rot[s.id]&&(U[`${B}/siralama/${kat}/${rk}/${s.id}/aletler`]=s.n.length?s.n:null)})})}
  setBusy(!0);try{await update(ref(db),U);
   try{logAction("athlete_apparatus",`[Ritmik] Sporcu aletleri güncellendi (${kats[kat]?.name||kat}): `+satirlar.map(s=>`${ad(spor[s.id]||{})} ${s.n.map(x=>ALL[x]||x).join(">")}`).join("; ").slice(0,400),{user:usr,competitionId:comp,discipline:"ritmik",category:kat,data:{degisiklik:satirlar.map(s=>({sporcu:s.id,eski:s.o,yeni:s.n})),cikisListesi:!!senk}})}catch{}
   toast(degisen.length+" "+__T("sporcunun aletleri kaydedildi ✓"),"success");setTas({})}catch(er){toast(__T("Kaydedilemedi: ")+(er?.message||er),"error")}setBusy(!1)};

 const N=AL.length;
 const gunHucre=(id,g)=>{const m=simdiG(id),cur=m[g.t]||[];return e.jsx("td",{children:e.jsx("div",{className:"sa-gc",children:AL.map(al=>{const on=cur.includes(al),bs=!on&&Object.keys(m).some(k=>k!==g.t&&(m[k]||[]).includes(al)),kl=puanli(id,al)&&(on||bs),yk=gunSira(g.t,al)===999,nm=raAd?raAd(al,__EN()):ALL[al]||al;
  return e.jsxs("button",{type:"button",className:"sa-ch"+(on?" on":"")+(bs?" bs":"")+(kl?" kl":"")+(yk?" yk":""),title:nm+(kl?" — "+__T("puanlı, değiştirilemez"):bs?" — "+__T("başka günde; tıklayınca bu güne taşınır"):yk?" — "+__T("bu gün bu alet için rotasyon yok; eklenirse yeni rotasyon açılır"):""),onClick:()=>gunTik(id,g.t,al),children:[raImg(al)?e.jsx("img",{src:raImg(al),alt:""}):e.jsx("i",{className:"material-icons-round",children:"accessibility_new"}),e.jsx("span",{children:nm}),on?e.jsx("b",{children:cur.indexOf(al)+1}):null,kl&&on?e.jsx("i",{className:"material-icons-round",children:"lock"}):null]},al)})})},g.t)};
 const gunSay=R.useMemo(()=>gunList.map(g=>{const o={};ids.forEach(id=>((simdiG(id)[g.t])||[]).forEach(a=>{o[a]=(o[a]||0)+1}));return{g,o}}),[tg,spor,gunList]);// eslint-disable-line
 const hucre=(id,i)=>{const cur=simdi(id),v=cur[i]||"",kilit=!!v&&puanli(id,v),bos=!v&&i>cur.length;
  return e.jsx("td",{children:e.jsxs("div",{draggable:!!v&&!kilit,onDragStart:ev=>{setSlDrag({id,i});try{ev.dataTransfer.setData("text/plain","sl")}catch{}},onDragOver:ev=>{slDrag&&slDrag.id===id&&v&&!kilit&&ev.preventDefault()},onDrop:ev=>{ev.preventDefault();if(slDrag&&slDrag.id===id&&slDrag.i!==i)tasiSl(id,slDrag.i,i);setSlDrag(null)},onDragEnd:()=>setSlDrag(null),className:"sa-sl"+(v?" dolu":"")+(kilit?" kilit":"")+(slDrag&&slDrag.id===id&&slDrag.i===i?" drg":""),title:kilit?__T("Bu alette puan var — değiştirilemez"):"",style:bos?{opacity:.45}:null,children:[v&&raImg(v)?e.jsx("img",{src:raImg(v),alt:""}):e.jsx("i",{className:"material-icons-round",children:kilit?"lock":"radio_button_unchecked"}),
   e.jsxs("select",{value:v,disabled:kilit||bos,onChange:ev=>ayarla(id,i,ev.target.value),children:[e.jsx("option",{value:"",children:"—"}),AL.map(a=>e.jsx("option",{value:a,disabled:a!==v&&cur.includes(a),children:raAd?raAd(a,__EN()):ALL[a]||a},a))]}),
   kilit?e.jsx("i",{className:"material-icons-round",children:"lock"}):null]})},i)};

 return e.jsxs("div",{className:"gxp",style:{"--gxp-c":renk},children:[e.jsx("style",{children:CSS}),
  e.jsxs("div",{className:"gxp-hdr",children:[e.jsx("button",{type:"button",className:"gxp-back",onClick:()=>nav(RP||"/ritmik"),title:__T("Geri"),children:e.jsx("i",{className:"material-icons-round",children:"arrow_back"})}),e.jsx("div",{className:"gxp-ic",children:e.jsx("i",{className:"material-icons-round",children:"low_priority"})}),
   e.jsxs("div",{className:"gxp-tt",children:[e.jsx("h1",{children:__T("Sporcu Aletleri")}),e.jsx("p",{children:__T("Her sporcunun yarışacağı aletler ve sırası (1. alet, 2. alet…)")})]}),
   e.jsx("div",{className:"gxp-sel",children:e.jsxs("select",{value:comp,onChange:async ev=>{const v=ev.target.value;if(degisen.length&&!await window.__gxConfirm(__T("Kaydedilmemiş değişiklikler kaybolacak. Devam edilsin mi?")))return;setComp(v)},children:[e.jsx("option",{value:"",children:comps===null?__T("Yükleniyor…"):__T("— Yarışma seçin —")}),list.map(x=>e.jsx("option",{value:x.k,children:x.ad},x.k))]})})]}),
  !C?e.jsxs("div",{className:"gxp-card gxp-empty",children:[e.jsx("i",{className:"material-icons-round",children:"low_priority"}),__T("Önce yarışma seçin.")]}):
  e.jsxs("div",{className:"gxp-card",children:[
   e.jsx("div",{className:"sa-bar",children:e.jsx("div",{className:"sa-kats",children:katL.map(k=>e.jsx("button",{type:"button",className:kat===k?"on":"",onClick:async()=>{if(k===kat)return;if(degisen.length&&!await window.__gxConfirm(__T("Kaydedilmemiş değişiklikler kaybolacak. Devam edilsin mi?")))return;setKat(k)},children:String(kats[k]?.name||k).replace(/^\s*\u{1F3C6}\s*/u,"")},k))})}),
   !kat?e.jsx("p",{className:"sa-note",children:__T("Bireysel kategori yok.")}):tekAletli&&gor2==="cikis"?e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"sa-vw",children:[["alet",__T("Sporcu aletleri"),"low_priority"],["cikis",__T("Çıkış sırası"),"swap_vert"]].map(([k,t,ic])=>e.jsxs("button",{type:"button",className:gor2===k?"on":"",onClick:()=>setGor2(k),children:[e.jsx("i",{className:"material-icons-round",children:ic}),t]},k))}),e.jsx(CikisSira,{C,comp,kat,FB,usr,toast,renk},comp+"|"+kat)]}):e.jsxs(e.Fragment,{children:[tekAletli?e.jsx("div",{className:"sa-vw",children:[["alet",__T("Sporcu aletleri"),"low_priority"],["cikis",__T("Çıkış sırası"),"swap_vert"]].map(([k,t,ic])=>e.jsxs("button",{type:"button",className:gor2===k?"on":"",onClick:async()=>{if(k==="cikis"&&degisen.length&&!await window.__gxConfirm(__T("Kaydedilmemiş değişiklikler kaybolacak. Devam edilsin mi?")))return;setTas({});setTg({});setGor2(k)},children:[e.jsx("i",{className:"material-icons-round",children:ic}),t]},k))}):null,
    gunMod?e.jsx("div",{className:"sa-sum",children:gunSay.map(({g,o})=>e.jsxs("span",{children:[e.jsx("b",{style:{color:renk},children:gunEt(g)}),Object.keys(o).sort((x,y)=>gunSira(g.t,x)-gunSira(g.t,y)).map(a=>(raAd?raAd(a,__EN()):ALL[a]||a)+" "+o[a]).join(" · ")||"—"]},g.t))}):e.jsx("div",{className:"sa-sum",children:AL.map(a=>e.jsxs("span",{children:[raImg(a)?e.jsx("img",{src:raImg(a),alt:""}):null,(raAd?raAd(a,__EN()):ALL[a]||a)+": "+(sayim[a]||0)]},a))}),
    bloklar.length&&!tekAletli?e.jsx("div",{className:"sa-warn",children:__T("Bu kategorinin çıkış listesinde birden çok aletli gruplar var; değişiklik yalnız sporcu kaydına yazılır, çıkış listesini Program sayfasından düzenleyin.")}):null,
    e.jsxs("div",{className:"sa-bar",children:[e.jsx("input",{className:"sa-in",style:{flex:"1 1 220px"},placeholder:__T("Sporcu, takım veya ülke ara…"),value:ara,onChange:ev=>setAra(ev.target.value)}),
     ulkeler.length>1?e.jsxs("select",{className:"sa-in",value:ulkeF,onChange:ev=>setUlkeF(ev.target.value),children:[e.jsx("option",{value:"",children:__T("Tüm ülkeler")}),ulkeler.map(u=>e.jsx("option",{value:u,children:u},u))]}):null,
     e.jsx("span",{className:"sa-note",style:{margin:0},children:gor.length+" / "+ids.length+" "+__T("sporcu")})]}),
    e.jsx("div",{className:"sa-tw",children:e.jsxs("table",{className:"sa-t",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"#"}),e.jsx("th",{children:__T("Sporcu")}),gunMod?gunList.map(g=>e.jsx("th",{children:gunEt(g)},g.t)):Array.from({length:N},(_,i)=>e.jsx("th",{children:(i+1)+". "+__T("alet")},i)),e.jsx("th",{})]})}),
     e.jsx("tbody",{children:gor.map((id,ri)=>{const a=spor[id],cur=simdi(id),ch=degisen.includes(id),fu=a.ulke&&bayrakUrl(a.ulke);
      return e.jsxs("tr",{className:ch?"ch":"",children:[e.jsx("td",{style:{color:"#94A3B8",fontWeight:800},children:ri+1}),
       e.jsx("td",{className:"sa-nm",children:e.jsxs("div",{children:[e.jsx("b",{children:ad(a)}),e.jsxs("span",{children:[fu?e.jsx("img",{src:fu,alt:""}):null,[a.ulke,a.okul&&a.okul!==a.ulke?a.okul:"",a.bib?"#"+a.bib:""].filter(Boolean).join(" · ")]})]})}),
       gunMod?gunList.map(g=>gunHucre(id,g)):Array.from({length:N},(_,i)=>hucre(id,i)),
       e.jsx("td",{style:{whiteSpace:"nowrap"},children:e.jsxs("div",{style:{display:"flex",gap:4},children:[!gunMod&&cur.length>1?e.jsx("button",{type:"button",className:"sa-mini",title:__T("Sırayı ters çevir"),onClick:()=>{if(cur.some(x=>puanli(id,x))){toast(__T("Puanı girilmiş alet varken sıra değiştirilemez."),"error");return}setTas(t=>({...t,[id]:cur.slice().reverse()}))},children:e.jsx("i",{className:"material-icons-round",children:"swap_horiz"})}):null,
        ch?e.jsxs("button",{type:"button",className:"sa-mini",onClick:()=>{setTas(t=>{const o={...t};delete o[id];return o});setTg(t=>{const o={...t};delete o[id];return o})},children:[e.jsx("i",{className:"material-icons-round",children:"undo"}),__T("Geri al")]}):null]})})]},id)})})]})}),
    e.jsxs("div",{className:"sa-foot",children:[gunMod?e.jsx("span",{className:"sa-note",style:{margin:0,fontWeight:800},children:__T("Gün bazlı: kaydedince çıkış listesine, puanlama sırasına ve hakem ekranlarına anında yansır.")}):tekAletli?e.jsxs("label",{children:[e.jsx("input",{type:"checkbox",checked:uygula,onChange:ev=>setUygula(ev.target.checked)}),__T("Çıkış listesine ve puanlama sırasına uygula")]}):e.jsx("span",{className:"sa-note",style:{margin:0},children:bloklar.length?"":__T("Bu kategoride çıkış listesi yok — yalnız sporcu kaydı güncellenir.")}),
     e.jsx("span",{style:{marginLeft:"auto",fontWeight:800,color:degisen.length?"#B45309":"#94A3B8",fontSize:".85rem"},children:degisen.length?degisen.length+" "+__T("sporcuda değişiklik"):__T("Değişiklik yok.")}),
     e.jsx("button",{type:"button",className:"sa-btn g",disabled:!degisen.length||busy,onClick:()=>{setTas({});setTg({})},children:__T("Geri al")}),
     e.jsxs("button",{type:"button",className:"sa-btn",disabled:!degisen.length||busy,onClick:kaydet,children:[e.jsx("i",{className:"material-icons-round",children:"save"}),busy?__T("Kaydediliyor…"):__T("Kaydet")]})]}),
    e.jsx("p",{className:"sa-note",children:__T("Başhakem puanlama ekranında sporcuyu seçince yalnız bu aletler bu sırayla görünür ve sıradaki puanlanmamış alet otomatik açılır. Puanı girilmiş alet kilitlidir.")})]})]})]})}
