const passport = require('passport');
const GithubStrategy = require('passport-github').Strategy;
const dotenv = require('dotenv');
const db = require('../db/db');
dotenv.config();

// user logs in -> github gives us info about them (profile)
// we return this info with an access token
passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
      scope: ['user', 'repo']
    },
    (accessToken, refreshToken, profile, done) => {
      const githubUserId = profile.id;
      const githubUserName = profile.username;
      db.query('update app_user set githubuserid = $1, githubaccesstoken = $2 where githubusername = $3 returning userid', [githubUserId, accessToken, githubUserName])
        .then(result => {
          const user = {
            userId: result.rows[0].userid,
            githubId: githubUserId,
            username: githubUserName,
            accessToken
          };
          done(null, user);
        })
        .catch(err => {
          console.error(err);
          done(err, null);
        }
        );
    }
  )
);
// serialize user object to an  id and store it in the session
passport.serializeUser((user, done) => {
  done(null, user.userId);
});
// deserialize user by using id stored to get user object from db
passport.deserializeUser((id, done) => {
  db.query('select githubusername from app_user where userid = $1', [id])
    .then((result) => {
      const githubUserName = result.rows[0].githubusername;
      const user = {
        id,
        username: githubUserName
      };
      done(null, user);
    }
    )
    .catch((err) => {
      console.error(err);
      done(err, null);
    });
});

module.exports = passport;
