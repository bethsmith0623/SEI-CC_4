<img src="https://i.imgur.com/gGKrqF5.png">

# ES2015(ES6) - Arrow Functions Walk-thru

##### Arrow functions have a more terse syntax than regular functions (`function` keyword):

```js
// regular function
let squares = [1, 2, 3].map(function (x) { return x * x });
// arrow function
let squares = [1, 2, 3].map(x => x * x);
```

##### A single parameter need not be wrapped in parens:

```js
x => { ... }  // one parameter
() => { ... }  // no parameters
(x, y) => { ... }  // two or more parameters
```

##### The statement block of an arrow function behaves just like that of a regular function:

```js
const getGrade = score => {
  if (score === 100) return 'A+';
  score = Math.floor(score / 10);
  return ['F', 'F', 'F', 'F', 'F', 'F', 'D', 'C', 'B', 'A'][score];
};
```

##### If there's only a single **expression** (not a statement), curly braces are optional:

```js
const logThis = () => { console.log(this) };
const logThis = () => console.log(this);
```

##### Arrow functions will implicitly return the result of an **expression** without a block (braces):

```js
const add = (x, y) => { return x + y };

// Ideal single-statement arrow function
const add = (x, y) => x + y;

// Returns undefined (blocks are like reg functions)
const add = (x, y) => { x + y };

// Syntax error, must be an expression
const add = (x, y) => return x + y;
```

##### To implicitly return a JS object, wrap it in parens to avoid the curly braces of the object being interpreted as a statement block:

```js
let todos = ['Buy milk', 'Mow lawn'];

// Below line of code won't work - looks like a statement block
// let todoObjects = todos.map(todo => {todo: todo, done: false});

// Wrap the implicit returned object in parens
let todoObjects = todos.map(todo => ({todo: todo, done: false}));
```

##### All arrow functions are expressions.  There's no such thing as an arrow function definition/declaration.

```js
// Nope, syntax error (no declarations for arrow functions)
add(x, y) => x + y;

// This is what you want - a function expression
const add = (x, y) => x + y;
```

##### Arrow functions do not have an `arguments` "array-like" object:

```js
function checkArgs() { console.log(arguments); }
checkArgs(1, 'abc') // outputs [1, "abc"]

const checkArgs = () => console.log(arguments);
checkArgs(1, 'abc') // outputs an Event object?! Spec states no arguments object in arrow functions.
```

##### `this` Keyword Binding

`this` in an arrow function is always set to the same _context_ value as its enclosing function (or the global object if not within a function).

```js
const userRoom = {
  users: [],
  loadUsers: function() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      // below will work
      .then(users => {
        this.users = users;
      });
      // below will not work
      // .then(function(users) {
      //   this.users = users;
      // });
  }
};
```

> Note, the above code may not run in the Chrome's console - due to security policy (depending on what site is opened in the tab). Best best to run it in [repl.it](https://repl.it).

Internally, this is what the JS engine is up to:

```js
// This arrow function:
const someMethod = x => x + this.y;
// translates internally as:
const someMethod = function(x) { return x + this.y }.bind(this);
```
  
Also note that unlike regular (non-arrow) functions, `this` **cannot be explicitly set** using the `call`, `apply` or `bind` methods.

##### Because of the binding rules of `this` in arrow functions, **do not** use arrow functions for:

- Methods in objects that need to access other properties within the object.

  For example, this works as expected:
 
	```js
	const ticket = {
	  airlines: 'Air SEI',
	  flight: '0116',
	  seat: 'C19',
	  print: function() {
	    console.log(`${this.airlines}: flight ${this.flight} / seat ${this.seat}`);
	  }
	}
	```
	
	For example, this doesn't because `this` within the `print` method is bound to window or undefined (in strict mode):
	
	```js
	const ticket = {
	  airlines: 'Air SEI',
	  flight: '0116',
	  seat: 'C19',
	  print: () => {
	    console.log(`${this.airlines}: flight ${this.flight} / seat ${this.seat}`);
	  }
	}
	```

- Constructor functions also are not a use case for arrow functions because they do not allow JS to set `this` to the shiny new object being created.



