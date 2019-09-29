<img src="https://i.imgur.com/fx2orT2.png">

# Token-based Auth with React & JWTs
---

## Learning Objectives

| Students Will Be Able To: |
| --- |
| Explain the use case of token authentication |
| Encode/decode a JSON Web Token (JWT) |
| Configure an Express app to provide JWTs |
| Persist a JWT on the client |
| Send a JWT with each request |
| Verify a JWT on the server |
| Protect "private" client-side routes |
| Protect "private" server routes with middleware |

## Roadmap

#### Token-based Authentication:

- Review of session-based authentication
- What's a JSON Web Token (JWT)?
- Flow of token-based authentication
- Advantages of JWT-based authentication

#### Review the Starter App:

- Set up the code
- Review the code

#### Steps to Implement Token-based Authentication & Authorization:

1. Refactor the server to hash the password when a user signs up. 
2. Refactor the server to provide a JWT when a user signs up.
3. Persist the token (JWT) on the client.
4. Update the `<App>` component's state to hold the authenticated user's info.
5. Refactor the `<NavBar>`'s display based on auth status.
6. Implement Log Out functionality.
7. Update the `user` in `<App>`'s state when signing up.
8. Implement Log In functionality.
9. Provide the token when making AJAX requests.
10. Verify JWTs sent by the client and add the `user` to the Express `request` object.
11. Implement authorization: Protect the `/high-scores` client-side route.
12. Implement authorization: Protect server-side routes with custom middleware.

#### Essential Questions & Lab

## Token-based Authentication

### Review of Session-based Authentication

Before we talk about token-based authentication, let's review one of the types of auth that you've already used, session-based authentication.

<img src="https://i.imgur.com/TZoeAVv.png" width="900">

### What's a JSON Web Token (JWT)?

A _JSON Web Token_ is a single encoded (not encrypted) string that plays the role of a "token".

The key points about a JWT are:

- The token can contain whatever custom data (called _claims_) we want to put in it.
- The token is cryptographically _signed_ by the server when it is created so that if the token is changed in any way, it is considered invalid.
- The token is _encoded_, but **not encrypted**.  It is encoded using a standard known as _base64url encoding_ so that it can be easily serialized across the internet or even be included in a URL's _querystring_. It's easy to look at **encoded** data and think that its content cannot be read - this is not the case, as you'll soon see.

Here is how a JWT is structured:

<img src="https://i.imgur.com/8J6Rhx9.jpg">

There is a great website dedicated to JWTs that explains in detail their format as well as has the ability to create them:  [https://jwt.io/](https://jwt.io/)

Allow me to take a JWT from the website and demonstrate the fact that the token can be easily decoded in the browser's console:

```js
> var jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ';
> var payload = jwt.split('.')[1]  // only interested in the payload (claims)
> window.atob(payload)
< "{"sub":"1234567890","name":"John Doe","admin":true}"
```
> The `atob()` method decodes a base-64 encoded string and `btoa()` base-64 encodes data.

Okay, JWTs are cool, how does the client get one; and how do we use them?

### Flow of Token-based Authentication

<img src="https://i.imgur.com/3quZxs4.png">

The diagram above shows that the client app:

1. Attempts to log in a user by sending an HTTP POST request, sending along the user's credentials.
2. The server will, if the creds check out, generate a JWT and send it back to the client. It may be sent back as JSON, or in a header (usually named **Token**).
3. Not shown on the diagram, but important, is the fact that the token needs to be persisted somewhere on the client. In a web app, the token is typically persisted in `localStorage`.
4. The reason a client needs to persist a token is that now, whenever the client makes a request, it can send along the token in the HTTP request, either as a querystring, in the request's body, or, as a best practice, in a header named `Authorization`.
5. The server will then validate the token and respond to the request.

What are some advantages of token-based vs. session-based auth...

### Advantages of JWT-based Authentication

Here's a graphic contrasting sessions and tokens:

<img src="https://i.imgur.com/HlzMMRq.jpg" width="900">

Sessions are stateful on the server - they have to be maintained in a server's memory or a database.  The more active users there are, the more sessions there are to keep track of. High-volume websites require multiple servers and would therefore require special software to manage the sessions.

The key to token-based authentication is that it's **stateless**, meaning there is no _state_ being stored on the server regarding the session/login.

A JSON web token is self-contained, it can itself contain the user's identity, etc. There's no need to fetch the user from a database with each request on the server (an expensive operation). You will only have to query the database for the user if you need to modify the user or obtain additional information from the user document that is not included in the JWT.

The stateless nature of token-based auth allows the implementation of single sign-on (SSO) - where the same token can be used to access several different applications, for example, Google Mail, Google Docs, etc.

When making an HTTP request, a token can be sent in an HTTP header (or even the HTTP body). They don't have to be sent in a cookie, which are implemented by web browsers. Thus, you can use token-based authentication without a web browser - great news for _native mobile apps_.

## Review the Starter Code

The starter code is the full-stack Mastermind app with some minor additions to aid our authentication implementation.

#### Set Up

As usual, you will need to `$ npm install` to install the dependencies.

Next, do `$ npm run build` so that the server can boot up without errors (it needs a favicon in the build folder).

Also, there is a `config/database.js` module that connects to a hosted MongoDB. The `DATABASE_URL` is stored in a a **.env** file, which you will need to create because they are git ignored. I will provide the connection string or you can use your own.

#### Review the Code

Here are a few of the highlights of the starter code:

**SERVER CODE**

- The `dotenv` module has been installed and required in **server.js**.

- We are connecting to a MongoDB using a **config/database.js** module as usual.

- There is a simple `User` model defined in **models/user.js**.

- API Routes for `User` are defined in **routes/api/users.js** (just one for now).

- There is a **controllers/users.js** module that at this point, only has a `signup` method for creating user models when they sign up. 

	Currently, the method returns the JSON of the created user, however, we will soon refactor this to return a JWT.

- There is a `Score` model and a  **controllers/scores.js** module with `create` and `highScores` methods.

	Later in the lesson, we will make these "protected" routes that require a user to be logged in.
	
	Note that the `highScores` method returns only 20 high scores by default, however, it's designed to accept a `limit` query parameter to override the default of 20. 

**CLIENT CODE**

- Client-side routes and components have been defined for:
	- `/signup`: Shows the `<SignupPage>` component.
	- `/login`: Shows the `<LoginPage>` component.
	- `/high-scores`: Shows the `<HighScoresPage>` component. Again, later in this lesson we will learn how how to make this a "protected" route that allows only authenticated users to access it.

- A `<NavBar>` component has been created and added that currently has `<Link>`s to the `/signup` and `/login` routes. It's only rendered in `<GamePage>`.

- `<LoginPage>` displays a `<form>` with **controlled** `<input>`s. 

	**What are "controlled" inputs and how do they differ from "uncontrolled" inputs?**
	
	There's a `handleSubmit` method defined, but all it does right now is call `preventDefault`. Plus, we need to code the `handleChange` method later.

- `<SignupPage>` displays a `<SignupForm>` that is working!

	Submitting the form adds a user to the database, via the `userService.signup` method.
	
	Note how the `Sign Up` button is disabled using a custom `isFormInvalid` method.
	
	After a user signs up, we want to switch to the root route, thus inside of `handleSignup` we are **programmatically** changing the route using `this.props.history.push('/')`. Where did the `history` prop come from? Well, each `<Route>` component has the `history` object as a prop. Check the `<SignupPage>` route in **App.js** to see how `history` is being destructured and passed in to the `<SignupPage>`. This is an alternative to passing all of the `<Route>` component's props via `{...props}` as being done on a couple of other routes.

- `<App>` is initializing `scores` to be an empty array within the `constructor`.

	Upon mounting, `<App>` makes an AJAX call within `componentDidMount` to fetch the scores.

	Although the scores are going to be returned by the server almost instantly, we're still initializing `state.scores` to be an empty array - **always do this**.

- There is a **utils/userService.js** "service" module that provides user related functionality. It can be imported by any component that needs to perform anything user related, including signing up, logging in and logging out.

	Currently, it has a working `signup` method.

## Implement Token-based Authentication & Authorization

Implementing token-based auth will require plenty of code in both the Express server app and the React client app.

There's lots to do, so let's get going!

### Step 1: Refactor the server to hash the password when a user signs up

Currently, when a user signs up, the password is being stored in the database as cleartext (plain text) - not good!

Let's fix this security flaw by refactoring the server to salt and hash the users' password.

Open up **models/user.js**.

We're already using Mongoose's `set` method on the schema to ensure that a user's password is not included when serialized to JSON (sent to the browser).

Now we will take advantage of Mongoose middleware to salt and hash the password whenever a user instance is being saved **and** the password has changed (including when a user is being created for the first time).

To perform the actual salting and hashing, we will use the ever so popular **bcrypt** library - let's install and save it as a dependency:

`$ npm install bcrypt`

First, bring in **bcrypt**:

```js
// models/user.js

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
```

**bcrypt** has a setting that tells it how many times to randomize the generation of salt. Let's add a constant in the module to set it - usually 6 is enough:

```js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 6;
```

Now for the middleware. We will be writing a function that runs before a user is saved. This is called **pre** middleware, also known as a "hook".

Type in this skeleton just above the `module.exports`:

```js
userSchema.pre('save', function(next) {
  // this will be set to the current document
  const user = this;

});
```

Note that we are assigning `this` (the user document being saved) to a variable. The reason is that we will need to access this user doc from within the `bcrypt.hash()` method's callback (see code below). **What is another option we have at our disposal to solve this problem?**

Now let's add the code that checks if the password for this user document has been changed, and if so, salt & hash it, then assign the hash to password, replacing the cleartext version:

```js
userSchema.pre('save', function(next) {
  const user = this;
  if (!user.isModified('password')) return next();
  // password has been changed - salt and hash it
  bcrypt.hash(user.password, SALT_ROUNDS, function(err, hash) {
    if (err) return next(err);
    // replace the user provided password with the hash
    user.password = hash;
    next();
  });
});
```

Let's check our code by signing up a new user and using the Mongo Shell to check that the password has been hashed:

```
$ mongo mongodb://<user>:<pw>@ds064799.mlab.com:64799/mastermind
> use mastermind
> db.users.find({})
```

The user's password should be hashed!

Done with Step 1, on to Step 2...

### Step 2: Refactor the server to provide a JWT when a user signs up.

The starter code was set up to temporarily return the new user document when a user signs up, however, we need to return a JWT instead - thus, auto-logging in when a user signs up.

First, we're going to need to install the Node module that can create and verify JWTs.

[https://jwt.io](https://jwt.io) lists libraries available for your programming language of choice.

Let's install the one for Node apps:

`$ npm install jsonwebtoken`

> Note: There are additional modules available to help implement JWTs in Express apps. However, it does not take much code to do what needs to be done and at SEI, we want to give you your money's worth :)

With **jsonwebtoken** installed, **controllers/users.js** is where we're going to use it:

```js
// controllers/users.js

const User = require('../models/user');
const jwt = require('jsonwebtoken');
```

Creating a JWT requires a "secret" string used for "signing" the JWT. Let's define one in our **.env** file:

```
DATABASE_URL=mongodb://<user>:<pw>@ds064799.mlab.com:64799/mastermind
SECRET=SEIRocks!
```

Let's create a shortcut variable in our controller to hold the SECRET:

```js
const User = require('../models/user');
const jwt = require('jsonwebtoken');
// Add the SECRET
const SECRET = process.env.SECRET;
```

The **jsonwebtoken** library has a `sign` method that creates JWTs. Let's add a `createJWT` helper function at the bottom of **controllers/users.js** that we can use both when a user signs up and when they log in:

```js
/*----- Helper Functions -----*/

function createJWT(user) {
  return jwt.sign(
    {user}, // data payload
    SECRET,
    {expiresIn: '24h'}
  );
}
```

> Note: There are several ways to specify the expiration of the JWT. Check [the docs](https://www.npmjs.com/package/jsonwebtoken) for more info.

Now let's refactor the `signup` method to return a JWT:

```js
async function signup(req, res) {
  const user = new User(req.body);
  try {
    await user.save();
    const token = createJWT(user);
    res.json({ token });
  } catch (err) {
    // Probably a duplicate email
    res.status(400).json(err);
  }
}
```

The `signup` method is transporting the token string to the client within an object (assigned to a key named `token`). Keep this in mind because we'll need to refactor **userService.js** on the client to extract only the token string.

Open up the Network tab in Chrome's DevTools, clear the requests, and then sign up another user to verify that a token is being returned.

Moving on to Step 3...

### Step 3: Persist the token (JWT) in the client

As discussed, token-based authentication requires the client to send the token when making a request to a server's API. To pull this off, we're going to have to persist it somewhere in the browser...

`localStorage` is typically where web apps persist data in the browser.

> Note: Data saved in `localStorage` is persisted by domain until removed. If you want to save data for only the duration of the browser session, use `sessionStorage` instead.

Keeping the token string stored in `localStorage` allows users to remain logged in until the token expires. We will be logged in, even if we close the browser and come back tomorrow! However, you get to determine how long the token is good for when you generate it on the server.

We'll keep all token related code in it's own utility module, but first, let's do that quick refactor to **userService.js** I mentioned a bit ago...

#### Refactor the `signup` method in **userService.js**

Again, we only want to store the token **string** in `localStorage`, however, the token string is received by the client within an object.

Here's a small refactor to the last line of the `signup` method:

```js
function signup(user) {
  return fetch(BASE_URL + 'signup', {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify(user)
  })
  .then(res => {
    if (res.ok) return res.json();
    throw new Error('Email already taken!');
  })
  // Parameter destructuring!
  .then(({token}) => token);
  // the above could have been written as
  //.then((token) => token.token);
}
```

This funky syntax, `.then(({token}) => ...`, is object parameter destructuring! Only array destructuring was part of ES2015, however most browsers can now destructure objects as well.

#### Creating the `tokenService` utility module

Just like with the `userService` module, we're going to follow the single-responsibility principle by putting token related methods in a module for:

- Storing, retrieving and removing tokens from `localStorage`
- Verifying that a token has not expired and removing it from storage if it has.
- Extracting the data payload (the user's info).

Let's create a file for our token service:

`$ touch src/utils/tokenService.js`

Just a `setToken` method for now:

```js
function setToken(token) {
  if (token) {
    localStorage.setItem('token', token);
  } else {
    localStorage.removeItem('token');
  } 
}

export default {
  setToken
};
```

We'll add other methods in a bit, but for now, this is all we need to persist the token...

#### Persisting the token to `localStorage`

Now let's refactor the `signup` method in **userService.js** to use the `setToken` method we just created.

First, we need to import **tokenService.js**:

```js
// utils/userService.js

import tokenService from './tokenService';

// existing code below
const BASE_URL = '/api/users/';
```

Now, the refactor of `signup`:

```js
function signup(user) {
	...
  // update the last 'then' to this...
  .then(({ token }) => {
    tokenService.setToken(token);
  });
}

```

Now sign up another user and go to **Local Storage** within the **Application** tab of DevTools. Verify that the token is in `localStorage` stored as a string.

> For fun, decode the payload portion of the token string.

Nice, Step 3 is done!

### Step 4: Update the `<App>` component's state to hold the authenticated user's info

We will want to keep a `user` object in the `<App>` component's `state` so that it can be passed via props to components that need to be aware of the logged in user, such as `<NavBar>`.

If there is no user logged in, we will set the `user` property on the `state` object to `null`.

#### Add a `getUser` method to the `userService`

Anytime the app is loaded or refreshed, we're going to want to check to see if there's a valid token in `localStorage` and "log in" that user automatically.

In addition, apps from time-to-time, will need to obtain the logged in user's info or check if there is a user logged in. A method for this purpose in `userService` would make sense.

Let's add a `getUser` method to **userService.js**:

```js
function getUser() {
  return tokenService.getUserFromToken();
}

// Be sure to add getUser to the export
export default {
  signup,
  getUser
}
```

As you can see, again we want to delegate dealing with tokens to a `getUserFromToken` function inside of `tokenService`.

First, let's write a `getToken` method that retrieves and verifies that the token has not expired; and if it has expired, remove it!

In **tokenService.js**:

```js
function getToken() {
  let token = localStorage.getItem('token');
  if (token) {
    // Check if expired, remove if it is
    const payload = JSON.parse(atob(token.split('.')[1]));
    // JWT's exp is expressed in seconds, not milliseconds, so convert
    if (payload.exp < Date.now() / 1000) {
      localStorage.removeItem('token');
      token = null;
    }
  }
  return token;
}
```

> Note: We needed to divide Date.now() by 1000. This is because the JWT spec says the `exp` claim should be in Unix time - Unix Time is the number of seconds since the Unix epoch (Jan 1, 1970). However, JS returns the number of milliseconds (not seconds) since the Unix epoch. We therefore must divide by 1000 to convert milliseconds to seconds.

Next, let's code the `getUserFromToken` method that decodes the token, then extracts and returns the `user` object:

```js
function getUserFromToken () {
  const token = getToken();
  return token ? JSON.parse(atob(token.split('.')[1])).user : null;
}

export default {
  setToken,
  getToken,
  getUserFromToken
};
```

Be sure to update the `export default` as shown above as well.

#### Add `user` to `<App>`'s state

Time to add a `user` property to `<App>`'s state.

First, import the `userService` in **App.js**:

```js
import userService from '../../utils/userService';
```

Since adding a `user` to state from a token in localStorage is not an asynchronous process, we can do it in the constructor:

```js
this.state = {
  ...this.getInitialState(),
  difficulty: 'Easy',
  scores: [],
  // Initialize user if there's a token, otherwise null
  user: userService.getUser()
};
```

The last user we signed up should now be in the state of `<App>`. Use the React DevTool to check it out!

### Step 5: Refactor the `<NavBar>`'s display based on auth status

Just like in the other two authentication lessons, we want the navigation links to render according to whether there is a user logged in or not:

- **Logged in:** Display a greeting and a **Log Out** link.
- **Not logged in:** Display **Log In** and **Sign Up** links like we are currently doing.

Now that we've added a `user` property to `<App>`'s `state` object, we need to pass it on down to the `<NavBar>` component as a prop.

**I bet you can do it in 5 minutes or less!**

Now that `<NavBar>` has a `user` prop, let's refactor **NavBar.js**.

We want to display one of two choices - another opportunity to use a ternary operator as follows:

```js
const NavBar = (props) => {
  let nav = props.user ?
    <div>
      <Link to='/high-scores' className='NavBar-link'>HIGH SCORES</Link>
      &nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
      <Link to='' className='NavBar-link'>LOG OUT</Link>
      &nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
      <span className='NavBar-welcome'>WELCOME, {props.user.name}</span>
    </div>
    :
    <div>
      <Link to='/login' className='NavBar-link'>LOG IN</Link>
      &nbsp;&nbsp;|&nbsp;&nbsp;
      <Link to='/signup' className='NavBar-link'>SIGN UP</Link>
    </div>;

  return (
    <div className='NavBar'>
      {nav}
    </div>
  );
};
```

In case you're wondering, "yes", we could have inlined the entire ternary expression within the `return` statement instead of assigning it to the variable `nav`.

A tiny class added to **NavBar.css** for the welcome text:

```css
.NavBar-welcome {
  color: grey;
}
```

<img src="https://i.imgur.com/sih4Awf.png">

Awesome!

### Step 6: Implement Log Out functionality

We just added a `<Link to='' className='NavBar-link'>LOG OUT</Link>` for logging out. Let's put it to work.

When the **LOG OUT** link is clicked, we don't want to change routes, instead we want to:

1. Remove the token from `localStorage`
2. Set `state.user` to `null`

First let's add an `onClick` prop to the link:

```js
<Link to='' className='NavBar-link' onClick={props.handleLogout} >LOG OUT</Link>
```

**Where does the `handleLogout` method needs to go?**

```js
handleLogout = () => {
  userService.logout();
  this.setState({ user: null });
}
```

**As usual, pass that method down to where it's needed (NavBar.js) - you got this.**

Now let's add the `logout` method to **userService.js**:

```js
function logout() {
  tokenService.removeToken();
}

export default {
  signup,
  getUser,
  logout
}
```

Finally, we need that `removeToken` method added to **tokenService.js**:

```js
function removeToken() {
  localStorage.removeItem('token');
}

export default {
  setToken,
  getToken,
  removeToken,
  getUserFromToken
};
```

Test it out and verify that the LOG OUT link is working - sweet!

Sign up again and yikes, the nav bar didn't update!

Let's fix this problem in the next step...

## Step 7: Updating the `user` in `<App>`'s State When Signing Up

**Why didn't the display update?**

Let's take care of the but by first adding a `handleSignup` method in **App.js**:

```js
handleSignup = () => {
  this.setState({user: userService.getUser()});
}
```
We need to pass it from `<App>` down to `<SignupForm>` via props - **easy peasy because all props are already being passed from the `<SignupPage>` to `<SignupForm>` using the spread operator**. Just pass it to `<SignupPage>` and it does the rest.

Here's the refactor that adds the call to `<App>`'s `handleSignup` in **SignupForm.jsx**:

```js
  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await userService.signup(this.state);
      // Let <App> know a user has signed up!
      this.props.handleSignup();
```

That should do the trick! Feel free to sign up and log out all you want!

What's that? You're tired of signing up different users?

We're here to please...

## Step 8: Implement Log In functionality

I'm tied of signing up all these users too!

To implement logging in, we need to write code on both the client and server...

### Implement logging in on the client

We already have a `<LoginPage>` component.

<img src="https://i.imgur.com/wyS2TzB.png">

We're using controlled `<input>`s here, however, the `handleChange` method in the `onChange` is not yet implemented - here's the finished product:

```js
handleChange = (e) => {
  this.setState({
    // Using ES2015 Computed Property Names
    [e.target.name]: e.target.value
  });
}
```

The above code is sweet like bear meat because this single method can handled updating the state for any number of `<input>`s! This is more elegant than writing dedicated methods for each `<input>`.

Since logging in is almost the same as signing up, let's **copy** the `handleSubmit` method from `<SignupForm>` and **replace** the one that's currently in `<LoginPage>`.

Now a few of tweaks:

1. Since we're using `userService`, we need import it:
	
	```js
	import userService from '../../utils/userService';
	```

2. Let's update the code to invoke a `userService.login` method (which we will write in a bit) and also tweak the error handling to something like this:


	```js
	handleSubmit = async (e) => {
	  e.preventDefault();
	  try {
	    // Update to call login instead of signup
	    await userService.login(this.state);
	    
	    ...
	  
	  } catch (err) {
	    // Use a modal or toast in your apps instead of alert
	    alert('Invalid Credentials!');
	  }
	}
	```

3. We originally named the method that notifies `<App>` when someone signs up `handleSignup`. However, to stay DRY, we're now going to use the same method to notify `<App>` when someone logs in. Let's change the name of the method to something more appropriate:

	```js
	handleSubmit = async (e) => {
	  e.preventDefault();
	  try {
	    ...
	    
	    // Rename the method below
	    this.props.handleSignupOrLogin();
	
	    ...
	
	  }
	}
	```

---

**YOU DO EXERCISE (15 mins)**

Please complete the following three steps:

1. In **App.js**, rename the `handleSignup` method to `handleSignupOrLogin`.

2. The above renaming requires a refactor when signing up. After completing the refactor, be sure to sign up another user to test that the UI still updates afterwards. 

3. Pass `handleSignupOrLogin` from `<App>` to `<LoginPage>`.

4. The `handleSubmit` method in `<LoginPage>` is using the `history` object to route to `/` programmatically by using the `history.push` method.

	However, React Developer Tools reveals that `<LoginPage>` does not have access to the `history` object:
	
	<img src="https://i.imgur.com/uqq3E8l.png">

	Fix this by ensuring that the `<Route>` component that renders `<LoginPage>` passes its `history` prop (or all of its props) to `<LoginPage>`.
	
	Hint: Checkout how it's being done for `<SignupPage>`.

Please click the 🌶 in Slack when finished.

---

Awesome, the next step in implementing log in functionality is to add the `login` method to **userService.js**:

```js
function login(creds) {
  return fetch(BASE_URL + 'login', {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify(creds)
  })
  .then(res => {
    // Valid login if we have a status of 2xx (res.ok)
    if (res.ok) return res.json();
    throw new Error('Bad Credentials!');
  })
  .then(({token}) => tokenService.setToken(token));
}

export default {
  signup,
  getUser,
  logout,
  login
}
```

As you can see, the `login` method is pretty similar to that of `signup`.

Whew, that should take care of the client, on to the server...

### Implement logging in on the server

When adding functionality on the server, a great place to start is defining the route.

In **routes/api/users.js**:

```js
/*---------- Public Routes ----------*/
router.post('/signup', usersCtrl.signup);
router.post('/login', usersCtrl.login);
```

Now we need that `usersCtrl.login` method - in **controllers/users.js**:

```js
async function login(req, res) {
  try {
    const user = await User.findOne({email: req.body.email});
    if (!user) return res.status(401).json({err: 'bad credentials'});
    user.comparePassword(req.body.pw, (err, isMatch) => {
      if (isMatch) {
        const token = createJWT(user);
        res.json({token});
      } else {
        return res.status(401).json({err: 'bad credentials'});
      }
    });
  } catch (err) {
    return res.status(401).json(err);
  }
}

// don't forget this:
module.exports = {
  signup,
  login
};
```

The above code is using a `comparePassword` instance method on the `User` model that doesn't exist yet. We need it!

When we want to add custom functionality to a particular instance of a Mongoose model, we can define instance methods like this:

In **models/user.js**:

```js
userSchema.methods.comparePassword = function(tryPassword, cb) {
  bcrypt.compare(tryPassword, this.password, cb);
};
```

As you can see, `bcrypt` includes a 	`compare` method for verifying that a cleartext password matches a given hash.

Also note that we coded the `comparePassword`'s function to accept a callback function that has the same signature that bcrypt's `compare` method expects, which results in that single line of sweet code.

> Interestingly, bcrypt's `compare` method is written as an asynchronous method, thus the necessity to provide a callback. The developers of bcrypt made this decision due to the fact that hashing is a CPU intensive task. There is a synchronous version available, `compareSync`, but it's use is not recommended.

Okay, now that we've implemented logging in on the client and server, try it out!

## Step 9: Provide the token when making AJAX requests

The server is going to want to verify that a user has a token and that it's valid before allowing access to protected routes.

If we are logged in, we want to ensure that we send our JWT in a header.

There exists a `POST /api/scores` route on the server used to create a high score. Later in the the lesson, we will protect this route by requiring a valid JWT.

#### Refactor the **scoresService.js** service module

As just mentioned, we need to send the JWT along with each HTTP request made to any protected route on the server.

Let's refactor **scoresService.js** to provide the JWT when its `create` method is called.

First we will need to import **tokenService.js** so that we can obtain the token:

```js
// Add this import at the top of scoresService.js
import tokenService from './tokenService';

const BASE_URL = '/api/scores/';
```

Here's the refactor that adds simply adds a header:

```js
function create(score) {
  
    ...
    
    headers: {
      'Content-type': 'application/json',
      // Add this header - don't forget the space after Bearer
      'Authorization': 'Bearer ' + tokenService.getToken()
    },
    
    ...

}
```

As you can see, we added an additional header named [Authorization](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Authorization) which has been specified by the HTTP specification as the header to use for providing credentials.

Note the pre-pending of the word **Bearer** to the token, followed by a space, then the token. This is a standard to follow when using token-based authentication.

To verify that the token is being sent in the headers properly:

- Use React Developer Tools to enter the correct guess - **but don't click the score button yet**.
- Open the **Network** tab in Chrome DevTools.
- Now click the score button.

Inspecting the Request Headers should make you feel warm & fuzzy:

<img src="https://i.imgur.com/YHgLc1s.png">

## Step 10: Verify JWTs sent by the client and add the `user` to the Express `request` object

Remember how **passport** added the logged in `user` object to Express' `request` (req) object?

We want some of that!

We've been sending the JWT in an `Authorization` header when requesting scores. 

The token we've been sending already contains the user's info that we can attach to the `req` object - we won't have to hit the database! No session, no querying the database - that's scalability!

> Note, although we will have `req.user` like when we used **passport**, this `user` property will **not** be an actual Mongoose document, it's just a plain JS object that we're grabbing from the token. This is very lightweight and performant. However, if you need to perform any CRUD on an actual document for the logged in user, you will have to query the DB to obtain the user document first using `req.user._id` provided by the token.

#### Create the Custom Middleware

On the server, we're going to create a module that will export a custom middleware function that:

1. Checks if there's a token in the headers of the HTTP request. For additional flexibility, we'll also check for a token being sent in the query string or the body of the request.
2. Verifies the token is valid and hasn't expired.
3. Decodes the token to obtain the user data from its payload.
4. Then finally, adds the user payload to the Express request object

First, let's create a module file for the middleware function:

`$ touch config/auth.js`

Here's the custom **auth.js** middleware that we'll discuss as we type it in:

```js
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

module.exports = function(req, res, next) {
  // Check for the token being sent in three different ways
  let token = req.get('Authorization') || req.query.token || req.body.token;
  if (token) {
    // Remove the 'Bearer ' if it was included in the token header
    token = token.replace('Bearer ', '');
    // Check if token is valid and not expired
    jwt.verify(token, SECRET, function(err, decoded) {
      if (err) {
        next(err);
      } else {
        // It's a valid token, so add user to req
        req.user = decoded.user;    
        next();
      }
    });
  } else {
    next();
  }
};
```

We're using the `jsonwebtoken` module's `verify` method to verify the token.

Again, we are checking for a token being sent in the request in three different ways by a client:

- In the header (this is how we are currently sending it)
- In a query string, or
- In the body

Adding this extra flexibility costs nothing and may allow our API to be accessed from other apps/devices more easily.

#### Mount the Custom Middleware

As we've seen before, the order that middleware is mounted matters.

For efficiency's sake, we don't want to bother checking for a token, verifying it, and adding the user payload to the Express request object unless we need to!

If all the routes in **routes/api/scores.js** needed to be protected, we could add the middleware in **server.js** like this:

```js
app.use('/api/users', require('./routes/api/users'));
// Mount our custom auth middleware to protect routes below it
app.use(require('./config/auth'));
app.use('/api/scores', require('./routes/api/scores'));
```

The above code would skip checking for a token when handling any of the **user** related routes (signing up or logging in/out).

However, in this app, we just want to check for a token in the `create` high score action.

Accordingly, we will need to use the middleware within **routes/api/scores.js** router module like this:

```js
const express = require('express');
const router = express.Router();
const scoresCtrl = require('../../controllers/scores');

router.get('/', scoresCtrl.highScores);

/*---------- Protected Routes ----------*/
// Process the token for only the routes below
router.use(require('../../config/auth'));
router.post('/', scoresCtrl.create);

module.exports = router;
```

Just be sure to mount your auth middleware before mounting any routes/routers that need access to `req.user`.

To test, first let's log out `req.user` from the `highScores` action in **controllers/scores.js**:

```js
function highScores(req, res) {
  console.log(req.user);
  
  // existing code below
  Score.find({})
  ... 
```

As expected, you will see `user: undefined` logged out in the server terminal because that route is above the auth middleware.

Before checking the `create` action, let me delete the high scores from the database...

Okay, move the `console.log` to the `create` method.

Make sure you're logged in, then...

Cheat again to add a high score - and terminal will display the user data from the token!

## Step 11: Protect the `/high-scores` client-side route

In the client, it's usually a good idea to "hide" functionality that users should not be able to access.

**In the previous units, how have we been "hiding" functionality from anonymous visitors?**

Let's say that we don't want anonymous users to be able to view high-scores in react-mastermind.

#### We're Talking About React Here...

The `<Link>` for accessing high-scores is being rendered in `<GamePage>` regardless of log in status.

A minor tweak, and poof, no more **[High Scores]** unless the user is logged in:

```js
{ props.user && <Link className='btn btn-default GamePage-link-margin' to='/high-scores'>High Scores</Link>}
```

<img src="https://i.imgur.com/zn3dYEk.png">

#### But What About the Rebels?

Just because the **[High Scores]** "button" is no displayed doesn't mean that a user can't type `http://localhost:3000/high-scores` into the address bar - and if they do, it currently triggers an error.

Instead, we should send that rebel to `/login`!

One best practice approach is to define your protected routes as follows in **App.js**:

```js
<Route exact path='/high-scores' render={() => (
  userService.getUser() ?
    <HighScoresPage />
   	:
    <Redirect to='/login' />
)}/>
```

Note the use of another `react-router-dom` component, `<Redirect>`. This component is great for performing client-side redirects.

Be sure to update the import to include `Redirect`:

```js
import { Route, Switch, Redirect } from 'react-router-dom';
```

The final step, coming up!

## Step 12: Protect server-side routes with custom middleware

We protected certain server routes back in the Express unit - remember `isLoggedIn`?  If you do, you have an amazing memory!

Once again, we'll use a tiny middleware function inserted before the controller methods.  This time, we'll call it `checkAuth`...

Here's the updated **routes/api/scores.js**:

```js
...

/*---------- Protected Routes ----------*/
// Process the token for only the routes below
router.use(require('../../config/auth'));
router.post('/', checkAuth, scoresCtrl.create);

/*----- Helper Functions -----*/
function checkAuth(req, res, next) {
  if (req.user) return next();
  return res.status(401).json({msg: 'Not Authorized'});
}
```

Well, feed the babies and wash my hair!

We did it!

## Essential Questions

After what you just went through? No way!

## Lab

It is a requirement to implement token-based auth in your upcoming project.

The time to implement auth will come very early during your project's development - in fact, you will need to implement authentication before any of the app's functionality (other than the landing page functionality).

That's when you will get practice on what was covered in this lesson.



