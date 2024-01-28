const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT;
const todoRoutes = require('./routes/todoRoutes');
// Middleware
app.use(express.json());
// Routes
app.use('/api/todo', todoRoutes);

app.listen(port, () => {
  console.log('server is running');
});
