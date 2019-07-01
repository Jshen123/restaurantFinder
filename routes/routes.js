const express = require('express')
const router = express.Router();
const cookieSession = require('cookie-session');
const bcrypt = require('bcrypt');
const saltRounds = 10;


// set-up cookie session
router.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}));


module.exports = function (queries) {

  //redirect '/' to '/restaurants'
  router.get('/', function(req, res){
    res.redirect('/restaurants');
  })

  // rendering the login page
  router.get('/login', function (req, res) {
    if (req.session.user_id != null){
      return res.redirect('/');
    } else {
      const payload = {user_id: req.session.user_id}
      res.render('pages/login', payload)
    }
  })

  router.get('/register', function (req, res) {
    res.render('pages/register')
  })

  router.post('/register', function (req, res) {
    const username = req.body.username;
    const password = req.body.password;
    const hash = bcrypt.hashSync(password, saltRounds);

    queries.register(username, hash, (value) => {
      if (value.length != 0) {
        req.session.user_id = value[0].user_id
        return res.redirect('/')
      } else {
        return res.redirect('/login')
      }
    })   

  })

  // authenticate user after submitting login form
  router.post('/login', function (req, res) {

    const username = req.body.username;
    const password = req.body.password;

    queries.Authenticate(username, (value) => {

      if (value.length != 0) {
        const hash = value[0].password;
        if(bcrypt.compareSync(password, hash)){
          req.session.user_id = value[0].user_id
          return res.redirect('/')
        } else {
        return res.redirect('/login')
        }
      }
    })
  })

  router.post('/logout', function(req, res){
    req.session.user_id = null ;
    res.redirect('/')
  })


  // rendering the restaurant page
  router.get('/restaurants', (req, res) => {

		queries.getRestaurants((value) => {
			if (value.length == 0){
				return res.redirect('/restaurants')
			} else {
        const payload = {user_id: req.session.user_id, value:value};
				res.render('pages/restaurants', payload)
			}
    })
    
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
          if (value.length == 0){
            return res.redirect('/admin')
          } else {
            res.render('pages/admin', {value:value})
          }
        })
      }
    })

	})

  
  router.get('/admin/add', (req, res) => {

    if (req.session.user_id == null){
      return res.redirect('/')
    }

    queries.verifyAdmin(req.session.user_id, (value) => {
      const admin = value[0].admin;
      // console.log(admin)
      if (admin == false){
        return res.redirect('/');
      } else {
        res.render('pages/add');
      }
    })    

    
  })

  return router;
}