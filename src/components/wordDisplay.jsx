import "./wordDisplay.css";
import Magnify from "./magnifying-glass.png";
import Arrow from "./right-arrow.png";
import UnfilledStar from "./unfilled-star.svg";
import { useState, useEffect } from "react";
import FilledStar from "./star.svg";
import ClipLoader from "react-spinners/ClipLoader";

export default function WordDisplay(props) {
  const [closestWords, setClosestWords] = useState([]);
  const wordString = props.word.join("");
  const [inputText, setInputText] = useState("");
  const [isCorrect, setisCorrect] = useState(false);
  let [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#059669");
  const [disabled, setDisabled] = useState(true);
  const [reveal, setReveals ] = useState([false, false, false]);

  function handleReveal(number) {
    setReveals(prevReveals => {
      const newReveals = [...prevReveals];
      newReveals[number] = true;
      return newReveals;
    });
  }

  useEffect(() => {
    getClosestWords();
  }, []);

const override = {
  position: "relative",
  top: "5px",
  left: "10px"
};

  useEffect(() => {
    if (loading) {
      const timeoutId = setTimeout(() => {
        setLoading(false);
      }, 2000);
      return () => clearTimeout(timeoutId);
    }
  }, [loading]);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const getClosestWords = async () => {
    try {
      const searchTerm = wordString.toLowerCase();
      console.log(searchTerm);
      const response = await fetch(
        `http://127.0.0.1:5000/get_closest_embeddings?word=${searchTerm}`
      );
      const data = await response.json();
      setClosestWords(data.closest_words);
      setDisabled(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmitWord = async () => {
    const containsInputText = closestWords.includes(inputText.toLowerCase());
    const containsWord = closestWords.some(
      (word) => word === inputText.toLowerCase()
    );
    const isInSyns = props.allSyn[0]
      .map((syn) => syn.toLowerCase())
      .includes(inputText.toLowerCase());
      if (containsInputText || containsWord || isInSyns) {
        setTimeout(() => {
          setisCorrect(true);
        }, 2000);
      }
    setLoading(true);
  };

  const handleClose = () => {
    props.onClose();
  };

  return (
    <div className="display-main">
      <div className="flex justify-end">
        <button
          onClick={handleClose}
          className="display-close bg-red-600 font-semibold text-white flex justify-center"
        >
          <p className="text-xs"> x </p>
        </button>
      </div>
      <div className="mt-2 px-5">
        <div className="search-term-box flex justify-between align-middle py-2 pl-4 pr-3">
          <h1 className="text-xl display-word-header font-semibold">
            {" "}
            {wordString}{" "}
          </h1>
          <img className="display-search-logo" src={Magnify}></img>
        </div>
      <div className="">
        {!reveal[0] ? (
        <div
          onClick = {() => handleReveal(0)}
          className="bg-gradient-to-r bg-emerald-300/50 mt-3 display-first-hint display-hint-box py-3 px-4 flex justify-between
            hover:font-semibold hover:border 
            hover:from-teal-300/50 hover:to-emerald-300/50"
        >
          <p className=""> Reveal hint #1</p>
          <img className="display-arrow-logo" src={Arrow}></img>
        </div>
        ) : (
          <div className="my-3 display-second-hint display-hint-box hint-revealed p-3 px-4">
            <h1> {wordString} is a <mark> {props.partOfSpeech} </mark></h1>
          </div>
        )
       }
       
       {!reveal[1] ? (
        <div
        onClick = {() => handleReveal(1)}
          className="bg-gradient-to-r bg-emerald-500/50 my-3 display-second-hint display-hint-box p-3 px-4 flex justify-between
               hover:font-semibold hover:border
               hover:from-teal-300/50 hover:to-emerald-500/50"
        >
          <p className=""> Reveal hint #2</p>
          <img className="display-arrow-logo" src={Arrow}></img>
        </div>
       ) : (
        <div className="my-3 display-second-hint display-hint-box hint-revealed p-3 px-4">
        <p> {wordString} has <mark> {props.numDef} possible definition(s) </mark></p>
        </div>
       )
        }
      {!reveal[2] ? (
        <div
        onClick = {() => handleReveal(2)}
          className="bg-gradient-to-r bg-emerald-600/60 display-third-hint display-hint-box p-3 px-4 flex justify-between 
            hover:font-semibold hover:border
            hover:from-teal-300/50 hover:to-emerald-600/60"
        >
          <p> Reveal hint #3</p>
          <img className="display-arrow-logo" src={Arrow}></img>
        </div>
      ) : (
        <div className="my-3 display-second-hint display-hint-box p-3 px-4 hint-revealed">
        <p> <mark>{wordString}: </mark> {props.hintDef} </p>
        </div>
      )}
      </div>
        <div className="px-2 text-gray-700 flex flex-col">
          <h1 className="mt-4 italic"> Enter a synonym or related word:</h1>
          <div className="display-syn-box mt-2 flex justify-between">
            <div>
              <input
                className="display-input-text text-base border-2 py-2 px-4"
                placeholder="Enter word"
                value={inputText}
                onChange={handleInputChange}
              ></input>
           
              <ClipLoader
                color={color}
                loading={loading}
                size={25}
                cssOverride={override}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
    
              {!loading && (
                <button
                  disabled={inputText === "" || disabled} // disabled until call to getclosestwords is complete
                  onClick={handleSubmitWord}
                  className="font-semibold display-submit-button py-2 mx-3 px-4"
                >
                  {" "}
                  Submit{" "}
                </button>
              )
              }
            </div>
            <img
              className="display-star-logo"
              src={isCorrect ? FilledStar : UnfilledStar}
            ></img>
          </div>
        </div>
      </div>
    </div>
  );
}
