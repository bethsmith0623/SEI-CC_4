var express = require('express');
var path = require('path');
var logger = require('morgan');
var favicon = require('serve-favicon');

require('./config/database');

var puppiesRouter = require('./routes/api/puppies');

var app = express();

app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'build')));

// api routes must be before the "catch all" route
app.use('/api/puppies', puppiesRouter);

// "catch all" route
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 3001;

app.listen(port, function() {
  console.log(`Express app listening on port ${port}`);
});