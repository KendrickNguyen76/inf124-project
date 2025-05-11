import React, { useState, useRef } from "react";
import Editor from "@monaco-editor/react";
import "./CodeEditor.css";

const CodeEditor = () => {
  const [language, setLanguage] = useState("python");
  const [code, setCode] = useState(
    `class Solution:\n    def twoSum(self, nums: List[int], target: int) -> List[int]:\n        `
  );
  const editorRef = useRef(null);

  const editorOptions = {
    selectOnLineNumbers: true,
    automaticLayout: true,
    fontSize: 14,
    lineHeight: 22,
    minimap: { enabled: false },
    scrollBeyondLastLine: false,
  };

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
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
    alert(`You clicked the ${action} button!`);
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
      <Editor
        height="85vh"
        width="100%"
        language={language}
        value={code}
        onMount={handleEditorDidMount}
        onChange={(value) => setCode(value)}
        theme="light"
        options={editorOptions}
      />
    </div>
  );
};

export default CodeEditor;
