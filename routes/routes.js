const express = require('express')
const router = express.Router();
const cookieSession = require('cookie-session');

// set-up cookie session
router.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}));


module.exports = function (queries) {

  // rendering the login page
  router.get('/login', function (req, res) {
    res.render('pages/login')
  })


  // authenticate user after submitting login form
  router.post('/login', function (req, res) {

    let username = req.body.username;
    let password = req.body.password;


    queries.Authenticate(username, password, (value) => {
      if (value.length == 0) {
        // let redir = {redirect: "/login"}
        // res.json(redir)
        return res.redirect(401, '/login')
      } else {
        req.session.user_id = value[0].user_id
        // let redir = {redirect: "/"}
        // res.json(redir)
        return res.redirect('/')
      }
    })
  })

  router.get('/', (req, res) => res.render('pages/index'))
  router.get('/restaurants', (req, res) => res.render('pages/restaurants'))
  router.get('/admin', (req, res) => res.render('pages/admin'))
  router.get('/admin/add', (req, res) => res.render('pages/add'))

  return router;
}