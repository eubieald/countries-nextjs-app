import z from 'zod';
import { countryCreationFormInputSchema } from './countries-form.schema';

export type FormInput = z.infer<typeof countryCreationFormInputSchema>;
