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
        try {
            const { body } = await request
                .post('/api/auth/signup')
                .send(myReviewer);
            
            token = body.token;
        }
        catch (err) {
            throw (err);
        }
    });

    it('should create token on signup', () => {
        assert.ok(token);
    });

    it.only('should return error 400 when trying to sign up with same email', async () => {
        try {
            myReviewer.password = 'fakepass666';
            await request
                .post('/api/auth/signup')
                .send(myReviewer);
            
            throw new Error('unexpected success');
        }
        catch(err) {
            assert.equal(err.status, 400);
        }
    });

    it ('should return error if no password', async () => {
        try {
            delete myReviewer.password;
            myReviewer.email = 'newEmail@google.com';
            await request
                .post('/api/auth/signup')
                .send(myReviewer);
            throw new Error ('unexpected success');
        }
        catch(err) {
            assert.equal(err.status, 400);
        }

    });
 
});