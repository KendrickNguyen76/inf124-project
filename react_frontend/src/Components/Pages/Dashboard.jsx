import React from "react";
import "./Dashboard.css";
import { useNavigate } from 'react-router-dom';


const LeaderDashTitle = () => (
  <div className="leader_dash_title">
    <h1> ⸺⸺ LeaderBoard ⸺⸺ </h1>
</div>
);


{/*title of user hello*/}
const LeaderDashHello = () => (
  <div className = "leader_dash_hello">
    <h1> Welcome Byte Warrior! </h1>
  </div>
);

{/*leaderboard rank, title, etc. labels*/}
const LeaderDashLabels = () => (
  <div className="label_row">
  <span>Player</span>
  <span>Rank</span>
  <span>Total Games</span>
  <span>Game Ratio</span>
</div>
);

{/*container for top 10 local leaderboard stats*/}
const LeaderDashScrollable = () => (
<div className="leaderboard_scroll">
  {[...Array(10)].map((_, i) => (
    <div key={i} className="data_row">
      <span>Player {i + 1}</span>
      <span>#{i + 1}</span>
      <span>{Math.floor(Math.random() * 10)}</span>
      <span>{Math.floor(Math.random() * 10)} : {Math.floor(Math.random() * 10)}</span>
    </div>
  ))}
</div>
);

{/*want to play text*/}
const LeaderDashPlay = () => (
  <div className = "leader_dash_play">
    <h1> Want to Play? </h1>
  </div>
);

{/*buttons for directing to practice or multiplayer pages*/}
const PlayButtons = () => {
  const navigate = useNavigate();
  return (
    <div className = "click_to_play_section">
      <button className = "practice_button" onClick={() => navigate("/questionbank")}>
        Practice
      </button>
      <button className = "match_button" onClick={() => navigate("/gamepage")}>
        Find Match
      </button>
    </div>
  );
};

{/*put all container sections together here*/}
const Dashboard = () => {
  return(
    <div className = "dashboard">
      <div className = "leadercontainer">
        <LeaderDashHello/>
        <LeaderDashTitle/>
        <LeaderDashLabels/>
        <LeaderDashScrollable/>
        <LeaderDashPlay/>
        <PlayButtons/>
      </div>
    </div>
  )
};

export default Dashboard;