/* 
!1. Introduction to Express.js

?Express.js is a fast, unopinionated, and minimalist web framework for Node.js. It simplifies the server-side development process by providing a suite of tools and features that handle common web application tasks.

!2. Core Features of Express.js

?Middleware:-

*Middleware functions are a fundamental part of Express.js, enabling the modularization of request handling.

*Definition: Middleware functions have access to the request object (req), response object (res), and the next middleware function in the application’s request-response cycle.

?Types of Middleware:-

*1} Application-level Middleware: Bound to an instance of express.
*2} Router-level Middleware: Bound to an instance of express.Router().
*3} Error-handling Middleware: Takes four arguments, specifically for handling errors.
*4} Built-in Middleware: Provided by Express, such as express.static.
*5} Third-party Middleware: Installed via npm, like body-parser.
Example:
 */
{
const express = require('express');
const app = express();

// Built-in middleware for serving static files
app.use(express.static('public'));

// Application-level middleware
app.use((req, res, next) => {
  console.log('Time:', Date.now());
  next();
});

// Error-handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

}


/* 
!Routing
?Routing is used to determine how an application responds to a client request to a particular endpoint.

*1}Basic Routing: Handling routes with HTTP methods.
*2}Route Paths: Can be strings, string patterns, or regular expressions.
*3}Route Parameters: Define parameters in the route path to capture values.
*4}Query Strings: Accessed via req.query.
Example:
*/


// Basic routing
app.get('/', (req, res) => {
  res.send('Home Page');
});

app.post('/submit', (req, res) => {
  res.send('Form Submitted');
});

// Route parameters
app.get('/users/:userId', (req, res) => {
  res.send(`User ID: ${req.params.userId}`);
});

// Query strings
app.get('/search', (req, res) => {
  res.send(`Search Query: ${req.query.q}`);
});


/* 
!Templates
?Templates allow dynamic generation of HTML content.

*Common Template Engines: Pug, EJS, Handlebars.
*Usage: Setting up the view engine and rendering templates with data.

Example using Pug:
*/


app.set('view engine', 'pug');

app.get('/hello', (req, res) => {
  res.render('hello', { title: 'Hey', message: 'Hello there!' });
});



//? Example using EJS:
{
const express = require('express');
const app = express();
app.set('view engine', 'ejs');

app.get('/hello', (req, res) => {
  res.render('hello', { title: 'Hey', message: 'Hello there!' });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

}


//! Static Files
//? Serving static files like images, CSS, and JavaScript files.

//*Example:

app.use(express.static('public'));



// Access files via http://localhost:3000/filename
//! Error Handling
//? Handling errors in Express.js with error-handling middleware.

// Example:

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});




// 3. Installation
// To install Express.js, you need Node.js and npm installed.

// npm install express


//! 4. Basic Example
//? A simple Express.js application.

// Example:

{
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

}

//! 5. Advanced Features
//? RESTful APIs
//* Creating RESTful APIs with Express.js, handling CRUD operations.

// Example:

{
const express = require('express');
const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

let users = [];

app.get('/api/users', (req, res) => {
  res.json(users);
});

app.post('/api/users', (req, res) => {
  const user = req.body;
  users.push(user);
  res.status(201).json(user);
});

app.put('/api/users/:userId', (req, res) => {
  const userId = req.params.userId;
  const updatedUser = req.body;
  users = users.map(user => user.id === userId ? updatedUser : user);
  res.json(updatedUser);
});

app.delete('/api/users/:userId', (req, res) => {
  const userId = req.params.userId;
  users = users.filter(user => user.id !== userId);
  res.status(204).send();
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

}



//! Middleware Libraries
//? Using third-party middleware for additional functionality.

//* body-parser: Parse incoming request bodies.
//* cors: Enable Cross-Origin Resource Sharing.
//* morgan: HTTP request logger middleware.

// Example:


{
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined'));
}


//! Scalability
//? Scaling your Express.js applications.

//* Horizontal Scaling: Use load balancers like Nginx.
//* Caching: Use Redis for caching frequently accessed data.
//* Database Connections: Use connection pooling with databases like MongoDB, MySQL.

// Example of using Redis:

{
const redis = require('redis');
const client = redis.createClient();

app.get('/data', (req, res) => {
  client.get('key', (err, data) => {
    if (data) {
      res.send(data);
    } else {
      // Fetch data from database, cache it, and send the response
      const data = fetchDataFromDatabase();
      client.setex('key', 3600, data);
      res.send(data);
    }
  });
});

}

//! Security
//? Implementing security best practices.

//* HTTPS: Use HTTPS in production.
//* Helmet: Secure your Express apps by setting various HTTP headers.
//* Input Validation: Validate incoming data to prevent vulnerabilities.
//* Authentication: Use passport for authentication.

// Example:


{
const helmet = require('helmet');
const Joi = require('joi');
const passport = require('passport');

app.use(helmet());
app.use(passport.initialize());

const schema = Joi.object({
  name: Joi.string().min(3).required(),
});

app.post('/api/users', (req, res) => {
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  // Proceed with creating the user
});
}
/* 
!6. Conclusion
*Express.js is a powerful and flexible framework for building web applications and APIs with Node.js. It simplifies the development process with its middleware-based architecture, robust routing capabilities, and support for various template engines and static file serving. Its flexibility makes it suitable for both small projects and large-scale applications. Whether you're building a simple website or a complex RESTful API, Express.js provides the tools and flexibility you need to build scalable and maintainable applications efficiently. 
*/