import React from "react";

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
        <p>1. Choose a game mode: Single Player or Multiplayer.</p>
        <p>2. In Single Player, you will play against yourself.</p>
        <p>3. In Multiplayer, you can invite friends to play with you.</p>
        <p>4. Each player takes turns to make a move.</p>
        <p>5. The goal is to solve the problem as quickly as possible.</p>
        <p>7. Have fun and enjoy the game!</p>
      </div>
    </div>
  );
};

export default HowToPlay;