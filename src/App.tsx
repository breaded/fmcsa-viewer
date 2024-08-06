import React, { useEffect, useState } from 'react';
import './styles.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import CarrierList from './components/CarrierList';
import CarrierDetails from './components/CarrierDetails'; 
import PivotTableList from './components/PivotTableList'; 
import Navigation from './components/Navigation';
import api from './services/api'; 
import { Carrier } from './utils/types'; 

const App: React.FC = () => {
  const [data, setData] = useState<{ data: Carrier[]; total: number }>({ data: [], total: 0 });

  useEffect(() => {
    // Fetch data from the backend
    api.get<{ data: Carrier[]; total: number }>('/data')
      .then(response => setData(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navigation />
        <div className="App">
          <Routes>
            <Route path="/" element={<CarrierList />} />
            <Route path="/carrier-details/:id" element={<CarrierDetails />} />
            <Route path="/pivot-table" element={<PivotTableList data={data} />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;




// import React from 'react';
// import './styles.css';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
// import { ThemeProvider } from '@mui/material/styles';
// import theme from './theme';
// import CarrierList from './components/CarrierList';
// import CarrierDetails from './components/CarrierDetails'; 

// const App: React.FC = () => {
//   return (
//     <ThemeProvider theme={theme}>
//       <Router>
//         <div className="App">
//           <Routes>
//             <Route path="/" element={<CarrierList />} />
//             <Route path="/carrier-details/:id" element={<CarrierDetails />} />
//           </Routes>
//         </div>
//       </Router>
//     </ThemeProvider>
//   );
// };

// export default App;
