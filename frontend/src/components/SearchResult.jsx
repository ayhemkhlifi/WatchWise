import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function SearchResult (props) {
    const {result , index} = props
    if(result.original_language=='en'){
        if(result.poster_path){
            if(result.popularity > 10){
                 return(
                     <Link to={`movie/${result.id}`}  >
                        <div key={index} className='h-20 flex  Items-center'>
                  <img className=' h-16'  src={`https://image.tmdb.org/t/p/w500${result.poster_path}`} alt="" />
                  <div className='ml-10 text-white'>
                  <p className=' font-bold text-xl'>{result.original_title ? result.original_title : result.original_name}</p>
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