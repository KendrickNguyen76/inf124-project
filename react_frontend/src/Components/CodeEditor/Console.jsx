import React, { useState } from 'react';
import './Console.css';

const Console = ({ outputs = [] }) => {
  const [activeTab, setActiveTab] = useState('testCase');
  const [activeCase, setActiveCase] = useState(1);

  return (
    <div className="console-container">
      <div className="console-tabs">
        <button
          className={`console-tab ${activeTab === 'testCase' ? 'active' : ''}`}
          onClick={() => setActiveTab('testCase')}
        >
          Test Case
        </button>
        <button
          className={`console-tab ${activeTab === 'output' ? 'active' : ''}`}
          onClick={() => setActiveTab('output')}
        >
          Output
        </button>
      </div>
      <div className="console-content">
        {activeTab === 'testCase' ? (
          <div className="test-case-container">
            <div className="test-case-header">
              {outputs.filter(o => o.type === 'testCase').map((_, index) => (
                <button
                  key={index}
                  className={`test-case-button ${activeCase === index + 1 ? 'active' : ''}`}
                  onClick={() => setActiveCase(index + 1)}
                >
                  Case {index + 1}
                </button>
              ))}
            </div>
            {outputs
              .filter(o => o.type === 'testCase' && o.testNumber === activeCase)
              .map((output, index) => (
                <div key={index} className="test-case-input">
                  nums = {output.input}
                </div>
              ))}
          </div>
        ) : (
          <div className="output-container">
            {outputs.map((output, index) => (
              output.type === 'output' ? (
                <div 
                  key={index} 
                  className={`output-line ${output.category}`}
                >
                  {output.message}
                </div>
              ) : (
                <div 
                  key={index}
                  className={`test-case-result ${output.success ? 'success' : 'error'}`}
                >
                  <div><span className="result-label">Input:</span>{output.input}</div>
                  <div><span className="result-label">Expected:</span>{output.expected}</div>
                  <div><span className="result-label">Output:</span>{output.output}</div>
                </div>
              )
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Console;
