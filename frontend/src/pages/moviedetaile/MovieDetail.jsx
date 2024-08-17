import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";

function MovieDetail() {
  const { id } = useParams(); 
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const {user} = useAuthContext();
  const [watched , setWatched] = useState(false);





 const handleadd = async () => {
  const mi=movie.id
  const t=movie.original_title
  const p=movie.poster_path
  const i=movie.vote_average
  if(user){
     const postoptions = {
  method:'POST',
  headers:{
    'Content-Type':'application/json' ,
    'Authorization':`Bearer ${user.token}`
  },
  body:JSON.stringify({
    'movieid':mi,
    'title':t,
    'poster_path':p,
    'imbd_rating':i
  }),
   
 }
 const response = await fetch ('/movies',postoptions)
  const json = await response.json()
  setWatched(true)
  }
 
 
 }


  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMGRjYWNjMWE2NmFlM2Y5OWYzNDI5MDQ1NzkxMjE3NCIsIm5iZiI6MTcyMzI5ODQ1OS40MzIxMTksInN1YiI6IjY2YjNhZDAyN2E2NTM4Yzg4MDdiOTY4ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.uFXqJqKeYf4Fgx48e-7TW6t3VwTkoqwOIRgxF12gaxc",
    },
  };
  

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?language=anglais`,
         options
        );
        const result = await response.json();
        setMovie(result);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);
  useEffect(
    ()=>{
      const findmovie = async () => {
        
        if(movie && user){
          const postoptions = {
          method:'GET',
          headers:{
            'Content-Type':'application/json' ,
            'Authorization':`Bearer ${user.token}`
          },
         }
          const response = await fetch(`/movies/${movie.id}`,postoptions)
        const json = await response.json()
        console.log(json)
        !json.message ? setWatched(true) : setWatched(false)
        }
        
      }
      findmovie();
    },[movie]
  )
  

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
      {movie && (
        <>
          <div className="lg:w-[50%] w-full p-4 lg:px-8 animate-slideUp ">
            <h1 className="text-4xl font-bold text-yellow-500">
              {movie.title}
            </h1>
            <p className="text-lg mt-4 text-white">{movie.overview}</p>
            <div className="mt-4 text-white">
              <p>
                <strong>Original Title:</strong> {movie.original_title}
              </p>
              <p>
                <strong>Release Date:</strong> {movie.release_date}
              </p>
              <p>
                <strong>Runtime:</strong> {movie.runtime} minutes
              </p>
              <p>
                <strong>Genres:</strong>{" "}
                {movie.genres.map((genre) => genre.name)}
              </p>
              <p>
                <strong>Original Language:</strong> {movie.original_language}
              </p>
              <p>
                <strong>Popularity:</strong> {movie.popularity}
              </p>
              <p>
                <strong>Revenue:</strong> ${movie.revenue}
              </p>
              <p>
                <strong>Status:</strong> {movie.status}
              </p>
              <p>
                <strong>Tagline:</strong> {movie.tagline}
              </p>
            </div>
          </div>
          <div className=" px-4 lg:px-8 mt-8 lg:mt-0 flex flex-col justify-center lg:justify-end">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full max-w-xs lg:w-96 h-auto mb-4 animate-slideUp"

            />
            {!user && <p className="text-white text-lg">LogIn Or SignUp To Add This Movie To Your WatchedList </p>}
          {(user && !watched) &&<button className="bg-orange-500 hover:text-black hover:bg-orange-600 p-2 rounded-xl" onClick={handleadd}>Add To Watched List</button>}
          {(user&& watched) && <p className="text-white text-lg">This Movie Is In Your Watched List</p>}
           
          </div>
          
        </>
      )}
    </div>
  );
}

export default MovieDetail;
