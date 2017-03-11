'use strict';

// Imports Express
const express = require('express');
// @param {Model} Book - Moongoose model
let routes = function(Book) {

  // Router
  const bookRouter = express.Router(Book);
  // Gets all books and filters by query string.
  bookRouter.route('/books')
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
      book.save();
      res.status(201).send(book);
    });

  // Gets book by id
  bookRouter.route('/books/:bookID')
    .get((req, res) => {
      // Performs a search of the bookAPI db
      Book.findById(req.params.bookID, function(err, book) {
        // Returns either an error or a book in JSON.
        if (err) {
          res.status(500).send(err);
        }
        else {
          res.json(book);
        }
      });
    })
    .put((req, res) => {
      Book.findById(req.params.bookID, (err, book) => {
        if (err) {
          res.status(500).send(err);
        }
        else {
          book.title = req.body.title;
          book.author = req.body.author;
          book.genre = req.body.genre;
          book.read = req.body.read;
          book.save();
          res.json(book);
        }
      });
    });
  return bookRouter;
};

module.exports = routes;
