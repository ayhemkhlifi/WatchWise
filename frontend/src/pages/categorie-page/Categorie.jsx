import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Card from '../../components/Card';

const Categorie = () => {
  const { category } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log(category);
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
        let url = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1';
          
        switch (category) {

          case 'Top Rated Movies':
            url = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1';
            break;
          case 'Upcomming Movies':
            url = 'https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1';
            break;
          case 'Popular TV Shows':
            url = 'https://api.themoviedb.org/3/tv/popular?language=en-US&page=1';
            break;
            case 'Top rated TV Shows':
            url = 'https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1';
              break;
          
          
          default:
            throw new Error('Invalid category');
            break;
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
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className='p-16 deepspace flex flex-col items-center '>
      <h1 className=' text-2xl text-white font-bold p-6 '>{category}</h1>
      <div className="flex flex-wrap  gap-4 ">
        {data && data.results ? (
          data.results.map((movie , index) => (
            <Card result={movie} key={index}/>
          ))
        ) : (
          <div className='text-white text-xl text-center mt-52'>No movies found.</div>
        )}
      </div>
    </div>
  );
};

export default Categorie;
