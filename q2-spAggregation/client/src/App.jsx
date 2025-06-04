import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StockPage from './pages/StockPage.jsx';
import CorrelationHeatmapPage from './pages/CorrelationPage.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StockPage />} />
        <Route path="/correlation" element={<CorrelationHeatmapPage />} />
      </Routes>
    </Router>
  );
}

export default App;