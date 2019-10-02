<img src="https://i.imgur.com/fx2orT2.png">

# Full-stack React
---

## Learning Objectives

| Students Will Be Able To: |
| --- |
| Ready a React app for production |
| Logically structure a full-stack React project |
| Configure an Express app to serve a React app's **index.html** file |
| Configure an Express app to accommodate client-side routing |
| Configure a React project for full-stack development |

## Roadmap

- Set Up
- Why Full-stack?
- Architecting a Full-stack React App
- Building the React App's Production Code
- Code the Express App
- Configure React for Full-stack Development
- Deploying to Heroku
- Essential Questions

## Set Up

The starter code is the React Mastermind app that includes the timer implemented from the previous lesson.

- `cd` into the starter-code/react-mastermind folder for this lesson.
- Open the project in VS Code: `$ code`.
- Open a terminal in VS Code (`ctrl + backtick`)
- Install the Node modules: `$ npm i`
- Start the React Dev Server: `$ npm start`

## Why Full-stack?

Thus far, our React apps have been static, front-end only apps that don't communicate with a server after the _index.html_ has been delivered.

It's _possible_ for static front-end only SPAs to have a reasonable amount of functionality if they incorporate calls to APIs or cloud services like Firebase.

However, most SPAs rely on a backend server app for tasks such as:

- Performing CRUD
- Authenticating users

Such an app, where we write code that runs on the front-end and the backend, as you know, is a full-stack application.

## Architecting a Full-stack React App

Up until this point, we've taken for granted that full-stack apps, like your Express and Django projects, were single, integrated projects.

However, developing a MERN-stack (MongoDB, Express, React & Node) project involves complexities such as tooling, React's integrated development server, etc.

Basically, there are complications in both **development and production** environments that have to be addressed.

#### Complications During Development 

If we're going to develop a MERN-stack app, we have to figure out how we're going to:

- Use React's Development Server (`npm start`)
- **and**, run `nodemon` to productively develop an Express backend that can respond to AJAX requests sent from the React front-end

<details>
<summary>There's a conflict between React's development server and Express development - what is it?</summary>
<p><strong>They both run on port 3000 by default.</strong></p>
</details>

<br>

> Key Point: When developing a MERN-stack app, you will need to launch **both** React's development server (`$ npm start`) **and** the Express app (`$ nodemon server`) in separate terminal sessions.

#### Production Environment Complications

As we develop our React app locally, we're writing source code that React's dev server builds and runs automatically.

However, the React dev server is a local tool that does not run in the cloud, i.e., on Heroku.

We need a way to **build** our code on the web server that's hosting our app which will vary depending upon which hosting service is used.

Basically, to be able to deploy our MERN-stack app, we're going to have to:

- Configure Heroku to **build** the React front-end code to make it production ready, and...
- Configure the Express app to serve that production code

#### Possible Full-stack Architectures

There are two general architectures we could pursue:

1. Maintain **two** separate projects, one for the React SPA, the other for the Express backend.
1. Integrate the codebase for both the React front-end and the Express backend.

| Architecture | Pros | Cons |
| --- | --- | --- |
| Separate Projects | Easier to set up. | Manage two projects and git repos. Must deploy to two separate hosts, **or**, copy over the front-end production code to the server project before each deployment. There will be cross-site configuration issues as well. |
| Single Project | A single codebase! | None |

The single, integrated project approach looks to be a no-brainer. But, what does the structure of a single project look like?

Again, two options:

1. Start with an Express app, then generate the React app within it (naming it `client` or something similar). This approach will result in nested **package.json** files and **node_modules** folders requiring you to "know where you are" when installing additional Node modules.
1. Start with a React app, then add an Express **server.js** and other server related folders/files as necessary. This approach results in a single **package.json** file and **node_modules** folder.

The second option is "cleaner". Plus, we already have react-mastermind eager to be made full-stack, so we'll opt for that approach...

## Building the React App's Production Code

If we want to be able to test locally how our full-stack application is going to run when deployed, we'll need to:

- Build the React app's code locally - this is called "production code"
- Configure Express to serve the production code

So, how do we make the `index.html` & React's JavaScript production-ready? 

Thankfully, the `create-react-app` CLI includes tooling and a **build** script in **package.json** that, when run, converts the the code in the `src` and `public` folders of the React project into production code.

Let's run it:

`$ npm run build`

> Note: npm requires us to use the `run` command for scripts other than `start` and `test`.
 
After building, examining our project's structure reveals a new **build** folder containing a production ready **index.html**, **static/css** & **static/js** folders, and other less important stuff.

This **build** folder of production-ready goodness is ready to be served up by an Express backend...

## Code the Express App

We're going to code our own Express app from scratch since we want our Express app to be within the existing React project & repo. Using `express-generator` would have created a nested folder containing another **package.json** - which we're trying to avoid.

In a MERN-stack app, the backend Express app only does two things:

1. Serves static assets, such as `index.html`, to the browser, and
2. Responds to AJAX requests from the React app running in the browser

The Express server will never access any of the source code for the **React project**.

It simply needs to deliver the **production-ready** `index.html`, which will in turn request the **production-ready** scripts, etc., that were built using `$ npm run build`.

> Note: The `build` folder is git ignored because we will configure `package.json` to make Heroku build the React app in the cloud.

#### Install the Modules for the Express Server

The full-stack architecture we decided on uses a single **package.json** file (the one that was created by `create-react-app`).

There's no problem with the Express project sharing that same **package.json**.

For now, we're only going to install a minimal number of modules for the Express app:

`$ npm i express morgan serve-favicon`

> Note: We don't need a view engine because our server will be either serving static assets (index.html, CSS, JS, images, etc.) or responding to AJAX requests with JSON. There will not be any *.ejs templates rendered - just a single static _index.html_ - this is truly a SPA!

In the lab, to add additional features such as database access, etc., you'll need to install additional modules like `mongoose`, `dotenv`, etc..

#### Create and Code the Express App (`server.js`)

Let's write our server:

1. Ensure that you're still in the root folder of the React project.

2. `$ touch server.js`.

3. At the top of **server.js**, let's do all the familiar stuff: `require` the modules; create the Express app; and mount the `morgan` logging and body parsing middleware:

	```js
	const express = require('express');
	const path = require('path');
	const favicon = require('serve-favicon');
	const logger = require('morgan');
	
	const app = express();
	
	app.use(logger('dev'));
	app.use(express.json());
	```

4. Mount and configure the `serve-favicon` & `static` middleware so that they serve from the **build** (production-ready) folder:

	```js
	app.use(express.json());
	
	// Configure both serve-favicon & static middlewares
	// to serve from the production 'build' folder
	app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
	app.use(express.static(path.join(__dirname, 'build')));
	```

5. A single "catch all" route is required for client-side routing to work properly:

	```js
	// Put API routes here, before the "catch all" route
	
	// The following "catch all" route (note the *)is necessary
	// for a SPA's client-side routing to properly work
	app.get('/*', function(req, res) {
	  res.sendFile(path.join(__dirname, 'build', 'index.html'));
	});
	```
	
	> Note: Since this route is a "catch all" that matches every `get` request, be sure to mount API or other routes before it!
	
	The "catch all" route is necessary to route to the proper client-side route when:
	- A user types a path into the address bar and presses enter.
	- The user refreshes the app.
	- A link is clicked in an external website, email, etc., that has its `href` set to our SPA's hostname.

	For example, if we slack the following link to a friend: `https://myapp.herokuapp.com/sales/dashboard`. The friend clicks on it, initiating an HTTP request to our server.
	
	However, the `/sales/dashboard` part of the URL is supposed to be for the client router - not the server!  But there it is, and the server has to deal with it...
	
	The server deals with it by, thanks to the "catch all" route, sending back  **index.html** - which is what we want.
	
	When **index.html** loads in the browser, and our SPA's router kicks into action, it will see the path of `/sales/dashboard` and route to the correct feature, just as if the link was clicked from within the SPA!

6. Set the port for development to use 3001 so that React's dev server can continue to use 3000 and finally, tell the Express app to listen for incoming requests:

	```js
	// Configure to use port 3001 instead of 3000 during
	// development to avoid collision with React's dev server
	const port = process.env.PORT || 3001;
	
	app.listen(port, function() {
	  console.log(`Express app running on port ${port}`)
	});
	```

#### Try It Out

Again, to develop a MERN-stack app, you'll need two terminal sessions:

1. For running the Express backend

2. For running React's dev server

##### Start the Express Backend

It's recommend that you start the Express backend first by typing<br>`$ nodemon server.js` or `$ nodemon server`

We can no longer just type `$ nodemon` because when we do, nodemon uses the `start` script in **package.json**, however, the `start` script is configured for React's dev server.

##### Checking out the PRODUCTION app

If we want to see how the app will behave when deployed, we need to:

- Ensure that the React app has been built locally using `$ npm run build`.

- Browse to `localhost:3001` because that's where our Express server is running - which again, we coded to serve from the **build** folder.

> **Important**: During development, you don't want to browse to `localhost:3001`! Instead, you want the browser to load the React app from React's dev server on `localhost:3000`. We are only browsing to `localhost:3001` to check out how the deployed app will run.

So, when you are hacking out code and nothing seems to be updating in the browser - be sure to verify that you are browsing `localhost:3000`!

##### Start React's Dev Server

Now that you've checked out the what the production code will look like when it's deployed, let's start up the development environment as usual:

```
$ npm start
```

#### Review

**When browsing to `localhost:3001`, what version of the app will you be viewing?**

**What command must we run in Terminal to update the production code?**

### <blink>IMPORTANT REMINDER - Backend Development</blink>

Just to be clear, the Express backend is fully configured and ready for additional backend functionality to be coded.

When the time comes, be sure to add folders such as `config`, `routes`, `models` & `controllers` to keep your backend code organized.

Additionally, in a SPA, the routes will be API-type routes, i.e., they should be namespaced using `/api` and respond with JSON, not EJS views. Refer to the **Producing an API in Express** lesson in week 5 / day 2 for details.

You will also want to refer to the Mongoose related lessons to refresh your recollection of how to define schemas and perform CRUD using Mongoose models.  Also, consider using async/await when working with Mongoose models this go around.

## Configure React for Full-stack Development

So far, so good, but there will be a problem **during development** (not production)...

Because the React app is being served from `localhost:3000`, that's where all AJAX calls made from the browser to the server will go.

For example, your React app might make fetch a request like `GET /api/posts`.  That path is automatically appended to the domain of origin, e.g., `localhost:3000`.

However, our Express server is listening for AJAX calls at `localhost:3001`!

Luckily, the React team has created an easy fix for this dilemma. The React development server allows us to configure a "proxy" which specifies the host to send API/AJAX calls to.

The fix is to add a `"proxy"` key anywhere in the top-level object of  **package.json**:

```js
...
  },
  "browserslist": [
    ">0.2%",
    "not dead",
    "not ie <= 11",
    "not op_mini all"
  ],
  "proxy": "http://localhost:3001"
}
```

Now **during development**, the SPA can make AJAX calls to the server, such as `fetch('/api/todos')`, and they will be sent to `localhost:3001` instead of `localhost:3000`.

Welcome to the MERN-stack!

## Deploying to Heroku

##### IMPORTANT: If your project is inside of an outer repo, you can't deploy it because you can't create a nested repo.  You'll need to move the project's folder outside of any existing repo before you can deploy.

You want to play Mastermind on your phone or have friends play it, right? Get it deployed! 

> It's recommended that you test the production app before deploying.  Again, do this by building the React app (`$ npm run build`) and browsing to `localhost:3001`.

With the MERN-stack app tested, we're **almost** ready to deploy to Heroku...

##### Add a `Procfile`

After the code has been uploaded using `git push heroku master`, Heroku checks to see if the project has a **Procfile** which specifies how to start up the application.

If no **Procfile** exists, Heroku will run the command assigned to the `start` script in **package.json**. Yes, we have a `start` script, but it's configured to start React's dev server instead of `node server.js`.

So yes, we need to create a **Procfile** (named exactly without a file extension):

- `$ touch Procfile`

Then, adding a single line inside **Procfile** takes care of informing Heroku how to boot our app:

```
web: node server.js
```

##### Update `package.json` to tell Heroku to Build the React App

The production-ready code that we tested out locally lives in the **build** folder. However, the **build** folder is git ignored and thus will not be pushed to Heroku.

The solution is to make Heroku run the build process immediately after it installs the node modules.

We do this by adding a `"heroku-postbuild": "npm run build"` entry inside of the `scripts` key in **package.json**:

```js
"scripts": {
  "start": "react-scripts start",
  "build": "react-scripts build",
  "test": "react-scripts test",
  "eject": "react-scripts eject",
  "heroku-postbuild": "npm run build"
},
```  

> Be sure to add a comma after the previous line.
 
Now Heroku will automatically run `npm run build` each time we deploy!

##### Create the App in your Heroku Account

Now let's use the Heroku CLI to create the project in your Heroku dashboard:

- `$ heroku create <optional_preferred_subdomain>`

The above command also creates a git remote named `heroku` that we push to in order to deploy.

Now you are set to deploy to Heroku:

1. Make a commit (if you haven't already): `$ git add -A && git commit -m "Deploy"`

2. Push to Heroku: `$ git push heroku master`

##### Set the Environment Variables on Heroku

The last step is to ensure that every KEY=VALUE pair in the `.env` file is set in the Heroku project.

No different than with the two previous projects deployed to Heroku. For each KEY=VALUE:

```
$ heroku config:set KEY=VALUE
```


##### Open the App

`$ heroku open` and now everyone can play the 1973 Game of the Year!

<img src="https://i.imgur.com/jyfJ4gy.png">

## Essential Questions

1. **What folder holds a React app's production-ready code?**

2. **Why does a "catch all" route need to be mounted in Express?** 

3. **True or False: API routes will need to be defined so that the React app can obtain data, create data in the database, etc.**

4. **True or False: The React app should use a "service" module to communicate with the backend's API routes via AJAX.**

