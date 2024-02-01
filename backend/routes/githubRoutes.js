const express = require('express');
const router = express.Router();
const githubController = require('../controllers/githubController');

router.get('/repos', githubController.getUserRepos);
router.get('/repo/:id', githubController.getRepo);
router.post('/clone', githubController.cloneRepo);
router.post('/repos', githubController.createRepo);

module.exports = router;
