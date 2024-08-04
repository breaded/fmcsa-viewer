import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '../services/api';
import CarrierDataGrid from './CarrierDataGrid';
import { TablePagination } from '@mui/material';

const CarrierList: React.FC = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filters, setFilters] = useState<{ [key: string]: string }>({});

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['carriers', page, rowsPerPage, filters],
    queryFn: async () => {
      const { data } = await api.get('/data', {
        params: {
          page: page + 1,
          limit: rowsPerPage,
          filters: JSON.stringify(filters),
        },
      });
      return data;
    },
  });

  useEffect(() => {
    refetch();
  }, [filters, page, rowsPerPage, refetch]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data.</div>;

  const PageChangeHandler = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const RowsPerPageHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleFilterChange = (columnId: string, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [columnId]: value,
    }));
  };

  return (
    <div>
      <CarrierDataGrid
        data={data.data}
        onFilterChange={handleFilterChange}
      />
      <TablePagination
        rowsPerPageOptions={[10, 25, 50, 100]}
        component="div"
        count={data.total}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={PageChangeHandler}
        onRowsPerPageChange={RowsPerPageHandler}
      />
    </div>
  );
};

export default CarrierList;
