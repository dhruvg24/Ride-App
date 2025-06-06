const { validationResult } = require("express-validator");
const driverModel = require("../models/driver.model");
const driverService = require("../services/driver.service");
const blacklistTokenModel = require("../models/blacklistToken.model");

module.exports.registerDriver = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullname, email, password, vehicle } = req.body;

  const { color, plateNum, capacity, vehicleType } = vehicle;

  const isDriverExists = await driverModel.findOne({ email });
  if (isDriverExists) {
    return res
      .status(400)
      .json({ error: "Driver with this email already exists" });
  }

  const hashedPassword = await driverModel.hashPassword(password);

  // create driver
  const driver = await driverService.createDriver({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashedPassword,
    color,
    plateNum,
    capacity,
    vehicleType,
  });

  const token = driver.generateAuthToken();
  res.status(201).json({ token, driver });
};

module.exports.loginDriver = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  const driver = await driverModel.findOne({ email }).select("+password");
  if (!driver) {
    return res.status(400).json({ error: "Invalid email or password" });
  }

  const isPasswordValid = await driver.comparePasswords(
    password,
    driver.password
  );
  if (!isPasswordValid) {
    return res.status(400).json({ error: "Invalid email or password" });
  }

  const token = driver.generateAuthToken();

  // token to be set in cookie as well
  res.cookie("token", token);

  res.status(200).json({ token, driver });
};

module.exports.getDriverProfile = async (req, res) => {
  const driver = req.driver; // from authDriver middleware

  if (!driver) {
    return res.status(404).json({ error: "Driver not found" });
  }

  res.status(200).json({ driver });
};

module.exports.logoutDriver = async (req, res) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  // Add token to blacklist
  await blacklistTokenModel.create({ token });

  // Clear the cookie
  res.clearCookie("token");

  res.status(200).json({ message: "Logged out successfully" });
};
