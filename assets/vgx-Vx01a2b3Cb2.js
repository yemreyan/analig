// VİDEO ARŞİVİ ortak görünüm katmanı (artistik + aerobik): branş paleti, başlık kartı, gruplu ızgara, sembollü küçük resim.
const PAL={artistik:["#4F46E5","#7C3AED"],ritmik:["#EC4899","#8B5CF6"],aerobik:["#10B981","#0EA5E9"],parkur:["#F59E0B","#EF4444"],trampolin:["#F97316","#DB2777"]};
export const vgxPal=rp=>{const b=String(rp||"").replace(/^\//,"").split("/")[0],p=PAL[b]||PAL.artistik;return{"--c1":p[0],"--c2":p[1]}};
// ardışık öğeleri anahtara göre grupla (liste zaten sıralı)
export const vgxGrp=(l,k)=>{const g=[];l.forEach(a=>{const x=k(a),s=g[g.length-1];s&&s.k===x?s.items.push(a):g.push({k:x,items:[a]})});return g};
export const vgxTs=t=>{if(!t)return"";const d=new Date(typeof t=="number"?t:String(t));if(isNaN(d))return"";const p=n=>String(n).padStart(2,"0");return`${p(d.getDate())}.${p(d.getMonth()+1)}.${d.getFullYear()} ${p(d.getHours())}:${p(d.getMinutes())}`};
export const VGX_CSS=`.vgx{max-width:1240px!important;padding:1.25rem 1rem 3rem!important;position:relative}
.vgx>.back-btn{position:absolute!important;top:calc(1.25rem + 22px)!important;left:calc(1rem + 18px)!important;z-index:3;width:40px;height:40px;border-radius:12px!important;border:1px solid #E2E8F0!important;background:#fff!important;color:#0F172A!important;display:grid;place-items:center;margin:0!important;box-shadow:none!important}
.vgx .vg-header{position:relative;overflow:hidden;background:#fff;border-radius:18px;padding:16px 20px 16px 72px;margin-bottom:18px!important;gap:14px!important;box-shadow:0 1px 2px rgba(15,23,42,.05),0 8px 24px -16px rgba(15,23,42,.22)}
.vgx .vg-header::after{content:"";position:absolute;left:0;right:0;bottom:0;height:3px;background:linear-gradient(90deg,var(--c1),var(--c2))}
.vgx .vg-icon{width:48px;height:48px;background:linear-gradient(135deg,var(--c1),var(--c2))!important;box-shadow:0 8px 18px -8px var(--c1)}
.vgx .vg-title{font-size:1.35rem!important;font-weight:900!important;color:#0F172A!important;letter-spacing:-.01em}.vgx .vg-subtitle{font-weight:600}
.vgx .vg-controls{margin-left:-52px;padding-top:12px;border-top:1px solid #F1F5F9}
.vgx .vg-select{border:1px solid #E2E8F0!important;background:#F8FAFC!important;border-radius:12px!important;font-weight:700!important;min-width:260px}
.vgx .vg-select:focus,.vgx .vg-search:focus-within{border-color:var(--c1)!important;box-shadow:0 0 0 3px color-mix(in srgb,var(--c1) 15%,transparent)}
.vgx .vg-search{border:1px solid #E2E8F0!important;background:#F8FAFC!important;border-radius:12px!important;margin-left:auto}
.vgx .vg-count{display:flex;align-items:center;gap:10px;flex-wrap:wrap;background:#fff;border-radius:14px;padding:8px 8px 8px 16px;margin-bottom:14px!important;font-size:.84rem!important;color:#334155!important;box-shadow:0 1px 2px rgba(15,23,42,.05)}
.vgx .vg-count::before{content:"video_library";font-family:"Material Icons Round";font-size:20px;color:var(--c1)}
.vgx .vg-count .vg-btn{margin-left:auto!important;flex:none!important}
.vgx .vg-sec{margin-bottom:22px}
.vgx .vg-sec-h{display:flex!important;align-items:center;gap:10px;margin:0 0 10px!important;padding:0!important;border:none!important}
.vgx .vg-sec-h::after{content:"";flex:1;height:1px;background:linear-gradient(90deg,color-mix(in srgb,var(--c1) 35%,transparent),transparent)}
.vgx .vg-sec-h .vg-sec-ic{width:38px;height:38px;border-radius:50%;background:#fff;display:grid;place-items:center;flex-shrink:0;box-shadow:0 0 0 1px color-mix(in srgb,var(--c1) 25%,#fff),0 6px 14px -8px var(--c1)}
.vgx .vg-sec-h .vg-sec-ic img{width:76%;height:76%;object-fit:contain}.vgx .vg-sec-h .vg-sec-ic i{color:var(--c1)!important;font-size:20px}
.vgx .vg-sec-h b,.vgx .vg-sec-h>span:nth-child(2){font-weight:900!important;font-size:1.05rem!important;color:#0F172A}
.vgx .vg-sec-h small,.vgx .vg-sec-h>span:nth-child(3){font-size:.72rem!important;font-weight:800!important;padding:2px 9px;border-radius:999px;background:color-mix(in srgb,var(--c1) 10%,#fff);color:var(--c1)!important}
.vgx .vg-grid{grid-template-columns:repeat(auto-fill,minmax(250px,1fr))!important;gap:14px!important}
.vgx .vg-card{border:none!important;border-radius:16px!important;box-shadow:0 1px 2px rgba(15,23,42,.05),0 8px 24px -16px rgba(15,23,42,.25)}
.vgx .vg-card:hover{transform:translateY(-3px)!important;box-shadow:0 2px 4px rgba(15,23,42,.06),0 18px 36px -18px color-mix(in srgb,var(--c1) 55%,transparent)!important}
.vgx .vg-card-thumb{height:140px!important;background:radial-gradient(120% 90% at 0% 0%,color-mix(in srgb,var(--c1) 70%,#0F172A),#0F172A 70%),#0F172A!important;overflow:hidden}
.vgx .vg-card-thumb::before{content:"";position:absolute;inset:0;background:linear-gradient(135deg,transparent 40%,color-mix(in srgb,var(--c2) 45%,transparent));pointer-events:none}
.vgx .vg-play-icon{position:relative;z-index:1;width:58px;height:58px;border-radius:50%;display:grid!important;place-items:center;font-size:58px!important;background:rgba(255,255,255,.12);backdrop-filter:blur(4px)}
.vgx .vg-cam-badge{z-index:1;top:10px!important;right:10px!important;border-radius:999px!important;padding:4px 10px!important;background:rgba(255,255,255,.16)!important;backdrop-filter:blur(6px);border:1px solid rgba(255,255,255,.25)}
.vgx .vg-cam-badge.camA{background:linear-gradient(135deg,var(--c1),var(--c2))!important;border-color:transparent}
.vgx .vg-ap{position:absolute;z-index:1;left:10px;bottom:10px;width:40px;height:40px;border-radius:50%;background:#fff;display:grid;place-items:center;box-shadow:0 0 0 3px rgba(255,255,255,.2)}.vgx .vg-ap img{width:78%;height:78%;object-fit:contain}
.vgx .vg-ts{position:absolute;z-index:1;right:10px;bottom:10px;font-size:.66rem;font-weight:800;color:rgba(255,255,255,.85);background:rgba(15,23,42,.45);padding:3px 8px;border-radius:999px}
.vgx .vg-card-body{padding:12px 14px 8px!important}
.vgx .vg-card-ath{font-weight:900!important;color:#0F172A!important}
.vgx .vg-cat-tag,.vgx .vg-alet-tag{border-radius:999px!important;padding:3px 9px!important;font-weight:800!important}
.vgx .vg-cat-tag{background:color-mix(in srgb,var(--c1) 10%,#fff)!important;color:var(--c1)!important}
.vgx .vg-alet-tag{background:color-mix(in srgb,var(--c2) 10%,#fff)!important;color:color-mix(in srgb,var(--c2) 80%,#0F172A)!important}
.vgx .vg-card-actions{border-top:1px solid #F1F5F9!important;padding:10px 14px 12px!important;gap:6px!important}
.vgx .vg-btn{border-radius:10px!important;padding:.5rem .8rem!important;font-weight:800!important}
.vgx .vg-btn--play{background:linear-gradient(135deg,var(--c1),var(--c2))!important;color:#fff!important;box-shadow:0 6px 14px -8px var(--c1)}
.vgx .vg-btn--dl{background:#fff!important;color:#334155!important;border:1px solid #E2E8F0!important}.vgx .vg-btn--dl:hover{border-color:var(--c1)!important;color:var(--c1)!important}
.vgx .vg-btn--del{background:#FEF2F2!important;color:#DC2626!important}
.vgx .vg-confirm-modal .vg-btn--del{background:#DC2626!important;color:#fff!important}
.vgx .vg-spinner{border-top-color:var(--c1)!important}
.vgx .vg-empty{background:#fff;border-radius:18px;padding:3.5rem 1rem!important;box-shadow:0 1px 2px rgba(15,23,42,.05)}
.vgx .vg-empty i{opacity:1!important;color:var(--c1);width:72px;height:72px;border-radius:50%;display:grid;place-items:center;background:color-mix(in srgb,var(--c1) 10%,#fff);font-size:2.2rem!important}
.vgx .vg-empty p{color:#475569}.vgx .vg-empty small{color:#94A3B8;font-weight:600;font-size:.82rem}
@media(max-width:600px){.vgx .vg-header{padding:64px 14px 14px}.vgx>.back-btn{top:calc(1.25rem + 12px)!important;left:calc(1rem + 12px)!important}.vgx .vg-controls{margin-left:0}.vgx .vg-search{margin-left:0}}`;
