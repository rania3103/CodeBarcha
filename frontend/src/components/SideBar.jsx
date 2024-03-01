import { FaHome } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { RiTodoFill } from "react-icons/ri";
import { FaCode } from "react-icons/fa";
import { Link } from "react-router-dom";
function SideBar() {
  return (
    <div className="bg-gray-900 min-h-screen w-fit border-r-4 border-indigo-500 p-11 ">
      <ul className="text-white">
        <li className="flex items-center mb-4 pt-12 hover:border-b-2 border-indigo-500 ">
          <Link to="/home" className="flex items-center">
            <FaHome className="mr-2 text-indigo-500" /> Home
          </Link>
        </li>
        <li className="flex items-center mb-4 pt-12 hover:border-b-2 border-indigo-500">
          <Link to="/repositories" className="flex items-center">
            <FaGithub className="mr-2 text-indigo-500" /> Repositories
          </Link>
        </li>
        <li className="flex items-center mb-4 pt-12 hover:border-b-2 border-indigo-500">
          <Link to="/todo" className="flex items-center">
            <RiTodoFill className="mr-2 text-indigo-500" /> Todo
          </Link>
        </li>
        <li className="flex items-center pt-12 hover:border-b-2 border-indigo-500">
          <Link to="/Code-editor" className="flex items-center">
            <FaCode className="mr-2 text-indigo-500" /> Code Editor
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default SideBar;
