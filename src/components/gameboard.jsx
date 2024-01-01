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
  const [definitions, setDefinitions] = useState([]);
  const [coordinates, setCoordinates] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [warning, setWarning] = useState(false);
  const [showDisplay, setShowDisplay] = useState(false);
  const [allSyn, setAllSyn] = useState([]);

  useEffect(() => {
    if (warning) {
      const timeoutId = setTimeout(() => {
        setWarning(false);
      }, 2000);
      return () => clearTimeout(timeoutId);
    }
  }, [warning]);
  const addShake = () => {
    const element = document.getElementById("shakeable-wordbox");
    element.classList.add("shake");
    setTimeout(() => {
      element.classList.remove("shake");
    }, 720);
  };
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
      try {
        const data = await fetchUrbanDictionaryData(searchTerm);
        if (data.length > 0) {
          console.log(data);
          setShowDisplay(true);
          setCoordinates([]);
          setListWords((prevWordList) => [...prevWordList, currWord.join('')]);
          setDefinitions((prevDefinitions) => [...prevDefinitions, data])
          const newSyn = [];
          data.forEach(item => {
            item.meanings.forEach(meaning => {
              newSyn.push(...meaning.synonyms);
            });
          });
          setAllSyn((prevSyn) => {
            return [newSyn];
          });
        } else {
          addShake();
          setWarning(true);
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
                    if  ((isHovered || currWord.length === 0) && (!showDisplay)) {
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
                    ((isHovered || currWord.length === 0) && (!showDisplay))
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
      <div className={`gameboard-main ${showDisplay ? "darken" : ""}`}>
        <Navbar></Navbar>
        <div className="gameboard-grid-and-box mt-16 flex">
          {!gameStarted ? (
            <div className="italic text-center mb-4 instruction mx-3">
              {" "}
              Click on any letter to start. Valid words are 3 or more letters
              long!
            </div>
          ) : (
            <div className="italic text-center mb-4 instructions mx-3">
              {" "}
              Press ☑ to submit word, ← to delete the last letter, or ☒ to clear
              selection
            </div>
          )}
          <div className="flex justify-center">
            <div className="gameboard-grid grid grid-rows-24 grid-flow-col">
              {renderGrids()}
            </div>
            <div>
              <div
                id="shakeable-wordbox"
                className={`mb-3 ml-10 py-1 pl-24 pr-3 gameboard-currword-box flex justify-center text-2xl font-semibold  ${showDisplay ? "no-box-shadow" : ""}`}
              >
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
                    onClick={() => {
                      console.log(listWords);
                      if (!listWords.includes(currWord.join(''))) {
                        handleEnterWord()};
                      }}
                    src={currWord.length > 1 ? Enter : Disabled}
                  ></img>
                </div>
              </div>
              <div
                className={`warning-message ml-10 text-xs text-rose-600 text-center  ${
                  warning ? "visible" : ""
                }`}
              >
                {" "}
                Sorry, that is not a valid word{" "}
              </div>
              <div className={`mt-4 ml-10 py-1 px-3 gameboard-word-box ${showDisplay ? "no-box-shadow" : ""}`}>
                <h1 className="text-center font-semibold">
                  {" "}
                  Words Found ({listWords.length}){" "}
                </h1>
                {listWords.map((word, index) => (
                  <div className={`gameboard-wordbox-row text-base p-2 font-semibold mx-3 my-3  ${showDisplay ? "wordbox-darken ": ""}`}>
                    <div key={index}>{word}</div>
                    <p className="font-normal text-xs"> 
                    {definitions[index][0].phonetic} </p>
                    <p className="font-normal text-xs"> {definitions[index][0].meanings[0].definitions[0].definition} </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {showDisplay &&
          <WordDisplay onClose={()=> {setShowDisplay(false); setCoordinates([]); setCurrWord([])}} allSyn = {allSyn} word={currWord}></WordDisplay>
        }  
      </div>
    </>
  );
};
export default memo(GameBoard);
