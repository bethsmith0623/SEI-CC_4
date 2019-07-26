<img src="https://i.imgur.com/R2zfSdF.png">

# My Developer Skills Lab

## Introduction

This lab provides an opportunity to practice working with jQuery.

This lab is **not a deliverable**.

> **Note:** This can be a pair programming activity or done independently.

## Exercise

### Setup

1. Create a folder named `my-dev-skills-lab` **outside** of the class repo.

2. Create the following folders/files:
	- `index.html`
	- `js/main.js`
	- `css/main.css` 

3. Do the usual when setting up a front-end project:
	- Add the HTML boilerplate to `index.html`
	- Link in `js/main.js` - don't forget the `defer` attribute!
	- Link in `css/main.css`

4. Load jQuery from the CDN by adding the following **before** your `main.js`:
	
	```html
	<script
	src="https://code.jquery.com/jquery-3.3.1.min.js"
	integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
	crossorigin="anonymous"></script>
	```

5. `git init` and make your initial commit.

6. Create a remote repo in your **personal** GitHub account and add the remote (`origin`) to the local repo.

7. `git push origin master`

8. Code away!

### Requirements

1. Add HTML and CSS as necessary to implement an application that looks close to this wireframe:

	<img src="https://i.imgur.com/k06ZMEN.png">
	
2. Code the following _user stories_, using jQuery where possible:

	- As a User (AAU), I don't want to see any developer skills in the list so that I can start with a fresh slate.

	- AAU, I want to be able to type in a skill and have it added to my list of skills by clicking a button.

	- AAU, I want to be able to remove an individual skill one at a time in case I make a mistake.

## Bonus

##### Replace the first user story above with the following story:

- AAU, I want to see my previous list of developer skills so that I can start from where I last left off.

##### Hint:

- Research [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) as a way to persist (remember) the developer skills each time they are updated.

