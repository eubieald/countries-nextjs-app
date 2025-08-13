'use server';

import { genericRequest } from '@/lib/generic-actions';
import { COUNTRIES_LIST_QUERY } from './countries.constants';
import { CountryListResponseType } from './countries.types';

export const getCountriesList = async () => {
  const path = `https://countries.trevorblades.com`;
  const response = await genericRequest({
    overridePath: true,
    path: path,
    method: 'POST',
    options: {
      body: JSON.stringify({ query: COUNTRIES_LIST_QUERY }),
    },
  });

  const data: CountryListResponseType = await response.json();
  return data;
};
