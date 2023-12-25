import "./gameboard.css";
import Navbar from "./navbar";
import React, { useState, memo, useEffect } from "react";
import WordDisplay from "./wordDisplay";
const GameBoard = (letterArray) => {
const [currWord, setCurrWord] = useState([]);

  const renderGrids = () => {
    const twoDArray = letterArray.letterArray
    return twoDArray.map((row, rowIndex) => (
      <div key={rowIndex} className="grid-row">
        {Array.isArray(row)
          ? row.map((letter, colIndex) => (
              <div
                key={colIndex}
                onClick={() => setCurrWord((prevCurrWord) => [...prevCurrWord, letter])}
                className="gameboard-grid-item hover:bg-emerald-600">
                {letter}
              </div>
            ))
          : null}
      </div>
    ));
  };
  return (
    <>
      <div className="gameboard-main">
        <Navbar></Navbar>
        <div className="gameboard-grid-and-box flex">
          <div className="ml-20 gameboard-grid grid grid-rows-24 grid-flow-col">
            {renderGrids()}
          </div>
          <div className="flex justify-center ml-14 px-4 gameboard-word-box">
            <h1 className="font-semibold"> Found Words </h1>
          </div>
        </div>
        <div className="flex justify-center">
        <div className="gameboard-currword-box flex justify-center mt-5 text-2xl font-semibold"> {currWord} </div>
        </div>
      </div>
    </>
  );
};
export default memo(GameBoard);
