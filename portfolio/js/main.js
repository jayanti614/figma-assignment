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