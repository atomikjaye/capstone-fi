import React from "react";
import { useState, useEffect, useMemo } from "react";
// import SignUp from "./SignUp";
import Login from "./component/Auth/Login";
import SignUp from "./component/Auth/SignUp";
import { Routes, Route, Navigate, useParams, useLocation } from "react-router-dom";
import NavBar from "./component/Base/NavBar"
import Footer from "./component/Base/Footer"
import Home from "./component/Home/Home"
import CodeHome from "./component/Code/CodeHome"
import CodePlay from "./component/Code/CodePlay"
import CodePlay2 from "./component/Code/CodePlay2"
import { UserContext, CodeContext } from "./UserContext";
import UserProfile from "./component/User/UserProfile";
import ErrorNotFound from "./component/Base/ErrorNotFound";
import "./App.css"


function App() {
  const [user, setUser] = useState(null);
  const [usersList, setUsersList] = useState(null);

  const [codeContext, setCodeContext] = useState(null);
  const [codeListContext, setCodeListContext] = useState(null);

  const [codeBlocks, setCodeBlocks] = useState(null);
  const { pathname } = useLocation();

  const value = useMemo(() => ({ user, setUser, usersList, setUsersList }), [user, setUser, usersList, setUsersList])
  const valueCode = useMemo(() => ({ codeContext, setCodeContext, codeListContext, setCodeListContext }), [codeContext, setCodeContext, codeListContext, setCodeListContext])
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
    setCodeListContext(code)
    //SetLocal Storage
    localStorage.setItem('codeList', JSON.stringify(code));



    // setCodeBlocks(code)
    // console.log("Code from App.js Fetch", code);
  }

  const setCodeListContextFunc = () => {
    let localCode = JSON.parse(localStorage.getItem('codeList'));
    // if codeListContext exist.. else
    if (codeListContext) {
      localStorage.setItem('codeList', JSON.stringify(codeListContext));
      console.log("CODELIST BEING SET to local Storage", codeListContext)
      return codeListContext
    } else if (localCode) {
      setCodeListContext(localCode)
      console.log("LOCALCODE is set, setting setCodeContext()", codeListContext)
      return codeListContext
    } else {
      fetchCode();
    }
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



    setCodeListContextFunc()

    // if (codeListContext === null && JSON.parse == null) {
    //   //variable
    //   // need to
    //   fetchCode()
    // } else if (codeListContext) {
    //   return codeListContext
    // } else if (JSON.parse(localStorage.getItem('codeList'))) {
    //   setCodeListContext(JSON.parse(localStorage.getItem('codeList')))
    // } else {
    //   // navigate somewhere else
    //   fetchCode();
    // }


  }, []);

  // console.log(codeBlocks)


  return (
    <>
      <UserContext.Provider value={value}>
        <CodeContext.Provider value={valueCode}>

          <NavBar />
          <main>
            {/* Here is where we decide which routes you can get hit to. */}
            {user ? (
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/code-home" element={<CodeHome codeBlocksData={codeBlocks} />} />
                <Route path={`/code-home/:codeId`} element={<CodePlay2 codeBlocksData={codeBlocks} />} />
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
          <Footer />
        </CodeContext.Provider>
      </UserContext.Provider>
    </>
  );


}

export default App;
