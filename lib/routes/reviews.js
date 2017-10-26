const router = require('express').Router();
const Review = require('../models/review');
const checkAuth =require('../utils/check-auth');
//const checkRole = require('../utils/checkRole');

module.exports = router
    .post('/', checkAuth(),(req, res, next) => {
        const reviews = Array.isArray(req.body) ? req.body : [req.body];
        Promise.all(reviews.map( review => new Review(review).save()))
            .then( got => {
                got.length < 2 ? res.json(got[0]) : res.json(got);
            })
            .catch(next);
    })

    .get('/:id', (req, res, next) => {
        Review.findById(req.params.id)
            .then( got => res.send(got))
            .catch(next);
    })

    .get('/', (req, res, next) => {
        Review.find().sort({'date':-1}).limit(100)
            .then( got => res.send(got))
            .catch(next);
    })

    .put('/:id',checkAuth(), (req, res, next) => {
        let reviewerId = '';
        Review.findById(req.params.id)
            .then( ({ reviewer }) => reviewerId = reviewer)
            .then( () =>{

                console.log(' we are in put and reviewerId is', reviewerId);
                console.log('req.user._id is', req.user.id);
                if (req.user.id == reviewerId){
                    console.log('wePassed');
                    Review.findByIdAndUpdate(req.params.id, req.body, {new: true})
                        .then ( updated => res.send(updated))
                        .catch(next);
                }
                else {
                    console.log('reviewer and review didnt match');
                    throw { code:401, error: 'You need to be an author of the review to update it'};
                }
            })
            .catch(next);
    });