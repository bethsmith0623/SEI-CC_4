
[Click to view as a presentation](https://presentations.generalassemb.ly/7c98780eea08dedce2a35bf14e70f257#/1)

---
<img src="https://i.imgur.com/PE14J3Y.jpg">

# Intro to Full-Stack Development & HTTP

---
## Learning Objectives
<br>

**Students Will Be Able To:**

- Explain Full-Stack Web Development
- Describe Client/Server Architecture
- Explain the Anatomy of HTTP Requests and Responses
- Identify the Two Key Components of an HTTP Request
- Explain How HTTP Requests Can be Initiated From a Browser
- Explain How HTTP Requests Result in Code Running on a Server
- Describe a Process for Building a Full-stack App

---
## Roadmap
<br>

- Why Learn Full-Stack Web Development?
- What is a Full-Stack Developer?
- SEI Web Technology Stacks
- Client/Server Architecture
- What is HTTP?
- Let's Make an HTTP Request
- Anatomy of an HTTP Request Message
- Anatomy of an HTTP Response Message
- The Two Key Components of an HTTP Request
- HTTP Methods
- Ways to Send HTTP Requests From the Browser
- How HTTP Requests Run Code on the Server
- Essential Questions

---
## Full-Stack Web Development

---
#### Why Learn Full-Stack Web Development?
<br>

- According to [this report by U.S. News](https://www.usnews.com/info/blogs/press-room/articles/2018-01-10/us-news-announces-the-2018-best-jobs) the best job to have is that of a **Software Developer**!

- Further, according to [this StackOverflow Developer Survey](https://insights.stackoverflow.com/survey/2017#developer-roles), **the role of Web Developer is by far the most popular** as compared to other developer roles.

- The bottom-line is: **Web Developers are in demand**!

---
#### What is a Full-Stack Developer?
<br>

<p>A full-stack developer:</p>

- Is a developer who is comfortable working with both front-end & back-end technologies.

- Can create full-stack applications by writing code that runs in both a client, such as a browser, and a web server.

- Will often specialize in front-end **or** back-end technologies.

- Is a graduate of SEI!

---
#### Web Technology Stack<br>Unit 2

- In this unit, we'll learn 3 of the 4 technologies that comprise the MERN Stack:

	<img src="https://i.imgur.com/FKGehuM.jpg" style="display: inline-block;margin:auto;height:400px">


---
#### Web Technology Stack<br>Unit 3

- In Unit 3, we'll learn:

	<img src="https://i.imgur.com/GuogOfX.png" style="display: inline;height:400px">
	<img src="https://i.imgur.com/MjX4aD7.png" style="display: inline;height:400px">
	
	
---
#### Web Technology Stack<br>Unit 4

- In Unit 4, we go full MERN stack:

	<img src="https://i.imgur.com/jlKEj7F.png" style="display:inline-block;margin:auto;height:400px">

---
## Client/Server Architecture

---
#### Client/Server Architecture
<br>

<img src="https://i.imgur.com/clxiqnO.png" style="width:80%">

---
#### Client/Server Architecture
<br>

- The terms **client** and **server** can refer to both a **physical device** (computer, tablet, phone, etc.) but can also refer to a **software process**. For example:
	- Database software such as PostgreSQL and web servers like Apache are examples of software processes behaving as servers.
	- Browser software such as Chrome or Firefox are examples of software clients.

- Physical **servers** connected to the Internet are also referred to as **hosts**.

---
#### Client/Server Architecture
<br>

- Web developers usually think of a "web browser" when they hear "client".

- Note that during development, your computer will plays the role of BOTH client and web server.

- The PostgreSQL & MongoDB database servers will also be running on your computer, however, we will move to a cloud-based MongoDB server as soon as it's practical.

---
## HTTP

---
#### What is HTTP?
<br>

- **Hypertext Transfer Protocol (HTTP)** is an application-level network protocol that powers the communications across the [World Wide Web](https://en.wikipedia.org/wiki/World_Wide_Web), more commonly referred to as just **the Web**.

- **HTTP is fundamental to web development** - regardless of which back-end or front-end web technology/framework is used.

- When a user interacts with an amazing **web application** we developed, it's **HTTP** that informs the **web application** what the **browser** wants and it's **HTTP** that delivers the goods from the server back to the browser.

---
#### What is HTTP?

- The process of a client sending a HTTP request, and server responding is known as the **HTTP Request/Response Cycle**:

	<img src="https://i.imgur.com/Iqsj9gF.png" style="width:80%">

---
#### What is HTTP?

- When we browse to a website by typing in the address bar, this is what happens:

	<img src="https://i.imgur.com/JDFHoZl.png" style="width:80%">

---
#### What is HTTP?
<br>

- When the response is received by the client, that request/response cycle has ended and there will be no further HTTP communications unless another request is sent by the client.

- HTTP itself does not maintain any information regarding previous requests between client and server - this makes HTTP a _stateless_ protocol. However, it is possible to remember "state" using cookies or by sending data in the request's body (data payload).

---
#### Let's Make an HTTP Request
<br>

- Let's open a new tab in Chrome, open DevTools, and click on the _Network_ tab where we can inspect HTTP requests and responses.

- Now let's browse to General Assembly's site by typing **generalassemb.ly** in the address bar...

---
#### Let's Make an HTTP Request

- Wow! Each one of those lines represents a separate HTTP request made to a server!  Find the line in the left-side pane with **generalassemb.ly** and click on it:

	<img src="https://i.imgur.com/fuED3VM.png" style="width:80%">

---
#### Let's Make an HTTP Request

- In the pane on the right you will find all of the information about a particular HTTP request. Select the _Headers_ tab and explore!:

	<img src="https://i.imgur.com/44W3zEE.png" style="width:80%">

---
#### Anatomy of an HTTP Request Message

- Use the following diagram to review the **Request Headers** sent to the server when browsing to  _generalassemb.ly_: 

	<img src="https://i.imgur.com/fCfinjb.png">

---
#### Anatomy of an HTTP Request Message
<br>

- The **GET** request we just sent does not contain a _message body_ nor a _Content-Length_ header because...

- The **Request Body** is optional and present only when the client is sending data to the server.

- An example of when the **body** might contain data is when the contents of an HTML form are being submitted by the user.

---
#### Anatomy of an HTTP Response Message

- Now use the following diagram to review the **Response Headers** returned by the _generalassemb.ly_ server: 

	<img src="https://i.imgur.com/iUrnY0f.png">
	
	You can view the **response body** by clicking the **Response** tab.

---
#### Anatomy of an HTTP Response Message
<br>

- The [status code](https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html) in the first line informs us on how the request/response went. It is always a three-digit number that falls within the following ranges/categories:
	- 1xx Informational
	- 2xx Success
	- 3xx Redirection
	- 4xx Client Error
	- 5xx Server Error

- Most HTTP responses will have a _status code_ of `200`, which means _OK_. You also might be familiar with the _status code_ of `404` - _Not Found_.

---
#### Anatomy of an HTTP Response Message

- The **Response Body** is what holds the content of the requested resource.

- The **Content-Type** header is a [MIME type](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types) and helps the browser determine what to do with the data being sent in the **body** of the HTTP response. For example:
	- **text/html**: The browser will parse the **body** as HTML and, depending on how the HTTP request was initiated, usually **replace** the browser window's content with the newly received HTML.
	- **image/png**

- Although the HTTP protocol is text-based, the content in the body can be binary, for example, images are typically transferred in binary format.

---
#### The Two Key Components of an HTTP Request 
<br>

- We saw earlier that every HTTP request message begins with a request-line like this:

	```
	GET /sample_page.html HTTP/1.1
	```

- **The two key components of any HTTP request are**:
	- The **HTTP method** (`GET` in the example above), and
	- The _request target_, which is usually a **URL** (the above example is more accurately a **URI**)

---
#### HTTP Methods
<br>

- [HTTP methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods), are used to indicate the desired **action** to be performed for a given resource (specified by the URL) on the server.

- The fact that they indicate **action** is why they are also at times called **HTTP Verbs**.

---
#### HTTP Methods

- We'll be using the following HTTP Methods when we start defining our application's routes: 

	| HTTP Method (Verb) | Desired Action on Server |
	|:-:|:-:|
	| GET | The GET method requests a representation of the specified resource (URL). Requests using GET should only retrieve data. |
	| POST | The POST method is used to create a resource on the server. |
	| PUT | The PUT method replaces a resource with the request payload<br>(data in the body). |
	| DELETE | The DELETE method deletes the specified resource. |

---
#### URL
<br>

- **URL** stands for **Uniform Resource Locator**.

- It informs the server of what resource the client wants to GET. create (POST), DELETE, etc.

---
#### URL
<br>

- Here's the complete anatomy of a URL:

	<img src="https://i.imgur.com/w1igQx0.png" style="display:inline-clock;width:80%">

- Developers often refer to just the **path** (incorrectly) as a URL.

---
#### Ways to Send HTTP Requests From the Browser
<br>

- These are ways that a browser can send an HTTP Request:

	| Action | HTTP Method(s) Possible |
	|---|---|
	| Using the _address bar_ | GET |
	| User submits an HTML form | POST, GET (used for searches) |
	| User clicks a link | GET |
	| Using JavaScript | All Methods can be sent using [AJAX](https://developer.mozilla.org/en-US/docs/Web/Guide/AJAX)|

---
#### Ways to Send HTTP Requests<br>Without Using the Browser
<br>

- There are plenty of developer tools that enable us to issue HTTP requests to servers without using a browser.

- One tool we use later in the course is [Postman](https://www.getpostman.com/).

- If you prefer to use a command-line tool, our computers already have a tool called [cURL](https://en.wikipedia.org/wiki/CURL).

---
#### How HTTP Requests Run Code on the Server
<br>

- As full-stack web developers, we'll create front-ends that display in the browser.

- As a user interacts with the app, they will cause HTTP requests to be sent to our back-end web application.

- In our web app on the back-end, we will create **routes** that listen for these requests from the front-end, and...

- Those **routes** will map HTTP requests to our back-end **code**!

---
#### How HTTP Requests Run Code on the Server
<br>

- As an example, you want your app to add a new user to your database when they sign up...

- Using RESTful routing principles, you would code the sign up form to issue a `POST /users` HTTP request.
 
- On the back-end you would have created a **route** that matches the:
	- **HTTP Method** (`POST`, in this case), and the
	- **Path** (`/users`)

- When creating that route, you would have specified what **code** should run when route is matched!

---
#### ❓ Essential Questions

Take a minute to discuss these with your pair:

1. What is the network protocol of the web?

2. What is the **body** of an HTTP request used for?

3. Name three HTTP methods.

4. Explain how an HTTP request makes code run on the server.

