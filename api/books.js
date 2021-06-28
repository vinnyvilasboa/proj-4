// Imports
require('dotenv').config();
const express = require('express');
const router = express.Router();
const passport = require('passport');


// Models
const { Book } = require('../models');

// Controllers
const index = async (req, res) => {
    console.log('inside of /api/books');
    try {
        const allBooks = await Book.find({});

        res.json({ books: allBooks });
    } catch (error) {
        console.log('Error inside of /api/books');
        console.log(error);
        return res.status(400).json({ message: 'Books not found. Please try again.' });
    }
}

const show = async (req, res) => {
    const { id } = req.params;
    try {
        // look for book based on id
        const book = await Book.findById(id);
        res.json({ book });
    } catch (error) {
        console.log('Error inside of /api/books/:id');
        console.log(error);
        return res.status(400).json({ message: 'Book not found. Try again...' });
    }
}

const create = async (req, res) => {
    const { title, author, price, pages, isbn, genre } = req.body;

    try {
        const newBook = await Book.create({ title, author, price, pages, isbn, genre });
        console.log('new book created', newBook);
        res.json({ book: newBook });
    } catch (error) {
       console.log('Error inside of POST of /api/books');
       console.log(error);
       return res.status(400).json({ message: 'Book was not created. Please try again...' }); 
    }
}

const update = async (req, res) => {
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

        const updatedBook = await Book.update({ title: req.body.title }, req.body); // updating the book
        const book = await Book.findOne({ title: req.body.title });

        console.log(updatedBook); // { n: 1, nModified: 0, ok: 1 }
        console.log(book); // a book object 

        res.redirect(`/api/books/${book.id}`);

    } catch (error) {
        console.log('Error inside of UPDATE route');
        console.log(error);
        return res.status(400).json({ message: 'Book could not be updated. Please try again...' });
    }
}

const deleteBook = async (req, res) => {
    const { id } = req.params;
    try {
        console.log(id);
        const result = await Book.findByIdAndRemove(id);
        console.log(result);
        res.redirect('/api/books');
    } catch (error) {
        console.log('inside of DELETE route');
        console.log(error);
        return res.status(400).json({ message: 'Book was not deleted. Please try again...' });
    }
}

// GET api/books/test (Public)
router.get('/test', (req, res) => {
    res.json({ msg: 'Books endpoint OK!'});
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
router.delete('/:id', passport.authenticate('jwt', { session: false }), deleteBook);

module.exports = router;