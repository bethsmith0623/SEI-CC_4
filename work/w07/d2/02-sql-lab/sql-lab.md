# SQL Lab

<img src="https://i.imgur.com/OGKTx2f.jpg">

# Where In The World Is Carmen Sandiego?

## Introduction

#### Use SQL to find Carmen Sandiego

We're going to use what we've learned already about querying a database using SQL commands to to chase down and capture an elusive and world-renowned thief, Carmen Sandiego!

## Set Up

1. Ensure that you're **in this lab's folder** within the class repo.

2. Open VS Code: `$ code .`

3. Open a terminal session and run `ls`.  Ensure that you see the three files: `clues.sql`, `sql-lab.md` & `world.sql`.

4. Start the `psql` interactive terminal: `$ psql`

5. Create a database named `carmen` and connect to it:

	```sql
	CREATE DATABASE carmen;
	\c carmen
	```

6. Create `city`, `country` & `countrylanguage` tables and seed their data using the _import_ (`\i`) psql command:

	```sql
	\i world.sql
	```

## Exercise

The goal is to figure out what city Carmen Sandiego is heading to so that she can be met by the proper authorities.

You'll be writing SQL queries within `clues.sql` to answer each clue.

Run the queries in psql by typing `\i clues.sql`.

## Hints

- Use the psql `\d` & `\dt tablename` commands to list & display the schema of each of the three tables.

- Google and collaborate to reach the goal of finding out where Carmen's destination is.

- For example, you'll certainly need to know about the [ORDER BY](http://www.postgresqltutorial.com/postgresql-order-by/) clause.

## Additional Resources

- [PostgreSQL official documentation](http://www.postgresql.org/docs/)

## Encore 

If you finish this exercise and want to learn more about SQL, do some of [these exercises here](https://pgexercises.com/).