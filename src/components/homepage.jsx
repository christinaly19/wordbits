import Navbar from "./navbar";
import Modal from "./modal"
import scrabbleLetter from "./scrabble-letter.png";
import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
export default function Homepage() {
    const [helpOpen, setHelpOpen] = useState(false);
    const [playNowClicked, setPlayNowClicked] = useState(false);
return (
    <div className={`App ${helpOpen ? "darken" : ""}`}>
      <div className="main">
        <Navbar></Navbar>
        <div className="app-container">
          <div className="flex-none">
            <div className="flex flex-row justify-center">
              <img className="m-4 logo" src={scrabbleLetter}></img>
            </div>
            <h1 className="text-5xl font-bold">
              {" "}
              Word<mark>bits</mark>{" "}
            </h1>
            <p className="app-subtitle p-2">
              find hidden words, guess their meaning to win
            </p>
            <div className="flex flex-row justify-center">
              <button
                onClick={() => {
                  setHelpOpen(true);
                }}
                className="rounded-lg border-solid border-2 border-green-800 hover:bg-green-900 hover:text-white py-2 px-5 m-4"
              >
                How to play
              </button>
              <button className="rounded-lg font-medium border-solid border-2 border-green-800 hover:bg-green-900 hover:text-white  py-2 px-5 m-4">
                Login
              </button>
              <Link to="/play-now">
                <button
                  onClick={() => {
                    setPlayNowClicked(true);
                  }}
                  className="rounded-lg font-medium border-solid border-2 border-green-800 hover:bg-green-900  hover:text-white   py-2 px-5 m-4"
                >
                  Play now
                </button>
              </Link>
            </div>
            <p className="p-2 text-sm"> Last updated: Dec 22nd 2023</p>
          </div>
        </div>
        {helpOpen && <Modal onClose={() => setHelpOpen(false)}></Modal>}
      </div>
    </div>
  )
}
