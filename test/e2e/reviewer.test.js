const { assert } = require('chai');
const mongoose = require('mongoose');
const request = require('./request');

describe.only('Reviewers API', () => {


    const reviewerOne = {
        name: 'John Doe',
        company: 'Enron'
    };

    // const reviewerTwo = {
    //     name: 'Jane Doe',
    //     company: 'Halliburton'
    // };

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


});