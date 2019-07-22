exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('images').del()
    .then(function () {
      // Inserts seed entries
      return knex('images').insert([
        {
          restaurant_id: 1,
          image_path: "/Pictures/restaurant_1.jpg"
        }
        // {
        //   restaurant_id: 2,
        //   image_path: "/Pictures/restaurant_2.jpg"
        // },
        // {
        //   restaurant_id: 3,
        //   image_path: "/Pictures/restaurant_3.jpg"
        // },
        // {
        //   restaurant_id: 4,
        //   image_path: "/Pictures/restaurant_4.jpg"
        // },
        // {
        //   restaurant_id: 5,
        //   image_path: "/Pictures/restaurant_5.jpg"
        // },
        // {
        //   restaurant_id: 6,
        //   image_path: "/Pictures/restaurant_6.jpg"
        // },
        // {
        //   restaurant_id: 7,
        //   image_path: "/Pictures/restaurant_7.jpg"
        // },
        // {
        //   restaurant_id: 8,
        //   image_path: "/Pictures/restaurant_8.jpg"
        // },
        // {
        //   restaurant_id: 9,
        //   image_path: "/Pictures/restaurant_9.jpg"
        // },
        // {
        //   restaurant_id: 10,
        //   image_path: "/Pictures/restaurant_10.jpg"
        // },
        // {
        //   restaurant_id: 11,
        //   image_path: "/Pictures/restaurant_11.jpg"
        // },
        // {
        //   restaurant_id: 12,
        //   image_path: "/Pictures/restaurant_12.jpg"
        // },
        // {
        //   restaurant_id: 13,
        //   image_path: "/Pictures/restaurant_13.jpg"
        // },
        // {
        //   restaurant_id: 14,
        //   image_path: "/Pictures/restaurant_14.jpg"
        // },
        // {
        //   restaurant_id: 15,
        //   image_path: "/Pictures/restaurant_15.jpg"
        // },
        // {
        //   restaurant_id: 16,
        //   image_path: "/Pictures/restaurant_16.jpg"
        // },
        // {
        //   restaurant_id: 17,
        //   image_path: "/Pictures/restaurant_17.jpg"
        // },
        // {
        //   restaurant_id: 18,
        //   image_path: "/Pictures/restaurant_18.jpg"
        // },
        // {
        //   restaurant_id: 19,
        //   image_path: "/Pictures/restaurant_19.jpg"
        // },
        // {
        //   restaurant_id: 20,
        //   image_path: "/Pictures/restaurant_20.jpg"
        // },
        // {
        //   restaurant_id: 21,
        //   image_path: "/Pictures/restaurant_21.jpg"
        // },
        // {
        //   restaurant_id: 22,
        //   image_path: "/Pictures/restaurant_22.jpg"
        // },
        // {
        //   restaurant_id: 23,
        //   image_path: "/Pictures/restaurant_23.jpg"
        // },
        // {
        //   restaurant_id: 24,
        //   image_path: "/Pictures/restaurant_24.jpg"
        // },
        // {
        //   restaurant_id: 25,
        //   image_path: "/Pictures/restaurant_25.jpg"
        // },
        // {
        //   restaurant_id: 26,
        //   image_path: "/Pictures/restaurant_26.jpg"
        // },
        // {
        //   restaurant_id: 27,
        //   image_path: "/Pictures/restaurant_27.jpg"
        // },
        // {
        //   restaurant_id: 28,
        //   image_path: "/Pictures/restaurant_28.jpg"
        // },
        // {
        //   restaurant_id: 29,
        //   image_path: "/Pictures/restaurant_29.jpg"
        // },
        // {
        //   restaurant_id: 30,
        //   image_path: "/Pictures/restaurant_30.jpg"
        // },
        // {
        //   restaurant_id: 31,
        //   image_path: "/Pictures/restaurant_31.jpg"
        // },
        // {
        //   restaurant_id: 32,
        //   image_path: "/Pictures/restaurant_32.jpg"
        // },
        // {
        //   restaurant_id: 33,
        //   image_path: "/Pictures/restaurant_33.jpg"
        // },
        // {
        //   restaurant_id: 34,
        //   image_path: "/Pictures/restaurant_34.jpg"
        // }
      ]);
    });
};