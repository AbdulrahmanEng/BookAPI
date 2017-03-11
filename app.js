'use strict';

// Dependancies
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Express instance
const app = express();

// Host
const host = process.env.IP || '127.0.0.1';

// Port
const port = process.env.PORT || 3000;

// Sets Mongoose connection
const mongoDB = `mongodb://${host}/bookAPI`;
mongoose.connect(mongoDB);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Book model imported
const Book = require('./models/bookModel');

// Middleware
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// Injects Book model into Router
// @param {Model} Book - Moongoose model
let bookRouter = require('./routes/bookRoutes')(Book);

// Assigns bookRouter to /api endpoint
app.use('/api', bookRouter);

// Handles GET requests to index
app.get('/', (req, res) => res.end('Home of the BookAPI'));

// Opens the port
app.listen(port, () => console.log(`Listening on ${port}`));
