const express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser');

const app = express();

app.use(morgan('common'));
app.use(express.static('public'));
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something is off...');
});
app.use(bodyParser.json());

let sportsMovies = [
    {
        title: 'Without Limits',
        director: 'Robert Towne',
        actorLead: 'Billy Crudup'
    },
    {
        title: 'The Replacements',
        director: 'Howard Deutch',
        actorLead: 'Keanu Reeves'
    },
    {
        title: 'Hoosiers',
        director: 'David Anspaugh',
        actorLead: 'Gene Hackman'
    },
    {
        title: 'Running Brave',
        director: 'Donald Shebib',
        actorLead: 'Robby Benson'
    },
    {
        title: 'Rudy',
        director: 'David Anspaugh',
        actorLead: 'Sean Astin'
    },
    {
        title: 'Race',
        director: 'Stephen Hopkins',
        actorLead: 'Stephan James'
    },
    {
        title: '42',
        director: 'Brian Helgeland',
        actorLead: 'Chadwick Boseman'
    },
    {
        title: 'Mean Machine',
        director: 'Barry Skolnick',
        actorLead: 'Vinnie Jones'
    },
    {
        title: 'Rocky',
        director: 'John G. Avildsen',
        actorLead: 'Sylvester Stallone'
    },
    {
        title: 'Remember the Titans',
        director: 'Boaz Yakin',
        actorLead: 'Denzel Washington'
    }
];

// GET Requests 
app.get('/', (req, res) => {
    res.send('Welcome to Great Sports Movies!');
});

// Gets list of data about all Great Sports Movies
app.get('/movies', (req, res) => {
    res.json(sportsMovies);
});

// Gets data about a single movie, by title
app.get('/movies/:title', (req, res) => {
    res.json(sportsMovies.find((movie) => {
        return sportsMovies.title === req.params.name
    }));
});

// Get data about a genre (description), by title
app.get('/movies/:title/:genre', (req, res) => {
    res.send('Successful GET request returning data about a genre by movie title.');
});

// Get data about a director, by name
app.get('/movies/:director', (req, res) => {
    res.send('Successful GET request returning data about a director.');
});

// Adds data about new users that register
app.post('/users', (req, res) => {
    res.send('Successful POST request returning data about a new user.');
});

// Update information about a user
app.put('/users/:name', (req, res) => {
    res.send('Successful PUT request returning message of completion of update to user information.');
});

// Adds a movie to a user's favorites list
app.post('/users/:name/:title', (req, res) => {
    res.send("Successful POST request returning message of movie added to user's favorite's list.");
});

// Deletes a movie from a user's favorites list
app.delete('/users/:name/:title', (req, res) => {
    res.send("Successful DELETE request returning message of movie removal from user's favorite's list.");
});

// Deletes a user
app.delete('/users/:name', (req, res) => {
    res.send('Successful DELETE request returning message of user removal from registry.');
});

app.get('/documentation', (req, res) => {
    res.sendFile('public/documentation.html', { root: __dirname});
});

// listen for requests
app.listen(8080, () => {
    console.log('Your app is listening on port 8080')
});