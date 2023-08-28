"use strict";
import { modal, overlay, btnCloseModal, btnsOpenModal, btnScrollTo, section1, nav, tabs, tabsContainer, tabsContent } from "./constants.js";

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

// Page Navigation w/ Event Delegation
document.querySelector(".nav__links").addEventListener("click", function (evt) {
  // Matching strategy (ensuring it will ONLY work when an actual nav__link element is clicked)
  if (evt.target.classList.contains("nav__link")) {
    evt.preventDefault();
    const id = evt.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

// Scrolling
btnScrollTo.addEventListener("click", function (e) {
  section1.scrollIntoView({ behavior: "smooth" });
});
