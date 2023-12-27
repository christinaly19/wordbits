import "./navbar.css";
import Hamburger from "./burger-menu-svgrepo-com.svg";
import Cross from "./cross-svgrepo-com.svg"
import React, { useState } from "react";
import Edit from "./edit.svg"
export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const handleMenuToggle = () => {
      if (menuOpen) {
        setMenuOpen(false);
       } else {
        setMenuOpen(true);
      }
    }
  return (
    <>
    <div className="flex navbar-main">
      <img className="ml-2 mt-2 menu-icon" onClick = {handleMenuToggle} src={menuOpen ? Cross : Hamburger}></img>
      <p className="mt-2 ml-4 font-semibold text-lg">Word<mark>bits</mark></p>
      <div></div>
    </div>

    {menuOpen && 
    <div className="text-xs ml-2 pt-3 navbar-menu-dropdown">
    <p className="px-5"> EXPLORE MORE WORD GAMES </p>
    <div className = "px-3 mt-3 flex">
        <img className="navbar-game-logo"src={Edit}></img>
        <p className="mt-1 text-sm"> Coming Soon </p>
    </div>
    <div className = "px-3 mt-2 flex">
    <img className="navbar-game-logo"src={Edit}></img>
    <p className="mt-1 text-sm"> Coming Soon </p>
    </div>
    <div className = "px-3 mt-2 flex">
    <img className="navbar-game-logo"src={Edit}></img>
    <p className="mt-1 text-sm"> Coming Soon </p>
    </div>
    <div className = "px-3 mt-2 flex">
    <img className="navbar-game-logo"src={Edit}></img>
    <p className="mt-1 text-sm"> Coming Soon </p>
    </div>
    <div className="my-4 flex justify-center w-full">
    <button className="rounded-md navbar-login-button bg-black text-white px-5 py-2 mr-3 hover:bg-gray-800"> Login</button>
    <button className="rounded-md navbar-signup-button px-5 py-2 hover:bg-black hover:text-white"> Sign Up</button>
    </div>
    </div>
    }
    </>
  );
}
