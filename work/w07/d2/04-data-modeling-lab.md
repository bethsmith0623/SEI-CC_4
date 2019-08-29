<img src="https://i.imgur.com/qz8V0NX.png" width="400">

# Data Modeling - Lab
---

## Intro

In the _Relational Data Modeling_ lesson, you learned that:

- **Data Entities** represents real-world objects within an application, e.g., _Customer_.
- Entities have **attributes** that represent data pertaining to that entity, e.g., the _email_ for a _customer_.
- **Relationships** exist between certain entities, e.g., _one-to-many_.
- Determining the conceptual **data model** is an important planning step for an application.
- An **Entity Relationship Diagram (ERD)** documents the data model.

## Goal

The goal of this lab is to provide practice determining the **data model** for an application and documenting it using an **ERD**.

## Process

1. Form groups of 3 or 4 students.

2. Each group will draw an ERD on the wall for one of applications below.

3. When the ERD is complete, please take a picture and slack it in the class channel.

## List of Applications to Model

Choose an application from the following list to create and ERD for.  Note that the descriptions are intentionally vague so that the group can brainstorm the functionality and resulting data model. 

- **Road Trip Planner**
	- Allows a user to plan future road trips.
	- Allows a user to add any number of stops for a trip.
	- Allows a user to view the stops for a trip in chronological order or grouped by the following categories: dining; point of interest; sleeping accommodation; or other.
	- Allows users to view previously planned trips.

- **Airline Reservation System**
	- Allows any airline to book flights for customers.
	- Allows airlines to prevent overbooking flights based on the type of aircraft assigned to a flight.

- **Music Lesson Matchmaker**
	- Allows music teachers to make lessons available for booking by students.
	- Allows teachers to specify what instruments they teach.
	- Allows students to easily find teachers that teach the instrument of their choice.
	- Allows students to book available lessons.

- **Social Gaming App**
	- Allows a gamer to maintain a list of their favorite games.
	- Allows a gamer to find other gamers that have favorited one or more of the same games.
	- Allows gamers to read & post comments for a game.
	- Allows gamers to rate a game and see it's overall rating.
	
- **Art Storefront**
	- Allows artists to list unique pieces of art for sale.
	- Allows customers to view purchase art listed for sale.
	- Allows customers to search for art available for sale by a particular artist. 


## Hints

- Reviewing an application's **user stories** is a good place to start for identifying the entities and their attributes.

- The key to identifying whether a relationship between two entities is either a **one-to-many** or **many-to-many**, is to determine if a particular instance (row) of an entity can belong to more than one entity on the other side of the relationship. For example, this relationship appears reasonable:
	
	<img src="https://i.imgur.com/SWV1d0F.png">
	
	Reads: **_An order has many products_**
	
	However, can't the same product belong to more than one order?  Sure it can, therefore, you actually have this relationship:
	
	<img src="https://i.imgur.com/BuihJkP.png">
	
	Reads: **_An order has many products and a product has many orders_**, which can also be described as **_A product has and belongs to many orders_**