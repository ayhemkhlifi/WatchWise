import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function FilterableTvShows() {
  const [tvShows, setTvShows] = useState([]);
  const [filteredTvShows, setFilteredTvShows] = useState([]);
  const [genres, setGenres] = useState([]);
  const [rating, setRating] = useState("");
  const [releaseYear, setReleaseYear] = useState("");

  const genreList = [
    { name: "Action & Adventure", id: 10759 },
    { name: "Comedy", id: 35 },
    { name: "Drama", id: 18 },
    { name: "Documentary", id: 99 },
    { name: "Animation", id: 16 },
    { name: "Crime", id: 80 },
    { name: "Family", id: 10751 },
    { name: "Mystery", id: 9648 },
    { name: "Sci-Fi & Fantasy", id: 10765 },
    { name: "Reality", id: 10764 },
    { name: "Thriller", id: 9648 },
    { name: "Kids", id: 10762 },
    { name: " News", id: 10763 },
    { name: "Soap", id: 10766 },
    { name: "Talk", id: 10767 },
    { name: "War & Politics", id: 10767 },
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
    const fetchTvShows = async () => {
      try {
        const pages = [];
        for (let i = 1; i <= 100; i++) {
          pages.push(i);
        }
        const promises = pages.map(page =>
          fetch(`https://api.themoviedb.org/3/discover/tv?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`, options)
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
    const fetchFilteredTvShows = async () => {
      try {
        let genreSelected = genres.length > 0 ? genres.join(",") : "";

        const response = await fetch(
          `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genreSelected}&vote_average.gte=${rating}&first_air_date_year=${releaseYear}`,
          options
        );
        const data = await response.json();

        setFilteredTvShows(data.results || []);
      } catch (error) {
        console.error("Failed to fetch filtered TV shows:", error);
      }
    };

    fetchFilteredTvShows();
  }, [genres, rating, releaseYear]);

  // function for changing the genres list (add or delete from it)
  const handleGenre = (genreId) => {
    if (genres.includes(genreId)) {
      setGenres(genres.filter((id) => id !== genreId));
    } else {
      setGenres([...genres, genreId]);
    }
  };

  return (
    <div className="pt-28 deepspace min-h-screen w-full text-white flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-6">Filter TV Shows</h1>

      <div className="mb-4 flex flex-col items-center ">
        <h2 className="mx-4 font-bold  ">Genre:</h2>
        <div className="flex gap-4 items-center flex-wrap px-6">
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
