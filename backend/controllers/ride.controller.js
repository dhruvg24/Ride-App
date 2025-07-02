const rideService = require("../services/ride.service");
const { validationResult } = require("express-validator");
const mapService = require("../services/map.service");
const { sendMessageToSocketId } = require("../socket");
const rideModel = require("../models/ride.model");

module.exports.createRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  if (!req.user) {
    return res.status(401).json({ message: "User not authenticated." });
  }
  const { userId, pickup, destination, vehicleType } = req.body;

  try {
    const ride = await rideService.createRide({
      user: req.user._id,
      pickup,
      destination,
      vehicleType,
    });

    const pickupCoordinates = await mapService.getAddressCoordinates(pickup);
    console.log(pickupCoordinates);
    const nearbyDrivers = await mapService.getNearbyDrivers(
      pickupCoordinates.lng,
      pickupCoordinates.ltd,
      10
    );
    // all drivers under 10km radius

    console.log("Nearby drivers:", nearbyDrivers);
    ride.otp = "";
    // need to remove otp for drivers until it is accepted by them.

    const rideWithUser = await rideModel
      .findOne({ _id: ride._id })
      .populate("user");

    nearbyDrivers.map((driver) => {
      // need to send notification to drivers nearby
      console.log(driver, ride);
      if (driver.socketId) {
        sendMessageToSocketId(driver.socketId, {
          // message:
          event: "new-ride",
          data: rideWithUser,
        });
      }
    });

    res.status(201).json({ ride });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports.getFare = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { pickup, destination } = req.query;

  try {
    const fare = await rideService.getFare(pickup, destination);
    return res.status(200).json(fare);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports.confirmRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { rideId } = req.body;

  try {
    const ride = await rideService.confirmRide(rideId, req.driver);

    console.log(
      "Ride confirmed, sending socket message to user:",
      ride.user.socketId
    );
    if (ride.user?.socketId) {
      sendMessageToSocketId(ride.user.socketId, {
        event: "ride-confirmed",
        data: ride,
      });
    }

    return res.status(200).json(ride);
  } catch (err) {
    console.error("Error confirming ride", err);
    return res.status(500).json({ message: err.message });
  }
};

module.exports.startRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { rideId, otp } = req.query;
  try {
    const ride = await rideService.startRide({
      rideId,
      otp,
      driver: req.driver,
    });

    sendMessageToSocketId(ride.user.socketId, {
      event: "ride-started",
      data: ride,
    });

    return res.status(200).json({ ride });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports.finishRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { rideId } = req.body;

  try {
    const ride = await rideService.finishRide({ rideId, driver: req.driver });
    // we need to verify/check that req.driver belongs to the particular ride itself... -> check in ride.service.js
    sendMessageToSocketId(ride.user.socketId, {
      event: "ride-ended",
      data: ride,
    });

    // ride is finished

    return res.status(200).json(ride);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
