const  {assert} = require('chai');
const mongoose = require('mongoose');
const request = require('./request');

describe.only('Actor API', () => {

    const actor = {
        name: 'Mel Gibson'
    };

    beforeEach( () => mongoose.connection.dropDatabase());

    it('should save with id', () => {
        return request.post('/api/actors')
            .send(actor)
            .then( ({body}) => assert.equal(body.name, actor.name) );
    });

    it('should post and get actor', () => {
        let saved = null;
        return request.post('/api/actors')
            .send(actor)
            .then( ({body}) => {
                saved = body;
                return request.get(`/api/actors/${saved._id}`);
            })
            .then( ({body}) => {
                assert.equal(saved.name, body.name);
            });
    });


});