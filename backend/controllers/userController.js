const db = require('../db/db');
const bcrypt = require('bcrypt');

const registerUser = (req, res) => {
  bcrypt.hash(req.body.password, 10)
    .then((hashedPwd) => {
      const { email, githubusername } = req.body;
      db.query('insert into app_user (email, password, githubusername) values ($1, $2, $3) returning *', [email, hashedPwd, githubusername])
        .then((result) => {
          const newUser = result.rows[0];
          res.status(201).json({ id: newUser.userid, email: newUser.email, githubUserName: newUser.githubusername });
        })
        .catch((err) => {
          console.error(err);
          res.status(500).send('Failed to register user');
        });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error hashing password');
    });
};
module.exports = { registerUser };
