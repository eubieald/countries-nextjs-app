export type CountryListResponseType = {
  data: CountryListDataType;
};

export type CountryListDataType = {
  countries: CountryDataType[];
};

export type CountryDataType = {
  code: string;
  name: string;
  capital: string;
  emoji: string;
  languages: { name: string }[];
  currency: string;
};
