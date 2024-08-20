import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Choosef() {
  const [loading, setLoading] = useState(true);
  useEffect   (
    ()=>{
      setLoading(false);
    }
  )
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loader"></div>
      </div>
    );
  }
  return (
    <div className="pt-28 min-h-screen w-full text-white flex flex-col items-center justify-center deepspace">
      <h1 className="text-4xl font-bold mb-10">Choose a Filter Option</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <Link
          to="/filtermovie"
          className="bg-gray-800 hover:bg-gray-900 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transform transition-transform hover:scale-105"
        >
          Filter Movies
        </Link>
        <Link
          to="/filtertv"
          className="bg-gray-800 hover:bg-gray-900 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transform transition-transform hover:scale-105"
        >
          Filter TV Shows
        </Link>
      </div>
    </div>
  );
}

export default Choosef;
