'use strict';

const axios = require('axios');

// define an endpoint that gets the weather data and returns it to React
const getWeatherData = async (request, response, next) => {
    const lat = request.query.lat;
    const lon = request.query.lon;
    // console.log(lat, lon);
    try {
        //grab the searchQuery from the request object 
        // baseURL, endpoint, query, queryParameters
        const weatherURL = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.REACT_APP_WEATHER_KEY}&lat=${lat}&lon=${lon}&days=5`
        const weatherResponse = await axios.get(weatherURL);
        console.log(weatherResponse.data.data[0]);
        const weatherArray = weatherResponse.data.data.map(forecast => new Forecast(forecast));

        response.status(200).send(weatherArray);
    } catch (error) {
        next(error.message);
    }
};

class Forecast {
    constructor(forecast) {
        // find method to find the type of list we want to return
        this.date = forecast.datetime;
        this.description = forecast.weather.description;
    };

}



module.exports = getWeatherData;