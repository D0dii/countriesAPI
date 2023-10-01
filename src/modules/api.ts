export class Fetcher {
  private static async fetchData(endpoint: string): Promise<data> {
    const response = await fetch(`https://restcountries.com/v3.1/${endpoint}`);
    const data = await response.json();
    return data;
  }

  static async fetchCountries(): Promise<data> {
    let data: data;
    const params = new URLSearchParams(window.location.search);
    const search = params.get("search");
    const region = params.get("region");
    console.log(search);
    console.log(region);
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

  static async fetchCountry(id: string) {}
}
