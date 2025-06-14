const mongoose = require("mongoose");

const rideSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "driver",
  },
  pickup: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  fare: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "ongoing", "completed", "cancelled"],
    default: "pending",
  },
  duration: {
    type: Number,
    // in seconds
  },
  distance: {
    type: Number,
    // in meters
  },
  // rating can be given
  paymentID: {
    type: String,
  },
  orderID: {
    type: String,
  },
  otp: {
    type: String,
    select: false,
    required: true,
    // this otp goes to the user.
  },
  signature: {
    type: String,
  },
});

module.exports = mongoose.model("ride", rideSchema);
