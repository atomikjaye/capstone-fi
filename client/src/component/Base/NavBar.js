import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../UserContext";

function NavBar() {
  const { user, setUser } = useContext(UserContext);

  function handleLogout() {
    fetch("/logout", {
      method: "DELETE"
    }).then(() => {
      setUser();
    });
  }

  return (
    <header>
      <div>
        <NavLink to="/" end>Home</NavLink> | <NavLink to="/code-home">Code</NavLink> |&nbsp;

        {user ? (
          <>
            <NavLink to="/profile">Profile</NavLink>
            <div><h2>{user.first_name} is logged in</h2></div>
            {/* console.log(user) */}
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <NavLink to="/signup">Signup</NavLink> | <NavLink to="/login">Login</NavLink>
          </>
        )}
      </div>
    </header>
  );
}

export default NavBar;