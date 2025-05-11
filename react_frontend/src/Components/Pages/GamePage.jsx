import React from "react";
import "./GamePage.css";
import CodeEditor from "../CodeEditor/CodeEditor.jsx";
import CodeProblem from "../CodeProblem/CodeProblem.jsx";

const GameProblem = () => {
  return (
    <div className="game-problem">
      <CodeProblem />
    </div>
  );
};

const GameEditor = () => {
  return (
    <div className="game-editor">
      <CodeEditor />
    </div>
  );
};

const GameTimer = () => {
  return (
    <div className="game-timer">
      <span className="timer-label"> Timer: </span>
      <span className="timer-value"> 00:00 </span>
    </div>
  );
}

const GamePage = () => {
  return (
    <div className="game-page">
      <GameTimer />
      <div className="game-container">
        <GameProblem />
        <GameEditor />
      </div>
    </div>
  );
};

export default GamePage;
