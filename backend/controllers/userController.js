const db = require('../db/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Docker = require('dockerode');
const docker = new Docker();
const { manageWorkspace, generateWorkspaceName } = require('./workspaceController');
require('dotenv').config();

// register user
const registerUser = (req, res) => {
  const { email, githubusername, password } = req.body;
  if (!email || !githubusername || !password) {
    return res.status(400).json({ message: 'please fill all the required fields!' });
  }
  bcrypt.hash(password, 10)
    .then((hashedPwd) => {
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
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required!' });
  }
  db.query('select * from app_user where email = $1', [email])
    .then(async (result) => {
      const user = result.rows[0];
      if (!user) {
        res.status(401).json({ message: 'Invalid email or password' });
      } else {
        bcrypt.compare(password, user.password)
          .then(async (compPwd) => {
            if (!compPwd) {
              res.status(401).json({ message: 'Invalid email or password' });
            } else {
              // if passwords match (user is sucessfully authenticated) so we generate jwt
              const key = process.env.SECRET_KEY;
              const token = jwt.sign({ id: user.userid, email: user.email, githubUserName: user.githubusername, githubAccessToken: user.githubaccesstoken },
                key);
              res.status(200).json({ token });
            }
          })
          .catch((err) => {
            console.error(err);
            res.status(401).send('Error comparing passwords');
          });
        manageWorkspace(user.userid);
      }
    }
    )
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error querying database');
    });
};

// logout
const logoutUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const workspaceName = generateWorkspaceName(userId);
    const container = docker.getContainer(workspaceName);
    if ((await container.inspect()).State.Running) {
      await container.stop();
    }
    req.logout();
    req.session.destroy((err) => {
      if (err) {
        console.error(err);
      }
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = { registerUser, loginUser, logoutUser };
