import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Categorie = () => {
  const { category } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMGRjYWNjMWE2NmFlM2Y5OWYzNDI5MDQ1NzkxMjE3NCIsIm5iZiI6MTcyMzI5ODQ1OS40MzIxMTksInN1YiI6IjY2YjNhZDAyN2E2NTM4Yzg4MDdiOTY4ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.uFXqJqKeYf4Fgx48e-7TW6t3VwTkoqwOIRgxF12gaxc",
      },
    };
    const fetchData = async () => {
      try {
        let url = '';

        switch (category) {
          case 'top_rated':
            url = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1';
            break;
          case 'upcoming':
            url = 'https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1';
            break;
          
          
          default:
            throw new Error('Invalid category');
        }

        const response = await fetch(url, options);

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        
        setData(result);
        console.log(data)
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [category]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {data && data.results ? (
          data.results.map((movie) => (
            <div key={movie.id} className="p-4 bg-gray-800 rounded">
              <Link to={`/movie/${movie.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full rounded"
                />
                <h3 className="text-white mt-2 text-center">{movie.title}</h3>
              </Link>
            </div>
          ))
        ) : (
          <div className='text-white text-xl text-center mt-52'>No movies found.</div>
        )}
      </div>
    </div>
  );
};

export default Categorie;
