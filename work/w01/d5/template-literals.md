# ES2015 Template Literals Walk-thru

## What are they?

**Template literals** are part of the ES2015 specification.

Template literals are another way to **define** and **use** strings in JavaScript.

Of course, you're already familiar with using single-quotes to delimit strings:

```js
var myString = 'This is my string';
```

and double-quotes:
 
```js
var myString = "This is my string";
```

Now we can use the back-tick (below the [esc] key) too:

```js
var myString = `This is my string`;
```

Why a third option?  Read on...

## Features

Let's look at the features template literals provide...

### String (expression) Interpolation

One of the most enjoyable things we do as developers is concatenating string after string after string... Not!

```js
var person = {
  firstName: 'Chuck',
  lastName: 'Norris',
  age: 77,
  note: 'bad ass'
};

var result = person.firstName + ' ' + person.lastName + ' is ' +
	person.age + ' years old and is a ' + person.note + '.';
	
// Chuck Norris is 77 years old and is a bad ass.
```

Using template literals, we can "embed" JS expressions within the string like this:

```js
var result = `${person.firstName} ${person.lastName} is ${person.age} years old and is a ${person.note}.`;
	
// Chuck Norris is 77 years old and is a bad ass.
```

Any JS expression, including function calls, can be inserted between the `${` and `}` characters.

### Multi-Line Strings

In non-template literals, we could create line breaks using the newline character - `\n`:

```js
var twoLines = 'This is line one.\nThis is line two.';
```

However, you will get a syntax error if you try this:

```js
var twoLines = 'This is line one.
This is line two.';
```

But not with template literals!

```js
var twoLines = `This is line one.
This is line two.`;
```

In fact, all white space is honored within template literals. This can be convenient when the time comes to define HTML within a string:

```js
var htmlTemplate =
`
<div class="panel">
	<div class="title">Good Title</div>
	<div class="content">
		<p>This is really good stuff!</p>
		<p>I mean, it's simply amazing...</p>
	</div>
</div>
`;
```

### Tagged Template Literals

Tagging template literals is an advanced use case of template literals.

Basically, you can preface a template literal with a function.  The function would then be called to process the template literal. This provides unlimited flexibility when transforming the literal.

However, their use is not common, thus we will not cover them here.  Be sure to read the docs if you're interested in learning more:

[MDN - Template Literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)
