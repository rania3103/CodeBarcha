const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT;
app.use(express.json());

app.listen(port, () => {
  console.log('server is running');
});
