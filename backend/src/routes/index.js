const express = require("express");
const router = express.Router();

// Route files.
const authRoutes = require("./auth.routes");
const taskRoutes = require("./task.routes");

/* ------------------------------------------------------ Routes ----------------------------------------------------- */

// Auth Routes.
router.use("/auth", authRoutes);
router.use("/task", taskRoutes);

module.exports = router;