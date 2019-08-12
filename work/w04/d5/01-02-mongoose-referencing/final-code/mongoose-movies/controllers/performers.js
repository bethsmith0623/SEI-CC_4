var Performer = require('../models/performer');
var Movie = require('../models/movie');

module.exports = {
  new: newPerformer,
  create,
  addToCast
};

function addToCast(req, res) {
  Movie.findById(req.params.id, function (err, movie) {
    movie.cast.push(req.body.performerId);
    movie.save(function (err) {
      res.redirect(`/movies/${movie._id}`);
    });
  });
}

function create(req, res) {
  // Need to "fix" date formatting to prevent day off by 1
  // This is due to the <input type="date"> returning the date
  // string in this format:  "YYYY-MM-DD"
  var s = req.body.born;
  req.body.born = `${s.substr(5, 2)}-${s.substr(8, 2)}-${s.substr(0, 4)}`;
  Performer.create(req.body, function (err, performer) {
    res.redirect('/performers/new');
  });
}

function newPerformer(req, res) {
  Performer.find({}, function (err, performers) {
    res.render('performers/new', {
      title: 'Add Performer',
      performers
    });
  })
}