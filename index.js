const express = require("express"),
  mongoose = require("mongoose"),
  Models = require("./models.js"),
  morgan = require("morgan"),
  bodyParser = require("body-parser");

const Movies = Models.Movie;
const Users = Models.User;
const app = express();

mongoose.connect("mongodb://localhost:27017/sportsMoviesDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(morgan("common"));
app.use(express.static("public"));
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something is off...");
});
app.use(bodyParser.json());

let sportsMovies = [
  {
    title: "Without Limits",
    director: {
      name: "Robert Towne",
      birthDate: "11/23/1934",
    },
    genre: {
      sport: "Distance Running",
      description:
        "The life of renowned runner Steve Prefontaine and his relationship with legendary coach Bill Bowerman.",
    },
    actorLead: "Billy Crudup",
  },

  {
    title: "The Replacements",
    director: {
      name: "Howard Deutch",
      birthDate: "9/14/1950",
    },
    genre: {
      sport: "Football",
      description:
        "During a pro football strike, the owners hire substitute players.",
    },
    actorLead: "Keanu Reeves",
  },

  {
    title: "Hoosiers",
    director: {
      name: "David Anspaugh",
      birthDate: "9/24/1946",
    },
    genre: {
      sport: "Basketball",
      description:
        "A coach with a checkered past and a local drunk train a small-town high school basketball team to become a top contender for the state championship in 1950s Indiana.",
    },
    actorLead: "Gene Hackman",
  },

  {
    title: "Running Brave",
    director: {
      name: "Donald Shebib",
      birthDate: "1/27/1938",
      deceasedDate: "11/5/2023",
    },
    genre: {
      sport: "Distance Running",
      description:
        "The story of Billy Mills, the American Indian who came from obscurity to win the 10000-meter long-distance foot-race in the Tokyo Olympics in 1964.",
    },
    actorLead: "Robby Benson",
  },

  {
    title: "Rudy",
    director: {
      name: "David Anspaugh",
      birthDate: "9/24/1946",
    },
    genre: {
      sport: "Football",
      description:
        "Rudy has always been told that he was too small to play college football. But he is determined to overcome the odds and fulfill his dream of playing for Notre Dame.",
    },
    actorLead: "Sean Astin",
  },

  {
    title: "Race",
    director: {
      name: "Stephen Hopkins",
      birthDate: "11/1",
    },
    genre: {
      sport: "Track & Field",
      description:
        "Jesse Owens' quest to become the greatest track and field athlete in history thrusts him onto the world stage of the 1936 Olympics, where he faces off against Adolf Hitler's vision of Aryan supremecy.",
    },
    actorLead: "Stephan James",
  },

  {
    title: "42",
    director: {
      name: "Brian Helgeland",
      birthDate: "1/17/1961",
    },
    genre: {
      sport: "Baseball",
      description:
        "In 1947, Jackie Robinson becomes the first African-American to play in Major League Baseball in the modern era when he was signed by the Brooklyn Dodgers and faces considerable racism in the process.",
    },
    actorLead: "Chadwick Boseman",
  },

  {
    title: "Mean Machine",
    director: {
      name: "Barry Skolnick",
      birthDate: "10/8/1966",
    },
    genre: {
      sport: "Soccer",
      description:
        "A football star jailed for assault leads a group of inmates in a match against prison guards.",
    },
    actorLead: "Vinnie Jones",
  },

  {
    title: "Rocky",
    director: {
      name: "John G. Avildsen",
      birthDate: "12/21/1935",
      deceasedDate: "6/16/2017",
    },
    genre: {
      sport: "Boxing",
      description:
        "A small-time Philadelphia boxer gets a supremely rare chance to fight the world heavyweight champion in a bout in which he strives to go the distance for his self-respect.",
    },
    actorLead: "Sylvester Stallone",
  },

  {
    title: "Remember the Titans",
    director: {
      name: "Boaz Yakin",
      birthDate: "6/20/1966",
    },
    genre: {
      sport: "Football",
      description:
        "The true story of a newly appointed African-American coach and his high school team on their first season as a racially integrated unit.",
    },
    actorLead: "Denzel Washington",
  },
];

let users = [
  {
    name: "Elwood Kunce",
    username: "elwood-kunce",
    email: "elwood-kunce@domain.com",
  },
];

// GET Requests
app.get("/", (req, res) => {
  res.send("Welcome to Great Sports Movies!");
});

// Gets list of data about all Great Sports Movies
app.get("/movies", async (req, res) => {
  await Movies.find()
    .then((movies) => {
      res.status(201).json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// Gets data about a single movie, by title
app.get("/movies/:Title", async (req, res) => {
  await Movies.findOne({ Title: req.params.Title })
    .then((movie) => {
      res.json(movie);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// Get data about a genre (description), by name
app.get("/movies/genres/:Name", async (req, res) => {
  await Movies.findOne({ "Genre.Name": req.params.Name })
    .then((genre) => {
      res.json(genre);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// Get data about a director, by name
app.get("/movies/directors/:Name", async (req, res) => {
  await Movies.findOne({ "Director.Name": req.params.Name })
    .then((director) => {
      res.json(director);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// Get data about all users
app.get("/users", async (req, res) => {
  await Users.find()
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// Adds data about new users that register
/* Expect JSON in this format
    {
        ID: Integer,
        Username: String,
        Password: String,
        Email: String,
        Birthdate: Date
    }
*/
app.post("/users", async (req, res) => {
  await Users.findOne({ Username: req.body.Username })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Username + " already exists.");
      } else {
        Users.create({
          Username: req.body.Username,
          Password: req.body.Password,
          Email: req.body.Email,
          Birthdate: req.body.Birthdate,
        })
          .then((user) => {
            res.status(201).json(user);
          })
          .catch((error) => {
            console.error(error);
            res.status(500).send("Error: " + error);
          });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error: " + error);
    });
});

// Get data about a user, by username
app.get("/users/:Username", async (req, res) => {
  await Users.findOne({ Username: req.params.Username })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// Update information about a user, by username
/* Expect JSON in this format
    {
        Username: String, (required)
        Password: String, (required)
        Email: String, (required)
        Birthdate: Date
    }
*/
app.put("/users/:Username", async (req, res) => {
  await Users.findOneAndUpdate(
    { Username: req.params.Username },
    {
      $set: {
        Username: req.body.Username,
        Password: req.body.Password,
        Email: req.body.Email,
        Birthdate: req.body.Birthdate,
      },
    },
    { new: true }
  ) // This line makes sure the updated document is returned.
    .then((updatedUser) => {
      res.json(updatedUser);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// Adds a movie to a user's favorites list
app.post("/users/:Username/movies/:MovieID", async (req, res) => {
  await Users.findOneAndUpdate(
    { Username: req.params.Username },
    { $push: { FavoriteMovies: req.params.MovieID } },
    { new: true }
  ) // This line makes sure the updated document is returned.
    .then((updatedUser) => {
      res.json(updatedUser);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// Deletes a movie from a user's favorites list
app.delete("/users/:Username/movies/:MovieID", async (req, res) => {
  await Users.findOneAndDelete(
    { Username: req.params.Username },
    { $pull: { FavoriteMovies: req.params.MovieID } },
    { new: true }
  ) // This line makes sure the updated document is returned.
    .then((updatedUser) => {
      res.json(updatedUser);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// Delete a user, by username
app.delete("/users/:Username", async (req, res) => {
  await Users.findOneAndDelete({ Username: req.params.Username })
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.Username + " was not found.");
      } else {
        res.status(200).send(req.params.Username + " was deleted.");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

app.get("/documentation", (req, res) => {
  res.sendFile("public/documentation.html", { root: __dirname });
});

// listen for requests
app.listen(8080, () => {
  console.log("Your app is listening on port 8080");
});
