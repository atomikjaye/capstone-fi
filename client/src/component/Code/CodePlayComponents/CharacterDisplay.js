
import React from 'react'
import Character from './Character'

function CharacterDisplay({
  userInput,
  codeBlock,
  className = ""
}) {
  // We split code from user Input that is given above.
  const typedCharacters = userInput.split("")

  return (
    <pre className={className}>
      {codeBlock.map((char, i) => {
        // console.log("CHAR", char)
        if (char === " ") {
          char = "•"
        }
        if (char === "\n") {
          char = "↵\n"
        }
        return <Character
          key={i}
          expected={char}
          typed={typedCharacters[i]}
        />
      })}
    </pre>
  )
}

export default CharacterDisplay