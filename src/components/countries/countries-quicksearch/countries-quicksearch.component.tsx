// DataTableSearch.tsx
'use client';

import { Input } from '@/components/ui/input';
import { CountriesQuickSearchProps } from './countries-quicksearch.types';
import { GenericProps } from '@/lib/types';
import { cn } from '@/lib/utils';

export function CountriesQuickSearch({
  value,
  onChange,
  className,
}: CountriesQuickSearchProps & GenericProps) {
  return (
    <div className={cn('flex items-center', className)}>
      <Input
        placeholder="Filter..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="max-w-sm"
      />
    </div>
  );
}
