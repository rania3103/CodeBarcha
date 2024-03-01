import {FileExplorer, getFileTree} from '@litecode-ide/virtual-file-system';
import "@litecode-ide/virtual-file-system/dist/style.css";
import axios from 'axios';
import { useState, useEffect } from 'react';

function FileBrowser() {
  const [fileList, setFileList] = useState([]);

  useEffect(()=>{fileTree();},[]);

  const fileTree = async() =>{
    try {
      const response = await axios.post('http://localhost:3000/api/exec-command', {command: 'show'});
      const res = response.data.result;
      console.log('Updated fileList:', res);
      setFileList(res);
    } catch (error) {
      console.error('error fetching files', error);
    }
  }
  return (
    <>
    <button onClick={fileTree}>Fetch Files</button>
    <div>
        <FileExplorer validExtensions = {['html', 'css', 'js', 'py', 'jsx']} fileList = {fileList}/>
    </div></>
  )
}

export default FileBrowser