var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/movies',
{ useNewUrlParser: true, useCreateIndex: true }
);

// shortcut to mongoose.connection object
var db = mongoose.connection;

db.on('connected', function () {
  console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
});