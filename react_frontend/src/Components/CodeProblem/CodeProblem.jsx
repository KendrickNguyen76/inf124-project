import React from 'react';
import './CodeProblem.css';

const CodeProblem = () => {

  const problemStatement = `
Given an array of integers, return the indices of the two numbers such that they add up to a specific target.
You may assume that each input would have exactly one solution, and you may not use the same element twice.
You can return the answer in any order.`;

  const exampleInput = `
Example 1:
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].`;

  return (
    <div className="code-problem">
      <div className="code-problem-header">
        <span> Two Sum</span>
        <span>Easy</span>
      </div>
      <div className="code-problem-body">
        <pre className="problem-text">{problemStatement}</pre>
        <pre className="example-text">{exampleInput}</pre>
      </div>
    </div>
  );
};

export default CodeProblem;
