const db = require('../db/db');
// create task
const createTask = (req, res) => {
  const { description, dueDate } = req.body;
  const userId = 1; // i have to update it after authentication
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
  db.query('select description, dueDate from task')
    .then(result => {
      res.status(200).json(result.rows);
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
  try {
    if (description) {
      const result = await db.query('update task set description = $1 where taskId = $2  returning *', [description, id]);
      if (result.rowCount > 0) {
        updatedTask = result.rows[0];
      } else {
        res.status(404).json({ error: 'task not found or not updated' });
        return;
      }
    }
    if (dueDate) {
      const result = await db.query('update task set dueDate = $1 where taskId = $2  returning *', [dueDate, id]);
      if (result.rowCount > 0) {
        updatedTask = result.rows[0];
      } else {
        res.status(404).json({ error: 'task not found or not updated' });
        return;
      }
    }
    if (updatedTask) {
      res.status(200).json(updatedTask);
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
    .then(res.status(200).json({ message: 'task deleted sucessefully' }))
    .catch(error => {
      res.status(400).json({ error: 'Failed to delete task' });
      console.error(error);
    });
};
// get important tasks
const getImportantTasks = (req, res) => {
  const thisWeekStartDate = new Date();
  const thisWeekEndDate = new Date();
  thisWeekEndDate.setDate(thisWeekEndDate.getDate() + 7);
  db.query('select description, dueDate from task where dueDate between $1 and $2', [thisWeekStartDate, thisWeekEndDate])
    .then(result => {
      res.status(200).json(result.rows);
    })
    .catch(error => {
      res.status(400).json({ error: 'Failed to get tasks' });
      console.error(error);
    });
};
module.exports = { createTask, getTasks, updateTask, deleteTask, getImportantTasks };
