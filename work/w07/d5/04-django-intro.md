<img src="https://i.imgur.com/RWixB90.png">

# Intro to Django

## Learning Objectives

| Students Will Be Able To: |
|---|
| Describe the use case of Django |
| Contrast MVC with Django's MVT architecture |
| Describe the components of a Django project |
| Describe Django's routing methodology |
| Install Django and psycopg2 |
| Build Django's official tutorial app |

## What is Django?

Django is by far the most popular Python-based web framework and its popularity continues to grow thanks to the amazing growth of Python itself.

Django was publicly released in 2005 and got its name from one of its creator's, Adrian Holovaty, who named Django after his favorite guitarist [Django Reinhardt](https://en.wikipedia.org/wiki/Django_Reinhardt).

It's designed for the rapid development of highly-secure web applications.

Compared to the minimalist web framework of Express, Django is a much higher-level framework that provids lots of functionality baked-in, including:

- A powerful Object-Relational-Mapper (ORM) for working with relational databases using Python code instead of SQL.
- A built-in admin app for browsing and manipulating data in the database.
- Built-in user management and authentication.

## Django's MVT Architecture

Django's architecture is similar, but different than that of MVC:

<img src="https://i.imgur.com/rA4BtNv.png">

This chart compares MVC to Django's MVT:

| Concern | MVC | Django<br>MVT |
|---|:-:|:-:|
| Database access | Model | Model |
| Code mapped to routes | Controller | View |
| Rendering of dynamic HTML | View | Template |

When developing with Django, we'll just have to be careful to say:

- **view** instead of **controller**, and
- **template** instead of **view**

## Components of a Django Project

This diagram visualizes the relationship between the different components of a Django project:

<img src="https://i.imgur.com/1fFg7lz.png">

The quirky thing about a Django is how it names its high-level components.

What we think of as a web **application**, Django calls a **project**.

Further, what we think of as part of an app's functionality, or **modules**, Django refers to as **apps**.

A Django _project_ can have many _apps_, and a Django _app_ can belong to multiple _projects_. More on this later.

## Django's Routing Methodology

Because routing is so fundamental to developing web apps, it's worthwhile knowng in advance an important difference between Express and Django's routing methodology. 

Web frameworks such as Express and Ruby on Rails, use both the HTTP verb & URL to define routes used to map requests to controller actions.

Other frameworks, such as Django and ASP.NET Core, use just the URL when defining a route, ignoring the HTTP verb.

That's why the Python modules used to define routes in Django are named **urls.py** (see diagram above).

## Installation & Set Up

#### Prerequisite Installs

Django should have been installed during installfest.  

Let's verify the installation as follows:

```
$ python3
>>> import django
>>> print( django.get_version() )  # -> 2.1.x
```

If it's not installed, do a one-time install of the Django framework using the following command:

```
$ pip3 install Django
```

By default, Django uses a lightweight database called SQLite. However, it's not supported by most hosting services (Heroku, etc.).

Therefore, from the start, we'll be following the better practice of using a more capable database by configuring each of our Django projects to work with PostgreSQL.

To use PostgreSQL, we need to do a one-time install of the **psycopg2** Python package:

```
$ pip3 install psycopg2-binary
```

`psycopg2` is a popular library that enables Python applications to interface with PostgreSQL.

#### Create a Database for the Project

MongoDB automatically creates a database when you use it for the first time.

However, we're not so lucky with SQL databases where we will need to manually create a database that we want to use for a Django project in advance.

Let's create one now in psql for the project we're about to code:

```
$ psql
# CREATE DATABASE polls;
```

Run the `\l` command to confirm that `polls` is in the list of databases.

Also, depending upon how PostgreSQL was installed, you might need the database's username/password. Just in case, make note of the username to the right of the database name in the list.

With the database created, type `\q` to exit the psql shell.

#### `cd` to Where You Should Be :)

The last thing to do is to move into this lesson's folder in the class repo so that you can commit your work and push to your fork for safe keeping.

You excited?  Ready to build your first Django app?  Let's do this!

## Build Django's Official Tutorial App

Django, in so many words, is a beast! Its documentation is hundreds of times larger than that of Express.

A great way to get started learning it is by following the official Django tutorial.  It's an excellent tutorial and we'll be getting a lot of information straight from the horses mouth!

As we work through the tutorial together, I'll be sure to draw analogies to Express whenever possible.

Next week, we'll be diving deeper into each of the topics we'll be touching upon during the tutorial, and more, like learning how to upload images to Amazon S3!

Let's get started by clicking [here](https://docs.djangoproject.com/en/2.1/intro/tutorial01/)!

## References

[Django Homepage](https://www.djangoproject.com/)