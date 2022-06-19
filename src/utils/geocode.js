const request = require("request");
const chalk = require("chalk");

const geoCode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoiYW1pcmZjZjcyIiwiYSI6ImNsNGdzMnZxcTBjMTQzZW56cWw0OXV3NWoifQ.zC8dt9FB6gBYYy3C7xFcAw&limit=1`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      const msg = "Unable to connect to location services!!";
      callback(msg);
    } else if (body.features.length === 0) {
      console.log(body.features);
      const msg = "Enter a valid location";
      callback(msg);
    } else {
      const { features } = body;
      const { center, place_name } = features[0];
      const [longitude, latitude] = center;
      const location = place_name;

      const data = {
        latitude,
        longitude,
        location,
      };
      console.log(data);
      callback(error, data);
    }
  });
};

module.exports = geoCode;
