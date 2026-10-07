// Gymexa Score × TCF ortak marka rozeti — her sayfanın sol altında küçük, tıklamayı engellemeyen rozet.
// Gizlendiği yerler: giriş sayfası (büyük ortak logo var), canlı skor yayın modu, yazdırma.
(function () {
  if (window.__gxCobrand) return; window.__gxCobrand = 1;
  try { if (window.self !== window.top) return; } catch (e) { return; } // bölünmüş ekran bölmesi: rozet üst sayfada
  var css = '#gx-cobrand{position:fixed;left:12px;bottom:12px;z-index:900;display:flex;align-items:center;gap:8px;padding:5px 11px 5px 9px;' +
    'background:rgba(255,255,255,.94);border:1px solid #E2E8F0;border-radius:999px;box-shadow:0 2px 10px rgba(15,23,42,.08);pointer-events:none;' +
    'transition:opacity .2s ease}#gx-cobrand img{display:block;width:auto}#gx-cobrand .gx-l{height:19px}#gx-cobrand .gx-t{height:22px}' +
    '#gx-cobrand i{display:block;width:1px;height:16px;background:#CBD5E1}' +
    '@media (max-width:520px){#gx-cobrand{left:8px;bottom:8px;padding:4px 9px 4px 7px;gap:6px}#gx-cobrand .gx-l{height:15px}#gx-cobrand .gx-t{height:18px}}' +
    '@media print{#gx-cobrand{display:none!important}}';
  function mount() {
    if (!document.body || document.getElementById('gx-cobrand')) return;
    var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
    var el = document.createElement('div'); el.id = 'gx-cobrand';
    el.title = 'Gymexa Score · Türkiye Cimnastik Federasyonu';
    el.innerHTML = '<img class="gx-l" src="/brand/gymnaxis-logo.svg" alt="Gymexa Score"><i></i><img class="gx-t" src="/logo.png" alt="Türkiye Cimnastik Federasyonu">';
    document.body.appendChild(el);
    var gizle = function () {
      var p = location.pathname, h = p === '/' || p === '/index.html' || !!document.querySelector('.sb-live,[data-gx-hide],body.ov');
      el.style.opacity = h ? '0' : '1'; el.style.visibility = h ? 'hidden' : 'visible';
    };
    gizle(); setInterval(gizle, 800);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount); else mount();
})();
