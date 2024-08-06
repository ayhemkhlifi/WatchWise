'use client'
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@frontend/public/images/WatchWise_prev_ui.png";
import { Search, User, Menu } from "./Icons"; 
import Sidebar from "./Sidebar";

function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Search Query: ", searchQuery);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const navigation = [
    { text: "Home", href: "/" },
    { text: "Discover", href: "/" },
  ];

  return (
    <section className="w-full  deepspace border-b-2 z-50 fixed">
      <nav className="w-full deepspace ">
        <div className="flex items-center justify-between p-4">
          {/* Menu button for small screens */}
          <button
            onClick={toggleSidebar}
            className="md:hidden text-white text-2xl"
          >
            <Menu />
          </button>
          {/* Logo and title */}
          <div className="text-white text-2xl font-bold flex items-center gap-1">
            <Image src={logo} alt="logo" className="h-16 w-auto" />
            <h1>Watchwise</h1>
          </div>
          {/* Navigation links  */}
          <div className="hidden md:flex text-white text-lg gap-9">
            {navigation.map((item, index) => (
              <Link key={index} href={item.href} className="hover:bg-orange-500 hover:text-black  p-2 rounded-xl">
                {item.text}
              </Link>
            ))}
          </div>
          {/* Search  */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden md:flex gap-1 items-center deepspace rounded-xl"
          >
            <label htmlFor="search" className="sr-only">Search</label>
            <input
              type="search"
              id="search"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search"
              className="rounded-xl text-center p-2 border-none"
            />
            <button type="submit" aria-label="Search" className="p-2">
              <Search />
            </button>
          </form>
          {/* Log-In  */}
          <Link href="/log-in" className="hidden md:flex gap-2 hover:bg-orange-500 p-2 rounded-xl">
            <User />
            <h1 className="text-white text-lg">Log-In</h1>
          </Link>
        </div>
      </nav>
      {/* Sidebar  */}
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
    </section>
  );
}

export default Navbar;
