// utility to initialize database
require('./config/database');
const Movie = require('./models/movie');
const Performer = require('./models/performer');
const data = require('./data');

// clear out all movies and performers to prevent dups
const p1 = Movie.deleteMany({});
const p2 = Performer.deleteMany({});
Promise.all([p1, p2])
.then(function(results) {
  return Performer.create(data.performers);
})
.then(function(performers) {
  return Movie.create(data.movies);
})
.then(function(movies) {
  return Promise.all([
    Performer.findOne({name: 'Mark Hamill'}),
    Movie.findOne({title: 'Star Wars - A New Hope'})
  ]);
})
.then(function(results) {  // one day we'll destructure this!
  const mark = results[0];
  const starWars = results[1];
  starWars.cast.push(mark);
  return starWars.save();
})
.then(function() {
  process.exit();
});



// .then(function() {
//   return Performer.deleteMany({});
// })
// .then(function() {

// });






