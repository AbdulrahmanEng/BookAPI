'use strict';

// Dependancies.
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Express instance.
const app = express();

// Host.
const host = process.env.IP || '127.0.0.1';

// Port.
const port = process.env.PORT || 3000;

// Sets Mongoose connection. 
const mongoDB = `mongodb://${host}/bookAPI`;
mongoose.connect(mongoDB);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


// Book model imported.
const Book = require('./models/bookModel');

// Middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Router.
const bookRouter = express.Router();
// Gets all books and filters by query string.
bookRouter.route('/books')
.get((req, res) => {
    const query = {};
	if(req.query.title){
	    query.genre = req.query.genre;
	} else if (req.query.genre) {
	    query.genre = req.query.genre;
	} else if (req.query.author){
	    query.author = req.query.author;
	}
    // Performs a search of the bookAPI db
    Book.find(query, function(err, books) {
        // Returns either an error or the books in JSON.
        if(err){
            res.status(500).send(err);
        } else {
            res.json(books);
        }
    });
})
.post((req,res) => {
    let book = new Book(req.body);
    book.save();
    res.status(201).send(book);
});

// Gets book by id.
bookRouter.route('/books/:bookID')
.get((req, res) => {
    // Performs a search of the bookAPI db
    Book.findById(req.params.bookID, function(err, book) {
        // Returns either an error or a book in JSON.
        if(err){
            res.status(500).send(err);
        } else {
            res.json(book);
        }
    });
});

// Assigns bookRouter to /api endpoint.
app.use('/api', bookRouter);

app.get('/',(req, res)=> res.end('Home of the BookAPI'));

app.listen(port, () => console.log(`Listening on ${port}`));
