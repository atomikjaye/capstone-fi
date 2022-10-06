import React, { useContext, useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../UserContext";
import "./CodePlay.css"

function CodePlay({ codeBlocksData }) {
  const { codeId } = useParams();
  const [currCharIndex, setCurrCharIndex] = useState(0);
  const [currInput, setCurrInput] = useState("");
  const [correctCounter, setCorrectCounter] = useState(0);
  let DEBUG = true;

  // Put input in focus on keydown
  // Count Up Timer
  // const codeInputField = () => {
  //   return <input type="text" className="input-field" onChange={handleChange} onKeyDown={handleKeyDown} />
  // }
  let codeInputField = useRef(null);

  useEffect(() => {
    codeInputField.current.focus();
  })

  // const user = useContext(UserContext);
  // if (DEBUG) console.log(codeBlocksData);

  const codeBlock = codeBlocksData.find(code => code.id == 1);
  let strippedCode = codeBlock.code_block;
  // let strippedCode = codeBlock.code_block.replaceAll(/\/\*([\s\S]*?)\*\//g, "");
  let FINALCODE = strippedCode.split("");

  // function codeHTML() {
  //   strippedCode.split("").forEach((char, index) => {
  //     let spanTag = `<span key=${char}_${index}>${char}</span>`;
  //     FINALCODE += spanTag;
  //   })
  // }

  // WORK ON INPUT FIELD
  // const handleChange = (e) => {
  //   setCurrInput(e.target.value);
  // }

  const handleKqeyDown = (e) => {
    if (DEBUG) console.log(e.key);
    if (DEBUG) console.log(e);
    if (DEBUG) console.log("CODE INPUT: ", currInput)

    // Handle match
    const characters = strippedCode;
    let typedChar = currInput.split("");
    // if (DEBUG) console.log(strippedCode);
    if (DEBUG) console.log("TYPED CHARACTER", typedChar);
    // if backspace, lessed index
    // if tab. add to index and spaces.

    if (characters[currCharIndex] === typedChar) {
      if (DEBUG) console.log("correct");
      if (DEBUG) console.log(currCharIndex)
      if (DEBUG) console.log(characters[currCharIndex], typedChar);
    } else {
      if (DEBUG) console.log("incorrect");
      if (DEBUG) console.log("Current Index", currCharIndex)
      if (DEBUG) console.log("Compare codeString to currTyped", characters[currCharIndex], typedChar);
    }
    setCurrCharIndex(currCharIndex => currCharIndex + 1);
    if (DEBUG) console.log(currCharIndex);
  }

  const handleKeyDown = (e) => {
    // setCurrInput(e.target.value)
    // debugger
    const { value } = e.target;
    const { key } = e;
    const { keyCode } = e;
    const { repeat } = e;

    // If keycode is in a certain range for letters and numbers

    console.log("BEFORE", e.target.value, e)
    // Assigning characters to FINALCODE ARRAY
    const characters = FINALCODE;
    // Making currInput an ARRAY
    let typedChar = value.split("")[currCharIndex];
    // debugger
    console.log("TYPED CHAR ARRAY", currInput.split(""))
    console.log("TYPED CHAR Index", typedChar)
    console.log("INDEX", currCharIndex)

    // We testing what inputs are taken in
    // all numbers and letters
    // 48 - 90
    // 186 > 222 random stuff





    //if ((key > 48 && key < 90) || (key >= 186 && key <= 222))  // Include Only letters and symbols
    // ^ Letters & Numbers     ^ Symbols
    // if ((key >= 8 && key <= 46) || (key >= 91 && key <= 145)) // LETTERS and symbols ONLY
    //    

    // if (repeat !== true && (key != "Enter" && key != "Shift" && key != "Tab" && key != "Control")) {
    if (repeat !== true && !((keyCode >= 8 && keyCode <= 31) || (keyCode >= 33 && keyCode <= 46) || (keyCode >= 91 && keyCode <= 145))) {
      console.log(keyCode);
      if (characters[currCharIndex] === key) {
        console.log("correct")
        // Init to inactive
        // Ad person types it's either correct or incorrect
        // change class
        // If currCharIndex is correct, add to the classList
        //
        document.querySelector(`span.${"index-" + currCharIndex}`).classList.add('correct');
        // add to correctCounter and do some math to calculate points
        setCorrectCounter(correctCounter + 1);
        if (DEBUG) console.log("CORRECT", correctCounter);
        if (DEBUG) console.log(characters[currCharIndex], key)
      } else {
        console.log(keyCode);
        console.log("incorrect")
        document.querySelector(`span.${"index-" + currCharIndex}`).classList.add('incorrect');
        if (DEBUG) console.log(characters[currCharIndex], key)
      }
      setCurrCharIndex(currCharIndex + 1);
      setCurrInput(value + key)
    }
    // if key is repeated,do not add to index
    // if key is any Shift... do not add to the Index
    if (key != "Enter" && key != "Shift" && key != "Tab") {
    }

    // If ley is backspace, -1 from index, and find item in document and remove class name

    console.log("AFTER", currInput)


  }

  // If focus is removed from input, you ca click the code and regain focus
  const handleClickCode = (e) => {
    if (DEBUG) console.log(e.target.value)
    codeInputField.current.focus();
  }

  const typingMatch = () => {

  }


  // Add HTML for code block
  // codeHTML();

  // Count Up Timer
  const CountUpTimer = (time) => {
    return <div className="nes-badge"><span className="is-warning">Time: {time}</span></div>
  }




  return (
    <>
      <div className="nes-container with-title is-centered is-rounded">

        <div className="typing-score-display">100</div>
        {CountUpTimer(100)}
        <input ref={codeInputField} className="input-field" value={currInput} onKeyDown={handleKeyDown} />
        <pre onClick={handleClickCode} className="typing-text">
          {FINALCODE.map((letter, i) => {

            if (letter == " ") {
              letter = "•";
              return <span key={i} className={"space index-" + i}>{letter}</span>
            }
            return <span key={i} className={"index-" + i}>{letter}</span>
          }
          )}

        </pre>


        <button className="nes-btn is-primary">Play Again</button>
        <button className="nes-btn is-error">Go Home</button>
        <button className="nes-btn">&#8635;</button>
        <div></div>

      </div>
    </>
  )

}

export default CodePlay;