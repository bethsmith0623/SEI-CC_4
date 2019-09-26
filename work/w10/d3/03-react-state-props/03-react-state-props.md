<img src="https://i.imgur.com/l6BOk1u.png">

# State and Props in React

## Learning Objectives

| Students Will Be Able To: |
|---|
| Describe the difference between props and state |
| Initialize a class component's state |
| Use `setState()` to update a component's state |
| Pass props to a child component |
| Render props passed to a component |

## Road Map

1. Set Up
2. What is State?
3. Initializing State
4. Updating State
5. What are Props?
6. Passing Props
7. Difference Between State & Props Summarized
8. `react-mastermind` Features Code-along
9. Essential Questions

## Set Up

The starter code is the code from the last lesson/lab with:

- The red border styling removed
- The addition of a `<ScoreButton>` component defined, but not yet being rendered

To be ready for this lesson, please:

- `cd` into the lesson's `starter-code/react-mastermind` folder
- Install the Node modules: `$ npm i`
- Open the code in VS Code: `$ code .`
- Start the dev server: `$ npm start`

Once the dev server opens a tab to `localhost:3000`, the page should have something like the following at the top:

<img src="https://i.imgur.com/u7ykXKg.png">

## What is State?

#### State In General

Simply put, **state** is data or information an application or component needs to implement its functionality.

Examples of state includes:

- An object representing the logged in user
- An array of todo objects
- A boolean representing whether a component's detail panel should be visible
- A number representing the selected or current index of an item in an array

#### State in React

State in a React app is held in a class component's `state` property.

Since data/information can only be passed **down** the component hierarchy, not up, it's a good idea to keep state as high up in the hierarchy as possible, at least initially. For most app's, the top of the hierarchy is the `<App>` component.

Only class components have state (ignoring the new "hooks" feature for now).

Let's add some state to the `<App>` component...

#### State in react-mastermind

When we analyze the state for the game of mastermind, we will find that we're going to need state for remembering:

- Which color is selected
- An array of guess objects, where the last object in the array will be the current guess
- The secret code

When working with data pertaining to the colors, we will find it far  more efficient to work with numbers (integers) instead of strings to represent which color has been chosen, selected, etc.

For example, we can use integers in an array to represent the secret code and the player's guesses like this:

```js
// Array of color "indexes" can be used for the code & player's guesses
[3, 0, 2, 2]
```

Those numbers would then be used to represent a corresponding color in a colors array:

```js
// Array of "colors"
['#7CCCE5', '#FDE47F', '#E04644', '#B576AD']
```

This way, the state "remembering" the selected color would be a simple integer, again, corresponding to the index of the selected color within the colors array.

With that out of the way, let's think about what has to be "remembered" about each guess. Take a look at this object's structure:

```js
// Structure of a player's "guess" object
{
  code: [3, 2, 1, 0],
  score: {
    perfect: 0,
    almost: 0
  }
}
```

The `code` represents the player's "guess".
The `score` object tracks the number of "perfect" pegs, that is, correct color in the correct position; and the number of "almost" which is a correct color, but in the wrong position.

The above "guess" objects can be remembered by an array in the state. The array would hold one guess object for each guess that's been made, plus the current guess (the last object in the array). 

If evaluating an application's state and data structures seems difficult, that's okay, it takes a bit of experience. Soon enough, you'll be able to recognize scenarios that you've seen before and apply those previous data structures and patterns previously used.

## Initializing State

Now let's initialize some state by creating a constructor method:

```js
class App extends React.Component {
  constructor() {
    // super must be called before accessing 'this'
    super();
    // state is an object that holds information
    // in its properties
    this.state = {
      selColorIdx: 0
    };
  }
  render() {
    return (
      <div>
        {/* add this before the header */}
        Selected color: {this.state.selColorIdx}
        ...
      </div>
    );
  }
}
```

React automatically instantiates class components when we use them in JSX.

Inside of the `constructor` method, `this` represents the component instance and just like we've previously discussed, the job of a class's `constructor` method is to initialize its properties.

> In a future lesson, we'll introduce you to a fresh new syntax we can use to more concisely initialize an instance's properties, but one thing at a time...

To add state to a component, we create a property named `state` and set it to an object with zero or more properties - each property representing a particular piece of state the application or component needs.

So far, we've created a `this.state.selColorIdx` property and are temporarily rendering it on the page.

#### Does All Information Belong in State?

So the answer to the question: _Does All Information Belong in State?_ is "no", not if the information never changes or if it does change, you don't want to cause components to re-render.

When you have data that doesn't change, or don't want to re-render if it changes, we can define that data:

1. In a variable outside of the class component (if the same variable should be accessed by all instances of the component), or
2. As a property separate from `state` on `this` (if every component should maintain its own copy).

As discussed, we intend to use `this.state.selColorIdx` to hold the index of the selected within a `colors` array.

If the `colors` array is used as a lookup data structure and doesn't change during the app's execution, we don't need to put it in state.

Let's add the `colors` array outside of the `App` class:

```js
// Add this array above the App class
const colors = ['#7CCCE5', '#FDE47F', '#E04644', '#B576AD'];

class App extends React.Component {
```

Now let's update App's `render` method to render the color's hex instead of the `selColorIdx`:

```js
<div className="App">
  Selected color: {colors[this.state.selColorIdx]}
```

#### 💪 Exercise - Initializing State (10 min)

Okay, your turn to add a couple of more pieces of state to react-mastermind:

1. `guesses`: Add a property named `guesses` to the `state` object. This is the array that will hold the player's "guess" objects. Initialize it to an empty array.<br>**Important:** If a piece of state will be an array, always initialize it to be an array, empty or not! This is because the components it gets passed to are going to expect to be able to `map`, `filter`, `forEach`, etc. over it!

2. `code`: Add a property named `code` to the `state` object. This is the array that will hold four integers (ranging from `0` to `colors.length - 1`). To obtain the value for `code`, call a method named `genCode` that will return the array of four randomly generated numbers. Define `genCode` as a method in the class between the `constructor` & `render` methods.<br>**Hint:** Remember that to invoke a method from another method, it must be accessed via `this`.<br>This single line of code within `genCode` will do the trick:

	```js
	return new Array(4).fill().map(() => Math.floor(Math.random() * colors.length));
	```

Click the 🌶️ in Slack when finished.

## Updating State

A class component updates its state by calling the `setState` method.

Do not modify state directly like this:

```js
this.state.selColorIdx = 1;
```

**Important:** A component's `setState` method is the only method that can update that component's state. If another component wants to update state up the component hierarchy, it can do so if a method is passed to it via props - we will have a lesson dedicated to this topic, but here's a preview...

Let's add a temporary button to `<App>` with a click handler that will select one color after the other:

```js
<div className="App">
  <button onClick={() => 
    this.setState({selColorIdx: ++this.state.selColorIdx % 4})}>
    Next Color
  </button>
```

This is kind of nasty looking, but it makes the point that state is being changed, causing a render to happen.

First thing to note is that the object provided is **merged** with the existing state object. Existing properties will be updated and new ones created.

There are a couple of different ways to call `setState`...

The simplest approach is like what we did above, by simply providing an object as the only argument that gets merged with the current state object:

```js
this.setState({
  someState: 'new value',
  moreState: true
});
```

However, because the `setState` method is asynchronous, if new state depends upon values in current state, you should use `setState` by passing to it a function instead.

Notice we are getting warnings with the way we updated `selColorIdx`?  React knows we can do better:

```js
<button onClick={() => this.setState(state => (
  {selColorIdx: ++state.selColorIdx % 4}
)}>
  Next Color
</button>
```

Above, we are passing a function to `setState` and returning the object to be merged from it.

React is passing the current state in as an argument, and we are using the current value of `state.selColorIdx` to compute the next value.

Lastly, regardless of which approach we use, `setState` is always an asynchronous operation (in order to provide batching of multiple calls), we are able to optionally provide a callback as a second argument that is called after all state has been updated.

So in summary, `setState` has the following signature:

```
setState(<object or function>, <optional callback>);
```

We're going to be adding more state in a bit, but now let's turn our attention to **props**.

## What are Props?

You should be somewhat familiar with props from the _Intro to JSX_ lesson.

A parent component uses props to pass data and references to methods/objects to child components.

A prop looks much like an attribute=value pair in an HTML element.

However, as discussed in the JSX lesson, you must use camelCasing to name your props instead of the kebob-casing preferred in HTML.

## Passing Props

The first prop we'll pass in react-mastermind will be the `colors` array to the `<ColorPicker>` component within the `render` method in **App.js**:

```js
<ColorPicker colors={colors}/>
```

You must use curly braces to pass any value other than a simple string (template literals need to be surrounded by curly braces as well).

We can now go to  `<ColorPicker>` and work with the colors array, but there's a better way to check things like props and state - [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)

Just like how Chrome's DevTools are invaluable when it comes to troubleshooting the DOM, so are React's Developer Tools when it comes to troubleshooting a React app!

With the Chrome extension installed you will now see a **React** tab in Chrome's DevTools!

After clicking on the **React** tab, you can explore the component hierarchy. Select the `<ColorPicker>` component and then view the right-hand side:

<img src="https://i.imgur.com/K6GCbVQ.png">

How exciting!

#### Accessing Passed Props

When a **Function Component** is being rendered, React will pass in props as the first argument to the function like this:

```js
const ColorPicker = (props) => (
  ...
```

However, a **Class Component** will access props via a property on the instance (`this`) like this:

```js
{this.props.myProp}
```

Let's use the `colors` prop inside of `<ColorPicker>` to render a button for each of the colors in the array:

```js
const ColorPicker = (props) => (
  <div>
    {props.colors.map(color =>
      <button key={color}>{color}</button>
    )}
  </div>
);
```
Yup, once again, the `map` array iterator method is the go to for transforming an array of data into an array of components!

Check it out, they won't be pretty (yet), but you'll find a button for each color in the `props.colors` array!

#### Props Cannot be Changed

Props are immutable, their values are never to be changed.

Remember, the prop came from a component somewhere up the hierarchy and if the prop's value originated from state, it would be **that** component's responsibility to update its own state.

However, a component can certainly pass down via props methods that can be used to update its state - but that's for another day.

#### 💪 Exercise - Passing Props (5 mins)

Your turn to pass some props:

1. The `<ColorPicker>` component will need to know which color is selected, thus, pass the `selColorIdx` state to it as a prop with the same name.

	> Note: The name of the prop can be anything, but it makes sense to name it the same as the state property being passed.

2. The `<GameBoard>` component will need access to both the `colors` array and the `guesses` state. Pass both as props using the same names.

Check your work using the React Developer Tools.

Click the 🌶️ in Slack when finished.

## Difference Between State & Props Summarized

Let's summarize the key differences between state and props:

| state | props |
|---|---|
| `this.state` holds information "owned" by that component | `props` or `this.props` holds information passed down the component hierarchy |
| State can be modified with `this.setState` | Props cannot be modified |
| When changed, causes a component and all of its children and their children to render | N/A<br>However, it is possible to call a method passed as a prop that updates state in the component that "owns" it |

## `react-mastermind` Features Code-along

Let's add some functionality to react-mastermind which will give us some practice working with state, props and React in general...

#### Seed a Couple of Guess Objects

When the app loads, the player is going to expect to see an initial guess row in which to start making their color choices:

<img src="https://i.imgur.com/m5wLwS9.png">

After the player clicks the `<ScoreGuess>` button, they will expect another guess row to appear so that they guess again (unless they won of course).

Since we'll need to be able to create new guess objects throughout the game play, let's write a method whose responsibility is to return a pristine guess object in **App.js**:

```js
// Add this method below the constructor method
getNewGuess() {
  return {
    code: [null, null, null, null],
    score: {
      perfect: 0,
      almost: 0
    }
  };
}
```

We're using a `null` in each of the four positions to represent that a guess has not been made yet for that position.

Now we can use this `getNewGuess` method to update how the `guesses` state array is initialized in **App.js**:

```js
this.state = {
  selColorIdx: 0,
  // Call getNewGuess to create a starting guess object
  guesses: [this.getNewGuess()],
  code: this.genCode()
};
```

React Developer Tools can confirm that `<GameBoard>` is now receiving the `guesses` prop with a guess object in it.

However, during development, we often want to "seed" initial data for testing, styling, etc.

Let's make a change to temporarily create two guess objects in the `guesses` array instead of one, and with "color" indexes instead of the nulls:

```js
  this.state = {
    selColorIdx: 0,
    // For development, let's initialize with two guess objects
    guesses: [this.getNewGuess(), this.getNewGuess()],
    code: this.genCode()
  };
}

getNewGuess() {
  return {
    // Comment out until done testing
    // code: [null, null, null, null],
    code: [3, 2, 1, 0], // for testing purposes
    score: {
      perfect: 0,
      almost: 0
    }
  };
}
```

#### Code `<GameBoard>` to Display `<GuessRow>`s

The `<GameBoard>` component currently is rendering two hard-coded `<GameRow>` components:

```js
const GameBoard = (props) => (
  <div>
    <GuessRow />
    <GuessRow />
  </div>
);
```

However, now that `<GameBoard>` is being passed the actual `guesses` array, let's refactor to render a `<GuessRow>` for each guess object in the array instead:

```js
const GameBoard = (props) => (
  <div>
    {props.guesses.map((guess, idx) =>
      <GuessRow
        guess={guess}
        colors={props.colors}
        key={idx}
      />
    )}
  </div>
);
```

While we're at it, we're passing both the `guess` object and the `colors` array as props because the `<GuessRow>` needs access to them to do its job.

We're also using `idx` to assign to `key` to make React happy. 

> Note: Passing state and props down multiple levels of the component hierarchy is very common in React. However, state management alternatives, such as Redux and React's context, allow for "providing" state to components directly instead. Redux has a lot of set up overhead and is overkill for most apps, however, we'll be taking a look at React's context approach in a future lesson.

Okay, we should still be seeing two `<GuessRow>` components being rendered.

However, now it has `guess` & `colors` props that can be used. Here's what **GuessRow.jsx** currently has for code:

```js
const GuessRow = (props) => (
  <div className='flex-h'>
    Guess Row #
    <GuessPegs />
    <GuessScore />
  </div>
);
```

Now let's display an actual number for "Guess Row #".

Problem though, `<GuessRow>` doesn't currently have this the "guess row number" information. You might think that we could use the value of the `key` prop, however, `key` is for React's internal use and is not actually passed to the child component as a prop.

We're going to have to pass the value of `idx` as a separate prop instead in **GameBoard.jsx**:

```js
const GameBoard = (props) => (
  <div>
    {props.guesses.map((guess, idx) =>
      <GuessRow
        guess={guess}
        colors={props.colors}
        {/* Add the rowIdx prop */}
        rowIdx={idx}
        key={idx}
      />
    )}
  </div>
);
```

Now we can go back to **GuessRow.jsx** and render the actual row number:

```js
const GuessRow = (props) => (
  <div className='flex-h'>
    <div>{props.rowIdx + 1}</div>
    <GuessPegs />
    <GuessScore />
  </div>
);
```
As you can see, we want the row number to be 1-based.

Check it out in the browser and you will find that the row number is now being displayed.  Although we want the newest row on top, which we'll take care of using styling tomorrow.

Okay, next up is passing props to the `<GuessPegs>` component.

The following props will need to be passed to `<GuessPegs>`:

- `colors`: No big surprise here because those pegs will definitely need to access the actual color values instead of the index numbers.
- `code`: Each peg's color is dependent upon what color the player has guessed, which is being stored in the guess object's `code` property.

Let's pass these along:

```js
const GuessRow = (props) => (
  <div className='flex-h'>
    <div>{props.rowIdx + 1}</div>
    <GuessPegs
      colors={props.colors}
      code={props.guess.code}
    />
    <GuessScore />
  </div>
);
```

Sweet. Make sure the page is not receiving any errors and let's move on to the `<GuessPegs>` component that we just passed some props to...

#### Code `<GuessPegs>`/`<GuessPeg>` to Display the Color Values

Currently, `<GuessPegs>` is rendering "GuessPegs" text and the four `<GuessPeg>` components in **GuessPegs.jsx**:

```js
const GuessPegs = (props) => (
  <div className='flex-h'>
    GuessPegs
    <GuessPeg />
    <GuessPeg />
    <GuessPeg />
    <GuessPeg />
  </div>
);
```

First, delete that temp "GuessPegs" text.

Now, what does each `<GuessPeg>` need to know?  Simply the color value it is responsible for displaying.

But the specific color value to pass as a prop depends upon the color that the player has guessed for that position.

This is how it's done:

```js
const GuessPegs = (props) => (
  <div>
    <GuessPeg color={props.colors[props.code[0]]} />
    <GuessPeg color={props.colors[props.code[1]]} />
    <GuessPeg color={props.colors[props.code[2]]} />
    <GuessPeg color={props.colors[props.code[3]]} />
  </div>
);
```

Each `<GuessPeg>` is receiving a `color` prop that is being set to the value from the colors array, indexed by the guess stored in<br> `props.code[/* index of the peg's position */]`

Now let's get the `<GuessPeg>` component to simply render the color value instead of bogus text.

Update **GuessPeg.jsx** as follows:

```js
const GuessPeg = (props) => (
  <div>
    {props.color}
  </div>
);
```

Checking the browser should put a smile on your face:

<img src="https://i.imgur.com/ZnXMx2f.png">

Tomorrow, we will use those color values to style the pegs!

#### Display Either the `<GuessScore>` or `<ScoreButton>`

Let's code one last piece of functionality...

Currently, the `<GuessRow>` component is always rendering the `<GuessScore>` component.

However, `<GuessScore>` should be displayed for previous guesses only, not the current guess:

<img src="https://i.imgur.com/cENmDl0.png">

We will need to add some conditional logic to `<GuessRow>` to render `<ScoreButton>` for the **current** guess row.

However, currently, `<GuessRow>` does not have a way of knowing if it's the current row or not.

As you've seen already, we'll need to pass a prop to `<GuessRow>` from its parent component, `<GameBoard>`, to let it know if it's the current row or not.

Back in **GameBoard.jsx** let's add a `currentGuess` prop in addition to the others:

```js
const GameBoard = (props) => (
  <div>
    {props.guesses.map((guess, idx) =>
      <GuessRow
        guess={guess}
        colors={props.colors}
        rowIdx={idx}
        {/* Add the currentGuess prop */}
        currentGuess={idx === (props.guesses.length - 1)}
        key={idx}
      />
    )}
  </div>
);
```

The `{idx === (props.guesses.length - 1)}` JSX expression will result in a value of `true` or `false` being passed.

Now the `<GuessRow>` component has the info necessary to decide which components to render.

Let's add the necessary conditional logic in **GuessRow.jsx**:

```js
const GuessRow = (props) => (
  <div className='flex-h'>
    <div>{props.rowIdx + 1}</div>
    <GuessPegs
      colors={props.colors}
      code={props.guess.code}
    />
    {/* Refactor as follows */}
    {
      props.currentGuess ?
        <ScoreButton /> :
        <GuessScore />
    }
  </div>
);
```

Ah yes, our friend the ternary expression is the go to for returning one of two expressions depending upon a conditional expression.

One last detail, we've referenced the `<ScoreButton>` component without importing it:

```js
import React from 'react';
import GuessPegs from '../GuessPegs/GuessPegs';
import GuessScore from '../GuessScore/GuessScore';
// Import the ScoreButton component
import ScoreButton from '../ScoreButton/ScoreButton';
```

The look of sweet success:

<img src="https://i.imgur.com/O68DERR.png">

Cool!

Before the lab, let's put the student picker to work...

## ❓ Essential Questions

Take a minute to review the following questions:

1. **In the context of an application, what is state?**

2. **In the lesson, where was state initialized?**

3. **What method must be invoked to update state?**

4. **What is wrong with the following code:**

	```js
	function GameTimer(props) {
	  props.elapsedTime += 1;
	  return (
	    <div>
	      Elapsed Time: {props.elapsedTime}
	    </div>
	  );
	}
	```
	
5. **When passing a prop down several levels of the component hierarchy, do we _have_ to name the prop the same each time it is passed?**

## References

[Thinking in React](https://reactjs.org/docs/thinking-in-react.html)

[Components and Props - React Docs](https://reactjs.org/docs/components-and-props.html)

[State and Lifecycle - React Docs](https://reactjs.org/docs/state-and-lifecycle.html)
