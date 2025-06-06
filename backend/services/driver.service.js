const driverModel = require("../models/driver.model");

module.exports.createDriver = async ({
  firstname,
  lastname,
  email,
  password,
  color,
  plateNum,
  capacity,
  vehicleType,
}) => {
  if (
    !firstname ||
    !email ||
    !password ||
    !color ||
    !plateNum ||
    !capacity ||
    !vehicleType
  ) {
    throw new Error("All fields are required");
  }

  // Create a new driver instance
  const newDriver = driverModel.create({
    fullname: {
      firstname,
      lastname,
    },
    email,
    password,
    vehicle: {
      color,
      plateNum,
      capacity,
      vehicleType,
    },
  });
  return newDriver;
};
