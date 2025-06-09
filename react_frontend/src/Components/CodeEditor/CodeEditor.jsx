import React, { useState, useRef, useEffect } from "react";
import Editor from "@monaco-editor/react";
import Console from "./Console";
import "./CodeEditor.css";

const CodeEditor = ({ problem_id }) => {
  const [language, setLanguage] = useState("python");
  const [code, setCode] = useState("");
  const [outputs, setOutputs] = useState([]);
  const [starterCode, setStarterCode] = useState({});
  const [testCases, setTestCases] = useState([]);
  const [wrapperCode, setWrapperCode] = useState({});
  const editorRef = useRef(null);

  const editorOptions = {
    selectOnLineNumbers: true,
    automaticLayout: true,
    fontSize: 20,
    lineHeight: 28,
    minimap: { enabled: false },
    scrollBeyondLastLine: false,
    wordWrap: "on",
  };

  // Fetch problem data from backend
  useEffect(() => {
    if (!problem_id) return;
    fetch(`http://localhost:3000/question/${problem_id}`)
      .then((res) => res.json())
      .then((data) => {
        setStarterCode(data.starter_code || {});
        setTestCases(data.test_cases || []);
        // Unescape \\ and \n in wrapper code for each language
        const processedWrapperCode = {};
        for (const lang in data.wrapper_code || {}) {
          processedWrapperCode[lang] = data.wrapper_code[lang]
            .replace(/\\\\/g, "\\")
            .replace(/\\n/g, "\n");
        }
        setWrapperCode(processedWrapperCode);
        setCode(
          data.starter_code && data.starter_code[language]
            ? data.starter_code[language].replace(/\\n/g, "\n")
            : ""
        );
      });
  }, [problem_id]);

  // Update code when language changes
  useEffect(() => {
    setCode(
      starterCode[language] ? starterCode[language].replace(/\\n/g, "\n") : ""
    );
  }, [language, starterCode]);

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
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

  // Helper: format nums for each language
  const formatNums = (nums, lang) => {
    if (lang === "java" || lang === "cpp") {
      // Java and C++ want {2, 7, 11, 15}
      return `{${nums.join(", ")}}`;
    }
    // Python/JS want [2, 7, 11, 15]
    return JSON.stringify(nums);
  };

  // Helper: format expected for display
  const formatExpected = (expected) => {
    if (Array.isArray(expected)) return JSON.stringify(expected);
    return expected;
  };

  // Generate code to send to backend for each test case
  const generateWrappedCode = (userCode, language, testCase) => {
    const wrapper = wrapperCode[language];
    if (!wrapper) return userCode;
    const [nums, target] = testCase.input;
    const numsStr = formatNums(nums, language);
    const targetStr =
      typeof target === "number" ? target : JSON.stringify(target);

    return wrapper
      .replace("{user_code}", userCode)
      .replace("{nums}", numsStr)
      .replace("{target}", targetStr);
  };

  const handleClick = async (action) => {
    if (action === "Run") {
      setOutputs([
        { type: "output", message: "[*] Running code...", category: "stdout" },
      ]);
      let newOutputs = [];
      for (let i = 0; i < testCases.length; i++) {
        try {
          const wrappedCode = generateWrappedCode(code, language, testCases[i]);
          const response = await fetch("http://localhost:3000/code/execute", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              code: wrappedCode,
              language,
              testCases: [testCases[i]],
            }),
          });
          const result = await response.json();
          let output = (result.stdout || "").trim();
          let errorMsg = "";
          if (result.compile_output) {
            errorMsg = result.compile_output.trim();
          } else if (result.stderr) {
            errorMsg = result.stderr.trim();
          }
          // Compare output as JSON if expected is array
          let expected = testCases[i].expected;
          let success = false;
          try {
            // Try to parse output as JSON if expected is array
            if (Array.isArray(expected)) {
              const parsed = JSON.parse(output);
              success =
                JSON.stringify(parsed) === JSON.stringify(expected) &&
                !errorMsg;
            } else {
              success = output === String(expected) && !errorMsg;
            }
          } catch {
            // fallback to string compare
            success = output === String(expected) && !errorMsg;
          }
          newOutputs.push({
            type: "testCase",
            testNumber: i + 1,
            input: JSON.stringify(testCases[i].input),
            expected: formatExpected(expected),
            output: errorMsg ? errorMsg : output,
            success,
          });
          if (errorMsg) {
            newOutputs.push({
              type: "output",
              message: `Error in test case ${i + 1}:\n${errorMsg}`,
              category: "error",
            });
          } else {
            newOutputs.push({
              type: "output",
              message: success
                ? `✓ Test case ${i + 1} passed`
                : `✗ Test case ${i + 1} failed\nExpected: ${formatExpected(
                    expected
                  )}\nGot: ${output}`,
              category: success ? "stdout" : "error",
            });
          }
        } catch (err) {
          newOutputs.push({
            type: "output",
            message: `Error running test case ${i + 1}: ${err.message}`,
            category: "error",
          });
        }
      }
      setOutputs(newOutputs);
    }
  };

  return (
    <div className="code-editor">
      <div className="editor-header">
        <div className="custom-dropdown">
          <button className="dropdown-button">{languageMap[language]}</button>
          <div className="dropdown-content">
            <div
              onClick={() =>
                handleLanguageChange({ target: { value: "python" } })
              }
            >
              Python
            </div>
            <div
              onClick={() =>
                handleLanguageChange({ target: { value: "javascript" } })
              }
            >
              JavaScript
            </div>
            <div
              onClick={() =>
                handleLanguageChange({ target: { value: "java" } })
              }
            >
              Java
            </div>
            <div
              onClick={() => handleLanguageChange({ target: { value: "cpp" } })}
            >
              C++
            </div>
          </div>
        </div>
        <div className="editor-buttons">
          <button className="run-button" onClick={() => handleClick("Run")}>
            Run
          </button>
          <button
            className="submit-button"
            onClick={() => handleClick("Submit")}
          >
            Submit
          </button>
        </div>
      </div>
      <div
        className="editor-container"
        onContextMenu={(e) => e.preventDefault()}
      >
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
            contextmenu: false,
          }}
        />
        <Console outputs={outputs} />
      </div>
    </div>
  );
};

export default CodeEditor;
