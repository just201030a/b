const slider = document.getElementById("categoriesSlider");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const cards = document.querySelectorAll(".category-card");

let currentIndex = 0;
let autoSlide;

function getCardsPerView() {
  if (window.innerWidth <= 600) return 1;
  if (window.innerWidth <= 900) return 2;
  return 3;
}

function updateSlider() {

  const cardWidth = cards[0].offsetWidth;
  const gap = 18;

  slider.style.transition = "transform 0.45s ease";

  slider.style.transform =
    `translateX(-${currentIndex * (cardWidth + gap)}px)`;

}

/* NEXT BUTTON */
nextBtn.addEventListener("click", () => {

  const maxIndex = cards.length - getCardsPerView();

  currentIndex++;

  if (currentIndex > maxIndex) {
    currentIndex = 0;
  }

  updateSlider();

});

/* PREV BUTTON */
prevBtn.addEventListener("click", () => {

  const maxIndex = cards.length - getCardsPerView();

  currentIndex--;

  if (currentIndex < 0) {
    currentIndex = maxIndex;
  }

  updateSlider();

});

/* AUTO SLIDE (REFY style) */

function startAutoSlide(){

  autoSlide = setInterval(() => {

    const maxIndex = cards.length - getCardsPerView();

    currentIndex++;

    if(currentIndex > maxIndex){
      currentIndex = 0;
    }

    updateSlider();

  },4000);

}

/* Pause when hover */

slider.addEventListener("mouseenter",()=>{
  clearInterval(autoSlide);
});

slider.addEventListener("mouseleave",()=>{
  startAutoSlide();
});

/* Responsive fix */

window.addEventListener("resize",()=>{
  currentIndex = 0;
  updateSlider();
});

/* Start */

updateSlider();
startAutoSlide();

/* ANNOUNCEMENT BAR SLIDER */

const announceSlider = document.getElementById("announcementSlider");
const announceItems = document.querySelectorAll(".announcement-item");
const announceNext = document.getElementById("announceNext");
const announcePrev = document.getElementById("announcePrev");

let announceIndex = 0;
let announceAuto;

function updateAnnouncement(){
announceSlider.style.transform =
`translateX(-${announceIndex * 100}%)`;
}

announceNext.addEventListener("click",()=>{
announceIndex++;

if(announceIndex >= announceItems.length){
announceIndex = 0;
}

updateAnnouncement();
});

announcePrev.addEventListener("click",()=>{
announceIndex--;

if(announceIndex < 0){
announceIndex = announceItems.length - 1;
}

updateAnnouncement();
});

function startAnnouncementAuto(){

announceAuto = setInterval(()=>{

announceIndex++;

if(announceIndex >= announceItems.length){
announceIndex = 0;
}

updateAnnouncement();

},4000);

}

document.querySelector(".announcement-bar").addEventListener("mouseenter",()=>{
clearInterval(announceAuto);
});

document.querySelector(".announcement-bar").addEventListener("mouseleave",()=>{
startAnnouncementAuto();
});

startAnnouncementAuto();