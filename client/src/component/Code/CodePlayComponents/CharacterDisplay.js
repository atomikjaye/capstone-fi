
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
        return <Character
          key={i}
          actual={char}
          expected={typedCharacters[i]}
        />
      })}
    </pre>
  )
}

export default CharacterDisplay