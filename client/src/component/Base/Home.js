import React, { useState, useEffect } from "react";
// import { useState, useEffect } from "react";
// import SignUp from "./SignUp";
// import Login from "./Login";



function Home() {

  const fetchUsers = async () => {
    const r = await fetch("/users");
    const users = await r.json();
    console.log("Users", users);
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      hi
    </>
  );
}

export default Home;
