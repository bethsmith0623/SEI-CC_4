<img src="https://i.imgur.com/wMoRpTr.jpg">

# Mastermind Settings Lab

---

## Intro

In the lesson earlier you:

1. Learned how to use React Router to perform client-side routing.
 
2. Refactored the react-mastermind app to render a `<GamePage>` component at the root route.

3. Added a "Difficulty" `<Link>` to the `<GamePage>` used to navigate to a `<SettingsPage>` component.

3. As a practice exercise, added an additional `<Route>` with a path of `/settings`.

4. Created a minimal `<SettingsPage>` component that included a "HOME" `<Link>`.

In this lab, you'll continue to have fun building out react-mastermind using what you know about components, state, props, styling, methods, event handlers, routing and of course, JavaScript.

**This lab is not a deliverable**

## Set Up

The starter code for this lab is the same as the completed code from the _React Router_ lesson.

To get set up for this lesson:

- `cd` into the `starter-code/react-mastermind` folder for this lab.
- Open the project in VS Code: `$ code .`
- Open a terminal in VS Code (`ctrl + backtick`)
- Install the Node modules: `$ npm i`
- Start the React Dev Server: `$ npm start`

After the server starts up, you should see the following in the browser at `localhost:3000`:

<img src="https://i.imgur.com/ibMTm9k.png">

## Exercises

In this lab, you'll be adding the "Difficulty" setting functionality by completing the exercises below.

When completed, clicking the "Difficulty" link (styled as a button) will display the following:

<img src="https://i.imgur.com/gFjNSt0.png">

As you can see, the settings page allows the player to change the difficulty level by selecting the number of colors available to choose from!

1. Currently, the `<GamePage>` component is relying on CSS classes defined in **App.css**. Refactor to cure this inappropriateness by copying the classes in **App.css** over to **GamePage.css** created during the lesson. Update the class names and update **GamePage.jsx** as required to use those class names. 

2. Since both `<App>` & `<GamePage>` rely on a `*-header-footer` class with the same styling, refactor by renaming it to `header-footer` and putting it in **index.css** instead. Update **App.js** & **GamePage.jsx** to use `header-footer`, then you can delete `GamePage-header-footer` from **GamePage.css** and all of the CSS in **App.css**.

3. There will be three levels of difficulty: 'Easy'; 'Moderate'; and 'Difficult'.  The game's difficulty will be held in a state property named `difficulty`. Add the `difficulty` property to `state` and initialize it with a value of `'Easy'`. However, `difficulty` should not be "reset" if the player clicks the **[New Game]** button.

	Hint: Not resetting `difficulty` requires that it not be part of the object returned by the `getInitialState` method.  Instead, `difficulty` should be initialized one time on the `state` state object within the `constructor`. 
	
4. Using strings such as 'Easy', etc., to represent the `difficulty` is a fantastic way to access the array of colors for a particular difficulty level by using an object as a lookup. Refactor the `colors` array in **App.js** to be an object with keys of `Easy`, `'Moderate` and `Difficult` which hold arrays of 4, 5, or 6 color strings respectively.

	Hint: The first couple of lines will look like this
	
	```js
	const colors = {
	  Easy: ['#7CCCE5', '#FDE47F', '#E04644', '#B576AD'],
	  ...
	```

5. Changing the structure of `colors` expectedly broke the code because we were used to passing `colors` as an array to `<GamePage>`. Refactor the value that is assigned to the `colors` prop in `<GamePage>` such that the appropriate array in the refactored `colors` object is passed according to the value of the `difficulty`  state property. With this step complete, the react-mastermind will be working again.

6. Now comes the "fun" part - building out the `<SettingsPage>` component so that:

	- It displays the UI shown above, including the three difficulty levels, with a button to select the level and the colors rendered as pegs. Also, theres a "Cancel" link used to return to the root without changing the difficulty.

	- The button to select the difficulty level is disabled for the currently selected difficulty.

	- Clicking one of difficulty buttons should update the `difficulty` state, initialize a new game, and programmatically route back to the `<GamePage>` page (root route).
	
	Hints:
	
	- As always, use React Developer Tools to browse components and check/modify state & props.
	
	- `<SettingsPage>` is going to need both the `colors` object and the `difficulty` state property.

	- Since `difficulty` lives in the state of `<App>`, guess where the method to update it will live. Plus, this method's code should update `difficulty` using `setState` of course, however, **after** the `difficulty` state is updated, you will then want to invoke the `handleNewGameClick` method to start a new game.  Running code **after** the asynchronous `setState` method has updated the state is best implemented by providing a callback function to the `setState` method as a second argument:
	
	```js
	this.setState(<object> or <function>, <callback>);
	```
	That callback function can be an anonymous function that simply calls `this.handleNewGameClick();`.

	- The above mentioned method will need to be passed down to the `<SettingsPage>` where it can be invoked to update `difficulty`.  Then, after invoking the method you can use the technique shown in the _React Router_ lesson to programmatically route to `/`.

Choosing the **Difficult** level will result in the root route displaying this:

<img src="https://i.imgur.com/IaKWyLR.png">

Good luck cracking the code!
