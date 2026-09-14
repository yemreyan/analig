import{u as Q,a as X,b as Z,r as w,g as B,c as S,j as e,d as _,f as M}from"./index-e2EOFVzz.js";import{i as ee,b as te,g as ie}from"./DataService-op7zCuwP.js";import{u as se,r as ae}from"./Rules-Bj9RDfCL.js";function ce(){const R=Q(),{getActiveCompId:O}=X(),{toast:u,confirm:z}=Z(),m=se(O()),p=O(),[v,Y]=w.useState({}),[$,W]=w.useState({}),[I,D]=w.useState({}),[F,K]=w.useState(""),[j,y]=w.useState(!1);w.useEffect(()=>{if(!p){R("/");return}A()},[p]);async function A(){const t=await B(S(_,`trampolin_yarismalar/competitions/${p}`));if(!t.exists())return;const a=t.val();K(a.name||""),Y(a.categories||{}),W(a.athletes||{});const s=await B(S(_,`trampolin_yarismalar/competitions/${p}/results`));D(s.val()||{})}async function q(t){const a=v[t];if(!a)return;if(t.endsWith("_final")){u("Bu zaten bir final kategorisi","warning");return}const s=`${t}_final`;if(v[s]){if(!await z("Final Var","Bu kategorinin finali zaten var. Yenilemek istiyor musunuz?"))return;await L(s)}y(!0);try{const c=Object.values($).filter(i=>i.category===t||i.categoryId===t||i.catId===t),b=ae(m,a).scoringRule,k=c.map(i=>{const l=I[i.uniqueId]||I[i.id]||{},{r1:d,r2:J,total:G}=ee(l.r1,l.r2,b);return{a:i,total:G,scored:d!=null||J!=null}}).filter(i=>i.scored);k.sort((i,l)=>l.total-i.total);const h=k.slice(0,m.flow.finalistCount),n=k.slice(m.flow.finalistCount,m.flow.finalistCount+m.flow.reserveCount);if(h.length===0){u("Bu kategoride puan almış sporcu yok — final oluşturulamaz.","error");return}const f=Math.ceil(h.length/2),x=h.slice(0,f).map(i=>i.a),o=h.slice(f).map(i=>i.a),C=i=>{for(let l=i.length-1;l>0;l--){const d=Math.floor(Math.random()*(l+1));[i[l],i[d]]=[i[d],i[l]]}};C(x),C(o);const r=[...o,...x],g={},N=[];r.forEach((i,l)=>{const d=`${i.id}_final`;g[`trampolin_yarismalar/competitions/${p}/athletes/${d}`]={...i,id:d,uniqueId:d,originalId:i.id,category:s,categoryId:s,catId:s,isFinalist:!0,isReserve:!1,startOrder:l+1},N.push(d)}),n.forEach(({a:i},l)=>{const d=`${i.id}_final_res`;g[`trampolin_yarismalar/competitions/${p}/athletes/${d}`]={...i,id:d,uniqueId:d,originalId:i.id,category:s,categoryId:s,catId:s,isFinalist:!0,isReserve:!0,startOrder:r.length+l+1},N.push(d)});const{startList:ne,athletes:re,...V}=a;if(g[`trampolin_yarismalar/competitions/${p}/categories/${s}`]={...V,id:s,name:`${a.name} — FİNAL`,isFinal:!0,parentCategoryId:t,createdAt:Date.now(),startList:N.map((i,l)=>({id:i,order:l+1}))},g[`trampolin_yarismalar/competitions/${p}/startOrder/${s}`]=N,await M(S(_),g),u(`Final oluşturuldu: ${h.length} finalist + ${n.length} yedek`,"success"),h.length>=m.flow.finalistCount&&n.length<m.flow.reserveCount){const i=c.length;u(`Yedek eksik: ${n.length}/${m.flow.reserveCount}. Bu kategoride ${i} sporcu kayıtlı, ${k.length} tanesi puan aldı. Yedek için ${m.flow.finalistCount+m.flow.reserveCount} puanlı sporcu gerekir.`,"warning")}await A()}catch(c){u("Hata: "+c.message,"error")}finally{y(!1)}}async function L(t){const a={};Object.values($).filter(c=>c.category===t||c.categoryId===t).forEach(c=>{const b=c.uniqueId||c.id;a[`trampolin_yarismalar/competitions/${p}/athletes/${b}`]=null}),a[`trampolin_yarismalar/competitions/${p}/categories/${t}`]=null,a[`trampolin_yarismalar/competitions/${p}/startOrder/${t}`]=null,await M(S(_),a)}async function U(t){if(await z("Final Sil","Bu final kategorisini silmek istiyor musunuz?")){y(!0);try{await L(t),u("Final silindi","info"),await A()}finally{y(!1)}}}async function P(){const t=Object.keys(v).filter(s=>s.endsWith("_final"));if(t.length===0){u("Silinecek final yok","info");return}if(await z("Tüm Finalleri Sil",`${t.length} final kategorisi silinecek. Emin misiniz?`)){y(!0);try{for(const s of t)await L(s);u("Tüm finaller silindi","info"),await A()}finally{y(!1)}}}function T(t){const a=E.filter(n=>n.isFinal||n.id.endsWith("_final")).filter(n=>t==="all"||n.id===t);if(a.length===0){u("Yazdırılacak final kategorisi yok.","warning");return}const s=n=>String(n??"").replace(/[&<>"']/g,f=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[f]);function c(n){const f=Object.values($).filter(r=>r.category===n.id||r.categoryId===n.id||r.catId===n.id),x={};f.forEach(r=>{x[r.uniqueId||r.id]=r});let o;Array.isArray(n.startList)&&n.startList.length?o=n.startList.slice().sort((r,g)=>(r.order||0)-(g.order||0)).map(r=>x[r.id]).filter(Boolean):o=f.slice().sort((r,g)=>(r.startOrder||0)-(g.startOrder||0));let C=0;return o.map((r,g)=>({order:g+1,name:ie(r),club:te(r)||r.club||"",reserve:r.isReserve?`R${++C}`:""}))}let b="";if(a.forEach(n=>{const f=c(n);if(f.length===0)return;const x=f.filter(o=>o.reserve).length;b+=`
            <div class="page">
                <div class="header">
                    <img class="logo" src="${window.location.origin}/trambolin/tcf-logo.png" alt="TCF" />
                    <div class="head-text">
                        <div class="comp-name">${s(F||"")}</div>
                        <h1 class="cat-name">${s(n.name)}</h1>
                        <div class="sub-header">FİNAL ÇIKIŞ LİSTESİ</div>
                    </div>
                </div>
                <div class="note">
                    ${f.length-x} finalist${x?` · ${x} yedek (R1${x>1?", R2":""})`:""}
                    · Çıkış sırası kura ile belirlenmiştir
                </div>
                <table>
                    <thead>
                        <tr>
                            <th class="c" style="width:64px">SIRA</th>
                            <th>AD SOYAD</th>
                            <th>KULÜP</th>
                            <th class="c" style="width:72px">YEDEK</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${f.map(o=>`
                            <tr class="${o.reserve?"res":""}">
                                <td class="rank-col">${o.order}</td>
                                <td class="name-col">${s(o.name)}</td>
                                <td class="club-col">${s(o.club||"—")}</td>
                                <td class="c res-col">${o.reserve||""}</td>
                            </tr>`).join("")}
                    </tbody>
                </table>
                <div class="footer">
                    <div>TCF TRAMBOLİN CİMNASTİK SİSTEMİ</div>
                    <div>Oluşturulma: ${new Date().toLocaleString("tr-TR")}</div>
                </div>
                <div class="signs">
                    <div class="sign"><span></span>Başhakem</div>
                    <div class="sign"><span></span>Üst Jüri</div>
                    <div class="sign"><span></span>Teknik Sorumlu</div>
                </div>
            </div>`}),!b){u("Yazdırılacak sporcu bulunamadı.","warning");return}const k=`<!doctype html>
<html lang="tr"><head><meta charset="utf-8">
<title>${s(F||"Final")} — Çıkış Listesi</title>
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;700;800;900&display=swap" rel="stylesheet">
<style>
  @page { size: A4; margin: 0; }
  body { font-family:'Outfit',sans-serif; margin:0; color:#1e293b;
         -webkit-print-color-adjust:exact; print-color-adjust:exact; background:#e2e8f0; }
  .page { width:210mm; min-height:297mm; padding:12mm; margin:0 auto 10px; background:#fff;
          box-sizing:border-box; page-break-after:always; display:flex; flex-direction:column; }
  .page:last-child { page-break-after:auto; }

  .header { background:#E30613; color:#fff; padding:14px 18px; border-radius:12px;
            margin-bottom:18px; display:flex; align-items:center; gap:16px; }
  .logo { width:64px; height:64px; background:#fff; border-radius:50%; padding:4px; flex-shrink:0; object-fit:contain; }
  .head-text { text-align:left; min-width:0; }
  .comp-name { font-size:15px; font-weight:800; text-transform:uppercase; letter-spacing:1px; opacity:.95; }
  .cat-name  { font-size:26px; font-weight:900; margin:2px 0 0; }
  .sub-header{ font-size:12px; font-weight:700; letter-spacing:3px; opacity:.9; margin-top:2px; }

  .note { background:#f1f5f9; border-left:4px solid #E30613; padding:7px 12px; font-size:11px;
          color:#475569; font-weight:600; border-radius:0 6px 6px 0; margin-bottom:12px; }

  table { width:100%; border-collapse:collapse; font-size:12px; }
  thead th { background:#303868; color:#fff; padding:8px 10px; text-align:left;
             font-size:10px; letter-spacing:1px; font-weight:800; }
  thead th.c { text-align:center; }
  tbody td { padding:8px 10px; border-bottom:1px solid #e2e8f0; }
  tbody td.c { text-align:center; }
  tbody tr:nth-child(even) { background:#f8fafc; }
  .rank-col { text-align:center; font-family:'Space Mono',monospace; font-weight:800; font-size:14px; color:#303868; }
  .name-col { font-weight:700; }
  .club-col { color:#64748b; font-size:11px; }
  .res-col  { font-family:'Space Mono',monospace; font-weight:800; color:#E30613; }
  tbody tr.res { background:#fff7ed; }
  tbody tr.res .name-col { color:#9a3412; }

  .footer { margin-top:auto; padding-top:14px; border-top:1px solid #e2e8f0;
            display:flex; justify-content:space-between; font-size:9px; color:#94a3b8; font-weight:500; }
  .signs { display:flex; justify-content:space-between; gap:24px; margin-top:26px; }
  .sign { flex:1; text-align:center; font-size:10px; color:#475569; font-weight:600; }
  .sign span { display:block; border-top:1px solid #94a3b8; margin-bottom:5px; height:34px; }

  @media print { body { background:#fff; } .page { margin:0; } }
</style></head>
<body>${b}<script>window.onload=function(){setTimeout(function(){window.print();},400);};<\/script></body></html>`,h=window.open("","_blank");if(!h){u("Açılır pencere engellendi — tarayıcı iznini kontrol edin.","error");return}h.document.write(k),h.document.close()}function H(t){return Object.values($).filter(a=>a.category===t||a.categoryId===t||a.catId===t).length}const E=Object.values(v);return e.jsxs("div",{style:{display:"flex",flexDirection:"column",minHeight:"100vh"},children:[e.jsxs("nav",{className:"topnav",children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:20},children:[e.jsxs("button",{className:"btn btn-sm",style:{background:"rgba(255,255,255,0.15)",color:"white"},onClick:()=>R("/panel"),children:[e.jsx("i",{className:"material-icons-round",children:"arrow_back"})," Panel"]}),e.jsxs("div",{children:[e.jsx("div",{style:{color:"white",fontWeight:700},children:F}),e.jsx("div",{style:{color:"#94a3b8",fontSize:"0.78rem"},children:"FİNAL OLUŞTURMA"})]})]}),e.jsxs("div",{style:{display:"flex",gap:8},children:[e.jsxs("button",{className:"btn btn-sm",style:{background:"linear-gradient(135deg, #E02828, #A01C1C)",color:"white"},onClick:()=>T("all"),disabled:j,title:"Tüm final kategorilerinin çıkış listesi",children:[e.jsx("i",{className:"material-icons-round",children:"picture_as_pdf"})," Çıkış Listesi — Tümü"]}),e.jsxs("button",{className:"btn btn-outline btn-sm",style:{color:"#ef4444",borderColor:"rgba(239,68,68,0.3)"},onClick:P,disabled:j,children:[e.jsx("i",{className:"material-icons-round",children:"delete_sweep"})," Tümünü Sil"]})]})]}),e.jsx("div",{className:"container",children:e.jsxs("div",{className:"card",children:[e.jsxs("div",{className:"card-header",children:[e.jsx("h3",{className:"card-title",children:"Kategoriler"}),e.jsx("div",{className:"text-muted",style:{marginTop:4,fontSize:"0.85rem"},children:"İlk 8 finalist, 9-10 yedek olarak yerleştirilir. Çıkış sırası ters kurulur: elemede 5-8. sıradakiler 1-4 arasında, 1-4. sıradakiler 5-8 arasında rastgele yerleşir. Yedekler (R1, R2) 9 ve 10. sırada yarışır."})]}),e.jsx("div",{className:"card-body",style:{padding:0},children:e.jsx("div",{className:"table-responsive",children:e.jsxs("table",{className:"table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Kategori"}),e.jsx("th",{style:{width:120,textAlign:"center"},children:"Sporcu"}),e.jsx("th",{style:{width:120,textAlign:"center"},children:"Durum"}),e.jsx("th",{style:{width:260},children:"İşlemler"})]})}),e.jsxs("tbody",{children:[E.length===0&&e.jsx("tr",{children:e.jsx("td",{colSpan:4,className:"text-center text-muted",style:{padding:40},children:"Kategori yok"})}),E.map(t=>{const a=t.id.endsWith("_final")||t.isFinal,s=!a&&v[`${t.id}_final`];return e.jsxs("tr",{children:[e.jsxs("td",{children:[e.jsx("div",{style:{fontWeight:700},children:t.name}),e.jsx("div",{style:{fontSize:"0.78rem",color:"#64748b"},children:t.id})]}),e.jsx("td",{style:{textAlign:"center"},children:H(t.id)}),e.jsx("td",{style:{textAlign:"center"},children:a?e.jsx("span",{style:{padding:"2px 10px",borderRadius:4,fontSize:"0.78rem",background:"rgba(253,185,49,0.15)",color:"#fbbf24",fontWeight:700},children:"FİNAL"}):s?e.jsx("span",{style:{padding:"2px 10px",borderRadius:4,fontSize:"0.78rem",background:"rgba(16,185,129,0.15)",color:"#10b981",fontWeight:700},children:"FİNALİ VAR"}):e.jsx("span",{style:{padding:"2px 10px",borderRadius:4,fontSize:"0.78rem",background:"rgba(148,163,184,0.15)",color:"#94a3b8"},children:"ELEME"})}),e.jsx("td",{children:a?e.jsxs("div",{style:{display:"flex",gap:8},children:[e.jsxs("button",{className:"btn btn-sm",style:{background:"linear-gradient(135deg, #E02828, #A01C1C)",color:"white"},disabled:j,onClick:()=>T(t.id),children:[e.jsx("i",{className:"material-icons-round",children:"picture_as_pdf"})," Çıkış Listesi"]}),e.jsxs("button",{className:"btn btn-sm btn-outline",style:{color:"#ef4444",borderColor:"rgba(239,68,68,0.3)"},disabled:j,onClick:()=>U(t.id),children:[e.jsx("i",{className:"material-icons-round",children:"delete"})," Sil"]})]}):e.jsxs("button",{className:"btn btn-sm btn-primary",disabled:j,onClick:()=>q(t.id),children:[e.jsx("i",{className:"material-icons-round",children:"auto_awesome"}),s?"Yenile":"Final Oluştur"]})})]},t.id)})]})]})})})]})})]})}export{ce as default};
