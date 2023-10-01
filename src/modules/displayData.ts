import { Fetcher } from "./api";

export class Displayer {
  static async displayCountries() {
    const countriesDiv = document.querySelector(".container") as HTMLElement;
    countriesDiv.innerHTML = ``;
    const data: data = await Fetcher.fetchCountries();
    const cardDiv = document.querySelector(".container");
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
            <div>
                    <img src="${element.flags.png}" alt="flag of ${element.name.common}" class="card-image" />
                  </div>
                  <div class="card-info">
                    <h3>${element.name.common}</h3>
                    <div class="card-info-details">
                      <span>Population: ${Displayer.addCommasToNumber(element.population)}</span>
                      <span>Region: ${element.region}</span>
                      <span>Capital: ${element.capital[0]}</span>
                    </div>
                  </div>
            `;
        cardDiv?.appendChild(card);
      });
    }
  }

  static addCommasToNumber(number: number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
}
