const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const navigation = document.querySelector("[data-navigation]");
const themeToggle = document.querySelector("[data-theme-toggle]");
const themeIcon = document.querySelector("[data-theme-icon]");
const root = document.documentElement;

const closeMenu = () => {
  menuToggle?.setAttribute("aria-expanded", "false");
  menuToggle?.setAttribute("aria-label", "Abrir menu");
  navigation?.classList.remove("is-open");
  header?.classList.remove("menu-open");
};

const setTheme = (theme) => {
  const light = theme === "light";
  root.classList.toggle("theme-light", light);
  if (themeIcon) themeIcon.textContent = light ? "☾" : "☼";
  themeToggle?.setAttribute(
    "aria-label",
    light ? "Ativar tema escuro" : "Ativar tema claro",
  );
  themeToggle?.setAttribute(
    "title",
    light ? "Ativar tema escuro" : "Ativar tema claro",
  );
};

try {
  const savedTheme = localStorage.getItem("sagemoney-theme");
  if (savedTheme === "light" || savedTheme === "dark") setTheme(savedTheme);
} catch {
  setTheme("dark");
}

menuToggle?.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Abrir menu" : "Fechar menu");
  navigation?.classList.toggle("is-open", !isOpen);
  header?.classList.toggle("menu-open", !isOpen);
});

navigation?.addEventListener("click", (event) => {
  if (event.target.closest("a")) closeMenu();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

themeToggle?.addEventListener("click", () => {
  const nextTheme = root.classList.contains("theme-light") ? "dark" : "light";
  setTheme(nextTheme);
  try {
    localStorage.setItem("sagemoney-theme", nextTheme);
  } catch {
    // Theme still changes for this page if storage is unavailable.
  }
});

const updateHeader = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 28);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

document.querySelectorAll("[data-current-year]").forEach((element) => {
  element.textContent = String(new Date().getFullYear());
});
