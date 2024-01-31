const db = require('../db/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// register user
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

// login
const loginUser = (req, res) => {
  const { email, password } = req.body;
  db.query('select * from app_user where email = $1', [email])
    .then((result) => {
      const user = result.rows[0];
      if (!user) {
        res.status(401).json({ message: 'Invalid email or password' });
      } else {
        bcrypt.compare(password, user.password)
          .then((compPwd) => {
            if (!compPwd) {
              res.status(401).json({ message: 'Invalid email or password' });
            } else {
              // if passwords match (user is sucessfully authenticated) so we generate jwt
              const key = process.env.SECRET_KEY;
              const token = jwt.sign({ id: user.userid, email: user.email, githubUserName: user.githubusername },
                key, { expiresIn: '1h' });
              res.status(200).json({ token, expiresIn: 3600 });
            }
          })
          .catch((err) => {
            console.error(err);
            res.status(401).send('Error comparing passwords');
          });
      }
    }
    )
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error querying database');
    });
};

// logout
const logoutUser = (req, res) => {
  res.status(200).json({ message: 'Logout sucessfully' });
};

module.exports = { registerUser, loginUser, logoutUser };
