import React from "react";
import "./Dashboard.css";
import { useNavigate } from 'react-router-dom';


const LeaderDashTitle = () => (
  <div className="leader_dash_title">
    <div className="name_line"></div>
      <h1> Leaderboard</h1>
    <div className="name_line"></div>
</div>
);


{/*title of user hello*/}
const LeaderDashHello = () => (
  <div className = "leader_dash_hello">
    <h1> Welcome Byte Warrior! </h1>
  </div>
);

{/*container for top 10 local leaderboard stats*/}
const LeaderDashScrollable = () => (
  <div className="table_container">  
    <div className="leaderboard_global_scroll">
      <table>
        <thead>
          <tr>
            <th>Player</th>
            <th>Rank</th>
            <th>Total Games</th>
            <th>Game Ratio</th>
          </tr>
        </thead>
        <tbody>
          {[...Array(10)].map((_, i) => (
            <tr key={i}>
              <td><span>Player {i + 1}</span></td>
              <td><span>#{i + 1}</span></td>
              <td><span>{Math.floor(Math.random() * 10)}</span></td>
              <td><span>{Math.floor(Math.random() * 10)} : {Math.floor(Math.random() * 10)}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
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
      <button className = "match_button" onClick={() => navigate("/comingsoon")}>
        Find Match
      </button>
    </div>
  );
};

{/*put all container sections together here*/}
const Dashboard = () => {
  return(
    <div className = "dashboard">
      <LeaderDashHello/>
      <LeaderDashTitle/>
      <LeaderDashScrollable/>
      <LeaderDashPlay/>
              <PlayButtons/>
    </div>
  )
};

export default Dashboard;