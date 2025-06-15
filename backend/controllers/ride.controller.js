const rideService = require("../services/ride.service");
const { validationResult } = require("express-validator");
const mapService = require('../services/map.service')
const {sendMessageToSocketId} = require('../socket')

module.exports.createRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  if(!req.user){
    return res.status(401).json({message : 'User not authenticated.'})
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
    const nearbyDrivers = await mapService.getNearbyDrivers(pickupCoordinates.ltd, pickupCoordinates.lng, 10000)
    // all drivers under 2km radius

    console.log('Nearby drivers:', nearbyDrivers);
    ride.otp='';
    // need to remove otp for drivers until it is accepted by them.

    nearbyDrivers.map(driver=>{
      // need to send notification to drivers nearby
      console.log(driver,ride);
      sendMessageToSocketId(driver.socketId, {
        // message: 
        event: 'new-ride', 
        data: ride
      })
    })

    res.status(201).json({ride});


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
