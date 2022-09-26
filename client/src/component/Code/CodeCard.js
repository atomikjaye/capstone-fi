import React from "react";
import { Link } from "react-router-dom";
// import { useState } from "react";



function CodeCard({ id, code, isHard, points, lang }) {
  // const [user, setUser] = useState(null);

  // if (codeBlocksData == null) {
  //   console.log("Null Code")
  // } else {
  //   console.log(codeBlocksData[0]);
  console.log(isHard)
  // }

  return (
    <>
      <div key={id}>
        <textarea name="" id="" cols="50" rows="10">
          {code}
        </textarea><br />
        <strong>Ease Lvl:</strong> {isHard ? "Hard" : "Easy"}<br />
        <strong>Points:</strong> {points}<br />
        <strong>Language:</strong> {lang}
        {/* <Link to=/code></Link> */}

      </div>
    </>
  );


}

export default CodeCard;
