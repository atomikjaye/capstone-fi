import React from "react";
import { useState, useEffect } from "react";
// import SignUp from "./SignUp";
import Login from "./component/Auth/Login";
import SignUp from "./component/Auth/SignUp";
import { Routes, Route } from "react-router-dom";
import NavBar from "./component/Base/NavBar"
import Home from "./component/Base/Home"


function App() {
  const [user, setUser] = useState(null);

  const fetchUsers = async () => {
    const r = await fetch("/users");
    const users = await r.json();
    console.log("Users", users);
    // dispatch(grabAllStories(stories));
  }

  const fetchCode = async () => {
    const r = await fetch("/codes");
    const code = await r.json();
    console.log("Code", code);
    // dispatch(grabAllStories(stories));
  }

  useEffect(() => {
    // fetch("/users")
    //   .then((r) => r.json())
    //   .then((data) => console.log(data));
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });

    fetchUsers();
    fetchCode();
  }, []);


  return (
    <>
      <NavBar user={user} setUser={setUser} />
      <main>
        {user ? (
          <Routes>
            <Route path="/" element={<Home />}>
            </Route>
          </Routes>
        ) : (
          <Routes>
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
