import React, { useContext, useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { UserContext, CodeContext } from "../../UserContext";
import CodeTimer from "./CodeTimer";
import "./CodePlay.css"
import Review from "../Review/Review";
import ReviewList from "../Review/ReviewList";
import { NavLink, useNavigate } from "react-router-dom";
import CharacterDisplay from "./CodePlayComponents/CharacterDisplay";
import KeyboardEngine from "./CodePlayComponents/KeyboardEngine";

// let State = "start" || "run" || "finish"

function CodePlay({ codeBlocksData }) {
  /* STATE STUFF */
  const [state, setState] = useState("start")
  const {
    currInput,
    keydownHandler,
    totalTyped,
    backspaceCount,
    currentIndex,
    countErrors,
    calcAccuracy,
    clearInput,
    resetCounters,
  } = KeyboardEngine(state !== "finish");
  const isStarting = state === "start" && currentIndex > 0

  // Code Stuff
  const { codeContext, setCodeContext } = useContext(CodeContext);
  const { codeId } = useParams();
  const localCode = JSON.parse(localStorage.getItem('singleCode'))
  const CODEOBJ = codeContext ? codeContext : localCode
  let strippedCode = CODEOBJ.code_block.replaceAll(/\/\*([\s\S]*?)\*\//g, "");
  let FINALCODE = strippedCode.split("");

  // Timer Stuff
  const COUNTDOWN_SECONDS = 30;
  const { timeLeft, startCountdown, resetCountdown } = CodeTimer(COUNTDOWN_SECONDS);


  // SCORE STUFF
  const [errors, setErrors] = useState(0)
  const sumErrors = () => {
    const totalTypedCode = strippedCode.substring(0, currentIndex);
    setErrors((prevErrors) => prevErrors + countErrors(currInput, totalTypedCode))
  }

  // Navigation Stuff
  const navigate = useNavigate();


  // is game finished
  const [currCharIndex, setCurrCharIndex] = useState(0);

  // const [isFinished, setIsFinished] = useState(false);


  // Index for currInput
  // Current Input
  // const [currInput, setCurrInput] = useState("");



  // Set Finished to true if timeLeft is 0
  // if (timeLeft >= 0) {
  //   setIsFinished(true)
  // }

  // Counter for Points
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
    // console.log("setCODECONTEXTFUNC", localCodeList)
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

  // const stateCode = codeContext ? codeContext.code_block : false


  useEffect(() => {
    setCodeContext(JSON.parse(localStorage.getItem('singleCode')))

    // setCodeContextFunc();
    console.log("CODE CONTEXT IS CALLED")
  }, [])

  //When user types first letter (i.e. currentIndex > 0) Start Countdown.
  useEffect(() => {
    if (isStarting) {
      setState("run");
      startCountdown();
      console.log("IS STARTING")
    }
  }, [isStarting, startCountdown, currentIndex])

  // When time is up, finish!!
  useEffect(() => {
    if (!timeLeft && state === "run") {
      console.log("TIME IS UP!")
      setState("finish")
      sumErrors();

    }
  }, [timeLeft, sumErrors, state])

  const handleReset = () => {
    console.log("RESTART");
    resetCountdown();
    resetCounters();
    setState("start")
    setErrors(0)
    clearInput()
  }

  // Infinitw call w/o dependency
  // useEffect(() => {
  //   codeInputField.current.focus();
  //   console.log("%c RELOADING...", CURRENT_CORRECT_CONSOLE)
  //   console.log(`This is the currentCharIndex: ${currCharIndex} + this is the correctCounter ${correctCounter}`)
  // }, [currCharIndex, correctCounter])


  // const user = useContext(UserContext);
  // if (DEBUG) console.log(codeBlocksData);
  // const codeBlock = codeContext
  let points = CODEOBJ.points





  // const handleKeyDown = (e) => {
  //   // startCountdown();

  //   const { value } = e.target;
  //   const { key } = e;
  //   const { keyCode } = e;
  //   const { repeat } = e;

  //   // If keycode is in a certain range for letters and numbers

  //   // Assigning characters to FINALCODE ARRAY
  //   const characters = FINALCODE;

  //   if (repeat !== true &&
  //     !(
  //       (keyCode >= 9 && keyCode <= 12) ||
  //       (keyCode >= 14 && keyCode <= 31) ||
  //       (keyCode >= 33 && keyCode <= 46) ||
  //       (keyCode >= 91 && keyCode <= 145))) {
  //     // FINAL COMMENT: If character is a backspace and the Index is >= "0"
  //     if (keyCode === 8 && currInput.length >= 0) {

  //       // FINAL COMMENT: Here we reassign currInput to the string minus last character
  //       let newCurrInput = currInput.slice(0, -1)
  //       setCurrInput(newCurrInput);

  //       // remove one from correct

  //       // FINAL COMMENT: Here we get the current index - 1 (state isn't updating quickly enough)
  //       const newCharIndex = currCharIndex - 1;
  //       // maybe keep track of backspaces for points
  //       if (DEBUG) console.log("currInput ARRAY IN Backspace", currInput.split(""))

  //       // FINAL COMMENT: We query select from document 
  //       let characterSpan = document.querySelector(`span.${"index-" + newCharIndex}`);
  //       let nextCharacterSpan = document.querySelector(`span.${"index-" + (newCharIndex + 1)}`);

  //       // there is no spanClass, we skip adding or removing class from list
  //       if (characterSpan !== null) {
  //         characterSpan.classList.remove('correct');
  //         characterSpan.classList.remove('incorrect');
  //         characterSpan.classList.remove('current');
  //         characterSpan.classList.add('current');
  //         nextCharacterSpan.classList.remove('current');
  //         // Here we update Index and Correct Counter
  //         setCurrCharIndex(currInput.length - 1);
  //         if (DEBUG) console.log(`%c Current Index after class removal ${currCharIndex}`, CURRENT_INDEX_CONSOLE)
  //         setCorrectCounter(correctCounter - 1);
  //         if (DEBUG) console.log(`%c Current Index after class removal ${correctCounter}`, CURRENT_CORRECT_CONSOLE)
  //       }


  //       if (DEBUG) console.log("SPAN", document.querySelector(`span.${"index-" + currCharIndex}`));
  //       if (DEBUG) console.log("CURRENT INDEX BEFORE IN BACKSPACE", currCharIndex)
  //       // debugger
  //       if (DEBUG) console.log("*********************************************************")
  //       // setCurrInput(currInput.s)

  //     } else {
  //       // let characterSpan = document.querySelector(`span.${"index-" + currCharIndex}`);
  //       let previousCharacterSpan = document.querySelector(`span.${"index-" + (currCharIndex - 1)}`);
  //       if (DEBUG) console.log(keyCode);
  //       if (characters[currCharIndex] === key) {

  //         if (DEBUG) console.log("correct")
  //         // Init to inactive
  //         // Ad person types it's either correct or incorrect
  //         // change class
  //         // If currCharIndex is correct, add to the classList
  //         //
  //         // characterSpan.classList.add('correct');

  //         // Cursor logic
  //         if (previousCharacterSpan !== null) {
  //           previousCharacterSpan.classList.remove('current');
  //           console.log("PREVIOUS", previousCharacterSpan)
  //           // characterSpan.classList.add('current');
  //         }

  //         // add to correctCounter and do some math to calculate points
  //         setCorrectCounter(correctCounter + 1);
  //         if (DEBUG) console.log("CORRECT", correctCounter);
  //         if (DEBUG) console.log(characters[currCharIndex], key)
  //       } else {
  //         if (DEBUG) console.log(keyCode);
  //         if (DEBUG) console.log("incorrect")
  //         // characterSpan.classList.add('incorrect');

  //         if (previousCharacterSpan !== null) {
  //           previousCharacterSpan.classList.remove('current');
  //           console.log("PREVIOUS", previousCharacterSpan)
  //           // characterSpan.classList.add('current');
  //         }

  //         if (DEBUG) console.log(characters[currCharIndex], key)
  //       }
  //       setCurrCharIndex(currInput.length + 1);

  //       if (keyCode === 13) {
  //         let newKey = "↵"
  //         setCurrInput(value + newKey)
  //       } else {
  //         setCurrInput(value + key)
  //       }
  //     }
  //   }


  //   // If ley is backspace, -1 from index, and find item in document and remove class name
  // }

  // If focus is removed from input, you ca click the code and regain focus
  const handleClickCode = (e) => {
    if (DEBUG) console.log(e.target.value)
    codeInputField.current.focus();
  }

  // Count Up Timer
  const CountdownTimer = (time) => {
    return <div className="nes-badge"><span className="is-warning">Time: {time}</span></div>
  }

  // as soon the user starts typing the first letter, we start




  // console.log("STRIPPED CODE", strippedCode)


  return (
    <>
      <div className="nes-container with-title is-rounded">
        <h2 className="title">Play2</h2>
        <div className="is-centered">

          <div className="typing-score-display">Total Points: {points}</div>
          {/* <CountdownTimer timeLeft={timeLeft} /> */}
          {CountdownTimer(timeLeft)}
          <input ref={codeInputField} className="input-field" value={currInput} onKeyDown={keydownHandler} />

          <CharacterDisplay
            className="typing-text wordwrap"
            codeBlock={FINALCODE}
            userInput={currInput}
          // userInput={currInput}
          />

          {/* <pre onClick={handleClickCode} className="typing-text wordwrap">
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

          </pre> */}


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