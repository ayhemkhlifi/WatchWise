import React from 'react';
import { Link } from 'react-router-dom';

import { X ,User } from './Icones'; 

function Sidebar({ isOpen, onClose }) {
  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-gray-950 text-white transform ${
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
      
        <ul className="flex flex-col items-center py-10 gap-10">
          <Link href="/" onClick={onClose} className="text-white text-lg">Home</Link>
          <Link href="/" onClick={onClose} className="text-white text-lg">Discover</Link>
          <Link href="/login" onClick={onClose} className=" flex gap-2 hover:bg-orange-500 p-2 rounded-xl">
            <User />
            <h1 className="text-white text-lg">Log-In</h1>
          </Link>
          
        </ul>
      
    </div>
  );
}

export default Sidebar;
