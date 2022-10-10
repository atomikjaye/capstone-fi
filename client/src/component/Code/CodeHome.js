import React, { useContext } from "react";
import { CodeContext } from "../../UserContext";

import CodeCard from "./CodeCard";
import "./CodeHome.css"

function CodeHome() {
  const { codeListContext, setCodeListContext } = useContext(CodeContext);
  // if state exists
  // if exists return State
  // if not exist
  //grab from local and set
  // 



  // const { id } = useParams();

  // const [user, setUser] = useState(null);
  let displayCodeBlocks = null;
  if (codeListContext == null) {
    console.log("Null Code")
  } else {
    console.log(codeListContext[0]);
    displayCodeBlocks = codeListContext.map((code) => {
      return <CodeCard
        key={code.id}
        id={code.id}
        code={code.code_block}
        isHard={code.is_hard}
        points={code.points}
        lang={code.lang}
        codeObj={code}
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
      <div className="code-list">
        {displayCodeBlocks}
      </div>

    </>
  );


}

export default CodeHome;
