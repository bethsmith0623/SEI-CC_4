<img src="https://i.imgur.com/oY0P1r0.png" width="500">

# The What, Why & How<br>of `this`

---
## Learning Objectives

Students will be able to:

- Describe **what** `this` is

- Explain **why** `this` is necessary

- Determine **how** the value of `this` is set

## Roadmap

- What is `this`?

- Why does `this` exist?

- Implicit binding of `this` within functions

- The binding of `this` within _arrow functions_ (ES2015)

- Explicitly determining the binding of `this`

- Essential questions

## What is `this`?

`this` is a keyword in JavaScript available for use inside of functions/methods.  **When is a function considered to be a method?**

When we introduced functions last week we briefly discussed another JS keyword automatically available inside of functions - **____________**?

So yup, the keyword `this`, is another pre-defined variable inside **every** function.

The value of `this` is set by the JS engine automatically when a function is invoked.  This setting of a value is also known as "binding".

Although JS automatically sets the value of `this` when a function/method is invoked, there are methods available on every function object that allow the programmer to **explicitly** set the value of `this` to what the programmer wants it to be. However, this is usually not necessary and in this lesson, we are going to focus on the **implicit** (automatic) binding - after all, before you can willfully change what `this` is set to, you need to know what it's going to be in the first place!

The value of `this` is sometimes referred to as the **context** within the function.

Understanding `this` is important as a developer, and as a job-seeker - there's a good chance you will be asked about `this` during an interview for a front-end developer job.

## Why `this` is necessary

The mechanism provided by `this` is necessary in all object oriented programming languages to:

1. **Provide access to an object's properties & methods** from other methods within that object.<br><br>and<br>

2. **Implement code reuse**

#### Example 1 - Provide access to an object's properties & methods

The example below demonstrates how `this` provides a way for methods to access the other properties & methods within that object:

```js
const person = {
  firstName: 'Katie',
  intro: function() {
    console.log(`Hello, I'm ${this.firstName}!`);
  }
};
```

#### Example 2 - Implement code reuse

During the lesson on JS Classes, we learned about _prototype methods_, which are defined once, but able to be called by every instance (object) of that class.

This efficient code reuse is made possible by `this`.

Imagine a poorly written class that constructs sprites for a game:

```js
class Sprite {
constructor(color, pos) {
  this.color = color;
  this.pos = pos;
  this.move = function(direction) {...};
  this.rotate = function(direction) {...};
  this.accelerate = function() {...};
    this.checkCollision = function() {...};
  }
}
```

In the app, there may be tens, hundreds, even thousands of Sprite instances; and if so, as written above, each sprite would have it's own copy of every method - the code for the functions will be duplicated over and over again...
	
However, we can ensure, by defining methods more correctly as shown below, there will only one method copy regardless of how many instances of Sprite there are:

```js
class Sprite {
  constructor(color, pos) {
    this.color = color;
    this.pos = pos;
  }
	
  move(direction) {
    switch (direction.toUpperCase()) {
      case 'R':
        this.pos.x < 999 ? this.pos.x++ : this.pos.x = 0;
        break;
      case 'D':
        ...additional code
    }
  }
  ...other methods
}
```

The ability for any number of instances of Sprite to call a single `move` method is made possible by `this`.

Without `this`, we could not implement this efficient code reuse.

### Review Questions

Before looking at **how** the value of `this` is set, a few review questions;

- **The `this` keyword is accessible within every ____________?**

- **What is one of the reasons we need `this` in JavaScript?**

- **What's the other reason?**

## Determining **how** the value of `this` is set (bound)

#### Important Key Point Regarding HOW `this` is Set

> **KEY POINT**: In non-arrow functions (discussed later), the value of `this` is set by the JS runtime depending on **how a function/method is called**, not on how it is written. This means that the same function could have `this` set differently...

### Implicit Binding of `this`

Since the value of `this` is **determined by _how_ we call a function**, we'll take a look at the following scenarios of how functions are called:

1. As "freestanding", simple, non-method functions
2. As Methods
3. As Classes & Constructor Functions
4. As DOM Event Handlers
5. As Generic Callback functions

Let's look at examples for each of these four scenarios:

#### 1. Non-method Functions

- When called as a simple, _non-method_ function (not attached to an object):

	```js
	function thisCheck() {
	  console.log(this);
	}
	thisCheck();  // window {...} or 
	```
	or in the case when _strict mode_ is set:
	
	```js
	function thisCheck() {
	  'use strict';
	  console.log(this);
	}
	thisCheck();  // undefined
	```

#### 2. Methods

- Now let's call this **same function** as a method (assigned to a property of an object):

	```js
	const ninja = {
	  name: 'JS Ninja',
	  f: thisCheck
	};
	function thisCheck() { console.log(this); }
		
	// call thisCheck() as a method
	ninja.f();  // Object {name: "JS Ninja"}
	```
	As observed, the rule is, the object left of the dot is what `this` is bound to!

#### 3. Classes & Constructor Functions
	
- `this` in a class' constructor method or a constructor function is set to the new shiny object that is implicitly returned.

- See the _Sprite_ constructor function above for an example.

#### 4. Event Handlers

- Within an event handler callback function, JS will bind `this` to the element listening to the event.

- For example:

	```js
	const myDiv = document.getElementById('my-div');
	myDiv.addEventListener('click', function() {
	  console.log(this);
	});
	// <div id="my-div">...
	```

> Warning: Using an arrow function prevents JS from being able to set 'this' as shown above

#### 5. Generic Callback Functions

> Note: In the examples below, we will use a **ninja** object that's created as an object literal. Since we are assigning the object is assigned to a variable known in advance, we could solve some of the issues below by directly accessing the **ninja** variable. However, often we won't know in advance the variable that holds an object and the solutions we will discuss will work whether the object was created as an object literal or by using a class/constructor function.

- You just learned that when a function is called as a non-method, `this` is bound to `window` or is `undefined` in _strict mode_.

- Callback functions are called as simple "freestanding" functions (non-methods), so guess what `this` will be set to:

	```js
	class Ninja {
	  constructor(name) {
	    this.ninjaName = name;
	  }
	  chop(numChops) {
	    setTimeout(function() {
	      if (numChops > 0) {
	        console.log(`${this.ninjaName} chop!`);
	        // recursion coming up!
	        this.chop(--numChops);
	      }
	    }, 500);
	  }
	}
		
	const ninja = new Ninja('JS Ninja');
	ninja.chop(2);  //  undefined chop! / then an error
	```
	
	The code didn't work as expected because `this` is not set to the `ninja` object therefore code like `this.ninjaName` returns `undefined`.
	
	Instead, when the callback executes, it's being called as a free-standing, simple function, thus `this` is bound to the `window` (or _____ if strict mode is true).

- Prior to ES2015 arrow functions, a common way to fix the above problem was to set another variable to "remember" the **correct** object `this` is originally bound to:

	```js
	class Ninja {
	  constructor(name) {
	    this.ninjaName = name;
	  }
	  chop(numChops) {
	    const _this = this;
	    setTimeout(function() {
	      if (numChops > 0) {
	        console.log(`${_this.ninjaName} chop!`);
	        // recursion coming up!
	        _this.chop(--numChops);
	      }
	    }, 500);
	  }
	}
		
	const ninja = new Ninja('JS Ninja');
	ninja.chop(2);  //  undefined chop! / then an error
	```
	
	The `_this` variable above would "remember" the value of `this` when it correctly points to the object.

- The newest solution however is to take advantage of the _lexical_ binding of `this` in arrow functions - see below...

## Arrow Functions (ES2015)

- When executed in the global context (outside of a function), an arrow function is **always** the global object (`window` in browser; `global` in node, but never `undefined`):

	```js
	const checkThis = () => {
	  'use strict';
	  console.log(this);
	};
	
	checkThis();  // window {...}
	```

- Unlike how `this` is set to the object left of the dot when invoking a method, in an _arrow function_ it is set to the context of its enclosing function (or the global object if the method is not being invoked within another function.

	For example, assuming we have the `checkThis` arrow function defined as above (in the global scope), and an object, `obj`, defined below, calling the `foo` method shows that `this` within `checkThis` is still bound to the global context, not the object:
	
	```js
	const obj = {
	  foo: checkThis
	};
	
	obj.foo();  // window {...}
	```

- Okay, because arrow functions have `this` always bound to the value of `this` of its enclosing function (or `window` if there's no enclosing function), arrow functions are a great way to take care of the ninja chop problem above:
	
	
	```js
	var ninja = {
	  ninjaName: 'JS Ninja',
	  chop: function(numChops) {
	    setTimeout(() => {
	      if (numChops > 0) {
	        console.log(`${this.ninjaName} chop!`);
	        this.chop(--numChops);
	      }
	    }, 500);
	  }
	};
	
	ninja.chop(2);  //  JS Ninja chop! (two times)
	```
	
	By using an arrow function as the callback for the `setTimeout`, `this` will always be set to the value within the `chop` method - which is what we need.

- FYI, unlike with regular functions, the value of `this` within an arrow function **cannot** be set explicitly using `call`, `apply` or `bind`.
	
## Explicitly Setting `this`

Every function has three methods on it that allow the programmer to explicitly set the binding of `this`:

- `call` & `apply`
- `bind`

We will examine explicitly binding `this` in another lesson.
	
## Good Advice

If you need to know what the value of `this` is in a given scenario, I would advise that you write some quick code like we've done here and test it out!

BTW, this is good advice in lots of cases - sometimes it's just better to write a little code and check the result than to run to docs or google.

## Essential Questions

I'll give you a moment to review these with a pair:

**What type of programming languages rely on the concept of `this`?**

**True or false? The value of `this` can be always be determined by examining the definition of a function. Explain your answer.**

**What is `this` bound to when a class or constructor function is invoked?**

**What is `this` bound to within a method invoked on an object?**

**In this code:**

```js
function foo() {
  console.log(this);
};

const bar = {
  foo: foo
};

// Scenario 1:
foo();

// Scenario 2:
bar.foo();
```

**What will be logged out in _Scenario 1_, if not in strict mode?**

**What will be logged out in _Scenario 1_, if in strict mode?**

**What will be logged out in _Scenario 2_?**