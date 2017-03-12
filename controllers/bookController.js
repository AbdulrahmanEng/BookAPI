'use strict';

const bookController = (Book) => {
    // GET handler
    let get = (req, res) => {
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
    };
    // POST handler
    let post = (req, res) => {
      let book = new Book(req.body);

      if(!req.body.title){
	res.status(400);
	res.send('Title is required');
} else {
      // Book is saved to database
      book.save();
      res.status(201);
      res.send(book);
}
    };
    // Returns functions to bookRouter route
    return {
        post: post,
        get: get
    };
};
module.exports = bookController;
