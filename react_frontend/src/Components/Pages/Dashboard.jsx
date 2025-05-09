import React from "react";

{/*title of local dashboard*/}
const LeaderDashTitle = () => (
  <div className = "leader_dash_title">
    <h1> Local LeaderBoard </h1>
  </div>
);

{/*leaderboard rank, title, etc. labels*/}
const LeaderDashLabels = () => (
  <div className = "leader_dash_label">
    <div className = "label_row">
      <span>Name</span>
      <span>Rank</span>
      <span>Games</span>
    </div>
  </div>
)

{/*put all container sections together here*/}
const Dashboard = () => {
  return(
    <div className = "dashboard">
      <div className = "leadercontainer">
        <LeaderDashTitle/>
        <LeaderDashLabels/>
      </div>
    </div>
  )
};

export default Dashboard;