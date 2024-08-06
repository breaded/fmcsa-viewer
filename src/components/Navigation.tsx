import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@mui/material';

const Navigation: React.FC = () => (
  <AppBar position="static">
    <Toolbar>
      <Button color="inherit" component={Link} to="/">Home</Button>
      <Button color="inherit" component={Link} to="/pivot-table">Pivot Table</Button>
    </Toolbar>
  </AppBar>
);

export default Navigation;
