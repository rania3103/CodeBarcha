const express = require('express');
const router = express.Router();
const commandsController = require('../controllers/commandsController');

router.post('/', commandsController.executeCommand);

module.exports = router;
