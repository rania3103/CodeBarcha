const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');
const verifyToken = require('../middlewares/verifyToken');

router.use(verifyToken);
router.post('/', todoController.createTask);
router.get('/', todoController.getTasks);
router.put('/:id', todoController.updateTask);
router.delete('/:id', todoController.deleteTask);
router.get('/important', todoController.getImportantTasks);
module.exports = router;
