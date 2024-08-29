import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from "../hooks/useAuthContext";


import { X ,User } from './Icones'; 
import { useLogout } from '../hooks/useLogout';

function Sidebar({ isOpen, onClose }) {
  const {user} = useAuthContext();
  const {logout}= useLogout();

  return (
    <div
      className={`fixed top-0 left-0 h-full w-full bg-gray-950 text-white transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out`}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white"
        aria-label="Close Sidebar"
      >
        <X />
      </button>
      <img src="/images/WatchWise_prev_ui.png" alt="logo" className="relative h-16 w-auto" />

      
        <ul className="flex flex-col items-center py-10 gap-10">
          <Link to="/" onClick={onClose} className="text-white text-lg">Home</Link>
          <Link to="/choose-filter" onClick={onClose} className="text-white text-lg">Discover</Link>
        
          {user && <Link to='/movielist' onClick={onClose} className="hover:bg-orange-500 hover:text-black p-2 rounded-xl" >WatchedList</Link> } 
          { !user&&<Link to="/login" onClick={onClose} className=" absolute bottom-20 flex gap-2 hover:bg-orange-500 p-2 rounded-xl">
            <User />
            <h1 className="text-white text-lg">Log-In</h1>
          </Link>}
          { user&&
            <Link to="/" onClick= {logout} className=" absolute bottom-20 flex gap-2 hover:bg-orange-500 p-2 rounded-xl">
            <User />
            <h1 className="text-white text-lg">Log-out</h1>
          </Link>
          }
          
        </ul>
      
    </div>
  );
}

export default Sidebar;
