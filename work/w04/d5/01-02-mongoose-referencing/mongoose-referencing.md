
[click here to view as a presentation](https://presentations.generalassemb.ly/5a3ff8eeef72ad1a3c53986c2784ee67#/1)

<link href="https://gist.githubusercontent.com/jim-clark/6919052ab15de680c120907d223c31b5/raw/9eedb5e3c01352b9ccda7264227f253be56a08b7/slide.css">

---

<img src="https://i.imgur.com/cD5R8OG.png" width="600px;display:inline-block;margin:auto">

<br>

## Mongoose<br>Referencing Related Data

---
## Learning Objectives
<br>

<p>Students Will Be Able To:</p>

- Use Referencing to Relate 1:M & M:M Data
- "Populate" Referenced Documents
- Explain the Difference Between 1:M & M:M Relationships
- Perform CRUD Using Mongoose Models in a Node REPL

---
## Roadmap
<br>

1. Setup
1. Review the Starter Code
1. Use a Node REPL session to perform CRUD using Mongoose Models
1. Create the `Performer` Model
1. Creating _Performers_
1. _AAU, when viewing a movie's detail page, I want to see a list of the current cast and add a new performer to the list_
1. Essential Questions

---
#### Setup
<br>

- `cd` to `starter-code/mongoose-movies` folder within this lesson's folder in the class repo.

- Install the node modules:

	```
	$ npm install
	```
	
- Open the **`mongoose-movies`** folder in your code editor.

- Use `nodemon` to start the server.

- Browse to `localhost:3000`

---
#### Review the Starter Code
<br>

- Today's starter code is the final code from yesterday's _Mongoose - Embedding Related Data_ lesson with a couple of changes...

- The `cast` property on the `Movie` model has been removed and all related forms/views and controller code have been adjusted accordingly. This was done so that in this lesson we can reference _performer_ documents created using a `Performer` Model.

- The **movies/show.ejs** view shows how you can use EJS to calculate an _average rating_ for a movie.

---
#### Perform CRUD Using<br>Mongoose Models in a Node REPL
<br>

- Because of the major refactor, we will want to start fresh by deleting the existing _movie_ documents.

- This provides an excellent opportunity to show you how to perform CRUD operations in Terminal using a Node REPL session.

- What we are about to do will really come in handy in the future!

- Start by opening a terminal session and make sure that you are in the **mongoose-movies** folder.

---
#### Perform CRUD Using<br>Mongoose Models in a Node REPL
<br>

- Start a Node REPL:

	```sh
	$ node
	> 
	```

- Connect to the MongoDB database:

	```sh
	> require('./config/database')
	{}
	> Connected to MongoDB at localhost:27017
	// Press enter to return to the prompt
	```

---
#### Perform CRUD Using<br>Mongoose Models in a Node REPL
<br>

- Load the `Movie` Model:

	```sh
	> const M = require('./models/movie')
	```

- Curious what the `Movie` Model looks like?

	```sh
	> M
	// a big object...
	```

- **Important:** If you make any changes to the Model, you'll have exit Node and start again.

---
#### Perform CRUD Using<br>Mongoose Models in a Node REPL<br>

- Log all _movie_ docs:

	```sh
	> M.find({}, (e, movies) => {
	... console.log(movies)
	... })
	```
	The `find` method returns a **Query** object that is first logged, followed by the _movie_ docs. Press enter to return to the prompt.

---
#### Perform CRUD Using<br>Mongoose Models in a Node REPL
<br>

- Anything that can be done with a Model in the app, can be done in the REPL including CRUD operations, manipulate individual documents, etc.

- Next, let's remove all existing _movie_ documents...


---
#### Perform CRUD Using<br>Mongoose Models in a Node REPL
<br>

- Here's a way to delete all documents from a collection:

	```sh
	> M.deleteMany({}, (err, result) => console.log(result))
	...
	> { n: 3, ok: 1, deletedCount: 3 }
	```
	
- The _empty query object_ provided as the first argument matches all documents, so all documents were removed.

- Press `control + C` twice to exit the REPL.

---
#### Create the _Performer_ Model
<br>

- We would like to have a _performers_ collection containing _performer_ docs that can be referenced via their `ObjectId` in any other document.

- First, we need to create a module for the `Performer` Model:

	```sh
	$ touch models/performer.js
	```

---
#### Create the _Performer_ Model

- We'll review the schema for the `Performer` Model as we type it:

	```js
	var mongoose = require('mongoose');
	var Schema = mongoose.Schema;
	
	var performerSchema = new Schema({
	  name: {type: String, required: true, unique: true},
	  born: Date
	}, {
	  timestamps: true
	});
	
	module.exports = mongoose.model('Performer', performerSchema);
	```

- We want to _try_ to prevent duplicate _performers_ (more on this in a bit).

---
#### Referencing _Performer_ in _Movie_
<br>

- With the `Performer` Model created, we can now add back the `cast` property in `Movie`:

	```js
	reviews: [reviewSchema],
	// don't forget to add a comma above
	cast: [{type: Schema.Types.ObjectId, ref: 'Performer'}]
	```

- The property type of `ObjectId` **is always** used to implement **referencing**.

- The `ref: 'Performer'` is optional, but allows us to use the magical Mongoose method - `populate`. 

---
#### Referencing _Performer_ in _Movie_
<br>

- Unlike in a Relational DB, all it takes to implement a<br>**one-to-many** or a **many-to-many** relationship, is a single property of type Array.

- It's the application logic (the developer) that determines what the [cardinality](https://en.wikipedia.org/wiki/Cardinality_(data_modeling)) will be between any two data entities.

---
#### Referencing _Performer_ in _Movie_
<br>

- In the case of **mongoose-movies**, we have this relationship:<br><br>**_A Movie has many Performers; A Performer has many Movies_**<br><br>**`Movie >--< Performer`** (Many-To-Many)

---
#### Referencing _Performer_ in _Movie_
<br>

- The thing that's different between a `1:M` and a `M:M` relationship is that:
	- In a `1:M` relationship, each of the **MANY** documents belongs to only **ONE** document. Each time we add another document to the many collection, it has to be created.
	- In a `M:M` relationship, we need to reference an **existing** document if it exists, and only create a new document if this is the first of its kind. 

- What this means for **mongoose-movies** is that we only want to create a new _performer_ if they don't already exist.

---
#### _AAU, I want to create a new performer if they don't already exist_
<br>

- Here's the flow we've now followed several times when adding functionality to the app:

	- Identify the "proper" Route (Verb + Path)
	
	- Create the UI that issues a request that matches that route.
	
	- Define the route on the server and map it to a controller action.
	
	- Code and export the controller action.
	
	- `res.render` a view in the case of a GET request, or `res.redirect` if data was changed.

---
#### Creating _Performers_ - Step 1
<br>

- If we want to show a dedicated page for adding a performer, creating one will be a two step process...

- **💪 YOU DO: Pair up and take a minute to determine what the proper routes are for**:
	- Showing a **new** view for entering a _performer_
	- Creating a new _performer_

---
#### Creating _Performers_ - Step 1
<br>

- Just like with _reviews_, the new _performers_ resource means a new set of dedicated modules:

	```sh
	$ touch routes/performers.js
	```
	
	and a **controller** module too:
	
	```sh
	$ touch controllers/performers.js
	```

---
#### Creating _Performers_ - Step 1
<br>

- Again, just like with _reviews_, we need to require the router for _performers_:

	```js
	var reviewsRouter = require('./routes/reviews');
	// new performers router
	var performersRouter = require('./routes/performers');
	```
	and mount it like this:
	
	```js
	app.use('/', reviewsRouter);
	// mount the performersRouter router
	app.use('/', performersRouter);
	```

---
#### Creating _Performers_ - Step 2
<br>

- We need UI...

- Let's start by adding a new link in the nav bar in **partials/header.js**:

	```html
	<img src="/images/camera.svg">
	<!-- new menu link below -->
	<a href="/performers/new"
		<%- title === 'Add Performer' ? 'class="active"' : '' %>>
		ADD PERFORMER</a>
	```

---
#### Creating _Performers_ - Step 3
<br>

- Clicking the **ADD PERFORMER** link is going to make a `GET /performers/new` request - now we need a route to map that HTTP request to code in **routes/performers.js**:

	```js
	var express = require('express');
	var router = express.Router();
	var performersCtrl = require('../controllers/performers');
	
	router.get('/performers/new', performersCtrl.new);
	
	module.exports = router;
	```

- Once again, the server won't run until we create and export that `new` action...

---
#### Creating _Performers_ - Step 4

- Inside of **controllers/performers.js** we go:

	```js
	var Performer = require('../models/performer');
	
	module.exports = {
	  new: newPerformer
	};
	
	function newPerformer(req, res) {
	  Performer.find({}, function(err, performers) {
	    res.render('performers/new', {
	      title: 'Add Performer',
	      performers
	    });
	  })
	}
	```

- Note that we will want to show the existing _performers_.

---
#### Creating _Performers_
<br>

- We need that folder and file for the `new` view:

	```sh
	$ mkdir views/performers
	$ touch views/performers/new.ejs
	```

- The next slide has the markup...

---
#### Creating _Performers_

-  Here's the markup for **performers/new.ejs**:

	```html
	<%- include('../partials/header') %>
	<p>Please first ensure that the Performer is not in the dropdown
	  <select>
	    <% performers.forEach(function(p) { %>
	      <option><%= p.name %></option>
	    <% }) %>
	  </select>
	</p>
	<form id="add-performer-form" action="/performers" method="POST">
	  <label>Name:</label>
	  <input type="text" name="name">
	  <label>Born:</label>
	  <input type="date" name="born">
	  <input type="submit" value="Add Performer">
	</form>
	<%- include('../partials/footer') %>
	``` 

---
#### Creating _Performers_ - CSS

- Find and update in **public/stylesheets/style.css**:

	```css
	#new-form *,
	#add-review-form *,
	#add-performer-form * {
	  font-size: 20px;
	  ...
	}
	...
	#add-review-form,
	#add-performer-form {
	  display: grid;
	  ...
	}	
	...
	#add-review-form input[type="submit"],
	#add-performer-form input[type="submit"] {
	  width: 10rem;
	  ...
	}	
	```

---
#### Creating _Performers_
<br>

- The `action` & `method` on the form look good, we just need to listen to that route.

- The route to map the form submittal to the `create` action looks like this in **routes/performers.js**:

	```js
	router.get('/performers/new', performersCtrl.new);
	// new route below
	router.post('/performers', performersCtrl.create);
	```

- **What's next?**

---
#### Creating _Performers_

- In **controllers/performers.js**:

	```js
	module.exports = {
	  new: newPerformer,
	  create
	};
		
	function create(req, res) {
    // Hack to "fix" date formatting to prevent possible day off by 1
    // https://stackoverflow.com/questions/7556591/is-the-javascript-date-object-always-one-day-off
	  var s = req.body.born;
	  req.body.born = 
	    `${s.substr(5,2)}-${s.substr(8,2)}-${s.substr(0,4)}`;
	  Performer.create(req.body, function(err, performer) {
	    res.redirect('/performers/new');
	  });
	}
	```

- Okay, give a whirl and fix those typos 😊

---
#### _AAU, after adding a movie, I want to see its details page_
<br>

- This user story can be accomplished with a quick refactor in the `moviesCtrl.create` action in **controllers/movies/js**:

	```js
	movie.save(function(err) {
	  if (err) return res.redirect('/movies/new');
	  // res.redirect('/movies');
	  res.redirect(`/movies/${movie._id}`);
	});
	```

- Don't forget to replace the single-quotes with back-ticks!

- User story done! What's next?

---
#### _AAU, when viewing a movie's detail page,<br>I want to see a list of the current cast and add a new performer to the list_

- Let's identify the steps it's going to take to implement this user story:
	- In **movies/show.ejs**, iterate over the movie's cast and use EJS to render them.
	- Hold it! There are `ObjectId`s in a movie's `cast` array - not subdocs. That's because we are using referencing. Oh wait, this is what the magical `populate` method is for!
	- In addition to the current cast, we will need a form to add a performer, so we will have to pass performers to **show.ejs** too - but only the performers not already in the cast.

- Let's get started!

---
#### Replacing _ObjectIds_ with the Actual Docs
<br>

- Let's refactor the `moviesCtrl.show` action so that it will pass the movie with the _performer_ documents in its `cast` array instead of `ObjectIds`:

	```js
	function show(req, res) {
	  Movie.findById(req.params.id)
	  .populate('cast').exec(function(err, movie) {
	    res.render('movies/show', { title: 'Movie Detail', movie });
	  });
	}
	```

- `populate`, the unicorn of Mongoose...

---
#### Replacing _ObjectIds_ with the Actual Docs
<br>

- We can chain the `populate` method after any query.

- When we "build" queries like this, we need to call the `exec` method to actually run it (passing in the call back to it).

- **❓ How does the `populate` method know to replace the `ObjectId`s with `Performer` documents?**

---
#### Passing the _Performers_
<br>

- While we're in `moviesCtrl.show`, let's see how we can query for just the _performers_ that are not in the _movie's_ `cast` array.  

- First, we're going to need to access the `Performer` model, so require it at the top:

	```js
	var Movie = require('../models/movie');
	// require the Performer model
	var Performer = require('../models/performer');
	```
	
- Now we're ready to refactor the `show` action... 

---
#### Passing the _Performers_

- We'll review as we refactor the code:

	```js
	
	function show(req, res) {
	  Movie.findById(req.params.id)
	  .populate('cast').exec(function(err, movie) {
	    // Performer.find({}).where('_id').nin(movie.cast)
	    Performer.find(
         {_id: {$nin: movie.cast}},
         function(err, performers) {
           console.log(performers);
           res.render('movies/show', {
             title: 'Movie Detail', movie, performers
           });
         }
       );
	  });
	}
	```
	The log will show we are retrieving the _performers_ - a good sign at this point. 

---
#### Refactor _show.ejs_
<br>

- The next slide has some refactored markup in **movies/show.ejs**.

- It's a bit complex, so we'll review it while we make the changes.

- We'll have to be careful though...

---

```html
  <div><%= movie.nowShowing ? 'Yes' : 'Nope' %></div>
  <!-- start cast list -->
  <div>Cast:</div>
  <ul>
    <%- movie.cast.map(p => 
      `<li>${p.name} <small>${p.born.toLocaleDateString()}</small></li>`
    ).join('') %>
  </ul>
  <!-- end cast list -->
</section>
	
<!-- add to cast form below -->
<form id="add-per-to-cast" action="/movies/<%= movie._id%>/performers" method="POST">
  <select name="performerId">
    <%- performers.map(p => 
      `<option value="${p._id}">${p.name}</option>`
    ).join('') %>
  </select>
  <button type="submit">Add to Cast</button>
</form>
```

---
#### Refactor _show.ejs_ - CSS
<br>

- Add this tidbit of CSS to clean up the cast list:

	```css
	ul {
	  margin: 0 0 1rem;
	  padding: 0;
	  list-style: none;
	}
	
	li {
	  font-weight: bold;
	}
	```

---
#### Need a Route for the _Add to Cast_ Form Post
<br>

- The route is RESTful, but we have to use a non-RESTful name for the controller action.

- In **routes/performers.js**

	```js
	router.post('/movies/:id/performers', performersCtrl.addToCast);
	```
	`addToCast` - not a bad name!

---
#### The _addToCast_ Controller Action

- Let's write that `addToCast` action in **controllers/performers.js**:

	```js
	var Performer = require('../models/performer');
	// add the Movie model
	var Movie = require('../models/movie');
	
	module.exports = {
	  new: newPerformer,
	  create,
	  addToCast
	};
	
	function addToCast(req, res) {
	  Movie.findById(req.params.id, function(err, movie) {
	    movie.cast.push(req.body.performerId);
	    movie.save(function(err) {
	      res.redirect(`/movies/${movie._id}`);
	    });
	  });
	}
	```

---
#### We Did It!
<br>

- That was fun!

- A few questions, then on to the lab!

---
### ❓ Essential Questions
<br>

<p>Take a couple of minutes to review...</p>

1. **What property type is used in schemas to reference other documents?**

2. **Describe the difference between 1:M & M:M relationships.**

3. **What's the name of the method used to replace an `ObjectId` with the document it references?**

---
## References
<br>

- [MongooseJS Docs - Populate](https://mongoosejs.com/docs/populate.html)

- [MongooseJS Docs - Queries](https://mongoosejs.com/docs/queries.html)



