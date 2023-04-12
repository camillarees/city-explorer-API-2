'use strict';

const axios = require('axios');

const cache = require('./cache.js');

// define an endpoint that gets the weather data and returns it to React
        //grab the searchQuery from the request object 
        // baseURL, endpoint, query, queryParameters

const getWeatherData = async (request, response, next) => {
    try {
        const lat = request.query.lat;
        const lon = request.query.lon;
        const weatherKey = process.env.REACT_APP_WEATHER_KEY;
        const weatherURL = `https://api.weatherbit.io/v2.0/forecast/daily?key=${weatherKey}&lat=${lat}&lon=${lon}&days=6`
        const weatherResponse = await axios.get(weatherURL);
        const key = 'weather-' + lat + lon;
        console.log(weatherURL);
 
        if (cache[key] && (Date.now() - cache[key].timestamp < 50000)) {
            console.log('weather cache hit');
        } else {
            console.log('weather cache miss');
            cache[key] = {};
            cache[key].timestamp = Date.now();
            cache[key].data = weatherResponse.data.data.map(forecast => new Forecast(forecast, cache[key].timestamp));
        }
        response.send(cache[key].data);

    } catch (error) {
        next(error.message);
    }
}



class Forecast {
    constructor(forecast) {
        // find method to find the type of list we want to return
        this.date = forecast.valid_date;
        this.description = forecast.weather.description;
    };

}

module.exports = getWeatherData;


