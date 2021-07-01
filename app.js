// Imports
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const passport = require('passport');
const PORT = process.env.PORT || 8000;

// API
const users = require('./api/users');
const favorites = require('./api/favorites');
const movies = require('./api/movies');
const watchlists = require('./api/watchlists');
const profiles = require('./api/profiles');
// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Initialize Passport and use config file
app.use(passport.initialize());
require('./config/passport')(passport);


// Home route
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Smile, you are being watched by the Backend Engineering Team' });
});

// Routes
app.use('/api/users', users);
app.use('/api/movies', movies);
app.use('/api/favorites', favorites);
app.use('/api/watchlists', watchlists);
app.use('/api/profiles', profiles);


app.get('/*', (req, res) => {
    res.status(404).json({ message: 'Data not found' });
});

app.listen(PORT, () => {
    console.log(`Server is listening 🎧 on port: ${PORT}`);
});