
[click here to view as a presentation](https://presentations.generalassemb.ly/c8e653c0f730e4875924e5944560e938#/1)

<style style="visibility:hidden"> .reveal li {font-size: 32px;} .reveal ul ul li, .reveal ul ol li, .reveal ol ol li, .reveal ol ul li { font-size: 28px; } </style>

---

# Intro To
<br>
<img src="https://i.imgur.com/cD5R8OG.png" width="900px">

---

# Learning Objectives
<br>

- Describe the use case for Mongoose

- Define a basic Schema for a single Model

- Create and Read documents using a Model

- Define default values in a Schema

- Define validations in a Schema

---

# Roadmap
<br>

1. Setup
1. Intro to Mongoose
1. Including Mongoose in an app
1. Defining Schemas in Mongoose
1. Built-in Types for Properties
1. Compiling Schemas into Models
1. Use a Model to Create data
1. Use a Model to Read data
1. Defining default values for a Property
1. Defining validations for a Property
1. Essential Questions

---
#### Setup
<br>

- `cd` to today's folder.

- Let's use Express Generator:

	```sh
	$ express -e mongoose-movies
	```
	then
	
	```sh
	$ cd mongoose-movies && npm install
	```
	
- Let's also change `app.js` to `server.js` - **what else do we have to do?**

---
## Intro to Mongoose

---
#### Intro to Mongoose
<br>

- What is Mongoose?

- Sneak peak of some Mongoose code

- The big picture

---
#### What is Mongoose?

---
<p>Yes, this guy, but not in the context of MongoDB...</p>

<img src="https://i.imgur.com/Y74xxoD.jpg" width="900">

---
#### What is Mongoose?
<br>

- **Mongoose** is the most popular way to perform CRUD operations on a MongoDB database.

- Mongoose is called an **Object Document Mapper (ODM)** because it maps object-oriented JavaScript to MongoDB _documents_.

- Mongoose makes it easier to perform CRUD using object-oriented JavaScript instead of working directly MongoDB.

---
#### What is Mongoose?
<br>

- Let's check out the landing page for Mongoose and see what it has to say for itself...

	<a href="http://mongoosejs.com/index.html" target="_blank">Mongoose Homepage</a>

---
#### What is Mongoose?

- According to Mongoose's homepage:

	_"Mongoose provides a straight-forward, **schema-based** solution to model your application data..."_

- Wait a minute, what's with this "schema" business, isn't MongoDB schema-less?  

- Well, yes it is, however, it turns out that the vast majority of applications benefit when their data conforms to a defined structure (schema).

- Mongoose allows us to define schemas and ensures that documents conform to them.

---
#### What is Mongoose?
<br>

- Mongoose also provides lots of other useful functionality:
	- Default property values
	- Validation
	- Automatic related model population via the `populate` method
	- _Virtual properties_ - create properties like "fullName" that are not persisted in the database
	- Custom _Instance methods_ which operate on a document
	- _Static methods_ which operate on the entire collection 
	- `pre` and `post` event lifecycle hooks (Mongoose "middleware")

---
#### The Big Picture 
<br>

- Here is a big picture overview of the purpose of Mongoose's **Schema** and **Model** components:

<img src="https://i.imgur.com/Q6A7KTQ.png" width="900">

---
#### Big Picture Example 

- Assuming the following schema:

	```js
	var postSchema = new mongoose.Schema({
		content: String
	});
	```

- It can be compiled into a model and that model exported like this:

	```js
	module.exports = mongoose.model('Post', postSchema);
	```

- The model can then be required and used to perform CRUD on the `posts` collection in the MongoDB:

	```js
	var Post = require('./models/post');
	Post.create({content: 'Amazing post...'});
	```

---
### ❓ Review Questions
<br>

1. **In your own words, describe the use case for Mongoose (what is it's purpose and when might you choose to use it?).**

2. **A Mongoose _________ is compiled into a Mongoose Model.**

3. **We use a Mongoose  _________ to perform CRUD operations on a MongoDB.**.

---
## Including Mongoose<br>in an App
---
### Including Mongoose in an App
<br>

1. Install Mongoose

2. Configure Mongoose in a module

3. Add an event listener to the Mongoose connection

---
#### Install Mongoose
<br>

- Installing the Mongoose package is straight forward:

	```sh
	$ npm i mongoose
	```
	Note: `i` is a shortcut for `install`
	
---
#### Configure Mongoose in a module
<br>

- We're going to create a separate module named `database.js` and put it in a folder named `config`:

	```sh
	$ mkdir config
	$ touch config/database.js
	```

---
#### Configure Mongoose in a module

- Then in `database.js`, let's connect to a database named `movies`:

	```js
	var mongoose = require('mongoose');

	mongoose.connect('mongodb://localhost/movies',
	    {useNewUrlParser: true, useCreateIndex: true}
	);
	```
	
- The `{useNewUrlParser: true, useCreateIndex: true}` options avoid deprecation warnings.

---
#### Configure Mongoose in a module 
<br>

- In order for the code in `database.js` to run and connect to the database, we must require it in `server.js`:

	```js
	var logger = require('morgan');
	
	// connect to the database with Mongoose
	require('./config/database');
	```

---
#### Configure Mongoose in a module 
<br>

- Note that we aren't assigning our module to a variable. That's because there's no need to because:

	- We're not exporting anything of use - why assign to a variable?
	- Calling `require('./config/database')` is all it takes to make the code run.
	- We can `require` Mongoose in any module we want and it will always refer to the same _configured_ Mongoose instance.

---
#### Start up the App 
<br>

- Time to check if our app starts up without errors...

- Ensure that the MongoDB engine is running. You will have to run `mongod` in a separate terminal session if you haven't already told MongoDB to start automatically with<br>`brew services start mongodb`.

---
#### Start up the App 
<br>

- Start our app:<br>`$ nodemon`

- Browse to:<br>`localhost:3000`

- No errors?  Great!  However, wouldn't it be nice to know that our connection to our database was successful?  Sure it would...

---
#### Adding event listeners to the Mongoose connection
<br>

- The Mongoose connection object inherits from Node's `EventEmitter` which allows us to listen to defined events.

- Let's listen to the `connected` event...

---
#### Adding event listeners 

- Let's modify our _database.js_ module as follows:

	```js
	var mongoose = require('mongoose');
	mongoose.connect('mongodb://localhost/movies',
		{useNewUrlParser: true, useCreateIndex: true});
	
	// shortcut to mongoose.connection object
	var db = mongoose.connection;
	
	db.on('connected', function() {
  		console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
	});
	```

- Check for the _Connected to MongoDb..._ message in the server terminal.

---
### ❓Review Questions
<br>

1. **What is the advantage of creating a `database.js` module?**

2. **What method on the Mongoose object connects to a MongoDB database?**

---
## Defining Schemas in Mongoose

---
### Defining Schemas in Mongoose
<br>

1. Create a module for the Schema/Model

2. Define a basic Schema for a `Movie` model

---
#### Create a module for the Schema/Model
<br>

- Now that we are connected to the MongoDB engine, it's time to define our first schema.

- So, where are we going to put our app's schemas and models?  In their own folder - of course!

- The MVC design pattern influences our code organization:

	```sh
	$ mkdir models
	$ touch models/movie.js
	```

---
#### Define a basic Schema for a _Movie_ model
<br>

- We will always have a single file per Mongoose Model where:
	1. We define the schema,
	2. Compile the schema into a model, and
	3. Export that model.

---
#### Define a basic Schema for a _Movie_ model
<br>

- In the schema/model module, we will always do this:

	```js
	var mongoose = require('mongoose');
	// optional shortcut to the mongoose.Schema class
	var Schema = mongoose.Schema;
	```

- Creating the shortcut to the `mongoose.Schema` class is optional but convenient when defining complex schemas.

- Now let's define our schema...

---
#### Define a basic Schema 
<br>

- Here's our basic _Movie_ schema:

	```js
	var Schema = mongoose.Schema;
	
	var movieSchema = new Schema({
  		title: String,
  		releaseYear: Number,
  		mpaaRating: String,
  		cast: [String]
	});
	```

- Note the `cast` property's type is an Array of Strings.

---
#### Define a basic Schema 
<br>

- Mongoose vocababulary:
	- A **property** may be referred to as a "**path**", or "**field**".

- **💪 YOU DO:**
	- Add an additional property named `nowShowing` with a type of `Boolean` (make sure that it's uppercased so that it refers to JavaScript's built-in `Boolean` object wrapper).

---
#### Define a basic Schema 
<br>

- Awesome! We have defined a Mongoose schema!

- As we progress toward learning more about Mongoose, we will be adding more properties and functionality to the `movieSchema`.

- For now, let's take a look at the eight built-in types available...

---
#### Built-in Types for Properties

- The types that we can assign to properties are known as `SchemaTypes`

- There are 8 types that we can specify for our properties:
	- **String**
	- **Number**
	- **Boolean**
	- **Date**
	- **mongoose.Schema.Types.ObjectId**
	- **mongoose.Schema.Types.Buffer**
	- **`[]` (Array)** 
	- **mongoose.Schema.Types.Mixed**

---
#### Built-in Types for Properties

- Notice that Mongoose uses a few types that are not built into JavaScript:
	- **mongoose.Schema.Types.ObjectId**
	- **mongoose.Schema.Types.Buffer**
	- **mongoose.Schema.Types.Mixed**

- When we need to specify one of the above types, e.g., `ObjectId`, we will need to ensure that we access them through the object hierarchy. 

- Defining that `Schema` shortcut variable, enables us to write `Schema.Types.ObjectId`, leaving off the `mongoose.`.

---
### Compiling Schemas into Models

---
### **Remember - Models,<br>not schemas are used to perform CRUD**

---
#### Compiling Schemas into Models

- Mongoose performs CRUD using a **Model**.

- Compiling a schema into a model is as easy as calling the `mongoose.model` method:

	```js
	var Schema = mongoose.Schema;
		
	var movieSchema = new Schema({
  		title: String,
  		releaseYear: Number,
  		mpaaRating: String,
  		cast: [String],
  		nowShowing: Boolean
	});
	
	// Compile the schema into a model and export it
	module.exports = mongoose.model('Movie', movieSchema);
	```

---
#### Compiling Schemas into Models
<br>

- **There is a one-to-one mapping between Mongoose models and MongoDB collections**.

- By default, the collection will be named as the pluralized version of the model in all lower-case.

- The collection name can be overridden when compiling the model, but it's uncommon to do so.

---

## Use a Model to Create data

---
#### Use a Model to Create data

- Now that we have a model, we're ready to perform some CRUD!

- First up is **creating** data.

- We can use a Mongoose Model in two ways to create documents in the collection:
	- `var instance = new Model()`, then<br>`instance.save()`, or
	- `Model.create()`

- Let's see how we can `create` a document in a Node REPL...

---
#### Use a Model to Create data 
<br>

- Warning, if you make a typo, you'll have to start over:

	```sh
	$ node
	> require('./config/database')
	> var Movie = require('./models/movie')
	> Movie.create({
	... title: 'Star Wars',
	... releaseYear: 1977
	... }, function(err, doc) {
	... console.log(doc);
	... })
	```

- Logged out will be a document that looks something like...

---
#### Use a Model to Create data 
<br>

- Here's the newly created document:

	```js
	{ __v: 0,
	  title: 'Star Wars',
	  releaseYear: 1977,
	  _id: 57ea692bab09506a97e969ba,
	  cast: []
	}
	```

- The `__v` field is added by Mongoose to track versioning - ignore it.

---
#### Use a Model to Create data 
<br>

- Note that we did not provide a value for `nowShowing` so it was not created as a property in the document.

- However, properties of type Array, are always initialized to empty arrays like `cast` was. This makes it easy to start pushing performers into  it!


---
#### Use a Model to Create data 
<br>

- That was fun! Exit the REPL (`ctrl + C` twice) and let's see how we can use<br>`new` + `save` to create movie documents - but this time from within our app.

---
#### Use a Model to Create data 
<br>

- As we build out our CRUD functionality, here is the process we will repeat:
	1. Determine the verb + URI for the route.  Use RESTful conventions whenever possible.
	2. Add the UI (link and/or forms) to the view that will trigger the request.
	3. Define the route in the appropriate router module for the request, mapping it to the `<controller>.<method>`.
	4. Add the controller action/method and be sure to export it.
	5. In the controller, perform necessary CRUD and either `render` (passing it the data) or `redirect`.

---
#### Use a Model to Create data 
<br>

- Using [our trusty routing chart](https://gist.github.com/jim-clark/17908763db7bd3c403e6), we find that to display a `new.ejs` view with a form for entering movies, the proper route will be:

	```sh
	GET /movies/new
	```

- Express generator stubbed up a `users.js` route file, rename the file to `movies.js`.

- Due to the above renaming, we'll need to make a couple of changes in `server.js` - **what are they?**

---
#### Use a Model to Create data 
<br>

- Inside of `routes/movies.js`, let's code our first route - responsible for showing a form for entering a movie:

	```js
	var express = require('express');
	var router = express.Router();
	var moviesCtrl = require('../controllers/movies');
	
	// GET /movies/new
	router.get('/new', moviesCtrl.new);
	
	module.exports = router;
	```

- **💪 YOU DO: Pair up and create the controller and export the `new` action - we did this quite a bit yesterday...(hints next slide)**

---
#### Use a Model to Create data 
<br>

- Start by:
	- Creating `controllers/movies.js`

- The `new` action is just the first of several that are going to be exported from this module.

- The code in the `new` action is pretty simple:

	```js
	function newMovie(req, res) {
	  res.render('movies/new');
	}
	```

---
#### Use a Model to Create data 
<br>

- Now for the view.

- As we've discussed, organizing views for a certain model into a dedicated folder makes sense:

	```
	$ mkdir views/movies
	$ touch views/movies/new.ejs
	```
	
- Next, add the HTML boilerplate to `new.ejs` and link in:

	```html
	<link rel='stylesheet' href='/stylesheets/style.css' />
	```

- The next slide has our awesome but ugly form...

---
```html
<h2>Enter a New Movie</h2>
<form action="/movies" method="POST">
	<label>Title:
	  <input type="text" name="title">
	</label><br>
	<label>Release Year:
	  <input type="text" name="releaseYear">
	</label><br>
	<label>MPAA Rating
	  <select name="mpaaRating">
	    <option value="G">G</option>
	    <option value="PG">PG</option>
	    <option value="PG-13">PG-13</option>
	    <option value="R">R</option>
	  </select>
	</label><br>
	<label>Cast (separate actors with commas):
	  <input type="text" name="cast">
	</label><br>
	<label>Now Showing:
	  <input type="checkbox" name="nowShowing" checked>
	</label><br>
	<input type="submit" value="Add Movie">
</form>
```

---
#### Use a Model to Create data 
<br>

- Note that we've already set the `action` & `method` attributes to match the proper RESTful route to submit the form to.

- Let's define that route in **routes/movies.js**:

	```js
	router.post('/', moviesCtrl.create);
	```
	
- The next step is to write that `create` controller action...

---
#### Use a Model to Create data 
<br>

- In **controllers/movies.js** we're going to be using our `Movie` model, so we need to require it at the top:

	```js
	var Movie = require('../models/movie');
	```

- The next slide shows how we use the `Movie` Model in the controller to create the movie submitted by the form.

- We'll review it as we type it...

---

- Don't forget to export `create`, then write the function:

<br>

```js
function create(req, res) {
  // convert nowShowing's checkbox of nothing or "on" to boolean
  req.body.nowShowing = !!req.body.nowShowing;
  // remove whitespace next to commas
  req.body.cast = req.body.cast.replace(/\s*,\s*/g, ',');
  // split if it's not an empty string
  if (req.body.cast) req.body.cast = req.body.cast.split(',');
  var movie = new Movie(req.body);
  movie.save(function(err) {
    // one way to handle errors
    if (err) return res.render('movies/new');
    console.log(movie);
    // for now, redirect right back to new.ejs
    res.redirect('/movies/new');
  });
}
```

---
#### Use a Model to Create data 
<br>

- You should now be able to submit movies - congrats!

- Now that we have created a movie or two, let's see how we use Mongoose models to read documents from a MongoDB collection...

---
## Use a Model to Read data

---
#### Use a Model to Read data
<br>

- The querying ability of Mongoose is **very** capable.  For example:

	```js
	Movie.find({mpaaRating: 'PG'})
		.where('releaseYear').lt(1970)
		.where('cast').in('Bob Hope')
		.sort('-title')
		.limit(3)
		.select('title releaseYear')
		.exec(cb);
	``` 

- But we're going to start with the basics :)

---
#### Use a Model to Read data 

- Here are the useful methods on a Model for querying data:
	- `find`: Returns an array of all documents matching the _query object_
		
		```js
		Movie.find({mpaaRating: 'PG'}, function(err, movies) {...
		```
		
	- `findById`: Find a document based on it's `_id`
	
		```js
		Movie.findById(req.params.id, function(err, movie) {...
		```

	- `findOne`: Find the first document that matches the _query object_

		```js
		Movie.findOne({releaseYear: 2000}, function(err, movie) {...
		```

---
#### Reading Data - Practice (20 min)
<br>

- **💪 YOU DO - Pair up and display the list of movies!**:
	- Define the RESTful route
	- Write the controller `index` action to read and provide all movies to the view
	- Create an **index.ejs** view to display in an HTML table.

- Hint: In the view, use the array `join` method to concatenate the names inside of the `cast` array.

- We'll review in 20 minutes.

---
#### Refactor the Redirect
<br>

- Now that we have an `index` view, let's update the `redirect` in the `create` action:

	```js
	  movie.save(function(err) {
	    if (err) return res.render('movies/new');
	    console.log(movie);
	    res.redirect('/movies');  // update this line
	  });
	```

---
## Defining default values for a Property

---
### Defining default values for a Property
<br>

1. Modify the schema to add a default value

2. Use a function to provide a default value

---
#### Modify the schema to add a default value
<br>

- To add a default value, we need to switch from this simple property definition syntax:

	```js
	var movieSchema = new Schema({
		title: String,
		releaseYear: Number,
  		...
	```

- To this object syntax:

	```js
	var movieSchema = new Schema({
  		title: String,
  		releaseYear: {type: Number},
  		...
	```

---
#### Modify the schema to add a default value 

- Now we can add a `default` key to specify a default value:

	```js
	var movieSchema = new mongoose.Schema({
	  title: String,
	  releaseYear: {type: Number, default: 2000},
	  mpaaRating: String,
	  cast: [String],
	  nowShowing: {type: Boolean, default: false}
	});
	```

- Silly example defaulting the release year to 2000 - yes. But that's how we can add a simple default value.

- FYI, defaults for array types will not work - they require the use of Mongoose middleware to set default values.

---
#### Modify the schema to add a default value 

- Test it out and we'll find that it didn't work for the `releaseYear` because `req.body.releaseYear` exists and this prevents the default from being assigned.

- We can fix this in the `create` action by deleting any property in `req.body` that is an empty string:

	```js
	if (req.body.cast) req.body.cast = req.body.cast.split(',');
  	// remove empty properties
  	for (let key in req.body) {
   		if (req.body[key] === '') delete req.body[key];
  	}
	```

- Now if we don't enter a release year, the default will be set.

---
#### Use a function to provide a default value
<br>

- You've seen how to add a simple default value, but we can also provide a function as well.

- The property's default would then be set to the value returned by the function!

---
#### Use a function to provide a default value 

- For example, we can take our silly default for _releaseYear_ and make it just as silly like this:

	```js
	var movieSchema = new mongoose.Schema({
	  title: String,
	  releaseYear: {
  		 type: Number,
  		 default: function() {
  			return new Date().getFullYear();
  		 }
	  },
	  mpaaRating: String,
	  cast: [String],
	  nowShowing: {type: Boolean, default: true}
	});
	```

- Of course, named functions will work too.

---
#### Timestamps in Mongoose
<br>

- Mongoose will add `createdAt` and add + update `updatedAt` fields automatically to every document if we set the `timestamps` option as follows in the schema:

	```js
	var movieSchema = new mongoose.Schema({
	  ...
	}, {
	  timestamps: true
	});
	```

- This really comes in handy so it's recommended to add the `timestamps: true` option to all schemas by default.

---
## Defining Validations for a Property

---
#### Defining validations for a Property
<br>

- Validations are used to prevent bogus data from being saved in the database.

- There are several built-in validators we can use.

- However, endless flexibility is possible with custom asynchronous and synchronous validator functions and/or Mongoose middleware.

- We'll keep it simple at first...

---
#### Defining validations for a Property 
<br>

- Movies should not be allowed to be created without a `title`.  Let's make it required:

	```js
	var movieSchema = new mongoose.Schema({
	  title: {
	    type: String,
	    required: true
	  },
	  ...
	```
- Now, if we try saving a movie without a `title` an error will be set and we'll render the `new` view instead of being redirected to the `index`.

---
#### Defining validations for a Property 
<br>

- For properties that are of type _Number_, we can specify<br>a `min` and `max` value:

	```js
	var movieSchema = new mongoose.Schema({
	  ...
	  releaseYear: {
	    type: Number,
	    default: function() {
	      return new Date().getFullYear();
	    },
	    min: 1927
	  },
	  ...
	```

- No more silent movies!

---
#### Defining validations for a Property 
	
- For properties that are of type _String_, we have:
	- **`enum`**: String must be in the provided list
	- **`match`**: String must match the provided regular expression
	- **`maxlength`** and **`minlength`**: Take a guess :)

- Here is how we use the `enum` validator:

	```js
	var movieSchema = new mongoose.Schema({
	  ...
	  mpaaRating: {
	    type: String,
	    enum: ['G', 'PG', 'PG-13', 'R']
	  },
	  ...
	```

---
#### Summary
<br>

- Mongoose is the go to when it comes to working with a MongoDB.

- We define Mongoose **schemas**, which are then compiled using the `mongoose.model` method into **Models**.

- We use a Model to perform all CRUD for a given MongoDB collection.

---
## ❓ Essential Questions
<br>

<p>Take a couple of minutes to review in case you get picked!</p>

1. **True or False:  In our code, a document's structure is _defined_ in a Mongoose model.**

2. **Name at least two Model methods used to read data from a MongoDB collection.**

3. **Can a single Model be used to query more than one MongoDB collection?**

---

# References
<br>

- [Official MongooseJS Documentation](http://mongoosejs.com/)


