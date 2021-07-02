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
    UserId: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
});

const Favorite = mongoose.model('Favorite', favoritesSchema);
module.exports = Favorite;