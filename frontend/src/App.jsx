import NavBar from "./components/NavBar"
import SideBar from "./components/SideBar"
import {Route, BrowserRouter, Routes} from 'react-router-dom';
import Repositories from './components/Repositories';
import TaskManagement from './components/TaskManagement';
import CodeEditor from './components/CodeEditor';
import Home from './components/Home';
function App() {

  return (
    <BrowserRouter>
      <NavBar />
      <SideBar />
        <div className="pl-48">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/repositories" element={<Repositories />} />
            <Route path="/todo" element={<TaskManagement />} />
            <Route path="/code-editor" element={<CodeEditor />} />
          </Routes>
        </div>
    </BrowserRouter>
  );
}

export default App
