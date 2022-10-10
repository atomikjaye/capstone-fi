import React, { useContext, useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { UserContext, CodeContext } from "../../UserContext";
import CodeTimer from "./CodeTimer";
import "./CodePlay.css"
import Review from "../Review/Review";
import ReviewList from "../Review/ReviewList";
import { NavLink, useNavigate } from "react-router-dom";

function CodePlay({ codeBlocksData }) {
  const navigate = useNavigate();
  const { codeContext, setCodeContext } = useContext(CodeContext);

  const COUNTDOWN_SECONDS = 30;
  // is game finished

  const [isFinished, setIsFinished] = useState(false);

  const { timeLeft, startCountdown, resetCountdown } = CodeTimer(COUNTDOWN_SECONDS);

  const { codeId } = useParams();
  // Index for currInput
  const [currCharIndex, setCurrCharIndex] = useState(0);
  // Current Input
  const [currInput, setCurrInput] = useState("");



  // Set Finished to true if timeLeft is 0
  // if (timeLeft >= 0) {
  //   setIsFinished(true)
  // }

  // Counter for Points
  const [correctCounter, setCorrectCounter] = useState(0);
  let DEBUG = true;

  //**  FOR PRETTY CONSOLES
  const CURRENT_INDEX_CONSOLE = `background-color: #E22134; padding: 0.3rem 1.5rem; font-family: Roboto; font-size: 1.2em; line-height: 1.4em; color: white;`
  const CURRENT_CORRECT_CONSOLE = `background-color: #60c19b; padding: 0.3rem 1.5rem; font-family: Roboto; font-size: 1.2em; line-height: 1.4em; color: white;`

  // Put input in focus on keydown
  // Count Up Timer
  // const codeInputField = () => {
  //   return <input type="text" className="input-field" onChange={handleChange} onKeyDown={handleKeyDown} />
  // }
  let codeInputField = useRef(null);

  const setCodeContextFunc = () => {
    let localCodeList = JSON.parse(localStorage.getItem('singleCode'));
    // if codeListContext exist.. else
    console.log("setCODECONTEXTFUNC", localCodeList)
    // if (codeContext) {
    //   // debugger
    //   localStorage.setItem('singleCode', JSON.stringify(codeContext));
    //   console.log("CODE BEING SET to local Storage", codeContext)

    //   return codeContext
    // } else if (localCode) {
    //   setCodeContext(localCode)
    //   console.log("LOCALCODE is set, setting setCodeContext()", codeContext)

    //   return codeContext
    // } else if (codeContext == null) {
    //   console.log("NO CODE")
    //   // navigate('/code-home')
    // }
  }





  console.log("CODE CONTEXT CodePlay", codeContext)

  const stateCode = codeContext ? codeContext.code_block : false
  const localCode = JSON.parse(localStorage.getItem('singleCode'))

  const CODEOBJ = codeContext ? codeContext : localCode
  console.log("CODEBLOCK", CODEOBJ)

  useEffect(() => {
    setCodeContext(JSON.parse(localStorage.getItem('singleCode')))

    // setCodeContextFunc();
    console.log("CODE CONTEXT IS CALLED")
  }, [])

  let strippedCode = CODEOBJ.code_block.replaceAll(/\/\*([\s\S]*?)\*\//g, "");
  // Infinitw call w/o dependency
  // useEffect(() => {
  //   codeInputField.current.focus();
  //   console.log("%c RELOADING...", CURRENT_CORRECT_CONSOLE)
  //   console.log(`This is the currentCharIndex: ${currCharIndex} + this is the correctCounter ${correctCounter}`)
  // }, [currCharIndex, correctCounter])


  // useEffect(() => {
  //   if (!timeLeft) {
  //     console.log("Time is up!")
  //   }
  // })

  // const user = useContext(UserContext);
  // if (DEBUG) console.log(codeBlocksData);
  const codeBlock = codeContext
  //****** SET SINGULAR CODE CODECONTEXT */
  //****** SET SINGULAR CODE CODECONTEXT */


  //****** SET SINGULAR CODE CODECONTEXT */
  //****** SET SINGULAR CODE CODECONTEXT */



  // const codeBlock = codeBlocksData.find(code => code.id == codeId);


  // let strippedCode = codeBlock.code_block;
  // let strippedCode = codeBlock.code_block.replaceAll(/\/\*([\s\S]*?)\*\//g, "");
  let FINALCODE = strippedCode.split("");
  let points = CODEOBJ.points


  // function codeHTML() {
  //   strippedCode.split("").forEach((char, index) => {
  //     let spanTag = `< span key = ${ char }_${ index } > ${ char }</span > `;
  //     FINALCODE += spanTag;
  //   })
  // }

  // WORK ON INPUT FIELD
  // const handleChange = (e) => {
  //   setCurrInput(e.target.value);
  // }

  // const handleKqeyDown = (e) => {
  //   if (DEBUG) console.log(e.key);
  //   if (DEBUG) console.log(e);
  //   if (DEBUG) console.log("CODE INPUT: ", currInput)

  //   // Handle match
  //   const characters = strippedCode;
  //   let typedChar = currInput.split("");
  //   // if (DEBUG) console.log(strippedCode);
  //   if (DEBUG) console.log("TYPED CHARACTER", typedChar);
  //   // if backspace, lessed index
  //   // if tab. add to index and spaces.

  //   if (characters[currCharIndex] === typedChar) {
  //     if (DEBUG) console.log("correct");
  //     if (DEBUG) console.log(currCharIndex)
  //     if (DEBUG) console.log(characters[currCharIndex], typedChar);
  //   } else {
  //     if (DEBUG) console.log("incorrect");
  //     if (DEBUG) console.log("Current Index", currCharIndex)
  //     if (DEBUG) console.log("Compare codeString to currTyped", characters[currCharIndex], typedChar);
  //   }
  //   setCurrCharIndex(currCharIndex => currCharIndex + 1);
  //   if (DEBUG) console.log(currCharIndex);
  // }

  const handleReset = () => {
    // Index for currInput
    setCurrCharIndex(0)
    // Current Input
    setCurrInput("")
    // Counter for Points
    setCorrectCounter(0)
    resetCountdown()

    // get ARRAY OF SPAN CLASSES
    //REMOVE CLASSES
    let spanCode = document.querySelectorAll(`span`);
    console.log(spanCode)

    for (let i = 0; i < spanCode.length; i++) {
      spanCode[i].classList.remove('incorrect');
      spanCode[i].classList.remove('correct');
      spanCode[i].classList.remove('current');
    }
  }


  const handleKeyDown = (e) => {
    startCountdown();
    // setCurrInput(e.target.value)
    // debugger
    const { value } = e.target;
    const { key } = e;
    const { keyCode } = e;
    const { repeat } = e;

    // If keycode is in a certain range for letters and numbers

    if (DEBUG) console.log("BEFORE", e.target.value, e)
    // Assigning characters to FINALCODE ARRAY
    const characters = FINALCODE;
    // Making currInput an ARRAY
    // let typedChar = value.split("")[currCharIndex];
    // debugger
    // if (DEBUG) console.log("TYPED CHAR ARRAY", currInput.split(""))
    // if (DEBUG) console.log("TYPED CHAR Index", typedChar)
    // if (DEBUG) console.log(`% cINDEX + ${ currCharIndex }`, CURRENT_INDEX_CONSOLE)

    // We testing what inputs are taken in
    // all numbers and letters
    // 48 - 90
    // 186 > 222 random stuff





    //if ((key > 48 && key < 90) || (key >= 186 && key <= 222))  // Include Only letters and symbols
    // ^ Letters & Numbers     ^ Symbols
    // if ((key >= 8 && key <= 46) || (key >= 91 && key <= 145)) // LETTERS and symbols ONLY
    //    

    // if (repeat !== true && (key != "Enter" && key != "Shift" && key != "Tab" && key != "Control")) {
    if (repeat !== true &&
      !(
        (keyCode >= 9 && keyCode <= 31) ||
        (keyCode >= 33 && keyCode <= 46) ||
        (keyCode >= 91 && keyCode <= 145))) {
      // If character is a backspace and the Index is >= "0"
      if (keyCode === 8 && currInput.length >= 0) {
        if (DEBUG) console.log("*********************************************************")
        if (DEBUG) console.log("CURRENT INPUT BEFORE BACKSPACE", currInput)
        if (DEBUG) console.log("SUBSTRING", currInput.substring(0, currInput.length - 1))

        // FINAL COMMENT: Here we reassign currInput to the string minus last character
        let newCurrInput = currInput.slice(0, -1)
        setCurrInput(newCurrInput);

        if (DEBUG) console.log("CURRENT INPUT AFTER BACKSPACE", currInput)
        if (DEBUG) console.log("CURRENT INDEX BEFORE IN BACKSPACE", currCharIndex)
        // remove one from correct

        // FINAL COMMENT: Here we get the current index - 1 (state isn't updating quickly enough)
        const newCharIndex = currCharIndex - 1;
        // maybe keep track of backspaces for points
        if (DEBUG) console.log("currInput ARRAY IN Backspace", currInput.split(""))

        // FINAL COMMENT: We query select from document 
        let characterSpan = document.querySelector(`span.${"index-" + newCharIndex}`);
        let nextCharacterSpan = document.querySelector(`span.${"index-" + (newCharIndex + 1)}`);

        // there is no spanClass, we skip adding or removing class from list
        if (characterSpan !== null) {
          characterSpan.classList.remove('correct');
          characterSpan.classList.remove('incorrect');
          characterSpan.classList.remove('current');
          characterSpan.classList.add('current');
          nextCharacterSpan.classList.remove('current');
          // Here we update Index and Correct Counter
          setCurrCharIndex(currInput.length - 1);
          if (DEBUG) console.log(`%c Current Index after class removal ${currCharIndex}`, CURRENT_INDEX_CONSOLE)
          setCorrectCounter(correctCounter - 1);
          if (DEBUG) console.log(`%c Current Index after class removal ${correctCounter}`, CURRENT_CORRECT_CONSOLE)
        }


        if (DEBUG) console.log("SPAN", document.querySelector(`span.${"index-" + currCharIndex}`));
        if (DEBUG) console.log("CURRENT INDEX BEFORE IN BACKSPACE", currCharIndex)
        // debugger
        if (DEBUG) console.log("*********************************************************")
        // setCurrInput(currInput.s)

      } else {
        let characterSpan = document.querySelector(`span.${"index-" + currCharIndex}`);
        let previousCharacterSpan = document.querySelector(`span.${"index-" + (currCharIndex - 1)}`);
        if (DEBUG) console.log(keyCode);
        if (characters[currCharIndex] === key) {

          if (DEBUG) console.log("correct")
          // Init to inactive
          // Ad person types it's either correct or incorrect
          // change class
          // If currCharIndex is correct, add to the classList
          //
          characterSpan.classList.add('correct');

          // Cursor logic
          if (previousCharacterSpan !== null) {
            previousCharacterSpan.classList.remove('current');
            console.log("PREVIOUS", previousCharacterSpan)
            characterSpan.classList.add('current');
          }

          // add to correctCounter and do some math to calculate points
          setCorrectCounter(correctCounter + 1);
          if (DEBUG) console.log("CORRECT", correctCounter);
          if (DEBUG) console.log(characters[currCharIndex], key)
        } else {
          if (DEBUG) console.log(keyCode);
          if (DEBUG) console.log("incorrect")
          characterSpan.classList.add('incorrect');

          if (previousCharacterSpan !== null) {
            previousCharacterSpan.classList.remove('current');
            console.log("PREVIOUS", previousCharacterSpan)
            characterSpan.classList.add('current');
          }

          if (DEBUG) console.log(characters[currCharIndex], key)
        }
        setCurrCharIndex(currInput.length + 1);
        setCurrInput(value + key)
      }
    }
    // if key is repeated,do not add to index
    // if key is any Shift... do not add to the Index
    if (key != "Enter" && key != "Shift" && key != "Tab") {
    }

    // If ley is backspace, -1 from index, and find item in document and remove class name

    if (DEBUG) console.log("AFTER", currInput)


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

  const $code = document.querySelector('.typing-text');
  console.log($code)
  /// AUTO SCROLL
  const autoscroll = () => {

  }


  // Set Finished to true if timeLeft is 0
  if (timeLeft <= 0) {
    // setIsFinished(true)
    resetCountdown()
  }




  return (
    <>
      <div className="nes-container with-title is-rounded">
        <h2 className="title">Play</h2>
        <div className="is-centered">

          <div className="typing-score-display">Total Points: {points}</div>
          {/* <CountUpTimer = {timeLeft} /> */}
          {CountUpTimer(30)}
          <input ref={codeInputField} className="input-field" value={currInput} onKeyDown={handleKeyDown} />
          <pre onClick={handleClickCode} className="typing-text wordwrap">
            {FINALCODE.map((letter, i) => {
              if (letter == " ") {
                letter = "•";
                return <span key={i} className={"space index-" + i}>{letter}</span>
              } else if (letter == "\n") {
                letter = "↵";
                return <span key={i} className={"space index-" + i}>{letter + "\n"}</span>
              }
              else {

                return <span key={i} className={"index-" + i}>{letter}</span>
              }
            }
            )}

          </pre>


          {/* <button className="nes-btn is-primary">Play Again</button> */}
          <Link to="/">
            <button className="nes-btn is-error">Go Home</button>
          </Link>
          &nbsp;
          <button className="nes-btn" onClick={() => handleReset()}>Reset</button>
          <div></div>
        </div>
      </div>

      <ReviewList codeId={codeId} />
    </>
  )

}

export default CodePlay;