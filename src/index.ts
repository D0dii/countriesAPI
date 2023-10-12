import { Displayer } from "./modules/displayData";

let mode: string;

const openDropdown = document.querySelector(".open-dropdown") as HTMLElement;
const dropdown = document.querySelector(".dropdown") as HTMLElement;
const searchForm = document.querySelector(".search-form") as HTMLElement;
const searchInput = document.querySelector(".search-input") as HTMLInputElement;
const changeMode = document.querySelector(".mode-change") as HTMLElement;
const regionSpan = document.querySelector(".region-name") as HTMLElement;
const closeRegionBtn = document.querySelector(".close-btn") as HTMLElement;

function checkIfRegionSelected() {
  const region = new URLSearchParams(window.location.search).get("region");
  if (region && regionSpan) {
    regionSpan.innerText = region;
    closeRegionBtn ? (closeRegionBtn.style.display = "inline-block") : "";
    return;
  }
  closeRegionBtn ? (closeRegionBtn.style.display = "none") : "";
}

function clearRegion() {
  const params = new URLSearchParams(window.location.search);
  params.delete("region");
  window.location.search = params.toString();
}

function initTheme() {
  let localStorageMode = localStorage.getItem("theme");
  if (localStorageMode) {
    mode = localStorageMode;
  } else {
    mode = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  if (mode === "dark") {
    toggleTheme();
    mode = "dark";
    localStorage.setItem("theme", mode);
    const modeIcon = document.querySelector(".mode-icon") as HTMLElement;
    const modeCaption = document.querySelector(".mode-caption") as HTMLElement;
    modeIcon.innerText = "light_mode";
    modeCaption.innerText = "Light Mode";
  }
}

function toggleTheme() {
  const body = document.querySelector("body") as HTMLElement;
  const navbar = document.querySelector(".navbar") as HTMLElement;
  const filterByRegion = document.querySelector(".filter-by-region") as HTMLElement;
  const searchBar = document.querySelector(".search-bar") as HTMLElement;
  const cards = document.querySelectorAll(".card") as NodeListOf<HTMLElement>;
  const modeIcon = document.querySelector(".mode-icon") as HTMLElement;
  const modeCaption = document.querySelector(".mode-caption") as HTMLElement;
  if (mode === "dark") {
    mode = "light";
    modeIcon.innerText = "dark_mode";
    modeCaption.innerText = "Dark Mode";
  } else {
    mode = "dark";
    modeIcon.innerText = "light_mode";
    modeCaption.innerText = "Light Mode";
  }
  localStorage.setItem("theme", mode);
  body.classList.toggle("dark");
  navbar.classList.toggle("dark");
  filterByRegion.classList.toggle("dark");
  dropdown.classList.toggle("dark");
  searchBar.classList.toggle("dark");
  searchInput.classList.toggle("dark");
  cards.forEach((card) => {
    card.classList.toggle("dark");
  });
}

function toggleMenu() {
  console.log(dropdown?.style.opacity);
  if (dropdown?.style.opacity == "0" || dropdown.style.opacity == "") {
    dropdown.style.opacity = "1";
    dropdown.style.pointerEvents = "all";
    openDropdown.innerText = "expand_less";
  } else {
    dropdown.style.opacity = "0";
    dropdown.style.pointerEvents = "none";
    openDropdown.innerText = "expand_more";
  }
}

function selectRegion(e: MouseEvent) {
  if (e.target instanceof Element) {
    if (e.target.classList.contains("region")) {
      if (e.target.textContent) {
        const params = new URLSearchParams(window.location.search);
        params.set("region", e.target.textContent);
        window.location.search = params.toString();
        Displayer.displayCountries();
      }
    }
  }
}

function hideRegion(e: MouseEvent) {
  if (e.target instanceof Element) {
    if (
      !e.target.classList.contains("open-dropdown") &&
      !e.target.classList.contains("dropdown") &&
      !e.target.classList.contains("region")
    ) {
      dropdown.style.opacity = "0";
      dropdown.style.pointerEvents = "none";
      openDropdown.innerText = "expand_more";
    }
  }
}

function searchForCountry(e: any) {
  e.preventDefault();
  Displayer.displayCountries();
  const params = new URLSearchParams(window.location.search);
  params.set("search", searchInput.value);
  window.location.search = params.toString();
  searchInput.value = "";
}

function init() {
  initTheme();
  changeMode.addEventListener("click", toggleTheme);
  switch (window.location.pathname) {
    case "/":
    case "/index.html":
      dropdown.style.pointerEvents = "none";
      openDropdown.addEventListener("click", toggleMenu);
      dropdown.addEventListener("click", selectRegion);
      document.addEventListener("click", hideRegion);
      searchForm.addEventListener("submit", searchForCountry);
      closeRegionBtn.addEventListener("click", clearRegion);
      checkIfRegionSelected();
      Displayer.displayCountries();
      break;
    case "/details.html":
  }
}

init();
