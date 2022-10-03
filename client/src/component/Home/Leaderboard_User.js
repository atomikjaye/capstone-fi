import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext";
import "./Leaderboard.css"

function Leaderboard_User() {
  const navigate = useNavigate();
  const { usersList, setUsersList } = useContext(UserContext);

  let userListPopulate = null;
  console.log("LEADERBOARD USER", usersList)
  if (usersList == null) {
    console.log("Users List is NULL")
  } else {
    userListPopulate = usersList.map((user, index) => {
      return (
        <tr key={user.id}>
          <td className="is-centered">
            {index + 1}
          </td>
          <td>

            <img src={user.avatar_url} width="70px" />
            <span className="title">{user.username}</span>
          </td>
          <td>
            {user.points}
          </td>

        </tr>

      )
    })

  }



  return (
    <div className="container">
      {usersList !== null ?
        <table className="nes-table is-bordered is-centered">
          <thead>
            <tr>
              <th>Place</th>
              <th>User</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {userListPopulate}
          </tbody>
        </table>
        :
        "Loading:"
      }
    </div>
  )
}


export default Leaderboard_User