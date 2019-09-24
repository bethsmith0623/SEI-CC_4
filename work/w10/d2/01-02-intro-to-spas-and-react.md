<img src="https://i.imgur.com/fx2orT2.png">

# Intro to SPAs and ReactJS
---

## Learning Objectives

|Students Will Be Able To:|
|---|
| Explain the difference between a SPA and a traditional web application |
| Explain how client-side routing avoids full-page refreshes |
| Explain the use case of React |
| Explain the role tooling plays when developing a React app |

## Roadmap

- Intro to SPA Architecture
- Intro to ReactJS
- Tooling
- Lab: Official React Tutorial
- Further Study

## Intro to SPA Architecture

### Review - What is a Single-Page App?

We've talked about them quite a bit - **what are they?**

<img src="https://i.imgur.com/m01TbLF.png">

In a traditional web app, if we click a link, submit data via a form, or type in the address bar and press [enter], **what happens?**

In a SPA, we still want to be able to access different functionality by clicking links, submitting data to the server, etc., however, we want the UI to update without triggering a full-page refresh.

There are three main concepts that make this possible:

1. AJAX communication between client and server
2. Client-side routing
3. Client-side rendering

### Concept 1: Client/Server Communication via AJAX

As you've seen the `fetch` API and utilities such as Axios & jQuery's AJAX methods can be used to send HTTP requests to a server using JavaScript instead of the browser.

The server then responds with an HTTP response, which usually contains a JSON payload in the response body.

Because the request and response were all handled in the JavaScript, the browser does not reload the page!

### Concept 2: Client-side Routing

So far, our traditional web apps in the browser have reloaded page after page as we've interacted with it by clicking navigation links and submitting forms.

In a SPA, we still need a way to switch to different "pages" or functionality (see diagram above) - but without refreshing the entire HTML document that's currently loaded in the browser.

**Client-side routing** is what enables users to interact with the app without triggering a full-page refresh. 

We'll be defining client-side routes and the address bar's URL will continue to change in order to access the different views and functionality that the SPA has to offer.

> Note that we will continue to define server-side routes, however, the vast majority of those routes will be API-type routes that are accessed via AJAX calls, perform CRUD return data as JSON needed by the front-end.

As we've seen, when the URL in the address bar is changed, the browser automatically sends an HTTP request to the host, **unless** the address bar's URL is manipulated in one of two ways: by using the browser's **History API** or **Hash URIs**.

Feel free to check the Further Study section to learn more about the History API or Hash URIs.

### Concept 3: Client-side Rendering

So, assume a user clicks an **Add Comment** button in a SPA and expects to see the new comment show up in the list of comments...

This is a SPA, so you don't want the button to cause a full-page refresh!

In SPAs, you would send an AJAX request containing the data for the new comment to the server.

The server would update the database and send back a response.

However, to make the comment show up in the UI, it needs to be updated using JavaScript - a process we call **client-side rendering**.

The undisputed champ of client-side rendering today is React!

### ❓ Review Questions

1. **What's the key difference between a traditional web app and a single-page app?**

2. **What development concepts enable the creation of comprehensive single-page applications?**

## Intro to React

### What is React?

- An open-source JavaScript library for building User Interfaces.
- It was open-sourced in May of 2013.
- Created by Jordan Walke, a Facebook engineer.
- Initially used to implement Facebook's newsfeed in 2011 and in Instagram in 2012.
- Now being used by big-time companies such as Netflix, Imgur, Airbnb, Walmart, and many more.
- A separate library, React Native, can be used to develop native iOS and Android mobile apps.

### When Use React?

[React](https://reactjs.org/) is the go to front-end library when developing highly dynamic user interfaces.

### Why Use React?

React is the hottest front-end library around for building SPA user interfaces.

Adoption = Jobs !!!

### React in Action - A Minimal Example

The React team has developed a wonderful CLI for starting a new React app. The command will be `create-react-app <app name>` - think of it as the express-generator for React apps.

However, before we use `create-react-app` we will use a most excellent code playground, [CodeSandbox](https://codesandbox.io/) to take a first look at how React works...

#### CodeSandbox Starting React App

Create an account and open a new React sandbox...

In CodeSandbox, we can browse our files in the left-pane, edit code in the center-pane, and see the output on the right.

#### Modern JavaScript

The first thing to take note in CodeSandbox's starting React app is that modern JavaScript is being used.

For example, note the use of `import` at the top of **index.js**.  Similar to how we used `require` in Node, `import` allows us to access the functionality that is exported by other JavaScript files (modules).

Modules were introduced with ES2015 and they're really cool. However, you're probably wondering if they're so cool, why haven't we used them yet. The answer is that their use requires "tooling", or more specifically, a "module loader", which we'll discuss in a bit.

As React developers, we will be using newer features of JavaScript such as the **spread operator**, **destructuring assignment**, etc.

#### How Does this App Work?

In the next section we'll discuss some core concepts of React.

For now, let's briefly go through how this code is resulting in the view we are seeing.

When the app is run, this is what happens:

1. "Tooling" is used to convert that stuff that looks like HTML in the JavaScript into pure JS - this process is called _transpiling_. That HTML-looking stuff is called JSX and it's a special syntax that we're going to cover later today.
2. The `main: src/index.js` entry in **package.json** informs the tooling which JS file is the starting point for figuring out dependencies, module loading and code execution.
3. The tooling then merges all of the JS modules (files) into a single  file that is loaded and executed by _index.html_.

> Transpiling is the process of converting source code into a different form of source code, where as compiling means convert source code into executable code.

Let's briefly read through the code in **index.js** and I'll describe how the view is ultimately being rendered.

#### Key Takeaways

At this point, the takeaway should be that:

- React apps consist of **components** that we code using JavaScript (and a special syntax known as JSX). You will not be creating any *.html files when developing a React app.
- The line of code that causes all of the components to be rendered for the first time is:

	```js
	ReactDOM.render(<App />, rootElement);
	```

- Rendering a React component, i.e., `<App>`, results in its nested components being rendered as well! Let that soak in for a bit.

#### Try it Out and Make a Change

Now that you know a little bit about React components, try making some changes to the JSX within the `<App>` component and see how your changes are updated in the view.

Later today, we'll be defining lots of our own components but first let's look closer at some of the key concepts of React...

### Key Concepts of React

Let's briefly review some key concepts of React. We'll dig deeper in future lessons.

#### Components

<img src="https://i.imgur.com/TGZKfoI.png">

- A React app's UI consists of **components**.
- In React, we build an app's UI by composing built-in and user-defined components.
- React's built-in components are often referred to as **React Elements** and are used to emit in the HTML page DOM actual elements like `<div>`, `<h1>`, etc.
- The custom components we code are going to be used a lot like HTML tags. For example, in the diagram above, the UI is being built with tags like `<HomePage>`, `<SearchBar>`, `<EmployeeList>`, etc.
- Ultimately, our React components must contain React Elements if we want anything to appear on the page.
- React Elements can be styled using CSS and are the components that we will add event listeners to for responding to user interaction.
- Components that create the UI are created using 100% JavaScript. There is no HTML markup in React components, just something that looks like it...

#### JSX

- Although a React component's UI is ultimately defined by JavaScript, there is a better way to define the UI using a special syntax known as **JSX**.
- The syntax is an XML-based syntax that looks like HTML - as it should since HTML is also based on XML.
- Since our browsers do not understand JSX, it must first be transpiled (converted) into pure JS.

#### State and Props

- Like most applications, a React component may have **state** (data/information).
- State can only be changed by the component that "owns" that state.
- When a component's state is changed, that **entire** component is re-rendered, including all of its child components.
- A "stateful" component passes any state needed by child components as **props**.
- Props are accessible as key/value pairs on a **props** object. This props object is passed to the component every time it is rendered.
- **Props** in a component are always read-only.

#### Rendering

Consider that most **state** is held at or near the top of the component hierarchy. Further, you now know that a component, and all of its children are re-rendered if **any** state changes.

Yeah, rendering happens frequently in a React app (whenever state changes), but thanks to React's ingenious design, it's very fast and efficient because:

- First, React renders to an in-memory representation of the DOM, known as the **Virtual DOM**.
- After the rendering is done, React compares the latest Virtual DOM to the previous Virtual DOM and computes only the "difference", known as the **diff**.
- React then updates the browser's actual DOM with the actual changes (the computed **diff**).

	<img src="https://i.imgur.com/LC7wclE.jpg">


### ❓ Review Questions

1. **The User Interface in a React app is built using c____________s.**

2. **When ________ changes in a component, that component, and all of its children components are rendered.**

## Tooling

### What is Tooling?

Tooling enables the development of complex web applications by automating and enhancing the developer's workflow.

For example...

#### Compiling/Transpiling

Tooling takes our **source code** and processes it to make it production ready.

Take JSX for example. Its special syntax allows us to more easily define components, however, it must first be transpiled into JavaScript so that the browser can execute it.

#### Module Packaging and Loading

Today's complex front-end applications often consist of many components, general purpose modules, third-party libraries, etc. that have _dependencies_ between them.

How do all of these different parts that depend on each other find each other? Tooling of course - in this case a module bundler. A module bundler enables us to export and import functionality similar to what we have been doing in Node.

>Note: ES2015 introduced a module system that uses `import` and `export` statements, however, it does not currently implement a way to actually load those modules - thus it takes tooling to load imported modules.

#### Scaffolding

Setting up a project initially is pretty mundane, thus there are tools that do it for you.

For example, we've been using **express-generator** to set up our Express apps.

[**Yeoman**](http://yeoman.io/) is a general purpose scaffolding tool that has a huge ecosystem of _generators_ for just about any framework or workflow structure you can think of.

#### Developer Services / Task Runners

Tooling can also provide automation of other mundane tasks too.

They can watch for changes to our source code and automatically compile, reload, and refresh the app in the browser.

They can assist with testing.

Just about any task a developer does repeatedly manually, can benefit from tooling.

### Tooling for React

Developing a React app requires tooling because a typical React app is spread across numerous files/modules with dependencies that need to be bundled together. In addition, JSX needs to be transpiled into pure JS.

When you need tooling, you have several options. One of the early build tools/task runners to become popular was [**Grunt**](https://gruntjs.com/). However, most developers have found [**Gulp**](http://gulpjs.com/) to be more friendly and faster.

Over time, [**webpack**](https://webpack.github.io/) has become the tool of choice in the React community and it is what the `create-react-app` CLI uses.

Webpack is a module bundler that figures out dependencies, processes source code and other files, and in the end, provides a single `bundle.js` file to be loaded into the browser.

Configuring webpack's **webpack.config.js** file can be overwhelming. Lucky for us though, we don't have to worry about it since the `create-react-app` CLI takes care of setting an ideal React workflow using webpack for us.

We will be using `create-react-app` to start all React apps in SEI from this point forward.

## Lab: Official React Tutorial

[React's official tutorial](https://reactjs.org/tutorial/tutorial.html) assumes no existing React knowledge and is therefore a great place to get your feet wet.

Note that the tutorial has two different setup options.  Please use the [starter code for Option 1](https://codepen.io/gaearon/pen/oWWQNa?editors=0010).

After opening the starter code (a CodePen), start the tutorial [here](https://reactjs.org/tutorial/tutorial.html#inspecting-the-starter-code).

This lab is not a deliverable.

## Further Study

#### HTML5's History API

Using HTML5's [History API](https://developer.mozilla.org/en-US/docs/Web/API/History), an application in the browser is able to manipulate the browser's current URL using JS and without triggering a server request.

Client-side router software can use the History API to perform client-side routing to load different "screens"/functionality and perform other magic without a full-page refresh.

This approach works wonderfully when the client router is in charge and is the only thing manipulating the URL in the address bar. However, what about when a user enters a URL manually, or a link external to the client app is clicked? These cases require a small bit of configuration on the server - a simple "catch all" route that handles all requests that don't match requests for static assets, API routes, etc. The catch all route will then return the **index.html** and all is well.

Later in this unit you'll be introduced to the popular [React Router](https://github.com/ReactTraining/react-router), which uses the History API to perform client-side routing in React SPAs.

#### Browser Hash Navigation

The HTML specification includes what is known as **Hash URIs**.

Hash URIs include a "hash" (`#`) in the URI, for example:<br>[https://facebook.github.io/react/docs/react-dom.html#reference](https://facebook.github.io/react/docs/react-dom.html#reference)  

If we browse to the above link, we will see that it takes us directly to the "Reference" section on the page.

Hovering over other titles/sub-titles on the page reveals other links that have their href's set to a value prefaced with a "#", for example:

```html
<a class="hash-link" href="#unmountcomponentatnode">#</a>
```

Notice that when we can click on these links, the address bar changes, but the browser does **not** make an HTTP request.

Today's client-side routers lean toward using the History API over Hash URIs due mainly to the fact that the URL's are "prettier" without the hash.

## References

[React Docs](https://facebook.github.io/react/)


