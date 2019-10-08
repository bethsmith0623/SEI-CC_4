<img src="https://i.imgur.com/B42NavR.jpg">

# Create an Atlas Hosted MongoDB

## Intro

While developing an application that requires a MongoDB, you can only connect to your local MongoDB engine for so long.  This is because the application, once deployed, will have to connect to a MongoDB engine accessible via the Internet.

Heroku, the application hosting service we deploy our projects to, is capable of supplying a MongoDB.  However, delaying connecting to a hosted database until the time of deployment is not ideal...

It makes sense to set up and connect to a hosted MongoDB sooner, rather than later.  Doing this will ensure that any data, users, etc., created will be there upon deployment.

In addition, it's advantageous to use a service to host MongoDB databases other than Heroku so that you can create databases anytime you want.

The most popular service for hosting MongoDB databases, not surprisingly, is MongoDB's own [Atlas](https://www.mongodb.com/cloud/atlas).

## Create an Atlas Account

First you will need to signup for a free account [here](https://cloud.mongodb.com/user?_ga=2.87815960.1293087282.1558635812-709388783.1558635812#/atlas/register/accountProfile):

<img src="https://i.imgur.com/hRt0WjG.png">

## Create a New Cluster

Once logged in, Atlas will request that you create a _cluster_.

Atlas allows one free cluster per account.

A cluster can contain multiple MongoDB databases - which Atlas refers to as **namespaces**.

Be sure to select the **Cloud Provider & Region** nearest to you that shows a **FREE TIER AVAILABLE**:

<img src="https://i.imgur.com/CfAIM5P.png">

Next, in the **Cluster Tier** section, select the `M0 Sandbox` tier:

<img src="https://i.imgur.com/ihwXdHv.png">

Finally, you can optionally change the name of the cluster, then click the `Create Cluster` button:

<img src="https://i.imgur.com/qmHr9o2.png">

It may take several minutes for Atlas to build your cluster.

## Add a User for the Cluster

Each cluster must have a user created whose credentials will be provided in the database connection string when connecting to a database.

First click the **Security** tab:

<img src="https://i.imgur.com/B5b75do.png">

Click the `+ ADD NEW USER` button, then enter a username, password, select the **Read and write to any database** option, then click the `Add User` button:

<img src="https://i.imgur.com/CU8R4d2.png">

## Update the Whitelisted IPs

Atlas has a security feature that allows the databases to be accessed by _whitelisted_ (approved) IP addresses only.

However, you must whitelist **all IPs** to ease development and deployment of your application.

While still in the Security tab, click **IP Whitelist**, then click the `+ ADD IP ADDRESS` button.

In the dialog, first click `ALLOW ACCESS FROM ANYWHERE` then click the `Confirm` button:

<img src="https://i.imgur.com/iO7dMbz.png">

## Obtain the Connection String

To obtain the connection string for your `.env` file, first click the `CONNECT` button:

<img src="https://i.imgur.com/hwN2Os2.png">

Select the **Connect Your Application** option:

<img src="https://i.imgur.com/qMOAxVV.png">

Next, ensure that the **Node.js** driver and latest version is selected.  Then click the `Copy` button to add the connection string to your clipboard:

<img src="https://i.imgur.com/lt1NyzH.png">

## Use the Connection String in Your App

You can now paste the connection string in the app's `.env` file, assigning it to a `DATABASE_URL` environment variable:

```
DATABASE_URL=mongodb+srv://sei:<password>@sei-w0kys.azure.mongodb.net/test?retryWrites=true
```

You're almost done, but you need to update the connection string as follows:

1. Replace `<password>` with the password of the database user you created earlier.
2. **IMPORTANT** The connection string by default connects to a namespace (database) named `admin` (`...mongodb.net/admin?retryWrites=true...`).  However, the `admin` namespace **must** be updated to your preferred namespace (database) name.  For example, "movies" (`...mongodb.net/movies?retryWrites=true...`).

You're good to go!

## Connecting with Mongoose

Here's the latest options to include to get rid of the deprecation warnings:

```js
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});
```

## Viewing & Editing Data

FYI, you can use the Atlas app to view and edit data by clicking on the `COLLECTIONS` button.

  



