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
        },
        {
          restaurant_id: 4,
          image_path: "/Pictures/restaurant_4.jpg"
        },
        {
          restaurant_id: 5,
          image_path: "/Pictures/restaurant_5.jpg"
        },
        {
          restaurant_id: 6,
          image_path: "/Pictures/restaurant_6.jpg"
        },
        {
          restaurant_id: 7,
          image_path: "/Pictures/restaurant_7.jpg"
        },
        {
          restaurant_id: 8,
          image_path: "/Pictures/restaurant_8.jpg"
        },
        {
          restaurant_id: 9,
          image_path: "/Pictures/restaurant_9.jpg"
        },
        {
          restaurant_id: 10,
          image_path: "/Pictures/restaurant_10.jpg"
        },
        {
          restaurant_id: 11,
          image_path: "/Pictures/restaurant_11.jpg"
        },
        {
          restaurant_id: 12,
          image_path: "/Pictures/restaurant_12.jpg"
        },
        {
          restaurant_id: 13,
          image_path: "/Pictures/restaurant_13.jpg"
        },
        {
          restaurant_id: 14,
          image_path: "/Pictures/restaurant_14.jpg"
        },
        {
          restaurant_id: 15,
          image_path: "/Pictures/restaurant_15.jpg"
        },
        {
          restaurant_id: 16,
          image_path: "/Pictures/restaurant_16.jpg"
        },
        {
          restaurant_id: 17,
          image_path: "/Pictures/restaurant_17.jpg"
        },
        {
          restaurant_id: 18,
          image_path: "/Pictures/restaurant_18.jpg"
        },
        {
          restaurant_id: 19,
          image_path: "/Pictures/restaurant_19.jpg"
        }
      ]);
    });
};