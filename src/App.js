import React from 'react';
import Home from './pages/Home';
import About from './pages/About';import './App.css';
import FXConverter from './pages/FXConverter';
import HistoricalFXRates from './pages/HistoricalFXRates';
import Login from './pages/Login';
import Register from './components/Register';
import { Route, Routes } from 'react-router-dom';
import './index.css';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";


function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/about' element={<About/>} />
      <Route path='/fxconverter' element={<FXConverter/>} />
      <Route path='/historicalfxrates' element={<HistoricalFXRates/>} />
      <Route path='/form' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
    </Routes>
    </>
  )
}

export default App;

