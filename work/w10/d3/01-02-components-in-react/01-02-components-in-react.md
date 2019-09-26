<img src="https://i.imgur.com/fx2orT2.png">

# Components in React
---

## Learning Objectives

| Students Will Be Able To: |
|---| 
| Design a UI using components |
| Define "presentational" (stateless) components as Function Components |
| Define "container" (stateful) & "presentational" components as Class Components |

## Roadmap

- "Component Thought"
- Review of Built-in vs. User-defined Components
- Categorizing Components as **Presentational** or **Container** Components
- Start a New React App - `react-mastermind`
- Exercise: Identify the App's Components
- A React Development Approach
- Defining **Presentational** Components as Function Components
- Defining Components as Classes
- Essential Questions
- Lab: Define the Remaining Components for Mastermind

## "Component Thought"

Components have become the fundamental building block of UIs created using modern-day front-end libraries/frameworks such as React, Angular, Vue, etc.

To develop a React application, we construct the UI with a hierarchy of components:

<img src="https://i.imgur.com/TqerRDf.png">

We must get used to thinking about our UI in terms of components. This "Component Thought" requires us to:

- Build several small components to make the code more manageable.
- Compose (combine) these components into other components.
- Compose an entire "screen", or "page", using a hierarchy of components.
- Use client-side routing to render the "screens" according to which route is active.

Although most SPAs implement their functionality with multiple routes and "screens", until we learn about routing in React, we will concern ourselves with building only a single screen/page.

#### f(d) = V

This is one way to think of components in React: `f(d) = V`, where a component is a function (`f`) that accepts data (`d`) and returns a view (`V`).

Does `f(d) = V` help you write better code? Probably not, but it's a good starting point in understanding how components work in React.

## Review of Built-in vs. User-defined Components

#### Built-in Components (React Elements)

As we've seen, React has several built-in components, such as `<input />`, that map to HTML elements. These built-in components are the only components that actually emit DOM elements in the browser document. These components are often called **React Elements**.

<details>
<summary>Syntactically, what distinguishes a built-in component from our user-defined components?</summary>
<p><strong>
React components are lower-cased, for example "&lt;div&gt;".
</strong></p>
</details>

#### User-defined Components

Our user-defined "custom" components may consist of any combination of other user-defined components and/or React Elements.

The name of our user-defined components must be capitalized.

<details>
<summary>Think for a moment: As we compose our app's UI with our custom components,  ultimately, no UI, no DOM elements, will be rendered in the browser window unless our components include what?</summary>
<p><strong>
React Elements like "&lt;div&gt;" - HTML is what the browser knows and loves.
</strong></p>
</details>

## Categorizing Components as _Presentational_ (stateless) or _Container_ (stateful) Components

#### State - A Quick Review

Most applications manipulate and display information/data.

<details>
<summary>What single word have we been using to describe this information/data?</summary>
<p><strong>
State
</strong></p>
</details>

In a React app, state might also refer to data properties used to represent the "status" of a process or UI state. For example `state.isLoading` or `state.showDetails`.

#### Where State is Held Matters

Later today, you will learn about how **state** is held in certain components and passed to their child components via what's known as **props**.

How do we know which components _should_ have state or just props? That's what we're going to discuss next...

#### Two Categories of Components

To build better UIs with components, experts like Dan Abramov within the React community have established guidelines to separate components into one of two different categories:

- **Container** (formerly known as "smart components")
- **Presentational** (formerly known as "dumb components")

#### Characteristics of _Container_ Components

- They hold state that pertains to the application.
- They are concerned with how things work, not how they look.
- Pass state and callback methods to presentational or other container components.
- May need to use lifecycle methods to fetch data from the server, etc.

#### Characteristics of _Presentational_ Components

- They are concerned with how things look.
- They receive state and callback methods via props.
- They are highly reusable because they don't hold application state.
- Rarely have their own state, and if they do, it’s UI-related state rather than application-related data, e.g., state used to represent whether the component's UI is collapsed or open.
- Are written as function components unless they need UI-related state or lifecycle methods (for optimization purposes). Lifecycle methods will be discussed next week.
- May contain other presentational, and sometimes container components.

<details>
<summary>In a typical React app, will there be more presentational or container components?</summary>
<p><strong>
A React app will have more presentational components than container components.
</strong></p>
</details>

## Start a New React App - `react-mastermind`

<img src="https://i.imgur.com/1KRUhfi.jpg" height="300">

#### Mastermind - _"A game of cunning and logic for two players"_

Developing a game in React provides excellent practice designing and developing React components.

Don't think that by writing a game, you won't learn how to use React in non-game apps. This game is going to be a full-stack app with CRUD on the backend and even advanced authentication! In reality, there's no better way to learn about React than by developing what we're going to this week!

Our goal is by the end of the week, to have a working game of [Mastermind](https://en.wikipedia.org/wiki/Mastermind_(board_game)).

You're not familiar? Come on, it was only named game of the year - in 1973 :)

It normally takes two players to play Mastermind because one player had to set the secret code and score the guesses of the other player trying to break the code.

Luckily, this app will make it possible for users to play Mastermind by themselves!

Let's check out what we're going to build [here](https://sei-mastermind.herokuapp.com/).

#### Generate the App

The **best** way to create a React project is by using the `create-react-app` tool.

Let's install it (you can be in any directory):

```
$ npm i -g create-react-app
```

Cool, now `cd` to this lesson's folder and create the React app like this:

```
$ create-react-app react-mastermind
```

It will take a bit because `create-react-app` also installs the Node modules - and there's a ton of them!

After the process completes:

1. `$ cd react-mastermind`
2. Open in VS Code: `$ code .`
3. Open terminal in VS Code (`ctrl + backtick`)
4. Spin up React's built-in development server: `$ npm start`, which will also automatically browse to the app.

For the most part, you will be coding your React apps by modifying/adding code within the `src` folder.

#### Ready the App for the Exercise

Not long ago, `create-react-app` generated the `<App>` component in **App.js** as a class.  However, it now uses a Function Component.

Function Components are "lighter weight", and with the recent addition of [hooks](https://reactjs.org/docs/hooks-intro.html), they can now manage state like Class Components (as well as implement their other features).

However, 99% of the React code out there uses Class Components to manage state and thus we will as well until we have a chance to cover hooks.

Let's modify **App.js** line-by-line, converting it to a class component and so that just a `<header>` is rendered:

```js
import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">React Mastermind</header>
      </div>
    );
  }
}

export default App;
```

Notice that the `App` class extends from `Component`, which is a _named import_ from the `react` module. You could also just import `React` and extend from `React.Component`.

Now let's clean up **App.css** also. Replace everything with the following:

```css
.App {
  text-align: center;
}

.App-header {
  background-color: #222;
  height: 50px;
  padding: 20px;
  color: white;
  font-size: 40px;
  text-align: center;
}
```

#### Additional Class/Function Differences

A couple of other differences you need to be aware of between Function Components and Class Components are:

- Function Components return their JSX from the function; whereas Class Components must define a `render` method that returns the JSX.
- You access props in a Class Component as `this.props` instead of just `props`, which is the name of the parameter commonly used when defining Function Components.

## Exercise: Identify the App's Components

#### Start With A Mockup or Wireframe

We'll need a mockup or wireframe of the Mastermind game to guide us.

Because I've already written the app, I'm able to show you a screenshot of the actual app we'll be building.

We're going to use the following screenshot as a hi-fidelity wireframe:

<img src="https://i.imgur.com/vgmgR1P.png">

#### Outline Components (Class Exercise)

Looking again at the image near the top of the page shows how we might identify components by outlining and naming the individual components. Doing so reveals the hierarchy and relationship between them.

Here are the names of the components used in the final app:

- `<App>`
- `<header>`
- `<GameBoard>`
- `<GuessRow>`
- `<GuessPegs>`
- `<GuessPeg>`
- `<GuessScore>`
- `<ColorPicker>`
- `<GameTimer>`
- `<NewGameButton>`
- `<footer>`

As a class, let's identify the hierarchy and outline the above components in the above wireframe.

> Let's ignore the **Difficulty** "button", because it's actually just a link (`<a>`) that routes to the difficulty screen.

## A React Development Approach

We all know how challenging it can be to get started developing an app. Of course, this app is only a front-end app, so we don't need to be concerned about a database, server routes, etc.

Let's review the following common approach:

1. Identify potential components (like we did above).
2. Identify the application's data-model (state). **State is the single-source of truth** in an application!
3. Start coding components in a top-down approach.
4. Put state in top-level **container** components (at least initially).
5. Add layout CSS to components (including "wrapper" built-in components such as `<div>`s) as needed to properly layout/group other components.
6. As development progresses, consider moving state closer to the presentational components that need common state and "below" the components that don't. More on state later today. This ongoing refactoring is like a lot of development - as much art as science.

In the next lesson we'll focus on the data model (state) that a game of Mastermind requires.

Lastly, [Thinking in React](https://facebook.github.io/react/docs/thinking-in-react.html) from the docs is a fantastic read that covers many of the above concepts in greater detail.

Let's start defining some components...

## Defining **Presentational** Components as Function Components

### Disclaimer

Hooks now allow state, lifecycle methods (effects), etc., to be implemented in Function Components.

However, as we initially learn about React and draw comparisons between Class and Function Components, we are going to set aside the addition of hooks which were added recently with version 16.8.0 of React.

#### What Are They?

**Function Components** were introduced in version 0.14 of React (current version is 16.9 - yes, they changed their versioning scheme).

Function Components provide a simpler syntax vs. defining components using classes.

Since most of the components you write will be presentational, Function Components will be your "go to" syntax and should be the preferred way to define components unless there's a reason to use a class instead - it has state or needs to use lifecycle methods other than `render` (future lesson).

Function Components take props as an argument and return the JSX (UI) you want to render, for example:

```js
// A function component using an ES2015 (ES6) arrow function:
const ConcertCard = (props) => {
  return (
    <div className='concert-card'>
      <h3>{props.concert.title}</h3>
      <Performers performers={props.concert.performers} />
      <Venue venue={props.concert.venue} />
    </div>
  );
};

// Then the component can be used like this:
<ConcertCard concert={concertObject} />
```

Function Components are functionally equivalent to Class Components when the class only defines a `render` method.  For example, the equivalent Class Component for the above `<ConcertCard>` component would be:

```js
class ConcertCard extends React.Component {
  render() {
    return (
      <div className='concert-card'>
        <h3>{this.props.concert.title}</h3>
        <Performers performers={this.props.concert.performers} />
        <Venue venue={this.props.concert.venue} />
      </div>
    );
  }
}
```

Hooks aside, Function Components cannot however have their own state and do not implement lifecycle methods (next week).

#### Write Our First Mastermind Component

Following the recommended approach above, we'll start coding the components higher in the hierarchy and work our way down.

The `<GameBoard />` component based on our wireframe is a great place to start - so let's:

1. Create a **components** folder within the **src** folder. All our new components will go inside this new folder.
2. Create a **GameBoard** folder within the **components** folder. This is a best practice that allows you to organize a component's module file with other files used by that component (primarily CSS files and tests).
3. Create a **GameBoard.jsx** (GameBoard.js also works) module within the **GameBoard** folder.  Note that the name of the module file is always the same as the component, including the UpperCamelCasing.
4. Add the following code to **GameBoard.jsx**:

	```js
	// When using JSX, React must be in scope
	import React from 'react';
	
	const GameBoard = (props) => (
	  <div>
	    GameBoard
	  </div>
	);
	
	export default GameBoard;
	```
	
5. Update **App.js** to:

	```js
	import React, { Component } from 'react';
	import './App.css';
	// Must import components used in the JSX
	import GameBoard from './components/GameBoard/GameBoard';
	
	class App extends Component {
	  render() {
	    return (
	      <div className="App">
	        <header className="App-header">React Mastermind</header>
	        <GameBoard />
	      </div>
	    );
	  }
	}
	
	export default App;
	```

Looking good.  However, as you build out the rest of the components for this lesson, it would be cool to see a border surrounding each `<div>` that you render for each of the components.
	
Let's define a "temporary" CSS class named `component` in **index.css** that will "outline" any element that contains the **component** class:

```css
.component {
  border: 2px dotted red;
  margin: 4px;
  padding: 4px;
}
```

Next, add the **component** CSS class to the `<div>` in the `<GameBoard>` component like this:

```js
const GameBoard = (props) => (
  <div className='component'>
  ...
```

Now you'll be able to easily identify the component hierarchy as you create the skeleton components we identified earlier.

<img src="https://i.imgur.com/twrEKiv.png">

#### YOU DO: Write Another Component as a Function Component (5 mins):

Now it's your turn to code another component.

Code the skeleton of the `<ColorPicker>` as a function component, putting it in its own folder, etc., just like `<GameBoard>`.

Don't copy your other code - for this exercise you should type everything out.

For now, let's not worry about layout.

Don't forget to add the **component** CSS class to the outer React Element.

Add `<ColorPicker>` to `<App>` and the display should look like this:

<img src="https://i.imgur.com/Go0rQnI.png">

## Defining Components as Classes

Both **presentational** and **container** components _may_ be written as JS classes, however, once again, presentational components should be written as functions.

However, any component that has its own state or needs to tap into the component's lifecycle methods (next week), must be defined as a class. This is because classes allow us to define and inherit methods such as `setState`, etc.

Let's examine the `<App>` component to see how a class is used to define a component.

Some observations:

1. This is a very simple component that currently does not hold any state, etc.
2. The only method is `render`. This is the only required method when defining a component using a class.
3. A class component can use a `constructor` method to initialize the component's state.
4. Because there's no state, there's no other methods defined, such as click event handlers, used to update state.
5. The first line is using ES2015's `import` statement to import functionality from the `react` module. The `React` object is the _default export_ and `Component` is a class that's exported as a _named export_. Note that a JS module can have only one _default export_ but as many _named exports_ as desired.
6. Components, whether defined as a class or a function, are usually the default export of the component's module.

You'll be working with Class Components this afternoon when you start working with state.

## ❓ Essential Questions

1. **A UI in React is a hierarchy of ____________.**

2. **True or False: Components used to render data passed to them via props are known as "presentational" components.**

3. **True or False: "Container" components hold state and may need need to use lifecycle methods to fetch data, etc.?**

4. **True or False: Currently, the common approach is to define "container" components as classes and "presentational" components as functions?**

## Lab: Define the Remaining Components for Mastermind

Build out the components for the Mastermind app based on the components identified earlier.

For now, all of the components can be defined as function components.

Be sure to render the components in a hierarchy that results in a display looking something like this:

<img src="https://i.imgur.com/gY4ANSw.png">

> Note that in the example, there are 2 `<GuessRow>` components being rendered within `<GameBoard>`.

#### Bonus - Basic Layout

As a bonus challenge, use CSS flexbox to rearrange the components into a basic layout as follows:

<img src="https://i.imgur.com/IBcCuxZ.png">

## References

[React Docs - Components & Props](https://facebook.github.io/react/docs/components-and-props.html)

[Thinking in React](https://facebook.github.io/react/docs/thinking-in-react.html)


