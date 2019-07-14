module.exports = function queriesAndFunctions(db) {
    return {
      // authenticate users
      Authenticate: (username, done) => {

        db.select('password', 'user_id', 'username')
        .from('users')
        .where({username:username})
        .then(done)

      },

      register: (username, password,done) => {


        db.insert({username:username, password:password, admin:false})
        .into('users')
        .returning(['user_id', 'username'])
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
        
      	db.select('restaurants.restaurant_id', 'name', 'price', 'address', 'type', 'description', 'sunday',
         'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'image_path')
      	.from('restaurants')
        .join('open_hours', 'restaurants.restaurant_id', '=', 'open_hours.restaurant_id')
        .join('images', 'restaurants.restaurant_id', '=', 'images.restaurant_id').then(done);
      },

      // delete restauraunt
      deleteRestaurant: (restaurantId, done) => {

        db.from('restaurants')
         .where({"restaurants.restaurant_id": restaurantId})
         .del()
         .then(done)
      },

      // get specific restaurant
      getRestaurantDetail: (restaurantId, done, error) => {

        db.select('restaurants.restaurant_id', 'name', 'price', 'address', 'type', 'description', 'sunday',
        'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'image_path')
        .from('restaurants')
        .join('open_hours', 'restaurants.restaurant_id', '=', 'open_hours.restaurant_id')
        .join('images', 'restaurants.restaurant_id', '=', 'images.restaurant_id')
        .where({"restaurants.restaurant_id": restaurantId })
        .then(done)
      },

      //get comments for specified restaurant
      getComments: (restaurantId, sortOrder, done, error) => {

        db.select('comment', 'rating', 'create_date', 'username')
        .from('comments')
        .join('restaurants', 'restaurants.restaurant_id', '=', 'comments.restaurant_id')
        .join('users', 'users.user_id', '=', 'comments.user_id')
        .where({"restaurants.restaurant_id": restaurantId })
        .orderBy(sortOrder.clause, sortOrder.order)
        .then(done)
      },

      //insert comment into database
      postComment: (restaurantId, userId, rating, comment,done) => {

        db.insert({restaurant_id:restaurantId, user_id: userId, rating:rating, comment:comment})
        .into('comments')
        .then(done)

      },

    };
}