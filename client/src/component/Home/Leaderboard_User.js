import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext";

function Leaderboard_User() {
  const navigate = useNavigate();
  const { usersList, setUsersList } = useContext(UserContext);

  {
    usersList ?
      console.log("LIST:", usersList)
      :
      console.log("List not loaded null")
  }

  return (
    <div>Leaderboard_User</div>
  )
}


export default Leaderboard_User