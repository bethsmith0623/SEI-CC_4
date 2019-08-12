<img src="https://i.imgur.com/vzWk7s4.png">

# Intro to MongoDB

| Learning Objectives - SWBAT: |
| :--- |
| Describe the Use Case of Databases |
| Describe the Format of a Document |
| Save and Retrieve MongoDB Documents using the Mongo Shell |
| Describe Embedding & Referencing |

## Roadmap

- What's a Database?
- MongoDB vs. Relational SQL Databases
- More About MongoDB
- MongoDB Documents
- Creating a Database and Inserting Documents
- Data Modeling - Intro
- Data Modeling in MongoDB
	- Embedding Subdocuments
	- Referencing Documents

## What's a Database?

Remember when we added new To-Dos in Express and we would "lose" them when nodemon restarted the server?

If we were saving those To-Dos in a database, they would remain there until we deleted them.

Databases are a way to organize and save, or persist, data.

There are lots of different database systems - check out [this site](http://db-engines.com/en/ranking) that tracks the popularity of different database systems.

As you can see, **Relational Database Management Systems (RDMS)** are by far the most popular - they've been around since the 1960s. They are more commonly referred to as **SQL Databases** because they are designed and accessed using **Structured Query Language**.

However, you'll also see that **MongoDB** is by far the most popular **NoSQL** database system.

There are several varieties of NoSQL databases. MongoDB is of the **document-based** variety because it stores and retrieves _documents_.


## MongoDB vs. Relational SQL Databases

### Terminology

<img src="https://i.imgur.com/XdV3hSs.png" style="width:900px">

As diagramed above, there is a one-to-one mapping of the key concepts of a database.

### Key Differences

#### Use Cases

Either a SQL database or MongoDB can be used for most applications.

However, in general:

- **Relational Databases** are preferred in mission-critical financial applications such as banking, stock trading, etc., due to their strength of handling [transactions](https://en.wikipedia.org/wiki/Database_transaction). They are not very good however on handling data that can't be strictly organized into tables of structured columns because they have a strict **schema** (structure) they must adhere to.

- **MongoDB** is preferred for storing vast amounts of unstructured data, such as in social-media type applications.  MongoDB is also a great choice when prototyping applications because it is **schema-less** and more adaptable to change.

## More About MongoDB

<img src="https://i.imgur.com/ig8evtu.jpg" style="width:900px">

MongoDB puts the "M" in the MEAN/MERN Stack, technology stacks that emphasizes the use of JavaScript on both the front-end and back-end.

Instead of _SQL_ (_Structured Query Language_), MongoDB uses JavaScript as its native language for database operations.

You're going to see that working with **data** in MongoDB is like working with JavaScript objects.

## MongoDB Documents

In MongoDB, we save and retrieve _documents_ to and from a _collection_. 

Lets take a look of what a MongoDB _document_ might look like:

```js
{
    _id: ObjectId("5099803df3f4948bd2f98391"),
    name: { first: "Alan", last: "Turing" },
    birth: ISODate("1912-06-23T00:00:00Z"),
    death: ISODate("1954-06-07T00:00:00Z"),
    contribs: [ "Turing machine", "Turing test", "Turingery" ],
    views: 1250000
}
```

As you can see, this format looks very much like a JavaScript object.

In fact, you'll be working with documents using JavaScript, therefore they absolutely **are** JS objects!

### The Document `_id`

The `_id` is a special field represents the document's _unique identifier_. If you're familiar with SQL databases, a document's `_id` is like a _primary key_.

MongoDB automatically creates the `_id` when documents are saved for the first time.

MongoDB uses a special `ObjectId` datatype for the value of `_id`.

`ObjectId`s are JS objects, but we'll be able to use their string representation most of the time when we work with them in Mongoose (next lesson).

The value that MongoDB creates for the `_id` is guaranteed to be _globally unique_.

## Creating a Database and Inserting Documents

### Before we Start

In this lesson, we are going to be working directly with MongoDB to create and modify data using the _Mongo Shell_ in a Terminal window.

However, after this first look at MongoDB, you will be better off using _Mongoose_ that we're going to learn about next.

### The Mongo Shell

MongoDB installs with a client app, a JavaScript-based shell, that allows us to interact directly with the MongoDB engine.

Start the app in terminal by typing `mongo`

The app will load and change the prompt will change to `>`

List the shell's commands available: `> help`

Show the list of databases: `> show dbs`

Show the name of the currently active database: `> db`

Switch to a different database: `> use [name of database to switch to]`

Let's switch to the `local` database: `> use local`

Show the collections of the current database `> show collections`

### Creating a new Database

To create a new database in the Mongo Shell, we simply have to `use` the database.  Lets create a database named _myDB_:

```
> use myDB
```

### Inserting Data into a Collection

This is how we can create and insert a document into a collection named _people_:

```
> db.people.insert({
... name: "Fred",	// Don't type the dots, they are from the 
... age: 21			// shell, indicating multi-line input mode
})
```

Using a collection for the first time creates it!

__YOU DO: Let's add another person to the _people_ collection. But this time, add an additional field called _birthDate_ and assign it a date value with something like this: *birthDate: new Date('3/21/1981')*__

To list all documents in a collection, we can use the _find_ method on the collection without any arguments:

```
> db.people.find({})
```

The argument is called a _query object_ and is used to specify criteria.  If we provide an empty query object, `find` will return all documents:

## Data Modeling - Intro

### Data Entities

A **data entity** represents a certain _type_ of data in an application.

Examples include:  **User**, **Account**, **Post**, **Comment**, etc.

### Relationships

**Relationships** exist between entities, for example:

- _A User has many Posts; and a Post belongs to a User_<br>This relationship is called a **one-to-many**.

- _A User has and belongs to many Accounts; and an Account has and belongs to many Users_<br>This relationship is called a **many-to-many**.

There is also a less common **one-to-one** relationship. For example, _A User has a Profile; and a Profile belongs to a User_

You will be asked to model the relationships as part the planning for your CRUD projects.  Here's a [link](https://www.lucidchart.com/pages/er-diagrams?a=0) that talks more about data relationships and how to create what's called an Entity Relationship Diagram (ERD).

### Database Implementation

##### SQL Databases

In SQL Databases, by design, there would be a **table** for each _data entity_.

Related data is _joined_ together using SQL queries.

##### MongoDB

In MongoDB, unlike with SQL tables, there might not be a **collection** for every _data entity_.

Unlike in SQL, there's no requirement to break different _entity types_ into separate **collections**.

The reason is that some _entities_ are better off being **embedded** with its parent document instead, for example, _comments_ that belong to a _post_. It would not make sense to have to query a separate **comments** collection to obtain the comments for a given post...

## Data Modeling in MongoDB

There are two ways to model related data in MongoDB:

1. Using **embedding**, where "subdocuments" are contained inside of its document.

2. Using **referencing**, where a document contains just the related document's `ObjectId`.

Both approaches can be used simultaneously in the same document.

### Embedded Documents

Here's what an embedding looks like:

A document in the `people` collection:

```js
// assume a document from a people collection
{
  _id: ObjectId("5099803df3f4948bd2e983a4"),
  name: "Joe Smith",
  contacts: [
    {
      type: "mobile",
      contact: "(555) 555-5555"
    },
    {
      type: "email",
      contact: "joe@smith.com"
    }
  ]
}
```

In a relational database, those contacts would **have** to be in a separate table.

Embedding data is more efficient than referencing data because it takes extra queries to fetch related data.

FYI, when we use Mongoose, even those subdocuments will automatically have their own `_id`.

### Referencing Documents (linking)

Here's how the above `person --< contact` model would be implemented via **referencing**:

```js
// assume a document from a people collection
{
  _id: ObjectId("5099803df3f4948bd2e983a4"),
  name: "Joe Smith",
  contacts: [
    ObjectId("5099803df3f4948bd2f98391"),
    ObjectId("5099803df3f4948bd1f97203")
  ]
}    
```

Two referenced documents in the `contacts` collection:

```js
{
  _id: ObjectId("5099803df3f4948bd2f98391"),
  type: "mobile",
  contact: "(555) 555-5555"
}
```

and

```js
{
  _id: ObjectId("5099803df3f4948bd1f97203"),
  type: "email",
  contact: "joe@smith.com"
}
```

As you can see, the related _contacts_ are separate documents.

We would have to make separate queries to get to that data, although, Mongoose can do this automatically using the `populate` method.

### Which Document Should Hold the "Reference"?

When referencing data in MongoDB, you can hold the `ObjectId` in either document or both!

The decision depends upon the design and functionality of your application and it's not always clear-cut.

### If Embedding is More Efficient, Why Reference at All?

- If the amount of data can exceed the 16MB size limit for a document, an uncommon situation however - the entire body of work of Shakespeare can be stored in 5 megabytes!

- When multiple parent documents need access the same child document and that child's data changes frequently. For example, a document modeling a _bank account_ should be referenced because 

- If it makes sense for your application. For example, if you wanted to view all _posts_ on your landing page, regardless of the user that posted them, it would certainly take more effort to extract the _posts_ from each user if they were embedded. However, it would be gravy to get the _posts_ from their own collection.

For more details regarding data modeling in MongoDB, start with [this section of mongoDB's documentation ](http://docs.mongodb.org/manual/core/data-modeling-introduction/) or this [hour long YouTube video](https://www.youtube.com/watch?v=PIWVFUtBV1Q)

## References

[MongoDB homepage](https://www.mongodb.org/)

[mLab - MongoDB Cloud Hosting](https://mlab.com/)

[MongooseJS - ODM](http://mongoosejs.com/)

