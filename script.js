// script.js — Rufai Abdulrahmon portfolio interactions

// ===== Theme toggle (persisted) =====
(function () {
  const root = document.documentElement;
  const stored = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initial = stored ? stored === "dark" : prefersDark;
  root.setAttribute("data-theme", initial ? "dark" : "light");
})();

document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const toggle = document.getElementById("themeToggle");

  const sync = () => {
    const dark = root.getAttribute("data-theme") === "dark";
    toggle.textContent = dark ? "☀" : "☾";
  };
  sync();

  toggle.addEventListener("click", () => {
    const dark = root.getAttribute("data-theme") === "dark";
    const next = dark ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    sync();
  });

  // ===== Mobile menu =====
  const open = document.getElementById("menuOpen");
  const close = document.getElementById("menuClose");
  const overlay = document.getElementById("menuOverlay");
  open.addEventListener("click", () => overlay.classList.add("open"));
  close.addEventListener("click", () => overlay.classList.remove("open"));
  overlay.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => overlay.classList.remove("open"))
  );

  // ===== Year =====
  document.getElementById("year").textContent = new Date().getFullYear();

  // ===== Reveal on scroll =====
  const reveals = document.querySelectorAll(".section, .hero-inner");
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.style.opacity = 1;
          e.target.style.transform = "none";
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  reveals.forEach((el) => {
    el.style.opacity = 0;
    el.style.transform = "translateY(16px)";
    el.style.transition = "opacity .6s ease, transform .6s ease";
    io.observe(el);
  });
});