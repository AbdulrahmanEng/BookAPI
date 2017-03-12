'use strict';

// Imports should and sinon packages.
const should = require('should');
const sinon = require('sinon');

describe('Book Controller Tests:', () => {
	describe('Post', () => {
		it('should not allow empty title for POST', function () {

			// Mock Book model.
			const Book = function (book) {
				this.save = function () {};
			};

			// Mock request object.
			const request = {
				body: {
					genre:'Health'
				}
			};

			// spy() records return value.
			const response = {
				status: sinon.spy(),
				send: sinon.spy()
			};
			
			// Imports bookController.
			const bookController = require('../controllers/bookController')(Book);

			// Makes a POST request to /api/books/.
			bookController.post(request, response);

			// Tests to see if 400 status is returned for request
			response.status.calledWith(400).should.equal(true, `Bad status ${response.status.args[0][0]}`);
			// Tests to see if the /api/books responds with 'Title is required'.
			response.send.calledWith('Title is required').should.equal(true);
		});
	});
});
