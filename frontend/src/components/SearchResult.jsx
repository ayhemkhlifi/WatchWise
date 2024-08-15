import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function SearchResult (props) {
    const {result , index} = props
    if(result.original_language=='en'){
        if(result.poster_path){
            if(result.popularity > 10){
                 return(
                     <Link to={`movie/${result.id}`}  >
                        <div key={index} className='h-20 flex  Items-center border-b-2 border-b-black'>
                  <img className='w-14'  src={`https://image.tmdb.org/t/p/w500${result.poster_path}`} alt="" />
                  <div className='ml-10'>
                  <p className='text-black font-bold text-xl'>{result.original_title}</p>
                  <p>imbd:{result.vote_average}</p>

            </div>

            </div>
                     </Link>
        )
            }
           
        }
        
    }
        
        
   
     
}
export default SearchResult;