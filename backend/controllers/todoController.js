const db = require('../db/db');

// create task
const createTask = (req, res) => {
  const { description, dueDate } = req.body;
  const userId = req.user.id;
  db.query('insert into task (description, dueDate, userId) values($1, $2, $3) returning *', [description, dueDate, userId])
    .then(result => {
      res.status(201).json(result.rows[0]);
    })
    .catch(error => {
      res.status(400).json({ error: 'Failed to create a task' });
      console.error(error);
    });
};
// get all tasks
const getTasks = (req, res) => {
  const id = req.user.id;
  db.query('select description, duedate, taskid from task where userId = $1', [id])
    .then(result => {
      const tasks = result.rows.map(task => ({ description: task.description, dueDate: task.duedate, taskId: task.taskid }));
      res.status(200).json(tasks);
    })
    .catch(error => {
      res.status(400).json({ error: 'Failed to get tasks' });
      console.error(error);
    });
};
// update task
const updateTask = async (req, res) => {
  const { description, dueDate } = req.body;
  const id = req.params.id;
  let updatedTask = null;
  let result;
  try {
    if (description !== undefined) {
      result = await db.query('update task set description = $1 where taskId = $2  returning *', [description, id]);
    }
    if (dueDate !== undefined) {
      result = await db.query('update task set dueDate = $1 where taskId = $2  returning *', [dueDate, id]);
    }
    if (result.rowCount > 0) {
      updatedTask = result.rows[0];
      res.status(200).json(updatedTask);
    } else {
      res.status(404).json({ error: 'task not found or not updated' });
    }
  } catch (error) {
    res.status(400).json({ error: 'Failed to update task' });
    console.error(error);
  }
};
// delete task
const deleteTask = (req, res) => {
  const id = req.params.id;
  db.query('delete from task where taskId = $1', [id])
    .then(() => { res.status(200).json({ message: 'task deleted sucessefully' }); })
    .catch(error => {
      res.status(400).json({ error: 'Failed to delete task' });
      console.error(error);
    });
};
// get important tasks
const getImportantTasks = (req, res) => {
  const today = new Date();
  const thisWeekStartDate = new Date(today);
  const dayOfWeek = today.getDay();
  thisWeekStartDate.setDate(today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -7 : 0));
  const thisWeekEndDate = new Date(thisWeekStartDate);
  thisWeekEndDate.setDate(thisWeekEndDate.getDate() + 6);
  const id = req.user.id;
  db.query('select description, dueDate from task where dueDate between $1 and $2 and userId = $3', [thisWeekStartDate, thisWeekEndDate, id])
    .then(result => {
      const tasks = result.rows.map(task => ({ description: task.description, dueDate: task.duedate, taskId: task.taskid }));
      res.status(200).json(tasks);
    })
    .catch(error => {
      res.status(400).json({ error: 'Failed to get tasks' });
      console.error(error);
    });
};
module.exports = { createTask, getTasks, updateTask, deleteTask, getImportantTasks };
