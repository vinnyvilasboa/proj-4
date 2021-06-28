const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const watchlistSchema = new Schema({
    title: {
        type: String,
        default: null
    },
    year: {
        type: String,
        default: null
    },
    rated: {
        type: String,
        default: null
    },
    genre: {
        type: String,
        default: null
    },
    userSchema: {
        type: Schema.Types.ObjectId,
        ref: 'User Schema '
    }
});

const watchlist = mongoose.model('watchlist', watchlistSchema);
module.exports = watchlist;