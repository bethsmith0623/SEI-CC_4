<img src="https://i.imgur.com/fx2orT2.png">

# Full-stack React Lab

You enjoy challenges - you've come to the right place!

Now that we've taken Mastermind full-stack, you're ready to get some practice interacting with a backend's API by persisting high-scores!

#### Hints:

- Plan what the UI should look like. Another client-side route and React "page" component dedicated to displaying high-scores would be super.

- The time to check for a high-score is when `perfect === 4` (a chicken dinner) in the `handleScoreClick` method.

- If there is a winner, you'll want to stop the timer, even before it currently is, using `setState`.

- The backend API will be just like what we've previously worked with in class:
	- Define API routes on the server. Remember to follow the best practice of name-spacing your API routes with `/api` and follow RESTful routing conventions whenever possible.
	- Your controller code will be responding to the AJAX requests by returning JSON.

- What will the high-score schema/model look like? Keep it simple, the player's `initials`, `numGuesses` and `seconds` should work.

- When composing the Mongoose query to return high-scores, `numGuesses` should probably be prioritized over `seconds`. Mongoose's `sort` query method will help with this.

- When a player has won by cracking the code, that's the time to get their initials and make the AJAX request to persist the score. FYI, the solution code took the easy way out and used a JS `prompt()` to ask the player for their initials. Feel free to improve upon this!

- Don't forget to install the necessary node modules like `dotenv` &`mongoose`. You will **not** need `method-override` (you know why - right?).

- Also, you'll need a hosted MongoDB if you want to deploy. You already have an MongoDB Atlas account, so go for it.

#### Bonus

As a bonus, try limiting the number of high-scores to say, the top 20.

On the client win the player wins, you'll want to check if their score made the list and persist the high score only if it has (or if there's less than 20 existing scores).

On the server, you'll want to look into chaining the Mongoose `limit` query method to make sure that you don't return more than 20 scores.

#### Super Bonus

- If a score has made the list, how about letting the user know by moving to the high-score route! This requires that the `<App>` component be able to access `BrowserRouter`'s `history` object so that it can change routes "programmatically" using the `history.push()` method. A minor refactor in **index.js** to this is needed:

	```js
	// Import Route also
	import { BrowserRouter as Router, Route } from 'react-router-dom';
	
	...
	
	ReactDOM.render(
	  <Router><Route component={App}/></Router>,
	  document.getElementById('root')
	);
	```

- Program the backend to limit the number of high-scores in the collection to 20 (or whatever number of scores you want to limit to). Before adding a new high-score to the database, you will want to:
	1. Verify that the high score sent by the client is indeed a worthy high score (better than the "worst" high-score in the database). This would be a great use case for a **custom validator** function in the schema.  Check out the **Custom** section of [the docs](http://mongoosejs.com/docs/validation.html). For further assistance, perhaps [this StackOverflow](https://stackoverflow.com/questions/43962430/mongoose-how-to-prevent-mongodb-to-save-duplicate-email-records-in-database) will help.
	2. After adding the new high-score, remove the worst score if the collection grows larger than the number of high-scores you want to keep.  This would be a good use case for Mongoose **post save** [middleware](http://mongoosejs.com/docs/middleware.html) on the high score schema.






