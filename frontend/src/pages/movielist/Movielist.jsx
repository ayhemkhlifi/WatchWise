import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import Card from "../../components/Card";
function Movielist() {
  const [movies,setMovies]=useState([])
  const {user}=useAuthContext()
  const [loading, setLoading] = useState(true);

  useEffect(
    ()=>{
      const effect= async ()=>{

      if(user){
        const getoptions ={
        method:'GET',
        headers:{
          'Content-Type':'application/json' ,
          'Authorization':`Bearer ${user.token}`
        }

        
       
      }
       const response = await fetch('https://watchwise-3.onrender.com/movies',getoptions)
       const json = await response.json()
       setMovies(json)
       setLoading(false)
      }
        
    }
      effect();
    }
  )
  
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loader"></div>
      </div>
    );
  }

 
      
  return(
    <div className=" flex flex-wrap p-4 deepspace pt-28">
         {movies.map((movie,index)=>{
           const r = {
            "id":movie.movieid,
            "title":movie.title,
            "vote_average":movie.imbd_rating,
            "poster_path":movie.poster_path,
            "user_rating":movie.rating
            
          }
          return( <Card result={r} key={index}/>)
         }
        
         
         )}
    </div>
  )
}

export default Movielist;
