<img src="https://i.imgur.com/294n16z.png">

# Consume a 3rd Party API Lab

## Requirements

- Create an Express app using Express Generator.  Be sure to specify `-e` to configure the app to use the EJS template engine.

- Modify the `index.ejs` template to display a `Get Chuck Norris Joke` submit button within a form (the form needs no inputs).

- When the `Get Chuck Norris Joke` button is clicked, the form will be submitted to the server.

- The server should make a request to the following endpoint at [CHUCKNORRIS.IO](https://api.chucknorris.io/):<br>`https://api.chucknorris.io/jokes/random`

- The server should respond by rendering `index.ejs` with:
	- The text of the joke received in the API's response.
	- The `Get Chuck Norris Joke` submit button

- This lab is not a deliverable.

## Bonus

- Implement the choice of category of the joke!

## Hints

- The list of categories is available at this endpoint:<br>`https://api.chucknorris.io/jokes/categories`

- Set the form's method attribute to `method="GET"` so that the selected category will be submitted as a query string (see below).

- "Build" the categories as radio inputs within the form. Setting the `name` attribute on the inputs to `category` will result in the selected category being submitted as a query string and available on the server as `req.query.category`.

<img src="https://i.imgur.com/nVr5KUi.png">