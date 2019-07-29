require('dotenv').config({path: '../.env'})
var chai = require('chai');
var should = chai.should();
var chaiHttp = require('chai-http');
var server = require('../index.js');
supertest = require('supertest');
var request = supertest(server);
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
      db.migrate.latest()
      .then(function() {
        return db.seed.run()
        .then(function() {
          done();
        });
      });
    });
  });

  describe('Test Registrations', () => {
    describe('Invalid registrations', () => {
  
      it("Should reject registration if username is longer than 25 characters", (done) => {
        longUName = 'oneTwoThreeFourFiveSixSevenEightNineTen';
        chai.request(server).post('/register').send({username: longUName, password: 'pw', confirmPassword: 'pw'}).end((err, res) => {
          var location = res.redirects[res.redirects.length-1];
          location = location.slice(location.lastIndexOf('/'), location.length);
          chai.expect(location).to.equal('/register')
          
          queries.getUserByName(longUName, (value, error) => {
            (typeof value[0]).should.equal('undefined')
            done();
          })
        })
      })
  
      it("Should reject registration if passwords do not match", (done) => {
        uName = 'testUser'
        chai.request(server).post('/register').send({username: uName, password: 'pw1', confirmPassword: 'pw2'}).end((err, res) => {
          var location = res.redirects[res.redirects.length-1];
          location = location.slice(location.lastIndexOf('/'), location.length);
          chai.expect(location).to.equal('/register')

          queries.getUserByName(uName, (value, error) => {
            (typeof value[0]).should.equal('undefined')
            done();
          })
        })
      })
  
      it("Should reject registration if username is null", (done) => {
        nullUName = ''
        chai.request(server).post('/register').send({username: nullUName, password: "pw", confirmPassword: "pw"}).end((err, res) => {
          var location = res.redirects[res.redirects.length-1];
          location = location.slice(location.lastIndexOf('/'), location.length);
          chai.expect(location).to.equal('/register')

          queries.getUserByName(nullUName, (value, error) => {
            (typeof value[0]).should.equal('undefined')
            done();
          })
        })
      })
  
      it("Should reject registration if password is null", (done) => {
        uName = 'testUser'
        chai.request(server).post('/register').send({username: uName, password: '', confirmPassword: ''}).end((err, res) => {
          var location = res.redirects[res.redirects.length-1];
          location = location.slice(location.lastIndexOf('/'), location.length);
          chai.expect(location).to.equal('/register')

          queries.getUserByName(nullUName, (value, error) => {
            (typeof value[0]).should.equal('undefined')
            done();
          })
        })
      })
  
      it("Should reject registration if username already taken", (done) => {
        repeatUName = 'user1'
  
        queries.countUsersByName(repeatUName, (value, error) => {
          chai.expect(value[0].count, 1)
        })
  
        chai.request(server).post('/register').send({username: repeatUName, password: 'pw', confirmPassword: 'pw'}).end((err, res) => {
          var location = res.redirects[res.redirects.length-1];
          location = location.slice(location.lastIndexOf('/'), location.length);
          chai.expect(location).to.equal('/register')

          queries.countUsersByName(repeatUName, (value, error) => {
            chai.expect(value[0].count, 1)
            done();
          })
        })
      })
  
      it("Should reject registration if username contains characters which are alphanumeric, -, or _", (done) => {
        badUName1 = "~!@#$%^&*()+{}|:'<>? ";
        badUName2 = "=[]\\;\",./ ";
  
        chai.request(server).post('/register').send({username: badUName1, password: 'pw', confirmPassword: 'pw'}).end((err, res) => {
          var location = res.redirects[res.redirects.length-1];
          location = location.slice(location.lastIndexOf('/'), location.length);
          chai.expect(location).to.equal('/register')
        })
  
        chai.request(server).post('/register').send({username: badUName2, password: 'pw', confirmPassword: 'pw'}).end((err, res) => {
          var location = res.redirects[res.redirects.length-1];
          location = location.slice(location.lastIndexOf('/'), location.length);
          chai.expect(location).to.equal('/register')

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
  
    describe('Successful registrations', () => {
      it("Should accept registration if requirements are met", (done) => {
        uName = 'success-User_1234'
        chai.request(server).post('/register').send({username: uName, password: 'pw', confirmPassword: 'pw'}).end((err, res) => {
          var location = res.redirects[res.redirects.length-1];
          location = location.slice(location.lastIndexOf('/'), location.length);
          chai.expect(location).to.equal('/restaurants')

          queries.getUserByName(uName, (value, error) => {
            (typeof value[0]).should.not.equal('undefined')
            res.should.have.status(200);
            done();
          })
        })
      })
    })
  })
  
  describe('Test Redirects', () => {

    describe('As user', () => {

      // it('should be redirected to /login on "login" button press', (done) => {

      //   chai.request(server).get('/login').redirects(0).end((err, res) => {

      //     res.should.have.status(200);

      //     var location = res.redirects[res.redirects.length-1];
      //     location = location.slice(location.lastIndexOf("/"), location.length);

      //     chai.expect(location).to.equal('/login')

      //     done();
      //   })
      // })

      it('should be redirected to /restaurants on successful logout', (done) => {

        chai.request(server).post('/logout').end((err, res) => {

          const logoutSessionId = res.session_user_id;

          chai.expect(logoutSessionId).to.be.undefined;

          res.should.have.status(200);

          var location = res.redirects[res.redirects.length-1];
          location = location.slice(location.lastIndexOf("/"), location.length);

          chai.expect(location).to.equal('/restaurants')

          done();
        })
      })

      it('should be redirected to /restaurants on successful registration', (done) => {

        chai.request(server).post('/register').send({username: 'user3', password: 'test'}).end((err, res) => {

          res.should.have.status(200);

          var location = res.redirects[res.redirects.length-1];
          location = location.slice(location.lastIndexOf("/"), location.length);

          chai.expect(location).to.equal('/register')

          chai.expect((db.select('username').from('users').where({username: 'user3'} && {admin: false})));

          done();
        })
      })
    })

    describe('As admin', () => {

      it('Should be redirected to /restaurants on successful login', (done) => {

        chai.request(server).post('/login').send({username: 'admin', password: 'test'}).end((err, res) => {

          res.should.have.status(200);

          var location = res.redirects[res.redirects.length-1];
          location = location.slice(location.lastIndexOf("/"), location.length);

          chai.expect(location).to.equal('/restaurants')

          chai.expect((db.select('username').from('users').where({username: 'admin'} && {admin: true})));
          
          done();
        })
      })
    })
  })

  describe('Test comments', () => {

    describe('Invalid post', () => {

      it('Should reject comment additon if logged in but empty comment', (done) => {

        var restaurant_id = 1;
        var agent = chai.request.agent(server)

        queries.countComments(restaurant_id, (value, error) => {

          var beforeCount = value[0].count;
          var testComment = {comment:'', rating:5, captcha:'Test'};

          agent.post('/login').send({username:'admin', password:'test'}).then((err, res) => {

            return agent.post('/comments/' + restaurant_id.toString()).send(testComment).then((err, res) => {

              queries.countComments(restaurant_id, (value, error) => {

                var afterCount = value[0].count;

                (afterCount - beforeCount).should.equal(0);

                done();
              })
            })
          })
        })
      })
    
      it('Should reject comment additon if logged in but no rating', (done) => {

        var restaurant_id = 1;
        var agent = chai.request.agent(server)

        queries.countComments(restaurant_id, (value, error) => {

          var beforeCount = value[0].count;
          var testComment = {comment:'Test comment', captcha:'Test'};

          agent.post('/login').send({username:'admin', password:'test'}).then((err, res) => {

            return agent.post('/comments/' + restaurant_id.toString()).send(testComment).then((err, res) => {

              queries.countComments(restaurant_id, (value, error) => {

                var afterCount = value[0].count;

                (afterCount - beforeCount).should.equal(0);

                done();
              })
            })
          })
        })
      })

      it('Should reject comment additon if logged in but no captcha verification', (done) => {

        var restaurant_id = 1;
        var agent = chai.request.agent(server)

        queries.countComments(restaurant_id, (value, error) => {

          var beforeCount = value[0].count;
          var testComment = {comment:'Test comment', rating:5, captcha:''};

          agent.post('/login').send({username:'admin', password:'test'}).then((err, res) => {

            return agent.post('/comments/' + restaurant_id.toString()).send(testComment).then((err, res) => {

              queries.countComments(restaurant_id, (value, error) => {

                var afterCount = value[0].count;

                (afterCount - beforeCount).should.equal(0);

                done();
              })
            })
          })
        })
      })
    
      it('Should reject comment addition if logged out', (done) => {

        var restaurant_id = 1;

        queries.countComments(restaurant_id, (value, error) => {

          beforeCount = value[0].count;
          var testComment = {comment:'Test comment.', rating: 5, captcha:'Test'}; 

          chai.request(server).post('/comments/' + restaurant_id.toString()).send(testComment).end((err, res) => {

            res.should.have.status(200);

            queries.countComments(restaurant_id, (value, error) => {

              var afterCount = value[0].count;

              (afterCount - beforeCount).should.equal(0);

              done();
            })
          })
        })
      })
    })

    describe('Successful post', () => {

      it('Should successfully add comment if logged in and all fields filled', (done) => {

        var restaurant_id = 1;
        var agent = chai.request.agent(server)

        queries.countComments(restaurant_id, (value, error) => {

          var beforeCount = value[0].count;
          var testComment = {comment:'Test comment', rating:5, captcha:'Test'};

          agent.post('/login').send({username:'admin', password:'test'}).then((err, res) => {

            return agent.post('/comments/' + restaurant_id.toString()).send(testComment).then((err, res) => {

              queries.countComments(restaurant_id, (value, error) => {

                var afterCount = value[0].count;

                (afterCount - beforeCount).should.equal(1);

                done();
              })
            })
          })
        })
      })
    })
  })

  describe('Test Adding Restaurants', () => {

    describe('Invalid restaurant input', () => {

      it('Should reject restaurant addition if no name is provided', (done) => {

        queries.countRestaurants((value, error) => {

          var beforeCount = value[0].count;

          var testRestaurant = {
            name:'', address:'Test address', desc:'Test Restaurant', priceRadio: '$$',
            timeFrom0: '10:00', timeTo0: '22:00', timeFrom1: '10:00', timeTo1: '22:00',
            timeFrom2: '10:00', timeTo2: '22:00', timeFrom3: '10:00', timeTo3: '22:00',
            timeFrom4: '10:00', timeTo4: '22:00', timeFrom5: '10:00', timeTo5: '22:00',
            timeFrom6: '10:00', timeTo6: '22:00', tag: [ 'Fast Food', 'Burgers', 'Cornerstone' ]
          };

          var imagePath = './public/Pictures/placeholder.jpg';

          request.post('/admin/add').field(testRestaurant).attach('restaurantPic', imagePath).end((err, res) => {
            
            queries.countRestaurants((value, error) => {

              var afterCount = value[0].count;

              chai.expect(afterCount - beforeCount).to.equal(0);

              done();
            })
          })
        })
      })

      it('Should reject restaurant addition if no address is provided', (done) => {

        queries.countRestaurants((value, error) => {

          var beforeCount = value[0].count;

          var testRestaurant = {
            name:'Test name', address:'', desc:'Test Restaurant', priceRadio: '$$',
            timeFrom0: '10:00', timeTo0: '22:00', timeFrom1: '10:00', timeTo1: '22:00',
            timeFrom2: '10:00', timeTo2: '22:00', timeFrom3: '10:00', timeTo3: '22:00',
            timeFrom4: '10:00', timeTo4: '22:00', timeFrom5: '10:00', timeTo5: '22:00',
            timeFrom6: '10:00', timeTo6: '22:00', tag: [ 'Fast Food', 'Burgers', 'Cornerstone' ]
          };

          var imagePath = './public/Pictures/placeholder.jpg';

          request.post('/admin/add').field(testRestaurant).attach('restaurantPic', imagePath).end((err, res) => {
            
            queries.countRestaurants((value, error) => {

              var afterCount = value[0].count;

              chai.expect(afterCount - beforeCount).to.equal(0);

              done();
            })
          })
        })
      })

      it('Should reject restaurant addition if wrong image format is provided', (done) => {

        queries.countRestaurants((value, error) => {

          var beforeCount = value[0].count;

          var testRestaurant = {
            name:'Test name', address:'', desc:'Test Restaurant', priceRadio: '$$',
            timeFrom0: '10:00', timeTo0: '22:00', timeFrom1: '10:00', timeTo1: '22:00',
            timeFrom2: '10:00', timeTo2: '22:00', timeFrom3: '10:00', timeTo3: '22:00',
            timeFrom4: '10:00', timeTo4: '22:00', timeFrom5: '10:00', timeTo5: '22:00',
            timeFrom6: '10:00', timeTo6: '22:00', tag: [ 'Fast Food', 'Burgers', 'Cornerstone' ]
          };

          var imagePath = './public/Pictures/placeholder.bmp';

          request.post('/admin/add').field(testRestaurant).attach('restaurantPic', imagePath).end((err, res) => {
            
            queries.countRestaurants((value, error) => {

              var afterCount = value[0].count;

              chai.expect(afterCount - beforeCount).to.equal(0);

              done();
            })
          })
        })
      })
    })

    describe('Valid restaurant input', () => {

      it('Should successfully add restaurant with all fields filled except description', (done) => {

        queries.countRestaurants((value, error) => {

          var beforeCount = value[0].count;

          var testRestaurant = {
            name:'Test name', address:'Test address', desc:'', priceRadio: '$$',
            timeFrom0: '10:00', timeTo0: '22:00', timeFrom1: '10:00', timeTo1: '22:00',
            timeFrom2: '10:00', timeTo2: '22:00', timeFrom3: '10:00', timeTo3: '22:00',
            timeFrom4: '10:00', timeTo4: '22:00', timeFrom5: '10:00', timeTo5: '22:00',
            timeFrom6: '10:00', timeTo6: '22:00', tag: [ 'Fast Food', 'Burgers', 'Cornerstone' ]
          };

          var imagePath = './public/Pictures/placeholder.jpg';

          request.post('/admin/add').field(testRestaurant).attach('restaurantPic', imagePath).end((err, res) => {
            
            queries.countRestaurants((value, error) => {

              var afterCount = value[0].count;

              chai.expect(afterCount - beforeCount).to.equal(1);

              queries.getLatestRestaurantId((value, error) => {

                var restaurant_id = value[0].restaurant_id;

                request.delete('/admin/delete/' + restaurant_id.toString()).end((err, res) => {

                  done();
                })
              })
            })
          })
        })
      })

      it('Should successfully add restaurant with all fields filled except open hours', (done) => {

        queries.countRestaurants((value, error) => {

          var beforeCount = value[0].count;

          var testRestaurant = {
            name:'Test name', address:'Test address', desc:'Test description', priceRadio: '$$',
            timeFrom0: '', timeTo0: '', timeFrom1: '', timeTo1: '',
            timeFrom2: '', timeTo2: '', timeFrom3: '', timeTo3: '',
            timeFrom4: '', timeTo4: '', timeFrom5: '', timeTo5: '',
            timeFrom6: '', timeTo6: '', tag: [ 'Fast Food', 'Burgers', 'Cornerstone' ]
          };

          var imagePath = './public/Pictures/placeholder.jpg';

          request.post('/admin/add').field(testRestaurant).attach('restaurantPic', imagePath).end((err, res) => {
            
            queries.countRestaurants((value, error) => {

              var afterCount = value[0].count;

              chai.expect(afterCount - beforeCount).to.equal(1);

              queries.getLatestRestaurantId((value, error) => {

                var restaurant_id = value[0].restaurant_id;

                request.delete('/admin/delete/' + restaurant_id.toString()).end((err, res) => {

                  done();
                })
              })
            })
          })
        })
      })

      it('Should successfully add restaurant with all fields filled except tags', (done) => {

        queries.countRestaurants((value, error) => {

          var beforeCount = value[0].count;

          var testRestaurant = {
            name:'Test name', address:'Test address', desc:'Test description', priceRadio: '$$',
            timeFrom0: '10:00', timeTo0: '22:00', timeFrom1: '10:00', timeTo1: '22:00',
            timeFrom2: '10:00', timeTo2: '22:00', timeFrom3: '10:00', timeTo3: '22:00',
            timeFrom4: '10:00', timeTo4: '22:00', timeFrom5: '10:00', timeTo5: '22:00',
            timeFrom6: '10:00', timeTo6: '22:00', tag: []
          };

          var imagePath = './public/Pictures/placeholder.jpg';

          request.post('/admin/add').field(testRestaurant).attach('restaurantPic', imagePath).end((err, res) => {
            
            queries.countRestaurants((value, error) => {

              var afterCount = value[0].count;

              chai.expect(afterCount - beforeCount).to.equal(1);

              queries.getLatestRestaurantId((value, error) => {

                var restaurant_id = value[0].restaurant_id;

                request.delete('/admin/delete/' + restaurant_id.toString()).end((err, res) => {

                  done();
                })
              })
            })
          })
        })
      })

      it('Should successfully add restaurant with all fields filled and no image provided', (done) => {

        queries.countRestaurants((value, error) => {

          var beforeCount = value[0].count;

          var testRestaurant = {
            name:'Test name', address:'Test address', desc:'Test Restaurant', priceRadio: '$$',
            timeFrom0: '10:00', timeTo0: '22:00', timeFrom1: '10:00', timeTo1: '22:00',
            timeFrom2: '10:00', timeTo2: '22:00', timeFrom3: '10:00', timeTo3: '22:00',
            timeFrom4: '10:00', timeTo4: '22:00', timeFrom5: '10:00', timeTo5: '22:00',
            timeFrom6: '10:00', timeTo6: '22:00', tag: [ 'Fast Food', 'Burgers', 'Cornerstone' ]
          };

          request.post('/admin/add').field(testRestaurant).end((err, res) => {
            
            queries.countRestaurants((value, error) => {

              var afterCount = value[0].count;

              chai.expect(afterCount - beforeCount).to.equal(1);

              queries.getLatestRestaurantId((value, error) => {

                var restaurant_id = value[0].restaurant_id;

                queries.deleteRestaurant(restaurant_id, (value, error) => {
                  done();
                })
              })
            })
          })
        })
      })

      it('Should successfully add restaurant with all fields filled', (done) => {

        queries.countRestaurants((value, error) => {

          var beforeCount = value[0].count;

          var testRestaurant = {
            name:'Test name', address:'Test address', desc:'Test description', priceRadio: '$$',
            timeFrom0: '10:00', timeTo0: '22:00', timeFrom1: '10:00', timeTo1: '22:00',
            timeFrom2: '10:00', timeTo2: '22:00', timeFrom3: '10:00', timeTo3: '22:00',
            timeFrom4: '10:00', timeTo4: '22:00', timeFrom5: '10:00', timeTo5: '22:00',
            timeFrom6: '10:00', timeTo6: '22:00', tag: [ 'Fast food', 'Burgers', 'Cornerstone' ]
          };

          var imagePath = './public/Pictures/placeholder.jpg';

          request.post('/admin/add').field(testRestaurant).attach('restaurantPic', imagePath).end((err, res) => {
            
            queries.countRestaurants((value, error) => {

              var afterCount = value[0].count;

              chai.expect(afterCount - beforeCount).to.equal(1);

              queries.getLatestRestaurantId((value, error) => {

                var restaurant_id = value[0].restaurant_id;

                request.delete('/admin/delete/' + restaurant_id.toString()).end((err, res) => {

                  done();
                })
              })
            })
          })
        })
      })
    })
  })

  describe('Test Editing Restaurants', () => {

    describe('Invalid restaurant input', () => {

      it('Should reject restaurant edit if no name is provided', (done) => {

        var testRestaurant = {
            name:'Test name', address:'Test address', desc:'Test description', priceRadio: '$$',
            timeFrom0: '10:00', timeTo0: '22:00', timeFrom1: '10:00', timeTo1: '22:00',
            timeFrom2: '10:00', timeTo2: '22:00', timeFrom3: '10:00', timeTo3: '22:00',
            timeFrom4: '10:00', timeTo4: '22:00', timeFrom5: '10:00', timeTo5: '22:00',
            timeFrom6: '10:00', timeTo6: '22:00', tag: [ 'Fast food', 'Burgers', 'Cornerstone' ]
        };

        var imagePath = './public/Pictures/placeholder.jpg';

        request.post('/admin/add').field(testRestaurant).attach('restaurantPic', imagePath).end((err, res) => {

          queries.getLatestRestaurantId((value, error) => {

            var restaurant_id = value[0].restaurant_id;

            testRestaurant = {
              name:'', address:'Test address', desc:'Test Restaurant', priceRadio: '$$',
              timeFrom0: '10:00', timeTo0: '22:00', timeFrom1: '10:00', timeTo1: '22:00',
              timeFrom2: '10:00', timeTo2: '22:00', timeFrom3: '10:00', timeTo3: '22:00',
              timeFrom4: '10:00', timeTo4: '22:00', timeFrom5: '10:00', timeTo5: '22:00',
              timeFrom6: '10:00', timeTo6: '22:00', tag: [ 'Fast Food', 'Burgers', 'Cornerstone' ]
            };

            imagePath = './public/Pictures/placeholder.jpg';

            request.post('/admin/edit/' + restaurant_id.toString()).field(testRestaurant).attach('restaurantPic', imagePath).end((err, res) => {
            
              queries.getRestaurantDetail(restaurant_id, (value, error) => {

                chai.expect(value[0].name).to.not.equal('');

                done();
              })
            })
          })
        })
      })

      it('Should reject restaurant edit if no address is provided', (done) => {
        
        queries.getLatestRestaurantId((value, error) => {

          var restaurant_id = value[0].restaurant_id;

          var testRestaurant = {
            name:'Test name', address:'', desc:'Test Restaurant', priceRadio: '$$',
            timeFrom0: '10:00', timeTo0: '22:00', timeFrom1: '10:00', timeTo1: '22:00',
            timeFrom2: '10:00', timeTo2: '22:00', timeFrom3: '10:00', timeTo3: '22:00',
            timeFrom4: '10:00', timeTo4: '22:00', timeFrom5: '10:00', timeTo5: '22:00',
            timeFrom6: '10:00', timeTo6: '22:00', tag: [ 'Fast Food', 'Burgers', 'Cornerstone' ]
          };

          var imagePath = './public/Pictures/placeholder.jpg';

          request.post('/admin/edit/' + restaurant_id.toString()).field(testRestaurant).attach('restaurantPic', imagePath).end((err, res) => {
          
            queries.getRestaurantDetail(restaurant_id, (value, error) => {
              
              chai.expect(value[0].address).to.not.equal('');

              done();
            })
          })
        })
      })

      it('Should reject restaurant edit if wrong image format is provided', (done) => {

        queries.getLatestRestaurantId((value, error) => {

          var restaurant_id = value[0].restaurant_id;

          var testRestaurant = {
            name:'New test name', address:'Test address', desc:'Test Restaurant', priceRadio: '$$',
            timeFrom0: '10:00', timeTo0: '22:00', timeFrom1: '10:00', timeTo1: '22:00',
            timeFrom2: '10:00', timeTo2: '22:00', timeFrom3: '10:00', timeTo3: '22:00',
            timeFrom4: '10:00', timeTo4: '22:00', timeFrom5: '10:00', timeTo5: '22:00',
            timeFrom6: '10:00', timeTo6: '22:00', tag: [ 'Fast Food', 'Burgers', 'Cornerstone' ]
          };

          var imagePath = './public/Pictures/placeholder.bmp';

          request.post('/admin/edit/' + restaurant_id.toString()).field(testRestaurant).attach('restaurantPic', imagePath).end((err, res) => {
          
            queries.getRestaurantDetail(restaurant_id, (value, error) => {
              
              chai.expect(value[0].name).to.not.equal('New test name');

              done();
            })
          })
        })
      })
    })

    describe('Valid restaurant input', () => {

      it('Should successfully edit restaurant with all fields filled except description', (done) => {

        queries.getLatestRestaurantId((value, error) => {

          var restaurant_id = value[0].restaurant_id;

          var testRestaurant = {
            name:'Test name', address:'Test address', desc:'', priceRadio: '$$',
            timeFrom0: '10:00', timeTo0: '22:00', timeFrom1: '10:00', timeTo1: '22:00',
            timeFrom2: '10:00', timeTo2: '22:00', timeFrom3: '10:00', timeTo3: '22:00',
            timeFrom4: '10:00', timeTo4: '22:00', timeFrom5: '10:00', timeTo5: '22:00',
            timeFrom6: '10:00', timeTo6: '22:00', tag: [ 'Fast Food', 'Burgers', 'Cornerstone' ]
          };

          var imagePath = './public/Pictures/placeholder.jpg';

          request.post('/admin/edit/' + restaurant_id.toString()).field(testRestaurant).attach('restaurantPic', imagePath).end((err, res) => {
          
            queries.getRestaurantDetail(restaurant_id, (value, error) => {
              
              chai.expect(value[0].description).to.equal('');

              done();
            })
          })
        })
      })

      it('Should successfully edit restaurant with all fields filled except open hours', (done) => {

        queries.getLatestRestaurantId((value, error) => {

          var restaurant_id = value[0].restaurant_id;

          var testRestaurant = {
            name:'Test name', address:'Test address', desc:'Test description', priceRadio: '$$',
            timeFrom0: '', timeTo0: '', timeFrom1: '', timeTo1: '',
            timeFrom2: '', timeTo2: '', timeFrom3: '', timeTo3: '',
            timeFrom4: '', timeTo4: '', timeFrom5: '', timeTo5: '',
            timeFrom6: '', timeTo6: '', tag: [ 'Fast Food', 'Burgers', 'Cornerstone' ]
          };

          var imagePath = './public/Pictures/placeholder.jpg';

          request.post('/admin/edit/' + restaurant_id.toString()).field(testRestaurant).attach('restaurantPic', imagePath).end((err, res) => {
          
            queries.getRestaurantDetail(restaurant_id, (value, error) => {
              
              chai.expect(value[0].monday).to.equal('CLOSED');

              done();
            })
          })
        })
      })

      it('Should successfully edit restaurant with all fields filled except tags', (done) => {

        queries.getLatestRestaurantId((value, error) => {

          var restaurant_id = value[0].restaurant_id;

          var testRestaurant = {
            name:'Test name', address:'Test address', desc:'Test description', priceRadio: '$$',
            timeFrom0: '10:00', timeTo0: '22:00', timeFrom1: '10:00', timeTo1: '22:00',
            timeFrom2: '10:00', timeTo2: '22:00', timeFrom3: '10:00', timeTo3: '22:00',
            timeFrom4: '10:00', timeTo4: '22:00', timeFrom5: '10:00', timeTo5: '22:00',
            timeFrom6: '10:00', timeTo6: '22:00', tag: []
          };

          var imagePath = './public/Pictures/placeholder.jpg';

          request.post('/admin/edit/' + restaurant_id.toString()).field(testRestaurant).attach('restaurantPic', imagePath).end((err, res) => {
          
            queries.getRestaurantDetail(restaurant_id, (value, error) => {
              
              chai.expect(value[0].tag).to.be.empty;

              done();
            })
          })
        })
      })

      it('Should successfully edit restaurant with all fields filled and no image provided', (done) => {

        queries.getLatestRestaurantId((value, error) => {

          var restaurant_id = value[0].restaurant_id;

          var testRestaurant = {
            name:'New test name', address:'Test address', desc:'Test description', priceRadio: '$$',
            timeFrom0: '10:00', timeTo0: '22:00', timeFrom1: '10:00', timeTo1: '22:00',
            timeFrom2: '10:00', timeTo2: '22:00', timeFrom3: '10:00', timeTo3: '22:00',
            timeFrom4: '10:00', timeTo4: '22:00', timeFrom5: '10:00', timeTo5: '22:00',
            timeFrom6: '10:00', timeTo6: '22:00', tag: [ 'Fast Food', 'Burgers', 'Cornerstone' ]
          };

          request.post('/admin/edit/' + restaurant_id.toString()).field(testRestaurant).end((err, res) => {
          
            queries.getRestaurantDetail(restaurant_id, (value, error) => {
              
              chai.expect(value[0].name).to.equal('New test name');

              done();
            })
          })
        })
      })

      it('Should successfully edit restaurant with all fields filled', (done) => {

        queries.getLatestRestaurantId((value, error) => {

          var restaurant_id = value[0].restaurant_id;

          var testRestaurant = {
            name:'New test name', address:'New test address', desc:'New test description', priceRadio: '$$$',
            timeFrom0: '11:00', timeTo0: '23:00', timeFrom1: '11:00', timeTo1: '23:00',
            timeFrom2: '11:00', timeTo2: '23:00', timeFrom3: '11:00', timeTo3: '23:00',
            timeFrom4: '11:00', timeTo4: '23:00', timeFrom5: '11:00', timeTo5: '23:00',
            timeFrom6: '11:00', timeTo6: '23:00', tag: [ 'Fast Food', 'Burgers', 'Sandwiches', 'Cornerstone' ]
          };

          request.post('/admin/edit/' + restaurant_id.toString()).field(testRestaurant).end((err, res) => {
          
            queries.getRestaurantDetail(restaurant_id, (value, error) => {
            
              chai.expect(value[0].name).to.equal('New test name');
              chai.expect(value[0].description).to.equal('New test description');
              chai.expect(value[0].address).to.equal('New test address');
              chai.expect(value[0].price).to.equal(3);
              chai.expect(value[0].sunday).to.equal('11:00am-11:00pm');
              chai.expect(value[0].monday).to.equal('11:00am-11:00pm');
              chai.expect(value[0].tuesday).to.equal('11:00am-11:00pm');
              chai.expect(value[0].wednesday).to.equal('11:00am-11:00pm');
              chai.expect(value[0].thursday).to.equal('11:00am-11:00pm');
              chai.expect(value[0].friday).to.equal('11:00am-11:00pm');
              chai.expect(value[0].saturday).to.equal('11:00am-11:00pm');
              chai.expect(value[0].tag).to.include('Sandwiches');

              queries.getLatestRestaurantId((value, error) => {

                var restaurant_id = value[0].restaurant_id;

                request.delete('/admin/delete/' + restaurant_id.toString()).end((err, res) => {

                  done();
                })
              })
            })
          })
        })
      })
    })
  })  

  describe('Test Deleting Restaurants', () => {

    it('Should successfully delete a restaurant', (done) => {

      queries.countRestaurants((value, error) => {

        var beforeCount = value[0].count;

        var testRestaurant = {
            name:'Test name', address:'Test address', desc:'Test description', priceRadio: '$$',
            timeFrom0: '10:00', timeTo0: '22:00', timeFrom1: '10:00', timeTo1: '22:00',
            timeFrom2: '10:00', timeTo2: '22:00', timeFrom3: '10:00', timeTo3: '22:00',
            timeFrom4: '10:00', timeTo4: '22:00', timeFrom5: '10:00', timeTo5: '22:00',
            timeFrom6: '10:00', timeTo6: '22:00', tag: [ 'Fast food', 'Burgers', 'Cornerstone' ]
        };

        var imagePath = './public/Pictures/placeholder.jpg';

        request.post('/admin/add').field(testRestaurant).attach('restaurantPic', imagePath).end((err, res) => {

          queries.getLatestRestaurantId((value, error) => {

            var restaurant_id = value[0].restaurant_id;

            request.delete('/admin/delete/' + restaurant_id.toString()).end((err, res) => {
            
              queries.countRestaurants((value, error) => {

                var afterCount = value[0].count;

                chai.expect(afterCount - beforeCount).to.equal(0);

                done();
              })
            })
          })
        })
      })
    })
  })

  describe('Test Filtering Restaurants', () => {

    it('Should successfully filter the restaurants with one tag', (done) => {

      var tags = ['Burgers'];

      queries.filterRestaurants(tags, (value, error) => {

        value.forEach((val) => {

          chai.expect(val.tag).to.include(tags[0]);

        })

        done();
      })
    })

    it('Should successfully filter the restaurants with more than one tag', (done) => {

      var tags = ['Coffee', 'Cornerstone'];

      queries.filterRestaurants(tags, (value, error) => {

        value.forEach((val) => {

          var includes = false;

          for(var i = 0; i < val.tag.length; i++){
            if(val.tag[i] == tags[0] || val.tag[i] == tags[1]){
              includes = true;
            }
          }

          chai.expect(includes).to.equal(true);

        })
        done();
      })
    })
  })
})
