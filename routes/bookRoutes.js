'use strict';

// Imports Express
const express = require('express');
// @param {Model} Book - Moongoose model
let routes = function(Book) {

  // Router
  const bookRouter = express.Router(Book);

  // Controller
  const bookController = require('../controllers/bookController')(Book);

  // Gets all books and filters by query string.
  bookRouter.route('/')
    .get(bookController.get)
    .post(bookController.post);

  // bookRouter middleware for book id
  bookRouter.use('/:bookID', (req, res, next) => {
    // @param {object} book - Book document from bookAPI's books collection
    Book.findById(req.params.bookID, function(err, book) {
      // Returns either an error or a book in JSON.
      if (err) {
        res.status(500).send(err);
      }
      else if (book) {
        req.book = book;
        next();
      }
      else {
        res.status(404).json({
          error: 'Book does not exist.'
        });
      }
    });
  });

  // Gets book by id
  bookRouter.route('/:bookID')
    .get((req, res) => {
      let returnBook = req.book.toJSON();
      returnBook.links = {};
      let newLink = `http://${req.headers.host}/api/books/?genre=${returnBook.genre}`;
      returnBook.links.filterByGenre = newLink.replace(' ', '%20');
      res.json(returnBook);
    })
    .put((req, res) => {
      // Property assignment for edited book
      req.book.title = req.body.title;
      req.book.author = req.body.author;
      req.book.genre = req.body.genre;
      req.book.read = req.body.read;
      // Book is saved to 'books' collection in 'bookAPI' database
      req.book.save((err) => {
        if (err) {
          res.status(500).send(err);
        }
        else {
          res.json(req.book);
        }
      });
      res.json(req.book);
    })
    .patch((req, res) => {
      // Deletes id in request body if it exists
      if (req.body._id) {
        delete req.body._id;
      }
      // Assigns everything property in the request body to the request book
      for (let p in req.body) {
        req.book[p] = req.body[p];
      }
      // Book is saved to 'books' collection in 'bookAPI' database
      req.book.save((err) => {
        if (err) {
          res.status(500).send(err);
        }
        else {
          res.json(req.book);
        }
      });
    })
    .delete((req, res) => {
      req.book.remove((err) => {
        if (err) {
          res.status(500).send(err);
        }
        else {
          res.status(204).end();
        }
      });
    });
  return bookRouter;
};

module.exports = routes;
