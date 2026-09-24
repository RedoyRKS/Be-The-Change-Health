/**
 * TopNav dropdown triggers (About, Conditions, Services, Patients):
 * - Never navigate on parent click
 * - Desktop: CSS hover / focus-within
 * - Mobile: tap parent to expand/collapse submenu
 */
(function () {
  "use strict";

  var MOBILE_MQ = "(max-width: 1199px)";

  function isMobileNav() {
    return window.matchMedia(MOBILE_MQ).matches;
  }

  function setExpanded(trigger, open) {
    trigger.setAttribute("aria-expanded", open ? "true" : "false");
  }

  function toggleSubmenu(trigger) {
    var submenu = trigger.nextElementSibling;
    if (!submenu || submenu.tagName !== "UL") return;

    var open = !submenu.classList.contains("dropdown-active");
    submenu.classList.toggle("dropdown-active", open);
    setExpanded(trigger, open);
  }

  function closeAllSubmenus() {
    document.querySelectorAll(".navmenu .dropdown > a").forEach(function (trigger) {
      var submenu = trigger.nextElementSibling;
      if (submenu && submenu.tagName === "UL") {
        submenu.classList.remove("dropdown-active");
      }
      setExpanded(trigger, false);
    });
  }

  document.querySelectorAll(".navmenu .dropdown > a").forEach(function (trigger) {
    if (!trigger.hasAttribute("aria-haspopup")) {
      trigger.setAttribute("aria-haspopup", "true");
    }
    if (!trigger.hasAttribute("aria-expanded")) {
      trigger.setAttribute("aria-expanded", "false");
    }

    // Capture phase so vendor mobile-nav close-on-link does not fire
    trigger.addEventListener(
      "click",
      function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();

        if (isMobileNav()) {
          toggleSubmenu(trigger);
        }
      },
      true
    );

    // role=button: Space should activate like a button
    trigger.addEventListener("keydown", function (e) {
      if (e.key !== " " && e.key !== "Enter") return;
      e.preventDefault();
      if (isMobileNav()) {
        toggleSubmenu(trigger);
      }
    });
  });

  // Reset expanded state when leaving mobile or closing the overlay
  window.matchMedia(MOBILE_MQ).addEventListener("change", function (e) {
    if (!e.matches) closeAllSubmenus();
  });

  document.querySelectorAll(".mobile-nav-toggle").forEach(function (btn) {
    btn.addEventListener("click", function () {
      window.setTimeout(function () {
        if (!document.body.classList.contains("mobile-nav-active")) {
          closeAllSubmenus();
        }
      }, 0);
    });
  });
})();
