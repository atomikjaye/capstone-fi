import React from "react";
import { Route, useLocation, Link } from "react-router-dom";
import "./CodeCard.css"
// import { useState } from "react";



function CodeCard({ id, code, isHard, points, lang }) {


  const { pathname } = useLocation();
  // const [user, setUser] = useState(null);

  // if (codeBlocksData == null) {
  //   console.log("Null Code")
  // } else {
  //   console.log(codeBlocksData[0]);
  // console.log(isHard)
  // }

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

                <Link to={`${pathname}/${id}`} className="code-card-link">
                  <button type="button" class="nes-btn is-warning">Play!</button>
                </Link>
              </div>
            </div>
          </section>
        </section>
      </div>
    </>
  );


}

export default CodeCard;
