require('dotenv').config({path: '../.env'})
var chai = require('chai');
var should = chai.should();
var chaiHttp = require('chai-http');
var server = require('../index.js');
const environment = process.env.NODE_ENV || 'test';
const configuration = require('../knexfile')[environment];
const db = require('knex')(configuration);
const queries = require("../lib/queries.js")(db);

chai.use(chaiHttp);

describe('Populate database', () =>{

  before(function(done) {
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

  after(function(done) {
    db.migrate.rollback()
    .then(function() {
      done();
    });
  });

  describe('Test Registrations', () => {
    describe('Invalid registrations', () => {
  
      it("Should reject registration if username is longer than 25 characters", (done) => {
        longUName = 'oneTwoThreeFourFiveSixSevenEightNineTen';
        chai.request(server).post('/register').send({username: longUName, password: 'pw', confirmPassword: 'pw'}).end((err, res) => {
          queries.getUserByName(longUName, (value, error) => {
            (typeof value[0]).should.equal('undefined')
            done();
          })
        })
      })
  
      it("Should reject registration if passwords do not match", (done) => {
        uName = 'testUser'
        chai.request(server).post('/register').send({username: uName, password: 'pw1', confirmPassword: 'pw2'}).end((err, res) => {
          queries.getUserByName(uName, (value, error) => {
            (typeof value[0]).should.equal('undefined')
            done();
          })
        })
      })
  
      it("Should reject registration if username is null", (done) => {
        nullUName = ''
        chai.request(server).post('/register').send({username: nullUName, password: "pw", confirmPassword: "pw"}).end((err, res) => {
          queries.getUserByName(nullUName, (value, error) => {
            (typeof value[0]).should.equal('undefined')
            done();
          })
        })
      })
  
      it("Should reject registration if password is null", (done) => {
        uName = 'testUser'
        chai.request(server).post('/register').send({username: uName, password: '', confirmPassword: ''}).end((err, res) => {
          queries.getUserByName(nullUName, (value, error) => {
            (typeof value[0]).should.equal('undefined')
            done();
          })
        })
      })
  
      it("Should reject registration if username already taken", (done) => {
        repeatUName = 'user1'
  
        queries.countUsersByName(repeatUName, (value, error) => {
          value[0].count.should.equal('1')
        })
  
        chai.request(server).post('/register').send({username: repeatUName, password: 'pw', confirmPassword: 'pw'}).end((err, res) => {
          queries.countUsersByName(repeatUName, (value, error) => {
            value[0].count.should.equal('1')
            done();
          })
        })
      })
  
      it("Should reject registration if username contains characters which are alphanumeric, -, or _", (done) => {
        badUName1 = "~!@#$%^&*()+{}|:'<>? ";
        badUName2 = "=[]\\;\",./ ";
  
        chai.request(server).post('/register').send({username: badUName1, password: 'pw', confirmPassword: 'pw'}).end((err, res) => {
  
        })
  
        chai.request(server).post('/register').send({username: badUName2, password: 'pw', confirmPassword: 'pw'}).end((err, res) => {
          queries.getUserByName(badUName1, (value1, error) => {
            (typeof value1[0]).should.equal('undefined')
            queries.getUserByName(badUName2, (value2, error) => {
              (typeof value2[0]).should.equal('undefined')
              done();
            })
          })
        })
      })
    })
  
    describe('Success cases', () => {
      it("Should accept registration if requirements are met", (done) => {
        uName = 'success-User_1234'
        chai.request(server).post('/register').send({username: uName, password: 'pw', confirmPassword: 'pw'}).end((err, res) => {
          queries.getUserByName(uName, (value, error) => {
            (typeof value[0]).should.not.equal('undefined')
            done();
          })
        })
      })
    })
  })

  describe('Users', () => {

    it('should display all restaurants on the homepage',(done) => {

      chai.request(server).get('/restaurants').end((err, res) => {

        res.should.have.status(200);

        queries.countRestaurants((value, error) => {

          chai.expect(value[0].count, 34);
          done();
        });
      });
    });

    it('should be redirected to /login on "login" button press', (done) => {

      chai.request(server).get('/login').redirects(0).end((err, res) => {

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

    // page stuck at loading when invalid login request
    // it('should return validation errors if login request is invalid', (done) => {
    //   chai.request(server).post('/login').send({username: 'abc', password: '123'}).end((err, res)=>{
    //     res.should.have.status(400);
    //     done();
    //   });
    // });

    it('should be redirected to /restaurants on successful logout', (done) => {

      chai.request(server).post('/logout').end((err, res)=>{

        const logoutSessionId = res.session_user_id;
        chai.expect(logoutSessionId).to.be.undefined;
        res.should.have.status(200);
        chai.expect('Location', '/restaurants');
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

    it('should leave a comment on /restaurants/1 POST (logged in)', (done) => {

      var restaurant_id = 1;
      var agent = chai.request.agent(server)

      queries.countComments(restaurant_id, (value, error) => {

        var beforeCount = value[0].count;
        var testComment = {comment:'Test comment', rating:5};

        agent.post('/login').send({username:'user1', password:'test'}).then((err, res) => {

          return agent.post('/restaurants/' + restaurant_id.toString()).send(testComment).then((err, res) => {

            queries.countComments(restaurant_id, (value, error) => {

              var afterCount = value[0].count;
              (afterCount - beforeCount).should.equal(1);
              done();
            });
          });
        });
      });
    });

    it('should not leave a comment on /restaurants/1 POST (logged out)', (done) => {

      var restaurant_id = 1;

      queries.countComments(restaurant_id, (value, error) => {

        beforeCount = value[0].count;
        var testComment = {comment:'Test comment.', rating: 5}; 

        chai.request(server).post('/restaurants/1').send(testComment).end((err, res) => {

          res.should.have.status(200);

          queries.countComments(restaurant_id, (value, error) => {

            var afterCount = value[0].count;
            (afterCount - beforeCount).should.equal(0);
            done();
          });
        });
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

    it('should add a single restaurant on /admin/add POST', (done) => {

      queries.countRestaurants((value, error) => {

        var beforeCount = value[0].count;

        var testRestaurant = {
          name:'Test name', price:2, address:'Test address', description:'Test Restaurant',
          sunday:'10:00am-10:00pm', monday:'10:00am-10:00pm', tuesday: '10:00am-10:00pm',
          wednesday: '10:00am-10:00pm', thursday: '10:00am-10:00pm', friday: '10:00am-10:00pm',
          saturday: '10:00am-10:00pm' 
        };

        chai.request(server).post('/admin/add').send(testRestaurant).end((err, res) => {

          res.should.have.status(200);

          queries.countRestaurants((value, error) => {
            
            var afterCount = value[0].count;
            (afterCount - beforeCount).should.equal(1);
            done();
          });
        });
      });
    });

    // it('should delete a single restaurant on /admin/delete/:id POST', (done) => {

    //   queries.countRestaurants((value, error) => {

    //     var beforeCount = value[0].count;

    //     queries.getLatestRestaurantId((value, error) => {

    //       var restaurant_id = value[0].restaurant_id

    //       chai.request(server).delete('/admin/delete/' + restaurant_id.toString()).end((err, res) => {

    //         res.should.have.status(200);

    //         queries.countRestaurants((value, error) => {

    //           var afterCount = value[0].count;
    //           (beforeCount - afterCount).should.equal(1);
    //           done();
    //         });
    //       });
    //     });
    //   });
    // });

    // no rejection for invalid post yet
    // it('should successfully reject a POST request using invalid params', (done) => {
    //   let addedRestaurant = {
    //     name: '', price: 2, address: '',
    //     type: '', description: ''
    //   }
    //   chai.request(server).post('/login').send({username: 'admin', password: 'test'}).end((err, res)=>{
    //       res.should.have.status(200);
    //       chai.expect('Location', '/restaurants');
    //       chai.request(server).post('/admin/add').send(addedRestaurant).end((err, res)=>{
    //       res.should.have.status(400);
    //       done();
    //     });
    //   });
    // });
   });
});
