import React from 'react';
import SearchResult from './SearchResult';
function SearchResultContainer(props){

    const {results} = props


    if(results.length===0){
        return(
            <></>
        )
    }
    else{
        return(
        <div className="flex flex-col  absolute bg-white top-12 rounded-md w-96 h-80 overflow-y-scroll ">
            {results.map((result , index)=>(
                <SearchResult result={result} index={index}/>
            )
        )}
            
        </div>
    ); 
    }
   
}


export default SearchResultContainer