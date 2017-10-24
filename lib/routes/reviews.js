const router = require('express').Router();
const Review = require('../models/review');

module.exports = router
    .post('/', (req, res, next) => {
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
        Review.find()
            .then( got => res.send(got))
            .catch(next);
    });