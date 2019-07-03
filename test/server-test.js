require('dotenv').config({path: '../.env'})
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../index.js');
var should = chai.should();
const environment = process.env.NODE_ENV || 'test';  
const configuration = require('../knexfile')[environment];
const db = require('knex')(configuration);

chai.use(chaiHttp);
describe('Populate database', () =>{

  beforeEach(function(done) {
    db.migrate.rollback()
    .then(function() {
      db.migrate.latest()
      .then(function() {
        return db.seed.run()
        .then(function() {
          done();
        });
      });
    });
  });
  
  afterEach(function(done) {
    db.migrate.rollback()
    .then(function() {
      done();
    });
  });

  describe('Users', () => {
    it('should be redirected to /restaurants on successful login', (done) => {
      chai.request(server).post('/login').send({username: 'user1', password: 'test'}).end((err, res)=>{
        res.should.have.status(200);
        chai.expect('Location', '/restaurants');
        chai.expect(res.redirects).to.have.lengthOf(2)
        done();
      })
    })
  })
})