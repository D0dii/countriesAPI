import { Fetcher } from "./api";

export class Displayer {
  static async displayCountries(search?: string) {
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
