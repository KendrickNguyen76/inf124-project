import React, { useState, useRef } from "react";
import Editor from "@monaco-editor/react";
import Console from "./Console";
import "./CodeEditor.css";

const CodeEditor = () => {
  const [language, setLanguage] = useState("python");
  const [code, setCode] = useState(
    `class Solution:\n    def twoSum(self, nums: List[int], target: int) -> List[int]:\n        `
  );
  const [outputs, setOutputs] = useState([]);
  const editorRef = useRef(null);

  const editorOptions = {
    selectOnLineNumbers: true,
    automaticLayout: true,
    fontSize: 20,
    lineHeight: 28,
    minimap: { enabled: false },
    scrollBeyondLastLine: false,
    wordWrap: 'on',
  };

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    // Disable context menu
    editor.onContextMenu((e) => {
      e.event.preventDefault();
      e.event.stopPropagation();
      return false;
    });
  };

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setLanguage(newLang);
    if (editorRef.current) {
      const model = editorRef.current.getModel();
      monaco.editor.setModelLanguage(model, newLang);
    }
  };

  const languageMap = {
    python: "Python",
    javascript: "JavaScript",
    java: "Java",
    cpp: "C++",
  };

  const handleClick = (action) => {
    if (action === "Run") {
      setOutputs([
        {
          type: 'output',
          message: '[*] Running code...',
          category: 'stdout'
        },
        {
          type: 'testCase',
          testNumber: 1,
          input: '[2,7,11,15], target = 9',
          expected: '[0,1]',
          output: '[0,1]',
          success: true
        },
        {
          type: 'output',
          message: '✓ Test case 1 passed',
          category: 'stdout'
        },
        {
          type: 'testCase',
          testNumber: 2,
          input: '[3,2,4], target = 6',
          expected: '[1,2]',
          output: '[0,2]',
          success: false
        },
        {
          type: 'output',
          message: '✗ Test case 2 failed\nExpected: [1,2]\nGot: [0,2]',
          category: 'error'
        },
        {
          type: 'output',
          message: '\nExecution finished: 2/1 test cases passed.',
          category: 'result'
        }
      ]);
    } else {
      alert(`You clicked the ${action} button!`);
    }
  };

  return (
    <div className="code-editor">
      <div className="editor-header">
        <div className="custom-dropdown">
          <button className="dropdown-button">{languageMap[language]}</button>
          <div className="dropdown-content">
            <div onClick={() => handleLanguageChange({ target: { value: "python" } })}>Python</div>
            <div onClick={() => handleLanguageChange({ target: { value: "javascript" } })}>JavaScript</div>
            <div onClick={() => handleLanguageChange({ target: { value: "java" } })}>Java</div>
            <div onClick={() => handleLanguageChange({ target: { value: "cpp" } })}>C++</div>
          </div>
        </div>
        <div className="editor-buttons">
          <button className="run-button" onClick={() => handleClick("Run")}>Run</button>
          <button className="submit-button" onClick={() => handleClick("Submit")}>Submit</button>
        </div>
      </div>
      <div className="editor-container" onContextMenu={(e) => e.preventDefault()}>
        <Editor
          height="calc(100% - 200px)"
          width="100%"
          language={language}
          value={code}
          onMount={handleEditorDidMount}
          onChange={(value) => setCode(value)}
          theme="light"
          options={{
            ...editorOptions,
            contextmenu: false
          }}
        />
        <Console outputs={outputs} />
      </div>
    </div>
  );
};

export default CodeEditor;
