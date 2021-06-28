# MERN Authentication `Backend`

This is a code along for MERN Auth

Notes:
1. Set up server
2. Test home route
3. Make api folder and test /test route
2. Set up models
3. Setup passport strategy
4. Intialize passport and pass passport as arguemnt to config
5. Make controllers for user
6. Test each one after completing it.
7. /test, /register, /login, /profile
8. Make route for each controller
9. Test other controllers in the box
10. Make template, add models and routes

## What it includes

* Mongoose User schema and model
* Settings for the database
* Passport and passport-jwt for authentication
* JSON Web Token
* Passwords that are hashed with BCrypt

### User Model

| Column Name | Data Type | Notes |
| --------------- | ------------- | ------------------------------ |
| id | Integer | Serial Primary Key, Auto-generated |
| name | String | Must be provided |
| email | String | Must be unique / used for login |
| password | String | Stored as a hash |
| timesLoggedIn | Number | used to track the amount of times a user logs in |
| date | Date | Auto-generated |
| __v | Number | Auto-generated |

### Default Routes

| Method | Path | Location | Purpose |
| ------ | ---------------- | -------------- | ------------------- |
| GET | / | app.js | Server file |
| GET | /api/users/test | users.js | Return json data |
| POST | /api/users/login | users.js | Login data |
| POST | /api/users/signup | users.js | Signup data |
| GET | /api/users/profile | users.js | Profile data |
| GET | /api/users/all-users | users.js | Get all users |
