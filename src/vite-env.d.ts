/// <reference types="vite/client" />

type allCountriesDataItem = {
  capital: string[];
  flags: countryFlag;
  name: countryName;
  population: number;
  region: string;
};

type countryFlag = {
  png: string;
  svg: string;
  alt: string;
};
type countryName = {
  common: string;
  official: string;
  nativeName: any;
};

type allCountriesData = allCountriesDataItem[];

type countryDetailsData = countryDetailsDataItem[];

type countryDetailsDataItem = allCountriesDataItem & {
  subregion: string;
  tld: string;
  currencies: string[];
  languages: string[];
  borders: string[];
};

type fetchDataReturn = allCountriesData & countryDetailsData;

type errorInAPI = {
  message: string;
  status: string;
};
