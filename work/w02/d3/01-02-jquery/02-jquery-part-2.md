![](https://i.imgur.com/Ga2O5gM.png)
# jQuery - Part 2 

| Learning Objectives - SWBAT:
| :---
| Use jQuery to add & remove classes
| Use jQuery to modify attributes
| Use jQuery to add and remove DOM elements
| Bind to events with jQuery

## Roadmap

- Page Setup
- Adding & Removing Classes
- Creating New DOM Elements
- Modifying Attributes
- Adding Event Listeners
- More on DOM Manipulation
- Practice Challenge - Add New Homes

## Page Setup

### Create `js/app.js`

For this lesson, we're going to use the same `index.html` inside the `first-jquery` directory we created in the _Intro to jQuery_ lesson.

But let's create an `app.js` file inside of a `js` directory to put our JavaScript in:

```
mkdir js
touch js/app.js
```

### Load Order Matters

The browser parses JavaScript in the order it is loaded. So we have to be sure to load jQuery before any code that depends on it.

In our projects, a best practice load order looks like this:

1. jQuery -  has no dependencies, so load it first
2. Other third-party libraries (some might depend upon jQuery)
3. Third-party frameworks - for example, AngularJS
4. Finally, your application's `.js` file(s)

Let's take the above's advice and add our `app.js` **after** jQuery:

```html
<head>
  <!-- other stuff above -->
  <script
    src="https://code.jquery.com/jquery-3.2.1.min.js"
    integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4="
    crossorigin="anonymous"></script>
  <script defer src="js/app.js"></script>
</head>
```

### Sprinkle in Some CSS - Bootstrap

Let's also include the CDN of a popular CSS framework, [Bootstrap](http://getbootstrap.com/).

Bootstrap defines a 12-column layout grid, lots of pre-defined CSS classes for styling, components such as carousels, etc.

Here's what we should have so far:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>Intro to jQuery</title>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
  <!-- scripts below -->
</head>
<body>
    
</body>
</html>
```

[Bootstrap](http://getbootstrap.com/) also changes the default styling of most elements thus making your site more eye-pleasing out of the box.

### Starting HTML

Our sample app is going to display a list homes for sell in Lake Arrowhead.

Here's some HTML to get us started - **replace** the existing `<body>` tags with the following:

```html
<body class="container">

  <h1 class="jumbotron">Lake Arrowhead Homes For Sale</h1>

  <table id="homes" class="table">
    <thead>
      <tr>
        <th>Address</th>
        <th>Sq. Ft.</th>
        <th>Bedrooms</th>
        <th>Baths</th>
        <th>Price</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>27374 Matterhorn Drive</td>
        <td>1,664</td>
        <td>3</td>
        <td>2</td>
        <td>$279,500</td>
        <td><button class="btn btn-xs btn-danger">Remove</button></td>
      </tr>
      <tr>
        <td>243 El Dorado</td>
        <td>4,900</td>
        <td>6</td>
        <td>6.5</td>
        <td>$990,000</td>
        <td><button class="btn btn-xs btn-danger">Remove</button></td>
      </tr>
      <tr>
        <td>1228 Klondike Drive</td>
        <td>2,158</td>
        <td>4</td>
        <td>2.5</td>
        <td>$400,000</td>
        <td><button class="btn btn-xs btn-danger">Remove</button></td>
      </tr>
    </tbody>
  </table>
  <br>
  <button id="addHome" class="btn btn-danger">Add Home</button>

</body>
```

### Ensuring that the DOM is Ready

We've used the [defer Attribute](https://www.w3schools.com/tags/att_script_defer.asp) in the `<script>` tag in the `<head>` to ensure that the DOM is built before the JS runs.

However, jQuery has another option that you should be aware of:

```js
// the "document ready" approach 
$(document).ready(function() {
  // all of your app's js goes within this function
  alert("Everything is ready, let's do this");
});

// or, the shortcut version
$(function(){
  // all of your app's js goes within this function
  alert("Everything is ready, let's do this");
});
```

**?: Since all of the app's code will be within the callback function, what impact does this have in terms of scope?**

### Open it Up!

We're all set to get started. If you have the _Open in Browser_ VS Code extension installed, you can right-click anywhere on `index.html` and select `Open in Browser`, or better yet press `[option] + B`.

Your page should load and the alert should appear.

## Adding & Removing Classes<small> (10 mins)</small>

<img src="https://i.imgur.com/li8qvF7.png">

Somebody messed up and styled our _Add Home_ button with Bootstrap's `btn-danger` class making it red. We may be code junkies, but even we know that a button that adds something new should probably be colored something other than red. Let's make it green instead. 

Change the button from red to green by removing the `btn-danger` class and adding the `btn-success` class with jQuery:

```js
$('#addHome').removeClass('btn-danger').addClass('btn-success');
```
That's better!

**Q: What's it called when we call a method immediately after a previous method like we did above?**

##### PRACTICE

**Using jQuery, add the Bootstrap class named "text-center" to the `<h1>` tag.**

> Note: In case you're wondering, "NO", we would not ordinarily style our page using jQuery :) We're doing this just to learn about jQuery. jQuery should be used to change styling dynamically as needed by the app.

### Does an Element have a class?

jQuery's has a `hasClass('<the class(es) as a string>')` method that returns `true`/`false` depending whether **any** of the elements in the wrapped set have the class(es):

For example:

```js
var isStyled = $('p').hasClass('left-aligned big');
// the isStyled var will be true if any <p> elements have 
// the classes of "left-aligned" and "big"
```

There's also a `toggleClass(<the class as a string>)` method - **guess what it does?**

## Creating New Elements

jQuery makes creating new elements easy. Lets add a hyperlink (`<a>`) to our page that, when clicked, takes our users to Zillow's website!

### New Element from an HTML String

As you've seen, the jQuery function performs different functionality depending upon its arguments.  Now let's see how it can create elements!

One way is to just provide a string representing the HTML to the jQuery function:

```js
// returns a jQuery set of new DOM elements
var $newLink = $( '<br><br><a id="zillowLink" href="http://www.zillow.com">Visit Zillow.com</a>' );
```

> Note that the jQuery function recognizes the fact that we are passing in a string that resembles HTML instead of a CSS selector - that's how it knows to create a new element instead of selecting elements. jQuery - you're so smart!

Remember that in programming, there are usually multiple ways to accomplish the same thing, for example, these three code examples are all equivalent ways of creating a`<p class="bold"></p>` element:

```js
var $p = $('<p class="bold">');
```

```js
var $p = $('<p>', {class: 'bold'});
```

```js
var $p = $('<p>').addClass('bold');
```

Which approach you use is up to you (or your boss).

### Adding the Element to the DOM

The `$newLink` variable now holds our newly created elements in memory, however, we still need to add them to the page. One of the ways is to use the `append()` method:

```js
$('body').append($newLink);
```

`append()` will insert new elements at the end, but still inside of the specified element's closing tag.

Other methods available include:

- `appendTo()`
- `insertBefore()`
- `insertAfter()`
- `before()`
- `after()`
- `prepend()`
- `prependTo()`

The practice challenge will provide an opportunity to practice adding elements...

### Check it Out

Refresh your page and there's the link!

However, we have a UX problem - the link navigates us away from our app. Wouldn't it be better instead to open Zillow in another tab? We'll do that in the next section!

## Modifying Attributes

jQuery makes it easy to add/modify the attributes of an element with the `attr()` method.

Lets use it to add a `target` attribute to our link:

```js
$('#zillowLink').attr( "target", "_blank" );
```
Refresh - Yay!!!

There's also a `removeAttr()` method we can use to remove attributes.

##### PAIR UP TO ANSWER THE FOLLOWING QUESTION

What line of code would `console.log` the value of the Zillow link's `href` attribute?

## Adding Event Listeners

### Basic Event Listeners

When our shiny green _Add Home_ button is clicked, we want to add one of the homes from an array that we will preloaded with a few homes.

Here is how we can add a _click_ event listener to the _Add Home_ button:

```js
$('#addHome').on('click', function(evt) {
  console.log(evt, this);
});
```

Refresh the page and open the console to see what the `evt` argument (jQuery's _event_ object) passed in by jQuery looks like.

Also, see what jQuery sets `this` to.

jQuery's _event_ object is pretty much the same as native JavaScript's - yes, it has all of the useful properties...

**Q: What property on the event object references the element that dispatched the event?**

When googling, you will find plenty of jQuery code using a different syntax for adding a event listeners similar to this:

```js
$('#addHome').click(function(evt){
  console.log(evt, this);
});
```

This syntax in fact uses the `.on` method internally.

> Note: Generally, more weight should be given to newer results when googling for answers to development questions.

[These docs](http://api.jquery.com/category/events/) has a complete list of event methods.

### Event Delegation

We already learned about _event delegation_ in native JavaScript.

**Q: Who can remind us what _event delegation_ is it?**

_Event delegation_ in jQuery is a bit more powerful because we can tell jQuery **which specific descendants** we're interested in listening to by specifying another CSS selector.

For example, if you would like to listen for clicks on only `<div>` elements with a class of `circle`, you could use jQuery to set a delegated event listener on the `<body>` as follows:

```js
$('body').on('click', 'div.circle', function() {
  // 'this' will be a <div> with a class of 'circle'
});
```

**Who notices the difference about the way we attach a delegated event listener in jQuery vs. vanilla JS?**

Taking advantage of _event delegation_ seems like a perfect approach for our _Remove_ buttons that are on each home.

One event listener, regardless of how many homes in our table?! Yes, thanks to event delegation!

We just need to decide on which **ancestor** element to attach the delegated event listener to so that all of the [Remove] `<button>`s are listened to...

Our best bet would be the `<tbody>` element within the `<table>` because it's the nearest common element of the buttons we want to listen to:

```js
$('#homes tbody').on('click', 'button', function() {
  console.log(this);
});
```

## More on DOM Manipulation

### Removing Elements

If our users click on the _Remove_ button, we obviously want to remove that home's row from the table:

```js
$('#homes tbody').on('click', 'button', function() {
  $(this).closest('tr').remove();
});
```

Because we want to remove the `<tr>`, not the `<button>` represented by `this`, we can use `closest('tr')` to move up through the ancestors until the first `<tr>` element is found.

Pretty cool!

> Take a look at the `.find()` and `.children()` methods if you need to look for the nearest descendent going down the DOM instead of up the DOM like we just saw using the `closest()` method.

### Removing Elements "Gracefully"

Currently, the sudden disappearance of the home's row is a little harsh. Let's use one of jQuery's built-in [effects](http://learn.jquery.com/effects/intro-to-effects/) to help us out:

```js
$('#homes tbody').on('click', 'button', function() {
  $(this).closest('tr').fadeOut(1000, function() {
    // now that the tr is hidden, let's completely remove it from the DOM
    $(this).remove();
  });
});
```

Here, we are taking advantage of the fact that we can provide a callback function to the `fadeOut` method to be called once the fade is complete.

That's better!

## Practice Exercise - Add New Homes

Now for a fun challenge.

You've already seen everything you need to make this happen! jQuery's there for you and Google and your fellow students are your friend.

### Goal

When the "Add Home" button is clicked:

1. Take a home out of an array of home objects (see below)
2. Append a row containing the data for the home to the table.

First, copy this array of new home data to your script:

```js
var newHomes = [
  {address: "27569 Cedarwood Drive", sf: "2,535", bedrooms: 3, baths: 2.5, price: "$496,500"},
  {address: "316 Annandale Drive", sf: "1,326", bedrooms: 4, baths: 2, price: "$275,000"},
  {address: "251 Grandview Road", sf: "3,800", bedrooms: 3, baths: 2, price: "$699,900"},
  {address: "28571 Manitoba", sf: "2,960", bedrooms: 4, baths: 3.5, price: "$775,000"}
];
```

### Hints:

- Don't forget that the jQuery function can create HTML by passing in a string that looks like HTML - just like we did when we added the Zillow hyperlink earlier in the lesson. This string of HTML can include everything you want to be inserted, the cells, classes, content, button, etc.
- You can use DevTools to inspect an existing row and copy its text to use as a "template" for the string used to create the new row.
- Consider using a template literal to interpolate the values of the home object's properties into the string before passing to the jQuery function.
- It always helps to pseudocode (write the coding steps in plain, non-technical English).

### Bonus Challenge

- Disable the _Add Home_ button if there are no more homes in the array.

### Super Bonus Challenge

- Add a button, that when clicked, restores all previously removed homes and appends them to the bottom of the table.

	Hint: When you remove an element like we did with the `<tr>`s, they are returned by the `remove` method.

## References

[Manipulating Elements - jQuery Learning Center](http://learn.jquery.com/using-jquery-core/manipulating-elements/)

[jQuery Learning Center](https://learn.jquery.com/)

