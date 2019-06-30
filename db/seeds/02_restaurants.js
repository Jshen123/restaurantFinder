
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('restaurants').del()
    .then(function () {
      // Inserts seed entries
      return knex('restaurants').insert([
        {
          name: 'A&W Canada',
          price: 1,
          address: '9055 University High St, Burnaby, BC V5A 4X6',
          description: 'Test Restaurant'
        },
        {
          name: 'Bun & Me',
          price: 2,
          address: '8915 Cornerstone Mews, Burnaby, BC V5A 4Y7',
          description: 'Test Restaurant'
        },
        {
          name: 'Togo Sushi',
          price: 2,
          address: '9055 University High St, Burnaby, BC V5A 0A7',
          description: 'Test Restaurant'
        }
      ]);
    });
};
