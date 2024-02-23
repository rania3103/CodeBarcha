import MonacoEditor from '@monaco-editor/react';
import TerminalComponent from './TerminalComponent';
function CodeEditor() {
  return (
    <div className='bg-gray-900'>
      <MonacoEditor className='mt-1'
      height={400}
      width={1000}
      theme='vs-dark'
      language='javascript'
      defaultValue= 'console.log("hello world");'
      options={
        {autoClosingBrackets:true}
      }
    />
      <div>
        <TerminalComponent/>
      </div>
    </div>
  );
}

export default CodeEditor;
