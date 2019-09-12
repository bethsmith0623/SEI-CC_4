<img src="https://i.imgur.com/6YTRrdC.png">

# Build Another Django App - Lab

## Intro

It's been an exciting week building out **catcollector** and your **finchcollector**.

Now, to better prepare you for starting your project, as well as the project assessment, you're going to build another Django app from scratch!

You'll be building an application called **My Dev Skills**.

There are some helpful hints below!

The MVP version of **My Dev Skills** allows users to track what developer skills they have (and at what level of proficiency).

Here's the ERD:

<img src="https://i.imgur.com/uCbeloQ.png">

The `skill_level` field in `Skill` Model should have a field type of `IntegerField()`.  The value should be an integer between 1 and 5 representing the following skill levels:

| Skill Level<br>(integer) | Human-friendly Description |
|:-:|---|
| 1 | Fundamental Awareness |
| 2 | Novice |
| 3 | Intermediate |
| 4 | Advanced |
| 5 | Expert |

Refer to the _One to Many Models in Django_ lesson for the steps on how to implement the `choices` option for the `skill_level` field when defining the `Skill` Model.

## Minimum Requirements - My Dev Skills v1.0

**All template layout and styling for this assignment will be of your choosing.**

**Use the hints below to help guide you!**

Please implement the following **user stories**:

- As a Visitor (AAV), I want to see a "Welcome to My Dev Skills" landing page with a nav bar showing "Sign Up" and "Log In" links.

- AAV, I want to click the "Sign Up" link to sign up because I'm interested in tracking my developer skills.

- AAV, I want to click the "Log In" link and log in so that I can access features available to a User.

- As a User (AAU), I want to see a nav bar at the top of each page with a "Welcome, <My Name>" message and the following links:
	- Log Out
	- My Skills
	- Add Skill

- AAU, when I sign up, log in, or click the "My Skills" link in the nav bar, I want to see a "My Skills" page that lists the _description_ for each skill **I have (not the skills for other users)**.

- AAU, when I click a _description_ on the "My Skills" page, I want to view a "Skill Details" page that displays:
	- The _description_ to be at the top and in a large, bold typeface.
	- The _skill level_ in a human-readable way

- AAU, when I click the "Add Skill" link in the nav bar, I want to view an "Add Skill" page that allows a new skill to be added including:
	- An input to enter the skill's _description_
	- A drop-down to select the _skill level_ (displayed in a human-readable way)

- AAU, when I add a new skill I want to see the "My Skills" page including the new skill.

**Congrats! Make a commit for version 1.0, push to GitHub, and slack the link to your instructors.**

## Optional Bonus Features

### v1.1 User Stories (additional to v1.0)

- AAU, when I click a _description_ on the "My Skills" page, I want to view a "Skill Details" page that displays:
	- A "delete" link

- AAU, when I click the "delete" link on the "Skill Details" page, I want to see a confirmation page so that I don't accidentally delete a skill.

- AAU, if I confirm a delete, I want to see the "My Skills" page with the skill I deleted removed.

### v1.2 User Stories (additional to v1.1)
	
- AAU, when I click a _description_ on the "My Skills" page, I want to view a "Skill Details" page that displays:
	- An "edit" link

- AAU, if I click the "edit" link on the "Skill Details" page, I want to see a page to edit the _description_ and/or _skill level_ of the skill.

- AAU, if I save an edit, I want to go back to the "Skill Details" page for that skill.

### My Dev Skills v2.0

Looking for more?  Good, because the current users of **My Dev Skills** have requested the following functionality...

Version 2.0 of **My Dev Skills** allows users to add **notes** to any of their skills.

Here's the ERD:

<img src="https://i.imgur.com/lEB20xh.png">

#### Additional User Stories

- AAU, when viewing the "Skill Details" page for a skill, I want to see a list of _notes_ I've entered for that skill.

- AAU, when viewing the "Skill Details" page for a skill, I want to be able to add a new note for that skill.

- AAU, when adding a new note for a skill, I want to continue viewing the "Skill Details" page for that skill after the new note has been added.

- AAU, I want to be able to delete a note for a skill and continue viewing the "Skill Details" page for that skill after the note is deleted.

## Hints

1. Don't forget to create a database with something like `$ createdb mydevskills`.
2. After starting the project, be sure to start the main app, and add it to the list of installed apps.
3. Configure the app to use PostgreSQL.
4. The pre-installed admin app has migrations pending - you know what to do.
5. In regards to templates:
	- You're going to need `static` and `templates` folders
	- Be sure to use template inheritance (partial templates) by creating a **base.html**.
	- Create a stylesheet and make sure that static files are being loaded into the _base.html_.
	- The following example **base.html** and **style.css** is using a cool Google font - what better than a font named 'Source Code Pro' for a Dev Skills app:
	
	```html
	{% load staticfiles %}
	
	<!DOCTYPE html>
	<html lang="en">
	<head>
	    <meta charset="UTF-8">
	    <meta name="viewport" content="width=device-width, initial-scale=1.0">
	    <meta http-equiv="X-UA-Compatible" content="ie=edge">
	    <title>My Dev Skills</title>
	    <link href="https://fonts.googleapis.com/css?family=Source+Code+Pro" rel="stylesheet">
	    <link rel="stylesheet" href="{% static 'style.css' %}">
	</head>
	<body>
	    <header>header</header>
	    <main>
	        {% block content %}
	        {% endblock %}
	    </main>
	    <footer>footer</footer>
	</body>
	</html>
	```
	```css
	*, *::before, *::after {
	    box-sizing: border-box;
	}
	
	body {
	    margin: 0;
	    height: 100vh;
	    font-family: 'Source Code Pro';
	    display: flex;
	    flex-direction: column;
	    justify-content: space-between;
	    align-items: center;
	}
	
	main {
	    width: 100%;
	    height: 100%
	    padding: 1rem;
	    display: flex;
	    flex-direction: column;
	    align-items: center;
	    overflow-y: scroll;
	}
	```
		
6. The main app needs its own urls.
7. Get that welcome landing page showing at the root route.
8. Make sure that you baby step by not writing too much code before you refresh and check the app. At this point you want to check that your landing page is showing and that your css is hooked up.
9. Create that superuser so that you can use the Admin portal if needed.
10. Now code those user stories implemented - top to bottom.
11. Be sure to remember to assign the logged in user to a skill that's being created before trying to save it to the database. 
12. If implementing the optional `Note` Model, consider using a ModelForm for rendering the **content** field's `<input>` within a `<form>` on the "Skill Details" page. The ModelForm will also assist when creating a note object in the "create note" view.

