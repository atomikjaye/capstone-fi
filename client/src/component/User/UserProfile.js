import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../UserContext";

function NavBar() {
  const { user } = useContext(UserContext);

  return (
    <>
      <div>
        <h1>Welcome, {user.first_name}</h1>
        <p>You currently have {user.points}</p>
        <hr />
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Avatar:</strong> {avatar_url != '' ? <img src={user.avatarurl} /> : "Not set"}</p>
        <p><strong>Admin:</strong> {user.is_admin ? "You are an admin" : "You are not and admin"}</p>
      </div>
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
    </>
  );
}

export default NavBar;