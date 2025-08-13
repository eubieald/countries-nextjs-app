'use client';

import { ColumnDef } from '@tanstack/react-table';
import { CountryDataType } from '../countries.types';

export const columns: ColumnDef<CountryDataType>[] = [
  {
    accessorKey: 'code',
    header: 'Code',
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => (
      <span className="whitespace-pre-line">{row.original.name}</span>
    ),
  },
  {
    accessorKey: 'capital',
    header: 'Capital',
    cell: ({ row }) => (
      <span className="whitespace-pre-line">{row.original.capital}</span>
    ),
  },
  {
    accessorKey: 'emoji',
    header: 'Flag',
  },
  {
    accessorKey: 'languages',
    accessorFn: (row) => {
      if (!row.languages) return '';
      return row.languages
        .map((lang: { name: string }) => lang?.name)
        .join(' ');
    },
    header: 'Languages',
    cell: ({ row }) => {
      const langs = row.original.languages;
      if (!langs) return '-';
      return (
        <span className="whitespace-pre-line">
          {langs.map((lang: { name: string }) => lang.name).join('\n')}
        </span>
      );
    },
  },
  {
    accessorKey: 'currency',
    header: 'Currency',
    cell: ({ row }) => row.original.currency,
  },
];
