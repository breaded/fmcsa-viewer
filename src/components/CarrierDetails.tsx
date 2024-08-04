import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import api from '../services/api'; // Ensure correct path
import { Carrier } from '../utils/types';

const useStyles = makeStyles({
  container: {
    fontFamily: 'Arial, sans-serif',
    fontSize: '12px',
    border: '1px solid #b0c4de',
    width: '80%',
    margin: '20px auto',
    padding: '16px',
    backgroundColor: '#f9f9f9',
  },
  section: {
    border: '1px solid #b0c4de',
    marginBottom: '16px',
    padding: '8px',
  },
  title: {
    backgroundColor: '#e0e0e0',
    padding: '4px',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    borderBottom: '1px solid #b0c4de',
    padding: '4px 0',
  },
  label: {
    fontWeight: 'bold',
    width: '50%',
  },
  value: {
    width: '50%',
  },
});

const CarrierDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [carrier, setCarrier] = useState<Carrier | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const classes = useStyles();

  useEffect(() => {
    const fetchCarrierDetails = async (id: string) => {
      try {
        const response = await api.get(`/data/${id}`);
        setCarrier(response.data);
      } catch (err) {
        setError('Failed to fetch carrier details');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCarrierDetails(id);
    }
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!carrier) return <div>No carrier details found.</div>;

  return (
    <div className={classes.container}>
      <div className={classes.section}>
        <div className={classes.title}>USDOT INFORMATION</div>
        <div className={classes.row}>
          <span className={classes.label}>USDOT Number:</span>
          <span className={classes.value}>{carrier.usdot_number}</span>
        </div>
        <div className={classes.row}>
          <span className={classes.label}>Entity Type:</span>
          <span className={classes.value}>{carrier.entity_type}</span>
        </div>
        <div className={classes.row}>
          <span className={classes.label}>Operating Status:</span>
          <span className={classes.value}>{carrier.operating_status}</span>
        </div>
        <div className={classes.row}>
          <span className={classes.label}>Out of Service Date:</span>
          <span className={classes.value}>{carrier.out_of_service_date ? new Date(carrier.out_of_service_date).toLocaleDateString() : 'None'}</span>
        </div>
        <div className={classes.row}>
          <span className={classes.label}>MC/MX/FF Number(s):</span>
          <span className={classes.value}>{carrier.mc_mx_ff_number}</span>
        </div>
      </div>

      <div className={classes.section}>
        <div className={classes.title}>COMPANY INFORMATION</div>
        <div className={classes.row}>
          <span className={classes.label}>Legal Name:</span>
          <span className={classes.value}>{carrier.legal_name}</span>
        </div>
        <div className={classes.row}>
          <span className={classes.label}>DBA Name:</span>
          <span className={classes.value}>{carrier.dba_name}</span>
        </div>
        <div className={classes.row}>
          <span className={classes.label}>Physical Address:</span>
          <span className={classes.value}>{carrier.physical_address}</span>
        </div>
        <div className={classes.row}>
          <span className={classes.label}>Phone:</span>
          <span className={classes.value}>{carrier.phone}</span>
        </div>
        <div className={classes.row}>
          <span className={classes.label}>Power Units:</span>
          <span className={classes.value}>{carrier.power_units}</span>
        </div>
      </div>
    </div>
  );
};

export default CarrierDetails;
