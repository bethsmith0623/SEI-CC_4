var Movie = require('../models/movie');

module.exports = {
  index,
  show,
  new: newMovie,
  create
};

function index(req, res) {
  Movie.find({}, function(err, movies) {
    res.render('movies/index', { title: 'All Movies', movies });
  });
}

function show(req, res) {
  Movie.findById(req.params.id, function(err, movie) {
    res.render('movies/show', { title: 'Movie Detail', movie });
  });
}

function newMovie(req, res) {
  res.render('movies/new', { title: 'Add Movie' });
}

function create(req, res) {
  // convert nowShowing's checkbox of nothing or "on" to boolean
  req.body.nowShowing = !!req.body.nowShowing;
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key];
  }
  var movie = new Movie(req.body);
  movie.save(function(err) {
    if (err) return res.redirect('/movies/new');
    console.log(movie);
    res.redirect('/movies');
  });
}
