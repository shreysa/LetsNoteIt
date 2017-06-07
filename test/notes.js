//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

// let Book = require('../app/models/book');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();
let assert = chai.assert;

chai.use(chaiHttp);

//Our parent block
describe('Notes', () => {
    beforeEach((done) => { //Before each test we empty the database
        
        var test_data = {
            "data": [
            {	
                "note_body": "body1",
                "author": "Shreysa"
            },
            {	
                "note_body": "body2",
                "author": "Shreysa"
            }
            ]
        };

        chai.request(server)
            .post('/notes')
            .send(test_data)
            .then(function (res) {
                console.log(res);
                done();
            });
        });
/*
  * Test the /GET route
  */
  describe('/GET notes', () => {
      it('it should GET all the notes', (done) => {

        chai.request(server)
            .get('/notes')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                assert.equal(res.body.status, 'success');
                assert.equal(res.body.data.num_notes, 2);
                assert.equal(res.body.data.notes_data.length, 2)
              done();
            });
      });
  });

});