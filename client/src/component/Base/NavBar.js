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
      <div>
        <NavLink to="/" end>Home</NavLink> | <NavLink to="/code-home">Code</NavLink> |&nbsp;

        {user ? (
          <>
            <NavLink to="/profile">Profile</NavLink>
            <span> &nbsp;♥&nbsp;&nbsp;{user.first_name} is logged in <button onClick={handleLogout}>Logout</button>
              {/* console.log(user) */}

            </span>
          </>
        ) : (
          <>
            <NavLink to="/signup">Signup</NavLink> | <NavLink to="/login">Login</NavLink>
          </>
        )}
        <hr />
      </div>
    </header>
  );
}

export default NavBar;