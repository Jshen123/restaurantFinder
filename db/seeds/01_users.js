const bcrypt = require('bcrypt');
const saltRounds = 10;
const hash = bcrypt.hashSync("test", saltRounds);


exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          username: 'admin',
          password: `${hash}`,
          admin: true
        },
        {
          username: 'user1',
          password: `${hash}`,
          admin: false
        },
        {
          username: 'user2',
          password: `${hash}`,
          admin:false
        }
      ]);
    });
};
