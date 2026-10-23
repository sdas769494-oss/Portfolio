const menuBtn = document.getElementById("menu-btn");
const navbar = document.getElementById("navbar");
const themeBtn = document.getElementById("theme-btn");
const topBtn = document.getElementById("top-btn");

// Mobile navigation
menuBtn.addEventListener("click", () => {
  const isOpen = navbar.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", String(isOpen));
  menuBtn.textContent = isOpen ? "✕" : "☰";
});

document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navbar.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
    menuBtn.textContent = "☰";
  });
});

// Dark and light theme
themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("light-theme");

  const isLight = document.body.classList.contains("light-theme");
  themeBtn.textContent = isLight ? "🌙" : "☀️";
  themeBtn.setAttribute(
    "aria-label",
    isLight ? "Switch to dark theme" : "Switch to light theme",
  );
});

// Typing animation
const typingElement = document.getElementById("typing");
const words = ["Frontend Developer", "Web Designer", "Creative Coder"];
let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
  const word = words[wordIndex];

  typingElement.textContent = word.substring(0, charIndex);

  if (!deleting) {
    charIndex++;

    if (charIndex > word.length) {
      deleting = true;
      setTimeout(typeEffect, 1200);
      return;
    }
  } else {
    charIndex--;

    if (charIndex < 0) {
      charIndex = 0;
      deleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }
  }

  setTimeout(typeEffect, deleting ? 45 : 90);
}

typeEffect();

// Active navigation while scrolling
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav-link");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === "#" + entry.target.id,
          );
        });
      }
    });
  },
  { rootMargin: "-25% 0px -60% 0px" },
);

sections.forEach((section) => observer.observe(section));

// Back to top button
window.addEventListener("scroll", () => {
  topBtn.classList.toggle("visible", window.scrollY > 400);
});

topBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Current year
document.getElementById("year").textContent = new Date().getFullYear();

// Contact form: open the visitor's email application
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

// Replace this with your real email address.
const portfolioEmail = "your.email@example.com";

document.getElementById("email-link").textContent = portfolioEmail;
document.getElementById("email-link").href = "mailto:${portfolioEmail}";

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (portfolioEmail === "your.email@example.com") {
    formStatus.textContent =
      "Please add your real email address in script.js first.";
    return;
  }

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    formStatus.textContent = "Please complete all fields.";
    return;
  }

  const subject = encodeURIComponent("Portfolio message from ${name}");
  const body = encodeURIComponent(
    "Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}",
  );

  formStatus.textContent =
    "Opening your email application. Send the prepared email to complete your message.";

  window.location.href =
    "mailto:${portfolioEmail}?subject=${subject}&body=${body}";
});
