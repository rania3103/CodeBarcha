const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT;
const todoRoutes = require('./routes/todoRoutes');
const userRoutes = require('./routes/userRoutes');
const githubRoutes = require('./routes/githubRoutes');
// Middleware
app.use(express.json());
// Routes
app.use('/api/todo', todoRoutes);
app.use('/api/auth', userRoutes);
app.use('/api/github', githubRoutes);

app.listen(port, () => {
  console.log('server is running');
});
