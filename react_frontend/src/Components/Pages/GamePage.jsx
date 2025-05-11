import React from "react";
import "./GamePage.css";
import CodeEditor from "../CodeEditor/CodeEditor.jsx";
import CodeProblem from "../CodeProblem/CodeProblem.jsx";
import { useNavigate } from 'react-router-dom';

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

const GameQuitButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/dashboard");
  };

  return (
    <button className="quit-button" onClick={handleClick}>
      <span className="quit-label">QUIT GAME</span>
    </button>
  );
};

const GamePage = () => {
  return (
    <div className="game-page">
      <div className="game-header">
        <GameTimer />
        <GameQuitButton />
      </div>
      <div className="game-container">
        <GameProblem />
        <GameEditor />
      </div>
    </div>
  );
};

export default GamePage;
