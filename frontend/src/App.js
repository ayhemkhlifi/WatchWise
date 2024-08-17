import React from 'react';
import './index.css';
import Navbar from './components/Navbar';
import { useAuthContext } from './hooks/useAuthContext';
import SignUp from './pages/signup/SignUp';
import LogIn from './pages/login/LogIn';
import Main from './components/Main';
import Categorie from './pages/categorie-page/Categorie';
import MovieDetail from './pages/moviedetaile/MovieDetail';
import FilterableMovies from './pages/filtermovie/FilterableMovies';
import FilterableTvShows from './pages/filtertv/FilterableTvShows';
import Choosef from './pages/choose-filter/Choosef';
import TvDetail from './pages/tvdetail/TvDetail';
import Movielist from './pages/movielist/Movielist';
import { BrowserRouter as Router, Route, Routes , Navigate } from 'react-router-dom';



function App() {
  const {user} = useAuthContext()
  return (
   
    <div className="deepspace h-screen">
    
   
    <Navbar/>

      <Routes>
      <Route path="/" element={<Main />}/>
      <Route path="/movie/:id" element={<MovieDetail />} />
      <Route path="/tv/:id" element={<TvDetail />} />
      <Route path="/login" element={ !user ?   <LogIn /> : <Navigate to='/'/>  } />
      <Route path="/signup" element={ !user ? <SignUp />  : <Navigate to='/'/> } />
      <Route path="/categorie-page" element={<Categorie />} />
      <Route path="/choose-filter" element={<Choosef />} />
      <Route path="/filtermovie" element={<FilterableMovies />} />
      <Route path="/filtertv" element={<FilterableTvShows />} />
      <Route path="/movielist" element={user ? <Movielist /> :<Navigate to='/'/>} />
      
      </Routes>
      
   
     
  </div>  
  );
}

export default App;