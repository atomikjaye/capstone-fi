import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../UserContext";
import { Link } from "react-router-dom";
import Leaderboard from "./Leaderboard";
import "./Home.css"
// import { useState, useEffect } from "react";
// import SignUp from "./SignUp";
// import Login from "./Login";



function Home() {
  const { user } = useContext(UserContext);
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
      <div className="home-container">
        {user ?
          <Link to={`/code-home`} className="code-card-link">
            <button type="button" className="nes-btn is-warning">Choose <br />your <br />Code!</button>
          </Link> :
          <Link to={`/login`} className="code-card-link">
            <button type="button" className="nes-btn is-primary">Login <br />to <br />Play!</button>
          </Link>
        }
        <Leaderboard />
      </div>
    </>
  );
}

export default Home;
