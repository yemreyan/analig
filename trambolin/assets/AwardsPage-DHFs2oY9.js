import{u as ee,a as te,b as se,r as p,g as ae,c as y,d as v,o as A,j as t}from"./index-e2EOFVzz.js";import{h as ie,e as le,b as P,g as _,i as ne}from"./DataService-op7zCuwP.js";import{u as oe,a as re,r as K}from"./Rules-Bj9RDfCL.js";const Y=[{color:"#FFD700",label:"ALTIN",short:"1."},{color:"#C0C0C0",label:"GÜMÜŞ",short:"2."},{color:"#CD7F32",label:"BRONZ",short:"3."}],R=C=>Y[C-1]||null;function he(){const C=ee(),{getActiveCompId:q}=te(),{toast:E}=se(),[N,G]=p.useState([]),[g,I]=p.useState(()=>q()||""),[z,F]=p.useState({}),[j,W]=p.useState([]),[T,D]=p.useState({}),[f,O]=p.useState({}),[L,U]=p.useState(!1),w=oe(g),x=N.find(e=>e.id===g)||null;p.useEffect(()=>{(async()=>{try{const e=await ae(y(v,"trampolin_yarismalar/competitions")),s=Object.values(e.val()||{}).filter(l=>l&&l.id);s.sort((l,a)=>(a.createdAt||0)-(l.createdAt||0)),G(s),I(l=>{var a;return l||((a=s[0])==null?void 0:a.id)||""})}catch(e){E("Yarışmalar yüklenemedi: "+e.message,"error")}})()},[]),p.useEffect(()=>{if(!g){F({}),W([]),D({}),O({});return}U(!0);const e=[];return e.push(A(y(v,`trampolin_yarismalar/competitions/${g}/categories`),s=>{F(s.val()||{}),U(!1)})),e.push(A(y(v,`trampolin_yarismalar/competitions/${g}/athletes`),s=>W(Object.values(s.val()||{})))),e.push(A(y(v,`trampolin_yarismalar/competitions/${g}/pairs`),s=>D(s.val()||{}))),e.push(A(y(v,`trampolin_yarismalar/competitions/${g}/results`),s=>O(s.val()||{}))),()=>e.forEach(s=>s&&s())},[g]);const H=p.useMemo(()=>{const e={};return j.forEach(s=>{s!=null&&s.id&&(e[s.id]=s)}),e},[j]);function Z(e,s){return!e||!s?!1:[e.category,e.categoryId,e.catId].filter(l=>l!=null&&l!=="").some(l=>l===s.id||l===s.name)}function B(e){if(!e)return[];const s=K(w,e),l=[],a={};Object.values(T).forEach(i=>{i!=null&&i.id&&(a[i.id]=i)});const n=j.filter(i=>Z(i,e)),o=(i,r,m,M)=>{const k=m.r1||null,S=m.r2||null,{r1:V,r2:Q,total:X}=ne(k,S,s.scoringRule);l.push({name:i,club:r,r1:V,r2:Q,total:X,a:M,s1:k==null?void 0:k.status,s2:S==null?void 0:S.status})};if(e.type==="sync"){const i=new Set;n.forEach(r=>{if(r.pairId&&a[r.pairId]){if(i.has(r.pairId))return;i.add(r.pairId);const m=a[r.pairId],M=f[m.id]||f[m.athlete1Id]||f[m.athlete2Id]||{};o(le(m,H)||"—",m.club||r.club||"",M,r)}else o(_(r),P(r),f[r.uniqueId]||f[r.id]||{},r)})}else n.forEach(i=>{o(_(i),P(i),f[i.uniqueId]||f[i.id]||{},i)});const d=l.filter(i=>i.r1!=null||i.r2!=null).sort((i,r)=>r.total-i.total);let c=null,u=0;return d.forEach((i,r)=>{c!==null&&i.total===c?i.rank=u:(i.rank=r+1,u=i.rank,c=i.total)}),d}const h=p.useMemo(()=>{const e=Object.values(z),s=e.filter(a=>!(a.isFinal||a.id.endsWith("_final"))),l=a=>e.find(n=>(n.isFinal||n.id.endsWith("_final"))&&(n.parentCategoryId===a.id||n.id===`${a.id}_final`))||null;return s.map(a=>{const n=l(a),d=B(n||a).filter(i=>i.rank&&i.rank<=3),c=re(w,a);let u=[];if(c){const i=K(w,c);u=ie(B(c),{topN:i.teamTopN,minAthletes:i.teamMinAthletes,mode:i.teamMode,perRoutineMinAthletes:i.teamPerRoutineMinAthletes,routineCount:i.routineCount,scoringRule:i.teamScoringRule}).slice(0,3)}return{cat:a,fromFinal:!!n,podium:d,teams:u}}).filter(a=>a.podium.length>0||a.teams.length>0)},[z,j,T,f,w]),b=p.useMemo(()=>{const e={},s=(l,a,n)=>{const o=l||"Bilinmeyen";e[o]||(e[o]={club:o,g:0,s:0,b:0,bireysel:0,takim:0}),a===1?e[o].g++:a===2?e[o].s++:a===3&&e[o].b++,e[o][n]++};return h.forEach(({podium:l,teams:a})=>{l.forEach(n=>s(n.club,n.rank,"bireysel")),a.forEach((n,o)=>s(n.club,o+1,"takim"))}),Object.values(e).sort((l,a)=>a.g-l.g||a.s-l.s||a.b-l.b||l.club.localeCompare(a.club,"tr"))},[h]),$=p.useMemo(()=>({sporcu:h.reduce((e,s)=>e+s.podium.length,0),takim:h.reduce((e,s)=>e+s.teams.length,0),kulup:b.length}),[h,b]);function J(){if(h.length===0){E("Yazdırılacak derece yok.","warning");return}const e=d=>String(d??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[c]),s=d=>{const c=R(d);return`<span class="medal" style="background:${c?c.color:"#e2e8f0"}">${d}</span>`},l=h.map(({cat:d,fromFinal:c,podium:u,teams:i})=>`
            <div class="block">
                <div class="cat-row">
                    <h2>${e(d.name)}</h2>
                    <span class="src">${c?"FİNAL SONUCU":"ELEME SONUCU"}</span>
                </div>
                ${u.length?`
                <table>
                    <thead><tr>
                        <th class="c" style="width:52px">DERECE</th>
                        <th>AD SOYAD</th><th>KULÜP</th>
                        <th class="c" style="width:86px">PUAN</th>
                    </tr></thead>
                    <tbody>
                        ${u.map(r=>`
                            <tr>
                                <td class="c">${s(r.rank)}</td>
                                <td class="name-col">${e(r.name)}</td>
                                <td class="club-col">${e(r.club||"—")}</td>
                                <td class="score-col">${r.total.toFixed(3)}</td>
                            </tr>`).join("")}
                    </tbody>
                </table>`:""}
                ${i.length?`
                <div class="sub-title">TAKIM</div>
                <table>
                    <thead><tr>
                        <th class="c" style="width:52px">DERECE</th>
                        <th>KULÜP</th>
                        <th class="c" style="width:86px">PUAN</th>
                    </tr></thead>
                    <tbody>
                        ${i.map((r,m)=>`
                            <tr>
                                <td class="c">${s(m+1)}</td>
                                <td class="name-col">${e(r.club)}</td>
                                <td class="score-col">${r.teamTotal.toFixed(3)}</td>
                            </tr>`).join("")}
                    </tbody>
                </table>`:""}
            </div>`).join(""),a=`
            <div class="block">
                <div class="cat-row"><h2>KULÜP MADALYA TABLOSU</h2></div>
                <table>
                    <thead><tr>
                        <th class="c" style="width:46px">SIRA</th>
                        <th>KULÜP</th>
                        <th class="c" style="width:56px">ALTIN</th>
                        <th class="c" style="width:60px">GÜMÜŞ</th>
                        <th class="c" style="width:56px">BRONZ</th>
                        <th class="c" style="width:60px">TOPLAM</th>
                    </tr></thead>
                    <tbody>
                        ${b.map((d,c)=>`
                            <tr>
                                <td class="c rank-col">${c+1}</td>
                                <td class="name-col">${e(d.club)}</td>
                                <td class="c">${d.g}</td>
                                <td class="c">${d.s}</td>
                                <td class="c">${d.b}</td>
                                <td class="c total-col">${d.g+d.s+d.b}</td>
                            </tr>`).join("")}
                    </tbody>
                </table>
            </div>`,n=`<!doctype html>
<html lang="tr"><head><meta charset="utf-8">
<title>${e((x==null?void 0:x.name)||"Yarışma")} — Dereceler</title>
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;700;800;900&display=swap" rel="stylesheet">
<style>
  @page { size: A4; margin: 0; }
  body { font-family:'Outfit',sans-serif; margin:0; color:#1e293b;
         -webkit-print-color-adjust:exact; print-color-adjust:exact; background:#e2e8f0; }
  .page { width:210mm; min-height:297mm; padding:12mm; margin:0 auto 10px; background:#fff;
          box-sizing:border-box; display:flex; flex-direction:column; }
  .header { background:#E30613; color:#fff; padding:14px 18px; border-radius:12px;
            margin-bottom:16px; display:flex; align-items:center; gap:16px; }
  .logo { width:64px; height:64px; background:#fff; border-radius:50%; padding:4px; flex-shrink:0; object-fit:contain; }
  .comp-name { font-size:15px; font-weight:800; text-transform:uppercase; letter-spacing:1px; opacity:.95; }
  .cat-name  { font-size:26px; font-weight:900; margin:2px 0 0; }
  .sub-header{ font-size:12px; font-weight:700; letter-spacing:3px; opacity:.9; margin-top:2px; }

  .block { margin-bottom:16px; page-break-inside:avoid; }
  .cat-row { display:flex; align-items:baseline; gap:10px; border-bottom:2px solid #303868;
             padding-bottom:4px; margin-bottom:6px; }
  .cat-row h2 { font-size:14px; font-weight:900; margin:0; color:#303868; text-transform:uppercase; }
  .src { font-size:9px; font-weight:700; letter-spacing:1px; color:#E30613; }
  .sub-title { font-size:10px; font-weight:800; letter-spacing:2px; color:#64748b; margin:8px 0 3px; }

  table { width:100%; border-collapse:collapse; font-size:11.5px; }
  thead th { background:#303868; color:#fff; padding:5px 9px; text-align:left;
             font-size:9px; letter-spacing:1px; font-weight:800; }
  thead th.c { text-align:center; }
  tbody td { padding:5px 9px; border-bottom:1px solid #e2e8f0; }
  tbody td.c { text-align:center; }
  tbody tr:nth-child(even) { background:#f8fafc; }
  .medal { display:inline-block; width:20px; height:20px; line-height:20px; border-radius:50%;
           font-weight:800; font-size:11px; color:#0f172a; }
  .name-col { font-weight:700; }
  .club-col { color:#64748b; font-size:10.5px; }
  .score-col, .total-col { text-align:center; font-family:'Space Mono',monospace; font-weight:700; }
  .rank-col { font-family:'Space Mono',monospace; font-weight:800; color:#303868; }

  .footer { margin-top:auto; padding-top:12px; border-top:1px solid #e2e8f0;
            display:flex; justify-content:space-between; font-size:9px; color:#94a3b8; font-weight:500; }
  .signs { display:flex; justify-content:space-between; gap:24px; margin-top:22px; }
  .sign { flex:1; text-align:center; font-size:10px; color:#475569; font-weight:600; }
  .sign span { display:block; border-top:1px solid #94a3b8; margin-bottom:5px; height:32px; }
  @media print { body { background:#fff; } .page { margin:0; } }
</style></head>
<body>
  <div class="page">
    <div class="header">
      <img class="logo" src="${window.location.origin}/trambolin/tcf-logo.png" alt="TCF" />
      <div>
        <div class="comp-name">${e((x==null?void 0:x.name)||"")}</div>
        <h1 class="cat-name">DERECE ALAN SPORCULAR</h1>
        <div class="sub-header">RESMÎ DERECE LİSTESİ</div>
      </div>
    </div>
    ${l}
    ${a}
    <div class="footer">
      <div>© ${new Date().getFullYear()} Gymexa Score · Türkiye Cimnastik Federasyonu</div>
      <div>Oluşturulma: ${new Date().toLocaleString("tr-TR")}</div>
    </div>
    <div class="signs">
      <div class="sign"><span></span>Başhakem</div>
      <div class="sign"><span></span>Üst Jüri</div>
      <div class="sign"><span></span>Teknik Sorumlu</div>
    </div>
  </div>
<script>window.onload=function(){setTimeout(function(){window.print();},400);};<\/script>
</body></html>`,o=window.open("","_blank");if(!o){E("Açılır pencere engellendi — tarayıcı iznini kontrol edin.","error");return}o.document.write(n),o.document.close()}return t.jsxs("div",{style:{display:"flex",flexDirection:"column",minHeight:"100vh"},children:[t.jsxs("nav",{className:"topnav",style:{position:"sticky",top:0,zIndex:10},children:[t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:16,minWidth:0},children:[t.jsxs("button",{className:"btn btn-sm",style:{background:"rgba(255,255,255,0.15)",color:"white"},onClick:()=>C("/panel"),children:[t.jsx("i",{className:"material-icons-round",children:"arrow_back"})," Panel"]}),t.jsxs("div",{style:{minWidth:0},children:[t.jsx("div",{style:{color:"white",fontWeight:700},children:"DERECELER"}),t.jsx("div",{style:{color:"#94a3b8",fontSize:"0.78rem"},children:"Derece alan sporcular ve kulüpleri"})]})]}),t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10,flexWrap:"wrap"},children:[t.jsxs("select",{value:g,onChange:e=>I(e.target.value),style:{padding:"8px 12px",borderRadius:8,minWidth:220,maxWidth:340,background:"rgba(0,0,0,0.25)",color:"white",fontWeight:600,border:"1px solid rgba(255,255,255,0.18)",fontFamily:"'Outfit', sans-serif"},children:[N.length===0&&t.jsx("option",{value:"",children:"Yarışma yok"}),N.map(e=>t.jsx("option",{value:e.id,children:e.name||e.id},e.id))]}),t.jsxs("button",{className:"btn btn-sm",style:{background:"linear-gradient(135deg, #E02828, #A01C1C)",color:"white"},onClick:J,disabled:h.length===0,children:[t.jsx("i",{className:"material-icons-round",children:"picture_as_pdf"})," PDF"]})]})]}),t.jsxs("div",{className:"container",children:[t.jsx("div",{style:{display:"flex",gap:12,flexWrap:"wrap",marginBottom:16},children:[["emoji_events","Derece alan sporcu",$.sporcu,"#FFD700"],["groups","Derece alan takım",$.takim,"#7C87D8"],["apartment","Madalya alan kulüp",$.kulup,"#10b981"]].map(([e,s,l,a])=>t.jsxs("div",{style:{flex:"1 1 180px",background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:12,padding:"12px 16px",display:"flex",alignItems:"center",gap:12},children:[t.jsx("i",{className:"material-icons-round",style:{color:a,fontSize:28},children:e}),t.jsxs("div",{children:[t.jsx("div",{style:{fontFamily:"'Space Mono',monospace",fontSize:"1.5rem",fontWeight:700,color:"#f1f5f9",lineHeight:1.1},children:l}),t.jsx("div",{style:{fontSize:"0.75rem",color:"#64748b",fontWeight:600},children:s})]})]},s))}),L&&t.jsx("div",{className:"card",children:t.jsx("div",{className:"card-body text-center text-muted",style:{padding:40},children:"Yükleniyor..."})}),!L&&h.length===0&&t.jsx("div",{className:"card",children:t.jsx("div",{className:"card-body text-center text-muted",style:{padding:40},children:"Bu yarışmada henüz derece oluşmamış."})}),h.map(({cat:e,fromFinal:s,podium:l,teams:a})=>t.jsxs("div",{className:"card",style:{marginBottom:14},children:[t.jsxs("div",{className:"card-header",style:{display:"flex",alignItems:"center",gap:10,flexWrap:"wrap"},children:[t.jsx("h3",{className:"card-title",style:{margin:0},children:e.name}),t.jsx("span",{style:{fontSize:"0.7rem",fontWeight:700,letterSpacing:1,padding:"2px 8px",borderRadius:4,background:s?"rgba(224,40,40,0.15)":"rgba(148,163,184,0.15)",color:s?"#E02828":"#94a3b8"},children:s?"FİNAL SONUCU":"ELEME SONUCU"})]}),t.jsxs("div",{className:"card-body",style:{padding:"10px 16px 16px"},children:[l.map(n=>{var d;const o=R(n.rank);return t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:14,padding:"10px 12px",borderRadius:10,marginBottom:6,background:`${o.color}0D`,border:`1px solid ${o.color}33`},children:[t.jsx("div",{style:{width:34,height:34,borderRadius:9,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",background:o.color,color:"#0f172a",fontFamily:"'Space Mono',monospace",fontWeight:700},children:n.rank}),t.jsxs("div",{style:{minWidth:0,flex:1},children:[t.jsx("div",{style:{fontWeight:800,color:"#f1f5f9",fontSize:"1rem",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:n.name}),t.jsx("div",{style:{fontSize:"0.8rem",color:"#94a3b8",marginTop:1},children:n.club||"—"})]}),t.jsx("div",{style:{fontFamily:"'Space Mono',monospace",fontWeight:700,fontSize:"1.15rem",color:o.color,flexShrink:0},children:n.total.toFixed(3)})]},`${((d=n.a)==null?void 0:d.id)||n.name}-${n.rank}`)}),a.length>0&&t.jsxs(t.Fragment,{children:[t.jsx("div",{style:{fontSize:"0.7rem",letterSpacing:2,fontWeight:800,color:"#64748b",margin:"14px 0 6px"},children:"TAKIM"}),a.map((n,o)=>{const d=R(o+1);return t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:14,padding:"9px 12px",borderRadius:10,marginBottom:6,background:"rgba(255,255,255,0.02)",border:`1px solid ${d.color}33`},children:[t.jsx("div",{style:{width:28,height:28,borderRadius:8,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",background:d.color,color:"#0f172a",fontFamily:"'Space Mono',monospace",fontWeight:700,fontSize:"0.85rem"},children:o+1}),t.jsx("div",{style:{flex:1,minWidth:0,fontWeight:700,color:"#e2e8f0",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:n.club}),t.jsx("div",{style:{fontFamily:"'Space Mono',monospace",fontWeight:700,color:"#A3ACD0",flexShrink:0},children:n.teamTotal.toFixed(3)})]},n.club)})]})]})]},e.id)),b.length>0&&t.jsxs("div",{className:"card",style:{marginBottom:24},children:[t.jsx("div",{className:"card-header",children:t.jsx("h3",{className:"card-title",children:"Kulüp Madalya Tablosu"})}),t.jsx("div",{className:"card-body",style:{padding:0},children:t.jsx("div",{className:"table-responsive",children:t.jsxs("table",{className:"table",children:[t.jsx("thead",{children:t.jsxs("tr",{children:[t.jsx("th",{style:{width:56},children:"Sıra"}),t.jsx("th",{children:"Kulüp"}),t.jsx("th",{style:{width:80,textAlign:"center"},children:"Altın"}),t.jsx("th",{style:{width:80,textAlign:"center"},children:"Gümüş"}),t.jsx("th",{style:{width:80,textAlign:"center"},children:"Bronz"}),t.jsx("th",{style:{width:90,textAlign:"center"},children:"Toplam"})]})}),t.jsx("tbody",{children:b.map((e,s)=>t.jsxs("tr",{children:[t.jsx("td",{style:{fontFamily:"'Space Mono',monospace",fontWeight:700,color:s<3?Y[s].color:"#64748b"},children:s+1}),t.jsxs("td",{style:{fontWeight:700},children:[e.club,t.jsxs("div",{style:{fontSize:"0.72rem",color:"#64748b",fontWeight:500},children:[e.bireysel," bireysel",e.takim?` · ${e.takim} takım`:""]})]}),[["g","#FFD700"],["s","#C0C0C0"],["b","#CD7F32"]].map(([l,a])=>t.jsx("td",{style:{textAlign:"center",fontFamily:"'Space Mono',monospace",fontWeight:700,color:e[l]?a:"#475569"},children:e[l]},l)),t.jsx("td",{style:{textAlign:"center",fontFamily:"'Space Mono',monospace",fontWeight:700,color:"#f1f5f9"},children:e.g+e.s+e.b})]},e.club))})]})})})]})]})]})}export{he as default};
