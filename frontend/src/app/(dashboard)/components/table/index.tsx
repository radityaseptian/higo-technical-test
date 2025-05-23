'use client'

import * as React from 'react'
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

import { DataTablePagination } from './pagination'
import { DataTableToolbar } from './toolbar'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  count: number
}

const initHideColumns = ['No Telp', 'Location Type', 'Brand Device']

export function DataTable<TData, TValue>({ columns, data, count }: DataTableProps<TData, TValue>) {
  const [tableData, setTableData] = React.useState<TData[]>(data)
  const [pagination, setPagination] = React.useState({ pageIndex: 0, pageSize: 10 })
  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>(
    Object.fromEntries(initHideColumns.map((col) => [col, false]))
  )
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [sorting, setSorting] = React.useState<SortingState>([])

  console.log(pagination)

  const table = useReactTable({
    data: tableData,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    manualPagination: true,
    pageCount: Math.ceil(count / pagination.pageSize),
    enableRowSelection: true,
    onPaginationChange: setPagination,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  const fetchData = async (pageIndex: number, pageSize: number, signal: AbortSignal) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/summary?page=${pageIndex}&limit=${pageSize}`, {
        signal,
      })

      if (!response.ok) {
        throw new Error('Failed Get Data')
      }

      const result = await response.json()

      setTableData(result.data)
    } catch (error) {
      console.error(error)
    }
  }

  React.useEffect(() => {
    const controller = new AbortController()

    fetchData(pagination.pageIndex + 1, pagination.pageSize, controller.signal)

    return () => {
      controller.abort()
    }
  }, [pagination.pageIndex, pagination.pageSize])

  console.log('row', table.getRowModel().rows)

  return (
    <div className='space-y-4'>
      <DataTableToolbar table={table} />
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className='h-24 text-center'>
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  )
}
