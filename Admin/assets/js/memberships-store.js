/**
 * Be The Change Health & Wellness Center — Memberships Data Store
 * Source of truth for Health & Wellness Membership Plans and Membership Page.
 * Persists to localStorage under "btc_memberships_data".
 */
(function (root, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root.BTCMemberships = factory();
  }
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";

  var STORAGE_KEY = "btc_memberships_data";

  var DEFAULT_PLANS = [
    {
      id: "standard-wellness",
      name: "Standard Wellness Membership",
      subtitle: "Routine wellness & essential preventive care",
      description: "Our entry-level wellness package providing routine savings on appointments and regular restorative therapies.",
      price: "25",
      period: "/ 3 Months",
      priceLabel: "Membership Price $25/ 3 Months",
      enrollment: "open",
      featured: false,
      appointmentDiscount: "5% off All Appointments",
      ivDiscount: "10% off All IV Therapies",
      saunaDiscount: "",
      servicesCount: 2,
      servicesFrequency: "year",
      perkNote: "Plus Two of the following services each year",
      services: [
        "Ionic Foot Detox",
        "Hyperbaric Oxygen Chamber",
        "Red Light Therapy",
        "Ear Ozone Insufflation",
        "Infrared Sauna",
        "FSM (Frequency Specific Microcurrent)"
      ],
      image: "assets/uploads/2024/10/Standard-Wellness-Membership-Ad-1.jpg",
      ctaText: "Join Now",
      ctaLink: "book-appointment.html",
      order: 1,
      status: "active",
      updatedAt: "2026-09-23T12:00:00.000Z"
    },
    {
      id: "specialized-wellness",
      name: "Specialized Wellness Membership",
      subtitle: "Enhanced recovery & monthly therapeutic support",
      description: "Our most popular membership plan featuring higher discounts on visits and two complimentary therapies every month.",
      price: "65",
      period: "/Month",
      priceLabel: "Membership Price $65/Month",
      enrollment: "open",
      featured: true,
      appointmentDiscount: "10% off All Appointments",
      ivDiscount: "20% off All IV Therapies",
      saunaDiscount: "",
      servicesCount: 2,
      servicesFrequency: "month",
      perkNote: "Plus Two of the following services each month per person:",
      services: [
        "Ionic Foot Detox",
        "Hyperbaric Oxygen Chamber",
        "Red Light Therapy",
        "Ear Ozone Insufflation",
        "Infrared Sauna",
        "FSM (Frequency Specific Microcurrent)"
      ],
      image: "assets/uploads/2024/10/Specialized-Wellness-Membership-Ad-1.jpg",
      ctaText: "Join Now",
      ctaLink: "book-appointment.html",
      order: 2,
      status: "active",
      updatedAt: "2026-09-23T12:00:00.000Z"
    },
    {
      id: "family-wellness",
      name: "Family Wellness Membership",
      subtitle: "Complete whole-family care with maximum benefits",
      description: "Comprehensive coverage for the entire family with exclusive infrared sauna savings and monthly therapy allowances.",
      price: "100",
      period: "/Month",
      priceLabel: "Membership Price $100/Month",
      enrollment: "open",
      featured: false,
      appointmentDiscount: "10% off All Appointments",
      ivDiscount: "20% off All IV Therapies",
      saunaDiscount: "20% off All Infrared Sauna Therapy",
      servicesCount: 2,
      servicesFrequency: "month",
      perkNote: "Plus Two of the following services each month per person:",
      services: [
        "Ionic Foot Detox",
        "Hyperbaric Oxygen Chamber",
        "Red Light Therapy",
        "Ear Ozone Insufflation",
        "Infrared Sauna",
        "FSM (Frequency Specific Microcurrent)"
      ],
      image: "assets/uploads/2024/10/family-Wellness-Membership-Ad.png",
      ctaText: "Join Now",
      ctaLink: "book-appointment.html",
      order: 3,
      status: "active",
      updatedAt: "2026-09-23T12:00:00.000Z"
    }
  ];

  var DEFAULT_PAGE_CONTENT = {
    hero: {
      title: "Membership Packages",
      subtitle: "Exceptional value with discounts and complimentary services tailored to your needs.",
      breadcrumb: "Memberships"
    },
    intro: {
      text: "To support administrative costs and ensure the best quality of care. All patients are REQUIRED to enroll in ONE of our membership plans. Each plan is designed to offer exceptional value, including discounts and complimentary services tailored to your needs.",
      highlightedWords: "REQUIRED, ONE",
      visible: true
    },
    testimonials: {
      title: "What Our Patients Say",
      subtitle: "Real experiences from patients of Be The Change Health & Wellness Center.",
      ratingLabel: "EXCELLENT",
      reviewCount: "37",
      stars: 5,
      autoplayDelay: 5000,
      reviews: [
        {
          id: "rev-1",
          author: "Elle",
          date: "2025-02-25",
          stars: 5,
          quote: "I've been going to Dr. Afrooz since 2021 and before she switched buildings to this one. She gets to know her patients well and always knows what to look for and test for. She's been so vital in my quality of life and has helped me and my family every step of the way. Even when I was at my darkest, she was there helping from the sidelines. My entire family has all been helped by Dr. Afrooz and her husband. We've made connections and friendships and became familiar with each other in a way that other doctors are usually more one-dimensional with. Dr. Afrooz has changed my life in such a wonderful way! She is worth every penny we've paid and way more!"
        },
        {
          id: "rev-2",
          author: "Manzur Ahmed",
          date: "2024-07-05",
          stars: 5,
          quote: "Dr Afrooz is my favorite. She is very knowledgeable and patient with her patients. I was always feeling very tired and lethargic and I was thinking that maybe I had long covid. But Dr Afrooz knew all the right questions to help identify that my condition is related to tick bites instead from a hiking trip I had gone on. I ask a lot of questions and she seems to not find me to be frustrating and i know that she is straightforward because she’s not afraid to say I don’t know if she does not know the answer to any of my questions. Nor is she dismissive of me whether it be ideas as to what I think could possibly help me or if I tell her something does not feel right. I highly recommend her and I feel fortunate to have been able to see her."
        },
        {
          id: "rev-3",
          author: "Muhammad Haroon",
          date: "2024-06-27",
          stars: 5,
          quote: "This is one of the most convenient doctor offices that I have been to. The appointments and treatments here are not nearly as atrociously priced as most of my visits to other doctors. The staff and workers really make me feel cared for. I recommend this doctor office over many other ones."
        },
        {
          id: "rev-4",
          author: "Samson Zewde",
          date: "2024-06-27",
          stars: 5,
          quote: "Great place! I felt well taken care of and left feeling revitalized after treatment."
        },
        {
          id: "rev-5",
          author: "Nas Moha",
          date: "2024-06-27",
          stars: 5,
          quote: "Doctors and staff are personable and friendly that provides excellent care. Best care so far around the area"
        },
        {
          id: "rev-6",
          author: "Oxana Oleson",
          date: "2024-06-26",
          stars: 5,
          quote: "I have known Dr. Afrooz for the past 8 years. Besides her knowledge and care she put in helping patients with different complex health issues, she is also one of the nicest people I know. She treated me and my family and never gave up on me trying to find a solution for treating chronic Lyme disease. Her office is equipped with lots of helpful tools to get you well. My favorite is a hyperbaric chamber, but there are many more. My daughter also recovered from Lyme disease with help of Dr. Afrooz. At that time, she was only 5 years old. I am beyond grateful for her help and knowledge. She is using both-conventional and integrative methods and always keeping up to date on new treatments."
        },
        {
          id: "rev-7",
          author: "sumaiyah khan",
          date: "2024-05-11",
          stars: 5,
          quote: "Dr. Afrooz is one of the most caring doctors out there. She goes above and beyond with her patients and dedicates herself to them completely. It’s also amazing how many different types of beneficial treatments are available right at the office."
        }
      ]
    },
    cta: {
      title: "Questions about memberships?",
      description: "Our team can help you choose the plan that fits your care. Call or request an appointment today.",
      phone: "301-970-9724",
      primaryBtnText: "Book Appointment",
      primaryBtnLink: "book-appointment.html",
      secondaryBtnText: "Contact Us",
      secondaryBtnLink: "contact.html"
    },
    seo: {
      title: "Health & Wellness Memberships | Serving Columbia, MD",
      description: "Our plans are designed to provide exceptional value, incorporating various discounts and complimentary services tailored to meet your needs."
    }
  };

  function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  function slugify(text) {
    return String(text || "")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  var PLAN_DEFAULT_IMAGES = {
    "standard-wellness": "assets/uploads/2024/10/Standard-Wellness-Membership-Ad-1.jpg",
    "specialized-wellness": "assets/uploads/2024/10/Specialized-Wellness-Membership-Ad-1.jpg",
    "family-wellness": "assets/uploads/2024/10/family-Wellness-Membership-Ad.png"
  };

  var DEFAULT_FALLBACK_SVG = "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20120%2080%22%20width%3D%22120%22%20height%3D%2280%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22btcBg%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%221%22%20y2%3D%221%22%3E%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%23f0f7f9%22%2F%3E%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23e2eff2%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D%22120%22%20height%3D%2280%22%20rx%3D%228%22%20fill%3D%22url(%23btcBg)%22%2F%3E%3Crect%20x%3D%220.5%22%20y%3D%220.5%22%20width%3D%22119%22%20height%3D%2279%22%20rx%3D%227.5%22%20fill%3D%22none%22%20stroke%3D%22%23cfe2e7%22%20stroke-width%3D%221%22%2F%3E%3Cg%20transform%3D%22translate(60%2C34)%22%3E%3Crect%20x%3D%22-20%22%20y%3D%22-16%22%20width%3D%2240%22%20height%3D%2228%22%20rx%3D%224%22%20fill%3D%22%23ffffff%22%20stroke%3D%22%232f93a8%22%20stroke-width%3D%221.5%22%20opacity%3D%220.95%22%2F%3E%3Ccircle%20cx%3D%227%22%20cy%3D%22-8%22%20r%3D%222.5%22%20fill%3D%22%232f93a8%22%20opacity%3D%220.8%22%2F%3E%3Cpath%20d%3D%22M-14%206l9-9%207%207%204-4%208%206h-28z%22%20fill%3D%22%232f93a8%22%20opacity%3D%220.65%22%2F%3E%3C%2Fg%3E%3Ctext%20x%3D%2260%22%20y%3D%2264%22%20font-family%3D%22-apple-system%2CBlinkMacSystemFont%2C'Segoe%20UI'%2CRoboto%2Csans-serif%22%20font-size%3D%227.5%22%20font-weight%3D%22600%22%20fill%3D%22%230b3a53%22%20letter-spacing%3D%220.4%22%20text-anchor%3D%22middle%22%20opacity%3D%220.75%22%3EMEMBERSHIP%20PLAN%3C%2Ftext%3E%3C%2Fsvg%3E";

  function getAdminFrontendPrefix() {
    if (typeof window === "undefined" || !window.location) {
      return "../../";
    }
    var norm = (window.location.pathname || "").replace(/\\/g, "/");
    var pagesIdx = norm.indexOf("/pages/");
    if (pagesIdx !== -1) {
      var rest = norm.slice(pagesIdx + "/pages/".length);
      // Subfolder under /pages/ (e.g. pages/memberships/memberships.html) -> depth 2 inside Admin
      if (rest.indexOf("/") !== -1) {
        return "../../";
      }
      // Directly inside /pages/ (e.g. pages/homepage.html) -> depth 1 inside Admin
      return "../";
    }
    return "";
  }

  function getRawData() {
    try {
      if (typeof localStorage === "undefined") {
        return {
          policyText: DEFAULT_PAGE_CONTENT.intro.text,
          pageContent: clone(DEFAULT_PAGE_CONTENT),
          plans: clone(DEFAULT_PLANS)
        };
      }
      var item = localStorage.getItem(STORAGE_KEY);
      if (item) {
        var parsed = JSON.parse(item);
        if (parsed && Array.isArray(parsed.plans)) {
          var changed = false;
          parsed.plans.forEach(function (p) {
            for (var i = 0; i < DEFAULT_PLANS.length; i++) {
              if (DEFAULT_PLANS[i].id === p.id) {
                var hasBroken = typeof p.image === "string" && (
                  p.image.indexOf("Frontend/") !== -1 ||
                  p.image.indexOf("data:image/svg") === 0 ||
                  p.image.indexOf("../assets/") === 0 ||
                  p.image.indexOf("../../assets/") === 0
                );
                var isInvalid = !p.image ||
                  typeof p.image !== "string" ||
                  p.image.trim() === "" ||
                  hasBroken;
                if (isInvalid) {
                  p.image = DEFAULT_PLANS[i].image;
                  changed = true;
                }
                break;
              }
            }
          });
          if (changed) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
          }
          if (!parsed.pageContent) {
            parsed.pageContent = clone(DEFAULT_PAGE_CONTENT);
          }
          return parsed;
        }
      }
    } catch (e) {
      console.warn("BTCMemberships: localStorage read failed, falling back to defaults.", e);
    }
    return {
      policyText: DEFAULT_PAGE_CONTENT.intro.text,
      pageContent: clone(DEFAULT_PAGE_CONTENT),
      plans: clone(DEFAULT_PLANS)
    };
  }

  function persist(data) {
    try {
      if (typeof localStorage !== "undefined") {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      }
      if (typeof window !== "undefined" && typeof window.dispatchEvent === "function") {
        window.dispatchEvent(new CustomEvent("btc-memberships-updated", { detail: data }));
      }
    } catch (e) {
      console.error("BTCMemberships: localStorage write failed", e);
    }
  }

  function blankPlan() {
    var data = getRawData();
    var nextOrder = data.plans.length + 1;
    return {
      id: "new",
      name: "",
      subtitle: "",
      description: "",
      price: "",
      period: "/Month",
      priceLabel: "",
      enrollment: "open",
      featured: false,
      appointmentDiscount: "10% off All Appointments",
      ivDiscount: "20% off All IV Therapies",
      saunaDiscount: "",
      servicesCount: 2,
      servicesFrequency: "month",
      perkNote: "Plus Two of the following services each month per person:",
      services: [
        "Ionic Foot Detox",
        "Hyperbaric Oxygen Chamber",
        "Red Light Therapy",
        "Ear Ozone Insufflation",
        "Infrared Sauna",
        "FSM (Frequency Specific Microcurrent)"
      ],
      image: "assets/uploads/2024/10/Specialized-Wellness-Membership-Ad-1.jpg",
      ctaText: "Join Now",
      ctaLink: "book-appointment.html",
      order: nextOrder,
      status: "draft",
      updatedAt: new Date().toISOString()
    };
  }

  function resolveImage(imgUrl, callerContext, planId) {
    if ((!imgUrl || typeof imgUrl !== "string" || !imgUrl.trim()) && planId && PLAN_DEFAULT_IMAGES[planId]) {
      imgUrl = PLAN_DEFAULT_IMAGES[planId];
    }
    if (!imgUrl || typeof imgUrl !== "string") {
      return callerContext === "admin" ? DEFAULT_FALLBACK_SVG : (planId && PLAN_DEFAULT_IMAGES[planId] ? PLAN_DEFAULT_IMAGES[planId] : "");
    }
    var trimmed = imgUrl.trim();
    if (!trimmed || trimmed === "undefined" || trimmed === "null") {
      return callerContext === "admin" ? DEFAULT_FALLBACK_SVG : (planId && PLAN_DEFAULT_IMAGES[planId] ? PLAN_DEFAULT_IMAGES[planId] : "");
    }
    if (trimmed.indexOf("data:") === 0) {
      if (planId && PLAN_DEFAULT_IMAGES[planId] && trimmed.indexOf("data:image/svg") === 0) {
        trimmed = PLAN_DEFAULT_IMAGES[planId];
      } else {
        return trimmed;
      }
    }
    if (trimmed.indexOf("http://") === 0 || trimmed.indexOf("https://") === 0 || trimmed.indexOf("blob:") === 0) {
      return trimmed;
    }
    var assetIdx = trimmed.indexOf("assets/");
    if (assetIdx !== -1) {
      var cleanPath = trimmed.substring(assetIdx);
      if (callerContext === "frontend") {
        return cleanPath;
      }
      var prefix = getAdminFrontendPrefix();
      return prefix + cleanPath;
    }
    if (planId && PLAN_DEFAULT_IMAGES[planId]) {
      var def = PLAN_DEFAULT_IMAGES[planId];
      return (callerContext === "frontend" ? "" : getAdminFrontendPrefix()) + def;
    }
    return trimmed;
  }

  var store = {
    load: function () {
      return getRawData();
    },

    save: function (data) {
      persist(data);
    },

    /* =========================================================================
       MEMBERSHIP PLANS CRUD
       ========================================================================= */

    getPlans: function () {
      var data = getRawData();
      return (data.plans || []).slice().sort(function (a, b) {
        return (parseInt(a.order, 10) || 0) - (parseInt(b.order, 10) || 0);
      });
    },

    getActivePlans: function () {
      return this.getPlans().filter(function (p) {
        return p.status === "active";
      });
    },

    getPlan: function (id) {
      if (!id || id === "new") return null;
      var plans = this.getPlans();
      for (var i = 0; i < plans.length; i++) {
        if (plans[i].id === id) return clone(plans[i]);
      }
      return null;
    },

    upsertPlan: function (planInput) {
      var data = getRawData();
      var plan = clone(planInput);

      if (!plan.id || plan.id === "new") {
        var baseSlug = slugify(plan.name) || "membership-plan";
        var slug = baseSlug;
        var counter = 1;
        while (data.plans.some(function (p) { return p.id === slug; })) {
          counter++;
          slug = baseSlug + "-" + counter;
        }
        plan.id = slug;
      }

      plan.order = parseInt(plan.order, 10) || (data.plans.length + 1);
      plan.servicesCount = parseInt(plan.servicesCount, 10) || 2;
      plan.featured = !!plan.featured;
      plan.price = String(plan.price || "").replace(/[^\d.]/g, "");
      plan.period = plan.period || "/Month";

      if (!plan.priceLabel) {
        plan.priceLabel = "Membership Price $" + plan.price + (plan.period ? " " + plan.period : "");
      }

      if (!plan.ctaText) plan.ctaText = "Join Now";
      if (!plan.ctaLink) plan.ctaLink = "book-appointment.html";

      plan.updatedAt = new Date().toISOString();

      var foundIndex = -1;
      for (var i = 0; i < data.plans.length; i++) {
        if (data.plans[i].id === plan.id) {
          foundIndex = i;
          break;
        }
      }

      if (foundIndex >= 0) {
        data.plans[foundIndex] = plan;
      } else {
        data.plans.push(plan);
      }

      persist(data);
      return clone(plan);
    },

    deletePlan: function (id) {
      var data = getRawData();
      data.plans = data.plans.filter(function (p) { return p.id !== id; });
      data.plans.forEach(function (p, index) {
        p.order = index + 1;
      });
      persist(data);
      return true;
    },

    duplicatePlan: function (id) {
      var target = this.getPlan(id);
      if (!target) return null;
      var copy = clone(target);
      copy.id = "new";
      copy.name = target.name + " (Copy)";
      copy.status = "draft";
      var data = getRawData();
      copy.order = data.plans.length + 1;
      return this.upsertPlan(copy);
    },

    setStatus: function (id, status) {
      var data = getRawData();
      var plan = data.plans.find(function (p) { return p.id === id; });
      if (!plan) return false;
      plan.status = status === "active" ? "active" : "draft";
      plan.updatedAt = new Date().toISOString();
      persist(data);
      return true;
    },

    reorderPlan: function (id, direction) {
      var data = getRawData();
      var plans = data.plans.sort(function (a, b) {
        return (parseInt(a.order, 10) || 0) - (parseInt(b.order, 10) || 0);
      });
      var idx = plans.findIndex(function (p) { return p.id === id; });
      if (idx === -1) return false;

      var targetIdx = direction === "up" ? idx - 1 : idx + 1;
      if (targetIdx < 0 || targetIdx >= plans.length) return false;

      var temp = plans[idx];
      plans[idx] = plans[targetIdx];
      plans[targetIdx] = temp;

      plans.forEach(function (p, i) {
        p.order = i + 1;
      });
      data.plans = plans;
      persist(data);
      return true;
    },

    /* =========================================================================
       MEMBERSHIP PAGE MANAGEMENT (HERO, POLICY, REVIEWS, CTA, SEO)
       ========================================================================= */

    getPageContent: function () {
      var data = getRawData();
      return clone(data.pageContent || DEFAULT_PAGE_CONTENT);
    },

    savePageContent: function (content) {
      var data = getRawData();
      data.pageContent = clone(content);
      if (content.intro && content.intro.text) {
        data.policyText = content.intro.text;
      }
      persist(data);
      return clone(data.pageContent);
    },

    saveHero: function (heroData) {
      var data = getRawData();
      data.pageContent = data.pageContent || clone(DEFAULT_PAGE_CONTENT);
      data.pageContent.hero = clone(heroData);
      persist(data);
      return clone(data.pageContent.hero);
    },

    saveIntro: function (introData) {
      var data = getRawData();
      data.pageContent = data.pageContent || clone(DEFAULT_PAGE_CONTENT);
      data.pageContent.intro = clone(introData);
      data.policyText = introData.text || "";
      persist(data);
      return clone(data.pageContent.intro);
    },

    saveTestimonials: function (testimonialsData) {
      var data = getRawData();
      data.pageContent = data.pageContent || clone(DEFAULT_PAGE_CONTENT);
      data.pageContent.testimonials = clone(testimonialsData);
      persist(data);
      return clone(data.pageContent.testimonials);
    },

    saveCta: function (ctaData) {
      var data = getRawData();
      data.pageContent = data.pageContent || clone(DEFAULT_PAGE_CONTENT);
      data.pageContent.cta = clone(ctaData);
      persist(data);
      return clone(data.pageContent.cta);
    },

    saveSeo: function (seoData) {
      var data = getRawData();
      data.pageContent = data.pageContent || clone(DEFAULT_PAGE_CONTENT);
      data.pageContent.seo = clone(seoData);
      persist(data);
      return clone(data.pageContent.seo);
    },

    savePolicy: function (text) {
      var data = getRawData();
      data.policyText = String(text || "").trim();
      if (!data.pageContent) data.pageContent = clone(DEFAULT_PAGE_CONTENT);
      if (!data.pageContent.intro) data.pageContent.intro = {};
      data.pageContent.intro.text = data.policyText;
      persist(data);
      return data.policyText;
    },

    getPolicy: function () {
      var data = getRawData();
      return (data.pageContent && data.pageContent.intro && data.pageContent.intro.text) || data.policyText || DEFAULT_PAGE_CONTENT.intro.text;
    },

    resetToDefaults: function () {
      var initial = {
        policyText: DEFAULT_PAGE_CONTENT.intro.text,
        pageContent: clone(DEFAULT_PAGE_CONTENT),
        plans: clone(DEFAULT_PLANS)
      };
      persist(initial);
      return initial;
    },

    blankPlan: blankPlan,
    resolveImage: resolveImage,
    FALLBACK_IMAGE: DEFAULT_FALLBACK_SVG,
    DEFAULT_FALLBACK_SVG: DEFAULT_FALLBACK_SVG,
    PLAN_DEFAULT_IMAGES: PLAN_DEFAULT_IMAGES,
    getAdminFrontendPrefix: getAdminFrontendPrefix
  };

  return store;
});
