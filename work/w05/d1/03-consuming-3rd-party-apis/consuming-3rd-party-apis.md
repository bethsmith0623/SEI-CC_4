[click to view as a presentation](https://presentations.generalassemb.ly/e781586626f7a0b8e1d79faedfcb46b1#/1)

---
# Consuming 3rd Party API<small>s</small>

<img src="https://i.imgur.com/ukTEfjF.png" width="900">

---
# Learning Objectives
<br>

<p>Students will be able to:</p>

- Consume a third-party API from an Express backend

- Render an API's data in an EJS Template

- Make multiple requests to retrieve "detail" data

---
# Roadmap
<p style="width: 100%"></p>

1. What kind of API are we talking about?
1. Why consume third-party APIs?
1. Research available APIs
1. I have a simple request
1. Different architectural approaches
1. Generate our starting app
1. Code our `index.ejs`
1. Add the POST route
1. Install and require the `request` module
1. Review the GitHub API docs
1. Access Tokens
1. Fetch data from GitHub's API
1. Render the data
1. Details, I want details!

---
## What kind of API are we talking about?

---
### What kind of API are we talking about?
<br>

- The term _API_ is quite vague and used within several contexts.

- The acronym actually stands for **Application Programming Interface**.

- _Application Programming Interfaces_ originally, and still do, allow  programmers to use the functionality of a library, a framework, an operating system, or any piece of software that exposes its functionality through its defined interface.

---
### What kind of API are we talking about?
<br>

- As the Internet has evolved, the term API has also come to represent services available by sending HTTP requests to servers, for example, update your status on Facebook - no UI required.

- However, in today's lesson we're interested in external (third-party) APIs that respond with data when we send them requests.  

---
## Why consume third-party APIs?

---
### Why consume third-party APIs?
<br>

- Data is information (duh), and...

- Information is a good thing!

- There's lots of data being exposed via APIs across the Internet that we can use in our apps - often free of charge!

---
### 💪 Research Available APIs
<br>

- Pair up and search for third-party data APIs that provide data.

- Reply to the Slack message with the following:
	- The name of the data API(s) you found
	- What kind of data can be consumed
	- It's access requirements and limitations (free, usage quotas, etc.)

---
## I have a simple request

---
### I have a simple request
<br>

- You've already seen simple requests made to APIs before.

- As basic as it gets, let's make a GET request to a third-party API straight from the browser's address bar:

	```sh
	http://pokeapi.co/api/v2/pokemon/1
	```

- **❓ What data format was returned?**

---
## Different architectural approaches

---
### Different architectural approaches

- When accessing APIs, there are a few different architectural approaches we can take:
	1. The client (browser) makes requests to the API directly using AJAX; then renders the JSON client-side (not always possible or recommended due to security issues).
	2. Client sends a request to our server; our server accesses the API and returns the JSON back to the browser for rendering client-side.
	3. Access the API from the server, perform server-side rendering of the JSON, and return the HTML page to the browser.

- In SEI, we'll ultimately use all three approaches. However, for this lesson, we'll use the **third approach**.

---
### Review the finished application
<br>

- The app we will build is a single view (`index.ejs`) application that displays basic information about users of GitHub.

- Allow me demo what we'll be building today.

---
## Generate our Starting App

---
### Generate our Starting App
<br>

- Once again, we're going to use Express Generator to scaffold a basic app.

- Instead of my direct assistance, work with your pair to pull this off.

- Be sure to specify the EJS view engine.

- Name the app `github-users`.

- Kind of prefer `server.js` instead of `app.js` too.

- Make sure to test it out when you're done.

---
## Code our "index.ejs"

---
### Code our "index.ejs"
<br>

- We're going to use the existing `index.ejs`.  For now, we will want to:

	- Adjust the existing boilerplate.
	
	- Add the form for submitting GitHub usernames

- Later, when we see what data is at our disposal, we'll come back and decide how to render it. 

---
### Adjust the boilerplate

- We're adding [Bootstrap](http://getbootstrap.com/getting-started/), changing the title and adding a Jumbotron:

```html
<head>
  <title>GitHub Users</title>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
  <link rel='stylesheet' href='/stylesheets/style.css' />
</head>
<body class="container">
  <h1 class="jumbotron text-center">GitHub Users</h1>
    
</body>
``` 

<p>Next, the form for submitting the username...</p>

---
### Add the Username form

- We'll need a simple form to allow us to submit a GitHub username to retrieve data for:

	```html
	<div class="row">
	  <div class="col-xs-6 col-xs-offset-6">
	    <form action="/" method="POST">
	      <div class="input-group">
	        <input type="text" name="username" class="form-control"
	        		placeholder="Enter a GitHub Username">
	        <span class="input-group-btn">
	          <button class="btn btn-success"
	          	type="submit">Go!</button>
	        </span>
	      </div>
	    </form>
	  </div>
	</div>	
	```

---
## Add the POST route

---
### Add the POST route
<br>

- We're going to need a `POST /` route for when the form is submitted by clicking the "Go!" button.

- In **routes/index.js**:

	```js
	router.get('/', function(req, res, next) {
  	  res.render('index');
	});

	router.post('/', function(req, res, next) {
  	  console.log(`username: ${req.body.username}`);
  	  res.render('index');
	});
	```
- For now, we're just logging out to the server terminal what was typed in the input then rendering the **index** view again.

---
## Install and require the "request" module

---
### Install and require the "request" module
<br>

- In order to make HTTP requests from our Express server to the GitHub API, we'll need to install and require an NPM module named [request](https://www.npmjs.com/package/request), a simple HTTP request client:

	```
	$ npm install request
	```

---
### Install and require the "request" module
<br>

- Now lets require it in **routes/index.js**:

	```js
	var express = require('express');
	var router = express.Router();
	var request = require('request');
	```
- What? No separate controller module? Let's be rebels this lesson!

- Now, we need to review the documentation for the GitHub API...

---
### 💪 Review the GitHub API docs
<br>

- Let's pair up and review the [GitHub API](https://developer.github.com/v3/) docs with the goal of discovering:
	1. What is the API's **Root Endpoint**?  The root endpoint is the first part of the API's URL that remains fixed. Paths are then appended to the root endpoint to form other endpoints for specific requests.
	2. Are there limits to the number of times we can "hit" the API?

- Reply to the Slack message with your answers.

---
### Review the GitHub API docs
<br>

- After identifying the _root endpoint_, let's use the browser to make a GET request using that endpoint.

- GitHub has written their API so that when we do a GET request on the _root endpoint_, it returns JSON representing all endpoints available.

- Scrolling down toward the bottom will reveal a couple of endpoints that we are going to use - so take note of them:
	- **user\_url**: This endpoint returns some info about a user, such as a link to their avatar...
	- **user\_repositories\_url**: This endpoint returns an array of repositories the user is involved with.

---
## Access Tokens

---
### Access Tokens
<br>

- So, the answer to this question...

	> Are there limits to the number of times we can "hit" the API?

- Is **YES**.

- According to their docs, GitHub limits anonymous user's requests to only 60 per hour, tracked by IP address; and guess what, because we are all on the same wireless network, the API will see us as all having the same IP address.

- Yup, we're going to need to obtain an access token so that we can make up to 5,000 requests/hr.

---
### Access Tokens (cont.)

- Let's check out the API's rate limiting by making a request in Terminal using `curl`:

	```
	$ curl -i https://api.github.com/
	```

- Scroll up to the beginning of the output and check the headers:

	```
	HTTP/1.1 200 OK
	Server: GitHub.com
	Date: Sun, 02 Oct 2016 14:52:10 GMT
	Content-Type: application/json; charset=utf-8
	Content-Length: 2064
	Status: 200 OK
	X-RateLimit-Limit: 60
	X-RateLimit-Remaining: 57
	```
- Run the request again and check out the limits now.

---
### Access Tokens (cont.)

- According to the docs, we can obtain personal use tokens directly from our personal GitHub accounts.

- Make sure you are logged in to your GitHub account and go to _settings_, then click _Developer settings_ on the left.

- Now select _Personal access tokens_ from the menu at the bottom-left.

- Click the _Generate new token_ button.

- Enter a description and click the _Generate token_ button at the bottom. There is no need to select any of the scopes listed.

- Copy your token to the clipboard...

---
### Access Tokens (cont.)
<br>

- Now let's hit the API again but this time providing our token in a query string like this:

	```
	$ curl -i https://api.github.com/?access_token=1a1596cfe44...
	```

- Inspect the limits in the headers and you'll notice that we each personally have 5000 requests available - and no more sharing!

- Note that the docs show how tokens can also be submitted in the headers of the request.

---
### Access Tokens (cont.)
<br>

- Remember, we do not want to expose tokens, keys, database connection strings, or other secrets in our source code.

- Instead, for development purposes, we store secrets in a `.env` file and load its contents into the system's environment variables.

- In Node apps, we use a module called **dotenv**...

---
### Access Tokens (cont.)
<br>

- Let's install **dotenv**:

	```
	$ npm install dotenv
	```
	
- Then all we have to do is add this code near the top of **server.js**:

	```js
	var logger = require('morgan');
	// load secrets from .env file
	require('dotenv').config();
	``` 

---
### Access Tokens (cont.)
<br>

- Lastly create a `.env` file and add a variable for our token:

	```sh
	GITHUB_TOKEN=1a1596cfe4484ff...
	```

- No spaces or quotes please!

- Uppercase with underscores between words is best practice.

- Now you will be able to access the token in code like this:

	```js
	var token = process.env.GITHUB_TOKEN;
	```
	Each variable in `.env` will become a property on `process.env`

---
## Fetch data from GitHub's API

---
### Fetch data from GitHub's API
<br>

- When we submit the GitHub username in our app our goal is to display the user's:
	-  GitHub username
	-  Avatar
	-  A list of their repos (as hyperlinks that open the repo home pages in new tab.
	
- If the docs don't detail what is returned when we make a request to a specific endpoint, just examine what comes back and go from there!

---
### Fetch data from GitHub's API (cont.)
<br>

- Earlier we discovered the **user\_url** endpoint that returns general info for a username along with other endpoints that drill into that user's resources.

- The **user\_url** endpoint was documented as **https://api.github.com/users/{user}**.

- Note that any segment that is in curly braces, such as **{user}** shown above, is a named parameter and is where we need to provide actual values for the placeholder.

---
### Fetch data from GitHub's API (cont.)
<br>

- First, let's define a `const` to hold the _root endpoint_ in **routes/index.js**:

	```js
	var request = require('request');
	
	const rootURL = 'https://api.github.com/';
	```

---
### Fetch data from GitHub's API (cont.)

- Now let's use the `request` module to send a GET request to the **user\_url** endpoint for the submitted username and render the entire JSON response:

- In **routes/index.js**:

	```js
	router.post('/', function(req, res) {
	  request(
	    rootURL + 'users/' + req.body.username + 
	      '?access_token=' + process.env.GITHUB_TOKEN,
	    function(err, response, body) {
	      res.render('index', {userData: body});
	    }
	  );
	});
	```

---
### Fetch data from GitHub's API (cont.)
<br>

- We're passing the content returned from the request to our **index.ejs**.  Let's display it:

	```html
	  <!-- new HTML just above closing body tag -->
	  <hr>
	  <div class="row col-xs-8 col-xs-offset-2">
	    <% if (userData) { %>
	      <%= userData %>
	    <% } else { %>
	      <h3 class="text-center text-info">
	        Submit a GitHub username!
	      </h3>
	    <% } %>
	  </div>
	</body>
	```

- Also, we have to...

---
### Fetch data from GitHub's API (cont.)
<br>

- Pass an object from the GET '/' route as well to prevent a _"userData is not defined"_ error when the _index_ view is rendered:

	```js
	router.get('/', function(req, res) {
	  res.render('index', {userData: null});
	});
	```
	EJS is not forgiving if we access undefined variables :(

---
### Fetch data from GitHub's API (cont.)
<br>

- Make sure nodemon is serving our app and try submitting your GitHub username.

- Bad news...

---
### Fetch data from GitHub's API (cont.)
<br>

> Request forbidden by administrative rules. Please make sure your request has a User-Agent header (http://developer.github.com/v3/#user-agent-required)...

- If we read what the provided link to the docs has to say, we'll learn that requests to the GitHub API need a `User-Agent` header and the `request` module is not providing one by default.

- Let's see how we can pass an _options_ object to `request` instead of a URL only...

---
### Fetch data from GitHub's API (cont.)

- Here's our updated POST route:

	```js
	router.post('/', function(req, res) {
	  var options = {
	    url: rootURL + 'users/' + req.body.username,
	    headers: {
	      'User-Agent': 'jim-clark'
	    }
	  };
	  request(options, function(err, response, body) {
	    res.render('index', {userData: body});
	  });
	});
	```

- The docs suggested we pass our username as the value for the `User-Agent` header.

---
### Fetch data from GitHub's API (cont.)

- One more refactor to send our token in a header instead of the query string:

	```js
	router.post('/', function(req, res) {
	  var options = {
	    url: rootURL + 'users/' + req.body.username,
	    headers: {
	      'User-Agent': 'jim-clark',
	      'Authorization': 'token ' + process.env.GITHUB_TOKEN
	    }
	  };
	  ...
	```

- Be sure to refactor the code not to send the token in the query-string also.

---
### Fetch data from GitHub's API (cont.)
<br>

- One more try and we'll finally see what is returned by the API!

- Examining the JSON response we'll see that the `login` property holds the username and `avatar_url` points to user's avatar image.

- Now let's improve our view a bit to render the username and display the avatar...

---
### Render the data (cont.)

- We'll use a Bootstrap _panel_:

	```html
	<% if (userData) { %>
	  <div class="panel panel-default">
	    <div class="panel-heading text-center">
	      <img src="<%= userData.avatar_url %>"
	        class="img-circle" width="300">
	      <h2><%= userData.login %></h2>
	    </div>
	    <div class="panel-body">
	      <h3>Repos:</h3>
	      need to list repos here...
	    </div>
	  </div>
	<% } else { %>
	```

- Testing it out we'll find it not working because the response `body` is just a JSON string and needs to be parsed into a JS object...

---
### Render the data (cont.)
<br>

- Update this piece of code in the POST:

	```js
	request(options, function(err, response, body) {
	  var userData = JSON.parse(body);
     res.render('index', {userData: userData});
	});
	```

- `JSON.parse()` converts a string into a JS Object and `JSON.stringify()` does just the opposite, converting a JS object into a JSON string.

---
### Render the data (cont.)
<br>

- Finally! Not looking too bad.  Now we need to list the user's repositories.

- Do what you have to to find the endpoint that we can hit to grab the array of repos.

- Then, it's time to do some nesting...

---
### Details, I want details!

- It is common to need to make multiple requests to different endpoints to fetch all of the detail data you need before rendering.

- Of course, multiple requests will result in nested callbacks.  Update this section of the POST:

	```js
	...
	request(options, function(err, response, body) {
	  var userData = JSON.parse(body);
	  // update the options url to fetch the user's repos
	  options.url = userData.repos_url;
	  request(options, function(err, response, body) {
	    // add a repos property
	    userData.repos = JSON.parse(body);
	    console.log(userData.repos[0]);
	    res.render('index', {userData: userData});
	  });
	});
	``` 

---
### Details, I want details! (cont.)
<br>

- We logged out the first repo in the array so that we could see what properties are in there - and there's a bunch!

- However, this app only needs the `name` and the `html_url` properties.

---
### Details, I want details! (cont.)
<br>

- Bootstrap has a nice **List Group** component that's great for listing links:

	```html
	<div class="panel-body">
	  <h3>Repos:</h3>
	  <!-- new stuff below -->
	  <div class="list-group">
	    <% userData.repos.forEach(function(repo) { %>
	      <a href="<%= repo.html_url %>" target="_blank"
	        class="list-group-item">
	        <%= repo.name %>
	      </a>
	    <% }); %>
	  </div>
	  <!-- new stuff above -->
	</div>
	```

---
### Congrats on consuming a third-party api!
<br>

<p>On to the lab!</p>
