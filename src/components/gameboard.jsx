import "./gameboard.css";
import Navbar from "./navbar";
import React, { useState, memo, useEffect } from "react";
import WordDisplay from "./wordDisplay";
import Cancel from "./exit.png";
import Enter from "./check-mark.png";
import Disabled from "./check-mark-grey.png";
import BackButtonDisabled from "./back-button-grey.png";
import BackButton from "./back-button.png";
import { fetchUrbanDictionaryData } from "./gameboard.js";

const GameBoard = (letterArray) => {
  const [currWord, setCurrWord] = useState([]);
  const [listWords, setListWords] = useState([]);
  const [coordinates, setCoordinates] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);

  const handleRemoveLastCharacter = () => {
    if (currWord.length > 0) {
      setCurrWord(currWord.slice(0, -1));
      setCoordinates(coordinates.slice(0, -1));
    }
  };
  const handleEnterWord = () => {
    if (currWord.length <= 2) {
      return;
    }
    const searchTerm = currWord;
    const fetchData = async () => {
      console.log(searchTerm);
      try {
        const data = await fetchUrbanDictionaryData(searchTerm);
        if (data.length > 0) {
          setCurrWord([]);
          setCoordinates([]);
          setListWords((prevWordList) => [...prevWordList, currWord]);
        }
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchData();
  };

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
                    if (isHovered || currWord.length === 0) {
                      const isNewCoordinate = !coordinates.some(
                        (coord) => coord.x === rowIndex && coord.y === colIndex
                      );

                      if (isNewCoordinate) {
                        setCurrWord((prevCurrWord) => [
                          ...prevCurrWord,
                          letter,
                        ]);
                        setCoordinates((prevCoordinates) => [
                          ...prevCoordinates,
                          { x: rowIndex, y: colIndex },
                        ]);
                      }
                    }
                  }}
                  className={`gameboard-grid-item ${
                    isHovered || currWord.length === 0
                      ? "hover:bg-emerald-500"
                      : ""
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
        <div className="gameboard-grid-and-box mt-14 flex">
          {!gameStarted ? (
            <div className="italic text-center mb-4 instruction mx-3">
              {" "}
              Click on any letter to start
            </div>
          ) : (
            <div className="italic text-center mb-4 instructions mx-3">
              {" "}
              Press ☑ to submit word, ← to delete the last letter, or  ☒ to clear selection
            </div>
          )}
          <div className="flex">
            <div className="ml-20 gameboard-grid grid grid-rows-24 grid-flow-col">
              {renderGrids()}
            </div>
            <div>
              <div className="ml-10 py-1 pl-24 pr-3 gameboard-currword-box flex justify-center text-2xl font-semibold">
                <div></div>
                <p>{currWord}</p>
                <div className="flex">
                  <img
                    className="gameboard-icon"
                    onClick={handleRemoveLastCharacter}
                    src={currWord.length > 0 ? BackButton : BackButtonDisabled}
                  ></img>
                  <img
                    className="mx-3  gameboard-icon"
                    onClick={() => {
                      setCurrWord([]);
                      setCoordinates([]);
                    }}
                    src={Cancel}
                  ></img>
                  <img
                    className="gameboard-icon"
                    onClick={handleEnterWord}
                    src={currWord.length > 1 ? Enter : Disabled}
                  ></img>
                </div>
              </div>
              <div className="mt-10 ml-10 py-1 px-3 gameboard-word-box">
                <h1 className="text-center font-semibold">
                  {" "}
                  Words Found ({listWords.length}){" "}
                </h1>
                {listWords.map((word, index) => (
                  <li key={index}>{word}</li>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default memo(GameBoard);
