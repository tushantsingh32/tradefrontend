const track = document.querySelector(".review-track");
const cards = document.querySelectorAll(".review-card");

let index = 0;

function slide() {
  const cardWidth = cards[0].offsetWidth + 24;
  track.style.transform = `translateX(-${index * cardWidth}px)`;
}

function autoSlide() {
  const visible = window.innerWidth < 768 ? 1 : 3;
  index++;
  if (index > cards.length - visible) index = 0;
  slide();
}

let interval = setInterval(autoSlide, 3500);

/* Pause on touch */
track.addEventListener("touchstart", () => clearInterval(interval));
track.addEventListener("touchend", () => interval = setInterval(autoSlide, 3500));

window.addEventListener("resize", slide);
