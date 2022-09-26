import React, { useContext } from "react";
import { Link } from "react-router-dom";
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
        <Link to="/">Home</Link> | <Link to="/code-home">Code</Link>&nbsp;

        {user ? (
          <>
            <div><h2>{user.first_name} is logged in</h2></div>
            {/* console.log(user) */}
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            | <Link to="/signup">Signup</Link> | <Link to="/login">Login</Link>
          </>
        )}
      </div>
    </header>
  );
}

export default NavBar;