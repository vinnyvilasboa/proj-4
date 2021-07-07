![Issues](https://img.shields.io/github/issues/vinnyvilasboa/proj-4)![Forks](https://img.shields.io/github/forks/vinnyvilasboa/proj-4)![Repo-Size](https://img.shields.io/github/repo-size/vinnyvilasboa/proj-4)![Contributors](https://img.shields.io/github/contributors/vinnyvilasboa/proj-4)


<!-- ![Heroku](https://heroku-badge.herokuapp.com/?app=heroku-badge) -->

Fakeflix-Backend is the backend of Fakeflix.

## Collaborators

 ```sh
 https://github.com/jakeschultz89
 https://github.com/brandonhall96
 https://github.com/vinnyvilasboa
 https://github.com/behemoth0132
 ```

- Run mongoDB  
- Run your server
- ✨Magic ✨

## Features

- Use the seed.js file to add the static data we included in order to view it in mongoDB
- The data used in the seed will reflect to the front end. 
- The magic is just getting started please scroll to the end to see the link for the front end!



## Tech

Fakeflix uses a number of technologies to work properly:

- [mongoDB] - The database for modern applications
- [Mongoose] - an Object Data Modeling (ODM) library for MongoDB and Node. js
- [node.js] - evented I/O for the backend
- [Express] - fast node.js network app framework


## Installation

Fakeflix requires [node.js](https://nodejs.org/) to run.

You first need to clone the repository
```
git clone hhttps://github.com/vinnyvilasboa/proj-4
```

Install the dependencies and devDependencies and start the server.

```sh
npm i
npm start
```

For .env... use whatever values you would like for the items included in the .env file below

```sh
MONGO_URI=""
JWT_SECRET=""
```
Next... Go to your terminal and 
```sh 
Run the command (mongod) first
```
```sh
Then follow up with the (mongo) command in a seperate terminal window
```

## Code Snippets to be proud of 

```javaScript
const data = [{
    "Title": "The Shawshank Redemption",
    "Year": "1994",
    "Rated": "R",
    "Genre": "Drama",
    "Director": "Frank Darabont",
    "Writer": "Stephen King, Frank Darabont",
    "Actors": "Tim Robbins, Morgan Freeman, Bob Gunton",
    "Plot": "Two imprisoned men bond over a Num of years, finding solace and eventual redemption through acts of common decency.",
    "Language": "English",
    "Country": "United States",
    "Awards": "Nominated for 7 Oscars. 21 wins & 43 nominations total",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
    "Metascore": "80",
    "imdbRating": "9.3",
    "imdbVotes": "2,400,369",
    "imdbID": "tt0111161",
    "Type": "movie",
    "DVD": "15 Aug 2008",
    "BoxOffice": "$28,699,976",
    "Production": "Columbia Pictures, Castle Rock Entertainment",
    "Website": "N/A",
    "Response": "True",
    "Youtube": "https://www.youtube.com./watch?v=6hB3S9bIaco",
    "Num": "0"
}
```

This is a code snippet from the seed file that builds our database. We originally were going to link directly to the OMDB API but decided to build a "Top 100 IMDB Movies" list directly into our database instead. In this we included a youtube link because one of our stretch goals is to have the titles on the front end be linked to the youtube trailer for the movie as a way to give the site a bit of a "Netflix" feel where a user would normally be able to click to start the movie.

```javaScript
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
```

This snippet is one that, while not fully fleshed out to handle all inputs, it is one that will allow for users to search for a movie by title on the Fakeflix site.

## Schema Idea
![](wireframe.png)

This is our original wireframe for how we wanted the site to be laid out.

<br>

Verify the deployment by navigating to your server address in
your preferred browser.

```sh
http://localhost:8080
```

<!-- > our backend is also deployed on heroku at ```https://afternoon-lowlands-89410.herokuapp.com/``` -->

> In order to see the full app please view our front end ```https://github.com/brandonhall96/fakeflix.git```
> you will find additional information there concerning this app.






   [Mongoose]: <https://mongoosejs.com/>
   [node.js]: <http://nodejs.org>
   [express]: <http://expressjs.com>
   [mongoDB]: <https://www.mongodb.com/>