const Movie = require('../../models/movie');



module.exports = {
  index, 
  create, 
  show, 
  update, 
  delete: deleteMovie
};

function deleteMovie(req, res){
  Movie.findByIdAndRemove(req.params.id).then(function(film){
    res.status(200).json(film);
  })
}

function update(req,res){
  Movie.findByIdAndUpdate(req.params.id, req.body, {new: true}).then(function(film) {
    res.status(200).json(film);
  });
};

function index(req, res) {
  Movie.find({})
  .then(function(movies){
    res.status(200).json(movies);
  })
  .catch(function(err) {
    res.status(500).json(err);
  });
};

function create (req, res) {
  Movie.create(req.body).then(function(film){
    res.status(201).json(film);
  })
};

function show(req, res){
  Movie.findById(req.params.id).then(function(film) {
    res.status(200).json(film);
  });
}