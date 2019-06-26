const Twitter = require('twitter');
const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});
const collection_ID = "custom-1143756982601392130";

// Keywords for tweets
var keywords = require('./keywords.js');
// Following users
var following = require('./following.js');
// Location restriction for tweets
var location = '49.002868,-123.324357' + ',' + '49.457494,-121.645876';

// Covert an array of elements into a query string
function searchQueryString(arr) {
  var str = '';
  for (var i=0; i<arr.length-1; i++) {
    str += arr[i] + ',';
  }
  str += arr[arr.length-1];
  return str;
}


function add_tweet (event) {
  console.log("https://twitter.com/statuses/"+event.id_str);
  console.log(event.text);
  
  /*
  client.post('collections/entries/add', {id: collection_ID, tweet_id: event.id_str}, 
    function(error, tweet, response) {
      if(error) throw error;
  });
  */
}

module.exports = function() {
  var params = {
    track: searchQueryString(keywords), 
    follow: searchQueryString(following)
  }
  var stream = client.stream('statuses/filter', params);
  stream.on('data', add_tweet);
  stream.on('error', function(error) {
    throw error;
  });
};