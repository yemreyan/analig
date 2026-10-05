import{u as Ae,a as Re,b as Ne,r as w,o as G,c as H,j as t,d as X}from"./index-e2EOFVzz.js";import{u as L,w as ue}from"./xlsx-BBWTpfDg.js";import{i as I,e as Z,h as pe,g as P,b as D,k as me,j as $e,l as Te}from"./DataService-op7zCuwP.js";import{u as Ie,r as Q,a as he}from"./Rules-Bj9RDfCL.js";function Me(){const ae=Ae(),{getActiveCompId:fe}=Re(),{toast:ee}=Ne(),R=fe(),N=Ie(R),[S,ge]=w.useState(null),[z,be]=w.useState({}),[$,xe]=w.useState([]),[J,ye]=w.useState({}),[g,ke]=w.useState({}),[U,oe]=w.useState(""),[E,le]=w.useState("ind"),[ie,ve]=w.useState(null);w.useEffect(()=>{if(!R){ae("/");return}const e=[],a=G(H(X,`trampolin_yarismalar/competitions/${R}/name`),l=>{l.exists()&&ge(y=>({...y,name:l.val()}))});e.push(a);const o=G(H(X,`trampolin_yarismalar/competitions/${R}/categories`),l=>{const y=l.val()||{};be(y),oe(u=>u||Object.keys(y)[0]||"")});e.push(o);const d=G(H(X,`trampolin_yarismalar/competitions/${R}/athletes`),l=>{xe(Object.values(l.val()||{}))});e.push(d);const c=G(H(X,`trampolin_yarismalar/competitions/${R}/pairs`),l=>{ye(l.val()||{})});e.push(c);const i=G(H(X,`trampolin_yarismalar/competitions/${R}/results`),l=>{ke(l.val()||{}),ve(new Date)});return e.push(i),()=>e.forEach(l=>l&&l())},[R]);const h=z[U]||null,re=Q(N,h),C=h?re.scoringRule:N.flow.defaultScoringRule,K=re.routineCount>=2,W=(h==null?void 0:h.type)==="sync",B=w.useMemo(()=>{const e={};return $.forEach(a=>{a!=null&&a.id&&(e[a.id]=a)}),e},[$]);function V(e,a){return!e||!a?!1:[e.category,e.categoryId,e.catId].filter(d=>d!=null&&d!=="").some(d=>d===a.id||d===a.name)}const F=w.useMemo(()=>{if(!h)return[];const e=[];if(W){const i={};Object.values(J).forEach(u=>{u!=null&&u.id&&(i[u.id]=u)});const l=$.filter(u=>V(u,h)),y=new Set;l.forEach(u=>{if(u.pairId&&i[u.pairId]){if(y.has(u.pairId))return;y.add(u.pairId);const r=i[u.pairId],m=g[r.id]||g[r.athlete1Id]||g[r.athlete2Id]||{},n=m.r1||null,s=m.r2||null,{r1:p,r2:k,total:v}=I(n,s,C);e.push({a:{id:r.id,name:Z(r,B),surname:"",club:r.club||u.club||"",isPair:!0,pairName:Z(r,B)},r1:p,r2:k,total:v,r1d:n,r2d:s,s1:n==null?void 0:n.status,s2:s==null?void 0:s.status})}else{const r=g[u.uniqueId]||g[u.id]||{},m=r.r1||null,n=r.r2||null,{r1:s,r2:p,total:k}=I(m,n,C);e.push({a:u,r1:s,r2:p,total:k,r1d:m,r2d:n,s1:m==null?void 0:m.status,s2:n==null?void 0:n.status})}})}else $.filter(l=>V(l,h)).forEach(l=>{const y=g[l.uniqueId]||g[l.id]||{},u=y.r1||null,r=y.r2||null,{r1:m,r2:n,total:s}=I(u,r,C);e.push({a:l,r1:m,r2:n,total:s,r1d:u,r2d:r,s1:u==null?void 0:u.status,s2:r==null?void 0:r.status})});const a=e.filter(i=>i.r1!=null||i.r2!=null),o=e.filter(i=>i.r1==null&&i.r2==null);a.sort((i,l)=>l.total-i.total);let d=null,c=0;return a.forEach((i,l)=>{d!==null&&i.total===d?i.rank=c:(i.rank=l+1,c=i.rank,d=i.total)}),o.forEach(i=>{i.rank=null}),[...a,...o]},[$,B,J,g,h,C,W]);function Se(e){const a=Q(N,e),o=e.type==="sync",d=[],c={};Object.values(J).forEach(n=>{n!=null&&n.id&&(c[n.id]=n)});const i=$.filter(n=>V(n,e)),l=(n,s,p,k)=>{const v=p.r1||null,j=p.r2||null,{r1:b,r2:x,total:A}=I(v,j,a.scoringRule);d.push({name:n,club:s,r1:b,r2:x,total:A,a:k,s1:v==null?void 0:v.status,s2:j==null?void 0:j.status})};if(o){const n=new Set;i.forEach(s=>{if(s.pairId&&c[s.pairId]){if(n.has(s.pairId))return;n.add(s.pairId);const p=c[s.pairId],k=g[p.id]||g[p.athlete1Id]||g[p.athlete2Id]||{};l(Z(p,B)||"—",p.club||s.club||"",k,s)}else l(P(s),D(s),g[s.uniqueId]||g[s.id]||{},s)})}else i.forEach(n=>{l(P(n),D(n),g[n.uniqueId]||g[n.id]||{},n)});const y=d.filter(n=>n.r1!=null||n.r2!=null).sort((n,s)=>s.total-n.total),u=d.filter(n=>n.r1==null&&n.r2==null);let r=null,m=0;return y.forEach((n,s)=>{r!==null&&n.total===r?n.rank=m:(n.rank=s+1,m=n.rank,r=n.total)}),u.forEach(n=>{n.rank=null}),{rows:[...y,...u],cr:a}}const M=he(N,h),T=M?Q(N,M):null,q=!!M,te=w.useMemo(()=>q?pe(F,{topN:T.teamTopN,minAthletes:T.teamMinAthletes,mode:T.teamMode,perRoutineMinAthletes:T.teamPerRoutineMinAthletes,routineCount:T.routineCount,scoringRule:T.teamScoringRule}):[],[F,h,N,q,M==null?void 0:M.id]),_=(e,a)=>me(e,a,"-");function ce(e){if(!e||$e(e.status))return null;const a=[];return e.d!=null&&a.push(`D:${Number(e.d).toFixed(1)}`),e.e!=null&&a.push(`E:${Number(e.e).toFixed(2)}`),e.t!=null&&e.t>0&&a.push(`T:${Number(e.t).toFixed(3)}`),e.s!=null&&e.s>0&&a.push(`S:${Number(e.sRaw??e.s).toFixed(2)}`),e.h!=null&&e.h>0&&a.push(`H:${Number(e.h).toFixed(2)}`),e.p!=null&&e.p>0&&a.push(`P:-${Number(e.p).toFixed(1)}`),a.join("  ")}function je(){if(!h)return;const e=K?["Sıra","Ad Soyad","Kulüp","R1","R2","Toplam"]:["Sıra","Ad Soyad","Kulüp","R1","Toplam"],a=F.map(c=>[c.rank??"—",c.a.pairName||P(c.a),D(c.a)||c.a.club||"",_(c.r1,c.s1),...K?[_(c.r2,c.s2)]:[],c.rank!=null?c.total.toFixed(3):"—"]),o=L.aoa_to_sheet([e,...a]),d=L.book_new();L.book_append_sheet(d,o,h.name.substring(0,30)),ue(d,`${h.name}_Sonuclar.xlsx`)}function we(){const e=L.book_new();Object.values(z).forEach(a=>{const o=Te(a,N.flow),d=a.type==="sync",c=[["Sıra","Ad Soyad","Kulüp","R1","R2","Toplam"]],i=[],l={};Object.values(J).forEach(s=>{s!=null&&s.id&&(l[s.id]=s)});const y=$.filter(s=>V(s,a));if(d){const s=new Set;y.forEach(p=>{var k,v,j,b;if(p.pairId&&l[p.pairId]){if(s.has(p.pairId))return;s.add(p.pairId);const x=l[p.pairId],A=g[x.id]||g[x.athlete1Id]||g[x.athlete2Id]||{},{r1:Y,r2:f,total:O}=I(A.r1,A.r2,o);i.push({name:Z(x,B),club:x.club||p.club||"",r1:Y,r2:f,total:O,s1:(k=A.r1)==null?void 0:k.status,s2:(v=A.r2)==null?void 0:v.status})}else{const x=g[p.uniqueId]||g[p.id]||{},{r1:A,r2:Y,total:f}=I(x.r1,x.r2,o);i.push({name:P(p),club:D(p),r1:A,r2:Y,total:f,s1:(j=x.r1)==null?void 0:j.status,s2:(b=x.r2)==null?void 0:b.status})}})}else y.forEach(s=>{var b,x;const p=g[s.uniqueId]||g[s.id]||{},{r1:k,r2:v,total:j}=I(p.r1,p.r2,o);i.push({name:P(s),club:D(s),r1:k,r2:v,total:j,s1:(b=p.r1)==null?void 0:b.status,s2:(x=p.r2)==null?void 0:x.status})});const u=i.filter(s=>s.r1!=null||s.r2!=null).sort((s,p)=>p.total-s.total),r=i.filter(s=>s.r1==null&&s.r2==null);let m=null,n=0;if(u.forEach((s,p)=>{m!==null&&s.total===m?s.rank=n:(s.rank=p+1,n=s.rank,m=s.total)}),r.forEach(s=>{s.rank=null}),[...u,...r].forEach(s=>c.push([s.rank??"—",s.name,s.club,_(s.r1,s.s1),_(s.r2,s.s2),s.rank==null?"—":s.total.toFixed(3)])),c.length>1){const s=L.aoa_to_sheet(c);L.book_append_sheet(e,s,a.name.substring(0,30))}}),ue(e,`${(S==null?void 0:S.name)||"Yarisma"}_Tum_Sonuclar.xlsx`)}function de(e){const a=e==="current"?U&&z[U]?[z[U]]:[]:Object.values(z);if(a.length===0){ee("Yazdırılacak kategori yok.","warning");return}const o=r=>String(r??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[m]),d=(r,m)=>me(r,m,"-"),c=r=>r===1?"🥇":r===2?"🥈":r===3?"🥉":r??"—",i=(r,m,n,s)=>`
            <div class="page">
                <div class="header">
                    <img class="logo" src="${window.location.origin}/trambolin/tcf-logo.png" alt="TCF" />
                    <div class="head-text">
                        <div class="comp-name">${o((S==null?void 0:S.name)||"")}</div>
                        <h1 class="cat-name">${o(r.name)}</h1>
                        <div class="sub-header">${o(m)}</div>
                    </div>
                </div>
                ${s?`<div class="note">${o(s)}</div>`:""}
                ${n}
                <div class="footer">
                    <div>© ${new Date().getFullYear()} Gymexa Score · Türkiye Cimnastik Federasyonu</div>
                    <div>Oluşturulma: ${new Date().toLocaleString("tr-TR")}</div>
                </div>
                <div class="signs">
                    <div class="sign"><span></span>Başhakem</div>
                    <div class="sign"><span></span>Üst Jüri</div>
                    <div class="sign"><span></span>Teknik Sorumlu</div>
                </div>
            </div>`;let l="";if(a.forEach(r=>{const{rows:m,cr:n}=Se(r);if(m.length===0)return;const s=n.routineCount>=2,p=n.scoringRule==="max"?"GEÇERLİ":"TOPLAM",k=n.scoringRule==="max"?"Geçerli puan = MAX(1. Seri, 2. Seri)":"Toplam = 1. Seri + 2. Seri",v=`
                <table>
                    <thead>
                        <tr>
                            <th class="c" style="width:52px">SIRA</th>
                            <th>AD SOYAD</th>
                            <th>KULÜP</th>
                            <th class="c" style="width:82px">1. SERİ</th>
                            ${s?'<th class="c" style="width:82px">2. SERİ</th>':""}
                            <th class="c" style="width:92px">${p}</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${m.map(f=>`
                            <tr class="${f.rank===1?"gold":f.rank===2?"silver":f.rank===3?"bronze":""}">
                                <td class="rank-col">${c(f.rank)}</td>
                                <td class="name-col">${o(f.name)}</td>
                                <td class="club-col">${o(f.club||"—")}</td>
                                <td class="score-col">${d(f.r1,f.s1)}</td>
                                ${s?`<td class="score-col">${d(f.r2,f.s2)}</td>`:""}
                                <td class="total-col">${f.rank==null?"—":f.total.toFixed(3)}</td>
                            </tr>`).join("")}
                    </tbody>
                </table>`;l+=i(r,"RESMÎ SONUÇ LİSTESİ — BİREYSEL",v,k);const j=he(N,r);if(!j)return;const b=Q(N,j),x=pe(m,{topN:b.teamTopN,minAthletes:b.teamMinAthletes,mode:b.teamMode,perRoutineMinAthletes:b.teamPerRoutineMinAthletes,routineCount:b.routineCount,scoringRule:b.teamScoringRule});if(x.length===0)return;const A=(x[0].perRoutine?`Takım puanı = her serinin en iyi ${b.teamTopN} puanı toplanır · en az ${b.teamMinAthletes} sporcu`:b.teamScoringRule==="max"?`Takım puanı = en iyi ${b.teamTopN} sporcunun EN YÜKSEK serisi · en az ${b.teamMinAthletes} sporcu`:`Takım puanı = en iyi ${b.teamTopN} sporcunun toplamı · en az ${b.teamMinAthletes} sporcu`)+" · Üstü çizili puanlar takım toplamına girmez",Y=`
                <table>
                    <thead>
                        <tr>
                            <th class="c" style="width:48px">SIRA</th>
                            <th style="width:150px">KULÜP</th>
                            ${x[0].routines.map(f=>`<th>${f.label.toUpperCase()} — PUANA SAYILANLAR</th>`).join("")}
                            <th class="c" style="width:84px">TOPLAM</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${x.map((f,O)=>`
                            <tr class="${O===0?"gold":O===1?"silver":O===2?"bronze":""}">
                                <td class="rank-col">${c(O+1)}</td>
                                <td class="name-col">${o(f.club)}<div class="club-col">${f.members.length} sporcu</div></td>
                                ${f.routines.map(se=>`
                                    <td class="picks">
                                        ${se.picks.length===0?'<span class="muted">—</span>':se.picks.map(ne=>`<div class="${ne.counted?"":"off"}"><span>${o(ne.name)}</span><b>${ne.score.toFixed(3)}</b></div>`).join("")}
                                        <div class="sub"><span>Ara toplam</span><b>${se.subtotal.toFixed(3)}</b></div>
                                    </td>`).join("")}
                                <td class="total-col">${f.teamTotal.toFixed(3)}</td>
                            </tr>`).join("")}
                    </tbody>
                </table>`;l+=i(r,"RESMÎ SONUÇ LİSTESİ — TAKIM",Y,A)}),!l){ee("Yazdırılacak sonuç bulunamadı.","warning");return}const y=`<!doctype html>
<html lang="tr"><head><meta charset="utf-8">
<title>${o((S==null?void 0:S.name)||"Sonuçlar")} — TCF Resmî Sonuçlar</title>
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
  .sub-header{ font-size:11px; opacity:.9; margin-top:3px; font-weight:600; letter-spacing:1px; }

  .note { font-size:10px; color:#64748b; margin-bottom:8px; font-weight:600; }

  table { width:100%; border-collapse:separate; border-spacing:0 5px; }
  th { text-align:left; font-size:9.5px; font-weight:800; color:#64748b; text-transform:uppercase;
       letter-spacing:.8px; padding:0 10px 7px; border-bottom:2px solid #e2e8f0; }
  th.c { text-align:center; }
  td { background:#f8fafc; padding:8px 10px; font-size:12px; font-weight:600; color:#334155;
       border:1px solid #e2e8f0; border-width:1px 0; }
  tr td:first-child { border-left:1px solid #e2e8f0; border-radius:8px 0 0 8px; }
  tr td:last-child  { border-right:1px solid #e2e8f0; border-radius:0 8px 8px 0; }

  tr.gold   td { background:#fffbeb; border-color:#fcd34d; }
  tr.silver td { background:#f8fafc; border-color:#cbd5e1; }
  tr.bronze td { background:#fff7ed; border-color:#fdba74; }

  .rank-col  { font-weight:900; color:#E30613; font-size:14px; text-align:center; }
  .name-col  { font-size:13px; font-weight:800; color:#0f172a; }
  .club-col  { font-weight:500; color:#64748b; font-size:10.5px; text-transform:uppercase; }
  .score-col { text-align:center; font-family:'Space Mono',monospace; font-size:12px; }
  .total-col { text-align:center; font-weight:900; color:#000; font-size:13px; background:#eef2f7; }
  .picks { font-size:10.5px; }
  .picks > div { display:flex; justify-content:space-between; gap:8px; padding:1px 0; }
  .picks > div > b { font-family:'Space Mono',monospace; font-weight:700; color:#0f172a; }
  .picks .sub { margin-top:3px; padding-top:3px; border-top:1px solid #cbd5e1; font-weight:800; color:#E30613; }
  .picks .muted { color:#94a3b8; }
  /* Takım puanına sayılmayan sporcu: listede görünür ama üstü çizili */
  .picks > div.off, .picks > div.off > b { color:#94a3b8; text-decoration:line-through; }

  .footer { margin-top:auto; padding-top:14px; border-top:1px solid #e2e8f0;
            display:flex; justify-content:space-between; font-size:9px; color:#94a3b8; font-weight:500; }
  .signs { display:flex; justify-content:space-between; gap:24px; margin-top:26px; }
  .sign { flex:1; text-align:center; font-size:10px; color:#475569; font-weight:600; }
  .sign span { display:block; border-top:1px solid #94a3b8; margin-bottom:5px; height:34px; }

  @media print { body { background:#fff; } .page { margin:0; } }
</style></head>
<body>${l}<script>window.onload=function(){setTimeout(function(){window.print();},400);};<\/script></body></html>`,u=window.open("","_blank");if(!u){ee("Açılır pencere engellendi — tarayıcı iznini kontrol edin.","error");return}u.document.write(y),u.document.close()}return R?t.jsxs("div",{style:{minHeight:"100vh"},children:[t.jsxs("nav",{className:"topnav",style:{position:"sticky",top:0,zIndex:10},children:[t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:20},children:[t.jsx("button",{className:"btn btn-sm",style:{background:"rgba(255,255,255,0.15)",color:"white"},onClick:()=>ae("/panel"),children:t.jsx("i",{className:"material-icons-round",children:"arrow_back"})}),t.jsxs("div",{children:[t.jsx("div",{style:{color:"white",fontWeight:700},children:(S==null?void 0:S.name)||"—"}),t.jsxs("div",{style:{color:"#94a3b8",fontSize:"0.78rem",display:"flex",alignItems:"center",gap:6},children:[t.jsx("i",{className:"material-icons-round",style:{fontSize:12,color:"#10b981"},children:"fiber_manual_record"}),"CANLI — SONUÇ RAPORU",ie&&t.jsxs("span",{style:{color:"#475569"},children:["· ",ie.toLocaleTimeString("tr-TR")]})]})]})]}),t.jsxs("div",{style:{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"},children:[t.jsxs("select",{value:U,onChange:e=>oe(e.target.value),style:{minWidth:220},children:[t.jsx("option",{value:"",children:"Kategori seç..."}),Object.values(z).map(e=>t.jsx("option",{value:e.id,children:e.name},e.id))]}),t.jsxs("button",{className:"btn btn-outline btn-sm",onClick:je,disabled:!h,children:[t.jsx("i",{className:"material-icons-round",children:"download"})," Excel"]}),t.jsxs("button",{className:"btn btn-outline btn-sm",onClick:we,children:[t.jsx("i",{className:"material-icons-round",children:"file_download"})," Tümü"]}),t.jsxs("button",{className:"btn btn-sm",onClick:()=>de("current"),disabled:!h,style:{background:"#E30613",color:"white",opacity:h?1:.5},title:"Seçili kategorinin bireysel + takım sonuçları",children:[t.jsx("i",{className:"material-icons-round",children:"picture_as_pdf"})," PDF — Bu Kategori"]}),t.jsxs("button",{className:"btn btn-sm",onClick:()=>de("all"),style:{background:"#1e293b",color:"white"},title:"Tüm kategorilerin bireysel + takım sonuçları",children:[t.jsx("i",{className:"material-icons-round",children:"picture_as_pdf"})," PDF — Tümü"]})]})]}),t.jsxs("div",{className:"container",children:[t.jsxs("div",{style:{display:"flex",gap:8,marginBottom:16},children:[t.jsx("button",{className:"btn "+(E==="ind"?"btn-primary":"btn-outline"),onClick:()=>le("ind"),children:"GENEL TASNİF"}),q&&t.jsx("button",{className:"btn "+(E==="team"?"btn-primary":"btn-outline"),onClick:()=>le("team"),children:"TAKIM SIRALAMASI"})]}),t.jsxs("div",{className:"card",children:[t.jsxs("div",{className:"card-header flex-between",children:[t.jsxs("h3",{className:"card-title",style:{display:"flex",alignItems:"center",gap:10},children:[W&&t.jsx("i",{className:"material-icons-round",style:{color:"#c084fc",fontSize:20},children:"sync"}),(h==null?void 0:h.name)||"Kategori Seçin",h&&C==="max"&&t.jsx("span",{style:{fontSize:"0.75rem",background:"rgba(253,185,49,0.15)",color:"#fbbf24",padding:"2px 8px",borderRadius:4},children:"GEÇERLİ = MAX(R1,R2)"}),W&&t.jsx("span",{style:{fontSize:"0.75rem",background:"rgba(192,132,252,0.15)",color:"#c084fc",padding:"2px 8px",borderRadius:4},children:"SENKRONİZE"})]}),t.jsx("div",{className:"text-muted",style:{fontSize:"0.85rem"},children:E==="ind"?`${F.length} kayıt`:`${te.length} kulüp`})]}),t.jsxs("div",{className:"card-body",style:{padding:0},children:[!h&&t.jsx("div",{className:"text-center text-muted",style:{padding:40},children:"Lütfen kategori seçin"}),h&&E==="team"&&!q&&t.jsx("div",{className:"text-center text-muted",style:{padding:40},children:h.isFinal?"Finalde takım sıralaması yapılmaz — takım sonuçları eleme kategorisinde yer alır.":"Bu kategoride takım sıralaması yapılmaz."}),h&&E==="ind"&&t.jsx("div",{className:"table-responsive",children:t.jsxs("table",{className:"table",children:[t.jsx("thead",{children:t.jsxs("tr",{children:[t.jsx("th",{style:{width:56},children:"Sıra"}),t.jsx("th",{children:"Ad Soyad / Kulüp"}),t.jsx("th",{style:{width:130,textAlign:"right"},children:"R1"}),K&&t.jsx("th",{style:{width:130,textAlign:"right"},children:"R2"}),t.jsx("th",{style:{width:150,textAlign:"right"},children:C==="max"?"GEÇERLİ PUAN":"TOPLAM"})]})}),t.jsxs("tbody",{children:[F.length===0&&t.jsx("tr",{children:t.jsx("td",{colSpan:K?6:5,style:{textAlign:"center",padding:32,color:"#64748b"},children:W?"Henüz sonuç yok. Çift oluşturun ve puanlayın.":"Henüz yayınlanmış sonuç yok."})}),F.map((e,a)=>{const o=e.rank,d=o===1?"#FFD700":o===2?"#C0C0C0":o===3?"#CD7F32":"",c=o!=null&&o<=3,i=ce(e.r1d),l=ce(e.r2d);return t.jsxs("tr",{style:c?{background:`${d}08`}:{},children:[t.jsx("td",{style:{fontFamily:"'Space Mono',monospace",fontWeight:700,fontSize:"1.15rem",color:d||"inherit"},children:c?t.jsx("i",{className:"material-icons-round",style:{fontSize:22,color:d},children:o===1?"looks_one":o===2?"looks_two":"looks_3"}):o??"—"}),t.jsxs("td",{children:[t.jsxs("div",{style:{fontWeight:700,display:"flex",alignItems:"center",gap:6},children:[e.a.isPair&&t.jsx("i",{className:"material-icons-round",style:{fontSize:14,color:"#c084fc"},children:"sync"}),e.a.pairName||P(e.a)]}),t.jsx("div",{style:{fontSize:"0.78rem",color:"#64748b"},children:D(e.a)||e.a.club||"—"})]}),t.jsxs("td",{style:{textAlign:"right"},children:[t.jsx("div",{style:{fontFamily:"'Space Mono',monospace",fontWeight:700,fontSize:"1rem",color:e.s1?"#94a3b8":"inherit"},children:_(e.r1,e.s1)}),i&&t.jsx("div",{style:{fontSize:"0.62rem",color:"#475569",marginTop:2},children:i})]}),K&&t.jsxs("td",{style:{textAlign:"right"},children:[t.jsx("div",{style:{fontFamily:"'Space Mono',monospace",fontWeight:700,fontSize:"1rem",color:e.s2?"#94a3b8":"inherit"},children:_(e.r2,e.s2)}),l&&t.jsx("div",{style:{fontSize:"0.62rem",color:"#475569",marginTop:2},children:l})]}),t.jsx("td",{style:{textAlign:"right"},children:t.jsx("div",{style:{fontFamily:"'Space Mono',monospace",fontSize:"1.2rem",fontWeight:700,color:d||"#7C87D8"},children:e.total>0||e.r1!=null||e.r2!=null?e.total.toFixed(3):"-"})})]},e.a.id)})]})]})}),h&&E==="team"&&q&&t.jsxs("div",{children:[te.length===0&&t.jsxs("div",{style:{textAlign:"center",padding:40,color:"#64748b"},children:["Takım oluşturacak kadar sporcusu olan kulüp yok (en az ",T.teamMinAthletes," puan almış sporcu gerekir)."]}),t.jsx("div",{style:{display:"flex",flexDirection:"column",gap:12},children:te.map((e,a)=>{const o=a===0?"#FFD700":a===1?"#C0C0C0":a===2?"#CD7F32":"";return t.jsxs("div",{style:{background:o?`${o}0D`:"rgba(255,255,255,0.03)",border:`1px solid ${o?`${o}44`:"rgba(255,255,255,0.07)"}`,borderRadius:14,overflow:"hidden"},children:[t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:14,padding:"12px 18px",background:o?`${o}12`:"rgba(255,255,255,0.02)",borderBottom:"1px solid rgba(255,255,255,0.06)"},children:[t.jsx("div",{style:{width:34,height:34,borderRadius:9,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",background:o||"rgba(255,255,255,0.08)",color:o?"#0f172a":"#94a3b8",fontFamily:"'Space Mono',monospace",fontWeight:700,fontSize:"1rem"},children:a+1}),t.jsxs("div",{style:{flex:1,minWidth:0},children:[t.jsx("div",{style:{fontWeight:800,fontSize:"1.05rem",color:"#f1f5f9",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:e.club}),t.jsxs("div",{style:{fontSize:"0.75rem",color:"#64748b",marginTop:1},children:[e.members.length," sporcu kayıtlı"]})]}),t.jsxs("div",{style:{textAlign:"right"},children:[t.jsx("div",{style:{fontSize:"0.65rem",color:"#64748b",letterSpacing:1,fontWeight:700},children:"TAKIM TOPLAMI"}),t.jsx("div",{style:{fontFamily:"'Space Mono',monospace",fontSize:"1.5rem",fontWeight:700,color:o||"var(--accent-secondary)",lineHeight:1.1},children:e.teamTotal.toFixed(3)})]})]}),t.jsx("div",{style:{display:"grid",gridTemplateColumns:`repeat(${e.routines.length}, 1fr)`,gap:1,background:"rgba(255,255,255,0.06)"},children:e.routines.map(d=>t.jsxs("div",{style:{background:"rgba(10,14,32,0.55)",padding:"12px 18px"},children:[t.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:8},children:[t.jsx("span",{style:{fontSize:"0.7rem",fontWeight:800,letterSpacing:1.2,color:d.key==="r1"?"var(--accent-primary)":"var(--accent-secondary)"},children:d.label.toUpperCase()}),t.jsx("span",{style:{fontFamily:"'Space Mono',monospace",fontWeight:700,fontSize:"1rem",color:"#e2e8f0"},children:d.subtotal.toFixed(3)})]}),d.picks.length===0?t.jsx("div",{style:{color:"#475569",fontSize:"0.8rem"},children:"Bu seriden puan sayılmadı"}):d.picks.map((c,i)=>t.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",gap:10,padding:"3px 0",fontSize:"0.84rem",borderBottom:i<d.picks.length-1?"1px dashed rgba(255,255,255,0.06)":"none"},children:[t.jsx("span",{style:{color:c.counted?"#cbd5e1":"#64748b",textDecoration:c.counted?"none":"line-through",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:c.name}),t.jsx("span",{style:{fontFamily:"'Space Mono',monospace",color:c.counted?"#94a3b8":"#475569",textDecoration:c.counted?"none":"line-through",flexShrink:0},children:c.score.toFixed(3)})]},i))]},d.key))})]},e.club)})})]})]})]})]})]}):null}export{Me as default};
