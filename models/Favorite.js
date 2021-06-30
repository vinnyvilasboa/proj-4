const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favoritesSchema = new Schema({
    Title: {
        type: String,
    },
    Comment: {
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

const Favorites = mongoose.model('Favorites', favoritesSchema);
module.exports = Favorites;