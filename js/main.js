/* FENIX.COM — GİRİŞ NOKTASI & MERKEZİ ANALİTİK
   Tüm modüller defer ile yüklenir. Toplam JS hedefi: < 50 KB sıkıştırılmış. */
(function () {
  'use strict';
  if (document.querySelector('[data-actionbar]')) {
    document.body.classList.add('has-actionbar');
  }

  // Google Analytics 4 (GA4) — Yalnızca geçerli bir Measurement ID girildiğinde çalışır
  var cfg = window.FENIX_CONFIG || {};
  var ga4Id = cfg.ga4Id && typeof cfg.ga4Id === 'string' ? cfg.ga4Id.trim() : '';
  if (ga4Id && /^G-[A-Z0-9]+$/i.test(ga4Id)) {
    var gaScript = document.createElement('script');
    gaScript.async = true;
    gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(ga4Id);
    document.head.appendChild(gaScript);

    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', ga4Id, {
      send_page_view: true,
      anonymize_ip: true
    });
  }

  // GitHub Pages Subpath Uyumluluğu
  // github.io/fenixyangin.com/ altında çalışırken tüm root-relative dahili bağlantıları repo köküne yönlendirir
  (function () {
    var isGhPages = window.location.hostname.endsWith('github.io') && window.location.pathname.startsWith('/fenixyangin.com');
    if (!isGhPages) return;

    var PREFIX = '/fenixyangin.com';

    // 1. Tıklama anında yakalama (capture phase) - hiçbir dahili bağlantı 404'e düşmez
    document.addEventListener('click', function (e) {
      var a = e.target.closest('a');
      if (!a) return;
      var href = a.getAttribute('href');
      if (!href) return;

      if (href.startsWith('/') && !href.startsWith(PREFIX) && !href.startsWith('//')) {
        e.preventDefault();
        window.location.href = PREFIX + href;
      }
    }, true);

    // 2. DOM yüklendiğinde linkleri ve resimleri dönüştür (hover, sağ tık vb.)
    function adaptDom() {
      document.querySelectorAll('a[href^="/"]').forEach(function (a) {
        var h = a.getAttribute('href');
        if (h && h.startsWith('/') && !h.startsWith(PREFIX) && !h.startsWith('//')) {
          a.setAttribute('href', PREFIX + h);
        }
      });
      document.querySelectorAll('img[src^="/"]').forEach(function (img) {
        var s = img.getAttribute('src');
        if (s && s.startsWith('/') && !s.startsWith(PREFIX) && !s.startsWith('//')) {
          img.setAttribute('src', PREFIX + s);
        }
      });
      document.querySelectorAll('img[src*="fenixyangin.com/assets/"]').forEach(function (img) {
        var s = img.getAttribute('src');
        var path = s.split('fenixyangin.com')[1];
        if (path) {
          img.setAttribute('src', PREFIX + path);
        }
      });
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', adaptDom);
    } else {
      adaptDom();
    }
  })();
})();
