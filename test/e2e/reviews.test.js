const { assert } = require('chai');
const mongoose = require('mongoose');
const request = require('./request');

describe('Reviewers API', () => {

    const reviewerOne = {
        name: 'John Doe',
        company: 'Enron'
    };

    beforeEach(() => {
        mongoose.connection.dropDatabase();
    });

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
        review = {
            rating: 4,
            reviewer: reviewer._id,
            review: 'Awsome movie',
            film: film._id
        };
        return request.post('/api/reviews/')
            .send(review)
            .then (saved =>{
                review = saved.body;
            });
    });


    it('should post and get a review', () => {
        return request.get(`/api/reviews/${review._id}`)
            .then( ({body}) => {
                assert.equal( body.rating, review.rating );
            });
    });

    it.only('should get array of all reviews, including rating, review, and film name. limit to 100', () => {
        mongoose.connection.dropDatabase();
        function postReview(){
            review.review += '!';
            request.post('/api/reviews')
                .send(review);
        }

        Promise.all(Array(100).fill().map(postReview))
            .then( () => {
                return request.get('/api/reviews')
                    .then( ({body}) => {
                        console.log('=====sdgdgsdgsdg========= body', body);
                        assert.equal(body.length, 50);
                    });
            });
    });

});
