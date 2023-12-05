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
        director: {
            name: 'Robert Towne',
            birthDate: '11/23/1934'
        },
        genre: {
            sport: 'Distance Running',
            description: 'The life of renowned runner Steve Prefontaine and his relationship with legendary coach Bill Bowerman.'
        },
        actorLead: 'Billy Crudup'
    },

    {
        title: 'The Replacements',
        director: {
            name: 'Howard Deutch',
            birthDate: '9/14/1950'
        },
        genre: {
            sport: 'Football',
            description: 'During a pro football strike, the owners hire substitute players.'
        },
        actorLead: 'Keanu Reeves'
    },

    {
        title: 'Hoosiers',
        director: {
            name: 'David Anspaugh',
            birthDate: '9/24/1946'
        },
        genre: {
            sport: 'Basketball',
            description: 'A coach with a checkered past and a local drunk train a small-town high school basketball team to become a top contender for the state championship in 1950s Indiana.'
        },
        actorLead: 'Gene Hackman'
    },

    {
        title: 'Running Brave',
        director: {
            name: 'Donald Shebib',
            birthDate: '1/27/1938',
            deceasedDate: '11/5/2023'
        },
        genre: {
            sport: 'Distance Running',
            description: 'The story of Billy Mills, the American Indian who came from obscurity to win the 10000-meter long-distance foot-race in the Tokyo Olympics in 1964.'
        },
        actorLead: 'Robby Benson'
    },

    {
        title: 'Rudy',
        director: {
            name: 'David Anspaugh',
            birthDate: '9/24/1946'
        },
        genre: {
            sport: 'Football',
            description: 'Rudy has always been told that he was too small to play college football. But he is determined to overcome the odds and fulfill his dream of playing for Notre Dame.'
        },
        actorLead: 'Sean Astin'
    },

    {
        title: 'Race',
        director: {
            name: 'Stephen Hopkins',
            birthDate: '11/1'
        },
        genre: {
            sport: 'Track & Field',
            description: "Jesse Owens' quest to become the greatest track and field athlete in history thrusts him onto the world stage of the 1936 Olympics, where he faces off against Adolf Hitler's vision of Aryan supremecy."
        },
        actorLead: 'Stephan James'
    },

    {
        title: '42',
        director: {
            name: 'Brian Helgeland',
            birthDate: '1/17/1961'
        },
        genre: {
            sport: 'Baseball',
            description: 'In 1947, Jackie Robinson becomes the first African-American to play in Major League Baseball in the modern era when he was signed by the Brooklyn Dodgers and faces considerable racism in the process.'
        },
        actorLead: 'Chadwick Boseman'
    },

    {
        title: 'Mean Machine',
        director: {
            name: 'Barry Skolnick',
            birthDate: '10/8/1966'
        },
        genre: {
            sport: 'Soccer',
            description: 'A football star jailed for assault leads a group of inmates in a match against prison guards.'
        },
        actorLead: 'Vinnie Jones'
    },

    {
        title: 'Rocky',
        director: {
            name: 'John G. Avildsen',
            birthDate: '12/21/1935',
            deceasedDate: '6/16/2017'
        },
        genre: {
            sport: 'Boxing',
            description: 'A small-time Philadelphia boxer gets a supremely rare chance to fight the world heavyweight champion in a bout in which he strives to go the distance for his self-respect.'
        },
        actorLead: 'Sylvester Stallone'
    },

    {
        title: 'Remember the Titans',
        director: {
            name: 'Boaz Yakin',
            birthDate: '6/20/1966'
        },
        genre: {
            sport: 'Football',
            description: 'The true story of a newly appointed African-American coach and his high school team on their first season as a racially integrated unit.'
        },
        actorLead: 'Denzel Washington'
    }
];

let users = [
    {
        name: 'Elwood Kunce',
        username: 'elwood-kunce',
        email: 'elwood-kunce@domain.com'
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
app.get('/movies/:title/genre', (req, res) => {
    let movie = sportsMovies.find((movie) => {
        return sportsMovies.title === req.params.name
    });

    if (movie) {
       res.send(req.params.name);
    } else {
        res.send('Movie with title ' + req.params.name + ' was not found.')
    };
});

// Get data about a director, by name
app.get('/movies/directors/:name', (req, res) => {
    res.json(sportsMovies.find((director) => {
        return sportsMovies.director.name === req.params.name
    }));
});

// Adds data about new users that register
app.post('/users', (req, res) => {
    let newUser = req.body;

    if (!newUser.name) {
        const message = 'Missing "name" in request body';
        res.status(400).send(message);
    } else {
        users.push(newUser);
        res.status(201).send(newUser);
    }
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