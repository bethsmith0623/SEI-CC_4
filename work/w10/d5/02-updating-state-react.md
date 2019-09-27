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
  // Initialize the state property using a class field
  state = {
    emotion: 'Happy'
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

The sandbox's browser should display something like this:

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
	this.setState(function(state) {
	  return {emotion: 'Excited'};
	});
	```
	The function passed as an argument needs to return an object that is merged with state.<br><br>Use the above approach when you need to rely on the current value of state or props to determine the new state:
	
	```js
	this.setState((state) => ({count: state.count + 5}));
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
	console.log(this.state.emotion) //-> Won't be 'Surprised'
	```
	
	Both signatures (passing an object or a function) accept an optional callback function as a second argument which is invoked after state has been updated.
	
	```js
	this.setState({emotion: 'Surprised'}, () => {
	  console.log(this.state.emotion) //-> Will be 'Surprised'
	});
	```

**Any questions?**

## Updating Object/Array Properties in `state`

#### Set Up an Array on `state`

Let's update `state`'s initialization to include an empty `history` array:

```js
state = {
  emotion: 'Happy',
  history: ['Happy']
};
```

Now for some additional code to render the contents of the `history`:

```js
render() {
  return (
    <>
      ...
      
      <button onClick={() => this.updateEmotion("Happy")}>Happy</button>
      {/* New JSX below */}
      <h1>Emotional History:</h1>
      <ul>
        {this.state.history.map(emotion => <li>{emotion}</li>)}
      </ul>
    </>
  );
}
```

#### 💪 Exercise - Add a Random Number (5 min)

Without peeking below, write the code to refactor the `updateEmotion` method to add the clicked emotion to the `history` array.

#### Thou Shall Not Mutate State

When we click one of the "emotion" buttons, we are **replacing** a piece of state, `state.emotion`, with a new string.

However, when the state property is a reference type, such as an Object or an Array, we should not mutate (change) that Object/Array:

```js
updateEmotion(emotion) {
  // The following "works", but is not a good practice
  this.state.history.push(emotion);
  this.setState({emotion});
}
```

The above will work in non-optimized components, however, we are mutating the array, which is a no, no...

#### Always Replace Top-Level Objects & Arrays With New Ones

The rule is, if something inside of an Object/Array that's assigned to a **top-level** state property changes, that Object/Array must be replaced with a **new** Object/Array.

Here's the latest and greatest way to create a new array by using the `...` [spread operator within an array literal](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax#Spread_in_array_literals):

```js
updateEmotion(emotion) {
  // implicitly returning an object from the arrow function
  this.setState((state) => ({
    emotion,
    // assigning a new array
    history: [...state.history, emotion]
  }));
}
```

> As we saw in the styling lesson, the spread operator works with object literals as well:
`const objCopy = {...existingObj};`

Notice that because we needed to access the current `history` array, we converted to the function signature of `setState`. 

### Why Not Mutate State?

There are two reasons to replace an object/array in state instead of mutating it:

1. It provides for improved performance
2. It enables features such as undo and time travel

#### 1. Performance 

React can provide improved performance by not having to spend time looking inside of objects/arrays that are assigned to **top-level** state  properties to see if something has changed.  All it has to do is check if it's a different object/array.

Even though the app worked when we mutated `this.state.history`, it did so because `Component` does not have any optimizations built in, allowing us to mutate the existing array instead of replacing it.

However, React comes with an optimized `PureComponent` that we can extend that performs the reference check we just discussed.

First, let's update `App` to inherit from `PureComponent`:

```js
class App extends React.PureComponent {
```
Click on a new emotion button to verify that it still works.

Now let's revert back to mutating `state.history`, but this time, we're still extending `PureComponent`:

```js
updateEmotion(emotion) {
  this.state.history.push(emotion);
  this.setState({emotion});
}
```

Now, the component is optimized to trigger a render only if some top-level state has changed.  Thus, clicking a different emotion works okay, however, try clicking the same emotion several times, then click a different emotion - yikes!

#### 2. Features

Replacing object/arrays **at all levels** in state instead of mutating them enables the implementation of features such as undo and "time travel", where the app can return to a previous "state".

"Time travel" can easily be implemented by persisting the history of `the.state` upon each update.

Not mutating state also helps prevent subtle bugs from appearing in complex apps.

> Perhaps you've heard of an alternative approach to state management - [Redux](https://redux.js.org/). Unlike with React, you can't cheat with Redux as it demands that all state not be mutated. In fact, there's even a library that helps you implement immutable state called [Immutable.js](https://github.com/immutable-js/immutable-js).









