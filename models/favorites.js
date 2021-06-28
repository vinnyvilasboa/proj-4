const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favoritesSchema = new Schema({
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
    userSchema: {
        type: Schema.Types.ObjectId,
        ref: 'User Schema '
    }
});

const favorites = mongoose.model('favorites', favoritesSchema);
module.exports = favorites;