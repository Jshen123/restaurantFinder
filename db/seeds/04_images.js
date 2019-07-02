exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('images').del()
    .then(function () {
      // Inserts seed entries
      return knex('images').insert([
        {
          restaurant_id: 1,
          image_path: "/Pictures/restaurant_1.jpg"
        },
        {
          restaurant_id: 2,
          image_path: "/Pictures/restaurant_2.jpg"
        },
        {
          restaurant_id: 3,
          image_path: "/Pictures/restaurant_3.jpg"
        }
      ]);
    });
};