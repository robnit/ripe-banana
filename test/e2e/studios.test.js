const { assert } = require('chai');
const mongoose = require('mongoose');
const request = require('./request');

describe('Studios API', () => {

    const studio = {
        name: 'Universal',
        address: {
            city: 'LA',
            state: 'Calignfg'
        }
    };

    const anotherStudio = {
        name: 'Pixar',
        address: {
            city: 'somewhere else',
            state: 'Calignfg'
        }
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
                saved = body;
                return request.get(`/api/studios/${saved._id}`);
            })
            .then ( ({ body }) =>{
                assert.equal(saved.name, body.name);
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
            .send([studio, anotherStudio])
            .then( () => request.get('/api/studios'))
            .then( ({ body }) => {
                assert.ok(body.find( s => s.name === studio.name ));
                assert.ok(body.find( s => s.name === anotherStudio.name ));
            });
    });

    it.only('should update existing studio', () => {
        const update = {name: 'updated'};
        return request.post('/api/studios')
            .send(studio)
            .then(res => {
                return request.put(`/api/studios/${res.body._id}`)
                    .send(update);
            })
            .then (got => {
                assert.equal('updated', got.body.name);
            });

    });
});