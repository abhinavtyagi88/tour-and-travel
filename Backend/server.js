const express = require('express');
const connection = require('./config/db');
const cors = require('cors');
const app = express();
require('dotenv').config()
console.log(process.env)
const port = process.env.PORT || 4000;

connection();

app.use(cors());
app.use(express.json()); 

// Routes
app.use('/api', require('./Routers/user'));
app.use('/api', require('./Routers/touristPlaceRoute'));
app.use('/api', require('./Routers/post'));
// app.use('/api', require('./Routers/visited'));
app.use('/api', require('./Routers/team'));
app.use('/api', require('./Routers/Localguide'));

// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
// });

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
