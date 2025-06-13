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
  '/get-fare', authMiddleware.authUser, query('pickup').isString().isLength({min: 3}).withMessage('Invalid pickup location'),query('destination').isString().isLength({min: 3}).withMessage('Invalid destination location'),rideController.getFare
)

module.exports = router;
