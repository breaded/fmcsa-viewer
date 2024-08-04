import React from 'react';
import { createColumnHelper, ColumnDef } from '@tanstack/react-table';
import { Datagrid } from './Datagrid';
import { Carrier } from '../utils/types';
import ViewDetailsButton from './ViewDetailsButton';

const columnHelper = createColumnHelper<Carrier>();

export const columns: ColumnDef<Carrier, any>[] = [
  columnHelper.accessor('created_dt', {
    header: () => 'Created Date',
    cell: (info) => new Date(info.getValue()).toLocaleDateString(),
    enableSorting: true,
  }),
  columnHelper.accessor('data_source_modified_dt', {
    header: () => 'Modified Date',
    cell: (info) => new Date(info.getValue()).toLocaleDateString(),
    enableSorting: true,
  }),
  columnHelper.accessor('entity_type', {
    header: () => 'Entity Type',
    cell: (info) => info.getValue(),
    enableSorting: true,
  }),
  columnHelper.accessor('operating_status', {
    header: () => 'Operating Status',
    cell: (info) => info.getValue(),
    enableSorting: true,
  }),
  columnHelper.accessor('legal_name', {
    header: () => 'Legal Name',
    cell: (info) => info.getValue(),
    enableSorting: true,
  }),
  columnHelper.accessor('dba_name', {
    header: () => 'DBA Name',
    cell: (info) => info.getValue(),
    enableSorting: true,
  }),
  columnHelper.accessor('physical_address', {
    header: () => 'Physical Address',
    cell: (info) => info.getValue(),
    enableSorting: true,
  }),
  columnHelper.accessor('phone', {
    header: () => 'Phone',
    cell: (info) => info.getValue(),
    enableSorting: true,
  }),
  columnHelper.accessor('usdot_number', {
    header: () => 'USDOT Number',
    cell: (info) => info.getValue(),
    enableSorting: true,
  }),
  columnHelper.accessor('mc_mx_ff_number', {
    header: () => 'MC/MX/FF Number',
    cell: (info) => info.getValue(),
    enableSorting: true,
  }),
  columnHelper.accessor('power_units', {
    header: () => 'Power Units',
    cell: (info) => info.getValue(),
    enableSorting: true,
  }),
  columnHelper.accessor('out_of_service_date', {
    header: () => 'Out of Service Date',
    cell: (info) => info.getValue() ? new Date(info.getValue()).toLocaleDateString() : 'N/A',
    enableSorting: true,
  }),
  columnHelper.accessor('_id', {
    header: 'Actions',
    cell: (info) => <ViewDetailsButton _id={info.getValue()} />,
  }),
];

interface CarrierDataGridProps {
  data: Carrier[];
  onFilterChange: (columnId: string, value: string) => void;
}

const CarrierDataGrid: React.FC<CarrierDataGridProps> = ({ data, onFilterChange }) => (
  <Datagrid data={data} columns={columns} onFilterChange={onFilterChange} />
);

export default CarrierDataGrid;

// import React from 'react';
// import { createColumnHelper, ColumnDef } from '@tanstack/react-table';
// import { Datagrid } from './Datagrid';
// import { Carrier } from '../utils/types';
// import ViewDetailsButton from './ViewDetailsButton';

// const columnHelper = createColumnHelper<Carrier>();

// export const columns: ColumnDef<Carrier, any>[] = [
//   columnHelper.accessor('created_dt', {
//     header: () => 'Created Date',
//     cell: (info) => new Date(info.getValue()).toLocaleDateString(),
//     enableSorting: true,
//   }),
//   columnHelper.accessor('data_source_modified_dt', {
//     header: () => 'Modified Date',
//     cell: (info) => new Date(info.getValue()).toLocaleDateString(),
//     enableSorting: true,
//   }),
//   columnHelper.accessor('entity_type', {
//     header: () => 'Entity Type',
//     cell: (info) => info.getValue(),
//     enableSorting: true,
//   }),
//   columnHelper.accessor('operating_status', {
//     header: () => 'Operating Status',
//     cell: (info) => info.getValue(),
//     enableSorting: true,
//   }),
//   columnHelper.accessor('legal_name', {
//     header: () => 'Legal Name',
//     cell: (info) => info.getValue(),
//     enableSorting: true,
//   }),
//   columnHelper.accessor('dba_name', {
//     header: () => 'DBA Name',
//     cell: (info) => info.getValue(),
//     enableSorting: true,
//   }),
//   columnHelper.accessor('physical_address', {
//     header: () => 'Physical Address',
//     cell: (info) => info.getValue(),
//     enableSorting: true,
//   }),
//   columnHelper.accessor('phone', {
//     header: () => 'Phone',
//     cell: (info) => info.getValue(),
//     enableSorting: true,
//   }),
//   columnHelper.accessor('usdot_number', {
//     header: () => 'USDOT Number',
//     cell: (info) => info.getValue(),
//     enableSorting: true,
//   }),
//   columnHelper.accessor('mc_mx_ff_number', {
//     header: () => 'MC/MX/FF Number',
//     cell: (info) => info.getValue(),
//     enableSorting: true,
//   }),
//   columnHelper.accessor('power_units', {
//     header: () => 'Power Units',
//     cell: (info) => info.getValue(),
//     enableSorting: true,
//   }),
//   columnHelper.accessor('out_of_service_date', {
//     header: () => 'Out of Service Date',
//     cell: (info) => info.getValue() ? new Date(info.getValue()).toLocaleDateString() : 'N/A',
//     enableSorting: true,
//   }),
//   columnHelper.accessor('_id', {
//     header: 'Actions',
//     cell: (info) => <ViewDetailsButton _id={info.getValue()} />,
//   }),
// ];

// interface CarrierDataGridProps {
//   data: Carrier[];
//   onFilterChange: (columnId: string, value: string) => void;
// }

// const CarrierDataGrid: React.FC<CarrierDataGridProps> = ({ data, onFilterChange }) => (
//   <Datagrid data={data} columns={columns} onFilterChange={onFilterChange} />
// );

// export default CarrierDataGrid;
