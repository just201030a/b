/* ============================ */
/* CATEGORY SLIDER */
/* ============================ */

const slider = document.getElementById("categoriesSlider");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const cards = document.querySelectorAll(".category-card");

let currentIndex = 0;

function getCardsPerView() {

  if (window.innerWidth <= 600) {
    return 1;
  }

  if (window.innerWidth <= 900) {
    return 2;
  }

  return 3;
}

function updateSlider() {

  if (!slider || !cards.length) return;

  const cardWidth = cards[0].offsetWidth;
  const gap = 18;
  const maxIndex = cards.length - getCardsPerView();

  if (currentIndex < 0) {
    currentIndex = 0;
  }

  if (currentIndex > maxIndex) {
    currentIndex = maxIndex;
  }

  slider.style.transform =
    `translateX(-${currentIndex * (cardWidth + gap)}px)`;
}

if (nextBtn) {
  nextBtn.addEventListener("click", () => {
    currentIndex++;
    updateSlider();
  });
}

if (prevBtn) {
  prevBtn.addEventListener("click", () => {
    currentIndex--;
    updateSlider();
  });
}

window.addEventListener("resize", updateSlider);

updateSlider();



/* ============================ */
/* ANNOUNCEMENT BAR SLIDER */
/* ============================ */

const announceSlider = document.getElementById("announcementSlider");
const announceItems = document.querySelectorAll(".announcement-item");
const announceNext = document.getElementById("announceNext");
const announcePrev = document.getElementById("announcePrev");

let announceIndex = 0;
let announceAuto;

function updateAnnouncement(){

  if(!announceSlider) return;

  announceSlider.style.transform =
  `translateX(-${announceIndex * 100}%)`;

}

if(announceNext){
announceNext.addEventListener("click",()=>{

announceIndex++;

if(announceIndex >= announceItems.length){
announceIndex = 0;
}

updateAnnouncement();

});
}

if(announcePrev){
announcePrev.addEventListener("click",()=>{

announceIndex--;

if(announceIndex < 0){
announceIndex = announceItems.length - 1;
}

updateAnnouncement();

});
}

function startAnnouncementAuto(){

announceAuto = setInterval(()=>{

announceIndex++;

if(announceIndex >= announceItems.length){
announceIndex = 0;
}

updateAnnouncement();

},4000);

}

const announcementBar = document.querySelector(".announcement-bar");

if(announcementBar){

announcementBar.addEventListener("mouseenter",()=>{
clearInterval(announceAuto);
});

announcementBar.addEventListener("mouseleave",()=>{
startAnnouncementAuto();
});

}

startAnnouncementAuto();



/* ============================ */
/* MOBILE + DESKTOP MENUS */
/* ============================ */

const hamburger = document.querySelector(".menu-icon");
const megaMenu = document.querySelector(".mega-menu");

const mobileMenu = document.querySelector(".mobile-menu");
const mobileOverlay = document.querySelector(".mobile-overlay");
const closeMenuBtn = document.getElementById("closeMenuBtn");



/* ============================ */
/* DESKTOP MEGA MENU HELPERS */
/* ============================ */

function closeDesktopMegaMenu(){

if(megaMenu) megaMenu.classList.remove("active");

if(hamburger && window.innerWidth > 768){
hamburger.classList.remove("active");
}

}



/* ============================ */
/* MOBILE MENU HELPERS */
/* ============================ */

function openMobileMenu(){

if(!mobileMenu || !mobileOverlay) return;

mobileMenu.classList.add("active");
mobileOverlay.classList.add("active");

if(hamburger){
hamburger.classList.add("active");
}

document.body.classList.add("menu-open");

}

function closeMobileMenu(){

if(mobileMenu){
mobileMenu.classList.remove("active");
}

if(mobileOverlay){
mobileOverlay.classList.remove("active");
}

if(hamburger && window.innerWidth <= 768){
hamburger.classList.remove("active");
}

document.body.classList.remove("menu-open");

}



/* ============================ */
/* DESKTOP MEGA MENU */
/* ============================ */

if(hamburger && megaMenu){

hamburger.addEventListener("click",(e)=>{

if(window.innerWidth <= 768) return;

e.stopPropagation();

megaMenu.classList.toggle("active");
hamburger.classList.toggle("active");

});

megaMenu.addEventListener("click",(e)=>{

if(window.innerWidth <= 768) return;
e.stopPropagation();

});

document.addEventListener("click",()=>{

if(window.innerWidth <= 768) return;

closeDesktopMegaMenu();

});

}



/* ============================ */
/* MOBILE MENU OPEN */
/* ============================ */

if(hamburger && mobileMenu){

hamburger.addEventListener("click",(e)=>{

if(window.innerWidth > 768) return;

e.stopPropagation();

if(mobileMenu.classList.contains("active")){
closeMobileMenu();
}else{
openMobileMenu();
}

});

mobileMenu.addEventListener("click",(e)=>{
e.stopPropagation();
});

}



/* ============================ */
/* MOBILE OVERLAY CLOSE */
/* ============================ */

if(mobileOverlay){
mobileOverlay.addEventListener("click",closeMobileMenu);
}



/* ============================ */
/* CLOSE BUTTON */
/* ============================ */

if(closeMenuBtn){
closeMenuBtn.addEventListener("click",closeMobileMenu);
}



/* ============================ */
/* BRANDS COMBO BOX */
/* ============================ */

const comboToggle = document.querySelector(".combo-toggle");

if(comboToggle){

comboToggle.addEventListener("click",function(){

const parent = this.closest(".mobile-menu-group");
parent.classList.toggle("active");

});

}



/* ============================ */
/* FIND US */
/* ============================ */

const findusToggle = document.querySelector(".findus-toggle");
const findusMenu = document.querySelector(".findus-submenu");

if(findusToggle){

findusToggle.addEventListener("click",function(e){

e.preventDefault();
findusMenu.classList.toggle("active");

});

}