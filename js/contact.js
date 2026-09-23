/* FENIX.COM — İLETİŞİM FORMU DOĞRULAMA VE İLETİM
   Tam erişilebilir, istemci taraflı doğrulama ve WhatsApp/E-posta iletimi */

(function () {
  'use strict';

  const form = document.querySelector('form#fx-contact-form') || document.querySelector('form.fx-contact-form') || document.querySelector('section#form form');
  if (!form) return;

  // Form elemanları
  const nameInput = form.querySelector('input[name="ad"]');
  const orgInput = form.querySelector('input[name="kurum"]');
  const emailInput = form.querySelector('input[name="eposta"]');
  const phoneInput = form.querySelector('input[name="telefon"]');
  const subjectInput = form.querySelector('select[name="konu"]');
  const messageInput = form.querySelector('textarea[name="mesaj"]');
  const kvkkInput = form.querySelector('input[name="kvkk"]');
  const submitBtn = form.querySelector('button[type="submit"]');

  // Hata mesaj alanı oluştur
  const alertBox = document.createElement('div');
  alertBox.setAttribute('role', 'alert');
  alertBox.setAttribute('aria-live', 'polite');
  alertBox.style.display = 'none';
  alertBox.style.padding = '12px 16px';
  alertBox.style.borderRadius = '6px';
  alertBox.style.fontSize = '13.5px';
  alertBox.style.lineHeight = '1.5';
  alertBox.style.marginBottom = '14px';
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
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(function (inp) {
      inp.style.borderColor = '#D1D5DB';
    });
  }

  function showSuccess(name) {
    form.style.display = 'none';
    alertBox.style.display = 'block';
    alertBox.style.background = '#DEF7EC';
    alertBox.style.color = '#03543F';
    alertBox.style.border = '1px solid #BCF0DA';
    while (alertBox.firstChild) {
      alertBox.removeChild(alertBox.firstChild);
    }

    var title = document.createElement('strong');
    title.style.cssText = 'display:block;font-size:15px;margin-bottom:6px';
    title.textContent = '✓ Talebiniz Alındı';
    alertBox.appendChild(title);

    var p1 = document.createElement('p');
    p1.style.margin = '0 0 10px';
    p1.appendChild(document.createTextNode('Sayın '));
    var nameStrong = document.createElement('strong');
    nameStrong.textContent = name;
    p1.appendChild(nameStrong);
    p1.appendChild(document.createTextNode(', talebiniz yetkili teknik ekibimize iletilmek üzere WhatsApp üzerinden açılmıştır. Mühendislerimiz en kısa sürede tarafınıza dönüş sağlayacaktır.'));
    alertBox.appendChild(p1);

    var p2 = document.createElement('p');
    p2.style.cssText = 'margin:0;font-size:12.5px';
    p2.appendChild(document.createTextNode('Doğrudan aramak isterseniz: '));
    var telLink = document.createElement('a');
    telLink.href = 'tel:+902126180701';
    telLink.style.cssText = 'font-weight:700;color:inherit;text-decoration:underline';
    telLink.textContent = '0212 618 07 01';
    p2.appendChild(telLink);
    p2.appendChild(document.createTextNode(' / '));
    var telLink2 = document.createElement('a');
    telLink2.href = 'tel:+902126180702';
    telLink2.style.cssText = 'font-weight:700;color:inherit;text-decoration:underline';
    telLink2.textContent = '0212 618 07 02';
    p2.appendChild(telLink2);
    p2.appendChild(document.createTextNode(' veya '));
    var waLink = document.createElement('a');
    waLink.href = 'https://wa.me/905327409097';
    waLink.target = '_blank';
    waLink.rel = 'noopener noreferrer';
    waLink.style.cssText = 'font-weight:700;color:inherit;text-decoration:underline';
    waLink.textContent = 'WhatsApp (+90 532 740 90 97)';
    p2.appendChild(waLink);
    alertBox.appendChild(p2);
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    clearError();

    // 1. Ad Soyad Kontrolü
    const name = nameInput ? nameInput.value.trim() : '';
    if (!name || name.length < 2) {
      showError('Lütfen adınızı ve soyadınızı eksiksiz giriniz.', nameInput);
      return;
    }

    // 2. E-posta Kontrolü
    const email = emailInput ? emailInput.value.trim() : '';
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailPattern.test(email)) {
      showError('Lütfen geçerli bir e-posta adresi giriniz.', emailInput);
      return;
    }

    // 3. Mesaj Kontrolü
    const msg = messageInput ? messageInput.value.trim() : '';
    if (!msg || msg.length < 5) {
      showError('Lütfen talep veya mesajınızı kısaca açıklayınız (en az 5 karakter).', messageInput);
      return;
    }

    // 4. KVKK Kontrolü
    if (kvkkInput && !kvkkInput.checked) {
      showError('Devam edebilmek için KVKK Aydınlatma Metnini onaylamanız gerekmektedir.', kvkkInput);
      return;
    }

    // Çift gönderimi önle
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'İletiliyor...';
    }

    // WhatsApp iletim metni hazırla
    const org = orgInput ? orgInput.value.trim() : '';
    const phone = phoneInput ? phoneInput.value.trim() : '';
    const subject = (subjectInput && subjectInput.value && subjectInput.value !== 'Konu seçin') ? subjectInput.value : '';

    let waText = '*FENIX.COM İletişim / Teklif Talebi*\n\n' +
      '*Ad Soyad:* ' + name + '\n' +
      (org ? '*Kurum:* ' + org + '\n' : '') +
      '*E-posta:* ' + email + '\n' +
      (phone ? '*Telefon:* ' + phone + '\n' : '') +
      (subject ? '*Konu:* ' + subject + '\n' : '') +
      '\n*Talep:* ' + msg;

    const waUrl = 'https://wa.me/905327409097?text=' + encodeURIComponent(waText);

    // Yeni sekmede WhatsApp aç ve sayfada başarı durumunu göster
    window.open(waUrl, '_blank', 'noopener,noreferrer');
    showSuccess(name);
  });
})();
