const rideModel = require("../models/ride.model");
const { sendMessageToSocketId } = require("../socket");
const mapService = require("./map.service");
const crypto = require("node:crypto");

async function getFare(pickup, destination) {
  if (!pickup || !destination) {
    throw new Error("pickup and destination required");
  }

  const distanceTime = await mapService.getDistanceTime(pickup, destination);

  if (!distanceTime?.distance?.value || !distanceTime?.duration?.value) {
    throw new Error("invalid distance or duration returned from mapService");
  }

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
    auto: Math.round(
      baseFare.auto +
        (distanceTime.distance.value / 1000) * perKmRate.auto +
        (perMinuteRate.auto * distanceTime.duration.value) / 60
    ),

    car: Math.round(
      baseFare.car +
        (distanceTime.distance.value / 1000) * perKmRate.car +
        (perMinuteRate.car * distanceTime.duration.value) / 60
    ),

    bike: Math.round(
      baseFare.bike +
        (distanceTime.distance.value / 1000) * perKmRate.bike +
        (perMinuteRate.bike * distanceTime.duration.value) / 60
    ),
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

async function createRide({ user, pickup, destination, vehicleType }) {
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
}

async function confirmRide(rideId, driver) {
  if (!rideId) {
    throw new Error("Ride id is required");
  }
  if (!driver) {
    throw new Error("Driver id required");
  }

  await rideModel.findOneAndUpdate(
    {
      _id: rideId,
    },
    {
      status: "accepted",
      driver: driver._id,
    }
  );
  const ride = await rideModel
    .findOne({ _id: rideId })
    .populate("user")
    .populate("driver")
    .select("+otp");
  // otp to be included in ride

  if (!ride) {
    throw new Error("ride not found");
  }
  return ride;
}

async function startRide({ rideId, otp }) {
  if (!rideId || !otp) {
    throw new Error("Ride Id and OTP are required");
  }
  const ride = await rideModel
    .findOne({
      _id: rideId,
    })
    .populate("user")
    .populate("driver")
    .select("+otp");

  if (!ride) {
    throw new Error("Ride not found");
  }
  if (ride.status !== "accepted") {
    throw new Error("Ride is not accepted");
  }

  if (ride.otp !== otp) {
    throw new Error("Invalid OTP");
  }

  await rideModel.findOneAndUpdate(
    {
      _id: rideId,
    },
    {
      status: "ongoing",
    }
  );

  sendMessageToSocketId(ride.user.socketId, {
    event: "ride-started",
    data: ride,
  });

  return ride;
}

async function finishRide({rideId, driver}){
  if(!rideId){
    throw new Error('ride id is required')
  }

  const ride = await rideModel.findOne({
    _id: rideId, 
    driver: driver._id
    // need to verify that driver belongs to the particular ride.
  }).populate('user').populate('driver').select('+otp')

  if(!ride){
    throw new Error('Ride not found')
  }

  if(ride.status !=='ongoing'){
    throw new Error('Ride not ongoing')
  }

  await rideModel.findOneAndUpdate({
    _id:rideId
  }, {status: 'completed'})

  return ride
}
module.exports = { createRide, getFare, confirmRide, startRide, finishRide };
