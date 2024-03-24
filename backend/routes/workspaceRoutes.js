const express = require('express');
const router = express.Router();
const workspaceController = require('../controllers/workspaceController');
const verifyToken = require('../middlewares/verifyToken');

router.use(verifyToken);
router.post('/', workspaceController.manageWorkspace);
router.get('/url', workspaceController.getWorkspaceUrl);
module.exports = router;
