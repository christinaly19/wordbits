import scrabbleLetter from "./components/scrabble-letter.png";
import "./components/App.css";
import Homepage from "./components/homepage";
import Modal from "./components/modal";
import Navbar from "./components/navbar";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

function PlayNow() {
  return (
      <h2>Play Now Page</h2>
  );  
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
