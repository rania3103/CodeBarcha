import { Card, Typography } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {format, addDays } from "date-fns";

function TaskManagement() {
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState(null);
  const [tasks, setTasks] = useState([]);
  const token = localStorage.getItem("authToken");

  const handleGetTasks = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/todo", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddTask = async () => {
    try {
      await axios.post(
        "http://localhost:3000/api/todo",
        { description, dueDate },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      handleGetTasks();
      setDescription("");
      setDueDate(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/todo/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks((prevTasks) => prevTasks.filter((task) => task.taskId !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateTask = async (id, description, dueDate) => {
    try {
      await axios.put(`http://localhost:3000/api/todo/${id}`, {description, dueDate}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      handleGetTasks();
    } catch (error) {
      console.error(error);

    }
  };
  useEffect(() => {
    handleGetTasks();
  }, []);

  return (
    <div className="w-full mx-auto">
      <h2 className="text-center mb-5 pt-5 text-white font-extrabold text-xl">
        TODO
      </h2>
      <div className="text-center">
        <input
          type="text"
          placeholder="Task description"
          className="mr-3 ml-5 py-1 px-3 bg-slate-100 rounded outline-0"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <DatePicker
          selected={dueDate}
          onChange={(date) => setDueDate(date)}
          className="py-1 px-3 bg-slate-100 rounded outline-0"
          dateFormat="yyyy/MM/dd"
          placeholderText="Due date"
        />
        <button
          className="ml-4 bg-indigo-500 py-1 px-5 text-white font-semibold rounded hover:bg-indigo-300"
          onClick={handleAddTask}
        >
          Add Task
        </button>
      </div>
      <div className="mt-6">
        <Card className="bg-white rounded-md overflow-y-scroll overflow-x-scroll mx-24">
          <table className="w-full table-auto text-left">
            <thead>
              <tr>
                <th className="border-b border-blue-gray-100 bg-blue-gray-50 py-2">
                  <Typography className="font-extrabold opacity-70 text-indigo-800 text-2xl">
                    Task
                  </Typography>
                </th>
                <th className="border-b border-blue-gray-100 bg-blue-gray-50 py-2">
                  <Typography className="font-extrabold opacity-70 text-indigo-800 text-2xl">
                    Due date
                  </Typography>
                </th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr
                  key={task.taskId}
                  className="bg-slate-100 hover:bg-slate-200"
                >
                  <td>
                    <input type="text"
                      className="font-semibold py-2 text-gray-700 bg-slate-100" value= {task.description}
                      onChange={(e)=> handleUpdateTask(task.taskId, e.target.value, undefined)}
                    />
                  </td>
                  <td>
                  <DatePicker selected={format(addDays(new Date(task.dueDate), 1), "yyyy/MM/dd")}
                  className="py-1 px-3 bg-slate-100 rounded outline-0"
                  dateFormat="yyyy/MM/dd" onChange={(date)=> handleUpdateTask(task.taskId, undefined, date)}/>
                  </td>
                  <td  className="px-auto space-x-2">
                    <Button
                      className="bg-red-800 hover:bg-red-600 rounded-md h-8 py-1"
                      onClick={() => handleDeleteTask(task.taskId)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
}

export default TaskManagement;
