[click to view as a presentation](https://presentations.generalassemb.ly/6d6c17eba1d437d1e348816d1db401a1#/1)

<link href="https://gist.githubusercontent.com/jim-clark/6919052ab15de680c120907d223c31b5/raw/9eedb5e3c01352b9ccda7264227f253be56a08b7/slide.css">

---
<img src="https://i.imgur.com/VqMhmBL.png">

---
## Learning Objectives
<br>

<p>Students Will Be Able To:</p><br>

- Describe the Use Case for AJAX
- Use the `fetch` API to make AJAX requests
- Use ES2017's `async`/`await` to handle promises synchronously

---
### Roadmap
<br>

1. Setup
2. AJAX - What & Why
3. Make an HTTP Request Using the Fetch API
4. Use ES2017's `async`/`await` to Handle Promises
5. Function Expressions Can Use `await` Too
6. Let's Build an Ugly Little SPA
7. Using Other HTTP Methods with Fetch
8. Essential Questions

---
#### Setup
<br>

- We'll be using [Repl.it](https://repl.it) during this lesson to learn about AJAX and `async`/`await`.

- Create a new HTML, CSS, JS repl and name it something like **AJAX with Fetch**.

---
#### AJAX - What & Why
<br>

- **AJAX** is short for **Asynchronous JavaScript And XML**.

- Simply put, **AJAX** is the process of a client sending an HTTP request to a server's API endpoint using JavaScript.

- In case you're wondering what the [XML](https://en.wikipedia.org/wiki/XML) is about... It's the grandaddy of all markup languages, including HTML.

- Once upon a time, XML was the de facto format for transferring data between two computers - that's why it's in the name AJAX. However, **JSON** has since become the preferred data transfer format.

---
#### AJAX - What & Why
<br>

- We can use AJAX in the browser to send HTTP requests to any server, as long as the server is [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) compliant.

- With AJAX, we can send an HTTP request that uses any HTTP method including, `GET`, `POST`, `PUT` & `DELETE` - no need for `method-override`!

---
#### AJAX - What & Why
<br>

- But, here's the best part: Unlike when we click a link or submit a form on a web page, AJAX does not trigger a page reload!

- We can use AJAX to communicate with servers to do lots of things, including to read, create, update & delete data without the user seeing a page refresh.

- AJAX has made possible the modern-day Single Page Application (SPA) such as Gmail and like what you're going to build during this unit!

---
#### Make an HTTP Request Using the Fetch API
<br>

- AJAX was originally made possible back in 1998 when IE5 introduced the `XMLHttpRequest` (XHR) object and it's still in every browser. However, it's a bit clunky to use.

- One of the reasons jQuery became popular was because it made making AJAX requests easier.

- However, we no longer have to use the XHR object or load jQuery to make AJAX calls thanks to the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) which is part of the collection of [Web APIs](https://developer.mozilla.org/en-US/docs/Web/API) included in modern browsers.

---
#### Make an HTTP Request Using the Fetch API
<br>

- As we saw earlier, the **A** in AJAX stands for **asynchronous**.

- Indeed, making an AJAX request is an asynchronous operation. So far, we've seen two approaches that enable us to run code after an asynchronous operation has completed. **What are they?**

---
#### Make an HTTP Request Using the Fetch API
<br>

- The Fetch API, like any new Web API asynchronous method, uses promises instead of callbacks.

- Let's make a `GET` request to the `/users` endpoint of [JSONPlaceholder](https://jsonplaceholder.typicode.com/), a fake RESTful API for developers:

	```js
	fetch('https://jsonplaceholder.typicode.com/users')
	.then(response => console.log(response))
	```
	When ran, we'll see that the `fetch` method returns a promise that resolves to a Fetch [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response) object, which has properties such as `status`, etc.

---
#### Make an HTTP Request Using the Fetch API
<br>

- To obtain the data in the body of the response, we need to call either the `text` or `json` method which returns yet another promise:

	```js
	fetch('https://jsonplaceholder.typicode.com/users')
	.then(response => response.json())
	.then(users => console.log(users))
	```
	As you can see, the `json()` method returns a promise that resolves to the data returned by the server, as JSON.

---
#### Use ES2017's async/await to Handle Promises
<br>

- Before we continue to use `fetch` any further, let's see how to use a fantastic new way of working with promises:<br>[async](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) & [await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await)

- The purpose of `async`/`await` is to allow us to work with asynchronous code almost as if it were synchronous!

---
#### Use ES2017's async/await to Handle Promises
<br>

- We use the `async` declaration to mark a **function** as asynchronous when promises are going to be handled using `await` within it.

- We can re-write our code to use `async`/`await` like this:

	```js
	async function printData() {
	  const endpoint = 'https://jsonplaceholder.typicode.com/users';
	  users = await fetch(endpoint).then(res => res.json());
	  console.log( users );
	}
	
	printData();
	```
	The `await` operator causes the code in `printData` to "pause" until the promise returns its resolved value.

---
#### Use ES2017's async/await to Handle Promises
<br>

- When using `async`/`await`, we can't use a `.catch()` to handle a promise's rejection, instead we can use JavaScripts's `try`/`catch` block:

	```js
	async function printData() {
	  const endpoint = 'https://jsonplaceholder.typicode.com/users';
	  try {
	    users = await fetch(endpoint).then(res => res.json());
	    console.log( users );
	  } catch(err) {
	    console.log(err);
	  } 
	}
	```
	The `catch` block would run if the `fetch` failed.

---
#### PRACTICE (2 MIN)
<br>

- After the `console.log( users )`, add another `GET` request using `fetch` to JSONPlaceholder's `/posts` endpoint.

- Log out the returned posts.

---
#### Use ES2017's async/await to Handle Promises
<br>

- Node.js also has `async`/`await`, so you can now work with Mongoose code like this:

	```js
	async function index(req, res) {
	  const movies = await Movie.find({});
	  res.render('movies/index', { title: 'All Movies', movies });
	}
	``` 
	Instead of this:
	
	```js
	function index(req, res) {
	  Movie.find({}).then(function(movies) {
	    res.render('movies/index', { title: 'All Movies', movies });
	  });
	}
	```

---
#### Review Questions
<br>

- Why is AJAX required to be able to build Single Page Applications like Gmail?

- What is wrong with the following code?

	```js
	function show(req, res) {
	  const movie = await Movie.findById(req.params.id);
	  res.render('movies/show', { title: 'Movie Detail', movie });
	}
	```

---
#### Function Expressions Can Use await Too
<br>

- Function expressions can also use `await`. For example, here's how an IIFE can be used to use `await` without having to define and call an asynchronous function:

	```js
	(async function() {
	  const endpoint = 'https://jsonplaceholder.typicode.com/users';
	  users = await fetch(endpoint).then(res => res.json());
	  console.log(users);
	})();
	```

---
#### Let's Build an Ugly Little SPA
<br>

- Let's build an ugly (no CSS) little SPA that renders a selected user's todos.

- Upon loading, a `<select>` will be pre-filled with the users' names.

- Upon loading and when we select a different user, we'll have to fetch that user's todos and render them. 

---
#### Let's Build an Ugly Little SPA
<br>

- Unfortunately, the JSONPlaceholder fake API doesn't truly implement nested resource endpoints.  For example, a `GET https://jsonplaceholder.typicode.com/users/2/todos` request should only return the todos for the user with an id of 2, however, JSONPlaceholder always returns all todos instead :(

- No worries, we can use the Network Devtools to verify that the proper request is being sent by our SPA.

---
#### Let's Build an Ugly Little SPA
<br>

- First, a little markup:

	```html
	<body>
	  <label>Select User: <select></select></label>
	  <h4>TODOS</h4>
	  <section></section>
	
	  <script src="script.js"></script>
	</body>
	```
	Note that we will "build" the `<option>` elements for the `<select>` when the page loads.
	
---
#### Let's Build an Ugly Little SPA

- Let's structure the initial JavaScript:

	```js
	/*-- constants --*/
	const BASE_URL = 'https://jsonplaceholder.typicode.com/';
	
	/*-- cached elements --*/
	const selUserEl = document.querySelector('select');
	const todosEl = document.querySelector('section');
		
	/*-- functions --*/
	init();
		
	function init() {
	  
	  renderTodos();
	}
		
	function renderTodos() {
	}
	```

- When run, no errors should appear in the console.

---
#### Let's Build an Ugly Little SPA

- Next step is to "build" the `<option>` elements for the users:

	```js
	async function createOptions() {
	  const users = await fetch(`${BASE_URL}users`)
	    .then(res => res.json());
	  const options = users.map(u =>
	    `<option value="${u.id}">${u.name}</option>`
	  ).join('');
	  selUserEl.innerHTML = options;
	}
	
	function init() {
	  createOptions();
	  renderTodos();
	}
	```
	Converting an array of users into an array of options to be joined into a string, is a perfect use case for `map`!

---
#### Let's Build an Ugly Little SPA
<br>

- Now we need the `renderTodos` function to fetch and render the todos for the selected user:

	```js
	async function renderTodos() {
	  // JSONPlaceholder is a RESTful API!
	  const url = `${BASE_URL}users/${selUserEl.value}/todos`;
	  const todos = await fetch(url).then(res => res.json());
	  console.log(todos);
	}
	```
	Don't forget to add the `async` declaration.

- It doesn't work - no todos are being logged...

---
#### Let's Build an Ugly Little SPA
<br>

- Is it the `url`?

- A `console.log(url)` reveals that the user's id is missing:

	```
	https://jsonplaceholder.typicode.com/users//todos
	```
	
- Why doesn't `selUserEl.value` return the selected user's id?<br>Because functions that are declared with `async` are _asynchronous_ themselves so the `<option>` elements don't exist yet...

---
#### Let's Build an Ugly Little SPA
<br>

- The `init()` function is calling two asynchronous functions:

	```js
	function init() {
	  createOptions();
	  renderTodos();
	}
	```

- And `createOptions` has not completed when `renderTodos` is called, therefore there are no options yet!

---
#### Let's Build an Ugly Little SPA
<br>

- `async` functions return a promise, so we can make the `init` function itself an async function:

	```js
	async function init() {
	  await createOptions();
	  await renderTodos();
	}
	```

- BTW, the value that `async` functions resolve to is whatever you return from that function.

---
#### Let's Build an Ugly Little SPA
<br>

- Now we can finish coding the `renderTodos` function:

	```js
	async function renderTodos() {
	  const url = `${BASE_URL}users/${selUserEl.value}/todos`;
	  const todos = await fetch(url).then(res => res.json());
	  // Build the html for todosEl
	  const html = todos.map(t => `
	    <article>
	      <label>
	        <input type="checkbox" ${t.completed && 'checked'}>
	        ${t.title}
	      </label>
	    </article>
	  `).join('');
	  todosEl.innerHTML = html;
	}
	```

---
#### Let's Build an Ugly Little SPA
<br>

- Now that it's working for the first user, we can wrap up this little SPA by adding an event listener for when the dropdown is changed:

	```js
	const todosEl = document.querySelector('section');
	
	/*-- event listeners --*/
	selUserEl.addEventListener('change', renderTodos);
	```

- Check it out!

- Okay, let's now see how other types of requests can be made with `fetch`...

---
#### Using Other HTTP Methods with Fetch
<br>

- JSONPlaceholder simulates RESTful requests other than `GET` requests.

- If, for example, we send a `DELETE /users/2` request to delete the user with an id of 2, JSONPlaceholder will return a status code of 200, but it won't actually delete the data from its database.

---
#### Using Other HTTP Methods with Fetch

- Here's how we can use `fetch` to issue a `POST` request to create a user:

	```js
	function createUser(name) {
	  fetch('https://jsonplaceholder.typicode.com/users', {
	    method: 'POST',
	    body: JSON.stringify({
	      name: 'Freddie Mercury'
	    }),
	    headers: {
	      'Content-Type': 'application/json'
	    }
	  })
	  .then(res => res.json())
	  .then(newUser => console.log(newUser));
	}
	
	createUser();
	```

---
#### Using Other HTTP Methods with Fetch

- Reviewing the code reveals that `fetch` requires a second argument when making anything other than a `GET` request.

- In the second "options" object argument we've specified the following key:value pairs:

	```js
	method: 'POST',
	// It's required send posted data as a string - JSON in this case
	body: JSON.stringify({
	  name: 'Freddie Mercury'
	}),
	// The server needs to know what type of data is in the body
	headers: {
	  'Content-Type': 'application/json'
	  // Data being sent from a form would have a Content-Type
	  // of 'application/x-www-form-urlencoded'
	}
	```

---
#### Exercise (5 min)
<br>

- Write a function with the following signature that uses `fetch` to "delete" a user from JSONPlaceholder:

	```js
	function deleteUser(id) {
	
	}
	
	deleteUser(1);
	```

- `deleteUser` should log out the empty object returned by JSONPlaceholder.

- Hint: There is no payload, thus no `body` or `headers` to send.

---
#### Congrats!<br><br>Let's wrap up with a couple of<br>review questions before moving on to the lab...

---
#### Essential Questions
<br>

1. **What does AJAX stand for?**

2. **Which of the following scenarios can `fetch` be used for:**
	1. **Creating a new movie in an app's database without refreshing the page.**
	2. **Deleting a fun fact about a student from an app's database without refreshing the page.**
	3. **Submitting a form to create a cat and redirecting to the cats index page.**

---
#### References
<br>

- [MDN - Async Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)

- [MDN - Await Operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await)


