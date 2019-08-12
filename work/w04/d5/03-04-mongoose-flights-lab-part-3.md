
<img src="https://i.imgur.com/Y74xxoD.jpg" width="900">

# Mongoose "Flights" Lab - Part 3

## Intro

Today in the _Mongoose - Referencing Related Data_ lesson you:

- Created a `Performer` Model.

- Created a many-to-many relationship, `movie >--< performer` by adding a `cast` property in the `Movie` Model that references _performer_ documents.

- Created routes and a controller for the _performers_ data resource.

- Implemented functionality for creating  _performers_.

- Populated the `cast` property with _performer_ docs and displayed them with the movie on the movie's show view.

- Implemented functionality for adding _performers_ to a movie's `cast` (if the don't already exist in the cast).

Similar to what we did in the lesson, in this lab you'll be adding functionality to the `mongoose-flights` project you created in _part 1_ and have continued to work on in _part 2_ of the lab.

#### The final version of `mongoose-flights`, as a result of completing parts 1 - 3 of this lab, is a deliverable due on Monday.

## Goal

The goal of this lab is to practice referencing related data.

You will add the ability to create _tickets_ for a given _flight_ in the `mongoose-flight` project.

The relationship between the data entities is:<br>
`Flight --< Ticket`<br>
_A flight has many tickets_

Styling is secondary, spend time on it only after the functionality has been implemented.

## Exercises

1. Create a `ticketSchema` that will be compiled into a `Ticket` Model with the following properties:

	| Property | Type | Validations | Default Value |
	|---|---|---|---|
	| `seat`| `String`| Must be 'A1' thru 'F99' (see hints) | n/a |
	| `price`| `Number`| Minimum of `0` | n/a |
	| `flight`| `ObjectId`| Include `ref: 'Flight'` to enable population | n/a |

	##### Hints
	
	Notice how we don't _have_ to use an array to implement the 1:M relationship between `Flight` and `Ticket`. Instead, referencing the `ObjectId` of the _flight_ in the `flight` property of a _ticket_ enables the relationship. FYI, to implement this 1:M relationship, we _could_ have put a `tickets` array on the `Flight` model instead, or in addition to the `flight` property on `Ticket`. Be aware however, that M:M relationships would always require the use of an array property.
	
	Define the `seat` property as follows:<br>`seat: {type: String, match: /[A-F][1-9]\d?/}` - that's what we call a [regular expression](https://en.wikipedia.org/wiki/Regular_expression) that's being assigned to the `match` validator. Now for the best part, which just might blow your mind! You ready?  Are you sure? Here it is... HTML `<input>` tags have a `pattern` attribute that accept a regex pattern; and if what's typed in the `<input>` doesn't match the pattern, the form can't be submitted! Here's what your `<input>` should look like for entering the seat:
	
	```html
	<input name="seat" required pattern="[A-F][1-9]\d?">
	```
	That regex pattern will match the following characters:
	
	- An `A` thru `F` character, followed by
	- a `1` thru `9` character, followed by
	- zero or one `0` thru `9` character.
	
	We'll cover more about regular expressions later in SEI, but this opportunity to preview them was too hard to pass up! Combined with the HTML `pattern` attribute, they provide an excellent way to perform _client-side_ validation of inputs.

2. Modify the `show` view for a _flight_ to render, as you see fit (table, grid, etc.), a list of _tickets_ that have been created for that _flight_.

	##### Hints
	
	To show a list of _tickets_ that belong to a _flight_, you're going to have to make a separate query (inside of the callback of the `Flight.findById` call) to retrieve the flights as follows:
	
	```js
	Flight.findById(req.params.id, function(err, flight) {
	    Ticket.find({flight: flight._id}, function(err, tickets) {
	        ...
	    });
	});
	```
	Be sure to pass both `flight` & `tickets` to the flight's `show` view so that they can be rendered.
	
	Note that there's no reason to `populate` the `flight` property because in this case, you already have obtained the _flight_ using `findById`.
	
	For future reference, here's how to populate a _ticket's_ `flight` property:
	
	```js
	Ticket.findById(req.params.id)
	.populate('flight')
	.exec(function(err, ticket) {...
	```

3. Also on the flight's `show` view, display a **New Ticket** link (perhaps styled to look like a button) that when clicked, shows the ticket's `new` view used to create a _ticket_ for the _flight_. When the form is submitted, create the _ticket_ on the server and redirect back to the _flight's_ `show` view.

	##### Hints
	
	To display the view/form for adding a ticket, the path of the `href` for the **New Ticket** link will need to include the flight's `_id`.  The path should match this route on the server:  `/flights/:id/tickets/new`. The `req.params.id` can now be passed to the **tickets/new.ejs** and used for the ticket form's `action` attribute...
	
	If you use the "proper" route for the ticket form's `action` attribute, the `ticketsCtrl.create` action will have access to the `_id` of the _flight_ the _ticket_ is being created for.
	
	In the controller action, there **will not** be a `flight` property on the `req.body` object. You must add that property yourself before using `req.body` to create the _ticket_. Failure to do so will result in the _ticket_ being created without a `flight` property that references the _flight_ it belongs to - so if newly added tickets are not showing up with the flight, this is probably the cause.
 
## More Hints

- Learn it, know it, live it... When adding functionality to the app:
	- Identify the "proper" Route (Verb + Path)
	- Create the UI that issues a request that matches that route.
	- Define the route on the server and map it to a controller action.
	- Code and export the controller action.
	- `res.render` a view in the case of a GET request, or `res.redirect` if data was changed.

## Bonuses

1. Style the app.

2. Add a feature to delete a flight's _ticket_.

## Deliverable?

### The final version of `mongoose-flights`, as a result of completing parts 1 - 3 of this lab, is a deliverable due on Monday.