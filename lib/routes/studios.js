const router = require('express').Router();
const Studio = require('../models/studio');

module.exports = router
    .post('/', (req, res, next) => {
        new Studio(req.body).save()
            .then( got => res.json(got))
            .catch(next);
    })

    .get('/:id', (req, res, next) => {
        // Question should we use .lean() and what will it change
        console.log('we are in the route and id is:', req.params.id);
        Studio.findById(req.params.id)
            .then( got => res.json(got))
            .catch(next);
    });