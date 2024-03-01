import MonacoEditor from "@monaco-editor/react";
import TerminalComponent from "./TerminalComponent";
function CodeEditor() {
  return (
    <div className=" flex flex-col w-full">
      <MonacoEditor
        className="h-full"
        theme="vs-dark"
        language="javascript"
        defaultValue='console.log("hello world");'
        options={{ autoClosingBrackets: true }}
      />
      <div className="bg-red-700 w-full">
        <TerminalComponent />
      </div>
    </div>
  );
}

export default CodeEditor;
