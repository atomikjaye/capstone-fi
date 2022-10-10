import React, { useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../../UserContext";
import "./UserProfile.css"

function UserProfile() {
  const { user } = useContext(UserContext);
  // if user doesn't exist, redirect to home page
  console.log("USER", user)
  console.log("USER", user.reviews.length)

  // const showReviews = user.reviews.map()


  return (
    <div>
      {user ?
        <>
          <div className="nes-container with-title is-rounded">
            <p className="title nes-text is-error">👋🏽 Welcome, {user.first_name}</p>
            <p class="is-centered">You currently have <div className="nes-text is-success is-centered points">{user.points}</div> points</p>
            <hr />
            <p><strong>Avatar:</strong> {user.avatar_url != '' ? <img src={user.avatar_url} width="50px" /> : "Not set"}</p>
            <p><strong>Email:</strong> {user.email}</p>

            {/* <p><strong>Admin:</strong> {user.is_admin ? "You are an admin" : "You are not an admin"}</p> */}
          </div>

          {/* <div className="nes-container with-title is-rounded">
            <p className="title nes-text is-error">💻 Your Reviews</p>
            <p class="is-centered">You currently have <div className="nes-text is-success is-centered points">{user.reviews.length}</div> reviews</p>
            <hr />



            <p><strong>Avatar:</strong> {user.avatar_url != '' ? <img src={user.avatar_url} width="50px" /> : "Not set"}</p>
            <p><strong>Email:</strong> {user.email}</p>

            {/* <p><strong>Admin:</strong> {user.is_admin ? "You are an admin" : "You are not an admin"}</p> 
        </div> */}
        </>
        :
        <>
          <p>"Loading..."</p>
          {/* <Navigate to="/" /> */}
        </>
      }
    </div >
  );
}

export default UserProfile;