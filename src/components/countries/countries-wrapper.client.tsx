'use client';

import { useEffect } from 'react';
import { useCountryStore } from './countries.store';
import { CountriesTable, columns } from './countries-table';
import { CountryDataType } from './countries.types';
import { Spinner } from '../spinner';

const CountriesWrapperClient = ({
  initialCountries,
}: {
  initialCountries: CountryDataType[];
}) => {
  const setCountries = useCountryStore((state) => state.setCountries);
  const countriesStore = useCountryStore((state) => state.countries);
  const hasHydrated = useCountryStore((state) => state.hasHydrated);

  useEffect(() => {
    if (hasHydrated && initialCountries.length && countriesStore.length === 0) {
      setCountries(initialCountries);
    }
  }, [hasHydrated, initialCountries, countriesStore.length, setCountries]);

  if (!hasHydrated) {
    return <Spinner />;
  }

  return <CountriesTable columns={columns} />;
};

export default CountriesWrapperClient;
