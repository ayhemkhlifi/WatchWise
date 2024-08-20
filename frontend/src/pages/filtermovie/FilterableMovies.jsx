import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function FilterableMovies() {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [rating, setRating] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [loading, setLoading] = useState(true);


  const genreList = [
    { name: "Action", id: 28 },
    { name: "Adventure", id: 12 },
    { name: "Animation", id: 16 },
    { name: "Comedy", id: 35 },
    { name: "Crime", id: 80 },
    { name: "Documentary", id: 99 },
    { name: "Drama", id: 18 },
    { name: "Family", id: 10751 },
    { name: "Fantasy", id: 14 },
    { name: "History", id: 36 },
    { name: "Horror", id: 27 },
    { name: "Music", id: 10402 },
    { name: "Mystery", id: 9648 },
    { name: "Romance", id: 10749 },
    { name: "Science Fiction", id: 878 },
    { name: "TV Movie", id: 10770 },
    { name: "Thriller", id: 53 },
    { name: "War", id: 10752 },
    { name: "Western", id: 37 },
  ];

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
        const pages = [];
        for (let i = 1; i <= 200; i++) {
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
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    const fetchFilteredMovies = async () => {
      try {
        let genreSelected = genres.length > 0 ? genres.join(",") : "";

        const response = await fetch(
          `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genreSelected}&vote_average.gte=${rating}&primary_release_year=${releaseYear}`,
          options
        );
        const data = await response.json();

        setFilteredMovies(data.results || []);
      } catch (error) {
        console.error("Failed to fetch filtered movies:", error);
      }
    };

    fetchFilteredMovies();
  }, [genres, rating, releaseYear]);

  
   //function for changing the genres list (add or delet from it )
  const handleGenre = (genreId) => {
    if (genres.includes(genreId)) {
      setGenres(genres.filter((id) => id !== genreId));
    } else {
      setGenres([...genres, genreId]);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="pt-28 deepspace min-h-screen w-full text-white flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-6">Filter Movies</h1>

      <div className="mb-4">
        <label className="mx-4">Genre:</label>
        <div className="flex gap-4 items-center flex-wrap">
          {genreList.map((gen) => (
            <button
              key={gen.id}
              onClick={() => handleGenre(gen.id)}
              className={`p-2 rounded-2xl ${genres.includes(gen.id) ? 'bg-green-500' : 'bg-blue-500'} text-white`}
            >
              {gen.name}
            </button>
          ))}
        </div>
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
