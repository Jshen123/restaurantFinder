
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          username: 'admin',
          password: 'test'
        },
        {
          username: 'user1',
          password: 'test'
        },
        {
          username: 'user2',
          password: 'test'
        }
      ]);
    });
};
