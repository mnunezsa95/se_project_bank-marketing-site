"use strict";
import {
  modal,
  overlay,
  btnCloseModal,
  btnsOpenModal,
  btnScrollTo,
  section1,
  nav,
  nav__links,
  tabs,
  tabsContainer,
  tabsContent,
  header,
  allSections,
  imgTargets,
  slides,
  btnSliderRight,
  btnSliderLeft,
  dotsContainer,
} from "./constants.js";

/* ---------------------------------------------------------------------------------------------- */
/*                                            Functions                                           */
/* ---------------------------------------------------------------------------------------------- */

const openModal = function (evt) {
  evt.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn) => {
  btn.addEventListener("click", openModal);
});

// function for handling hover
const handleHover = function (evt) {
  if (evt.target.classList.contains("nav__link") || evt.target.classList.contains("logo")) {
    const link = evt.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");
    siblings.forEach((siblingEl) => {
      if (siblingEl !== link) {
        siblingEl.style.opacity = this;
      }
      logo.style.opacity = this;
    });
  }
};

// Sticky navigation
const navHeight = nav.getBoundingClientRect().height;
const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
};

const headerObsOptions = {
  root: null,
  threshold: [0],
  rootMargin: `-${navHeight}px`,
};

const headerObserver = new IntersectionObserver(stickyNav, headerObsOptions);
headerObserver.observe(header);

// Revealing elements on scroll
const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const sectionObsOptions = {
  root: null,
  threshold: 0.15,
};

const sectionObserver = new IntersectionObserver(revealSection, sectionObsOptions);
allSections.forEach((section) => {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

// Lazy loading images
const loadImage = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener("load", () => {
    entry.target.classList.remove("lazy-img");
  });
  observer.unobserve(entry.target);
};

const imageObsOptions = {
  root: null,
  threshold: 0,
  rootMargin: `${navHeight}px`,
};

const imgObserver = new IntersectionObserver(loadImage, imageObsOptions);
imgTargets.forEach((img) => imgObserver.observe(img));

// Slider
let currentSlide = 0;
const maxNumberSlides = slides.length - 1;

const createDots = () => {
  slides.forEach((_, i) => {
    dotsContainer.insertAdjacentHTML("beforeend", `<button class="dots__dot" data-slide="${i}"></button>`);
  });
};

const activateDot = (slide) => {
  document.querySelectorAll(".dots__dot").forEach((dot) => {
    dot.classList.remove("dots__dot--active");
  });
  document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add("dots__dot--active");
};

const goToSlide = (slide) => {
  slides.forEach((s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`));
};

const nextSlide = () => {
  if (currentSlide === maxNumberSlides) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }
  goToSlide(currentSlide);
  activateDot(currentSlide);
};

const prevSlide = () => {
  if (currentSlide === 0) {
    currentSlide = maxNumberSlides;
  } else {
    currentSlide--;
  }
  goToSlide(currentSlide);
  activateDot(currentSlide);
};

goToSlide(0);

const init = () => {
  goToSlide(0);
  createDots();
  activateDot(0);
};

init();

/* ---------------------------------------------------------------------------------------------- */
/*                                         Event Handlers                                         */
/* ---------------------------------------------------------------------------------------------- */

// Modal listeners
btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

// Page navigation listeners
nav__links.addEventListener("click", function (evt) {
  // Matching strategy (ensuring it will ONLY work when an actual nav__link element is clicked)
  if (evt.target.classList.contains("nav__link")) {
    evt.preventDefault();
    const id = evt.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

// Smooth scrolling listeners
btnScrollTo.addEventListener("click", function (e) {
  section1.scrollIntoView({ behavior: "smooth" });
});

// Tabbed component listeners
tabsContainer.addEventListener("click", function (evt) {
  const clicked = evt.target.closest(".operations__tab");
  if (!clicked) return; // guard clause
  tabs.forEach((tab) => tab.classList.remove("operations__tab--active")); // removing active tab
  tabsContent.forEach((tabsContent) => tabsContent.classList.remove("operations__content--active"));
  clicked.classList.add("operations__tab--active");
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add("operations__content--active");
});

// nav bar listeners
nav.addEventListener("mouseover", handleHover.bind(0.5));
nav.addEventListener("mouseout", handleHover.bind(1));

// slider listeners
btnSliderRight.addEventListener("click", nextSlide);
btnSliderLeft.addEventListener("click", prevSlide);

document.addEventListener("keydown", function (evt) {
  evt.key === "ArrowLeft" && prevSlide();
  evt.key === "ArrowRight" && nextSlide();
});

dotsContainer.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("dots__dot")) {
    const { slide } = evt.target.dataset;
    goToSlide(slide);
    activateDot(slide);
  }
});
