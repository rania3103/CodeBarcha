const express = require('express');
const router = express.Router();
const githubController = require('../controllers/githubController');

router.post('/repos', githubController);

module.exports = router;
