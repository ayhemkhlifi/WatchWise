import React from "react";
import { Link } from "react-router-dom";

import {
  Phone,
  Email,
  Facebookcol,
  Instagramcol,
  LinkedIncol,
  Twitercol,
  Location,
} from "./Icones";

function Footer() {
  return (
    <div className="text-white deepspace_inverse flex flex-col items-center">
        <div className="text-white text-2xl font-bold flex flex-col items-center gap-1">
          <img
            src="/images/WatchWise_prev_ui.png"
            alt="logo"
            className="h-16 w-auto"
          />
          <h1>Watchwise</h1>
        </div>
    
      <div className=" w-full flex justify-around ">
        <div className="flex flex-col gap-4 p-10">
          <h2 className="text-2xl font-semibold  ">Follow Us</h2>
          <div className="flex gap-3">
            <Facebookcol />
            <Instagramcol />
            <Twitercol />
          </div>
        </div>

        <div className="flex flex-col gap-4 p-10">
          <h2 className="text-2xl font-semibold  ">Phone</h2>
          <div className="flex">
            <Phone />
            <p>+216 28 403 826</p>
          </div>
          
        </div>

        <div className="flex flex-col gap-4 p-10">
        <h2 className="text-2xl font-semibold  ">Email</h2>

        <div className="flex">
            <Email />
            <p>watchwise@gmail.com</p>
          </div>
        </div>
      </div>

      <hr className="border-t-2 border-gray-300  w-[50%]" />

     <div className="flex gap-8">
        <Link to="/" className=" hover:text-yellow-600">terms and conditions</Link>    
        <Link to="/" className=" hover:text-yellow-600">privacy policy</Link>        
        <Link to="/" className=" hover:text-yellow-600">quality policy</Link>  
    
     </div>

     <div className="bg-gray-800 w-full text-center mt-4">
        <p>@ copierights are conserved </p>
     </div>

        
    </div>
  );
}

export default Footer;
