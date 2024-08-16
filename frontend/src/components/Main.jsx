import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Torigntarow } from "./Icones";
import About from "./About";
import Card from "./Card";
import Footer from "./Footer";

function Main() {
  const [movies, setMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [upcommings, setupcomings] = useState([]);
  const [topratedseries, setTopratedseries] = useState([]);
  const [PopularPeople, setPopularPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showScrollTopButton, setShowScrollTopButton] = useState(false);


  const topRatedMoviesRef = useRef(null);
  const tvShowsRef = useRef(null);
  const upcomingmoviesRef = useRef(null);
  const topratedseriesRef = useRef(null);
  const popularPeopleRef = useRef(null);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMGRjYWNjMWE2NmFlM2Y5OWYzNDI5MDQ1NzkxMjE3NCIsIm5iZiI6MTcyMzI5ODQ1OS40MzIxMTksInN1YiI6IjY2YjNhZDAyN2E2NTM4Yzg4MDdiOTY4ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.uFXqJqKeYf4Fgx48e-7TW6t3VwTkoqwOIRgxF12gaxc",
    },
  };

  const fetchTopRatedMovies = async () => {
    try {
      const pages = [1, 2, 3, 4, 5]; // Array of pages to fetch
      const promises = pages.map(page =>
        fetch(`https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${page}`, options)
          .then(response => response.json())
      );
  
      const results = await Promise.all(promises);
      const allMovies = results.flatMap(result => result.results || []);
  
      setTopRatedMovies(allMovies);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };
  
  const fetchPopularTvShows = async () => {
    try {
      const pages = [1, 2, 3, 4, 5];
      const promises = pages.map(page =>
        fetch(`https://api.themoviedb.org/3/tv/popular?language=en-US&page=${page}`, options)
          .then(response => response.json())
      );
  
      const results = await Promise.all(promises);
      const allTvShows = results.flatMap(result => result.results || []);
  
      setTvShows(allTvShows);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };
  
  const fetchUpcomingMovies = async () => {
    try {
      const pages = [1, 2, 3, 4, 5];
      const promises = pages.map(page =>
        fetch(`https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${page}`, options)
          .then(response => response.json())
      );
  
      const results = await Promise.all(promises);
      const allUpcomingMovies = results.flatMap(result => result.results || []);
  
      setupcomings(allUpcomingMovies);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };
  
  const fetchtopratedshows = async () => {
    try {
      const pages = [1, 2, 3, 4, 5];
      const promises = pages.map(page =>
        fetch(`https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=${page}`, options)
          .then(response => response.json())
      );
  
      const results = await Promise.all(promises);
      const allTopRatedShows = results.flatMap(result => result.results || []);
  
      setTopratedseries(allTopRatedShows);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };
  
  const fetchPopularPeople = async () => {
    try {
      const pages = [1, 2, 3, 4, 5];
      const promises = pages.map(page =>
        fetch(`https://api.themoviedb.org/3/person/popular?language=en-US&page=${page}`, options)
          .then(response => response.json())
      );
  
      const results = await Promise.all(promises);
      const allPopularPeople = results.flatMap(result => result.results || []);
  
      setPopularPeople(allPopularPeople);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchTopRatedMovies();
    fetchPopularTvShows();
    fetchUpcomingMovies();
    fetchtopratedshows ();
    fetchPopularPeople();

    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTopButton(true);
      } else {
        setShowScrollTopButton(false);
      }
    };
   // Add the scroll event listener when the component mounts
    window.addEventListener("scroll", handleScroll);
    
 // Clean up the event listener when the component unmounts
    return () => window.removeEventListener("scroll", handleScroll);

  }, []);

  const scrollLeft = (ref) => {
    ref.current.scrollBy({
      left: -500,
      behavior: "smooth",
    });
  };

  const scrollRight = (ref) => {
    ref.current.scrollBy({
      left: 500,
      behavior: "smooth",
    });
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="pt-28 deepspace bg-gray-900 min-h-screen flex flex-col gap-5">
      {loading ? (
        // Loader
        <div className="flex justify-center items-center min-h-screen">
          <div className="loader ease-linear rounded-full  h-12 w-12"></div>
        </div>
      ) : (
        <>
          {/* Top Rated Movies */}
          <Link
            to="/categorie-page"
            className="text-2xl pl-8 text-white font-bold my-6 flex gap-2 items-center"
          >
            <div className="h-10 border-l-4 border-yellow-600"></div>

            <h2>Top Rated Movies</h2>
            <Torigntarow />
          </Link>

          <div className="relative">
            <button
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-gray-900 to-transparent text-white p-2 rounded-full z-10 hover:scale-110 transition-transform"
              onClick={() => scrollLeft(topRatedMoviesRef)}
            >
              &#8249;
            </button>
            <div
              ref={topRatedMoviesRef}
              className="flex flex-nowrap overflow-x-scroll scrollbar-hide gap-6 px-10 animate-slideUp"
            >
              {topRatedMovies.map((movie, index) => (
                <Card result={movie} key={index}/>
              ))}
            </div>
            <button
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gradient-to-l from-gray-900 to-transparent text-white p-2 rounded-full z-10 hover:scale-110 transition-transform"
              onClick={() => scrollRight(topRatedMoviesRef)}
            >
              &#8250;
            </button>
          </div>


        
          {/* upcomming movies */}
          <Link className="text-2xl pl-8 text-white font-bold my-6 flex gap-2 items-center">
            <div className="h-10 border-l-4 border-yellow-600"></div>

            <h2> upcomming movies</h2>
            <Torigntarow />
          </Link>

          <div className="relative">
            <button
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-gray-900 to-transparent text-white p-2 rounded-full z-10 hover:scale-110 transition-transform"
              onClick={() => scrollLeft(upcomingmoviesRef)}
            >
              &#8249;
            </button>
            <div
              ref={upcomingmoviesRef}
              className="flex flex-nowrap overflow-x-scroll scrollbar-hide gap-6 px-10 animate-slideUp"
            >
              {upcommings.map((movie, index) => (
                <Card result={movie} key={index}/>
              ))}
            </div>
            <button
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gradient-to-l from-gray-900 to-transparent text-white p-2 rounded-full z-10 hover:scale-110 transition-transform"
              onClick={() => scrollRight(topRatedMoviesRef)}
            >
              &#8250;
            </button>
          </div>



          {/* Popular TV Shows */}
          <Link className="text-2xl pl-8 text-white font-bold my-6 flex gap-2 items-center">
            <div className="h-10 border-l-4 border-yellow-600"></div>

            <h2>Popular TV Shows</h2>
            <Torigntarow />
          </Link>
          <div className="relative">
            <button
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-gray-900 to-transparent text-white p-2 rounded-full z-10 hover:scale-110 transition-transform"
              onClick={() => scrollLeft(tvShowsRef)}
            >
              &#8249;
            </button>
            <div
              ref={tvShowsRef}
              className="flex flex-nowrap overflow-x-scroll scrollbar-hide gap-6 px-10 animate-slideUp"
            >
              {tvShows.map((tv, index) => (
                <Card result={tv} key={index} />
              ))}
            </div>
            <button
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gradient-to-l from-gray-900 to-transparent text-white p-2 rounded-full z-10 hover:scale-110 transition-transform"
              onClick={() => scrollRight(tvShowsRef)}
            >
              &#8250;
            </button>
          </div>



          {/* Top rated TV Shows */}
          <Link className="text-2xl pl-8 text-white font-bold my-6 flex gap-2 items-center">
            <div className="h-10 border-l-4 border-yellow-600"></div>

            <h2>Top rated TV Shows</h2>
            <Torigntarow />
          </Link>
          <div className="relative">
            <button
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-gray-900 to-transparent text-white p-2 rounded-full z-10 hover:scale-110 transition-transform"
              onClick={() => scrollLeft(topratedseriesRef)}
            >
              &#8249;
            </button>
            <div
              ref={topratedseriesRef}
              className="flex flex-nowrap overflow-x-scroll scrollbar-hide gap-6 px-10 animate-slideUp"
            >
              {topratedseries.map((tv, index) => (
                <Card result={tv} key={index}/>
              ))}
            </div>
            <button
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gradient-to-l from-gray-900 to-transparent text-white p-2 rounded-full z-10 hover:scale-110 transition-transform"
              onClick={() => scrollRight(topratedseriesRef)}
            >
              &#8250;
            </button>
          </div>


          {/* Popular people */}
          <Link
            to="/categorie-page"
            className="text-2xl pl-8 text-white font-bold my-6 flex gap-2 items-center"
          >
            <div className="h-10 border-l-4 border-yellow-600"></div>
            <h2>Popular people</h2>
            <Torigntarow />
          </Link>

          <div className="relative mx-10 ">
            <button
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-gray-900 to-transparent text-white p-2 rounded-full z-10 hover:scale-110 transition-transform"
              onClick={() => scrollLeft(popularPeopleRef)}
            >
              &#8249;
            </button>

            <div
              ref={popularPeopleRef}
              className="flex flex-nowrap overflow-x-scroll scrollbar-hide  px-10  animate-slideUp rounded-full shadow-inner "
            >
              {PopularPeople.map((person, index) => (
                <div
                  key={index}
                  className="flex-none w-48 h-64 flex flex-col items-center text-white "
                >
                  <div className="w-36 h-36 rounded-full overflow-hidden shadow-lg hover:shadow-2xl transition-shadow ">
                    <Link to="/">
                      <img
                        src={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
                        alt={person.name}
                        className="w-full h-full object-cover"
                      />
                    </Link>
                  </div>

                  <div className="text-center mt-4">
                    <h2 className="text-lg font-semibold">{person.name}</h2>
                    <h2 className="text-sm text-green-500 mt-1">
                      {person.popularity}
                    </h2>
                    <h2 className="text-sm text-gray-400 mt-1">
                      {person.known_for_department}
                    </h2>
                  </div>
                </div>
              ))}
            </div>

            <button
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gradient-to-l from-gray-900 to-transparent text-white p-2 rounded-full z-10 hover:scale-110 transition-transform"
              onClick={() => scrollRight(popularPeopleRef)}
            >
              &#8250;
            </button>
          </div>
        </>
      )}

      <About/>
      <Footer/>
     

      {showScrollTopButton && (
            <button
              onClick={scrollToTop}
              className="fixed bottom-10 right-10 bg-yellow-500 text-white py-2 px-4 rounded-full shadow-lg hover:bg-gray-800 transition-transform"
            >
              &#9650; 
            </button>
          )}
    </div>
    
  );
}

export default Main;
