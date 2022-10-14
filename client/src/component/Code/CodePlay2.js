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
import CodePopUp from "./CodePlayComponents/CodePopUp";
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

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
  const COUNTDOWN_SECONDS = 10;
  const { timeLeft, startCountdown, resetCountdown } = CodeTimer(COUNTDOWN_SECONDS);


  // SCORE STUFF
  const [errors, setErrors] = useState(0)
  const sumErrors = () => {
    const totalTypedCode = strippedCode.substring(0, currentIndex);
    setErrors((prevErrors) => prevErrors + countErrors(currInput, totalTypedCode))
  }


  //MODAL STUFF
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(true);

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


  let codeInputField = useRef(null); // so we can focus the textbox

  useEffect(() => {
    setCodeContext(JSON.parse(localStorage.getItem('singleCode')))
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
      // Here we want to display PopUp
      // <CodePopUp />

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

  // const

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


  // Count Up Timer
  const CountdownTimer = (time) => {
    return <div className="nes-badge"><span className="is-warning">Time: {time}</span></div>
  }

  // as soon the user starts typing the first letter, we start
  // Modal.setAppElement('#CodePlay2');

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }


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
            inputRef={codeInputField}
          />
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

      {/* MODAL STUFF */}
      <div>
        <button onClick={openModal}>Open Modal</button>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Example Modal"
          className="nes-dialog is-rounded"
          overlayClassName="backdrop"
        >
          {/* <!-- Rounded dialog --> */}
          <i onClick={closeModal} className="modal-close nes-icon close is-small"></i>
          <form method="dialog">
            <p className="title">Time's Up!!</p>
            <hr />
            <p>Check out your stats!</p>
            <span className="nes-badge"><span className="is-error">Errors</span></span> {errors}<br />
            <span className="nes-badge"><span className="is-warning">&nbsp;Accuracy&nbsp;</span></span> {calcAccuracy(errors, totalTyped)}%<br />
            <span className="nes-badge"><span className="is-success">Total Words</span></span> {totalTyped}/{FINALCODE.length}
            <br />
            <hr />

            {/* <menu className="dialog-menu"> */}
            <button className="nes-btn">Play Again</button>&nbsp;
            <button className="nes-btn is-primary">Go Home</button>
            {/* </menu> */}
          </form>

        </Modal>
      </div>


    </>
  )

}

export default CodePlay;