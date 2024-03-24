const expres = require('express');
const router = expres.Router();
const githubAuthController = require('../controllers/githubAuthController');
const passport = require('../config/passport-config');

router.get('/', passport.authenticate('github'));

router.get('/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  githubAuthController.getGithubInfo,
  (req, res) => {
    res.redirect('http://localhost:3001/repositories');
  });

module.exports = router;
