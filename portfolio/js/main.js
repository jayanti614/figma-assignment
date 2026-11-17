// ===== Recommendations carousel =====
const carousel = document.querySelector(".carousel");

if (carousel) {
  const track = carousel.querySelector(".carousel__track");
  const slides = Array.from(track.children);
  const dotsWrap = carousel.querySelector(".carousel__dots");

  let perView = 1;   // how many cards are visible at once
  let current = 0;   // index of the first visible card

  // Reads the --per-view value that the CSS sets for each screen size
  function getPerView() {
    const value = getComputedStyle(carousel).getPropertyValue("--per-view");
    return Number(value) || 1;
  }

  // One dot for every position the track can stop at
  function buildDots() {
    dotsWrap.innerHTML = "";
    const positions = slides.length - perView + 1;

    for (let i = 0; i < positions; i++) {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "carousel__dot";
      dot.setAttribute("aria-label", `Show recommendation ${i + 1}`);
      dot.addEventListener("click", () => goTo(i));
      dotsWrap.appendChild(dot);
    }
  }

  // Moves the track and highlights the matching dot
  function goTo(index) {
    const maxIndex = slides.length - perView;
    current = Math.max(0, Math.min(index, maxIndex));

    track.style.transform = `translateX(-${current * (100 / perView)}%)`;

    Array.from(dotsWrap.children).forEach((dot, i) => {
      const isActive = i === current;
      dot.classList.toggle("is-active", isActive);
      dot.setAttribute("aria-current", String(isActive));
    });
  }

  // When the screen size changes, the number of visible cards can change too
  window.addEventListener("resize", () => {
    const newPerView = getPerView();
    if (newPerView !== perView) {
      perView = newPerView;
      buildDots();
      goTo(current);
    }
  });

  // Start
  perView = getPerView();
  buildDots();
  goTo(0);
}
// ===== Contact form =====
const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    // Stop the page from reloading. Nothing is saved, as the assignment says.
    event.preventDefault();

    formStatus.textContent = "Thank you! Your message has been sent.";
    contactForm.reset();

    // Clear the message after a few seconds
    setTimeout(() => {
      formStatus.textContent = "";
    }, 5000);
  });
}
// ===== Mobile menu =====
const navBtn = document.querySelector(".navbar__menu-btn");
const siteNav = document.querySelector("#site-nav");

if (navBtn && siteNav) {
  // Opens or closes the menu and keeps the accessibility attributes in sync
  function setNav(open) {
    siteNav.classList.toggle("is-open", open);
    navBtn.setAttribute("aria-expanded", String(open));
    navBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }

  navBtn.addEventListener("click", () => {
    setNav(!siteNav.classList.contains("is-open"));
  });

  // Escape closes the menu
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setNav(false);
    }
  });

  // Clicking a link closes the menu
  siteNav.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      setNav(false);
    }
  });
}