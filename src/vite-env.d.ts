/// <reference types="vite/client" />

type dataItem = {
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

type data = dataItem[];
