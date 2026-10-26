/* FENIX.COM — İLETİŞİM FORMU (WHATSAPP & E-POSTA DOĞRUDAN BAĞLANTI)
   Sıfır sunucu iletimi; ziyaretçinin WhatsApp veya e-posta istemcisinde
   doğrulanmış ve biçimlendirilmiş mesaj şablonunu anında hazırlar. */

(function () {
  'use strict';

  var form = document.getElementById('fx-contact-form') || document.querySelector('form.fx-contact-form');
  if (!form) return;

  var nameInput = form.querySelector('input[name="ad"]');
  var orgInput = form.querySelector('input[name="kurum"]');
  var emailInput = form.querySelector('input[name="eposta"]');
  var phoneInput = form.querySelector('input[name="telefon"]');
  var subjectInput = form.querySelector('select[name="konu"]');
  var messageInput = form.querySelector('textarea[name="mesaj"]');
  var kvkkInput = form.querySelector('input[name="kvkk"]');
  var emailFallbackBtn = document.getElementById('fx-btn-send-email');

  var confirmationEl = document.getElementById('fx-contact-confirmation');
  var confirmTitle = document.getElementById('fx-confirm-title');
  var confirmText = document.getElementById('fx-confirm-text');
  var confirmWaBtn = document.getElementById('fx-confirm-wa');
  var confirmMailBtn = document.getElementById('fx-confirm-mail');
  var confirmResetBtn = document.getElementById('fx-confirm-reset');

  // Hata bildirim kutusu oluştur
  var alertBox = document.createElement('div');
  alertBox.setAttribute('role', 'alert');
  alertBox.setAttribute('aria-live', 'polite');
  alertBox.style.display = 'none';
  alertBox.style.padding = '12px 16px';
  alertBox.style.borderRadius = '8px';
  alertBox.style.fontSize = '13.5px';
  alertBox.style.lineHeight = '1.5';
  alertBox.style.marginBottom = '16px';
  form.parentNode.insertBefore(alertBox, form);

  function showError(msg, focusEl) {
    alertBox.style.display = 'block';
    alertBox.style.background = '#FDE8E8';
    alertBox.style.color = '#9B1C1C';
    alertBox.style.border = '1px solid #F8B4B4';
    alertBox.textContent = msg;
    if (focusEl) {
      focusEl.focus();
      focusEl.style.borderColor = '#A90432';
    }
  }

  function clearError() {
    alertBox.style.display = 'none';
    alertBox.textContent = '';
    var inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(function (inp) {
      inp.style.borderColor = '#D1D5DB';
    });
  }

  function validateForm() {
    clearError();

    // 1. Ad Soyad Kontrolü (En az 2 karakter)
    var name = nameInput ? nameInput.value.trim() : '';
    if (!name || name.length < 2) {
      showError('Lütfen adınızı ve soyadınızı eksiksiz giriniz.', nameInput);
      return null;
    }

    // 2. E-posta Kontrolü (Geçerli format)
    var email = emailInput ? emailInput.value.trim() : '';
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailPattern.test(email)) {
      showError('Lütfen geçerli bir e-posta adresi giriniz.', emailInput);
      return null;
    }

    // 3. Mesaj Kontrolü (En az 5 karakter)
    var msg = messageInput ? messageInput.value.trim() : '';
    if (!msg || msg.length < 5) {
      showError('Lütfen talep veya mesajınızı kısaca açıklayınız (en az 5 karakter).', messageInput);
      return null;
    }

    // 4. KVKK Kontrolü (Zorunlu)
    if (kvkkInput && !kvkkInput.checked) {
      showError('Devam edebilmek için KVKK Aydınlatma Metnini onaylamanız gerekmektedir.', kvkkInput);
      return null;
    }

    var org = orgInput ? orgInput.value.trim() : '';
    var phone = phoneInput ? phoneInput.value.trim() : '';
    var subject = (subjectInput && subjectInput.value && subjectInput.value !== 'Konu seçin') ? subjectInput.value : '';

    return {
      name: name,
      org: org,
      email: email,
      phone: phone,
      subject: subject,
      msg: msg
    };
  }

  // Mesaj Şablonu Oluşturucu (Boş bırakılan alanlar mesaja eklenmez)
  function buildMessageText(data) {
    var lines = [];
    lines.push('Merhaba Fenix Yangın, web sitenizden yazıyorum.');
    lines.push('');
    if (data.name) lines.push('Ad Soyad: ' + data.name);
    if (data.org) lines.push('Firma: ' + data.org);
    if (data.phone) lines.push('Telefon: ' + data.phone);
    if (data.email) lines.push('E-posta: ' + data.email);
    if (data.subject) lines.push('Konu: ' + data.subject);
    lines.push('');
    lines.push('Mesaj:');
    lines.push(data.msg);
    lines.push('');
    lines.push('— fenixyangin.com iletişim formu');
    return lines.join('\n');
  }

  function buildWaUrl(msgText) {
    return 'https://wa.me/905327409097?text=' + encodeURIComponent(msgText);
  }

  function buildMailtoUrl(data, msgText) {
    var subjectLine = 'Web sitesi talebi: ' + (data.subject || data.name);
    return 'mailto:info@fenixyangin.com.tr?subject=' + encodeURIComponent(subjectLine) + '&body=' + encodeURIComponent(msgText);
  }

  // Senkron Bağlantı Açıcı (Tarayıcı açılır pencere engelleyicisine takılmaz)
  function openLinkSync(targetUrl, isNewTab) {
    var a = document.createElement('a');
    a.href = targetUrl;
    if (isNewTab) {
      a.target = '_blank';
      a.rel = 'noopener';
    }
    a.click();
  }

  function trackLead(method) {
    if (typeof window.fxHasAnalyticsConsent === 'function' && window.fxHasAnalyticsConsent()) {
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'generate_lead', {
          method: method
        });
      }
    }
  }

  function showConfirmationPanel(mode, waUrl, mailtoUrl) {
    form.style.display = 'none';
    clearError();
    if (confirmationEl) {
      confirmationEl.hidden = false;
      if (mode === 'email') {
        if (confirmTitle) confirmTitle.textContent = 'E-postanız hazır';
        if (confirmText) confirmText.textContent = 'Göndermek için e-posta uygulamanızda Gönder\'e basın. E-posta açılmadıysa aşağıdaki seçeneklerden birini kullanın.';
      } else {
        if (confirmTitle) confirmTitle.textContent = 'Mesajınız WhatsApp\'ta hazır';
        if (confirmText) confirmText.textContent = 'Göndermek için WhatsApp\'ta Gönder\'e basın. WhatsApp açılmadıysa aşağıdaki seçeneklerden birini kullanın.';
      }
      if (confirmWaBtn) confirmWaBtn.href = waUrl;
      if (confirmMailBtn) confirmMailBtn.href = mailtoUrl;
      if (confirmTitle) confirmTitle.focus();
    }
  }

  function resetToForm() {
    form.reset();
    clearError();
    if (confirmationEl) {
      confirmationEl.hidden = true;
    }
    form.style.display = 'block';
    if (nameInput) {
      nameInput.focus();
    }
  }

  // 1. Ana Gönder Butonu (WhatsApp)
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var data = validateForm();
    if (!data) return;

    var msgText = buildMessageText(data);
    var waUrl = buildWaUrl(msgText);
    var mailtoUrl = buildMailtoUrl(data, msgText);

    // Senkron olarak WhatsApp açılır
    openLinkSync(waUrl, true);

    // Çerez izni varsa analitik tetiklenir
    trackLead('whatsapp');

    // Onay paneli gösterilir
    showConfirmationPanel('whatsapp', waUrl, mailtoUrl);
  });

  // 2. Alternatif Buton ("WhatsApp kullanmıyorum, e-posta ile göndereceğim")
  if (emailFallbackBtn) {
    emailFallbackBtn.addEventListener('click', function (e) {
      e.preventDefault();
      var data = validateForm();
      if (!data) return;

      var msgText = buildMessageText(data);
      var waUrl = buildWaUrl(msgText);
      var mailtoUrl = buildMailtoUrl(data, msgText);

      // Senkron olarak Mailto açılır
      openLinkSync(mailtoUrl, false);

      // Çerez izni varsa analitik tetiklenir
      trackLead('email');

      // Onay paneli gösterilir
      showConfirmationPanel('email', waUrl, mailtoUrl);
    });
  }

  // 3. "Yeni mesaj yaz" butonu
  if (confirmResetBtn) {
    confirmResetBtn.addEventListener('click', function (e) {
      e.preventDefault();
      resetToForm();
    });
  }
})();
