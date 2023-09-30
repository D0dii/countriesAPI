import { Information } from "./modules/api";
import { Displayer } from "./modules/displayData";

const openDropdown = document.querySelector(".open-dropdown") as HTMLElement;
const dropdown = document.querySelector(".dropdown") as HTMLElement;
const searchForm = document.querySelector(".search-form") as HTMLElement;
const searchInput = document.querySelector(".search-input") as HTMLInputElement;

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

async function searchForCountry(e: any) {
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
      Displayer.displayCountries();
      break;
  }
}

init();
