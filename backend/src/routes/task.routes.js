const express = require("express");
const router = express.Router();
const validate = require("../middlewares/validate");
const auth = require("../middlewares/auth");

// Controller imports.
const taskController = require("../controllers/task.controller");

// Validation imports.
const taskValidation = require("../validations/task.validation");

// Create a task route.
router.post(
  "/create",
  auth(),
  validate(taskValidation.createATask),
  taskController.createATask
);

// Update a task route.
router.patch(
  "/update/:taskId",
  auth(),
  validate(taskValidation.updateATask),
  taskController.updateATask
);

// Delete a task route.
router.delete(
  "/delete/:taskId",
  auth(),
  validate(taskValidation.deleteATask),
  taskController.deleteATask
);

// Get all tasks of a user route.
router.get(
  "/get",
  auth(),
  taskController.getAllTasksOfAUser
);

module.exports = router;
