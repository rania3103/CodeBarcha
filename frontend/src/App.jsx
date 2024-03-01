import { Route, BrowserRouter, Routes } from "react-router-dom";
import Repositories from "./components/Repositories";
import TaskManagement from "./components/TaskManagement";
import CodeEditor from "./components/CodeEditor";
import Home from "./components/Home";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import LogOut from "./components/LogOut";
import Pages from "./components/pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Pages />}>
          <Route path="/home" element={<Home />} />
          <Route path="/repositories" element={<Repositories />} />
          <Route path="/todo" element={<TaskManagement />} />
          <Route path="/code-editor" element={<CodeEditor />} />
          <Route path="/logout" element={<LogOut />} />
        </Route>

        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
