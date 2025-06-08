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


const GameProblem = ({question_problem, question_example}) => {
  return (
    <div className="game-problem">
      <CodeProblem problemStatement={problem}exampleInput={example} />
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
  const location = useLocation();
  const { question_id, question_name, question_description, question_example, question_difficulty} = location.state || {};
  
  return (
    <div className="game-page">
      <div className="game-header">
        {/*question details just temp to be visible, change as you see fit*/}
        <GameTimer />
        <GameQuitButton />
      </div>
      <PanelGroup direction="horizontal" className="panel-group">
        <Panel defaultSize={45} minSize={30} maxSize={70}>
          <CodeProblem problem={question_description} example={question_example} title={question_name} difficulty={question_difficulty} />
        </Panel>
        <PanelResizeHandle className="resize-handle" />
        <Panel defaultSize={55} minSize={30} maxSize={70}>
          <CodeEditor problem_id={question_id}/>
        </Panel>
      </PanelGroup>
    </div>
  );
};

export default GamePage;
