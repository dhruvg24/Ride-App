const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minlength: [3, "First name should be atleast 3 characters long"],
    },
    lastname: {
      type: String,
      minlength: [3, "Last name should be atleast 3 characters long"],
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    // match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    minlength: [5, "Email must be atleast 5 characters long"],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  socketId: {
    type: String,
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  return token;
};

userSchema.methods.comparePasswords = async function (pswd) {
  return await bcrypt.compare(pswd, this.password);
};

userSchema.statics.hashPassword = async function (pswd) {
  return await bcrypt.hash(pswd, 10);
};

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
