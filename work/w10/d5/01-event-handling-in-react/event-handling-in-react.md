<img src="https://i.imgur.com/48HIUiX.jpg">

# Event Handling in React
---

## Learning Objectives

| Students Will Be Able To |
|---|
| Use event props to attach event handlers |
| Pass an event handler (method) to a child component |
| Ensure event handlers that need to modify state have `this` bound to the proper context (component) |
| Use ES2017's Property Initializer syntax to efficiently and concisely bind methods |
| Optionally pass arguments to event handlers |

## Roadmap

- Set Up
- Review the Starter Code
- Browser Events in React
- Event Handlers (methods)
- Summary
- Essential Questions

## Set Up

The starter code for this lesson is the same as the solution code from the _Styling React Lab_.

To get set up for this lesson:

- `cd` into the `starter-code/react-mastermind` folder for this lesson.
- Open the project in VS Code: `$ code .`
- Open a terminal in VS Code (`ctrl + backtick`)
- Install the Node modules: `$ npm i`
- Start the React Dev Server: `$ npm start`

## Review the Starter Code

React's dev server will automatically open Mastermind in the browser, which should look like this:

<img src="https://i.imgur.com/T4dN4UU.png">

### Refactoring the App's State

For the styling lab, within `<App>`'s `constructor`, the `guesses` array was being initialized with 4 calls to `this.getNewGuess()`.

Let's update **App.js** so that the game loads correctly with only one pending guess:

```js
constructor() {
  super();
  this.state = {
    selColorIdx: 0,
    // Update to initial with only one guess object
    guesses: [this.getNewGuess()],
    code: this.genCode()
  };
}
```

That's a good start, but we also don't want to "pre-select" the player's color choices as we're currently doing with this line, `code: [3, 2, 1, 0]`, inside of the `getNewGuess` method (again, for styling purposes).

**What do those numbers correspond to?**

Instead, we are going to represent a "no color choice" with a `null` value like the line that's commented out in the `getNewGuess` method.

Let's uncomment that line and delete the other "for testing purposes" line to update `getNewGuess` as follows:

```js
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

With that done, the pegs will no longer have any visual representation (but the `<div>`s are still there):

<img src="https://i.imgur.com/JKWBtLC.png">

Instead of an invisible `<div>`, we want to render a "null" peg with a dashed grey border.

To accomplish this, let's update the object being assigned to the `style` prop in **GuessPeg.jsx** as follows:

```js
const GuessPeg = (props) => (
  <div
    className={styles.peg}
    style={{
      backgroundColor: props.color,
      /* Add a new CSS border property */
      border: props.color ? `1px solid ${props.color}`: '1px dashed grey'
    }}
  />
);
```

Just another ternary expression!
 
That's a tidy example of dynamic styling for the `border` property.

<img src="https://i.imgur.com/7CX8Dfs.png">

Looking good now, but let's also make the pegs in the **current** guess row look "clickable" by making the cursor a pointer.

Yay, another opportunity to put the `currentGuess` prop to good use.

But, the four `<GuessPeg>` components don't yet have access to the `currentGuess` prop...

---

#### 💪 Exercise - Passing Props

**Beginning with the parent component of `<GuessPeg>`, keep going up the component hierarchy until you have access to the `currentGuess` prop. Then turn around and pass down the `currentGuess` prop to each `<GuessPeg>` component.** (Hint: React Developer Tools can help here)

Click the 🌶 when done.

---

Now that each `<GuessPeg>` has a `currentGuess` prop, we can add another property to the `style` object to set the CSS `cursor` property:

```js
style={{
  backgroundColor: props.color,
  border: props.color ? `1px solid ${props.color}`: '1px dashed grey',
  cursor: props.currentGuess && 'pointer'
}}
```

> Refresher: JS's logical `&&` (and) operator returns the first value if it's falsey. Otherwise, the second value (`'pointer'`) is returned.

Note that React does not complain if we assign `false` to the `cursor` property - it just ignores it!

Excellent! Now we're ready to talk about events...

## Browser Events in React

First, **what are some common browser events we've worked with during SEI so far?**

In case you need to be reminded, [here you go!](https://developer.mozilla.org/en-US/docs/Web/Events).

Like many things in React, event handling is a little different than what we are used to.

Let's see how...

#### Connecting Handler Code to Events in React

In React, we do not add event listeners using JavaScript's `addEventListener` method. Instead, we use certain props on React Elements (`<div>`, `<p>`, etc.) to connect those components' events to a handler (method/function).

Let's see this by adding an anonymous arrow function as a click handler on the colored circles within the `<ColorPicker>` component:

```js
const ColorPicker = (props) => (
  <div className={styles.ColorPicker}>
    {props.colors.map((color, idx) =>
      <button
        key={color}
        className={styles.button}
        style={{
          backgroundColor: props.selColorIdx === idx ? 'white' : color,
          borderColor: color
        }}
        {/* add the click handler below */}
        onClick={() => alert('clicked!')}
      />
    )}
  </div>
);
```
Just a baby-step `alert` for now - test it out.

Event observations thus far:

- The names for event props are camelCased (`onClick`). In HTML, the attribute would be `onclick`. Here's the [list of events](https://facebook.github.io/react/docs/events.html#supported-events) supported by React.
- The JS expression (always within curly braces) assigned to an event prop must evaluate to a **function**. A function type, **not** a function call (unless that function call returns a function).
- In native JS, if the event handler function returns `false`, it prevents the default behavior of that event and stops event bubbling (same as calling both the `preventDefault()` & `stopPropagation()` methods). However, in React we must call the `preventDefault()` method on the **Synthetic Event** object...

> One last observation - check out the best practice code formatting/indentation when a component has more than a couple of props!

#### The Synthetic Event Object

You've seen how event handlers are automatically passed an event object as an argument. In a React app however, this event object is a React [`SyntheticEvent`](https://facebook.github.io/react/docs/events.html) that wraps the browser's native event object.

React does this because React has its own event system that:

- Handles lingering browser incompatibilities.
- Improves performance by implementing a single delegated event handler for all events.

Luckily though, React's event system is transparent to us - we don't need to know the nitty gritty details. 

More importantly, the API of the Synthetic Event object is identical to the browser's, which means we can still invoke `preventDefault()`, `stopPropagation()`, access `target` & `clientX` properties, etc.

## Event Handlers (methods)

Okay, we just popped up an alert when one of the colors in the `<ColorPicker>` was clicked by using an anonymous arrow function as an event handler.

More commonly though, the event handler will need to update some state in response to an event.

Questions:

<details>
	<summary>What method do we call to update a component's state?</summary>
<p>

```js
setState()
```
</p>
</details>


<details>
	<summary>Where do we need to write the code to call that method?</summary>
<p><strong>
From within the component that owns the state that being updated
</strong></p>
</details>

#### Defining a Method for Event Handling

Let's continue working with the `<ColorPicker>` with the intention of updating the `selColorIdx` in state to the index of the clicked color...

<details>
	<summary> What component owns the <code>selColorIdx</code> state property?</summary>
<p>
<code>&lt;App /&gt;</code>
</p>
</details>

<details>
	<summary>Where are we going to have to put the method that calls <code>setState()</code> to change the value of <code>selColorIdx</code>?</summary>
<p><strong>
Within <code>&lt;App /&gt;</code>, of course!
</strong></p>
</details>

<br><br>Start by defining a method in `<App>` that baby-steps by popping up an alert:

```js
handleColorSelection() {
  alert('color selected!');
}
	
render() {
  ...
```

> It's not a bad idea to start the name of event handler methods with the word `handle`, e.g., `handleSomeInteraction`

#### Passing Event Handlers to Children Components

We need to be able to invoke the `handleColorSelected` that lives in `<App>`, from the `<ColorPicker>` component.

Just like passing other expressions, we can give `<ColorPicker>` a **reference** to the method via props!

Update **App.js** like this:

```html
<ColorPicker
  colors={this.state.colors}
  selColorIdx={this.state.selColorIdx}
  handleColorSelection={this.handleColorSelection}
/>
```

Now, `<ColorPicker>` will have access to the `handleColorSelection` via `props.handleColorSelection`.

> As usual, we access methods from other methods via `this`.

Now, inside of `<ColorPicker>` we can replace the `onClick={() => alert('clicked!')}` with `props.handleColorSelection`:

```js
const ColorPicker = (props) => (
  <div className={styles.ColorPicker}>
    {props.colors.map((color, idx) =>
      <button
        ...
        {/* Update this line */}
        onClick={props.handleColorSelection}
      />
    )}
  </div>
);
```

> Note: We got lucky in that `<ColorPicker>` is a direct child of `<App>`. However, this often won't be the case, so, **what will we have to do?**

You should now see the alert when a color is clicked!

Can it really be this easy? In most cases, the answer is "No" due to the reasons we are going to discuss next...

#### Providing Arguments to Methods

We often need to pass arguments to method calls.

In regards to clicking a color in `<ColorPicker>`, we want to pass the newly selected color's index as an argument to the `handleColorSelection` method so that we can use it to update `selColorIdx` accordingly.

Let's update the `handleColorSelection` method in **App.js** to accept the index as an argument and test it by alerting the value:

```js
handleColorSelection(colorIdx) {
  alert(`color index ${colorIdx} selected!`);
}
```

Currently, it's alerting the React synthetic event object.

Now back to `<ColorPicker>`...

As stated earlier, we must provide a function type, **not invoke** the function. So **this won't work**:

```js
onClick={props.handleColorSelection(idx)}
```

Writing the above code will unfortunately invoke the method each time `<ColorPicker>` is rendered - resulting in an alerts popping up each time, funny, but not really.

So, what's the solution? Try this on for size:

```js
onClick={() => props.handleColorSelection(idx)}
```

Wrap the code inside of a function - nice solution!

Testing it out shows that `idx` is now being provided to the `handleColorSelection` method!

However, there's a bug...

#### Context Binding

Now that we have the index of the newly selected color being passed to `handleColorSelection`, it seems like we should be able to easily call `setState` to update `state.selColorIdx` like this:

```js
handleColorSelection(colorIdx) {
  this.setState({selColorIdx: colorIdx});
}
```

However, testing it out reveals that it doesn't work and there's an error in the browser's console telling us why: `Uncaught TypeError: this.setState is not a function`.

We know that the component has a `setState` method on it, so what gives? The problem is that `this` is not bound to the instance of the `<App>` component!

Logging out `this` from within the `handleColorSelection` method in **App.js** will verify that it's actually bound to `<ColorPicker>`'s `props` object - not `<App>` where the `handleColorSelection` method lives!

<details>
<summary>Why is <code>this</code> within <code>handleColorSelection()</code> being bound to the <code>props</code> object?</summary>
<p><strong>
The binding of <code>this</code> is determined by how a function is called. In this case, since the <code>handleColorSelection</code> method was called like <code>props.handleColorSelection()</code>, <code>this</code> is the <code>props</code> object because it's left of the dot!
</strong></p>
</details>


<br>So, we need to have `this` bound to the `<App />` component where the `setState()` method is.  There are a couple of ways to explicitly set the binding of _regular_ functions by using their `bind`, `call` and `apply` methods.

In React, prior to an upcoming JS feature that I'm going to show you next, the most popular way was to use `bind` in the constructor to create a **new** function that has `this` explicitly bound to its first argument:

```js
class App extends Component {
  constructor(props) {
    super(props);
    let colors = ['#155765', '#57652A', '#AB9353', '#4D2C3D'];
    this.state = {
      colors,
      code: this.genCode(colors.length),
      selColorIdx: 0,
      guesses: [this.getNewGuess()]
    };
    // Explicit binding to this component
    this.handleColorSelection = this.handleColorSelection.bind(this);
  }
  ...
```

That one line of code fixed the problem, however, there's a newer syntax that a lot of React devs are starting to use...

#### ES2017's Property Initializer Syntax

Wouldn't it be nice to have the method's `this` correctly bound in the first place? 

There's a better way to fix our `this` binding issue using the bleeding edge **Property Initializer Syntax** (AKA Class Fields).

_Property Initializer Syntax_ allow properties to be written within the body of a class in a way similar to how methods are defined.

Here's how property initializer syntax can be used to initialize a `sweet` property and an `eat` property (assigned a function making it a "method"):

```js
class Candy {
  constructor(name) {
    this.name = name;
  }
  sweet = true;
  eat = () => { console.log('Yummy!'); };
}
```

The above code internally gets translated into this:

```js
class Candy {
  constructor(name) {
    this.name = name;
    this.sweet = true;
    this.eat = () => { console.log('Yummy!'); };
  }
}
```

Note that because _class fields_ are actually being initialized within the `constructor` method and since arrow functions always bind `this` to the value of its enclosing function, `constructor` in this case, methods defined using property initializer syntax will always be properly bound to the instance of the component!

Now let's fix the `handleColorSelection` problem using property initializer syntax.

First, remove the explicit binding line of code we just added in the `constructor`:

```js
// remove this line of code from the constructor
this.handleColorSelection = this.handleColorSelection.bind(this);
```

Okay, here's the latest and greatest way, using _class fields_, to define a method used as a callback:

```js
handleColorSelection = (colorIdx) => {
  this.setState({selColorIdx: colorIdx});
}
```

Now, **unlike the following syntax**:

```js
handleColorSelection(colorIdx) {
  this.setState({selColorIdx: colorIdx});
}
```

`this` will always be correctly bound to the component, thus, no more tears!

Property initializer syntax is already implemented natively in Chrome - and thanks to Babel and Webpack, you are free to use them without fear in your React apps today!

## Summary

Writing event handler code can be challenging and error prone until you get used to it.

If things aren't working, be sure to verify the value of `this` and closely read the error messages

Use React Developer Tools to check that methods, etc. are being passed correctly via props.

Also, instead of console.logging, use the `debugger` statement to programmatically set a breakpoint in the source code so that you can use DevTools debugger to inspect the values of variables/expressions, and step through lines of code one at a time, etc.

## ❓ Essential Questions

Take a minute to review the following questions:

1. **True or False: Does a method that contains code to update a component's state have to be defined within that component? Explain your answer.**

2. **How does a nested component obtain a reference to an ancestor component's methods?**

3. **Is this code bogus or cool? Explain your answer.**

	```js
	<Square className="Square" handleClick={this.handleClick(5)} />
	```

## References

[Synthetic Events](https://facebook.github.io/react/docs/events.html)





