
import React, { useState, useMemo } from 'react';
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnFiltersState,
} from '@tanstack/react-table';
import {
  Card,
  CardContent,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  Button,
} from '@mui/material';
import ArrowDropUpRoundedIcon from '@mui/icons-material/ArrowDropUpRounded';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import useStyles from './styles'; 
export const Datagrid = <RecordType extends { id: string | number }>({
  columns,
  data,
  onFilterChange,
}: {
  columns: ColumnDef<RecordType, any>[];
  data: RecordType[];
  onFilterChange: (columnId: string, value: string) => void;
}) => {
  const classes = useStyles(); 

  const [sort, setSort] = useState({ field: '', order: 'ASC' });
  const [filters, setFilters] = useState<ColumnFiltersState>([]);
  const [tempFilters, setTempFilters] = useState<{ [key: string]: string }>({});

  const sorting = useMemo<SortingState>(
    () => [
      {
        id: sort.field,
        desc: sort.order === 'DESC',
      },
    ],
    [sort]
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      sorting,
      columnFilters: filters,
    },
    manualSorting: true,
    onSortingChange: (updater) => {
      const newSortingState =
        typeof updater === 'function' ? updater(sorting) : updater;
      const sortBy = newSortingState[0];
      setSort({
        field: sortBy.id,
        order: sortBy.desc ? 'DESC' : 'ASC',
      });
    },
    onColumnFiltersChange: (newFilters) => {
      setFilters(newFilters);
    },
  });

  const handleFilterChange = (columnId: string, value: string) => {
    setTempFilters((oldFilters) => ({
      ...oldFilters,
      [columnId]: value,
    }));
  };

  const handleFilterSubmit = (columnId: string) => {
    onFilterChange(columnId, tempFilters[columnId] || '');
  };

  return (
    <Card className={classes.tableContainer}>
      <CardContent>
        <Table className={classes.table} size="small">
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableCell key={header.id}>
                    {header.isPlaceholder ? null : header.column.getCanSort() ? (
                      <Button
                        className={classes.tableSortButton}
                        onClick={header.column.getToggleSortingHandler()}
                        endIcon={
                          {
                            asc: <ArrowDropUpRoundedIcon className={classes.tableSortIcon} />,
                            desc: <ArrowDropDownRoundedIcon className={classes.tableSortIcon} />,
                          }[header.column.getIsSorted() as string] ?? null
                        }
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </Button>
                    ) : (
                      flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )
                    )}
                    <TextField
                      className={classes.tableFilterInput}
                      variant="standard"
                      placeholder={`Filter ${header.column.id}`}
                      value={tempFilters[header.column.id] || ''}
                      onChange={(e) =>
                        handleFilterChange(header.column.id, e.target.value)
                      }
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleFilterSubmit(header.column.id);
                        }
                      }}
                      fullWidth
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
