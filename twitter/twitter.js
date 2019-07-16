const Twitter = require('twitter');
const client = new Twitter({
  consumer_key:        process.env.TWITTER_CONSUMER_KEY,
  consumer_secret:     process.env.TWITTER_CONSUMER_SECRET,
  access_token_key:    process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});
const collection_ID = "custom-1143756982601392130";

// Keywords for tweets
var keywords = require('./keywords.js');
// Following users
var following = require('./following.js');
// Location restriction for tweets
var location = '49.002868,-123.324357' + ',' + '49.457494,-121.645876';

// Function to covert an array of elements into a query string
function searchQueryString(arr) {
  var str = '';
  for (var i=0; i<arr.length-1; i++) {
    str += `${arr[i]},`;
  }
  str += arr[arr.length-1];
  return str;
}

// Function to add tweets
function add_tweet (event) {
  var user_id = event.user.id_str;
  var tweet_id = (event.retweeted_status) ? event.retweeted_status.id_str : event.id_str;
  var not_a_reply = (event.in_reply_to_status_id) ? false : true;

  var params = {id: collection_ID, tweet_id: tweet_id};

  if (following.includes(user_id) && not_a_reply) {
    client.post('collections/entries/add', params, function(error, tweet, response) {
      if(error) throw error;
    });
  }
}

module.exports = function() {
  var params = {
    follow: searchQueryString(following)
  }
  var stream = client.stream('statuses/filter', params);
  stream.on('data', add_tweet);
  stream.on('error', function(error) {
    throw error;
  });
};
