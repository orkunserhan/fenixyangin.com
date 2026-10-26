/* FENIX.COM — GİRİŞ NOKTASI & MERKEZİ ANALİTİK & CONSENT MODE V2 ALTYAPISI
   Tüm modüller defer ile yüklenir. Toplam JS hedefi: < 50 KB sıkıştırılmış. */
(function () {
  'use strict';
  if (document.querySelector('[data-actionbar]')) {
    document.body.classList.add('has-actionbar');
  }

  var cfg = window.FENIX_CONFIG || {};
  var CONSENT_KEY = 'fx_consent';
  var CONSENT_TTL_MS = 365 * 24 * 60 * 60 * 1000; // 12 ay

  // dataLayer ve gtag temel hazırlığı
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = window.gtag || gtag;

  // Consent Mode v2 — Temel Mod (gtag.js yüklenmeden önce varsayılan denied)
  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied'
  });

  function readConsent() {
    try {
      var raw = window.localStorage.getItem(CONSENT_KEY);
      if (!raw) return null;
      var trimmed = String(raw).trim();
      if (trimmed === 'granted' || trimmed === 'accepted' || trimmed === 'kabul') {
        return { status: 'granted', timestamp: Date.now() };
      }
      if (trimmed === 'denied' || trimmed === 'rejected' || trimmed === 'reddet') {
        return { status: 'denied', timestamp: Date.now() };
      }
      var parsed = JSON.parse(trimmed);
      if (typeof parsed === 'string') {
        if (parsed === 'granted' || parsed === 'accepted' || parsed === 'kabul') {
          return { status: 'granted', timestamp: Date.now() };
        }
        if (parsed === 'denied' || parsed === 'rejected' || parsed === 'reddet') {
          return { status: 'denied', timestamp: Date.now() };
        }
      }
      if (parsed && typeof parsed === 'object') {
        var val = parsed.status || parsed.value || parsed.consent || parsed.choice;
        var ts = parsed.timestamp || (parsed.date ? Date.parse(parsed.date) : null);
        if (ts && !isNaN(ts)) {
          if (Date.now() - ts > CONSENT_TTL_MS) {
            return null;
          }
        }
        if (val === 'granted' || val === 'accepted' || val === 'kabul' || val === true) {
          return { status: 'granted', timestamp: ts || Date.now() };
        }
        if (val === 'denied' || val === 'rejected' || val === 'reddet' || val === false) {
          return { status: 'denied', timestamp: ts || Date.now() };
        }
      }
    } catch (e) {}
    return null;
  }

  function writeConsent(status) {
    try {
      var payload = {
        status: status,
        value: status,
        date: new Date().toISOString(),
        timestamp: Date.now()
      };
      window.localStorage.setItem(CONSENT_KEY, JSON.stringify(payload));
    } catch (e) {}
  }

  function clearAnalyticsCookies() {
    try {
      var cookies = document.cookie ? document.cookie.split(';') : [];
      var host = window.location.hostname;
      var rootDomain = host.replace(/^www\./i, '');
      var domains = ['', host, '.' + host, rootDomain, '.' + rootDomain];
      for (var i = 0; i < cookies.length; i++) {
        var name = cookies[i].split('=')[0].trim();
        if (/^(_ga|_gid|_gat|_gcl_)/i.test(name)) {
          for (var d = 0; d < domains.length; d++) {
            var domPart = domains[d] ? '; domain=' + domains[d] : '';
            document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/' + domPart;
          }
        }
      }
    } catch (e) {}
  }

  var analyticsLoaded = false;
  var currentConsentStatus = null;

  window.fxHasAnalyticsConsent = function () {
    return currentConsentStatus === 'granted';
  };

  function loadAnalytics() {
    gtag('consent', 'update', {
      analytics_storage: 'granted'
    });
    if (analyticsLoaded) return;
    analyticsLoaded = true;

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
      var hasHeadGtag = !!document.querySelector('script[src*="googletagmanager.com/gtag/js"]');
      if (!hasHeadGtag) {
        var gaScript = document.createElement('script');
        gaScript.async = true;
        gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(primaryTrackingId);
        document.head.appendChild(gaScript);
      }
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
  }

  // Çerez Onay Bannerı ve Footer "Çerez tercihleri" Bağlantısı
  var bannerEl = null;

  function ensureBannerDom() {
    if (bannerEl) return bannerEl;
    bannerEl = document.createElement('div');
    bannerEl.className = 'fx-consent';
    bannerEl.id = 'fx-consent-banner';
    bannerEl.setAttribute('role', 'dialog');
    bannerEl.setAttribute('aria-label', 'Çerez tercihleri');
    bannerEl.setAttribute('aria-live', 'polite');
    bannerEl.hidden = true;

    var inner = document.createElement('div');
    inner.className = 'fx-consent__inner';

    var p = document.createElement('p');
    p.className = 'fx-consent__text';
    p.appendChild(document.createTextNode('Sitemizde ziyaret istatistiklerini ölçmek için çerezler kullanıyoruz. Ayrıntılar için '));
    var policyLink = document.createElement('a');
    policyLink.className = 'fx-consent__link';
    policyLink.href = '/cerez-politikasi/';
    policyLink.textContent = 'Çerez Politikası';
    p.appendChild(policyLink);
    p.appendChild(document.createTextNode('.'));

    var actions = document.createElement('div');
    actions.className = 'fx-consent__actions';

    var acceptBtn = document.createElement('button');
    acceptBtn.type = 'button';
    acceptBtn.className = 'fx-consent__btn';
    acceptBtn.setAttribute('data-consent-accept', '');
    acceptBtn.textContent = 'Kabul et';

    var rejectBtn = document.createElement('button');
    rejectBtn.type = 'button';
    rejectBtn.className = 'fx-consent__btn';
    rejectBtn.setAttribute('data-consent-reject', '');
    rejectBtn.textContent = 'Reddet';

    acceptBtn.addEventListener('click', function () {
      currentConsentStatus = 'granted';
      writeConsent('granted');
      hideConsentBanner();
      loadAnalytics();
    });

    rejectBtn.addEventListener('click', function () {
      currentConsentStatus = 'denied';
      writeConsent('denied');
      gtag('consent', 'update', {
        analytics_storage: 'denied'
      });
      clearAnalyticsCookies();
      hideConsentBanner();
    });

    actions.appendChild(acceptBtn);
    actions.appendChild(rejectBtn);
    inner.appendChild(p);
    inner.appendChild(actions);
    bannerEl.appendChild(inner);
    document.body.appendChild(bannerEl);
    return bannerEl;
  }

  function showConsentBanner(focusFirstButton) {
    var el = ensureBannerDom();
    el.hidden = false;
    if (focusFirstButton) {
      var btn = el.querySelector('[data-consent-accept]');
      if (btn) btn.focus();
    }
  }

  function hideConsentBanner() {
    if (bannerEl) {
      bannerEl.hidden = true;
    }
  }

  function injectCookiePreferencesLinks() {
    // 1. Standart footer (.fx-footer__legal-links) — 55 sayfanın tamamında bulunur
    var legalContainers = document.querySelectorAll('.fx-footer__legal-links');
    legalContainers.forEach(function (container) {
      if (container.querySelector('[data-cookie-prefs]')) return;
      var link = document.createElement('a');
      link.href = '#cerez-tercihleri';
      link.className = 'fx-footer__cookie-prefs';
      link.setAttribute('data-cookie-prefs', '');
      link.textContent = 'Çerez tercihleri';
      container.appendChild(link);
    });

    // 2. Ana sayfa masaüstü özel footer (.fx-hdf-bottom__right)
    var hdfContainers = document.querySelectorAll('.fx-hdf-bottom__right');
    hdfContainers.forEach(function (container) {
      if (container.querySelector('[data-cookie-prefs]')) return;
      var sep = document.createElement('span');
      sep.className = 'fx-hdf-sep';
      sep.setAttribute('aria-hidden', 'true');
      sep.textContent = '|';

      var link = document.createElement('a');
      link.href = '#cerez-tercihleri';
      link.className = 'fx-footer__cookie-prefs';
      link.setAttribute('data-cookie-prefs', '');
      link.textContent = 'Çerez tercihleri';

      var backTopBtn = container.querySelector('.fx-hdf-back-top');
      if (backTopBtn) {
        container.insertBefore(link, backTopBtn);
        container.insertBefore(sep, backTopBtn);
      } else {
        container.appendChild(sep);
        container.appendChild(link);
      }
    });
  }

  // Başlangıçta mevcut tercihi kontrol et
  injectCookiePreferencesLinks();
  var storedConsent = readConsent();
  if (storedConsent && storedConsent.status === 'granted') {
    currentConsentStatus = 'granted';
    loadAnalytics();
  } else if (storedConsent && storedConsent.status === 'denied') {
    currentConsentStatus = 'denied';
    clearAnalyticsCookies();
  } else {
    currentConsentStatus = null;
    showConsentBanner(false);
  }

  // Footer "Çerez tercihleri" tıklama dinleyicisi
  document.addEventListener('click', function (e) {
    var prefTrigger = e.target.closest('[data-cookie-prefs]');
    if (prefTrigger) {
      e.preventDefault();
      showConsentBanner(true);
    }
  });

  // Otomatik Dönüşüm & Lead Takibi (Yalnızca kullanıcı çerez onayı verdiyse çalışır)
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a');
    if (!a) return;
    if (!window.fxHasAnalyticsConsent()) return;
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
  (function () {
    var isGhPages = window.location.hostname.endsWith('github.io') && window.location.pathname.startsWith('/fenixyangin.com');
    if (!isGhPages) return;

    var PREFIX = '/fenixyangin.com';

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
