exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('open_hours').del()
    .then(function () {
      // Inserts seed entries
      return knex('open_hours').insert([
        {
          sunday: '9:00am-10:00pm',
          monday: '7:30am-11:00pm',
          tuesday: '7:30am-11:00pm',
          wednesday: '7:30am-11:00pm',
          thursday: '7:30am-11:00pm',
          friday: '7:30am-11:00pm',
          saturday: '8:00am-11:00pm'
        },
        {
          sunday: 'CLOSED',
          monday: '11:00am-8:00pm',
          tuesday: '11:00am-8:00pm',
          wednesday: '11:00am-8:00pm',
          thursday: '11:00am-8:00pm',
          friday: '11:00am-8:00pm',
          saturday: 'CLOSED'
        },
        {
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