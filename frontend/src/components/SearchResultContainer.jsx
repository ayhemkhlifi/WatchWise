import React, { useEffect, useRef, useState } from 'react';
import SearchResult from './SearchResult';
function SearchResultContainer(props){

    const {movieresults , tvresults} = props;
    const [open , setOpen]=useState(true);
    let searchRef = useRef(null);
    useEffect(()=>{
        const handle= (e)=>{
           if(searchRef.current){
               if(!searchRef.current.contains(e.target)){
                 setOpen(false)
               }
              
           }
            
        }
        document.addEventListener('mousedown',handle)
    })
    useEffect(()=>{
        setOpen(true)

    },[movieresults])
    

    if(open){
        if((movieresults.length===0) && (tvresults.length===0)){
            return(
                <></>
            )
        }
        else{
            return(
            <div className="flex flex-col  absolute deepspace top-12 rounded-md w-96 h-80 overflow-y-scroll scrollbar-hide p-6 " ref={searchRef}>
                <h1 className='  font-bold text-white deepspace '>Movies:</h1>
                {movieresults.map((result , index)=>(
                    <SearchResult result={result} index={index}/>
                )
                
            )}
               <h1 className=' font-bold text-white deepspace'>TvShows:</h1>
                {
                    tvresults.map((result,index )=>(
                        <SearchResult result={result} index={index}/>
                    ))
                }
                
            </div>
        ); 
        }
    }else{
        return(
        <>
        </>
        )
    }
   
}


export default SearchResultContainer