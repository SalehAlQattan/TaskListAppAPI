// libraries
const express = require('express');
const router = express.Router();

// controllers
const {
  fetchTask,
  deleteTask,
  createTask,
  fetchSingleTask,
  updateTask,
} = require('./controllers');

// fetch single task
router.param('taskId', async (req, res, next, taskId) => {
  const task = await fetchSingleTask(taskId, next);
  if (task) {
    req.task = task;
    next();
  } else {
    const error = new Error('Task Not Found');
    error.status = 404;
    next(error);
  }
});

// fetch all task
router.get('/', fetchTask);

// delete task
router.delete('/:taskId', deleteTask);

// create task
router.post('/', createTask);

// update task
router.put('/:taskId', updateTask);

// exporting
module.exports = router;
