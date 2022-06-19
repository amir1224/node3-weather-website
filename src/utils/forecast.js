const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=383c4e5c56d71ea282068774d5381f4c&query=${latitude},${longitude}`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback(`check your internet connection`, undefined);
    } else if (body.error) {
      callback(body.error.info, undefined);
    } else {
      const { current } = body;
      const { weather_descriptions, feelslike, temperature } = current;
      const msg = `The weather is ${weather_descriptions}.It is currently ${temperature} degrees out. It feels like ${feelslike} degrees out.`;
      callback(undefined, msg);
    }
  });
};

module.exports = forecast;
