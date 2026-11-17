// Mobile navigation and accessible menu state.
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

function closeMenu() {
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation menu");
  navLinks.classList.remove("is-open");
  document.body.classList.remove("menu-open");
}

menuToggle.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  menuToggle.setAttribute("aria-label", isExpanded ? "Open navigation menu" : "Close navigation menu");
  navLinks.classList.toggle("is-open", !isExpanded);
  document.body.classList.toggle("menu-open", !isExpanded);
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
    closeMenu();
    menuToggle.focus();
  }
});

// Validate the contact details locally; connect this form to a service to submit messages.
const contactForm = document.querySelector("#contact-form");
const formFeedback = document.querySelector("#form-feedback");

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const fields = [...contactForm.querySelectorAll("input, textarea")];
  let firstInvalidField = null;

  fields.forEach((field) => {
    const isValid = field.checkValidity() && field.value.trim().length > 0;
    field.setAttribute("aria-invalid", String(!isValid));
    if (!isValid && firstInvalidField === null) firstInvalidField = field;
  });

  if (firstInvalidField) {
    formFeedback.textContent = "Please complete each field with a valid email address.";
    formFeedback.classList.add("error");
    firstInvalidField.focus();
    return;
  }

  formFeedback.textContent = "Thanks! Your details are valid. This demo form does not send data to a server.";
  formFeedback.classList.remove("error");
  contactForm.reset();
  fields.forEach((field) => field.removeAttribute("aria-invalid"));
});

contactForm.querySelectorAll("input, textarea").forEach((field) => {
  field.addEventListener("input", () => {
    if (field.getAttribute("aria-invalid") === "true") {
      field.setAttribute("aria-invalid", String(!(field.checkValidity() && field.value.trim().length > 0)));
    }
  });
});

// Keep the footer year current without requiring annual edits.
document.querySelector("#current-year").textContent = new Date().getFullYear();
