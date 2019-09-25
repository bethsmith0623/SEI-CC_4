<img src="https://i.imgur.com/dwlIlek.png">

# Component Lifecycle Methods
---

## Learning Objectives

| Students Will Be Able To: |
| --- |
| Explain the use case for lifecycle methods |
| List the three phases of a component's lifecycle |
| Override/implement a lifecycle method |

## Road Map

- Set Up
- The Lifecycle of Components
- The Lifecycle Methods
- A Component's Lifecycle
- Overriding Lifecycle Methods
- Adding a Game Timer to Mastermind
- Essential Questions

## Set Up

The starter code for this lesson is the same as the solution code from the _Mastermind Settings Lab_.

To get set up for this lesson:

- `cd` into the `starter-code/react-mastermind` folder for this lesson.
- Open the project in VS Code: `$ code .`
- Open a terminal in VS Code (`ctrl + backtick`)
- Install the Node modules: `$ npm i`
- Start the React Dev Server: `$ npm start`

The following page should be displayed:

<img src="https://i.imgur.com/ScWtx2B.png">

There's also a `/settings` route that displays:

<img src="https://i.imgur.com/YI6qBcX.png">

## The Lifecycle of Components

#### What are Lifecycle Methods

When a React app first loads and/or when state is changed, React components may be instantiated, updated, and destroyed.

React's `Component` has several methods that React automatically invokes during a component's lifecycle process.

When we subclass `Component` using `extends` our custom class component inherits those methods.

For example, you are already familiar with a couple of them: `constructor` and `render`.

#### Why do Lifecycle Methods Exist?

In many React apps, sometimes overriding just the `render` method is not enough.

**Lifecycle methods enable developers to write code that executes during the stages of a component's lifetime.**

The ability to "hook" code into a component's lifecycle is why these methods are also referred to as "lifecycle hooks" (not to be confused with the React's latest "Hooks" API).

Some use cases that require overriding certain lifecycle methods include:

- Making AJAX calls
- Performing animations
- Performance optimization
- Creating/destroying resources such as timers

## The Lifecycle Methods

First, a heads up that the release of React version 16.3 brought significant changes to React's lifecycle methods as React moves toward an [async rendering mode](https://reactjs.org/blog/2018/03/01/sneak-peek-beyond-react-16.html). A couple of lifecycle methods have been deprecated (marked for removal in a later version).

In this lesson, we will not work with any of the deprecated lifecycle methods - so sleep well...

### Common Lifecycle Methods

The following diagrams the **common** lifecycle methods of components:

<img src="https://i.imgur.com/BeR38kf.png">

These three main **phases** of a component's **lifecycle** are known as:

- **Mounting** - the phase that occurs when an instance of a component is being created and inserted into the DOM.
- **Updating** - the phase that occurs when a component is already in the DOM but is being re-rendered when state and/or props change.
- and **Unmounting** - the phase that occurs when a component is being removed from the DOM and destroyed.

In the above diagram, there are five lifecycle methods (in bold):

- **constructor**: Runs when a component is being rendered for the first time.
- **render**: Runs first render, then whenever
	- `setState` is called
	- New props are received
	- `forceUpdate` is called (not recommended)
- **componentDidMount**: Called after the first render.
- **componentDidUpdate**: Called after subsequent renders.
- **componentWillUnmount**: Called just before a component will be removed from the DOM.

### Less-common Lifecycle Methods

For completeness, the following diagram includes the **less-common** lifecycle methods:

<img src="https://i.imgur.com/xANapyE.png">

As explained by [this React blog post](https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html), you will rarely ever have to use these less-common lifecycle methods.

## Overriding the Lifecycle Methods

To use any of the lifecycle methods, the component must be defined using a class - Function Components do not have lifecycle methods.

Overriding a lifecycle method is done the same way we override any method inherited from a superclass - by simply defining the method within the class.

Let's override the `componentDidMount` method in **App.js**:

```js
class App extends Component {
  constructor() {
    super();
    this.state = {...this.getInitialState(), difficulty: 'Easy'};
  }

  /*---------- Lifecycle Methods ----------*/

  componentDidMount() {
    console.log('App: componentDidMount');
  }
  
  ...
```

Checking the console of the browser should now show `App: componentDidMount` logged out.

#### 💪 Practice (5 mins)

Continuing to modify **App.js**:

1. Add a `console.log('App: constructor');` within the `constructor` method.
2. Add a `console.log('App: render');` within the `render` method.
3. Define a `componentDidUpdate` method with a `console.log('App: componentDidUpdate');`.

After the app loads, the console should look something like this:

<img src="https://i.imgur.com/TclU7Di.png">

Selecting a new color in the color selector will trigger an update resulting in the console now looking something like:

<img src="https://i.imgur.com/06qGRaE.png">

Note how the `constructor` and `componentDidMount` methods did not run a second time because `<App>` already exists (been mounted) in the DOM.

Instead, just as the diagram shows, the `render` and `componentDidUpdate` methods ran in response to `setState` being called.

## Adding a Game Timer to Mastermind

### User Stories

It would be cool to implement the following user stories:

- _As a player (AAP), I want to see how long it's taking to crack the code so that I can track my times._
- _AAP, I want the timer to stop when I crack the code._
- _AAP, I want the timer to reset to zero when a new game starts._

### Wireframe

Here's what we want the timer to look like when rendered:

<img src="https://i.imgur.com/fm7tURM.png">

### Design of the `<GameTimer>` Component

#### State

With the **user stories** and **wireframe** done, let's turn out attention to **state**.

Before starting to implement new features in a React app, we need to consider if a component needs to have its own state or will all of its "data" be passed to it via props?

The key piece of data that `<GameTimer>` will need to render is _elapsed time_.

At first, it seems like `elapsedTime` is a perfect candidate to be held in the state of  `<GameTimer>` - after all, you always want to lean toward encapsulating related data (state) and behavior together when you can.

However, soon we will want `<App>` to persist scores, easily reset the timer when it needs to be reset, etc., `<App>` will need to know what the value of `elapsedTime`.

Okay, so once again, it makes sense to keep state high up in the component hierarchy, in our case, `<App>`.

We will then pass `elapsedTime` to `<GameTimer>` as a prop to be rendered.

But how will `<App>` know when to increment `elapsedTime`? As usual, we'll also need to pass down a callback method that `<GameTimer>` can call with each "tick".

#### Function or Class Component?

If `<GameTimer>` had its own state, we would have to define it as a class component - **why?**

But even though `<GameTimer>` doesn't have its own state, it still has to be written as a class-based component because it's going to use a JavaScript timer created using `setInterval`.

Each timer consumes system resources (memory and CPU).

Since the `<GameTimer>` component will be using a timer, we want to make sure that it destroys the timer when itself is destroyed. For example, every time the player switches to the set difficulty route, `<GameTimer>` will be destroyed and then a new `<GameTimer>` created when the player returns to the game play route. BTW, this is another reason for keeping `elapsedTime` higher up in the hierarchy so that it doesn't get reset when the player moves to the settings page and then cancels.

The key to preventing a new timer from being created without the existing timer being "cleared" is to override the `componentDidMount` and `componentWillUnmount` lifecycle methods - again, only possible in class components.

### Coding the `<GameTimer>` Component

Let's get coding...

#### YOU DO: Refactor `<GameTimer>` as a Class Component (3 mins)

`<GameTimer>` exists as a Function Component - refactor it to be a Class Component.

#### Add `elapsedTime` to `<App>`'s State and Pass as a Prop

Let's add `elapsedTime` to `<App>`'s state by including it within the `getInitialState`:

```js
 // App.jsx

getInitialState() {
  return {
    selColorIdx: 0,
    guesses: [this.getNewGuess()],
    code: this.genCode(),
    // new state coming in!
    elapsedTime: 0
  };
}
```

**YOU DO:** Pass `elapsedTime` down as a prop named `elapsedTime` to `<GameTimer>`.

Click the 🌶 when finished.

#### Make it Tick

Time to override the `componentDidMount` lifecycle method in **GameTimer.jsx**:

```js
/*--- Lifecycle Methods ---*/

componentDidMount() {
  this.timerId = setInterval(this.handleTick, 1000);
}

render() {
...
```

As shown by the above diagram, `componentDidMount` will be called by React after the `render` method.

We'll get to the `handleTick` method in a bit.

We are creating a `timerId` property on the component to save the timer id returned by `setInterval`. When you need to remember data, but don't want to re-render when that data changes, be sure to assign that data to a property on the component or in a variable like we've done above.

With the timer's id stored, we can use it to clear the timer when the component is going to be destroyed by overriding the `componentWillUnmount` lifecycle method:

```js
componentWillUnmount() {
  clearInterval(this.timerId);
}
```

Now create the `handleClick` method and add some some code to let `<App>` know to increment `elapsedTime`:

```js
handleTick = () => {
  this.props.handleTimerUpdate();
};
```

`handleTimerUpdate` is a method that we're adding to **App.js** next. As you can see, we're calling it from `handleTick` with each tick.

#### Incrementing `elapsedTime` in `<App>`

We have to write that `handleTimerUpdate` callback method in **App.js**:

```js
handleTimerUpdate = () => {
  this.setState((state) => ({elapsedTime: ++state.elapsedTime}));
}
```

**YOU DO:** You know the routine - pass it down then click the 🌶 when finished.

#### Get Ticking

Finally, let's confirm that `elapsedTime` is being incremented by rendering it's value instead of the text of "GameTimer":

```js
  render() {
    return (
      <div>
        {this.props.elapsedTime}
      </div>
    );
  }
```

Awesome!

#### Formatting and Style `<GameTimer>`

Time to make `<GameTimer>` look like the wireframe.

First, let's convert the number of seconds into a `mins:seconds` format by writing a `formatTime` function.

Since `formatTime` is a general purpose function that we might reuse, let's define it outside of the class component:

```js
function formatTime(seconds) {
  let mins = Math.floor(seconds / 60).toString().padStart(2, '0');
  let secs = (seconds % 60).toString().padStart(2, '0');
  return `${mins}:${secs}`;
}

class GameTimer extends Component {
  ...
```

`padStart` and `padEnd` are handy new String methods added in the ES2017 spec.

Now we can invoke `formatTime` right in the render method:

```js
render() {
  return (
    <div>
      {formatTime(this.props.elapsedTime)}
    </div>
  );
}
```

Although your system might have the _Roboto Mono_ font installed, others may not so we should play it safe by adding this link to the Google font in **public/index.html**:

```html
<head>
...
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    
    <!-- Add the Roboto Mono font for the GameTimer component -->
    <link href="https://fonts.googleapis.com/css?family=Roboto+Mono" rel="stylesheet">
```

After making a couple of guesses, we would be displaying something like this:

<img src="https://i.imgur.com/xNzEDw1.png ">

Bravo!

Before the lab, let's wrap up with a couple of questions...

## ❓ Essential Questions

1. **In your own words, what do lifecycle methods allow developers to do?**

2. **Name two lifecycle methods.**

3. **Explain how to update a component's state from a child component.**

## 💪 Bonus Challenge Exercises

1. Make the timer stop ticking when the player has cracked the code.

2. Reset the timer when a new game starts - maybe the easiest exercise of all time since it already does this. Just ensure that you know why it works 😊

Be sure to test that timer stops when the game has been won!

#### Hints

- React encourages us to drive our app's functionality using "state". Maybe something like `isTiming`?

- `<App>` is the component that knows when the timer should be ticking or not.

- In `<GameTimer>`, don't try to clear `setInterval` to stop the timer, instead, just put some logic in the `handleTick` method to ignore ticks according to that new `isTiming` state being passed to it via props.

- There's a great place in **App.js** to update the `isTiming` state by adding a single line of code!

## References

[React Docs - The Component Lifecycle](https://facebook.github.io/react/docs/react-component.html#the-component-lifecycle)



