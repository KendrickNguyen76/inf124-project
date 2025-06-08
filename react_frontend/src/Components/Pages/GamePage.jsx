import React from "react";
import "./GamePage.css";
import CodeEditor from "../CodeEditor/CodeEditor.jsx";
import CodeProblem from "../CodeProblem/CodeProblem.jsx";
/*import use nav to get question details from user's selection*/
import { useNavigate } from 'react-router-dom';
import {useLocation} from 'react-router-dom';
import {
  Panel,
  PanelGroup,
  PanelResizeHandle
} from "react-resizable-panels";

/*code to access question details! use the location and it gives u the details as the states. use as u see fit*/
const QuestionDetail = () => {
  const location = useLocation();
  const { question_id, question_name, question_description, question_example, question_difficulty, question_category } = location.state || {};

  return (
    <div>
      <p>ID: {question_id}</p>
      <p>Name: {question_name}</p>
      <p>Description: {question_description}</p>
      <p>Example: {question_example}</p>
      <p>Difficulty: {question_difficulty}</p>
      <p>Category: {question_category}</p>
    </div>
  );
};
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
        {/*question details just temp to be visible, change as you see fit*/}
        <QuestionDetail/>
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
