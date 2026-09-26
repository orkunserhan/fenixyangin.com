/* FENIX.COM — HERO SLIDER
   İzole timer: yalnızca kendi DOM düğümlerine dokunur, sayfayı yeniden render etmez.
   prefers-reduced-motion'da HİÇ başlamaz. */
(function () {
  'use strict';
  var hero = document.querySelector('[data-hero]');
  if (!hero) return;

  var slides = hero.querySelectorAll('[data-hero-slide]');
  var texts = hero.querySelectorAll('[data-hero-text]');
  var dots = hero.querySelectorAll('[data-hero-dot]');
  var badges = hero.querySelectorAll('[data-hero-badge]');

  if (slides.length < 2) return;

  var current = 0;
  var INTERVAL = 7000;
  var timer = null;
  var textTimer = null;

  function goTo(next) {
    if (next === current) return;

    if (textTimer) {
      clearTimeout(textTimer);
      textTimer = null;
    }

    // Görsel geçişi (fade)
    slides[current].style.opacity = '0';
    slides[next].style.opacity = '1';

    // Metin geçişi (fade)
    var prev = current;
    if (texts[prev]) {
      texts[prev].style.opacity = '0';
    }
    if (badges[prev]) {
      badges[prev].style.opacity = '0';
    }

    textTimer = setTimeout(function () {
      texts.forEach(function (t, idx) {
        if (idx === next) {
          t.style.display = 'block';
          void t.offsetWidth;
          t.style.opacity = '1';
        } else {
          t.style.display = 'none';
          t.style.opacity = '0';
        }
      });
      if (badges.length) {
        badges.forEach(function (b, idx) {
          if (idx === next) {
            b.style.display = 'flex';
            void b.offsetWidth;
            b.style.opacity = '1';
          } else {
            b.style.display = 'none';
            b.style.opacity = '0';
          }
        });
      }
      textTimer = null;
    }, 200);

    // Gösterge noktaları
    dots.forEach(function (dot, idx) {
      if (idx === next) {
        dot.style.width = '22px';
        dot.style.background = '#fff';
        dot.setAttribute('aria-current', 'true');
      } else {
        dot.style.width = '7px';
        dot.style.background = 'rgba(255,255,255,0.4)';
        dot.removeAttribute('aria-current');
      }
    });

    current = next;
  }

  function startTimer() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    stopTimer();
    timer = setInterval(function () {
      var next = (current + 1) % slides.length;
      goTo(next);
    }, INTERVAL);
  }

  function stopTimer() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }

  // Noktalara tıklama
  dots.forEach(function (dot, idx) {
    dot.addEventListener('click', function () {
      goTo(idx);
      startTimer();
    });
  });

  startTimer();
})();

/* Kurumsal Bölüm Mühendislik Maddeleri Kademeli Giriş Animasyonu */
(function () {
  var ladder = document.querySelector('.fx-corp-ladder');
  if (!ladder) return;
  if ('IntersectionObserver' in window) {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          ladder.classList.add('is-animated');
          obs.disconnect();
        }
      });
    }, { threshold: 0.15 });
    obs.observe(ladder);
  } else {
    ladder.classList.add('is-animated');
  }
})();

