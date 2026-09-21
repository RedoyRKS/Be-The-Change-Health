/**
 * UI fixes: sticky header, nav highlighting, animation fallbacks, Lottie.
 */
(function () {
  "use strict";

  var STICKY_BREAKPOINT = 800;

  /** Fusion sticky header animate() needs easeOutCubic / easeOutQuad. */
  function ensureJQueryEasing() {
    if (!window.jQuery || !window.jQuery.easing) return;
    if (typeof window.jQuery.easing.easeOutCubic === "function") return;

    window.jQuery.extend(window.jQuery.easing, {
      easeOutQuad: function (_x, t, b, c, d) {
        return -c * (t /= d) * (t - 2) + b;
      },
      easeOutCubic: function (_x, t, b, c, d) {
        return c * ((t = t / d - 1) * t * t + 1) + b;
      },
      easeInOutQuad: function (_x, t, b, c, d) {
        if ((t /= d / 2) < 1) return (c / 2) * t * t + b;
        return (-c / 2) * (--t * (t - 2) - 1) + b;
      },
    });
  }

  function setupFusionStickyHeader() {
    if (!document.body || !document.body.classList.contains("fusion-sticky-header")) return;
    if (!window.jQuery || typeof window.fusionInitStickyHeader !== "function") return;

    ensureJQueryEasing();
    if (typeof window.fusionDisableStickyHeader === "function") {
      window.fusionDisableStickyHeader();
    }
    window.fusionInitStickyHeader();
  }

  var lottieLoaderPromise = null;

  function getAssetPrefix() {
    var script = document.querySelector('script[src*="site-fixes.js"]');
    if (!script) return "";
    return (script.getAttribute("src") || "").replace(/js\/site-fixes\.js(?:\?.*)?$/, "");
  }

  function loadLottiePlayerScript() {
    if (window.customElements && window.customElements.get("lottie-player")) {
      return Promise.resolve();
    }
    if (lottieLoaderPromise) return lottieLoaderPromise;

    lottieLoaderPromise = new Promise(function (resolve, reject) {
      var script = document.createElement("script");
      script.src = getAssetPrefix() + "assets/vendor/lottie/lottie-player.js";
      script.onload = function () {
        resolve();
      };
      script.onerror = function () {
        lottieLoaderPromise = null;
        reject(new Error("Failed to load lottie-player.js"));
      };
      document.head.appendChild(script);
    });

    return lottieLoaderPromise;
  }

  function initLottiePlayers() {
    var players = document.querySelectorAll("lottie-player");
    if (!players.length) return;

    players.forEach(function (player) {
      if (player.getAttribute("background") === "##FFFFFF") {
        player.setAttribute("background", "transparent");
      }
    });

    loadLottiePlayerScript().catch(function () {});
  }

  function isElementHidden(el) {
    var style = window.getComputedStyle(el);
    return style.visibility === "hidden" || parseFloat(style.opacity) === 0;
  }

  function isInViewport(el) {
    var rect = el.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom > 0;
  }

  var animationFallbackReady = false;
  var animationObserver = null;
  var scrollRevealTimer = null;

  function getAnimationType(el) {
    return (
      el.getAttribute("data-animationType") ||
      el.getAttribute("data-animationtype") ||
      ""
    );
  }

  function markElementRevealed(el) {
    if (!el || el.classList.contains("fusion-revealed-fallback")) return;
    el.classList.add("fusion-revealed-fallback");
    el.style.visibility = "visible";
    el.style.opacity = "1";
  }

  function flattenSlideInUpSections() {
    document
      .querySelectorAll('[data-animationType="slideInUp"], [data-animationtype="slideInUp"], .fusion-animated.slideInUp')
      .forEach(function (el) {
        el.classList.remove("fusion-animated", "slideInUp");
        el.removeAttribute("data-animationType");
        el.removeAttribute("data-animationtype");
        el.removeAttribute("data-animationDuration");
        el.removeAttribute("data-animationOffset");
        el.style.visibility = "visible";
        el.style.opacity = "1";
        el.style.transform = "none";
        el.classList.add("fusion-revealed-fallback");
      });
  }

  function revealAnimatedElements(nodes) {
    nodes.forEach(markElementRevealed);
  }

  function revealHiddenInViewport() {
    document.querySelectorAll(".fusion-animated:not(.fusion-revealed-fallback)").forEach(function (el) {
      if (isInViewport(el) && isElementHidden(el)) {
        markElementRevealed(el);
      }
    });
  }

  function revealAllAnimatedFallback() {
    document.querySelectorAll(".fusion-animated:not(.fusion-revealed-fallback)").forEach(markElementRevealed);
  }

  function observeAnimatedElements() {
    if (!("IntersectionObserver" in window)) return;

    if (!animationObserver) {
      animationObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            markElementRevealed(entry.target);
            animationObserver.unobserve(entry.target);
          });
        },
        { root: null, rootMargin: "0px 0px -5% 0px", threshold: 0 }
      );
    }

    document.querySelectorAll(".fusion-animated:not(.fusion-revealed-fallback)").forEach(function (el) {
      animationObserver.observe(el);
    });
  }

  function onScrollReveal() {
    if (scrollRevealTimer) return;
    scrollRevealTimer = window.setTimeout(function () {
      scrollRevealTimer = null;
      revealHiddenInViewport();
    }, 50);
  }

  function bindAnimationFallbackListeners() {
    if (animationFallbackReady) return;
    animationFallbackReady = true;
    window.addEventListener("scroll", onScrollReveal, { passive: true });
    window.addEventListener("resize", onScrollReveal, { passive: true });
  }

  function initFusionAnimations() {
    if (!window.jQuery) return false;
    var $ = window.jQuery;
    try {
      if (typeof window.fusionSetAnimationData === "function") {
        window.fusionSetAnimationData({ data: { custom: true } });
      } else {
        document.body.classList.add("do-animate");
        document.body.classList.remove("dont-animate");
      }
      if (typeof $.fn.initElementAnimations === "function") {
        $(window).initElementAnimations();
      }
      return document.body.classList.contains("do-animate");
    } catch (err) {
      return false;
    }
  }

  function ensureContentVisible() {
    var animated = document.querySelectorAll(".fusion-animated");
    if (!animated.length) return;

    bindAnimationFallbackListeners();
    initFusionAnimations();
    revealHiddenInViewport();
    observeAnimatedElements();

    window.setTimeout(function () {
      initFusionAnimations();
      flattenSlideInUpSections();
      revealHiddenInViewport();
      observeAnimatedElements();

      if (!document.body.classList.contains("do-animate")) {
        document.body.classList.add("dont-animate");
        document.body.classList.remove("do-animate");
        revealAnimatedElements(document.querySelectorAll(".fusion-animated"));
        flattenSlideInUpSections();
        return;
      }

      revealHiddenInViewport();
      flattenSlideInUpSections();
    }, 400);

    window.setTimeout(revealHiddenInViewport, 1200);
    window.setTimeout(function () {
      flattenSlideInUpSections();
      revealHiddenInViewport();
    }, 2500);
    window.setTimeout(revealAllAnimatedFallback, 4500);
  }

  function closePopup(overlay) {
    if (!overlay) return;
    overlay.style.display = "none";
    overlay.style.opacity = "";
    overlay.classList.remove("pum-active");
    var container = overlay.querySelector(".pum-container");
    if (container) {
      container.style.display = "";
      container.style.opacity = "";
      container.classList.remove("active");
    }
    document.documentElement.classList.remove(
      "pum-open",
      "pum-open-overlay",
      "pum-open-scrollable",
      "pum-open-fixed",
      "pum-open-overlay-disabled"
    );
  }

  function closeAllPopups() {
    document.querySelectorAll(".pum-overlay").forEach(closePopup);
  }

  function bindPopupClose() {
    document.querySelectorAll(".pum-close, .popmake-close").forEach(function (btn) {
      if (btn.dataset.staticCloseBound) return;
      btn.dataset.staticCloseBound = "1";
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        closePopup(btn.closest(".pum-overlay"));
      });
    });

    document.querySelectorAll(".pum-overlay").forEach(function (overlay) {
      if (overlay.dataset.staticOverlayBound) return;
      overlay.dataset.staticOverlayBound = "1";
      overlay.addEventListener("click", function (e) {
        if (e.target === overlay) closePopup(overlay);
      });
    });
  }

  function normalizeNavPath(href) {
    if (!href || href === "#" || href.indexOf("javascript:") === 0) return "";
    try {
      var url = new URL(href, window.location.href);
      var path = decodeURIComponent(url.pathname).replace(/\\/g, "/");
      if (path.length > 1 && path.endsWith("/")) path = path.slice(0, -1);
      if (path === "/index.html" || path === "/") return "/index.html";
      if (path.endsWith("/index.html")) return path;
      return path;
    } catch (err) {
      return "";
    }
  }

  function currentNavPath() {
    var path = decodeURIComponent(window.location.pathname).replace(/\\/g, "/");
    if (path.length > 1 && path.endsWith("/")) path = path.slice(0, -1);
    if (path === "" || path === "/") return "/index.html";
    if (!/\.[a-z0-9]+$/i.test(path)) {
      if (path.slice(-6) !== ".html") path += "/index.html";
    }
    return path;
  }

  function pathsMatch(current, href) {
    if (!current || !href) return false;
    if (current === href) return true;
    var curFile = current.split("/").pop();
    var hrefFile = href.split("/").pop();
    if (curFile && hrefFile && curFile === hrefFile) {
      return current.replace(/\/+$/, "") === href.replace(/\/+$/, "");
    }
    return false;
  }

  function highlightCurrentNav() {
    var menu = document.getElementById("menu-main-menu");
    if (!menu) return;

    var current = currentNavPath();
    menu.querySelectorAll("li").forEach(function (li) {
      li.classList.remove(
        "current-menu-item",
        "current_page_item",
        "current-menu-ancestor",
        "current-menu-parent",
        "current_page_parent",
        "current_page_ancestor"
      );
    });

    var bestLink = null;
    var bestScore = -1;
    menu.querySelectorAll("a[href]").forEach(function (a) {
      var href = normalizeNavPath(a.getAttribute("href"));
      if (!href) return;
      var score = -1;
      if (current === href) score = 1000 + href.length;
      else if (pathsMatch(current, href)) score = 900 + href.length;
      else if (href !== "/index.html" && current.indexOf(href.replace(/\/index\.html$/, "")) === 0) {
        score = 500 + href.length;
      }
      if (score > bestScore) {
        bestScore = score;
        bestLink = a;
      }
    });

    if (!bestLink) return;

    var activeLi = bestLink.closest("li");
    if (!activeLi) return;
    activeLi.classList.add("current-menu-item", "current_page_item");

    var parentLi = activeLi.parentElement && activeLi.parentElement.closest("li");
    while (parentLi) {
      parentLi.classList.add("current-menu-ancestor", "current-menu-parent");
      parentLi = parentLi.parentElement && parentLi.parentElement.closest("li");
    }

    document.querySelectorAll('.fusion-mobile-nav-holder[aria-label="Main Menu Mobile"] ul li').forEach(function (li) {
      li.classList.remove("fusion-mobile-current-nav-item");
    });
    var mobileHref = bestLink.getAttribute("href");
    if (mobileHref) {
      document
        .querySelectorAll('.fusion-mobile-nav-holder[aria-label="Main Menu Mobile"] a[href="' + mobileHref + '"]')
        .forEach(function (a) {
          var li = a.closest("li");
          if (li) li.classList.add("fusion-mobile-current-nav-item");
        });
    }
  }

  function closeMobileMenu() {
    if (!window.jQuery) return;
    var $ = window.jQuery;
    var expanded = $(".fusion-mobile-nav-holder.fusion-mobile-menu-expanded").not(".fusion-mobile-sticky-nav-holder");
    if (!expanded.length) return;
    expanded.slideUp(200, "easeOutQuad").removeClass("fusion-mobile-menu-expanded");
    $(".fusion-mobile-menu-icons .awb-icon-bars").attr("aria-expanded", "false");
  }

  function initNavbarHelpers() {
    if (window.jQuery) {
      var $ = window.jQuery;
      if (typeof window.fusionRunNavIsCollapsed === "function") {
        window.fusionRunNavIsCollapsed();
      }
      if (typeof window.resizeOverlaySearch === "function") {
        window.resizeOverlaySearch();
      }
      $(window).trigger("resize");
    }
    highlightCurrentNav();
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeAllPopups();
      closeMobileMenu();
    }
  });

  document.addEventListener("click", function (e) {
    if (!e.target.closest(".fusion-header")) {
      closeMobileMenu();
    }
  });

  function initBlogPostSliders() {
    if (typeof window.fusionInitPostFlexSlider === "function") {
      window.fusionInitPostFlexSlider();
    }
  }

  function init() {
    bindPopupClose();
    initLottiePlayers();
    initNavbarHelpers();
    flattenSlideInUpSections();
    ensureContentVisible();
    initBlogPostSliders();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  window.addEventListener("load", function () {
    init();
    setupFusionStickyHeader();
    flattenSlideInUpSections();
    ensureContentVisible();
    initNavbarHelpers();
    window.setTimeout(setupFusionStickyHeader, 300);
    window.setTimeout(flattenSlideInUpSections, 350);
    window.setTimeout(flattenSlideInUpSections, 900);
    window.setTimeout(initNavbarHelpers, 600);
    window.setTimeout(ensureContentVisible, 800);
    window.setTimeout(flattenSlideInUpSections, 1500);
    window.setTimeout(setupFusionStickyHeader, 1200);
    window.setTimeout(initBlogPostSliders, 500);
  });

  ensureJQueryEasing();
  setupFusionStickyHeader();

  window.addEventListener("resize", function () {
    if (window.innerWidth > STICKY_BREAKPOINT) closeMobileMenu();
  });
})();
