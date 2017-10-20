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
        return request.post('/api/studios')
            .send(studio)
            .then( ({ body }) => {
                assert.equal(body.name, studio.name);
            });
    });

    it('Should post and then get studio', () => {
        let saved = null;
        return request.post('/api/studios')
            .send(studio)
            .then( ({body}) => {
                console.log(' we are in test and body is:',body);
                saved = body;
                return request.get(`/api/studios/${saved._id}`);
            })
            .then ( ({ body }) =>{
                console.log('saved is:', saved);
                console.log('body is:', body);
                assert.deepEqual(saved, body);
            });
    });


});