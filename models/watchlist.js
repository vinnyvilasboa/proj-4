const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const watchlistSchema = new Schema({
    Title: {
        type: String,
    },
    Poster: {
        type: String,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    },
    movieId: {
        type: Schema.Types.ObjectId,
        ref: 'movie'
    }
});

const Watchlist = mongoose.model('Watchlist', watchlistSchema);
module.exports = Watchlist;