<img src="https://i.imgur.com/efjnAna.jpg">

# Deploying a Django App to Heroku

## Road Map

1. Preparation
2. Ready the Django Project
3. Commit the Changes
4. Deploy to Heroku
5. Migrate the Database Migrations
6. Set Environment Variables
7. Open the Application
8. Create the superuser
9. Test the Admin Portal

## 1. Preparation

### `cd` Into the Project's Folder

- `cd` into the the Django project's root folder

- Open the project in VS Code: `code .`

- Open a terminal in VS Code: `ctrl + backtick`

- Make sure that the `master` branch is checked out

### Heroku Account & Toolbelt

You already got set up with Heroku in Unit 2.

[Click here](https://dashboard.heroku.com) to open your Heroku Dashboard.

Verify that the [Heroku Toolbelt](https://devcenter.heroku.com/articles/heroku-cli) is installed by typing the following in terminal:

```
$ heroku
```

You should see a list of commands available.

Run the following command to check if you're logged in:

```
$ heroku auth:token
```

If not logged in, type the following and enter your credentials:

```
$ heroku login
```

### Create the App on Heroku

After ensuring that you're logged in, you can create the app on Heroku as follows:

```
$ heroku create <your preferred name here>
```

Replace `<your preferred name here>` with the name you want (no spaces). Your name has to be unique on Heroku, so you might have to be a little creative.

The name you choose will be the name of the app in your Heroku dashboard and the name used for the subdomain in the URL of your hosted app, e.g., `https://catcollector.herokuapp.com`


## 2. Ready the Django Project

Django projects need to be configured to be deployed.

Django has some [docs](https://docs.djangoproject.com/en/2.1/howto/deployment/) and a [checklist](https://docs.djangoproject.com/en/2.1/howto/deployment/checklist/), however, there is dedicated package we can use to make deploying to Heroku much easier.

### Install `django-heroku`

First, let's install [`django-heroku`](https://github.com/heroku/django-heroku) which is a Python package that will help with the deployment process:

```
$ pip3 install django-heroku
```

### Update `settings.py`

There are several changes we would have to make to `settings.py` in order to be able to deploy.

The `django-heroku` package makes the necessary changes to `settings.py` for us. All we need to do is add the following to the **very bottom** of **settings.py**:

```python
# Other settings above

# Configure Django App for Heroku.
import django_heroku
django_heroku.settings(locals())
```

> Note that the import name is `django_heroku` instead of `django-heroku` we used when installing.


### Install `gunicorn`

The built-in development server we've been running with `python3 manage.py runserver` is not suitable for deployment.

`gunicorn` is a Python HTTP Server designed to work with Linux/Unix servers such as Heroku's.

Let's install it:

```
$ pip3 install gunicorn
```

### Create & Configure `Procfile`

Heroku needs a file named **Procfile** to know how to run a Python app.

Let's create one - be sure to name it exactly as `Procfile` without a file extension:

```
$ touch Procfile
```

We only need to add a single line of code in **Procfile**. However, it's important to replace the `<your project name here>` with your actual project name (same as the project's folder name):

```
web: gunicorn <your project name here>.wsgi
```

### Create a `requirements.txt`

The `package.json` file we used in Node apps informed Heroku which Node modules the app needed to be installed.

The equivalent in a Python app is the `requirements.txt` file.

`pip3` has a `freeze` command for listing the installed Python packages. Let's check it out:

```
$ pip3 freeze
```

That list of packages is in the correct format for the `requirements.txt` file.

Here's how we can use a Unix/Linux pipe to redirect the output of `pip3 freeze` to a `requirements.txt` file (please spell correctly):

```
$ pip3 freeze > requirements.txt
```

Since we're not using [virtual environments](https://packaging.python.org/guides/installing-using-pip-and-virtualenv/), the list of requirements may actually include packages the Django project does not need. This is not a problem, the first deployment just might take a little longer as Heroku installs the extra packages.

However, the `requirements.txt` file may be edited to remove packages that you **are sure** your project doesn't need. 

## 3. Commit the Changes

Now let's commit the changes made to the project (make sure that you're on the `master` branch):

```
$ git add -A
$ git commit -m "Config deployment"
```

## 4. Deploy to Heroku

Deploying the first time and re-deploying later is as easy as running this command:

```
$ git push heroku master
```

The `heroku` remote was added to the repo with the `heroku create` command ran earlier.

The first deployment will take considerably longer than subsequent deployments because Heroku will have to install all of the Python packages.  However, during re-deployments, Heroku will only install/uninstall changes made to `requirements.txt`.

Read the output during deployment carefully. You'll need to address the errors if the deployment fails.

In the case of a successful first deployment - **the app is still not ready to run**...

## 5. Migrate the Database Migrations

### Checking that Heroku Created a PostgreSQL Database

If a Django project is configured to use a PostgreSQL, Heroku automatically detects and creates a PostgreSQL database for the project.

You can run the following command to verify this:

```
$ heroku pg
```

You should see an output similar to this:

```
=== DATABASE_URL
Plan:                  Hobby-dev
Status:                Available
Connections:           0/20
PG Version:            11.2
Created:               2019-03-19 16:06 UTC
Data Size:             7.9 MB
Tables:                0
Rows:                  0/10000 (In compliance) - refreshing
Fork/Follow:           Unsupported
Rollback:              Unsupported
Continuous Protection: Off
Add-on:                postgresql-parallel-89032
```

### Check and Migrate the Migrations

First, let's run a command that shows us a list and status of the migrations for our local project:

```
$ python3 manage.py showmigrations
```

The output for the Cat Collector app looks like this:

```
admin
 [X] 0001_initial
 [X] 0002_logentry_remove_auto_add
 [X] 0003_logentry_add_action_flag_choices
auth
 [X] 0001_initial
 [X] 0002_alter_permission_name_max_length
 [X] 0003_alter_user_email_max_length
 [X] 0004_alter_user_username_opts
 [X] 0005_alter_user_last_login_null
 [X] 0006_require_contenttypes_0002
 [X] 0007_alter_validators_add_error_messages
 [X] 0008_alter_user_username_max_length
 [X] 0009_alter_user_last_name_max_length
contenttypes
 [X] 0001_initial
 [X] 0002_remove_content_type_name
main_app
 [X] 0001_initial
 [X] 0002_feeding
 [X] 0003_auto_20190303_2329
 [X] 0004_cat_toys
 [X] 0005_photo
 [X] 0006_cat_user
sessions
 [X] 0001_initial
```

We can run most any command we can locally on the Heroku server by prefacing the command with `heroku run` and substituting `python` for `python3`.

Let's check out the migrations for the deployed app:

```
$ heroku run python manage.py showmigrations
```

Which generates the following output for Cat Collector:

```
admin
 [ ] 0001_initial
 [ ] 0002_logentry_remove_auto_add
 [ ] 0003_logentry_add_action_flag_choices
auth
 [ ] 0001_initial
 [ ] 0002_alter_permission_name_max_length
 [ ] 0003_alter_user_email_max_length
 [ ] 0004_alter_user_username_opts
 [ ] 0005_alter_user_last_login_null
 [ ] 0006_require_contenttypes_0002
 [ ] 0007_alter_validators_add_error_messages
 [ ] 0008_alter_user_username_max_length
 [ ] 0009_alter_user_last_name_max_length
contenttypes
 [ ] 0001_initial
 [ ] 0002_remove_content_type_name
main_app
 [ ] 0001_initial
 [ ] 0002_feeding
 [ ] 0003_auto_20190303_2329
 [ ] 0004_cat_toys
 [ ] 0005_photo
 [ ] 0006_cat_user
sessions
 [ ] 0001_initial
```

Yup, the unchecked migrations tells us that they need to be migrated:

```
$ heroku run python manage.py migrate
```

Lots of `OK`s is a good sign!

## 6. Set Environment Variables

We need to set environment variables (secrets) on Heroku in the same way we needed to set our OAuth keys in Unit 2.

The best way is to set each key=value pair using the `heroku config:set` command:

```
$ heroku config:set AWS_ACCESS_KEY_ID=AKIAJYO6WFUBRZUI6ZNQ
```

> Note: If setting AWS keys from Boto3, ensure they are in all caps.

Setting the environment variables via the command line automatically restarts the server - which is necessary.  If you set the _config vars_ in Heroku's Dashboard, it won't restart the server.  However, you can restart the server manually using<br>`$ heroku restart`

After you are finished setting all of the environment variables, you can verify them as follows:

```
$ heroku config
```

Included in the output will be a `DATABASE_URL` that Heroku automatically added.

## 7. Open the Application

Let's check it out!

```
$ heroku open
```

After signing up, creating and uploading a photo for Whiskers, I celebrated:

<img src="https://i.imgur.com/7hpQqOU.png">

## 8. Create the superuser

Because the database is "fresh", there's no superuser yet.

```
$ heroku run python manage.py createsuperuser
```

It's the same process as locally, just a bit slower.

## 9. Test the Admin Portal

Okay, the finale is to browse to:

`https://<your app name>.herokuapp.com/admin`

to checkout the admin portal:

<img src="https://i.imgur.com/fFsrfae.png">

### Congrats!



