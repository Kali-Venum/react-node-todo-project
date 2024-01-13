const bcryptjs = require("bcryptjs");
const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");
const messages = require("../messages.json");
const mongoose = require("mongoose");

// Models.
const UserModel = require("../models/user.model");

/** --------------------------------------------------- services ------------------------------------------------- */

// Register a user.
const register = async (reqBody) => {
  const existingUser = await UserModel.findOne({
    email: reqBody.email,
  });

  if (existingUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, messages.USER.USER_ALREADY_EXISTS);
  } else {
    // Hasing the password.
    const password = await bcryptjs.hash(reqBody.password, 10);

    const newUser = new UserModel({
      name: reqBody.name,
      email: reqBody.email,
      password,
    });

    const user = await newUser.save();

    if (user) {
      return user;
    }
  }
};

// Login a user.
const login = async (reqBody) => {
  const existingUser = await UserModel.findOne({
    email: reqBody.email,
  });

  if (!existingUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, messages.USER.USER_NOT_FOUND);
  } else {
    // Checking the user password.
    const passwordCheck = await bcryptjs.compare(
      reqBody.password,
      existingUser.password
    );

    if (passwordCheck) {
      return existingUser;
    } else {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        messages.USER.INVALID_EMAIL_AND_PASSWORD_COMBINATION
      );
    }
  }
};

module.exports = {
  register,
  login,
};
