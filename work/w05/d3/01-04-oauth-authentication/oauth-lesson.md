[Click to View as a Presentation](https://presentations.generalassemb.ly/972a3081ab58ba943ae1436f0633633e#/1)


<link href="https://gist.githubusercontent.com/jim-clark/6919052ab15de680c120907d223c31b5/raw/9eedb5e3c01352b9ccda7264227f253be56a08b7/slide.css">

<p>Note: This lesson is not broken into distinct 1:15 modules. It is designed to be spread across the entire day...</p>

---
<img src="https://i.imgur.com/y42RtQC.jpg" width="600">

## OAuth Authentication<br>with<br>Express & Passport

---
## Learning Objectives
<br>

Students will be able to:

- Explain the difference between Authentication & Authorization
- Identify the advantages OAuth provides for users<br>and web apps
- Explain what happens when a user clicks<br>"Login with [OAuth Provider]"
- Add OAuth authentication to an Express app using PassportJS
- Use Middleware & PassportJS to provide authorization

---
## Roadmap
<br>

- Intro to Authentication
- Why OAuth?
- What is OAuth?
- How Does OAuth Work?
- Preview the App
- The App's User Stories
- Review the Starter Code
- Today's Game Plan (11 Steps)

---
## Intro to Authentication

---
#### Why We Need Authentication
<br>

- An application's functionality usually revolves around a particular user.

- For example, when we use online banking, or more importantly, save songs to our Spotify playlists, the application has to know who we are - and this is where **authentication** comes in.

---
#### What is Authentication?
<br>

- Authentication is what enables an appliction to know the **identity** of the person using it.

- In SEI, we're going to learn 3 types of **authentication**:
	- **Unit 2**: Logging in via a third-party provider - _OAuth_
	- **Unit 3**: Session-based username/password login
	- **Unit 4**: Token-based username/password login

---
#### Authentication vs. Authorization
<br>

- _Authentication_ and _authorization_ are not the same thing...

- **Authentication** verifies a user's identity.

- **Authorization** determines what functionality a given user can access. For example:
	- What features a logged in (authenticated) user has vs. an anonymous visitor?<br>- or -
	- What features an _admin_ user has vs. some other user _role_?

---
## Why OAuth?

---
#### Why OAuth?
<br>

- Consider applications where we have to sign up and log in using a username and a password...

- **What are the pitfalls of username/password authentication from a _user's_ perspective?**

---
#### Why OAuth?
<br>

<p style="text-align:left">Pitfalls from a user prospective:</p>

- Creating multiple logins requires you to remember and manage all of those login credentials.

- You will often use the same credentials across multiple sites, so if there's a security breach at one of the sites where you are a member, the hackers know that users often use the same credentials across all of their sites - oh snap!

- You are tempted to use simple/weak passwords so that you can remember all of them.

---
#### Why OAuth?
<br>

- **<p>What would be the pitfalls from a<br><em>business or developer's</em> perspective?</p>**
  
---
#### Why OAuth?
<br>

<p style="text-align:left">Pitfalls from a website or developer prospective:</p>

- Managing users' credentials requires carefully crafted security code written by highly-paid devs.

- Users (customers) are annoyed by having to create dedicated accounts, especially for entertainment or personal interest type websites.

- Managing credentials makes your business a target for hackers (internal and external) and that brings with it liability.

---
#### Why OAuth?
<br>

- The bottom-line is that the majority of users prefer to use OAuth instead of creating another set of credentials to use your site.

- When users are your customers, you want to make them as happy as possible!

- OAuth is hot, so let's use it!

---
## What is OAuth?

---
#### What is OAuth? - Vocab
<br>

- **OAuth provider**: A service company such as _Google_ that makes its OAuth authentication service available to third-party applications.

- **client application**: Our web application!  Remember, this is from an _OAuth provider's_ perspective.

- **owner**: A user of a service such as _Facebook_, _Google_, _Dropbox_, etc.

---
#### What is OAuth? - Vocab
<br>

- **resources**: An _owner's_ information on a service that **may** be exposed to _client applications_. For example, a user of Dropbox may allow access to their files.

- **access token**: An temporary key that provides access to an _owner's_ _resources_.

- **scope**: Determines what _resources_ and rights (read-only, update, etc) a particular _token_ has.

---
#### What is OAuth?
<br>

- OAuth is an open standard that provides **client applications** access to **resources** of a service such as Google with the permission of the resources' **owner**.

- There are numerous OAuth Providers including:
	- Facebook
	- Google
	- GitHub
	- Twitter
	- [Many more...](https://en.wikipedia.org/wiki/List_of_OAuth_providers)

---
## How Does OAuth Work?

---
#### OAuth 2's Flow

<img src="https://i.imgur.com/tAVrCLP.png" width="900">

---
#### How Does OAuth Work?
<br>

- The ultimate goal is for the _client application_ (our web app) to obtain an __access token__ from an OAuth provider that allows the app to access the user's resources from that provider's API's.

- Usually we only want to access to the most basic of resources the user could grant us - their **name**, **email** & maybe their **avatar**.

- However, it's possible to request access to resources such as a user's Facebook friends, tweets, Dropbox data, etc.

---
#### How Does OAuth Work?
<br>

- OAuth is **token** based.

- A token is a generated string of characters. 

- Once a user okays our web app's access, our web app receives a _code parameter_ that is then exchanged for an **access token**.

---
#### How Does OAuth Work?
<br>

- Each token has a **scope** that determines what resources an app can access for that user. Again, in this lesson, we will only be interested in accessing our users' basic profile info.

- If in your Project you would like to access more than a user's profile, you will need to modify the **scope** - be sure to check the specific provider's documentation on how to access additional resources.

---
#### How Does OAuth Work?
<br>

- <p>Yes, OAuth is complex. But not to worry, we don't have to know all of the nitty gritty details in order to take advantage of it in our apps.</p>

- Plus, we will be using a very popular piece of middleware that will handle most of the OAuth _dance_ for us.

---
#### OAuth Review Questions
<br>

- **True or false - if your site allows users to authenticate via OAuth, you should ensure they create a "strong" password.**

- **What are the advantages provided to users by OAuth?**

- **The advantages for web sites & developers?**

- **What is the _client application_ within the context of an OAuth provider?**

---
## Preview the App

---
#### The App We Will Build Today
<br>

- Today, we are going to take a starter application and add OAuth authentication & authorization to it.

- The app will allow you, as SEI Students, to list fun facts about yourself and read facts about fellow students, past and present.

- The app will add you as a student to its database when you log in for the first time using Google's OAuth service.

- Let's see what the finished app will look like.

---
## The App's User Stories

---
#### The App's User Stories
<br>

The following stories are COMPLETE in the starter code:

- **As a Visitor**:
	- I want to view fun facts about past and present SEI Students so that I can know more about them.
	- I want to be able to search for students by their name so that I don't have to scroll through a long list.
	- I want to sort the list of students by cohort or name so that I can more easily find the student I'm looking for.

---
#### The App's User Stories
<br>

We will complete these stories today:
 
- **As an Authenticated Student**:
	- I want to add fun facts about myself so that I can amuse others.
	- I want to be able to delete a fact about myself, in case I embarrass myself.
	- I want to view the Google avatar instead of the placeholder icon.

---
## Review the Starter Code

---
#### Set Up the Starter Code
<br>

- `cd` into the `starter-code/sei-students` folder.

- `npm install` to install the app's node modules.

- Open the project in your code editor.

- Create a `.env` file and add a key of `DATABASE_URL` and assign it a value provided by yours truly.

- `nodemon` and browse to `localhost:3000` to test.

---
#### Review the Starter Code
<br>

- The app was scaffolded using the `express-generator` and the main server script has been renamed to `server.js`.

- The app has only one server-side view **students/index.ejs**.

- The app uses the [_Materialize_ CSS framework](http://materializecss.com/) based upon [Google's Material Design](https://www.google.com/design/spec/material-design/introduction.html).

---
#### Review the Starter Code<br><small>Config</small>
<br>

- A `.env` file is being used to provide _environment_ variables such as the database's connection string.

- Environment variables allow configuration of an application's settings without changing the source code.

- `.env` files are never pushed to GitHub because they often hold sensitive access tokens, etc.

---
#### Review the Starter Code<br><small>Config</small>
<br>

- The _key=value_ pairs in `.env` are being _attached_ to Node's `process.env` object on line 7 of **server.js**.

- Then, on line 3 of **config/database.js**, the database is connecting to the value held by `process.env.DATABASE_URL`.

- Note that all environment variables listed in `.env` will need to be set on the server after the app has been deployed. 

---
#### Review the Starter Code<br><small>Database</small>
<br>

- Instead of using our own personal database, we are using a MongoDB hosted in the cloud so that we can see each other's fun facts!

- Early on in your project, you will want to use a hosted database as well - [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) is the goto cloud-based provider of MongoDB databases.

---
#### Review the Starter Code<br><small>Search Feature</small>
<br>

- Let's take a look at how the _search_ feature is implemented...

- In the **students/index.ejs** view, the `<form action="/students" method="GET">` element submits a _search_ to the server.

---
#### Review the Starter Code<br><small>Search Feature</small>
<br>

- When using `method="GET"` instead of `method="POST"`, an HTML form sends its data by appending it to the URL's query string.

- This means that on the server, the key:value pairs are on `req.query` vs. `req.body` (when `POST` is used).

---
#### Review the Starter Code<br><small>The View</small>
<br>

- Reviewing **students/index.ejs** shows that several [Materialize CSS](https://materializecss.com/about.html) classes are being used for layout and styling.

- EJS is being used to render a "card" for each student.

- EJS is also being used to initialize the values in the search form.

---
#### Review the Starter Code<br><small>Models</small>
<br>

- There is only a single `Student` Model exported by **models/student.js**.

- A `factSchema` is used to define the structure for the _fact_ subdocuments being _embedded_ within a _student_ document's `facts` property. 

- The `avatar` property has been defined in advance for implementing a user story as an exercise later today.

---
#### Review the Starter Code<br><small>Models</small>
<br>

- As you know, Mongoose schemas define the structure of documents, but only Models create collections in the database.

- A student's _facts_ is a perfect use case for embedding.

- Thanks to the `factSchema`, when we push a new fact into the `facts` array, all we do is provide the `text` field, and an `_id` will automatically be created in the subdocument for us.

---
#### Review the Starter Code<br><small>Routing</small>
<br>

- We have two separate route files: **routes/index.js** & **routes/students.js**.

- **routes/index.js** currently has only the root route defined that redirects to the app's main `index` view of students.

---
#### Review the Starter Code<br><small>Routing</small>
<br>

- **routes/students.js** has three routes defined for the following actions:

	| Purpose | Method | Path |
	|---|---|---|
	| Display all students | `GET` | `/students` |
	| Create a fact for a student | `POST` | `/facts` |
	| Delete a fact | `DELETE`| `/facts/:id` |

- **Why aren't we using `POST /students/:id/facts` to create a fact?**

---
#### Review the Starter Code<br><small>Controller</small>
<br>

- The `index` action in **controllers/students.js** is querying the `Student` model and providing the array of students to the **students/index.ejs** view.

- Review the comments and code to see how the `index` action does its job whether a _search_ has been submitted or not.

---
## Ready for Some OAuth?

---
#### Today's OAuth Game Plan
<br>

- **Step 1:** Register our App with Google's OAuth Server
- **Step 2:** Discuss PassportJS
- **Step 3:** Install & Configure Session middleware
- **Step 4:** Install PassportJS
- **Step 5:** Create a Passport config module
- **Step 6:** Install a Passport Strategy for OAuth
- **Step 7:** Configure Passport
- **Step 8:** Define routes for authentication
- **Step 9:** Add Login/Logout UI
- **Step 10:** Code the First User Story
- **Step 11:** Add Authorization

---
#### Step 1 - Register our App
<br>

- Every OAuth provider requires that our web app be registered with it.

- When we do so, we obtain a _Client ID_ and a _Client Secret_ that identifies **our application** to the OAuth provider.

- For this lesson, we are going to use Google's OAuth server - the details of how to do so are [here](https://developers.google.com/identity/protocols/OAuth2).

- Time to register our app...

---
#### Step 1.1 - Google Developers Console

- You must be logged into [Google Developers Console](https://console.developers.google.com):

<img src="https://i.imgur.com/HE95SsU.png">

---
#### Step 1.2 - Create a Project

- Click **Select a project**, then click the **New Project** button.

---
#### Step 1.2 - Create a Project

- Type in a **Project name**, then click the **Create** button:

<img src="https://i.imgur.com/u4A0oHs.png">

---
#### Step 1.3 - Enable Google+ API

- It might take a bit, but once created, make sure the project is selected, then click **ENABLE APIS AND SERVICES**:

<img src="https://i.imgur.com/o4FuFJj.png">

---
#### Step 1.3 - Enable Google+ API

- Search for **Google+** and click on **Google+ API** when it is visible:

<img src="https://i.imgur.com/jyPxYeX.png">

---
#### Step 1.3 - Enable Google+ API

- Click **ENABLE**:

<img src="https://i.imgur.com/9xDUi2k.png">

---
#### Step 1.4 - Obtain Credentials for App

- Now we need to create credentials for the app. Click **CREATE CREDENTIALS**:

<img src="https://i.imgur.com/r7Vreia.png">

---
#### Step 1.4 - Obtain Credentials for App

- We're interested in obtaining a **client ID** - click it:

<img src="https://i.imgur.com/UsSr3vq.png">

---
#### Step 1.4 - Obtain Credentials for App

- Click **Configure consent screen** to setup the screen users will see in order to obtain their consent:

<img src="https://i.imgur.com/DtyMe9F.png">

---
#### Step 1.4 - Obtain Credentials for App

- Just enter a **Project name** and click the blue **Save** button:

<img src="https://i.imgur.com/arp22UP.png">

---
#### Step 1.4 - Obtain Credentials for App
<br>

- The next slide shows what to do next.

- The important thing to note is that you will have to add an _**additional**_ entry in the **Authorized redirect URIs** once you have deployed your application to Heroku - something like `https://<your app name>.herokuapp.com/oauth2callback`.

---

<img src="https://i.imgur.com/EmEOHIk.png">

---
#### Step 1.4 - Obtain Credentials for App
<br>

- After clicking the _Save_ button, we will be presented with our app's credentials!

- Let's put **YOUR** credentials, along with that callback we provided, in our `.env` file so that it looks something like this:

```sh
DATABASE_URL=mongodb+srv://<user>:<pw>@sei-students-1btwt.azure.mongodb.net/students?retryWrites=true
GOOGLE_CLIENT_ID=245025414219-2r7f4bvh3t88s3shh6hhagrki0f6op8t.apps.googleusercontent.com
GOOGLE_SECRET=Yn9T_2BKzxr4zgprzKDGI5j3
GOOGLE_CALLBACK=http://localhost:3000/oauth2callback
```

---
#### Congrats on Registering the App
<br>

- With registering our app now completed, just remember that each provider will have its own unique process.

- Any questions about what we just did?

---
#### Step 2 - Passport Discussion
<br>

- Implementing OAuth is complex. There are redirects going on everywhere, access tokens that only last for a short time, refresh tokens used to obtain a fresh access token, etc.

- As usual, we will stand on the shoulders of giants that have done much of the heavy lifting for us - enter **PassportJS**.

- Passport is by far the most popular authentication framework out there for Express apps.

---
#### Step 2 - Passport Discussion
<br>

- [Passport's website](http://passportjs.org/) states that it provides _Simple, unobtrusive authentication for Node.js_.

- Basically this means that it handles much of the mundane tasks related to authentication for us, but leaves the details up to us, for example, not forcing us to configure our user model a certain way.

---
#### Step 2 - Passport Discussion
<br>

- There are numerous types of authentication, if Passport itself was designed to do them all, it would be ginormous!

- Instead, Passport uses **Strategies** designed to handle a given type of authentication. Think of them as plug-ins for Passport.

- Each Express app with Passport can use one or more of these strategies.

- [Passport's site](http://passportjs.org/) currently shows over 500 strategies available.

---
#### Step 2 - Passport Discussion
<br>

- OAuth, or more specifically, OAuth2, although a standard, can be implemented slightly differently by OAuth providers such as Facebook and Google.

- As such, there are strategies available for each flavor of OAuth provider.

- For this lesson, we will be using the [passport-google-oauth](https://github.com/jaredhanson/passport-google-oauth) strategy.

---
#### Step 2 - Passport Discussion
<br>

- **Passport is just middleware designed to authenticate requests**.

- When a request is sent from an authenticated user, Passport's middleware will automatically add a `user` object to the `req` object. 

- You will then be able to access that `req.user` object in all of our controller actions!

---
#### Step 3 - Session Middleware
<br>

- Before we install Passport and a strategy, we need to install the [`express-session`](https://github.com/expressjs/session?_ga=1.40272994.1784656250.1446759094) middleware.

- Sessions, are a server-side way of remembering a user's browser session.

- It remembers the browser session by setting a cookie that contains a _session id_. No other data is stored in the cookie, just the _id_ of the session.

---
#### Step 3 - Session Middleware
<br>

- On the server-side, the application can store data pertaining to the session.

- Passport will use the session, which is an in-memory data-store by default, to store a nugget of information that will allow us to lookup the user in the database.

- FYI, since sessions are maintained in memory by default, if the server restarts, session data will be lost. You will see this happen when _nodemon_ restarts the server and you are no longer logged in :)

---
#### Step 3.1 - Installing Session Middleware
<br>

- Let's install the module:

	```sh
	$ npm install express-session
	```

- Next, require it below the `logger`:

	```js
	var cookieParser = require('cookie-parser');
	// new code below
	var session = require('express-session');
	```

---
#### Step 3.2 - Configure and Mount Session Middleware

- Now, we can configure and mount the session middleware below the `cookieParser`:

	```js
	app.use(cookieParser());
	// new code below
	app.use(session({
	  secret: 'SEIRocks!',
	  resave: false,
	  saveUninitialized: true
	}));
	```

- The `secret` is used to digitally sign the session cookie making it very secure. You can change it to anything you want. Don't worry about the other two settings, they are only being set to suppress deprecation warnings.

---
#### Step 3.3 - Verifying Session Middleware
<br>

- `nodemon` to make sure your server is running.

- Browse to the app at `localhost:3000`.

- Open the _Resources_ tab in _DevTools_, then expand _Cookies_ in the menu on the left.

- A cookie named `connect.sid` confirms that the session middleware is doing its job.

---

#### Congrats, the session middleware is now in place!

#### Time for a few questions :)

---
#### Review Questions
<br>

- **Before a web app can use an OAuth provider, it must first ___________ with it to obtain a ___________ and a client secret.**

- **Passport uses ___________ designed to handle specific types of authentication.**

- **In your own words, explain what a _session_ is.**

- **If there is an authenticated user, the request (`req`) object will have what attached to it by Passport?**

---
#### Step 4 - Install Passport
<br>

- The Passport middleware is easy to install, but challenging to set up correctly.

- First the easy part:

	```sh
	$ npm install passport
	```

- Require it as usual below `express-session`:

	```js
	var session = require('express-session');
	// new code below
	var passport = require('passport');
	```

---
#### Step 4.1 - Mount Passport
<br>

- With Passport required, we need to mount it. Be sure to mount it **after** the session middleware and always **before** any of your routes are mounted that would need access to the current user:

	```js
	// app.use(session({... code above
	app.use(passport.initialize());
	app.use(passport.session());
	```
	
- The way `passport` middleware is being mounted is straight from the docs.

---
#### Step 5 - Create a Passport Config Module
<br>

- Because it takes a significant amount of code to configure Passport, we will create a separate module so that we don't pollute **server.js**.

- Let's create the file:

	```sh
	$ touch config/passport.js
	```

- In case you're wondering, although the module is named the same as the `passport` module we've already required, it won't cause a problem because a module's full path uniquely identifies it to Node.

---
#### Step 5.1 - Passport Module's Exports Code 

- Our `config/passport` module is not middleware.

- Its code will basically configure Passport and be done with it. We're not going to export anything either.

- Requiring below our database is as good of a place as any in **server.js**:

	```js
	require('./config/database');
	// new code below
	require('./config/passport');
	```

---
#### Step 5.2 - Require Passport 
<br>

- In the **config/passport.js** module we will certainly need access to the `passport` module:

	```js
	var passport = require('passport');
	```

- This `require` returns the very same `passport` object that was required in **server.js** - Node modules are _singletons_.

---
#### Step 6 - Install the OAuth Strategy
<br>

- Time to install the strategy that will implement Google's flavor of OAuth:

	```sh
	$ npm install passport-google-oauth20
	```

- This module implements Google's OAuth 2.0 API. [It's docs can be found here.](https://github.com/jaredhanson/passport-google-oauth2)

- Note that _OAuth 1.0_ does still exist here and there, but it's pretty much obsolete.

---
#### Step 6.1 - Require the OAuth Strategy
<br>

- Now let's require the `passport-google-oauth20` module below that of `passport` in **config/passport.js**:

	```js
	var passport = require('passport');
	// new code below
	var GoogleStrategy = require('passport-google-oauth20').Strategy;
	```

- Note that the variable is named using upper-camel-case.<br>**What does that typically hint at?**

- Let's make sure there's no errors before moving on to the fun stuff!

--- 
#### Step 7 - Configuring Passport

<p style="text-align:left">To configure Passport we will:</p>

1. Call the `passport.use` method to plug-in an instance of the OAuth strategy and provide a _verify_ callback function that will be called whenever a user has logged in using OAuth.

2. Define a _serializeUser_  method that Passport will call after the _verify_ callback to let Passport know what data we want to store in the session to identify our user.

3. Define a _deserializeUser_ method that Passport will be called on each request when a user is logged in. What we return will be assigned to the `req.user` object.

--- 
#### Step 7.1 - <span style="text-transform:lowercase">passport.use</span>

- <p>Now it's time to call the `passport.use` method to plug-in an instance of the OAuth strategy and provide a _verify_ callback function that will be called whenever a user logs in with OAuth. In _passport.js_:</p>

```js
var GoogleStrategy = require('passport-google-oauth20').Strategy;
// new code below
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
  },
  function(accessToken, refreshToken, profile, cb) {
    // a user has logged in with OAuth...
  }
));
```

---
#### Step 7.1 - <span style="text-transform:lowercase">passport.use</span>
<br>

- Note the settings from the `.env` file being passed to the `GoogleStrategy` constructor function.<br>**What is the name of the module we've been using that loads the settings from the `.env` file?**

- Next we have to code the _verify_ callback function...

--- 
#### Step 7.2 - The <em>Verfiy</em> Callback
<br>

- The callback will be called by Passport when a user has logged in with OAuth.

- It's called a _verify_ callback because with most other strategies we would have to verify the credentials, but with OAuth, well, there are no credentials!

- In this callback we must:
	- Fetch the user from the database and provide them back to Passport by calling the `cb` callback method, or...
	- If the user does not exist, we have a new user! We will add them to the database and pass along this new user in the `cb` callback method.

---
#### Step 7.2 - The <em>Verfiy</em> Callback
<br>

- But wait, how can we tell what user to lookup?

- Looking at the callback's signature:

	```js
	function(accessToken, refreshToken, profile, cb) {
	```
	
- We can see that we are being provided the user's _profile_ - this object is the key. It will contain the user's _Google Id_.
	
- However, in order to find a user in our database by their _Google Id_, we're going to need to add a field to our `Student` model's schema to hold it...

---
#### Step 7.3 - Modify the <em>Student</em> Model

- Let's add a property for `googleId` to our `studentSchema` inside `models/student.js` file:

	```js
	var studentSchema = new mongoose.Schema({
	  name: String,
	  email: String,
	  cohort: String,
	  avatar: String,
	  facts: [factSchema],
	  googleId: String
	}, {
	  timestamps: true
	});
	```

- Cool, now when we get a new user via OAuth, we can use the Google `profile` object's info to create our new user!

---
#### Step 7.4 - Callback Code
<br>

- Now we need to code our callback!

- We're going to need access to our `Student` model:

	```js
	var GoogleStrategy = require('passport-google-oauth20').Strategy;
	// new code below
	var Student = require('../models/student');
	```

- Let's do another error check by ensuring our server is running and we can refresh our app.

- Cool, the next slide contains the entire `passport.use` method.<br>We'll review the _verify_ function as we type it in...

---

```js
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
  },
  function(accessToken, refreshToken, profile, cb) {
    Student.findOne({ 'googleId': profile.id }, function(err, student) {
      if (err) return cb(err);
      if (student) {
        return cb(null, student);
      } else {
        // we have a new student via OAuth!
        var newStudent = new Student({
          name: profile.displayName,
          email: profile.emails[0].value,
          googleId: profile.id
        });
        newStudent.save(function(err) {
          if (err) return cb(err);
          return cb(null, newStudent);
        });
      }
    });
  }
));
```

---
#### Step 7.5 - <span style="text-transform:lowercase">de/serialize</span>U<span style="text-transform:lowercase">ser</span> Methods
<br>

- Our `passport.use` method has been coded. Now we need to write two more methods inside of `config/passport` module.

- First the callback method we just created is called when a user logs in, then the `passport.serializeUser` method is called in order to set up the session.

- The `passport.deserializeUser` method is called everytime a request comes in from an existing logged in user - it is this method where we return what we want passport to assign to the `req.user` object.

---
#### Step 7.5 - <span style="text-transform:lowercase">serialize</span>U<span style="text-transform:lowercase">ser</span> Method
<br>

- First up is the `passport.serializeUser` method that's used to give Passport the nugget of data to put into the _session_ for this authenticated user. Put this below the `passport.use` method:

	```js
	passport.serializeUser(function(student, done) {
	    done(null, student.id);
	});
	```

- Passport gives us a full user object when the user logs in, and we give it back the tidbit to stick in the session.

- Again, this is done for server scalability and performance reasons - a lot of session data sucks.

---
#### Step 7.6 - <span style="text-transform:lowercase">deserialize</span>U<span style="text-transform:lowercase">ser</span> Method

- The `passport.deserializeUser` method is used to provide Passport with the user from the db we want assigned to the `req.user` object. Put it below the `passport.serializeUser` method:

	```js
	passport.deserializeUser(function(id, done) {
	  Student.findById(id, function(err, student) {
	    done(err, student);
	  });
	});
	```
	
- Passport gave us the `id` from the session and we use it to fetch the student to assign to `req.user`.

- Let's do another error check.

---
#### Step 8 - Define Routes for Authentication
<br>

- Our app will provide a link for the user to click to login with Google OAuth. This will require a route on our server to handle this request.

- Also, we will need to define the route,<br>`/oauth2callback`<br> we told Google to call on our server after the user confirms or denies their OAuth login.

- Lastly, we will need a route for the user to logout.

---
#### Step 8.1 - <span style="text-transform:lowercase">routes/index</span> Module
<br>

- We're going to code these three new auth related routes in our `routes/index` module.

- These new routes will need to access the `passport` module, so let's require it in **routes/index.js**:

	```js
	var router = require('express').Router();
	// new code below
	var passport = require('passport');
	```

---
#### Step 8.2 - Login Route

- In **routes/index.js**, let's add our login route below our root route:

	```js
	// Google OAuth login route
	router.get('/auth/google', passport.authenticate(
	  'google',
	  { scope: ['profile', 'email'] }
	));
	``` 

- The `passport.authenticate` function will take care of coordinating with Google's OAuth server.

- The user will be presented the consent screen if they have not previously consented.

- Then Google will call our Google callback route...

---
#### Step 8.2 - Login Route
<br>

- Note that we are specifying that we want passport to use the `google` strategy. Remember, we could have more than one strategy in use.

- We are also specifying the _scope_ that we want access to, in this case, `['profile', 'email']`.

---
#### Step 8.3 - Google Callback Route
<br>

- Below our login route we just added, let's add the callback route that Google will call after the user confirms:

	```js
	// Google OAuth callback route
	router.get('/oauth2callback', passport.authenticate(
	  'google',
	  {
	    successRedirect : '/students',
	    failureRedirect : '/students'
	  }
	));
	```

- Note that we can specify the redirects for a successful and unsuccessful login. For this app, we will redirect to the root route in both cases.

---
#### Step 8.4 - Logout Route
<br>

- The last route to add is the route that will logout our user:

	```js
	// OAuth logout route
	router.get('/logout', function(req, res){
	  req.logout();
	  res.redirect('/students');
	});
	```
	
- Note that the `logout()` method was automatically added to the request (`req`) object by Passport!

- Good time to do another error check.

---
#### Step 9 - Add Login/Logout UI
<br>

- We want the nav bar in **students/index.ejs** to update dynamically depending upon whether there's an authenticated user or not:

	<img src="https://i.imgur.com/zr4if8Y.png">
	<br>**vs**<br>
	<img src="https://i.imgur.com/CXKo29Z.png">

---
#### Step 9 - Add Login/Logout UI

- Let's update the `index` action in **controllers/students.js** to pass in `req.user` :

	```js
	function index(req, res, next) {
	  ...
	    res.render('students/index', {
	      students,
	      user: req.user,
	      name: req.query.name,
	      sortKey
	    });
	  });
	}
	```

- Now the logged in student is in a `user` variable that's available inside of **students/index.ejs**. If nobody is logged in, `user` will be `undefined` (falsey).

---
#### Step 9.1 - Add the Login / Logout UI Logic
<br>

- We're going to need a link for the user to click to login/out.<br>Let's modify **students/index.ejs** as follows:

	```html
	<a href="" class="brand-logo left">SEI Student Fun Facts</a>
	<!-- new html below -->
	<ul class="right">
		<li>
		<% if (user) { %>
			<a href="/logout"><i class="material-icons left">trending_flat</i>Log Out</a>
		<% } else { %>
			<a href="/auth/google"><i class="material-icons left">vpn_key</i>Login with Google</a>
		<% } %>
		</li>
	</ul>
	```

---

#### Step 9 - Try Logging In!
<br>

- We've finally got to the point where you can test out our app's authentication!

- May the force be with us!

---

#### Step 10 - Code the First User Story
<br>

- Our first user story reads:<br>_I want to add fun facts about myself so that I can amuse others._

- We're going to need a `<form>` with an `<input>` for the fact's text and a submit button.

- However, we **only** want this UI to show within the logged in student's card only.

---

#### Step 10.1 - Add Dynamic UI

- Let's add some dynamic UI to add a fact. Ensure it's added in the correct location!

	```html
	    <li class="collection-item blue-grey-text text-darken-2"><%- fact.text %></li>
	  <% }) %>
	</ul>
	<!-- new code below -->
	<% if (student._id.equals(user && user._id)) { %>
	  <div class="card-action">
	    <form action="/facts" method="POST">
	      <input type="text" name="text" class="white-text">
	      <button type="submit" class="btn white-text">Add Fact</button>
	    </form>
	  </div>
	<% } %>
	```

- Note how the `equals` method is being used to compare the `_id`s - this is necessary because they are objects. Also, the `(user && user._id)` prevents an error when there's no `user` logged in.

---
#### Step 10.2 - Controller Code
<br>

- Lastly, let's code the `addFact` action in the **controllers/students.js** controller:

	```js
	function addFact(req, res, next) {
	  req.user.facts.push(req.body);
	  req.user.save(function(err) {
	    res.redirect('/students');
	  });
	}
	```

- Note that `req.user` IS a Mongoose _user_ document!

---

#### Step 10 - Code the First User Story
<br>

- That should take care of our first user story - try it out!

- Yes, the UX is not that great because of the full-page refresh, but we'll address that when we develop single-page apps with React.

- Cool, just one step left!

---

#### Step 11 - Authorization
<br>

- **What is _authorization_?**

- Passport adds a nice method to the request object, `req.isAuthenticated()` that returns `true` or `false` depending upon whether there's a logged in user or not.

- We're going to write our own little middleware function to take advantage of `req.isAuthenticated()` to perform some authorization.

---
#### Step 11.1 - Authorization Middleware
<br>

- As we know by now, Express's middleware and routing is extremely flexible and powerful.

- We can actually **insert** additional middleware functions before a route's final middleware function!  Let's modify **routes/students.js** to see this in action:

	```js
  	router.post('/facts', isLoggedIn, studentsCtrl.addFact);
	```

- Take note of the inserted `isLoggedIn` middleware function!

---
#### Step 11.2 - Authorization Middleware
<br>

- Our custom `isLoggedIn` middleware function, like all middleware, will either call `next()`, or respond to the request.

- Let's put our new middleware at the very bottom of<br>**routes/students.js** - just above the `module.exports`:

	```js
	// Insert this middleware for routes that require a logged in user
	function isLoggedIn(req, res, next) {
	  if ( req.isAuthenticated() ) return next();
	  res.redirect('/auth/google');
	}
	```

- That's all there is to it!

---
## Congrats!

### You have implemented<br>OAuth authentication<br>and authorization!

---
### Practice Exercises
<br>

- Now you're ready to start your project by implementing OAuth authentication!

- For some challenging practice, complete the remaining three _user stories_:
	- I want to show the user's Google avatar instead of the current icon.
	- I want to be able to delete a fact about myself, in case I make a mistake.

---
### References
<br>

- [Google OAuth2](https://developers.google.com/identity/protocols/OAuth2)

- [Mongoose](http://mongoosejs.com/)

- [Materialize CSS](http://materializecss.com/)
