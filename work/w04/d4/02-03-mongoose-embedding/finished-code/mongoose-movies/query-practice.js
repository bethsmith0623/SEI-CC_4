require('./config/database');
const Movie = require('./models/movie');
const Performer = require('./models/performer');

/*
	- For each exercise below, write the code as described.
	- Use the promise syntax (.then) instead of using callbacks.
*/

Promise.resolve().then(function() {
  console.log('HERE')
  // 1) Find all movie docs
  return Movie.find({});  // remember to return the promise!
}).then(function(result) {
  console.log('1): ', result)
  // 2) Find all performer docs

}).then(function(result) {
  console.log('2): ', result)
  // Follow the same .then structure used above from this point forward
  // Don't forget to console.log the exercise number also as shown above 
  // 3) Find all movies with an MPAA Rating of 'PG'
  
})

  // 4) Find all movies that are still showing


  // 5) Find all movies with an MPAA Rating of 'PG' or 'PG-13'


  // 6) Find the first movie found with a releaseYear of 2018


  // 7) Find all movies released after 1980
  

  // 8) Find all movies whose titles start with a 'C'
  // Hint: StackOverflow will show how to use a regular expression
  

  // 9) Find the performer named 'Rami Malek'
  
  
  // 10) Find all performers born before 1980
  
  
  // 11) Find all performers whose name starts with a 'J'


  // 12) Add a reference to performer 'Bill Murray' to
  //     the movie Caddyshack's cast property and save.
  //     console.log the updated movie.


.then(function() {
  process.exit();
});