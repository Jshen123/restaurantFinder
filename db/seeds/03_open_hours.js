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
        }
        // {
        //   restaurant_id: 2,
        //   sunday: 'CLOSED',
        //   monday: '11:00am-8:00pm',
        //   tuesday: '11:00am-8:00pm',
        //   wednesday: '11:00am-8:00pm',
        //   thursday: '11:00am-8:00pm',
        //   friday: '11:00am-8:00pm',
        //   saturday: 'CLOSED'
        // },
        // {
        //   restaurant_id: 3,
        //   sunday: 'CLOSED',
        //   monday: '11:00am-8:00pm',
        //   tuesday: '11:00am-8:00pm',
        //   wednesday: '11:00am-8:00pm',
        //   thursday: '11:00am-8:00pm',
        //   friday: '11:00am-8:00pm',
        //   saturday: '11:00am-8:00pm'
        // },
        // {
        //   restaurant_id: 4,
        //   sunday: '11:00am-4:00pm',
        //   monday: '9:00am-7:00pm',
        //   tuesday: '9:00am-7:00pm',
        //   wednesday: '9:00am-7:00pm',
        //   thursday: '9:00am-7:00pm',
        //   friday: '9:00am-7:00pm',
        //   saturday: '11:00am-4:00pm'
        // },
        // {
        //   restaurant_id: 5,
        //   sunday: '11:00am–11:00pm',
        //   monday: '10:00am-11:00pm',
        //   tuesday: '10:00am-11:00pm',
        //   wednesday: '10:00am-11:00pm',
        //   thursday: '10:00am-11:00pm',
        //   friday: '10:00am-12:00am',
        //   saturday: '11:00am–11:00pm'
        // },
        // {
        //   restaurant_id: 6,
        //   sunday: '11:30am-9:00pm',
        //   monday: '11:00am-9:00pm',
        //   tuesday: '11:00am-9:00pm',
        //   wednesday: '11:00am-9:00pm',
        //   thursday: '11:00am-9:00pm',
        //   friday: '11:00am-9:00pm',
        //   saturday: '11:30am-9:00pm'
        // },
        // {
        //   restaurant_id: 7,
        //   sunday: 'OPEN',
        //   monday: 'OPEN',
        //   tuesday: 'OPEN',
        //   wednesday: 'OPEN',
        //   thursday: 'OPEN',
        //   friday: 'OPEN',
        //   saturday: 'OPEN'
        // },
        // {
        //   restaurant_id: 8,
        //   sunday: '10:00am-4:00pm',
        //   monday: '7:30am-4:00pm',
        //   tuesday: '7:30am-5:00pm',
        //   wednesday: '7:30am-5:00pm',
        //   thursday: '7:30am-5:00pm',
        //   friday: '7:30am-5:00pm',
        //   saturday: '10:00am-4:00pm'
        // },
        // {
        //   restaurant_id: 9,
        //   sunday: '11:00am-9:00pm',
        //   monday: '11:00am-10:00pm',
        //   tuesday: '11:00am-10:00pm',
        //   wednesday: '11:00am-10:00pm',
        //   thursday: '11:00am-10:00pm',
        //   friday: '11:00am-10:00pm',
        //   saturday: '11:00am-8:00pm'
        // },
        // {
        //   restaurant_id: 10,
        //   sunday: '11:00am-8:00pm',
        //   monday: '11:00am-8:00pm',
        //   tuesday: '11:00am-8:00pm',
        //   wednesday: '11:00am-8:00pm',
        //   thursday: '11:00am-8:00pm',
        //   friday: '11:00am-8:00pm',
        //   saturday: '11:00am-8:00pm'
        // },
        // {
        //   restaurant_id: 11,
        //   sunday: 'CLOSED',
        //   monday: '10:00am-7:45pm',
        //   tuesday: '10:00am-7:45pm',
        //   wednesday: '10:00am-7:45pm',
        //   thursday: '10:00am-7:45pm',
        //   friday: '10:00am-7:45pm',
        //   saturday: '10:00am-5:45pm'
        // },
        // {
        //   restaurant_id: 12,
        //   sunday: 'CLOSED',
        //   monday: '11:45am-9:00pm',
        //   tuesday: '11:45am-9:00pm',
        //   wednesday: '11:45am-9:00pm',
        //   thursday: '11:45am-9:00pm',
        //   friday: '11:45am-9:00pm',
        //   saturday: '11:00am-8:00pm'
        // },
        // {
        //   restaurant_id: 13,
        //   sunday: '12:00pm-11:00pm',
        //   monday: '11:00am-11:00pm',
        //   tuesday: '11:00am-11:00pm',
        //   wednesday: '11:00am-11:00pm',
        //   thursday: '11:00am-11:00pm',
        //   friday: '11:00am-12:00am',
        //   saturday: '11:00am-12:00am'
        // },
        // {
        //   restaurant_id: 14,
        //   sunday: 'CLOSED',
        //   monday: '8:00am-4:00pm',
        //   tuesday: '8:00am-4:00pm',
        //   wednesday: '8:00am-4:00pm',
        //   thursday: '8:00am-4:00pm',
        //   friday: '8:00am-4:00pm',
        //   saturday: 'CLOSED'
        // },
        // {
        //   restaurant_id: 15,
        //   sunday: '7:30am-9:00pm',
        //   monday: '7:00am-10:00pm',
        //   tuesday: '7:00am-10:00pm',
        //   wednesday: '7:00am-10:00pm',
        //   thursday: '7:00am-10:00pm',
        //   friday: '7:00am-10:00pm',
        //   saturday: '7:30am-9:00pm'
        // },
        // {
        //   restaurant_id: 16,
        //   sunday: 'CLOSED',
        //   monday: '11:00am-11:00pm',
        //   tuesday: '11:00am-11:00pm',
        //   wednesday: '11:00am-11:00pm',
        //   thursday: '11:00am-11:00pm',
        //   friday: '11:00am-11:00pm',
        //   saturday: '11:00am-11:00pm'
        // },
        // {
        //   restaurant_id: 17,
        //   sunday: '11:00am-9:00pm',
        //   monday: '11:00am-11:00pm',
        //   tuesday: '11:00am-11:00pm',
        //   wednesday: '11:00am-11:00pm',
        //   thursday: '11:00am-11:00pm',
        //   friday: '11:00am-11:00pm',
        //   saturday: '11:00am-9:00pm'
        // },
        // {
        //   restaurant_id: 18,
        //   sunday: 'CLOSED',
        //   monday: '10:30am-7:30pm',
        //   tuesday: '10:30am-7:30pm',
        //   wednesday: '10:30am-7:30pm',
        //   thursday: '10:30am-7:30pm',
        //   friday: '10:30am-6:30pm',
        //   saturday: '11:00am-3:00pm'
        // },
        // {
        //   restaurant_id: 19,
        //   sunday: '11:00am-5:30pm',
        //   monday: '11:00am-8:00pm',
        //   tuesday: '11:00am-8:00pm',
        //   wednesday: '11:00am-8:00pm',
        //   thursday: '11:00am-8:00pm',
        //   friday: '11:00am-8:00pm',
        //   saturday: '11:00am-7:30pm'
        // },
        // {
        //   restaurant_id: 20,
        //   sunday: 'CLOSED',
        //   monday: '7:30am-8:00pm',
        //   tuesday: '7:30am-8:00pm',
        //   wednesday: '7:30am-8:00pm',
        //   thursday: '7:30am-8:00pm',
        //   friday: '7:30am-8:00pm',
        //   saturday: 'CLOSED'
        // },
        // {
        //   restaurant_id: 21,
        //   sunday: 'CLOSED',
        //   monday: '6:00am-7:30pm',
        //   tuesday: '6:00am-7:30pm',
        //   wednesday: '6:00am-7:30pm',
        //   thursday: '6:00am-7:30pm',
        //   friday: '6:00am-7:30pm',
        //   saturday: 'CLOSED'
        // },
        // {
        //   restaurant_id: 22,
        //   sunday: 'CLOSED',
        //   monday: '11:00am-6:00pm',
        //   tuesday: '11:00am-6:00pm',
        //   wednesday: '11:00am-6:00pm',
        //   thursday: '11:00am-7:00pm',
        //   friday: '11:00am-4:00pm',
        //   saturday: 'CLOSED'
        // },
        // {
        //   restaurant_id: 23,
        //   sunday: 'CLOSED',
        //   monday: '7:00am-7:00pm',
        //   tuesday: '7:00am-7:00pm',
        //   wednesday: '7:00am-7:00pm',
        //   thursday: '7:00am-7:00pm',
        //   friday: '7:00am-7:00pm',
        //   saturday: 'CLOSED'
        // },
        // {
        //   restaurant_id: 24,
        //   sunday: 'CLOSED',
        //   monday: '11:00am-7:00pm',
        //   tuesday: '11:00am-7:00pm',
        //   wednesday: '11:00am-7:00pm',
        //   thursday: '11:00am-7:00pm',
        //   friday: '11:00am-4:00pm',
        //   saturday: 'CLOSED'
        // },
        // {
        //   restaurant_id: 25,
        //   sunday: 'CLOSED',
        //   monday: '11:00am-6:00pm',
        //   tuesday: '11:00am-6:00pm',
        //   wednesday: '11:00am-6:00pm',
        //   thursday: '11:00am-6:00pm',
        //   friday: '11:00am-5:00pm',
        //   saturday: 'CLOSED'
        // },
        // {
        //   restaurant_id: 26,
        //   sunday: 'CLOSED',
        //   monday: '10:15am-6:00pm',
        //   tuesday: '10:15am-6:00pm',
        //   wednesday: '10:15am-6:00pm',
        //   thursday: '10:15am-6:00pm',
        //   friday: '10:15am-5:00pm',
        //   saturday: 'CLOSED'
        // },
        // {
        //   restaurant_id: 27,
        //   sunday: 'CLOSED',
        //   monday: '10:30am-5:00pm',
        //   tuesday: '10:30am-5:00pm',
        //   wednesday: '10:30am-5:00pm',
        //   thursday: '10:30am-5:00pm',
        //   friday: '10:30am-4:00pm',
        //   saturday: 'CLOSED'
        // },
        // {
        //   restaurant_id: 28,
        //   sunday: '11:00am-12:00am',
        //   monday: '11:00am-12:00am',
        //   tuesday: '11:00am-12:00am',
        //   wednesday: '11:00am-12:00am',
        //   thursday: '11:00am-1:00am',
        //   friday: '11:00am-1:00am',
        //   saturday: '11:00am-1:00am'
        // },
        // {
        //   restaurant_id: 29,
        //   sunday: 'CLOSED',
        //   monday: '8:00am-7:30pm',
        //   tuesday: '8:00am-7:30pm',
        //   wednesday: '8:00am-7:30pm',
        //   thursday: '8:00am-7:30pm',
        //   friday: '8:00am-7:30pm',
        //   saturday: 'CLOSED'
        // },
        // {
        //   restaurant_id: 30,
        //   sunday: '8:00am-10:00pm',
        //   monday: '7:00am-10:00pm',
        //   tuesday: '7:00am-10:00pm',
        //   wednesday: '7:00am-10:00pm',
        //   thursday: '7:00am-12:00am',
        //   friday: '7:00am-12:00am',
        //   saturday: '8:00am-12:00am'
        // },
        // {
        //   restaurant_id: 31,
        //   sunday: '8:00am-4:00pm',
        //   monday: '8:00am-4:00pm',
        //   tuesday: '8:00am-4:00pm',
        //   wednesday: '8:00am-4:00pm',
        //   thursday: '8:00am-4:00pm',
        //   friday: '8:00am-4:00pm',
        //   saturday: '8:00am-4:00pm'
        // },
        // {
        //   restaurant_id: 32,
        //   sunday: '7:00am-10:00pm',
        //   monday: '7:00am-10:00pm',
        //   tuesday: '7:00am-10:00pm',
        //   wednesday: '7:00am-10:00pm',
        //   thursday: '7:00am-10:00pm',
        //   friday: '7:00am-10:00pm',
        //   saturday: '7:00am-10:00pm'
        // },
        // {
        //   restaurant_id: 33,
        //   sunday: 'CLOSED',
        //   monday: '6:00am-7:30pm',
        //   tuesday: '6:00am-7:30pm',
        //   wednesday: '6:00am-7:30pm',
        //   thursday: '6:00am-7:30pm',
        //   friday: '6:00am-7:30pm',
        //   saturday: 'CLOSED'
        // },
        // {
        //   restaurant_id: 34,
        //   sunday: 'CLOSED',
        //   monday: '8:00am-7:00pm',
        //   tuesday: '8:00am-7:00pm',
        //   wednesday: '8:00am-7:00pm',
        //   thursday: '8:00am-7:00pm',
        //   friday: '8:00am-7:00pm',
        //   saturday: 'CLOSED'
        // }
      ]);
    });
};