const router = require('express').Router();
const Actor = require('../models/actor');
const Film = require('../models/film');

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
        const actorId = req.params.id;

        Promise.all([
            Actor.findById(actorId).lean(),
            Film.find({
                cast: {
                    actor : actorId
                }
            }).lean()
        ])
            .then( ([actor, films]) => {
                actor.films = films;
                res.json(actor);
            })
            .catch(next);
    })

    .get('/', (req, res, next) => {
        Actor.find()
            .then( found => res.json(found))
            .catch(next);
    })

    .delete('/:id', (req, res, next) => {
        Actor.findByIdAndRemove(req.params.id)
            .then( (deleted) => {
                res.send(deleted);
            })
            .catch(next);
    });
    