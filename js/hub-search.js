/* FENIX.COM — TEKNİK İÇERİK ARAMA FİLTRESİ
   Türkçe karakter duyarlı, hafif, sıfır bağımlılık arama. */
(function() {
  'use strict';
  var searchInput = document.getElementById('fx-tech-search');
  if (!searchInput) return;

  var cards = document.querySelectorAll('.fx-tech-card');
  var groups = document.querySelectorAll('.fx-tech-group');

  function trNormalize(s) {
    return s.replace(/İ/g, 'i').replace(/I/g, 'ı').toLowerCase();
  }

  searchInput.addEventListener('input', function() {
    var query = trNormalize(this.value.trim());

    groups.forEach(function(group) {
      var groupCards = group.querySelectorAll('.fx-tech-card');
      var visibleCount = 0;

      groupCards.forEach(function(card) {
        if (!query) {
          card.style.display = '';
          visibleCount++;
          return;
        }

        var text = trNormalize(card.innerText);
        if (text.indexOf(query) !== -1) {
          card.style.display = '';
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
      });

      // Hide group if no matching cards
      group.style.display = visibleCount > 0 ? '' : 'none';
    });
  });
})();
