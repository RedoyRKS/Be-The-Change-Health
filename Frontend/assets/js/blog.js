/**
 * Blog listing — client-side search & category filter.
 */
(function () {
  "use strict";

  var grid = document.getElementById("blog-grid");
  var searchInput = document.getElementById("blog-search");
  var empty = document.getElementById("blog-empty");
  var form = document.getElementById("blog-search-form");
  var catButtons = document.querySelectorAll(".blog-cat-btn");
  var featured = document.querySelector(".blog-featured");

  if (!grid) return;

  var activeCategory = "all";

  function normalize(value) {
    return (value || "").toLowerCase().trim();
  }

  function matches(el, query, category) {
    var cats = normalize(el.getAttribute("data-category"));
    var search = normalize(el.getAttribute("data-search"));
    var catOk = category === "all" || cats.indexOf(category) !== -1;
    var queryOk = !query || search.indexOf(query) !== -1;
    return catOk && queryOk;
  }

  function applyFilters() {
    var query = normalize(searchInput ? searchInput.value : "");
    var cards = grid.querySelectorAll(".blog-card-wrap");
    var visible = 0;

    Array.prototype.forEach.call(cards, function (card) {
      var show = matches(card, query, activeCategory);
      card.hidden = !show;
      card.style.display = show ? "" : "none";
      if (show) visible += 1;
    });

    if (featured) {
      var showFeatured = matches(featured, query, activeCategory);
      featured.hidden = !showFeatured;
      featured.style.display = showFeatured ? "" : "none";
    }

    if (empty) {
      empty.hidden = visible > 0 || (featured && !featured.hidden);
    }
  }

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      applyFilters();
    });
  }

  if (searchInput) {
    searchInput.addEventListener("input", applyFilters);
  }

  Array.prototype.forEach.call(catButtons, function (btn) {
    btn.addEventListener("click", function () {
      activeCategory = btn.getAttribute("data-filter") || "all";
      Array.prototype.forEach.call(catButtons, function (b) {
        var on = b === btn;
        b.classList.toggle("active", on);
        b.setAttribute("aria-selected", on ? "true" : "false");
      });
      applyFilters();
    });
  });

  // Deep-link support: index.html#therapies
  var hash = (window.location.hash || "").replace("#", "");
  if (hash) {
    var target = document.querySelector('.blog-cat-btn[data-filter="' + hash + '"]');
    if (target) target.click();
  }
})();
