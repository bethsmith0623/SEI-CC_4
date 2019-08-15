This presentation can be viewed [here](https://presentations.generalassemb.ly/d71414a1f2c9cf64d6f1966eb85f1c7a#/1)

<link href="https://gist.githubusercontent.com/jim-clark/6919052ab15de680c120907d223c31b5/raw/9eedb5e3c01352b9ccda7264227f253be56a08b7/slide.css">

---

<img src="https://i.imgur.com/vUOu9NW.jpg">
<br>
# Express Middleware

---

### Learning Objectives
<br>

- Students Will Be Able To:
	- Describe the Purpose of Middleware
	- Use `method-override` Middleware and HTML Forms to Add, Update & Delete Data on the Server
	- Use Query Strings to Provide Additional Information to the Server

---
### Roadmap
<br>

- Setup
- What is Middleware?
- Our First Middleware
- Key Middleware
- Express Request-Response Cycle
- Creating To-Dos
- method-override Middleware
- Delete a To-Do
- Exercise: Update a To-Do

---
#### Setup
<br>

- This lesson builds upon the `express-todos` project created in the previous lesson.

- If your previous code has the `index` & `show` routes working, you may continue to build upon it, however, if it wasn't working, or you just want to play it safe, there is starter code provided:
	- **Be sure** to `cd` into the `starter-code/express-todos` folder
	- Then install the node modules:  `$ npm install`

- Make sure that you're in the **express-todos** folder and open your text editor.

---
### What is Middleware?

---
#### What is Middleware?
<br>

- In the Intro to Express lesson, we identified the three fundamental capabilities provided by web application frameworks:
	1. The ability to define routes
	2. The ability to process HTTP requests using middleware
	3. The ability to use a view engine to render dynamic templates

- We've already defined routes and rendered dynamic templates.

- In this lesson we complete the trifecta by processing requests using middleware.

---
#### What is Middleware?
<br>

- A middleware is simply a function with the following signature:

	```js
	function(req, res, next) {}
	```

- As you can see, middleware have access to the _request_ (`req`) and _response_ (`res`) objects - this allows middleware to modify them in anyway they see fit.

- Once a middleware has done its job, it either calls `next()` to pass control to the next middleware in the pipeline **or** ends the request as we've been doing with the `render` & `redirect` methods...

---
#### What is Middleware?
<br>

- Yes, actually you have already written middleware - the controller actions, `todosCtrl.index` & `todosCtrl.show`, are middleware!
	
- The controller middleware functions didn't need to define the `next` parameter because they were at the **end of the middleware pipeline**.  That is, they ended the request/response cycle by calling a method on the `res` object, e.g., `res.render`.

- The `next` function is also used for error handling.

---
### Our First Middleware

---
#### Our First Middleware
<br>

- There's no better way to understand middleware than to see one in action.

- Open **server.js** and add this "do nothing" middleware:

	```js
	app.set('view engine', 'ejs');
	
	// add middleware below the above line of code
	app.use(function(req, res, next) {
	  console.log('Hello SEI!');
	  next();
	});
	```
- Type `nodemon` to start the server, browse to `localhost:3000`, and check terminal. 

---
#### Our First Middleware
<br>

- Note that `app.use` mounts middleware functions into the middleware pipeline.

- Let's add a line of code that modifies the `req` object: 

	```js
	app.use(function(req, res, next) {
	  console.log('Hello SEI!');
	  // Add a time property to the req object
	  req.time = new Date().toLocaleTimeString();
	  next();
	});
	```

- Now let's pass this info to the **todos/index.ejs** view...

---
#### Our First Middleware
<br>

- It's the responsibility of controllers to pass data to views.

- Let's update the `index` action in **controllers/todos.js** so that it passes `req.time`:

	```js
	function index(req, res) {
	  res.render('todos/index', {
	    todos: Todo.getAll(),
	    time: req.time  // add this line
	  });
	}
	```

---
#### Our First Middleware
<br>

- Now let's render the time in **todos/index.ejs** by updating the `<h1>` as follows:

	```html
	<h1>Todos as of <%= time %></h1>
	```

- Refresh!

---
#### Our First Middleware

- The order that middleware is mounted matters!

- In **server.js**, let's move our custom middleware below where the routers are being mounted:

	```js
	app.use('/', indexRouter);
	app.use('/todos', todosRouter);
	
	app.use(function(req, res, next) {
	  console.log('Hello SEI!');
	  req.time = new Date().toLocaleTimeString();
	  next();
	});
	```

- Refresh shows that it no longer works :(

- Move it back above the routes - that's better.

---
### Key Middleware

---
#### Key Middleware

- Express generator mounted several key middleware by default...

- **morgan**: Logger that logs requests.

- **express.json** & **express.urlencoded** (formerly known as `body-parser`): Parses data sent in the body of the request and populates a `req.body` object containing that data.

- **cookie-parser**: Populates a `cookies` property on the `req` object so that you can access data in cookies. For example, `req.cookies.sid`. _cookie-parser_ is middleware which deals with the incoming _request_. To __set__ a cookie, you would use the `cookie` object on the _response_ object.

- **express.static**: Serves _static assets_, such as css, js and image files.

---
#### Express Request-Response Cycle
<br>

<img src="https://i.imgur.com/HMRyxyl.png">

---
### Creating To-Dos

---
#### Creating To-Dos
<br>

- Again, here's a great flow to follow when you want to add functionality to your web app:
	1. Identify the "proper" Route (Verb + Path)
	2. Create the UI that issues a request that matches that route.
	3. Define the route on the server and map it to a controller action.
	4. Code and export the controller action.
	5. `res.render` a view in the case of a `GET` request, or `res.redirect` if data was changed. 

---
#### Creating To-Dos
<br>

- What functionality do we want?  Do we want to show a form on the `index` view, or do we want a separate page dedicated to adding a To Do?  Typically, you'd want have the form on the same page, however, for completeness, we'll use the dedicated page approach.

- Checking the [Resourceful Routing for CRUD Operations in Web Applications Chart](https://gist.github.com/jim-clark/17908763db7bd3c403e6), we find that the proper route is:

	```sh
	GET /todos/new
	```

---
#### Creating To-Dos
<br>

- Next step is to add a link in **views/todos/index.ejs** that will invoke this route:

	```html
	...
	  </ul>
	  <a href="/todos/new">Add To-Do</a>
	</body>
	```
	
- Step 2 is done. On to step 3 - defining the route on the server...

---
#### Creating To-Dos
<br>

- Let's add the `new` route in **routes/todos.js** as follows:

	```js
	router.get('/', todosCtrl.index);
	router.get('/new', todosCtrl.new);
	router.get('/:id', todosCtrl.show);
	```

- I'm going to post this question in Slack for you to REPLY to:<br>Why must the `new` route be defined before the `show` route?

---
#### Creating To-Dos

- Step 4 says to code the `todosCtrl.new` action we just mapped to the `new` route:

- In **controllers/todos.js**:

	```js
	module.exports = {
	  index,
	  show,
	  new: newTodo
	};
	
	function newTodo(req, res) {
	  res.render('todos/new');
	}
	```

- Note that you cannot create a function using a JS _reserved_ word.

---
#### Creating To-Dos
<br>

- Now we need that `new` view.

- Create **views/todos/new.ejs**, copy over the boilerplate from another view, then put this good stuff in there:

	```html
	<body>
	  <h1>New Todo</h1>
	  <form action="/todos" method="POST" autocomplete="off">
	    <input type="text" name="todo">
	    <button type="submit">Save Todo</button>
	  </form>
	</body>
	```

---
#### Creating To-Dos
<br>

- FYI that `autocomplete="off"` attribute will prevent the sometimes annoying autocomplete feature of inputs.

- Verify that clicking the **Add To-Do** link displays the page with the form...

---
#### Creating To-Dos
<br>

- Performing a Create data operation using a form is a two-request process.

- Checking the [Routing Chart](https://gist.github.com/jim-clark/17908763db7bd3c403e6) again shows that the proper route for creating data on the server is:

	```sh
	POST /todos
	```

- That's why the form's attributes have been set to:
	- `action="/todos"`
	- `method="POST"`

- Check [this](https://developer.mozilla.org/en-US/docs/Learn/HTML/Forms/Your_first_HTML_form) out if you want to learn more about HTML Forms.

---
#### Creating To-Dos
<br>

- Same process:
	1. Determine proper route - check!
	2. Create UI - check!
	3. Define the route on the server - next...

---
#### Creating To-Dos
<br>

- In **routes/todos.js**:

	```js
	router.get('/:id', todosCtrl.show);
	router.post('/', todosCtrl.create);  // add this route
	```

- Yay! Our first non-`GET` route!

---
#### Creating To-Dos
<br>

- Same process:
	1. Determine proper route - check!
	2. Create UI - check!
	3. Define the route on the server - check!
	4. Code and export the controller action - next...

---
#### Creating To-Dos
<br>

- In **controllers/todos.js**:

	```js
	  ...
	  create
	};
	
	function create(req, res) {
	  console.log(req.body);
	  req.body.done = false;
	  Todo.create(req.body);
	  res.redirect('/todos');
	}
	```

- Temporarily comment out the `Todo.create(req.body);` line so that we can check out what gets logged out...

---
#### Creating To-Dos
<br>

- `req.body` is courtesy of this middleware in **server.js**:
	
	```js
	app.use(express.urlencoded({ extended: false }));
	```

- The properties on `req.body` will always match the values of the `<input>`'s `name` attributes:

	```html
	<input type="text" name="todo">
	```

---
#### Creating To-Dos

- We already did Step 5 with the `res.redirect`.

- All we need is that `create` in **models/todo.js**:

	```js
	module.exports = {
	  getAll,
	  getOne,
	  create
	};
	
	function create(todo) {
	  todos.push(todo);
	}
	```

- Test it out!

- Note that when `nodemon` restarts the server, added to-dos will be lost.

---
### <span style="text-transform:lowercase">method-override</span> Middleware

---
#### <span style="text-transform:lowercase">method-override</span> Middleware
<br>

- As shown on the [Resourceful Routing for CRUD Operations in Web Applications Chart](https://gist.github.com/jim-clark/17908763db7bd3c403e6), performing full-CRUD data operations requires that the browser send `DELETE` & `PUT` requests.

- Using JavaScript (AJAX), the browser can send HTTP requests with any method, however, HTML can only send `GET` & `POST` methods. So what do we do if we want to delete a To-Do?

- [method-override](https://www.npmjs.com/package/method-override) middleware to the rescue!

---
#### <span style="text-transform:lowercase">method-override</span> Middleware
<br>

- Using `method-override` allows browsers to inform the server that it actually wants it to consider the request it sends to be something other than a `POST` - as you'll soon see, we'll be using forms with method="POST".

- First we need to install the middleware:

	```sh
	$ npm i method-override
	```

---
#### <span style="text-transform:lowercase">method-override</span> Middleware
<br>

- Require it below `logger` in **server.js**:

	```js
	var logger = require('morgan');
	var methodOverride = require('method-override');
	```

- Now let's add `method-override` to the middleware pipeline:

	```js
	app.use(express.static(path.join(__dirname, 'public')));
	app.use(methodOverride('_method'));  // add this
	```

- We are using the [Query String](https://en.wikipedia.org/wiki/Query_string) approach for `method-override` as documented [here](https://www.npmjs.com/package/method-override#override-using-a-query-value).

---
### Delete a To-Do

---
#### Delete a To-Do
<br>

- The user story reads:<br>_As a User, I want to delete a To Do from the list_

- Same process:
	1. Determine proper route

- The RESTful route is:

	```sh
	DELETE /todos/:id
	```

---
#### Delete a To-Do
<br>

- Same process:
	1. Determine proper route - check!
	2. Create UI - next...


---
#### Delete a To-Do
<br>

- By default, `method-override` only listens for `POST` requests.

- Therefore, we'll use a `<form>` for the UI in **views/todos/index.ejs**:

	```html
    <% todos.forEach(function(t, idx) { %>
      <li>
        <form action="/todos/<%= idx %>?_method=DELETE"
          class="delete-form" method="POST">
          <button type="submit">X</button>
        </form>
	```

- The `?_method=DELETE` is the query string.

---
#### Delete a To-Do
<br>

- Let's some styling in **public/stylesheets/style.css**:

	```css
	.delete-form {
	  display: inline-block;
	  margin-right: 10px;
	}
	
	.delete-form button {
	  color: red;
	}
	
	li {
	  list-style: none;
	}
	```

- Refresh and use DevTools to ensure the links look correct.

---
#### Delete a To-Do
<br>

- Same process:
	1. Determine proper route - check!
	2. Create UI - check!
	3. Define the route on the server - next...

---
#### Delete a To-Do
<br>

- I bet you could have done this one on your own!

- In **routes/todos.js**:

	```js
	router.post('/', todosCtrl.create);
	router.delete('/:id', todosCtrl.delete);
	```

---
#### Delete a To-Do
<br>

- Same process:
	1. Determine proper route - check!
	2. Create UI - check!
	3. Define the route on the server - check!
	4. Code and export the controller action - next...

---
#### Delete a To-Do
<br>

- Similar to `newTodo`, we can't name a function `delete`, so...

	```js
	  create,
	  delete: deleteTodo
	};
	
	function deleteTodo(req, res) {
	  Todo.deleteOne(req.params.id);
	  res.redirect('/todos');
	}
	```

- Any questions?

---
#### Delete a To-Do
<br>

- All that's left is to add the `deleteOne` method to the `Todo` model:

	```js
	module.exports = {
	  getAll,
	  getOne,
	  create,
	  deleteOne
	};
	
	function deleteOne(id) {
	  todos.splice(id, 1);
	}
	```

- Does it work?  Of course it does!

---
### 💪 Exercises: Update a To-Do

---
#### Update a To-Do
<br>

- Updating a To-Do is very similar to creating one because it also is a two-request process:
	1. One request to display a form used to edit the To-Do.
	2. Another request to submitted the form to the server so that it can update the To-Do.

---
#### Update a To-Do
<br>

- Exercise #1:
	- _As a User, when viewing the show page for a To-Do, I want to be able to click a link to edit the text of the To-Do_
- Exercise #2:
	- _As a User, when editing a To-Do, I want to be able to toggle whether or not it's done_

---
#### Update a To-Do
<br>

- Hints:
	- Follow the same steps we followed multiple times for adding functionality!
	- Be sure to reference the Routing Chart to determine the proper routes!
	- You will want to pre-fill the `<input>` with the todo text - use the `value` attribute and some EJS to pull this off.
	- Don't forget that the controller action will first have to get the To-Do being edited so that it can be sent to the view.

---
#### Update a To-Do
<br>

- Hints for Exercise #2 (Toggling `done`):
	- Use an `<input type="checkbox" ...>`
	- Checkboxes are checked when a `checked` attribute exists (no value is assigned).
	- Use a ternary expression to write in the `checked` attribute, or an empty string.
	- If the checkbox is checked when submitted, `req.body.done` will have the value of `"on"`, otherwise there won't even be a `req.body.done` property.

- Enjoy!

---
## References
<br>

<p style="text-align:left"><em>Note: When searching for info on the Express framework, be sure that you search for the info for version 4 only - there were significant changes made from earlier versions.</em></p>


