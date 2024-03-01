import { GrUpdate } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { List, ListItem, Card } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import axios from "axios";

function TaskManagement() {
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [tasks, setTasks] = useState([]);
  const token = localStorage.getItem('authToken');
  const handleGetTasks = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/todo', {headers:{Authorization: `Bearer ${token}`}});
      setTasks(res.data);
    } catch (error) {
      console.error(error);
    }
  }

  const handleAddTask = async () => {
    try {
      const res = await axios.post('http://localhost:3000/api/todo', { description, dueDate }, {headers:{Authorization: `Bearer ${token}`}});
      console.log(res.data);
      setTasks((tasks) => [...tasks, res.data]);
      setDescription('');
      setDueDate('');
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    handleGetTasks();
  }, []);

  return (
    <div className="bg-gray-900 h-full">
      <h2 className="text-center mb-5 pt-5 text-white font-bold text-xl">Task Management</h2>
      <div className="text-center">
        <input type="text" placeholder="Task description" className="mr-3 ml-5 py-1 px-3 bg-slate-100 rounded" value={description} onChange={(e) => setDescription(e.target.value)} />
        <input type="text" placeholder="d/m/y" className="py-1 px-3 bg-slate-100 rounded" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
        <button className="ml-4 bg-indigo-500 py-1 px-5 text-white font-semibold rounded" onClick={handleAddTask}>Add Task</button>
      </div>
      <div className="mt-6 flex justify-center">
        <Card className="w-96 border-4 border-indigo-500/50 py-2 flex justify-center rounded">
          <List className="bg-slate-100 rounded">
            {tasks.map((task) => (
              <ListItem key={task.id} className="py-1 pr-1 pl-4 ">
                {task.description} {task.dueDate}
                <button className="ml-6 text-green-600"><GrUpdate /> </button>
                <button className="ml-3 text-red-600 text-xl"><MdDelete /> </button>
              </ListItem>
            ))}
          </List>
        </Card>
      </div>
    </div>
  )
}

export default TaskManagement;
