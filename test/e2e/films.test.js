const  {assert} = require('chai');
const mongoose = require('mongoose');
const request = require('./request');

describe.only('Film API', () => {

    beforeEach( () => mongoose.connection.dropDatabase());

    function saveStudio(studio){
        return request.post('/api/studios')
            .send(studio);
    }
    let studio = null;

    function saveActor(actor) {
        return request.post('/api/actors')
            .send(actor);
    }

    let actor = null;

    beforeEach( () => {
        return saveActor ( { name: 'Mel Gibson'})
            .then( ({body}) => actor = body);
    });

    beforeEach( () => {
        return saveStudio( { name: 'Universal'})
            .then( ({body}) => studio = body);
    });

    let film = null;
    

    beforeEach( () => {
        return request.post('/api/films')
            .send({
                title: 'The Room',
                studio: studio._id,
                released: 2000,
                cast: {
                    actor: actor._id 
                }
            })
            .then (({body}) =>{
                film = body ;
            });

    });
  
    it('saved film', () => {
        console.log('reached first test');
        assert.equal(film.title, 'The Room');
        assert.equal(film.cast[0].actor, actor._id);
        assert.equal(film.studio, studio._id);
    });
    
    it('gets film by id', () => {
        return request.get('/api/films/:id')
            .then( got => {
                assert.equal(got.body.title, film.title);
                assert.equal(got.body.cast[0].actor, actor.name);
                assert.equal(got.body.studio, studio.name);
            });
    });

});