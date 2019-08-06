<img src="https://i.imgur.com/vUOu9NW.jpg">

# Express Practice/Lab/After Hours
---

## Intro

It's been a long day and you've covered a lot of ground.

It's natural, in fact, **expected**, to feel "uncomfortable" and confused by Node.js & Express at this point.

As always, the journey toward competence requires practice - so let's get on with it!

##### This Lab is Not a Deliverable

## Exercise

The goal of the exercise is to do put in a rep doing everything that you did during the Express lesson!

However, instead of To Dos, change up the data resource to something else, like `students` - your call.

## Bonuses

- Use EJS partial views to make your templates more DRY (see link in Reference section of the lesson) and/or [this link](https://www.npmjs.com/package/ejs#includes).

- Include Bootstrap, or another CSS framework, if you want your app to look better quickly.

## Super Bonus

This is an advanced bonus that previews what we will soon learn in class...

Create a route and view dedicated to displaying a single data resource, such as a single student.

We refer to this as the `show` route/view, vs. the `index` route/view.

The key to implementing this feature is **route parameters** documented in the **Route parameters** section of the [Express Routing guide](https://expressjs.com/en/guide/routing.html).

Basically, you can define a route as follows:

```js
app.get('/students/:id', function(req, res) {
	console.log(`The value for the :id route parameter is: ${req.params.id}`);
	res.render('students/show', {student: studentDb.getOne(req.params.id)});
});
```

To send a matching route from the browser, you can use EJS that generates a hyperlink that looks like:

```html
<a href="/students/<%= student.id %>">
	Click for Details for Student <%= student.id%>
</a>
```