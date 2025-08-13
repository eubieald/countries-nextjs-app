import { getCountriesList } from '@/components/countries';
import CountriesWrapperClient from '@/components/countries/countries-wrapper.client';

export default async function Page() {
  const [adminCompanyListResponse] = await Promise.all([getCountriesList()]);
  const { data } = adminCompanyListResponse || {};
  const { countries } = data || {};

  return <CountriesWrapperClient initialCountries={countries} />;
}
