import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CountryDataType } from './countries.types';

type CountriesState = {
  countries: CountryDataType[];
  setCountries: (data: CountryDataType[]) => void;
  addCountry: (data: CountryDataType) => void;
  hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
};

export const useCountryStore = create<CountriesState>()(
  persist(
    (set) => ({
      countries: [],
      setCountries: (data) => set({ countries: data }),
      addCountry: (data) =>
        set((state) => ({ countries: [data, ...state.countries] })),
      hasHydrated: false,
      setHasHydrated: (state) => set({ hasHydrated: state }),
    }),
    {
      name: 'countries-store',
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
