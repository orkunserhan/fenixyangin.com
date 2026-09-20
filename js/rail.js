/* FENIX.COM — SİSTEM KARUSELİ
   Yerel scroll-snap. Kütüphane yok. JS olmadan rail yatay kaydırılabilir kalır. */
(function () {
  'use strict';
  var rail = document.querySelector('[data-rail]');
  if (!rail) return;

  var prev = document.querySelector('[data-rail-prev]');
  var next = document.querySelector('[data-rail-next]');
  var count = document.querySelector('[data-rail-count]');
  var items = rail.querySelectorAll('[data-rail-item]');
  var total = items.length;
  if (!total) return;

  function step() {
    return items[0] ? items[0].getBoundingClientRect().width + 14 : 300;
  }

  function index() {
    return Math.min(total - 1, Math.max(0, Math.round(rail.scrollLeft / step())));
  }

  function paint() {
    if (!count) return;
    var n = index() + 1;
    count.textContent = (n < 10 ? '0' + n : n) + ' / ' + (total < 10 ? '0' + total : total);
  }

  function go(dir) {
    var i = index() + dir;
    if (i < 0) i = total - 1;
    if (i > total - 1) i = 0;
    rail.scrollTo({ left: i * step() });
  }

  if (prev) prev.addEventListener('click', function () { go(-1); });
  if (next) next.addEventListener('click', function () { go(1); });

  var raf = null;
  rail.addEventListener('scroll', function () {
    if (raf) return;
    raf = requestAnimationFrame(function () { paint(); raf = null; });
  }, { passive: true });

  rail.addEventListener('keydown', function (e) {
    if (document.activeElement !== rail) return;
    if (e.key === 'ArrowRight') { e.preventDefault(); go(1); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
    else if (e.key === 'Home') { e.preventDefault(); rail.scrollTo({ left: 0 }); }
    else if (e.key === 'End') { e.preventDefault(); rail.scrollTo({ left: (total - 1) * step() }); }
  });

  paint();
})();
