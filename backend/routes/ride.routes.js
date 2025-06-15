const express = require("express");
const router = express.Router();
const { body, query } = require("express-validator");
const rideController = require("../controllers/ride.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post(
  "/create-ride",
  authMiddleware.authUser,
  body("pickup")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid pickup address"),
  body("destination")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid destination address"),
  body("vehicleType")
    .isString()
    .isIn(["auto", "car", "bike"])
    .withMessage("Invalid vehicle type"),
  rideController.createRide
);
// needs user id, pickup loc, dest

router.get(
  "/get-fare",
  authMiddleware.authUser,
  query("pickup")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid pickup location"),
  query("destination")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid destination location"),
  rideController.getFare
);

router.post(
  "/confirm-ride",
  authMiddleware.authDriver,
  body("rideId").isMongoId().withMessage("Invalid Ride ID"),
  rideController.confirmRide
);

router.get(
  '/start-ride',
  authMiddleware.authDriver,
  query('rideId').isMongoId().withMessage('Invalid ride Id'), 
  query('otp').isString().isLength({min:5, max:5}).withMessage('Invalid OTP'), rideController.startRide
)

module.exports = router;
