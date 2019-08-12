var Todo = require('../models/todo');

module.exports = {
  index,
  show
};

function index(req, res) {
  res.render('todos/index', {
    todos: Todo.getAll()
  });
}

function show(req, res) {
  res.render('todos/show', {
    todo: Todo.getOne(req.params.id),
    todoNum: parseInt(req.params.id) + 1
  });
}
