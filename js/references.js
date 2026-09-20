/* FENIX.COM — REFERANSLAR INTERACTIVITY (FILTER & SEARCH)
   Progressive enhancement: JS olmadan tüm logolar doğal grid düzeninde görünür. */
(function () {
  'use strict';

  var filterBtns = document.querySelectorAll('.fx-ref-filter__btn');
  var searchInput = document.getElementById('fx-ref-search-input');
  var cards = document.querySelectorAll('.fx-ref-card');
  var emptyMsg = document.getElementById('fx-ref-empty');
  var resetBtn = document.getElementById('fx-ref-reset-btn');

  if (!cards.length) return;

  var currentCategory = 'all';
  var currentSearch = '';

  function normalize(str) {
    return (str || '')
      .toLowerCase()
      .replace(/i̇/g, 'i')
      .replace(/ı/g, 'i')
      .replace(/ğ/g, 'g')
      .replace(/ü/g, 'u')
      .replace(/ş/g, 's')
      .replace(/ö/g, 'o')
      .replace(/ç/g, 'c')
      .trim();
  }

  function applyFilter() {
    var visibleCount = 0;
    var query = normalize(currentSearch);

    Array.prototype.forEach.call(cards, function (card) {
      var cardCats = (card.getAttribute('data-category') || '').split(' ');
      var cardTitle = normalize(card.getAttribute('data-title') || '');

      var matchesCat = (currentCategory === 'all') || (cardCats.indexOf(currentCategory) !== -1);
      var matchesSearch = !query || (cardTitle.indexOf(query) !== -1);

      if (matchesCat && matchesSearch) {
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (emptyMsg) {
      emptyMsg.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  }

  // Filter button clicks
  Array.prototype.forEach.call(filterBtns, function (btn) {
    btn.addEventListener('click', function () {
      Array.prototype.forEach.call(filterBtns, function (b) {
        b.classList.remove('is-active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('is-active');
      btn.setAttribute('aria-pressed', 'true');
      currentCategory = btn.getAttribute('data-category') || 'all';
      applyFilter();
    });
  });

  // Search input with real-time feedback
  if (searchInput) {
    searchInput.addEventListener('input', function () {
      currentSearch = searchInput.value;
      applyFilter();
    });
  }

  // Reset filter button in empty state
  if (resetBtn) {
    resetBtn.addEventListener('click', function () {
      if (searchInput) searchInput.value = '';
      currentSearch = '';
      var allBtn = document.querySelector('.fx-ref-filter__btn[data-category="all"]');
      if (allBtn) allBtn.click();
      else {
        currentCategory = 'all';
        applyFilter();
      }
    });
  }
})();
