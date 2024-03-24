import axios from "axios";
import { useState, useEffect } from "react";
import { Card, Typography} from "@material-tailwind/react";
import { format, addDays } from "date-fns";
import { FaStackOverflow, FaLinkedin } from "react-icons/fa";
import { FaMedium } from "react-icons/fa6";
import { BsSlack } from "react-icons/bs";
import { LiaFreeCodeCamp } from "react-icons/lia";
import { TbBrandOpenai } from "react-icons/tb";
import { IoSchool } from "react-icons/io5";

function Home() {
  const [quote, setQuote] = useState("");
  const [importantTasks, setIimportantTasks] = useState([]);
  const token = localStorage.getItem("authToken");
  const getQuote = async () => {
    try {
      let res = await axios.get(
        "https://api.quotable.io/random?tags=happiness|technology"
      );
      if (res.data.content.length < 90){
        setQuote(res.data.content);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getQuote();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const getImportantTasks = async() =>{
    try {
      const res = await axios.get("http://localhost:3000/api/todo/important", {
        headers: { Authorization: `Bearer ${token}` }});
      setIimportantTasks(res.data);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getImportantTasks();
  }, []);
  return (
    <div className="mx-auto">
      <div className="text-center">
        <h1 className="mt-4 font-extrabold text-indigo-500 text-3xl">Quote of the day:</h1>
        <p className="text-indigo-200 bg-slate-800 py-4 rounded-md text-2xl mt-8 font-semibold mx-auto">{quote}</p>
      </div>
      <div className="flex space-x-24 mt-12">
        <div className="w-96">
            <Card className="bg-slate-200 rounded-lg h-96 ">
              <table className="table-auto text-left">
                <thead>
                  <tr>
                    <th className="py-2 border-b-gray-300 border-b-2">
                      <Typography className="font-extrabold opacity-70 text-indigo-800 text-xl">
                        Task
                      </Typography>
                    </th>
                    <th className="py-2 border-b-gray-300 border-b-2">
                      <Typography className="font-extrabold opacity-70 text-indigo-800 text-xl">
                        Deadline this week
                      </Typography>
                    </th>
                  </tr>
                </thead>
                <tbody >
                {importantTasks.map((task) => (
                <tr
                  key={task.taskId}
                  className="bg-slate-100"
                >
                  <td>
                    <Typography
                      variant="medium"
                      className="font-semibold py-2 text-gray-700"
                    >
                      {task.description}
                    </Typography>
                  </td>
                  <td>
                    <Typography
                      variant="medium"
                      className="font-semibold py-2 text-red-500 text-center"
                    >
                      {format(addDays(new Date(task.dueDate), 1), "yyyy/MM/dd")}
                    </Typography>
                  </td>
                  </tr> ))}
                </tbody>
              </table>
          </Card>
        </div>
        {/* other section*/} 
        <div className="bg-slate-200 w-96 text-gray-900 h-fit rounded-md">
          <h1 className="font-extrabold opacity-70 text-indigo-800 text-xl text-center py-2 border-b-gray-300 border-b-2 bg-slate-200">Useful links</h1>
          <Card className="w-96">
            <ul className="font-bold text-center text-gray-500">
              <li className="hover:bg-slate-200 cursor-pointer py-2"><a href="https://stackoverflow.com/" target = "_blank"><FaStackOverflow className="text-indigo-600 mx-auto"/>Stack overflow</a></li>
              <li className="hover:bg-slate-200 cursor-pointer py-2"><a href="https://medium.com/" target = "_blank"><FaMedium className="text-indigo-600 mx-auto"/>Medium</a></li>
              <li className="hover:bg-slate-200 cursor-pointer py-2"><a href="https://slack.com/" target = "_blank"><BsSlack className="text-indigo-600 mx-auto"/>Slack</a></li>
              <li className="hover:bg-slate-200 cursor-pointer py-2"><a href="https://www.freecodecamp.org/" target = "_blank"><LiaFreeCodeCamp className="text-indigo-600 mx-auto"/>Freecodecamp</a></li>
              <li className="hover:bg-slate-200 cursor-pointer py-2"><a href="https://www.w3schools.com/" target = "_blank"><IoSchool className="text-indigo-600 mx-auto"/>W3Schools</a></li>
              <li className="hover:bg-slate-200 cursor-pointer py-2"><a href="https://beta.openai.com/signup/" target = "_blank"><TbBrandOpenai className="text-indigo-600 mx-auto"/>ChatGPT</a></li>
              <li className="hover:bg-slate-200 cursor-pointer py-2"><a href="https://www.linkedin.com/" target = "_blank"><FaLinkedin className="text-indigo-600 mx-auto"/>Linkedin</a></li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Home;
