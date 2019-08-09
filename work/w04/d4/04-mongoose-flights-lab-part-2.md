
<img src="https://i.imgur.com/Y74xxoD.jpg" width="900">

# Mongoose "Flights" Lab - Part 2

## Intro

Today in the _Mongoose - Embedding Related Data_ lesson you:

- Created a schema used to embed _review_ subdocuments in a _movie_ document.

- Created routes and a controller for the _reviews_ data resource.

- Created UI for creating and displaying the _reviews_ on the **show** view of a movie.

- Wrote a `create` action that retrieved a _movie_ document, pushed the _review_ (`req.body`) into the document's `reviews` array, saved the _movie_ doc, and redirected back to the show view for that movie.

Similar to what we did in the lesson, in this lab you'll be adding functionality to the `mongoose-flights` project you created in the _part 1_ lab.

#### The final version of `mongoose-flights` will be a deliverable, so do each part and don't fall behind.

## Goal

The goal of this lab is to add the ability to specify the `airport` and  `destinations` for a _flight_ document.

Styling is secondary, spend time on it only after the functionality has been implemented.

## Exercises

1. Create a `destinationSchema` that will provide the structure for _destination_ subdocuments with the following properties:

	| Property | Type | Validations | Default Value |
	|---|---|---|---|
	| `airport`| `String`| `enum` to include<br>'AUS', 'DAL', 'LAX' & 'SEA' | n/a |
	| `arrival`| `Date`| n/a | n/a | 

2. Add the following two additional properties to the `Flight` Model:

	| Property | Type | Validations | Default Value |
	|---|---|---|---|
	| `airport`| `String`| `enum` to include<br>'AUS', 'DAL', 'LAX' & 'SEA' | 'SEA' | 
	| `destinations`| `[destinationSchema]`| n/a | n/a | 

3. Modify the form for inputting a _flight_ to add a `<select name="airport">` element so assign a value to the new _flight_ document's `airport` property. Ensure that there are `<option>` elements for the four allowable airport codes ('AUS', 'DAL', etc.).

4. Implement the following User Story:<br>_AAU, when viewing the list of flights, I want to click on a "detail" link displayed next to each flight to view all of the properties for that flight (`show` view)_

5. Implement the following User Story:<br>_AAU, when viewing the details page (`show` view) for a flight, I want to be able to add a destination for that flight, including its `arrival` date/time & one of the established airport codes_

6. Implement the following User Story:<br>_AAU, when viewing the details page (`show` view) for a flight, I want to see a list of that flight's `destinations` (`airport` & `arrival`)_


## Bonuses

1. Sort the list of `destinations` for a flight by the `arrival` date/time in ascending order.

2. Style the views.

3. When adding a destination for a flight, exclude the airports in the `<select>` that have already been used by other destinations and/or the flight's `airport`.

## Deliverable?

### The final version of `mongoose-flights` will be a deliverable, so do each part and don't fall behind.