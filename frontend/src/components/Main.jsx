
import React, { useEffect,useState } from 'react';

function Main() {
    const [movies, setMovies] = useState([]); // State to store the movies
    const [loading, setLoading] = useState(true); // State to manage loading

    const fetchMovies = async () => {
        const url = 'https://imdb188.p.rapidapi.com/api/v1/getPopularMovies';
        const options = {
            method: 'POST',
            headers: {
                'x-rapidapi-key': '688e7230b4msh38d18948f5c4687p199b0fjsn3a8e7e46f4d5',
                'x-rapidapi-host': 'imdb188.p.rapidapi.com',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                country: {
                    anyPrimaryCountries: ['IN']
                },
                limit: 200,
                releaseDate: {
                    releaseDateRange: {
                        end: '2029-12-31',
                        start: '2020-01-01'
                    }
                },
                userRatings: {
                    aggregateRatingRange: { max: 10, min: 6 },
                    ratingsCountRange: { min: 1000 }
                },
                genre: {
                    allGenreIds: ['Action']
                },
                runtime: {
                    runtimeRangeMinutes: { max: 120, min: 0 }
                }
            })
        };
        
        try {
            const response = await fetch(url, options);
            const result = await response.json(); 
            setMovies(result.data.list || []); 
            setLoading(false); 
        } catch (error) {
            console.error(error);
            setLoading(false); 
        }
    };

    useEffect(() => {
        fetchMovies();
    }, []);

    return (
        <div className="pt-28">
            <h1 className="text-2xl font-bold mb-4">Popular Movies</h1>
            {loading ? (
                <p className="text-lg">Loading...</p>
            ) : movies.length === 0 ? (
                <p className="text-lg">No movies available.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {/* Render movie cards */}
                    {movies.map((movie, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                            <img
                                src={movie.primaryImage?.imageUrl} 
                                alt={movie.title.titleText.text} 
                                className="w-full h-auto"
                            />
                            <div className="p-4">
                                <h2 className="text-lg font-semibold">{movie.title.titleText.text}</h2>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Main;