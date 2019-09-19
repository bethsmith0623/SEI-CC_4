<img src="https://i.imgur.com/uW0X1sl.jpg">

# Walk-thru on Updating State in React
---

## Learning Objectives

| Students Will Be Able To |
|---|
| Update a component's state using `setState` |
| Properly Update Object or Array properties in `state` |

## Roadmap

- Set Up
- Review of Updating State using `setState` 
- Updating Object/Array Properties in `state`

## Set Up

To get set up for this lesson, please:

- Create a React Sandbox in [CodeSandbox](https://codesandbox.io/) and name it "Updating State".

- Since we will be working with state, we will want `<App>` to be a class component.  Please replace the current function component with this starting code:

	```js
	class App extends React.Component {
	  render() {
	    return <div>Hello!</div>;
	  }
	}
	```

## Review of Updating State using `setState`

#### Add Some State, Etc. to the Sandbox

Let's add some basic state to the sandbox using _property initializer_ syntax which eliminates the need for creating a `constructor` method:

```js
class App extends React.Component {
  // Initialize the state property using property initializer syntax
  state = {
    emotion: "Happy"
  };
  
  render() {
``` 

Now let's render the state and some buttons we can use to change the emotion:

```js
  render() {
    return (
      <>
        <h1>Current Emotion: {this.state.emotion}</h1>
        <button onClick={() => this.updateEmotion("Excited")}>Excited</button>
        <button onClick={() => this.updateEmotion("Surprised")}>
          Surprised
        </button>
        <button onClick={() => this.updateEmotion("Happy")}>Happy</button>
      </>
    );
  }
```

Finally, let's add the `updateEmotion` method above `render`:

```js
  updateEmotion(emotion) {
    this.setState({emotion});
  }
```

A refresh of the sandbox's browser should display something like this:

<img src="https://i.imgur.com/6kgAgZS.png">

Clicking the buttons should update the state and the display.

#### Review of How `setState` Works

Here's a review of what we've learned about updating state so far:

- Don't modify state directly:

	```js
	// Don't do this, always call setState instead
	this.state.emotion = 'Happy';
	```

- `setState` has two signatures:

	Passing an `object` as the argument...
	
	```js
	this.setState({emotion: 'Excited'});
	```
	
	Passing a `function` as the argument...
	
	```js
	this.setState(function(state, props) {
	  return {emotion: 'Excited'};
	});
	```
	The function passed as an argument needs to return an object that is merged with state.<br><br>Use the above approach when you need to rely on the current value of state or props to determine the new state:
	
	```js
	this.setState((state, props) => ({count: state.count + 5}));
	```

- `setState` merges the new object into the component's current state object:

	```js
	// Assuming this.state is currently {emotion: 'Happy'}
	this.setState({notes: ['Woke up feeling great']});
	// Now this.state is {emotion: 'Happy', notes: ['Woke up feeling great']}
	```

- `setState` is asynchronous:

	```js
	this.setState({emotion: 'Surprised'});
	console.log(this.state.emotion) /-> Won't be 'Surprised'
	```

**Any questions?**

## Updating Object/Array Properties in `state`

#### Set Up an Array on `state`

Let's update `state`'s initialization to include an empty `numbers` array:

```js
state = {
  emotion: "Happy",
  numbers: []
};
```

Now for some additional code to render the contents of the `numbers` array along with a button to add another random number:

```js
render() {
    return (
      <>
        ...
        <button onClick={() => this.updateEmotion("Happy")}>Happy</button>
        {/* New JSX below */}
        <h1>Numbers:</h1>
        <ul>
          {this.state.numbers.map(n => (
            <li>{n}</li>
          ))}
        </ul>
        <button onClick={this.addNumber}>Add Number</button>
      </>
    );
  }
}
```
	
Finally, that `addNumber` method which will be used to add a random number. For now, we'll just stub it up:

```js
state = {
  emotion: "Happy",
  numbers: []
};

/* New Code Below */

// property initializer syntax ensures 'this' is bound correctly
addNumber = () => {

};
```

#### 💪 Exercise - Add a Random Number (5 min)

Without peeking below, pair up and write the code to add the result of calling `Math.random()` to `state.numbers`.

Don't use `Math.floor`, the decimal value returned by `Math.random()` is fine.

#### Thou Shall Not Mutate State

When we click one of the "emotion" buttons, we are **replacing** a piece of state, `state.emotion`, with a new string.

However, when the state property is a reference type, such as an Object or Array, it's possible to improperly mutate (change) the very same Object/Array instead of replacing it by writing code like this:

```js
addNumber = () => {
  // Don't do this!
  this.state.numbers.push(Math.random());
  this.setState((state) => ({numbers: state.numbers}));
};
```

Even though we were good about passing a function to `setState` (due to the fact we're relying on existing state), we violated the rule not to mutate state directly by calling `push` on the `this.state.numbers` array.

#### Always Replace Top-Level Objects & Arrays With New Ones

The rule is, if something inside of an Object/Array that's assigned to a **top-level** state property changes, that Object/Array must be replaced with a new version of itself.

Here's the latest and greatest way to create a new array by using the `...` [spread operator within an array literal](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax#Spread_in_array_literals):

```js
addNumber = () => {
  // Good times!
  const updatedNums = [...this.state.numbers, Math.random()];
  this.setState({numbers: updatedNums});
};
```

> The spread operator works with object literals as well:
`const objCopy = {...existingObj};`

### Why Not To Mutate State

There are two reasons to replace state instead of mutating it:

1. It provides for improved performance
2. It enables features such as undo and time travel

#### 1. Performance 

React can provide improved performance by not having to spend time looking inside of objects/arrays that are assigned to **top-level** state  properties to see if something has changed.  All it has to do is check if it's a different object/array.

Even though the app worked when we mutated `this.state.numbers`, it did so because `Component` does not have any optimizations built in, allowing us to mutate the existing array instead of replacing it.

However, React comes with an optimized `PureComponent` that we can extend that performs the reference check we just discussed.

First, let's update `App` to inherit from `PureComponent`:

```js
class App extends React.PureComponent {
```
Click the **[Add Number]** button to check that it still works.

Now let's revert back to mutating `state.numbers`, but this time, we're still extending `PureComponent`:

```js
addNumber = () => {
  this.state.numbers.push(Math.random());
  this.setState((state) => ({numbers: state.numbers}));
  // const updatedNums = [...this.state.numbers, Math.random()];
  // this.setState({numbers: updatedNums});
};
```
Now, the very same code that worked before doesn't work anymore because it's been optimized to render only if a property on `state` has been replaced.

#### 2. Features

Replacing object/arrays **at all levels** in state instead of mutating them enables the implementation of features such as undo and time travel back to an earlier point in an application not only possible, but easier than you may think.

It also can help prevent subtle bugs from appearing in complex apps.

> Perhaps you've heard of an alternative approach to state management - [Redux](https://redux.js.org/). Unlike with React, you can't cheat with Redux as it demands that all state not be mutated. In fact, there's even a library that helps you implement immutable state called [Immutable.js](https://github.com/immutable-js/immutable-js).









