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

      verifyUsername: (username, done) => {

        db.select('username')
        .from('users')
        .where({username:username})
        .then(done);
      },

      verifyAdmin: (userId, done) => {

        db.select('admin')
        .from('users')
        .where({user_id:userId})
        .andWhere({admin: true}).then(done);
      },

      // get restaurant info
      getRestaurants: (done) => {
        
      	db.select('restaurants.restaurant_id', 'name', 'price', 'address', 'tag', 'description', 'sunday',
         'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'image_path')
      	.from('restaurants')
        .join('open_hours', 'restaurants.restaurant_id', '=', 'open_hours.restaurant_id')
        .join('images', 'restaurants.restaurant_id', '=', 'images.restaurant_id')
        .orderBy('name')
        .then(done);
      },

      filterRestaurants: (tags, done) => {

        var query = db.select('restaurants.restaurant_id', 'name', 'price', 'address', 'tag', 'description', 'sunday',
                       'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'image_path')
                      .from('restaurants')
                      .join('open_hours', 'restaurants.restaurant_id', '=', 'open_hours.restaurant_id')
                      .join('images', 'restaurants.restaurant_id', '=', 'images.restaurant_id');

        for(var i = 0; i < tags.length; i++){
          query.where(db.raw('\'' + tags[i] + '\' = any (tag)'));
        }
        
        query.orderBy('name')
        query.then(done);
      },

      // get specific restaurant
      getRestaurantDetail: (restaurantId, done, error) => {
          
        db.select('restaurants.restaurant_id', 'name', 'price', 'address', 'tag', 'description', 'sunday',
         'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'image_path')
        .from('restaurants')
        .join('open_hours', 'restaurants.restaurant_id', '=', 'open_hours.restaurant_id')
        .join('images', 'restaurants.restaurant_id', '=', 'images.restaurant_id')
        .where({"restaurants.restaurant_id": restaurantId })
        .then(done)
      },

      // insert restaurant info into restaurants table
      addRestaurant: (name, price, address, description, tags, done) => {

        db.insert({name:name, price:price, address:address, description:description, tag:tags})
         .into('restaurants')
         .then(done)
      },

      // gets the ID of the latest restaurant added
      getLatestRestaurantId: (done) => {

        db.select('restaurant_id')
         .from('restaurants')
         .orderBy('restaurant_id', 'desc')
         .limit(1)
         .then(done)
      },

      // counts the number of restaurants in the restaurants table
      countRestaurants: (done) => {

        db.count('restaurant_id')
         .from('restaurants')
         .then(done)
      },

      // insert open hours to open hours table
      addOpenHours: (restaurantId, sunday, monday, tuesday, wednesday, thursday, friday, saturday, done) => {

        db.insert({restaurant_id:restaurantId, sunday:sunday, monday:monday, tuesday:tuesday,
         wednesday:wednesday, thursday:thursday, friday:friday, saturday:saturday})
         .into('open_hours')
         .then(done)
      },

      // insert image path to images table
      addImage: (restaurantId, imagePath, done) => {

        db.insert({restaurant_id:restaurantId, image_path:imagePath})
         .into('images')
         .then(done)
      },

      // get image path from images table
      getImagePath: (restaurantId, done) => {
        db.select('image_path')
          .from('images')
          .where({'images.restaurant_id': restaurantId})
          .then(done)
      },

      // update restaurant's attributes based on restaurant id
      updateRestaurant: (restaurantId, name, price, address, description, tags, done) => {

        db.from('restaurants')
         .where({restaurant_id:restaurantId})
         .update({name:name, price:price, address:address, description:description, tag:tags})
         .then(done)
      },

      // update restaurant's open hours based on restaurant id
      updateOpenHours: (restaurantId, sunday, monday, tuesday, wednesday, thursday, friday, saturday, done) => {

        db.from('open_hours')
         .where({restaurant_id:restaurantId})
         .update({sunday:sunday, monday:monday, tuesday:tuesday, wednesday:wednesday,
          thursday:thursday, friday:friday, saturday:saturday})
         .then(done)
      },

      updateImagePath: (restaurantId, newPath, done) => {
        db.from('images')
          .where({restaurant_id:restaurantId})
          .update({image_path:newPath})
          .then(done)
      },

      // delete restauraunt
      deleteRestaurant: (restaurantId, done) => {

        db.from('restaurants')
         .where({"restaurants.restaurant_id": restaurantId})
         .del()
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
      postComment: (restaurantId, userId, rating, comment, done) => {

        db.insert({restaurant_id:restaurantId, user_id: userId, rating:rating, comment:comment})
        .into('comments')
        .then(done)
      },

      // counts the number of comments on a specific restaurant's page
      countComments: (restaurantId, done) => {

        db.count('comment_id')
         .from('comments')
         .where({'comments.restaurant_id':restaurantId})
         .then(done)
      }

    };
}