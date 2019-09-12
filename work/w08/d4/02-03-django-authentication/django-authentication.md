<img src="https://i.imgur.com/TGhY9yA.png">

# Django Authentication

## Learning Objectives

| Students Will Be Able To: |
|---|
| Add a relationship between the built-in `User` and another Model |
| Use the built-in `LoginView` to log in |
| Use the built-in `LogoutView` to log out |
| Use the built-in `UserCreationForm` to sign up new users |
| Dynamically render HTML based upon auth status |
| Access data that belongs to a logged in user only |
| Protect routes from unauthorized access |

## Road Map

1. Set Up
2. Intro to Authentication in Django
3. Creating the `User ---< Cat` Relationship
4. Adding URLs for Authentication
5. Logging In
6. Updating the Nav Bar Dynamically
7. Logging Out
8. Update the `CatCreate` View to Link to a User
9. Sign Up New Users
10. Displaying only the User's Cats
11. Implement Authorization
12. Further Study - Customizing the `User` Model

## 1. Set Up

This lesson's starter code picks up from the Uploading Images to S3 lesson.

The starter code is located in this lesson's `/starter-code/catcollector` directory.

**Be sure to be inside of the catcollector directory** before you open VS Code with `code .`.

**Be sure that no other Django server is running!**

Once inside the **catcollector** directory, spin up the Django development server:

```bash
$ python3 manage.py runserver
```

## 2. Intro to Authentication in Django

By default, Django creates projects with authentication and authorization capabilities pre-installed!

Two review questions for you:

- **What is authentication?**
- **What is authorization?**

Django's built-in authentication functionality is provided by the `'django.contrib.auth'` app included within the `INSTALLED_APPS` list in `settings.py`:

```python
INSTALLED_APPS = [
    'main_app',
    'django.contrib.admin',
    'django.contrib.auth',    # Thank You Django!
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
]
```

Django provides the common **user** authentication where the user signs up and logs in with a **username** and **password**.

Django relies on server-side sessions, implemented by the `'django.contrib.sessions'` app, to track when a user is logged in or out.

#### The `User` Model

At the core of Django's authentication, is the provided `User` Model which by default has the following attributes:

- `username`
- `password`
- `email`
- `first_name`
- `last_name`

Although these attributes are fine for the Cat Collector, some projects may need additional attributes such as `birthdate`, `favorite_color`, etc. The _Further Study_ section will point you in the right direction should you need this functionality.

## 3. Creating the `User ---< Cat` Relationship

#### Cat Collector's Functionality is Changing

Currently, all furry critters in Cat Collector are wild - they don't belong to a _Cat Collector_ (the user).

The functionality of Cat Collector is about to change!

By the end of this lesson, with authentication implemented, all cats will belong to a user.

Ordinarily, it's important to implement an app's authentication up front to avoid having to make the changes to the code we're going to have to make in Cat Collector.

#### Update the `Cat` Model

Adding the relationship of<br>**_A User has many Cats; and a Cat belongs to a User_**<br>is much the same as with creating any other one-to-many relationship.

One of the Model's needs a _Foreign Key_ - **which one?**

The `User` Model lives in the `django.contrib.auth` app, so the first thing we need to do is import it into **models.py**:

```python
from django.db import models
from django.urls import reverse
from datetime import date
# Import the User
from django.contrib.auth.models import User
```

Now let's add the field linking a `Cat` to a `User`:

```python
class Cat(models.Model):
  ...
  toys = models.ManyToManyField(Toy)
  # Add the foreign key linking to a user instance
  user = models.ForeignKey(User, on_delete=models.CASCADE)
```

#### Migrate the Change

Now that we've made a change to a Model that impacts the database, we need to migrate that change to the database.

However, there will now be a FK constraint on cats, which means that every cat record must hold the PK of a user record and because there are existing cats, Django is going to prompt us with two options...

Here we go:

```
$ python3 manage.py makemigrations
```

Which then presents us with this message:

```
You are trying to add a non-nullable field 'user' to cat without a default;
we can't do that (the database needs something to populate existing rows).
Please select a fix:
 1) Provide a one-off default now (will be set on all existing rows with a null value for this column)
 2) Quit, and let me add a default in models.py
Select an option:
```

Option `1)` is our best option because it will allow us to enter the `id` of a user, which we created earlier this week (the superuser).

Go ahead and press `1` and `[enter]`, which will then prompt us to enter the value:

```
Please enter the default value now, as valid Python
The datetime and django.utils.timezone modules are available,
so you can do e.g. timezone.now
Type 'exit' to exit this prompt
>>> 
```

Our superuser's `id` should be `1`, so type `1` and press `[enter]`.

The migration file will then be created.  Let's migrate the changes:

```
$ python3 manage.py migrate
```

Congrats, the one-to-many relationship between User and Cat has been created and all existing cats have been collected by the superuser!

## 4. Adding URLs for Authentication

As much as possible, we're going to use Django's built-in authentication features and default settings.

Django provides several class-based views that we can use for handling logging in and logging out.

However, before we can use those views, we'll need URLs to map to them.

Lucky for us, the `django.contrib.auth` module contains predefined URLS that we can simply `include` like this in **catcollector/urls.py**:

```python
  ...
  path('admin/', admin.site.urls),
  path('', include('main_app.urls')),
  # include the built-in auth urls for the built-in views
  path('accounts/', include('django.contrib.auth.urls')),
]
```

We won't need to import `django.contrib.auth.urls` because it's just a string.

Including the built-in URLs has added the following URL patterns to the app:

```python
accounts/login/ [name='login']
accounts/logout/ [name='logout']
accounts/password_change/ [name='password_change']
accounts/password_change/done/ [name='password_change_done']
accounts/password_reset/ [name='password_reset']
accounts/password_reset/done/ [name='password_reset_done']
accounts/reset/<uidb64>/<token>/ [name='password_reset_confirm']
accounts/reset/done/ [name='password_reset_complete']
```

I know, it looks like there's a lot there, but don't worry, we get to pick and choose which ones to implement!

Let's spin up the server and browse to `localhost:8000/accounts/login` to see what happens:

<img src="https://i.imgur.com/WPTYsIL.png">

This is a beautiful error because it's simply complaining about a missing **registration/login.html** template. But wait, we didn't define a view to render anything - what's up?

What's happening is that the `django.contrib.auth` app is doing its job!  It's using a built-in `LoginView` and this view is trying to render a _login.html_ template.

Now let's implement logging in...

## 5. Logging In

#### Create the **login.html** Template

As we just saw, the default `LoginView` is trying to render a **registration/login.html** template.

Let's get rid of the error by first creating the folder (make sure "registration" is spelled correctly):

```
$ mkdir main_app/templates/registration
```

Now create **login.html**:

```
$ touch main_app/templates/registration/login.html
```

Let's put a bit of markup in **login.html** so that we can see things are working:

```html
{% extends 'base.html' %}
{% block content %}

<h1>Log In</h1>

{% endblock %}
```

Refresh!

<img src="https://i.imgur.com/rhRzn5L.png">

When `LoginView` renders the **login.html** template, it passes in the context a default `form` object we can display in **login.html**:

```html
<h1>Log In</h1>

<!-- Add the login form -->
<form method="post" action="{% url 'login' %}">
  {% csrf_token %}
  {{ form.as_p }}
  <input type="submit" class="btn" value="login">
  <input type="hidden" name="next" value="{{ next }}">
</form>
```

The

```html
<input type="hidden" name="next" value="{{ next }}">
```

is really cool.  It is a feature of Django's authentication that will automatically redirect a user that tries to access a protected route back to that route after they log in!

> Using hidden inputs in forms is a common technique in web apps for providing additional data to the server when the form is submitted.

<img src="https://i.imgur.com/IpFNFRU.png">

You can log in now, but you'll get an error because by default, the login view redirects to **/accounts/profile**, let's fix this...

#### Specifying the Default Redirect After Logging In

In Cat Collector, when a user logs in, we want them to see their cat _index_ page.

The easiest way to make this happen is to add a new variable at the bottom of **settings.py**:

```python
STATIC_URL = '/static/'

# Add this variable to specify where successful logins should redirect to
LOGIN_REDIRECT_URL = '/cats/'
```

The `django.contrib.auth` app uses that value of the `LOGIN_REDIRECT_URL` variable, if it exists, to redirect to after the user logs in.

Test it out - sweet!

## 6. Updating the Nav Bar Dynamically

In most applications, many of the links displayed in a nav bar usually depend upon whether there is a logged in user or not.

In Cat Collector, if there's no user logged in, all we want is to show the following links:

- About
- Sign Up
- Log In

Then, when there is a logged in user, we want to see:

- About
- Add a Toy
- View All Toys
- Add a Cat
- View All My Cats
- Log Out

Thanks again to the built-in auth, we automatically have a `user` variable available in every template!

To check if the user is logged in, we simply use `user.is_authenticated`, which returns `True` when logged in and `False` otherwise.

With this knowledge in hand, let's make the nav bar dynamic in **base.html**:

```html
<ul class="right">
  <!-- changes below -->
  <li><a href="{% url 'about' %}">About</a></li>
  {% if user.is_authenticated %}
    <li><a href="{% url 'toys_create' %}">Add a Toy</a></li>
    <li><a href="{% url 'toys_index' %}">View All Toys</a></li>
    <li><a href="{% url 'cats_create' %}">Add a Cat</a></li>
    <li><a href="{% url 'index' %}">View All My Cats</a></li>
    <li><a href="{% url 'logout' %}">Log Out</a></li>
  {% else %}
    <li><a href="{% url 'login' %}">Log In</a></li>
  {% endif %}
</ul>
```

Note how the **Log In** and **Log Out** links are using the `url` template tag along with the built-in named URL patterns (listed above).

However, we're skipping the **Sign Up** link for now because Django does not include a default URL or view for signing up 😢

Now we should see the following nav if not logged in:

<img src="https://i.imgur.com/sVVS4y0.png">

When you log in, you'll see this nav:

<img src="https://i.imgur.com/D9vejV9.png">

Nice!

Logging out even works, but it doesn't redirect to our _Home_ page (root route)...

## 7. Logging Out

Thanks again to the `django.contrib.admin` app's built-in `LogOut` view, we didn't have to do a thing to implement logging out!

However, we'll want to redirect to a URL different from the default which we can make happen in the same way we just did when logging in - by adding another variable to **settings.py**:

```python
STATIC_URL = '/static/'

LOGIN_REDIRECT_URL = '/cats/'

# Add this variable to specify where logging out redirects to
LOGOUT_REDIRECT_URL = '/'
```

That was easy!

## 8. Update the `CatCreate` View to Assign a New Cat to the Logged in User

Since cats belong to a user, before a new cat can be added to the database, its user is going to have to be assigned to its `user` attribute that we added to the model earlier.

To do this, we're going to have to add some additional code to the `CatCreate` view as follows:

```python
class CatCreate(CreateView):
  model = Cat
  fields = ['name', 'breed', 'description', 'age']
  
  # This inherited method is called when a
  # valid cat form is being submitted
  def form_valid(self, form):
    # Assign the logged in user (self.request.user)
    form.instance.user = self.request.user
    # Let the CreateView do its job as usual
    return super().form_valid(form)
```

We're overriding the `CreateView`'s `form_valid` method to assign the logged in user, `self.request.user`. Yes, the built-in auth automatically assigns the user to the `request` object similar to what Passport did in Express.

In Python, inherited instance methods can be invoked by prefacing the method name with `super()`. Accordingly, after updating the form to include the user, we're calling `super().form_valid(form)` to let the `CreateView` do its usual job of creating the model in the database and redirecting.

Okay, let's check out the refactor by:

- First, opening the admin app:  `localhost:8000/admin`
- Click on **Cats**
- Select a cat and verify the user is assigned to it
- Leave the admin app open, and go add a new cat in Cat Collector
- Back in the admin app, go to all cats then click on the one just added and verify that the user's been assigned!

Moving right along...

## 9. Sign Up New Users

Unfortunately, Django's built-in auth does not provide a URL or view for signing up new users.

#### Add a URL

First we'll add a new URL pattern for the sign up functionality in **main_app/urls.py**:

```python
path('toys/<int:pk>/delete/', views.ToyDelete.as_view(), name='toys_delete'),

# New url pattern below
path('accounts/signup', views.signup, name='signup'),
```

To stay consistent with Django's auth-related URLs, we'll preface the pattern with `accounts/`.

There's no generic view available to help us out, so we're going to write the new view function named `signup` that the server is waiting for.

#### Add the `signup` View Function

The `signup` view function will be the first view we've coded that performs two different behaviors based upon whether it was called via a GET or POST request:

- If it's a **GET request**: The view function should render a template with a form for the user to enter their info.
- If it's a **POST request**: The user has submitted their info and the function should create the user and redirect.


Although Django did not include a URL or view, it **does** include a `UserCreationForm ` that we can use in a template to generate all of the inputs for a `User` model.

In addition, we're also going to use the `login` function to automatically log in a user when they sign up - users hate signing up and then having to turn around and log in!

Let's import them near the top of **views.py**:

```python
...
from django.views.generic import ListView, DetailView
# Add the two imports below
from django.contrib.auth import login
from django.contrib.auth.forms import UserCreationForm
...
```

Now let's code the `signup` view function - we'll review as we type it in:

```python
def signup(request):
  error_message = ''
  if request.method == 'POST':
    # This is how to create a 'user' form object
    # that includes the data from the browser
    form = UserCreationForm(request.POST)
    if form.is_valid():
      # This will add the user to the database
      user = form.save()
      # This is how we log a user in via code
      login(request, user)
      return redirect('index')
    else:
      error_message = 'Invalid sign up - try again'
  # A bad POST or a GET request, so render signup.html with an empty form
  form = UserCreationForm()
  context = {'form': form, 'error_message': error_message}
  return render(request, 'registration/signup.html', context)
```

There's really no way to remember that code, so just refer to this lesson, the docs, or Google.

#### Add the **Sign Up** Link to the Nav

Now that we know the URL, we can add a **Sign Up** link to the nav in **base.html**:

```html
{% else %}
  <!-- New link below -->
  <li><a href="{% url 'signup' %}">Sign Up</a></li>
  <li><a href="{% url 'login' %}">Log In</a></li>
{% endif %}
```

#### Create the **signup.html** Template

As a start, let's copy the **login.html** file as **signup.html**

```
$ cp main_app/templates/registration/login.html main_app/templates/registration/signup.html
```

If you use VS Code's UI to copy it, just make sure **signup.html** is within the **registration** folder.

Make the necessary changes to **signup.html**:

```html
{% extends 'base.html' %}
{% block content %}

<h1>Sign Up</h1>

{% if error_message %}<p class="red-text">{{ error_message }}</p>{% endif %}

<form method="post" action="{% url 'signup' %}">
  {% csrf_token %}
  {{ form.as_p }}
  <input type="submit" class="btn" value="signup">
</form>

{% endblock %}
```

With the above template, clicking the **Sign Up** in the nav should show a page like the following:

<img src="https://i.imgur.com/VcudWnp.png">

By using the the `UserCreateForm`, you get help messages that go with all of the validations.

However, notice that the form does not include inputs for the user's: 

- `email`
- `first_name`
- `last_name`

To include these, you'll have to create your own `ModelForm` based upon the `User` Model.

If you want to remove some or all of the password validations, you can comment them out or remove them from the `AUTH_PASSWORD_VALIDATORS` list in **settings.py**.

You should now be able to sign up!

## 10. Displaying Only the User's Cats

If you sign up or log in with a different user, you'll notice that all of the cats in the database are still showing up on the _index_ page.

If we take a look at the `cat_index` view, we'll see why:

```python
def cats_index(request):
  # This reads ALL cats, not just the logged in user's cats
  cats = Cat.objects.all()
  return render(request, 'cats/index.html', { 'cats': cats })
```

To display just the logged in user's cats, we just need to change the query to this:

```python
def cats_index(request):
  cats = Cat.objects.filter(user=request.user)
  # You could also retrieve the logged in user's cats like this
  # cats = request.user.cat_set.all()
  return render(request, 'cats/index.html', { 'cats': cats })
```

Last step, coming up!

## 11. Implement Authorization

Now that authentication has been implemented, the last step is to protect the routes that are dependent upon a user being logged in.

Yes, the dynamic nav bar helps prevent access, but users can still type something like `localhost:8000/cats` in the address bar when nobody is logged in, which will raise an error.

Of course Django provides an easy way to protect both function and class-based views...

#### Implement Authorization on View Functions

To protect view functions, we use the `login_required` decorator.

First we need to import it near the top of **views.py**:

```python
...
from django.contrib.auth.forms import UserCreationForm
# Import the login_required decorator
from django.contrib.auth.decorators import login_required
```

Now we can simply "decorate" any view function that requires a user to be logged in like this:

```python
@login_required
def cats_index(request):
  ...
```

Trying to browse to `localhost:8000/cats` while not logged in will now send you to the Log In page!

Be sure to add the `@login_required` to these remaining view functions:

- `cats_detail`
- `add_feeding`
- `add_photo`
- `assoc_toy`
- `unassoc_toy`

#### Implement Authorization on Class-based Views

Protecting class-based views is slightly different, it uses what's called a mixin, which is another class to inherit from - in OOP, we call this _multiple inheritance_.

As usual, we'll need to import it:

```python
...
from django.contrib.auth.decorators import login_required
# Import the mixin for class-based views
from django.contrib.auth.mixins import LoginRequiredMixin
```

Finally, we can protect class-based views like this:

```python
class CatCreate(LoginRequiredMixin, CreateView):
  ...
```

Not all OOP languages support the concept of multiple inheritance, but Python does.

Be sure to add `LoginRequiredMixin` to these remaining classes:

- `CatUpdate`
- `CatDelete`
- `ToyList`
- `ToyDetail`
- `ToyCreate`
- `ToyUpdate`
- `ToyDelete`

Wow, that was a blast - congrats!

## Summary

Authentication is incredibly important to virtually every application.

Most features of an application are dependent upon knowing which user is accessing the feature.

This is why it's **so important** to implement authentication in your projects up front, immediately after the user story for when first browsing as an anonymous user to the root route:<br>_As a Visitor, upon browsing to the application I want [insert feature here]_

No time to waste, Finch Collector is waiting to have authenticated users!

## Suggested Practice Exercise

Wouldn't it be nice to see the username of the logged in user displayed in the nav bar?

It sure would - "Make it so number one"

## 12. Further Study - Customizing the `User` Model

There are a couple of options when it comes to adding additional attributes and/or behavior to the "user" in a Django app.

#### APPROACH 1:  "Extending" the Existing `User` Model

The other approach would be to extend the current `User` model by creating a one-to-one relationship with another Model, usually named something like `Profile`:

```python
from django.contrib.auth.models import User

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    favorite_color = models.CharField(max_length=50)
```

Start [here](https://docs.djangoproject.com/en/2.1/topics/auth/customizing/#extending-the-existing-user-model) for more info about using this approach.

#### APPROACH 2:  Custom `User` Model

> Note:  This approach is more complex and requires more effort to implement - it is recommended that the first approach be followed.

This approach creates a custom `User` Model by inheriting from an `AbstractUser` class provided by Django:

```python
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    # Add your additional features
```

Start [here](https://docs.djangoproject.com/en/2.1/topics/auth/customizing/#using-a-custom-user-model-when-starting-a-project) for more information about using this approach.

## References

- [Django Authentication System](https://docs.djangoproject.com/en/2.1/topics/auth/default/)

