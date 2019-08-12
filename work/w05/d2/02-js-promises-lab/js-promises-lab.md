<img src="https://i.imgur.com/PMyzlb1.png">

# JS Promises Lab

## Intro

You just learned about JavaScript Promises, both how to create them and how to consume promises returned by libraries such as Mongoose.

This lab will provide you with more practice using the promise syntax of Mongoose queries.

## Setup

Within the same project you used during the lesson, copy the **seeds.js** file and rename it to **query-practice.js**.

Remove all of the code except for the following at the top:

```js
require('./config/database');
const Movie = require('./models/movie');
const Performer = require('./models/performer');
```

## Lab Requirements

1. Copy the following code & exercises into **query-practice.js**:

```js

/*-- For each exercise below, write the code as described --*/

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
```

2. Write the code for each exercise. Do not use a semicolon at the end of any `.then()`, otherwise the included `.then()` at the end of the code will not properly shut down the app.


## Hints

[The official docs for Mongoose Queries](https://mongoosejs.com/docs/queries.html) and StackOverflow results are your best bet.

Note that Mongoose can use **query objects** with the same syntax you'll find in **MongoDB** examples.

## Deliverable

#### This lab is not a deliverable.
