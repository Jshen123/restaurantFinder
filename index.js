const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const app = express()

// database configuration for knex
const db = require("./lib/db.js");

// import all database queries functions
const queries = require("./lib/queries.js")(db);

// import routes 
const Routes = require("./routes/routes")(queries);


express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/restaurants', (req, res) => res.render('pages/restaurants'))
  .get('/admin', (req, res) => res.render('pages/admin'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

  // var pool = new Pool({
  //   connectionString : process.env.DATABASE_URL
  // })

  app.use("/styles", express.static('css'));
  app.use(express.json());
  app.use(express.urlencoded({extended:false}));
