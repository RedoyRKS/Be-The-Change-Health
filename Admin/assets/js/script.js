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
    { type: "link", id: "contact", label: "Contact Page Content", href: PAGES + "contact.html", icon: "bi-layout-text-sidebar" },
    { type: "label", label: "Practitioners" },
    { type: "link", id: "doctors", label: "Doctors", href: PAGES + "doctors.html", icon: "bi-person-badge" },
    { type: "link", id: "doctor-sultana", label: "Sultana Afrooz, D.O.", href: PAGES + "doctor-sultana.html", icon: "bi-person-heart" },
    { type: "link", id: "doctor-jessica", label: "Jessica Needle, N.D.", href: PAGES + "doctor-jessica.html", icon: "bi-person-heart" },
    { type: "label", label: "Care Operations" },
    { type: "link", id: "appointments", label: "Appointments", href: PAGES + "appointments.html", icon: "bi-calendar2-check" },
    { type: "link", id: "inquiries", label: "Contact / Inquiries", href: PAGES + "inquiries.html", icon: "bi-envelope-open" },
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
    contact: ["Website Pages", "Contact Page Content"],
    "contact-preview": ["Website Pages", "Contact Page Live Preview"],
    doctors: ["Practitioners", "Doctors"],
    "doctor-sultana": ["Practitioners", "Sultana Afrooz, D.O."],
    "doctor-jessica": ["Practitioners", "Jessica Needle, N.D."],
    appointments: ["Care Operations", "Appointments"],
    inquiries: ["Care Operations", "Contact / Inquiries Inbox"],
    "inquiry-detail": ["Care Operations", "Inquiry Details & Reply"],
    "blog-edit": ["Care Operations", "Write article"],
    "blog-preview": ["Care Operations", "Article preview"],
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
    if (PAGE === id) return true;
    if (id === "blog" && (PAGE === "blog-edit" || PAGE === "blog-preview")) return true;
    if (id === "contact" && (PAGE === "contact" || PAGE === "contact-preview")) return true;
    if (id === "inquiries" && (PAGE === "inquiries" || PAGE === "inquiry-detail")) return true;
    return false;
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

  function applyTableFilters(table) {
    if (!table) return;
    var wrap = table.closest(".card-admin, main") || document;
    var search = wrap.querySelector("[data-table-search='" + table.id + "']");
    var q = search ? search.value.toLowerCase() : "";
    var visible = 0;
    table.querySelectorAll("tbody tr").forEach(function (row) {
      var show = !q || row.textContent.toLowerCase().indexOf(q) !== -1;
      wrap.querySelectorAll("[data-filter]").forEach(function (select) {
        var scoped = select.getAttribute("data-filter-table");
        if (scoped && scoped !== table.id) return;
        var val = select.value;
        var key = select.getAttribute("data-filter");
        if (val && row.getAttribute(key) !== val) show = false;
      });
      row.style.display = show ? "" : "none";
      if (show) visible += 1;
    });
    var count = wrap.querySelector("[data-result-count]");
    if (count) count.textContent = String(visible);
  }

  function bindFilters() {
    document.querySelectorAll("table[id]").forEach(applyTableFilters);
    document.querySelectorAll("[data-table-search]").forEach(function (input) {
      input.addEventListener("input", function () {
        applyTableFilters(document.getElementById(input.getAttribute("data-table-search")));
      });
    });
    document.querySelectorAll("[data-filter]").forEach(function (select) {
      select.addEventListener("change", function () {
        var tid = select.getAttribute("data-filter-table");
        if (tid) applyTableFilters(document.getElementById(tid));
        else document.querySelectorAll("table[id]").forEach(applyTableFilters);
      });
    });
  }

  function bindSlug() {
    var title = document.getElementById("blog-title");
    var slug = document.getElementById("blog-slug");
    if (!title || !slug) return;
    title.addEventListener("input", function () {
      if (slug.dataset.locked === "1") return;
      slug.value = title.value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    });
    slug.addEventListener("input", function () {
      slug.dataset.locked = "1";
    });
  }

  function bindReply() {
    var form = document.getElementById("inquiry-reply-form") || document.getElementById("reply-form");
    var tmplSelect = document.getElementById("reply-template-select");
    var textarea = document.getElementById("reply-message-textarea") || (form && form.querySelector("textarea"));
    var helper = document.getElementById("reply-channel-helper");
    var channelBtns = document.querySelectorAll(".channel-btn");

    var templates = {
      intake: "Hello Nas, thank you for reaching out to Be The Change Health & Wellness Center. We would love to help you schedule a new patient consultation with Dr. Sultana Afrooz, D.O. or Dr. Jessica Needle, N.D. Our new patient coordinator is available to answer any questions at 301-970-9724. You can also request your appointment online directly.",
      insurance: "Thank you for contacting us. Please note that our office is an out-of-network practice. While we do not bill insurance directly, we provide a detailed Superbill containing all diagnostic and treatment codes that you may submit to your insurer for potential reimbursement. Let us know if you would like more details.",
      hours: "Our office is located at 8808 Centre Park Drive, Suite 301, Columbia, MD 21045. Office hours are Monday through Friday, 10:00 AM to 5:00 PM. We have ample complimentary patient parking right outside the entrance. Telehealth appointments are also available.",
      telehealth: "We are pleased to offer Telehealth consultations for patients residing in Maryland. Telehealth visits are conducted securely online, allowing you to discuss your health goals and lab results comfortably from home.",
      services: "Thank you for your inquiry regarding our wellness therapies. We offer Frequency Specific Microcurrent, Hyperbaric Oxygen Therapy, Infrared Sauna, and IV Nutritional Infusions. We can discuss which therapies align best with your personalized wellness plan."
    };

    if (tmplSelect && textarea) {
      tmplSelect.addEventListener("change", function () {
        var key = tmplSelect.value;
        if (templates[key]) {
          textarea.value = templates[key];
          textarea.focus();
          toast("Template inserted into reply composer.");
        }
      });
    }

    var activeChannel = "Email";
    channelBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        channelBtns.forEach(function (b) { b.classList.remove("active"); });
        btn.classList.add("active");
        var ch = btn.getAttribute("data-channel");
        if (ch === "sms") {
          activeChannel = "SMS Text";
          if (helper) helper.innerHTML = '<i class="bi bi-chat-dots"></i> Sending SMS text message via clinic primary line: <strong>301-970-9724</strong>.';
        } else {
          activeChannel = "Email";
          if (helper) helper.innerHTML = '<i class="bi bi-info-circle"></i> Replying via Email will send directly to the patient\'s submitted address.';
        }
      });
    });

    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var box = textarea || form.querySelector("textarea");
        var text = box ? box.value.trim() : "";
        if (!text) {
          toast("Please enter a message before sending.", "warn");
          return;
        }
        var thread = document.getElementById("inquiry-conversation-thread") || document.getElementById("inquiry-thread");
        if (thread) {
          var bubble = el(
            '<div class="inquiry-bubble outbound">' +
              '<div class="inquiry-bubble-header">' +
                '<strong><i class="bi bi-person-badge text-teal me-1"></i> Sultana Afrooz, D.O. <span class="badge-admin badge-replied ms-2">Replied via ' + activeChannel + '</span></strong>' +
                '<small class="text-muted"><i class="bi bi-clock me-1"></i> Just now</small>' +
              '</div>' +
              '<div class="inquiry-bubble-body"></div>' +
            '</div>'
          );
          bubble.querySelector(".inquiry-bubble-body").textContent = text;
          thread.appendChild(bubble);
          thread.scrollTop = thread.scrollHeight;
        }

        if (box) box.value = "";
        var badge = document.getElementById("inquiry-top-status") || document.getElementById("inquiry-status-badge");
        if (badge) {
          badge.className = "badge-admin badge-replied";
          badge.textContent = "REPLIED";
        }
        var statusSelect = document.getElementById("inquiry-status-select") || document.getElementById("inquiry-status");
        if (statusSelect) statusSelect.value = "replied";
        toast("Reply sent via " + activeChannel + ". Status updated to Replied.");
      });
    }

    var noteForm = document.getElementById("add-note-form");
    if (noteForm) {
      noteForm.addEventListener("submit", function (e) {
        e.preventDefault();
        var input = document.getElementById("internal-note-input");
        var val = input ? input.value.trim() : "";
        if (!val) return;
        var thread = document.getElementById("inquiry-conversation-thread");
        if (thread) {
          var noteBubble = el(
            '<div class="inquiry-bubble internal-note">' +
              '<div class="inquiry-bubble-header">' +
                '<strong><i class="bi bi-lock-fill text-warning me-1"></i> Internal Staff Note · Front Desk Coordinator</strong>' +
                '<small class="text-muted"><i class="bi bi-clock me-1"></i> Just now</small>' +
              '</div>' +
              '<div class="inquiry-bubble-body text-dark"></div>' +
            '</div>'
          );
          noteBubble.querySelector(".inquiry-bubble-body").textContent = val;
          thread.appendChild(noteBubble);
          thread.scrollTop = thread.scrollHeight;
        }
        if (input) input.value = "";
        toast("Private internal note added.");
      });
    }
  }

  function bindStatus() {
    var status = document.getElementById("inquiry-status-select") || document.getElementById("inquiry-status");
    var priority = document.getElementById("inquiry-priority-select");
    var archiveBtn = document.getElementById("btn-inquiry-archive");
    var deleteBtn = document.getElementById("btn-inquiry-delete");

    var map = {
      new: ["badge-admin badge-new", "NEW"],
      open: ["badge-admin badge-open", "OPEN"],
      replied: ["badge-admin badge-replied", "REPLIED"],
      closed: ["badge-admin badge-closed", "CLOSED"],
      archived: ["badge-admin badge-archived", "ARCHIVED"]
    };

    var priorityMap = {
      urgent: ["badge-admin badge-urgent", "URGENT"],
      high: ["badge-admin badge-high", "HIGH"],
      normal: ["badge-admin badge-normal", "NORMAL"],
      low: ["badge-admin badge-low", "LOW"]
    };

    if (status) {
      status.addEventListener("change", function () {
        var badge = document.getElementById("inquiry-top-status") || document.getElementById("inquiry-status-badge");
        var next = map[status.value] || map.open;
        if (badge) {
          badge.className = next[0];
          badge.textContent = next[1];
        }
        toast("Inquiry status updated to " + next[1] + ".");
      });
    }

    if (priority) {
      priority.addEventListener("change", function () {
        var badge = document.getElementById("inquiry-top-priority");
        var next = priorityMap[priority.value] || priorityMap.normal;
        if (badge) {
          badge.className = next[0];
          badge.textContent = next[1];
        }
        toast("Inquiry triage priority set to " + next[1] + ".");
      });
    }

    if (archiveBtn) {
      archiveBtn.addEventListener("click", function () {
        var badge = document.getElementById("inquiry-top-status");
        if (status) {
          if (status.value === "archived") {
            status.value = "open";
            if (badge) { badge.className = map.open[0]; badge.textContent = map.open[1]; }
            archiveBtn.innerHTML = '<i class="bi bi-archive me-1"></i> Archive Inquiry';
            toast("Inquiry unarchived and restored to Open.");
          } else {
            status.value = "archived";
            if (badge) { badge.className = map.archived[0]; badge.textContent = map.archived[1]; }
            archiveBtn.innerHTML = '<i class="bi bi-arrow-counterclockwise me-1"></i> Unarchive Inquiry';
            toast("Inquiry moved to archive.");
          }
        }
      });
    }

    if (deleteBtn) {
      deleteBtn.addEventListener("click", function () {
        if (window.confirm("Are you sure you want to delete this inquiry from Nas Moha? This action cannot be undone.")) {
          toast("Inquiry deleted from CMS.");
          setTimeout(function () {
            window.location.href = "inquiries.html";
          }, 800);
        }
      });
    }
  }

  function bindDeviceToggle() {
    var frame = document.getElementById("preview-screen-frame");
    if (!frame) return;
    document.querySelectorAll(".device-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        document.querySelectorAll(".device-btn").forEach(function (b) { b.classList.remove("active"); });
        btn.classList.add("active");
        var vp = btn.getAttribute("data-viewport");
        frame.classList.remove("tablet", "mobile");
        if (vp === "tablet") frame.classList.add("tablet");
        if (vp === "mobile") frame.classList.add("mobile");
      });
    });
  }

  function bindCopyButtons() {
    document.querySelectorAll(".copy-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var txt = btn.getAttribute("data-copy") || "";
        if (navigator.clipboard && txt) {
          navigator.clipboard.writeText(txt).then(function () {
            toast("Copied to clipboard: " + txt);
          }).catch(function () {
            toast("Copied: " + txt);
          });
        } else {
          toast("Copied: " + txt);
        }
      });
    });
  }

  function bindFilterPills() {
    var tabs = document.querySelectorAll(".filter-pill-tab");
    if (!tabs.length) return;
    var table = document.getElementById("inq-table");
    if (!table) return;

    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        tabs.forEach(function (t) { t.classList.remove("active"); });
        tab.classList.add("active");
        var filterVal = tab.getAttribute("data-filter-status");
        var visibleCount = 0;
        table.querySelectorAll("tbody tr").forEach(function (row) {
          var rowStatus = row.getAttribute("data-status");
          if (!filterVal || rowStatus === filterVal) {
            row.style.display = "";
            visibleCount++;
          } else {
            row.style.display = "none";
          }
        });
        var countEl = document.getElementById("inquiry-visible-count");
        if (countEl) countEl.textContent = String(visibleCount);
      });
    });
  }

  function bindNewArticle() {
    if (PAGE !== "blog-edit" || location.search.indexOf("new=1") === -1) return;
    ["blog-title", "blog-slug", "blog-excerpt", "blog-body", "blog-seo-title", "blog-seo-desc", "blog-tags"].forEach(function (id) {
      var eln = document.getElementById(id);
      if (eln) eln.value = "";
    });
    var status = document.getElementById("blog-status");
    if (status) status.value = "draft";
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
    bindSlug();
    bindReply();
    bindStatus();
    bindDeviceToggle();
    bindCopyButtons();
    bindFilterPills();
    bindNewArticle();
  });

  window.BTCAdmin = { toast: toast };
})();
