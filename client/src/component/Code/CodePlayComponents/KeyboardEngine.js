import React, { useCallback, useEffect, useRef, useState } from 'react'

function KeyboardEngine(canType) {
  const [currentPlace, setCurrentPlace] = useState(0)
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currInput, setCurrInput] = useState("")
  const totalTyped = useRef(0)
  const backspaceCount = useRef(0)
  const correctLetters = useRef(0)

  // KEYBOARD KEYS ALLOWED

  const isKeyboardKeyAllowed = (code) => {
    return (code.startsWith("Key") ||
      code.startsWith("Digit") ||
      code.startsWith("Bracket") ||
      code.startsWith("Numpad") ||
      code === "Backspace" ||
      code === "Space" ||
      code === "Enter" ||
      code === "Equal" ||
      code === "Semicolon" ||
      code === "Minus" ||
      code === "Quote" ||
      code === "Equal" ||
      code === "Slash" ||
      code === "Comma" ||
      code === "Period" ||
      code === "Backslash")
  }





  const keydownHandler = useCallback(
    ({ key, code }) => {
      if (!canType || !isKeyboardKeyAllowed(code)) {
        console.log("SORRY either wrong key or game can't be played", !canType)
        console.log(code)
        return
      }
      // console.log(e)

      switch (key) {
        case "Backspace":
          setCurrInput((prev) => prev.slice(0, -1));
          setCurrentIndex((currentIndex) => currentIndex - 1);
          backspaceCount.current++
          totalTyped.current -= 1;
          break;
        case "Enter":
          setCurrInput((prev) => prev.concat("↵"))
          setCurrentIndex((currentIndex) => currentIndex + 1);
          totalTyped.current += 1;
          break;
        default:
          setCurrInput((prev) => prev.concat(key));
          setCurrentIndex((currentIndex) => currentIndex + 1);
          totalTyped.current += 1;
      }
    }, [canType]
  )


  // ERROR MATH STUFF
  const countErrors = (typed, expected) => {
    // We split expected CodeBlock an use that array to compare typed
    // and reduce
    const expectedCode = expected.split("")

    return expectedCode.reduce((errors, expectedChar, i) => {
      // Here we use reduce function to tally errors. the "previous value"
      //is not errors, the currValue is the Char in the array, and i is the index
      const typedChar = typed[i];

      if (!(expectedChar === "\n" && typedChar === "↵") && typedChar !== expectedChar) {
        errors++
      }
      return errors
    }, 0)
  }

  const calcAccuracy = (errors, totalChars) => {
    let totalCorrect = totalChars - errors;
    return Math.round((totalCorrect / totalChars) * 100);
  }

  const clearInput = () => {
    setCurrInput("")
    setCurrentIndex(0)
  }

  const resetCounters = () => {
    totalTyped.current = 0
    backspaceCount.current = 0
  }
  return {
    currInput,
    keydownHandler,
    totalTyped: totalTyped.current,
    backspaceCount: backspaceCount.current,
    currentIndex,
    countErrors,
    calcAccuracy,
    clearInput,
    resetCounters
  }
}







export default KeyboardEngine


// const keydownHandler = useCallback(
//   ({ key, code }: KeyboardEvent) => {
//     if (!enabled || !isKeyboardCodeAllowed(code)) {
//       return;
//     }

//     switch (key) {
//       case "Backspace":
//         setTyped((prev) => prev.slice(0, -1));
//         setCurrentIndex((currentIndex) => currentIndex - 1);
//         totalTyped.current -= 1;
//         break;
//       default:
//         setTyped((prev) => prev.concat(key));
//         setCurrentIndex((currentIndex) => currentIndex + 1);
//         totalTyped.current += 1;
//     }
//   },
//   [enabled]
// );


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
//         setCorrectCounter(correctCounter - 1);
//       }


//       // debugger
//       // setCurrInput(currInput.s)

//     } else {
//       // let characterSpan = document.querySelector(`span.${"index-" + currCharIndex}`);
//       let previousCharacterSpan = document.querySelector(`span.${"index-" + (currCharIndex - 1)}`);
//       if (characters[currCharIndex] === key) {

//         // Init to inactive
//         // Ad person types it's either correct or incorrect
//         // change class
//         // If currCharIndex is correct, add to the classList
//         //
//         // characterSpan.classList.add('correct');

//         // currentIndex logic
//         if (previousCharacterSpan !== null) {
//           previousCharacterSpan.classList.remove('current');
//           console.log("PREVIOUS", previousCharacterSpan)
//           // characterSpan.classList.add('current');
//         }

//         // add to correctCounter and do some math to calculate points
//         setCorrectCounter(correctCounter + 1);
//       } else {
//         // characterSpan.classList.add('incorrect');

//         if (previousCharacterSpan !== null) {
//           previousCharacterSpan.classList.remove('current');
//           console.log("PREVIOUS", previousCharacterSpan)
//           // characterSpan.classList.add('current');
//         }

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