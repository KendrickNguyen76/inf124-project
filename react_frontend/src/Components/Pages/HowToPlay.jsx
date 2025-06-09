import React from "react";
import "./HowToPlay.css";

const HowToPlayTitle = () => (
  <div className="page-title">
  <div className="name_line"></div>
    <h1> How to Play</h1>
  <div className="name_line"></div>
</div>
);

const HowToPlay = () => {
  return (
    <div className = "profile-box">  
      <HowToPlayTitle />
      <div className="instructions">
        <h2>Instructions</h2>
        <ul className="instruction-steps">
          <li>Choose a game mode: Single Player or Multiplayer.</li>
          <li>In Single Player, you will play against yourself.</li>
          <li>In Multiplayer, you can invite friends to play with you.</li>
          <li>The goal is to solve the problem as quickly as possible.</li>
          <li>Have fun and enjoy the game!</li>
        </ul>
      </div>
    </div>
  );
};

export default HowToPlay;