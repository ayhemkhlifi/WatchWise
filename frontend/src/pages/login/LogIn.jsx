import React, { useState } from "react";
import { Link } from "react-router-dom"; // Use Link from react-router-dom for navigation
import { useLogin } from "../../hooks/useLogin";
function LogIn() {
  const [email , setEmail] = useState("");
  const [password , setPassword]=useState("");
  const {login ,error ,isLoading} = useLogin();
  const handleEmail= (e) => {
     setEmail(e.target.value)
  }
  const handlePassword = (e) => {
    setPassword(e.target.value)
  }
  const handleSubmit =async(e) => {
    e.preventDefault();
    await login(email,password)
  }
  return (
    <section className="deepspace_inverse h-screen flex justify-center items-center">
      <form className="flex flex-col items-center gap-y-10 bg-gray-900 w-full max-w-md mx-auto rounded-2xl shadow-2xl">
      <img src="/images/WatchWise_prev_ui.png" alt="logo" className="h-16 w-auto" />


        <div className="flex flex-col items-center gap-4">
          <h1 className="text-2xl text-white font-bold">Log-in</h1>
          <input 
            onChange={handleEmail}
            type="text" 
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
            onClick={handleSubmit}
            type="submit" 
            className="bg-orange-600 text-white p-2 rounded w-full mt-4 hover:bg-orange-500"
          >
            Login
          </button>
          {error && <div>{error}</div>}
          <Link to="/" className="text-orange-400 mt-2 hover:text-orange-300">Forgot password?</Link> {/* Use Link from react-router-dom */}
        </div>
        <div className="bg-gray-800 flex flex-col items-center w-full rounded-b-2xl shadow-b-2xl p-6">
          <p className="text-white text-center">Don't have an account yet?</p>
          <Link to="/signup" className="text-white bg-orange-600 text-center w-[50%] rounded-lg p-2 mt-2 hover:bg-orange-500">Sign up</Link> {/* Use Link from react-router-dom */}
        </div>
        
      </form>
    </section>
  );
}

export default LogIn;
