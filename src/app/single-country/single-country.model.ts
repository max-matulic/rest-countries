export interface Country {
  capital: string;
  flag: string;
  independent: boolean;
  name: string;
  population: number;
  region: string;
  nativeName: string;
  subRegion: string;
  topLevelDomain: string[];
  currencies: Currencies[];
  languages: Languages[];
  borders: string[];
}

interface Currencies {
  code: string;
  name: string;
  symbol: string;
}

interface Languages {
  iso639_1: string;
  iso639_2: string;
  name: string;
  nativeName: string;
}
