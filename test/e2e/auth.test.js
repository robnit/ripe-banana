const { assert } = require('chai');
const mongoose = require('mongoose');
const request = require('./request');

describe.only('Signup test', () => {

    beforeEach(() => mongoose.connection.dropDatabase());

    const myReviewer = {
        name: 'dan dungis',
        company: 'trashco',
        email: 'user@aol.com',
        role: 'normie',
        password: 'pass'
    };
    let token = null;

    beforeEach( async () => {
        const { body } = await request
            .post('/api/auth/signup')
            .send(myReviewer);
        
        token = body.token;
    });

    it('signup creates token', () => {
        assert.ok(token);
    });

});