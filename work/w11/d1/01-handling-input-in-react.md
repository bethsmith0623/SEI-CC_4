<img src="https://i.imgur.com/3ICCGrF.jpg">

# Handling Input In React

| Students Will Be Able To: |
|---|
| Use "controlled" `<input>` elements in React |
| Use `<form>` elements properly in React |
| Use validation to prevent adding invalid data |
| Use a `ref` to access a DOM element directly |

## Road Map

- Set Up
- Review the Starter Code
- Controlled Inputs in React
- Adding the New Skill to State

## Set Up

To get set up for this lesson, please:

- Create a React Sandbox in [CodeSandbox](https://codesandbox.io/) and name it "Handling Input".

- Replace the existing `<App>` component with this starting code:

	```js
	class App extends React.Component {
	  state = {
	    skills: [{ skill: "JavaScript", level: 4 }]
	  };
	
	  addSkill = () => {
	    alert("ADD SKILL CLICKED");
	  };
	
	  render() {
	    return (
	      <section>
	        <h2>DEV SKILLS</h2>
	        <hr />
	        {this.state.skills.map(s => (
	          <article key={s.skill}>
	            <div>{s.skill}</div> <div>{s.level}</div>
	          </article>
	        ))}
	        <hr />
	        <form>
	          <label>
	            <span>SKILL</span>
	            <input name='skill'/>
	          </label>
	          <label>
	            <span>LEVEL</span>
	            <select name='level'>
	              <option value="1">1</option>
	              <option value="2">2</option>
	              <option value="3">3</option>
	              <option value="4">4</option>
	              <option value="5">5</option>
	            </select>
	          </label>
	          <button onClick={this.addSkill}>ADD SKILL</button>
	        </form>
	      </section>
	    );
	  }
	}
	```

- Let's make it look okay by replacing the contents of **styless.css** with:
		
	```css
	* {
	  box-sizing: border-box;
	}
		
	body {
	  font-family: Arial, Helvetica, sans-serif;
	  height: 100vh;
	  display: grid;
	  justify-items: center;
	  align-items: center;
	}
		
	h2 {
	  color: #f17d80;
	  margin: 0;
	  text-align: center;
	}
		
	section > article {
	  display: flex;
	  justify-content: space-between;
	  min-width: 15rem;
	  color: white;
	  margin: 0.1rem;
	  background-color: #737495;
	}
		
	article > div {
	  padding: 0.5rem;
	}
		
	article > div:nth-child(2) {
	  width: 2rem;
	  background-color: #f17d80;
	  text-align: center;
	}
		
	label {
	  display: flex;
	  align-items: center;
	  margin-top: 0.5rem;
	}
		
	label span {
	  color: #737495;
	  width: 4.5rem;
	}
		
	input,
	select {
	  width: 100%;
	  font-family: Arial, Helvetica, sans-serif;
	  font-size: 1rem;
	  font-weight: bold;
	  padding: 0.4rem;
	  color: #f17d80;
	  border: 2px solid #737495;
	  border-radius: 0;
	  outline: none;
	  -webkit-appearance: none;
	}
		
	button {
	  display: block;
	  font-family: Arial, Helvetica, sans-serif;
	  font-size: 1rem;
	  margin: 0.5rem 0 0 auto;
	  padding: 0.4rem;
	  background-color: #f17d80;
	  color: white;
	  border: none;
	  outline: none;
	}
		
	button:hover {
	  color: white;
	  background-color: #737495;
	}
	```
	
The sandbox will look something like this once the above setup is complete:

<img src="https://i.imgur.com/ntFDX0q.png">

## Review the Starter Code (pair/share - 3 min)

Currently the app is not functional - it doesn't add new Dev Skills to the list. We will implement this functionality during the lesson.

Please review the code in the `App` class and discuss your observations and any questions you may have with a pair.

We will discuss any lingering questions you may have in a few minutes.

## Controlled Inputs in React

#### Controlled Inputs - The "React Way" to Handle Input

How many times have you heard us say that things are a little different in React?

Handling **inputs** is also different - by inputs, we are talking about the `<input>`, `<textarea>` & `<select>` React elements that are commonly used to get input from a user.

React prefers that we don't access DOM elements directly. In fact, at this point, we haven't even seen _how_ to access DOM elements directly via React. However, by the end of this lesson you will.

So, if we don't access an input's value like we typically do in JS, e.g., `inputEl.value`, what's the secret?

The secret, like many things in React is `state`! React, wants the text/value of inputs to be held in `state`.

React "controlled" inputs have their value assigned to them via the `value` prop, which will be bound to the appropriate `state` property using a JSX expression.  For example, if you had a `title` property on the `state` object, you could bind that `title` property to an `<input>` as follows:

```html
<input value={this.state.title} />
```

So for our Dev Skills app, if the `<input>` & `<select>` inputs currently in `<App>` are going to get their values from `state`, we're going to need to add two new properties to `state` dedicated to maintaining the "state" of each input:

```js
state = {
  skills: [{ skill: "JavaScript", level: 4 }],
  // New state for the inputs below
  skill: "",
  level: 3
};
```

Notice that we intend to initialize the value of the `<select>` for the skills's `level` to `3`.

Now, we can "connect" those state properties to their respective inputs using the `value` prop:

```html
  ...
  {/* Connect the input to state.skill */}
  <input name="skill" value={this.state.skill} />
</label>
<label>
  <span>LEVEL</span>
  {/* Connect the select to state.level */}
  <select name="level" value={this.state.level}>
  ...
```

As predicted, the `<select>` has been initialized to `3`:

<img src="https://i.imgur.com/yjQL04t.png">

**YOU DO: Try assigning a "default" string value to the `skill` property in `state`**

#### Updating Inputs

Since the inputs are linked to state, updating the values displayed requires us to use `setState` to update their state properties.

Go ahead and try to change their values by interacting with the inputs - denied!

The React way for controlled inputs requires using event handlers to update the state.

First add an `onChange` prop to the `<input>`:

```js
<span>SKILL</span>
<input
  name="skill"
  value={this.state.skill}
  {/* Add an event handler */}
  onChange={this.handleChange}
/>
```

> Unlike the `change` event in vanilla JS which is triggered only after an `<input>` or `<textarea>` loses the focus, the `onChange` prop's assigned event listener will be invoked each time the user types something.

Now add the `handleChange` method that will be called every time a character is added or deleted:

```js
// Add the onChange event handler
handleChange = e => {
  this.setState({ skill: e.target.value });
};

render() {
```

Rock and roll!

Now let's do the same for the `<select>`.

However, the current `handleChange` method is dedicated to the updating the `skill` property.

Does this mean you have to create a new method for each input?

Not if you know modern JavaScript you don't!

Refactor `handleChange` as follows to take advantage of [computed property names](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#Computed_property_names) within object literals:

```js
handleChange = e => {
  this.setState({ [e.target.name]: e.target.value });
};
```

Those square brackets on the left-hand side of the colon allow us to use an expression to "compute" the property name!

That single handler can now update state for any number of inputs - just be sure the values assigned to the `name` props match the names of the properties in the `state` object.

Okay, let's add the event handler to the `<select>`:

```js
<select
  name="level"
  value={this.state.level}
  onChange={this.handleChange}
>
```

Now you know how "Controlled" inputs work in React!

#### 💪 Practice Exercise (10 min)

When gathering data from the user using inputs, at some point you're going to want to do something with that data, for example:

- Use AJAX to send it to a server, or
- Add it to another part of the app's state

To do so, it's nice to have all of the related data isolated in its own object to ease the use of it.

Currently however, the `skill` and `level` properties on `state` are not isolated from `skills`.

Do the following refactor:

1. Move the `skill` & `level` properties to a `newSkill` object on `state`. When finished with this step, `state` will have just two top level properties: `skills` (the array of skills entered) & `newSkill` (the object linked to the inputs for adding a new skill).

	> Hint: You will also need to update the `value` props of the inputs.

2. Update the `handleChange` method so that it replaces, not mutates, the `newSkill` object when either `skill` or `level` are being changed.

When finished, be sure to test it out by changing both inputs.	
## Adding the New Skill to State

#### No Forms Required

A key point to realize when it comes to using forms in React is that, we don't _need_  them.

Unlike the traditional web apps we've built so far using Express and Django, **thanks to _____**, SPAs don't use forms to send data to the server.

Further, we don't need to wrap the **skill** or **level** inputs in a `<form>` to be able to add them to the DEV SKILLS list.

It's just a matter of updating state by adding the `newSkill` object to the `skills` array - and we don't need a form to do that. No form or submit button is necessary - we can update state whenever we want to: when the user interacts with the app, when a timer event happens, etc.

Let's ignore the **[ADD SKILL]** button for a moment, and write the code to add the `newSkill` when the `<h2>DEV SKILLS</h2>` is clicked.

We'll review as we type the new code in the `addSkill` method:

```js
addSkill = () => {
  // Using the "function" approach because relying on existing state
  this.setState(state => ({
    // Always replace, don't mutate top-level state properties
    skills: [...state.skills, state.newSkill],
    // Reset the inputs for better UX
    newSkill: {skill: '', level: 3}
  }));
};
```

**YOU DO: Add an `onClick` prop temporarily to the `<h2>` so that it calls the `addSkill` function.**

Test it out!

<img src="https://i.imgur.com/C6QvZQo.png">

#### Using Forms in React

Although forms are not required for handling input in React, they can provide benefits such as:

- Using CSS frameworks to perform styling on inputs that rely on them being wrapped in a form.
- Validation of inputs.

Currently, the `<form>` component is being rendered in the DOM:

<img src="https://i.imgur.com/ur4nSQK.png">

Note that unlike forms we've used before, there's no `action` or `method` attributes - nor, should there ever be in a SPA's forms.

However, despite those missing attributes, and despite the fact that the **[ADD SKILL]** button within the form is not of `type="submit`, the darn form will still send off an HTTP request if we press **[return]** while inputting data or click the button - triggering a full-page refresh!

In React, we need to prevent the browser from submitting forms and we first do this by **always** using the `onSubmit` prop on `<form>` components:

```js
<form onSubmit={this.addSkill}>
```

Then, **always** calling the event object's `preventDefault` method straightaway:

```js
addSkill = e => {
  e.preventDefault();
```

Be sure to add a parameter (`e` in this case) to accept the event object.

Problem solved!  The `preventDefault` method does just what it says, it prevents the default submit from happening.

#### Validating Inputs

Although the app is working as planned, we're not taking advantage of the form's HTML5 validation capabilities.

As we saw in the lesson on Regular Expressions, we can add a `required` and `pattern` attribute to HTML inputs to validate their data.

Let's prevent the ability to add empty skills by adding these props to the skills input:

```js
<input
  name="skill"
  value={this.state.newSkill.skill}
  onChange={this.handleChange}
  {/* Add these two additional props to set constraints */}
  required
  pattern=".{2,}"
/>
```

One of the Web APIs included in browsers is a comprehensive [constraint validation API](https://developer.mozilla.org/en-US/docs/Web/API/Constraint_validation).

It's usually more convenient to perform validation at the `<form>` level because its validation status will take into consideration that of all of its inputs. In other words, we don't have to check every input's validation, just the form's since if just a single input is invalid, the form will consider itself to be invalid.

One of the useful methods provided by the API is the `checkValidity` method that returns `true` if the input/form is valid, or `false` if it's not.

However, the API's methods must be called on the actual DOM element, thus requiring a reference to that DOM element.

As an example, let's test out the `checkValidity` method on just the skills input:

```js
handleChange = e => {
  // e.target is the DOM element that changed
  console.log(e.target.checkValidity());
``` 

Testing it shows that at least two characters need to be entered in the skill input before `true` is logged.

Now that we've seen how we can check an individual input's validity, let's see what it takes to check the validity of the entire form...

#### Using a `ref` to Access DOM Elements

Unfortunately, the event object's `target` property is not providing us with access to the `<form>` DOM element from within the `addSkill` method.

We could use the `element.closest(selector)` method on the inputs to find the form, however, let's take advantage of this opportunity to learn about how React provides access to DOM element by using a [ref](https://reactjs.org/docs/refs-and-the-dom.html).

> Key Point: Although using a ref has a few useful use cases like third-party library integration, they should be used sparingly and never to bypass React's way of updating the DOM, etc.

A ref is an object that provides access to a DOM element.

There's no reason to hold a ref in state, so we'll create a ref and store it in a separate property on the instance like this:

```js
state = {
  skills: [{ skill: "JavaScript", level: 4 }],
  newSkill: {
    skill: "",
    level: 3
  }
};
// Create a ref and store in a property named formRef
formRef = React.createRef();
```

With the ref created, all that's left is to "link" it to a component's DOM element by using the `ref` prop:

```js
<form ref={this.formRef} onSubmit={this.addSkill}>
```

Let's see what a `ref` looks like by logging it out:

```js
render() {
  console.log(this.formRef);
```

Checking the console shows that the ref object has a `current` property used to access the DOM element.

Now we can prevent adding a new skill if the form's invalid like this:

```js
addSkill = e => {
  e.preventDefault();
  // Do nothing if the form is invalid
  if (!this.formRef.current.checkValidity()) return;
```

Take a moment to think about how you could use the `required` and `pattern` attributes to prevent bogus data from being processed.

#### Disabling the Button if the Form is Invalid

What if we want the **[ADD SKILL]** button to be disabled depending upon the validity status of the form?

A typical React approach would be to first create a new property on `state` to track the validity of the form:

```js
state = {
  skills: [{ skill: "JavaScript", level: 4 }],
  newSkill: {
    skill: "",
    level: 3
  },
  // New state property to track validity of the form
  formInvalid: true
};
formRef = React.createRef();
```

Now in the `render` method, use `this.state.formInvalid` to  conditionally add the `disabled` prop to the button:

```js
<button
  onClick={this.addSkill}
  disabled={this.state.formInvalid}
>
```

The last part requires updating `formInvalid` each time an input changes, i.e., from within the `handleChange` method:

```js
handleChange = e => {
  const newSkill = { ...this.state.newSkill };
  newSkill[e.target.name] = e.target.value;
  this.setState({
    newSkill,
    // update using the formRef
    formInvalid: !this.formRef.current.checkValidity()
  });
};
```

That takes care of the functionality, however, the button won't look disabled unless we add a touch more CSS:

```css
button:disabled {
  background-color: lightgrey;
}
```

<img src="https://i.imgur.com/gYpjVm1.png">

Nice!

## ❓ Essential Questions

Take a moment to review the following questions:

1. **Where does a "controlled" `<input>` get its value from?**

2. **True or False: All input-related components must be wrapped by a `<form>` component.**

3. **A React "controlled" `<input>` requires both a `value` and an `________` prop.**


## References

- [React Docs - Forms](https://reactjs.org/docs/forms.html)

- [React Docs - Uncontrolled Components](https://reactjs.org/docs/uncontrolled-components.html)
