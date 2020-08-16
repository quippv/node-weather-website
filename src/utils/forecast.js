const request = require("request");

const forecast = (latitude, longtitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=f44fb7d18984ac3bbdd590308087123c&query=${encodeURIComponent(
    longtitude
  )},${encodeURIComponent(latitude)}&units=f`;

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback(body.error.info, undefined);
    } else {
      callback(
        undefined,
        `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} fahrenheit outsite. But feels like ${body.current.feelslike} fahrenheit outside.`
      );
    }
  });
};

module.exports = forecast;
