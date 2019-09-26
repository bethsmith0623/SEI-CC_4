<img src="https://i.imgur.com/r8sIGie.jpg">

# Styling React Components
---

## Learning Objectives

| Students Will Be Able To: |
|---|
| Include external CSS frameworks |
| Style components using imported CSS |
| Style components using CSS Modules |
| Style components using inline styling |
| Use Flexbox for basic layouts |

## Roadmap

- Set Up
- Overview of Styling in React
- The Starter Code
- Adding External CSS Frameworks to a React App
- Importing CSS Stylesheets
- Importing CSS Modules
- Inline Styling With JavaScript
- CSS Stylesheets or Inline Styling?
- Essential Questions

## Set Up

To get set up for this lesson:

- `cd` into the `starter-code/react-mastermind` folder for this lesson.
- Open the project in VS Code: `$ code .`
- Open a terminal in VS Code (`ctrl + backtick`)
- Install the Node modules: `$ npm i`

## Overview of Styling in React

Like many things React, styling is done a little differently than what we've become accustomed to.

For example, when learning CSS we were told that inline styling should be avoided. Well, React actually encourages inline styling!

#### Options for Styling React Components

Today, we will look at a few of the more popular ways to style the components that comprise a React UI:

1. **Using CSS Stylesheets**: This is the approach that `create-react-app` uses with its `<App>` component.

2. **Using CSS Modules**: Similar to above, but different in a significant way.

3. **Using Inline Styling**: This approach uses the `style` prop.

## The Starter Code

It's the Mastermind app from where we left off in the _React State and Props_ lesson with a few additions:

- `<NewGameButton>` now renders a `<button>` instead of a `<div>`.

- A `getWinTries` method has been added to `<App>` and used in its `render` method to render the `<footer>` component's content.

- The `<GuessScore>` component is now being passed the guess object's `score` as a prop. The `score` object in turn is then being used to generate an array of **P**erfect, **A**lmost & **I**ncorrect characters that is then subsequently mapped and displayed using `<div>` components. 

In this lesson we will begin to apply the above styling approaches to style react-mastermind. Today's lab will be completing the styling for the app.

## Adding External CSS Frameworks to a React App

#### Loading Via CDN

If you want to use third-party CSS frameworks like Bootstrap, Materialize, etc., feel free to continue to link in the CDNs (both CSS and JS) as usual.

We don't really need Bootstrap for Mastermind, but we'll use its button styles just to check out how to use CDNs in a React app.

You will find the **index.html** in the **public** folder:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <title>React Mastermind</title>
  </head>
```

Let's change the `<title>` while we're at it!

Checking our app, we will see that Bootstrap is loaded because the header is now messed up due to Bootstrap setting the CSS `box-sizing` property to `border-box` instead of the default of `content-box`.

Let's fix the prob by updating **App.css** as follows:

```css
.App-header {
  background-color: #222;
  height: 50px;
  padding: 10px;
  color: white;
  font-size: 22px;
  text-align: center;
}
```

#### Using the Classes

With the Bootstrap framework now loaded, all of the classes it defines are available for use.

In React, we use the `className` prop to set class(es) on React Elements (`<div>`, `<p>`, etc.).

Check out the `<header>` in **App.js** for an example of using the `className` prop to  apply a CSS class.

If you inspect the elements in DevTools, you'll see that the `className` prop does indeed result in a `class` attribute being added to the DOM element.

> **KEY POINT**: Note that we can only style React's built-in HTML/DOM components (lowercase-named components). This is because they are the only components that actually get rendered to the DOM.

#### 💪 Practice Exercise

Quickly add Bootstrap's:

- `container` class to the `<body>` element in **public/index.html**. Be sure to use `class` not `className` because **index.html** is not a React component 😊.

- `btn` & `btn-default` classes to the `<NewGameButton>` component's UI. 

#### Loading Via NPM Packages

Using CDNs is usually the way to go, however, if you prefer enlarging your **bundle.js** and other static assets, increasing both load-time and bandwidth usage, you're in luck! Chances are your framework of choice is available as an NPM package.

Look [here](https://www.npmjs.com/package/bootstrap) if you'd like to install Bootstrap.

As a final note regarding external CSS frameworks, due to the popularity of React, component libraries that encapsulate a framework's styling into custom React components are available. Knowing how much you love Bootstrap, here's a [link to React-Bootstrap](https://react-bootstrap.github.io/).

#### Global Styling in React

There's a **src/index.css** file in the React project.

This is a great place to put "global" or application-wide styling.

You can see that it already has a couple of rules that removes margin from the `<body>`, etc.

Let's add another rule to prevent the "blue glow" around buttons when they have the focus:

```css
button:focus, .btn:focus {
  outline: none;
}
```

That `.btn:focus` selector is for Bootstrap buttons.

## Importing CSS Stylesheets

#### Benefits of Importing CSS Stylesheets

- You already know how to use them.

- Great for better organizing CSS rules, usually grouping styles that pertain to a particular component.

- Loaded once, and optimized by the browser.

#### Implementation

- When importing styles for a component:
	- The file is typically named the same as the component (**App.css** for a **App.js** component).
	- That CSS file would then be imported into the component's module.

- Importing CSS files require tooling. In a React app started with the `create-react-app` CLI, Webpack has been configured to process and import CSS stylesheets.

- Importing the same module multiple times does not increase the size of the built code - Webpack will only include the module once.

> **KEY POINT:** When we import a CSS stylesheet into a component as `create-react-app` did with **App.css**, those styles are actually merged into the application globally. This is just like when multiple external stylesheets are loaded in an _index.html_. So, it's important to prevent rules from conflicting and overriding each other.

#### Importance of Namespacing

CSS class names are like global variables, so it's a good idea to namespace them with the component's name to avoid _name collisions_.

Look at how `create-react-app` namespaced the classes used for the `<App>` component, for example, `App-header`. Following this practice in your own imported stylesheets is highly recommended.

As an alternative, we can use CSS Modules to avoid conflicts when naming classes. More on CSS Modules in a bit.

#### Import a Stylesheet

Currently the `<GuessPegs>` component is laying out vertically the `<div>` elements rendered by the `<GuessPeg>` components:

<img src="https://i.imgur.com/jCwtBIc.png">

Let's create and import a CSS stylesheet for `<GuessPegs>` so that we can style it to lay out its children horizontally as shown in our original wireframe:

1. Create a CSS stylesheet file named **components/GuessPegs/GuessPegs.css**.


2. `import` it in **GuessPegs.jsx** as follows:

	```js
	import React from 'react';
	import GuessPeg from '../GuessPeg/GuessPeg';
	import './GuessPegs.css';
	```
	Be sure to include the `.css` file extension!

3. Create a class named `GuessPegs` within the new **GuessPegs.css**:

	```css
	.GuessPegs {
	  display: flex;
	  flex-direction: row; /* FYI, 'row' is the default */
	  flex-wrap: nowrap;   /* FYI, 'nowrap' is the default */
	  /* below is a shortcut for the above two declarations */
	  /* flex-flow: row nowrap; */
	  align-items: center;
	}
	```

4. Finally, apply the `GuessPegs` class to the `<GuessPegs>` component's outer `<div>` **with the __________ prop**.

Now `<GuessPegs>` has a horizontal layout - I know, it's ugly, but it won't be for long!

#### 💪 Exercise: Import another CSS stylesheet (5 mins)

Now it's your turn:

1. Create and import a CSS stylesheet into the `<GuessScore>` component.

2. Create a `GuessScore` class and apply it to the wrapping `<div>`.

	Use the same flexbox properties as the `<GuessPegs>` component, however, we're going to want 2 rows of 2 scores each. You can easily accomplish this by changing `flex-wrap: nowrap;` to `flex-wrap: wrap;`, then add `width: 10px;`:

	<img src="https://i.imgur.com/pRf8UCX.png">

In a bit, when the `<div>`s for the individual scores are sized and styled, we will come back and further adjust the `width` to ensure they wrap in a 2-by-2 pattern.

#### ❓ Review Questions: Importing CSS Stylesheets

1. **True or False: Tooling is needed to import CSS stylesheets.**

2. **Where is the problem in the following two imported stylesheets:**

	```css
	/* CompA.css */
	
	.CompA-header {
		width: 100%;
	}
	
	button {
		background-color: red;
	}
	```
	
	```css
	/* CompB.css */
	
	.CompB-header {
		width: 50%;
	}
	
	button {
		background-color: blue;
	}
	```

## Importing CSS Modules

CSS Modules became available with the release of **create-react-app v2.0**, which improved the configuration of Webpack.

With **CSS Modules**, a CSS file's **class names** will be made unique by the tooling and will be dedicated to the component that imports the CSS Module - no more worrying about class name collisions!

Using a CSS Module differs from using a CSS stylesheet in three ways:

- The filename ends with `module.css`, e.g., `App.module.css` instead of `App.css`.

- The CSS Module is imported with the `from` syntax.

- **Class selectors** are unique to the component.  Other selectors however become global CSS rules just like with CSS stylesheets.

To check out CSS Modules, let's use one to style `<ScoreButton>`:

- Create a **ScoreButton.module.css** file within the **ScoreButton** folder.

- Now let's add a rule that will resize the button:

	```css
	.button {
	  padding: 2px 6px;
	}
	```
	Be sure to define the rule using a class selector (`.button`), not an element selector (`button`).

- Now let's update **ScoreButton.jsx** to use the CSS Module and while we're at it, render a checkmark:

	```js
	import React from 'react';
	import styles from './ScoreButton.module.css';
	
	const ScoreButton = (props) => (
	  <button className={styles.button}>
	    ✔
	  </button>
	);
	```
	Oh yeah, copy and paste that checkmark!
	
Note that the class names become keys on the `styles` object - let's console.log it to check it out:

```js
import styles from './ScoreButton.module.css';
	
// What is styles?
console.log(styles);
	
const ScoreButton = (props) => (
```

Logging out `styles` reveals that the tooling has generated a unique class name in place of `.button`:

<img src="https://i.imgur.com/VMzxREE.png">

Okay, the button's sizing is better, but what if we want to also include other classes, like Bootstrap's `btn`?

Well, since `styles.button` is just a string, and `className={styles.button}` is just a JSX expression, we can use a template literal like so:

```html
<button className={`${styles.button} btn btn-default`}>
```

That looks better!

#### ❓ Review Questions

1. **What's the difference when naming the files for CSS stylesheets vs. CSS Modules?**

2. **True or False: Importing CSS Modules results in an object where the keys are the names of the classes we defined in the module and the values are the unique class names generated by the tooling.**

3. **What's wrong with the following code:**

	```js
	import styles from './SmallComponent.module.css';
	
	function SmallComponent(props) {
	  return <div className='styles.small'>I'm Small</div>;
	}
	```

## Inline Styling With JavaScript

#### About Inline Styling

Contrary to what we've been told about avoiding styling elements inline using the `style` attribute in HTML, with React, inline styling is a common technique for **dynamic** styling!

Inline styling in React uses the `style` prop, however, unlike the `style` attribute in HTML, we assign a JS object instead of a string.

#### Adding Inline Styling to the `<GuessScore>` Component

Let's apply some inline styling to the `<GuessScore>` component. Here's the component's code as it stands thus far:

```js
const GuessScore = (props) => {
  let scores = ('P'.repeat(score.perfect) + 'A'.repeat(score.almost) +
    'I'.repeat(4 - score.perfect - score.almost)).split('');
  return (
    <div className="GuessScore">
      {scores.map((score, idx) => <div key={idx}>{score}</div>)}
    </div>
  );
}
```

Reviewing the above code reveals that we are building a `scores` array of 4 characters - this seems strange, but this approach will enable an elegant approach to styling. The values of the characters represent as follows:

- `P` represents the correct color in the correct position
- `A` represents the correct color, but in the wrong position
- `I` represents an incorrect color

Inline styling requires a JS object, so let's create a JS object for the base (common) styles of the score `<div>`s:

```js
let scores = ('P'.repeat(score.perfect) + 'A'.repeat(score.almost) + 
  'I'.repeat(4 - score.perfect - score.almost)).split('');
// existing code above

// object for base styling of score pegs (base styling is common to all pegs)
let baseStyle = {
  width: 10,
  height: 10,
  margin: 1,
  border: '2px solid',
  borderRadius: '50%'
};
```

As you can see, the JS objects we use for inline styling are just regular JS objects, where:

- CSS property names are camelCased.

- Pixel values can be provided as integers instead of strings.

- Other units like the `50%`, or values like the `2px solid` must be a string.

Now let's apply the styling by assigning the `baseStyle` object to the `style` prop within a JS expression (within curly braces):

```js
<div className='GuessScore'>
  {scores.map((score, idx) =>
    <div key={idx} style={baseStyle} />
  )}
</div>
```

Note that we also removed the content from the `<div>` and made it self-closing because we are now "visualizing" the score using styling, not content.

Looking good, except we need to increase the CSS `width` property in the `GuessScore` class to `24px` so that we can get a nice 2x2 display of scores like this:

<img src="https://i.imgur.com/L2SH0qo.png">

Now we want to apply dynamically one of three additional style objects depending upon the score character ('P', 'A' or 'I').

An elegant styling solution is to define a style object for each score character within another object, using the score character as keys like this:

```js
// Add below the baseStyle object
const pegStyles = {
  'P': {
    borderColor: 'black',
    backgroundColor: 'black'
  },
  'A': {
    borderColor: 'black',
    backgroundColor: 'white'
  },
  'I': {
    borderColor: 'white',
    backgroundColor: 'lightgrey'
  }
};
```

Then, we can _merge_ the styles into a new object using the [spread operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax#Spread_in_object_literals):

```js
  return (
    <div className="GuessScore">
      {scores.map((score, idx) =>
        <div
          key={idx}
          style={{...baseStyle, ...pegStyles[score]}}
        />
      )}
    </div>
  );
```

The spread operator, `...` is being used to "spread" each property of `baseStyle` into a new object literal, then the "selected" object within `pegStyles` is having its properties merged.

> We can accomplish the same thing using the slightly less concise [`Object.assign`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) method. However, the spread operator has become the go to approach.

To test out the styling, let's use React Developer Tools to change the first guesses `score` in the state of the `<App>` component. Changing  to two Perfect and one Almost results in the following being rendered:

<img src="https://i.imgur.com/jg1bjLO.png">

Nice!

#### Advantages of Inline Styling

Here are some advantages of inline styling with JS objects:

1. Since it's just JS, you can compute the value of any CSS property dynamically - remember, a component and all of its nested components are re-rendered when any state or props change. Consider how nifty this would be for data visualization components where properties like width, height, top, left, etc. are computed dynamically.

2. Again, because it's just JS, we can assign any valid JS expression to the `style` prop like what we just did. Opportunities for the ternary operator abound!<br>For example, let's update the `<GuessRow>` component to render the row number for the current row in `black` and all others in `lightgrey`:

	```js
	const GuessRow = (props) => (
	  <div className='GuessRow'>
	    <div style={{color: props.currentGuess ? 'black' : 'lightgrey'}} >
	      {props.rowIdx + 1}
	    </div>
		...
	);
	```

#### 💪 Exercise: Apply dynamic styling to `<ColorPicker>` (20 mins)

Okay, now that you know that we can dynamically style React elements by assigning a JS object to the `style` prop, it's time for some practice by updating the `<ColorPicker>` component.

Currently, `<ColorPicker>`  is being rendered as grey buttons and display their hexadecimal color value as content:

<img src="https://i.imgur.com/T9JrLFl.png">

Time to use those hexadecimal values, and the `selColorIdx` prop to dynamically style them like this:

<img src="https://i.imgur.com/1KUZ4pj.png">

##### Hints

1. Baby step by creating a CSS Module to apply the following non-dynamic styling to each button:

	```css
	.button:hover {
	  opacity: 1;
	}
	
	.button {
	  width: 40px;
	  height: 40px;
	  margin: 5px;
	  border-width: 14px;
	  border-radius: 50%;
	  opacity: 0.85;
	  cursor: pointer;
	}
	```

2. You're going to need to style both the `backgroundColor` and `borderColor` using the `style` prop. Examining the above non-dynamic CSS shows that there's a thick 14px border which results in a smallish round background that should be set to `white` if the button is selected (its index equals `selColorIdx`), otherwise the background should be the same color as the border.

3. You'll need to add a second parameter, e.g., `idx`, to `map`'s callback function so that you can compare it to the value of `props.selColorIdx`.

## Import CSS or use Inline Styling?

Generally, styling components in a React app requires a blended approach:

- Use imported CSS stylesheets for "static" styling reused throughout the app, or when selectors beyond simple classes are needed.

- Use imported CSS Modules for defining CSS **classes** dedicated to a given component.

- Use inline styling to style a component dynamically as state and/or props change.

[This 35 minute video](https://www.youtube.com/watch?v=tkuxR-b9aTI) suggests that approximately 80% of your styling will be CSS-based with the remaining 20% inline.

Regardless of what you do, as always, keep your eyes open for new approaches. For example, [Styled Components](https://styled-components.com/) are interesting, however, they are certainly more complex than the other approaches.

Lastly, there are several open-sourced libraries that make inline styling more powerful. For example, it's not easy to style pseudo-classes, such as `:hover` inline. One of the more popular libraries is [Radium](https://github.com/FormidableLabs/radium).

## ❓ Essential Questions

Take a minute to review...

1. **What is the name of the prop used to style inline?**

2. **What data type is assigned to the above prop?**

3. **When using CSS Stylesheets, it's important that class names be _______.**

4. **What styling approach is best to use if you need to compute styles dynamically?**

## References

[Adding a CSS Stylesheet](https://facebook.github.io/create-react-app/docs/adding-a-stylesheet)

[Adding CSS Modules](https://facebook.github.io/create-react-app/docs/adding-a-css-modules-stylesheet)

[A Visual Guide to CSS3 Flexbox](https://scotch.io/tutorials/a-visual-guide-to-css3-flexbox-properties?utm_content=bufferbb7b2&utm_medium=social&utm_source=twitter.com&utm_campaign=buffer#comments-section)






