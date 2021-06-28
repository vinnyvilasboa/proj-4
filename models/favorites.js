const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favoritesSchema = new Schema({
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

const favorites = mongoose.model('favorites', favoritesSchema);
module.exports = favorites;