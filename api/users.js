// Imports
require('dotenv').config();
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const JWT_SECRET = process.env.JWT_SECRET;

// Models
const { User } = require('../models');

// controllers
const test = async (req, res) => {
    res.json({ message: 'User endpoint OK!'});
}

const signup = async (req, res) => {
    console.log('--- INSIDE OF SIGNUP ---');
    console.log('req.body =>', req.body);
    const { name, email, password } = req.body;

    try {
        // see if a user exist in the database by email
        const user = await User.findOne({ email });

        // if a user exist return 400 error and message
        if (user) {
            return res.status(400).json({ message: 'Email already exists' });
        } else {
            console.log('Create new user');
            let saltRounds = 12;
            let salt = await bcrypt.genSalt(saltRounds);
            let hash = await bcrypt.hash(password, salt);

            const newUser = new User({
                name,
                email,
                password: hash
            });

            const savedNewUser = await newUser.save();

            res.json(savedNewUser);

        }
    } catch (error) {
        console.log('Error inside of /api/users/signup');
        console.log(error);
        return res.status(400).json({ message: 'Error occurred. Please try again...'});
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // find a user via email
        const user = await User.findOne({ email });
        console.log(user);

        // if there is no user by the email
        if (!user) {
            return res.status(400).json({ message: 'Either email or password is incorrect.' });
        } else {
            // a user is found in the database
            let isMatch = await bcrypt.compare(password, user.password);
            console.log('password correct', isMatch);

            if (isMatch) {
                // Add one to timesLoggedIn
                let logs = user.timesLoggedIn + 1;
                user.timesLoggedIn = logs;
                const savedUser = await user.save();
                // create a token payload (object)
                const payload = {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    expiredToken: Date.now()
                }
                
                try {
                   // token is generated
                   let token = await jwt.sign(payload, JWT_SECRET, { expiresIn: 3600 });
                   console.log('token', token);
                   let legit = await jwt.verify(token, JWT_SECRET, { expiresIn: 60 });

                   res.json({
                       success: true,
                       token: `Bearer ${token}`,
                       userData: legit
                   })
                } catch (error) {
                    console.log('Error inside of isMatch conditional');
                    console.log(error);
                    return res.status(400).json({ message: 'Session has ended. Please log in again' });
                }
            } else {
                return res.status(400).json({ message: 'Either email or password is incorrect' });
            }
        }

    } catch (error) {
        console.log('Error inside of /api/users/login');
        console.log(error);
        return res.status(400).json({ message: 'Either email or password is incorrect. Please try again' });
    }
}

const profile = async (req, res) => {
    console.log('Inside of PROFILE route');
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    });
}

// routes
// GET -> /api/users/test
router.get('/test', test);

// POST -> api/users/signup (Public)
router.post('/signup', signup);

// POST -> api/users/login (Public)
router.post('/login', login);

// GET /api/users/profile (Private)
router.get('/profile', passport.authenticate('jwt', { session: false }), profile);

module.exports = router;