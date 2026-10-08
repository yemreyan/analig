import"./i18n-Tr01a2b3Cb2.js";import{j as i}from"./main-C2LpyYUGCb2.js";import{u as r,r as R}from"./vendor-react-Cxw6bqwhCb2.js";import"./modulepreload-polyfill-B5Qt9EMXCb2.js";import"./vendor-firebase-940mxgRVCb2.js";
// BRANŞ SEÇİMİ (/) — branş amblemleri, branş paletine göre degrade kartlar, aktif yarışma sayısı (REST, arşiv/test hariç).
const s=[{id:"artistik",title:__T("Artistik Cimnastik"),subtitle:"Artistic Gymnastics",img:["/brans/alet/artistik_kadin.png","/brans/alet/artistik_erkek.png"],c1:"#4F46E5",c2:"#7C3AED",path:"/artistic",base:"competitions"},
 {id:"ritmik",title:__T("Ritmik Cimnastik"),subtitle:"Rhythmic Gymnastics",img:["/brans/alet/ritmik.png"],c1:"#EC4899",c2:"#8B5CF6",path:"/rhythmic",base:"ritmik_yarismalar"},
 {id:"aerobik",title:__T("Aerobik Cimnastik"),subtitle:"Aerobic Gymnastics",img:["/brans/aerobik.png"],c1:"#10B981",c2:"#0EA5E9",path:"/aerobic",base:"aerobik_yarismalar"},
 {id:"parkur",title:__T("Parkur"),subtitle:"Parkour",img:["/brans/parkur.png"],c1:"#F59E0B",c2:"#EF4444",path:"/parkour",base:"parkur_yarismalar"},
 {id:"trampolin",title:__T("Trampolin Cimnastik"),subtitle:"Trampoline Gymnastics",img:["/brans/trampolin.png"],c1:"#F97316",c2:"#DB2777",path:"/trampoline",base:"trampolin_yarismalar"}];
const CSS=`.lp2{min-height:100vh;position:relative;overflow:hidden;font-family:Inter,"Plus Jakarta Sans",system-ui,sans-serif;color:#0F172A;background:#F6F7FB}
.lp2 *{box-sizing:border-box}
.lp2-bg{position:absolute;inset:0;pointer-events:none;background:radial-gradient(900px 520px at 8% -6%,rgba(99,102,241,.16),transparent 60%),radial-gradient(800px 520px at 100% 0%,rgba(236,72,153,.14),transparent 60%),radial-gradient(900px 600px at 50% 120%,rgba(16,185,129,.12),transparent 60%)}
.lp2-bg::after{content:"";position:absolute;inset:0;background-image:radial-gradient(rgba(15,23,42,.06) 1px,transparent 1px);background-size:22px 22px;mask-image:linear-gradient(180deg,#000,transparent 70%)}
.lp2-in{position:relative;max-width:1180px;margin:0 auto;padding:clamp(28px,5vh,56px) clamp(16px,3vw,32px) 32px;display:flex;flex-direction:column;min-height:100vh}
.lp2-hero{display:flex;flex-direction:column;align-items:center;text-align:center;gap:14px;animation:lpIn .6s ease both}
.lp2-logos{display:flex;align-items:center;justify-content:center;gap:clamp(14px,3vw,30px);flex-wrap:wrap}
.lp2-logos .tcf{width:clamp(74px,11vw,104px);height:auto}.lp2-logos .sep{width:1px;align-self:stretch;background:linear-gradient(180deg,transparent,#CBD5E1,transparent);margin:6px 0}.lp2-logos .gx{width:min(380px,64vw);height:auto}
.lp2-tag{display:inline-flex;align-items:center;gap:8px;padding:7px 14px;border-radius:999px;background:#fff;border:1px solid #E2E8F0;box-shadow:0 1px 2px rgba(15,23,42,.05);font-size:13px;font-weight:700;color:#475569}.lp2-tag i{width:8px;height:8px;border-radius:50%;background:linear-gradient(135deg,#6366F1,#EC4899)}
.lp2-h{margin:clamp(26px,5vh,48px) 0 18px;display:flex;align-items:baseline;gap:12px}.lp2-h b{font-size:clamp(20px,2.4vw,26px);font-weight:900;letter-spacing:-.01em}.lp2-h span{font-size:13px;font-weight:700;color:#94A3B8;letter-spacing:.12em;text-transform:uppercase}
.lp2-grid{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:clamp(12px,1.6vw,20px)}
.lp2-card{grid-column:span 2;position:relative;display:flex;flex-direction:column;text-align:left;border:none;padding:0;border-radius:22px;background:#fff;cursor:pointer;font:inherit;color:inherit;overflow:hidden;box-shadow:0 1px 2px rgba(15,23,42,.06),0 8px 24px -12px rgba(15,23,42,.18);transition:transform .25s cubic-bezier(.2,.8,.2,1),box-shadow .25s;animation:lpUp .55s cubic-bezier(.2,.8,.2,1) both}
.lp2-card:nth-child(4){grid-column:2/span 2}.lp2-card:nth-child(5){grid-column:4/span 2}
.lp2-card:hover{transform:translateY(-6px);box-shadow:0 2px 4px rgba(15,23,42,.06),0 22px 44px -16px color-mix(in srgb,var(--c1) 55%,transparent)}
.lp2-card:focus-visible{outline:3px solid var(--c1);outline-offset:3px}
.lp2-top{position:relative;height:clamp(130px,16vw,168px);background:linear-gradient(135deg,var(--c1),var(--c2));display:flex;align-items:center;justify-content:center;overflow:hidden}
.lp2-top::before{content:"";position:absolute;width:260px;height:260px;border-radius:50%;right:-80px;top:-120px;background:rgba(255,255,255,.14)}.lp2-top::after{content:"";position:absolute;width:180px;height:180px;border-radius:50%;left:-60px;bottom:-110px;background:rgba(255,255,255,.1)}
.lp2-med{position:relative;z-index:1;display:flex;gap:10px}
.lp2-med span{width:clamp(84px,9vw,108px);height:clamp(84px,9vw,108px);border-radius:50%;background:#fff;display:grid;place-items:center;box-shadow:0 0 0 6px rgba(255,255,255,.22),0 14px 30px -10px rgba(15,23,42,.45);transition:transform .35s cubic-bezier(.2,.8,.2,1)}
.lp2-med span img{width:80%;height:80%;object-fit:contain}
.lp2-card:hover .lp2-med span{transform:scale(1.06) rotate(-3deg)}.lp2-card:hover .lp2-med span+span{transform:scale(1.06) rotate(3deg)}
.lp2-cnt{position:absolute;z-index:1;top:12px;left:12px;display:inline-flex;align-items:center;gap:6px;padding:5px 10px;border-radius:999px;background:rgba(255,255,255,.2);backdrop-filter:blur(6px);color:#fff;font-size:12px;font-weight:800;letter-spacing:.02em}.lp2-cnt i{width:7px;height:7px;border-radius:50%;background:#4ADE80;box-shadow:0 0 0 3px rgba(74,222,128,.3)}.lp2-cnt.off i{background:rgba(255,255,255,.7);box-shadow:none}
.lp2-body{display:flex;align-items:center;gap:12px;padding:16px 18px 18px}
.lp2-body div{flex:1;min-width:0}.lp2-body b{display:block;font-size:clamp(16px,1.5vw,19px);font-weight:900;letter-spacing:-.01em}.lp2-body small{display:block;margin-top:2px;font-size:12.5px;font-weight:600;color:#94A3B8;letter-spacing:.02em}
.lp2-go{width:38px;height:38px;border-radius:12px;display:grid;place-items:center;background:color-mix(in srgb,var(--c1) 10%,#fff);color:var(--c1);transition:all .25s}.lp2-go .material-icons-round{font-size:20px}
.lp2-card:hover .lp2-go{background:linear-gradient(135deg,var(--c1),var(--c2));color:#fff;transform:translateX(3px)}
.lp2-foot{margin-top:auto;padding-top:36px;text-align:center;font-size:12.5px;font-weight:600;color:#94A3B8}
@keyframes lpIn{from{opacity:0;transform:translateY(-8px)}}@keyframes lpUp{from{opacity:0;transform:translateY(16px)}}
@media(max-width:900px){.lp2-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.lp2-card,.lp2-card:nth-child(4),.lp2-card:nth-child(5){grid-column:auto}.lp2-card:nth-child(5){grid-column:1/-1}}
@media(max-width:540px){.lp2-grid{grid-template-columns:1fr}.lp2-card:nth-child(5){grid-column:auto}.lp2-top{height:120px}}
@media(prefers-reduced-motion:reduce){.lp2 *{animation:none!important;transition:none!important}}`;
function o(){const e=r(),[say,setSay]=R.useState({});
 R.useEffect(()=>{let iptal=!1;const DB="https://analig-default-rtdb.firebaseio.com/";s.forEach(async b=>{try{const ks=Object.keys(await(await fetch(DB+b.base+".json?shallow=true")).json()||{}).filter(k=>!/^zz/.test(k));const ar=await Promise.all(ks.map(k=>fetch(DB+b.base+"/"+k+"/arsivli.json").then(x=>x.json()).catch(()=>null)));const n=ar.filter(a=>a!==!0&&a!=="true").length;iptal||setSay(o=>({...o,[b.id]:n}))}catch{}});return()=>{iptal=!0}},[]);
 return i.jsxs("div",{className:"lp2",children:[i.jsx("style",{children:CSS}),i.jsx("div",{className:"lp2-bg"}),i.jsxs("div",{className:"lp2-in",children:[
  i.jsxs("header",{className:"lp2-hero",children:[i.jsxs("div",{className:"lp2-logos",children:[i.jsx("img",{className:"tcf",src:"/logo.png",alt:__T("TCF Logo")}),i.jsx("span",{className:"sep","aria-hidden":"true"}),i.jsx("img",{className:"gx",src:"/brand/gymnaxis-tam-logo.svg",alt:__T("Gymexa Score · Yarışma Yönetim Sistemi · Türkiye Cimnastik Federasyonu")})]}),
   i.jsxs("span",{className:"lp2-tag",children:[i.jsx("i",{}),__T("Türkiye Cimnastik Federasyonu · Yarışma Yönetim Sistemi")]})]}),
  i.jsxs("div",{className:"lp2-h",children:[i.jsx("b",{children:__T("Branş Seçiniz")}),i.jsx("span",{lang:"en",children:"Select discipline"})]}),
  i.jsx("div",{className:"lp2-grid",children:s.map((a,k)=>{const n=say[a.id];return i.jsxs("button",{type:"button",className:"lp2-card",onClick:()=>e(a.path),style:{"--c1":a.c1,"--c2":a.c2,animationDelay:k*70+"ms"},"aria-label":a.title,children:[
   i.jsxs("div",{className:"lp2-top",children:[n!==void 0?i.jsxs("span",{className:"lp2-cnt"+(n?"":" off"),children:[i.jsx("i",{}),n?n+" "+__T("aktif yarışma"):__T("Aktif yarışma yok")]}):null,i.jsx("div",{className:"lp2-med",children:a.img.map(u=>i.jsx("span",{children:i.jsx("img",{src:u,alt:""})},u))})]}),
   i.jsxs("div",{className:"lp2-body",children:[i.jsxs("div",{children:[i.jsx("b",{children:a.title}),i.jsx("small",{lang:"en",children:a.subtitle})]}),i.jsx("span",{className:"lp2-go",children:i.jsx("i",{className:"material-icons-round",children:"arrow_forward"})})]})]},a.id)})}),
  i.jsxs("footer",{className:"lp2-foot",children:["© ",new Date().getFullYear(),__T(" Gymexa Score · Türkiye Cimnastik Federasyonu")]})]})]})}export{o as default};
