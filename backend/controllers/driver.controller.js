const { validationResult } = require("express-validator");
const driverModel = require("../models/driver.model");
const driverService = require("../services/driver.service");

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
