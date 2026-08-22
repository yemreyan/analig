import{u as ee,a as te,b as ae,r as x,g as k,c as v,j as a,d as j,f as ne}from"./index-CK8WnCcy.js";function ie(){const A=ee(),{getActiveCompId:K}=te(),{toast:w,confirm:Y}=ae(),p=K(),[_,P]=x.useState({}),[r,M]=x.useState(""),[m,g]=x.useState([]),[F,E]=x.useState(new Set),[O,T]=x.useState(!1),[z,W]=x.useState("");x.useEffect(()=>{if(!p){A("/");return}(async()=>{const[e,i]=await Promise.all([k(v(j,`trampolin_yarismalar/competitions/${p}/categories`)),k(v(j,`trampolin_yarismalar/competitions/${p}/name`))]);P(e.val()||{}),W(i.val()||"")})()},[p]),x.useEffect(()=>{if(!r){g([]);return}H(r)},[r]);async function H(e){const[i,n]=await Promise.all([k(v(j,`trampolin_yarismalar/competitions/${p}/athletes`)),k(v(j,`trampolin_yarismalar/competitions/${p}/startOrder/${e}`))]),t=i.val()||{},s=n.val(),l=Object.values(t).filter(c=>c.category===e||c.categoryId===e||c.catId===e);if(Array.isArray(s)&&s.length>0){const c={};l.forEach(d=>{c[d.id]=d});const u=s.map(d=>c[d]).filter(Boolean);l.forEach(d=>{s.includes(d.id)||u.push(d)}),g(u)}else{const c=[...l].sort((u,d)=>{const o=(u.club||"").localeCompare(d.club||"","tr");return o!==0?o:(u.surname||"").localeCompare(d.surname||"","tr")});g(c)}E(new Set(l.map(c=>c.club||"Bilinmeyen")))}const D=x.useMemo(()=>{const e={};return m.forEach((i,n)=>{const t=i.club||"Bilinmeyen";e[t]||(e[t]=[]),e[t].push({...i,_index:n})}),e},[m]);function R(e){E(i=>{const n=new Set(i);return n.has(e)?n.delete(e):n.add(e),n})}function L(e,i){g(n=>{const t=[...n],s=e+i;return s<0||s>=t.length?n:([t[e],t[s]]=[t[s],t[e]],t)})}function G(e,i){const n=parseInt(i,10);if(isNaN(n)||n<1||n>m.length)return;const t=n-1;t!==e&&g(s=>{const l=[...s],[c]=l.splice(e,1);return l.splice(t,0,c),l})}async function U(e){g(i=>{const n=[...i],t=n[e],s={...t,id:`${t.id}_copy_${Date.now()}`,uniqueId:`${t.id}_copy_${Date.now()}`};return n.splice(e+1,0,s),n})}async function q(e){const i=m[e];await Y("Listeden Sil",`${i.name} ${i.surname} — sadece çıkış listesinden çıkar. Sporcu silinmez.`)&&g(t=>t.filter((s,l)=>l!==e))}function J(){g(e=>[...e].sort((n,t)=>{const s=(n.club||"").localeCompare(t.club||"","tr");return s!==0?s:(n.surname||"").localeCompare(t.surname||"","tr")}))}function Q(){const e={};m.forEach(t=>{const s=t.club||"Bilinmeyen";e[s]||(e[s]=[]),e[s].push(t)});const i=Object.keys(e);for(let t=i.length-1;t>0;t--){const s=Math.floor(Math.random()*(t+1));[i[t],i[s]]=[i[s],i[t]]}Object.values(e).forEach(t=>{for(let s=t.length-1;s>0;s--){const l=Math.floor(Math.random()*(s+1));[t[s],t[l]]=[t[l],t[s]]}});const n=[];i.forEach(t=>n.push(...e[t])),g(n)}async function V(){if(r){T(!0);try{const e=m.map(n=>n.id),i={};i[`trampolin_yarismalar/competitions/${p}/startOrder/${r}`]=e,i[`trampolin_yarismalar/competitions/${p}/categories/${r}/startList`]=m.map((n,t)=>({id:n.id,order:t+1})),await ne(v(j),i),w("Çıkış sırası kaydedildi","success")}catch(e){w("Hata: "+e.message,"error")}finally{T(!1)}}}async function X(){var d;const e=new Date().toLocaleDateString("tr-TR",{day:"2-digit",month:"long",year:"numeric"});function i(o){return(o||"").replace(/Minik\s*A\b\s*/gi,"").replace(/Minik\s*B\b\s*/gi,"").replace(/Küçük(?:ler?)?\s*/gi,"").replace(/Yıldız(?:lar?)?\s*/gi,"").replace(/Genç(?:ler?)?\s*/gi,"").replace(/Büyük(?:ler?)?\s*/gi,"").replace(/\(\s*\)/g,"").replace(/\s{2,}/g," ").trim()}let n=[];if(r)n=[{catName:i(((d=_[r])==null?void 0:d.name)||r),athletes:m}];else{const o=Object.values(_).sort((f,I)=>(f.name||"").localeCompare(I.name||"","tr"));if(o.length===0){w("Henüz kategori tanımlanmamış.","warning");return}const[y,...N]=await Promise.all([k(v(j,`trampolin_yarismalar/competitions/${p}/athletes`)),...o.map(f=>k(v(j,`trampolin_yarismalar/competitions/${p}/startOrder/${f.id}`)))]),Z=y.val()||{};if(o.forEach((f,I)=>{const S=Object.values(Z).filter(b=>b.category===f.id||b.categoryId===f.id||b.catId===f.id);if(S.length===0)return;const C=N[I].val();let $;if(Array.isArray(C)&&C.length>0){const b={};S.forEach(h=>{b[h.id]=h}),$=C.map(h=>b[h]).filter(Boolean),S.forEach(h=>{C.includes(h.id)||$.push(h)})}else $=[...S].sort((b,h)=>{const B=(b.club||"").localeCompare(h.club||"","tr");return B!==0?B:(b.surname||"").localeCompare(h.surname||"","tr")});n.push({catName:i(f.name||f.id),athletes:$})}),n.length===0){w("Hiçbir kategoride sporcu bulunamadı.","warning");return}}const t=n.reduce((o,y)=>o+y.athletes.length,0),s=o=>(o||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"),l=n.map(o=>`
            <div class="cat-section">
                <div class="cat-header">
                    <span class="cat-name">${s(o.catName)}</span>
                    <span class="cat-count">${o.athletes.length} sporcu</span>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th class="col-no">No</th>
                            <th class="col-name">Ad Soyad</th>
                            <th class="col-club">Kulüp</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${o.athletes.map((y,N)=>`
                            <tr class="${N%2===0?"even":""}">
                                <td class="col-no num">${N+1}</td>
                                <td class="col-name bold">${s((y.surname||"").toUpperCase())} ${s(y.name||"")}</td>
                                <td class="col-club">${s(y.club||"—")}</td>
                            </tr>
                        `).join("")}
                    </tbody>
                </table>
            </div>
        `).join(""),c=`<!DOCTYPE html>
<html lang="tr">
<head>
<meta charset="UTF-8">
<title>Çıkış Listesi — ${s(z)}</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: Arial, sans-serif; font-size: 10pt; color: #1e293b; background: white; }

  /* ── Sayfa ayarları ── */
  @page { size: A4 portrait; margin: 12mm 14mm 14mm 14mm; }
  @media print {
    body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    .no-print { display: none; }
    .cat-section { page-break-inside: avoid; }
    table { page-break-inside: auto; }
    tr { page-break-inside: avoid; }
  }

  /* ── Üst başlık ── */
  .page-header {
    display: flex; align-items: center; gap: 14px;
    background: #0f172a; color: white;
    padding: 10px 14px; border-radius: 6px;
    margin-bottom: 14px;
  }
  .tcf-badge {
    background: #38bdf8; color: #0f172a;
    font-weight: 900; font-size: 13pt;
    width: 40px; height: 40px; border-radius: 6px;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }
  .header-text { flex: 1; }
  .header-title { font-size: 15pt; font-weight: 700; letter-spacing: 1px; }
  .header-sub   { font-size: 8pt; color: #94a3b8; margin-top: 2px; }
  .header-right { text-align: right; font-size: 8pt; color: #94a3b8; }

  /* ── Yarışma bilgisi ── */
  .comp-info { margin-bottom: 12px; }
  .comp-name { font-size: 13pt; font-weight: 700; color: #0f172a; }
  .comp-meta { font-size: 8.5pt; color: #64748b; margin-top: 3px; }

  /* ── Kategori ── */
  .cat-section { margin-bottom: 18px; }
  .cat-header {
    display: flex; justify-content: space-between; align-items: center;
    background: #1e293b; color: white;
    padding: 6px 10px; border-radius: 4px 4px 0 0;
  }
  .cat-name  { font-weight: 700; font-size: 10.5pt; color: #38bdf8; letter-spacing: 0.5px; }
  .cat-count { font-size: 8pt; color: #94a3b8; }

  /* ── Tablo ── */
  table { width: 100%; border-collapse: collapse; }
  thead tr { background: #f1f5f9; }
  th {
    padding: 5px 8px; font-size: 8pt; font-weight: 700;
    color: #334155; text-transform: uppercase; letter-spacing: 0.5px;
    border-bottom: 2px solid #e2e8f0; text-align: left;
  }
  td { padding: 5px 8px; font-size: 9.5pt; border-bottom: 1px solid #f1f5f9; }
  tr.even td { background: #f8fafc; }
  tr:last-child td { border-bottom: none; }

  .col-no   { width: 42px; text-align: center; }
  .col-name { width: 55%; }
  .col-club { }
  .num  { font-weight: 700; color: #334155; font-size: 10pt; }
  .bold { font-weight: 700; }

  /* ── Alt bilgi ── */
  .page-footer {
    margin-top: 20px; padding-top: 8px;
    border-top: 1px solid #e2e8f0;
    display: flex; justify-content: space-between;
    font-size: 7.5pt; color: #94a3b8;
  }
</style>
</head>
<body>

<div class="page-header">
  <div class="tcf-badge">TCF</div>
  <div class="header-text">
    <div class="header-title">ÇIKIŞ LİSTESİ</div>
    <div class="header-sub">Türkiye Cimnastik Federasyonu — Trampolin Yarışma Sistemi</div>
  </div>
  <div class="header-right">${s(e)}</div>
</div>

${z?`<div class="comp-info">
  <div class="comp-name">${s(z)}</div>
  <div class="comp-meta">${n.length} kategori · ${t} sporcu</div>
</div>`:""}

${l}

<div class="page-footer">
  <span>TCF Trampolin Yarışma Yönetim Sistemi</span>
  <span>${s(e)}</span>
</div>

</body>
</html>`,u=window.open("","_blank","width=800,height=1000");u.document.write(c),u.document.close(),u.focus(),setTimeout(()=>{u.print()},400)}return a.jsxs("div",{style:{display:"flex",flexDirection:"column",minHeight:"100vh"},children:[a.jsx("nav",{className:"topnav",children:a.jsxs("div",{style:{display:"flex",alignItems:"center",gap:20},children:[a.jsxs("button",{className:"btn btn-sm",style:{background:"rgba(255,255,255,0.15)",color:"white"},onClick:()=>A("/panel"),children:[a.jsx("i",{className:"material-icons-round",children:"arrow_back"})," Panel"]}),a.jsx("span",{style:{color:"#94a3b8",fontWeight:700,fontSize:"0.9rem",letterSpacing:1},children:"ÇIKIŞ SIRASI"})]})}),a.jsx("div",{className:"container",style:{maxWidth:900,margin:"0 auto",width:"100%"},children:a.jsxs("div",{className:"card",children:[a.jsxs("div",{className:"card-header",style:{display:"flex",gap:12,flexWrap:"wrap",alignItems:"center"},children:[a.jsxs("select",{value:r,onChange:e=>M(e.target.value),style:{flex:1,minWidth:200},children:[a.jsx("option",{value:"",children:"Kategori seçiniz..."}),Object.values(_).map(e=>a.jsx("option",{value:e.id,children:e.name},e.id))]}),a.jsxs("button",{className:"btn btn-outline btn-sm",onClick:J,disabled:!r,children:[a.jsx("i",{className:"material-icons-round",children:"group_work"})," Kulübe Göre"]}),a.jsxs("button",{className:"btn btn-outline btn-sm",onClick:Q,disabled:!r,children:[a.jsx("i",{className:"material-icons-round",children:"shuffle"})," Karıştır"]}),a.jsxs("button",{className:"btn btn-primary btn-sm",onClick:V,disabled:!r||O,children:[a.jsx("i",{className:"material-icons-round",children:"save"})," ",O?"KAYDEDİLİYOR...":"KAYDET"]}),a.jsxs("button",{className:"btn btn-sm",onClick:X,style:{background:"#10b981",color:"white"},children:[a.jsx("i",{className:"material-icons-round",children:"picture_as_pdf"}),r?"PDF İndir":"Tümünü PDF İndir"]})]}),a.jsxs("div",{className:"card-body",children:[!r&&a.jsx("div",{className:"text-center text-muted",style:{padding:40},children:"Lütfen kategori seçin"}),r&&m.length===0&&a.jsx("div",{className:"text-center text-muted",style:{padding:40},children:"Bu kategoride kayıtlı sporcu yok"}),Object.keys(D).map(e=>{const i=F.has(e),n=D[e];return a.jsxs("div",{style:{border:"1px solid rgba(255,255,255,0.08)",borderRadius:10,marginBottom:10,overflow:"hidden"},children:[a.jsx("div",{onClick:()=>R(e),style:{padding:"12px 16px",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",background:"rgba(255,255,255,0.03)"},children:a.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10},children:[a.jsx("i",{className:"material-icons-round",children:i?"expand_less":"expand_more"}),a.jsx("strong",{children:e}),a.jsxs("span",{style:{color:"#64748b",fontSize:"0.82rem"},children:["— ",n.length," sporcu"]})]})}),i&&n.map(t=>a.jsxs("div",{style:{padding:"10px 16px",borderTop:"1px solid rgba(255,255,255,0.04)",display:"flex",alignItems:"center",gap:12},children:[a.jsx("input",{type:"number",value:t._index+1,min:1,max:m.length,onChange:s=>G(t._index,s.target.value),style:{width:52,textAlign:"center",fontWeight:700,padding:"4px 6px",fontSize:"0.9rem"}}),a.jsxs("div",{style:{flex:1},children:[a.jsxs("div",{style:{fontWeight:700},children:[t.name," ",t.surname]}),a.jsx("div",{style:{fontSize:"0.78rem",color:"#64748b"},children:t.club})]}),a.jsx("button",{className:"btn btn-sm btn-outline",onClick:()=>L(t._index,-1),title:"Yukarı",children:a.jsx("i",{className:"material-icons-round",children:"arrow_upward"})}),a.jsx("button",{className:"btn btn-sm btn-outline",onClick:()=>L(t._index,1),title:"Aşağı",children:a.jsx("i",{className:"material-icons-round",children:"arrow_downward"})}),a.jsx("button",{className:"btn btn-sm btn-outline",onClick:()=>U(t._index),title:"Çoğalt",children:a.jsx("i",{className:"material-icons-round",children:"content_copy"})}),a.jsx("button",{className:"btn btn-sm btn-outline",style:{color:"#ef4444"},onClick:()=>q(t._index),title:"Sil",children:a.jsx("i",{className:"material-icons-round",children:"delete"})})]},t.id))]},e)})]})]})})]})}export{ie as default};
