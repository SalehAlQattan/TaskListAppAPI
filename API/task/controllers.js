// importing models
const { Task } = require('../../db/models');

// fetch dsingle task
exports.fetchSingleTask = async (taskId, next) => {
  try {
    return await Task.findByPk(taskId);
  } catch (error) {
    next(error);
  }
};

// fetch all tasks
exports.fetchTask = async (req, res, next) => {
  try {
    const tasks = await Task.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });
    res.json(tasks);
  } catch (error) {
    console.error(error);
  }
};

// delete task
exports.deleteTask = async (req, res, next) => {
  const { taskId } = req.params;
  try {
    const foundTask = await Task.findByPk(taskId);
    if (foundTask) await foundTask.destroy();
    res.status(204).end();
  } catch (error) {
    res.status(404).json({ message: 'Task Not Found' });
    console.error(error);
  }
};

// create task
exports.createTask = async (req, res, next) => {
  try {
    const newTask = await Task.create(req.body);
    res.status(201).json(newTask);
  } catch (error) {
    console.error(error);
  }
};

// update task
exports.updateTask = async (req, res, next) => {
  try {
    const updatedTask = await req.task.update(req.body);
    res.json(updatedTask);
  } catch (error) {
    next(error);
  }
};
