import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { styled, Box, Typography } from '@mui/material';
import api from '../services/api'; // Ensure correct path
import { Carrier } from '../utils/types';

// Define styled components using MUI's styled utility
const Container = styled(Box)(({ theme }) => ({
  fontFamily: 'Arial, sans-serif',
  fontSize: '12px',
  border: '1px solid #b0c4de',
  width: '80%',
  margin: '20px auto',
  padding: '16px',
  backgroundColor: '#f9f9f9',
}));

const Section = styled(Box)(({ theme }) => ({
  border: '1px solid #b0c4de',
  marginBottom: '16px',
  padding: '8px',
}));

const Title = styled(Typography)(({ theme }) => ({
  backgroundColor: '#e0e0e0',
  padding: '4px',
  fontWeight: 'bold',
  textAlign: 'center',
}));

const Row = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  borderBottom: '1px solid #b0c4de',
  padding: '4px 0',
}));

const Label = styled('span')(({ theme }) => ({
  fontWeight: 'bold',
  width: '50%',
}));

const Value = styled('span')(({ theme }) => ({
  width: '50%',
}));

const CarrierDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [carrier, setCarrier] = useState<Carrier | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
    <Container>
      <Section>
        <Title variant="h6">USDOT INFORMATION</Title>
        <Row>
          <Label>USDOT Number:</Label>
          <Value>{carrier.usdot_number}</Value>
        </Row>
        <Row>
          <Label>Entity Type:</Label>
          <Value>{carrier.entity_type}</Value>
        </Row>
        <Row>
          <Label>Operating Status:</Label>
          <Value>{carrier.operating_status}</Value>
        </Row>
        <Row>
          <Label>Out of Service Date:</Label>
          <Value>{carrier.out_of_service_date ? new Date(carrier.out_of_service_date).toLocaleDateString() : 'None'}</Value>
        </Row>
        <Row>
          <Label>MC/MX/FF Number(s):</Label>
          <Value>{carrier.mc_mx_ff_number}</Value>
        </Row>
      </Section>

      <Section>
        <Title variant="h6">COMPANY INFORMATION</Title>
        <Row>
          <Label>Legal Name:</Label>
          <Value>{carrier.legal_name}</Value>
        </Row>
        <Row>
          <Label>DBA Name:</Label>
          <Value>{carrier.dba_name}</Value>
        </Row>
        <Row>
          <Label>Physical Address:</Label>
          <Value>{carrier.physical_address}</Value>
        </Row>
        <Row>
          <Label>Phone:</Label>
          <Value>{carrier.phone}</Value>
        </Row>
        <Row>
          <Label>Power Units:</Label>
          <Value>{carrier.power_units}</Value>
        </Row>
      </Section>
    </Container>
  );
};

export default CarrierDetails;
