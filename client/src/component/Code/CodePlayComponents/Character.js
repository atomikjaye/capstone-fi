import cn from "classnames";
import React from 'react'

const Character = ({
  expected, typed
}) => {
  const isCorrect = expected === typed
  const isSpaceOrEnterKey = expected === "•" || expected === "↵\n"
  const isSpace = typed === " " && expected === "•"
  const isEnter = typed === "↵" && expected === "↵\n"


  return (
    <span className={cn({
      // "hello": expected,
      // "enter": isEnterKey,
      "space": isSpaceOrEnterKey,
      "incorrect": !isCorrect && typed !== undefined,
      "correct": isCorrect || isSpace || isEnter,
      "": typed === undefined
    })}>
      {expected}
    </span >
  )
}

export default Character