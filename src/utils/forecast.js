const request = require('request')
const forecast = (latitude, longitude, callback) => {
  const url = 'http://api.weatherstack.com/current?access_key=9e83b27cd15d3485183927fdad32e797&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude)
  request({ url, json: true }, (error, response) => {
    if (error) {
      callback('Unable to connect ot location services', undefined)
    }
    else if (response.body.error) {
      callback('Unable to find location. Try another search', undefined)
    }
    else {

      callback(undefined, {

        location: response.body.location.name + ', ' + response.body.location.region + ', ' + response.body.location.country,

        weatherDescribe: "It is " + response.body.current.weather_descriptions[0]
          + ", it is currently " + response.body.current.temperature + ' degrees out. It feels like ' +
          response.body.current.feelslike + ". The humidity is " + response.body.current.humidity + '%.'
      })
    }

  })
}
module.exports = forecast