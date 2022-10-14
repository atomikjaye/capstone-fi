
import React from 'react'
import Character from './Character'

function CharacterDisplay({
  userInput,
  codeBlock,
  className = "",
  inputRef
}) {
  // We split code from user Input that is given above.
  const typedCharacters = userInput.split("")

  const handleClickCode = (e) => {
    inputRef.current.focus();
  }

  return (
    <pre className={className} onClick={handleClickCode}>
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
          index={i}
          totalTyped={typedCharacters.length}
          typed={typedCharacters[i]}
        />
      })}
    </pre>
  )
}

export default CharacterDisplay