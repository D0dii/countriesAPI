import { Displayer } from "./modules/displayData";

const filterByRegion = document.querySelector(".filter-by-region") as HTMLElement;
const openDropdown = document.querySelector(".open-dropdown") as HTMLElement;
const dropdown = document.querySelector(".dropdown") as HTMLElement;
const searchForm = document.querySelector(".search-form") as HTMLElement;
const searchInput = document.querySelector(".search-input") as HTMLInputElement;
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

function toggleMenu() {
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
        params.delete("search");
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
      e.target !== document.querySelector(".dropdown") &&
      e.target !== document.querySelector(".region") &&
      e.target !== document.querySelector(".filter-by-region") &&
      e.target !== document.querySelector(".region-name") &&
      e.target !== document.querySelector(".open-dropdown")
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
  switch (window.location.pathname) {
    case "/":
    case "/index.html":
      dropdown.style.pointerEvents = "none";
      dropdown.addEventListener("click", selectRegion);
      document.addEventListener("click", hideRegion);
      filterByRegion.addEventListener("click", toggleMenu);
      searchForm.addEventListener("submit", searchForCountry);
      closeRegionBtn.addEventListener("click", clearRegion);
      checkIfRegionSelected();
      Displayer.displayCountries();
      break;
    case "/details.html":
      Displayer.displayCountryDetails();
  }
}

init();
