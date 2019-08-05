<img src="https://i.imgur.com/Gd2y6TU.jpg" width="900">

# Deploying Your Static App to GitHub-Pages

## Intro

This quick walk-thru will show you how easy it is to deploy your static web application so that it can be accessed by anyone with Internet access, anywhere in world!

Any GitHub repository containing an _index.html_ and other static assets can become a website by simply creating a _gh-pages_ branch and pushing it to the _origin_ remote.

## What is a _static_ application?

A _static_ application is an application that consists solely of **static assets**.

Static assets are files that are not "processed" by the web server in any way, they are simply delivered by the web server as they are requested by the browser.

Typical **static assets** include:
	
- **html** files
- **css** stylesheets
- **javascript** files
- **image** files

## Deploying with ghpages

#### Ensure your project is ready to deploy

Make sure that your project is working - it does not make sense to deploy a broken app!

Next, make sure that all changes to your code are committed to _master_ in your local repository.

Although not necessary, go ahead and push the latest commit to _origin_:<br>`$ git push origin master`

#### Create a `gh-pages` Branch

You will learn more about git **branches** during Project 3, however, deploying on _ghpages_ requires that we create a new branch:

- Ensure that you're in your project's directory and in the `master` branch
- Run `$ git checkout -b gh-pages`

#### Deploy the `gh-pages` Branch

All that's left to get the app deployed is to push the `gh-pages` branch to the `origin` remote:<br>`$ git push origin gh-pages`

## Browsing to the WebSite

Your website should now be up and running at the following URL:<br>`https://<user-name>.github.io/<repo-name>/`

Be sure to substitute **your GitHub user-name** for `<user-name>` and **your project's repo name** for `<repo-name>`.

>Note: It might take up to 15 minutes for the app to be available.

## Updating your Application's Deployment

Now that your repo has two branches, be sure to **continue development on the `master` branch**.

`$ git checkout master` switches to the `master` branch.

When you have commits on `master` that you want to deploy, it's time to **merge** those commits into the `gh-pages` branch:

- Checkout the `gh-pages` branch: `$ git checkout gh-pages`
- Merge the commits from `master`: `$ git merge master`
- Deploy the changes: `$ git push origin gh-pages`

Now your deployed application is up to date!

Be sure to switch back to the `master` branch - happy coding!

