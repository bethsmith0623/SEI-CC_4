const Performer = require('../../models/movie');



module.exports = {
  index, 
  create, 
  show, 
  update, 
  delete: deleteMovie
};

function deleteMovie(req, res){
  Performer.findByIdAndRemove(req.params.id).then(function(performers){
    res.status(200).json(performers);
  })
}

function update(req,res){
  Performer.findByIdAndUpdate(req.params.id, req.body, {new: true}).then(function(performers) {
    res.status(200).json(performers);
  });
};

function index(req, res) {
  Performer.find({})
  .then(function(performers){
    res.status(200).json(performers);
  })
  .catch(function(err) {
    res.status(500).json(err);
  });
};

function create (req, res) {
  Performer.create(req.body).then(function(performers){
    res.status(201).json(performers);
  })
};

function show(req, res){
  Performer.findById(req.params.id).then(function(performers) {
    res.status(200).json(performers);
  });
}