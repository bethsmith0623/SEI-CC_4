[click to view as a presentation](https://presentations.generalassemb.ly/84f0b589e03909f33106e14b9bf00a97#/1)

<link href="https://gist.githubusercontent.com/jim-clark/6919052ab15de680c120907d223c31b5/raw/9eedb5e3c01352b9ccda7264227f253be56a08b7/slide.css">

---
# Producing an API in Express

<img src="https://i.imgur.com/5B1lPHz.jpg" height="500">

---
# Learning Objectives
<br>

- Explain why we would want to add an API to an app

- Create name-spaced routes dedicated to an API

- Respond to API requests with JSON and appropriate status codes

---
# Roadmap
<br>

- Why expose API access to an app?
- Views not required
- Postman
- We need an Express app
- Install Mongoose and connect to a DB
- Model?  Puppies, of course!
- API RESTful routes
- Proper response codes
- Set up the routes for the API
- Responding with JSON and a Status Code
- CORS
- Essential Questions

---
### Why expose API access to an app?
<br>

- Previously we made requests to third-party API endpoints. Now it's our turn to expose our own endpoints.

- Exposing an API in our own app enables:
	- Development of single-page applications (no full-page refreshes).
	- Our app's RESTful resources and functionality to be accessed by multiple front-ends (web, mobile and desktop).

---
### Views not required
<br>

- Our app's API routes will return JSON, not HTML views.

- This being the case, views do not apply when developing an API.

- However, the very same web app may send back HTML using views **and** send back JSON by exposing an API.  They are not mutually exclusive.

---
### Postman
<br>

- In this lesson we'll be using an app called Postman that enables us to make any type of HTTP request, including sending along a data payload.

- It can be installed by [this download](https://www.getpostman.com/downloads/) or...

---
### 💪 Practice Exercise (15 Min)
<br>

- You've created several Express apps and Mongoose Models - time to do it again!

- Try to complete this exercise with minimal collaboration.

- Be "assertive" and code with a purpose - in other words, complete this exercise as quickly as you can!

- Follow the instructions in the next 4 slides...

---
### 💪 We need an Express app
<br>

- `cd` into this lesson's folder in the class repo.

- Create an Express app named `puppies-api`.

- Don't forget to install the modules (Express generator does not automatically install them).

---
### 💪 Install Mongoose and connect to a DB
<br>

- Create a `config/database.js` module.

- Install **Mongoose** and connect to a database named `puppies`.

- Reminder:  The code in the `database.js` module won't ever run unless...

---
### 💪 Model?  Puppy, of course!
<br>

- You're on a roll so keep on rolling!

- Create a schema/model named `Puppy` with the following properties:
	- **name**: `String` / required
	- **breed**: `String` / default to "Mixed"
	- **age**: `Number` / default to 0

---
### 💪 Test the Model (Time Permitting)
<br>

- If you have the time, test the code by creating a puppy or two in a  Node REPL.<br>[Here are instructions how](https://gist.github.com/jim-clark/57b646abbb6c0ce09f9fa948eab6febc)

---
### API RESTful routes
<br>

- Setting up the API's routes on the server will be very similar to how we've set up non-API routes.

- However, it's a best practice to "namespace" API related routes & code.

- Let's start by renaming the generated **routes/users.js** file to **routes/api.js**.  We'll use this file to hold the routes for our API.

- Make the necessary changes in **server.js**. If done correctly, requests will have to be made as follows...

---
### API RESTful routes (cont.)
<br>

- <p>These are the RESTful routes we need to implement:</p>

<img src="https://i.imgur.com/Y9n4SPT.png" width="900">

---
### Proper response codes
<br>

- Virtually all modern web APIs respond with JSON.

- However, well designed APIs also set the _status code_ of the HTTP response appropriately...

---
### Proper response codes

- Here is a common approach:

	<img src="https://i.imgur.com/TbZcD8Z.png" width="900">
	
- Note that if something goes wrong on the server (network error, etc., we should send back a status code of 500).

---
### Set up the routes for the API
<br>

- Assuming we are going to require the following controller within _routes/api.js_<br>

	```js
	var puppiesCtrl = require('../controllers/api/puppies');
	```
	
	Let's create the routes for these actions:
	- `puppiesCtrl.index`
	- `puppiesCtrl.show`
	- `puppiesCtrl.create`
	- `puppiesCtrl.update`
	- `puppiesCtrl.delete`
	
---
### Responding with JSON and a Status Code
<br>

- We will be responding with JSON and a Status Code to every HTTP request to our API.

- This is how we can do it:

	```js
	function index(req, res) {
		Puppy.find({}, function(err, puppies) {
			res.status(200).json(puppies);
		});
	}
	```
- Notice how we chained on to the `status` method.

---
### Code the `index` Action
<br>

- First, create and require the controller module.

- Create the route in **routes/api/puppies.js** for retrieving all puppies.

- Code that `index` controller action we just reviewed.

- When you're done, we'll use Postman to test out our first API route!

---
### Code the `create` Action
<br>

- Now, let's build out the other 5 routes.

- Let's write the `create` route next because we need more puppies!

---
### Code the Remaining Actions
<br>

- Okay, two down, three to go. Let's finish coding the following:

	- `puppiesCtrl.show`
	- `puppiesCtrl.update`
	- `puppiesCtrl.delete`

	
- We'll use Postman to test the routes as we go - be sure to double-quote all JSON keys in the data payload (body) because JSON & Postman is strict.

---
### Congrats on exposing an API<br>for your app!
<br>

- We have created our own RESTful API that exposes the Puppy data resource.

- We included all five routes/actions required for full CRUD, however, some applications may choose to expose less functionality, e.g., read-only functionality with `index` & `show` actions only.

---
### CORS
<br>

- Browsers have a security mechanism that prevents JS from making a request for a resource to a domain different from the one that the current web page was loaded from.

- The domain is made up of the **host** and **port**. Therefore, `localhost:3000` is considered a different domain than `localhost:8080`.

---
### CORS (cont.)
<br>

- To improve web applications, developers asked modern browser vendors to allow cross-origin requests and the **_cross-origin resource sharing_ (CORS)** standard came to be.

- The details can be found [here](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS).

---
### CORS (cont.)
<br>

- To enable access to our server's API by client apps not delivered from our server's domain, we need to enable CORS.

- We implement CORS in an Express app using middleware, of course!

---
### CORS (cont.)
<br>

- Install the [CORS](https://www.npmjs.com/package/cors) module:

	```
	$ npm install cors
	```

- Then we simply have to mount the middleware in **server.js**:

	```js
	var cors = require('cors');
	...
	var app = express();
	
	app.use(cors());
	```

- As usual, check the docs for additional info and options.

---
### ❓ Essential Questions
<br>

1. How would these two routes be expected to behave differently?<br>
	`GET /accounts` and<br>`GET /api/accounts`
	
2. In addition to responding with JSON, it is proper to set the HTTP Response's _______ _______ as well.

3. What is the use case for exposing an API from a server app?
