const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const watchlistSchema = new Schema({
    Title: {
        type: String,
    },
    Poster: {
        type: String,
    },
    userSchema: {
        type: Schema.Types.ObjectId,
        ref: 'User Schema '
    }
});

const Watchlist = mongoose.model('Watchlist', watchlistSchema);
module.exports = Watchlist;