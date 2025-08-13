import { z } from 'zod';

export const countryCreationFormInputSchema = z.object({
  code: z.string().min(2, 'Country code must be at least 2 characters'),
  name: z.string().min(1, 'Country name is required'),
  capital: z.string().min(1, 'Capital city is required'),
  emoji: z.string().min(1, 'Emoji is required'),
  currency: z.string().min(1, 'Currency is required'),
  languages: z
    .string()
    .min(1, 'At least one language is required')
    .refine((val) => /^[a-zA-Z\s,]+$/.test(val), {
      message:
        'Languages must only contain letters and commas (no digits or special characters)',
    })
    .refine(
      (val) =>
        val
          .split(',')
          .map((v) => v.trim())
          .every((v) => v.length > 0),
      {
        message:
          'Languages must be comma separated and cannot have empty parts',
      }
    ),
});
