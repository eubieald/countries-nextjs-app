'use client';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { useState } from 'react';
import { CountriesQuickSearch } from '../countries-quicksearch/countries-quicksearch.component';
import { Column, ColumnItem } from '@/components/common';
import { CountriesForm } from '../countries-form';
import { useCountryStore } from '../countries.store';
import { CountryDataType } from '../countries.types';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
}

export function CountriesTable<TValue>({
  columns,
}: DataTableProps<CountryDataType, TValue>) {
  const [globalFilter, setGlobalFilter] = useState('');
  const countries = useCountryStore((state) => state.countries);

  const table = useReactTable({
    data: countries,
    columns,
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: (row, columnId, filterValue) => {
      const value = row.getValue(columnId);
      if (typeof value === 'string') {
        return value.toLowerCase().includes(filterValue.toLowerCase());
      }
      if (Array.isArray(value)) {
        return value
          .map((v) => (typeof v === 'string' ? v : JSON.stringify(v)))
          .join(' ')
          .toLowerCase()
          .includes(filterValue.toLowerCase());
      }
      return String(value).toLowerCase().includes(filterValue.toLowerCase());
    },
  });

  return (
    <Column className="overflow-x-auto rounded-md border scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
      <ColumnItem className="flex flex-row justify-between items-center gap-4 m-10">
        <CountriesQuickSearch
          value={globalFilter}
          onChange={setGlobalFilter}
          className="w-full"
        />
        <CountriesForm />
      </ColumnItem>
      <ColumnItem className="m-5">
        <Table className="table-fixed w-full">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </ColumnItem>
    </Column>
  );
}
