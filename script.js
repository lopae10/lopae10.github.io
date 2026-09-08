const AUTH_KEY = "site-auth";
const PASSWORDS = ["marialamillor", "maria la millor"];

function isLoggedIn() {
  try {
    return sessionStorage.getItem(AUTH_KEY) === "1";
  } catch {
    return false;
  }
}

function requireLogin() {
  if (!isLoggedIn()) {
    window.location.replace("login.html");
  }
}

function setupLoginForm() {
  if (isLoggedIn()) {
    window.location.replace("index.html");
    return;
  }

  const form = document.getElementById("login-form");
  const error = document.getElementById("login-error");
  const passwordInput = document.getElementById("password");

  if (!form || !passwordInput) {
    return;
  }

  passwordInput.addEventListener("input", () => {
    if (error) {
      error.hidden = true;
    }
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (PASSWORDS.includes(passwordInput.value)) {
      try {
        sessionStorage.setItem(AUTH_KEY, "1");
      } catch (err) {
        console.error("Storage error:", err);
      }
      window.location.replace("index.html");
      return;
    }

    if (error) {
      error.hidden = false;
    }
    passwordInput.value = "";
    passwordInput.focus();
  });
}

function setupRecapNav() {
  const nav = document.querySelector(".recap-nav");
  if (!nav) {
    return;
  }

  nav.addEventListener("click", (event) => {
    const link = event.target.closest("a[href^='#']");
    if (!link) {
      return;
    }

    const target = document.querySelector(link.getAttribute("href"));
    if (!target) {
      return;
    }

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

function init() {
  if (document.body && document.body.classList.contains("login-page")) {
    setupLoginForm();
    return;
  }

  requireLogin();
  setupRecapNav();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
