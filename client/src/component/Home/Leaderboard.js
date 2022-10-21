import React from 'react'
import LeaderboardUser from './LeaderboardUser'
import "./Leaderboard.css"

function Leaderboard() {
  return (
    <div>
      <h2 className="is-centered">Leaderboard</h2>
      <LeaderboardUser />
    </div>
  )
}

export default Leaderboard