import React, { useContext } from "react";
import { UserContext } from "../../UserContext";
function CodePlay({ codeBlock }) {
  const user = useContext(UserContext);

  return (
    <>
      hi
      {user}
    </>
  )

}

export default CodePlay;