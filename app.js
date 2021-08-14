// importing library
const express = require('express');
const cors = require('cors');

// importing db
const db = require('./db/models');

// new express instance
const app = express();

// importing routes
const tasksRoutes = require('./API/task/routes');

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use('/tasks', tasksRoutes);

// runinning the app and conncting to db
const run = async () => {
  try {
    // conncting to db
    await db.sequelize.sync({ alter: true });
    console.log('Database is connected');
    // running the server
    app.listen(8000, console.log('The server is running on port 8000'));
  } catch (error) {
    console.error(error);
  }
};
run();
