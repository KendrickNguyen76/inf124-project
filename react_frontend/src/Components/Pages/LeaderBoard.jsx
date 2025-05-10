import React from "react";
import "./LeaderBoard.css";

{/*title of global leaderboard*/}
const LeaderGlobalTitle = () => (
  <div className = "leader_global_title">
    <h1> ⸺ Global LeaderBoard ⸺ </h1>
  </div>
);

{/*leaderboard rank, title, etc. labels*/}
const LeaderGlobalLabels = () => (
  <div className="leader_global_label">
    <div className="label_row">
      <span className="label_column">Name</span>
      <span className="label_column">Rank</span>
      <span className="label_column">Games Won</span>
    </div>
  </div>
);


{/*container for top 10 global leaderboard stats*/}
const LeaderGlobalScrollable = () => (
  <div className="leaderboard_global_scroll">
    {/*placeholders for back end data integration later*/}
  {[...Array(10)].map((_, i) => (
    <div key={i} className="data_row">
      <span className="data_column">Player {i + 1}</span>
      <span className="data_column">#{i + 1}</span>
      <span className="data_column">{Math.floor(Math.random() * 10)}</span>
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

