import React from "react";
import "./CodeProblem.css";

const CodeProblem = ( {problem, example, title, difficulty}) => {
  const problemStatement = problem || '';
  const exampleInput = example|| '';
  const problemTitle = title || '';
  const difficultyLevel = difficulty || '';
  return (
    <div className="code-problem">
      <div className="code-problem-header">
        <span className="problem-title">{problemTitle}</span>
        <span className="difficulty-badge">{difficultyLevel}</span>
      </div>{" "}
      <div className="code-problem-body">
        <pre className="problem-text">{problemStatement}</pre>
        <pre className="example-text">{exampleInput}</pre>
      </div>
    </div>
  );
};

export default CodeProblem;
