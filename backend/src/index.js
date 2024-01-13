const express = require("express");
const helmet = require("helmet");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const cors = require("cors");
const passport = require("passport");
const httpStatus = require("http-status");
const { errorConverter, errorHandler } = require("./middlewares/error");
const { jwtStrategy } = require("./configs/passport");
const morgan = require("./configs/morgan");
const { DBconnect } = require("./configs/db.config");
const config = require("./configs/configs");
const routes = require("./routes/index");
const ApiError = require("./utils/ApiError");

// Initializing App.
const app = express();

// Database connection.
DBconnect(app);

// enable cors
app.use(cors());
app.options("*", cors());

if (config.env !== "test") {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// set security HTTP headers.
app.use(helmet());

// parse json.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());
app.use(mongoSanitize());

app.use(passport.initialize());
passport.use("jwt", jwtStrategy);

// Set Static directory.
app.use(express.static("public"));

// Routes.
app.use("/api", routes);

// Error handeling.
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Page Not found"));
});
app.use(errorConverter);
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT;
app.on("ready", () => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
