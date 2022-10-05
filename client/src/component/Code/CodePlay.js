import React, { useContext, useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../UserContext";
import "./CodePlay.css"

function CodePlay({ codeBlocksData }) {
  const { codeId } = useParams();
  const [currCharIndex, setCurrCharIndex] = useState(0);
  const [currInput, setCurrInput] = useState("");
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

    if (characters[currCharIndex] === key) {
      console.log("correct")
      if (DEBUG) console.log(characters[currCharIndex], key)
    } else {
      console.log("incorrect")
      if (DEBUG) console.log(characters[currCharIndex], key)
    }
    setCurrCharIndex(currCharIndex + 1);
    if (key != "Enter" && key != "Shift") {
      setCurrInput(value + key)
    }
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
          {FINALCODE.map((letter, i) => (
            <span key={i}>{letter}</span>
          ))}

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