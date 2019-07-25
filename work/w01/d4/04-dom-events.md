[Click here to view as a presentation](https://presentations.generalassemb.ly/3e7f8d1f6c73f917d5a041d4da611383#/1)

---

<img src="https://i.imgur.com/VLwvpbl.jpg" width="900">

---

## Learning Objectives
<br>

<p>Students will be able to:</p>

- Add event listeners for events such as `click`
- Explore the event object
- Explain event bubbling
- Use event bubbling to implement event delegation
- Stop an event from bubbling

---
## Roadmap
<br>

- What are DOM events?
- Setup
- What's an **event listener**?
- Our first **event listener**
- The event object
- Creating a new element
- Event bubbling
- Event delegation
- Removing event listeners

---
### What are DOM Events?
<br>

- DOM events are the bedrock of interactivity on web pages.

- DOM events enable us as developers to implement **event-driven programming**. This programming paradigm is such that much of our code runs in response to events being triggered during run-time.

---
### What are DOM Events?
<br>

- Lots of events are being generated within the browser, for example, when:
	-  A user moves or clicks the mouse
	-  A user presses a key
	-  When a form is submitted
	-  When the page has finished loading or has been resized
	-  etc.

- Take a gander [here](https://developer.mozilla.org/en-US/docs/Web/Events) at the type and sheer number of events.

---
### What's an Event Listener?
<br>

- An **event listener** is a function, more specifically, a _callback function_, that is called when an event fires.

- Event listeners may also be referred to as _event handlers_.

- There are three different approaches for registering event listeners:
	- In the HTML (inline):<br>`<button id="reset-btn" onclick="reset()">`
	- Assigning to DOM elements' properties:<br>`resetBtn.onclick = reset;` 
	- Calling `addEventListener()` on a DOM element

---
### What's an Event Listener?

- Using the HTML approach (`onclick="reset()"`) is typically frowned upon because it requires that the function be in the global scope. In addition, this, like inline styling, kind of breaks the **separation of concerns** design principle.

- The DOM element approach (`resetBtn.onclick = reset;`) is better because the function does not have to be in global scope, however...

- The `addEventListener` approach is widely considered to be the best practice because it has the flexibility of adding multiple listener functions!

---
### What's an Event Listener?
<br>

- Here is the common syntax for _registering_ an event listener for a given event:<br>`element.addEventListener(<event-name>, <callback>, <use-capture>);`<br>

	- **event-name** is the name of the event (string)
	- **callback** is the function we want executed when the event happens.  When called by the JS engine, it will be passed an _event object_ as an argument.
	- **use-capture** is a boolean and is optional. It has to do with _event phases_. We won't need to worry about it in SEI but if you want to know more, read the [Event Phases section of this article](https://www.smashingmagazine.com/2013/11/an-introduction-to-dom-events/). 

---
### Setup
<br>

- Move to today's directory in the class repo.

- Create a folder named `events-practice` and `cd` into it.

- Touch an `index.html` and use `! [tab]` to create the HTML boilerplate.

- Make a `js` folder and touch a `js/main.js` file.

---
### Setup
<br>

- Add a `<script>` tag to include `main.js` in the `<head>`:

	```html
	<head>
	  ...
	  <title>Events Practice</title>
	  <script defer src="js/main.js"></script>
	</head>
	```

- The `defer` attribute ensures the DOM is ready before the script executes.

- Putting a temporary `alert('js loaded)` will verify `main.js` is being loaded.

---
### Our first Event Listener
<br>

- <p>After setting up the project, add the following HTML:</p>

	```html
	<h3>Comments</h3>
	<ul>
	  <li>SEI Rocks!</li>
	</ul>
	<input>
	<button>Add Comment</button>
	```

---
### Our first Event Listener
<br>

- When we click the **Add Comment** button, we want to create a new comment with the text entered in the input and then clear the input.

- We can add a `click` event listener to pretty much any element - not just buttons.  However, buttons are pre-styled to look and act clickable :)

---
### Our first Event Listener
<br>

- <p>We're going to use an anonymous callback function in this first example:</p>

	```js
	const btn = document.querySelector('button');
	btn.addEventListener('click', function(evt) {
	  // testing!
	  console.log(evt);  
	});
	``` 

---
### Our first Event Listener
<br>

- If all goes well, clicking the button should log out the **event object**.

- Congrats, registering an event listener is that easy!

---
### Review Questions
<br>

1. **What is the name of the method used to attach event listeners to elements?**

2. **What is that method's _signature_ (a method's name, the number & type of arguments it takes, and what it returns)?**

3. **Name three events that might be triggered in the browser.**

---
### The _event object_
<br>

- Examining the **event object** that was provided as an argument to our event listener reveals lots of useful information about the event!

- Of special interest are:
	- Several `...X` and `...Y` properties that provide where the click occurred.
	- The `target` property, which holds a reference to the DOM element that triggered (dispatched) the event.
	- Note that JS's `this` keyword within the listener function will be set to the DOM element that `addEventListener` was called on.

---
### Creating a new _\<<span style="text-transform:lowercase">li</span>>_ element
<br>

- If we want to add a new comment, we're going to need to create a new `<li>` element.

- Here's how we can do it using the `document.createElement` method:

	```js
	btn.addEventListener('click', function(evt) {
	  const li = document.createElement('li');
	  console.log(li)
	});
	```
	> Note: At this point, the element is "in memory" only and is not part of the DOM (yet).

---
### Creating a new Comment

- Okay, we have a new `<li>` element created and assigned to a variable named `li`, but it has no content.

- We want to get whatever text the user has typed into the `<input>` element. 

- As an exercise, find the property that holds the content of an `<input>`.

- Hint: "Select" the `<input>`, `console.dir` it out and explore!

- When you find the property - reply to my message in slack!

---
### Creating a new Comment
<br>

- So, now we can set the `textContent` of the new `<li>`:

	```js
	btn.addEventListener('click', function(evt) {
	  const li = document.createElement('li');
	  const inp = document.querySelector('input');
	  li.textContent = inp.value;
	});
	```

---
### Creating a new Comment
<br>

- Now the new `<li>` is ready to be added to the DOM!

- **Which element do we we want to add the `<li>` to?**
	
---
### Creating a new Comment
<br>

- There are several ways to add DOM elements to the document using JavaScript.

- A common way to add new elements to another element is by using the `appendChild` method like this:

	```js
	  li.textContent = inp.value;
	  // new code below
	  document.querySelector('ul').appendChild(li);
	});
	```
	Note that the new element is appended as the last child.

---
### Creating a new Comment
<br>

- Test it out - nice!

- The new comment has been added, but if we want to improve the UX, we have one more task - clear out the `<input>`.

- One line of code is all it takes - you got this!

---
### Event bubbling
<br>

- When an event occurs on an element, that event, whether it is listened to on that element or not, _bubbles_ up through the DOM, all the way up to the `document` object.

<img src="https://i.imgur.com/B7f5PAZ.png" width="900">

---
### Event bubbling
<br>

- All event listeners registered for the same event, such as `click`, will be invoked along the path to the `document` element - unless one of those listeners calls the **event object**'s `stopPropagation` method.

- Why does JS bubble up (propagate) its events?...

---
### Event Delegation
<br>

- Imagine a web app, like a game perhaps, with lots of elements that need to respond to a click. It's possible there could be tens, hundreds or more of these elements.

- That would be a lot of listeners, wouldn't it - not very efficient at all.

- Plus, every time a new element is added, the event listener would also have to be registered!

---
### Event Delegation
<br>

- Event bubbling allows us to implement what's known as **event delegation**.

- Event delegation allows us to register a **single** event listener that can respond to events triggered by any of its **descendants**.  Much more efficient!

---
### Event Delegation
<br>

- Let's register a listener (this time for kicks we'll use a named function) on the `<ul>` that can respond to clicks on any of its `<li>`s:

	```js
	document.querySelector('ul')
	  .addEventListener('click', handleClick);
	
	function handleClick(evt) {
	  console.log(evt);
	}
	```

- Importantly, the event object's `target` property is set to the **actual** element that was clicked!

---
### Event Delegation
<br>

- Not only is event delegation more efficient, by it's very design, it's dynamic - as descendants are added, they too will be listened to!

- Without event delegation, you would have to register a listener every time a new element, such as our comment `<li>` is added. 

---
### Event Delegation (Practice)
<br>

- **Practice: Write the code to change the color of the text of a clicked comment.**

- Hint: DOM elements have a `style` property that's an object with the CSS properties (named using camel-casing), e.g., `myLi.style.fontSize`.

---
### Removing event listeners
<br>

- It's possible to remove an added event listener, however, only if a named function was used as the callback:

	```js
	btn.removeEventListener('click', handleClick);
	```
	This would remove the 'click' event listener (`handleClick`) that was registered on the `btn` element like this:<br>
	`btn.addEventListener('click', handleClick);`

---
### Essential Questions
<br>

1. **What is the argument that JS passes to an event listener when it calls it?**

2. **What is the name of the property on the above argument that represents the DOM element that dispatched the event?**

3. **Let's say you needed to have an event listener respond to a `click` event on the `<td>`s within a `<table>` - would you have to add event listeners to each `<td>`?  Support your answer.**

---
## References
<br>

- [Event Developer Guide on MDN](https://developer.mozilla.org/en-US/docs/Web/Guide/Events)