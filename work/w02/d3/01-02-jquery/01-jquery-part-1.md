![](https://i.imgur.com/Ga2O5gM.png)
# Intro to jQuery 

| Learning Objectives - SWBAT:
| :---
| Explain the use case for jQuery
| Include jQuery in projects 
| Use the jQuery function to select DOM Elements
| Access the elements in a jQuery Object/Set
| Use jQuery to modify content of elements
| Use jQuery to modify the CSS of elements

## Roadmap
1. What is jQuery?
2. Setting up jQuery
3. Selecting Elements with jQuery
4. The jQuery Object/Set
5. Modifying the Content of Elements
6. Modifying the CSS of Elements
7. Further Study

## 1. What is jQuery?

### JavaScript Library

- jQuery is an open-source JavaScript **library** designed to make front-end development more productive and satisfying.

- Created by John Resig in 2006.

- jQuery is the world's most popular JS library with more than 55% of the top 10,000 websites using it.

BTW, you'll see the terms _library_ and _framework_ often used interchangably. Yes, these two terms are similar, however, there is a subtle difference:

- Libraries, such as _jQuery_ and _lodash_ are focused on providing a set of utility or helper methods to make programming more efficient.
- Frameworks are more comprehensive, providing capabilities not found in utility JS libraries.
- Frameworks often use libraries to implement their features. But, you'll never find a library using a framework.
- For an analogy, you can think of libraries as the tools and frameworks as the construction crew.

### Why Use jQuery?

- **Browser Incompatibility**: jQuery provides a layer of abstraction that allows us not to worry about cross-browser compatibility issues. This, more than anything else, led to the widespread adoption of jQuery.  Developers no longer had to detect what browser their app was running in and code a bunch of if-else statements containing different code to do the same thing. However, today's modern browsers's Web APIs are very compatible.
- **Productivity**: jQuery makes us more productive developers. jQuery's motto is:<br>_"write less, do more"_
- **Satisfaction**: Many developers consider using jQuery to be more "fun" than writing plain vanilla JS.

> Today's vanilla JS, the Fetch API, CSS animations, and the popularity of front-end frameworks such as React have resulted in a huge decline in jQuery's usage on new projects.  However, as of now, it's still a skill that you want on your resume.

### What Can jQuery Do?

First, there is nothing jQuery can do that can't be accomplished with native vanilla JavaScript. This makes sense because jQuery **has** to use JS to do what it does.

Okay, so _what_ can it do?

- Manipulate DOM elements with ease.
- Perform simple animations.
- Make binding to events more powerful.
- Communicate with servers via AJAX (asynchronous JS and XML).

### jQuery Documentation

[jQuery's main documentation](http://api.jquery.com/) can be unwieldy.

Those new to jQuery are best served by jQuery's newer [Learning Center](http://learn.jquery.com/) as the first reference.

##### REVIEW QUESTIONS

**❓ What is the difference between a _library_ and a _framework_?**

**❓ What is the use case for jQuery? (what and when/why...)**

## 2. Setting up jQuery

### Create a Directory and Files

Lets create an _index.html_ page inside of a project directory called _first-jquery_:

With Terminal in a your daily working directory:

```
mkdir first-jquery
cd first-jquery
touch index.html
```

Then open the project directory in your code editor.

### HTML Boilerplate

Create your HTML boilerplate - you got this!

### Including jQuery

To use any JavaScript library in our web app, we need to ensure that the script files are included in _index.html_.

There are two ways we can include jQuery:

- [Download jQuery](http://jquery.com/download/) and save it somewhere within our project folder. Then use the familiar `<script>` tag like this:
  
  ```js
  <script src="js/jquery-3.2.1.min.js"></script>
  ```
- Use a [CDN](https://en.wikipedia.org/wiki/Content_delivery_network) (content delivery network) like this:

   ```js
   <script
  		src="https://code.jquery.com/jquery-3.2.1.min.js"
  		integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4="
  		crossorigin="anonymous"></script>
   ```

Downloading libraries and saving them to a folder in your project allows you to work with your project without an internet connection.

However, using a CDN can provide performance benefits (especially on mobile devices) and save storage & bandwidth on your server.

Let's use a CDN to load the jQuery library:

```html
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>Intro to jQuery</title>
  <script src="https://code.jquery.com/jquery-3.2.1.min.js" integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=" crossorigin="anonymous"></script>
</head>
```

### Sample HTML

Now let's throw in some meaningless HTML that we can play with during the lesson. Copy and paste the following HTML between the `<body>` tags:

```html
<h1>Intro to jQuery</h1>
  
<div id="outer">
  Outer div
  <div id="inner" class="big-and-round">
    Inner div
  </div>
</div>
  
<p>Things we can do with jQuery:</p>
<ul>
  <li>Make it easier to select DOM elements and navigate between them</li>
  <li>Make it easier to modify properties of selected DOM elements.</li>
  <li>Easily create simple animations.</li>
  <li class="special-li">Make binding to events more powerful.</li>
  <li>Make it easier to create apps that use AJAX (asynchronous JS and XML), in other words dynamically get data from, and send data to, servers.</li>
</ul>
```

## 3. Selecting Elements with jQuery

Before we can change the properties of DOM elements, we must first _select_ them.

You've already had some practice doing this with native JavaScript.

**Q: What native JS methods have we used to select elements in the DOM?**

### The _jQuery_ Function, aka - `$()`

The _jQuery function_ provides different functionality - depending upon what we pass to it.

The function `$()` is actually a shorthand alias for a function named `jQuery()`.

### Using `$()` to Select Elements

To select elements, we pass `$()` a string argument that represents a CSS3 selector, just like we did using `querySelector` & `querySelectorAll`. jQuery also has some non-standard selectors of its own.

Here is a nice summary of the ways we can select elements using the jQuery function:

<img src="https://i.imgur.com/AqB9VL3.jpg">

To select elements by the _type_ of the element, use the name of the tag, just like CSS. This would select all `<h1>` tags:<br>
`$('h1')`

All CSS3 selectors rules apply. For example, this is how you could select just the first `<li>` tag using the `:first-child` _psuedo class selector_<br>
`$('li:first-child')`

##### 💪 PRACTICE EXERCISE

In Chrome's console (`cmd-opt-J`), use jQuery to select the `<div>` that have a class of `big-and-round`.

Unlike selection using `querySelectorAll`, which returns a `NodeList`, the jQuery `$()` returns something a little more powerful...

## 4. The jQuery Object/Set

The jQuery selector function, `$()`, returns a special object, known as the **jQuery Object**, AKA a **jQuery set** or **wrapped set** because it "wraps" the selected DOM elements and provides them with jQuery's super-power methods:

<img src="https://i.imgur.com/Nmz13Kd.png">

Let's check out the structure of the _jQuery Object_. First, let's create a _jQuery Object_ using `$()` to select all of the `<li>` elements in the console:

```
> var $li = $('li');
< undefined
> dir($li)
< [...]  
```

> Note the naming convention for variables used to hold a jQuery object is to start the name with a `$`. It is highly recommended that you follow this best-practice if you use jQuery in your projects. However, there's nothing special about the `$` - to JS it's just like any other character used to name a variable. 

Exploring `$li` in the console will reveal that it is an array-like object with lots of functionality - just look at all those methods in the `__proto__` (link to an object's prototype)!

To check how many elements a jQuery set contains in its array, we can use its `length` property:

```
> $li.length
< 5
```

Let's see what an element within the _jQuery Object_ array holds:

```
> $li[0]
< <li>...
```

Aha! Each element in the array is a **native DOM element just like the ones we worked with in vanilla JS last week.**.

##### REVIEW QUESTIONS

**❓ What does the jQuery function return when it is passed a string representing a CSS3 selector rule?**

**❓ The _jQuery Object_ contains an array of zero or more native _____ ______.**

### Accessing the Native DOM Elements in a jQuery Object

As we've seen, the _jQuery Object_ contains an array of the selected native DOM elements.

Those DOM elements can be accessed using bracket notation like with any other array.

##### 💪 PRACTICE EXERCISE

Assuming you don't know how many `<li>` DOM elements are contained in the `$li` jQuery set, assign the last `<li>` in `$li` to a variable named `lastLi`.

### Adding jQuery Powers to Native DOM Elements

Although native DOM elements have numerous useful methods and properties by default, they don't have jQuery's shortcuts and super powers like these:

```
> $li.fadeOut()
> $li.fadeIn()
```

Luckily, we can turn any regular DOM element into a super-powered jQuery object by wrapping it in the jQuery function.  Still in the console, type...

```js
// Set a var to reference a raw DOM element
var li = $li[0];

// Bummer, no super powers
li.fadeOut(); // causes an error

// Turn it into a jQuery object with super powers!
var $el = $(li);
$el.fadeOut();  // see you later alligator
// Example using chaining 
$(li).fadeIn();  // back so soon?

// More big fun...
$el.hide();
$el.show();
$el.toggle();
// A callback can be provided too!
$el.toggle(function() {
  console.log('done being toggled!');
});
```

### Iterating Elements in a jQuery Object

Although the jQuery object is an array-like object, it does not have the built-in handy array methods like `forEach()`. However, jQuery usually provides it's own methods, typically named using less characters :)
 
Instead of `forEach()`, jQuery provides the `each()` method on the jQuery set that can be used to iterate over each raw DOM element:

```js
$('li').each(function(idx) {
  console.log( idx + ': ' + this.innerHTML );
});
```

Note that the `each()` method passes in an argument to the callback representing the index of the current iteration. **How is this different from an array's `forEach()` method?**

Additionally, jQuery has set the `this` keyword to point to the iteration's current native DOM element.

### The jQuery `eq()` Method

The `eq()` method can be used to index into the array of DOM elements like we did using square brackets.  However, `eq()` automatically wraps the DOM element in a jQuery object with all of the magic:

```js
var $li = $('li');

// Fade out just the second <li>
$li.eq(1).fadeOut();
```

## 5. Modifying the Content of Elements

[This page from the Learning Center](http://learn.jquery.com/using-jquery-core/manipulating-elements/) contains methods and techniques we can use to manipulate elements.

### The `html()` Method

jQuery's `html()` method is used for both getting & setting a DOM element's `innerHTML` property.

Here's how we can use jQuery to change the text of the "inner" `<div>` from "Inner div" to "jQuery Rocks!":

```js
$('#inner').html('jQuery Rocks!');
```

When using a setter to modify the DOM, the change applies to **all elements in the jQuery set**. For example:

```js
// Change the content of all <li>'s
$('li').html('Hello SEI');
```

That's pretty powerful stuff and would have required a little more code to accomplish without jQuery.

> Note that native JS uses a **_data property_**, `innerHTML`, whereas jQuery uses the `html()` **_method_**.

### Getters & Setters

Many of jQuery's methods are designed to both **get** and **set** data on an element.

Whether a method behaves as a **_getter_** or **_setter_** depends upon the arguments passed to it.

For example, the `html()` method:

- `html()`: No arguments, behaves as a getter
- `html('new value')`: One argument, behaves as a setter

> Note: In programming, when the same method performs different functionality when a different number and/or type of argument(s) are provided, we say that the method has been **overloaded**.

## 6. Modifying the CSS of Elements

### The `css()` Method

jQuery has a `css()` method used to get and set the CSS properties of elements.

Here's how we can change the `color` and `font-weight` on all of the `<li>` elements:
 
```js
$('li').css( { color: 'green', 'font-weight': 'bold' } );
```

Above we have passed the `css()` method an **object** where the keys represent the CSS property.

Notice how we had to write the key `font-weight` as a string - **why is this?**

You can also use the _normalized_ names of the properties we've seen on the `style` property of DOM elements:

```js
$('li').css( { color: 'green', fontWeight: 'bold' } );
```

The `css()` method also has a different _signature_ that can be used to set a single CSS property at a time:

```js
$('p').css('font-size', '30px');
```

##### 💪 PRACTICE EXERCISE

In the console, write the code that will set the background color of _only the last_ `<li>` element to yellow.

### Chaining Methods

Each jQuery method, **when used as a setter**, returns the updated jQuery object.  This allows us to **"chain"** methods like this:

```js
// Change our <p> tag's content and color
$('p').html('Awesome things jQuery can do:').css('background-color', 'peachpuff');
```

Often, you will see method chaining indented like this to enhance readability:

```js
// Change our <p> tag's content and color
$('p')
  .html('Awesome things jQuery can do:')
  .css('background-color', 'peachpuff');
```

##### REVIEW QUESTIONS

**❓ What jQuery method can be used to both get & set the content of the elements held in a jQuery object?**

**❓ What jQuery method is used to change the styling of the elements held in a jQuery object?**

## 7. Further Study

### jQuery Plugins

There are lots of "plugins" available for jQuery that provide all sorts of functionality, such as UI components:


[jQuery Plugin Registry](https://plugins.jquery.com/)

### Code Minification

Often you will see library and framework files end with `.min.js`. This is a naming convention used to signify that the code has been _minified_.

Minification is the process of making a javascript file smaller by removing all line breaks and whitespace, reducing the length of variable and function names, and stripping out all comments.

The **benefits** of using minified versions of libraries is that they use less memory; and take less time to load, parse and execute since they are significantly smaller - usually around a third in size.

The **downside** of using minified code is that it can't easily be understood or debugged. We won't have to worry about debugging jQuery, but reading source code is a great way to learn coding techniques and in this case you would want to use the non-minified versions.

## References

[Official jQuery website](https://jquery.com/)

[jQuery Learning Center](http://learn.jquery.com/)

