const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const driverSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minlength: [3, "First name should be at least 3 characters long"],
    },
    lastname: {
      type: String,
      minlength: [3, "Last name should be at least 3 characters long"],
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  socketId: {
    type: String,
  },
  status: {
    type: String,
    enum: ["available", "unavailable"],
    default: "unavailable",
  },
  vehicle: {
    color: {
      type: String,
      required: true,
      minlength: [3, "Color should be at least 3 characters long"],
    },
    plateNum: {
      type: String,
      required: true,
      unique: true,
      match: [/^[A-Z]{2}\s?[0-9]{1,2}\s?[A-Z]{1,3}\s?[0-9]{1,4}$/, "Please enter a valid vehicle plate number"],
    },
    capacity: {
      type: Number,
      required: true,
      min: [1, "Capacity must be atleast 1"],
    },
    vehicleType: {
      type: String,
      required: true,
      enum: ["car", "bike", "scooty", "auto"],
    },
  },

  location: {
    lat: {
      type: Number,
      // latitude
    },
    lng: {
      type: Number,
      // longitude
    },
  },
});

driverSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  return token;
};

driverSchema.methods.comparePasswords = async function (pswd) {
  return await bcrypt.compare(pswd, this.password);
};

driverSchema.statics.hashPassword = async function (pswd) {
  return await bcrypt.hash(pswd, 10);
};

const driverModel = mongoose.model("driver", driverSchema);

module.exports = driverModel;
