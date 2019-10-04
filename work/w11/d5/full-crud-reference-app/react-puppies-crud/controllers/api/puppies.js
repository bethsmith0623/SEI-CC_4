const Puppy = require('../../models/puppy');

module.exports = {
  index,
  show,
  create,
  delete: deleteOne,
  update
};

async function index(req, res) {
  const puppies = await Puppy.find({});
  res.status(200).json(puppies);
}

async function show(req, res) {
  const puppy = await Puppy.findById(req.params.id);
  res.status(200).json(puppy);
}

async function create(req, res) {
  const puppy = await Puppy.create(req.body);
  res.status(201).json(puppy);
}

async function deleteOne(req, res) {
  const deletedPuppy = await Puppy.findByIdAndRemove(req.params.id);
  res.status(200).json(deletedPuppy);
}

async function update(req, res) {
  const updatedPuppy = await Puppy.findByIdAndUpdate(req.params.id, req.body, {new: true});
  res.status(200).json(updatedPuppy);
}
