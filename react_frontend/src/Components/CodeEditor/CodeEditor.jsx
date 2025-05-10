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

  return (
    <div className="code-editor">
      <div className="editor-header">
        <span></span>
        <select value={language} onChange={handleLanguageChange}>
          <option value="python">Python</option>
          <option value="javascript">JavaScript</option>
          <option value="java">Java</option>
          <option value="cpp">C++</option>
        </select>
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
