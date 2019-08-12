const todos = [
  {todo: 'Feed Dogs', done: true},
  {todo: 'Learn Express', done: false},
  {todo: 'Buy Milk', done: false}
];

module.exports = {
  getAll,
  getOne
};

function getOne(id) {
  return todos[id];
}

function getAll() {
  return todos;
}