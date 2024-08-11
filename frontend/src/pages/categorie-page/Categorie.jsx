import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

function Categorie() {
    
    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [tvShows, setTvShows] = useState([]);
    const [upcommings, setupcomings] = useState([]);
    const [loading, setLoading] = useState(true);

    const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMGRjYWNjMWE2NmFlM2Y5OWYzNDI5MDQ1NzkxMjE3NCIsIm5iZiI6MTcyMzI5ODQ1OS40MzIxMTksInN1YiI6IjY2YjNhZDAyN2E2NTM4Yzg4MDdiOTY4ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.uFXqJqKeYf4Fgx48e-7TW6t3VwTkoqwOIRgxF12gaxc",
        },
      };
    const fetchTopRatedMovies = async () => {
        try {
          const response = await fetch(
            "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
            options
          );
          const result = await response.json();
          setTopRatedMovies(result.results || []);
          setLoading(false);
        } catch (error) {
          console.error(error);
          setLoading(false);
        }
      };
      useEffect(() => {
    
        fetchTopRatedMovies();
      }, []);

      const categoriechoise = [
        {title:"top movies" ,list:topRatedMovies}
      ] ;
  return (
    
           <div className="deepspace ">
             {categoriechoise.map((movie, index) => (
                <div className="flex flex-col pt-16 ">
                    <h1 key={index} className="text-white text-center text-5xl font-bold py-8">{movie.title}</h1>
                    <div className="flex flex-wrap gap-4  items-center pl-14 ">
                    {movie.list.map((item, index) => (
                        <div
                        key={index}
                        className=" w-52 flex  items-center bg-gray-800 rounded-xl shadow-lg overflow-hidden text-white hover:shadow-2xl transition-shadow "
                      >
                        <Link to={`/movie/${item.id}`}>
                          <img
                            src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                            alt={movie.title}
                            className="w-full h-auto"
                          />
                          <div className="p-4 text-center">
                            <h2 className="text-lg font-semibold">{movie.title}</h2>
                            <h2 className="text-sm text-gray-400 mt-1">
                              Rating: {item.vote_average}
                            </h2>
                          </div>
                        </Link>
                      </div>
                    ))}
                    </div>
                 </div>
            
             ))}
             
    
           </div> 
        )
   
}
  


export default Categorie