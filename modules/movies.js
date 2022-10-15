'use strict';

const axios = require('axios');

const getMovieData = async (request, response, next) => {
    const city = request.query.city;
    console.log(city);
    try {
        const moviesURL = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&query=${city}`
        const movieResponse = await axios.get(moviesURL);
        const movieArray = movieResponse.data.results.map(movie => new Movie(movie));
        console.log(movieResponse.data);
        response.status(200).send(movieArray);
    } catch (error) {
        next(error.message);
    }
}

class Movie {
    constructor(movie) {
        this.title = movie.title;
        this.overview = movie.overview;
        this.averageVotes = movie.vote_average;
        this.totalVotes = movie.vote_count;
        this.imageUrl = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
        this.popularity = movie.popularity;
        this.releaseDate = movie.release_date;
    }
}

module.exports = getMovieData;