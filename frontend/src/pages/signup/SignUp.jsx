import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSignup } from "../../hooks/useSignup";

 

function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {signup , error, isLoading} = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(username,email,password)
  };
  const handleUsername = (event)=> {
    setUsername(event.target.value)
  }
  const handleEmail = (event) => {
    setEmail(event.target.value)
  };
  const handlePassword = (event)=>{
    setPassword(event.target.value)
  };

  return (
    <section className="deepspace_inverse h-screen flex p-8 justify-center items-center">
    <form className="flex flex-col items-center gap-y-10 bg-gray-900 w-full max-w-md mx-auto rounded-2xl shadow-2xl">
    <img src="./images/WatchWise_prev_ui.png" alt="logo" className="h-16 w-auto" />

      <div className="flex flex-col items-center gap-4">
        <h1 className="text-2xl text-white font-bold">Sign-Up</h1>
        <input 
        onChange={handleUsername}
          type="text" 
          placeholder="Username" 
          className="p-2 rounded w-full bg-gray-800 text-white border border-gray-700"
        />
        <input 
          onChange={handleEmail}
          type="email" 
          placeholder="Email" 
          className="p-2 rounded w-full bg-gray-800 text-white border border-gray-700"
        />
        <input 
        onChange={handlePassword}
          type="password" 
          placeholder="Password" 
          className="p-2 rounded w-full bg-gray-800 text-white border border-gray-700"
        />
        <button 
          disabled={isLoading}
          type="submit"
          onClick={handleSubmit} 
          className="bg-orange-600 text-white p-2 rounded w-full mt-4 hover:bg-orange-500"
        >
          Signup
        </button>
        {error && <div className="">{error}</div>}
        
      </div>
      <div className="bg-gray-800 flex flex-col items-center w-full rounded-b-2xl shadow-b-2xl p-6">
        <p className="text-white text-center">You Have An Acount ? </p>
        <Link to="/login" className="text-white bg-orange-600 text-center w-[50%] rounded-lg p-2 mt-2 hover:bg-orange-500">Log In</Link>
      </div>
    </form>
  </section>
);
}

export default SignUp;
