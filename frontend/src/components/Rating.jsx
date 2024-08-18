import React from 'react'
import { useState } from 'react';
import { Star } from "./Icones";

const  Rating =({onRatingChange}) =>{
    
    const [rating,setRating] = useState(-1);

  const ratingfill = (index)=>{
   setRating(index);
  };
  const handleratingclick = (index) => {
    ratingfill(index);
    onRatingChange(index);

  }
  return (
    <div className='flex flex-col items-center '>
        <h1 className='text-white'>How did Your Like This Movie</h1>
        <div className=" rounded-xl  p-2 flex  items-center gap-2">
        
              {[1,1,1,1,1].map((star,index)=>(
                <button key={index}
                onClick={()=>handleratingclick(index)}><Star stroke={index<=rating?"yellow":"white"}fill={index<=rating?"yellow":"white"}/></button>
              ))}
         </div>
    </div>
     );
}

export default Rating