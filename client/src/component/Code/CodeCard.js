import React from "react";
import { Route, useLocation, Link } from "react-router-dom";
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
      <div key={id}>
        <textarea name="" id="" cols="50" rows="10" value={code} readOnly>
        </textarea><br />
        <strong>Ease Lvl:</strong> {isHard ? "Hard" : "Easy"}<br />
        <strong>Points:</strong> {points}<br />
        <strong>Language:</strong> {lang}
        <Link to={`${pathname}/${id}`}> Find Code</Link>

      </div>
    </>
  );


}

export default CodeCard;
