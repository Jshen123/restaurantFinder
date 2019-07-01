exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('open_hours').del()
    .then(function () {
      // Inserts seed entries
      return knex('open_hours').insert([
        {
          restaurant_id: 1,
          sunday: '9:00am-10:00pm',
          monday: '7:30am-11:00pm',
          tuesday: '7:30am-11:00pm',
          wednesday: '7:30am-11:00pm',
          thursday: '7:30am-11:00pm',
          friday: '7:30am-11:00pm',
          saturday: '8:00am-11:00pm'
        },
        {
          restaurant_id: 2,
          sunday: 'CLOSED',
          monday: '11:00am-8:00pm',
          tuesday: '11:00am-8:00pm',
          wednesday: '11:00am-8:00pm',
          thursday: '11:00am-8:00pm',
          friday: '11:00am-8:00pm',
          saturday: 'CLOSED'
        },
        {
          restaurant_id: 3,
          sunday: 'CLOSED',
          monday: '11:00am-8:00pm',
          tuesday: '11:00am-8:00pm',
          wednesday: '11:00am-8:00pm',
          thursday: '11:00am-8:00pm',
          friday: '11:00am-8:00pm',
          saturday: '11:00am-8:00pm'
        }
      ]);
    });
};