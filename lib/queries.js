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
        
      	db.select('restaurant_id', 'name', 'price', 'address', 'description')
      	.from('restaurants').then(done);
      }
    };
}