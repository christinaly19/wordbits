import scrabbleLetter from './scrabble-letter.png'; 
import './App.css';
import Modal from "./components/modal"
import React, { useState } from 'react';

function App() {
  const [helpOpen, setHelpOpen] = useState(false);
  return (
    <div className="App">
      <div className="app-container">
        <div className = "flex-none">
          <div className="flex flex-row justify-center">
            <img className= "m-4 logo" src={scrabbleLetter} ></img>
          </div>
          <h1 className="text-5xl font-bold"> Wordbits </h1>
          <p className="app-subtitle p-2 text-1xl"> find hidden words, guess their meaning to win</p>
          <div className="flex flex-row justify-center">
          <button
                  onClick = {()=>setHelpOpen(true)}
                  className="rounded-lg font-medium border-solid border-2 border-green-800 hover:bg-green-900 hover:text-white px-4 py-1 m-4"> How to play </button>
          <button className="rounded-lg font-medium border-solid border-2 border-green-800 hover:bg-green-900 hover:text-white px-4 py-1 m-4"> Login </button>
          <button className="rounded-lg font-medium border-solid border-2 border-green-800 hover:bg-green-900  hover:text-white px-4 py-1 m-4"> Play now </button>
          </div>
          <p className="p-2 text-sm"> Last updated: Dec 22nd 2023</p>
        </div>
      </div>
      {helpOpen && <Modal helpOpen = {helpOpen} onClose={() => setHelpOpen(false)}></Modal>}
    </div>
  );
}

export default App;
