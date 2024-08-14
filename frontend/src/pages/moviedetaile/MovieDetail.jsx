import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
          {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMGRjYWNjMWE2NmFlM2Y5OWYzNDI5MDQ1NzkxMjE3NCIsIm5iZiI6MTcyMzI5ODQ1OS40MzIxMTksInN1YiI6IjY2YjNhZDAyN2E2NTM4Yzg4MDdiOTY4ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.uFXqJqKeYf4Fgx48e-7TW6t3VwTkoqwOIRgxF12gaxc",
            }
          }
        );
        const result = await response.json();
        console.log(result);
        setMovie(result);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchMovieDetail();
  }, [id]);

  if (loading) {
    return <p className="text-center text-white">Loading...</p>;
  }

  if (!movie) {
    return <p className="text-center text-white">Movie not found.</p>;
  }

  return (
    <div className="pt-28 deepspace bg-gray-900 min-h-screen text-white">
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold">{movie.title}</h1>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-auto mt-6 rounded"
        />
        <p className="mt-6 text-lg">{movie.overview}</p>
        <p className="mt-4">
          <strong>Release Date:</strong> {movie.release_date}
        </p>
        <p className="mt-2">
          <strong>Rating:</strong> {movie.vote_average}
        </p>
      </div>
    </div>
  );
}

export default MovieDetail;
