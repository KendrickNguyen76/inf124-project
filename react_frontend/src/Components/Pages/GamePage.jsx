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

const GamePage = () => {
  return (
    <div className="game-page">
      <div className="game-container">
        <GameProblem />
        <GameEditor />
      </div>
    </div>
  );
};

export default GamePage;
