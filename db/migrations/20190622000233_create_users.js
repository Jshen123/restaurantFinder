exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", (table) => {
  	table.increments('user_id');
  	table.string('username');
  	table.string('password');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
