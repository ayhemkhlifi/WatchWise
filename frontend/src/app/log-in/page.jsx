import React from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@frontend/public/images/WatchWise_prev_ui.png";

function LogIn() {
  
  return (
    <section className="deepspace_inverse h-screen flex justify-center items-center">
      <form className="flex flex-col items-center gap-y-10 bg-gray-900 w-full max-w-md mx-auto rounded-2xl shadow-2xl">
        <Image src={logo} alt="logo" className="h-auto w-44 top-1" />

        <div className="flex flex-col items-center gap-4">
          <h1 className="text-2xl text-white font-bold">Log-in</h1>
          <input 
            type="text" 
            placeholder="Username" 
            className="p-2 rounded w-full bg-gray-800 text-white border border-gray-700"
          />
          
          <input 
            type="password" 
            placeholder="Password" 
            className="p-2 rounded w-full bg-gray-800 text-white border border-gray-700"
          />
          <button 
            type="submit" 
            className="bg-orange-600 text-white p-2 rounded w-full mt-4 hover:bg-orange-500"
          >
            Login
          </button>
          <Link href="/" className="text-orange-400 mt-2 hover:text-orange-300">Forgot password?</Link>
        </div>
        <div className="bg-gray-800 flex flex-col items-center w-full rounded-b-2xl shadow-b-2xl p-6">
          <p className="text-white text-center">Don't have an account yet?</p>
          <Link href="/sign-up" className="text-white bg-orange-600 text-center w-[50%] rounded-lg p-2 mt-2 hover:bg-orange-500">Sign up</Link>
        </div>
      </form>
    </section>
  );
}

export default LogIn;
