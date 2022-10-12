import cn from "classnames";
import React from 'react'

const Character = ({
  actual, expected
}) => {
  const isCorrect = actual === expected
  const isActual = actual === actual


  return (
    <span className={cn({
      "hello": actual,
      "incorrect": !isCorrect && !actual,
      "correct": isCorrect
    })}>
      {actual}
    </span>
  )
}

export default Character