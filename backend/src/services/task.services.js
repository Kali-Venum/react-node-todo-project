const bcryptjs = require("bcryptjs");
const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");
const messages = require("../messages.json");
const mongoose = require("mongoose");

// Models.
const TaskModel = require("../models/task.model");

/** --------------------------------------------------- services ------------------------------------------- */

// Create a task.
const createATask = async (reqUser, reqBody) => {
  if (reqUser.role === "user") {
    const task = await TaskModel.create({
      user: reqUser._id,
      name: reqBody.name,
      description: reqBody.description,
    });

    if (task) {
      return task;
    }
  } else {
    httpStatus.BAD_REQUEST, messages.USER.UNAUTHORIZED;
  }
};

const getAllTasksOfAUser = async (reqUser) => {
  if (reqUser.role === "user") {
    const tasks = await TaskModel.find({
      user: new mongoose.Types.ObjectId(reqUser._id),
    }).sort({ createdAt: -1 });

    if (tasks) {
      return tasks;
    }
  } else {
    httpStatus.BAD_REQUEST, messages.USER.UNAUTHORIZED;
  }
};

module.exports = {
  createATask,
  getAllTasksOfAUser,
};
