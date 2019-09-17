<img src="https://i.imgur.com/XIbnaV8.jpg">

# AJAX Using Fetch - Lab

## Intro

Now that you know how to make AJAX calls using the Fetch API, time for a little practice making AJAX calls to a popular API - [OMDb](http://www.omdbapi.com/).

> This lab is **not a deliverable**

## Set Up

Create a new HTML, CSS, JS Repl and name it "AJAX Lab".

Browse [here](http://www.omdbapi.com/apikey.aspx) to obtain an API Key used to access the OMDb API. Be sure to select the FREE account type, which includes 1,000 calls the API daily.

## Requirements

**All layout and styling for this lab is of your choosing.**

The overall requirement of this lab is to create a Single-Page App (SPA) that uses `fetch` to consume the OMDb API and display the results.

Implement the following **user stories**:

- As a Visitor (AAV), I want to see a form to search for a movie based upon its title.

- AAV, when I submit a search, I want to see a list of movies matching my search.

- AAV, for each movie in the search results list, I want to see its _title_, _release year_, and main _actors_.

## Bonus

- AAV, if no movies match my search, I want to see a "No movies match the title of: <insert search title here>".

- AAV, I want to see a "View Plot" button for each movie that when clicked displays the movie's plot directly beneath the movie in the search list.

- Make the SPA look cool.

## Hints

- Read OMDb's documentation and experiment making calls using the "Examples" form in OMDb's docs. Open the Network tab of DevTools to observe and learn from the URL of the request being sent to the API.

- Consider using `async`/`await` to make using `fetch` more concise and "synchronous".