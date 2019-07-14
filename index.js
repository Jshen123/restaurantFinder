const express = require('express')
const path = require('path')
const cors = require('cors')
const PORT = process.env.PORT || 5000
const app = express()

//middle-ware
const cookieSess = require('cookie-session');


app.use(express.static(__dirname + '/public'))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use('/', cors())
app.use("/styles", express.static('css'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));


// database configuration for knex
// if something else isn't setting ENV, use development
const environment = process.env.NODE_ENV || 'development';
// require environment's settings from knexfile
const configuration = require('./knexfile')[environment];
// connect to DB via knex using env's settings
const db = require('knex')(configuration);              
// import all database queries functions
const queries = require("./lib/queries.js")(db);
// import routes
const Routes = require("./routes/routes.js")(queries);

// Twitter API
// const Twitter = require("./twitter/twitter.js");
// Twitter();

app.use('/', Routes);

app.get('/', (req, res) => res.render('pages/index'))


const server = app.listen(PORT, () => {
  const address = server.address();
});

module.exports = app;
