'use strict';

let should = require('should');
const request = require('supertest');
const app = require('../app.js');
const mongoose = require('mongoose');
const Book = mongoose.model('Book');
const agent = request.agent(app);

describe('Book CRUD Test', function() {
    it('Should allow a book to be posted and return a read and _id property', function(done) {
        let bookBody = {
            title: 'Test Book',
            author: 'Me',
            genre: 'Mocha'
        };
        agent.post('/api/books')
            .send(bookBody)
            .expect(201)
            .end(function(err, results) {
                if (err) {
                    console.log(err);
                }
                else {
                    results.body.read.should.equal(false);
                    results.body.should.have.property('_id');
                    done();
                }
            });
    });

    afterEach(function(done) {
        Book.remove().exec();
        done();
    });
});
