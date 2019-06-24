exports.up = function(knex, Promise) {
  return knex.schema.createTable("restaurants", (table) => {
  	table.increments('restaurant_id');
  	table.integer('price');
    table.string('address');
    table.string('description')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};