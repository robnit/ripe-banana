const router = require('express').Router();
const Actor = require('../models/actor');

module.exports = router

    .post('/', (req, res, next) => {
        const actors = Array.isArray(req.body) ? req.body : [req.body];

        Promise.all(actors.map( actor => new Actor(actor).save()))
            .then( got => {
                got.length < 2 ? res.json(got[0]) : res.json(got);
            })
            .catch(next);
    })

    .get('/:id', (req, res, next) => {
        Actor.findById(req.params.id)
            .select('name')
            .lean()
            .then( got => res.json(got))
            .catch(next);
    });
    