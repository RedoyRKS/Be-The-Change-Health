/**
 * Contact form — client-side validation (UI only).
 */
(function () {
  "use strict";

  var form = document.getElementById("contact-form");
  if (!form) return;

  var success = document.getElementById("contact-success");
  var message = document.getElementById("contactMessage");
  var messageCount = document.getElementById("contact-message-count");

  if (message && messageCount) {
    message.addEventListener("input", function () {
      messageCount.textContent = String(message.value.length);
    });
  }

  function validateEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function validatePhone(value) {
    var digits = value.replace(/\D/g, "");
    return digits.length >= 7 && digits.length <= 15;
  }

  function setInvalid(el, isInvalid) {
    if (!el) return;
    el.classList.toggle("is-invalid", isInvalid);
    el.classList.toggle("is-valid", !isInvalid && (el.type === "checkbox" ? el.checked : !!el.value));
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    var name = form.name;
    var email = form.email;
    var phone = form.phone;
    var subject = form.subject;
    var msg = form.message;
    var consent = form.consent;
    var valid = true;

    setInvalid(name, !name.value.trim() || name.value.trim().length < 2);
    if (!name.value.trim() || name.value.trim().length < 2) valid = false;

    setInvalid(email, !validateEmail(email.value.trim()));
    if (!validateEmail(email.value.trim())) valid = false;

    setInvalid(phone, !validatePhone(phone.value.trim()));
    if (!validatePhone(phone.value.trim())) valid = false;

    setInvalid(subject, !subject.value);
    if (!subject.value) valid = false;

    setInvalid(msg, !msg.value.trim() || msg.value.trim().length < 10);
    if (!msg.value.trim() || msg.value.trim().length < 10) valid = false;

    setInvalid(consent, !consent.checked);
    if (!consent.checked) valid = false;

    form.classList.add("was-validated");

    if (!valid) {
      var firstBad = form.querySelector(".is-invalid");
      if (firstBad) firstBad.focus();
      return;
    }

    if (success) {
      success.hidden = false;
      success.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    form.reset();
    form.classList.remove("was-validated");
    Array.prototype.forEach.call(form.querySelectorAll(".is-valid, .is-invalid"), function (el) {
      el.classList.remove("is-valid", "is-invalid");
    });
    if (messageCount) messageCount.textContent = "0";
  });

  form.addEventListener("input", function (event) {
    var el = event.target;
    if (!el || !el.name) return;
    if (!(el.classList.contains("is-invalid") || form.classList.contains("was-validated"))) return;

    if (el.type === "checkbox") {
      setInvalid(el, !el.checked);
    } else if (el.name === "email") {
      setInvalid(el, !validateEmail(el.value.trim()));
    } else if (el.name === "phone") {
      setInvalid(el, !validatePhone(el.value.trim()));
    } else if (el.name === "message") {
      setInvalid(el, !el.value.trim() || el.value.trim().length < 10);
    } else if (el.hasAttribute("required")) {
      setInvalid(el, !el.value.trim());
    }
  });
})();
