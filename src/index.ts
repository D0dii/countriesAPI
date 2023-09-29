import { Fetcher } from "./modules/api";
import { Information } from "./modules/api";

const openDropdown = document.querySelector(".open-dropdown") as HTMLElement;
const dropdown = document.querySelector(".dropdown") as HTMLElement;
const filterByRegion = document.querySelector(".filter-by-region") as HTMLElement;
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
        displayCountries();
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

async function displayCountries(search?: string) {
  const countriesDiv = document.querySelector(".container") as HTMLElement;
  countriesDiv.innerHTML = ``;

  const data: data = await Fetcher.fetchCountries(search);
  const cardDiv = document.querySelector(".container");
  if (data.length === 0) {
    const info = document.createElement("info");
    info.innerText = "No matches found";
    cardDiv?.appendChild(info);
  } else {
    data.forEach((element) => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
      <div>
              <img src="${element.flags.png}" alt="flag of ${element.name.common}" class="card-image" />
            </div>
            <div class="card-info">
              <h3>${element.name.common}</h3>
              <div class="card-info-details">
                <span>Population: ${addCommasToNumber(element.population)}</span>
                <span>Region: ${element.region}</span>
                <span>Capital: ${element.capital[0]}</span>
              </div>
            </div>
      `;
      cardDiv?.appendChild(card);
    });
  }
}

function addCommasToNumber(number: number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

async function searchForCountry(e: any) {
  e.preventDefault();
  displayCountries(searchInput.value);
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
      displayCountries();
      break;
  }
}

init();
