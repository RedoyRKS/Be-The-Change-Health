/**
 * Be The Change Health — Admin CMS shell & interactions
 */
(function () {
  "use strict";

  var IS_NESTED = /\/pages\//.test(location.pathname.replace(/\\/g, "/"));
  var ROOT = IS_NESTED ? "../" : "";
  var PAGES = IS_NESTED ? "" : "pages/";
  var FE = IS_NESTED ? "../../Frontend/" : "../Frontend/";
  var PAGE = document.body.getAttribute("data-page") || "";

  var NAV = [
    { type: "link", id: "dashboard", label: "Dashboard", href: ROOT + "index.html", icon: "bi-grid-1x2" },
    { type: "label", label: "Website Pages" },
    { type: "link", id: "homepage", label: "Homepage", href: PAGES + "homepage.html", icon: "bi-house-heart" },
    {
      type: "group",
      id: "about-group",
      label: "About",
      icon: "bi-info-circle",
      match: ["about", "integrative", "naturopathic", "process"],
      items: [
        { id: "about", label: "Our Practice", href: PAGES + "about.html" },
        { id: "integrative", label: "Integrative Medicine", href: PAGES + "integrative-medicine.html" },
        { id: "naturopathic", label: "Naturopathic Medicine", href: PAGES + "naturopathic-medicine.html" },
        { id: "process", label: "Our Process", href: PAGES + "our-process.html" }
      ]
    },
    { type: "link", id: "header-footer", label: "Header & Footer", href: PAGES + "header-footer.html", icon: "bi-layout-text-window" },
    { type: "label", label: "Practitioners" },
    { type: "link", id: "doctors", label: "Doctors", href: PAGES + "doctors.html", icon: "bi-person-badge" },
    { type: "link", id: "doctor-sultana", label: "Sultana Afrooz, D.O.", href: PAGES + "doctor-sultana.html", icon: "bi-person-heart" },
    { type: "link", id: "doctor-jessica", label: "Jessica Needle, N.D.", href: PAGES + "doctor-jessica.html", icon: "bi-person-heart" },
    { type: "label", label: "Care Operations" },
    { type: "link", id: "appointments", label: "Appointments", href: PAGES + "appointments.html", icon: "bi-calendar2-check" },
    { type: "link", id: "inquiries", label: "Inquiries", href: PAGES + "inquiries.html", icon: "bi-envelope-open" },
    { type: "link", id: "services", label: "Services", href: PAGES + "services.html", icon: "bi-heart-pulse" },
    { type: "link", id: "conditions", label: "Conditions", href: PAGES + "conditions.html", icon: "bi-clipboard2-pulse" },
    { type: "link", id: "blog", label: "Blog", href: PAGES + "blog.html", icon: "bi-journal-richtext" },
    { type: "label", label: "Site" },
    { type: "link", id: "media", label: "Media Library", href: PAGES + "media.html", icon: "bi-images" },
    { type: "link", id: "seo", label: "SEO Settings", href: PAGES + "seo.html", icon: "bi-search" },
    { type: "link", id: "settings", label: "Site Settings", href: PAGES + "settings.html", icon: "bi-gear" }
  ];

  var TITLES = {
    dashboard: ["Overview", "Dashboard"],
    homepage: ["Website Pages", "Homepage"],
    about: ["About", "Our Practice"],
    integrative: ["About", "Integrative Medicine"],
    naturopathic: ["About", "Naturopathic Medicine"],
    process: ["About", "Our Process"],
    doctors: ["Practitioners", "Doctors"],
    "doctor-sultana": ["Practitioners", "Sultana Afrooz, D.O."],
    "doctor-jessica": ["Practitioners", "Jessica Needle, N.D."],
    appointments: ["Care Operations", "Appointments"],
    inquiries: ["Care Operations", "Inquiries"],
    services: ["Care Operations", "Services"],
    conditions: ["Care Operations", "Conditions"],
    blog: ["Care Operations", "Blog"],
    media: ["Site", "Media Library"],
    "header-footer": ["Website Pages", "Header & Footer"],
    seo: ["Site", "SEO Settings"],
    settings: ["Site", "Site Settings"]
  };

  function el(html) {
    var t = document.createElement("template");
    t.innerHTML = html.trim();
    return t.content.firstElementChild;
  }

  function isActive(id) {
    return PAGE === id;
  }

  function groupOpen(group) {
    return group.match && group.match.indexOf(PAGE) !== -1;
  }

  function buildNav() {
    var html = "";
    NAV.forEach(function (item) {
      if (item.type === "label") {
        html += '<div class="nav-label">' + item.label + "</div>";
        return;
      }
      if (item.type === "group") {
        var open = groupOpen(item);
        html +=
          '<button type="button" class="nav-link-admin' +
          (open ? " active" : "") +
          '" data-toggle-group="' +
          item.id +
          '"><i class="bi ' +
          item.icon +
          '"></i><span>' +
          item.label +
          '</span><i class="bi bi-chevron-down nav-caret"></i></button>';
        html += '<div class="nav-sub' + (open ? " open" : "") + '" id="' + item.id + '">';
        item.items.forEach(function (sub) {
          html +=
            '<a href="' +
            sub.href +
            '" class="' +
            (isActive(sub.id) ? "active" : "") +
            '">' +
            sub.label +
            "</a>";
        });
        html += "</div>";
        return;
      }
      html +=
        '<a class="nav-link-admin' +
        (isActive(item.id) ? " active" : "") +
        '" href="' +
        item.href +
        '"><i class="bi ' +
        item.icon +
        '"></i><span>' +
        item.label +
        "</span></a>";
    });
    return html;
  }

  function injectShell() {
    if (document.body.classList.contains("login-body")) return;

    var sidebar = document.getElementById("sidebar");
    var topbar = document.getElementById("topbar");
    if (!sidebar || !topbar) return;

    sidebar.innerHTML =
      '<div class="sidebar-brand">' +
      '<img src="' + FE + 'assets/uploads/2024/08/LOGO.jpg" alt="Be The Change">' +
      '<div class="sidebar-brand-text"><strong>Be The Change</strong><span>Admin CMS</span></div>' +
      "</div>" +
      '<nav class="sidebar-nav">' +
      buildNav() +
      "</nav>" +
      '<div class="sidebar-foot">Columbia, MD · Out-of-network practice</div>';

    var title = TITLES[PAGE] || ["Admin", "CMS"];
    topbar.innerHTML =
      '<div class="topbar-left">' +
      '<button class="menu-toggle" type="button" id="menu-toggle" aria-label="Open menu"><i class="bi bi-list"></i></button>' +
      '<div class="page-title-bar"><p class="page-kicker">' +
      title[0] +
      "</p><h1>" +
      title[1] +
      "</h1></div></div>" +
      '<div class="topbar-right">' +
      '<div class="top-search"><i class="bi bi-search"></i><input type="search" placeholder="Search CMS…" id="cms-search"></div>' +
      '<a class="icon-btn" href="' + PAGES + 'appointments.html" title="Appointments"><i class="bi bi-bell"></i><span class="dot"></span></a>' +
      '<div class="user-chip">' +
      '<span class="user-avatar">SA</span>' +
      "<span><strong>Sultana Afrooz</strong><small>Practice Admin</small></span>" +
      '<a class="icon-action" href="' + ROOT + 'login.html" title="Sign out"><i class="bi bi-box-arrow-right"></i></a>' +
      "</div></div>";

    document.getElementById("menu-toggle").addEventListener("click", toggleSidebar);
    document.querySelectorAll("[data-toggle-group]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var id = btn.getAttribute("data-toggle-group");
        var sub = document.getElementById(id);
        if (sub) sub.classList.toggle("open");
      });
    });
  }

  function toggleSidebar() {
    var sidebar = document.getElementById("sidebar");
    var backdrop = document.getElementById("sidebar-backdrop");
    sidebar.classList.toggle("open");
    if (backdrop) backdrop.classList.toggle("show");
  }

  function toast(message, type) {
    var stack = document.querySelector(".toast-stack");
    if (!stack) {
      stack = document.createElement("div");
      stack.className = "toast-stack";
      document.body.appendChild(stack);
    }
    var node = el(
      '<div class="toast-admin ' +
        (type || "success") +
        '"><i class="bi bi-check-circle-fill"></i><div>' +
        message +
        "</div></div>"
    );
    stack.appendChild(node);
    setTimeout(function () {
      node.remove();
    }, 2800);
  }

  function bindEditors() {
    document.querySelectorAll(".editor-head").forEach(function (head) {
      head.addEventListener("click", function () {
        head.parentElement.classList.toggle("open");
      });
    });
  }

  function bindSaves() {
    document.querySelectorAll("[data-save]").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        toast(btn.getAttribute("data-save") || "Changes saved successfully.");
      });
    });
  }

  function bindDeletes() {
    document.querySelectorAll("[data-delete]").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        var row = btn.closest("tr");
        var label = btn.getAttribute("data-delete") || "this item";
        if (window.confirm("Delete " + label + "? This cannot be undone in the live site until you publish.")) {
          if (row) row.remove();
          toast(label + " removed from the draft list.");
        }
      });
    });
  }

  function bindUploads() {
    document.querySelectorAll(".upload-box input[type=file]").forEach(function (input) {
      input.addEventListener("change", function () {
        var file = input.files && input.files[0];
        if (!file) return;
        var preview = input.parentElement.querySelector(".upload-preview");
        if (preview) {
          preview.src = URL.createObjectURL(file);
          preview.hidden = false;
        }
        toast("Image selected — save the section to apply it.");
      });
    });
  }

  function bindFilters() {
    document.querySelectorAll("[data-table-search]").forEach(function (input) {
      var tableId = input.getAttribute("data-table-search");
      input.addEventListener("input", function () {
        var q = input.value.toLowerCase();
        document.querySelectorAll("#" + tableId + " tbody tr").forEach(function (row) {
          row.style.display = row.textContent.toLowerCase().indexOf(q) === -1 ? "none" : "";
        });
      });
    });

    document.querySelectorAll("[data-filter]").forEach(function (select) {
      select.addEventListener("change", function () {
        var key = select.getAttribute("data-filter");
        var val = select.value;
        document.querySelectorAll("[" + key + "]").forEach(function (row) {
          row.style.display = !val || row.getAttribute(key) === val ? "" : "none";
        });
      });
    });
  }

  function bindLogin() {
    var form = document.getElementById("login-form");
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var email = form.email.value.trim();
      var password = form.password.value;
      var err = document.getElementById("login-error");
      if (!email || !password) {
        if (err) {
          err.hidden = false;
          err.textContent = "Enter your email and password.";
        }
        return;
      }
      window.location.href = "index.html";
    });
  }

  function bindBackdrop() {
    var backdrop = document.getElementById("sidebar-backdrop");
    if (backdrop) backdrop.addEventListener("click", toggleSidebar);
  }

  document.addEventListener("DOMContentLoaded", function () {
    injectShell();
    bindEditors();
    bindSaves();
    bindDeletes();
    bindUploads();
    bindFilters();
    bindLogin();
    bindBackdrop();
  });

  window.BTCAdmin = { toast: toast };
})();
