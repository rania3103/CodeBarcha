const express = require('express');
const router = express.Router();
const githubController = require('../controllers/githubController');
const verifyToken = require('../middlewares/verifyToken');
router.use(verifyToken);
router.get('/repos', githubController.getUserRepos);
/*router.post('/clone', githubController.cloneRepo);
router.post('/repos', githubController.createRepo);*/

module.exports = router;
