export class Fetcher {
  private static async fetchData(endpoint: string): Promise<fetchDataReturn> {
    const response = await fetch(`https://restcountries.com/v3.1/${endpoint}`);
    const data = await response.json();
    return data;
  }

  static async fetchCountries(): Promise<allCountriesData> {
    let data: allCountriesData;
    const params = new URLSearchParams(window.location.search);
    const search = params.get("search");
    const region = params.get("region");
    if (region) {
      data = await this.fetchData(`region/${region}?fields=id,name,population,region,capital,flags`);
    } else {
      data = await this.fetchData(`all?fields=id,name,population,region,capital,flags`);
    }
    if (search) {
      data = data.filter((item) => item.name.common.toLowerCase().includes(search?.toLowerCase()));
    }
    return data;
  }

  static async fetchCountry(): Promise<countryDetailsData | null> {
    let data: countryDetailsData;
    const params = new URLSearchParams(window.location.search);
    const name = params.get("name");
    if (name) {
      data = await this.fetchData(
        `name/${name}?fields=id,name,population,region,capital,flags,subregion,topLevelDomain,currencies,languages,borders`
      );
      return data;
    }
    return null;
  }
}
