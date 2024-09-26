const express = require('express');
const connection = require('./config/db');
const cors = require('cors');
const app = express();
const port = 4000;

connection();

app.use(cors());
app.use(express.json()); 

// Routes
app.use('/api', require('./Routers/route'));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
