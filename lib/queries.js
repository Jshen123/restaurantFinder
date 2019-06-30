module.exports = function queriesAndFunctions(db) {
    return {
      // authenticate users
      Authenticate: (username, password, done) => {

        db.select('user_id')
        .from('users')
        .where({username:username})
        .andWhere({password:password}).then(done);
      },

      // get restaurant info
      getRestaurants: (done) => {
        
      	db.select('restaurants.restaurant_id', 'name', 'price', 'address', 'description', 'monday')
      	.from('restaurants')
        .join('open_hours', 'restaurants.restaurant_id', '=', 'open_hours.restaurant_id').then(done);
      }
    };
}