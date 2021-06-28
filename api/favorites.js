// Imports
require('dotenv').config();
const express = require('express');
const router = express.Router();
const passport = require('passport');


// Models
const { favorites } = require('../models');

// Controllers
const index = async(req, res) => {
    console.log('inside of /api/favorites');
    try {
        const allfavorites = await favorites.find({});

        res.json({ favorites: allfavorites });
    } catch (error) {
        console.log('Error inside of /api/favorites');
        console.log(error);
        return res.status(400).json({ message: 'favorites not found. Please try again.' });
    }
}

const show = async(req, res) => {
    const { id } = req.params;
    try {
        // look for book based on id
        const favorites = await favorites.findById(id);
        res.json({ favorites });
    } catch (error) {
        console.log('Error inside of /api/favorites/:id');
        console.log(error);
        return res.status(400).json({ message: 'favorites not found. Try again...' });
    }
}

const create = async(req, res) => {
    const { title, year, rated, genre } = req.body;

    try {
        const newfavorites = await favorites.create({ title, year, rated, genre });
        console.log('new favorite created', newfavorites);
        res.json({ favorites: newfavorites });
    } catch (error) {
        console.log('Error inside of POST of /api/favorites');
        console.log(error);
        return res.status(400).json({ message: 'favorites was not created. Please try again...' });
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

        const updatedfavorites = await favorites.update({ title: req.body.title }, req.body); // updating the book
        const favorites = await favorites.findOne({ title: req.body.title });

        console.log(updatedfavorites); // { n: 1, nModified: 0, ok: 1 }
        console.log(favorites); // a book object 

        res.redirect(`/api/favorites/${favorites.id}`);

    } catch (error) {
        console.log('Error inside of UPDATE route');
        console.log(error);
        return res.status(400).json({ message: 'favorites could not be updated. Please try again...' });
    }
}

const deleteFavorite = async(req, res) => {
    const { id } = req.params;
    try {
        console.log(id);
        const result = await favorites.findByIdAndRemove(id);
        console.log(result);
        res.redirect('/api/favorites');
    } catch (error) {
        console.log('inside of DELETE route');
        console.log(error);
        return res.status(400).json({ message: 'favorites was not deleted. Please try again...' });
    }
}

// GET api/books/test (Public)
router.get('/test', (req, res) => {
    res.json({ msg: 'favorites endpoint OK!' });
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
router.delete('/:id', passport.authenticate('jwt', { session: false }), deleteFavorite);

module.exports = router;