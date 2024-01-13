const catchAsync = require("../utils/catchAsync");
const messages = require("../messages.json");
// const httpStatus = require("http-status");

// Sercice imports.
const authService = require("../services/auth.services");
const tokenService = require("../services/token.service");

/** ----------------------------------------------- controllers --------------------------------------- */

// Register controller.
const register = catchAsync(async (req, res) => {
  const user = await authService.register(req.body);

  if (user) {
    return res.status(201).send({
      serverResponse: {
        message: messages.SUCCESS,
      },
      result: {
        data: user,
      },
    });
  }
});

// Login controller.
const login = catchAsync(async (req, res) => {
  const user = await authService.login(req.body);

  if (user) {
    const tokens = await tokenService.generateAuthTokens(user);

    return res.status(200).send({
      serverResponse: {
        message: messages.SUCCESS,
      },
      result: {
        data: user,
        tokens,
      },
    });
  }
});

module.exports = {
  register,
  login,
};
