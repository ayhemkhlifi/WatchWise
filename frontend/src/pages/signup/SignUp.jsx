import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

 

function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/signup', { username, email, password });
      console.log(response.data);
    } catch (err) {
      setError(err.response.data.error);
    }
  };

  return (
    <section className="deepspace_inverse h-screen flex justify-center items-center">
    <form className="flex flex-col items-center gap-y-10 bg-gray-900 w-full max-w-md mx-auto rounded-2xl shadow-2xl">
    <img src="./images/WatchWise_prev_ui.png" alt="logo" className="h-16 w-auto" />

      <div className="flex flex-col items-center gap-4">
        <h1 className="text-2xl text-white font-bold">Sign-Up</h1>
        <input 
          type="text" 
          placeholder="Username" 
          className="p-2 rounded w-full bg-gray-800 text-white border border-gray-700"
        />
        <input 
          type="email" 
          placeholder="Email" 
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
        
      </div>
      <div className="bg-gray-800 flex flex-col items-center w-full rounded-b-2xl shadow-b-2xl p-6">
        <p className="text-white text-center">you have an acount</p>
        <Link href="/login" className="text-white bg-orange-600 text-center w-[50%] rounded-lg p-2 mt-2 hover:bg-orange-500">Log In</Link>
      </div>
    </form>
  </section>
);
}

export default SignUp;
