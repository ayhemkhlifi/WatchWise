import React from 'react';
import './index.css';
import Navbar from './components/Navbar';

import SignUp from './pages/signup/SignUp';
import LogIn from './pages/login/LogIn';
import Main from './components/Main';
import Categorie from './pages/categorie-page/Categorie';
import MovieDetail from './pages/moviedetaile/MovieDetail';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
   
    <div className="deepspace h-screen">
    
   
    <Navbar/>

      <Routes>
      <Route path="/" element={<Main />}/>
      <Route path="/moviedetail" element={<MovieDetail />} />
      <Route path="/login" element={<LogIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/categorie-page" element={<Categorie />} />
      </Routes>
     
  </div>  
  );
}

export default App;