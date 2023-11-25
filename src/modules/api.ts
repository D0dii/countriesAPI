export class Fetcher {
  private static async fetchData(endpoint: string): Promise<fetchDataReturn | null> {
    const response = await fetch(`https://restcountries.com/v3.1/${endpoint}`);
    if (response.ok !== true) {
      return null;
    }
    const data = await response.json();
    return data;
  }

  static async fetchCountries(): Promise<allCountriesData | null> {
    let data: allCountriesData | null;
    const params = new URLSearchParams(window.location.search);
    const search = params.get("search");
    const region = params.get("region");
    if (region) {
      data = await this.fetchData(`region/${region}?fields=id,name,population,region,capital,flags`);
    } else {
      data = await this.fetchData(`all?fields=id,name,population,region,capital,flags,code`);
    }
    if (search) {
      if (data) {
        data = data.filter((item) => item.name.common.toLowerCase().includes(search?.toLowerCase()));
      }
    }
    return data;
  }

  static async fetchCountry(): Promise<countryDetailsData | null> {
    let data: countryDetailsData | null;
    const params = new URLSearchParams(window.location.search);
    const name = params.get("name");
    if (name) {
      data = await this.fetchData(`name/${name}?fullText=true`);
      return data;
    }
    return null;
  }
}
