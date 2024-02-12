const express = require('express');
const router = express.Router();
const githubController = require('../controllers/githubController');
const verifyToken = require('../middlewares/verifyToken');
router.use(verifyToken);

router.get('/repos', githubController.getUserRepos);
router.post('/repos', githubController.createRepo);
router.delete('/repos', githubController.deleteRepo);

module.exports = router;
