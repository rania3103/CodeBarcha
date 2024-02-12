const passport = require('../config/passport-config');

const OAuth = passport.authenticate('github', { scope: ['user', 'repo'] });

const handleCallback = (req, res) => {
  res.redirect('api/github/repos');
};
const OAuthCallback = passport.authenticate('github', { failureRedirect: '/' }, handleCallback);

module.exports = { OAuth, OAuthCallback };
