import React from 'react';

function About() {
  return (
    <div className="w-full flex flex-col md:flex-row  items-center p-4 rounded-lg shadow-2xl ">
      <div className="w-full md:w-1/2 flex justify-center md:justify-center items-center mb-6 md:mb-0 ">
        <img
          src="images/WatchWise_prev_ui.png"
          alt="WatchWise Logo"
          className="h-44 w-auto"
        />
      </div>
      <div className="w-full md:w-2/3 text-center md:text-left overflow-x-hidden">
        <h1 className="text-yellow-500 text-3xl font-bold mb-4">About WatchWise</h1>
        <p className="text-white text-lg leading-relaxed">
          Welcome to WatchWise, your ultimate companion for discovering the best movies and TV series tailored to your tastes. Whether you're looking for your next binge-worthy show or curating a watchlist for a weekend movie marathon, WatchWise has got you covered. Our smart recommendation engine suggests content that matches your unique preferences, ensuring you'll never run out of things to watch. Plus, with easy-to-use watchlist features, you can organize your favorite picks and keep track of what you've watched and what’s next on your list. Dive into the world of entertainment with WatchWise—where every recommendation is just right for you.
        </p>
      </div>
    </div>
  );
}

export default About;
