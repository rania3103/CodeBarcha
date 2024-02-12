const expres = require('express');
const router = expres.Router();
const githubAuthController = require('../controllers/githubAuthController');

router.get('/', githubAuthController.OAuth);
router.get('/callback', githubAuthController.OAuthCallback);

module.exports = router;
