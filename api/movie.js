// Imports
require('dotenv').config();
const express = require('express');
const router = express.Router();
const passport = require('passport');


// Models
const { movie } = require('../models');

// Controllers
const index = async(req, res) => {
    console.log('inside of /api/movie');
    try {
        const allmovie = await movie.find({});

        res.json({ favorites: allmovie });
    } catch (error) {
        console.log('Error inside of /api/movie');
        console.log(error);
        return res.status(400).json({ message: 'movie not found. Please try again.' });
    }
}

const show = async(req, res) => {
    const { id } = req.params;
    try {
        // look for book based on id
        const movie = await movie.findById(id);
        res.json({ movie });
    } catch (error) {
        console.log('Error inside of /api/movie/:id');
        console.log(error);
        return res.status(400).json({ message: 'Book not found. Try again...' });
    }
}

const create = async(req, res) => {
    const { title, year, rated, genre } = req.body;

    try {
        const newmovie = await movie.create({ title, year, rated, genre });
        console.log('new favorite created', newmovie);
        res.json({ favorites: newmovie });
    } catch (error) {
        console.log('Error inside of POST of /api/movie');
        console.log(error);
        return res.status(400).json({ message: 'movie was not added. Please try again...' });
    }
}

const update = async(req, res) => {
    console.log(req.body);
    try {
        // const book = await Book.findOne({ title: req.body.title });
        // console.log(book);

        // book.author = req.body.author;
        // book.pages = req.body.pages;
        // book.isbn = req.body.isbn;
        // book.genre = req.body.genre;
        // book.price = req.body.price;

        // // save the new book info
        // const savedBook = await book.save();

        const updatedmovie = await movie.update({ title: req.body.title }, req.body); // updating the book
        const movie = await movie.findOne({ title: req.body.title });

        console.log(updatedmovie); // { n: 1, nModified: 0, ok: 1 }
        console.log(movie); // a book object 

        res.redirect(`/api/movie/${movie.id}`);

    } catch (error) {
        console.log('Error inside of UPDATE route');
        console.log(error);
        return res.status(400).json({ message: 'movie could not be updated. Please try again...' });
    }
}

const deleteMovie = async(req, res) => {
    const { id } = req.params;
    try {
        console.log(id);
        const result = await movie.findByIdAndRemove(id);
        console.log(result);
        res.redirect('/api/movie');
    } catch (error) {
        console.log('inside of DELETE route');
        console.log(error);
        return res.status(400).json({ message: 'movie was not deleted. Please try again...' });
    }
}

// GET api/books/test (Public)
router.get('/test', (req, res) => {
    res.json({ msg: 'movie endpoint OK!' });
});

// GET -> /api/books/
router.get('/', passport.authenticate('jwt', { session: false }), index);
// GET -> /api/books/:id
router.get('/:id', passport.authenticate('jwt', { session: false }), show);
// POST -> /api/books
router.post('/', passport.authenticate('jwt', { session: false }), create);
// PUT -> /api/books
router.put('/', passport.authenticate('jwt', { session: false }), update);
// DELETE => /api/books/:id
router.delete('/:id', passport.authenticate('jwt', { session: false }), deleteMovie);

module.exports = router;