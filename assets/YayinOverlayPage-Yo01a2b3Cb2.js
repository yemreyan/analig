import"./i18n-Tr01a2b3Cb2.js";import{u as useAuth,a as usDisc,j as e,d as db,b as usToast,l as logAction}from"./main-C2LpyYUGCb2.js";import{u as useNav,r as R}from"./vendor-react-Cxw6bqwhCb2.js";import{k as ref,o as onValue,m as update}from"./vendor-firebase-940mxgRVCb2.js";import{f as filterComps}from"./useFilteredCompetitions-B7FB6qIvCb2.js";import{GXP_CSS}from"./ArtistikNotSilmePage-Ns01a2b3Cb2.js";import"./modulepreload-polyfill-B5Qt9EMXCb2.js";
// Kısa link kodu (tv.gymexascore.net/<kod> · gymexascore.net/<kod>) — criteria/kisaLink/<kod> {t,b,c,p,kapali}
const __gsKod=()=>{const a="abcdefghijkmnpqrstuvwxyz23456789",b=new Uint8Array(9);crypto.getRandomValues(b);return Array.from(b,x=>a[x%a.length]).join("")};

// YAYIN OVERLAY — KURULUM (eski /yayin-overlay.html kurulum ekranının uygulama içi sürümü)
// Üretilen OBS/vMix linki şeffaf /broadcast-overlay.html?comp=… (vercel.json → yayin-overlay.html; eski /yayin-overlay.html linkleri de çalışır).
// v2: kanal başına YAYIN PROFİLLERİ (logolar, tema, alt bant, sıralama, sıradaki, podyum), canlı kontrol ve TV veri linki (/api/yayin).
const RENK={aerobik:["#10B981","directions_run"],ritmik:["#EC4899","auto_awesome"],artistik:["#4F46E5","sports_gymnastics"]};
const CSS=GXP_CSS+`
.yo-grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:16px;align-items:start}.yo-col{display:flex;flex-direction:column;gap:16px}
@media(max-width:980px){.yo-grid{grid-template-columns:1fr}}
.yo-h2{display:flex;align-items:center;gap:10px;font-size:1.02rem;font-weight:800;margin:0 0 12px}.yo-h2 small{font-weight:700;color:#94A3B8;font-size:.78rem}
.yo-ic{width:32px;height:32px;border-radius:10px;display:grid;place-items:center;color:#fff;flex-shrink:0}.yo-ic i{font-size:18px}
.yo-f{display:block;font-size:.78rem;font-weight:800;color:#475569;margin:14px 0 6px;letter-spacing:.02em}.yo-f span{font-weight:700;color:#94A3B8}
.yo-sel{width:100%;padding:10px 36px 10px 14px;border:1px solid var(--border,#E5E7EB);border-radius:12px;background:#fff url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%2364748B' stroke-width='2' fill='none'/%3E%3C/svg%3E") no-repeat right 12px center;-webkit-appearance:none;appearance:none;font:inherit;font-weight:700;font-size:.92rem}
.yo-sel:focus{outline:2px solid var(--gxp-c);outline-offset:1px}
.yo-seg{display:inline-flex;background:#F1F5F9;border-radius:12px;padding:3px;gap:2px;flex-wrap:wrap}.yo-seg button{border:none;background:transparent;padding:8px 14px;border-radius:9px;font:inherit;font-weight:800;font-size:.84rem;color:#475569;cursor:pointer}.yo-seg button.on{background:#fff;color:var(--gxp-c);box-shadow:0 1px 3px rgba(0,0,0,.1)}
.yo-pos{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}.yo-pos button{border:1.5px solid #E5E7EB;background:#fff;border-radius:12px;padding:8px;font:inherit;font-weight:800;font-size:.8rem;color:#475569;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:6px}
.yo-pos button i{display:block;width:100%;aspect-ratio:16/9;border-radius:6px;background:#F1F5F9;position:relative}.yo-pos button i::after{content:"";position:absolute;height:22%;width:55%;border-radius:3px;background:#CBD5E1}
.yo-pos button[data-v="alt-sol"] i::after{left:6%;bottom:9%}.yo-pos button[data-v="alt-orta"] i::after{left:22.5%;bottom:9%}.yo-pos button[data-v="ust-sol"] i::after{left:6%;top:9%}
.yo-pos button.on{border-color:var(--gxp-c);color:var(--gxp-c)}.yo-pos button.on i::after{background:var(--gxp-c)}
.yo-row{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.yo-num{display:inline-flex;align-items:center;border:1px solid #E5E7EB;border-radius:12px;overflow:hidden;background:#fff}.yo-num button{border:none;background:#F8FAFC;width:36px;height:38px;font:inherit;font-weight:800;font-size:1.1rem;color:#475569;cursor:pointer}.yo-num button:hover{background:#F1F5F9}
.yo-num input{width:64px;border:none;text-align:center;font:inherit;font-weight:800;font-size:.95rem;-moz-appearance:textfield}.yo-num input::-webkit-inner-spin-button{-webkit-appearance:none}
.yo-tools{display:flex;gap:6px;flex-wrap:wrap;align-items:center;margin-bottom:8px}.yo-tools button{display:inline-flex;align-items:center;gap:4px;border:1px solid #E5E7EB;background:#fff;border-radius:999px;padding:5px 11px;font:inherit;font-weight:800;font-size:.76rem;color:#475569;cursor:pointer}.yo-tools button i{font-size:15px}.yo-tools .cnt{margin-left:auto;font-size:.76rem;font-weight:800;color:var(--gxp-c)}
.yo-cgh{font-size:.72rem;font-weight:800;color:#64748B;letter-spacing:.05em;text-transform:uppercase;margin:10px 0 6px}
.yo-cats{display:flex;flex-wrap:wrap;gap:6px}.yo-cat{display:inline-flex;align-items:center;gap:6px;border:1.5px solid #E5E7EB;background:#fff;border-radius:999px;padding:6px 12px;font-weight:700;font-size:.82rem;color:#334155;cursor:pointer;user-select:none}.yo-cat input{display:none}.yo-cat.on{background:var(--gxp-c);border-color:var(--gxp-c);color:#fff}
.yo-note{font-size:.8rem;color:#64748B;font-weight:600;margin:8px 0 0;line-height:1.45}
.yo-url{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:.78rem;word-break:break-all;background:#F8FAFC;border:1px dashed #CBD5E1;border-radius:12px;padding:12px;color:#1E293B}.yo-url.bos{color:#94A3B8;font-family:inherit;font-weight:700}
.yo-btns{display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-top:12px}.yo-btn{display:inline-flex;align-items:center;gap:6px;border:none;border-radius:12px;padding:10px 14px;font:inherit;font-weight:800;font-size:.86rem;cursor:pointer;background:var(--gxp-c);color:#fff}.yo-btn.g{background:#fff;color:var(--gxp-c);border:1.5px solid var(--gxp-c)}.yo-btn:disabled{opacity:.45;cursor:default}.yo-btn i{font-size:18px}.yo-ok{font-size:.82rem;font-weight:800;color:#16A34A}
.yo-steps{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:14px}.yo-steps div{background:#F8FAFC;border-radius:12px;padding:10px;font-size:.78rem;font-weight:600;color:#475569;line-height:1.4}.yo-steps b{display:block;color:#1E293B;font-weight:800;margin-bottom:3px}.yo-steps code{background:#E2E8F0;border-radius:4px;padding:0 4px}
@media(max-width:640px){.yo-steps{grid-template-columns:1fr}.yo-row{grid-template-columns:1fr}}
.yo-prev{position:relative;aspect-ratio:16/9;border-radius:12px;overflow:hidden;background:repeating-conic-gradient(#E2E8F0 0 25%,#F8FAFC 0 50%) 0 0/24px 24px}.yo-prev iframe{position:absolute;inset:0;width:100%;height:100%;border:0}
.yo-pos button[data-v="alt-sag"] i::after{right:6%;bottom:9%}.yo-pos button[data-v="sag"] i::after{right:6%;top:20%;height:60%;width:32%}.yo-pos button[data-v="sol"] i::after{left:6%;top:20%;height:60%;width:32%}.yo-pos button[data-v="orta"] i::after{left:20%;top:15%;height:70%;width:60%}
.yo-pos button[data-v="sag-ust"] i::after{right:6%;top:9%;width:34%;height:34%}.yo-pos button[data-v="sol-ust"] i::after{left:6%;top:9%;width:34%;height:34%}.yo-pos button[data-v="sag-alt"] i::after{right:6%;bottom:9%;width:34%;height:34%}
.yo-tools button.on{background:var(--gxp-c);border-color:var(--gxp-c);color:#fff}
.yo-tabs{display:flex;gap:4px;flex-wrap:wrap;background:#F1F5F9;border-radius:12px;padding:4px;margin-bottom:14px}.yo-tabs button{flex:1 1 auto;display:inline-flex;align-items:center;justify-content:center;gap:5px;border:none;background:transparent;border-radius:9px;padding:8px 10px;font:inherit;font-weight:800;font-size:.8rem;color:#475569;cursor:pointer;position:relative;white-space:nowrap}.yo-tabs button i{font-size:17px}.yo-tabs button.on{background:#fff;color:var(--gxp-c);box-shadow:0 1px 3px rgba(0,0,0,.1)}.yo-tabs em{width:7px;height:7px;border-radius:50%;background:#16A34A;display:inline-block}
.yo-list{display:flex;flex-direction:column;gap:10px}
.yo-tog{display:flex;align-items:flex-start;gap:10px;cursor:pointer;padding:10px 12px;border:1px solid #E5E7EB;border-radius:12px;background:#fff;user-select:none}.yo-tog input{display:none}.yo-tog .sw{width:38px;height:22px;border-radius:999px;background:#CBD5E1;position:relative;flex-shrink:0;transition:background .2s;margin-top:1px}.yo-tog .sw::after{content:"";position:absolute;left:3px;top:3px;width:16px;height:16px;border-radius:50%;background:#fff;transition:left .2s;box-shadow:0 1px 2px rgba(0,0,0,.2)}.yo-tog.on .sw{background:var(--gxp-c)}.yo-tog.on .sw::after{left:19px}.yo-tog .tx{display:flex;flex-direction:column;min-width:0}.yo-tog b{font-size:.88rem;font-weight:800;color:#1E293B}.yo-tog small{font-size:.76rem;color:#64748B;font-weight:600;line-height:1.35}
.yo-kirli{background:#FEF3C7;color:#92400E;border-radius:999px;padding:3px 9px;font-weight:800;font-size:.72rem}.yo-live{background:#DCFCE7;color:#166534;border-radius:999px;padding:3px 9px;font-weight:800;font-size:.72rem}
.yo-color{width:46px;height:38px;border:1px solid #E5E7EB;border-radius:10px;padding:2px;background:#fff;cursor:pointer}
.yo-mini{display:inline-flex;align-items:center;gap:4px;border:1px solid #E5E7EB;background:#fff;border-radius:10px;padding:6px 10px;font:inherit;font-weight:800;font-size:.78rem;color:#475569;cursor:pointer}.yo-mini i{font-size:16px}
.yo-thumb{height:56px;max-width:150px;object-fit:contain;background:#fff;border:1px solid #E5E7EB;border-radius:10px;padding:4px;align-self:flex-start}
.yo-ek{display:flex;align-items:center;gap:10px;flex-wrap:wrap;padding:10px 12px;border:1px dashed #CBD5E1;border-radius:12px;background:#F8FAFC}.yo-ek>div{flex:1 1 200px;display:flex;flex-direction:column}.yo-ek b{font-size:.88rem;font-weight:800}.yo-ek small{font-size:.76rem;color:#64748B;font-weight:600}
.yo-save{display:flex;align-items:center;gap:8px;justify-content:flex-end;flex-wrap:wrap;margin-top:16px;padding-top:12px;border-top:1px solid #F1F5F9}.yo-save .yo-note{margin-right:auto!important}
.yo-profs{display:flex;flex-wrap:wrap;gap:8px}.yo-prof{display:inline-flex;align-items:center;gap:6px;border:1.5px solid #E5E7EB;background:#fff;border-radius:12px;padding:9px 14px;font:inherit;font-weight:800;font-size:.88rem;color:#334155;cursor:pointer}.yo-prof i{font-size:18px;color:#94A3B8}.yo-prof small{font-size:.7rem;color:#B91C1C;font-weight:800}.yo-prof.on{border-color:var(--gxp-c);background:color-mix(in srgb,var(--gxp-c) 8%,#fff);color:#0F172A}.yo-prof.on i{color:var(--gxp-c)}
.yo-grid>.ym{grid-column:1 / -1}
.ym-ekr{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:14px}@media(max-width:820px){.ym-ekr{grid-template-columns:1fr}}
.ym-et{display:flex;align-items:center;gap:6px;margin-bottom:6px;font-size:.74rem;font-weight:900;letter-spacing:.1em;color:#1D4ED8}.ym-et i{font-size:18px}.ym-et small{margin-left:auto;font-size:.74rem;letter-spacing:0;color:#64748B;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.ym-et.kanal{color:#B91C1C}.ym-et .dot{width:9px;height:9px;border-radius:50%;background:#DC2626;animation:akNb 1.4s ease-in-out infinite}
.ym-ust{display:flex;flex-wrap:wrap;gap:10px;margin-bottom:12px}.ym-ust label{display:flex;align-items:center;gap:8px;flex-wrap:wrap;padding:8px 12px;border-radius:12px;border:1.5px solid #E5E7EB;background:#F8FAFC;font-weight:800;font-size:.84rem;color:#334155}.ym-ust label>i{color:#64748B}.ym-ust small{color:#94A3B8;font-weight:700}
.ym-bas,.ym-r{display:grid;grid-template-columns:minmax(190px,1.2fr) minmax(260px,2fr) minmax(150px,.9fr) minmax(300px,1.6fr) 120px;gap:10px;align-items:center}
.ym-bas{padding:0 12px 6px;font-size:.68rem;font-weight:900;letter-spacing:.08em;text-transform:uppercase;color:#94A3B8}
.ym-r{padding:10px 12px;border-radius:14px;border:1.5px solid #E5E7EB;background:#fff;margin-bottom:8px}.ym-r.on{border-color:#DC2626;box-shadow:0 0 0 3px rgba(220,38,38,.12)}.ym-r.kap{background:#F8FAFC}
.ym-ad{display:flex;align-items:center;gap:10px;min-width:0}.ym-ad>i{font-size:26px;color:var(--gxp-c)}.ym-ad b{display:block;font-weight:900;font-size:.92rem}.ym-ad small{display:block;font-size:.72rem;color:#64748B;font-weight:700;line-height:1.3}
.ym-mod{display:flex;flex-wrap:wrap;gap:4px}.ym-mod button{border:1.5px solid #E5E7EB;background:#fff;border-radius:999px;padding:6px 10px;font:inherit;font-weight:800;font-size:.76rem;color:#475569;cursor:pointer}.ym-mod button.on{background:#0F172A;border-color:#0F172A;color:#fff}
.ym-al select{width:100%;padding:8px 10px;border:1.5px solid #E5E7EB;border-radius:10px;font:inherit;font-weight:800;font-size:.8rem;background:#fff}
.ym-btn{display:grid;grid-template-columns:repeat(3,1fr);gap:6px}.ym-btn button{display:inline-flex;align-items:center;justify-content:center;gap:4px;border:none;border-radius:10px;padding:9px 8px;font:inherit;font-weight:900;font-size:.78rem;cursor:pointer;white-space:nowrap}.ym-btn button i{font-size:18px}
.ym-btn .pv{background:#EFF6FF;color:#1D4ED8}.ym-btn .pv.on{background:#2563EB;color:#fff}.ym-btn .go{background:#16A34A;color:#fff}.ym-btn .st{background:#FEE2E2;color:#B91C1C}.ym-btn button:disabled{opacity:.35;cursor:default}
.ym-dur{justify-self:start;font-size:.68rem;font-weight:900;letter-spacing:.04em;padding:4px 9px;border-radius:999px;white-space:nowrap}.ym-dur.on{background:#DC2626;color:#fff}.ym-dur.ot{background:#DCFCE7;color:#166534}.ym-dur.bk{background:#FEF3C7;color:#92400E}.ym-dur.of{background:#F1F5F9;color:#94A3B8}.ym-dur.kr{background:#0F172A;color:#fff}
.ym-alt{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-top:12px}
@media(max-width:1180px){.ym-bas{display:none}.ym-r{grid-template-columns:1fr 1fr}.ym-ad{grid-column:1 / -1}.ym-btn{grid-column:1 / -1}}
.ak-durum{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:2px 0 14px}@media(max-width:720px){.ak-durum{grid-template-columns:1fr}}
.ak-d{display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:14px;border:1.5px solid #E5E7EB;background:#F8FAFC}.ak-d>i{font-size:24px;color:#94A3B8}
.ak-d small{display:block;font-size:.66rem;font-weight:900;letter-spacing:.1em;color:#64748B}.ak-d b{display:block;font-size:.9rem;font-weight:900;color:#0F172A}
.ak-d.on{border-color:#DC2626;background:#FEF2F2}.ak-d.on>i{color:#DC2626;animation:akNb 1.4s ease-in-out infinite}.ak-d.on small{color:#B91C1C}
.ak-d.pv.on{border-color:#2563EB;background:#EFF6FF}.ak-d.pv.on>i{color:#2563EB;animation:none}.ak-d.pv.on small{color:#1D4ED8}
@keyframes akNb{50%{opacity:.35}}
.ak-adim{display:flex;align-items:center;gap:8px;margin:14px 0 8px;font-weight:900;font-size:.9rem;color:#0F172A}.ak-no{width:24px;height:24px;border-radius:50%;display:grid;place-items:center;background:var(--gxp-c);color:#fff;font-size:.8rem}
.ak-kat{display:flex;flex-wrap:wrap;gap:6px}.ak-kat button{display:inline-flex;align-items:center;gap:6px;border:1.5px solid #E5E7EB;background:#fff;border-radius:12px;padding:9px 14px;font:inherit;font-weight:900;font-size:.88rem;color:#334155;cursor:pointer}.ak-kat button i{font-size:18px;color:#F59E0B}
.ak-kat button.on{background:var(--gxp-c);border-color:var(--gxp-c);color:#fff}.ak-kat button.on i{color:#fff}
.ak-g{margin-top:10px}.ak-gt{display:flex;align-items:baseline;gap:8px;margin-bottom:6px}.ak-gt b{font-size:.78rem;font-weight:900;letter-spacing:.06em;text-transform:uppercase;color:#475569}.ak-gt small{font-size:.74rem;color:#94A3B8;font-weight:700}
.ak-gb{display:grid;grid-template-columns:repeat(auto-fill,minmax(170px,1fr));gap:8px}
.ak-b{position:relative;display:flex;align-items:center;gap:10px;border:1.5px solid #E5E7EB;background:#fff;border-radius:14px;padding:10px 12px;font:inherit;text-align:left;cursor:pointer;color:#0F172A;transition:border-color .12s,box-shadow .12s,transform .12s}
.ak-b:hover{border-color:#94A3B8;transform:translateY(-1px)}
.ak-b img{width:34px;height:34px;border-radius:50%;background:#fff;border:1px solid #E5E7EB;padding:3px;object-fit:contain;flex-shrink:0}.ak-b>i{font-size:26px;color:var(--gxp-c);flex-shrink:0}
.ak-b span{min-width:0}.ak-b b{display:block;font-weight:900;font-size:.9rem;line-height:1.15}.ak-b small{display:block;font-size:.72rem;color:#64748B;font-weight:700}
.ak-b em{position:absolute;top:-8px;right:8px;font-style:normal;font-size:.6rem;font-weight:900;letter-spacing:.08em;padding:2px 7px;border-radius:999px;background:#DC2626;color:#fff}.ak-b em.pv{background:#2563EB}
.ak-b.sec{border-color:#2563EB;box-shadow:0 0 0 3px rgba(37,99,235,.18);background:#EFF6FF}
.ak-b.yay{border-color:#DC2626;box-shadow:0 0 0 3px rgba(220,38,38,.18)}
.ak-b.tp{background:#F8FAFC;border-style:dashed}
.ak-pv{margin-top:14px}.ak-pv-et{margin-top:6px;font-size:.72rem;font-weight:900;letter-spacing:.08em;color:#2563EB}
.ak-yayin{display:grid;grid-template-columns:1fr 1fr;gap:10px;align-items:stretch}.ak-yayin .ak-sure{grid-column:1 / -1}@media(max-width:520px){.ak-yayin{grid-template-columns:1fr}}
.ak-sure{display:flex;align-items:center;gap:8px;flex-wrap:wrap;padding:10px 12px;border-radius:14px;border:1.5px solid #E5E7EB;background:#F8FAFC;font-weight:800;font-size:.82rem;color:#334155}.ak-sure>i{color:#64748B}.ak-sure small{color:#94A3B8;font-weight:700}
.ak-go,.ak-stop{display:flex;align-items:center;gap:12px;min-width:0;border:none;border-radius:16px;padding:14px 18px;font:inherit;cursor:pointer;color:#fff;text-align:left}
.ak-go{background:linear-gradient(135deg,#16A34A,#15803D);box-shadow:0 10px 24px -12px #16A34A}.ak-stop{background:linear-gradient(135deg,#DC2626,#B91C1C);box-shadow:0 10px 24px -12px #DC2626}
.ak-go i,.ak-stop i{font-size:30px}.ak-go b,.ak-stop b{display:block;font-size:1.05rem;font-weight:900;letter-spacing:.04em}.ak-go small,.ak-stop small{display:block;font-size:.74rem;font-weight:700;opacity:.9}
.ak-go:disabled,.ak-stop:disabled{opacity:.4;cursor:default;box-shadow:none}
.yo-ctl{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:12px}.yo-ctl button{display:flex;align-items:center;gap:8px;border:1.5px solid #E5E7EB;background:#fff;border-radius:12px;padding:11px 12px;font:inherit;font-weight:800;font-size:.84rem;color:#1E293B;cursor:pointer;text-align:left}.yo-ctl button i{font-size:20px;color:var(--gxp-c)}.yo-ctl button.on{border-color:#16A34A;background:#F0FDF4}.yo-ctl button.gz{grid-column:1/-1;justify-content:center;color:#475569}.yo-ctl button:disabled{opacity:.45;cursor:default}
.yo-kp{display:flex;flex-direction:column;gap:10px;margin-top:12px;padding:12px;border:1.5px dashed #CBD5E1;border-radius:12px;background:#F8FAFC}.yo-kp>b{font-size:.88rem;font-weight:800}.yo-btn.g.on{background:color-mix(in srgb,var(--gxp-c) 10%,#fff)}
.yo-btn.kr{background:#DC2626}.yo-btn.g.kr{background:#fff;color:#DC2626;border-color:#FCA5A5}
@media(max-width:640px){.yo-ctl{grid-template-columns:1fr}}`;

const Seg=({v,ops,on})=>e.jsx("div",{className:"yo-seg",children:ops.map(([k,t])=>e.jsx("button",{type:"button",className:v===k?"on":"",onClick:()=>on(k),children:t},k))});
const Num=({v,mn,mx,st=1,on})=>{const c=x=>on(Math.min(mx,Math.max(mn,Number(x)||0)));return e.jsxs("div",{className:"yo-num",children:[e.jsx("button",{type:"button",onClick:()=>c(v-st),children:"−"}),e.jsx("input",{type:"number",value:v,min:mn,max:mx,step:st,onChange:ev=>on(ev.target.value===""?mn:Number(ev.target.value)),onBlur:ev=>c(ev.target.value)}),e.jsx("button",{type:"button",onClick:()=>c(v+st),children:"+"})]})};

// ---- YAYIN PROFİLLERİ ----
// <yarışma>/yayinProfilleri/<id> = {ad, dil, kat[], olcek, kenar, tema, vurgu, arka, logo{tcf,gymexa,etkinlik,ek,kose}, alt{…}, tablo{…}, sirada{…}, podyum{…},
//   kontrol{g:siralama|sirada|podyum|alt-gizle|gizle, kat, sure, ts, kim}, kapali, guncelleme, guncelleyen}
// Overlay (?profil=) ve TV veri linki (/api/yayin?profil=) bu kaydı CANLI okur: kaydedince kanaldaki yayın anında değişir.
const PV=()=>({ad:"",dil:"tr",kat:[],olcek:100,kenar:90,tema:"tcf",vurgu:"",arka:"seffaf",
 logo:{tcf:!0,gymexa:!0,etkinlik:!0,ek:null,kose:"yok"},
 alt:{acik:!0,isim:!0,puan:!0,konum:"alt-sol",sure:12,isimSure:0,kulup:!0,ulke:!0,bib:!1,detay:!0,sira:!0,foto:!0},
 tablo:{acik:!1,mod:"puan",konum:"sag",n:8,sure:15,tur:"genel",detay:!0,donguSure:10},
 sirada:{acik:!1,mod:"cagri",konum:"sag-ust",n:3},
 podyum:{acik:!1,mod:"otomatik",n:3,sure:20}});
const ALANLAR=["ad","dil","kat","olcek","kenar","tema","vurgu","arka","logo","alt","tablo","sirada","podyum"];
const norm=p=>{const d=PV(),o={};ALANLAR.forEach(k=>{const v=p?.[k];o[k]=v===undefined||v===null?d[k]:d[k]&&typeof d[k]==="object"&&!Array.isArray(d[k])?{...d[k],...v}:v});o.kat=Array.isArray(o.kat)?o.kat:[];if(o.logo.ek===undefined)o.logo.ek=null;return o};
const resimOku=fl=>new Promise((res,rej)=>{const fr=new FileReader;fr.onload=()=>{const im=new Image;im.onload=()=>{const k=Math.min(1,360/Math.max(im.naturalWidth||360,im.naturalHeight||360)),cv=document.createElement("canvas");cv.width=Math.max(1,Math.round((im.naturalWidth||360)*k));cv.height=Math.max(1,Math.round((im.naturalHeight||360)*k));cv.getContext("2d").drawImage(im,0,0,cv.width,cv.height);res(cv.toDataURL("image/png"))};im.onerror=rej;im.src=fr.result};fr.onerror=rej;fr.readAsDataURL(fl)});
const I=n=>e.jsx("i",{className:"material-icons-round",children:n});
const Tog=({v,on,t,d})=>e.jsxs("label",{className:"yo-tog"+(v?" on":""),children:[e.jsx("input",{type:"checkbox",checked:!!v,onChange:ev=>on(ev.target.checked)}),e.jsx("span",{className:"sw"}),e.jsxs("span",{className:"tx",children:[e.jsx("b",{children:t}),d?e.jsx("small",{children:d}):null]})]});
const Bas=({ic,renk,t,sag})=>e.jsxs("h2",{className:"yo-h2",children:[e.jsx("span",{className:"yo-ic",style:{background:renk},children:I(ic)}),t,sag?e.jsx("small",{style:{marginLeft:"auto"},children:sag}):null]});
const Alan=({t,a,children})=>e.jsxs("div",{children:[e.jsxs("label",{className:"yo-f",children:[t,a?e.jsxs("span",{children:[" ",a]}):null]}),children]});

export default function YayinOverlayPage(){
 const nav=useNav(),{currentUser:user}=useAuth(),{firebasePath:FB,routePrefix:RP,id:br}=usDisc(),{toast}=usToast();
 const[renk,ikon]=RENK[br]||RENK.aerobik;
 const[comps,setComps]=R.useState(null),[comp,setComp]=R.useState("");
 const[profs,setProfs]=R.useState({}),[pid,setPid]=R.useState(""),[tas,setTas]=R.useState(null),[sekme,setSekme]=R.useState("genel");
 const[veri,setVeri]=R.useState("hepsi"),[fmt,setFmt]=R.useState("json"),[ok,setOk]=R.useState(""),[kKat,setKKat]=R.useState(""),[akSec,setAkSec]=R.useState(null),[akAlet,setAkAlet]=R.useState({}),[kSure,setKSure]=R.useState(0),[pvG,setPvG]=R.useState("oto"),[kpAc,setKpAc]=R.useState(!1),[kpKay,setKpKay]=R.useState(""),[kpSec,setKpSec]=R.useState([]);
 const frame=R.useRef(null),pframe=R.useRef(null);
 R.useEffect(()=>onValue(ref(db,FB),s=>setComps(filterComps(s.val()||{},user)||{})),[FB,user]);
 const list=R.useMemo(()=>Object.entries(comps||{}).filter(([,c])=>c&&c.arsivli!==!0&&c.arsivli!=="true").map(([k,c])=>({k,ad:c.isim||c.name||k,t:c.baslangicTarihi||c.tarih||""})).sort((a,b)=>String(b.t).localeCompare(String(a.t))),[comps]);
 R.useEffect(()=>{if(!comp&&list.length===1)setComp(list[0].k)},[list,comp]);
 R.useEffect(()=>{setProfs({});setPid("");setTas(null);if(!comp)return;return onValue(ref(db,`${FB}/${comp}/yayinProfilleri`),s=>setProfs(s.val()||{}))},[FB,comp]);
 // linkte şu an ne görünür (2026-10-08): çağrı ve puan durumu canlı okunur
 const[cagri,setCagri]=R.useState({}),[puanVar,setPuanVar]=R.useState({});
 R.useEffect(()=>{setCagri({});setPuanVar({});if(!comp)return;const u1=onValue(ref(db,`${FB}/${comp}/aktifSporcu`),s=>setCagri(s.val()||{})),u2=onValue(ref(db,`${FB}/${comp}/puanlar`),s=>{const v=s.val()||{},o={};Object.entries(v).forEach(([k,x])=>{o[k]=!!x&&Object.values(x).some(a=>a&&typeof a==="object"&&(a.sonuc>0||Object.values(a).some(b=>b&&typeof b==="object"&&b.sonuc>0)))});setPuanVar(o)});return()=>{u1();u2()}},[FB,comp]);
 const C0=comps?.[comp]||{},kats=C0.kategoriler||{},evLogo=C0.etkinlikLogo||null,intl=C0.tur==="uluslararasi"||C0.uluslararasi===!0;
 const kayitli=pid&&profs[pid]?norm(profs[pid]):null,P=pid?profs[pid]||{}:{};
 const kirli=!!(tas&&kayitli&&JSON.stringify(tas)!==JSON.stringify(kayitli));
 R.useEffect(()=>{if(pid&&profs[pid]&&!tas)setTas(norm(profs[pid]))},[pid,profs,tas]);
 const plist=Object.entries(profs).filter(([,p])=>p&&typeof p==="object").map(([k,p])=>({k,ad:p.ad||k,g:p.guncelleme||0})).sort((a,b)=>String(a.ad).localeCompare(String(b.ad),"tr"));
 const usr=user?.kullaniciAdi||user?.username||user?.ad||"admin";
 const yaz=async(yol,deger,msg)=>{try{await update(ref(db),{[`${FB}/${comp}/yayinProfilleri/${yol}`]:deger});msg&&toast(msg,"success");return!0}catch{toast(__T("Kaydedilemedi."),"error");return!1}};
 const degis=(grp,k,v)=>setTas(t=>grp?{...t,[grp]:{...t[grp],[k]:v}}:{...t,[k]:v});
 const sec=async k=>{if(k===pid)return;if(kirli&&!await window.__gxConfirm(__T("Kaydedilmemiş değişiklikler kaybolacak. Devam edilsin mi?")))return;setPid(k);setTas(profs[k]?norm(profs[k]):null);setSekme("genel")};
 const yeni=async kopya=>{if(kirli&&!await window.__gxConfirm(__T("Kaydedilmemiş değişiklikler kaybolacak. Devam edilsin mi?")))return;
  const ad=await window.__gxPrompt(__T("Profil adı (ör. TRT Spor, YouTube, Salon ekranı):"),kopya&&tas?tas.ad+" "+__T("(kopya)"):"");if(!ad||!String(ad).trim())return;
  const k="p"+Date.now().toString(36),o={...(kopya&&tas?tas:norm({})),ad:String(ad).trim(),olusturma:Date.now(),guncelleme:Date.now(),guncelleyen:usr};
  if(await yaz(k,o,__T("Profil oluşturuldu."))){try{logAction("broadcast_profile",`Yayın profili oluşturuldu: ${o.ad}`,{user:usr,competitionId:comp,discipline:br})}catch{}setPid(k);setTas(norm(o));setSekme("genel")}};
 const kaydet=async()=>{if(!tas)return;const o={};ALANLAR.forEach(k=>o[k]=tas[k]);o.guncelleme=Date.now();o.guncelleyen=usr;
  const U={};Object.entries(o).forEach(([k,v])=>U[`${FB}/${comp}/yayinProfilleri/${pid}/${k}`]=v);
  try{await update(ref(db),U);toast(__T("Kaydedildi — kanaldaki overlay güncellendi."),"success");try{logAction("broadcast_profile",`Yayın profili kaydedildi: ${tas.ad}`,{user:usr,competitionId:comp,discipline:br})}catch{}}catch{toast(__T("Kaydedilemedi."),"error")}};
 const sil=async()=>{if(!pid)return;if(!await window.__gxConfirm(__T("Bu profil silinsin mi? Bu profille verilen overlay ve veri linkleri çalışmayı bırakır (varsayılan görünüme döner).")))return;
  const ad=P.ad||pid;if(await yaz(pid,null,__T("Profil silindi."))){try{logAction("broadcast_profile",`Yayın profili silindi: ${ad}`,{user:usr,competitionId:comp,discipline:br})}catch{}setPid("");setTas(null)}};
 const adDegis=async()=>{const ad=await window.__gxPrompt(__T("Yeni profil adı:"),tas?.ad||"");if(ad&&String(ad).trim()){degis(null,"ad",String(ad).trim());await yaz(pid+"/ad",String(ad).trim())}};
 // başka yarışmadan profil kopyalama — kategori filtresi yalnız bu yarışmada olan kategorilerle kalır; canlı kontrol / yayın dışı kopyalanmaz
 const kaynaklar=list.filter(x=>x.k!==comp&&comps?.[x.k]?.yayinProfilleri&&Object.keys(comps[x.k].yayinProfilleri).length);
 const kpProfs=kpKay?Object.entries(comps?.[kpKay]?.yayinProfilleri||{}).filter(([,p])=>p&&typeof p==="object").map(([k,p])=>({k,p,ad:p.ad||k})).sort((a,b)=>String(a.ad).localeCompare(String(b.ad),"tr")):[];
 R.useEffect(()=>{setKpSec(kpProfs.map(x=>x.k))},[kpKay]);
 R.useEffect(()=>{setKpAc(!1);setKpKay("")},[comp]);
 const kopyalaDis=async()=>{const sec=kpProfs.filter(x=>kpSec.includes(x.k));if(!sec.length)return;if(kirli&&!await window.__gxConfirm(__T("Kaydedilmemiş değişiklikler kaybolacak. Devam edilsin mi?")))return;
  const adlar=new Set(Object.values(profs).map(p=>String(p?.ad||"").trim()));const U={};let son=null,katDus=0;
  sec.forEach((x,i)=>{const n=norm(x.p),k="p"+(Date.now()+i).toString(36);let ad=String(n.ad||__T("Profil")).trim(),j=2;while(adlar.has(ad))ad=String(n.ad).trim()+" ("+(j++)+")";adlar.add(ad);
   const kk=n.kat.filter(c=>kats[c]);if(n.kat.length&&kk.length<n.kat.length)katDus++;const o={};ALANLAR.forEach(a=>o[a]=n[a]);o.ad=ad;o.kat=kk;o.olusturma=Date.now();o.guncelleme=Date.now();o.guncelleyen=usr;o.kaynak={yarisma:kpKay,profil:x.k};delete o.tvKod;
   U[`${FB}/${comp}/yayinProfilleri/${k}`]=o;son=[k,o]});
  try{await update(ref(db),U);toast(sec.length+" "+__T("profil kopyalandı.")+(katDus?" "+__T("Bu yarışmada olmayan kategoriler filtreden çıkarıldı."):""),"success");
   try{logAction("broadcast_profile",`Yayın profili kopyalandı (${sec.length}): ${sec.map(x=>x.ad).join(", ")} ← ${comps?.[kpKay]?.isim||kpKay}`,{user:usr,competitionId:comp,discipline:br})}catch{}
   setKpAc(!1);setKpKay("");if(son){setPid(son[0]);setTas(norm(son[1]));setSekme("genel")}}catch{toast(__T("Kaydedilemedi."),"error")}};
 // canlı kontrol (anında yazılır)
 const kontrol=async(g,al)=>{const o=g==="gizle"?{g:"gizle",ts:Date.now(),kim:usr}:{g,kat:kKat||null,alet:al||null,sure:+kSure||0,ts:Date.now(),kim:usr};
  if(await yaz(pid+"/kontrol",o)){setOk(g==="gizle"?__T("Elle gösterim kapatıldı"):__T("Kanala gönderildi ✓"));setTimeout(()=>setOk(""),2500)}};
 const kapat=async v=>{if(v&&!await window.__gxConfirm(__T("Yayın dışı: bu profildeki tüm grafikler kanaldan kaldırılır. Devam edilsin mi?")))return;await yaz(pid+"/kapali",v?!0:null,v?__T("Yayın dışı — grafikler gizlendi."):__T("Grafikler yeniden yayında."))};
 // önizleme
 const gonder=R.useCallback(()=>{try{frame.current?.contentWindow?.postMessage({gxProfil:tas||norm({}),evLogo},location.origin)}catch{}},[tas,evLogo]);
 R.useEffect(()=>{const t=setTimeout(gonder,150);return()=>clearTimeout(t)},[gonder]);
 R.useEffect(()=>{const f=ev=>{if(ev.origin===location.origin&&ev.data?.gxOverlayHazir)gonder()};window.addEventListener("message",f);return()=>window.removeEventListener("message",f)},[gonder]);
 R.useEffect(()=>{const f=ev=>{if(ev.origin===location.origin&&ev.data?.gxOnizleHazir){try{pframe.current?.contentWindow?.postMessage({gxKontrol:akSec?{g:akSec.g,kat:kKat||null,alet:akSec.alet||null,ts:Date.now()}:null},location.origin)}catch{}}};window.addEventListener("message",f);return()=>window.removeEventListener("message",f)},[akSec,kKat]);
 const pvGoster=g=>{setPvG(g);try{frame.current?.contentWindow?.postMessage({gxGoster:g},location.origin)}catch{}};
 // linkler
 const O=location.origin,ovUrl=comp&&pid?`${O}/broadcast-overlay.html?comp=${encodeURIComponent(comp)}&brans=${br}&profil=${pid}`:"";
 const apiUrl=comp&&pid?`${O}/api/yayin?comp=${encodeURIComponent(comp)}&brans=${br}&profil=${pid}${veri!=="hepsi"?"&veri="+veri:""}${fmt!=="json"?"&format="+fmt:""}`:"";
 const kopyala=async u=>{if(!u)return;try{await navigator.clipboard.writeText(u);setOk(__T("Kopyalandı ✓"))}catch{await window.__gxPrompt(__T("Linki kopyalayın:"),u)}setTimeout(()=>setOk(""),2500)};
 const prev=`${O}/yayin-overlay.html?demo=1&brans=${br}${intl?"":"&intl=0"}`,pvLive=comp&&pid?`${O}/yayin-overlay.html?comp=${encodeURIComponent(comp)}&brans=${br}&profil=${pid}&onizle=1`:"";
 // kategori filtresi
 const isFin=k=>/^final_/.test(k)||kats[k]?.final===!0,katAdi=k=>String(kats[k]?.name||kats[k]?.ad||k).replace(/^\s*\u{1F3C6}\s*/u,"").replace(/^final\s*[—–-]\s*/i,"");
 const ks=Object.keys(kats).sort((a,b)=>katAdi(a).localeCompare(katAdi(b),"tr")),fin=ks.filter(isFin),dig=ks.filter(k=>!isFin(k));
 const tk=tas?.kat||[],tog=k=>degis(null,"kat",tk.includes(k)?tk.filter(x=>x!==k):[...tk,k]);
 const chip=k=>e.jsxs("label",{className:"yo-cat"+(tk.includes(k)?" on":""),title:kats[k]?.name||k,children:[e.jsx("input",{type:"checkbox",checked:tk.includes(k),onChange:()=>tog(k)}),katAdi(k)]},k);
 const T=tas;
 const Pos=({v,on,ops})=>e.jsx("div",{className:"yo-pos",style:{gridTemplateColumns:`repeat(${Math.min(ops.length,4)},1fr)`},children:ops.map(([k,t])=>e.jsxs("button",{type:"button","data-v":k,className:v===k?"on":"",onClick:()=>on(k),children:[e.jsx("i",{}),t]},k))});
 const SEK=[["genel",__T("Genel"),"tune"],["logo",__T("Logolar"),"image"],["alt",__T("Alt bant"),"subtitles"],["tablo",__T("Sıralama"),"leaderboard"],["sirada",__T("Sıradaki"),"queue"],["podyum",__T("Podyum"),"emoji_events"]];
 const durumG={siralama:__T("Sıralama tablosu"),sirada:__T("Sıradaki sporcular"),podyum:__T("Podyum"),liste:__T("Başlangıç listesi"),"alt-gizle":__T("Alt bant gizli")};
 const kc=P.kontrol,kAktif=kc&&kc.g&&kc.g!=="gizle"&&!(+kc.sure>0&&Date.now()>(+kc.ts||0)+kc.sure*1000);

 const editor=T?e.jsxs("div",{className:"gxp-card",children:[
  e.jsx(Bas,{ic:"edit",renk:"#7C3AED",t:T.ad||__T("Profil"),sag:kirli?e.jsx("span",{className:"yo-kirli",children:__T("Kaydedilmedi")}):__T("Kayıtlı")}),
  e.jsx("div",{className:"yo-tabs",children:SEK.map(([k,t,ic])=>e.jsxs("button",{type:"button",className:sekme===k?"on":"",onClick:()=>setSekme(k),children:[I(ic),t,(k==="alt"&&T.alt.acik)||(k==="tablo"&&T.tablo.acik)||(k==="sirada"&&T.sirada.acik)||(k==="podyum"&&T.podyum.acik)?e.jsx("em",{}):null]},k))}),
  sekme==="genel"?e.jsxs("div",{children:[
   e.jsxs("div",{className:"yo-row",children:[e.jsx(Alan,{t:__T("Dil"),children:e.jsx(Seg,{v:T.dil,on:v=>degis(null,"dil",v),ops:[["tr","TR"],["en","EN"]]})}),e.jsx(Alan,{t:__T("Tema"),children:e.jsx(Seg,{v:T.tema,on:v=>degis(null,"tema",v),ops:[["tcf",__T("TCF lacivert")],["koyu",__T("Koyu")],["acik",__T("Açık")]]})})]}),
   e.jsxs("div",{className:"yo-row",children:[e.jsx(Alan,{t:__T("Vurgu rengi"),children:e.jsxs("div",{style:{display:"flex",gap:8,alignItems:"center"},children:[e.jsx("input",{type:"color",className:"yo-color",value:/^#[0-9a-f]{6}$/i.test(T.vurgu)?T.vurgu:"#e30613",onChange:ev=>degis(null,"vurgu",ev.target.value)}),T.vurgu?e.jsx("button",{type:"button",className:"yo-mini",onClick:()=>degis(null,"vurgu",""),children:__T("Varsayılan")}):e.jsx("span",{className:"yo-note",style:{margin:0},children:__T("Varsayılan (TCF kırmızısı)")})]})}),
    e.jsx(Alan,{t:__T("Arka plan"),a:__T("· şeffaf yoksa keying için"),children:e.jsx(Seg,{v:T.arka,on:v=>degis(null,"arka",v),ops:[["seffaf",__T("Şeffaf")],["yesil",__T("Yeşil")],["mavi",__T("Mavi")],["siyah",__T("Siyah")]]})})]}),
   e.jsxs("div",{className:"yo-row",children:[e.jsx(Alan,{t:__T("Boyut (%)"),children:e.jsx(Num,{v:T.olcek,mn:40,mx:200,st:5,on:v=>degis(null,"olcek",v)})}),e.jsx(Alan,{t:__T("Kenar boşluğu (px)"),a:__T("· TV güvenli alan"),children:e.jsx(Num,{v:T.kenar,mn:20,mx:240,st:10,on:v=>degis(null,"kenar",v)})})]}),
   e.jsxs("label",{className:"yo-f",children:[__T("Kategori filtresi")," ",e.jsx("span",{children:__T("· boş = tümü")})]}),
   !ks.length?e.jsx("p",{className:"yo-note",children:__T("Kategori yok")}):e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"yo-tools",children:[e.jsxs("button",{type:"button",onClick:()=>degis(null,"kat",[...ks]),children:[I("done_all"),__T("Tümü")]}),fin.length?e.jsx("button",{type:"button",onClick:()=>degis(null,"kat",[...fin]),children:"🏆 "+__T("Sadece finaller")}):null,e.jsxs("button",{type:"button",onClick:()=>degis(null,"kat",[]),children:[I("backspace"),__T("Temizle")]}),e.jsx("span",{className:"cnt",children:tk.length?tk.length+"/"+ks.length+" "+__T("seçili"):__T("Tümü yayında")})]}),
    fin.length?e.jsxs("div",{children:[e.jsx("div",{className:"yo-cgh",children:"🏆 "+__T("Finaller")}),e.jsx("div",{className:"yo-cats",children:fin.map(chip)})]}):null,
    dig.length?e.jsxs("div",{children:[e.jsx("div",{className:"yo-cgh",children:fin.length?__T("Elemeler"):__T("Kategoriler")}),e.jsx("div",{className:"yo-cats",children:dig.map(chip)})]}):null]}),
   e.jsx("p",{className:"yo-note",children:__T("Birden fazla alan aynı anda yarışıyorsa her alan/kanal için ayrı profil açıp yalnızca o alanın kategorilerini seçin.")})]}):null,
  sekme==="logo"?e.jsxs("div",{className:"yo-list",children:[
   e.jsx(Tog,{v:T.logo.etkinlik,on:v=>degis("logo","etkinlik",v),t:__T("Etkinlik logosu"),d:evLogo?__T("Yarışma kaydındaki logo (ör. Balkan Cimnastik Birliği)"):__T("Bu yarışmada etkinlik logosu yok — Yarışmalar → Düzenle'den ekleyin")}),
   evLogo&&T.logo.etkinlik?e.jsx("img",{src:evLogo,alt:"",className:"yo-thumb"}):null,
   e.jsx(Tog,{v:T.logo.tcf,on:v=>degis("logo","tcf",v),t:__T("TCF logosu")}),
   e.jsx(Tog,{v:T.logo.gymexa,on:v=>degis("logo","gymexa",v),t:"Gymexa Score"}),
   e.jsxs("div",{className:"yo-ek",children:[e.jsxs("div",{children:[e.jsx("b",{children:__T("Ek logo (TV kanalı / sponsor)")}),e.jsx("small",{children:__T("Yalnız bu profilde görünür. PNG/JPG/SVG — otomatik küçültülür.")})]}),
    T.logo.ek?e.jsx("img",{src:T.logo.ek,alt:"",className:"yo-thumb"}):null,
    e.jsxs("label",{className:"yo-btn g",style:{cursor:"pointer"},children:[I("upload"),T.logo.ek?__T("Değiştir"):__T("Logo yükle"),e.jsx("input",{type:"file",accept:"image/png,image/jpeg,image/svg+xml,image/webp",style:{display:"none"},onChange:async ev=>{const fl=ev.target.files&&ev.target.files[0];ev.target.value="";if(!fl)return;try{degis("logo","ek",await resimOku(fl))}catch{toast(__T("Logo okunamadı."),"error")}}})]}),
    T.logo.ek?e.jsxs("button",{type:"button",className:"yo-mini",onClick:()=>degis("logo","ek",null),children:[I("delete"),__T("Kaldır")]}):null]}),
   e.jsx(Alan,{t:__T("Köşe logosu"),a:__T("· seçili logolar ekranda sürekli durur"),children:e.jsx(Seg,{v:T.logo.kose||"yok",on:v=>degis("logo","kose",v),ops:[["yok",__T("Yok")],["sag-ust",__T("Sağ üst")],["sol-ust",__T("Sol üst")],["sag-alt",__T("Sağ alt")],["sol-alt",__T("Sol alt")]]})}),
   e.jsx("p",{className:"yo-note",children:__T("Seçili logolar alt bantta, sıralama ve podyum başlığında görünür. Hepsini kapatırsanız grafikler logosuz çıkar.")})]}):null,
  sekme==="alt"?e.jsxs("div",{className:"yo-list",children:[
   e.jsx(Tog,{v:T.alt.acik,on:v=>degis("alt","acik",v),t:__T("Alt bant açık"),d:__T("Çağrılan sporcunun adı ve yayınlanan puan kartı")}),
   T.alt.acik?e.jsxs(e.Fragment,{children:[
    e.jsxs("div",{className:"yo-row",children:[e.jsx(Tog,{v:T.alt.isim,on:v=>degis("alt","isim",v),t:__T("İsim bandı")}),e.jsx(Tog,{v:T.alt.puan,on:v=>degis("alt","puan",v),t:__T("Puan kartı")})]}),
    e.jsx(Alan,{t:__T("Konum"),children:e.jsx(Pos,{v:T.alt.konum,on:v=>degis("alt","konum",v),ops:[["alt-sol",__T("Alt sol")],["alt-orta",__T("Alt orta")],["alt-sag",__T("Alt sağ")],["ust-sol",__T("Üst sol")]]})}),
    e.jsxs("div",{className:"yo-row",children:[e.jsx(Alan,{t:__T("Puan süresi (sn)"),children:e.jsx(Num,{v:T.alt.sure,mn:3,mx:120,on:v=>degis("alt","sure",v)})}),e.jsx(Alan,{t:__T("İsim süresi"),a:__T("· 0 = sürekli"),children:e.jsx(Num,{v:T.alt.isimSure,mn:0,mx:600,on:v=>degis("alt","isimSure",v)})})]}),
    e.jsx("label",{className:"yo-f",children:__T("Gösterilecek bilgiler")}),
    e.jsxs("div",{className:"yo-row",children:[e.jsx(Tog,{v:T.alt.kulup,on:v=>degis("alt","kulup",v),t:__T("Kulüp / il")}),e.jsx(Tog,{v:T.alt.ulke,on:v=>degis("alt","ulke",v),t:__T("Ülke + bayrak")})]}),
    e.jsxs("div",{className:"yo-row",children:[e.jsx(Tog,{v:T.alt.bib,on:v=>degis("alt","bib",v),t:__T("Göğüs no (BIB)")}),e.jsx(Tog,{v:T.alt.detay,on:v=>degis("alt","detay",v),t:__T("Not detayları"),d:br==="ritmik"?"DB · DA · A · E":br==="artistik"?"D · E":"E · A · D"})]}),
    e.jsx(Tog,{v:T.alt.foto!==!1,on:v=>degis("alt","foto",v),t:__T("Sporcu fotoğrafı"),d:__T("Yüklenmiş fotoğraf varsa isim ve puan kartının solunda")}),
    e.jsx(Tog,{v:T.alt.sira,on:v=>degis("alt","sira",v),t:__T("Anlık sıra")})]}):null]}):null,
  sekme==="tablo"?e.jsxs("div",{className:"yo-list",children:[
   e.jsx(Tog,{v:T.tablo.acik,on:v=>degis("tablo","acik",v),t:__T("Anlık sıralama tablosu"),d:__T("Güncel kategorinin sıralaması; yeni puanla güncellenir, son puan alan vurgulanır")}),
   T.tablo.acik?e.jsxs(e.Fragment,{children:[
    e.jsx(Alan,{t:__T("Ne zaman"),children:e.jsx(Seg,{v:T.tablo.mod,on:v=>degis("tablo","mod",v),ops:[["puan",__T("Puan kartından sonra")],["surekli",__T("Sürekli")],["elle",__T("Yalnız elle")]]})}),
    e.jsx(Alan,{t:__T("Konum"),children:e.jsx(Pos,{v:T.tablo.konum,on:v=>degis("tablo","konum",v),ops:[["sag",__T("Sağ panel")],["sol",__T("Sol panel")],["orta",__T("Ortada büyük")]]})}),
    e.jsxs("div",{className:"yo-row",children:[e.jsx(Alan,{t:__T("Satır sayısı"),children:e.jsx(Num,{v:T.tablo.n,mn:3,mx:20,on:v=>degis("tablo","n",v)})}),T.tablo.mod==="puan"?e.jsx(Alan,{t:__T("Gösterim süresi (sn)"),children:e.jsx(Num,{v:T.tablo.sure,mn:3,mx:120,on:v=>degis("tablo","sure",v)})}):e.jsx("div",{})]}),
    br==="ritmik"||br==="artistik"?e.jsx(Alan,{t:__T("Sıralama türü"),children:e.jsx(Seg,{v:T.tablo.tur,on:v=>degis("tablo","tur",v),ops:[["genel",__T("Aletler sırayla")],["alet",__T("Son aletin sıralaması")]]})}):null,
    (br==="ritmik"||br==="artistik")&&T.tablo.tur!=="alet"?e.jsx(Tog,{v:T.tablo.aa===!0,on:v=>degis("tablo","aa",v),t:__T("Genel tasnif (alet toplamı) de dönsün"),d:__T("Kapalıyken yalnız aletlerin kendi sıralamaları gösterilir")}):null,
    (br==="ritmik"||br==="artistik")&&T.tablo.tur!=="alet"?e.jsx(Alan,{t:__T("Alet dönüş süresi (sn)"),a:__T("· çok aletli kategoride her alet bu süre görünür"),children:e.jsx(Num,{v:T.tablo.donguSure??10,mn:4,mx:60,on:v=>degis("tablo","donguSure",v)})}):null,
    T.tablo.konum==="orta"?e.jsx(Tog,{v:T.tablo.detay!==!1,on:v=>degis("tablo","detay",v),t:__T("Not sütunları"),d:br==="ritmik"?"DB · DA · A · E · "+__T("Ceza"):br==="artistik"?"D · E · "+__T("Kesinti"):"D · A · E · "+__T("Ceza")}):null,
    e.jsx("p",{className:"yo-note",children:__T("Eşitlikte WG kuralı: E, sonra A, sonra D notu yüksek olan önde. Kategori tamamlanınca başlık \"Sonuçlar\" olur ve ilk üç madalya rengiyle gösterilir.")})]}):null]}):null,
  sekme==="sirada"?e.jsxs("div",{className:"yo-list",children:[
   e.jsx(Tog,{v:T.sirada.acik,on:v=>degis("sirada","acik",v),t:__T("Sıradaki sporcular"),d:__T("Çıkış sırasına göre çağrılan sporcu ve sonraki sporcular")}),
   T.sirada.acik?e.jsxs(e.Fragment,{children:[
    e.jsx(Alan,{t:__T("Ne zaman"),children:e.jsx(Seg,{v:T.sirada.mod,on:v=>degis("sirada","mod",v),ops:[["cagri",__T("Sporcu çağrılınca")],["surekli",__T("Sürekli")],["elle",__T("Yalnız elle")]]})}),
    e.jsx(Alan,{t:__T("Konum"),children:e.jsx(Pos,{v:T.sirada.konum,on:v=>degis("sirada","konum",v),ops:[["sag-ust",__T("Sağ üst")],["sol-ust",__T("Sol üst")],["sag-alt",__T("Sağ alt")]]})}),
    e.jsx(Alan,{t:__T("Kaç sporcu"),children:e.jsx(Num,{v:T.sirada.n,mn:1,mx:8,on:v=>degis("sirada","n",v)})})]}):null]}):null,
  sekme==="podyum"?e.jsxs("div",{className:"yo-list",children:[
   e.jsx(Tog,{v:T.podyum.acik,on:v=>degis("podyum","acik",v),t:__T("Podyum / final sonuçları"),d:__T("İlk üç madalya renkleriyle; isterseniz ilk 8")}),
   T.podyum.acik?e.jsxs(e.Fragment,{children:[
    e.jsx(Alan,{t:__T("Ne zaman"),children:e.jsx(Seg,{v:T.podyum.mod,on:v=>degis("podyum","mod",v),ops:[["otomatik",__T("Kategori bitince otomatik")],["elle",__T("Yalnız elle")]]})}),
    br==="ritmik"||br==="artistik"?e.jsx(Tog,{v:T.podyum.aa===!0,on:v=>degis("podyum","aa",v),t:__T("Otomatik podyumda genel tasnif (alet toplamı)"),d:__T("Kapalıyken çok aletli kategoride son puanlanan aletin podyumu gösterilir")}):null,
    e.jsxs("div",{className:"yo-row",children:[e.jsx(Alan,{t:__T("Gösterilecek"),children:e.jsx(Seg,{v:String(T.podyum.n),on:v=>degis("podyum","n",+v),ops:[["3",__T("İlk 3")],["5",__T("İlk 5")],["8",__T("İlk 8")]]})}),T.podyum.mod==="otomatik"?e.jsx(Alan,{t:__T("Gösterim süresi (sn)"),children:e.jsx(Num,{v:T.podyum.sure,mn:5,mx:180,on:v=>degis("podyum","sure",v)})}):e.jsx("div",{})]})]}):null]}):null,
  e.jsxs("div",{className:"yo-save",children:[e.jsx("span",{className:"yo-note",style:{margin:0},children:kirli?__T("Kaydedince bu profili kullanan kanallarda anında uygulanır."):__T("Değişiklik yok.")}),
   e.jsx("button",{type:"button",className:"yo-btn g",disabled:!kirli,onClick:()=>setTas(kayitli),children:__T("Geri al")}),
   e.jsxs("button",{type:"button",className:"yo-btn",disabled:!kirli,onClick:kaydet,children:[I("save"),__T("Kaydet")]})]})]}):null;

 // TV veri linki: kısa kodlu tv.gymexascore.net adresi — kanal kaynağı (sistem/veritabanı/yarışma kimliği) görmez
 const tvK=P.tvKod||"",tvQ=[veri!=="hepsi"?"veri="+veri:"",fmt!=="json"?"format="+fmt:""].filter(Boolean).join("&"),tvUrl=tvK?`https://tv.gymexascore.net/${tvK}${tvQ?"?"+tvQ:""}`:"";
 const tvOlustur=async()=>{if(tvK&&!await window.__gxConfirm(__T("Yeni TV linki oluşturulursa kanaldaki eski link çalışmaz. Devam edilsin mi?")))return;
  const k=__gsKod(),U={[`criteria/kisaLink/${k}`]:{t:"tv",b:br,c:comp,p:pid,ts:Date.now(),kim:usr}};if(tvK)U[`criteria/kisaLink/${tvK}/iptal`]=!0;U[`${FB}/${comp}/yayinProfilleri/${pid}/tvKod`]=k;
  try{await update(ref(db),U);toast(__T("TV linki hazır"),"success")}catch{toast(__T("Hata oluştu."),"error")}};
 const durumKart=(()=>{if(!pid)return null;const p=tas||kayitli||{},kf=Array.isArray(p.kat)&&p.kat.length?p.kat:null,ic=k=>!kf||kf.includes(k)||kf.includes(String(k).replace(/^final_/,"").split("__")[0]);
  const cg=Object.entries(cagri||{}).filter(([k,v])=>ic(k)&&v&&typeof v==="object"&&(v.ad||v.soyad||v.id)),pv=Object.entries(puanVar||{}).some(([k,v])=>v&&ic(k)),ad=v=>[v.ad,v.soyad].filter(Boolean).join(" ");
  const md=(m,el)=>m==="elle"?__T("yalnız Canlı kontrol'den açılınca"):m==="surekli"?__T("sürekli"):el;
  const L=[];
  if(P.kapali)L.push(["block",__T("Profil YAYIN DIŞI — linkte hiçbir şey görünmez."),!1]);
  L.push(["subtitles",p.alt?.acik===!1?__T("Alt bant kapalı."):cg.length?__T("Alt bant: çağrılı sporcu var")+" ("+cg.slice(0,2).map(([,v])=>ad(v)).join(", ")+") — "+__T("görünür."):__T("Alt bant: şu an çağrılmış sporcu yok — başhakem sporcuyu çağırınca çıkar."),p.alt?.acik!==!1&&cg.length>0]);
  L.push(["leaderboard",!p.tablo?.acik?__T("Sıralama tablosu kapalı."):__T("Sıralama tablosu")+": "+md(p.tablo?.mod,pv?__T("puan yayınlanınca görünür."):__T("henüz puan yok — ilk puan yayınlanınca görünür.")),!!p.tablo?.acik&&(p.tablo?.mod==="surekli"||pv)]);
  L.push(["queue_play_next",!p.sirada?.acik?__T("Sıradaki kapalı."):__T("Sıradaki")+": "+md(p.sirada?.mod,cg.length?__T("çağrı varken görünür."):__T("çağrı olunca görünür.")),!!p.sirada?.acik&&(p.sirada?.mod==="surekli"||p.sirada?.mod!=="elle"&&cg.length>0)]);
  L.push(["emoji_events",!p.podyum?.acik?__T("Podyum kapalı."):__T("Podyum")+": "+md(p.podyum?.mod,__T("kategori tamamlanınca görünür.")),!1]);
  const bos=!L.some(x=>x[2]);
  return e.jsxs("div",{className:"gxp-card",children:[e.jsx(Bas,{ic:"visibility",renk:bos?"#DC2626":"#16A34A",t:__T("Linkte şu an ne görünür?")}),
   bos?e.jsx("p",{className:"yo-note",style:{marginTop:0,color:"#B91C1C",fontWeight:700},children:__T("Şu an gösterilecek bir şey yok; link boş (şeffaf) görünür. Bu normaldir — sporcu çağrılınca ya da puan yayınlanınca grafikler kendiliğinden gelir. Hemen görmek için aşağıdaki Canlı kontrol'den Sıralama / Sıradaki / Podyum açabilirsiniz.")}):null,
   e.jsx("div",{style:{display:"grid",gap:6},children:L.map(([i,t,on],x)=>e.jsxs("div",{style:{display:"flex",alignItems:"flex-start",gap:8,fontSize:13,fontWeight:600,color:on?"#166534":"#475569"},children:[e.jsx("i",{className:"material-icons-round",style:{fontSize:18,color:on?"#16A34A":"#94A3B8"},children:i}),e.jsx("span",{children:t})]},x))})]})})();
 const linkler=pid?e.jsxs("div",{className:"gxp-card",children:[e.jsx(Bas,{ic:"link",renk:"#DB2777",t:__T("Kanala verilecek linkler")}),
  e.jsxs("label",{className:"yo-f",style:{marginTop:0},children:[__T("Overlay linki")," ",e.jsx("span",{children:__T("· OBS / vMix / Tricaster tarayıcı kaynağı, 1920×1080, şeffaf")})]}),
  e.jsx("div",{className:"yo-url",children:ovUrl}),
  e.jsxs("div",{className:"yo-btns",children:[e.jsxs("button",{type:"button",className:"yo-btn",onClick:()=>kopyala(ovUrl),children:[I("content_copy"),__T("Kopyala")]}),e.jsxs("button",{type:"button",className:"yo-btn g",onClick:()=>window.open(ovUrl,"_blank"),children:[I("open_in_new"),__T("Aç")]})]}),
  e.jsxs("label",{className:"yo-f",children:[__T("TV veri linki")," ",e.jsx("span",{children:__T("· kanalın kendi grafik sistemi için (vMix Data Source, CasparCG, Vizrt, Ross)")})]}),
  e.jsxs("div",{className:"yo-row",style:{marginBottom:8},children:[e.jsx("select",{className:"yo-sel",value:veri,onChange:ev=>setVeri(ev.target.value),children:[["hepsi",__T("Hepsi (tek paket)")],["canli",__T("Çağrılan sporcu")],["son",__T("Son yayınlanan puan")],["siralama",__T("Anlık sıralama")],["sirada",__T("Sıradaki sporcular")],["podyum",__T("Podyum")]].map(([k,t])=>e.jsx("option",{value:k,children:t},k))}),
   e.jsx(Seg,{v:fmt,on:setFmt,ops:[["json","JSON"],["xml","XML"],["csv","CSV"]]})]}),
  tvK?e.jsx("div",{className:"yo-url",children:tvUrl}):e.jsx("div",{className:"yo-url",style:{fontFamily:"inherit",color:"#64748B"},children:__T("Bu profil için henüz TV linki yok. Kanal yalnız tv.gymexascore.net/<kod> adresini görür; sistem ve veri kaynağı görünmez.")}),
  e.jsxs("div",{className:"yo-btns",children:[tvK?e.jsxs("button",{type:"button",className:"yo-btn",onClick:()=>kopyala(tvUrl),children:[I("content_copy"),__T("Kopyala")]}):null,
   tvK?e.jsxs("a",{href:tvUrl,target:"_blank",rel:"noopener noreferrer",className:"yo-btn g",style:{textDecoration:"none"},children:[I("open_in_new"),__T("Veriyi gör")]}):null,
   e.jsxs("button",{type:"button",className:"yo-btn"+(tvK?" g":""),onClick:tvOlustur,children:[I(tvK?"autorenew":"add_link"),tvK?__T("Yeni link"):__T("TV linki oluştur")]}),ok?e.jsx("span",{className:"yo-ok",children:ok}):null]}),
  e.jsx("p",{className:"yo-note",children:__T("Veri linki profilin kategori filtresine, diline ve satır sayısına uyar; 1–2 saniyede bir okunabilir. Alanlar: name, club, noc, flag, bib, total, d/da/db, a, e, pen, rank. Logolar logos alanında görsel linki olarak gelir.")})]}):null;

 // ---- YAYIN MASASI (2026-10-10): her grafik bir satır — mod (otomatik / sürekli / manuel / kapalı) · alet · Önizle · Ekrana ver · Ekrandan çek ----
 //  Üstte iki ekran: KANALDA (gerçek overlay linki, salt okuma) ve ÖNİZLEME (?onizle=1, kanala gitmez).
 //  Mod değişikliği profile anında yazılır (kanalda hemen geçerli). "Ekrana ver" → kontrol {g,kat,alet,sure}; "Ekrandan çek" → manuel ise gizle,
 //  otomatik açılmışsa kontrol {g:"cek",hedef} (overlay grafiği hemen kaldırır, sonraki tetikte yine gelir); sürekli moddaysa manuele alınır.
 const ALAD={serbest:"Serbest (WA)",ip:"İp",cember:"Çember",top:"Top",labut:"Labut",kurdele:"Kurdele",grup_seri1:"1. Seri",grup_seri2:"2. Seri",atlama:"Atlama",asimetrik:"Asimetrik",denge:"Denge",yer:"Yer",kulplu:"Kulplu Beygir",mantar:"Mantar",halka:"Halka",paralel:"Paralel",barfiks:"Barfiks"},ALEN={serbest:"Free (WA)",ip:"Rope",cember:"Hoop",top:"Ball",labut:"Clubs",kurdele:"Ribbon",grup_seri1:"Routine 1",grup_seri2:"Routine 2",atlama:"Vault",asimetrik:"Uneven Bars",denge:"Beam",yer:"Floor",kulplu:"Pommel Horse",mantar:"Pommel",halka:"Rings",paralel:"Parallel Bars",barfiks:"High Bar"};
 const enU=document.documentElement.lang==="en",alAd=a=>a==="__aa"?(enU?"All-Around (total)":"Genel tasnif (toplam)"):(enU?ALEN[a]:ALAD[a])||a;
 const akAl=k=>{const a=kats[k]?.aletler;return(Array.isArray(a)?a:a&&typeof a==="object"?Object.keys(a).filter(x=>a[x]):[]).map(x=>typeof x==="object"?x.id||x.value:x).filter(Boolean)};
 const tumAl=[...new Set((kKat?[kKat]:ks).flatMap(akAl))],cokAl=tumAl.length>1;
 const GAD={siralama:__T("Sıralama tablosu"),sirada:__T("Sıradaki sporcular"),podyum:__T("Podyum"),liste:__T("Başlangıç listesi"),"alt-gizle":__T("Alt bant gizli")};
 const itAd=it=>!it?"":(GAD[it.g]||it.g)+(it.alet?" · "+alAd(it.alet):"")+(it.kat?" · "+katAdi(it.kat):"");
 const pvKontrol=it=>{try{pframe.current?.contentWindow?.postMessage({gxKontrol:it?{g:it.g,kat:kKat||null,alet:it.alet||null,ts:Date.now()}:null},location.origin)}catch{}};
 const pvSec=it=>{setAkSec(it);pvKontrol(it)};
 const modYaz=async(grp,patch,msg)=>{const U={};Object.entries(patch).forEach(([k,v])=>{U[`${FB}/${comp}/yayinProfilleri/${pid}/${grp}/${k}`]=v});try{await update(ref(db),U);!kirli&&setTas(t=>t?{...t,[grp]:{...(t[grp]||{}),...patch}}:t);setOk(msg||__T("Kanala uygulandı ✓"));setTimeout(()=>setOk(""),2500)}catch{toast(__T("Kaydedilemedi."),"error")}};
 const cek=async(h,g,surekli)=>{if(surekli){await modYaz(h==="tablo"?"tablo":"sirada",{mod:"elle"},__T("Sürekli gösterim kapatıldı — manuele alındı"));if(kAktif&&kc.g===g)await kontrol("gizle");return}
  if(kAktif&&g&&kc.g===g){await kontrol("gizle");return}if(await yaz(pid+"/kontrol",{g:"cek",hedef:h,ts:Date.now(),kim:usr})){setOk(__T("Ekrandan çekildi ✓"));setTimeout(()=>setOk(""),2500)}};
 const PR=P||{},mAlt=PR.alt?.acik===!1?"kapali":"oto",mTab=!PR.tablo?.acik?"kapali":PR.tablo.mod||"puan",mSir=!PR.sirada?.acik?"kapali":PR.sirada.mod||"cagri",mPod=!PR.podyum?.acik?"kapali":PR.podyum.mod||"otomatik";
 const SAT=[
  {h:"alt",ic:"subtitles",t:__T("Alt bant"),d:__T("Çağrılan sporcunun adı; puan gelince puan kartı"),mod:mAlt,mods:[["oto",__T("Otomatik")],["kapali",__T("Kapalı")]],setMod:v=>modYaz("alt",{acik:v!=="kapali"}),g:null},
  {h:"tablo",ic:"leaderboard",t:__T("Sıralama tablosu"),d:__T("Kategorinin / aletin anlık sıralaması"),mod:mTab,mods:[["puan",__T("Otomatik · puandan sonra")],["surekli",__T("Sürekli ekranda")],["elle",__T("Manuel")],["kapali",__T("Kapalı")]],setMod:v=>modYaz("tablo",v==="kapali"?{acik:!1}:{acik:!0,mod:v}),g:"siralama",al:!0},
  {h:"sirada",ic:"queue",t:__T("Sıradaki sporcular"),d:__T("Çağrılan sporcu ve sonraki sporcular"),mod:mSir,mods:[["cagri",__T("Otomatik · çağrıda")],["surekli",__T("Sürekli ekranda")],["elle",__T("Manuel")],["kapali",__T("Kapalı")]],setMod:v=>modYaz("sirada",v==="kapali"?{acik:!1}:{acik:!0,mod:v}),g:"sirada"},
  {h:"podyum",ic:"emoji_events",t:__T("Podyum"),d:__T("İlk üç, madalya renkleriyle"),mod:mPod,mods:[["otomatik",__T("Otomatik · kategori bitince")],["elle",__T("Manuel")],["kapali",__T("Kapalı")]],setMod:v=>modYaz("podyum",v==="kapali"?{acik:!1}:{acik:!0,mod:v}),g:"podyum",al:!0},
  {h:"liste",ic:"format_list_numbered",t:__T("Başlangıç listesi"),d:__T("Kategorinin sporcuları çıkış sırasıyla, 12'şerli sayfalar"),mod:"elle",mods:[["elle",__T("Yalnız manuel")]],setMod:()=>{},g:"liste"}];
 const satirEl=x=>{const al=x.al?akAlet[x.g]||"":"",it={g:x.g,alet:al||null},ekranda=kAktif&&x.g&&kc.g===x.g,pv=akSec&&x.g&&akSec.g===x.g&&(akSec.alet||null)===(al||null),kap=x.mod==="kapali";
  const durum=P.kapali?[__T("YAYIN DIŞI"),"kr"]:ekranda?[__T("EKRANDA · manuel"),"on"]:kap?[__T("Kapalı"),"of"]:x.mod==="surekli"?[__T("Sürekli ekranda"),"on"]:x.mod==="elle"?[__T("Bekliyor · manuel"),"bk"]:[__T("Otomatik"),"ot"];
  return e.jsxs("div",{className:"ym-r"+(ekranda?" on":"")+(kap?" kap":""),children:[
   e.jsxs("div",{className:"ym-ad",children:[I(x.ic),e.jsxs("span",{children:[e.jsx("b",{children:x.t}),e.jsx("small",{children:x.d})]})]}),
   e.jsx("div",{className:"ym-mod",children:x.mods.map(([k,t])=>e.jsx("button",{type:"button",className:x.mod===k?"on":"",onClick:()=>x.mod!==k&&x.setMod(k),children:t},k))}),
   e.jsx("div",{className:"ym-al",children:x.al?e.jsxs("select",{value:al,onChange:ev=>{const v=ev.target.value;setAkAlet(o=>({...o,[x.g]:v}));pv&&pvSec({g:x.g,alet:v||null})},children:[e.jsx("option",{value:"",children:x.g==="podyum"?__T("Alet: son puanlanan"):__T("Alet: otomatik (sırayla)")}),...tumAl.map(a=>e.jsx("option",{value:a,children:alAd(a)},a)),cokAl?e.jsx("option",{value:"__aa",children:alAd("__aa")}):null]}):null}),
   e.jsxs("div",{className:"ym-btn",children:[x.g?e.jsxs("button",{type:"button",className:"pv"+(pv?" on":""),onClick:()=>pvSec(it),children:[I("visibility"),__T("Önizle")]}):e.jsx("span",{}),
    x.g?e.jsxs("button",{type:"button",className:"go",disabled:!!P.kapali,onClick:()=>kontrol(x.g,al||null),children:[I("play_arrow"),__T("Ekrana ver")]}):e.jsx("span",{}),
    e.jsxs("button",{type:"button",className:"st",disabled:!!P.kapali||kap&&!ekranda,onClick:()=>cek(x.h,x.g,x.mod==="surekli"),children:[I("stop"),__T("Ekrandan çek")]})]}),
   e.jsx("span",{className:"ym-dur "+durum[1],children:durum[0]})]},x.h)};
 const ovLive=comp&&pid?`${O}/yayin-overlay.html?comp=${encodeURIComponent(comp)}&brans=${br}&profil=${pid}`:"";
 const canli=pid?e.jsxs("div",{className:"gxp-card ym",children:[e.jsx(Bas,{ic:"settings_remote",renk:"#EA580C",t:__T("Yayın masası")+" — "+(PR.ad||""),sag:P.kapali?e.jsx("span",{className:"yo-kirli",children:__T("YAYIN DIŞI")}):kAktif?e.jsx("span",{className:"yo-live",children:itAd(kc)}):__T("Otomatik akış")}),
  e.jsxs("div",{className:"ym-ekr",children:[
   e.jsxs("div",{children:[e.jsxs("div",{className:"ym-et kanal",children:[e.jsx("span",{className:"dot"}),__T("KANALDA ŞU AN")]}),e.jsx("div",{className:"yo-prev",children:e.jsx("iframe",{src:ovLive,title:__T("kanal görüntüsü")})})]}),
   e.jsxs("div",{children:[e.jsxs("div",{className:"ym-et",children:[I("visibility"),__T("ÖNİZLEME"),e.jsx("small",{children:akSec?itAd({...akSec,kat:kKat||null}):__T("satırlardan Önizle'ye basın")})]}),e.jsx("div",{className:"yo-prev",children:e.jsx("iframe",{ref:pframe,src:pvLive,title:__T("önizleme")})})]})]}),
  e.jsxs("div",{className:"ym-ust",children:[e.jsxs("label",{children:[I("category"),e.jsx("span",{children:__T("Kategori")}),e.jsxs("select",{className:"yo-sel",value:kKat,onChange:ev=>{setKKat(ev.target.value);setAkSec(null);pvKontrol(null)},children:[e.jsx("option",{value:"",children:__T("Otomatik (yarışan kategori)")}),ks.map(k=>e.jsx("option",{value:k,children:katAdi(k)},k))]})]}),
   e.jsxs("label",{children:[I("timer"),e.jsx("span",{children:__T("Manuel gösterim süresi (sn)")}),e.jsx(Num,{v:kSure,mn:0,mx:600,st:5,on:setKSure}),e.jsx("small",{children:+kSure>0?"":__T("0 = ekrandan çekene kadar")})]})]}),
  e.jsxs("div",{className:"ym-bas",children:[e.jsx("span",{children:__T("Grafik")}),e.jsx("span",{children:__T("Ne zaman görünsün?")}),e.jsx("span",{children:__T("Alet")}),e.jsx("span",{children:__T("İşlem")}),e.jsx("span",{children:__T("Durum")})]}),
  ...SAT.map(satirEl),
  e.jsxs("div",{className:"ym-alt",children:[P.kapali?e.jsxs("button",{type:"button",className:"yo-btn",onClick:()=>kapat(!1),children:[I("play_arrow"),__T("Yayına dön (grafikleri geri aç)")]}):e.jsxs("button",{type:"button",className:"yo-btn kr",onClick:()=>kapat(!0),children:[I("block"),__T("Tüm grafikleri gizle (yayın dışı)")]}),
   kAktif?e.jsxs("button",{type:"button",className:"yo-btn g",onClick:()=>kontrol("gizle"),children:[I("autorenew"),__T("Manuel gösterimi bitir — otomatiğe dön")]}):null,ok?e.jsx("span",{className:"yo-ok",children:ok}):null]}),
  e.jsx("p",{className:"yo-note",children:__T("Otomatik: grafik kurala göre kendiliğinden gelir ve süresi dolunca gider. Sürekli: hep ekranda. Manuel: yalnız 'Ekrana ver' ile gelir. Kapalı: hiç görünmez. 'Ekrandan çek' o an ekrandaki grafiği hemen kaldırır. Aletlerin toplamı (genel tasnif) yalnız alet listesinden açıkça seçilirse gösterilir.")})]}):null;
 return e.jsxs("div",{className:"gxp",style:{"--gxp-c":renk},children:[e.jsx("style",{children:CSS}),
  e.jsxs("div",{className:"gxp-hdr",children:[e.jsx("button",{type:"button",className:"gxp-back",onClick:()=>nav(RP||"/"),title:__T("Geri"),children:I("arrow_back")}),e.jsx("div",{className:"gxp-ic",children:I("live_tv")}),e.jsxs("div",{className:"gxp-tt",children:[e.jsx("h1",{children:__T("Yayın Overlay")}),e.jsx("p",{children:__T("TV ve internet yayını için grafikler, kanal profilleri ve canlı veri linki")})]}),
   e.jsx("div",{className:"gxp-sel",children:e.jsxs("select",{value:comp,onChange:async ev=>{const v=ev.target.value;if(kirli&&!await window.__gxConfirm(__T("Kaydedilmemiş değişiklikler kaybolacak. Devam edilsin mi?")))return;setComp(v)},children:[e.jsx("option",{value:"",children:comps===null?__T("Yükleniyor…"):__T("— Yarışma seçin —")}),list.map(x=>e.jsx("option",{value:x.k,children:x.ad},x.k))]})})]}),
  !comp?e.jsx("div",{className:"gxp-card",children:e.jsxs("div",{className:"gxp-empty",children:[I("live_tv"),__T("Önce yarışma seçin.")]})}):
  e.jsxs("div",{className:"yo-grid",children:[canli,e.jsxs("div",{className:"yo-col",children:[
   e.jsxs("div",{className:"gxp-card",children:[e.jsx(Bas,{ic:"tv",renk:"#2563EB",t:__T("Yayın profilleri"),sag:plist.length?String(plist.length):null}),
    plist.length?e.jsx("div",{className:"yo-profs",children:plist.map(p=>e.jsxs("button",{type:"button",className:"yo-prof"+(p.k===pid?" on":""),onClick:()=>sec(p.k),children:[I(profs[p.k]?.kapali?"tv_off":"tv"),e.jsx("span",{children:p.ad}),profs[p.k]?.kapali?e.jsx("small",{children:__T("yayın dışı")}):null]},p.k))}):
     e.jsx("p",{className:"yo-note",style:{marginTop:0},children:__T("Her kanal ya da ekran için ayrı profil oluşturun (ör. TRT Spor, YouTube, Salon ekranı). Her profilin kendi logoları, grafikleri ve linki olur.")}),
    e.jsxs("div",{className:"yo-btns",children:[e.jsxs("button",{type:"button",className:"yo-btn",onClick:()=>yeni(!1),children:[I("add"),__T("Yeni profil")]}),e.jsxs("button",{type:"button",className:"yo-btn g"+(kpAc?" on":""),onClick:()=>setKpAc(v=>!v),children:[I("move_down"),__T("Başka yarışmadan")]}),pid?e.jsxs(e.Fragment,{children:[e.jsxs("button",{type:"button",className:"yo-btn g",onClick:()=>yeni(!0),children:[I("content_copy"),__T("Kopyala")]}),e.jsxs("button",{type:"button",className:"yo-btn g",onClick:adDegis,children:[I("edit"),__T("Adını değiştir")]}),e.jsxs("button",{type:"button",className:"yo-btn g kr",onClick:sil,children:[I("delete"),__T("Sil")]})]}):null]}),
    kpAc?e.jsxs("div",{className:"yo-kp",children:[e.jsx("b",{children:__T("Başka yarışmadan profil kopyala")}),
     !kaynaklar.length?e.jsx("p",{className:"yo-note",style:{margin:0},children:__T("Profili olan başka yarışma yok.")}):e.jsxs(e.Fragment,{children:[
      e.jsxs("select",{className:"yo-sel",value:kpKay,onChange:ev=>setKpKay(ev.target.value),children:[e.jsx("option",{value:"",children:__T("— Kaynak yarışma seçin —")}),kaynaklar.map(x=>e.jsx("option",{value:x.k,children:x.ad+" ("+Object.keys(comps[x.k].yayinProfilleri).length+")"},x.k))]}),
      kpProfs.length?e.jsx("div",{className:"yo-cats",children:kpProfs.map(x=>e.jsxs("label",{className:"yo-cat"+(kpSec.includes(x.k)?" on":""),children:[e.jsx("input",{type:"checkbox",checked:kpSec.includes(x.k),onChange:()=>setKpSec(s=>s.includes(x.k)?s.filter(y=>y!==x.k):[...s,x.k])}),x.ad]},x.k))}):null,
      kpKay?e.jsxs("div",{className:"yo-btns",style:{marginTop:0},children:[e.jsxs("button",{type:"button",className:"yo-btn",disabled:!kpSec.length,onClick:kopyalaDis,children:[I("content_copy"),__T("Kopyala")+" ("+kpSec.length+")"]}),e.jsx("button",{type:"button",className:"yo-btn g",onClick:()=>setKpAc(!1),children:__T("İptal")})]}):null,
      e.jsx("p",{className:"yo-note",style:{margin:0},children:__T("Logolar, grafikler ve tüm ayarlar kopyalanır; yeni yarışma için yeni link oluşur. Kategori filtresinde yalnız bu yarışmada da olan kategoriler kalır. Etkinlik logosu yarışmanın kendi logosudur.")})]})]}):null,
    e.jsx("p",{className:"yo-note",children:__T("Daha önce verilmiş profilsiz overlay linkleri aynen çalışmaya devam eder.")})]}),
   editor]}),
  e.jsxs("div",{className:"yo-col",children:[
   e.jsxs("div",{className:"gxp-card",children:[e.jsx(Bas,{ic:"palette",renk:"#0EA5E9",t:__T("Görünüm önizlemesi"),sag:__T("örnek veriyle")}),
    e.jsx("div",{className:"yo-prev",children:e.jsx("iframe",{ref:frame,src:prev,title:__T("önizleme"),onLoad:gonder})}),
    e.jsx("div",{className:"yo-tools",style:{marginTop:10},children:[["oto",__T("Döngü")],["isim",__T("İsim")],["puan",__T("Puan")],["tablo",__T("Sıralama")],["sirada",__T("Sıradaki")],["podyum",__T("Podyum")]].map(([k,t])=>e.jsx("button",{type:"button",className:pvG===k?"on":"",onClick:()=>pvGoster(k),children:t},k))}),
    e.jsx("p",{className:"yo-note",children:pid?__T("Önizleme kaydedilmemiş değişiklikleri de gösterir."):__T("Varsayılan görünüm. Profil seçince profilin ayarlarıyla gösterilir.")})]}),
   durumKart,linkler]})]})]})}
