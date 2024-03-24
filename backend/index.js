const express = require('express');
const todoRoutes = require('./routes/todoRoutes');
const userRoutes = require('./routes/userRoutes');
const passport = require('./config/passport-config');
const githubAuthRoutes = require('./routes/githubAuthRoutes');
const githubRoutes = require('./routes/githubRoutes');
const workspaceRoutes = require('./routes/workspaceRoutes');
const session = require('express-session');
const cors = require('cors');
const app = express();
require('dotenv').config();

const port = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(session({ secret: process.env.SECRET, resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/todo', todoRoutes);
app.use('/api/auth', userRoutes);
app.use('/auth/github', githubAuthRoutes);
app.use('/api/github', githubRoutes);
app.use('/api/workspace', workspaceRoutes);

app.listen(port, () => {
  console.log('server is running');
});
