// server.js

// Middleware, Routing, Serving static content, callbacks, params and queries
// __dirname

const express = require('express');
const fs = require('fs');

// Initialize server
const app = express();

// Middleware function with no path. Executed for every request sent to the server
const logAllActivities = (req, res, next) => {
  console.log('LOG: ' + req.method +
  ' ' + req.originalUrl);
  next();
}
app.use(logAllActivities);

// Using multiple callbacks
app.get('/',
  (req, res, next) => {
    // res.send('Welcome to the homepage!');
    console.log('First callback');
    next();
  },
  (req, res, next) => {
    console.log('Second callback');
    next()
  },
  (req, res, next) => {
    console.log('Third callback');
    res.send('Welcome to the homepage');
  }
);

// Can use other HTTP methods, or a special .all()
//  For lecture demo just use .get() since that's all the browser can test

app.get('/', (req, res) => {
  //res.status(400).send('Welcome to the homepage!');
  res.send('Welcome to the homepage!');
});

// Send back formatted data
app.get('/html', (req, res) => {
  res.send('<h3>Welcome to /html page</h3>')
});

// Serve an HTML file from fs
app.get('/serve-file', (req, res) => {
  fs.readFile('homepage.html', 'utf8', (err, data) => {
    if (!err) {
      res.send(data)
    }
  });
});

// .params
app.get('/subject/:id', (req, res) => {
  res.send('Getting subject with ID ' + req.params.id);
});

// .query
app.get('/subject', (req, res) => {
  res.send('Getting subject with ID ' + req.query.id);
});


// Use router
// const subjectRouter = require('./subject-router');
// app.use('/subjects', subjectRouter);


// use a virtual path prefix
app.use('/static', express.static(__dirname + '/images'));

// use no virtual path prefix. serve directly from root
app.use(express.static(__dirname + '/images'));



// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send('Something broke!');
// });


app.listen(3000, () => {
  console.log('Server started...');
});
