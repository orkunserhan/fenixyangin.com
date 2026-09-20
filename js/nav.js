/* FENIX.COM — NAVİGASYON
   Progressive enhancement: JS olmadan tüm bağlantılar çalışır. */
(function () {
  'use strict';
  var burger = document.querySelector('[data-burger]');
  var drawer = document.querySelector('[data-drawer]');
  if (!burger || !drawer) return;

  var lastFocus = null;

  function focusables() {
    return Array.prototype.filter.call(
      drawer.querySelectorAll('a[href], button:not([disabled])'),
      function (el) { return el.offsetParent !== null; }
    );
  }

  function open() {
    lastFocus = document.activeElement;
    drawer.hidden = false;
    burger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    var f = focusables();
    if (f.length) f[0].focus();
  }

  function close() {
    drawer.hidden = true;
    burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }

  burger.addEventListener('click', open);
  var closeBtn = drawer.querySelector('[data-drawer-close]');
  if (closeBtn) closeBtn.addEventListener('click', close);

  document.addEventListener('keydown', function (e) {
    if (drawer.hidden) return;
    if (e.key === 'Escape') { close(); return; }
    if (e.key !== 'Tab') return;
    var f = focusables();
    if (!f.length) return;
    var first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    else if (!drawer.contains(document.activeElement)) { e.preventDefault(); first.focus(); }
  });

  // 1060px üstüne çıkılırsa çekmeceyi kapat
  var mq = window.matchMedia('(min-width: 1060px)');
  var onChange = function (e) { if (e.matches && !drawer.hidden) close(); };
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
