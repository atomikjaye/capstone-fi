import React from "react";
import { useState, useEffect, useMemo } from "react";
// import SignUp from "./SignUp";
import Login from "./component/Auth/Login";
import SignUp from "./component/Auth/SignUp";
import { Routes, Route, Navigate, useParams, useLocation } from "react-router-dom";
import NavBar from "./component/Base/NavBar"
import Home from "./component/Home/Home"
import CodeHome from "./component/Code/CodeHome"
import CodePlay from "./component/Code/CodePlay"
import { UserContext } from "./UserContext";
import UserProfile from "./component/User/UserProfile";
import ErrorNotFound from "./component/Base/ErrorNotFound";


function App() {
  const [user, setUser] = useState(null);
  const [usersList, setUsersList] = useState(null);
  const [codeBlocks, setCodeBlocks] = useState(null);
  const { pathname } = useLocation();

  const value = useMemo(() => ({ user, setUser, usersList, setUsersList }), [user, setUser, usersList, setUsersList])
  // const usersListValue = useMemo(() => ({ usersList, setUsersList }), [usersList, setUsersList])

  const fetchUsers = async () => {
    const r = await fetch("/users");
    const users = await r.json();
    console.log("Users App.js", users);
    setUsersList(users)
  }

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

    fetchUsers();
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
              <Route path={`/code-home/:codeId`} element={<CodePlay codeBlocksData={codeBlocks} />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="*" component={ErrorNotFound} />
            </Routes>
          ) : (
            <Routes>
              <Route path="/code-home" element={<CodeHome codeBlocksData={codeBlocks} />} />
              {/* <Route path="/code-play" element={<CodePlay codeBlocksData={codeBlocks} />} /> */}
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Home />} />
              {/* <Route path="/profile" element={<Navigate to="/" />} /> */}
              <Route path="*" element={<ErrorNotFound />} />
            </Routes>
          )}
        </main>
      </UserContext.Provider>
    </>
  );


}

export default App;
