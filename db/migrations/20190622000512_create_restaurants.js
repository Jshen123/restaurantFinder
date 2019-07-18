exports.up = function(knex, Promise) {
  return knex.schema.createTable("restaurants", (table) => {
    table.increments('restaurant_id');
    table.string('name');
  	table.integer('price');
    table.string('address');
    table.string('description')
    table.specificType('tag', 'text ARRAY')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('restaurants');
};
