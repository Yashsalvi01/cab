const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
  phno: {
    type: String,
  },
  password: {
    type: String,
  },
  createAt: {
    type: String,
  },
  lastLoggedin: {
    type: String,
  },
  profile: {
    type: String,
  },
});

userSchema.pre("save", async function (next) {
  try {
    const saltRound = 10;
    const hashPassword = await bcrypt.hash(this.password, saltRound);
    this.password = hashPassword;
  } catch (error) {
    next(error);
  }
});

exports.user = mongoose.model("user", userSchema);
