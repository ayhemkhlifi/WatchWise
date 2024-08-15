import React from 'react';
import './index.css';
import Navbar from './components/Navbar';
import { useAuthContext } from './hooks/useAuthContext';
import SignUp from './pages/signup/SignUp';
import LogIn from './pages/login/LogIn';
import Main from './components/Main';
import Categorie from './pages/categorie-page/Categorie';
import MovieDetail from './pages/moviedetaile/MovieDetail';
import Footer from './components/Footer';
import { BrowserRouter as Router, Route, Routes , Navigate } from 'react-router-dom';

function App() {
  const {user} = useAuthContext()
  return (
   
    <div className="deepspace h-screen">
    
   
    <Navbar/>

      <Routes>
      <Route path="/" element={<Main />}/>
      <Route path="/movie/:id" element={<MovieDetail />} />
      <Route path="/login" element={ !user ?   <LogIn /> : <Navigate to='/'/>  } />
      <Route path="/signup" element={ !user ? <SignUp />  : <Navigate to='/'/> } />
      <Route path="/categorie-page" element={<Categorie />} />
      </Routes>
      
      <Footer/>
     
  </div>  
  );
}

export default App;