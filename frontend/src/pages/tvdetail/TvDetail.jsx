import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function TvDetail() {
  const { id } = useParams(); 
  const [tvshow, setTvshow] = useState(null);
  const [loading, setLoading] = useState(true);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMGRjYWNjMWE2NmFlM2Y5OWYzNDI5MDQ1NzkxMjE3NCIsIm5iZiI6MTcyMzI5ODQ1OS40MzIxMTksInN1YiI6IjY2YjNhZDAyN2E2NTM4Yzg4MDdiOTY4ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.uFXqJqKeYf4Fgx48e-7TW6t3VwTkoqwOIRgxF12gaxc",
    },
  };

  useEffect(() => {
    const fetchTvDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/tv/${id}?language=anglais`,
          options
        );
        const result = await response.json();
        console.log(result);
        setTvshow(result);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchTvDetails();
  }, [id]);

  if (loading) {
    return (
      <div>
        // Loader
        <div className="flex justify-center items-center min-h-screen">
          <div className="loader "></div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 deepspace  flex flex-col lg:flex-row items-center w-full justify-around">
      {tvshow && (
        <>
          <div className="lg:w-[50%] w-full p-4 lg:px-8 animate-slideUp ">
            <h1 className="text-4xl font-bold text-yellow-500">
              {tvshow.name}
            </h1>
            <p className="text-lg mt-4 text-white">{tvshow.overview}</p>
            <div className="mt-4 text-white">
              <p>
                <strong>Original Title:</strong> {tvshow.original_name}
              </p>
              <p>
                <strong>Release Date:</strong> {tvshow.release_date}
              </p>
              
              <p>
                <strong>Genres:</strong>{" "}
                {tvshow.genres.map((genre) => genre.name)}
              </p>
              
            </div>
          </div>
          <div className=" px-4 lg:px-8 mt-8 lg:mt-0 flex justify-center lg:justify-end">
            <img
              src={`https://image.tmdb.org/t/p/w500${tvshow.poster_path}`}
              alt={tvshow.name}
              className="w-full max-w-xs lg:w-96 h-auto mb-4 animate-slideUp"
            />
          </div>
        </>
      )}
    </div>
  );
}

export default TvDetail;
