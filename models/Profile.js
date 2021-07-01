const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

const Profile = mongoose.model('Profile', profileSchema);
module.exports = Profile;