'use client'

import { ColumnDef } from '@tanstack/react-table'

import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'

import { labels, priorities, statuses } from './data/data'
import { Task } from './data/schema'
import { DataTableColumnHeader } from './column-header'
import { DataTableRowActions } from './row-actions'

// export type Task = {
//   _id: string
//   Number: number
//   Name: string
//   Age: number
//   gender: 'Female' | 'Male'
//   Email: string
//   Date: string
//   'Location Type': string
//   'No Telp': string
//   'Brand Device': string
//   'Digital Interest': string
//   'Name of Location': string
//   'Login Hour': string
// }

export const columns: ColumnDef<Task>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
        className='translate-y-[2px]'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
        className='translate-y-[2px]'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'Name',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Name' />,
    cell: ({ row }) => <div className='w-[100px] overflow-ellipsis'>{row.getValue('Name')}</div>,
    enableHiding: false,
  },
  {
    accessorKey: 'Email',
    enableHiding: false,
    header: ({ column }) => <DataTableColumnHeader column={column} title='Email' />,
    cell: ({ row }) => {
      // const label = labels.find((label) => label.value === row.original.Email)

      return (
        <div className='flex space-x-2'>
          {/* {label && <Badge variant='outline'>{label.label}</Badge>} */}
          <span className='max-w-[500px] truncate font-medium'>{row.getValue('Email')}</span>
        </div>
      )
    },
  },
  {
    accessorKey: 'Age',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Age' />,
    cell: ({ row }) => {
      // const status = statuses.find((status) => status.value === row.getValue('Login Hour'))

      // if (!status) {
      //   return null
      // }

      return (
        <div className='flex w-[50px] items-center'>
          {/* {status.icon && <status.icon className='mr-2 h-4 w-4 text-muted-foreground' />} */}
          <span>{row.getValue('Age')}</span>
        </div>
      )
    },
    enableSorting: false,
    enableHiding: true,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'Name of Location',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Name of Location' />,
    cell: ({ row }) => {
      // const status = statuses.find((status) => status.value === row.getValue('Login Hour'))

      // if (!status) {
      //   return null
      // }

      return (
        <div className='flex w-[100px] items-center'>
          {/* {status.icon && <status.icon className='mr-2 h-4 w-4 text-muted-foreground' />} */}
          <span>{row.getValue('Name of Location')}</span>
        </div>
      )
    },
    enableSorting: false,
    enableHiding: true,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'Login Hour',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Login Hour' />,
    cell: ({ row }) => {
      // const status = statuses.find((status) => status.value === row.getValue('Login Hour'))

      // if (!status) {
      //   return null
      // }

      return (
        <div className='flex w-[50px] items-center'>
          {/* {status.icon && <status.icon className='mr-2 h-4 w-4 text-muted-foreground' />} */}
          <span>{row.getValue('Login Hour')}</span>
        </div>
      )
    },
    enableSorting: false,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },

  {
    accessorKey: 'Digital Interest',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Digital Interest' />,
    cell: ({ row }) => {
      // const priority = priorities.find((priority) => priority.value === row.getValue('Digital Interest'))

      // if (!priority) {
      //   return null
      // }

      return (
        <div className='flex items-center'>
          {/* {priority.icon && <priority.icon className='mr-2 h-4 w-4 text-muted-foreground' />} */}
          <span>{row.getValue('Digital Interest')}</span>
        </div>
      )
    },
    enableSorting: false,
    enableHiding: true,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'No Telp',
    header: ({ column }) => <DataTableColumnHeader column={column} title='No Telp' />,
    cell: ({ row }) => {
      // const priority = priorities.find((priority) => priority.value === row.getValue('Digital Interest'))

      // if (!priority) {
      //   return null
      // }

      return (
        <div className='flex items-center'>
          {/* {priority.icon && <priority.icon className='mr-2 h-4 w-4 text-muted-foreground' />} */}
          <span>{row.getValue('No Telp')}</span>
        </div>
      )
    },
    enableSorting: false,
    enableHiding: true,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'Location Type',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Location Type' />,
    cell: ({ row }) => {
      // const priority = priorities.find((priority) => priority.value === row.getValue('Digital Interest'))

      // if (!priority) {
      //   return null
      // }

      return (
        <div className='flex items-center'>
          {/* {priority.icon && <priority.icon className='mr-2 h-4 w-4 text-muted-foreground' />} */}
          <span>{row.getValue('Location Type')}</span>
        </div>
      )
    },
    enableSorting: false,
    enableHiding: true,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'Brand Device',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Brand Device' />,
    cell: ({ row }) => {
      // const priority = priorities.find((priority) => priority.value === row.getValue('Digital Interest'))

      // if (!priority) {
      //   return null
      // }

      return (
        <div className='flex items-center'>
          {/* {priority.icon && <priority.icon className='mr-2 h-4 w-4 text-muted-foreground' />} */}
          <span>{row.getValue('Brand Device')}</span>
        </div>
      )
    },
    enableSorting: false,
    enableHiding: true,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
