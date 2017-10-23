const router = require('express').Router();
const Studio = require('../models/studio');
const Film = require('../models/film');

module.exports = router
    // Question: do we need next in the post params?
    .post('/', (req, res) => {
        const studios = Array.isArray(req.body) ? req.body : [req.body];

        Promise.all(studios.map( studio => new Studio(studio).save()))
            .then( got => {
                got.length < 2 ? res.json(got[0]) : res.json(got);
            });
    })

    //TODO: return associated films when GETting studio
    .get('/:id', (req, res, next) => {
        Studio.findById(req.params.id)
            .select('name')
            .lean()
            .then( got => {
                Film.find({studio: got._id})
                    .then(film => got.film = film);
                res.json(got);
            })
            .catch(next);
    })

    .get('/', (req, res, next) => {
        Studio.find()
            .select('name')
            .lean()
            .then( got => {
                Promise.all(
                    got.map( studio => {
                        Film.find({studio: studio._id})
                            .then(film => studio.film = film);
                    })
                );
                res.json(got);
            })  
            .catch(next);
    })

    .put('/:id', (req, res, next) => {
        Studio.findByIdAndUpdate(req.params.id, req.body, {new: true})
            .then( (updated) => {
                res.send(updated);
            })
            .catch(next);
    })

    .delete('/:id', (req,res, next) => {
        //TODO check if films have that studio name
        Studio.findByIdAndRemove(req.params.id)
            .then( deleted => {
                res.send(deleted);
            })
            .catch(next);
    });
