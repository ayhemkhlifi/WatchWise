import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import Rating from "../../components/Rating";

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuthContext();
  const [watched, setWatched] = useState(false);
  
  // For reviews
  const [userReview, setUserReview] = useState("");
  const [reviews, setReviews] = useState([]);
  const [message, setMessage] = useState("");
  const dialogRef = useRef(null);

  // Handle adding movie to watched list
  const handleadd = async (index) => {
    const r = index + 1;
    const mi = movie.id;
    const t = movie.original_title;
    const p = movie.poster_path;
    const i = movie.vote_average;

    if (user) {
      const postoptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          rating: r,
          movieid: mi,
          title: t,
          poster_path: p,
          imbd_rating: i,
        }),
      };
      const response = await fetch("/movies", postoptions);
      const json = await response.json();
      setWatched(true);
    }
  };

  // Handle review submit
  const handleReviewSubmit = async () => {
    if (user) {
      const postoptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          review: userReview,
          movieId: movie.id,
        }),
      };
      const response = await fetch("/reviews", postoptions);
      const json = await response.json();

      // After submission, update reviews list and show a success message
      setReviews([ json]); // Add the new review to the list
      setUserReview(""); // Clear the input field
      setMessage("Review sent successfully!"); // Show success message

      // Hide the message after a few seconds
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  };

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMGRjYWNjMWE2NmFlM2Y5OWYzNDI5MDQ1NzkxMjE3NCIsIm5iZiI6MTcyMzI5ODQ1OS40MzIxMTksInN1YiI6IjY2YjNhZDAyN2E2NTM4Yzg4MDdiOTY4ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.uFXqJqKeYf4Fgx48e-7TW6t3VwTkoqwOIRgxF12gaxc",
    },
  };
  // Fetch movie details
  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
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

  // Check if the movie is already in the user's watched list
  useEffect(() => {
    const findmovie = async () => {
      if (movie && user) {
        const postoptions = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        const response = await fetch(`/movies/${movie.id}`, postoptions);
        const json = await response.json();
        !json.message ? setWatched(true) : setWatched(false);
      }
    };
    findmovie();
  }, [movie]);

  // Fetch reviews for the movie
  useEffect(() => {
    const fetchReviews = async () => {
      if (movie && user) {
        const postoptions = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        const response = await fetch(`/reviews/${movie.id}`, postoptions);
        const json = await response.json();
        setReviews(json);
      }
    };

    if (movie) {
      fetchReviews();
    }
  }, [movie]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="pt-28 deepspace">
      {movie && (
        <>
          <div className="flex flex-col lg:flex-row items-center justify-between w-full px-4 lg:px-8">
            <div className="lg:w-[50%] w-full p-4 animate-slideUp">
              <h1 className="text-3xl lg:text-4xl font-bold text-yellow-500">
                {movie.title}
              </h1>
              <p className="text-base lg:text-lg mt-4 text-white">
                {movie.overview}
              </p>
              <div className="mt-4 text-white space-y-2">
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
                  <strong>Genres:</strong> {movie.genres.map((genre) => genre.name).join(", ")}
                </p>
                <p>
                  <strong>Original Language:</strong> {movie.original_language}
                </p>
                <p>
                  <strong>Popularity:</strong> {movie.popularity}
                </p>
                <p>
                  <strong>Revenue:</strong> ${movie.revenue.toLocaleString()}
                </p>
                <p>
                  <strong>Status:</strong> {movie.status}
                </p>
                <p>
                  <strong>Tagline:</strong> {movie.tagline}
                </p>
              </div>
            </div>
  
            <div className="lg:w-[40%] w-full mt-8 lg:mt-0 flex flex-col items-center lg:items-end">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full max-w-xs lg:max-w-sm h-auto mb-4 animate-slideUp"
              />
              {!user && (
                <p className="text-white text-lg text-center lg:text-left">
                  Log In Or Sign Up To Add This Movie To Your Watched List
                </p>
              )}
              {user && !watched && (
                <div className="flex flex-col items-center lg:items-end">
                  <button
                    className="bg-orange-500 hover:text-black hover:bg-orange-600 p-2 rounded-xl"
                    onClick={() => dialogRef.current?.showModal()}
                  >
                    Add To Watched List
                  </button>
                  <dialog
                    className="deepspace w-96 h-40 rounded-md p-10"
                    ref={dialogRef}
                  >
                    <Rating onRatingChange={handleadd} />
                  </dialog>
                </div>
              )}
              {user && watched && (
                <p className="text-white text-lg text-center lg:text-left">
                  This Movie Is In Your Watched List
                </p>
              )}
            </div>
          </div>
  
          {/* Review Section */}
          <div className="w-full px-4 lg:px-8 mt-12">
            {user && (
              <div className="mt-8 flex flex-col items-center">
                <h3 className="text-2xl font-bold text-yellow-500">
                  Add Your Review
                </h3>
                <textarea
                  value={userReview}
                  onChange={(e) => setUserReview(e.target.value)}
                  className="w-[50%] p-2 mt-4 rounded-lg"
                  rows="4"
                  placeholder="Write your review here..."
                />
                <button
                  onClick={handleReviewSubmit}
                  className="bg-orange-500 hover:text-black hover:bg-orange-600 p-2 rounded-xl mt-4"
                >
                  Submit Review
                </button>
                {message && (
                  <p className="text-green-500 mt-4">{message}</p>
                )}
              </div>
            )}
  
            <div className="mt-8">
              <h3 className="text-2xl font-bold text-yellow-500">
                User Reviews
              </h3>
              {reviews.length > 0 ? (
                reviews.map((review, index) => (
                  <div
                    key={index}
                    className="bg-gray-800 p-4 mt-4 rounded-lg"
                  >

                    <p className="text-yellow-400 font-bold">{review.user_id.username}</p>
                    <p className="text-white">{review.review}</p>
                  </div>
                ))
              ) : (
                <p className="text-white mt-4">
                  No reviews yet. Be the first to add one!
                </p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
  
}

export default MovieDetail;
