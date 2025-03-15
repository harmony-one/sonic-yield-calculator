import React from 'react';
import './App.css';
import { Providers } from './Providers';
import SonicYieldCalculator from './components/yield-calculator/SonicYieldCalculator';
import Header from './components/header/Header';
import { Route, Routes } from 'react-router';
import Positions from './components/positions/Positions';

function App() {
  return (
    <div className="App">
      <Providers>
        <Header />
        <Routes>
          <Route path="/" element={<SonicYieldCalculator />} />
          <Route path="positions" element={<Positions />} />
        </Routes>
      </Providers>
    </div>
  );
}

export default App;
