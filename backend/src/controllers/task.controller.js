const catchAsync = require("../utils/catchAsync");
const messages = require("../messages.json");
// const httpStatus = require("http-status");

// Sercice imports.
const taskService = require("../services/task.services");

/** ----------------------------------------------- controllers --------------------------------------- */

// Create a task controller.
const createATask = catchAsync(async (req, res) => {
  const task = await taskService.createATask(req.user, req.body);

  if (task) {
    return res.status(201).send({
      serverResponse: {
        message: messages.SUCCESS,
      },
      result: {
        data: task,
      },
    });
  }
});

const getAllTasksOfAUser = catchAsync(async (req, res) => {
  const tasks = await taskService.getAllTasksOfAUser(req.user);

  if (tasks) {
    return res.status(200).send({
      serverResponse: {
        message: messages.SUCCESS,
      },
      result: {
        data: tasks,
      },
    });
  }
});

module.exports = {
  createATask,
  getAllTasksOfAUser,
};
