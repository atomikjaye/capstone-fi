import React from "react";
import { useState, useEffect } from "react";
// import SignUp from "./SignUp";



function CodeHome(codeBlocks) {
  const [user, setUser] = useState(null);

  console.log(codeBlocks);
  console.log({ codeBlocks });
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
      <div>CODE HOME</div>
    </>
  );


}

export default CodeHome;
