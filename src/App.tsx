import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Providers } from './Providers';
import SonicYieldCalculator from './components/yield-calculator/SonicYieldCalculator';

function App() {
  return (
    <div className="App">
      <Providers>
        <SonicYieldCalculator />
      </Providers>
    </div>
  );
}

export default App;
