import React from 'react'

function ErrorNotFound() {
  return (
    <div className="nes-container is-rounded with-title">
      <h2 className="title">uh oh!</h2>

      <h1 style={{ fontSize: "8rem" }} className="is-centered nes-text is-error">404</h1>
      <p className="is-centered">You broke something</p>
    </div >
  )
}

export default ErrorNotFound