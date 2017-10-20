const { assert } = require('chai');
const mongoose = require('mongoose');
const request = require('./request');

describe('Studios API', () => {

    const studio = {
        name: 'Universal'
    };

    const anotherStudio = {
        name: 'Pixar'
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

    it('should post and then get studio', () => {
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

    it('should return error 400 when getting by invalid id', () => {
        return request.get('/api/studios/lksdjfklsdskjd')
            .then( 
                () => { throw new Error('unexpected success'); },
                got => {
                    assert.equal(got.status, 400);
                });
    });

    it('should get array of all studios', () => {
        return request.post('/api/studios')
            .send()
    });


});