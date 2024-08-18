import React from 'react'
import { useState } from 'react';
import { Star } from "./Icones";

const  RatingValue =({rating}) =>{
    
    

  

  return (
    <div className='flex flex-col items-center '>
        <div className=" rounded-xl  p-2 flex  items-center gap-2">
        
              {[1,1,1,1,1].map((star,index)=>(
                <button key={index}
                ><Star stroke={index<=rating?"yellow":"white"}fill={index<=rating?"yellow":"white"}/></button>
              ))}
         </div>
    </div>
     );
}

export default RatingValue