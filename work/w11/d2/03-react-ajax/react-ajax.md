<img src="https://i.imgur.com/Scdy5uG.png">

---

## Learning Objectives

| Students Will Be Able To |
|---|
| Make AJAX requests from a React app |
| Use third-party libraries such as Google Maps |
| Modularize code using "service" modules |

## Roadmap

- Set Up
- Review the Functionality of the App
- Including Third-Party Libraries
- Accessing the Browser's Current Coordinates
- Making Asynchronous/AJAX Calls in React
- Implement the _As a Visitor..._ User Story
- Essential Questions

## Set Up

This lesson has starter-code.

To get set up for this lesson:

- `cd` into the **starter-code/react-weather** folder for this lesson.
- Open the project in VS Code: `$ code .`
- Open a terminal in VS Code (`ctrl + backtick`)
- Install the Node modules: `$ npm i`
- Start the React Dev Server: `$ npm start`

Shortly after starting React's Development Server, you should be greeted with:

<img src="https://i.imgur.com/qj3bSlP.png">

## Review the Functionality of the App

To demonstrate how to make AJAX calls from React, we're going to build an app that:

1. Fills the web page with a Google map of the user's current location.  The map will be styled in a way to remove many of the distractions such as roads and controls for zooming, etc.

2. Upon loading, uses the [Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API) (Web API) to obtain the user's current latitude and longitude GPS coordinates.

3. The coordinates (latitude & longitude) will be passed as props to a custom `<Map>` component responsible for rendering the map referred to in step 1 above.

4. Also upon loading, the current coordinates will be used to make a call to the [OpenWeatherMap API](https://openweathermap.org/api) to display the current temperature and the weather condition (as an icon).

To focus on how to make an AJAX call in a React app, the app purposely is minimalistic - requiring no user interaction at all.

#### The Starter Code

In the starter code, `<App>` is currently rendering only a `<header>` and the custom `<Map>` component which currently does not render a map because it's waiting for us to provide a couple of props, which we'll do in a bit.

Also, take a peek at **index.css** & **App.css** to see how [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) (AKA CSS Variables) are being used. They are really cool addition to the CSS spec.

## Including Third-Party Libraries

If you google how to use this or that library with React, many of the results returned will reference modules and/or React components that can be installed via npm.

However, much of the time, using third-party libraries such as Google Maps without resorting to installing custom React-oriented modules/components is not difficult.

To demonstrate this, we're going to use the Google Maps JavaScript library to load a map of the user's current location.

#### Including the Library

In React, we can load JavaScript libraries in _index.html_ via CDNs as usual.

The starter code has the [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/tutorial) being loaded in the `<head>` of **public/index.html**.

Checking the Google Maps docs shows how to load the library in a non-React app:

```html
<script async defer
  src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap">
</script>
```

The `callback=initMap` in the query string tells the library to run a function named `initMap` after it has loaded. This function would, in a non-React app, create the map.

However, in a React app, you need more control as to when a map is rendered - thus in the starter code, the `callback` parameter has been removed.

This is what we want:

```html
<script async defer
  src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY">
</script>
```

Note that Google Map's API keys are intended to be used client-side.

#### The Custom `<Map>` Component

The starter code includes a simple `<Map>` function component that can be reused to render as many maps desired.

Reviewing the code in **Map.jsx** reveals that, thanks to the `if` statement on line 9, a map is only created and displayed in the `<div>` if both a `lat` and a `lng` prop is provided.

The component also uses a `zoom` prop if it's provided, otherwise a default value of `12` is used (line 12).

Since the library's `Map` constructor needs a reference to the DOM element to draw the map in, line 7 creates a [ref](https://reactjs.org/docs/refs-and-the-dom.html) that is assigned to the only React Element being rendered:

```js
<div ref={mapDiv} className={styles.Map}></div>
```

This allows us to use the ref (`mapDiv.current`) to provide the library a reference to the mounted `<div>` on line 11.

#### Accessing Libraries Loaded Outside of React

Take note on how the Google Maps library is being referenced on line 10 (and also on line 18):

```js
const map = new window.google.maps.Map(
``` 

Normally, as shown in the docs, you would access the global `google` object created by the library directly.  However, due to the way the module system works in React, `google` is not in scope and the app will fail to build if we try to access `google` directly:

<img src="https://i.imgur.com/OGdPf7e.png">

The solution is to access `google`, as well as other global variables, such as `socket` or `$`, by prefacing the global variable with the `window` object, which we know to represent the global namespace.

## Accessing the Browser's Current Coordinates

The [Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API) is a Web API available in the browser that can return an object that contains the current GPS coordinates of the browser.

#### Modularization Using Service Modules

It is a best practice to organize general purpose, reusable functionality within utility/service modules.

The project's starter code has a `services` folder for holding such modules.

The **services/geolocation.js** module has a single named export, `getCurrentLatLng`.

So that we can take advantage of `async/await`, the Geolocation API's `getCurrentPosition` method has been wrapped to return a promise instead of accepting a callback (the Geolocation API was around before promises were):

```js
export function getCurrentLatLng() {
  // Wrap getCurrentPosition to return a promise
  return new Promise(resolve => {
    navigator.geolocation.getCurrentPosition(pos => resolve({
      lat: pos.coords.latitude,
      lng: pos.coords.longitude
    }));
  });
}
```

> The above code pattern can basically be used to "promisfy" callback-based asynchronous methods.  However, if the callback has an `err` parameter, be sure to pass that to `reject` function.

Let's see how to use this service to provide the coordinates to the `<Map>` component...

## Making Asynchronous/AJAX Calls in React

You may be wondering why we have a dedicated lesson to cover making AJAX calls from a React app.

After all, we've already seen how to use `fetch` to make AJAX calls.

#### CORS Restrictions

**It's always recommended that you make calls to APIs from your server, not the browser.**

Doing so avoids exposing API keys in the browser and avoids the [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) security restrictions that can prevent a browser from being able to access an API if the server does not participate in CORS.

However, we currently don't have a backend to act as a "passthrough", so we will be using `fetch` to make calls to an API directly.

To make `fetch` send the correct CORS headers to the server, we need to include an options object with a `mode: "cors"` property like the following:

```js
fetch(someUrl, {mode: "cors"}).then(res => res.json())
```

#### Adding a `componentDidMount` Method

If you take a look at a React component, it's not easy to figure out where to put the AJAX code. You can't put it in `render` because you can't invoke `setState` when the data comes back from within `render` because it will cause an infinite loop.

The answer, as you learned earlier in the Lifecycle lesson, is to initiate calls to asynchronous operations, such as making AJAX calls, from inside of the `componentDidMount` and `componentDidUpdate` lifecycle methods.

Although not an AJAX call, obtaining GPS coordinates is also an asynchronous operation, so we should make the call to `getCurrentLatLng` from within `componentDidMount`.

First though, we will need to add an import inside of **App.js** to be able to access the `getCurrentLatLng` function that's being exported from the **geolocation.js** service module:

```js
// App.js

import { getCurrentLatLng } from '../../services/geolocation';
```

Now let's add the `componentDidMount` lifecycle method and the code to call `getCurrentLatLng`:

```js
class App extends Component {

  // Add this method
  async componentDidMount() {
    // Destructure the object returned from getCurrentLatLng()
    const {lat, lng} = await getCurrentLatLng();
    console.log(lat, lng);
  }
```

The browser may be asking your permission to access you location - best grant it for this lesson to work 😊

How cool is it that we can declare instance methods in a class to be `async`?!?!

As usual, we're baby stepping our way to glory...

<img src="https://i.imgur.com/T3BeGec.png">

#### Providing the Coordinates to `<Map>`

Now that we have the latitude and longitude, we can add them to `state`, then pass them to `<Map>` as props:

```js
const {lat, lng} = await getCurrentLatLng();
// Replace the console.log with the following
this.setState({lat, lng});
```

Also, it's a good practice to always initialize all state:

```js
class App extends Component {

  // Initialize state
  state = {
    lat: null,
    lng: null
  };
```

Finally, we can now pass that state as props to `<Map>` within the `render` method:

```js
<Map lat={this.state.lat} lng={this.state.lng}/>
```

Oh so lovely - we have errors...

#### Refactoring `<Map>` into a Class Component

Unfortunately, we're receiving errors because there are now coordinates being provided, however, the component has not been mounted yet, thus the ref does not reference a DOM element - making the Google Maps library sad.

We took a shot at writing `<Map>` as a Function Component but now find ourselves needing to tap into lifecycle methods, e.g., `componentDidMount`.

This is a dandy of a refactor:

```js
class Map extends React.Component {
  mapDiv = React.createRef();

  setMap() {
    if (this.props.lat && this.props.lng) {
      const location = {lat: this.props.lat, lng: this.props.lng};
      const map = new window.google.maps.Map(
        this.mapDiv.current, {
          zoom: this.props.zoom || 12,
          center: location,
          disableDefaultUI: true,
          styles: mapStyle
        }
      );
      new window.google.maps.Marker({position: location, map: map});
    }
  }

  // Called after the first render
  componentDidMount() {
    this.setMap();
  }

  // Called when props or state change
  componentDidUpdate() {
    this.setMap();
  }

  render() {
    return (
      <div ref={this.mapDiv} className={styles.Map}></div>
    );
  }
}
```

Okay, assuming the refactor went well, the `<Map>` component will be displaying the map:

<img src="https://i.imgur.com/ZnIwsAt.png">

## Implement the _As a Visitor..._ User Story

Okay, let's implement the following User Story:<br>
**_As a Visitor, when I browse to the app, I want to see the current weather conditions for my location_**

#### The OpenWeatherMap API

We'll be using the [OpenWeatherMap API](https://openweathermap.org/) to return weather data in JSON format.

The API has lots of options, but [here's the link](https://openweathermap.org/current) to the current weather section.

Scroll down to here:

<img src="https://i.imgur.com/frr3qFs.png">

The API requires an API Key to use, however, you can borrow this one `d3945aa316355ce92bb8cc10bf63e3da`.

According to the docs, to retrieve the current weather data, we can make a call to the following endpoint substituting our desired coordinates:

```
https://api.openweathermap.org/data/2.5/weather?lat=34.0475869&lon=-117.8985651&units=imperial&appid=d3945aa316355ce92bb8cc10bf63e3da
```

Included in the URL is a query parameter of<br>`units=imperial`<br>that returns the temperature in Fahrenheit (the default is Kelvin).

Let's checkout the JSON returned by pasting that URL into a browser tab.  You should get something like the following returned:

```js
{
  "coord": {
    "lon": -117.9,
    "lat": 34.05
  },
  "weather": Array[1][
    {
      "id": 800,
      "main": "Clear",
      "description": "clear sky",
      "icon": "01n"
    }
  ],
  "base": "stations",
  "main": {
    "temp": 68.27,
    "pressure": 1019,
    "humidity": 37,
    "temp_min": 64,
    "temp_max": 72
  },
  "visibility": 16093,
  "wind": {
    "speed": 11.41,
    "deg": 250
  },
  "clouds": {
    "all": 1
  },
  "dt": 1553905125,
  "sys": {
    "type": 1,
    "id": 3578,
    "message": 0.0103,
    "country": "US",
    "sunrise": 1553866982,
    "sunset": 1553911768
  },
  "id": 5405326,
  "name": "Valinda",
  "cod": 200
}
```

### Exercise - Create a `weather-api.js` Service Module (15 min)

Putting `fetch` calls in service/utility modules is a best practice - do not litter your components with `fetch` calls!

This applies to whether you're making calls to the backend of the SPA or third-party APIs.

Using the **geolocation.js** module as an example, create a **weather-api.js** service module that:

- Exports, as a named export, a `getCurWeatherByLatLng` function.

- The `getCurWeatherByLatLng` function should:

  - Define two parameters: `lat` & `lng`.
  - Use `fetch` to make a call to the same endpoint as above, substituting the values of `lat` and `lng` passed as arguments. Be sure to assign our `lng` value to the `lon` query param that the API uses.
  - Be sure to provide the `{mode: 'cors'}` option object as a second argument to `fetch`.
  - Return the result of `fetch(...).then(res => res.json())` so that we can work with the promise that returns the actual data.

- Import the named export , `getCurWeatherByLatLng`, into **App.js**.

- Before the `this.setState` line in `componentDidMount`, use `getCurWeatherByLatLng` to obtain the data, assigning it to a variable named `weatherData`.

- `console.log(weatherData)` and verify that the data is being logged:

	<img src="https://i.imgur.com/y8JXo71.png">
	
#### Add the Weather Data to State

We're going to keep it simple and display:

- The current temperature, and
- An icon for the "conditions"

Looking at the data returned, we see that the temperature can be accessed as `weatherData.main.temp`.

Let's log that out to verify, but let's also round it off while we're at it:

```js
const weatherData = await getCurWeatherByLatLng(lat, lng);
console.log(Math.round(weatherData.main.temp));
```

Cool.

Now there's the `icon` property whose value is a short string that we can use to build out a URL for use as an `<img>` element's `src` attribute.

**Figure out the data path like we just did for `temp` and slack it in the lessons channel when you've got it.**

Now that we know the data paths, let's add them to state:

```js
state = {
  lat: null,
  lng: null,
  // Add the initializations
  temp: null,
  icon: ''
};

async componentDidMount() {
  const {lat, lng} = await getCurrentLatLng();
  const weatherData = await getCurWeatherByLatLng(lat, lng);
  this.setState({
    lat,
    lng,
    // Add temp & icon to state
    temp: Math.round(weatherData.main.temp),
    icon: weatherData.weather[0].icon
  });
  console.log(Math.round(weatherData.main.temp));
}
```

React Developer Tools assure us that we're ready to move on to rendering:

<img src="https://i.imgur.com/uaYgTCq.png">

#### Render the Temperature and Condition Icon

Ignoring CSS for now, let's update the `<header>` in **App.js** as follows:

```js
<header className='App-header'>
  <div>{this.state.temp}&deg;</div>
  REACT WEATHER
  {this.state.icon && 
    <img
      src={`https://openweathermap.org/img/w/${this.state.icon}.png`}
      alt='Current Conditions'
    />
  }
</header>
```

The ["How to get icon URL" section](https://openweathermap.org/weather-conditions) of OpenWeatherMap's docs shows us how to form the URL that points to the current condition's icon. Be sure to always use `https` however.

Note how we're using the `&&` operator within a JSX expression to prevent the rendering of a "broken image" tag that would show until the data arrives.

Lastly, React will give a warning in the console if you don't include an `alt` prop in all `<img>` components.

#### Update the CSS for the `<header>`

The `<header>` already has a `App-header` class being applied that makes it a flexbox.

Let's update the `justify-content` property:

```css
justify-content: space-between;
```

All that's left is to add a touch of CSS to style the temp and image:

```css
.App-header div {
  color: white;
  font-size: 8vmin;
  font-weight: bold;
}

.App-header img {
  height: 15vmin;
}
```

Congrats!

<img src="https://i.imgur.com/rUTkeVb.png">

## Essential Questions

Take a moment to review the following questions:

1. **Assuming you loaded jQuery via a CDN in a React app's index.html, what object must you precede `$()` (jQuery function) with?**

2. **What lifecycle method(s) do we typically initiate asynchronous calls from?**

3. **Why is the following code not a best practice?**

	```js
	componentDidMount() {
	  fetch('https//api.somehost.com/endpoint', {mode: 'cors'})
	    .then(res => res.json())
	    .then(data => this.setState({ data }));
	}
	```

## References

[Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/tutorial)

[OpenWeatherMap API](https://openweathermap.org/api)

[React - Refs and the DOM](https://reactjs.org/docs/refs-and-the-dom.html)





