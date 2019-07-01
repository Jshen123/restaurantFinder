
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          username: 'admin',
          password: 'test',
          admin: true
        },
        {
          username: 'user1',
          password: 'test',
          admin: false
        },
        {
          username: 'user2',
          password: 'test',
          admin:false
        }
      ]);
    });
};
