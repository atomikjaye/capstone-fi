import cn from "classnames";
import React from 'react'

const Character = ({
  actual, typed
}) => {
  const isCorrect = actual === typed
  const isSpaceOrEnterKey = actual === "•" || actual === "↵\n"
  const isSpace = typed === " " && actual === "•"
  const isEnter = typed === "↵" && actual === "↵\n"


  return (
    <span className={cn({
      // "hello": actual,
      // "enter": isEnterKey,
      "space": isSpaceOrEnterKey,
      "incorrect": !isCorrect && typed !== undefined,
      "correct": isCorrect || isSpace || isEnter,
      "": typed === undefined
    })}>
      {actual}
    </span >
  )
}

export default Character