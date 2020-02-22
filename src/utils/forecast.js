const request = require('request')


const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/76733e9c3ca293ed6de639d3d5bf874f/' + latitude + ',' + longitude + '?units=si'
    
    request ({ url, json:true}, (error, {body}) => {
        if (error){
            callback('unable to connect to weather service!', undefined)
        } else if (body.error){
            callback ('unable to find the location', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degree out.  There is a ' + body.currently.precipProbability + ' % chance of rain.')

            
        }
    }
    )
}

module.exports = forecast