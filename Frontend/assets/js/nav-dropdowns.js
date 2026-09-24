/**
 * Backward-compatible shim — dropdown logic now lives in site-header.js.
 * Safe no-op if SiteHeader already initialized the nav.
 */
(function () {
  "use strict";
  if (window.SiteHeader && typeof window.SiteHeader.initDropdowns === "function") {
    window.SiteHeader.initDropdowns(document);
  }
})();
