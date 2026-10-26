/* FENIX.COM — İLETİŞİM FORMU DOĞRULAMA VE İLETİM
   Tam erişilebilir, istemci taraflı doğrulama ve sunucu taraflı Formspree iletimi */

(function () {
  'use strict';

  var form = document.querySelector('form#fx-contact-form') || document.querySelector('form.fx-contact-form') || document.querySelector('section#form form');
  if (!form) return;

  var nameInput = form.querySelector('input[name="ad"]');
  var orgInput = form.querySelector('input[name="kurum"]');
  var emailInput = form.querySelector('input[name="eposta"]');
  var phoneInput = form.querySelector('input[name="telefon"]');
  var subjectInput = form.querySelector('select[name="konu"]');
  var messageInput = form.querySelector('textarea[name="mesaj"]');
  var kvkkInput = form.querySelector('input[name="kvkk"]');
  var gotchaInput = form.querySelector('input[name="_gotcha"]');
  var submitBtn = form.querySelector('button[type="submit"]');

  // Hata ve bildirim kutusu oluştur
  var alertBox = document.createElement('div');
  alertBox.setAttribute('role', 'alert');
  alertBox.setAttribute('aria-live', 'polite');
  alertBox.style.display = 'none';
  alertBox.style.padding = '14px 18px';
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
    title.style.cssText = 'display:block;font-size:16px;margin-bottom:8px';
    title.textContent = '✓ Talebiniz Başarıyla Alındı ve İletildi';
    alertBox.appendChild(title);

    var p1 = document.createElement('p');
    p1.style.margin = '0 0 12px';
    p1.appendChild(document.createTextNode('Sayın '));
    var nameStrong = document.createElement('strong');
    nameStrong.textContent = name;
    p1.appendChild(nameStrong);
    p1.appendChild(document.createTextNode(', talebiniz sunucumuz üzerinden teknik mühendislik ekibimize iletilmiştir. Uzmanlarımız en kısa sürede tarafınıza dönüş sağlayacaktır.'));
    alertBox.appendChild(p1);

    var pAlt = document.createElement('p');
    pAlt.style.cssText = 'margin:0 0 10px;font-size:13px;color:#046C4E';
    pAlt.textContent = 'Dilerseniz talebinizi WhatsApp veya telefon üzerinden de doğrudan iletebilirsiniz:';
    alertBox.appendChild(pAlt);

    var btnRow = document.createElement('div');
    btnRow.style.cssText = 'display:flex;flex-wrap:wrap;gap:8px;margin-bottom:14px';

    var waBtn = document.createElement('a');
    waBtn.href = 'https://wa.me/905327409097';
    waBtn.target = '_blank';
    waBtn.rel = 'noopener noreferrer';
    waBtn.style.cssText = 'display:inline-flex;align-items:center;background:#25D366;color:#fff;padding:8px 14px;border-radius:6px;font-weight:700;font-size:13px;text-decoration:none';
    waBtn.textContent = 'WhatsApp ile Görüş →';
    btnRow.appendChild(waBtn);

    var mailBtn = document.createElement('a');
    mailBtn.href = 'mailto:info@fenixyangin.com.tr';
    mailBtn.style.cssText = 'display:inline-flex;align-items:center;background:#A90432;color:#fff;padding:8px 14px;border-radius:6px;font-weight:700;font-size:13px;text-decoration:none';
    mailBtn.textContent = 'E-posta Gönder →';
    btnRow.appendChild(mailBtn);

    alertBox.appendChild(btnRow);

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
    alertBox.appendChild(p2);
  }

  function showServerError(statusText) {
    alertBox.style.display = 'block';
    alertBox.style.background = '#FDE8E8';
    alertBox.style.color = '#9B1C1C';
    alertBox.style.border = '1px solid #F8B4B4';
    while (alertBox.firstChild) {
      alertBox.removeChild(alertBox.firstChild);
    }

    var title = document.createElement('strong');
    title.style.cssText = 'display:block;font-size:15px;margin-bottom:6px';
    title.textContent = 'Mesaj İletilemedi';
    alertBox.appendChild(title);

    var p = document.createElement('p');
    p.style.margin = '0 0 10px';
    p.textContent = 'Sunucu bağlantısında bir sorun oluştu' + (statusText ? ' (' + statusText + ')' : '') + '. Lütfen doğrudan telefon veya WhatsApp hattımız üzerinden bize ulaşın:';
    alertBox.appendChild(p);

    var btnRow = document.createElement('div');
    btnRow.style.cssText = 'display:flex;flex-wrap:wrap;gap:8px';

    var waBtn = document.createElement('a');
    waBtn.href = 'https://wa.me/905327409097';
    waBtn.target = '_blank';
    waBtn.rel = 'noopener noreferrer';
    waBtn.style.cssText = 'display:inline-flex;align-items:center;background:#25D366;color:#fff;padding:8px 14px;border-radius:6px;font-weight:700;font-size:13px;text-decoration:none';
    waBtn.textContent = 'WhatsApp ile İletişime Geç →';
    btnRow.appendChild(waBtn);

    var telBtn = document.createElement('a');
    telBtn.href = 'tel:+902126180701';
    telBtn.style.cssText = 'display:inline-flex;align-items:center;background:#A90432;color:#fff;padding:8px 14px;border-radius:6px;font-weight:700;font-size:13px;text-decoration:none';
    telBtn.textContent = '0212 618 07 01 Ara →';
    btnRow.appendChild(telBtn);

    alertBox.appendChild(btnRow);
  }

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    clearError();

    // Spam honeypot kontrolü
    if (gotchaInput && gotchaInput.value.trim() !== '') {
      showSuccess('Ziyaretçi');
      return;
    }

    // 1. Ad Soyad Kontrolü
    var name = nameInput ? nameInput.value.trim() : '';
    if (!name || name.length < 2) {
      showError('Lütfen adınızı ve soyadınızı eksiksiz giriniz.', nameInput);
      return;
    }

    // 2. E-posta Kontrolü
    var email = emailInput ? emailInput.value.trim() : '';
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailPattern.test(email)) {
      showError('Lütfen geçerli bir e-posta adresi giriniz.', emailInput);
      return;
    }

    // 3. Mesaj Kontrolü
    var msg = messageInput ? messageInput.value.trim() : '';
    if (!msg || msg.length < 5) {
      showError('Lütfen talep veya mesajınızı kısaca açıklayınız (en az 5 karakter).', messageInput);
      return;
    }

    // 4. KVKK Kontrolü (Zorunlu)
    if (kvkkInput && !kvkkInput.checked) {
      showError('Devam edebilmek için KVKK Aydınlatma Metnini onaylamanız gerekmektedir.', kvkkInput);
      return;
    }

    var org = orgInput ? orgInput.value.trim() : '';
    var phone = phoneInput ? phoneInput.value.trim() : '';
    var subject = (subjectInput && subjectInput.value && subjectInput.value !== 'Konu seçin') ? subjectInput.value : '';

    // Çift gönderimi önle
    var origBtnText = submitBtn ? submitBtn.textContent : 'Mesajımı Gönder';
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'İletiliyor...';
    }

    var endpoint = form.getAttribute('action') || 'https://formspree.io/f/xeqyagjb';
    var payload = {
      ad: name,
      kurum: org,
      eposta: email,
      telefon: phone,
      konu: subject,
      mesaj: msg,
      _subject: 'fenixyangin.com — İletişim Formu'
    };

    var isSuccess = false;
    var statusInfo = '';

    try {
      var res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        isSuccess = true;
      } else {
        statusInfo = 'HTTP ' + res.status;
        try {
          var errData = await res.json();
          if (errData && errData.error) {
            statusInfo += ': ' + errData.error;
          }
        } catch (e) {}
      }
    } catch (networkErr) {
      statusInfo = networkErr && networkErr.message ? networkErr.message : 'Ağ hatası';
    }

    if (isSuccess) {
      // Görev 2'de kullanıcı onay verdiyse lead event gönder
      if (typeof window.fxHasAnalyticsConsent === 'function' && window.fxHasAnalyticsConsent()) {
        if (typeof window.gtag === 'function') {
          window.gtag('event', 'generate_lead', {
            event_category: 'Contact',
            event_label: 'Contact Form Submission',
            method: 'Formspree'
          });
        }
      }
      showSuccess(name);
    } else {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = origBtnText;
      }
      showServerError(statusInfo);
    }
  });
})();
