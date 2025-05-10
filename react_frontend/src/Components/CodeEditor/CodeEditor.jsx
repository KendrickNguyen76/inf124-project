import React from 'react';
import './CodeEditor.css';
import Editor from '@monaco-editor/react';
const CodeEditor = () => {
    const editorOptions = {
        selectOnLineNumbers: true,
        automaticLayout: true,
        fontSize: 16,
        lineHeight: 24,
        minimap: {
            enabled: false
        },
        scrollBeyondLastLine: false,
        theme: 'vs-dark',
    };

    return (
        <div className="code-editor">
            <Editor
                height="90vh"
                width="100%"
                language="javascript"
                theme="vs-dark"
                options={editorOptions}
            />
        </div>
    );
}
export default CodeEditor;