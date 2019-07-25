<img src="https://i.imgur.com/QBi5aLq.png">

# Guide on How to Build a Browser Game

## Intro

Getting started and knowing how to structure the code in an application is one of the most difficult things for students to figure out.

There might be plenty of sources available to learn about how to use a `forEach` loop, but finding help on how to think like a developer and write code to implement an app's features is difficult at best.

Luckily, you've come to the right place!

In SEI, it's not just about learning how to use languages, libraries and frameworks - it's also about learning how to organize and structure code to implement the features of a web app.

This guide will help you with:

- How to start a project, and
- How to organize/structure your code, in other words, how to "architect" your app.

## Client-Side MVC Architectural Approach

**Model-View-Controller (MVC)** is a popular software architectural pattern that is used to organize code in both client and server applications.

The following diagrams a typical client-side MVC architecture:

<img src="https://i.imgur.com/jIY7mO5.png">

Let's briefly review the Model, View and Controller components...

#### Model

The **Model** refers to the application's data that needs to be tracked/remembered - this data is often referred to as the application's **state**.

**Data** is the _single-source of truth_ in an executing application!
 
By following a "data-centric" approach, developers can more easily test the application's logic - in fact, we can test out much of the app in the console (assuming you keep your functions and state in global scope while developing the app)! For example, you can type something like `getWinner()` in the console to check what value is being returned from that function. 

An easy mistake new programmers make is using the **DOM** to hold state - instead, remember to use variables to hold **all** data that needs to be tracked during runtime.

By following this approach, a developer can re-use much of an application's code  if/when the application needs to be ported to other platforms such as mobile and desktop.

#### View

The **View** is what the user sees and interacts with.

In a browser app, the View consists of the **DOM** elements created using HTML, CSS and JavaScript.

The View can be made to "listen" for user actions by adding _event listeners_ to DOM elements for a multitude of [DOM events](https://developer.mozilla.org/en-US/docs/Web/Events). 

#### Controller

The **Controller** is the bulk of your app's JavaScript, excluding the state variables (which represent the Model as described above).

The Controller provides the glue between the Model and View (notice how the Model and View don't "know" about each other).

In a browser app, it is the controller that adds event listeners to the View (DOM elements).

When an event occurs, e.g., the user clicks something, the Controller:

1. Updates the Model variables (state).
2. Updates the View (DOM), using the data contained in the Model variables (state).

#### Summary

To summarize, the MVC architectural pattern organizes and structures code in a way that enables:

- Code to be more testable, reusable and extendable.
- Separation of the View (display) logic and business (application) logic. For example, you might decide to model a game of tic-tac-toe using the values of `1`, `-1` or `null` to represent whether a square holds Player X, Player O, or nobody, respectively.  However, when it comes time to transfer the app's state to the DOM, you can visualize the state anyway you want, e.g., a value of `1` is "rendered" with a certain image, etc.

## Overall Application Flow

Let's see how we might apply the MVC pattern when writing a browser app such as a game. 

The following diagram denotes one approach to structuring your code:

<img src="https://i.imgur.com/jayaYY2.png">

#### Key Points & Best Practices

- **Use constants** instead of literal values to improve code readability and maintenance. For example, let's say you wanted to limit the number of guesses in a game to a certain number.<br>You could write code like this:

	```js
	let lose = numGuesses > 5;
	```
	However, code like the following which would be more maintainable because you probably will need to use the maximum guesses value in more than one section of code:
	
	```js
	let lose = numGuesses > MAX_GUESSES;
	```

- **Instead of using several separate variables to hold state**, consider using object properties when it makes sense to do so. For example, if you need to track info for two players, instead of using several variables like `player1name`, `player2name`, `player1score`, `player2score`, etc., consider using an object like:

	```js
	const players = {
		'1': {
			name: '',
			score: 0
		},
		'-1': {
			name: '',
			score: 0
		}
	};
	```
	
	Following this practice will result in more concise code and make it easier to implement certain features such as persisting the state of a game.

- **Don't store state data that can be computed** as needed from other data - this avoids the risk of data becoming out of sync or inconsistent. For example, in Tic-Tac-Toe, it's not necessary to track the number of moves to determine if there's a tie game - the variable used to track the state of the board can already provide this info.

- If your code needs to access a DOM element more than once during runtime - **cache** it (save it in a variable).

- **The `render()` function's responsibility is to transfer all state to the DOM**.  This includes the hiding/showing of parts of the UI based upon the application's state.  For example, when a hand is in play in a game of Blackjack, the `render()` function would show the hit/stand buttons and hide the betting-related buttons. Also, if the `render()` function becomes too large, you can break it up into smaller functions, e.g., `renderScores()`, 

- The overreaching principle to keep in mind is...<br>**In response to user interaction**:
	1. **Update all state impacted by the interaction**, then
	2. **Update the DOM by calling `render()`**.

## Suggested Steps to Get Started

The following approach has been proven to help students write complex front-end web apps, such as games.

If you're concerned that using the following approach will result in you and your fellow students having code that is structured similarly - don't be!  **What matters is what prospective employers think when they look at your projects's code structure in GitHub!**

1. **Analyze the app's functionality**
	- The app's features, from the user's point of view, should be described using _User Stories_.  User stories follow this template: **As a [role], I want [feature] because [reason]**.  Example user story: _As a player, I want to see a list of high-scores so that I know what I have to score to make the list_.

2. **Think about the overall design (look & feel) of the app**
	- Take the users (audience) of the app into consideration.
	- Should the app have a clean/minimalist UI (current trend),  or should it be themed to match the app's purpose?

3. **Wireframe the UI**
	- Wireframes provide a blueprint for the HTML & CSS. 
	- Wireframes also help reveal an application's data (state) and functionality.

4. **Pseudocode**
	- Some of the app's features may need to be pseudocoded, that is, outlining the app's logic in a plain, informal way.
	- Pseudocode the app's **overall** functionality first.
	- More detailed pseudocode for a given feature may be required later.

5. **Analyze the application's state (data)**
	- What does the application need to "remember" throughout its execution?
	- Use the wireframe(s), user stories and pseudocode to help determine what state needs to be tracked.
	- Note that in an application with a database, we would analyze the database design during this step.

6. **Set up the project**
	- Create project directory OUTSIDE of any existing git repo (nested repos cause problems).
	- Create the starting project files. Here's a possible structure:
		- **index.html**
		- **css/main.css**
		- **js/main.js**
	- Create the HTML boilerplate within **index.html**.
	- Link **main.css** in the `<head>`.
	- Loading **main.js** just above the closing `</body>` tag ensures that the DOM is ready before the script runs. Alternatively, if you want to put the script tag in the `<head>`, add a `defer` attribute as follows:<br>
`<script defer src="js/main.js">`<br>Be sure to load libraries such as jQuery before the app's scripts.

7. **Create a local repo**
	- `$ git init`
	- Create a remote repo in your GitHub account then follow the instructions that GitHub provides to add a remote to link your local repo to GitHub.
	- It is recommended that the name of the repo and the project directory match.

8. **Organize the app's JS into sections**

	- Adding comments such as the following will help you organize your app's code:
	<br>`/*----- constants -----*/`
	<br>`/*----- app's state (variables) -----*/`
	<br>`/*----- cached element references -----*/`
	<br>`/*----- event listeners -----*/`
	<br>`/*----- functions -----*/`

9. **Code away!**
	- Iterating between adding HTML, CSS & JS is one approach.
	- Start with some markup for the basic layout of the UI.
	- Declare, but don't initialize, the application-wide variables (state). The initialization of the variables to their "start-up" state should be done within an `initialize`, or similarly named function, i.e., `init`, `reset`, etc.
	- Write that `initialize` function.
	- Invoke `initialize()` to "kick off" the app.
	- Next stub up a `render` function.  Be sure to call `render` after state has been updated in event handlers, the `initialize` function, etc. 
	- Register event listeners - browser apps are typically _event-driven_.
	- If you have user stories, code them in a logical order.


10. **More recommendations for interactive browser app's, such as games**
	- Create a main `render` function that is responsible for rendering the state of the app to the DOM.
	- If the `render` function becomes lengthy, add additional rendering oriented functions, for example:
	
	```js
	function render() {
		renderHands();
		renderControls();
		if (winner) {
			renderWinnerMessage();
		} else {
			renderTurnMessage();
		}
	}
	```
	- Avoid accessing the DOM from outside render-oriented functions. However, "eye candy" animations, a ticking time display, etc. are exceptions to this tip.
	- **Data (state) is the single source of truth of the app** - when implementing an app's logic, the DOM is secondary to data manipulation. **Get used to thinking about how to your app's data changes vs. the display.**
	- As the user interacts with the application (or other events such as timers trigger), code the app such that it:
		- Updates state, then...
		- Calls `render()`

11. **Make frequent git commits of working code**
	- At a minimum, commit each "milestone" or feature implementation.

12. **Experiment and refactor code as necessary**

13. **Have fun!**