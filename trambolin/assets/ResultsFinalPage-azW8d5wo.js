import{u as At,a as Rt,b as Nt,r as R,o as Y,c as G,j as e,d as H}from"./index-DO2N7r9l.js";import{u as L,w as ct}from"./xlsx-BBWTpfDg.js";import{i as M,e as Q,h as dt,g as P,b as D,k as ut,j as $t,l as It}from"./DataService-CR7xvf-2.js";import{u as Tt,r as pt}from"./Rules-DndYQ4Oq.js";function Ft(){const nt=At(),{getActiveCompId:ht}=Rt(),{toast:tt}=Nt(),T=ht(),z=Tt(T),[w,mt]=R.useState(null),[C,ft]=R.useState({}),[E,gt]=R.useState([]),[X,bt]=R.useState({}),[x,xt]=R.useState({}),[U,ot]=R.useState(""),[W,lt]=R.useState("ind"),[at,yt]=R.useState(null);R.useEffect(()=>{if(!T){nt("/");return}const t=[],o=Y(G(H,`trampolin_yarismalar/competitions/${T}/name`),i=>{i.exists()&&mt(y=>({...y,name:i.val()}))});t.push(o);const l=Y(G(H,`trampolin_yarismalar/competitions/${T}/categories`),i=>{const y=i.val()||{};ft(y),ot(u=>u||Object.keys(y)[0]||"")});t.push(l);const d=Y(G(H,`trampolin_yarismalar/competitions/${T}/athletes`),i=>{gt(Object.values(i.val()||{}))});t.push(d);const p=Y(G(H,`trampolin_yarismalar/competitions/${T}/pairs`),i=>{bt(i.val()||{})});t.push(p);const a=Y(G(H,`trampolin_yarismalar/competitions/${T}/results`),i=>{xt(i.val()||{}),yt(new Date)});return t.push(a),()=>t.forEach(i=>i&&i())},[T]);const f=C[U]||null,j=pt(z,f),F=f?j.scoringRule:z.flow.defaultScoringRule,K=j.routineCount>=2,B=(f==null?void 0:f.type)==="sync",q=R.useMemo(()=>{const t={};return E.forEach(o=>{o!=null&&o.id&&(t[o.id]=o)}),t},[E]);function J(t,o){return!t||!o?!1:[t.category,t.categoryId,t.catId].filter(d=>d!=null&&d!=="").some(d=>d===o.id||d===o.name)}const _=R.useMemo(()=>{if(!f)return[];const t=[];if(B){const a={};Object.values(X).forEach(u=>{u!=null&&u.id&&(a[u.id]=u)});const i=E.filter(u=>J(u,f)),y=new Set;i.forEach(u=>{if(u.pairId&&a[u.pairId]){if(y.has(u.pairId))return;y.add(u.pairId);const b=a[u.pairId],r=x[b.id]||x[b.athlete1Id]||x[b.athlete2Id]||{},h=r.r1||null,s=r.r2||null,{r1:c,r2:v,total:N}=M(h,s,F);t.push({a:{id:b.id,name:Q(b,q),surname:"",club:b.club||u.club||"",isPair:!0,pairName:Q(b,q)},r1:c,r2:v,total:N,r1d:h,r2d:s,s1:h==null?void 0:h.status,s2:s==null?void 0:s.status})}else{const b=x[u.uniqueId]||x[u.id]||{},r=b.r1||null,h=b.r2||null,{r1:s,r2:c,total:v}=M(r,h,F);t.push({a:u,r1:s,r2:c,total:v,r1d:r,r2d:h,s1:r==null?void 0:r.status,s2:h==null?void 0:h.status})}})}else E.filter(i=>J(i,f)).forEach(i=>{const y=x[i.uniqueId]||x[i.id]||{},u=y.r1||null,b=y.r2||null,{r1:r,r2:h,total:s}=M(u,b,F);t.push({a:i,r1:r,r2:h,total:s,r1d:u,r2d:b,s1:u==null?void 0:u.status,s2:b==null?void 0:b.status})});const o=t.filter(a=>a.r1!=null||a.r2!=null),l=t.filter(a=>a.r1==null&&a.r2==null);o.sort((a,i)=>i.total-a.total);let d=null,p=0;return o.forEach((a,i)=>{d!==null&&a.total===d?a.rank=p:(a.rank=i+1,p=a.rank,d=a.total)}),l.forEach(a=>{a.rank=null}),[...o,...l]},[E,q,X,x,f,F,B]),et=R.useMemo(()=>!f||!j.hasTeam?[]:dt(_,{topN:z.flow.teamTopN,minAthletes:j.teamMinAthletes,mode:j.teamMode,perRoutineMinAthletes:j.teamPerRoutineMinAthletes,routineCount:j.routineCount,scoringRule:j.scoringRule}),[_,f,z.flow.teamTopN,j.hasTeam,j.teamMode,j.teamMinAthletes,j.teamPerRoutineMinAthletes,j.routineCount]),O=(t,o)=>ut(t,o,"-");function it(t){if(!t||$t(t.status))return null;const o=[];return t.d!=null&&o.push(`D:${Number(t.d).toFixed(1)}`),t.e!=null&&o.push(`E:${Number(t.e).toFixed(2)}`),t.t!=null&&t.t>0&&o.push(`T:${Number(t.t).toFixed(3)}`),t.s!=null&&t.s>0&&o.push(`S:${Number(t.sRaw??t.s).toFixed(2)}`),t.h!=null&&t.h>0&&o.push(`H:${Number(t.h).toFixed(2)}`),t.p!=null&&t.p>0&&o.push(`P:-${Number(t.p).toFixed(1)}`),o.join("  ")}function kt(){if(!f)return;const t=K?["Sıra","Ad Soyad","Kulüp","R1","R2","Toplam"]:["Sıra","Ad Soyad","Kulüp","R1","Toplam"],o=_.map(p=>[p.rank??"—",p.a.pairName||P(p.a),D(p.a)||p.a.club||"",O(p.r1,p.s1),...K?[O(p.r2,p.s2)]:[],p.rank!=null?p.total.toFixed(3):"—"]),l=L.aoa_to_sheet([t,...o]),d=L.book_new();L.book_append_sheet(d,l,f.name.substring(0,30)),ct(d,`${f.name}_Sonuclar.xlsx`)}function vt(){const t=L.book_new();Object.values(C).forEach(o=>{const l=It(o,z.flow),d=o.type==="sync",p=[["Sıra","Ad Soyad","Kulüp","R1","R2","Toplam"]],a=[],i={};Object.values(X).forEach(s=>{s!=null&&s.id&&(i[s.id]=s)});const y=E.filter(s=>J(s,o));if(d){const s=new Set;y.forEach(c=>{var v,N,I,S;if(c.pairId&&i[c.pairId]){if(s.has(c.pairId))return;s.add(c.pairId);const k=i[c.pairId],A=x[k.id]||x[k.athlete1Id]||x[k.athlete2Id]||{},{r1:m,r2:n,total:g}=M(A.r1,A.r2,l);a.push({name:Q(k,q),club:k.club||c.club||"",r1:m,r2:n,total:g,s1:(v=A.r1)==null?void 0:v.status,s2:(N=A.r2)==null?void 0:N.status})}else{const k=x[c.uniqueId]||x[c.id]||{},{r1:A,r2:m,total:n}=M(k.r1,k.r2,l);a.push({name:P(c),club:D(c),r1:A,r2:m,total:n,s1:(I=k.r1)==null?void 0:I.status,s2:(S=k.r2)==null?void 0:S.status})}})}else y.forEach(s=>{var S,k;const c=x[s.uniqueId]||x[s.id]||{},{r1:v,r2:N,total:I}=M(c.r1,c.r2,l);a.push({name:P(s),club:D(s),r1:v,r2:N,total:I,s1:(S=c.r1)==null?void 0:S.status,s2:(k=c.r2)==null?void 0:k.status})});const u=a.filter(s=>s.r1!=null||s.r2!=null).sort((s,c)=>c.total-s.total),b=a.filter(s=>s.r1==null&&s.r2==null);let r=null,h=0;if(u.forEach((s,c)=>{r!==null&&s.total===r?s.rank=h:(s.rank=c+1,h=s.rank,r=s.total)}),b.forEach(s=>{s.rank=null}),[...u,...b].forEach(s=>p.push([s.rank??"—",s.name,s.club,O(s.r1,s.s1),O(s.r2,s.s2),s.rank==null?"—":s.total.toFixed(3)])),p.length>1){const s=L.aoa_to_sheet(p);L.book_append_sheet(t,s,o.name.substring(0,30))}}),ct(t,`${(w==null?void 0:w.name)||"Yarisma"}_Tum_Sonuclar.xlsx`)}function rt(t){const o=t==="current"?U&&C[U]?[C[U]]:[]:Object.values(C);if(o.length===0){tt("Yazdırılacak kategori yok.","warning");return}const l=r=>String(r??"").replace(/[&<>"']/g,h=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[h]),d=(r,h)=>ut(r,h,"-"),p=r=>r===1?"🥇":r===2?"🥈":r===3?"🥉":r??"—";function a(r){const h=pt(z,r),s=r.type==="sync",c=[],v={};Object.values(X).forEach(n=>{n!=null&&n.id&&(v[n.id]=n)});const N=E.filter(n=>J(n,r)),I=(n,g,$,st)=>{const V=$.r1||null,Z=$.r2||null,{r1:jt,r2:St,total:wt}=M(V,Z,h.scoringRule);c.push({name:n,club:g,r1:jt,r2:St,total:wt,a:st,s1:V==null?void 0:V.status,s2:Z==null?void 0:Z.status})};if(s){const n=new Set;N.forEach(g=>{if(g.pairId&&v[g.pairId]){if(n.has(g.pairId))return;n.add(g.pairId);const $=v[g.pairId],st=x[$.id]||x[$.athlete1Id]||x[$.athlete2Id]||{};I(Q($,q)||"—",$.club||g.club||"",st,g)}else I(P(g),D(g),x[g.uniqueId]||x[g.id]||{},g)})}else N.forEach(n=>{I(P(n),D(n),x[n.uniqueId]||x[n.id]||{},n)});const S=c.filter(n=>n.r1!=null||n.r2!=null).sort((n,g)=>g.total-n.total),k=c.filter(n=>n.r1==null&&n.r2==null);let A=null,m=0;return S.forEach((n,g)=>{A!==null&&n.total===A?n.rank=m:(n.rank=g+1,m=n.rank,A=n.total)}),k.forEach(n=>{n.rank=null}),{rows:[...S,...k],cr:h}}const i=(r,h,s,c)=>`
            <div class="page">
                <div class="header">
                    <img class="logo" src="${window.location.origin}/trambolin/tcf-logo.png" alt="TCF" />
                    <div class="head-text">
                        <div class="comp-name">${l((w==null?void 0:w.name)||"")}</div>
                        <h1 class="cat-name">${l(r.name)}</h1>
                        <div class="sub-header">${l(h)}</div>
                    </div>
                </div>
                ${c?`<div class="note">${l(c)}</div>`:""}
                ${s}
                <div class="footer">
                    <div>TCF TRAMBOLİN CİMNASTİK SİSTEMİ</div>
                    <div>Oluşturulma: ${new Date().toLocaleString("tr-TR")}</div>
                </div>
                <div class="signs">
                    <div class="sign"><span></span>Başhakem</div>
                    <div class="sign"><span></span>Üst Jüri</div>
                    <div class="sign"><span></span>Teknik Sorumlu</div>
                </div>
            </div>`;let y="";if(o.forEach(r=>{const{rows:h,cr:s}=a(r);if(h.length===0)return;const c=s.routineCount>=2,v=s.scoringRule==="max"?"GEÇERLİ":"TOPLAM",N=s.scoringRule==="max"?"Geçerli puan = MAX(1. Seri, 2. Seri)":"Toplam = 1. Seri + 2. Seri",I=`
                <table>
                    <thead>
                        <tr>
                            <th class="c" style="width:52px">SIRA</th>
                            <th>AD SOYAD</th>
                            <th>KULÜP</th>
                            <th class="c" style="width:82px">1. SERİ</th>
                            ${c?'<th class="c" style="width:82px">2. SERİ</th>':""}
                            <th class="c" style="width:92px">${v}</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${h.map(m=>`
                            <tr class="${m.rank===1?"gold":m.rank===2?"silver":m.rank===3?"bronze":""}">
                                <td class="rank-col">${p(m.rank)}</td>
                                <td class="name-col">${l(m.name)}</td>
                                <td class="club-col">${l(m.club||"—")}</td>
                                <td class="score-col">${d(m.r1,m.s1)}</td>
                                ${c?`<td class="score-col">${d(m.r2,m.s2)}</td>`:""}
                                <td class="total-col">${m.rank==null?"—":m.total.toFixed(3)}</td>
                            </tr>`).join("")}
                    </tbody>
                </table>`;if(y+=i(r,"RESMÎ SONUÇ LİSTESİ — BİREYSEL",I,N),!s.hasTeam)return;const S=dt(h,{topN:z.flow.teamTopN,minAthletes:s.teamMinAthletes,mode:s.teamMode,perRoutineMinAthletes:s.teamPerRoutineMinAthletes,routineCount:s.routineCount,scoringRule:s.scoringRule});if(S.length===0)return;const k=S[0].perRoutine?`Takım puanı = her serinin en iyi ${z.flow.teamTopN} puanı toplanır · en az ${s.teamMinAthletes} sporcu`:`Takım puanı = en iyi ${z.flow.teamTopN} sporcunun toplamı · en az ${s.teamMinAthletes} sporcu`,A=`
                <table>
                    <thead>
                        <tr>
                            <th class="c" style="width:48px">SIRA</th>
                            <th style="width:150px">KULÜP</th>
                            ${S[0].routines.map(m=>`<th>${m.label.toUpperCase()} — PUANA SAYILANLAR</th>`).join("")}
                            <th class="c" style="width:84px">TOPLAM</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${S.map((m,n)=>`
                            <tr class="${n===0?"gold":n===1?"silver":n===2?"bronze":""}">
                                <td class="rank-col">${p(n+1)}</td>
                                <td class="name-col">${l(m.club)}<div class="club-col">${m.members.length} sporcu</div></td>
                                ${m.routines.map(g=>`
                                    <td class="picks">
                                        ${g.picks.length===0?'<span class="muted">—</span>':g.picks.map($=>`<div><span>${l($.name)}</span><b>${$.score.toFixed(3)}</b></div>`).join("")}
                                        <div class="sub"><span>Ara toplam</span><b>${g.subtotal.toFixed(3)}</b></div>
                                    </td>`).join("")}
                                <td class="total-col">${m.teamTotal.toFixed(3)}</td>
                            </tr>`).join("")}
                    </tbody>
                </table>`;y+=i(r,"RESMÎ SONUÇ LİSTESİ — TAKIM",A,k)}),!y){tt("Yazdırılacak sonuç bulunamadı.","warning");return}const u=`<!doctype html>
<html lang="tr"><head><meta charset="utf-8">
<title>${l((w==null?void 0:w.name)||"Sonuçlar")} — TCF Resmî Sonuçlar</title>
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

  .footer { margin-top:auto; padding-top:14px; border-top:1px solid #e2e8f0;
            display:flex; justify-content:space-between; font-size:9px; color:#94a3b8; font-weight:500; }
  .signs { display:flex; justify-content:space-between; gap:24px; margin-top:26px; }
  .sign { flex:1; text-align:center; font-size:10px; color:#475569; font-weight:600; }
  .sign span { display:block; border-top:1px solid #94a3b8; margin-bottom:5px; height:34px; }

  @media print { body { background:#fff; } .page { margin:0; } }
</style></head>
<body>${y}<script>window.onload=function(){setTimeout(function(){window.print();},400);};<\/script></body></html>`,b=window.open("","_blank");if(!b){tt("Açılır pencere engellendi — tarayıcı iznini kontrol edin.","error");return}b.document.write(u),b.document.close()}return T?e.jsxs("div",{style:{minHeight:"100vh"},children:[e.jsxs("nav",{className:"topnav",style:{position:"sticky",top:0,zIndex:10},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:20},children:[e.jsx("button",{className:"btn btn-sm",style:{background:"rgba(255,255,255,0.15)",color:"white"},onClick:()=>nt("/panel"),children:e.jsx("i",{className:"material-icons-round",children:"arrow_back"})}),e.jsxs("div",{children:[e.jsx("div",{style:{color:"white",fontWeight:700},children:(w==null?void 0:w.name)||"—"}),e.jsxs("div",{style:{color:"#94a3b8",fontSize:"0.78rem",display:"flex",alignItems:"center",gap:6},children:[e.jsx("i",{className:"material-icons-round",style:{fontSize:12,color:"#10b981"},children:"fiber_manual_record"}),"CANLI — SONUÇ RAPORU",at&&e.jsxs("span",{style:{color:"#475569"},children:["· ",at.toLocaleTimeString("tr-TR")]})]})]})]}),e.jsxs("div",{style:{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"},children:[e.jsxs("select",{value:U,onChange:t=>ot(t.target.value),style:{minWidth:220},children:[e.jsx("option",{value:"",children:"Kategori seç..."}),Object.values(C).map(t=>e.jsx("option",{value:t.id,children:t.name},t.id))]}),e.jsxs("button",{className:"btn btn-outline btn-sm",onClick:kt,disabled:!f,children:[e.jsx("i",{className:"material-icons-round",children:"download"})," Excel"]}),e.jsxs("button",{className:"btn btn-outline btn-sm",onClick:vt,children:[e.jsx("i",{className:"material-icons-round",children:"file_download"})," Tümü"]}),e.jsxs("button",{className:"btn btn-sm",onClick:()=>rt("current"),disabled:!f,style:{background:"#E30613",color:"white",opacity:f?1:.5},title:"Seçili kategorinin bireysel + takım sonuçları",children:[e.jsx("i",{className:"material-icons-round",children:"picture_as_pdf"})," PDF — Bu Kategori"]}),e.jsxs("button",{className:"btn btn-sm",onClick:()=>rt("all"),style:{background:"#1e293b",color:"white"},title:"Tüm kategorilerin bireysel + takım sonuçları",children:[e.jsx("i",{className:"material-icons-round",children:"picture_as_pdf"})," PDF — Tümü"]})]})]}),e.jsxs("div",{className:"container",children:[e.jsxs("div",{style:{display:"flex",gap:8,marginBottom:16},children:[e.jsx("button",{className:"btn "+(W==="ind"?"btn-primary":"btn-outline"),onClick:()=>lt("ind"),children:"GENEL TASNİF"}),e.jsx("button",{className:"btn "+(W==="team"?"btn-primary":"btn-outline"),onClick:()=>lt("team"),children:"TAKIM SIRALAMASI"})]}),e.jsxs("div",{className:"card",children:[e.jsxs("div",{className:"card-header flex-between",children:[e.jsxs("h3",{className:"card-title",style:{display:"flex",alignItems:"center",gap:10},children:[B&&e.jsx("i",{className:"material-icons-round",style:{color:"#c084fc",fontSize:20},children:"sync"}),(f==null?void 0:f.name)||"Kategori Seçin",f&&F==="max"&&e.jsx("span",{style:{fontSize:"0.75rem",background:"rgba(253,185,49,0.15)",color:"#fbbf24",padding:"2px 8px",borderRadius:4},children:"GEÇERLİ = MAX(R1,R2)"}),B&&e.jsx("span",{style:{fontSize:"0.75rem",background:"rgba(192,132,252,0.15)",color:"#c084fc",padding:"2px 8px",borderRadius:4},children:"SENKRONİZE"})]}),e.jsx("div",{className:"text-muted",style:{fontSize:"0.85rem"},children:W==="ind"?`${_.length} kayıt`:`${et.length} kulüp`})]}),e.jsxs("div",{className:"card-body",style:{padding:0},children:[!f&&e.jsx("div",{className:"text-center text-muted",style:{padding:40},children:"Lütfen kategori seçin"}),f&&W==="ind"&&e.jsx("div",{className:"table-responsive",children:e.jsxs("table",{className:"table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{style:{width:56},children:"Sıra"}),e.jsx("th",{children:"Ad Soyad / Kulüp"}),e.jsx("th",{style:{width:130,textAlign:"right"},children:"R1"}),K&&e.jsx("th",{style:{width:130,textAlign:"right"},children:"R2"}),e.jsx("th",{style:{width:150,textAlign:"right"},children:F==="max"?"GEÇERLİ PUAN":"TOPLAM"})]})}),e.jsxs("tbody",{children:[_.length===0&&e.jsx("tr",{children:e.jsx("td",{colSpan:K?6:5,style:{textAlign:"center",padding:32,color:"#64748b"},children:B?"Henüz sonuç yok. Çift oluşturun ve puanlayın.":"Henüz yayınlanmış sonuç yok."})}),_.map((t,o)=>{const l=t.rank,d=l===1?"#FFD700":l===2?"#C0C0C0":l===3?"#CD7F32":"",p=l!=null&&l<=3,a=it(t.r1d),i=it(t.r2d);return e.jsxs("tr",{style:p?{background:`${d}08`}:{},children:[e.jsx("td",{style:{fontFamily:"'Space Mono',monospace",fontWeight:700,fontSize:"1.15rem",color:d||"inherit"},children:p?e.jsx("i",{className:"material-icons-round",style:{fontSize:22,color:d},children:l===1?"looks_one":l===2?"looks_two":"looks_3"}):l??"—"}),e.jsxs("td",{children:[e.jsxs("div",{style:{fontWeight:700,display:"flex",alignItems:"center",gap:6},children:[t.a.isPair&&e.jsx("i",{className:"material-icons-round",style:{fontSize:14,color:"#c084fc"},children:"sync"}),t.a.pairName||P(t.a)]}),e.jsx("div",{style:{fontSize:"0.78rem",color:"#64748b"},children:D(t.a)||t.a.club||"—"})]}),e.jsxs("td",{style:{textAlign:"right"},children:[e.jsx("div",{style:{fontFamily:"'Space Mono',monospace",fontWeight:700,fontSize:"1rem",color:t.s1?"#94a3b8":"inherit"},children:O(t.r1,t.s1)}),a&&e.jsx("div",{style:{fontSize:"0.62rem",color:"#475569",marginTop:2},children:a})]}),K&&e.jsxs("td",{style:{textAlign:"right"},children:[e.jsx("div",{style:{fontFamily:"'Space Mono',monospace",fontWeight:700,fontSize:"1rem",color:t.s2?"#94a3b8":"inherit"},children:O(t.r2,t.s2)}),i&&e.jsx("div",{style:{fontSize:"0.62rem",color:"#475569",marginTop:2},children:i})]}),e.jsx("td",{style:{textAlign:"right"},children:e.jsx("div",{style:{fontFamily:"'Space Mono',monospace",fontSize:"1.2rem",fontWeight:700,color:d||"#7C87D8"},children:t.total>0||t.r1!=null||t.r2!=null?t.total.toFixed(3):"-"})})]},t.a.id)})]})]})}),f&&W==="team"&&e.jsxs("div",{children:[et.length===0&&e.jsx("div",{style:{textAlign:"center",padding:40,color:"#64748b"},children:"Takım oluşturacak kadar sporcusu olan kulüp yok."}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:12},children:et.map((t,o)=>{const l=o===0?"#FFD700":o===1?"#C0C0C0":o===2?"#CD7F32":"";return e.jsxs("div",{style:{background:l?`${l}0D`:"rgba(255,255,255,0.03)",border:`1px solid ${l?`${l}44`:"rgba(255,255,255,0.07)"}`,borderRadius:14,overflow:"hidden"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:14,padding:"12px 18px",background:l?`${l}12`:"rgba(255,255,255,0.02)",borderBottom:"1px solid rgba(255,255,255,0.06)"},children:[e.jsx("div",{style:{width:34,height:34,borderRadius:9,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",background:l||"rgba(255,255,255,0.08)",color:l?"#0f172a":"#94a3b8",fontFamily:"'Space Mono',monospace",fontWeight:700,fontSize:"1rem"},children:o+1}),e.jsxs("div",{style:{flex:1,minWidth:0},children:[e.jsx("div",{style:{fontWeight:800,fontSize:"1.05rem",color:"#f1f5f9",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:t.club}),e.jsxs("div",{style:{fontSize:"0.75rem",color:"#64748b",marginTop:1},children:[t.members.length," sporcu kayıtlı"]})]}),e.jsxs("div",{style:{textAlign:"right"},children:[e.jsx("div",{style:{fontSize:"0.65rem",color:"#64748b",letterSpacing:1,fontWeight:700},children:"TAKIM TOPLAMI"}),e.jsx("div",{style:{fontFamily:"'Space Mono',monospace",fontSize:"1.5rem",fontWeight:700,color:l||"var(--accent-secondary)",lineHeight:1.1},children:t.teamTotal.toFixed(3)})]})]}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:`repeat(${t.routines.length}, 1fr)`,gap:1,background:"rgba(255,255,255,0.06)"},children:t.routines.map(d=>e.jsxs("div",{style:{background:"rgba(10,14,32,0.55)",padding:"12px 18px"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:8},children:[e.jsx("span",{style:{fontSize:"0.7rem",fontWeight:800,letterSpacing:1.2,color:d.key==="r1"?"var(--accent-primary)":"var(--accent-secondary)"},children:d.label.toUpperCase()}),e.jsx("span",{style:{fontFamily:"'Space Mono',monospace",fontWeight:700,fontSize:"1rem",color:"#e2e8f0"},children:d.subtotal.toFixed(3)})]}),d.picks.length===0?e.jsx("div",{style:{color:"#475569",fontSize:"0.8rem"},children:"Bu seriden puan sayılmadı"}):d.picks.map((p,a)=>e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",gap:10,padding:"3px 0",fontSize:"0.84rem",borderBottom:a<d.picks.length-1?"1px dashed rgba(255,255,255,0.06)":"none"},children:[e.jsx("span",{style:{color:"#cbd5e1",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:p.name}),e.jsx("span",{style:{fontFamily:"'Space Mono',monospace",color:"#94a3b8",flexShrink:0},children:p.score.toFixed(3)})]},a))]},d.key))})]},t.club)})})]})]})]})]})]}):null}export{Ft as default};
