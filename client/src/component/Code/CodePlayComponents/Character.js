import cn from "classnames";
import React from 'react'

const Character = ({
  actual, typed
}) => {
  const isCorrect = actual === typed
  const isNotCorrect = actual !== typed
  const isActual = actual
  console.log("TYPED CHARACTER", typed)

  return (
    <span className={cn({
      // "hello": actual,
      "incorrect": !isCorrect && typed !== undefined,
      "correct": isCorrect,
      "": typed === undefined
    })}>
      {actual}
    </span>
  )
}

export default Character