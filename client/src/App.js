import React from "react";
import { useState, useEffect } from "react";
// import SignUp from "./SignUp";
import Login from "./component/Auth/Login";
import SignUp from "./component/Auth/SignUp";
import { Routes, Route } from "react-router-dom";
import NavBar from "./component/Base/NavBar"
import Home from "./component/Base/Home"
import CodeHome from "./component/Code/CodeHome"


function App() {
  const [user, setUser] = useState(null);
  const [codeBlocks, setCodeBlocks] = useState(null);

  // const fetchUsers = async () => {
  //   const r = await fetch("/users");
  //   const users = await r.json();
  //   console.log("Users", users);
  // }

  const fetchCode = async () => {
    const r = await fetch("/codes");
    const code = await r.json();
    setCodeBlocks(code)
    console.log("Code", code);
  }

  useEffect(() => {
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          console.log(user);
          setUser(user)
        });
      }
    });

    // fetchUsers();
    fetchCode();
  }, []);



  return (
    <>
      <NavBar user={user} setUser={setUser} />
      <main>
        {/* Here is where we decide which routes you can get hit to. */}
        {user ? (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/code-home" element={<CodeHome />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/code-home" element={<CodeHome codeBlocksData={codeBlocks} />} />
            <Route path="/signup" element={<SignUp setUser={setUser} />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/" element={<Home />} />
          </Routes>
        )}


      </main>
    </>
  );


}

export default App;
