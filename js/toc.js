/* FENIX.COM — STICKY TOC AKTİF BÖLÜM TAKİBİ
   IntersectionObserver — scroll event kullanılmaz (forced reflow önlemi). */
(function () {
  'use strict';
  if (!('IntersectionObserver' in window)) return;
  var toc = document.querySelector('[data-toc]');
  if (!toc) return;

  var links = {};
  Array.prototype.forEach.call(toc.querySelectorAll('a[href^="#"]'), function (a) {
    links[a.getAttribute('href').slice(1)] = a;
  });

  var targets = Object.keys(links)
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);
  if (!targets.length) return;

  var current = null;
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      var a = links[en.target.id];
      if (!a || a === current) return;
      if (current) current.removeAttribute('aria-current');
      a.setAttribute('aria-current', 'true');
      current = a;
    });
  }, { rootMargin: '-90px 0px -65% 0px', threshold: 0 });

  targets.forEach(function (t) { io.observe(t); });
})();
