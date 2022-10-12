import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext";

function NavBar() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  function handleLogout() {
    fetch("/logout", {
      method: "DELETE"
    }).then(() => {
      setUser();
      navigate("/login")
    });
  }

  return (
    <header>
      <div style={{ borderBottom: "4px solid black", padding: "10px" }}>
        <span style={{ marginRight: "20px", padding: "10px", fontSize: "2rem", borderRight: "4px solid black" }}>CODETYPR</span>
        <NavLink to="/" end>Home</NavLink> | <NavLink to="/code-home">Code</NavLink> |&nbsp;

        {user ? (
          <>
            <NavLink to="/profile">Profile</NavLink>
            <span> &nbsp;♥&nbsp;&nbsp;{user.first_name} is logged in <button className="nes-btn is-success" onClick={handleLogout}>Logout</button>
              {/* console.log(user) */}

            </span>
          </>
        ) : (
          <>
            <NavLink to="/signup">Signup</NavLink> | <NavLink to="/login">Login</NavLink>
          </>
        )}
        {/* <hr /> */}
      </div>
    </header>
  );
}

export default NavBar;