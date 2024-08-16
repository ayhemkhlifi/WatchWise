import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function FilterableMovies() {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [genre, setGenre] = useState("");
  const [rating, setRating] = useState("");
  const [releaseYear, setReleaseYear] = useState("");

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMGRjYWNjMWE2NmFlM2Y5OWYzNDI5MDQ1NzkxMjE3NCIsIm5iZiI6MTcyMzY2MDM2Ny42NTExMDgsInN1YiI6IjY2YjNhZDAyN2E2NTM4Yzg4MDdiOTY4ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cURFiSbWrh7tKf-mMnr6wHmVSPKiyGIRGbQyGYaRzOg'
  },
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const pages =[];
        for (let i = 1; i <= 100; i++) {
          pages.push(i);
        }
        const promises = pages.map(page =>
          fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`, options)
            .then(response => response.json())
        );

        const results = await Promise.all(promises);
        const allMovies = results.flatMap(data => data.results || []);

        setMovies(allMovies);
        setFilteredMovies(allMovies);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    let filtered = movies;

    if (genre) {
      filtered = filtered.filter(movie => movie.genre_ids.includes(Number(genre)));
    }

    if (rating) {
      filtered = filtered.filter(movie => movie.vote_average >= rating);
    }

    if (releaseYear) {
      filtered = filtered.filter(movie => new Date(movie.release_date).getFullYear() === Number(releaseYear));
    }

    setFilteredMovies(filtered);
  }, [genre, rating, releaseYear, movies]);

  return (
    <div className="pt-28 deepspace min-h-screen w-full text-white flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-6">Filter Movies</h1>
      <div className="mb-4">
        <label className="mr-4">Genre:</label>
        <select value={genre} onChange={(e) => setGenre(e.target.value)} className="bg-gray-800 text-white p-2 rounded">
          <option value="">All</option>
          <option value="28">Action</option>
          <option value="35">Comedy</option>
          <option value="18">Drama</option>
          <option value="12">History</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="mr-4">Rating:</label>
        <select value={rating} onChange={(e) => setRating(e.target.value)} className="bg-gray-800 text-white p-2 rounded">
          <option value="">All</option>
          <option value="7">7+</option>
          <option value="8">8+</option>
          <option value="9">9+</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="mr-4">Release Year:</label>
        <input
          type="number"
          value={releaseYear}
          onChange={(e) => setReleaseYear(e.target.value)}
          className="bg-gray-800 text-white p-2 rounded"
          placeholder="e.g., 2023"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
        {filteredMovies && filteredMovies.length > 0 ? (
          filteredMovies.map(movie => (
            <Link key={movie.id} to={`/movie/${movie.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w185/${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-64 object-cover"
              />
            </Link>
          ))
        ) : (
          <p>No movies found</p>
        )}
      </div>
    </div>
  );
}

export default FilterableMovies;
