<img src="https://i.imgur.com/uizE4Zt.png" height="500">

# JavaScript Callback Functions

| Learning Objectives - SWBAT: |
| :--- |
| Identify 3 Use Cases for Callback Functions |
| Provide Anonymous & Named Functions as Callbacks |
| Use Callbacks with Array Iterator Methods |
| Use Callbacks with Asynchronous Functions |

## Roadmap
1. Set Up
2. What's a Callback Function?
3. When are Callbacks Used?
4. Using Callbacks with Array Iterator Methods 
5. Using Callbacks with Asynchronous Functions
6. Essential Questions

### 1. Set Up

Create a new HTML, CSS, JS Repl and name it **Callback Functions**.

### 2. What's a Callback Function?

**Callback functions** are not a new type of function that you have to learn - **they are just functions**.


**A callback function, or simply callback, is a function being passed to another function as an argument!**

Since you've already used the array `forEach` method before, you've already used a callback!

Don't run the following, let's just read the code...

```js
const colors = ['red', 'green', 'blue'];

colors.forEach(function(color, idx) {
  console.log(`${idx + 1} - ${color}`);
});
```

In the above, the _anonymous inline function_ being passed to `forEach` as its one and only argument - is a callback function.

Of course, when a function takes a callback as input, it is likely doing so with the intention of invoking that callback at some point in time.

> VOCAB:  In computer science, a function that accepts a function as input or returns a function is also known as a _higher order function_.

Now let's look at a more comprehensive example of how we can use callbacks by trying out this code:

```js
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function compute(a, b, op) {
  return op(a, b);
}

let result1 = compute(10, 5, add);
let result2 = compute(10, 5, subtract);
```

❓ **When the `add` and `subtract` functions are passed as arguments to the `compute` function - they are ___________ functions.**

Also, note that we are passing _named functions_ (`add` & `sum`) instead of using an _anonymous inline function_ like with the `forEach` earlier.

In addition to using callbacks functions with `forEach`, you also used them when you added event listeners in your Tic-Tac-Toe app like so:

```js
boardEl.addEventListener('click', handleClick);
```

> Be careful not to invoke the callback when passing it as an argument - in other words, do not put parens after it! Otherwise, you'll be passing the result returned by that function instead of the function itself.

### 3. When are Callbacks Used?

Again, a callback function is a function being passed to another function to be called at a later point in time.

**Here are three use cases for callback functions:**

1. To provide a function to be called by a higher-order function such  as `forEach` or the `compute` function we wrote above.

2. To provide a function to be executed each time an event happens - just like with the `addEventListener` example above.

3. To provide a function to be executed when an _asynchronous_ process has completed.

### 4. Using Callbacks with Array Iterator Methods

One of the most popular use cases for callback functions is to provide them to iterator methods on arrays.

As we've seen, calling the `forEach` method is a great way to iterate over all of the elements in an array.

JavaScript has designed the `forEach` method to:

1. Accept a callback function as an argument, and
2. Invoke that callback once for each element in the array

**?: How many times would the anonymous callback function below be called - I'll take a number of fingers.**:

```js
const flowers = ['rose', 'orchid', 'daisy'];
	
flowers.forEach(function(flower, idx) {
  console.log(`${idx + 1}) ${flower}`);
});
```

There are several other very useful Array iterator methods that we'll cover later this week - you can get a peek [here](https://gist.github.com/jim-clark/843ebb5288d90da6b0dfd9eecd134b7c) when you get a chance.

#### 💪 Practice Exercise - Callbacks with Iterator Methods (15 min)

**Partner up** and practice using callbacks with iterator methods by doing the following:

1. Research the array [filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) method.  

	> Hint: If the callback function returns a truthy value, the element for the current iteration will be included in the new array returned by the `filter` method.

2. Use `filter` to "select" the objects within the `cars` array that have been driven more than 20,000 miles per year:

	```js
	const cars = [
	  { make: 'Toyota', yrsOld: 5, mileage: 92399 },
	  { make: 'Ford', yrsOld: 12, mileage: 255005 },
	  { make: 'Ferrari', yrsOld: 9, mileage: 12966 },
	  { make: 'Subaru', yrsOld: 9, mileage: 111266 },
	  { make: 'Toyota', yrsOld: 2, mileage: 41888 },
	  { make: 'Tesla', yrsOld: 3, mileage: 57720 }
	];
	```

3. Store the new array returned by `filter` in a variable named `wellDrivenCars`.

4. You may use either an anonymous or named function as the callback function provided to the `filter` method.

5. Use the `forEach` method on the `wellDrivenCars` array to `console.log` each "car" object.

We'll review a solution in 15 minutes...

### 5. Using Callbacks with Asynchronous Functions

_What's an "asynchronous" method?_

Before we can clearly understand what "asynchronous" means, it will help to confirm what **synchronous** code is.

#### Synchronous Code Execution

So far, all the code we've written is **synchronous** code.

**Synchronous** code is when a line of code **completely finishes executing** before the next line of code runs.

For example:

```js
const colors = ['red', 'green', 'blue'];

console.log('BEFORE the forEach...');

colors.forEach(function(color, idx) {
	console.log(`${idx + 1} - ${color}`);
});

console.log('AFTER the forEach...');
```

This is exactly what you would expect - right?

#### Asynchronous Code

Unlike the synchronous code we saw above, the code following an **asynchronous** function call continues to run before the async function finishes.

For example:

```js
console.log('Code before the asynchronous function call');

setTimeout(function() {
  console.log('setTimeout code')
});

console.log('Code after the asynchronous function call');
```

> Until we start working using asynchronous functions used to fetch data across the internet or retrieving data from a database, we'll use `setTimeout` to "simulate" asynchronous code.

##### Why do Asynchronous Functions exist?

Asynchronous functions are necessary in JavaScript because JS runs on a single CPU thread dedicated to handling events, running your code, painting the screen, etc.

Now imagine calling a function that gets data from a database. From the CPU point of view, the database will take an eternity to return the data.

If the CPU were to wait until the data came back, nothing else could be done and the browser would freeze up!

JavaScript avoids forcing the CPU to wait for "long-running" input/output operations, such as fetching data across the Internet.

A good example of JavaScript's asynchronous programming model is the browser itself when it is fetching images as a page loads. The browser does not load one image at a time - that would be horrifically slow! Instead, it kicks off the requests for the images in parallel (at the same time).

How does the browser know when an image has been retrieved and is ready to be painted? By implementing **callbacks** and something known as the [event loop](https://www.youtube.com/watch?v=cCOL7MC4Pl0) (in this video, Jake Archibald from Google does an amazing job demonstrating the browser's event loop).

##### Using Callbacks to Work with Asynchronous Code

JavaScript provides two ways to run a function **after** an asynchronous operation completes its long running process:

- **Callbacks**
- **Promises**

We'll learn about promises later in the course, first let's see how callbacks are used to implement the async programming model.

##### A Simulated Asynchronous Example

The `getFriends()` function below is _synchronous_. It returns an array of friends immediately when invoked, and everything works just peachy:

```js
// Synchronous function
function getFriends() {
  return ['Fred', 'Barney'];
}

// Get the friends
let friends = getFriends();

// The friends array is ready to work with because getFriends
// is synchronous and returned the array of friends we wanted 
friends.forEach(function(friend) {
  console.log(friend);
});
``` 

Now let's use a `setTimeout` within `getFriends()` to simulate a long-running asynchronous function (as if we were fetching the data across a network):

```js
// asynchronous function
function getFriendsAsync() {
  // Using setTimeout to make getFriendsAsync
  // behave like a long-running database operation
  setTimeout(function() {
    return ['Fred', 'Barney'];
  }, 0);
}

// Will friends have an array after this line of code runs?
let friends = getFriendsAsync();

// The following will cause an error because
// friends is not an array yet
friends.forEach(function(friend) {
  console.log(friend);
})
```

Running the above code will generate an error because the `friends` variable will not be an array of data before we call `forEach` on it.

What's a programmer to do?

##### Callbacks to the Rescue 

We're going to make it possible to work with the `getFriendsAsync` function by refactoring it to accept a callback function as follows:

```js
// Refactor to accept a callback function
// to be called when the data is ready
function getFriendsAsync(cb) {
  setTimeout(function() {
    // pass the results to the provided callback
    cb(['Fred', 'Barney']);
  }, 0);
}

// Execute and provide it with an anonymous callback function
// to be called by the getFriendsAsync function
getFriendsAsync(function(friends) {
  friends.forEach(function(friend) {
    console.log(friend);
  });
});
```

The `getFriendsAsync` function has been refactored to accept a callback function, which it invokes at the appropriate time - in this case, when the `setTimeout` times out.

Note how `getFriendsAsync` calls the callback passed to it and provides it with the array of friends as an argument - good stuff!  This is a common pattern when calling an asynchronous process.

Functions that are asynchronous must be **designed** to either:

- Accept a callback function, or
- Return a promise (again, more later in the course)

#### 💪 Practice Exercise - Callback with Async Functions (5 min)

Copy the following three functions into your Repl:

```js
function step1(cb) {
  setTimeout(function() {
    console.log('STEP 1 COMPLETE');
    cb()
  }, 750);
}

function step2(cb) {
  setTimeout(function() {
    console.log('STEP 2 COMPLETE');
    cb()
  }, 500);
}
	
function step3(cb) {
  setTimeout(function() {
    console.log('STEP 3 COMPLETE');
    cb()
  }, 250);
}
```

The above functions are working asynchronous functions - DO NOT change any of their code. They are what we call "black boxes" because we do not need to know anything that goes on inside of them.

Each of the three functions, **step1**, **step2** & **step3**, accept a single argument - a callback function.

**Partner up** and figure out how to invoke the three functions such that the output in the console will be:

```
STEP 1 COMPLETE
STEP 2 COMPLETE
STEP 3 COMPLETE
FINISHED
```

Hints:

- Call `step1` first.
- You cannot call `step2` until after `step1` has "finished", similarly, you cannot call `step3` until `step2` has "finished".
- You must console.log the last line of the output, `FINISHED`, after `step3` has "finished".

## 6. Essential Questions

1. **True or False:  Callback functions are defined differently than non-callback functions.**

2. **If asked in a job interview, "What's a callback function?" - what would a good answer be?**

3. **What happens if we invoke a callback when passing it as an argument to a higher-order function?**


