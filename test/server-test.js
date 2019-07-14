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
    // it('should display all restaurants on the homepage',(done) => {
    //   chai.request(server).get('/restaurants').end((err, res)=>{
    //     res.should.have.status(200);
    //     res.body.should.be.a('array');
    //     done();
    //   });
    // })
    it('should be redirected to /restaurants on successful login', (done) => {
      chai.request(server).post('/login').send({username: 'user1', password: 'test'}).end((err, res)=>{
        res.should.have.status(200);
        chai.expect('Location', '/restaurants');
        chai.expect((db.select('username').from('users').where({username: 'user1'} && {admin: false})));
        chai.expect(res.redirects).to.have.lengthOf(2);
        done();
      });
    });
    it('should be redirected to /restaurants on successful registration', (done) => {
      chai.request(server).post('/register').send({username: 'user3', password: 'test'}).end((err, res)=>{
        res.should.have.status(200);
        chai.expect('Location', '/restaurants');
        chai.expect((db.select('username').from('users').where({username: 'user3'} && {admin: false})));
        chai.expect(res.redirects).to.have.lengthOf(2);
        done();
      });
    });
});

  describe('Admins', () => {
    it('should be redirected to /restaurants on successful login', (done) => {
      chai.request(server).post('/login').send({username: 'admin', password: 'test'}).end((err, res)=>{
        res.should.have.status(200);
        chai.expect('Location', '/restaurants');
        chai.expect((db.select('username').from('users').where({username: 'admin'} && {admin: true})));
        chai.expect(res.redirects).to.have.lengthOf(2);
        done();
      });
    });

    // it('should add a single restaurant on add restaurant', (done) => {
    //  chai.request(server).get('/restaurants').end(function(err, res){ // assume this gets array of all users
    //    var num_user = res.body.length;
    //    chai.request(server).post('/admin/add').send({
    //      name: 'Tim Hortons', price: 2, address: '8888 University Dr E, Burnaby, BC V5A 1S6',
    //      type: 'Fast food restaurant', description: 'Test Restaurant'}).end((err, res)=>{
    //        var num_user2 = res.body.length; // assuming response contains user array
    //        (num_user2 - num_user).should.equal(1);
    //        done();
    //      });
    //    });
    //  });
   });
});
