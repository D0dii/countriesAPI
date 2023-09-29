export class Fetcher {
  private static async fetchData(endpoint: string): Promise<data> {
    const response = await fetch(`https://restcountries.com/v3.1/${endpoint}`);
    const data = await response.json();
    return data;
  }

  static async fetchCountries(search?: string): Promise<data> {
    let data: data;
    if (Information.region !== "") {
      data = await this.fetchData(
        `region/${Information.region}?fields=id,name,population,region,capital,flags`
      );
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

export class Information {
  static search: string = "";
  static region: string = "";
}
