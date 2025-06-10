import React from "react";
import "./LeaderBoard.css";

{/*title of global leaderboard*/}
const LeaderGlobalTitle = () => ( 
  <div className="page-title">
  <div className="name_line"></div>
    <h1> Global Leaderboard</h1>
  <div className="name_line"></div>
</div>
);

const LeaderGlobalScrollable = () => (
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

const Leaderboard = () => {
  return (
    <div className = "LeaderContainer">
      <LeaderGlobalTitle/>
      <LeaderGlobalScrollable/>
      
    </div>
  )
};

export default Leaderboard;