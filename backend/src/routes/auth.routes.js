const express = require("express");
const router = express.Router();
const validate = require("../middlewares/validate");
const auth = require("../middlewares/auth");

// Controller imports.
const authController = require("../controllers/auth.controller");

// Validation imports.
const authValidation = require("../validations/auth.validation");

// Register route.
router.post(
  "/register",
  validate(authValidation.register),
  authController.register
);

// Login route.
router.post("/login", validate(authValidation.login), authController.login);

module.exports = router;
