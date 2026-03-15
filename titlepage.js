const slider = document.getElementById("categoriesSlider");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const cards = document.querySelectorAll(".category-card");

let currentIndex = 0;
let autoSlide = null;

let startX = 0;
let endX = 0;
let isTouching = false;

function getCardsPerView() {
  if (window.innerWidth <= 600) return 1;
  if (window.innerWidth <= 900) return 2;
  return 3;
}

function getGap() {
  return window.innerWidth <= 600 ? 0 : 18;
}

function getMaxIndex() {
  return Math.max(0, cards.length - getCardsPerView());
}

function updateSlider(withAnimation = true) {
  if (!slider || !cards.length) return;

  const cardWidth = cards[0].offsetWidth;
  const gap = getGap();

  slider.style.transition = withAnimation ? "transform 0.45s ease" : "none";
  slider.style.transform = `translateX(-${currentIndex * (cardWidth + gap)}px)`;
}

function goNext() {
  const maxIndex = getMaxIndex();

  if (currentIndex >= maxIndex) {
    currentIndex = 0;
  } else {
    currentIndex++;
  }

  updateSlider();
}

function goPrev() {
  const maxIndex = getMaxIndex();

  if (currentIndex <= 0) {
    currentIndex = maxIndex;
  } else {
    currentIndex--;
  }

  updateSlider();
}

function stopAutoSlide() {
  clearInterval(autoSlide);
  autoSlide = null;
}

function startAutoSlide() {
  stopAutoSlide();

  /* on mobile, stop auto slide completely */
  if (window.innerWidth <= 600) return;

  autoSlide = setInterval(() => {
    goNext();
  }, 4000);
}

/* BUTTONS */
if (nextBtn) {
  nextBtn.addEventListener("click", goNext);
}

if (prevBtn) {
  prevBtn.addEventListener("click", goPrev);
}

/* DESKTOP HOVER PAUSE */
if (slider) {
  slider.addEventListener("mouseenter", () => {
    if (window.innerWidth > 600) {
      stopAutoSlide();
    }
  });

  slider.addEventListener("mouseleave", () => {
    if (window.innerWidth > 600) {
      startAutoSlide();
    }
  });
}

/* MOBILE SWIPE */
if (slider) {
  slider.addEventListener(
    "touchstart",
    (e) => {
      if (window.innerWidth > 600) return;

      startX = e.touches[0].clientX;
      endX = startX;
      isTouching = true;
      stopAutoSlide();
    },
    { passive: true }
  );

  slider.addEventListener(
    "touchmove",
    (e) => {
      if (!isTouching || window.innerWidth > 600) return;
      endX = e.touches[0].clientX;
    },
    { passive: true }
  );

  slider.addEventListener(
    "touchend",
    () => {
      if (!isTouching || window.innerWidth > 600) return;

      const diffX = startX - endX;

      if (Math.abs(diffX) > 50) {
        if (diffX > 0) {
          goNext();
        } else {
          goPrev();
        }
      }

      isTouching = false;
      startX = 0;
      endX = 0;
    },
    { passive: true }
  );
}

/* IMPORTANT FIX:
   do NOT reset to first slide on resize */
window.addEventListener("resize", () => {
  const maxIndex = getMaxIndex();

  if (currentIndex > maxIndex) {
    currentIndex = maxIndex;
  }

  updateSlider(false);
  startAutoSlide();
});

/* START */
updateSlider(false);
startAutoSlide();

/* ANNOUNCEMENT BAR */
const announceSlider = document.getElementById("announcementSlider");
const announceItems = document.querySelectorAll(".announcement-item");
const announceNext = document.getElementById("announceNext");
const announcePrev = document.getElementById("announcePrev");

let announceIndex = 0;
let announceAuto = null;

function updateAnnouncement() {
  if (!announceSlider || !announceItems.length) return;
  announceSlider.style.transform = `translateX(-${announceIndex * 100}%)`;
}

function stopAnnouncementAuto() {
  clearInterval(announceAuto);
  announceAuto = null;
}

function startAnnouncementAuto() {
  stopAnnouncementAuto();

  announceAuto = setInterval(() => {
    announceIndex++;

    if (announceIndex >= announceItems.length) {
      announceIndex = 0;
    }

    updateAnnouncement();
  }, 4000);
}

if (announceNext) {
  announceNext.addEventListener("click", () => {
    announceIndex++;

    if (announceIndex >= announceItems.length) {
      announceIndex = 0;
    }

    updateAnnouncement();
  });
}

if (announcePrev) {
  announcePrev.addEventListener("click", () => {
    announceIndex--;

    if (announceIndex < 0) {
      announceIndex = announceItems.length - 1;
    }

    updateAnnouncement();
  });
}

const announcementBar = document.querySelector(".announcement-bar");

if (announcementBar) {
  announcementBar.addEventListener("mouseenter", stopAnnouncementAuto);
  announcementBar.addEventListener("mouseleave", startAnnouncementAuto);
}

startAnnouncementAuto();