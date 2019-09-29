<img src="https://i.imgur.com/go18uJE.jpg">

# Star Wars API - React Lab

---

## Intro

In the lesson earlier you:

1. Learned to consume a third-party API in React from the `componentDidMount` lifecycle method.
 
2. Created a "service" module to organize `fetch` calls within.

In this lab, you'll consume the [Star Wars API](https://swapi.co/) and render it's data.

**This lab is a DELIVERABLE**

## Set Up

To get set up for this lesson:

- `cd` into this lab's folder.
- Use `create-react-app` to create a React app named `react-star-wars`
- `cd` into `react-star-wars` and open VS Code.
- Open a terminal in VS Code.
- Start the React Dev Server.

## Exercises

> Styling in this lab is secondary to completing the functionality

1. Research documentation of [SWAPI](https://swapi.co/documentation) to find the endpoint for the `starships` resource.

2. Create a `services/sw-api.js` service module and ensure that all API/fetch calls are made from this module. Use named exports to expose AJAX functionality as needed, e.g., `export function getAllStarships() {...}`to obtain all starships.

3. Obtain all of the starships from the API and render in `<App>` a clickable `<Link>` (imported from `react-router-dom`) for each starship. The link should be styled to look like a button and contain the text of the starship's name.  For example:

	<img src="https://i.imgur.com/VERV0nk.png">

4. When a starship `<Link>` is clicked a `<StarshipPage>` component should be rendered that displays the starship's `name`, `model` and a "Return to Starship List" `<Link>` that routes back to the root route that renders `<App>`. For example:

	<img src="https://i.imgur.com/IjRwsHk.png">

5. Because the data is being loaded asynchronously, there are times, such as if the user refreshes the page while viewing the `<StarshipPage>`, that the data won't be available to render, in this case, display a "Loading..." message instead.

## Hints

- Hold the starships in state.

- The challenge is to be able to have the `<StarshipPage>` component obtain the specific starship object it needs to render. Here are a couple of approaches:

	1. One approach would be to pass `<StarshipPage>` (within `<Route>`) a method as a prop that it can call, passing the method an argument identifying which starship object it wants. That argument's value could come from a URL parameter in the link that was clicked...

		Review the Client-side Routing in React lesson's _Defining Routes with URL Parameters_ section for assistance with how to define routes with parameters used to pass information to components.
		
	2. Another approach is to use a slightly more complex syntax that React Router's `<Link>` offers.  This approach relies on assigning an object instead of a string to its `to` prop.  Check the docs [here](https://reacttraining.com/react-router/web/api/Link/to-object) for more details.

	3. The third approach would be to use the data service to fetch the specific starship from the `<StarshipPage>` component.  However, this approach is wasteful unless the data resource changes frequently, e.g., you want to display the latest comments.  In this case, a starship's data does not change and you already have the data stored in state, so this is not an efficient approach.

## Deliverable

Commit your code and slack the link to this lab in your repo.

## Bonus

- Enhance the `<StarshipPage>` component to render a `<PilotList>` component that lists the names of the pilots for that starship.

- If the starship has no pilots, display a "No Pilots" message.

	Hint: This requires a call to the API for each of the endpoints listed in the starship's `pilots` array. Using `async`/`await` can help with this - [here's a repl](https://repl.it/@jim_clark/Multiple-AJAX-Calls) that shows how to fetch the pilots in parallel.
