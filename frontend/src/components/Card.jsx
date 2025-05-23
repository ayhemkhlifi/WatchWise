import React, { useState } from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import RatingValue from "./RatingValue";
function Card(props) {
  const { result, index } = props;
  const [movie, setMovie] = useState(result.title ? true : false);

  const detailPath = movie ? `/movie/${result.id}` : `/tv/${result.id}`;
  return (
    <div
      key={index}
      className="relative block flex-none w-52 max-sm:w-[85%]  max-sm:h-full   m-7 flex flex-col items-center bg-gray-800 rounded-xl shadow-lg overflow-hidden text-white hover:shadow-2xl transition-shadow"
    >
      <Link to={detailPath}>
        <img
          src={`https://image.tmdb.org/t/p/w500${result.poster_path}`}
          alt={result.title}
          className="w-full h-auto"
        />
        <div className="p-4 text-center">
          {result.title ?  <h2 className="text-lg font-semibold m-3">{result.title}</h2> :<h2 className="text-lg font-semibold m-3">{result.name}</h2>}
          {!result.user_rating ? <h2 className="text-sm text-gray-400 mt-1">Rating: {result.vote_average}</h2> : <RatingValue   rating={result.user_rating -1} />}
        </div>
      </Link>
    </div>
  );
}

export default Card;
