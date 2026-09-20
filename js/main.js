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
})();
