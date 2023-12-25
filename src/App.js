import scrabbleLetter from "./components/scrabble-letter.png";
import "./components/App.css";
import Homepage from "./components/homepage";
import Modal from "./components/modal";
import Navbar from "./components/navbar";
import React, { useState } from "react";
import GameBoard from "./components/gameboard";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

function PlayNow() {
  const numRows = 19;
  const numCols = 20; 
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const charArray = [];
  const letterProbabilities = {
    'A': 0.15,
    'B': 0.025,
    'C': 0.025,
    'D': 0.025,
    'E': 0.15,
    'F': 0.025,
    'G': 0.025,
    'H': 0.025,
    'I': 0.15,
    'J': 0.025,
    'K': 0.025,
    'L': 0.05,
    'M': 0.025,
    'N': 0.05,
    'O': 0.15,
    'P': 0.025,
    'Q': 0.01,
    'R': 0.025,
    'S': 0.05,
    'T': 0.05,
    'U': 0.015,
    'V': 0.01,
    'W': 0.01,
    'X': 0.005,
    'Y': 0.01,
    'Z': 0.005,
  };
  function chooseRandomIndex(probabilities) {
    const randomValue = Math.random();
    let cumulativeProbability = 0;
  
    for (const [letter, probability] of Object.entries(probabilities)) {
      cumulativeProbability += probability;
      if (randomValue <= cumulativeProbability) {
        return alphabet.indexOf(letter);
      }
    }
  
    return Math.floor(Math.random() * alphabet.length);
  }
  
  const generateRandomLetterArray = () => {
    const letterArray = [];
  
    for (let i = 0; i < numRows; i++) {
      const row = [];
      for (let j = 0; j < numCols; j++) {
        const randomIndex = chooseRandomIndex(letterProbabilities);
        row.push(alphabet[randomIndex]);
      }
      letterArray.push(row);
    }
  
    return letterArray;
  };

  return (
  <GameBoard letterArray = {generateRandomLetterArray()}></GameBoard>
  )
}
function Home() {
  return (
    <Homepage></Homepage>
  );
}


function App() {
  return (
    <Router>
        <Routes>
          <Route path="/play-now" element={<PlayNow/>} />
          <Route path="/" element={<Home/>} />
        </Routes>
    </Router>
  );
}

export default App;
