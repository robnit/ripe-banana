/* eslint-disable */

const router = require('express').Router();
const Reviewer = require('../models/reviewer');
const respond = require('../utils/respond');

module.exports = router

    .post('/signup', respond( async req => {

        const { email , password } = req.body;
        delete req.body.password;

        if (!password) throw { code: 400, error: 'password required' };

        const exists = await Reviewer.hasEmail(email);

        if (exists) {
            throw { code: 400, error: 'email already exists'};
        }
            
        const reviewer = new Reviewer(req.body);
        reviewer.generateHash(password);

        await reviewer.save();
        return { token: 'placeholder' };
        
    }));