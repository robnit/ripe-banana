const { assert } = require('chai');
const mongoose = require('mongoose');
const request = require('./request');

describe('Studios API', () => {

    const studio = {
        name: 'Universal'
    };

    beforeEach(() => {
        mongoose.connection.dropDatabase();
    });

    it('should save with id', () => {
        request.post('/api/studios')
            .send(studio)
            .then( ({ body }) => {
                assert.equal(body.name, studio.name);
            });
    });


});