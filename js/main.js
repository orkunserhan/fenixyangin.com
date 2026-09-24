/* FENIX.COM — GİRİŞ NOKTASI & MERKEZİ ANALİTİK & GOOGLE ADS ALTYAPISI
   Tüm modüller defer ile yüklenir. Toplam JS hedefi: < 50 KB sıkıştırılmış. */
(function () {
  'use strict';
  if (document.querySelector('[data-actionbar]')) {
    document.body.classList.add('has-actionbar');
  }

  var cfg = window.FENIX_CONFIG || {};

  // dataLayer ve gtag temel hazırlığı
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = window.gtag || gtag;

  // Google Tag Manager (GTM) — Opsiyonel
  var gtmId = cfg.gtmId && typeof cfg.gtmId === 'string' ? cfg.gtmId.trim() : '';
  if (gtmId && /^GTM-[A-Z0-9]+$/i.test(gtmId)) {
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer',gtmId);
  }

  // Google Analytics 4 (GA4) & Google Ads (AW-)
  var ga4Id = cfg.ga4Id && typeof cfg.ga4Id === 'string' ? cfg.ga4Id.trim() : '';
  var adsId = cfg.googleAdsId && typeof cfg.googleAdsId === 'string' ? cfg.googleAdsId.trim() : '';
  var primaryTrackingId = ga4Id || adsId;

  if (primaryTrackingId) {
    var gaScript = document.createElement('script');
    gaScript.async = true;
    gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(primaryTrackingId);
    document.head.appendChild(gaScript);

    gtag('js', new Date());
    if (ga4Id && /^G-[A-Z0-9]+$/i.test(ga4Id)) {
      gtag('config', ga4Id, {
        send_page_view: true,
        anonymize_ip: true
      });
    }
    if (adsId && /^AW-[0-9]+$/i.test(adsId)) {
      gtag('config', adsId);
    }
  }

  // Otomatik Dönüşüm & Lead Takibi (Google Ads, GA4 ve GTM Uyumlu)
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a');
    if (!a) return;
    var href = a.getAttribute('href') || '';

    // 1. Telefon Tıklamaları (Call Leads)
    if (href.startsWith('tel:')) {
      var tel = href.replace('tel:', '').trim();
      window.dataLayer.push({
        event: 'lead_call_click',
        conversion_type: 'phone_call',
        target_phone: tel,
        page_location: window.location.href
      });
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'generate_lead', {
          event_category: 'Contact',
          event_label: 'Phone Call: ' + tel,
          method: 'Phone'
        });
      }
    }
    // 2. WhatsApp Tıklamaları (Chat Leads)
    else if (href.indexOf('wa.me') !== -1 || href.indexOf('whatsapp.com') !== -1) {
      window.dataLayer.push({
        event: 'lead_whatsapp_click',
        conversion_type: 'whatsapp',
        page_location: window.location.href
      });
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'generate_lead', {
          event_category: 'Contact',
          event_label: 'WhatsApp Direct Chat',
          method: 'WhatsApp'
        });
      }
    }
    // 3. Teklif Al / İletişim Buton Tıklamaları (Quote CTA)
    else if (href.indexOf('/iletisim/') !== -1 && (a.innerText.indexOf('Teklif') !== -1 || a.classList.contains('fx-btn') || a.getAttribute('data-action-quote') !== null)) {
      window.dataLayer.push({
        event: 'lead_quote_click',
        conversion_type: 'quote_request',
        page_location: window.location.href
      });
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'begin_checkout', {
          event_category: 'Lead',
          event_label: 'Quote CTA Click'
        });
      }
    }
  }, true);

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
