<img src="https://i.imgur.com/ZFR59xq.png">

# Tips to Getting Started on Your Project 4

### Recommended Steps:

1. Do a quick review of the [Thinking in React](https://reactjs.org/docs/thinking-in-react.html) section of the docs.

1. `create-react-app <your app name here>`

1. Set up a repo in your GitHub account and follow the instructions that create an `origin` remote in your local repository.  Do an initial commit and push to GitHub.

1. Go full-stack by following all the steps in the Full-stack React lesson (creating a `server.js`, etc.).  Time for another commit.

	> Note that you will need to run `npm run build` one time before the server will start up.

1. Create a database for your project on MongoDB Atlas and get your app connected to it by installing `mongoose` & `dotenv` and writing your `database.js` module.  Yup, another commit.

1. Create a `.env` file to hold the `DATABASE_URL` with a MongoDB connection string to be used in `database.js`.  You can start by connecting to MongoDB locally but should move to an Atlas hosted DB as early as possible.

	A local connection string would look something like:
	```
	DATABASE_URL=mongodb://localhost/db_name
	```
	You can type `mongo` in Terminal to test that the MongoDB engine is running (most of you set it up to run automatically during Installfest).  If it's not, you can start it in a separate Terminal session with `mongod`.
	
	An Atlas hosted connection string would look something like:
	```
	DATABASE_URL=mongodb+srv://username:password@seidb-w0kys.azure.mongodb.net/test?retryWrites=true
	```
	Please follow the instructions, including the whitelisting of **all** IP addresses, in the **Create an Atlas Hosted MongoDB** guide that's in `w05/d4` of the class repo.

1. Install `react-router-dom` and get client-side routing set up - more than likely in the `<App>` component.  Test by creating a basic `<Nav>` component for your app. Render a couple of `<Link>` components in your `<Nav>` that switch between two separate "page" components. Remember to organize your "page" components in a folder, i.e. `pages`, separate from your non-page components' folder (`components`). Time for another commit. BTW, look into the `<NavLink>` component that makes it easy to style the "active" link (link for the current route).

1. Code your `User` model. You can always keep it basic at first and add additional properties after authentication is working.  Commit.

1. Add token-based authentication with sign up, log in & log out functionality. For help, refer to the Token-based Authentication with JWTs lesson.  Big-time commit.

1. Code your first user story which is usually something like `As a visitor, I want... when I browse to the app`.  Make commits each milestone along the way.

1. Code your second user story which is usually something like `As a user, I want... when I log in`.  Again, don't forget to make commits...

1. Keep the fun rolling by coding the rest of your prioritized user stories being sure to make commits along the way...
