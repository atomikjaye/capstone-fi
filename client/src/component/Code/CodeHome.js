import React from "react";
import Code from "./CodeCard"
import { useState } from "react";
import CodeCard from "./CodeCard";

function CodeHome({ codeBlocksData }) {
  // const [user, setUser] = useState(null);
  let displayCodeBlocks = null;
  if (codeBlocksData == null) {
    console.log("Null Code")
  } else {
    console.log(codeBlocksData[0]);
    displayCodeBlocks = codeBlocksData.map((code) => {
      return <CodeCard
        id={code.id}
        code={code.code_block}
        isHard={code.is_hard}
        points={code.points}
        lang={code.lang}

      />
    })
  }





  // console.log(codeBlocksData.length);
  // useEffect(() => {
  //   fetch("/me").then((r) => {
  //     if (r.ok) {
  //       r.json().then((user) => {
  //         console.log(user);
  //         setUser(user)
  //       });
  //     }
  //   });
  // }, []);



  return (
    <>
      <h1>CODE LISTS</h1>
      <div>
        {displayCodeBlocks}
      </div>
    </>
  );


}

export default CodeHome;
