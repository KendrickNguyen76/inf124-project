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
    wordWrap: "on",
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

  // Example problem configuration for scalability
  const problemConfig = {
    // Key: problemId or name, here 'twoSum' as example
    twoSum: {
      python: {
        parseInput: (input) => {
          const [numsLine, targetLine] = input.split("\n");
          return {
            nums: `list(map(int, "${numsLine}".split()))`,
            target: `int("${targetLine}")`,
          };
        },
        callSolution: (vars) =>
          `sol = Solution()\nprint(str(sol.twoSum(${vars.nums}, ${vars.target})).replace(' ', ''))`,
      },
      javascript: {
        parseInput: (input) => {
          const [numsLine, targetLine] = input.split("\n");
          return {
            nums: `[${numsLine}]`,
            target: `${targetLine}`,
          };
        },
        callSolution: (vars) =>
          `console.log(twoSum(${vars.nums}, ${vars.target}));`,
      },
      java: {
        parseInput: (input) => {
          const [numsLine, targetLine] = input.split("\n");
          return {
            nums: `new int[]{${numsLine}}`,
            target: `${targetLine}`,
          };
        },
        callSolution: (vars) =>
          `Solution sol = new Solution();\n        System.out.println(java.util.Arrays.toString(sol.twoSum(${vars.nums}, ${vars.target})));`,
      },
      cpp: {
        parseInput: (input) => {
          const [numsLine, targetLine] = input.split("\n");
          return {
            nums: `{${numsLine}}`,
            target: `${targetLine}`,
          };
        },
        callSolution: (vars) =>
          `Solution sol;\n    vector<int> res = sol.twoSum(vector<int>${vars.nums}, ${vars.target});\n    cout << "[";\n    for (size_t i = 0; i < res.size(); ++i) {\n        cout << res[i];\n        if (i + 1 < res.size()) cout << ",";\n    }\n    cout << "]" << endl;`,
      },
    },
    // Add more problems here...
  };

  // Set this to the current problem key (e.g., from props, context, or state)
  const currentProblemKey = "twoSum"; // TODO: Make dynamic

  const generateWrappedCode = (userCode, language, testCase) => {
    const config = problemConfig[currentProblemKey]?.[language];
    if (!config) return userCode;

    const vars = config.parseInput(testCase.input);

    switch (language) {
      case "python":
        // Indent each line of the callSolution block by 4 spaces
        const indentedCall = config
          .callSolution(vars)
          .split("\n")
          .map((line) => "    " + line)
          .join("\n");
        return `
from typing import List
${userCode}

if __name__ == "__main__":
${indentedCall}
`;
      case "javascript":
        return `
${userCode}

${config.callSolution(vars)}
`;
      case "java":
        return `
${userCode}

public class Main {
    public static void main(String[] args) {
        ${config.callSolution(vars)}
    }
}
`;
      case "cpp":
        return `
${userCode}

#include <iostream>
#include <vector>
using namespace std;

int main() {
    ${config.callSolution(vars)}
    return 0;
}
`;
      default:
        return userCode;
    }
  };

  const handleClick = async (action) => {
    if (action === "Run") {
      setOutputs([
        { type: "output", message: "[*] Running code...", category: "stdout" },
      ]);

      const testCases = [
        { input: "2 7 11 15\n9", expected: "[0,1]" },
        { input: "3 2 4\n6", expected: "[1,2]" },
      ];

      let newOutputs = [];
      for (let i = 0; i < testCases.length; i++) {
        try {
          // Wrap user code for this test case
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
          console.log(result);

          let output = (result.stdout || "").trim();
          let errorMsg = "";

          // Show compile or runtime errors if present
          if (result.compile_output) {
            errorMsg = result.compile_output.trim();
          } else if (result.stderr) {
            errorMsg = result.stderr.trim();
          }

          let success = output === testCases[i].expected && !errorMsg;

          newOutputs.push({
            type: "testCase",
            testNumber: i + 1,
            input: testCases[i].input,
            expected: testCases[i].expected,
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
                : `✗ Test case ${i + 1} failed\nExpected: ${
                    testCases[i].expected
                  }\nGot: ${output}`,
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
