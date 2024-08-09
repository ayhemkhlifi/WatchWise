import React from 'react';
import './index.css';
import Navbar from './components/Navbar';

import SignUp from './pages/signup/SignUp';
import LogIn from './pages/login/LogIn';
import Main from './components/Main';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
   
    <div className="deepspace h-screen">
    
    <Navbar />

    
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<LogIn />} />
      <Route path="/signup" element={<SignUp />} />
      
    </Routes>
  </div>
    
  );
}

export default App;