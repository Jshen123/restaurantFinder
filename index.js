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


const server = app.listen(PORT, () => {
  const address = server.address();
});

// socket.io
const io = require('socket.io')(server);

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
const Routes = require("./routes/routes.js")(queries, io);

// Twitter API
const Twitter = require("./twitter/twitter.js");
Twitter();

app.use('/', Routes);

app.get('/', (req, res) => res.render('pages/index'));

app.locals.fromTime24 = (timeString) => {
  if (timeString == "OPEN") {
    return "00:00";
  } else if (timeString == "CLOSED") {
    return "";
  }

  var end = 0;
  while (timeString[end] != "-") {
    end++;
  }
  var fromString = timeString.substring(0, end);

  var end2 = 0;
  while  (fromString[end2] != ":") {
    end2++;
  }

  var hour = fromString.substring(0, end2);
  var ampm = fromString.substring(fromString.length - 2, fromString.length);
  var minute = fromString.substring(end2 + 1, end2 + 3);

  var numHour = parseInt(hour);

  if (ampm == "pm") {
    var numConvHour = numHour + 12;
    var convHour = numConvHour.toString();
  } else {
    convHour = hour;
  }

  if (convHour.length == 1) {
    convHour = "0" + convHour;
  }

  return convHour + ":" + minute;
}

app.locals.toTime24 = (timeString) => {
  if (timeString == "OPEN") {
    return "00:00";
  } else if (timeString == "CLOSED") {
    return "";
  }

  var end = 0;
  while (timeString[end] != "-") {
    end++;
  }

  var toString = timeString.substring(end + 1, timeString.length);
  
  var end2 = 0;
  while  (toString[end2] != ":") {
    end2++;
  }

  var hour = toString.substring(0, end2);
  var ampm = toString.substring(toString.length - 2, toString.length);
  var minute = toString.substring(end2 + 1, end2 + 3);

  var numHour = parseInt(hour);

  if (ampm == "pm") {
    var numConvHour = numHour + 12;
    var convHour = numConvHour.toString();
  } else {
    convHour = hour;
  }

  if (convHour.length == 1) {
    convHour = "0" + convHour;
  }

  return convHour + ":" + minute;
}

module.exports = app;