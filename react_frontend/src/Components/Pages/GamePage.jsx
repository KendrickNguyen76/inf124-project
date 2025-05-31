import React from "react";
import "./GamePage.css";
import CodeEditor from "../CodeEditor/CodeEditor.jsx";
import CodeProblem from "../CodeProblem/CodeProblem.jsx";
import { useNavigate } from 'react-router-dom';
import {
  Panel,
  PanelGroup,
  PanelResizeHandle
} from "react-resizable-panels";

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
      <PanelGroup direction="horizontal" className="panel-group">
        <Panel defaultSize={45} minSize={30} maxSize={70}>
          <CodeProblem />
        </Panel>
        <PanelResizeHandle className="resize-handle" />
        <Panel defaultSize={55} minSize={30} maxSize={70}>
          <CodeEditor />
        </Panel>
      </PanelGroup>
    </div>
  );
};

export default GamePage;
