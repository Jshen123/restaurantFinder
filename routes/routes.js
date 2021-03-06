const express = require('express')
const router = express.Router();
const cookieSession = require('cookie-session');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const moment = require('moment-timezone');
const request = require('request');

const multer = require('multer');
const path = require('path');
const fs = require('fs');

// storage engine
const storage = multer.diskStorage({
  destination: './public/Pictures/',
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
})

// initialize upload
const upload = multer({
  storage: storage,
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
  }
}).single('restaurantPic');

function checkFileType(file, cb) {
  // all allowed file extensions (jpg, jpeg, png)
  const allTypes = /jpeg|jpg|png/;

  // check file extension
  const extName = allTypes.test(path.extname(file.originalname).toLowerCase());

  // check file mimetype
  const mimetype = allTypes.test(file.mimetype);

  if (mimetype && extName) {
    return cb(null, true);
  } else {
    cb('Error: JPG, JPEG, or PNG only!');
  }
}

function getPrice(priceString) {
  if (priceString == "$") {
      return 1;
  } else if (priceString == "$$") {
      return 2;
  } else {
      return 3;
  }
}

function convertTime(timeString) {
  if (timeString == "") {
      return "";
  }

  var hour = parseInt(timeString.substring(0, 2));
  var minute = timeString.substring(3, 5);

  if (hour <= 12) {
      amPm = "am";
      if (hour == 0) {
          hour += 12;
      }
      convHour = hour.toString()
  }

  else {
      amPm = "pm";
      convHour = (hour - 12).toString()
  }

  return convHour + ":" + minute + amPm;
}

function convertForm(form) {
  var numRating = getPrice(form.priceRadio);

  var hours = new Array(7);
  for (i = 0; i < hours.length; i++) {
    var fromId = 'timeFrom' + i.toString();
    var toId = 'timeTo' + i.toString();

    initTimeFrom = form[fromId];
    initTimeTo = form[toId];

    fromTime = convertTime(initTimeFrom);
    toTime = convertTime(initTimeTo);

    if (fromTime != "" && toTime != "" && fromTime == toTime) {
        restaurantHours = "OPEN";
    } else if (fromTime != "" && toTime != "") {
        restaurantHours = fromTime + "-" + toTime;
    } else {
        restaurantHours = "CLOSED";
    }

    hours[i] = restaurantHours;
  }

  var restData = {
      name: form.name,
      address: form.address,
      description: form.desc,
      price: numRating,
      sunday: hours[0],
      monday: hours[1],
      tuesday: hours[2],
      wednesday: hours[3],
      thursday: hours[4],
      friday: hours[5],
      saturday: hours[6]
  }

  return restData;
}

// set-up cookie session
router.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}));

module.exports = function (queries, io) {

  const restaurants_io = io.of('/restaurants');
  restaurants_io.on('connection', function(socket) {
    //console.log("We have a new client: " + socket.id);

    socket.on('joinRoom', function(room_id) {
      // Join a room for a specific restaurant
      socket.join(room_id);
      //console.log(`Client ${socket.id} has joined room ${room_id}`);
    });

    socket.on('disconnect', function() {
      //console.log("Client has disconnected");
    });
  });

  //redirect '/' to '/restaurants'
  router.get('/', function(req, res){
    return res.redirect('/restaurants');
  })

  router.get('/user', function(req, res){
    var user_info = {user_id: req.session.user_id, username: req.session.username}

    res.json(user_info);
  })

  // rendering the login page
  router.get('/login', function (req, res) {
    const username = req.session.username;
    const err_msg = req.session.msg;

    // resets session variables
    req.session.username = null;
    req.session.msg = null;

    if (req.session.user_id != null){
      return res.redirect('/');
    } else {
      const payload = {username: username, err_msg: err_msg};
      return res.render('pages/login', payload);
    }
  })

  router.get('/register', function (req, res) {
    const err_msg = req.session.msg;
    req.session.msg = null;   // resets session variables

    return res.render('pages/register', {err_msg: err_msg});
  })


  router.post('/register', function (req, res) {
    const username = req.body.username;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const hash = bcrypt.hashSync(password, saltRounds);

    const acceptedChars = /[^a-zA-Z0-9\-\_]/

    if (!username.length) {
      req.session.msg = 'Please enter in a username.';
      return res.redirect('/register');
    } else if (username.length > 25) {
      req.session.msg = 'The username you entered is too long.';
      return res.redirect('/register');
    } else if (!password.length) {
      req.session.msg = 'Please enter in a password.';
      return res.redirect('/register');
    } else if (password != confirmPassword) {
      req.session.msg = 'The password you entered does not match your confirm password.';
      return res.redirect('/register');
    } else if (acceptedChars.test(username)) {
      req.session.msg = 'Username contains non-alphanumeric characters or non-hyphen or underscore characters'
      return res.redirect('/register');
    } else {
      queries.verifyUsername(username, (value) => {
        if (value.length == 0) {
          // username is unique
          queries.register(username, hash, (value) => {
            if (value.length != 0) {
              // Registration success
              req.session.user_id = value[0].user_id;
              req.session.username = value[0].username;
              req.session.msg = null;
              return res.redirect('/');
            } else {
              // Registration failed
              req.session.msg = 'Registration failed';
              return res.redirect('/register');
            }
          })
        } else {
          // username has already been taken
          req.session.msg = `The username '${username}' has already been taken.`;
          return res.redirect('/register');
        }
      });
    }

  })

  // authenticate user after submitting login form
  router.post('/login', function (req, res) {

    const username = req.body.username;
    const password = req.body.password;
    req.session.username = username;

    try{
      if (!username.length) {
        req.session.msg = 'Please enter in a username.';
        return res.redirect('/login');
      } else if (username.length > 25) {
        req.session.msg = 'The username you entered is too long.';
        return res.redirect('/login');
      } else if (!password.length) {
        req.session.msg = 'Please enter in a password.';
        return res.redirect('/login');

      } else {
        queries.Authenticate(username, (value) => {
          if (value.length != 0) {
            // Username exist
            const hash = value[0].password;
            if(bcrypt.compareSync(password, hash)){
              // Correct password
              req.session.user_id = value[0].user_id;
              req.session.username = value[0].username;
              req.session.msg = null;
              return res.redirect('/');
            } else {
              // Incorrect password
              req.session.msg = 'Incorrect username or password.';
              return res.redirect('/login');
            }
          } else {
            // No such username
            req.session.msg = 'Incorrect username or password.';
            return res.redirect('/login');
          }
        })
      }
    } catch(e) {
      // Error
      req.session.msg = 'Error';
      return res.redirect('/login');
    }


  })

  router.post('/logout', function(req, res){
    req.session.user_id = null;
    req.session.username = null;
    return res.redirect('/')
  })


  // rendering the restaurant page
  router.get('/restaurants', (req, res) => {
    const today = moment().tz("America/Vancouver")
    const weekdays = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday']
    const day = weekdays[today.day()]   // determine which day of the week

    const tags = (typeof(req.query.tag) === 'string') ? [req.query.tag] : req.query.tag;

    if (!tags) {
      // default get '/restaurants' with no query string
      queries.getRestaurants(render_page);

    } else {
      // filter restaurants with tags
      queries.filterRestaurants(tags, render_page);
    }

    // function to get the payload for rendering the page
    function render_page(value) {
      const payload = {
        user_id: req.session.user_id,
        open:[],
        closed:[],
        tagMsg: tags
      };

      value.forEach(function(val) {
        if (val[day] == 'CLOSED'){
          payload.closed.push(val)
        } else if (val[day] == 'OPEN') {
          payload.open.push(val)
        } else {
          const businessHours = val[day].split("-")
          const startHour = moment(businessHours[0], "LT").tz("America/Vancouver")
          const endHour = moment(businessHours[1], "LT").tz("America/Vancouver")

          if (today.isBetween(startHour, endHour) || today.isSame(startHour) || today.isSame(endHour) || endHour.isBefore(startHour)){
            payload.open.push(val)
          } else {
            payload.closed.push(val)
          }
        }
      })

      return res.render('pages/restaurants', payload);
    }

  })


  // rendering the admin page
  router.get('/admin', (req, res) => {

    if (req.session.user_id == null){
      return res.redirect('/')
    }

    queries.verifyAdmin(req.session.user_id, (value) => {
      const admin = value[0].admin;

      if (admin == false){
        return res.redirect('/');
      } else {
        queries.getRestaurants((value) => {
            res.render('pages/admin', {value:value, user_id: req.session.user_id})
        })
      }
    })
  })


  router.get('/admin/add', (req, res) => {

    const err_msg = req.session.msg;
    req.session.msg =null;

    queries.verifyAdmin(req.session.user_id, (value) => {
      const admin = value[0].admin;

      if (admin == false){
        return res.redirect('/');
      } else {
        res.render('pages/add', {user_id: req.session.user_id, err_msg: err_msg});
      }
    })

  })

  router.post('/admin/add', (req, res) => {

    upload(req, res, (err) => {
      if (err) {
        res.send("Invalid image.");
      } else {
        // Do not allow for restaurants with no image file
        if (typeof req.file === "undefined") {
          imgName = 'placeholder.jpg'
        } else {
          imgName = req.file.filename;
        }

        var restData = convertForm(req.body);

        const name = restData.name;
        const address = restData.address;
        const description = restData.description;
        const price = restData.price;
        const sunday = restData.sunday;
        const monday = restData.monday;
        const tuesday = restData.tuesday;
        const wednesday = restData.wednesday;
        const thursday = restData.thursday;
        const friday = restData.friday;
        const saturday = restData.saturday;

        if (name == "" || address == ''){
          req.session.msg = "Please include a valid restaurant name and address"
          return res.redirect('/admin/add')
        }

        const tagVar = req.body.tag
        // Restaurant has multiple tags
        if (Array.isArray(tagVar)) {
          tags = tagVar;
        }

        // No tags
        else if (typeof tagVar === "undefined") {
          tags = [];
        }

        // One tag
        else {
          tags = [ tagVar ];
        }

        queries.addRestaurant(name, price, address, description, tags, (value, error) => {

          queries.getLatestRestaurantId((value, error) => {

            const restaurant_id = value[0].restaurant_id;

            queries.addOpenHours(restaurant_id, sunday, monday, tuesday, wednesday, thursday, friday, saturday, (value, error) => {

              const image_path = "/Pictures/" + imgName;

              queries.addImage(restaurant_id, image_path, (value, error) => {

                return res.redirect('/admin/add');
              })
            })
          })
        })
      }
    })
  })

  router.post('/admin/edit/:id', (req, res) => {
    upload(req, res, (err) => {
      if (err) {
        res.send("Invalid image.");
      } else {
        const restaurant_id = req.params.id;

        if (typeof req.file !== "undefined") {
          // delete image file from directory so we can replace it
          queries.getImagePath(restaurant_id, (value) => {
            var imgPath = "./public" + value[0].image_path;

            fs.unlink(imgPath, function(e) {
              if (e) {
                // console.log("image deletion failed");
              } else {
                // console.log("image successfully deleted");
              }
            });
          })

          var imgName = req.file.filename;
          var newPath = "/Pictures/" + imgName;
        }

        var restData = convertForm(req.body);

        const name = restData.name;
        const address = restData.address;
        const description = restData.description;
        const price = restData.price;
        const sunday = restData.sunday;
        const monday = restData.monday;
        const tuesday = restData.tuesday;
        const wednesday = restData.wednesday;
        const thursday = restData.thursday;
        const friday = restData.friday;
        const saturday = restData.saturday;

        const tagVar = req.body.tag

        if (name == "" || address == ''){
          req.session.msg = "Please include a valid restaurant name and address"
          return res.redirect(`/admin/edit/${restaurant_id}`)
        }

        // Restaurant has multiple tags
        if (Array.isArray(tagVar)) {
          tags = tagVar;
        }

        // No tags
        else if (typeof tagVar === "undefined") {
          tags = [];
        }

        // One tag
        else {
          tags = [ tagVar ];
        }

        queries.updateRestaurant(restaurant_id, name, price, address, description, tags, (value, error) => {

          queries.updateOpenHours(restaurant_id, sunday, monday, tuesday, wednesday, thursday, friday, saturday, (value, error) => {

            if (typeof req.file !== "undefined") {
              queries.updateImagePath(restaurant_id, newPath, (value, error) => {
                return res.redirect('/admin');
              })
            }

            else {
              return res.redirect('/admin');
            }

          })
        })
      }
    })
  })

  router.delete('/admin/delete/:id', (req, res) => {
    const restaurant_id = req.params.id;

    // get image_path so we know what file to delete
    queries.getImagePath(restaurant_id, (value) => {
      var imgPath = "./public" + value[0].image_path;

      // delete image file from directory
      fs.unlink(imgPath, function(e) {
        if (e) {
          // console.log("image deletion failed");
        } else {
          // console.log("image successfully deleted");
        }
      });
    })

    queries.deleteRestaurant(restaurant_id, (value, error) => {
      if (error) {
        return res.send({err: true, msg: 'Failed to delete restaurant.'});
      }
      return res.send({err: false, msg: 'Successfully deleted restaurant.'});
    })
  })

  router.get('/restaurants/:id', (req, res) => {
    const restaurant_id = req.params.id
    queries.getRestaurantDetail(restaurant_id, (value, error) => {

      const restaurants = value;
      const sortOrder = {clause: 'create_date', order: 'desc'};

      queries.getComments(restaurant_id, sortOrder, (value, error) => {
        const comments = value;

        // parse create_date
        var months = ['January', "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        for (var i=0; i<comments.length; i++) {
          let date = comments[i].create_date.getDate(),
              month = comments[i].create_date.getMonth(),
              year = comments[i].create_date.getFullYear();
          comments[i].create_date = `${months[month]} ${date}, ${year}`;
        }

        const payload = {
                          value: restaurants,
                          comments: comments,
                          user_id: req.session.user_id,
                          username: req.session.username
                        }
        res.render('pages/details', payload);
      })
    })
  })

  router.post('/comments/:id', (req, res) => {
    const restaurant_id = req.params.id;
    const user_id = req.session.user_id;
    const username = req.session.username;
    var captcha_verified = req.session.captcha_verified;

    req.session.captcha_verified = false;

    const {rating, create_date, comment, captcha} = req.body;

    if (!comment.replace(/\s/g, '').length) {
      // empty review
      return res.send({err: true, msg: 'Please filled in something to comment!'});

    } else if (!rating) {
      // no rating
      return res.send({err: true, msg: 'Please enter in a rating.'});

    } else if (!username || !user_id) {
      // no username
      return res.send({err: true, msg: 'Please login to post a comment.'});

    } else if (!captcha) {
      // capthca not selected
      return res.send({err: true, msg: 'Please select captcha.'});

    } else {
      queries.verifyAdmin(user_id, (value) => {
        if (value[0].admin) {
          captcha_verified = true;
        }
        postComment();
      });
    }

    function postComment() {
      const secretKey = process.env.CAPTCHA_SECRET_KEY;
      const verifyUrl = `https://google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captcha}&remoteip=${req.connection.remoteAddress}`;

      request(verifyUrl, (error, respond, body) => {
        var body = JSON.parse(body);

        if(body.success !== undefined && !body.success && !captcha_verified) {
          // failed captcha
          return res.send({err: true, msg: 'Failed captcha verification.'});

        } else {
          // captcha verified
          req.session.captcha_verified = true;

          // add comment into database
          queries.postComment(restaurant_id, user_id, rating, comment, (value, error) => {
            if (error) {
              // failed to add comment
              return res.send({err: true, msg: 'Failed to post the comment.'});

            } else {
              // send new comments to all clients in the same page
              restaurants_io.to(restaurant_id).emit('new_comment', {
                username: username,
                rating: rating,
                create_date: create_date,
                comment: comment
              });

              return res.send({err: false, msg: 'success'});
            }
          });
        }
      });
    }

  });

  // get comments in a sorted order
  router.post('/sort_comments/:id', (req, res) => {
    const restaurant_id = req.params.id;
    const sortOrder = req.body;

    if (!sortOrder.clause || !sortOrder.order) {
      // null values
      return res.send(null);

    } else {
      queries.getComments(restaurant_id, sortOrder, (value, error) => {
        if (error) {
          // error getting comments
          return res.send(null);

        } else {
          const comments = value;

          // parse create_date
          var months = ['January', "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
          for (var i=0; i<comments.length; i++) {
            let date = comments[i].create_date.getDate(),
                month = comments[i].create_date.getMonth(),
                year = comments[i].create_date.getFullYear();
            comments[i].create_date = `${months[month]} ${date}, ${year}`;
          }

          // return sorted comments
          return res.send(comments);
        }
      });
    }

  });

  router.get('/admin/edit/:id', (req, res) => {
    const restaurant_id = req.params.id

    const err_msg = req.session.msg;
    req.session.msg =null;

    queries.getRestaurantDetail(restaurant_id, (value, error) => {

      const restaurants = value;

      const payload = {
                        value: restaurants,
                        user_id: req.session.user_id,
                        username: req.session.username,
                        err_msg: err_msg
                      }

      res.render('pages/edit', payload);
    })
  })

  return router;
}
