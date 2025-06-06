const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const driverController = require("../controllers/driver.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post(
  "/register-driver",
  [
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("First name should be at least 3 characters long"),
    body("fullname.lastname")
      .optional()
      .isLength({ min: 3 })
      .withMessage("Last name should be atleast 3 characters long"),
    body("email").isEmail().withMessage("Please enter a valid email address"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    body("vehicle.color")
      .isLength({ min: 3 })
      .withMessage("Color should be at least 3 characters long"),
    body("vehicle.plateNum")
      .matches(/^[A-Z]{2}\s?[0-9]{1,2}\s?[A-Z]{1,3}\s?[0-9]{1,4}$/)
      .withMessage("Please enter a valid vehicle plate number"),
    body("vehicle.capacity")
      .isInt({ min: 1 })
      .withMessage("Capacity must be at least 1"),
    body("vehicle.vehicleType")
      .isIn(["car", "bike", "scooty", "auto"])
      .withMessage("Vehicle type must be one of car, bike, scooty, auto"),
  ],
  driverController.registerDriver
);


router.post('/login-driver',[
  body('email').isEmail().withMessage('Please enter a valid email address'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], driverController.loginDriver);


router.get('/profile', authMiddleware.authDriver, driverController.getDriverProfile);


router.get('/logout', authMiddleware.authDriver, driverController.logoutDriver);

module.exports = router;
