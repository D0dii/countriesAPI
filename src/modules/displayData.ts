import { Fetcher } from "./api";

export class Displayer {
  static async displayCountries() {
    const countriesDiv = document.querySelector(".container") as HTMLElement;
    countriesDiv.innerHTML = ``;
    const data: allCountriesData | null = await Fetcher.fetchCountries();
    const cardDiv = document.querySelector(".container");
    if (!data) {
      const main = document.querySelector("main") as HTMLElement;
      const info = document.createElement("h1");
      info.innerText = "An error occured";
      info.style.textAlign = "center";
      main.appendChild(info);
    } else {
      if (data.length === 0) {
        const main = document.querySelector("main") as HTMLElement;
        const info = document.createElement("h1");
        info.innerText = "No matches found";
        info.style.textAlign = "center";
        main.appendChild(info);
      } else {
        data.forEach((element) => {
          const card = document.createElement("div");
          card.classList.add("card");
          if (localStorage.getItem("theme")) {
            localStorage.getItem("theme") === "dark" ? card.classList.add("dark") : "";
          }
          card.innerHTML = `
        <a href="details.html?name=${element.name.official}">
            <div>
                    <img src="${element.flags.png}" alt="${element.flags.alt}" class="card-image" />
                  </div>
                  <div class="card-info">
                    <h3>${element.name.common}</h3>
                    <div class="card-info-details">
                      <span>Population: ${Displayer.addCommasToNumber(element.population)}</span>
                      <span>Region: ${element.region}</span>
                      <span>Capital: ${element.capital[0]}</span>
                    </div>
                  </div>
                  </a>
            `;
          cardDiv?.appendChild(card);
        });
      }
    }
  }

  static async displayCountryDetails() {
    const data: countryDetailsData | null = await Fetcher.fetchCountry();
    console.log(data);
    const countryDetailsDiv = document.querySelector(".country-details") as HTMLElement;
    if (!data) {
      const main = document.querySelector("main") as HTMLElement;
      const info = document.createElement("h1");
      info.innerText = "An error occured";
      info.style.textAlign = "center";
      main.appendChild(info);
    } else {
      data.forEach((element) => {
        const img = document.createElement("img");
        img.classList.add("country-details-img");
        img.src = element.flags.svg;
        img.alt = `flag of ${element.flags.alt}`;

        const infoDiv = document.createElement("div");

        const countryName = document.createElement("h1");
        countryName.innerText = element.name.common;
        infoDiv.appendChild(countryName);

        const mainInfoDiv = document.createElement("div");
        mainInfoDiv.innerHTML = `<div><span class="bold">Native Name: </span><span>${
          (Object as any).values(element.name.nativeName)[0].official
        }</span></div>
        <div><span class="bold">Population: </span><span>${this.addCommasToNumber(
          element.population
        )}</span></div>
        <div><span class="bold">Region: </span><span>${element.region}</span></div>
        <div><span class="bold">Sub Region: </span><span>${element.subregion}</span></div>
        <div><span class="bold">Capital: </span><span>${element.capital}</span></div>`;
        infoDiv.appendChild(mainInfoDiv);

        const currenciesDiv = document.createElement("div");

        const currenciesCaption = document.createElement("span");
        currenciesCaption.classList.add("bold");
        currenciesCaption.innerText = "Currencies: ";
        currenciesDiv.appendChild(currenciesCaption);

        const topLevelDomain = document.createElement("div");
        topLevelDomain.innerHTML = `<div><span class="bold">Top Level Domain: </span><span>${element.tld[0]}</span></div>`;
        infoDiv.appendChild(topLevelDomain);

        const currencies = document.createElement("span");
        (Object as any).values(element.currencies).forEach((c: any) => {
          const currency = document.createElement("span");
          if (c !== (Object as any).values(element.currencies).pop()) {
            currency.innerText = c.name + ", ";
          } else {
            currency.innerText = c.name;
          }
          currencies.appendChild(currency);
        });
        currenciesDiv.appendChild(currencies);
        infoDiv.appendChild(currenciesDiv);

        const languagesDiv = document.createElement("div");

        const languagesCaption = document.createElement("span");
        languagesCaption.classList.add("bold");
        languagesCaption.innerText = "Languages: ";
        languagesDiv.appendChild(languagesCaption);

        const languages = document.createElement("span");
        (Object as any).values(element.languages).forEach((l: any) => {
          const language = document.createElement("span");
          if (l !== (Object as any).values(element.languages).pop()) {
            language.innerText = l + ", ";
          } else {
            language.innerText = l;
          }
          languages.appendChild(language);
        });
        languagesDiv.appendChild(languages);

        const borderCountriesDiv = document.createElement("div");

        const borderCountriesCaption = document.createElement("span");
        borderCountriesCaption.classList.add("bold");
        borderCountriesCaption.innerText = "Border Countries: ";

        borderCountriesDiv.appendChild(borderCountriesCaption);

        const borderCountries = document.createElement("div");
        borderCountries.classList.add("border-countries");
        if (element.borders) {
          (Object as any).values(element.borders).forEach((c: any) => {
            const borderCountry = document.createElement("span");
            borderCountry.innerText = c;
            borderCountry.classList.add("border-country");
            borderCountries.appendChild(borderCountry);
          });
        } else {
          borderCountriesCaption.innerText += "None";
        }

        borderCountriesDiv.appendChild(borderCountriesCaption);
        borderCountriesDiv.appendChild(borderCountries);
        countryDetailsDiv.appendChild(img);
        countryDetailsDiv.appendChild(infoDiv);
        countryDetailsDiv.appendChild(languagesDiv);
        countryDetailsDiv.appendChild(borderCountriesDiv);
      });
    }
  }

  static addCommasToNumber(number: number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
}
