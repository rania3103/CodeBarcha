const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

router.post('/', todoController.createTask);
router.get('/', todoController.getTasks);
router.put('/:id', todoController.updateTask);
router.delete('/:id', todoController.deleteTask);
router.get('/important', todoController.getImportantTasks);
module.exports = router;
