import React from 'react';
import { useNavigate} from 'react-router-dom';
import { Button } from '@mui/material';

interface ViewDetailsButtonProps {
  _id: string | number;
}

const ViewDetailsButton: React.FC<ViewDetailsButtonProps> = ({ _id }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/carrier-details/${_id}`); 
  };
  console.log("id check:", _id)

  return (
    <Button variant="contained" color="primary" onClick={handleClick}>
      View
    </Button>
  );
};

export default ViewDetailsButton;
