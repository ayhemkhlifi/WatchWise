import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function FilterableTvShows() {
  const [tvShows, setTvShows] = useState([]);
  const [filteredTvShows, setFilteredTvShows] = useState([]);
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
    const fetchTvShows = async () => {
      try {
        const pages = [1, 2, 3, 4, 5]; 
        const promises = pages.map(page =>
          fetch(`https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=${page}`, options)
            .then(response => response.json())
        );

        const results = await Promise.all(promises);
        const allTvShows = results.flatMap(data => data.results || []);

        setTvShows(allTvShows);
        setFilteredTvShows(allTvShows);
      } catch (error) {
        console.error("Failed to fetch TV shows:", error);
      }
    };

    fetchTvShows();
  }, []);

  useEffect(() => {
    let filtered = tvShows;

    if (genre) {
      filtered = filtered.filter(show => show.genre_ids.includes(Number(genre)));
    }

    if (rating) {
      filtered = filtered.filter(show => show.vote_average >= rating);
    }

    if (releaseYear) {
      filtered = filtered.filter(show => new Date(show.first_air_date).getFullYear() === Number(releaseYear));
    }

    setFilteredTvShows(filtered);
  }, [genre, rating, releaseYear, tvShows]);

  return (
    <div className="pt-28 deepspace min-h-screen w-full text-white flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-6">Filter TV Shows</h1>
      <div className="mb-4">
        <label className="mr-4">Genre:</label>
        <select value={genre} onChange={(e) => setGenre(e.target.value)} className="bg-gray-800 text-white p-2 rounded">
          <option value="">All</option>
          <option value="10759">Action & Adventure</option>
          <option value="35">Comedy</option>
          <option value="18">Drama</option>
          <option value="99">Documentary</option>
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
        {filteredTvShows && filteredTvShows.length > 0 ? (
          filteredTvShows.map(show => (
            <Link key={show.id} to={`/tv/${show.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w185/${show.poster_path}`}
                alt={show.name}
                className="w-full h-64 object-cover"
              />
            </Link>
          ))
        ) : (
          <p>No TV shows found</p>
        )}
      </div>
    </div>
  );
}

export default FilterableTvShows;
