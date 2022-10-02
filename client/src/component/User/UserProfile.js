import React, { useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../../UserContext";

function UserProfile() {
  const { user } = useContext(UserContext);
  // if user doesn't exist, redirect to home page

  return (
    <div>

      {user ?
        <>
          <h1>Welcome, {user.first_name}</h1>
          <p>You currently have {user.points}</p>
          <hr />
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Avatar:</strong> {user.avatar_url != '' ? <img src={user.avatar_url} /> : "Not set"}</p>
          <p><strong>Admin:</strong> {user.is_admin ? "You are an admin" : "You are not and admin"}</p>
        </>
        :
        <>
          <p>"hi"</p>
          <Navigate to="/" />
        </>
      }
    </div>

  );
}

export default UserProfile;