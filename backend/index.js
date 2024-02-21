const express = require('express');
const todoRoutes = require('./routes/todoRoutes');
const userRoutes = require('./routes/userRoutes');
const githubRoutes = require('./routes/githubRoutes');
const githubAuthRoutes = require('./routes/githubAuthRoutes');
const commandsRoutes = require('./routes/commandsRoutes');
const passport = require('./config/passport-config');
const session = require('express-session');

const app = express();
require('dotenv').config();

const port = process.env.PORT;

// Middlewares
app.use(express.json());
app.use(session({ secret: process.env.SECRET, resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/todo', todoRoutes);
app.use('/api/auth', userRoutes);
app.use('/auth/github', githubAuthRoutes);
app.use('/api/github', githubRoutes);
app.use('/api/exec-command', commandsRoutes);

app.listen(port, () => {
  console.log('server is running');
});
