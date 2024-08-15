import React, { useState } from "react";
import { Link } from "react-router-dom"; 
import { Search, User, Menu } from "./Icones"; 
import Sidebar from "./Sidebar";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import SearchResultContainer  from './SearchResultContainer'

function Navbar() {
  const {logout} = useLogout();
  const {user} = useAuthContext();
  const [searchresult,setSearchResult] = useState([]);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMGRjYWNjMWE2NmFlM2Y5OWYzNDI5MDQ1NzkxMjE3NCIsIm5iZiI6MTcyMzI5ODQ1OS40MzIxMTksInN1YiI6IjY2YjNhZDAyN2E2NTM4Yzg4MDdiOTY4ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.uFXqJqKeYf4Fgx48e-7TW6t3VwTkoqwOIRgxF12gaxc",
    },
  };
  
  const handleSearchChange = async (e) => {
    if((e.target.value.length > 0)){
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(e.target.value)}&include_adult=false&language=en-US&page=1`,options)
    const json =await  response.json()
    setSearchResult(json.results || [])
    }else{
      setSearchResult([])
    } 
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    //redirect to page with lots of movies with that name (work on it later)
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const navigation = [
    { text: "Home", href: "/" },
    { text: "Discover", href: "/" },
  ];

  return (
    <section className="w-full  border-b-2 z-50 fixed">
      <nav className="w-full deepspace ">
        <div className="flex items-center justify-between p-4">
          {/* Menu button for small screens */}
          <button onClick={toggleSidebar} className="md:hidden text-white text-2xl">
            <Menu />
          </button>
          {/* Logo and title */}
          <div className="text-white text-2xl font-bold flex items-center gap-1">
            <img src="/images/WatchWise_prev_ui.png" alt="logo" className="h-16 w-auto" />
            <h1>Watchwise</h1>
          </div>
          {/* Navigation links  */}
          <div className="hidden md:flex text-white text-lg gap-9">
            {navigation.map((item, index) => (
              <Link key={index} to={item.href} className="hover:bg-orange-500 hover:text-black p-2 rounded-xl">
                {item.text}
              </Link>
            ))}
          </div>
          {/* Search  */}
          <div className="relative flex flex-col w-80 items-center">
            <form onSubmit={handleSearchSubmit} className="hidden md:flex gap-1 items-center bg-gray-900 rounded-xl">
            <label htmlFor="search" className="sr-only">Search</label>
            <input
              
              onChange={handleSearchChange}
              placeholder="Search"
              className="rounded-xl text-center p-2 border-none"
            />
            <button type="submit" aria-label="Search" className="p-2">
              <Search />
            </button>
          </form>
          <SearchResultContainer results={searchresult}/>
           
          </div>
          
          
          {/* Log-In  */}
          {!user && <Link  to="/login" className="hidden md:flex gap-2 hover:bg-orange-500 p-2 rounded-xl text-white">
            <User />
            <h1 className="text-white text-lg">Log-In</h1>
          </Link>}
          {user && <button  className="text-white text-lg md:flex" onClick={logout}> <User /> Logout</button>}
        </div>
      </nav>
      {/* Sidebar  */}
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
    </section>
  );
}

export default Navbar;
