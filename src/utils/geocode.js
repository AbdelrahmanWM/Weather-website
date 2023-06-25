const request = require('request')
const geocode = (address, callback) => {
    const url = 'http://api.positionstack.com/v1/forward?access_key=a2ad3f871d6f292e5261b974721cb3af&query=' + encodeURIComponent(address) + '&limit=1'
    //console.log(url)
    request({ url, json: true }, (error, response) => {
      //console.log(response.body.data[0])
      //console.log(response)
      if (error) { callback('Unable to connect ot location services',undefined) }
      else if (response.body.error||response.body.data.length==0) { callback('Unable to find location. Try another search',undefined)}
      else{const data =response.body.data[0]
       callback(undefined,{latitude : data.latitude,longitude : data.longitude,location : data.name})
      }
    })
  }
  module.exports=geocode