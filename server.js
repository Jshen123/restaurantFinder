const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const app = express()

//middle-ware
const cookieSess = require('cookie-session');


app.use(express.static(__dirname + '/public'))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')


app.use("/styles", express.static('css'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

// database configuration for knex
const db = require("./lib/db.js");
// import all database queries functions
const queries = require("./lib/queries.js")(db);
// import routes 
const Routes = require("./routes/routes.js")(queries);

// Set up twitter's api
const Twitter = require("./twitter/twitter.js");
Twitter();


app.use('/', Routes);

app.get('/', (req, res) => res.render('pages/index'))


const server = app.listen(PORT, () => {
  const address = server.address();
});


