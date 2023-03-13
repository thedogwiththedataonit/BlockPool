import React from 'react';
import Homepage from './components/Homepage';
import { Routes, Route, useLocation } from "react-router-dom";
import WelcomePage from './components/WelcomePage';

function App() {
  return ( 
    <Routes>
      <Route path="/home" element={<Homepage />} />
      <Route path="/" element={<WelcomePage />} />
    </Routes>
    
  );
}

export default App;
