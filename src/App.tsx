import React from 'react';
import './styles.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import CarrierList from './components/CarrierList';
import CarrierDetails from './components/CarrierDetails'; 

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<CarrierList />} />
            <Route path="/carrier-details/:id" element={<CarrierDetails />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
