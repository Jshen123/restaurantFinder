exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('comments').del()
    .then(function () {
      // Inserts seed entries
      return knex('comments').insert([
        {
          restaurant_id: 1,
          user_id:2,
          comment:'Etiam urna erat, blandit vel vulputate eu, pellentesque at nulla. Nullam hendrerit eros lorem, at eleifend quam pellentesque non. Cras eu commodo dolor.',
          rating: 4,
        },
        {
          restaurant_id: 2,
          user_id:2,
          comment:'Etiam urna erat, blandit vel vulputate eu, pellentesque at nulla. Nullam hendrerit eros lorem, at eleifend quam pellentesque non. Cras eu commodo dolor.',
          rating: 3,
        },
        {
          restaurant_id: 3,
          user_id:2,
          comment:'Etiam urna erat, blandit vel vulputate eu, pellentesque at nulla. Nullam hendrerit eros lorem, at eleifend quam pellentesque non. Cras eu commodo dolor.',
          rating: 2,
        },
        {
          restaurant_id: 1,
          user_id:3,
          comment:'Ut suscipit nisl eget consequat interdum. Quisque venenatis vestibulum ligula, nec consectetur mi tempor at. Mauris volutpat condimentum malesuada.',
          rating: 1,
        },
        {
          restaurant_id: 2,
          user_id:3,
          comment:'Ut suscipit nisl eget consequat interdum. Quisque venenatis vestibulum ligula, nec consectetur mi tempor at. Mauris volutpat condimentum malesuada.',
          rating: 5,
        },
        {
          restaurant_id: 3,
          user_id:3,
          comment:'Ut suscipit nisl eget consequat interdum. Quisque venenatis vestibulum ligula, nec consectetur mi tempor at. Mauris volutpat condimentum malesuada.',
          rating: 4,
        },
        {
          restaurant_id: 1,
          user_id:2,
          comment:'Sed magna lorem, venenatis vitae auctor tempus, tincidunt mattis velit. Donec aliquet, lectus nec sollicitudin interdum, nisl tellus rutrum justo, in luctus augue purus ac nulla.',
          rating: 3,
        },
        {
          restaurant_id: 2,
          user_id:3,
          comment:'Sed magna lorem, venenatis vitae auctor tempus, tincidunt mattis velit. Donec aliquet, lectus nec sollicitudin interdum, nisl tellus rutrum justo, in luctus augue purus ac nulla.',
          rating: 2,
        },
        {
          restaurant_id: 3,
          user_id:3,
          comment:'Sed magna lorem, venenatis vitae auctor tempus, tincidunt mattis velit. Donec aliquet, lectus nec sollicitudin interdum, nisl tellus rutrum justo, in luctus augue purus ac nulla.',
          rating: 1,
        }
      ]);
    });
};