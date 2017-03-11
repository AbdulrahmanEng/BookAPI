'use strict';

// Imports Express
const express = require('express');
// @param {Model} Book - Moongoose model
let routes = function(Book) {

  // Router
  const bookRouter = express.Router(Book);
  // Gets all books and filters by query string.
  bookRouter.route('/')
    .get((req, res) => {
      let query = {};
      if (req.query.title) {
        query.title = req.query.title;
      }
      else if (req.query.genre) {
        query.genre = req.query.genre;
      }
      else if (req.query.author) {
        query.author = req.query.author;
      }
      // Performs a search of the bookAPI db
      Book.find(query, function(err, books) {
        // Returns either an error or the books in JSON.
        if (err) {
          res.status(500).send(err);
        }
        else {
          res.json(books);
        }
      });
    })
    .post((req, res) => {
      let book = new Book(req.body);
      // Book is saved to database
      book.save();
      res.status(201).send(book);
    });

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
        res.status(404).send('Book does not exist.');
      }
    });
  });

  // Gets book by id
  bookRouter.route('/:bookID')
    .get((req, res) => {
      res.json(req.book);
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
    });
  return bookRouter;
};

module.exports = routes;
