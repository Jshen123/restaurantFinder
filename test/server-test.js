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

    it('should be redirected to /login on "login" button press', (done) => {
      chai.request(server).get('/login').redirects(0).send().end((err, res)=>{
        res.should.have.status(200);
        chai.expect('Location', '/login');
        done();
        });
      });

    it('should be redirected to /restaurants on successful login', (done) => {
      chai.request(server).post('/login').send({username: 'user1', password: 'test'}).end((err, res)=>{
        res.should.have.status(200);
        chai.expect('Location', '/restaurants');
        chai.expect((db.select('username').from('users').where({username: 'user1'} && {admin: false})));
        chai.expect(res.redirects).to.have.lengthOf(2);
        done();
      });
    });

    // it('should return validation errors if login request is invalid', (done) => {
    //   chai.request(server).post('/login').send({username: 'abc', password: '123'}).end((err, res)=>{
    //     res.should.have.status(400);
    //     done();
    //   });
    // });

    it('should be redirected to /restaurants on successful logout', (done) => {
      chai.request(server).post('/logout').end((err, res)=>{
        res.should.have.status(200);
        chai.expect('Location', '/restaurants');
        chai.expect((db.select('username').from('users').where({username: null})));
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

    it('should be able to leave a comment on a restaurant page', (done) => {
      let addedComment = {
        comment:'testing comment.',
        rating: 4,
      }
      chai.request(server).post('/login').send({username: 'user1', password: 'test'}).end((err, res)=>{
        chai.request(server).post('/restaurants/1').send(addedComment).end((err, res)=> {
          res.should.have.status(200);
          chai.expect('Location', 'restaurants/1');
          chai.expect(res.body('You have successfully posted a review!'));
          done();
        });
      });
    });

    it('should not be able to leave a comment when not logged in', (done) => {
      let addedComment = {
        comment:'testing comment.',
        rating: 4,
      }
        chai.request(server).post('/restaurants/2').send(addedComment).end((err, res)=> {
          res.should.have.status(200);
          chai.expect('Location', 'restaurants/1');
          done();
        });
    });

    // it('should return validation errors if registration request is invalid', (done) => {
    //   chai.request(server).post('/register').send({username: '', password: ''}).end((err, res)=>{
    //     res.should.have.status(400);
    //     done();
    //   });
    // });
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
    //  chai.request(server).get('/restaurants').end(function(err, res) {
    //    var num_user = res.body.length;
    //    let addedRestaurant = {
    //     name: 'Tim Hortons', price: 2, address: '8888 University Dr E, Burnaby, BC V5A 1S6',
    //     type: 'Fast food restaurant', description: 'Test Restaurant'
    //   }
    //    chai.request(server).post('/admin/add').send(addedRestaurant).end((err, res)=>{
    //        var num_user2 = res.body.length; // assuming response contains restaurant array
    //        (num_user2 - num_user).should.equal(1);
    //        done();
    //      });
    //    });
    //  });

    // need to add a router.post('/admin/add', (req, res) => {
    // it('should successfully reject an add request using invalid params', (done) => {
    //   let addedRestaurant = {
    //     name: 'Tim Hortons', price: 2, address: '8888 University Dr E, Burnaby, BC V5A 1S6',
    //     type: 'Fast food restaurant', description: 'Test Restaurant'
    //   }
    //   chai.request(server).post('/login').send({username: 'admin', password: 'test'}).end((err, res)=>{
    //       res.should.have.status(200);
    //       chai.expect('Location', '/restaurants');
    //       chai.request(server).post('/admin/add').send(addedRestaurant).end((err, res)=>{
    //       res.should.have.status(200);
    //       done();
    //     });
    //   });
    // });

   });
});
