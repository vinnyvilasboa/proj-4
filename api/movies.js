// Imports
require('dotenv').config();
const express = require('express');
const router = express.Router();
const passport = require('passport');


// Models
const { Movie } = require('../models');

// Controllers
const index = async(req, res) => {
    console.log('inside of /api/movies');
    try {
        const allmovies = await Movie.find({});

        res.json({ movies: allmovies });
    } catch (error) {
        console.log('Error inside of /api/movies');
        console.log(error);
        return res.status(400).json({ message: 'movie not found. Please try again.' });
    }
}

const show = async(req, res) => {
    const { id } = req.params;
    console.log(req.query)
    try {
        // look for movie based on id
        const movie = await Movie.findById(id);
        res.json({ movie });
    } catch (error) {
        console.log('Error inside of /api/movies/:id');
        console.log(error);
        return res.status(400).json({ message: 'Movie not found. Try again...' });
    }
}

// const create = async(req, res) => {
//     const { title, year, rated, genre } = req.body;

//     try {
//         const newMovie = await Movie.create({ title, year, rated, genre });
//         console.log('new favorite created', newMovie);
//         res.json({ favorites: newMovie });
//     } catch (error) {
//         console.log('Error inside of POST of /api/movies');
//         console.log(error);
//         return res.status(400).json({ message: 'movie was not added. Please try again...' });
//     }
// }

const search = async(req, res) => {
    const { Title } = req.body;
    console.log('movie search', Title);

    try {
        const searchMovie = await Movie.findOne({ Title })
        console.log(searchMovie);
        res.json({ movies: searchMovie });
    } catch (error) {
        console.log('Error inside of POST of /api/movies');
        console.log(error);
        return res.status(400).json({ message: 'movie was not found. Please try again...' });
    }
}

// const update = async(req, res) => {
//     console.log(req.body);
//     try {
//         const updatedMovie = await Movie.update({ title: req.body.title }, req.body); // updating the movie
//         const movie = await Movie.findOne({ title: req.body.title });

//         console.log(updatedMovie); // { n: 1, nModified: 0, ok: 1 }
//         console.log(movie); // a movie object 

//         res.redirect(`/api/movies/${movie.id}`);

//     } catch (error) {
//         console.log('Error inside of UPDATE route');
//         console.log(error);
//         return res.status(400).json({ message: 'movie could not be updated. Please try again...' });
//     }
// }

// const deleteMovie = async(req, res) => {
//     const { id } = req.params;
//     try {
//         console.log(id);
//         const result = await Movie.findByIdAndRemove(id);
//         console.log(result);
//         res.redirect('/api/movies');
//     } catch (error) {
//         console.log('inside of DELETE route');
//         console.log(error);
//         return res.status(400).json({ message: 'movie was not deleted. Please try again...' });
//     }
// }

// GET api/movies/test (Public)
router.get('/test', (req, res) => {
    res.json({ msg: 'movie endpoint OK!' });
});


// GET -> /api/movies/
router.get('/', passport.authenticate('jwt', { session: false }), index);
// GET -> /api/movies/:id
router.get('/:id', passport.authenticate('jwt', { session: false }), show);
// POST -> /api/search
router.post('/search', passport.authenticate('jwt', { session: false }), search)
    // POST -> /api/movies
router.post('/', passport.authenticate('jwt', { session: false }), create);
// PUT -> /api/movies
router.put('/', passport.authenticate('jwt', { session: false }), update);
// DELETE => /api/movies/:id
router.delete('/:id', passport.authenticate('jwt', { session: false }), deleteMovie);

module.exports = router;