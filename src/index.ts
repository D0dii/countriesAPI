import { Information } from "./modules/api";
import { Displayer } from "./modules/displayData";

let mode = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

const openDropdown = document.querySelector(".open-dropdown") as HTMLElement;
const dropdown = document.querySelector(".dropdown") as HTMLElement;
const searchForm = document.querySelector(".search-form") as HTMLElement;
const searchInput = document.querySelector(".search-input") as HTMLInputElement;
const changeMode = document.querySelector(".mode-change") as HTMLElement;

function toggleTheme() {
  console.log(mode);
  const body = document.querySelector("body") as HTMLElement;
  const navbar = document.querySelector(".navbar") as HTMLElement;
  const filterByRegion = document.querySelector(".filter-by-region") as HTMLElement;
  const searchBar = document.querySelector(".search-bar") as HTMLElement;
  const cards = document.querySelectorAll(".card") as NodeListOf<HTMLElement>;
  if (mode === "dark") {
    mode = "light";
    body.style.backgroundColor = "#202C36";
    body.style.color = "#FFFFFF";
    searchInput.style.color = "#FFFFFF";
  } else {
    mode = "dark";
    body.style.backgroundColor = "#FAFAFA";
    body.style.color = "#000000";
    searchInput.style.color = "#000000";
  }
  navbar.classList.toggle("dark");
  filterByRegion.classList.toggle("dark");
  dropdown.classList.toggle("dark");
  searchBar.classList.toggle("dark");
  cards.forEach((card) => {
    card.classList.toggle("dark");
  });
}

function toggleMenu() {
  if (dropdown?.style.opacity === "0") {
    dropdown.style.opacity = "1";
    openDropdown.innerText = "expand_less";
  } else {
    dropdown.style.opacity = "0";
    openDropdown.innerText = "expand_more";
  }
}

function selectRegion(e: MouseEvent) {
  if (e.target instanceof Element) {
    if (e.target.classList.contains("region")) {
      const regionName = document.querySelector(".region-name") as HTMLElement;
      if (e.target.textContent) {
        regionName.innerText = e.target.textContent;
        dropdown.style.opacity = "0";
        openDropdown.innerText = "expand_more";
        Information.region = e.target.textContent;
        Displayer.displayCountries();
      }
    }
  }
}

function clearRegion(e: MouseEvent) {
  if (e.target instanceof Element) {
    if (
      !e.target.classList.contains("open-dropdown") &&
      !e.target.classList.contains("dropdown") &&
      !e.target.classList.contains("region")
    ) {
      dropdown.style.opacity = "0";
      openDropdown.innerText = "expand_more";
    }
  }
}

function searchForCountry(e: any) {
  e.preventDefault();
  Displayer.displayCountries(searchInput.value);
  searchInput.value = "";
}

function init() {
  switch (window.location.pathname) {
    case "/":
    case "/index.html":
      openDropdown.addEventListener("click", toggleMenu);
      dropdown.addEventListener("click", selectRegion);
      document.addEventListener("click", clearRegion);
      searchForm.addEventListener("submit", searchForCountry);
      changeMode.addEventListener("click", toggleTheme);
      Displayer.displayCountries();
      break;
  }
}

init();
