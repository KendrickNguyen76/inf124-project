import React from "react";
import "./LeaderBoard.css";

{/*title of global leaderboard*/}
const LeaderGlobalTitle = () => (
  <div className="leader_global_title">
      <h1>⸺ Global LeaderBoard ⸺</h1>
</div>
);

{/*leaderboard rank, title, etc. labels*/}
const LeaderGlobalLabels = () => (
  <div className="label_row">
  <span>Player</span>
  <span>Rank</span>
  <span>Total Games</span>
  <span>Game Ratio</span>
</div>
);


{/*container for top 10 global leaderboard stats*/}
const LeaderGlobalScrollable = () => (
<div className="leaderboard_global_scroll">
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
const Leaderboard = () => {
  return (
    <div className = "LeaderContainer">
      <LeaderGlobalTitle/>
      <LeaderGlobalLabels/>
      <LeaderGlobalScrollable/>
    </div>
  )
};

export default Leaderboard;

