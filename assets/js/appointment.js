/**
 * Appointment booking form — client-side validation (UI only).
 */
(function () {
  "use strict";

  var form = document.getElementById("appointment-form");
  if (!form) return;

  var success = document.getElementById("appointment-success");
  var dateInput = document.getElementById("preferredDate");
  var message = document.getElementById("message");
  var messageCount = document.getElementById("message-count");

  function todayISO() {
    var d = new Date();
    var m = String(d.getMonth() + 1).padStart(2, "0");
    var day = String(d.getDate()).padStart(2, "0");
    return d.getFullYear() + "-" + m + "-" + day;
  }

  if (dateInput) {
    dateInput.min = todayISO();
  }

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
    el.classList.toggle("is-valid", !isInvalid && el.value);
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    var firstName = form.firstName;
    var lastName = form.lastName;
    var email = form.email;
    var phone = form.phone;
    var patientType = form.patientType;
    var visitType = form.visitType;
    var service = form.service;
    var preferredDate = form.preferredDate;
    var preferredTime = form.preferredTime;
    var consent = form.consent;

    var valid = true;

    setInvalid(firstName, !firstName.value.trim() || firstName.value.trim().length < 2);
    if (!firstName.value.trim() || firstName.value.trim().length < 2) valid = false;

    setInvalid(lastName, !lastName.value.trim() || lastName.value.trim().length < 2);
    if (!lastName.value.trim() || lastName.value.trim().length < 2) valid = false;

    setInvalid(email, !validateEmail(email.value.trim()));
    if (!validateEmail(email.value.trim())) valid = false;

    setInvalid(phone, !validatePhone(phone.value.trim()));
    if (!validatePhone(phone.value.trim())) valid = false;

    setInvalid(patientType, !patientType.value);
    if (!patientType.value) valid = false;

    setInvalid(visitType, !visitType.value);
    if (!visitType.value) valid = false;

    setInvalid(service, !service.value);
    if (!service.value) valid = false;

    var dateOk = preferredDate.value && preferredDate.value >= todayISO();
    setInvalid(preferredDate, !dateOk);
    if (!dateOk) valid = false;

    setInvalid(preferredTime, !preferredTime.value);
    if (!preferredTime.value) valid = false;

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
    if (dateInput) dateInput.min = todayISO();
  });

  form.addEventListener("input", function (event) {
    var el = event.target;
    if (!el || !el.name) return;
    if (el.classList.contains("is-invalid") || form.classList.contains("was-validated")) {
      if (el.type === "checkbox") {
        setInvalid(el, !el.checked);
      } else if (el.name === "email") {
        setInvalid(el, !validateEmail(el.value.trim()));
      } else if (el.name === "phone") {
        setInvalid(el, !validatePhone(el.value.trim()));
      } else if (el.name === "preferredDate") {
        setInvalid(el, !(el.value && el.value >= todayISO()));
      } else if (el.hasAttribute("required")) {
        setInvalid(el, !el.value.trim());
      }
    }
  });
})();
