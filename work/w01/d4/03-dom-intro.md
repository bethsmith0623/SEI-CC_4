View as a presentation by clicking [here](https://presentations.generalassemb.ly/cd6ebd2976e5ca71898c1e69c6beccfb#/1)

---

<img src="https://i.imgur.com/ijRQ97Z.jpg" width="300">

# Into to the DOM

---
## Learning Objectives
<br>

<p>Students Will Be Able To:</p>

- Use DevTools to Explore the DOM
- Select a Single Element in the DOM
- Select Multiple Elements in the DOM
- Change the Content of an Element
- Change the Style of an Element
- Manipulate the Attributes of an Element
- Manipulate the Classes of an Element
- Iterate Over a Collection of Elements

---
## Roadmap
<br>

- What's the DOM?
- Setup
- Using DevTools to Explore the DOM
- Selecting DOM Elements
- Select a single element by its `id`
- Select a single element using a CSS selector
- Change the content of an element
- Change the style of an element
- Attributes of an element
- Attributes of an element - Classes
- Selecting multiple elements
- Iterating over a collection of elements

---
### What's the DOM
<br>

- The [DOM (Document Object Model)](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction) is the in-memory representation of a browser's web document.

- It's a tree-like data structure with the top (root) being the `document` object.

- Let's `console.log(document)` in DevTool's console and explore some of its properties.

---
### What's the DOM
<br>

- The DOM's application programming interface ([API](https://en.wikipedia.org/wiki/Application_programming_interface)) enables developers to make the UI dynamic by using JavaScript to:
	-  Add/remove elements to/from the document
	-  Change the content of elements
	-  Change the style properties of elements

---
### Setup
<br>

- Move to today's directory in the class repo.

- Create a folder named `dom-practice` and `cd` into it.

- Touch an `index.html` and use `! [tab]` to create the HTML boilerplate.

- Make a `js` folder and touch a `js/main.js` file.

---
### Setup
<br>

- Add a `<script>` tag to include `main.js` in the `<head>`:

	```html
	<head>
	  ...
	  <title>DOM Practice</title>
	  <script defer src="js/main.js"></script>
	</head>
	```

- The `defer` attribute ensures the DOM is ready before the script executes.

---
### Setup
<br>

- Finally, let's add an `<h1>` inside of the `<body>` as follows:

	```html
	...
	<body>
	  <h1 id="title" class="main-title">DOM Practice</h1>
	  
	</body>
	</html>
	```

- Note: It's a best practice to use double quotes and<br>kebob-casing in the HTML.

---
### Using DevTools to Explore the DOM
<br>

- First let's install the **open in browser** VS Code extension so that we can open HTML pages in the browser a keyboard shortcut of `option-b`.

- After `index.html` is opened in Chrome, use the keyboard shortcut of `option-command-i` to open Chrome's DevTools.

---
### Using DevTools to Explore the DOM
<br>

- Click on the **Elements** tab to browse the DOM.

- To try it out, first select the `h1` element and use the **Styles** panel to add a CSS property of `color: red;`

<img src="https://i.imgur.com/RAvgNl0.png">

---
### Using DevTools to Explore the DOM
<br>

- Look closely after the closing `</h1>` tag - you see that _`== $0`_?

- That tells us that Chrome has created a variable named `$0` that represents the `<h1>` element in the DOM!

- Click on the **Console** tab and let's explore the properties on the `$0` object by typing `dir($0)`.

- Now try typing this in: `$0.style.backgroundColor = 'yellow'`

- Now that's what I call a DOM!

---
### Selecting DOM Elements
<br>

- Web devs make web pages dynamic by manipulating the DOM.

- For example, in a To Do app, the user types a new todo into an input, clicks a button and the new todo is added to the list.

- The above scenario requires the app's JS to:
	-  Attach an event listener to the button element
	-  Grab the text entered from the `input` element
	-  Create a new element, e.g. an `li`, and set it's content
	-  Append the new element to its parent element

- Devs must use JS to select DOM elements so that the above steps can be performed!

---
### Select a single element by its _id_
<br>

- The `getElementById` method is the most efficient way to select a DOM element if it has an `id` assigned to it.

	```js
	let titleEl = document.getElementById('title');
	console.log(titleEl);
	```

- Note that, unlike we do in CSS, we do not put a # in front of the `id` when using `getElementById`.

- If you'd like to be able to explore the properties of element, use `console.dir()` instead.

- But what if the element doesn't have an id...

---
### Select a single element using a<br>CSS selector
<br>

- The solution is to use the `querySelector(selector)` method that is available on the `document` object (and elements themselves).

- The _selector_ argument is a string that follows the rules of regular CSS3 selectors.

- The CSS3 selector language offers amazing power to target elements for selection!

---
### Select a single element using a<br>CSS selector
<br>

- Knowing that the _selector_ provided to `querySelector(selector)` follows the rules of CSS3 selectors, **how could we modify our code to select our `<h1>` element by its id?**

- If the CSS selector provided to `querySelector()` matches multiple elements, it returns the **"first"** matching element.

- If no matching node is found, `null` is returned.

---
### 💪 Practice
<br>

- In _index.html_, add a `<p>` tag below the `<h1>` and give it a class of _cool_, then...

- Add some content inside of the `<p>` tag - try typing `lorem [tab]` to emit (using _emmet_) random _lorem ipsum_ text.

- Use `querySelector()` to select the first element with a class of _cool_ and assign it to a variable named `pEl`.

- **Verify that the `<p>` element was selected by logging out `pEl`.**

---
### Change the content of an element
<br>

- Now that we're able to select an element of our choosing, let's see how we can change the content of that element.

- By inspecting the properties of a DOM element in the console, we will find a couple of properties that we can use to read and set its content:
	- **`innerHTML`** - Used to retrieve/set content as HTML
	- **`textContent`** - Used to retrieve/set content as plain text

---
### Change the content of an element
<br>

- Let's check out changing the content of the `<p>` element by assigning the string **`Comments for <strong>Today</strong>`** first to `textContent`, then to `innerHTML`.

- So, as you saw, if you want to include HTML in the content, use `innerHTML`.

---
### Change the content of an element
<br>

- The power of `innerHTML` may not be obvious, but consider the string can be as complex as you want - containing multiple elements with attributes, etc.

- However, using `textContent` is more efficient if just setting text.

---
### Change the style of an element
<br>

- DOM elements have a `style` property that can be used to set CSS styling!

- Check out the CSS properties in the console.

- **What naming convention is used for CSS properties in the DOM?**

- **What naming convention is used for CSS properties in CSS?**

- **Why is it different?**

---
### Change the style of an element
<br>

- This is how we can set the `text-align` CSS property of our title:

	```js
	let titleEl = document.getElementById('title');
	titleEl.style.textAlign = 'center';
	```

- **Your turn:** Change the `color` of the `<p>` element to a color of your choosing.

---
### Attributes of an element
<br>

- You may need to get, set, or check if an element has a certain _attribute_.

- Here are a few of the methods that the [Element API](https://developer.mozilla.org/en-US/docs/Web/API/element) (Application Programming Interface) has for working with an element's attributes:
	- `getAttribute(name)`
	- `setAttribute(name, value)`
	- `hasAttribute(name)`

---
### Attributes of an element<br>💪 Practice (5 mins)
<br>

- Add an `<a>` tag to `index.html` with content of "Visit Google" but **without an `href` attribute**.

- Reload the page and verify that the link does not work (in fact, it probably doesn't even look like a link).

- In the JS, write the line of code that will add an `href` attribute that will make the link navigate to "https://www.google.com".

- Hint: Check out the previous slide

---
### Attributes of an element - Classes
<br>

- Technically, you could use those attribute methods we saw to work with an element's classes.

- However, the `classList` property offers a better approach. It's an object with the following methods pertaining to classes:
	- `add(className, className, ...)` 
	- `remove(className, className, ...)`
	- `toggle(className)`
	- `contains(className)`
	- `replace(oldClass, newClass)`

---
### Review Questions
<br>

- **If we want to change the text (no HTML) inside of a `<div>`, what property should we set?**

- **How many DOM elements are returned by the `querySelector` method?**

- **What DOM element property is used to style a DOM element?**

---
### Selecting multiple elements
<br>

- Before we checkout selecting multiple elements, let's add the following HTML below the existing `<p>` element:

	```html
	<ul id="comments">
	  <li class="comment">first comment</li>
	  <li class="comment">second comment</li>
	  <li class="comment">third comment</li>
	</ul>
	```

- VS Code includes [Emmet](https://docs.emmet.io/abbreviations/syntax/), which is a great tool for quickly generating markup. Type the following to generate most of the markup above:<br>`ul#comments>li.comment{comment}*3`

---
### Selecting multiple elements
<br>

- The following methods _can_ be used to select multiple elements:
	- `getElementsByTagName(namesString)`
	- `getElementsByClassName(namesString)`

- The above methods return a **live** [HTMLCollection](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCollection).

- Although it's pretty cool that the returned list is automatically updated to include/exclude DOM elements as the DOM is updated, the above methods are not as flexible as the `querySelectorAll` method...

---
### Selecting multiple elements
<br>

- Like `querySelector`, the `querySelectorAll(selector)` method uses the power of CSS3 selectors to specify which DOM elements we want returned.

- Of course, like the name says, it selects **all** DOM elements that match the _selector_.

- By itself, `querySelectorAll` actually provides all the DOM selection power a web dev needs!

---
### Select multiple elements with<br><span style="text-transform: lowercase">query</span>S<span style="text-transform: lowercase">elector</span>A<span style="text-transform: lowercase">ll</span>
<br>

- **You Do:** Use `querySelectorAll` to select all of the elements with a class of `comment` and assign to a variable named `commentEls`.

- `console.log(commentEls)` to verify it worked. 

---
### DOM Selection Summary
<br>

- In summary, use the following to help you decide which method to use to select DOM elements:
	- **getElementById**: Use when you need to select a single element that has an `id` assigned to it.
	- **querySelector**: Use when you need to select a single element that **does not** have an `id`.
	- **querySelectorAll**: Use when you need to select multiple elements.

---
### Iterating over a collection of elements
<br>

- `querySelectorAll` returns an array-like object called a [NodeList](https://developer.mozilla.org/en-US/docs/Web/API/NodeList).

- There are three approaches we can use to iterate over the elements in a _NodeList_ :
	- A regular **`for`** loop - works, but is not as readable or elegant...
	- The **`forEach`** method. A good option when you want to iterate through _all_ elements and also want to access the **index** of the iteration.
	- A **`for of`** loop - elegant and allows early exit of the loop with the `break` statement, however, does not have access to an **index** (although you could track indexes manually by initializing a separate variable before the loop and incrementing it within the loop).

---
### Iterating over a collection of elements
<br>

- Let's type this `for...of` loop in the console to log each element:

	```js
	for(let commentEl of commentEls) {
		console.log(commentEl);
	}
	```

- **You Do:** Add a `for...of` loop to `main.js` that changes the font size all of the comment elements to 30px.

- Hint: You must use a string like `'30px'` (just the number `30` or the string of `'30'` will not work). 

---
### Final Questions

1. **What method is the most efficient for selecting an element that has an `id`?**

2. **If we wanted to grab all of the content (including its nested elements) of an element, what property on that element would we use?**

3. **If you had to pick only one method to select DOM elements with during your career as a developer, which one should you choose?**

4. **Which property on DOM elements is used to set the CSS properties for that element?**

---
## References
<br>

- [Locating DOM Elements using Selectors](https://developer.mozilla.org/en-US/docs/Web/API/Document_object_model/Locating_DOM_elements_using_selectors)

- [Intro to the DOM on MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction)
