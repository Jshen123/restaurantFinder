exports.up = function(knex, Promise) {
  return knex.schema.createTable("images", (table) => {
    table.increments('image_id');
    table.integer('restaurant_id').notNullable();
    table.string('image_path');
    table.foreign('restaurant_id').references('restaurants.restaurant_id').onDelete('cascade');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('images');
};