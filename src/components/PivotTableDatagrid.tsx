import React, { useEffect, useState } from 'react';
import { Carrier } from '../utils/types';
import { ColumnDef } from '@tanstack/react-table';
import { Datagrid } from './Datagrid';
import {
  Container,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Box,
  CircularProgress,
} from '@mui/material';

interface PivotTableDatagridProps {
  data: { data: Carrier[]; total: number }; // Adjusted type to reflect the nested structure
}

interface PivotData {
  id: string;
  category: string;
  count: number;
  sumPowerUnits?: number;
}

// Create a type for the keys of Carrier that can be used as categories
type CarrierCategory = 'entity_type' | 'operating_status' | 'created_dt' | 'data_source_modified_dt' | 'power_units';

const PivotTableDatagrid: React.FC<PivotTableDatagridProps> = ({ data }) => {
  const [pivotData, setPivotData] = useState<PivotData[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<CarrierCategory>('entity_type');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const carriers = data.data; // Access the actual data array

    if (!Array.isArray(carriers)) {
      console.error('Data is not an array:', carriers);
      return;
    }

    setLoading(true);

    const aggregation: Record<string, { count: number; sumPowerUnits?: number }> = {};

    carriers.forEach((item) => {
      let category: string;

      if (selectedCategory === 'created_dt' || selectedCategory === 'data_source_modified_dt') {
        const dateValue = item[selectedCategory];
        if (typeof dateValue === 'string' || typeof dateValue === 'number') {
          const date = new Date(dateValue);
          category = `${date.getFullYear()}-${date.getMonth() + 1}`; // e.g., "2024-8"
        } else {
          console.error(`Invalid date value for ${selectedCategory}:`, dateValue);
          category = 'Invalid Date';
        }
      } else {
        category = String(item[selectedCategory]); // Convert to string to avoid type issues
      }

      if (!aggregation[category]) {
        aggregation[category] = { count: 0 };
        if (selectedCategory === 'power_units') {
          aggregation[category].sumPowerUnits = 0;
        }
      }
      aggregation[category].count++;
      if (selectedCategory === 'power_units' && item.power_units !== undefined) {
        aggregation[category].sumPowerUnits = (aggregation[category].sumPowerUnits || 0) + item.power_units;
      }
    });

    const result = Object.keys(aggregation).map((key, index) => ({
      id: String(index),
      category: key,
      count: aggregation[key].count,
      sumPowerUnits: aggregation[key].sumPowerUnits,
    }));

    setPivotData(result);
    setLoading(false);
  }, [data, selectedCategory]);

  const columns: ColumnDef<PivotData, any>[] = [
    {
      accessorKey: 'category',
      header: () => 'Category',
    },
    {
      accessorKey: 'count',
      header: () => 'Count',
    },
    {
      accessorKey: 'sumPowerUnits',
      header: () => 'Sum of Power Units',
      enableColumnFilter: false, // Disable filtering for sum column if needed
    },
  ];

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 4 }}>
        <Typography variant="h6" gutterBottom>
          Pivot Table
        </Typography>
        <FormControl fullWidth margin="normal">
          <InputLabel>Select Category</InputLabel>
          <Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as CarrierCategory)}
            label="Select Category"
          >
            <MenuItem value="entity_type">Entity Type</MenuItem>
            <MenuItem value="operating_status">Operating Status</MenuItem>
            <MenuItem value="created_dt">Created Date</MenuItem>
            <MenuItem value="data_source_modified_dt">Modified Date</MenuItem>
            <MenuItem value="power_units">Power Units</MenuItem>
          </Select>
        </FormControl>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
            <CircularProgress />
          </Box>
        ) : (
          <Box mt={2}>
            <Datagrid columns={columns} data={pivotData} onFilterChange={() => {}} />
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default PivotTableDatagrid;

