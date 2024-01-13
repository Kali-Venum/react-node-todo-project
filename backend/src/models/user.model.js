const mongoose = require("mongoose");
const validator = require("validator");

// User Schema.
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (value && !validator.isEmail(value)) {
          throw new Error("Invalid email");
        }
      },
    },
    password: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      enum: ["user"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.set("toJSON", {
  transform: (doc, ret, opt) => {
    delete ret.password;
    delete ret.otp;
    return ret;
  },
});

module.exports = mongoose.model("user", userSchema);
