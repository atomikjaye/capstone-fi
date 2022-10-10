import React, { useContext, useEffect } from "react";
import { UserContext, CodeContext } from "../../UserContext";
import { Route, useLocation, Link } from "react-router-dom";
import "./CodeCard.css"
// import { useState } from "react";



function CodeCard({ codeObj, id, code, isHard, points, lang }) {
  const { codeContext, setCodeContext } = useContext(CodeContext);
  const { user } = useContext(UserContext);

  const { pathname } = useLocation();
  // const [user, setUser] = useState(null);

  // if (codeBlocksData == null) {
  //   console.log("Null Code")
  // } else {
  //   console.log(codeBlocksData[0]);
  // console.log(isHard)
  // }

  console.log("CODE OBJECT", codeObj)

  const handleCodeContext = (code) => {
    setCodeContext(code)
    localStorage.setItem('singleCode', JSON.stringify(code));
  }

  // useEffect(() => {
  let localCode = JSON.parse(localStorage.getItem('singleCode'));
  //   // if codeContext exist.. else
  //   if (codeContext) {
  //     localStorage.setItem('singleCode', JSON.stringify(codeContext));
  //     console.log("LOCAL STORAGE BEING SET to local Storage", codeContext)
  //     return
  //   } else {
  //     setCodeContext(localCode)
  //     console.log("CODE CONTEXT is set, setting setCodeContext()", codeContext)
  //     return
  //   }
  // }, [])

  console.log("CODE CONTEXT CodeCard", codeContext)

  const setCodeContextFunc = () => {

  }

  // Use Effect Code Block Here?

  return (
    <>
      <div key={id} className="code-card">
        <section className="message-list">
          <section className="message-left">
            <div className="nes-balloon from-left">
              {lang == "JavaScript" ?
                <p className="nes-text is-success code-card-text">{lang}</p>
                :
                <p className="nes-text is-warning code-card-text">{lang}</p>
              }
              <div className="code-Info">

                <strong>Ease Lvl:</strong> {isHard ? "Hard" : "Easy"}<br />
                <strong>Points:</strong> {points}<br />
                <strong>Language:</strong> {lang}
              </div>
              <div class="is-centered play-button">
                {user ?
                  <Link to={`${pathname}/${id}`} onClick={() => handleCodeContext(codeObj)} className="code-card-link">
                    <button type="button" class="nes-btn is-warning">Play!</button>
                  </Link> :
                  <Link to={`/login`} onClick={() => handleCodeContext(codeObj)} className="code-card-link">
                    <button type="button" class="nes-btn is-primary">Login to Play!</button>
                  </Link>
                }
              </div>
            </div>
          </section>
        </section>
      </div>
    </>
  );


}

export default CodeCard;
