const passport = require('../config/passport-config');

const OAuth = passport.authenticate('github', { scope: ['user', 'repo'] });

const handleCallback = (req, res) => {
  res.redirect('/repositories');
};
const OAuthCallback = passport.authenticate('github', { failureRedirect: '/' });

module.exports = { OAuth, OAuthCallback, handleCallback };
