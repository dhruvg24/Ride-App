// integrating google maps
const axios = require("axios");

module.exports.getAddressCoordinates = async (address) => {
  // get lat and lng of address
  // get distance, time between two points.

  const apiKey = process.env.GOOGLE_MAPS_API;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    address
  )}&key=${apiKey}`;

  try {
    const res = await axios.get(url);
    // console.log('Google MAPS API response', res.data);

    if (res.data.status === "OK") {
      const loc = res.data.results[0].geometry.location;

      return {
        lat: loc.lat,
        lng: loc.lng,
      };
    } else {
      // console.error(
      //     'Geocode api error details', res.data
      // )
      throw new Error("Unable to fetch coordinates");
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};

module.exports.getDistanceTime = async (origin, destination) => {
  if (!origin || !destination) {
    throw new Error("Origin and Destination are required!");
  }
  const apiKey = process.env.GOOGLE_MAPS_API;
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${encodeURIComponent(
    origin
  )}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

  try {
    const res = await axios.get(url);
    if (res.data.status === "OK") {
      if (res.data.rows[0].elements[0].status === "ZERO_RESULTS") {
        throw new Error("No routes found!");
      }
      const element = res.data.rows[0].elements[0];
      if(!element.distance || !element.duration){
        throw new Error('Distance or duration not found in response')
      }

      return {
        distance: element.distance,
        duration: element.duration
      }
    } else {
      throw new Error("Unable to fetch distance and time");
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};

module.exports.getAutoAddressSuggestions = async (input)=> {
    if(!input){
        throw new Error('Query is required');
    }

    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;

    try{
        const res = await axios.get(url);
        if(res.data.status==='OK'){
            return res.data.predictions;
        }else{
            throw new Error('Unable to fetch suggestions')
        }
    }catch(err){
        console.error(err)
        throw err;
    }


}
