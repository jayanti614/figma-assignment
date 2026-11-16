// ===== Mobile menu =====
const menuBtn = document.querySelector(".header__menu-btn");
const nav = document.querySelector("#main-nav");

// Opens or closes the menu and keeps the accessibility attributes in sync
function setMenu(open) {
  nav.classList.toggle("is-open", open);
  menuBtn.setAttribute("aria-expanded", String(open));
  menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
}

// Click the hamburger to toggle
menuBtn.addEventListener("click", () => {
  setMenu(!nav.classList.contains("is-open"));
});

// Press Escape to close
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setMenu(false);
  }
});

// Close after clicking a link
nav.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    setMenu(false);
  }
});