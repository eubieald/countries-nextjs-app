'use client';

import { useState } from 'react';
import { useCountryStore } from '../countries.store';
import { FormInput } from './countries-form.types';

export const useCountriesForm = () => {
  const [open, setOpen] = useState(false);
  const addCountry = useCountryStore((state) => state.addCountry);

  const onSubmit = (data: FormInput) => {
    const languagesArray = data.languages
      .split(',')
      .map((lang) => lang.trim())
      .filter(Boolean)
      .map((name) => ({ name }));

    const finalData = {
      ...data,
      languages: languagesArray,
    };

    addCountry(finalData);
    setOpen(false);
  };

  return { onSubmit, open, setOpen };
};
