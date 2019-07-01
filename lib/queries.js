module.exports = function queriesAndFunctions(db) {
    return {
      // authenticate users
      Authenticate: (username, done) => {

        db.select('password', 'user_id')
        .from('users')
        .where({username:username})
        .then(done);
      },

      register: (username, password,done) => {


          db.insert({username:username, password:password, admin:false})
          .into('users')
          .returning('user_id')
          .into('users')
          .then(done)

 
      },

      verifyAdmin: (userId, done) => {

        db.select('admin')
        .from('users')
        .where({user_id:userId})
        .andWhere({admin: true}).then(done);
      },

      // get restaurant info
      getRestaurants: (done) => {
        
      	db.select('restaurant_id', 'name', 'price', 'address', 'description')
      	.from('restaurants').then(done);
      }
    };
}