// Imports
require('dotenv').config();
const express = require('express');
const router = express.Router();
const passport = require('passport');

// Models
const { Favorite } = require('../models');

// Controllers
const index = async(req, res) => {
    console.log('inside of /api/favorites');
    try {
        const allfavorites = await Favorite.find({UserId:req.user._id});
        console.log(allfavorites)
        // console.log(req.user._id)
        //req.user.id inside find
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
        // look for favorite based on id
        const favorites = await Favorite.findById(id);
        res.json({ favorites });
    } catch (error) {
        console.log('Error inside of /api/favorites/:id');
        console.log(error);
        return res.status(400).json({ message: 'favorites not found. Try again...' });
    }
}

const create = async(req, res) => {
    const { Comment, UserId, Title, Poster } = req.body;

    try {
        const newfavorites = await Favorite.create({ Comment, UserId, Title, Poster });
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

        const updatedfavorites = await Favorite.update({ Comment: req.body.Comment }, req.body); // updating the favorites
        const favorites = await Favorite.findOne({ Title: req.body.Title });

        console.log(updatedfavorites); // { n: 1, nModified: 0, ok: 1 }
        console.log(favorites); // a favorite object 

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
        const result = await Favorite.findByIdAndRemove(id);
        console.log(result);
        res.redirect('/api/favorites');
    } catch (error) {
        console.log('inside of DELETE route');
        console.log(error);
        return res.status(400).json({ message: 'favorites was not deleted. Please try again...' });
    }
}

// GET api/favorite/test (Public)
router.get('/test', (req, res) => {
    res.json({ msg: 'favorites endpoint OK!' });
});

// GET -> /api/favorites/
router.get('/', passport.authenticate('jwt', { session: false }), index);
// GET -> /api/favorites/:id
router.get('/:id', passport.authenticate('jwt', { session: false }), show);
// POST -> /api/favorites
router.post('/', passport.authenticate('jwt', { session: false }), create);
// PUT -> /api/favorites
router.put('/', passport.authenticate('jwt', { session: false }), update);
// DELETE => /api/favorites/:id
router.delete('/:id', passport.authenticate('jwt', { session: false }), deleteFavorite);

module.exports = router;