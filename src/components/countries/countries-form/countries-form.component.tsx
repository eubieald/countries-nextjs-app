'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { GenericProps } from '@/lib/types';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { countryCreationFormInputSchema } from './countries-form.schema';
import { GenericInput } from '@/components/form';
import { useForm } from 'react-hook-form';
import { FormInput } from './countries-form.types';
import { useCountriesForm } from './use-countries-form';

export const CountriesForm = ({ className }: GenericProps) => {
  const form = useForm<FormInput>({
    mode: 'onBlur',
    resolver: zodResolver(countryCreationFormInputSchema),
    defaultValues: {
      code: '',
      name: '',
      capital: '',
      emoji: '',
      currency: '',
      languages: '',
    },
  });

  const { onSubmit, open, setOpen } = useCountriesForm();

  return (
    <div className={cn('', className)}>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Add New Country</Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Country Creation</DialogTitle>
            <DialogDescription>
              Add a new country to the list.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <GenericInput
                formHook={form}
                inputProps={{ name: 'code' }}
                label="Code"
              />
              <GenericInput
                formHook={form}
                inputProps={{ name: 'name' }}
                label="Name"
              />
              <GenericInput
                formHook={form}
                inputProps={{ name: 'capital' }}
                label="Capital"
              />
              <GenericInput
                formHook={form}
                inputProps={{ name: 'emoji' }}
                label="Emoji"
              />
              <GenericInput
                formHook={form}
                inputProps={{ name: 'currency' }}
                label="Currency"
              />
              <GenericInput
                formHook={form}
                inputProps={{ name: 'languages' }}
                label="Languages (comma separated)"
              />

              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline" type="button">
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
