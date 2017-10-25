const request = require('./request');
const { assert } = require('chai');
const mongoose = require('mongoose');

describe.only('Authentication API', () => {

    beforeEach( () => mongoose.connection.dropDatabase());
    let token = null;
    
    beforeEach( () =>{
        return request.post('/api/auth/signup')
            .send({name: 'Mr Reviewer', company: 'reviewLLC', email:'user', password:'abc'})
            .then( ({body}) =>{
                token = body.token;
            });
    });
    
    it('should give a token on signup', () => {
        assert.ok(token);
    });

    it('cant sign up with the same email', ()=> {
        return request.post('/api/auth/signup')
            .send({name: 'Mr Reviewer', company: 'reviewLLC', email:'user', password:'abc'})
            .then(
                () => {throw new Error('Unexpected success which is bad');},
                err => {
                    assert.equal(err.status, 400);
                }
            );
    });     
    
    it('cant sign up without password', () => {
        return request.post('/api/auth/signup')
            .send({name: 'not the same', company: 'another', email:'different'})
            .then(
                () => {throw new Error('Unexpected success which is bad');},
                err => {
                    assert.equal(err.status, 400);
                }
            );


    });

    it('should sign in with the same credentials',() => {
        return request.post('/api/auth/signin')
            .send({ email:'user', password:'abc'})
            .then( ({ body }) => assert.ok(body.token));
    });
});
