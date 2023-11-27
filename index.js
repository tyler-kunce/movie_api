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

// GET requests
app.get('/', (req, res) => {
    res.send('Welcome to Great Sports Movies!');
});

app.get('/documentation', (req, res) => {
    res.sendFile('public/documentation.html', { root: __dirname});
});

app.get('/movies', (req, res) => {
    res.json(sportsMovies);
});

// listen for requests
app.listen(8080, () => {
    console.log('Your app is listening on port 8080')
});