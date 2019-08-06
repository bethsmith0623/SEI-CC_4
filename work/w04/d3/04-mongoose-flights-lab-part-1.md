
<img src="https://i.imgur.com/Y74xxoD.jpg" width="900">

# Mongoose "Flights" Lab - Part 1

## Intro

Today in the Intro to Mongoose lesson you Created and Read documents using a `Movie` Model.

In this lab, you'll do the same, except you'll create and use a `Fight` model.

Similar to what we did in the lesson, you'll start by creating a `mongoose-flights` project.

FYI, future lessons will expand upon the `mongoose-movies` project, and the labs will expand upon the `mongoose-flights` project!

#### The final version of `mongoose-flights` will be a deliverable, so do each part and don't fall behind.

## Exercises

1. Use express generator to create a `mongoose-flights` project. Be sure to install the node modules after you cd into the project.

2. Create a **config/database.js** module that connects to a database named `flights`. Be sure to require the module in **server.js**.

3. Create a `Flight` Model with the following properties:

	| Property | Type | Validations | Default Value |
	|---|---|---|---|
	| `airline`| `String`| `enum` to include 'American', 'Southwest' & 'United' | n/a | 
	| `flightNo`| `Number`| Required<br>Between `10` and `9999` | n/a | 
	| `departs`| `Date`| n/a | One year from date created | 

4. Implement the following User Stories:
	- AAU, I want to view a list of all flights (index view) that displays each flight's airline, flight no., and departure date/time.
	
	- AAU, I want to create flights by entering the information on a page (new view) that has a form and submitting it.

#### Hints:

- Checkout the [`<input type="datetime-local">`
](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/datetime-local) to assist users in entering valid date/time values.


## Bonuses

1. Code these additional User Stories:
	- AAU, I want to be able to access each view via a navigation bar at the top of the page with links to:
		- `ALL FLIGHTS`, and
		- `ADD FLIGHT`
	
	- AAU, I want to view the list of flights by departure date in ascending order.
	
	- AAU, I want the flights in the list to be displayed using red text if the flight's departure date has passed.


3. Style the `index` and `new` views.

## Deliverable?

### The final version of `mongoose-flights` will be a deliverable, so do each part and don't fall behind.