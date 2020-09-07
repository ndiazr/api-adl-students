const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const port = 4000;

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(cors());

const dbConfig = require('./config/db.config.js');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {
  useNewUrlParser: true
}).then(() => {
  console.log("Successfully connected to the database");
}).catch(err => {
  console.log('Could not connect to the database.', err);
  process.exit();
});

app.get('/', (req, res) => {
  res.json({ "message": "Hello World" });
});

const studentRoutes = require('./src/routes/student.routes')
app.use('/api/students', studentRoutes)

app.listen(port, () => {
  console.log(`Node server is listening on port ${port}`);
});

module.exports = app;