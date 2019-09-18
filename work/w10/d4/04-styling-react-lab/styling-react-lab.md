<img src="https://i.imgur.com/XPM0LmG.png">

# Styling React - Lab

## Set Up

This lab has a `starter-code/react-mastermind` with code that matches where we left off from the _Styling React Components_ lesson.

- Be sure to `$ npm i` the Node modules.

- Spin up React's dev server: `$ npm start`

## Intro

In the _Styling React Components_ lesson we used a combination of imported CSS stylesheets, imported CSS Modules and inline styling to style the _React Mastermind_ game app.

The purpose of this lab is to practice styling React components by:

1. Importing CSS stylesheets and/or modules that contain normal CSS rules and target the DOM elements emitted by the components.

2. Writing JS objects in a component's module that contain key:value pairs representing CSS properties and applying those styling objects to DOM components using the [`style`](https://facebook.github.io/react/docs/dom-elements.html#style) prop.

##### This lab is a deliverable.

## Goal

When finished, the react-mastermind app should look something like this:

<img src="https://i.imgur.com/T4dN4UU.png">

> Note: A couple of more bogus guesses were added to the `guesses` array in state to demonstrate how the app might look with multiple guess rows. 


## Hints

- The `<GameTimer>` has:
	- A font family of [Roboto Mono](https://fonts.google.com/specimen/Roboto+Mono)
	- A size of 20px
	- A color of grey
	- A top & bottom margin of 30px

- Don't be afraid to add extra `<div>` React elements to group other components to assist with layout.

- The solution code uses flexbox for laying out items on the page.

	Flexbox dramatically **improves** our ability to layout elements on a page and elements within other elements.

- Flexbox makes it easier to:

	- Align items (including centering horizontally & vertically).
	- Spread out items evenly.
	- Display items at one end or the other.
	- Reverse the order items are laid out (handy for reversing the order of the `<GuessRow>`s).
	- And more!

	No more floats! No more CSS tricks to center vertically!

	Flexbox can even modify the width/height of its children to fill available space on different screen sizes.

	Simply by setting the CSS property to flex like so:
	
	```css
	.GameBoard {
	  display: flex;
	}
	```

	...makes the `<GameBoard>` component become a **flexbox container**. Accordingly, all of its children become **flexbox items**.

	By default, a flexbox container lays out its children in a row - this is the **opposite** of how the browser lays out block elements by default, where elements stack on top of each other, not laid out horizontally.

- In regards to the `<GuessRow>` components within `<GameBoard>`, we will have more control over how they stack vertically by making `<GameBoard>` a flexbox with a `flex-direction: column;` declaration:

	```css
	.GameBoard {
	  display: flex;
	  flex-direction: column;
	}
	```

	Now that wrapping `<div>` `<GameBoard>` is a flexbox, we can easily make it's flex children display in reverse order (with the current guess on top) as follows:

	```css
	.GameBoard {
	  display: flex;
	  flex-direction: column-reverse;
	}
	```

	By adding the `-reverse` caused the stacking to start at the bottom, which is exactly what we wanted:

	<img src="https://i.imgur.com/cNrGkdA.png">

	- Bringing up [A Visual Guide to CSS3 Flexbox](https://scotch.io/tutorials/a-visual-guide-to-css3-flexbox-properties?utm_content=bufferbb7b2&utm_medium=social&utm_source=twitter.com&utm_campaign=buffer#comments-section) will help you with using flexbox as you continue to style react-mastermind.

## Deliverable

When finished, please commit your work and push it to your fork (`git push origin master`).

In your fork of the class repo, browse this lab and copy/slack the link in the address bar to your instructors.
