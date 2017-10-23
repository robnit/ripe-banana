const { assert } = require('chai');
const mongoose = require('mongoose');
const request = require('./request');


describe.only('Reviewers API', () => {


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

    // check if we get his reviews when requesting reviewer by id
    // post a reviewer.
    // post a review. 
    // post a film
    // post a studio
    // post an actor

    let reviewer = null;
    beforeEach ( () => {
        return request.post('/api/reviewers')
            .send(reviewerOne)
            .then(({ body }) => reviewer = body);
    });
    

    function saveStudio(studio){
        return request.post('/api/studios')
            .send(studio);
    }

    function saveActor(actor) {
        return request.post('/api/actors')
            .send(actor);
    }

    let actor = null;
    beforeEach( () => {
        return saveActor ( { name: 'Mel Gibson', pob:'My Basement'})
            .then( ({body}) => actor = body);
    });

    let studio = null;
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
    let review = null;
    beforeEach( () => {
        request.post('api/reviews/')
            .send({
                rating: 4,
                reviewer: reviewer._id,
                review: 'Awsome movie',
                film: film._id
            })
            .then (saved => review = saved);
    });

    

    it('should save with id', () => {
        return request.post('/api/reviewers')
            .send(reviewerOne)
            .then( ({ body }) => {
                assert.equal(body.name, reviewerOne.name);
            });
    });

    it('should return array of all reviewers, including name and company', () => {
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


    it.only('should get reviewer by id, returning name, company, and reviews [film.name, rating, review]', ()=> {
        return request.get(`/api/reviewers/${reviewer._id}`)
            .then( ({body}) => {
                assert.equal(body.name, reviewer.name);
                assert.equal(body.reviews.rating, review.rating);
                assert.equal(body.reviews.review, review.review);
            });
    });

});