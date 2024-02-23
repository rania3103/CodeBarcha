import axios from 'axios';
import {useState} from 'react';

function TerminalComponent() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState([]);
  const [indexHistory, setIndexHistory] = useState(-1);
  const [cmdHistory, setCmdHistory] = useState([]);
  

  const handleCommand = async(command) =>{
    try {
      const response = await axios.post('http://localhost:3000/api/exec-command', {command: command});
      const res = response.data.result;
      setInput('');
      setOutput([...output, {type: 'output', content: res}]);
    } catch (error) {
      setOutput([...output, {type: 'error', content: `error: command not found`}]);
  }}
  const handleChangeInput = (e) =>{
    setInput(e.target.value);
  }
  const handleKeyDown = (e) => {
    if(e.key === 'Enter') {
      if (input.trim() !== ''){
        if (input === 'clear') {
          setOutput([]);
          setInput('');
        }else{
          setOutput([...output, {type:'input', content: input}]);
          handleCommand(input);
          setCmdHistory([...cmdHistory, input]);
          setIndexHistory(-1);
        }
      }
    }
    else if(e.key === 'ArrowUp' || e.key === 'ArrowDown'){
      let newIndex;
      if(e.key === 'ArrowUp'){
        newIndex = indexHistory - 1;
      } else{
        newIndex = indexHistory + 1;
      }
      if(newIndex >= 0 && newIndex < cmdHistory.length){
        setIndexHistory(newIndex);
        setInput(cmdHistory[newIndex]);
      }
      }
    }
  return (
    <div className='bg-gray-900 h-60 '>
      <div>
        <span className='text-orange-500 '>CodeBarcha$ </span>
        <input className='bg-gray-900 text-amber-50 pl-4 border-none outline-none w-96'
          type="text"
          value={input}
          onChange={handleChangeInput}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div>
        {output.map((item, index) =>(
          <div key = {index} className='text-lime-400'>
              {item.content}
          </div>
        ))}
      </div>
    </div>
  )
}

export default TerminalComponent
