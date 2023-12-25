import "./gameboard.css";
import Navbar from "./navbar";
import React, { useState, memo, useEffect } from "react";
import WordDisplay from "./wordDisplay";
const GameBoard = (letterArray) => {
  const [currWord, setCurrWord] = useState([]);
  const [coordinates, setCoordinates] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    if (coordinates.length === 0) {
      setGameStarted(false);
    } else {
      setGameStarted(true);
    }
  }, [coordinates]);

  const isAdjacent = (x1, y1, x2, y2) => {
    return (
      Math.abs(x1 - x2) <= 1 &&
      Math.abs(y1 - y2) <= 1 &&
      !(x1 === x2 && y1 === y2)
    );
  };
  useEffect(() => {
    console.log(coordinates);
  }, [coordinates]);
  const renderGrids = () => {
    const twoDArray = letterArray.letterArray;
    return twoDArray.map((row, rowIndex) => (
      <div key={rowIndex} className="grid-row">
        {Array.isArray(row)
          ? row.map((letter, colIndex) => {
              const isHovered = coordinates.some((coord) =>
                isAdjacent(coord.x, coord.y, rowIndex, colIndex)
              );

              return (
                <div
                  key={colIndex}
                  onClick={() => {
                    setCurrWord((prevCurrWord) => [...prevCurrWord, letter]);
                    setCoordinates((prevCoordinates) => [
                      ...prevCoordinates,
                      { x: rowIndex, y: colIndex },
                    ]);
                  }}
                  className={`gameboard-grid-item ${
                    isHovered ? "hover:bg-emerald-600" : ""
                  } ${
                    coordinates.some(
                      (coord) => coord.x === rowIndex && coord.y === colIndex
                    )
                      ? "selected"
                      : ""
                  }`}
                >
                  {letter}
                </div>
              );
            })
          : null}
      </div>
    ));
  };
  return (
    <>
      <div className="gameboard-main">
        <Navbar></Navbar>
        {!gameStarted ?
        <div className="italic text-center instructions mt-5"> Click on any letter to start</div> :
        <div className="italic text-center instructions mt-5"> Press to enter or clear</div> 
        }
        <div className="gameboard-grid-and-box mt-5 flex">
          <div className="ml-20 gameboard-grid grid grid-rows-24 grid-flow-col">
            {renderGrids()}
          </div>
          <div>
            <div className="ml-10 py-1 px-3 gameboard-currword-box flex justify-center text-2xl font-semibold">
              {currWord}
            </div>
            <div className="mt-10 flex justify-center ml-10 py-1 px-3 gameboard-word-box">
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
