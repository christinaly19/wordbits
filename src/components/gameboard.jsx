import "./gameboard.css";
import Navbar from "./navbar";
import React, { useState, memo, useEffect } from "react";
import WordDisplay from "./wordDisplay";
const GameBoard = (letterArray) => {
  const [currWord, setCurrWord] = useState([]);

  const renderGrids = () => {
    const twoDArray = letterArray.letterArray;
    return twoDArray.map((row, rowIndex) => (
      <div key={rowIndex} className="grid-row">
        {Array.isArray(row)
          ? row.map((letter, colIndex) => (
              <div
                key={colIndex}
                onClick={() =>
                  setCurrWord((prevCurrWord) => [...prevCurrWord, letter])
                }
                className="gameboard-grid-item hover:bg-emerald-600"
              >
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
          <div>
            <div className="ml-10 py-1 px-3 gameboard-currword-box flex justify-center mt-5 text-2xl font-semibold">
              {currWord}
            </div>
            <div className="flex justify-center ml-10 py-1 px-3 gameboard-word-box">
              <div className="flex justify-center"></div>
              <h1 className="font-semibold"> Words Found (0) </h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default memo(GameBoard);
