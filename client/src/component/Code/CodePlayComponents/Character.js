import cn from "classnames"
import React from 'react'


const Character = ({
  expected, typed, index, totalTyped
}) => {
  const isCorrect = expected === typed
  const isSpaceOrEnterKey = expected === "•" || expected === "↵\n"
  const isSpace = typed === " " && expected === "•"
  const isEnter = typed === "↵" && expected === "↵\n"
  const isCurrent = index === totalTyped

  return (
    <span className={cn({
      "current": isCurrent,
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