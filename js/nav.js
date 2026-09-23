/* FENIX.COM — NAVİGASYON VE ÇAĞRI SEÇİCİ (2026 REDESIGN)
   Progressive enhancement: JS olmadan tüm bağlantılar doğrudan tel/link olarak çalışır. */
(function () {
  'use strict';

  var burger = document.querySelector('[data-burger]');
  var drawer = document.querySelector('[data-drawer]');
  var lastFocus = null;

  // ── 1. CALL SELECTOR BOTTOM SHEET ENTEGRASYONU ──
  var callSheetBackdrop = document.getElementById('fx-call-backdrop');
  var callSheet = document.getElementById('fx-call-sheet');

  function ensureCallSheet() {
    if (!callSheet) {
      callSheetBackdrop = document.createElement('div');
      callSheetBackdrop.id = 'fx-call-backdrop';
      callSheetBackdrop.className = 'fx-call-backdrop';
      callSheetBackdrop.hidden = true;
      callSheetBackdrop.setAttribute('aria-hidden', 'true');
      document.body.appendChild(callSheetBackdrop);

      callSheet = document.createElement('div');
      callSheet.id = 'fx-call-sheet';
      callSheet.className = 'fx-call-sheet';
      callSheet.hidden = true;
      callSheet.setAttribute('role', 'dialog');
      callSheet.setAttribute('aria-modal', 'true');
      callSheet.setAttribute('aria-labelledby', 'fx-call-sheet-title');
      callSheet.innerHTML =
        '<div class="fx-call-sheet__pill" aria-hidden="true"></div>' +
        '<div class="fx-call-sheet__header">' +
          '<h3 class="fx-call-sheet__title" id="fx-call-sheet-title">Hangi numarayı aramak<br>istiyorsunuz?</h3>' +
          '<button class="fx-call-sheet__close" type="button" data-call-close aria-label="Arama penceresini kapat">' +
            '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
              '<line x1="18" y1="6" x2="6" y2="18"></line>' +
              '<line x1="6" y1="6" x2="18" y2="18"></line>' +
            '</svg>' +
          '</button>' +
        '</div>' +
        '<div class="fx-call-sheet__body">' +
          '<a href="tel:02126180701" class="fx-call-option">' +
            '<span class="fx-call-option__icon" aria-hidden="true">' +
              '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">' +
                '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>' +
              '</svg>' +
            '</span>' +
            '<span class="fx-call-option__info">' +
              '<strong class="fx-call-option__num">0212 618 07 01</strong>' +
              '<span class="fx-call-option__label">Genel Müdürlük</span>' +
            '</span>' +
            '<span class="fx-call-option__chevron" aria-hidden="true">' +
              '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#A90432" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">' +
                '<polyline points="9 18 15 12 9 6"/>' +
              '</svg>' +
            '</span>' +
          '</a>' +
          '<a href="tel:02126180702" class="fx-call-option">' +
            '<span class="fx-call-option__icon" aria-hidden="true">' +
              '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">' +
                '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>' +
              '</svg>' +
            '</span>' +
            '<span class="fx-call-option__info">' +
              '<strong class="fx-call-option__num">0212 618 07 02</strong>' +
              '<span class="fx-call-option__label">Satış ve Proje</span>' +
            '</span>' +
            '<span class="fx-call-option__chevron" aria-hidden="true">' +
              '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#A90432" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">' +
                '<polyline points="9 18 15 12 9 6"/>' +
              '</svg>' +
            '</span>' +
          '</a>' +
          '<div class="fx-call-sheet__divider" aria-hidden="true"></div>' +
          '<a href="https://wa.me/905327409097" target="_blank" rel="noopener noreferrer" class="fx-call-option fx-call-option--wa">' +
            '<span class="fx-call-option__icon fx-call-option__icon--wa" aria-hidden="true">' +
              '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">' +
                '<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.89 9.885m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.952 3.71 1.453 5.711 1.454h.005c6.554 0 11.89-5.336 11.893-11.893a11.82 11.82 0 00-3.48-8.413z"/>' +
              '</svg>' +
            '</span>' +
            '<span class="fx-call-option__info">' +
              '<strong class="fx-call-option__num">WhatsApp</strong>' +
              '<span class="fx-call-option__label">Hemen mesaj gönderin</span>' +
            '</span>' +
            '<span class="fx-call-option__chevron" aria-hidden="true">' +
              '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#A90432" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">' +
                '<polyline points="9 18 15 12 9 6"/>' +
              '</svg>' +
            '</span>' +
          '</a>' +
        '</div>';
      document.body.appendChild(callSheet);

      var closeBtn = callSheet.querySelector('[data-call-close]');
      if (closeBtn) closeBtn.addEventListener('click', closeCallSheet);
      var pill = callSheet.querySelector('.fx-call-sheet__pill');
      if (pill) pill.addEventListener('click', closeCallSheet);
      callSheetBackdrop.addEventListener('click', closeCallSheet);
    }
  }

  function openCallSheet(e) {
    if (e && e.preventDefault) e.preventDefault();
    ensureCallSheet();
    callSheetBackdrop.hidden = false;
    callSheet.hidden = false;
    // Force layout reflow before triggering transition
    void callSheet.offsetWidth;
    callSheetBackdrop.classList.add('is-open');
    callSheet.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeCallSheet() {
    if (!callSheet || callSheet.hidden) return;
    callSheetBackdrop.classList.remove('is-open');
    callSheet.classList.remove('is-open');
    setTimeout(function () {
      if (callSheet && !callSheet.classList.contains('is-open')) {
        callSheet.hidden = true;
        callSheetBackdrop.hidden = true;
        if (!drawer || drawer.hidden) {
          document.body.style.overflow = '';
        }
      }
    }, 300);
  }

  // Delegated click listener for all call triggers
  document.addEventListener('click', function (e) {
    var trigger = e.target.closest('[data-call-trigger], .fx-actionbar a[href^="tel:"], .fx-drawer__contact-card, .fx-drawer__actions a[href^="tel:"]');
    if (trigger) {
      e.preventDefault();
      openCallSheet();
    }
  });

  // ── 2. MOBİL ÇEKMECE İÇERİK ZENGİNLEŞTİRME (PROGRESSIVE ENHANCEMENT) ──
  function enhanceDrawer() {
    if (!drawer) return;

    // Kapatma butonu SVG ikonu kontrolü
    var dClose = drawer.querySelector('[data-drawer-close]');
    if (dClose && !dClose.querySelector('svg')) {
      dClose.innerHTML =
        '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
          '<line x1="18" y1="6" x2="6" y2="18"></line>' +
          '<line x1="6" y1="6" x2="18" y2="18"></line>' +
        '</svg>';
    }

    // Logo ve Güvenli Yarınlar sloganı kontrolü
    var dLogo = drawer.querySelector('.fx-logo');
    if (dLogo && !dLogo.querySelector('.fx-drawer__tagline')) {
      dLogo.classList.add('fx-drawer__brand');
      var tag = document.createElement('span');
      tag.className = 'fx-drawer__tagline';
      tag.textContent = 'GÜVENLİ YARINLAR';
      dLogo.appendChild(tag);
    }

    // Menü öğeleri simge ve chevron zenginleştirmesi
    var icons = {
      'sistemler': '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>',
      'hizmetler': '<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>',
      'sektorler': '<path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v8h4"/><path d="M18 9h2a2 2 0 0 1 2 2v11h-4"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/>',
      'projeler': '<path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 8 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/>',
      'referanslar': '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
      'teknik-icerikler': '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>',
      'kurumsal': '<line x1="3" x2="21" y1="22" y2="22"/><line x1="6" x2="6" y1="18" y2="11"/><line x1="10" x2="10" y1="18" y2="11"/><line x1="14" x2="14" y1="18" y2="11"/><line x1="18" x2="18" y1="18" y2="11"/><polygon points="12 2 20 7 4 7"/><line x1="2" x2="22" y1="7" y2="7"/>',
      'iletisim': '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>'
    };

    var listLinks = drawer.querySelectorAll('.fx-drawer__list > li > a, .fx-drawer__list > li > .fx-drawer__item-row > a');
    Array.prototype.forEach.call(listLinks, function (link) {
      if (!link.classList.contains('fx-drawer__item')) {
        link.classList.add('fx-drawer__item');
        var text = link.textContent.trim();
        var href = link.getAttribute('href') || '';
        var key = '';
        if (href.indexOf('sistemler') !== -1) key = 'sistemler';
        else if (href.indexOf('hizmetler') !== -1) key = 'hizmetler';
        else if (href.indexOf('sektorler') !== -1) key = 'sektorler';
        else if (href.indexOf('projeler') !== -1) key = 'projeler';
        else if (href.indexOf('referanslar') !== -1) key = 'referanslar';
        else if (href.indexOf('teknik-icerikler') !== -1) key = 'teknik-icerikler';
        else if (href.indexOf('kurumsal') !== -1) key = 'kurumsal';
        else if (href.indexOf('iletisim') !== -1) key = 'iletisim';

        var iconPath = icons[key] || icons['sistemler'];
        link.innerHTML =
          '<span class="fx-drawer__item-left">' +
            '<svg class="fx-drawer__item-icon" viewBox="0 0 24 24" fill="none" stroke="#A90432" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
              iconPath +
            '</svg>' +
            '<span class="fx-drawer__item-label">' + text + '</span>' +
          '</span>' +
          '<svg class="fx-drawer__chevron" viewBox="0 0 24 24" fill="none" stroke="#A90432" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
            '<polyline points="9 18 15 12 9 6"/>' +
          '</svg>';
      }
    });

    // Hizmetler alt menü (akordiyon) zenginleştirmesi
    var hizmetlerLi = Array.prototype.find.call(drawer.querySelectorAll('.fx-drawer__list > li'), function (li) {
      var a = li.querySelector('a');
      var href = a ? (a.getAttribute('href') || '') : '';
      return href === '/hizmetler/' || href.indexOf('/hizmetler/') !== -1;
    });

    if (hizmetlerLi) {
      if (!hizmetlerLi.querySelector('.fx-drawer__sub')) {
        hizmetlerLi.className = 'fx-drawer__group fx-drawer__group--hizmetler';
        hizmetlerLi.innerHTML =
          '<div class="fx-drawer__item-row">' +
            '<a href="/hizmetler/" class="fx-drawer__item">' +
              '<span class="fx-drawer__item-left">' +
                '<svg class="fx-drawer__item-icon" viewBox="0 0 24 24" fill="none" stroke="#A90432" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
                  '<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>' +
                  '<circle cx="12" cy="12" r="3"/>' +
                '</svg>' +
                '<span class="fx-drawer__item-label">Hizmetler</span>' +
              '</span>' +
            '</a>' +
            '<button type="button" class="fx-drawer__sub-toggle" aria-label="Hizmetler alt menüsünü aç" aria-expanded="false" data-drawer-sub-toggle>' +
              '<svg class="fx-drawer__sub-chevron" viewBox="0 0 24 24" fill="none" stroke="#A90432" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
                '<polyline points="6 9 12 15 18 9"/>' +
              '</svg>' +
            '</button>' +
          '</div>' +
          '<div class="fx-drawer__sub" data-drawer-sub hidden>' +
            '<div class="fx-drawer__sub-inner">' +
              '<span class="fx-drawer__sub-eyebrow">YANGIN SÖNDÜRME HİZMETLERİ</span>' +
              '<div class="fx-drawer__sub-list">' +
                '<a href="/hizmetler/muhendislik/" class="fx-drawer__sub-link">' +
                  '<strong class="fx-drawer__sub-title">Mühendislik</strong>' +
                  '<span class="fx-drawer__sub-desc">Yangın danışmanlığı, hidrolik hesap ve projelendirme</span>' +
                '</a>' +
                '<a href="/hizmetler/kurulum/" class="fx-drawer__sub-link">' +
                  '<strong class="fx-drawer__sub-title">Kurulum</strong>' +
                  '<span class="fx-drawer__sub-desc">Anahtar teslim sistem kurulumu ve entegrasyon</span>' +
                '</a>' +
                '<a href="/hizmetler/montaj/" class="fx-drawer__sub-link">' +
                  '<strong class="fx-drawer__sub-title">Montaj</strong>' +
                  '<span class="fx-drawer__sub-desc">Standartlara uygun mekanik ve elektriksel montaj</span>' +
                '</a>' +
                '<a href="/hizmetler/tedarik/" class="fx-drawer__sub-link">' +
                  '<strong class="fx-drawer__sub-title">Tedarik</strong>' +
                  '<span class="fx-drawer__sub-desc">Onaylı silindir, vana, nozul ve ekipman temini</span>' +
                '</a>' +
                '<a href="/hizmetler/dolum/" class="fx-drawer__sub-link">' +
                  '<strong class="fx-drawer__sub-title">Dolum</strong>' +
                  '<span class="fx-drawer__sub-desc">FM200 ve Novec 1230 sertifikalı gaz dolumu</span>' +
                '</a>' +
                '<a href="/hizmetler/bakim/" class="fx-drawer__sub-link">' +
                  '<strong class="fx-drawer__sub-title">Bakım</strong>' +
                  '<span class="fx-drawer__sub-desc">TSE-HYB onaylı periyodik bakım ve kontrol</span>' +
                '</a>' +
              '</div>' +
              '<a href="/hizmetler/" class="fx-drawer__sub-footer">' +
                '<span>Tüm Hizmetleri İnceleyin</span>' +
                '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
                  '<line x1="5" y1="12" x2="19" y2="12"></line>' +
                  '<polyline points="12 5 19 12 12 19"></polyline>' +
                '</svg>' +
              '</a>' +
            '</div>' +
          '</div>';
      }

      var subToggle = hizmetlerLi.querySelector('[data-drawer-sub-toggle]');
      if (subToggle && !subToggle.hasAttribute('data-bound')) {
        subToggle.setAttribute('data-bound', 'true');
        subToggle.addEventListener('click', function (e) {
          e.preventDefault();
          e.stopPropagation();
          var sub = hizmetlerLi.querySelector('[data-drawer-sub]');
          var open = hizmetlerLi.classList.toggle('is-open');
          subToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
          if (sub) sub.hidden = !open;
        });
      }
    }

    // Bize Ulaşın kartı ve Sosyal Medya blokları kontrolü
    if (!drawer.querySelector('.fx-drawer__contact-card')) {
      var dNav = drawer.querySelector('nav');
      if (dNav) dNav.classList.add('fx-drawer__nav');

      // Doğru görsel yolunu tespit et (kök veya alt klasör)
      var logoImg = drawer.querySelector('.fx-logo img');
      var logoSrc = logoImg ? logoImg.getAttribute('src') : 'assets/fenix-logo.png';
      var basePath = logoSrc.indexOf('assets/') !== -1 ? logoSrc.substring(0, logoSrc.indexOf('assets/')) : '';
      var socialPhonesImg = basePath + 'assets/img/kurumsal/social-phones.webp';

      var extraContainer = document.createElement('div');
      extraContainer.className = 'fx-drawer__extra';
      extraContainer.innerHTML =
        '<a href="tel:02126180701" class="fx-drawer__contact-card" data-call-trigger aria-label="Bize Ulaşın, Hemen arayın">' +
          '<span class="fx-drawer__contact-icon" aria-hidden="true">' +
            '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">' +
              '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>' +
            '</svg>' +
          '</span>' +
          '<span class="fx-drawer__contact-info">' +
            '<span class="fx-drawer__contact-tag">BİZE ULAŞIN</span>' +
            '<strong class="fx-drawer__contact-title">Hemen arayın</strong>' +
            '<span class="fx-drawer__contact-sub">Uzman ekibimiz yanınızda</span>' +
          '</span>' +
          '<span class="fx-drawer__contact-chevron" aria-hidden="true">' +
            '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#A90432" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">' +
              '<polyline points="9 18 15 12 9 6"/>' +
            '</svg>' +
          '</span>' +
        '</a>' +
        '<div class="fx-drawer__social-row">' +
          '<a href="https://www.youtube.com/@fenixyangin" target="_blank" rel="noopener noreferrer" class="fx-drawer__social-btn" aria-label="YouTube">' +
            '<svg width="20" height="20" viewBox="0 0 24 24" fill="#E11138"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>' +
          '</a>' +
          '<a href="https://www.instagram.com/fenixyangin" target="_blank" rel="noopener noreferrer" class="fx-drawer__social-btn" aria-label="Instagram">' +
            '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#E1306C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>' +
          '</a>' +
          '<a href="https://www.linkedin.com/company/fenixyangin" target="_blank" rel="noopener noreferrer" class="fx-drawer__social-btn" aria-label="LinkedIn">' +
            '<svg width="18" height="18" viewBox="0 0 24 24" fill="#0A66C2"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76c.94 0 1.7-.76 1.7-1.7s-.76-1.7-1.7-1.7-1.7.76-1.7 1.7.76 1.7 1.7 1.7m1.4 9.74v-8.37H5.06v8.37h2.8z"/></svg>' +
          '</a>' +
          '<a href="https://www.facebook.com/fenixyangin/" target="_blank" rel="noopener noreferrer" class="fx-drawer__social-btn" aria-label="Facebook">' +
            '<svg width="19" height="19" viewBox="0 0 24 24" fill="#1877F2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>' +
          '</a>' +
          '<a href="https://x.com/fenixyangin" target="_blank" rel="noopener noreferrer" class="fx-drawer__social-btn" aria-label="X">' +
            '<svg width="16" height="16" viewBox="0 0 24 24" fill="#111827"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>' +
          '</a>' +
        '</div>' +
        '<a href="https://www.instagram.com/fenixyangin" target="_blank" rel="noopener noreferrer" class="fx-drawer__promo-card" aria-label="Sosyal medyada da bizimle olun">' +
          '<div class="fx-drawer__promo-body">' +
            '<div class="fx-drawer__promo-head">' +
              '<span class="fx-drawer__promo-title">SOSYAL MEDYADA<br>DA BİZİMLE OLUN</span>' +
              '<svg class="fx-drawer__promo-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#A90432" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
                '<polyline points="9 18 15 12 9 6"/>' +
              '</svg>' +
            '</div>' +
            '<p class="fx-drawer__promo-desc">Saha çalışmalarımız, ürün tanıtımlarımız ve daha fazlası için bizi takip edin.</p>' +
          '</div>' +
          '<div class="fx-drawer__promo-thumb">' +
            '<img src="' + socialPhonesImg + '" alt="Fenix Yangın Sosyal Medya" width="180" height="180" loading="lazy">' +
          '</div>' +
        '</a>';

      var oldActions = drawer.querySelector('.fx-drawer__actions');
      if (oldActions) {
        oldActions.parentNode.replaceChild(extraContainer, oldActions);
      } else {
        drawer.appendChild(extraContainer);
      }
    }
  }

  // ── 2.5. DESKTOP DROPDOWN ENTEGRASYONU (HİZMETLER) ──
  function enhanceDesktopNav() {
    var nav = document.querySelector('.fx-nav');
    if (!nav) return;

    var existingDropdown = nav.querySelector('.fx-nav-item--dropdown');
    if (!existingDropdown) {
      // Find Hizmetler link in top nav
      var links = nav.querySelectorAll('a');
      var hizmetlerLink = null;
      for (var i = 0; i < links.length; i++) {
        var href = links[i].getAttribute('href') || '';
        if (href === '/hizmetler/' || href.indexOf('/hizmetler/') !== -1) {
          hizmetlerLink = links[i];
          break;
        }
      }

      if (hizmetlerLink) {
        var isCurrent = hizmetlerLink.hasAttribute('aria-current') || hizmetlerLink.classList.contains('is-active');
        var dropdownWrapper = document.createElement('div');
        dropdownWrapper.className = 'fx-nav-item fx-nav-item--dropdown' + (isCurrent ? ' is-active' : '');
        dropdownWrapper.setAttribute('data-nav-dropdown', '');

        dropdownWrapper.innerHTML =
          '<a href="/hizmetler/" class="fx-nav-link fx-nav-link--dropdown"' + (isCurrent ? ' aria-current="page"' : '') + ' aria-haspopup="true" aria-expanded="false">' +
            '<span>Hizmetler</span>' +
            '<svg class="fx-nav-chevron" width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
              '<path d="m1 1 4 4 4-4"/>' +
            '</svg>' +
          '</a>' +
          '<div class="fx-nav-dropdown" role="menu" aria-label="Yangın Söndürme Hizmetleri">' +
            '<div class="fx-nav-dropdown__header">' +
              '<span class="fx-nav-dropdown__eyebrow">YANGIN SÖNDÜRME HİZMETLERİ</span>' +
            '</div>' +
            '<div class="fx-nav-dropdown__list">' +
              '<a href="/hizmetler/muhendislik/" class="fx-nav-dropdown__item" role="menuitem">' +
                '<strong class="fx-nav-dropdown__item-title">Mühendislik</strong>' +
                '<span class="fx-nav-dropdown__item-desc">Yangın danışmanlığı, hidrolik hesap ve projelendirme</span>' +
              '</a>' +
              '<a href="/hizmetler/kurulum/" class="fx-nav-dropdown__item" role="menuitem">' +
                '<strong class="fx-nav-dropdown__item-title">Kurulum</strong>' +
                '<span class="fx-nav-dropdown__item-desc">Anahtar teslim sistem kurulumu ve entegrasyon</span>' +
              '</a>' +
              '<a href="/hizmetler/montaj/" class="fx-nav-dropdown__item" role="menuitem">' +
                '<strong class="fx-nav-dropdown__item-title">Montaj</strong>' +
                '<span class="fx-nav-dropdown__item-desc">Standartlara uygun mekanik ve elektriksel montaj</span>' +
              '</a>' +
              '<a href="/hizmetler/tedarik/" class="fx-nav-dropdown__item" role="menuitem">' +
                '<strong class="fx-nav-dropdown__item-title">Tedarik</strong>' +
                '<span class="fx-nav-dropdown__item-desc">Onaylı silindir, vana, nozul ve ekipman temini</span>' +
              '</a>' +
              '<a href="/hizmetler/dolum/" class="fx-nav-dropdown__item" role="menuitem">' +
                '<strong class="fx-nav-dropdown__item-title">Dolum</strong>' +
                '<span class="fx-nav-dropdown__item-desc">FM200 ve Novec 1230 sertifikalı gaz dolumu</span>' +
              '</a>' +
              '<a href="/hizmetler/bakim/" class="fx-nav-dropdown__item" role="menuitem">' +
                '<strong class="fx-nav-dropdown__item-title">Bakım</strong>' +
                '<span class="fx-nav-dropdown__item-desc">TSE-HYB onaylı periyodik bakım ve kontrol</span>' +
              '</a>' +
            '</div>' +
            '<a href="/hizmetler/" class="fx-nav-dropdown__footer" role="menuitem">' +
              '<span>Tüm Hizmetleri İnceleyin</span>' +
              '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
                '<line x1="5" y1="12" x2="19" y2="12"></line>' +
                '<polyline points="12 5 19 12 12 19"></polyline>' +
              '</svg>' +
            '</a>' +
          '</div>';

        hizmetlerLink.parentNode.replaceChild(dropdownWrapper, hizmetlerLink);
      }
    }

    // Touch / Click toggle on dropdown trigger
    var ddTrigger = nav.querySelector('.fx-nav-link--dropdown');
    var ddWrapper = nav.querySelector('.fx-nav-item--dropdown');
    if (ddTrigger && ddWrapper && !ddTrigger.hasAttribute('data-bound')) {
      ddTrigger.setAttribute('data-bound', 'true');
      ddTrigger.addEventListener('click', function (e) {
        if (window.matchMedia('(pointer: coarse)').matches) {
          e.preventDefault();
          var isOpen = ddWrapper.classList.toggle('is-open');
          ddTrigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        }
      });

      document.addEventListener('click', function (e) {
        if (!ddWrapper.contains(e.target)) {
          ddWrapper.classList.remove('is-open');
          ddTrigger.setAttribute('aria-expanded', 'false');
        }
      });
    }
  }

  // Sayfa yüklendiğinde nav ve çekmeceyi zenginleştir
  if (drawer) {
    enhanceDrawer();
  }
  enhanceDesktopNav();

  // ── 3. MOBİL ÇEKMECE AÇMA / KAPAMA ──
  function focusables() {
    if (!drawer) return [];
    return Array.prototype.filter.call(
      drawer.querySelectorAll('a[href], button:not([disabled])'),
      function (el) { return el.offsetParent !== null; }
    );
  }

  function openDrawer() {
    if (!drawer || !burger) return;
    lastFocus = document.activeElement;
    drawer.hidden = false;
    burger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    var f = focusables();
    if (f.length) f[0].focus();
  }

  function closeDrawer() {
    if (!drawer || !burger) return;
    drawer.hidden = true;
    burger.setAttribute('aria-expanded', 'false');
    // Eğer Call Sheet açık değilse overflow'u temizle
    if (!callSheet || callSheet.hidden) {
      document.body.style.overflow = '';
    }
    if (lastFocus) lastFocus.focus();
  }

  if (burger) burger.addEventListener('click', openDrawer);
  if (drawer) {
    var closeBtn = drawer.querySelector('[data-drawer-close]');
    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  }

  // Klavye erişilebilirliği (Escape ve Tab Trap)
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      if (callSheet && !callSheet.hidden) {
        closeCallSheet();
        return;
      }
      if (drawer && !drawer.hidden) {
        closeDrawer();
        return;
      }
    }

    if (drawer && !drawer.hidden && (!callSheet || callSheet.hidden)) {
      if (e.key !== 'Tab') return;
      var f = focusables();
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      else if (!drawer.contains(document.activeElement)) { e.preventDefault(); first.focus(); }
    }
  });

  // 1060px üstüne çıkılırsa çekmeceyi ve call sheet'i kapat
  var mq = window.matchMedia('(min-width: 1060px)');
  var onChange = function (e) {
    if (e.matches) {
      if (drawer && !drawer.hidden) closeDrawer();
      if (callSheet && !callSheet.hidden) closeCallSheet();
    }
  };
  if (mq.addEventListener) mq.addEventListener('change', onChange);
  else if (mq.addListener) mq.addListener(onChange);

  // Unobtrusive header search button handler
  var searchBtns = document.querySelectorAll('.fx-header__search-btn');
  Array.prototype.forEach.call(searchBtns, function (btn) {
    btn.addEventListener('click', function () {
      var localSearch = document.getElementById('fx-tech-search');
      if (localSearch) {
        localSearch.focus();
        localSearch.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.location.href = '/teknik-icerikler/#fx-tech-search';
      }
    });
  });
})();
