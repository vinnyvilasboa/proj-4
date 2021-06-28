const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    Title: {
        type: String,

    },
    Year: {
        type: String,

    },
    Rated: {
        type: String,

    },
    Genre: {
        type: String,

    },
    Director: {
        type: String
    },
    Writer: {
        type: String
    },
    Actors: {
        type: String
    },
    Plot: {
        type: String
    },
    Language: {
        type: String
    },
    Country: {
        type: String
    },
    Awards: {
        type: String
    },
    Poster: {
        type: String
    },
    Metascore: {
        type: String
    },
    imdbRating: {
        type: String
    },
    imdbVotes: {
        type: String
    },
    imdbID: {
        type: String
    },
    Type: {
        type: String
    },
    DVD: {
        type: String
    },
    BoxOffice: {
        type: String
    },
    Production: {
        type: String
    },
    Entertainment: {
        type: String
    },
    Youtube: {

    }
});

const movie = mongoose.model('movie', movieSchema);
module.exports = movie;