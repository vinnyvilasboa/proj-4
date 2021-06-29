// Imports
require('dotenv').config();
const express = require('express');
const router = express.Router();
const passport = require('passport');


// Models
const { Watchlist } = require('../models');

// Controllers
const index = async(req, res) => {
    console.log('inside of /api/watchlist');
    try {
        const allwatchlist = await Watchlist.find({});

        res.json({ watchlists: allwatchlist });
    } catch (error) {
        console.log('Error inside of /api/watchlists');
        console.log(error);
        return res.status(400).json({ message: 'watchlists not found. Please try again.' });
    }
}

const show = async(req, res) => {
    const { id } = req.params;
    try {
        // look for watchlist title based on id
        const watchlist = await Watchlist.findById(id);
        res.json({ watchlist });
    } catch (error) {
        console.log('Error inside of /api/watchlists/:id');
        console.log(error);
        return res.status(400).json({ message: 'watchlist not found. Try again...' });
    }
}

const create = async(req, res) => {
    const { title, year, rated, genre } = req.body;

    try {
        const newwatchlist = await Watchlist.create({ title, year, rated, genre });
        console.log('new watchlist created', newwatchlist);
        res.json({ Watchlist: newwatchlist });
    } catch (error) {
        console.log('Error inside of POST of /api/watchlist');
        console.log(error);
        return res.status(400).json({ message: 'watchlist was not created. Please try again...' });
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

        const updatedfavorites = await Watchlist.update({ title: req.body.title }, req.body); // updating the book
        const watchlist = await Watchlist.findOne({ title: req.body.title });

        console.log(updatedfavorites); // { n: 1, nModified: 0, ok: 1 }
        console.log(Watchlist); // a movie object 

        res.redirect(`/api/watchlists/${Watchlist.id}`);

    } catch (error) {
        console.log('Error inside of UPDATE route');
        console.log(error);
        return res.status(400).json({ message: 'watchlist could not be updated. Please try again...' });
    }
}

const deletewatchlist = async(req, res) => {
    const { id } = req.params;
    try {
        console.log(id);
        const result = await Watchlist.findByIdAndRemove(id);
        console.log(result);
        res.redirect('/api/watchlists');
    } catch (error) {
        console.log('inside of DELETE route');
        console.log(error);
        return res.status(400).json({ message: 'watchlist was not deleted. Please try again...' });
    }
}

// GET api/watchlists/test (Public)
router.get('/test', (req, res) => {
    res.json({ msg: 'watchlist endpoint OK!' });
});

// GET -> /api/watchlists/
router.get('/', passport.authenticate('jwt', { session: false }), index);
// GET -> /api/watchlists/:id
router.get('/:id', passport.authenticate('jwt', { session: false }), show);
// POST -> /api/watchlists
router.post('/', passport.authenticate('jwt', { session: false }), create);
// PUT -> /api/watchlists
router.put('/', passport.authenticate('jwt', { session: false }), update);
// DELETE => /api/watchlists/:id
router.delete('/:id', passport.authenticate('jwt', { session: false }), deletewatchlist);

module.exports = router;