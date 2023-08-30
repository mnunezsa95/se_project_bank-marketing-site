const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
const nav = document.querySelector(".nav");
const nav__links = document.querySelector(".nav__links");
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");
const header = document.querySelector(".header");
const allSections = document.querySelectorAll(".section");
const imgTargets = document.querySelectorAll("img[data-src]");
const slides = document.querySelectorAll(".slide");
const btnSliderRight = document.querySelector(".slider__btn--right");
const btnSliderLeft = document.querySelector(".slider__btn--left");
const dotsContainer = document.querySelector(".dots");

export {
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
};
