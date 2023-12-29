import "./wordDisplay.css";
import Magnify from "./magnifying-glass.png";
import Arrow from "./right-arrow.png";
import UnfilledStar from "./unfilled-star.png";
import { useState } from "react";
export default function WordDisplay(props) {
  const [closestWords, setClosestWords] = useState([]);
  const wordString = props.word.join("");
  const [inputText, setInputText] = useState("");

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };
  const handleSubmitWord = async () => {
    try {
      const inputValue = wordString.toLowerCase();
      const response = await fetch(
        `http://127.0.0.1:5000/get_closest_embeddings?word=${inputValue}`
      );
      const data = await response.json();
      console.log(data);
      setClosestWords(data.closest_words);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleClose = () => {
    props.onClose();
}

  return (
    <div className="display-main">
      <div className="flex justify-end">
        <button onClick={handleClose} className="display-close bg-red-600 font-semibold text-white flex justify-center">
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
        <div
          className="bg-gradient-to-r bg-emerald-300/50 mt-3 display-first-hint display-hint-box py-3 px-4 flex justify-between
            hover:font-semibold hover:border 
            hover:from-teal-300/50 hover:to-emerald-300/50"
        >
          <p className=""> Reveal hint #1</p>
          <img className="display-arrow-logo" src={Arrow}></img>
        </div>
        <div
          className="bg-gradient-to-r bg-emerald-500/50 my-3 display-second-hint display-hint-box p-3 px-4 flex justify-between
               hover:font-semibold hover:border
               hover:from-teal-300/50 hover:to-emerald-500/50"
        >
          <p className=""> Reveal hint #2</p>
          <img className="display-arrow-logo" src={Arrow}></img>
        </div>
        <div
          className="bg-gradient-to-r bg-emerald-600/60 display-third-hint display-hint-box p-3 px-4 flex justify-between 
            hover:font-semibold hover:border
            hover:from-teal-300/50 hover:to-emerald-600/60"
        >
          <p> Reveal hint #3</p>
          <img className="display-arrow-logo" src={Arrow}></img>
        </div>
        <div className="text-gray-700 flex flex-col">
          <h1 className="mt-4 italic"> Enter a synonym or related word:</h1>
          <div className="display-syn-box mt-2 flex justify-between">
            <div>
              <input
                className="text-base border-2 py-2 px-4"
                placeholder="Enter word here"
                value={inputText} // Controlled input using state
                onChange={handleInputChange}
              ></input>
              <button
                disabled={inputText === ""}
                onClick={handleSubmitWord}
                className={`font-semibold display-submit-button border py-2 mx-3 px-4 hover:bg-emerald-600 hover:text-white disabled:opacity-60
                ${(inputText === "") ? "hover:text-emerald-600 hover:bg-transparent" : ""}
                `}
              >
                {" "}
                Submit{" "}
              </button>
            </div>
            {/* <img className="display-star-logo"src={UnfilledStar}></img> */}
          </div>
        </div>
      </div>
    </div>
  );
}
