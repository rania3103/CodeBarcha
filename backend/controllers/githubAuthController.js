const passport = require('../config/passport-config');

const OAuth = passport.authenticate('github', { scope: ['user', 'repo'] });
const OAuthCallback = passport.authenticate('github', { failureRedirect: '/' }, (req, res) => {
  res.redirect('api/github/repos');
});

module.exports = { OAuth, OAuthCallback };
