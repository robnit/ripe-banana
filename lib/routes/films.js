const router = require('express').Router();
//const Actor = require('../models/actor');
const Film = require('../models/film');

module.exports = router

    .post('/', (req, res, next) => {
        const films = Array.isArray(req.body) ? req.body : [req.body];
        Promise.all(films.map( film => new Film(film).save()))
            .then( got => {
                got.length < 2 ? res.json(got[0]) : res.json(got);
            })
            .catch(next);
    });