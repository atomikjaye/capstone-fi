import React from "react";
import { useState, useEffect, useMemo } from "react";
// import SignUp from "./SignUp";
import Login from "./component/Auth/Login";
import SignUp from "./component/Auth/SignUp";
import { Routes, Route } from "react-router-dom";
import NavBar from "./component/Base/NavBar"
import Home from "./component/Base/Home"
import CodeHome from "./component/Code/CodeHome"
import CodePlay from "./component/Code/CodePlay"
import { UserContext } from "./UserContext";


function App() {
  const [user, setUser] = useState(null);
  // const [user, setUser] = useState(null);
  const [codeBlocks, setCodeBlocks] = useState(null);

  const value = useMemo(() => ({ user, setUser }), [user, setUser])

  // const fetchUsers = async () => {
  //   const r = await fetch("/users");
  //   const users = await r.json();
  //   console.log("Users", users);
  // }

  const fetchCode = async () => {
    const r = await fetch("/codes");
    const code = await r.json();
    setCodeBlocks(code)
    // console.log("Code from App.js Fetch", code);
  }

  useEffect(() => {
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          console.log(user);
          setUser(user)
        });
      } else {
        console.log("/me: No user set");
      }
    });

    // fetchUsers();
    fetchCode();
  }, []);



  return (
    <>
      <UserContext.Provider value={value}>

        <NavBar />
        <main>
          {/* Here is where we decide which routes you can get hit to. */}
          {user ? (
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/code-home" element={<CodeHome codeBlocksData={codeBlocks} />} />
            </Routes>
          ) : (
            <Routes>
              <Route path="/code-home" element={<CodeHome codeBlocksData={codeBlocks} />} />
              {/* <Route path="/code-play" element={<CodePlay codeBlocksData={codeBlocks} />} /> */}
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Home />} />
            </Routes>
          )}


        </main>
      </UserContext.Provider>
    </>
  );


}

export default App;
