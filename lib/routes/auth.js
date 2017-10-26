const router = require('express').Router();
const Reviewer = require('../models/reviewer');
const respond = require('../utils/respond');


module.exports = router

    .post('/signup', respond( async req => {

        const { password } = req.body;
        delete req.body.password;

        const count = await Reviewer.find({email : req.body.email}).count();

        if (count > 0) {
            throw { code: 400, error: 'email already exists'};
        }
            
        const reviewer = new Reviewer(req.body);
        reviewer.generateHash(password);

        await reviewer.save();
        return { token: 'placeholder' };
        
    }));