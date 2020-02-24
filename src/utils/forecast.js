const request = require('request')


const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/76733e9c3ca293ed6de639d3d5bf874f/' + latitude + ',' + longitude + '?units=si'
    
    request ({ url, json:true}, (error, {body}) => {
        if (error){
            callback('unable to connect to weather service!', undefined)
        } else if (body.error){
            callback ('unable to find the location', undefined)
        } else {
            console.log(body.daily.data[0])
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degree out. This high today is ' + body.daily.data[0].temperatureHigh + ' degree with a low of ' + body.daily.data[0].temperatureLow + ' degree. There is a ' + body.currently.precipProbability + ' % chance of rain.')

            
        }
    }
    )
}

module.exports = forecast