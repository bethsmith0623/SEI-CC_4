![](https://i.imgur.com/hGEeDR1.png)

# JavaScript Objects<br>Guess The Number Lab

## Intro

This lab will provide you some practice working with JavaScript objects, plus some additional practice working with arrays.

This lab builds upon the `game` object that was started in the Intro to JS Objects lesson.

This lab is a **deliverable** - when completed, please slack the link to your instructor.

## Setup

1. Create a new repl in your [repl.it](https://repl.it/repls) account.

2. Name the repl `Guess the Number Lab`.

3. Copy over the work already done on the `game` object from the lesson earlier.  To make the `game` object's code 'cleaner', let's move the properties that were added separately during the lesson, into the object literal so that it looks like this:

	```js
	const game = {
	  title: 'Guess the Number!',
	  biggestNum: 100,
	  smallestNum: 1,
	  secretNum: null,
	  play: function() {
	    this.secretNum = Math.floor(Math.random() * 
	      (this.biggestNum - this.smallestNum + 1)) + this.smallestNum;
	  }
	};
	```

	Note that `numGuesses` has been removed because you will be adding a `prevGuesses` array whose length can be used to obtain the number of guesses when needed.

## Features

- Allow the player to continually be prompted to enter their guess of what the secret number is until they guess correctly.

- If the player has an incorrect guess, display an alert message that informs the player:
	- Whether their guess is too high, or too low, and...
	- A list of all the previously guessed numbers (without showing the square brackets of an array).

- If the player has guessed the secret number:
	- Display an alert message that congrats the player and informs them of how many guesses they took.
	- End the game play.

## Tasks

Completing the following tasks will result in a working _Guess the Number_ game:

1. Add a `prevGuesses` property to the `game` object initialized to an empty array.

2. Add a `getGuess` method to `game` that prompts the player to enter a guess with a message formatted as: _Enter a guess between [smallestNum] and [biggestNum]:_.  Hint - use a template literal for the prompt message.

3. Ensure that the `getGuess` method returns a value that is:
	- Is a _number_, not a _string_.
	- Is between `smallestNum` and `biggestNum`, inclusive.
	- Hints:
		- This is a great use case for a `while` loop.
		- `parseInt` returns `NaN` if the string cannot be parsed into a number.

4. From within the `play` method, invoke the `getGuess` method and add the new guess to the `prevGuesses` array.

5. Add a `render` method to `game` that `play` will call after a guess has been made that alerts:
	- If the secret has been guessed:<br>
		```
		Congrats! You guessed the number in [x] guesses!
		```
	- Otherwise:<br>
		```
		Your guess is too [high|low]
		Previous guesses: x, x, x, x
		```
	- Hints:
		- `render` won't be able to access any of `play`'s local variables, e.g., `guess`, so be sure pass `render` any arguments as needed.
		- Template literals not only have interpolation, they honor whitespace - including line breaks!
		- The list of previous guesses can be generated using the array `join` method.

6. The `play` method should end (`return`) when the guess matches `secretNum`.

## Bonus

- When `play` is run, immediately prompt the player to enter the smallest and biggest numbers instead of having them pre-set.

## Super Bonus

- Eliminate `prompt` and `alert` by writing this as an HTML/CSS/JS app!  FYI, _repl.it_ has HTML/CSS/JS repls.


## Solution

A solution can be found [here](https://repl.it/@jim_clark/Guess-the-Number-Lab)