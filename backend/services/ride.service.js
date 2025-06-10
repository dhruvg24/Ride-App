const rideModel = require("../models/ride.model");
const mapService = require("./map.service");
const crypto = require("node:crypto");

async function getFare(pickup, destination) {
  if (!pickup || !destination) {
    throw new Error("pickup and destination required");
  }

  const distanceTime = await mapService.getDistanceTime(pickup, destination);

  // fare creation for all kinds of vehicle we have: auto, bike, car

  const baseFare = {
    // per km
    auto: 30,
    car: 50,
    bike: 20,
  };

  const perKmRate = {
    auto: 10,
    car: 15,
    bike: 8,
  };

  const perMinuteRate = {
    auto: 2,
    car: 3,
    bike: 1.4,
  };

  //   console.log(distanceTime);

  const fareCalculation = {
    auto:
      baseFare.auto +
      (distanceTime.distance.value / 1000) * perKmRate.auto +
      (perMinuteRate.auto * distanceTime.duration.value) / 60,

    car:
      baseFare.auto +
      (distanceTime.distance.value / 1000) * perKmRate.car +
      (perMinuteRate.car * distanceTime.duration.value) / 60,

    bike:
      baseFare.bike +
      (distanceTime.distance.value / 1000) * perKmRate.bike +
      (perMinuteRate.bike * distanceTime.duration.value) / 60,
  };
  //   console.log(fareCalculation);
  return fareCalculation;
}

function getOTP(num) {
  // otp of length = num.
  const otp = crypto
    .randomInt(Math.pow(10, num - 1), Math.pow(10, num))
    .toString();

  return otp;
}

module.exports.createRide = async ({
  user,
  pickup,
  destination,
  vehicleType,
}) => {
  // userId, pickup, destination, type of vehicle needed
  if (!user || !pickup || !destination || !vehicleType) {
    throw new Error("All fields are required");
  }

  const fare = await getFare(pickup, destination);

  const ride = rideModel.create({
    user,
    pickup,
    destination,
    otp: getOTP(5),
    fare: fare[vehicleType],
  });

  return ride;
};
