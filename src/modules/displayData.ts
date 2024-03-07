import { Fetcher } from "./api";

export class Displayer {
  static async displayCountries() {
    const countriesDiv = document.querySelector(".container") as HTMLElement;
    countriesDiv.innerHTML = ``;
    document.querySelector(".loader")?.classList.remove("hidden");
    const data: allCountriesData | null = await Fetcher.fetchCountries();
    document.querySelector(".loader")?.classList.add("hidden");
    const cardDiv = document.querySelector(".container");
    if (!data) {
      const countriesWrapper = document.querySelector(".countries-wrapper") as HTMLElement;
      const info = document.createElement("h1");
      info.innerText = "An error occured";
      info.style.textAlign = "center";
      countriesWrapper.appendChild(info);
    } else {
      if (data.length === 0) {
        const countriesWrapper = document.querySelector(".countries-wrapper") as HTMLElement;
        const info = document.createElement("h1");
        info.innerText = "No matches found";
        info.style.textAlign = "center";
        countriesWrapper.appendChild(info);
      } else {
        data.forEach((element) => {
          const card = document.createElement("div");
          card.classList.add("card");
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
    document.querySelector(".loader")?.classList.remove("hidden");
    const data: countryDetailsData | null = await Fetcher.fetchCountry();
    document.querySelector(".loader")?.classList.add("hidden");
    if (!data) {
      const main = document.querySelector("main") as HTMLElement;
      const info = document.createElement("h1");
      info.innerText = "An error occured";
      info.style.textAlign = "center";
      main.appendChild(info);
    } else {
      const element = data[0];

      const borderCountriesData = await Fetcher.fetchData("alpha?codes=" + element.borders);

      const countryImage = document.querySelector('[data-role="country-img"]') as HTMLImageElement;
      countryImage.src = element.flags.svg;
      countryImage.alt = element.flags.alt ? element.flags.alt : `Flag of ${element.name.common}`;

      const countryName = document.querySelector('[data-role="country-name"]') as HTMLElement;
      countryName.textContent = element.name.common;

      const nativeCountryName = document.querySelector('[data-role="country-native-name"]') as HTMLElement;
      nativeCountryName.textContent = (Object as any).values(element.name.nativeName)[0].official;

      const countryPopulation = document.querySelector('[data-role="country-population"]') as HTMLElement;
      countryPopulation.textContent = this.addCommasToNumber(element.population);

      const countryRegion = document.querySelector('[data-role="country-region"]') as HTMLElement;
      countryRegion.textContent = element.region;

      const countrySubRegion = document.querySelector('[data-role="country-sub-region"]') as HTMLElement;
      countrySubRegion.textContent = element.subregion;

      const countryCapital = document.querySelector('[data-role="country-capital"]') as HTMLElement;
      element.capital.forEach((capital) => {
        countryCapital.textContent += capital;
        if (element.capital[element.capital.length - 1] !== capital) {
          countryCapital.textContent += ", ";
        }
      });

      const countryTopLevelDomain = document.querySelector(
        '[data-role="country-top-level-domain"]'
      ) as HTMLElement;
      countryTopLevelDomain.textContent = element.tld;

      const countryCurrencies = document.querySelector('[data-role="country-currencies"]') as HTMLElement;
      let countryCurrenciesArray = (Object as any).values(element.currencies);
      countryCurrenciesArray.forEach((currency: any) => {
        countryCurrencies.textContent += currency.name;
        if (currency.name !== countryCurrenciesArray[countryCurrenciesArray.length - 1].name) {
          countryCurrencies.textContent += ", ";
        }
      });

      const countryLanguages = document.querySelector('[data-role="country-languages"]') as HTMLElement;
      let countryLanguagesArray = (Object as any).values(element.languages);
      countryLanguagesArray.forEach((language: string) => {
        if (countryLanguages.textContent) {
          countryLanguages.textContent = countryLanguages.textContent + language;
        } else {
          countryLanguages.textContent = language;
        }
        if (countryLanguagesArray[countryLanguagesArray.length - 1] !== language) {
          countryLanguages.textContent += ", ";
        }
      });

      const countryBorderCountries = document.querySelector('[data-role="country-border-countries"]');
      if (borderCountriesData) {
        borderCountriesData.forEach((border) => {
          const borderCountry = document.createElement("a");
          borderCountry.classList.add("border-country");
          borderCountry.textContent = border.name.common;
          borderCountry.href = `details.html?name=${border.name.common}`;
          countryBorderCountries?.appendChild(borderCountry);
        });
      }
    }
  }

  static addCommasToNumber(number: number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
}
