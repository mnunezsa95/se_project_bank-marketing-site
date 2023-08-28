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
} from "./constants.js";

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

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

// Page navigation w/ event delegation
nav__links.addEventListener("click", function (evt) {
  // Matching strategy (ensuring it will ONLY work when an actual nav__link element is clicked)
  if (evt.target.classList.contains("nav__link")) {
    evt.preventDefault();
    const id = evt.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

// Smooth scrolling
btnScrollTo.addEventListener("click", function (e) {
  section1.scrollIntoView({ behavior: "smooth" });
});

// Tabbed component
tabsContainer.addEventListener("click", function (evt) {
  const clicked = evt.target.closest(".operations__tab");
  if (!clicked) return; // guard clause
  tabs.forEach((tab) => tab.classList.remove("operations__tab--active")); // removing active tab
  tabsContent.forEach((tabsContent) => tabsContent.classList.remove("operations__content--active"));
  clicked.classList.add("operations__tab--active");
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add("operations__content--active");
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

// Nav menu fade animation
nav.addEventListener("mouseover", handleHover.bind(0.5));
nav.addEventListener("mouseout", handleHover.bind(1));

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

const stickyObsOptions = {
  root: null,
  threshold: [0],
  rootMargin: `-${navHeight}px`,
};

const headerObserver = new IntersectionObserver(stickyNav, stickyObsOptions);
headerObserver.observe(header);

// Revealing elements on scroll
const revealSection = function (entries, observer) {
  const [entry] = entries;
  const checkIntersection = !entry.isIntersecting ? null : entry.target.classList.remove("section--hidden");
  observer.unobserve(checkIntersection.target);
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
