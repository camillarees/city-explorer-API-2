'use strict';

const axios = require('axios');
let cache = require('./cache.js');

const getMovieData = async (request, response, next) => {
    try {
        const city = request.query.city;
        const movieKey = process.env.REACT_APP_MOVIE_API_KEY;
        const moviesURL = `https://api.themoviedb.org/3/search/movie?api_key=${movieKey}&query=${city}`;
        const movieResponse = await axios.get(moviesURL);
        const key = 'movie-' + request.query.searchQuery;

        if (cache[key] && (Date.now() - cache[key].timestamp < 100000)) {
            console.log('movie cache hit');
        } else {
            console.log('movie cache miss');
            cache[key] = {};
            cache[key].timestamp = Date.now();
            cache[key].data = movieResponse.data.results.map(movie => new Movie(movie));
        }
        response.send(cache[key].data)
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