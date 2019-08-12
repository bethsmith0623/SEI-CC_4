<img src="https://i.imgur.com/vUOu9NW.jpg">


# Express Lab
# My Dev Skills - Part 1
---

## Intro

You've now seen how we can generate a skeleton Express application and implement the **index** & **show** functionality for a **resource** (To Dos).

Now it's time to practice by doing the very same thing, but for a different data resource - _developer skills_.

##### This lab, combined with Part 2, is a Deliverable

## Exercises

The goal of the lab is to do put in a rep doing everything that you did during the _Express - Routers & Controllers_ lesson:

- Scaffold a new app named `express-dev-skills` using express generator.

- Be sure to create an array of "fake" data representing some of your awesome developer skills. The specific properties describing a skill object is up to you! 

- Implement **index** functionality for the `skills` resource

- Implement **show** functionality for the `skills` resource


## Hints

- Keep the data resource name short and simple - something like `skills`.

- Following best-practice routing and MVC will result in the following modules for the `skills` ressource:
	- **routes/skills.js**
	- **models/skill.js**
	- **views/skills**
	- **controllers/skills.js**

- Use [RESTful routes](https://gist.github.com/jim-clark/17908763db7bd3c403e6)


## Bonuses

- Use EJS partial views to make your templates more DRY (see link in Reference section of the lesson) and/or [this link](https://www.npmjs.com/package/ejs#includes).

- Add styling or use a CSS framework to make the app look better :)

### This lab is not a deliverable, however, Part 2, which builds upon this lab, is a deliverable.


