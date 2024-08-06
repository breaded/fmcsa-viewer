import React, { useEffect, useState } from 'react';
import { Carrier } from '../utils/types';
import PivotTableDatagrid from './PivotTableDatagrid';
import { Container, CircularProgress, Box } from '@mui/material';

interface PivotTableListProps {
  data: { data: Carrier[]; total: number }; // Adjusted type to reflect the nested structure
}

const PivotTableList: React.FC<PivotTableListProps> = ({ data }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    const loadData = async () => {
      // Simulate a delay for data fetching
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    };

    loadData();
  }, []);

  return (
    <Container maxWidth="md">
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
          <CircularProgress />
        </Box>
      ) : (
        <PivotTableDatagrid data={data} />
      )}
    </Container>
  );
};

export default PivotTableList;
