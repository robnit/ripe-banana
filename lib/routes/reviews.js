const router = require('express').Router();
const Review = require('../models/review');

module.exports = router
    .post('/', (req, res) => {
        console.log('we are in post and req is:',req.body);
        const reviews = Array.isArray(req.body) ? req.body : [req.body];
        Promise.all(reviews.map( review => new Review(review).save()))
            .then( got => {
                got.length < 2 ? res.json(got[0]) : res.json(got);
            })
            .catch(err =>{
                console.log('==============',err);
                res.send(err);
            }); 
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
    });