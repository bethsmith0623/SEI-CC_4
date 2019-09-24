<img src="https://i.imgur.com/HL5YY8J.png">

# Django Many-to-Many Relationships

## Learning Objectives

| Students Will Be Able To: |
|---|
| Use Django's `ManyToManyField` to Implement a M:M Relationship |
| Add an Association in a M:M Relationship |
| Remove an Association in a M:M Relationship |

## Road Map

1. Set Up
2. Review the Starter Code
3. Many-to-Many Relationships in RDBMs
4. Many-to-Many Relationship in Django
5. Implement the Cat & Toy Association in Cat Collector
6. Lab Assignment
7. Practice Exercise
8. Further Study

## 1. Set Up

**Be sure to be inside of this lesson's `starter-code/catcollector` directory, NOT the `starter-code` directory** before you open VS Code with `code .`

The starter code for this lesson has had quite a bit of code added to it since you last saw the Cat Collector.

However, none of the additional code has anything that you haven't worked with already.

Because many-to-many relationships require a Model that is independent of other models, a `Toy` Model and all of its CRUD has been implemented.

This way, we can focus on how to implement the actual `Cat >--< Toy` relationship in this lesson.

Because a new `Toy` model has been added, there are migration files in the starter code that have not yet been migrated to the database on your computer. Let's do that now:

```
$ python3 manage.py migrate
```

Now start up the server:

```
$ python3 manage.py runserver
```

## 2. Review the Starter Code

Browse to `localhost:8000` and checkout the CRUD features for Toys.

As you can see, the `Toy` Model is pretty minimal, just `name` and `color` attributes.

Go ahead and create a few toys so that you have them to assign to cats later.

After you're done, let's take a look at the `Toy`-related Django modules in `main_app`:

- **models.py**
- **urls.py**
- **views.py**

## 3. Many-to-Many Relationships in RDBMs

Unlike MongoDB, which can easily implement both one and many-to-many relationships without much fuss, SQL databases need what is known as a **join table** to implement M:M relationships.

Join tables provide the "glue" between two other tables in a database.  

Each row in the join table contains _foreign keys_ for the other two tables' _primary keys_ as diagrammed here:

<img src="https://i.imgur.com/imTYIBl.png">

## 4. Many-to-Many Relationship in Django

As usual, the Django framework handles a lot of the heavy lifting when it comes to working with many-to-many Relationships between Models.

Forms and templates aside, all we need to do to implement a many-to-many relationship using Django is:

1. Add a `ManyToManyField` on one of the Models
2. Create the migration and migrate it to update the database

Django will ensure that a "hidden" join table is created that links the rows of the other two tables together.

#### Add a `ManyToManyField` on One Side of the Relationship

To create a M:M relationship between two models, we need to add a `ManyToManyField` on one of them.

Django will still ensure that we can traverse data from both models to the related model, but we get to pick the name for the relationship attribute on the model we choose to add `ManyToManyField` to.

We more commonly be accessing a cat's toys, than a toy's cats, so we'll add the new attribute to the `Cat` model:

```python
class Cat(models.Model):
  name = models.CharField(max_length=100)
  breed = models.CharField(max_length=100)
  description = models.TextField(max_length=250)
  age = models.IntegerField()
  # Add the M:M relationship
  toys = models.ManyToManyField(Toy)
```

#### Make and Run the Migration

Because we've made a change to a Model that impacts the database's schema, we must make a migration and migrate it to update the database.

First, make the migration:

```
$ python3 manage.py makemigrations
```

Now, let's migrate the created migration to update the schema:

```
python3 manage.py migrate
```

We're ready to test drive the new relationship!

#### Open the Interactive Sheel

We'll use the shell to check out the `Cat >--< Toy` relationship:

```
$ python3 manage.py shell
```

Now let's import everything from **models.py**:

```
$ from main_app.models import *
```

#### The "Related Manager"

When we perform CRUD using a Model in Django, we've used the the `objects` manager to do it. For example, let's use the manager to query for all cats:

```python
>>> Cat.objects.all()
<QuerySet [<Cat: Biscuit>, <Cat: Morris>, <Cat: Maki>]>
```

However, when a one-to-many or many-to-many relationship exists, Django also creates a [related manager](https://docs.djangoproject.com/en/2.1/ref/models/relations/) used to access the data related to a model instance.

To check this out, let's query for a cat and save it in a variable:

```python
>>> cat = Cat.objects.get(name='Maki')
```

Now, thanks to the `toys = models.ManyToManyField(Toy)` field we added, we can use the `toys` _related manager_ like this:

```python
>>> cat.toys.all()
<QuerySet []>   # Maki has no toys associated with it yet
```

Let's grab the first toy:

```python
>>> first_toy = Toy.objects.first()
>>> first_toy
<Toy: Cat Charmer>
```

Although we didn't add another field on the `Toy` Model, Django still created a related manager that allows a toy to read, add & remove associated cats:

```python
>>> first_toy.cat_set.all()
<QuerySet []>
```

> Note the naming convention Django used for naming the related manager - the related model's name (lower cased) and append `_set`.
 
#### Adding Associated Data

To add an association, use the related manager's `add` method.

Let's associate the `cat` and the `first_toy`:

```python
>>> cat.toys.add(first_toy)
>>> cat.toys.all()
<QuerySet [<Toy: Cat Charmer>]>
```

> Alternatively, `first_toy.cat_set.add(cat)` would have created the same association.
 
Let's get crazy and associate the last cat with both the first and last toy:

```python
>>> Cat.objects.last().toys.add(Toy.objects.first(), Toy.objects.last())
>>> Cat.objects.last().toys.all()
<QuerySet [<Toy: Cat Charmer>, <Toy: Bouncy Mouse>]>
```

Behind the scenes, there's an amazing amount of SQL being sent to the database!

#### Removing Associated Data

To remove an association, use the related manager's `remove` method.

Let's remove the association between the `cat` and the `first_toy`, but this time we'll do it using `first_toy`:

```python
>>> first_toy.cat_set.all()
<QuerySet [<Cat: Morris>, <Cat: Maki>]>   # Associated with two cats
>>> cat    # Going to unassociate this cat
<Cat: Morris>
>>> first_toy.cat_set.remove(cat)
>>> first_toy.cat_set.all()
<QuerySet [<Cat: Maki>]>    # No more Morris
```

Here's how we can use a `for...in` loop and the `clear()` method to remove all associations between cats and toys:

```python
>>> for c in Cat.objects.all():
...     c.toys.clear()    # Don't forget to tab
... [press enter]
>>>
```

Fun stuff!  Exit the shell by typing `control + D` or `exit()`

## 5. Implement the Cat & Toy Association in Cat Collector

### User Stories

_As a User, when viewing the detail page of a cat, I want to see a list of toys the cat has and be able to add toys to the list that the cat doesn't already have_

### Displaying a List of Associated Toys

Displaying a cat's toys is just a matter of updating **templates/cats/detail.html**:

```html
<!-- This is all new markup to be added just above the <script> tag -->
<hr>
<div class="row">
  <div class="col s6">
    <h3>{{ cat.name }}'s Toys</h3>
    {% if cat.toys.count %}
      {% for toy in cat.toys.all %}
        <div class="card">
          <div class="card-content">
            <span class="card-title">
              A <span style="color: {{ toy.color }}">{{ toy.color }}</span> {{ toy.name }}
            </span>
          </div>
        </div>
      {% endfor %}
    {% else %}
      <h5>No Toys :(</h5>
    {% endif %}
  </div>
  <!-- Available toys will come after this line -->
</div>
```

After saving and viewing the detail page for a cat, you'll see something like this:

<img src="https://i.imgur.com/XypPw7A.png">

Let's use the Django admin app (`localhost:8000/admin`) to add a toy or two then refresh the page:

<img src="https://i.imgur.com/xTWN8b9.png">

### Displaying a List of Unassociated Toys

The next step would be to display toys that the cat is not associated with.

Each toy should include an ADD button that will add the toy to the list (implemented in the next step).

To be able to display the list of unassociated toys, we'll need to query for them in the `cats_detail` view function and add them to the context being passed to the template.

The query to find all toys that a cat doesn't have is a bit complicated, but it demonstrates the power of the Django ORM.

In **views.py** update `cats_detail as follows`:

```python
def cats_detail(request, cat_id):
  cat = Cat.objects.get(id=cat_id)
  # Get the toys the cat doesn't have
  toys_cat_doesnt_have = Toy.objects.exclude(id__in = cat.toys.all().values_list('id'))
  feeding_form = FeedingForm()
  return render(request, 'cats/detail.html', {
    'cat': cat, 'feeding_form': feeding_form,
    # Add the toys to be displayed
    'toys': toys_cat_doesnt_have
  })
```

We're using the manager's `exclude` method to grab all toys that don't need the condition passed to it.

The Django Query API enables [Field Lookups](https://docs.djangoproject.com/en/2.1/ref/models/querysets/#field-lookups) for every field in the model. `id__in` is one such field lookup that checks if the model's `id` is in a list and that list is being created with this code:

```python
cat.toys.all().values_list('id')
```

Finally, we are passing the toys to the template by adding it to the context dictionary.

Now for more markup to display the toys the cat doesn't have:

```html
  </div>
  <!-- Available toys will come after this line -->
  <div class="col s6">
    <h3>Available Toys</h3>
    {% if toys.count %}
      {% for toy in toys.all %}
        <div class="card">
          <div class="card-content">
            <span class="card-title">
              A <span style="color: {{ toy.color }}">{{ toy.color }}</span> {{ toy.name }}
            </span>
          </div>
          <div class="card-action">
            <form action="" method="post">
              {% csrf_token %}
              <button type="submit" class="btn">Add</button>
            </form>
          </div>
        </div>
      {% endfor %}
    {% else %}
      <h5>{{cat.name}} Already Has All Toys Available</h5>
    {% endif %}
  </div>
```

Very much like what we just added previously, except for a couple of changes.

An **ADD** form has been included, but the `action` attribute is currently empty because we'll implement this feature in the next section.

Here's what the updated UI looks like:

<img src="https://i.imgur.com/Lbhq1Ff.png">

### Making the Association

The app is looking good and all that's left is to handle the form being submitted to associate a toy with the cat.

To do this, the server needs to know the `id` of **both** the cat and the toy being associated.

Let's first add a new URL pattern that makes sense in **urls.py**:

```python
  path('cats/<int:cat_id>/add_feeding/', views.add_feeding, name='add_feeding'),
  # associate a toy with a cat (M:M)
  path('cats/<int:cat_id>/assoc_toy/<int:toy_id>/', views.assoc_toy, name='assoc_toy'),
```

As you can see, we've created two route parameters:  `cat_id` and `toy_id`.

Now let's make sure the form will post to this route.

Now that we know have defined the route and named it, we can use the `url` template tag to write out the proper URL in the form's `action`:

```html
<div class="card-action">
  <form action="{% url 'assoc_toy' cat.id toy.id %}" method="post">
      {% csrf_token %}
    <button type="submit" class="btn">Add</button>
  </form>
</div>
```

Note how we need to provide both `id`s as space-separated parameters in the order that they were defined in the path (first the cat's id, then the toy's).

We're done as soon as we write the `views.assoc_toy`:

In **views.py**:

```python
def assoc_toy(request, cat_id, toy_id):
  # Note that you can pass a toy's id instead of the whole object
  Cat.objects.get(id=cat_id).toys.add(toy_id)
  return redirect('detail', cat_id=cat_id)
```

We saw something similar to this earlier in when testing out the relationship in the shell.

Congrats on implementing a many-to-many relationship between cats and toys!

## 6. Lab Assignment

Lab time is to be spent implementing the same feature in your Finch Collector project :)

## 7. Practice Exercise

Implement the following user story:

_AAU, when viewing the detail page for a cat, I want to be able to remove a toy for that cat_

## 8. Further Study

Although Django automatically creates a "hidden" join table to implement a many-to-many relationship, there are times where it would be beneficial to be able to add additional attributes to that join table.

As an example, a `Ticket` Model provides the role of a join table between a `Concert` and a `Customer`:

```
Concert --< Ticket >-- Customer
```

In essence, a _Concert has many Customers through Tickets_

Further, a _Customer has many Concerts through Tickets_

Django includes a `through` kwarg to pull this type of relationship off.

```python
class Concert(models.Model):
    name = models.CharField(max_length=100)
    # other attributes here
    
class Customer(models.Model):
    name = models.CharField(max_length=50)
    # other attributes here
    concerts = models.ManyToManyField(Concert, through='Ticket')
    
class Ticket(models.Model):
	 seat = models.CharField(max_length=20)
	 # other attributes here
    concert = models.ForeignKey(Concert, on_delete=models.CASCADE)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
```

For more information regarding _many-to-many through relationships_, start [here](https://docs.djangoproject.com/en/2.1/topics/db/models/#intermediary-manytomany) in the docs.

## References

[Examples of CRUD with Many-to-Many Relationships](https://docs.djangoproject.com/en/2.1/topics/db/examples/many_to_many/)

