const { assert } = require('chai');
const mongoose = require('mongoose');
const request = require('./request');

describe('Reviewers API', () => {


    const reviewerOne = {
        name: 'John Doe',
        company: 'Enron'
    };

    const reviewerTwo = {
        name: 'Jane Doe',
        company: 'Halliburton'
    };

    beforeEach(() => {
        mongoose.connection.dropDatabase();
    });


    it('should save with id', () => {
        return request.post('/api/reviewers')
            .send(reviewerOne)
            .then( ({ body }) => {
                assert.equal(body.name, reviewerOne.name);
            });
    });

    it.only('should return array of all reviewers, including name and company', () => {
        return Promise.all([
            request.post('/api/reviewers').send(reviewerOne),
            request.post('/api/reviewers').send(reviewerTwo)
        ])
            .then( () => request.get('/api/reviewers'))
            .then( ({body}) => {
                assert.equal( body.length, 2);
                assert.equal( body[0].name, 'John Doe');
            });
    });


});