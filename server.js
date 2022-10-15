'use strict';

// requires are similar to imports
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const axios = require('axios');

const getWeatherData = require('./modules/weather.js');
const getMovieData = require('./modules/movies.js');

// create an instance of an Express server
const app = express();

// middleware - tells our express app to use cors
app.use(cors());

// set out PORT variable to tell our Express app where to serve our server
const PORT = process.env.PORT || 3002;

// define the "home" route (endpoint)
app.get('/', (request, response) => {
    response.send('test');

});

app.get('/weather', getWeatherData)

app.get('/movies', getMovieData)


app.get('/fakeError', (request, response, next) => {
    try {
        const nonexistentData = require('./nonexistentData/js');
        response.send(nonexistentData);
    } catch (error) {
        next(error.message);

    }
}
)

// error handling middleware must be the last app.use() defined in the server file
app.use((error, request, response, next) => {
    console.log(error);
    response.status(500).send(error);
});


// this line of code needs to be the last line in the file
// listen tells our app which port to listen on
// which port ot serve our server on
app.listen(PORT, console.log(`listening on PORT ${PORT}`));


